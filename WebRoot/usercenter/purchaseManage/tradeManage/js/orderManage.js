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
var operator_name = "";//下单人名称
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
		
		$(".reasonSelect li").on("click",function(){
			$(".reasonDiv").text($(this).text());
			$(".reasonDiv").append("<img src='/newresources/images/switchover.png' class='f_r'>");
			$(".reasonSelect").toggleClass("hide");
		});
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

		var tabId=getParamFromWindowName("tabId");

		var tabNum=getParamFromWindowName("tabNum");
		if(tabId==undefined){
			tabId="#purchaseOrderList";
		}
		if(tabNum==undefined){
			tabNum=0;
		}
		currtab(tabId, tabNum);
		
		//$("#date").html($("#dateSelect option[selected='selected']").text());
		$('#selectAll').prop("checked", false);

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
			}
	});
	$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	var result=isLoginForPlateForm();
	if(result.isLogin==true){
		$(".midd_left_wrap").load(getwebroot()+"usercenter/purchaseManage/purchaseLeftMenu.html",function(){
			$("#evaluation").children().eq(1).children().addClass("curr");
		});
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
	search_text = $("#search_text").val().trim();
	search_company = $("#search_company").val().trim();
	order_num = $("#order_num").val().trim();
	start_money = $("#start_money").val().trim();
	end_money = $("#end_money").val().trim();	
	operator_name = $("#operator_name").val();
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
	$("#operator_name").val("");
}
/**
 * 返回每个状态中的订单数量
* getOrderStatusCount
* @return void
* @author chenlong
* 2016-8-31
 */
