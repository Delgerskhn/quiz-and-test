import React, { useState, useEffect, useContext } from "react";
import Quizes from "../components/Posts";
import router from "next/router";
import UserContext from "../context/userContext";
import Fetch from "../components/fetch";
import CreateInput from "../components/CreateInput";

export default function account() {
  const { user } = useContext(UserContext);
  const [collection, setCollection] = useState([]);
  const [showInput, setInput] = useState(false);
  const fetchQuiz = async () => {
    let collection = await Fetch(
      `${process.env.API_URL}/api/db/latestquizes`,
      "",
      "post",
      window.localStorage.getItem("billionaire-token")
    );
    collection = Array.from(JSON.parse(collection));
    setCollection(collection);
  };
  useEffect(() => {
    if (!user) router.push("/");
    else {
      fetchQuiz();
    }
  }, [user]);
  return (
    <div className="container">
      {showInput ? (
        <CreateInput
          setInput={setInput}
          showInput={showInput}
          fetchQuiz={fetchQuiz}
        />
      ) : (
        ""
      )}
      <div className="d-flex justify-content-between mt-3">
        <h1 className="display-4">Quizes</h1>
        <button
          onClick={() => setInput(!showInput)}
          className="btn btn-outline-success my-2 my-sm-0"
        >
          <h3 className="">Create a quiz</h3>
        </button>
      </div>
      <hr></hr>
      <Quizes collection={collection} />
    </div>
  );
}
