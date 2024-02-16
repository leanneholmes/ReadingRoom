import { render, fireEvent, RenderResult } from "@testing-library/react"; // Import RenderResult
import App from "../components/App";


test("User clicks on create new account button, enters username and password, then clicks register to load login component", () => {
  const { getByText, getByLabelText }: RenderResult = render(<App />); // Add type assertion

  // Step 1: User clicks on create new account button
  const createAccountButton = getByText("Create new account");
  fireEvent.click(createAccountButton);

  // Step 2: User enters their username and password
  const usernameInput = getByLabelText("Username");
  const passwordInput = getByLabelText("Password");
  fireEvent.change(usernameInput, { target: { value: "testUser" } });
  fireEvent.change(passwordInput, { target: { value: "testPassword" } });

  // Step 3: User clicks on the register button
  const registerButton = getByText("Register");
  fireEvent.click(registerButton);

  // Assert that the login component is rendered
  const loginComponent = getByLabelText("login-component");
  expect(loginComponent).toBeInTheDocument();
});
