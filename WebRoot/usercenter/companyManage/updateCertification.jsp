<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>变更申请</title>
<link href="/newresources/css/page.css" rel="stylesheet">
<link href="/newresources/css/companyinfo.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet">
<%@ include file="/newresources/js/base.jsp" %>
<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>
<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="/newresources/js/city.js"></script>
<script type="text/javascript" src="/newresources/js/currency.js"></script>
<script type="text/javascript" src="/newresources/js/companyClass.js"></script>
<script type="text/javascript" src="/newresources/js/companyNature.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=4i6arTpbQQ1MfIcFRuoHyXKc"></script>
<script type="text/javascript">
var currencys={};
var province={};
var city={};
var country={};
var map;
var companyIdForAll;
var auth_update_id;//变更信息表记录id
var auth_update_state;//变更信息表记录审核状态

//电话正则
var phone_reg= /^((\+?86)|(\(\+86\)))?\d{3,4}-\d{7,8}(-\d{3,4})?$/;///^((\+?86)|(\(\+86\)))?(1[3|4|5|8]\d{9})|?\d({3,4}-\d{7,8}(-\d{3,4})))$/;
//数字正则
var num_reg =/^[1-9](\d+(\.\d+)?)?$/;
//企业名称
var company_name_flag=false;
//法人代表
var company_corporate_flag=false;
//注册资本
var company_reg_fund_flag=false;
//成立日期
var company_establish_dt_flag=false;
//企业类型
var company_nature_flag = false;
//所属行业
var company_class_flag = false;
//币种
var currency_flag = false;
//主营业务
var company_main_bussiness_flag = false;

var userInfo = getUserInfo1();//获取当前用户信息

var delUpdateFileIds=[];//储存要删除的附件ID

