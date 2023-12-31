// Importing all questions from the global window object.
let allQuestions = window.allQuestions;

// Grabbing all DOM elements to be manipulated.
let question = document.getElementById("question-title");
let questionsDiv = document.getElementById("questions");
let answerChoices = document.getElementById("choices");
let startBtn = document.getElementById("start");
let startScreen = document.getElementById("start-screen");
let feedback = document.getElementById("feedback");
let endScreen = document.getElementById("end-screen");
let finalScore = document.getElementById("final-score");
let time = document.getElementById("time");
let submitBtn = document.getElementById("submit");



// Variables needed for quiz functionality.
let correctAnswers = 0;
let wrongAsnwers = 0;
let questionIndex = 0;
let timeCount = 60;
let timerInterval;

// Variables for sound feedback on answers.
let correctSound = new Audio("../assets/sfx/correct.wav");
let wrongSound = new Audio("../assets/sfx/incorrect.wav");


// Initialize local storage with an empty array "players" if it does not exist.
if (localStorage.getItem("players") === null ) {
    localStorage.setItem("players", JSON.stringify([]));
}


// Event listener for the start button. Starts the quiz when clicked.
startBtn.addEventListener("click", function() {
    startScreen.classList.add("hide");
    questionsDiv.classList.remove("hide");
    displayQuestion();
    timer();
})



// Function display questions to the user.
function displayQuestion() {
    
    // Clear previous answer choices
    answerChoices.textContent = "";

    // Get the current question
    let questionKey = Object.keys(allQuestions)[questionIndex];
    let questionData = allQuestions[questionKey];
    

    // If no more questions, end the quiz
    if (!questionData) {
        endQuiz();
        
        return;
    }

    question.textContent = questionData.question;

    for (let answerKey in questionData) {

        if (answerKey !== "question") {
            answerBtn = document.createElement("button");
            answerBtn.textContent = questionData[answerKey][1]
            answerChoices.appendChild(answerBtn);
            answerBtn.addEventListener("click", function() {
            checkAnswer(questionData[answerKey][0]);
            })
        }
    }
}


//Function checks if answer choosed by user is correct / wrong.
function checkAnswer(isCorrect) {

    setTimeout(function() {

    if (isCorrect) {
        correctSound.play();
        questionIndex++;
        correctAnswers++;
        displayFeedback(true);
    } else {
        wrongSound.play();
        questionIndex++
        wrongAsnwers++;
        displayFeedback(false);
        timeCount -= 5

    }

    question.textContent = "";
    answerChoices.textContent = "";
    displayQuestion();

   },200)

   

}

// Function to display feedback whether answer is correct or wrong.
function displayFeedback(isCorrect) {

    feedback.classList.remove("hide");
    if (isCorrect) {
        feedback.textContent = "Correct!";
    } else {
        feedback.textContent = "Wrong!"
    }
    
    setTimeout(function () {
        feedback.classList.add("hide");
        feedback.textContent = "";
    },1300);
}


// function to set the timer for the quizz.
function timer() {

    clearInterval(timerInterval)

    timerInterval = setInterval(function() {
        if (timeCount < 0) {
            clearTimeout(timerInterval);
            endQuiz();
            
        } else {
            time.textContent = timeCount;
            timeCount--;
        }
    }, 1000);

}

// Function to end Quiz and display / hide different parts of website.
function endQuiz() {
    endScreen.classList.remove("hide");
    finalScore.textContent = correctAnswers;
    questionsDiv.classList.add("hide");
    answerChoices.classList.add("hide");
    timeCount = 0;
    timeCount.textContent = timeCount;
    
    
}


// Adds functionality to submit button, once pressed it adds player scores to the local storage.
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    let playersData = localStorage.getItem("players");

    if (playersData) {
        playersData = JSON.parse(playersData);
        if(!Array.isArray(playersData)) {
            playersData = [];
    
        }

    } else {
        playersData = [];
    }
  
    let player = {
        initials: "",
        scores: 0,
    }

    let initials = document.getElementById("initials").value;
    player.initials = initials;
    player.scores = correctAnswers;
    playersData.push(player);
    localStorage.setItem("players", JSON.stringify(playersData));
    document.getElementById("initials").value = "";

    window.open('highscores.html', '_self');
    
}
)