import { useEffect, useState } from "react";
import Feed from "../../components/common/Feed/Feed";
import FeedForm from "../../components/common/Feed/FeedForm";
import { getFeeds } from "../../usecase/usecase-feeds";
import { getUsers } from "../../usecase/usecase-users";
import { Feed as FeedType } from "../../types/feed";
import { User } from "../../types/auth";

const Home = () => {
  const [feeds, setFeeds] = useState<FeedType[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const loadFeeds = () => {
    const data = getFeeds();
    setFeeds(data);
  };

  const loadUsers = () => {
    const data = getUsers();
    setUsers(data);
  };

  const addFeed = (newFeed: FeedType) => {
    setFeeds((prevFeeds) => [newFeed, ...prevFeeds]);
  };

  const deleteFeed = (feedId: string | undefined) => {
    setFeeds((prevFeeds) => prevFeeds.filter((feed) => feed.id !== feedId));
  }

  useEffect(() => {
    loadFeeds();
    loadUsers();
  }, []);

  const sortedFeeds = feeds.sort((a, b) => {
    const dateA = new Date(a.postDate || 0).getTime();
    const dateB = new Date(b.postDate || 0).getTime();
    return dateB - dateA;
  });
  return (
    <div>
      <FeedForm onAddFeed={addFeed}  />
      {sortedFeeds?.map((feed) => {
        const user = users.find((user) => user.id === feed.userId);
        if (!user) return null;
        return (
          <Feed
            key={feed.id}
            id={feed.id}
            user={user}
            title={feed.title}
            subTitle={feed.subTitle}
            imgUri={feed.imgUri}
            avatarUri={feed.avatarUri}
            postDate={feed.postDate}
            content={feed.content}
            comments={feed.comments}
            onDelete={deleteFeed}
          />
        );
      })}
    </div>
  );
};

export default Home;