jQuery-Validator.Knockout
=========================

KnockoutJS bindings for my jQuery-Validator - https://github.com/jeffijoe/jQuery-Validator

I created this mainly because I could not get Knockout-Validation to do what
I want (I was using it with DurandalJS, and validation triggered automatically, and
I could not control it, no matter what I did), and since I had already written
a jQuery Validator, I thought I might aswell just create a Knockout binding for it.

Getting started
===============

You can check the demos folder for full source code of a working demo.

You will need to include some scripts..

```html
    <!-- The all-important validator.. -->
    <script src="https://rawgithub.com/jeffijoe/jQuery-Validator/master/Src/jQuery.Validator.js"></script>
    <script src="https://rawgithub.com/jeffijoe/jQuery-Validator/master/Src/jQuery.IsEmpty.js"></script>

    <!-- KO Bindings.. -->
    <script src="../src/jQuery-Validator.Knockout.js"></script>
```

Let's get some markup going.

```html
    <!-- Define our validation context -->
    <div data-bind="jqValidation: validationContext"><!-- validationContext is the property in the current binding context (currently the root viewmodel) -->

        <!-- Username -->
        <div>
            <span>Username:</span>
            <input type="text" data-bind="value: username" data-required="true" />
        </div>
        <br />
        <!-- Password -->
        <div>
            <span>Password</span>
            <input type="password" 
                data-bind="value: password" 
                data-required="true" 
                data-lengthreq="4-16" 
                data-msg_empty="Password is required too."
                data-msg_lengthreq="Password must be between $MINLEN$ and $MAXLEN$ characters long." />
            <div></div>
        </div>
        <br />
        <div>
            <button data-bind="click: signup">Register</button>
        </div>

        <!-- All validation errors - personally I wont need it, but hey.. -->
        <div data-bind="foreach: validationErrors">
            <div data-bind="text: $data"></div>
        </div>
    </div>
    
```

So, what exactly are we doing? Well..

  1. We're defining a validation context using KO Data-Bind syntax.
     This is just a regular Knockout Binding handler, and we are
     telling the validator to look for stuff to validate within the container the binding is being applied on.
  2. We define our validation stuff in our markup, just like we would without Knockout.
     We have also added some databindings for our viewmodel properties.

We also need a viewmodel.

```javascript
      function ViewModel() {
            var self = this;

            self.validationContext = ko.jqValidation({
                returnBool:false, // We want more details of our validation result.
                useInlineErrors: true, // Use inline errors
                errorClass: 'error', // Apply error class
                msg_empty: 'My friend, this just wont do.', // Global empty message.
                noInlineErrors: "*[type='password']" // Password fields should not show inline errors.
            });
            
            self.validationErrors = ko.observableArray([]);

            self.username = ko.observable();
            self.password = ko.observable();

            self.signup = function () {
                // Validate.
                var validationResult = self.validationContext.Validate();
                if (validationResult.valid) {
                    alert("Validated successfully. Yay!");
                    return;
                }

                // Oh boy, you're in troubleeeeee!
                self.validationErrors(validationResult.messages);
            };
      };
```

And of course, apply bindings.

```javascript
    ko.applyBindings(new ViewModel());
```

  1. We define our viewmodel, and create our validation context. This is the context that is being bound with `data-bind="jqValidation: validationContext"`
  2. We define our validation options in the validation context construction, the options are the same as you would pass to `.Validate` if not using Knockout.
  3. We added a click-handler for a button, and trigger the validation on our context. This means - yes, you guessed it, you can have **multiple validation contexts** in a single viewmodel.
  4. If validation does not pass, we can do whatever we want with the error messages - we choose to display them in the view, so we create an observable array to store them in.

------

I do realize that this is rather incomplete, but as of right now, it fits my needs - this is open-source, so you are encouraged to contribute. :)

------

MIT Licensed.
=============

Copyright (c) 2013 Jeff Hansen - Jeffijoe.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
