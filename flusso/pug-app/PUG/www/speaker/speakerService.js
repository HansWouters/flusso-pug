(function() {

  angular
    .module('pug.services')
    .factory('SpeakerService', SpeakerService);

  /* @ngInject */
  function SpeakerService(DataService, $q) {
    var speakers;
    var update = initializeSpeakers();
    var service = {
      query: query,
      get: get
    };
    return service;

    function query(index) {
      return $q(function(resolve) {
        update.then(function(speakers) {
          if (index) {
            resolve(getIndexedSpeakers());
          } else {
            resolve(speakers);
          }
        }, function() {
          resolve([]);
        });
      });
    }

    function get(speakerId) {
      return $q(function(resolve) {
        update.then(function() {
          resolve(getSpeakerById(speakerId));
        }, function() {
          return null;
        });
      });
    };

    function initializeSpeakers() {
      return $q(function(resolve, reject) {
        if (!speakers) {
          console.log('Going to load speakers');
          DataService.get('Speakers')
            .then(function(data) {
              speakers = data.sort(sortByName);
              resolve('Speakers updated');
            }, function(data) {
              console.error('Failure', data);
              reject('Failed to load speakers')
            });
        } else {
          console.log('Speakers already set');
          resolve('Speakers already set');
        }
      });

      function sortByName(speaker1, speaker2) {
        if (speaker1.lastName != speaker2.lastName) {
          return speaker1.lastName.toUpperCase() > speaker2.lastName.toUpperCase() ? 1 : -1;
        } else if (speaker1.firstName != speaker2.firstName) {
          return speaker1.lastName.toUpperCase() > speaker2.lastName.toUpperCase() ? 1 : -1;
        } else {
          return (
            (speaker1.speaker_id == speaker2.speaker_id)
            ? 0
            : ((speaker1.speaker_id > speaker2.speaker_id) ? 1 : -1)
          );
        }
      };

    };

    function getSpeakerById(speakerId) {
      for (var i = 0; i < speakers.length; i++) {
        if (speakers[i].speaker_id == parseInt(speakerId)) {
          return speakers[i];
        }
      }
      return null;
    };

    function getIndexedSpeakers() {
      var indices = [];
      var index = {};
      speakers.forEach(function(speaker) {
        letter = speaker.lastName.charAt(0).toUpperCase();
        if (index.letter == letter) {
          index.speakers.push(speaker);
        } else {
          if (index.letter) {
            indices.push(index);
          }
          index = {
            'letter': letter,
            'speakers': [ speaker ]
          };
        }
      });
      return indices;
    };

  };

})();
