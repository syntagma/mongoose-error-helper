Mongoose Error Helper
==================

Error helper for [Mongoose](http://mongoosejs.com) schemas utilising utils to transform complex messages into human language.

Mongoose Validator simply returns Mongoose style validation objects inside an array of messages.

##Installation##

	npm install mongoose-error-helper

##Usage##

	var errorHelper = require('mongoose-error-helper').errorHelper;


    function (req, res, next) {
        //generate `user` here
        user.save(function (err) {
            //If we have an error, call the helper, return, and pass it `next`
            //to pass the "user-friendly" errors to
            if (err) return errorHelper(err, next);
        }
    }


##Error Messages Before##

    { message: 'Validation failed',
      name: 'ValidationError',
      errors:
       { username:
          { message: 'Validator "required" failed for path username',
            name: 'ValidatorError',
            path: 'username',
            type: 'required' },
         state:
          { message: 'Validator "enum" failed for path state',
            name: 'ValidatorError',
            path: 'state',
            type: 'enum' },
         email:
          { message: 'Validator "custom validator here" failed for path email',
            name: 'ValidatorError',
            path: 'email',
            type: 'custom validator here' },
         age:
          { message: 'Validator "min" failed for path age',
            name: 'ValidatorError',
            path: 'age',
            type: 'min' } } }

## Error Messages After ##

    [ 'username is required.',
      'state not an allowed value.',
      'custom validator here',
      'age below minimum.' ]
    
##Contributors##

Special thanks to "clarkf" on stackoverflow for for this solution. We made it public for everybody.
