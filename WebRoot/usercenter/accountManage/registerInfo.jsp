<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>注册信息</title>
<link href="/newresources/css/page.css" rel="stylesheet" type="text/css" />
<link href="/vip/resources/css/vippage.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
</head>
<body class="bg_grey">
<div id="top"></div>
<!--中间-->
<div class="midd_wrap clearfix">
	<div class="midd_left_wrap" style="width:180px;"></div>
	<div class="midd_right_wrap" style="width:834px">
	<!-- 	<div class="account_right_title">
			<span  class="f_l ml10"><span id="companyName">...</span><span id="isCheck" class="span_rz ml10 display_none" >实名入驻</span></span>
		</div> -->
		<div class="account_right_inner_wrap">
			<h4>注册信息<span class="mr10 f_r " style="font-size:12px;color:#777;">注册于：<span id="registerTime">0000/00/00 00:00:00</span></span></h4>
			<hr class="hr_grey" />
			
			<div class="account_right_inner_wrap">
				<div class="account_right_inner_line">
					<div class="account_right_inner_line_info clearfix">
						<span class="f_l">
							<img src="/newresources/images/accounManage/email.png">
							<label>企业邮箱</label>
						</span>
						<span class="split f_l">|</span>
						<span class="f_l">
							<span id="isEmailCheck" class="span_yz ml15">已验证</span>
							<span id="email" class="content">...</span>
							<span class="ml25">可用邮箱直接登录</span>
						</span>
							<a class="operate_a right" href="/userInfo/updateEmail.htm" target="_blank">修改</a>
					</div>
				</div>
				<div class="account_right_inner_line">
					<div class="account_right_inner_line_info clearfix">
						<span class="f_l">
							<img src="/newresources/images/accounManage/name.png">
							<label>用户名</label>
						</span>
						<span class="split f_l">|</span>
						<span class="f_l">
							<span id="userName" class="content ml60">...</span>
							<span class="ml20">可用用户名直接登录</span>
						</span>
					</div>
				</div>
				<div class="account_right_inner_line">
					<div class="account_right_inner_line_info clearfix">
						<span class="f_l">
							<img src="/newresources/images/accounManage/password.png">
							<label>密码</label>
						</span>
						<span class="split f_l">|</span>
						<span class="f_l">
							<span class="content ml60">******</span>
						</span>
							<a class="operate_a right" href="/userInfo/updatePwd.htm" target="_blank">修改</a>
					</div>
				</div>
				<!-- <div class="account_right_inner_line">
					<div class="account_right_inner_line_info">
						<label>企业名称:</label>
						<span id="companyName1" class="content">...</span>
						<a class="operate_a" href="/usercenter/companyManage/certification.html" style="display:none">实名认证</a>
					</div>
				</div> -->
				<div class="account_right_inner_line clearfix" >
					<div class="account_right_inner_line_info clearfix" >
						<span class="f_l clearfix">
							<img src="/newresources/images/accounManage/companyName.png">
							<label>企业名称</label>
						</span>
						<div id="companyInfo" class="companyInfo f_l">
							<!-- <div class="info">
								<span id="companyName1" >浙江泰普森控股集团</span>
								<span id="isEmailCheck" class="span_yz">已认证</span>
								<a class="operate_a" href="">企业信息维护</a>
							</div>
							<div class="mt30 info">
								<span>浙江泰普森休闲用品有限公司</span>
								<a class="operate_a" href="" target="_blank">入驻认证</a>
							</div>
							<div class="mt30 info">
								<span >浙江泰普森休闲用品有限公司</span>
								<a class="operate_a" href="" target="_blank">认证申请中</a>
							</div>-->
						</div>
					</div>
					<div id="addCompany"><!-- <button onclick="go_certification(0)" class="addCompany">+&nbsp;新增企业</button> --></div>
				</div>
			</div>
		</div>
	</div>
