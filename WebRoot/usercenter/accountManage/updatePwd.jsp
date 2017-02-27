<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>修改密码</title>
<link href="/newresources/css/page.css" rel="stylesheet">
<link href="/vip/resources/css/vippage.css" rel="stylesheet" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet">
<script type="text/javascript" src="/newresources/js/md5.js"></script>
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript">
var old_pwd_flag=true;
var new_pwd_flag=false;
var new_pwd2_flag=false;
var express2= /^([0-9a-zA-Z_]|\W)+$/;
$(function(){
		var result = isLoginForPlateForm();
		if(result.isLogin == false){
			window.wxc.xcConfirm("请先登录",confirm);
		}
		if(!result.data.vip){
			$(".step_wrap").addClass("normalLogin");
			$("input").addClass("normalLogin");
		}

		//设置页面高度
		var height=$('.midd_wrap').height();
		if(height<$(window).height()-175)
		{
			$('.midd_wrap').height($(window).height()-175);
		}
		
		window.onresize=function(){
			$('.midd_wrap').height(600);
			if($('.midd_wrap').height()<$(window).height()-175)
			{
			$('.midd_wrap').height($(window).height()-175);
			}
		};
		loadCommonPage();
		$(".input_wrap").on("blur",function(){
			var id=$(this).attr("id");
			var error_str="";
			if(id=="old_pwd")
			{
				var old_pwd=$(this).val();
				if(old_pwd=="")
				{
					old_pwd_flag=false;
					error_str="请输入旧密码";
				}
				else
				{
					//后台验证旧密码是否正确
					if(checkPassword(old_pwd)){
						old_pwd_flag=true;
					}else{
						old_pwd_flag=false;
						error_str="旧密码错误";
					}
				}
			}
			else if(id=="new_pwd")
			{
				var pwd1=$(this).val();
				
				if(pwd1=="")
				{
					error_str="请输入新密码";
					new_pwd_flag=false;
				}
				else if(pwd1.length<6||pwd1.length>20)
				{
					error_str="请输入6~20位字符";
					new_pwd_flag=false;
				}
				else if(!express2.test(pwd1))
				{
					error_str="只允许使用字母、数字、字符等自由组合";
					new_pwd_flag=false;
				}
				
				else
				{
					new_pwd_flag=true;
				}
			}
			else if(id=="new_pwd2")
			{
				var pwd1=$("#new_pwd").val();
				var pwd2=$(this).val();
				
				if(pwd2=="")
				{
					error_str="请输入确认密码";
					new_pwd2_flag=false;
				}
				else if(pwd1!=pwd2)
				{
					error_str="两次密码输入不相同";
					new_pwd2_flag=false;
				}
				else
				{
					
				new_pwd2_flag=true;
				}
				
			}
			if(error_str!="")
			{
				$(this).nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span></div>");
				$(this).nextAll(".info_explain_wrap").fadeIn("fast");
				loginid_or_emial_flag=false;
			}
			else
			{
				loginid_or_emial_flag=true;
				$(this).nextAll(".info_explain_wrap").css("display","none");//fadeOut("fast");
			}
		});
		$(".input_wrap").on("focus",function(){
			var id=$(this).attr("id");
			var info_str="";
			if(id=="old_pwd")
			{
				info_str="请输入原密码";
			}
			else if(id=="new_pwd")
			{
				info_str="请输入6-20位字符";
			}
			if(info_str!="")
			{
				$(this).nextAll(".info_explain_wrap").fadeIn("fast");
				var html_str="<div class='info_explain'><img class='info_explain_icon' src='/newresources/images/new/ts1.png' /><span class='info_explain_tip' style='width:200px;'>"+info_str+"</span></div>";
				$(this).nextAll(".info_explain_wrap").html(html_str);
			}
		});
		
		//密码强度校验
		$("#new_pwd").on("keyup",function () { 
		
		$(this).nextAll(".info_explain_wrap").css("display","none");
	
		$(this).nextAll(".pw_reg_explain").css("display","block");
		var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"); 
		var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"); 
		var enoughRegex = new RegExp("(?=.{6,}).*", "g"); 
	
		if (false == enoughRegex.test($(this).val())) { 
			$('#pwd_level').removeClass('pw-weak'); 
			$('#pwd_level').removeClass('pw-medium'); 
			$('#pwd_level').removeClass('pw-strong'); 
			$('#pwd_level').addClass(' pw-defule'); 
			 //密码小于六位的时候，密码强度图片都为灰色 
		} 
		else if (strongRegex.test($(this).val())) { 
			$('#pwd_level').removeClass('pw-weak'); 
			$('#pwd_level').removeClass('pw-medium'); 
			$('#pwd_level').removeClass('pw-strong'); 
			$('#pwd_level').addClass(' pw-strong'); 
			 //密码为八位及以上并且字母数字特殊字符三项都包括,强度最强 
		} 
		else if (mediumRegex.test($(this).val())) { 
			$('#pwd_level').removeClass('pw-weak'); 
			$('#pwd_level').removeClass('pw-medium'); 
			$('#pwd_level').removeClass('pw-strong'); 
			$('#pwd_level').addClass(' pw-medium'); 
			 //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等 
		} 
		else { 
			$('#pwd_level').removeClass('pw-weak'); 
			$('#pwd_level').removeClass('pw-medium'); 
			$('#pwd_level').removeClass('pw-strong'); 
			$('#pwd_level').addClass('pw-weak'); 
			 //如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的 
		} 
		return true; 
	});
	
	
});//$(function(){})方法结束

