import { useState, useEffect, useContext } from "react";
import router from "next/router";
import UserContext from "../context/userContext";
import Fetch from "../components/fetch";
import Latestposts from "../components/Posts";
import TestContext from "../context/testContext";
import Loader from "../components/Loader";
import Timer from "../components/Timer";

export default function test() {
  const { user } = useContext(UserContext);
  const [quizes, setquizes] = useState(null);
  const [form, setform] = useState(null);
  const [time, settime] = useState(null);
  const [result, setresult] = useState(null);
  const [message, setmessage] = useState(null);
  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);
  const fetchData = async () => {
    let result = await Fetch(
      "http://localhost:4000/api/db/test",
      "",
      "post",
      window.localStorage.getItem("billionaire-token")
    );
    console.log(result);
    result = JSON.parse(result);
    if (!result.message) {
      setquizes(result.quizes);
      let form = {};
      result.quizes.forEach((a) => {
        form[a._id] = -1;
      });
      setform(form);
      settime(result.time);
    }
    console.log(result);
  };
  const setanswer = (id, j) => {
    let tempform = form;
    tempform[id] = j;
    setform(tempform);
  };
  const submittest = async () => {
    let result = await Fetch(
      "http://localhost:4000/api/db/submittest",
      form,
      "post",
      window.localStorage.getItem("billionaire-token")
    );
    result = JSON.parse(result);
    let quizWithAnswer = quizes.map((a) => {
      return {
        ...a,
        validAnswer: result.answers[a._id],
      };
    });
    setquizes(quizWithAnswer);
    setresult(result.result);
    if (result.message) setmessage(result.message);
    console.log(result);
  };
  return (
    <TestContext.Provider value={{}}>
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Fluid jumbotron</h1>
            <p className="lead">
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>
            <hr className="my-4" />
            {quizes ? (
              result == null ? (
                <Timer submittest={submittest} time={time} />
              ) : (
                ""
              )
            ) : (
              <button
                onClick={fetchData}
                className="btn btn-primary btn-lg"
                role="button"
              >
                Begin the test
              </button>
            )}
          </div>
        </div>
        <div className="container">
          {quizes ? (
            <div>
              <Latestposts
                setanswer={setanswer}
                test={true}
                collection={quizes}
              />
              {message ? <h3 className="text-danger">{message}</h3> : ""}
              <button
                onClick={() => {
                  if (!result) submittest();
                }}
                className="btn btn-success btn-lg"
                role="button"
              >
                {result ? "Your test result: " + result : "Submit the test"}
              </button>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </TestContext.Provider>
  );
}
