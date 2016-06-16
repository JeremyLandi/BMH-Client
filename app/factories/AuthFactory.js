"use strict";

BMH.factory('authFactory', [

function () {
	
	let currentUser = null;

	return {
		getUser () {
			return currentUser;
		},
		setUser (user) {
			currentUser = user;
			console.log(`currentUser:`, currentUser);
		}
	}
}
]);