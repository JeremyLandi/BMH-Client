"use strict";

BMH.controller('LoginController', [
	'$http', 
	'$scope',
	'$location',
	'AuthFactory',

	function ($http, $scope, $location, authFactory) {

		// main OAuth function
		$scope.githubOauth = function () {
			// OAuth / Github API integration key (accessed by TryAuth in OAuth.io BMH Github Integrated APIs section)
			OAuth.initialize('B-0gV1snXfTltFNgEUvICyOtbJg')

			OAuth.popup('github').done(function(result) {
			  console.log(result)

				result.me().done(function(data) {
				    // POSTing resulting user info (new JSON stringified object) to database hooked to our API
				    $http({
				    	// designated API endpoint
				    	url: "http://localhost:5000/api/Customer",
				    	method: "POST",
				    	data: JSON.stringify({
				    		CustUserName: data.alias,
				    		CustCity: data.location,
				    		Email: data.email,
				    		CreatedDate: new Date()
				    	})
				    }).then(
				    response => {
				    	let customer = response.data[0];
				    	authFactory.setUser(customer);
				    	console.log("logged in", customer);
				    },
				    response => {
				    	console.log("new customer", response);

				    	// let customer = response.config.data;
				    	let customerAlias = data.alias;
				    	console.log(`customer: `, customerAlias);
				    	// Customer has already been created
				    	if (response.status === 409) {
				    		$http
				    			.get(`http://localhost:5000/api/Customer?CustUserName=${customerAlias}`)
				    			// .get(`http://localhost:5000/api/Customer?CustomerName=${customerAlias.toString()}`)
				    			// .get(`http://localhost:5000/api/Customer?CustomerName=${}`)
				    			.then(
				    				response => {
				    					let customer = response.data[0];
				    					console.log("Customer already exists: ", customer);
				    					authFactory.setUser(customer)
				    					$location.path("/main");
				    				},
				    				response => console.log("Could not find that Customer", response)
				    			)
				    	}
				    }
				  )
				})
			}).fail(function (a,b,c) {
				console.log(arguments);
			});
		};
	}
]);

