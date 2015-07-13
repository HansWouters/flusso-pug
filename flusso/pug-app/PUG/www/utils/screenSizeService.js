(function() {
  angular
    .module('utils')
    .factory('ScreenSizeService', ScreenSizeService);

  function ScreenSizeService() {
    var service = {
      getScreenSize: getScreenSize
    }
    return service;

    function getScreenSize(hasHeader) {
      return {
        width: window.innerWidth + 'px',
        height: (window.innerHeight - (hasHeader ? 43 : 0)) + 'px'
      };
    }

  }
})();