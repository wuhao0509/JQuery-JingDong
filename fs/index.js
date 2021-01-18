$('.fs-1').load('/fs/fs1.html')
$('.fs-3').load('/fs/fs3.html')

// 添加轮播图
$('.slider-banner-wrapper').swiper({
    list: $('.banner-img'),
    width: 590,
    height: 470
})
$('.slider-recommend-wrapper').swiper({
    list: $(".focus-item__recommend"),
    width: 190,
    height: 470,
    showChangeBtn: false,
    showSpotBtn: false
})