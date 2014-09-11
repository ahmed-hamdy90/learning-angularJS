/**
 * contacts App
 *
 * contains routing and controllers to list contacts and edit them 
 */
angular.module("contactsApp",['ngRoute'])
	/**
	 * configure the routes for contacts App
	 * 
	 * @param  $routeProvider routing use Dependency Injection to inject $routeProvider object as routing 
	 */
	.config(['$routeProvider',function(routing) {

		routing
			/**
			 * index route to list contacts
			 */
			.when("/",{
				tamplateUrl: 'list.html'
			})
			/**
			 * edit route to edit an existing Person contact
			 */
			.when("/contact/:index",{
				tamplateUrl: 'edit.html',
				controller: 'EditCtrl'
			})
	}])
	/**
	 * Contacts Controller 
	 * 		<br/> contactsCtrl work as perent controller for all childreen controller
	 * 			  so people veriable will see into all controller
	 * 		
	 * @param  $rootScopeProvider scope use Dependency Injection to inject $rootScopeProvider object as scope
	 */
	.controller('ContactsCtrl', ['$scope', function(scope){
		/**
		 * people contacts 
		 * @type Array
		 */
		scope.people = [		
			{name:"Tom Ashworth", number:"1234567890"},
			{name:"Jeffrey way", number:"09876543421"},
			{name:"Joy Ashworth", number:"1230984756"}
		];
	}])
	/**
	 * Edit Controller
	 * 
	 * @param  $rootScopeProvider scope use Dependency Injection to inject $rootScopeProvider object as scope
	 * @param  $routeParams routeParams use Dependency Injection to inject $routeParams object as routeParams
	 */
	.controller('EditCtrl', ['$scope','$routeParams', function(scope,routeParams){
		/**
		 * index of person in people contacts 
		 * @type Integer
		 */
		scope.index = routeParams.index;
		/**
		 * Person Object Loaded from peolpe Contacts 
		 * @type  Object
		 */
		scope.person = scope.people[scope.index];
	}]);