$(function() {
    $('body').on('tap', 'a', function() {
        mui.openWindow({
            url: $(this).attr('href')
        });
    });
});

// 获取地址栏中的参数（url：地址栏;name:获取的参数古名称）
function getParamsByUrl(url, name) {
    //url.indexOf('?');
    //console.log(url.indexOf('?'));
    var pareams = url.substr(url.indexOf('?') + 1);
    var paream = pareams.split('&');
    for (var i = 0; i < paream.length; i++) {
        var current = paream[i].split('=');
        //console.log(paream[i]);
        if (current[0] == name) {
            return current[1];
        }

    }
    return null;
}