import { useState, useEffect } from "react";
import MyPosts from "../components/Posts";
import router from "next/router";

function account(props) {
  const [content, setcontent] = useState("");
  useEffect(() => {
    console.log(router);
    const { action } = router.router.query;
    if (action == "quiz") setcontent(<MyPosts />);
    else if (action == "test") setcontent(<MyPosts />);
  }, [router.router.query]);
  return (
    <div className="container">
      <h1 className="display-4">My posts</h1>
      <hr />
      {content}
    </div>
  );
}

export default account;
