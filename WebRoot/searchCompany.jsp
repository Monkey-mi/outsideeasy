<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<title>全站搜索</title>
<link href="/newresources/css/map.css" rel="stylesheet" />
<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/city-picker.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" /> 
<style type="text/css">
		body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"Microsoft YaHei",Tahoma, Helvetica, Arial, sans-serif;}
</style>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->

</head>
<body>
<div class="top_1_wrap">
	<div class="top_1_wrap">
		<div class="div_1024_c_wrap">
			<div class="top_1_float f_l">
				<div class="dologin"><a id="doLoginIn" href="/login.html">登录</a></div>
				<div class="haslogin">
					<span id="loginName_span"></span>
					<a id="doLoginout" href="javaScript:void(0)" onClick="doLoginOut()">退出</a>		
				</div>
				<div class="doregister"><a href="/userInfo/register.htm">免费注册</a></div>
			</div>
			<div class="top_1_float f_r">
				<a href="/index.jsp">首页</a>
				<a id="userCenterHref"  href="/supplierForPlateForm/registerInfo.htm">企业中心</a>
				<a>关于我们</a>
				<a>帮助</a>
			</div>
		</div>
	</div>
</div>
<div id="allmap"></div>
<!--省市区选择开始-->
	<div id="distpicker">
		<div style="position: relative;">
			<a id="reset" href="javascript:void(0)" title="清空" class="reset_citypicker">X</a>
			<input id="city-picker3" style="width:340px; height:27px;" class="form-control" readonly type="text" value="" data-toggle="city-picker">
		</div>
	</div>
<!--省市区选择结束-->
<div class="left_wrap">
	<!--搜索框开始-->
	<div class="company_search_wrap mt8">
		<input type="text" id="search_text" class="search_input" placeholder="请输入企业名称、行业名称关键字搜索"/>
		<input type="button" id="search_btn" class="search_btn" value="" onclick="search_btn_click();"/>
	</div>
	<!--搜索框结束-->
	<div class="left_company_wrap mt8">
	<!--搜索列表层开始-->
	<div class="company_list_wrap clearfix" id="company_list_wrap" style="display:block;" >
		<p class="totalInfo_wrap">共搜索到<span id="total_count" class="maincolor">0</span>家企业</p>
	
		<ul class="poilist" id="company_list">
		<!-- 
		<li onClick="liclick(this)">
				<img src="/newresources/images/mapicon.png" />
				<div class="poilist_li_con">
					<h4>浙江泰普森集团有限公司</h4>
					<p>浙江省杭州市拱墅区通益路68号</p>
					<input type="hidden"  name="company_id" value="10000">
					<p class="mt10">
					<span class="span_rz">v 已认证</span>
					<span class="f_r span_r">资质评分<span class="maincolor">10.0</span></span>
					</p>
				</div>
			</li>
		 -->
		</ul>
		<!-- 分页控件 -->
		<div id="Pagination" class="quotes">
		</div>
	</div>
	<!--搜索列表层结束-->
	<!--详细信息层开始-->
	<div class="company_inner_wrap clearfix" id="company_details" style="display:none;">
		<p  class="go_back"><a href="javascript:void(0)" onClick="go_back_list()">&lt;&lt;返回查看全部企业</a></p>
		<div class="div_1 clearfix">
			<div class="title_info">
				<div id="toCompanyWindow" style="cursor:pointer;"><span id="cpyname_cn" class="font_size_14">...</span><img src="/newresources/images/home.png"><input type="hidden" id="companyIdForWin"/></div>
				<p id="is_check" class="mt10"><span class="span_rz">v 实名入驻</span></p>
			</div>
			<img id="company_logo" class="logo" src="/newresources/images/map_logon_2.png" />
		</div>
		<ul id="tradeclass" class="horizon_ul clearfix mt8">
			<!-- <li>制造行业</li> -->
			<!-- <li>贸易行业</li>
			<li>OEM代加工</li> -->
		</ul>
		<p class="font_size_12 mt8"><label>主营业务：</label><span id="businessClass"></span></p>
		<hr class="hr_grey" />
		<p>
		<span> <img src="/newresources/images/map1.png" /><span id="contact_addr"></span></span></p>
		<p>
		<span class="mr30"><img src="/newresources/images/map2.png" /><span id="f_phone"></span></span>
		<span><img src="/newresources/images/map6.png" /><span id="contacts"></span> <span id="m_phone"></span></span>
		</p>
		<p>
		<span><img src="/newresources/images/map3.png" /><span id="email"></span></span>
		</p>
		
		<hr class="hr_grey" />
		<p>认证评估<span id="totalScore" class="maincolor">0分</span></p>
		<canvas id="myChart" width="330" height="200"></canvas>
		<hr class="hr_grey" />
		<div class="title_sale_wrap ml8">
			<div class="title_sale">销售</div>
		</div>
		<ul id="saleItem" class="f_horizon_ul">
				<!-- <li>双肩包</li> -->
	    </ul>
		<br class="clear" />
		<hr class="hr_grey" />
		<div class="title_buy_wrap ml8">
			<div class="title_buy">采购</div>
		</div>
		<ul id="buyItem" class="f_horizon_ul">
				<!-- <li>双肩包</li> -->
	    </ul>
		<br class="clear" />
		<!--图片区-->
		<div id="company_show">
