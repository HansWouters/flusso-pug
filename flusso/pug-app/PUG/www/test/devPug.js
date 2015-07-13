(function() {
  angular
    .module('pugDev', ['pugApp', 'ngMockE2E'])
    .run(initHttpBackend);

  function initHttpBackend($httpBackend) {


    $httpBackend.whenGET(/congres\.flusso\.nl/).respond(function(method, url, data) {
      console.log('Returning mock data');
      var request = new XMLHttpRequest();

      request.open('GET', '/test/responses/pug-data.json', false);
      request.send(null);

      return [request.status, JSON.parse(request.response), {}];
    });

    $httpBackend.whenGET(/\.html$/).passThrough();

  }

})();