angular.module('HomeCtrl', ['TypesService']).controller('HomeCtrl', ['$scope', 'types', function($scope, types) {
	$scope.types = types.types;
}]);