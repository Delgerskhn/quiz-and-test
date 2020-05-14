import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/userContext";

export default function Login() {
  const [modal, setmodal] = useState("none");
  const [register, setRegister] = useState(false);
  const { user, signIn, signOut, signUp, verify } = useContext(UserContext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [repassword, setrepassword] = useState("");
  const [message, setmessage] = useState("");
  useEffect(() => {
    setmessage("");
  }, [register]);
  const showmodal = () => {
    setmodal(modal == "none" ? "block" : "none");
  };
  const handleInput = (e, key) => {
    eval(`set${key}('${e.target.value}')`);
  };
  return (
    <li className="nav-item">
      <summary>
        {user ? (
          <a className="nav-link" onClick={signOut}>
            Sign out
          </a>
        ) : (
          <a className="nav-link" onClick={showmodal}>
            Sign in
          </a>
        )}
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
              <h5 className="modal-title">Sign in</h5>
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
                  <label>Email address</label>
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
                    <label>User name</label>
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
                  <label>Password</label>
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
                    <label>Re type password</label>
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
                <div className="form-group">
                  <label className="text-danger">{message}</label>
                </div>
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
                onClick={async () => {
                  if (register) {
                    if (password == repassword) {
                      let result = await signUp({
                        email: email,
                        password: password,
                        name: username,
                      });
                      if (result?.message) setmessage(result.message);
                    } else setmessage("Passwords are not matching");
                  } else setRegister(true);
                }}
                className="btn btn-primary"
              >
                {register ? "Click to register" : "Register"}
              </button>
              <button
                onClick={async () => {
                  if (!register) {
                    let result = await signIn({
                      email: email,
                      password: password,
                    });
                    if (result) setmessage(result);
                    else showmodal();
                  } else setRegister(false);
                }}
                type="submit"
                className="btn btn-success"
              >
                {register ? "Sign in" : "Click to sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
