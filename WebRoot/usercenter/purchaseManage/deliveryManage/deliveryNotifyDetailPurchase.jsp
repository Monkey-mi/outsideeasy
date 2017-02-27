<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>采购交期通知详情</title>
	<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
	<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
	<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" />
	<link href="/newresources/css/purchase.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="bg_grey">
		<div id="top"></div>
		<!--中间-->
		<div class="midd_wrap bg_white">
			<div class="deliveryNotifyDetail_top posR mr10">
				<div class="purchase_right_title"><span>交期通知详情</span></div>
				<ul class="tab posA">
					<li>显示方式：</li>
					<li class="curr" onClick="currtab('.deliveryNotifyDetail_top','#delivryNotifyDetail',0)">按订单<span class="split">|</span></li>
					<li onClick="currtab('.deliveryNotifyDetail_top','#delivryNotifyDetail',1)">按产品</li>
				</ul>
			</div>
			<div id="delivryNotifyDetail" class="delivryNotifyDetail mt20 ml10 mr10">
				<!-- 按订单显示开始 -->
 				<div id="byOrder" class="byOrder tabcon" style="display:block;"></div> 
				<!-- 按订单显示结束 -->
				<!-- 按产品显示开始 -->
				<div id="byProduct" class="byProduct tabcon"></div>
				<!-- 按产品显示结束 -->
			</div>
		</div>
		<!--底端-->
		<div id="bottom"></div>
		<%@ include file="/newresources/js/base.jsp" %>
