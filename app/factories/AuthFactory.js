"use strict";

BMH.factory('authFactory', [
	'$q',
	'$http',
	'$location',

function ($q, $http, $location) {
	let firebaseRef = new Firebase('https://bmhistory.firebaseio.com/');
    let currentFbUser = null;
    let Authenticate = {};

	let currentUser = null;
	let currentUserToken = null;


	Authenticate.getUser = () => {
		return currentUser;
	},
	Authenticate.setUser = (user) => {
		currentUser = user;
		console.log(`currentUser:`, currentUser);
	},
	Authenticate.getUserToken = () => {
		return currentUserToken;
	},
	Authenticate.setUserToken = (userToken) => {
		currentUserToken = userToken;
	}

    Authenticate.isAuthenticated = () => {
        let authData = firebaseRef.getAuth();
        console.log(authData);
        if (!authData) {
            return false;
        } else {
            return true;
        }
    }

    Authenticate.createUser = (user, pass, CustUserName) => {
        return $q((resolve, reject) => {
            return firebaseRef.createUser({
                email: user,
                password: pass,
                custName: CustUserName               
            }, function(error, userData) {
                if (error) {
                    console.log("Error creating user:", error);                    
                } else {
                    console.log(user);
                    console.log("Successfully created user account with uid:", userData.uid);
                    
                    return resolve(userData);    
                }
            })
            
        });
    }

    Authenticate.createProfile = (CustUserName) => {
        return $q((resolve, reject) => {
            $http.post(`http://localhost:5000/api/Customer?CustUserName=${customer.CustUserName}`, customer);
        })
    }

    Authenticate.loginUser = (user, pass, CustUserName) => {
        return $q(function(resolve, reject) {
            firebaseRef.authWithPassword({
                email: user,
                password: pass
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                	$http
		    			.get(`http://localhost:5000/api/Customer?CustUserName=${CustUserName}`)
		    			.then(
		    				response => {
		    					//console.log("response", response);
		    					let customer = response.data[0];
		    					console.log("Customer already exists: ", customer);
		    					Authenticate.setUser(customer)
		    					$location.path("/main");
		    				},
		    				response => console.log("Could not find that Customer", response)
		    			)
                    console.log("Authenticated Successfully with payload", authData);
                    Authenticate.setUserToken(authData.token)
                    currentUser = authData;
                    return resolve(authData);
                }
            },
            {
            	remember: "sessionOnly"
            });
        });
    }

    Authenticate.logoutUser = () => firebaseRef.unauth();
    console.log("user logged out");
    return Authenticate;
}
]);