'use strict';
/**
 * -----------------------------------------------
 * 修改自 https://github.com/bharrat/ngHighcharts
 * 1. 支持 loading
 * 2. 支持 highstock
 * -----------------------------------------------
 *
 * usage:
 *    html:   <highchart data-options="myChartConfig" data-loading="myLoadingFlag"></highchart>
 *        其中 myChartConfig 和 myLoadingFlag 为随意起的名字
 *
 *    js:
 *        在controller中，
 *        $scope.myChartConfig = opts
 *           这个 opts 是一个 json， 它是 Highchart 或 Highstock 的 options json,
 *           只是多了一个 useHighStocks 的 key，value是 true 或 false 或不填
 *           改变这个 myChartConfig, 即可重绘。
 *            （注意，一定要改变 myChartConfig 的引用，即直接给myChartConfig赋值，给他的某个属性赋值是不会引起变化的）。
 *
 *        $scope.myLoadingFlag = true | false
 *           改变这个flag 为true，则显示 "loading...", false则隐藏 "loading..."
 *  -----------------------------------------------
 */

angular.module('ngHighcharts',[])
    .directive('highchart', function () {
        //any default options can be configured here
        var defaultChartOptions = {

        };
        var buildChartOptions = function(userOptions, element, attrs) {
            var chartOpts = angular.extend({}, defaultChartOptions);
            if (typeof chartOpts.chart == "undefined") {
                chartOpts.chart = {};
            }
            if (attrs.height && !isNaN(attrs.height)) {
                chartOpts.chart.height = attrs.height;
            }
            if (attrs.width && !isNaN(attrs.width)) {
                chartOpts.chart.width = attrs.width;
            }
            chartOpts = angular.extend(chartOpts, userOptions);
            chartOpts.chart['renderTo'] = element[0];
            return chartOpts;
        };
        return {
            restrict: 'EA',
            template: '<div></div>',
            scope: {
                chartOptions: "=options",
                loading: "=loading"
            },
            replace: true,
            link: function (scope, element, attrs) {

                var chart = null;
                scope.$watch('chartOptions', function(newVal) {
                    //Highstock supports
                    if(newVal && newVal.useHighStocks){
                        chart = new Highcharts.StockChart(buildChartOptions(newVal, element, attrs));
                    }
                    else{
                        chart = new Highcharts.Chart(buildChartOptions(newVal, element, attrs));
                    }
                });

                //loading supports
                scope.$watch('loading', function(v){
                    if(v===true){
                        if(chart){
                            chart.showLoading();
                            chart.redraw();
                        }
                    }else{
                        if(chart){
                            chart.hideLoading();
                            chart.redraw();
                        }
                    }
                })
            }
        };
    });