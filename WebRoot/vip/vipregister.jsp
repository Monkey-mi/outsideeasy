<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>注册页面</title>
<link href="/vip/resources/css/vippage.css" rel="stylesheet" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" /> 
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<script type="text/javascript" src="/newresources/js/jquery.cookie.js"></script>
<script type="text/javascript" src="/newresources/js/md5.js"></script>
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<script type="text/javascript" src="/newresources/js/json2.js"></script>
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript">
var email_flag=false;
var email_error_way = 0;//0:无错   1：格式错误    2.已注册   3.为空
var vcode1_flag=false;
var login_id_flag=false;
var pwd_flag=false;
var pwd_flag2=false;
var companyName_flag=false;
var phone_num_flag=false;
var phone_ver_flag=false;
var express = /^[0-9a-zA-Z_\u4e00-\u9fa5]+$/;
var express2= /^([0-9a-zA-Z_]|\W)+$/;
//电话正则
var phone_reg= /^1[3|4|5|7|8]\d{9}$/;

$(function(){
	//设置页面高度
	var height=$(".midd_wrap").height();
	if(height<$(window).height()-134)//134
	{
		$(".midd_wrap").height($(window).height()-134);
	}
	
	window.onresize=function(){
		$(".midd_wrap").height(800);
		if($(".midd_wrap").height()<$(window).height()-134)
		{
		$(".midd_wrap").height($(window).height()-134);
		}
		$(".show_Agreen_wrap").height($(".midd_wrap").height()-34);
	};
	loadCommonPage();
	var data_email= $.cookie('data_email'); 
	$("#data_email").val(data_email);
	//默认第一步的颜色变化
	$(".font_tip").find("span").eq(0).css("color","#385f8c");
	$(".font_tip").find("span").eq(0).css("font-weight","bold");
	//初始化placeholder控件
	$("input, textarea").placeholder();
	
	pwdKeyUp();//密码强度校验
	//提示信息
	$(".input_wrap").on("focus",function(){
		var cloumeMoreFlag = 0;//多行提示
		var id=$(this).attr("id");
		var info_str="";
		if(id=="data_email")
		{
			//info_str="请输入注册邮箱";
		}
		else if(id=="data_login_id")
		{
			cloumeMoreFlag = 1;
			info_str="请输入5-15位字符，可使用字母、汉字(2个字符)、数字、下划线自由组合<br />用户名一经注册不能更改";
		}
		else if(id=="new_pwd")
		{
			$("#pwd_level").hide();
			info_str="输入6-20位字符";
		}
		else if(id=="data_companyname")
		{
			info_str="请填写工商局注册的公司全称";
		}
		if(info_str!="")
		{
			$(this).nextAll(".info_explain_wrap").fadeIn("fast");
			var html_str="<div class='info_explain'><img class='info_explain_icon' src='/newresources/images/new/ts1.png' /><span class='info_explain_tip' style='width:200px;'>"+info_str+"</span></div>";
			$(this).nextAll(".info_explain_wrap").html(html_str);
			if(cloumeMoreFlag == 1){
				$(".info_explain .info_explain_tip").css("line-height","22px");
			}else{
				$(".info_explain .info_explain_tip").css("line-height","34px");
			}
		}
	});
	$(".input_wrap").on("blur",function(){
		var id=$(this).attr("id");
		var error_str="";
		//邮箱校验
		if(id=="data_email")
		{
			var email=$(this).val();
			if(email == ""){
				error_str="请输入注册邮箱";
				email_flag=false;
				email_error_way = 3;
			}else{
				if(email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
				{
				//后台校验
					var url = "userInfo/emailIsUsed.do";
					var params = {};
					params.email = email;
					
					var isasync = true;
					var fn = function(result){
						if(result.statu==false){
							//$("#data_email").nextAll(".info_explain_wrap").fadeOut("fast");
							$("#data_email").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/ok.png' /></div>");
							$("#data_email").nextAll(".info_explain_wrap").fadeIn("fast");
							email_flag=true;
							return;
						}
						if(result.statu==true){
							error_str="您的邮箱已注册，<a class='maincolor3' href='/userInfo/vipFindPwd.htm'>忘记密码</a>？";
							$("#data_email").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span></div>");
							$("#data_email").nextAll(".info_explain_wrap").fadeIn("fast");
							email_flag=false;
							email_error_way = 2;
							return;
						}
					};
					asyncAjaxMethod(url,params,isasync,fn);
				}
				else
				{
					error_str="邮箱格式不正确，请重新输入";
					email_flag=false;
					email_error_way = 1;
				}
			}
		}
		//验证码
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
		//用户名校验
		else if(id=="data_login_id")
		{
			var login_id=$(this).val();
			//var error_str="";
			if(login_id=="")
			{
				error_str="请输入用户名";
				login_id_flag=false;
				
			}
			else if(strlen(login_id)<5||strlen(login_id)>15)
			{
				error_str="请输入5~15位字符长度";
				login_id_flag=false;
				
			}
			else if(!express.test(login_id))
			{
				error_str="请使用字母、汉字或数字或下划线组合";
				login_id_flag=false;
				
			}
			else
			{
				//后端校验
				//验证当前用户是否已在数据库中存在 
				var url = "userInfo/nameIsUsed.do";
				var params = {};
				params.userName = login_id;
				
				var isasync = true;
				var fn = function(result){
						if(result.statu==false){
							login_id_flag=true;
							//$("#data_login_id").nextAll(".info_explain_wrap").fadeOut("fast");
							$("#data_login_id").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/ok.png' /></div>");
							$("#data_login_id").nextAll(".info_explain_wrap").fadeIn("fast");
							return;
						}else if(result.statu==true){
							error_str="您输入的账号已被注册，请重新输入";
							login_id_flag=false;
							//考虑到回调函数执行需要时间,所有这里的显示要跟在后面
							$("#data_login_id").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span></div>");
							$("#data_login_id").nextAll(".info_explain_wrap").fadeIn("fast");
							return;
						}
				
				};
				asyncAjaxMethod(url,params,isasync,fn);	
			}
		}else if(id=="new_pwd"){//密码校验
			var pwd1=$(this).val();
			//var error_str="";
			if(pwd1=="")
			{
				error_str="请输入密码";
				pwd_flag=false;
				$("#pwd_level").hide();
			}
			else if(pwd1.length<6||pwd1.length>20)
			{
				error_str="请输入6~20位";
				pwd_flag=false;
				$("#pwd_level").hide();
			}
			else if(!express2.test(pwd1))
			{
				error_str="只允许使用字母、数字、字符等自由组合";
				pwd_flag=false;
				$("#pwd_level").hide();
			}
			else
			{
				pwd_flag=true;
				$("#pwd_level").hide();
				//$("#pwd_level").show();
			}
		}
		else if(id=="new_pwd2")
		{
			var pwd1=$("#new_pwd").val();
			var pwd2=$(this).val();
			//var error_str="";
			if(pwd2=="")
			{
				error_str="请输入确认密码";
				pwd_flag2=false;
			}
			
			else if(pwd1!=pwd2)
			{
				error_str="两次密码输入不相同";
				pwd_flag2=false;
				
			}
			else
			{
			pwd_flag2=true;
			}
		}
		else if(id=="phone_num")
		{
			var phoneNum=$("#phone_num").val();
			//var error_str="";
			if(phoneNum == "")
			{
				error_str="请输入手机号";
				phone_num_flag=false;
			}
			else if(!phone_reg.test($("#phone_num").val()))
			{
				error_str="请输入正确的手机号";
				phone_num_flag=false;
			}
			else if(!hadPhoneNum($("#phone_num").val()))
			{
				error_str="手机号已被注册，请更换手机号";
				phone_num_flag=false;
			}
			else{
				phone_num_flag=true;
			}
		}
		else if(id=="phone_verti_num")
		{
			var phoneVer=$("#phone_verti_num").val();
			//var error_str="";
			if(phoneVer == "")
			{
				error_str="请输入动态码";
				phone_ver_flag=false;
			}
			else{
				//校验验证码是否正确
				var url = "userInfo/checkPhoneVerNum.do";
				var params = {};
				params.validCode = phoneVer;
				
				var fn = function(result){
						if(!result.sameNum){//验证码不匹配
							error_str="动态码不正确";
							phone_ver_flag=false;
						}else if(result.sameNum){//验证码匹配
							phone_ver_flag=true;
						}
				};
				asyncAjaxMethod(url,params,false,fn);	
			}
		}
		else if(id=="data_companyname")
		{
			$(this).nextAll(".info_explain_wrap").css("display","none");
			companyName_flag=true;
			var company_name=$(this).val();
			//var error_str="";
			if($.trim(company_name)!=""){
				var url = "userInfo/companyNameIsUsed.do";
				var params = {};
				params.companyName = $.trim(company_name);
				
				var isasync = true;
				var fn = function(result){
					if(result.statu==false){
						//$("#data_companyname").nextAll(".info_explain_wrap").fadeOut("fast");
						$("#data_companyname").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/ok.png' /></div>");
						$("#data_companyname").nextAll(".info_explain_wrap").fadeIn("fast");
						companyName_flag=true;
						return;
					}
					if(result.statu==true){
						error_str="企业名已被注册";
						companyName_flag=false;
						$("#data_companyname").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span></div>");
						$("#data_companyname").nextAll(".info_explain_wrap").fadeIn("fast");
						return;
					}
				};
				asyncAjaxMethod(url,params,isasync,fn);	
			}else{
				error_str="企业名不能为空";
				companyName_flag=false;
				$("#data_companyname").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span></div>");
				$("#data_companyname").nextAll(".info_explain_wrap").fadeIn("fast");
				return;			
			}
		}
		if(error_str!=""){//错误信息显示
			$(this).nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span></div>");
			$(this).nextAll(".info_explain_wrap").fadeIn("fast");
		}
		else
		{
			$(this).nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/ok.png' /></div>");
			$(this).nextAll(".info_explain_wrap").fadeIn("fast");
			//$(this).nextAll(".info_explain_wrap").css("display","none");//fadeOut("fast");
		}
		
	});
	
	//url是否有传递参数进来
	var email_param=getQueryString("email");
	var UUID=getQueryString("UUID");
	
	//通过邮箱中的链接地址加载第二步
	if(!isNullOrEmptyOrUndefined(email_param)&&!isNullOrEmptyOrUndefined(UUID))
	{
		//步骤条的颜色变化  链接是否失效和进度条无关
		$("#step_banner img").attr("src","/vip/resources/images/register/state3-2.png");
		$(".font_tip").find("span").eq(1).css("color","#385f8c");
		$(".font_tip").find("span").css("font-weight","normal");
		$(".font_tip").find("span").eq(1).css("font-weight","bold");
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
									+"</div>";
				$("#step2").html(unvalid_str);
			}
		};
		asyncAjaxMethod(urlForCheckValid,params,isasync,fn);
	}
//$(fucntion(){})结束	
});

