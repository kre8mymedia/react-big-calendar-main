import { render } from "react-dom";
import React, { Component } from "react";
import Home from "./pages/Home";
import EventProvider from "./contexts/EventContext";
import AuthProvider from "./contexts/AuthContext";
import ProjectProvider from "./contexts/ProjectContext";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <ProjectProvider>
          <EventProvider>
            <Home />
          </EventProvider>
        </ProjectProvider>
      </AuthProvider>
    );
  }
}

render(<App />, document.getElementById("app"));
