import { FavoriteFeeds } from "../types/favorite-feeds";

const LOCAL_STORAGE_KEY = "favoriteFeeds";

export const getFavoriteFeeds = (): FavoriteFeeds[] => {
  const favoriteFeeds = localStorage.getItem(LOCAL_STORAGE_KEY);
  return favoriteFeeds ? JSON.parse(favoriteFeeds) : [];
};

export const saveFavoriteFeeds = (favoriteFeeds: FavoriteFeeds[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favoriteFeeds));
};

export const addFavoriteFeed = (favoriteFeed: FavoriteFeeds) => {
  const favoriteFeeds = getFavoriteFeeds();
  favoriteFeeds.push(favoriteFeed);
  saveFavoriteFeeds(favoriteFeeds);
};

export const removeFavoriteFeed = (feedId: string, userId: string) => {
  let favoriteFeeds = getFavoriteFeeds();
  favoriteFeeds = favoriteFeeds.filter(
    (favoriteFeed) => favoriteFeed.feedId !== feedId || favoriteFeed.userId !== userId
  );
  saveFavoriteFeeds(favoriteFeeds);
};

export const isFavoriteFeed = (feedId: string, userId: string): boolean => {
  const favoriteFeeds = getFavoriteFeeds();
  return favoriteFeeds.some(
    (favoriteFeed) => favoriteFeed.feedId === feedId && favoriteFeed.userId === userId
  );
};