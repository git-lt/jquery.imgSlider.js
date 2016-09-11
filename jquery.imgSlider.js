/**
 * [jQuery.imgSlider.js 滚动相册插件]
 * author:935486956@qq.com
 * version:v0.0.1
 * github:https://github.com/git-lt/jquery.imgSlider.js
 * useage: $('#sliderBox').imgSlider(options);
 */
;(function ($, window, document, undefined) {
    'use strict';

    //ImgSlider CLASS DIFINITION
    //==========================
    var ImgSlider = function (element, options) {
        this.$el = $(element);
        this.timmer = null;                     //自动播放的定时器
        this.activeIndex = options.activeIndex; //当前选中项的索引
        this.targetIndex = 0;                   //将要选中的索引
        this.isX = options.position.toUpperCase()==='X';
        this.imgWidth = this.$el.width();
        this.imgHeight = this.$el.height();
        this.itemSize = this.isX ? this.imgWidth : this.imgHeight;
        this.itemCount = options.imgData.length;
        this.$next = this.$el.find('.' + options.nextCls);
        this.$prev = this.$el.find('.' + options.prevCls);
        this.$sliderList = $('<ul></ul>');
        this.$bulletList = $('<ul></ul>');
        this.options = options;
        this._init();
    };

    ImgSlider.prototype = {
        constructor: ImgSlider,
        _init: function () {
          var _this = this,
              $sliderList = this.$sliderList,
              $bulletList = this.$bulletList,
              imgW = this.imgWidth,
              imgH = this.imgHeight,
              $el = this.$el,
              o = this.options;

          // 排序
          o.imgData = o.imgData.sort(function(a, b) {
            return a.order - b.order;
          });

          // 添加DOM
          $.each(o.imgData, function(index, item) {
            $sliderList.append("<li data-index='"+index+"'><a href='"+ (item.url||'javascript:;') +"'><img src='" + item.src + "' alt=''></a></li>");
            $bulletList.append("<li></li>");
          });

          $sliderList.addClass(o.sliderWrapCls);
          $bulletList.addClass(o.bulletWrapCls);
          $el.append($sliderList);
          $el.append($bulletList);

          var
            firstChild = $sliderList.find("li:first-child"),
            lastChild = $sliderList.find("li:last-child"),
            sliderPercent = 100 / _this.itemCount,
            slideIndex = 0;

          lastChild.clone().prependTo($sliderList);
          firstChild.clone().appendTo($sliderList);

          // debugger;
          // 初始化样式
          if(this.isX){
            $sliderList.css({"width": imgW * _this.itemCount});
            $sliderList.css({"height": '100%'});
            $sliderList.css({"margin-left": -imgW*(_this.activeIndex+1)});
            $sliderList.find("li").each(function(index) {
              var leftPercent = (sliderPercent * index) + "%";
              $(this).css({"left": leftPercent});
              $(this).css({"width": imgW});
            });
          }else{
            $sliderList.css({"height": imgH * _this.itemCount});
            $sliderList.css({"width": '100%'});
            $sliderList.css({"margin-top": -imgH*(_this.activeIndex+1)});

            $sliderList.find("li").each(function(index) {
              var leftPercent = (sliderPercent * index) + "%";
              $(this).css({"top": leftPercent});
              $(this).css({"height": imgH});
            });
          }

          // 选中默认
          $bulletList.find('li:nth-child('+ (_this.activeIndex+1) +')').addClass(o.activeCls);

          // 注册事件
          this._addEvents();

          // 自动播放
          o.autoPlay && this.autoPlay();
        },
        _addEvents: function () {
            var $this = this.$el,
                eventType = this.options.eventType,
                $bulletList = this.$bulletList,
                _this = this,
                o = this.options;

            // 点击导航
            $bulletList.on(eventType,'li', function () {
                clearInterval(_this.timmer);
                $.proxy(_this._play, _this, $(this).index())();
            });

            // 上一个
            this.$next.length && this.$next.on('click', function(){
                clearInterval(_this.timmer);
                $.proxy(_this.next, _this)();
            });

            // 下一个
            this.$prev.length && this.$prev.on('click', function(){
                clearInterval(_this.timmer);
                $.proxy(_this.prev, _this)();
            });

            // 鼠标进入和离开
            o.autoPlay && this.$el.on('mouseenter mouseleave', function(e){
                  (e.type === 'mouseenter') ? clearInterval(_this.timmer) : $.proxy(_this.autoPlay, _this)();
            });
        },
        _play: function (targetIndex) {
          var _this = this,
              $sliderList = this.$sliderList,
              $bulletList = this.$bulletList,
              sliderCount = this.itemCount,
              o = this.options;

            var marginLeft = -(targetIndex+1) * _this.itemSize;

            var moveData={};
            moveData[_this.isX ? 'margin-left':'margin-top'] = marginLeft;
            $sliderList.animate(moveData, 400, function() {
              moveData = {};
              if (targetIndex < 0 ) {
                $bulletList.find(".active").removeClass(o.activeCls);
                $bulletList.find("li:last-child").addClass(o.activeCls);
                moveData[_this.isX ? 'margin-left':'margin-top'] = -_this.itemSize*sliderCount;
                $sliderList.css(moveData);
                _this.activeIndex = sliderCount-1;
              } else if ( targetIndex >= sliderCount ) {
                $bulletList.find("."+o.activeCls).removeClass(o.activeCls);
                $bulletList.find("li:first-child").addClass(o.activeCls);
                moveData[_this.isX ? 'margin-left':'margin-top'] = -_this.itemSize;
                $sliderList.css(moveData);
                _this.activeIndex = 0;
              }else{
                $bulletList.find("."+o.activeCls).removeClass(o.activeCls);
                $bulletList.find('li:nth-child('+ (targetIndex+1) +')').addClass(o.activeCls);
                _this.activeIndex = targetIndex;
              }
              o.onShown  && o.onShown(_this.activeIndex);
            });
        },
        next:function(){
            this.targetIndex = this.activeIndex + 1;
            this._play(this.targetIndex);
        },
        prev:function(){
            this.targetIndex = this.activeIndex - 1;
            this._play(this.targetIndex);
        },
        autoPlay:function(){
            var _this = this, o = this.options;
            clearInterval(_this.timmer);
            _this.timmer = setInterval(function () {
                $.proxy(_this.next, _this)();
            }, o.delay);
        }
    };

    //ImgSlider PLUGIN DIFINITION
    //===========================
    var old = $.fn.ImgSlider;

    $.fn.imgSlider = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('imgSlider.ui');
            var options = $.extend(true, {}, $.fn.imgSlider.defaults, typeof option === 'object' && option);
            if (!data) $this.data('imgSlider.ui', (data = new ImgSlider(this, options)));
            if (typeof option == 'string'){
              clearInterval(data.timmer);
              data[option]();
            }
        });
    };

    $.fn.imgSlider.defaults = {
        imgData:[],                       //图片信息 [{src:'',order:'',url:''}] 图片地址、排序值、链接
        sliderWrapCls:'ui-slider-list',
        bulletWrapCls:'ui-slider-bullet',
        nextCls:'next',                   //下一项按钮ClassName
        prevCls: 'prev',                  //上一项按钮ClassName
        activeIndex: 0,                   //默认选中的项的索引(从0开始)
        activeCls: 'active',              //导航激活的className
        eventType: 'click',               //触发导航的事件名 click/mouseenter
        onShown:function(activeIndex){},  //显示后的回调 参数：当前显示项的索引
        autoPlay: true,                   //是否自动播放
        position:'x',                     //x:水平滑动 y:垂直滑动
        delay: 4000                       //播放延迟时间(s)
    };

    $.fn.imgSlider.Contructor = ImgSlider;

    //ImgSlider NO CONFLICT
    //====================
    $.fn.imgSlider.noConflict = function () {
        $.fn.imgSlider = old;
        return this;
    }
})(jQuery, window, document)
