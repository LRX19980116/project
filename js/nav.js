window.addEventListener('scroll',function(){
    // 页面被卷起的距离
    var top = document.documentElement.scrollTop || document.body.scrollTop;
    var header_nav = document.querySelector('.header-nav');
    var head_nav = document.querySelector('.head-nav');
    if(top>=header_nav.offsetTop){// header-nav导航栏距离页面顶部的距离
        head_nav.style.top=0;
    }else{
        head_nav.style.top=-1.125+'rem';
    }
})