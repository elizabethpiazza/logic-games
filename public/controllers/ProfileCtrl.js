angular.module('ProfileCtrl', ['UserService']).controller('ProfileCtrl', ['$scope', 'user', function($scope, user) {
//will put logic for modifying profile attributes
	$scope.updateUser = function() {
		if ($scope.userUpdate != {}) {
			user.updateUser($scope.userUpdate.realname);
		}
	};
}]);