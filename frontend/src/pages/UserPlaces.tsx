import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/place/PlaceList";

import PlaceProps from "../models/place";
import { useHttpClient } from "../hooks/http-hooks";
import ErrorModal from "../components/ui-elements/ErrorModal";
import Spinner from "../components/ui-elements/Spinner";

const UserPlaces: React.FC = () => {
  const [places, setPlaces] = useState<PlaceProps[]>();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { userId } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_API_URL}/places/user/${userId}`
        );
        setPlaces(response.places);
      } catch (error) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId: string) => {
    setPlaces((prevPlaces) =>
      prevPlaces?.filter((place) => place._id !== deletedPlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={error!} show={error!} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <Spinner />
        </div>
      )}
      {!isLoading && places && places.length > 0 && (
        <PlaceList
          items={places!.filter((place) => place.creator === userId)}
          onDeletePlace={placeDeletedHandler}
        />
      )}
    </>
  );
};

export default UserPlaces;
