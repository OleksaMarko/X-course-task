import { AppContext } from "../components/AppContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Badge, Button, Avatar } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

export default function HeaderInfo() {
  const context = useContext(AppContext);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const loggedUser = context.userName;
  if (!loggedUser) {
    return (
      <div className="header">
        <div div className="container">
          <div className="header__name">JS BAND STORE / Oleksa Marko</div>
        </div>
      </div>
    );
  }

  const basket = context.basket;
  const counterAmount =
    Object.keys(basket).length === 0
      ? 0
      : Object.values(basket).reduce((a, b) => a + b);

  return (
    <div className="header">
      <div className="container">
        <div className="header__container">
          <span className="header__name">JS BAND STORE / Oleksa Marko</span>
          <div className="header__info">
            <Link to={"/basket"}>
              <Badge count={counterAmount}>
                <ShoppingCartOutlined
                  style={{
                    fontSize: 36,
                    color: "azure",
                    backgroundColor: "black",
                    borderRadius: "6px",
                  }}
                  fill={{ color: "white" }}
                />
              </Badge>
            </Link>
            <Button
              size="middle"
              type="primary"
              onClick={() => {
                setUserName("");
                context.saveUserName(userName);
                context.clearBasket();
                navigate("/");
              }}
            >
              sing-out
            </Button>

            <Avatar shape="square" size="large" icon={<UserOutlined />} />
            <div className="header__userName">{context.userName}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
