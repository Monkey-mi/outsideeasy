<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<% 
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<c:set var="contextPath" value="<%=path%>"></c:set>
<c:set var="basePath" value="<%=basePath%>"></c:set>
<!DOCTYPE html>
<html>
<title>首页</title>
<link href="/newresources/css/home.css" rel="stylesheet" />
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<script type="text/javascript" src="/newresources/js/md5.js"></script>
<script type="text/javascript" src="/common/getJSGlobalVars.do"></script>
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->

<script type="text/javascript">
		var isLoginPage = false; 
		
	$(function(){
		var errorNum = 0;//输入错误的次数  mishengliang 2016-03-04
		var height=$('.home_midd').height();//设置高度
		
		if(height<$(window).height()-50)
		{
		$('.home_midd').height($(window).height()-50);
		}
		
		window.onresize=function(){
		
		$('.home_midd').height(700);
		if($('.home_midd').height()<$(window).height()-50)
		{
			$('.home_midd').height($(window).height()-50);
		}
		};
		
		$('#nav_black').height($('#nav_div').height());
		//显示/隐藏更多导航功能块
		$(".nav_more a").bind("click",function(th){
			
			var height=$('#nav_item').height();
			
			if(height<=400)
			{
				$('#nav_item').css("overflow","visible");
				$('#nav_item').css("height","auto");
				$(".nav_more a").text("隐藏更多");
				$('#nav_black').height($('#nav_div').height());
				if($('.home_midd').height()<$('.home_midd_con').height()+100)
				{
				$('.home_midd').height($('.home_midd_con').height()+100);
				}
			}
			else
			{
				$('#nav_item').css("overflow","hidden");
				$('#nav_item').height(400);
				$(".nav_more a").text("显示更多");
				$('#nav_black').height($('#nav_div').height());
			}
		});
		//登录
		$("#doLoginIn").click(function(){
 		$("body").append("<div id='mask'></div>");
			$("#mask").addClass("mask").fadeIn("slow");
			$("#LoginBox").fadeIn();
			//$(".main-entry").css({ display: 'none' });
			
			//mishengliang 将验证码设置为不显示
			$("#vCode_change").css({display:'none'});
			//设置是否为登录页面标记位为true
			isLoginPage = true;
  		});

		//关闭
		$(".close_btn").hover(function () { 
			$(this).css({ color: '#fff' }); 
		}, function () { 
			$(this).css({ color: '#666' });
		}).on('click', function () {
			$("#LoginBox").fadeOut("fast");
			$("#mask").css({ display: 'none' });
			//$(".main-entry").css({ display: 'block' });
		});
		//按钮的透明度
		/*
		$("#loginbtn").hover(function () {
			
			$(this).stop().animate({
				opacity: '1'
			}, 600);
			
			
		}, function () {
			$(this).stop().animate({
				opacity: '0.8'
			}, 1000);
			
		});
		*/
		//登录按钮
		$("#loginbtn").mouseenter(function () {
			$(this).css("cursor","pointer");
			$(this).css({background:'#feb401'}
			);
		});
		$("#loginbtn").mouseleave(function () {
			$(this).css({background:'#ff9900'}
			);
		});
		$("#loginbtn").click(function(){
			var acc_name=$("#data_login_id").val();
			var pwd=$("#data_pwd").val();
			var vCode=$("#data_vCode").val();
			var isVCode=true;
			
			if(acc_name == "" || acc_name == undefined || acc_name == null)
			{
				$("#warn").css({ display: 'block' });
				return;
				
			}
			if (pwd == "" || pwd == undefined || pwd == null) {
				$("#warn2").css({ display: 'block' });
				return;
			}
			if (isVCode&&(vCode == "" || vCode == undefined || vCode == null)&&errorNum >= 3) {
				$("#warn3").css({ display: 'block' });
				return;
			}
			else 
			{
			
			/**登陆*/		
			$.ajax({
			   type: "POST",
			   url: getwebroot()+"userInfo/doLogin.do",
			   dataType:'json',
			   data: {
			     acc_name: acc_name,
				 password: hex_md5(pwd),
				 verify_code: vCode,
				 errorNum:errorNum
			    },
			   success: function(result){
			   
			     	var str = "";
			    	if(result.ajaxErrorCode!=200){
			    		alert('发生错误，代码：'+result.ajaxErrorCode);
			    		getNewVCode();
			    	}else{
			    		//alert('success');
			    		
			    		if(result.loginName==""||result.loginName==undefined||result.loginName==null)
			    		{	
			    			errorNum ++;
			    			alert(result.message);
			    			if(errorNum >= 2){//mishengliang 在第二次错误之后显示出验证码校验框 2016-03-04
			    				$(".shadeDiv").css({height:296});
			    				$("#vCode_change").css({display:'block'});
			    			}
			    			return;
			    		}
			    		else
			    		{
			    			$("#LoginBox").fadeOut("fast");
							$("#mask").css({ display: 'none' });
							$(".dologin").css({display:'none'});
							$(".haslogin").css({display:'block'});
							$("#loginName_span").text(result.loginName);
						}
			    	}
			   },
			    error: function (XMLHttpRequest, textStatus, errorThrown) {
	                 alert(
	                 	"错误状态码："+XMLHttpRequest.status+";<br/>"
	                 	+"请求状态码："+XMLHttpRequest.readyState+";<br/>"
	                 	+"错误类别："+textStatus
	                 	);
	            } 
	            
			});
			}
		});
		
		//文本框不允许为空---单个文本触发
		$("#data_login_id").on('blur', function () {
			var login_id = $("#data_login_id").val();
			if (login_id == "" || login_id == undefined || login_id == null) {
				$("#warn").css({ display: 'block' });
			}
			else {
				$("#warn").css({ display: 'none' });
			}
		});
		$("#data_login_id").on('focus', function () {
			$("#warn").css({ display: 'none' });
		});
		//密码框
		$("#data_pwd").on('blur', function () {
			var pwd = $("#data_pwd").val();
			if (pwd == "" || pwd == undefined || pwd == null) {
				$("#warn2").css({ display: 'block' });
			}
			else {
				$("#warn2").css({ display: 'none' });
			}
		});
		$("#data_pwd").on('focus', function () {
			$("#warn2").css({ display: 'none' });
		});
		//验证码
		$("#data_vCode").on('blur', function () {
			var vCode = $("#data_vCode").val();
			if (vCode == "" || vCode == undefined || vCode == null) {
				$("#warn3").css({ display: 'block' });
			}
			else {
				$("#warn3").css({ display: 'none' });
			}
		});
		$("#data_vCode").on('focus', function () {
			$("#warn3").css({ display: 'none' });
		});
		
		//搜索框为空时设置提示信息
		$("#search_text").val("多个搜索条件请用空格隔开,最多只允许三个搜索条件");
		$("#search_text").addClass("empty_text");
		
		$("#search_text").bind("focus",function(){
			$("#search_text").val("");
			$("#search_text").removeClass("empty_text");
		});
		$("#search_text").bind("blur",function(){
			var search_text=$("#search_text").val();
			if(search_text=="")
			{
			$("#search_text").val("多个搜索条件请用空格隔开,最多只允许三个搜索条件");
			$("#search_text").addClass("empty_text");
			}
		});
		
		//获取登录信息，判断当前是否已登录
		var result= isLoginForPlateForm();
		if(result.isLogin)
		{
			$(".dologin").css({display:'none'});
			$(".haslogin").css({display:'block'});
			$("#loginName_span").text(result.data.login_id);
		}
		
		
	});
	
	//点击Enter键触发doCompanySearch搜索  mishengliang 2016-03-04
	$(function () {
        $("input").keyup(function (event){
        
            if (event.keyCode == "13") {
            	if (isLoginPage == false) {//通过标记位来记录Enter键触发的事件
					$("#companySearch").click();
				} else {
					$("#loginbtn").click();
				}
                return;
            }
        });
    }); 
	
	function doLoginOut(){
			if(confirm("是否确定注销当前账号！"))
			{
				var _loginId=$("#loginName_span").text();
				$.ajax({
					type: "POST",
					url: getwebroot()+"common/Users/doLogout.do",
					dataType:'json',
					data: {login_id: _loginId},
					success: function(result){
					
						if(result.success)
						{
							$(".dologin").css({display:'block'});
							$(".haslogin").css({display:'none'});
							$("#loginName_span").text("");
							$("#data_pwd").val("");
							$("#data_vCode").val("");
							location.reload(true);//从服务端取最新的页面
						}
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
	                 alert(
	                 	"错误状态码："+XMLHttpRequest.status+";<br/>"
	                 	+"请求状态码："+XMLHttpRequest.readyState+";<br/>"
	                 	+"错误类别："+textStatus
	                 	);
	            	} 
				});
				return true;
			}
			else
				return false;
		}
		
		//搜索按钮事件
	function doCompanySearch(){
		
		var search_text=$.trim($("#search_text").val());
		
		if(search_text!=""&&search_text!="多个搜索条件请用空格隔开,最多只允许三个搜索条件")
		{
			window.open("showMap.html?searchKey="+escape(search_text));
		}
		else
		{
			alert("请输入检索信息！");
		}
	}
