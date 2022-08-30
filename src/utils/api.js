import axios from "axios";
// import { access_token } from "../config";

const APP_ENV = "production";
const HOST =
  APP_ENV === "development"
    ? "https://e16c-99-36-3-176.ngrok.io"
    : "https://ts-dev-api.glootie.ml";

// axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

/**-------------------------------------------------------------------------------
 * Event Routes
 * 
 * -------------------------------------------------------------------------------
 */
export async function fetchEvents(timeInfo = null, headers = null) {
  let res;
  if (timeInfo === null) {
    res = await axios.get(`${HOST}/api/v1/events`, headers);
  } else {
    res = await axios.get(`${HOST}/api/v1/events`, timeInfo);
  }
  const events = res.data.events;
  console.log("fetchEvents: ", events);
  return events;
}

export async function createEvent(eventInput, headers = null) {
  const res = await axios.post(`${HOST}/api/v1/events`, eventInput, headers);
  const event = res.data;
  console.log("createEvent: ", event);
  return event;
}

export async function showEvent(id, headers = null) {
  const res = await axios.get(`${HOST}/api/v1/events/${id}`, headers);
  const event = res.data;
  console.log("showEvent: ", event);
  return event;
}

export async function updateEvent(id, eventInput, headers = null) {
  const res = await axios.put(`${HOST}/api/v1/events/${id}`, eventInput, headers);
  const event = res.data;
  console.log("updateEvent: ", event);
  return event;
}

export async function deleteEvent(id, headers = null) {
  const res = await axios.delete(`${HOST}/api/v1/events/${id}`, headers);
  const event = res.data;
  console.log(`deletedEvent: ${id}`);
  return event;
}

/**-------------------------------------------------------------------------------
 * Auth Routes
 * 
 * -------------------------------------------------------------------------------
 */
 export async function loginUser(loginInput) {
  try {
    const res = await axios.post(`${HOST}/api/v1/login`, loginInput);
    const data = res.data;
    console.log("api.loginInput: ", loginInput);
    return data;
  } catch(e) {
    throw new Error(e);
  }
}