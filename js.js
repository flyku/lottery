//var data = ["文字0","文字1","文字2","文字3","文字4","文字5","文字6","文字7","文字8"];
/*var initData = function(){
    //alert($("#RunTopic li").length);
    //for (var i = 0; i <= ; i--) {
    //    Things[i]
    //};
}*/
$(document).ready(function (){
    //initData();
    Choujiang.init();
});

var Choujiang = {
		// roll : {},
		init : function (){
			this.initRoll();
			this.initEvent();
		},
		//initData : function () {},
		initEvent : function (){$("#startBtn").click(function (){
				if ($(this).hasClass('start')){
					$(this).removeClass('start').addClass('disable').text('抽答中');
					var rm = parseInt(Math.random() * 100);//此数字控制转动速度,产生随机效果
					Roll.play(rm + 20);
				}
			});
		},
		initRoll : function (){
			this.roll = Roll.init({outer : '#RunTopic', inner : 'li', time : 860});
		}//此数字控制开始和结束速度
}






var Roll = (function (){
    var _config;
    var init = function (config){
		if (!config) {
			return;
		}
        _config = config;
        //console.log(this,arguments);
        _config.dom = {};
        _config.dom.outer = $(_config.outer);
        _config.dom.inner = _config.dom.outer.find(_config.inner);
        _config.time = config.time || 800;
        _config.eWidth = config.eWidth || _config.dom.inner.eq(0).height() + 21;
        setClass();
        //console.log(_config.eWidth)
    }
	
    var setClass = function (s){
        var _c = _config;
        s = s || 0;//控制数量
        for (var i = 0 + s; i < 9 + s; i++) {
            $(_c.outer + ' ' + _c.inner).eq(i)[0].className = 'li' + i;
        }
    }
	
    var timer, mi = 0;
    var move = function (time, callback){
        //console.log(time)
        var _c = _config;
        _c.dom.outer.stop().animate({
            "marginTop" : '-' + _c.eWidth + 'px'//“-”减号控制方向
        },
        time, 
		function (){
            _c.dom.outer.css({"marginTop" : "0"});
            var temp = $(_c.outer + ' ' + _c.inner).eq(0);
            //console.log(_c.outer.length,temp);
            $(_c.outer).append(temp.clone());
            temp.remove();
            setClass();
            (typeof callback == 'function') && (callback());
            //if(typeof callback == 'function') callback();
        });
    }
    //var n2 = parseInt(n/2);
    //play是控制按钮恢复
    var play = function (n){
        var _c = _config;
        var i = 0;
        var et = parseInt(_config.time  / n);
        et = _config.time;
        move(tcos(i, et, n), function (){
            //console.log(i,arguments.callee);
            if (i < n - 1) {
                i++;
                move.call(this, tcos(i, et, n), arguments.callee);
            }
            else {
                $("#startBtn").removeClass('disable').addClass('start').text("开始抽答");
                return;
            }
        });
    };
    var tcos = function (i, et, n){
        var t = parseInt(et  / 10 * Math.cos(i  / n * 6.28 + 1)) + _config.time;
        if (i < 6) {
            t = et * (Math.pow(0.6, i));//Math.pow返回x的y的次幂值
        }else if (i >= n - 7) {
            t = et * (Math.pow(0.6, n - i - 2));
        }
        else {
            t = 45;
        }
        //console.log(t);
        //t = 45;
        //t = 600;
        return t ;
    }
    return {
		"init" : init,
		"move" : move, 
		 play : play
	}
})();
