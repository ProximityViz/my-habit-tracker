'use strict';

angular.module('app')
  .factory('TrackerFactory', ['SettingsFactory', '$filter', 
                     function (SettingsFactory,   $filter) {
    console.log('TrackerFactory');

    var today = moment().format("YYYY-MM-DD");

    var palette = ["#00FF36", "#004CFF", "#6100AE", "#FF000B", "#FF9000", "#FFFC00"];

    var habit0 = {
      id: 0,
      name: "Musicloon",
      color: "#262262",
      abbreviation: "ML",
      dates: [
        "2016-01-17",
        "2016-01-20"
      ]
    };

    var habit1 = {
      id: 1,
      name: "Soundscapes",
      abbreviation: "SS",
      color: "#50A833",
      dates: [
        "2016-01-18",
        "2016-01-20"
      ]
    };

    var habitData = [habit0, habit1];
    var numberOfHabits = habitData.length; // needed when adding a new habit

    function searchHabitForDate(habit, date) {
      var found = $filter('filter')(habit.dates, date, true);
      if (found.length) {
        return true;
      } else {
        return false;
      }
    }

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
        var formattedDate = month.format("YYYY-MM");
        if (day < 10) {
          formattedDate = formattedDate + "-0" + day;
        } else {
          formattedDate = formattedDate + "-" + day;
        }
        var dayData = {cell: cellNumber, number: day, date: formattedDate};
        if (formattedDate === today) { dayData.today = true; };
        // search habitData for this day
        var dayHabits = [];
        for (var habit in habitData) {
          if (searchHabitForDate(habitData[habit], formattedDate)) {
            dayHabits.push({abbreviation: habitData[habit].abbreviation, color: habitData[habit].color})
          }
        }
        dayData.habitData = dayHabits;
        grid.push(dayData);
        day++;
        cellNumber++;
      }

      console.log(grid);
      return grid;
    }

    function getHabitsList() {
      // maybe just return the names
      return habitData;
    }

    function addHabit(habit) {
      // if there's no color, add one
      if (numberOfHabits < palette.length) {
        habit.color = palette[numberOfHabits];
      } else {
        habit.color = '#' + Math.floor(Math.random()*16777215).toString(16);
      }
      habit.id = numberOfHabits;
      habitData.push(habit);
      numberOfHabits = habitData.length;
      habit = null;
    }

    // Public API here
    return {
      getWeekdayList: getWeekdayList,
      createCalendarGrid: createCalendarGrid,
      getHabitsList: getHabitsList,
      addHabit: addHabit
    };
  }]);
