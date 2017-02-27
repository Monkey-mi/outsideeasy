var pageSize = 5;//每页个数	
var currentPage=0;//当前页码
var companyId = getParamFromWindowName("companyIdForAll");//公司ID
var status_s = 0;//切换的状态位
var order_date_type = 1;//日期的类型
var end_date = "";//结束的日期
var start_date = "";//起始的日期
var search_text = "";//搜索关键字
var search_company = "";//采购商名称
var order_num = "";//订单编号
var end_money = "";//金额的范围
var start_money = "";//金额的范围
var delete_flag_d = 0;//是否删除
//异步加载loading效果插件参数
var opts={lines: 10, // 花瓣数目
            length: 5, // 花瓣长度
            width: 5, // 花瓣宽度
            radius: 10, // 花瓣距中心半径
            corners: 1, // 花瓣圆滑度 (0-1)
            rotate: 0, // 花瓣旋转角度
            direction: 1, // 花瓣旋转方向 1: 顺时针, -1: 逆时针
            color: '#ccc', // 花瓣颜色
            speed: 1, // 花瓣旋转速度
            trail: 60, // 花瓣旋转时的拖影(百分比)
            shadow: false, // 花瓣是否显示阴影
            hwaccel: false //spinner 是否启用硬件加速及高速旋转  
			, position: 'relative'
			};
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
		$(".more_up").on("click",function(){
			$(this).hide();
			$(".more_down").show();
			$(".moreCriteria").hide();
		});
		$(".more_down").on("click",function(){
			$(this).hide();
			$(".more_up").show();
			$(".moreCriteria").show();
		});
		$("#date").html($("#dateSelect option[selected='selected']").text());
		$('#selectAll').prop("checked", false);
		var tabId=getParamFromWindowName("tabId");
		var tabNum=getParamFromWindowName("tabNum");
		if(tabId==undefined){
			tabId="#saleOrderList";
		}
		if(tabNum==undefined){
			tabNum=0;
		}
		currtab(tabId, tabNum);		
});
/**
 * 给所有的产品绑定事件
* lookForMore
* @return void
* @author chenlong
* 2016-8-22
 */
function lookForMore(){
	$('.lookForMore').on("click", function() {
		var id = $(this).find("input").val();
		var obj =  $(this);
		var url ="purchaseorder/getProductListListForSearch.do";
		var params ={pur_order_id:id};
		var fn  = function(result){		
			var evalText=doT.template($("#allProducttmpl").text());
			obj.parent('.orderTable_body').find(".products").html(evalText(result.data));
			obj.parent('.orderTable_body').find(".productScroll").niceScroll({
				cursorcolor: "#ccc", //#CC0071 光标颜色 
				cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
				touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
				cursorwidth: "5px", //像素光标的宽度 
				cursorborder: "0", //     游标边框css定义 
				cursorborderradius: "5px", //以像素为光标边界半径 
				autohidemode: true //是否隐藏滚动条 
			});
		};
		asyncAjaxMethod(url,params,true,fn);
		$(this).hide();
	});
}
/*
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * create_by yangliping 2016-6-30 17:32:19
 */
function loadCommonPage(){
	var result = isLoginForPlateForm();
	var isVipCookie = getCookie("isVip");
//	if(result.data!=null && result.data.vip == true){
	if(isVipCookie=="true"){
		$("#top").load(getwebroot()+"vip/platform/vipTop.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				getCompanyList(companyId);
				$("#mainNav").children().eq(0).addClass("curr");
			}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/saleManage/vipSaleLeftMenu.html",null,function(responseTxt,statusTxt,xhr){
				if(statusTxt=="success"){
					$("#evaluation").children().eq(3).children().find("a").prepend(">>");
					$("#evaluation").children().eq(3).children().addClass("currVip");
				}
			});
		}
	}else{
		$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				getCompanyList(companyId);
				$("#mainNav").children().eq(1).addClass("curr");
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"usercenter/saleManage/saleLeftMenu.html",function(){
				$("#evaluation").children().eq(3).children().addClass("curr");
			});
		}
	}
}
/**
* 取到所有参数的值
* orgizaParam
* @return void
* @author chenlong
* 2016-8-19
 */
function orgizaParam(){
	end_date = $("#end_time").val();
	start_date = $("#start_time").val();
	search_text = $.trim($("#search_text").val());
	search_company = $.trim($("#search_company").val());
	order_num = $.trim($("#order_num").val());
	start_money = $.trim($("#start_money").val());
	end_money = $.trim($("#end_money").val());	
}
/**
 * 初始化所有的条件
* initParams
* @return void
* @author chenlong
* 2016-8-20
 */
function initParams(){
	currentPage = 0;
	$("#end_time").val("");
	$("#start_time").val("");
	$("#search_text").val("");
	$("#search_company").val("");
	$("#order_num").val("");
	$("#start_money").val("");
	$("#end_money").val("");
}
/**
 * 返回每个状态中的订单数量
* getOrderStatusCount
* @return void
* @author chenlong
* 2016-8-31
 */
