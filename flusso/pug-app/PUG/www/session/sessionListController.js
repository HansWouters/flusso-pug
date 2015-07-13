(function() {

  angular
    .module('pug.controllers')
    .controller('SessionListController', SessionListController);

  /* @ngInject */
  function SessionListController(SessionService, SessionSpeakerLinkService, $ionicBackdrop) {
    var sessionScope = this;
    var displayDetails;

    sessionScope.showDetails = showDetails;
    sessionScope.toggleDetails = toggleDetails;

    $ionicBackdrop.retain();
    SessionService.query()
      .then(function(sessions) {
        sessionScope.list = sessions;
        loadSpeakers();
        $ionicBackdrop.release();
      });

    function loadSpeaker(sessionId) {
      SessionService.get()
    }

    function showDetails(sessionId) {
      return sessionId == displayDetails;
    }

    function toggleDetails(sessionId) {
      if (displayDetails == sessionId) {
        displayDetails = null;
      } else {
        displayDetails = sessionId;
      }
    }

    function loadSpeakers() {
      sessionScope.list.forEach(function(session) {
        SessionSpeakerLinkService
          .get('speaker', session.sessie_id)
          .then(function(speaker) {
            session.speaker = speaker;
          });
      });
    }
  };
})();
