<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>收货管理</title>
		<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/receiptManage.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
		<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="bg_grey">
	<div class="mask_opacity"></div>
		<div id="top"></div>
		<!--中间-->
		<div class="midd_wrap clearfix" >
			<div class="midd_left_wrap" style="width:180px;"></div>
			<div class="midd_right_wrap" style="width:834px">
				<p class="purchase_right_title"><span>收货管理</span></p>
				<div id="deliveryManageList" class="deliveryManageList mt20 ml10 mr10">
					<ul class="tab">
						<li class="curr" onClick="currtab('#deliveryManageList',0)">全部<span class="split">|</span></li>
						<li onClick="currtab('#deliveryManageList',1)">待收货<span class="split">|</span></li>
						<li onClick="currtab('#deliveryManageList',2)">已收货<span class="split">|</span></li>
						<li onClick="currtab('#deliveryManageList',3)">已取消</li>
					</ul>
					<div class="searchCriteria clearfix ">
						<div><label>产品名称：</label><input class="inputWrap1" id="search_company"  type="text" placeholder="请输入产品名称"><label class="ml20">发货单号：</label><input class="inputWrap1" id="shipping_num" type="text" placeholder="请输入发货单号关键字"><label style="margin-left:24px;width:60px;">运单号：</label><input class="inputWrap1" id="shipping_nummber" type="text" placeholder="请输入运单号关键字"></div>
						<div class="clearfix mt10">
							<div class="f_l">
								<label>发货日期：</label><input type="text" class="Wdate inputWrap2" id="shipping_start_date" placeholder="起始日期" onclick="WdatePicker({maxDate:'#F{$dp.$D(\'shipping_end_date\')}',readOnly:true})"><img src="/newresources/images/inputSplit.jpg"><input type="text" class="Wdate inputWrap2" id="shipping_end_date" placeholder="结束日期" onclick="WdatePicker({minDate:'#F{$dp.$D(\'shipping_start_date\')}',readOnly:true})">
								<label class="ml15">收货日期：</label><input type="text" id="start_date" class="Wdate inputWrap2" placeholder="起始日期" onclick="WdatePicker({maxDate:'#F{$dp.$D(\'end_date\')}',readOnly:true})"><img src="/newresources/images/inputSplit.jpg"><input type="text" class="Wdate inputWrap2" placeholder="结束日期" id="end_date" onclick="WdatePicker({minDate:'#F{$dp.$D(\'start_date\')}',readOnly:true})">
							</div>
							<div class="posR f_l ml25">
								<div class="selectShowWrap" onclick="showSelect(this)">全部类型<img src="/newresources/images/switchover.png" class="f_r mr4 mt4"></div>
								<ul class="posA selectWrap">
									<li value="2">全部类型</li>
									<li value="0">发货清单</li>
									<li value="1">返修清单</li>
								</ul>
							</div>
							<button class="searchBtn ml15" onClick="getShippingDetails()" >搜索</button>
						</div>
					</div>
					<div class="t_algin_r mt15"><!-- 共&nbsp;<span class="redcolor">30</span>&nbsp;条记录 --></div>
					<table class="deliveryTableList mt15">
						<tr>
							<th class="wrap1">发货日期</th>
							<th class="wrap2">发货单号</th>
							<th	class="wrap4"></th>
							<th class="wrap5">发货单位</th>
							<th class="wrap1">收货日期</th>
							<th style="width:auto;">司机信息</th>
							<th class="wrap4">状态</th>
							<th class="wrap3">操作</th>
						</tr>
									
					</table>
				</div>
			<div id="paginationcom" class="quotes"></div>
			</div>
		</div>
		<!--底端-->
		<div id="bottom"></div>
		<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script>
		<script type="text/javascript" src="/newresources/js/base.js"></script>
		<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
		<%@ include file="/newresources/js/base.jsp" %>
		<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
		<script type="text/javascript" src="/usercenter/receiptManage/js/receiptManage.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.browser.js"></script>
		<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="/newresources/js/json2.js"></script>
		<script id="shippingList"  type="text/x-dot-template">
        {{for(var prop in it){}}
		<tr>
							<td>{{= replaceNullAsStr(it[prop].start_date).slice(0,10) }}</td>
							<td><a class="orderNumber" onclick="comfirmReceipt('{{= replaceNullAsStr(it[prop].deliver_number) }}')">{{= replaceNullAsStr(it[prop].deliver_number) }}</a></td>
                            {{? replaceNullAsStr(it[prop].deliver_type)== 0 }}	
                                <td></td>                                                        
                            {{?? replaceNullAsStr(it[prop].deliver_type)== 1 }}	
                               <td>返修品</td>
                            {{?}}							
							<td>{{= replaceNullAsStr(it[prop].shipping_company) }}</td>
							<td>{{= replaceNullAsStr(it[prop].confirm_dt).slice(0,10) }}</td>
							<td><span>{{= replaceNullAsStr(it[prop].driver) }}</span><span class="ml10">{{= replaceNullAsStr(it[prop].phone_number) }}</span></td>
                          {{? replaceNullAsStr(it[prop].deliver_state)== 5 }}	
							<td class="center waiting">待收货</td>
							<td ><a class="operate center" onclick="comfirmReceipt('{{= replaceNullAsStr(it[prop].deliver_number) }}')">确认收货</a></td>                      
                          {{?? replaceNullAsStr(it[prop].deliver_state)== 10}}
                            <td class="center finished">已收货</td>
							<td ><a class="operate center" onclick="queryInfo('{{= replaceNullAsStr(it[prop].deliver_number) }}')">查看详情</a></td>
                          {{?? replaceNullAsStr(it[prop].deliver_state)== 15}}
                            <td class="center canceled">已取消</td>
							<td ><a class="operate center" onclick="queryInfo('{{= replaceNullAsStr(it[prop].deliver_number) }}')">查看详情</a></td>
                          {{?}} 
						</tr>
          {{}}}
		</script>
	</body>
</html>
