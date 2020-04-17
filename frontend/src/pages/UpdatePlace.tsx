import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../components/form-elements/Input";
import Button from "../components/form-elements/Button";

import PlaceProps from "../models/place";
import { useForm } from "../hooks/form-hook.js";
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH } from "../utils/validator";

import "./PlaceForm.scss";
import Card from "../components/ui-elements/Card";

const DUMMY_PLACES: PlaceProps[] = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    address: "20 W 34th St, New York, NY 10001",
    coordinates: { lat: 40.74, lng: -73.98 },
    imageUrl:
      "https://cdn.getyourguide.com/img/location_img-2608-1226636435-148.jpg",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    address: "adress",
    coordinates: { lat: 40.74, lng: -73.98 },
    imageUrl:
      "https://cdn.getyourguide.com/img/location_img-2608-1226636435-148.jpg",
    creator: "u2",
  },
];

const initialInputs = {
  title: { value: "", isValid: false },
  description: { value: "", isValid: false },
};

const UpdatePlace = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { placeId } = useParams();
  const identifiedPlace: PlaceProps = DUMMY_PLACES.find(
    (place) => place.id === placeId
  )!;

  const [formState, formFieldChangeHandler, setFormData] = useForm(
    initialInputs,
    false
  );

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: { value: identifiedPlace.title, isValid: true },
          description: { value: identifiedPlace.description, isValid: true },
        },
        true
      );
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [setFormData, identifiedPlace]);

  const placeSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  if (!identifiedPlace)
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );

  if (loading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
        onInput={formFieldChangeHandler}
      />
      <Input
        id="description"
        element="textarea"
        validators={[VALIDATOR_MAXLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
        onInput={formFieldChangeHandler}
      />
      <Button>Update Place</Button>
    </form>
  );
};

export default UpdatePlace;
