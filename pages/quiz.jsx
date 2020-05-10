import React, { useState, useEffect, useContext } from "react";
import Quizes from "../components/Posts";
import router from "next/router";
import UserContext from "../context/userContext";

export default function account() {
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);
  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-3">
        <h1 className="display-4">Quizes</h1>
        <button className="btn btn-outline-success my-2 my-sm-0">
          <h3 className="">Create a quiz</h3>
        </button>
      </div>
      <hr></hr>
      <Quizes />
    </div>
  );
}
