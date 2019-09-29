/**
 * 1、其中如何动态修改饼图或者柱状图的参数？
 * 例如（以下修改柱状图的颜色和文字描述，以及图表中显示的series）：
 * var optionColumn = myChart.getOption(); //获取到一个json对象，不管之前配置中是对象还是数组，在此返回的都是数组,如柱状图的legend将是数组形式返回
 * optionColumn.color = color2;
    optionColumn.legend[0].data = arr1;
    optionColumn.series = arr2;
    myChart.setOption(optionColumn, true);
 *
 *
 * 2、如何在饼图触发方法：click，mouseout，mouseover等？
 * myChart.on('mouseout', function (e) {});
 * myChart.on('click', function (e) {});
 *
 *
 * 3、如何动态修改高亮凸出的扇形区？
 * myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 1 }); //series中的data数组下标为1的高亮
 * myChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: 2 });  //series中的data数组下标为2的不显示高亮
 * 
 * 4、如何设置半圆饼图中心的文字
 * option 下的 
 *    graphic:{
 *      style:text:'这是设置的文字'
 *    }
 * 
 * 
 * 5、饼图--如何用一条线标记每块扇形区域，并使得文字显示在线上？
 * 如下例的饼图中设置series中的labelLine和label
 */

//图表对象
function Echart(id) {
    var dom = document.getElementById(id);
    this.myChart = echarts.init(dom);
    this.option = null;
    //初始化柱状图
    this.initBar = function () {
        var that = this;
        that.option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: [],
                y: 'bottom',
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '14%',
                containLabel: true
            },
            color: ['#0981cd', '#d3b837', '#23897c', '#5440f1', '#e82533', '#fb551b'],
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}(kg)',
                    textStyle: {
                        color: '#fff',
                        fontSize: 16
                    }
                },
                axisLine: {
                    show: false //这行代码控制着坐标轴x轴的文字是否显示
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#162867'],
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    rotate: 0,
                    textStyle: {
                        color: '#fff',
                        fontSize: 14
                    }
                },
                data: []

            },
            series: []
        };
        if (that.option && _typeof(that.option) === "object") {
            that.myChart.setOption(that.option, true);
        }
    };
    //初始化饼图
    this.initPie = function () {
        var that = this;
        that.option = {
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)"
            },
            graphic: {
                type: 'text',
                left: 'center', //设置偏移量
                top: 'center',
                z: 2,
                zlevel: 100,
                style: {
                    text: '',
                    x: 100,
                    y: 100,
                    fontSize: 20,
                    textAlign: 'center',
                    fill: '#fff',
                    width: 100,
                    height: 100,
                    textFont: 'bold 20px verdana'
                }
            },
            color: ['#0982ce', '#094fce', '#6f5cff', '#17a8bd', '#18c178', '#d8bd52', '#b74f5b', '#1c3175', '#d23884', '#e58334', '#1c3175'],
            series: [{
<<<<<<< HEAD
                name: '标题标题',
=======
                name: '这是标题标题',
>>>>>>> b6d484d1e7f84a7718c52c81952222db3ade9ac4
                type: 'pie',
                hoverOffset: 20,
                radius: ['55%', '70%'],
                labelLine: {  //显示周围的线
                    normal: {
                        length: 10,
                        length2: 60,
                        lineStyle: {
                            color: '#fff'
                        }
                    }

                },
                label: { //显示周围的线上的标记文字
                    normal: {
                        color: "#fff",
                        formatter: "{b}:{c}t\n\n", 
                        borderWidth: 20,
                        borderRadius: 4,
                        padding: [0, -70],
                        rich: {
                            a: {
                                color: "#fff",
                                fontSize: 12,
                                lineHeight: 20
                            },
                            b: {
                                fontSize: 12,
                                lineHeight: 20,
                                color: "#fff"
                            }
                        }
                    }
                },
<<<<<<< HEAD
                data: []
=======
                data: [{ value: 348, name: '黄埔区' }, { value: 548, name: '番禺区' }, { value: 548, name: '海珠区' }, { value: 348, name: '增城区' }, { value: 448, name: '越秀区' }, { value: 148, name: '花都区' }, { value: 458, name: '南沙区' }]
>>>>>>> b6d484d1e7f84a7718c52c81952222db3ade9ac4
            }]
        };
        if (that.option && _typeof(that.option) === "object") {
            that.myChart.setOption(that.option, true);
            //设置默认选中高亮部分
            that.myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 });
        }
    };
}
