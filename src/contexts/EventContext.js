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

export const EventContext = React.createContext();

const EventProvider = ({ children }) => {
  const { token } = useAuthContext();
  const { project, setProject } = useProjectContext();
  const [events, setEvents] = React.useState([]);
  const [selectedEvent, setSelectedEvent] = React.useState({
    _id: "",
    title: "",
    description: "",
    start: null,
    end: null,
    bgColor: ""
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
        console.log("selectExisting", { ...event, ...stamps });
      }
    } catch (e) {
      alert("handleClickOpen: ", e);
    }
  };

  const handleClose = () => {
    setFormType("");
    setProject({
      _id: '',
      name: '',
      color: '',
    });
    setSelectedEvent(null);
    setOpen(false);
  };

  const saveEvent = async (data) => {
    const adjustPayload = fixDatesAsTimestamps(data);
    const newEvent = await createEvent({ ...adjustPayload, ...data, project: project._id }, {headers: {"Authorization": `Bearer ${token}`}});
    if (newEvent.success) {
      init();
    }
    return newEvent;
  };

  const editEvent = async (data) => {
    const res = await updateEvent(selectedEvent._id, data, {headers: {"Authorization": `Bearer ${token}`}});
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
