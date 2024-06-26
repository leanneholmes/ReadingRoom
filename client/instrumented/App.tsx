import { Container } from "semantic-ui-react";
import NavBar from "./components/NavBar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import { useStore } from "./stores/store";
import { useEffect } from "react";
import LoadingComponent from "./components/LoadingComponent";
import { observer } from "mobx-react-lite";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  });

  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading app..." />;

  if (!commonStore.token && location.pathname !== "/") {
    // Redirect unauthenticated users to the home page ("/")
    return <Navigate to="/" />;
  }

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "6em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
