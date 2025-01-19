import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { Feed } from "../../../types/feed";
import { getFavoriteFeeds } from "../../../usecase/usecase-favorite-feeds";
import { getFeeds } from "../../../usecase/usecase-feeds";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { getUsers } from "../../../usecase/usecase-users";
import { User } from "../../../types/auth";
import { Avatar } from "primereact/avatar";

function LeftPanel() {
  const [favoriteFeeds, setFavoriteFeeds] = useState<Feed[]>([]);
  const [initialName, setInitialName] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const dataUser = getUsers();
    setUsers(dataUser);
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      const parsedUserId = JSON.parse(userId);
      const currentUser = users.find((user: User) => user.id === parsedUserId);
      setUser(currentUser);

      const initialFirstName = currentUser?.firstName?.charAt(0).toUpperCase();
      const initialLastName = currentUser?.lastName?.charAt(0).toUpperCase() || "";

      if (initialFirstName && initialLastName) {
        setInitialName(initialFirstName + initialLastName);
      }
    }
  }, [users]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const favoriteFeedIds = getFavoriteFeeds().filter(
        (fav) => fav.userId === userId
      );
      const allFeeds = getFeeds();
      const favoriteFeeds = allFeeds.filter((feed) =>
        favoriteFeedIds.some((fav) => fav.feedId === feed.id)
      );
      setFavoriteFeeds(favoriteFeeds);
    }
  }, []);

  return (
    <aside className="w-1/4 bg-slate-50 min-h-screen flex flex-col items-center border-r border-slate-100 shadow-sm">
      <div className="p-4 w-full">
        <div className="flex justify-center">
          {user?.avatarUri && user?.avatarUri !== "" ? (
            <Avatar
              image={user.avatarUri}
              size="large"
              shape="circle"
              className="bg-slate-200"
            />
          ) : (
            <Avatar
              label={initialName}
              size="large"
              shape="circle"
              className="bg-slate-200 font-bold text-indigo-700 text-6xl p-24 mb-4 mx-auto"
            />
          )}
        </div>
        <h1 className="text-xl mb-8 font-bold text-center">
          {user?.firstName} {user?.lastName}
        </h1>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/feeds"
            className={({ isActive }) =>
              isActive
                ? "bg-indigo-400 text-white p-4 rounded-xl flex items-center"
                : "bg-slate-100 p-4 rounded-xl flex items-center"
            }
          >
            <TbLayoutDashboardFilled className="mr-2" />
            Feeds
          </NavLink>
          {/* <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "bg-indigo-400 text-white p-4 rounded-xl flex items-center"
                : "bg-slate-100 p-4 rounded-xl flex items-center"
            }
          >
            <ImProfile className="mr-2" />
            Profile
          </NavLink> */}
        </nav>
      </div>

      <div className="rounded-xl w-full p-4 mt-4">
        <h1 className="text-start text-xl font-bold mb-4">Favorite Feeds</h1>
        <div className="overflow-y-scroll h-96 no-scrollbar w-full">
          {favoriteFeeds.map((feed) => (
            <div key={feed.id} className="bg-slate-100 p-4 mb-4 rounded-xl">
              <h2 className="text-lg font-bold">{feed.title}</h2>
              <p className="text-sm">{feed.subTitle}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default LeftPanel;