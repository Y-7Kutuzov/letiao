$(function() {
    //产品id
    var sun = 0;
    var size = null;
    var productId = 0;
    var id = getParamsByUrl(location.href, 'id');
    console.log(id);
    $.ajax({
        url: '/api/product/queryProductDetail',
        get: 'get',
        data: {
            id: id,
        },
        success: function(res) {
            console.log(res);
            //库存数量
            sun = res.num;
            //产品id
            productId = res.id;
            var html = template('detailTpl', res);
            // console.log(html);
            $('#detailBox').html(html)
                //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 0 //自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    });


    $('#detailBox').on('tap', '.size span', function() {
        //alert(1);
        $(this).addClass('active').siblings('span').removeClass('active');
        //用户选择的尺码
        size = $(this).html();

    });
    var inp = $('#inp');
    //+
    $('#increase').on('tap', function() {
        var num = inp.val();
        num++;
        if (num > sun) {
            num = sun;
        }
        inp.val(num);
    });
    //-
    $('#reduce').on('tap', function() {
        var num = inp.val();
        num--;
        if (num < 1) {
            num = 1;
        }
        inp.val(num);

    });
    /**
     * 加入购物车
     * 1.获取按钮
     */
    $('#cart').on('tap', function() {
        //alert(1);
        if (!size) {
            mui.toast('请选择尺码！！');
            return;
        }
        $.ajax({
            url: '/api/cart/addCart',
            type: 'post',
            data: {
                productId: productId,
                num: sun,
                size: size,
            },
            success: function(res) {
                if (res.success) {
                    mui.confirm('添加成功', function(message) {
                        //console.log(message);
                        if (message.index == 1) {
                            location.href == 'cart.html';
                        }

                    });
                }
                console.log(res);

            }
        })
    });
});