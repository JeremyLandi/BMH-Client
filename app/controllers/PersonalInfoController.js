'use strict';

BMH.controller('PersonalInfoCtrl', [
	'$scope',
	'authFactory',
	'personalInfoFactory',

	function($scope, authFactory, personalInfoFactory) {
        var cust = authFactory.getUser();
		
		console.log("cust", cust);
		if (cust.BirthDate != null) {
			console.log("cust", cust.BirthDate.split("/"));
			var dateConverter = cust.BirthDate.split("/")
			
			cust.year = dateConverter[2];
			cust.month = dateConverter[0];
			cust.date = dateConverter[1];
		}
		

		$scope.currentCustomer = cust;
		// $scope.currentCustomer = [
		// 	CustFirst = cust.CustFirst,
		// 	CustLast = cust.CustLast,
		// 	CustUserName = cust.CustUserName,
		// 	CustAddress = cust.CustAddress,
		// 	CustCity = cust.CustCity,
		// 	CustState = cust.CustState,
		// 	CustPhone = cust.CustPhone,
		// 	CustEmail = cust.CustEmail,
		// 	BloodType = cust.BloodType,
		// 	year =  dateConverter[2],
		// 	month = dateConverter[0],
		// 	date = dateConverter[1],
		// 	Gender =  cust.Gender,
		// 	Hair = cust.Hair,
		// 	EyeColor =  cust.EyeColor,
		// 	Height = cust.Height,
		// 	Weight =  cust.Weight
		// ];
		
		//DateTime.ParseExact(YourString, "dd/MM/yyyy");

		$scope.updatePersonal = (info) => {
			personalInfoFactory.updatePersonalFact(info);
		}
	}
])