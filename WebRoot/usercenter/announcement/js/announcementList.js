var companyId=getParamFromWindowName("companyIdForAll");
var flag;
var pageSize = 5;//每页个数	
var currentPage=0;//当前页码
var search_text = "";//搜索关键字
$(function(){
		loadCommonPage();
		$(".midd_wrap").css({minHeight:$(window).height()-200});
		$(".midd_left").css({minHeight:$(window).height()-200});
		$(".midd_right").css({minHeight:$(window).height()-200});
			
		window.onresize=function(){	
			$(".midd_wrap").css({minHeight:$(window).height()-200});
			$(".midd_left").css({minHeight:$(window).height()-200});
			$(".midd_right").css({minHeight:$(window).height()-200});
			$("#announcements").css({minHeight:$(window).height()-240});
		};	
		$("#search_text").val("");
		getAnnouncementList();
		$("#announcements").css({minHeight:$(window).height()-240});
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
				getCompanyList(companyId);
			}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
	}else{
		$("#top").load(getwebroot()+"platform/topForAnnouncement.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#mainNav").children().eq(0).addClass("curr");
				getCompanyList(companyId);
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	}
	flag=getUrlParam("tag");
	if(flag==1){
		$("#centerPage").text("销售中心");
		$("#centerPage,#lastest").prop("href","/saleCenterCtrl/saleCenter.htm");
	}else{
		$("#centerPage").text("采购中心");
		$("#centerPage,#lastest").prop("href","/purchaseCenterCtrl/purchaseCenter.htm");
	}
}
function goDetail(url,web_id){
	var param ={"webId":web_id};
	addParamsToWindowName(param);
	u=url+'?tag='+flag;
	window.location.href=getwebroot()+u;
}
/**获取url中的参数
 * getUrlParam
 * @param name
 * @returns any
 * @author wangjialin
 * 2016-11-10 下午2:24:16
 */
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
 * 获取公告列表
 * getAnnouncementList void
 * @author yukai
 * 2016-11-9 下午3:53:06
 */
function getAnnouncementList(){
	var url="announcement/getAnnouncementList.do";
	var params={};
	InitDatas(0,true,url,params);	
}
/**
分页获取数据
pageIndex：当前页索引
needinit：是否为第一次加载
*/
function InitDatas(pageIndex,needinit,url,param)
{
currentPage=pageIndex;
var url=url;
var params={};
search_text = $("#search_text").val().trim();
/*
 * 其他的参数设置
 */
if(search_text != ""){
 params.search_text = search_text;
	}
params.content_type=1;
params.usePaging=true;
params.page=pageIndex;
params.limit=pageSize;
params.start=parseInt(pageIndex)*pageSize;

var fn=function(result){
	if(pageIndex==0 && needinit){
			//第一次加载时加载分页控件
		initPaginations(result.total);
	}
		//显示数据到表格
		addItems(result.data);	
	};
asyncAjaxMethod(url,params,true,fn);
	
}
/**供应商信息的翻页调用  
*/
function pageselectCallbacks(index,jq)
{
	var url = "announcement/getAnnouncementList.do";		
	var params={};
    InitDatas(index,false,url,params);
}
/**初始化分页控件
*/
function initPaginations(totalCount){
	$("#paginationcom").pagination(totalCount, {
         callback: pageselectCallbacks,
         prev_text: "<",
         next_text: ">",
         items_per_page: pageSize, //每页的数据个数
         num_display_entries: 3, //两侧首尾分页条目数
         current_page: 0,   //当前页码
         num_edge_entries: 2 //连续分页主体部分分页条目数
     });
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
	var evalText=doT.template($("#announcementStmpl").text());
	$("#announcements").html(evalText(result));
}