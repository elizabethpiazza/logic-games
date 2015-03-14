var app = angular.module('logic-games', ['ui.router', 'MainCtrl', 'HomeCtrl', 'GameCtrl', 'GameDetailCtrl', 'ProfileCtrl', 'AdminCtrl', 'TypesService', 'GamesService', 'UserService', 'AdminService']);

//angular stuff begins here
app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('home');
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/views/partials/home.html',
				controller: 'HomeCtrl',
				resolve: {
					typePromise: ['users', function(users){
						return users.getUser();
					}],
					typePromise: ['types', function(types){
						return types.getTypes();
					}]
				}
			})
			.state('type', {
				url: '/type/{id}',
				templateUrl: '/views/partials/type.html',
				controller: 'GameCtrl',
				resolve: {
					gamesPromise: ['$stateParams', 'games', function($stateParams, games) {
						return games.getGames($stateParams.id);
					}]
				}
			})
			.state('game', {
				url: '/game/{id}',
				templateUrl: '/views/partials/game.html',
				controller: 'GameDetailCtrl',
				resolve: {
					gamePromise: ['$stateParams', 'games', function($stateParams, games){
						return games.getGame($stateParams.id);
					}]
				}
			})
			.state('profile', {
				url: '/profile',
				templateUrl: '/views/partials/profile.ejs',
				controller: 'ProfileCtrl'
			})
			.state('admin', {
				url: '/admin',
				templateUrl: '/views/partials/admin.ejs',
				controller: 'AdminCtrl',
				resolve: {
					typePromise: ['admin', function(admin){
						return admin.getAllTypes();
					}],
					gamePromise: ['admin', function(admin){
						return admin.getAllGames();
					}]
				}
			});
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
			return ("0" + input).slice (-2);
		};
	};
});
