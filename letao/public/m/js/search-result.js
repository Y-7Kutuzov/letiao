var keyword = getParamsByUrl(location.href, 'keyword');
var page = 1;
var html = "";
var priceSort = 1;
var This = null;
$(function() {
    mui.init({
        pullRefresh: {
            container: '#refreshContainer',
            up: {
                height: 50,
                auto: true,
                contentrefresh: "正在加载...",
                contentnomore: '没有更多数据了',
                callback: getData
            }
        }
    });


    $('#priceSort').on('tap', function() {


        priceSort = priceSort == 1 ? 2 : 1;


        html = "";
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);

        getData();

    });


});


function getParamsByUrl(url, name) {

    var params = url.substr(url.indexOf('?') + 1);

    var param = params.split('&');

    for (var i = 0; i < param.length; i++) {

        var current = param[i].split('=');

        if (current[0] == name) {

            return current[1]

        }

    }

    return null;

}

function getData() {

    if (!This) {
        This = this;
    }

    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: {
            page: page++,
            pageSize: 3,
            proName: keyword,
            price: priceSort
        },
        success: function(response) {
            if (response.data.length > 0) {

                html += template('searchTpl', response);

                $('#search-box').html(html);

                This.endPullupToRefresh(false);
            } else {
                This.endPullupToRefresh(true);

            }
        }

    });

}