(function() {
  angular
    .module('pug.controllers.userSettings', [])
    .controller('UserSettingsController', UserSettingsController);

  function UserSettingsController(UserSettingsService, DataService, $ionicPopup) {
    var settingsScope = this;
    settingsScope.user = {name: UserSettingsService.getUserName()};
    settingsScope.setUserName = setUserName;
    settingsScope.reloadData = reloadData;
    settingsScope.dataTimestamp = DataService.getTimestamp();

    function setUserName(name) {
      UserSettingsService.setUserName(name);
    }

    function reloadData() {
      confirmationPopup('Reload', 'Sure you want to reload?').then(function(confirmed) {
        if (confirmed) {
          DataService.reload().then(function() {
            settingsScope.dataTimestamp = DataService.getTimestamp();
            showPopup('Reload...', 'Data reloaded');
          }, function() {
            showPopup('Reload...', 'Failed to update data');
          });
        }
      });
    }

    function confirmationPopup(title, message) {
      return $ionicPopup.confirm({
        title: title,
        template: message
      });
    }

    function showPopup(title, message) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: message
      });
    }

  }
})();