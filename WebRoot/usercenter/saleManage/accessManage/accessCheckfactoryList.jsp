<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>线下验厂</title>
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
		<p class="sale_right_title"><span>线下验厂</span></p>
		<div class="ml10 mr10 mt10">
			<div id="checkFactory" class="accessApplyInfo">
				<ul class="tab">
						<li class="curr" onClick="currtab('#checkFactory','0')">验厂通知<span class="split">|</span></li>
						<li onClick="currtab('#checkFactory','1')">验厂报告</li>
					</ul>
				<div class="check_factory_inform tabcon mt10" style="display:block;">
					<!-- <p class="t_algin_r mt10 mb10">共<span id="total_num"></span>条记录</p> -->
					<table id="checkfactoryInform_table" class="sale_tablelist">
						<!-- <tr>
							<th width="150px">时间</th>
							<th width="auto">客户名称</th>
							<th width="200px">验厂</th>
						</tr>
						<tr>
							<td><span class="greycolor ml10">2016-6-27 13:55:24</span></td>
							<td class="center"><a class="a_link_name">浙江泰普森休闲用品有限公司</a></td>
							<td>
								<a class="blue mr10">验厂通知.doc</a>
								<button class="blue_button">确认</button>
							</td>
						</tr>
						<tr>
							<td><span class="greycolor ml10">2016-6-27 13:55:24</span></td>
							<td class="center"><a class="a_link_name">浙江泰普森休闲用品有限公司</a></td>
							<td>
								<a class="blue mr10">验厂报告.doc</a>
								<span><span class="redcolor b">5</span>分</span>
							</td>
						</tr> -->
					</table>
					<div id="pagination" class="quotes clearfix"></div>
				</div>
				<div class="check_factory_report tabcon mt10">
					<!-- <p class="t_algin_r mt10 mb10">共<span id="total_num1"></span>条记录</p> -->
					<table id="checkfactoryReport_table" class="sale_tablelist">
						<!-- <tr>
							<th width="150px">时间</th>
							<th width="auto">客户名称</th>
							<th width="200px">验厂</th>
						</tr>
						<tr>
							<td><span class="greycolor ml10">2016-6-27 13:55:24</span></td>
							<td class="center"><a class="a_link_name">浙江泰普森休闲用品有限公司</a></td>
							<td>
								<a class="blue mr10">验厂通知.doc</a>
								<button class="blue_button">确认</button>
							</td>
						</tr>
						<tr>
							<td><span class="greycolor ml10">2016-6-27 13:55:24</span></td>
							<td class="center"><a class="a_link_name">浙江泰普森休闲用品有限公司</a></td>
							<td>
								<a class="blue mr10">验厂报告.doc</a>
								<span><span class="redcolor b">5</span>分</span>
							</td>
						</tr> -->
					</table>
					<div id="pagination1" class="quotes clearfix"></div>
				</div>
			</div>
		</div>
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
<script type="text/javascript" src="/usercenter/saleManage/accessManage/js/accessCheckfactoryList.js"></script>
</body>
</html>