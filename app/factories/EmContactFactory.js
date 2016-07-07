"use strict"

BMH.factory("emContactFactory", [
	'$q',
	'$http',
	'authFactory',
	'$routeParams',
	'$location',
	'$route',

	function($q, $http, authFactory, $routeParams, $location, $route) {
		let emContact = {};

		emContact.getEmContact = () => {
			let cust = authFactory.getUser();
			let token = authFactory.getUserToken();
			if (cust == null && token == null) {
				return $q((resolve, reject) => {
					$http.
						get(`http://localhost:5000/api/EmContact?custUserName=${$routeParams.CustUserName}`)
					.success(
					custEmContact => {
						resolve(custEmContact);
					},
					error => {
						reject(error);
					})
				})
			}
			else {
				return $q((resolve, reject) => {
					$http.
						get(`http://localhost:5000/api/EmContact?id=${cust.CustomerId}&token=${token}`)
				.success(
					custEmContact => {
						resolve(custEmContact);
					},
					error => {
						reject(error);
					})
				})
			}
		}

		emContact.createEmContact = (profile) => {
			return $q((resolve, reject) => {
				$http.
					post(`http://localhost:5000/api/EmContact`, JSON.stringify(profile))
			.success(
				custEmContact => {
					resolve(custEmContact);
				},
				error => {
					reject(error);
				})
			})
		}

		emContact.update = (profile) => {
			return $q((resolve, reject) => {
				$http.
					put(`http://localhost:5000/api/EmContact/${profile.EmContactId}`, JSON.stringify(profile))
			.success(
				custAllergies => {
					resolve(custAllergies);
				},
				error => {
					reject(error);
				})
			})
		}

		emContact.delete = (id) => {
		return $http
			.delete(`http://localhost:5000/api/EmContact/${id}`)	
		}
	return emContact;
}])