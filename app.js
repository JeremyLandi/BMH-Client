'use strict';

let BMH = angular.module('BMH', [
	'ngRoute',
	'ngMaterial',
	'ngMessages',
])

	let isAuth = (authFactory) => new Promise((resolve, reject) => {
		let user = authFactory.getUser();
		
		console.log("user", user);	
		if (user == null) {
			console.log("user", user);
			return false;
		}
		else {
			return true
		}
	});

BMH.config(['$routeProvider',
  function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html',
			controller: 'LoginController'
			
		})
		.when('/main/', {
			templateUrl: 'partials/main.html',
			controller: 'MainCtrl',
			resolve: {isAuth}
		})
		.when('/main/:custUserName', {
			templateUrl: 'partials/mainPublic.html',
			controller: 'MainCtrl',
			resolve: {isAuth}
		})
    .when("/songs/:songId", {
      templateUrl: "partials/song-brief.html",
      controller: "SongDetailController",
      // resolve: { isAuth }
    })
		.otherwise('/');
  }
]);