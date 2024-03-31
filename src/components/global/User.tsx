import React from "react";
import { Link } from "react-router-dom";

const User = () => {
  const handleLogout = (e: React.MouseEvent) => {};
  return (
    <div className="relative">
      <div>
        <img src="/avatars/default-male.webp" width="50px" height="50px" />
      </div>
      <div className="absolute top-full right-full w-28 backdrop-blur-sm shadow-sm ">
        <ul className="flex flex-col gap-1 p-3 rounded-xl bg-[rgba(255,255,255,.3)] ">
          <li className="text-slate-50">
            <Link to="/profile">Edit profile</Link>
          </li>
          <li className="text-slate-50" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default User;
