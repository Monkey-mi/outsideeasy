/*
 * 页面加载事件
 * create_by yangliping 2016-6-30 17:32:19
 * */ 
var pageSize = 10;//每页个数	
var currentPage=0;//当前页码
var companyId = getParamFromWindowName("companyIdForAll");//公司ID

var status_s = 0;//切换的状态位
var shipping_end_date = "";//发货日期：结束的日期
var shipping_start_date = "";//发货日期：起始的日期
var start_date = "";//到货日期
var end_date = "";//到货日期
var search_company = "";//发货单位
var shipping_num = "";//发货单号
var shipping_nummber = "";//运货单号
var shippingType = 2;//发货类型
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
		var tabId=getParamFromWindowName("tabId");
		var tabNum=getParamFromWindowName("tabNum");
		if(tabId==undefined){
			tabId="#deliveryManageList";
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
//	var result = isLoginForPlateForm();
//	if(result.data.vip == true){
//		$("#top").load(getwebroot()+"vip/platform/vipTop.html",null,function(responseTxt,statusTxt,xhr){
//			if(statusTxt=="success")
//			{
//				$("#mainNav").children().eq(0).addClass("curr");
//				getCompanyList(companyId);
//			}
//		});
//		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
//		$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/saleManage/vipSaleLeftMenu.html",function(){
//			$("#evaluation").children().eq(7).children().eq(1).find("a").prepend(">>");
//			$("#evaluation").children().eq(7).children().eq(1).addClass("currVip");
//		});
//	}else{
		$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#mainNav").children().eq(0).addClass("curr");
				getCompanyList(companyId);
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		$(".midd_left_wrap").load(getwebroot()+"usercenter/purchaseManage/purchaseLeftMenu.html",function(){
			$("#evaluation").children().eq(9).children().eq(1).addClass("curr");
		});
//	}
}
/**
* 取到所有参数的值
* orgizaParam
* @return void
* @author chenlong
* 2016-12-19
 */
function orgizaParam(){	
	end_date = $("#end_date").val();//到货日期
	start_date = $("#start_date").val();//到货日期
	shipping_num = $.trim($("#shipping_num").val());//发货单号
	search_company = $.trim($("#search_company").val());//产品名称
	shipping_nummber = $.trim($("#shipping_nummber").val());//运货单号
	shipping_end_date = $.trim($("#shipping_end_date").val());//发货日期：结束的日期
	shipping_start_date = $.trim($("#shipping_start_date").val());//发货日期：起始的日期	
}
/**
 * 初始化所有的条件
* initParams
* @return void
* @author chenlong
* 2016-12-20
 */
function initParams(){
	$("#end_date").val("");
	$("#start_date").val("");
	$("#shipping_num").val("");
	$("#search_company").val("");
	$("#shipping_nummber").val("");
	$("#shipping_end_date").val("");
	$("#shipping_start_date").val("");
}
/**
 * 返回每个状态中的发货单数量
* getOrderStatusCount
* @return void
* @author chenlong
* 2016-8-31
 */
function getShippingStatusCount(data){	
		$(".tab").children("li").each(function(index,element){
			switch(index){
			case 0:
				$(element).html("全部("+data.allStateVo.all+")"+"<span class='split'>|");
				break;
			case 1:
				$(element).html("待收货("+data.allStateVo.toBeSend+")"+"<span class='split'>|");
				break;
			case 2:
				$(element).html("已收货("+data.allStateVo.sended+")"+"<span class='split'>|");
				break;
			case 3:
				$(element).html("已取消("+data.allStateVo.producting+")");
				break;
			}
		});		
//		$(".tab").find(".curr").prev().find("span").css("display","none");	
}
/**
 * 查询订单列表
* getOrderDetails
* @return void
* @author chenlong
* 2016-8-18
 */
function getShippingDetails(){
	currentPage = 0;
	orgizaParam();
	var url = "taskDeliverGood/getTaskDeliverGoodsListForReceive.do";
	var params={};	
	InitDatas_Shipping(currentPage,true,url,params);		
}

