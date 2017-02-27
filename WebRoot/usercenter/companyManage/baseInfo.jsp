<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>企业信息--基本信息</title>
<link rel="stylesheet" type="text/css" href="/newresources/css/page.css" />
<link rel="stylesheet" type="text/css" href="/vip/resources/css/vippage.css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<script type="text/javascript" src="/usercenter/companyManage/js/companyInfo.js"></script>
<script type="text/javascript">
var companyId=getParamFromWindowName("companyIdForAll");
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
});

/*展示公司图片基本信息 mishengliang
 * 
 * companyId 当前用户的公司ID
 * fileTypeId 图片文件位置类型ID
 * picId 图片展示位置的img标签ID
 * */
function picPathSrcForBaseInfo(companyId,fileTypeId,picId){
	var url = "PfTaskFileCtrl/getTaskFileListForWindow.do";
	var params = {};
	params.companyId = companyId;
	params.fileTypeId = fileTypeId;
	
	var isasync = true;
	var fn = function(result){
		if(result.data != ""){
			$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
		}else{
			$(picId).parent().parent().css("display","none");
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
		$("#top").load(getwebroot()+"vip/platform/vipTop.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
				{
					getCompanyList(companyId);
					$("#mainNav").children().eq(2).addClass("curr");
					companyId=$("#company").val();
					getBaseInfo();
					picPathSrcForBaseInfo(companyId,18,"#business_licence");//营业执照  //base.js中 
					picPathSrcForBaseInfo(companyId,19,"#tax_registration_certificate");//税务登记
					picPathSrcForBaseInfo(companyId,20,"#organization_code_certificate");//组织机构代码证
					picPathSrcForBaseInfo(companyId,21,"#taxpayer_qualification_certification");//纳税人资格证书
					$(".vip_search_wrap").hide();
				}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/companyManage/vipCompanyLeftMenu.html",function(){
				$("#evaluation").children().eq(1).children().eq(0).find("a").prepend(">>");
				$("#evaluation").children().eq(1).children().eq(0).addClass("currVip");
			});
		}
	}else{
		$("#top").load(getwebroot()+"platform/top.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
				{
					getCompanyList(companyId);
					$("#mainNav").children().eq(3).addClass("curr");
					companyId=$("#company").val();
					getBaseInfo();
					picPathSrcForBaseInfo(companyId,18,"#business_licence");//营业执照  //base.js中 
					picPathSrcForBaseInfo(companyId,19,"#tax_registration_certificate");//税务登记
					picPathSrcForBaseInfo(companyId,20,"#organization_code_certificate");//组织机构代码证
					picPathSrcForBaseInfo(companyId,21,"#taxpayer_qualification_certification");//纳税人资格证书
				}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"usercenter/companyManage/companyLeftMenu.html",function(){
				$("#evaluation").children().eq(1).children().eq(0).css("background","#ececec");
			});
		}
	}
}

//获取基本信息
function getBaseInfo(){
	var url = "supplierForPlateForm/getCompanyInfoByCompanyId1.do";
	var params = {};
	params.companyId = companyId;
	
	var isasync = true;
	var fn = function(result){
		companyData = result.data;
 		var companyBaseInfo = companyData.companyBaseInfo;//公司基础信息 
 		var compnayExtraInfo = companyData.compnayExtraInfo;//公司附加信息
 		
		$("#companyNameInHead").html(companyBaseInfo.cpyname_cn);//企业名称头部显示
		$("#companyName").html(companyBaseInfo.cpyname_cn);//企业名称
		$("#corporation").html(companyBaseInfo.corporation);//法人代表
		if(companyBaseInfo.establish_dt){
			$("#establish_dt").html(companyBaseInfo.establish_dt.substring(0,companyBaseInfo.establish_dt.lastIndexOf(" ")));//成立日期
		}
		$("#reg_fund").html(companyBaseInfo.reg_fund);//注册资本
		$("#currency_id").html(companyBaseInfo.currency_name);//币种
		$("#reg_addr").html(companyBaseInfo.reg_addr);//注册地址
		$("#nature_name").html(compnayExtraInfo.nature_name);//企业类型
		$("#industry_name").html(compnayExtraInfo.industry_name);//经营模式
		$("#trade_class").html(compnayExtraInfo.class_name);//所属行业
		$("#key_remark").html(companyBaseInfo.key_remark);//主营业务
		
		//展示银行账号
		if(compnayExtraInfo.bankAccount){
			var item="";
	 		for(var i = 0;i<compnayExtraInfo.bankAccount.length;i++){
	 			var bankAccountString = (i == 0)?"银行账号":"";
	 			item+="<p><span class='span_wrap'>"+bankAccountString+"</span><label class='label_wrap'>"
	 									+compnayExtraInfo.bankAccount[i].account_name+" "+compnayExtraInfo.bankAccount[i].account_code+"</label></p>";
			} 
	 			$("#bankAccount").html(item);
		}
		
		//展示发票抬头
		if(compnayExtraInfo.invoiceTitles){
			var item="";
			for(var i = 0;i<compnayExtraInfo.invoiceTitles.length;i++){
				var invoiceTitle = (i==0)?"抬头发票":"";
				item+="<p><span class='span_wrap'>"+ invoiceTitle +"</span><label class='label_wrap'>"+compnayExtraInfo.invoiceTitles[i].invoice_title_name+"</label></p>";
			} 
			$("#invoice_title_name").html(item);
		}
		//无银行账号和抬头发票的时候
		if(compnayExtraInfo.bankAccount == null && compnayExtraInfo.invoiceTitles == null){
			$("#bankAccount").prev(".hr_grey").css("display","none");
		}
	};
	
	asyncAjaxMethod(url,params,isasync,fn);
}

