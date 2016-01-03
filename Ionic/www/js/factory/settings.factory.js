'use strict';

angular.module('app')
  .factory('SettingsFactory', function () {
    console.log('SettingsFactory');

    var weekBegins = "Monday";

    function getWeekBegins() {
      return weekBegins;
    }

    // Public API here
    return {
      getWeekBegins: getWeekBegins
    };
  });
