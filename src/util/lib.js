import _ from "lodash";

export const getMafiaCount = (numberOfPlayers) =>
  Math.floor(numberOfPlayers / 3);
export const getDoctorCount = (numberOfPlayers) => {
  if (!numberOfPlayers) {
    return 0;
  }
  return numberOfPlayers < 16 ? 1 : numberOfPlayers === 20 ? 3 : 2;
};
export const getPoliceCount = (numberOfPlayers) => {
  if (!numberOfPlayers) {
    return 0;
  }
  return numberOfPlayers < 12 ? 1 : numberOfPlayers === 20 ? 3 : 2;
};

export const getTheme = (theme) =>
  theme === "basic"
    ? "basic_theme"
    : theme === "got"
    ? "got_theme"
    : "minecraft_theme";

export const getCookieValue = (cookieString) => {
  const cookies = document.cookie.split("; ");
  const cookiesObj = {};
  cookies.forEach((cookie) => {
    const [key, val] = cookie.split("=");
    cookiesObj[key] = val;
  });
  const cookieValue = cookiesObj[cookieString];
  return !cookieValue ? "" : cookieValue;
};

export const getDefaultPage = (playerName, gameId) =>
  _.isEmpty(playerName) && _.isEmpty(gameId) ? "initial" : "dashboard";
