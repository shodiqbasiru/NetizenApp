import { Avatar } from "primereact/avatar";

export interface FriendListProps {
  id?: string;
  avatarUri?: string;
  firstName?: string;
  lastName?: string;
}

function FriendList(props: FriendListProps) {
  const initialName = props.firstName?.charAt(0).toUpperCase();

  return (
    <div className="bg-slate-100 flex items-center gap-4 shadow-sm rounded-xl p-4 border-b mb-4 border-slate-100 w-full">
      {props.avatarUri && props.avatarUri != "" ? (
        <Avatar
          image={props.avatarUri}
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
      <p className="text-lg">
        {props.firstName} {props.lastName}
      </p>
    </div>
  );
}

export default FriendList;
