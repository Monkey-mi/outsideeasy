var companyId = getParamFromWindowName("companyIdForAll");
var pageSize = 5;//每页个数	
var currentPage=0;//当前页码
/*
 * 页面加载事件
 * create_by yangliping 2016-6-30 17:32:19
 * */ 
$(function(){
		loadCommonPage();
		$(".midd_wrap").css({minHeight:$(window).height()-200});
		$(".midd_left_wrap").css({minHeight:$(window).height()-200});
		$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		
		window.onresize=function(){	
			$(".midd_wrap").css({minHeight:$(window).height()-200});
			$(".midd_left_wrap").css({minHeight:$(window).height()-200});
			$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		};
		$("#search_text").val("");
});
/*
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * create_by yangliping 2016-6-30 17:32:19
 */
function loadCommonPage(){
	$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success")
			{
				getCompanyList(companyId);
				$("#mainNav").children().eq(0).addClass("curr");
				companyId = $("#company").val();
				getDeliveryRegisterList();
			}
	});
	$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	var result=isLoginForPlateForm();
	if(result.isLogin==true){
		$(".midd_left_wrap").load(getwebroot()+"usercenter/purchaseManage/purchaseLeftMenu.html",function(){
			$("#evaluation").children().eq(3).children().eq(1).addClass("curr");
		});
	}
}

/**
 * 查询送货记录列表
* getDeliveryRegisterList
* @return void
* @author yukai
* 2016-8-24
 */
function getDeliveryRegisterList(){
	var url = "deliveryRegister/getDeliveryRegisterList.do";
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
params.receive_company_id = companyId;
var search_text=$("#search_text").val();
if(search_text != ""){
	 params.search_text = search_text;
}

params.usePaging=true;
params.page=pageIndex;
params.limit=pageSize;
params.start=parseInt(pageIndex)*pageSize;

var fn=function(result){
	//if(pageIndex==0 && needinit){
	if(needinit){
			//第一次加载时加载分页控件
		initPaginations(result.total,pageIndex);
	}
		//显示数据到表格
		addDeliveryRegisterItems(result.data);	
		$("#total_count").html(result.total);
	};
asyncAjaxMethod(url,params,true,fn);
	
}
/**供应商信息的翻页调用  
*/
function pageselectCallbacks(index,jq)
{
	var url = "deliveryRegister/getDeliveryRegisterList.do";		
	var params={};
    InitDatas(index,true,url,params);
}
/**初始化分页控件
*/
function initPaginations(totalCount,pageIndex){
	$("#paginationcom").pagination(totalCount, {
         callback: pageselectCallbacks,
         prev_text: "<",
         next_text: ">",
         items_per_page: pageSize, //每页的数据个数
         num_display_entries: 3, //两侧首尾分页条目数
         current_page: pageIndex,   //当前页码
         num_edge_entries: 2 //连续分页主体部分分页条目数
     });
}
/**
 * 字符串的拼接 doT模板
* addDeliveryRegisterItems
* @param result
* @return void
* @author yukai
* 2016-8-24
 */
function addDeliveryRegisterItems(result){
	var evalText=doT.template($("#allDeliveryRegisterStmpl").text());
	$("#allDeliveryRegisters").html(evalText(result));
}
/**
 * 下载文档
 * downLoadFile
 * @param obj void
 * @author yukai
 * 2016-8-24 下午6:19:17
 */
function downLoadFile(obj){
	window.open(getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+$(obj).children().val());
}