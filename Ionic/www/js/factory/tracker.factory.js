'use strict';

angular.module('app')
  .factory('TrackerFactory', ['SettingsFactory', '$filter', 
                     function (SettingsFactory,   $filter) {
    console.log('TrackerFactory');

    var today = moment().format("YYYY-MM-DD");

    var palette = [
      {
        color: "#00FF36",
        used: false,
        accent: "#000"
      },{
        color: "#004CFF",
        used: false,
        accent: "#fff"
      },{
        color: "#6100AE",
        used: false,
        accent: "#fff"
      },{
        color: "#FF000B",
        used: false,
        accent: "#fff"
      },{
        color: "#FF9000",
        used: false,
        accent: "#000"
      },{
        color: "#FFFC00",
        used: false,
        accent: "#000"
      },{
        color: "#00FFF3",
        used: false,
        accent: "#000"
      },{
        color: "#0041DB",
        used: false,
        accent: "#fff"
      },{
        color: "#FF00C0",
        used: false,
        accent: "#000"
      },{
        color: "#DB3C00",
        used: false,
        accent: "#fff"
      },{
        color: "#FFC700",
        used: false,
        accent: "#000"
      },{
        color: "#69FF00",
        used: false,
        accent: "#000"
      }
    ];
    // mark which palettes have been used; auto-select the first one that hasn't been used yet
    // maybe also change display order

    var habit0 = {
      id: 0,
      name: "Musicloon",
      color: "#262262",
      accent: "#fff",
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
      accent: "#fff",
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
      habit.id = numberOfHabits;
      habitData.push(habit);
      numberOfHabits = habitData.length;
      habit = null;
      // add to ngStorage
    }

    function getPalette() {
      // get from ngStorage
      // if there's nothing there, grab it from palette
      return palette;
    }

    function markColorUsed(index) {
      palette[index].used = true;
      // add to ngStorage
    }

    // Public API here
    return {
      getWeekdayList: getWeekdayList,
      createCalendarGrid: createCalendarGrid,
      getHabitsList: getHabitsList,
      addHabit: addHabit,
      getPalette: getPalette,
      markColorUsed: markColorUsed
    };
  }]);
