import { useState } from "react";

function sendLoginRequest() {
  // put login request logic in here
}

type LoginProps = {
  loginFailed: boolean;
  onCreateAccountClick: () => void;
};

function Login(props: LoginProps) {
  const { loginFailed, onCreateAccountClick } = props;
  return (
    <>
      <div data-testid="login-component">
        <form>
          <label>Username</label>
          <input type="text" placeholder="Enter username"></input>

          <label>Password</label>
          <input type="password" placeholder="Enter password"></input>

          <button onClick={sendLoginRequest}>Login</button>

          <button onClick={onCreateAccountClick}>Create new account</button>

          {loginFailed && <p>Login information incorrect, please try again.</p>}
        </form>
      </div>
    </>
  );
}

export default Login;
