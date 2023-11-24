export const showNext = (index) => {
  // Hide all cards
  const cards = document.querySelectorAll(".main > div");
  cards.forEach((div) => {
    div.classList.remove("active");
  });

  //   Show the active card
  const activeCard = document.querySelector(`.main > div:nth-child(${index})`);
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
    `.step__indicator--circles > span:nth-child(${index})`
  );
  if (activeDot) activeDot.classList.add("active");

  //   Update the current step number

  const stepNumber = document.getElementById("step__number");
  if (stepNumber) stepNumber.innerText = index;
};
