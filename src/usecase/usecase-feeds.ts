import { Comment } from "../types/comment";
import { Feed } from "../types/feed";
import dummyFeeds from "../../public/api/data.json";

const LOCAL_STORAGE_KEY = "feeds";

export const initializeDummyData = () => {
  const feeds = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!feeds) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dummyFeeds));
  }
};

export const getFeeds = (): Feed[] => {
  const feeds = localStorage.getItem(LOCAL_STORAGE_KEY);
  return feeds ? JSON.parse(feeds) : [];
};

export const saveFeeds = (feeds: Feed[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(feeds));
};

export const createFeed = (feed: Feed) => {
  const feeds = getFeeds();
  feed.id = Date.now().toString();
  feeds.push(feed);
  saveFeeds(feeds);
};

export const updateFeed = (updatedFeed: Feed) => {
  const feeds = getFeeds();
  const feedIndex = feeds.findIndex((feed) => feed.id === updatedFeed.id);
  if (feedIndex !== -1) {
    feeds[feedIndex] = updatedFeed;
    saveFeeds(feeds);
  }
};

export const deleteFeed = (feedId: string | undefined) => {
  let feeds = getFeeds();
  feeds = feeds.filter((feed) => feed.id !== feedId);
  saveFeeds(feeds);
};

export const addComment = (feedId: string, comment: Comment) => {
  const feeds = getFeeds();
  const feed = feeds.find((feed) => feed.id === feedId);
  if (feed) {
    feed.comments = feed.comments || [];
    feed.comments.push(comment);
    saveFeeds(feeds);
  }
};
