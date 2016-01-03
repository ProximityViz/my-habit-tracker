'use strict';

angular.module('app')
  .factory('TrackerFactory', ['SettingsFactory', function (SettingsFactory) {
    console.log('TrackerFactory');

    var npsPack = [];

    var packs = [];

    function getWeekdayList() {
      var firstColumn = SettingsFactory.getWeekBegins();
      var list = Array(7).fill().map((x, i) => i);
      for (var item in list) {
        list[item] = moment().day(parseInt(item) + parseInt(firstColumn)).format("dddd");
      }
      return list;
    }

    function createCalendarGrid(month) {
      var firstColumn = SettingsFactory.getWeekBegins();
      var firstWeekdayOfMonth = moment(month.format("YYYY-MM") + "-01", "YYYY-MM-DD").day();
      var daysInMonth = moment(month).daysInMonth();

      var emptyDaysAtBeginning = firstWeekdayOfMonth - firstColumn;
      if (emptyDaysAtBeginning < 0) {
        emptyDaysAtBeginning = emptyDaysAtBeginning + 7;
      };

      var cellNumber = 0
      var grid = [];
      // create empty cells at beginning
      while (emptyDaysAtBeginning > 0) {
        emptyDaysAtBeginning--;
        grid.push({cell: cellNumber, number: null});
        cellNumber++;
      }
      // create cells for days
      var day = 1;
      while (day <= daysInMonth) {
        // add date in here
        grid.push({cell: cellNumber, number: day});
        day++;
        cellNumber++;
      }
      // TODO: possibly add blank cells at the end, to round out the last week

      return grid;
    }

    // Public API here
    return {
      getWeekdayList: getWeekdayList,
      createCalendarGrid: createCalendarGrid
    };
  }]);
