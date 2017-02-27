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
	var deliveryNoticeId = getPara("deliveryNoticeIdForPur");//通知状态
	addParamsToWindowName({"companyIdForAll":companyId});
	addParamsToWindowName({"deliveryNoticeIdForPur":deliveryNoticeId});
}else{
	var companyId = getParamFromWindowName("companyIdForAll");//公司ID
	var deliveryNoticeId = getParamFromWindowName("deliveryNoticeIdForPur");//通知状态
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
				cursorborder: "0", //游标边框css定义 
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
	$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success")
			{
				$("#mainNav").children().eq(0).addClass("curr");
				getCompanyList(companyId);
			}
	});
	$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
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
	var param ={tabNum:tabNum};
	addParamsToWindowName(param);
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
	param.purCompanyId = companyId;
	var fn = function(result){
		if(showType == 0){
			var evalText=doT.template($("#showOrder").text());
			$("#byOrder").html(evalText(result.data[0]));
		}else if(showType == 1){
			var evalText=doT.template($("#showProduct").text());
			$("#byProduct").html(evalText(result.data[0]));
		}
	};
	asyncAjaxMethod(url,param,true,fn);
}

$(".map").mouseover(function(){
	$(this).parent(".con3").find(".address").show();
});
$(".map").mouseleave(function(){
	$(this).parent(".con3").find(".address").hide();
});

function modifyTimeByOrder(e){
	$(e).parent(".operates").html("<button class='modify f_r'>提交修改</button><button class='modify  f_r mr20' >取消</button>");
	$("#byOrder").find(".deadline").html("<input type='text' class='Wdate greycolor' onclick='WdatePicker({readOnly:true})'>");
}
function modifyTimeByProduct(e){
	$(e).hide();
	$(e).prev("button").hide();
	$(e).next(".operates").show();
	$(e).closest(".notifyDetailBody").find(".deadline").html("<input type='text' class='Wdate greycolor' onclick='WdatePicker({readOnly:true})'>");
}

/**
 * 确认修改交期
 * confirmDeliveryTime
 * @param thisEvent
 * @param noticeId 
 * @author mishengliang
 * 2016-8-31 上午10:19:38
 */
function confirmDeliveryTime(thisEvent,noticeId,updateDt){
	var urlout = "orderDeliveryNotice/getDeliveryUdt.do";
	var paramsout = {noticeId:noticeId};
	var fnout = function(result){//无操作
		if(result.updateInfo.update_dt == updateDt){//更新时间一致
			var url = "orderDeliveryNotice/updateConfirmDeliveryStatue.do";
			var params = {};
			params.noticeId = noticeId;
			params.noticeStatus = 2;
			
			var isasync = true;
			var fn = function(result){
				$(thisEvent).parent().prev().find(".fs16_bold").html("已确认");
				$(thisEvent).prev().hide();
				$(thisEvent).hide();
			};
			asyncAjaxMethod(url,params,isasync,fn);
		}else{//更新时间不一致
			var txt=  "通知时间已更新，需刷新确认。";
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
	 window.wxc.xcConfirm("您要确认该送货通知吗？", window.wxc.xcConfirm.typeEnum.confirm,{	
			onOk:function(){
				asyncAjaxMethod(urlout,paramsout,false,fnout);
			},
			onCancel:function(){}
		});
}