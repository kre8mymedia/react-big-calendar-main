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
// Contexts
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
          <Grid item md={6} xs={12}>
            <SelectProject disabled={false} />
          </Grid>
          <Grid item md={6} xs={12}>
            <MultipleSelect
              disabled={false} 
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
              height={300}
              value={description}
              onChange={setDesc}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              type="datetime-local"
              fullWidth
              variant="outlined"
              value={start || ""}
              onChange={(e) => setStart(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              type="datetime-local"
              fullWidth
              variant="outlined"
              value={end || ""}
              onChange={(e) => setEnd(e.target.value)}
            />
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
