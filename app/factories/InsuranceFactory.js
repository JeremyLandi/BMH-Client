"use strict"

BMH.factory("insuranceFactory", [
	'$q',
	'$http',
	'authFactory',
	'$routeParams',
	'$location',
	'$route',

	function($q, $http, authFactory, $routeParams, $location, $route) {
		let insurance = {};

		insurance.getInsurance = () => {
			let cust = authFactory.getUser();
			let token = authFactory.getUserToken();
			if (cust == null && token == null) {
				return $q((resolve, reject) => {
					$http.
						get(`http://localhost:5000/api/Insurance?custUserName=${$routeParams.CustUserName}`)
					.success(
					custInsurance => {
						console.log("custInsurance", custInsurance);
						resolve(custInsurance);
					},
					error => {
						reject(error);
					})
				})
			}
			else {
				return $q((resolve, reject) => {
					$http.
						get(`http://localhost:5000/api/Insurance?id=${cust.CustomerId}&token=${token}`)
				.success(
					custInsurance => {
						console.log("custInsurance", custInsurance);
						resolve(custInsurance);
					},
					error => {
						reject(error);
					})
				})
			}
		}

		insurance.createInsurance = (profile) => {
			console.log("profile", profile);
			return $q((resolve, reject) => {
				$http.
					post(`http://localhost:5000/api/Insurance`, JSON.stringify(profile))
			.success(
				custInsurance => {
					console.log("newInsurance created", custInsurance);
					resolve(custInsurance);
				},
				error => {
					reject(error);
				})
			})
		}

		insurance.update = (profile) => {
			console.log("profile", profile);
			return $q((resolve, reject) => {
				$http.
					put(`http://localhost:5000/api/Insurance/${profile.InsuranceId}`, JSON.stringify(profile))
			.success(
				custInsurance => {
					console.log("Insurance Updated", custInsurance);
					resolve(custInsurance);
				},
				error => {
					reject(error);
				})
			})
		}

		insurance.delete = (id) => {
		return $http
			.delete(`http://localhost:5000/api/Insurance/${id}`)	
		}

	return insurance;
}])