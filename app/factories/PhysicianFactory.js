"use strict"

BMH.factory("physicianFactory", [
	'$q',
	'$http',
	'authFactory',
	'$routeParams',
	'$location',
	'$route',

	function($q, $http, authFactory, $routeParams, $location, $route) {
		let physician = {};

		physician.getPhysician = () => {
			let cust = authFactory.getUser();
			let token = authFactory.getUserToken();
			if (cust == null && token == null) {
				return $q((resolve, reject) => {
					$http.
						get(`http://localhost:5000/api/Physician?custUserName=${$routeParams.CustUserName}`)
					.success(
					custPhysician => {
						resolve(custPhysician);
					},
					error => {
						reject(error);
					})
				})
			}
			else {
				return $q((resolve, reject) => {
					$http.
						get(`http://localhost:5000/api/Physician?id=${cust.CustomerId}&token=${token}`)
				.success(
					custPhysician => {
						resolve(custPhysician);
					},
					error => {
						reject(error);
					})
				})
			}

		}

		physician.createPhysician = (profile) => {
			return $q((resolve, reject) => {
				$http.
					post(`http://localhost:5000/api/Physician`, JSON.stringify(profile))
			.success(
				custPhysician => {
					resolve(custPhysician);
				},
				error => {
					reject(error);
				})
			})
		}

		physician.update = (profile) => {
			return $q((resolve, reject) => {
				$http.
					put(`http://localhost:5000/api/Physician/${profile.PhysicianId}`, JSON.stringify(profile))
			.success(
				custPhysician => {
					resolve(custPhysician);
				},
				error => {
					reject(error);
				})
			})
		}

		physician.delete = (id) => {
		return $http
			.delete(`http://localhost:5000/api/Physician/${id}`)	
		}
	return physician;
}])