<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>送货记录</title>
		<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/purchase.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
		<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="bg_grey">
		<div id="top"></div>
		<!--中间-->
		<div class="midd_wrap clearfix" >
			<div class="midd_left_wrap" style="width:180px;">
			</div>
			<div class="midd_right_wrap" style="width:834px">
				<p class="purchase_right_title"><span>送货记录</span></p>
				<div class="delivery_register_search mt20 ml10 mr10 posR">
					<input id="search_text" placeholder="请输入合同编号或送货单号进行搜索">
					<button class="order_blue_button " onclick = "getDeliveryRegisterList()">搜索</button>
					<!-- <span class="posA record_count">共&nbsp;<span id="total_count" class="redcolor">5</span>&nbsp;条记录</span> -->
				</div>
				<table id="allDeliveryRegisters" class="delivery_register_tablelist ml10 mt10">
				</table>
				<div id="paginationcom" class="quotes clearfix"></div>
			</div>
		</div>
		<!--底端-->
		<div id="bottom"></div>
		<%@ include file="/newresources/js/base.jsp" %>
<!-- 		<script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
		<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
		<script type="text/javascript" src="/usercenter/purchaseManage/deliveryManage/js/deliveryRecord.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.browser.js"></script>
		<script type="text/javascript" src="/newresources/js/json2.js"></script>
		<script id="allDeliveryRegisterStmpl" type="text/x-dot-template">
		<tr>
			<th style="width:110px;">登记日期</th>
			<th style="width:100px;">送货单号</th>
			<th style="width:220px;">订单编号（合同编号）</th>
			<th style="width:200px;">供应商名称</th>
			<th style="width:170px;">送货单</th>
			<th style="width:170px;">出厂报告</th>
		</tr>
		{{for(var prop in it){}}
			<tr valign="top">
				<td >{{= replaceNullAsStr(it[prop].create_dt)}}</td>
				<td >{{= replaceNullAsStr(it[prop].delivery_number)}}</td>
				<td>
					{{for(var pro in it[prop].deliveryRegisterDetails){}}
					<div>{{= replaceNullAsStr(it[prop].deliveryRegisterDetails[pro].order_bh)}}<br/>({{= replaceNullAsStr(it[prop].deliveryRegisterDetails[pro].agreement_bh)}})</div>
					{{}}}
				</td>
				<td >{{= replaceNullAsStr(it[prop].send_cpyname_cn)}}</td>
				<td>
					{{for(var pr in it[prop].deliveryAttacheds){}}
					{{? it[prop].deliveryAttacheds[pr].file_type_id ==41}}
						<a onclick="downLoadFile(this)" class="blue"><input type="hidden" value="{{= replaceNullAsStr(it[prop].deliveryAttacheds[pr].mogodb_id)}}"/>{{= replaceNullAsStr(it[prop].deliveryAttacheds[pr].file_name)+replaceNullAsStr(it[prop].deliveryAttacheds[pr].suffix_name)}}</a>
						<br/>
					{{??}}
					{{?}}
					{{}}}
				</td>
				<td>
					{{for(var pr in it[prop].deliveryAttacheds){}}
					{{? it[prop].deliveryAttacheds[pr].file_type_id ==51}}
						<a onclick="downLoadFile(this)" class="blue"><input type="hidden" value="{{= replaceNullAsStr(it[prop].deliveryAttacheds[pr].mogodb_id)}}"/>{{= replaceNullAsStr(it[prop].deliveryAttacheds[pr].file_name)+replaceNullAsStr(it[prop].deliveryAttacheds[pr].suffix_name)}}</a>
						<br/>
					{{??}}
					{{?}}
					{{}}}
				</td>
			</tr>
		{{}}}
		</script>
	</body>
</html>