"use strict"

BMH.factory("medicalConditionFactory", [
	'$q',
	'$http',
	'authFactory',
	'$routeParams',
	'$location',
	'$route',

	function($q, $http, authFactory, $routeParams, $location, $route) {
		let medicalCondition = {};

		medicalCondition.getMedicalCondition = () => {
			let cust = authFactory.getUser();
			let token = authFactory.getUserToken();
						if (cust == null && token == null) {
				return $q((resolve, reject) => {
					$http.
						get(`http://localhost:5000/api/MedicalCondition?custUserName=${$routeParams.CustUserName}`)
					.success(
					custMedicalCondition => {
						console.log("custMedicalCondition", custMedicalCondition);
						resolve(custMedicalCondition);
					},
					error => {
						reject(error);
					})
				})
			}
			else {
				return $q((resolve, reject) => {
					$http.
						get(`http://localhost:5000/api/MedicalCondition?id=${cust.CustomerId}&token=${token}`)
				.success(
					custMedicalCondition => {
						console.log("custMedicalCondition", custMedicalCondition);
						resolve(custMedicalCondition);
					},
					error => {
						reject(error);
					})
				})
			}
		}

		medicalCondition.createMedicalCondition = (profile) => {
			console.log("profile", profile);
			return $q((resolve, reject) => {
				$http.
					post(`http://localhost:5000/api/MedicalCondition`, JSON.stringify(profile))
			.success(
				custMedicalCondition => {
					console.log("newMedicalCondition created", custMedicalCondition);
					resolve(custMedicalCondition);
				},
				error => {
					reject(error);
				})
			})
		}

		medicalCondition.update = (profile) => {
			console.log("profile", profile);
			return $q((resolve, reject) => {
				$http.
					put(`http://localhost:5000/api/MedicalCondition/${profile.MedicalConditionId}`, JSON.stringify(profile))
			.success(
				custMedicalCondition => {
					console.log("MedicalCondition Updated", custMedicalCondition);
					resolve(custMedicalCondition);
				},
				error => {
					reject(error);
				})
			})
		}

		medicalCondition.delete = (id) => {
		return $http
			.delete(`http://localhost:5000/api/MedicalCondition/${id}`)	
		}

	return medicalCondition;
}])