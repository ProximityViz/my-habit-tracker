'use strict';

angular.module('app')
  .factory('SettingsFactory', function () {
    console.log('SettingsFactory');

    var weekBegins = 1; // 1 = monday
    // as a smart default, use locale (maybe moment().weekday())

    function getWeekBegins() {
      return weekBegins;
    }

    // Public API here
    return {
      getWeekBegins: getWeekBegins
    };
  });