<!-- 		<hr class="hr_grey" />
	 		<div class="f_img_show"><img id="factory_image1" src="/newresources/images/map-hj1.png" /></div>
			<div class="f_img_show"><img id="factory_image2" src="/newresources/images/map-hj1.png" /></div>
			<a class="f_r mr8 link_color" href="javascript:void(0)">+More</a>  -->
		</div>
	</div>
	<!--详细信息层结束-->
	</div>
</div>

<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=4i6arTpbQQ1MfIcFRuoHyXKc"></script>
<script type="text/javascript" src="/newresources/js/json2.js"></script>
<script type="text/javascript" src="/newresources/js/city.js"></script>
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script>
<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->

<!--[if lt IE 9]>
<script type="text/javascript" src="/newresources/js/html5shiv.js"></script>
<script type="text/javascript" src="/newresources/js/excanvas.js"></script>
<![endif]-->
<script type="text/javascript" src="/newresources/js/Chart.min.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.js"></script>
<script type="text/javascript" src="/newresources/js/bootstrap.min.js"></script>
<!-- 省市区三级效果 -->
<script src="/newresources/js/city-picker.data.js"></script>
<script src="/newresources/js/city-picker.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>

<script type="text/javascript">
var pageSize=5;
var searchText=getQueryString("searchKey");
var map;
var areaCode;
var result = isLoginForPlateForm();

$(function(){
	$("#search_text").val(searchText);//如果是从首页进来，需要将首页的搜索条件显示到此页面的搜索框中
	pageLayout();
	init_citypicker();
	createMap();//创建地图
	if(searchText == ""){
		getLocalCityCode();//取回本地市级代码,且按地区搜索出结果
	}else{
		InitData(searchText,0,true);
	}
	
	//显示登录状态
	//var result = isLoginForPlateForm();
	if(result.isLogin == true){
		var account = result.data;
		$("#loginName_span").html(account.login_name);
		$(".dologin").css("display","none");
		$(".haslogin").css("display","block");
		$(".doregister").css("display","none");
	}else{//未登录，跳转到登录页面
		$("#userCenterHref").attr("href","/login.html?redirect="+encodeURIComponent("supplierForPlateForm/registerInfo.htm"));
	}
});

//点击Enter键触发search_btn搜索  mishengliang 2016-03-04
$(function () {
    $("input").keyup(function (event){
    	if (event.keyCode == "13") {
            $("#search_btn").click();
            return;
        }
    });
    
    $("#toCompanyWindow").click(function(){
    	var companyId = $("#companyIdForWin").val();
    	var params = {companyIdForWindow:companyId};
    	addParamsToWindowName(params);
    	window.location.href=getwebroot()+"supplierForPlateForm/companyWindow.htm";
    });
});  
	
