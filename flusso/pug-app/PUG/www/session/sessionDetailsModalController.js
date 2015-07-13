(function() {
  angular
    .module('pug.services')
    .controller('SessionDetailsModalController', SessionDetailsModalController);

  /* @ngInject */
  function SessionDetailsModalController(SessionService, $scope) {
    modalScope = this;
    SessionService.get($scope.$parent.$parent.$parent.session).then(
      function(session) {
        modalScope.session = session;
      }
    );
  }
})();