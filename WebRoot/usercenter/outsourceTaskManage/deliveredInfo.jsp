<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>外协任务单到货信息</title>

<link href="/newresources/css/task.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/sendOutManage.css" rel="stylesheet" type="text/css" />
<%@ include file="/newresources/js/base.jsp" %>
<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>
<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/taskStaticBar.js"></script>
	<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript">
	var taskid = getParamFromWindowName("task_id");
	//质检的方式
	var qc_type="";
	//质检数量标记
	var qc_num_flag=false;
	//不合格数量标记
	var unqualified_num_flag=false;
	//批次号标记
	var qc_no_flag=false;
	var number_reg=/^(0|[1-9][0-9]*)$/;
	$(function(){
		var url="externalTask/getTaskByID.do";
		var params={};
		params.t_id=taskid;
   		var fn=function(result){
   			var task=result.data;
   			qc_type = task.qc_type;//质检的方式 			
   		    $("#ReturnQtyVo").html("");
		    var evalText=doT.template($("#returnQtyImpl").text());
		    $("#ReturnQtyVo").html(evalText(task));
   			//任务单名称
			$("#taskname_head").html("任务单:"+task.product_name);
			//任务单流水号
			$("#serialno_head").html(task.serial_no+"/"+task.rwdh+"("+task.ddh+")"+"/"+task.scdh);
   			//初始化任务条
			$("#outsourceTaskStaticBar").taskStaticBar_init({type:1});
			$("#outsourceTaskStaticBar").taskStaticBar_showByTask(task);
   		};
   		asyncAjaxMethod(url,params,true,fn);
   		loadCommonPage();
		$(".midd_wrap").css({minHeight:$(window).height()-240});
		window.onresize=function(){
			$(".midd_wrap").css({minHeight:$(window).height()-240});
			
		};
		initParams();
		getShippingDetails();	
	});
	/**
 * 选择未质检的物流信息
 * @param obj
 */
function valid_qc_no(obj){
    if($("#qc_noAll").val() != 0){
    var url="logisticsItem/getLogisticsItemforCount.do";
	var params ={};
	params ={};
	params.item_id = $("#qc_noAll").val();
	var fn = function(result){
	var data = result.data.arrived_no;
	$("#qc_countAll").val(data);
	$("#qc_numAllvo").val(data);
	};
	asyncAjaxMethod(url,params,true,fn);
	}else{
			window.wxc.xcConfirm("请选择批次号");
		}
}
	function close_window(id)
	{
	    $("#qc_file_name_ed").val("");
		$("#"+id).fadeOut("fast");
		$(".mask").fadeOut("fast");
	}
	
	//加载公用部分界面，如同步，底部，左侧菜单等
	function loadCommonPage(){
		$("#top").load(getwebroot()+"platform/top.html",function(responseTxt,statusTxt,xhr){
		    if(statusTxt=="success")
		      $("#mainNav").children().eq(0).addClass("curr");
		      $("#company").parent().css("display","none");
		  });
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	}
	
	function go_logistics()
	{
	  	 var param ={"task_id":taskid};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"externalTask/outsourceLogisticsInfo/"+taskid+".htm";
	}
	
	function go_tasklist()
     {
	window.location.href=getwebroot()+"externalTask/outsourceTaskList.htm";
    }
	function go_taskInfo()
	{
		var param ={"task_id":taskid};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"externalTask/outsourceTaskInfo/"+taskid+".htm";
	}
	function go_productionInfo(){
		var param ={"task_id":taskid};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"externalTask/outsourceProductionInfo/"+taskid+".htm";
	}
	
	function go_connection(){
		var param ={"task_id":taskid};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"externalTask/outsourceConnection/"+taskid+".htm";
	}
	function go_qualityControl(){
		var param ={"task_id":taskid};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"externalTask/outsourceQualityControl/"+taskid+".htm";
	}
</script>
<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/deliveredInfo.js"></script>
</head>

<body class="bg_grey" style="min-Height:970px;">
<div class="mask_opacity"></div>
<div id="top"></div>

