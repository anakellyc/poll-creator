import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./App.css";
import "./components/components.css";
import PoolCreator from "./components/poolCreator";
import NavBar from "./components/navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Container>
          <Row>
            <PoolCreator className="margin-sides" />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
