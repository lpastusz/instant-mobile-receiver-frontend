angular
  .module('app')
  .component('footer', {
  	templateUrl: 'components/core/footer.html',
  	controller: ['$rootScope', FooterCtrl],
  });

function FooterCtrl($rootScope) {
	var ctrl = this;

}