import { Outlet, useNavigate } from "react-router";
import RightPanel from "../common/SideBar/RightPanel";
import { useEffect } from "react";
import Navigation from "../common/Navigation/Navigation";
import LeftPanel from "../common/SideBar/LeftPanel";

function DefaultLayout() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/auth/login");
  };

  useEffect(() => {
    if (!userId) {
      navigate("/auth/login");
    }
  }, [navigate, userId]);

  return (
    <div className="bg-slate-100 text-black fixed top-0 left-0 w-full h-full">
      <Navigation userId={userId} onLogout={handleLogout} />

      <div className="flex">
        <LeftPanel />

        <main
          className="bg-slate-100 p-4 flex-1 overflow-y-scroll h-[calc(100vh-64px)] no-scrollbar"
        >
          <Outlet />
        </main>

        <RightPanel />
      </div>
      {/* <footer>
        <h1>Footer</h1>
      </footer> */}
    </div>
  );
}

export default DefaultLayout;
