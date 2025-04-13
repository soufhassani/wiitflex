import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  const loginArea = pathname === "/login" || pathname === "/signup";
  const footerPosition = loginArea ? "fixed bottom-0" : "";

  return (
    <footer
      className={`flex flex-col items-center gap-2 py-5 px-10 bg-transparent w-full ${footerPosition} md:flex-row md:justify-between`}
    >
      <h2 className="font-main text-sm">2024 @ All rights are reserved</h2>
      <h2 className="font-main text-sm ">
        Created by{" "}
        <a
          className="font-semibold"
          href="https://www.linkedin.com/in/soufiane-hassani/"
        >
          HASSANI Soufiane
        </a>
      </h2>
    </footer>
  );
};

export default Footer;
