const questionEl = document.querySelector("#question");
const nextBtn = document.querySelector("#next");
const restartBtn = document.querySelector("#restart");
const topic = document.querySelector("#topic");

function random() {
  const l = currentQuestions.length;
  const random = Math.floor(Math.random() * l);
  const currentQuestion = currentQuestions.splice(random, 1)[0];
  return currentQuestion;
}

let currentQuestions = [];
function showRandomQuestion() {
  const currentQuestion = random();

  if (currentQuestion !== undefined) {
    questionEl.innerText = currentQuestion;
  } else {
    nextBtn.hidden = true;
    restartBtn.hidden = false;
    restartBtn.focus();
    questionEl.innerText = "Done 🎉";
  }
}

function restart() {
  initQuizbox();
}

nextBtn.addEventListener("click", showRandomQuestion);
restartBtn.addEventListener("click", restart);
topic.addEventListener("change", initQuizbox);

function initQuizbox() {
  nextBtn.hidden = false;
  restartBtn.hidden = true;
  nextBtn.focus();

  const url = "questions/" + topic.value + ".json";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      currentQuestions = data.questions;
      showRandomQuestion();
    })
    .catch((err) => {
      console.error("OH NO! Anyway", err);
    });
}
initQuizbox();
