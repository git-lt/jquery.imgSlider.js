
#

## 简介
基于 jQuery 的滚动相册插件，使用图片的JSON数据来初始化插件，通过配置图片的地址、连接、排序值来自定义图片的内容和位置。

- 优点：配置灵活，DOM结构简单，可通过JSON数据初始化，可配置滚动后的回调，可配置水平或垂直滚动，是否自动播放等
- 缺点：需要图片容器大小固定，图片大小统一

## 配置参数说明

```javascript
imgData:[{                        //图片信息
  src:'',    //图片地址
  order:'1', //图片的排序值
  url:''     //点击图片的链接
}],
sliderWrapCls:'ui-slider-list',   //图片容器的ClassName
bulletWrapCls:'ui-slider-bullet', //导航容器的ClassName
nextCls:'next',                   //下一项按钮ClassName
prevCls: 'prev',                  //上一项按钮ClassName
activeIndex: 0,                   //默认选中的项的索引(从0开始)
activeCls: 'active',              //导航激活的className
eventType: 'click',               //触发导航的事件名 click/mouseenter
onShown:function(activeIndex){},  //显示后的回调 参数：当前显示项的索引
autoPlay: true,                   //是否自动播放
position:'x',                     //x:水平滑动 y:垂直滑动
delay: 4000                       //播放延迟时间(s)
```

## HTML结构

使用 `<div class="ui-slider">` 来初始化DOM结构，`button` 标签可有可无

```html
<div class="container">
    <h3>左右滑动</h3>
    <div class="ui-slider" id="sliderBox1">
      <button type="button" class="ui-slider-btn prev"></button>
      <button type="button" class="ui-slider-btn next"></button>
    </div>
    <br><br>
    <h3>上下滑动</h3>
    <div class="ui-slider" id="sliderBox2">
      <button type="button" class="ui-slider-btn prev"></button>
      <button type="button" class="ui-slider-btn next"></button>
    </div>
  </div>

<script src="http://libs.baidu.com/jquery/1.9.0/jquery.js"></script>
<script src="jquery.imgSlider.js"></script>
```

## 插件使用

```javascript
// 水平滚动
$('#sliderBox1').imgSlider({
  position:'x',
  onShown:function(index){
    console.log(index);
  },
  imgData: [
    {
      "src": "https://aecpm.alicdn.com/simba/img/TB1yrYnNXXXXXcCXXXXSutbFXXX.jpg",
      "order": "1",
      "url": "",
    },
    {
      "src": "https://img.alicdn.com/tps/TB1OfSMNXXXXXc8XVXXXXXXXXXX-520-280.jpg",
      "order": "2",
      "url": "",
    },
    {
      "src": "https://aecpm.alicdn.com/simba/img/TB10uh1NXXXXXctXpXXSutbFXXX.jpg",
      "order": "3",
      "url": "",
    }
  ]
})

// 垂直滚动
$('#sliderBox2').imgSlider({
  position:'y',
  autoPlay:false,
  activeIndex: 2,
  imgData: [
    {
      "src": "https://aecpm.alicdn.com/simba/img/TB1yrYnNXXXXXcCXXXXSutbFXXX.jpg",
      "order": "1",
      "url": "",
    },
    {
      "src": "https://img.alicdn.com/tps/TB1OfSMNXXXXXc8XVXXXXXXXXXX-520-280.jpg",
      "order": "2",
      "url": "",
    },
    {
      "src": "https://aecpm.alicdn.com/simba/img/TB10uh1NXXXXXctXpXXSutbFXXX.jpg",
      "order": "3",
      "url": "",
    },
    {
      "src": "https://aecpm.alicdn.com/simba/img/TB10uh1NXXXXXctXpXXSutbFXXX.jpg",
      "order": "4",
      "url": "",
    }
  ]
})
```



## 样式

```css
    ul {
        margin: 0;
        padding: 0;
    }
    .container {
        text-align: center;
        min-height: 600px;
        padding-top: 20px;
        margin: 0 auto;
    }

    .ui-slider {
        width: 520px;
        height: 280px;
        overflow: hidden;
        position: relative;
        margin: 0 auto;
    }
    .ui-slider-list {
        position: absolute;
        top: 0;
        list-style: none;
    }
    .ui-slider-list li {
        position: absolute;
        top: 0;
        overflow: hidden;
        padding: 0;
        margin: 0;
    }
    .ui-slider-list li img {
        width: 100%;
        min-height: 100%;
        border: none;
    }

    .ui-slider-bullet {
        position: absolute;
        bottom: 15px;
        width: 100%;
        margin: 0 auto;
        list-style: none;
    }
    .ui-slider-bullet li {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin: 0 5px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        -ms-border-radius: 50%;
        border-radius: 50%;
        background-color: #fff;
        cursor: pointer;
    }
    .ui-slider-bullet .active {
        background-color: #0b0d18;
    }


    .ui-slider-btn {
        position: absolute;
        z-index: 2;
        display: block;
        width: 30px;
        height: 40px;
        bottom: 50%;
        margin-bottom: -20px;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: none;
        background-color: rgba(5, 0, 36, 0.6);
        color: #fff;
    }
    .ui-slider-btn.prev {
        left: 0;
    }
    .ui-slider-btn.next {
        right: 0;
    }
    .ui-slider-btn:after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        transform: rotate(45deg);
        width: 12px;
        height: 12px;
    }
    .ui-slider-btn.prev:after {
        border-bottom: 1px solid;
        border-left: 1px solid;
        left:5px;
    }
    .ui-slider-btn.next:after {
        border-top: 1px solid;
        border-right: 1px solid;
        left:-5px;
    }
```
