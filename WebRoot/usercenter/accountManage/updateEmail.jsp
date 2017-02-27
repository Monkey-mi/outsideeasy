<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>变更邮箱</title>
<link href="/newresources/css/page.css" rel="stylesheet">
<link href="/vip/resources/css/vippage.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" />
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript">
var vcode1_flag=false;
var new_email_flag=false;
var vcode2_flag=false;
var login_flag=false;
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
	//默认第一步的颜色变化
	$(".stepInfo_wrap").find(".step_index").eq(0).css("background-color","#ff9900");
	//初始化placeholder控件
	$("input, textarea").placeholder();	
		
	//提示信息
	$(".input_wrap").on("focus",function(){
		var id=$(this).attr("id");
		var info_str="";
		if(id=="data_new_email")
		{
			//info_str="请输入新邮箱";
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
		if(id=="data_new_email")
		{
			var email=$(this).val();
			if(email=="")
			{
				error_str="请输入新邮箱";
				new_email_flag=false;
			}
			else
			{
				if(email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
				{
				//后台校验
					$.post(getwebroot()+"userInfo/emailIsUsed.do",{
					"email":email
					},function(result){
						if(result.statu==false){
							$("#data_new_email").nextAll(".info_explain_wrap").fadeOut("fast");
							new_email_flag=true;
						}else if(result.statu==true){
							error_str="邮箱已使用";
							$("#data_new_email").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span></div>");
							$("#data_new_email").nextAll(".info_explain_wrap").fadeIn("fast");
							new_email_flag=false;
						}
					});
				}
				else
				{
					error_str="邮箱格式不正确";
					new_email_flag=false;
				}
			}
			
		}
		else if(id=="data_vCode_1")
		{
			if($(this).val()==""){
				vcode1_flag=false;
				error_str="请输入验证码";
			}
			else{
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
								error_str="验证码错误";								
								vcode1_flag=false;
							}
					};
				
				asyncAjaxMethod(url,params,false,fn);
			}
		}
		else if(id=="data_vCode_2")
		{
			if($("#data_vCode_2").val() == "")
			{
				vcode2_flag=false;
				error_str="请输入验证码";
			}
			else
			{
				//后端校验    ***
				//验证当前输入的验证码是否正确
				var vcode = $("#data_vCode_2").val();
				var url = "plateFormCommon/vcodeJudge.do";
				var params = {};
				params.vcode = vcode;
				
				var fn = function(data){
							if(data.statu==true){
								vcode2_flag=true;
							}else if(data.statu==false){
								error_str="验证码错误";						
								vcode2_flag=false;
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
			$(this).nextAll(".info_explain_wrap").css("display","none");//fadeOut("fast");
		}
	});
	initLayout();
});//$(function(){})结束

function goNext(num)
	{
		if(num==2)
		{
			var result = isLoginForPlateForm();
			if(!result.isLogin){//点击下一步前验证登录是否失效
				login_flag = false;
			}
			
			if(!vcode1_flag)
			{
				$("#data_vCode_1").focus();
			}
			else if(!login_flag){
				var option ={title:"提示",btn:parseInt("0001",2)};
		        window.wxc.xcConfirm("请先登录", window.wxc.xcConfirm.typeEnum.custom,option);
			}
			else
			{	
				var verify_code = $("#data_vCode_1").val(); 
				var data_old_email=$("#hidden_Email").val();
				
				//跳转页面提前显示，验证码已在之前同步验证了
				var str="<p class='b lh200 mt30' style='font-size:13px;margin-left:155px;'><img src='/newresources/images/accounManage/pass.png' class='mr5'/>变更邮箱的验证邮件已发送至邮箱 "+data_old_email
						+"</p><p class='ml60 lh200 mt20' ><span style='color:#777;'>请登录邮箱，点击相关链接继续完成变更，请在24小时内完成操作！</span><span class='ml15'>没有收到？</span><a style='color:#0074c2;' onClick='sendEmailAgain(\""+data_old_email+"\",\""+verify_code+"\",0)'>重新发送</a></p>";
				$("#step1").html(str);
				
				var url = "userInfo/sendEmailForUpdateEmail.do";
				var params = {};
				params.email=data_old_email;
				params.verify_code=verify_code;
				var isasync = true;
				var fn = function(result){
					//无操作，只是发送邮件
				};
				asyncAjaxMethod(url,params,isasync,fn);

			}
		}
		else if(num==3)
		{
			if(!new_email_flag){
				$("#data_new_email").focus();
			}else if(!vcode2_flag){
				$("#data_vCode_2").focus();
			}else{//向邮箱中发送认证邮件	
				var UUID=getQueryString("UUID");
				var acc_name=getQueryString("acc_name");
				var email = $("#data_new_email").val();//新的邮箱
				var verify_code = $("#data_vCode_2").val();//验证码
				
				var str="<p class='b lh200 ml120' style='font-size:13px;'><img src='/newresources/images/accounManage/pass.png' class='mr5'/>新邮箱的验证邮件已发送至邮箱"+email+"</p><p class='ml120 lh200 mt20' style='color:#777;'>请登录邮箱，点击相关链接继续完成变更，请在24小时内完成操作！</p>";
				/* <p class='p30 t_algin_c'>没有收到？<a class='maincolor' onClick='sendEmailAgainForNew(\""+email+"\",\""+verify_code+"\",\""+UUID+"\",\""+acc_name+"\")'>重新发送</a></p> */
// 				$(".stepInfo_wrap").find(".step_index").eq(1).css("background-color","#ff9900");
// 				$(".step_bar_curr").css("width","400px");
				$(".stepBarForEmail").find("span").removeClass("curr");
				$(".stepBarForEmail").find(".s2").addClass("curr");
				$(".stepBarForEmail").find("img").prop("src","/newresources/images/accounManage/state3-2.png");
				$("#step2").html(str);
				
				var url = "userInfo/sendNewEmailForUpdateEmail.do";
				var params = {};
				params.email = email;
				params.verify_code = verify_code;
				params.UUID = UUID;
				params.acc_name = acc_name;
				
				var isasync = false;
				var fn = function(result){
					//无操作，只是发送邮件
				};
				asyncAjaxMethod(url,params,isasync,fn);
			}
		}
	}
function go_redict()
{
	window.location.href=getwebroot()+"index.jsp";
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

//初始化页面元素及数据
function initLayout()
{
	//url是否有传递参数进来
	var email_param=getQueryString("email");
	var UUID=getQueryString("UUID");
	var curr_step=getQueryString("step");
	var acc_name=getQueryString("acc_name");
	//通过邮箱中的链接地址加载第二步或第三步
	if(!isNullOrEmptyOrUndefined(email_param)&&!isNullOrEmptyOrUndefined(UUID)&&!isNullOrEmptyOrUndefined(curr_step))
	{
		//显示step2第二步
		if(curr_step=="2")
		{
			//步骤条的颜色变化
// 			$(".stepInfo_wrap").find(".step_index").eq(1).css("background-color","#ff9900");
// 			$(".step_bar_curr").css("width","400px");
			$(".step_wrap").css("display","none");
			$("#step2").css("display","block");
			$(".stepBarForEmail").find("span").removeClass("curr");
			$(".stepBarForEmail").find(".s2").addClass("curr");
			$(".stepBarForEmail").find("img").prop("src","/newresources/images/accounManage/state3-2.png");
			
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
											/*+ "<p>你可以请求<a href='javascript:void(0)' onclick='onclickForReg()'>再次发送确认信息</a></p>"
											+"<p>你可以更换邮箱地址<a href='javascript:void(0)' onclick='onclickForReg()'>更换注册邮箱</a></p>" */
										+"</div>";
					$("#step2").html(unvalid_str);
				}
			};
			asyncAjaxMethod(urlForCheckValid,params,isasync,fn);
		}
		//显示step3第三步
		else if(curr_step=="3")
		{
			//步骤条的颜色变化
// 			$(".stepInfo_wrap").find(".step_index").eq(1).css("background-color","#ff9900");
// 			$(".stepInfo_wrap").find(".step_index").eq(2).css("background-color","#ff9900");
// 			$(".step_bar_curr").css("width","600px");
			$(".step_wrap").css("display","none");
			$("#step3").css("display","block");
			$(".stepBarForEmail").find("span").removeClass("curr");
			$(".stepBarForEmail").find(".s3").addClass("curr");
			$(".stepBarForEmail").find("img").prop("src","/newresources/images/accounManage/state3-3.png");
			
			var url = "userInfo/updateEmail.do";
			var params = {};
			params.email = email_param;
			params.UUID = UUID;
			params.acc_name = acc_name;
			
			var fn = function(result){
				if(result.total == 1){
					var str="<p class='b lh200 fs120 ml80 mt20'><img src='/newresources/images/accounManage/pass.png' class='mr5'/>邮箱修改成功！</p><p class='ml40 lh200 mt20'><span class='b maincolor' id='time_count'>5</span>秒后自动跳转到主页，或点击完成注册回到主页！</p>"
						+"<div class='mt15'><input type='button' class='step_button ml80' value='返回主页' onClick='go_redict()' /></div>";
					$("#step3").html(str);
		
					timeCount(5);
				}else{
				    var return_href = getwebroot() + "/register.html";
					var unvalid_str = "<div class='unvaliable_wrap' style='position:absolute;left:420px;margin-top:50px;'>"
											+"<div class='unvaliable_tip' style='margin-bottom:35px;'><img src='/newresources/images/unvaliable.png'/><span class='unvailable_text' style='margin-left:10px;font-size:20px;'>激活链接已失效</span></div>"
										+"</div>";
					$("#step3").html(unvalid_str);
				}
			};
			asyncAjaxMethod(url,params,true,fn);
		}
	}else{//step1第一步界面元素加载
		//调用后台获取当前用户的注册邮箱，赋值给界面
		var result = isLoginForPlateForm();
		if(result.isLogin == true){
			login_flag = true;
			var account = result.data;
			$("#show_Email").text("您的注册邮箱为："+account.account_email);
			$("#hidden_Email").val(account.account_email);
		}else{
			var option ={title:"提示",btn:parseInt("0001",2)};
         	window.wxc.xcConfirm("您还未登录，请先登录后修改邮箱。", window.wxc.xcConfirm.typeEnum.custom,option);
		}
	}
}

