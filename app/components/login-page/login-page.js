angular
  .module('app')
  .component('loginPage', {
  	templateUrl: 'components/login-page/login-page.html',
  	controller: ['$rootScope', 'AuthService', '$localStorage', '$timeout', '$window', LoginPageCtrl],
  	bindings: {
  		email: '=',
  		password: '=',
  		notLoggedIn: '='
  	}
  });

function LoginPageCtrl($rootScope, AuthService, $localStorage, $timeout, $window) {
	var ctrl = this;

	ctrl.notLoggedIn = false;

	if ($localStorage.token) {
		$window.location = "/transfer";
	}
	else {
		ctrl.notLoggedIn = true;
	}

	ctrl.submitLogin = function() {

		var email = ctrl.email;
		var password = ctrl.password;

		if (!email) {
			toastr.error('Email can not be empty.');
			return;
		}

		if (!password) {
			toastr.error('Password can not be empty.');
			return;
		}

		AuthService.login(email, password)
		.then(function(data) {
			$localStorage.token = data.token_type + ' ' + data.access_token;
			$localStorage.authKey = data.access_token;
			$localStorage.email = email;
			$window.location = "/transfer";
		})
		.catch(function(err) {
			$timeout(function() {
				ctrl.password = undefined;
			});
			toastr.error('User with the given email/password does not exist.');

		});
	};
}