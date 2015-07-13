(function() {

  angular
    .module('pug.controllers.speaker')
    .controller('SpeakerController', SpeakerController);

  /* @ngInject */
  function SpeakerController(SpeakerService, SessionSpeakerLinkService, $stateParams) {
    var speakerScope = this;
    console.log('Speaker speaking');
    SpeakerService.get($stateParams.speakerId)
      .then(function(speaker) {
        speakerScope.speaker = speaker;
        loadSessions();
      });

    function loadSessions() {
      SessionSpeakerLinkService
        .get('session', speakerScope.speaker.speaker_id)
        .then(function(session) {
          speakerScope.speaker.session = session;
        });
    }
  }
})();