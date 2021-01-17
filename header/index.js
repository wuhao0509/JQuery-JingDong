var logoGb = $(".logo-bg");
$(".logo").hover(
  function () {
    logoGb.fadeIn().removeClass("hover-out");
    if (logoGb.hasClass("hover-in")) {
      return false;
    }

    logoGb
      .css({
        //   重新获取动图资源
        backgroundImage:
          "url(http://img1.360buyimg.com/da/jfs/t1/31918/19/6335/274370/5c90a8beEefd9bfb9/e24970e34ce77262.gif?v=" +
          Math.random() +
          ")",
      })
      .addClass("hover-in").removeClass("animate-end");

    setTimeout(function () {
      // 当动画结束之后,添加上class，类名为animate-end
      logoGb.addClass("animate-end");
      $(".hover-out").fadeOut();
    }, 4000);
  },
  function () {
    // 如果hover出去，并且当前动画已经结束，则让logo消失
    $(".animate-end").fadeOut().removeClass("hover-in");
    // 当hover移除 添加hover-out类名
    logoGb.addClass("hover-out");
  }
);
// 第二次hover动画不会出现的原因，因为浏览器已经有缓存了
// 解决方法 每次hover之后都重新加载资源(每次加载的资源应该不同，否则浏览器不会重新加载，取的还是缓存中的图片)，所以我们应该修改图片url的参数


// 搜索框默认文字每两秒钟改变一次
var placeholdersData = ['小饼干', '仔仔面', '商务小布鞋']
setInterval(function () {
    $('#search-inp').attr('placeholder', placeholdersData[Math.floor(Math.random() * 3)])
}, 2000)