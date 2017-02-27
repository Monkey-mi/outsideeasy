// JavaScript Document
/*轮播图插件
*/
; (function ($, window, document, undefined) {
//alert("test");
lbtSlider=function(container,options){
		 /*
        options = {
            auto:false,
			index:0,
		//num小图中显示的个数
		num:5,
		time:4000,
		delay:400,
		controller:'#listBox',
		prev:'#prev',
		next:'#next',
		prevTop:'#prevTop',
		nextTop:'#nextTop'
        }
        */
	"use strict"; //stirct mode
	if (!container) return;
	var options=options||{},
		isAuto=options.auto,
		//初始显示的索引号，从0开始
		index=options.index==undefined?0:options.index,
		//小图列表中显示的个数
		num=options.num,
		//自动播放计时器
		time=options.time==undefined?5000:options.time,
		//滑动延时时间
		delay=options.delay==undefined?400:options.delay,
		//小图对象
		controller=$(options.controller),
		//小图左右切换按钮
		oPrev=$(options.prev),
		oNext=$(options.next),
		//大图左右切换按钮
		oPrevTop=$(options.prevTop),
		oNextTop=$(options.nextTop),
		//大图ul
		oPicUl=container.children("ul"),
		//小图ul
		oListUl=controller.children("ul"),
		//大图li
		oPicLi=oPicUl.children(),
		//小图li
		oListLi=oListUl.children(),
		len1=oPicLi.length,
		len2=oListLi.length,
		w1=oPicLi.eq(0).outerWidth(),
		w2=oListLi.eq(0).outerWidth(),
		interval,
		num2=Math.ceil(num/2);
		
		
		function init()
		{
			oPicUl.width(w1*len1+"px");
			oListUl.width(  w2 * len2 + "px");
			initChange();
			/*
			oNextTop.onclick = oNext.onclick = function(){
		
				index ++;
				index = index == len2 ? 0 : index;
				Change();
			}
			oPrevTop.onclick = oPrev.onclick = function(){
		
				index --;
				index = index == -1 ? len2 -1 : index;
				Change();
			}*/
			//左右切换按钮鼠标悬停事件
			/*
			oPrevTop.mouseover(function(){
				stopPlay();
			});
			
			oNextTop.mouseout(function(){
				isAuto && autoPlay();
			});
			
			oPrev.mouseover(function(){
				stopPlay();
			});
			oNext.mouseout(function(){
				isAuto && autoPlay();
			});
			*/
			oListLi.click(function(){
				stopPlay();
				index=$(this).index()-1;
				play();
				isAuto && autoPlay();
			});
			/*
			oPrevTop.mouseover(function(){
				stopPlay();
			}).mouseout(function(){
				isAuto && autoPlay();
			});
			oNextTop.mouseover(function(){
				stopPlay();
			}).mouseout(function(){
				isAuto && autoPlay();
			});
				
			oListLi.mouseover(function(){
				stopPlay();	
			});
				
			oListLi.mouseout(function(){
				isAuto && autoPlay();
			});
			*/
			isAuto && autoPlay();
		}
		//第一次根据index初始化显示第index索引的li
		function initChange(){
			
			//大图的移动
			oPicUl.animate({left:'-'+index*w1+'px'},0);
			//小图的移动
			if(index < num2){
				oListUl.animate({left:0},delay);
				
			}else if(index + num2 <= len2){
				oListUl.animate({left:'-'+(index - num2 + 1) * w2+'px'},0);
				
			}else{
				oListUl.animate({left:'-'+(len2 - num) * w2+'px'},0);
			}
			oListUl.children('.on').removeClass("on");
			oListUl.children().eq(index).addClass("on");
		}
		function Change(){
			
			//大图的移动
			oPicUl.animate({left:'-'+index*w1+'px'},delay);
			//小图的移动
			if(index < num2){
				oListUl.animate({left:0},delay);
				
			}else if(index + num2 <= len2){
				oListUl.animate({left:'-'+(index - num2 + 1) * w2+'px'},delay);
				
			}else{
				oListUl.animate({left:'-'+(len2 - num) * w2+'px'},delay);
			}
			oListUl.children('.on').removeClass("on");
			oListUl.children().eq(index).addClass("on");
		}
		//自动切换
		function autoPlay()
		{
			//interval=setInterval(play,options.time);
			interval=setInterval(function(){
				play();
			},options.time);
		}
		
		function play(){
		    /*
			timer=setInterval( function(){
					index ++;
			index = index == len2 ? 0 : index;
			Change();
					},time);*/
			//Change();
			
			index ++;
			index = index == len2 ? 0 : index;
			Change();
		}
		function stopPlay() {
            clearInterval(interval);
        }
		
		function prev(){
		
			stopPlay();
			index --;
			index = index == -1 ? len2 -1 : index;
			Change();
			isAuto && autoPlay();
		}
		function next()
		{
			stopPlay();
			index ++;
			index = index == len2 ? 0 : index;
			Change();
			isAuto && autoPlay();
			}
		init();
		return {
			//expose the lbtSlider API	
			Prev:function(){
				prev();
				},
			Next:function(){
				next();
				},
			Stop:function(){
				stopPlay();
				},
			Continue:function(){
				isAuto && autoPlay();
				}
				
		}
	};

}(jQuery, window, document));
