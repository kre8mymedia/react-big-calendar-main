// context/todoContext.tsx
import * as React from "react";
import {
  createEvent,
  fetchEvents,
  deleteEvent,
  updateEvent
} from "../utils/api";
import {
  fixDatesAsTimestamps,
  fixDatesAsIso,
  reformatEvents
} from "../utils/format";
import { useAuthContext } from "../contexts/AuthContext";
import { useProjectContext } from "../contexts/ProjectContext";
import { useNotificationContext } from "../contexts/NotificationContext";

export const EventContext = React.createContext();

const EventProvider = ({ children }) => {
  const { token } = useAuthContext();
  const { project, setProject } = useProjectContext();
  const { selected } = useNotificationContext();

  const [events, setEvents] = React.useState([]);
  const [selectedEvent, setSelectedEvent] = React.useState({
    _id: "",
    title: "",
    description: "",
    bgColor: "",
    start: null,
    end: null,
    project: null,
    notifications: [],
  });
  const [open, setOpen] = React.useState(false);
  const [formType, setFormType] = React.useState("");

  const handleClickOpen = (event = null) => {
    try {
      setOpen(true);
      if (event === null) {
        // Create New Event
        setFormType("add");
      } else if (
        event.hasOwnProperty("start") &&
        event.hasOwnProperty("end") &&
        !event.hasOwnProperty("title") &&
        !event.hasOwnProperty("description")
      ) {
        // Timeslot Select
        setFormType("add");
        const stamps = fixDatesAsIso(event);
        setSelectedEvent(stamps);
        console.log("timeslot", stamps);
      } else {
        // Select Existing
        setFormType("show");
        const stamps = fixDatesAsIso(event);
        setSelectedEvent({ ...event, ...stamps });
        console.log("EventContext.selectExisting", { ...event, ...stamps });
      }
    } catch (e) {
      alert("handleClickOpen: ", e);
    }
  };

  const handleClose = () => {
    setFormType("");
    setProject(null);
    setSelectedEvent(null);
    setOpen(false);
  };

  const saveEvent = async (data) => {
    const adjustPayload = fixDatesAsTimestamps(data);
    const newEvent = await createEvent({ ...adjustPayload, ...data, project: project ? project._id : null, notifications: selected.length > 0 ? selected : null }, {headers: {"Authorization": `Bearer ${token}`}});
    if (newEvent.success) {
      init();
    }
    return newEvent;
  };

  const editEvent = async (data) => {
    const res = await updateEvent(selectedEvent._id, {...data, notifications: selected.length > 0 ? selected : null}, {headers: {"Authorization": `Bearer ${token}`}});
    const reformatItem = fixDatesAsTimestamps(res.event);
    if (res.success) {
      handleClose();
      init();
    }
    return reformatItem;
  };

  const removeEvent = async () => {
    const newEvent = await deleteEvent(selectedEvent._id, {headers: {"Authorization": `Bearer ${token}`}});
    if (newEvent.success) {
      handleClose();
      init();
    }
    return newEvent;
  };

  const init = async () => {
    try {
      const events = await fetchEvents(null, {headers: {"Authorization": `Bearer ${token}`}});
      const newItems = reformatEvents(events);
      console.log("EventContext.init: ", newItems);
      setEvents(newItems);
    } catch (e) {
      // alert(e);
      console.log(e)
    }
  };

  React.useEffect(() => {
    init();
  }, [token]);

  return (
    <EventContext.Provider
      value={{
        events,
        open,
        saveEvent,
        editEvent,
        removeEvent,
        handleClickOpen,
        handleClose,
        selectedEvent,
        setSelectedEvent,
        formType,
        setFormType
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;

export function useEventContext() {
  return React.useContext(EventContext);
}
