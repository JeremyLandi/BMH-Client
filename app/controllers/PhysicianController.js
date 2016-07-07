'use strict';

BMH.controller('PhysicianCtrl', [
	'$scope',
	'physicianFactory',
	'authFactory',
	'$route',
	'$timeout',
	'taskFactory',

	function($scope, physicianFactory, authFactory, $route, $timeout, taskFactory) {

		$scope.physicianList = [];
		$scope.physicianBeingAdded = [];

		let physicianObj = {};
		let switchVal;

		$scope.deactivate = () => {
        	taskFactory.deactivate();
        }

        $scope.change = (value) => {
		 	switchVal = value
		}

		$scope.removeChoice = function() {
			var lastItem = $scope.physicianBeingAdded.length-1;
			$scope.physicianBeingAdded.splice(lastItem);
		};

		$scope.createBlank = () => {
    		let cust = authFactory.getUser();
    		// Adding user info to physician
			physicianObj = {
				CustomerId: cust.CustomerId,
				ShowOnPublicView: false,
				CustUserName: cust.CustUserName
			};
			$scope.physicianBeingAdded.unshift(physicianObj);
			taskFactory.collapsible();			
		}		

		$scope.get = () => {
			physicianFactory.getPhysician()
	        .then(
	        	physicianData => {
	        		//console.log("physicianData", physicianData)
	        		// foreach(){
	        		// 	if (physicianData.ShowOnPublicView == true) {
	        		// 		$("ul").addClass("public")
	        		// 	}
	        		// }
	        		//console.log("physicianData", physicianData);
	        		$scope.physicianList = physicianData
	        		taskFactory.collapsible()
	        })
		}
		$scope.get();
		
		$scope.update = (profile) => {
			let cust = authFactory.getUser();

			profile.ShowOnPublicView = switchVal
			profile.CustUserName = cust.CustUserName

			physicianFactory.update(profile)
			.then( 
			response => {
				physicianFactory.getPhysician()
			.then(
        	physicianData => {
        		$scope.physician = physicianData.reverse();
        		taskFactory.collapsible();
	        	})
			})
		}

        $scope.create = (physician) => {
			physicianFactory.createPhysician(physician)
			.then( 
				response => {
				physicianFactory.getPhysician()
				.then(
	        	physicianData => {
	        		$scope.physicianList = physicianData.reverse();
	        		taskFactory.collapsible();
	        	})
			})
        }
        
		$scope.delete = (id) => {
			physicianFactory.delete(id)
			.then( 
				response => {
				physicianFactory.getPhysician()
				.then(
	        	physicianData => {
	        		$scope.physicianList = physicianData.reverse();
	        		taskFactory.collapsible();
	        	})
			})
		}
	}
])