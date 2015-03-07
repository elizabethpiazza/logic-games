angular.module('ProfileCtrl', ['UserService']).controller('ProfileCtrl', ['$scope', 'user', function($scope, user) {
//will put logic for modifying profile attributes
	$scope.updateUser = function() {
		user.updateUser($scope.$parent.user.name);
	};
}]);