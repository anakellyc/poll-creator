import React, { Component } from "react";
import Col from "react-bootstrap/Col";

import "./graph.css";
import ReactChartkick, { ColumnChart } from "react-chartkick";
import Chart from "chart.js";
ReactChartkick.addAdapter(Chart);

class PoolOptions extends Component {
  constructor() {
    super();
    this.state = {
      question: "",
      answersCount: 0,
      answers: [{ oneAnswer: "", count: 0 }],
      inputLength: 0,
      selectedOption: "",
      votes: [],
      data: [["Sun", 32], ["Mon", 46], ["Tue", 28]]
    };
  }

  //Update states according to inputs
  handleInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  //Add answers
  handleAnswerNameChange = idx => evt => {
    const newAnswers = this.state.answers.map((answer, sidx) => {
      if (idx !== sidx) return answer;
      return { ...answer, oneAnswer: evt.target.value, count: 0 };
    });

    this.setState({
      answers: newAnswers,
      inputLength: evt.target.value.length
    });
  };

  //Add 1 to answers count when button is clicked, post answer and reset input value
  addAnswer = e => {
    e.preventDefault();
    const newCount = this.state.answersCount + 1;
    this.setState({
      answersCount: newCount,
      answers: this.state.answers.concat([{ oneAnswer: "" }]),
      inputLength: 0
    });
  };

  //Remove answers
  removeAnswer = idx => () => {
    const newCount = this.state.answersCount - 1;
    this.setState({
      answersCount: newCount,
      answers: this.state.answers.filter((s, sidx) => idx !== sidx),
      inputLength: 1
    });
  };

  //Update selected option
  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
    console.log("lagging");
    console.log(this.state.selectedOption);
  };

  //Count votes
  handleVote = evt => {
    evt.preventDefault();
    let votesArray = this.state.votes;

    if (votesArray.length === 0) {
      this.setState({
        votes: [[this.state.selectedOption, 1]]
      });
    } else if (votesArray.length === 1) {
      if (votesArray[0] === this.state.selectedOption) {
        this.setState({
          votes: [[votesArray[0], votesArray[1] + 1]]
        });
      }
    } else {
      votesArray.forEach(answer => {
        if (answer[0] === this.state.selectedOption) {
          let count = answer[1];
          this.setState({
            votes: [...answer, [answer[0], parseInt(count) + 1]]
          });
        }
      });
    }
  };

  //Clear all data
  reset = () => {
    this.setState({
      question: "",
      answersCount: 0,
      answers: [{ oneAnswer: "", count: 0 }],
      inputLength: 0,
      selectedOption: "",
      votes: []
    });
  };

  render() {
    return (
      <React.Fragment>
        <Col lg={4} md={4} sm={6} xs={12}>
          <h1>This is where the pool is created</h1>
          <p>Please insert a question and up to 10 possible answers:</p>
          <form>
            <input
              className="input-sm m-3"
              type="text"
              name="question"
              maxLength="80"
              placeholder="Type a question"
              value={this.state.question}
              onChange={e => this.handleInputChange(e)}
            />

            {this.state.answers.map((answer, idx) => (
              <div
                key={idx}
                //change style below to css file
                style={{ display: "flex", justifyContent: "center" }}
                className="input-group"
              >
                <input
                  className="input-sm m-1"
                  type="text"
                  name="inputLength"
                  maxLength="80"
                  placeholder="Type an answer"
                  value={answer.oneAnswer}
                  onChange={this.handleAnswerNameChange(idx)}
                />
                <button
                  type="button"
                  className="btn btn-sm m-1 btn-secondary"
                  disabled={this.state.answers.length === 1}
                  onClick={this.removeAnswer(idx)}
                >
                  -
                </button>
              </div>
            ))}

            <button
              type="button"
              className={this.getButtonClasses()}
              onClick={this.addAnswer}
              disabled={this.state.inputLength === 0}
              hidden={this.state.answersCount === 9}
            >
              Add Answer
            </button>
          </form>
          <button type="button" onClick={this.reset}>
            Reset
          </button>
        </Col>
        <Col lg={4} md={4} sm={6} xs={12}>
          <h1>I'm the pool</h1>
          <p>{this.state.question}</p>
          <form onSubmit={this.handleVote}>
            {this.state.answers.map((answer, idx) =>
              answer.oneAnswer ? (
                <label className="container">
                  <input
                    type="radio"
                    name="radio"
                    value={answer.oneAnswer}
                    className="m-2"
                    onChange={this.handleOptionChange}
                  />
                  {answer.oneAnswer}
                </label>
              ) : (
                ""
              )
            )}
            <input type="submit" value="Vote" />
          </form>
        </Col>
        <Col lg={4} md={4} sm={12} xs={12}>
          <h1>I'm the graph</h1>
          <div className="graph-wrapper">
            <div className="graph">
              <ColumnChart
                data={this.state.votes}
                colors={["#b00", "#666"]}
                label="Votes"
              />
            </div>
          </div>
        </Col>
      </React.Fragment>
    );
  }

  //Automatically change the color of add button when ansers count reaches 10
  getButtonClasses() {
    let classes = "btn btn-sm m-1 btn-";
    classes += this.state.answersCount === 9 ? "danger" : "success";
    return classes;
  }
}

export default PoolOptions;
