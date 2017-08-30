/**
 * Client side code.
 */
(function() {
    "use strict";
    var app = angular.module("PopQuizApp", []);

    app.controller("PopQuizCtrl", ["$http", PopQuizCtrl]);

    function PopQuizCtrl($http) {
        var self = this; // vm

        self.quiz = {        };

        self.finalanswer = {
            id: 0,
            value: "",
            comments: "",
            message: ""
        };

        self.initForm = function() {
            $http.get("/popquizes")
                .then(function(result) {
                    //console.log(result);
                    self.quiz = result.data;
                }).catch(function(e) {
                    console.log(e);
                });
        };

        self.initForm();
        self.summaryAnswers = [];
        self.submitQuiz = function() {

            console.log("submitQuiz !!!");

            self.finalanswer.id = self.quiz.id;
        
            $http.post("/submit-quiz", self.finalanswer)
                .then(function(result) {
                    //console.log(result);

                    result.data.isCorrect = self.finalanswer.isCorrect;

                    self.summaryAnswers.push(Object.assign({}, 
                        self.finalanswer, 
                        self.quiz
                    ));

                }).catch(function(e) {
                    console.log(e);
                });
        };

        self.resetQuizes = function(){

            console.log("Success!!");

            $http.get("/reset-quiz")
                .then(function(result){
                    console.log(JSON.stringify(result.data));
                }).catch(function(e){
                    console.log(e);
                });
        };
    }

})();