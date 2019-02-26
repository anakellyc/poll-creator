import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import "./components.css";
import Pool from "./pool";
import Graph from "./graph";

class PoolCreator extends Component {
  constructor() {
    super();
    this.state = {
      question: "",
      answersCount: 0,
      answers: [{ oneAnswer: "", count: 0 }],
      inputLength: 0,
      selectedOption: "",
      votes: [],
      votesCount: 0
    };
  }

  //Update question according to input
  handleInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  //Update answers according to input
  handleAnswerNameChange = idx => evt => {
    const newAnswers = this.state.answers.map((answer, sidx) => {
      if (idx !== sidx) return answer;
      return {
        ...answer,
        oneAnswer: evt.target.value,
        count: answer.count === undefined ? 0 : answer.count
      };
    });

    this.setState({
      answersCount: evt.target.value.length === 0 ? idx : idx + 1,
      answers: newAnswers,
      inputLength: evt.target.value.length,
      votes: newAnswers.map(answer => [answer.oneAnswer, answer.count])
    });
  };

  //Add 1 to answers count when button is clicked, post answer and reset input value
  addAnswer = e => {
    e.preventDefault();

    this.setState({
      answers: this.state.answers.concat([{ oneAnswer: "" }]),
      inputLength: 0
    });
  };

  //Remove one answer row
  removeAnswer = idx => () => {
    const newCount =
      this.state.inputLength === 0
        ? this.state.answersCount
        : this.state.answersCount - 1;
    this.setState({
      answersCount: newCount,
      answers: this.state.answers.filter((s, sidx) => idx !== sidx),
      votes: this.state.votes.filter((s, sidx) => idx !== sidx),
      inputLength: 1
    });
  };

  //Get selected answer
  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  //Compute vote
  handleVote = evt => {
    evt.preventDefault();
    let votesArray = this.state.votes;

    this.setState({
      answers: this.state.answers.map(answer => {
        return answer.oneAnswer === this.state.selectedOption
          ? { oneAnswer: answer.oneAnswer, count: answer.count + 1 }
          : answer;
      }),
      votes: votesArray.map(answer => {
        return answer[0] === this.state.selectedOption
          ? [answer[0], answer[1] + 1]
          : [answer[0], answer[1]];
      })
    });
  };

  //Clear all inputed data
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
          <div>
            <div className="block-height">
              <h2 className="m-4">Create your pool</h2>
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
                  <div key={idx} className="input-group inline-items-centered">
                    <input
                      className="input-sm m-1"
                      type="text"
                      name="inputLength"
                      maxLength="80"
                      placeholder="Type an answer"
                      disabled={this.state.question.length === 0}
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
                  className="btn btn-sm m-1 btn-success"
                  onClick={this.addAnswer}
                  disabled={this.state.inputLength === 0}
                  hidden={this.state.answersCount === 10}
                >
                  Add Answer
                </button>
              </form>
            </div>
            <div className="inline-items-align">
              <p>{this.state.answersCount} / 10 possible answers</p>
              <button
                type="button"
                onClick={this.reset}
                className="btn btn-sm m-1 btn-danger"
              >
                Reset
              </button>
            </div>
          </div>
        </Col>

        <Pool
          question={this.state.question}
          answers={this.state.answers}
          inputLength={this.state.inputLength}
          handleVote={this.handleVote}
          handleOptionChange={this.handleOptionChange}
        />

        <Graph data={this.state.votes} />
      </React.Fragment>
    );
  }
}

export default PoolCreator;
