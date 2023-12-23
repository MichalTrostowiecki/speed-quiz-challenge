let question = document.getElementById("question-title");
let questionsDiv = document.getElementById("questions");
let answerChoices = document.getElementById("choices");
let startBtn = document.getElementById("start");
let startScreen = document.getElementById("start-screen");
let feedback = document.getElementById("feedback");


let correctAnswers = 0;
let questionIndex = 0;

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
    }
}

startBtn.addEventListener("click", function() {
    startScreen.classList.add("hide");
    questionsDiv.classList.remove("hide");
    displayQuestion();
})




function displayQuestion() {

    answerChoices.textContent = "";
    let questionKey = Object.keys(allQuestions)[questionIndex];
    let questionData = allQuestions[questionKey];
    
    if (!questionData) {
        alert("There is no more questions");
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

   

    if (isCorrect) {
        questionIndex++;
        correctAnswers++;
        displayFeedback(true);
    } else {
        displayFeedback(false);
    }

    question.textContent = "";
    answerChoices.textContent = "";
    
    displayQuestion();

}


function displayFeedback(isCorrect) {

    feedback.classList.remove("hide");
    if (isCorrect) {
        feedback.textContent = "This is right answer";
    } else {
        feedback.textContent = "This is wrong answer"
    }
    

    setTimeout(function () {
        feedback.classList.add("hide");
        feedback.textContent = "";
    },2000);

    
}