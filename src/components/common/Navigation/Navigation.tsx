import { Button } from "primereact/button";
import { NavLink } from "react-router";

function Navigation({
  userId,
  onLogout,
}: {
  userId: string | null;
  onLogout: () => void;
}) {
  return (
    <header className="bg-slate-50 text-black p-4 border-b border-slate-100 shadow-sm">
      <nav className="container mx-auto flex justify-between items-center">
        <h2 className="text-3xl font-bold font-rajdhani text-indigo-700">
          NetizenApp
        </h2>
        {!userId ? (
          <ul className="flex space-x-4">
            <li>
              <NavLink to="/auth/login" className="hover:text-indigo-400">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/auth/register" className="hover:text-indigo-400">
                Register
              </NavLink>
            </li>
          </ul>
        ) : (
          <Button
            label="Logout"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border-none"
            onClick={onLogout}
          />
        )}
      </nav>
    </header>
  );
}

export default Navigation;
