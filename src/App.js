import React, { Component } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import PoolOptions from "./components/poolCreator";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <PoolOptions />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
