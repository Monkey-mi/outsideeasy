<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
<title>四方众协-供应链企业在线商务协作网！</title>
<link href="/newresources/css/page.css" rel="stylesheet" />
<link href="/newresources/css/newYear.css" rel="stylesheet" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" /> 

<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<script  type="text/javascript" src="/newresources/js/json2.js"></script>
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->

<script type="text/javascript">
$(function(){
//设置页面高度
		$('.index_midd_wrap').css({minHeight:$(window).height()-475});
		window.onresize=function(){
			$('.index_midd_wrap').css({minHeight:$(window).height()-475});
		};	
		loadCommonPage();
		var result = isLoginForPlateForm();
		if(result.isLogin == true){
			var account = result.data;
			$("#loginName_span").html(account.login_name);
			$(".dologin").css("display","none");
			$(".haslogin").css("display","block");
			$(".doregister").css("display","none");
		}else{//未登录，跳转到登录页面
			$("#userCenterHref").attr("href","/login.html?redirect="+encodeURIComponent("supplierForPlateForm/registerInfo.htm"));
		}
		//通过透明度判断浏览器是否为IE6~IE8
		if (!$.support.opacity) {
			$(".browserVersion").slideDown("slow");
		}
		$(".browserVersion").on('click',function(){$(this).slideUp("slow");});
});	
	//enter键触发搜索
	/* $(function(){
		document.onkeydown = function(e){ 
		    var ev = document.all ? window.event : e;
		    if(ev.keyCode==13) {
				doCompanySearch();
		     }
		};
	});  */
	
	//搜索按钮事件
	function doCompanySearch(){
		var search_text=$.trim($("#search_text").val());
		window.open("CommonUse/searchCompany.htm?searchKey="+escape(search_text));
	}
	
	//加载公用部分界面，如同步，底部，左侧菜单等
	function loadCommonPage(){
		//$("#top").load(getwebroot()+"platform/top.html");
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	}
	
	function go_index(url)
	{
	window.location.href="/index.jsp";
	}
	function hideTip(){
		$(".browserVersion").slideUp("slow");//.hide();
		
	}
	function test()
	{
	window.plugLogin({onOk:function(){}});
	}
	/**
 * 跳转网页详细页面
* goHelpContent
* @param url,web_id
* @return void
* @author yukai
* 2016-11-17
 */
 function goHelpContent(url,web_id){
 	var param ={"webId":web_id};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+url;
 }
</script>
</head>
<body class="bg_white">
<div class="browserVersion" style="display:none;">
	<div class="f_l ml10">
		<img src="/newresources/images/browserVersion.png" class="tipsImg">
		您的浏览器版本过低请升级至<span class="browser1">IE9</span>，如果想得到最佳浏览效果，建议使用<span class="browser2">FireFox,Chrome</span>浏览器
	</div>
	<div class="close f_r mr10" onclick="hideTip()">
		X
	</div>
</div>
<div class="top_1_wrap">
	<div class="div_1024_c_wrap">
		<div class="top_1_float f_l">
			<div class="dologin"><a id="doLoginIn" href="/login.html">登录</a></div>
			<div class="haslogin">
				<span id="loginName_span"></span>
				<a id="doLoginout" href="javaScript:void(0)" onclick="doLoginOut()">退出</a>
			</div>
			<div class="doregister"><a href="/userInfo/register.htm">免费注册</a></div>
		</div>
		<div class="top_1_float f_r">
			<a id="userCenterHref" href="/supplierForPlateForm/registerInfo.htm">企业中心</a>
			<a href="/CommonUse/aboutUs.htm">关于我们</a>
			<a onclick="goHelpContent('announcement/helpCenterContent.htm',12)">帮助</a>
			<button class="beta">Beta</button>
		</div>
	</div>
</div>
<div class="top_2_wrap" style="position: relative;">
	<img src="/newresources/images/newYear/banner.png" style="z-index:-1;width:100%;height:100%;position:absolute;top:0px;left:0px;">
	<div class="div_1024_c_wrap">
		<div class="logo_wrap">
			<img class="f_l" src="/newresources/images/logo/logo_main.png" style="cursor:pointer" onclick="go_index()"/>
			<!-- <div class="logo_text">
				<p class="font1 white_color">四方众协</p><p class="font2 white_color">Outsideasy.com</p>
			</div> -->
		</div>
		<div class="search_wrap">
			<img src="/newresources/images/newYear/tip.png" style="margin-left:324px;">
			<div class="search_div">
				<input type="text" class="input_wrap" id="search_text" placeholder="请输入企业名称、行业名称关键字搜索企业"/>
				<span class="btn_bg_wrap" style="background:#ebaf0c;"><button type="button" class="search_btn" onclick="doCompanySearch()">搜索</button></span>
			</div>
		</div>
	</div>
</div>
<div class="index_midd_wrap mb10">
	<div class="midd_1_wrap">
		<!-- <p class="big_title">网站新功能即将上线！</p>
		<p class="discript">功能调试中 敬请期待</p> -->
		<img src="/newresources/images/newYear/newyear.png" class="mt10">
	</div>
	<div class="midd_2_wrap clearfix">
		<div class="f_block_wrap">
			<div class="inner_wrap">
				<div class="f_img_wrap"><!-- <img src="/newresources/images/index/1.png" /> --><img src="/newresources/images/newYear/2.png" /></div>
				<h4>关于我们</h4>
				<p>平台致力于打造一流的供应链协作服务，为企业提供属于自己的供应链云平台。你的成功是我的使命。</p>
			</div>
		</div>
		<div class="f_block_wrap">
			<div class="inner_wrap">
				<div class="f_img_wrap"><!-- <img src="/newresources/images/index/2.png" /> --><img src="/newresources/images/newYear/0.png" /></div>
				<h4>主要服务</h4>
				<p>在线采购</p>
				<p>企业组织架构管理</p>
				<p>外协订单</p>
			</div>
		</div>
		<div class="f_block_wrap">
			<div class="inner_wrap">
				<div class="f_img_wrap"><!-- <img src="/newresources/images/index/3.png" /> --><img src="/newresources/images/newYear/1.png" /></div>
				<h4><a onclick="goHelpContent('announcement/helpCenterContent.htm',12)">帮助中心</a></h4>
				<p>新手上路</p>
				<p>企业入驻</p>
				<p>入驻变更</p>
				<p>企业信息维护</p>
				<p>联系我们</p>
			</div>
		</div>
		<div class="f_block_wrap">
			<div class="inner_wrap">
				<div class="f_img_wrap"><!-- <img src="/newresources/images/index/4.png" /> --><img src="/newresources/images/newYear/7.png" /></div>
				<h4>联系我们</h4>
				<p>公司地址：浙江省拱墅区祥园路35号</p>
		<!-- 		<p>联系电话：(0571) 28906106</p> -->
				 <p>合作 QQ：1670498010</p>
				<!-- <p><a onclick="test()">合作 QQ：1670498010</a></p>-->
				<p>技术支持：(0571) 28906105</p>

			</div>
		</div>
	</div>
	<div class="midd_3_wrap">
		<a href="javascript:void(0)" onClick=""><img src="/newresources/images/index/index-xl.png" /><br />下拉</a>
	</div>
</div>
<!--底端-->
<div id="bottom">
</div>
</body>
</html>
