(function() {
  angular
    .module('pugApp',
      [
        'ionic',
        'utils',
        'pug.controllers',
        'pug.controllers.speaker',
        'pug.controllers.agenda',
        'pug.controllers.userSettings',
        'pug.services',
        'pug.services.agenda',
        'pug.services.userSettings'
      ]
    ).run(run);

  function run($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
  }
})();