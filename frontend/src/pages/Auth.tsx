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
import ImageUpload from "../components/form-elements/ImageUpload";

const initialForm = {
  email: { value: "", isValid: false },
  password: { value: "", isValid: false },
  image: { value: null, isValid: false },
};

const Auth: React.FC = () => {
  const auth: AuthContextProps = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, formFieldChangeHandler, setFormData] = useForm(
    initialForm,
    false
  );

  const switchModeHandler: () => void = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined, image: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
          image: { value: null, isValid: false },
        },
        false
      );
    }

    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const loginUrl = `${process.env.REACT_APP_API_URL}/user/login`;
    const signupUrl = `${process.env.REACT_APP_API_URL}/user/signup`;

    const header = {
      "Content-Type": "application/json",
    };

    const loginBody = JSON.stringify({
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    });

    let response;
    if (isLoginMode) {
      try {
        response = await sendRequest(loginUrl, "POST", loginBody, header);
        auth.login(response.userId, response.token, response.exp);
      } catch {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);

        response = await sendRequest(signupUrl, "POST", formData);
        auth.login(response.userId, response.token, response.exp);
      } catch (error) {}
    }
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
            <>
              <Input
                id="name"
                element="input"
                type="text"
                label="Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid name"
                onInput={formFieldChangeHandler}
              />
              <ImageUpload
                id="image"
                errorText={error!}
                center
                onInput={formFieldChangeHandler}
              />
            </>
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address"
            onInput={formFieldChangeHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password (min. 5 characters)"
            onInput={formFieldChangeHandler}
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
