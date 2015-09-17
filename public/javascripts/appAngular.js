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
	.factory('comun',function(){
		var comun = {}
		comun.tareas = [
			{
				nombre: 'Pasear al Perro',
				prioridad: 1
			},
			{
				nombre: 'Comprar Comida',
				prioridad: 2
			},
			{
				nombre: 'Ir al cine',
				prioridad: 0
			}
		]
		comun.tarea = {};
		comun.eliminar = function(tarea)
		{
			var indice = comun.tareas.indexOf(tarea);
			comun.tareas.splice(indice,1);
		}
		return comun;
	})
	.controller('ctrlAlta',function($scope,$state,comun){
		$scope.tarea = {}
		$scope.tareas = comun.tareas;
		$scope.prioridades = ['baja','media','alta'];
		$scope.agregar = function()
		{
			$scope.tareas.push({
				nombre: $scope.tarea.nombre,
				prioridad: parseInt($scope.tarea.prioridad)
			})
		}

		$scope.masPrioridad = function(tarea)
		{
			tarea.prioridad += 1;
		}
		$scope.menosPrioridad = function(tarea)
		{
			tarea.prioridad -= 1;
		}
		$scope.eliminar = function(tarea)
		{
			comun.eliminar(tarea)
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
			comun.eliminar(tarea);
			$state.go('alta');
		}
		$scope.actualizar = function(tarea)
		{
			var indice = comun.tareas.indexOf(tarea);
			comun.tareas[indice] = $scope.tarea;
			$state.go('alta');
		}
	})