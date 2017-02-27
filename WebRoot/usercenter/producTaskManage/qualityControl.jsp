<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=8">
		<meta http-equiv="Expires" content="0">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-control" content="no-cache">
		<meta http-equiv="Cache" content="no-cache">
		<title>生产任务单质检信息</title>
		<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/task.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/jquery.ui/jquery-ui.min.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/jquery.ui/jquery-ui-custom.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="/vip/resources/css/jquery.mCustomScrollbar.css" />
		<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="bg_grey">
		<!--顶部 -->
		<div id="top"></div>
		<!--中间-->
		<div class="midd_wrap p10 pb30 bg_white clearfix" style="min-height:720px;padding-bottom:60px;">
			<!--导航开始  -->
			<div class="breadcrumb_wrap">
					当前位置：<a href="/usercenter/accountManage/registerInfo.html">企业中心</a><span  class="p5">&gt;</span>
					<a href="/usercenter/purchaseManage/purchaseCenter.html">销售</a><span  class="p5">&gt;</span>
				<a href="javascript:void(0)" onclick="go_tasklist()">生产任务单列表</a><span class="p5">&gt;</span><span id="taskname_head"></span>
			</div>
			<hr class="hr_dashed_grey" />
			<!--外协任务单状态进度条-->
			<div id="outsourceTaskStaticBar"></div>
			<div class="task_nav_wrap mt20 ">
				<span class="l_wrap">生产任务单</span><span  class="p5">&gt;</span><span id="serialno_head"></span>
				<ul class="r_wrap">
					<li><a href="javascript:void(0)" onclick="go_taskInfo()">任务单详情</a></li>
					<li><a href="javascript:void(0)" onclick="go_logistics()">来料信息</a></li>
					<li><a href="javascript:void(0)" onclick="go_productionInfo()">生产信息</a></li>
					<li><a href="javascript:void(0)" onclick="go_deliveredInfo()">送货信息</a></li>
					<li><a href="javascript:void(0)" class="curr">质检信息</a></li>
					<li><a href="javascript:void(0)" onclick="go_connection()">交流合作</a></li>
				</ul>
			</div>
			<!--质检信息开始  -->
			<div id="qualityCotrolCon" class="qualityCotrolCon mt20">
				<ul class="tab clearfix">
					<li onClick="tabs('#qualityCotrolCon',0)" class="curr">抽检记录</li>
				</ul>
				<!--抽检记录  -->
				<div class="tabcon radomCheckCon" style="display:block;">
					<table id="taskRandomChecks"  class="ramdomCheckList">
						<!-- <tr>
							<th style="width:120px;"></th>
							<th class="con1">抽检日期</th>
							<th style="width:157px;"></th>
							<th class="con2">抽检报告</th>
						</tr>
						<tr>
							<td></td>
							<td>2016-10-01</td>
							<td></td>
							<td class="aLink"><a>抽检报告名称抽检报告名称每页10条记录抽检报告名称抽检报告名称每页10条记录每页10条记录.doc</a></td>
						</tr>
						<tr>
							<td></td>
							<td>2016-10-01</td>
							<td></td>
							<td class="aLink"><a>抽检报告名称抽检报告名称.doc</a></td>
						</tr> -->
					</table>
					<div id="randomCheckPagination" class="quotes clearfix"></div>
				</div>
		</div>
		</div>
		<!--底部  -->
		<div id="bottom"></div>
		<%@ include file="/newresources/js/base.jsp" %>
		<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="/usercenter/producTaskManage/js/qualityControl.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
		<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/taskStaticBar.js"></script>
			<script type="text/javascript" src="/vip/resources/js/jquery.mCustomScrollbar.concat.min.js" ></script>
			
		<script id="taskRandomCheckStmpl" type="text/x-dot-template">
		 <tr>
			<th style="width:120px;"></th>
			<th class="con1">抽检日期</th>
			<th style="width:157px;"></th>
			<th class="con2">抽检报告</th>
		 </tr>
         {{for(var prop in it){}}
			<tr>
				<td></td>
				<td>{{= replaceNullAsStr(it[prop].check_dt).substr(0,10)}}</td>
				<td></td>
				{{? it[prop].is_delete==0}}
				<td class="aLink"><a href="{{=getwebroot()}}PfTaskFileCtrl/downLoadFileFormMongo.do?fileId={{= replaceNullAsStr(it[prop].mongodb_id)}}">{{= replaceNullAsStr(it[prop].file_name)}}{{= replaceNullAsStr(it[prop].suffix_name)}}</a></td>
				{{??}}
				<td class="abandon">{{= replaceNullAsStr(it[prop].file_name)}}{{= replaceNullAsStr(it[prop].suffix_name)}}</td>
				{{?}}
			</tr>
         {{}}}
		</script>
	</body>
</html>
