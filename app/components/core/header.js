angular
  .module('app')
  .component('header', {
  	templateUrl: 'components/core/header.html',
  	controller: ['$rootScope', '$localStorage', 'AuthService', HeaderCtrl],
  });

function HeaderCtrl($rootScope, $localStorage, AuthService) {
	var ctrl = this;

	ctrl.logout = function() {

		AuthService.logout()

		.then(function(data) {
			delete $localStorage.token;
			window.location = '/login';
		})

		.catch(function(err) {
			console.log(err);
		});
	};
}