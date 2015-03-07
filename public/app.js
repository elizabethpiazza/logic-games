var app = angular.module('logic-games', ['ui.router', 'MainCtrl', 'HomeCtrl', 'GameCtrl', 'GameDetailCtrl', 'ProfileCtrl', 'TypesService', 'GamesService', 'UserService']);

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
				templateUrl: '/views/partials/profile.ejs'//,
				//controller: 'ProfileCtrl',
			});
	}
]);