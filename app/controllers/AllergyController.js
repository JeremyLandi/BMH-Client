'use strict';

BMH.controller('PersonalInfoCtrl', [
	'$scope',
	'AuthFactory',

	function($scope, authFactory) {
       
		$scope.currentCustomer = [];

		var cust = authFactory.getUser()

		$scope.currentCustomer = cust;

		console.log("cust", $scope.currentCustomer);
		// var day = date.getDay();        // yields day
		// var month = date.getMonth();    // yields month
		// var year = date.getFullYear();  // yields year
		
		$scope.saveEdit = () => {
			
		}
		//DateTime.ParseExact(YourString, "dd/MM/yyyy");
		// console.log("something", something);
		// .then(
		// 	cust => {
		// 		console.log("currentCustomer", cust)
		// 		// for( let key in cust) {
		// 		// 	cust[key].id = key;
		// 		// 	$scope.currentCustomer.push(cust[key]);
		// 		// }
		// 		$scope.currentCustomer.push(cust);

		// 		console.log("$scope.currentCustomer", $scope.currentCustomer);
		// 	}
		// )
	}
])