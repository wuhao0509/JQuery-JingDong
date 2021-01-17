// 将html页面插入到<div class="shortcut"></div>中
// 用load方法即可，实际上就是用ajax实现的网络请求，
// 这就是jQuery实现模块化开发的方法
// load中的路径是相对于项目的html文件的
$(".shortcut").load("./shortcut/index.html");