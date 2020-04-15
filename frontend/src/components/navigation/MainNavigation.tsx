import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";

import "./MainNavigation.scss";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../ui-elements/Backdrop";

const MainNavigation: React.FC = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawer: () => void = () => setDrawerIsOpen(true);
  const closeDrawer: () => void = () => setDrawerIsOpen(false);

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}(
      <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      )
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your Places</Link>
        </h1>
        <nav>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
