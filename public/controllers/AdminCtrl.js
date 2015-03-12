angular.module('AdminCtrl', ['AdminService']).controller('AdminCtrl', ['$scope', 'admin', function($scope, admin) {
	$scope.types = admin.types;
	$scope.games = admin.games;

	$scope.addType = function(newType){
		if ($scope.newType === {}) { return; }
		admin.addType({
			typename : $scope.newType.typename,
			level : $scope.newType.level
		});
		admin.getAllTypes();
		$scope.newType = {};
	};
	$scope.addGame = function(newGame){
		if ($scope.newGame === {}) { return; }
		admin.addGame($scope.newGame, $scope.newGameType);
		admin.getAllGames();
		$scope.newGame = {};
	};

	$scope.delType = function(id){
		admin.delType(id);
	};
	$scope.delGame = function(id){
		admin.delGame(id);
	};

}]);

// {"_id":"54f3e492aaaf37903b74adc5","gametype":"54f219fe52bcb904356fae2b","__v":0,"goal":{"minutes":3,"seconds":30},"identifier":{"year":2014,"month":"Dec","testno":74,"gameno":1}}