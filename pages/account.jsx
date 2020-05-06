import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Latestposts from "../components/Posts";
function account(props) {
  useEffect(() => {
    console.log(props.url.query.action);
  }, []);
  return (
    <Layout>
      <div className="container">
        <h1 class="display-4">My posts</h1>
        <hr />
        <Latestposts />
      </div>
    </Layout>
  );
}

export default account;
