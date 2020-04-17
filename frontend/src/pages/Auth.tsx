import React, { useState, useContext } from "react";

import Card from "../components/ui-elements/Card";
import Input from "../components/form-elements/Input";
import Button from "../components/form-elements/Button";
import Spinner from "../components/ui-elements/Spinner";
import ErrorModal from "../components/ui-elements/ErrorModal";

import { useForm } from "../hooks/form-hook";
import { AuthContextProps, AuthContext } from "../context/auth-context";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../utils/validator";

import "./Auth.scss";
import { useHttpClient } from "../hooks/http-hooks";

const initialForm = {
  email: { value: "", isValid: false },
  password: { value: "", isValid: false },
};

const Auth: React.FC = () => {
  const auth: AuthContextProps = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, formFieldHandler, setFormData] = useForm(
    initialForm,
    false
  );

  const authSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const loginUrl = "http://localhost:5000/api/user/login";
    const signupUrl = "http://localhost:5000/api/user/signup";

    const header = {
      "Content-Type": "application/json",
    };

    const loginBody = JSON.stringify({
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    });

    const signupBody = JSON.stringify({
      name: formState.inputs.email.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    });

    let response;
    if (isLoginMode) {
      try {
        response = await sendRequest(loginUrl, "POST", header, loginBody);
        auth.login();
      } catch {}
    } else {
      try {
        response = await sendRequest(signupUrl, "POST", header, signupBody);
        auth.login();
      } catch (error) {}
    }
  };

  const switchModeHandler: () => void = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, name: { value: "", isValid: false } },
        false
      );
    }

    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <>
      <ErrorModal show={!!error} error={error!} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <Spinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name"
              onInput={formFieldHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address"
            onInput={formFieldHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password (min. 5 characters)"
            onInput={formFieldHandler}
          />
          <Button disabled={!formState.isValid}>
            {isLoginMode ? "Login" : "Signup"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch to {isLoginMode ? "signup" : "login"}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
