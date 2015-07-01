'use strict';

/**
 * @ngdoc function
 * @name expApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the expApp
 */
var app = angular.module('contactApp',[])
  app.controller('contactCtrl', function ($scope,$http) {
  	function refresh(){
  		$http.get('/contactlist').success(function(response){
  		$scope.persons = response
  		});
  	}
  	refresh();
  	$scope.addperson = function(){
  		$http.post('/contactlist',$scope.contact).success(function(response){
  			$scope.contact='';
  			refresh();
  		})
  	}
  	$scope.delperson=function(id){
  			alert('/contactlist/'+id);
  		$http.delete('/contactlist/'+id).success(function(response){
  			refresh();
  		})
  	}
  	$scope.editperson=function(id){

  		$http.get('/contactlist/'+id).success(function(response){
  			$scope.contact = response
  		})
  	}
  	$scope.updateperson =function(){
  		$http.put('/contactlist/'+$scope.contact._id,$scope.contact).success(function(response){
  			refresh();
  		})
  	}
  });