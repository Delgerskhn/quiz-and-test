import { useState, useEffect, useContext } from "react";
import MyPosts from "../components/Posts";
import { useRouter } from "next/router";
import UserContext from "../context/userContext";
import Fetch from "../components/fetch";
import Loader from "../components/Loader";
function account(props) {
  const [content, setcontent] = useState("");
  const [collection, setcollection] = useState([]);
  const { user } = useContext(UserContext);
  const router = useRouter();

  const setQuizes = async () => {
    let result = JSON.parse(
      await Fetch(
        "http://localhost:4000/api/db/getquizes",
        "",
        "post",
        localStorage.getItem("billionaire-token")
      )
    );
    await setcollection(result);
    setcontent("quizes");
    console.log(result);
  };
  const setTests = async () => {
    let result = JSON.parse(
      await Fetch(
        "http://localhost:4000/api/db/gettests",
        "",
        "post",
        localStorage.getItem("billionaire-token")
      )
    );
    await setcollection(result);
    setcontent("tests");
    console.log(result);
  };
  useEffect(() => {
    if (!user) router.push("/");
    const { action } = router.query;
    setcontent("");
    if (action == "quiz") {
      setQuizes();
    } else if (action == "test") {
      setTests();
    }
  }, [router.query.action, user]);
  return (
    <div className="container">
      <h1 className="display-4">My {content}</h1>
      <hr />
      {content == "quizes" ? (
        <MyPosts collection={collection} />
      ) : content === "tests" ? (
        <div>
          {collection.map((test, i) => (
            <div key={i}>
              <h4 className="d-flex justify-content-between">
                Test {i + 1}. {test.date.slice(0, 10)}
                <p className="text-success">Score: {test.score}</p>
              </h4>
              <MyPosts collection={test.quizzes} />
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default account;
