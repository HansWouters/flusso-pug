(function() {

  angular
    .module('pug.services')
    .factory('SettingService', ['DataService', '$q', SettingService ]);

  function SettingService(DataService, $q) {
    var settings;
    var update = initializeSettings();
    var service = {
      getBackground: getBackground
    };
    return service;

    function getBackground() {
      console.log('Lets get some background');
      return $q(function(resolve, reject) {
        update.then(function() {
          console.log('Got background');
          resolve(settings['BackgroundImage']);
        }, function() {
          console.error('No background');
          reject('Could not get background');
        });
      });
    }

    function initializeSettings() {
      return $q(function(resolve, reject) {
        if (!settings) {
          console.log('Going to load settings');
          var qSettings = DataService.get('Settings');
          qSettings.then(function(data) {
            settings = mapSettings(data);
            resolve('Settings updated');
          }, function(data) {
            console.error('Failure');
            console.error(data);
            reject('Failed to update settings')
          });
        } else {
          console.log('Settings already set');
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
