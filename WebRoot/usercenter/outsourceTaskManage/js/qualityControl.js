var pageSize = 5;//每页个数	
var currentPage=0;//当前页码
var pageSize1 = 5;//每页个数	
var currentPage1=0;//当前页码
var taskid = getParamFromWindowName("task_id");
var length_add=0;
var end_date = "";//结束的日期
var start_date = "";//起始的日期
var search_text = "";//搜索关键字
//质检的方式
var qc_type="";
$(function(){
	var url="externalTask/getTaskByID.do";
	var params={};
	params.t_id=taskid;
	var fn=function(result){
		var task=result.data;
		qc_type = task.qc_type;//质检的方式
		//任务单名称
		$("#taskname_head").html("任务单:"+task.product_name);
		//任务单流水号
		$("#serialno_head").html(task.serial_no+"/"+task.rwdh+"("+task.ddh+")"+"/"+task.scdh);
		//初始化任务条
		$("#outsourceTaskStaticBar").taskStaticBar_init({type:1});
		$("#outsourceTaskStaticBar").taskStaticBar_showByTask(task);
	};
	asyncAjaxMethod(url,params,true,fn);
	loadCommonPage();
	$(".detailMain").mCustomScrollbar({
		scrollButtons:{enable:true},
		theme:"minimal-dark",
	});
	getTaskRandomCheckList();
});
	//加载公用部分界面，如同步，底部，左侧菜单等
function loadCommonPage(){
	$("#top").load(getwebroot()+"platform/top.html",function(responseTxt,statusTxt,xhr){
	    if(statusTxt=="success")
	      $("#mainNav").children().eq(0).addClass("curr");
	      $("#company").parent().css("display","none");
	  });
	$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
}
function go_tasklist()
{
	window.location.href=getwebroot()+"externalTask/outsourceTaskList.htm";
}
function go_taskInfo()
{
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/outsourceTaskInfo/"+taskid+".htm";
}
function go_logistics()
{
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/outsourceLogisticsInfo/"+taskid+".htm";
}
function go_productionInfo(){
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/outsourceProductionInfo/"+taskid+".htm";
}
function go_deliveredInfo(){
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/outsourceDeliveredInfo/"+taskid+".htm";
}
function go_connection(){
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/outsourceConnection/"+taskid+".htm";
}

//Tab控制函数
function tabs(tabId, tabNum){
	//设置点击后的切换样式
	$(tabId + " .tab li").removeClass("curr");
	$(tabId + " .tab li").eq(tabNum).addClass("curr");
	//根据参数决定显示内容
	$(tabId + " .tabcon").hide();
	$(tabId + " .tabcon").eq(tabNum).show();
	$(".amount_wrap").before($(".detailWrap"));
	$(".detailWrap").hide();
	switch(tabNum){
	case 0:
		getTaskRandomCheckList();
		break;
	case 1:
		initParams();
		getTaskAllCheckList();
		break;
	}
}
/**展示不合格产品详情
 * showDetail
 * @param e void
 * @author wangjialin
 * 2016-11-15 上午11:36:47
 */
