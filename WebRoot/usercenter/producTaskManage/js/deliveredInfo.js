var taskid = getParamFromWindowName("task_id");

/*$(function(){
	deliveredInfoPro();
});*/
/**
 * 对交互信息的统计
 *//*
function taskCount(){
	var arr_count = $("#deliveredListpr").find("tr:last").find("td:eq(2)").html().lastIndexOf(":");
	var true_count =$("#deliveredListpr").find("tr:last").find("td:eq(2)").html();
	var temp = true_count.substr(parseInt(arr_count)+1);
	var url = "taskqc/getTotalQtyForProducer.do";
	var params = {};
	params.t_id = taskid;
	params.deliver_count = temp;
	var fn = function(result){
		$("#count_tasked").empty();
		var taskcount = result.data;
		var span_v = "";
		if(parseInt(taskcount.unfinished_count)<0){
			span_v = 
			'实际到货总数量  <span >'+temp+'</span> 件 ，质检不合格品 <span style="color:#e60606">'+((taskcount.arrived_qccount==null)?0:taskcount.arrived_qccount)+'</span> 件，超任务完成 <span style="color:#8ec165">'+((taskcount.unfinished_count==null)?0:(-taskcount.unfinished_count))+'</span> 件.';
		}else{
		    span_v = 
			'实际到货总数量  <span >'+temp+'</span> 件 ，质检不合格品 <span style="color:#e60606">'+((taskcount.arrived_qccount==null)?0:taskcount.arrived_qccount)+'</span> 件，距离任务完成 <span style="color:#8ec165">'+((taskcount.unfinished_count==null)?0:taskcount.unfinished_count)+'</span> 件.';
		}
		$("#count_tasked").append(span_v);
	};
	asyncAjaxMethod(url,params,true,fn);
}*/
/*//Tab控制函数
function tabs(tabId, tabNum){
	if(tabNum == 1){
		$("#quality_check_btn").css("display","block");
		
	}else{
		$("#quality_check_btn").css("display","none");
	}

	//设置点击后的切换样式
	$(tabId + " .tab li").removeClass("curr");
	$(tabId + " .tab li").eq(tabNum).addClass("curr");
	//根据参数决定显示内容
	$(tabId + " .tabcon").hide();
	$(tabId + " .tabcon").eq(tabNum).show();
	switch(tabNum){
	case 0:
		deliveredInfoPro();
		break;
	case 1:
		qc_list();
		break;
	}
}*/
/**
 * 物流清单的显示
 *//*
function deliveredInfoPro(){
	var url = "logisticsItem/getlogisticsItemListForProducer.do";
	var params = {};
	params.t_id = taskid;
	var fn = function(result){
		if(result.data != null){
			$("#deliveredListpr tr:gt(0)").empty();
			var logisticsItemCount = result.data.logisticsCount;
			var bottom_total = '<tr style="border:1px solid #facd87;background-color:#fbebc9;">'
				+'<td colspan="2">总计</td>'
				+'<td>已发货总数:'+((logisticsItemCount.deliver_count==null)?"":logisticsItemCount.deliver_count)+'</td>'
				+'<td>实际到货总数:'+((logisticsItemCount.arrived_count==null)?"":logisticsItemCount.arrived_count)+'</td>'
				+'<td>实际交货总数:'+((logisticsItemCount.receive_count==null)?"":logisticsItemCount.receive_count)+'</td>'
				+'<td></td>'
			+'</tr>';
			var logisticsItemlist = result.data.logisticsItemVo;
			var length = logisticsItemlist.length;
			var logisticsItem ="";
			for(var i=0;i<length; i++){
				logistics = logisticsItemlist[i];
				if(logistics.qc_state==1){
				logisticsItem = logisticsItem+
				'<tr>'+
				'<td>'+((logistics.receive_time==null)?"":logistics.receive_time)+'</td>'+
				'<td>'+((logistics.send_id==null)?"":logistics.send_id)+'</td>'+
				'<td>'+((logistics.deliver_no==null)?"":logistics.deliver_no)+'</td>'+
				'<td>'+((logistics.arrived_no==null)?"":logistics.arrived_no)+'</td>'+
				'<td>'+((logistics.receive_no==null)?"":logistics.receive_no)+'</td>'+
				'<td>已被质检</td>'+
			'</tr>';
				}
				if(logistics.qc_state==0){
					logisticsItem = logisticsItem+
					'<tr>'+
					'<td>'+((logistics.receive_time==null)?"":logistics.receive_time)+'</td>'+
					'<td>'+((logistics.send_id==null)?"":logistics.send_id)+'</td>'+
					'<td>'+((logistics.deliver_no==null)?"":logistics.deliver_no)+'</td>'+
					'<td>'+((logistics.arrived_no==null)?"":logistics.arrived_no)+'</td>'+
					'<td>'+((logistics.receive_no==null)?"":logistics.receive_no)+'</td>'+
					'<td>未被质检</a></td>'+
				'</tr>';
				}
			}
			$("#deliveredListpr").append(logisticsItem);
			$("#deliveredListpr").append(bottom_total);
			taskCount();
			}else{
				$("#deliveredListpr").append('<tr><td  style="">暂时没有交货信息</td></tr>');
			}	
	};
	asyncAjaxMethod(url,params,true,fn);
	}
*/
/**
 * 显示质检信息
 */
