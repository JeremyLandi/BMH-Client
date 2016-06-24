'use strict';

BMH.controller('PersonalInfoCtrl', [
	'$q',
	'$http',
	'$scope',
	'authFactory',
	'personalInfoFactory',
	'$routeParams',
	'$route',
	'$timeout',
	'taskFactory',
	'$location',

	function($q, $http, $scope, authFactory, personalInfoFactory, $routeParams, $route, $timeout, taskFactory, $location) {
		$scope.currentCustomer = [];

		$scope.routeChange = (user) => {
			$location.path(`/main/${user}`); 
		}

        $scope.get = (user) => {
			let personalInfo = authFactory.getUser()
			console.log("personalInfo", personalInfo);

			if (personalInfo == null) {
				return $q((resolve, reject) => {
					$http.
						get(`http://localhost:5000/api/Customer?CustUserName=${$routeParams.CustUserName}`)
					.success(
					personalInfo => {
						console.log("personalInfo", personalInfo);
						$scope.currentCustomer = personalInfo[0]
						resolve(personalInfo);
					},
					error => {
						reject(error);
					})
				})
			}
			else{

				if (personalInfo.BirthDate == null) {
					console.log("no birthdate")	
					$scope.currentCustomer = personalInfo
				}	
				else
				{
					//console.log("personalInfo", personalInfo.BirthDate.split("/"));
					var dateConverter = personalInfo.BirthDate.split("/")
					
					personalInfo.year = dateConverter[2];
					personalInfo.month = dateConverter[0];
					personalInfo.date = dateConverter[1];
				}
				$scope.currentCustomer = personalInfo
				console.log("$scope.currentCustomer", $scope.currentCustomer)
				}
			}
		

			

	        // .then(
	        // 	personalInfo => {
	        // 		console.log("personalInfo", personalInfo);
					
	        // 		// taskFactory.collapsible()
	        // })
		
		$scope.get();


		
		
		//console.log($routeParams.custUserName);

		// $scope.printDiv = function(divName) {
		// 	console.log("divName", divName)
		//   var printContents = document.getElementById(divName).innerHTML;
		//   var popupWin = window.open('', '_blank', 'width=300,height=300');
		//   popupWin.document.open();
		//   popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
		//   popupWin.document.close();
		// } 
		// QR CODE	
        $('#qrcode').qrcode({
			render	: "canvas",
			width: 128,
			height: 128,
					// *** THE TEXT LINQ NEEDS TO LINK TO ANOTHER PUBLIC VIEW
			//text: `http://localhost:8080/#/main/${cust.CustUserName}`
			text: `http//nashvillesoftwareschool.com`
		});	

		$scope.update = (info) => {
			console.log("info", info);
			personalInfoFactory.update(info);
		}
	}
])