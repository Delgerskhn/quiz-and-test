import { useContext, useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import LatestPosts from "../components/Posts";
import UserContext from "../context/userContext";
import Fetch from "../components/fetch";

const Index = () => {
  const { user, signIn, signOut } = useContext(UserContext);
  const [collection, setCollection] = useState([]);
  useEffect(() => {
    (async () => {
      let collection = await Fetch(
        `${process.env.API_URL}/api/db/latestquizes`
      );
      collection = Array.from(JSON.parse(collection));
      setCollection(collection);
    })();
  }, []);
  return (
    <div>
      <Jumbotron />
      <div className="container">
        <h1 className="display-4">Latest quizes</h1>
        <hr></hr>
      </div>
      <LatestPosts collection={collection} />
    </div>
  );
};

Index.getInitialProps = async function () {
  //   const res = await Fetch("https://link.net");
  //   const data = await res.json();
  return 1;
};

export default Index;
