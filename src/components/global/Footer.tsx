import useAuth from "../../hooks/useAuth";
import useAuthQuery from "../../store/authStore";

const Footer = () => {
  const { isLoggedin } = useAuth();
  isLoggedin();
  const isLogged = useAuthQuery((s) => s.isLoggedin);
  const footerPosition = isLogged ? "" : "fixed bottom-0";

  return (
    <footer
      className={`flex justify-between  py-5 px-10 bg-transparent w-full ${footerPosition} `}
    >
      <h2 className="font-main ">2024 @ All rights are reserved</h2>
      <h2 className="font-main  ">
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
