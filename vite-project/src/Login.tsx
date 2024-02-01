// import { useState } from 'react'
import "./App.css";

function sendLoginRequest() {
  // put login request logic in here
}

type LoginProps = {
  loginFailed: boolean;
};

function Login(props: LoginProps) {
  const loginFailed = props.loginFailed;
  return (
    <>
      <div>
        <form>
          <label>Username</label>
          <input type="text" placeholder="Enter username"></input>

          <label>Password</label>
          <input type="password" placeholder="Enter password"></input>

          <button onClick={sendLoginRequest}>Login</button>

          {loginFailed && <p>Login information incorrect, please try again.</p>}
        </form>
      </div>
    </>
  );
}

export default Login;
