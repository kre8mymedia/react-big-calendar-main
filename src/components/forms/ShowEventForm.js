import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Paper,
  Grid,
  Button
} from "@material-ui/core";
import "../../index.scss";
// Components
import ConfirmationModal from "../modals/ConfirmationModal";
import MultipleSelect from "../fields/MultipleSelect";
import SelectProject from '../fields/SelectProject';
import NotificationModal from "../../components/modals/NotificationModal";

import MDEditor, { commands } from '@uiw/react-md-editor';
// Contexts
import { useEventContext } from "../../contexts/EventContext";
import { useNotificationContext } from "../../contexts/NotificationContext";

export default function ShowEventForm() {

  const {
    handleClose,
    selectedEvent,
    setFormType,
    removeEvent
  } = useEventContext();

  const { notifications, notification, selected, setSelected } = useNotificationContext();

  React.useEffect(() => {
    function populateNotificaitons() {
      const newNotifications = [];
      for (let i = 0; i < selectedEvent.notifications.length; i++) {
        newNotifications.push(selectedEvent.notifications[i]._id);
      }

      setSelected(newNotifications);
    }

    populateNotificaitons();
  }, []);

  return (
    <div>
      <DialogTitle>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            {selectedEvent.title}
          </Grid>
          <Grid item xs={1}>
            <NotificationModal renderFrom="ShowEventForm" />
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
            <SelectProject disabled={true} />
          </Grid>
        <Grid item md={6} xs={12}>
            <MultipleSelect
              disabled={true} 
              items={notifications} 
              item={notification ? notification : null} 
              label="Notification" 
              selected={selected}
              setSelected={setSelected} 
            />
          </Grid>
          <Grid item xs={12}>
            <MDEditor
              height={400}
              value={selectedEvent.description}
              preview="preview"
              commands={[
                commands.codePreview
              ]}
              // onChange={setDesc}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              type="datetime-local"
              fullWidth
              variant="outlined"
              disabled
              value={selectedEvent ? selectedEvent.start : null}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              type="datetime-local"
              fullWidth
              variant="outlined"
              disabled
              value={selectedEvent ? selectedEvent.end : null}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <ConfirmationModal action="Delete Event" handleSub={removeEvent} />
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => setFormType("update")}>Edit</Button>
      </DialogActions>
    </div>
  );
}
