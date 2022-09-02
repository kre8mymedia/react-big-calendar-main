import { render } from "react-dom";
import React, { Component } from "react";
import Home from "./pages/Home";
import EventProvider from "./contexts/EventContext";
import AuthProvider from "./contexts/AuthContext";
import ProjectProvider from "./contexts/ProjectContext";
import NotificationProvider from "./contexts/NotificationContext";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <NotificationProvider>
          <ProjectProvider>
            <EventProvider>
              <Home />
            </EventProvider>
          </ProjectProvider>
        </NotificationProvider>
      </AuthProvider>
    );
  }
}

render(<App />, document.getElementById("app"));