//密码强度校验
function pwdKeyUp(){
	$("#new_pwd").on("keyup",function () {
		if($(this).val().length > 5){
			$(this).nextAll(".info_explain_wrap").css("display","none");
			$(this).nextAll(".pw_reg_explain").css("display","block");
			$("#pwd_level").show();
		}
		if($(this).val().length > 20){
			var pwd20 = $(this).val().substring(0,20);
			$(this).val(pwd20);
		}
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
}
	
	//下一步
	function goNext(num)
	{
		if(num==2)
		{
			var data_email=$("#data_email").val();
			var vcode1=$("#data_vCode_1").val();
			$.cookie('data_email',data_email); 
			$("#data_email").trigger("blur");//触发邮箱输入的失焦操作
			$("#data_vCode_1").trigger("blur");//触发验证码输入的失焦操作
			if(email_flag == false)
			{	
				var email_tip = "";
				if(email_error_way == 1){//格式错误
					email_tip = "邮箱格式不正确，请重新输入";
				}else if(email_error_way == 2){//已注册
					email_tip = "您的邮箱已注册，<a class='maincolor3' href='/userInfo/vipFindPwd.htm'>忘记密码</a>？";
				}else if(email_error_way == 3){//为空
					email_tip = "请输入注册邮箱";
				}
				
				$("#data_email").focus();
				$("#data_email").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+ email_tip +"</span></div>");
				$("#data_email").nextAll(".info_explain_wrap").fadeIn("fast");
			}
			else if(!vcode1_flag)
			{
				if($("#data_vCode_1").val()==""){
					$("#data_vCode_1").focus();
					$("#data_vCode_1").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入验证码</span></div>");
					$("#data_vCode_1").nextAll(".info_explain_wrap").fadeIn("fast");
				}else{
					$("#data_vCode_1").focus();
					$("#data_vCode_1").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>验证码错误</span></div>");
					$("#data_vCode_1").nextAll(".info_explain_wrap").fadeIn("fast");
				}
			}
			else if(!isAgreen()){
				var option ={title:"提示",btn:parseInt("0001",2)};
		        window.wxc.xcConfirm("你还没有阅读并确认《outsideasy服务协议》", window.wxc.xcConfirm.typeEnum.custom,option);
			}else{
				//跳转需提到方法回调前
				var str="<p class='b lh200 fs120 ml280 mt30'><img src='/vip/resources/images/register/bigok.png' class='mr18'/>验证邮件已发送至邮箱 "+data_email+"</p>"
						+"<p class='ml338 lh200' style='font-size:14px'>请登录邮箱，点击'完成'继续完成注册，请在<span class='fb'>24小时</span>内完成注册！</p>"
						+"<p class='p30 t_algin_c'>"
							+"<button class='sendEmailButton vipbgmaincolor' onClick='sendEmailAgain(\""+data_email+"\",\""+vcode1+"\")' style='font-size:14px'>没有收到？重新发送</button>"
							+"<br/><span class='maincolor2 changeEmail' onClick='javascript:location.reload(true)' style='font-size:14px'>更换邮箱</span>"
						+"</p>";
				$("#step1").html(str);
				
				var url="userInfo/sendEmailToRegAccount.do";
				var params={};
				params.email=data_email;
				params.verify_code=vcode1;
				params.isVip="isVip";
				var fn=function(result)
				{
					if(result.message!="success")
					{
						var option={title:"提示"};
						window.wxc.xcConfirm(result.message, window.wxc.xcConfirm.typeEnum.custom,option);
					}
					else
					{
						
					}
				};
				asyncAjaxMethod(url,params,true,fn);
			}
		}
		else if(num==3)
		{
			var login_id=$("#data_login_id").val();
			var pwd1=$("#new_pwd").val();
			var pwd2=$("#new_pwd2").val();
			var phone_num=$("#phone_num").val();
			var company_name=$("#data_companyname").val();
			var email_param=getQueryString("email");
			var UUID=getQueryString("UUID");
		
			if(!login_id_flag||login_id=="")
			{
				if(login_id==""){
					$("#data_login_id").focus();
					$("#data_login_id").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入用户名</span></div>");
					$("#data_login_id").nextAll(".info_explain_wrap").fadeIn("fast");
				}else{
					$("#data_login_id").focus();
					$("#data_login_id").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入5~15位字符长度</span></div>");
					$("#data_login_id").nextAll(".info_explain_wrap").fadeIn("fast");
				}
			}
			else if(!pwd_flag)
			{
			$("#new_pwd").focus();
			}
			else if(!pwd_flag2)
			{
			$("#new_pwd2").focus();
			}
			else if(!companyName_flag){
			$("#data_companyname").focus();
			}
			else if(!phone_num_flag){
			$("#phone_num").focus();
			}
			else if(!phone_ver_flag){
			$("#phone_verti_num").focus();
			}
			else if(isNullOrEmptyOrUndefined(email_param)||isNullOrEmptyOrUndefined(UUID))
			{
				var option ={title:"提示",btn:parseInt("0001",2)};
		        window.wxc.xcConfirm("链接参数不正确", window.wxc.xcConfirm.typeEnum.custom,option);
			}
			else
			{
				var login_id=$("#data_login_id").val();
				//后台添加注册账号方法
				var url="userInfo/applyRegAccount.do";
				var params={};
				params.email=email_param;
				params.UUID=UUID;
				params.company_name=company_name;
				params.acc_name=login_id;
				params.acc_pwd=pwd1;
				params.reg_phone=phone_num;
				
				var fn=function(result){
					if(result.message!="success"){//链接失效 mishengliang
						var return_href = getwebroot() + "/register.html";
						var unvalid_str = "<div class='unvaliable_wrap' style='position:absolute;left:420px;margin-top:50px;'>"
												+"<div class='unvaliable_tip' style='margin-bottom:35px;'><img src='/newresources/images/unvaliable.png'/><span class='unvailable_text' style='margin-left:10px;font-size:20px;'>激活链接已失效</span></div>"
												+"<p>你可以请求<a href='javascript:void(0)' onclick='onclickForReg()'>再次发送确认信息</a></p>"
												+"<p>你可以更换邮箱地址<a href='javascript:void(0)' onclick='onclickForReg()'>更换注册邮箱</a></p>"
											+"</div>";
						$("#step2").html(unvalid_str);
					}else{
						login(login_id,pwd1);//登录
					}
				};
				asyncAjaxMethod(url,params,true,fn);
			}
		}
	}
	
function onclickForReg(){
	window.location.href = getwebroot() + "register.html";
}

function login(login_id,pwd1)
{
	var url="userInfo/doLogin.do";
	var params={};
	params.nameOrEmail=login_id;
	params.password=hex_md5(pwd1);
	params.verify_code= "";
	params.errorNum= 0;
	params.isLogin=1;
	params.isVip="isVip";//表示VIP登录
	var fn=function(result){
		$("#step_banner img").attr("src","/vip/resources/images/register/state3-3.png");
		$(".font_tip").find("span").eq(2).css("color","#385f8c");
		$(".font_tip").find("span").css("font-weight","normal");
		$(".font_tip").find("span").eq(2).css("font-weight","bold");
		var str="<p class='b lh200 fs120 ml180 mt30'><img class='mr10' src='/vip/resources/images/register/bigok.png'/>恭喜你注册成功！</p>"/* "+login_id+" */
				+"<p class='ml230 lh200'>现在你可以填写<span style='font-weight:bold;'>准入资料</span></p>"
				+"<div class='mt80 ml100'><input type='button' class='step_button ml20' value='去填写' onClick='go_index()'/></div>"
				+"<p class='ml200 mt10 lh200'><span class='b maincolor' id='time_count'>10</span>秒后自动跳转到填写页面</p>"
				+"<div class='mt100 ml120'>"
					+"<span>填写准入资料的作用</span></br>"
					+"<span>1.开通平台功能；</span></br>"
					+"<span>2.申请加入泰普森集团的供应商库。</span>"
				+"</div>";
		$(".stepInfo_wrap").find(".step_index").eq(2).css("background-color","#ff9900");
		$(".step_bar_curr").css("width","600px");
		$("#step2").html(str); 
		//10秒自动跳转
		timeCount(10);
	};
	asyncAjaxMethod(url,params,false,fn);
}

function go_index()
{
	window.location.href=getwebroot()+"saleCenterCtrl/saleCenter.htm";
}

//计数器,注册完成10秒后自动跳转到主页
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
		go_index();
	}
}

