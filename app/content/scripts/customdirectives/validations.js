(function () {
    'use strict';

    var app = angular.module('ZValidations');
    app .directive('formValidate', function (customValidations,formValidate) {
        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
                angular.forEach(elem[0], function (node) {
                    if (node.dataset.validationtype) {
                        $('#' + node.id).bind('blur', function () {
                            formValidate.removeInvalid(node.parentElement);
                            function validate(type, value, fieldName,field) {

                                if (type == 'email') {
                                    return customValidations.validateEmail(value) == true ? true :formValidate.modifyFieldName(fieldName)+ ' is Invalid';
                                }
                                else if (type == 'decimal') {
                                    return customValidations.valiadteDecimal(value);
                                }
                                else if (type == 'url') {
                                    return customValidations.valiadteUrl(value);
                                }
                                else if (type == 'alpha') {
                                    return customValidations.validateAlpha(value);
                                }
                                else if (type == 'alphanumaric') {
                                    return customValidations.validateAlphaNumaric(value);
                                }
                                else if (type == 'number') {
                                    return customValidations.validateNumber(value);
                                }
                                else if (type == 'required') {
                                    value = value.trim().length == 0 ? '' : value;
                                    return value != undefined && value != '' && value != null == true ? true :formValidate.modifyFieldName(fieldName) + ' is required';
                                }
                                else if (type == 'lpostalcode'&&field.dataset.validationrequired=='true') {
                                    value = value.trim().length == 0 ? '' : value;
                                    return customValidations.validateLocalPostalCode(value);
                                }
                                else if (type == 'fpostalcode' && field.dataset.validationrequired == 'true') {
                                    value = value.trim().length == 0 ? '' : value;
                                    return customValidations.validateForeignPostalCode(value);
                                }
                               else if (type == 'date') {
                                    value = value.trim().length == 0 ? '' : value;
                                    return customValidations.dateFormateValidator(value,field.dataset.format);
                               }
                               else if (type === 'newdatecompare') {
                                   value = value.trim().length == 0 ? '' : value;
                                   return customValidations.compareWithNewDate(value);
                               }

                            }
                            var fieldValidationTypes = node.dataset.validationtype.split(',');                            
                            for (var i = 0; i <= fieldValidationTypes.length - 1; i++) {
                                formValidate.removeInvalid(node.parentElement);
                                var val = validate(fieldValidationTypes[i], node.value, node.name, node);
                                if (val != true) {
                                    formValidate.setValidationMessages(node.parentElement, val);
                                    break;
                                }
                            }                            
                        })
                    }
                })
            }
        }
    })
})();
