(function() {

angular
  .module('pug.services')
  .service('SessionDetailsModalService', SessionDetailsModalService);

  /* @ngInject */
  function SessionDetailsModalService($ionicModal, $log) {
    var modalScope = this;
    modalScope.showModal = showModal;

    function showModal($parent, sessionId) {
      $parent.session = sessionId;
      $ionicModal.fromTemplateUrl('session/session-details-modal.html', {
          scope: $parent,
          animation: 'slide-in-up'
        }).then(function(modal) {
          modalScope.modal = modal;
          modalScope.modal.show();
        });

      $parent.$on('$destroy', function() {
        $log.debug('Destroy that modal!');
        modalScope.modal.remove();
      });
    };
  }
})();