//是否同意合作条款
function isAgreen(){
	var is_agreen= $("#check_agreen").is(":checked");
	if(is_agreen)
	{
		return true;
	}
	else
	{
		return false;
	}
}
	
function getNewVCode(num){
		var vcode_img=$("#vCodeImg"+num);
		if(vcode_img){
			vcode_img.attr("src",getwebroot()+"common/getVerifyCode.do?_dc="+new Date().getTime());
		}
	}
	
//重新发送邮件	
function sendEmailAgain(data_email,vcode1){
	var url="userInfo/sendEmailToRegAccount.do";
				var params={};
				params.email=data_email;
				params.verify_code=vcode1;
				params.isVip="isVip";
				var fn=function(result)
				{
					if(result.message!="success")
					{
						var option ={title:"提示",btn:parseInt("0001",2)};
		       			window.wxc.xcConfirm(result.message, window.wxc.xcConfirm.typeEnum.custom,option);
					}
					
				};
	asyncAjaxMethod(url,params,true,fn);
}
//加载公用部分界面，如头部，底部，左侧菜单等
function loadCommonPage(){
	$("#top").load(getwebroot()+"vip/platform/vipTopNoLogin.html",null,function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			$(".doregister").css("display","none");
			$(".doregister").next().css("display","none");
			$(".logo_right_wrap").hide();
		}
	});
	$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
}

