/*
 * jQuery-Validator Knockout bindings.
 * Version: 0.4 
 * Author: Jeff Hansen <jeffijoe.com>

 * (Could definitely use more features, 
    but for what I need it for at the moment, 
    this is good enough.)

 * Dependencies: 
    - jQuery 
    - jQuery.IsEmpty + jQuery-Validator 
        (both found at https://github.com/Livesys/jQuery-Validator)
    - KnockoutJS, obviously.

 * Usage: See demos.
 */

(function ($, ko) {
    // Make sure JQV is loaded.
    if (!$.fn.Validate) throw new Error("I can't seem to locate jQuery-Validator. Has it been loaded?");

    var _selector = "*[data-required],*[data-validate]";

    /*
     * Constructor 
     */
    ko.jqValidation = function (config) {
        return new function () {
            var self = this;
            $.extend(self, config);

            self.containerElement = null;
            self.Validate = function () {
                if (!self.containerElement)
                    throw new Error("Validate called, but container element has not been set yet.");
                var elements = self.containerElement.find(_selector);
                return elements.Validate(self);
            };
        };
    };

    /*
     * Binding handler
     */
    ko.bindingHandlers.jqValidation = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var $elem = $(element),
                validationCtx = valueAccessor();
            validationCtx.containerElement = $(element);
        }
    };
})(jQuery,ko);



