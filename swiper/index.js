// jQuery不加px会自动补全
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
  this.isAnimate = false; //加锁，false表示当前没有进行动画
  this.timer = null; //定时器，设置自动轮播

  // 初始化轮播图结构、样式、行为
  this.init = function () {
    this.createDom();
    this.initStyle();
    this.bindEvent();
    if (this.isAuto) {
      this.autoChange();
    }
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

  if (this.type == "animate") {
    $('<li class="my-swiper-item"></li>')
      .append($(this.list[0]).clone())
      .appendTo(sliderContent);
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
  } else if (this.type == "animate") {
    $(".my-swiper-list", this.wrap).css({
      width: this.width * (this.listLength + 1),
    });
  }
  //设置小圆点样式
  $(".my-swiper-spots>span", this.wrap).eq(this.nowIndex).addClass("active");
};

Slider.prototype.bindEvent = function () {
  var self = this;
  $(".my-swiper-lbtn", this.wrap).on("click", function () {
    if (self.isAnimate) {
      // 此时isAnimate为true，表示当前轮播图有动画
      return false;
    }
    self.isAnimate = true;
    if (self.nowIndex == 0) {
      if (self.type == "animate") {
        $(".my-swiper-list", self.wrap).css({
          left: -self.width * self.listLength,
        });
      }
      self.nowIndex = self.listLength - 1;
    } else {
      self.nowIndex--;
    }
    self.change();
  });

  $(".my-swiper-rbtn", this.wrap).on("click", function () {
    if (self.isAnimate) {
      // 此时isAnimate为true，表示当前轮播图有动画
      return false;
    }
    // 将锁打开，直到动画完成之后结束
    self.isAnimate = true;
    // 如果当前图片的索引值为最后一张图片的索引值  则点击右侧按钮的时候显示第一张图片 索引值为0
    if (self.type == "fade" && self.nowIndex == self.listLength - 1) {
      self.nowIndex = 0;
    } else if (self.type == "animate" && self.nowIndex == self.listLength) {
      // 当图片运动到最后一张时，让.my-swiper-list瞬间变化到第一张图片的位置
      $(".my-swiper-list", this.wrap).css({
        left: 0,
      });
      self.nowIndex = 1;
    } else {
      self.nowIndex++;
    }
    self.change();
  });

  // 鼠标移到轮播图上，轮播图停止，移开，轮播图继续
  $(".my-swiper-wrapper", this.wrap)
    .mouseenter(function () {
      clearInterval(self.timer);
    })
    .mouseleave(function () {
      if (self.isAuto) {
        self.autoChange();
      }
    });

  //实现小圆点鼠标移入就切换的效果
  $(".my-swiper-spots > span", this.wrap).mouseenter(function () {
    if (self.isAnimate) {
      return false;
    }
    self.isAnimate = true;
    // 用jQuery的index方法获取小圆点的索引值
    self.nowIndex = $(this).index();
    self.change();
  });
};

// 样式切换
Slider.prototype.change = function () {
  var self = this;
  // 如果是淡入淡出的动画 则为所有的轮播内容添加动画效果 上一张图片淡出  当前图片淡入
  if (this.type == "fade") {
    $(".my-swiper-item", this.wrap)
      .fadeOut()
      .eq(this.nowIndex)
      .fadeIn(
        // 运动结束将所打开
        function () {
          self.isAnimate = false;
        }
      );
  } else if (this.type == "animate") {
    $(".my-swiper-list", this.wrap).animate(
      {
        left: -this.width * this.nowIndex,
      },
      function () {
        // 运动结束将所打开
        self.isAnimate = false;
      }
    );
  }
  // 切换小圆点
  // 当nowIndex == listLength 代表的是当前图片是最后一张图片，此时应该让第一个小圆点显示样式
  $(".my-swiper-spots > span", this.wrap)
    .removeClass("active")
    .eq(this.nowIndex % this.listLength)
    .addClass("active");
};

// 自动轮播
Slider.prototype.autoChange = function () {
  var self = this;
  this.timer = setInterval(function () {
    $(".my-swiper-rbtn", self.wrap).click();
  }, this.autoTime);
};

// 添加实例方法
$.fn.extend({
  swiper: function (options) {
    var obj = new Slider(options, this);
    obj.init();
  },
});