</script>
</head>

<body>
<div>
	<!--顶部-->
	<div class="home_top">
		<div class="home_top_right">
		<!-- 
		<a href="javascript:void(0)" id="doLoginIn">登录</a> | <a>注册</a> 
		-->
			<div class="dologin">
				<a href="javascript:void(0)" id="doLoginIn">登录</a>
			</div>
			<div class="haslogin">
				<span id="loginName_span"></span>
				<a href="javascript:void(0)" id="doLoginout" onclick="return doLoginOut();">注销</a>
			</div>
			<div class="doregister">| <a href="register.html">注册</a></div>
		</div>
	</div>
	<!--中间-->
	<div class="home_midd ">
		
		<div class="home_midd_con">
			<div class="home_midd_search">
				<img src="/newresources/images/logo.png" width="239" height="37" />
				<input id="search_text" class="search_text" type="text" /><input type="button" value="" id="companySearch" class="search_btn"  onclick="doCompanySearch()" />
			</div>
			
			<div id="nav_div" class="nav_div clearfix" >
				<div id="nav_black" ></div>
				<div class="nav_div_title">我的服务</div>
				<div id="nav_item" class="nav_item clearfix">
					<div class="nav_item_block" onclick="gotoSubAccount()">
						<figure>
							<img src="/newresources/images/home/tb1.png" width="64" height="64" />
							<figcaption>
								子账号
							</figcaption>
						</figure>
					</div>
					<div class="nav_item_block" onclick="gotowxcf()">
						<figure >
							<img src="/newresources/images/home/tb2.png" width="64" height="64" />
							<figcaption>
								车缝工厂
							</figcaption>
						</figure>
					</div>					
					<div class="nav_item_block">
						<figure>
							<img src="/newresources/images/home/tb3.png" width="64" height="64" />
							<figcaption>
								包袋公司
							</figcaption>
						</figure>
					</div>
					<div class="nav_item_block">
						<figure>
							<img src="/newresources/images/home/tb4.png" width="64" height="64" />
							<figcaption>
								国内渠道订货
							</figcaption>
						</figure>
					</div>
					<div class="nav_item_block">
						<figure>
							<img src="/newresources/images/home/tb5.png" width="64" height="64" />
							<figcaption>
								管材供应
							</figcaption>
						</figure>
					</div>
					<div class="nav_item_block">
						<figure>
							<img src="/newresources/images/home/tb6.png" width="64" height="64" />
							<figcaption>
								五金工厂
							</figcaption>
						</figure>
					</div>
					<div class="nav_item_block">
						<figure>
							<img src="/newresources/images/home/tb7.png" width="64" height="64" />
							<figcaption>
								家具公司
							</figcaption>
						</figure>
					</div>
					<div class="nav_item_block">
						<figure>
							<img src="/newresources/images/home/tb8.png" width="64" height="64" />
							<figcaption>
								美国西域订货
							</figcaption>
						</figure>
					</div>
					<div class="nav_item_block">
						<figure>
							<img src="/newresources/images/home/tb9.png" width="64" height="64" />
							<figcaption>
								耗材供应
							</figcaption>
						</figure>
					</div>
					<div class="nav_item_block">
						<figure>
							<img src="/newresources/images/home/tb10.png" width="64" height="64" />
							<figcaption>
								附件工厂
							</figcaption>
						</figure>
					</div>
					<div class="nav_item_block">
						<figure>
							<img src="/newresources/images/home/tb11.png" width="64" height="64" />
							<figcaption>
								帐篷公司
							</figcaption>
						</figure>
					</div>
					<div class="nav_item_block">
						<figure>
							<img src="/newresources/images/home/tb12.png" width="64" height="64" />
							<figcaption>
								欧洲西域订货
							</figcaption>
						</figure>
					</div>
					<div class="nav_item_block">
						<figure>
							<img src="/newresources/images/home/tb13.png" width="64" height="64" />
							<figcaption>
								供应商认证
							</figcaption>
						</figure>
					</div>
					<div class="nav_item_block">
						<figure>
							<img src="/newresources/images/home/tb14.png" width="64" height="64" />
							<figcaption>
								工厂认证
							</figcaption>
						</figure>
					</div>
					<div class="nav_item_block">
						<figure>
							<img src="/newresources/images/home/tb15.png" width="64" height="64" />
							<figcaption>
								OEM认证
							</figcaption>
						</figure>
					</div>
					<div class="nav_item_block">
						<figure>
							<img src="/newresources/images/home/tb16.png" width="64" height="64" />
							<figcaption>
								金融服务
							</figcaption>
						</figure>
					</div>
					
				</div>
				<div class="nav_more"><img src="/newresources/images/home/more.png"  /> <a>查看更多</a></div>
			</div>
		</div>
		
		<div class="home_midd_black">
			<div class="items">
                <div class="item"
                     style="background-image:url(/newresources/images/home/homeback1.jpg)"></div>
                <div class="item"
                     style="background-image:url(/newresources/images/home/homeback2.jpg)"></div>
                <div class="item"
                     style="background-image:url(/newresources/images/home/homeback4.jpg)"></div>
            </div>
		</div>
	</div>
	<!--底部-->
	<div class="home_bottom">
		Copyright 2015 topsun all rights reserved 浙江泰普森（控股）集团版权所有 浙ICP备09032301号-1
	</div>
	<!--登录框-->
	<div id="LoginBox" >
		<div class="shadeDiv"></div>
		<a href="javascript:void(0)" title="关闭窗口" class="close_btn" id="closeBtn">×</a>
        <div class="titlediv">登 录 账 户</div>
        <div id="login_form">
			
			<table class="login_table">
				<tr>
					<td>
						<img src="/newresources/images/home/login.png" width="36" height="36" />
						<input id="data_login_id" type="text" tabindex="1" class="login_input" />
					</td>
					<td width="14"><a href="javascript:void(0)" title="用户名不为空" class="warning" id="warn">*</a></td>
				</tr>
				<tr>
					<td>
						<img src="/newresources/images/home/pass.png" width="36" height="36" />
						<input id="data_pwd" type="password" tabindex="2" class="login_input" />
					</td>
					<td><a href="javascript:void(0)" title="密码不为空" class="warning" id="warn2">*</a></td>
				</tr>
				<!-- mishengliang -->
 				<tr id="vCode_change">
					<td>
						<input id="data_vCode" type="text" tabindex="3" class="login_vcode" />
						<a href="#" title="如看不清楚,请点击图片更换" onclick="getNewVCode();">
						<img height="34px" width="80px" id="vCodeImg" src="common/getVerifyCode.do"/>
						<span>换一张</span>
						</a>
					</td>
					<td><a href="javascript:void(0)" title="验证码不为空" class="warning" id="warn3">*</a></td>
				</tr> 
				<tr>
					<td colspan="2">
					<div class="login_forgot_pwd">
					<a href="findPwd.html">忘记密码</a>
				</div>
					</td>
				</tr>
				<tr>
					<td colspan="2"><input type="button" id="loginbtn" tabindex="4" class="loginbtn" value="登录" /></td>
				</tr>
			</table>
		</div> 
	</div>
