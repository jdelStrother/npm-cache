'use strict';

var path = require('path');
var shell = require('shelljs');
var logger = require('../util/logger');

// Function to extract composer version number
var getCliVersion = function () {
  var version = 'UnknownComposer';
  var versionString = shell.exec('composer --version', {silent: true}).output;
  // Example below:
  //    Composer version 1.0.0-alpha9 2014-12-07 17:15:20
  var versionRegex = /^Composer version (\S+)/;
  var result = versionRegex.exec(versionString);
  if (result !== null) {
    version = result[1];
  } else {
    logger.logInfo('Could not find composer version from version string: ' + versionString);
  }
  return version;
};

module.exports = {
  cliName: 'composer',
  getCliVersion: getCliVersion,
  configPath: path.resolve(process.cwd(), 'composer.json'),
  installDirectory: 'vendor',
  installCommand: 'composer install'
};
