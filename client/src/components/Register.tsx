// import { useState } from 'react'
// import "./App.css";

function sendRegisterRequest() {
  // put login request logic in here
}

type RegisterProps = {
  badUsername: boolean;
};

function Register(props: RegisterProps) {
  const badUsername = props.badUsername;
  return (
    <>
      <div data-testid="register-component">
        <form>
          <label>Username</label>
          <input type="text" placeholder="Enter username"></input>

          <label>Password</label>
          <input type="password" placeholder="Enter password"></input>

          <button onClick={sendRegisterRequest}>Register</button>

          {badUsername && (
            <p>
              This username is already in use, please select a different
              username.
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default Register;
