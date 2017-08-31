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
    
            self.initForm = function(){
                
            }

        }
    
    })();