function showDetail(e,jldh){
	var url="taskAllCheckUnqudetail/getTaskAllCheckUnqudetailList.do";
	var params={};
	params.jldh = jldh;
	var fn=function(result){
		var bhgsTotal=0;
		addItems1(result.data);
		for(var i=0;i<result.data.length;i++){
			bhgsTotal+=result.data[i].bhgs;
		}
		$("#bhgsTotal").text(bhgsTotal);
		$(".table_wrap").height($(".table_wrap").height()-length_add);
		var obj=$(".detailWrap");
		var table=$(".qualityRecordList").height()+$(".qualityRecordList").offset().top;
		var left=$(e).offset().left;
		var top=$(e).offset().top+20;
		$(e).parent().append(obj);
		if((table-top)<290){
			length_add=290-(table-top);
			var len=$(".table_wrap").height()+length_add;
			$(".table_wrap").height(len);
		}else{
			length_add=0;
		}
		obj.css("left",88);
		obj.show();
		$(".detail").removeClass("detailFocused");
		$(".detail").addClass("detailRegular");
		$(e).removeClass("detailRegular");
		$(e).addClass("detailFocused");
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**关闭不合格产品详情
 * closeDetail void
 * @author wangjialin
 * 2016-11-15 上午11:37:20
 */
function closeDetail(e){
	$(".detailWrap").hide();
	$(".detail").removeClass("detailFocused");
	$(".detail").addClass("detailRegular");
	$(".table_wrap").height($(".table_wrap").height()-length_add);
	length_add=0;
}
/**
* 取到所有参数的值
* orgizaParam
* @return void
* @author yukai
* 2016-8-22
 */
function orgizaParam(){
	end_date = $("#end_time").val();
	start_date = $("#start_time").val();
	search_text = $("#search_text").val().trim();
}
/**
 * 初始化所有的条件
* initParams
* @return void
* @author yukai
* 2016-8-22
 */
function initParams(){
	$("#end_time").val("");
	$("#start_time").val("");
	$("#search_text").val("");
}
/**
 * 查询质检信息列表
* getOrderDetails
* @return void
* @author yukai
* 2016-11-21
 */
function getTaskAllCheckList(){
	orgizaParam();
	var url = "taskAllCheck/getTaskAllCheckList.do";
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
params.t_id = taskid;

/*
 * 其他的参数设置
 */
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
	var jyslTotla=0;
	var hgslTotla=0;
	if(pageIndex==0 && needinit){
			//第一次加载时加载分页控件
		initPaginations(result.total);
	}
		//显示数据到表格
		addItems(result.data);	
		for(var i=0;i<result.data.length;i++){
			if(result.data[i].source_type==0){
				jyslTotla+=result.data[i].jysl;
			}
			hgslTotla+=result.data[i].hgsl;
		}
		$("#jyslTotal").text(jyslTotla);
		$("#hgslTotal").text(hgslTotla);
		$("#bhgslTotal").text(jyslTotla-hgslTotla);
	};
asyncAjaxMethod(url,params,true,fn);
	
}
/**供应商信息的翻页调用  
*/
function pageselectCallbacks(index,jq)
{
	orgizaParam();
	var url = "taskAllCheck/getTaskAllCheckList.do";		
	var params={};
    InitDatas(index,false,url,params);
}
/**初始化分页控件
*/
function initPaginations(totalCount){
	$("#allCheckPagination").pagination(totalCount, {
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
* 2016-11-21
 */
function addItems(result){
	var evalText=doT.template($("#taskAllCheckStmpl").text());
	$("#taskAllChecks").html(evalText(result));
}

/**
 * 字符串的拼接 doT模板
* addItems1
* @param result
* @return void
* @author yukai
* 2016-11-21
 */
function addItems1(result){
	var evalText=doT.template($("#taskAllCheckUnqudetailStmpl").text());
	$("#taskAllCheckUnqudetails").html(evalText(result));
}


/**
 * 查询质检信息列表
* getOrderDetails
* @return void
* @author yukai
* 2016-11-21
 */
function getTaskRandomCheckList(){
	var url = "taskRandomCheck/getTaskRandomCheckList.do";
	var params={};	
	InitDatas1(0,true,url,params);		
}

/**
分页获取数据
pageIndex：当前页索引
needinit：是否为第一次加载
*/
function InitDatas1(pageIndex,needinit,url,param)
{
currentPage1=pageIndex;
var url=url;
var params={};
params.t_id = taskid;

params.usePaging=true;
params.page=pageIndex;
params.limit=pageSize1;
params.start=parseInt(pageIndex)*pageSize1;

var fn=function(result){
	if(pageIndex==0 && needinit){
			//第一次加载时加载分页控件
		initPaginations1(result.total);
	}
		//显示数据到表格
		addItems2(result.data);	
	};
asyncAjaxMethod(url,params,true,fn);
	
}
/**供应商信息的翻页调用  
*/
function pageselectCallbacks1(index,jq)
{
	var url = "taskRandomCheck/getTaskRandomCheckList.do";		
	var params={};
    InitDatas1(index,false,url,params);
}
/**初始化分页控件
*/
function initPaginations1(totalCount){
	$("#randomCheckPagination").pagination(totalCount, {
         callback: pageselectCallbacks1,
         prev_text: "<",
         next_text: ">",
         items_per_page: pageSize1, //每页的数据个数
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
* 2016-11-21
 */
function addItems2(result){
	var evalText=doT.template($("#taskRandomCheckStmpl").text());
	$("#taskRandomChecks").html(evalText(result));
}