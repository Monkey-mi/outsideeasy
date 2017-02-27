<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>详细信息</title>

<link href="/newresources/css/page.css" rel="stylesheet" type="text/css" />
<link href="/vip/resources/css/vippage.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/companyinfo.css" rel="stylesheet" type="text/css" />
<link href='/newresources/css/xcConfirm.css' rel='stylesheet' /> 
<%@ include file="/newresources/js/base.jsp" %>
<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>
<script type="text/javascript" src="/newresources/js/cityOperate.js"></script>
<script type="text/javascript" src="/usercenter/companyManage/js/companyInfo.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.4&ak=4i6arTpbQQ1MfIcFRuoHyXKc"></script>
<script type="text/javascript">
var companyId=getParamFromWindowName("companyIdForAll");
var province={};
var city={};
var country={};
var map;
var lngForAll;//公司经度
var latForAll;//公司纬度
var isUpdate=0;//0 || null 增加,1 更新
var updateForLogo=0;
var updateForImage=0;
var phone_reg= /^((\+?86)|(\(\+86\)))?\d{3,4}-\d{7,8}(-\d{3,4})?$/;
var mphone_reg=/^1[3|4|5|8]\d{9}$/;
var email_reg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
//公司联系电话
var company_phone_flag=false;
//联系人手机
var company_mphone_flag=false;
//地区选择
var company_province_city_distinct_flag = false;
//公司简介
var company_simple_descript_flag=false;
//公司简介
var companyCn__flag=false;
//email
var company_email_flag=false;
//详细地址
var contact_addr_flag=false;

var save_detail_flag=true;//保存标记，防止多次保存

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
		
	var district_error_str	= ""; 
	//加载省
	province=ChineseDistricts[86];//getChineseDistrictList('86');
	$.each(province,function(code,address){
		var option="<option value='"+code+"'>"+address+"</option>";
		$("#province").append(option);
	});
	//加载市
	$("#province").change(function(){
		var province_code=$(this).val();
		if(province_code!=null&&province_code!='0'){
			$("#city").css("display","block");
			city=ChineseDistricts[province_code];//getChineseDistrictList(province_code);
			
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
			countrys=ChineseDistricts[city_code];//getChineseDistrictList(city_code);
			
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
	//判断区是否加载完
	$("#country").change(function(){
		if($(this).val() != 0){
			$(this).nextAll(".info_explain_wrap").fadeOut("fast");
			company_province_city_distinct_flag = true;
		}else{
			company_province_city_distinct_flag = false;
		}
	});
	
	//输入信息时的提示
	$(".input_wrap").on("focus",function(){
			var id=$(this).attr("id");
			var info_str="";
			if(id=="fPhone")
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
		
		if(id=="fPhone")
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
		}else if(id=="mPhone"){
			if($(this).val()!=""&&!mphone_reg.test($(this).val()))
			{
				error_str="请输入正确的联系人手机";
				company_mphone_flag=false;
			}
			else
			{
				company_mphone_flag=true;
			}
		}else if(id=="email"){
			if($(this).val()!=""&&!email_reg.test($(this).val()))
			{
				error_str="请输入正确的EMAIl";
				company_email_flag=false;
			}
			else
			{
				company_email_flag=true;
			}
		}else if(id=="contactAddr")
			{
				if($(this).val()=="")
				{
					//error_str="请输入详细地址";
					contact_addr_flag=false;
				}
				else
				{
					contact_addr_flag=true; 
				}
			} 
		if(error_str!="")
		{
			$(this).nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span></div>");
			$(this).nextAll(".info_explain_wrap").fadeIn("fast");
		}else{
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
				error_str="请输入企业简介";
				company_simple_descript_flag=false;
			}
			else
			{
				company_simple_descript_flag=true;
			}
		}
		if(error_str!=""){//错误信息显示
			$(this).attr("placeholder","企业简介不能为空");
		}
		else
		{
			$(this).nextAll(".info_explain").fadeOut("fast");
		}
		
	});
	
	$("#companyNameCn").on("blur",function(){
		var id=$(this).attr("id");
		var error_str="";
		
		if(id=="companyNameCn")
		{
			if($(this).val()=="")
			{
				error_str="请输入企业简称";
				companyCn__flag=false;
			}
			else
			{
				companyCn__flag=true;
			}
		}
		if(error_str!="")
		{
			$(this).nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span></div>");
			$(this).nextAll(".info_explain_wrap").fadeIn("fast");
		}else{
			$(this).nextAll(".info_explain_wrap").fadeOut("fast");
		}
	});
	remarkMap();
});

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
					showInfo();//数据加载
		
					picPathSrc1(22,"#company_logo");//企业logo
					picPathSrc1(23,"#company_image");//企业形象图
		
					companyIntroductionLimit();//企业简介字数的计算和限制
					showMorePic1(24);//24 为厂容厂貌  showMorePic:显示多张图片的方法
					$(".vip_search_wrap").hide();	
				}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/companyManage/vipCompanyLeftMenu.html",function(){
				$("#evaluation").children().eq(1).children().eq(1).find("a").prepend(">>");
				$("#evaluation").children().eq(1).children().eq(1).addClass("currVip");
			});
		}
	}else{
		$("#top").load(getwebroot()+"platform/top.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
				{
					getCompanyList(companyId);
					$("#mainNav").children().eq(3).addClass("curr");
					companyId=$("#company").val();
					showInfo();//数据加载
		
					picPathSrc1(22,"#company_logo");//企业logo
					picPathSrc1(23,"#company_image");//企业形象图
		
					companyIntroductionLimit();//企业简介字数的计算和限制
					showMorePic1(24);//24 为厂容厂貌  showMorePic:显示多张图片的方法
				}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"usercenter/companyManage/companyLeftMenu.html",function(){
				$("#evaluation").children().eq(1).children().eq(1).css("background","#ececec");
			});
		}
	}
	
}
function showInfo(){
	var url = "supplierForPlateForm/getCompanyInfoByCompanyId1.do";
	var params = {companyId:companyId};
	var fn = function(result){//无操作
			baseInfoShow(result);//基本信息展示
			saleShow(result);//销售品牌
			materialShow(result);//原材料展示
			customerShow(result);//主要用户展示
			competitorShow(result);//主要竞争对手展示
	};
	asyncAjaxMethod(url,params,false,fn);
}	


