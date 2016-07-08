"use strict";

BMH.factory('authFactory', [
	'$q',
	'$http',
	'$location',
    '$route',
    '$timeout',

function ($q, $http, $location, $route, $timeout) {
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
	},
	Authenticate.getUserToken = () => {
		return currentUserToken;
	},
	Authenticate.setUserToken = (userToken) => {
		currentUserToken = userToken;
	}

    Authenticate.isAuthenticated = () => {
        let authData = firebaseRef.getAuth();
        if (!authData) {
            return false;
        } else {
            return true;
        }
    }

    //creates firebase authorized user
    Authenticate.createUser = (user, pass) => {
        return $q((resolve, reject) => {
            return firebaseRef.createUser({
                email: user,
                password: pass             
            }, function(error, userData) {
                if (error) {
                    console.log("Error creating user:", error);                    
                } else {
                    return resolve(userData);    
                }
            })
        });
    }

    //creates user in my database
    Authenticate.createProfile = (customer) => {
        return $q((resolve, reject) => {
            $http.post(`http://localhost:5000/api/Customer?email=${customer.CustEmail}`, customer);
        })
    }

    Authenticate.loginUser = (userEmail, pass) => {
        return $q(function(resolve, reject) {
            firebaseRef.authWithPassword({
                email: userEmail,
                password: pass
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                	$http
		    			.get(`http://localhost:5000/api/Customer?email=${userEmail}`)
		    			.then(
		    				response => {
		    					let customer = response.data[0];
		    					Authenticate.setUserToken(authData.token)
		    					Authenticate.setUser(customer)
		    					$location.path("/main");  
		    				},
		    				response => console.log("Could not find that Customer", response)
		    			)
                    console.log("Authenticated Successfully with payload", authData);
                    
                    return resolve(authData);
                }
            },
            {
            	remember: "sessionOnly"
            });
        });
    }

    Authenticate.logoutUser = () => {
        console.log("logout")
        firebaseRef.unauth();
        $timeout(function() {$location.path("/")});
        //$route.reload();
    }
    return Authenticate;
}]);