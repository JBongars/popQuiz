/**
 * Title        :   Main Controller for Client Side Application
 * Author       :   Julien Bongars
 * Date         :   31/08/2017
 * Comments     :   Main Module for Angularjs SPA   
 */

(function(){

        var app = angular.module("PopQuizApp").controller("PopQuizCtrl", PopQuizCtrl);

        PopQuizCtrl.$inject = ["$http"];

        self.currentQuiz = {};
        self.currentQuizNum = 1;

        self.allQuizes = [];
        self.response = ""; 
        self.isCorrect = null;
        self.showResult = false;

        function PopQuizCtrl($http) {
            var self = this; // vm
    
            self.initForm = function(){
                $http.get('/next').then(function(result){
                    console.log(result);
                    self.currentQuiz = result.data
                    //console.log(self.currentQuiz);

                }).catch(function(e){
                    console.log(e);
                });

            };

            self.initForm();

            console.log(self);

            self.next = function() {
                console.log(allQuizes.length);
                console.log(currentQuiz.id + "," )//allQuizes[allQuizes.length - 1].id)
                                
                self.currentQuizNum++;
                
                self.initForm();

                /*
                if(allQuizes.length == quiz.total) {
                    showResult = true;
                } else if(currentQuiz.id == allQuizes[allQuizes.length - 1].id){
                    self.response = "Question already answered!";
                } else {
                    allQuizes.push(currentQuiz);
                    self.initForm();
                };
                */
            };

            self.reset = function() {
                self.currentQuiz = {};
                self.allQuizes = [];
                $http.get('/reset').then(function(result){
                    console.log(result.data);
                }).catch(function(e){
                    console.log(e);
                });
            };

            self.submit = function(){

                self.currentQuizAnswer = {
                    id : self.currentQuiz.id,
                    answer : self.currentQuiz.answer
                }

                $http.post('/submit', self.currentQuizAnswer).then(function(result){
                    console.log(result)

                    var response = result.data;
                    self.isCorrect = response.isCorrect;
                    allQuizes.push(Object.assign(self.currentQuiz, response));

                }).catch(function(e){
                    console.log(e);
                })
            }

        }
    
    })();