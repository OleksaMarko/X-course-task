import { AppContext } from "../components/AppContext";
import { useContext } from "react";

export default function Footer() {
  const context = useContext(AppContext);
  const loggedUser = context.userName;

  // if (!loggedUser) {
  //   return null;
  // }
  return (
    <div className="footer">
      <div className="container">
        <span className="footer__container">
          Виконано в{" "}
          <a href="https://prometheus.org.ua" target="_blank" rel="noreferrer">
            Prometheus©
          </a>{" "}
          2023
        </span>
      </div>
    </div>
  );
}
