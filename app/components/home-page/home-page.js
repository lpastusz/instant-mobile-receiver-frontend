angular
  .module('app')
  .component('homePage', {
  	templateUrl: 'components/home-page/home-page.html',
  	controller: ['$rootScope', HomePageCtrl],
  });

function HomePageCtrl($rootScope) {
	var ctrl = this;

}