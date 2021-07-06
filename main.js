const question = document.querySelector("#question")
const answersSection = document.querySelector("#answers")
const topic = document.querySelector("#topic")
const rightAnswer = document.querySelector("#right-answer")
const nextBtn = document.querySelector("#next")
const checkBtn = document.querySelector("#check")
const endBtn = document.querySelector("#end")
const restartNoAnswersBtn = document.querySelector("#restart-no-answers")
const restartMultipleChoiceBtn = document.querySelector("#restart-multiple-choice")
const multipleChoiceBtn = document.querySelector("#multiple-choice")
const noAnswersBtn = document.querySelector("#no-answers")
const questionCounter = document.querySelector("#question-counter")
const correctCounter = document.querySelector("#correct-counter")
const sidebar = document.querySelector("#sidebar")
const buttonPanel = document.querySelector("#button-panel")
const gameType = document.querySelector("#game-type")
const wrapperCorrect = document.querySelector("#wrapper-correct")
const multipleChoiceWrapper = document.querySelector("#multiple-choice-wrapper")
const done = document.querySelector("#done")

shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function initQuestionsOnly() {
    gameMode = 1
    restartNoAnswersBtn.style.display = "none"
    all = shuffle(all)

    renderQuestions()
}

function initMultipleChoice() {
    gameMode = 2
    restartMultipleChoiceBtn.style.display = "none"
    all = shuffle(all)

    renderQuestions()
}

function gameMode() {
    gameType.style.display = "block"
    sidebar.style.display = "none"
    buttonPanel.style.display = "none"
    question.style.display = "none"
    answersSection.style.display = "none"


    noAnswersBtn.addEventListener("click", initQuestionsOnly)
    multipleChoiceBtn.addEventListener("click", initMultipleChoice)
    url = "questions/" + topic.value + ".json"


    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        all = data.questions

        all = shuffle(all)

        if(all[0].question == undefined) {
            multipleChoiceWrapper.style.display = "none"
        } else {
            multipleChoiceWrapper.style.display = "flex"
        }
    })
}

gameMode()

function renderQuestions() {
    gameType.style.display = "none"
    sidebar.style.display = "flex"
    buttonPanel.style.display = "flex"
    question.style.display = "flex"
    answersSection.style.display = "block"

    questionTotal = all.length
    currentPosition = 0
    questionNumber = 1
    gameType.hidden = true
    questionCounter.innerHTML = questionNumber + ' / ' + questionTotal

    if(gameMode == 1) {
        nextBtn.style.display = "block"
        wrapperCorrect.style.display = "none"
        endBtn.style.display = "none"
        currentQuestion = all[currentPosition].question || all[currentPosition]
        console.log(currentQuestion)
        answersSection.style.display = "none"
    } else {
        wrapperCorrect.style.display = "block"
        endBtn.style.display = "none"
        currentQuestion = all[currentPosition].question
        correctNumber = 0
        correctCounter.innerText = correctNumber
        renderAnswers()
    }

    question.innerText = currentQuestion
}

function nextQuestion() {
    nextBtn.style.display = "none"
    currentPosition++
    questionNumber++
    questionCounter.innerHTML = questionNumber + ' / ' + questionTotal

    if(gameMode == 1) {
        nextBtn.style.display = "block"
        currentQuestion = all[currentPosition].question || all[currentPosition]
        renderNextBtn()
    } else {
        currentQuestion = all[currentPosition].question
        correctCounter.innerText = correctNumber
        renderAnswers()
    }

    question.innerText = currentQuestion
}

function renderAnswers() {
    checkBtn.style.display = "block"

    answers = all[currentPosition].answers
    correct = answers[0].slice()
    answers = shuffle(answers)

    answersSection.innerHTML = `
    <form action="">
      <fieldset>
        <div id="${answers[0]}" class="answer-wrapper" ondblclick="check()">
          <input type="radio" name="answer" value="${answers[0]}" class="${answers[0]}" id="answer-a">
          <span class="checkmark"></span>
          <label for="answer-a" class="answer-a '${answers[0]}'">${answers[0]}</label>
        </div>
        <div id="${answers[1]}" class="answer-wrapper" ondblclick="check()">
          <input type="radio" name="answer" value="${answers[1]}" class="${answers[1]}" id="answer-b">
          <label for="answer-b" class="answer-b ${answers[1]}">${answers[1]}</label>
        </div>
        <div id="${answers[2]}" class="answer-wrapper" ondblclick="check()">
          <input type="radio" name="answer" value="${answers[2]}" class="${answers[2]}" id="answer-c">
          <label for="answer-c" class="answer-c ${answers[2]}">${answers[2]}</label>
        </div>
      </fieldset>
    </form>
    `

    answerA = document.querySelector("#answer-a")
    answerB = document.querySelector("#answer-b")
    answerC = document.querySelector("#answer-c")
}

function check() {
    field = document.querySelector('input[name="answer"]').parentElement.parentElement
    answerCheckedParent = document.querySelector('input[name="answer"]:checked').parentElement
    answerChecked = document.querySelector('input[name="answer"]:checked').className
    correctParent = document.getElementById(correct)
    labelChecked = document.querySelector(`label[for="${answerChecked}"]`)
    labelCorrect = document.querySelector(`label[for="${correct}"]`)
    nextBtn.style.display = "none"

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
        renderNextBtn()
        checkBtn.style.display = 'none'
      } 

      //IF CHECKED ANSWER DOES NOT EQUAL CORRECT ANSWER
      else {

        //INDICATING WRONG ANSWER
        answerCheckedParent.style.borderColor = "#D72638"
        answerCheckedParent.style.boxShadow = "0 0 15px #D72638"

        //RENDER CORRECT COUNTER
        correctCounter.innerText = "correctNumber"

        //INDICATING CORRECT ANSWER
        correctParent.style.borderColor = "#68B684"
        correctParent.style.boxShadow = "0 0 15px #68B684"
        field.style.pointerEvents = "none"

        //ENABLE MOVING TO NEXT QUESTION
        renderNextBtn()
        checkBtn.style.display = 'none'
      }
}

function renderNextBtn() {
    if(questionNumber == questionTotal) {
        nextBtn.style.display = "none"
        endBtn.style.display = "block"
    } else {
        nextBtn.style.display = "block"
    }
}

function endScreen() {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        all = data.questions

        all = shuffle(all)
    })

    endBtn.style.display = "none"
    question.innerText = "Done! 🎉"

    if(gameMode == 1) {
        restartNoAnswersBtn.style.display = "block"
    }

    if(gameMode == 2) {
        score = correctNumber / questionTotal * 100 + "%"
        restartMultipleChoiceBtn.style.display = "block"
        answersSection.innerHTML = `
        <h2>Your score is ${score}.</h2>
        `
    }
}

function restartNoAnswers() {
    initQuestionsOnly()
}

function restartMultipleChoice() {
    initMultipleChoice()
}

topic.addEventListener("change", gameMode)

//BUTTONS
endBtn.addEventListener("click", endScreen)
nextBtn.addEventListener("click", nextQuestion)
checkBtn.addEventListener("click", check)
restartNoAnswersBtn.addEventListener("click", restartNoAnswers)
restartMultipleChoiceBtn.addEventListener("click", restartMultipleChoice)

