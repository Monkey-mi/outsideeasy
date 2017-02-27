var pageSize = 5;//每页个数	
var currentPage=0;//当前页码
var taskid = getParamFromWindowName("task_id");
var length_add=0;
//质检的方式
var qc_type="";
$(function(){
	var url="externalTask/getProductTaskByID.do";
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
		$("#outsourceTaskStaticBar").taskStaticBar_init({type:2});
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
	/*$("#top").load(getwebroot()+"platform/top.html",function(responseTxt,statusTxt,xhr){
	    if(statusTxt=="success")
	      $("#mainNav").children().eq(0).addClass("curr");
	      $("#company").parent().css("display","none");
	  });
	$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");*/
	var isVip=getCookie("isVip");
	if(isVip=="true"){
		$("#top").load(getwebroot()+"vip/platform/vipTop.html",function(responseTxt,statusTxt,xhr){
		    if(statusTxt=="success")
			{
				$("#mainNav").children().eq(0).addClass("curr");
			    $("#company").parent().css("display","none");
			}
		  });
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
	}else{
		$("#top").load(getwebroot()+"platform/top.html",function(responseTxt,statusTxt,xhr){
		    if(statusTxt=="success")
		      $("#mainNav").children().eq(1).addClass("curr");
		      $("#company").parent().css("display","none");
		  });
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	}
}
function go_tasklist()
{
	window.location.href=getwebroot()+"externalTask/producTaskList.htm";
}
function go_taskInfo()
{
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/producTaskInfo/"+taskid+".htm";
}
function go_logistics()
{
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/producLogisticsInfo/"+taskid+".htm";
}
function go_productionInfo(){
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/producProductionInfo/"+taskid+".htm";
}
function go_deliveredInfo(){
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/producDeliveredInfo/"+taskid+".htm";
}
function go_connection(){
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/producConnection/"+taskid+".htm";
}

//Tab控制函数
function tabs(tabId, tabNum){
	//设置点击后的切换样式
	$(tabId + " .tab li").removeClass("curr");
	$(tabId + " .tab li").eq(tabNum).addClass("curr");
	//根据参数决定显示内容
	$(tabId + " .tabcon").hide();
	$(tabId + " .tabcon").eq(tabNum).show();
}
/**展示不合格产品详情
 * showDetail
 * @param e void
 * @author wangjialin
 * 2016-11-15 上午11:36:47
 */
function showDetail(e){
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
 * 查询质检信息列表
* getOrderDetails
* @return void
* @author yukai
* 2016-11-21
 */
function getTaskRandomCheckList(){
	var url = "taskRandomCheck/getTaskRandomCheckListForProduct.do";
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
	var url = "taskRandomCheck/getTaskRandomCheckListForProduct.do";		
	var params={};
    InitDatas(index,false,url,params);
}
/**初始化分页控件
*/
function initPaginations(totalCount){
	$("#randomCheckPagination").pagination(totalCount, {
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
	var evalText=doT.template($("#taskRandomCheckStmpl").text());
	$("#taskRandomChecks").html(evalText(result));
}