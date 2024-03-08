import { Container, Divider, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { useStore } from "../stores/store";

export default observer(function HomePage() {
  const { userStore } = useStore();
  const { isLoggedIn } = userStore;
  const [loginForm, setLoginForm] = useState(true);

  function handleClick() {
    setLoginForm((loginForm) => !loginForm!);
    console.log(loginForm);
  }

  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/bookclubs" />
      ) : (
        <Container style={{ marginTop: "6em" }} textAlign="center">
          <Header as="h1" className="playfair" style={{ marginBottom: "25px" }}>
            Welcome to the Reading Room
          </Header>
          <Divider
            style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}
          />
          <Container
            style={{ width: "60%", marginTop: "2em" }}
            textAlign="left"
          >
            {loginForm ? (
              <>
                <LoginForm />
                <Container textAlign="center" style={{ marginTop: "1em" }}>
                  Don't have an account?{" "}
                  <Link onClick={handleClick} to={""}>
                    Click here
                  </Link>{" "}
                  to register
                </Container>
              </>
            ) : (
              <>
                <RegisterForm />
                <Container textAlign="center" style={{ marginTop: "1em" }}>
                  Already have an account?{" "}
                  <Link onClick={handleClick} to={""}>
                    Click here
                  </Link>{" "}
                  to login
                </Container>
              </>
            )}
          </Container>
        </Container>
      )}
    </>
  );
}

);