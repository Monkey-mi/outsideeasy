<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>客户库</title>
<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/sale.css" rel="stylesheet" type="text/css" />
<link href="/vip/resources/css/vipsale.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
</head>
<body class="bg_grey">
<div id="top"></div>
<!--中间-->
<div class="midd_wrap clearfix">
	<div class="midd_left_wrap" style="width:180px;">
	</div>
	<div class="midd_right_wrap" style="width:834px">
		<p class="sale_right_title"><span>客户库</span> <button class="blueButton f_r mt10" onclick="addCustomer()">新增客户</button> </p>
		<div class="ml10 mr10 mt10">
			<!-- <p class="t_algin_r mt10 mb10">共<span id="total_num"></span>条记录</p> -->
			<table id="customer_table" class="sale_tablelist">
				<!-- <tr>
					<th width="auto">客户名称</th>
					<th width="auto">准入信息</th>
				</tr>
				<tr>
					<td class="center"><a class="a_link_name">浙江泰普森休闲用品有限公司</a></td>
					<td class="center">
						<img class="ml30" src="/newresources/images/sale/s1.png"><a class="blue ml10" href="javascript:void(0)" onClick="queryInfo()" >准入资料</a>
						<img class="ml30" src="/newresources/images/sale/s2.png"><a class="blue ml10" href="javascript:void(0)" onClick="checkMaterial()">物料验证</a>
						<img class="ml30" src="/newresources/images/sale/s3.png"><a class="blue ml10" href="javascript:void(0)" onClick="checkFactory()">验厂报告</a>
						<span class="ml10">评分 <span class="redcolor b">8</span>分</span>
					</td>
				</tr>
					<tr>
					<td class="center"><a class="a_link_name">浙江泰普森休闲用品有限公司</a></td>
					<td class="center">
						<img class="ml30" src="/newresources/images/sale/s1.png"><a class="blue ml10" href="javascript:void(0)" onClick="queryInfo()">准入资料</a>
						<img class="ml30" src="/newresources/images/sale/s2.png"><a class="blue ml10" href="javascript:void(0)" onClick="checkMaterial()">物料验证</a>
						<img class="ml30" src="/newresources/images/sale/s3.png"><a class="blue ml10" href="javascript:void(0)" onClick="checkFactory()">验厂报告</a>
						<span class="ml10">评分 <span class="redcolor b">8</span>分</span>
					</td>
				</tr>
				<tr>
					<td class="center"><a class="a_link_name">浙江泰普森休闲用品有限公司</a></td>
					<td class="center">
						<img class="ml30" src="/newresources/images/sale/s1.png"><a class="blue ml10" href="javascript:void(0)" onClick="queryInfo()">准入资料</a>
						<img class="ml30" src="/newresources/images/sale/s2.png"><a class="blue ml10" href="javascript:void(0)" onClick="checkMaterial()">物料验证</a>
						<img class="ml30" src="/newresources/images/sale/s3.png"><a class="blue  ml10" href="javascript:void(0)" onClick="checkFactory()">验厂报告</a>
						<span class="ml10">评分 <span class="redcolor b">8</span>分</span>
					</td>
				</tr>
				<tr>
					<td class="center"><a class="a_link_name">浙江泰普森休闲用品有限公司</a></td>
					<td class="center">
						<img class="ml30" src="/newresources/images/sale/s1.png"><a class="blue ml10" href="javascript:void(0)" onClick="queryInfo()">准入资料</a>
						<img class="ml30" src="/newresources/images/sale/s2.png"><a class="blue ml10" href="javascript:void(0)" onClick="checkMaterial()">物料验证</a>
						<img class="ml30" src="/newresources/images/sale/s3.png"><a class="blue ml10" href="javascript:void(0)" onClick="checkFactory()">验厂报告</a>
						<span class="ml10">评分 <span class="redcolor b">8</span>分</span>
					</td>
				</tr>
					<tr>
					<td class="center"><a class="a_link_name">浙江泰普森休闲用品有限公司</a></td>
					<td class="center">
						<img class="ml30" src="/newresources/images/sale/s1.png"><a class="blue ml10" href="javascript:void(0)" onClick="queryInfo()">准入资料</a>
						<img class="ml30" src="/newresources/images/sale/s2.png"><a class="blue ml10" href="javascript:void(0)" onClick="checkMaterial()">物料验证</a> 
						<img class="ml30" src="/newresources/images/sale/s3.png"><a class="blue ml10" href="javascript:void(0)" onClick="checkFactory()">验厂报告</a>
						<span class="ml10">评分 <span class="redcolor b">8</span>分</span>
					</td>
				</tr>
					<tr>
					<td class="center"><a class="a_link_name">浙江泰普森休闲用品有限公司</a></td>
					<td class="center">
						<img class="ml30" src="/newresources/images/sale/s1.png"><a class="blue ml10" href="javascript:void(0)" onClick="queryInfo()">准入资料</a>
						<img class="ml30" src="/newresources/images/sale/s2.png"><a class="blue ml10" href="javascript:void(0)" onClick="checkMaterial()">物料验证</a>
						<img class="ml30" src="/newresources/images/sale/s3.png"><a class="blue ml10" href="javascript:void(0)" onClick="checkFactory()">验厂报告</a>
						<span class="ml10">评分 <span class="redcolor b">8</span>分</span>
					</td> -->
			</table>
			<div id="pagination" class="quotes clearfix"></div>
		</div>
	</div>
