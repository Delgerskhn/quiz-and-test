import { useState, useEffect, useContext } from "react";
import router from "next/router";
import UserContext from "../context/userContext";
import Fetch from "../components/fetch";
import Latestposts from "../components/Posts";
import TestContext from "../context/testContext";

export default function test() {
  const { user } = useContext(UserContext);
  const [quizes, setquizes] = useState(null);
  const [form, setform] = useState(null);
  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);
  const fetchData = async () => {
    let result = JSON.parse(
      await Fetch(
        "http://localhost:4000/api/db/test",
        "",
        "post",
        localStorage.getItem("billionaire-token")
      )
    );
    if (!result.message) {
      setquizes(result);
      setform(result.map((a) => ({ _id: a._id, validAnswer: -1 })));
    }
    console.log(result);
  };
  const setanswer = (i, j) => {
    let tempform = form;
    tempform[i].validAnswer = j;
    setform(tempform);
  };
  const submittest = async () => {
    let result = await Fetch(
      "http://localhost:4000/api/db/submittest",
      form,
      "post",
      localStorage.getItem("billionaire-token")
    );
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

            <button
              onClick={fetchData}
              className="btn btn-primary btn-lg"
              role="button"
            >
              {quizes ? "60s" : "Begin the test"}
            </button>
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
              <button
                onClick={submittest}
                className="btn btn-success btn-lg"
                role="button"
              >
                Submit the test
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </TestContext.Provider>
  );
}
