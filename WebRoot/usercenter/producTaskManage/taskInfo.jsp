<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>生产任务单详情</title>
<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/task.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" />
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<%@ include file="/newresources/js/base.jsp" %>
<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="/usercenter/producTaskManage/js/taskInfo.js"></script>
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/taskStaticBar.js"></script>
<!--[if lt IE 9]>
<script type="text/javascript" src="/newresources/js/html5shiv.js"></script>
<script type="text/javascript" src="/newresources/js/excanvas.js"></script>
<![endif]-->
<script type="text/javascript">
	$(function(){
		loadCommonPage();
		$(".midd_wrap").css({minHeight:$(window).height()-200});
	
		window.onresize=function(){
			$(".midd_wrap").css({minHeight:$(window).height()-200});
			
		};
	});
	//加载公用部分界面，如同步，底部，左侧菜单等
	function loadCommonPage(){
		var isVip=getCookie("isVip");
		if(isVip=="true"){
			$("#top").load(getwebroot()+"vip/platform/vipTop.html",function(responseTxt,statusTxt,xhr){
			    if(statusTxt=="success")
				{
					$("#mainNav").children().eq(0).addClass("curr");
				    $("#company").parent().css("display","none");
				}
			  });
			$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		}else{
			$("#top").load(getwebroot()+"platform/top.html",function(responseTxt,statusTxt,xhr){
			    if(statusTxt=="success")
			      $("#mainNav").children().eq(1).addClass("curr");
			      $("#company").parent().css("display","none");
			  });
			$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		}
	}
</script>
</head>

