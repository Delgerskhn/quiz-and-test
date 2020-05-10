import Link from "next/link";
import Login from "../components/Login";
import Dropdown from "./Dropdown";
import UserContext from "../context/userContext";
import { useContext } from "react";
export default () => {
  const { user } = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link href="/">
              <a className="nav-link">
                Home <span className="sr-only">(current)</span>
              </a>
            </Link>
          </li>
          {user ? (
            <div class="d-flex">
              <li className="nav-item">
                <Dropdown
                  invoker={
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Account
                    </a>
                  }
                >
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link href="/account?action=quiz">
                      <a className="dropdown-item">My quizes</a>
                    </Link>
                    <Link href="/account?action=test">
                      <a className="dropdown-item">My tests</a>
                    </Link>
                  </div>
                </Dropdown>
              </li>
              <li className="nav-item ">
                <Link href="/quiz">
                  <a className="nav-link">
                    Quiz <span className="sr-only">(current)</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item ">
                <Link href="/test">
                  <a className="nav-link">
                    Test <span className="sr-only">(current)</span>
                  </a>
                </Link>
              </li>
            </div>
          ) : (
            ""
          )}
          <Login />
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};
