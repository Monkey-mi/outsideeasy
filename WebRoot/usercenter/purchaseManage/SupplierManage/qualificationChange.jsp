<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>历史资质变更记录</title>
<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/purchase.css" rel="stylesheet" type="text/css" />
</head>
<body class="bg_grey">
<div id="top"></div>
<!--中间-->
<div class="midd_wrap bg_white clearfix posR">
	<div class="b tableName">历史资质变更记录</div>
	<div class="goBackDiv"><!-- <button class="goBackBtn" onclick="goBackSupplierList()">返回</button> --> </div>
	<!-- <div class="recordsCount mb10">共&nbsp;<span id="total_num" class="redcolor">5</span>&nbsp;条记录</div> -->
	<div id="qualificationChange" class="qualificationRecord clearfix mb10 ">
		<!--表头开始  -->
		<ul class="formHead f_l">
			<li class="diagonal posR">
				<span>类目</span>
				<span class="posA changedTime">变更时间</span>
			</li>
			<li>企业名称</li>
			<li>法人代表</li>
			<li>成立日期</li>
			<li>注册资本</li>
			<!-- <li>注册地址</li> -->
			<li>主营业务</li>
			<li>企业类型</li>
			<li>经营模式</li>
			<li>所属行业</li>
			<li class="companyPic">公司证照</li>
		</ul>
		<!--表头结束  -->
		<div class="formRight f_l">
		<div id="formSlide" class="formSlide clearfix">
		<!--表格内容开始-->
		<!-- <ul class="formContent f_l">
			<li class="time">2016-05-16 当前</li>
			<li>湖州宏升箱包有限公司</li>
			<li>Mr Yang</li>
			<li>2010-05-12</li>
			<li>1000万人民币【RMB】</li>
			<li>塑胶包装/熟料</li>
			<li>个体经营</li>
			<li>贸易型</li>
			<li>汽摩及配件</li>
			<li class="companyPic">
				<div  class="picFrame">
					<img src="/newresources/images/baseLisence.png">
					<div>营业执照</div>
				</div>
				<div  class="picFrame">
					<img src="/newresources/images/baseLisence.png">
					<div>营业执照</div>
				</div>
				<div  class="picFrame">
					<img src="/newresources/images/baseLisence.png">
					<div>营业执照</div>
				</div>
				<div  class="picFrame">
					<img src="/newresources/images/baseLisence.png">
					<div>营业执照</div>
				</div>
			</li>
		</ul>
		<ul class="formContent f_l">
			<li class="time">2015-05-16 </li>
			<li>湖州宏升箱包有限公司</li>
			<li>Mr Yang</li>
			<li>2010-05-12</li>
			<li>1000万人民币【RMB】</li>
			<li>塑胶包装/熟料</li>
			<li>个体经营</li>
			<li>贸易型</li>
			<li>汽摩及配件</li>
			<li class="companyPic">
				<div class="picFrame">
					<img src="/newresources/images/companyFace.png">
					<div>营业执照</div>
				</div>
				<div  class="picFrame">
					<img src="/newresources/images/companyFace.png">
					<div>税务登记证</div>
				</div>
				<div  class="picFrame">
					<img src="/newresources/images/companyFace.png">
					<div>组织机构代码证</div>
				</div>
				<div  class="picFrame">
					<img src="/newresources/images/companyFace.png">
					<div>纳税人资格证书</div>
				</div>
			</li>
		</ul>
		<ul class="formContent f_l">
			<li class="time">2014-05-16 </li>
			<li>湖州宏升箱包有限公司</li>
			<li>Mr Yang</li>
			<li>2010-05-12</li>
			<li>1000万人民币【RMB】</li>
			<li>塑胶包装/熟料</li>
			<li>个体经营</li>
			<li>贸易型</li>
			<li>汽摩及配件</li>
			<li class="companyPic">
				<div class="picFrame">
					<img src="/newresources/images/companyFace.png">
					<div>营业执照</div>
				</div>
				<div  class="picFrame">
					<img src="/newresources/images/companyFace.png">
					<div>税务登记证</div>
				</div>
				<div  class="picFrame">
					<img src="/newresources/images/companyFace.png">
					<div>组织机构代码证</div>
				</div>
				<div  class="picFrame">
					<img src="/newresources/images/companyFace.png">
					<div>纳税人资格证书</div>
				</div>
			</li>
		</ul> -->
		</div>
		<span class="posA hide posAprev" onclick="recordPrev()">&lt;</span>
		<span class="posA hide posAnext" onclick="recordNext()">&gt;</span>
		</div>
		<!--表格内容结束-->
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
<script type="text/javascript" src="/usercenter/purchaseManage/SupplierManage/js/qualificationChange.js"></script>
</body>
</html>			