const question = document.querySelector("#question");
const answersSection = document.getElementById("answers")
const rightAnswer = document.getElementById("right-answer")
const wrongAnswer = document.getElementById("wrong-answer")
const nextBtn = document.querySelector("#next");
const restartBtn = document.querySelector("#restart");

function randomize() {
    const l = currentQuestions.length;
    const random = Math.floor(Math.random() * l);
    const currentQuestion = currentQuestions.splice(random, 1)[0];
    return currentQuestion;
  }
  
  let currentQuestions = [];
  function showRandomQuestion() {
    const currentQuestion = randomize();
  
    if (currentQuestion !== undefined) {
      question.innerText = currentQuestion;
    } else {
      nextBtn.hidden = true;
      restartBtn.hidden = false;
      restartBtn.focus();
      question.innerText = "Done 🎉";
    }
  }

  nextBtn.addEventListener("click", showRandomQuestion);
  restartBtn.addEventListener("click", restart);

initQuizbox = () => {
  
    const url = "questions/test.json";
  
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        currentQuestions = data.questions[1];
        showRandomQuestion();
      })
      .catch((err) => {
        console.error("OH NO! Anyway", err);
      });
}

initQuizbox()