import React, { useEffect, useState } from "react";

import UserList from "../components/user/UserList";

import UserProps from "../models/user";
import Spinner from "../components/ui-elements/Spinner";
import ErrorModal from "../components/ui-elements/ErrorModal";
import { useHttpClient } from "../hooks/http-hooks";

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      console.log(
        "process.env.REACT_APP_API_URL",
        process.env.REACT_APP_API_URL
      );
      try {
        const { users } = await sendRequest(
          `${process.env.REACT_APP_API_URL}/user`
        );

        setUsers(users);
      } catch (error) {}
    };

    fetchUsers();
  }, [sendRequest]);

  if (isLoading)
    return (
      <div className="center">
        <Spinner />
      </div>
    );

  if (error)
    return <ErrorModal error={error!} show={!!error} onClear={clearError} />;

  return <UserList items={users} />;
};

export default Users;
