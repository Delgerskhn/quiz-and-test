import React, { useState, useEffect } from "react";

export default function Dropdown(props) {
  const [isopen, toggle] = useState(false);
  useEffect(() => {
    document.body.addEventListener("click", () => {
      toggle(false);
    });
  }, []);
  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(!isopen);
  };
  return (
    <div className="react-dropdown">
      <summary onClick={toggleMenu}>{props.invoker}</summary>
      {props.children}
      <style global jsx>{`
        .react-dropdown .dropdown-menu {
          display: ${isopen ? "block" : "none"};
        }
      `}</style>
    </div>
  );
}
