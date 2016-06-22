'use strict';

BMH.controller('AllergyCtrl', [
	'$scope',
	'allergyFactory',
	'authFactory',
	'$route',
	'$timeout',
	'taskFactory',

	function($scope, allergyFactory, authFactory, $route, $timeout, taskFactory) {

		$scope.allergyList = [];
		$scope.allergyBeingAdded = [];

		let allergyObj = {};
		let switchVal;

		$scope.deactivate = () => {
        	taskFactory.deactivate();
        }

        $scope.change = (value) => {
		 	switchVal = value
		}

		$scope.removeChoice = function() {
		var lastItem = $scope.allergyBeingAdded.length-1;
		$scope.allergyBeingAdded.splice(lastItem);
		};

		$scope.createBlank = () => {
    		let cust = authFactory.getUser();
    		// Adding user info to allergy
			allergyObj = {
				CustomerId: cust.CustomerId,
				ShowOnPublicView: false,
				CustUserName: cust.CustUserName
			};
			$scope.allergyBeingAdded.unshift(allergyObj);
			taskFactory.collapsible();			
		}

		$scope.get = () => {
			allergyFactory.getAllergy()
	        .then(
	        	allergyData => {
	        		$scope.allergyList = allergyData.reverse();
	        		taskFactory.collapsible()
	        })
		}
		$scope.get();

		$scope.update = (profile) => {
			profile.ShowOnPublicView = switchVal
			allergyFactory.update(profile)
			.then( 
			response => {
				allergyFactory.getAllergy()
			.then(
        	allergyData => {
        		$scope.allergy = allergyData.reverse();
        		taskFactory.collapsible()
	        	})
			})
		}

        $scope.create = (allergy) => {
    		//console.log("allergy",allergy)
			allergyFactory.createAllergy(allergy)
			.then( 
				response => {
				//console.log(response);
				allergyFactory.getAllergy()
				.then(
	        	allergyData => {
	        		$scope.allergyList = allergyData.reverse();
	        		taskFactory.collapsible();
	        });
			})
        }
        
		$scope.delete = (id) => {
			console.log("delete", id);
			allergyFactory.delete(id)
			.then( 
				response => {
				console.log(response);
				allergyFactory.getAllergy()
				.then(
	        	allergyData => {
	        		$scope.allergyList = allergyData.reverse();
	        		taskFactory.collapsible();
	        });
			})
		}
	}
])