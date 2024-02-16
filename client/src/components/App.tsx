import { useState } from "react";
import "../styles/App.css";
import Register from "./Register";
import Login from "./Login";
import Landing from "./Landing";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const handleCreateAccountClick = () => {
    setShowLogin(false);
  };

  return (
    <>
      <div>
        {showLogin ? (
          <Login loginFailed={true} onCreateAccountClick={handleCreateAccountClick} />
        ) : (
          <Register badUsername={true} />
        )}
        <Landing />
      </div>
    </>
  );
}

export default App;