//修改密码提交
	function updatePwd()
	{
		var result = isLoginForPlateForm();
		if(result.isLogin == false){
			window.wxc.xcConfirm("请先登录",confirm);
		}else if(!old_pwd_flag)
		{
			$("#old_pwd").focus();
		}
		else if(!new_pwd_flag)
		{
			$("#new_pwd").focus();
		}
		else if(!new_pwd2_flag)
		{
			$("#new_pwd2").focus();
		}
		else
		{
			var old_pwd = $("#old_pwd").val();
			var new_pwd = $("#new_pwd").val();
			//后台提交方法
 			var url="userInfo/updatePwd.do";
			var params={};
			params.old_pwd = hex_md5(old_pwd);
			params.new_pwd = hex_md5(new_pwd);
			
			var fn=function(result){
				if(result.total == 1){
					var str="<p class='mt30 mb20 ml30'><img src='/newresources/images/big-duigou.png' />恭喜您，密码已修改成功，请使用新密码登录</p>"
						+"<div class='mt10'><input type='button' class='step_button ml80' value='立即登录' onClick='go_redict()' /></div>";
					loginOut();
					$(".step_wrap").html(str);
					$(".step_wrap").removeClass("ml200");
					$(".step_wrap").addClass("ml400");
				}else{
					window.wxc.xcConfirm(result.message,confirm);
					return;
				}
			};
			asyncAjaxMethod(url,params,true,fn); 
		}
	}
//登出	
function loginOut(){
	var _loginId=$("#loginName_span").text();
	var url="plateFormCommon/doLogout.do";
	var params={};
	params.login_id= _loginId;
	
	var fn=function(result){
		
			if(result.success)
			{
				$(".dologin").css({display:'block'});
				$(".haslogin").css({display:'none'});
				$("#loginName_span").text("");
				$("#data_pwd").val("");
				$("#data_vCode").val("");
			}
		};
	asyncAjaxMethod(url,params,false,fn); 	
	return true;
}
	//验证旧密码是否正确
	function checkPassword(old_pwd){
	var url="userInfo/checkPassword.do";
	var params={};
	params.old_pwd=hex_md5(old_pwd);
	var flag=false;
	var fn=function(result){
		if(result.data){
			flag=true;
		}
	};
	asyncAjaxMethod(url,params,false,fn);//同步
	return flag;
	}
//跳转
function go_redict()
{
	var isVipCookie = getCookie("isVip");
	var link = "login.html";
	if("true" == isVipCookie){
		link = "vip";//vipLogin
	}
	window.location.href=getwebroot() + link;
}
//加载公用部分界面，如头部，底部，左侧菜单等
function loadCommonPage(){
	var result = isLoginForPlateForm();
	if(result.data.vip == true){
		$("#top").load(getwebroot()+"vip/platform/vipTop2.html");
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
	}else{
		$("#top").load(getwebroot()+"platform/top2.html");
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	}
}
</script>
</head>

<body class="bg_grey">
<div id="top"></div>
<!--中间-->
<div class="midd_wrap">
	<div class="div_1024_c_wrap" style="position:relative">
		<div class="curr_page_title_wrap">安全中心<span class="fs10">---修改密码</span>
		</div>
		<a style="color:#0074c2;font-size:12px;position:absolute;right:0px;bottom:0px;" href="/supplierForPlateForm/registerInfo.htm">返回</a>
	</div>
	<div class="middle_div" style=" margin-top:-240px;">
	<div class="step_wrap ml200">
		<div class="stepinner_wrap ml30 mt30">
			<span class="label_wrap">旧密码：</span>
			<input class="input_wrap" id="old_pwd" type="password" style="width:322px;" />
			<div class="info_explain_wrap"></div>
		</div>
		<div class="stepinner_wrap ml30 mt20">
			<span class="label_wrap">新密码：</span>
			<input type="password" id="new_pwd" class="input_wrap" style="width:322px;"/>
			<div class="pw_reg_explain" style="display:none">
				<div id="pwd_level" class="pw-strength">
					<div class="pw-bar"></div>
					<div class="pw-bar-on"></div>
					<div class="pw-txt">
						<span>弱</span>
						<span>中</span>
						<span>强</span>
					</div>
				</div>
			</div>
			<div class="info_explain_wrap"></div>
		</div>
		<div class="stepinner_wrap  ml30 mt20">
			<span class="label_wrap">确认密码：</span>
			<input type="password" id="new_pwd2" class="input_wrap" style="width:322px;"/>
			<div class="info_explain_wrap"></div>
		</div>
		<div class="stepinner_wrap ml30 mt30">
					<span class="label_wrap"></span>
					<input type="button" id="update_btn" class="step_button" value="确定修改" onClick="updatePwd()" />
		</div>
	</div>
</div>
</div>
<!--底端-->
<div id="bottom">
</div>
<!--[if lt IE7]>
<script  type="text/javascript" src="/newresources/js/json2.js"></script>
<![endif]-->
</body>
</html>
