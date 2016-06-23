'use strict';

BMH.controller('CustomerMedCtrl', [
	'$scope',
	'customerMedFactory',
	'authFactory',
	'$route',
	'$timeout',
	'taskFactory',

	function($scope, customerMedFactory, authFactory, $route, $timeout, taskFactory) {

		$scope.customerMedList = [];
		$scope.customerMedBeingAdded = [];

		let customerMedObj = {};
		let switchVal;

		$scope.deactivate = () => {
        	taskFactory.deactivate();
        }

        $scope.change = (value) => {
			console.log("changing switch value", value)
		 	switchVal = value
		}

		$scope.removeChoice = function() {
		var lastItem = $scope.customerMedBeingAdded.length-1;
		$scope.customerMedBeingAdded.splice(lastItem);
		};

		$scope.createBlank = () => {
    		let cust = authFactory.getUser();
    		//console.log("cust", cust);
    		// Adding user info to customerMed
			customerMedObj = {
				CustomerId: cust.CustomerId,
				ShowOnPublicView: false,
				CustUserName: cust.CustUserName
			};
			$scope.customerMedBeingAdded.unshift(customerMedObj);
			taskFactory.collapsible();			
		}		

		$scope.get = () => {
			customerMedFactory.getCustomerMed()
	        .then(
	        	customerMedData => {
	        		//console.log("customerMedData", customerMedData);
	        		$scope.customerMedList = customerMedData
	        		taskFactory.collapsible()
	        })
		}
		$scope.get();
		
		$scope.update = (profile) => {
			let cust = authFactory.getUser();
			profile.ShowOnPublicView = switchVal
			//console.log("profile", profile);
			profile.CustUserName = cust.CustUserName
			customerMedFactory.update(profile)
			.then( 
			response => {
				customerMedFactory.getCustomerMed()
			.then(
        	customerMedData => {
        		$scope.customerMed = customerMedData.reverse();
        		taskFactory.collapsible();
	        	})
			})
		}

        $scope.create = (customerMed) => {
			customerMedFactory.createCustomerMed(customerMed)
			.then( 
				response => {
				//console.log(response);
				customerMedFactory.getCustomerMed()
				.then(
	        	customerMedData => {
	        		$scope.customerMedList = customerMedData.reverse();
	        		taskFactory.collapsible();
	        })
			})
        }
        
		$scope.delete = (id) => {
			console.log("delete", id);
			customerMedFactory.delete(id)
			.then( 
				response => {
				console.log(response);
				customerMedFactory.getCustomerMed()
				.then(
	        	customerMedData => {
	        		$scope.customerMedList = customerMedData.reverse();
	        		taskFactory.collapsible();
	        })
			})
		}
	}
])