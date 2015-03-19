angular.module('AttemptsCtrl', ['AttemptsService', 'UserService']).controller('AttemptsCtrl', ['$scope', 'attempts', 'user', function($scope, attempts, user) {
	
	$scope.game = attempts.game;
	$scope.attempts = gameAttempts(attempts.attempts, $scope.game);
	$scope.attemptTimes = gameAttemptTimes($scope.attempts);

	$scope.addAttempt = function(newAttempt){
		if ($scope.newAttempt === {}) { return; }
		$scope.newAttempt.success = getSuccess($scope.newAttempt.attempt, $scope.game);
		attempts.addAttempt({
			game : $scope.game._id,
			attempt : { minutes : $scope.newAttempt.attempt.minutes, seconds : $scope.newAttempt.attempt.seconds },
			success : $scope.newAttempt.success
		});
		$scope.newAttempt = {};
	};

	$scope.delAttempt = function(id){
		attempts.delAttempt(id);
	};

	function gameAttempts(attempts, game) {
		var r = []
		for (i = 0; i < attempts.length; i++) {
			if (attempts[i].game == game._id) {
				r.push(attempts[i]);
			}
		}
		return r;
	}
	function gameAttemptTimes(attempts) {
		var r = []
		for (i = 0; i < attempts.length; i++) {
			seconds = (attempts[i].attempt.minutes * 60) + attempts[i].attempt.seconds;
			r.push({"seconds": seconds, "date": attempts[i].attempt.time});
		}
		return r;
	}

}]);

function getSuccess(newAttempt, game) {
	if (newAttempt.accuracy == game.questions){
		return true;
	}
	else {
		return false;
	}
}

// {"_id":"54f3e492aaaf37903b74adc5","gametype":"54f219fe52bcb904356fae2b","__v":0,"goal":{"minutes":3,"seconds":30},"identifier":{"year":2014,"month":"Dec","testno":74,"gameno":1}}