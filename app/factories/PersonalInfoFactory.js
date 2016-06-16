"use strict";

BMH.factory("personalInfoFactory", [
	'$q',
	'$http',
	'authFactory',
	'$routeParams',
	'$location',

	function($q, $http, authFactory, $routeParams, $location ) {
		let personalInfo = {};

		personalInfo.updatePersonalFact = (custInfo) => {
			for (let item in custInfo) {
				custInfo.item = item.toLowerCase();
			}

			// Date converter
			custInfo.BirthDate = (`${custInfo.month}/${custInfo.date}/${custInfo.year}`)

			console.log("custInfo.BirthDate", custInfo.BirthDate);
			console.log("custInfo", custInfo.CustomerId);
			return $q((resolve, reject) => {
				$http.put(`http://localhost:5000/api/Customer/${custInfo.CustomerId}`, JSON.stringify(custInfo))
			.success(
				resolve => {
					console.log(custInfo);
		    		$http
		    			.get(`http://localhost:5000/api/Customer?CustUserName=${custInfo.customerAlias}`)
		    			.then(
		    				response => {
		    					console.log(response);
		    					let customer = response.data[0];
		    					console.log("Customer already exists: ", customer);
		    					// authFactory.setUser(customer)
		    					$location.path("/main");
		    				},
		    				response => console.log("Could not find that Customer", response)
		    			)
				},
				error => reject(error)
				)
			})
		}
		return personalInfo;
	}
]);