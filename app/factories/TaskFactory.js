'use strict';

BMH.factory('taskFactory', [
  '$http',
  '$timeout',

  function($http, $timeout) {
  let task = {};

    //makes card collapsible in dynamic environment
    task.collapsible = (element, attrs) => { 
      $timeout(function () { 
        $('.collapsible').collapsible({
          accordion : false 
        });
      }, 0, false);
    }

    //resets card after action has taken place
    $timeout(task.deactivate = () => {
      $(".collapsible-header").removeClass("active")
      $("li").removeClass("active")
      $(".collapsible-body").css("display", "none")
    }, 500);

   return task; 
  }
]);