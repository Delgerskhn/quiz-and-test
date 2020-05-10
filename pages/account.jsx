import { useState, useEffect, useContext } from "react";
import MyPosts from "../components/Posts";
import router from "next/router";
import UserContext from "../context/userContext";
function account(props) {
  const [content, setcontent] = useState("");
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log(router);
    if (!user) router.push("/");
    const { action } = router.router.query;
    if (action == "quiz") setcontent(<MyPosts />);
    else if (action == "test") setcontent(<MyPosts />);
  }, [router.router, user]);
  return (
    <div className="container">
      <h1 className="display-4">My posts</h1>
      <hr />
      {content}
    </div>
  );
}

export default account;
