import UserContext from "../context/userContext";
import App from "next/app";
import Layout from "../components/Layout";
import Fetch from "../components/fetch";
class MyApp extends App {
  state = {
    user: null,
  };
  signIn = async (body) => {
    let result = JSON.parse(
      await Fetch(`${process.env.API_URL}/api/user/login`, body)
    );
    if (!result.message) {
      window.localStorage.setItem("billionaire-token", result.token);
      this.setState({ user: result.user });
    } else return result.message;
    console.log(result);
  };
  signUp = async (body) => {
    let result = JSON.parse(
      await Fetch(`${process.env.API_URL}/api/user/register`, body)
    );
    console.log(result);
    if (result.message) return result;
  };
  verify = async () => {
    let token = window.localStorage.getItem("billionaire-token");
    let result =
      token &&
      JSON.parse(
        await Fetch(`${process.env.API_URL}/api/user/auth`, "", "post", token)
      );
    console.log(result);
    if (result) {
      this.setState({ user: result.user });
    } else {
      window.localStorage.removeItem("billionaire-token");
    }
  };
  signOut = () => {
    this.setState({ user: null });
    window.localStorage.removeItem("billionaire-token");
  };
  componentWillMount() {
    this.verify();
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          signIn: this.signIn,
          signOut: this.signOut,
          signUp: this.signUp,
          verify: this.verify,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    );
  }
}
export default MyApp;
