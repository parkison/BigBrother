(function () {
  'use strict';

  angular.module('myApp.controllers')
    .controller('DemoCtrl', ['$scope', 'Getdata', function($scope, Getdata){
      
      $scope.macList = [];
      $scope.macTitle = "";

      var selectedItem;

      setInterval(function(){ 
        Getdata.get().$promise.then(function(newData){
          $scope.d3Data = JSON.parse(newData.value).macaddresslist;
          updateList(selectedItem)

          console.log('Data Update')
        });
      }, 1000);

      //OnClick Function, Bound to Directive
      $scope.d3OnClick = function(item){
        $scope.$apply(function() {
          console.log("Clicked: "+item.name);

          //Update List
          selectedItem = item.name;
          updateList(selectedItem)
        });
      };

      //Function for Updating Listed Items
      var updateList = function(selected){
        if(!selected){
          $scope.macList = [];
          $scope.macTitle = "";
        }
        else{
          $scope.macList = _.where($scope.d3Data, {loc: selected});
          $scope.macTitle = "MAC Addresses Present";
        }
      }

    }]);

}());
