$(function() {

    //1.获取登录按钮并且添加点击事件
    $('#login-btn').on('click', function() {

        var username = $.trim($('[name="username"]').val());
        var password = $.trim($('[name="password"]').val());

        if (!username) {
            alert('请输入用户名');
            return;
        }
        if (!password) {
            alert('请输入密码');
            return;
        }
        $.ajax({
            url: '/api/employee/employeeLogin',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success: function(res) {
                if (res.success) {
                    location.href = 'user.html'
                } else {
                    alert(res.message)
                }
            }
        })

    })
})