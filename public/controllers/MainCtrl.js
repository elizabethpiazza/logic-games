angular.module('MainCtrl', ['UserService']).controller('MainCtrl', ['$scope', 'user', function($scope, user) {
	user.getUser();
	$scope.user = user.user;
	$scope.attempts = user.attempts;
}]);