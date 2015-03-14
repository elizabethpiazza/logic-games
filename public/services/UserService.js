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
	o.updateUser = function(realname) {
		$http.put('/api/user', realname).success(function(data){
			angular.copy(data, o.user);
		});
		return o.getUser();
	};
	o.addAttempt = function(newAttempt) {
		//todo
		$http.post('/api/user/attempt', newAttempt)
		.success(function (data){
			o.attempts.push(data);
			return o.getUser();
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