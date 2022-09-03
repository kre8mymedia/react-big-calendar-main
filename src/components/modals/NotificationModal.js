import React from "react";
import { Button, Dialog } from "@material-ui/core";
import NotificationTextIconList from "../lists/NotificationTextIconList";
import AddNotificationForm from "../forms/notifications/AddNotificationForm";

import { AiOutlineNotification } from "react-icons/ai";

import { useNotificationContext } from "../../contexts/NotificationContext";

const chooseFormType = (props) => {
  if (props.type === "add") {
    return <AddNotificationForm />;
  }

  if (props.type === "list") {
    return <NotificationTextIconList />;
  }
};

export default function NotificationModal() {
  const {
    modal,
    handleClickOpen,
    handleClose,
    formType,
    setFormType
  } = useNotificationContext();

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => {
          handleClickOpen();
          setFormType("add");
        }}
      >
        <AiOutlineNotification />
      </Button>
      <Dialog open={modal} onClose={handleClose}>
        {chooseFormType({ type: formType })}
      </Dialog>
    </div>
  );
}