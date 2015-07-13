(function() {

  angular
    .module('pug.services')
    .factory('SessionSpeakerLinkService', SessionSpeakerLinkService);

  /* @ngInject */
  function SessionSpeakerLinkService(DataService, SessionService, SpeakerService, $q) {
    var linkValues = ['speaker', 'session'];
    var links;
    var update = initializeLinks();
    var service = {
      get: get
    };
    return service;

    function get(getWhat, id) {
      if (linkValues.indexOf(getWhat) < 0) {
        console.error(getWhat, 'not in', linkValues);
        return null;
      }

      return $q(function(resolve) {
        update.then(function() {
          if (getWhat == 'session') {
            resolve(getSessionBySpeaker(id));
          } else if (getWhat == 'speaker') {
            resolve(getSpeakerBySession(id));
          } else {
            return null;
          }
        }, function() {
          return null;
        });
      });
    };

    function initializeLinks() {
      return $q(function(resolve, reject) {
        if (!links) {
          var qData = DataService.get('SessionSpeakerLink');
          qData.then(function(data) {
            links = data;
            resolve('SessionSpeakerLinks updated');
          }, function(data) {
            console.error('Failure');
            console.error(data);
            reject('Failed to update links');
          });
        } else {
          resolve('Links already set');
        }
      });
    }

    function getSessionBySpeaker(speakerId) {
      for (linkIndex in links) {
        link = links[linkIndex];
        if (link.sessie_speaker_id == speakerId) {
          return SessionService.get(link.sessie_id)
            .then(function (session) {
              console.log('Returning session', session.sessie_id, 'for speaker', speakerId);
              return session;
            }, function () {
              return null;
            });
        }
      }
      return null;
    };

    function getSpeakerBySession(sessionId) {
      for (linkIndex in links) {
        link = links[linkIndex];
        if (link.sessie_id == sessionId) {
          return SpeakerService.get(link.sessie_speaker_id)
            .then(function (speaker) {
              return speaker;
            }, function () {
              return null;
            });
        }
      }
      return null;
    };
  };

})();