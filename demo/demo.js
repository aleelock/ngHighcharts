var myapp = angular.module('myapp', ['ngHighcharts']);


myapp.controller('myctrl', ['$scope', function($scope){

    var obj =  {
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {name: 'Chrome', y: 12.8, sliced: true,selected: true},
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['Others',   0.7]
            ]
        }]
    };
    $scope.json = localStorage.getItem('___json___')|| JSON.stringify(obj);


    $scope.doApply = function(){

        var v = $('#json').val();

        localStorage.setItem('___json___',v);

        $scope.chartConfig = eval('('+v+')');

    };

    $scope.doApply1 = function(){

        $scope.loadingFlag=true;

        $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-ohlc.json&callback=?', function(data) {

            $scope.chartConfig = {

                useHighStocks : true,

                rangeSelector : {
                    selected : 2
                },

                title : {
                    text : 'AAPL Stock Price'
                },

                series : [{
                    type : 'ohlc',
                    name : 'AAPL Stock Price',
                    data : data,
                    dataGrouping : {
                        units : [[
                            'week', // unit name
                            [1] // allowed multiples
                        ], [
                            'month',
                            [1, 2, 3, 4, 6]
                        ]]
                    }
                }]
            };
            $scope.loadingFlag=false;
            $scope.$apply();

        });


    };
    $scope.doApply2 = function(){

        $scope.chartConfig =  {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Stacked column chart'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                }
            },
            series: [{
                name: 'John',
                data: [5, 3, 4, 7, 2]
            }, {
                name: 'Jane',
                data: [2, 2, 3, 2, 1]
            }, {
                name: 'Joe',
                data: [3, 4, 4, 2, 5]
            }]
        }

    };
    $scope.doApply3 = function(){

        var obj = {};
        obj.xAxis={
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        };
        obj.yAxis={
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        };
        obj.series =  [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }];

        $scope.chartConfig = obj;

    };

}]);