<!-- 		<script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
		<script type="text/javascript" src="/usercenter/purchaseManage/deliveryManage/js/deliveryNotifyDetailPurchase.js"></script>
		<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
		<script  id="showOrder"  type="text/x-dot-template">
				<div class="listHead">
					<div class="con1 f_l">产品信息</div>
					<div class="con3 f_l">合同编号</div>
					<div class="con2 f_l">数量</div>
					<div class="con2 f_l">单位</div>
					<div class="con2 f_l">通知交期</div>
					<div class="con2 f_l">确认交期</div>
					<div class="con3 f_l">送达地址</div>
				</div>
				<div class="notifyInfo">
					<div class="left f_l">
						<ul class="ml10">
							<li class="mt10">采购商：<span class="supplier">{{= it.orderDeliveryNotice.pur_cpyname_cn}}</span></li>
							<li class="mt10">通知编号：<span class="notifyNode">{{= it.orderDeliveryNotice.delivery_notice_bh}}</span></li>
							<li class="mt10">通知时间：<span class="notifyTime">{{= it.orderDeliveryNotice.notice_dt}}</span></li>
						</ul>
					</div>
					<div class="right f_l">
							{{? it.orderDeliveryNotice.notice_status == 0}}
							<div class="right_top mr20">
								<div>通知状态：<span class="fs16_bold" style="color:#333;">待对方确认</span></div>
							</div>
							{{?? it.orderDeliveryNotice.notice_status == 1}}
							<div class="right_top mr20">
								<div >通知状态：<span class="fs16_bold" style="color:#333;">修改待确认</span></div>
							</div>
							<div class="mt10 mr20 operates">
								<button class="confirm f_r mr-265" onClick="confirmDeliveryTime(this,{{= it.orderDeliveryNotice.delivery_notice_id}},'{{= it.orderDeliveryNotice.update_dt}}')">确认</button>
								<!--<button class="modify  f_r mr20 modifyDate" onclick="modifyTimeByOrder(this)">修改交期</button>-->
								<!--<button class="modify f_r hide" style="color: #fff; background: #58749c;" onClick="submitModifyForOrder(this,'submit',{{= it.orderDeliveryNotice.delivery_notice_id}})">提交确认</button>-->
								<!--<button class="modify f_r mr20 hide" onClick="submitModifyForOrder(this,'save',{{= it.orderDeliveryNotice.delivery_notice_id}})">确认修改</button>-->
								<!--<button class="modify f_r mr20 hide" onClick="cancelModify(this)">取消</button>-->
							</div>
							{{?? it.orderDeliveryNotice.notice_status == 2}}
							<div class="right_top mr20">
								<div >通知状态：<span class="fs16_bold" style="color:#333;">已确认</span></div>
							</div>
							{{?}}
					</div>
				</div>
				{{for(var prop in it.orderDeliveryVoInfos) {}}
					{{? prop == 0 || (prop > 0 && it.orderDeliveryVoInfos[prop].order_bh != it.orderDeliveryVoInfos[prop-1].order_bh)}}
					<div class="notifyDetailBody mt20">
						<div class="orderNumber">订单编号：<span >{{= it.orderDeliveryVoInfos[prop].order_bh}}</span></div>
						<div class="notifyDetailBodyCon">
							<table class="products_byOrder ml10 mr10 mb10">
							{{for(var i in it.orderDeliveryVoInfos)　{}}
								{{? it.orderDeliveryVoInfos[i].order_bh == it.orderDeliveryVoInfos[prop].order_bh}}
								<tr class="product pl10 clearfix">
									<td class="left " valign="top" style="width:400px;">
										<div class="con1" >{{= it.orderDeliveryVoInfos[i].product_name}}&nbsp;(货号：<span>{{= it.orderDeliveryVoInfos[i].clhh}}</span>)</div>
										<div class="greycolor">规格尺寸：{{= it.orderDeliveryVoInfos[i].product_size}}&nbsp;{{= it.orderDeliveryVoInfos[i].remark}}</div>
									</td>
									<td class="con3 " valign="top">{{= it.orderDeliveryVoInfos[i].htbh}}</td>
									<td class="con2" valign="top">{{= it.orderDeliveryVoInfos[i].number}}</td>
									<td class="con2 " valign="top">{{= it.orderDeliveryVoInfos[i].unit}}</td>
									<td class="con2 " valign="top">{{= showBeforeOfDateStr(it.orderDeliveryVoInfos[i].notice_delivery_time)}}</td>
									{{? it.orderDeliveryVoInfos[i].confirm_delivery_time == null || it.orderDeliveryVoInfos[i].notice_delivery_time == it.orderDeliveryVoInfos[i].confirm_delivery_time}}
									<td class="con2 deadline" valign="top">
										<span>{{= showBeforeOfDateStr(it.orderDeliveryVoInfos[i].notice_delivery_time)}}</span>
										<input type="text" class="Wdate greycolor hide" onclick="WdatePicker({readOnly:true})" value={{= showBeforeOfDateStr(it.orderDeliveryVoInfos[i].notice_delivery_time)}}>
										<input class="hideConfirm" type="hidden" value={{= showBeforeOfDateStr(it.orderDeliveryVoInfos[i].notice_delivery_time)}}>
										<input class="detailsId" type="hidden" value={{= it.orderDeliveryVoInfos[i].details_id}}>
									</td>
									{{??}}
									<td class="con2 deadline" valign="top">
										<span class="changed">{{= showBeforeOfDateStr(it.orderDeliveryVoInfos[i].confirm_delivery_time)}}</span>
										<input type="text" class="Wdate greycolor hide" onclick="WdatePicker({readOnly:true})" value={{= showBeforeOfDateStr(it.orderDeliveryVoInfos[i].confirm_delivery_time)}}>
										<input class="hideConfirm" type="hidden" value={{= showBeforeOfDateStr(it.orderDeliveryVoInfos[i].confirm_delivery_time)}}>
										<input class="detailsId" type="hidden" value={{= it.orderDeliveryVoInfos[i].details_id}}>
									</td>
									{{?}}
									<td class="con3  posR clearfix" valign="top">{{= replaceNullAsStr(it.orderDeliveryVoInfos[i].delivery_address)}}</td>
								</tr>
								{{?}}
							{{}}}
							</table>
						</div>
					</div>
					{{?}}
				{{}}}
		</script>
		<script  id="showProduct"  type="text/x-dot-template">
				<div class="listHead">
					<div class="con1 f_l">产品信息</div>
					<div class="con3 f_l">合同编号</div>
					<div class="con2 f_l">数量</div>
					<div class="con2 f_l">单位</div>
					<div class="con2 f_l">通知交期</div>
					<div class="con2 f_l">确认交期</div>
					<div class="con3 f_l">送达地址</div>
				</div>
				<div class="notifyInfo">
					<div class="left f_l">
						<ul class="ml10">
							<li class="mt10">采购商：<span class="supplier">{{= it.orderDeliveryNotice.pur_cpyname_cn}}</span></li>
							<li class="mt10">通知编号：<span class="notifyNode">{{= it.orderDeliveryNotice.delivery_notice_bh}}</span></li>
							<li class="mt10">通知时间：<span class="notifyTime">{{= it.orderDeliveryNotice.notice_dt}}</span></li>
						</ul>
					</div>
					<div class="right f_l">
							{{? it.orderDeliveryNotice.notice_status == 0}}
							<div class="right_top mr20">
								<div >通知状态：<span class="fs16_bold" style="color:#333;">待对方确认</span></div>
							</div>
							{{?? it.orderDeliveryNotice.notice_status == 1}}
							<div class="right_top mr20">
								<div >通知状态：<span class="fs16_bold" style="color:#333;">修改待确认</span></div>
							</div>
							<div class="mt10 mr20 operates">
								<button class="confirm f_r mr-265" onClick="confirmDeliveryTime(this,{{= it.orderDeliveryNotice.delivery_notice_id}},'{{= it.orderDeliveryNotice.update_dt}}')">确认</button>
								<!--<button class="modify  f_r mr20 modifyDate" onclick="modifyTimeByOrder(this)">修改交期</button>-->
								<!--<button class="modify f_r hide" style="color: #fff; background: #58749c;" onClick="submitModifyForOrder(this,'submit',{{= it.orderDeliveryNotice.delivery_notice_id}})">提交确认</button>-->
								<!--<button class="modify f_r mr20 hide" onClick="submitModifyForOrder(this,'save',{{= it.orderDeliveryNotice.delivery_notice_id}})">确认修改</button>-->
								<!--<button class="modify f_r mr20 hide" onClick="cancelModify(this)">取消</button>-->
							</div>
							{{?? it.orderDeliveryNotice.notice_status == 2}}
							<div class="right_top mr20">
								<div >通知状态：<span class="fs16_bold" style="color:#333;">已确认</span></div>
							</div>
							{{?}}
					</div>
				</div>
			<div class="notifyDetailBodyCon">
				<table class="products">
				{{for(var prop in it.orderDeliveryVoInfos) {}}
					{{? prop == 0 || (prop > 0 && it.orderDeliveryVoInfos[prop].clhh != it.orderDeliveryVoInfos[prop-1].clhh)}}
					<tr class="product pl10 clearfix">
						<td class="left" >
							<div class="con1" style="width:380px;">{{= it.orderDeliveryVoInfos[prop].product_name}}&nbsp;(货号：<span>{{= it.orderDeliveryVoInfos[prop].clhh}}</span>)</div>
							<div class="greycolor">{{= it.orderDeliveryVoInfos[prop].product_size}}&nbsp;{{= it.orderDeliveryVoInfos[prop].remark}}</div>
						</td>
						<td colspan="6" valign="text-top"  >
						<table class="nestTable">
						{{for(var i in it.orderDeliveryVoInfos)　{}}
							<tr class="product">
							{{? it.orderDeliveryVoInfos[i].clhh == it.orderDeliveryVoInfos[prop].clhh}}
								<td class="con3">{{= it.orderDeliveryVoInfos[i].htbh}}</td>
								<td class="con2" style="clear:left;">{{= it.orderDeliveryVoInfos[i].number}}</td>
								<td class="con2">{{= it.orderDeliveryVoInfos[i].unit}}m</td>
								<td class="con2">{{= showBeforeOfDateStr(it.orderDeliveryVoInfos[i].notice_delivery_time)}}</td>
								{{? it.orderDeliveryVoInfos[i].confirm_delivery_time == null || it.orderDeliveryVoInfos[i].notice_delivery_time == it.orderDeliveryVoInfos[i].confirm_delivery_time}}
								<td class="con2 deadline">
									<span>{{= showBeforeOfDateStr(it.orderDeliveryVoInfos[i].notice_delivery_time)}}</span>
									<input type="text" class="Wdate greycolor hide" onclick="WdatePicker({readOnly:true})" value={{= showBeforeOfDateStr(it.orderDeliveryVoInfos[i].notice_delivery_time)}}>
									<input class="hideConfirm" type="hidden" value={{= showBeforeOfDateStr(it.orderDeliveryVoInfos[i].notice_delivery_time)}}>
									<input class="detailsId" type="hidden" value={{= it.orderDeliveryVoInfos[i].details_id}}>
								</td>
								{{??}}
								<td class="con2 deadline">
									<span class="changed">{{= showBeforeOfDateStr(it.orderDeliveryVoInfos[i].confirm_delivery_time)}}</span>
									<input type="text" class="Wdate greycolor hide" onclick="WdatePicker({readOnly:true})" value={{= showBeforeOfDateStr(it.orderDeliveryVoInfos[i].confirm_delivery_time)}}>
									<input class="hideConfirm" type="hidden" value={{= showBeforeOfDateStr(it.orderDeliveryVoInfos[i].confirm_delivery_time)}}>
									<input class="detailsId" type="hidden" value={{= it.orderDeliveryVoInfos[i].details_id}}>
								</td>
								{{?}}
								<td class="con3 posR clearfix">{{= replaceNullAsStr(it.orderDeliveryVoInfos[i].delivery_address)}}</td>
							{{?}}
							</tr>
						{{}}}
						</table>
						</td>
					</tr>
					{{?}}
				{{}}}
				</table>
			</div>
		</script>
	</body>
</html>
