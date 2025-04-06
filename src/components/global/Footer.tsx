import useAuth from "../../hooks/useAuth";
import useAuthQuery from "../../store/authStore";

const Footer = () => {
  const { isLoggedin } = useAuth();
  isLoggedin();
  const isLogged = useAuthQuery((s) => s.isLogged);
  const footerPosition = isLogged ? "" : "fixed bottom-0";

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
