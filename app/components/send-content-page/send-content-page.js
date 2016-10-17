angular
  .module('app')
  .component('sendContentPage', {
  	templateUrl: 'components/send-content-page/send-content-page.html',
  	controller: ['$rootScope', SendContentPageCtrl],
  });

function SendContentPageCtrl($rootScope) {
	var ctrl = this;

}