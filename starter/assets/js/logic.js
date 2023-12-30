let allQuestions = window.allQuestions;


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




let correctAnswers = 0;
let wrongAsnwers = 0;
let questionIndex = 0;
let timeCount = 60;

if (localStorage.getItem("players") === null ) {
    localStorage.setItem("players", JSON.stringify([]));
}



startBtn.addEventListener("click", function() {
    startScreen.classList.add("hide");
    questionsDiv.classList.remove("hide");
    displayQuestion();
    timer();
})




function displayQuestion() {
    
    answerChoices.textContent = "";
    let questionKey = Object.keys(allQuestions)[questionIndex];
    let questionData = allQuestions[questionKey];
    
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

function checkAnswer(isCorrect) {


    setTimeout(function() {

    if (isCorrect) {
        questionIndex++;
        correctAnswers++;
        displayFeedback(true);
    } else {
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

let timerInterval;

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

function endQuiz() {
    endScreen.classList.remove("hide");
    finalScore.textContent = correctAnswers;
    questionsDiv.classList.add("hide");
    answerChoices.classList.add("hide");
    timeCount = 0;
    timeCount.textContent = timeCount;
    
    
}

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