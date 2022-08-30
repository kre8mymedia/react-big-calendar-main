import React from "react";
import { Button, Dialog } from "@material-ui/core";
import AddProjectForm from "../forms/project/AddProjectForm";
import UpdateProjectForm from "../forms/project/UpdateProjectForm";

import { AiOutlineFundProjectionScreen } from "react-icons/ai";

import { useProjectContext } from "../../contexts/ProjectContext";

const chooseFormType = (props) => {
  if (props.type === "add") {
    return <AddProjectForm />;
  } else if (props.type === "update") {
    return <UpdateProjectForm />;
  }
};

export default function EventModal() {
  const {
    modal,
    handleClickOpen,
    handleClose,
    formType,
    setFormType
  } = useProjectContext();

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => {
          handleClickOpen();
          setFormType("add");
        }}
      >
        <AiOutlineFundProjectionScreen />
      </Button>
      <Dialog open={modal} onClose={handleClose}>
        {chooseFormType({ type: formType })}
      </Dialog>
    </div>
  );
}