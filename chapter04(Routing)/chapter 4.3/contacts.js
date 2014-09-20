/**
 * contacts App
 * 		<br/> contains routing and controllers to list contacts and edit them 
 * 		
 * @author ahmed hamdy <ahmedhamdy20@gmail.com>		
 */
angular.module("contactsApp",['ngRoute'])
	/**
	 * configure the routes for contacts App
	 * 
	 * @param  $routeProvider routing use Dependency Injection to inject $routeProvider object
	 */
	.config(['$routeProvider',function($routeProvider) {

		$routeProvider
			/**
			 * index route to list contacts
			 */
			.when("/",{

				templateUrl : 'list.html'

			})
			/**
			 * edit route to edit an existing Person contact
			 */
			.when("/contacts/:index",{

				templateUrl : 'edit.html',
				controller  : 'EditCtrl'
			})
			/**
			 * add route to add a new contact to people contacts
			 */
			.when("/add",{

				templateUrl : 'edit.html',
				controller : 'AddCtrl' 
			})
			/**
			 * delete route to delete an Existing 
			 */
			.when("/delete/:index",{

				templateUrl : 'edit.html',
				controller : 'DeleteCtrl' 
			})
			/**
			 * use oterwise to force any route not belong to above routes to redirect to Home route
			 */
			.otherwise({

				redirectTo : "/"
			});
	}])
	/**
	 * Contacts Controller 
	 * 		<br/> contactsCtrl work as perent controller for all childreen controller
	 * 			  so people veriable will see into all controller
	 * 		
	 * @param  $rootScopeProvider $scope use Dependency Injection to inject $rootScopeProvider object
	 */
	.controller('ContactsCtrl', ['$scope', function($scope){
		
		/**
		 * People Contacts 
		 * @type Array
		 */
		$scope.people = [		
			{name : "Tom Ashworth", number : "1234567890"},
			{name : "Jeffrey way",  number : "09876543421"},
			{name : "Joy Ashworth", number : "1230984756"}
		];

	}])
	/**
	 * Edit Controller
	 * 		<br/> For edit an Existing Persons in People Contacts
	 * 
	 * @param  $rootScopeProvider $scope use Dependency Injection to inject $rootScopeProvider object 
	 * @param  $routeParams $routeParams use Dependency Injection to inject $routeParams service 
	 */
	.controller('EditCtrl', ['$scope','$routeParams', function($scope,$routeParams){
		
		/**
		 * Index of person in people contacts 
		 * @type Integer
		 */
		$scope.index = $routeParams.index;
		/**
		 * Person Object Loaded from peolpe Contacts 
		 * @type  Object
		 */
		$scope.person = $scope.people[$scope.index];

	}])
	/**
	 * Add Controller
	 * 		<br/> For add a New Person in People Contacts
	 * 
	 * @param  $rootScopeProvider $scope use Dependency Injection to inject $rootScopeProvider object 
	 */
	.controller('AddCtrl', ['$scope', function($scope){
		
		/**
		 * Index of New Person has been added in People Contacts 
		 * @type Integer
		 */
		var indexOfNewPerson;
		/**
		 * New Length of People Contacts After Added a New Person
		 * @type Integer
		 */
		var newLength;
		/**
		 * Person Object Loaded from peolpe Contacts 
		 * @type  Object
		 */
		$scope.person;		

		newLength = $scope.people.push({
			name : "new contacts",
			number : ""
		});

		indexOfNewPerson = newLength - 1;
		$scope.person = $scope.people[indexOfNewPerson];

	}])
	/**
	 * Delete Controller
	 * 		<br/> For Delete an Existing Persons in People Contacts
	 * 
	 * @param  $rootScopeProvider $scope use Dependency Injection to inject $rootScopeProvider object 
	 * @param  $routeParams $routeParams use Dependency Injection to inject $routeParams service 
	 * @param  $location $location use Dependency Injection to inject $location service 
	 */
	.controller('DeleteCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location){
		
		/**
		 * Index of person in people contacts 
		 * @type Integer
		 */
		var index = $routeParams.index; 

		$scope.people.splice(index,1);
		$location.path('/').replace();

	}]);