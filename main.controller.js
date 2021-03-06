'use strict';

var splatoonApp = angular.module("splatoonApp", []);


angular.module('splatoonApp')
.controller('MainCtrl', function ($scope) {

	//Load in datatables
	angular.module('splatoonApp').stats($scope);
	angular.module('splatoonApp').abilities($scope);
	angular.module('splatoonApp').gear($scope);

	//Start main logic
	var points = 0;
	$scope.mains = [];
	$scope.subs = [];

	$scope.activate = function(ability){

		/*
		for(var i = 0; i < $scope.mains.length; i++){
			for(var j=0; j < $scope.gear.length; j++){

					if($scope.gear[j].ability === $scope.mains[i].name){
						abilitygear[i].push($scope.gear[j].type)
				}

			}
		}
		*/


		if (points >= 57) {
			alert('Too Many Abilities!!');
			return;
		}

		var i = $scope.abilities.indexOf(ability);
		if( $scope.mains.length<3 ){

			if($scope.abilities[i].stackable || $scope.mains.indexOf(ability) == -1){
				$scope.mains.push($scope.abilities[i]);
				points+=10;
				console.log($scope.mains.length);

				console.log($scope.mains[$scope.mains.length-1]);
				calc();
			}
			else {
				alert('Cant Stack This Ability!!');
				return;
			}
		}

		else if ( $scope.abilities[i].stackable ){
			$scope.subs.push($scope.abilities[i]);
			points+=3;
			calc();
		}
		else {
			alert('Cannot Sub This Ability!!');
		}
	};

	$scope.demain = function(main) {
		$scope.mains.splice($scope.mains.indexOf(main), 1);
		points-=10;
		calc();
	};
	$scope.desub = function(sub) {
		$scope.subs.splice($scope.subs.indexOf(sub), 1);
		points-=3;
		calc();
	};

	// Calc function for finding values
	function calc() {


		//Hide all gear and show what is selected.
		for(var i = 0; i < $scope.gear.length; i++){
				console.log('hiding gear');
				$scope.gear[i].show = false;
				$scope.gear[i].uname = $scope.gear[i].name.replace(/ /g,'_');
			}
			console.log($scope.gear[0].show);

		for(var i = 0; i < $scope.gear.length; i++){
				for(var j=0; j < $scope.mains.length; j++){

					if($scope.gear[i].ability === $scope.mains[j].name){
						console.log('showing ' + $scope.gear[i].name);

						$scope.gear[i].show = true;
						console.log('showing ' + $scope.gear[i].show);

					}
					for(var itm in $scope.gear[i]){
						if(itm === $scope.mains[j].name && $scope.gear[i][itm] === '1/3.3'){
							console.log('showing ' + $scope.gear[i].name);
							$scope.gear[i].show = true;
							console.log('showing ' + $scope.gear[i].show);
						}
					}
				}
			}

		for(var i=0; i < $scope.stats.length; i++){
			var name = $scope.stats[i].name;
			$scope.stats[i].apply(
				$scope.mains.count(name),
				$scope.subs.count(name)
			);
		}
	}

	$scope.clear = function() {
		console.log('CLEARED');
		$scope.mains.length=0;
		$scope.subs.length=0;
		points = 0;
		calc();
	};
});
