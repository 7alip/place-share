import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Card from "../components/ui-elements/Card";
import Input from "../components/form-elements/Input";
import Button from "../components/form-elements/Button";
import ErrorModal from "../components/ui-elements/ErrorModal";

import PlaceProps from "../models/place";
import { useForm } from "../hooks/form-hook.js";
import { useHttpClient } from "../hooks/http-hooks";
import { AuthContext } from "../context/auth-context";
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH } from "../utils/validator";

import "./PlaceForm.scss";

const initialInputs = {
  title: { value: "", isValid: false },
  description: { value: "", isValid: false },
};

const UpdatePlace = () => {
  const [place, setPlace] = useState<PlaceProps>();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { placeId } = useParams();
  const history = useHistory();

  const auth = useContext(AuthContext);

  const [formState, formFieldChangeHandler, setFormData] = useForm(
    initialInputs,
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_API_URL}/places/${placeId}`
        );
        setPlace(response.place);
        setFormData(
          {
            title: { value: response.place.title, isValid: true },
            description: { value: response.place.description, isValid: true },
          },
          true
        );
      } catch (error) {}
    };
    fetchPlace();
  }, [sendRequest, placeId]);

  const placeSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setPlace(response.place);
      setFormData(
        {
          title: { value: response.place.title, isValid: true },
          description: { value: response.place.description, isValid: true },
        },
        true
      );
      history.push(`/${auth.userId}/places`);
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!place && !error)
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );

  return (
    <>
      <ErrorModal show={error!} error={error!} onClear={clearError} />
      {!isLoading && place && (
        <form className="place-form" onSubmit={placeSubmitHandler}>
          <Input
            id="title"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            initialValue={place.title}
            initialValid={true}
            onInput={formFieldChangeHandler}
          />
          <Input
            id="description"
            element="textarea"
            validators={[VALIDATOR_MAXLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            initialValue={place.description}
            initialValid={true}
            onInput={formFieldChangeHandler}
          />
          <Button>Update Place</Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
