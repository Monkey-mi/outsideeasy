var modifyStatu = 0;//0:待确认； 1：修改交期待确认
if(window.name==""){
	var urlPara = location.search; //获取参数部分
	urlPara=unescape(urlPara);//对参数解密
	function getPara(paraName){
		var reg = new RegExp("[&|?]"+paraName+"=([^&$]*)", "gi");
		var a = reg.test(urlPara);
		return a ? RegExp.$1 : "";
		}
	//捕获参数并进行操作
	var companyId= getPara("companyId"); //捕获到url参数
	var deliveryNoticeId = getPara("deliveryNoticeId");//通知状态
	var isModify = getPara("modifyDate");//是否处于修改状态
	modifyStatu = getPara("ms") == ""?0:getPara("ms");//0:交期待确认； 1：交期修改待确认；
	addParamsToWindowName({"companyIdForAll":companyId});
	addParamsToWindowName({"deliveryNoticeId":deliveryNoticeId});
}else{
	var companyId = getParamFromWindowName("companyIdForAll");//公司ID
	var deliveryNoticeId = getParamFromWindowName("deliveryNoticeId");//通知状态
	var isModify = getParamFromWindowName("modifyDate");//是否处于修改状态
}
/*
 * 页面加载事件
 * create_by yangliping 2016-6-30 17:32:19
 * */ 
$(function(){
		loadCommonPage();
		$(".midd_wrap").css({minHeight:$(window).height()-200});
		$(".midd_left_wrap").css({minHeight:$(window).height()-200});
		$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		
		window.onresize=function(){	
			$(".midd_wrap").css({minHeight:$(window).height()-200});
			$(".midd_left_wrap").css({minHeight:$(window).height()-200});
			$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		};
		$('.lookForMore').on("click", function() {
			$(this).parent('.deliveryNotify_con').find(".products").niceScroll({
				cursorcolor: "#ccc", //#CC0071 光标颜色 
				cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
				touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
				cursorwidth: "5px", //像素光标的宽度 
				cursorborder: "0", //     游标边框css定义 
				cursorborderradius: "5px", //以像素为光标边界半径 
				autohidemode: true //是否隐藏滚动条 
			});
		});
		getOrderDeliverNotice(0);//默认按订单排序
});

/*
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * create_by yangliping 2016-6-30 17:32:19
 */
function loadCommonPage(){
	var result = isLoginForPlateForm();
	var isVip=getCookie("isVip");
//	if(result.data!=null && result.data.vip == true){
	if(isVip=="true"){
		$("#top").load(getwebroot()+"vip/platform/vipTop.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				getCompanyList(companyId);
				$("#mainNav").children().eq(0).addClass("curr");
			}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
	}else{
		$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				getCompanyList(companyId);
				$("#mainNav").children().eq(1).addClass("curr");
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	}
}
/**
 * 切换tab事件
 * currtab
 * @param tabId
 * @param tabNum void
 * @author yangliping
 * 2016-6-30 17:32:19
 */
function currtab(title,tabId, tabNum){
	//设置点击后的切换样式
	$(title+" .tab").children(".curr").removeClass("curr");
	$(title+" .tab").children().eq(tabNum+1).addClass("curr");
	//根据参数决定显示内容
	$(tabId + " .tabcon").hide();
	$(tabId + " .tabcon").eq(tabNum).show();
	
	var showType = 0;//按订单排序
	if(tabNum == 1){//按产品展示
		showType = 1;
	}
	getOrderDeliverNotice(showType);
}

/**
 * 获取通知详细信息
 * getOrderDeliverNotice
 * @param showType void
 * @author mishengliang
 * 2016-8-31 下午4:41:57
 */
function getOrderDeliverNotice(showType){
	var url = "orderDeliveryNotice/getOrderDeliveryNoticeListInfo.do";
	var param = {};
	param.deliveryNoticeId = deliveryNoticeId;
	param.showType = showType;//oreder 0:订单排序  product 1:产品排序
	param.supCompanyId = companyId;
	var fn = function(result){
		if(showType == 0){
			var evalText=doT.template($("#showOrder").text());
			$("#byOrder").html(evalText(result.data[0]));
		}else if(showType == 1){
			var evalText=doT.template($("#showProduct").text());
			$("#byProduct").html(evalText(result.data[0]));
		}
		
		if(result.data[0].notice_status == 0){
			modifyStatu = 0;
		}else if(result.data[0].notice_status == 1){
			modifyStatu = 1;
		}
		
		if(isModify == "modify" && showType == 0){//展示修改状态
			$("#byOrder .operates .modifyDate").trigger("click");
		}
	};
	asyncAjaxMethod(url,param,true,fn);
}

/**
 * 确认修改交期
 * confirmDeliveryTime
 * @param thisEvent
 * @param noticeId 
 * @author mishengliang
 * 2016-8-31 上午10:19:38
 */
function confirmDeliveryTime(thisEvent,noticeId){
	var url = "orderDeliveryNotice/updateDeliveryStatue.do";
	var params = {};
	params.noticeId = noticeId;
	params.noticeStatus = 2;
	var fn = function(result){
		$(thisEvent).parents(".operates").prev().find(".fs16_bold").html("已确认");
		$(thisEvent).next().hide();
		$(thisEvent).hide();
	};
	 window.wxc.xcConfirm("您要确认该送货通知吗？", window.wxc.xcConfirm.typeEnum.confirm,{	
			onOk:function(){
				asyncAjaxMethod(url,params,true,fn);
			},
			onCancel:function(){}
		});
}

