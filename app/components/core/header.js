angular
  .module('app')
  .component('header', {
  	templateUrl: 'components/core/header.html',
  	controller: ['$rootScope', '$localStorage', 'AuthService', HeaderCtrl],
  });

function HeaderCtrl($rootScope, $localStorage, AuthService) {
	var ctrl = this;

	ctrl.logout = function() {
		delete $localStorage.token;

		AuthService.logout()

		.then(function(data) {
			window.location = '/login';
		})

		.catch(function(err) {
			console.log(err);
		});
	};
}