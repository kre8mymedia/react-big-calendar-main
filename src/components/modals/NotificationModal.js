import React from "react";
import { Button, Dialog } from "@material-ui/core";
import NotificationTextIconList from "../lists/NotificationTextIconList";
import AddNotificationForm from "../forms/notifications/AddNotificationForm";
import AddAlert from '@material-ui/icons/AddAlert';

import { useNotificationContext } from "../../contexts/NotificationContext";

const chooseFormType = (props) => {
  if (props.type === "add") {
    return <AddNotificationForm />;
  }

  if (props.type === "list") {
    return <NotificationTextIconList />;
  }
};

export default function NotificationModal(props) {
  const {
    modal,
    handleClickOpen,
    handleClose,
    formType,
    setFormType
  } = useNotificationContext();

  return (
    <div>
      {props.renderFrom === 'ShowEventForm' ? (
        <Button
          style={{ position: 'absolute', right: 20 }}
          onClick={() => {
            handleClickOpen();
            setFormType("add");
          }}
        >
          <AddAlert style={{ fill: `#DC143C` }}  />
        </Button>
      ) : null}
      {props.renderFrom === 'Calendar' ? (
        <Button
          variant="outlined"
          onClick={() => {
            handleClickOpen();
            setFormType("add");
          }}
        >
          <AddAlert style={{ fontSize: `15px` }} />
        </Button>
      ) : null}
      <Dialog open={modal} onClose={handleClose}>
        {chooseFormType({ type: formType })}
      </Dialog>
    </div>
  );
}