import React, { useState } from "react";

export default function Login() {
  const [modal, setmodal] = useState("none");
  const showmodal = () => {
    setmodal(modal == "none" ? "block" : "none");
  };
  return (
    <li class="nav-item">
      <summary>
        <a class="nav-link" onClick={showmodal}>
          Login
        </a>
      </summary>
      <div class="modal" style={{ display: modal }} tabindex="1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={showmodal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div class="form-group form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    Check me out
                  </label>
                </div>
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={showmodal}
              >
                Close
              </button>
              <button type="button" onClick={showmodal} class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
