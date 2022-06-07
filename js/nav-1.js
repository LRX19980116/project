// window.addEventListener('scroll',function(){
//     // 页面被卷起的距离
//     var top = document.documentElement.scrollTop || document.body.scrollTop;
//     var header_nav = document.querySelector('.header-nav');
//     var head_nav = document.querySelector('.head-nav');
//     if(top>=header_nav.offsetTop){// header-nav导航栏距离页面顶部的距离
//         head_nav.style.top=0;
//     }else{
//         head_nav.style.top=-1.125+'rem';
//     }
// })
$(function(){
    //页面滚动事件
    $(document).on('scroll',function(){
        //html或者body被卷曲头部的距离
        let head = $('html').scrollTop() || $('body').scrollTop();
        //.header-nav距离页面顶部的距离
        let head_nav = $('.header-nav').offset().top;
        if(head>=head_nav){
            // 显示隐藏的导航栏
            $('.head-nav').css('top',0);
        }else{
            // 显示初始化的导航栏
            $('.head-nav').css('top','-1.125rem');
        }
    });
    // 定义计时器id
    let timer = null;
    //定义全局缓存对象
    let objData = {};
    //定义防抖函数
    function debounceSearch(str){
        timer = setTimeout(function(){
            getDataList(str);
        },300);
    }
    // 搜索框的键盘按下事件
    $('#search').on('keyup',function(){
        //清楚计时器
        clearTimeout(timer);
        //触发事件获取文本框的值
        var text = $(this).val().trim();
        if(text.length<=0){
            return $('#search-hide').empty().hide();
        }
        // 判断缓存中是否有用户搜索的内容
        if(objData[text]){
            // 若果有直接以缓存数据进行搜索列表的渲染
            return renderList(objData[text]);
        }
        debounceSearch(text);
    });
    // 文本框获取焦点事件
    $('#search').on('focus',function(){
        $('#search').keyup();
    });
    //定义函数获取搜索框推荐列表的值
    function getDataList(str){
        $.ajax({
            url:'https://suggest.taobao.com/sug?q=' + str,
            dataType:'jsonp',
            success:function(res){
                console.log(res);
                renderList(res);
            }
        });
    }
    // 渲染ul结构
    function renderList(res){
        if(res.result.length<=0){
            return $('#search-hide').empty().hide();
        }
        let htmlSrt = template('search-1',res);
        $('#search-hide').html(htmlSrt).show();
        //获取用户输入的内容，作为键
        let key = $('#search').val().trim();
        //把数据作为值进行缓存
        objData[key]=res;
    }
    // 为搜索推荐列表绑定点击事件
    $('#search-hide').on('click','.search-itme',function(){
        $('#search').val('');
        $('#search').val($(this).html());
        $('#search-hide').hide();
    });
})