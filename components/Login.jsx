import React, { useState, useContext } from "react";
import UserContext from "../context/userContext";

export default function Login() {
  const [modal, setmodal] = useState("none");
  const [register, setRegister] = useState(false);
  const { user, signIn, signOut, signUp } = useContext(UserContext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [repassword, setrepassword] = useState("");
  const showmodal = () => {
    setmodal(modal == "none" ? "block" : "none");
  };
  const handleInput = (e, key) => {
    eval(`set${key}('${e.target.value}')`);
  };
  return (
    <li className="nav-item">
      <summary>
        <a className="nav-link" onClick={showmodal}>
          Login
        </a>
      </summary>
      <div
        className="modal"
        style={{ display: modal }}
        tabIndex="1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={showmodal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => handleInput(e, "email")}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                {register ? (
                  <div className="form-group">
                    <label for="exampleInputPassword1">User name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      value={username}
                      onChange={(e) => handleInput(e, "username")}
                    />
                  </div>
                ) : (
                  ""
                )}

                <div className="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => handleInput(e, "password")}
                  />
                </div>
                {register ? (
                  <div className="form-group">
                    <label for="exampleInputPassword1">Re type password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      value={repassword}
                      onChange={(e) => handleInput(e, "repassword")}
                    />
                  </div>
                ) : (
                  ""
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={showmodal}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  if (register)
                    signUp({
                      email: email,
                      password: password,
                      name: username,
                    });
                  else setRegister(true);
                }}
                className="btn btn-primary"
              >
                {register ? "Click to register" : "Register"}
              </button>
              <button
                onClick={() => {
                  if (!register) signIn({ email: email, password: password });
                  else setRegister(false);
                }}
                type="submit"
                className="btn btn-success"
              >
                {register ? "Login" : "Click to login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
