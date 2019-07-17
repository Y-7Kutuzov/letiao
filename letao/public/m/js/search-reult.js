//获取到地址栏的关键字
var keyword = getParamsByUrl(location.href, 'keyword');
//当前页
var page = 1;
//页面中的数据
var html = "";
//
var Price = 1;
//
var This = null;
$(function() {
    //根据输入的关键字获取结果
    //1.获取到地址栏的关键字
    // 2.用关键字调取接口
    // 3.搜索结果展示页面
    // var keyword = getParamsByUrl(location.href, 'keyword');
    // console.log(keyword);
    // $.ajax({
    //     url: ' /product/queryProduct',
    //     type: 'get',
    //     data: {
    //         page: 1,
    //         pageSize: 6,
    //         proName: keyword
    //     },
    //     success: function(response) {
    //         console.log(response);
    //         var html = template('searchTpl', response);
    //         console.log(html);

    //         $('#product').html(html);
    //     }
    // })

    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                auto: true, //可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    //callback页面一上来（加载）自动调用一次，到底部时调用一次；

    /*
    按照价格对商品排序
    1.对价格按钮添加按钮轻巧事件
    2.将价格排序规则传递到接口中
    3.对之前的配置初始化
    */
    $('#Price').on('tap', function() {
        //跟改价格排序
        Price = Price == 1 ? 2 : 1;
        html = "";
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    })

});


// 获取地址栏中的参数（url：地址栏;name:获取的参数古名称）
// function getParamsByUrl(url, name) {
//     //url.indexOf('?');
//     //console.log(url.indexOf('?'));
//     var pareams = url.substr(url.indexOf('?') + 1);
//     var paream = pareams.split('&');
//     for (var i = 0; i < paream.length; i++) {
//         var current = paream[i].split('=');
//         //console.log(paream[i]);
//         if (current[0] == name) {
//             return current[1];
//         }

//     }
//     return null;
// }

function getData() {
    if (!This) {
        This = this;
    }

    $.ajax({
        url: '/api/product/queryProduct',
        type: 'get',
        data: {
            page: page++,
            pageSize: 4,
            proName: keyword,
            price: Price,
        },
        success: function(response) {
            if (response.data.length) {
                console.log(response);
                html += template('searchTpl', response);
                //console.log(html);

                $('#product').html(html);
                //1、加载完新数据后，必须执行如下代码，true表示没有更多数据了：
                //2、若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
                This.endPullupToRefresh(false);
            } else {
                This.endPullupToRefresh(true);
            }

        }
    })
}