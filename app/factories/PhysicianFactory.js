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
			//console.log("cust", cust);
			let token = authFactory.getUserToken();
			return $q((resolve, reject) => {
				$http.
					get(`http://localhost:5000/api/Physician?id=${cust.CustomerId}&token=${token}`)
			.success(
				custPhysician => {
					console.log("custPhysician", custPhysician);
					resolve(custPhysician);
				},
				error => {
					reject(error);
				})
			})
		}

		physician.createPhysician = (profile) => {
			//console.log("profile", profile);
			return $q((resolve, reject) => {
				$http.
					post(`http://localhost:5000/api/Physician`, JSON.stringify(profile))
			.success(
				custPhysician => {
					//console.log("newPhysician created", custPhysician);
					resolve(custPhysician);
				},
				error => {
					reject(error);
				})
			})
		}

		physician.update = (profile) => {
			//console.log("profile", profile);
			return $q((resolve, reject) => {
				$http.
					put(`http://localhost:5000/api/Physician/${profile.PhysicianId}`, JSON.stringify(profile))
			.success(
				custPhysician => {
					console.log("Physician Updated", custPhysician);
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