import Logo from "./Logo";

const Navbar = () => {
  return (
    <header className="flex py-4 px-10 fixed z-[999]">
      <div>
        <Logo />
      </div>
    </header>
  );
};

export default Navbar;
