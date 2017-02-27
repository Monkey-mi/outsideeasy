<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>入驻认证</title>
<link href="/newresources/css/page.css" rel="stylesheet">
<link href="/newresources/css/companyinfo.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet">
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="/newresources/js/cityOperate.js"></script>
<script type="text/javascript" src="/newresources/js/currency.js"></script>
<script type="text/javascript" src="/usercenter/companyManage/js/companyInfo.js"></script>
<script type="text/javascript" src="/newresources/js/companyClass.js"></script>
<script type="text/javascript" src="/newresources/js/companyNature.js"></script>
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=4i6arTpbQQ1MfIcFRuoHyXKc"></script>
<script type="text/javascript">
var currencys={};
var province={};
var city={};
var country={};
var map;
var lngForAll;//公司经度
var latForAll;//公司纬度
var companyId=getParamFromWindowName("companyIdForCertification");//公司ID
var isUpdate=0;//0 || null 增加,1 更新
//审核状态
var applyState;
//电话正则
var phone_reg= /^((\+?86)|(\(\+86\)))?\d{3,4}-\d{7,8}(-\d{3,4})?$/;///^((\+?86)|(\(\+86\)))?(1[3|4|5|8]\d{9})|?\d({3,4}-\d{7,8}(-\d{3,4})))$/;
//数字正则
var num_reg =/^(\d+(\.\d+)?)?$/;
//企业名称
var company_name_flag=false;
//法人代表
var company_corporate_flag=false;
//注册资本
var company_reg_fund_flag=false;
//成立日期
var company_establish_dt_flag=false;
//联系电话
var company_phone_flag=false;
//详细地址
var contact_addr_flag=false;
//公司简介
var company_simple_descript_flag=false;
//企业类型
var company_nature_flag = false;
//所属行业
var company_class_flag = false;
//币种
var currency_flag = false;
//主营业务
var company_main_bussiness_flag = false;
//地址选择
var company_province_city_distinct_flag = false;

