<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>图片查看页面</title>
<link href="/newresources/css/lbt.css" type="text/css" rel="stylesheet" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" />
<!-- <script src="/newresources/js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/newresources/js/base.js"></script>
<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<%@ include file="/newresources/js/base.jsp" %>
<script src="/newresources/js/jquery.lbt.js" ></script>
<script src="/companyWindow/js/companyImageView.js"></script>
</head>
<body>
<div class="top_wrap mb10">
	<div class="top_inner_wrap">
		<img src="/newresources/images/logo/logo_main.png" />
	</div>
</div>
<div class="midd_wrap">

   	 	<!-- 轮播广告 -->
    	<div id="picBox"  class="picBox">
			<ul class="cf">
				<!-- <li>
					<a href="javascript:void(0)"><img src="/newresources/images/lbt/1.png" alt=""/></a>
					<span>图片名称&nbsp;&nbsp;&nbsp;&nbsp;图片描述</span>
				</li>
				<li>
				   <a href="javascript:void(0)"><img src="/newresources/images/lbt/2.jpg" alt="2" /></a>
				   <span>图片名称&nbsp;&nbsp;&nbsp;&nbsp;图片描述</span>
				</li>
				<li>
				   <a href="javascript:void(0)"><img src="/newresources/images/lbt/3.jpg" alt="2" /></a>
				   <span>图片名称&nbsp;&nbsp;&nbsp;&nbsp;图片描述</span>
				</li>
				<li>
				   <a href="javascript:void(0)"><img src="/newresources/images/lbt/4.jpg" alt="2" /></a>
				   <span>图片名称&nbsp;&nbsp;&nbsp;&nbsp;图片描述</span>
				</li>
				 <li>
				   <a href="javascript:void(0)"><img src="/newresources/images/lbt/5.jpg" alt="2" /></a>
				   <span>图片名称&nbsp;&nbsp;&nbsp;&nbsp;图片描述</span>
				</li>
				 <li>
				   <a href="javascript:void(0)"><img src="/newresources/images/lbt/6.jpg" alt="2" /></a>
				   <span>图片名称&nbsp;&nbsp;&nbsp;&nbsp;图片描述</span>
				</li>
				<li>
				   <a href="javascript:void(0)"><img src="/newresources/images/lbt/4.jpg" alt="2" /></a>
				   <span>图片名称&nbsp;&nbsp;&nbsp;&nbsp;图片描述</span>
				</li> -->
			</ul>
		
        <span id="prevTop" class="switch_btn prev">&lt;</span>
		<span id="nextTop" class="switch_btn next">&gt;</span>
       
    </div>
   	<div id="listBox" class="listBox">
			<ul class="cf">
				<!-- <li  class="on"><img src="/newresources/images/lbt/s1.png" /></li>
				<li><img src="/newresources/images/lbt/s2.png" /></li>
				<li><img src="/newresources/images/lbt/s3.png" /></li>
				<li><img src="/newresources/images/lbt/s4.jpg" /></li>
				<li><img src="/newresources/images/lbt/s5.jpg" /></li>
				<li><img src="/newresources/images/lbt/s6.jpg" /></li>
				<li><img src="/newresources/images/lbt/s4.jpg" /></li> -->
			</ul>
		
		<span id="prev" class="switch_btn prev">&lt;</span>
		<span id="next" class="switch_btn next">&gt;</span>
	</div>
</div>
</body>
</html>
