<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>交易信息--交易资料</title>
<link rel="stylesheet" type="text/css" href="/newresources/css/page.css" />
<link href="/vip/resources/css/vippage.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="/newresources/css/trade.css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<script type="text/javascript" src="/usercenter/tradeManage/js/tradeInfo.js"></script>
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
</head>

<body class="bg_grey">
<div id="top"></div>
<!--中间-->
<div class="midd_wrap clearfix">
	<div class="midd_left_wrap" style="width:180px;">
	</div>
	<div class="midd_right_wrap" style="width:834px">
		<div class="account_right_title">
			<span  class="f_l ml10"><span id="companyNameInHead">...</span><span id="isCheck" class="span_rz ml10" style="width:60px;">实名入驻</span></span>
		</div>
		<div class="account_right_inner_wrap">
			<h4>交易信息</h4>
			<div class="sub_title_wrap">
				<img src="/newresources/images/page/tt.png" /><span>银行信息</span><img src="/newresources/images/page/tt.png" />
				<button class="bluecolor f_r mt8 bg_white" onclick="addBankAccount()">新增</button>
			</div>
			<div class="ml10 mr10">
				<table id="bankTable" class="trade_tablelist">
					<tr>
						<th width="auto">开户行</th>
						<th width="200px">开户账号</th>
						<th width="100">账户状态</th>
						<th width="100px"></th>
						<th width="160px">操作</th>
					</tr>
				</table>
			</div>
			
			<div class="sub_title_wrap">
				<img src="/newresources/images/page/tt.png" /><span>发票信息</span><img src="/newresources/images/page/tt.png" />
				<button class="bluecolor f_r mt8 bg_white" onclick="addInvoiceTitle()">新增</button>
			</div>
			<div class="ml10 mr10">
				<table id="invoiceTable" class="trade_tablelist">
					<tr>
						<th width="auto">发票抬头</th>
						<th width="100">发票状态</th>
						<th width="100px"></th>
						<th width="160px">操作</th>
						
					</tr>
				</table>
			</div>
		</div>
		 <!-- <div align="right"><input type="button" value="保存" onclick="saveBankAndInvoice()"/></div> -->
	</div>
</div>
<!--底端-->
<div id="bottom"></div>
</body>
</html>
