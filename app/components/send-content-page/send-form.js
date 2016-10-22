angular
  .module('app')
  .component('sendForm', {
  	templateUrl: 'components/send-content-page/send-form.html',
  	controller: ['$rootScope', 'TransferService', '$timeout', 'DeviceService', SendFormCtrl],
  	bindings: {
  		transferText: '@',
  		file: '@',
      devices: '<',
      selectedDevice: '@'
  	}
  });

function SendFormCtrl($rootScope, TransferService, $timeout, DeviceService) {
	var ctrl = this;

  ctrl.onCreated = function() {
    ctrl.getDeviceData();
  };

	ctrl.submitText = function() {

		var text = ctrl.transferText;
    var selectedDevice = ctrl.selectedDevice;
		
		TransferService.transferText(text, selectedDevice)

		.then(function(data) {
			console.log(data);
		})

		.catch(function(err) {
			console.log(err);
		});

	};

  ctrl.filesChanged = function () {
      var selectedDevice = ctrl.selectedDevice;
  		var file = ctrl.files;
      if (!file.$error) {

      	TransferService.transferFile(file, selectedDevice)
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

  ctrl.getDeviceData = function() {
    DeviceService.getDevices()
    .then(function(resp) {
      console.log(resp);
      $timeout(function() {
        ctrl.devices = resp.data;
      });
    })
    .catch(function(err) {
      console.log(err);
    });
  };



  ctrl.onCreated();

}