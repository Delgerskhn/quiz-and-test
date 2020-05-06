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
              <p>Modal body text goes here.</p>
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