</div>
<!--底端-->
<div id="bottom"></div>
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script>
<script type="text/javascript" src="/newresources/js/base.js"></script>
<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript">
	$(function(){
		loadCommonPage();
		//测试，当前页面是否有删除按钮权限
		//var has_auth= hasRoleFuncAuth("add_btn","/test123.html");
		//console.log("has_auth:"+has_auth);
		//getleftMenus("12");
		$(".midd_wrap").css({minHeight:$(window).height()-200});
		$(".midd_left_wrap").css({minHeight:$(window).height()-200});
		$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		
		window.onresize=function(){
			$(".midd_wrap").css({minHeight:$(window).height()-200});
			$(".midd_left_wrap").css({minHeight:$(window).height()-200});
			$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		};
		getCompanyListByRegId();
	});
	
	//加载公用部分界面，如同步，底部，左侧菜单等
	function loadCommonPage(){
		var isVipCookie = getCookie("isVip");
		var result = isLoginForPlateForm();
		if(!result.isLogin && isVipCookie == "true"){//判断登录失效后跳转的登录页面
			go_redirect("vip");//vipLogin
		}else if(!result.isLogin && isVipCookie == "false"){
			go_redirect("login.html");
		}
		if(result.data!=null && result.data.vip == true){
			$("#top").load(getwebroot()+"vip/platform/vipTop.html",null,function(responseTxt,statusTxt,xhr){
				if(statusTxt=="success")
					{
						$("#mainNav").children().eq(1).addClass("curr");
						$(".vip_search_wrap").hide();
					}
			});
			$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
			$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/vipLeftMenu.html",function(responseTxt,statusTxt,xhr){
				if(statusTxt=="success"){
					$("#leftMenuPage").children().eq(1).children().eq(0).find("a").prepend(">>");
					$("#leftMenuPage").children().eq(1).children().eq(0).addClass("currVip");
				}
			});
		}else{
			$("#top").load(getwebroot()+"platform/top.html",null,function(responseTxt,statusTxt,xhr){
				if(statusTxt=="success")
					{
						$("#mainNav").children().eq(2).addClass("curr");
					}
			});
			$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
			$(".midd_left_wrap").load(getwebroot()+"usercenter/leftMenu.html",function(responseTxt,statusTxt,xhr){
				if(statusTxt=="success"){
					$("#leftMenuPage").children().eq(1).children().eq(0).css("background","#ececec");
				}
			});
		}
	}

	//信息展示
	function getRegisteInfo() {
		$("#registerTime").html(
				new Date(userInfo.reg_date.time).Format("yyyy-MM-dd HH:mm:ss"));//需要格式化
		if (userInfo.login_name == null) {
			window.wxc.xcConfirm("请先登录", confirm);
		} else {
			if (userInfo.login_name.indexOf(":") >= 0) {
				$("#email").parent().parent().css("display", "none");
				$("#companyName1").next("a").css("display", "none");
			} else {
				$("#email").html(userInfo.account_email);
			}
		}
		$("#userName").html(userInfo.login_name);
		if (userInfo.email_valid != 1) {
			$("#isEmailCheck").css("display", "none");
		}
		if (userInfo.login_name.indexOf(":") >= 0) {
			$("#companyName1").next("a").css("display", "none");
		}

	}
	/**
	 * 根据主账号ID获取公司信息
	 * getCompanyListByRegId
	 * @returns any
	 * @author yukai
	 * 2016-8-3 上午11:10:12
	 */
	function getCompanyListByRegId() {
		var url = "supplierForPlateForm/getCompanyListByRegId.do";
		var params = {};
		var isasync = true;
		var fn = function(result) {
			var hasEditAuth=hasRoleFuncAuth("edit_company","/supplierForPlateForm/registerInfo");
			var item="";
			for(var i=0;i<result.data.length;i++){
				if(result.data[i].apply_sts==15){
					var str='<span class="split">|</span><span id="isEmailCheck" class="span_yz ml15">已认证</span>';
				}else{
					var str='<span class="split" style="margin-right:57px;">|</span>';
				}
				if(userInfo.account_type==0){
					 str+='<span class="ml5">'+result.data[i].cpyname_cn+'</span>';
				}else{
					str +='<a onclick="go_companyWindow('+result.data[i].company_id+')">'+result.data[i].cpyname_cn+'</a>';
				}
				if(hasEditAuth){
				if(result.data[i].apply_sts==15){
				/* 	str+='<span class="split">|</span><span id="isEmailCheck" class="span_yz ml10">已认证</span>'; */
					str+='<a class="operate_a right ml10" onclick="go_companyInfo('+result.data[i].company_id+')">企业信息维护</a>';
					if(result.data[i].state==1){
						str+='<a class="operate_a right" onclick="go_updateCertification('+result.data[i].company_id+',\'\')">变更审核中<a/>';
					}else{
						str+='<a class="operate_a right" onclick="go_updateCertification('+result.data[i].company_id+','+result.data[i].canUpdate+')">入驻变更<a/>';
					}
				}
				else if(result.data[i].apply_sts==4){
					str+='<a class="operate_a right" onclick="go_certification('+result.data[i].company_id+')" target="_blank">入驻认证</a>';
				}
				else if(result.data[i].apply_sts==5){
					str+='<a class="operate_a right" onclick="go_certification('+result.data[i].company_id+')" target="_blank">认证申请中</a>';
				}
				else if(result.data[i].apply_sts==20){
					str+='<a class="operate_a right" onclick="go_certification('+result.data[i].company_id+')" target="_blank">入驻认证</a>';
				}
				}
				var str1='<div class="mt30 info">';
				if(i==0){
					str1='<div class="info">';
				}
				item+=str1
					+str
					+'</div>';
			}
			var hasAddAuth=hasRoleFuncAuth("add_company","/supplierForPlateForm/registerInfo");
			//console.log("hasAddAuth:"+hasAddAuth);
			if(hasAddAuth)
			{
				var item2='<button onclick="go_certification(0)" class="addCompany mt30">+&nbsp;新增企业</button>';
			}
			$("#companyInfo").append(item);
			$("#addCompany").append(item2);
			getRegisteInfo();//信息展示
		};
		asyncAjaxMethod(url, params, isasync, fn);
	}
	
	/**
	 * 跳转入驻认证页面
	 * go_certification
	 * @returns any
	 * @author yukai
	 * 2016-8-3 上午11:10:12
	 */
	function go_certification(company_id){
		if(company_id==0){
			if(!checkAddCompany()){
				var option ={title:"提示",btn:parseInt("0001",2)};
		  	 	window.wxc.xcConfirm("请先完成入驻认证再新增企业！", window.wxc.xcConfirm.typeEnum.custom,option);
		  	 	return;
			}
		}
		var param ={"companyIdForCertification":company_id};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"supplierForPlateForm/certification.htm";
	}
	/**
	 * 跳转公司信息页面
	 * go_companyInfo
	 * @returns any
	 * @author yukai
	 * 2016-8-3 上午11:10:12
	 */
	function go_companyInfo(company_id){
		var param ={"companyIdForAll":company_id};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"supplierForPlateForm/baseInfo.htm";
	}
	/**
	 * 跳转门户
	 * go_companyWindow
	 * @returns any
	 * @author yukai
	 * 2016-8-3 上午11:10:12
	 */
	function go_companyWindow(companyId){
		var param ={"companyIdForWindow":companyId};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"supplierForPlateForm/companyWindow.htm";
	}
	
	/**
	 * 跳转入驻变更页面
	 * go_updateCertification
	 * @returns any
	 * @author yukai
	 * 2016-8-26
	 */
	function go_updateCertification(company_id,canUpdate){
		if(canUpdate||canUpdate==''){
			var param ={"companyIdForUpdate":company_id};
			addParamsToWindowName(param);
			window.location.href=getwebroot()+"supplierForPlateForm/updateCertification.htm";
		}else{
			var option ={title:"提示",btn:parseInt("0001",2)};
		  	 window.wxc.xcConfirm("正在准入申请不能变更入驻信息！", window.wxc.xcConfirm.typeEnum.custom,option);
		  	 return;
		}
	}
	/**
	 * 检查能否新增企业
	 * checkAddCompany
	 * @returns any
	 * @author yukai
	 * 2016-8-26
	 */
function checkAddCompany(){
	var flag=true;
	var url="supplierForPlateForm/getCompanyListByRegId.do";
	var params={};
	params.pass="false";
	var fn=function(result){
		if(result.data.length>0){
			flag=false;
		}
	};
	asyncAjaxMethod(url,params,false,fn);
	return flag;
}
</script>
</body>
</html>
						