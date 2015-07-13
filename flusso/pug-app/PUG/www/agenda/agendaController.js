(function() {

  angular
    .module('pug.controllers.agenda', [])
    .controller('AgendaController', AgendaController);

  /* @ngInject */
  function AgendaController(AgendaService, ScreenSizeService, $state) {
    var agendaScope = this;
    agendaScope.getScreenSize = getScreenSize;

    AgendaService.query(true)
      .then(function(agendaItems) {
        agendaScope.days = agendaItems;
        if ($state.current.name == 'pug.agenda') {
          console.log('State match');
          var selectedIndex = 0;
          var todayTimeStamp = new Date().setHours(0, 0, 0, 0);
          for (dayIndex in agendaScope.days) {
            var dayTimeStamp = new Date(agendaScope.days[dayIndex].date).setHours(0, 0, 0, 0);
            if (todayTimeStamp == dayTimeStamp) {
              selectedIndex = dayIndex;
            }
          }
          $state.go('pug.agenda.day' + selectedIndex);
        } else {
          console.log('State mismatch', $state.current.name);
        }
      });

    function getScreenSize(hasHeader) {
      return ScreenSizeService.getScreenSize(hasHeader);
    }

  }
})();