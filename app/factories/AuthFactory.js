"use strict";

BMH.factory('authFactory', [

function () {
	
	let currentUser = null;
	let currentUserToken = null;

	return {
		getUser () {
			return currentUser;
		},
		setUser (user) {
			currentUser = user;
			console.log(`currentUser:`, currentUser);
		},
				getUserToken () {
			return currentUserToken;
		},
		setUserToken (userToken) {
			currentUserToken = userToken;
			console.log(`currentUserToken:`, currentUserToken);
		}
	}


}
]);