function qc_list(){
	var url ="taskqc/getTaskQcListForProducer.do";
	var params ={};
	params.t_id = taskid;
	var fn = function(result){
			
		$("#qualityListpr tr:gt(0)").empty();
        var qclists = result.data;	
		var qc_count ="";
		var qc_countlist =qclists.qcCountVo;
		qc_count ='<tr style="border:1px solid #facd87;background-color:#fbebc9;">'
			+'<td colspan="2">总计</td>'
			+'<td>质检总数:'+((qc_countlist.deliver_qccount==null)?"":qc_countlist.deliver_qccount)+'</td>'
			+'<td>不合格数:'+((qc_countlist.arrived_qccount==null)?"":qc_countlist.arrived_qccount)+'</td>'
			+'<td>合格数:'+((qc_countlist.receive_qccount==null)?"":qc_countlist.receive_qccount)+'</td>'
			+'<td></td>'
		+'</tr>';
		var qclist = qclists.qcVos;
		var length = qclist.length;
		var qc_li ="";
		if(length>0){
			for(var i=0;i<length;i++){
			var qc = qclist[i];
			if(qc.send_id==null){
				var qc_li = qc_li+'';
			}else{
				if(qc.qc_file==null||qc.qc_file==""){
					 qc_li = qc_li+
			'<tr>'+
			'<td>'+((qc.qc_time==null)?"":qc.qc_time)+'</td>'+
			'<td>'+((qc.send_id==null)?"":qc.send_id)+'</td>'+
			'<td>'+((qc.qc_count==null)?"":qc.qc_count)+'</td>'+
			'<td>'+((qc.unqualified_no==null)?"":qc.unqualified_no)+'</td>'+
			'<td>'+((qc.qc_true==null)?"":qc.qc_true)+'</td>'+
			'<td>'+
				'<a href="javascript:void(0)"  class="mr10" onClick="view_qc_info('+qc.qc_id+')"><img src="/newresources/images/view.png" />详情</a>'+
			'</td>'+
		'</tr>';
				}else{
			 qc_li = qc_li+
			'<tr>'+
			'<td>'+((qc.qc_time==null)?"":qc.qc_time)+'</td>'+
			'<td>'+((qc.send_id==null)?"":qc.send_id)+'</td>'+
			'<td>'+((qc.qc_count==null)?"":qc.qc_count)+'</td>'+
			'<td>'+((qc.unqualified_no==null)?"":qc.unqualified_no)+'</td>'+
			'<td>'+((qc.qc_true==null)?"":qc.qc_true)+'</td>'+
			'<td>'+
				'<a href="javascript:void(0)" class="mr10" onClick="LoadQcFileinfo('+qc.qc_id+')"><img src="/newresources/images/file.png" />附件</a>'+
				'<a href="javascript:void(0)"  class="mr10" onClick="view_qc_info('+qc.qc_id+')"><img src="/newresources/images/view.png" />详情</a>'+
			'</td>'+
		'</tr>';
			}
			}
			}
			$("#qualityListpr").append(qc_li);
			$("#qualityListpr").append(qc_count);
		}else{
			$("#qualityListpr").append('<tr><td  style="">暂时没有质检信息</td></tr>');
		}
		
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 查询单个质检信息
 * @param qc_id
 */
function view_qc_info(qc_id)
{
	var url ="taskqc/getTaskQcForProducer.do";
	var params ={};
	params.qc_id = qc_id;
	var fn = function(result){
		var qc = result.data;
		$("#label_timepr").html((qc.qc_time==null)?"":qc.qc_time);
		$("#label_sendpr").html((qc.send_id==null)?"":qc.send_id);
		$("#label_qcnopr").html((qc.qc_count==null)?"":qc.qc_count);
		$("#label_qcfalsepr").html((qc.unqualified_no==null)?"":qc.unqualified_no);
		$("#qc_remark_viewpr").html((qc.qc_remark==null)?"":qc.qc_remark);	
	};
	asyncAjaxMethod(url,params,true,fn);
	$(".mask").fadeIn("fast");
	$("#view_quality_checkspr").fadeIn("fast");
	
}
/**
 * 下载质检文件
 */
function LoadQcFileinfo(qc_id){
	var params ={};
	params.qc_id = qc_id;
	var url = "taskqc/selectFileinfoForProducer.do";
	var fn= function(result){
		var filename = result.data;
		if(filename!=null){
			window.open(getwebroot()+'taskFile/downLoadFileFormMongoForProducer.do?file='+filename, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');	
		}else{
			window.wxc.xcConfirm("该质检信息未上传质检文件.联系管理员");
		}	
	};
	asyncAjaxMethod(url,params,true,fn); 
		
}

var pageSize = 10;//每页个数	
var currentPage=0;//当前页码
var companyId = getParamFromWindowName("companyIdForAll");//公司ID

var status_s = 0;//切换的状态位
var date_type = 0;//日期类型
var start_date = "";//到货日期
var end_date = "";//到货日期
var shipping_num = "";//发货单号
var shippingType = 2;//发货类型
/**
* 取到所有参数的值
* orgizaParam
* @return void
* @author chenlong
* 2016-12-19
 */
function orgizaParam(){	
	end_date = $("#end_time").val();//到货日期
	start_date = $("#start_time").val();//到货日期
	shipping_num = $.trim($("#shipping_num").val());//发货单号		
	var status = $("#status_s").find("span").html();//切换的状态位
	switch(status){
	   case '全部状态':
		   status_s = 0;
	   break;
	   case '待收货':
		   status_s = 5;
		   break;
	   case '已收货':
		   status_s = 10;
		   break;
	   case '已取消':
		   status_s = 15;
		   break;
	}
	var date_types = $("#date_type").find("span").html();//发货日期类型
	switch(date_types){	
	   case '发货日期':		   
		   date_type = 0;
	       break;
	   case '收货日期':
		   date_type = 1;
		   break;
	}
	var shippingTypes = $("#shippingType").find("span").html();
	
	switch(shippingTypes){
	   case '全部类型':
		   shippingType = 2;
	       break;
	   case '发货单':
		   shippingType = 0;
		   break;
	   case '返修品清单':
		   shippingType = 1;
		   break;
	}
}
/**
 * 初始化所有的条件
* initParams
* @return void
* @author chenlong
* 2016-12-20
 */
function initParams(){
	$("#end_time").val("");
	$("#start_time").val("");
	$("#shipping_num").val("");
}

/**
 * 查询订单列表
* getOrderDetails
* @return void
* @author chenlong
* 2016-8-18
 */
function getShippingDetails(nums){
	currentPage = 0;
	orgizaParam();
	var url = "taskDeliverGood/getTaskDeliverGoodsforOneTask.do";
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
params.t_id = taskid;
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
 params.shippingType = shippingType ;
 params.date_type = date_type ;
 

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
	};
	console.log(params);
asyncAjaxMethod(url,params,true,fn);	
}
/**供应商信息的翻页调用  
*/
function pageselectCallbacks(index,jq)
{
	orgizaParam();
	var url = "taskDeliverGood/getTaskDeliverGoodsforOneTask.do";		
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
	$(".arriveList tr:eq(0)").nextAll().remove();
	var evalText=doT.template($("#shippingImlinfo").text());
	$(".arriveList tr:eq(0)").after(evalText(result));
	showDeliveryInfo();
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
		$(this).parent().prev().html('<span>'+txt+'</span><img src="/newresources/images/switchover.png" class="f_r mr4 mt4">');
		$(this).parent().hide();
		$(".mask_opacity").hide();
	});
}
/**展示物流信息
 * showDeliveryInfo void
 * @author wangjialin
 * 2016-11-16 下午4:41:32
 */
function showDeliveryInfo(){
	$(".down").mouseover(function(){
		$(this).prop("src","/newresources/images/tasks/downHover.png");
		var obj=$(this).next();
		var length=obj.width()/2;
		obj.css("left",-length);
		obj.show();
	});
	$(".down").mouseleave(function(){
		$(this).prop("src","/newresources/images/tasks/down.png");
		$(this).parent().find(".deliveyInfo").hide();
	});
}

/**展示发货单详情
 * showReceiptInfo
 * @param obj void
 * @author wangjialin
 * 2017-1-4 下午5:02:33
 */
function showReceiptInfo(obj){
	$("#pop_mask").fadeIn("fast");
	var deliverNumber=$(obj).text();
	var param ={"deliver_number":deliverNumber,"task_id":taskid};
	addParamsToWindowName(param);
	$("#invoiceInfoCon").load(getwebroot()+"usercenter/sendOutManage/invoiceInfo.jsp",null,function(responseTxt,statusTxt,xhr){
		$(".midd_left_wrap").remove();
		$(".invoiceTop,.invoiceBottom").remove();
		$("#invoiceMiddWrap").css("width","834px");
	});	
	$("#showInvoiceInfo").fadeIn("fast");
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