angular.module('AllGamesCtrl', ['GamesService']).controller('AllGamesCtrl', ['$rootScope', '$scope', 'games', function($rootScope, $scope, games) {
	$scope.games = games.allGames;
}]);