angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/partials/home.html',
		controller: 'MainController'
	})
	.when('/nerds', {
		templateUrl: 'views/partials/nerd.html',
		controller: 'NerdController'
	});
	$locationProvider.html5Mode(true);
}]);