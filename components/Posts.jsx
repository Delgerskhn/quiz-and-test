import React, { useState, useEffect, useContext } from "react";

export default function Latestposts(props) {
  useEffect(() => {}, []);
  return (
    <div className="container">
      <ul className="list-unstyled">
        {(props.collection || []).map((quiz, i) => (
          <li key={i} className="media mb-3">
            <div className="media-body text-secondary">
              <h5 className="mt-0 mb-1">
                {i + 1}. {quiz.question}
              </h5>
              {props.test ? (
                <div>
                  <form>
                    {quiz.answers.map((answer, j) => (
                      <div class="radio ">
                        <label>
                          <input
                            type="radio"
                            name="optradio"
                            onClick={() => props.setanswer(quiz._id, j)}
                          />
                          {answer.value}
                        </label>
                      </div>
                    ))}
                  </form>
                  {quiz.validAnswer !== undefined ? (
                    <p className="text-success">
                      Correct answer is: {quiz.answers[quiz.validAnswer].value}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
