// import { useState } from "react";
import "../styles/App.css";
import Register from "./Register";
import Login from "./Login";
import Landing from "./Landing";

function App() {
  return (
    <>
      <div>
        {/* only show one of these, this still needs login logic to display conditionally */}
        <Register badUsername={true} />
        <Login loginFailed={true} />
        <Landing />
      </div>
      {/* testing push to dev branch*/}
    </>
  );
}

export default App;
