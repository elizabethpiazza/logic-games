angular.module('GameDetailCtrl', ['GamesService', 'UserService']).controller('GameDetailCtrl', ['$scope', 'games', 'user', function($scope, games, user) {
	$scope.typename = games.typename;
	console.log($scope.typename);
	$scope.game = games.game;

	$scope.newAttempt = { attempt: {minutes: '', seconds: ''}};

	$scope.addAttempt = function(newAttempt){
		if ($scope.newAttempt === {}) { return; }
		$scope.newAttempt.success = getSuccess($scope.newAttempt.attempt, $scope.game);
		console.log($scope.newAttempt.success);
		user.addAttempt({
			game : $scope.game._id,
			attempt : { minutes : $scope.newAttempt.attempt.minutes, seconds : $scope.newAttempt.attempt.seconds },
			success : $scope.newAttempt.success
		});
		$scope.newAttempt = {};
	};
	$scope.delAttempt = function(id){
		user.delAttempt(id);
	};

}]);

function getSuccess(newAttempt, game) {
	console.log(newAttempt);
	console.log(game);
	if ( (newAttempt.minutes < game.goal.minutes || (newAttempt.minutes == game.goal.minutes && newAttempt.seconds <= game.goal.seconds)) && newAttempt.accuracy == game.questions){
		return true;
	}
	else {
		return false;
	}
}

// {"_id":"54f3e492aaaf37903b74adc5","gametype":"54f219fe52bcb904356fae2b","__v":0,"goal":{"minutes":3,"seconds":30},"identifier":{"year":2014,"month":"Dec","testno":74,"gameno":1}}