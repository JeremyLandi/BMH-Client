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

			if (personalInfo == null) {
				return $q((resolve, reject) => {
					$http.
						get(`http://localhost:5000/api/Customer?CustUserName=${$routeParams.CustUserName}`)
					.success(
					personalInfo => {
						$scope.currentCustomer = personalInfo[0]
						resolve(personalInfo);
					},
					error => {
						reject(error);
					})
				})
			}
			else
			{
				if (personalInfo.BirthDate == null) {
					$scope.currentCustomer = personalInfo
				}	
				else
				{
					var dateConverter = personalInfo.BirthDate.split("/")
					
					personalInfo.year = dateConverter[2];
					personalInfo.month = dateConverter[0];
					personalInfo.date = dateConverter[1];
				}
				$scope.currentCustomer = personalInfo
			}
		}
		
		$scope.get();

		// QR CODE	
        $('#qrcode').qrcode({
			render: "canvas",
			width: 128,
			height: 128,
					// *** THE TEXT LINQ NEEDS TO LINK TO ANOTHER PUBLIC VIEW
			//text: `http://localhost:8080/#/main/${cust.CustUserName}`
			text: `http://107.170.58.49/`
		});	

		$scope.update = (info) => {
			console.log("info", info);
			personalInfoFactory.update(info);
		}
	}
])