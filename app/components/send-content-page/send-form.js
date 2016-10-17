angular
  .module('app')
  .component('sendForm', {
  	templateUrl: 'components/send-content-page/send-form.html',
  	controller: ['$rootScope', 'TransferService', '$timeout', SendFormCtrl],
  	bindings: {
  		transferText: '@',
  		file: '@'
  	}
  });

function SendFormCtrl($rootScope, TransferService, $timeout) {
	var ctrl = this;

	ctrl.submitText = function() {

		var text = ctrl.transferText;
		
		TransferService.transferText(text)

		.then(function(data) {
			console.log(data);
		})

		.catch(function(err) {
			console.log(err);
		});

	};

  ctrl.filesChanged = function () {
  		var file = ctrl.files;
      if (!file.$error) {

      	TransferService.transferFile(file)
      	.then(function(resp) {
					$timeout(function() {
              ctrl.log = 'file: ' +
              resp.config.data.file.name +
              ', Response: ' + JSON.stringify(resp.data) +
              '\n' + ctrl.log;
          });
      	});

      }
  };

}