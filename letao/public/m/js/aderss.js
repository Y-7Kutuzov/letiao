//import { template } from "handlebars";

$(function() {
    /**
     * 获取用户存储的收货地址
     */
    //存储收货地址
    var address = null;
    $.ajax({
            url: '/api/address/queryAddress',
            type: 'get',
            success: function(res) {
                console.log(res);
                address = res;
                var html = template('aderssTpl', { result: res });
                //console.log(html);
                $('#aderssBox').html(html);

            }
        })
        /**
         * 删除收货地址
         * 1.添加事件
         * 2.弹出确认框
         * 3.调用接口
         */
    $('#aderssBox').on('tap', '.delete', function() {
        //alert(1);
        var id = this.getAttribute('data-id');
        var li = this.parentNode.parentNode;
        console.log(id);

        mui.confirm("确认要删除吗?", function(message) {
            // console.log(message);
            //确认删除
            if (message.index == 1) {
                // $.ajax({
                //     url: '/api/address/deleteAddress',
                //     type: 'post',
                //     data: {
                //         id: id,
                //     },
                //     success: function(res) {
                //         console.log(res);

                //     }
                // });
                $.ajax({
                    url: '/api/address/deleteAddress',
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: function(res) {

                        // 删除成功
                        if (res.success) {

                            // 重新加载当前页面
                            location.reload();

                        }

                    }
                })
            } else {
                //取消删除
                //关闭列表画出效果
                mui.swipeoutClose(li);
            }
        });
    });

    /**
     *编辑功能
     */
    $('#aderssBox').on('tap', '.edit', function() {
        //alert(1);
        var id = this.getAttribute('data-id');
        for (var i = 0; i < address.length; i++) {
            if (address[i].id == id) {
                localStorage.setItem('editAddress', JSON.stringify(address[i]));
                break;
            }
        }
        //跳转编辑页面
        location.href = "addAderss.html?isEdit=1";
        console.log(address);
        console.log(id);


    });
});