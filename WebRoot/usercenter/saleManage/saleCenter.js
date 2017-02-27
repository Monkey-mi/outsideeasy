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
			$(".saleCenterLeft,.saleCenterRight").css("min-height",realHeight>=minHeight?realHeight+'px':minHeight+'px');
		};		
		classIds=getAllClassIdByRoleId();
		var minHeight=$(".midd_left_wrap").css("min-height").replace(/[^0-9]/ig,"");
		var realHeight=$(".midd_left_wrap").height();
		$(".saleCenterLeft,.saleCenterRight").css("min-height",realHeight>=minHeight?realHeight+'px':minHeight+'px');
		if(!checkHasSecurity(27)){//没有客户管理权限
			$("#customer").css("display","none");
			$("#NewCustomers").prev().css("display","none");
			$("#NewCustomers").css("display","none");
			$("#CheckFactorys").prev().css("display","none");
			$("#CheckFactorys").css("display","none");
			$("#MaterialChecks").prev().css("display","none");
			$("#MaterialChecks").css("display","none");
		}
		if(!checkHasSecurity(28)){//没有交易管理权限
			$("#order").css("display","none");
			$("#orderCommunication").prev().css("display","none");
			$("#orderCommunication").css("display","none");
			$("#saleCenterOrder").css("display","none");
		}
		if(!checkHasSecurity(19)){//没有任务单权限
			$("#task").css("display","none");
			$("#taskCommunication").prev().css("display","none");
			$("#taskCommunication").css("display","none");
			$("#saleCenterTask").css("display","none");
		}
		if(!checkHasSecurity(34)){//没有交货管理权限
			$(".unqualifiedFeedback").css("display","none");
			$(".deliveryNotify").css("display","none");
		}
		if($("#orderCommunication:visible").length==0){
			$(".saleCenterRight").children("div:visible:eq(0)").removeClass("mt10");
		}
});
/*
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * create_by yangliping 2016-6-30 17:32:19
 */
