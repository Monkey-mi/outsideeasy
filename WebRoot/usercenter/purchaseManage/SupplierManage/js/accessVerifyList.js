var pageSize = 5;//每页个数	
var currentPage=0;//当前页码
var companyId = getParamFromWindowName("companyIdForAll");
var verify_type = "";//日期的类型
var end_date = "";//结束的日期
var start_date = "";//起始的日期
var search_text = "";//搜索关键字
var access_status=2;
/* 页面加载事件
 * create_by yangliping 2016-7-7 15:09:38
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
		$(".tab .curr").prev().find(".split").hide();
		initParams();
		var tabId=getParamFromWindowName("tabId");
		var tabNum=getParamFromWindowName("tabNum");
		if(tabId==undefined){
			tabId="#accessVerify";
		}
		if(tabNum==undefined){
			tabNum=1;
			}
		currtab(tabId, tabNum);
});
/*
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * create_by yangliping 2016-7-7 15:09:46
 */
function loadCommonPage(){
	$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success")
			{
				$("#mainNav").children().eq(0).addClass("curr");
				getCompanyList(companyId);
			}
	});
	$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	$(".midd_left_wrap").load(getwebroot()+"usercenter/purchaseManage/purchaseLeftMenu.html",null,function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success")
		{
			$("#evaluation").children().eq(5).children().eq(1).addClass("curr");
			var leftHeight=$(".midd_left_wrap").height();
			if(leftHeight>$(window).height()-200)
			{
				$(".midd_right_wrap").css({minHeight:leftHeight});
			}
		}
	});
}

/**展示下拉框
 * showselect
 * @param e void
 * @author wangjialin
 * 2016-12-9 上午9:41:44
 */
function showselect(e){
	$(e).next().show();
	$(".mask_opacity").css("display","block");
	$(".mask_opacity").click(function(){
		$(e).next().css("display","none");
		$(".mask_opacity").css("display","none");
	});
}
/**选择框的下拉选择
 * selectOption
 * @param e void
 * @author wangjialin
 * 2016-12-9 上午9:41:57
 */
function selectOption(e){
	var item=$(e).text();
	var value=$(e).val();
	verify_type=value;
	item=item+"<img src='/newresources/images/switchover.png' class='f_r mr8 mt5'>";
	$(e).parent().prev().html(item);
	$(e).parent().css("display","none");
	$(".mask_opacity").css("display","none");
}
/**进入审核页面
 * goVerify void
 * @author wangjialin
 * 2016-12-9 上午9:43:14
 */
function goVerify(status,record_id,submit_id,submit_name,h_id,submitTime){
	sessionStorage.setItem("verifyStatus",status);
	sessionStorage.setItem("record_id",record_id);
	sessionStorage.setItem("companyIdForVerify",submit_id);
	sessionStorage.setItem("verify_cpyname",submit_name);
	sessionStorage.setItem("h_id",h_id);
	sessionStorage.setItem("submitTime",submitTime);
	window.location.href=getwebroot()+"supplierManager/accessVerifyInfo/"+record_id+".htm";
}
/**
 * 切换tab事件
 * currtab
 * @param tabId
 * @param tabNum void
 * @author yangliping
 * 2016-6-30 17:32:19
 */
function currtab(tabId, tabNum){
	var param ={tabNum:tabNum};
	addParamsToWindowName(param);
	switch(tabNum){
	case 0:
		access_status=5;//全部
		break;
	case 1:
		access_status=2;//待审核
		break;
	case 2:
		access_status=4;//已退回
		break;
	case 3:
		access_status=3;//已通过
		break;
	}
	//设置点击后的切换样式
	$(tabId + " .tab").children(".curr").removeClass("curr");
	$(tabId + " .tab").children().eq(tabNum).addClass("curr");
	$(tabId + " .tab").children().find("span.split").css("display","inline");
//	$(tabId + " .tab").children().eq(tabNum).prev().find("span.split").css("display","none");
	getAccessRecordListForVerify();
}

/**
* 取到所有参数的值
* orgizaParam
* @return void
* @author yukai
* 2016-12-19
 */
function orgizaParam(){
	end_date = $("#endDate").val();
	start_date = $("#startDate").val();
	search_text = $("#search_text").val().trim();
}
/**
 * 初始化所有的条件
* initParams
* @return void
* @author yukai
* 2016-12-19
 */
function initParams(){
	$("#endDate").val("");
	$("#startDate").val("");
	$("#search_text").val("");
}
/**
 * 查询准入申请审核列表
* getAccessRecordListForVerify
* @return void
* @author yukai
* 2016-12-19
 */
function getAccessRecordListForVerify(){
	orgizaParam();
	var url = "supplierManager/getAccessRecordListForVerify.do";
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
params.companyId = companyId;
params.access_status = access_status;
/*
 * 其他的参数设置
 */
if(verify_type != ""){
	params.verify_type = verify_type;
	}
if(end_date != ""){
 params.end_date = end_date;
}
if(start_date != ""){
 params.start_date = start_date;
}
if(search_text != ""){
 params.search_text = search_text;
	}

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
	orgizaParam();
	var url = "supplierManager/getAccessRecordListForVerify.do";		
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
* 2016-12-19
 */
function addItems(result){
	var evalText=doT.template($("#allAccessRecordStmpl").text());
	$("#allAccessRecords").html(evalText(result));
}