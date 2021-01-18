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

$('#search-inp').on('input',function(){
    var val = $(this).val();
    if(val){
        $.ajax({
            type:'get',
            url:'https://suggest.taobao.com/sug',
             
        })
    }
})



// 一般搜索的接口都是用jsonp

    // 渲染搜索框列表  data是列表数据
    window.renderSearchList = function (data) {
        data = data.result;
        var str = '';
        for (var i = 0; i < data.length; i++) {
            str += `<li>
        <a href="#">${data[i][0]}</a>
    </li>`
        }
        $('.search-list').html(str).show()
    }
    // 数据请求的防抖处理
    var timer = null;
    // 当搜索框输入数据的时候 展示搜索列表  需要获取搜索列表数据
    $('#search-inp').on('input', function () {
        var val = $(this).val();
        clearTimeout(timer);
        if (val) {
            // 防抖  防止每次按下键盘的时候都去获取数据
            timer = setTimeout(function () {
                getData(val);
            }, 500)
        }
        // 如果鼠标聚焦在搜索框内  判断搜索框里面是否含有数据 如果含有 则获取列表数据并显示列表
    }).focus(function () {
        var val = $(this).val();
        if (val) {
            getData(val)
        }
    })
    // 获取搜索列表数据  val是关键词
    function getData(val) {
        $.ajax({
            type: 'get',
            url: 'https://suggest.taobao.com/sug',
            // https://suggest.taobao.com/sug?code=utf-8&q=x&callback=jsonp533&k=1&area=c2c&bucketid=18
            data: {
                code: 'utf-8',
                q: val,
                callback: 'renderSearchList'
            },
            dataType: 'jsonp'
        })
    }
    // 鼠标移出搜索区域则列表消失
    var mouseleaveTimer = null;
    $('.search-box').mouseleave(function () {
        mouseleaveTimer = setTimeout(function () {
            $('.search-list').hide()
        }, 500)
    }).mouseenter(function () {
        clearTimeout(mouseleaveTimer)
    })