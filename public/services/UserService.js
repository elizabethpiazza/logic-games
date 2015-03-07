angular.module('UserService', []).factory('user', ['$http', function($http) {
	var o = {
		user : {},
		attempts: []
	}
	o.getUser = function() {
		return $http.get('/api/user').success(function(data){
			angular.copy(data, o.user);
			angular.copy(data.attempts, o.attempts);
		});
	};
	o.addAttempt = function(newAttempt) {
		//todo
		return $http.post('/api/user/attempt', newAttempt)
		.success(function (data){
			o.attempts.push(data);
		});
	};
	return o;
}]);

