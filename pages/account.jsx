import { useState, useEffect, useContext } from "react";
import MyPosts from "../components/Posts";
import router from "next/router";
import UserContext from "../context/userContext";
import Fetch from "../components/fetch";
function account(props) {
  const [content, setcontent] = useState("");
  const [collection, setcollection] = useState([]);
  const { user } = useContext(UserContext);
  const setQuizes = async () => {
    setcontent("quizes");
    let result = JSON.parse(
      await Fetch(
        "http://localhost:4000/api/db/getquizes",
        "",
        "post",
        localStorage.getItem("billionaire-token")
      )
    );
    console.log(result);
    setcollection(result);
  };
  useEffect(() => {
    if (!user) router.push("/");
    const { action } = router.router.query;
    if (action == "quiz") {
      setQuizes();
    } else if (action == "test") {
      setcontent("tests");
    }
  }, [router.router, user]);
  return (
    <div className="container">
      <h1 className="display-4">My {content}</h1>
      <hr />
      {content == "quizes" ? (
        <MyPosts collection={collection} />
      ) : (
        <MyPosts collection={collection} />
      )}
    </div>
  );
}

export default account;
