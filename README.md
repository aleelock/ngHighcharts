# ngHighcharts

## AngularJs directive for Highcharts
修改自 https://github.com/bharrat/ngHighcharts
## 特性
* 1. 支持 loading
* 2. 支持 highstock

## 使用:
* html代码:
```html5
<highchart data-options="myChartConfig" data-loading="myLoadingFlag"></highchart>
```
其中 myChartConfig 和 myLoadingFlag 为随意起的名字

* js代码:
```js
//在controller中，
$scope.myChartConfig = opts
/*
这个 opts 是一个 json， 它是 Highchart 或 Highstock 的 options json,
只是多了一个 useHighStocks 的 key，value是 true 或 false 或不填,
改变这个 myChartConfig, 即可重绘。
（注意，一定要改变 myChartConfig 的引用，即直接给myChartConfig赋值，给他的某个属性赋值是不会引起变化的）。
*/
$scope.myLoadingFlag = true | false
/* 改变这个flag 为true，则显示 "loading...", false则隐藏 "loading..."
 */
```

