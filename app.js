'use strict';

let BMH = angular.module('BMH', [
	'ngRoute',
	'firebase',
	'ui.materialize',
])

let isAuth = (authFactory) => new Promise((resolve, reject) => {
	let userToken = authFactory.getUserToken();

	if (userToken) {
		console.log("user authenticated");	
		resolve();
	}
	else {
		console.log("user is not authenticated");	
		reject();
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
			// resolve: {isAuth}
		})
		.when('/main/:CustUserName', {
			templateUrl: 'partials/public/mainPublic.html',
			controller: 'MainPublicCtrl'
		})
		.otherwise('/');
  }
]);