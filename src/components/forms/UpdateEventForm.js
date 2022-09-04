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
import MDEditor from '@uiw/react-md-editor';
import MultipleSelect from "../fields/MultipleSelect";
import SelectProject from '../fields/SelectProject';
// Contexts
import { useEventContext } from "../../contexts/EventContext";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useNotificationContext } from "../../contexts/NotificationContext";

export default function UpdateEventForm() {
  const { handleClose, selectedEvent, editEvent } = useEventContext();
  const { notifications, notification, selected, setSelected } = useNotificationContext();
  const { project } = useProjectContext();

  const [title, setTitle] = React.useState("");
  const [description, setDesc] = React.useState("");
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);

  const submit = async () => {
    try {
      const res = await editEvent({
        title,
        description,
        start,
        end,
        project: project === null ? null : project._id,
      });
      setSelected([]);
      console.log("UpdateEventForm.submit: ", res);
    } catch (e) {
      alert(e);
      console.log("UpdateEventForm.submit: ", e);
    }
  };

  React.useEffect(() => {
    setTitle(selectedEvent.title);
    setDesc(selectedEvent.description);
    setStart(selectedEvent.start);
    setEnd(selectedEvent.end);
  }, [selectedEvent]); 
  
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
      <DialogTitle>Update Event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This modal shows the event details..
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <SelectProject disabled={false} />
          </Grid>
          <Grid item xs={6}>
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
              autoFocus
              id="name"
              label="Title"
              type="email"
              fullWidth
              variant="outlined"
              value={title ? title : ""}
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
                  value={start ? start : ""}
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
                  value={end ? end : ""}
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
        <Button onClick={submit}>Update</Button>
      </DialogActions>
    </div>
  );
}
