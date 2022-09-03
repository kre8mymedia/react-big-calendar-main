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
      <DialogTitle>Show Event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This modal shows the event details..
        </DialogContentText>
        <Grid container spacing={2}>
        <Grid item xs={6}>
            <SelectProject disabled={true} />
          </Grid>
        <Grid item xs={6}>
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
            <TextField
              autoFocus
              id="name"
              label="Title"
              type="email"
              fullWidth
              variant="outlined"
              value={selectedEvent ? selectedEvent.title : null}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12}>
            <MDEditor
              value={selectedEvent.description}
              preview="preview"
              commands={[
                commands.codePreview
              ]}
              // onChange={setDesc}
            />
          </Grid>
          <Grid item xs={6}>
            <div className="container">
              <div className="material-textfield">
                <input
                  disabled
                  value={selectedEvent ? selectedEvent.start : null}
                  type="datetime-local"
                />
                <label>Start</label>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="container">
              <div className="material-textfield">
                <input
                  disabled
                  value={selectedEvent ? selectedEvent.end : null}
                  type="datetime-local"
                />
                <label>End</label>
              </div>
            </div>
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
