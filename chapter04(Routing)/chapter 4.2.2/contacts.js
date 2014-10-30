/**
 * contacts App Module
 * 		<br/> contains routing and controllers to list contacts and edit them 
 *
 * @param {ngRoute} ngRoute use Dependency Injection to inject ngRoute module Which provides routing 
 * @author ahmed hamdy <ahmedhamdy20@gmail.com>		
 */
angular.module("contactsApp",['ngRoute'])
	/**
	 * configure the routes for contacts App
	 * 
	 * @param {$routeProvider} $routeProvider use Dependency Injection to inject $routeProvider object
	 * @param {$locationProvider} $locationProvider use Dependency Injection to inject $locationProvider object
	 */
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

		// enable html5Mode to remove hashtag(#) from URL
		// url before enable html5Mode was into a tag 
		// <a href="#/contacts"></a> and <a href="#/contacts/add"></a>
		// Now we can remove hashtag from [href] Just <a href="/contacts"></a> 
		$locationProvider.html5Mode(true);

		$routeProvider
			/**
			 * index route to list contacts
			 */
			.when("/contacts",{

				templateUrl : 'list.html'

			})
			/**
			 * edit route to edit an existing Person contact
			 */
			.when("/contacts/:index/edit",{

				templateUrl : 'edit.html',
				controller  : 'EditContactsCtrl'
			})
			/**
			 * add route to add a new contact to people contacts
			 */
			.when("/contacts/add",{

				templateUrl : 'add.html',
				controller : 'AddContactsCtrl' 
			})
			/**
			 * delete route to delete an Existing 
			 */
			.when("/contacts/:index/delete",{

				templateUrl : 'list.html',
				controller : 'DeleteContactsCtrl' 
			})
			/**
			 * use oterwise to force any route not belong to above routes to redirect to Home route
			 */
			.otherwise({

				redirectTo : "/contacts"
			});

	}])
	/**
	 * Contacts Controller 
	 * 		<br/> contactsCtrl work as perent controller for all childreen controller
	 * 			  so people veriable will see into all controller
	 * 		
	 * @param {$rootScopeProvider} $scope use Dependency Injection to inject $rootScopeProvider object
	 * @param {$location $location} use Dependency Injection to inject $location service  
	 */
	.controller('ContactsCtrl', ['$scope', '$location', function($scope, $location){
		
		/**
		 * People Contacts 
		 * @type {Array}
		 */
		$scope.people = [		
			{name : "Tom Ashworth", number : "1234567890"},
			{name : "Jeffrey way",  number : "09876543421"},
			{name : "Joy Ashworth", number : "1230984756"}
		];

		/**
		 * editPerson Method
		 * 			<br/> used to redirct to edit route  
		 * 			
		 * @param {Integer} index index of Person into People List 
		 */
		$scope.editPerson = function (index) {
			
			$location.path("/contacts/"+index+"/edit").replace();
		}

		/**
		 * deletePerson Method
		 * 			<br/> used to redirct to delete route  
		 * 			
		 * @param {Integer} index index of Person into People List 
		 */
		$scope.deletePerson = function (index) {
			
			$location.path("/contacts/"+index+"/delete").replace();
		}

	}])
	/**
	 * Edit Contacts Controller
	 * 		<br/> For edit an Existing Persons in People Contacts
	 * 
	 * @param {$rootScopeProvider} $scope use Dependency Injection to inject $rootScopeProvider object 
	 * @param {$routeParams} $routeParams use Dependency Injection to inject $routeParams service 
	 */
	.controller('EditContactsCtrl', ['$scope','$routeParams', function($scope, $routeParams){
		
		/**
		 * Index of person in people contacts 
		 * @type {Integer}
		 */
		$scope.index = $routeParams.index;
		/**
		 * Person Object Loaded from peolpe Contacts 
		 * @type {Object}
		 */
		$scope.person = $scope.people[$scope.index];

	}])
	/**
	 * Add Contacts Controller
	 * 		<br/> For add a New Person in People Contacts
	 * 
	 * @param {$rootScopeProvider} $scope use Dependency Injection to inject $rootScopeProvider object 
	 * @param {$location} $location use Dependency Injection to inject $location service  
	 */
	.controller('AddContactsCtrl', ['$scope', '$location', function($scope, $location){
		
		/* 
		 Note : Must Initialize ng-model for [name - number] text input first the page loaded  
				To be able to check length of text for used it in disable and able add new button
				Without initialize them , will face problem of undefiend property 
		*/
		/**
		 * Name of person 
		 * @type {String}
		 */
		$scope.name = '';

		/**
		 * Number of person
		 * @type {String}
		 */
		$scope.number = '';

		/**
		 * isCanAddNewPerson 
		 * @return {Boolean}
		 */
		$scope.isCanAddNewPerson = function () {

			if( $scope.name.length > 0 && $scope.number.length > 0){
				return false;
			}
			return true;
		}
		/**
		 * addNewPerson Method for add new Person into People List 
		 */
		$scope.addNewPerson = function () {

			$scope.people.push({
				name: $scope.name,
				number: $scope.number
			});
			$location.path('/contacts').replace();
		}

	}])
	/**
	 * Delete Contacts Controller
	 * 		<br/> For Delete an Existing Persons in People Contacts
	 * 
	 * @param {$rootScopeProvider} $scope use Dependency Injection to inject $rootScopeProvider object 
	 * @param {$routeParams} $routeParams use Dependency Injection to inject $routeParams service 
	 * @param {$location} $location use Dependency Injection to inject $location service 
	 */
	.controller('DeleteContactsCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location){

		/**
		 * Index of person in people contacts 
		 * @type {Integer}
		 */
		var index = $routeParams.index; 

		$scope.people.splice(index,1);
		$location.path('/contacts').replace();

	}]);