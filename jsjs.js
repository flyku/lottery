// JavaScript Document
$(document).ready(function(e) {
	$("#click").click(function(){
		initRoll();
	});
function initRoll(){
	var move=function(){
		$("#mul").animate({
			'top':'-' + mtop + "px"
		});
	}
	var mtop=function(){
		
	};
	var setClass = function (s){
		var _c = _config;
		s = s || 0;//控制数量
		for (var i = 0 + s; i < 9 + s; i++) {
			$(_c.outer + ' ' + _c.inner).eq(i)[0].className = 'li' + i;
		}
	}
}
});