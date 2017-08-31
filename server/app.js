/**
 * Title        :   Main Server Side Application
 * Author       :   Julien Bongars
 * Date         :   31/08/2017
 * Comments     :   Main Application for server side application
 */

"use strict";
console.log("Starting...");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname);
console.log(__dirname + "/../client/");
const NODE_PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/../client/"));

var quizes = [{
        id: 0,
        question: "Who is the current president of Singapore?",
        answers: [{ name: "Mr Lee Shien Loong", value: 1 },
                 { name: "Mr Lim Swee Say", value: 2 },
                 { name: "Madam Halimah Yacoob", value: 3 },
                 { name: "Tony Tan", value: 4 },
                 { name: "Tony Jia", value: 5 }],
        correctanswer: 4
    },
    {
        id: 1,
        question: "What does Bo Jio mean?",
        answers: [{ name: "Pretty girls", value: 1 },
                 { name: "Never ask me along", value: 2 },
                 { name: "No guts", value: 3 },
                 { name: "Ugly girl", value: 4 },
                 { name: "A cat", value: 5 }],
        correctanswer: 2
    },
    {
        id: 2,
        question: "What is MRT stand for?",
        answers: [{ name: "Mass Rapid Transit", value: 1 },
                  { name: "Massive Ridiculous Train", value: 2 },
                  { name: "Madam Rashid Tan", value: 3 },
                  { name: "Many Road transport", value: 4 },
                  { name: "Must Run Totheend", value: 5 }],
        correctanswer: 1
    },
    {
        id: 3,
        question: "Why the fruit of king is named as Durian?",
        answers: [{ name: "Because the farmer pluck the fruit until dulan", value: 1 },
                 { name: "Its derived from a malay word numerous spikes", value: 2 },
                 { name: "Yellow inside green outside", value: 3 },
                 { name: "Incredible hulk's fav fruit", value: 4 },
                 { name: "Its a cat droplet", value: 5 }],
        correctanswer: 2
    },
    {
        id: 4,
        question: "What was the most recent typhoon level at HK?",
        answers: [{ name: "10", value: 1 },
                  { name: "10+", value: 2 },
                  { name: "8", value: 3 },
                  { name: "0.5+", value: 4 },
                  { name: "1", value: 5 }],
        correctanswer: 2
    }
];


//var protoQuizes = quizes.clone();
var protoQuizes = Object.assign([], quizes);
var protoAnswers = [];


app.get("/popquizes", function(req, res) {

    //console.log(JSON.stringify(protoQuizes));
    
    if(protoQuizes.length == 0){
        protoQuizes = Object.assign([], {
            quizes: quizes, num: quizes.length
        });
        console.log("Quiz is done!");

        res.json({"done": true})

    } else {
        var i = Math.floor(Math.random() * protoQuizes.length);
        var quiz = protoQuizes[i];
        //console.log(JSON.stringify(quizes));
        console.log(quizes.length);
        
        //remove quiz from protoQuizes
        var index = protoQuizes.indexOf(quiz);
        protoQuizes.splice(index, 1);

        var response = {quiz: quiz, num: quizes.length};

        res.json(response);
    }
});

app.get("/reset-quiz", function(req, res){
    protoQuizes = Object.assign([], quizes);
    console.log("Quiz is completed!");
    //res.json(protoAnswers); //protoAnswers
});

app.post("/submit-quiz", function(req, res) {

    //console.log("Received user object " + req.body);
    console.log("Received user object " + JSON.stringify(req.body));
    
    var quiz = req.body;
    var checking = quizes[quiz.id];

    if (checking.correctanswer == parseInt(quiz.value)) {
        console.log("CORRECT !");
        quiz.isCorrect = true;
    } else {
        console.log("INCORRECT !");
        quiz.isCorrect = false;
    }

    //protoAnswers.push(Object.assign({}, quiz)); //push quiz to protoAnswers
    //console.log(JSON.stringify(protoAnswers[protoAnswers.length - 1]));
    res.status(200).json(quiz);
});


app.use(function(req, res) {
    res.send("<h1>!!!! Page not found ! ! !</h1>");
});

app.listen(NODE_PORT, function() {
    console.log("Web App started at " + NODE_PORT);
});

module.exports = app