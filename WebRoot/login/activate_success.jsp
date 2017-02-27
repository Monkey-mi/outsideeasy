<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<c:set var="contextPath" value="<%=path%>"></c:set>
<c:set var="basePath" value="<%=basePath%>"></c:set>
<!DOCTYPE html>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>激活成功</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	
	<style type="text/css">
		.centenbox{
			width:400px; height:160px;
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
	<script type="text/javascript"> 
		var i = 6;
		 function shownum(){ 
			i=i-1;
			/* var location = (window.location+'').split('/'); 
			var basePath = location[0]+'//'+location[2]+'/';   */
			var url="${basePath}login.html";
			document.getElementById("timecount").innerHTML=i+"秒后自动跳转登陆界面:"+url;
			if(i>0){
				setTimeout('shownum()',1000); 
			}else{
				window.location.href=url;
			}
			
		} 
	</script>
  </head>
  
  <body onload="shownum()">
    <div class="centenbox">
    	<div class="imgdiv"><img src="resources/images/email.png" width="100" height="100"></img></div>
    	<div class="textdiv">
    	${activatemessage}
    	</div>
    	<div id="timecount" class="textdiv"></div>
    </div>
  </body>
</html>
