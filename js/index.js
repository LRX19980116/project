window.addEventListener('load',function(){
    //获取DOM元素
    var btn_left = document.querySelector('.btn-left');
    var btn_right = document.querySelector('.btn-right');
    var slideshow = document.querySelector('.slideshow');
    var slideshow_ul = document.querySelector('.slideshow-ul');
    var cirlce = document.querySelector('.cirlce');
    //图片的索引
    var index=0;
    // 小圆圈的索引
    var num=0;
    // 定义节流阀让动画执行完毕后才能执行下一次动画
    var flag = true;
    // 定义动画实现图片缓慢切换
    function animate(obj, target, callback){
        clearInterval(obj.timer);//清除定时器
        obj.timer=setInterval(function(){
            var step = (target-obj.offsetLeft)/10;
            step=step>0?Math.ceil(step):Math.floor(step);
            if(obj.offsetLeft==target){
                clearInterval(obj.timer);
                callback && callback();
                // if (true) {
                //     callback();
                // }
            }
            obj.style.left=(obj.offsetLeft+step)/80+'rem';
        },30);
    }
    
    var timer = setInterval(cutImg,4000);
    //左右按钮的显示隐藏
    slideshow.addEventListener('mouseenter',function(){
        btn_left.style.display='block';
        btn_right.style.display='block';
        clearInterval(timer);
    });
    slideshow.addEventListener('mouseleave',function(){
        btn_left.style.display='none';
        btn_right.style.display='none';
        timer = setInterval(cutImg,4000);
    });
    //动态创建小圆圈
    for(var i=0;i<slideshow_ul.children.length;i++){
        let li = document.createElement('li');
        // 为li添加自定义索引
        li.setAttribute('data-index',i);
        cirlce.appendChild(li);
        // 给li绑定点击事件
        li.addEventListener('click',function(){
            index=num=this.getAttribute('data-index');
            // 清空所有li的back类
            for(var i=0;i<cirlce.children.length;i++){
                cirlce.children[i].className=''; 
            }
            // 给被点击的li添加back类
            this.className='back';
            //slideshow_ul_li.offsetWidth获取li的宽度
            animate(slideshow_ul,-this.getAttribute('data-index')*slideshow_ul.children[0].offsetWidth);
        });
    }
    cirlce.children[0].className='back';
    //克隆第一张图片
    var first_li = slideshow_ul.children[0].cloneNode(true);
    slideshow_ul.appendChild(first_li);
    // 下一张
    btn_right.addEventListener('click',function(){
        cutImg();
    })
    // 上一张
    btn_left.addEventListener('click',function(){
        if(flag){
            flag=false;
            if(index==0){
                slideshow_ul.style.left=-((slideshow_ul.children.length-1)*slideshow_ul.children[0].offsetWidth)/80+'rem';
                index=slideshow_ul.children.length-1;
            }
            index--;
            animate(slideshow_ul,-index*slideshow_ul.children[0].offsetWidth,function(){
                return flag=true;
             });
            //改变小圆圈的背景
            num--;
            if(num==-1){
                num=cirlce.children.length-1;
            }
            for(var i=0;i<cirlce.children.length;i++){
                cirlce.children[i].className='';
            }
            cirlce.children[num].className='back';
        }
    })
    function cutImg(){
        if(flag){
            flag=false;
            if(index==slideshow_ul.children.length-1){
                slideshow_ul.style.left=0;
                index=0;
            }
            index++;
            // console.log(index);
            animate(slideshow_ul,-index*slideshow_ul.children[0].offsetWidth,function(){
                flag=true;
            });
            // 实现小圆圈与图片一起变化
            //改变小圆圈的背景
            num++;
            if(num==cirlce.children.length){
                num=0;
            }
            for(var i=0;i<cirlce.children.length;i++){
                cirlce.children[i].className='';
            }
            cirlce.children[num].className='back';
        }
    }
});