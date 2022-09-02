import "../../index.scss";
import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Grid,
  Button
} from "@material-ui/core";
import SelectProject from '../fields/SelectProject';
import MultipleSelect from "../fields/MultipleSelect";
import MDEditor from '@uiw/react-md-editor';

import { useEventContext } from "../../contexts/EventContext";
import { useNotificationContext } from "../../contexts/NotificationContext";

export default function AddEventForm() {
  const { saveEvent, handleClose, selectedEvent } = useEventContext();
  const { notifications, notification, selected, setSelected } = useNotificationContext();

  const [title, setTitle] = React.useState("");
  const [description, setDesc] = React.useState("");
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);

  const submit = async () => {
    try {
      const sent = await saveEvent({
        title,
        description,
        start,
        end
      });
      if (sent.success) {
        setTitle("");
        setDesc("");
        setStart(null);
        setSelected([]);
        setEnd(null);
        handleClose();
      }
    } catch (e) {
      alert(e);
      console.log("AddEventForm.submit: ", e);
    }
  };

  React.useEffect(() => {
    if (selectedEvent) {
      setStart(selectedEvent.start);
      setEnd(selectedEvent.end);
    }
  }, [selectedEvent]);

  return (
    <div>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This modal is used for creating new calendar events.
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <SelectProject />
          </Grid>
          <Grid item xs={6}>
            <MultipleSelect 
              items={notifications} 
              item={notification ? notification : null} 
              label="Notification" 
              selected={selected}
              setSelected={setSelected} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Enter event title"
              autoFocus
              id="name"
              label="Title"
              type="email"
              fullWidth
              variant="outlined"
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <MDEditor
              value={description}
              onChange={setDesc}
            />
          </Grid>
          <Grid item xs={6}>
            <div className="container">
              <div className="material-textfield">
                <input
                  value={start || ""}
                  onChange={(e) => setStart(e.target.value)}
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
                  value={end || ""}
                  onChange={(e) => setEnd(e.target.value)}
                  type="datetime-local"
                />
                <label>End</label>
              </div>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={submit}>Submit</Button>
      </DialogActions>
    </div>
  );
}
