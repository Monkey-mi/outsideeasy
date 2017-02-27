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
		<title>外协任务单质检信息</title>
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
		<div class="midd_wrap p10 pb30 bg_white clearfix" style="min-height:828px;padding-bottom:60px;">
			<!--导航开始  -->
			<div class="breadcrumb_wrap">
					当前位置：<a href="/usercenter/accountManage/registerInfo.html">企业中心</a><span  class="p5">&gt;</span>
					<a href="/usercenter/purchaseManage/purchaseCenter.html">采购</a><span  class="p5">&gt;</span>
				<a href="javascript:void(0)" onclick="go_tasklist()">外协任务单列表</a><span class="p5">&gt;</span><span id="taskname_head"></span>
			</div>
			<hr class="hr_dashed_grey" />
			<!--外协任务单状态进度条-->
			<div id="outsourceTaskStaticBar"></div>
			<div class="task_nav_wrap mt20 ">
				<span class="l_wrap">外协任务单</span><span  class="p5">&gt;</span><span id="serialno_head"></span>
				<ul class="r_wrap">
					<li><a href="javascript:void(0)" onclick="go_taskInfo()">任务单详情</a></li>
					<li><a href="javascript:void(0)" onclick="go_logistics()">发料信息</a></li>
					<li><a href="javascript:void(0)" onclick="go_productionInfo()">生产信息</a></li>
					<li><a href="javascript:void(0)" onclick="go_deliveredInfo()">到货信息</a></li>
					<li><a href="javascript:void(0)" class="curr">质检信息</a></li>
					<li><a href="javascript:void(0)" onclick="go_connection()">交流合作</a></li>
				</ul>
			</div>
			<!--质检信息开始  -->
			<div id="qualityCotrolCon" class="qualityCotrolCon mt20">
				<ul class="tab clearfix">
					<li onClick="tabs('#qualityCotrolCon',0)" class="curr">抽检记录</li>
					<li onClick="tabs('#qualityCotrolCon',1)">生产质量记录</li>
				</ul>
				<!--抽检记录  -->
				<div class="tabcon radomCheckCon" style="display:block;">
					<table id="taskRandomChecks" class="ramdomCheckList">
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
				<!--生产质量记录  -->
				<div class="tabcon qualityRecords" >
					<div class="detailWrap posA" >
						<div class="title clearfix">不合格项目明细<img src="/newresources/images/tasks/close.png" class="f_r" onclick="closeDetail()"></div>
						<div class="content">
							<div class="column clearfix">
								<div class="left">项目</div>
								<div class="right">数量</div>
							</div>
							<div id="taskAllCheckUnqudetails" class="detailMain">
							</div>
						</div>
						<div class="total">
							<span class="left">总计</span><span id="bhgsTotal" class="right"></span>
						</div>
					</div>
					<div class="amount_wrap mt20">检验总数量<span id="jyslTotal" class="num"></span>件，合格总数量<span id="hgslTotal" class="num"></span>件，质检不合格品<span id="bhgslTotal" class="num"></span>件</div>
					<div class="search_wrap mt20">
						日期：
						<input class="date Wdate" id="start_time" onClick="WdatePicker({maxDate:'#F{$dp.$D(\'end_time\')}',readOnly:true})">
						<label style="color:#e8e8e8;">——</label>
						<input class="date Wdate" id="end_time" onClick="WdatePicker({maxDate:'#F{$dp.$D(\'end_time\')}',readOnly:true})">	
						记录单号：
						<input type="text" id="search_text" class="recordNum" />
						<button onclick="getTaskAllCheckList()" class="search_btn">搜索</button>				
					</div>
					<div class="table_wrap" >
					<table id="taskAllChecks" class="qualityRecordList">
					</table>
					<div id="allCheckPagination" class="quotes clearfix"></div>
					</div>
				</div>
			</div>
			<!--质检信息结束 -->
		</div>
		<!--底部  -->
		<div id="bottom"></div>
		<%@ include file="/newresources/js/base.jsp" %>
		<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/qualityControl.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
		<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/taskStaticBar.js"></script>
		<script type="text/javascript" src="/vip/resources/js/jquery.mCustomScrollbar.concat.min.js" ></script>
		<script id="taskAllCheckStmpl" type="text/x-dot-template">
		<tr>
			<th class="con1 border-left">日期</th>
			<th class="con2">记录单号</th>
			<th class="con4">检验数量(件)</th>
			<th class="con4">合格品数量(件)</th>
			<th class="con4">不合格数量(件)</th>
			<th class="con1">合格率</th>
			<th class="con3 border-right">备注</th>
		</tr>
         {{for(var prop in it){}}
			<tr>
			     <td class="border-left">{{= replaceNullAsStr(it[prop].jlrq).substr(0,10)}}</td>
			     <td class="left">{{= replaceNullAsStr(it[prop].jldh)}}</td>
			     <td >{{= replaceNullAsStr(it[prop].jysl)}}</td>
			     <td >{{= replaceNullAsStr(it[prop].hgsl)}}</td>
				 {{? it[prop].source_type==0}}
			     <td class="left posR"><span class="unqualified">{{= (replaceNullAsStr(it[prop].jysl)-replaceNullAsStr(it[prop].hgsl))}}</span><button class="detail detailRegular" onclick="showDetail(this,'{{= replaceNullAsStr(it[prop].jldh)}}')">详情</button></td>
			     <td >{{= (replaceNullAsStr(it[prop].hgsl)* 100/replaceNullAsStr(it[prop].jysl)).toString().substr(0,5)}}%</td>
				 {{??}}
					<td></td>
					<td></td>
				 {{?}}
			     <td class="left border-right">{{= replaceNullAsStr(it[prop].bzsm)}}</td>
			</tr>
         {{}}}
		</script>
		<script id="taskAllCheckUnqudetailStmpl" type="text/x-dot-template">
         {{for(var prop in it){}}
			<div class="con"><span  class="left">{{= replaceNullAsStr(it[prop].xmmc)}}</span><span class="center right">{{= replaceNullAsStr(it[prop].bhgs)}}</span></div>
         {{}}}
		</script>
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
