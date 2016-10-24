angular
  .module('app')
  .component('registerPage', {
  	templateUrl: 'components/register-page/register-page.html',
  	controller: ['$rootScope', 'AuthService', '$localStorage', '$timeout', RegisterPageCtrl],
  	bindings: {
  		email: '=',
  		password: '=',
  		passwordCheck: '='
  	}
  });

function RegisterPageCtrl($rootScope, AuthService, $localStorage, $timeout) {
	var ctrl = this;

	ctrl.submitRegister = function() {

		if (!ctrl.email) {
			toastr.error('Email can not be empty.');
			return;
		}

		if (!ctrl.password) {
			toastr.error('Password can not be empty.');
			return;
		}

		if (!ctrl.passwordCheck) {
			toastr.error('Passwords do not match.');
			return;
		}		

		AuthService.register(ctrl.email, ctrl.password)
		.then(function(data) {
			toastr.success('User was created.');
			$timeout(function() {
				window.location = "/login";
			}, 500);
		})
		.catch(function(err) {
			$timeout(function() {
				ctrl.password = undefined;
				ctrl.passwordCheck = undefined;
			});
			toastr.error('Can not create specified user.');

		});
	};
}