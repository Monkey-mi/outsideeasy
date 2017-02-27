//准入申请信息页面js
var province={};
var city={};
//var companyId=getParamFromWindowName("companyIdForAll");
var country={};
var map;
var district_error_str	= "";
var lngForAll;//公司经度
var latForAll;//公司纬度
var phone_reg;
var mphone_reg;
var email_reg;
//数字正则
var num_reg=/^(\d+(\.\d+)?)?$/;
//整数正则
var int_reg=/^\d*$/;
if(window.name==""){
	var urlPara = location.search; //获取参数部分
	urlPara=unescape(urlPara);//对参数解密
	function getPara(paraName){ 
		 var reg = new RegExp("[&|?]"+paraName+"=([^&$]*)", "gi"); 
		 var a = reg.test(urlPara); 
		 return a ? RegExp.$1 : ""; 
		 } 
	//捕获参数并进行操作 
	var record_id= getPara("record_id"); //捕获到url参数 
	var h_id= getPara("h_id");
	var accepter_id= getPara("accepter_id");
	var access_status= getPara("access_status");
	var companyId=getPara("companyId");
	var windowNameParam ={"companyIdForAll":companyId,"record_id":record_id,"accepter_id":accepter_id,"h_id":h_id,"access_status":access_status};
	addParamsToWindowName(windowNameParam);
}else{
	var record_id=getParamFromWindowName("record_id");
	var accepter_id=getParamFromWindowName("accepter_id");
	var h_id=getParamFromWindowName("h_id");
	var access_status=getParamFromWindowName("access_status");
	var companyId=getParamFromWindowName("companyIdForAll");
}
var delFileIds=[];//储存要删除的附件ID
var bankAccount_delIds=[];//储存要删除的银行账号ID
var invoiceTitle_delIds=[];//储存要删除的发票抬头ID
var mateial_delIds=[];//储存要删除的主要原材料及品牌ID
var goods_delIds=[];//储存要删除的主要销售产品及品牌ID
var customer_delIds=[];//储存要删除的主要客户ID
var competitor_delIds=[];//储存要删除的主要竞争对手ID
var devicelist_delIds=[];//储存要删除的设备清单ID
var category_delIds=[];//储存要删除的供应品类ID
var auth_opinion;//审核意见
var companyData;
//var companyId=params.toString().split(",")[0];
/*
 * 页面加载事件
 * create_by yangliping 2016-6-30 17:32:19
 * */ 
$(function(){
	 $('#sortTree').niceScroll({
			cursorcolor: "#ccc", //#CC0071 光标颜色 
			cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
			touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
			cursorwidth: "5px", //像素光标的宽度 
			cursorborder: "0", //     游标边框css定义 
			cursorborderradius: "5px", //以像素为光标边界半径 
			autohidemode: true //是否隐藏滚动条 
		});	
		$(".addSupplySort").on("click",function(){
				
				$(".addSupplySort").addClass("addSupplySortFocus");
				$(".addSupplySort_main").show();
		});
		
		loadCommonPage();
		$(".midd_wrap").css({minHeight:$(window).height()-200});
		$(".midd_left_wrap").css({minHeight:$(window).height()-200});
		$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		
		window.onresize=function(){	
			$(".midd_wrap").css({minHeight:$(window).height()-200});
			$(".midd_left_wrap").css({minHeight:$(window).height()-200});
			$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		};
		//getTableName();
		access_status=getAccessRecord().access_status;
		auth_opinion=getAuthOpinion();
		if(access_status==4 && auth_opinion != null && auth_opinion != ""){//未审核通过
 			$("#tip_message").html(auth_opinion);
 		}else if(access_status == 3){//审核通过状态
 			$("#tip_message").html("审核时间："+getPassTime()+"&nbsp;审核结果：已通过，");
 			$("#save_btn").css("display","none");//保存按钮不显示
 			$("#submit_btn").css("display","none");//提交按钮不显示
 			$("#selectCategory").css("display","none");//选择供应品类不显示
 			$("#categoryTitle").show();
 		}else if(access_status == 2){//提交状态
 			$("#tip_message").html("提交时间："+getAccessRecord().orderby_dt+"&nbsp;请等待审核");
 			$("#save_btn").css("display","none");//保存按钮不显示
 			$("#submit_btn").css("display","none");//提交按钮不显示
 			$("#selectCategory").css("display","none");//选择供应品类不显示
 			$("#updateCertification").css("display","none");//入驻变更不显示
 			$("#categoryTitle").show();
 		}else{
 			$("#tip_message").html("");
 		}
		companyData=getCompanyInfo();
 		getPurchaseCategory();
		sale_rowCount=1;  //行数默认1行  
		buy_rowCount=1;
		mateial_rowCount=1;
		customer_rowCount=3;//行数默认为3行
		competitor_rowCount=3;//行数默认为3行
		getAccessTemplet_DetailInfo();
		baseInfoShow_PF(companyData);//基础信息展示
		picPathSrcForBaseInfo(accepter_id,18,"#business_licence");//营业执照  //base.js中 
		picPathSrcForBaseInfo(accepter_id,19,"#tax_registration_certificate");//税务登记
		picPathSrcForBaseInfo(accepter_id,20,"#organization_code_certificate");//组织机构代码证
		picPathSrcForBaseInfo(accepter_id,21,"#taxpayer_qualification_certification");//纳税人资格证书
		companyIntroductionLimit();//企业简介字数的计算和限制
		schoolCoopLimit();//院校合作字数的计算和限制
});
/*
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * create_by yangliping 2016-6-30 17:32:19
 */
function loadCommonPage(){
	var result = isLoginForPlateForm();
	var isVip=getCookie("isVip");
//	if(result.data!=null && result.data.vip == true){
	if(isVip=="true"){
		$("#top").load(getwebroot()+"vip/platform/vipTop.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				getCompanyList(companyId);
				$("#mainNav").children().eq(0).addClass("curr");
			}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/saleManage/vipSaleLeftMenu.html",null,function(responseTxt,statusTxt,xhr){
				if(statusTxt=="success"){
					$("#evaluation").children().eq(1).children().eq(0).find("a").prepend(">>");
					$("#evaluation").children().eq(1).children().eq(0).addClass("currVip");
				}
			});
		}
	}else{
		$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				getCompanyList(companyId);
				$("#mainNav").children().eq(1).addClass("curr");
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"usercenter/saleManage/saleLeftMenu.html",function(){
				$("#evaluation").children().eq(1).children().eq(0).addClass("curr");
			});
		}
	}
}

/*
 * 下一步上一步按钮切换tab事件
 * create_by yangliping 2016-6-30 17:32:19
 * */
function goNext(num)
{
	/*$('#accessApplyInfo .tab li').removeClass("curr");
	$('#accessApplyInfo .tab li').eq(num).addClass("curr");
	$('#accessApplyInfo .tabcon').hide();
	$('#accessApplyInfo .tabcon').eq(num).show();*/
	currtab("#accessApplyInfo",num);
}
/*
 * 切换tab事件
  * create_by yangliping 2016-6-30 17:32:19
 * */
function currtab(tabId, tabNum){
	//设置点击后的切换样式
	
	$(tabId + " .tab").children(".curr").removeClass("curr");
	$(tabId + " .tab").children().eq(tabNum).addClass("curr");
	$(tabId + " .tab").children().find("span.split").css("display","inline");
//	$(tabId + " .tab").children().eq(tabNum).prev().find("span.split").css("display","none");
	//根据参数决定显示内容
	$(tabId + " .tabcon").hide();
	$(tabId + " .tabcon").eq(tabNum).show();
	/*switch(tabNum){
	case 0:		
		getAccessTemplet_BaseInfo();
		break;
	case 1:
		sale_rowCount=1;  //行数默认1行  
		buy_rowCount=1;
		mateial_rowCount=1;
		customer_rowCount=3;//行数默认为3行
		competitor_rowCount=3;//行数默认为3行
		getAccessTemplet_DetailInfo();
		break;
	case 2:
		getAccessTemplet_ScalepowerInfo();
		break;
	}*/
}

/*
 * 加载省市区三级
 * create_by yangliping 2016-7-1 08:48:35
 * */
