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
function go_login()
{
	window.location.href=getwebroot+"supplierForPlateForm/registerInfo.htm";
}
function go_index()
{
	var result = isLoginForPlateForm();
	if(result.data.vip == true){
		window.location.href=getwebroot+"supplierForPlateForm/registerInfo.htm";
	}else{
		window.location.href="/index.jsp";
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
		<p class="p4">当前账号还未被隶属于某个公司，请联系管理员进行子账号分配公司操作。</p>
		<p class="p4">
			<button onclick="go_login()">&gt;&nbsp;&nbsp;返回</button>
			<button onclick="go_index()">&gt;&nbsp;&nbsp;首页</button>
		</p>
	</div>
</body>
</html>