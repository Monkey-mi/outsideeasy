<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>采购质检反馈</title>
		<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/purchase.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
		<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="bg_grey">
		<div id="top"></div>
		<!--中间-->
		<div class="midd_wrap clearfix" >
			<div class="midd_left_wrap" style="width:180px;">
			</div>
			<div class="midd_right_wrap" style="width:834px">
				<p class="purchase_right_title"><span>质检反馈</span></p>
				<div class="mt20 ml10 feedbackList clearfix">
					<div class="searchCriteria">
						<div class="greycolor clearfix ">
							<div class="posR f_l">
								<div id="date" class="date" onclick="showSelect()">选择日期</div>
								<select id="dateSelect" class="dateSelect posA" onchange="chooseDate()">
									<option>到货日期</option>
									<option>质检日期</option>
								</select>
							</div>
							<div class="f_l ml4">
								<input id="start_time" class="Wdate" placeholder="起始日期" onclick='WdatePicker({readOnly:true})'>-<input id="end_time" class="Wdate" onclick='WdatePicker({readOnly:true})' placeholder="结束日期">
								<input id="search_text" class="keywords " placeholder="请输入到货编号或者供应商名称进行搜索">
								<button class="order_blue_button " onclick = "getQualityFeedbackList()">搜索</button>
								<div class="more_down f_r">更多</div><div class="more_up f_r hide">收起</div>
							</div>
							</div>
						</div>
						<div class="mt10 criterias hide">
							<div>
								<span class="item">产品名称：</span><input placeholder="请输入产品名称" id="search_product_name"  class="number_input ml10"/>
								<span class="ml10 item">产品货号:</span><input placeholder="请输入产品货号" id="search_product_artno" class="number_input ml10"/>
							</div>
							<div class="mt10"> 
								<span class="item">订单编号：</span><input placeholder="请输入订单编号" id="search_order_bh"  class="number_input ml10"/>
								<span class="ml10 item">合同编号:</span><input placeholder="请输入合同编号" id="search_agreement_bh" class="number_input ml10"/>
							</div>
						</div>
					</div>
					<!-- <div class="t_algin_r mt10 mr10">共&nbsp;<span id="total_count" class="redcolor">5</span>&nbsp;条记录</div> -->
					<div id="allQualityFeedbacks" class="feedbackListCon mt10">
					</div>
					<div id="paginationcom" class="quotes clearfix"></div>
				</div>
			</div>
		</div>
		<!--底端-->
		<div id="bottom"></div>
		<%@ include file="/newresources/js/base.jsp" %>
<!-- 		<script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
		<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.nicescroll.js"></script>
		<script type="text/javascript" src="/usercenter/purchaseManage/deliveryManage/js/qualityTestFeedback.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.browser.js"></script>
		<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="/newresources/js/json2.js"></script>
		<script id="allQualityFeedbackStmpl" type="text/x-dot-template">
<div class="feedback_list_head ml10">
							<div class="con1 f_l">产品信息</div>
							<div class="con4 f_l">合同编号</div>
							<div class="con2 f_l">数量</div>
							<div class="con2 f_l">单位</div>
							<div class="con2 f_l">质检结论</div>
							<div class="con3 f_l">质检判定</div>
			</div>
         {{for(var prop in it){}}
         		<div class="feedback_list_body mt10 ml10" >
							<div class="listTip">
								<div class="item1 f_l">送货单号：<span>{{= replaceNullAsStr(it[prop].delivery_number)}}</span></div>
								<div class="item2 f_l">到货日期：<span>{{= replaceNullAsStr(it[prop].delivery_dt)}}</span></div>
								{{if(it[prop].sup_cpyname_cn.length>=15){
										var i=it[prop].sup_cpyname_cn.substr(0,15);
										var t=i+"...";
									}}
								<div class="posR" style="margin-left:422px;">
									<div class="item3 f_l">	
										<div  onmouseover="showAllName(this)" onmouseout ="hideAllName(this)">供应商：<span>{{= t}}</span></div>
									</div>
									<div class="hide posA totalName">{{=  replaceNullAsStr(it[prop].sup_cpyname_cn)}}</div>
								</div>
								{{}}}						
								{{if(it[prop].sup_cpyname_cn.length<15){}}
								<div class="item3 f_l"><div>供应商：<span>{{= replaceNullAsStr(it[prop].sup_cpyname_cn)}}</span></div></div>
								{{}}}
								<div class="item2 f_l">质检日期：<span>{{= replaceNullAsStr(it[prop].check_dt)}}</span></div>
							</div>
							<table class="feedbacks">
								{{for(var pro in it[prop].list){}}
								{{? pro%2 ==0}}
								<tr class="feedback">
								{{??}}
								<tr class="feedback background_grey">
								{{?}}
									<td class="left" valign="top">
										<div class="con1">{{= replaceNullAsStr(it[prop].list[pro].product_name)}}({{= replaceNullAsStr(it[prop].list[pro].product_artno)}})</div>
										<div class="greyColor" >规格尺寸：{{= replaceNullAsStr(it[prop].list[pro].product_size)}}&nbsp;{{= replaceNullAsStr(it[prop].list[pro].remark)}}</div>
										<div class="greyColor" >订单编号：{{= replaceNullAsStr(it[prop].list[pro].order_bh)}}</div>
									</td>
									<td class="con4" valign="top">{{= replaceNullAsStr(it[prop].list[pro].agreement_bh)}}</td>
									<td class="con5" valign="top">{{= replaceNullAsStr(it[prop].list[pro].check_number)}}</td>
									<td class="con2" valign="top">{{= replaceNullAsStr(it[prop].list[pro].unit)}}</td>
									<td class="con2 orangeColor" valign="top">{{= replaceNullAsStr(it[prop].list[pro].check_result)}}</td>
									<td class="con3" valign="top">{{= replaceNullAsStr(it[prop].list[pro].check_vote)}}</td>
								</tr>
								{{}}}
							</table>
					</div>
              {{}}}
		</script>
	</body>
</html>
