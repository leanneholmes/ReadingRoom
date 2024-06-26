import { Button, Header, Segment } from "semantic-ui-react";
import axios from "axios";
import { useState } from "react";
import ValidationError from "./ValidationError";

/** This is a test component that checks how
 * our client responds to errors.
 */
export default function TestErrors() {
  const baseUrl = "http://localhost:5000/api/";
  const [errors, setErrors] = useState(null);

  function handleNotFound() {
    axios
      .get(baseUrl + "buggy/not-found")
      .catch((err) => console.log(err.response));
  }

  function handleBadRequest() {
    axios
      .get(baseUrl + "buggy/bad-request")
      .catch((err) => console.log(err.response));
  }

  function handleServerError() {
    axios
      .get(baseUrl + "buggy/server-error")
      .catch((err) => console.log(err.response));
  }

  function handleUnauthorised() {
    axios
      .get(baseUrl + "buggy/unauthorised")
      .catch((err) => console.log(err.response));
  }

  function handleBadGuid() {
    axios
      .get(baseUrl + "bookclubs/notaguid")
      .catch((err) => console.log(err.response));
  }

  function handleValidationError() {
    axios.post(baseUrl + "bookclubs", {}).catch((err) => setErrors(err));
  }

  return (
    <>
      <Header as="h1" content="Test Error component" />
      <Segment>
        <Button.Group widths="7">
          <Button
            onClick={handleNotFound}
            content="Not Found"
            basic
            primary
            id="notFound"
          />
          <Button
            onClick={handleBadRequest}
            content="Bad Request"
            basic
            primary
            id="badRequest"
          />
          <Button
            onClick={handleValidationError}
            content="Validation Error"
            basic
            primary
            id="validationError"
          />
          <Button
            onClick={handleServerError}
            content="Server Error"
            basic
            primary
            id="serverError"
          />
          <Button
            onClick={handleUnauthorised}
            content="Unauthorized"
            basic
            primary
            id="unauthorized"
          />
          <Button
            onClick={handleBadGuid}
            content="Bad Guid"
            basic
            primary
            id="badGuid"
          />
        </Button.Group>
      </Segment>
      {errors && <ValidationError errors={errors} />}
    </>
  );
}
