angular.module('appTareas',['ui.router'])
	.config(function($stateProvider,$urlRouterProvider){
		$stateProvider.
		state('alta',{
			url:'/alta',
			templateUrl:'/views/alta.html',
			controller: 'ctrlAlta'
		})
		.state('editar',
		{
			url:'/editar/{id}',
			templateUrl:'/views/editar.html',
			controller: 'ctrlEditar'
		});
		$urlRouterProvider.otherwise('alta');
	})
	.factory('comun',function($http){
		var comun = {}
		comun.tareas = []
		comun.tarea = {};
		/*comun.eliminar = function(tarea)
		{
			var indice = comun.tareas.indexOf(tarea);
			comun.tareas.splice(indice,1);
		}*/
		/*** Metodos Remotos ****/
		comun.getAll = function()
		{
			return $http.get('/tareas')
			 		.success(function(data){
			 			angular.copy(data,comun.tareas)
			 			return comun.tareas
			 		});
		}
		comun.add = function(tarea)
		{
			return $http.post('/tareas',tarea)
					.success(function(tarea){
						comun.tareas.push(tarea);
					});
		}
		comun.update = function(tarea)
		{
			return $http.post('/edit/'+tarea._id,tarea)
				   .success(function(data){
				     var indice = comun.tareas.indexOf(tarea);
				     comun.tareas[indice] = data;
				   });
		}


		comun.delete = function(tarea)
		{
			return $http.post('/delete/'+tarea._id)
				   .success(function(){
				   		var indice = comun.tareas.indexOf(tarea);
						comun.tareas.splice(indice,1);
				   });
		}

		return comun;
	})
	.controller('ctrlAlta',function($scope,$state,comun){
		$scope.tarea = {}
		comun.getAll();
		$scope.tareas = comun.tareas;
		$scope.prioridades = ['baja','media','alta'];
		$scope.agregar = function()
		{
			comun.add({
				nombre: $scope.tarea.nombre,
				prioridad: parseInt($scope.tarea.prioridad)
			})
		}

		$scope.masPrioridad = function(tarea)
		{
			tarea.prioridad += 1;
			comun.update(tarea);
		}
		$scope.menosPrioridad = function(tarea)
		{
			tarea.prioridad -= 1;
			comun.update(tarea);
		}
		$scope.eliminar = function(tarea)
		{
			comun.delete(tarea)
		}
		$scope.procesaObjeto = function(tarea)
		{
			comun.tarea = tarea;
			$state.go('editar');
		}
	}).
	controller('ctrlEditar',function($scope,$state,comun){
		$scope.tarea = comun.tarea;
		$scope.eliminar = function(tarea)
		{
			comun.delete(tarea);
			$state.go('alta');
		}
		$scope.actualizar = function(tarea)
		{
			comun.update($scope.tarea);
			$state.go('alta');
		}
	})