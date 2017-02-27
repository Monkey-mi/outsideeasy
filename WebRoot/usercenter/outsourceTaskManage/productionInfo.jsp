<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>外协任务单生产信息</title>

<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/task.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" />
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/productionInfo.js"></script>
<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/taskStaticBar.js"></script>
<script type="text/javascript">
	var taskid = getParamFromWindowName("task_id");
	$(function(){
		var url="externalTask/getTaskByID.do";
		var params={};
		params.t_id=taskid;
   		var fn=function(result){
   			var task=result.data;		
   			//初始化任务条
			$("#outsourceTaskStaticBar").taskStaticBar_init({type:1});
			$("#outsourceTaskStaticBar").taskStaticBar_showByTask(task);
			//任务单名称
			$("#taskname_head").html("任务单:"+task.product_name);
			//任务单流水号
			$("#serialno_head").html(task.serial_no+"/"+task.rwdh+"("+task.ddh+")"+"/"+task.scdh);
		
   		};
   		asyncAjaxMethod(url,params,true,fn);
		loadCommonPage();
		$(".midd_wrap").css({minHeight:$(window).height()-240});
		
		
		window.onresize=function(){
			$(".midd_wrap").css({minHeight:$(window).height()-240});
			
		};
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
	function go_qualityControl(){
		var param ={"task_id":taskid};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"externalTask/outsourceQualityControl/"+taskid+".htm";
	}
</script>
</head>

<body class="bg_grey">
<div id="top"></div>
<!--中间-->
<div class="midd_wrap p10 pb30 bg_white">
	<div class="breadcrumb_wrap">
		当前位置：<a href="/supplierForPlateForm/registerInfo.htm">企业中心</a><span  class="p5">&gt;</span>
			<a href="/purchaseCenterCtrl/purchaseCenter.htm">采购</a><span  class="p5">&gt;</span>
		<a href="javascript:void(0)" onclick="go_tasklist()">外协任务单列表</a> <span class="p5">&gt;</span><span id="taskname_head"></span>
	</div>
	<hr class="hr_dashed_grey" />
	<!--外协任务单状态进度条-->
	<div id="outsourceTaskStaticBar"></div>
	<div class="task_nav_wrap mt20">
		<span class="l_wrap">外协任务单</span><span  class="p5">&gt;</span><span id="serialno_head"></span>
		<ul class="r_wrap">
			<li><a href="javascript:void(0)" onclick="go_taskInfo()">任务单详情</a></li>
			<li><a href="javascript:void(0)" onclick="go_logistics()">发料信息</a></li>
			<li><a href="javascript:void(0)" class="curr">生产信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_deliveredInfo()">到货信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_qualityControl()">质检信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_connection()">交流合作</a></li>
		</ul>
	</div>
	 <span class="f_l greycolor mt4">目前生产完成总数量<span id="product_qty"  class="redcolor">0</span><span>个</span></span> 
	<div class="production_search_wrap">
		
		<input type="text" class="search_btn" onClick="searchproduction()"  />
		<input type="text" id="search_time" onClick="WdatePicker({maxDate:'%y-%M-%d',readOnly:true})" class="Wdate" />
	</div>
	<table class="tablelist" id="table_product_list">
				<tr id="production_Info_file">
					<th width="15%">日期</th>
					<th width="auto">工段</th>
					<th width="15%">完工数量</th>
					<th width="15%">工作人数(人)</th>
				</tr>
				
			</table>
	<div id="pr_pagination" class="quotes"></div>
</div>
<!--底端-->
<div id="bottom"></div>
</body>
</html>
