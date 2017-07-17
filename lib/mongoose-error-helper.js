/**
 * Created with IntelliJ IDEA.
 * User: sebastianbromberg
 * Date: 12/8/13
 * Time: 15:58
 * To change this template use File | Settings | File Templates.
 *
 *
 * Modified by Vinicius Andrei Cerbaro
 * User: cerbaro
 * Date 10/4/15
 *
 */

var util = require('util');

exports.errorHelper = function errorHelper(err, callback) {

  //If it isn't a mongoose-validation error, just throw it.
  if (err.name !== 'ValidationError')
    return callback(err);

  var messages = {
      'required': "%s is required.",
      'min': "%s below minimum.",
      'max': "%s above maximum.",
      'enum': "%s not an allowed value."
  };

  //A validationerror can contain more than one error.
  var errors = [];

  //Loop over the errors object of the Validation Error
  Object.keys(err.errors).forEach(function (field) {

      // Getting from .proprerties now.
      var eObj = err.errors[field].properties;

      // If we have a message on the schema.
      if(eObj.hasOwnProperty("message")) errors.push(eObj.message);

      //If we don't have a message for `type`, just push the error through
      else if (!messages.hasOwnProperty(eObj.kind)) errors.push(eObj.type);

      //Otherwise, use util.format to format the message, and passing the path
      else errors.push(require('util').format(messages[eObj.kind], eObj.path));
  });

  return callback(errors);
}
