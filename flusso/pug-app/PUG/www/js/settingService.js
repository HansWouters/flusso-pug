(function() {

  angular
    .module('pug.services')
    .factory('SettingService', SettingService);

  function SettingService(DataService, $q, $log) {
    var settings;
    var update = initializeSettings();
    var service = {
      getBackground: getBackground
    };
    return service;

    function getBackground() {
      return $q(function(resolve, reject) {
        update.then(function() {
          resolve(settings['BackgroundImage']);
        }, function() {
          reject('Could not get background');
        });
      });
    }

    function initializeSettings() {
      return $q(function(resolve, reject) {
        if (!settings) {
          $log.info('Going to load settings');
          var qSettings = DataService.get('Settings');
          qSettings.then(function(data) {
            settings = mapSettings(data);
            resolve('Settings updated');
          }, function(data) {
            $log.error('Failure');
            $log.error(data);
            reject('Failed to update settings')
          });
        } else {
          $log.info('Settings already set');
          resolve('Settings already set');
        }
      });
    };

    function mapSettings(unmapped) {
      mapped = {};
      unmapped.forEach(function(setting) {
        mapped[setting.setting] = setting;
      });
      return mapped;
    }
  }
})();
