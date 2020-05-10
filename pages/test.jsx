import { useState, useEffect, useContext } from "react";
import router from "next/router";
import UserContext from "../context/userContext";

export default function test() {
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);
  return (
    <div class="container">
      <div class="row">
        <div class="col-sm">One of three columns</div>
        <div class="col-sm">One of three columns</div>
        <div class="col-sm">One of three columns</div>
      </div>
    </div>
  );
}
