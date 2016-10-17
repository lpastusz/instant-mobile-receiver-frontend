angular
	.module('app')
	.factory('AuthService', [
		'$resource',
		'$rootScope',
		function($resource, $rootScope) {

			var self = function() {};

			var restUrl = $rootScope.$restUrl;

			var API = $resource('', {}, {
				login: {
					method: 'POST',
					url: restUrl + '/user/login',
					headers: {
						'Authorization': $rootScope.$basicAuth
					}
				},
				logout: {
					method: 'POST',
					url: restUrl + '/user/logout',
				}
			});

			self.login = function(email, password) {
				return new Promise(function(resolve, reject) {
					API.login({
						username: email,
						password: password,
						grant_type: 'password'
					}, resolve, reject);
				});
			};

			self.logout = function() {
				return new Promise(function(resolve, reject) {
					API.logout({
					}, resolve, reject);
				});
			};			


			return self;
		}]);