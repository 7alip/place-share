import React, { useContext } from "react";

import Input from "../components/form-elements/Input";
import Button from "../components/form-elements/Button";

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../utils/validator";

import "./PlaceForm.scss";
import { useForm } from "../hooks/form-hook.js";
import { useHttpClient } from "../hooks/http-hooks";
import { AuthContext } from "../context/auth-context";
import ErrorModal from "../components/ui-elements/ErrorModal";
import Spinner from "../components/ui-elements/Spinner";
import { useHistory } from "react-router-dom";

const initialInputs = {
  title: { value: "", isValid: false },
  description: { value: "", isValid: false },
  address: { value: "", isValid: false },
};

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const [formState, formFieldChangeHandler] = useForm(initialInputs, false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  const placeSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        }),
        { "Content-Type": "application/json" }
      );
      history.push("/");
      // Redirect the user to a different page
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal show={error!} error={error!} onClear={clearError} />
      <form onSubmit={placeSubmitHandler} className="place-form">
        {isLoading && <Spinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please provide a valid title"
          initialValue={formState.inputs.title.value}
          onInput={formFieldChangeHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please provide a valid description"
          onInput={formFieldChangeHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please provide a valid address"
          onInput={formFieldChangeHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
