<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>生产任务单生产信息</title>

<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/task.css" rel="stylesheet" type="text/css" />
<!-- <link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" /> -->
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/taskStaticBar.js"></script>
<script type="text/javascript" src="/usercenter/producTaskManage/js/productionInfo.js"></script>

<script type="text/javascript">
	function doDel(obj)
	{
		window.wxc.xcConfirm("您确认要删除该记录吗？", window.wxc.xcConfirm.typeEnum.info,
			{
			onOk:function(){
				del_section_row_pr(obj);
				},
			onCancel:function(){
				}
			});
	}
</script>
</head>

<body class="bg_grey">
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
			<li><a href="javascript:void(0)" onclick="go_logistics()">来料信息</a></li>
			<li><a href="javascript:void(0)" class="curr">生产信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_deliveredInfo()">送货信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_qualityControl()">质检信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_connection()">交流合作</a></li>
		</ul>
	</div>
	<div class="clearfix">
	<div class="production_left_wrap" id="production_time_list">
		<div class="left_title">
			<a class="prev" onClick="ltProduct_time()">&lt;</a>
			 <label id="pro_time_mouth"></label>
			<a class="next" onClick="gtProduct_time()">&gt;</a>
		</div>
		<div class="prod_content_wrap">
			<p class="emptytext">本月无生产记录</p>
			<ul class="prod_ul_wrap clearfix" id="product_mouth_list">
			</ul>
		</div>
	</div>
	<div class="production_right_wrap">
		<div class="production_search_wrap">
			<span class="title_span_l" style="width:538px;">产量录入 <span class="greycolor">目前生产完成<span id="product_qty" class="redcolor">0</span>个,总数量<span><span id="product_rwsl" class="redcolor">0</span>个</span></span></span>
			
			<input type="text" onClick="Outputproduction()" class="search_btn" />
			<input type="text" onClick="WdatePicker({maxDate:'%y-%M-%d',readOnly:true})" id="searchTime" class="Wdate" />
			
		</div>
		
		<table class="tablelist" id="pro_section_list">
				<tr>
					<th width="33%">工段名称</th>
					<th width="33%">完工数量</th>
					<th width="auto">工作人数(人)</th>
					<th width="1%"></th>
					<th width="1%"></th>
				</tr>
				
			</table>
		<div class="mt10 t_algin_r" id="productButton">
			
		</div>
	</div>
	</div>
</div>

<!--底端-->
<div id="bottom"></div>
</body>
</html>