var save_certification_flag=true;//保存标记，防止多次保存

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
	//$("#invoiceHead1").val(userInfo.cpyname_cn);
	$(".input_wrap").on("focus",function(){
			var id=$(this).attr("id");
			var info_str="";
			if(id=="companyName")
			{
				info_str="请填写在工商局注册的企业名全称";
			}
			else if(id=="companyCorporate")
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
					if($(this).next().val()!=$(this).val()){
						if(checkCompanyName($(this).val())){
							error_str="企业名称已存在";
							company_name_flag=false;
						}else{
							company_name_flag=true;
						}
					}else{
						company_name_flag=true;
					}
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
			else if(id=="companyPhone")
			{
				if($(this).val()=="")
				{
					error_str="请输入联系电话";
					company_phone_flag=false;
				}
				else
				{
					if(!phone_reg.test($(this).val()))
					{
						error_str="请输入正确的联系电话格式";
						company_phone_flag=false;
					}
					else
					{
						company_phone_flag=true;
					}
				}
			}
			else if(id=="contactAddr")
			{
				if($(this).val()=="")
				{
					// error_str="请输入详细地址";
					contact_addr_flag=false;
				}
				else
				{
					contact_addr_flag=true; 
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
			}
			else if(id=="currency")
			{
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
		
		//企业简介验证是否为空 mishengliang
		$("#companyIntroduction").on("blur",function(){
			var id=$(this).attr("id");
			var error_str="";
			
			if(id=="companyIntroduction")
			{
				if($(this).val()=="")
				{
					$(".company_intro_tip").css("display","block");
					company_simple_descript_flag=false;
				}
				else
				{
					$(".company_intro_tip").css("display","none");
					company_simple_descript_flag=true;
				}
			}
			if(error_str!=""){//错误信息显示
				$(this).attr("placeholder","企业简介不能为空");
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
	//加载省
	province=ChineseDistricts[86];
	$.each(province,function(code,address){
		var option="<option value='"+code+"'>"+address+"</option>";
		$("#province").append(option);
	});
	//加载市
	$("#province").change(function(){
		var province_code=$(this).val();
		if(province_code!=null&&province_code!='0'){
			$("#city").css("display","block");
			city=ChineseDistricts[province_code];
			
			if(city!=null&&city!=undefined){//有子级
				//清空除了第一条以外的数据
				$("#city option:gt(0)").remove();
				$.each(city,function(code,address){
					var option="<option value='"+code+"'>"+address+"</option>";
					$("#city").append(option);
				});
				
				if($("#city").val() == 0){//判断是否选择市级
					district_error_str = "请选择市级地区";
					$("#country option:gt(0)").remove();
					company_province_city_distinct_flag = false;
				}
			}else{//无子级
				$("#city").css("display","none");
				$("#country").css("display","none");
				$(this).nextAll(".info_explain_wrap").fadeOut("fast");
				district_error_str = "";
				company_province_city_distinct_flag = true;
			}
		}else{//未选择省级
			district_error_str = "请选择省级地区";
			$("#city option:gt(0)").remove();
			$("#country option:gt(0)").remove();
			company_province_city_distinct_flag = false;
		}
		
		if(district_error_str != ""){
			//$(this).nextAll(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+district_error_str+"</span>");
			//$(this).nextAll(".info_explain_wrap").fadeIn("fast");			
		}
	});
	//加载区/县
	$("#city").change(function(){
		var city_code=$(this).val();
		
		if(city_code!=null&&city_code!='0'){//城市有选择
			$("#country").css("display","block");
			countrys=ChineseDistricts[city_code];
			
			//有子级
			if(countrys!=null&&countrys!=undefined){
				//清空除了第一条以外的数据
				$("#country option:gt(0)").remove();
				$.each(countrys,function(code,address){
					var option="<option value='"+code+"'>"+address+"</option>";
					$("#country").append(option);
				});
				
				if($("#country").val() == 0){//判断是否选择市级
					district_error_str = "请选择区级地区";
					company_province_city_distinct_flag = false;
				}
			}else{//无子级
				$("#country").css("display","none");
				$(this).nextAll(".info_explain_wrap").fadeOut("fast");
				district_error_str = "";
				company_province_city_distinct_flag = true;
			}
		}else{//城市无选择
			district_error_str = "请选择市级地区";
			$("#country option:gt(0)").remove();
			company_province_city_distinct_flag = false;
		}
		
		if(district_error_str != ""){
			//$(this).nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+district_error_str+"</span></div>");
			//$(this).nextAll(".info_explain_wrap").fadeIn("fast");
		}
	});
	
	$("#country").change(function(){
		if($(this).val() != 0){
			$(this).nextAll(".info_explain_wrap").fadeOut("fast");
			company_province_city_distinct_flag = true;
		}else{
			company_province_city_distinct_flag = false;
		}
	});
	if(applyState==null){
		$("#company_licenses_pic").removeClass("display_none");//公司证照显示
	}
	if(companyId!=null&&companyId!=0){
		getBaseInfo();//显示认证信息
		picPathSrc1(18,"#business_licence");//营业执照  //base.js中 
		picPathSrc1(19,"#tax_registration_certificate");//税务登记
		picPathSrc1(20,"#organization_code_certificate");//组织机构代码证
		picPathSrc1(21,"#taxpayer_qualification_certification");//纳税人资格证书 
	}
	companyIntroductionLimit();//公司简介字数的计算和限制
});

//检测状态，状态位正在审核，显示step2
function checkStateForStep(){
	var urlForApplySts = "supplierForPlateForm/getApplyStsByCompanyId.do";
	var companyIdForApplySts = companyId;
	var paramsForApplySts = {};
	paramsForApplySts.companyId = companyIdForApplySts;
	var fn = function(result){
		applyState = result.applySts;//设置全局申请状态
		if(result.applySts == 5){//正在审核
			$("#regEmail").html(getUserInfo1().account_email);//提示已发送的注册邮箱
			$("#step1").css("display","none");
			$("#step2").css("display","block");
			$(".stepInfo_wrap").find('.step_index').eq(1).css("background-color","#ff9900");
			$(".step_bar_curr").width(1024);
			$(".stepBar").find("img").prop("src","/newresources/images/state2-2.png");
			$(".stepBar").find("span").removeClass("curr");
			$(".stepBar").find(".s2").addClass("curr");
		}else if(applyState == 15){//如果审核已通过，则跳转到基本信息页面
			window.location.href=getwebroot()+"usercenter/companyManage/baseInfo.html";
		}
	};
	
	asyncAjaxMethod(urlForApplySts,paramsForApplySts,false,fn);//判断申请状态，如果正在审核，则显示Step2
}

//公司简介字数计算及限制
function companyIntroductionLimit(){
	$("#companyIntroduction").keyup(function(){
		var descriptLength = $("#companyIntroduction").val().length;
		if(descriptLength > 400){
			var descriptLimit = $("#companyIntroduction").val().substring(0,400);
			$("#companyIntroduction").val(descriptLimit);
		}else { 
			$("#remain_words_num").text(400-$("#companyIntroduction").val().length); 
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
	var url = "supplierForPlateForm/getCompanyInfoByCompanyId1.do";
	var params = {};
	params.companyId=companyId;
	var isasync = true;
	var fn = function(result){
		if(result.success){
		companyData = result.data;
 		var companyBaseInfo = companyData.companyBaseInfo;//公司基础信息 
 		var compnayExtraInfo = companyData.compnayExtraInfo;//公司附加信息
 		
 		if(applyState == 20 && compnayExtraInfo.auth_opinion != null && compnayExtraInfo.auth_opinion != ""){//未审核通过
 			$("#tip_message").html("审核结果：未通过，"+"<br/>审核意见："+compnayExtraInfo.auth_opinion+"<br/><span class='ml85'>请修改后重新提交。</span>");
 			$("#company_licenses_pic").prev(".div_dashed").removeClass("display_none");//分割线显示
 			$("#company_licenses_pic").removeClass("display_none");//公司证照显示
 		}else if(applyState == 15){//此条件下为 冗余代码
 			$("#tip_message").html("认证已通过");
 			$("#companyIntroduction").next(".company_opreate_btn_wrap").addClass("display_none");//提交按钮不显示
 			$("#step_banner").addClass("display_none");//审核进度条显示 
 		}else{
 			$("#tip_message").html("请完成认证，入驻outsideasy.com");
 			$("#company_licenses_pic").prev(".div_dashed").removeClass("display_none");//分割线显示
 			$("#company_licenses_pic").removeClass("display_none");//公司证照显示
 		}
 		
		$("#companyName").val(companyBaseInfo.cpyname_cn);//企业名称
		$("#oldCompanyName").val(companyBaseInfo.cpyname_cn);//保存原企业名称
		$("#companyCorporate").val(companyBaseInfo.corporation);//法人代表
		$("#companyEstablishDt").val(showBeforeOfDateStr(companyBaseInfo.establish_dt));//成立日期
		$("#companyRegFund").val(companyBaseInfo.reg_fund);//注册资本
		$("#contactAddr").val(companyBaseInfo.contact_addr);//注册地址
		$("#contactAddrPro").val(companyBaseInfo.contact_addr);//注册地址
		$("#companyPhone").val(companyBaseInfo.f_phone);
		$("#companyMainBussiness").val(companyBaseInfo.key_remark);//主营业务
		if(companyBaseInfo.lng != 0 && companyBaseInfo.lat != 0){//为0的话不给经纬度赋值
			$("#lng").val(companyBaseInfo.lng);//经度
			$("#lat").val(companyBaseInfo.lat);//纬度
			lngForAll = companyBaseInfo.lng;
			latForAll = companyBaseInfo.lat;
		}
		
		//省、市、县各级代码
		var provinceNum = Math.floor(parseInt(companyBaseInfo.contact_addr_code)/10000)*10000;
		var cityNum = Math.floor(parseInt(companyBaseInfo.contact_addr_code)/100)*100;
		var countryNum = companyBaseInfo.contact_addr_code;
		
		/*模拟change事件  */
		if(!isNaN(provinceNum)){
			$("#province").val(provinceNum).trigger("change");//设置省级行政区
			$("#city").val(cityNum).trigger("change");//设置市级行政区
			$("#country").val(countryNum).trigger("change");//设置县级行政区
		}
		
		if(companyBaseInfo.nature_id!=null){//加载企业类型
				$("#companyNature").val(companyBaseInfo.nature_id);
		}
		if(companyBaseInfo.class_id!=null){//加载所属行业
				$("#companyClass").val(companyBaseInfo.class_id);
		}
		
		if(companyBaseInfo.currency_id!=null){//加载币种
				$("#currency").val(companyBaseInfo.currency_id);
		}
		if(companyBaseInfo.industry_id == null){
			$("[name = company_industry]:radio").eq(0).attr("checked",true);//经营模式复选框
		}else if(companyBaseInfo.industry_id == "1"){
			$("[name = company_industry]:radio").eq(0).attr("checked",true);//经营模式复选框
		}else if(companyBaseInfo.industry_id == "2"){
			$("[name = company_industry]:radio").eq(1).attr("checked",true);//经营模式复选框
		}else if(companyBaseInfo.industry_id == "3"){
			$("[name = company_industry]:radio").eq(2).attr("checked",true);//经营模式复选框
		}else if(companyBaseInfo.industry_id == "4"){
			$("[name = company_industry]:radio").eq(3).attr("checked",true);//经营模式复选框
		}
		
		//展示银行账号
		bankAccount = compnayExtraInfo.bankAccount;
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
		}
		
		//展示发票抬头
		invoiceTitles = compnayExtraInfo.invoiceTitles;
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
		}
		
		$("#companyIntroduction").val(companyBaseInfo.company_introduction);//企业简介
		$("#remain_words_num").text(400-$("#companyIntroduction").val().length);//剩余输入字数
		
		bankAndInvoiceCheck();
		}
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
		$("#top").load(getwebroot()+"platform/top2.html #topPage",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success"){
				$(".dologin a").hide();
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	}
}

var bank_rowCount=1;
//添加银行账号行
function addBankRow(table_id)
{
	 if($("#bankName"+ bank_rowCount +"").val()==""||$("#bankAccount"+ bank_rowCount +"").val()==""){
		$("#bankName"+ bank_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入银行账号信息"+"</span>");
		$("#bankName"+ bank_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
		return;
	}  else{
		$("#bankName"+ bank_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
	} 
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
			bankAccount_delIds.push(bank_id);
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
	if($("#invoiceHead"+ invoice_rowCount +"").val()==""){
		$("#invoiceHead"+ invoice_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入发票抬头"+"</span>");
		$("#invoiceHead"+ invoice_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
		return;
	}  else{
		$("#invoiceHead"+ invoice_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
	}
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
//删除发票抬头
function delInvoiceRow(obj,invoice_rowCount)
{
	var invoice_id= $(obj).parent().parent().find("#invoice_id"+invoice_rowCount).val();
	
	if(invoice_id!=null&& invoice_id!="")
	{
		invoiceTitle_delIds.push(invoice_id);
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
		//var province=$('#province option:selected').text();
		var city=$('#city option:selected').text();
		var country=$('#country option:selected').text();
		
		var street_content=$("#contactAddr").val();
		var street_content_pro=$("#contactAddrPro").val();
		
		if($('#country option:selected').val()==''||$('#country option:selected').val()==0){
			if($('#city option:selected').val()==''||$('#city option:selected').val()==0){
				var option ={hasTitle:true,title:"提示",btn:''};
				xcconfirm=new window.wxc.xcConfirm("请选择城市",window.wxc.xcConfirm.typeEnum.custom,option);
				return;
			}else{
				searchArea=city;
			}
		}else{
			searchArea=city;
		}
		if(street_content!=''){
			$(".mask").css("display","block");
			$("#allmap").css("display","block");
			$("#close_map").css("display","block");
			remarkMap();
			remove_overlay();
			$("#remove_overlay").css("display","block");
			// 创建地址解析器实例
			var myGeo = new BMap.Geocoder();
			var lng=0;
			var lat=0;
			// 将地址解析结果显示在地图上,并调整地图视野
			myGeo.getPoint(street_content, function(point){
 				if(lngForAll != 0 && latForAll != 0 && lngForAll != null && latForAll != null  && street_content == street_content_pro){//如果存在数据，构造新的点
					point = new BMap.Point(lngForAll, latForAll);
				} 
				if (point){
					map.centerAndZoom(point,17);
					map.panTo(point);
					var marker=new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{imageOffset: new BMap.Size(0,3)})});
					marker.enableDragging();
					var label=new BMap.Label('拖动改变位置',{offset: new BMap.Size(15,-15)});
					marker.setLabel(label);
					map.addOverlay(marker);
					lng=point.lng;
					lat=point.lat;
					lngForAll=lng;
					latForAll=lat;
					$("#lng").val(lng);
					$("#lat").val(lat);
					//dragend拖拽结束时触发此事件
					marker.addEventListener('dragend',function(e){//获取拖动后的坐标位置
						var geoc = new BMap.Geocoder();
						lng=e.point.lng;
						lat=e.point.lat;
						lngForAll=lng;
						latForAll=lat;
						$("#lng").val(lng);
						$("#lat").val(lat);
						
						geoc.getLocation(e.point, function(rs){//设置拖动后的地址
							var addComp = rs.addressComponents;
							$("#contactAddr").val(addComp.street+addComp.streetNumber);
						}); 
					});
				}else{
					var option ={hasTitle:true,title:"提示",btn:''};
					xcconfirm=new window.wxc.xcConfirm("您选择地址没有解析到结果,请手动定位!",window.wxc.xcConfirm.typeEnum.custom,option);
					
					var myGeoForAgain = new BMap.Geocoder();
					myGeoForAgain.getPoint(country, function(pointForAgain){// 将地址解析结果显示在地图上,并调整地图视野
						map.centerAndZoom(pointForAgain,12);
						map.panTo(pointForAgain);
						var marker=new BMap.Marker(pointForAgain,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{imageOffset: new BMap.Size(0,3)})});
						var label=new BMap.Label('拖动改变位置',{offset: new BMap.Size(15,-15)});
						marker.setLabel(label);
						map.addOverlay(marker);
						marker.enableDragging();
						marker.addEventListener('dragend',function(e){//获取拖动后的坐标位置
							var geoc = new BMap.Geocoder();
							lng=e.point.lng;
							lat=e.point.lat;
							$("#lng").val(lng);
							$("#lat").val(lat);
							
							geoc.getLocation(e.point, function(rs){//设置拖动后的地址
								var addComp = rs.addressComponents;
								$("#contactAddr").val(addComp.street+addComp.streetNumber);
							}); 
						});  
					},searchArea);
				}
		}, searchArea);
		}else{
			var option ={hasTitle:true,title:"提示",btn:''};
			xcconfirm=new window.wxc.xcConfirm("请输入详细地址",window.wxc.xcConfirm.typeEnum.custom,option);
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
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
      map.addControl(navControl);
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
				//alert(pp.lng+","+pp.lat);
			}
			var local = new BMap.LocalSearch(map, { //智能搜索
			  onSearchComplete: myFun
			});
			local.search(myValue);
			}
		}
	
	function goNext(num){
		if(num==1){
			$("#step2").css("display","none");
			$("#step1").css("display","block");
			$(".stepBar").find("img").prop("src","/newresources/images/state2-1.png");
			$(".stepBar").find("span").removeClass("curr");
			$(".stepBar").find(".s1").addClass("curr");
		}else if(num==2){
			var error=saveCertification("提交");//保存信息，可能客户未保存就要提交
			if(error==undefined){
				$(".stepBar").find("img").prop("src","/newresources/images/state2-2.png");
				$(".stepBar").find("span").removeClass("curr");
				$(".stepBar").find(".s2").addClass("curr");
			}
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
				bankAccount[flagForBankAccount] = JSON.stringify(bankAccountItem);//将对象转化为字符串
				flagForBankAccount++;
			}
		});
		return bankAccount.toString();//返回数据对象的string格式
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
				invoiceTitle[flagForInvoiceTitle] = JSON.stringify(invoiceTitleItem);
				flagForInvoiceTitle++;
			}
		});
		return invoiceTitle.toString();//返回数据对象的string格式
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
			attchedItem.isUpdate=isUpdate;
			if(typeof(attchedItem.id) != "undefined" && typeof(attchedItem.mogodbId) != "undefined"){
				attched[flagForAttched] = JSON.stringify(attchedItem);//将对象转化为字符串
				flagForAttched++;
			}
			fileTypeId++;
		});
		return attched.toString();//返回数据对象的string格式
	}
	
	//保存信息
	function saveCertification(btn){
	  	var error_str = "";
		var obj;//检测对象
		
		if(btn=="提交"){//只有提交时才验证，保存时不验证
			//避免更新时没有触发更改flag字段
			$("#companyName").trigger("blur");
			$("#companyNature").trigger("change");
			$("#companyClass").trigger("change");
			$("#currency").trigger("change");
			$("#companyMainBussiness").trigger("blur");
			$("#companyCorporate").trigger("blur");
			$("#companyRegFund").trigger("blur");
			$("#companyEstablishDt").trigger("blur");
			$("#companyPhone").trigger("blur");
			$("#contactAddr").trigger("blur");
			$("#companyIntroduction").trigger("blur");  
			
			
			if(!company_name_flag){
				if($("#companyName").val()==""){
					error_str = "请输入公司名";
					obj = $("#companyName");
				}else{
					if($("#companyName").val()!=$("#oldCompanyName").val()){
						if(checkCompanyName($("#companyName").val( ))){
							error_str = "公司名已存在";
							obj = $("#companyName");
						}
					}
				}
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
			}else if(!company_province_city_distinct_flag){
				error_str = "请选择地区";
				obj = $("#city");
			}else if(!company_reg_fund_flag){
				if($("#companyRegFund").val() == "")
				{
					error_str = "请输入注册资本";
					obj = $("#companyRegFund");
				}
				else if(!phone_reg.test($("#companyRegFund").val())){
					error_str = "请输入数字";
					obj = $("#companyRegFund");
				}
			}else if($("#companyEstablishDt").val() == ""){
				error_str = "请输入创建日期";
				obj = $("#companyEstablishDt");
			}else if(!company_phone_flag){
				if($("#companyPhone").val() == "")
				{
					error_str = "请输入联系电话";
					obj = $("#companyPhone");
				}
				else if(!phone_reg.test($("#companyPhone").val())){
					error_str = "请输入正确的联系电话格式";
					obj = $("#companyPhone");
				}
			}else if($("#contactAddr").val() == ""){
				error_str = "请输入公司联系地址";
				obj = $("#contactAddr");
			}else if($("#companyIntroduction").val() == ""){
				error_str = "请输入公司简介";
				obj = $("#companyIntroduction");
			}
			
			//公司证照检验
			if($("#business_licence_pic").prev().find("img").attr("src") == "/newresources/images/uploadImg.png" &&
			$("#taxpayer_qualification_certification_pic").prev().find("img").attr("src") == "/newresources/images/uploadImg.png" &&
			$("#tax_registration_certificate_pic").prev().find("img").attr("src") == "/newresources/images/uploadImg.png"&&
			$("#organization_code_certificate_pic").prev().find("img").attr("src") == "/newresources/images/uploadImg.png"){
				$(".company_license_tip").css("display","block");//提示上传一张证照
				error_str = "上传张证照";
				obj = $(".company_license_tip");
			}
			
			//定位地图
			if($("#lng").val()==""&&$("#lat").val()==""){
				var option ={hasTitle:true,title:"提示",btn:''};
				xcconfirm=new window.wxc.xcConfirm("请先定位到地图",window.wxc.xcConfirm.typeEnum.custom,option);
				return "error";
			} 
			
			//验证银行账号是否为空
		 	var bankList = $("#bankTable").find("tr");
			for(var i = 0; i < bankList.length-1; i++){
				var bankElement1 = bankList.eq(i).find("td:first").find("input");
				var bankElement2 = bankList.eq(i).find("td:eq(1)").find("input");
				
				if(!bankElement1.val()||!bankElement2.val()){//为空判定
					error_str = "银行账号不能为空";
					bankList.eq(i).find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
					bankList.eq(i).find("td:last").find(".info_explain_wrap").fadeIn("fast");
					bankElement2.focus();
					return "error";
				}
			}
			
			//验证抬头发票是否为空
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
			}
		}
		
		//保存时的验证
		if($("#companyName").val() == ""){
			error_str = "请输入企业名称";
			obj = $("#companyName");
		}else{
			if($("#companyName").val()!=$("#oldCompanyName").val()){
				if(checkCompanyName($("#companyName").val())){
					error_str = "公司名已存在";
					obj = $("#companyName");
				}
			}
		}
		if($("#province").val()!=0&&$("#country").val()==0){
			error_str = "请选择完整地区";
			obj = $("#city");
		}
		if($("#companyRegFund").val() != "" && !num_reg.test($("#companyRegFund").val())){
			error_str = "请输入数字";
			obj = $("#companyRegFund");
		}
		if(error_str!=""){//错误信息显示
			$(obj).nextAll(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
			$(obj).nextAll(".info_explain_wrap").fadeIn("fast");
			$("html,body").animate({scrollTop:$(obj).offset().top},1000);
			return "error";
		}else{
			$(obj).nextAll(".info_explain_wrap").fadeOut("fast");
		} 
		
		var applySts = 4;//默认申请状态  保存
		if(btn==("提交")){//修改相应的申请状态
			applySts = 5;
		}
		
		//获取基本信息
		var companyName= $("#companyName").val();
		var companyCorporate= $("#companyCorporate").val();
		var companyEstablishDt= $("#companyEstablishDt").val();
		var companyRegFund= $("#companyRegFund").val();
		var contactAddr= $("#contactAddr").val();
		var contactAddrCode= $("#country").val();
		var companyPhone= $("#companyPhone").val();
		var companyMainBussiness= $("#companyMainBussiness").val();
		var companyIntroduction= $("#companyIntroduction").val();
		var lng=$("#lng").val();
		var lat=$("#lat").val();
		var companyNature = $("#companyNature").val();//企业类型
		var companyClass = $("#companyClass").val();//所属行业
		var currency = $("#currency").val();//币种
		
		var params = {};
		if(save_certification_flag){
			save_certification_flag=false;
			$("#industryName").find("input").each(function(index,element){//经营模式
				if($(element)[0].checked){
					params.industryName = $(element).val();
				}
			});
		
			params.cpynameCn= companyName;
			params.companyCorporate= companyCorporate;
			params.companyEstablishDt= companyEstablishDt;
			params.companyRegFund= companyRegFund;
			params.contactAddr= contactAddr;
			params.contactAddrCode= contactAddrCode;
			params.fPhone= companyPhone;
			params.companyMainBussiness= companyMainBussiness;
			params.companyIntroduction= companyIntroduction;
			params.companyNature = companyNature;
			params.companyClass = companyClass;
			params.currency = currency;
			params.applySts = applySts;
			params.lng = lng;//经度
			params.lat = lat;//纬度
			params.bankAccount = doBankAccount();//银行账号
			params.invoiceTilte = doInvoiceTitle();//发票抬头
			params.attched = doAttched();//公司证照
		
			updateBaseInfo1(params,btn,companyId);//更新基础信息   base.js中
		}
	}
	
	function go_index(url)
	{
		window.location.href="/index.jsp";
	}

/**
 * 删除公司证照
 * delCompany_licenses void
 * @author yukai
 * 2016-8-5 上午9:01:10
 */
function delCompany_licenses(obj,id){
	$(obj).parent().prev().prev().attr("src","/newresources/images/uploadImg.png"); 
	$(obj).parent().css("display","none");
	$(obj).parent().prev().css("display","none");
	delFileIds.push(id);
}
/**
 * 检查企业名称是否使用
 * checkCompanyName void
 * @author yukai
 * 2016-8-30
 */
function checkCompanyName(companyName){
	var url = "userInfo/companyNameIsUsed.do";
	var params = {};
	params.companyName = companyName;
	var isasync = false;
	var flag;
	var fn = function(result){
		if(result.statu==false){
			flag=false;
		}
		if(result.statu==true){
			flag=true;
		}
	};
	asyncAjaxMethod(url,params,isasync,fn);	
	return flag;
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
		<div class="curr_page_title_wrap">入驻认证</div>
		<div class="title_remark_wrap">
			<p id="tip_message" style="margin-top:25px;margin-bottom:25px;">请完整填写真实准确的资料，工作人员会在两个工作日内完成审核，只有企业通过审核才能正式入驻平台。</p>
		</div>
		<div class="midd_inner_wrap">
			<!--操作步骤条开始-->
			<div id="step_banner" >
<!-- 				<div class="stepBar_wrap"> -->
<!-- 					<div class="step_bar"> -->
<!-- 							<div class="step_bar_curr"></div> -->
<!-- 					</div>	 -->
<!-- 					<div class="stepInfo_wrap clearfix" > -->
<!-- 						<div class="stepInfo_inner"> -->
<!-- 							<span class="step_text">完善认证信息</span> -->
<!-- 							<div class="step_index_wrap"><span class="step_index">1</span></div> -->
<!-- 						</div> -->
<!-- 						<div class="stepInfo_inner"> -->
<!-- 							<span class="step_text">等待审核</span> -->
<!-- 							<div class="step_index_wrap"><span class="step_index">2</span></div> -->
<!-- 						</div> -->
<!-- 					</div>	 -->
<!-- 				</div> -->
			<div class="stepBar">
				<div class="stepBarTip"><span class="curr s1">填写认证信息</span><span class="ml340 s2">等待审核</span></div>
				<img class="ml10 mt10" src="/newresources/images/state2-1.png">
			</div>
			</div>
			<!--操作步骤条结束-->
			<div id="step1" class="step_wrap ml260" style="display:block; margin-top:0px;">
				<div style="text-align:right; color:#9e9e9d; height:24px;margin-right:270px;"><span class="redcolor">*</span>为必填项</div>
				<div class="certification_form_wrap">
					
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">
							企业名称<span class="no_empty">*</span>
						</div>
						
						<input id="companyName" type="text" class="input_wrap" size="50" />
						<input id="oldCompanyName" type="hidden" />
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
						
						<input id="companyEstablishDt" type="text" onClick="WdatePicker({startDate:'%y',dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d',readOnly:true})" class="input_wrap Wdate"/>
						<div class="info_explain_wrap"></div>
					</div>
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
						<input type="hidden" id="contactAddrPro">
						<a class="remarkMap_a" href="javascript:void(0)" onClick="theLoaction()"><img src="/newresources/images/map1.png" />定位到地图</a>
						<div class="info_explain_wrap" ></div>
						<div style="position:fixed;left:30%;top:20%;z-index:5;">
						<div id="allmap" class="map_wrap"></div>
						<a id="remove_overlay" href="javascript:void(0)"  onclick="remove_overlay()">取消定位</a>
						<a href="javascript:void(0)" id="close_map" title="关闭窗口" class="close_btn" onClick="close_map(this)">X</a>
						<div id="r-result" style="display:none;" >定位搜索:<input type="text" id="suggestId" size="20" value="" /></div>
						<div id="searchResultPanel"></div>
						</div>
					</div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">联系电话<span class="no_empty">*</span></div>
						
						<input id="companyPhone" type="text" class="input_wrap" size="50" />
						<div class="info_explain_wrap"></div>
					</div>
					<div class="div_dashed"></div>
					
					<div class="inner_line_wrap clearfix">
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
					
					<div class="inner_line_wrap clearfix">
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
					<div class="div_dashed display_none"></div>
					<div id="company_licenses_pic" class="inner_line_wrap clearfix display_none">
						<div class="label_wrap">公司证照<span class="no_empty">*</span></div>
						
						<div class="business_licenses_wrap">
							<div class="f_l_wrap">
								<div class="image_block_pic">
									<a><img id="business_licence" src="/newresources/images/uploadImg.png" /></a>
									<input type="file" id="business_licence_pic" class="uploadfile_input" name="file" onChange="showPic1(this)" />
								</div>
								<div class="img_block_text">
									<p class="title_text">营业执照</p>
									<p class="desc_text">(建议图片大小5M以内)</p>
								</div>
							</div>
							<div class="f_l_wrap"> 
								<div class="image_block_pic">
									<a><img id="tax_registration_certificate" src="/newresources/images/uploadImg.png" /></a>
									<input type="file" id="tax_registration_certificate_pic" class="uploadfile_input" name="file" onChange="showPic1(this)" />
								</div>
								<div class="img_block_text">
									<p class="title_text">税务登记证</p>
									<p class="desc_text">(建议图片大小5M以内)</p>
								</div>
							</div>
							<div class="f_l_wrap">
								<div class="image_block_pic">
									<a><img id="organization_code_certificate" src="/newresources/images/uploadImg.png" /></a>
									<input type="file" id="organization_code_certificate_pic" class="uploadfile_input" name="file" onChange="showPic1(this)" />
								</div>
								<div class="img_block_text">
									<p class="title_text">组织机构代码证</p>
									<p class="desc_text">(建议图片大小5M以内)</p>
								</div>
							</div>
							<div class="f_l_wrap">
								<div class="image_block_pic">
									<a><img id="taxpayer_qualification_certification" src="/newresources/images/uploadImg.png" /></a>
									<input type="file" id="taxpayer_qualification_certification_pic" class="uploadfile_input" name="file" onChange="showPic1(this)" />
								</div>
								<div class="img_block_text">
									<p class="title_text">纳税人资格证书</p>
									<p class="desc_text">(建议图片大小5M以内)</p>
								</div>
							</div>
							<div class="company_license_tip"><img src='/newresources/images/new/er.png' /><span class='redcolor'>请至少输入一项公司证照</span></div>
						</div>
					</div>
					<div class="div_dashed"></div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">企业简介<span class="no_empty_introduce">*</span></div>
						<div class="company_intro_tip"><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入企业简介</span></div>
						<div class="company_simple_descript_tip" style="margin-right:180px;">总共可以输入<span class="redcolor">400</span>个字,剩余<span id="remain_words_num" class="redcolor">400</span>个字</div>	
					</div>
					
					<textarea id="companyIntroduction" class="company_simple_descript" style="width:600px;"></textarea>
					<div class="company_opreate_btn_wrap">
						<button class="company_operate_btn" onClick="saveCertification()">保存</button>&nbsp;
						<button class="company_submit_btn" onClick="goNext(2)">提交等待审核</button>
					</div>
				</div>
				<!--step1中的认证信息结束-->
			</div>
			<!--step1结束-->
			<!--step2开始-->
			<div id="step2" class="step_wrap ml60" style="display:none; width:660px;">
				<div class="mt10"></div>
				<p class="b lh200 t_algin_r" style="font-size:13px;margin-right:170px;">
					<img src="/newresources/images/accounManage/pass.png" class="mr5"/>提交成功
				</p>
				<p style="color:#777;margin-right:110px;" class="mt20 t_algin_r">我们将在两个工作日内回复审核结果</p>
				<p class="t_algin_r mr20 mt20">
					<button class="goToCenter" onclick="location='/supplierForPlateForm/registerInfo.htm'">返回企业中心</button>
				</p>
				<!-- <p style="margin-top: 20px;text-align: right;margin-right: 175px;"> 
					<a class="mr10" onClick="goNext(1)" href="javascript:void(0)">返回修改</a>
				</p> -->
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
