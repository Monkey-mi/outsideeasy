<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>采购中心</title>
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
			<div class="middle_right_wrap clearfix" style="width:844px;">
				<div class="purchaseCenterLeft f_l ml10">
					<div class="top bg_white clearfix">
						<div class="information ">
							<div class="contact f_l">
								<div class="f_l hide showTitle"><img src="/newresources/images/baseLisence.png"  class="picFrame"></div>
								<div class="f_l">
									<!-- <div class="name">李某某</div> -->
									<div class="company mt18 "></div>
								</div>
							</div>
							<div class="mt20 f_r mr30">
								<span class="bluecolor" style="cursor:pointer;" onclick="goForward1('supplierForPlateForm/registerInfo.htm')" >账号维护</span><span style="cursor:pointer;" class="bluecolor ml50" onclick="goForward_window('supplierForPlateForm/companyWindow.htm')">企业门户</span>
							</div>
						</div>
						<div class="message_wrap">
							<div id="order" class="clearfix">
								<div  class="con1 f_l ">订单</div>
								<div  class="f_l items">
									<div class="con2 f_l" onclick="goForward('/purchaseorder/orderManageForPurchase.htm','#purchaseOrderList',1)">待接订单<span id="comimtOrderCount" class="b yellowcolor ml4"></span></div>
									<div class="con3 f_l" onclick="goForward('/purchaseorder/orderManageForPurchase.htm','#purchaseOrderList',4)">待确认终止订单<span id="queryOrderCount" class="b yellowcolor ml4"></span></div>
									<div class="con4 f_l" onclick="goForward('/orderDeliveryNotice/deliveryNotifyPurchase.htm','#delivryNotifyList',1)">待对方确认交期<span id="toBeConfirmedDeliveryNotice" class="b yellowcolor ml4"></span></div>
									<!-- <div class="con5 f_l" onclick="goForward('orderDeliveryNotice/deliveryNotifyPurchase.htm','#delivryNotifyList',1)">待确认变更交期 <span id="" class="b yellowcolor ml4"></span></div> -->
								</div>
							</div>
							<div id="task" class="clearfix">
								<div class="con1 f_l">外协任务</div>
								<div  class="f_l items">
									<div class="con2 f_l" onclick="goForward('/externalTask/outsourceTaskList.htm','',1)">待派发<span id="toBeSend" class="b yellowcolor ml4"></span></div>
									<div class="con3 f_l" onclick="goForward('/externalTask/outsourceTaskList.htm','',2)">待接受<span id="sended" class="b yellowcolor ml4"></span></div>
									<div class="con4 f_l" onclick="goForward('/externalTask/outsourceTaskList.htm','',3)">在生产<span id="producting" class="b yellowcolor ml4"></span></div>
									<div class="con5 f_l" onclick="goForward('/externalTask/outsourceTaskList.htm','',4)">在验收<span id="finishproduct" class="b yellowcolor ml4"></span></div>
								</div>
							</div>
							<div id="supplier" class="clearfix">
								<div class="con1 f_l">供应商</div>
								<div  class="f_l items">
									<div class="con2 f_l" onclick="goForward_alternative('/supplierFiles/supplierList.htm','#supplierList',1,1)">待接收邀请<span id="toBeReceivedInvite" class="b yellowcolor ml4"></span></div>
									<div class="con3 f_l" onclick="goForward_checkFactory('/supplierManager/offlineFactoryCheck.htm','#offlineFactoryCheck',1,0)">待确认验厂通知<span id="toBeConfirmedCheckInform" class="b yellowcolor ml4"></span></div>
									<div class="con4 f_l" onclick="goForward_checkFactory1('/supplierManager/offlineFactoryCheck.htm','#offlineFactoryCheck',2,2)">待复检供应商<span id="needCheckFactoryCountForReviewCheck" class="b yellowcolor ml4"></span></div>
									<div class="con5 f_l" onclick="goForward_checkFactory1('/supplierManager/offlineFactoryCheck.htm','#offlineFactoryCheck',2,1)">未验厂供应商<span id="needCheckFactoryCountForFirstCheck" class="b yellowcolor ml4"></span></div>
								</div>
							</div>
						</div>
					</div>
					<div class="unqualifiedFeedback bg_white mt10">
						<div class="title"><span>不合格产品反馈</span></div>
						<div id="QualityFeedbacks" class="purchaseCenterFeedbackList clearfix">
						</div>
					</div>
					<div class="deliveryNotify bg_white mt10">
						<div  class="title"><span>最新确认送货通知单</span></div>
						<div id="DeliveryNotices" class="purchaseCenterNotifyList clearfix">
						</div> 
					</div>
					<div id="purchaseCenterOrder" class="order bg_white mt10">
						<div class="title tab"><span class="t1 curr" onclick="currtab('#purchaseCenterOrder','0')">最新已接订单</span><span class="t2 ml20" onclick="currtab('#purchaseCenterOrder','1')">最新交货完成订单</span></div>
						<div id="AcceptOrders" class="purchaseCenterOrderList tabcon clearfix" style="display:block;">
						</div>	
						<div id="DeliverOrders" class="purchaseCenterOrderList tabcon clearfix">
						</div>
					</div>
					<div id="purchaseCenterTask" class="task bg_white mt10">
						<div class="title tab">
							<span class="t1 curr" onclick="currtab('#purchaseCenterTask','0')">最新已接任务单</span>
							<span class="t2 ml20" onclick="currtab('#purchaseCenterTask','1')">最新交货完成任务单</span>
						</div>
						<div id="AcceptTasks" class="purcahseCenterTaskList tabcon clearfix" style="display:block;">
						</div>	
						<div id="DeliverTasks" class="purcahseCenterTaskList tabcon clearfix">
						</div>
					</div>
				</div>
				<div class="purchaseCenterRight f_l ml10" >
					<div id="announcement" class="announcement bg_white">
						<div class="title"><span class="ml10">最新公告</span><div class="f_r mr10 moreItems" onclick="goForward1('announcement/announcementList.htm?tag=2')">更多>></div></div>
						<div id="announcements" class="pl20" style="padding-top:10px;">
							<!-- <div class="con"> 
								<div onclick="">震惊！！某某公司又开分厂啦！！</div>
								<div class="time">2016-10-01 16:12:00 </div> 
							</div>
							<div class="con"> 
								<div onclick="">震惊！！某某公司又开分厂啦！！</div>
								<div class="time">2016-10-01 16:12:00 </div> 
							</div>
							<div class="con"> 
								<div onclick="">震惊！！某某公司又开分厂啦！！</div>
								<div class="time">2016-10-01 16:12:00 </div> 
							</div> -->
						</div>
					</div>
					<div class="splitBlock"></div>
					<div id="orderCommunication" class="lastestMessage bg_white" >
						<div class="title"><span class="ml10">最新留言-订单</span></div>
						<div id="OrderAppCommunications" class="pl20" style="padding-top:10px;">
							<!-- <div class="con" >
								<div class="time">2016-10-01 16:12:00  <div class="f_r closeMessage" onclick="deleteMessage(this)">X</div></div>
								<div class="message" onclick="goForward('purchaseorder/orderDetailForSale.htm','#orderDetail','2')"><span class="bluecolor">浙江泰普森休闲用品有限公司泰普森休闲用品</span>留言：订单订单订单订单订单。。。</div>
							</div>
							<div class="con " >
								<div class="time">2016-10-01 16:12:00  <div class="f_r closeMessage" onclick="deleteMessage(this)">X</div></div>
								<div class="message" onclick="goForward('purchaseorder/orderDetailForSale.htm','#orderDetail','2')"><span class="bluecolor">浙江泰普森休闲用品有限公司</span>留言：订单订单订单。。。</div>
							</div>
							<div class="con" >
								<div class="time">2016-10-01 16:12:00  <div class="f_r closeMessage" onclick="deleteMessage(this)">X</div></div>
								<div class="message"  onclick="goForward('purchaseorder/orderDetailForSale.htm','#orderDetail','2')"><span class="bluecolor">浙江泰普森休闲用品有限公司</span>留言：订单订单订单。。。</div>
							</div> -->
						</div>
					</div>
					<div class="splitBlock"></div>
					<div id="taskCommunication" class="lastestMessage bg_white" >
						<div class="title"><span class="ml10">最新留言-任务单</span></div>
						<div id="TaskAppCommunications" class="pl20" style="padding-top:10px;">
						</div>
					</div>
					<div class="splitBlock"></div>
					<div id="AccessSuppliers" class="newSupplier bg_white">
					</div>
					<div class="splitBlock"></div>
					<div id="AcceptInvites" class="inviteAccepted bg_white" >
					</div>
					<div class="splitBlock"></div>
					<div id="ExpiredInvites" class="inviteOutTime bg_white" >
					</div>
				</div>
			</div>
		</div>
		<!--底端-->
		<div id="bottom"></div>
		<%@ include file="/newresources/js/base.jsp" %>
