import nookies from "nookies";

const ACCESS_TOKEN = "@next-course-key";

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

export const saveToken = (accessToken, context = null) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  sessionStorage.setItem(ACCESS_TOKEN, accessToken);

  // Save on cookie
  nookies.set(context, ACCESS_TOKEN, accessToken, {
    maxAge: ONE_YEAR,
    path: "/",
  });
};

export const getToken = (context = null) => {
  // Get from cookies
  const token = nookies.get(context);
  return token[ACCESS_TOKEN] || "";

  // Get from localStorage
  // return localStorage.getItem(ACCESS_TOKEN);
};

export const cleanToken = (context = null) => {
  localStorage.removeItem(ACCESS_TOKEN);
  sessionStorage.removeItem(ACCESS_TOKEN);

  // Delete cookies
  nookies.destroy(context, ACCESS_TOKEN);
};
