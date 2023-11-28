import { isEmpty } from "../util.js";

export const isNotEmpty = (params) => {
  return !isEmpty(params);
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validate = (rules, value) => {
  return rules.every((rule) => {
    return rule(value);
  });
};
