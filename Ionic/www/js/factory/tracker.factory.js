'use strict';

angular.module('app')
  .factory('TrackerFactory', function () {
    console.log('TrackerFactory');

    var npsPack = [];

    var packs = [];

    function sortByKey(array, key) {
    }

    function getCategories(pack) {
    }

    function getExplore(packId) {
    }

    function getSound(id) {
    }

    function getQuiz(packId, sound) {
    }

    // Public API here
    return {
      getSound: getSound,
      getQuiz: getQuiz,
      getExplore: getExplore
    };
  });
