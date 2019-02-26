import React, { Component } from "react";
import Col from "react-bootstrap/Col";

class Pool extends Component {
  render() {
    const {
      question,
      answers,
      inputLength,
      handleVote,
      handleOptionChange
    } = this.props;
    return (
      <React.Fragment>
        <Col lg={4} md={4} sm={6} xs={12}>
          <div>
            <form className="m-4 " onSubmit={handleVote}>
              <div className="center-column-height">
                <h2>Vote Here</h2>
                <p className="question m-2">{question}</p>
                {answers.map((answer, idx) =>
                  answer.oneAnswer ? (
                    <label key={idx} className="container">
                      <input
                        type="radio"
                        name="radio"
                        value={answer.oneAnswer}
                        className="m-2"
                        onChange={handleOptionChange}
                      />
                      {answer.oneAnswer}
                    </label>
                  ) : (
                    ""
                  )
                )}
              </div>
              <div className="set-bottom">
                <input
                  type="submit"
                  value="Vote"
                  className="btn btn-sm m-1 btn-primary"
                  disabled={answers.length === 1 && inputLength === 0}
                />
              </div>
            </form>
          </div>
        </Col>
      </React.Fragment>
    );
  }
}

export default Pool;
