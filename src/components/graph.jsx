import React, { Component } from "react";
import Col from "react-bootstrap/Col";

import ReactChartkick, { ColumnChart } from "react-chartkick";
import Chart from "chart.js";

ReactChartkick.addAdapter(Chart);

class Graph extends Component {
  render() {
    return (
      <React.Fragment>
        <Col lg={4} md={4} sm={12} xs={12}>
          <div className="center-column-height">
            <h2 className="m-4">Check the Results</h2>
            <div>
              <div className="graph">
                <ColumnChart
                  data={this.props.data}
                  colors={["#07f", "#666"]}
                  label="Votes"
                />
              </div>
            </div>
          </div>
          <p className="inline-items-align">
            Total votes:{" "}
            {this.props.data
              .map(el => parseInt(el[1]))
              .reduce((acc, value) => {
                return acc + value;
              }, 0)}
          </p>
        </Col>
      </React.Fragment>
    );
  }
}

export default Graph;
