<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>提示</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<style type="text/css">
		.centenbox{
			width:400px; height:140px;
			 background:#fff;
			 position:absolute; left:50%;margin-left:-200px; 
			 top:50%; margin-top:-50px; 
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
    	<div class="imgdiv"><img src="resources/images/email.png" width="100" height="80"></img></div>
    	<div class="textdiv">
    	请尽早通过邮箱激活
    	</div>
    </div>
  </body>
</html>
