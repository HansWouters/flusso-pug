(function(){
  angular
    .module('pug.controllers')
    .controller('HomeController', HomeController);

  function HomeController(SettingService, UserSettingsService, ScreenSizeService) {
    var homeScope = this;
    homeScope.username = UserSettingsService.getUserName();
    homeScope.getScreenSize = getScreenSize;

    SettingService.getBackground().then(function(background) {
      homeScope.background = "url(data:image/png;base64," + background.image + ")";
    }, function(errorMessage) {
      $log.error(errorMessage);
    });

    function getScreenSize(hasHeader) {
      return ScreenSizeService.getScreenSize(hasHeader);
    }
  }

})();