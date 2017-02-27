var companyId=getParamFromWindowName("companyIdForAll");
var flag=getUrlParam("tag");
var url=window.location.href;
var web_id=url.substring(url.lastIndexOf("/")+1,url.lastIndexOf(".htm"));
$(function(){
	loadCommonPage();
	$(".midd_wrap").css({minHeight:$(window).height()-200});
	$(".midd_left_wrap").css({minHeight:$(window).height()-200});
	$(".midd_right_wrap").css({minHeight:$(window).height()-200});
			
	window.onresize=function(){	
		$(".midd_wrap").css({minHeight:$(window).height()-200});
		$(".midd_left").css({minHeight:$(window).height()-200});
		$(".midd_right").css({minHeight:$(window).height()-200});
	};	
	getNewAnnouncementList();
	getAnnouncementById();
});
//加载公用部分界面，如同步，底部，左侧菜单等
function loadCommonPage(){
	var result = isLoginForPlateForm();
	var isVip= getCookie("isVip");
//	if(result.data!=null && result.data.vip == true){
	if(isVip=="true"){
		$("#top").load(getwebroot()+"vip/platform/vipTopAnnouncement.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#mainNav").children().eq(0).addClass("curr");
				if(result.isLogin){
					getCompanyList(companyId);
				}
			}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
	}else{
		$("#top").load(getwebroot()+"platform/topForAnnouncement.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#mainNav").children().eq(0).addClass("curr");
				if(result.isLogin){
					getCompanyList(companyId);
				}
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	}
	if(flag==1){
		$("#centerPage").text("销售中心");
		$("#centerPage").prop("href","/saleCenterCtrl/saleCenter.htm");
	}else{
		$("#centerPage").text("采购中心");
		$("#centerPage").prop("href","/purchaseCenterCtrl/purchaseCenter.htm");
	}
	$("#list").prop("href","/announcement/announcementList.htm?tag="+flag);
}
function getUrlParam(name){  
	  //构造一个含有目标参数的正则表达式对象  
	  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
	  //匹配目标参数  
	  var r = window.location.search.substr(1).match(reg);  
	  //返回参数值  
	  if (r!=null) return unescape(r[2]);  
	  return null;  
}
/**
 * 获取最新公告
 * getNewAnnouncementList void
 * @author yukai
 * 2016-11-10 上午8:53:09
 */
function getNewAnnouncementList(){
	var url="announcement/getNewAnnouncementList.do";
	var params={};
	params.limit=10;
	var fn=function(result){
		addItems(result.data);	
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 字符串的拼接 doT模板
* addItems
* @param result
* @return void
* @author yukai
* 2016-8-22
 */
function addItems(result){
	var evalText=doT.template($("#newAnnouncementStmpl").text());
	$("#newAnnouncements").html(evalText(result));
}

/**
 * 根据ID获取公告
 * getAnnouncementById void
 * @author yukai
 * 2016-11-10 上午8:53:09
 */
function getAnnouncementById(){
	var url="announcement/getAnnouncementById.do";
	var params={};
	params.web_id=web_id;
	var fn=function(result){
		$("#web_title").html(result.data.web_title);
		$("#create_dt").html(result.data.create_dt);
		$("#signed_release").html(result.data.signed_release);
		var contentStr=result.data.content;
		contentStr=contentStr.replace(/<img/g, "<img style='max-width: 764px;'");
		$("#content").html(contentStr);
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 切换公告
 * changeAnnouncement
 * @param webId void
 * @author yukai
 * 2016-11-10 上午9:15:15
 */
function changeAnnouncement(webId){
	u='announcement/announcementDetail/'+webId+'.htm'+'?tag='+flag;
	window.location.href=getwebroot()+u;
}
/**加载显示的公告中图片处理
 * testImg+
 * @param id void
 * @author wangjialin
 * 2016-11-10 上午9:55:05
 */
function testImg(id){
	$("#"+id).find("img").each(function(){
		if($(this).width()>764)
			$(this).css("max-width","764px");
	});
	
}