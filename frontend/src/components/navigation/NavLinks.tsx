import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.scss";
import { AuthContext, AuthContextProps } from "../../context/auth-context";
import Button from "../form-elements/Button";

const NavLinks: React.FC = () => {
  const auth: AuthContextProps = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <>
          <li>
            <NavLink to={`${auth.userId}/places`}>My Places</NavLink>
          </li>
          <li>
            <NavLink to="/places/new">New Place</NavLink>
          </li>
        </>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Button onClick={auth.logout}>Logout</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
