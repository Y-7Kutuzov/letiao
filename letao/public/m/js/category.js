$(function() {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
        // 一级分类
        $.ajax({
                url: '/api/category/queryTopCategory',
                type: 'get',
                success: function(response) {
                    //console.log(response);
                    //奖数据和HTML做拼接
                    //1）html和模板id
                    //2）数据
                    var html = template('category-first', { result: response.rows });
                    $('#link').html(html);
                    //一级分类有数据
                    if (response.rows.length) {
                        $('#link').find('a').eq(0).addClass('active');
                        //获取分类的第一个id
                        var id = response.rows[0].id;
                        //根据一级分类获取二级分类
                        getSecondCategory(id);
                    }
                }
            })
            /*
            点击一级分类获取二级分类
            1.一级分类添加点击事件
            2.在事件处理函数中获取一级分类的id
            3.调用二级分类接口获取数据
            4.展示数据
            5.如果没有数据则在页面中显示没有数据
            6.调用加api,
            */
        $('#link').on('click', 'a', function() {
            //alert(1);
            //2
            var id = $(this).attr('data-id');
            //给当前点击的一级分类添加选中状态
            $(this).addClass('active').siblings().removeClass('active');
            //3
            getSecondCategory(id);
        });
    })
    //
function getSecondCategory(id) {
    $.ajax({
        type: 'get',
        url: '/api/category/querySecondCategory',
        data: {
            id: id
        },
        success: function(response) {
            console.log(response);
            var html = template('category-second', response);
            $('#category-ul').html(html);

        }
    });
}