import React from "react";

import UserList from "../components/user/UserList";

import UserProps from "../models/user";

const USERS: UserProps[] = [
  { id: "u1", name: "Max Schwarz", image: "", placeCount: 3 },
];

const Users: React.FC = () => {
  return <UserList items={USERS} />;
};

export default Users;