function baseInfoShow(result){
	cpBaseInfo = result.data.companyBaseInfo;
	$("#companyNameInHead").html(cpBaseInfo.cpyname_cn);
	$("#companyNameCn").val(cpBaseInfo.cpyname_cn);
	$("#contactAddr").val(cpBaseInfo.contact_addr);
	$("#contactAddrPro").val(cpBaseInfo.contact_addr);
	$("#fPhone").val(cpBaseInfo.f_phone);
	$("#contacts").val(cpBaseInfo.contacts);
	$("#mPhone").val(cpBaseInfo.m_phone);
	$("#fax").val(cpBaseInfo.fax);
	$("#email").val(cpBaseInfo.email);
	$("#companyIntroduction").val(cpBaseInfo.company_introduction); 
	$("#remain_words_num").text(400-$("#companyIntroduction").val().length);
	if(cpBaseInfo.lng != 0 && cpBaseInfo.lat != 0){
		$("#lng").val(cpBaseInfo.lng);//经度
		$("#lat").val(cpBaseInfo.lat);//纬度
		lngForAll = cpBaseInfo.lng;
		latForAll = cpBaseInfo.lat;
	}
	
	//省、市、县各级代码
	var provinceNum = Math.floor(parseInt(cpBaseInfo.contact_addr_code)/10000)*10000;
	var cityNum = Math.floor(parseInt(cpBaseInfo.contact_addr_code)/100)*100;
	var countryNum = cpBaseInfo.contact_addr_code;
	
	/*模拟change事件  */
	if(!isNaN(provinceNum)){
		$("#province").val(provinceNum).trigger("change");//设置省级行政区
		$("#city").val(cityNum).trigger("change");//设置市级行政区
		$("#country").val(countryNum).trigger("change");//设置县级行政区
	}
}

//销售品牌  mishengliang 2016-04-18
function saleShow(result){
	var goodsList = result.data.goodsList;
	if(goodsList.length > 0){
		//添加第一条设备信息
		$("#sale_brand_id1").val(goodsList[0].goods_id);
		$("#sale_name1").val(goodsList[0].goods_name);
		$("#sale_brand1").val(goodsList[0].goods_brand);
		
		for(var i=0; i < goodsList.length-1; i++){
			var j = i+2;
			addSaleRow('sale_table');

			$("#sale_brand_id" + j).val(goodsList[i+1].goods_id);
			$("#sale_name" + j).val(goodsList[i+1].goods_name);
			$("#sale_brand" + j).val(goodsList[i+1].goods_brand);
			
			$("#sale_name"+ j +",#sale_brand" + j).blur(function(){
				if($("#sale_name" + j).val() != ""){//只要行中有数据就隐藏提示信息
					$("#sale_name" + j).parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
				}
			});
		}
	}	
	
	$("#sale_name1,#sale_brand1").blur(function(){
		if($("#sale_name1").val() != ""){//只要行中有数据就隐藏提示信息
			$("#sale_name1").parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
		}
	});
}

//原材料展示  mishengliang 2016-04-18
function materialShow(result){
	var metarialList = result.data.metarialList;
	if(metarialList.length > 0){
		//添加第一条设备信息
		$("#material_brand_id1").val(metarialList[0].material_id);
		$("#material_name1").val(metarialList[0].material_name);
		$("#material_brand1").val(metarialList[0].material_brand);
		
		for(var i=0; i < metarialList.length-1; i++){
			var j = i+2;
			addMateialRow('mateial_table');

			$("#material_brand_id" + j).val(metarialList[i+1].material_id);
			$("#material_name" + j).val(metarialList[i+1].material_name);
			$("#material_brand" + j).val(metarialList[i+1].material_brand);
			
			$("#material_name"+ j +",#material_brand" + j).blur(function(){
				if($("#material_name" + j).val() != ""){//只要行中有数据就隐藏提示信息
					$("#material_name" + j).parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
				}
			});
		}
	}	
	
	$("#material_name1,#material_brand1").blur(function(){
		if($("#material_name1").val() != ""){//只要行中有数据就隐藏提示信息
			$("#material_name1").parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
		}
	});
}

//主要用户展示  mishengliang 2016-04-18
 function customerShow(result){
	var customerList = result.data.customerList;
	if(customerList.length > 0){
		//添加第一条主要客户信息
		if(customerList.length > 2){//满足三个数据
			$("#customer_name1").val(customerList[0].customer_name);
			$("#customer_name2").val(customerList[1].customer_name);
			$("#customer_name3").val(customerList[2].customer_name);
			
			$("#customer_id1").val(customerList[0].customer_id);
			$("#customer_id2").val(customerList[1].customer_id);
			$("#customer_id3").val(customerList[2].customer_id);

		}else{//数据未达到三条
			for(var i = 0;i < customerList.length;i++){
				$("#customer_name"+(i+1)).val(customerList[i].customer_name);
				$("#customer_id"+(i+1)).val(customerList[i].customer_id);
			}
		}
		
		$("#customer_name1,#customer_name2,#customer_name3").blur(function(){//失去焦点事件触发
			$("#customer_name1").parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
		});
		
		for(var i=3; i < customerList.length ; ){
			addCustomerRow('customer_table');

			$("#customer_name" + (++i)).val(customerList[i-1].customer_name);
			$("#customer_id" + i).val(customerList[i-1].customer_id);
			if(i < customerList.length){
				$("#customer_name" + (++i)).val(customerList[i-1].customer_name);
				$("#customer_id" + i).val(customerList[i-1].customer_id);
			}
			if(i < customerList.length){
				$("#customer_name" + (++i)).val(customerList[i-1].customer_name);
				$("#customer_id" + i).val(customerList[i-1].customer_id);
			}
		}
	}	
} 

