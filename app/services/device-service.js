angular
	.module('app')
	.factory('DeviceService', [
		'$resource',
		'$rootScope',
		function($resource, $rootScope) {

			var self = function() {};

			var restUrl = $rootScope.$restUrl;

			var API = $resource('', {}, {
				getDevices: {
					method: 'GET',
					url: restUrl + '/device/get'
				}
			});

			self.getDevices = function() {
				
				return new Promise(function(resolve, reject) {
					API.getDevices({
					}, resolve, reject);
				});		
			};

			return self;
		}]);