import UserContext from "../context/userContext";
import App from "next/app";
import Layout from "../components/Layout";
import Fetch from "../components/fetch";
class MyApp extends App {
  state = {
    user: null,
  };
  signIn = async (body) => {
    let result = await Fetch("http://localhost:4000/api/user/login", body);
    localStorage.setItem("billionaire-token", result);
    console.log(result);
  };
  signUp = async (body) => {
    let result = await Fetch("http://localhost:4000/api/user/register", body);
    console.log(result);
  };
  signOut = () => {};
  render() {
    const { Component, pageProps } = this.props;
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          signIn: this.signIn,
          signOut: this.signOut,
          signUp: this.signUp,
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
