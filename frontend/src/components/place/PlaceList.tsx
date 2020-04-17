import React from "react";

import PlaceItem from "./PlaceItem";
import Card from "../ui-elements/Card";

import PlaceProps from "../../models/place";

import "./PlaceList.scss";
import Button from "../form-elements/Button";

const PlaceList: React.FC<{ items: PlaceProps[] }> = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button>Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place._id}
          _id={place._id}
          address={place.address}
          imageUrl={place.imageUrl}
          title={place.title}
          description={place.description}
          creator={place.creator}
          coordinates={place.coordinates}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
