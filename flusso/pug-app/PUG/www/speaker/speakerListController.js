(function() {

  angular
    .module('pug.controllers.speaker', [])
    .controller('SpeakerListController', SpeakerListController);

  /* @ngInject */
  function SpeakerListController(SpeakerService, $scope, $location, $ionicScrollDelegate, $ionicBackdrop) {
    var speakersScope = this;

    $ionicBackdrop.retain();
    SpeakerService.query(true)
      .then(function(speakers) {
        speakersScope.list = speakers;
        $ionicBackdrop.release();
        console.log('Speaker scope: ', speakersScope.list.length);
      });

    $scope.gotoList = function(id) {
      $location.hash(id);
      $ionicScrollDelegate.anchorScroll();
    };
  }
})();
