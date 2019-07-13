$(function() {
    $('#search-btn').on('click', function() {
        var keyword = $(this).siblings('input').val();
        if (keyword) {
            ketArr.push(keyword);
            localStorage.setItem('keyArr', JSON.stringify(ketArr));

            location.href = "search-result.html?keyword=";
        } else {
            alert('请输入要搜索的商品关键字');
        }
    });
    var ketArr = [];
    if (localStorage.getItem('keyArr')) {
        ketArr = JSON.parse(localStorage.getItem('keyArr'));
        var html = template('historyTpl', { result: keyArr })
        $('#history-box').html(html)
    };
    $('clearBtn').on('click', function() {
        $('history-box').html("");
        localStorage.removeItem('keyArr');
    })
});