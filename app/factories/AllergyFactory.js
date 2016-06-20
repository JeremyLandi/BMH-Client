"use strict"

BMH.factory("allergyFactory", [
	'$q',
	'$http',
	'authFactory',
	'$routeParams',
	'$location',

	function($q, $http, authFactory, $routeParams, $location) {
		let allergy = {};
		let cust = authFactory.getUser();
		let token = authFactory.getUserToken();
		
		console.log	("cust", cust);
		console.log	("token", token);

		allergy.getAllergy = () => {
			return $q((resolve, reject) => {
				$http.
					get(`http://localhost:5000/api/Allergy?id=${cust.CustomerId}&token=${token}`)
			.success(
				custAllergies => {
					console.log("custAllergies", custAllergies);
					resolve(custAllergies);
				},
				error => {
					reject(error);
				})
			})
		}

		allergy.create = (profile) => {
			console.log("profile", profile);
			return $q((resolve, reject) => {
				$http.
					post(`http://localhost:5000/api/Allergy`, JSON.stringify(profile))
			.success(
				custAllergies => {
					console.log("custAllergies", custAllergies);
					resolve(custAllergies);
				},
				error => {
					reject(error);
				})
			})
		}

		allergy.createBlank = (profile) => {
			console.log("profile", profile);
			return $q((resolve, reject) => {
				$http.
					post(`http://localhost:5000/api/Allergy`, JSON.stringify(profile))
			.success(
				custAllergies => {
					console.log("custAllergies", custAllergies);
					resolve(custAllergies);
				},
				error => {
					reject(error);
				})
			})
		}

		allergy.update = (profile) => {
			return $q((resolve, reject) => {
				$http.
					put(`http://localhost:5000/api/Allergy/${profile.AllergyId}`, JSON.stringify(profile))
			.success(
				custAllergies => {
					console.log("custAllergies", custAllergies);
					resolve(custAllergies);
				},
				error => {
					reject(error);
				})
			})
		}

		allergy.delete = (id) => $http
			.delete(`http://localhost:5000/api/Allergy/${id}`)
			.then( () => {
				$route.reload();
		})

	return allergy;
}])