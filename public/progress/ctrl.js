angular.module('ProgressCtrl', ['AttemptsService', 'GamesService']).controller('ProgressCtrl', ['$scope', 'attempts', 'games', function($scope, attempts, games) {
	filteredGames = function(list){
		result = []
		for (attempt in list) {
			if (result.indexOf(list[attempt].game) === -1) {
				result.push(list[attempt].game);
			}
		}
		return result;
	}
	gamesWon = function(games, list){
		result = [];
		count = 0;
		for (i = 0; i < games.length; i++) {
			for (attempt in list) {
				if (list[attempt].game === games[i] && list[attempt].success === true && result[i] != true) {
					result[i] = true;
					count ++;
				}/* else if (result[i] === true) {
					continue;
				} else {
					result[i] = false;
				}*/
			}
		}
		return count;
	}
	$scope.allGames = games.allGames;
	$scope.games = filteredGames(attempts.attempts);
	$scope.gamesWon = gamesWon($scope.games, attempts.attempts);

}]);