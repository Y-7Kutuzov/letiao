// import { template } from "handlebars";

$(function() {

    // 实现用户点击搜索按钮跳转到搜索结果页面
    // 1.给搜索按钮添加点击事件
    // 2.获取用户输入的搜索关键字
    // 3.判断用户是否输入关键字
    // 4.如果用户没有输入 阻止跳转 给出提示
    // 5.如果用户输入 跳转结果页面

    $('#search-btn').on('click', function() {
        //用户搜索关键字
        var keyword = $(this).siblings('input').val();
        // alert(11111);
        //用户输入关键字
        if (keyword) {
            //用户输入的关键字存入数组
            keyAll.push(keyword);

            localStorage.setItem('keyAll', JSON.stringify(keyAll));

            location.href = "search-reult.html?keyword=" + keyword;
        } else {
            alert('请输入关键字');
        }
    });

    // 实现历史关键字的存储
    var keyAll = [];

    if (localStorage.getItem('keyAll')) {
        keyAll = JSON.parse(localStorage.getItem('keyAll'));
        //console.log(keyAll);
        var html = template('historyTpl', { result: keyAll });
        console.log(html);
        $('#mui-table-view').html(html);
    }

    //清空历史
    $('#claerBtn').on('click', function() {

        $('#mui-table-view').html("");
        localStorage.removeItem('keyAll');

    });
})