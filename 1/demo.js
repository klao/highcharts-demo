$(function () {
    $.getJSON('/gh/get/response.json/klao/highcharts-demo/tree/master/1/', function (data) {

        // split the data set into ohlc and volume
        var ohlc = [],
            benchmark = [],
            indicator = [],
            dataLength = data.length,
            // set the allowed units for data grouping
            groupingUnits = [[
                'week',                         // unit name
                [1]                             // allowed multiples
            ], [
                'month',
                [1, 2, 3, 4, 6]
            ]],

            i = 0;

        for (i; i < dataLength; i += 1) {
            ohlc.push([
                data[i][0], // the date
                data[i][1], // open
                data[i][2], // high
                data[i][3], // low
                data[i][4]  // close
            ]);

            benchmark.push([
                data[i][0],
                data[dataLength - 1 - i][4]
            ]);

            indicator.push([
                data[i][0], // the date
                data[i][5] / 100000000
            ]);
        }


        // create the chart
        $('#container').highcharts('StockChart', {
            rangeSelector: {
                inputEnabled: $('#container').width() > 480,
                selected: 1
            },

            title: {
                text: 'AAPL Analysis'
            },

            yAxis: [{
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'AAPL'
                },
                height: '60%',
                offset: 0,
                lineWidth: 2
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Benchmark'
                },
                opposite: false,
                height: '60%',
                offset: 0,
                lineWidth: 2
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Analysis'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2,
                plotBands : [{
                    from : 0.1,
                    to : 0.22,
                    color : 'rgba(60, 220, 170, 0.2)'
                }]
            }],

            navigator: {
                baseSeries: 1
            },
            series: [{
                type: 'line',
                name: 'Benchmark',
                data: benchmark,
                yAxis: 1,
                marker: {
                    enabled: true
                },
                dataGrouping: {
                    units: groupingUnits
                }
            }, {
                type: 'candlestick',
                name: 'AAPL',
                data: ohlc,
                zIndex: 1,
                // Better to change the order and set the navigator.baseSeries
                // color: Highcharts.getOptions().colors[1],
                dataGrouping: {
                    units: groupingUnits
                }
            }, {
                type: 'spline',
                name: 'Indicator',
                data: indicator,
                yAxis: 2,
                dataGrouping: {
                    units: groupingUnits
                }
            }]
        });
    });
});
