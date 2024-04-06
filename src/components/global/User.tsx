import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const User = () => {
  const { logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState(false);
  const navMenu = useRef(null);

  const handleUserClick = () => {
    setActiveMenu(!activeMenu);
    // window.addEventListener("click", windowClickHandler);
  };

  const handleLogout = () => {
    logout();
  };

  // const windowClickHandler = (e: MouseEvent) => {
  //   const clickedElement = e.target as HTMLElement;
  //   console.log("activeMenu1: ", activeMenu);
  //   console.log(isDescendant(clickedElement, navMenu.current!));
  //   if (
  //     e.target !== navMenu.current &&
  //     !isDescendant(clickedElement, navMenu.current!)
  //   ) {
  //     setActiveMenu(true);
  //     console.log("i'm desactivating menu now");
  //     // window.removeEventListener("click", windowClickHandler);
  //     return;
  //   }
  //   console.log("i'm here");
  // };

  return (
    <div className="relative">
      <div onClick={handleUserClick}>
        <img src="/avatars/default-male.webp" width="50px" height="50px" />
      </div>
      <div
        ref={navMenu}
        className={`absolute top-full right-full w-28 backdrop-blur-sm shadow-sm menu ${
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
  );
};

export default User;

// function isDescendant(child: HTMLElement, parent: HTMLElement): boolean {
//   let currentElement: HTMLElement | null = child.parentElement;
//   while (currentElement !== null) {
//     if (currentElement === parent) {
//       return true;
//     }
//     currentElement = currentElement.parentElement;
//   }
//   return false;
// }
