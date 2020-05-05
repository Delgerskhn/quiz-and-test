import Link from "next/link";
import Login from "../components/Login";

export default () => (
  <ul class="nav bg-dark justify-content-end">
    <li class="nav-item">
      <Link href="/">
        <a class="nav-link active">Home</a>
      </Link>
    </li>
    <li class="nav-item">
      <Link href="/account">
        <a class="nav-link">Account</a>
      </Link>
    </li>
    <li class="nav-item">
      <Link href="/quiz">
        <a class="nav-link">Quiz</a>
      </Link>
    </li>
    <li class="nav-item">
      <Link href="/test">
        <a class="nav-link">Test</a>
      </Link>
    </li>
    <Login />
  </ul>
);
