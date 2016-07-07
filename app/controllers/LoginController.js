"use strict";

BMH.controller('LoginController', [
	'$http', 
	'$scope',
	'$location',
	'authFactory',

	function ($http, $scope, $location, authFactory) {

		let newCust = {};

		$scope.printDiv = (divName) => {
     var printContents = $("#printableArea").html();
     var originalContents = $("document").html();

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
}

		$scope.register = function(customer) {
            const email = customer.email;
            const password = customer.password;
            const CustUserName = customer.CustUserName   
            authFactory.createUser(email, password, CustUserName)
            .then(
                () => authFactory.loginUser(customer.email, customer.password, customer.CustUserName),
                (error) => console.log("could not register customer")
            ).then(
                (data) => { 
                	newCust.CreatedDate = new Date();
                	newCust.CustUserName = customer.CustUserName
                	newCust.CustEmail = customer.email

                	authFactory.createProfile(newCust), 
                    $location.path("/main");    
                    console.log("successfully registered")
            },
            (error) => console.log("could not authFactory customer")
            )
        }
        
        $scope.login = function(customer) {
            authFactory.loginUser(customer.email, customer.password, customer.CustUserName)
            .then(
                (resolve) => {
        			console.log("resolve", resolve);
                         
                    //console.log("successfully logged in");
                },
                (error) => console.log("could not authFactory customer")
            );
        }

		// main OAuth function
		$scope.githubOauth = function () {
			// OAuth / Github API integration key (accessed by TryAuth in OAuth.io BMH Github Integrated APIs section)
			OAuth.initialize('48j7eSWJJtuZYsMU_rI0ABhAdjA')

			OAuth.popup('github').done(function(result) {
			  console.log(result.access_token)

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
				    			.get(`http://localhost:5000/api/Customer?CustUserName=${customerAlias}`)
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