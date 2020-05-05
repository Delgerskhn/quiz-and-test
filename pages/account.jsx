import Layout from "../components/Layout";

function account(props) {
  this.state = {
    count: 0,
  };
  this.handleClick = this.handleClick.bind(this);
}

account.prototype.render = function () {
  const { count } = this.state;
  return (
    <Layout>
      <button onClick={this.handleClick}>+1</button>
      <p>{count}</p>
    </Layout>
  );
};

account.prototype.handleClick = function () {
  const { count } = this.state;
  this.setState({ count: count + 1 });
};

Object.setPrototypeOf(account.prototype, React.Component.prototype);

export default account;
