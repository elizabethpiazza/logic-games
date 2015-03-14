angular.module('AdminService', []).factory('admin', ['$http', function($http) {
	var o = {
		types: [],
		games: []
	}
	o.getAllTypes = function() {
		return $http.get('/api/types').success(function(data){
			angular.copy(data, o.types);
		});
	};
	o.getAllGames = function() {
		return $http.get('/api/games').success(function(data){
			angular.copy(data, o.games);
		});
	};
	/*o.updateUser = function(name) {
		return $http.put('/api/user', name).success(function(data){
			angular.copy(data, o.user);
		});
	};
	o.addAttempt = function(newAttempt) {
		//todo
		return $http.post('/api/user/attempt', newAttempt)
		.success(function (data){
			o.attempts.push(data);
		});
	};*/
	o.addType = function(newType) {
		$http.post('/api/types', newType)
		.success(function (data){
			o.types.push(data);
		});
		return o.getAllTypes();
	};
	o.addGame = function(newGame, typeid) {
		$http.post('/api/types/' + typeid + '/games', newGame)
		.success(function (data){
			o.games.push(data);
		});
		return o.getAllGames();
	};
	o.delType = function (id) {
		return $http.delete('/api/types/' + id)
		.success(removeItem(o.types, id));
	};
	o.delGame = function (id) {
		return $http.delete('/api/games/' + id)
		.success(removeItem(o.games, id));
	};
	return o;
}]);

function removeItem (list, id) {
	for (var i = 0; i < list.length; i++){
		if (list[i]._id === id){
			list.splice(i, 1);
			break;
		}
	}
}