import { render } from "react-dom";
import React, { Component } from "react";
import Home from "./pages/Home";
import EventProvider from "./contexts/EventContext";
import AuthProvider from "./contexts/AuthContext";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <EventProvider>
          <Home />
        </EventProvider>
      </AuthProvider>
    );
  }
}

render(<App />, document.getElementById("app"));
