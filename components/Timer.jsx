import React, { useState, useEffect } from "react";

export default function Timer(props) {
  const [time, settime] = useState(null);
  useEffect(() => {
    if (props.time !== null) settime(props.time);
  }, [props.time]);
  useEffect(() => {
    if (time > 0)
      setTimeout(function () {
        settime(time - 1);
      }, 1000);
  }, [time]);
  return (
    <button className="btn btn-primary btn-lg" role="button">
      {`${time} seconds left`}
    </button>
  );
}
