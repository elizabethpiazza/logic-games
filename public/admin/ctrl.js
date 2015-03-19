angular.module('AdminCtrl', ['AdminService']).controller('AdminCtrl', ['$scope', 'admin', function($scope, admin) {
	$scope.types = admin.types;
	$scope.games = admin.games;

	$scope.addType = function(newType){
		if ($scope.newType === {}) { return; }
		admin.addType({
			typename : $scope.newType.typename,
			level : $scope.newType.level
		});
		$scope.newType = {};
	};
	$scope.addGame = function(newGame){
		if ($scope.newGame === {}) { return; }
		admin.addGame($scope.newGame, $scope.newGameType);
		$scope.newGame = {};
	};
	$scope.delType = function(id){
		admin.delType(id);
	};
	$scope.delGame = function(id){
		admin.delGame(id);
	};

}]);

function removeItem (list, id) {
	for (var i = 0; i < list.length; i++){
		if (list[i]._id === id){
			list.splice(i, 1);
			break;
		}
	}
}