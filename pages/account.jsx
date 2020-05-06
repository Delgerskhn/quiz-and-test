import Layout from "../components/Layout";
import { useState } from "react";
function account(props) {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <Layout>
      <button onClick={handleClick}>+1</button>
      <p>{count}</p>
    </Layout>
  );
}

export default account;
