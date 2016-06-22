'use strict';

BMH.controller('InsuranceCtrl', [
	'$scope',
	'insuranceFactory',
	'authFactory',
	'$route',
	'$timeout',
	'taskFactory',

	function($scope, insuranceFactory, authFactory, $route, $timeout, taskFactory) {

		$scope.insuranceList = [];
		$scope.insuranceBeingAdded = [];

		let insuranceObj = {};
		let switchVal;

		$scope.deactivate = () => {
        	taskFactory.deactivate();
        }

        $scope.change = (value) => {
			console.log("changing switch value", value)
		 	switchVal = value
		}

		$scope.removeChoice = function() {
		var lastItem = $scope.insuranceBeingAdded.length-1;
		$scope.insuranceBeingAdded.splice(lastItem);
		};

		$scope.createBlank = () => {
    		let cust = authFactory.getUser();
    		// Adding user info to insurance
			insuranceObj = {
				CustomerId: cust.CustomerId,
				ShowOnPublicView: false,
				CustUserName: cust.CustUserName
			};
			$scope.insuranceBeingAdded.unshift(insuranceObj);
			taskFactory.collapsible();			
		}		

		$scope.get = () => {
			insuranceFactory.getInsurance()
	        .then(
	        	insuranceData => {
	        		$scope.insuranceList = insuranceData.reverse();
	        		taskFactory.collapsible()
	        })
		}
		$scope.get();
		
		$scope.update = (profile) => {
			profile.ShowOnPublicView = switchVal
			insuranceFactory.update(profile)
			.then( 
			response => {
				insuranceFactory.getInsurance()
			.then(
        	insuranceData => {
        		$scope.insurance = insuranceData.reverse();
        		taskFactory.collapsible();
	        	})
			})
		}

        $scope.create = (insurance) => {
			insuranceFactory.createInsurance(insurance)
			.then( 
				response => {
				//console.log(response);
				insuranceFactory.getInsurance()
				.then(
	        	insuranceData => {
	        		$scope.insuranceList = insuranceData.reverse();
	        		taskFactory.collapsible();
	        })
			})
        }
        
		$scope.delete = (id) => {
			console.log("delete", id);
			insuranceFactory.delete(id)
			.then( 
				response => {
				console.log(response);
				insuranceFactory.getInsurance()
				.then(
	        	insuranceData => {
	        		$scope.insuranceList = insuranceData.reverse();
	        		taskFactory.collapsible();
	        })
			})
		}
	}
])