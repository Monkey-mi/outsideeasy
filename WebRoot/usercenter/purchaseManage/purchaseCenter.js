var companyId=getParamFromWindowName("companyIdForAll");
var classIds;
$(function(){
		loadCommonPage();
		$(".midd_wrap").css({minHeight:$(window).height()-200});
		$(".midd_left_wrap").css({minHeight:$(window).height()-200});
		$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		
		window.onresize=function(){	
			$(".midd_wrap").css({minHeight:$(window).height()-200});
			$(".midd_left_wrap").css({minHeight:$(window).height()-200});
			$(".midd_right_wrap").css({minHeight:$(window).height()-200});
			var minHeight=$(".midd_left_wrap").css("min-height").replace(/[^0-9]/ig,"");
			var realHeight=$(".midd_left_wrap").height();
			$(".purchaseCenterLeft,.purchaseCenterRight").css("min-height",realHeight>=minHeight?realHeight+'px':minHeight+'px');
		};
		classIds=getAllClassIdByRoleId();
		//console.log($(".purchaseCenterLeft").height());
//		if($(".purchaseCenterLeft").height()<$(".midd_left_wrap").height())
//		{
//			console.log("中间高度是"+$(".purchaseCenterLeft").height());
//			console.log("左侧高度是"+$(".midd_left_wrap").height());
//			$(".purchaseCenterLeft").css("height",$(".midd_left_wrap").height());
//		}
		var minHeight=$(".midd_left_wrap").css("min-height").replace(/[^0-9]/ig,"");
		var realHeight=$(".midd_left_wrap").height();
		$(".purchaseCenterLeft,.purchaseCenterRight").css("min-height",realHeight>=minHeight?realHeight+'px':minHeight+'px');
		if(!checkHasSecurity(25)){//没有供应商管理权限
			$("#supplier").css("display","none");
			$("#AccessSuppliers").prev().css("display","none");
			$("#AccessSuppliers").css("display","none");
			$("#AcceptInvites").prev().css("display","none");
			$("#AcceptInvites").css("display","none");
			$("#ExpiredInvites").prev().css("display","none");
			$("#ExpiredInvites").css("display","none");
		}
		if(!checkHasSecurity(33)){//没有交易管理权限
			$("#order").css("display","none");
			$("#orderCommunication").prev().css("display","none");
			$("#orderCommunication").css("display","none");
			$("#purchaseCenterOrder").css("display","none");
		}
		if(!checkHasSecurity(18)){//没有任务单权限
			$("#task").css("display","none");
			$("#taskCommunication").prev().css("display","none");
			$("#taskCommunication").css("display","none");
			$("#purchaseCenterTask").css("display","none");
		}
		if(!checkHasSecurity(35)){//没有交货管理权限
			$(".unqualifiedFeedback").css("display","none");
			$(".deliveryNotify").css("display","none");
		}
		if($("#orderCommunication:visible").length==0){
			$(".purchaseCenterRight").children("div:visible:eq(0)").removeClass("mt10");
		}
});
/*
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * create_by yangliping 2016-6-30 17:32:19
 */
function loadCommonPage(){
	$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success")
			{
			    getCompanyList(companyId);
				$("#mainNav").children().eq(0).addClass("curr");
				companyId = $("#company").val();	
				$(".company").text($("#company").find("option:selected").text());
				getAllPurchaseInfo(); 
			}
	});
	$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	var result=isLoginForPlateForm();
	if(result.isLogin==true){
		$(".midd_left_wrap").load(getwebroot()+"usercenter/purchaseManage/purchaseLeftMenu.html");
	}

}
function goForward1(url){
	window.location.href=getwebroot()+url;
}
/**
 * 鼠标移上去的样式
 * mouseOver void
 * @author yukai
 * 2016-9-12 上午9:57:27
 */
