import React, { useState } from "react";

export default function Login() {
  const [modal, setmodal] = useState("none");
  const [register, setRegister] = useState(false);
  const showmodal = () => {
    setmodal(modal == "none" ? "block" : "none");
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
                  />
                </div>
                {register ? (
                  <div className="form-group">
                    <label for="exampleInputPassword1">Re type password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
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
                  if (register) signup();
                  else setRegister(true);
                }}
                className="btn btn-primary"
              >
                {register ? "Click to register" : "Register"}
              </button>
              <button
                onClick={() => setRegister(false)}
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

const signup = () => {};
