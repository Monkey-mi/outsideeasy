<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>账号安全</title>
<link href="/vip/resources/css/vippage.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/page.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
<link href="/newresources/css/account.css" rel="stylesheet" type="text/css" />
</head>
<body class="bg_grey">
<div id="top"></div>
<!--中间-->
<div class="midd_wrap clearfix">
	<div class="midd_left_wrap" style="width:180px;">
	</div>
	<div class="midd_right_wrap" style="width:834px">
<!-- 		<div class="account_right_title"> -->
			<!-- <span  class="f_l ml10"><span id="companyName">...</span><span id="isCheck" class="span_rz ml10 display_none" >实名入驻</span></span> -->
<!-- 		</div>  -->
		<div class="account_right_inner_wrap">
			<h4>账号安全<span id="subTitile" class="hide"><span class="subTitleSplit">|</span><span style="font-size:12px;">修改绑定手机</span></span></h4>
			<hr class="hr_grey" />
			<div id="AddBindWrap" class="ml80 mt50 clearfix">
				<div class="front_pic_wrap">
					<img src="/newresources/images/safe/f_pic.png" />
				</div>
				<div class="safephone_wrap ml40 mt30">
					<h1>绑定手机</h1>
					<div id="phoneinfo" class="phoneinfo_wrap">为了您的账号安全请绑定手机号码</div>
					<button id="showBindPhone" class="display_none" onclick="showBindPhone()">立即绑定</button>
					<button id="showEditBindPhone" class="display_none" onclick="showEditBindPhone()">修改</button>
				</div>
			</div>
			<div id="EditBindWrap" style="display:none;">
<!-- 				<p class="mt10" style="margin-left:120px;">修改绑定手机号</p> -->
				<!--注册步骤层开始-->
				<!-- <div class="div_w600_c" style="top:0px;">
				
					<div class="stepBar_wrap">
						<div class="step_bar">
							<div class="step_bar_curr"></div>
						</div>
						<div class="stepInfo_wrap clearfix" >
							<div class="stepInfo_inner">
								<div class="step_index_wrap"><span class="step_index">1</span></div>
								<span class="step_text">核实原号码</span>
							</div>
							<div class="stepInfo_inner">
								<div class="step_index_wrap"><span class="step_index">2</span></div>
								<span class="step_text">输入新号码</span>
							</div>
							<div class="stepInfo_inner">
								<div class="step_index_wrap"><span class="step_index">3</span></div>
								<span class="step_text">更换成功</span>
							</div>
						</div>
					</div>
				</div> -->
					
				<div class="stepBar">
					<div class="stepBarTip"><span class="curr s1">核实原号码</span><span class="ml140 s2">输入新号码</span><span class="ml145 s3">更换成功</span></div>
					<img class="ml5 mt10" src="/newresources/images/accounManage/state3-1.png">
				</div>
				<!--操作步骤条结束-->
				<div class="ml240">
					<!--step1开始-->
					<div id="step1" class="step_wrap" style="display:block;margin-left:42px;">
						<div class="account_stepinner_wrap">
							<span class="account_label_wrap">手机号码：</span>
							<div id="account_phone_num" class="account_display_wrap">***</div>
							<button class="getCode_btn" onclick="getCodeForModify(this)">获取验证码</button>
							<div class="time_count_wrap ml8"><span id="timecount2" class="greencolor mt8">60</span>秒</div>
						</div>
						<div class="account_stepinner_wrap">
							<span class="account_label_wrap">验证码：</span>
							<input id="valid_code_modify" type="text" class="account_input_wrap" size="10" />
							<div id="info_explain_modify" class="info_explain_wrap">
								<img src="/newresources/images/new/er.png" />
								<span id="validCodeTipForModify" class="redcolor">请输入动态码</span>
							</div>
						</div>
						<div class="account_stepinner_wrap">
							<span class="account_label_wrap"></span>
							<button class="button_next mt8 ml5" onclick="goNext(2)">下一步</button>
						</div>
					</div>
					<!--step1结束-->
					<!--step2开始-->
					<div id="step2" class="step_wrap" style="display:none">
						<div class="account_stepinner_wrap">
							<span class="account_label_wrap">新手机号码：</span>
							<input id="account_new" type="text" class="account_input_wrap" size="10" />
							<button class="getCode_btn ml10" onclick="getCodeForNew(this)">获取验证码</button>
							<div class="time_count_wrap ml8"><span id="timecount3" class="greencolor mt8">60</span>秒</div>
						</div>
						<div class="account_stepinner_wrap">
							<span class="account_label_wrap">验证码：</span>
							<input id="valid_code_new" type="text" class="account_input_wrap" size="10" />
							<div id="info_explain_new" class="info_explain_wrap">
								<img src="/newresources/images/new/er.png" />
								<span id="validCodeTipForNew" class="redcolor">请输入动态码</span>
							</div>
						</div>
						<div class="account_stepinner_wrap">
							<span class="account_label_wrap"></span>
							<button class="button_next mt8 ml45" onclick="goNext(3)">下一步</button>
						</div>
					</div>
					<!--step2结束-->
					<!--step3开始-->
					<div id="step3" class="step_wrap" style="display:none">
						<p style="margin-left:100px;font-weight:bold;font-size:13px;"><img class="mr5" src="/newresources/images/accounManage/pass.png" />恭喜您，绑定成功</p>
						<p style="margin-left:75px;"><span class="greycolor ml10">您已绑定的手机号码：<span id="newPhoneNum">***</span></span></p>
						<p class="mt8" style="margin-left:50px;"><button class="button_next ml65" onclick="finishEidtBind()">完成</button></p>
					</div>
					<!--step3结束-->
				</div>
			</div>
		</div>
	</div>
