angular.module('app.controllers')
.controller('CalendarCtrl', ['TrackerFactory', function(TrackerFactory) {
	console.log('CalendarCtrl');

	var month = moment();
	this.days = TrackerFactory.createCalendarGrid(month);
	this.monthFormatted = month.format("MMMM YYYY");
	this.weekdays = TrackerFactory.getWeekdayList();

	this.prevMonth = function() {
		month = month.subtract(1, 'month');
		this.days = TrackerFactory.createCalendarGrid(month);
		this.monthFormatted = month.format("MMMM YYYY");
	}
	this.nextMonth = function() {
		month = month.add(1, 'month');
		this.days = TrackerFactory.createCalendarGrid(month);
		this.monthFormatted = month.format("MMMM YYYY");
	}

}]);
