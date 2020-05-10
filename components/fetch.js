import Fetch from "isomorphic-unfetch";

export default async function (url, body, method, token) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if (token) myHeaders.append("auth-token", token);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };
  if (body) {
    var raw = JSON.stringify(body);
    requestOptions.body = raw;
  }

  return await Fetch(url, requestOptions)
    .then((response) => {
      if (response.status == 400 || response.status == 200)
        return response.text();
      else return false;
    })
    .then((result) => result)
    .catch((error) => console.log("error", error));
}
