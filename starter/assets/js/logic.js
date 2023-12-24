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

localStorage.setItem("players", []);

let allQuestions = {
    question1: {
        question: "What is the html language",
        answer1: [true, "It's markup language"],
        answer2: [false, "It's dynamic language"],
        answer3: [false, "It's not a language"],
        answer4: [false, "It does not exist"],
    },

    question2: {
        question: "What is Javascript",
        answer2: [false, "It's dynamic language"],
        answer1: [true, "It's markup language"],
        answer3: [false, "It's not a language"],
        answer4: [false, "It does not exist"],
    },

    question3: {
        question: "Which language is used for creating the structure of web pages?",
        answer1: [true, "HTML"],
        answer2: [false, "JavaScript"],
        answer3: [false, "Python"],
        answer4: [false, "SQL"],
    },
    
    question4: {
        question: "What does CSS stand for?",
        answer1: [true, "Cascading Style Sheets"],
        answer2: [false, "Computer Style Sheets"],
        answer3: [false, "Colorful Style Sheets"],
        answer4: [false, "Creative Style Sheets"],
    },
    
    question5: {
        question: "Which tag is used to write JavaScript code inside an HTML document?",
        answer1: [true, "<script>"],
        answer2: [false, "<javascript>"],
        answer3: [false, "<js>"],
        answer4: [false, "<scripting>"],
    },
    
    question6: {
        question: "What is a variable in programming?",
        answer1: [true, "A storage location paired with a name"],
        answer2: [false, "A type of programming language"],
        answer3: [false, "An error in the code"],
        answer4: [false, "A tool to debug programs"],
    },
    
    question7: {
        question: "Which of these is a JavaScript framework?",
        answer1: [true, "React"],
        answer2: [false, "Laravel"],
        answer3: [false, "Django"],
        answer4: [false, "Flask"],
    },
    
    question8: {
        question: "What does 'SQL' stand for?",
        answer1: [true, "Structured Query Language"],
        answer2: [false, "Sequential Query Language"],
        answer3: [false, "Simple Query Language"],
        answer4: [false, "Standard Query Language"],
    }
    
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
        wrongAsnwers++;
        displayFeedback(false);
        timeCount -= 5

    }

    question.textContent = "";
    answerChoices.textContent = "";
    displayQuestion();

   },100)

   

}


function displayFeedback(isCorrect) {

    feedback.classList.remove("hide");
    if (isCorrect) {
        feedback.textContent = "This is right answer";
    } else {
        feedback.textContent = "This is wrong answer."
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
        localStorage.setItem("players", [])
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

    

    
}
)