</div>
<div class="mask" id="pop_mask"></div>
<!--新增客户-->
<div id="addCustomer_wrap" class="pop_layer_wrap">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		新增客户
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('addCustomer_wrap')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap clearfix">
		<div class="h30 mt10">
		<span class="addCustomer_tip">请输入您要添加的企业名称，多个用";"或"；"隔开</span>
	
		</div>
		<div class="mb10">
			<input id="companyName" name="companyName" value="" type="radio" checked="checked"/>企业名称
		</div>
		<span>已输入<span  id="number" class="redcolor">0</span>个</span>
		<textarea  id="addCustomer_content" class="addCustomer_content"	onKeyUp="countName()" readOnly="readOnly" ></textarea>
		<button class="mt10 mb10 yellow_button f_r" onclick="applyJoinSupplier()">申请加入供应商</button>
	</div>
</div>
<!--物料验证-->   
<div id="checkMaterial_wrap" class="pop_layer_wrap">
	<div class="b ml10" style="height:30px; line-height:30px;">
		物料验证
		<a class="close_btn" style="color:#b3b3b3" href="javascript:void(0)" onClick="pop_div_close('checkMaterial_wrap')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap ">
		<div class="h30 mt10">
		<input id="start_time" class="Wdate" placeholder="起始日期" onclick='WdatePicker({readOnly:true})'>-<input id="end_time" class="Wdate" onclick='WdatePicker({readOnly:true})' placeholder="结束日期">
		<button class="customer_blue_button" id="searchMaterialBtn">搜索</button>
		</div>
		<div class="tableScroll">
		<table id="materialCheck_table" class="sale_tablelist">
			<!-- <tr>
				<th width="auto">日期</th>
				<th width="auto">报告</th>
			</tr>
			<tr>
				<td class="center">2016-06-16 15:13:16</td>
				<td class="center"><span class="redcolor">5</span>分<a class="blue ml10">物料验证.doc</a></td>
			</tr>
			<tr>
				<td class="center">2016-06-16 15:13:16</td>
				<td class="center"><span class="redcolor">5</span>分<a class="blue ml10">物料验证.doc</a></td>
			</tr>
				<tr>
				<td class="center">2016-06-16 15:13:16</td>
				<td class="center"><span class="redcolor">5</span>分<a class="blue ml10">物料验证.doc</a></td>
			</tr>
				<tr>
				<td class="center">2016-06-16 15:13:16</td>
				<td class="center"><span class="redcolor">5</span>分<a class="blue ml10">物料验证.doc</a></td>
			</tr>
			
				<tr>
				<td class="center">2016-06-16 15:13:16</td>
				<td class="center"><span class="redcolor">5</span>分<a class="blue ml10">物料验证.doc</a></td>
				</tr> -->
		</table>
		</div>
	</div>
</div>
<!--验厂报告-->
<div id="checkFactory_wrap" class="pop_layer_wrap">
	<div class="b ml10" style="height:30px; line-height:30px;">
		验厂报告
		<a class="close_btn" style="color:#b3b3b3" href="javascript:void(0)" onClick="pop_div_close('checkFactory_wrap')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap ">
		<div class="h30 mt10">
		<input id="start_time1" class="Wdate" placeholder="起始日期" onclick='WdatePicker({readOnly:true})'>-<input id="end_time1" class="Wdate" onclick='WdatePicker({readOnly:true})' placeholder="结束日期">
		<button id="searchFactoryBtn" class="customer_blue_button">搜索</button>
		</div>
		<div class="tableScroll">
		<table id="checkFactory_table" class="sale_tablelist">
			<!-- <tr>
				<th width="auto">日期</th>
				<th width="auto">报告</th>
			</tr>
			<tr>
				<td class="center">2016-06-16 15:13:16</td>
				<td class="center"><span class="redcolor">5</span>分<a class="blue ml10">验厂报告.doc</a></td>
			</tr>
			<tr>
				<td class="center">2016-06-16 15:13:16</td>
				<td class="center"><span class="redcolor">5</span>分<a class="blue ml10">验厂报告.doc</a></td>
			</tr>
				<tr>
				<td class="center">2016-06-16 15:13:16</td>
				<td class="center"><span class="redcolor">5</span>分<a class="blue ml10">验厂报告.doc</a></td>
			</tr>
				<tr>
				<td class="center">2016-06-16 15:13:16</td>
				<td class="center"><span class="redcolor">5</span>分<a class="blue ml10">验厂报告.doc</a></td>
			</tr>
			
				<tr>
				<td class="center">2016-06-16 15:13:16</td>
				<td class="center"><span class="redcolor">5</span>分<a class="blue ml10">验厂报告.doc</a></td>
				</tr> -->
		</table>
	</div>
</div>
</div>
<!--准入申请-->
<div id="access_wrap" class="pop_layer_wrap">
	<div class="title_wrap" style="height:30px; line-height:30px;">
	新增客户
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('access_wrap')" title="关闭窗口">X</a>
	</div>
	<div id="go_access" class="pop_content_wrap clearfix">
	</div>
</div>
<!--底端-->
<div id="bottom"></div>
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.nicescroll.js"></script>
<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="/usercenter/saleManage/accessManage/js/customerfilesList.js"></script>
</body>
</html>