//主要竞争对手展示  mishengliang 2016-04-18
 function competitorShow(result){
	var competitorList = result.data.competitorList;
	if(competitorList.length > 0){
		//添加第一条竞争对手信息
		if (competitorList.length > 2) {
			$("#competitor_name1").val(competitorList[0].competitor_name);
			$("#competitor_name2").val(competitorList[1].competitor_name);
			$("#competitor_name3").val(competitorList[2].competitor_name);
			
			$("#competitor_id1").val(competitorList[0].competitor_id);
			$("#competitor_id2").val(competitorList[1].competitor_id);
			$("#competitor_id3").val(competitorList[2].competitor_id);
		} else {
			for(var i =0; i < competitorList.length; i++){
				$("#competitor_name"+(i+1)).val(competitorList[i].competitor_name);
				$("#competitor_id"+(i+1)).val(competitorList[i].competitor_id);
			}
		}
		
		$("#competitor_name1,#competitor_name2,#competitor_name3").blur(function(){//失去焦点事件触发
			$("#competitor_name1").parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
		});

		for(var i=3; i < competitorList.length ; ){
			addCompetitorRow('competitor_table');

			$("#competitor_name" + (++i)).val(competitorList[i-1].competitor_name);
			$("#competitor_id" + i).val(competitorList[i-1].competitor_id);
			if(i < competitorList.length){
				$("#competitor_name" + (++i)).val(competitorList[i-1].competitor_name);
				$("#competitor_id" + i).val(competitorList[i-1].competitor_id);
			}
			if(i < competitorList.length){
				$("#competitor_name" + (++i)).val(competitorList[i-1].competitor_name);
				$("#competitor_id" + i).val(competitorList[i-1].competitor_id);
			}
		}
	}	
}

// 百度地图API功能
function remarkMap(){
    map = new BMap.Map("allmap",{enableMapClick:false,minZoom:6});
	var point = new BMap.Point(120.134751,30.326912);
	map.centerAndZoom(point,12);
	setMapEvent();//设置地图事件
    addMapControl();//向地图添加控
	custormSearch();//加载自定义搜索
}

