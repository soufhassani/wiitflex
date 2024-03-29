import Logo from "./Logo";

const Navbar = () => {
  return (
    <header className="flex py-5 px-10 fixed z-[999] w-full">
      <div>
        <Logo />
      </div>
    </header>
  );
};

export default Navbar;
