// import { log } from "handlebars";
//import { normalizeUnits } from "moment";

var userInfo = null;

/**
 * 获取用户信息，并且处理未登录问题
 */
$.ajax({
    url: '/api/user/queryUserMessage',
    type: 'get',
    // 改成同步请求
    async: false,
    success: function(res) {
        console.log(res);
        if (res.error && res.error == 400) {
            location.href = "login.html"
        }
        userInfo = res;
    }
});

$(function() {
    /**
     * 退出登录
     * 1.获取退出登录按钮
     * 2.调用退出登录接口实现功能
     * 3.功能实现，跳转首页
     */
    $('#logOut').on('click', function() {
        //alert(1);
        $.ajax({
            url: '/api/user/logout',
            type: 'get',
            success: function(res) {
                if (res.success) {
                    mui.toast('退出成功！！！');
                    setTimeout(function() {
                        location.href = "index.html";
                    }, 1000)
                }
            }
        })
    });

    //显示用户信息到页面
    var html = template('userTpl', userInfo);
    $('#userInfoBox').html(html);
})