import React from "react";
import Layout from "../components/Layout";
import Quizes from "../components/Posts";
export default function account() {
  return (
    <Layout>
      <div className="container">
        <div className="d-flex justify-content-between mt-3">
          <h1 class="display-4">Quizes</h1>
          <button className="btn btn-success ">
            <h3 className="">Create a quiz</h3>
          </button>
        </div>
        <hr></hr>
        <Quizes />
      </div>
    </Layout>
  );
}
