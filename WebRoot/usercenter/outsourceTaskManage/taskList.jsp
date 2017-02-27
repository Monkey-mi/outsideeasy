<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=8">
<meta http-equiv="Expires" content="0">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-control" content="no-cache">
<meta http-equiv="Cache" content="no-cache">
<title>外协任务列表页面</title>
<!--page.css 为修改标题新引入  -->
<link href="/newresources/css/page.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/taskList.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" />
</head>

<body class="bg_grey">
<div id="top"></div>

<!--中间-->
<div class="breadcrumb_wrap" style="width:1012px;padding-left:12px;">
	当前位置：<a href="/supplierForPlateForm/registerInfo.htm">企业中心</a><span  class="p5">&gt;</span>
	<a href="/purchaseCenterCtrl/purchaseCenter.htm">采购</a><span  class="p5">&gt;</span>
	<span class="greycolor">外协任务单列表</span>
</div>
<div class="midd_wrap bg_white">
	<div class="account_right_inner_wrap">
	<div class="task_title">
		<div class="title_font" style="border-bottom:2px solid #f1af27;">外协任务单</div>
	</div>
	<div id="bigImageWrap" class="hide">
		<div class="clearfix" id="bigImage">
			<img src="/newresources/images/tasks/picEnlarge.png">
			<div class="imgFrame"><img src="/newresources/images/login/pic1/1920-1080.png"></div>
		</div>
	</div>
<!-- 	<hr class="hr_dashed_grey" />	 -->
	<div class="show-wrap">
		<ul class="tasklist_tab">
			<li class="curr"  onClick="showInfo(0)"><span>全部任务单</span><span class="split">|</span></li>
			<li onClick="showInfo(1)"><span>未派单任务</span><span class="split">|</span></li>
			<li onClick="showInfo(2)"><span>待接收任务</span><span class="split">|</span></li>
			<li onClick="showInfo(3)"><span>在生产任务</span><span class="split">|</span></li>
			<li onClick="showInfo(4)"><span>在验收任务</span><span class="split">|</span></li>
			<li onClick="showInfo(5)"><span>已完结任务</span><span class="split">|</span></li>
			<li onClick="showInfo(6)"><span>异常任务</span></li>
		</ul>
		<div class="filter_conditions clearfix">
		
			<select class="select_date_type" id="select_date_type" style="vertical-align:top;">
				<option value="1">计划开工日期</option>
				<option value="2">接单日期</option>
				<option value="3">派单日期</option>
			</select>
			
			<input type="text" id="start_filter_date" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',onpicked: pickedFunc1,onclearing:clearingFunc1,readOnly:true,maxDate:'#F{$dp.$D(\'end_filter_date\')}'})" readonly="readonly" class="Wdate" style="margin-left:4px;vertical-align:top;"/><span style="vertical-align:top;">至</span>
			<input type="text" id="end_filter_date" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',onpicked: pickedFunc2,onclearing:clearingFunc2,readOnly:true,minDate:'#F{$dp.$D(\'start_filter_date\')}'})" readonly="readonly"class="Wdate" style="vertical-align:top;"/>	
			
			<input id="search_text" class="search_text" type="text"  placeholder="输入产品名称、外协单位名称、任务单号、内部单号、订单号关键词查询" style="margin-left:4px; vertical-align:top;"/>
			<input type="button" id="companySearch" class="filter_search_btn"  onclick="dosearch()" style="vertical-align:top;"/>
			
		</div>
