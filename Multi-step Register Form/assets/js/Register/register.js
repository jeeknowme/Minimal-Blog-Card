import { saveToLocalStorage } from "../util.js";
import { isNotEmpty } from "./validate.js";
import { isValidEmail } from "./validate.js";
import { validate } from "./validate.js";
import { handleClick, showErrors } from "./stepper.js";
import { showSummary } from "./stepper.js";

let register = JSON.parse(localStorage.getItem("register")) || {
  name: {
    value: "",
    error: true,
  },
  email: {
    value: "",
    error: true,
  },
  topics: {
    value: [],
    error: true,
  },
};

let rules = {
  name: [isNotEmpty],
  email: [isValidEmail],
  topics: [isNotEmpty],
};

const validateStep = (fields) => {
  fields.forEach((name) => {
    updateRegisterError(name);
  });

  if (validationPassed(fields)) handleClick();
  else {
    displayError(fields);
  }
};

const displayError = (fields) => {
  const elementFields = Object.entries(register)
    .filter((obj) => fields.includes(obj[0]))
    .map((e) => {
      return {
        name: e[0],
        error: e[1].error,
      };
    });
  showErrors(elementFields);
};

const validationPassed = (fields) => {
  return Object.entries(register)
    .filter((obj) => fields.includes(obj[0]))
    .map((e) => {
      return e[1].error;
    })
    .every((error) => error === false);
};

const updateRegisterError = (name) => {
  const { value } = register[name];
  register[name] = {
    ...register[name],
    error: !validate(rules[name], value),
  };
};

const registerButtonEvent = (element, eventName, fields) => {
  element.addEventListener(eventName, () => validateStep(fields));
};

const registerInputEvent = (element, eventName, name) => {
  element.addEventListener(eventName, (eventObject) => {
    updateRegister(name, eventObject);
    saveToLocal();
  });
};

const registerEvent = (...args) => {
  args.forEach((elements) => {
    const { name, element, eventName, validationField } = elements;

    // If Checkbox

    if (element.length) {
      element.forEach((el) => {
        registerInputEvent(el, eventName, name);
      });
    } else {
      // if button
      if (element.localName == "button") {
        registerButtonEvent(element, eventName, validationField);
      }
      // if input
      else registerInputEvent(element, eventName, name);
    }
  });
};

const saveToLocal = () => {
  saveToLocalStorage("register", register);
};

const updateRegister = (name, eventObject) => {
  const { checked: isCheckboxChecked, value, type } = eventObject.target;

  if (type === "checkbox") {
    if (isCheckboxChecked)
      register[name].value = register[name].value.concat(value);
    else register[name].value = register[name].value.filter((v) => v !== value);
  } else register[name] = { ...register[name], value: value };
};

const initializeRegister = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const topics = document.querySelectorAll('.topics input[type="checkbox"]');
    const firstStep = document.getElementById("first__step");
    const secondStep = document.getElementById("second__step");
    const lastStep = document.getElementById("summary__confirm");

    registerEvent(
      {
        name: "name",
        element: nameInput,
        eventName: "input",
      },
      {
        name: "email",
        element: emailInput,
        eventName: "input",
      },
      {
        name: "topics",
        element: topics,
        eventName: "change",
      },
      {
        element: secondStep,
        eventName: "click",
        validationField: ["topics"],
      },
      {
        element: firstStep,
        eventName: "click",
        validationField: ["name", "email"],
      }
    );

    secondStep.addEventListener("click", () => showSummary(register));
    lastStep.addEventListener("click", () => alert("We did it hooray"));
  });
};

export default initializeRegister;