//关闭定位到地图层
function close_map(obj)
{
	$(".mask").css("display","none");
	$("#allmap").css("display","none");
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
	
	if($('#city option:selected').val()==''||$('#city option:selected').val()==0){
		window.wxc.xcConfirm("请选择城市",confirm);
		return;
	}else{
		if($('#country option:selected').val()==''||$('#country option:selected').val()==0){
			window.wxc.xcConfirm("请选择区",confirm);
			return;
		}else{
			searchArea=city;
		}
	}
	
	if(street_content != '' && street_content != undefined){
		$(".mask").css("display","block");
		$("#allmap").css("display","block");
		$("#close_map").css("display","block");
		remove_overlay();
		$("#remove_overlay").css("display","block");
		
		var myGeo = new BMap.Geocoder();// 创建地址解析器实例
		myGeo.getPoint(street_content, function(point){// 将地址解析结果显示在地图上,并调整地图视野
 			if(lngForAll != 0 && latForAll != 0 && lngForAll != null && latForAll != null && street_content == street_content_pro){//如果存在数据，构造数据库中取出的点
				point = new BMap.Point(lngForAll, latForAll);
			} 
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
				lngForAll=lng;
				latForAll=lat;
				$("#lng").val(lng);
				$("#lat").val(lat);
				
				marker.addEventListener('dragend',function(e){//dragend拖拽结束时触发此事件
					var geoc = new BMap.Geocoder();
					//获取拖动后的坐标位置
					lng=e.point.lng;
					lat=e.point.lat;
					lngForAll=lng;
					latForAll=lat;
					$("#lng").val(lng);
					$("#lat").val(lat);
					
					geoc.getLocation(e.point, function(rs){
						var addComp = rs.addressComponents;
						$("#contactAddr").val(addComp.street+addComp.streetNumber);//设置拖动后的地址
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
		window.wxc.xcConfirm("请输入详细地址",confirm);
	}
}
	
//根据行政区域下拉框的选择定位到相应的城市
function goToLocation(type){
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
  //var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
 // map.addControl(overviewControl);
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
			map.addOverlay(new BMap.Marker(pp,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{imageOffset: new BMap.Size(0,3)})}));  //添加标注
			alert(pp.lng+","+pp.lat);
		}
		var local = new BMap.LocalSearch(map, { //智能搜索
		  onSearchComplete: myFun
		});
		local.search(myValue);
		}
	}
	
var sale_rowCount=1;  //行数默认1行  
var buy_rowCount=1;
var mateial_rowCount=1;
var  customer_rowCount=3;//行数默认为3行
var competitor_rowCount=3;//行数默认为3行
//添加主要销售产品及品牌行  
function addSaleRow(table_id){
	if($("#sale_name"+ sale_rowCount).val()==""){
		$("#sale_name"+ sale_rowCount).parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入销售产品"+"</span>");
		$("#sale_name"+ sale_rowCount).parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
		return;
	}  else{
		$("#sale_brand"+ sale_rowCount).parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
	}
	sale_rowCount++;
    var newRow="<tr id='sale_row"+ sale_rowCount +"'>"
					+"<td><input id='sale_name"+ sale_rowCount +"' type='text'   placeholder='产品名称' /></td>"
					+"<td><input id='sale_brand"+ sale_rowCount +"' type='text'  placeholder='品牌' /></td>"
					+"<td><img src='/newresources/images/del.png' onclick='delSaleRow(this,"+ sale_rowCount +")' /></td>"
					+"<td style='dispaly:none;'><input id='sale_brand_id"+ sale_rowCount +"' type='hidden' value='-1'></td>"
					+"<td><div class='info_explain_wrap'></div></td>"
				+"</tr>";  
    $('#'+table_id).append(newRow);
    
	$("#sale_name"+ sale_rowCount +",#sale_brand" + sale_rowCount).blur(function(){
		if($("#sale_name" + sale_rowCount).val() != ""){//只要行中有数据就隐藏提示信息
			$("#sale_name" + sale_rowCount).parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
		}
	});
}  
  
//删除行  
function delSaleRow(obj,sale_rowCountForDel){  
	var id= $(obj).parent().parent().find("#sale_brand_id"+sale_rowCountForDel).val();
	
	if(id!=null&& id!="")
	{
		$.ajax({
			type:"POST",
			url: getwebroot()+"PfGoodsCtrl/deleteGoods.do",
			dataType:"json",
			data:{
				goodsId:id
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
	if(sale_rowCount<2)
	{
		$(obj).parent().parent().find("input").val("");
		$(obj).parent().next().find("input").val("-1");
	}
	else
	{
		$(obj).parent().parent().remove();
		sale_rowCount--; 
	}
    
}  

 //添加原材料及品牌行  
function addMateialRow(table_id){  
	if($("#material_name"+ mateial_rowCount +"").val()==""){
		$("#material_name"+ mateial_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入原材料名"+"</span>");
		$("#material_name"+ mateial_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
		return;
	}  else{
		$("#material_name"+ mateial_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
	}  
	mateial_rowCount++;  
    var newRow="<tr id='mateial_row"+ mateial_rowCount +"'>"
					+"<td><input id='material_name"+ mateial_rowCount +"'  type='text'  placeholder='材料名称' /></td>"
					+"<td><input id='material_brand"+ mateial_rowCount +"' type='text'  placeholder='材料品牌' /></td>"
					+"<td><img src='/newresources/images/del.png' onclick='delMateialRow(this,"+ mateial_rowCount +")' /></td>"
					+"<td style='dispaly:none;'><input id='material_brand_id"+ mateial_rowCount +"' type='hidden' value='-1'></td>"
					+"<td><div class='info_explain_wrap'></div></td>"
				+"</tr>";  
    $('#'+table_id).append(newRow); 
    
    $("#material_name"+ mateial_rowCount +",#material_brand" + mateial_rowCount).blur(function(){
		if($("#material_name" + mateial_rowCount).val() != ""){//只要行中有数据就隐藏提示信息
			$("#material_name" + mateial_rowCount).parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
		}
	}); 
}  
  
//删除行  
function delMateialRow(obj,mateial_rowCountForDel){  
    var id= $(obj).parent().parent().find("#material_brand_id"+mateial_rowCountForDel).val();
	
	if(id!=null&& id!="")
	{
		$.ajax({
			type:"POST",
			url: getwebroot()+"PfMetarialCtrl/deleteMetarial.do",
			dataType:"json",
			data:{
				metarialId:id
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
	if(mateial_rowCount<2)
	{
		$(obj).parent().parent().find("input").val("");
		$(obj).parent().next().find("input").val("-1");
	}
	else
	{
		$(obj).parent().parent().remove();
		mateial_rowCount--;   
	}
} 
 //添加主要客户行  
function addCustomerRow(table_id){  
    var customer_rowCount1=customer_rowCount-1;
    var customer_rowCount2=customer_rowCount-2;
    if($("#customer_name"+ customer_rowCount +"").val()==""||$("#customer_name"+ customer_rowCount1 +"").val()==""||$("#customer_name"+ customer_rowCount2 +"").val()==""){
		$("#customer_name"+ customer_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入客户"+"</span>");
		$("#customer_name"+ customer_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
		return;
	}  else{
		$("#customer_name"+ customer_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
	} 
    var newRow="<tr id='customer_row1'>"
					+"<td><input id='customer_name"+ (++customer_rowCount) +"' class='customer_name' style='width:180px;' type='text'  placeholder='客户名称' /><input class='customer_id' id='customer_id"+ customer_rowCount +"' type='hidden' value='-1'/></td>"
					+"<td><input id='customer_name"+ (++customer_rowCount) +"' class='customer_name' style='width:180px;' type='text'  placeholder='客户名称' /><input class='customer_id' id='customer_id"+ customer_rowCount +"' type='hidden' value='-1'/></td>"
					+"<td><input id='customer_name"+ (++customer_rowCount) +"' class='customer_name' style='width:180px;' type='text'  placeholder='客户名称' /><input class='customer_id' id='customer_id"+ customer_rowCount +"' type='hidden' value='-1'/></td>"
					+"<td><img src='/newresources/images/del.png' onclick='delCustomerRow(this,"+ customer_rowCount +")' /></td>"
					+"<td><div class='info_explain_wrap'></div></td>"
				+"</tr>";
    $('#'+table_id).append(newRow);
    
    $("#customer_name"+(customer_rowCount-2)+",#customer_name"+(customer_rowCount-1)+",#customer_name"+customer_rowCount).blur(function(){//失去焦点事件触发
		$("#customer_name"+customer_rowCount).parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
	});
}  
  
//删除行  
function delCustomerRow(obj,customer_rowCountForDel){  
	var ids = "";
	$(obj).parent().parent().find(".customer_id").each(function(index,element){//获取行中所有的id
		if($(element).val() != "")
			ids = ids + $(element).val() + ",";
	});
	ids = ids.substring(0, ids.length-1);//将最后的逗号切掉
	delCustomerByIds(ids);
	
	//如果是第一行，保留界面元素
	if(customer_rowCount<2*3)
	{
		$(obj).parent().parent().find("input").val("");
		$(obj).parent().parent().find("input").each(function(){
			$(this).next().val("-1");
		});
	}
	else
	{
		$(obj).parent().parent().remove();
		customer_rowCount = customer_rowCount-3;
	}
}

//通过ids删除主要客户
function delCustomerByIds(ids){
	if(ids!=null && ids!="")
	{
		$.ajax({
			type:"POST",
			url: getwebroot()+"PfCustomerCtrl/deleteCustomer.do",
			dataType:"json",
			data:{
				customerIds:ids
			},
			success:function(result){
				//alert("删除成功");
			},
			error:function(result){
				//alert(result.message);
			}
		});
		
	}
}

 //添加主要竞争对手行  
function addCompetitorRow(table_id){  
    var competitor_rowCount1=competitor_rowCount-1;
    var competitor_rowCount2=competitor_rowCount-2;
    if($("#competitor_name"+ competitor_rowCount +"").val()==""||$("#competitor_name"+ competitor_rowCount1 +"").val()==""||$("#competitor_name"+ competitor_rowCount2 +"").val()==""){
		$("#competitor_name"+ competitor_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入竞争对手"+"</span>");
		$("#competitor_name"+ competitor_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
		return;
	}  else{
		$("#competitor_name"+ competitor_rowCount +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
	}  
    var newRow="<tr id='competitor_row1'>"
					+"<td><input id='competitor_name"+ (++competitor_rowCount) +"' class='competitor_name' style='width:180px;'  type='text' placeholder='对手名称' /><input id='competitor_id"+ competitor_rowCount +"' type='hidden' class='competitor_id' value='-1'/></td>"
					+"<td><input id='competitor_name"+ (++competitor_rowCount) +"' class='competitor_name' style='width:180px;' type='text'  placeholder='对手名称' /><input id='competitor_id"+ competitor_rowCount +"' type='hidden' class='competitor_id' value='-1'/></td>"
					+"<td><input id='competitor_name"+ (++competitor_rowCount) +"' class='competitor_name' style='width:180px;' type='text'  placeholder='对手名称' /><input id='competitor_id"+ competitor_rowCount +"' type='hidden' class='competitor_id' value='-1'/></td>"
					+"<td><img src='/newresources/images/del.png' onclick='delCompetitorRow(this,"+ competitor_rowCount +")' /></td>"
					+"<td><div class='info_explain_wrap'></div></td>"
				+"</tr>";
    $('#'+table_id).append(newRow);  
    
    $("#competitor_name"+(competitor_rowCount-2)+",#competitor_name"+(competitor_rowCount-1)+",#competitor_name"+competitor_rowCount).blur(function(){//失去焦点事件触发
		$("#competitor_name"+competitor_rowCount).parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
	});
}  
  
//删除行  
function delCompetitorRow(obj,competitor_rowCountForDel){
	var ids = "";
	$(obj).parent().parent().find(".competitor_id").each(function(index,element){//获取行中所有的id
		if($(element).val() != "")
			ids = ids + $(element).val() + ",";
	});
	ids = ids.substring(0, ids.length-1);//将最后的逗号切掉
	deleteCompetitorByIds(ids);
	
	//如果是第一行，保留界面元素
	if(competitor_rowCount<2*3)
	{
		$(obj).parent().parent().find("input").val("");
		$(obj).parent().parent().find("input").each(function(){
			$(this).next().val("-1");
		});
	}
	else
	{
		$(obj).parent().parent().remove();
		competitor_rowCount = competitor_rowCount-3;  
	}
}

//通过ids删除竞争对手
function deleteCompetitorByIds(ids){
	if(ids!=null && ids!="")
	{
		$.ajax({
			type:"POST",
			url: getwebroot()+"PfCompetitorCtrl/deleteCompetitor.do",
			dataType:"json",
			data:{
				competitorIds:ids
			},
			success:function(result){
				//alert("删除成功");
			},
			error:function(result){
				alert(result.message);
			}
		});
		
	}
}


//删除上传的图片对象
function deluploadImg(obj,fileId){
	var url = "PfTaskFileCtrl/deleteTaskFile.do";
	var params = {};
	var isasync = true;
	var fn = function(){
		//无操作
	};
	
	params.fileId = fileId;
	asyncAjaxMethod(url,params,isasync,fn);
	
	$(obj).parent().parent().parent().remove();
}

//操作主要客户
function doCustomer(){
	var idsForDeleteCustomer = "";//要删除的ids
	var flagForCustomer = 0;
	var customer = new Array();
	$("#customer_table").find("td").each(function(index,element){
		var customerItem = {};
		customerItem.customerId = $(element).find("input").eq(1).val();
		customerItem.customerName = $(element).find("input").eq(0).val();
		if(typeof(customerItem.customerName) != "undefined"){//过滤非输入框
			if(customerItem.customerName != ""){
				customer[flagForCustomer] = customerItem;
				flagForCustomer++;
			}else{
				idsForDeleteCustomer += customerItem.customerId +",";
			}
		}
	});
	idsForDeleteCustomer = idsForDeleteCustomer.substring(0, idsForDeleteCustomer.length-1);
	delCustomerByIds(idsForDeleteCustomer);//根据ids批量删除主要客户
	
	return objectArrayToString(customer);//将js的数组对象转化为String //base.js中
}

//操作主要竞争对手
function doCompetitor(){
	var idsForDeleteCompetitor = "";
	var flagForCompetitor = 0;
	var competitor = new Array();
	$("#competitor_table").find("td").each(function(index,element){
		var competitorItem = {};
		competitorItem.competitorId = $(element).find("input").eq(1).val();
		competitorItem.competitorName = $(element).find("input").eq(0).val();
		if(typeof(competitorItem.competitorName) != "undefined"){
			if(competitorItem.competitorName != ""){
				competitor[flagForCompetitor] = competitorItem;
				flagForCompetitor++;
			}else {
				idsForDeleteCompetitor += competitorItem.competitorId + ",";
			}
		}
	});
	idsForDeleteCompetitor = idsForDeleteCompetitor.substring(0, idsForDeleteCompetitor.length-1);
	deleteCompetitorByIds(idsForDeleteCompetitor);//通过ids删除竞争对手
	
	return objectArrayToString(competitor);//将js的数组对象转化为String //base.js中
}

//商品操作
function doGoods(){
	var flagForGoods = 0;
	var goods = new Array();
	$("#sale_table").find("tr").each(function(index,element){
		var goodsItem = {};
		goodsItem.goodsId = $(element).find("input").eq(2).val();
		goodsItem.goodsBrand = $(element).find("input").eq(1).val();
		goodsItem.goodsName = $(element).find("input").eq(0).val();
		if(typeof(goodsItem.goodsName) != "undefined"){
			goods[flagForGoods] = goodsItem;
			flagForGoods++;
		}
	});
	return objectArrayToString(goods);//将js的数组对象转化为String //base.js中
}

//原材料操作
function doMaterial(){
	var flagForMaterial = 0;
	var material = new Array();
	$("#mateial_table").find("tr").each(function(index,element){
		var materialItem = {};
		materialItem.materialId = $(element).find("input").eq(2).val();
		materialItem.materialBrand = $(element).find("input").eq(1).val();
		materialItem.materialName = $(element).find("input").eq(0).val();
		if(typeof(materialItem.materialName) != "undefined"){
			material[flagForMaterial] = materialItem;
			flagForMaterial++;
		}
	});
	return objectArrayToString(material);//将js的数组对象转化为String //base.js中
}

//企业简介字数计算及限制
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

//企业形象操作
function doAttched(){
		var flagForAttched = 0;
		var fileTypeId=22;
		var attched = new Array();
		$("#company_figure_pic").find("img").each(function(index,element){
			var id;
			var mogodb_id;
			var srcStr=$(element).attr("src");
			var imgId=$(element).attr("id");
			if(srcStr!="/newresources/images/uploadlogo.png"||srcStr!="/newresources/images/uploadfigure.png"){
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
			if(imgId=="company_logo"){
				attchedItem.isUpdate=updateForLogo;
			}
			else if(imgId=="company_image"){
				attchedItem.isUpdate=updateForImage;
			}
			if(typeof(attchedItem.id) != "undefined" && typeof(attchedItem.mogodbId) != "undefined"){
				attched[flagForAttched] = JSON.stringify(attchedItem);//将对象转化为字符串
				flagForAttched++;
			}
			fileTypeId++;
		});
		return attched.toString();//返回数据对象的string格式
}
//保存详细信息的页面信息
function saveDetailsInfo(){
	$("#fPhone").trigger("blur");
	$("#mPhone").trigger("blur");
	$("#email").trigger("blur");
	$("#contactAddr").trigger("blur");
	
	var error_str = "";
	var obj;//检测对象
	
	if(!company_phone_flag){
		error_str = "请输入联系电话";
		obj = $("#fPhone");
	}else if(!company_province_city_distinct_flag){
		error_str = "请选择地区";
		obj = $("#city");
	}else if($("#companyIntroduction").val() == ""){
		error_str = "请输入公司简介";
		obj = $("#companyIntroduction");
	}else if($("#companyNameCn").val() == ""){
		error_str = "请输入公司简称";
		obj = $("#companyNameCn");
	}else if(!company_mphone_flag){
		error_str = "请输入正确的联系人手机";
		obj = $("#mPhone");
	}else if(!company_email_flag){
		error_str = "请输入正确的EMAIL";
		obj = $("#email");
	}else if(!contact_addr_flag){
		error_str = "请输入详细地址";
		obj = $("#contactAddr");
	}
	
	if(error_str!=""){//错误信息显示
		$(obj).nextAll(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
		$(obj).nextAll(".info_explain_wrap").fadeIn("fast");
		$(obj).focus();
		return;
	}else{
		$(obj).nextAll(".info_explain_wrap").fadeOut("fast");
	}
	
	if($("#lng").val()==""&&$("#lat").val()==""){
			window.wxc.xcConfirm("请先定位到地图",confirm);
			return "error";
	} 
	var params = {};
	//获取基本信息
	var companyNameCn= $("#companyNameCn").val();
	var contactAddr= $("#contactAddr").val();
	var lng=$("#lng").val();
	var lat=$("#lat").val();
	var contactAddrCode= $("#country").val();
	var fPhone= $("#fPhone").val();
	var contacts= $("#contacts").val();
	var mPhone= $("#mPhone").val();
	var fax= $("#fax").val();
	var email= $("#email").val();
	var companyIntroduction= $("#companyIntroduction").val();
	if(save_detail_flag){
		save_detail_flag=false;
		params.companyNameCn= companyNameCn;
		params.contactAddr= contactAddr;
		params.lng = lng;//经度
		params.lat = lat;//纬度
		params.contactAddrCode= contactAddrCode;
		params.fPhone= fPhone;
		params.contacts= contacts;
		params.mPhone= mPhone,
		params.fax= fax;
		params.email= email;
		params.companyIntroduction= companyIntroduction;
	
		params.customer = doCustomer();//客户操作
		params.competitor = doCompetitor();//主要竞争对手操作
		params.goods = doGoods();//商品操作
		params.material = doMaterial();//原材料操作
		params.attched = doAttched();//企业形象
	
		updateBaseInfo1(params,"",companyId);//更新基础信息   base.js中
	}
}
/**
 * 删除企业logo
 * delCompany_logo void
 * @author yukai
 * 2016-8-5 上午9:01:10
 */
function delCompany_logo(obj,id){
	$(obj).parent().prev().prev().attr("src","/newresources/images/uploadlogo.png"); 
	$(obj).parent().css("display","none");
	$(obj).parent().prev().css("display","none");
	delFileIds.push(id);
}
/**
 * 删除企业形象图
 * delCompany_image void
 * @author yukai
 * 2016-8-5 上午9:01:10
 */
function delCompany_image(obj,id){
	$(obj).parent().prev().prev().attr("src","/newresources/images/uploadfigure.png"); 
	$(obj).parent().css("display","none");
	$(obj).parent().prev().css("display","none");
	delFileIds.push(id);
}
function saveDetailButton(){
$("#").on("click",saveDetailsInfo);

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
			<span  class="f_l ml10"><span id="companyNameInHead">...</span><span id="isCheck" class="span_rz ml10" style="width:60px;" >实名入驻</span></span>
		</div>
		<div class="account_right_inner_wrap">
			<h4>企业信息</h4>
<!-- 			<div id="sub_baseInfo_tab" class="triangle_bottomright"></div> -->
			<ul class="companyInfo_tab clearfix">
				<li style="border:none;" ><a href="/supplierForPlateForm/baseInfo.htm"  target="_self">基本信息</a><span class="split">|</span></li>
				<li class="selected"><a class="selected"  href="/supplierForPlateForm/detailsInfo.htm"  target="_self">详细信息</a><span class="split">|</span></li>
				<li><a  href="/supplierForPlateForm/scalepowerInfo.htm">规模能力</a></li>
			</ul>
			<span class="f_r mr10 greycolor"><span class="redcolor">*</span>为必填项</span>
			<!--基本信息开始-->
			<div class="baseInfo_sub_wrap">
			<div class="inner_line_wrap ml30 clearfix">
				<div class="label_wrap">企业简称<span class="no_empty">*</span></div>
				<input id="companyNameCn" type="text" class="input_wrap" size="50" />
				<div class="info_explain_wrap">
					<div class="info_explain"></div>
				</div>
			</div>
			<div class="inner_line_wrap ml30 clearfix">
				<div class="label_wrap">联系地址<span class="no_empty">*</span></div>
				<select id="province" name="province" class="city_select_wrap" onChange="goToLocation(1)">
					 <option value="0">--请选择省份--</option>
				</select>  
				<select id="city" name="city"  class="city_select_wrap" onChange="goToLocation(2)">
					 <option value="0">--请选择城市--</option>
				</select>  
				<select id="country" name="county" class="city_select_wrap" onChange="goToLocation(3)">
					<option value="0">--请选择区--</option>
				</select>
				<div class="info_explain_wrap"></div>
			</div>
			<div class="mask"></div>
			<input type="hidden" id="lng"/>
			<input type="hidden" id="lat"/>
			<div class="inner_line_wrap ml30 pos_relative clearfix">
				<div class="label_wrap"></div>
				<input type="text" id="contactAddr" class="input_wrap" style="width:250px;" size="100" placeholder="请输入详细地址" />
				<input type="hidden" id="contactAddrPro">
				<a class="remarkMap_a" onClick="theLoaction()"><img src="/newresources/images/map1.png" />定位到地图</a>
				<div class="info_explain_wrap"></div>
				<div style="position:fixed;left:30%;top:20%;z-index:5;">
				<div id="allmap" class="map_wrap"></div>
				<a id="remove_overlay" href="javascript:void(0)"  onclick="remove_overlay()">取消定位</a>
				<a href="javascript:void(0)" id="close_map" title="关闭窗口" class="close_btn" onClick="close_map(this)">X</a>
				<div id="r-result" style="display:none;" >定位搜索:
						<input type="text" id="suggestId" size="20" value=""  />
				</div>
				<div id="searchResultPanel"></div>
				</div>
			</div>
			<div class="inner_line_wrap ml30 clearfix">
				<div class="label_wrap">联系电话<span class="no_empty">*</span></div>
				<input id="fPhone" type="text" class="input_wrap" size="50" />
				<div class="info_explain_wrap"></div>
			</div>
			<div class="inner_line_wrap ml30 clearfix">
				<div class="label_wrap">联系人</div>
				<input id="contacts" type="text" class="input_wrap" size="20" />
			</div>
			<div class="inner_line_wrap ml30 clearfix">
				<div class="label_wrap">联系人手机</div>
				<input id="mPhone" type="text" class="input_wrap" size="20" />
				<div class="info_explain_wrap"></div>
			</div>
			<div class="inner_line_wrap ml30 clearfix">
				<div class="label_wrap">传真号</div>
				<input id="fax" type="text" class="input_wrap" size="20" />
			</div>
			<div class="inner_line_wrap ml30 clearfix">
				<div class="label_wrap">EMAIL</div>
				<input id="email" type="text" class="input_wrap" size="20" />
				<div class="info_explain_wrap"></div>
			</div>
				
			<hr class="hr_grey" />
			</div>
			<!--基本信息结束-->
			<h5 class="block_title">主要销售产品及品牌</h5>
			<table class="block_table ml30" id="sale_table">
				<tr id="sale_row1">
					<td><input id="sale_name1" type="text"   placeholder="产品名称" /></td>
					<td><input id="sale_brand1" type="text"  placeholder="品牌" /></td>
					<td><img src="/newresources/images/del.png" onclick="delSaleRow(this,1)" /></td>
					<td style="dispaly:none;"><input id="sale_brand_id1" type="hidden" value="-1"></td>
					<td><div class='info_explain_wrap'></div></td>
				</tr>
				<tfoot>
					<tr ><td><a onClick="addSaleRow('sale_table')"><img src="/newresources/images/add.png" />添加</a></td></tr>
				</tfoot>
			</table>
			<h5 class="block_title">原材料及品牌</h5>
			<table class="block_table ml30" id="mateial_table">
				<tr id="mateial_row1">
					<td><input id="material_name1"  type="text"   placeholder="材料名称" /></td>
					<td><input id="material_brand1" type="text"  placeholder="材料品牌" /></td>
					<td><img src="/newresources/images/del.png" onclick="delMateialRow(this,1)" /></td>
					<td style="dispaly:none;"><input id="material_brand_id1" type="hidden" value="-1"></td>
					<td><div class='info_explain_wrap'></div></td>
				</tr>
				<tfoot>
					<tr ><td><a onClick="addMateialRow('mateial_table')"><img src="/newresources/images/add.png" />添加</a></td></tr>
				</tfoot>
			</table>
			<h5 class="block_title">主要客户</h5>
			<table class="block_table ml30" id="customer_table">
				<tr id="customer_row1">
					<td><input id="customer_name1" class="customer_name" style="width:180px;" type="text"  placeholder="客户名称" /><input id="customer_id1" class="customer_id" type="hidden" value="-1"/></td>
					<td><input id="customer_name2" class="customer_name" style="width:180px;" type="text"  placeholder="客户名称" /><input id="customer_id2" class="customer_id" type="hidden" value="-1"/></td>
					<td><input id="customer_name3" class="customer_name" style="width:180px;" type="text"  placeholder="客户名称" /><input id="customer_id3" class="customer_id" type="hidden" value="-1"/></td>
					<td><img src="/newresources/images/del.png" onclick="delCustomerRow(this,1)" /></td>
					<td><div class='info_explain_wrap'></div></td>
				</tr>
				<tfoot>
					<tr ><td><a onClick="addCustomerRow('customer_table')"><img src="/newresources/images/add.png" />添加</a></td></tr>
				</tfoot>
			</table>
			<h5 class="block_title">主要竞争对手</h5>
			<table class="block_table ml30" id="competitor_table">
				<tr id="competitor_row1">
					<td><input id="competitor_name1" class="competitor_name" style="width:180px;"  type="text" placeholder="对手名称" /><input id="competitor_id1" class="competitor_id" type="hidden" value="-1"/></td>
					<td><input id="competitor_name2" class="competitor_name" style="width:180px;" type="text"  placeholder="对手名称" /><input id="competitor_id2" class="competitor_id" type="hidden" value="-1"/></td>
					<td><input id="competitor_name3" class="competitor_name" style="width:180px;" type="text"  placeholder="对手名称" /><input id="competitor_id3" class="competitor_id" type="hidden" value="-1"/></td>
					<td><img src="/newresources/images/del.png" onclick="delCompetitorRow(this,1)" /></td>
					<td><div class='info_explain_wrap'></div></td>
				</tr>
				<tfoot>
					<tr ><td><a onClick="addCompetitorRow('competitor_table')"><img src="/newresources/images/add.png" />添加</a></td></tr>
				</tfoot>
			</table>
			<hr class="hr_grey"/>
			<h5 class="block_title">企业形象</h5>
			<div id="company_figure_pic" class="company_figure_wrap clearfix">
				<div class="left_wrap">
					
					<div class="image_block_pic">
						<a><img id="company_logo" src="/newresources/images/uploadlogo.png" /></a>
						<input id="company_logo_pic" class="uploadfile_input" type="file" name="file" onChange="showPic1(this)" />
					</div>
					
					<div class="img_block_text">
						<p class="title_text">企业logo</p>
						<p class="desc_text">(建议尺寸120*120像素，200K以内)</p>
					</div>
				</div>
				<div class="right_wrap">
					
					<div class="image_block_pic">
						<a><img id="company_image"  src="/newresources/images/uploadfigure.png" /></a>
						<input id="company_image_pic" class="uploadfile_input" type="file" name="file" onChange="showPic1(this)" />
					</div>
					
					<div class="img_block_text">
						<p class="title_text">企业形象图</p>
						<p class="desc_text">(建议尺寸1024*354像素，300K以内)</p>
					</div>
				</div>
			</div>
			<hr class="hr_grey" />
			<h5 class="block_title">厂容厂貌</h5>
			<ul id="company_equipment_imgs" class="ul_upload_img_wrap clearfix">
				<li>
					<div class="image_block_pic">
						<img id="company_fact" src="/newresources/images/other/11.png" />
						<input id="company_fact_pic" class="uploadfile_input" type="file" name="file" onChange="addImg(this,24)" />
					</div>
				</li>
			</ul>
			<hr class="hr_grey" />
			<h5 class="block_title">企业简介</h5>
			<div class="company_simple_descript_tip">总共可以输入<span class="redcolor">400</span>个字,剩余<span id="remain_words_num" class="redcolor">400</span>个字</div>
			<textarea id="companyIntroduction" class="company_simple_descript"></textarea>
			<div class="company_opreate_btn_wrap" style="text-align:right">
				<!-- <button class="company_operate_btn">取消</button>&nbsp; -->
				<button class="company_operate_btn" onclick="saveDetailsInfo()">保存</button>
			</div>
		</div>
	</div>
</div>
<!--底端-->
<div id="bottom"></div>

</body>
</html>
