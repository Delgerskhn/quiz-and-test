import React, { useState } from "react";

export default function Latestposts() {
  const [list, setlist] = useState(
    new Array(5).fill({
      title: "Sample title",
      body: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
scelerisque ante sollicitudin. Cras purus odio, vestibulum in
vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
nisi vulputate fringilla. Donec lacinia congue felis in faucibus.`,
    })
  );
  return (
    <div class="container">
      <h1 class="display-4">Last quizes</h1>
      <hr></hr>
      <ul class="list-unstyled">
        {list.map((a) => (
          <li class="media">
            <img
              src="/dsample.png"
              class="mr-3"
              alt="..."
              width="100"
              height="100"
            />
            <div class="media-body">
              <h5 class="mt-0 mb-1">{a.title}</h5>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
              scelerisque ante sollicitudin. Cras purus odio, vestibulum in
              vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
              nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
