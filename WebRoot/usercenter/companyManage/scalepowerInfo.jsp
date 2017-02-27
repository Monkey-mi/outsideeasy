<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
 <!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>规模能力</title>

<link href="/newresources/css/page.css" rel="stylesheet" type="text/css" />
<link href="/vip/resources/css/vippage.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
<%@ include file="/newresources/js/base.jsp" %>
<script type="text/javascript" src="/newresources/js/currency.js"></script>
<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>
<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="/usercenter/companyManage/js/companyInfo.js"></script>
<script type="text/javascript">
var companyId=getParamFromWindowName("companyIdForAll");
var num_reg =/^(\d+(\.\d+)?)?$/;//数字正则
var int_reg =/^\d*$/;//整数正则
var save_scalepower_flag=true;//保存标记，防止多次保存
$(function(){
	loadCommonPage();
	//var height=$(".midd_left_wrap").height();
	$(".midd_wrap").css({minHeight:$(window).height()-200});
	$(".midd_left_wrap").css({minHeight:$(window).height()-200});
	$(".midd_right_wrap").css({minHeight:$(window).height()-200});
	
	window.onresize=function(){
		$(".midd_wrap").css({minHeight:$(window).height()-200});
		$(".midd_left_wrap").css({minHeight:$(window).height()-200});
		$(".midd_right_wrap").css({minHeight:$(window).height()-200});
	};
	//管理体系默认选择无
	$("#certification_system_imgs").css("display","none");
	for(i=0;i<$("[name = certification_system]:radio").length;i++){
		var radio=$("[name = certification_system]:radio")[i];
		if(i==0){
			radio.checked=true;
		}else{
			radio.checked=false;
		}
	}
	$("[name = certification_system]:radio").change(function(){
	if($("[name = certification_system]:radio")[0].checked==true){
		$("#certification_system_imgs").css("display","none");
	}
	for(i=1;i<$("[name = certification_system]:radio").length;i++){
		var radio=$("[name = certification_system]:radio")[i];
		if(radio.checked==true){
			$("#certification_system_imgs").css("display","block");
		}
	}
	});  
	//币种
	currencys=CurrencysUtil;
	$.each(currencys,function(index,c){
		var option="<option value='"+c.currency_id+"'>"+c.currency_name+"</option>";
		$("#turnover_currency_id").append(option);
	});
	$.each(currencys,function(index,c){
		var option="<option value='"+c.currency_id+"'>"+c.currency_name+"</option>";
		$("#export_currency_id").append(option);
	});
	$.each(currencys,function(index,c){
		var option="<option value='"+c.currency_id+"'>"+c.currency_name+"</option>";
		$("#import_currency_id").append(option);
	});
	$(".input_wrap").on("blur",function(){  
		var id=$(this).attr("id");
		var error_str="";
		if(id=="turnover")
		{
			if($(this).val()!="")
			{
				if(!num_reg.test($(this).val()))
				{
					error_str="请输入数字";
				}
			}
		}
		else if(id=="exportNum")
		{
			if($(this).val()!="")
			{
				if(!num_reg.test($(this).val()))
				{
					error_str="请输入数字";
				}
			}
		}
		else if(id=="importNum")
		{
			if($(this).val()!="")
			{
				if(!num_reg.test($(this).val()))
				{
					error_str="请输入数字";
				}
			}
		}
		else if(id=="companyArea")
		{
			if($(this).val()!="")
			{
				if(!num_reg.test($(this).val()))
				{
					error_str="请输入数字";
				}
			}
		}
		else if(id=="factoryArea")
		{
			if($(this).val()!="")
			{
				if(!num_reg.test($(this).val()))
				{
					error_str="请输入数字";
				}
			}
		}
		else if(id=="emplyees")
		{
			if($(this).val()!="")
			{
				if(!int_reg.test($(this).val()))
				{
					error_str="请输入整数";
				}
			}
		}else if(id == "otherperson1"){
			if($(this).val()!=""){
				if(!int_reg.test($(this).val())){
					$("#otherperson1").parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入数字"+"</span>");
					$("#otherperson1").parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
				}else{
					$("#otherperson1").parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
				}
			}
		}else if(id == "persontype1"){
			if($(this).val()!=""){
				if(!int_reg.test($(this).val())){
					$("#persontype1").parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入数字"+"</span>");
					$("#persontype1").parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
				}else{
					$("#persontype1").parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
				}
			}
		}else if(id == "device_price1"){
			if($(this).val()!=""){
				if(!num_reg.test($(this).val())){
					$("#device_price1").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请确认价格为数字"+"</span>");
					$("#device_price1").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeIn("fast");
				}else{
					$("#device_price1").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeOut("fast");
				}
			}
		}else if(id == "device_num1"){
			if($(this).val()!=""){
				if(!int_reg.test($(this).val())){
					$("#device_num1").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请确认数量为整数"+"</span>");
					$("#device_num1").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeIn("fast");
				}else{
					$("#device_num1").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeOut("fast");
				}
			}
		}
		
		if(error_str!=""){//错误信息显示
			$(this).nextAll(".info_explain_wrap").html("<div style='width:120px;' ><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span></div>");
			$(this).nextAll(".info_explain_wrap").fadeIn("fast");
		}
		else
		{
			$(this).nextAll(".info_explain_wrap").fadeOut("fast");
		}
	});
	
	$("select").on("change",function(){//币种改变，去掉提示
		if($(this).val != 0){
			$(this).nextAll(".info_explain_wrap").fadeOut("fast");
		}
	});
	$("#qc_file_table_capability").val("");
	$("#qc_file_name").val("");
	
});
	
//院校合作字数计算及限制
function schoolCoopLimit(){
	$("#schoolCoop").keyup(function(){
		var descriptLength = $("#schoolCoop").val().length;
		$("#remain_words_num").text(400-descriptLength);
		if(400-descriptLength <= 0){
			var descriptLimit = $("#schoolCoop").val().substring(0,400);
			$("#schoolCoop").val(descriptLimit);
		}
	});
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
					$("#mainNav").children().eq(3).addClass("curr");
					companyId=$("#company").val();
					showInfo();//展示基础信息
					picPathSrc1(25,"#management_system");//质量体系认证
					showMorePic1(26);//专利图片展示
					showMorePic1(27);//其他资质图片展示
					showText(30);
					schoolCoopLimit();//院校合作字数的计算和限制
					$(".vip_search_wrap").hide();
				}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/companyManage/vipCompanyLeftMenu.html",function(){
				$("#evaluation").children().eq(1).children().eq(2).find("a").prepend(">>");
				$("#evaluation").children().eq(1).children().eq(2).addClass("currVip");
			});
		}
	}else{
		$("#top").load(getwebroot()+"platform/top.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
				{
					getCompanyList(companyId);
					$("#mainNav").children().eq(3).addClass("curr");
					companyId=$("#company").val();
					showInfo();//展示基础信息
					picPathSrc1(25,"#management_system");//质量体系认证
					showMorePic1(26);//专利图片展示
					showMorePic1(27);//其他资质图片展示
					showText(30);
					schoolCoopLimit();//院校合作字数的计算和限制
				}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"usercenter/companyManage/companyLeftMenu.html",function(){
					$("#evaluation").children().eq(1).children().eq(2).css("background","#ececec");
			});
		}
	}
	
}	
function showInfo(){
	var url = "supplierForPlateForm/getCompanyInfoByCompanyId1.do";
	var params = {companyId:companyId};
	var fn = function(result){//无操作
		baseInfoShow(result);//基础信息展示
		personTypeShow(result);//人员结构展示
		otherPersonShow(result);//其他人员
		deviceShow(result);//设备展示
	};
	asyncAjaxMethod(url,params,false,fn);
}	

