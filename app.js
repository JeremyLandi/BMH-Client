'use strict';

let BMH = angular.module('BMH', [
	'ngRoute'
])

BMH.config(['$routeProvider', 
  function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html',
			controller: 'LoginController'
		})
		.when('/main', {
			templateUrl: 'partials/main.html',
			controller: 'MainController'
		})
    .when("/songs/:songId", {
      templateUrl: "partials/song-brief.html",
      controller: "SongDetailController",
      // resolve: { isAuth }
    })
		.otherwise('/');
  }
]);