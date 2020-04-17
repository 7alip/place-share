import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../ui-elements/Avatar";
import Card from "../ui-elements/Card";

import UserProps from "../../models/user";

import "./UserItem.scss";

const UserItem: React.FC<{ user: UserProps }> = (props) => {
  const { _id, name, image, placeCount } = props.user;

  return (
    <li className="user-item">
      <Card>
        <Link to={`/${_id}/places`}>
          <div className="user-item__image">
            <Avatar image={image} alt={name} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
