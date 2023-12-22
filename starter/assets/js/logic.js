let question = document.getElementById("question-title");
let answerChoices = document.getElementById("choices");

let correctAnswers = 0;

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

function displayQuestion() {

    
    let questionIndex = 0;
    let questionKey = Object.keys(allQuestions)[questionIndex];
    let questionData = allQuestions[questionKey];
    question.textContent = questionData.question;
    console.log(questionData);

        
        for (answerKey in questionData) {

            if (answerKey !== "question") {
                answerBtn = document.createElement("button");
                answerBtn.textContent = questionData[answerKey][1]
                answerChoices.appendChild(answerBtn);

                answerBtn.addEventListener("click", function(event) {
                    checkAnswer(event);
                })
            }
        }
    
}

function checkAnswer() {

}

