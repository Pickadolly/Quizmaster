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

const req = async () => {
    const res = await fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple');
    const json = await res.json();
    len = json.results.length;
    //console.log(json);
    let i = 0;
    while(i < len) {
        let j = 0, v = 0;
        var randomNumber = Math.floor(Math.random() * 4);

        while(j < 4) {
            if(j == randomNumber) {
                x = json.results[i].correct_answer;
            } else {
                x = json.results[i].incorrect_answers[v];
                v++;
            }
            answers[j] = x;
            j++
        }

        resQ = {
                question : json.results[i].question,
                imgSrc : "img/"+i+".jpg",
                correct : choices[randomNumber],
                choiceA : answers[0],
                choiceB : answers[1],
                choiceC : answers[2],
                choiceD : answers[3]                
        };
        questions.push(resQ);
        i++;
    }
}

