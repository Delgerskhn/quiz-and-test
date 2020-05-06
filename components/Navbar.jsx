import Link from "next/link";
import Login from "../components/Login";
import Dropdown from "./Dropdown";

export default () => (
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <Link href="/">
            <a class="nav-link">
              Home <span class="sr-only">(current)</span>
            </a>
          </Link>
        </li>
        <li class="nav-item">
          <Dropdown
            invoker={
              <a
                class="nav-link dropdown-toggle"
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
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link href="/account?action=quiz">
                <a class="dropdown-item">My quizes</a>
              </Link>
              <Link href="/account?action=test">
                <a class="dropdown-item">My tests</a>
              </Link>
            </div>
          </Dropdown>
        </li>
        <li class="nav-item ">
          <Link href="/quiz">
            <a class="nav-link">
              Quiz <span class="sr-only">(current)</span>
            </a>
          </Link>
        </li>
        <li class="nav-item ">
          <Link href="/test">
            <a class="nav-link">
              Test <span class="sr-only">(current)</span>
            </a>
          </Link>
        </li>
        <Login />
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  </nav>
);
