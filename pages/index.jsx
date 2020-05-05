import Layout from "../components/Layout";
import Fetch from "isomorphic-unfetch";
const Index = () => (
  <Layout>
    <div>
      <h1>Hello world</h1>
    </div>
  </Layout>
);

Index.getInitialProps = async function () {
  //   const res = await Fetch("https://link.net");
  //   const data = await res.json();
  return 1;
};

export default Index;
