'use strict';

var aws      = require('aws-sdk');
aws.config.update({region:process.env.SERVERLESS_REGION});
var dynamodb = new aws.DynamoDB.DocumentClient();

const stage       = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const usersTable  = projectName + '-' + stage + '-users';

module.exports.handler = function(event, context, cb) {
  var users = new Users();

  switch (event.httpMethod) {
    case 'POST':
      users.putItem(event, context);
      break;
    case 'GET':
      users.getItem(event, context);
      break;
    case 'DELETE':
      users.deleteItem(event, context);
      break;
  }
};

class Users {

  putItem(event, context) {
    var params = {
      TableName: usersTable,
      Item: { 'email': event.email }
    };
   
    dynamodb.put(params, function (err, data) {
      if (err) {
        context.fail(data);
      } else {
        context.succeed('putItem succeed');
      }
    });
  }

  getItem(event, context) {
    var params = {
      TableName: usersTable,
      Key: { "email": event.email }
    };

    dynamodb.get(params, function (err, data) {
      if (err) {
        context.fail(err);
      } else {
        context.succeed(data);
      }
    });
  }
  
  deleteItem(event, context) {
    var params = {
      TableName: usersTable,
      Key: { "email": event.email }
    };

    dynamodb.delete(params, function (err, data) {
      if (err) {
        context.fail(err);
      } else {
        context.succeed('deleteItem succeed');
      }
    });
  }
}