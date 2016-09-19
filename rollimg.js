var Rollimg = (function(){
	var init = function(config){
		var newRoll = new _roll(config);
		var name = config.outer.split(" ")[0] || Number(new Date());
		Rollimg.subO[name]=newRoll;
		newRoll.to(0);
		return newRoll;
	}
	// 原型
	function _roll(config){
		this._config = {
			outer : '',
			inner : '',
			innerstr : '',
			everyWidth : 0,
			len : 0
		}
		if(typeof config == "object"){
			for(var i in config){
				this._config[i] = config[i];
			}
		}
		setConfig(this._config);
		domInit(this._config);
		setPrototype(this._config);
	}

	function setConfig(c){
		c.outer = $(c.outer);
		c.innerstr = c.inner;
		c.inner = c.outer.find(c.innerstr);
		c.len = c.len || c.inner.length;
		c.everyWidth = c.everyWidth || ((c.len > 1)? c.inner.eq(0).width() : c.inner.width());
		//c.width = c.everyWidth * c.len;
		c.n = 0;
	}

	function domInit(c){
		c.outer.width(c.width *2);
		c.outer.append(c.inner.clone());
		c.inner = c.outer.find(c.innerstr);
		c.mLeft = 0;
	}
	
	function move(c, width){
		var oWidth = - width % c.width
		var mLeft = c.mLeft + oWidth;
		//向右
		if(oWidth > 0 && mLeft >= c.everyWidth){
			c.outer.css({"left" : c.mLeft - c.width + "px"});
			mLeft += -c.width;
		}
		//向左
		if(oWidth < 0 && mLeft <= -c.width - c.everyWidth){
			c.outer.css({"left" : c.mLeft + c.width + "px"});
			mLeft += c.width;
		}
		c.outer.stop().animate({"left" : mLeft});
		c.mLeft = mLeft;	
	}

	function setPrototype(){
		_roll.prototype.roll = function(n){
			var c = this._config;
			var cm = c.n + c.len;
			c.inner.eq(c.n).removeClass('actived');
			c.inner.eq(cm).removeClass('actived');
			n = n % c.len;
			c.n = (c.n + n < 0)? c.n + n + c.len :(c.n + n) % c.len;
			cm = c.n + c.len;
			c.inner.eq(c.n).addClass('actived');
			c.inner.eq(cm).addClass('actived');
			move(c, n * c.everyWidth);
		}

		_roll.prototype.to = function(n){
			var c = this._config;
			this.roll(n-c.n);
		}

		_roll.prototype.next = function(){
			this.roll(1);
		}

		_roll.prototype.prev = function(){
			this.roll(-1);
		}
	}
	
	return {
		init : init,
		subO : {}
	};
})();