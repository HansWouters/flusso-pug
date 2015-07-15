(function() {
  angular
    .module('utils')
    .factory('ScreenSizeService', ScreenSizeService);

  function ScreenSizeService() {
    var service = {
      getScreenSize: getScreenSize,
      HEADER_HEIGHT: 43
    };
    return service;

    /**
     * @param int|bool verticalCorrection value to subtract from the height. If true is given, HEADER_HEIGHT will be subtracted
     * @returns object containing the width and height of the window
     */
    function getScreenSize(verticalCorrection) {
      if (verticalCorrection === true) {
        verticalCorrection = service.HEADER_HEIGHT;
      } else if (!verticalCorrection) {
        verticalCorrection = 0;
      }

      return {
        width: window.innerWidth + 'px',
        height: (window.innerHeight - verticalCorrection) + 'px'
      };
    }

  }
})();