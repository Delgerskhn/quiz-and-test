import React from "react";
import Layout from "../components/Layout";
import account from "./account";

export default function test() {
  account.call(this);
}

test.prototype.handleClick = function () {
  console.log("sdfhadsf");
};
Object.setPrototypeOf(test.prototype, React.Component.prototype);
