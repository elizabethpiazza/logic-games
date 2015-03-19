angular.module('AttemptsService', []).factory('attempts', ['$http', function($http) {
	var o = {
		game : {},
		attempts : []
	}

	o.getGame = function(id) {
		return $http.get('/api/games/' + id).success(function(data){
			angular.copy(data, o.game);
		});
	};

	o.getAttempts = function() {
		return $http.get('/api/user').success(function(data){
			angular.copy(data.attempts, o.attempts);
		});
	};

	o.addAttempt = function(newAttempt) {
		$http.post('/api/user/attempt', newAttempt)
		.success(function (data){
			o.attempts.push(data);
		});
	};
	o.delAttempt = function (id) {
		return $http.delete('/api/user/' + id)
		.success(removeAttempt(o.attempts, id));
	};

	return o;
}]);

function removeAttempt (list, id) {
	for (var i = 0; i < list.length; i++){
		if (list[i]._id === id){
			list.splice(i, 1);
			break;
		}
	}
}