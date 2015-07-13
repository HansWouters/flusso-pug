(function() {

  angular
    .module('pug.controllers.agenda')
    .controller('AgendaTabController', AgendaTabController);

  /* @ngInject */
  function AgendaTabController(AgendaService, SessionDetailsModalService, $scope, $log, $state) {
    var dayScope = this;
    dayScope.areas = [];
    dayScope.getSession = getSession;
    dayScope.openModal = openModal;

    AgendaService.query(true)
    .then(function(agendaItems) {
      var selectedDay = getSelectedDay(agendaItems);
      selectedDay.times.forEach(function(timeSlot) {
        if (timeSlot.sessions.length > dayScope.areas.length) {
          dayScope.areas = [];
          timeSlot.sessions.forEach(function(session) {
            dayScope.areas.push(session.area_description);
          });
        }
      });
      dayScope.day = selectedDay;
    });

    function openModal(sessionId) {
      $log.debug('Lets open a modal for', sessionId);
      SessionDetailsModalService.showModal($scope, sessionId);
    }

    function getSession(time, area) {
      for (sessionIndex in time.sessions) {
        var session = time.sessions[sessionIndex];
        if (session.area_description == area) {
          return session;
        }
      }
      return {
        appointment_type: 'No',
        sessie_subject: ''
      };
    }

    function getSelectedDay(agendaItems) {
      var index = parseInt($state.current.url);
      if (index >= agendaItems.length) {
        index = 0;
      }
      return agendaItems[index];
    }

  }
})();