function getOrderStatusCount(){
	var url = "purchaseorder/getStatusCountForSub.do";
	var params={company_id:companyId};
	var fn = function(result) {
		var data = result.data;
		if(result.success == true){
		$(".tab").children("li").each(function(index,element){
			switch(index){
			case 0:
				$(element).html("全部订单("+data.allOrderCount+")"+"<span class='split'>|");
				break;
			case 1:
				$(element).html("待确认订单("+data.comimtOrderCount+")"+"<span class='split'>|");
				break;
			case 2:
				$(element).html("已接订单("+data.comfrimOrderCount+")"+"<span class='split'>|");
				break;
			case 3:
				$(element).html("交货完成订单("+data.overOrderCount+")"+"<span class='split'>|");
				break;
			case 4:
				$(element).html("待确认终止订单("+data.queryOrderCount+")"+"<span class='split'>|");
				break;
			case 5:
				$(element).html("异常订单("+data.exOrderCount+")"+"<span class='split'>");
				break;
			}
		});
		$(".orderRecycleBin").html("<img src='/newresources/images/supplier/binGrey.png'>订单回收站("+data.returnOrderCount+")");
//		$(".tab").find(".curr").prev().find("span").css("display","none");
		}	
	};
	asyncAjaxMethod(url,params,true,fn);	
}
/**
 * 查询订单列表
* getOrderDetails
* @return void
* @author chenlong
* 2016-8-18
 */
function getOrderDetails(seacrh_flag){
	if(parseInt(seacrh_flag)==1){
		currentPage = 0;
	}
	orgizaParam();
	var url = "purchaseorder/getPurchaseOrderList.do";
	var params={};	
	InitDatas_order(currentPage,true,url,params);		
}