//计时器
function countDownShow(num){
	c=num;
	$("#get_phone_verti").attr("disabled","disabled");
	$("#get_phone_verti").css("background-color","#c3c5c7");
	$("#get_phone_verti").html(c+"秒");
	c=c-1;
	if(c>=0){
		timeOutFlag = setTimeout("countDownShow(c)",1000);
	}else{
		clearTimeout(timeOutFlag);
		$("#get_phone_verti").removeAttr("disabled");
		$("#get_phone_verti").css("background-color","#365c87");
		$("#get_phone_verti").html("免费获取");
	}
}

//发送短信或邮件
function sendShortMessage(){
	$("#phone_num").trigger("blur");
	if(phone_num_flag){
		var url = "userInfo/sendShortMessage.do";
		var params = {};
		params.phoneNum = $("#phone_num").val();
		params.moduleId = 3;
		
		var isasync = false;
		var fn = function(result){//无操作，只是发送信息
				if(result.resultType != 0){
					$("#get_phone_verti").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+result.message+"</span></div>");
					$("#get_phone_verti").nextAll(".info_explain_wrap").fadeIn("fast");
					phone_ver_flag = false;
				}else{
					phone_ver_flag = true;
					$("#get_phone_verti").nextAll(".info_explain_wrap").fadeOut("fast");
					countDownShow(60);
				}
		};
		asyncAjaxMethod(url,params,isasync,fn);
	}
}

