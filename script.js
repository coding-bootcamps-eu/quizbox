const question = document.querySelector("#question")
const answersSection = document.getElementById("answers")
const rightAnswer = document.getElementById("right-answer")
const explanationCorrect = document.getElementById("explanation-correct")
const explanationWrong = document.getElementById("explanation-wrong")
const wrongAnswer = document.getElementById("wrong-answer")
const nextBtn = document.querySelector("#next")
const checkBtn = document.querySelector("#check")
const restartNoAnswersBtn = document.querySelector("#restart-no-answers")
const restartMultipleChoiceBtn = document.querySelector("#restart-multiple-choice")
const multipleChoiceBtn = document.querySelector("#multiple-choice")
const noAnswersBtn = document.querySelector("#no-answers")
const questionCounter = document.querySelector("#question-counter")
const correctCounter = document.querySelector("#correct-counter")
const sideBar = document.querySelector("#sidebar")
const buttonPanel = document.querySelector("#button-panel")
const gameType = document.querySelector("#game-type")
const wrapperCorrect = document.querySelector("#wrapper-correct")
const multipleChoiceWrapper = document.querySelector("#multiple-choice-wrapper")
const done = document.querySelector("#done")

//SHUFFLE FUNCTION
shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
return a;
}

sideBar.style.display = "none"
buttonPanel.hidden = true
multipleChoiceWrapper.style.display = "none"

//QUIZBOX WITHOUT MULTIPLE-CHOICE
initQuizBox = () => {
  const topic = document.querySelector("#topic")
  const url = "questions/" + topic.value + ".json"
  noAnswersBtn.style.display = "none"
  multipleChoiceBtn.style.display = "none"
  checkBtn.style.display = "none"
  restartMultipleChoiceBtn.style.display = "none"
  restartNoAnswersBtn.style.display = "none"
  sideBar.style.display = "flex"
  wrapperCorrect.style.display = "none"
  buttonPanel.style.display = "flex"

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      all = data.questions
      questionNumber = 1

      //RANDOMIZE QUESTIONS' ORDER IN ARRAY
      all = shuffle(all)
      currentPosition = 0
      questionTotal = all.length

      //START WITH FIRST QUESTION IN ARRAY
      currentQuestion = all[currentPosition]

      renderQuestion = () => {
        gameType.hidden = true
        question.innerHTML = currentQuestion
        questionCounter.innerHTML = questionNumber + ' / ' + questionTotal

        nextQuestion = () => {
          currentPosition++
          questionNumber++
          questionCounter.innerHTML = questionNumber + ' / ' + questionTotal
          currentQuestion = all[currentPosition]
          question.innerHTML = currentQuestion

          if(questionNumber == questionTotal) {
            nextBtn.innerHTML = "Finish"
            nextBtn.addEventListener("click", () => {
              nextBtn.style.display = "none"
              questionCounter.innerHTML = questionTotal + ' / ' + questionTotal
              question.innerHTML = ""
              done.innerHTML = `
              <h1>🎉</h1>
              <p>You have completed all ${questionTotal} questions.</p>
              <p>Well done!</p>
              <a href="./">Back to the Start</a>
              `
            })
          }
        }

        nextBtn.addEventListener("click", nextQuestion)

        // document.addEventListener("keypress", (event) => {
        //   keyName = event.key
        //   keyCode = event.code

        //   if(keyName == 'Enter') {
        //     nextBtn.click()
        //   }
        // })
      }
      renderQuestion()
    })
}

// topic.addEventListener("change", initQuizBox);

