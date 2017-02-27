<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>发货单详情</title>
		<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/sendOutManage.css" rel="stylesheet" type="text/css" />
		<link href="/vip/resources/css/vipLeftMenu.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
		<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="bg_grey">
		<!--顶部-->
		<div id="top" class="invoiceTop"></div>
		<!--中间-->
		<div class="midd_wrap clearfix" id="invoiceMiddWrap">
			<div class="midd_left_wrap" style="width:180px;"></div>
			<div class="midd_right_wrap" style="width:834px; padding-bottom:60px;"  id="midd_right_wrap">
				<p class="sale_right_title">
					<span>发货单详情</span>
				</p>
				<div class="invoiceInfo">
					<div class="invoiceInfoTop clearfix">
						<div class="name1">发货单号：</div><div class="con1" id="shipppingnum"></div>
						<div class="name1">客户名称：</div><div class="con2" id="shipppingCompany"></div>
						<div class="name2">发货单状态：</div><div class="con3" id="shipiingStatus"></div>
					</div>
					<div class="sendOutTitle"><img src="/newresources/images/sendOut/Truck.png" class="mr10">物流信息</div>
					<div class="logisticsInfo mt20 ml10 clearfix">
						
					</div>
					<div class="sendOutTitle mt50" id="returnDetails"></div>
					<table class="mt20 ml10 mr10 tableList">
						
					</table>
					<div class="recordNum">共&nbsp;<span id="num"></span>&nbsp;条记录</div>
					<div class="sendOutTitle mt50"><img src="/newresources/images/sendOut/document.png" class="mr20">收货备注</div>
					<div class="memo" id="remark_memo"></div>
				</div>
			</div>
		</div>
		<!--底端-->
		<div id="bottom" class="invoiceBottom"></div>
		<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script>
		<script type="text/javascript" src="/newresources/js/base.js"></script>
		<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
		<%@ include file="/newresources/js/base.jsp" %>
		<script type="text/javascript" src="/usercenter/sendOutManage/js/invoiceInfo.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.browser.js"></script>
		<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="/newresources/js/json2.js"></script>
		<script id="shippingImlinfo" type="text/x-dot-template">
		             <div>
							<span class="name">发货日期：</span><span class="con1">{{= it.start_date.slice(0,10)}}</span>
							<span class="name">到货日期：</span><span class="con1" id="comfirmdate"></span>
						</div>
						<div>
							<span class="name">运单号：</span><span class="con1">{{= it.shipping_number}}</span>
							<span class="name">司机：</span><span class="con2">{{= it.driver}}</span>
							<span class="name">手机号：</span><span class="con4">{{= it.phone_number}}</span>
							<span class="name">车牌号：</span><span class="con3">{{= it.licence_plate}}</span>
							<span class="name">备注：</span>
							<div class="con5">
								<div>{{= it.remark}}</div>
								<ul class="clearfix" id="taskFilesList">																													
								</ul>
							</div>
						</div>
		</script>
		<script id = "taskImplinfo" type = "text/x-dot-template">
		              <tr>
							<th style="width:250px;">产品</th>
							<th style="width:auto;">任务单号</th>
							<th style="width:100px;">送货数量</th>
                        {{? it[0].deliver_state == 10}}                
							<th style="width:100px;">到货数量</th>
                        {{?}}
						</tr>
                     {{for(var prop in it){}}
						<tr>
							<td>
								{{? it[prop].product_pic!=null}}
									<div class="productImg"><img src="{{= getwebroot()+'taskFile/downLoadFileFormMongoForProducer.do?file='}}{{= it[prop].product_pic}}"></div>
									<div class="productName">{{= it[prop].product_name}}</div>
								{{??}}
									<div class="productImg"><img src="/newresources/images/noPic.png"></div>
									<div class="productName">{{= it[prop].product_name}}</div>
								{{?}}
							</td>
							<td>
								<div class="c999">{{= replaceNullAsStr(it[prop].serial_no)}}</div>
								<div class="c999">{{= replaceNullAsStr(it[prop].rwdh)}} /{{= replaceNullAsStr(it[prop].ddh)}}/ {{= replaceNullAsStr(it[prop].scdh)}}</div>
								<div>{{= replaceNullAsStr(it[prop].bzmc)}}</div>
							</td>
							<td class="center">{{= it[prop].delivery_quantity}}</td>
                      {{? it[prop].deliver_state == 10}}
							<td class="center">{{= it[prop].receive_no}}</td>
                      {{?}}
                      {{}}}
						</tr>
                      
		</script>
		<script  id = "fileImplinfo" type = "text/x-dot-template">
		{{for(var prop in it){}}
		   <li><img src="{{= getwebroot()+'taskFile/downLoadFileFormMongoForProducer.do?file='}}{{= it[prop].object_id}}"></li>
		{{}}}	
		</script>
	</body>
</html>
