var pageSize = 4;//每页个数	
var currentPage=0;//当前页码
var companyId = getParamFromWindowName("companyIdForAll");//公司ID
var noticeStatus;//当前送货状态
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
		var tabId=getParamFromWindowName("tabId");
		var tabNum=getParamFromWindowName("tabNum");
		if(tabId==undefined){
			tabId="#delivryNotifyList";
		}
		if(tabNum==undefined){
			tabNum=0;
		}
		currtab(tabId, tabNum);
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
				$("#mainNav").children().eq(0).addClass("curr");
				getCompanyList(companyId);
			}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/saleManage/vipSaleLeftMenu.html",function(){
				$("#evaluation").children().eq(5).children().eq(0).find("a").prepend(">>");
				$("#evaluation").children().eq(5).children().eq(0).addClass("currVip");
			});
		}
	}else{
		$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#mainNav").children().eq(1).addClass("curr");
				getCompanyList(companyId);
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"usercenter/saleManage/saleLeftMenu.html",function(){
				$("#evaluation").children().eq(5).children().eq(0).addClass("curr");
			});
		}
	}
}

/**
 * 点击搜索触发
 * doSearchForNotify
 * @author mishengliang
 * 2016-9-14 上午10:26:50
 */
function doSearchForNotify(){
	getOrderDeliverNotice(0,true);
}

/**
 * 获取数据
 * getOrderDeliverNotice
 * @param pageIndex,needinit
 * @author mishengliang
 * 2016-8-31 上午10:16:38
 */
function getOrderDeliverNotice(pageIndex,needinit){
	var startTime = $(".startNotiDate").val();
	var endTime = $(".endNotiDate").val();
	var searchKey = $("#multiKey").val();
	currentPage=pageIndex;
	var url = "orderDeliveryNotice/getOrderDeliveryNoticeListInfo.do";
	var param = {};
	param.supCompanyId = companyId;
	param.noticeStatus = noticeStatus;
	param.limit = pageSize;
	param.page = pageIndex;
	param.detailLimit = 10;//送货信息展示10条
	param.startTime = startTime;
	param.endTime = endTime;
	param.searchKey = searchKey;
	param.showType = 0;//默认为按订单排序
	
	var fn = function(result){
		var total = result.total;
		var counts = result.counts;
		if(pageIndex==0 && needinit){//第一次加载时加载分页控件
			initPaginationForReport(total);
		}
		
		$("#deliveryTotal").html(total);
		var evalText=doT.template($("#orderNotify").text());
		$("#notifyShow").html(evalText(result.data));
		$("#allDliNum").html(counts[0]);
		$("#waitDliNum").html(counts[1]);
		$("#waitOtherDliNum").html(counts[2]);
		$("#confirmDliNum").html(counts[3]);
		mouseMove();//移入移除样式转换
	};
	asyncAjaxMethod(url,param,true,fn);
}

function initPaginationForReport(totalCount){
	$("#pagination").pagination(totalCount, {
         callback: pageselectCallback,
         prev_text: "<",
         next_text: ">",
         items_per_page: pageSize, //每页的数据个数
         num_display_entries: 3, //两侧首尾分页条目数
         current_page: 0,   //当前页码
         num_edge_entries: 2 //连续分页主体部分分页条目数
     });
}
function pageselectCallback(index,jq){
	getOrderDeliverNotice(index,false);
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
		location.reload();
		$(thisEvent).parent().prev().find(".fs16_bold").html("已确认");
		$(thisEvent).prev("button").hide();
		$(thisEvent).hide();
	};
	 window.wxc.xcConfirm("您要确认该送货通知吗？", window.wxc.xcConfirm.typeEnum.confirm,{	
			onOk:function(){
				asyncAjaxMethod(url,params,true,fn);
			},
			onCancel:function(){}
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
	var param ={tabNum:tabNum};
	addParamsToWindowName(param);
	switch(tabNum){
	case 0:
		noticeStatus = null;
		break;
	case 1:
		noticeStatus = 0;
		break;
	case 2:
		noticeStatus = 1;
		break;
	case 3:
		noticeStatus = 2;
		break;
	default:
		break;	
	}
	getOrderDeliverNotice(0,true);
	
	//设置点击后的切换样式
	$(tabId + " .tab").children(".curr").removeClass("curr");
	$(tabId + " .tab").children().eq(tabNum).addClass("curr");
	$(tabId + " .tab").children().find("span.split").css("display","inline");
//	$(tabId + " .tab").children().eq(tabNum).prev().find("span.split").css("display","none");
}

/**
 * 移入移除样式转换
 * mouseMove
 * @author mishengliang
 * 2016-9-9 上午10:18:42
 */
function mouseMove(){
	$(".deliveryNotify_con").mouseover(function(){
		$(this).addClass("deliveryNotify_con_hover");
		$(this).find(".notifyInfo").addClass("notifyInfo_hover");
//		$(this).find(".modify").css("background","#f6feff");
		
	});
	$(".deliveryNotify_con").mouseleave(function(){
		$(this).removeClass("deliveryNotify_con_hover");
		$(this).find(".notifyInfo").removeClass("notifyInfo_hover");
//		$(this).find(".modify").css("background","");
	});
}

/**跳转至送货通知详情页面
 * queryInfo 
 * type ---> 'moreInfo':详情展示状态；'modify':修改状态；
 * @author wangjialin
 * 2016-8-12 下午1:36:15
 */
function queryInfo(deliveryNoticeId,type,ms){
	var modifyState = "";
	if(ms == 1){
		modifyState = "&ms="+ms;
	}
	var URIstring = getwebroot()+"orderDeliveryNotice/deliveryNotifyDetailSale/"+deliveryNoticeId+".htm?companyId="+companyId+"&deliveryNoticeId="+ deliveryNoticeId +"&modifyDate="+type+modifyState;
	var paraString = URIstring.substring(URIstring.indexOf("?")+1,URIstring.length);
	var rul=URIstring.substring(0,URIstring.indexOf("?")+1)+escape(paraString);//对参数的处理
	window.open(rul);
}