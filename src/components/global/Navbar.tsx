import useAuthQuery from "../../store/authStore";
import Logo from "./Logo";
import User from "./User";

const Navbar = () => {
  const isLoggedin = useAuthQuery((s) => s.isLoggedin);
  return (
    <header className="flex items-center justify-between py-5 px-10 fixed z-[999] w-full">
      <div>
        <Logo />
      </div>
      {isLoggedin && (
        <div>
          <User />
        </div>
      )}
    </header>
  );
};

export default Navbar;
