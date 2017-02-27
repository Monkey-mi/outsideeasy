
 var urlPara = location.search; //获取参数部分
 urlPara=unescape(urlPara);//对参数解密
 function getPara(paraName){ 
	 var reg = new RegExp("[&|?]"+paraName+"=([^&$]*)", "gi"); 
	 var a = reg.test(urlPara); 
	 return a ? RegExp.$1 : ""; 
	 } 
//捕获参数并进行操作 
 var companyId= getPara("companyId"); //捕获到url参数 公司ID
 var id = getPara("tf_id");//这条数据的id
 var file_type=getPara("file_type");//图片类型值
//加载页面加载该方法
$(function(){
		fileLoadListView();
});

/**
 * 加载公司的图片信息
 */
function fileLoadListView(){
	var url = 'PfTaskFileCtrl/pfgetRegisterAttchedList.do';
	var params={};
	params.companyId=companyId;
	if(parseInt(file_type)>=18 && parseInt(file_type)<=21){		
		params.fileTypeId=21;//定义的固定值
	}else if(parseInt(file_type)>=24 && parseInt(file_type)<=28){
		params.fileTypeId=27;//定义的固定值
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
			var topName ="";
			var count = 0 ;//计数器，用于V只能赋值一次
			for(var i=0;i<length;i++){
				var image=imagelist[i];				
				var newsrc = null;	
				if(file_type==28){
					file_type=18;
				}
				newsrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+image.mogodb_id;		
				if((image.id==id||image.file_type_id==file_type)&&count==0){			
				 v = i;
				 count = count+1;//计数器，用于i只能赋值一次
				}
				if((image.id==id)){			
				 v = i;
				}
				topName = ShowTypeFile(image.file_type_id);
				imageItem =imageItem+
				'<li><img src="'+((newsrc==null)?"":newsrc)+'" /></li>';
				imageItem2 = imageItem2 +
				'<li>'+	
			    '<span style="top:0">'+topName+'</span>'+
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
/**
 * 返回相应图片类名
 * @param {} file_type_id
 */
var typeNUM1 = 0;//厂容厂貌
var typeNUM3 = 0;//专利
var typeNUM4 = 0;//企业其他资源图片
function ShowTypeFile(file_type_id){
	console.log(file_type_id);
	var topname = "";
	var typeName ="";
	switch(parseInt(file_type_id)){
		case 18:
		typeName = "营业执照";
		topname ="";		
		break;
		case 19:
		typeName = "税务登记证";
		topname ="";
		break;
		case 20:
		typeName = "组织机构代码证";
		topname ="";
		break;
		case 21:
		typeName = "纳税人资格证书";
		topname ="";
		break;
		case 24:
		typeName = "厂容厂貌";
		typeNUM1 = typeNUM1 + 1;
		topname = '('+typeNUM1+')';
		break;
		case 25:
		typeName = "管理体系认证";
		break;
		case 26:
		typeName = "专利";
		typeNUM3 = typeNUM3 + 1;
		topname = '('+typeNUM3+')';
		break;
		case 27:
		typeName = "企业其他资源图片";
		typeNUM4 = typeNUM4 + 1;
		topname = '('+typeNUM4+')';
		break;
		default :
		break;
			}
		return typeName+topname;

}