//定时器时间开始数字
var time_num=0;
//电话正则
var phone_reg= /^1[3|4|5|7|8]\d{9}$/;
//发送短信标记位
var send_message_flag = false;
//修改手机发送短信标记位
var send_message_modify_flag = false;
//修改新手机发送短信标记位
var send_message_new_flag = false;
//
var userInfo;
//更新的手机号
var newPhone;
$(function(){
		loadCommonPage();
		
		$(".midd_wrap").css({minHeight:$(window).height()-200});
		$(".midd_left_wrap").css({minHeight:$(window).height()-200});
		$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		
		window.onresize=function(){	
			$(".midd_wrap").css({minHeight:$(window).height()-200});
			$(".midd_left_wrap").css({minHeight:$(window).height()-200});
			$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		};
		
		loadData();
	});
//加载公用部分界面，如同步，底部，左侧菜单等
function loadCommonPage(){
	var result = isLoginForPlateForm();
	if(result.data!=null && result.data.vip == true){
		$("#top").load(getwebroot()+"vip/platform/vipTop.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#mainNav").children().eq(1).addClass("curr");
				$(".vip_search_wrap").hide();
			}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		userInfo=getUserInfo1();
		if(userInfo.login_name==null){
			window.wxc.xcConfirm("请先登录",confirm);
		}else
		{
			if(userInfo.login_name.indexOf(":") >= 0){
				$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/vipSubLeftMenu.html");
			}else{
				$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/vipLeftMenu.html",function(responseTxt,statusTxt,xhr){
					if(statusTxt=="success"){
						$("#leftMenuPage").children().eq(1).children().eq(2).find("a").prepend(">>");
						$("#leftMenuPage").children().eq(1).children().eq(2).addClass("currVip");
					}
				});
			}
		}
	}else{
		$("#top").load(getwebroot()+"platform/top.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#mainNav").children().eq(2).addClass("curr");
				$("#top .select_wrap").css("display","none");
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		userInfo=getUserInfo1();
		if(userInfo.login_name==null){
			window.wxc.xcConfirm("请先登录",confirm);
		}else
		{
			if(userInfo.login_name.indexOf(":") >= 0){
				$(".midd_left_wrap").load(getwebroot()+"usercenter/subLeftMenu.html");
			}else{
				$(".midd_left_wrap").load(getwebroot()+"usercenter/leftMenu.html",function(){
					$("#leftMenuPage").children().eq(1).children().eq(2).css("background","#ececec");
				});
			}
		}
	}
}

function loadData(){
	var result = isLoginForPlateForm();
	if(result.isLogin){
		accountPhone = result.data.account_phone;
		if(accountPhone != "" && accountPhone != null){
			$("#phoneinfo").html("您已绑定了手机号码 ："+ accountPhone);
			$("#showEditBindPhone").removeClass("display_none");
		}else{
			$("#showBindPhone").removeClass("display_none");
		}
	}
}

/*
 * 显示绑定手机层
 * */
function showBindPhone()
{
	$("#saveBindStep2").css("display","none");
	$("#saveBindStep1").css("display","block");
	$(".mask").fadeIn("fast");
	$("#bindphone_wrap").fadeIn("fast");
}

/**
 * 电话号码是否已注册
 * hadPhoneNum
 * @param pNum 
 * @returns false 没有注册；true 已注册；
 * @author mishengliang
 * 2016-11-15 上午9:26:11
 */
var hadNumFlag = false;
function hadPhoneNum(pNum){
	var url = "userInfo/hadPhoneNum.do";
	var params = {};
	params.phoneNum = commonTrim(pNum);
	var fn = function(result){//无操作
		if(result.accountList.length > 0){
			hadNumFlag =  true;
		}else{
			hadNumFlag =  false;
		}
	};
	asyncAjaxMethod(url,params,false,fn);
}

/*
 * 获取验证码
 * */
