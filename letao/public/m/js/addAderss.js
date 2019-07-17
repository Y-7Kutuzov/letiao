$(function() {

    var isEdit = Number(getParamsByUrl(location.href, 'isEdit'));

    if (isEdit) {
        //编辑操作
        if (localStorage.getItem("editAddress")) {
            var address = JSON.parse(localStorage.getItem("editAddress"));
            console.log(address);
            var html = template('editTpl', address);
            console.log(html);
            $('#editBox').html(html);
        }
    } else {
        //添加操作
        var html = template('editTpl', {});
        console.log(html);
        $('#editBox').html(html);
    }

    //创建一个picker选择器
    var picker = new mui.PopPicker({ layer: 3 });
    //为选择器添加数据
    picker.setData(cityData);
    $('#selectCity').on('tap', function() {
        //alert(1);
        picker.show(function(selectItems) {
            console.log(selectItems);

            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
        });
    });
    //获取收货地址
    $('#addAderss').on('tap', function() {
        // alert(1);
        var username = $.trim($('[name="username"]').val());
        var postCode = $.trim($('[name="postCode"]').val());
        var city = $.trim($('[name="city"]').val());
        var detail = $.trim($('[name="detail"]').val());

        if (!username) {
            mui.toast('请输入收货人姓名');
            return;
        }
        if (!postCode) {
            mui.toast('请输入邮政编码');
            return;
        }
        if (!city) {
            mui.toast('请输入省市');
            return;
        }
        if (!detail) {
            mui.toast('请输入详细信息地址');
            return;
        }

        var data = {
            address: city,
            addressDetail: detail,
            recipients: username,
            postcode: postCode,
        };

        if (isEdit) {
            var url = "/api/address/updateAddress";
            data.id = address.id;
        } else {
            var url = "/api/address/addAddress";
        }

        $.ajax({
            url: url,
            type: 'post',
            data: data,
            success: function(res) {
                console.log(res);

                if (res.success) {
                    if (isEdit) {
                        mui.toast('修改成功');
                    } else {
                        mui.toast('添加成功');
                    }
                    setTimeout(function() {
                        location.href = "aderss.html";
                    }, 1000)
                }
            },


        });
        //return false;
    })


});