<body class="bg_grey">
<div id="top"></div>
<!--中间-->
<div class="midd_wrap p10 pb30 bg_white">
	<div class="breadcrumb_wrap">
		当前位置：<a href="/supplierForPlateForm/registerInfo.htm">企业中心</a><span  class="p5">&gt;</span>
		<a href="/saleCenterCtrl/saleCenter.htm">销售</a><span  class="p5">&gt;</span>
		<a href="javascript:void(0)" onclick="go_tasklist()">生产任务单列表</a> <span class="p5">&gt;</span>
		<!-- <span id="taskname_head"></span> --><span class="greycolor">生产任务单详情</span></div>
	<hr class="hr_dashed_grey" />
	<!--生产任务单状态进度条-->
	<div id="producTaskStaticBar"></div>
	<div class="task_nav_wrap mt20">
		<span class="l_wrap">生产任务单</span><span  class="p5">&gt;</span><span id="serialno_head"></span>
		<ul class="r_wrap">
			<li><a href="javascript:void(0)" class="curr">任务单详情</a></li>
			<li><a href="javascript:void(0)" onclick="go_logistics()">来料信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_productionInfo()">生产信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_deliveredInfo()">送货信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_qualityControl()">质检信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_connection()">交流合作</a></li>
		</ul>
	</div>
	<div class="task_mainInfo_wrap clearfix">
		<!--任务单状态-->
		<div class="task_static_operate_wrap">
			<div class="task_static_bg">
				<p id="show_state" class="title_16s">&nbsp;</p>			
				<div class="task_operate_wrap mt10 mb10" id="connectionHeads">
					<ul id="taskHeadButton">						
					</ul>
				</div>			     
			</div>
			<div class="task_baseinfo_wrap clearfix">
				<div class="line_wrap"><span class="left">派单日期</span><span id="show_send_time">未指定</span></div>
				<div class="line_wrap"><span class="left">接受日期</span><span id="show_receive_time">未指定</span></div>
				<div class="line_wrap">
					<span class="left">计划工期</span>
					<label id="show_plan_start">未指定</label>
					 <span class="f_l ml8 mr8">至</span> <label id="show_plan_complete">未指定</label>
				</div>
				<div class="line_wrap">
					<span class="left">派单单位</span>
					<label id="show_send_company_name">&nbsp;</label>
				</div>
			    <div class="line_wrap">
			    	<span class="left">任务单说明</span>
			    	<label id="task_remark"></label>
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
				<div class="horizontal_bar_wrap">
					<div class="horizontal_bar_inner">
						<div class="horizontal_bar_normal">
							<div class="horizontal_bar"></div>
							<div class="horizontal_bar_on">
								<a href="javascript:void(0)" ></a>
							</div>
						</div>
						<div id="horizontal_bar_red" class="horizontal_bar_red">
							<a href="javascript:void(0)" ></a>
						</div>					
					</div>
					 <div id="imageshow" style="position:relative;">				   
				     </div>	
				</div>
				<span class="dt_start_wrap">未指定</span>
				<span class="dt_end_wrap">未指定</span>
			</div>
		</div>
	</div>
	<!--产品图片块-->
	<div class="task_show_img_title">
		<span id="show_product_name">&nbsp;</span>
		<span class="ml80 color777">任务数量&nbsp;</span><label id="total_qty">1000</label>
	</div>
	<div class="task_show_img_block_wrap clearfix">
		<div class="l_wrap">
			<div class="task_main_img_wrap" id="pro_prcmain_img">
				<a><img src="/newresources/images/other/pic-big.png" /></a>
			</div>
		</div>
		<div class="spec-scroll"> 
		  	<a class="prev">&lt;</a> <a class="next">&gt;</a>
			<div class="items">
				<ul id="pro_product_ul_file">					         		
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
<!-- 			<li onClick="tabs('#comment',2)">作业指导</li>
 -->			<li onClick="tabs('#comment',2)" >定额工时</li>
			<li class="curr" onClick="tabs('#comment',3)">材料标准用量</li>
		</ul>
		<div class="tabcon" style="display:none;">
			<h4 class="sub_title_wrap mb20">质检标准</h4>
			<table class="tablelist" id="pro_QcFileList_show">
				<tr>
					<td width="200px;">文件名文件名</td>
					<td width="200px;" class="color777">2016-03-30 16:55</td>
					<td width="500px;" style="text-align:left;">说明说明说明说明说明说明说明说明说</td>
					<td align="right"><img src="/newresources/images/other/down.png" /></td>
				</tr>
			</table>
		</div>
		<div class="tabcon" style="display:none;">
			<h4 class="sub_title_wrap mb20">工艺文件</h4>
			<div style="padding-left:20px;padding-right:20px;">
				<h5 class="sub_2_title_wrap mb20">作业指导</h5>
				<div class="clearfix" style="max-height:270px;">
					<div  class=" fileTableWrap">
						<table class="tablelist" id="pro_operation_file_list">
							<tr>
								<td width="200px;">文件名文件名</td>
								<td width="200px;" class="color777">2016-03-30 16:55</td>
								<td width="500px;" style="text-align:left;">说明说明说明说明说明说明说明说明说</td>
								<td align="right"><img src="/newresources/images/other/down.png" /></td>
							</tr>
						</table>
					</div>
						<div class="f_r"><a class="lookMore hide" onclick="showScroll(this)">查看更多</a></div>
				</div>
				<hr class="hr_dashed_grey mt20" />
				<h5 class="sub_2_title_wrap mt10 mb20">裁剪产品样板图、排版图<span class="mini_span"></span>
				</h5>
				<table class="tablelist" id="pro_other_file_list1">							
				</table>
				<hr class="hr_dashed_grey mt20" />
				<h5 class="sub_2_title_wrap mt10 mb20">丝印、绣花定位图<span class="mini_span"></span>
				 </h5>
				<table class="tablelist" id="pro_other_file_list2">							
				</table>
				<hr class="hr_dashed_grey mt20" />
				<h5 class="sub_2_title_wrap mt10 mb20">图片文件
				<!-- 	<button class="f_r_botton" onClick="taskImgView(1)">原图预览</button> -->
					<span class="f_r"><img src="/newresources/images/tasks/original.png"><button class="original" onClick="taskImgView(1)">原图预览</button></span></h5>
					
				</h5>
				<ul class="ul_upload_img_wrap clearfix" id="pro_image_file_list">
					
					<li>
						<div class="image_block_pic">
							<img src="/newresources/images/other/pic-small.png" />
							
						</div>
						<div class="display_div clearfix">
							<span class="half_span">图片名称</span>
							<span class="half_span color777 fs10">2016-03-30 16:39 20</span>
							<span class="l_span">图片描述图片描述图片描述</span>
						</div>
					</li>
				</ul>
				<hr class="hr_dashed_grey mt20" />
				<h5 class="sub_2_title_wrap mt10 mb20">其他文件
					
				</h5>
				<table class="tablelist " id="pro_other_file_list">							
				</table>
				<hr class="hr_dashed_grey mt20" />
				<h5 class="sub_2_title_wrap mt10">视频文件
				<button class="f_r_botton" onClick="taskVideoView(3,0)">视频播放</button>
				</h5>
				<ul class="ul_upload_img_wrap clearfix" id="pro_view_file_list">
					
					<li>
						<div class="image_block_pic">
							<a class="video_a"></a>
							<img src="/newresources/images/other/pic-small.png" />
							
						</div>
						<div class="display_div clearfix">
							<span class="half_span">视频名称视频名称视频名称</span>
							<span class="half_span color777 fs10">2016-03-30 16:39 20</span>
							<span class="l_span">视频描述视频描述视频描述视频描述视频描述视频描述视频描述视频描述视频描述</span>
						</div>
					</li>
					
				</ul>
			</div>
		</div>
		<!-- <div class="tabcon" style="display:none;">
			<h4 class="sub_title_wrap mb20">作业指导</h4>
			<table id="pro_operation_file_list" class="tablelist"></table>
		</div> -->
		<div class="tabcon" style="display:none;">
			<h4 class="sub_title_wrap mb20">定额工时</h4>
			<table class="tablelist" id="pro_processTable">
				<tr id="pro_Processlistup">
					<th width="200px;">序号</th>
					<th width="auto">工序</th>
					<th width="200px">工时(秒)</th>
					
				</tr>
				
			</table>
		</div>
		<div class="tabcon" style="display:block;">
			<h4 class="sub_title_wrap mb20">材料标准用量</h4>
			<table class="tablelist" id="pro_bomTable">
				<tr id="pro_Bomlistup">
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
<div class="mask" id="pop_mask"></div>
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
</body>
</html>
