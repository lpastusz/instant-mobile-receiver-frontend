angular
  .module('app')
  .component('loginPage', {
  	templateUrl: 'components/login-page/login-page.html',
  	controller: ['$rootScope', 'AuthService', '$localStorage', '$timeout', LoginPageCtrl],
  	bindings: {
  		email: '=',
  		password: '='
  	}
  });

function LoginPageCtrl($rootScope, AuthService, $localStorage, $timeout) {
	var ctrl = this;

	ctrl.submitLogin = function() {

		if (!ctrl.email) {
			toastr.error('Email can not be empty.');
			return;
		}

		if (!ctrl.password) {
			toastr.error('Password can not be empty.');
			return;
		}

		AuthService.login(ctrl.email, ctrl.password)
		.then(function(data) {
			$localStorage.token = data.token_type + ' ' + data.access_token;
			window.location = "/transfer";
		})
		.catch(function(err) {
			$timeout(function() {
				ctrl.password = undefined;
			});
			toastr.error('User with the given email/password does not exist.');

		});
	};
}