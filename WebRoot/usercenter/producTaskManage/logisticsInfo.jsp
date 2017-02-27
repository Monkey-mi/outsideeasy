<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>生产任务单发料信息</title>
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
<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/taskStaticBar.js"></script>
<script type="text/javascript" src="/usercenter/producTaskManage/js/logisticsInfo.js"></script>
<script type="text/javascript">	
	$(function(){
		loadCommonPage();
		$(".midd_wrap").css({minHeight:$(window).height()-240});
		
		window.onresize=function(){
			$(".midd_wrap").css({minHeight:$(window).height()-240});
			
		};
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
	});
	//加载公用部分界面，如同步，底部，左侧菜单等
	function loadCommonPage(){
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
	
</script>
</head>

<body class="bg_grey">
<div class="mask_opacity"></div>
<div id="top"></div>

<!--中间-->
<div class="midd_wrap p10 pb30 bg_white">
	<div class="breadcrumb_wrap">
		当前位置：<a href="/supplierForPlateForm/registerInfo.htm">企业中心</a><span  class="p5">&gt;</span>
			<a href="/saleCenterCtrl/saleCenter.htm">销售</a><span  class="p5">&gt;</span>
		<a href="javascript:void(0)" onclick="go_tasklist()">生产任务单列表</a><span class="p5">&gt;</span><span id="taskname_head"></span>
	</div>
	<hr class="hr_dashed_grey" />
	<!--生产任务单状态进度条-->
	<div id="producTaskStaticBar"></div>
	<div class="task_nav_wrap mt20">
		<span class="l_wrap">生产任务单</span><span  class="p5">&gt;</span><span id="serialno_head"></span>
		<ul class="r_wrap">
			<li><a href="javascript:void(0)" onclick="go_taskInfo()">任务单详情</a></li>
			<li><a href="javascript:void(0)" class="curr">来料信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_productionInfo()">生产信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_deliveredInfo()">送货信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_qualityControl()">质检信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_connection()">交流合作</a></li>
		</ul>
	</div>
<!-- 	<div class="logistics_form_wrap"  id="pro_logistics_form_list">
		<p class="title">成品发货</p>
		<div class="comm_inner_line_wrap clearfix">
			<div class="label_wrap">司机</div>
			<input type="text" class="input_wrap"  id="driver"  size="50" />
			<div class="label_wrap">批次编号</div>
			<input  type="text" class="input_wrap" id="send_id"  size="50" />
			<div class="info_explain_wrap"></div>
		</div>
		<div class="comm_inner_line_wrap clearfix">
			<div class="label_wrap">车牌号</div>
			<input  type="text" class="input_wrap"  id="licence_plate" size="50" />
			<div class="label_wrap">发货数量</div>
			<input type="text" class="input_wrap" id="send_count" size="50" />
			<div class="info_explain_wrap"></div>
		</div>
		<div class="comm_inner_line_wrap clearfix">
			<div class="label_wrap">手机号码</div>
			<input type="text" class="input_wrap" id="phone_number"  size="50" />
			<div class="label_wrap">发货日期</div>
			<input type="text" onClick="WdatePicker({readOnly:true})" id="start_date" class="Wdate input_wrap" size="50" />
			<div class="info_explain_wrap"></div>
		</div>
		<div class="comm_inner_line_wrap clearfix">
			<div class="label_wrap">备注</div>
			<textarea id="remark"></textarea>
		</div>
		<div class="comm_inner_line_wrap clearfix" id ="comm_img_wrap">		
		</div>
		<div id="add_submit_wrap" class="add_submit_wrap"></div>
	</div>
	<hr class="hr_dashed_grey" /> -->
	<div style="width:100%;text-align:right;" class="clearfix">
		<div class="search_wrap clearfix mt20" >
			<div  class="f_r">
				<input  type="text" id="pro_search"  class="recordNum ml8" placeholder="请输入司机、车牌、发料单号关键字搜索" style="width:340px;margin-top:-3px;" />
				<button id="buttonsea" class="search_btn" onClick="searchlogistics()" >搜索</button>
			</div>
			<div class="f_r">
				<span class=" ml20 mr8">发料日期</span>
				<input id="pro_logistics_start_time" type="text" class="date Wdate" onClick="WdatePicker({maxDate:'#F{$dp.$D(\'pro_logistics_end_time\')}',readOnly:true})" size="20" />
				<span class=" ml8 mr8">—</span>
				<input id="pro_logistics_end_time" type="text" class="date Wdate" onClick="WdatePicker({minDate:'#F{$dp.$D(\'pro_logistics_start_time\')}',readOnly:true})" size="20" />
			</div>
			<div class="posR f_r ml10" >
				<div class="wrap1"  id="logistics_state" onclick="showSelect(this)">所有类型<img src="/newresources/images/switchover.png" class="f_r mr4 mt4"></div>
				<ul class="posA selectWrap">
					<li>所有类型</li>
					<li>未接收</li>
					<li>已接收</li>
				</ul>
			</div>
		</div>
	</div>
	<table class="logisticsList mt20" id="pro_logistics_table_list">
			<tr id ="pro_logistics_info_list">
			   
				<th width="210px">发料日期</th>
				<th width="20px"></th>
				<th width="auto">物流信息</th>
				<th width="160px"></th>
			</tr>
			
		</table>
			<div id="pro_pagination" class="quotes"></div>
</div>
<div class="mask"></div>
<div id="pop_layer_wrap" class="pop_layer_wrap">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		<a class="close_btn" href="javascript:void(0)" onClick="close_logic_div()" title="关闭窗口">X</a>
	</div>
	<div class="t_algin_c mt30 mb20"><label id="connent_info"></label></div>
	<div class="t_algin_c">
		<button class="button_OK  mr10" onClick="logisticsReceive()" >确定</button>
		<button class="button_NO" onClick="close_logic_div()" >取消</button>
	</div>
</div>
<div id="img_bigshow_block" class="img_bigshow_block">
	<div class="content_img_wrap"><img src="" /></div>
</div>
<!--底端-->
<div id="bottom"></div>
</body>
</html>