//查看注册电话号是否重复 mishengliang 2016-11-15
function hadPhoneNum(pNum){
	var flag=false;
	var url = "userInfo/hadPhoneNum.do";
	var params = {};
	params.phoneNum = commonTrim(pNum);
	var fn = function(result){//无操作
		if(result.accountList.length > 0){
			flag =  false;
		}else{
			flag =  true;
		}
	};
	asyncAjaxMethod(url,params,false,fn);
	return flag;
}
</script>
</head>
<body class="bg_grey">
<!--顶端-->
<div id="top">
</div>
<!--中间-->
<div class="midd_wrap vip_midd_wrap">
		<div class="curr_page_title_wrap">VIP注册通道</div>
		<!--注册步骤层开始-->
		<!--操作步骤条开始-->
		<div class="div_w680_c">
				<div class="stepBar_wrap">
						<!-- <div class="step_bar">
							<div class="step_bar_curr"></div>
						</div>
						<div class="stepInfo_wrap clearfix" >
							<div class="stepInfo_inner">
								<div class="step_index_wrap"><span class="step_index">1</span></div>
								<span class="step_text">设置登录账号</span>
							</div>
							<div class="stepInfo_inner">
								<div class="step_index_wrap"><span class="step_index">2</span></div>
								<span class="step_text">填写账号信息</span>
							</div>
							<div class="stepInfo_inner">
								<div class="step_index_wrap"><span class="step_index">3</span></div>
								<span class="step_text">完成注册</span>
							</div>
						</div> -->
						<div id="step_banner"><img src="/vip/resources/images/register/state3-1.png"></div>
						<div class="font_tip"><span>填写邮箱</span><span class="mid_font_tip">填写账号信息</span><span>完成</span></div>
				</div>
		</div>
		<!--操作步骤条结束-->
		<div class="vip_middle_div">
			<!--step1开始-->
			<div id="step1" class="step_wrap" style="display:block">
					 <div class="vip_stepinner_wrap ml250 mt20">
						<span class="label_wrap" style="font-size:14px;color:#666;text-align:left;">注册邮箱：</span>
						<input class="input_wrap" id="data_email" type="text" placeholder="请输入您的邮箱" />
						<div class="info_explain_wrap"></div>
					</div>
					<div class="vip_stepinner_wrap ml250">
						<span class="label_wrap" style="font-size:14px;color:#666 ;text-align:left;">验证码：</span>
						<input type="text" class="input_wrap" style="width:250px;" id="data_vCode_1" placeholder="请输入右侧验证码"/>
						<a href="#" title="如看不清楚,请点击图片更换"  class="vcodeImg_wrap" onclick="getNewVCode(1);">
							<img height="44px" width="98px" id="vCodeImg1" src="../../common/getVerifyCode.do"/>
							<img style="margin-left:12px;" src="/vip/resources/images/register/repeat.png" />
						</a>
						<div class="info_explain_wrap"></div>
					</div>
					<div class="vip_stepinner_wrap ml250" style="margin-bottom:40px;">
						<span class="label_wrap"></span>
						<input type="checkbox" name="IfAgreen" id="check_agreen"  class="input_checkbox" checked="checked"/>同意遵守
						<a href="javascript:void(0)" class="vipmaincolor" title="点击查看条款说明" onClick="window.open('/CommonUse/agreement.htm')">《outsideasy服务协议》</a>和
						<!-- <a href="javascript:void(0)" class="vipmaincolor" title="点击查看条款说明" onClick="window.open('/CommonUse/agreement.htm')">《采购中心协议》</a> -->
						<a class="vipmaincolor" title="点击查看条款说明" onClick="window.open('/CommonUse/accessInfo.htm')">《供应商准入须知》</a>
					</div>
					<div class="vip_stepinner_wrap ml250">
						<span class="label_wrap"></span>
						<input type="button" id="step_1" class="step_button" value="下一步" onClick="goNext(2)"/>
					</div>
		  </div>
		<!--step1结束-->
		<!--step2开始-->
		<div id="step2" class="step_wrap  ml250" style="display:none;margin-top:-65px;">
					<div class="vip_stepinner_wrap mt20">
						<span class="label_wrap">用户名：</span>
						<input type="text" id="data_login_id" class="input_wrap" placeholder="请设置用户名"/>
						<div class="info_explain_wrap"></div>
					</div>
					<div class="vip_stepinner_wrap">
						<span class="label_wrap">企业名称：</span>
						<input type="text" id="data_companyname" class="input_wrap" size="50" placeholder="请输入工商局注册的全称"/>
						<div class="info_explain_wrap"></div>
					</div>
					<div class="vip_stepinner_wrap">
						<span class="label_wrap">登录密码：</span>
						<input type="password" id="new_pwd" class="input_wrap" placeholder="请设置登录密码"/>
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
					<div class="vip_stepinner_wrap">
						<span class="label_wrap">确认密码：</span>
						<input type="password" id="new_pwd2" class="input_wrap" placeholder="请再次输入密码"/>
						<div class="info_explain_wrap"></div>
					</div>
					<hr class="phone_hr">
					<div class="vip_stepinner_wrap">
						<span class="label_wrap">绑定手机：</span>
						<input type="text" id="phone_num" class="input_wrap" placeholder="请输入手机号码"/>
						<div class="info_explain_wrap"></div>
					</div>
					<div class="vip_stepinner_wrap" style="margin-bottom:50px;">
						<span class="label_wrap">手机动态码：</span>
						<input type="text" id="phone_verti_num" class="input_wrap" placeholder="请输入接收到的动态码"/>
						<button id="get_phone_verti" class="vipbgmaincolor" onClick="sendShortMessage()">免费获取</button>
						<div class="info_explain_wrap"></div>
					</div>
					<div class="vip_stepinner_wrap">
						<span class="label_wrap"></span>
						<input type="button" id="step_2" class="step_button" value="确认提交" onClick="goNext(3)"/>
					</div>
		</div>
		<!--step2结束-->
		</div>
		<!--注册步骤层结束-->
	</div>
<!--底端-->
<div id="bottom">
</div>
</body>
</html>