//刷新验证码
function getNewVCode(num){
		var vcode_img=$("#vCodeImg"+num);
		if(vcode_img){
			vcode_img.attr("src",getwebroot()+"common/getVerifyCode.do?_dc="+new Date().getTime());
		}
	}

//重新发送邮件,待完善
function sendEmailAgain(data_email,vcode){
	var option ={title:"提示",btn:parseInt("0001",2)};
	window.wxc.xcConfirm("发送成功", window.wxc.xcConfirm.typeEnum.custom,option);
	
	var url = "userInfo/sendEmailForUpdateEmail.do";
	var params = {};
	params.email = data_email;
	params.verify_code = vcode;
	var isasync = true;
	var fn = function(result){
		//无操作，只是发送邮件
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

//重新发送新邮箱邮件
function sendEmailAgainForNew(data_email,vcode,UUID,acc_name){
	console.log(UUID+":"+acc_name);
	var option ={title:"提示",btn:parseInt("0001",2)};
	window.wxc.xcConfirm("发送成功", window.wxc.xcConfirm.typeEnum.custom,option);
	
	var url = "userInfo/sendNewEmailForUpdateEmail.do";
	var params = {};
	params.email = data_email;
	params.verify_code = vcode;
	params.UUID = UUID;
	params.acc_name = acc_name;
	var isasync = true;
	var fn = function(result){
		//无操作，只是发送邮件
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

//加载公用部分界面，如头部，底部，左侧菜单等
function loadCommonPage(){
	var result = isLoginForPlateForm();
	var isVip=getCookie("isVip");
	if(isVip=="" || isVip=="false"){
		$(".step_wrap").addClass("normalLogin");
	}
	if(result.data != undefined && result.data.vip == true){
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
	
		<div class="curr_page_title_wrap">变更邮箱
			
		</div>
		<!--注册步骤层开始-->
<!-- 		<div class="div_w600_c"> -->
<!-- 			<div class="stepBar_wrap"> -->
<!-- 				<div class="step_bar"> -->
<!-- 					<div class="step_bar_curr"></div> -->
<!-- 				</div> -->
<!-- 				<div class="stepInfo_wrap clearfix" > -->
<!-- 					<div class="stepInfo_inner"> -->
<!-- 						<div class="step_index_wrap"><span class="step_index">1</span></div> -->
<!-- 						<span class="step_text">原邮箱验证</span> -->
<!-- 					</div> -->
<!-- 					<div class="stepInfo_inner"> -->
<!-- 						<div class="step_index_wrap"><span class="step_index">2</span></div> -->
<!-- 						<span class="step_text">填写新邮箱</span> -->
<!-- 					</div> -->
<!-- 					<div class="stepInfo_inner"> -->
<!-- 						<div class="step_index_wrap"><span class="step_index">3</span></div> -->
<!-- 						<span class="step_text">完成变更</span> -->
<!-- 					</div> -->
						
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</div> -->
			<div class="stepBarForEmail" style="text-align:center;margin-top:45px;">
				<div class="stepBarTip"><span class="curr s1">原邮箱验证</span><span class="ml140 s2">填写新邮箱</span><span class="ml145 s3">完成变更</span></div>
				<img class="ml10 mt10" src="/newresources/images/accounManage/state3-1.png">
			</div>
		<!--操作步骤条结束-->
	<div class="middle_div">
		<!--step1开始-->
		<div id="step1" class="step_wrap ml200" style="display:block">
			<div class="stepinner_wrap ml30 mt20">
				<div id="show_Email" class="showtext_wrap"></div>
				<div style="display:none;">
					<input type="hidden" id="hidden_Email" name="hidden_Email">
				</div>
			</div>
			<div class="stepinner_wrap" style="margin-left: 108px;">
				<span class="label_wrap">验证码：</span>
				<input type="text" class="input_wrap"  width="100" id="data_vCode_1" placeholder="请输入验证码"/>
				<a href="#" title="如看不清楚,请点击图片更换"  class="vcodeImg_wrap" onclick="getNewVCode(1);">
					<img height="40px" width="90px" id="vCodeImg1" src="/common/getVerifyCode.do"/>
					<img src="/newresources/images/new/refresh.png" />
				</a>
				<div class="info_explain_wrap"></div>
			</div>
			<div class="stepinner_wrap ml30 mt20">
				<span class="label_wrap"></span>
				<input type="button" id="step_1" style="margin-left:125px;width:120px;" class="step_button" value="下一步" onClick="goNext(2)"/>
			</div>
		</div>
		<!--step1结束-->
		<!--step2开始-->
		<div id="step2" class="step_wrap ml200" style="display:none">
			<div class="stepinner_wrap ml110 mt20">
				<span class="label_wrap">新 邮 箱：</span>
				<input class="input_wrap" id="data_new_email" type="text" placeholder="请输入新邮箱" />
				<div class="info_explain_wrap"></div>
			</div>
			<div class="stepinner_wrap ml110 mt20">
				<span class="label_wrap">验证码：</span>
				<input type="text" class="input_wrap"  width="100" id="data_vCode_2" placeholder="请输入验证码"/>
				<a href="#" title="如看不清楚,请点击图片更换"  class="vcodeImg_wrap" onclick="getNewVCode(2);">
					<img height="40px" width="90px" id="vCodeImg2" src="/common/getVerifyCode.do"/>
					<img src="/newresources/images/new/refresh.png" />
				</a>
				<div class="info_explain_wrap"></div>
			</div>
			<div class="stepinner_wrap ml100 mt20">
				<span class="label_wrap"></span>
				<input type="button" id="step_2" class="step_button" value="下一步" onClick="goNext(3)" style="width:120px;"/>
			</div>
		</div>
		<!--step2结束-->
		<!--step3开始-->
		<div id="step3" class="step_wrap ml375" style="display:none">
		
		</div>
		<!--step3结束-->
	</div>
</div>
<!--底端-->
<div id="bottom">
</div>
</body>
</html>