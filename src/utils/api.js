import axios from "axios";
require('dotenv').config()

const APP_ENV = process.env.REACT_APP_ENV;
const HOST =
  APP_ENV === "development"
    ? "https://ts-dev-api.glootie.ml"
    // ? "http://localhost:8000"
    : "https://ts-prod-api.glootie.ml";

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

/**-------------------------------------------------------------------------------
 * Project Routes
 * 
 * -------------------------------------------------------------------------------
 */
 export async function fetchProjects(query = null, headers = null) {
  try {
    const res = await axios.get(`${HOST}/api/v1/projects`, headers);
    const data = res.data;
    console.log("api.fetchProjects: ", data);
    return data;
  } catch(e) {
    throw new Error(e);
  }
}

export async function createProject(projectInput, headers = null) {
  const res = await axios.post(`${HOST}/api/v1/projects`, projectInput, headers);
  const project = res.data;
  console.log("createProject: ", project);
  return project;
}

export async function deleteProject(id, headers = null) {
  const res = await axios.delete(`${HOST}/api/v1/projects/${id}`, headers);
  const project = res.data;
  console.log("deleteProject: ", project);
  return project;
}

/**-------------------------------------------------------------------------------
 * Notification Routes
 * 
 * -------------------------------------------------------------------------------
 */
 export async function fetchNotifications(query = null, headers = null) {
  try {
    const res = await axios.get(`${HOST}/api/v1/notifications`, headers);
    const data = res.data;
    console.log("api.fetchNotifications: ", data);
    return data;
  } catch(e) {
    throw new Error(e);
  }
}

export async function createNotification(notificationInput, headers = null) {
  try {
    const res = await axios.post(`${HOST}/api/v1/notifications`, notificationInput, headers);
    const notification = res.data;
    console.log("createNotification: ", notification);
    return notification;
  } catch(e) {
    throw new Error(e);
  }
}

export async function deleteNotification(id, headers = null) {
  try {
    const res = await axios.delete(`${HOST}/api/v1/notifications/${id}`, headers);
    const notification = res.data;
    console.log("deleteNotification: ", notification);
    return notification;
  } catch(e) {
    throw new Error(e);
  }
}