//基础信息展示 mishengliang 20160418
function baseInfoShow(result){
	cpBaseInfo = result.data.companyBaseInfo;
	$("#companyNameInHead").html(cpBaseInfo.cpyname_cn);                       
	$("#emplyees").val(cpBaseInfo.emplyees!=0?cpBaseInfo.emplyees:"");//公司总人数                           
	$("#collegeNum").val(cpBaseInfo.college_num!=0?cpBaseInfo.college_num:"");//本科 
	$("#diplomaNum").val(cpBaseInfo.diploma_num!=0?cpBaseInfo.diploma_num:"");//大专       
	$("#diplomaDownNum").val(cpBaseInfo.diploma_down_num!=0?cpBaseInfo.diploma_down_num:"");//专科以下             
	$("#turnover").val(cpBaseInfo.turnover!=0?cpBaseInfo.turnover:"");
	$("#importNum").val(cpBaseInfo.import_num!=0?cpBaseInfo.import_num:"");
	$("#exportNum").val(cpBaseInfo.export_num!=0?cpBaseInfo.export_num:"");             
	$("#useBegintime").val(cpBaseInfo.use_begintime);//开始时间 
	$("#useEndtime").val(cpBaseInfo.use_endtime);//结束时间                      
	$("#schoolCoop").val(cpBaseInfo.school_coop);
	if(cpBaseInfo.company_area != 0){
		$("#companyArea").val(cpBaseInfo.company_area);                    
	}
	if(cpBaseInfo.company_area != 0){
		$("#factoryArea").val(cpBaseInfo.factory_area); 
	}
	
		
	$("[name = quality_control]:radio").eq(cpBaseInfo.quality_control).attr("checked",true);//质量控制复选框
	$("[name = OEM]:radio").eq(cpBaseInfo.is_oem).attr("checked",true);//OEM带加工
	//质量管理体系
	if(cpBaseInfo.certification_system==null||cpBaseInfo.certification_system==""){
		$("#certification_system_imgs").css("display","none");
	}else if("ISO9000" == cpBaseInfo.certification_system){//ISO9000
		$("[name = certification_system]:radio").eq(1).prop("checked",true);
		$("#certification_system_imgs").css("display","block");
	}else if("ISO14000" == cpBaseInfo.certification_system){//ISO14000
		$("[name = certification_system]:radio").eq(2).prop("checked",true);
		$("#certification_system_imgs").css("display","block");
	}else{//其他认证
		$("[name = certification_system]:radio").eq(3).prop("checked",true);
		$("#certification_system_other").val(cpBaseInfo.certification_system);
		$("#certification_system_imgs").css("display","block");
	}
	
	$("#factory_owner").val(cpBaseInfo.factory_owner);//产权
	$("#turnover_currency_id").val(cpBaseInfo.turnover_currency_id);//营业额货币
	$("#import_currency_id").val(cpBaseInfo.import_currency_id);//进口额货币
	$("#export_currency_id").val(cpBaseInfo.export_currency_id);//出口额货币
	
	$("#remain_words_num").text(400-$("#schoolCoop").val().length);//剩余输入字数
}
	
//其他人员展示	mishengliang 10160418	
function otherPersonShow(result){
	cpBaseInfo = result.data.companyBaseInfo;
	//其他人员 第一行数据展示
	if(cpBaseInfo.tech_num != 0 && cpBaseInfo.tech_num != null){
		$("#otherperson_select1").val(1);
		$("#otherperson1").val(cpBaseInfo.tech_num);
	}else if(cpBaseInfo.op_num != 0 && cpBaseInfo.op_num != null){
		$("#otherperson_select1").val(2);
		$("#otherperson1").val(cpBaseInfo.op_num);
	}else if(cpBaseInfo.qc_num != 0 && cpBaseInfo.qc_num != null){
		$("#otherperson_select1").val(3);
		$("#otherperson1").val(cpBaseInfo.qc_num);
	}else if(cpBaseInfo.staff_num != 0 && cpBaseInfo.staff_num != null){
		$("#otherperson_select1").val(4);
		$("#otherperson1").val(cpBaseInfo.staff_num);	
	}else if(cpBaseInfo.internal_auditor_num != 0 && cpBaseInfo.internal_auditor_num != null){
		$("#otherperson_select1").val(5);
		$("#otherperson1").val(cpBaseInfo.internal_auditor_num);			
	}
	
	//其他人员多行展示
	if($("#otherperson_select1").val() != 0){
		var otherPersonNum = 2;
		if(cpBaseInfo.op_num != 0 && cpBaseInfo.op_num != null && $("#otherperson_select1").val() < 2){
			addOtherpersonRow('otherperson_table');
			$("#otherperson_select" + otherPersonNum).val(2);
			$("#otherperson" + otherPersonNum).val(cpBaseInfo.op_num);
			otherPersonNum ++;
		}
		if(cpBaseInfo.qc_num != 0 && cpBaseInfo.qc_num != null && $("#otherperson_select1").val() < 3){
			addOtherpersonRow('otherperson_table');
			$("#otherperson_select" + otherPersonNum).val(3);
			$("#otherperson" + otherPersonNum).val(cpBaseInfo.qc_num);
			otherPersonNum ++;
		}
		if(cpBaseInfo.staff_num != 0 && cpBaseInfo.staff_num != null && $("#otherperson_select1").val() < 4){
			addOtherpersonRow('otherperson_table');
			$("#otherperson_select" + otherPersonNum).val(4);
			$("#otherperson" + otherPersonNum).val(cpBaseInfo.staff_num);
			otherPersonNum ++;
		}
		if(cpBaseInfo.internal_auditor_num != 0 && cpBaseInfo.internal_auditor_num != null && $("#otherperson_select1").val() < 5){
			addOtherpersonRow('otherperson_table');
			$("#otherperson_select" + otherPersonNum).val(5);
			$("#otherperson" + otherPersonNum).val(cpBaseInfo.internal_auditor_num);
		}				
	}
}	

//人员结构展示 mishengliang 20160418
function personTypeShow(result){
	cpBaseInfo = result.data.companyBaseInfo;
	//人员结构 第一行数据展示
	if(cpBaseInfo.college_num != 0 && cpBaseInfo.college_num != null){
		$("#persontype_select1").val(1);
		$("#persontype1").val(cpBaseInfo.college_num);
	}else if(cpBaseInfo.diploma_down_num != 0 && cpBaseInfo.diploma_down_num != null){
		$("#persontype_select1").val(3);
		$("#persontype1").val(cpBaseInfo.diploma_down_num);
	}
	
	//人员结构多行展示
	if($("#persontype_select1").val() != 0){
		var personTypeNum = 2;
		if(cpBaseInfo.diploma_down_num != 0 && cpBaseInfo.diploma_down_num != null && $("#persontype_select1").val() < 3){
			addPersontypeRow('persontype_table');
			$("#persontype_select" + personTypeNum).val(3);
			$("#persontype" + personTypeNum).val(cpBaseInfo.diploma_down_num);
		}
	}
	if(persontype_rowCount==2){
		$("#persontype_table").find("tfoot").find("a").css("display", "none");
	}
}

