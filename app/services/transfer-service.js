angular
	.module('app')
	.factory('TransferService', [
		'$resource',
		'$rootScope',
		'Upload',
		'$http',
		'$localStorage',
		function($resource, $rootScope, Upload, $http, $localStorage) {

			var self = function() {};

			var restUrl = $rootScope.$restUrl;

			var API = $resource('', {}, {
				transferText: {
					method: 'POST',
					url: restUrl + '/transfer/text'
				},
				transferTextFile: {
					method: 'POST',
					url: restUrl + '/transfer/file/text'
				}
			});


			self.transferText = function(text, deviceId) {
				
				return new Promise(function(resolve, reject) {
					API.transferText({
						text: text,
						deviceId: deviceId
					}, resolve, reject);
				});		
			};


			self.uploadFileToAWS = function(file, timestamp) {
				
				var email = $localStorage.email;
				var url = 'https://r5wc3eim09.execute-api.eu-west-1.amazonaws.com/test/instant-mobile-receiver-uploaded-files-test/' + email + '%2F' + timestamp;
				var method = 'PUT';
				var authKey = $localStorage.authKey;
				var type = file.type;

				return new Promise(function(resolve, reject) {
		        $http({
	            url: url,
	            method: "PUT",
	            data: file,
	            headers: { 
	            	'Content-Type': type, 
	            	'AuthKey': authKey
	            }
	        }).success(resolve)
	        .error(reject);		
				});

			}


			self.sendTextFileToDevice = function(file, deviceId, timestamp) {

				var email = $localStorage.email;
				var url = 'https://r5wc3eim09.execute-api.eu-west-1.amazonaws.com/test/instant-mobile-receiver-uploaded-files-test/' + email + '%2F' + timestamp;

				return new Promise(function(resolve, reject) {

					API.transferTextFile({
						fileName: file.name,
						deviceId: deviceId,
						fileUrl: url
					}, resolve, reject);

				});

			};

			return self;
		}]);