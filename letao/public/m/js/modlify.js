$(function() {
    /**
     * 修改密码
     * 1.获取修改密码按钮并添加点击事件
     * 2.获取用户输入的信息
     * 3.对用户输入的信息做效验
     * 4.调用修改密码接口，实现修改密码功能
     * 5.跳转到登录页面 重新登录
     */
    //1.
    $('#modify-btn').on('tap', function() {
        //console.log(1);
        //2.
        var originPass = $.trim($('[name="originPass"]').val());
        var newPass = $.trim($('[name="newPass"]').val());
        var confirmNewPass = $.trim($('[name="confirmNewPass"]').val());
        var vCode = $.trim($('[name="vCode"]').val());
        if (!originPass) {
            mui.toast('请输入正确原密码');
            return;
        }
        if (newPass != confirmNewPass) {
            mui.toast('密码输入不一致');
        }

        $.ajax({
            url: '/api/user/updatePassword',
            type: 'post',
            data: {
                oldPassword: originPass,
                newPassword: newPass,
                vCode: vCode,
            },
            success: function(res) {
                console.log(res);
                if (res.success) {
                    mui.toast('修改成功');
                    setTimeout(function() {
                        location.href = "login.html";
                    }, 1000)
                }

            }
        })
    });
    /**
     * 获取认证码
     */
    $('#getCode').on('tap', function() {
        $.ajax({
            url: '/api/user/vCodeForUpdatePassword',
            type: 'get',
            success: function(res) {
                console.log(res.vCode);

            }
        })
    });



});