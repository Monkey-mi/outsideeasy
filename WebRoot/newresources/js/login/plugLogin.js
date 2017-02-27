/*
 * 弹出层方式的登录窗口，可嵌入到每个页面中
 * create by yangliping 2016-8-31 14:09:09
 * 使用例子：window.plugLogin({onOk:function(){}});加回调函数
 *        window.plugLogin();不加回调函数
 * 
 * 
 * */
;$(function($,window,document,undefined){
	window.plugLogin=function(options){
		"use strict";
		
		var logoPic = "/newresources/images/logo/logo_white.png";
		var logoLink = '\'index.jsp\'';
		var closeLogoLink = "/login.html";
		var registLink = '\'/userInfo/register.htm\'';
		var findPwLink = '\'/userInfo/findPwd.htm\'';
		var isVip = getCookie("isVip");
		if(isVip == "true"){//VIP登录 cookie中取出的为String类型
			logoLink = '\'vip\'';//vipLogin
			registLink = '\'/userInfo/vipregister.htm\'';
			findPwLink = '\'/userInfo/vipFindPwd.htm\'';
			logoPic = "/vip/resources/images/login/vipassistor.png";
			closeLogoLink = "/vip";//vipLogin
		}
		var options=$.extend({
			isasync:true,//是否异步
			errorNum:0,//验证码计数器初始值
			submitUrl:"userInfo/doLogin.do",//登录按钮提交方法请求路径
			loginUrl:closeLogoLink,//不同方式的登录，返回的页面不同
			onOk: $.noop//点击确定按钮的回调函数
		},options);
		
		var popId=creatPopId();//设置弹出窗口的索引，防止重复
		var $box=$("<div>").addClass("plug_login");//弹窗插件容器的创建
		var $mask=$("<div>").addClass("pop_mask");//遮罩层
		var $mask2=$("<div>").addClass("pop_mask_2");
		var $popBox=$("<div>").addClass("login_form");//弹窗盒子，居中
		var titleStr='<div class="title_img_wrap f_l">'
			+'<img src='+ logoPic +' style="cursor:pointer;float:left;" onclick="go_redirect('+logoLink+')"/>'
			+'<div class="logo_text f_l"><p class="font1 logo_color">账号登录</p><p class="font2 logo_color">Outsideasy.com</p></div>'
			+'</div>'
			+'<div class="f_l title_right"><span class="bata_span">内测版</span><button class="beta_img">Beta</button></div>';
		var $title=$("<div class='mt20'>").addClass("logo_wrap").html(titleStr);//弹窗盒子头部
		var $closeBtn=$("<a class='mt4'>").addClass("close_btn").text("X");//关闭按钮
		
		var $submitArea=$("<div>").addClass("logininner_wrap");//提交按钮父级层
		var $submitBtn=$("<button>").addClass("login_button").text("登录");//提交按钮
		var hrefStr='<a href='+ registLink +'><span style="font-size:14px;display:none;">VIP</span>&nbsp;注册通道>></a>';
		var $href=$("<div>").addClass("link_a_wrap mt10").html(hrefStr);
		
		//表单部分
		var $name=$("<input>").addClass("input_wrap").attr({"type":"text","placeholder":"请输入邮箱/用户名"});
		var $pwd=$("<input>").addClass("input_wrap").attr({"type":"password","placeholder":"请输入密码"});
		var $clear=$("<img>").addClass("password_icon").attr("src","/newresources/images/login/delete.png");//input框清空按钮
		var $clear2=$("<img>").addClass("password_icon").attr("src","/newresources/images/login/delete.png");//input框清空按钮
		var $userNameWrap=$("<div>").addClass("logininner_wrap mt20").attr("style","position:relative;")
							.append($name).append($("<img>").addClass("input_icon").attr("src","/newresources/images/login/user.png")).append($clear2);
		
		var $passwordWrap=$("<div>").addClass("logininner_wrap mt20").attr("style","position:relative;")
							.append($pwd).append($("<img>").addClass("input_icon").attr("src","/newresources/images/login/lock.png")).append($clear);
		
		var $vCode_change=$("<div>").addClass("logininner_wrap mt20 clearfix").attr("style","display:none");
		var $vCode=$("<input>").addClass("input_vcode");
		var $vCode_A=$("<a>").addClass("vcodeImg_wrap").attr({"href":"javascript:void(0)","title":"如看不清楚,请点击图片更换"});
		var $vCodeImg=$("<img>").attr({"width":"100px","height":"38px","src":"/common/getVerifyCode.do"});
		
		var $error=$("<div>").addClass("reg-explain").attr("style","display:block").text("");
		var $findPwd=$("<div class='f_r mb20'>").append('<a href='+ findPwLink +' style="color:#fff;">忘记密码？</a>');
		var $regularRegister=$("<div class='regularRegister' style='font-size:14px;'>").append('<span style="color:#ff0000;">一般用户：</span><a href="/userInfo/register.htm" style="color:#f1af27">注册通道>></a>');
		
		var loginAccount_flag=false;
		var pwd_flag=false;
		var vcode_flag=true
		
		//初始化
		init();
		function init()
		{
			creatDom();
			bindEvent();
		}
		/**
		 * 创建document
		 */
		function creatDom()
		{
			$popBox.append($mask).append($title).append($closeBtn);//组装标题和关闭按钮
			//登录名
			$popBox.append($userNameWrap);
			//登录密码
			$popBox.append($passwordWrap);
			//验证码
			$vCode_A.append($vCodeImg).append($("<img>").attr("src","/newresources/images/new/refresh.png"));
			$popBox.append($vCode_change.append($vCode).append($vCode_A));
			//错误信息
			$popBox.append($error);
			//找回密码
			$popBox.append($findPwd);
			
			$submitArea.append($submitBtn);
			$popBox.append($submitArea).append($href);//组装提交按钮
			/*$popBox.append($regularRegister);*/
			
			$box.attr("id",popId).append($mask2).append($popBox);
			$("body").append($box);
			$("body").append("<script type='text/javascript' src='/newresources/js/md5.js'></script>");
			$("head").append("<link href='/newresources/css/login.css' rel='stylesheet'>");
		}
		
		
		/**
		 * 绑定事件
		 */
		function bindEvent()
		{
			//获取验证码图片
			$vCode_A.click(getNewVCode);
			//登录提交事件
			$submitBtn.bind("click",function(){doLogin();});
			//登录名文本框鼠标移开事件
			$name.blur(function(){
				var loginAccount=$(this).val();
				if(loginAccount=="")
				{
					$error.html("登录账号不为空");
					loginAccount_flag=false;
				}
				else
				{
					loginAccount_flag=true;
				}
			});
			//密码
			$pwd.blur(function(){
				var data_pwd=$(this).val();
				if(data_pwd=="")
				{
					$error.html("密码不为空");
					pwd_flag=false;
				}
				else
				{
					pwd_flag=true;
				}
			});
			//验证码
			$vCode.blur(function(){
				var data_vcode=$(this).val();
				if(data_vcode=="" && options.errorNum>1)
				{
					$error.html("验证码不为空");
					vcode_flag=false;
				}
				else
				{
					vcode_flag=true;
				}
			});
			//input框内容一键清空
			$clear.click(function(){
				$(this).parent().find(".input_wrap").val("");
			});
			//input框内容一键清空
			$clear2.click(function(){
				$(this).parent().find(".input_wrap").val("");
			});
			
			$closeBtn.click(doClose);
			$box.find("input").bind("keyup",function(event){ if (event.keyCode == "13") {doLogin();}});
		}
		
		/**
		 * 获取新的验证码
		 */
		function getNewVCode(){
			$vCodeImg.attr("src","/common/getVerifyCode.do?_dc="+new Date().getTime());
		}
		
		/**
		 * 登录按钮事件
		 */
		function doLogin(){
			if(!loginAccount_flag&&$name.val()==""){
				$name.focus();
			}
			else if(!pwd_flag&&$pwd.val()==""){
				$pwd.focus();
			}
			else if(!vcode_flag){
				$vCode.focus();
			}
			else{
				var isVipCookie = getCookie("isVip");
				var nameOrEmail = $name.val();
				var pwd = $pwd.val();
				var vCode = $vCode.val();
				var isLogin = 0;
				var url = options.submitUrl;
				var isVip = "isVip";
				
				var params = {};
				params.nameOrEmail=nameOrEmail;//用户名或邮箱
				params.password=hex_md5(pwd);
				params.verify_code=vCode;
				params.errorNum=options.errorNum;
				params.isLogin=isLogin;
 				if(isVipCookie == "true"){//VIP登录 cookie中取出的为String类型
					params.isVip = isVip;
				}
				var fn=function(result){					
					options.errorNum ++;
					if(options.errorNum>=2){
						$vCode_change.attr("style","display:block");
					}
					if(result.emailValid=="true"&&result.success==true){
						doClose();
						parent.location.reload();//刷新父页面
						options.onOk(result);//登录成功后的回调函数，可给父层做额外处理，不处理也行
					}
					else{
						$error.text(result.message);
						
						
					}
				};
				asyncAjaxMethod(url,params,options.isasync,fn);
			}
		}
		 
		
		//关闭按钮事件
		function doClose(){
			$("#" + popId).remove();
			$(window).unbind("keydown");
			parent.location.href=options.loginUrl;
		}
		
		//重生popId,防止id重复
		function creatPopId(){
			var i = "pop_" + (new Date()).getTime()+parseInt(Math.random()*100000);//弹窗索引
			if($("#" + i).length > 0){
				return creatPopId();
			}else{
				return i;
			}
		}
	};
	
}(jQuery,window,document));