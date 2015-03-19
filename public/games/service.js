angular.module('GamesService', []).factory('games', ['$http', function($http) {
	var o = {
		typename: '',
		games: [],
		allGames: []
	}
	o.getGames = function(id) {
		return $http.get('/api/types/' + id).success(function(data){
				angular.copy(data.games, o.games);
				o.typename = data.typename;
		});
	};
	o.getAllGames = function() {
		return $http.get('/api/games/').success(function(data){
				angular.copy(data, o.allGames);
		});
	};
	return o;
}]);