function mouseOver(){
	$(".item").mouseover(function(){
		$(this).find(".has_hover_time").addClass("item_hover");
		$(this).find(".has_hover").addClass("item_top_hover");
	});
	$(".item").mouseleave(function(){
		$(this).find(".has_hover_time").removeClass("item_hover");
		$(this).find(".has_hover").removeClass("item_top_hover");
	});
	
	$(".lastestMessage .con").mouseover(function(){
		$(this).css("background","#fafafa");
		$(this).find(".closeMessage").show();
	});

	$(".lastestMessage .con").mouseleave(function(){
		$(this).css("background","#fff");
		$(this).find(".closeMessage").hide();
	});
	
	$(".closeMessage").mouseover(function(){
		$(this).find("img").prop("src","/newresources/images/sale/X_blue.png");
	});
	$(".closeMessage").mouseleave(function(){
		$(this).find("img").prop("src","/newresources/images/sale/X_grey.png");
	});
}
/**
 * 切换tab事件
 * currtab
 * @param tabId
 * @param tabNum void
 * @author yangliping
 * 2016-6-30 17:32:19
 */
function currtab(tabId, tabNum){
	//设置点击后的切换样式
	$(tabId + " .tab").children(".curr").removeClass("curr");
	$(tabId + " .tab").children().eq(tabNum).addClass("curr");
	//根据参数决定显示内容
	$(tabId + " .tabcon").hide();
	$(tabId + " .tabcon").eq(tabNum).show();
}

/**页面跳转
 * goForward
 * @param url
 * @param tabId
 * @param tabNum void
 * @author wangjialin
 * 2016-8-29 下午4:22:35
 */
function goForward(url,tabId,tabNum){
	var param ={"tabId":tabId,"tabNum":tabNum};
	addParamsToWindowName(param);
	window.location.href=url;
	
}
/**
 * 跳转备选供应商页面
 * goForward_alternative
 * @param url
 * @param tabId
 * @param tabNum void
 * @author yukai
 * 2016-9-29 下午2:08:58
 */
function goForward_alternative(url,tabId,tabNum,inviteStatus){
	var param ={"tabId":tabId,"tabNum":tabNum,"inviteStatus":inviteStatus};
	addParamsToWindowName(param);
	window.location.href=url;
	
}
/**
 * 跳转线下验厂页面
 * goForward_alternative
 * @param url
 * @param tabId
 * @param tabNum void
 * @author yukai
 * 2016-9-29 下午2:08:58
 */
function goForward_checkFactory(url,tabId,tabNum,informStatus){
	var param ={"tabId":tabId,"tabNum":tabNum,"informStatus":informStatus};
	addParamsToWindowName(param);
	window.location.href=url;
	
}
/**
 * 跳转线下验厂页面
 * goForward_alternative
 * @param url
 * @param tabId
 * @param tabNum void
 * @author yukai
 * 2016-9-29 下午2:08:58
 */
function goForward_checkFactory1(url,tabId,tabNum,checkType){
	var param ={"tabId":tabId,"tabNum":tabNum,"checkType":checkType};
	addParamsToWindowName(param);
	window.location.href=url;
	
}
/**
 * 跳转公告页面
 * goAnnouncement
 * @param url
 * @param web_id void
 * @author yukai
 * 2016-11-10 上午9:18:00
 */
function goAnnouncement(url,web_id){
	var param ={"webId":web_id};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+url;
}
/**
 * 跳转订单交流合作页面
 * goForward_Communication
 * @param url
 * @param tabId
 * @param tabNum
 * @param order_id void
 * @author yukai
 * 2016-9-7 下午4:59:27
 */
function goForward_orderCommunication(url,tabId,tabNum,order_id){
	var param ={"tabId":tabId,"tabNum":tabNum,"order_id":order_id};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+url;
}
/**
 * 跳转任务单单交流合作页面
 * goForward_Communication
 * @param url
 * @param tabId
 * @param tabNum
 * @param order_id void
 * @author yukai
 * 2016-9-7 下午4:59:27
 */
function goForward_taskCommunication(url,order_id){
	var param ={"task_id":order_id};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+url;
}
/**跳转门户
 * goForward
 * @param url
 * @author yukai
 * 2016-8-30 
 */
function goForward_window(url){
	var param ={"companyIdForWindow":companyId};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+url;
	
}
/**跳转送货通知明细
 * goForward
 * @param url
 * @author yukai
 * 2016-9-7 
 */
function goForward_DeliveryNotice(url,delivery_notice_id){
	var param ={"deliveryNoticeIdForPur":delivery_notice_id};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+url;
	
}
/**
 * 跳转生产任务单明细
 * goForward_producTask
 * @param url
 * @param t_id void
 * @author yukai
 * 2016-8-31 下午4:58:26
 */
