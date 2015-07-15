(function() {
  angular
    .module('pugApp')
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('pug', {
      url : '/',
      abstract: true,
      views: {
        menu: {
          templateUrl : 'menu/menu.html'
        }
      }
    });

    $stateProvider.state('pug.home', {
      url: '',
      views: {
        defaultview: {
          templateUrl: 'home/home.html',
          controller: 'HomeController as HomeCtrl'
        }
      }
    });

    $stateProvider.state('pug.agenda', {
      url: 'agenda/day',
      views: {
        'defaultview': {
          templateUrl: 'agenda/agenda.html',
          controller: 'AgendaController as AgendaCtrl'
        }
      }
    });

    $stateProvider.state('pug.agenda.day0', {
      url: '0',
      views: {
        'agendaTabContent-0': {
          templateUrl: 'agenda/agenda-day-tab.html',
          controller: 'AgendaTabController as AgendaTabCtrl'
        },
      }
    });

    $stateProvider.state('pug.agenda.day1', {
      url: '1',
      views: {
        'agendaTabContent-1': {
          templateUrl: 'agenda/agenda-day-tab.html',
          controller: 'AgendaTabController as AgendaTabCtrl'
        },
      }
    });

    $stateProvider.state('pug.agenda.date.session', {
      url: '/:sessionId',
      views: {
        agendaSessionDetails: {
          templateUlr: 'agenda/agenda-session-details.html',
          controller: 'AgendaSessionController as AgendaSessionCtrl'
        }
      }
    });

    $stateProvider.state('pug.sessions', {
      url : 'sessions',
      views: {
        'defaultview': {
          templateUrl : 'session/session-list.html',
          controller : 'SessionListController as sessionListCtrl'
        }
      }
    });

    $stateProvider.state('pug.speaker', {
      abstract: true,
      url: 'speaker',
      views: {
        'defaultview': {
          template: '<ion-nav-view></ion-nav-view>'
        }
      }
    });

    $stateProvider.state('pug.speaker.list', {
      url : '',
      templateUrl : 'speaker/speaker-list.html',
      controller : 'SpeakerListController as speakerListCtrl'
    });

    $stateProvider.state('pug.speaker.details', {
      url : '/:speakerId',
      templateUrl : 'speaker/speaker-details.html',
      controller : 'SpeakerController as speakerCtrl'
    });

    $stateProvider.state('pug.sponsor', {
      url: 'sponsors',
      views: {
        defaultview: {
          templateUrl: 'sponsor/sponsors.html',
          controller: 'SponsorController as SponsorCtrl'
        }
      }
    });

    $stateProvider.state('pug.settings', {
      url: 'settings',
      views: {
        defaultview: {
          templateUrl: 'userSettings/settings.html',
          controller: 'UserSettingsController as SettingsCtrl'
        }
      }
    });

  }
})();