<!-- 		<hr class="hr_grey_dashed" /> -->
		<div class="task_item_wrap pb80">
			<div class="take_all_do">
				<div class="inline_block">
					<label style="vertical-align:top;"><input id="all_select" type="checkbox" value="" onClick="selectAll()"/>&nbsp;全选</label>
					<a class="link_blue_color" onclick="sendOrderList()">派单</a>
					<a class="link_blue_color" onclick="recoverOrderLsit()">收回派单</a> 
				</div> 
				<div id="show_current_task_num" class="inline_block" style="float:right"></div>
			</div>
		
			<div class="task_item_show">
				<table >
					<thead>
						<tr>
							<th width="250px">产品信息</th>
							<th width="130px">数量</th>
							<th width="105px">计划开工
								<div class="byOrder">
									<a  onclick="byOrderFocus(true,this,'plan_time')">
										<img src="/newresources/images/tasks/up-gray.png">
									</a>
									<a onclick="byOrderFocus(false,this,'plan_time')" class="mt4">
										<img src="/newresources/images/tasks/down-gray.png" style="vertical-align:bottom;">
									</a>
								</div>
							</th>
							<th width="105px">计划完工</th>
							<th width="168px">外协单位
								<div class="byOrder">
									<a onclick="byOrderFocus(true,this,'out_partten')">
										<img src="/newresources/images/tasks/up-gray.png" >
									</a>
									<a onclick="byOrderFocus(false,this,'out_partten')" class="mt4">
										<img src="/newresources/images/tasks/down-gray.png" style="vertical-align:bottom;">
									</a>
								</div>
							</th>
							<th width="auto">状态</th>
							<th width="131px">操作</th>
						</tr>
					</thead>
					<tbody id="mainTbody">	
					</tbody>
				</table>
			</div> 
			<div id="pagination" class="quotes clearfix"></div>
		</div>
	</div>
</div>
</div>
<!--弹框开始  -->
<div class="mask" id="pop_mask"></div>
<!--终止订单开始  -->
<div id="abortOrder" class="pop_layer_wrap">
    <input id="hide_stop_id" style="display:none">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		终止
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('abortOrder')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap">
		<div class="ml10 mt10 clearfix">
			<div class="f_l cancelReasonTip">终止说明：</div>
			<textarea id="stopContent" class="cancelExplain f_l"></textarea>
		</div>
		<div class="upload posR ml10 mt10 clearfix">
			<div class="cancelReasonTip f_l">终止协议：</div>
			<div class="uploadFileNameForStop f_l bluecolor" id="input_filename" ></div>
			<div class="ml10 f_l" id="button_stop_file" style="overflow:hidden;">
				<button class="uploadContract greyColor" >上传文件</button>
				<input id="stopOrderUploadInput"  name="file" type="file" onchange="showUploadFile()" />
			</div>
		</div>
		<div class="greyColor" style="margin-left:75px;">请双方协商后达成协议上传</div>
		<button class="stop_btn mt20" onClick ="saveStopOrder()">确定</button>
		<button class="cancel_btn mt20" onClick="pop_div_close('abortOrder')" >取消</button>
	</div>
</div>
<!--终止订单结束  -->
<!--查看终止开始  -->
<div id="comfirmAbort" class="pop_layer_wrap">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		终止理由
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('comfirmAbort')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap">
		<div class="ml10 mt20 clearfix">终止原因：<div class="f_r cancel" id="end_result"></div></div>
		<div class="ml10 mt10 mb20 clearfix"><span>终止协议：</span><div class="f_r cancel" id="end_file"></div></div>
		<hr class="hr_grey">
	</div>	
</div>
<!--查看终止结束  -->
<!--底端-->
<div id="bottom"></div>
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>
<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/taskList.js"></script>
<script type="text/javascript">
	$(function(){
		loadCommonPage();
    	showBigImage();
    	hideBigImage();
		$(".midd_wrap").css({minHeight:$(window).height()-200});
	
		window.onresize=function(){
			$(".midd_wrap").css({minHeight:$(window).height()-200});
			
		};
		$("input").keyup(function (event){
	    	if (event.keyCode == "13") {
	            $("#companySearch").click();   
	            return;
	        }
    	});
	});
	//加载公用部分界面，如同步，底部，左侧菜单等
	function loadCommonPage(){
		$("#top").load(getwebroot()+"platform/top.html",function(responseTxt,statusTxt,xhr){
		    if(statusTxt=="success"){
		      getCompanyList(companyId);
		      $("#mainNav").children().eq(0).addClass("curr");
		      companyId = $("#company").val();
		      var tabNum=getParamFromWindowName("tabNum");   			   		
			   	if(tabNum==undefined||tabNum==""){
			   		tabNum=0;   		
			   	}
				showInfo(tabNum);
				initListen();
			 }
		  });
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	}
</script>
</body>
</html>