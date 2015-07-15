(function() {
  angular
    .module('pug.controllers')
    .controller('SponsorController', SponsorController);

  function SponsorController(SponsorService, ScreenSizeService, $ionicSlideBoxDelegate) {
    var sponsorScope = this;
    sponsorScope.gotoIndex = gotoIndex;
    sponsorScope.getScreenSize = getScreenSize;

    SponsorService.query().then(function(sponsors) {
      sponsorScope.sponsors = sponsors;
    });

    function gotoIndex(index) {
      $ionicSlideBoxDelegate.slide(index);
    }

    function getScreenSize(verticalCorrection) {
      return ScreenSizeService.getScreenSize(verticalCorrection);
    }

  }

})();