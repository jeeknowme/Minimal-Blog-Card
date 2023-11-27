export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const isEmpty = (param) => {
  if (param == undefined || param == null) return true;
  if (typeof param === "string" && param.trim() == "") return true;
  if (Array.isArray(param) && param.length == 0) return true;
  return false;
};
