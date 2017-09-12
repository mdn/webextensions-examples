/**
Fetch the user's info, passing in the access token in the Authorization
HTTP request header.
*/

/* exported getUserInfo */

function getUserInfo(accessToken) {
  const requestURL = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json";
  const requestHeaders = new Headers();
  requestHeaders.append('Authorization', 'Bearer ' + accessToken);
  const driveRequest = new Request(requestURL, {
    method: "GET",
    headers: requestHeaders
  });

  return fetch(driveRequest).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw response.status;
    }
  });

}
