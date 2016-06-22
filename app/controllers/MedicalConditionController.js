'use strict';

BMH.controller('MedicalConditionCtrl', [
	'$scope',
	'medicalConditionFactory',
	'authFactory',
	'$route',
	'$timeout',
	'taskFactory',

	function($scope, medicalConditionFactory, authFactory, $route, $timeout, taskFactory) {

		$scope.medicalConditionList = [];
		$scope.medicalConditionBeingAdded = [];

		let medicalConditionObj = {};
		let switchVal;

		$scope.deactivate = () => {
        	taskFactory.deactivate();
        }

        $scope.change = (value) => {
		 	console.log("changing switch value", value)
		 	switchVal = value
		}

		$scope.removeChoice = function() {
		var lastItem = $scope.medicalConditionBeingAdded.length-1;
		$scope.medicalConditionBeingAdded.splice(lastItem);
		};

		$scope.createBlank = () => {
    		let cust = authFactory.getUser();
    		// Adding user info to medicalCondition
			medicalConditionObj = {
				CustomerId: cust.CustomerId,
				ShowOnPublicView: false,
				CustUserName: cust.CustUserName
			};
			$scope.medicalConditionBeingAdded.unshift(medicalConditionObj);
			taskFactory.collapsible();			
		}

		$scope.get = () => {
			medicalConditionFactory.getMedicalCondition()
	        .then(
	        	medicalConditionData => {
	        		$scope.medicalConditionList = medicalConditionData.reverse();
	        		taskFactory.collapsible()
	        })
		}
		$scope.get();

		$scope.update = (profile) => {
			console.log("profile.ShowOnPublicView", profile.ShowOnPublicView)
			console.log("profile", profile)
			profile.ShowOnPublicView = switchVal
			medicalConditionFactory.update(profile)
			.then( 
			response => {
				medicalConditionFactory.getMedicalCondition()
			.then(
        	medicalConditionData => {
        		console.log("medicalConditionData", medicalConditionData);
        		$scope.medicalCondition = medicalConditionData.reverse();
        		taskFactory.collapsible()
	        	})
			})
		}

        $scope.create = (medicalCondition) => {
    		//console.log("medicalCondition",medicalCondition)
			medicalConditionFactory.createMedicalCondition(medicalCondition)
			.then( 
				response => {
				//console.log(response);
				medicalConditionFactory.getMedicalCondition()
				.then(
	        	medicalConditionData => {
	        		$scope.medicalConditionList = medicalConditionData.reverse();
	        		taskFactory.collapsible();
	        });
			})
        }
        
		$scope.delete = (id) => {
			console.log("delete", id);
			medicalConditionFactory.delete(id)
			.then( 
				response => {
				console.log(response);
				medicalConditionFactory.getMedicalCondition()
				.then(
	        	medicalConditionData => {
	        		$scope.medicalConditionList = medicalConditionData.reverse();
	        		taskFactory.collapsible();
	        });
			})
		}
	}
])