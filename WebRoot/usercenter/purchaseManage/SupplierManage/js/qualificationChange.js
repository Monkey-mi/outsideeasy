var urlPara = location.search; //获取参数部分
urlPara=unescape(urlPara);//对参数解密
function getPara(paraName){ 
	 var reg = new RegExp("[&|?]"+paraName+"=([^&$]*)", "gi"); 
	 var a = reg.test(urlPara); 
	 return a ? RegExp.$1 : ""; 
	 } 
//捕获参数并进行操作 
var company_id= getPara("company_id"); //捕获到url参数 
var companyId= getPara("companyId");
var windowNameParam ={"companyIdForAll":companyId};
addParamsToWindowName(windowNameParam);
/* 页面加载事件
 * create_by yangliping 2016-7-7 15:09:38
 * */ 
$(function(){
		loadCommonPage();
		$(".midd_wrap").css({minHeight:$(window).height()-200});
		
		window.onresize=function(){	
			$(".midd_wrap").css({minHeight:$(window).height()-200});
		};
		getQualificationChangeList();
});
/*
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * create_by yangliping 2016-7-7 15:09:46
 */
function loadCommonPage(){
	$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success")
			{
				getCompanyList(companyId);
				$("#mainNav").children().eq(0).addClass("curr");
			}
	});
	$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
}

$(".qualificationRecord").mouseover(function(){
	$(".posAprev,.posAnext").show();
});
$(".qualificationRecord").mouseleave(function(){
	$(".posAprev,.posAnext").hide();
});
$(".posAprev,.posAnext").mouseover(function(){
	$(".posAprev,.posAnext").addClass("focus");
});
$(".posAprev,.posAnext").mouseleave(function(){
	$(".posAprev,.posAnext").removeClass("focus");
});


/**
 * 获取公司基本信息变更记录
* getQualificationChangeList void
* @author yukai
* 2016-8-1 上午10:20:59
 */
function getQualificationChangeList(){
	var url="supplierFiles/getQualificationChangeList.do";
	var params={};
	params.company_id=company_id;
	var fn=function(result){
		var item="";
		for(var i=0;i<result.data.length;i++){
			var str="";
			if(i==0){
				str=" 当前";
			}
			item+='<ul class="formContent f_l">'
			+'<li class="time">'+result.data[i].created_dt.substring(0,result.data[i].created_dt.lastIndexOf(" "))+str+'</li>'
			+'<li>'+result.data[i].cpyname_cn+'</li>'
			+'<li>'+result.data[i].corporation+'</li>'
			+'<li>'+result.data[i].establish_dt.substring(0,result.data[i].establish_dt.lastIndexOf(" "))+'</li>'
			+'<li>'+result.data[i].reg_fund+'万'+result.data[i].currency_name+'</li>'
			+'<li>'+result.data[i].key_remark+'</li>'
			+'<li>'+result.data[i].nature_name+'</li>'
			+'<li>'+result.data[i].industry_name+'</li>'
			+'<li>'+result.data[i].class_name+'</li>'
			+getQualificationChangeAttachedList(result.data[i].auth_history_id)
		+'</ul>';
		}
		$("#formSlide").append(item);
		$("#total_num").text(result.total);
	};
	asyncAjaxMethod(url,params,true,fn);
}

/**
 * 获取公司证照变更记录
* getQualificationChangeAttachedList void
* @author yukai
* 2016-8-1 下午1:55:08
 */
function getQualificationChangeAttachedList(auth_history_id){
	var url = "supplierFiles/getQualificationChangeAttachedList.do";
	var params = {};
	params.auth_history_id = auth_history_id;
	var item='<li class="companyPic">';
	var fn = function(result){
		for(var i=0;i<result.data.length;i++){
				item+='<div class="pic_frame">'
					+'<img src="'+getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[i].object_id+'">'
					+'<div class="picInfo">'+result.data[i].type_name+'</div>'
					+'</div>';
		}
		item+='</li>';
	};
	asyncAjaxMethod(url,params,false,fn);
	return item;
}
/**历史资质变更记录向上翻页，每三条记录为一页
 * recordPrev void
 * @author wangjialin
 * 2016-8-1 下午5:29:37
 */
function recordPrev(){
	var offset1=$(".formRight").offset().left;
	var offset2=$(".formSlide").offset().left;
	var d=offset2-offset1;
	if(d!=0)
	$("#formSlide").animate({left:"+=879px"});
}
/**历史资质变更记录向下翻页，每三条记录为一页
 * recordNext void
 * @author wangjialin
 * 2016-8-2 上午8:51:16
 */
function recordNext(){
	var offset1=$(".formRight").offset().left;
	var offset2=$("#formSlide ul").last().offset().left;
	var d=offset2-offset1;
	if(d!=0 && d!=293 && d!=586)
		$("#formSlide").animate({left:"-=879px"});
}

/**
 * goBackSupplierList void
 * @author mishengliang
 * 2016-9-20 下午7:51:32
 */
function goBackSupplierList(){
	addParamsToWindowName({"qualificationChange":"yes","tabNumChange":getParamFromWindowName("tabNumChange"),"currentPage":getParamFromWindowName("currentPage")});
	window.location.href="/supplierFiles/supplierList.htm";
}