"use strict";

BMH.factory('AuthFactory', [

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