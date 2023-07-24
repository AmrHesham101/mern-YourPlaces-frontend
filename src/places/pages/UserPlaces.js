import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Emp. State Building",
    description: "One of the most famous sky scrapers in the world",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Empire_State_Building%2C_October_2011.JPG/640px-Empire_State_Building%2C_October_2011.JPG",
    address: "20 W 34th St., New York, NY 10001, USA",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/The_Empire_State_Building_%2812%29.jpg/640px-The_Empire_State_Building_%2812%29.jpg",
    address: "20 W 34th St., New York, NY 10001, USA",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];
const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