//QUIZBOX WITH MULTIPLE-CHOICE ANSWERS
initMultipleChoice = () => {

  nextBtn.style.display = 'none'
  multipleChoiceBtn.hidden = true
  noAnswersBtn.hidden = true
  nextBtn.style.display = "hidden"
  restartMultipleChoiceBtn.hidden = true
  restartNoAnswersBtn.hidden = true
  sideBar.style.display = "flex"
  buttonPanel.style.display = "flex"
  gameType.hidden = true
  correctNumber = 0
  
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        all = data.questions

        //RANDOMIZE QUESTIONS' ORDER WITH SHUFFLE
        all = shuffle(all)

        renderQuestion = () => {
          isCorrect = null
          currentPosition = 0
          currentQuestion = all[currentPosition].question
          questionNumber = 1
          questionTotal = all.length
          question.innerText = currentQuestion
          questionCounter.innerHTML = questionNumber + ' / ' + questionTotal
          correctCounter.innerHTML = correctNumber
          console.log(currentQuestion)

          //CONTINUE ONWARDS TO NEXT QUESTION
          if(currentQuestion !== 'undefined') {
            nextQuestion = () => {
              currentPosition++
              currentQuestion = all[currentPosition].question
              questionNumber++
  
              //SHOW QUESTION COUNTER
              questionCounter.innerHTML = questionNumber + ' / ' + questionTotal
  
              //RE-RENDER NEW QUESTION
              question.innerText = currentQuestion
  
              //RE-RENDER ANSWERS FOR NEW QUESTION
              renderAnswers()
  
              nextBtn.style.display = "hidden"
              checkBtn.style.display = "inline-block"
              restartMultipleChoiceBtn.hidden = true
            }
          }

          renderAnswers = () => {
            checkBtn.style.display = 'inline-block'
            answers = all[currentPosition].answers

            //SAVE FIRST ELEMENT IN ARRAY AS CORRECT ANSWER
            correct = answers[0].slice()

            //RANDOMIZE ORDER IN WHICH ANSWERS APPEAR
            answers = shuffle(answers)

            //BUILD ANSWERS SECTION WITH RADIO BUTTONS
            answersSection.innerHTML = `
            <form action="">
              <fieldset>
                <div id="${answers[0]}" class="answer-wrapper">
                  <input type="radio" name="answer" value="${answers[0]}" class="${answers[0]}" id="answer-a">
                  <span class="checkmark"></span>
                  <label for="answer-a" class="answer-a '${answers[0]}'">${answers[0]}</label>
                </div>
                <div id="${answers[1]}" class="answer-wrapper">
                  <input type="radio" name="answer" value="${answers[1]}" class="${answers[1]}" id="answer-b">
                  <label for="answer-b" class="answer-b ${answers[1]}">${answers[1]}</label>
                </div>
                <div id="${answers[2]}" class="answer-wrapper">
                  <input type="radio" name="answer" value="${answers[2]}" class="${answers[2]}" id="answer-c">
                  <label for="answer-c" class="answer-c ${answers[2]}">${answers[2]}</label>
                </div>
              </fieldset>
            </form>
            `

            answerA = document.querySelector("#answer-a")
            answerB = document.querySelector("#answer-b")
            answerC = document.querySelector("#answer-c")

            //ADD KEYPRESS EVENTS FOR ANSWER SELECTION AND ANSWER CHECK
            if(checkBtn.style.display == 'inline-block') {
              document.addEventListener("keypress", (event) => {
                keyName = event.key
                keyCode = event.code
                
                if(keyName == 1) {
                  answerA.checked = true
                }
  
                if(keyName == 2) {
                  answerB.checked = true
                }
  
                if(keyName == 3) {
                  answerC.checked = true
                }
  
                if(keyName == 'Enter') {
                  checkBtn.click()
                }
              })
            }

            //CHECKING IF ANSWER IS CORRECT
            check = () => {
              field = document.querySelector('input[name="answer"]').parentElement.parentElement
              answerCheckedParent = document.querySelector('input[name="answer"]:checked').parentElement
              answerChecked = document.querySelector('input[name="answer"]:checked').className
              correctParent = document.getElementById(correct)
              labelChecked = document.querySelector(`label[for="${answerChecked}"]`)
              labelCorrect = document.querySelector(`label[for="${correct}"]`)
              nextBtn.style.display = "hidden"
  
              //IF CHECKED ANSWER EQUALS CORRECT ANSWER
              if(answerChecked == correct) {

                //ADD TO CORRECT COUNTER
                correctNumber++
                correctCounter.innerText = correctNumber


                //INDICATING CORRECT ANSWER
                answerCheckedParent.style.borderColor = "#68B684"
                answerCheckedParent.style.boxShadow = "0 0 15px #68B684"

                //DISABLES CHOOSING ANOTHER ANSWER
                field.style.pointerEvents = "none"

                //ENABLE MOVING TO NEXT QUESTION
                nextBtn.style.display = 'inline-block'
                checkBtn.style.display = 'none'
              } 

              //IF CHECKED ANSWER DOES NOT EQUAL CORRECT ANSWER
              else {

                //INDICATING WRONG ANSWER
                answerCheckedParent.style.borderColor = "#D72638"
                answerCheckedParent.style.boxShadow = "0 0 15px #D72638"

                //RENDER CORRECT COUNTER
                correctCounter.innerText = correctNumber

                //INDICATING CORRECT ANSWER
                correctParent.style.borderColor = "#68B684"
                correctParent.style.boxShadow = "0 0 15px #68B684"
                field.style.pointerEvents = "none"

                //ENABLE MOVING TO NEXT QUESTION
                nextBtn.style.display = 'inline-block'
                checkBtn.style.display = 'none'
              }
              
              //EITHER: SHOWING END SCREEN AFTER LAST QUESTION
              if(questionNumber == all.length){
                nextBtn.innerText = 'Finish'
                nextBtn.hidden = false
                checkBtn.hidden = true
                restartMultipleChoiceBtn.hidden = true

                endScreen = () => {
                  checkBtn.hidden = true
                  question.innerHTML = 'Done! 🎉'
                  answersSection.innerHTML = `
                  <p style="font-size: 2.5rem;">You have answered all questions</p>
                  `
                }

                nextBtn.addEventListener("click", endScreen)
              } 
              
              //OR: IF IT'S NOT THE LAST QUESTION, MOVE ONWARDS
              else {
                nextBtn.hidden = false
                checkBtn.hidden = true
              }

              //ADD KEYPRESS EVENT FOR 'NEXT' BUTTON
              if(nextBtn.style.display !== 'none')
              document.addEventListener("keypress", (event) => {
                keyName = event.key
                keyCode = event.code
                
                if(keyName == 'Enter') {
                  nextBtn.click()
                }
              })
            }
          }

          renderAnswers()

          //TRIGGER: CHECK
          checkBtn.addEventListener("click", check)
        }
        renderQuestion()
      })
      .catch((err) => {
        console.error("OH NO! Anyway", err);
      });
}

restartMultipleChoice = () => {
  initMultipleChoice()
}

multipleChoiceBtn.addEventListener("click", initMultipleChoice)
noAnswersBtn.addEventListener("click", initQuizBox)
restartMultipleChoiceBtn.addEventListener("click", initMultipleChoice)