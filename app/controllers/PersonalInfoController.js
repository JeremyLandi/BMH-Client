'use strict';

BMH.controller('PersonalInfoCtrl', [
	'$scope',
	'authFactory',
	'personalInfoFactory',

	function($scope, authFactory, personalInfoFactory) {
        var cust = authFactory.getUser();
		

		// QR CODE	
        $('#qrcode').qrcode({
			render	: "canvas",
			width: 128,
			height: 128,
					// *** THE TEXT LINQ NEEDS TO LINK TO ANOTHER PUBLIC VIEW
			//text: `http://localhost:8080/#/main/${cust.CustUserName}`
			text: `http://google.com`
		});	

		console.log("cust", cust);
		if (cust.BirthDate != null) {
			console.log("cust", cust.BirthDate.split("/"));
			var dateConverter = cust.BirthDate.split("/")
			
			cust.year = dateConverter[2];
			cust.month = dateConverter[0];
			cust.date = dateConverter[1];
		}
		
		$scope.currentCustomer = cust;

		$scope.updatePersonal = (info) => {
			personalInfoFactory.updatePersonalFact(info);
		}
	}
])