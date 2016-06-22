'use strict';

BMH.controller('EmContactCtrl', [
	'$scope',
	'emContactFactory',
	'authFactory',
	'$route',
	'$timeout',
	'taskFactory',

	function($scope, emContactFactory, authFactory, $route, $timeout, taskFactory) {

		$scope.emContactList = [];
		$scope.emContactBeingAdded = [];

		let emContactObj = {};

		$scope.deactivate = () => {
        	taskFactory.deactivate();
        }

		$scope.removeChoice = function() {
		var lastItem = $scope.emContactBeingAdded.length-1;
		$scope.emContactBeingAdded.splice(lastItem);
		};

		$scope.createBlank = () => {
    		let cust = authFactory.getUser();
    		// Adding user info to emContact
			emContactObj = {
				CustomerId: cust.CustomerId,
				ShowOnPublicView: false,
				CustUserName: cust.CustUserName
			};
			$scope.emContactBeingAdded.unshift(emContactObj);
			taskFactory.collapsible();			
		}

		$scope.get = () => {
			emContactFactory.getEmContact()
	        .then(
	        	emContactData => {
	        		$scope.emContactList = emContactData.reverse();
	        		taskFactory.collapsible()
	        })
		}
		$scope.get();

		$scope.update = (profile) => {
			console.log("updateProfile", profile)
			emContactFactory.update(profile)
		.then( 
			response => {
				emContactFactory.getEmContact()
			.then(
        	emContactData => {
        		$scope.emContact = emContactData.reverse();
        		taskFactory.collapsible()
	        	})
			})
		}

        $scope.create = (emContact) => {
    		//console.log("emContact",emContact)
			emContactFactory.createEmContact(emContact)
			.then( 
				response => {
				//console.log(response);
				emContactFactory.getEmContact()
				.then(
	        	emContactData => {
	        		$scope.emContactList = emContactData.reverse();
	        		taskFactory.collapsible();
	        });
			})
        }
        
		$scope.delete = (id) => {
			console.log("delete", id);
			emContactFactory.delete(id)
			.then( 
				response => {
				console.log(response);
				emContactFactory.getEmContact()
				.then(
	        	emContactData => {
	        		$scope.emContactList = emContactData.reverse();
	        		taskFactory.collapsible();
	        });
				
			})
		}
	}
])