$(".map").mouseover(function(){
	$(this).parent(".con3").find(".address").show();
});
$(".map").mouseleave(function(){
	$(this).parent(".con3").find(".address").hide();
});

/**
 * 修改交期
 * modifyTimeByOrder
 * @param thisEvent void
 * @author mishengliang
 * 2016-9-6 下午3:11:45
 */
function modifyTimeByOrder(thisEvent){
	$(thisEvent).prev().hide();
	$(thisEvent).hide();
	$(thisEvent).nextAll(".modify").show();
	$(".product .deadline span").hide();
	$(".product .deadline .Wdate").show();
}

/**
 * 取消修改日期
 * cancelModify
 * @param thisEvent void
 * @author mishengliang
 * 2016-9-6 下午4:15:36
 */
function cancelModify(thisEvent){
	if(modifyStatu == 0){//交期待确认
		$(thisEvent).prevAll().show();
		$(thisEvent).prev().hide();
		//$(thisEvent).prev().prev().hide();
	}else if(modifyStatu == 1){//修改交期待确认
		$(thisEvent).prevAll().show();
		$(thisEvent).prev().hide();
		$(thisEvent).prev().prev().prev().hide();
	}
	$(thisEvent).hide();
	
	$(".product .deadline").each(function(index,e){//前段重新赋值
		$(e).find("span").html($(e).find(".hideConfirm").val());
		$(e).find(".Wdate").val($(e).find(".hideConfirm").val());
	});
	
	$(".product .deadline .Wdate").hide();
	$(".product .deadline span").show();
}

/**
 * 提交批量修改日期
 * submitModifyForOrder
 * @author mishengliang
 * 2016-9-6 下午4:54:06
 */
function submitModifyForOrder(thisEvent,modType,noticeId){
	var urlout = "orderDeliveryNotice/getDeliveryStatu.do";
	var paramsout = {noticeId:noticeId};
	var fnout = function(result){//无操作
		if(result.staut != 2){//未确认
			var arri= 0;
			var modifyConfirmDates = {};
			var dateArray = new Array();
			$(".product .deadline").each(function(index,e){
				if($(e).find(".Wdate").val() != $(e).find(".hideConfirm").val()){
					var detailsId = parseInt($(e).find(".detailsId").val());
					var newParam = {};
					newParam[detailsId] = $(e).find(".Wdate").val();
					dateArray[arri++] = newParam;
				}
			});
			
			var url = "orderDeliveryNotice/updateConfirmDate.do";
			var params = {};
			params.dateArray = JSON.stringify(dateArray);
			params.noticeId = noticeId;
			if(modType == "save"){//保存修改：待确认状态
				params.noticeStatus = 1;
			}else if(modType == "submit"){//提交修改：确认状态
				params.noticeStatus = 2;
			}
			var isasync = true;
			var fn = function(result){
				if(modType == "save"){//保存修改：待确认状态
					$(thisEvent).parent().prev().find(".fs16_bold").html("交期修改待确认");
					$(thisEvent).next().hide();
					$(thisEvent).hide();
					$(thisEvent).prev().show();
					/*$(thisEvent).prev().prev().show();
			$(thisEvent).prev().prev().prev().show();*/
					
					$(".product .deadline").each(function(index,e){//前段重新赋值
						if($(e).find(".Wdate").val() != $(e).find(".hideConfirm").val()){
							$(e).find("span").removeClass("changed");//先去除不一样样式
							$(e).find(".hideConfirm").val($(e).find(".Wdate").val());
							$(e).find("span").html($(e).find(".Wdate").val());
							if($(e).find(".Wdate").val() != $(e).prev().html()){//判断是否和通知交期相同
								$(e).find("span").addClass("changed");
							}
						}
					});
					
					$(".product .deadline span").show();
					$(".product .deadline .Wdate").hide();
					modifyStatu = 1;
				}else if(modType == "submit"){//提交修改：确认状态
					$(thisEvent).parent().prev().find(".fs16_bold").html("已确认");
					$(thisEvent).next().hide();
					$(thisEvent).next().next().hide();
					$(thisEvent).hide();
					
					$(".product .deadline").each(function(index,e){//前段重新赋值
						if($(e).find(".Wdate").val() != $(e).find(".hideConfirm").val()){
							$(e).find(".hideConfirm").val($(e).find(".Wdate").val());
							$(e).find("span").html($(e).find(".Wdate").val());
							$(e).find("span").addClass("changed");
						}
					});
					
					$(".product .deadline span").show();
					$(".product .deadline .Wdate").hide();
					modifyStatu = 2;
				}
			};
			asyncAjaxMethod(url,params,isasync,fn);	
		}else{//已确认过，不能再次修改
			var txt=  "通知已确认，不能再次修改。";
			  var option = {
			  	hasTitle:true,
			  	title: "温馨提示",
			  	onOk:function(){
			  		location.reload();
			  	},
			  	onClose:function(){
			  		location.reload();
			  	}
			  };
			  window.wxc.xcConfirm(txt,window.wxc.xcConfirm.typeEnum.info, option);
		}
	};
	asyncAjaxMethod(urlout,paramsout,false,fnout);
}

function modifyTimeByProduct(e){
	$(e).hide();
	$(e).prev("button").hide();
	$(e).next(".operates").show();
	$(e).closest(".notifyDetailBody").find(".deadline").html("<input type='text' class='Wdate greycolor' onclick='WdatePicker({readOnly:true})'>");
}