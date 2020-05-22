import moment from "moment";

export const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
  // return Object.keys(obj).length === 0;
};

export const capitalize = (string) => {
  return typeof string === "string"
    ? string[0].toUpperCase() + string.slice(1)
    : string;
};

export const uncapitalize = (string) => {
  return typeof string === "string"
    ? string[0].toLowerCase() + string.slice(1)
    : string;
};

export const getDateString = (date) => {
  return date ? moment(date).locale(moment.locale()).format("L") : date;
};

export const nullifyEmptyStrings = (obj) =>
  Object.entries(obj).reduce((acc, [key, val]) => {
    if (val === "") {
      acc[key] = null;
    } else {
      acc[key] = val;
    }
    return acc;
  }, {});
