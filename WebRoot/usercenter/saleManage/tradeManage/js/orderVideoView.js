 var urlPara = location.search; //获取参数部分
 urlPara=unescape(urlPara);//对参数解密
 function getPara(paraName){ 
	 var reg = new RegExp("[&|?]"+paraName+"=([^&$]*)", "gi"); 
	 var a = reg.test(urlPara); 
	 return a ? RegExp.$1 : ""; 
	 } 
//捕获参数并进行操作 
   var pur_order_id= getPara("pur_order_id"); //捕获到url参数 
   var order_attched_id = getPara("order_attched_id");
$(function(){
		fileLoadListVideo();//加载视频
});
/**
 * 视频初次进行加载
 */
function fileLoadListVideo(){
	var url = 'orderAgreementFile/getOrderAttchedFileForVideo.do';
	var params={};
	params.pur_order_id=pur_order_id;
	var fn=function(result){ 			
			$("#listBoxvideo ul ").empty();
			$("#picBoxvideo ul ").empty();
			var imagelist = result.data;
			var length = imagelist.length;
			if(length == 0){
				return;
			}			
			var v=0;
			var imageItem="";
			var imageItem2="";
			var videonewsrc="";
			var videoname ="";
			var newsrcm ="";
			if(parseInt(order_attched_id)==0) {//点击视频播放按钮时只显示第一个视频
				 v = parseInt(order_attched_id);
				 videonewsrc =getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+imagelist[0].view_no;
				 videoname = (imagelist[0].order_attched_name==null)?"":imagelist[0].order_attched_name;
				 videoremark = (imagelist[0].order_attched_remark==null)?"无":imagelist[0].order_attched_remark;
				 imageItem2 = newsrcm+addimageItem(imageItem2,videonewsrc,videoname,videoremark);//视频播放的拼接
			}
			for(var i=0;i<length;i++){
				var image=imagelist[i];
				var imagenewsrc = null;	
				imagenewsrc=getwebroot()+"orderAgreementFile/downLoadFileFormMongoForSub.do?file="+image.mogodb_id;
				imageItem =imageItem+
				'<li><input style="display:none" value="'+image.order_attched_id+'"/><img title="'+image.order_attched_name+'" onClick="loadNewSrc('+image.order_attched_id+')" src="'+imagenewsrc+'" /></li>';
				if(image.order_attched_id==order_attched_id){	//当id相同时加载该视频的信息
					  v = i;
					  videonewsrc =getwebroot()+"orderAgreementFile/downLoadFileFormMongo.do?file="+image.view_no;
					  videoname = (image.order_attched_name==null)?"":image.order_attched_name;
					  videoremark = (image.order_attched_remark==null)?"无":image.order_attched_remark;
					  if(v>0){
						  for(var i=0;i<v;i++){
							  newsrcm = newsrcm+"<li></li>";
						  }
					  }
					  imageItem2 = newsrcm+addimageItem(imageItem2,videonewsrc,videoname,videoremark);//视频播放的拼接
				}	
												
			}
			$("#picBoxvideo ul").html(imageItem2);
			$("#listBoxvideo ul").html(imageItem);		
			sliber(v);
			};
			asyncAjaxMethod(url,params,true,fn); 
}
/**
 * 视频播放的拼接
 * @param imageItem2
 * @param videonewsrc
 * @param videoname
 * @returns {String}
 */
function addimageItem(imageItem2,videonewsrc,videoname,videoremark){
	var addimage ="";
	addimage = imageItem2 +
	'<li>'+
	'<span style="top:0">视频名称:'+videoname+';视频描述:'+videoremark+'</span>'+
	'<a href="javascript:void(0)">'+
	'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="100%" height="100%">'+
		'<param name="movie" value="/flvplayer.swf" />'+
		'<param name="quality" value="high" />'+
		'<param name="play" value="true" />'+
		'<param name="loop" value="true" />'+
		'<param name="wmode" value="transparent" />'+
		'<param name="bgcolor" value="#ffffff" />'+
		'<param name="allowfullscreen" value="true">'+
		'<param name="devicefont" value="false" />'+
		'<param name="scale" value="showall" />'+
		'<param name="menu" value="true" />'+
		'<param value="true" name="allowfullscreen" />'+
		'<param name="salign" value="" />'+
		'<param name="allowScriptAccess" value="sameDomain" />'+
		'<param name="flashvars" value="vcastr_file='+videonewsrc+'&buffertime=3&IsAutoPlay=1"/>'+			
		'<embed height=100% align="middle" width=100%   src="/flvplayer.swf"  menu="true" play="true" allowfullscreen="true"  allowscriptaccess="sameDomain" quality="high" wmode="transparent" bgcolor="#fff" ver="10.0.0"'+
		'pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" name="aprilfools" flashvars="vcastr_title='+videoname+'&vcastr_file='+videonewsrc+'&buffertime=3&IsAutoPlay=0" >'+
		'</embed>'+
	'</object>'+
	'</a>'+
	'</li>';
	return addimage;
}
/**
 * 左右的选择播放视频
 * @param v
 */
