<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>视频查看页面</title>
<link href="/newresources/css/lbt.css" type="text/css" rel="stylesheet" />
<!-- <script src="/newresources/js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/newresources/js/base.js"></script>
<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<%@ include file="/newresources/js/base.jsp" %>
<script src="/newresources/js/jquery.lbt.js" ></script>
<script type="text/javascript" src="/usercenter/saleManage/tradeManage/js/orderVideoView.js"></script>

</head>
<body>
<div class="top_wrap mb10">
	<div class="top_inner_wrap">
		<img src="/newresources/images/logo/logo_main.png" />
	</div>
</div>
<div class="midd_wrap">

   	 	<!-- 轮播广告 -->
    	<div id="picBoxvideo"  class="picBox">
			 <ul class="cf">
				
			</ul>        
    </div>
   	 <div id="listBoxvideo" class="listBox">
			<ul class="cf">
			
				
			</ul>
		
		<span id="prev"  onClick="loadNewSrcat(this,-1)" class="switch_btn prev">&lt;</span>
		<span id="next"  onClick="loadNewSrcat(this,1)"  class="switch_btn next">&gt;</span>
	</div> 
</div>
</body>
</html>
