
(function() {
  'use strict';

  var gridColumn = angular.module('gridColumns', []);
  gridColumn.factory('gridCols', function (config) {
    return {
      Lead: function() {
        return [{
            template: ' <label class="checkbox checkbox-custom-alt checkbox-custom-sm m-0"> <input type="checkbox" id="{{dataItem.Id}}" name="checkbox-inline" ng-checked="vm.selection.indexOf(dataItem) > -1" ng-click="vm.toggleSelection(dataItem)" /><i></i> </label>',
          width: '50px'
        }, {
          field: 'Name',
          title: "Lead Name",
          width: '250px',
          template: '<a href="" ng-click="vm.getViewMode(dataItem)">${Name}</a>'
        }, {
          field: 'AccountIncharge',
          title: 'Account Incharge',
          width: '250px'
        }, {
          field: 'AccountStatus',
          title: 'Lead Status',
          width: '200px'
        }, {
          field: 'CreatedDate',
          title: "Created Date",
          width: '200px',
          template: "#= kendo.toString(kendo.parseDate(CreatedDate, 'yyyy-MM-dd'), 'dd/MM/yyyy') #"
        }]
      },
      Company: function() {
        return [{
            template: ' <label class="checkbox checkbox-custom-alt checkbox-custom-sm m-0"> <input type="checkbox" id="{{dataItem.Id}}" name="checkbox-inline" ng-checked="vm.selection.indexOf(dataItem) > -1" ng-click="vm.toggleSelection(dataItem)" /><i></i> </label>',
          width: '50px'
        }, {
          field: 'Name',
          template: '<a href="" ng-click="vm.getViewMode(dataItem)">${Name}</a>',
          attributes: {
            style: "text-align:left;  padding:0.1em 8em 0.1em 0.5em !important"
          },
          title: "Company Name",
          width: '300px'
        },
        {
            field: "UserCreated",
            title: "Created By",
            width: '200px'
        },
        {
          field: "CreatedDate",
          title: "Created Date",
          width: '200px',
          template: "#= kendo.toString(kendo.parseDate(CreatedDate, 'yyyy-MM-dd'), 'dd/MM/yyyy') #",
        },
        //{
        //    field: "Expirydate",
        //    title: "Expiry Date",
        //    width: '200px',
        //    template: "#= kendo.toString(kendo.parseDate(Expirydate, 'yyyy-MM-dd'), 'dd/MM/yyyy') #",
        //},
        
         {
           field: "Expirydate",
           title: "Expiry Date",
           width: '200px',
          // template: "#= kendo.toString(kendo.parseDate(Expirydate, 'yyyy-MM-dd'), 'dd/MM/yyyy') #",
           type: "date", format: "{0:dd/MM/yyyy}"
         },
        {
          field: 'Status',
          title: "Status",
          template: '<lable>#:Status#</lable>',
          width: '150px'
        }]
      },
      SubCompany: function() {
        return [{
            template: '<label class="checkbox checkbox-custom-alt checkbox-custom-sm m-0"> <input type="checkbox" id="{{dataItem.Id}}" name="checkbox-inline" ng-checked="vm.selection.indexOf(dataItem) > -1" ng-click="vm.toggleSelection(dataItem)" /><i></i> </label>',
          width: '50px'
        }, {
          field: 'Name',
          template: '<a href="" ng-click="vm.getViewMode(dataItem)">${Name}</a>',
          attributes: {
            style: "text-align:left;  padding:0.1em 3em 0.1em 0.5em !important"
          },
          title: "Company Name",
          width: '250px'
        }, {
          field: 'ShortName',
          title: 'Short Name',
          width: '250px'
        }, {
          field: 'RegistrationNo',
          title: "RegistrationNo",
          width: '250px'
        }, {
          field: "UserCreated",
          title: "Created By",
          width: '250px'
        }, {
          field: 'Status',
          title: "Status",
          template: '<lable>#:Status#</lable>',
          width: '150px'
        }]
      },
      Opportunity: function() {
        return [{
            headerTemplate: '<input type="checkbox" id="eq1" class="k-checkbox rme"><label class="k-checkbox-label ml-15 mtm-20 pull-left" for="eq1"></label>',
            template: '<label class="checkbox checkbox-custom-alt"> <input type="checkbox" id="{{dataItem.Id}}" name="checkbox-inline" ng-checked="vm.selection.indexOf(dataItem) > -1" ng-click="vm.toggleSelection(dataItem)"><i></i></label>',
            width: '50px'
          },

          {
            field: 'Name',
            title: "Opportunity Name",
            width: '100px'
          }, {
            field: 'Type',
            title: 'Account/Lead',
            width: '100px'
          }, {
            field: 'Nature',
            title: 'Service Code',
            width: '100px'
          }, {
            field: 'FeeType',
            title: 'Service Comapny',
            width: '100px'
          }, {
            field: 'Fee',
            title: 'Fee',
            width: '70px'
          }, {
            field: 'CreatedDate',
            title: 'From & Todate',
            type: "date",
            width: '100px',
            format: "{0:dd-MMM-yyyy}",
            parseFormats: ["yyyy-MM-dd'T'HH:mm:ss.zz"]
          }, {
            field: "Status",
            title: "State",
            template: _statusType,
            width: '80px'
          },
        ]
      },
      Vendors: function() {
        return [

          {
            template: '  <label class="checkbox checkbox-custom-alt checkbox-custom-sm m-0"> <input type="checkbox" id="{{dataItem.Id}}" name="checkbox-inline" ng-checked="vm.selection.indexOf(dataItem) > -1" ng-click="vm.toggleSelection(dataItem)" /><i></i> </label>',
            width: '50px'
          }, {
            field: 'Name',
            template: '<a href="" ng-click="vm.getViewMode(dataItem)">${Name}</a>',
            title: "Name",
            width: "200px"
          }, {
            field: "UserCreated",
            title: "User Created",
            width: "180px"
          }, {
            field: "CreatedDate",
            title: "Date Of Creation",
            template: '<lable>{{dataItem.CreatedDate| date}}</lable>',
            width: "160px"
          }, {
            field: "AddressBook.Phone",
            title: "Communication",
            template: _communicationType,
            width: "200px"
          }, {
            field: "Status",
            title: "Status",
            width: '120px'
          }
        ]
      },
      ControlCodes: function() {
        return [
         { template: '<input type="checkbox" id="{{dataItem.Id}}" class="k-checkbox rme" ng-checked="vm.selection.indexOf(dataItem.Id) > -1" ng-click="vm.toggleSelection(dataItem.Id,dataItem.Status,dataItem.ModuleNamesUsing)"><label class="k-checkbox-label pull-left" for="{{dataItem.Id}}"></label>', width: '50px' },
         { field: 'ControlCodeCategoryCode', template: '<a href="" ng-click="vm.getViewMode(dataItem.Id,dataItem.ModuleNamesUsing)">${ControlCodeCategoryCode}</a>', title: "Category", filterable: { cell: { operator: "contains" } }, width:"300px" },
         { field: "ModuleNamesUsing", title: "Modulenames Using", width: "300px" }
         
        ]
      },
      ForexBaseCurrency: function() {
        return [

          {
            template: '<input type="checkbox" id="{{dataItem.Id}}" class="k-checkbox rme" ng-checked="vm.selection.indexOf(dataItem) > -1" ng-click="vm.toggleSelection(dataItem)"><label class="k-checkbox-label pull-left" for="{{dataItem.Id}}"></label>',
            width: '50px'
          }, {
            field: 'DateFrom',
            template: '<a href="" ng-click="vm.view(dataItem.Id,dataItem.DateFrom)">#= kendo.format("{0:' + config.dateFormat + '}", DateFrom) #</a>',
            title: "Date From",
            type: "date", format: '{0: ' + config.dateFormat + '}',
            filterable: {
              ui: function(element) {
                element.kendoDatePicker({
                  format: "dd/MM/yyyy"
                })
              }
            }
          }, {
            field: "Dateto",
            title: "Date To",
            type: "date", format: '{0: ' + config.dateFormat + '}',
            parseFormats: ["yyyy-MM-dd'T'HH:mm:ss.zz"],
            filterable: {
              ui: function(element) {
                element.kendoDatePicker({
                  format: "dd/MM/yyyy"
                })
              }
            }
          }, {
            field: "Currency",
            title: "Currency",
            filterable: {
              cell: {
                operator: "contains"
              }
            }
          }, {
            field: "UnitPerUSDStr",
            title: "Unit per " + '{{vm.baseCurrency}}',
            filterable: {
              cell: {
                operator: "contains"
              }
            }
          }, {
            field: "USDPerUnit",
            title: '{{vm.baseCurrency}}' + " Per Unit",
            template: '#= kendo.toString(1/UnitPerUSD, "n8")# ',
            filterable: {
              cell: {
                operator: "contains"
              }
            }
          }, {
            field: "Status",
            title: "Status",
            filterable: {
              cell: {
                operator: "contains"
              }
            }
          }
        ]
      },
      ForexGstCurrency: function() {
        return [

          {
            template: '<input type="checkbox" id="{{dataItem.Id}}" class="k-checkbox rme" ng-checked="vm.selection.indexOf(dataItem) > -1" ng-click="vm.toggleSelection(dataItem)"><label class="k-checkbox-label pull-left" for="{{dataItem.Id}}"></label>',
            width: '50px'
          }, {
            field: 'DateFrom',
            template: '<a href="" ng-click="vm.view1(dataItem.Id,dataItem.DateFrom)">#= kendo.format("{0:' + config.dateFormat + '}", DateFrom) #</a>',
            title: "Date From",
            type: "date", format: '{0: ' + config.dateFormat + '}',
            filterable: {
              ui: function(element) {
                element.kendoDatePicker({
                  format: "dd/MM/yyyy"
                })
              }
            }
          }, {
            field: "Dateto",
            title: "Date To",
            type: "date", format: '{0: ' + config.dateFormat + '}',
            parseFormats: ["yyyy-MM-dd'T'HH:mm:ss.zz"],
            filterable: {
              ui: function(element) {
                element.kendoDatePicker({
                  format: "dd/MM/yyyy"
                })
              }
            }
          },{
            field: "Currency",
            title: "Currency",
            filterable: {
              cell: {
                operator: "contains"
              }
            }
          }, {
            field: "UnitPerUSDStr",
            title: "Unit per  GST <br> Reporting " +
              '{{vm.GSTRepoCurrency}}',
            filterable: {
              cell: {
                operator: "contains"
              }
            }
          }, {
            field: "USDPerUnit",
            title: "GST Reporting <br>" + '{{vm.GSTRepoCurrency}}' +
              " Per Unit",
            template: '#= kendo.toString(1/UnitPerUSD, "n8")# ',
            filterable: {
              cell: {
                operator: "contains"
              }
            }
          }, {
            field: "Status",
            title: "Status",
            filterable: {
              cell: {
                operator: "contains"
              }
            }
          }
        ]
      },
      Campaign: function() {
        return [{
            template: '  <label class="checkbox checkbox-custom-alt checkbox-custom-sm m-0"> <input type="checkbox" id="{{dataItem.Id}}" name="checkbox-inline" ng-checked="selection.indexOf(dataItem) > -1" ng-click="toggleSelection(dataItem)" /><i></i> </label>',
            width: '50px'
          }, {
            field: 'Code',
            template: '<a href="" ng-click="getViewMode(dataItem.Id)">${Code}</a>',
            title: 'Code',
            filterable: {
              cell: {
                operator: "contains"
              }
            },
            width: '100px'
          }, {
            field: 'Name',
            title: 'Name',
            filterable: {
              cell: {
                operator: "contains"
              }
            },
            width: '100px'
          }, {
            field: 'CampaignOwner',
            title: 'Campaign Owner',
            filterable: {
              cell: {
                operator: "contains"
              }
            },
            width: '200px'
          }, {
            field: 'CampaignType',
            title: 'Campaign Type',
            filterable: {
              cell: {
                operator: "contains"
              }
            },
            width: '200px'
          }, {
            field: 'CampaignStatus',
            title: 'Campaign Status',
            filterable: {
              cell: {
                operator: "contains"
              }
            },
            width: '100px'
          }

        ]
      },
      COA: function() {
        return [{
            template: '  <label class="checkbox checkbox-custom-alt checkbox-custom-sm m-0"> <input type="checkbox" id="{{dataItem.Id}}" name="checkbox-inline" ng-checked="vm.selection.indexOf(dataItem) > -1" ng-click="vm.toggleSelection(dataItem)" /><i></i> </label>',
            width: '50px'
          }, {
            field: 'Code',
            template: '<a href="" ng-click="vm.getViewMode(dataItem)">${Code}</a>',
            title: 'Account Code',
            filterable: {
              cell: {
                operator: "contains"
              }
            },
            width: '170px'
          }, {
            field: 'Name',
            title: 'Account Name',
            filterable: {
              cell: {
                operator: "contains"
              }
            },
            width: '260px'
          }, {
            field: 'AccountType.Name',
            title: 'Account Type',
            width: '270px'
          }, {
            field: "IsSystem",
            title: 'IsSystem',
            width: '100px'
          }, {
            field: "Status",
            title: 'Account Status',
            width: '150px'
          }

        ]
      },
      TaxCodes: function() {
        return [
                    {template: '<input type="checkbox" id="{{dataItem.Id}}" class="k-checkbox rme" ng-checked="vm.selection.indexOf(dataItem.Id) > -1" ng-click="vm.toggleSelection(dataItem.Id,dataItem.Status)"><label class="k-checkbox-label pull-left" for="{{dataItem.Id}}"></label>', width: '50px'},
                     { field: 'Code', template: '<a href="" ng-click="vm.getViewMode(dataItem.Id)">${Code}</a>', title: "Tax Code", width: '150px' },
                     { field: 'Name', title: 'Tax Code Name', width: '250px'},
                     { field: 'TaxType', title: 'Tax Type', width: '150px' },
                     { field: "AppliesTo", title: 'Supplies/Purchases', width: '200px' },
                     { field: "TaxRate", title: 'Tax Rate', width: '150px' },
                     { field: "EffectiveFrom", width: '200px', title: 'Effective From', type: "date", format: '{0:'+config.dateFormat+'}', parseFormats: ["yyyy-MM-dd'T'HH:mm:ss.zz"], filterable: { ui: function (element) { element.kendoDatePicker({ format: "dd/MM/yyyy" }) } } },
                    { field: "Status", title: 'Status', width: '200px' }

        ]
      },
      Itemlist: function() {
        return [{

            template: '<input type="checkbox" id="{{dataItem.Id}}" class="k-checkbox rme" ng-checked="vm.selection.indexOf(dataItem.Id) > -1" ng-click="vm.toggleSelection(dataItem.Id,dataItem.Status,dataItem.DateFrom)"><label class="k-checkbox-label pull-left" for="{{dataItem.Id}}"></label>',
            width: '50px'
          },


          {
            field: "Code",
            template: '<a href="" ng-click="vm.getViewMode(dataItem.Id)">${Code}</a>',
            title: "Code", width:"200px",
            filterable: {
              cell: {
                operator: "contains"
              }
            }
          }, {
            field: "Description",
            title: 'Description', width: "200px",
            filterable: {
              cell: {
                operator: "contains"
              }
            }
          }, {
            field: "UOM",
            title: "Unit", width: "200px",
            filterable: {
              cell: {
                operator: "contains"
              }
            }
          }, {
            field: "UnitPrice",
            title: 'UnitPrice', width: "200px",
            filterable: {
              cell: {
                operator: "contains"
              }
            }
          }, {
            field: "Status",
            title: "Status", width: "200px",
            filterable: {
              cell: {
                operator: "contains"
              }
            }
          }

        ]
      },
      Autonumbering: function() {
        return [{
            template: '<input type="checkbox" id="{{dataItem.Id}}" class="k-checkbox rme" ng-checked="vm.selection.indexOf(dataItem) > -1" ng-click="vm.toggleSelection(dataItem)"><label class="k-checkbox-label pull-left" for="{{dataItem.Id}}"></label>',
            width: '50px'
          },
          {
            field: "EntityType",
            title: "Type",
            template: '<a data-ng-click="vm.check()" ui-sref="app.autonumberingdetail({mode:' +
                "'view'" + ', id: dataItem.Id})" >${EntityType}</a>',
            width: "150px"
          }, {
            field: "Description",
            title: "Description",
            width: "150px"
          }, {
            field: "Preview",
            title: "Preview",
            width: "150px"
          }, {
            field: "Reset",
            title: "Reset",
            width: "180px"
          },

        ]
      },
      Entity: function() {
          return [
                { template: '<input type="checkbox" id="{{dataItem.Id}}" class="k-checkbox rme" ng-checked="vm.selection.indexOf(dataItem.Id) > -1" ng-click="vm.toggleSelection(dataItem.Id,dataItem.Status)"><label class="k-checkbox-label pull-left" for="{{dataItem.Id}}"></label>', width: '50px' },
               { field: "Name", title: 'Name', template: '<a href="" ng-click="vm.getViewMode(dataItem.Id)">${Name}</a>', filterable: { cell: { operator: "contains" } }, width:"200px" },
               { field: "CustNature", title: 'Customer Nature', filterable: { cell: { operator: "contains" } }, width: "200px" },
               { field: "VenNature", title: 'Vendor Nature', filterable: { cell: { operator: "contains" } }, width: "200px" },
               { field: "Status", title: "Status", width: "200px" }

          ]
      },
      masterGrids: function(key) {
        switch (key.toLowerCase()) {
          case 'termsofpayment':
            return [{
              template: '<input type="checkbox" id="{{dataItem.Id}}" class="k-checkbox rme" ng-checked="vm.selection.indexOf(dataItem) > -1" ng-click="vm.toggleSelection(dataItem)"><label class="k-checkbox-label pull-left" for="{{dataItem.Id}}"></label>',
              width: '50px'
            }, {
              field: "Name",
              title: "Name",
              template: '<a data-ng-click="vm.check()" ui-sref="app.master({form:$stateParams.form, mode:' +
                "'view'" + ', id: dataItem.Id})" >${Name}</a>'
            }, {
              field: "TermsType",
              title: "Terms Type"
            }, {
              field: "TOPValue",
              title: "Value"
            }, {
              field: "Status",
              title: "Status"
            }]
            break;
          case 'idtype':
            return [{
              template: '<input type="checkbox" id="{{dataItem.Id}}" class="k-checkbox rme" ng-checked="vm.selection.indexOf(dataItem) > -1" ng-click="vm.toggleSelection(dataItem)"><label class="k-checkbox-label pull-left" for="{{dataItem.Id}}"></label>',
              width: '50px'
            }, {
              field: "Name",
              title: "Name",
              template: '<a data-ng-click="vm.check()" ui-sref="app.master({form:$stateParams.form, mode:' +
                "'view'" + ', id: dataItem.Id})" >${Name}</a>', width: "200px"
            },
            { field: "UserCreated", title: "User Created", width: "200px" },
            { field: "CreatedDate", title: "Date Of Creation",type: "date",
            format: '{0:'+config.dateFormat+'}', width: "200px"
            },
            {
              field: "Status",
              title: "Status", width: "200px"
            }]
            break;
            case 'accountsource':
                return [
                    { template: '<input type="checkbox" id="{{dataItem.Id}}" class="k-checkbox rme" ng-checked="vm.selection.indexOf(dataItem) > -1" ng-click="vm.toggleSelection(dataItem)"><label class="k-checkbox-label pull-left" for="{{dataItem.Id}}"></label>', width: '50px' },
                    {
                        field: 'Name', title: "Name",
                        template: '<a data-ng-click="vm.check()" ui-sref="app.master({form:$stateParams.form, mode:' +
                          "'view'" + ', id: dataItem.Id})" >${Name}</a>', width: "200px"
                    },
                    { field: "UserCreated", title: "User Created", width: "200px" },
                    {
                        field: "CreatedDate", title: "Date Of Creation", type: "date",
                        format: '{0:'+config.dateFormat+'}', width: "200px"
                    },
                    { field: "Status", title: "Status", width: "200px" }
                ]
            break;
            case 'industry':
                return [
                    { template: '<input type="checkbox" id="{{dataItem.Id}}" class="k-checkbox rme" ng-checked="vm.selection.indexOf(dataItem) > -1" ng-click="vm.toggleSelection(dataItem)"><label class="k-checkbox-label pull-left" for="{{dataItem.Id}}"></label>', width: '50px' },
                    {
                        field: 'Name', title: "Name",
                        template: '<a data-ng-click="vm.check()" ui-sref="app.master({form:$stateParams.form, mode:' +
                          "'view'" + ', id: dataItem.Id})" >${Name}</a>', width: "200px"
                    },
                    { field: "UserCreated", title: "User Created", width: "200px" },
                    {
                        field: "CreatedDate", title: "Date Of Creation", type: "date",
                        format: '{0:'+config.dateFormat+'}', width: "200px"
                    },
                    { field: "Status", title: "Status", width: "200px" }
                ]
              break;
            case 'vendortype':
                return [
                    { template: '<input type="checkbox" id="{{dataItem.Id}}" class="k-checkbox rme" ng-checked="vm.selection.indexOf(dataItem) > -1" ng-click="vm.toggleSelection(dataItem)"><label class="k-checkbox-label pull-left" for="{{dataItem.Id}}"></label>', width: '50px' },
                    {
                        field: 'Name', title: "Name",
                        template: '<a data-ng-click="vm.check()" ui-sref="app.master({form:$stateParams.form, mode:' +
                          "'view'" + ', id: dataItem.Id})" >${Name}</a>', width: "200px"
                    },
                    { field: "UserCreated", title: "User Created", width: "200px" },
                   {
                       field: "CreatedDate", title: "Date Of Creation", type: "date",
                       format: '{0:'+config.dateFormat+'}', width: "200px"
                   },
                    { field: "Status", title: "Status", width: "200px" }
                ]
                break;
            case 'currencycode':
                return [
                    { template: '<input type="checkbox" id="{{dataItem.Id}}" class="k-checkbox rme" ng-checked="vm.selection.indexOf(dataItem) > -1" ng-click="vm.toggleSelection(dataItem)"><label class="k-checkbox-label pull-left" for="{{dataItem.Id}}"></label>', width: '50px' },
                    {
                        field: 'Code', title: "Code",
                        template: '<a data-ng-click="vm.check()" ui-sref="app.master({form:$stateParams.form, mode:' +
                          "'view'" + ', id: dataItem.Id})" >${Code}</a>', width: "100px"
                    },
                    { field: "Name", title: "Name", width: "250px" },
                    { field: "Status", title: "Status", width: "200px" }
                ]
                break;
          default:
            break;
        }
      }

    }
  })
})();
