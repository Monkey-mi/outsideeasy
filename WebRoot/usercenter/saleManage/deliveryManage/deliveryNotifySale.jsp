<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>销售交期通知管理</title>
		<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/sale.css" rel="stylesheet" type="text/css" />
		<link href="/vip/resources/css/vipsale.css" rel="stylesheet" type="text/css" />
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
				<p class="sale_right_title"><span>交期通知</span></p>
				<div id="delivryNotifyList" class="saleOrderList mt20 ml10 mr10">
					<ul class="tab">
						<li class="curr" onClick="currtab('#delivryNotifyList',0)">全部(<span id="allDliNum">0</span>)<span class="split">|</span></li>
						<li onClick="currtab('#delivryNotifyList',1)">待确认(<span id="waitDliNum">0</span>)<span class="split">|</span></li>
						<li onClick="currtab('#delivryNotifyList',2)">待对方确认(<span id="waitOtherDliNum">0</span>)<span class="split">|</span></li>
						<li onClick="currtab('#delivryNotifyList',3)">已确认(<span id="confirmDliNum">0</span>)</li>
					</ul>
					<div class="searchCriteria">
						<div class=" mt10 clearfix ">
							<div class="f_l ml4">
								通知日期：<input type="text" style="height:30px;border:1px solid #e8e8e8;" class="Wdate greycolor startNotiDate" placeholder="起始日期" onclick="WdatePicker({readOnly:true})" value>&nbsp;-
										<input type="text" style="height:30px;border:1px solid #e8e8e8;" class="Wdate greycolor endNotiDate" placeholder="结束日期" onclick="WdatePicker({readOnly:true})" value>
								<input id="multiKey" class="keywords greycolor" placeholder="合同编号、通知编号、采购商名称关键字搜索">
								<button class="order_blue_button" onClick="doSearchForNotify()">搜索</button>
							</div>
						</div>
					</div>
					<!--通知开始  -->
					<div class="notifyList tabcon mt10" style="display: block;">
						<div class="clearfix">
							<!-- <span class="t_algin_r f_r">共&nbsp;<span id="deliveryTotal" class="redcolor">*</span>&nbsp;条记录</span> -->
						</div>
						<div class="deliveryNotify_head clearfix">
							<div class="con1 f_l">产品信息</div>
							<div class="con3 f_l">合同编号</div>
							<div class="con2 f_l">数量</div>
							<div class="con2 f_l">单位</div>
							<div class="con2 f_l">通知交期</div>
							<div class="con2 f_l">确认交期</div>
						</div>
						<div id="notifyShow"><!-- 通知 --></div>
					</div>
					<!--通知结束  -->
					<div id="pagination" class="quotes clearfix"></div>
				</div>
			</div>
			<!--弹框开始  -->
			<div class="mask" id="pop_mask"></div>
			<!--弹框结束  -->
		</div>
		<!--底端-->
		<div id="bottom"></div>
		<%@ include file="/newresources/js/base.jsp" %>
