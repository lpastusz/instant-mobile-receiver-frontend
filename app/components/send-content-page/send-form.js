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

    if (!selectedDevice) {
      toastr.error('No device is selected.');
      return;
    }

    if (!text) {
      toastr.error('Text can not be empty.');
      return;
    }
		
		TransferService.transferText(text, selectedDevice)

		.then(function(data) {
			toastr.success('Message was send.');
      $timeout(function() {
        ctrl.transferText = undefined;
      });
		})

		.catch(function(err) {
			toastr.error('Error while sending a message.');
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
        if (!ctrl.devices || ctrl.devices.length == 0) {
          toastr.error('No devices found. Please, register your mobile first.');
        }
      });
    })
    .catch(function(err) {
      toastr.error('Error while receiving your mobile data.');
    });
  };



  ctrl.onCreated();

}