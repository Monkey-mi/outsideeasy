 var urlPara = location.search; //获取参数部分
 urlPara=unescape(urlPara);//对参数解密
 function getPara(paraName){ 
	 var reg = new RegExp("[&|?]"+paraName+"=([^&$]*)", "gi"); 
	 var a = reg.test(urlPara); 
	 return a ? RegExp.$1 : ""; 
	 } 
//捕获参数并进行操作 
 var taskid= getPara("taskid"); //捕获到url参数 
 var tf_id = getPara("tf_id");
 var file_type=getPara("file_type");
$(function(){
		fileLoadListView();
});

/**
 * 加载工艺文件图片信息
 */
function fileLoadListView(){
	if(file_type==8 || file_type==7){
		var url = 'taskFile/getTaskFileImgListproduct.do';
		var params={};
		params.t_id=taskid;
		params.file_type=8;
	}else{
	    var url = 'taskFile/getTaskFileList2ForProducer.do';
	    var params={};
		params.t_id=taskid;
		params.file_type=file_type;
	}
	var fn=function(result){ 			
			$("#listBox ul li:gt(0)").empty();
			$("#picBox ul li:gt(0)").empty();
			var imagelist = result.data;
			var length = imagelist.length;
			if(length == 0){
				return;
			}
			
			var imageItem='';
			var imageItem2='';
			var  v= 0;
			for(var i=0;i<length;i++){
				var image=imagelist[i];
				var newsrc = null;				
				 newsrc=getwebroot()+"taskFile/downLoadFileFormMongoForProducer.do?file="+image.object_id;		
				if(image.tf_id==tf_id){	
					  v = i;
				}
					imageItem =imageItem+
				'<li><img src="'+((newsrc==null)?"":newsrc)+'" /></li>';
				imageItem2 = imageItem2 +
				'<li>'+
				'<a href="javascript:void(0)"><img src="'+((newsrc==null)?"":newsrc)+'" alt="2"/></a>'+
				'<span>图片名称:'+((image.file_name==null)?"":image.file_name)+';图片描述:'+((image.remark==null)?"":image.remark)+'</span>'+
			'</li>';
				
				
			}
			$("#picBox ul").html(imageItem2);
			$("#listBox ul").html(imageItem);
			//加载轮播图效果
			var slider=new lbtSlider($("#picBox"),{
				//是否自动播放
				auto:false,
				//num小图中显示的个数
				index: v,
				num:5,
				time:5000,
				delay:400,
				controller:'#listBox',
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
			};
			asyncAjaxMethod(url,params,true,fn); 
}