<!-- 		<script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/base.js"></script> -->
		<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>
<!-- 		<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
		<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
		<script type="text/javascript" src="/usercenter/purchaseManage/purchaseCenter.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.browser.js"></script>
		<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="/newresources/js/json2.js"></script>
		<script id="QualityFeedbackStmpl" type="text/x-dot-template">
		{{? it.length>0}}
         {{for(var prop in it){}}
				<div class="item " style="cursor:default;" >
								<div class="no_hover item_top clearfix">
									<div class="con1 f_l">{{= replaceNullAsStr(it[prop].product_name)}}({{= replaceNullAsStr(it[prop].product_artno)}})</div>
									<div class="con2 f_l">{{= replaceNullAsStr(it[prop].check_number)}}</div>
									<div class="con3 f_l">{{= replaceNullAsStr(it[prop].unit)}}</div>
									<div class="con4 f_l">{{= replaceNullAsStr(it[prop].check_result)}}</div>
								</div>
								<div class="no_hover time">质检日期：{{= replaceNullAsStr(it[prop].check_dt)}}</div>
							</div>
         {{}}}
			<a class="moreRecords f_r " href="/qualityFeedback/qualityFeedbackListForPurchase.htm">更多>></a>
		{{??}}
			<div class="noData">暂无数据</div>
		{{?}}
		</script>
		<script id="DeliveryNoticeStmpl" type="text/x-dot-template">
				{{? it.length>0}}
				{{for(var prop in it){}}
				<div class="item mt20 " onclick="goForward_DeliveryNotice('orderDeliveryNotice/deliveryNotifyDetailPurchase/{{= replaceNullAsStr(it[prop].delivery_notice_id)}}.htm',{{= replaceNullAsStr(it[prop].delivery_notice_id)}})">
								<div class="has_hover item_top">
									<div class="con1 f_l">通知编号：{{= replaceNullAsStr(it[prop].delivery_notice_bh)}}</div>
									<div class="con2 f_l">{{= replaceNullAsStr(it[prop].sup_cpyname_cn)}}</div>
									<div class="con3 f_l">
										已确认
									</div>
								</div>
								<div class="has_hover_time time">{{= replaceNullAsStr(it[prop].notice_dt)}}</div>
				</div>
				{{}}}
				<a class="moreRecords f_r" onclick="goForward('/orderDeliveryNotice/deliveryNotifyPurchase.htm','#delivryNotifyList','2')">更多>></a>
				{{??}}
				<div class="noData" >暂无数据</div>
				{{?}}
		</script>
		<script id="DeliverOrderStmpl" type="text/x-dot-template">
				{{? it.length>0}}
				{{for(var prop in it){}}
				<div class="item mt20" onclick="goForward_DeliverOrder('purchaseorder/orderDetailForPurchase/{{= replaceNullAsStr(it[prop].pur_order_id)}}.htm',{{= replaceNullAsStr(it[prop].pur_order_id)}})">
								<div class="has_hover item_top">
									<div class="con1 f_l">合同编号：{{= replaceNullAsStr(it[prop].agreement_bh)}}</div>
									<div class="con2 f_l">{{= replaceNullAsStr(it[prop].sup_cpyname_cn)}}</div>
									<div class="con3 f_l">{{= replaceNullAsStr(it[prop].sum_money)}}</div>
									<div class="con4 f_l">交货完成</div>
								</div>
								<div class="has_hover_time time">{{= replaceNullAsStr(it[prop].create_dt)}}</div>
				</div>
				{{}}}
				<a class="moreRecords f_r" onclick="goForward('/purchaseorder/orderManageForPurchase.htm','#purchaseOrderList',3)">更多>></a>
				{{??}}
				<div class="noData"  >暂无数据</div>
				{{?}}
		</script>
		<script id="AcceptOrderStmpl" type="text/x-dot-template">
				{{? it.length>0}}
				{{for(var prop in it){}}
							<div class="item mt20" onclick="goForward_DeliverOrder('purchaseorder/orderDetailForPurchase/{{= replaceNullAsStr(it[prop].pur_order_id)}}.htm',{{= replaceNullAsStr(it[prop].pur_order_id)}})"> 
								<div class="has_hover item_top">
									<div class="con1 f_l">合同编号：{{= replaceNullAsStr(it[prop].agreement_bh)}}</div>
									<div class="con2 f_l">{{= replaceNullAsStr(it[prop].sup_cpyname_cn)}}</div>
									<div class="con3 f_l">{{= replaceNullAsStr(it[prop].sum_money)}}</div>
									<div class="con4 f_l">已接单</div>
								</div>
								<div class="has_hover_time time">{{= replaceNullAsStr(it[prop].create_dt)}}</div>
							</div>
				{{}}}
				<a class="moreRecords f_r" onclick="goForward('/purchaseorder/orderManageForPurchase.htm','#purchaseOrderList',2)">更多>></a>
				{{??}}
				<div class="noData"  >暂无数据</div>
				{{?}}
		</script>
		<script id="DeliverTaskStmpl" type="text/x-dot-template">
				{{? it.length>0}}
				{{for(var prop in it){}}
				<div class="item mt20" onclick="goForward_producTask('externalTask/outsourceTaskInfo/{{= replaceNullAsStr(it[prop].t_id)}}.htm',{{= replaceNullAsStr(it[prop].t_id)}})" >
								<div class="has_hover item_top">
									<div class="con1 f_l">{{= replaceNullAsStr(it[prop].product_name)}}</div>
									<div class="con2 f_l">{{= replaceNullAsStr(it[prop].receive_company_name)}}</div>
									<div class="con3 f_l">{{= replaceNullAsStr(it[prop].total_qty)}}</div>
									<div class="con4 f_l">交货完成</div>
								</div>
								<div class="has_hover_time time">{{= replaceNullAsStr(it[prop].finish_task_time)}}</div>
							</div>
				{{}}}
				<a class="moreRecords f_r" onclick="goForward('/externalTask/outsourceTaskList.htm','',5)" >更多>></a>
				{{??}}
				<div class="noData"  >暂无数据</div>
				{{?}}
		</script>
		<script id="AcceptTaskStmpl" type="text/x-dot-template">
				{{? it.length>0}}
				{{for(var prop in it){}}
				<div class="item mt20" onclick="goForward_producTask('externalTask/outsourceTaskInfo/{{= replaceNullAsStr(it[prop].t_id)}}.htm',{{= replaceNullAsStr(it[prop].t_id)}})" >
								<div class="has_hover item_top">
									<div class="con1 f_l">{{= replaceNullAsStr(it[prop].product_name)}}</div>
									<div class="con2 f_l">{{= replaceNullAsStr(it[prop].receive_company_name)}}</div>
									<div class="con3 f_l">{{= replaceNullAsStr(it[prop].total_qty)}}</div>
									<div class="con4 f_l">已接单</div>
								</div>
								<div class="has_hover_time time">{{= replaceNullAsStr(it[prop].receive_time)}}</div>
							</div>
				{{}}}
				<a class="moreRecords f_r" onclick="goForward('/externalTask/outsourceTaskList.htm','',3)" >更多>></a>
				{{??}}
				<div class="noData">暂无数据</div>
				{{?}}
		</script>
		<script id="ExpiredInviteStmpl" type="text/x-dot-template">
				{{? it.length>0}}
				<div class="title"><span class="ml10">最近过期邀请</span><div class="f_r mr10 moreItems"   onclick="goForward_alternative('/supplierFiles/supplierList.htm','#supplierList',1,3)">更多>></div></div>
						<div class=" pl20" style="padding-top:10px;">
				{{for(var prop in it){}}
							<div class="con">
								<div class="report">
									<div class="bluecolor">{{= replaceNullAsStr(it[prop].accepter_name)}}</div>
									<div>邀请已过期</div>
								</div>
								<div class="time">{{= replaceNullAsStr(it[prop].create_dt)}}</div>
							</div>
				{{}}}
						</div>
				{{??}}
				<div class="title"><span class="ml10">最近过期邀请</span></div>
				<div style="padding-top:10px;"><div class="noDataForRight ml20">暂无数据</div></div>
				{{?}}
		</script>
		<script id="AcceptInviteStmpl" type="text/x-dot-template">
				{{? it.length>0}}
				<div class="title"><span class="ml10">接受邀请供应商</span><div class="f_r mr10 moreItems"  onclick="goForward_alternative('/supplierFiles/supplierList.htm','#supplierList',1,2)">更多>></div></div>
						<div class=" pl20" style="padding-top:10px;">
				{{for(var prop in it){}}
							<div class="con">
								<div class="report">
									<div class="bluecolor">{{= replaceNullAsStr(it[prop].accepter_name)}}</div>
									<div>已接受邀请</div>
								</div>
								<div class="time">{{= replaceNullAsStr(it[prop].create_dt)}}</div>
							</div>
				{{}}}
						</div>
				{{??}}
				<div class="title"><span class="ml10">接受邀请供应商</span></div>
				<div style="padding-top:10px;"><div class="noDataForRight ml20">暂无数据</div></div>
				{{?}}
		</script>
		<script id="AccessSupplierStmpl" type="text/x-dot-template">
				{{? it.length>0}}
				<div class="title"><span class="ml10">最新准入供应商</span><div class="f_r mr10 moreItems" onclick="goForward('/supplierFiles/supplierList.htm','#supplierList',0)">更多>></div></div>
						<div class="pl20" style="padding-top:10px;">
				{{for(var prop in it){}}
							<div class="con">  
								{{= replaceNullAsStr(it[prop].supplier_cpyname)}}
							</div>
				{{}}}
						</div>
				{{??}}
				<div class="title"><span class="ml10">最新准入供应商</span></div>
				<div style="padding-top:10px;"><div class="noDataForRight ml20">暂无数据</div></div>
				{{?}}
		</script>
		<script id="OrderAppCommunicationStmpl" type="text/x-dot-template">
				{{? it.length>0}}
							{{for(var prop in it){}}
							<div class="con" >
								<div class="time">{{= replaceNullAsStr(it[prop].create_time)}}  <div class="f_r closeMessage hide" onclick="deleteMessage(this,{{= replaceNullAsStr(it[prop].id)}})"><img src="/newresources/images/sale/X_grey.png"></div></div>
								<div class="message" onclick="goForward_orderCommunication('purchaseorder/orderDetailForPurchase/{{= replaceNullAsStr(it[prop].bus_id)}}.htm','#orderDetail',2,{{= replaceNullAsStr(it[prop].bus_id)}})"><span class="bluecolor">{{= replaceNullAsStr(it[prop].cpyname_cn)}}</span>留言：{{= replaceNullAsStr(it[prop].com_message)}}</div>
							</div>
							{{}}}
				{{??}}
				<div class="noDataForRight ml20">暂无数据</div>
				{{?}}
		</script>
		<script id="TaskAppCommunicationStmpl" type="text/x-dot-template">
				{{? it.length>0}}
							{{for(var prop in it){}}
							<div class="con" >
								<div class="time">{{= replaceNullAsStr(it[prop].create_time)}}  <div class="f_r closeMessage hide" onclick="deleteMessage1(this,{{= replaceNullAsStr(it[prop].id)}})"><img src="/newresources/images/sale/X_grey.png"></div></div>
								<div class="message" onclick="goForward_taskCommunication('externalTask/outsourceConnection/{{= replaceNullAsStr(it[prop].bus_id)}}.htm',{{= replaceNullAsStr(it[prop].bus_id)}})"><span class="bluecolor">{{= replaceNullAsStr(it[prop].cpyname_cn)}}</span>留言：{{=strVachar( replaceNullAsStr(it[prop].com_message),28)}}</div>
							</div>
							{{}}}
				{{??}}
				<div class="noDataForRight ml20">暂无数据</div>
				{{?}}
		</script>
		<script id="AnnouncementStmpl" type="text/x-dot-template">
				{{? it.length>0}}
							{{for(var prop in it){}}
							<div class="con"> 
								<div onclick="goAnnouncement('announcement/announcementDetail/{{= replaceNullAsStr(it[prop].web_id)}}.htm?tag=2',{{= replaceNullAsStr(it[prop].web_id)}})">{{= replaceNullAsStr(it[prop].web_title)}}</div>
								<div class="time">{{= replaceNullAsStr(it[prop].create_dt)}}</div> 
							</div>
							{{}}}
				{{??}}
				<div class="noDataForRight ml20">暂无数据</div>
				{{?}}
		</script>
	</body>
</html>