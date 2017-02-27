<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>注册页面</title>
<link href="/newresources/css/page.css" rel="stylesheet" />
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
var express = /^[0-9a-zA-Z_\u4e00-\u9fa5]+$/;
var express2= /^([0-9a-zA-Z_]|\W)+$/;
$(function(){
		//设置页面高度
		var height=$(".midd_wrap").height();
		if(height<$(window).height()-175)
		{
			$(".midd_wrap").height($(window).height()-175);
		}
		
		window.onresize=function(){
			$(".midd_wrap").height(600);
			if($(".midd_wrap").height()<$(window).height()-175)
			{
			$(".midd_wrap").height($(window).height()-175);
			}
			$(".show_Agreen_wrap").height($(".midd_wrap").height()-34);
		};
		loadCommonPage();
		var data_email= $.cookie('data_email'); 
		$("#data_email").val(data_email);
		//默认第一步的颜色变化
		$(".stepInfo_wrap").find(".step_index").eq(0).css("background-color","#ff9900");
		//初始化placeholder控件
		$("input, textarea").placeholder();
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
	//提示信息
	$(".input_wrap").on("focus",function(){
		var id=$(this).attr("id");
		var info_str="";
		if(id=="data_email")
		{
			//info_str="请输入注册邮箱";
		}
		else if(id=="data_login_id")
		{
			info_str="请输入5-15位字符，可使用字母、汉字(2个字符)、数字、下划线自由组合<br />用户名一经注册不能更改";
		}
		else if(id=="new_pwd")
		{
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
							$("#data_email").nextAll(".info_explain_wrap").fadeOut("fast");
							email_flag=true;
							return;
						}
						if(result.statu==true){
							error_str="您输入的邮箱已注册，是否<a class='maincolor3' href='/userInfo/findPwd.htm'>忘记密码</a>？";
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
					error_str="您输入的邮箱格式不正确，请重新输入";
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
			var error_str="";
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
							$("#data_login_id").nextAll(".info_explain_wrap").fadeOut("fast");
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
			var error_str="";
			if(pwd1=="")
			{
				error_str="请输入密码";
				pwd_flag=false;
			}
			else if(pwd1.length<6||pwd1.length>20)
			{
				error_str="请输入6~20位";
				pwd_flag=false;
			}
			else if(!express2.test(pwd1))
			{
				error_str="只允许使用字母、数字、字符等自由组合";
				pwd_flag=false;
			}
			else
			{
				pwd_flag=true;
			}
		}
		else if(id=="new_pwd2")
		{
			var pwd1=$("#new_pwd").val();
			var pwd2=$(this).val();
			var error_str="";
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
		else if(id=="data_companyname")
		{
			$(this).nextAll(".info_explain_wrap").css("display","none");
			companyName_flag=true;
			var company_name=$(this).val();
			var error_str="";
			if($.trim(company_name)!=""){
				var url = "userInfo/companyNameIsUsed.do";
				var params = {};
				params.companyName = $.trim(company_name);
				
				var isasync = true;
				var fn = function(result){
					if(result.statu==false){
						$("#data_companyname").nextAll(".info_explain_wrap").fadeOut("fast");
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
			$(this).nextAll(".info_explain_wrap").css("display","none");//fadeOut("fast");
		}
		
	});
	
	//url是否有传递参数进来
	var email_param=getQueryString("email");
	var UUID=getQueryString("UUID");
	
	//通过邮箱中的链接地址加载第二步
	if(!isNullOrEmptyOrUndefined(email_param)&&!isNullOrEmptyOrUndefined(UUID))
	{
		//步骤条的颜色变化  链接是否失效和进度条无关
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
//$(fucntion(){})结束	
});
	
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
					email_tip = "您输入的邮箱格式不正确，请重新输入";
				}else if(email_error_way == 2){//已注册
					email_tip = "您输入的邮箱已注册，是否<a class='maincolor3' href='/userInfo/findPwd.htm'>忘记密码</a>？";
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
		        window.wxc.xcConfirm("你还没有阅读并确认《合作/准入条款说明》", window.wxc.xcConfirm.typeEnum.custom,option);
			}else{
				//跳转需提到方法回调前
				var str="<p class='b lh200 fs120 ml80 mt30'><img src='/newresources/images/big-duigou.png' />验证邮件已发送至邮箱 "+data_email
						+"</p><p class='ml120 lh200'>请登录邮箱，点击'完成'继续完成注册，请在24小时内完成注册！</p><p class='p30 t_algin_c'>没有收到？<a class='maincolor' onClick='sendEmailAgain(\""+data_email+"\",\""+vcode1+"\")'>重新发送</a><a class='maincolor2 ml10' onClick='javascript:location.reload(true)'>修改邮箱</a></p>";
				$("#step1").html(str);
				
				var url="userInfo/sendEmailToRegAccount.do";
				var params={};
				params.email=data_email;
				params.verify_code=vcode1;
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
						var str="<p class='b lh200 fs120 ml80 mt30'><img src='/newresources/images/big-duigou.png' />"+login_id
								+",恭喜你已经成功注册成我们的企业会员！</p><p class='ml120 lh200'><span class='b maincolor' id='time_count'>5</span>秒后自动跳转到主页，或点击完成注册回到主页！</p>"
								+"<div class='mt10 ml100'><input type='button' class='step_button ml80' value='完成注册' onClick='go_index()' /></div>";
						$(".stepInfo_wrap").find(".step_index").eq(2).css("background-color","#ff9900");
						$(".step_bar_curr").css("width","600px");
						$("#step2").html(str);
						login(login_id,pwd1);
						//五秒后自动跳转
						timeCount(5);
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
	var fn=function(result){
	};
	asyncAjaxMethod(url,params,true,fn);
}

function go_index()
{
	window.location.href=getwebroot()+"index.jsp";
}

//计数器,注册完成5秒后自动跳转到主页
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
	$("#top").load(getwebroot()+"platform/top2.html");
	$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
}


</script>
</head>
<body class="bg_grey">
<!--顶端-->
<div id="top">
</div>
<!--中间-->
<div class="midd_wrap">
		<div class="curr_page_title_wrap">账号注册</div>
		<!--注册步骤层开始-->
		<!--操作步骤条开始-->
		<div class="div_w600_c">
				<div class="stepBar_wrap">
						<div class="step_bar">
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
						
						</div>
				</div>
		</div>
		<!--操作步骤条结束-->
		<div class="middle_div">
			<!--step1开始-->
			<div id="step1" class="step_wrap ml260" style="display:block">
					 <div class="stepinner_wrap ml30 mt20">
						<span class="label_wrap">注册邮箱</span>
						<input class="input_wrap" id="data_email" type="text" placeholder="请输入邮箱" style="width:315px;"/>
						<div class="info_explain_wrap"></div>
					</div>
					<div class="stepinner_wrap ml30 mt20">
						<span class="label_wrap">验证码</span>
						<input type="text" class="input_wrap" style="width:210px;" id="data_vCode_1" placeholder="请输入验证码"/>
						<a href="#" title="如看不清楚,请点击图片更换"  class="vcodeImg_wrap" onclick="getNewVCode(1);">
							<img height="40px" width="96px" id="vCodeImg1" src="../common/getVerifyCode.do"/>
							<img src="/newresources/images/new/refresh.png" />
						</a>
						<div class="info_explain_wrap"></div>
					</div>
					<div class="stepinner_wrap ml30 mt20">
						<span class="label_wrap"></span>
						<input type="checkbox" name="IfAgreen" id="check_agreen"  class="input_checkbox" checked="checked"/>我已阅读并确认
						<a href="javascript:void(0)" class="maincolor" title="点击查看条款说明" onClick="window.open('/CommonUse/agreement.htm')">《合作/准入条款说明》</a>
<!-- 						<a class="maincolor" title="点击查看条款说明" onClick="window.open('/CommonUse/accessInfo.htm')">《供应商准入须知》</a> -->
					</div>
					<div class="stepinner_wrap ml30 mt20">
						<span class="label_wrap"></span>
						<input type="button" id="step_1" class="step_button" value="下一步" onClick="goNext(2)"/>
					</div>
		  </div>
		<!--step1结束-->
		<!--step2开始-->
		<div id="step2" class="step_wrap  ml260" style="display:none">
					<div class="stepinner_wrap mt20">
						<span class="label_wrap">用户名</span>
						<input type="text" id="data_login_id" class="input_wrap" />
						<div class="info_explain_wrap"></div>
					</div>
					<div class="stepinner_wrap mt25">
						<span class="label_wrap">登录密码</span>
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
					<div class="stepinner_wrap mt25">
						<span class="label_wrap">确认密码</span>
						<input type="password" id="new_pwd2" class="input_wrap" />
						<div class="info_explain_wrap"></div>
					</div>
					<div class="stepinner_wrap mt25">
						<span class="label_wrap">企业名称</span>
						<input type="text" id="data_companyname" class="input_wrap" size="50" />
						<div class="info_explain_wrap"></div>
					</div>
					<div class="stepinner_wrap mt25">
						<span class="label_wrap"></span>
						<input type="button" id="step_2" class="step_button ml80" value="确认提交" onClick="goNext(3)"/>
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
