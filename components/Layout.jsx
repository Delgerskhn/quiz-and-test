import Navbar from "./Navbar";
import Head from "next/head";

const Layout = (props) => (
  <div>
    <Head>
      <title>Quiz & Test</title>
      <link rel="stylesheet" href="/bootstrap.css" />
    </Head>
    <Navbar />
    <div className="">{props.children}</div>
  </div>
);

export default Layout;
