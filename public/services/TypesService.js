angular.module('TypesService', []).factory('types', ['$http', function($http) {
	var o = {
		types: []
	}
	o.getTypes = function() {
		return $http.get('/api/types').success(function(data){ angular.copy(data, o.types);
		});
	};
	return o;
}]);