//创建和初始化地图函数：
 function initMap(result){
  var json_data = result.data;
  var right_lng_lat = true;
  setMapEvent();//设置地图事件
  addMapControl();//向地图添加控件
  addMapOverlay(json_data);//向地图添加覆盖物
  
  for(var i = 0;json_data != undefined && i < json_data.length; i++){
  	if(json_data[i].lng == null || json_data[i].lng == null){
  		right_lng_lat = false;
  		break;
  	}
  }
  
  if(result.total == 0 || right_lng_lat == false){//当搜索结果没有数据时，显示地图区域为地址框中区域
  	var local = new BMap.LocalSearch(map, {
		renderOptions:{map: map}
	});
	var city_picker3=$("#city-picker3").val();
	city_picker3=city_picker3.replace("<label>","");
	city_picker3=city_picker3.replace("</label>","");
	city_picker3=city_picker3.replace("<label>","");
	city_picker3=city_picker3.replace("</label>","");
	local.search(city_picker3);
  }
}

function createMap(){ 
  map = new BMap.Map("allmap",{minZoom:6}); 
  map.centerAndZoom(new BMap.Point(120.134751,30.326912),15);
}

function getLocalCityCode(){
	function myFun(result){//获取本市编码
		var cityName = result.name;
		var provinceName = getProvinceByCity(cityName);
		map.setCenter(cityName);
		this.areaCode = getCityCodeByCityName(cityName);
		$('[data-toggle="city-picker"]').citypicker({ province: provinceName, city: cityName});
		InitData(searchText,0,true);//数据的初识化需放在地图加载到本地城市后
	}
	
	var myCity = new BMap.LocalCity();
	myCity.get(myFun);
}

function addMapOverlay(json_data){
	var pointArray = new Array();
	
	map.clearOverlays();//清除之前搜索结果的覆盖物
	for(var i=0;json_data != undefined && i<json_data.length;i++){
		var marker = new BMap.Marker(new BMap.Point(json_data[i].lng, json_data[i].lat)); // 创建点
		var label=new BMap.Label(json_data[i].cpyname_cn,{offset: new BMap.Size(25,-20)});
		var opts = {
			width : 280,     // 信息窗口宽度
			height: 140,     // 信息窗口高度
			title : json_data[i].cpyname_cn , // 信息窗口标题
			enableMessage:false//是否允许信息窗发送短息
		   };
		var infoWindow = new BMap.InfoWindow("联系地址："+json_data[i].contact_addr+"<br />"+"联系电话："+json_data[i].f_phone+"<br />"+"Email:"+json_data[i].email+"<br />"+"传真："+json_data[i].fax,opts);
		marker.setLabel(label);
		addClickHandler(marker,infoWindow);
		map.addOverlay(marker);    //增加点
		pointArray[i] = new BMap.Point(json_data[i].lng, json_data[i].lat);
	}
	//让所有点在视野范围内
	map.setViewport(pointArray);
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
  var navControl = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT,type:BMAP_NAVIGATION_CONTROL_LARGE});
  map.addControl(navControl);
  var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
  map.addControl(overviewControl);
}

function addClickHandler(target,window){
  target.addEventListener("mouseover",function(){
    target.openInfoWindow(window);
  });
  target.addEventListener("click",function(e){
  	$("#company_list_wrap").css("display","none");
	$("#company_details").css("display","block");
  });
}

//移动地图,设置中心位置
function panMap(lng,lat)
{
	//map.panTo(new BMap.Point(lng,lat));
	map.centerAndZoom(new BMap.Point(lng,lat),19);
} 

 //页面布局
 function pageLayout(){
 	//设置页面高度
		var height=$("#allmap").height();
		$("#allmap").height($(window).height()-25);
		$(".left_company_wrap").height($("#allmap").height()-90);
		window.onresize=function(){
			$("#allmap").height($(window).height()-25);
			$(".left_company_wrap").height($("#allmap").height()-90);
		};
		//鼠标hover列表上的样式变化
		$("#company_list li").hover(function(){
			$(this).find('img').attr("src","/newresources/images/mapicon2.png");
			},function(){
			$(this).find('img').attr("src","/newresources/images/mapicon.png");
		});
 }
    
