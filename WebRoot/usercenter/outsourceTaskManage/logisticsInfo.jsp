<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>外协任务单发料信息</title>
<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/top.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/task.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" />
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/logisticsInfo.js"></script>
<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/taskStaticBar.js"></script>
<script type="text/javascript">
var state = "";
	$(function(){
		var url="externalTask/getTaskByID.do";
		var params={};
		params.t_id=taskid;
   		var fn=function(result){
   			var task=result.data;
   			state =task.state;
   		    stateLoisgisticsInfo(task.state);
   		    searchlogistics(task.state);
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
		$(".midd_wrap").css({minHeight:$(window).height()-240});
		var myDate = new Date();
		var year = myDate.getFullYear();
		var month = myDate.getMonth()+1;
		var day=myDate.getDate();
		if (month<10){
			month = "0"+month;
		}
		if (day<10){
			day = "0"+day;
		}
		var today=year+"-"+month+"-"+day;
		$("#start_date").val(today);
		window.onresize=function(){
			$(".midd_wrap").css({minHeight:$(window).height()-240});
			
		};
	$(".input_wrap").on("focus",function(){
			var id=$(this).attr("id");
			var info_str="";
			if(id=="arrived_no")
			{
				info_str="请输入数字";
			}
			else if(id=="receive_no")
			{
				info_str="请输入数字";
			}
			if(info_str!="")
			{
				$(this).nextAll(".info_explain_wrap").fadeIn("fast");
				var html_str="<div class='info_explain'><img class='info_explain_icon' src='/newresources/images/new/ts1.png' /><span class='info_explain_tip' style='width:100px;'>"+info_str+"</span></div>";
				$(this).nextAll(".info_explain_wrap").html(html_str);
			}
		});				
		$(".input_wrap").on("blur",function(){
			var id=$(this).attr("id");
			var error_str="";		
			if(id=="start_date"){	
					
			}else{		  
			error_str = informationvo(this,"");
			}
			
			if(error_str!="")
			{			  
				$(this).nextAll(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
				$(this).nextAll(".info_explain_wrap").fadeIn("fast");
			}
			else
			{ 	
				if(id!="start_date")
				{		
					$(this).nextAll(".info_explain_wrap").fadeOut("fast");
				}
			}
			
		});
	
	
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
	function go_qualityControl(){
		var param ={"task_id":taskid};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"externalTask/outsourceQualityControl/"+taskid+".htm";
	}
</script>
</head>

<body class="bg_grey">
<div class="mask_opacity"></div>
<div id="top"></div>
<!--中间-->
<div class="midd_wrap p10 pb30 bg_white">
	<div class="breadcrumb_wrap">
			当前位置：<a href="/supplierForPlateForm/registerInfo.htm">企业中心</a><span  class="p5">&gt;</span>
			<a href="/purchaseCenterCtrl/purchaseCenter.htm">采购</a><span  class="p5">&gt;</span>
		<a href="javascript:void(0)" onclick="go_tasklist()">外协任务单列表</a><span class="p5">&gt;</span><span id="taskname_head"></span>
	</div>
	<hr class="hr_dashed_grey" />
	<!--外协任务单状态进度条-->
	<div id="outsourceTaskStaticBar"></div>
	<div class="task_nav_wrap mt20">
		<span class="l_wrap">外协任务单</span><span  class="p5">&gt;</span><span id="serialno_head"></span>
		<ul class="r_wrap">
			<li><a href="javascript:void(0)" onclick="go_taskInfo()">任务单详情</a></li>
			<li><a href="javascript:void(0)" class="curr">发料信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_productionInfo()">生产信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_deliveredInfo()">到货信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_qualityControl()">质检信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_connection()">交流合作</a></li>
		</ul>
	</div>
	<div class="logistics_form_wrap" id="logistics_form_list">
		<p class="title" style="font-weight:bold">发料信息</p>
		<div class="comm_inner_line_wrap clearfix">
			<div class="label_wrap" style="margin-left:0px;">司机</div>
			<input  type="text" class="input_wrap" id="driver" size="50" />
			<div class="label_wrap">发料日期</div>
			<input  type="text" onClick="WdatePicker({readOnly:true})" id="start_date" class="Wdate input_wrap" size="50" />
			<div class="info_explain_wrap"></div>
		</div>
		<div class="comm_inner_line_wrap clearfix">
			<div class="label_wrap" style="margin-left:0px;" >车牌号</div>
			<input type="text" class="input_wrap" id="licence_plate" size="50" />
			<div class="label_wrap">发料单号</div>
			<input type="text" class="input_wrap" id="send_id" size="50" />
			<div class="info_explain_wrap"></div>
		</div>
		<div class="comm_inner_line_wrap clearfix">
			<div class="label_wrap" style="margin-left:0px;" >手机号码</div>
			<input type="text" class="input_wrap" id="phone_number"  size="50" />
			<div class="info_explain_wrap"></div>
		</div>
		<div class="comm_inner_line_wrap clearfix">
			<div class="label_wrap" style="margin-left:0px;">备注</div>	
			<textarea id="remark"></textarea>		
		</div>
		<div class="selectPicWrap posR" id="comm_img_wrap">
			<!-- <button class="selectPic">选择图片</button>
			<input type="file" class="posA upload"/> -->
		</div>
		<div id="add_submit_wrap"></div>
	</div>
	<hr class="hr_dashed_grey" />
	<div style="width:100%;text-align:right;" >
		<div class="search_wrap clearfix mt20">
			<!-- <select style="width:73px;" id="logistics_come" onChange="load_logistic_state()">
				<option value="0" >全部</option>
				<option value="1">来货</option>
				<option value="2">发料</option>
			</select> -->
<!-- 			<select class="ml8" id="logistics_state"> -->
<!-- 				<option value="0" >所有类型</option> -->
<!-- 				<option value='2'>未接收</option> -->
<!-- 				<option value='1'>已接收</option> -->
<!-- 			</select>  -->
			<div  class="f_r">
				<input  type="text" id="search"  class="recordNum ml8" placeholder="请输入司机、车牌、发料单号关键字搜索" style="width:340px;margin-top:-3px;" />
				<button id="buttonsea" class="search_btn" onClick="searchlogistics()" >搜索</button>
			</div>
			<div class="f_r">
				<span class=" ml20 mr8">发料日期</span>
				<input id="logistics_start_time" type="text" class="date Wdate" onClick="WdatePicker({maxDate:'#F{$dp.$D(\'logistics_end_time\')}',readOnly:true})" size="20" />
				<span class=" ml8 mr8">—</span>
				<input id="logistics_end_time" type="text" class="date Wdate" onClick="WdatePicker({minDate:'#F{$dp.$D(\'logistics_start_time\')}',readOnly:true})" size="20" />
			</div>
			<div class="posR f_r ml10" >
				<div class="wrap1"  id="logistics_state" onclick="showSelect(this)">所有类型<img src="/newresources/images/switchover.png" class="f_r mr4 mt4"></div>
				<ul class="posA selectWrap">
					<li>所有类型</li>
					<li>未接收</li>
					<li>已接收</li>
				</ul>
			</div>
			
<!-- 			<div class="posR f_r"> -->
<!-- 				<div class="wrap1" onclick="showSelect(this)">今天<img src="/newresources/images/switchover.png" class="f_r mr4 mt4"></div> -->
<!-- 				<ul class="posA selectWrap"> -->
<!-- 					<li>今天</li> -->
<!-- 					<li>三天内</li> -->
<!-- 					<li>一周内</li> -->
<!-- 				</ul> -->
<!-- 			</div> -->
		</div>
	</div>
	<table class="logisticsList mt20" id="logistics_table_list">
		<tr id ="logistics_info_list" >
			<th style="width:210px;">发料日期</th>
			<th style="width:20px;"></th>
			<th style="width:auto;">物流信息</th>
			<th style="width:160px;"></th>
		</tr>
	</table>
	<div id="pagination" class="quotes"></div>
	
</div>
<div class="mask"></div>
<div id="pop_layer_wrap" class="pop_layer_wrap">
	
	<div class="title_wrap">确认收货
		<a class="close_btn" href="javascript:void(0)" onClick="close_logic_div()" title="关闭窗口">X</a>
	</div>
	<div class="inner_line_wrap ml40 mt20">
		<div class="label_wrap">应到货</div>
		<label id="label_logistics_infos"></label>
	</div>
	<div class="inner_line_wrap ml40">
		<div class="label_wrap">实际到货</div>				
		<input id="arrived_no" class="input_wrap" type="text" size="20" />
		<div class="info_explain_wrap">
			<div class="info_explain">
				<img class="info_explain_icon" src="/newresources/images/new/ts1.png" />
				<span class="info_explain_tip" style="width:100px;">请输入数字</span>
			</div>
		</div>
	</div>
	<div class="inner_line_wrap ml40" id="qc_type_receive">
		<div class="label_wrap">确认合格收货</div>
		<input id="receive_no" class="input_wrap" type="text" size="20" />
		<div class="info_explain_wrap">
			<div class="info_explain">
				<img src="/newresources/images/new/er.png" />
				<span class="redcolor">请输入数字</span>
			</div>
		</div>
	</div>
	<div class="inner_line_wrap mt20 mb30 ml40">
		<div class="label_wrap"></div>
		<button class="button_save" onClick="logisticsReceive()">确认收货</button>
		<button class="button_cancel mr20" onClick="close_logic_div()" >取消</button>
	</div>
	
</div>
<div id="img_bigshow_block" class="img_bigshow_block">
	<div class="content_img_wrap"><img src="" /></div>
</div>
<!--底端-->
<div id="bottom"></div>
</body>
</html>
