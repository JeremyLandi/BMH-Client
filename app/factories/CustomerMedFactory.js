"use strict"

BMH.factory("customerMedFactory", [
	'$q',
	'$http',
	'authFactory',
	'$routeParams',
	'$location',
	'$route',

	function($q, $http, authFactory, $routeParams, $location, $route) {
		let customerMed = {};

		customerMed.getCustomerMed = () => {
			let cust = authFactory.getUser();
			console.log("cust", cust);
			let token = authFactory.getUserToken();
			return $q((resolve, reject) => {
				$http.
					get(`http://localhost:5000/api/CustomerMed?id=${cust.CustomerId}&token=${token}`)
			.success(
				customerMed => {
					console.log("customerMed", customerMed);
					resolve(customerMed);
				},
				error => {
					reject(error);
				})
			})
		}

		customerMed.createCustomerMed = (profile) => {
			//console.log("profile", profile);
			return $q((resolve, reject) => {
				$http.
					post(`http://localhost:5000/api/CustomerMed`, JSON.stringify(profile))
			.success(
				customerMed => {
					//console.log("newcustomerMed created", customerMed);
					resolve(customerMed);
				},
				error => {
					reject(error);
				})
			})
		}

		customerMed.update = (profile) => {
			//console.log("profile", profile);
			return $q((resolve, reject) => {
				$http.
					put(`http://localhost:5000/api/customerMed/${profile.CustomerMedId}`, JSON.stringify(profile))
			.success(
				customerMed => {
					console.log("customerMed Updated", customerMed);
					resolve(customerMed);
				},
				error => {
					reject(error);
				})
			})
		}

		customerMed.delete = (id) => {
		return $http
			.delete(`http://localhost:5000/api/customerMed/${id}`)	
		}
	return customerMed;
}])