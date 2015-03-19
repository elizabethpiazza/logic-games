angular.module('GamesCtrl', ['GamesService']).controller('GamesCtrl', ['$rootScope', '$scope', 'games', function($rootScope, $scope, games) {
	$rootScope.typename = games.typename;
	$scope.games = games.games;
}]);