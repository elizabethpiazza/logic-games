angular.module('GameCtrl', ['GamesService']).controller('GameCtrl', ['$scope', 'games', function($scope, games) {
	$scope.typename = games.typename;
	$scope.games = games.games;
	console.log($scope.games);
}]);