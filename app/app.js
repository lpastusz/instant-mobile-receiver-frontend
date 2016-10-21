angular
	.module('app', ['ui.router', 'ngResource', 'ngStorage', 'ngFileUpload'])
	.run(runConfig)
	.config(configAuthentication);


function runConfig($rootScope, $state, $stateParams, $window) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
    if ($window.location.hostname == 'localhost') {
        $rootScope.$restUrl = 'http://localhost:8008/api';    
    }
	else {
        $rootScope.$restUrl = 'http://instantmobilereceiverapi.kc9vavbsgu.us-west-2.elasticbeanstalk.com/api';  
    }
	$rootScope.$basicAuth = 'Basic d2ViX2NsaWVudDp4eHg=';
}


function configAuthentication($httpProvider) {

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage',
            function($q, $location, $localStorage) {

                function setAuthHeader(headers) {
                    headers = headers || {};
                    if ($localStorage.token) {
                        headers.Authorization = $localStorage.token;
                    }
                  
                }

                function isSetAuthHeader(headers) {
                    return !!headers.Authorization;
                }

                return {
                    'request': function(config) {

                        var headers = config.headers || {};
		                    if ($localStorage.token && config.url.search('user/login') === -1) {
		                        headers.Authorization = $localStorage.token;
		                    }

                        if (!isSetAuthHeader(config.headers)) {
                            if ($location.path() !== '/login') {
                                $location.path('/login');
                            }
                        }

                        return config;
                    },

                    'responseError': function(response) {
                        if (response.status === 401 || response.status === 403) {
                            $location.path('/login');
                        }
                        return $q.reject(response);
                    }
                };
            }
        ]);  

}