import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/place/PlaceList";

import PlaceProps from "../models/place";

const DUMMY_PLACES: PlaceProps[] = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    address: "20 W 34th St, New York, NY 10001",
    coordinates: { lat: 40.74, lng: -73.98 },
    imageUrl:
      "https://cdn.getyourguide.com/img/location_img-2608-1226636435-148.jpg",
    creatorId: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    address: "adress",
    coordinates: { lat: 40.74, lng: -73.98 },
    imageUrl:
      "https://cdn.getyourguide.com/img/location_img-2608-1226636435-148.jpg",
    creatorId: "u2",
  },
];

const UserPlaces: React.FC = () => {
  const { userId } = useParams();

  return (
    <PlaceList
      items={DUMMY_PLACES.filter((place) => place.creatorId === userId)}
    />
  );
};

export default UserPlaces;
