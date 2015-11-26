(function () {
    'use strict';

    var validations = angular.module('ZValidations', []);

    validations.factory('customValidations', function ($moment) {
        var messages = {
            required: '%f is required',
            invalid: 'Invalid %f',
            alpha: 'Please enter alphabetics only',
            alphanumaric: 'Please enter alphanumarics only',
            decimal: 'Please enter decimals only',
            url: 'Please enter valid url',
            dateformate: 'Please enter %f in DD/MM/YYYY format only',
            dateformatesmall:'Please enter %f in DD/MM format only'
           
        }
        var regex = {
            numericRegex: /^[0-9]+$/,
            integerRegex: /^\-?[0-9]+$/,
            decimalRegex: /^\-?[0-9]*\.?[0-9]+$/,
            emailRegex: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
            alphaRegex: /^[a-z]+$/i,
            alphaNumericRegex: /^[a-z0-9]+$/i,
            alphaDashRegex: /^[a-z0-9_\-]+$/i,
            naturalRegex: /^[0-9]+$/i,
            naturalNoZeroRegex: /^[1-9][0-9]*$/i,
            ipRegex: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
            base64Regex: /[^a-zA-Z0-9\/\+=]/i,
            numericDashRegex: /^[\d\-\s]+$/,
            urlRegex: /^((https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}))?$/,
           dateRegex: /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/,
           dateRegexsmall:/(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[0-9]|1[0-2]))$/
        
        }
        return {
            validateEmail: function (value) {
                if (value) {
                    return regex.emailRegex.test(value) == true ? true : messages.invalid.replace('%f', 'Email');
                }
                return true;
            },
            validateNumber: function (value) {
                if (value) {
                    return regex.numericRegex.test(value) == true ? true : messages.invalid.replace('%f', 'Number');
                }
                return true;
            },
            validateAlpha: function (value) {
                if (value) {
                    return regex.alphaRegex.test(value) == true ? true : messages.alpha;
                }
                return true;
            },
            validateAlphaNumaric: function (value) {
                if (value) {
                    return regex.alphaNumericRegex.test(value) == true ? true : messages.alphanumaric;
                }
                return true;
            },
            valiadteDecimal: function (value) {
                if (value) {
                    return regex.decimalRegex.test(value) == true ? true : messages.decimal;
                }
                return true;
            },
            valiadteUrl: function (value) {
                if (value) {
                    return regex.urlRegex.test(value) == true ? true : messages.url;
                }
                return true;
            },
            validatePhoneNumber: function (value) {
                if (value) {
                    return (/^\d{1,200}$/).test(value.replace(/[\s()+\-\.]|ext/gi, ''))==true?true:messages.invalid.replace('%f',' Phone Number')
                return true;
                }
            },
            validateLocalPostalCode: function (value) {
                if (value) {
                    return regex.numericRegex.test(value)==true?value.length==6?true:'Postal Code must be 6 digits':'Invalid Postal Code'
                }
                return true;
            },
            validateForeignPostalCode: function (value) {
                if (value) {
                    return regex.alphaNumericRegex.test(value) == true ? (value.length >= 6 && value.length <= 10) == true ? true : 'Invalid Postal Code' : 'Invalid Postal Code'
                }
                return true;
            }, 
            validateDate: function (value,value1) {
                if (value) {
                    return regex.dateRegex.test(value)==true ? true : messages.dateformate.replace('%f',value1)
                }
            },
            validateDate1: function (value, value1) {
                if (value) {
                    return regex.dateRegexsmall.test(value)==true ? true : messages.dateformatesmall.replace('%f',value1)
                }
            },
            validateRequire: function (value) {
                value = value.trim().length == 0 ? '' : value;
                return value != undefined && value != '' && value != null == true ? true :' is required';
            },
            validateCommunicationType: function (type,value) {
                if (value) {
                    type = type.toLowerCase();
                    if (type.indexOf('phone') > -1 || type.indexOf('fax') > -1 || type.indexOf('mobile') > -1 || type.indexOf('work') > -1) {
                        return (/^\d{1,200}$/).test(value.replace(/[\s()+\-\.]|ext/gi, ''));
                    }                  
                   else if (type.indexOf('email') > -1) {
                       return regex.emailRegex.test(value);
                   }
                }
                return true;
            },
            validatePhone:function(value,name){
                if (value) {
                    return isNaN(value) === false ? true : name + ' is Invalid';
                }
                return true;
            },
            dateFormateValidator: function (value,format) {
                if (value) {
                    return $moment(value, format.toUpperCase(), true).isValid()==true?true:'Invalid Date';
                }
                return true;
            },
            compareWithNewDate: function (value) {
                if (value) {
                    var date = value.split("/");
                    var day = parseInt(date[0]), month = parseInt(date[1]), year = parseInt(date[2]);
                    var newDay = parseInt(new Date().getDate()), newMonth = parseInt(new Date().getMonth())+1, newYear = parseInt(new Date().getFullYear());
                    if (year > newYear || ((year === newYear) && (month > newMonth)) || ((year === newYear) && (month === newMonth) && (day >= newDay))) {
                        return true;
                    } else {
                        return "Date must be equal or higher to current date";
                    }
                }
                return true;
            }
        }
    })
    .factory('formValidate', function (customValidations) {
        
        var validateField = function (type, value, fieldName,field) {

            if (type == 'email') {
                return customValidations.validateEmail(value) == true ? true : modifyFieldName(fieldName)+ ' is Invalid';
            }
            else if (type == 'decimal') {
                return customValidations.valiadteDecimal(value);
            }
            else if (type == 'url' || type == 'website') {
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
                return value != undefined && value != '' && value != null == true ? true : modifyFieldName(fieldName) + ' is required';
            }
            else if (type == 'lpostalcode'&&field.dataset.validationrequired=='true') {
                value = value.trim().length == 0 ? '' : value;
                return customValidations.validateLocalPostalCode(value);
            }
            else if (type == 'fpostalcode'&&field.dataset.validationrequired=='true') {
                value = value.trim().length == 0 ? '' : value;
                return customValidations.validateForeignPostalCode(value);
            }
            else if (type == 'date') {
                value = value.trim().length == 0 ? '' : value;
                return customValidations.dateFormateValidator(value, field.dataset.format);
            }
            else if (type === 'newdatecompare') {
                value = value.trim().length == 0 ? '' : value;
                return customValidations.compareWithNewDate(value);
            }
            else if (type === 'mobile' || type === 'phone' || type === 'fax') {
                value = value.trim().length == 0 ? '' : value;
                return customValidations.validatePhone(value,fieldName);
            }
            return true;
        };
        var modifyFieldName=function (Name) {
            var _dupName;
            for (var i = 0; i <= Name.length - 1; i++)
            {
                if(/[A-Z]/.test(Name[i]))
                {
                    var part1, part2;
                    part1 = Name.substring(0, i);
                    part2 = Name.substring(i, Name.length);
                    _dupName = part1 + " " + part2;
                }
            }
            var Na;
            if (_dupName) {
               Na= _dupName.replace(_dupName[0], _dupName[0].toUpperCase());
            } else {
                Na = Name;
            }
            return Na;
        }
        var setValidationMessages = function (element,message) {
         return   $(element).append('<span class="pull-right z-invalid"><i class="fa fa-exclamation-circle"></i>&nbsp;' + message + '</span>');
        }
        var removeInvalid = function (element) {
            $(element).find('span.z-invalid').remove();
        }
        var hideMessages = function (id) {
            var _inputFields = [];
            $("#" + id).each(function () {
                _inputFields = $(this).find(':input') 
            });
            angular.forEach(_inputFields, function (index) {
                if (index.dataset.validationtype) {
                    $(index.parentElement).find('span.z-invalid').remove();
                }
            })
        }
        return {

            modifyFieldName:modifyFieldName ,
            validateField: validateField,
            setValidationMessages: setValidationMessages,
            hideMessages: hideMessages,
            removeInvalid:removeInvalid,
            validate: function (Id) {
                var _inputFields;
                var _errorMessages = [];
                var _validationRequiredFields = [];
                var isValidationRequired = false;
                $("#" + Id).each(function () {
                    _inputFields = $(this).find(':input') //<-- Should return all input elements in that specific form.
                });
                for (var _index = 0; _index <= _inputFields.length - 1; _index++)
                {
                    if (_inputFields[_index].type != 'file' && _inputFields[_index].type != 'checkbox' && _inputFields[_index].type != 'button')
                    {
                        if (_inputFields[_index].dataset.validationtype)
                        {
                            removeInvalid(_inputFields[_index].parentElement);
                            var fieldValidationTypes = _inputFields[_index].dataset.validationtype.split(',');
                            
                            field: for (var i = 0; i <= fieldValidationTypes.length - 1; i++)
                            {
                                removeInvalid(_inputFields[_index].parentElement);
                                var val = validateField(fieldValidationTypes[i], _inputFields[_index].value, _inputFields[_index].name, _inputFields[_index]);
                                if (val !== true) {
                                    isValidationRequired = true;
                                    setValidationMessages(_inputFields[_index].parentElement, val);
                                    break field;
                                }
                            }           
                        }
                    }
                }
                return { isValidationRequired: isValidationRequired, errorMessages: _errorMessages };
            }
        }       
    })
   
})();
