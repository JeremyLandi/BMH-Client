'use strict';

BMH.controller('AllergyCtrl', [
	'$scope',
	'allergyFactory',

	function($scope, allergyFactory) {

		$scope.allergy = [];
		let hideCreate = false;

		$scope.addChoice = () => {
			console.log("new element created");
			var newItemNo = $scope.allergy.length+1;
    		$scope.allergy.unshift({'id':'choice'+newItemNo});
		}

		$scope.removeChoice = function() {
			var lastItem = $scope.choices.length-1;
			$scope.choices.splice(lastItem);
		};

		$scope.save = (profile) => {
			console.log("save", profile);
			allergyFactory.update(profile);
		}

		$scope.create = (profile) => {
			console.log("create", profile)
			allergyFactory.create(profile);
		}

		$scope.delete = (id) => {
			console.log("delete", id);
			allergyFactory.delete(id);
		}

        allergyFactory.getAllergy()
        .then(
        	allergyData => {
        		if (allergyData) {
					hideCreate = true;
				}
        		$scope.allergy = allergyData
        })
	}
])