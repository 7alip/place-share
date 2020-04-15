import React, { useState, useContext } from "react";

import Card from "../ui-elements/Card";
import Modal from "../ui-elements/Modal";
import Button from "../form-elements/Button";

import { AuthContextProps, AuthContext } from "../../context/auth-context";
import PlaceProps from "../../models/place";

import "./PlaceItem.scss";

const PlaceItem: React.FC<PlaceProps> = (props) => {
  const auth: AuthContextProps = useContext(AuthContext);

  const [showMap, setShowMap] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const openMapHandler: () => void = () => {
    console.log("showMap", showMap);
    setShowMap(true);
  };

  const closeMapHandler: () => void = () => {
    console.log("showMap", showMap);
    setShowMap(false);
  };

  const openDeleteHandler: () => void = () => {
    setShowConfirmModal(true);
  };

  const closeDeleteHandler: () => void = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler: () => void = () => {
    console.log("Deleting");
  };

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-footer"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <h2>The Map!</h2>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={closeDeleteHandler}
        header={"Are your sure?"}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={closeDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter!
        </p>
      </Modal>
      <li className="place-item">
        <Card>
          <div className="place-item__image">
            <img src={props.imageUrl} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              View On Map
            </Button>
            {auth.isLoggedIn && (
              <>
                <Button to={`/places/${props.id}`}>Edit</Button>
                <Button danger onClick={openDeleteHandler}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