<!--中间-->
<div class="midd_wrap p10 pb30 bg_white">
	<div class="breadcrumb_wrap">
			当前位置：<a href="/usercenter/accountManage/registerInfo.html">企业中心</a><span  class="p5">&gt;</span>
			<a href="/usercenter/purchaseManage/purchaseCenter.html">采购</a><span  class="p5">&gt;</span>
		<a href="javascript:void(0)" onclick="go_tasklist()">外协任务单列表</a><span class="p5">&gt;</span><span id="taskname_head"></span>
	</div>
	<hr class="hr_dashed_grey" />
	<!--外协任务单状态进度条-->
	<div id="outsourceTaskStaticBar"></div>
	<div class="task_nav_wrap mt20">
		<span class="l_wrap">外协任务单</span><span  class="p5">&gt;</span><span id="serialno_head"></span>
		<ul class="r_wrap">
			<li><a href="javascript:void(0)" onclick="go_taskInfo()">任务单详情</a></li>
			<li><a href="javascript:void(0)" onclick="go_logistics()">发料信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_productionInfo()">生产信息</a></li>
			<li><a href="javascript:void(0)" class="curr">到货信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_qualityControl()">质检信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_connection()">交流合作</a></li>
		</ul>
	</div>
	<div class="amount_wrap mt20 ml10" id="ReturnQtyVo"></div>
	<div class="search_wrap mt20 ml10" >
		<label class="f_l">类型：</label>
		<div class="posR f_l">
			<div class="wrap1" id="shippingType" onclick="showSelect(this)"><span>全部类型</span><img src="/newresources/images/switchover.png" class="f_r mr4 mt4"></div>
			<ul class="posA selectWrap">
				<li >全部类型</li>
				<li >发货单</li>
				<li >返修品清单</li>
			</ul>
		</div>
		<label class="f_l ml4">状态：</label>
		<div class="posR f_l">
			<div class="wrap1" id="status_s" onclick="showSelect(this)"><span>全部状态</span><img src="/newresources/images/switchover.png" class="f_r mr4 mt4"></div>
			<ul class="posA selectWrap" >
				<li >全部状态</li>
				<li >待收货</li>
				<li >已收货</li>
				<li >已取消</li>
			</ul>
		</div>
		<div class="posR f_l ml8">
			<div class="wrap1" id="date_type" onclick="showSelect(this)"><span>发货日期</span><img src="/newresources/images/switchover.png" class="f_r mr4 mt4"></div>
			<ul class="posA selectWrap" >
				<li >发货日期</li>
				<li >收货日期</li>
			</ul>
		</div>
		<div class="f_l ml5">
			<input class="wrap2 Wdate" id="start_time" onClick="WdatePicker({maxDate:'#F{$dp.$D(\'end_time\')}',readOnly:true})" placeholder="起始日期">
			<label style="color:#e8e8e8;" >-</label>
			<input class="wrap2 Wdate" id="end_time" onClick="WdatePicker({minDate:'#F{$dp.$D(\'start_time\')}',readOnly:true})" placeholder="结束日期">
		</div>
		<label class="f_l ml8">发货单号：</label>
		<div class="f_l ">
			<input type="text" class="recordNum" id="shipping_num" style="margin-top:-5px;"/>
			<button class="search_btn" onclick="getShippingDetails()">搜索</button>	
		</div>			
	</div>
	<table class="arriveList">
		<tr>
			<th class="col1">发货日期</th>
			<th style="width:auto;">对应发货单</th>
			<th class="col2 left">对方发货数(件)</th>
			<th class="col2 left">实际到货数(件)</th>
			<th class="col3">收货日期</th>
			<th class="col4">物流信息</th>
			<th class="col5">状态</th>
		</tr>
		
		
	</table>	
<div id="paginationcom" class="quotes"></div>
<!--弹框开始  -->
	<div class="mask" id="pop_mask"></div>
	<div id="showInvoiceInfo" class="showInvoiceInfo clearfix">
		<div class="t_algin_r"><a class="invoiceClose" href="javascript:void(0)" onClick="pop_div_close('showInvoiceInfo')" title="关闭窗口">X</a></div>
		<div id="invoiceInfoCon" ></div>
	</div>
<!--弹框结束  -->
</div>
<!--底端-->
<div id="bottom"></div>
<script id="shippingImlinfo" type="text/x-dot-template">
     {{for(var prop in it.list){}}
         <tr>
			<td class="left">
				<div><span>{{= replaceNullAsStr(it.list[prop].start_date).slice(0,10) }}</span><span class="ml10">{{= replaceNullAsStr(it.list[prop].start_week)}}</span></div>
				<div class="registerTime"><span>{{= replaceNullAsStr(it.list[prop].create_time).slice(0,10) }}</span><span class="ml10">{{= replaceNullAsStr(it.list[prop].create_time).slice(11,19) }}登记</span></div>
			</td>
			<td class="left"><a onclick="showReceiptInfo(this)">{{= replaceNullAsStr(it.list[prop].deliver_number) }}</a>
           {{? it.list[prop].deliver_type ==1 }}
             <span class="repair">返修品</span>
           {{??}}
           {{?}}
            </td>
			<td class="left">{{= replaceNullAsStr(it.list[prop].delivery_quantity) }}</td>
			<td class="left">{{= replaceNullAsStr(it.list[prop].receive_no) }}</td>
			<td>{{= replaceNullAsStr(it.list[prop].confirm_dt).slice(0,10)  }}</td>
			<td class="clearfix"><span class="f_l">{{= replaceNullAsStr(it.list[prop].driver) }}</span><span class="ml5 f_l">{{= replaceNullAsStr(it.list[prop].phone_number) }}</span><div class="f_l posR"><img src="/newresources/images/tasks/down.png" class="ml10 down">
            <div class="deliveyInfo">
		      <p><label class="name">车牌号：</label><label class="content">{{= replaceNullAsStr(it.list[prop].licence_plate) }}</label></p>
		      <p><label class="name">运单号：</label><label class="content">{{= replaceNullAsStr(it.list[prop].shipping_number) }}</label></p>
	        </div>
        </div></td>
           {{? it.list[prop].deliver_state ==5}}			
            <td class="wait">待收货</td>
           {{?? it.list[prop].deliver_state ==10}}
            <td class="finish">已收货</td>
           {{?? it.list[prop].deliver_state ==15}}
            <td class="finish">已取消</td>
           {{?}}
		</tr>
	 {{}}}	
        <tr>
		  <td colspan="2" class="total">总计</td>
		  <td class="total">{{= replaceNullAsStr(it.deliver_all) }}</td>
		  <td colspan="4" class="total">{{= replaceNullAsStr(it.deliver_reAll) }}</td>
		</tr>
</script>
<script id="returnQtyImpl" type="text/x-dot-template">
          送货总数量<span id="total" class="num">{{= it.sendout_qty}}</span>件，到货总数量<span id="" class="num">{{=it.confirmed_qtyVo}}</span>件，返修送货总数量<span id="" class="num">{{=it.return_send_qtyVo}}</span>件，返修到货总数量<span id="" class="num">{{=it.return_qtyVo}}</span>件
</script>
</body>
</html>
