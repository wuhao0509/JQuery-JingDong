// 构造函数：创建轮播图对象
function Slider(opt, wrap) {
  this.wrap = wrap;
  this.list = opt.list || [];
  this.listLength = this.list.length;
  this.width = opt.width || wrap.width();
  this.height = opt.height || wrap.height();
  this.type = opt.type || "fade";
  this.showChangeBtn =
    opt.showChangeBtn || opt.showChangeBtn == undefined
      ? true
      : opt.showChangeBtn;
  this.showSpotBtn =
    opt.showSpotBtn || opt.showSpotBtn == undefined ? true : opt.showSpotBtn;
  this.autoTime = opt.autoTime || 5000;
  this.isAuto = opt.isAuto || opt.isAuto == undefined ? true : opt.isAuto;
  this.nowIndex = 0;

  // 初始化轮播图结构、样式、行为
  this.init = function () {
    this.createDom();
    this.initStyle();
    this.bindEvent();
  };
}

// 创建轮播图结构
// 在原型链上创建方法，而不是在init函数内部创建方法，原因：节省存储空间 全家一张卡
// 不在原型链上创建方法就好比，去理发店，妈妈去，理发店办一张卡，我去理发店办一张卡，这样需要两张卡的存储空间 全家很多张卡
Slider.prototype.createDom = function () {
  var sliderWrapper = $('<div class="my-swiper-wrapper"></div>');
  var sliderContent = $('<ul class="my-swiper-list"></ul>');
  var leftBtn = $('<div class="my-swiper-btn my-swiper-lbtn">&lt;</div>');
  var rightBtn = $('<div class="my-swiper-btn my-swiper-rbtn">&gt;</div>');
  var spotDiv = $('<div class="my-swiper-spots"></div>');

  // 将轮播图插入到页面结构中
  for (var i = 0; i < this.list.length; i++) {
    $('<li class="my-swiper-item"></li>')
      .append(this.list[i])
      .appendTo(sliderContent);
    $("<span></span>").appendTo(spotDiv);
  }

  sliderWrapper
    .append(sliderContent)
    .append(leftBtn)
    .append(rightBtn)
    .append(spotDiv)
    .appendTo(this.wrap)
    .addClass("my-swiper-" + this.type);
};

Slider.prototype.initStyle = function () {
  $(".my-swiper-wrapper", this.wrap)
    .css({
      height: this.height,
      width: this.width,
    })
    .find(".my-swiper-item")
    .css({
      height: this.height,
      width: this.width,
    });
  //淡入淡出效果
  if (this.type == "fade") {
    $(".my-swiper-item", this.wrap).hide().eq(this.nowIndex).show();
  }
  //设置小圆点样式
  $(".my-swiper-spots>span", this.wrap).eq(this.nowIndex).addClass("active");
};

Slider.prototype.bindEvent = function () {
  var self = this;
  $(".my-swiper-lbtn", this.wrap).on("click", function () {
    if (self.nowIndex == 0) {
      self.nowIndex = self.listLength - 1;
    } else {
      self.nowIndex--;
    }
    self.change();
  });

  $(".my-swiper-rbtn", this.wrap).on('click',function () {
    // 如果当前图片的索引值为最后一张图片的索引值  则点击右侧按钮的时候显示第一张图片 索引值为0
    if (self.nowIndex == self.listLength - 1) {
      self.nowIndex = 0;
    } else {
      self.nowIndex++;
    }
    self.change();
  });
};

// 样式切换
Slider.prototype.change = function () {
     // 如果是淡入淡出的动画 则为所有的轮播内容添加动画效果 上一张图片淡出  当前图片淡入
     if (this.type == 'fade') {
        $('.my-swiper-item', this.wrap).fadeOut().eq(this.nowIndex).fadeIn()
    }
    // 切换小圆点
    $('.my-swiper-spots > span', this.wrap).removeClass('active').eq(this.nowIndex).addClass('active')
};
// 添加实例方法
$.fn.extend({
  swiper: function (options) {
    var obj = new Slider(options, this);
    obj.init();
  },
});
