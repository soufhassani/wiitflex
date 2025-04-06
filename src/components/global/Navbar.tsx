import useAuthQuery from "../../store/authStore";
import Logo from "./Logo";
import User from "./User";

const Navbar = () => {
  const isLogged = useAuthQuery((s) => s.isLogged);
  const logged = isLogged && (
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
