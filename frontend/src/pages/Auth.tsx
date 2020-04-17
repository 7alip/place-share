import React, { useState, useContext } from "react";

import Card from "../components/ui-elements/Card";
import Input from "../components/form-elements/Input";
import Button from "../components/form-elements/Button";

import { AuthContextProps, AuthContext } from "../context/auth-context";

import { useForm } from "../hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../utils/validator";

import "./Auth.scss";

const initialForm = {
  email: { value: "", isValid: false },
  password: { value: "", isValid: false },
};

const Auth: React.FC = () => {
  const auth: AuthContextProps = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formState, formFieldHandler, setFormData] = useForm(
    initialForm,
    false
  );

  const authSubmitHandler: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    auth.login();
  };

  const switchModeHandler: () => void = () => {
    if (!isLogin) {
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

    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLogin && (
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
          {isLogin ? "Login" : "Signup"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        Switch to signup
      </Button>
    </Card>
  );
};

export default Auth;
