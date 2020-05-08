import { useContext, useEffect } from "react";
import Fetch from "isomorphic-unfetch";
import Jumbotron from "../components/Jumbotron";
import LatestPosts from "../components/Posts";
import UserContext from "../context/userContext";
const Index = () => {
  const { user, signIn, signOut } = useContext(UserContext);
  return (
    <div>
      <Jumbotron />
      <div className="container">
        <h1 className="display-4">Latest quizes</h1>
        <hr></hr>
      </div>
      <LatestPosts />
    </div>
  );
};

Index.getInitialProps = async function () {
  //   const res = await Fetch("https://link.net");
  //   const data = await res.json();
  return 1;
};

export default Index;