</div>
<!--[if lt IE7]>
<script  type="text/javascript" src="/newresources/js/json2.js"></script>
<![endif]-->
<script type="text/javascript">
    var slideEle = slider($('.items'));

	function gotowxcf(){
		if(isLoginForPlateForm()==false){
			alert("尚未登录");
			return;
		}else{
			var newurl=getwebroot()+"mes/wxdata/tasklist.html?_dc="+new Date().getTime();
			//alert(newurl);
			window.location.href =newurl;
		}
		
	}
	function gotoSubAccount(){
		if(isLoginForPlateForm()==false){
			alert("尚未登录");
			return;
		}else{
			var newurl=getwebroot()+"usercenter/subAccount/mngSubAccount.html?_dc="+new Date().getTime();
			window.location.href =newurl;
		}
	}
	function getNewVCode(){
		var vcode_img=document.getElementById('vCodeImg');
		if(vcode_img){
			vcode_img.src='common/getVerifyCode.do?_dc='+new Date().getTime();
		}
	}
    function slider(elem) {
        var items = elem.children(),
                max = items.length - 1,
                animating = false,
                currentElem,
                nextElem,
                pos = 0;

        sync();

        return {
            next: function () {
                move(1);
            },
            prev: function () {
                move(-1);
            },
            itemsNum: items && items.length
        };

        function move(dir) {
            if (animating) {
                return;
            }
            if (dir > 0 && pos == max || dir < 0 && pos == 0) {
                if (dir > 0) {
                    nextElem = elem.children('div').first().remove();
                    nextElem.hide();
                    elem.append(nextElem);
                } else {
                    nextElem = elem.children('div').last().remove();
                    nextElem.hide();
                    elem.prepend(nextElem);
                }
                pos -= dir;
                sync();
            }
            animating = true;
            items = elem.children();
            currentElem = items[pos + dir];
            $(currentElem).fadeIn(1000, function () {
                pos += dir;
                animating = false;
            });
        }

        function sync() {
            items = elem.children();
            for (var i = 0; i < items.length; ++i) {
                items[i].style.display = i == pos ? 'block' : '';
            }
        }

    }

    if (slideEle.itemsNum && slideEle.itemsNum > 1) {
        setInterval(function () {
            slideEle.next();
        }, 6000);
    }
</script>
</body>
</html>