function loadProCityCountry()
{
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
				map.centerAndZoom(point,18);
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
//设置地图事件
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
    
//地图清除覆盖物
function remove_overlay(){
	map.clearOverlays();         
}

//地图自定义搜索
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
//获取详细信息模板
function getAccessTemplet_DetailInfo(){
	var url="AccessApplicationCtrl/getAccessTemplet.do";
	var params={};
	params.hId=h_id;
	params.classifyId=2;
	var fn=function(result){
		var item='<div class="f_r mt10 mb10">'
							+'<span style="font-weight:bold;" class="redcolor">*</span>为必填项'
						+'</div>';
		for(i=0;i<result.data.length;i++){
			for(j=0;j<result.data.length;j++){
				if(result.data[j].order_by==i+1){
					if(result.data[j].elements.length>0){
						var related_basis=result.data[j].elements[0].related_basis;
					}
					var must='';
					if(result.data[j].is_must==1){
						must='<span class="no_empty" style="font-weight:bold;">*</span>';
					}
					if(result.data[j].templet_name=="企业简称"){
						item+='<div class="inner_line_wrap clear">'
							+'<div class="label_wrap">'
								+''+result.data[j].templet_name+''+must+''
							+'</div>'
							+'<input class="input_wrap" type="text" size="'+result.data[j].elements[0].e_length+'"  id="'+related_basis+'"/>'
							+'<div class="info_explain_wrap">'
							+'</div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="联系地址"){
						item+='<div class="inner_line_wrap clearfix">'
							+'<div class="label_wrap">'
								+''+result.data[j].templet_name+''+must+''
							+'</div>'
							+'<select id="province" name="province" class="city_select_wrap"'
								+'onChange="goToLocation(1)">'
								+'<option value="0">--请选择省份--</option>'
							+'</select>   <select id="city" name="city" class="city_select_wrap"'
								+'onChange="goToLocation(2)">'
								+'<option value="0">--请选择城市--</option>'
							+'</select>   <select id="country" name="county" class="city_select_wrap"'
								+'onChange="goToLocation(3)">'
								+'<option value="0">--请选择区--</option>'
							+'</select>'
							+'<div class="info_explain_wrap"></div>'
						+'</div>'
						+'<div class="mask"></div>'
						+'<input type="hidden" id="lng" /> <input type="hidden" id="lat" />'
						+'<div class="inner_line_wrap relative clearfix">'
							+'<div class="label_wrap"></div>'
							+'<input type="text" id="contactAddr" class="input_wrap"'
								+'style="width:220px;" size="'+result.data[j].elements[0].e_length+'" placeholder="请输入详细地址" /> <input'
								+'type="hidden" id="contactAddrPro">'
								+' <a class="remarkMap_a" onClick="theLoaction()">'
								+'<img src="/newresources/images/map1.png" />定位到地图</a>'
							+'<div class="info_explain_wrap"></div>'
							+'<div style="position:fixed;left:30%;top:20%;z-index:5;">'
							+'<div id="allmap" class="map_wrap"></div>'
							+'<a id="remove_overlay" class="remove_overlay"'
								+' href="javascript:void(0)" onclick="remove_overlay()">取消定位</a> <a'
								+' href="javascript:void(0)" id="close_map" title="关闭窗口"'
								+' onClick="close_map(this)">X</a>'
							+'<div id="r-result" style="display:none;">'
								+'定位搜索: <input type="text" id="suggestId" size="20" value="" />'
							+'</div>'
							+'<div id="searchResultPanel"></div>'
							+'</div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="主要原材料及品牌"){
						item+='<h5 class="block_title mt30">'+result.data[j].templet_name+'<span class="no_empty" style="color:red;font-weight:bold;">*</span></h5>'
						+'<div class="block_table_wrap">'
							+'<table class="block_table" style="width:500px;" id="mateial_table">'
								+'<tr id="mateial_row1">'
									+'<td><input id="material_name1" type="text" placeholder="材料名称" />'
									+'</td>'
									+'<td><input id="material_brand1" type="text" placeholder="材料品牌" />'
									+'</td>'
									+'<td><a onClick="delMateialRow(this,1)"><img'
											+' src="/newresources/images/del.png" />删除</a>'
									+'</td>'
									+'<td style="dispaly:none;"><input id="material_brand_id1"'
										+'type="hidden" value="-1">'
									+'</td>'
									+'<td style="dispaly:none;"><input id="app_material_id1"'
										+'type="hidden" value="-1">'
									+'</td>'
								+'</tr>'
								+'<tfoot>'
									+'<tr>'
										+'<td colspan="3"><a onClick="addMateialRow(this,\'mateial_table\')"><img'
												+' src="/newresources/images/add.png" />添加</a>'
											+'<div class="info_explain_wrap" style="display:block;">'
											+'</div></td>'
									+'</tr>'
								+'</tfoot>'
							+'</table>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="主要销售产品及品牌"){
						item+='<hr class="hr_grey" style="margin-top:30px; clear:both;" />'
						+'<h5 class="block_title mt30">'+result.data[j].templet_name+'<span class="no_empty" style="color:red;font-weight:bold;">*</span></h5>'
						+'<div class="block_table_wrap">'
							+'<table class="block_table" style="width:500px;" id="sale_table">'
								+'<tr id="sale_row1">'
									+'<td><input id="sale_name1" type="text" placeholder="产品名称" />'
									+'</td>'
									+'<td><input id="sale_brand1" type="text" placeholder="品牌" />'
									+'</td>'
									+'<td><a onClick="delSaleRow(this,1)"><img'
											+' src="/newresources/images/del.png" />删除</a>'
									+'</td>'
									+'<td style="dispaly:none;"><input id="sale_brand_id1"'
										+'type="hidden" value="-1">'
									+'</td>'
									+'<td style="dispaly:none;"><input id="app_goods_id1"'
										+'type="hidden" value="-1">'
									+'</td>'
								+'</tr>'
								+'<tfoot>'
									+'<tr>'
										+'<td colspan="3"><a onClick="addSaleRow(this,\'sale_table\')"><img'
												+' src="/newresources/images/add.png" />添加</a>'
											+'<div class="info_explain_wrap" style="display:block;">'
											+'</div></td>'
									+'</tr>'
								+'</tfoot>'
							+'</table>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="主要客户"){
						item+='<h5 class="block_title mt30">'+result.data[j].templet_name+'</h5>'
						+'<div class="block_table_wrap">'
							+'<table class="block_table" id="customer_table">'
								+'<tr id="customer_row1">'
									+'<td><input id="customer_name1" class="customer_name"'
										+'type="text" placeholder="客户名称" /><input id="customer_id1"'
										+'class="customer_id" type="hidden" value="-1" />'
										+'<input id="app_customer_id1"  type="hidden" value="-1" />'
									+'</td>'
									+'<td><input id="customer_name2" class="customer_name"'
										+'type="text" placeholder="客户名称" /><input id="customer_id2"'
										+'class="customer_id" type="hidden" value="-1" />'
										+'<input id="app_customer_id2"  type="hidden" value="-1" />'
									+'</td>'
									+'<td><input id="customer_name3" class="customer_name"'
										+'type="text" placeholder="客户名称" /><input id="customer_id3"'
										+'class="customer_id" type="hidden" value="-1" />'
										+'<input id="app_customer_id3"  type="hidden" value="-1" />'
									+'</td>'
									+'<td><a onclick="delCustomerRow(this,1)">'
											+'<img src="/newresources/images/del.png" />删除</a>'
									+'</td>'
								+'</tr>'
								+'<tfoot>'
									+'<tr>'
										+'<td><a onClick="addCustomerRow(this,\'customer_table\')">'
												+'<img src="/newresources/images/add.png" />添加</a>'
										+'<div class="info_explain_wrap" style="display:block;">'
											+'</div>'
										+'</td>'
									+'</tr>'
								+'</tfoot>'
							+'</table>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="主要竞争对手"){
						item+='<h5 class="block_title mt30">'+result.data[j].templet_name+'<span class="no_empty" style="color:red;font-weight:bold;">*</span></h5>'
						+'<div class="block_table_wrap">'
							+'<table class="block_table" id="competitor_table">'
								+'<tr id="competitor_row1">'
									+'<td><input id="competitor_name1" class="competitor_name"'
										+'type="text" placeholder="对手名称" /><input id="competitor_id1"'
										+'class="competitor_id" type="hidden" value="-1" />'
										+'<input id="app_competitor_id1"  type="hidden" value="-1" />'
									+'</td>'
									+'<td><input id="competitor_name2" class="competitor_name"'
										+'type="text" placeholder="对手名称" /><input id="competitor_id2"'
										+'class="competitor_id" type="hidden" value="-1" />'
										+'<input id="app_competitor_id2"  type="hidden" value="-1" />'
									+'</td>'
									+'<td><input id="competitor_name3" class="competitor_name"'
										+'type="text" placeholder="对手名称" /><input id="competitor_id3"'
										+'class="competitor_id" type="hidden" value="-1" />'
										+'<input id="app_competitor_id3"  type="hidden" value="-1" />'
									+'</td>'
									+'<td><a onclick="delCompetitorRow(this,1)">'
											+'<img src="/newresources/images/del.png" />删除</a>'
									+'</td>'
								+'</tr>'
								+'<tfoot>'
									+'<tr>'
										+'<td><a onClick="addCompetitorRow(this,\'competitor_table\')">'
												+'<img src="/newresources/images/add.png" />添加</a>'
										+'<div class="info_explain_wrap" style="display:block;">'
											+'</div>'
										+'</td>'
									+'</tr>'
								+'</tfoot>'
							+'</table>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="厂容厂貌"){
						item+='<hr class="hr_grey" style="margin-top:30px; clear:both;" />'
						+'<div class="inner_line_wrap clearfix mt30">'
							+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
							+'<div class="right_wrap">'
								+'<ul id="company_equipment_imgs"'
									+'class="ul_upload_img_wrap clearfix">'
									+'<li>'
										+'<div class="image_block_pic">'
											+'<img id="company_fact"'
												+'src="/newresources/images/other/11.png" />'
												+' <input id="company_fact_pic" class="uploadfile_input" type="file"'
												+'name="file" onChange="addImg1(this,24)" />'
										+'</div></li>'
								+'</ul>'
							+'</div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="企业简介"){
						item+='<hr class="hr_grey" style="margin-top:30px; clear:both;" />'
						+'<div class="inner_line_wrap clearfix mt30">'
							+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
							+'<div class="company_descript_tip">'
								+'(总共可以输入<span class="redcolor">400</span>个字,剩余'
									+'<span id="remain_words_num" class="redcolor">400</span>个字)'
							+'</div>'
							+'<textarea id="companyIntroduction" class="company_descript"></textarea>'
						+'</div>';
						break;
					}
					else{
						if(related_basis=="f_phone"){
							phone_reg=eval(result.data[j].elements[0].validate_text);
						}
						else if(related_basis=="m_phone"){
							mphone_reg=eval(result.data[j].elements[0].validate_text);
						}
						else if(related_basis=="email"){
							email_reg=eval(result.data[j].elements[0].validate_text);
						}
						item+='<div class="inner_line_wrap clearfix">'
							+'<div class="label_wrap">'
								+''+result.data[j].templet_name+''+must+''
							+'</div>'
							+'<input class="input_wrap" type="text" size="'+result.data[j].elements[0].e_length+'"  id="'+related_basis+'"/>'
							+'<div class="info_explain_wrap">'
							+'</div>'
						+'</div>';
						break;
					}
				}
			}
		}
		item+='<div class="t_algin_r clear">'
						+'<button class="yellow_button" onClick="goNext(0)">上一步</button>'
						+'<button class="yellow_button ml10" onClick="goNext(2)">下一步</button>'
						+'<button id="save_btn2" class="yellow_button ml10" onClick="saveAllInfo()">保存</button>'
					+'</div>';
		$("#detail_info").html(item);
		getAccessTemplet_ScalepowerInfo();
		//加载省市区三级数据
		loadProCityCountry();
		//加载百度地图API
		remarkMap();
		companyIntroductionLimit();//企业简介字数的计算和限制
		if(access_status == 3||access_status == 2){
			$("#save_btn2").css("display","none");//保存按钮不显示
		}
		$(".input_wrap").on("blur",function(){
		var id=$(this).attr("id");
		var error_str="";
		
		if(id=="cpyname_cn1")
		{
			if($(this).val()=="")
			{
				error_str="请输入企业简称";
			}
		}
		else if(id=="f_phone")
		{
			if($(this).val()=="")
			{
				error_str="请输入联系电话";
			}
			else
			{
				if(!phone_reg.test($(this).val()))
				{
					error_str="请输入正确的联系电话格式";
				}
			}
		}else if(id=="m_phone"){
			if($(this).val()!=""&&!mphone_reg.test($(this).val()))
			{
				error_str="请输入正确的联系人手机";
			}
		}else if(id=="email"){
			if($(this).val()!=""&&!email_reg.test($(this).val()))
			{
				error_str="请输入正确的EMAIl";
			}
		}else if(id=="contactAddr")
			{
				if($(this).val()=="")
				{
					$(this).next().find(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入详细地址"+"</span></div>");
					$(this).next().find(".info_explain_wrap").fadeIn("fast");
				}else{
					$(this).next().find(".info_explain_wrap").fadeOut("fast");
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
	};
	asyncAjaxMethod(url,params,true,fn);
}

//获取规模能力模板
function getAccessTemplet_ScalepowerInfo(){
	var url="AccessApplicationCtrl/getAccessTemplet.do";
	var params={};
	params.hId=h_id;
	params.classifyId=3;
	var fn=function(result){
		var item='';
		for(i=0;i<result.data.length;i++){
			for(j=0;j<result.data.length;j++){
				if(result.data[j].order_by==i+1){
					if(result.data[j].elements.length>0){
						var related_basis=result.data[j].elements[0].related_basis;
					}
					if(result.data[j].templet_name=="其他人员"){
						item+='<div class="inner_line_wrap clearfix">'
						+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
						+'<table class="block_table2 f_l" id="otherperson_table">'
							+'<tr id="otherperson_row1" style="height:36px;">'
								+'<td>'
									+'<select id="otherperson_select1" name="otherperson" class="select_wrap" style="width:150px; height:32px;" onChange="">'
										 +'<option value="0">请选择</option>'
										 +'<option value="1">研发人员</option>'
										 +'<option value="2">操作工</option>'
										 +'<option value="3">专职检验</option>'
										 +'<option value="4">间接员工</option>'
										 +'<option value="5">内审人员</option>'
									+'</select>'
									+'<input id="otherperson1" type="text" style=" width:150px;" class="input_wrap" size="50"  />'
									+'<span class="f_l mt4 ml8">人</span>'
								+'</td>'
								+'<td><a class="ml8" onClick="delOtherpersonRow(this,1)"><img src="/newresources/images/del.png" />删除</a></td>'
								+'<td class="redcolor"></td>'
								+'<td><div class="info_explain_wrap"></div></td>'
							+'</tr>'
							+'<tfoot>'
							+'<tr ><td><a onClick="addOtherpersonRow(\'otherperson_table\',this)"><img src="/newresources/images/add.png" />添加</a></td></tr>'
							+'</tfoot>'
						+'</table>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="人员结构"){
						item+='<div class="inner_line_wrap clearfix">'
						+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
						+'<table class="block_table2 f_l" id="persontype_table">'
							+'<tr id="persontype_row1">'
								+'<td>'
									+'<select id="persontype_select1" name="persontype" class="select_wrap" style="width:150px; height:32px;" onChange="">'
										 +'<option value="0">请选择</option>'
										 +'<option value="1">大专及以上</option>'
										 +'<option value="3">大专以下</option>'
									+'</select>'
									+'<input id="persontype1" type="text" style=" width:150px;" class="input_wrap" size="50" />'
									+'<span class="f_l mt10 ml10">人</span>'
								+'</td>'
								+'<td><a class="ml8" onClick="delPersontypeRow(this,1)"><img src="/newresources/images/del.png" />删除</a></td>'
								+'<td class="redcolor"></td>'
								+'<td><div class="info_explain_wrap"></div></td>'
							+'</tr>'
							+'<tfoot>'
								+'<tr ><td><a onClick="addPersontypeRow(\'persontype_table\',this)"><img src="/newresources/images/add.png" />添加</a></td></tr>'
							+'</tfoot>'
						+'</table>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="质量控制"){
						item+='<hr class="hr_grey" style="margin-top:30px; clear:both;" />'
						+'<div id="'+related_basis+'" class="inner_line_wrap mt30 clearfix">'
						+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
						+'<label class="checkbox_wrap f_l"><input name="quality_control" class="input_checkbox"  type="radio" value="0"  />内部</label>'
						+'<label class="checkbox_wrap f_l"><input name="quality_control" class="input_checkbox"  type="radio" value="1"  />第三方</label>'
						+'<label class="checkbox_wrap f_l"><input name="quality_control" class="input_checkbox"  type="radio" value="2"  />无</label>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="OEM代加工"){
						item+='<div class="inner_line_wrap clearfix">'
						+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
						+'<label class="checkbox_wrap f_l"><input name="OEM" class="input_checkbox"  type="radio" value="0" />提供</label>'
						+'<label class="checkbox_wrap f_l"><input name="OEM" class="input_checkbox"  type="radio" value="1" />不提供</label>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="管理体系认证"){
						item+='<div id="'+related_basis+'" class="inner_line_wrap clearfix">'
						+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
						+'<label class="checkbox_wrap f_l"><input name="certification_system" class="input_checkbox"  checked="checked"  type="radio" value="" />无</label>'
						+'<label class="checkbox_wrap f_l"><input name="certification_system" class="input_checkbox"  type="radio" value="" />ISO9000</label>'
						+'<label class="checkbox_wrap f_l"><input name="certification_system" class="input_checkbox"  type="radio" value="" />ISO14000</label>'
						+'<label class="checkbox_wrap f_l"><input name="certification_system" class="input_checkbox"  type="radio" value="" />其他认证</label>'
						+'<input type="text" id="certification_system_other" class="input_wrap" size="'+result.data[j].elements[0].e_length+'" />'
						+'<ul id="certification_system_imgs" class="comm_img_ul_wrap mt20 ml80  f_l clearfix">'
							+'<li>'
								+'<div class="image_block_pic">'
									+'<a><img id="management_system" src="/newresources/images/other/11.png" /></a>'
									+'<input id="management_system_pic" class="uploadfile_input" type="file" name="file" onChange="showPic1(this)" />'
								+'</div>'
								+'<div class="info_explain_wrap"></div>'
							+'</li>'
						+'</ul>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="年营业额"){
						item+='<hr class="hr_grey" style="margin-top:30px; clear:both;" />'
						+'<div class="inner_line_wrap mt30 clearfix">'
						+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
						+'<input id="'+related_basis+'" type="text" class="input_wrap" style="width:200px;" />' 
						+'<span class="unit_span">万</span>'
						+'<select id="turnover_currency_id" class="select_wrap" style="width:100px; height:32px;">'
							+'<option value="0">--请选择--</option>'
						+'</select>'
						+'<div class="info_explain_wrap"></div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="年出口额"){
						item+='<div class="inner_line_wrap clearfix">'
						+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
						+'<input id="'+related_basis+'" type="text" class="input_wrap" style="width:200px;" />'
						+'<span class="unit_span">万</span>'
						+'<select id="export_currency_id" class="select_wrap" style="width:100px; height:32px;">'
							+'<option value="0">--请选择--</option>'
						+'</select>'
						+'<div class="info_explain_wrap"></div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="年进口额"){
						item+='<div class="inner_line_wrap clearfix">'
						+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
						+'<input id="'+related_basis+'" type="text" class="input_wrap" style="width:200px;" />'
						+'<span class="unit_span">万</span>'
						+'<select id="import_currency_id" class="select_wrap" style="width:100px; height:32px;">'
							+'<option value="0">--请选择--</option>'
						+'</select>'
						+'<div class="info_explain_wrap"></div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="企业面积"){
						item+='<hr class="hr_grey" style="margin-top:30px; clear:both;" />'
						+'<div class="inner_line_wrap mt30 clearfix">'
						+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
						+'<input id="companyArea" type="text" class="input_wrap"  /><span class="f_l mt10 ml10">平方米</span>'
						+'<div class="info_explain_wrap"></div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="厂房面积"){
						item+='<div class="inner_line_wrap clearfix">'
						+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
						+'<input id="factoryArea" type="text" class="input_wrap"  /><span class="f_l mt10 ml10">平方米</span>'
						+'<div class="info_explain_wrap"></div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="使用年限"){
						item+='<div class="inner_line_wrap clearfix">'
						+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
						+'<input id="useBegintime" type="text" onClick="WdatePicker({maxDate:\'#F{$dp.$D(useEndtime)}\',readOnly:true})" class="input_wrap Wdate" style="width:120px;" />'
						+'<span class="f_l mt8 ml10 mr10">—</span>'
						+'<input id="useEndtime" type="text" onClick="WdatePicker({minDate:\'#F{$dp.$D(useBegintime)}\',readOnly:true})" class="input_wrap Wdate" style="width:120px;" />'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="产权"){
						item+='<div class="inner_line_wrap clearfix">'
						+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
						+'<select id="'+related_basis+'" class="select_wrap">'
							+'<option value="0">请选择</option>'
							+'<option value="1">租赁</option>'
							+'<option value="2">自建</option>'
						+'</select>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="设备清单"){
						item+='<hr class="hr_grey" style="margin-top:30px; clear:both;" />'
						+'<div class="inner_line_wrap mt30 clearfix">'
						+'<div class="label_wrap">'+result.data[j].templet_name+'<span class="no_empty" style="color:red;font-weight:bold;">*</span></div>'
						+'<div class="right_wrap ml-4 mt-18">'
							+'<table id="devicelist_table" class="block_table  f_l">'
								+'<tr>'
									+'<th>设备名称<span class="no_empty" style="color:red;font-weight:bold;">*</span></th>'
									+'<th>规格</th>'
									+'<th>产地</th>'
									+'<th>价值(万元)</th>'
									+'<th>购买日期</th>'
									+'<th>数量<span class="no_empty" style="color:red;font-weight:bold;">*</span></th>'
									+'<th>先进性</th>'
									+'<th></th>'
									+'<th></th>'
									+'<th></th>'
								+'</tr>'
								+'<tr id="device_row1">'
									+'<td><input id="device_name1" type="text" style=" width:90px;" class="input_wrap" size="50" /></td>'
									+'<td><input id="device_format1" type="text" style=" width:90px;" class="input_wrap" size="50" /></td>'
									+'<td><input id="device_place1" type="text" style=" width:90px;" class="input_wrap" size="50" /></td>'
									+'<td><input id="device_price1" type="text" style=" width:70px;" class="input_wrap" size="50" /></td>'
									+'<td><input id="device_buy_day1" type="text" style=" width:90px;" onClick="WdatePicker({maxDate:\'%y-%M-%d\',readOnly:true})" class="input_wrap Wdate" /></td>'
									+'<td><input id="device_num1" type="text" style=" width:70px;" class="input_wrap" size="20" /></td>'
									+'<td><input id="device_advanced1" type="text" style=" width:70px;" class="input_wrap" size="50" /></td>'
									+'<td><a onClick="delDevicelistRow(this,1)"><img src="/newresources/images/del.png" />删除</a></td>'
									+'<td class="redcolor"></td>'
									+'<td style="dispaly:none;"><input id="device_id1" type="hidden" value="-1"><input id="app_device_id1" type="hidden" value="-1"></td>'
								+'</tr>'
								+'<tr><td colspan="7"><div class="info_explain_wrap"></div></td></tr>'
							+'<tfoot>'
									+'<tr ><td><a onClick="addDevicelistRow(\'devicelist_table\')"><img src="/newresources/images/add.png" />添加</a></td></tr>'
								+'</tfoot>'
							+'</table>'
						+'</div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="院校合作"){
						item+='<hr class="hr_grey" style="margin-top:30px; clear:both;" />'
						+'<div class="inner_line_wrap clearfix mt30">'
						+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
						+'<div class="company_descript_tip">总共可以输入<span class="redcolor">400</span>个字,剩余<span id="remain_words_num1" class="redcolor">400</span>个字</div>'
						+'<textarea id="'+related_basis+'" class="company_descript"></textarea>'
						+'<table id="annex_text" class="file_block_table f_l ml80 mt10">'
							+'<thead>'
								+'<tr>'
									+'<td colspan="4">'
										+'<span class="mini_span">请选择5M以下.doc/.docx;.ppt/.pptx/.pps;.xls/.xlsx;.pdf;.txt文件</span>'
									+'</td>'
								+'</tr>'
								+'<tr>'
									+'<td colspan="4">'
										+'<span class="label_wrap">附件资料</span>'
										+'<input id="qc_file_name" class="input_wrap_attachment " type="text" />'
										+'<div class="file_wrap_attachment">'
											+'<div class="file_wrap_inner_attachment">'
												+'<input id="file_no"  style="display:none" value="0"/>'
												+'<button class="file_btn_attachment" id="qc_file_bu">选择文件</button>'
												+'<input type="file" name ="file" id ="qc_file_table_capability" class="uploadfile_input_attachment" onChange="showviewtext()" />'
											+'</div>'
										+'</div>'
										+'<button class="file_btn_attachment f_l"  onClick="addText(30)">上传</button>'	
										+'<div class="info_explain_wrap">'
										+'</div>'
									+'</td>'
								+'</tr>'
							+'</thead>'
							+'<tbody>'
							+'</tbody>'
						+'</table>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="专利"){
						item+='<hr class="hr_grey" style="margin-top:30px; clear:both;" />'
						+'<div class="inner_line_wrap clearfix mt30">'
						+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
						+'<div class="right_wrap">'
							+'<ul id="patent_imgs" class="ul_upload_img_wrap clearfix">'
								+'<li>'
									+'<div class="image_block_pic">'
										+'<img id="patent" src="/newresources/images/other/11.png" />'
										+'<input id="patent_pic" class="uploadfile_input" type="file" name="file" onChange="addImg1(this,26)" />'
									+'</div>'
								+'</li>'
							+'</ul>'
						+'</div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="其他资质"){
						item+='<hr class="hr_grey" style="margin-top:30px; clear:both;" />'
						+'<div class="inner_line_wrap clearfix mt30">'
						+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
						+'<div class="right_wrap">'
							+'<ul id="other_intelligence_imgs" class="ul_upload_img_wrap clearfix">'
								+'<li>'
									+'<div class="image_block_pic">'
										+'<img id="other_intelligence" src="/newresources/images/other/11.png" />'
										+'<input id="other_intelligence_pic" class="uploadfile_input" type="file" name="file" onChange="addImg1(this,27)" />'
									+'</div>'
								+'</li>'
							+'</ul>'
						+'</div>'
						+'</div>';
						break;
					}
					else{
						item+='<div class="inner_line_wrap mt30 clearfix">'
								+'<div class="label_wrap">'+result.data[j].templet_name+'</div>'
								+'<input class="input_wrap" type="text" size="'+result.data[j].elements[0].e_length+'" id="'+related_basis+'"/>'
								+'<div class="info_explain_wrap" style="display:block;">'
								+'</div>'
							+'</div>';
						break;
					}
				}
			}
		}
		item+='<div class="t_algin_r">'
						+'<button class="yellow_button" onClick="goNext(1)">上一步</button>'
						+'<button class="yellow_button ml10" onClick="goNext(3)">下一步</button>'
						+'<button id="save_btn3" class="yellow_button ml10" onClick="saveAllInfo()">保存</button>'
					+'</div>';
		$("#scalepower_info").html(item);
		if(access_status == 3||access_status == 2){
			$("#save_btn3").css("display","none");//保存按钮不显示
		}
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
					$(this).next(".info_explain_wrap").html("<div style='width:120px;' ><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入整数"+"</span></div>");
					$(this).next(".info_explain_wrap").fadeIn("fast");
				}else{
					$(this).next(".info_explain_wrap").fadeOut("fast");
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
			$(this).next().next(".info_explain_wrap").html("<div style='width:120px;' ><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span></div>");
			$(this).next().next(".info_explain_wrap").fadeIn("fast");
		}
		else
		{
			$(this).next().next(".info_explain_wrap").fadeOut("fast");
		}
		
		$("#qc_file_table_capability").val("");
		$("#qc_file_name").val("");
	});
	if(access_status==0){
		detailInfoShow_PF(companyData);//详细信息展示
		saleShow(companyData);//销售品牌
		materialShow(companyData);//原材料展示
		customerShow(companyData);//主要用户展示
		competitorShow(companyData);//主要竞争对手展示
		showMorePic2(24);//24 为厂容厂貌  showMorePic:显示多张图片的方法
		
		scalepowerInfoShow_PF(companyData);//规模能力信息展示
		personTypeShow(companyData);//人员结构展示
		otherPersonShow(companyData);//其他人员
		deviceShow(companyData);//设备展示
		picPathSrc2(25,"#management_system");//质量体系认证
		showMorePic2(26);//专利图片展示
		showMorePic2(27);//其他资质图片展示
		showText(30);
	}else{
		getPurchaseCategoryInfo();
		getAccessApplicationInfo();
		getAccessAccountInfo();//银行信息
		getAccessInvoiceTitleInfo();//发票信息
		saleShow1();//主要销售产品及品牌
		materialShow1();//主要原材料及品牌
		customerShow1();//主要用户展示
		competitorShow1();//主要竞争对手展示
		deviceShow1();//设备展示
		showMorePic1(24);//24 为厂容厂貌  showMorePic:显示多张图片的方法
		picPathSrc1(25,"#management_system");//质量体系认证
		showMorePic1(26);//专利图片展示
		showMorePic1(27);//其他资质图片展示
		showText1(30);
	}
	schoolCoopLimit();//院校合作字数的计算和限制
	};
	asyncAjaxMethod(url,params,true,fn);
}

//获取交易信息模板
function getAccessTemplet_TradeInfo(){
	
}

//获取平台公司信息
function getCompanyInfo(){
	var url = "supplierForPlateForm/getCompanyInfoByCompanyId1.do";
	var params = {};
	params.companyId = accepter_id;
	var companyData;
	var fn = function(result){
		companyData = result.data;
	};
	asyncAjaxMethod(url,params,false,fn);
	return companyData;
}

/*展示公司图片基本信息 mishengliang
 * 
 * fileTypeId 图片文件位置类型ID
 * picId 图片展示位置的img标签ID
 * */
function picPathSrc1(fileTypeId,picId){
	var url = "AccessApplicationCtrl/getAccessApplicationAttched.do";
	var params = {};
	params.record_id = record_id;
	params.file_type_id = fileTypeId;
	
	var isasync = true;
	var fn = function(result){
		if(result.data != ""){
				$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
				var del="<div class='a_bg'></div>"
						+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delManagement_system1(this,"+ result.data[0].id +","+ fileTypeId +")'>删除</a></div>";
		        $(picId).parent().append(del);
			}else{
				if(fileTypeId == 22){
					$(picId).attr("src","/newresources/images/uploadlogo.png");
				}else if(fileTypeId == 23){
					$(picId).attr("src","/newresources/images/uploadfigure.png");
				}else{
					$(picId).attr("src","/newresources/images/uploadImg.png");
				}
			}
	};
	asyncAjaxMethod(url,params,isasync,fn);
}
//删除管理体系图片对象 mishengliang   删除后替代的图片并不一致
function delManagement_system1(obj,fileId){
		var parentObj=$(obj).parent().parent();
		parentObj.find("img").attr("src","/newresources/images/uploadImg.png"); 		
		parentObj.find("img").children().remove();
		$(obj).parent().prev().remove();
		$(obj).parent().remove();
		delFileIds.push(fileId);
}
/*展示公司图片基本信息平台读取mishengliang
 * 
 * companyId 当前用户的公司ID
 * fileTypeId 图片文件位置类型ID
 * picId 图片展示位置的img标签ID
 * */
function picPathSrcForBaseInfo(companyId,fileTypeId,picId){
	var url = "PfTaskFileCtrl/getTaskFileListForWindow.do";
	var params = {};
	params.companyId = accepter_id;
	params.fileTypeId = fileTypeId;
	
	var isasync = true;
	var fn = function(result){
		if(result.data != ""){
			$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
		}else{
			//$(picId).attr("src","/newresources/images/uploadImg.png");
			$(picId).parent().parent().css("display","none");
		}
	};
	
	asyncAjaxMethod(url,params,isasync,fn);
}
/*展示公司图片基本信息准入资料附件表读取
 * 
 * fileTypeId 图片文件位置类型ID
 * picId 图片展示位置的img标签ID
 * */
function picPathSrcForBaseInfo1(fileTypeId,picId){
	var url = "AccessApplicationCtrl/getAccessApplicationAttched.do";
	var params = {};
	params.record_id = record_id;
	params.file_type_id = fileTypeId;
	
	var isasync = true;
	var fn = function(result){
		if(result.data != ""){
			$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
		}else{
			//$(picId).attr("src","/newresources/images/uploadImg.png");
			$(picId).parent().parent().css("display","none");
		}
	};
	
	asyncAjaxMethod(url,params,isasync,fn);
}
/*
 * 
 * create by 
 * 2016-7-4 10:38:15
 * */
function addBankAccount()
{
	pop_div_show("addBankAccount_wrap");
	$("#selectAllAcount").prop("checked", false);
}
/*
 * 
 * create by 
 * 2016-7-4 10:38:15
 * */
function addInvoiceTitle()
{
	pop_div_show("addInvoiceTitle_wrap");
	$("#selectAllInvoice").prop("checked", false);
}
/*
 * 弹出层效果
 * create by yangliping
 * 2016-7-4 10:38:15
 * */
function pop_div_show(id)
{
	$("#pop_mask").fadeIn("fast");
	$("#"+id).fadeIn("fast");
	var companyData=getCompanyInfo();
	var bankAccount = companyData.compnayExtraInfo.bankAccount;//银行账号信息
	var invoiceTitles = companyData.compnayExtraInfo.invoiceTitles;//发票抬头信息
	if(id=="addBankAccount_wrap"){
		var ids=[];
		$("#bankTable").find("tr:gt(0)").each(function(){
			ids.push($(this).children().eq(4).children().val());
		});
		var tableItem='<tbody>'
					+'<tr>'
						+'<th width="40px"></th>'
						+'<th width="auto">开户行</th>'
						+'<th width="170px">开户账号</th>'
						+'<th width="20px"></th>'
						+'<th width="70px">状态</th>'
					+'</tr>';
		if(bankAccount){
			for(i=0;i<bankAccount.length;i++){
				var flag=true;
				if(ids.length>0){
					for(j=0;j<ids.length;j++){
						if(ids[j]==bankAccount[i].account_id){
							flag=false;
						}
					}
				}
				if(flag){
					var account_sts="";
					if(bankAccount[i].account_sts==0){
						account_sts="在用";
						tableItem+='<tr>'
							+'<td><input onclick="select_single(\'selectAllAcount\',\'bank_table\')" type="checkbox"/></td>'
							+'<td class="left">'+bankAccount[i].account_name+'</td>'
							+'<td>'+bankAccount[i].account_code+'</td>'
							+'<td><input type="hidden" value="'+bankAccount[i].account_id+'" /></td>'
							+'<td>'+account_sts+'</td>'
						+'</tr>';
					}else{
					}
				}
			}
		}
		tableItem+='</tbody>';
		$("#bank_table").html(tableItem);
	}
	else if(id=="addInvoiceTitle_wrap"){
		var ids=[];
		$("#invoiceTable").find("tr:gt(0)").each(function(){
			ids.push($(this).children().eq(3).children().val());
		});
		var tableItem='<tbody>'
					+'<tr>'
						+'<th width="40px"></th>'
						+'<th width="auto">发票抬头</th>'
						+'<th width="20px"></th>'
						+'<th width="70px">状态</th>'
					+'</tr>';
		if(invoiceTitles){
			for(i=0;i<invoiceTitles.length;i++){
				var flag=true;
				if(ids.length>0){
					for(j=0;j<ids.length;j++){
						if(ids[j]==invoiceTitles[i].invoice_title_id){
							flag=false;
						}
					}
				}
				if(flag){
					var invoice_title_sts="";
					if(invoiceTitles[i].invoice_title_sts==0){
					invoice_title_sts="在用";
					tableItem+='<tr>'
							+'<td><input onclick="select_single(\'selectAllInvoice\',\'invoice_table\')" type="checkbox"/></td>'
							+'<td class="left">'+invoiceTitles[i].invoice_title_name+'</td>'
							+'<td><input type="hidden" value="'+invoiceTitles[i].invoice_title_id+'" /></td>'
							+'<td>'+invoice_title_sts+'</td>'
						+'</tr>';
					}else{
					}
				}
			}
		}
		tableItem+='</tbody>';
		$("#invoice_table").html(tableItem);
	}
}
/*
 * 关闭弹出层
 * create by yangliping
 * 2016-7-4 10:38:15
 * */
function pop_div_close(id)
	{
		$("#pop_mask").fadeOut("fast");
		$("#"+id).fadeOut("fast");
	}
//添加银行账号保存
function addBankAccount_save(){
	var tableItem="";
	$("#bank_table").children().find("tr:gt(0)").each(function(){
		if($(this).children().eq(0).children()[0].checked){
			tableItem+='<tr onmouseover="showSetDefault(this)" onmouseout="hideSetDefault(this)">'
							+'<td class="left">'+$(this).children().eq(1).text()+'</td>'
							+'<td>'+$(this).children().eq(2).text()+'</td>'
							+'<td>'+$(this).children().eq(4).text()+'</td>'
							+'<td><input type="hidden" value="-1" /></td>'
							+'<td><input type="hidden" value="'+$(this).children().eq(3).children().val()+'" /></td>'
							+'<td><button class="setDefault hide" onclick="setBankDefault(this)">设为默认</button></td>'
							+'<td class="pl10"><a onClick="delBankAccount(this)">删除</a></td>'
						+'</tr>';
		}
	});
	$("#bankTable").append(tableItem);
	pop_div_close('addBankAccount_wrap');
}
//添加发票抬头保存
function addInvoiceTitle_save(){
	var tableItem="";
	$("#invoice_table").children().find("tr:gt(0)").each(function(){
		if($(this).children().eq(0).children()[0].checked){
			tableItem+='<tr>'
							+'<td class="left">'+$(this).children().eq(1).text()+'</td>'
							+'<td>'+$(this).children().eq(3).text()+'</td>'
							+'<td><input type="hidden" value="-1" /></td>'
							+'<td><input type="hidden" value="'+$(this).children().eq(2).children().val()+'" /></td>'
							+'<td class="center"><a onClick="delInvoiceTitle(this)">删除</a></td>'
						+'</tr>';
		}
	});
	$("#invoiceTable").append(tableItem);
	pop_div_close('addInvoiceTitle_wrap');
}

//删除银行账号
function delBankAccount(obj){
	var id=$(obj).parent().prev().prev().children().val();
	bankAccount_delIds.push(id);
	$(obj).parent().parent().remove();
}

//删除发票抬头
function delInvoiceTitle(obj){
	var id=$(obj).parent().prev().prev().children().val();
	invoiceTitle_delIds.push(id);
	$(obj).parent().parent().remove();
}
//读取平台基本信息
function baseInfoShow_PF(result){
		var companyBaseInfo = result.companyBaseInfo;//公司基础信息 
 		var compnayExtraInfo = result.compnayExtraInfo;//公司附加信息
 		
		$("#cpyname_cn").html(companyBaseInfo.cpyname_cn);//企业名称
		$("#corporation").html(companyBaseInfo.corporation);//法人代表
		if(companyBaseInfo.establish_dt){
			$("#establish_dt").html(companyBaseInfo.establish_dt.substring(0,companyBaseInfo.establish_dt.lastIndexOf(" ")));//成立日期
		}
		$("#reg_fund").html(companyBaseInfo.reg_fund+"万 "+companyBaseInfo.currency_name);//注册资本
		$("#reg_addr").html(companyBaseInfo.reg_addr);//注册地址
		$("#nature_id").html(compnayExtraInfo.nature_name);//企业类型
		$("#industry_id").html(compnayExtraInfo.industry_name);//经营模式
		$("#class_id").html(compnayExtraInfo.class_name);//所属行业
		$("#key_remark").html(companyBaseInfo.key_remark);//主营业务
}
//读取平台详细信息	
function detailInfoShow_PF(result){
	var cpBaseInfo = result.companyBaseInfo;
	$("#cpyname_cn1").val(cpBaseInfo.cpyname_cn);
	$("#contactAddr").val(cpBaseInfo.contact_addr);
	$("#contactAddrPro").val(cpBaseInfo.contact_addr);
	$("#f_phone").val(cpBaseInfo.f_phone);
	$("#contacts").val(cpBaseInfo.contacts);
	$("#m_phone").val(cpBaseInfo.m_phone);
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
	var goodsList = result.goodsList;
	if(goodsList.length > 0){
		//添加第一条设备信息
		$("#sale_brand_id1").val(goodsList[0].goods_id);
		$("#sale_name1").val(goodsList[0].goods_name);
		$("#sale_brand1").val(goodsList[0].goods_brand);
		$("#app_goods_id1").val(goodsList[0].goods_id);
		
		for(var i=0; i < goodsList.length-1; i++){
			var j = i+2;
			addSaleRow(this,'sale_table');

			$("#sale_brand_id" + j).val(goodsList[i+1].goods_id);
			$("#sale_name" + j).val(goodsList[i+1].goods_name);
			$("#sale_brand" + j).val(goodsList[i+1].goods_brand);
			$("#app_goods_id" + j).val(goodsList[i+1].goods_id);
			
			$("#sale_name"+ j +",#sale_brand" + j).blur(function(){
				if($("#sale_name" + j).val() != ""){//只要行中有数据就隐藏提示信息
					$("#sale_table").find(".info_explain_wrap").fadeOut("fast");
				}
			});
		}
	}	
	
	$("#sale_name1,#sale_brand1").blur(function(){
		if($("#sale_name1").val() != ""){//只要行中有数据就隐藏提示信息
			$("#sale_table").find(".info_explain_wrap").fadeOut("fast");
		}
	});
}
//销售品牌  
function saleShow1() {
	var url = "AccessApplicationCtrl/getAccessApplicationGoods.do";
	var params = {};
	params.record_id = record_id;
	var fn = function(result) {
		var goodsList = result.data;
		if (goodsList.length > 0) {
			// 添加第一条设备信息
			$("#sale_brand_id1").val(goodsList[0].goods_id);
			$("#sale_name1").val(goodsList[0].goods_name);
			$("#sale_brand1").val(goodsList[0].goods_brand);
			$("#app_goods_id1").val(goodsList[0].app_goods_id);

			for (var i = 0; i < goodsList.length - 1; i++) {
				var j = i + 2;
				addSaleRow(this, 'sale_table');

				$("#sale_brand_id" + j).val(goodsList[i + 1].goods_id);
				$("#sale_name" + j).val(goodsList[i + 1].goods_name);
				$("#sale_brand" + j).val(goodsList[i + 1].goods_brand);
				$("#app_goods_id" + j).val(goodsList[i+1].app_goods_id);

				$("#sale_name" + j + ",#sale_brand" + j).blur(function() {
					if ($("#sale_name" + j).val() != "") {// 只要行中有数据就隐藏提示信息
						$("#sale_table").find(".info_explain_wrap").fadeOut("fast");
					}
				});
			}
		}

		$("#sale_name1,#sale_brand1").blur(function() {
			if ($("#sale_name1").val() != "") {// 只要行中有数据就隐藏提示信息
				$("#sale_table").find(".info_explain_wrap").fadeOut("fast");
			}
		});
	};
	asyncAjaxMethod(url, params, true, fn);
}
//原材料展示  mishengliang 2016-04-18
function materialShow(result){
	var metarialList = result.metarialList;
	if(metarialList.length > 0){
		//添加第一条设备信息
		$("#material_brand_id1").val(metarialList[0].material_id);
		$("#material_name1").val(metarialList[0].material_name);
		$("#material_brand1").val(metarialList[0].material_brand);
		$("#app_material_id1").val(metarialList[0].material_id);
		
		for(var i=0; i < metarialList.length-1; i++){
			var j = i+2;
			addMateialRow(this,'mateial_table');

			$("#material_brand_id" + j).val(metarialList[i+1].material_id);
			$("#material_name" + j).val(metarialList[i+1].material_name);
			$("#material_brand" + j).val(metarialList[i+1].material_brand);
			$("#app_material_id" + j).val(metarialList[i+1].material_id);
			
			$("#material_name"+ j +",#material_brand" + j).blur(function(){
				if($("#material_name" + j).val() != ""){//只要行中有数据就隐藏提示信息
					$("#mateial_table").find(".info_explain_wrap").fadeOut("fast");
				}
			});
		}
	}	
	
	$("#material_name1,#material_brand1").blur(function(){
		if($("#material_name1").val() != ""){//只要行中有数据就隐藏提示信息
			$("#mateial_table").find(".info_explain_wrap").fadeOut("fast");
		}
	});
}
//原材料展示
function materialShow1() {
	var url = "AccessApplicationCtrl/getAccessApplicationMaterial.do";
	var params = {};
	params.record_id = record_id;
	var fn = function(result) {
		var metarialList = result.data;
		if (metarialList.length > 0) {
			// 添加第一条设备信息
			$("#material_brand_id1").val(metarialList[0].material_id);
			$("#material_name1").val(metarialList[0].material_name);
			$("#material_brand1").val(metarialList[0].material_brand);
			$("#app_material_id1").val(metarialList[0].app_material_id);

			for (var i = 0; i < metarialList.length - 1; i++) {
				var j = i + 2;
				addMateialRow(this, 'mateial_table');

				$("#material_brand_id" + j)
						.val(metarialList[i + 1].material_id);
				$("#material_name" + j).val(metarialList[i + 1].material_name);
				$("#material_brand" + j)
						.val(metarialList[i + 1].material_brand);
				$("#app_material_id" + j).val(metarialList[i+1].app_material_id);

				$("#material_name" + j + ",#material_brand" + j).blur(
						function() {
							if ($("#material_name" + j).val() != "") {// 只要行中有数据就隐藏提示信息
								$("#mateial_table").find(".info_explain_wrap").fadeOut("fast");
							}
						});
			}
		}

		$("#material_name1,#material_brand1").blur(function() {
			if ($("#material_name1").val() != "") {// 只要行中有数据就隐藏提示信息
				$("#mateial_table").find(".info_explain_wrap").fadeOut("fast");
			}
		});
	};
	asyncAjaxMethod(url, params, true, fn);
}
//主要用户展示  mishengliang 2016-04-18
 function customerShow(result){
	var customerList = result.customerList;
	if(customerList.length > 0){
		//添加第一条主要客户信息
		if(customerList.length > 2){//满足三个数据
			$("#customer_name1").val(customerList[0].customer_name);
			$("#customer_name2").val(customerList[1].customer_name);
			$("#customer_name3").val(customerList[2].customer_name);
			
			$("#customer_id1").val(customerList[0].customer_id);
			$("#customer_id2").val(customerList[1].customer_id);
			$("#customer_id3").val(customerList[2].customer_id);
			
			$("#app_customer_id1").val(customerList[0].customer_id);
			$("#app_customer_id2").val(customerList[1].customer_id);
			$("#app_customer_id3").val(customerList[2].customer_id);
		}else{//数据未达到三条
			for(var i = 0;i < customerList.length;i++){
				$("#customer_name"+(i+1)).val(customerList[i].customer_name);
				$("#customer_id"+(i+1)).val(customerList[i].customer_id);
				$("#app_customer_id"+(i+1)).val(customerList[i].customer_id);
			}
		}
		
		for(var i=3; i < customerList.length ; ){
			addCustomerRow(this,'customer_table');

			$("#customer_name" + (++i)).val(customerList[i-1].customer_name);
			$("#customer_id" + i).val(customerList[i-1].customer_id);
			$("#app_customer_id" + i).val(customerList[i-1].customer_id);
			if(i < customerList.length){
				$("#customer_name" + (++i)).val(customerList[i-1].customer_name);
				$("#customer_id" + i).val(customerList[i-1].customer_id);
				$("#app_customer_id" + i).val(customerList[i-1].customer_id);
			}
			if(i < customerList.length){
				$("#customer_name" + (++i)).val(customerList[i-1].customer_name);
				$("#customer_id" + i).val(customerList[i-1].customer_id);
				$("#app_customer_id" + i).val(customerList[i-1].customer_id);
			}
		}
	}	
	$("#customer_name1,#customer_name2,#customer_name3").blur(function(){//失去焦点事件触发
		$("#customer_table").find(".info_explain_wrap").fadeOut("fast");
	});
} 
//主要用户展示
 function customerShow1() {
	var url = "AccessApplicationCtrl/getAccessApplicationCustomer.do";
	var params = {};
	params.record_id = record_id;
	var fn = function(result) {
		var customerList = result.data;
		if (customerList.length > 0) {
			// 添加第一条主要客户信息
			if (customerList.length > 2) {// 满足三个数据
				$("#customer_name1").val(customerList[0].customer_name);
				$("#customer_name2").val(customerList[1].customer_name);
				$("#customer_name3").val(customerList[2].customer_name);

				$("#customer_id1").val(customerList[0].customer_id);
				$("#customer_id2").val(customerList[1].customer_id);
				$("#customer_id3").val(customerList[2].customer_id);
				
				$("#app_customer_id1").val(customerList[0].app_customer_id);
				$("#app_customer_id2").val(customerList[1].app_customer_id);
				$("#app_customer_id3").val(customerList[2].app_customer_id);

			} else {// 数据未达到三条
				for (var i = 0; i < customerList.length; i++) {
					$("#customer_name" + (i + 1))
							.val(customerList[i].customer_name);
					$("#customer_id" + (i + 1))
							.val(customerList[i].customer_id);
					$("#app_customer_id"+(i+1)).val(customerList[i].app_customer_id);
				}
			}

			for (var i = 3; i < customerList.length;) {
				addCustomerRow(this, 'customer_table');

				$("#customer_name" + (++i))
						.val(customerList[i - 1].customer_name);
				$("#customer_id" + i).val(customerList[i - 1].customer_id);
				$("#app_customer_id" + i).val(customerList[i-1].app_customer_id);
				if (i < customerList.length) {
					$("#customer_name" + (++i))
							.val(customerList[i - 1].customer_name);
					$("#customer_id" + i).val(customerList[i - 1].customer_id);
					$("#app_customer_id" + i).val(customerList[i-1].app_customer_id);
				}
				if (i < customerList.length) {
					$("#customer_name" + (++i))
							.val(customerList[i - 1].customer_name);
					$("#customer_id" + i).val(customerList[i - 1].customer_id);
					$("#app_customer_id" + i).val(customerList[i-1].app_customer_id);
				}
			}
		}
		$("#customer_name1,#customer_name2,#customer_name3").blur(
				function() {// 失去焦点事件触发
					$("#customer_table").find(".info_explain_wrap").fadeOut("fast");
		});
	};
	asyncAjaxMethod(url, params, true, fn);

}
//主要竞争对手展示  mishengliang 2016-04-18
 function competitorShow(result){
	var competitorList = result.competitorList;
	if(competitorList.length > 0){
		//添加第一条竞争对手信息
		if (competitorList.length > 2) {
			$("#competitor_name1").val(competitorList[0].competitor_name);
			$("#competitor_name2").val(competitorList[1].competitor_name);
			$("#competitor_name3").val(competitorList[2].competitor_name);
			
			$("#competitor_id1").val(competitorList[0].competitor_id);
			$("#competitor_id2").val(competitorList[1].competitor_id);
			$("#competitor_id3").val(competitorList[2].competitor_id);
			
			$("#app_competitor_id1").val(competitorList[0].competitor_id);
			$("#app_competitor_id2").val(competitorList[1].competitor_id);
			$("#app_competitor_id3").val(competitorList[2].competitor_id);
		} else {
			for(var i =0; i < competitorList.length; i++){
				$("#competitor_name"+(i+1)).val(competitorList[i].competitor_name);
				$("#competitor_id"+(i+1)).val(competitorList[i].competitor_id);
				$("#app_competitor_id"+(i+1)).val(competitorList[i].competitor_id);
			}
		}
		

		for(var i=3; i < competitorList.length ; ){
			addCompetitorRow(this,'competitor_table');

			$("#competitor_name" + (++i)).val(competitorList[i-1].competitor_name);
			$("#competitor_id" + i).val(competitorList[i-1].competitor_id);
			$("#app_competitor_id" + i).val(competitorList[i-1].competitor_id);
			if(i < competitorList.length){
				$("#competitor_name" + (++i)).val(competitorList[i-1].competitor_name);
				$("#competitor_id" + i).val(competitorList[i-1].competitor_id);
				$("#app_competitor_id" + i).val(competitorList[i-1].competitor_id);
			}
			if(i < competitorList.length){
				$("#competitor_name" + (++i)).val(competitorList[i-1].competitor_name);
				$("#competitor_id" + i).val(competitorList[i-1].competitor_id);
				$("#app_competitor_id" + i).val(competitorList[i-1].competitor_id);
			}
		}
	}	
	$("#competitor_name1,#competitor_name2,#competitor_name3").blur(function(){//失去焦点事件触发
		if($("#competitor_name1").val()!=""||$("#competitor_name2").val()!=""||$("#competitor_name3").val()!=""){
			$("#competitor_table").find(".info_explain_wrap").fadeOut("fast");
		}
	});
}
//主要竞争对手展示
 function competitorShow1() {
	var url = "AccessApplicationCtrl/getAccessApplicationCompetitor.do";
	var params = {};
	params.record_id = record_id;
	var fn = function(result) {
		var competitorList = result.data;
		if (competitorList.length > 0) {
			// 添加第一条竞争对手信息
			if (competitorList.length > 2) {
				$("#competitor_name1").val(competitorList[0].competitor_name);
				$("#competitor_name2").val(competitorList[1].competitor_name);
				$("#competitor_name3").val(competitorList[2].competitor_name);

				$("#competitor_id1").val(competitorList[0].competitor_id);
				$("#competitor_id2").val(competitorList[1].competitor_id);
				$("#competitor_id3").val(competitorList[2].competitor_id);
				
				$("#app_competitor_id1").val(competitorList[0].app_competitor_id);
				$("#app_competitor_id2").val(competitorList[1].app_competitor_id);
				$("#app_competitor_id3").val(competitorList[2].app_competitor_id);
			} else {
				for (var i = 0; i < competitorList.length; i++) {
					$("#competitor_name" + (i + 1))
							.val(competitorList[i].competitor_name);
					$("#competitor_id" + (i + 1))
							.val(competitorList[i].competitor_id);
					$("#app_competitor_id"+(i+1)).val(competitorList[i].app_competitor_id);
				}
			}


			for (var i = 3; i < competitorList.length;) {
				addCompetitorRow(this, 'competitor_table');

				$("#competitor_name" + (++i))
						.val(competitorList[i - 1].competitor_name);
				$("#competitor_id" + i)
						.val(competitorList[i - 1].competitor_id);
				$("#app_competitor_id" + i).val(competitorList[i-1].app_competitor_id);
				if (i < competitorList.length) {
					$("#competitor_name" + (++i))
							.val(competitorList[i - 1].competitor_name);
					$("#competitor_id" + i)
							.val(competitorList[i - 1].competitor_id);
					$("#app_competitor_id" + i).val(competitorList[i-1].app_competitor_id);
				}
				if (i < competitorList.length) {
					$("#competitor_name" + (++i))
							.val(competitorList[i - 1].competitor_name);
					$("#competitor_id" + i)
							.val(competitorList[i - 1].competitor_id);
					$("#app_competitor_id" + i).val(competitorList[i-1].app_competitor_id);
				}
			}
		}
		$("#competitor_name1,#competitor_name2,#competitor_name3").blur(
				function() {// 失去焦点事件触发
					if($("#competitor_name1").val()!=""||$("#competitor_name2").val()!=""||$("#competitor_name3").val()!=""){
						$("#competitor_table").find(".info_explain_wrap").fadeOut("fast");
					}
		});
	};
	asyncAjaxMethod(url, params, true, fn);

}
var sale_rowCount=1;  //行数默认1行  
var buy_rowCount=1;
var mateial_rowCount=1;
var customer_rowCount=3;//行数默认为3行
var competitor_rowCount=3;//行数默认为3行
//添加主要销售产品及品牌行  
function addSaleRow(obj,table_id){
	if($("#sale_name"+ sale_rowCount).val()==""){
		$(obj).next().html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入销售产品"+"</span>");
		$(obj).next().fadeIn("fast");
		return;
	}  else{
		$(obj).next().fadeOut("fast");
	}
	sale_rowCount++;
    var newRow="<tr id='sale_row"+ sale_rowCount +"'>"
					+"<td><input id='sale_name"+ sale_rowCount +"' type='text'   placeholder='产品名称' /></td>"
					+"<td><input id='sale_brand"+ sale_rowCount +"' type='text'  placeholder='品牌' /></td>"
					+'<td><a onclick="delSaleRow(this,'+sale_rowCount+')"><img src="/newresources/images/del.png" />删除</a></td>'
					+"<td style='dispaly:none;'><input id='sale_brand_id"+ sale_rowCount +"' type='hidden' value='-1'></td>"
					+"<td style='dispaly:none;'><input id='app_goods_id"+ sale_rowCount +"' type='hidden' value='-1'></td>"
				+"</tr>";  
    $('#'+table_id).append(newRow);
    
	$("#sale_name"+ sale_rowCount +",#sale_brand" + sale_rowCount).blur(function(){
		if($("#sale_name" + sale_rowCount).val() != ""){//只要行中有数据就隐藏提示信息
			$("#sale_table").find(".info_explain_wrap").fadeOut("fast");
		}
	});
}  
  
//删除行  
function delSaleRow(obj,sale_rowCountForDel){  
	var id= $(obj).parent().parent().find("#sale_brand_id"+sale_rowCountForDel).val();
	goods_delIds.push(id);
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
function addMateialRow(obj,table_id){  
	if($("#material_name"+ mateial_rowCount +"").val()==""){
		$(obj).next().html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入原材料名"+"</span>");
		$(obj).next().fadeIn("fast");
		return;
	}  else{
		$(obj).next().fadeOut("fast");
	}  
	mateial_rowCount++;  
    var newRow="<tr id='mateial_row"+ mateial_rowCount +"'>"
					+"<td><input id='material_name"+ mateial_rowCount +"'  type='text'  placeholder='材料名称' /></td>"
					+"<td><input id='material_brand"+ mateial_rowCount +"' type='text'  placeholder='材料品牌' /></td>"
					+'<td><a onclick="delMateialRow(this,'+mateial_rowCount+')"><img src="/newresources/images/del.png" />删除</a></td>'
					+"<td style='dispaly:none;'><input id='material_brand_id"+ mateial_rowCount +"' type='hidden' value='-1'></td>"
					+"<td style='dispaly:none;'><input id='app_material_id"+ mateial_rowCount +"' type='hidden' value='-1'></td>"
				+"</tr>";  
    $('#'+table_id).append(newRow); 
    
    $("#material_name"+ mateial_rowCount +",#material_brand" + mateial_rowCount).blur(function(){
		if($("#material_name" + mateial_rowCount).val() != ""){//只要行中有数据就隐藏提示信息
			$("#mateial_table").find(".info_explain_wrap").fadeOut("fast");
		}
	}); 
}  
  
//删除行  
function delMateialRow(obj,mateial_rowCountForDel){  
    var id= $(obj).parent().parent().find("#material_brand_id"+mateial_rowCountForDel).val();
	mateial_delIds.push(id);
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
function addCustomerRow(obj,table_id){  
    var customer_rowCount1=customer_rowCount-1;
    var customer_rowCount2=customer_rowCount-2;
    if($("#customer_name"+ customer_rowCount +"").val()==""||$("#customer_name"+ customer_rowCount1 +"").val()==""||$("#customer_name"+ customer_rowCount2 +"").val()==""){
		$(obj).next().html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入客户"+"</span>");
		$(obj).next().fadeIn("fast");
		return;
	}  else{
		$(obj).next().fadeOut("fast");
	} 
    var newRow="<tr id='customer_row1'>"
					+"<td><input id='customer_name"+ (++customer_rowCount) +"' class='customer_name'  type='text'  placeholder='客户名称' /><input class='customer_id' id='customer_id"+ customer_rowCount +"' type='hidden' value='-1'/><input  id='app_customer_id"+ customer_rowCount +"' type='hidden' value='-1'/></td>"
					+"<td><input id='customer_name"+ (++customer_rowCount) +"' class='customer_name'  type='text'  placeholder='客户名称' /><input class='customer_id' id='customer_id"+ customer_rowCount +"' type='hidden' value='-1'/><input  id='app_customer_id"+ customer_rowCount +"' type='hidden' value='-1'/></td>"
					+"<td><input id='customer_name"+ (++customer_rowCount) +"' class='customer_name'  type='text'  placeholder='客户名称' /><input class='customer_id' id='customer_id"+ customer_rowCount +"' type='hidden' value='-1'/><input  id='app_customer_id"+ customer_rowCount +"' type='hidden' value='-1'/></td>"
					+'<td><a onclick="delCustomerRow(this,'+customer_rowCount+')"><img src="/newresources/images/del.png" />删除</a></td>'
				+"</tr>";
    $('#'+table_id).append(newRow);
    
    $("#customer_name"+(customer_rowCount-2)+",#customer_name"+(customer_rowCount-1)+",#customer_name"+customer_rowCount).blur(function(){//失去焦点事件触发
    	if($("#customer_name"+(customer_rowCount-2)).val()!=""||$("#customer_name"+(customer_rowCount-1)).val()!=""||$("#customer_name"+customer_rowCount).val()!=""){
    		$("#customer_table").find(".info_explain_wrap").fadeOut("fast");
    	}
	});
}  
  
//删除行  
function delCustomerRow(obj,customer_rowCountForDel){  
	$(obj).parent().parent().find(".customer_id").each(function(index,element){//获取行中所有的id
		var id=$(element).val();
		customer_delIds.push(id);
	});
	//如果是第一行，保留界面元素
	if(customer_rowCount<2*3)
	{
		$(obj).parent().parent().find("input").val("");
		$(obj).parent().parent().find("input").next().val("");
	}
	else
	{
		$(obj).parent().parent().remove();
		customer_rowCount = customer_rowCount-3;
	}
}

 //添加主要竞争对手行  
function addCompetitorRow(obj,table_id){  
    var competitor_rowCount1=competitor_rowCount-1;
    var competitor_rowCount2=competitor_rowCount-2;
    if($("#competitor_name"+ competitor_rowCount +"").val()==""||$("#competitor_name"+ competitor_rowCount1 +"").val()==""||$("#competitor_name"+ competitor_rowCount2 +"").val()==""){
		$(obj).next().html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入竞争对手"+"</span>");
		$(obj).next().fadeIn("fast");
		return;
	}  else{
		$(obj).next().fadeOut("fast");
	}  
    var newRow="<tr id='competitor_row1'>"
					+"<td><input id='competitor_name"+ (++competitor_rowCount) +"' class='competitor_name'   type='text' placeholder='对手名称' /><input id='competitor_id"+ competitor_rowCount +"' type='hidden' class='competitor_id' value='-1'/><input id='app_competitor_id"+ competitor_rowCount +"' type='hidden'  value='-1'/></td>"
					+"<td><input id='competitor_name"+ (++competitor_rowCount) +"' class='competitor_name'  type='text'  placeholder='对手名称' /><input id='competitor_id"+ competitor_rowCount +"' type='hidden' class='competitor_id' value='-1'/><input id='app_competitor_id"+ competitor_rowCount +"' type='hidden'  value='-1'/></td>"
					+"<td><input id='competitor_name"+ (++competitor_rowCount) +"' class='competitor_name'  type='text'  placeholder='对手名称' /><input id='competitor_id"+ competitor_rowCount +"' type='hidden' class='competitor_id' value='-1'/><input id='app_competitor_id"+ competitor_rowCount +"' type='hidden'  value='-1'/></td>"
					+'<td><a onclick="delCompetitorRow(this,'+competitor_rowCount+')"><img src="/newresources/images/del.png" />删除</a></td>'
				+"</tr>";
    $('#'+table_id).append(newRow);  
    
    $("#competitor_name"+(competitor_rowCount-2)+",#competitor_name"+(competitor_rowCount-1)+",#competitor_name"+competitor_rowCount).blur(function(){//失去焦点事件触发
    	if($("#competitor_name"+(competitor_rowCount-2)).val()!=""||$("#competitor_name"+(competitor_rowCount-1)).val()!=""||$("#competitor_name"+competitor_rowCount).val()!=""){
    		$("#competitor_table").find(".info_explain_wrap").fadeOut("fast");
    	}
	});
}  
  
//删除行  
function delCompetitorRow(obj,competitor_rowCountForDel){
	$(obj).parent().parent().find(".competitor_id").each(function(index,element){//获取行中所有的id
		var id=$(element).val();
		competitor_delIds.push(id);
	});
	
	//如果是第一行，保留界面元素
	if(competitor_rowCount<2*3)
	{
		$(obj).parent().parent().find("input").val("");
		$(obj).parent().parent().find("input").next().val("-1");
	}
	else
	{
		$(obj).parent().parent().remove();
		competitor_rowCount = competitor_rowCount-3;  
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
		customerItem.AppCustomerId = $(element).find("input").eq(2).val();
		if(typeof(customerItem.customerName) != "undefined"){//过滤非输入框
			if(customerItem.customerName != ""){
				customer[flagForCustomer] = JSON.stringify(customerItem);
				flagForCustomer++;
			}else{
				idsForDeleteCustomer += customerItem.customerId +",";
			}
		}
	});
	idsForDeleteCustomer = idsForDeleteCustomer.substring(0, idsForDeleteCustomer.length-1);
	//delCustomerByIds(idsForDeleteCustomer);//根据ids批量删除主要客户
	
	return customer.toString();//将js的数组对象转化为String //base.js中
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
		competitorItem.AppCompetitorId = $(element).find("input").eq(2).val();
		if(typeof(competitorItem.competitorName) != "undefined"){
			if(competitorItem.competitorName != ""){
				competitor[flagForCompetitor] = JSON.stringify(competitorItem);
				flagForCompetitor++;
			}else {
				idsForDeleteCompetitor += competitorItem.competitorId + ",";
			}
		}
	});
	idsForDeleteCompetitor = idsForDeleteCompetitor.substring(0, idsForDeleteCompetitor.length-1);
	//deleteCompetitorByIds(idsForDeleteCompetitor);//通过ids删除竞争对手
	
	return competitor.toString();//将js的数组对象转化为String //base.js中
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
		goodsItem.AppGoodsId = $(element).find("input").eq(3).val();
		if(typeof(goodsItem.goodsName) != "undefined"){
			goods[flagForGoods] = JSON.stringify(goodsItem);
			flagForGoods++;
		}
	});
	return goods.toString();//将js的数组对象转化为String //base.js中
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
		materialItem.AppMaterialId = $(element).find("input").eq(3).val();
		if(typeof(materialItem.materialName) != "undefined"){
			material[flagForMaterial] = JSON.stringify(materialItem);
			flagForMaterial++;
		}
	});
	return material.toString();
}
//操作设备清单
function doDevicelist(){
	var flagForDevice = 0;
	var device = new Array();
	$("#devicelist_table").find("tr").each(function(index,element){
		var deviceItem = {};
		deviceItem.deviceId = $(element).find("input").eq(7).val();
		deviceItem.advanced = $(element).find("input").eq(6).val();
		deviceItem.deviceNum = $(element).find("input").eq(5).val();
		deviceItem.buyDay = $(element).find("input").eq(4).val();
		deviceItem.price = $(element).find("input").eq(3).val();
		deviceItem.place = $(element).find("input").eq(2).val();
		deviceItem.specifications = $(element).find("input").eq(1).val();
		deviceItem.deviceName = $(element).find("input").eq(0).val();
		deviceItem.AppDeviceId = $(element).find("input").eq(8).val();
		if(typeof(deviceItem.deviceName) != "undefined"){
			device[flagForDevice] = JSON.stringify(deviceItem);
			flagForDevice++;
		}
	});
	return device.toString();//将js的数组对象转化为String //base.js中
}
//企业简介字数计算及限制
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

