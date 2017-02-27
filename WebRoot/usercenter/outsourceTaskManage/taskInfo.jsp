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
<title>外协任务单详情</title>
<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/task.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" />
<link href="/newresources/jquery.ui/jquery-ui.min.css" rel="stylesheet" type="text/css" />
<link href="/newresources/jquery.ui/jquery-ui-custom.css" rel="stylesheet" type="text/css" />
</head>

<body class="bg_grey">
<div id="top"></div>
<!--中间-->
<div class="midd_wrap p10 pb30 bg_white">
	<div class="breadcrumb_wrap">
		当前位置：<a href="/supplierForPlateForm/registerInfo.htm">企业中心</a><span  class="p5">&gt;</span>
		<a href="/purchaseCenterCtrl/purchaseCenter.htm">采购</a><span  class="p5">&gt;</span>
		<a href="javascript:void(0)" onclick="go_tasklist()">外协任务单列表</a><span  class="p5">&gt;</span>
		<span class="greycolor">外协任务单详情</span>
	</div>
	<hr class="hr_dashed_grey" />
	<!--外协任务单状态进度条-->
	<div id="outsourceTaskStaticBar"></div>
	<div class="task_nav_wrap mt20">
		<span class="l_wrap">外协任务单</span><span  class="p5">&gt;</span><span id="serialno_head"></span>
		<ul class="r_wrap">
			<li><a href="javascript:void(0)" class="curr">任务单详情</a></li>
			<li><a href="javascript:void(0)" onclick="go_logistics()">发料信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_productionInfo()">生产信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_deliveredInfo()">到货信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_qualityControl()">质检信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_connection()">交流合作</a></li>
		</ul>
	</div>
	<div class="task_mainInfo_wrap clearfix">
		<!--任务单状态-->
		<div class="task_static_operate_wrap">
			<div class="task_static_bg">
				<p id="show_state" class="title_16s">&nbsp;</p>				
				<div class="task_operate_wrap mb10 mt10" id="stoptask">
					<ul id="stateHeadbutton">																		
					</ul>
				</div>				
			</div>
			<div class="task_baseinfo_wrap clearfix">
				<div class="line_wrap mt8"><span class="left">内部任务单号</span><span id="show_rwdh">&nbsp;</span></div>
				<div class="line_wrap"><span class="left">派单日期</span><span id="show_send_time">尚未派单</span></div>
				<div class="line_wrap">
					<span class="left">计划工期</span>
					<label id="show_plan_start">&nbsp;</label>
					<input type="text" readonly="readonly" id="plan_start" name="plan_start" onClick="WdatePicker({maxDate:'#F{$dp.$D(\'plan_complete\')}',dateFmt:'yyyy-MM-dd',readOnly:true})" class="Wdate edit"/>
					 <label class="ml10 mr10">至</label> <label id="show_plan_complete">&nbsp;</label>
					<input type="text" readonly="readonly" id="plan_complete" name="plan_complete" onClick="WdatePicker({minDate:'#F{$dp.$D(\'plan_start\')}',dateFmt:'yyyy-MM-dd',readOnly:true})" class="Wdate edit"/>
					<a class="edit" href="javascript:void(0)" onClick="task_baseinfo_editshow(this,1)">编辑</a>
				</div>
				<div class="line_wrap">
					<span class="left">外协单位</span>
					<label id="show_receive_company_name">&nbsp;</label>
					<div id="company_combo_wrap" style=" display:none; float:left;width:320px;">
						<select id="task_unit">
							
						</select>
					</div>
					<a class="edit" href="javascript:void(0)" onClick="task_baseinfo_editshow(this,2)">编辑</a>					
				</div>
				<div class="line_wrap">
					<span class="left">任务单说明</span>
					<label id="show_task_remark"></label>
					<textarea  class="defcolor" id="task_remark"></textarea>
					<a class="edit" href="javascript:void(0)" onClick="task_baseinfo_editshow(this,4)">编辑</a>
				</div>
			</div>
		</div>
		<!--统计信息-->
		<div class="task_total_wrap">
			<div class="task_total_wrap_l">
				<div class="total_desc pt40 pb10">
					<span>生产数量</span><span>任务数量</span>
					<p id="produced_total">0/0</p>
				</div>
				<div class="canvas_wrap">
					<canvas id="proCanvas" width="150" height="150">您的浏览器不支持canvas！</canvas>
					<div id="proPecent" class="pecent maincolor"></div>
				</div>
			</div>
			<div class="task_total_wrap_l">
				<div class="total_desc pt40 pb10">
					<span>合格数量</span><span>收货数量</span>
					<p id="qualified_confirmed">0/0</p>
				</div>
				<div class="canvas_wrap">
					<canvas id="passCanvas" width="150" height="150">您的浏览器不支持canvas！</canvas>
					<div id="passPecent" class="pecent greencolor"></div>
				</div>
			</div>
			<div class="prod_period_wrap clear">
				<span class="title_span">生产工期</span>
				<div  class="horizontal_bar_wrap">
					<div class="horizontal_bar_inner">									
						<div class="horizontal_bar_normal">	
						    <div class="horizontal_bar_on">
								<a href="javascript:void(0)" ></a>
							</div>					
							<div class="horizontal_bar"></div>														
						</div>
						<div  id="horizontal_bar_red"  class="horizontal_bar_red">
							<a href="javascript:void(0)" ></a>
						</div>						
					</div>
					 <div id="imageshow" style="position:relative;">
				   
				     </div>										
				</div>
				<span  class="dt_start_wrap">未指定</span>
				<span class="dt_end_wrap">未指定</span>
			</div>
		</div>
	</div>
	<!--产品图片块-->
	<div class="task_show_img_title">
		<span id="show_product_name">&nbsp;</span>
		任务数量<label id="total_qty">0</label>个
	</div>
	<div class="task_show_img_block_wrap clearfix">
		<p class="mb10">产品图片<span class="mini_span">请选择5M以下.jpg、.gif、.png文件</span></p>
		<div class="l_wrap">
			<div class="task_main_img_wrap" id="prcmain_img">
			
			</div>
		</div>
		<div class="spec-scroll"> 
		  	<a class="prev">&lt;</a> <a class="next">&gt;</a>
			<div class="items">
				<ul id="product_ul_file_list">
				
				</ul>
			</div>
		</div>
	</div>
	<!--产品图片块结束-->
	<!--工艺要求相关开始-->
	<div id="comment" class="comment mt30">
		<ul class="tab clearfix">
			<li onClick="tabs('#comment',0)">质检标准</li>
			<li onClick="tabs('#comment',1)">工艺文件</li>
			<li onClick="tabs('#comment',2)" >定额工时</li>
			<li class="curr" onClick="tabs('#comment',3)">材料标准用量</li>
		</ul>
		<div class="tabcon" style="display:none;">
			<h4 class="sub_title_wrap mb20">质检标准
			<span class="mini_span">请选择5M以下.doc/.docx;.ppt/.pptx/.pps;.xls/.xlsx;.pdf;.txt文件</span>
				<div class="f_r_oprate_btn_wrap" id="qc_button_show">
				</div>
			</h4>
			<table class="tablelist" id="QcFileList_show">
			</table>
		</div>
		<div class="tabcon" style="display:none;">
			<h4 class="sub_title_wrap mb20">工艺文件</h4>
			<div style="padding-left:20px;padding-right:20px;">
			<!--作业指导书样式  -->
				<h5 class="sub_2_title_wrap mb20">作业指导书<span class="mini_span">请选择5M以下.doc/.docx;.ppt/.pptx/.pps;.xls/.xlsx;.pdf;.txt文件</span>
				<div class="f_r_oprate_btn_wrap" id="job_instruction_wrap"></div>
				</h5>
				<div class="clearfix" style="max-height:270px;">
					<div  class=" fileTableWrap">
						<table class="tablelist " id="operation_file_list" >
							<tr >
								<td class="left">
								<a onclick="LoadFileinfo(809)" title="head" href="javascript:void(0)">head.txt</a>
								</td>
								<td class="left">
								<span class="color777">2016-09-26 14:33:45</span>
								<span class="remark" style="display:block" title="" ></span>
								</td>
								<td>
								<img class="del" onclick="LoadFileinfo(809)" src="/newresources/images/other/down.png"><a onclick="" class="del">作废</a>
								</td>
							</tr>
							<tr style="text-decoration:line-through;color:#999">
								<td class="left">
								【已作废】<span class="ml10">head.txt</span>
								</td>
								<td class="left">
								<span class="color777">2016-09-26 14:33:45</span>
								<span class="remark" style="display:block" title="" ></span>
								</td>
							</tr>
							<tr >
								<td class="left">
								<a onclick="LoadFileinfo(809)" title="head" href="javascript:void(0)">head.txt</a>
								</td>
								<td class="left">
								<span class="color777">2016-09-26 14:33:45</span>
								<span class="remark" style="display:block" title="" ></span>
								</td>
								<td>
								<img class="del" onclick="LoadFileinfo(809)" src="/newresources/images/other/down.png"><a onclick="" class="del">作废</a>
								</td>
							</tr>
							<tr >
								<td class="left">
								<a onclick="LoadFileinfo(809)" title="head" href="javascript:void(0)">head.txt</a>
								</td>
								<td class="left">
								<span class="color777">2016-09-26 14:33:45</span>
								<span class="remark" style="display:block" title="" ></span>
								</td>
								<td>
								<img class="del" onclick="LoadFileinfo(809)" src="/newresources/images/other/down.png"><a onclick="" class="del">作废</a>
								</td>
							</tr>
							<tr >
								<td class="left">
								<a onclick="LoadFileinfo(809)" title="head" href="javascript:void(0)">head.txt</a>
								</td>
								<td class="left">
								<span class="color777">2016-09-26 14:33:45</span>
								<span class="remark" style="display:block" title="" ></span>
								</td>
								<td>
								<img class="del" onclick="LoadFileinfo(809)" src="/newresources/images/other/down.png"><a onclick="" class="del">作废</a>
								</td>
							</tr>
							<tr >
								<td class="left">
								<a onclick="LoadFileinfo(809)" title="head" href="javascript:void(0)">head.txt</a>
								</td>
								<td class="left">
								<span class="color777">2016-09-26 14:33:45</span>
								<span class="remark" style="display:block" title="" ></span>
								</td>
								<td>
								<img class="del" onclick="LoadFileinfo(809)" src="/newresources/images/other/down.png"><a onclick="" class="del">作废</a>
								</td>
							</tr>
						</table>
					</div>
					<div class="f_r"><a class="lookMore hide" onclick="showScroll(this)">查看更多</a></div>
				</div>
				<hr class="hr_dashed_grey mt20" />
				<h5 class="sub_2_title_wrap mt10 mb20">裁剪产品样板图、排版图<span class="mini_span">请选择5M以下文件</span>
				 <div class="f_r_oprate_btn_wrap" id="other_button_show1">
				
				 </div>
				
				</h5>
				<!-- 列表布局 同作业指导书 copy即可-->
				<table class="tablelist" id="other_file_list1">
				</table>
				<hr class="hr_dashed_grey mt20" />
				<h5 class="sub_2_title_wrap mt10 mb20">丝印、绣花定位图<span class="mini_span">请选择5M以下文件</span>
				 <div class="f_r_oprate_btn_wrap" id="other_button_show2">
				
				 </div>
				
				</h5>
				<!-- 列表布局 同作业指导书 copy即可-->
				<table class="tablelist" id="other_file_list2">
				</table>
				<hr class="hr_dashed_grey mt20" />
				<h5 class="sub_2_title_wrap mt10 mb20">图片文件<span class="mini_span">请选择5M以下.jpg、.gif、.png文件</span>
				 <span class="f_r"><img src="/newresources/images/tasks/original.png"><button class="original" onClick="taskImgView(1)">原图预览</button></span></h5>
				<ul class="ul_upload_img_wrap clearfix" id="image_file_list">
					
				</ul>
				<hr class="hr_dashed_grey mt20" />
				<h5 class="sub_2_title_wrap mt10 mb20">其他文件<span class="mini_span">请选择5M以下.doc/.docx;.ppt/.pptx/.pps;.xls/.xlsx;.pdf;.txt文件</span>
				 <div class="f_r_oprate_btn_wrap" id="other_button_show">
				
				 </div>
				
				</h5>
				<!-- 列表布局 同作业指导书 copy即可-->
				<table class="tablelist" id="other_file_list">
				</table>
				<hr class="hr_dashed_grey mt20" />
				<h5 class="sub_2_title_wrap mt10">视频文件<span class="mini_span">请选择50M以下.avi /.mp4/ .flv /.3gp/ .mkv /.mpeg文件</span>
				<button class="f_r_botton" onClick="taskVideoView(3,0)">视频播放</button>
				</h5>
				<ul class="ul_upload_img_wrap clearfix" id="view_file_list">
				   
				</ul>
			</div>
		</div>
		<!-- <div class="tabcon" style="display:none;">
			<h4 class="sub_title_wrap mb20">作业指导
			<span class="mini_span">请选择5M以下.doc/.docx;.ppt/.pptx/.pps;.xls/.xlsx;.pdf;.txt文件</span>
				<div class="f_r_oprate_btn_wrap" id="job_instruction_wrap">
					
				</div>
			</h4>
			 <table id="operation_file_list" class="tablelist"></table>
		</div> -->
		<div class="tabcon" style="display:none;">
			<h4 class="sub_title_wrap mb20">定额工时</h4>
			<table class="tablelist" id="processTable">
				<tr id="Processlistup">
					<th width="200px;">序号</th>
				
					<th width="auto">工序</th>
					<th width="200px">工时(秒)</th>
					
				</tr>
				
			</table>
		</div>
		<div class="tabcon" style="display:block;">
			<h4 class="sub_title_wrap mb20">材料标准用量</h4>
			<table class="tablelist" id="bomTable">
				<tr id="Bomlistup">
					<th width="150px;">序号</th>
					
					<th width="auto">名称</th>
					<th width="150px">单件用量</th>
					<th width="150px">单位</th>
					<th width="150px">总量</th>
				</tr>
				
			</table>
		</div>	
	</div>
	<!--工艺要求相关结束-->
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
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/jquery.browser.js"></script> -->
<!--[if lt IE 9]>
<script type="text/javascript" src="/newresources/js/html5shiv.js"></script>
<script type="text/javascript" src="/newresources/js/excanvas.js"></script>
<![endif]-->
<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>
<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/taskInfo.js"></script>
<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/taskInfo_head.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.scrollTo.js"></script>
<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/taskStaticBar.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.nicescroll.js"></script>
<!--可输入下拉框相关-->
<script src="/newresources/jquery.ui/js/jquery-ui.min.js"></script>
<script src="/newresources/jquery.ui/js/jquery.combobox.js"></script>

<script type="text/javascript">
	$(function(){
		loadCommonPage();
		$(".midd_wrap").css({minHeight:$(window).height()-200});
	
		window.onresize=function(){
			$(".midd_wrap").css({minHeight:$(window).height()-200});
			
		};
		//调用可输入下拉框
		$( "#task_unit" ).combobox();
		$( "#qc_type" ).combobox();
	
	   	
	});
	//加载公用部分界面，如同步，底部，左侧菜单等
	function loadCommonPage(){
		$("#top").load(getwebroot()+"platform/top.html",function(responseTxt,statusTxt,xhr){
		    if(statusTxt=="success"){		    	
				$("#mainNav").children().eq(0).addClass("curr");
				$("#company").parent().css("display","none");			
	      }
		  });
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	}
</script>
</body>
</html>