/**
分页获取数据
pageIndex：当前页索引
needinit：是否为第一次加载
*/
function InitDatas_Shipping(pageIndex,needinit,url,param)
{
currentPage=pageIndex;
var url=url;
var params={};
params.company_id = companyId;
params.state = status_s;
params.shippingType = shippingType;
/*
 * 其他的参数设置
 */
if(end_date != ""){
 params.end_date = end_date;
}
if(start_date != ""){
 params.start_date = start_date;
}
if(shipping_num != ""){
 params.shipping_num = shipping_num ;
	}
if(search_company != ""){
 params.search_company = search_company;
	}
if(shipping_nummber != ""){
 params.shipping_nummber = shipping_nummber;
	}
if(shipping_end_date != ""){
 params.shipping_end_date = shipping_end_date;
		}
if(shipping_start_date != ""){
 params.shipping_start_date = shipping_start_date;
		}

params.usePaging=true;
params.page=pageIndex;
params.limit=pageSize;
params.start=parseInt(pageIndex)*pageSize;

var fn=function(result){
	if(pageIndex==0 && needinit){
			//第一次加载时加载分页控件
		initPaginationsOrder(result.total);
	}
		//显示数据到表格
	    addItemShipping(result.data);
	    //每个状态数量
	    getShippingStatusCount(result.data);
	};
asyncAjaxMethod(url,params,true,fn);	
}
/**供应商信息的翻页调用  
*/
function pageselectCallbacks(index,jq)
{
	orgizaParam();
	var url = "taskDeliverGood/getTaskDeliverGoodsListForReceive.do";		
	var params={};
    InitDatas_Shipping(index,false,url,params);
}
/**初始化分页控件
*/
function initPaginationsOrder(totalCount){
	$("#paginationcom").pagination(totalCount, {
         callback: pageselectCallbacks,
         prev_text: "<",
         next_text: ">",
         items_per_page: pageSize, //每页的数据个数
         num_display_entries: 3, //两侧首尾分页条目数
         current_page: 0,   //当前页码
         num_edge_entries: 2 //连续分页主体部分分页条目数
     });
}
/**
 * 字符串的拼接 doT模板
* addItemsOrder
* @param result
* @return void
* @author chenlong
* 2016-8-18
 */
function addItemShipping(result){
	$(".deliveryTableList tr:eq(0)").nextAll().remove();
	var evalText=doT.template($("#shippingList").text());	
	$(".deliveryTableList tr:eq(0)").after(evalText(result.list));
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
	$(tabId + " .tab").children().find("span.split").css("display","inline");
//	$(tabId + " .tab").children().eq(tabNum).prev().find("span.split").css("display","none");
	switch(tabNum){
	case 0:
		status_s = 0;		
		break;
	case 1:
		status_s = 5;		
		break;
	case 2:
		status_s = 10;		
		break;
	case 3:
		status_s = 15;		
		break;	
	} 
	initParams();//初始化所有的条件
	getShippingDetails();//请求相应的订单
}

/**显示select框
 * showSelect
 * @param e void
 * @author wangjialin
 * 2016-11-16 下午4:24:44
 */
function showSelect(e){
	$(e).next().width($(e).width());
	$(e).next().show();
	$(".mask_opacity").show();
	$(".mask_opacity").click(function(){
		$(e).next().hide();
		$(".mask_opacity").hide();
	});
	$(e).next().find("li").click(function(){
		var txt=$(this).text();
		shippingType = $(this).val();
		$(this).parent().prev().html(txt+'<img src="/newresources/images/switchover.png" class="f_r mr4 mt4">');
		$(this).parent().hide();
		$(".mask_opacity").hide();
	});
}
function comfirmReceipt(deliver_number){
	var param ={"deliver_number":deliver_number};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"taskDeliverGood/receiptInfo.htm";	
	sessionStorage.setItem("isEdit",'1');
}

function queryInfo(deliver_number){
	var param ={"deliver_number":deliver_number};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"taskDeliverGood/receiptInfo.htm";	
	sessionStorage.setItem("isEdit",'0');
}