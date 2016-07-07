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
			let token = authFactory.getUserToken();
			if (cust == null && token == null) {
				return $q((resolve, reject) => {
					$http.
						get(`http://localhost:5000/api/CustomerMed?custUserName=${$routeParams.CustUserName}`)
					.success(
					custCustomerMed => {
						resolve(custCustomerMed);
					},
					error => {
						reject(error);
					})
				})
			}
			else {
				return $q((resolve, reject) => {
					$http.
						get(`http://localhost:5000/api/CustomerMed?id=${cust.CustomerId}&token=${token}`)
				.success(
					custCustomerMed => {
						resolve(custCustomerMed);
					},
					error => {
						reject(error);
					})
				})
			}
		}

		customerMed.createCustomerMed = (profile) => {
			return $q((resolve, reject) => {
				$http.
					post(`http://localhost:5000/api/CustomerMed`, JSON.stringify(profile))
			.success(
				customerMed => {
					resolve(customerMed);
				},
				error => {
					reject(error);
				})
			})
		}

		customerMed.update = (profile) => {
			return $q((resolve, reject) => {
				$http.
					put(`http://localhost:5000/api/customerMed/${profile.CustomerMedId}`, JSON.stringify(profile))
			.success(
				customerMed => {
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