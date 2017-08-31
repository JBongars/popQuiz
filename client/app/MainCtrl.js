/**
 * Title        :   Main Controller for Client Side Application
 * Author       :   Julien Bongars
 * Date         :   31/08/2017
 * Comments     :   Main Module for Angularjs SPA   
 */

(function(){

        var app = angular.module("PopQuizApp").controller("PopQuizCtrl", PopQuizCtrl);

        PopQuizCtrl.$inject = ["$http"];

        function PopQuizCtrl($http) {
            var self = this; // vm
    
            self.quiz = {        };
            self.quizCount = 0;
            self.totalNum = 0;
            
            //finalanswer to be compiled on the screen
            self.finalanswer = {
                id: 0,
                value: "",
                comments: ""
            };

            self.data = {}; //data container
    
            //Initiation of the page
            self.initForm = function() {
                $http.get("/popquizes")
                    .then(function(result) {
                        //console.log(result);
                        self.data = result.data;
                        console.log(JSON.stringify(self.data));
                    }).catch(function(e) {
                        console.log(e);
                    });
            };

            self.quiz = self.data.quiz;
            self.totalNum = self.totalNum;
            
            //When User clicks the next button
            self.nextForm = function(){
                //empty
            }

            //When User clicks the submit button
            self.submitQuiz = function() {

                console.log("submitQuiz !!!");
    
                //Update id number for quiz being posted
                self.finalanswer.id = self.quiz.id;
            
                $http.post("/submit-quiz", self.finalanswer)
                    .then(function(result) {
                        //console.log(result);
    
                        self.finalanswer.isCorrect = result.data.isCorrect
    
                        //find out more
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