function getOrderStatusCount(){
	var url = "purchaseorder/getStatusCountForOut.do";
	var params={company_id:companyId};
	var fn = function(result) {
		var data = result.data;
		if(result.success == true){
		$(".tab").children("li").each(function(index,element){
			switch(index){
			case 0:
				$(element).html("全部订单("+data.allOrderCount+")"+"<span class='split'>|</span>");
				break;
			case 1:
				$(element).html("待确认订单("+data.comimtOrderCount+")"+"<span class='split'>|</span>");
				break;
			case 2:
				$(element).html("已接订单("+data.comfrimOrderCount+")"+"<span class='split'>|</span>");
				break;
			case 3:
				$(element).html("交货完成订单("+data.overOrderCount+")"+"<span class='split'>|</span>");
				break;
			case 4:
				$(element).html("待确认终止订单("+data.queryOrderCount+")"+"<span class='split'>|</span>");
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
	var url = "purchaseorder/getPurchaseOrderListForOut.do";
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
if(operator_name != ""){
	 params.operator_name = operator_name;
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
	var url = "purchaseorder/getPurchaseOrderListForOut.do";		
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
	$(tabId + " .tab").children().find("span .split").css("display","inline");
//	$(tabId + " .tab").children().eq(tabNum).prev().find("span .split").css("display","none");
	//根据参数决定显示内容
	switch(tabNum){
	case 0:
		status_s = 0;
		delete_flag_d = 0;	
		$("#button_all_delete").css("display","inline");
		$("#button_all_remark").css("display","inline");
		$("#button_all_cancel").css("display","inline");
		$("#button_all_return").css("display","none");
		$(".orderRecycleBin").removeClass("orderRecycleBinActive");
		break;
	case 1:
		status_s = 10;
		delete_flag_d = 0;
		$("#button_all_delete").css("display","none");
		$("#button_all_remark").css("display","inline");
		$("#button_all_cancel").css("display","inline");
		$("#button_all_return").css("display","none");
		$(".orderRecycleBin").removeClass("orderRecycleBinActive");
		break;
	case 2:
		status_s = 20;
		delete_flag_d = 0;	
		$("#button_all_delete").css("display","none");
		$("#button_all_remark").css("display","inline");
		$("#button_all_cancel").css("display","none");
		$("#button_all_return").css("display","none");
		$(".orderRecycleBin").removeClass("orderRecycleBinActive");
		break;
	case 3:
		status_s = 30;
		delete_flag_d = 0;
		$("#button_all_delete").css("display","inline");
		$("#button_all_remark").css("display","inline");
		$("#button_all_cancel").css("display","none");
		$("#button_all_return").css("display","none");
		$(".orderRecycleBin").removeClass("orderRecycleBinActive");
		break;
	case 4:
		status_s = 40;
		delete_flag_d = 0;	
		$("#button_all_delete").css("display","none");
		$("#button_all_remark").css("display","inline");
		$("#button_all_cancel").css("display","none");
		$("#button_all_return").css("display","none");
		$(".orderRecycleBin").removeClass("orderRecycleBinActive");
		break;
	case 5:
		status_s = 50;
		delete_flag_d = 0;
		$("#button_all_delete").css("display","inline");
		$("#button_all_remark").css("display","inline");
		$("#button_all_cancel").css("display","none");
		$("#button_all_return").css("display","none");
		$(".orderRecycleBin").removeClass("orderRecycleBinActive");
		break;
	case 6:
		status_s = 100;
		delete_flag_d = 1;	
		$("#button_all_delete").css("display","inline");
		$("#button_all_remark").css("display","none");
		$("#button_all_cancel").css("display","none");
		$("#button_all_return").css("display","inline");
		$(".orderRecycleBin").addClass("orderRecycleBinActive");
		break;
	}
	selectInt();//将所有的选中都初始化
	initParams();//初始化所有的条件
	returnText(tabNum);//是否返回提示框
	getOrderDetails();//请求相应的订单
	getOrderStatusCount();//返回相应的统计条数
	
//	$(tabId + " .tab").children().eq(tabNum).prev().find("span").css("display","none");
}

/**显示下单日期的选择框
 * showSelect void
 * @author wangjialin
 * 2016-8-10 上午11:01:35
 */
/*function showSelect(){
	$("#dateSelect").show();
}*/
/*function chooseDate(){
	var option =$("#dateSelect option:selected").text();
	order_date_type = $("#dateSelect option:selected").val();
	$("#date").text(option);
}*/
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
		order_date_type = $(this).val();
		$(this).parent().prev().html(txt+'<img src="/newresources/images/switchover.png" class="f_r mr4 mt4">');
		$(this).parent().hide();
		$(".mask_opacity").hide();
	});
}


/**批量备注
* orderMemoList
* @return void
* @author chenlong
* 2016-8-29
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
/**
* 保存备忘信息
* saveRemarkinfo
* @return void
* @author chenlong
* 2016-8-20
 */
function saveRemarkinfo(robj){
	var id = $("#hide_remark_id").val();
	var sup_memo = $("#content_remark").val().trim();//备注信息
	if(parseInt(id) != 0){//单条备注	
	var url = "purchaseorder/updateOrderRemarkForOut.do";
	var params = {pur_order_id:id,pur_memo:sup_memo};
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
	var url = "purchaseorder/updateOrderRemarklistForOut.do";
	var params = {pur_memo:sup_memo,check:check};	
	params.orderId = {};//定义一个对象中的对象
	for (x in param) {
		params.orderId[x] = param[x];//将参数赋值进入该对象中
	}
	params.lengthd = param.length;
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
 * 单个删除订单
* deleteOrder
* @param id
* @return void
* @author chenlong
* 2016-8-26
 */
function deleteOrder(id){
	if(status_s != 100){
	var urlo = "purchaseorder/getPurchaseOrderStatusFordeleteForOut.do";
	var params = {pur_order_id:id};	
	var fno = function (result){
		datav = parseInt(result.data);
		if(datav == 0){
	        window.wxc.xcConfirm("您确认要删除这条订单吗？</br>删除后的订单进入回收站", window.wxc.xcConfirm.typeEnum.confirm,
			{	
			onOk:function(){
			var url = 'purchaseorder/deletePurchaseOrderForOut.do';		
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
		var urlo = "purchaseorder/getPurchaseOrderStatusFordeleteForOut.do";
		var params = {pur_order_id:id};	
		var fno = function (result){
			datav = parseInt(result.data);
			if(datav == 1){
		        window.wxc.xcConfirm("您确认要删除这条订单吗？</br>删除后的订单将无法恢复", window.wxc.xcConfirm.typeEnum.confirm,
				{	
				onOk:function(){
				var url = 'purchaseorder/deletePurchaseOrderVoForOut.do';		
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
/**批量删除订单
* orderMemodelete
* @return void
* @author chenlong
* 2016-8-29
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
			var url = 'purchaseorder/deletePurchaseOrderlistForOut.do';
			var params={};
			params.orderId = {};//定义一个对象中的对象
			for (x in param) {
				params.orderId[x] = param[x];//将参数赋值进入该对象中
			}
			params.lengthd = param.length;
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
				var url = 'purchaseorder/deletePurchaseOrderlistVoForOut.do';
				var params={};
				params.orderId = {};//定义一个对象中的对象
				for (x in param) {
					params.orderId[x] = param[x];//将参数赋值进入该对象中
				}
				params.lengthd = param.length;
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
 * 鼠标上移及离开的效果
 * @author wangjialin
 * 2016-8-11 下午5:23:03
 */
function mouseOver_order(){
$(".messageLogo").mouseover(function(){
	$(this).parents(".messageAndFile").find(".message").show();
});
$(".messageLogo").mouseleave(function(){
	$(this).parents(".messageAndFile").find(".message").hide();
});
$(".fileLogo").mouseover(function(){
	$(this).parents(".messageAndFile").find(".newFile").show();
});
$(".fileLogo").mouseleave(function(){
	$(this).parents(".messageAndFile").find(".newFile").hide();
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


/**取消订单处展示取消原因下拉框
* showCancelReason void
* @author wangjialin
* 2016-8-29 下午5:07:38
*/
function showCancelReason(){
	$(".reasonSelect").toggleClass("hide");
}

/**
 * 取消订单
* show_cancel
* @param id
* @return void
* @author chenlong
* 2016-8-29
 */
function show_cancel(id){
	$("#hide_cancel_id").val(id);
	var url ="purchaseorder/getPurchaseOrderStatus.do";
	var params = {pur_order_id:id};
	var fn = function(result){
	if(parseInt(result.data)==10){
		pop_div_show('cancelOrder');
		$("#reasonDiv_Order").text("取消采购计划");
		$("#reasonDiv_Order").append("<img src='/newresources/images/switchover.png' class='f_r'>");
		$("#content_cancel").val("");
	    }else{
	if(parseInt(result.data)==20){
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
/**
 * 批量取消订单
* show_cancel
* @param id
* @return void
* @author chenlong
* 2016-8-29
 */
function show_cancellist(){
	var count = 0;
	$("#allOrders").find(":checkbox").each(function(){
		if ($(this).is(":checked")) {
		count ++;		
		}
		});
	if(count>0){
		$("#hide_cancel_id").val(0);	
		pop_div_show('cancelOrder');
		$("#reasonDiv_Order").text("取消采购计划");
		$("#reasonDiv_Order").append("<img src='/newresources/images/switchover.png' class='f_r'>");
		$("#content_cancel").val("");
	}else{
		var option ={title:"提示",btn:parseInt("0001",2)};
		window.wxc.xcConfirm("你一条订单也没选择！", window.wxc.xcConfirm.typeEnum.custom,option);
	}		  
}
/**
 * 取消订单
* cancelOrder
* @return void
* @author chenlong
* 2016-8-29
 */
function cancelOrder(){
	var id = $("#hide_cancel_id").val();
	if(parseInt(id) != 0){	
	var params = {pur_order_id:id};	
			 window.wxc.xcConfirm("您确认要取消这条订单吗？", window.wxc.xcConfirm.typeEnum.confirm,
						{	
						onOk:function(){
						var url = 'purchaseorder/cancelPurchaseOrder.do';	
						var cancel_resuon = $("#content_cancel").val().trim();
						if(cancel_resuon.length>150){
						var option ={title:"提示",btn:parseInt("0001",2)};
						window.wxc.xcConfirm("字数不能超过150字！", window.wxc.xcConfirm.typeEnum.custom,option);	
						}else{
						var canel_type = $("#reasonDiv_Order").text();
						if(canel_type=="订单信息变更"){
							params.cancel_reason = 1;//
						}					
						if(canel_type=="取消采购计划"){
							params.cancel_reason = 2;//
						}
						if(canel_type=="其他原因"){
							params.cancel_reason = 3;//
						}
						params.cancel_description = cancel_resuon;
						var fn=function(result){
						   if(result.success == true){
						   var count  = parseInt(result.data);
						   if(count == 0){
						   var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
						   window.wxc.xcConfirm("取消成功", window.wxc.xcConfirm.typeEnum.custom,option);
						   pop_div_close('cancelOrder');
						   getOrderDetails();
						   getOrderStatusCount();
						   }else{
						   xcconfirm=new window.wxc.xcConfirm("当前订单状态已经改变！无法操作",window.wxc.xcConfirm.typeEnum.infoNobtn);
						   pop_div_close('cancelOrder');
						   closeBytimeCount_list(2);	
						   }
						   }   
						};
						asyncAjaxMethod(url,params,true,fn);
						}
						},
						onCancel:function(){
						}
						});
	}else{//批量取消订单
		var param = [];
		var id = 0;
		$("#allOrders").find(":checkbox").each(function(){
				if ($(this).is(":checked")) {
				id = $(this).val();
				param.push(id); 		
				}
		});
		var lengt = param.length;
		if(lengt>0){//删除进入回收站
			window.wxc.xcConfirm("您确认要取消选中的"+lengt+"条订单吗？</br>取消后的订单进入异常订单", window.wxc.xcConfirm.typeEnum.confirm,
				{	
				onOk:function(){
				var url = 'purchaseorder/cancelPurchaseOrderList.do';
				var params={};
				params.orderId = {};//定义一个对象中的对象
				for (x in param) {
					params.orderId[x] = param[x];//将参数赋值进入该对象中
				}
				params.lengthd = param.length;
				var cancel_resuon = $("#content_cancel").val().trim();
				if(cancel_resuon.length>150){
				var option ={title:"提示",btn:parseInt("0001",2)};
				window.wxc.xcConfirm("字数不能超过150字！", window.wxc.xcConfirm.typeEnum.custom,option);	
				}else{
				var canel_type = $("#reasonDiv_Order").text();
				if(canel_type=="订单信息变更"){
					params.cancel_reason = 1;//
				}					
				if(canel_type=="取消采购计划"){
					params.cancel_reason = 2;//
				}
				if(canel_type=="其他原因"){
					params.cancel_reason = 3;//
				}									
				params.cancel_description = cancel_resuon;
				var fn=function(result){
				 var i = result.data;
				 if(parseInt(i)>0){
					 if(parseInt(i)==lengt){
					  var option ={title:"提示",btn:parseInt("0001",2)};
					  window.wxc.xcConfirm("你选中的"+lengt+"条数据由于订单状态,无法取消", window.wxc.xcConfirm.typeEnum.custom,option); 
					 }else{
					  var option ={title:"提示",btn:parseInt("0001",2)};
					  window.wxc.xcConfirm("你选中的"+i+"条数据由于订单状态,无法取消,其余都已取消", window.wxc.xcConfirm.typeEnum.custom,option); 
					 } 
				  }else{
				      var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
				      window.wxc.xcConfirm("你选中的"+lengt+"条数据都已取消,进入异常订单", window.wxc.xcConfirm.typeEnum.custom,option); 
				  }
				 pop_div_close('cancelOrder');
				 getOrderDetails();
				 getOrderStatusCount();
				 $('#selectAll').prop("checked", false);
				};
				asyncAjaxMethod(url,params,true,fn);
				}
				},
				onCancel:function(){
				}
				});
		}else{
			 var option ={title:"提示",btn:parseInt("0001",2)};
			 window.wxc.xcConfirm("你一条订单也没选择！", window.wxc.xcConfirm.typeEnum.custom,option);
		}	
	}
}


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
 * @author wangjialin
 * 2016-8-12 上午10:33:30
 */
function stopDetail(id)
{
	var url = "purchaseorder/getOrderStopDetailsForOut.do";
	var params = {pur_order_id:id,status_s:status_s};
	var fn = function(result){
		if(result.success==true){
			var data = result.data;
			$("#order_cha_stop").html(""); 
			var evalText=doT.template($("#order_stop_cha").text());
			$("#order_cha_stop").html(evalText(data));	
			pop_div_show("stopDetail");	
		}
	};
	asyncAjaxMethod(url,params,true,fn);
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
/**取消终止
 * stopAgree void
 * @author wangjialin
 * 2016-8-12 上午10:35:02
 */
function stopAgree(id)
{
	var url ="purchaseorder/getPurchaseOrderStatus.do";
	var params = {pur_order_id:id};
	var fn = function(result){
	if(parseInt(result.data)==40){
		window.wxc.xcConfirm("您确认要取消终止选中的这条订单吗？</br>取消后的订单将进入已接单状态", window.wxc.xcConfirm.typeEnum.confirm,
				{
		onOk:function(){
		var urlo = "purchaseorder/updateOrderForStop.do";
		params.ft_id = 38;
		var fno = function(results){
			var data = results.data;
			var count = parseInt(data);
			if(count==0){
				var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
				window.wxc.xcConfirm("取消成功", window.wxc.xcConfirm.typeEnum.custom,option);
				getOrderDetails();
				getOrderStatusCount();
			}else{
				xcconfirm=new window.wxc.xcConfirm("当前订单状态已经不是“待确认终止”状态！",window.wxc.xcConfirm.typeEnum.infoNobtn);
				closeBytimeCount_list(2);
			}
		};			
		asyncAjaxMethod(urlo,params,true,fno);
			},
		onCancel:function(){
			}
			});
	    }else{	
		 xcconfirm=new window.wxc.xcConfirm("当前订单状态已经不是“待确认终止”状态！",window.wxc.xcConfirm.typeEnum.infoNobtn);
		 closeBytimeCount_list(2);		
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**添加备忘
 * orderMemo void
 * @author wangjialin
 * 2016-8-16 下午3:42:32
 */
function orderMemo(id)
{
	$("#hide_remark_id").val(id);
	var url = "purchaseorder/getOrderRemarkForOut.do";
	var params = {pur_order_id:id};
	var fn = function(result){
	if(result.success==true){
			var info = result.data.memo;
			$("#content_remark").val(info);
			$("#check_remark").hide();
			$("#orderMemo").find(".title_wrap span").html("订单备忘");
			countWords();
			pop_div_show("orderMemo");//显示备注框
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
	var urlo = "purchaseorder/getPurchaseOrderStatusFordeleteForOut.do";
	var params = {pur_order_id:id};	
	var fno = function (result){
		datav = parseInt(result.data);
		if(datav == 1){
	        window.wxc.xcConfirm("您确认要还原这条订单吗？", window.wxc.xcConfirm.typeEnum.confirm,
			{	
			onOk:function(){
			var url = 'purchaseorder/returnPurchaseOrderForOut.do';		
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
 * 批量还原
* orderReturnList
* @return void
* @author chenlong
* 2016-8-30
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
				var url = 'purchaseorder/returnPurchaseOrderlistVoForOut.do';
				var params={};
				params.orderId = {};//定义一个对象中的对象
				for (x in param) {
					params.orderId[x] = param[x];//将参数赋值进入该对象中
				}
				params.lengthd = param.length;
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
/**终止订单
 * stopOrder void
 * @author wangjialin
 * 2016-8-31 上午9:53:35
 */
function stopOrder(id){
	$("#hide_stop_id").val(id);
	var url ="purchaseorder/getPurchaseOrderStatus.do";
	var params = {pur_order_id:id};
	var fn = function(result){
	if(parseInt(result.data)==20){
		var urlo = "orderAgreementFile/getOrderAttchedFileForOne.do";
		params.ft_id = 38;
		var fno = function(results){
			var data = results.data;
			var item ="";
			if(data != null){
				item=data.order_attched_name+data.suffix_name;	
				$("#button_stop_file").hide();
			}else{
				$("#button_stop_file").show();
			}
			pop_div_show("stopOrder");
			$("#stopContent").val("");					    
        	$(".uploadFileNameForStop").text(item);
        	if(data != null){
        	$(".uploadFileNameForStop").append("<img src='/newresources/images/sale/del.png' class='del' onclick='clean("+data.order_attched_id+")'>");
        	}
        };
		asyncAjaxMethod(urlo,params,true,fno);
	    }else{
	 if(parseInt(result.data)==30){
		 xcconfirm=new window.wxc.xcConfirm("当前订单状态已经“完成”状态！",window.wxc.xcConfirm.typeEnum.infoNobtn);
		 closeBytimeCount_list(2);
	    }else{
		 xcconfirm=new window.wxc.xcConfirm("当前订单状态已经不是“已接订单”状态！",window.wxc.xcConfirm.typeEnum.infoNobtn);
		 closeBytimeCount_list(2);	
		}
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 保存终止信息
* saveStopOrder
* @return void
* @author chenlong
* 2016-8-31
 */
function saveStopOrder(){
	var id = $("#hide_stop_id").val();
	var stopContent = $("#stopContent").val().trim();
	if(stopContent == ""){
	var option ={title:"提示",btn:parseInt("0001",2)};
	window.wxc.xcConfirm("终止理由不能为空！", window.wxc.xcConfirm.typeEnum.custom,option);
	}else if(stopContent.length >150){
	var option ={title:"提示",btn:parseInt("0001",2)};
	window.wxc.xcConfirm("字数不能超过150字！", window.wxc.xcConfirm.typeEnum.custom,option);
	}else{
	var url = "purchaseorder/addOrderEndRecord.do";
	var params ={pur_order_id:id,end_description:stopContent};
	var fn = function(result){
	var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
	window.wxc.xcConfirm("终止申请成功！等待对方确认！", window.wxc.xcConfirm.typeEnum.custom,option);
	getOrderDetails();
	getOrderStatusCount();
	pop_div_close('stopOrder');
	};
	asyncAjaxMethod(url,params,true,fn);
	}
}
/**
 * 上传终止文件
* showUploadFile
* @return void
* @author chenlong
* 2016-8-31
 */
function showUploadFile(){
	var fileIsNull = $(".uploadFileNameForStop").text();
	if(fileIsNull==""){
	var filename=$("#stopOrderUploadInput").val();
	var id = $("#hide_stop_id").val();	
	if(filename!=""){	
		var spinner = new Spinner(opts);
   		$("#stopOrderUploadInput").parent().append("<div id='processFile_spin_wrap'></div>");
	   	$("#processFile_spin_wrap").addClass("inner_spin_mask");
		spinner.spin(document.getElementById("processFile_spin_wrap"));
		
		var fileurl = "orderAgreementFile/addOrderStopFile.do";
		var params = {pur_order_id:id,argee:false,companyId:companyId};
		var fn = function(data){
        	//关闭loding效果
   			spinner.spin();
   			$("#processFile_spin_wrap").remove();
        if (data.success==true ) { 
        	$("#button_stop_file").hide();
        	var item=data.filename+data.suffix_name;		    
        	$(".uploadFileNameForStop").text(item);	
        	$(".uploadFileNameForStop").append("<img src='/newresources/images/sale/del.png' class='del' onclick='clean("+data.order_attched_id+")'>");
        }else{
        	var option ={title:"提示",btn:parseInt("0001",2)};
            window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
            }
		};
	    addInputUtilFile(fileurl,params,"stopOrderUploadInput",fn);
		
	   	   /*$.ajaxFileUpload({
		        url: getwebroot()+'orderAgreementFile/addOrderStopFile.do', //用于文件上传的服务器端请求地址
		        data: {pur_order_id:id,argee:false,companyId:companyId},  //任务id参数		  
		        fileElementId: "stopOrderUploadInput",//input type=file 的id
		        dataType: 'json',//返回值类型 一般设置为json
		        success: function (data, status){
		        	//关闭loding效果
		   			spinner.spin();
		   			$("#processFile_spin_wrap").remove();
		        if (data.success==true ) { 
		        	$("#button_stop_file").hide();
		        	var item=data.filename+data.suffix_name;		    
		        	$(".uploadFileNameForStop").text(item);	
		        	$(".uploadFileNameForStop").append("<img src='/newresources/images/sale/del.png' class='del' onclick='clean("+data.order_attched_id+")'>");
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
		        });	*/	 
	   	   }else{
	   		var option ={title:"提示",btn:parseInt("0001",2)};
        	window.wxc.xcConfirm('文件为空', window.wxc.xcConfirm.typeEnum.custom,option);
	   	   }
	}else{
		var option ={title:"提示",btn:parseInt("0001",2)};
    	window.wxc.xcConfirm('文件已上传！！', window.wxc.xcConfirm.typeEnum.custom,option);
	}
}
/**
 * 更新终止的文件状态为不可用
* clean
* @param attched_id
* @return void
* @author chenlong
* 2016-9-19
 */
function clean(attched_id){
	var url = "orderAgreementFile/updateOrderAttchedFileStop.do";
	var params ={order_attched_id:attched_id};
	var fn = function(result){
	if(result.success==true){	
		$("#input_filename").html("");
		$("#button_stop_file").show();
	}else{
		var option ={title:"提示",btn:parseInt("0001",2)};
        window.wxc.xcConfirm("删除该文件失败", window.wxc.xcConfirm.typeEnum.custom,option);
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
		var otherwindow = window.open(getwebroot()+"purchaseorder/orderDetailForPurchase/"+id+".htm",resultName);
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
	window.open(getwebroot()+"purchaseorder/orderDetailForPurchase/"+id+".htm",resultName);
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
	window.open(getwebroot()+"purchaseorder/orderDetailForPurchase/"+id+".htm",resultName);
}
/**计算输入的字符数
 * countWords void
 * @author wangjialin
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