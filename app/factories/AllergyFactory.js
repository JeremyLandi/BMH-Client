"use strict"

BMH.factory("allergyFactory", [
	'$q',
	'$http',
	'authFactory',
	'$routeParams',
	'$location',
	'$route',

	function($q, $http, authFactory, $routeParams, $location, $route) {
		let allergy = {};

		allergy.getAllergy = () => {
			let cust = authFactory.getUser();
			let token = authFactory.getUserToken();
			if (cust == null && token == null) {
				return $q((resolve, reject) => {
					$http.
						get(`http://localhost:5000/api/Allergy?custUserName=${$routeParams.CustUserName}`)
					.success(
					custAllergy => {
						console.log("custAllergy", custAllergy);
						resolve(custAllergy);
					},
					error => {
						reject(error);
					})
				})
			}
			else {
				return $q((resolve, reject) => {
					$http.
						get(`http://localhost:5000/api/Allergy?id=${cust.CustomerId}&token=${token}`)
				.success(
					custAllergy => {
						console.log("custAllergy", custAllergy);
						resolve(custAllergy);
					},
					error => {
						reject(error);
					})
				})
			}
		}

		allergy.createAllergy = (profile) => {
			// console.log("profile", profile);
			return $q((resolve, reject) => {
				$http.
					post(`http://localhost:5000/api/Allergy`, JSON.stringify(profile))
			.success(
				custAllergies => {
					// console.log("newAllergy created", custAllergies);
					resolve(custAllergies);
				},
				error => {
					reject(error);
				})
			})
		}

		allergy.update = (profile) => {
			// console.log("profile", profile);
			return $q((resolve, reject) => {
				$http.
					put(`http://localhost:5000/api/Allergy/${profile.AllergyId}`, JSON.stringify(profile))
			.success(
				custAllergies => {
					// console.log("Allergy Updated", custAllergies);
					resolve(custAllergies);
				},
				error => {
					reject(error);
				})
			})
		}

		allergy.delete = (id) => {
		return $http
			.delete(`http://localhost:5000/api/Allergy/${id}`)	
		}

	return allergy;
}])