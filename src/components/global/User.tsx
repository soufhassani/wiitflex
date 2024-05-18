import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const User = () => {
  const navMenu = useRef<HTMLDivElement>(null);
  const { logout, getUser } = useAuth();
  const user = getUser();

  const [activeMenu, setActiveMenu] = useState(false);
  const closeMenu = (e: MouseEvent) => {
    if (
      navMenu.current &&
      e.target instanceof Node &&
      !navMenu.current.contains(e.target)
    ) {
      if (
        e.target !== navMenu.current ||
        !navMenu.current?.contains(e.target)
      ) {
        setActiveMenu(false);
        window.removeEventListener("click", closeMenu);
      }
    }
  };
  const handleUserClick = () => {
    setActiveMenu(!activeMenu);
    window.addEventListener("click", closeMenu);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div ref={navMenu} className="flex items-center gap-3">
      {user?.username ? (
        <span className="select-none">Hello, {user.username}</span>
      ) : (
        ""
      )}

      <div className="relative">
        <div className="cursor-pointer" onClick={handleUserClick}>
          <img src="/avatars/default-male.webp" width="50px" height="50px" />
        </div>
        <div
          ref={navMenu}
          className={`absolute top-full right-0 mt-3 w-28 backdrop-blur-sm shadow-sm menu ${
            activeMenu ? "active-menu" : ""
          }`}
        >
          <ul className="flex flex-col gap-1 p-3 rounded-xl bg-[rgba(255,255,255,.3)] ">
            <li className="text-slate-50">
              <Link to="/profile">Edit profile</Link>
            </li>
            <li className="text-slate-50 cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default User;