function init_citypicker(){
 	var $citypicker1 = $('#city-picker1');
	$citypicker1.citypicker();
	
	var $citypicker2 = $('#city-picker2');
	$citypicker2.citypicker(); 

	var $citypicker3 = $('#city-picker3');
	$('#reset').click(function () {
	    $citypicker3.citypicker('reset');
	});
}

//加载雷达图
function init_chart(supplierAccessName,supplierAccessScore){
	//改在页面加载完时赋值ctx，防止在ipad中雷达图的位置不能正常显示
	//var ctx = document.getElementById("myChart").getContext("2d");
	var data1 = {
    //labels: ["管理策略", "持续改进", "生产过程区域", "采购和供应商开发", "原材料、成品储存", "设备保养", "技术和工艺工程","产品文件","研发","不合格隔离","生产质量和追溯","测量设备校准","文件记录保存"],
    labels: supplierAccessName,
    datasets: [
        {
            label: "",
            fillColor: "rgba(242,147,0,0.2)",
            strokeColor: "rgba(255,255,255,1)",
            pointColor: "rgba(242,147,0,1)",
            pointStrokeColor: "#f29300",
            pointHighlightFill: "#f29300",
            pointHighlightStroke: "rgba(242,147,0,1)",
            //data: [91, 95, 90, 100, 80, 78, 100,80, 98, 30,100,99,80]
            data: supplierAccessScore
        }
    	]
	};
	
	$("#totalScore").parent().prev("hr").show();
	$("#totalScore").parent().show();
	$("#myChart").remove();//清空之前的作图
	$("<canvas id='myChart' width='330' height='200'></canvas>").insertAfter($("#totalScore").parent());//重新添加DOM结构
	var ctx = document.getElementById("myChart").getContext("2d");
	var myNewChart = new Chart(ctx);
	myNewChart.Radar(data1);
}

