const getCookie = (name) => {
  let value = document.cookie;
  let parts = value.split(`=`);
  parts.shift();
  let result = parts[0];
  return result;
  // if (parts.length === 2) {
  //   return parts.pop().split(";").shift();
  // }
};
const setCookie = (name, value, exp = 5) => {
  const date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * exp);
  document.cookie = `${name}=${value}; expires = ${date.toUTCString()}`;

  //   return (document.cookie = "MY_COOKIE = " + text);
};
const deleteCookie = (name) => {
  let date = new Date("2020-01-01").toUTCString();
  document.cookie = name + "=; expires=" + date;
};

export { getCookie, setCookie, deleteCookie };
