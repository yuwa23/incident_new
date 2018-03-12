var scotchTodo = angular.module('scotchTodo', []);


(function() {
    'use strict';
    //var myApp = angular.module('app');

    /*
     A directive to enable two way binding of file field
     */
    scotchTodo.directive('demoFileModel', function ($parse) {
        return {
            restrict: 'A', //the directive can be used as an attribute only

            /*
             link is a function that defines functionality of directive
             scope: scope associated with the element
             element: element on which this directive used
             attrs: key value pair of element attributes
             */
            link: function (scope, element, attrs) {
                var model = $parse(attrs.demoFileModel),
                    modelSetter = model.assign; //define a setter for demoFileModel

                //Bind change event on the element
                element.bind('change', function () {
                    //Call apply on scope, it checks for value changes and reflect them on UI
                    scope.$apply(function () {
                        //set the model value
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    });
})();

(function () {
    'use strict';
    //var myApp = angular.module('app');
    scotchTodo.service('fileUploadService', function ($http, $q) {
        this.uploadFileToUrl = function (file, uploadUrl) {
            //FormData, object of key/value pair for form fields and values
            var fileFormData = new FormData();
            fileFormData.append('file', file);

            var deffered = $q.defer();
            $http.post(uploadUrl, fileFormData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}

            }).success(function (response) {
                deffered.resolve(response);

            }).error(function (response) {
                deffered.reject(response);
            });

            return deffered.promise;
        }
    });
})();

function mainController($scope, $http, fileUploadService) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('/api/users')
		.success(function(data) {
			$scope.todos = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
	   });
		
		
	$scope.load = function() {
		$http.get('/api/users')
		.success(function(data) {
			$scope.todos = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	}	
		
	
	$scope.uploadFile = function() {
		 var file = $scope.myFile;
            var uploadUrl = "/api/users", //Url of webservice/api/server
                promise = fileUploadService.uploadFileToUrl(file, uploadUrl);

            promise.then(function (response) {
				$scope.load();
                $scope.serverResponse = response;
            }, function () {
                $scope.serverResponse = 'An error has occurred';
            })
	};

	// delete a todo after checking it
	$scope.getmalereport = function() {
		$http.get('/api/reports/male')
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	
	$scope.getfemalereport = function() {
		$http.get('/api/reports/female')
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	 

}
