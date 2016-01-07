angular.module('app.controllers')
.controller('DateCtrl', ['$stateParams', 'TrackerFactory', '$ionicModal', '$scope', 
                 function($stateParams,   TrackerFactory,   $ionicModal,   $scope) {
	console.log('DateCtrl');

  this.date = moment($stateParams.dateId).format("LL");

  this.habits = TrackerFactory.getHabitsList();

  $ionicModal.fromTemplateUrl('templates/add-habit-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addModal = modal;
  });

  this.showAddModal = function() {
    $scope.addModal.show();
  };

  this.addHabit = function(habit) {
    habit.color = this.colorOptions[this.selectedColorIndex].color;
    habit.accent = this.colorOptions[this.selectedColorIndex].accent;
    TrackerFactory.markColorUsed(this.selectedColorIndex);
    TrackerFactory.addHabit(habit);
    $scope.addModal.hide();
    this.habits = TrackerFactory.getHabitsList(); // not sure if this is needed
  };

  $scope.openColorPicker = function() {
    console.log("open picker");
  };

  this.colorOptions = TrackerFactory.getPalette();

  this.selectedColorIndex = 0;

  this.selectColor = function(color, index) {
    console.log(color);
    console.log(index);
    this.selectedColorIndex = index;
  };

}]);
