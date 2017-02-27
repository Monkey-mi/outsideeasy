<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>找回密码</title>
<link href="/newresources/css/page.css" rel="stylesheet" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" />
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<script type="text/javascript" src="/newresources/js/md5.js"></script>
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript">
var loginid_or_emial_flag=false;
var vcode1_flag=false;
var new_pwd_flag=false;
var new_pwd2_flag=false;
var vcode2_flag=false;
var express = /^[0-9a-zA-Z_]+$/;
var express2= /^([0-9a-zA-Z_]|\W)+$/;
$(function(){
	//设置页面高度
		var height=$('.midd_wrap').height();
		if(height<$(window).height()-175){
			$('.midd_wrap').height($(window).height()-175);
		}
		
		window.onresize=function(){
			$('.midd_wrap').height(600);
			if($('.midd_wrap').height()<$(window).height()-175){
				$('.midd_wrap').height($(window).height()-175);
			}
			$(".show_Agreen_wrap").height($('.midd_wrap').height()-34);
		};
		loadCommonPage();
		//默认第一步的颜色变化
		$('.stepInfo_wrap').find('.step_index').eq(0).css("background-color","#ff9900");
		//初始化placeholder控件
		$('input, textarea').placeholder();
		//密码强度校验
	$("#new_pwd").on("keyup",function (){
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
	
	//提示信息
	$(".input_wrap").on("focus",function(){
		var id=$(this).attr("id");
		var info_str="";
		if(id=="data_login_id")
		{
			info_str="请输入注册账号或邮箱";
		}
		else if(id=="new_pwd")
		{
			info_str="输入6-20位字符";
		}
		
		if(info_str!="")
		{
			$(this).nextAll(".info_explain_wrap").fadeIn("fast");
			var html_str="<div class='info_explain'><img class='info_explain_icon' src='/newresources/images/new/ts1.png' /><span class='info_explain_tip' style='width:200px;'>"+info_str+"</span></div>";
			$(this).nextAll(".info_explain_wrap").html(html_str);
		}
	});
	$(".input_wrap").on("blur",function(){
		var id=$(this).attr("id");
		var error_str="";
		//账号或邮箱校验 mishengliang 2016-03-15
		if(id=="data_login_id")
		{
			var loginid_or_email=$(this).val();
			if(loginid_or_email==""){
				error_str="请输入登录账号";
				loginid_or_emial_flag=false;
			}else{
				var url = "userInfo/isUser.do";
				var params = {};
				params.loginid_or_email = loginid_or_email;
				
				var fn = function(result){
						if(result.isSub){
							$("#data_login_id").nextAll(".info_explain_wrap").fadeIn("fast");
							$("#data_login_id").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+result.message+"</span></div>");
							
							loginid_or_emial_flag=false;
							return;
						}else{
							if(result.registerEmail != null && result.registerEmail != ""){
								$("#hidden_Email").val(result.registerEmail);
								$("#acc_name").val(result.acc_name);
								loginid_or_emial_flag=true;
								return;
							}else{
								$("#data_login_id").nextAll(".info_explain_wrap").fadeIn("fast");
								$("#data_login_id").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>您输入的账号不存在，请确认后输入</span></div>");
								
								loginid_or_emial_flag=false;
								return;
							}
						}
						
					};
			 	asyncAjaxMethod(url,params,true,fn);				
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
		}
		
		//密码校验
		else if(id=="new_pwd")
		{
			var pwd1=$(this).val();
			//var error_str="";
			if(pwd1=="")
			{
				error_str="密码不为空";
			}
			else if(pwd1.length<6||pwd1.length>20)
			{
				error_str="请输入6~20位字符";
			}
			else if(!express2.test(pwd1))
			{
				error_str="只允许使用字母、数字、字符等自由组合";
			}
			if(error_str!="")
			{
		
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
				error_str="确认密码不为空";
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
		else if(id=="data_vCode_1")
		{
			if($(this).val()=="")
			{
			error_str="请输入验证码";
			vcode1_flag=false;
			}
			else
			{
				//后端校验
				//验证当前输入的验证码是否正确
				var vcode = $("#data_vCode_1").val();
				var url = "plateFormCommon/vcodeJudge.do";
				var params = {};
				params.vcode = vcode;
				
				var fn = function(data){
							if(data.statu==true){
								vcode1_flag=true;
							}else if(data.statu==false){
								error_str="验证码错误";								
								vcode1_flag=false;
							}
					};
				
				asyncAjaxMethod(url,params,false,fn);
			}
		}
		else if(data_vCode_2)
		{
			if($(this).val()=="")
			{
			error_str="请输入验证码";
			vcode2_flag=false;
			}
			else
			{
			vcode2_flag=true;
			}
		}
		if(error_str!=""){//错误信息显示
			$(this).nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span></div>");
			$(this).nextAll(".info_explain_wrap").fadeIn("fast");
		}
		else
		{
			$(this).nextAll(".info_explain_wrap").fadeOut("fast");
		}
		
	});
	
	
	//url是否有传递参数进来
	var email_param=getQueryString("email");
	var UUID=getQueryString("UUID");
	var acc_name = getQueryString("acc_name");
	
	//通过邮箱中的链接地址加载第二步
	if(!isNullOrEmptyOrUndefined(email_param)&&!isNullOrEmptyOrUndefined(UUID) &&!isNullOrEmptyOrUndefined(acc_name)){
		//步骤条的颜色变化
		$(".stepInfo_wrap").find(".step_index").eq(1).css("background-color","#ff9900");
		$(".step_bar_curr").css("width","400px");
		$(".step_wrap").css("display","none");
		$("#step2").css("display","block");
			
		//通过email和UUID判断页面是否失效
		var urlForCheckValid = "userInfo/checkEmailValid.do";
		var params = {};
		params.UUID = UUID;
		var isasync = false;
		var fn = function(result){
			if(result.total == 0){
				window.wxc.xcConfirm("操作未成功");
			}else if(result.isValid == false){//链接无效
				var return_href = getwebroot() + "/register.html";
				var unvalid_str = "<div class='unvaliable_wrap' style='position:absolute;left:420px;margin-top:50px;'>"
										+"<div class='unvaliable_tip' style='margin-bottom:35px;'><img src='/newresources/images/unvaliable.png'/><span class='unvailable_text' style='margin-left:10px;font-size:20px;'>激活链接已失效</span></div>"
										/* +"<p>你可以请求<a href='javascript:void(0)' onclick='onclickForReg()'>再次发送确认信息</a></p>"
										+"<p>你可以更换邮箱地址<a href='javascript:void(0)' onclick='onclickForReg()'>更换注册邮箱</a></p>" */
									+"</div>";
				$("#step2").html(unvalid_str);
			}
		};
		asyncAjaxMethod(urlForCheckValid,params,isasync,fn);
	}
});
	
//重新发送邮件 mishengliang 2016-03-15
function sendEmailAgain(hidden_Email,verify_code,acc_name){
	var option ={title:"提示",btn:parseInt("0001",2)};
	window.wxc.xcConfirm("重新发送成功", window.wxc.xcConfirm.typeEnum.custom,option);
	
	var url = "userInfo/sendEmailToFindPwd.do";
	var params = {};
	params.acc_name = acc_name;
	params.hidden_Email = hidden_Email;
	params.verify_code = verify_code;
	var isasync = true;
	var fn = function(){
		//无操作，只是发邮件
	};
	
	asyncAjaxMethod(url,params,isasync,fn);
}

//下一步
function goNext(num){
	if(num==2){
		if(!loginid_or_emial_flag){
			$("#data_login_id").blur();
		}else if(!vcode1_flag){
			$("#data_vCode_1").focus();
		}else{
			var acc_name = $("#acc_name").val();
			var hidden_Email=$("#hidden_Email").val();//账号email
			var verify_code=$("#data_vCode_1").val();//验证码
			var email_to_hidden = hideEmail(hidden_Email);//隐藏Email一些信息
			
			var str="<p class='b lh200 fs120 ml80 mt30'><img src='/newresources/images/big-duigou.png' />找回密码的邮件已发送至邮箱 "+email_to_hidden
					+"</p><p class='ml120 lh200'>请登录邮箱，点击相关链接继续完成找回密码，请在1小时内完成操作！</p><p class='p30 t_algin_c'>没有收到？<a class='maincolor' onClick='sendEmailAgain(\""+hidden_Email+"\",\""+verify_code+"\",\""+acc_name+"\")'>重新发送</a></p>";
			$("#step1").html(str);
			
			var url = "userInfo/sendEmailToFindPwd.do";
			var params = {};
			params.acc_name = acc_name;
			params.hidden_Email = hidden_Email;
			params.verify_code = verify_code;
			
			var isasync = true;
			var fn = function(){
				//无操作，只是发送邮件
			};
			asyncAjaxMethod(url,params,isasync,fn);
		}
	}else if(num==3){
		if(!new_pwd_flag){
			$("#new_pwd").focus();
		}else if(!new_pwd2_flag){
			$("#new_pwd2").focus();
		}else if(!vcode2_flag){
			$("#data_vCode_2").focus();
		}else{
			var acc_name = getQueryString("acc_name");
			var email_param=getQueryString("email");
			var UUID=getQueryString("UUID");
			var verify_code = $("#data_vCode_2").val();
			var new_pwd = $("#new_pwd").val();

			var url = "userInfo/updatePwdByFindPwd.do";
			var params = {};
			params.acc_name = acc_name;
			params.UUID = UUID;
			params.email = email_param;
			params.new_pwd = hex_md5(new_pwd);
			params.verify_code = verify_code;
			
			var isasync = true;
			var fn = function(result){
				if(result.total == 1){
					var str="<p class='b lh200 fs120 ml180 mt30'><img src='/newresources/images/big-duigou.png' />密码修改成功，请使用新密码进行登录！</p><p class='lh200' style='margin-left:220px;'><span class='b maincolor' id='time_count' style='margin-left: 35px;'>5</span>秒后自动跳转到登录页！</p>"
							+"<p class='mt10 ml180'><input type='button' class='step_button ' value='返回登录页' onClick='go_redict()' /></p>";
							
					$(".stepInfo_wrap").find(".step_index").eq(2).css("background-color","#ff9900");
					$(".step_bar_curr").css("width","600px");
					$("#step2").html(str);
					timeCount(5);
				}else{
					var option ={title:"提示",btn:parseInt("0001",2)};
			    	window.wxc.xcConfirm(result.message, window.wxc.xcConfirm.typeEnum.custom,option);
				}
			};
			asyncAjaxMethod(url,params,isasync,fn);
		}
	}
}

//隐藏Email一些信息	
function hideEmail(email){
	var hiddenEmail = null;
	if(email != null){
		var emailFront = email.substring(0,email.indexOf("@"));
		var emailBehide = email.substring(email.indexOf("@"),email.length);
		hiddenEmail = emailFront.substring(0,2) + "***" + emailFront.slice(emailFront.length-2,emailFront.length) + emailBehide;
	}
	return hiddenEmail;
}	
	
function go_redict()
{
	window.location.href="/login.html";
}

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
		go_redict();
	}
}
function getNewVCode(num){
		var vcode_img=$("#vCodeImg"+num);
		if(vcode_img){
			vcode_img.attr("src",getwebroot()+"common/getVerifyCode.do?_dc="+new Date().getTime());
		}
	}
	//加载公用部分界面，如头部，底部，左侧菜单等
	function loadCommonPage(){
		$("#top").load(getwebroot()+"platform/top2.html");
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	}
</script>
</head>

<body class="bg_grey">
<div id="top">
</div>
<!--中间-->
<div class="midd_wrap">

		<div class="curr_page_title_wrap">找回密码
			
		</div>
		<!--注册步骤层开始-->
		<div class="div_w600_c">
				<div class="stepBar_wrap">
						<div class="step_bar">
							<div class="step_bar_curr"></div>
						</div>
						<div class="stepInfo_wrap clearfix" >
							<div class="stepInfo_inner">
								<div class="step_index_wrap"><span class="step_index">1</span></div>
								<span class="step_text">填写登录账号</span>
							</div>
							<div class="stepInfo_inner">
								<div class="step_index_wrap"><span class="step_index">2</span></div>
								<span class="step_text">填写新密码</span>
							</div>
							<div class="stepInfo_inner">
								<div class="step_index_wrap"><span class="step_index">3</span></div>
								<span class="step_text">完成修改</span>
							</div>
						
						</div>
				</div>
		</div>
		<!--操作步骤条结束-->
		<div class="middle_div">
		<!--step1开始-->
		<div id="step1" class="step_wrap  ml200" style="display:block">
			<div class="stepinner_wrap ml30 mt20">
				<span class="label_wrap">登录账号</span>
				<div style="display:none;">
					<input type="hidden" id="hidden_Email" name="hidden_Email">
					<input type="hidden" id="acc_name" name="acc_name">
				</div>
				<input class="input_wrap" id="data_login_id" type="text" placeholder="请输入登录名或注册邮箱" />
				<div class="info_explain_wrap"></div>
			</div>
			<div class="stepinner_wrap ml30 mt20">
				<span class="label_wrap">验证码</span>
				<input type="text" class="input_wrap"  width="100" id="data_vCode_1" placeholder="请输入验证码"/>
				<a href="#" title="如看不清楚,请点击图片更换"  class="vcodeImg_wrap" onclick="getNewVCode(1);">
					<img height="40px" width="90px" id="vCodeImg1" src="/common/getVerifyCode.do"/>
					<img src="/newresources/images/new/refresh.png" />
				</a>
				<div class="info_explain_wrap"></div>
			</div>
			<div class="stepinner_wrap ml30 mt20">
				<span class="label_wrap"></span>
				<input type="button" id="step_1" class="step_button" value="下一步" onClick="goNext(2)"/>
			</div>
		</div>
		<!--step1结束-->
		<!--step2开始-->
		<div id="step2" class="step_wrap  ml200" style="display:none">
			<div class="stepinner_wrap ml30 mt20">
				<span class="label_wrap">新密码</span>
				<input type="password" id="new_pwd" class="input_wrap" />
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
				<span class="label_wrap">确认密码</span>
				<input type="password" id="new_pwd2" class="input_wrap" />
				<div class="info_explain_wrap"></div>
				
			</div>
			<div class="stepinner_wrap ml30 mt20">
				<span class="label_wrap">验证码</span>
				<input type="text" class="input_wrap"  width="100" id="data_vCode_2"/>
				<a href="#" title="如看不清楚,请点击图片更换"  class="vcodeImg_wrap" onclick="getNewVCode(2);">
					<img height="40px" width="90px" id="vCodeImg2" src="/common/getVerifyCode.do"/>
					<img src="/newresources/images/new/refresh.png" />
				</a>
				<div class="info_explain_wrap"></div>
			</div>
			<div class="stepinner_wrap ml30 mt20">
				<span class="label_wrap"></span>
				<input type="button" id="update_btn" class="step_button" value="确定修改" onClick="goNext(3)" />
			</div>
		</div><!--step2结束-->
	</div>
</div>
<!--底端-->
<div id="bottom">
</div>
</body>
</html>