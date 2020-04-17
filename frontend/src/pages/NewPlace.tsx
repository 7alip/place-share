import React from "react";

import Input from "../components/form-elements/Input";
import Button from "../components/form-elements/Button";

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../utils/validator";

import "./PlaceForm.scss";
import { useForm } from "../hooks/form-hook.js";

const initialInputs = {
  title: { value: "", isValid: false },
  description: { value: "", isValid: false },
  address: { value: "", isValid: false },
};

const NewPlace = () => {
  const [formState, formFieldChangeHandler] = useForm(initialInputs, false);

  const placeSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={placeSubmitHandler} className="place-form">
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
  );
};

export default NewPlace;