function loadCommonPage(){
	var result=isLoginForPlateForm();
	var isVip=getCookie("isVip");
//	if(result.data!=null && result.data.vip==true){
	if(isVip=="true"){
		$("#top").load(getwebroot()+"vip/platform/vipTop.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				getCompanyList(companyId);
				$("#mainNav").children().eq(0).addClass("curr");
				companyId = $("#company").val();
				$(".company").text($("#company").find("option:selected").text());
				getAllSaleCenterInfo();
			}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		if(result.isLogin)
			$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/saleManage/vipSaleLeftMenu.html");
	}else{
		$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				getCompanyList(companyId);
				$("#mainNav").children().eq(1).addClass("curr");
				companyId = $("#company").val();
				$(".company").text($("#company").find("option:selected").text());
				getAllSaleCenterInfo();
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		if(result.isLogin)
			$(".midd_left_wrap").load(getwebroot()+"usercenter/saleManage/saleLeftMenu.html");
	}
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

function goForward1(url){
	window.location.href=getwebroot()+url;
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
 * 2016-8-29 上午11:19:31
 */
function goForward(url,tabId,tabNum){
	var param ={"tabId":tabId,"tabNum":tabNum};
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
/**跳转质检
 * goForward
 * @param url
 * @author yukai
 * 2016-8-30 
 */
function goForward_qualityTest(url,check_detail_id){
	var param ={"check_detail_id":check_detail_id};
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
/**跳转送货通知明细
 * goForward
 * @param url
 * @author yukai
 * 2016-9-7 
 */
function goForward_DeliveryNotice(url,delivery_notice_id){
	var param ={"deliveryNoticeId":delivery_notice_id};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+url;
	
}
/**最新订单留言处删除留言
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
/**获取所有销售中心页面数据
 * getAllSaleCenterInfo void
 * @author yukai
 * 2016-9-12 下午3:57:14
 */
function getAllSaleCenterInfo(){
	var url="saleCenterCtrl/getAllSaleCenterInfo.do";
	var params={};
	params.sup_company_id=companyId;
	var fn=function(result){
		addQualityTestItem(result.data.qualityFeedback);
		addNewCustomerItem(result.data.newCustomer);
		addCheckFactoryItem(result.data.checkFactory);
		addMaterialCheckItem(result.data.materialCheck);
		addDeliverOrderItem(result.data.deliverOrder);
		addExceptionalOrderItem(result.data.exceptionalOrder);
		addDeliverTaskItem(result.data.deliverTask);
		addDeliveryNoticeItem(result.data.deliveryNotice);
		getTaskCountOfAllState(result.data.allTaskCount);
		getOrderCountOfAllState(result.data.allOrderCount);
		addAnnouncementItem(result.data.announcement);
		getLastThreeOrderAppCommunication();
		getLastThreeTaskAppCommunication();
		getToBeConfirmedDeliveryNoticeCount(result.data.toBeConfirmedDeliveryNoticeCount);
		getCountOfAccessState(result.data.countOfAccessState);
		mouseOver();
		$("body").css("display","block");
	};
	if(companyId != undefined || companyId != null){
		asyncAjaxMethod(url,params,true,fn);
	}
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
 * doT模板加载新客户HTML 
 * addQualityTestItem
 * @param result void
 * @author yukai
 * 2016-8-30 
 */
function addNewCustomerItem(result){
	var evalText=doT.template($("#NewCustomerStmpl").text());
	$("#NewCustomers").html(evalText(result));
}
/**
 * doT模板加载验厂报告HTML 
 * addQualityTestItem
 * @param result void
 * @author yukai
 * 2016-8-30 
 */
function addCheckFactoryItem(result){
	var evalText=doT.template($("#CheckFactoryStmpl").text());
	$("#CheckFactorys").html(evalText(result));
}
/**
 * doT模板加载物料确认HTML 
 * addQualityTestItem
 * @param result void
 * @author yukai
 * 2016-8-30 
 */
function addMaterialCheckItem(result){
	var evalText=doT.template($("#MaterialCheckStmpl").text());
	$("#MaterialChecks").html(evalText(result));
} 
/**
 * 获取销售方各种状态任务单的数量
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
}
/**
 * 获取销售方各种状态订单的数量
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
 * 获取准入邀请、准入申请各状态数量
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
	if(result.toBeSubmittedAccess==0){
		$("#toBeSubmittedAccess").text("("+result.toBeSubmittedAccess+")");
		$("#toBeSubmittedAccess").css('color','grey');
	}else{
		$("#toBeSubmittedAccess").text("("+result.toBeSubmittedAccess+")");
	}
	
	if(result.toBeReturnedAccess==0){
		$("#toBeReturnedAccess").text("("+result.toBeReturnedAccess+")");
		$("#toBeReturnedAccess").css('color','grey');
	}else{
		$("#toBeReturnedAccess").text("("+result.toBeReturnedAccess+")");
	}
	if(result.toBeConfirmedCheckInform==0){
		$("#toBeConfirmedCheckInform").text("("+result.toBeConfirmedCheckInform+")");
		$("#toBeConfirmedCheckInform").css('color','grey');
	}else{
		$("#toBeConfirmedCheckInform").text("("+result.toBeConfirmedCheckInform+")");
	}
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
 * doT模板加载异常订单HTML 
 * addDeliverOrderItem
 * @param result void
 * @author yukai
 * 2016-8-31 下午3:21:32
 */
function addExceptionalOrderItem(result){
	var evalText=doT.template($("#ExceptionalOrderStmpl").text());
	$("#ExceptionalOrders").html(evalText(result));
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
 * 获取最新三条订单留言回复
 * getLastThreeAppCommunication void
 * @author yukai
 * 2016-9-7
 */
function getLastThreeOrderAppCommunication(){
	var url="saleCenterCtrl/getLastThreeOrderAppCommunication.do";
	var params={};
	params.sup_company_id=companyId;
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
	params.sup_company_id=companyId;
	params.module_type=0;
	var fn=function(result){
		addTaskAppCommunicationItem(result.data);
		mouseOver();
	};
	asyncAjaxMethod(url,params,true,fn);
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