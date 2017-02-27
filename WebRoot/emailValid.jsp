<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>邮箱验证</title>
<link href="/newresources/css/page.css" rel="stylesheet" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" /> 
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<script type="text/javascript" src="/newresources/js/json2.js"></script>
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript">
var email_flag=true;
var vcode1_flag=false;
var login_id_flag=false;
var pwd_flag=false;
var pwd_flag2=false;
var companyName_flag=false;
var express = /^[0-9a-zA-Z_]+$/;
var express2= /^[0-9a-zA-Z_]|\W+$/;
var regIdAndEmail = getParamFromWindowName("regIdAndEmail");
var regIdParam = getparam("regId",regIdAndEmail);
var emailParam = getparam("email",regIdAndEmail);

//获取指定属性的值   格式 regId=40&email=mishengliang@live.com
function getparam(param,params){
	var paramValue = "";
	var paramList = params.split("&");
	for(var p in paramList){
		if(paramList[p].indexOf(param) != -1){
			paramValue = paramList[p].substring(paramList[p].indexOf("=")+1,paramList[p].length);
		}
	}
	return paramValue;
}

$(function(){
		if(emailParam == "null"){//邮箱为null时，将值设为空字符串
			emailParam = "";
		}
		$("#data_email").val(emailParam);
		//设置页面高度
		var height=$(".midd_wrap").height();
		if(height<$(window).height()-175){
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
	
	$(".input_wrap").on("blur",function(){
		var id=$(this).attr("id");
		var error_str="";
		//邮箱校验
		if(id=="data_email")
		{
			var email=$(this).val();
			if(email=="")
			{
				error_str="请输入注册邮箱";
				email_flag=false;
			}
			else
			{
				if(email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
				{
				//后台校验
					$.post("userInfo/emailIsUsed.do",{
					"email":email
					},function(data){
						var data = JSON.parse(data);
						if(data.statu==false){
							$("#data_email").nextAll(".info_explain_wrap").fadeOut("fast");
							email_flag=true;
							return;
						}
						if(data.statu==true && data.accountList[0].reg_id != regIdParam){//判断是否为同一条数据，不是则为其它用户注册，是则为修改数据
								error_str="您输入的邮箱其他用户已注册";
								
								$("#data_email").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span></div>");
								$("#data_email").nextAll(".info_explain_wrap").fadeIn("fast");
								email_flag=false;
								return;
						}
					});
				}
				else
				{
					error_str="您输入的邮箱格式不正确，请重新输入";
					email_flag=false;
					
				}
			}
			
		}
		//验证码
		else if(id=="data_vCode_1")
		{
			if($(this).val()==""){
				error_str="请输入验证码";
				vcode1_flag=false;
			}else{
				//后端校验    ***
				//验证当前输入的验证码是否正确
				var vcode = $("#data_vCode_1").val();
				var url = "plateFormCommon/vcodeJudge.do";
				var params = {};
				params.vcode = vcode;
				
				var fn = function(data){
							if(data.statu==true){
								vcode1_flag=true;
							}else if(data.statu==false){
								error_str="请输入验证码";
								vcode1_flag=false;
							}
					};
				
				asyncAjaxMethod(url,params,false,fn);
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
	var regId=getQueryString("idForReg");
	
	//通过邮箱中的链接地址加载第二步
	if(!isNullOrEmptyOrUndefined(email_param)&&!isNullOrEmptyOrUndefined(UUID)){
		
			var url="userInfo/isOutTimeEmail.do";
			var params={};
			params.UUID=UUID;
			params.email = email_param;
			params.regId = regId;
			
			var fn=function(result)
			{
				if(result.message == "success")
				{
					$(".step_bar_curr").css("width","400px");
					$(".step_wrap").css("display","none");
					
					$(".stepInfo_wrap").find(".step_index").eq(1).css("background-color","#ff9900");//进度条展示
					var str="<p class='b lh200 fs120 ml80 mt30'><img src='/newresources/images/big-duigou.png' />"
						+"恭喜你已经成功注册成我们的企业会员！</p><p class='ml120 lh200'><span class='b maincolor' id='time_count'>5</span>秒后自动跳转到主页，或点击完成注册回到主页！</p>"
						+"<div class='mt10 ml100'><input type='button' class='step_button ml80' value='完成注册' onClick='go_index()' /></div>";
					$(".stepInfo_wrap").find(".step_index").eq(1).css("background-color","#ff9900");
					$(".step_bar_curr").css("width","600px");
					$("#step2").html(str);
					$("#step2").css("display","block");
					//五秒后自动跳转
					timeCount(5);
				}
				else
				{
					$(".step_bar_curr").css("width","400px");
					$(".step_wrap").css("display","none");
					
					$(".stepInfo_wrap").find(".step_index").eq(1).css("background-color","#ff9900");//进度条展示
					var unvalid_str = "<div class='unvaliable_wrap' style='position:absolute;left:420px;margin-top:50px;'>"
											+"<div class='unvaliable_tip' style='margin-bottom:35px;'><img src='/newresources/images/unvaliable.png'/><span class='unvailable_text' style='margin-left:10px;font-size:20px;'>激活链接已失效</span></div>"
											+"<p>你可以请求<a href="+ onclickForReg() +">再次发送确认信息</a></p>"
											+"<p>你可以更换邮箱地址<a href="+ onclickForReg() +">更换注册邮箱</a></p>"
										+"</div>"; 
					$("#step2").html(unvalid_str);
					$("#step2").css("display","block");
				}
			};
			
			asyncAjaxMethod(url,params,true,fn);
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
			if(!email_flag)
			{
				$("#data_email").focus();
				$("#data_email").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入注册邮箱</span></div>");
				$("#data_email").nextAll(".info_explain_wrap").fadeIn("fast");
			}
			else if(!vcode1_flag){
				$("#data_vCode_1").focus();
				$("#data_vCode_1").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入验证码</span></div>");
				$("#data_vCode_1").nextAll(".info_explain_wrap").fadeIn("fast");
			}
			else if(!isAgreen())
			{
				  var txt=  "你还没有阅读并确认《合作/准入条款说明》";
				  var option = {
				  	hasTitle:false,
				  	title: "",
				  	btn:"确定"
				  };
				  window.wxc.xcConfirm(txt, "custom", option);
			}else{
				//TODO跳转需提到方法回调前
				var str="<p class='b lh200 fs120 ml80 mt30'><img src='/newresources/images/big-duigou.png' />验证邮件已发送至邮箱 "+data_email
						+"</p><p class='ml120 lh200'>请登录邮箱，点击'下一步'继续完成邮箱验证，请在24小时内完成注册！</p><p class='p30 t_algin_c'>没有收到？<a class='maincolor' onClick='sendEmailAgain(\""+data_email+"\",\""+vcode1+"\")'>重新发送</a><a class='maincolor2 ml10' onClick='javascript:location.reload(true)'>更换邮箱</a></p>";
				$("#step1").html(str);
			
				var url="userInfo/sendEmailToRegAccount.do";
				var params={};
				params.email=data_email;
				params.regId=regIdParam;
				params.verify_code=vcode1;
				params.urlLink="/userInfo/emailValid.htm";
			
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
	}
	
	function onclickForReg(){
		return getwebroot() + "userInfo/emailValid.htm";
	}
	
	function go_index()
	{
		window.location.href=getwebroot()+"index.jsp";
	}
		function go_login()
	{
		window.location.href=getwebroot()+"vip";/* vipLogin */
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
				vcode_img.attr("src","common/getVerifyCode.do?_dc="+new Date().getTime());
			}
		}
		
	//重新发送邮件	
	function sendEmailAgain(data_email,vcode1)
	{
		
		var url="userInfo/sendEmailToRegAccount.do";
					var params={};
					params.email=data_email;
					params.verify_code=vcode1;
					var fn=function(result)
					{
						if(result.message!="success")
						{
							alert(result.message);
						}
					};
		asyncAjaxMethod(url,params,true,fn);
	}
	
	//加载公用部分界面，如头部，底部，左侧菜单等
	function loadCommonPage(){
		var param=getUrlParam("vip");
		if(param!=null && param==1){
			var con='<div class="top_logon_wrap" style="background:url(/vip/resources/images/topbg.png);height:70px;line-height:70px;">'
			+'<div class="div_1024_c_wrap"><div class="f_l"><img src="/newresources/images/logo/logo_main.png" style="cursor:pointer" onclick="go_login()" />'
			+'</div><div class="f_r"><a class="maincolor3 mr10" href="/vip">登录</a></div></div></div>';/* vipLogin */
			$("#top").html(con);
			$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		}else{
			var con='<div class="top_logon_wrap"><div class="div_1024_c_wrap"><div class="f_l">'
					+'<img src="/newresources/images/logo/logo_main.png" style="cursor:pointer" onclick="go_redirect(index.jsp)" />'
					+'</div><div class="f_r"><a class="maincolor3 mr10" href="/login.html">登录</a><a class="white_color" href="/index.jsp">返回首页</a></div></div></div>';
			$("#top").html(con);
			$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		}
		//$("#top").load(getwebroot()+"platform/top.html");
	}
	function getUrlParam(name){  
	    //构造一个含有目标参数的正则表达式对象  
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
	    //匹配目标参数  
	    var r = window.location.search.substr(1).match(reg);  
	    //返回参数值  
	    if (r!=null) return unescape(r[2]);  
	    return null;  
	} 
</script>
</head>
<body class="bg_grey">
<!--顶端-->
<div id="top"></div>
<!--中间-->
<div class="midd_wrap">
		<div class="curr_page_title_wrap">邮箱验证
		</div>
		<!--注册步骤层开始-->
		<!--操作步骤条开始-->
		<div class="div_w400_c">
				<div class="stepBar_wrap">
						<div class="step_bar">
							<div class="step_bar_curr"></div>
						</div>
						<div class="stepInfo_wrap clearfix" >
							<div class="stepInfo_inner">
								<div class="step_index_wrap"><span class="step_index">1</span></div>
								<span class="step_text">填写认证邮箱</span>
							</div>
							<div class="stepInfo_inner">
								<div class="step_index_wrap"><span class="step_index">2</span></div>
								<span class="step_text">完成认证</span>
							</div>
						</div>
				</div>
		</div>
		<!--操作步骤条结束-->
		<div class="middle_div">
			
			<!--step1开始-->
			<div id="step1" class="step_wrap ml200" style="display:block">
				 <div class="email_valid_tip">请您完成邮箱验证，再登录平台</div>
				 <div class="stepinner_wrap ml30 mt20">
					<span class="label_wrap">注册邮箱</span>
					<input class="input_wrap" id="data_email" type="text" placeholder="请输入邮箱" />
					<div class="info_explain_wrap"></div>
				</div>
				<div class="stepinner_wrap ml30">
					<span class="label_wrap">验证码</span>
					<input type="text" class="input_wrap" style="width:170px;" id="data_vCode_1" placeholder="请输入验证码"/>
					<a href="#" title="如看不清楚,请点击图片更换"  class="vcodeImg_wrap" onclick="getNewVCode(1);">
						<img height="40px" width="96px" id="vCodeImg1" src="/common/getVerifyCode.do"/>
						<img src="/newresources/images/new/refresh.png" />
					</a>
					<div class="info_explain_wrap"></div>
				</div>
				<div class="stepinner_wrap ml30">
					<span class="label_wrap"></span>
					<input type="checkbox" name="IfAgreen" id="check_agreen"  class="input_checkbox" checked="checked"/>我已阅读并确认
					<a href="javascript:void(0)" class="maincolor" title="点击查看条款说明" onClick="window.open('/CommonUse/agreement.htm')">《合作/准入条款说明》</a>
				</div>
				<div class="stepinner_wrap ml30">
					<span class="label_wrap"></span>
					<input type="button" id="step_1" class="step_button" value="下一步" onClick="goNext(2)"/>
				</div>
		  </div>
		<!--step1结束-->
		<!--step2开始-->
		<div id="step2" class="step_wrap  ml200" style="display:none"></div>
		<!--step2结束-->
		</div>
		<!--注册步骤层结束-->
		
	</div>

<!--底端-->
<div id="bottom">
</div>
</body>
</html>
