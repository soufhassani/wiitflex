import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import User from "./User";

const Navbar = () => {
  const { pathname } = useLocation();
  const loginArea = pathname === "/login" || pathname === "/signup";

  const logged = !loginArea && (
    <div>
      <User />
    </div>
  );
  return (
    <header className="flex items-center justify-between py-5 px-10 fixed z-[999] w-full">
      <div>
        <Logo />
      </div>
      {logged}
    </header>
  );
};

export default Navbar;
