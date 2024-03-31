import Logo from "./Logo";
import User from "./User";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between py-5 px-10 fixed z-[999] w-full">
      <div>
        <Logo />
      </div>
      <div>
        <User />
      </div>
    </header>
  );
};

export default Navbar;
