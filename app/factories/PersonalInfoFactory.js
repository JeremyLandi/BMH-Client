"use strict";

BMH.factory("personalInfoFactory", [
	'$q',
	'$http',
	'authFactory',
	'$routeParams',
	'$location',

	function($q, $http, authFactory, $routeParams, $location ) {
		
	let personalInfo = {};
			// personalInfo.getPersonalInfo = () => {
			// 	let cust = authFactory.getUser();
			// 	// let token = authFactory.getUserToken();
			// 	console.log("cust", cust);
				// $scope.personalInfo = cust;

			// if (cust == null && token == null) {
				// return $q((resolve, reject) => {
				// 	$http.
				// 		get(`http://localhost:5000/api/Customer?custUserName=${cust.CustUserName}`)
				// 	.success(
				// 	custPersonalInfo => {
				// 		console.log("cust.PersonalInfo", cust.PersonalInfo);
				// 		$scope.personalInfo = cust;
				// 		resolve(cust.PersonalInfo);
				// 	},
				// 	error => {
				// 		reject(error);
				// 	})
				// })
			// }
			// else {
			// 	return $q((resolve, reject) => {
			// 		$http.
			// 			get(`http://localhost:5000/api/Customer?id=${cust.CustomerId}&token=${token}`)
			// 	.success(
			// 		custPersonalInfo => {
			// 			console.log("custPersonalInfo", custPersonalInfo);
			// 			resolve(custPersonalInfo);
			// 		},
			// 		error => {
			// 			reject(error);
			// 		})
			// 	})
			// }

		// }

		personalInfo.createPersonalInfo = (profile) => {
			//console.log("profile", profile);
			return $q((resolve, reject) => {
				$http.
					post(`http://localhost:5000/api/Customer`, JSON.stringify(profile))
			.success(
				custPersonalInfo => {
					//console.log("newPersonalInfo created", custPersonalInfo);
					resolve(custPersonalInfo);
				},
				error => {
					reject(error);
				})
			})
		}

		personalInfo.update = (profile) => {
			//console.log("profile", profile);
			return $q((resolve, reject) => {
				$http.
					put(`http://localhost:5000/api/Customer/${profile.CustomerId}`, JSON.stringify(profile))
			.success(
				custPersonalInfo => {
					//console.log("PersonalInfo Updated", custPersonalInfo);
					resolve(custPersonalInfo);
				},
				error => {
					reject(error);
				})
			})
		}

		// personalInfo.delete = (id) => {
		// return $http
		// 	.delete(`http://localhost:5000/api/Customer/${id}`)	
		// }
	return personalInfo;
}])
	// 	personalInfo.updatePersonalFact = (custInfo) => {
	// 		for (let item in custInfo) {
	// 			custInfo.item = item.toLowerCase();
	// 		}

	// 		// Date converter
	// 		custInfo.BirthDate = (`${custInfo.month}/${custInfo.date}/${custInfo.year}`)

	// 		// console.log("custInfo.BirthDate", custInfo.BirthDate);
	// 		console.log("cust ID", custInfo.CustomerId);
	// 		return $q((resolve, reject) => {
	// 			$http.put(`http://localhost:5000/api/Customer/${custInfo.CustomerId}`, JSON.stringify(custInfo))
	// 		.success(
	// 			resolve => {
	// 				console.log(custInfo);
	// 	    		$http
	// 	    			.get(`http://localhost:5000/api/Customer?CustUserName=${custInfo.customerAlias}`)
	// 	    			.then(
	// 	    				response => {
	// 	    					console.log(response);
	// 	    					let customer = response.data[0];
	// 	    					console.log("Customer already exists: ", customer);
	// 	    					// authFactory.setUser(customer)
	// 	    					$location.path("/main");
	// 	    				},
	// 	    				response => console.log("Could not find that Customer", response)
	// 	    			)
	// 			},
	// 			error => reject(error)
	// 			)
	// 		})
	// 	}
	// 	return personalInfo;
	// }
// ]);