var updateForBusiness=0;
var updateForTaxe=0;
var updateForOrganization=0;
var updateForTaxpayer=0;
if(window.name==""){
	var urlPara = location.search; //获取参数部分
	 urlPara=unescape(urlPara);//对参数解密
	 function getPara(paraName){ 
		 var reg = new RegExp("[&|?]"+paraName+"=([^&$]*)", "gi"); 
		 var a = reg.test(urlPara); 
		 return a ? RegExp.$1 : ""; 
		 } 
	//捕获参数并进行操作 
	 var companyId= getPara("companyId"); //捕获到url参数
	 var windowNameParam ={"companyIdForAll":companyId};
	 addParamsToWindowName(windowNameParam); 
}else{
	var companyId=getParamFromWindowName("companyIdForUpdate");
}
$(function(){
	loadCommonPage();
	$(".midd_wrap").css({minHeight:$(window).height()-175});
	window.onresize=function(){
		$(".midd_wrap").css({minHeight:$(window).height()-175});
	};
	
	//默认第一步的颜色变化
	$('.stepInfo_wrap').find('.step_index').eq(0).css("background-color","#ff9900");
	
	checkStateForStep();//检测状态，状态位正在审核，显示step2
	if($("#step2").css("display") == "block"){//如果显示为step2，则不用执行下面的操作
		return;
	}
	
	$(".input_wrap").on("focus",function(){
			var id=$(this).attr("id");
			var info_str="";
			
			if(id=="companyCorporate")
			{
				info_str="请填写与营业执照相符信息";
			}
			else if(id=="companyPhone")
			{
				info_str="请输入区号-电话号码格式，如：xxxx-xxxxxxx";
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
			if(id=="companyName")
			{
				if($(this).val()=="")
				{
					error_str="请输入企业名称";
					company_name_flag=false;
				}
				else
				{
					company_name_flag=true;
				}
			}
			else if(id=="companyMainBussiness")
			{
				if($(this).val()=="")
				{
					error_str="请输入主营业务";
					company_main_bussiness_flag=false;
				}
				else
				{
					company_main_bussiness_flag=true;
				}
			}
			else if(id=="companyCorporate")
			{
				if($(this).val()=="")
				{
					error_str="请输入法人代表";
					company_corporate_flag=false;
				}
				else
				{
					company_corporate_flag=true; 
				}
			}
			else if(id=="companyRegFund")
			{
				if($(this).val()==""){
					error_str="请输入注册资本";
					company_reg_fund_flag=false;
				}else if(!num_reg.test($(this).val())){//判断是否是数字
					error_str="请输入数字";
					company_reg_fund_flag=false;
				}else if($(this).prev().val() == 0){
					error_str="请选择币种";
					company_reg_fund_flag=false;
				}else{
					company_reg_fund_flag=true;
				}
			}
			else if(id=="companyEstablishDt")
			{
				if($(this).val()=="")
				{
					error_str="请输入成立日期";
					company_establish_dt_flag=false;
				}
				else
				{
					company_establish_dt_flag=true;
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
		
		//select选项  mishengliang
		$(".select_wrap").change(function(){
			var id=$(this).attr("id");
			var error_str="";
			
			if(id=="companyNature")
			{
				if($(this).val()=="0")
				{
					error_str="请选择企业类型";
					company_nature_flag=false;
				}
				else
				{
					company_nature_flag=true;
				}
			}
			else if(id=="companyClass")
			{
				if($(this).val()=="0")
				{
					error_str="请选择所属行业";
					company_class_flag=false;
				}
				else
				{
					company_class_flag=true;
				}
			}else if(id=="currency"){
				if($(this).val()=="0"){
					error_str="请选择币种";
					currency_flag=false;
				}else if($(this).next().val()==""){
					error_str="请输入注册资本";
					currency_flag=false;
				}else if(!num_reg.test($(this).next().val())){//判断是否是数字
					error_str="请输入数字";
					currency_flag=false;
				}else{
					currency_flag=true;
				}
			}
			
			if(error_str!=""){//错误信息显示
				$(this).nextAll(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
				$(this).nextAll(".info_explain_wrap").fadeIn("fast");
			}
			else
			{
				$(this).nextAll(".info_explain_wrap").fadeOut("fast");
			}
			
		});
		
	var district_error_str	= ""; 
	//币种
	currencys=CurrencysUtil;
	$.each(currencys,function(index,c){
		var option="<option value='"+c.currency_id+"'>"+c.currency_name+"</option>";
		$("#currency").append(option);
	});
	//企业类型
	companyNatures=CompanyNaturesUtil;
	$.each(companyNatures,function(index,c){
		var option="<option value='"+c.nature_id+"'>"+c.nature_name+"</option>";
		$("#companyNature").append(option);
	});
	//所属行业
	companyClasses=CompanyClassesUtil;
	$.each(companyClasses,function(index,c){
		var option="<option value='"+c.class_id+"'>"+c.class_name+"</option>";
		$("#companyClass").append(option);
	});
	
	companyIdForAll = companyId;
	getBaseInfo();//显示认证信息
	picPathSrcForUpdate(18,"#business_licence");//营业执照 
	picPathSrcForUpdate(19,"#tax_registration_certificate");//税务登记
	picPathSrcForUpdate(20,"#organization_code_certificate");//组织机构代码证
	picPathSrcForUpdate(21,"#taxpayer_qualification_certification");//纳税人资格证书
	
	companyIntroductionLimit();//公司简介字数的计算和限制
});

/*展示公司图片基本信息 mishengliang
 * 
 * fileTypeId 图片文件位置类型ID
 * picId 图片展示位置的img标签ID
 * */
function picPathSrcForUpdate(fileTypeId,picId){
	var url = "PfTaskFileCtrl/getTaskFileListForUpdate.do";
	var params = {};
	params.auth_update_id = auth_update_id;
	params.fileTypeId = fileTypeId;
	params.state = auth_update_state;
	params.companyId = companyId;
	var isasync = true;
	var fn = function(result){
		if(result.data != "" && result.data[0].object_id != undefined){//变更表中信息
			$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].object_id);
			var del="<div class='a_bg'></div>"
					+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delUpdateAttached(this,"+ result.data[0].id +")'>删除</a></div>";
		    $(picId).parent().append(del);
		}else if(result.data != "" && result.data[0].mogodb_id != undefined){//基本表中信息  基本信息表中不增加删除，因为不可能删除基本表中的信息
			$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
		}else{//添加默认的图片
			$(picId).attr("src","/newresources/images/uploadImg.png");
		}
	};
	
	asyncAjaxMethod(url,params,isasync,fn);
}

//删除变更表中企业证照
function delUpdateAttached(obj,fileId){
		var parentObj=$(obj).parent().parent();
		parentObj.find("img").attr("src","/newresources/images/uploadImg.png");				 
		$(obj).parent().prev().remove();
		$(obj).parent().remove();
		delUpdateFileIds.push(fileId);
}

//检测状态，状态位正在审核，显示step2
function checkStateForStep(){
	var urlForApplySts = "supplierForPlateForm/getLastAuthcationUpdateItem.do";
	var companyIdForApplySts = companyId;
	var paramsForApplySts = {};
	paramsForApplySts.company_id = companyIdForApplySts;
	var fn = function(result){
		auth_update_state = result.data.state; 
		auth_update_id = result.data.auth_update_id;
		if(auth_update_state == 1){//正在审核
			$(".title_remark_wrap").css("display","none");
			$("#regEmail").html(userInfo.account_email);//提示已发送的注册邮箱
			$("#step1").css("display","none");
			$("#step2").css("display","block");
// 			$(".stepInfo_wrap").find('.step_index').eq(1).css("background-color","#ff9900");
// 			$(".step_bar_curr").width(1024);
			$(".stepBar").find("img").prop("src","/newresources/images/state2-2.png");
			$(".stepBar").find("span").removeClass("curr");
			$(".stepBar").find(".s2").addClass("curr");
		}else if(auth_update_state == 2){
			$("#tip_message").html("变更申请完成认证");
		}else if(auth_update_state == 3){
			$("#tip_message").html("审核结果：未通过，"+"<br/>审核意见："+result.data.auth_opinion+"<br/><span class='ml85'>请修改后重新提交。</span>");
		}
	};
	
	asyncAjaxMethod(urlForApplySts,paramsForApplySts,false,fn);//判断申请状态，如果正在审核，则显示Step2
}

//公司简介字数计算及限制
function companyIntroductionLimit(){
	$("#companyIntroduction").keyup(function(){
		var descriptLength = $("#companyIntroduction").val().length;
		$("#remain_words_num").text(400-descriptLength);
		if(400-descriptLength <= 0){
			var descriptLimit = $("#companyIntroduction").val().substring(0,400);
			$("#companyIntroduction").val(descriptLimit);
		}
	});
}

function bankAndInvoiceCheck(){
	//银行账号验证是否为空  动态加载需要放在信息加载之后
	$("#bankTable tr").each(function(index,element){
		$(element).find("td:first input").on("blur",function(){
			if($(this).val()==""){
				var error_str = "银行账号不能为空";
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
			}else{
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
			}
		});
		$(element).find("td:eq(1) input").on("blur",function(){
			if($(this).val()==""){
				var error_str = "银行账号不能为空";
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
			}else{
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
			}
		});
	});
	
	//发票抬头验证是否为空  动态加载需要放在信息加载之后
	$("#invoiceTable tr").each(function(index,element){
		$(element).find("td:first input").on("blur",function(){
			if($(this).val()==""){
				var error_str = "发票抬头不能为空";
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
			}else{
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
			}
		});
	});
}

//加载已有的数据
function getBaseInfo(){
	var url = "supplierForPlateForm/getLastAuthcationUpdateItem.do"; 
	var params = {};
	params.company_id = companyId;
	var isasync = true;
	var fn = function(result){
		 	updateInfo = result.data;
		 	
 			if(updateInfo.state == 2 && updateInfo.auth_opinion != null && updateInfo.auth_opinion != ""){//未审核通过
 				$("#tip_message").html("变更申请通过");
 			}else if(updateInfo.state == 3 && updateInfo.auth_opinion != null && updateInfo.auth_opinion != ""){//未审核通过
 				$("#tip_message").html("审核结果：未通过，"+"<br/>审核意见："+updateInfo.auth_opinion+"<br/><span class='ml85'>请修改后重新提交。</span>");
 			}else{
 				$(".title_remark_wrap").css("display","none");
 			}
 			
			$("#companyName").val(updateInfo.cpyname_cn);//企业名称
			$("#companyCorporate").val(updateInfo.corporation);//法人代表
			$("#companyEstablishDt").val(showBeforeOfDateStr(updateInfo.establish_dt));//成立日期
			$("#companyRegFund").val(updateInfo.reg_fund);//注册资本
			$("#contactAddr").val(updateInfo.contact_addr);//注册地址
			$("#companyPhone").val(updateInfo.f_phone);
			$("#companyMainBussiness").val(updateInfo.key_remark);//主营业务
			if(updateInfo.lng != 0 && updateInfo.lat != 0){//为0的话不给经纬度赋值
				$("#lng").val(updateInfo.lng);//经度
				$("#lat").val(updateInfo.lat);//纬度
			}
			
			//省、市、县各级代码
			var provinceNum = Math.floor(parseInt(updateInfo.contact_addr_code)/10000)*10000;
			var cityNum = Math.floor(parseInt(updateInfo.contact_addr_code)/100)*100;
			var countryNum = updateInfo.contact_addr_code;
			
			/*模拟change事件  */
			if(!isNaN(provinceNum)){
				$("#province").val(provinceNum).trigger("change");//设置省级行政区
				$("#city").val(cityNum).trigger("change");//设置市级行政区
				$("#country").val(countryNum).trigger("change");//设置县级行政区
			}
			
			if(updateInfo.nature_id!=null){//加载企业类型
					$("#companyNature").val(updateInfo.nature_id);
			}
			if(updateInfo.class_id!=null){//加载所属行业
					$("#companyClass").val(updateInfo.class_id);
			}
			if(updateInfo.currency_id!=null){//加载币种
					$("#currency").val(updateInfo.currency_id);
			}
			if(!updateInfo.industry_id){
				$("[name = company_industry]:radio").eq(0).attr("checked",true);//经营模式复选框
			}else if(updateInfo.industry_id == 1){
				$("[name = company_industry]:radio").eq(0).attr("checked",true);//经营模式复选框
			}else if(updateInfo.industry_id == 2){
				$("[name = company_industry]:radio").eq(1).attr("checked",true);//经营模式复选框
			}else if(updateInfo.industry_id == 3){
				$("[name = company_industry]:radio").eq(2).attr("checked",true);//经营模式复选框
			}else if(updateInfo.industry_id == 4){
				$("[name = company_industry]:radio").eq(3).attr("checked",true);//经营模式复选框
			}
			
			//展示银行账号
			/* bankAccount = compnayExtraInfo.bankAccount;
			if(!compnayExtraInfo.bankAccount){//bankAccount无数据
			}else if(compnayExtraInfo.bankAccount.length != 0){
				$("#bank_id1").val(bankAccount[0].account_id);
				$("#bankName1").val(bankAccount[0].account_name);
				$("#bankAccount1").val(bankAccount[0].account_code);
	 			for(var i = 0;i<compnayExtraInfo.bankAccount.length-1;i++){
		 			var j = i+2;
					addBankRow('bankTable');
					
					$("#bank_id" + j).val(bankAccount[i+1].account_id);
					$("#bankName" + j).val(bankAccount[i+1].account_name);
					$("#bankAccount" + j).val(bankAccount[i+1].account_code);
				} 
			} */
			
			//展示发票抬头
			/* invoiceTitles = compnayExtraInfo.invoiceTitles;
			if(!compnayExtraInfo.invoiceTitles){//抬头发票无数据
			}else if(compnayExtraInfo.invoiceTitles.length != 0){
				$("#invoice_id1").val(invoiceTitles[0].invoice_title_id);
				$("#invoiceHead1").val(invoiceTitles[0].invoice_title_name);
				for(var i = 0;i<compnayExtraInfo.invoiceTitles.length-1;i++){
					var j = i+2;
					addInvoiceRow('invoiceTable');
					
					$("#invoice_id" + j).val(invoiceTitles[i+1].invoice_title_id);
					$("#invoiceHead" + j).val(invoiceTitles[i+1].invoice_title_name);
				} 
			} */
			
			//$("#companyIntroduction").val(updateInfo.company_introduction);//企业简介
			//$("#remain_words_num").text(400-$("#companyIntroduction").val().length);//剩余输入字数
			
			//bankAndInvoiceCheck();//绑定触发银行账号和抬头发票的校验事件
	};
	
	asyncAjaxMethod(url,params,isasync,fn);
}

//加载公用部分界面，如同步，底部，左侧菜单等
function loadCommonPage(){
	var result = isLoginForPlateForm();
	var isVip=getCookie("isVip");
// 	if(result.data!=null && result.data.vip == true){
	if(isVip=="true"){
		$("#top").load(getwebroot()+"vip/platform/vipTop2.html");
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
	}else{
		$("#top").load(getwebroot()+"platform/top2.html #topPage");
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	}
}
var bank_rowCount=1;
//添加银行账号行
function addBankRow(table_id)
{
	bank_rowCount++;
	var newRow="<tr id='bank_row"+ bank_rowCount +"'>"
					+"<td><input id='bankName"+ bank_rowCount +"' type='text'   placeholder='开户银行' /></td>"
					+"<td><input id='bankAccount"+ bank_rowCount +"' type='text'  placeholder='银行账号' /></td>"
					+"<td><img src='/newresources/images/del.png'  onClick='delBankRow(this,"+ bank_rowCount +")'/></td>"
					+"<td class='redcolor'></td>"
					+"<td style='dispaly:none;'><input id='bank_id"+ bank_rowCount +"' type='hidden' value='-1'></td>"
					+"<td><div class='info_explain_wrap'></div></td>"
				+"</tr>";
	$('#'+table_id).append(newRow);
	
	//银行账号验证是否为空  动态加载需要放在信息加载之后
	$("#bankTable tr").each(function(index,element){
		$(element).find("td:first input").on("blur",function(){
			if($(this).val()==""){
				var error_str = "发票抬头不能为空";
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
			}else{
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
			}
		});
		$(element).find("td:eq(1) input").on("blur",function(){
			if($(this).val()==""){
				var error_str = "发票抬头不能为空";
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
			}else{
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
			}
		});
	});
}

//删除银行账号行
function delBankRow(obj,bank_rowCount)
{
	var bank_id= $(obj).parent().parent().find("#bank_id"+bank_rowCount).val();
	
	if(bank_id!=null&& bank_id!="")
	{
		$.ajax({
			type:"POST",
			url: getwebroot()+"PfBankAccountCtrl/deleteBankAccount.do",
			dataType:"json",
			data:{
				bankAccountId:bank_id
			},
			success:function(result){
				//alert("删除成功");
			},
			error:function(result){
				alert(result.message);
			}
		});
	}
	//如果是第一行，保留界面元素
	if(bank_rowCount==1)
	{
		$(obj).parent().parent().find("input").val("");
		$("#bank_id1").val("-1");
	}
	else
	{
		$(obj).parent().parent().remove();
	}
	
}
var invoice_rowCount=1;
//添加发票抬头
function addInvoiceRow(table_id)
{
	invoice_rowCount++;
	var newRow="<tr id='invoice_row"+ invoice_rowCount +"'>"
					+"<td>"
						+"<input id='invoiceHead"+ invoice_rowCount +"' type='text' style='width:450px;' value=''/>"
					+"</td>"
					+"<td><img src='/newresources/images/del.png'  onClick='delInvoiceRow(this,"+ invoice_rowCount +")'/></td>"
					+"<td class='redcolor'></td>"
					+"<td style='dispaly:none;'>"
						+"<input id='invoice_id"+ invoice_rowCount +"' type='hidden' value='-1'>"
					+"</td>"
					+"<td><div class='info_explain_wrap'></div></td>"
				+"</tr>";
	$('#'+table_id).append(newRow);
	
	//发票抬头验证是否为空  动态加载需要放在信息加载之后
	$("#invoiceTable tr").each(function(index,element){
		$(element).find("td:first input").on("blur",function(){
			if($(this).val()==""){
				var error_str = "发票抬头不能为空";
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
			}else{
				$(this).parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
			}
		});
	});	
}
//删除银行账号行
function delInvoiceRow(obj,invoice_rowCount)
{
	var invoice_id= $(obj).parent().parent().find("#invoice_id"+invoice_rowCount).val();
	
	if(invoice_id!=null&& invoice_id!="")
	{
		$.ajax({
			type:"POST",
			url: getwebroot()+"PfInvoiceTitleCtrl/deleteInvoiceTitle.do",
			dataType:"json",
			data:{
				invoiceTitleId:invoice_id
			},
			success:function(result){
				//alert("删除成功");
			},
			error:function(result){
				//alert(result.message);
			}
		});
	}
	//如果是第一行，保留界面元素
	if(invoice_rowCount==1)
	{
		$(obj).parent().parent().find("input").val("");
		$("#invoice_id1").val("-1");	
	}
	else
	{
		$(obj).parent().parent().remove();
	}
	
}

//创建地图
 function remarkMap()
{
	var searchArea='';
	// 百度地图API功能
	
    map = new BMap.Map("allmap",{enableMapClick:false,minZoom:6});
	var point = new BMap.Point(120.134751,30.326912);
	map.centerAndZoom(point,12);
	setMapEvent();//设置地图事件
      addMapControl();//向地图添加控
	  custormSearch();//加载自定义搜索
	
}
function close_map(obj)
{
		$(".mask").css("display","none");
		$("#allmap").css("display","none");
		//$("#r-result").css("display","none");
		$("#remove_overlay").css("display","none");
		$(obj).css("display","none");
}
//定位到地图
	function theLoaction(){
		$(".mask").css("display","block");
		$("#allmap").css("display","block");
		//$("#r-result").css("display","block");
		$("#close_map").css("display","block");
		remarkMap();
		remove_overlay();
		$("#remove_overlay").css("display","block");
		//var province=$('#province option:selected').text();
		var city=$('#city option:selected').text();
		var country=$('#country option:selected').text();
		
		var street_content=$("#contactAddr").val();
		
		if($('#country option:selected').val()==''||$('#country option:selected').val()==0)
		{
			if($('#city option:selected').val()==''||$('#city option:selected').val()==0)
			{
				window.wxc.xcConfirm("请选择城市");
				return;
			}
			else
			{
				searchArea=city;
			}
		}
		else
		{
			searchArea=country;
		}
		if(street_content!='')
		{
			// 创建地址解析器实例
			var myGeo = new BMap.Geocoder();
			var lng=0;
			var lat=0;
			// 将地址解析结果显示在地图上,并调整地图视野
			myGeo.getPoint(street_content, function(point){
			if (point) {
				map.centerAndZoom(point,17);
				map.panTo(point);
				var marker=new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{imageOffset: new BMap.Size(0,3)})});
				marker.enableDragging();
				var label=new BMap.Label('拖动改变位置',{offset: new BMap.Size(15,-15)});
				marker.setLabel(label);
				map.addOverlay(marker);
				lng=point.lng;
				lat=point.lat;
				$("#lng").val(lng);
				$("#lat").val(lat);
				//dragend拖拽结束时触发此事件
				marker.addEventListener('dragend',function(e){
					//获取拖动后的坐标位置
					lng=e.point.lng;
					lat=e.point.lat;
					$("#lng").val(lng);
					$("#lat").val(lat);
					window.wxc.xcConfirm(e.point.lng+","+e.point.lat);
				});
			}else{
				window.wxc.xcConfirm("您选择地址没有解析到结果,请手动定位!");
			}
	}, searchArea);
		}
		else{
			window.wxc.xcConfirm("请输入详细地址");
		}
	}
//根据行政区域下拉框的选择定位到相应的城市
	function goToLocation(type)
	{
		
		//省
		if(type==1)
		{
			var province=$('#province option:selected').text();
			map.centerAndZoom(province,8);
		}
		//市
		else if(type==2)
		{
			var city=$('#city option:selected').text();
			map.centerAndZoom(city,12);
		}
		//区、县
		else if(type==3)
		{
			var country=$('#country option:selected').text();
			map.centerAndZoom(country,15);
		}
		
	}
	
function setMapEvent(){
      map.enableScrollWheelZoom();
      map.enableKeyboard();
      map.enableDragging();
      map.enableDoubleClickZoom();
    }
    
//向地图添加控件
 function addMapControl(){
   var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
   scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
   map.addControl(scaleControl);
 }
 
//清除覆盖物
function remove_overlay(){
	map.clearOverlays();         
}

//自定义搜索
function custormSearch()
	{
		function G(id) {
			return document.getElementById(id);
		}
		//建立一个自动完成的对象
		var ac = new BMap.Autocomplete(    
		{"input" : "suggestId"
		,"location" : map
		});

		ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
			var str = "";
			var _value = e.fromitem.value;
			var value = "";
			if (e.fromitem.index > -1) {
				value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			}    
			str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
		
			value = "";
			if (e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			}    
			str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
			G("searchResultPanel").innerHTML = str;
		});

		var myValue;
		ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
			var _value = e.item.value;
			myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
		
			setPlace();
		});

		function setPlace(){
			map.clearOverlays();    //清除地图上所有覆盖物
			function myFun(){
				var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
				map.centerAndZoom(pp, 19);
				map.addOverlay(new BMap.Marker(pp,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap//newresources/images/icon.png",new BMap.Size(20,25),{imageOffset: new BMap.Size(0,3)})}));  //添加标注
				window.wxc.xcConfirm(pp.lng+","+pp.lat);
			}
			var local = new BMap.LocalSearch(map, { //智能搜索
				onSearchComplete: myFun
			});
			local.search(myValue);
		}
	}
	
//下一步	
function goNext(num){
	if(num==1){
		$("#step2").css("display","none");
		$("#step1").css("display","block");
		$(".stepBar").find("img").prop("src","/newresources/images/state2-1.png");
		$(".stepBar").find("span").removeClass("curr");
		$(".stepBar").find(".s1").addClass("curr");
	}else if(num==2){
		$(".stepBar").find("img").prop("src","/newresources/images/state2-2.png");
		$(".stepBar").find("span").removeClass("curr");
		$(".stepBar").find(".s2").addClass("curr");
		saveCertification("提交");//保存信息，可能客户未保存就要提交
	}
}

//银行账号操作
function doBankAccount(){
	var flagForBankAccount = 0;
	var bankAccount = new Array();
	$("#bankTable").find("tr").each(function(index,element){
		var bankAccountItem = {};
		bankAccountItem.accountId = $(element).find("input").eq(2).val();
		bankAccountItem.accountCode = $(element).find("input").eq(1).val();
		bankAccountItem.accountName = $(element).find("input").eq(0).val();
		if(typeof(bankAccountItem.accountName) != "undefined"){
			bankAccount[flagForBankAccount] = bankAccountItem;
			flagForBankAccount++;
		}
	});
	return objectArrayToString(bankAccount);//将js的数组对象转化为String //base.js中
}

//发票抬头
function doInvoiceTitle(){
	var flagForInvoiceTitle = 0;
	var invoiceTitle = new Array();
	$("#invoiceTable").find("tr").each(function(index,element){
		var invoiceTitleItem = {};
		invoiceTitleItem.invoiceTitleId = $(element).find("input").eq(1).val();
		invoiceTitleItem.invoiceTitleName = $(element).find("input").eq(0).val();
		if(typeof(invoiceTitleItem.invoiceTitleName) != "undefined"){
			invoiceTitle[flagForInvoiceTitle] = invoiceTitleItem;
			flagForInvoiceTitle++;
		}
	});
	return objectArrayToString(invoiceTitle);//将js的数组对象转化为String //base.js中
}

//保存信息
function saveCertification(btn){
	var error_str = "";
	var obj;//检测对象

	if(btn == "提交"){
		//避免更新时没有触发更改flag字段
		$("#companyName").trigger("blur");
		$("#companyNature").trigger("change");
		$("#companyClass").trigger("change");
		$("#currency").trigger("change");
		$("#companyMainBussiness").trigger("blur");
		$("#companyCorporate").trigger("blur");
		$("#companyRegFund").trigger("blur");
		$("#companyEstablishDt").trigger("blur");
		
		if(!company_name_flag){
			error_str = "请输入公司名";
			obj = $("#companyName");
		}else if(!company_nature_flag){
			error_str = "请选择公司类型";
			obj = $("#companyNature");
		}else if(!company_class_flag){
			error_str = "请选择公司所属行业";
			obj = $("#companyClass");
		}else if(!currency_flag){
			error_str = "请选择币种";
			obj = $("#currency");
		}else if(!company_main_bussiness_flag){
			error_str = "请输入主营业务";
			obj = $("#companyMainBussiness");
		}else if(!company_corporate_flag){
			error_str = "请输入公司法人";
			obj = $("#companyCorporate");
		}else if(!company_reg_fund_flag){
			if($("#companyRegFund").val() == "")
			{
				error_str = "请输入注册资本";
				obj = $("#companyRegFund");
			}
			else if(!num_reg.test($("#companyRegFund").val())){
				error_str = "请输入数字";
				obj = $("#companyRegFund");
			}
		}else if($("#companyEstablishDt").val() == ""){
			error_str = "请输入创建日期";
			obj = $("#companyEstablishDt");
		}
		
		//定位地图
		if($("#lng").val()==""&&$("#lat").val()==""){
			window.wxc.xcConfirm("请先定位到地图",confirm);
			return "error";
		} 
	}
	
	//保存时的验证
	if($("#companyName").val() == ""){
		error_str = "请输入企业名称";
		obj = $("#companyName");
	}
	if($("#companyRegFund").val() != "" && !num_reg.test($("#companyRegFund").val())){
		error_str = "请输入数字";
		obj = $("#companyRegFund");
	}
	
	if(error_str!=""){//错误信息显示
		$(obj).nextAll(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
		$(obj).nextAll(".info_explain_wrap").fadeIn("fast");
		$(obj).focus();
		return "error";
	}else{
		$(obj).nextAll(".info_explain_wrap").fadeOut("fast");
	} 
	
/* 	//验证银行账号是否为空
 	var bankList = $("#bankTable").find("tr");
	for(var i = 0; i < bankList.length-1; i++){
		var bankElement1 = bankList.eq(i).find("td:first").find("input");
		var bankElement2 = bankList.eq(i).find("td:eq(1)").find("input");
		
		if(!bankElement1.val()||!bankElement2.val()){//为空判定
			error_str = "抬头不能为空";
			bankList.eq(i).find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
			bankList.eq(i).find("td:last").find(".info_explain_wrap").fadeIn("fast");
			bankElement2.focus();
			return "error";
		}
	} */
	
/* 	//验证抬头发票是否为空
 	var invoiceList = $("#invoiceTable").find("tr");
	for(var i = 0; i < invoiceList.length-1; i++){
		var invoiceElement = invoiceList.eq(i).find("td:first").find("input");
		if(!invoiceElement.val()){//为空判定
			error_str = "抬头不能为空";
			invoiceList.eq(i).find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
			invoiceList.eq(i).find("td:last").find(".info_explain_wrap").fadeIn("fast");
			invoiceElement.focus();
			return "error";
		}
	} */
	
	//获取基本信息
	var companyName= $("#companyName").val();
	var companyCorporate= $("#companyCorporate").val();
	var companyEstablishDt= $("#companyEstablishDt").val();
	var companyRegFund= $("#companyRegFund").val();
	//var contactAddr= $("#contactAddr").val();
	//var contactAddrCode= $("#country").val();
	var lng=$("#lng").val();
	var lat=$("#lat").val();
	//var companyPhone= $("#companyPhone").val();
	var companyMainBussiness= $("#companyMainBussiness").val();
	//var companyIntroduction= $("#companyIntroduction").val();
	var companyNature = $("#companyNature").val();//企业类型
	var companyClass = $("#companyClass").val();//所属行业
	var currency = $("#currency").val();//币种
	
	var params = {};
	$("#industryName").find("input").each(function(index,element){//经营模式
		if($(element)[0].checked){
			params.industryName = $(element).val();
		}
	});
	
	if(btn == ("提交")){
		params.saveOrSubmit = 1;
	}else{
		params.saveOrSubmit = 0;
	}
	params.companyId= companyId;
	params.cpynameCn= companyName;
	params.companyCorporate= companyCorporate;
	params.companyEstablishDt= companyEstablishDt;
	params.companyRegFund= companyRegFund;
	params.lng = lng;//经度
	params.lat = lat;//纬度
	params.companyMainBussiness= companyMainBussiness;
	params.companyNature = companyNature;
	params.companyClass = companyClass;
	params.currency = currency;
	params.attched = doAttched();//公司证照
	params.delUpdateFileIds=delUpdateFileIds.join(",");
	//params.contactAddr= contactAddr;
	//params.contactAddrCode= contactAddrCode;
	//params.fPhone= companyPhone;
	//params.companyIntroduction= companyIntroduction;
	
	//params.bankAccount = doBankAccount();//银行账号
	//params.invoiceTilte = doInvoiceTitle();//发票抬头
	var url = "supplierForPlateForm/saveAuthcationUpdateInfo.do";
	var isasync = true;
	var fn = function(result){
				if(btn==("提交")){
					if(result.success==true){//成功后无需提示 跳转页面
						$("#regEmail").html(userInfo.reg_email);
						$("#step1").css("display","none");
						$("#step2").css("display","block");
// 						$(".stepInfo_wrap").find('.step_index').eq(1).css("background-color","#ff9900");
// 						$(".step_bar_curr").width(1024);
						$(".stepBar").find("img").prop("src","/newresources/images/state2-2.png");
						$(".stepBar").find("span").removeClass("curr");
						$(".stepBar").find(".s2").addClass("curr");
					}else{
						window.wxc.xcConfirm("提交失败","error");
					}
				}else{
					if(result.success==true){
						xcconfirm = new window.wxc.xcConfirm("保存成功","success");
						closeBytimeCount(2);//两秒后自动关闭
					}else{
						window.wxc.xcConfirm("保存失败","error");
					}
				}
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

function go_index(url)
{
	window.location.href="/index.jsp";
}
//公司证照操作
function doAttched(){
		var flagForAttched = 0;
		var fileTypeId=18;
		var attched = new Array();
		$("#company_licenses_pic").find("img:lt(4)").each(function(index,element){
			var id;
			var mogodb_id;
			var srcStr=$(element).attr("src");
			if(srcStr!="/newresources/images/uploadImg.png"){
				mogodb_id=srcStr.substring(srcStr.indexOf("=")+1);
			}
			var str=$(element).next().next().children().attr("onclick");
			if(str!=null&&str!=""){
				id=str.substring(str.indexOf(",")+1,str.length-1);
			}
			var attchedItem = {};
			attchedItem.id = id;
			attchedItem.mogodbId = mogodb_id;
			attchedItem.fileTypeId = fileTypeId;
			if(fileTypeId==18){
				attchedItem.isUpdate=updateForBusiness;
			}else if(fileTypeId==19){
			 	attchedItem.isUpdate=updateForTaxe;
			}else if(fileTypeId==20){
				attchedItem.isUpdate=updateForOrganization;
			}else if(fileTypeId==21){
				attchedItem.isUpdate=updateForTaxpayer;
			}
			if(typeof(attchedItem.id) != "undefined" && typeof(attchedItem.mogodbId) != "undefined"){
				attched[flagForAttched] = JSON.stringify(attchedItem);//将对象转化为字符串
				flagForAttched++;
			}
			fileTypeId++;
		});
		return attched.toString();//返回数据对象的string格式
}
//上传后显示图片 mishengliang
function showPicForUpdate(obj){
		var fileType,fileName,fileElementId;//文件类型,文件名字,文件上传inputId
		var defaultUploadImage = $(obj).prev().find("img").attr("src");
		var imageId = $(obj).prev().find("img").attr("id");
	if(defaultUploadImage == "/newresources/images/uploadImg.png" || defaultUploadImage == "/newresources/images/uploadlogo.png" || defaultUploadImage == "/newresources/images/uploadfigure.png"){
		if(imageId=="business_licence"){
			updateForBusiness=0;
		}else if(imageId=="tax_registration_certificate"){
			updateForTaxe=0;
		}
		else if(imageId=="organization_code_certificate"){
			updateForOrganization=0;
		}
		else if(imageId=="taxpayer_qualification_certification"){
			updateForTaxpayer=0;
		}
	}else{
		if(imageId=="business_licence"){
			updateForBusiness=1;
		}else if(imageId=="tax_registration_certificate"){
			updateForTaxe=1;
		}
		else if(imageId=="organization_code_certificate"){
			updateForOrganization=1;
		}
		else if(imageId=="taxpayer_qualification_certification"){
			updateForTaxpayer=1;
		}
	}
		if($(obj).attr("id") == "business_licence_pic"){//营业执照
			filename=$("#business_licence_pic").val();
			fileElementId = "business_licence_pic";
			fileType = 18;
		}else if($(obj).attr("id") == "tax_registration_certificate_pic"){//税务登记证
			filename=$("#tax_registration_certificate_pic").val();
			fileElementId = "tax_registration_certificate_pic";
			fileType = 19;
		}else if($(obj).attr("id") == "organization_code_certificate_pic"){//组织机构代码证
			filename=$("#organization_code_certificate_pic").val();
			fileElementId = "organization_code_certificate_pic";
			fileType = 20;
		}else if($(obj).attr("id") == "taxpayer_qualification_certification_pic"){//纳税人资格证书
			filename=$("#taxpayer_qualification_certification_pic").val();
			fileElementId = "taxpayer_qualification_certification_pic";
			fileType = 21;
		}
		
	   	var fileStartIndex=filename.lastIndexOf("\\");// 反斜杠\ 需要转译
		var fileEndIndex=filename.lastIndexOf(".");
		//原始上传文件名称
		var origfilename=filename.substring(fileStartIndex+1,fileEndIndex);
	   if(origfilename){
			var fileurl = "PfTaskFileCtrl/addOrUpdateTaskImgFileForUpdate.do";
			var params = {};
			params.auth_update_id=auth_update_id;
			params.auth_update_state=auth_update_state;
			params.fileType=fileType;
			params.companyId=companyId;
			params.fileName=origfilename;
			params.formatType="image";
			var fn = function(data){
					    if (data.success==true && data.message=="上传成功") {  
		        		var newsrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+data.mongodbId;
		        		if(fileType == 18){
		        		$("#business_licence").parent().find("div").remove();
			        		$("#business_licence").attr("src",newsrc);
							var del="<div class='a_bg'></div>"
									+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delUpdateAttached(this,"+ data.fileId +")'>删除</a></div>";
		    				$("#business_licence").parent().append(del);
		        		}else if(fileType == 19){
		        		$("#tax_registration_certificate").parent().find("div").remove();
		        			$("#tax_registration_certificate").attr("src",newsrc);
							var del="<div class='a_bg'></div>"
									+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delUpdateAttached(this,"+ data.fileId +")'>删除</a></div>";
		    				$("#tax_registration_certificate").parent().append(del);
		        		}else if(fileType == 20){
		        		$("#organization_code_certificate").parent().find("div").remove();
		        			$("#organization_code_certificate").attr("src",newsrc);
							var del="<div class='a_bg'></div>"
									+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delUpdateAttached(this,"+ data.fileId +")'>删除</a></div>";
		    				$("#organization_code_certificate").parent().append(del);
		        		}else if(fileType == 21){
		        		$("#taxpayer_qualification_certification").parent().find("div").remove();
		        			$("#taxpayer_qualification_certification").attr("src",newsrc);
							var del="<div class='a_bg'></div>"
									+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delUpdateAttached(this,"+ data.fileId +")'>删除</a></div>";
		    				$("#taxpayer_qualification_certification").parent().append(del);
		        		}
		            }else{
		            	window.wxc.xcConfirm(data.message);
		            }
			};
		    addInputUtilFile(fileurl,params,fileElementId,fn);
		}        
}
</script>
</head>

<body class="bg_grey">
<!--顶端-->
<div id="top">
</div>
<!--中间-->
<div class="midd_wrap">
	<div class="div_1024_c_wrap">
		<div class="curr_page_title_wrap">变更申请</div>
		<div class="title_remark_wrap">
			<p id="tip_message"></p>
		</div>
		<div class="midd_inner_wrap">
			<!--操作步骤条开始-->
			<!-- <div class="div_w1024_c">
				<div class="stepBar_wrap">
					<div class="step_bar">
							<div class="step_bar_curr"></div>
					</div>	
					<div class="stepInfo_wrap clearfix" >
						<div class="stepInfo_inner">
							<span class="step_text">变更认证信息</span>
							<div class="step_index_wrap"><span class="step_index">1</span></div>
						</div>
						<div class="stepInfo_inner">
							<span class="step_text">等待审核</span>
							<div class="step_index_wrap"><span class="step_index">2</span></div>
						</div>
					</div>	
				</div>
			</div> -->
			<div class="stepBar">
				<div class="stepBarTip"><span class="curr s1">变更认证信息</span><span class="ml340 s2">等待审核</span></div>
				<img class="ml10 mt10" src="/newresources/images/state2-1.png">
			</div>
			<!--操作步骤条结束-->
			<div id="step1" class="step_wrap ml260" style="display:block; margin-top:0px;">
				<div style="text-align:right; color:#9e9e9d; height:24px;margin-right:270px;"><span class="redcolor">*</span>为必填项</div>
				<div class="certification_form_wrap">
					
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">
							企业名称<span class="no_empty">*</span>
						</div>
						
						<input id="companyName" type="text" class="input_wrap" size="50" readOnly="readOnly"/>
						<div class="info_explain_wrap" ></div>
					</div>
					
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">
							企业类型<span class="no_empty">*</span>
							</div>
						
						<select id="companyNature" name="company_nature" class="select_wrap">
							<option value="0">--请选择--</option>
						</select>
						<div class="info_explain_wrap" ></div>
					</div>
					<div id="industryName" class="inner_line_wrap clearfix">
						<div class="label_wrap">
							经营模式<span class="no_empty">*</span>
							</div>
						
						<label class="checkbox_wrap"><input name="company_industry" class="input_checkbox"  type="radio" value="1" checked="checked" />生产型</label>
						<label class="checkbox_wrap"><input name="company_industry" class="input_checkbox" type="radio" value="2" />贸易型</label>
						<label class="checkbox_wrap"><input name="company_industry" class="input_checkbox" type="radio" value="3" />服务型</label>
						<label class="checkbox_wrap"><input name="company_industry" class="input_checkbox" type="radio" value="4" />其他机构</label>
						<div class="info_explain_wrap" ></div>
					</div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">
							所属行业<span class="no_empty">*</span>
							</div>
						
						<select id="companyClass" name="company_class" class="select_wrap">
							<option value="0">--请选择--</option>
						</select>
						<div class="info_explain_wrap"></div>
					</div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">
							主营业务<span class="no_empty">*</span>
							</div>
						
						<input id="companyMainBussiness" type="text" class="input_wrap" size="50" />
						<div class="info_explain_wrap"></div>
					</div>
					
					<div class="div_dashed"></div>
					
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">
							法人代表<span class="no_empty">*</span>
							</div>
						
						<input id="companyCorporate" type="text" class="input_wrap" size="50" />
						<div class="info_explain_wrap"></div>
					</div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">
							注册资本<span class="no_empty">*</span>
						</div>
						
						<select id="currency" name="currency" style="width:110px;" class="select_wrap">
							<option value="0">--请选择--</option>
						</select>
						<input id="companyRegFund" type="text" style=" width:100px;" class="input_wrap ml-1" size="50" />
						<span class="f_l mt10 ml10">万</span>
						<div class="info_explain_wrap"></div>
					</div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">
							成立日期<span class="no_empty">*</span>
							</div>
						
						<input id="companyEstablishDt" type="text" onClick="WdatePicker({position:{left:152,top:0},readOnly:true})" class="input_wrap Wdate"/>
						<div class="info_explain_wrap"></div>
					</div>
					<!--
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">
							联系地址<span class="no_empty">*</span>
							</div>
						
						<select id="province" name="province" class="city_select_wrap" >
						 <option value="0">--请选择省份--</option>
					</select>  
					<select id="city" name="city"  class="city_select_wrap" >
						 <option value="0">--请选择城市--</option>
					</select>  
					<select id="country" name="county" class="city_select_wrap">
						<option value="0">--请选择区--</option>
					</select>
					<div class="info_explain_wrap" ></div>
					</div>
					<div class="mask"></div>
					<input type="hidden" id="lng"/>
					<input type="hidden" id="lat"/>
					<div class="inner_line_wrap pos_relative clearfix">
						<div class="label_wrap"></div>
						<input type="text" id="contactAddr" class="input_wrap" style="width:250px;" size="100" placeholder="请输入详细地址" />
						<a class="remarkMap_a" href="javascript:void(0)" onClick="theLoaction()"><img src="/newresources/images/map1.png" />定位到地图</a>
						<div class="info_explain_wrap" ></div>
						<div id="allmap" class="map_wrap"></div>
						<a id="remove_overlay" href="javascript:void(0)"  onclick="remove_overlay()">取消定位</a>
						<a href="javascript:void(0)" id="close_map" title="关闭窗口" class="close_btn" onClick="close_map(this)">X</a>
						<div id="r-result" style="display:none;" >定位搜索:<input type="text" id="suggestId" size="20" value=""  /></div>
						<div id="searchResultPanel"></div>
					</div>
					-->
					<!--
 					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">联系电话<span class="no_empty">*</span></div>
						<input id="companyPhone" type="text" class="input_wrap" size="50" />
						<div class="info_explain_wrap"></div>
					</div> 
					-->
					<div class="div_dashed display_none"></div>
					<div class="inner_line_wrap clearfix display_none">
						<div class="label_wrap">银行账号<span class="no_empty">*</span></div>
						
						<table class="block_table" id="bankTable">
							<tr id="bank_row1">
								<td>
									<input id="bankName1" type="text"   placeholder="开户银行" />
								</td>
								<td>
									<input id="bankAccount1" type="text"  placeholder="银行账号" />
								</td>
								<td><img src="/newresources/images/del.png"  onClick="delBankRow(this,1)"/></td>
								<td class="redcolor"></td>
								<td style="dispaly:none;">
									<input id="bank_id1" type="hidden" value="-1">
								</td>
								<td>
									<div class="info_explain_wrap" ></div>
								</td>
							</tr>
							<tfoot>
								<tr ><td><a onClick="addBankRow('bankTable')"><img src="/newresources/images/add.png" />添加</a></td></tr>
							</tfoot>
						</table>
					</div>
					
					<div class="inner_line_wrap clearfix display_none">
						<div class="label_wrap">发票抬头<span class="no_empty">*</span></div>
						
						<table class="block_table" id="invoiceTable">
							<tr id="invoice_row1">
								<td>
									<input id="invoiceHead1" type="text" style="width:450px;" value=""/>
								</td>
								<td><img src="/newresources/images/del.png"  onClick="delInvoiceRow(this,1)"/></td>
								<td class="redcolor"></td>
								<td style="dispaly:none;">
									<input id="invoice_id1" type="hidden" value="-1">
								</td>
								<td>
									<div class="info_explain_wrap" ></div>
								</td>
							</tr>
							<tfoot>
								<tr><td><a onClick="addInvoiceRow('invoiceTable')"><img src="/newresources/images/add.png" />添加</a></td></tr>
							</tfoot>
						</table>
					</div>
					<div class="div_dashed"></div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">公司证照<span class="no_empty">*</span></div>
						
						<div id="company_licenses_pic" class="business_licenses_wrap">
							<div class="f_l_wrap">
								<div class="image_block_pic">
									<a><img id="business_licence" src="/newresources/images/uploadImg.png" /></a>
									<input type="file" id="business_licence_pic" class="uploadfile_input" name="file" onChange="showPicForUpdate(this)" />
								</div>
								<div class="img_block_text">
									<p class="title_text">营业执照</p>
									<p class="desc_text">(建议图片大小3M以内)</p>
								</div>
							</div>
							<div class="f_l_wrap"> 
								<div class="image_block_pic">
									<a><img id="tax_registration_certificate" src="/newresources/images/uploadImg.png" /></a>
									<input type="file" id="tax_registration_certificate_pic" class="uploadfile_input" name="file" onChange="showPicForUpdate(this)" />
								</div>
								<div class="img_block_text">
									<p class="title_text">税务登记证</p>
									<p class="desc_text">(建议图片大小3M以内)</p>
								</div>
							</div>
							<div class="f_l_wrap">
								<div class="image_block_pic">
									<a><img id="organization_code_certificate" src="/newresources/images/uploadImg.png" /></a>
									<input type="file" id="organization_code_certificate_pic" class="uploadfile_input" name="file" onChange="showPicForUpdate(this)" />
								</div>
								<div class="img_block_text">
									<p class="title_text">组织机构代码证</p>
									<p class="desc_text">(建议图片大小3M以内)</p>
								</div>
							</div>
							<div class="f_l_wrap">
								<div class="image_block_pic">
									<a><img id="taxpayer_qualification_certification" src="/newresources/images/uploadImg.png" /></a>
									<input type="file" id="taxpayer_qualification_certification_pic" class="uploadfile_input" name="file" onChange="showPicForUpdate(this)" />
								</div>
								<div class="img_block_text">
									<p class="title_text">纳税人资格证书</p>
									<p class="desc_text">(建议图片大小3M以内)</p>
								</div>
							</div>
							<div class="company_license_tip"><img src='/newresources/images/new/er.png' /><span class='redcolor'>请至少输入一项公司证照</span></div>
						</div>
					</div>
					<!--
 					<div class="div_dashed"></div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">企业简介<span class="no_empty_introduce">*</span></div>
						<div class="company_intro_tip"><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入企业简介</span></div>
						<div class="company_simple_descript_tip" style="margin-right:180px;">总共可以输入<span class="redcolor">400</span>个字,剩余<span id="remain_words_num" class="redcolor">400</span>个字</div>	
					</div> 
					<textarea id="companyIntroduction" class="company_simple_descript" style="width:600px;"></textarea>
					-->
					
					<div class="company_opreate_btn_wrap">
						<button class="company_operate_btn" onClick="saveCertification()">保存</button>&nbsp;
						<button class="company_submit_btn" onClick="goNext(2)">提交等待审核</button>
					</div>
				</div>
				<!--step1中的认证信息结束-->
			</div>
			<!--step1结束-->
			<!--step2开始-->
			<div id="step2" class="step_wrap" style="display:none; width:710px;">
				<div class="mt10"></div>
				<p class="b lh200 t_algin_r" style="font-size:13px;margin-right:170px;">
					<img src="/newresources/images/accounManage/pass.png" class="mr5"/>提交成功
				</p>
				<p style="color:#777;margin-right:120px;" class="mt20 t_algin_r">我们将在24小时内回复审核结果</p>
				<p class="t_algin_r mr20 mt20">
					<!-- <a class="mr10" onClick="goNext(1)" href="javascript:void(0)">返回修改</a> -->
					<button class="goToCenter" onclick="location='/supplierForPlateForm/registerInfo.htm'">返回企业中心</button>
				</p>
			</div>
			<!--step2结束-->
		</div>
		<!--midd_inner_wrap结束-->
	</div>
</div>
<!--中间层结束-->
<!--底端-->
<div id="bottom"></div>
</body>
</html>
