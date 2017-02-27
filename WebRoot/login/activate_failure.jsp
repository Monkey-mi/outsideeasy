<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>激活失败</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	
	<style type="text/css">
		.centenbox{
			width:580px; height:160px;
			 background:#fff;
			 position:absolute; left:50%;margin-left:-290px; 
			 top:50%; margin-top:-50px; 
			 box-shadow:0 0 8px #444; 
		}
		.imgdiv{
			text-align:center;
		}
		.textdiv{
			font-size:32px;
		    text-align:center;
		}
	</style>

  </head>
  
  <body>
    <div class="centenbox">
    	<div class="imgdiv"><img src="resources/images/warn.png" width="100" height="100"></img></div>
    	<div class="textdiv">
    	${activatemessage}
    	</div>
    </div>
  </body>
</html>
