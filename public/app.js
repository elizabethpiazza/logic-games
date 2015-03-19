var app = angular.module('logic-games', ['ui.router', 'MainCtrl', 'UserService', 'TypesCtrl', 'TypesService', 'GamesCtrl', 'AllGamesCtrl', 'GamesService', 'AttemptsCtrl', 'AttemptsService', 'AdminCtrl', 'AdminService']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	'$locationProvider',
	function ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('types');
		$stateProvider
			.state('types', {
				url: '/types',
				templateUrl: '/types/view.ejs',
				controller: 'TypesCtrl',
				resolve: {
					typePromise: ['types', function(types){
						return types.getTypes();
					}]
				}
			})
			.state('games', {
				url: '/types/{id}',
				templateUrl: '/games/view.ejs',
				controller: 'GamesCtrl',
				resolve: {
					gamePromise: ['$stateParams', 'games', function($stateParams, games){
						return games.getGames($stateParams.id);
					}]
				}
			})
			.state('allgames', {
				url: '/games',
				templateUrl: '/games/view.ejs',
				controller: 'AllGamesCtrl',
				resolve: {
					gamePromise: ['games', function(games){
						return games.getAllGames();
					}]
				}
			})
			.state('attempts', {
				url: '/games/{id}/progress',
				templateUrl: '/attempts/view.ejs',
				controller: 'AttemptsCtrl',
				resolve: {
					gamePromise: ['$stateParams', 'attempts', function($stateParams, attempts){
						return attempts.getGame($stateParams.id);
					}],
					attemptPromise: ['$stateParams', 'attempts', function($stateParams, attempts){
						return attempts.getAttempts();
					}]
				}
			})
			.state('admin', {
				url: '/admin',
				templateUrl: '/admin/view.ejs',
				controller: 'AdminCtrl',
				resolve: {
					typePromise: ['admin', function(admin){
						return admin.getAllGames();
					}],
					gamePromise: ['admin', function(admin){
						return admin.getAllTypes();
					}]
				}
			});
		//$locationProvider.html5Mode(true);
	}
]);

app.filter('attemptDate', function() {
	return function (isodate) {
		if (isodate) {
			var newdate = new Date(isodate);
			return newdate.toLocaleString();
		}
	};
});

app.filter('resolveType', function(types) {
	return function (id, types) {
		if (typeof types !== 'undefined' && types.length > 0) {
			for (i = 0; i < types.length; i++) {
				if (types[i]._id == id) {
					return types[i].typename;
				}
			};
		};
	};
});

app.filter('successCheck', function() {
	return function (input) {
		if (input) {
			if (input >= 1 || input == true){
				return '\u2713';
			}
		};
	};
});

app.filter('fixSeconds', function() {
	return function (input) {
		if (input) {
			input.toString();
			return ("00" + input).slice (-2);
		} else {
			return "00";
		}
	};
});
