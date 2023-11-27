let currentIndex = 1;

const showNext = () => {
  // Hide all cards
  const cards = document.querySelectorAll(".main > div");
  cards.forEach((div) => {
    div.classList.remove("active");
  });

  //   Show the active card
  const activeCard = document.querySelector(
    `.main > div:nth-child(${currentIndex})`
  );
  if (activeCard) activeCard.classList.add("active");

  //   Remove active class
  const stepperDot = document.querySelectorAll(
    ".step__indicator--circles > span"
  );
  stepperDot.forEach((dot) => {
    dot.classList.remove("active");
  });

  //   Add active class to clicked Dot

  const activeDot = document.querySelector(
    `.step__indicator--circles > span:nth-child(${currentIndex})`
  );
  if (activeDot) activeDot.classList.add("active");

  //   Update the current step number

  const stepNumber = document.getElementById("step__number");
  if (stepNumber) stepNumber.innerText = currentIndex;
};

// ******************************************************* EVENT **********************************************//

// Add event listeners to handle button and Dot click for next/previous step

const updateIndex = () => {
  currentIndex += 1;
};

export const handleClick = () => {
  // console.log(index);
  updateIndex();
  showNext();
};

export const showErrors = (fields) => {
  fields.forEach(({ name, error }) => {
    const elements = document.querySelectorAll(
      `[data-error="${name}"] ${name == "topics" ? "~ label" : ""}`
    );

    elements.forEach((el) => {
      if (error) el.classList.add("error__input");
      else el.classList.remove("error__input");
    });
  });
};

export const showSummary = (data) => {
  const summary = new Map(
    Object.entries(data).map((v) => {
      return [v[0], v[1].value];
    })
  );

  const summaryName = document.getElementById("summary__name");
  const summaryEmail = document.getElementById("summary__email");

  const summaryTopics = document.getElementById("summary__topics");

  summaryName.innerText = summary.get("name");
  summaryEmail.innerText = summary.get("email");
  summaryTopics.innerHTML = summary
    .get("topics")
    .map((topic) => `<li>${topic}</li>`)
    .join("");
};

// const register = (element, add = 1) => {
//   element.forEach((el, index) => {
//     el.addEventListener("click", () => handleClick(index + add));
//   });
// };

// const initializeStepper = () => {
//   document.addEventListener("DOMContentLoaded", () => {
//     // Click event for Dots
//     const dots = document.querySelectorAll(".step__indicator--circles > span");
//     if (dots.length > 0) register(dots);

//     // Click event for Card Button
//     // const nextButtons = document.querySelectorAll("button.continue");
//     // if (nextButtons.length > 0) register(nextButtons, 2);
//   });
// };

// export default initializeStepper;
