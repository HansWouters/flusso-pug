(function() {

  angular
    .module('pug.services')
    .factory('SessionService', ['DataService', '$q', SessionService]);

  function SessionService(DataService, $q) {
    var sessions;
    var update = initializeSessions();
    var service = {
      query: query,
      get: get,
    };
    return service;

    function query() {
      return $q(function(resolve) {
        update.then(function() {
          resolve(sessions);
        }, function() {
          resolve([]);
        });
      });
    }

    function get(sessionId) {
      return $q(function(resolve) {
        update.then(function() {
          resolve(getSessionById(sessionId));
        }, function() {
          return null;
        });
      });
    };

    function initializeSessions() {
      return $q(function(resolve, reject) {
        if (!sessions) {
          console.log('Going to load sessions');
          var qSessions = DataService.get('Sessions');
          qSessions.then(function(data) {
            sessions = data;
            console.log('Number of sessions = ', sessions.length);
            resolve('Sessions updated');
          }, function(data) {
            console.error('Failure');
            console.error(data);
            reject('Failed to update sessions')
          });
        } else {
          resolve('Sessions already set');
        }
      });

    }

    function getSessionById(sessionId) {
      for (var i = 0; i < sessions.length; i++) {
        if (sessions[i].sessie_id == parseInt(sessionId)) {
          return sessions[i];
        }
      }
      return null;
    };
  }

})();