angular
  .module('app')
  .component('loginPage', {
  	templateUrl: 'components/login-page/login-page.html',
  	controller: ['$rootScope', 'AuthService', '$localStorage', LoginPageCtrl],
  	bindings: {
  		email: '=',
  		password: '='
  	}
  });

function LoginPageCtrl($rootScope, AuthService, $localStorage) {
	var ctrl = this;

	ctrl.submitLogin = function() {
		AuthService.login(ctrl.email, ctrl.password)
		.then(function(data) {
			$localStorage.token = data.token_type + ' ' + data.access_token;
			window.location = "/transfer";
		})
		.catch(function(err) {
			console.log(err);
		});
	};
}