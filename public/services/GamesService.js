angular.module('GamesService', []).factory('games', ['$http', function($http) {
	var o = {
		typename: '',
		games: [],
		game: []
	}
	o.getGames = function(id) {
		return $http.get('/api/types/' + id).success(function(data){
				angular.copy(data.games, o.games);
				angular.copy(data.typename, o.typename);
				console.log(o.typename);
		});
	};
	o.getGame = function(id) {
		return $http.get('/api/games/' + id).success(function(data){
			angular.copy(data, o.game);
		});
	};
	return o;
}]);

