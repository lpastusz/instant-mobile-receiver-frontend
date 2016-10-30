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

      if (!file) {
        return;
      }


      if (file.$error) {
        toastr.error('Error while uploading the file.');
      }
      else {

        var timestamp = timestamp = (new Date()).toISOString().replace(/-/g,"").replace(/:/g,"").slice(0, 15);

      	TransferService.uploadFileToAWS(file, timestamp)

        .then(TransferService.sendTextFileToDevice(file, selectedDevice, timestamp))

        .then(function(resp) {
          toastr.success('File was sent to your mobile device.');
        })

        .catch(function(err) {
          toastr.error('Error while uploading the file.');
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