//列表选中某条记录事件
function liclick(th){
	var companyId = $(th).find("input").val();//获取公司的ID
	$("#company_list_wrap").css("display","none");
	
	var url = "supplierForPlateForm/getCompanyInfoByCompanyIdForSearcher.do";
	var params = {};
	params.companyId = companyId;
	
	var isasync = true;
	var fn = function(result){
		if (result.data.companyBaseInfo != null) {//验证取出的基础信息不为空
			var baseInfo = result.data.companyBaseInfo;//基础信息
			var saleItem = result.data.saleItem;//销售列表
			var buyItem = result.data.buyItem;//购买列表
			var scoreSummaryList = result.data.scoreSummaryList;
			
			var supplierAccessName = new Array();//13项审核各指标名；
			var supplierAccessScore = new Array();//13项审核各指标得分
			var scoreRealSum = 0;//总得分
			var socreMaxSum = 0;//总分
			
			for(var i = 0; i < scoreSummaryList.length; i++){
				if(scoreSummaryList[i].fitem_name.length>6){//长度大于6，截取
					scoreSummaryList[i].fitem_name = scoreSummaryList[i].fitem_name.substring(0,6);
				}
				supplierAccessName[i] = scoreSummaryList[i].fitem_name;
				supplierAccessScore[i] = Math.ceil(scoreSummaryList[i].realmum*100/scoreSummaryList[i].maxmum);
				scoreRealSum += scoreSummaryList[i].realmum;
				socreMaxSum += scoreSummaryList[i].maxmum;
			}
			//定位本公司地图中心
			var lng = baseInfo.lng;
			var lat = baseInfo.lat;
			panMap(lng,lat);
			
			//基础信息展示
			$("#cpyname_cn").html(baseInfo.cpyname_cn);//公司名
			if(baseInfo.apply_sts!=15){
				$("#is_check").css("display","none");
			}
			
			if(result.data.compnayExtraInfo != null){
				$("#tradeclass").html("");//清空之前数据
				$("#tradeclass").append("<li>"+ result.data.compnayExtraInfo.class_name +"</li>");//行业名
			}
			$("#companyIdForWin").val(companyId);
			$("#businessClass").html(baseInfo.key_remark);//业务名
			$("#contact_addr").html(baseInfo.contact_addr);//联系地址
			$("#f_phone").html(baseInfo.f_phone);//固话
			$("#contacts").html(baseInfo.contacts);//联系人
			$("#m_phone").html(baseInfo.m_phone);//手机
			$("#email").html(baseInfo.email);//邮件
			
			$("#saleItem").html("");//将此对象中的元素清空
			for(var i = 0;i < saleItem.length ;i++){//销售列表展示
				$("#saleItem").append("<li>"+ saleItem[i] +"</li>");
			}
			
			$("#buyItem").html("");
			for(var j = 0;j < buyItem.length ;j++){//购买列表展示
				$("#buyItem").append("<li>"+ buyItem[j] +"</li>");
			}
						
			var score = (scoreRealSum/socreMaxSum*10).toFixed(2);
			$("#company_details").css("display","block");
			if(result.data.isSupplier != 0 &&score!=null&&score!=""&&score!="NaN"){//是供应商
				$("#totalScore").html(score);//评估得分
				init_chart(supplierAccessName,supplierAccessScore);
			}else{//不是供应商
				$("#myChart").remove();//清空之前的作图
				$("#totalScore").parent().prev("hr").hide();
				$("#totalScore").parent().hide();
			}
			
			picPathSrcForSeacher(companyId,22,"#company_logo");//企业logo
			$("#company_show").html("");
			showMorePicForSeacher(24,companyId);//厂容厂貌
		}else{
			window.wxc.xcConfirm("无基础信息","info");
		}
	};
	
	asyncAjaxMethod(url,params,isasync,fn);
}
	
	/*搜索专用的单个图片展示
	 * 
	 * companyId 当前用户的公司ID
	 * fileTypeId 图片文件位置类型ID
	 * picId 图片展示位置的img标签ID
	 * */
	function picPathSrcForSeacher(companyId,fileTypeId,picId){
		$(picId).css("display","none");
		var url = "PfTaskFileCtrl/getTaskFileListForSeach.do";
		var params = {};
		params.companyId = companyId;
		params.fileTypeId = fileTypeId;
		
		var isasync = true;
		var fn = function(result){
			if(result.data != ""){
				$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
				$(picId).css("display","block");
			}else{
				if(fileTypeId == 22){
					//$(picId).attr("src","/newresources/images/uploadlogo.png");
					$(picId).css("display","none");
				}else if(fileTypeId == 23){
					$(picId).attr("src","/newresources/images/uploadfigure.png");
				}else{
					$(picId).attr("src","/newresources/images/uploadImg.png");
				}
			}
		};
		asyncAjaxMethod(url,params,isasync,fn);
	}
	
	//多张图片展示  mishengliang
	function showMorePicForSeacher(fileTypeId,companyId){
		var company_show = "";
						
		var url = "PfTaskFileCtrl/getTaskFileListForSeach.do";
		var params = {};
		params.companyId = companyId;
		params.fileTypeId = fileTypeId;
		
		var isasync = true;
		var fn = function(result){
			if(result.data != ""){
 				for(var i=0; i<result.data.length && i<2; i++){
					var imgSrc = getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[i].mogodb_id;
					company_show += "<div class='f_img_show'><img id='factory_image1' src="+ imgSrc +" /></div>";
				} 

				$("#company_show").append("<hr class='hr_grey' />"+company_show);
			}
		};
		asyncAjaxMethod(url,params,isasync,fn);	
	}
	
	//返回列表
	function go_back_list()
	{
		$("#company_list_wrap").css("display","block");
		$("#company_details").css("display","none");
	}
	
    //搜索按钮click事件
    function search_btn_click()
    {
    	var search_text=$("#search_text").val();
    	searchText=search_text;//输入框为空时，以当地市级被搜索
    	InitData(search_text,0,true);
    }
    
    //加载搜索结果列表
    function showlist(data){
    	$("#company_list").html("");
    	for(i=0;i<data.length;i++){
    		//从object对象中提取json数据
    		var accessScore = (data[i].accessScore*10).toFixed(2);//十分制 保留一位小数
    		/* if(isNaN(accessScore)){
    			accessScore = "0.0";
    		} */
    		$("#company_list").append("<li onClick='liclick(this)'><img src='/newresources/images/mapicon.png' /><div class='poilist_li_con'><h4>"
    			+data[i].cpyname_cn+"</h4><p>"+(data[i].contact_addr!=null?data[i].contact_addr:'')+"</p>"+"<input type='hidden' name='company_id' value='"+data[i].company_id+"' />"
    			+(data[i].apply_sts==15?"<p class='mt10'><span class='span_rz'>v 实名入驻</span>":"")
    			//+"<span class='f_r span_r'>资质评分<span class='maincolor'>"+accessScore+"</span></span></p>"
    			+showAccessScore(data[i],accessScore)
    			+"</div></li>");
    	}
    	go_back_list();//详细信息下，退回展示搜索结果
    }
    
	//判断是否为此账号下的供应商，是：显示评分；不是：不显示评分；没有评分或评分为0时，也不显示
    function showAccessScore(datai,accessScore){
    	var accessScoreStr = "";
    	if(datai.isSupplier != 0&&accessScore!=null&&accessScore!=""&&accessScore!="NaN"){//是供应商
    		accessScoreStr += "<span class='f_r span_r'>资质评分<span class='maincolor'>"+accessScore+"</span></span></p>";
    	}
    	return accessScoreStr;
    }
    
    /*
    	分页获取数据
    	searchText:搜索框查询条件
    	pageIndex：当前页索引
    	needinit：是否为第一次加载
    */
    function InitData(searchText,pageIndex,needinit){
		var url="supplierForPlateForm/getSuppliersByMultiSearch.do";
		
		var area = $(".title").find(".select-item");
		var areaValue = $("#city-picker3").val();
		var array=searchText.split(" ");
		var params={};
		
		for(i=0;i<array.length;i++){
			if(i==0){
				params.multi_search_key1=array[i];
			}else if(i==1){
				params.multi_search_key2=array[i];
			}else if(i==2){
				params.multi_search_key3=array[i];
			}
		}
		
		if (area.length != 0 && areaValue != ""){
			areaCode = area[area.length-1].getAttribute("data-code");//获取地区代码
		}else{//地址框中无内容
			areaCode = null;
		}
		if(areaCode != null && areaCode != ""){//在首页有数据输入查询时
			params.areaCode=areaCode;
		}
		params.usePaging=true;
		params.page=pageIndex;
   		params.limit=pageSize;
   		params.start=parseInt(pageIndex)*pageSize;
   		var fn=function(result){
   			if(pageIndex==0 && needinit){
   				//第一次加载时加载分页控件
   				$("#total_count").html(result.total);
   				initPagination(result.total);
   			}
			initMap(result);
   			showlist(result.data);
   		};
   		if(result.isLogin == true){//已登录
   			asyncAjaxMethod(url,params,true,fn);
   		}else{//未登录
   			initMap({total:0});
   		}
	}
	
	//初始化分页控件
	function initPagination(totalCount){
		$("#Pagination").pagination(totalCount, {
             callback: pageselectCallback,
             prev_text: " 上一页",
             next_text: "下一页 ",
             items_per_page: pageSize, //每页的数据个数
             num_display_entries: 3, //两侧首尾分页条目数
             current_page: 0,   //当前页码
             num_edge_entries: 2 //连续分页主体部分分页条目数
         });
	}
	//翻页调用  
	function pageselectCallback(index,jq)
	{
		InitData(searchText,index,false);
	}
</script>
</body>
</html>