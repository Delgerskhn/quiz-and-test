import UserContext from "../context/userContext";
import App from "next/app";
import Layout from "../components/Layout";
class MyApp extends App {
  state = {
    user: null,
  };
  signIn = () => {};
  signOut = () => {};
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <UserContext.Provider
          value={{
            user: this.state.user,
            signIn: this.signIn,
            signOut: this.signOut,
          }}
        >
          <Component {...pageProps} />
        </UserContext.Provider>
      </Layout>
    );
  }
}
export default MyApp;