//读取平台规模能力信息
function scalepowerInfoShow_PF(result){
	cpBaseInfo = result.companyBaseInfo;
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
	//console.log(cpBaseInfo.certification_system);
	if(cpBaseInfo.certification_system==null||cpBaseInfo.certification_system==""){
	$("#certification_system_imgs").css("display","none");
	}
	else if("ISO9000" == cpBaseInfo.certification_system){//ISO9000
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
	
	$("#remain_words_num1").text(400-$("#schoolCoop").val().length);//剩余输入字数
}
	
//其他人员展示	mishengliang 10160418	
function otherPersonShow(result){
	cpBaseInfo = result.companyBaseInfo;
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
	/* $("#otherperson1").blur(function(){
		if(!int_reg.test($("#otherperson1").val())){
			$("#otherperson1").parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入数字"+"</span>");
			$("#otherperson1").parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
		}
	}); */
	
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
	if(otherPersonNum==5){
		$("#otherperson_table").find("tfoot").find("a").css("display","none");
	}
}	

//人员结构展示 mishengliang 20160418
function personTypeShow(result){
	cpBaseInfo = result.companyBaseInfo;
	//人员结构 第一行数据展示
	if(cpBaseInfo.college_num != 0 && cpBaseInfo.college_num != null){
		$("#persontype_select1").val(1);
		$("#persontype1").val(cpBaseInfo.college_num);
	}else if(cpBaseInfo.diploma_down_num != 0 && cpBaseInfo.diploma_down_num != null){
		$("#persontype_select1").val(3);
		$("#persontype1").val(cpBaseInfo.diploma_down_num);
	}
	/* $("#persontype1").blur(function(){
		if($(this).val()!=""){
			if(!int_reg.test($(this).val())){
				$("#persontype1").parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入数字"+"</span>");
				$("#persontype1").parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
			}
		}
	}); */
	
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
		$("#persontype_table").find("tfoot").find("a").css("display","none");
	}
}

