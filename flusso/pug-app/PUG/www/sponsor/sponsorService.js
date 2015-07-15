(function() {
  angular
    .module('pug.services')
    .factory('SponsorService', SponsorService);

  function SponsorService(DataService, $q) {
    var sponsors;
    var update = initializeData();
    var service = {
      query: query
    };
    return service;

    function query() {
      return $q(function(resolve) {
        update.then(function() {
          resolve(sponsors);
        }, function() {
          resolve([]);
        });
      });
    }

    function initializeData() {
      return $q(function(resolve, reject) {
        if (!sponsors) {
          var qSettings = DataService.get('Sponsors');
          qSettings.then(function(data) {
            sponsors = data.sort(sortByType);
            resolve('Sponsors updated');
          }, function(data) {
            reject('Failed to update sponsors')
          });
        } else {
          resolve('Sponsors already set');
        }
      });
    }

    function sortByType(sponsor1, sponsor2) {
      if (sponsor1.sponsortype_id !== sponsor2.sponsortype_id) {
        return sponsor1.sponsortype_id > sponsor2.sponsortype_id ? 1 : -1;
      } else {
        return sponsor1.sponsor_id > sponsor2.sponsor_id ? 1 : -1;
      }
    }
  }
})();