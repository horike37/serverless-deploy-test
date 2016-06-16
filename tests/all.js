'use strict';
// Unit tests for Serverless
// Generated by Serverless UnitTestBoilerplate
var s
const path       = require('path'),
      chai       = require('chai'),
      should     = chai.should(),
      Serverless = require('serverless'),
      region     = 'us-east-1',
      stage      = 'travis'
      
describe('ServerlessProjectTest', function() {
  beforeEach(function(done) {
    this.timeout(0);

    s = new Serverless({
    			interactive: false,
                awsAdminKeyId: process.env.AWS_ACCESS_KEY_ID,
                awsAdminSecretKey: process.env.AWS_SECRET_ACCESS_KEY
    		});

    s.init().then(function() {
      s.config.projectPath = __dirname + '/../';
      s.setProject(new s.classes.Project({
        name:'serverless-hkmkmh',
        stages: {
          travis: { regions: { 'us-east-1': {} }}
        },
        variables: {
          project: 'serverless-hkmkmh',
          stage:   'travis',
          region:  'us-east-1'
        }
      }));
      
      s.getProject().setFunction(new s.classes.Function(
        {
          name:"users",
          runtime:"nodejs4.3"
        },
        __dirname + '/../users/s-function.json'));
 
      done();
    });
    
  });
  
  describe('#funciton users()', function() {
    it('should be funciton users put item success', function() {
      return s.getProject().getFunction('users').run('travis', 'us-east-1', {'httpMethod':'POST', 'email':'horike@digitalcube.jp'})
      .then(result => {
        result.response.should.equal('putItem succeed')
      });
    });
    
    it('should be funciton users get item success', function() {
      return s.getProject().getFunction('users').run('travis', 'us-east-1', {'httpMethod':'GET', 'email':'horike@digitalcube.jp'})
      .then(result => {
        result.response.Item.email.should.equal('horike@digitalcube.jp')
      });
    });
    
    it('should be funciton users delete item success', function() {
      return s.getProject().getFunction('users').run('travis', 'us-east-1', {'httpMethod':'DELETE', 'email':'horike@digitalcube.jp'})
      .then(result => {
        result.response.should.equal('deleteItem succeed')
      });
    });
  });
});
