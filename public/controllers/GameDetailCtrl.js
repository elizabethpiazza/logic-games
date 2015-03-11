angular.module('GameDetailCtrl', ['GamesService', 'UserService']).controller('GameDetailCtrl', ['$scope', 'games', 'user', function($scope, games, user) {
	$scope.typename = games.typename;
	console.log($scope.typename);
	$scope.game = games.game;

	$scope.newAttempt = { attempt: {minutes: '', seconds: ''}};

	$scope.addAttempt = function(newAttempt){
		if ($scope.newAttempt === {}) { return; }
		user.addAttempt({
			game : $scope.game._id,
			attempt : { minutes : $scope.newAttempt.attempt.minutes, seconds : $scope.newAttempt.attempt.seconds }
		});
		$scope.newAttempt = {};
	};
	$scope.delAttempt = function(id){
		user.delAttempt(id);
	};

}]);

// {"_id":"54f3e492aaaf37903b74adc5","gametype":"54f219fe52bcb904356fae2b","__v":0,"goal":{"minutes":3,"seconds":30},"identifier":{"year":2014,"month":"Dec","testno":74,"gameno":1}}