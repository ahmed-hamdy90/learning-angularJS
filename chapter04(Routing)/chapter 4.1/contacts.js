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
	 * @param  $rootScopeProvider scope use Dependency Injection to inject $rootScopeProvider object
	 */
	.controller('ContactsCtrl', ['$scope', function($scope){
		/**
		 * people contacts 
		 * @type Array
		 */
		$scope.people = [		
			{name:"Tom Ashworth", number:"1234567890"},
			{name:"Jeffrey way", number:"09876543421"},
			{name:"Joy Ashworth", number:"1230984756"}
		];
	}])
	/**
	 * Edit Controller
	 * 
	 * @param  $rootScopeProvider scope use Dependency Injection to inject $rootScopeProvider object 
	 * @param  $routeParams routeParams use Dependency Injection to inject $routeParams object 
	 */
	.controller('EditCtrl', ['$scope','$routeParams', function($scope,$routeParams){
		/**
		 * index of person in people contacts 
		 * @type Integer
		 */
		$scope.index = $routeParams.index;
		/**
		 * Person Object Loaded from peolpe Contacts 
		 * @type  Object
		 */
		$scope.person = $scope.people[$scope.index];
	}]);