function sliber(v){
	var slider=new lbtSlider($("#picBoxvideo"),{
		//是否自动播放
		auto:false,
		index: v,
		//num小图中显示的个数
		num:5,
		time:4000,
		delay:400,
		controller:'#listBoxvideo',
		prev:'#prev',
		next:'#next',
		prevTop:'#prevTop',
		nextTop:'#nextTop'
	});
	$("#prev").click(function(){
		slider.Prev();
	});
	$("#prevTop").click(function(){
		slider.Prev();
	});
	$("#next").click(function(){
		slider.Next();
	});
	$("#nextTop").click(function(){
		slider.Next();
	});
}
/**
 * 左右点击视频的切换
 * @param obj
 * @param indx
 */
function loadNewSrcat(obj,indx){
	var url = 'orderAgreementFile/getOrderAttchedFileForVideo.do';
	var params={};
	params.pur_order_id=pur_order_id;
	var tid ="";
	if(parseInt(indx)==-1){//向左移
		 tid = $(obj).parent().find("ul li.on").prev().find("input").val();
		 if(($(obj).parent().find("ul li.on").prev().length)==0){
			 tid = $(obj).parent().find("ul li:last").find("input").val();
		 }
	}if(parseInt(indx)==1){//向右移
		 tid = $(obj).parent().find("ul li.on").next().find("input").val();
		 if(($(obj).parent().find("ul li.on").next().length)==0){
			 tid = $(obj).parent().find("ul li:eq(0)").find("input").val();
		 }
	}
	var fn=function(result){ 			
		$("#listBoxvideo ul ").empty();
		$("#picBoxvideo ul ").empty();
		var imagelist = result.data;
		var length = imagelist.length;
		if(length == 0){
			return;
		}			
		var imageItem="";
		var imageItem2="";
		var videonewsrc="";
		var imagenewsrc = "";	
		var videoname ="";
		var newsrcm ="";
		var v=0;
		for(var i=0;i<length;i++){
			var image=imagelist[i];
			var imagenewsrc = null;						
			imagenewsrc=getwebroot()+"orderAgreementFile/downLoadFileFormMongoForSub.do?file="+image.mogodb_id;
			imageItem =imageItem+
			'<li><input style="display:none" value="'+image.order_attched_id+'"/><img title="'+image.order_attched_name+'" onClick="loadNewSrc('+image.order_attched_id+')" src="'+imagenewsrc+'" /></li>';
			if(image.order_attched_id==tid){	
				  v = i;
				  videonewsrc =getwebroot()+"orderAgreementFile/downLoadFileFormMongo.do?file="+image.view_no;
				  videoname = (image.order_attched_name==null)?"":image.order_attched_name;
				  videoremark = (image.order_attched_remark==null)?"无":image.order_attched_remark;
				  if(v>0){
					  for(var i=0;i<v;i++){
						  newsrcm = newsrcm+"<li></li>";
					  }
				  }
				  imageItem2 = newsrcm+addimageItem(imageItem2,videonewsrc,videoname,videoremark);//视频播放的拼接
			}	
											
		}															
		$("#picBoxvideo ul").html(imageItem2);
		$("#listBoxvideo ul").html(imageItem);		
		sliber(v);
		};
			asyncAjaxMethod(url,params,true,fn); 	
}
/**
 * 点击图片=加载视频
 * @param newid
 */
function loadNewSrc(newid){
	var url = 'orderAgreementFile/getOrderAttchedFileForVideo.do';
	var params={};
	params.pur_order_id=pur_order_id;
	var fn=function(result){ 			
			$("#listBoxvideo ul ").empty();
			$("#picBoxvideo ul ").empty();
			var imagelist = result.data;
			var length = imagelist.length;
			if(length == 0){
				return;
			}			
			var imageItem="";
			var imageItem2="";
			var videonewsrc="";
			var imagenewsrc = "";	
			var videoname ="";
			var newsrcm ="";
			var v=0;
			for(var i=0;i<length;i++){
				var image=imagelist[i];
				var imagenewsrc = null;						
				imagenewsrc=getwebroot()+"orderAgreementFile/downLoadFileFormMongoForSub.do?file="+image.mogodb_id;
				imageItem =imageItem+
				'<li><input style="display:none" value="'+image.order_attched_id+'"/><img title="'+image.order_attched_name+'" onClick="loadNewSrc('+image.order_attched_id+')" src="'+imagenewsrc+'" /></li>';
				if(image.order_attched_id==newid){	
					  v = i;
					  videonewsrc =getwebroot()+"orderAgreementFile/downLoadFileFormMongo.do?file="+image.view_no;
					  videoname = (image.order_attched_name==null)?"":image.order_attched_name;
					  videoremark = (image.order_attched_remark==null)?"无":image.order_attched_remark;
					  if(v>0){
						  for(var i=0;i<v;i++){
							  newsrcm = newsrcm+"<li></li>";
						  }
					  }
					  imageItem2 = newsrcm+addimageItem(imageItem2,videonewsrc,videoname,videoremark);//视频播放的拼接
				}	
												
			}															
			$("#picBoxvideo ul").html(imageItem2);
			$("#listBoxvideo ul").html(imageItem);		
			sliber(v);
			};
			asyncAjaxMethod(url,params,true,fn); 
}