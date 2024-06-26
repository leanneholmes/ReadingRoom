import { ErrorMessage, Form, Formik } from "formik";
import CustomTextInput from "./form/CustomTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm() {
  const { userStore } = useStore();
  return (
    <>
      <Header as="h2" textAlign="center">
        Sign In
      </Header>
      <Formik
        initialValues={{ email: "", password: "", error: null }}
        onSubmit={(values, { setErrors }) =>
          userStore
            .login(values)
            .catch((_error) =>
              setErrors({ error: "Invalid email or password" })
            )
        }
      >
        {({ handleSubmit, isSubmitting, errors }) => (
          <Form
            className="ui form"
            onSubmit={handleSubmit}
            autoComplete="off"
            placeholder={undefined}
          >
            <CustomTextInput
              placeholder="Email"
              name="email"
              label="Email Address"
              id="email"
            />
            <CustomTextInput
              placeholder="Password"
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <ErrorMessage
              name="error"
              render={() => (
                <Label
                  style={{ marginBottom: 10 }}
                  basic
                  color="red"
                  content={errors.error}
                />
              )}
            />
            <Button
              loading={isSubmitting}
              className="btn-dark-green"
              positive
              content="Sign In"
              type="submit"
              id="submit"
              fluid
            />
          </Form>
        )}
      </Formik>
    </>
  );
});
