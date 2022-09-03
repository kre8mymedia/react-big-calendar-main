// Styles
import "react-big-calendar-like-google/lib/css/react-big-calendar.css";
// Packages
import React from "react";
import moment from "moment";
// Components
import BigCalendar from "react-big-calendar-like-google";
import EventModal from "../components/modals/EventModal";
import ProjectModal from "../components/modals/ProjectModal";
import {
  Grid,
} from "@material-ui/core";
// Contexts
import { useEventContext } from "../contexts/EventContext";
import { useAuthContext } from "../contexts/AuthContext";

moment.locale("en");
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default function Calender() {
  const { events, handleClickOpen } = useEventContext();
  const { setToken } = useAuthContext();

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item>
          <EventModal />
        </Grid>
        <Grid item>
          <ProjectModal />
        </Grid>
        <Grid item>
          <button onClick={() => {setToken(''); localStorage.setItem('token', '')}} style={{ position: "absolute", right: 10, top: 10 }}>Logout</button>
        </Grid>
      </Grid>
      <BigCalendar
        popup
        selectable
        events={events}
        defaultView="month"
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date()}
        onSelectEvent={(event) => {
          handleClickOpen(event);
        }}
        onSelectSlot={(slotInfo) => {
          const data = {
            start: slotInfo.start,
            end: slotInfo.end
          };
          handleClickOpen(data);
        }}
      />
    </div>
  );
}
