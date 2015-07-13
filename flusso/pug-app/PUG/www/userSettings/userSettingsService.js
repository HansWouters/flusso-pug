(function() {
  angular
    .module('pug.services.userSettings', [])
    .factory('UserSettingsService', UserSettingsService);

  function UserSettingsService($localstorage, $log) {
    var service = {
      setUserName: setUserName,

      getUserName: getUserName
    }
    return service;

    function setUserName(name) {
      $localstorage.set('user.name', name);
    }

    function getUserName() {
      return $localstorage.get('user.name');
    }
  }

})();