(function() {

  angular
    .module('pug.services', [])
    .factory('DataService', DataService);

  var dataUrl = 'https://congres.flusso.nl/script/cgiip.exe/WService=Congres/Data?login=EMEA-PUG-2014@flusso.nl&device-id=46.44.136.94&congres=EMEA-PUG-2014&password=Flusso';
  var data;

  /* @ngInject */
  function DataService($http, $q, $localstorage, $log) {
    var update = initializeData($http, $q);
    var fields = {
      AgendaItems: 'Appointment',
      Settings : 'Setting',
      Sessions : 'Sessie',
      Speakers : 'Speaker',
      SessionSpeakerLink: 'Sessie_speaker'
    };
    var service = {
      get: get,
      getTimestamp: getTimestamp,
      reload: reload
    };
    return service;

    function get(fieldName) {
      if (!fields[fieldName]) {
        console.error('Fieldname unknown', fieldName);
        return null;
      }

      return $q(function(resolve, reject) {
        update.then(function(message) {
          $log.info(message);
          resolve(data[fields[fieldName]]);
        }, function(message) {
          $log.error(message);
          reject(null);
        });
      });
    }

    function getTimestamp() {
      return new Date($localstorage.getObject('congres-data-timestamp'));
    }

    function reload() {
      return loadData();
    }

    function initializeData() {
      return $q(function(resolve, reject) {
        if (data) {
          resolve('Data already loaded');
        } else {
          data = $localstorage.getObject('congres-data');
          if (data.General) {
            resolve('Data loaded from local storage');
          } else {
            loadData()
              .then(function(message) {
                resolve(message);
              }, function(message) {
                reject(message);
              });
          }
        }
      });
    }

    function loadData() {
      return $q(function(resolve, reject) {
        $log.info('Going to load data from server');
        $http
          .get(dataUrl, {cache : true})
          .success(function(responseData, status, headers, config) {
            data = responseData;
            $localstorage.setObject('congres-data', data);
            $localstorage.setObject('congres-data-timestamp', new Date());
            resolve('Data loaded');
          }).error(function(responseData, status, headers, config) {
            $log.error(responseData);
            reject('Failed to load data');
          });
      });
    }
  }
})();