function getCode(th)
{
	var pNum = $("#bindPhoneNum").val();
	if(pNum == "" || pNum == null){
		$("#validCodeTip").html("请填写手机号");
		$("#info_explain_valid_tip").css("display","block");
		return;
	}
	if(!phone_reg.test(pNum)){
		$("#validCodeTip").html("请填写正确格式的手机号");
		$("#info_explain_valid_tip").css("display","block");
		return;
	}
	hadPhoneNum(pNum);//查看手机号是否重复
	if(hadNumFlag){
		$("#validCodeTip").html("手机号已被注册，请更换手机号");
		$("#info_explain_valid_tip").css("display","block");
		return;
	}
	$("#info_explain_valid_tip").css("display","none");
	
	//短信发送
	var paramsResult = sendShortMessage($("#bindPhoneNum").val());
	if(paramsResult.resultType == 32 || paramsResult.resultType == -1){
		$("#validCodeTip").html(paramsResult.message);
		$("#info_explain_valid_tip").css("display","block");
	}else{
		send_message_flag = true;
		$(th).attr('disabled',"true");
		$(th).css({"color":"#999","cursor":"default"});
		time_num=0;
		timeCount(60,$("#timecount1"));
	}
}

/**
 * 修改手机号原手机号验证码发送
 * @param th
 */
function getCodeForModify(th){//短信发送
	var paramsResult = sendShortMessage(null);
	if(paramsResult.resultType == 32 || paramsResult.resultType == -1){
		$("#validCodeTipForModify").html(paramsResult.message);
		$("#info_explain_modify").css("display","block");
	}else{
		send_message_modify_flag = true;
		$("#info_explain_modify").css("display","none");
		
		$(th).attr('disabled',"true");
		$(th).css({"color":"#999","cursor":"default"});
		time_num=0;
		timeCount(60,$("#timecount2"));
	}
}

/**
 * 修改手机号新手机号验证码发送
 * @param th
 */
function getCodeForNew(th){
	if($("#account_new").val() == "" || $("#account_new").val() == null){
		$("#validCodeTipForNew").html("请填写手机号");
		$("#info_explain_new").css("display","block");
		return;
	}
	if(!phone_reg.test($("#account_new").val())){
		$("#validCodeTipForNew").html("请填写正确格式的手机号");
		$("#info_explain_new").css("display","block");
		return;
	}
	hadPhoneNum($("#account_new").val());//查看手机号是否重复
	if(hadNumFlag){
		$("#validCodeTipForNew").html("手机号已被注册，请更换手机号");
		$("#info_explain_new").css("display","block");
		return;
	}
	
	//短信发送
	var paramsResult = sendShortMessage($("#account_new").val());
	if(paramsResult.resultType == 32 || paramsResult.resultType == -1){
		$("#validCodeTipForNew").html(paramsResult.message);
		$("#info_explain_new").css("display","block");
	}else{
		send_message_new_flag = true;
		newPhone = $("#account_new").val();
		$("#info_explain_new").css("display","none");
		
		$(th).attr('disabled',"true");
		$(th).css({"color":"#999","cursor":"default"});
		time_num=0;
		timeCount(60,$("#timecount3"));
	}
}

//关闭弹出层方法
function pop_div_close(id)
{
	$(".mask").fadeOut("fast");
	$("#"+id).fadeOut("fast");
}

/*
 * 保存绑定手机
 */
function saveBindPhone()
{
	if(send_message_flag == false){
		$("#validCodeTip").html("请先获取手机验证码");
		$("#info_explain_valid_tip").css("display","block");
	}
	
	var comfirmResult = confirmValidCode($("#validCode").val());
	if(typeof(comfirmResult.validCodeRight) != "undefined" && comfirmResult.validCodeRight == "false"){
		$("#validCodeTip").html(comfirmResult.message);
		$("#info_explain_valid_tip").css("display","block");
		return;
	}else{
		$("#info_explain_valid_tip").css("display","none");
		$("#phoneNumShow").html(comfirmResult.phoneNum);
		$("#saveBindStep1").css("display","none");
		$("#saveBindStep2").css("display","block");
	}
}

/**
 * mishengliang 16-07-19
 * 验证手机验证码是否正确
 * @param validCode 输入的验证码
 * @returns result 验证结果
 */
function confirmValidCode(validCode){
	var confirmResult;
	var url = "userInfo/confirmValidCode.do";
	var params = {};
	params.validCode = validCode;
	
	var isasync = false;
	var fn = function(result){
		confirmResult = result;
	};
	asyncAjaxMethod(url,params,isasync,fn);
	
	return confirmResult;
}

/**
 * 绑定窗口关闭
 */
function closeBindPhone()
{
	window.location.reload();
	$(".mask").fadeOut("fast");
	$("#bindphone_wrap").fadeOut("fast");
}

/*
 * 计时器
 * 
 */
