angular.module('chartDemo', ['ngHighcharts']).
    config(function() {

    });

function DemoCtrl($scope) {
    $scope.title = "Directive Demo";
    $scope.chartData = {
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['Others',   0.7]
            ]
        }]
    }
}
