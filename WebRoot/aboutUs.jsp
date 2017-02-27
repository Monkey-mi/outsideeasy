<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>关于我们</title>
		<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/aboutUs.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
	</head>
	<body class="bg_grey">
		<div id="top"></div>
		<!--中间-->
		<div class="midd_wrap bg_white" style="padding-bottom:80px;" >
			<div class="banner">
				<div class="content">
					<div class="con1 ">
						<img src="/newresources/images/aboutUs/line.png">
						<span class="ml5">关于我们 </span>
						<img class="ml5" src="/newresources/images/aboutUs/line.png">
					</div>
					<div class="con2">About us</div>
				</div>
			</div> 
			<div class="main">
				<div class="font1">这是一家全新的科技创业服务平台，坚守用心服务创业者的理念，专注创业创新，产品趋势报道，关注新产品、新公司、新模式。</div>
				<div class="font1 mt10">outsideasy.com平台致力于打造一流的供应链协作服务，为企业提供属于自己的供应链云平台，你的成功是我最大的使命</div>
				<div class="mt60"><img src="/newresources/images/aboutUs/contactUs.png"><span class="font2">联系方式</span></div>
				<div class="mt20 map"><img src="/newresources/images/aboutUs/map.png"></div>
				<div class="mt40"><img src="/newresources/images/aboutUs/coorperation.png"><span class="font2">招商合作</span></div>
				<div class="mt20 font1">如果贵公司对本平台感兴趣并有合作意向，或者有任何平台技术方面的问题，请联系平台技术客服0571-28906105<span class="font3">（服务时间：工作日8：30-17:30）。</span></div>
			</div>
		</div>
		<div id="bottom"></div>
<!-- 		<script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="/newresources/js/base.js"></script>
		<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
		<%@ include file="/newresources/js/base.jsp" %>
		<script type="text/javascript">
		$(function(){
			loadCommonPage();
			$(".midd_wrap").css({minHeight:$(window).height()-200});
			$(".midd_left_wrap").css({minHeight:$(window).height()-200});
			$(".midd_right_wrap").css({minHeight:$(window).height()-200});
			window.onresize=function(){ 
				$(".midd_wrap").css({minHeight:$(window).height()-200});
			};
		});
		//加载公用部分界面，如同步，底部，左侧菜单等
		function loadCommonPage(){
			var result=isLoginForPlateForm();
			if(result.data!=null && result.data.vip == true){
				$("#top").load(getwebroot()+"vip/platform/vipTopHelp.html",null,function(responseTxt,statusTxt,xhr){
					if(statusTxt=="success")
						{
							$("#mainNav").children().eq(1).addClass("curr");
							getCompanyList(companyId);
						}
				});
				$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
			}else{
				$("#top").load(getwebroot()+"platform/topForHelpCenter.html",null,function(responseTxt,statusTxt,xhr){
					if(statusTxt=="success")
						{
							$("#mainNav").children().eq(1).addClass("curr");
							if(result.isLogin){
								getCompanyList(companyId);
							}
						}
				});
				$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
			}
		}
		</script>
	</body>
</html>
