import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import MyPosts from "../components/Posts";
function account(props) {
  const [context, setContext] = useState("");
  useEffect(() => {
    const { action } = props.url.query;
    if (action == "quiz") setContext(<MyPosts />);
    else if (action == "test") setContext(<MyPosts />);
  }, [props.url.query.action]);
  return (
    <Layout>
      <div className="container">
        <h1 class="display-4">My posts</h1>
        <hr />
        {context}
      </div>
    </Layout>
  );
}

export default account;
