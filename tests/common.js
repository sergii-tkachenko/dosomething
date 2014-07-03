/**
 * Helper methods and variables for capser test suite.
 */

// Define the url for all tests.
var url = casper.cli.get('url');

// Set default viewport for all tests.
casper.options.viewportSize = { width: 1280, height: 1024 };

// Use to log in before performing a test.
casper.login = function() {
  this.echo("Logging in as test user.");

  // Go home and login.
  casper.open(url + "/user", function() {
    this.fill('form[action="/user/login"]', {
      name: 'QA_TEST_ACCOUNT@example.com',
      pass: 'tester'
    }, true);
  });
}

// Use to log out after completing a test.
casper.logout = function() {
  // Go home and click the "Log Out" button
  casper.open(url + "/user/logout", function() {
    this.echo("Logging out of test user.");
  });
}
