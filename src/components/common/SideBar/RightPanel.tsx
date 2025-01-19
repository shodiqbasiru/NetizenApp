import FriendList from "../FriendList/FriendList";
import { getUsers } from "../../../usecase/usecase-users";
import { User } from "../../../types/auth";

function RightPanel() {
  const users = getUsers();
  const loggedInUserId = localStorage.getItem("userId");
  if (!loggedInUserId) return null;

  const friends = users.filter(
    (user: User) => user.id !== JSON.parse(loggedInUserId || "")
  );

  return (
    <aside className="bg-slate-50 flex flex-col items-center p-4 w-1/4 border-l border-slate-100 shadow-sm">
      <div className="bg-slate-50 w-full">
        <h1 className="text-start text-xl font-bold mb-4">List of Users</h1>
      </div>
      <div className="overflow-y-scroll no-scrollbar w-full h-[600px]">
        {friends.map((friend: User) => (
          <FriendList
            key={friend.id}
            firstName={friend.firstName}
            lastName={friend.lastName}
            avatarUri={friend.avatarUri}
          />
        ))}
      </div>
      {/* footer */}
      <div className="bg-slate-50 p-4 w-full mt-8">
        <p className="text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Netizen App. All rights reserved.
        </p>
        <p className="text-center text-sm text-slate-500">
          Made by Shodiq Basiru
        </p>
      </div>
    </aside>
  );
}

export default RightPanel;
