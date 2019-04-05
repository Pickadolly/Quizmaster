// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [], resQ = {}, len = 0;
let choices = ["A","B","C","D"];
let answers = [];
var checkAnswer;

// define an asynchronous function
const req = async () => {
    // fetch the url
    const res = await fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple');
    // get the json result
    const json = await res.json();
    len = json.results.length;
    let i = 0;
    // while i is less then length of json result do...
    while(i < len) {
        let j = 0, v = 0;
        // generate a random number between 0-3
        var randomNumber = Math.floor(Math.random() * 4);

        // while j is less than 4 do...
        while(j < 4) {
            // if j is the same as randomNumber set x to correct answer
            if(j == randomNumber) {
                x = json.results[i].correct_answer;
            } else {
                // else set x to one of the incorrect answers (v)
                x = json.results[i].incorrect_answers[v];
                v++;
            }
            // save answers to an array
            answers[j] = x;
            j++
        }

        // generate the response object
        resQ = {
                question : json.results[i].question,
                imgSrc : "img/"+i+".jpg",
                correct : choices[randomNumber],
                choiceA : answers[0],
                choiceB : answers[1],
                choiceC : answers[2],
                choiceD : answers[3]                
        };
        // push the response object to the questions array
        questions.push(resQ);
        i++;
    }

    // created some variables
    const lastQuestion = questions.length - 1;
    let runningQuestion = 0;
    let count = 0;
    const questionTime = 10; // 10s
    const gaugeWidth = 150; // 150px
    const gaugeUnit = gaugeWidth / questionTime;
    let TIMER;
    let score = 0;

    // render a question
    function renderQuestion(){
        let q = questions[runningQuestion];
        
        question.innerHTML = "<p>"+ q.question +"</p>";
        qImg.innerHTML = "<img src="+ q.imgSrc +">";
        choiceA.innerHTML = q.choiceA;
        choiceB.innerHTML = q.choiceB;
        choiceC.innerHTML = q.choiceC;
        choiceD.innerHTML = q.choiceD;
    }

    start.addEventListener("click",startQuiz);

    // start quiz
    function startQuiz(){
        start.style.display = "none";
        renderQuestion();
        quiz.style.display = "block";
        renderProgress();
        renderCounter();
        TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
    }

    // render progress
    function renderProgress(){
        for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
            progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
        }
    }

    // counter render
    function renderCounter(){
        if(count <= questionTime){
            counter.innerHTML = count;
            timeGauge.style.width = count * gaugeUnit + "px";
            count++
        }else{
            count = 0;
            // change progress color to red
            answerIsWrong();
            if(runningQuestion < lastQuestion){
                runningQuestion++;
                renderQuestion();
            }else{
                // end the quiz and show the score
                clearInterval(TIMER);
                scoreRender();
            }
        }
    }

    
    // checkAnwer
    checkAnswer = function (answer){
        if( answer == questions[runningQuestion].correct){
            // answer is correct
            score++;
            // change progress color to green
            answerIsCorrect();
        }else{
            // answer is wrong
            // change progress color to red
            answerIsWrong();
        }
        count = 0;
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }

    // answer is correct
    function answerIsCorrect(){
        document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
    }

    // answer is Wrong
    function answerIsWrong(){
        document.getElementById(runningQuestion).style.backgroundColor = "#f00";
    }

   // score render
   function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent & show the result
    let img = (scorePerCent >= 80) ? "img/s3.png" :
            (scorePerCent >= 50) ? "img/s2.png" :
            "img/s1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>You've scored: "+ scorePerCent +"%</p>";
    }   
}

req();


