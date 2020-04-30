import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../components/form-elements/Input";
import Spinner from "../components/ui-elements/Spinner";
import Button from "../components/form-elements/Button";
import ErrorModal from "../components/ui-elements/ErrorModal";

import { useForm } from "../hooks/form-hook.js";
import { useHttpClient } from "../hooks/http-hooks";
import { AuthContext } from "../context/auth-context";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../utils/validator";

import "./PlaceForm.scss";
import ImageUpload from "../components/form-elements/ImageUpload";

const initialInputs = {
  title: { value: "", isValid: false },
  description: { value: "", isValid: false },
  address: { value: "", isValid: false },
  image: { value: null, isValid: false },
};

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const [formState, formFieldChangeHandler] = useForm(initialInputs, false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  const placeSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      formData.append("creator", auth.userId!);
      console.log('formData.get("image")', formData.get("image"));

      await sendRequest("http://localhost:5000/api/places", "POST", formData);
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
        <ImageUpload
          id="image"
          center
          onInput={formFieldChangeHandler}
          errorText="Please provide an image."
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