<!-- 		<script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
		<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.nicescroll.js"></script>
		<script type="text/javascript" src="/usercenter/saleManage/deliveryManage/js/deliveryNotifySale.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.browser.js"></script>
		<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="/newresources/js/json2.js"></script>
	</body>
	<script  id="orderNotify"  type="text/x-dot-template">
		{{for(var prop in it){}}
			<div class="deliveryNotify_con">
				<div class="notifyInfo ">
					<div class="left f_l">
						<ul class="ml10">
							<li class="mt10">采购商：<span class="supplier">{{= replaceNullAsStr(it[prop].orderDeliveryNotice.pur_cpyname_cn)}}</span></li>
							<li class="mt10">通知编号：<span class="notifyNode">{{= replaceNullAsStr(it[prop].orderDeliveryNotice.delivery_notice_bh)}}</span></li>
							<li class="mt10">通知时间：<span class="notifyTime">{{= replaceNullAsStr(it[prop].orderDeliveryNotice.notice_dt)}}</span></li>
						</ul>
					</div>
					<div class="right f_l">
							{{? it[prop].orderDeliveryNotice.notice_status == 0}}
							<div class="right_top mr20">
								<div>通知状态：<span class="fs16_bold">待确认</span> <a class="blue ml20" onclick="queryInfo({{= it[prop].orderDeliveryNotice.delivery_notice_id}},'moreInfo')"> 详情>> </a></div>
							</div>
							<div class="mt10">
								<button class="modify ml300 mr20" onclick="queryInfo({{= it[prop].orderDeliveryNotice.delivery_notice_id}},'modify')">修改交期</button>
								<button class="confirm" onClick="confirmDeliveryTime(this,{{= it[prop].orderDeliveryNotice.delivery_notice_id}})">确认</button>
								<input id="deliveryNoticeId" type="hidden" value="+ {{= it[prop].orderDeliveryNotice.delivery_notice_id}} +">
							</div>
							{{?? it[prop].orderDeliveryNotice.notice_status == 1}}
							<div class="right_top mr20">
								<div>通知状态：<span class="fs16_bold">待对方确认</span> <a class="blue ml20" onclick="queryInfo({{= it[prop].orderDeliveryNotice.delivery_notice_id}},'moreInfo',1)"> 详情>> </a></div>
							</div>
							<div class="mt10">
								<button class="modify ml400 mr20" onclick="queryInfo({{= it[prop].orderDeliveryNotice.delivery_notice_id}},'modify',1)">修改交期</button>
							</div>
							{{?? it[prop].orderDeliveryNotice.notice_status == 2}}
							<div class="right_top mr20">
								<div >通知状态：<span class="fs16_bold">已确认</span> <a class="blue ml20" onclick="queryInfo({{= it[prop].orderDeliveryNotice.delivery_notice_id}},'moreInfo')"> 详情>> </a></div>
							</div>
							{{?}}
					</div>
				</div>
				<table class="products">
					{{for(var i in it[prop].orderDeliveryVoInfos){}}
					<tr class="product pl10 ">
							<td class="left" valign="top">
								<div class="con1" >{{= replaceNullAsStr(it[prop].orderDeliveryVoInfos[i].product_name)}}&nbsp;(货号：<span>{{= replaceNullAsStr(it[prop].orderDeliveryVoInfos[i].product_artno)}}</span>)</div>
								<span class="greycolor">规格尺寸：{{= replaceNullAsStr(it[prop].orderDeliveryVoInfos[i].product_size)}}&nbsp;{{= replaceNullAsStr(it[prop].orderDeliveryVoInfos[i].remark)}}</span>
							</td>
							<td class="con3 " valign="top">{{= replaceNullAsStr(it[prop].orderDeliveryVoInfos[i].htbh)}}</td>
							<td class="con2 " valign="top">{{= replaceNullAsStr(it[prop].orderDeliveryVoInfos[i].number)}}</td>
							<td class="con2 " valign="top">{{= replaceNullAsStr(it[prop].orderDeliveryVoInfos[i].unit)}}</td>
							<td class="con2 " valign="top">{{= showBeforeOfDateStr(it[prop].orderDeliveryVoInfos[i].notice_delivery_time)}}</td>
							{{? it[prop].orderDeliveryVoInfos[i].confirm_delivery_time == null}}
							<td class="con2 " valign="top">{{= showBeforeOfDateStr(it[prop].orderDeliveryVoInfos[i].notice_delivery_time)}}</td>
							{{?? it[prop].orderDeliveryVoInfos[i].confirm_delivery_time == it[prop].orderDeliveryVoInfos[i].notice_delivery_time}}
							<td class="con2 " valign="top">{{= showBeforeOfDateStr(it[prop].orderDeliveryVoInfos[i].confirm_delivery_time)}}</td>
							{{??}}
							<td class="con2 changed" valign="top">{{= showBeforeOfDateStr(it[prop].orderDeliveryVoInfos[i].confirm_delivery_time)}}</td>
							{{?}}
					</tr>
					{{}}}
				</table>
			</div>
		{{}}}
	</script>
</html>