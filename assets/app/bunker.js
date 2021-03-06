window.app = angular.module('bunker', [
		'ngSanitize',
		'sailsResource',
		'ui.router',
		'ui.gravatar',
		'angularMoment'
	])
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('lobby', {
				url: '/',
				templateUrl: '/assets/app/lobby/lobby.html',
				controller: 'LobbyController as lobby'
			})
			.state('room', {
				url: '/rooms/{roomId}',
				templateUrl: '/assets/app/room/room.html',
				controller: 'RoomController as roomCtrl',
				resolve: {
					current: function($stateParams, bunkerApi, roomService) {
						var roomId = $stateParams.roomId;
						// Angular UI router will complete this before creating the controller if a $promise is returned
						return bunkerApi.room.get({id: roomId}, function(room){
							roomService.current = room;
						}).$promise;
					},
					bunkerApi: 'bunkerApi',
					roomService: 'rooms'
				}
			});
	})
	.config(function ($compileProvider) {
		// This is where we might customize the sanitize whitelist some day
		// $compileProvider.imgSrcSanitizationWhitelist();
	});
