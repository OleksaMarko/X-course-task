import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../components/AppContext";
import { Button, Avatar, Layout, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Content } = Layout;

export default function Login() {
  const [userName, setUserName] = useState("");

  const context = useContext(AppContext);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `books`;
    navigate(path, { replace: true });
  };

  const onFinish = (values) => {
    context.saveUserName(userName);
    routeChange();
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Content>
        <div className="site-layout-content">
          <div className="main">
            <figure className="main__avatar">
              <Avatar
                shape="square"
                // size={{ xs: 200, sm: 160 }}
                // size={avatarSize(windowSize)}
                icon={<UserOutlined />}
                className="main__avatar-shape"
              />
            </figure>
            <Form
              className="form"
              layout="vertical"
              labelAlign="right"
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                label="Username"
                labelAlign="right"
                name="username"
                rules={[
                  {
                    required: true,
                    min: 4,
                    max: 16,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  className="form__text"
                  type="text"
                  id="name"
                  placeholder="type Username"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  value={userName}
                />
              </Form.Item>
              <Button
                className="button__sing-in"
                size="middle"
                type="primary"
                htmlType="submit"
                disabled={userName.length < 4 || userName.length > 16}
              >
                Sign-in
              </Button>
            </Form>
          </div>
        </div>
      </Content>
    </>
  );
}
