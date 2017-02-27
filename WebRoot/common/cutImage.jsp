<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=8">
<meta http-equiv="Expires" content="0">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-control" content="no-cache">
<meta http-equiv="Cache" content="no-cache">
<title>截图</title>
<!--page.css 为修改标题新引入  -->
<link href="/newresources/css/page.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" />
<link href="/newresources/jcrop/css/jquery.Jcrop.css" rel="stylesheet" type="text/css"></link>
</head>

<body class="bg_grey">
<div id="top"></div>
 <div><h2>图片预览:</h2></div>
  <table>
  <tr>
  <!--  style="width: 200px; height: 150px; "  设置原始图片样式 -->
  	<td><img id="userimg"  style="width: 200px;" /></td>
  	<!--  style="width: 120px; height: 120px; overflow: hidden; margin-left: 5px;"  设置预览图片样式 -->
  	<td><div id="show-cut-img-div" style="width: 120px; height: 120px; overflow: hidden; margin-left: 5px;" ><img id="preview" /></div></td>
  </tr>
  <tr>
  	<td>
  <input type="hidden" id="x" />
  <input type="hidden" id="y" />
  <input type="hidden" id="w" />
  <input type="hidden" id="h" />
  
   <input type="button" id="submit" value="保存图片" />
  	</td>
  </tr>
  </table>

<!--底端-->
<div id="bottom"></div>

<%@ include file="/newresources/js/base.jsp" %>
<!-- 
<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script>
<script type="text/javascript" src="/newresources/js/base.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/jcrop/js/jquery.Jcrop.min.js"></script> -->
<script type="text/javascript" src="/newresources/jcrop/js/jquery.min.js"></script>
<script type="text/javascript" src="/newresources/jcrop/js/jquery.Jcrop.js"></script>
<script type="text/javascript">
	var filename=getQueryString("filename");
	var imgid=getQueryString("imgid");
	var fix_w=parseInt(getQueryString("fix_w"));
	var fix_h=parseInt(getQueryString("fix_h"));
	var newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+filename;
	var api = null;//Jcrop
	$(function(){
		$("#show-cut-img-div").width(fix_w);
		$("#show-cut-img-div").height(fix_h);
		function showPreview(coords){
			var rx = fix_w / coords.w;
			var ry = fix_h / coords.h;
			var ow = $("#userimg").width();
			var oh = $("#userimg").height();
			
			
			$("#preview").css({
				width: 	Math.round(rx * ow) + 'px',
				height: Math.round(ry * oh) + 'px',
				marginLeft: '-' + Math.round(rx * coords.x) + 'px',
				marginTop: '-' + Math.round(ry * coords.y) + 'px'
			});
			$("#w").attr("value",Math.round(rx * ow));
			$("#h").attr("value",Math.round(ry * oh));
			$("#x").attr("value",Math.round(rx * coords.x));
			$("#y").attr("value",Math.round(ry * coords.y));
			
		};
		$("#userimg").bind("load",function(){
			if(api!=null){
				api.destroy();
			}
		
			api = $.Jcrop("#userimg",{ 
				onChange : showPreview,
				onSelect : showPreview,
				aspectRatio : 1,//固定长宽比
				allowResize : true
			});
		});
		
		$("#submit").bind("click",function(){
			var x = $("#x").val();
			var y = $("#y").val();
			var w = $("#w").val();
			var h = $("#h").val();
			var img = $("#userimg").attr("src");
			if(x=="" || x==null){
				var option ={title:"提示",btn:parseInt("0001",2)};
		        window.wxc.xcConfirm("请先截图再上传", window.wxc.xcConfirm.typeEnum.custom,option);
		        return;
			}
			var url="taskFile/updateImageByJcrop.do";
			var params={};
			params.filename=filename;
			params.x=x;
			params.y=y;
			params.w=w;
			params.h=h;
			params.fix_w=fix_w;
			params.fix_h=fix_h;
	   		var fn=function(result){
	   			window.opener.reloadImageByID(imgid);
	   			window.close();
	   		};
	   		asyncAjaxMethod(url,params,true,fn);
			
		});
		
		$("#userimg").attr("src", newsrc);
		$("#preview").attr("src", newsrc);
	});
		
</script>
</body>
</html>