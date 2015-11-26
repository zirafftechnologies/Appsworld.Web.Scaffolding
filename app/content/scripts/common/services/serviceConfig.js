(function () {
    'use strict';

    var serviceId = 'seviceConfig';
    angular.module('appsworld').factory(serviceId, [seviceConfig]);

    function seviceConfig() {

        var serverName = {
            //Old azurewebsites URL's

            //clientCursor: 'http://appsworldapicheck.azurewebsites.net/',
            //authRemoteServer: 'http://awbeanapi.azurewebsites.net/',
            //clientCursorServerclient: 'http://appsworldapiclient.azurewebsites.net/',
            ////clientCursorServerclient: 'http://localhost:2030/',
            //apiCursors: 'http://appsworldapicursors.azurewebsites.net/',
            //identityAuth: 'http://awidentityauth.azurewebsites.net/'
            
            ////New azurewebsites URL's

            //clientCursor: 'http://awapiclientind.azurewebsites.net/',
            //authRemoteServer: 'http://awapibeanind.azurewebsites.net/',
            //clientCursorServerclient: 'http://awapiclientind.azurewebsites.net/',
            //apiCursors: 'http://awapibeanind.azurewebsites.net/',
            //identityAuth: 'http://awidentityauthind.azurewebsites.net/'

            //local urls

            //clientCursor: 'http://192.168.0.158/awclientapi/',
            //authRemoteServer: 'http://192.168.0.158/awapibean/',
            //clientCursorServerclient: 'http://192.168.0.158/awclientapi/',
            //apiCursors: 'http://192.168.0.158/awapibean/',
            //identityAuth: 'http://192.168.0.158/awauthapi/'

            clientCursor: 'http://49.207.6.75/awclientapi/',
            authRemoteServer: 'http://49.207.6.75/awapibean/',
            clientCursorServerclient: 'http://49.207.6.75/awclientapi/',
            apiCursors: 'http://49.207.6.75/awapibean/',
            identityAuth: 'http://49.207.6.75/awauthapi/'

            //clientCursor: 'http://49.207.6.75/awclientapiuat/',
            //authRemoteServer: 'http://49.207.6.75/awbeanapiuat/',
            //clientCursorServerclient: 'http://49.207.6.75/awclientapiuat/',
            //apiCursors: 'http://49.207.6.75/awbeanapiuat/',
            //identityAuth: 'http://49.207.6.75/awauthapiuat/'
        }
        var serviceName = {
            authService: 'api/beanmaster/',
            clientService: 'breeze/ClientCursor/',
            elasticSearchService: 'api/ElasticSearch/',
            commonService: 'api/Common/',
            opportunityService: 'api/Opportunity/',
            mastermanagementService: 'breeze/mastermanagement/',
            leadService: 'breeze/Leads/',
            accountService: 'breeze/Account/',
            AzureStorageService: 'breeze/AzureStorage/',
            QuotationService: 'api/quotation/',
            activityService:'api/'
        }
        var service = {
            remoteServer: serverName.clientCursorServerclient,
            curserRemoteServer: serverName.authRemoteServer,
            checkRemoteServer: serverName.clientCursorServerclient,
            authenticationRemoteServer: serverName.authRemoteServer + serviceName.authService,
            commonRemoteServer: serverName.authRemoteServer + serviceName.commonService,
            clientCursorRemoteServer: serverName.clientCursorServerclient + serviceName.clientService,
            elasticSearchRemoteServer: serverName.authRemoteServer + serviceName.elasticSearchService,
            opportunityRemoteServer: serverName.authRemoteServer + serviceName.opportunityService,
            baseRemoteServer: serverName.authRemoteServer,
            mastermanagementRemoteServer: serverName.clientCursorServerclient + serviceName.mastermanagementService,
            clientCursorClientRemoteServer: serverName.clientCursorServerclient + serviceName.clientService,
            leadRemoteServer: serverName.authRemoteServer+serviceName.leadService,
            leadCursorServer: serverName.clientCursorServerclient + serviceName.leadService,
            clientCursorClientRemoteServerapi: serverName.clientCursorServerclient + serviceName.clientService,
            accountRemoteServerapi: serverName.clientCursorServerclient + serviceName.accountService,
            apiCursorsRemoteServer: serverName.apiCursors + serviceName.commonService,
            AzureStorageRemoteServer: serverName.clientCursorServerclient + serviceName.AzureStorageService,
            QuotationRemoteServer: serverName.identityAuth + serviceName.QuotationService,
            activityRemoteServer: serverName.identityAuth + serviceName.activityService
        }

        return service;
    }

})();
