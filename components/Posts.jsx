import React, { useState, useEffect, useContext } from "react";

export default function Latestposts(props) {
  useEffect(() => {}, []);
  return (
    <div className="container">
      <ul className="list-unstyled">
        {(props.collection || []).map((quiz, i) => (
          <li key={i} className="media mb-3">
            <div className="media-body">
              <h5 className="mt-0 mb-1">
                {i + 1}. {quiz.question}
              </h5>
              {props.test ? (
                <form>
                  {quiz.answers.map((answer, j) => (
                    <div class="radio " onClick={() => props.setanswer(i, j)}>
                      <label>
                        <input type="radio" name="optradio" />
                        {answer.value}
                      </label>
                    </div>
                  ))}
                </form>
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
