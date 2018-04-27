/*
 *
 *  参数说明
 *  container:传入的dom元素内执行懒加载 不传默认是body,如果是id属性，则传入‘#id’，class属性，则传入‘.class’
 *  dataSrc: 懒加载需要的图片的key <img data-src="xxx.gif" />
 *
 */

(function (window, factory) {
  if(typeof define == 'function' && define.amd) {
    define(factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    window.LazyImg = factory()
  }
}(this, function () {

  function LazyImg(options) {
    this.init.apply(this,arguments)
  }

  LazyImg.prototype = {
    init: function (oJson) {
      var _option = {
        dataSrc: 'data-src',
        container: 'body',
        _that:this
      }
      for(var key in oJson) {
        _option[key] = oJson[key]
      }
      this.option = _option
      this.fn()
    },
    fn: function () {
      this.option.imgArray = document.querySelector(this.option.container).querySelectorAll('['+this.option.dataSrc+']')
      this.loadImg()
      this.scrollRender()
    },
    loadImg: function () {
      var _opt = this.option
        _img = _opt['imgArray']
        _that = this
      if(_img.length) {
        for(var i=0;i<_img.length;i++) {
          var _this = _img[i]
          if(this.isElementInViewport(_this)){
            var src = _this.getAttribute(_opt.dataSrc);
            _this.setAttribute("src", src);
            _this.removeAttribute(_opt.dataSrc);
            _that.option.imgArray = document.querySelector(this.option.container).querySelectorAll('['+this.option.dataSrc+']')
          }
        }
      }else if(typeof _that._callLoadImg == 'function') {
        if(window.addEventListener){
          window.addEventListener('scroll',_that._callLoadImg)
        }else if(window.attachEvent){
          window.attachEvent('scroll',_that._callLoadImg)
        }
      }
    },
    isElementInViewport: function (el) {
      var rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    },
    scrollRender:function(){
      var _that = this
      function callLoadImg() {
        _that.loadImg.call(_that)
      }
      _that._callLoadImg = callLoadImg
      if(window.addEventListener){
        window.addEventListener('scroll',_that._callLoadImg)
      }else if(window.attachEvent){
        window.attachEvent('scroll',_that._callLoadImg)
      }
    }
  }
  return LazyImg
}))