function timeCount(num,timeCount)
{
	time_num=num;
	time_count = timeCount;
	$(timeCount).html(time_num);
	time_num=time_num-1;
	if(time_num>=0)
	{
		setTimeout("timeCount(time_num,time_count)",1000);
	}
	else
	{
		$(".getCode_btn").removeAttr("disabled");
		$(".getCode_btn").css({"color":"#0072c4","cursor":"pointer"});
	}
}

/*
 * 显示修改绑定手机界面
 * */
function showEditBindPhone()
{	
	$("#account_phone_num").html(userInfo.account_phone);
	$("#AddBindWrap").css("display","none");
	$("#EditBindWrap").css("display","block");
	$("#subTitile").show();
	//默认第一步的颜色变化
	$(".stepInfo_wrap").find(".step_index").eq(0).css("background-color","#ff9900");
	$("#step1").css("display","block");
	$("#step1").siblings().css("display","none");
}

/*
 * 编辑绑定下一步方法
 * 
 */
function goNext(num)
{
	if(num==2)
	{
		var validCode = $("#valid_code_modify").val();//输入的验证码
		if(send_message_modify_flag == false){
			$("#validCodeTipForModify").html("请先发送校验码");
			$("#info_explain_modify").css("display","block");
			return;
		}
		if(validCode == "" || validCode == null){
			$("#validCodeTipForModify").html("校验码不为空");
			$("#info_explain_modify").css("display","block");
			return;
		}
		
		var confirmResult = confirmValidCode(validCode);
		if(typeof(confirmResult.validCodeRight) != "undefined" && confirmResult.validCodeRight == "false"){
			$("#validCodeTipForModify").html(confirmResult.message);
			$("#info_explain_modify").css("display","block");
			return;
		}else{
//			$(".stepInfo_wrap").find(".step_index").eq(1).css("background-color","#ff9900");
//			$(".step_bar_curr").css("width","400px");
			$(".stepBar").find("span").removeClass("curr");
			$(".stepBar").find(".s2").addClass("curr");
			$(".stepBar").find("img").prop("src","/newresources/images/accounManage/state3-2.png");
		}
	}
	if(num==3)
	{
		var validCode = $("#valid_code_new").val();//输入的验证码
		if(send_message_new_flag == false){
			$("#validCodeTipForNew").html("请先发送校验码");
			$("#info_explain_new").css("display","block");
			return;
		}
		if(validCode == "" || validCode == null){
			$("#validCodeTipForNew").html("校验码不为空");
			$("#info_explain_new").css("display","block");
			return;
		}
		
		var confirmResult = confirmValidCode(validCode);
		if(typeof(confirmResult.validCodeRight) != "undefined" && confirmResult.validCodeRight == "false"){
			$("#validCodeTipForNew").html(confirmResult.message);
			$("#info_explain_new").css("display","block");
			return;
		}else{
			$("#newPhoneNum").html(hiddenPhoneNum(newPhone));
	/*		$(".stepInfo_wrap").find(".step_index").eq(2).css("background-color","#ff9900");
			$(".step_bar_curr").css("width","600px");*/
			$(".stepBar").find("span").removeClass("curr");
			$(".stepBar").find(".s3").addClass("curr");
			$(".stepBar").find("img").prop("src","/newresources/images/accounManage/state3-3.png");
		}
	}
	$("#step"+num).siblings().css("display","none");
	$("#step"+num).css("display","block");
}

/*
 * 完成修改绑定手机按钮事件
 * 
 */
function finishEidtBind()
{
	/*
	 * $("#EditBindWrap").css("display","none");
	 * loadData();//数据加载，避免整页刷新 mishengliang 16-07-20
	 * $("#AddBindWrap").css("display","block");
	 */
	window.location.reload();
}

/**
 * 发送短信
 * mishengliang 16-07-19
 * @param phoneNum 要发送短信的电话号
 * @returns params 返回结果集合
 */
function sendShortMessage(phoneNum){
	var sendResult;//用于返回数据
	var url = "userInfo/sendShortMessage.do";
	var params = {};
	if(phoneNum != null){params.phoneNum = phoneNum;}
	params.moduleId = 1;
	
	var isasync = false;
	var fn = function(result){//无操作，只是发送信息
		sendResult = result;
	};
	asyncAjaxMethod(url,params,isasync,fn);
	
	return sendResult;
}

function hiddenPhoneNum(phoneNum){
	var frontNum = phoneNum.substring(0,3);
	var behindNum = phoneNum.substring(phoneNum.length-4,phoneNum.length);
	var hiddenNum = frontNum +"****"+ behindNum;
	return hiddenNum;
}