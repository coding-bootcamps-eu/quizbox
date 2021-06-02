const url = "questions/test.json"
const question = document.querySelector("#question")
const answersSection = document.getElementById("answers")
const rightAnswer = document.getElementById("right-answer")
const explanationCorrect = document.getElementById("explanation-correct")
const explanationWrong = document.getElementById("explanation-wrong")
const wrongAnswer = document.getElementById("wrong-answer")
const nextBtn = document.querySelector("#next")
const checkBtn = document.querySelector("#check")
const multipleChoiceBtn = document.querySelector("#multiple-choice")
const noAnswersBtn = document.querySelector("#no-answers")

//SHUFFLE FUNCTION
shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
return a;
}

//QUIZBOX WITHOUT MULTIPLE-CHOICE
initQuizBox = () => {
  noAnswersBtn.hidden = true
  multipleChoiceBtn.hidden = true
  checkBtn.hidden = true

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      all = data.questions
      all = shuffle(all)
      currentPosition = 0
      currentQuestion = all[currentPosition].question

      renderQuestion = () => {
        question.innerHTML = currentQuestion

        nextQuestion = () => {
          currentPosition = currentPosition + 1
          currentQuestion = all[currentPosition].question
          question.innerHTML = currentQuestion
        }
        nextBtn.addEventListener("click", nextQuestion)
      }
      renderQuestion()
    })
}

//QUIZBOX WITH MULTIPLE-CHOICE ANSWERS
initMultipleChoice = () => {

  multipleChoiceBtn.hidden = true
  noAnswersBtn.hidden = true
  nextBtn.hidden = true
  
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        all = data.questions
        all = shuffle(all) //RANDOMIZE QUESTIONS' ORDER WITH SHUFFLE
        currentPosition = 0
        currentQuestion = all[currentPosition].question

        renderQuestion = () => {
          question.innerText = currentQuestion

          nextQuestion = () => {
            currentPosition = currentPosition + 1
            currentQuestion = all[currentPosition].question
            question.innerText = currentQuestion //RE-RENDER NEW QUESTION

            renderAnswers() //RE-RENDER ANSWERS FOR NEW QUESTION

            nextBtn.hidden = true
            checkBtn.hidden = false
          }

          renderAnswers = () => {
            answers = all[currentPosition].answers
            correct = answers[0].slice() //SAVE FIRST ELEMENT IN ARRAY AS RIGHT ANSWER
            answers = shuffle(answers) //RANDOMIZE ORDER IN WHICH ANSWERS APPEAR

            //BUILD ANSWERS SECTION WITH RADIO BUTTONS
            answersSection.innerHTML = `
            <form action="">
              <fieldset style="width: 80vw; display: flex; justify-content: space-evenly">
                <div id="a" class="answer-wrapper">
                  <input type="radio" name="answer" value="${answers[0]}" id="${answers[0]}">
                  <span class="checkmark"></span>
                  <label for="${answers[0]}">${answers[0]}</label>
                </div>
                <div id="b" class="answer-wrapper">
                  <input type="radio" name="answer" value="${answers[1]}" id="${answers[1]}">
                  <label for="${answers[1]}">${answers[1]}</label>
                </div>
                <div id="c" class="answer-wrapper">
                  <input type="radio" name="answer" value="${answers[2]}" id="${answers[2]}">
                  <label for="${answers[2]}">${answers[2]}</label>
                </div>
              </fieldset>
            </form>
            `
            //CHECKING IF ANSWER IS CORRECT
            check = () => {
              answersBg = document.querySelector('input[name="answer"]').parentElement
              parent = answersBg.parentElement
              console.log(parent)
              answerCheckedBg = document.querySelector('input[name="answer"]:checked').parentElement
              answerChecked = document.querySelector('input[name="answer"]:checked').id
              correctAnswer = document.getElementById(correct).parentElement
              if(answerChecked == correct) { //IF CHECKED ANSWER EQUALS CORRECT ANSWER
                answerCheckedBg.style.borderColor = "#59CD90"
                parent.style.pointerEvents = "none"
              } 
              else { //IF CHECKED ANSWER DOES NOT EQUAL CORRECT ANSWER
                answerCheckedBg.style.borderColor = "#FF9FB2"
                correctAnswer.style.borderColor = "#59CD90"
                parent.style.pointerEvents = "none"
              }
              nextBtn.hidden = false
              checkBtn.hidden = true
            }
          }
          renderAnswers()
          nextBtn.addEventListener("click", nextQuestion)
          checkBtn.addEventListener("click", check) //STARTING CHECK
        }
        renderQuestion()
      })
      .catch((err) => {
        console.error("OH NO! Anyway", err);
      });
}

multipleChoiceBtn.addEventListener("click", initMultipleChoice)
noAnswersBtn.addEventListener("click", initQuizBox)