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
		return $http.get('/api/admin/games').success(function(data){
			angular.copy(data, o.games);
		});
	};
	o.addType = function(newType) {
		return $http.post('/api/admin/types', newType)
		.success(function (data){
			o.types.push(data);
		});
		//return o.getAllTypes();
	};
	o.addGame = function(newGame, typeid) {
		return $http.post('/api/admin/types/' + typeid + '/games', newGame)
		.success(function (data){
			o.games.push(data);
		});
		//return o.getAllGames();
	};
	o.delType = function (id) {
		return $http.delete('/api/admin/types/' + id)
		.success(removeItem(o.types, id));
	};
	o.delGame = function (id) {
		return $http.delete('/api/admin/games/' + id)
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