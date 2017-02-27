<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>准入申请审核</title>
	<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
	<link href="/newresources/css/purchase.css" rel="stylesheet" type="text/css" />
	<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
	<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="bg_grey">
		<div class="mask_opacity"></div>
		<div id="top"></div>
		<!--中间-->
		<div class="midd_wrap clearfix">
			<div class="midd_left_wrap" style="width:180px;">
			</div>
			<div class="midd_right_wrap" style="width:834px">
				<p class="purchase_right_title"><span>准入申请审核</span></p>
				<div id="accessVerify" class="accessVerify">
					<ul class="tab">
						<li onClick="currtab('#accessVerify',0)">全部<span class="split">|</span></li>
						<li class="curr" onClick="currtab('#accessVerify',1)">待审核<span class="split">|</span></li>
						<li onClick="currtab('#accessVerify',2)">已退回<span class="split">|</span></li>
						<li onClick="currtab('#accessVerify',3)">已通过</li>
					</ul>
					<div class="mt20 searchWrap ">
						<div class="posR" style="display:inline-block;">
							<div id="verifyType" class="verifyType clearfix" onclick="showselect(this)">全部类型<img src="/newresources/images/switchover.png" class="f_r mr8 mt5"></div>
							<ul class="posA verifyTypeSelect" onchange="showSelectContent(this,'verifyType')">
								<li value="0" onclick="selectOption(this)" >全部类型</li>
								<li value="1" onclick="selectOption(this)">初审</li>
								<li value="2" onclick="selectOption(this)" >复审</li>
							</ul>
						</div>
						<span>提交日期：</span>
						<input type="text" id="startDate" class="Wdate uploadDate" placeholder="起始日期" onclick="WdatePicker({readOnly:true,maxDate:'#F{$dp.$D(\'endDate\')||\'%y-%M-%d\'}'})">
						--
						<input type="text" id="endDate" class="Wdate uploadDate" placeholder="结束日期" onclick="WdatePicker({readOnly:true,minDate:'#F{$dp.$D(\'startDate\')}',maxDate:'%y-%M-%d'})">
						<input type="text" id="search_text" class="supplierNameSearch" placeholder="请输入供应商名称关键字搜索">
						<button onclick="getAccessRecordListForVerify()" class="search_btn ml4">搜索</button>
					</div>
					<table id="allAccessRecords" class="verifyTableList mt20">
						<!-- <tr>
							<th style="width:145px;">提交时间</th>
							<th style="width:22px;"></th>
							<th style="width:auto;">供应商名称</th>
							<th style="width:85px;">联系信息</th>
							<th style="width:135px;">供货品类</th>
							<th style="width:25px;"></th>
							<th style="width:65px;" class="left">审核状态</th>
							<th style="width:70px;">操作</th>
						</tr>
						<tr>
							<td>
								<div>2016-12-08 16:54:00</div>
								<div class="updateTime">2016-12-08 16:54:00修改</div>
							</td>
							<td><img src="/newresources/images/supplier/vip.png"></td>
							<td style="padding-left:5px;">厦门合兴供应链管理有限公司</td>
							<td>
								<div>张三三</div>
								<div>15256123123</div>
							</td>
							<td>采购品类</td>
							<td class="type">初审</td>
							<td >审核通过</td>
							<td class="center"><a></a></td>
						</tr>
						<tr>
							<td>
								<div>2016-12-08 16:54:00</div>
								<div class="updateTime">2016-12-08 16:54:00修改</div>
							</td>
							<td></td>
							<td style="padding-left:5px;">厦门合兴供应链管理有限公司</td>
							<td>
								<div>张三三</div>
								<div>15256123123</div>
							</td>
							<td>采购品类</td>
							<td class="type">复审</td>
							<td >等待审核</td>
							<td class="center"><a onclick="goVerify()">审核</a></td>
						</tr> -->
					</table>
					<div id="paginationcom" class="quotes clearfix"></div>
				</div>
			</div>
		</div>
		<div id="bottom"></div>
		<%@ include file="/newresources/js/base.jsp" %>
		<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script>
		<script type="text/javascript" src="/newresources/js/base.js"></script>
		<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
		<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
		<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="/usercenter/purchaseManage/SupplierManage/js/accessVerifyList.js"></script>
		<script id="allAccessRecordStmpl" type="text/x-dot-template">
		<tr>
			<th style="width:145px;">提交时间</th>
			<th style="width:22px;"></th>
			<th style="width:auto;">供应商名称</th>
			<th style="width:85px;">联系信息</th>
			<th style="width:135px;">供货品类</th>
			<th style="width:25px;"></th>
			<th style="width:65px;" class="left">审核状态</th>
			<th style="width:70px;">操作</th>
		</tr>
         {{for(var prop in it){}}
			<tr>
				<td>
					<div>{{= replaceNullAsStr(it[prop].first_submit_dt)}}</div>
					{{? it[prop].update_dt !=null}}
						<div class="updateTime">{{= replaceNullAsStr(it[prop].update_dt)}}修改</div>
					{{??}}
					{{?}}
				</td>
				<td>
					{{? it[prop].object_type ==1}}
						<img src="/newresources/images/supplier/vip.png">
					{{??}}
					{{?}}
				</td>
				<td style="padding-left:5px;">{{= replaceNullAsStr(it[prop].submit_name)}}</td>
				<td>
					<div>{{= replaceNullAsStr(it[prop].contacts)}}</div>
					<div>{{= replaceNullAsStr(it[prop].m_phone)}}</div>
				</td>
				<td>{{= replaceNullAsStr(it[prop].categoryStr)}}</td>
				<td class="type">
					{{? it[prop].update_dt !=null}}
						复审
					{{??}}
						初审
					{{?}}
				</td>
				<td >
					{{? it[prop].access_status ==2}}
						等待审核
					{{??}}
						{{? it[prop].access_status ==3}}
							审核通过
						{{??}}
							{{? it[prop].access_status ==4}}
								审核不通过
							{{??}}
						
							{{?}}
						{{?}}
					{{?}}
				</td>
				<td class="center">
					{{? it[prop].access_status ==2}}
						<a onclick="goVerify({{=it[prop].access_status}},{{=it[prop].record_id}},{{=it[prop].submit_id}},'{{=it[prop].submit_name}}',{{=it[prop].h_id}},'{{=it[prop].orderby_dt}}')">审核</a>
					{{??}}
						<a onclick="goVerify({{=it[prop].access_status}},{{=it[prop].record_id}},{{=it[prop].submit_id}},'{{=it[prop].submit_name}}',{{=it[prop].h_id}},'{{=it[prop].orderby_dt}}')">查看</a>
					{{?}}	
				</td>
			</tr>
         {{}}}
		</script>
	</body>
</html>
