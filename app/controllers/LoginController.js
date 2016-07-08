"use strict";

BMH.controller('LoginController', [
	'$http', 
	'$scope',
	'$location',
	'authFactory',

	function ($http, $scope, $location, authFactory) {

		let newCust = {};

		$scope.customer = {
			email: null,
			password: null,
			CustUserName: null
		}

		$scope.login = function(customer) {
            authFactory.loginUser(customer.email, customer.password)
            .then(
                (resolve) => {
        			console.log("resolve", resolve);
                },
                (error) => console.log("could not authFactory customer")
            );
        }

        $scope.logout = () => {        	
        	authFactory.logoutUser();
        }

		$scope.reg = function(customer) {
			//checks to make sure all fields are filled
			if (customer.CustUserName === null || customer.email === null || customer.password === null) {
		        return;
		    }
		    else
		    {
		    	//checks to see if userName or email are currently being used		    	
		    	$http
					.get(`http://localhost:5000/api/Customer?email=${customer.email}`)
					.then(
						response => {
							//if not, then creates new user							
							if (response.data[0] === undefined) {

								const email = customer.email;
					            const password = customer.password;
					            const CustUserName = customer.CustUserName 

					            //create an account in my database
					            newCust.CreatedDate = new Date();
			                	newCust.CustUserName = CustUserName
			                	newCust.CustEmail = email
					            authFactory.createProfile(newCust)

					            //creates a firebase account  
					            authFactory.createUser(email, password)
					            .then(
					                () => authFactory.loginUser(email, password),
					                (error) => console.log("could not register customer")
					            ).then(
					                (data) => { 
					                    $location.path("/main");    
					                    console.log("successfully registered")
					            	},
					            	(error) => console.log("could not authFactory customer")
					            )
							}
							else if (response.CustEmail !== customer.email && response.CustUserName !== customer.CustUserName ) {
								alert("Name or Email already exists")
							}
						},
						error => {
							console.log("Could not find that Customer", response)
						}
					)
		    }    
	    }

		// main OAuth function
		$scope.githubOauth = function () {
			// OAuth / Github API integration key (accessed by TryAuth in OAuth.io BMH Github Integrated APIs section)
			OAuth.initialize('48j7eSWJJtuZYsMU_rI0ABhAdjA')

			OAuth.popup('github').done(function(result) {

			  authFactory.setUserToken(result.access_token);

				result.me().done(function(data) {
					console.log(data)

					var fullName = data.name.split(" ")
				    // POSTing resulting user info (new JSON stringified object) to database hooked to our API
				    $http({
				    	url: "http://localhost:5000/api/Customer",
				    	method: "POST",
				    	data: JSON.stringify({
				    		CustUserName: data.alias,
				    		CustFirst: fullName[0],
				    		CustLast: fullName[1],
				    		CustCity: data.location,
				    		CustEmail: data.email,
				    		CreatedDate: new Date()
				    	})
				    }).then(
				    response => {
				    	let customer = response.data;
				    	authFactory.setUser(customer);
				    	console.log("logged in", customer);
				    	$location.path("/main");
				    },
				    response => {
				    	console.log("new customer", response);

				    	// let customer = response.config.data;
				    	let customerAlias = data.alias;
				    	console.log(`customer: `, customerAlias);
				    	// Customer has already been created
				    	if (response.status === 409) {
				    		$http
				    			.get(`http://localhost:5000/api/Customer?email=${data.email}`)
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