</div>
<div class="mask"></div>
<div id="bindphone_wrap" class="pop_layer_wrap">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		验证提示
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('bindphone_wrap')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap" id="saveBindStep1">
		<div class="inner_line_wrap clear mt30">
			<div class="label_wrap">
				绑定的手机号<span class="no_empty">*</span>
			</div>
			<input id="bindPhoneNum" class="input_wrap" type="text" size="50" />
			<button id="getCodeBtn" class="getCode_btn ml10" onclick="getCode(this)">获取验证码</button>
			<div class="time_count_wrap ml8"><span id="timecount1" class="greencolor mt8">60</span>秒</div>
			<div class='info_explain_wrap' style="display:none;">
				<img src="/newresources/images/new/er.png" />
				<span class="redcolor"></span>
			</div>
		</div>
		<div class="inner_line_wrap clear">
			<div class="label_wrap">
				输入动态码<span class="no_empty">*</span>
			</div>
			<input id="validCode" class="input_wrap" type="text" size="50" />
			<div id="info_explain_valid_tip" class='info_explain_wrap'>
				<img src="/newresources/images/new/er.png" />
				<span id="validCodeTip" class="redcolor">请输入动态码</span>
			</div>
		</div>
		<div class="inner_line_wrap clear">
			<div class="label_wrap"></div>
			<button class="button_save" onclick="saveBindPhone()">确定</button>
		</div>
	</div>
	<div  id="saveBindStep2" class="pop_content_wrap" style="display:none">
		<p class="mt30 t_algin_c"><img src="/newresources/images/big-duigou.png" />恭喜您，绑定成功<span class="greycolor ml10">您已绑定的手机号码：<span id="phoneNumShow">***</span></span></p>
		<p class="t_algin_c mt30"><button class="button_save" onclick="closeBindPhone()">完成</button></p>
	</div>
</div>
<!--底端-->
<div id="bottom"></div>
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript" src="/usercenter/accountManage/js/safeAccount.js"></script>
</body>
</html>