//设备展示 mishengliang 2016-04-18
function deviceShow(result){
	var deviceList = result.data.deviceList;
	if(deviceList.length > 0){
		//添加第一条设备信息
		$("#device_id1").val(deviceList[0].device_id);
		$("#device_name1").val(deviceList[0].device_name);
		$("#device_format1").val(deviceList[0].specifications);
		$("#device_place1").val(deviceList[0].place);
		$("#device_price1").val(deviceList[0].price!=0?deviceList[0].price:"");
		$("#device_buy_day1").val(deviceList[0].buy_day);
		$("#device_num1").val(deviceList[0].device_num!=0?deviceList[0].device_num:"");
		$("#device_advanced1").val(deviceList[0].advanced);
		
		for(var i=0; i < deviceList.length-1; i++){
			var j = i+2;
			addDevicelistRow('devicelist_table');

			$("#device_id" + j).val(deviceList[i+1].device_id);
			$("#device_name" + j).val(deviceList[i+1].device_name);
			$("#device_format" + j).val(deviceList[i+1].specifications);
			$("#device_place" + j).val(deviceList[i+1].place);
			$("#device_price" + j).val(deviceList[i+1].price!=0?deviceList[i+1].price:"");
			$("#device_buy_day" + j).val(deviceList[i+1].buy_day);
			$("#device_num" + j).val(deviceList[i+1].device_num!=0?deviceList[i+1].device_num:"");
			$("#device_advanced" + j).val(deviceList[i+1].advanced);
		}
	}	
}
	
