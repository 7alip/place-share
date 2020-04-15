import React from "react";

import UserItem from "./UserItem";
import Card from "../ui-elements/Card";

import UserProps from "../../models/user";

import "./UserList.scss";

const UserList: React.FC<{ items: UserProps[] }> = (props: any) => {
  if (props.items.length === 0)
    return (
      <div className="center">
        <Card>
          <h2>No users found</h2>
        </Card>
      </div>
    );

  return (
    <ul className="users-list">
      {props.items.map((user: UserProps) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
};

export default UserList;