function goForward_producTask(url,t_id){
	var param ={"task_id":t_id};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+url;
}
/**
 * 跳转交货订单明细
 * goForward_DeliverOrder
 * @param url
 * @param t_id void
 * @author yukai
 * 2016-8-31 下午4:58:26
 */
function goForward_DeliverOrder(url,pur_order_id){
	var param ={"order_id":pur_order_id};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+url;
}
/**最新留言处删除留言
 * deleteMessage void
 * @author wangjialin
 * 2016-8-29 上午11:19:54
 */
function deleteMessage(e,commu_id){
	var url="saleCenterCtrl/addAccountCommunDel.do";
	var params={};
	params.commu_id=commu_id;
	var fn=function(result){
		getLastThreeOrderAppCommunication();
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**最新任务单留言处删除留言
 * deleteMessage void
 * @author wangjialin
 * 2016-8-29 上午11:19:54
 */
function deleteMessage1(e,commu_id){
	var url="saleCenterCtrl/addAccountCommunDel.do";
	var params={};
	params.commu_id=commu_id;
	var fn=function(result){
		getLastThreeTaskAppCommunication();
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**获取所有采购中心页面数据
 * getAllPurchaseInfo void
 * @author yukai
 * 2016-9-12 下午3:57:14
 */
function getAllPurchaseInfo(){
	var url="purchaseCenterCtrl/getAllPurchaseInfo.do";
	var params={};
	params.pur_company_id=companyId;
	var fn=function(result){
		addQualityTestItem(result.data.qualityFeedback);
		addDeliveryNoticeItem(result.data.deliveryNotice);
		addDeliverOrderItem(result.data.deliverOrder);
		addAcceptOrderItem(result.data.acceptOrder);
		addDeliverTaskItem(result.data.deliverTask);
		addAcceptTaskItem(result.data.acceptTask);
		addExpiredInviteItem(result.data.expiredInvite);
		addAcceptInviteItem(result.data.acceptInvite);
		addAccessSupplierItem(result.data.accessSupplier);
		getTaskCountOfAllState(result.data.allTaskCount);
		getOrderCountOfAllState(result.data.allOrderCount);
		addAnnouncementItem(result.data.announcement);
		getLastThreeOrderAppCommunication();
		getLastThreeTaskAppCommunication();
		getToBeConfirmedDeliveryNoticeCount(result.data.toBeConfirmedDeliveryNoticeCount);
		getNeedCheckFactoryCountForFirstCheck(result.data.needCheckFactoryCountForFirstCheck);
		getNeedCheckFactoryCountForReviewCheck(result.data.needCheckFactoryCountForReviewCheck);
		getCountOfAccessState(result.data.countOfAccessState);
		mouseOver();
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 获取最新三条订单留言回复
 * getLastThreeAppCommunication void
 * @author yukai
 * 2016-9-7
 */
function getLastThreeOrderAppCommunication(){
	var url="saleCenterCtrl/getLastThreeOrderAppCommunication.do";
	var params={};
	params.pur_company_id=companyId;
	params.module_type=1;
	var fn=function(result){
		addOrderAppCommunicationItem(result.data);
		mouseOver();
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 获取最新三条任务单留言回复
 * getLastThreeAppCommunication void
 * @author yukai
 * 2016-9-7
 */
function getLastThreeTaskAppCommunication(){
	var url="saleCenterCtrl/getLastThreeTaskrAppCommunication.do";
	var params={};
	params.pur_company_id=companyId;
	params.module_type=0;
	var fn=function(result){
		addTaskAppCommunicationItem(result.data);
		mouseOver();
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * doT模板加载质检HTML 
 * addQualityTestItem
 * @param result void
 * @author yukai
 * 2016-8-30 
 */
function addQualityTestItem(result){
	var evalText=doT.template($("#QualityFeedbackStmpl").text());
	$("#QualityFeedbacks").html(evalText(result));
}
/**
 * doT模板加载送货通知HTML 
 * addDeliveryNoticeItem
 * @param result void
 * @author yukai
 * 2016-9-7
 */
function addDeliveryNoticeItem(result){
	var evalText=doT.template($("#DeliveryNoticeStmpl").text());
	$("#DeliveryNotices").html(evalText(result));
}
/**
 * doT模板加载交货订单HTML 
 * addDeliverOrderItem
 * @param result void
 * @author yukai
 * 2016-8-31 下午3:21:32
 */
function addDeliverOrderItem(result){
	var evalText=doT.template($("#DeliverOrderStmpl").text());
	$("#DeliverOrders").html(evalText(result));
} 
/**
 * doT模板加载已接订单HTML 
 * addDeliverOrderItem
 * @param result void
 * @author yukai
 * 2016-8-31 下午3:21:32
 */
function addAcceptOrderItem(result){
	var evalText=doT.template($("#AcceptOrderStmpl").text());
	$("#AcceptOrders").html(evalText(result));
} 
/**
 * doT模板加载交货任务单HTML 
 * addDeliverOrderItem
 * @param result void
 * @author yukai
 * 2016-8-31 下午3:21:32
 */
function addDeliverTaskItem(result){
	var evalText=doT.template($("#DeliverTaskStmpl").text());
	$("#DeliverTasks").html(evalText(result));
} 
/**
 * doT模板加载已接任务单HTML 
 * addDeliverOrderItem
 * @param result void
 * @author yukai
 * 2016-8-31 下午3:21:32
 */
function addAcceptTaskItem(result){
	var evalText=doT.template($("#AcceptTaskStmpl").text());
	$("#AcceptTasks").html(evalText(result));
} 
/**
 * doT模板加载过期邀请HTML 
 * addDeliverOrderItem
 * @param result void
 * @author yukai
 * 2016-8-31 下午3:21:32
 */
function addExpiredInviteItem(result){
	var evalText=doT.template($("#ExpiredInviteStmpl").text());
	$("#ExpiredInvites").html(evalText(result));
} 
/**
 * doT模板加载已接邀请HTML 
 * addDeliverOrderItem
 * @param result void
 * @author yukai
 * 2016-8-31 下午3:21:32
 */
function addAcceptInviteItem(result){
	var evalText=doT.template($("#AcceptInviteStmpl").text());
	$("#AcceptInvites").html(evalText(result));
} 
/**
 * doT模板加载准入供应商HTML 
 * addDeliverOrderItem
 * @param result void
 * @author yukai
 * 2016-8-31 下午3:21:32
 */
function addAccessSupplierItem(result){
	var evalText=doT.template($("#AccessSupplierStmpl").text());
	$("#AccessSuppliers").html(evalText(result));
} 
/**
 * doT模板加载订单留言HTML 
 * addAppCommunicationItem
 * @param result void
 * @author yukai
 * 2016-9-7
 */
function addOrderAppCommunicationItem(result){
	var evalText=doT.template($("#OrderAppCommunicationStmpl").text());
	$("#OrderAppCommunications").html(evalText(result));
}
/**
 * doT模板加载任务单留言HTML 
 * addAppCommunicationItem
 * @param result void
 * @author yukai
 * 2016-9-7
 */
function addTaskAppCommunicationItem(result){
	var evalText=doT.template($("#TaskAppCommunicationStmpl").text());
	$("#TaskAppCommunications").html(evalText(result));
}
/**
 * 获取采购方各种状态任务单的数量
 * getTaskCountOfAllState void
 * @author yukai
 * 2016-8-31 上午10:11:35
 */
function getTaskCountOfAllState(result){
	if(result.sended==0){
		$("#sended").text("("+result.sended+")");
		$("#sended").css('color','grey');
	}else{
		$("#sended").text("("+result.sended+")");
	}
	if(result.producting==0){
		$("#producting").text("("+result.producting+")");
		$("#producting").css('color','grey');
	}else{
		$("#producting").text("("+result.producting+")");
	}
	if(result.finishproduct==0){
		$("#finishproduct").text("("+result.finishproduct+")");
		$("#finishproduct").css('color','grey');
	}else{
		$("#finishproduct").text("("+result.finishproduct+")");
	}
	if(result.toBeSend==0){
		$("#toBeSend").text("("+result.toBeSend+")");
		$("#toBeSend").css('color','grey');
	}else{
		$("#toBeSend").text("("+result.toBeSend+")");
	}
}
/**
 * 获取采购方各种状态订单的数量
 * getOrderCountOfAllState void
 * @author yukai
 * 2016-8-31 上午10:11:35
 */
function getOrderCountOfAllState(result){
	if(result.queryOrderCount==0){
		$("#queryOrderCount").text("("+result.queryOrderCount+")");
		$("#queryOrderCount").css('color','grey');
	}else{
		$("#queryOrderCount").text("("+result.queryOrderCount+")");
	}
	if(result.comimtOrderCount==0){
		$("#comimtOrderCount").text("("+result.comimtOrderCount+")");
		$("#comimtOrderCount").css('color','grey');
	}else{
		$("#comimtOrderCount").text("("+result.comimtOrderCount+")");
	}
}
/**
 * 查询待确认送货通知数量
 * getToBeConfirmedDeliveryNoticeCount void
 * @author yukai
 * 2016-9-7 下午2:43:41
 */
function getToBeConfirmedDeliveryNoticeCount(result){
	if(result==0){
		$("#toBeConfirmedDeliveryNotice").text("("+result+")");
		$("#toBeConfirmedDeliveryNotice").css('color','grey');
	}else{
		$("#toBeConfirmedDeliveryNotice").text("("+result+")");
	}
}
/**
 * 查询待确认送货通知数量
 * getToBeConfirmedDeliveryNoticeCount void
 * @author yukai
 * 2016-9-7 下午2:43:41
 */
function getNeedCheckFactoryCountForFirstCheck(result){
	if(result==0){
		$("#needCheckFactoryCountForFirstCheck").text("("+result+")");
		$("#needCheckFactoryCountForFirstCheck").css('color','grey');
	}else{
		$("#needCheckFactoryCountForFirstCheck").text("("+result+")");
	}
}
/**
 * 查询待确认送货通知数量
 * getToBeConfirmedDeliveryNoticeCount void
 * @author yukai
 * 2016-9-7 下午2:43:41
 */
function getNeedCheckFactoryCountForReviewCheck(result){
	if(result==0){
		$("#needCheckFactoryCountForReviewCheck").text("("+result+")");
		$("#needCheckFactoryCountForReviewCheck").css('color','grey');
	}else{
		$("#needCheckFactoryCountForReviewCheck").text("("+result+")");
	}
}
/**
 * 获取待确认邀请数量
 * getCountOfAccessState void
 * @author yukai
 * 2016-8-31 上午11:25:15
 */
function getCountOfAccessState(result){
	if(result.toBeReceivedInvite==0){
		$("#toBeReceivedInvite").text("("+result.toBeReceivedInvite+")");
		$("#toBeReceivedInvite").css('color','grey');
	}else{
		$("#toBeReceivedInvite").text("("+result.toBeReceivedInvite+")");
	}
	if(result.toBeConfirmedCheckInform==0){
		$("#toBeConfirmedCheckInform").text("("+result.toBeConfirmedCheckInform+")");
		$("#toBeConfirmedCheckInform").css('color','grey');
	}else{
		$("#toBeConfirmedCheckInform").text("("+result.toBeConfirmedCheckInform+")");
	}
}
/**
 * 根据登录账号的role_id查询所有class_id
 * getAllClassIdByRoleId void
 * @author yukai
 * 2016-9-26 上午9:42:36
 */
function getAllClassIdByRoleId(){
	var classIds;
	var url="purchaseCenterCtrl/getAllClassIdByRoleId.do";
	var params={};
	var fn=function(result){
		classIds=result.data;
	};
	asyncAjaxMethod(url,params,false,fn);
	return classIds;
}
/**
 * 检查是否有权限
 * checkHasSecurity void
 * @author yukai
 * 2016-9-26 上午10:02:39
 */
function checkHasSecurity(classId){
	var flag=false;
	for(var i=0;i<classIds.length;i++){
		if(classId==classIds[i]){
			flag=true;
		}
	}
	return flag;
}
/**
 * doT模板加载最新公告HTML 
 * addAnnouncementItem
 * @param result void
 * @author yukai
 * 2016-11-9 下午1:26:37
 */
function addAnnouncementItem(result){
	var evalText=doT.template($("#AnnouncementStmpl").text());
	$("#announcements").html(evalText(result));
} 