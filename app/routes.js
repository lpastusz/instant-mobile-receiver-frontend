angular
	.module('app')
	.config(['$stateProvider', '$locationProvider','$urlRouterProvider', configRoutes]);

function configRoutes($stateProvider, $locationProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/login');

  $locationProvider.html5Mode(true).hashPrefix('!');

	$stateProvider
	/*	.state('home-page', {
			url: '/',
			component: 'homePage'
		})
	*/
		.state('login-page', {
			url: '/login',
			component: 'loginPage'
		})
		.state('register-page', {
			url: '/register',
			component: 'registerPage'
		})		
		.state('send-content-page', {
			url: '/transfer',
			component: 'sendContentPage'
		});

}