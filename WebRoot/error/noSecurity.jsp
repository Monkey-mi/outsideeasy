<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>错误</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="/newresources/css/error.css" />
<!-- <script src="/newresources/js/jquery-1.10.2.min.js" type="text/javascript"></script>
<script type="text/javascript" src="/newresources/js/base.js"></script> -->
<%@ include file="/newresources/js/base.jsp" %>
<script type="text/javascript">
var c=0;
$(function(){
	if(window.history.length > 0){
		$(".p4").show();
	}
	timeCount(10);
});
function timeCount(num)
{
	c=num;
	$("#time_count").html(c);
	c=c-1;
	if(c>=0)
	{
		setTimeout("timeCount(c)",1000);
	}
	else
	{
		//go_login();
		go_back();
	}
}
function go_login()
{
	var result=isLoginForPlateForm();
	if(result.data.vip==true){
		window.location.href="/vip";//vipLogin
	}else{
		window.location.href="/login.html";
	}
}
function go_back()
{
	if(window.history.length > 0){
		window.history.back();
	}
}
</script>
</head>

<body class="bg_grey">
	<div class="error_midd_wrap">
		<p class="p1">
			<img src="/newresources/images/error/error.png" /><span class="span1">Sorry</span>
		</p>
		<p class="p2">没有权限访问该页面……</p>
		<p class="p3">对不起，出错啦</p>
		<p class="p4" style="display:none;">
			<!-- <button onclick="go_login()">&gt;&nbsp;&nbsp;返回登录</button> -->
			<button onclick="go_back()">&gt;&nbsp;&nbsp;返回</button>
			<span class="span4">正在返回登录页面……倒计时<span id="time_count" class="count_span">10</span>秒</span>
		</p>
	</div>
</body>
</html>