//设备展示 mishengliang 2016-04-18
function deviceShow(result){
	var deviceList = result.deviceList;
	if(deviceList.length > 0){
		//添加第一条设备信息
		$("#device_id1").val(deviceList[0].device_id);
		$("#device_name1").val(deviceList[0].device_name);
		$("#device_format1").val(deviceList[0].specifications);
		$("#device_place1").val(deviceList[0].place);
		$("#device_price1").val(deviceList[0].price);
		$("#device_buy_day1").val(deviceList[0].buy_day);
		$("#device_num1").val(deviceList[0].device_num);
		$("#device_advanced1").val(deviceList[0].advanced);
		$("#app_device_id1").val(deviceList[0].device_id);
		
		for(var i=0; i < deviceList.length-1; i++){
			var j = i+2;
			addDevicelistRow('devicelist_table');

			$("#device_id" + j).val(deviceList[i+1].device_id);
			$("#device_name" + j).val(deviceList[i+1].device_name);
			$("#device_format" + j).val(deviceList[i+1].specifications);
			$("#device_place" + j).val(deviceList[i+1].place);
			$("#device_price" + j).val(deviceList[i+1].price);
			$("#device_buy_day" + j).val(deviceList[i+1].buy_day);
			$("#device_num" + j).val(deviceList[i+1].device_num);
			$("#device_advanced" + j).val(deviceList[i+1].advanced);
			$("#app_device_id" + j).val(deviceList[i+1].device_id);
		}
	}	
}
//设备展示 
function deviceShow1() {
	var url = "AccessApplicationCtrl/getAccessApplicationDevicelist.do";
	var params = {};
	params.record_id = record_id;
	var fn = function(result) {
		var deviceList = result.data;
		if (deviceList.length > 0) {
			// 添加第一条设备信息
			$("#device_id1").val(deviceList[0].device_id);
			$("#device_name1").val(deviceList[0].device_name);
			$("#device_format1").val(deviceList[0].specifications);
			$("#device_place1").val(deviceList[0].place);
			$("#device_price1").val(deviceList[0].price);
			if(deviceList[0].buy_day!=null){
				$("#device_buy_day1").val(deviceList[0].buy_day.substring(0,deviceList[0].buy_day.lastIndexOf(" ")));
			}else{
				$("#device_buy_day1").val(deviceList[0].buy_day);
			}
			$("#device_num1").val(deviceList[0].device_num);
			$("#device_advanced1").val(deviceList[0].advanced);
			$("#app_device_id1").val(deviceList[0].app_device_id);

			for (var i = 0; i < deviceList.length - 1; i++) {
				var j = i + 2;
				addDevicelistRow('devicelist_table');

				$("#device_id" + j).val(deviceList[i + 1].device_id);
				$("#device_name" + j).val(deviceList[i + 1].device_name);
				$("#device_format" + j).val(deviceList[i + 1].specifications);
				$("#device_place" + j).val(deviceList[i + 1].place);
				$("#device_price" + j).val(deviceList[i + 1].price);
				if(deviceList[i + 1].buy_day!=null){
					$("#device_buy_day" + j).val(deviceList[i + 1].buy_day.substring(0,deviceList[i + 1].buy_day.lastIndexOf(" ")));
				}else{
					$("#device_buy_day" + j).val(deviceList[i + 1].buy_day);
				}
				$("#device_num" + j).val(deviceList[i + 1].device_num);
				$("#device_advanced" + j).val(deviceList[i + 1].advanced);
				$("#app_device_id" + j).val(deviceList[i+1].app_device_id);
			}
		}
	};
	asyncAjaxMethod(url, params, true, fn);
}	
var otherperson_rowCount=1;
//添加其他人员行
function addOtherpersonRow(table_id,obj)
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
					+'<td><a class="ml8" onClick="delOtherpersonRow(this,'+ otherperson_rowCount +')"><img src="/newresources/images/del.png" />删除</a></td>'
					+"<td class='redcolor'></td>"
					+"<td><div class='info_explain_wrap'></div></td>"
				+"</tr>"; 
	$('#'+table_id).append(newRow);
	if(otherperson_rowCount==5){
		$(obj).css("display", "none");
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
function addPersontypeRow(table_id,obj){
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
							 +"<option value='1'>本科及以上</option>"
							 +"<option value='3'>大专以下</option>"
						+"</select>"
						+"<input id='persontype"+ persontype_rowCount +"' type='text' style=' width:150px;' class='input_wrap' size='50' />"
						+"<span class='f_l mt10 ml10'>人</span>"
					+"</td>"
					+'<td><a class="ml8" onClick="delPersontypeRow(this,'+ persontype_rowCount +')"><img src="/newresources/images/del.png" />删除</a></td>'
					+"<td class='redcolor'></td>"
					+"<td><div class='info_explain_wrap'></div></td>"
				+"</tr>";
	$('#'+table_id).append(newRow);
	if(persontype_rowCount==2){
		$(obj).css("display", "none");
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
						+"<td><input id='device_name"+ device_rowCount +"' type='text' style=' width:90px;' class='input_wrap' size='50' /></td>"
						+"<td><input id='device_format"+ device_rowCount +"' type='text' style=' width:90px;' class='input_wrap' size='50' /></td>"
						+"<td><input id='device_place"+ device_rowCount +"' type='text' style=' width:90px;' class='input_wrap' size='50' /></td>"
						+"<td><input id='device_price"+ device_rowCount +"' type='text' style=' width:70px;' class='input_wrap' size='50' /></td>"
						+"<td><input id='device_buy_day"+ device_rowCount +"' type='text' style=' width:90px;' onClick='WdatePicker({readOnly:true})' class='input_wrap Wdate' /></td>"
						+"<td><input id='device_num"+ device_rowCount +"' type='text' style=' width:70px;' class='input_wrap' size='20' /></td>"
						+"<td><input id='device_advanced"+ device_rowCount +"' type='text' style=' width:70px;' class='input_wrap' size='50' /></td>"
						+'<td><a onClick="delDevicelistRow(this,'+device_rowCount+')"><img src="/newresources/images/del.png" />删除</a></td>'
						+"<td class='redcolor'></td>"
						+"<td style='dispaly:none;'><input id='device_id"+ device_rowCount +"' type='hidden' value='-1'><input id='app_device_id"+ device_rowCount +"' type='hidden' value='-1'></td>"
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
	devicelist_delIds.push(id);
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

//上传文档文件
function addText(fileType){//fileType 30
	var fileName = $("#qc_file_table_capability").val();
	if(fileName!=""&&fileName!=null){//上传空间是否为空
		var ul=$("#annex_text");
		var imgSrc="/newresources/images/company_1.png";
		
		var fileElementId = $("#qc_file_table_capability").attr("id");
		var fileType = fileType;//文件类别
		fileName = fileName.substring(fileName.lastIndexOf("\\")+1);//保留后缀名
		
		var fileurl = "AccessApplicationCtrl/uploadAccessApplicationAttched.do";
		var params = {fileType:fileType,
		        fileName:fileName,
		        formatType:"text",
		        companyId:companyId};
		var fn = function(data){//服务器成功响应处理函数
	      	if (data.success==true &&data.message=="上传成功") {  
	     		imgSrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+data.mongodbId;
	     		
				var _newli="<tr>"
								+"<td><a style='float:left; width:200px; overflow:hidden;' onClick='downloadText_find(this)'>" + fileName + "</a><td>"
								+"<td>"+ data.creatDate +"</td>"
								+"<td><img src='/newresources/images/del2.png'  onClick='deluploadText(this,"+ data.fileId +")'/><a style='float:none' onClick='deluploadText(this,"+ data.fileId +")'>删除</a></td>"//虽使用的deluploadImg，但仍是删除文档
								+"<td align='right' style='width:200px'>"
									
									+"<input type='hidden' value="+ data.mongodbId +">"
									+"<input type='hidden' value="+ data.fileFormat +">"
								+"</td>"
							+"</tr>";
				
				$(ul).prepend(_newli);
				var option ={title:"提示",btn:parseInt("0001",2)};
				window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
				//当前上传控件清空
				$("#qc_file_table_capability").val("");
				$("#qc_file_name").val("");  
	         }else{
	         	//alert("false:"+data.message);
	         	var option ={title:"提示",btn:parseInt("0001",2)};
				window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
	         }
		};
	    addInputUtilFile(fileurl,params,fileElementId,fn);
		
	   	/*$.ajaxFileUpload({
		     url: getwebroot()+"AccessApplicationCtrl/uploadAccessApplicationAttched.do",
		     data: {
		        fileType:fileType,
		        fileName:fileName,
		        formatType:"text",
		        companyId:companyId
		     },
		     fileElementId: fileElementId,//input type=file 的id
		     dataType: "json",
		     success: function (data, status){//服务器成功响应处理函数
		      	if (data.success==true &&data.message=="上传成功") {  
		     		imgSrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+data.mongodbId;
		     		
					var _newli="<tr>"
									+"<td><a style='float:left; width:200px; overflow:hidden;' onClick='downloadText_find(this)'>" + fileName + "</a><td>"
									+"<td>"+ data.creatDate +"</td>"
									+"<td><img src='/newresources/images/del2.png'  onClick='deluploadText(this,"+ data.fileId +")'/><a style='float:none' onClick='deluploadText(this,"+ data.fileId +")'>删除</a></td>"//虽使用的deluploadImg，但仍是删除文档
									+"<td align='right' style='width:200px'>"
										
										+"<input type='hidden' value="+ data.mongodbId +">"
										+"<input type='hidden' value="+ data.fileFormat +">"
									+"</td>"
								+"</tr>";
					
					$(ul).prepend(_newli);
					var option ={title:"提示",btn:parseInt("0001",2)};
					window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
					//当前上传控件清空
					$("#qc_file_table_capability").val("");
					$("#qc_file_name").val("");  
		         }else{
		         	//alert("false:"+data.message);
		         	var option ={title:"提示",btn:parseInt("0001",2)};
					window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
		         }
		     },
		     error:function(data, status){	
		     	var option ={title:"提示",btn:parseInt("0001",2)};
				window.wxc.xcConfirm("error", window.wxc.xcConfirm.typeEnum.custom,option);
		     }
		});*/
	}
}

function showviewtext(){
	var filename=$("#qc_file_table_capability").val();
	$("#qc_file_name").val(filename);
	if (filename){
		$("#qc_file_name").nextAll(".info_explain").fadeOut("fast");
	}
}
//多张图片展示
function showMorePic1(fileTypeId){
	var url = "AccessApplicationCtrl/getAccessApplicationAttched.do";
	var params = {};
	params.file_type_id = fileTypeId;
	params.record_id=record_id;
	
	var isasync = true;
	var fn = function(result){
		if(result.data != ""){
				for(var i=0; i<result.data.length; i++){
					var imgSrc = getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[i].mogodb_id;
					var filename = result.data[i].file_name;
					var creatDate = result.data[i].create_dt;
					var _newli="<li>"
						+"<div class='image_block_pic'>"
							+"<img src='"+imgSrc+"'/>"
							+"<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='deluploadImg1(this,"+ result.data[i].id +")'>删除</a></div>"
						+"</div>"
						+"<div class='edit_div clearfix'>"
							+"<label title='"+ filename +"'>"+ strVachar(filename,23)+"</label><input type='text' class='edit_input' style='display:none' value='"+filename+"'/>"
							+"<a href='javascript:void(0)' class='eidt' style='display:inline' onClick='editImgText(this,"+result.data[i].id+")'>编辑</a>"
							+"<a href='javascript:void(0)' class='eidt_save'  style='display:none' onClick='saveImgText(this,"+result.data[i].id+")'>保存</a>"
						+"</div>"
					+"</li>";
					
		     		if(fileTypeId == 24){
		     			$("#company_equipment_imgs").prepend(_newli);
		     		}else if(fileTypeId == 26){
		     			$("#patent_imgs").prepend(_newli);
		     		}else if(fileTypeId == 27){
		     			$("#other_intelligence_imgs").prepend(_newli);
		     		}
				}
			}
	};		
	asyncAjaxMethod(url,params,isasync,fn);	
}

//删除上传的图片对象
function deluploadImg1(obj,fileId){
	$(obj).parent().parent().parent().remove();
	delFileIds.push(fileId);
}
function showText(fileType){
	var url = "PfTaskFileCtrl/getTaskFileListForWindow.do";
	var params = {};
	params.fileTypeId = fileType;
	params.companyId = accepter_id;
	
	var isasync = true;
	var fn = function(result){
		for(var i=0; i<result.data.length; i++){
			var creatDate = result.data[i].create_dt;
			var _newli="<tr>"
							+"<td><a style='float:left; width:200px; overflow:hidden;' onClick='downloadText_find(this)'>" + result.data[i].file_name + "</a><td>"
							+"<td>"+ result.data[i].create_dt +"</td>"
							+"<td><img src='/newresources/images/del2.png'  onClick='deluploadText(this,"+ result.data[i].id +")'/><a style='float:none' onClick='deluploadText(this,"+ result.data[i].id +")'>删除</a></td>"//虽使用的deluploadImg，但仍是删除文档
							+"<td align='right' style='width:200px'><input type='hidden' value="+ result.data[i].mogodb_id +"><input type='hidden' value="+ result.data[i].file_format +"></td>"
						+"</tr>";
			
			$("#annex_text").prepend(_newli);
		}
	};		
					
	asyncAjaxMethod(url,params,isasync,fn);	
}
function showText1(fileType){
	var url = "AccessApplicationCtrl/getAccessApplicationAttched.do";
	var params = {};
	params.file_type_id = fileType;
	params.record_id=record_id;
	
	var isasync = true;
	var fn = function(result){
		for(var i=0; i<result.data.length; i++){
			var creatDate = result.data[i].create_dt;
			var _newli="<tr>"
							+"<td><a style='float:left; width:200px; overflow:hidden;' onClick='downloadText_find(this)'>" + result.data[i].file_name + "</a><td>"
							+"<td>"+ result.data[i].create_dt +"</td>"
							+"<td><img src='/newresources/images/del2.png'  onClick='deluploadText1(this,"+ result.data[i].id +")'/><a style='float:none' onClick='deluploadText(this,"+ result.data[i].id +")'>删除</a></td>"//虽使用的deluploadImg，但仍是删除文档
							+"<td align='right' style='width:200px'><input type='hidden' value="+ result.data[i].mogodb_id +"></td>"
						+"</tr>";
			
			$("#annex_text").prepend(_newli);
		}
	};		
					
	asyncAjaxMethod(url,params,isasync,fn);	
}
//删除上传的文档对象
function deluploadText(obj,fileId){
	window.wxc.xcConfirm("确认删除么",window.wxc.xcConfirm.typeEnum.confirm,
		{
		onOk:function(){
			$(obj).parent().parent().remove();
			delFileIds.push(fileId);
		},
		onCancel:function(){
			}
	
	});
}
//删除上传的文档对象
function deluploadText1(obj,fileId){
	window.wxc.xcConfirm("确认删除么",window.wxc.xcConfirm.typeEnum.confirm,
		{
		onOk:function(){
			$(obj).parent().parent().remove();
		},
		onCancel:function(){
			}
	
	});
}
//下载文档
function downloadText_find(obj){
	window.open(getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+$(obj).parent().next().next().next().next().find("input").val());
}
//院校合作字数计算及限制
function schoolCoopLimit(){
	$("#schoolCoop").keyup(function(){
		console.log(1);
		var descriptLength = $("#schoolCoop").val().length;
		$("#remain_words_num1").text(400-descriptLength);
		if(400-descriptLength <= 0){
			var descriptLimit = $("#schoolCoop").val().substring(0,400);
			$("#schoolCoop").val(descriptLimit);
		}
	});
}
// 保存所有信息
function saveAllInfo(btn,o) {
	if(btn=="提交"){
	$("#f_phone").trigger("blur");
	$("#m_phone").trigger("blur");
	$("#email").trigger("blur");
	$("#contactAddr").trigger("blur");
	var error_str = "";
	var obj;//检测对象
			if($("#cpyname_cn1").val()=="")
			{
				error_str="请输入企业简称";
				obj=$("#cpyname_cn1");
			}
			else if($("#m_phone").val()!=""&&!mphone_reg.test($("#m_phone").val()))
			{
				error_str="请输入正确的联系人手机";
				obj=$("#m_phone");
			}
			else if($("#email").val()!=""&&!email_reg.test($("#email").val()))
			{
				error_str="请输入正确的EMAIl";
				obj=$("#email");
			}
			else if($("#f_phone").val()=="")
			{
				error_str="请输入联系电话";
				obj=$("#f_phone");
			}
			else if($("#f_phone").val()!=""&&!phone_reg.test($("#f_phone").val()))
			{
					error_str="请输入正确的联系电话格式";
					obj=$("#f_phone");
			}
			if($("#city").val()=="0")
			{
				$("#city").next().next().html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请选择地区"+"</span>");
				$("#city").next().next().fadeIn("fast");
					error_str="请选择地区";
					obj=$("#city");
			}else{
				$("#city").next().next().fadeOut("fast");
			}
			if($("#contactAddr").val()=="")
			{
					$("#contactAddr").next().find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入详细地址"+"</span>");
					$("#contactAddr").next().find(".info_explain_wrap").fadeIn("fast");
					error_str="请输入详细地址";
					obj = $("#contactAddr");
			}else{
				$("#contactAddr").next().find(".info_explain_wrap").fadeOut("fast");
			}
	for(var i=1;i<=device_rowCount;i++){
			if($("#device_name"+ i +"").val()==""||$("#device_num"+ i +"").val()==""){
				//$("#devicelist_table").append("<tr><td colspan='7'><div class='info_explain_wrap'></div></td></tr>");
				$("#device_name"+ i +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入设备名称和设备数量"+"</span>");
				$("#device_name"+ i +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeIn("fast");
				error_str="请输入设备名称和设备数量";
				obj = $("#device_name"+ i +"");
			}else if(!num_reg.test($("#device_price"+ i +"").val())||!int_reg.test($("#device_num"+ i +"").val())){
				$("#device_name"+ i +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请确认价值和数量为数字"+"</span>");
				$("#device_name"+ i +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeIn("fast");
				error_str="请确认价值和数量为数字";
				obj = $("#device_name"+ i +"");
			}else{
				$("#device_name"+ i +"").parent().parent().parent().find("tr:last").find("td").find(".info_explain_wrap").fadeOut("fast");
			}
	}
	for(var i=1;i<=sale_rowCount;i++){
		if($("#sale_name"+ i +"").val()==""){
			$("#sale_table").find("tfoot").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入销售产品"+"</span>");
			$("#sale_table").find("tfoot").find(".info_explain_wrap").fadeIn("fast");
			error_str="请输入销售产品";
			obj = $("#sale_name"+ i +"");
		}else{
			$("#sale_table").find("tfoot").find(".info_explain_wrap").fadeOut("fast");
		}
	}
	for(var i=1;i<=mateial_rowCount;i++){
		if($("#material_name"+ i +"").val()==""){
			$("#mateial_table").find("tfoot").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入原材料名"+"</span>");
			$("#mateial_table").find("tfoot").find(".info_explain_wrap").fadeIn("fast");
			error_str="请输入原材料名";
			obj = $("#material_name"+ i +"");
		}else{
			$("#mateial_table").find("tfoot").find(".info_explain_wrap").fadeOut("fast");
		}
	}
		if($("#competitor_name1").val()==""&&$("#competitor_name2").val()==""&&$("#competitor_name3").val()==""){
			$("#competitor_table").find("tfoot").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入竞争对手"+"</span>");
			$("#competitor_table").find("tfoot").find(".info_explain_wrap").fadeIn("fast");
			error_str="请输入竞争对手";
			obj = $("#competitor_name1");
		}else{
			$("#competitor_table").find("tfoot").find(".info_explain_wrap").fadeOut("fast");
		}
		for(var i=1;i<=otherperson_rowCount;i++){
		if($("#otherperson"+ i +"").val()!=""){
			if(!int_reg.test($("#otherperson"+ i +"").val())){
				$("#otherperson"+ i +"").parent().parent().find("td:last").find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入数字"+"</span>");
				$("#otherperson"+ i +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeIn("fast");
				error_str="请输入数字";
				obj = $("#otherperson"+ i +"");
			}else{
				$("#otherperson"+ i +"").parent().parent().find("td:last").find(".info_explain_wrap").fadeOut("fast");
			}
		}
	}
	for(var i=1;i<=persontype_rowCount;i++){
		if($("#persontype"+ i +"").val()!=""){
			if(!int_reg.test($("#persontype"+ i +"").val())){
				$("#persontype"+ i +"").parent().next().next().next().find(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请输入数字"+"</span>");
				$("#persontype"+ i +"").parent().next().next().next().find(".info_explain_wrap").fadeIn("fast");
				error_str="请输入数字";
				obj = $("#persontype"+ i +"");
			}else{
				$("#persontype"+ i +"").parent().next().next().next().find(".info_explain_wrap").fadeOut("fast");
			}
		}
	}
	if($("#turnover").val()!="")
	{
		if(!num_reg.test($("#turnover").val()))
		{
			error_str="请输入数字";
			obj = $("#turnover");
		}
	}
	if($("#exportNum").val()!="")
	{
		if(!num_reg.test($("#exportNum").val()))
		{
			error_str="请输入数字";
			obj = $("#exportNum");
		}
	}
	if($("#importNum").val()!="")
	{
		if(!num_reg.test($("#importNum").val()))
		{
			error_str="请输入数字";
			obj = $("#importNum");
		}
	}
	if($("#companyArea").val()!="")
	{
		if(!num_reg.test($("#companyArea").val()))
		{
			error_str="请输入数字";
			obj = $("#companyArea");
		}
	}
	if($("#factoryArea").val()!="")
	{
		if(!num_reg.test($("#factoryArea").val()))
		{
			error_str="请输入数字";
			obj = $("#factoryArea");
		}
	}
	if(error_str!=""){//错误信息显示
		$(obj).nextAll(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
		$(obj).nextAll(".info_explain_wrap").fadeIn("fast");
		$(obj).parents(".tabcon").css("display","block");
		$(o).parents(".tabcon").css("display","none");
		$(".tab").children("li").eq(3).removeClass("curr");
		if($(obj).parents(".tabcon").attr("id")=="detail_info"){
			$(".tab").children("li").eq(1).addClass("curr");
		}
		else if($(obj).parents(".tabcon").attr("id")=="scalepower_info"){
			$(".tab").children("li").eq(2).addClass("curr");
		}
		$(obj).focus();
		//window.wxc.xcConfirm(error_str,confirm);
		return;
	}else{
		$(obj).nextAll(".info_explain_wrap").fadeOut("fast");
	}
	if($("#lng").val()==""&&$("#lat").val()==""){
			window.wxc.xcConfirm("请先定位到地图",confirm);
			return;
	} 
	if($("#bankTable").find("tr").length==1){
		window.wxc.xcConfirm("请至少选择一个银行账号",confirm);
		return;
	}else{
		var flag=false;
		$("#bankTable").find("tr:gt(0)").each(function(){
			if($(this).children().eq(5).find(".defaultAccount").length>0){
				flag=true;
			}
		});
		if(!flag){
			window.wxc.xcConfirm("请默认一个银行账号",confirm);
			return;
		}
	}
	if($("#invoiceTable").find("tr").length==1){
		window.wxc.xcConfirm("请选择发票抬头",confirm);
		return;
	}
	if($("#supplyCategory").children().length==0){
		window.wxc.xcConfirm("请至少选择一种供应品类",confirm);
		return;
	} 
	}
	saveDetailInfo(btn);
}
var contentParams={};
var syncSaveParams={};
contentParams.detailContentArr={};
contentParams.fileArr={};
var countForFile=0;
//保存详细信息
function saveDetailInfo(btn){
	var url="AccessApplicationCtrl/getAccessTemplet.do";
	var params={};
	params.hId=h_id;
	params.classifyId=2;
	var fn = function(result){
		for(var i=0;i<result.data.length;i++){
			  contentParams.detailContentArr[i]={};
			if(result.data[i].elements.length>0){
				var related_basis=result.data[i].elements[0].related_basis;
			}
			if(result.data[i].templet_name=="联系地址"){
				for(var j=0;j<result.data[i].elements.length;j++){
					 contentParams.detailContentArr[i][j]={};
					if(result.data[i].elements[j].related_basis=="contact_addr"){
						var contactAddr= $("#contactAddr").val();
						var e_id=result.data[i].elements[j].e_id;
						 contentParams.detailContentArr[i][j].e_id=e_id;
						 contentParams.detailContentArr[i][j].content=contactAddr;
						 syncSaveParams.contactAddr=contactAddr;
					}
					else if(result.data[i].elements[j].related_basis=="lng"){
						var lng=$("#lng").val();
						var e_id=result.data[i].elements[j].e_id;
						 contentParams.detailContentArr[i][j].e_id=e_id;
						 contentParams.detailContentArr[i][j].content=lng;
						 syncSaveParams.lng=lng;
					}
					else if(result.data[i].elements[j].related_basis=="lat"){
						var lat=$("#lat").val();
						var e_id=result.data[i].elements[j].e_id;
						 contentParams.detailContentArr[i][j].e_id=e_id;
						 contentParams.detailContentArr[i][j].content=lat;
						 syncSaveParams.lat=lat;
					}
					else if(result.data[i].elements[j].related_basis=="reg_addr_code"){
						var contactAddrCode= $("#country").val();
						var e_id=result.data[i].elements[j].e_id;
						 contentParams.detailContentArr[i][j].e_id=e_id;
						 contentParams.detailContentArr[i][j].content=contactAddrCode;
						 syncSaveParams.contactAddrCode=contactAddrCode;
					}
				}
			}
			else if(result.data[i].templet_name=="主要原材料及品牌"){
				contentParams.material=doMaterial();
			}
			else if(result.data[i].templet_name=="主要销售产品及品牌"){
				contentParams.goods=doGoods();
			}
			else if(result.data[i].templet_name=="主要竞争对手"){
				contentParams.competitor=doCompetitor();
			}
			else if(result.data[i].templet_name=="主要客户"){
				contentParams.customer=doCustomer();
			}
			else if(result.data[i].templet_name=="厂容厂貌"){
				var mogodbIdArr=[];
				var fileNameArr=[];
				var fileIdArr=[];
				$("#company_equipment_imgs").find("label").each(function(){
					contentParams.fileArr[countForFile]={};
					 var file_name=$(this).text();
					 var srcStr= $(this).parent().prev().find("img").attr("src");
					 var file_format=$(this).parent().prev().find("img").next().val();
					 mogodb_id=srcStr.substring(srcStr.indexOf("=")+1);
					 fileNameArr.push(file_name);
					 mogodbIdArr.push(mogodb_id);
					 var str=$(this).next().next().next().attr("onclick");
					 fileId=str.substring(str.indexOf(",")+1,str.length-1);
					 fileIdArr.push(fileId);
					 contentParams.fileArr[countForFile].file_type_id=24;
						contentParams.fileArr[countForFile].mogodb_id=mogodb_id;
						contentParams.fileArr[countForFile].file_name=file_name;
						contentParams.fileArr[countForFile].fileId=fileId;
						contentParams.fileArr[countForFile].file_format=file_format;
						countForFile++;
				});
			}
			else{
				var e_id=result.data[i].elements[0].e_id;
				var content=$("#"+related_basis+"").val();
				 contentParams.detailContentArr[i].e_id=e_id;
				 contentParams.detailContentArr[i].content=content;
				 syncSaveParams[related_basis]=content;
			}
		}
		saveScalepowerInfo(btn);
	};
	asyncAjaxMethod(url,params,true,fn);
}
contentParams.scalepowerContentArr={};
//保存规模能力信息
function saveScalepowerInfo(btn){
	var url="AccessApplicationCtrl/getAccessTemplet.do";
	var params={};
	params.hId=h_id;
	params.classifyId=3;
	var fn = function(result){
		for(var i=0;i<result.data.length;i++){
			 contentParams.scalepowerContentArr[i]={};
			if(result.data[i].elements.length>0){
				var related_basis=result.data[i].elements[0].related_basis;
			}
			if(result.data[i].templet_name=="其他人员"){
				var techNum;
				var opNum;
				var qcNum;
				var staffNum;
				var internalAuditorNum;
				$("#otherperson_table").find("tr").each(function(index,element){
					var otherPersonType = $(element).find("select").val();
		
					switch (otherPersonType){
						case "0":
							break;
						case "1":
							techNum = $(element).find("input").val();
							break;	
						case "2":
							opNum = $(element).find("input").val();
							break;
						case "3":
							qcNum = $(element).find("input").val();
							break;
						case "4":
							staffNum = $(element).find("input").val();
							break;
						case "5":
							internalAuditorNum = $(element).find("input").val();
							break;				
						default:
							break;	
					}
				});
				for(var j=0;j<result.data[i].elements.length;j++){
					contentParams.scalepowerContentArr[i][j]={};
					if(result.data[i].elements[j].related_basis=="tech_num"){
						var e_id=result.data[i].elements[j].e_id;
						 contentParams.scalepowerContentArr[i][j].e_id=e_id;
						 contentParams.scalepowerContentArr[i][j].content=techNum;
						 syncSaveParams.techNum=techNum;
					}
					else if(result.data[i].elements[j].related_basis=="qc_num"){
						var e_id=result.data[i].elements[j].e_id;
						 contentParams.scalepowerContentArr[i][j].e_id=e_id;
						 contentParams.scalepowerContentArr[i][j].content=qcNum;
						 syncSaveParams.qcNum=qcNum;
					}
					else if(result.data[i].elements[j].related_basis=="internal_auditor_num"){
						var e_id=result.data[i].elements[j].e_id;
						 contentParams.scalepowerContentArr[i][j].e_id=e_id;
						 contentParams.scalepowerContentArr[i][j].content=internalAuditorNum;
						 syncSaveParams.internalAuditorNum=internalAuditorNum;
					}
					else if(result.data[i].elements[j].related_basis=="staff_num"){
						var e_id=result.data[i].elements[j].e_id;
						 contentParams.scalepowerContentArr[i][j].e_id=e_id;
						 contentParams.scalepowerContentArr[i][j].content=staffNum;
						 syncSaveParams.staffNum=staffNum;
					}
					else if(result.data[i].elements[j].related_basis=="op_num"){
						var e_id=result.data[i].elements[j].e_id;
						contentParams.scalepowerContentArr[i][j].e_id=e_id;
						contentParams.scalepowerContentArr[i][j].content=opNum;
						syncSaveParams.opNum=opNum;
					}
				}
			}
			else if(result.data[i].templet_name=="人员结构"){
				var collegeNum;
				var diplomaNum;
				var diplomaDownNum;
				$("#persontype_table").find("tr").each(function(index,element){
					var personType = $(element).find("select").val();
		
					switch (personType){
						case "0":
						break;
					case "1":
						collegeNum = $(element).find("input").val();
						break;	
					case "2":
						diplomaNum = $(element).find("input").val();
						break;
					case "3":
						diplomaDownNum = $(element).find("input").val();
						break;
					default:
						break;	
					}
				});
				for(var j=0;j<result.data[i].elements.length;j++){
					contentParams.scalepowerContentArr[i][j]={};
					if(result.data[i].elements[j].related_basis=="college_num"){
						var e_id=result.data[i].elements[j].e_id;
						contentParams.scalepowerContentArr[i][j].e_id=e_id;
						contentParams.scalepowerContentArr[i][j].content=collegeNum;
						syncSaveParams.collegeNum=collegeNum;
					}
					else if(result.data[i].elements[j].related_basis=="diploma_num"){
						var e_id=result.data[i].elements[j].e_id;
						contentParams.scalepowerContentArr[i][j].e_id=e_id;
						contentParams.scalepowerContentArr[i][j].content=diplomaNum;
						syncSaveParams.diplomaNum=diplomaNum;
					}
					else if(result.data[i].elements[j].related_basis=="diploma_down_num"){
						var e_id=result.data[i].elements[j].e_id;
						contentParams.scalepowerContentArr[i][j].e_id=e_id;
						contentParams.scalepowerContentArr[i][j].content=diplomaDownNum;
						syncSaveParams.diplomaDownNum=diplomaDownNum;
					}
				}
			}
			else if(result.data[i].templet_name=="质量控制"){
				var content;
				$("#"+related_basis+"").find("input").each(function(index,element){
					if($(element)[0].checked){
						content = $(element).val();
					}
				});
				var e_id=result.data[i].elements[0].e_id;
				 contentParams.scalepowerContentArr[i].e_id=e_id;
				 contentParams.scalepowerContentArr[i].content=content;
				 syncSaveParams.qualityControl=content;
			}
			else if(result.data[i].templet_name=="OEM代加工"){
				var content;
				$("#"+related_basis+"").find("input").each(function(index,element){
					if($(element)[0].checked){
						content = $(element).val();
					}
				});
				var e_id=result.data[i].elements[0].e_id;
				 contentParams.scalepowerContentArr[i].e_id=e_id;
				 contentParams.scalepowerContentArr[i].content=content;
				 syncSaveParams.isOem=content;
			}
			else if(result.data[i].templet_name=="管理体系认证"){
				var content;
				$("#"+related_basis+"").find("input").each(function(index,element){
					if($(element)[0].checked){
						switch(index){
							case 0:
								content = "";
								break;
							case 1:
								content = "ISO9000";
								break;
							case 2:
								content = "ISO14000";
								break;
							case 3:
								content = $("#certification_system_other").val();
								break;
							default:
								break;			
						}
					}
				});
				var e_id=result.data[i].elements[0].e_id;
				 contentParams.scalepowerContentArr[i].e_id=e_id;
				 contentParams.scalepowerContentArr[i].content=content;
				 syncSaveParams.certificationSystem=content;
				var srcStr=$("#certification_system_imgs").find("img").attr("src");
				var file_format=$("#certification_system_imgs").find("img").children().val();
				if(srcStr!="/newresources/images/uploadImg.png"){
					 contentParams.fileArr[countForFile]={};
					var mogodb_id=srcStr.substring(srcStr.indexOf("=")+1);
					var str=$("#management_system").next().next().children().attr("onclick");
					 fileId=str.substring(str.indexOf(",")+1,str.length-1);
					 contentParams.fileArr[countForFile].file_type_id=25;
						contentParams.fileArr[countForFile].mogodb_id=mogodb_id;
						contentParams.fileArr[countForFile].file_name="";
						contentParams.fileArr[countForFile].file_format=file_format;
						contentParams.fileArr[countForFile].fileId=fileId;
						countForFile++;
				}
			}
			else if(result.data[i].templet_name=="年营业额"){
				var turnover;
				var turnover_currency_id;
				turnover=$("#"+related_basis+"").val();
				turnover_currency_id= $("#turnover_currency_id").val();
				for(var j=0;j<result.data[i].elements.length;j++){
					contentParams.scalepowerContentArr[i][j]={};
					if(result.data[i].elements[j].related_basis=="turnover"){
						var e_id=result.data[i].elements[j].e_id;
						contentParams.scalepowerContentArr[i][j].e_id=e_id;
						contentParams.scalepowerContentArr[i][j].content=turnover;
						syncSaveParams.turnover=turnover;
					}
					else if(result.data[i].elements[j].related_basis=="turnover_currency_id"){
						var e_id=result.data[i].elements[j].e_id;
						contentParams.scalepowerContentArr[i][j].e_id=e_id;
						contentParams.scalepowerContentArr[i][j].content=turnover_currency_id;
						syncSaveParams.turnoverCurrencyId=turnover_currency_id;
					}
				}
			}
			else if(result.data[i].templet_name=="年出口额"){
				var exportNum;
				var export_currency_id;
				exportNum=$("#"+related_basis+"").val();
				export_currency_id= $("#export_currency_id").val();
				for(var j=0;j<result.data[i].elements.length;j++){
					contentParams.scalepowerContentArr[i][j]={};
					if(result.data[i].elements[j].related_basis=="exportNum"){
						var e_id=result.data[i].elements[j].e_id;
						contentParams.scalepowerContentArr[i][j].e_id=e_id;
						contentParams.scalepowerContentArr[i][j].content=exportNum;
						syncSaveParams.exportNum=exportNum;
					}
					else if(result.data[i].elements[j].related_basis=="export_currency_id"){
						var e_id=result.data[i].elements[j].e_id;
						contentParams.scalepowerContentArr[i][j].e_id=e_id;
						contentParams.scalepowerContentArr[i][j].content=export_currency_id;
						syncSaveParams.exportCurrencyId=export_currency_id;
					}
				}
			}
			else if(result.data[i].templet_name=="年进口额"){
				var importNum;
				var import_currency_id;
				importNum=$("#"+related_basis+"").val();
				import_currency_id= $("#import_currency_id").val();
				for(var j=0;j<result.data[i].elements.length;j++){
					contentParams.scalepowerContentArr[i][j]={};
					if(result.data[i].elements[j].related_basis=="importNum"){
						var e_id=result.data[i].elements[j].e_id;
						contentParams.scalepowerContentArr[i][j].e_id=e_id;
						contentParams.scalepowerContentArr[i][j].content=importNum;
						syncSaveParams.importNum=importNum;
					}
					else if(result.data[i].elements[j].related_basis=="import_currency_id"){
						var e_id=result.data[i].elements[j].e_id;
						contentParams.scalepowerContentArr[i][j].e_id=e_id;
						contentParams.scalepowerContentArr[i][j].content=import_currency_id;
						syncSaveParams.importCurrencyId=import_currency_id;
					}
				}
			}
			else if(result.data[i].templet_name=="使用年限"){
				var useBegintime;
				var useEndtime;
				useBegintime=$("#useBegintime").val();
				useEndtime=$("#useEndtime").val();
				for(var j=0;j<result.data[i].elements.length;j++){
					contentParams.scalepowerContentArr[i][j]={};
					if(result.data[i].elements[j].related_basis=="use_begintime"){
						var e_id=result.data[i].elements[j].e_id;
						contentParams.scalepowerContentArr[i][j].e_id=e_id;
						contentParams.scalepowerContentArr[i][j].content=useBegintime;
						syncSaveParams.useBegintime=useBegintime;
					}
					else if(result.data[i].elements[j].related_basis=="use_endtime"){
						var e_id=result.data[i].elements[j].e_id;
						contentParams.scalepowerContentArr[i][j].e_id=e_id;
						contentParams.scalepowerContentArr[i][j].content=useEndtime;
						syncSaveParams.useEndtime=useEndtime;
					}
				}
			}
			else if(result.data[i].templet_name=="设备清单"){
				contentParams.devicelist=doDevicelist();
			}
			else if(result.data[i].templet_name=="专利"){
				var mogodbIdArr=[];
				var fileNameArr=[];
				var fileIdArr=[];
				$("#patent_imgs").find("label").each(function(){
					contentParams.fileArr[countForFile]={};
					 var file_name=$(this).text();
					 var srcStr= $(this).parent().prev().find("img").attr("src");
					 var file_format=$(this).parent().prev().find("img").next().val();
					 mogodb_id=srcStr.substring(srcStr.indexOf("=")+1);
					 fileNameArr.push(file_name);
					 mogodbIdArr.push(mogodb_id);
					  var str=$(this).next().next().next().attr("onclick");
					 fileId=str.substring(str.indexOf(",")+1,str.length-1);
					 fileIdArr.push(fileId);
					 contentParams.fileArr[countForFile].file_type_id=26;
						contentParams.fileArr[countForFile].mogodb_id=mogodb_id;
						contentParams.fileArr[countForFile].file_name=file_name;
						contentParams.fileArr[countForFile].file_format=file_format;
						contentParams.fileArr[countForFile].fileId=fileId;
						countForFile++;
				});
			}
			else if(result.data[i].templet_name=="其他资质"){
				var mogodbIdArr=[];
				var fileNameArr=[];
				var fileIdArr=[];
				$("#other_intelligence_imgs").find("label").each(function(){
					contentParams.fileArr[countForFile]={};
					 var file_name=$(this).text();
					 var srcStr= $(this).parent().prev().find("img").attr("src");
					 var file_format=$(this).parent().prev().find("img").next().val();
					 mogodb_id=srcStr.substring(srcStr.indexOf("=")+1);
					 fileNameArr.push(file_name);
					 mogodbIdArr.push(mogodb_id);
					  var str=$(this).next().next().next().attr("onclick");
					 fileId=str.substring(str.indexOf(",")+1,str.length-1);
					 fileIdArr.push(fileId);
					 contentParams.fileArr[countForFile].file_type_id=27;
						contentParams.fileArr[countForFile].mogodb_id=mogodb_id;
						contentParams.fileArr[countForFile].file_name=file_name;
						contentParams.fileArr[countForFile].file_format=file_format;
						contentParams.fileArr[countForFile].fileId=fileId;
						countForFile++;
				});
			}
			else if(result.data[i].templet_name=="院校合作"){
				var e_id=result.data[i].elements[0].e_id;
				var content=$("#"+related_basis+"").val();
				 contentParams.scalepowerContentArr[i].e_id=e_id;
				 contentParams.scalepowerContentArr[i].content=content;
				 syncSaveParams.schoolCoop=content;
				var mogodbIdArr=[];
				var fileNameArr=[];
				var fileIdArr=[];
				$("#annex_text").find("tbody").find("tr").each(function(){
					contentParams.fileArr[countForFile]={};
					 var file_name=$(this).children().eq(0).text();
					 var mogodb_id=$(this).children().eq(4).children().eq(0).val();
					 var file_format=$(this).children().eq(4).children().eq(1).val();
					 fileNameArr.push(file_name);
					 mogodbIdArr.push(mogodb_id);
					 var str=$(this).children().eq(3).children().attr("onclick");
					 fileId=str.substring(str.indexOf(",")+1,str.length-1);
					 fileIdArr.push(fileId);
					 contentParams.fileArr[countForFile].file_type_id=30;
						contentParams.fileArr[countForFile].mogodb_id=mogodb_id;
						contentParams.fileArr[countForFile].file_name=file_name;
						contentParams.fileArr[countForFile].file_format=file_format;
						contentParams.fileArr[countForFile].fileId=fileId;
						countForFile++;
				});
			}
			else{
				var e_id=result.data[i].elements[0].e_id;
				var content=$("#"+related_basis+"").val();
				 contentParams.scalepowerContentArr[i].e_id=e_id;
				 contentParams.scalepowerContentArr[i].content=content;
				 syncSaveParams[related_basis]=content;
			}
		}	
		saveTradeInfo(btn);
	};
	asyncAjaxMethod(url,params,true,fn);
}
contentParams.bankInfoArr={};
contentParams.invoiceInfoArr={};
//保存交易信息
function saveTradeInfo(btn){
	var i=0;
	$("#bankTable").find("tr:gt(0)").each(function(){
		contentParams.bankInfoArr[i]={};
		var account_id=$(this).children().eq(3).children().val();
		var account_name=$(this).children().eq(0).text();
		var account_code=$(this).children().eq(1).text();
		var account_sts;
		var default_id;
		if($(this).children().eq(2).text()=="在用"){
			account_sts=0;
		}else{
			account_sts=1;
		}
		var app_account_id=$(this).children().eq(4).children().val();
		if($(this).children().eq(5).children().text()=="默认账号"){
			default_id=1;
		}else{
			default_id=0;
		}
		contentParams.bankInfoArr[i].account_id=account_id;
		contentParams.bankInfoArr[i].account_name=account_name;
		contentParams.bankInfoArr[i].account_code=account_code;
		contentParams.bankInfoArr[i].account_sts=account_sts;
		contentParams.bankInfoArr[i].app_account_id=app_account_id;
		contentParams.bankInfoArr[i].default_id=default_id;
		i++;
	});
	var j=0;
	$("#invoiceTable").find("tr:gt(0)").each(function(){
		contentParams.invoiceInfoArr[j]={};
		var invoice_title_name=$(this).children().eq(0).text();
		var invoice_title_sts;
		if($(this).children().eq(1).text()=="在用"){
			invoice_title_sts=0;
		}else{
			invoice_title_sts=1;
		}
		var app_invoice_title_id=$(this).children().eq(3).children().val();
		if($(this).children().eq(2).children().val()=="-1"){
			contentParams.invoiceInfoArr[j].invoice_title_name=invoice_title_name;
			contentParams.invoiceInfoArr[j].invoice_title_sts=invoice_title_sts;
			contentParams.invoiceInfoArr[j].app_invoice_title_id=app_invoice_title_id;
		}
		j++;
	});
	saveCategoryInfo(btn);
}
contentParams.categoryInfoArr={};
//保存供应品类
function saveCategoryInfo(btn){
	var i=0;
	$(".addSupplySort_main").find("input:checkbox").each(function(){
		if(($(this)[0].checked||$(this)[0].indeterminate)&& $(this).next().next().val()==-1){
			contentParams.categoryInfoArr[i]={};
			var category_id=$(this).next().val();
			contentParams.categoryInfoArr[i].category_id=category_id;
			i++;
		}
		if((!$(this)[0].checked && !$(this)[0].indeterminate) && $(this).next().next().val()!=-1){
	 		category_delIds.push($(this).next().next().val());
	 	}
	});
	contentParams.companyId=accepter_id;
	contentParams.record_id=record_id;
	contentParams.access_status=access_status;
	contentParams.delFileIds=delFileIds.join(",");
	contentParams.account_ids=bankAccount_delIds.join(",");
	contentParams.invoice_title_ids=invoiceTitle_delIds.join(",");
	contentParams.mateial_ids=mateial_delIds.join(",");
	contentParams.goods_ids=goods_delIds.join(",");
	contentParams.customer_ids=customer_delIds.join(",");
	contentParams.competitor_ids=competitor_delIds.join(",");
	contentParams.devicelist_ids=devicelist_delIds.join(",");
	contentParams.category_ids=category_delIds.join(",");
	if(btn=="提交" && $("#syncSave")[0].checked){
		contentParams.isSyncSave="true";
	}
	saveInfo(btn);
}
//保存内容
function saveInfo(btn){
	var url="AccessApplicationCtrl/saveAllInfo.do";
	var params={};
	params.contentParams=JSON.stringify(contentParams);
	var fn = function(result){
		if(result.data){
			if(btn=="提交"){
				updateAccessRecord(2);
				$("#step1").css("display","none");
				$("#step2").css("display","block");
				$(".stepInfo_wrap").find('.step_index').eq(1).css("background-color","#ff9900");
				$(".step_bar_curr").width(1024);
			}else{
				updateAccessRecord(1);
			}
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
//获取准入流水状态
function getAccessRecord(){
	var url="AccessApplicationCtrl/getAccessRecord.do";
	var accessRecord;
	var params={};
	params.record_id=record_id;
	var fn = function(result){
		accessRecord=result.data[0];
		$("#table_title").text(result.data[0].receive_name+"供应商准入申请");
	};
	asyncAjaxMethod(url,params,false,fn);
	return accessRecord;
}
//修改准入流水状态
function updateAccessRecord(access_status){
	var url="AccessApplicationCtrl/updateAccessRecord.do";
	var params={};
	params.record_id=record_id;
	params.access_status=access_status;
	var fn = function(result){
		if(access_status==1){
			location.reload(true);
		}
		else if(access_status==2 && $("#syncSave")[0].checked){
			updatePlatformBaseInfo(syncSaveParams);
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
//获取准入资料信息
function getAccessApplicationInfo(){
	var url="AccessApplicationCtrl/getAccessApplicationInfo.do";
	var params={};
	params.record_id=record_id;
	var fn = function(result){
		for(var i=0;i<result.data.length;i++){
			switch (result.data[i].classify_id) {
				case 2 :
					if (result.data[i].related_basis == "contact_addr") {
						$("#contactAddr").val(result.data[i].content);
						$("#contactAddrPro").val(result.data[i].content);
					}
					else if(result.data[i].related_basis == "lng"){
						$("#lng").val(result.data[i].content);// 经度
						lngForAll = result.data[i].content;
					}
					else if(result.data[i].related_basis == "lat"){
						$("#lat").val(result.data[i].content);// 纬度
						latForAll = result.data[i].content;
					}
					else if(result.data[i].related_basis == "reg_addr_code"){
						var contactAddrCode=result.data[i].content;
					}
					else {
						$("#" + result.data[i].related_basis + "").val(""
								+ replaceNullAsStr(result.data[i].content) + "");
					}
					break;
				case 3 :
					if (result.data[i].related_basis == "college_num") {
						var collegeNum = result.data[i].content;
					}
					else if (result.data[i].related_basis == "diploma_num") {
						var diplomaNum = result.data[i].content;
					}
					else if (result.data[i].related_basis == "diploma_down_num") {
						var diplomaDownNum = result.data[i].content;
					}
					else if (result.data[i].related_basis == "tech_num") {
						var techNum = result.data[i].content;
					}
					else if (result.data[i].related_basis == "qc_num") {
						var qcNum = result.data[i].content;
					}
					else if (result.data[i].related_basis == "internal_auditor_num") {
						var internalAuditorNum = result.data[i].content;
					}
					else if (result.data[i].related_basis == "staff_num") {
						var staffNum = result.data[i].content;
					}
					else if (result.data[i].related_basis == "op_num") {
						var opNum = result.data[i].content;
					}
					else if (result.data[i].related_basis == "quality_control") {
						$("[name = quality_control]:radio")
								.eq(result.data[i].content).attr("checked",
										true);// 质量控制复选框
					}
					else if (result.data[i].related_basis == "is_oem") {
						$("[name = OEM]:radio").eq(result.data[i].content)
								.attr("checked", true);// OEM带加工
					}
					// 质量管理体系
					else if (result.data[i].related_basis == "certification_system") {
						if (result.data[i].content == null
								|| result.data[i].content == "") {
							$("#certification_system_imgs").css("display",
									"none");
						} else if ("ISO9000" == result.data[i].content) {// ISO9000
							$("[name = certification_system]:radio").eq(1)
									.prop("checked", true);
							$("#certification_system_imgs").css("display",
									"block");
						} else if ("ISO14000" == result.data[i].content) {// ISO14000
							$("[name = certification_system]:radio").eq(2)
									.prop("checked", true);
							$("#certification_system_imgs").css("display",
									"block");
						} else {// 其他认证
							$("[name = certification_system]:radio").eq(3)
									.prop("checked", true);
							$("#certification_system_other")
									.val(result.data[i].content);
							$("#certification_system_imgs").css("display",
									"block");
						}
					}
					else if(result.data[i].related_basis == "use_begintime"){
						$("#useBegintime").val(result.data[i].content);//开始时间 
					}
					else if(result.data[i].related_basis == "use_endtime"){
						$("#useEndtime").val(result.data[i].content);//结束时间           
					}
					else{
						$("#" + result.data[i].related_basis + "").val(""
							+ replaceNullAsStr(result.data[i].content) + "");
					}
					break;
				default :
					break;
			}
		}
		// 省、市、县各级代码
		var provinceNum = Math
				.floor(parseInt(contactAddrCode)
						/ 10000)
				* 10000;
		var cityNum = Math
				.floor(parseInt(contactAddrCode) / 100)
				* 100;
		var countryNum = contactAddrCode;

		/* 模拟change事件 */
		if (!isNaN(provinceNum)) {
			$("#province").val(provinceNum).trigger("change");// 设置省级行政区
			$("#city").val(cityNum).trigger("change");// 设置市级行政区
			$("#country").val(countryNum).trigger("change");// 设置县级行政区
		}
		$("#remain_words_num").text(400
				- $("#companyIntroduction").val().length);
		if (techNum != 0 && techNum != null) {
			$("#otherperson_select1").val(1);
			$("#otherperson1").val(techNum);
		} else if (opNum != 0 && opNum != null) {
			$("#otherperson_select1").val(2);
			$("#otherperson1").val(opNum);
		} else if (qcNum != 0 && qcNum != null) {
			$("#otherperson_select1").val(3);
			$("#otherperson1").val(qcNum);
		} else if (staffNum != 0 && staffNum != null) {
			$("#otherperson_select1").val(4);
			$("#otherperson1").val(staffNum);
		} else if (internalAuditorNum != 0
				&& internalAuditorNum != null) {
			$("#otherperson_select1").val(5);
			$("#otherperson1").val(internalAuditorNum);
		}

		// 其他人员多行展示
		if ($("#otherperson_select1").val() != 0) {
			var otherPersonNum = 2;
			if (opNum != 0 && opNum != null
					&& $("#otherperson_select1").val() < 2) {
				addOtherpersonRow('otherperson_table');
				$("#otherperson_select" + otherPersonNum)
						.val(2);
				$("#otherperson" + otherPersonNum)
						.val(opNum);
				otherPersonNum++;
			}
			if (qcNum != 0 && qcNum != null
					&& $("#otherperson_select1").val() < 3) {
				addOtherpersonRow('otherperson_table');
				$("#otherperson_select" + otherPersonNum)
						.val(3);
				$("#otherperson" + otherPersonNum)
						.val(qcNum);
				otherPersonNum++;
			}
			if (staffNum != 0 && staffNum != null
					&& $("#otherperson_select1").val() < 4) {
				addOtherpersonRow('otherperson_table');
				$("#otherperson_select" + otherPersonNum)
						.val(4);
				$("#otherperson" + otherPersonNum)
						.val(staffNum);
				otherPersonNum++;
			}
			if (internalAuditorNum != 0
					&& internalAuditorNum != null
					&& $("#otherperson_select1").val() < 5) {
				addOtherpersonRow('otherperson_table');
				$("#otherperson_select" + otherPersonNum)
						.val(5);
				$("#otherperson" + otherPersonNum)
						.val(internalAuditorNum);
			}
		}
		if(otherPersonNum==5){
			$("#otherperson_table").find("tfoot").find("a").css("display","none");
		}
		// 人员结构 第一行数据展示
		if (collegeNum != 0 && collegeNum != null) {
			$("#persontype_select1").val(1);
			$("#persontype1").val(collegeNum);
		} else if (diplomaDownNum != 0
				&& diplomaDownNum != null) {
			$("#persontype_select1").val(3);
			$("#persontype1").val(diplomaDownNum);
		}

		// 人员结构多行展示
		if ($("#persontype_select1").val() != 0) {
			var personTypeNum = 2;
			if (diplomaDownNum != 0
					&& diplomaDownNum != null
					&& $("#persontype_select1").val() < 3) {
				addPersontypeRow('persontype_table');
				$("#persontype_select" + personTypeNum).val(3);
				$("#persontype" + personTypeNum)
						.val(diplomaDownNum);
			}
		}
		if(persontype_rowCount==2){
			$("#persontype_table").find("tfoot").find("a").css("display","none");
		}
		$("#remain_words_num1").text(400
				- $("#schoolCoop").val().length);
	};
	asyncAjaxMethod(url,params,true,fn);
}
//获取银行信息
function getAccessAccountInfo(){
	var url="AccessApplicationCtrl/getAccessAccount.do";
	var params={};
	params.record_id=record_id;
	var fn = function(result){
		var tableItem="";
		for(var i=0;i<result.data.length;i++){
			var account_sts;
			if(result.data[i].account_sts==0){
				account_sts="在用";
			}else{
				account_sts="已注销";
			}
			var default_id;
			if(result.data[i].default_id==0){
				default_id="<button class='setDefault hide' onclick='setBankDefault(this)'>设为默认</button>";
			}else{
				default_id="<button class='defaultAccount' disabled>默认账号</button>";
			}
			tableItem+='<tr onmouseover="showSetDefault(this)" onmouseout="hideSetDefault(this)">'
							+'<td class="left">'+result.data[i].account_name+'</td>'
							+'<td>'+result.data[i].account_code+'</td>'
							+'<td>'+account_sts+'</td>'
							+'<td><input type="hidden" value="'+result.data[i].account_id+'"/></td>'
							+'<td><input type="hidden" value="'+result.data[i].app_account_id+'" /></td>'
							+'<td>'+default_id+'</td>'
							+'<td class="pl10"><a onClick="delBankAccount(this)">删除</a></td>'
						+'</tr>';
		}
		$("#bankTable").append(tableItem);
	};
	asyncAjaxMethod(url,params,true,fn);
}
//获取发票抬头信息
function getAccessInvoiceTitleInfo(){
	var url="AccessApplicationCtrl/getAccessInvoiceTitle.do";
	var params={};
	params.record_id=record_id;
	var fn = function(result){
 		var tableItem="";
		for(var i=0;i<result.data.length;i++){
			var invoice_title_sts;
			if(result.data[i].invoice_title_sts==0){
				invoice_title_sts="在用";
			}else{
				invoice_title_sts="已注销";
			}
			tableItem+='<tr>'
							+'<td class="left">'+result.data[i].invoice_title_name+'</td>'
							+'<td>'+invoice_title_sts+'</td>'
							+'<td><input type="hidden" value="'+result.data[i].invoice_title_id+'" /></td>'
							+'<td><input type="hidden" value="'+result.data[i].app_invoice_title_id+'" /></td>'
							+'<td><a onClick="delInvoiceTitle(this)">删除</a></td>'
						+'</tr>';
		}
		$("#invoiceTable").append(tableItem);
	};
	asyncAjaxMethod(url,params,true,fn);
}
//上传图片文件
function addImg1(obj,fileType){
	if($(obj).val()!=""){//上传空间是否为空
		var ul=$(obj).parent().parent().parent();
		var fileName=$(obj).val();
		var imgSrc="/newresources/images/company_1.png";
		
		var fileElementId = $(obj).attr("id");
		var fileType = fileType;//文件类别
		fileName = fileName.substring(fileName.lastIndexOf("\\")+1,fileName.lastIndexOf("."));
		
		var fileurl = "AccessApplicationCtrl/uploadAccessApplicationAttched.do";
		var params = {fileType:fileType,
		        fileName:fileName,
		        formatType:"image",
		        companyId:companyId};
		var fn = function(data){//服务器成功响应处理函数
	      	if (data.success==true &&data.message=="上传成功") {  
	     		imgSrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+data.mongodbId;
	     		
				var creatDate = data.creatDate;
	     		var _newli="<li>"
							+"<div class='image_block_pic'>"
								+"<img src='"+imgSrc+"'/><input type='hidden' value='"+data.fileFormat+"'>"
								+"<div class='a_bg'></div>"
								+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='deluploadImg1(this,"+ data.fileId +")'>删除</a></div>"
							+"</div>"
							+"<div class='edit_div clearfix'>"
								+"<label title='"+ fileName +"'>"+ strVachar(fileName,23) +"</label><input type='text' class='edit_input' style='display:none' value='"+fileName+"'/>"
								+"<a href='javascript:void(0)' class='eidt' style='display:inline' onClick='editImgText(this)'>编辑</a>"
								+"<a href='javascript:void(0)' class='eidt_save'  style='display:none' onClick='saveImgText(this,"+data.fileId+")'>保存</a>"
							+"</div>"
						+"</li>";
				
				$(ul).prepend(_newli);
				//当前上传控件清空
				$(obj).val("");
	         }else{
	        	 window.wxc.xcConfirm(data.message);
	         }
		};
	    addInputUtilFile(fileurl,params,fileElementId,fn);
		
			/*$.ajaxFileUpload({
		     url: getwebroot()+"AccessApplicationCtrl/uploadAccessApplicationAttched.do",
		     data: {
		        fileType:fileType,
		        fileName:fileName,
		        formatType:"image",
		        companyId:companyId
		     },
		     fileElementId: fileElementId,//input type=file 的id
		     dataType: "json",
		     success: function (data, status){//服务器成功响应处理函数
		      	if (data.success==true &&data.message=="上传成功") {  
		     		imgSrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+data.mongodbId;
		     		
					var creatDate = data.creatDate;
		     		var _newli="<li>"
								+"<div class='image_block_pic'>"
									+"<img src='"+imgSrc+"'/><input type='hidden' value='"+data.fileFormat+"'>"
									+"<div class='a_bg'></div>"
									+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='deluploadImg1(this,"+ data.fileId +")'>删除</a></div>"
								+"</div>"
								+"<div class='edit_div clearfix'>"
									+"<label title='"+ fileName +"'>"+ strVachar(fileName,23) +"</label><input type='text' class='edit_input' style='display:none' value='"+fileName+"'/>"
									+"<a href='javascript:void(0)' class='eidt' style='display:inline' onClick='editImgText(this)'>编辑</a>"
									+"<a href='javascript:void(0)' class='eidt_save'  style='display:none' onClick='saveImgText(this,"+data.fileId+")'>保存</a>"
								+"</div>"
							+"</li>";
					
					$(ul).prepend(_newli);
					//当前上传控件清空
					$(obj).val("");
		         }else{
		        	 window.wxc.xcConfirm(data.message);
		         }
		     },
		     error:function(data, status){
		    	 window.wxc.xcConfirm("上传出错");
		     }
		});*/
	}
}
function showPic1(obj){
	var fileType,fileName,fileElementId;//文件类型,文件名字,文件上传inputId
	var isUpdate;//0 || null 增加,1 更新
	
	var defaultUploadImage = $(obj).prev().find("img").attr("src");
	if(defaultUploadImage == "/newresources/images/uploadImg.png"){
		isUpdate = 0;
	}else{
		isUpdate = 1;
	}
	
	if($(obj).attr("id") == "management_system_pic"){
		filename=$("#management_system_pic").val();
		fileElementId = "management_system_pic";
		fileType = 25;
	}
	
   	var fileStartIndex=filename.lastIndexOf("\\");// 反斜杠\ 需要转译
	var fileEndIndex=filename.lastIndexOf(".");
	//原始上传文件名称
	var origfilename=filename.substring(fileStartIndex+1,fileEndIndex);
   if(origfilename){
		var fileurl = "AccessApplicationCtrl/uploadAccessApplicationAttched.do";
		var params = {
		        fileType:fileType,
		        fileName:origfilename,
		        isUpdate:isUpdate,
		        formatType:"image",
		        companyId:companyId};
		var fn = function(data){//服务器成功响应处理函数
        	if (data.success==true &&data.message=="上传成功") {  
        		var newsrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+data.mongodbId;
        		if(fileType == 25){
        			$("#management_system").attr("src",newsrc);
        			var del="<div class='a_bg'></div>"
					+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delManagement_system1(this,"+ data.fileId +")'>删除</a></div>";
        			$("#management_system").append("<input type='hidden' value='"+data.fileFormat+"'>");
        			$("#management_system").parent().append(del);
        			$("#management_sys_tip").css("display","none");
        		}
            }else{
            	window.wxc.xcConfirm(data.message);
            }
		};
	    addInputUtilFile(fileurl,params,fileElementId,fn);
	   
	   
   	   /*$.ajaxFileUpload({
	        url: getwebroot()+"AccessApplicationCtrl/uploadAccessApplicationAttched.do",
	        data: {
		        fileType:fileType,
		        fileName:origfilename,
		        isUpdate:isUpdate,
		        formatType:"image",
		        companyId:companyId
	        },
	        fileElementId: fileElementId,//input type=file 的id
	        dataType: "json",
	        success: function (data, status){//服务器成功响应处理函数
	        	if (data.success==true &&data.message=="上传成功") {  
	        		var newsrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+data.mongodbId;
	        		if(fileType == 25){
	        			$("#management_system").attr("src",newsrc);
	        			var del="<div class='a_bg'></div>"
						+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delManagement_system1(this,"+ data.fileId +")'>删除</a></div>";
	        			$("#management_system").append("<input type='hidden' value='"+data.fileFormat+"'>");
	        			$("#management_system").parent().append(del);
	        			$("#management_sys_tip").css("display","none");
	        		}

	            }else{
	            	window.wxc.xcConfirm(data.message);
	            }
	        },
	        error:function(data, status){
	        	window.wxc.xcConfirm("上传出错");
	        }
	   });*/
	}        
}
//多张图片展示
function showMorePic2(fileTypeId){
	$.ajax({
		type:"POST",
		url:getwebroot() + "PfTaskFileCtrl/getTaskFileListForWindow.do",
		dataType:"json",
		data:{
			companyId:accepter_id,
			fileTypeId:fileTypeId
		},
		success:function(result){
			if(result.data != ""){
				for(var i=0; i<result.data.length; i++){
					var imgSrc = getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[i].mogodb_id;
					var filename = result.data[i].file_name;
					var creatDate = result.data[i].create_dt;
					var _newli="<li>"
						+"<div class='image_block_pic'>"
							+"<img src='"+imgSrc+"'/><input type='hidden' value='"+result.data[i].file_format+"'>"
							+"<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='deluploadImg2(this,"+ result.data[i].id +")'>删除</a></div>"
						+"</div>"
						+"<div class='edit_div clearfix'>"
							+"<label title='"+ filename +"'>"+ strVachar(filename,23)+"</label><input type='text' class='edit_input' style='display:none' value='"+filename+"'/>"
							+"<a href='javascript:void(0)' class='eidt' style='display:inline' onClick='editImgText(this,"+result.data[i].id+")'>编辑</a>"
							+"<a href='javascript:void(0)' class='eidt_save'  style='display:none' onClick='saveImgText(this,"+result.data[i].id+")'>保存</a>"
						+"</div>"
					+"</li>";
					
		     		if(fileTypeId == 24){
		     			$("#company_equipment_imgs").prepend(_newli);
		     		}else if(fileTypeId == 26){
		     			$("#patent_imgs").prepend(_newli);
		     		}else if(fileTypeId == 27){
		     			$("#other_intelligence_imgs").prepend(_newli);
		     		}
				}
			}
		},
		error:function(result){
		}
		});
}

//删除上传的图片对象
function deluploadImg2(obj,fileId){
	$(obj).parent().parent().parent().remove();
}
/*展示公司图片基本信息 mishengliang
 * 
 * fileTypeId 图片文件位置类型ID
 * picId 图片展示位置的img标签ID
 * */
function picPathSrc2(fileTypeId,picId){
	$.ajax({
		type:"POST",
		url:getwebroot() + "PfTaskFileCtrl/getTaskFileListForWindow.do",
		dataType:"json",
		data:{
			companyId:accepter_id,
			fileTypeId:fileTypeId
		},
		success:function(result){
			if(result.data != ""){
				$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
				var del="<div class='a_bg'></div>"
						+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delManagement_system2(this,"+ result.data[0].id +","+ fileTypeId +")'>删除</a></div>";
				$(picId).append("<input type='hidden' value='"+result.data[0].file_format+"'>");
		        $(picId).parent().append(del);
			}else{
				if(fileTypeId == 22){
					$(picId).attr("src","/newresources/images/uploadlogo.png");
				}else if(fileTypeId == 23){
					$(picId).attr("src","/newresources/images/uploadfigure.png");
				}else{
					$(picId).attr("src","/newresources/images/uploadImg.png");
				}
			}
		},
		error:function(result){
		}
	});
}
//删除管理体系图片对象 mishengliang   删除后替代的图片并不一致
function delManagement_system2(obj,fileId){
		var parentObj=$(obj).parent().parent();
		parentObj.find("img").attr("src","/newresources/images/uploadImg.png"); 						 
		$(obj).parent().css("display","none");
		$(obj).parent().prev().css("display","none");
}
//获取采购类目树
function getPurchaseCategory(){
	var url="purchaseCategory/getPurchaseCategoryTree2Json.do";
	var params={};
	var fn=function(result){
		var item="";
		for(var i=0;i<result.data.length;i++){
			if(result.data[i].children != null){
				item+='<li>'
					+'<span class="sort">'+result.data[i].text+'<input onclick="checkBoxEvent(this)" type="checkbox" class="ml10"/><input type="hidden" value="'+result.data[i].id+'"/><input type="hidden" value="-1"/></span>'
					+ietmMontage(result.data[i])
				+'</li>';
			}else{
				item+='<li>'
					+'<span style="display:inline-block;margin-left:16px;">'+result.data[i].text+'<input onclick="checkBoxEvent(this)" type="checkbox" class="ml10"/><input type="hidden" value="'+result.data[i].id+'"/><input type="hidden" value="-1"/></span>'
				+'</li>';
			}
		}
		$("#sortTree").html(item);
		$("#sortTree").treeview({
		  persist: "location",
		  collapsed: true,
		  unique: true
		 });
   	};
   	asyncAjaxMethod(url,params,true,fn);
}
function ietmMontage(data){
	var item="";
	if (data.children != null) {
		for (var j = 0; j < data.children.length; j++) {
			if(data.children[j].children != null){
				item+='<ul>'
					+'<li>'
						+'<span class="sort">'+data.children[j].text+'<input onclick="checkBoxEvent(this)" type="checkbox" class="ml10"/><input type="hidden" value="'+data.children[j].id+'"/><input type="hidden" value="-1"/></span>'
						+ietmMontage(data.children[j])
					+'</li>'
				+'</ul>';
			}else{
				item+='<ul>'
					+'<li>'
						+'<span style="display:inline-block;margin-left:16px;">'+data.children[j].text+'<input onclick="checkBoxEvent(this)" type="checkbox" class="ml10"/><input type="hidden" value="'+data.children[j].id+'"/><input type="hidden" value="-1"/></span>'
					+'</li>'
				+'</ul>';
			}
		}
		return item;
	}else{
		return "";
	}
}
/**
 * 勾选供应品类
 * checkBoxEvent
 * @param th void
 * @author yukai
 * 2016-9-14 下午2:22:39
 */
function checkBoxEvent(th){	   
		var str = "";
	    var len = 0;
		if($(th)[0].checked){
			$(th).parent().nextAll().find("input:checkbox").prop("indeterminate",false);
			$(th).parent().nextAll().find("input:checkbox").prop("checked","checked");
			var pCheckbox=$(th).parent().parent().parent().prevAll("span").find("input:checkbox");
			var cTotal=pCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox").length;
			var cChecked=pCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox:checked").length
			var cIndeterminate=0;
			pCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox").each(function(){
				if($(this)[0].indeterminate){
					cIndeterminate++;
				}
			});
			if(cTotal==cChecked){
				pCheckbox.prop("indeterminate",false);
				pCheckbox.prop("checked","checked");
			}else{
				pCheckbox.prop("indeterminate",true);
			}
			if(cChecked==0&&cIndeterminate==0){
				pCheckbox.prop("indeterminate",false);
				pCheckbox.prop("checked",false);
			}
			var ppCheckbox=$(th).parent().parent().parent().parent().parent().prevAll("span").find("input:checkbox");
			var ccTotal=ppCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox").length;
			var ccChecked=ppCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox:checked").length;
			var ccIndeterminate=0;
			ppCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox").each(function(){
				if($(this)[0].indeterminate){
					ccIndeterminate++;
				}
			});
			if(ccTotal==ccChecked){
				ppCheckbox.prop("indeterminate",false);
				ppCheckbox.prop("checked","checked");
			}else{
				ppCheckbox.prop("indeterminate",true);
			}
			if(ccChecked==0&&ccIndeterminate==0){
				ppCheckbox.prop("indeterminate",false);
				ppCheckbox.prop("checked",false);
			}
			$("#sortTree").children().each(function(){	
				var arr = [];
				$(this).find("input:checkbox").each(function(index,element){
					if($(this)[0].indeterminate||$(this)[0].checked){
						arr.push($(element).parent().text());
						var len=0;
						$(element).parent().nextAll("ul").find("input:checkbox").each(function(){
							if($(this)[0].indeterminate||$(this)[0].checked){
								len++;
							}
						});
						arr.push(len);	
					}
				});
				if(arr.length!=0){
					str = str+categoryStr(arr)+",";		
				}				
			});
			str = str.substring(0,str.length-1);
		}else{
			$(th).parent().nextAll().find("input:checkbox").prop("checked",false);
			$(th).parent().nextAll().find("input:checkbox").prop("indeterminate",false);
			var pCheckbox=$(th).parent().parent().parent().prevAll("span").find("input:checkbox");
			var cTotal=pCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox").length;
			var cChecked=pCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox:checked").length
			var cIndeterminate=0;
			pCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox").each(function(){
				if($(this)[0].indeterminate){
					cIndeterminate++;
				}
			});
			if(cTotal==cChecked){
				pCheckbox.prop("indeterminate",false);
				pCheckbox.prop("checked","checked");
			}else{
				pCheckbox.prop("checked",false);
				pCheckbox.prop("indeterminate",true);
			}
			if(cChecked==0&&cIndeterminate==0){
				pCheckbox.prop("indeterminate",false);
				pCheckbox.prop("checked",false);
			}
			var ppCheckbox=$(th).parent().parent().parent().parent().parent().prevAll("span").find("input:checkbox");
			var ccTotal=ppCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox").length;
			var ccChecked=ppCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox:checked").length;
			var ccIndeterminate=0;
			ppCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox").each(function(){
				if($(this)[0].indeterminate){
					ccIndeterminate++;
				}
			});
			if(ccTotal==ccChecked){
				ppCheckbox.prop("indeterminate",false);
				ppCheckbox.prop("checked","checked");
			}else{
				ppCheckbox.prop("checked",false);
				ppCheckbox.prop("indeterminate",true);
			}
			if(ccChecked==0&&ccIndeterminate==0){
				ppCheckbox.prop("indeterminate",false);
				ppCheckbox.prop("checked",false);
			}
			$("#sortTree").children().each(function(){	
				var arr = [];
				$(this).find("input:checkbox").each(function(index,element){
					if($(this)[0].indeterminate||$(this)[0].checked){
						arr.push($(element).parent().text());
						var len=0;
						$(element).parent().nextAll("ul").find("input:checkbox").each(function(){
							if($(this)[0].indeterminate||$(this)[0].checked){
								len++;
							}
						});
						arr.push(len);	
					}
				});
				if(arr.length!=0){
					str = str+categoryStr(arr)+",";		
				}				
			});
			str = str.substring(0,str.length-1);
		}
		$("#supplyCategory").html("<span>"+str+"</span>");
}
/**
 * 根据供应品类数组拼接字符串
 * categoryStr
 * @param arr
 * @returns {String} String
 * @author yukai
 * 2016-9-18 下午1:49:48
 */
function categoryStr(arr){
	var str = "";
	var num = 0;//第一层的计数
	var nsm = 0;//第二层的计数
	var nsmvo = 0;
	var numvo = 0;//
	for(var x in arr){
		if(x%2 == 0 ){
		str = str + arr[x];
		var count = parseInt(x)+1;
		if(num>0 && nsm == 0){
			nsm = parseInt(arr[count]);
			if(nsm != 0){
			nsmvo = parseInt(x) + nsm*2;
			}
			}
		if(num==0){
		    num = parseInt(arr[count]);
		    numvo = num*2;
		}				
		if(numvo==x && x> 2){
			if(nsmvo == x){				
				str = str +')';
			}
			str = str +')';
		}else{	
			if((parseInt(arr[count]))>0){
				str = str + '(';				
			}else if(x>0){ 
				if(nsmvo == x){	
					if( x> 2){
						str = str +'),';
					}else{
						str = str +')';
					}										
				}else{	
					if((parseInt(x)+2)==arr.length){	
					  str = str +')';
					}else{
				      str = str + ',';
					}
				}
			}
		}
      }
    }
	return str;
}

//获取审核意见
function getAuthOpinion(){
	var url="AccessApplicationCtrl/getAuthOpinions.do";
	var params={};
	params.record_id=record_id;
	params.audit_status=1;
	var item="";
	var fn = function(result){
		if(result.data){
			for(var i=0;i<result.data.length;i++){
				item+="审核时间："+result.data[i].create_dt+"&nbsp;审核结果：未通过，"+"&nbsp;审核意见："+result.data[i].audit_opinion+"&nbsp;<span class='ml85'>请修改后重新提交。</span><br/>";
			}
		}
	};
	asyncAjaxMethod(url,params,false,fn);
	return item;
}
//获取准入申请供应品类
function getPurchaseCategoryInfo(){
	var url="AccessApplicationCtrl/getAccessApplicationCategoryList.do";
	var params={};
	params.record_id=record_id;
	var fn = function(result){
		var str="";
		for(var i=0;i<result.data.length;i++){
			$("#sortTree").find("input:checkbox").each(function(){
				if(result.data[i].category_id==$(this).next().val()){
					$(this).prop("checked", true);
					$(this).next().next().val(result.data[i].id);
				}
			});
		}
		$("#sortTree").find("input:checkbox:checked").each(function(){
			var total=$(this).parent().nextAll("ul").find("input:checkbox").length;
			var checked=$(this).parent().nextAll("ul").find("input:checkbox:checked").length;
			if(total==checked){
			}else{
				$(this).prop("checked",false);
				$(this).prop("indeterminate",true);
			}
		});
		$("#sortTree").children().each(function(){	
			var arr = [];
			$(this).find("input:checkbox").each(function(index,element){
				if($(this)[0].indeterminate||$(this)[0].checked){
					arr.push($(element).parent().text());
					var len=0;
					$(element).parent().nextAll("ul").find("input:checkbox").each(function(){
						if($(this)[0].indeterminate||$(this)[0].checked){
							len++;
						}
					});
					arr.push(len);		
				}
			});
			if(arr.length!=0){
				str = str+categoryStr(arr)+",";		
			}			
		});
		str = str.substring(0,str.length-1);
		if(str!=""){
			$("#supplyCategory").html("<span>"+str+"</span>");
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
//变更基本信息
function updateCertification(){
	//var param={"companyIdForUpdate":accepter_id};
	//addParamsToWindowName(param);
	//window.location.href=getwebroot()+"usercenter/companyManage/updateCertification.html";
	var URIstring = getwebroot()+"supplierForPlateForm/updateCertification.htm?companyId="+accepter_id;
	var paraString = URIstring.substring(URIstring.indexOf("?")+1,URIstring.length); 
	var rul=URIstring.substring(0,URIstring.indexOf("?")+1)+escape(paraString);//对参数的处理
	window.open(rul);
}
/**
 * 获取表头名称
 * getTableName
 * @param h_id void
 * @author yukai
 * 2016-8-16 下午2:29:03
 */
function getTableName(){
	var url="AccessApplicationCtrl/getAccessTempletHead.do";
	var params={};
	params.h_id=h_id;
	var fn = function(result){
		$("#table_title").text(result.data[0].table_name);
	};
	asyncAjaxMethod(url,params,true,fn);
}
//全选
function select_all(checkbox_id,table_id){
	if($("#"+checkbox_id)[0].checked){    
        $("#"+table_id).find("tr:gt(0)").each(function(){
			$(this).find("td:eq(0)").children().prop("checked", true); 
		});   
    }else{    
        $("#"+table_id).find("tr:gt(0)").each(function(){
			$(this).find("td:eq(0)").children().prop("checked", false); 
		});
    }  
}
//单选
function select_single(checkbox_id,table_id) {	
	var chknum =  $('#'+table_id).find("tr:gt(0)").size();//选项总个数 
	var chk = 0;
	$('#'+table_id).find("tr:gt(0)").each(function() {
		if ($(this).find("td:eq(0)").children()[0].checked == true) {			
			chk++;		
		}
	});
	if (chknum == chk) {//全选 
		$('#'+checkbox_id).prop("checked", true);
	} else {//不全选 
		$('#'+checkbox_id).prop("checked", false);
	}
}

/**
 * 银行账号设为默认
 * setBankDefault
 * @param obj void
 * @author yukai
 * 2016-8-18 下午5:19:51
 */
function setBankDefault(obj){
	$("#bankTable").find("tr:gt(0)").each(function(){
		$(this).children().eq(5).find(".defaultAccount").replaceWith('<button class="setDefault hide" onclick="setBankDefault(this)">设为默认</button>');
	});
	$(obj).replaceWith('<button class="defaultAccount" disabled>默认账号</button>');
}
/**
 * 更新平台基础信息
 * updatePlatformInfo
 * @param params void
 * @author yukai
 * 2016-8-29 上午10:21:02
 */
function updatePlatformBaseInfo(params){
	var url = "supplierForPlateForm/updateSupplierInfoByCompanyId.do";
	params.companyId=accepter_id;
	var fn = function(result){
		if(result.success==true){
 		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 更新平台其他信息
 * updatePlatformOtherInfo
 * @param params void
 * @author yukai
 * 2016-8-29 上午10:30:20
 */
function updatePlatformOtherInfo(){
	var url = "AccessApplicationCtrl/updatePlatformOtherInfo.do";
	var params = {};
	params.companyId=accepter_id;
	params.goods=doGoods();
	params.material=doMaterial();
	params.competitor=doCompetitor();
	params.customer=doCustomer();
	params.devicelist=doDevicelist();
	var fn = function(result){
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 *跳转维护账号页面 
 * go_tradeInfo void
 * @author yukai
 * 2016-8-30 上午11:27:08
 */
function go_tradeInfo(){
	//var param ={"companyIdForAll":accepter_id};
	//addParamsToWindowName(param);
	//window.location.href=getwebroot()+"usercenter/tradeManage/tradeInfo.html";
	var URIstring = getwebroot()+"supplierForPlateForm/tradeInfo.htm?companyId="+accepter_id;
	var paraString = URIstring.substring(URIstring.indexOf("?")+1,URIstring.length); 
	var rul=URIstring.substring(0,URIstring.indexOf("?")+1)+escape(paraString);//对参数的处理
	window.open(rul);
}

/**准入申请，供应品类关闭
 * saveSortList void
 * @author wangjialin
 * 2016-9-1 下午2:03:24
 */
function closeSortList(){
	$(".addSupplySort").removeClass("addSupplySortFocus");
	$(".addSupplySort_main").hide();
}

function showSetDefault(e){
	$(e).find(".setDefault").show();
}
function hideSetDefault(e){
	$(e).find(".setDefault").hide();
}
/**
 * 获取准入通过的时间
 * getPassTime void
 * @author yukai
 * 2016-9-8 上午10:45:01
 */
function getPassTime(){
	var passTime="";
	var url = "AccessApplicationCtrl/getPassTime.do";
	var params = {};
	params.record_id=record_id;
	var fn = function(result){
		if(result.data){
			passTime=result.data;
		}
	};
	asyncAjaxMethod(url,params,false,fn);
	return passTime;
}