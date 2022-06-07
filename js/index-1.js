$(function(){
    // 图片索引
    let num = 0;
    //小圆圈索引
    let index = 0;
    // 定时器id
    var timer = null;
    //节流阀
    let flag = true;
    // 隐藏显示左右按钮
    $('.slideshow').on('mouseover',function(){
        $('.btn-left').show();
        $('.btn-right').show();
        clearInterval(timer);
    });
    $('.slideshow').on('mouseout',function(){
        $('.btn-left').hide();
        $('.btn-right').hide();
        timer = setInterval(getRight, 4000);
    });
    //动态创建小圆点并且添加索引
    for (let index = 0; index < $('.slideshow-ul>li').length; index++) {
        $('.cirlce').append(`<li data-index=${index}></li>`);
    }
    //获取放图片li的宽度
    let liWidth = $('.slideshow-ul>li').outerWidth();
    //为第一个li添加back类
    $('.cirlce>li:first-child').addClass('back');
    //把第一张图片复制并追加到ul中
    $('.slideshow-ul').append($('.slideshow-ul>li:first-child').clone());
    // 为小圆圈添加点击事件
    $('.cirlce>li').on('click',function(){
        num=index = $(this).attr('data-index');
        let ulWidth = (-index*liWidth)/80;
        //清除所有li的back类
        $('.cirlce>li').removeClass('back');
        $(this).addClass('back');
        $('.slideshow-ul').animate({left:`${ulWidth}rem`},1000);
    });
    //用定时器实现自动轮播
    timer = setInterval(getRight, 4000);
    //右侧按钮点击事件
    $('.btn-right').on('click',function(){
        getRight();
    });
    //左侧按钮事件
    $('.btn-left').on('click',function(){
       if(flag){
           flag=false;
        if(index==0){
            index=$('.slideshow-ul>li').length-1;
            $('.slideshow-ul').css({left:`-${(index*liWidth)/80}rem`});
        }
        index--;
        $('.slideshow-ul').stop().animate({left:`-${index*liWidth/80}rem`},1000,function(){
            flag=true;
        });
        if(num<=0){
            num=$('.cirlce>li').length;
        }
        num--;
        $('.cirlce>li').eq(num).addClass('back').siblings().removeClass('back');
       }
    });
    //向右播放函数 
    function getRight(){  
        if(flag){
            flag=false;
            if(index==$('.slideshow-ul>li').length-1){
                $('.slideshow-ul').css({left:0});
                index=0;
            }
            index++; 
            $('.slideshow-ul').stop().animate({left:`-${index*liWidth/80}rem`},1000,function(){
                flag=true;
            });
            num++;
            if(num>=$('.cirlce>li').length){
                num=0;
            }
            $('.cirlce>li').eq(num).addClass('back').siblings().removeClass('back');
        }
    }
})