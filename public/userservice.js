angular.module('UserService', []).factory('user', ['$http', function($http) {
	var o = {
		user : {}
	}
	o.getUser = function() {
		return $http.get('/api/user').success(function(data){
			angular.copy(data, o.user);
		});
	};
	o.updateUser = function(realname) {
		$http.put('/api/user', realname).success(function(data){
			angular.copy(data, o.user);
		});
		return o.getUser();
	};
	return o;
}]);