/**
分页获取数据
pageIndex：当前页索引
needinit：是否为第一次加载
*/
function InitDatas_order(pageIndex,needinit,url,param)
{
currentPage=pageIndex;
var url=url;
var params={};
params.company_id = companyId;
params.status = status_s;
params.order_date_type = order_date_type;
params.delete_flag_d = delete_flag_d;
/*
 * 其他的参数设置
 */
if(end_date != ""){
 params.end_date = end_date;
}
if(start_date != ""){
 params.start_date = start_date;
}
if(search_text != ""){
 params.search_text = search_text;
	}
if(search_company != ""){
 params.search_company = search_company;
	}
if(order_num != ""){
 params.order_num = order_num;
	}
if(start_money != ""){
 params.start_money = start_money;
		}
if(end_money != ""){
 params.end_money = end_money;
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
		addItemsOrder(result.data);	
		$("#order_count_v").html(result.total);
	};
asyncAjaxMethod(url,params,true,fn);	
}
/**供应商信息的翻页调用  
*/
function pageselectCallbacks(index,jq)
{
	orgizaParam();
	var url = "purchaseorder/getPurchaseOrderList.do";		
	var params={};
    InitDatas_order(index,false,url,params);
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
function addItemsOrder(result){
	var evalText=doT.template($("#allOrderstmpl").text());
	$("#allOrders").html(evalText(result));
	lookForMore();
	mouseOver_order();//绑定鼠标移动的切换事件
}
/**
* 根据状态返回不同的下拉按钮
* returnStatusOrder
* @param order_status,pur_order_id
* @returns
* @return any
* @author chenlong
* 2016-8-18
 */
function returnStatusOrder(order_status,pur_order_id,delete_flag,pur_cpyname_cn){	
	if(order_status == ""){
		return "";
	}else{
		var param ={status:order_status,order_id:pur_order_id,delete_flag:delete_flag};
		var evalText=doT.template($("#OrdersStatustmpl").text());	
		return evalText(param);
	}
}
/**
* returnText 返回提示框
* @param result
* @return void
* @author chenlong
* 2016-8-20
 */
function returnText(result){
	$("#recycleOrder").remove();
	var evalText=doT.template($("#text_order_co").text());
	$("#textOrderInfo").prepend(evalText(result));
}
/**
 * 单选
* selectSingle
* @return void
* @author chenlong
* 2016-8-20
 */
function selectSingle() {
	var chknum =  $("#allOrders").find(":checkbox").size();//选项总个数 
	var chk = 0;
	 $("#allOrders").find(":checkbox").each(function() {
		if ($(this).is(":checked")) {			
			chk++;		
		}
	});
	if (chknum == chk) {//全选 
		$('#selectAll').prop("checked", true);
	} else {//不全选 
		$('#selectAll').prop("checked", false);
	}	
}
/**
 * 多选
* selectAll
* @return void
* @author chenlong
* 2016-8-20
 */
function selectAll(){
	if($("#selectAll")[0].checked){    
        $("#allOrders").find(":checkbox").each(function(){
			$(this).prop("checked", true); 
		});   
    }else{    
    	$("#allOrders").find(":checkbox").each(function(){
			$(this).prop("checked", false); 
		});
    }
}
/**
 * 将所有的选中都初始化
* selectInt
* @return void
* @author chenlong
* 2016-8-20
 */
function selectInt(){
	if($("#selectAll")[0].checked){			
		$('#selectAll').prop("checked", false);
	}
	$("#allOrders").find(":checkbox").each(function(){
		if ($(this).is(":checked")) {
		$(this).prop("checked", false); 
		}
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
	$(tabId + " .tab").children().find("span.split").css("display","inline");
//	$(tabId + " .tab").children().eq(tabNum).prev().find("span.split").css("display","none");
	//根据参数决定显示内容
	switch(tabNum){
	case 0:
		status_s = 0;
		delete_flag_d = 0;	
		$("#button_all_delete").css("display","inline");
		$("#button_all_remark").css("display","inline");
		$("#button_all_return").css("display","none");
		$(".orderRecycleBin").removeClass("orderRecycleBinActive");
		break;
	case 1:
		status_s = 10;
		delete_flag_d = 0;
		$("#button_all_delete").css("display","none");
		$("#button_all_remark").css("display","inline");
		$("#button_all_return").css("display","none");
		$(".orderRecycleBin").removeClass("orderRecycleBinActive");
		break;
	case 2:
		status_s = 20;
		delete_flag_d = 0;
		$("#button_all_delete").css("display","none");
		$("#button_all_remark").css("display","inline");
		$("#button_all_return").css("display","none");
		$(".orderRecycleBin").removeClass("orderRecycleBinActive");
		break;
	case 3:
		status_s = 30;
		delete_flag_d = 0;
		$("#button_all_delete").css("display","inline");
		$("#button_all_remark").css("display","inline");
		$("#button_all_return").css("display","none");
		$(".orderRecycleBin").removeClass("orderRecycleBinActive");
		break;
	case 4:	
		status_s = 40;
		delete_flag_d = 0;
		$("#button_all_delete").css("display","none");
		$("#button_all_remark").css("display","inline");
		$("#button_all_return").css("display","none");	
		$(".orderRecycleBin").removeClass("orderRecycleBinActive");
		break;
	case 5:
		status_s = 50;
		delete_flag_d = 0;
		$("#button_all_delete").css("display","inline");
		$("#button_all_remark").css("display","inline");
		$("#button_all_return").css("display","none");	
		$(".orderRecycleBin").removeClass("orderRecycleBinActive");
		break;
	case 6:	
		status_s = 100;
		delete_flag_d = 1;
		$("#button_all_delete").css("display","inline");
		$("#button_all_remark").css("display","none");
		$("#button_all_return").css("display","inline");
		$(".orderRecycleBin").addClass("orderRecycleBinActive");
		break;
	} 
	selectInt();//将所有的选中都初始化
	initParams();//初始化所有的条件
	returnText(tabNum);//是否返回提示框
	getOrderDetails();//请求相应的订单
	getOrderStatusCount();//返回相应的统计条数
	
}

/**显示下单日期的选择框
 * showSelect void
 * @author wangjialin
 * 2016-8-10 上午11:01:35
 */
function showSelect(){
	$("#dateSelect").show();
}
function chooseDate(){
	var option =$("#dateSelect option:selected").text();
	order_date_type = $("#dateSelect option:selected").val();
	$("#date").text(option);
}
/**
* 保存备忘信息
* saveRemarkinfo
* @return void
* @author chenlong
* 2016-8-20
 */
function saveRemarkinfo(robj){
	var id = $("#hide_remark_id").val();
	var sup_memo = $.trim($("#content_remark").val());//备注信息
	if(parseInt(id) != 0){//单条备注
	var url = "purchaseorder/updateOrderRemark.do";
	var params = {pur_order_id:id,sup_memo:sup_memo};
	var fn = function(result){
		if(result.success==true){
			$("#content_remark").val("");
			$("#hide_remark_id").val(0);
			pop_div_close('orderMemo');
			var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
			window.wxc.xcConfirm("保存成功",window.wxc.xcConfirm.typeEnum.custom,option);
		}
	};
	asyncAjaxMethod(url,params,true,fn);
	}else{//批量备注
	var check = $("#check_remark").find("input").is(":checked");
	var param = [];
	var id = 0;
	$("#allOrders").find(":checkbox").each(function(){
			if ($(this).is(":checked")) {
			id = $(this).val();
			param.push(id); 		
			}
		});
	var url = "purchaseorder/updateOrderRemarklist.do";
	var params = {sup_memo:sup_memo,check:check};
	var orderId = {};//定义一个对象中的对象
	for (x in param) {
		orderId[x] = param[x];//将参数赋值进入该对象中
	}
	params.orderId = JSON.stringify(orderId);//将js对象转化成json对象
	var fn = function(result){
		$("#content_remark").val("");
	    var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
	    window.wxc.xcConfirm(result.message, window.wxc.xcConfirm.typeEnum.custom,option);
	    pop_div_close('orderMemo');	
	};
	asyncAjaxMethod(url,params,true,fn);
	}
}

/**
 * 鼠标上移及离开的效果
 * @author wangjialin
 * 2016-8-11 下午5:23:03
 */
function mouseOver_order(){
$(".messageLogo").mouseover(function(){
	$(this).parents(".companyName").find(".message").show();
});
$(".messageLogo").mouseleave(function(){
	$(this).parents(".companyName").find(".message").hide();
});
$(".fileLogo").mouseover(function(){
	$(this).parents(".companyName").find(".newFile").show();
});
$(".fileLogo").mouseleave(function(){
	$(this).parents(".companyName").find(".newFile").hide();
});
$(".orderTable_body").mouseover(function(){
	$(this).addClass("orderTable_body_hover");
	$(this).find(".companyInfo").addClass("companyInfo_hover");
});
$(".orderTable_body").mouseleave(function(){
	$(this).removeClass("orderTable_body_hover");
	$(this).find(".companyInfo").removeClass("companyInfo_hover");
});
}
$("#input_filename").mouseover(function(){
	$(this).addClass("uploadFileName_hover");
	$(this).find(".del").show();
});
$("#input_filename").mouseleave(function(){
	$(this).removeClass("uploadFileName_hover");
	$(this).find(".del").hide();
});

/**查看取消原因
 * queryReson void
 * @author wangjialin
 * 2016-9-8 上午10:32:57
 */
function queryReson(id)
{
	var url = "purchaseorder/getOrderCancelRecord.do";
	var params = {pur_order_id:id};
	var fn = function(result){
	if(result.success==true){
			var info = result.data.cancel_description;
			var type = parseInt(result.data.cancel_reason);
			var cancel_reason = "";
			if(type==1){
				cancel_reason = "订单信息变更";//
			}					
			if(type==2){
				cancel_reason = "取消采购计划";//
			}
			if(type==3){
				cancel_reason = "其他原因";//
			}
			$("#content_cancels").html(info);
			$("#reasonDivs_cancel").html(cancel_reason);
			pop_div_show("queryReson");	
		}
	};
	asyncAjaxMethod(url,params,true,fn);	
}
/**查看终止申请
 * stopDetail void
 * @author chenlong
 * 2016-8-12 上午10:33:30
 */
function stopDetail(id)
{
	var urlo ="purchaseorder/getOrderStopDetails.do";
	var params = {pur_order_id:id};
	var fno =function(result){
		 var data = result.data;
		 $("#order_cha_stop").html(""); 
		 var evalText=doT.template($("#order_stop_cha").text());
		 $("#order_cha_stop").html(evalText(data));			      							 		
		 pop_div_show("stopDetail");
	};
	asyncAjaxMethod(urlo,params,true,fno);
}
/**确认接单
 * acceptOrder void
 * @author chenlong
 * 2016-8-22 上午10:34:14
 */
var deliveryNoticeId = "";
function acceptOrder(id)
{
	var url ="purchaseorder/getPurchaseOrderStatusForAccept.do";
	var params = {pur_order_id:id};
	var fn = function(result){
		if(parseInt(result.data.status1)==10){
			var urlo ="orderAgreementFile/getOrderAgreementFileforId.do";
			var fno =function(result){
				var data = result.data;
				 $("#input_filename").html(""); 
				 if (data != null && data != "" ) {
					 $("#button_accept_file").hide();
			         var item="<a class='bluecolor'>"+data.agreement_name+data.suffix_name+"</a><img src='/newresources/images/sale/del.png' class='hide del' onclick='clean("+data.agreement_id+")'>";
			         $("#input_filename").append(item);
				 }else{
					 $("#button_accept_file").show(); 
				 }							 
				 $("#hide_accept_id").val(id);				
				 pop_div_show("acceptOrder");
			};	
			var paramso = params;
			if(result.data.status2==true){					
				asyncAjaxMethod(urlo,paramso,true,fno);
			}else{				
				var messages = "您是否先确认该订单的交货通知?<br><a class='blue ml20' onclick='queryInfos()'>修改交期</a>";
				deliveryNoticeId = result.data.delivery_notice_id;
				xcconfirm = window.wxc.xcConfirm(messages, window.wxc.xcConfirm.typeEnum.confirm,
						{
						onOk:function(){
							var url = 'orderDeliveryNotice/updateDeliveryStatue.do';
							var params={noticeId:result.data.delivery_notice_id,noticeStatus:2};								
							var fn=function(datas){
								if(datas.success==true){
									asyncAjaxMethod(urlo,paramso,true,fno);
//									var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
//									window.wxc.xcConfirm("确认交期通知成功",window.wxc.xcConfirm.typeEnum.custom,option);
								}
							};
							asyncAjaxMethod(url,params,true,fn);
						},
						onCancel:function(){
						}
						});				
			}		
		}else{
		if(parseInt(result.data.status1)==20){
		 xcconfirm=new window.wxc.xcConfirm("当前订单状态已经“被接收”状态！",window.wxc.xcConfirm.typeEnum.infoNobtn);
		 closeBytimeCount_list(2);
	    }else{
		 xcconfirm=new window.wxc.xcConfirm("当前订单状态已经不是“已提交”状态！",window.wxc.xcConfirm.typeEnum.infoNobtn);
		 closeBytimeCount_list(2);	
		}
		}
	};
	asyncAjaxMethod(url,params,true,fn);	
}
/**跳转至送货通知详情页面
 * queryInfos 
 * type ---> 'moreInfo':详情展示状态；'modify':修改状态；
 * @author wangjialin
 * 2016-8-12 下午1:36:15
 */
function queryInfos(){
	xcconfirm.xcClose();
	var modifyState = "";
	var URIstring = getwebroot()+"orderDeliveryNotice/deliveryNotifyDetailSale/"+deliveryNoticeId+".htm?companyId="+companyId+"&deliveryNoticeId="+ deliveryNoticeId +"&modifyDate="+"modify"+modifyState;
	var paraString = URIstring.substring(URIstring.indexOf("?")+1,URIstring.length);
	var rul=URIstring.substring(0,URIstring.indexOf("?")+1)+escape(paraString);//对参数的处理
	window.open(rul);
}
/**
 * 确认接单改变状态值
* acceptOrderSave
* @return void
* @author chenlong
* 2016-8-22
 */
function acceptOrderSave(){
	var id =  $("#hide_accept_id").val();
	var file = $("#input_filename").html();
	if(file != null && file != "" ){
	var url ="purchaseorder/accpetOrderByID.do";
	var params = {pur_order_id:id};
	var fn = function(result){
		if(result.success ==true){
		xcconfirm=new window.wxc.xcConfirm("接收成功",window.wxc.xcConfirm.typeEnum.infoNobtn);
		closeBytimeCount_list(2);
		pop_div_close('acceptOrder');
		}
	};
	asyncAjaxMethod(url,params,true,fn);
    }else{
    var option ={title:"提示",btn:parseInt("0001",2)};
	window.wxc.xcConfirm("回签合同没有上传,请上传后再确定", window.wxc.xcConfirm.typeEnum.custom,option); 
}
}
/**同意终止
 * stopAgree void
 * @author wangjialin
 * 2016-8-12 上午10:35:02
 */
function stopAgree(id,obj)
{
	var companyName = $(obj).parent().parent().parent().find("#hide_company_name").val();
	var url ="purchaseorder/getPurchaseOrderStatus.do";
	var params = {pur_order_id:id};
	var fn = function(result){
		if(parseInt(result.data)==40){	
			var urlo ="purchaseorder/getOrderStopDetails.do";
			var fno =function(result){
				 var data = result.data;
				 $("#order_stop_s").html(""); 
				 var evalText=doT.template($("#order_stop_sVo").text());
				 $("#order_stop_s").html(evalText(data));			      							 
				 $("#hide_stop_id").val(id);
				 $("#company_stop").html(companyName);
				 pop_div_show("stopAgree");
			};
			asyncAjaxMethod(urlo,params,true,fno);
		}else{	   
		 xcconfirm=new window.wxc.xcConfirm("当前订单状态已经不是“终止待确认”状态！",window.wxc.xcConfirm.typeEnum.infoNobtn);
		 closeBytimeCount_list(2);			
		}
	};
	asyncAjaxMethod(url,params,true,fn);	
}
/**
 * 确认终止
* stopOrder
* @return void
* @author chenlong
* 2016-8-26
 */
function stopOrder(){
	var id =  $("#hide_stop_id").val();
	var sid = $("#hide_stop_sid").val();	
	var url ="purchaseorder/OrderStopDetails.do";
	var params = {pur_order_id:id,order_end_id:sid};
	var fn = function(result){
		if(result.success ==true){
			var count = parseInt(result.data);
			if(count==0){
				xcconfirm=new window.wxc.xcConfirm("操作成功",window.wxc.xcConfirm.typeEnum.infoNobtn);
				closeBytimeCount_list(2);
				pop_div_close('stopAgree');
			}else{
				xcconfirm=new window.wxc.xcConfirm("操作失败,状态已改变",window.wxc.xcConfirm.typeEnum.infoNobtn);
				closeBytimeCount_list(2);
				pop_div_close('stopAgree');
			}	
		}
	};
	asyncAjaxMethod(url,params,true,fn);	
}
/**
* 单个还原订单
* returnStatusV
* @param id
* @return void
* @author chenlong
* 2016-8-26
 */
function returnStatusV(id){
	var urlo = "purchaseorder/getPurchaseOrderStatusFordelete.do";
	var params = {pur_order_id:id};	
	var fno = function (result){
		datav = parseInt(result.data);
		if(datav == 1){
	        window.wxc.xcConfirm("您确认要还原这条订单吗？", window.wxc.xcConfirm.typeEnum.confirm,
			{	
			onOk:function(){
			var url = 'purchaseorder/returnPurchaseOrder.do';		
			var fn=function(result){
			   if(result.success == true){
			   var count  = parseInt(result.data);
			   if(count == 0){
			   var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
			   window.wxc.xcConfirm("还原成功", window.wxc.xcConfirm.typeEnum.custom,option);
			   getOrderDetails();
			   getOrderStatusCount();
			   }else{
			   xcconfirm=new window.wxc.xcConfirm("当前订单状态已经改变！无法还原",window.wxc.xcConfirm.typeEnum.infoNobtn);
			   closeBytimeCount_list(2);	
			   }
			   }   
			};
			asyncAjaxMethod(url,params,true,fn);
			},
			onCancel:function(){
			}
			});
		}else{
			xcconfirm=new window.wxc.xcConfirm("当前订单状态已经改变！无法还原",window.wxc.xcConfirm.typeEnum.infoNobtn);
			closeBytimeCount_list(2);
		}
	};
	asyncAjaxMethod(urlo,params,true,fno);
}
/**
 * 单个删除订单
* deleteOrder
* @param id
* @return void
* @author chenlong
* 2016-8-26
 */
function deleteOrder(id){
	if(status_s != 100){
	var urlo = "purchaseorder/getPurchaseOrderStatusFordelete.do";
	var params = {pur_order_id:id};	
	var fno = function (result){
		datav = parseInt(result.data);
		if(datav == 0){
	        window.wxc.xcConfirm("您确认要删除这条订单吗？</br>删除后的订单进入回收站", window.wxc.xcConfirm.typeEnum.confirm,
			{	
			onOk:function(){
			var url = 'purchaseorder/deletePurchaseOrder.do';		
			var fn=function(result){
			   if(result.success == true){
			   var count  = parseInt(result.data);
			   if(count == 0){
			   var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
			   window.wxc.xcConfirm("删除成功", window.wxc.xcConfirm.typeEnum.custom,option);
			   getOrderDetails();
			   getOrderStatusCount();
			   }else{
			   xcconfirm=new window.wxc.xcConfirm("当前订单状态已经改变！无法删除",window.wxc.xcConfirm.typeEnum.infoNobtn);
			   closeBytimeCount_list(2);	
			   }
			   }
			   
			};
			asyncAjaxMethod(url,params,true,fn);
			},
			onCancel:function(){
			}
			});
		}else{
			xcconfirm=new window.wxc.xcConfirm("当前订单状态已经改变！无法删除",window.wxc.xcConfirm.typeEnum.infoNobtn);
			closeBytimeCount_list(2);
		}
	};
	asyncAjaxMethod(urlo,params,true,fno);
	}else {
		var urlo = "purchaseorder/getPurchaseOrderStatusFordelete.do";
		var params = {pur_order_id:id};	
		var fno = function (result){
			datav = parseInt(result.data);
			if(datav == 1){
		        window.wxc.xcConfirm("您确认要删除这条订单吗？</br>删除后的订单将无法恢复", window.wxc.xcConfirm.typeEnum.confirm,
				{	
				onOk:function(){
				var url = 'purchaseorder/deletePurchaseOrderVo.do';		
				var fn=function(result){
				   if(result.success == true){
				   var count  = parseInt(result.data);
				   if(count == 0){
				   var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
				   window.wxc.xcConfirm("删除成功", window.wxc.xcConfirm.typeEnum.custom,option);
				   getOrderDetails();
				   getOrderStatusCount();
				   }else{
				   xcconfirm=new window.wxc.xcConfirm("当前订单状态已经改变！无法删除",window.wxc.xcConfirm.typeEnum.infoNobtn);
				   closeBytimeCount_list(2);	
				   }
				   }	   
				};
				asyncAjaxMethod(url,params,true,fn);
				},
				onCancel:function(){
				}
				});
			}else{
				xcconfirm=new window.wxc.xcConfirm("当前订单状态已经改变！无法删除",window.wxc.xcConfirm.typeEnum.infoNobtn);
				closeBytimeCount_list(2);
			}
		};
		asyncAjaxMethod(urlo,params,true,fno);
	}
}
/**
 * 取消接收
* cancelAcceptOrder
* @return void
* @author chenlong
* 2017-2-13
 */
function cancelAcceptOrder(){	
	var id =  $("#hide_accept_id").val();
	var url = "purchaseorder/deleteOrderAgreementFile.do";
	var params = {pur_order_id:id};
	var fn = function(result){
		if(result.success ==true){
			pop_div_close('acceptOrder');
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}

/**批量删除订单
* orderMemodelete
* @return void
* @author chenlong
* 2016-8-20
*/
function orderMemodelete(){
	var param = [];
	var id = 0;
	$("#allOrders").find(":checkbox").each(function(){
			if ($(this).is(":checked")) {
			id = $(this).val();
			param.push(id); 		
			}
	});
	var lengt = param.length;
	if(lengt>0 && status_s != 100){//删除进入回收站
		window.wxc.xcConfirm("您确认要删除选中的"+lengt+"条订单吗？</br>删除后的订单进入回收站", window.wxc.xcConfirm.typeEnum.confirm,
			{	
			onOk:function(){
			var url = 'purchaseorder/deletePurchaseOrderlist.do';
			var params={};
			var orderId = {};//定义一个对象中的对象
			for (x in param) {
			orderId[x] = param[x];//将参数赋值进入该对象中
			}
			params.orderId = JSON.stringify(orderId);//将js对象转化成json对象
			var fn=function(result){
			 var i = result.data;
			 if(parseInt(i)>0){
				 if(parseInt(i)==lengt){
				  var option ={title:"提示",btn:parseInt("0001",2)};
				  window.wxc.xcConfirm("你选中的"+lengt+"条数据由于订单状态,无法删除", window.wxc.xcConfirm.typeEnum.custom,option); 
				 }else{
				  var option ={title:"提示",btn:parseInt("0001",2)};
				  window.wxc.xcConfirm("你选中的"+i+"条数据由于订单状态,无法删除,其余都已删除", window.wxc.xcConfirm.typeEnum.custom,option); 
				 } 
			  }else{
			      var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
			      window.wxc.xcConfirm("你选中的"+lengt+"条数据都已删除,进入回收站", window.wxc.xcConfirm.typeEnum.custom,option); 
			  }
			 getOrderDetails();
			 getOrderStatusCount();
			 $('#selectAll').prop("checked", false);
			};
			asyncAjaxMethod(url,params,true,fn);
			},
			onCancel:function(){
			}
			});
	}else if(lengt>0 && status_s == 100){
		window.wxc.xcConfirm("您确认要删除选中的"+lengt+"条订单吗？</br>删除后的订单将无法恢复", window.wxc.xcConfirm.typeEnum.confirm,
				{	
				onOk:function(){
				var url = 'purchaseorder/deletePurchaseOrderlistVo.do';
				var params={};
				var orderId = {};//定义一个对象中的对象
				for (x in param) {
				orderId[x] = param[x];//将参数赋值进入该对象中
				}
				params.orderId = JSON.stringify(orderId);//将js对象转化成json对象
				var fn=function(result){
				 var i = result.data;
				 if(parseInt(i)>0){
					 if(parseInt(i)==lengt){
					  var option ={title:"提示",btn:parseInt("0001",2)};
					  window.wxc.xcConfirm("你选中的"+lengt+"条数据由于订单状态,无法删除", window.wxc.xcConfirm.typeEnum.custom,option); 
					 }else{
					  var option ={title:"提示",btn:parseInt("0001",2)};
					  window.wxc.xcConfirm("你选中的"+i+"条数据由于订单状态,无法删除,其余都已删除", window.wxc.xcConfirm.typeEnum.custom,option); 
					 } 
				  }else{
				      var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
				      window.wxc.xcConfirm("你选中的"+lengt+"条数据都已经删除,无法恢复", window.wxc.xcConfirm.typeEnum.custom,option); 
				  }
				 getOrderDetails();
				 getOrderStatusCount();
				 $('#selectAll').prop("checked", false);
				};
				asyncAjaxMethod(url,params,true,fn);
				},
				onCancel:function(){
				}
				});	
	}else{
		 var option ={title:"提示",btn:parseInt("0001",2)};
		 window.wxc.xcConfirm("你一条订单也没选择！", window.wxc.xcConfirm.typeEnum.custom,option);
	}	
}
/**
 * 批量还原
* orderReturnList
* @return void
* @author chenlong
* 2016-8-23
 */
function orderReturnList(){
	var param = [];
	var id = 0;
	$("#allOrders").find(":checkbox").each(function(){
			if ($(this).is(":checked")) {
			id = $(this).val();
			param.push(id); 		
			}
	});
	var lengt = param.length;
	if(lengt>0 && status_s == 100){//删除进入回收站
		window.wxc.xcConfirm("您确认要还原选中的"+lengt+"条订单吗？", window.wxc.xcConfirm.typeEnum.confirm,
				{	
				onOk:function(){
				var url = 'purchaseorder/returnPurchaseOrderlistVo.do';
				var params={};
				var orderId = {};//定义一个对象中的对象
				for (x in param) {
				orderId[x] = param[x];//将参数赋值进入该对象中
				}
				params.orderId = JSON.stringify(orderId);//将js对象转化成json对象
				var fn=function(result){
				 var i = result.data;
				 if(parseInt(i)>0){
					 if(parseInt(i)==lengt){
					  var option ={title:"提示",btn:parseInt("0001",2)};
					  window.wxc.xcConfirm("你选中的"+lengt+"条数据由于订单状态,无法还原", window.wxc.xcConfirm.typeEnum.custom,option); 
					 }else{
					  var option ={title:"提示",btn:parseInt("0001",2)};
					  window.wxc.xcConfirm("你选中的"+i+"条数据由于订单状态,无法还原,其余都已还原", window.wxc.xcConfirm.typeEnum.custom,option); 
					 } 
				  }else{
				      var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
				      window.wxc.xcConfirm("你选中的"+lengt+"条数据都已经还原", window.wxc.xcConfirm.typeEnum.custom,option); 
				  }
				 getOrderDetails();
				 getOrderStatusCount();
				 $('#selectAll').prop("checked", false);
				};
				asyncAjaxMethod(url,params,true,fn);
				},
				onCancel:function(){
				}
				});	
	}else{
	     var option ={title:"提示",btn:parseInt("0001",2)};
		 window.wxc.xcConfirm("你一条订单也没选择！", window.wxc.xcConfirm.typeEnum.custom,option);
	}
}
/**批量备注
* orderMemoList
* @return void
* @author chenlong
* 2016-8-20
 */
function orderMemoList(){
	var count = 0;
	$("#allOrders").find(":checkbox").each(function(){
		if ($(this).is(":checked")) {
		count ++;		
		}
		});
	if(count>0){
		$("#hide_remark_id").val(0);
		$("#content_remark").val("");
		countWords();
		$("#check_remark").show();
		$("#orderMemo").find(".title_wrap span").html("批量备忘");
		pop_div_show("orderMemo");//显示备注框
	}else{
		var option ={title:"提示",btn:parseInt("0001",2)};
		window.wxc.xcConfirm("你一条订单也没选择！", window.wxc.xcConfirm.typeEnum.custom,option);
	}	
}
/**添加备忘
 * orderMemo void
 * @author chenlong
 * 2016-8-20 下午3:42:32
 */
function orderMemo(id)
{
	$("#hide_remark_id").val(id);
	var url = "purchaseorder/getOrderRemark.do";
	var params = {pur_order_id:id};
	var fn = function(result){
	if(result.success==true){
			var info = result.data.memo;
			$("#content_remark").val(info);
			countWords();
			$("#check_remark").hide();
			$("#orderMemo").find(".title_wrap span").html("订单备忘");
			pop_div_show("orderMemo");//显示备注框
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 弹出层效果
 * pop_div_show
 * @param id void
 * @author yangliping
 * 2016-7-4 10:38:15
 */
function pop_div_show(id)
{
	$("#pop_mask").fadeIn("fast");
	$("#"+id).fadeIn("fast");
}

/**
 * 关闭弹出层
 * pop_div_close
 * @param id 
 * @return void
 * @author yangliping
 * 2016-7-4 10:38:15
 */
function pop_div_close(id){
	$("#pop_mask").fadeOut("fast");
	$("#"+id).fadeOut("fast");
}
/**上传回签合同
 * showviewtext void
 * @author chenlong
 * 2016-8-12 上午11:29:36
 */
function showviewtext(){
	var id = $("#hide_accept_id").val();
	var filename=$("#input_uploadfile").val();
	if(filename!=""){
		var spinner = new Spinner(opts);
   		$("#input_uploadfile").parent().append("<div id='processFile_spin_wrap'></div>");
	   	$("#processFile_spin_wrap").addClass("inner_spin_mask");
		spinner.spin(document.getElementById("processFile_spin_wrap"));
		
		var fileurl = "orderAgreementFile/addOrderArgeementFile.do";
		var params = {pur_order_id:id,argee:false,companyId:companyId};
		var fn = function(data){
        	//关闭loding效果
   			spinner.spin();
   			$("#processFile_spin_wrap").remove();
        if (data.success==true ) { 
        	$("#button_accept_file").hide();
        	var item="<a class='bluecolor'>"+data.filename+data.suffix_name+"</a><img src='/newresources/images/sale/del.png' class='hide del' onclick='clean("+data.agreement_id+")'>";
        	$("#input_filename").append(item);		    
        
        }else{
        	var option ={title:"提示",btn:parseInt("0001",2)};
            window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
            }
		};
	    addInputUtilFile(fileurl,params,"input_uploadfile",fn);
		
	   	   /*$.ajaxFileUpload({
		        url: getwebroot()+'orderAgreementFile/addOrderArgeementFile.do', //用于文件上传的服务器端请求地址
		        data: {pur_order_id:id,argee:false,companyId:companyId},  //任务id参数		  
		        fileElementId: "input_uploadfile",//input type=file 的id
		        dataType: 'json',//返回值类型 一般设置为json
		        success: function (data, status){
		        	//关闭loding效果
		   			spinner.spin();
		   			$("#processFile_spin_wrap").remove();
		        if (data.success==true ) { 
		        	$("#button_accept_file").hide();
		        	var item="<a class='bluecolor'>"+data.filename+data.suffix_name+"</a><img src='/newresources/images/sale/del.png' class='hide del' onclick='clean("+data.agreement_id+")'>";
		        	$("#input_filename").append(item);		    
		        
		        }else{
		        	var option ={title:"提示",btn:parseInt("0001",2)};
		            window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
		            }
		        }, //服务器成功响应处理函数
		        error: function (data, status, e)//服务器响应失败处理函数
		        {
		        	//关闭loding效果
		   			spinner.spin();
		   			$("#processFile_spin_wrap").remove();
		        	var option ={title:"提示",btn:parseInt("0001",2)};
		        	window.wxc.xcConfirm('解析失败', window.wxc.xcConfirm.typeEnum.custom,option);
		        	}
		        });*/
	   	   }else{
	   		var option ={title:"提示",btn:parseInt("0001",2)};
        	window.wxc.xcConfirm('文件为空', window.wxc.xcConfirm.typeEnum.custom,option);
	   	   }
}
/**
*删除回签合同
* clean
* @param agreement_id
* @return void
* @author chenlong
* 2016-8-22
 */
function clean(agreement_id){
	var url = "orderAgreementFile/deleteOrderAgreementFile.do";
	var params = {agreement_id:agreement_id};
	var fn = function(result){
		if(result.success == true){
			$("#button_accept_file").show();
			$("#input_filename").html("");
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**跳转至订单详情页面
 * queryInfo void
 * @author wangjialin
 * 2016-8-12 下午1:36:15
 */
function queryInfo(id){
	var resultName = JSON.stringify({"order_id":id,"companyIdForAll":companyId});
	window.open(getwebroot()+"purchaseorder/orderDetailForSale/"+id+".htm",resultName);
}
/**
 * 跳转至文件信息
* queryFieInfo
* @param id
* @return void
* @author chenlong
* 2016-9-1
 */
function queryFieInfo(id){
	var resultName = JSON.stringify({"order_id":id,"tab_Orderdetail":2,"companyIdForAll":companyId});
	window.open(getwebroot()+"purchaseorder/orderDetailForSale/"+id+".htm",resultName);
}
/**
 * 跳转至交流信息
* queryFieInfo
* @param id
* @return void
* @author chenlong
* 2016-9-1
 */
function querycomimtInfo(id){
	var resultName = JSON.stringify({"order_id":id,"tabNum":2,"companyIdForAll":companyId});
	window.open(getwebroot()+"purchaseorder/orderDetailForSale/"+id+".htm",resultName);
}
/**计算输入的字符数
 * countWords void
 * @author chnelong
 * 2016-8-16 下午3:43:05
 */
function countWords(){
	var num=$(".memo_content").val().length;
	var x=150-num;
	if(x<0){
		var char = $(".memo_content").val();
		var content = char.slice(0,150);
		$(".memo_content").val(content);
		$("#words").html(0);
	}else{
		$("#words").html(x);	
	}
}
/**
 * 下载终止协议
* LoadFileinfo
* @param tf_id
* @return void
* @author chenlong
* 2016-8-24
 */
function LoadFileinfo(a_id){
	var params = {order_attched_id:a_id};
	var url = "orderAgreementFile/getOrderAttchedFileListSub.do";
	var fn= function(result){	
		if(result.data!=null){
			var filename = result.data.mogodb_id;
			window.open(getwebroot()+'orderAgreementFile/downLoadFileFormMongoForSub.do?file='+filename, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');	
		}else{
			window.wxc.xcConfirm("该条文件信息中不存在文件,请联系管理员");
		}	
	};
	asyncAjaxMethod(url,params,true,fn); 		
}
/**
 * 导出订单excel文件
* downloadSubAccount
* @return void
* @author chenlong
* 2016-9-7
 */
function downloadOrder(){
	var param = [];
	var id = 0;
	var count =0;
	$("#allOrders").find(":checkbox").each(function(){
			if ($(this).is(":checked")) {
			id = $(this).val();
			param.push(id); 
			count++;
			}
		});
	if(count>0){
	    var params = param.join(",");
        window.open(getwebroot()+'purchaseorder/downloadOrderExcel.do?lengthd='+params, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');		
    }else{
    	var option ={title:"提示",btn:parseInt("0001",2)};
    	window.wxc.xcConfirm('未选中一条订单', window.wxc.xcConfirm.typeEnum.custom,option);
}
}
/*
 * 弹出框两秒后自动关闭效果
 * params：num 计时器秒数
 * author：chenlong
 * create_dt:2016年5月26日11:28:37
 * */
function closeBytimeCount_list(num)
{
	time_c=num;
	time_c=time_c-1;
	if(time_c>=0)
	{
		setTimeout("closeBytimeCount_list(time_c)",1000);
	}
	else
	{
		xcconfirm.xcClose();
		//刷新当前页
		getOrderDetails();
		getOrderStatusCount();
	}
}