function show_info(th,num)
{	
	$(".companyInfo_tab").find("a").removeClass("selected");
	$(".companyInfo_tab").find("li").removeClass("selected");
	$(th).addClass("selected");
	$(th).parent().addClass("selected");
	if(num==1)
	{
		$('#sub_baseInfo_tab').removeClass("triangle_bottomright");
		$('#sub_baseInfo_tab').addClass("triangle_bottomright_curr");
	}
	else if(num==2)
	{
		$('#sub_baseInfo_tab').removeClass("triangle_bottomright_curr");
		$('#sub_baseInfo_tab').addClass("triangle_bottomright");
		$(".companyInfo_tab li").first().css("border","none");
	}
	else if(num==3)
	{
		$('#sub_baseInfo_tab').removeClass("triangle_bottomright_curr");
		$('#sub_baseInfo_tab').addClass("triangle_bottomright");
		$(".companyInfo_tab li").first().css("border","none");
	}
}

//变更基本信息
function updateCertification(){
	if(checkCanUpdate()){
		var param ={"companyIdForUpdate":companyId};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"supplierForPlateForm/updateCertification.htm";
	}else{
		var option ={title:"提示",btn:parseInt("0001",2)};
		window.wxc.xcConfirm("正在准入申请不能变更入驻信息！", window.wxc.xcConfirm.typeEnum.custom,option);
		return;
	}
}
//检查能否变更信息
function checkCanUpdate(){
	var url = "supplierForPlateForm/checkCanUpdate.do";
	var params = {};
	params.companyId = companyId;
	var canUpdate;
	var isasync = false;
	var fn = function(result){
		canUpdate=result.data;
	};
	
	asyncAjaxMethod(url,params,isasync,fn);
	return canUpdate;
}
</script>
</head>

<body class="bg_grey">
<div id="top"></div>
<!--中间-->
<div class="midd_wrap clearfix">
	<div class="midd_left_wrap" style="width:180px;">
		<div id="leftMenuPage" class="account_leftMenu"></div>
	</div>
	<div class="midd_right_wrap" style="width:834px">
		<div class="account_right_title">
			<span  class="f_l ml10"><span id="companyNameInHead">...</span><span id="isCheck" class="span_rz ml10" style="width:60px;">实名入驻</span></span>
		</div>
		<div class="account_right_inner_wrap">
			<h4>企业信息<a class="link" onclick="updateCertification()">信息变更申请</a></h4>
<!-- 			<div id="sub_baseInfo_tab" class="triangle_bottomright_curr"></div> -->
			
			<ul class="companyInfo_tab clearfix">
				<li class="selected " ><a class="selected"  href="/supplierForPlateForm/baseInfo.htm" target="_self" onClick="show_info(this,1)">基本信息</a><span class="split">|</span></li>
				<li><a  href="/supplierForPlateForm/detailsInfo.htm" onClick="show_info(this,2)" >详细信息</a><span class="split">|</span></li>
				<li><a  href="/supplierForPlateForm/scalepowerInfo.htm" onClick="show_info(this,3)">规模能力</a></li>
			</ul>
			<p><span class="span_wrap">企业名称</span><label id="companyName" class="label_wrap">...</label></p>
			<p><span class="span_wrap">法人代表</span><label id="corporation" class="label_wrap">...</label></p>
			<p><span class="span_wrap">成立日期</span><label id="establish_dt" class="label_wrap">...</label></p>
			<p><span class="span_wrap">注册资本</span><label id="reg_fund" class="label_wrap">...</label><label class="label_wrap mr10">万</label><label id="currency_id" class="label_wrap"></label></p>
			<!-- <p><span class="span_wrap">注册地址</span><label id="reg_addr" class="label_wrap">...</label></p> -->
			<p class="clearfix"><span class="span_wrap">公司证照</span></p>
			<div class="buslicense_wrap clearfix">
				<div class="img_wrap_1">
					<div class="img_block_pic">
						<img id="business_licence" src="" alt="营业执照" />
					</div>
					<div class="img_block_text">营业执照</div>
				</div>
				<div class="img_wrap_1">
					<div class="img_block_pic">
						<img id="tax_registration_certificate" src="" alt="税务登记证" />
					</div>
					<div class="img_block_text">税务登记证</div>
				</div>
				<div class="img_wrap_1">
					<div class="img_block_pic">
						<img id="organization_code_certificate" src="" alt="组织机构代码证" />
					</div>
					<div class="img_block_text">组织机构代码证</div>
				</div>
				<div class="img_wrap_1">
					<div class="img_block_pic">
						<img id="taxpayer_qualification_certification" src="" alt="纳税人资格证书" />
					</div>
					<div class="img_block_text">纳税人资格证书</div>
				</div>
			</div>
			<hr class="hr_grey clear" />
			<div id="bankAccount">
				<!-- <p><span class="span_wrap">银行账号</span><label class="label_wrap">中国工商银行 656566552522222222</label></p> -->
			</div>
			<div id="invoice_title_name">
				<!-- <p><span class="span_wrap">发票抬头</span><label class="label_wrap">浙江泰普森（控股）集团</label></p> -->	
			</div>
			<hr class="hr_grey" />
			<p><span class="span_wrap">企业类型</span><label id="nature_name" class="label_wrap">...</label></p>
			<p><span class="span_wrap">经营模式</span><label id="industry_name" class="label_wrap">...</label></p>
			<p><span class="span_wrap">所属行业</span><label id="trade_class" class="label_wrap">...</label></p>
			<p><span class="span_wrap">主营业务</span><label id="key_remark" class="label_wrap">...</label></p>
		</div>
	</div>
</div>
<!--底端-->
<div id="bottom"></div>
</body>
</html>
				