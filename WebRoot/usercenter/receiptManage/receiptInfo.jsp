<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>收货详情</title>
		<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/receiptManage.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
		<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="bg_grey">
		<!--顶部-->
		<div id="top"></div>
		<!--中间-->
		<div class="midd_wrap clearfix" >
			<div class="midd_left_wrap" style="width:180px;"></div>
			<div class="midd_right_wrap" style="width:834px; padding-bottom:60px;">
				<p class="purchase_right_title">
					<span>收货详情</span>
				</p>
				<div class="receiptInfo">
					<div class="receiptInfoTop clearfix">
						<div class="name1">发货单位：</div><div class="con1" id="shipppingCompany"></div>
						<div class="name1">发货单号：</div><div class="con2" id="shipppingnum"><span id="type">返修品</span></div>
						<div class="name2">发货单状态：</div><div class="con3" id="shipiingStatus"></div>
					</div>
					<div class="sendOutTitle"><img src="/newresources/images/sendOut/List1.png" class="mr10">收货明细</div>
					<table class="mt20 ml10 mr10 tableList">
						
						
					</table>
					<div class="recordNum">共&nbsp;<span id="num"></span>&nbsp;条记录</div>
					<div class="memoForRead mt30 clearfix">
						<div class="f_l name">备注：</div>
						<div class="f_l con" id="receipt_remark" style="margin-left:20px;"></div>
					</div>
					<div class="memoForEdit mt30 hide">
						<div><div class="f_l">备注</div><div class="f_r"><span class="redcolor" id="words">0</span>/150</div></div>
						<textarea class="main mt5" id="remark" onkeyup="checkLen(this)"></textarea>
					</div>
					<div class="sendOutTitle mt50"><img src="/newresources/images/sendOut/Truck.png" class="mr10">物流信息</div>
					<div class="logisticsInfo mt20 ml10 clearfix">
						
					</div>
					<div class="t_algin_r"><button class="confirmReceipt" onclick="comfirReceive()">确认收货</button></div>
				</div>
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
		<script type="text/javascript" src="/usercenter/receiptManage/js/receiptInfo.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.browser.js"></script>
		<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="/newresources/js/json2.js"></script>
		<script id="shippingImlinfo" type="text/x-dot-template">
		                <div>
							<span class="name">发货日期：</span><span class="con1">{{= it.start_date.slice(0,10)}}</span>
							<span class="name">到货日期：</span><span class="con1" id="comfirmdate"></span>
							<span class="name">运单号：</span><span class="con1">{{= it.shipping_number}}</span>
						</div>
						<div>
							<span class="name">司机：</span><span class="con1">{{= it.driver}}</span>
							<span class="name">手机号：</span><span class="con1">{{= it.phone_number}}</span>
							<span class="name">车牌号：</span><span class="con1">{{= it.licence_plate}}</span>
							<br>
							<span class="name">备注：</span>
							<div class="con2">
								<div>{{= replaceNullAsStr(it.remark)}}</div>
								<ul class="clearfix mt15" id="taskFilesList">
															
								</ul>
							</div>
						</div>
		</script>
		<script id = "taskImplinfo" type = "text/x-dot-template">
                       <tr>
							<th style="width:250px;">产品</th>
							<th style="width:auto;">任务单号</th>
							<th style="width:100px;">送货数量</th>
							<th style="width:120px;">确认收货数量</th>
						</tr>
                      {{for(var prop in it){}}
		                <tr>
							<td>
								{{? it[prop].product_pic!=null}}
								<div class="productImg"><img src="{{= getwebroot()+'taskFile/downLoadFileFormMongoForProducer.do?file='}}{{= it[prop].product_pic}}"></div><div class="productName">{{= it[prop].product_name}}</div>
								{{??}}
								<div class="productImg"><img src="/newresources/images/noPic.png"></div><div class="productName">{{= it[prop].product_name}}</div>
								{{?}}
							</td>
							<td>
								<div class="c999">{{= replaceNullAsStr(it[prop].serial_no)}}</div>
								<div class="c999">{{= replaceNullAsStr(it[prop].rwdh)}} /{{= replaceNullAsStr(it[prop].ddh)}}/ {{= replaceNullAsStr(it[prop].scdh)}}</div>
								<div>{{= replaceNullAsStr(it[prop].bzmc)}}</div>
							</td>
							<td class="center" id="delivery_quantity">{{= it[prop].delivery_quantity}}</td>                          
							<td class="center"><span class="numForRead">{{= it[prop].receive_no}}</span><input class="numForEdit hide" id="receive_no" value="{{= it[prop].delivery_quantity}}"/><input style="display:none" value="{{= replaceNullAsStr(it[prop].deliver_id)}}"/></td>
						</tr>
                      {{}}}
		</script>
		<script  id = "fileImplinfo" type = "text/x-dot-template">
		{{for(var prop in it){}}
		   <li><img src="{{= getwebroot()+'taskFile/downLoadFileFormMongoForProducer.do?file='}}{{= it[prop].object_id}}"></li>
		{{}}}	
		</script>
	</body>
</html>