(function() {

  angular
    .module('pug.services.agenda', [])
    .factory('AgendaService', AgendaService);

  /* @ngInject */
  function AgendaService(DataService, $q) {
    var agendaItems;

    var update = initializeAgenda();
    var service = {
      query: query
    };
    return service;

    function query(index) {
      return $q(function(resolve) {
        update.then(function() {
          if (index) {
            resolve(getIndexedItems());
          } else {
            resolve(agendaItems);
          }
        }, function() {
          resolve([]);
        });
      });
    }

    function initializeAgenda() {
      return $q(function(resolve, reject) {
        if (agendaItems) {
          resolve('Items already loaded');
        }
        console.log('Loading agenda items');
        DataService.get('AgendaItems').then(function(data) {
          data.forEach(function (item) {
            item.startTimeStamp = (new Date(item.startDate)).setSeconds(item.startTime);
          });
          agendaItems = data;
          console.log('Loaded agenda items');
          resolve('Loaded agenda items');
        }, function(data) {
          console.error('Failed to load agenda data', data);
          reject('Failed to load agenda data');
        });
      });
    }

    function getIndexedItems() {
      var days = [];
      var day = {};

      sorted = agendaItems.sort(function(agendaItem1, agendaItem2) {
        if (agendaItem1.startTimeStamp != agendaItem2.startTimeStamp) {
          return (agendaItem1.startTimeStamp > agendaItem2.startTimeStamp) ? 1 : -1;
        } else if (agendaItem1.area_id != agendaItem2.area_id) {
          return (agendaItem1.area_id > agendaItem2.area_id) ? 1 : -1;
        } else {
          return (agendaItem1.appointment_id > agendaItem2.appointment_id) ? 1 : -1;
        }
      });

      sorted.forEach(function(agendaItem) {
        var date = agendaItem.startDate;
        if (day.date == date) {
          var pushed = day.times.some(function(time) {
            if (time.time == agendaItem.startTimeStamp) {
              time.sessions.push(agendaItem);
              return true;
            } else {
              return false;
            }
          });
          if (!pushed) {
            day.times.push({
              time: agendaItem.startTimeStamp,
              sessions: [agendaItem]
            });
          }
        } else {
          day = {
            date: agendaItem.startDate,
            times: [{
              time: agendaItem.startTimeStamp,
              sessions: [agendaItem]
            }]
          };
          days.push(day);
        }
      });
      return days;
    }

  }
})();