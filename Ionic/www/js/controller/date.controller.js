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

  $scope.addHabit = function(habit) {
    TrackerFactory.addHabit(habit);
    $scope.addModal.hide();
    this.habits = TrackerFactory.getHabitsList(); // not sure if this is needed
  };

}]);
