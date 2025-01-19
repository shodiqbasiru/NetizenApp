import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { Feed as FeedType } from "../../../types/feed";
import { User } from "../../../types/auth";
import { Avatar } from "primereact/avatar";
import { useEffect, useRef, useState } from "react";
import {
  addFavoriteFeed,
  isFavoriteFeed,
  removeFavoriteFeed,
} from "../../../usecase/usecase-favorite-feeds";
import { TieredMenu } from "primereact/tieredmenu";
import { Comment } from "../../../types/comment";
import {
  addComment,
  deleteFeed,
  getFeeds,
} from "../../../usecase/usecase-feeds";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { getUsers } from "../../../usecase/usecase-users";
import { useNavigate } from "react-router";

/* eslint-disable @typescript-eslint/no-unused-vars */
interface Feeduser extends FeedType {
  user: User;
  onDelete: (feedId: string | undefined) => void;
}
/* eslint-enable @typescript-eslint/no-unused-vars */

function Feed({
  id,
  user,
  title,
  subTitle,
  imgUri,
  postDate,
  content,
  comments,
  onDelete,
}: Feeduser) {
  const [favorite, setFavorite] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [feedComments, setFeedComments] = useState<Comment[]>(comments || []);
  const [showComments, setShowComments] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const menu = useRef<TieredMenu>(null);

  const navigate = useNavigate();

  const username = `${user.firstName} ${user.lastName}`;
  const initialName = user.firstName?.charAt(0).toUpperCase();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId && id) {
      setFavorite(isFavoriteFeed(id, userId));
    }

    const feeds = getFeeds();
    const feed = feeds.find((feed) => feed.id === id);
    if (feed) {
      setFeedComments(feed.comments || []);
    }

    const allUsers = getUsers();
    setUsers(allUsers);
  }, [id]);

  const handleFavorite = () => {
    const userId = localStorage.getItem("userId");
    if (!userId || !id) return;

    if (favorite) {
      removeFavoriteFeed(id, userId);
    } else {
      addFavoriteFeed({ userId, feedId: id });
    }
    setFavorite(!favorite);
  };

  const handleAddComment = () => {
    const userId = localStorage.getItem("userId");
    if (!userId || !id || !commentText.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(),
      userId: userId,
      feedId: id,
      content: commentText.trim(),
      postDate: new Date().toISOString(),
    };

    addComment(id, newComment);
    setFeedComments((prev) => [...prev, newComment]);
    setCommentText("");
  };

  const handleEdit = () => {
    navigate(`/feed/edit/${id}`);
  };

  const handleDelete = () => {
    let userId = localStorage.getItem("userId");
    userId = JSON.parse(userId || "");
    if (userId === user.id) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this feed?"
      );
      if (confirmed) {
        deleteFeed(id);
        onDelete(id);
      }
    }
  };

  let userId = localStorage.getItem("userId");
  userId = JSON.parse(userId || "");

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const getUserName = (userId: string | undefined) => {
    const user = users.find((user) => user.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "Unknown User";
  };

  const items = [
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => handleDelete(),
    },
    {
      label: "Edit",
      icon: "pi pi-pencil",
      command: () => handleEdit(),
    },
  ];

  const header = imgUri && (
    <Image alt="Card" src={imgUri} className="w-full h-64 object-cover" />
  );

  const footer = (
    <div className="flex justify-end items-center">
      {/* <span className="text-sm text-gray-500">{tags?.join(", ")}</span> */}
      <div className="flex gap-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleFavorite}
        >
          <i
            className={`cursor-pointer ${
              favorite ? "pi pi-heart-fill text-red-500" : "pi pi-heart"
            }`}
          ></i>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleComments}
        >
          <span className="ml-2 text-sm">{feedComments.length}</span>
          <i className="pi pi-comment cursor-pointer"></i>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 mb-4 p-4 shadow-sm rounded-xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center mb-4">
          {user.avatarUri && user.avatarUri != "" ? (
            <Avatar
              image={user.avatarUri}
              size="large"
              shape="circle"
              className="bg-slate-50"
            />
          ) : (
            <Avatar
              label={initialName}
              size="large"
              shape="circle"
              className="bg-slate-50 font-bold text-indigo-700 text-xl"
            />
          )}
          <div>
            <p className="text-sm font-semibold">{username}</p>
            <p className="text-xs text-gray-500">{postDate}</p>
          </div>
        </div>

        {userId === user.id && (
          <div>
            <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
            <i
              className="pi pi-ellipsis-v cursor-pointer"
              onClick={(e) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                menu.current?.toggle(e);
              }}
            ></i>
          </div>
        )}
      </div>
      <Card
        title={title}
        subTitle={subTitle}
        className="bg-slate-50 overflow-hidden shadow-none"
        header={header}
        footer={footer}
      >
        <p className="m-0">{content}</p>
      </Card>
      {showComments && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Comments</h3>
          {feedComments.map((comment) => (
            <div key={comment.id} className="mb-2 bg-slate-100 p-2 rounded-xl">
              <p className="text-sm font-semibold">
                {getUserName(comment.userId)}
              </p>
              <p className="text-sm">{comment.content}</p>
              <p className="text-xs text-gray-500">{comment.postDate}</p>
            </div>
          ))}
          <div className="mt-4">
            <InputTextarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
              cols={30}
              placeholder="Add a comment..."
              className="w-full"
            />
            <Button
              label="Add Comment"
              icon="pi pi-send"
              onClick={handleAddComment}
              className="mt-2"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Feed;