var otherperson_rowCount=1;
//添加其他人员行
function addOtherpersonRow(table_id)
{
	if($("#otherperson_select"+ otherperson_rowCount +"").val()==0||$("#otherperson"+ otherperson_rowCount +"").val()==""){
		$("#otherperson"+ otherperson_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入其他人员数据"+"</span>");
		$("#otherperson"+ otherperson_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
		return;
	}else if( !num_reg.test($("#otherperson"+ otherperson_rowCount +"").val()) ){
		$("#otherperson"+ otherperson_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入数字"+"</span>");
		$("#otherperson"+ otherperson_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
		return;
	}else{
		$("#otherperson"+ otherperson_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
	}
	
	var arr=[];
	for(i=1;i<=otherperson_rowCount;i++){
		var v=$("#otherperson_select"+ i +"").val();
		arr[i-1]=v;
	}
	
	otherperson_rowCount++;
	var newRow="<tr id='otherperson_row"+ otherperson_rowCount +"'>"
					+"<td>"
						+"<select id='otherperson_select"+ otherperson_rowCount +"' name='otherperson' class='select_wrap' style='width:150px; height:32px;' onChange=''>"
							 +"<option value='0'>请选择</option>"
							 +"<option value='1'>研发人员</option>"
							 +"<option value='2'>操作工</option>"
							 +"<option value='3'>专职检验</option>"
							 +"<option value='4'>间接员工</option>"
							 +"<option value='5'>内审人员</option>"
						+"</select>"
						+"<input id='otherperson"+ otherperson_rowCount +"' type='text' style=' width:150px;' class='input_wrap' size='50' />"
						+"<span class='f_l mt10 ml10'>人</span>"
					+"</td>"
					+"<td><img src='/newresources/images/del.png'  onClick='delOtherpersonRow(this,"+ otherperson_rowCount +")'/></td>"
					+"<td class='redcolor'></td>"
					+"<td><div class='info_explain_wrap'></div></td>"
				+"</tr>"; 
	$('#'+table_id).append(newRow);
	if(otherperson_rowCount==5){
		$("#otherperson_table").find("tfoot").find("a").css("display", "none");
	}
	$("#otherperson"+ otherperson_rowCount).bind("blur",function (){//每增加一个，增加一个blur事件
		for(i=1;i<=otherperson_rowCount;i++){
			if( !int_reg.test($("#otherperson"+ i +"").val()) ){
				$("#otherperson"+ i +"").parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入数字"+"</span>");
				$("#otherperson"+ i +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
			}else{
				$("#otherperson"+ i +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
			}
		}
	});
	for(i=0;i<arr.length;i++){
		$("#otherperson_select"+ otherperson_rowCount +" option[value='"+arr[i]+"']").css("display", "none");
	}
}
//删除其他人员行
function delOtherpersonRow(obj,otherperson_rowCountForDel)
{
	var id= $(obj).parent().parent().find("select").val();
	var params = {};
	if(id!=null&& id!="")
	{
		switch(id){
			case '1':
				params.techNum = 0;//研发人员
				break;
			case '2':
				params.opNum = 0;//操作工
				break;
			case '3':
				params.qcNum = 0;//检验人员
				break;
			case '4':
				params.staffNum = 0;//间接员工
				break;
			case '5':
				params.internalAuditorNum = 0;//内审人员
				break;	
			default:
				break;	
		}	
		updateBaseInfo1(params,"del",companyId);//使用同一个更新方法 base.js中
	}
	//如果是第一行，保留界面元素
	if(otherperson_rowCount==1)
	{
		$(obj).parent().parent().find("select").val(0);
		$(obj).parent().parent().find("input").val("");
	}
	else
	{
		if(otherperson_rowCount==5){
			$("#otherperson_table").find("tfoot").find("a").css("display","block");
		}
		$(obj).parent().parent().remove();
		otherperson_rowCount--;
	}
	
}
var persontype_rowCount=1;
//添加人员结构行
function addPersontypeRow(table_id){
	if($("#persontype_select"+ persontype_rowCount +"").val()==0||$("#persontype"+ persontype_rowCount +"").val()==""){
		$("#persontype"+ persontype_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入人员结构数据"+"</span>");
		$("#persontype"+ persontype_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
		return;
	}else if( !num_reg.test($("#persontype"+ persontype_rowCount +"").val()) ){
		$("#persontype"+ persontype_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入数字"+"</span>");
		$("#persontype"+ persontype_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
		return;
	}else{
		$("#persontype"+ persontype_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
	}
	
	var arr=[];
	for(i=1;i<=persontype_rowCount;i++){
		var v=$("#persontype_select"+ i +"").val();
		arr[i-1]=v;
	}
	
	persontype_rowCount++;
	var newRow="<tr id='persontype_row"+ persontype_rowCount +"'>"
					+"<td>"
						+"<select id='persontype_select"+ persontype_rowCount +"' name='persontype' class='select_wrap' style='width:150px; height:32px;' onChange=''>"
							 +"<option value='0'>请选择</option>"
							 +"<option value='1'>大专及以上</option>"
							 +"<option value='3'>大专以下</option>"
						+"</select>"
						+"<input id='persontype"+ persontype_rowCount +"' type='text' style=' width:150px;' class='input_wrap' size='50' />"
						+"<span class='f_l mt10 ml10'>人</span>"
					+"</td>"
					+"<td><img src='/newresources/images/del.png'  onClick='delPersontypeRow(this,"+ persontype_rowCount +")'/></td>"
					+"<td class='redcolor'></td>"
					+"<td><div class='info_explain_wrap'></div></td>"
				+"</tr>";
	$('#'+table_id).append(newRow);
	if(persontype_rowCount==2){
		$("#persontype_table").find("tfoot").find("a").css("display", "none");
	}
 	$("#persontype"+ persontype_rowCount).bind("blur",function (){//每增加一个，增加一个blur事件
		for(i=1;i<=persontype_rowCount;i++){
			if( !int_reg.test($("#persontype"+ i +"").val()) ){
				$("#persontype"+ i +"").parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入数字"+"</span>");
				$("#persontype"+ i +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
			}else{
				$("#persontype"+ i +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
			}
		}
	});
	
	for(i=0;i<arr.length;i++){
		$("#persontype_select"+ persontype_rowCount +" option[value='"+arr[i]+"']").css("display", "none");
	}
}

//删除人员结构行
function delPersontypeRow(obj,persontype_rowCountForDel)
{
	var id= $(obj).parent().parent().find("select").val();
	var params = {};
	if(id!=null&& id!="")
	{
		switch(id){
			case '1':
				params.collegeNum = 0;//本科及以上
				break;
			case '2':
				params.diplomaNum = 0;//专科
				break;
			case '3':
				params.diplomaDownNum = 0;//专科及以下
				break;
			default:
				break;	
		}	
		updateBaseInfo1(params,"del",companyId);//使用同一个更新方法 base.js中
	}
	//如果是第一行，保留界面元素
	if(persontype_rowCount==1)
	{
		$(obj).parent().parent().find("select").val(0);
		$(obj).parent().parent().find("input").val("");
	}
	else
	{
		if(persontype_rowCount==2){
			$("#persontype_table").find("tfoot").find("a").css("display","block");
		}
		$(obj).parent().parent().remove();
		persontype_rowCount--;
	}
	
}

var device_rowCount=1;
function addDevicelistRow(table_id)
{
	if($("#device_name"+ device_rowCount +"").val()==""||$("#device_num"+ device_rowCount +"").val()==""){
		//$('#'+table_id).append("<tr><td colspan='7'><div class='info_explain_wrap'></div></td></tr>");
		$("#device_name"+ device_rowCount +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入设备名称和设备数量"+"</span>");
		$("#device_name"+ device_rowCount +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeIn("fast");
		return;
	}else if( !int_reg.test($("#device_num"+ device_rowCount +"").val())||!num_reg.test($("#device_price"+ device_rowCount +"").val()) ){
		$("#device_name"+ device_rowCount +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入数字"+"</span>");
		$("#device_name"+ device_rowCount +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeIn("fast");
		return;
	}else{
		$("#device_name"+ device_rowCount +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").parent().parent().remove();
	}
	device_rowCount++;
	var newRow="<tr id='device_row"+ device_rowCount +"'>"
						+"<td><input id='device_name"+ device_rowCount +"' type='text' style=' width:120px;' class='input_wrap' size='50' /></td>"
						+"<td><input id='device_format"+ device_rowCount +"' type='text' style=' width:90px;' class='input_wrap' size='50' /></td>"
						+"<td><input id='device_place"+ device_rowCount +"' type='text' style=' width:90px;' class='input_wrap' size='50' /></td>"
						+"<td><input id='device_price"+ device_rowCount +"' type='text' style=' width:90px;' class='input_wrap' size='50' /></td>"
						+"<td><input id='device_buy_day"+ device_rowCount +"' type='text' style=' width:90px;' onClick='WdatePicker({readOnly:true})' class='input_wrap Wdate' /></td>"
						+"<td><input id='device_num"+ device_rowCount +"' type='text' style=' width:60px;' class='input_wrap' size='20' /></td>"
						+"<td><input id='device_advanced"+ device_rowCount +"' type='text' style=' width:90px;' class='input_wrap' size='50' /></td>"
						+"<td><img src='/newresources/images/del.png'  onClick='delDevicelistRow(this,"+ device_rowCount +")'/></td>"
						+"<td class='redcolor'></td>"
						+"<td style='dispaly:none;'><input id='device_id"+ device_rowCount +"' type='hidden' value='-1'></td>"
					+"</tr>"
					+"<tr><td colspan='7'><div class='info_explain_wrap'></div></td></tr>";
	$('#'+table_id).append(newRow);
	$("#device_num"+ device_rowCount).bind("blur",function (){//每增加一个，增加一个blur事件
		var flag=true;
		for(i=1;i<=device_rowCount;i++){
			if(!int_reg.test($("#device_num"+ i +"").val()) ){
				flag=false;
			}
		}
		if(flag){
			$("#device_num"+ device_rowCount +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeOut("fast");
		}else{
			$("#device_num"+ device_rowCount +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请确认数量为整数"+"</span>");
			$("#device_num"+ device_rowCount +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeIn("fast");
		}
	});
	$("#device_num1").bind("blur",function (){//修改第一个blur事件
		var flag=true;
		for(i=1;i<=device_rowCount;i++){
			if(!int_reg.test($("#device_num"+ i +"").val()) ){
				flag=false;
			}
		}
		if(flag){
			$("#device_num1").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeOut("fast");
		}else{
			$("#device_num1").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请确认数量为整数"+"</span>");
			$("#device_num1").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeIn("fast");
		}
	});
	$("#device_price"+ device_rowCount).bind("blur",function (){//每增加一个，增加一个blur事件
		var flag=true;
		for(i=1;i<=device_rowCount;i++){
			if( !num_reg.test($("#device_price"+ i +"").val()) ){
				flag=false;
			}
		}
		if(flag){
			$("#device_price"+ device_rowCount +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeOut("fast");
		}else{
			$("#device_price"+ device_rowCount +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请确认价格为数字"+"</span>");
			$("#device_price"+ device_rowCount +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeIn("fast");
		}
	});
	$("#device_price1").bind("blur",function (){//修改第一个blur事件
		var flag=true;
		for(i=1;i<=device_rowCount;i++){
			if(!int_reg.test($("#device_price"+ i +"").val()) ){
				flag=false;
			}
		}
		if(flag){
			$("#device_price1").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeOut("fast");
		}else{
			$("#device_price1").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请确认价格为数字"+"</span>");
			$("#device_price1").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeIn("fast");
		}
	});
}

function delDevicelistRow(obj,device_rowCountForDel){
	var id= $(obj).parent().parent().find("#device_id"+device_rowCountForDel).val();
	
	if(id!=null&& id!="")
	{
		$.ajax({
			type:"POST",
			url: getwebroot()+"PfDeviceCtrl/deleteDevice.do",
			dataType:"json",
			data:{
				deviceId:id
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
	if(device_rowCount<2)
	{
		$(obj).parent().parent().find("input").val("");
		$(obj).parent().next().next().find("input").val("-1");
	}
	else
	{
		$(obj).parent().parent().remove();
		device_rowCount--;
	}
}

 //上传认证体系图片
function addCertifsystemImg(obj){
	if($(obj).val()!="")
	{
	var ul=$(obj).parent().parent().parent();
	var filename=$(obj).val();
	var imgSrc="/newresources/images/company_1.png";
	var _newli='<li><div class="image_block_pic"><img src="'+imgSrc+'" />'
				+'<div class="a_bg"></div><div class="oprate_wrap"><a href="javascript:void(0)" onClick="deluploadImg(this)">删除</a></div></div></li>';
	$(ul).html(_newli);
	//当前上传控件清空
	$(obj).val("");
	}
} 

//上传其他资质图片
function addOtherIntelligenceImg(obj)
{
	if($(obj).val()!=""){
		var ul=$(obj).parent().parent().parent();
		var filename=$(obj).val();
		var imgSrc="/newresources/images/company_1.png";
		var _newli='<li><div class="image_block_pic"><img src="'+imgSrc+'" />'
					+'<div class="a_bg"></div><div class="oprate_wrap"><a href="javascript:void(0)" onClick="deluploadImg(this)">删除</a></div></div>'
					+'<div class="img_block_text"><input type="text" readonly="true" value="'+filename+'" /><img  src="/newresources/images/edit.png" onClick="editImgText(this)" /></div></li>';
		$(ul).prepend(_newli);
		//当前上传控件清空
		$(obj).val("");
	}
}

//上传专利图片
function addPatentImg(obj){
	if($(obj).val()!=""){
		var ul=$(obj).parent().parent().parent();
		var filename=$(obj).val();
		
		var imgSrc="/newresources/images/company_1.png";
				     		var _newli="<li>"
							+"<div class='image_block_pic'>"
								+"<img src='"+imgSrc+"'/>"
								+"<div class='a_bg'></div>"
								+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='deluploadImg(this,"+ data.id +")'>删除</a></div>"
							+"</div>"
							+"<div class='img_block_text'><input type='text' readonly='true' value='" +fileName+ "' /></div>"
							+"<div class='date_block_text'><input type='text' readonly='true' value='" + creatDate + "' /><a onClick='editImgText(this,"+data.id+")'>编辑</a></div>"
						+"</li>";
						
		$(ul).prepend(_newli);
		//当前上传控件清空
		$(obj).val("");
	}
}



	//保存规模能力页面中的信息
	function saveScalePowerInfo() {
		var error_str = "";
		var obj;//检测对象
		for (i = 1; i <= device_rowCount; i++) {
			if ($("#device_name" + i + "").val() != ""
					|| $("#device_format" + i + "").val() != ""
					|| $("#device_place" + i + "").val() != ""
					|| $("#device_price" + i + "").val() != 0
					|| $("#device_buy_day" + i + "").val() != ""
					|| $("#device_num" + i + "").val() != 0
					|| $("#device_advanced" + i + "").val() != "") {
				if ($("#device_name" + i + "").val() == ""
						|| $("#device_num" + i + "").val() == "") {
					//$("#devicelist_table").append("<tr><td colspan='7'><div class='info_explain_wrap'></div></td></tr>");
					$("#device_name" + i + "").parent().parent().parent().find(
							"tr:last").find("td").find(".info_explain_wrap")
							.html(
									"<img src='/newresources/images/new/er.png' /><span class='redcolor'>"
											+ "请输入设备名称和设备数量" + "</span>");
					$("#device_name" + i + "").parent().parent().parent().find(
							"tr:last").find("td").find(".info_explain_wrap")
							.fadeIn("fast");
					error_str = "请输入设备名称和设备数量";
					obj = $("#device_name" + i + "");
				} else if (!num_reg.test($("#device_price" + i + "").val())
						|| !int_reg.test($("#device_num" + i + "").val())) {
					$("#device_name" + i + "").parent().parent().parent().find(
							"tr:last").find("td").find(".info_explain_wrap")
							.html(
									"<img src='/newresources/images/new/er.png' /><span class='redcolor'>"
											+ "请确认价值和数量为数字" + "</span>");
					$("#device_name" + i + "").parent().parent().parent().find(
							"tr:last").find("td").find(".info_explain_wrap")
							.fadeIn("fast");
					error_str = "请确认价值和数量为数字";
					obj = $("#device_name" + i + "");
				} else {
					//$("#device_name"+ i +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").parent().parent().remove();
				}
			}
		}
		for (i = 1; i <= otherperson_rowCount; i++) {
			if ($("#otherperson" + i + "").val() != "") {
				if (!int_reg.test($("#otherperson" + i + "").val())) {
					$("#otherperson" + i + "").parent().next().next().next()
							.find(".info_explain_wrap").html(
									"<img src='/newresources/images/new/er.png' /><span class='redcolor'>"
											+ "请输入数字" + "</span>");
					$("#otherperson" + i + "").parent().next().next().next()
							.find(".info_explain_wrap").fadeIn("fast");
					error_str = "请输入数字";
					obj = $("#otherperson" + i + "");
				}
			}
		}
		for (i = 1; i <= persontype_rowCount; i++) {
			if ($("#persontype" + i + "").val() != "") {
				if (!int_reg.test($("#persontype" + i + "").val())) {
					$("#persontype" + i + "").parent().next().next().next()
							.find(".info_explain_wrap").html(
									"<img src='/newresources/images/new/er.png' /><span class='redcolor'>"
											+ "请输入数字" + "</span>");
					$("#persontype" + i + "").parent().next().next().next()
							.find(".info_explain_wrap").fadeIn("fast");
					error_str = "请输入数字";
					obj = $("#persontype" + i + "");
				}
			}
		}
		if ($("#turnover").val() != "") {
			if (!num_reg.test($("#turnover").val())) {
				error_str = "请输入数字";
				obj = $("#turnover");
			} else {
				if ($("#turnover").val() != 0
						&& $("#turnover_currency_id").val() == 0) {//币种不能不选择
					error_str = "请输入币种";
					obj = $("#turnover_currency_id");
				}
			}
		}

		if ($("#exportNum").val() != "") {
			if (!num_reg.test($("#exportNum").val())) {
				error_str = "请输入数字";
				obj = $("#exportNum");
			} else {
				if ($("#exportNum").val() != 0
						&& $("#export_currency_id").val() == 0) {//币种不能不选择
					error_str = "请输入币种";
					obj = $("#export_currency_id");
				}
			}
		}
		if ($("#importNum").val() != "") {
			if (!num_reg.test($("#importNum").val())) {
				error_str = "请输入数字";
				obj = $("#importNum");
			} else {
				if ($("#importNum").val() != 0
						&& $("#import_currency_id").val() == 0) {//币种不能不选择
					error_str = "请输入币种";
					obj = $("#import_currency_id");
				}
			}
		}
		if ($("#companyArea").val() != "") {
			if (!num_reg.test($("#companyArea").val())) {
				error_str = "请输入数字";
				obj = $("#companyArea");
			}
		}
		if ($("#factoryArea").val() != "") {
			if (!num_reg.test($("#factoryArea").val())) {
				error_str = "请输入数字";
				obj = $("#factoryArea");
			}
		}

		if (error_str != "") {//错误信息显示
			$(obj)
					.nextAll(".info_explain_wrap")
					.html(
							"<div style='width:120px;' ><img src='/newresources/images/new/er.png' /><span class='redcolor'>"
									+ error_str + "</span></div>");
			$(obj).nextAll(".info_explain_wrap").fadeIn("fast");
			$(obj).focus();
			return;
		} else {
			$(obj).nextAll(".info_explain_wrap").fadeIn("fast");
		}

		//获取基本信息
		var emplyees = $("#emplyees").val();//公司总人数                           
		var companyArea = $("#companyArea").val();
		var turnover = $("#turnover").val();
		var importNum = $("#importNum").val();
		var exportNum = $("#exportNum").val();
		var factoryArea = $("#factoryArea").val();
		var useBegintime = $("#useBegintime").val();//开始时间                  
		var useEndtime = $("#useEndtime").val();//结束时间                      
		var schoolCoop = $("#schoolCoop").val();

		var params = {};
		if (save_scalepower_flag) {
			$("#qualityControl").find("input").each(function(index, element) {
				if ($(element)[0].checked) {
					params.qualityControl = $(element).val();
				}
			});
			$("#isOem").find("input").each(function(index, element) {
				if ($(element)[0].checked) {
					params.isOem = $(element).val();
				}
			});
			$("#certificationSystem").find("input").each(
					function(index, element) {
						if ($(element)[0].checked) {
							switch (index) {
							case 0:
								params.certificationSystem = "";
								break;
							case 1:
								params.certificationSystem = "ISO9000";
								break;
							case 2:
								params.certificationSystem = "ISO14000";
								break;
							case 3:
								params.certificationSystem = $(
										"#certification_system_other").val();
								break;
							default:
								break;
							}
						}
					});

			var factoryOwner = $("#factory_owner").val();//产权
			var turnoverCurrencyId = $("#turnover_currency_id").val();//营业额货币
			var importCurrencyId = $("#import_currency_id").val();//进口额货币
			var exportCurrencyId = $("#export_currency_id").val();//出口额货币	
			save_scalepower_flag = false;
			params.emplyees = emplyees;
			params.turnover = turnover;
			params.importNum = importNum;
			params.exportNum = exportNum;
			params.companyArea = companyArea;
			params.factoryArea = factoryArea;
			params.useBegintime = useBegintime;
			params.useEndtime = useEndtime;
			params.schoolCoop = schoolCoop;
			params.factoryOwner = factoryOwner;
			params.turnoverCurrencyId = turnoverCurrencyId;
			params.importCurrencyId = importCurrencyId;
			params.exportCurrencyId = exportCurrencyId;

			//获取设备
			var flagForDevice = 0;
			var device = new Array();
			$("#devicelist_table")
					.find("tr")
					.each(
							function(index, element) {
								var deviceItem = {};
								deviceItem.deviceId = $(element).find("input")
										.eq(7).val();
								deviceItem.advanced = $(element).find("input")
										.eq(6).val();
								deviceItem.deviceNum = $(element).find("input")
										.eq(5).val();
								deviceItem.buyDay = $(element).find("input")
										.eq(4).val();
								deviceItem.price = $(element).find("input").eq(
										3).val();
								deviceItem.place = $(element).find("input").eq(
										2).val();
								deviceItem.specifications = $(element).find(
										"input").eq(1).val();
								deviceItem.deviceName = $(element)
										.find("input").eq(0).val();
								if (typeof (deviceItem.deviceName) != "undefined") {
									device[flagForDevice] = deviceItem;
									flagForDevice++;
								}
							});
			var deviceString = objectArrayToString(device);//将js的数组对象转化为String //base.js中
			params.device = deviceString;
			params.attched = doAttched();
			
			//获取其他人员
			$("#otherperson_table").find("tr").each(function(index, element) {
				var otherPersonType = $(element).find("select").val();

				switch (otherPersonType) {
				case "0":
					break;
				case "1":
					params.techNum = $(element).find("input").val();
					break;
				case "2":
					params.opNum = $(element).find("input").val();
					break;
				case "3":
					params.qcNum = $(element).find("input").val();
					break;
				case "4":
					params.staffNum = $(element).find("input").val();
					break;
				case "5":
					params.internalAuditorNum = $(element).find("input").val();
					break;
				default:
					break;
				}
			});

			//人员类型
			$("#persontype_table").find("tr").each(function(index, element) {
				var personType = $(element).find("select").val();

				switch (personType) {
				case "0":
					break;
				case "1":
					params.collegeNum = $(element).find("input").val();
					break;
				case "2":
					params.diplomaNum = $(element).find("input").val();
					break;
				case "3":
					params.diplomaDownNum = $(element).find("input").val();
					break;
				default:
					break;
				}
			});
			if ($("[name = certification_system]:radio")[0].checked == true) {
				$("#certification_system_other").val("");
			}
			if ($("[name = certification_system]:radio")[1].checked == true) {
				$("#certification_system_other").val("");
			}
			if ($("[name = certification_system]:radio")[2].checked == true) {
				$("#certification_system_other").val("");
			}

			for (i = 1; i < $("[name = certification_system]:radio").length; i++) {
				var radio = $("[name = certification_system]:radio")[i];
				if (radio.checked == true) {
					if ($("#management_system").attr("src") == "/newresources/images/uploadImg.png") {
						$("#management_sys_tip").css("display", "block");
						$("#management_system_pic").focus();
						save_scalepower_flag = true;
						return;
					}
				}
			}
			updateBaseInfo1(params, "", companyId);//更新基础信息   base.js中
		}
	}
	var flag=true;
	//上传文档文件
	function addText(fileType) {//fileType 30
		if(flag){
			flag=false;
		var fileName = $("#qc_file_table_capability").val();
		if (fileName != "" && fileName != null) {//上传空间是否为空
			var ul = $("#annex_text");
			var imgSrc = "/newresources/images/company_1.png";

			var fileElementId = $("#qc_file_table_capability").attr("id");
			var fileType = fileType;//文件类别
			fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);//保留后缀名
			
			var fileurl = "PfTaskFileCtrl/addOrUpdateTaskImgFile.do";
			var params = {};
			params.companyId = companyId;
			params.fileType = fileType;
			params.fileName = fileName;
			params.formatType = "text";
			var fn = function(data){
				if (data.success == true && data.message == "上传成功") {
								imgSrc = getwebroot()
										+ "PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="
										+ data.mongodbId;

								var _newli = "<tr>"
										+ "<td><a style='float:left; width:200px; overflow:hidden;' onClick='downloadText_find(this)'>"
										+ fileName
										+ "</a><td>"
										+ "<td>"
										+ data.creatDate
										+ "</td>"
										+ "<td><img src='/newresources/images/del2.png'  onClick='deluploadText(this,"
										+ data.fileId
										+ ")'/><a style='float:none' onClick='deluploadText(this,"
										+ data.fileId
										+ ")'>删除</a></td>"//虽使用的deluploadImg，但仍是删除文档
										+ "<td align='right' style='width:200px'>"
										+ "<input type='hidden' value="+ data.mongodbId +">"
										+ "</td>" + "</tr>";

								$(ul).prepend(_newli);
								var option = {
									title : "提示",
									btn : parseInt("0001", 2)
								};
								window.wxc.xcConfirm(data.message,
										window.wxc.xcConfirm.typeEnum.custom,
										option);
								//当前上传控件清空
								$("#qc_file_table_capability").val("");
								$("#qc_file_name").val("");
								flag=true;
							} else {
								//alert("false:"+data.message);
								var option = {
									title : "提示",
									btn : parseInt("0001", 2)
								};
								window.wxc.xcConfirm(data.message,
										window.wxc.xcConfirm.typeEnum.custom,
										option);
										flag=true;
							}
			};
    		addInputUtilFile(fileurl,params,fileElementId,fn);
		}
		}
	}

	function showviewtext() {
		var filename = $("#qc_file_table_capability").val();
		$("#qc_file_name").val(filename);
		if (filename) {
			$("#qc_file_name").nextAll(".info_explain").fadeOut("fast");
		}
	}

	function showText(fileType) {
		var url = "PfTaskFileCtrl/getTaskFileListForWindow.do";
		var params = {};
		params.fileTypeId = fileType;
		params.companyId = companyId;

		var isasync = true;
		var fn = function(result) {
			for ( var i = 0; i < result.data.length; i++) {
				var creatDate = result.data[i].create_dt;
				var _newli = "<tr>"
						+ "<td><a style='float:left; width:200px; overflow:hidden;' onClick='downloadText_find(this)'>"
						+ result.data[i].file_name
						+ "</a><td>"
						+ "<td>"
						+ result.data[i].create_dt
						+ "</td>"
						+ "<td><img src='/newresources/images/del2.png'  onClick='deluploadText(this,"
						+ result.data[i].id
						+ ")'/><a style='float:none' onClick='deluploadText(this,"
						+ result.data[i].id
						+ ")'>删除</a></td>"//虽使用的deluploadImg，但仍是删除文档
						+ "<td align='right' style='width:200px'><input type='hidden' value="+ result.data[i].mogodb_id +"></td>"
						+ "</tr>";

				$("#annex_text").prepend(_newli);
			}
		};

		asyncAjaxMethod(url, params, isasync, fn);
	}

	//删除上传的文档对象
	function deluploadText(obj, fileId) {
		window.wxc.xcConfirm("确认删除么", window.wxc.xcConfirm.typeEnum.confirm, {
			onOk : function() {
				var url = "PfTaskFileCtrl/deleteTaskFile.do";
				var params = {};
				var isasync = true;
				var fn = function() {
					//无操作
				};

				params.fileId = fileId;
				asyncAjaxMethod(url, params, isasync, fn);

				$(obj).parent().parent().remove();
			},
			onCancel : function() {
			}

		});
	}

	//下载文档
	function downloadText_find(obj) {
		window.open(getwebroot()
				+ "PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="
				+ $(obj).parent().next().next().next().next().find("input")
						.val());
	}
	
	function doAttched(){
		var attched = new Array();
		var id;
		var mogodb_id;
		var srcStr=$("#management_system").attr("src");
		if(srcStr!="/newresources/images/uploadImg.png"){
				mogodb_id=srcStr.substring(srcStr.indexOf("=")+1);
		}
			var str=$("#management_system").next().next().children().attr("onclick");
			if(str!=null&&str!=""){
				id=str.substring(str.indexOf(",")+1,str.length-1);
			}
			var attchedItem = {};
			attchedItem.id = id;
			attchedItem.mogodbId = mogodb_id;
			attchedItem.fileTypeId = 25;
			attchedItem.isUpdate=0;
			if(typeof(attchedItem.id) != "undefined" && typeof(attchedItem.mogodbId) != "undefined"){
				attched[0] = JSON.stringify(attchedItem);//将对象转化为字符串
			}
		return attched.toString();//返回数据对象的string格式
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
			<!-- <span class="f_l ml10">浙江泰普森休闲用品有限公司<span class="span_rz ml10">已认证</span></span> -->
			<span  class="f_l ml10"><span id="companyNameInHead">...</span><span id="isCheck" class="span_rz ml10" style="width:60px;">实名入驻</span></span>
		</div>
		<div class="account_right_inner_wrap">
			<h4>企业信息</h4>
<!-- 			<div id="sub_baseInfo_tab" class="triangle_bottomright"></div> -->
			<ul class="companyInfo_tab clearfix">
				<li style="border:none;" ><a href="/supplierForPlateForm/baseInfo.htm"  target="_self">基本信息</a><span class="split">|</span></li>
				<li><a href="/supplierForPlateForm/detailsInfo.htm">详细信息</a><span class="split">|</span></li>
				<li  class="selected"><a class="selected"  href="/supplierForPlateForm/scalepowerInfo.htm"  target="_self">规模能力</a></li>
			</ul>
			
			<div class="comm_inner_line_wrap mt10 clearfix">
				<div class="label_wrap">员工人数</div>
				<input id="emplyees" type="text" class="input_wrap" size="50" /><span class="f_l mt10 ml10">人</span>
				<div class='info_explain_wrap'></div>
			</div>
			<!-- <div class="comm_inner_line_wrap clearfix">
				<div class="label_wrap">研发人数</div>
				<input id="techNum" type="text" class="input_wrap" size="50" /><span class="f_l mt10 ml10">人</span>
				<div class="info_explain" style="display:block"></div>
			</div> -->	
			<div class="comm_inner_line_wrap clearfix">
				<div class="label_wrap">其他人员</div>
				<table class="block_table2 f_l" id="otherperson_table">
					<tr id="otherperson_row1">
						<td>
							<select id="otherperson_select1" name="otherperson" class="select_wrap" style="width:150px; height:32px;" onChange="">
								 <option value="0">请选择</option>
								 <option value="1">研发人员</option>
								 <option value="2">操作工</option>
								 <option value="3">专职检验</option>
								 <option value="4">间接员工</option>
								 <option value="5">内审人员</option>
							</select>
						
							<input id="otherperson1" type="text" style=" width:150px;" class="input_wrap" size="50" />
							<div class='info_explain_wrap'></div>
							<span class="f_l mt10 ml10">人</span>
						</td>
						<td><img src="/newresources/images/del.png"  onClick="delOtherpersonRow(this,1)"/></td>
						<td class="redcolor"></td>
						<td><div class='info_explain_wrap'></div></td>
					</tr>
				  	<tfoot>
						<tr ><td><a onClick="addOtherpersonRow('otherperson_table')"><img src="/newresources/images/add.png" />添加</a></td></tr>
					</tfoot>
				</table>
			</div>
			<div class="comm_inner_line_wrap clearfix">
				<div class="label_wrap">人员结构</div>
				<table class="block_table2 f_l" id="persontype_table">
					<tr id="persontype_row1">
						<td>
							<select id="persontype_select1" name="persontype" class="select_wrap" style="width:150px; height:32px;" onChange="">
								 <option value="0">请选择</option>
								 <option value="1">大专及以上</option>
								 <option value="3">大专以下</option>
							</select>
							<input id="persontype1" type="text" style=" width:150px;" class="input_wrap" size="50" />
							<span class="f_l mt10 ml10">人</span>
						</td>
						<td><img src="/newresources/images/del.png"  onClick="delPersontypeRow(this,1)"/></td>
						<td class="redcolor"></td>
						<td><div class='info_explain_wrap'></div></td>
					</tr>
				  	<tfoot>
						<tr ><td><a onClick="addPersontypeRow('persontype_table')"><img src="/newresources/images/add.png" />添加</a></td></tr>
					</tfoot>
				</table>
			</div>
			<hr class="hr_grey" />
			<div id="certificationSystem" class="comm_inner_line_wrap clearfix mt10">
				<div class="label_wrap">管理体系认证</div>
				<label class="checkbox_wrap f_l"><input name="certification_system" class="input_checkbox"  checked="checked"  type="radio" value="" />无</label>
				<label class="checkbox_wrap f_l"><input name="certification_system" class="input_checkbox"  type="radio" value="" />ISO9000</label>
				<label class="checkbox_wrap f_l"><input name="certification_system" class="input_checkbox"  type="radio" value="" />ISO14000</label>
				<label class="checkbox_wrap f_l"><input name="certification_system" class="input_checkbox"  type="radio" value="" />其他认证</label>
				<input type="text" id="certification_system_other" class="input_wrap" size="20" />
				<!--管理体系认证图片上传-->
				<ul id="certification_system_imgs" class="comm_img_ul_wrap mt20 ml120 f_l clearfix">
					<li>
						<div class="image_block_pic">
							<a><img id="management_system" src="/newresources/images/other/11.png" /></a>
							<!-- <input class="uploadfile_input" type="file" onChange="addCertifsystemImg(this)" /> -->
							<input id="management_system_pic" class="uploadfile_input" type="file" name="file" onChange="showPic1(this)" />
						</div>
						<div id="management_sys_tip">
							<img src='/newresources/images/new/er.png' /><span class='redcolor'>请上传管理体系证照</span>
						</div>
					</li>
				</ul>
			</div>
			<div id="qualityControl" class="comm_inner_line_wrap clearfix mt10">
				<div class="label_wrap">质量控制</div>
				<label class="checkbox_wrap f_l"><input name="quality_control" class="input_checkbox"  type="radio" value="0"  />内部</label>
				<label class="checkbox_wrap f_l"><input name="quality_control" class="input_checkbox"  type="radio" value="1"  />第三方</label>
				<label class="checkbox_wrap f_l"><input name="quality_control" class="input_checkbox"  type="radio" value="2"  />无</label>
			</div>
			<div id="isOem" class="comm_inner_line_wrap clearfix mt10">
				<div class="label_wrap">OEM带加工</div>
				<label class="checkbox_wrap f_l"><input name="OEM" class="input_checkbox"  type="radio" value="0" />提供</label>
				<label class="checkbox_wrap f_l"><input name="OEM" class="input_checkbox"  type="radio" value="1" />不提供</label>
			</div>
			<hr class="hr_grey" />
			<div class="comm_inner_line_wrap clearfix mt10">
				<div class="label_wrap">年营业额</div>
				<input id="turnover" type="text" class="input_wrap" style="width:200px;" /> 
				<span class="unit_span">万</span>
				<select id="turnover_currency_id" class="select_wrap" style="width:100px; height:32px;">
					<option value="0">--请选择--</option>
				</select>
				<div class='info_explain_wrap'></div>
			</div>
			<div class="comm_inner_line_wrap clearfix mt10">
				<div class="label_wrap">年出口额</div>
				<input id="exportNum" type="text" class="input_wrap" style="width:200px;" />
				<span class="unit_span">万</span>
				<select id="export_currency_id" class="select_wrap" style="width:100px; height:32px;">
					<option value="0">--请选择--</option>
				</select>
				<div class='info_explain_wrap'></div>
			</div>
			<div class="comm_inner_line_wrap clearfix mt10">
				<div class="label_wrap">年进口额</div>
				<input id="importNum" type="text" class="input_wrap" style="width:200px;" />
				<span class="unit_span">万</span>
				<select id="import_currency_id" class="select_wrap" style="width:100px; height:32px;">
					<option value="0">--请选择--</option>
				</select>
				<div class='info_explain_wrap'></div>
			</div>
			<hr class="hr_grey" />
			<div class="comm_inner_line_wrap clearfix mt10">
				<div class="label_wrap">企业面积</div>
				<input id="companyArea" type="text" class="input_wrap" style="width:200px;" /><span class="f_l mt10 ml10">平方米</span>
				<div class='info_explain_wrap'></div>
			</div>
			<div class="comm_inner_line_wrap clearfix mt10">
				<div class="label_wrap">厂房面积</div>
				<input id="factoryArea" type="text" class="input_wrap" style="width:200px;" /><span class="f_l mt10 ml10">平方米</span>
				<div class='info_explain_wrap'></div>
			</div>
			<div class="comm_inner_line_wrap clearfix mt10">
				<div class="label_wrap">产权</div>
				<select id="factory_owner" class="select_wrap" style="width:100px; height:32px;">
					<option value="0">请选择</option>
					<option value="1">租赁</option>
					<option value="2">自建</option>
				</select>
			</div>
			<div class="comm_inner_line_wrap clearfix mt10">
				<div class="label_wrap">使用年限</div>
				<input id="useBegintime" type="text" onClick="WdatePicker({maxDate:'#F{$dp.$D(\'useEndtime\')}',readOnly:true})" class="input_wrap Wdate" style="width:120px;" />
				<span class="f_l mt8 ml10 mr10">—</span>
				<input id="useEndtime" type="text" onClick="WdatePicker({minDate:'#F{$dp.$D(\'useBegintime\')}',readOnly:true})" class="input_wrap Wdate" style="width:120px;" />
			</div>
			<hr class="hr_grey" />
			<div class="comm_inner_line_wrap clearfix" >
				<div class="label_wrap">设备清单</div>
			
			<table class="block_table f_l ml20" id="devicelist_table">
					<tr>
						<th>设备名称</th>
						<th>规格</th>
						<th>产地</th>
						<th>价值(万元)</th>
						<th>购买日期</th>
						<th>数量</th>
						<th>先进性</th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
					<tr id="device_row1">
						<td><input id="device_name1" type="text" style=" width:120px;" class="input_wrap" size="50" /></td>
						<td><input id="device_format1" type="text" style=" width:90px;" class="input_wrap" size="50" /></td>
						<td><input id="device_place1" type="text" style=" width:90px;" class="input_wrap" size="50" /></td>
						<td><input id="device_price1" type="text" style=" width:90px;" class="input_wrap" size="50" /></td>
						<td><input id="device_buy_day1" type="text" style=" width:90px;" onClick="WdatePicker({readOnly:true})" class="input_wrap Wdate" /></td>
						<td><input id="device_num1" type="text" style=" width:60px;" class="input_wrap" size="20" /></td>
						<td><input id="device_advanced1" type="text" style=" width:90px;" class="input_wrap" size="50" /></td>
						<td><img src="/newresources/images/del.png"  onClick="delDevicelistRow(this,1)"/></td>
						<td class="redcolor"></td>
						<td style="dispaly:none;"><input id="device_id1" type="hidden" value="-1"></td>
					</tr>
					<tr><td colspan='7'><div class='info_explain_wrap'></div></td></tr>
				  	<tfoot>
						<tr ><td><a onClick="addDevicelistRow('devicelist_table')"><img src="/newresources/images/add.png" />添加</a></td></tr>
					</tfoot>
				</table>
			</div>
			<hr class="hr_grey" />
			<div class="comm_inner_line_wrap clearfix mt10">
				<div class="label_wrap">院校合作</div>
				
			</div>
			<div class="company_simple_descript_tip">总共可以输入<span class="redcolor">400</span>个字,剩余<span id="remain_words_num" class="redcolor">400</span>个字</div>
			<textarea id="schoolCoop" class="company_simple_descript"></textarea>
			<div class="comm_inner_line_wrap clearfix mt10">
				<div class="label_wrap">附件资料</div>
				<table id="annex_text" class="block_table f_l">
					<!-- <tr>
						<td><a style="float:left; width:200px; overflow:hidden;">name.docx</a><td>
						<td>2016-03-22</td>
						<td><img src="/newresources/images/del.png"  onClick="delDevicelistRow(this,2)"/></td>
						<td></td>
					</tr> -->
					<thead>
						<tr>
							<span class="mini_span">请选择5M以下.doc/.docx;.ppt/.pptx/.pps;.xls/.xlsx;.pdf;.txt文件</span>
							<td colspan="5">
							<div class="inner_line_wrap_attachment">
								<input id="qc_file_name" class="input_wrap_attachment " type="text" />
								<div class="file_wrap_attachment">
									<div class="file_wrap_inner_attachment">
										<input id="file_no"  style="display:none" value="0"/>
										<button class="file_btn_attachment" id="qc_file_bu">选择文件</button>
										<input type="file" name ="file" id ="qc_file_table_capability" class="uploadfile_input_attachment" onChange="showviewtext()" />
									</div>
								</div>
								<button class="file_btn_attachment"  onClick="addText(30)">上传</button>	
								<div class="info_explain"></div>
							</div>
						</tr>
					</thead>
				</table>
			</div>
			<hr class="hr_grey" />
			<div class="comm_inner_line_wrap">
				<div class="label_wrap">专利</div>
			</div>
			<div class="comm_inner_line_wrap clearfix mt10">
				<ul id="patent_imgs" class="ul_upload_img_wrap mt20 f_l clearfix">
					<li>
						<div class="image_block_pic">
							<img id="patent" src="/newresources/images/other/11.png" />
							<input id="patent_pic" class="uploadfile_input" type="file" name="file" onChange="addImg(this,26)" />
						</div>
					</li>
				</ul>
			</div>
			<hr class="hr_grey" />
			<div class="comm_inner_line_wrap">
				<div class="label_wrap">其他资质</div>
			</div>
			<div class="comm_inner_line_wrap clearfix mt10">
				<ul id="other_intelligence_imgs" class="ul_upload_img_wrap mt20 f_l clearfix">
					<li>
						<div class="image_block_pic">
							<img id="other_intelligence" src="/newresources/images/other/11.png" />
							<input id="other_intelligence_pic" class="uploadfile_input" type="file" name="file" onChange="addImg(this,27)" />
						</div>
					</li>
				</ul>
			</div>
			<hr class="hr_grey" />
			<div class="company_opreate_btn_wrap" style="text-align:right;">
				<!-- <button class="company_operate_btn">取消</button>&nbsp; -->
				<button class="company_operate_btn" onclick="saveScalePowerInfo()">保存</button>
			</div>
		</div>
		<!--account_right_inner_wrap结束-->
	</div>
</div>

<!--底端-->
<div id="bottom"></div>
</body>
</html>
