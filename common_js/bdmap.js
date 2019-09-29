//地图对象
function Map() {
    this.showBigMap = false;
    this.map = null;
    this.gps = {
        index: 0,
        timer: null,
        startLng: '',
        startLat: '',
        endLng: '',
        endLat: '',
        carMk: ''
    };

    this.markers = [];
    this.markerClusterer = null;
    this.heatmapOverlay = null;  //热力图覆盖物
    this.isHeatmapShow = false;  //是否显示热力图

    //初始化地图
    this.initMap = function (id, flag) {
        this.map = new BMap.Map(id);
        this.map.enableScrollWheelZoom();
        this.map.enableDoubleClickZoom();
        var mapStyle = {
            features: ["road", "building", "water", "land"], //隐藏地图上的poi
            style: "midnight" //设置地图风格为高端黑
        };
        this.map.setMapStyle(mapStyle);
        var zoom = 10;
        if (flag == 0) {
            //车辆定位地图
            zoom = 16;
        }
        this.map.centerAndZoom(new BMap.Point(113.278328, 23.136665), zoom);
        this.map.setMinZoom(9);
    };
    //划分区域边界
    this.getBoundary = function () {
        var that = this;
        var bdary = new BMap.Boundary();
        bdary.get("广东省广州市", function (rs) {
            var count = rs.boundaries.length; //行政区域的点有多少个
            if (count === 0) {
                alert('未能获取当前输入行政区域');
                return;
            }
            var pointArray = [];
            for (var i = 0; i < count; i++) {
                var ply = new BMap.Polygon(rs.boundaries[i], { strokeWeight: 2, strokeColor: "#4184ff", fillOpacity: 0.1 }); //建立多边形覆盖物
                that.map.addOverlay(ply); //添加覆盖物
                pointArray = pointArray.concat(ply.getPath());
            }
            that.map.setViewport(pointArray); //调整视野               
        });
    };
    // 添加黄点标注
    this.addMarker = function (pointArr) {
        var that = this;
        var myIcon = new BMap.Icon("../src/images/icon_point.png", new BMap.Size(10, 10));
        pointArr.forEach(function (item) {
            var point = new BMap.Point(item.longitude, item.latitude);
            var marker = new BMap.Marker(point, { icon: myIcon });
            that.map.addOverlay(marker);
        });
    };
    //添加文本标记
    this.addText = function (textArr) {
        var that = this;
        var num = 10;
        if (textArr && textArr.length > 0) {
            textArr.forEach(function (item) {
                var point = new BMap.Point(item.lng, item.lat);
                var opts = {
                    position: point, // 指定文本标注所在的地理位置
                    offset: new BMap.Size(0, 0) //设置文本偏移量
                };
                var label = new BMap.Label(item.district + ':' + item.orderWeightSum, opts); // 创建文本标注对象
                label.setStyle({
                    color: "white",
                    fontSize: "12px",
                    height: "20px",
                    padding: '0 10px',
                    lineHeight: "20px",
                    fontFamily: "微软雅黑",
                    background: '#2546b0',
                    borderColor: '#2546b0',
                    borderRadius: '10px'
                });
                that.map.addOverlay(label);
            });
        }
    };
    //定时获取车辆定位
    this.lngLatAjax = function (thirdId) {
        var that = this;
        var i = 0;
        $.post(urls["getCurrentState"] + thirdId, function (res, status) {
            if (res[0].msg == '查询成功.') {
                if (res[0].obj && res[0].obj[0] && res[0].obj[0].gpsTrackData) {
                    var gpsTrackData = res[0].obj[0].gpsTrackData;
                    that.gps.startLng = gpsTrackData.lon;
                    that.gps.startLat = gpsTrackData.lat;

                    that.gps.endLng = gpsTrackData.lon;
                    that.gps.endLat = gpsTrackData.lat;
                    that.goWay(res[0].obj[0]);
                }
                i = i + 10;
            }
        });
        that.gps.timer = setInterval(function () {
            $.post(urls["getCurrentState"] + thirdId, function (res, status) {
                if (res[0].msg == '查询成功.') {
                    if (res[0].obj && res[0].obj[0] && res[0].obj[0].gpsTrackData) {
                        var gpsTrackData = res[0].obj[0].gpsTrackData;
                        that.gps.endLng = gpsTrackData.lon;
                        that.gps.endLat = gpsTrackData.lat;
                        that.goWay(res[0].obj[0]);
                    }
                }
            });
            i = i + 10;
        }, 15000);
    };
    //车辆移动
    this.goWay = function (obj) {
        if (this.gps.startLng) {
            this.drawIcon(obj);
        }
        this.gps.startLng = this.gps.endLng;
        this.gps.startLat = this.gps.endLat;
    };
    //显示车辆标记
    this.drawIcon = function (obj) {
        var carIcon = new BMap.Icon("../src/images/car.png", new BMap.Size(52, 26)); 
        var that = this;
        if (that.gps.carMk) {
            this.map.removeOverlay(that.gps.carMk);
        }
        that.gps.carMk = new BMap.Marker(new BMap.Point(that.gps.endLng, that.gps.endLat), //起始点的经纬度  
        { icon: carIcon });
        that.map.setCenter(new BMap.Point(that.gps.endLng, that.gps.endLat));
        that.map.addOverlay(that.gps.carMk);
        openInfoWindow(that.map, that.gps.carMk, 'click', 1, obj);
    };
    //显示车辆轨迹
    this.drawLine = function (pointArr) {
        var that = this;
        var pois = [];
        var myIcon = new BMap.Icon("../src/images/icon_stop.png", new BMap.Size(20, 20));  //停车标记

        that.map.setCenter(new BMap.Point(pointArr[0].lon, pointArr[0].lat));
        pointArr.forEach(function (item) {
            var point = new BMap.Point(item.lon, item.lat);
            // var marker = new BMap.Marker(point, { icon: myIcon });  //停车处显示停车标记
            // that.map.addOverlay(marker);
            pois.push(point);
        });
        var polyline = new BMap.Polyline(pois, { strokeColor: "#4184ff", //设置颜色   
            strokeWeight: 4, //宽度  
            strokeOpacity: 1 }); //透明度  
        that.map.addOverlay(polyline);
    };
    //修改点聚合的标记显示，index：下标（以1开始）firstFlag：第一次加载标识符
    this.changeMarkerCluster = function (index, firstFlag) {
        var that = this; 
        var myStyles1 = [{
            url: '../src/images/bg1_3.png',
            size: new BMap.Size(30, 30),
            textColor: 'white',
            textSize: 0.14, //rem为单位
            keyframesName: 'cycleAnimation1'  //通过修改TextIconOverlay.js中的TextIconOverlay.prototype._buildCssText方法改成相应的样式
        }, {
            url: '../src/images/bg1_2.png',
            size: new BMap.Size(40, 40),
            textColor: 'white',
            textSize: 0.16, //rem为单位
            keyframesName: 'cycleAnimation1'
        }, {
            url: '../src/images/bg1_1.gif',
            size: new BMap.Size(50, 50),
            textColor: 'white',
            textSize: 0.18,
            keyframesName: 'cycleAnimation1'
        }];
        if (firstFlag !== true) {
            if (that.markers.length > 0) {
                that.markerClusterer.clearMarkers();
            }
        }
        that.markerClusterer = new BMapLib.MarkerClusterer(that.map, { markers: that.markers });
        that.markerClusterer.setStyles(myStyles);
    };
    //显示点聚合
    this.addMarkerCluster = function (pointArr) {
        var that = this;
        var icon = new BMap.Icon("../src/images/icon1.png", new BMap.Size(26, 33));
        if (pointArr && pointArr.length > 0) {
            that.markers = [];
            that.markerClusterer = null;
            pointArr.forEach(function (item, index) {
                var point = new BMap.Point(item.longitude, item.latitude);
                var marker = new BMap.Marker(point, { icon: icon });
                openInfoWindow(that.map, marker, 'click', 0, item);
                that.markers.push(marker);
            });
            that.changeMarkerCluster(1, true);
        }
    };
    //增加热力图覆盖物
    this.addHeatMap = function(pointArr){
        var that = this;
        that.heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
        that.map.addOverlay(that.heatmapOverlay);
        that.heatmapOverlay.setDataSet({data:pointArr,max:1200});
        this.changeHeatMap();
    };
    this.changeHeatMap = function(){
        if(this.isHeatmapShow == true){
            this.heatmapOverlay.show();
            this.isHeatmapShow = false;
        }else{
            this.heatmapOverlay.hide()
            this.isHeatmapShow = true;
        }
    }
}