import { useState, useEffect } from "react";
import Fetch from "../components/fetch";
export default function CreateInput(props) {
  const [answer1, setanswer1] = useState("");
  const [answer2, setanswer2] = useState("");
  const [answer3, setanswer3] = useState("");
  const [question, setquestion] = useState("");
  const [validAnswer, setvalidAnswer] = useState(-1);
  const [btnMsg, setbtnMsg] = useState("Create quiz");
  const handleInput = (e, name) => {
    eval(`set${name}('${e.target.value}')`);
  };
  useEffect(() => {
    if (btnMsg != "Create quiz") {
      setTimeout(() => {
        props.setInput(!props.showInput);
      }, 1000);
      props.fetchQuiz();
    }
  }, [btnMsg]);
  const sendRequest = async () => {
    let body = {
      answers: [1, 2, 3].map((a) => ({ value: eval("answer" + a) })),
      validAnswer: validAnswer,
      question: question,
    };
    let result = JSON.parse(
      await Fetch(
        `${process.env.API_URL}/api/db/createquiz`,
        body,
        "post",
        localStorage.getItem("billionaire-token")
      )
    );
    if (result.message) setbtnMsg("Unsuccessful");
    else if (result.success) setbtnMsg("Successfully saved");
  };
  return (
    <div>
      <div
        className="modal"
        tabindex="-1"
        role="dialog"
        style={{ display: props.showInput ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => props.setInput(!props.showInput)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Fill up your question and related answers.</p>
              <textarea
                placeHolder="Question..."
                className="form-control mb-2"
                id="exampleFormControlTextarea1"
                rows="3"
                value={question}
                onChange={(e) => handleInput(e, "question")}
              ></textarea>
              <form action="">
                {[1, 2, 3].map((a) => (
                  <div class="radio " key={a}>
                    <label class="d-flex">
                      <div
                        className="input-group-text"
                        onClick={() => setvalidAnswer(a - 1)}
                      >
                        <input type="radio" name="optradio" />
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeHolder={"Answer " + a}
                        value={eval("answer" + a)}
                        onChange={(e) => handleInput(e, "answer" + a)}
                      />
                    </label>
                  </div>
                ))}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={sendRequest}
                type="button"
                className="btn btn-primary"
              >
                {btnMsg}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
