/// <reference path="../../client/leads/leadtask.html" />
/// <reference path="../../client/activities/leadactivity/leadtask.html" />
'use strict';
/**
 * @ngdoc overview
 * @name appsworld
 * @description
 * # appsworld
 *
 * Main module of the application.
 */
angular
  .module('appsworld', [
      //'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngTouch',
      'LocalStorageModule',
      'formly',
      'formlyBootstrap',
      'kendo.directives',
      'picardy.fontawesome',
      'ui.bootstrap',
      'ui.tree',
      'ui.router',
      'ui.utils',
      'angular-loading-bar',
      'angular-momentjs',
      'toastr',
      'smart-table',
      'angular-flot',
      'ui.sortable',
      //Custom Modules
      'common.bootstrap',
      'ZValidations',
      'companySetUp',
      'controlCodes',
      'gridColumns',
      'addressbook'
     ])

.value('config', {

    remoteServiceName: 'breeze/Breeze',
    remoteServer: 'http://appsworldapicheck.azurewebsites.net/', //'http://condoapi.cloudapp.net',
    beanremoteServer: 'http://appsworldapicursors.azurewebsites.net/',
    beanAtbeanmaster: 'api/beanmaster/',
    clippedAtAcRemoteServiceName: '/breeze/MasterManagement',
    clippedAtLeRemoteServiceName: '/breeze/Leads',
    clippedAtWdRemoteServiceName: '/breeze/Widgets',
    applicationUrl: 'http://localhost:17819/#/',
    clippedAtRemoteServiceName: '/Api/globalmaster',
    clientCursor: '/breeze/ClientCursor'

  })
  .run(['$rootScope', '$state', '$http', '$stateParams', 'config', function ($rootScope,
    $state, $http, $stateParams,config) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $http.defaults.transformRequest.push(function(data) {
      $rootScope.progress = true;
      return data;
    });
    $http.defaults.transformResponse.push(function(data) {
      $rootScope.progress = false;
      return data;
    });     
    $rootScope.$on('$stateChangeStart', function (data) {
        $rootScope.prevUrl = data.currentScope.$state.current.name;
    })
    window.onbeforeunload = function (event) {
        var data = { "url": $state.current.name, "companyId": config.companyId, "userName": config.userName, "companyName": config.companyName, "userRole": config.userRole, "params": $state.params,selectedCursor:$rootScope.selectedCursor,dateFormat:config.dateFormat,currency:config.currency };
        if (window.localStorage.getItem('TokenManager.token') != null&&$state.current.name!='app.routeMediate'&&config.companyId!==undefined&&config.companyId!==null&&config.userName!=undefined&&config.userName!=null) {
            window.localStorage.setItem('userInfo', JSON.stringify(data));
        }
    }
  }])
    .config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            extendedTimeOut: 1000,
            tapToDismiss: false,
            timeOut: 10000
        });
    })
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,
  $urlRouterProvider) {
    $urlRouterProvider.otherwise('app/routeMediate');
    $urlRouterProvider.when("/app/settings", "/app/settings/Financial");
    $urlRouterProvider.when("/app/ccsettings", "/app/ccsettings/autonumbering");
    $urlRouterProvider.when("/app/activities", "/app/activities/tasks");
    $urlRouterProvider.when("/app/lead_addEdit/leadactivity", "/app/lead_addEdit/leadactivity/task");
    $urlRouterProvider.when("/app/vendor_addEdit/vendoractivity", "/app/vendor_addEdit/vendoractivity/tasks");

  $stateProvider
    .state('app', {
      abstract: true,
      url: '/app',
      templateUrl: 'views/tmpl/app.html'
    })
    .state('app.callback', {
      url: '/callback',
      templateUrl: 'views/callback.html'
    })
    .state('app.dashboard', {
      url: '/dashboard',
      templateUrl: 'views/tmpl/dashboard.html',
      data: {
        pageTitle: 'Dashboard'
      }
    })
    .state('app.company', {
      url: '/Companies',
      templateUrl: 'bean/companies/companies.html',
      data: {
        pageTitle: 'Companies'
      }
    })
  .state('app.company_addEdit', {
      url: '/Company?id?isView',
      templateUrl: 'bean/companies/company.html',
      data: {
        pageTitle: 'Company'
      }
    })
    .state('app.coas', {
      url: '/ChartOfAccounts',
      templateUrl: 'bean/chartofaccounts/chartofaccounts.html',
      data: {
        pageTitle: 'Chart Of Accounts'
      }
    })
    .state('app.coa', {
      url: '/ChartOfAccount?id?isView',
      templateUrl: 'bean/chartofaccounts/chartofaccount.html',
      data: {
        pageTitle: 'Chart Of Account'
      }
    })
     .state('app.accounttypes', {
         url: '/Accounttypes',
         templateUrl: 'bean/chartofaccounts/accounttypes.html',
           data: {
               pageTitle: 'Account Types'
           }
       })
    .state('app.controlCodes', {
      url: '/controlCodes',
      templateUrl: 'admin/controlCodes/controlCodes.html',
      data: {
        pageTitle: 'Control Codes'
      }
    })
    .state('app.controlCode', {
      url: '/controlCode?id?val?module',
      templateUrl: 'admin/controlCodes/controlCode.html',
      data: {
        pageTitle: 'Control Code'
      }
    })

  .state('app.vendors', {
      url: '/vendors',
      templateUrl: 'client/vendor/vendors.html',
      data: {
        pageTitle: 'Vendors'
      }
    })
      .state('app.basictree', {
          url: '/basictree',
          templateUrl: 'treeview/basictreeview/basictree.html',
          data: {
              pageTitle: 'BasicTree'
          },
         // controller: 'BasicExampleCtrl'
      })
    .state('app.contacts', {
      url: '/contacts/:Letter',
      templateUrl: 'client/contacts/contacts.html',
      data: {
        pageTitle: 'Contacts'
      }
    })
    .state('app.vendor_addEdit', {
      url: '/vendor?id?val',
      templateUrl: 'client/vendor/vendor.html',
      data: {
        pageTitle: 'Vendor'
      }
    })

       .state('app.vendor_addEdit.vendoractivity', {
           url: '/vendoractivity',
           templateUrl: 'client/activities/vendoractivity.html',
           data: {
               pageTitle: 'vendoractivity'
           }
       })
       .state('app.vendor_addEdit.vendoractivity.tasks', {
           url: '/vendortasks',
           templateUrl: 'client/activities/tasks/vendortasks.html',
           data: {
               pageTitle: 'vendortasks'
           }
       })
       .state('app.vendor_addEdit.vendoractivity.events', {
           url: '/vendorevents',
           templateUrl: 'client/activities/events/vendorevents.html',
           data: {
               pageTitle: 'vendorevents'
           }
       })
       .state('app.vendor_addEdit.vendoractivity.notes', {
           url: '/vendornotes',
           templateUrl: 'client/activities/notes/vendornotes.html',
           data: {
               pageTitle: 'vendornotes'
           }
       })
    .state('app.servicegroups', {
      url: '/servicegroups',
      templateUrl: 'admin/serviceGroup/serviceGroups.html',
      data: {
        pageTitle: 'Service Groups'
      }
    })
    //.state('app.generalsettings', {
    //    url: '/generalsettings/:state',
    //    templateUrl: 'admin/generalsettings/generalsettings.html'
    //})
    //.state('app.ccsettings', {
    //  url: '/ccsettings',
    //  templateUrl: 'client/clientsettings/clientsettings.html',
    //  data: {
    //    pageTitle: 'Client Settings'
    //  }
    //})
       .state('app.ccsettings', {
           url: '/ccsettings',
           templateUrl: 'client/clientsettings/autonumbering/autonumbersetting.html',
           data: {
               pageTitle: 'ccsettings'
           }
       })
      .state('app.ccsettings.autonumbering', {
          url: '/autonumbering',
          templateUrl: 'client/clientsettings/autonumbering/autonumbering.html'
      })
    .state('app.autonumberingdetail', {
      url: '/autonumberingdetail/:mode/:id',
      templateUrl: 'client/clientsettings/autonumbering/autonumberingdetail.html'
    })

    .state('app.generalsettings', {
      url: '/generalsettings/:state',
      templateUrl: 'admin/generalsettings/generalsettings.html'
    })
    .state('app.opportunities', {
      url: '/opportunities',
      templateUrl: 'client/opportunity/opportunities.html',
      data: {
        pageTitle: 'Opportunities'
      }
    })
    .state('app.Quotationopportunity_addEdit', {
        url: '/Quotationopportunity?id?val?Quoteno',
        templateUrl: 'client/opportunity/opportunity.html',
      data: {
        pageTitle: 'Opportunity'
      }
    }).state('app.QuotationGenerationopportunity_addEdit', {
        url: '/QuotationGenerationopportunity?id?val?Quoteno?Oppnos',
        templateUrl: 'client/opportunity/opportunity.html',
        data: {
            pageTitle: 'Opportunity'
        }
    }).state('app.opportunity_addEdit', {
        url: '/opportunity?id?val',
        templateUrl: 'client/opportunity/opportunity.html',
        data: {
            pageTitle: 'Opportunity'
        }
    })
    .state('app.userprofile', {
      url: '/userprofile',
      templateUrl: 'admin/userprofile/editprofile.html',
      data: {
        pageTitle: 'User Profile'
      }
    })
    .state('app.forexes', {
      url: '/forexes',
      templateUrl: 'bean/forex/forexes.html',
      data: {
        pageTitle: 'Forexes'
      }
    })
    .state('app.forex', {
      url: '/forex?id?type?val?currency',
      templateUrl: 'bean/forex/forex.html',
      data: {
        pageTitle: 'Forex'
      }
    })
    .state('app.campaigns', {
      url: '/campaigns',
      templateUrl: 'client/campaign/campaigns.html',
      data: {
        pageTitle: 'Campaigns'
      }
    })
    .state('app.campaign', {
      url: '/campaign?id?isView',
      templateUrl: 'client/campaign/campaign.html',
      data: {
        pageTitle: 'Campaign'
      }
    })
    .state('app.leads', {
      url: "/Leads",
      templateUrl: "client/leads/leads.html",
      data: {
        pageTitle: 'Leads'
      }

    })
    
    .state('app.template', {
        url: "/template",
        templateUrl: "client/template/template.html",
        data: {
            pageTitle: 'Template'
        }

    })
    .state('app.templates', {
        url: "/templates",
        templateUrl: "client/template/templates.html",
        data: {
            pageTitle: 'Templates'
        }

    })
    .state('app.quotations', {
        url: "/quotations",
        templateUrl: "client/quotation/quotations.html",
        data: {
            pageTitle: 'Quotations'
        }

    })
    .state('app.reminders', {
        url: "/reminders",
        templateUrl: "client/reminders/reminders.html",
        data: {
            pageTitle: 'Reminders'
        }

    })
    .state('app.reminder', {
        url: "/reminder",
        templateUrl: "client/reminders/reminder.html",
        data: {
            pageTitle: 'Reminder'
        }

    })
    .state('app.documents', {
        url: "/documents",
        templateUrl: "client/document/documents.html",
        data: {
            pageTitle: 'Documents'
        }

    })
    //.state('app.opportunityquote', {
    //    url: "/opportunityquote",
    //    templateUrl: "client/quotation/opportunityquote.html",
    //    data: {
    //        pageTitle: 'OpportunityQuote'
    //    }

    //})
    .state('app.document', {
        url: "/document",
        templateUrl: "client/document/document.html",
        data: {
            pageTitle: 'Document'
        }

    })
      .state('app.activities', {
          url: '/activities',
          templateUrl: 'client/activities/activity.html',
        
          data: {
              pageTitle: 'activities'
          }
      })
    .state('app.activities.events', {
        url: '/events?id?isView',
        templateUrl: 'client/activities/events/events.html',
        data: {
            pageTitle: 'Events'
        }
    })
    .state('app.activities.notes', {
        url: '/notes?id?isView',
        templateUrl: 'client/activities/notes/notes.html',
        data: {
            pageTitle: 'Notes'
        }
    })
    .state('app.activities.tasks', {
        url: '/tasks?id?isView',
        templateUrl: 'client/activities/tasks/tasks.html',
        data: {
            pageTitle: 'Tasks'
        }
    })
       .state('app.editOpportunity', {
           url: "/editOpportunity",
           templateUrl: "client/editOpportunity/editOpportunity.html",
           data: {
               pageTitle: 'Edit Opportunity'
           }

       })
      .state('app.opportunityQuote', {
          url: "/opportunityQuote?id?val",
          templateUrl: "client/opportunityQuote/opportunityQuoteGeneration.html",
          data: {
              pageTitle: 'opportunity Quote'
          }

      }).state('app.opportunityQuoteGeneration', {
          url: "/opportunityQuoteGeneration?id?val",
          templateUrl: "client/opportunityQuote/opportunityQuoteGeneration.html",
          data: {
              pageTitle: 'opportunity Quote'
          }

      })
    .state('app.emailQuote', {
        url: "/emailQuote",
        templateUrl: "client/emailQuote/emailQuote.html",
        data: {
            pageTitle: 'email Quote'
        }

    })
    .state('app.settings', {
      url: '/settings',
      templateUrl: 'bean/settings/settings.html',
      data: {
        pageTitle: 'Settings'
      }
    })
    .state('app.settings.financial', {
      url: '/Financial',
      templateUrl: 'bean/settings/financialSettings/financial.html',
      data: {
        pageTitle: 'Financial Settings'
      }
    })
    .state('app.settings.gst', {
      url: '/Gst',
      templateUrl: 'bean/settings/gstSettings/gst.html',
      data: {
        pageTitle: 'GST Settings'
      }
    })
    .state('app.settings.muilt', {
      url: '/MuiltCurrency',
      templateUrl: 'bean/settings/muiltCurrency/muiltCurrency.html',
      data: {
        pageTitle: 'Multi Currency'
      }
    })
    .state('app.settings.segment', {
        url: '/Segments',
        templateUrl: 'bean/settings/segmentReporting/segments.html',
        data: {
            pageTitle: 'Segments'
        }
    })

  //.state('app.segment', {
  //    url: '/Segment?id?isView',
  //    templateUrl: 'bean/settings/segmentReporting/segment.html',
  //    data: {
  //        pageTitle: 'Segment'
  //    }
  //})

    .state('app.taxCodes', {
      url: '/TaxCodes',
      templateUrl: 'bean/taxCode/taxCodes.html',
      data: {
        pageTitle: 'Tax Codes'
      }
    })
    .state('app.taxCode', {
      url: '/TaxCode?id?isView',
      templateUrl: 'bean/taxCode/taxCode.html',
      data: {
        pageTitle: 'Tax Code'
      }
    })

  .state('app.services', {
      url: '/Services',
      templateUrl: 'admin/service/services.html',
      data: {
        pageTitle: 'Services'
      }
    })
    .state('app.service', {
      url: '/Service?id?isView',
      templateUrl: 'admin/service/service.html',
      data: {
        pageTitle: 'Service'
      }
    })

  .state('app.lead_addEdit', {
      url: '/Lead?id?isView',
      templateUrl: 'client/leads/lead.html',
      data: {
        pageTitle: 'Lead'
      }
  })

      .state('app.lead_addEdit.leadopportunities', {
          url: '/leadopportunities',
          templateUrl: 'client/opportunity/opportunities.html',
          data: {
              pageTitle: 'Opportunities'
          }
      })
       
       .state('app.lead_addEdit.leadopportunity', {
           url: '/leadopportunity?leadid?leadval',
           templateUrl: 'client/opportunity/opportunity.html',
           data: {
               pageTitle: 'Opportunity'
           }
       })
      .state('app.lead_addEdit.leadactivity', {
          url: '/leadactivities',
          templateUrl: 'client/activities/leadactivitity.html',
          data: {
              pageTitle: 'leadactivities'
          }
         
      })
       .state('app.lead_addEdit.leadactivity.task', {
           url: '/leadtasks',
           templateUrl: 'client/leads/leadtask.html',
           data: {
               pageTitle: 'leadtasks'
           },
         
       })
        .state('app.lead_addEdit.leadactivity.events', {
            url: '/leadevents',
            templateUrl: 'client/activities/events/leadevents.html',
            data: {
                pageTitle: 'leadevents'
            }
        })
       .state('app.lead_addEdit.leadactivity.notes', {
           url: '/leadnotes',
           templateUrl: 'client/activities/notes/leadnotes.html',
           data: {
               pageTitle: 'leadnotes'
           }
       })
       

    .state('app.itemlists', {
      url: '/itemlists',
      templateUrl: 'bean/item/itemlists.html',
      data: {
        pageTitle: 'Item Lists'
      }
    })
    .state('app.itemlist_addEdit', {
      url: '/itemlist?id?val',
      templateUrl: 'bean/item/itemlist.html',
      data: {
        pageTitle: 'Item List'
      }
    })
    .state('app.currencycodes', {
      url: '/currencycodes',
      templateUrl: '/bean/currency/currencycodes.html',
      data: {
        pageTitle: 'Currency Codes'
      }
    })
    .state('app.currencycode', {
      url: '/currencycode/:state',
      templateUrl: '/bean/currency/currencycode.html',
      data: {
        pageTitle: 'Currency Code'
      }
    })
    .state('app.entities', {
      url: '/entities',
      templateUrl: 'bean/entity/entities.html',
      data: {
        pageTitle: 'Entities'
      }
    })
    .state('app.entity', {
      url: '/entity?id?val',
      templateUrl: 'bean/entity/entity.html',
      data: {
        pageTitle: 'Entity'
      }
    })   
      .state('app.routeMediate', {
          url: '/routeMediate',
          templateUrl: 'views/routemediator/routemediator.html',
          data: {
              pageTitle:'AppsWorld'
          }
      })
    .state('app.invoices', {
      url: '/invoices',
      templateUrl: 'bean/invoicing/invoices.html',
      data: {
        pageTitle: 'Invoices'
      }
    })
    .state('app.import', {
        url: '/import',
        templateUrl: 'audit/import/import.html',
      data: {
          pageTitle: 'Import'
      }
    })
    .state('app.mapping', {
        url: '/mapping',
        templateUrl: 'audit/import/mapping.html',
        data: {
            pageTitle: 'Mapping'
        }
    })
    .state('app.invoice', {
      url: '/invoice',
      templateUrl: 'bean/invoicing/invoice.html',
      data: {
        pageTitle: 'Invoice'
      }
    })
    .state('app.invoicing', {
        url: '/Invoicing?id?isView',
        templateUrl: 'bean/invoicing/invoicing.html',
        data: {
            pageTitle: 'Invoice'
        }
    })
    .state('app.debit', {
        url: '/debit',
        templateUrl: 'bean/debit/debit.html',
        data: {
            pageTitle: 'Debit'
        }
    })
    .state('app.doubtfuldebt', {
        url: '/doubtfuldebt',
        templateUrl: 'bean/doubtfuldebt/doubtfuldebt.html',
        data: {
            pageTitle: 'Doubtful debt'
        }
    })
    .state('app.creditnote', {
        url: '/creditnote',
        templateUrl: 'bean/creditnote/creditnote.html',
        data: {
            pageTitle: 'Credit Note'
        }
    })
    .state('app.credit', {
        url: '/credit',
        templateUrl: 'bean/credit/credit.html',
        data: {
            pageTitle: 'Credit'
        }
    })
    .state('app.addrole', {
        url: '/addrole',
        templateUrl: 'auth/addrole/addrole.html',
        data: {
            pageTitle: 'Add Role'
        }
    })
    .state('app.usercreation', {
        url: '/usercreation',
        templateUrl: 'auth/usercreation/usercreation.html',
        data: {
            pageTitle: 'User Creation'
        }
    })
    .state('app.notification', {
        url: '/notification',
        templateUrl: 'client/activities/notification/notification.html',
        data: {
            pageTitle: 'Notifications'
        }
    })
    .state('app.globalsearch', {
        url: '/globalsearch',
        templateUrl: 'auth/globalsearch/globalsearch.html',
        data: {
            pageTitle: 'Global Search'
        }
    })

  .state('app.accountTypeTerms', {
    url: '/accountTypeTerms/:source',
    templateUrl: 'client/masteraccount/accountTypeTerms.html',
    data: {
        pageTitle: 'AppsWorld'
    }
  })
    // POC Oriented Routings define  only  
    .state('app.poc', {
        url: '/POC',
        templateUrl: 'pocconcepts/poc.html',
        data: {
            pageTitle: 'POC Concepts'
        }
    })
    .state('app.poc.autocomplete', {
        url: '/POCAutoCmptl',
        templateUrl: 'pocconcepts/autocomplete.html'
    })
    .state('app.poc.editablegrid', {
        url: '/POCEditablegrid',
        templateUrl: 'pocconcepts/editablegrid.html'
    })
    .state('app.poc.formly', {
        url: '/Formly',
        templateUrl: 'pocconcepts/angularformlyWithModel.html'
    })
    
 .state('app.poc.angulargrid', {
    url: '/AngularGrid',
    templateUrl: 'pocconcepts/angularEditableGrid.html'
   })
  .state('app.journalentries', {
      url: '/journalentries',
      templateUrl: 'bean/journalEntry/journalEntries.html',
      data: {
          pageTitle: 'Journal Entries'
      }
  })
}]);
