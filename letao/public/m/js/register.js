/*
注册
1.给注册按钮添加点击事件
2.获取到用户注册的信息
3.对用户的输入信息验证
4.调用接口，实现注册
5.给出提示，告诉用户是否注册成功
6.跳转的登录页
*/


$(function() {
    $('#register').on('click', function() {
        var username = $('[name="username"]').val();
        // console.log(username);
        var mobile = $('[name="mobile"]').val();
        // console.log(mobile);
        var password = $('[name="password"]').val();
        // console.log(password);
        var againPass = $('[name="againPass"]').val();
        // console.log(againPass);
        var vCode = $('[name="vCode"]').val();
        // console.log(vCode);
        if (!username) {

            mui.toast("输入用户名");
            return;
        }
        if (!/^1[3456789]\d{9}$/.test(mobile)) {
            // alert("请输入正确的手机号");
            mui.toast("输入用请输入正确的手机号户名");
            return;
        }
        if (password != againPass) {
            // alert("两次输入不一样！");
            mui.toast("两次输入不一样！");
            return;
        }

        //注册接口
        $.ajax({
            url: '/api/user/register',
            type: 'post',
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode,
            },
            success: function(res) {
                alert("good");
                setTimeout(function() {
                    location.href = "login.html";
                }, 1000)

            }

        })
    });
    //获取认证码
    //1.添加点击事件
    //2.调用接口获取认证码
    //3.将认证码输出控制台
    $('#getCode').on('click', function() {
        $.ajax({
            url: '/api/user/vCode',
            type: 'get',
            success: function(res) {
                console.log(res.vCode);

            }
        });
    });
})