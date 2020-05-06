import Layout from "../components/Layout";
import Fetch from "isomorphic-unfetch";
import Jumbotron from "../components/Jumbotron";
import LatestPosts from "../components/Posts";
const Index = () => (
  <Layout>
    <div>
      <Jumbotron />
      <h1 class="display-4">Latest quizes</h1>
      <hr></hr>
      <LatestPosts />
    </div>
  </Layout>
);

Index.getInitialProps = async function () {
  //   const res = await Fetch("https://link.net");
  //   const data = await res.json();
  return 1;
};

export default Index;
