/* eslint-disable no-console */
/* eslint-disable quote-props */
/* eslint-disable camelcase */
const apiKey = 'AIzaSyBo-7mA8FPTnO-1JdTnab1JvtpOpsuBJ_I';
export default async (keyword) => {
  const auth = JSON.parse(sessionStorage.getItem('authYS'));
  const settings = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `${auth.token_type} ${auth.access_token}`,
    },
  };
  const params = {
    part: 'snippet',
    maxResults: 5,
    q: keyword,
    key: apiKey,
  };
  const queryString = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');
  const url = `https://www.googleapis.com/youtube/v3/search?${queryString}`;
  console.log(url);
  console.log(`${auth.token_type} ${auth.access_token}`);
  const response = await fetch(url, settings);
  const data = await response.json();
  return data;
};
