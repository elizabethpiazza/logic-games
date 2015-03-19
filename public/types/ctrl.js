angular.module('TypesCtrl', ['TypesService']).controller('TypesCtrl', ['$scope', 'types', function($scope, types) {
	$scope.types = types.types;
}]);