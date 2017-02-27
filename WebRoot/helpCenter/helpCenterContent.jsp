<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<link href="/newresources/css/helpCenter.css" rel="stylesheet" type="text/css" />
		<link href="/vip/resources/css/vipHelpCenter.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
	</head>
	<body class="bg_grey">
		<div id="top"></div>
		<!--中间-->
		<div class="midd_wrap clearfix" >
			<div class="midd_left_wrap" style="width:180px;"></div>
			<div class="middle_right_wrap bg_white ml10 f_l pb80" style="width:834px;">
				<div class="clearfix" style="width:814px;padding:0px 10px;">
					<div class="title_border_bottom f_l"></div>
					<div class="title_middle f_l">
						<div id="web_title" class="title_middle_top"></div>
						<div id="create_dt" class="title_middle_bottom"><!-- 2016-09-23<span class="ml10">08:51:36</span> --></div>
					</div>
					<div class="title_border_bottom f_l"></div>
				</div>
				<div id="content"></div>
				<!-- <div class="explain"><span style="margin-left:26px;display:inline-block;width:718px;">注册会员企业信息需通过平台认证审核，才可使用平台功能。（需完整填写真实准确的企业资料，工作人员会在</span>两个工作日内完成审核并反馈结果）</div>
				<div class="steps">
					<div class="step">第一步   注册会员登录，进入【账号管理】-【注册信息】,点击入驻认证</div>
					<div class="picFrame"><img src="/newresources/images/helpCenter/cetification/certification1.png"></div>
					<div class="step">第二步  按要求填写并提交</div>
					<div class="picFrame"><img src="/newresources/images/helpCenter/cetification/certification2.png"></div>
					<div class="step">第三步  提交后重新进入【入驻认证】页面可查看审核进度</div>
					<div class="picFrame"><img src="/newresources/images/helpCenter/cetification/certification3.png"></div>
					<div class="step">第四步  如审核通过，可直接维护【企业信息】</div>
					<div class="picFrame"><img src="/newresources/images/helpCenter/cetification/certification4.png"></div>
				</div> -->
			</div>
		</div>
		<div id="bottom"></div>
		<%@ include file="/newresources/js/base.jsp" %>
<!-- 		<script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="/newresources/js/base.js"></script>
		<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
		<script type="text/javascript" src="/helpCenter/js/helpCenterContent.js"></script>
	</body>
</html>
