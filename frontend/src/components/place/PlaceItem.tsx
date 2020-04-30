import React, { useState, useContext } from "react";

import Card from "../ui-elements/Card";
import Modal from "../ui-elements/Modal";
import Button from "../form-elements/Button";

import { AuthContextProps, AuthContext } from "../../context/auth-context";
import PlaceProps from "../../models/place";

import "./PlaceItem.scss";
import { useHttpClient } from "../../hooks/http-hooks";
import Spinner from "../ui-elements/Spinner";
import ErrorModal from "../ui-elements/ErrorModal";

const PlaceItem: React.FC<PlaceProps> = (props) => {
  const auth: AuthContextProps = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showMap, setShowMap] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const openMapHandler: () => void = () => {
    setShowMap(true);
  };

  const closeMapHandler: () => void = () => {
    setShowMap(false);
  };

  const openDeleteHandler: () => void = () => {
    setShowConfirmModal(true);
  };

  const closeDeleteHandler: () => void = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler: () => void = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props._id}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      props.onDelete!(props._id);
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error!} show={error!} onClear={clearError} />
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
        <Card className="place-item__content">
          {isLoading && <Spinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
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
            {auth.userId === props.creator && (
              <>
                <Button to={`/places/${props._id}`}>Edit</Button>
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
