var companyId=getParamFromWindowName("companyIdForAll");
var companyIdForWindow=getParamFromWindowName("companyIdForWindow");
var currency;//币种信息
$(function(){
	loadCommonPage();//加载公共部分
	$(".midd_wrap").css({minHeight:$(window).height()-200});
	window.onresize=function(){$(".midd_wrap").css({minHeight:$(window).height()-200});};
	
	getBaseInfoForWindow();//基本信息展示
	picShow();//图片展示
	scroll();//增加轮播效果
	mouseOperates();
});

//加载公共部分
function loadCommonPage(){
	var result=isLoginForPlateForm();
	if(result.data!=null && result.data.vip==true){
		$("#top").load(getwebroot()+"vip/platform/vipTop.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#mainNav").children().eq(1).addClass("curr");
				getCompanyList(companyId);
				//companyId=$("#company").val();
				//getBaseInfoForWindow();//基本信息展示
			}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
	}else{
		$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#mainNav").children().eq(2).addClass("curr");
				getCompanyList(companyId);
				//companyId=$("#company").val();
				//getBaseInfoForWindow();//基本信息展示
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	}
}

/**
 * 地图展示
 */
function loadMap(){
	// 百度地图API功能
	var map = new BMap.Map("location_map");    // 创建Map实例
	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
	return map;
}

/**
 * 获取用户的基本信息数据，用于展示
 */
function getBaseInfoForWindow(){
	var url = "supplierForPlateForm/getCompanyInfoByCompanyIdForWindow.do";
	var params = {};
	params.companyId = companyIdForWindow;
	
	var isasync = false;
	var fn = function(result){
		var baseInfo = result.companyBaseInfo;
		var scoreList = result.scoreSummaryList;
		var goodsList = result.goodsList;
		var metarialList = result.metarialList;
		var customerList = result.customerList;
		var competitorList = result.competitorList;
		var deviceList = result.deviceList;
		
		currency = result.curList;//货币信息
		baseInfoShow(baseInfo);//基础信息
		goodsListShow(goodsList);//销售
		metarialListShow(metarialList);//原材料
		customerListShow(customerList);//主要客户
		competitorListShow(competitorList);//主要竞争对手
		deviceListShow(deviceList);//设备清单
		attachListShow();//附件资料
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

/**
 * 基础信息展示 mishengliang 2016-07-06
 * @param baseInfo 获取的基础信息数据
 */
function baseInfoShow(baseInfo){
	$("#company_name").html(baseInfo.cpyname_cn);
	$("#company_name_small").html(baseInfo.cpyname_cn);
	if(baseInfo.accessScore!=null&&baseInfo.accessScore!=''&&baseInfo.accessScore!='NaN'&&baseInfo.is_supplier != 0){
		$("#access_score").html(((baseInfo.accessScore)*10).toFixed(1));
		$("#access_score").parent().show();
	}
	$("#access_time").html(replaceNullOrStr(baseInfo.audit_dt));
	$("#access_time").parent().show();
	$("#certificationSystem").html(replaceNullOrStr(baseInfo.certification_system));
	$("#contactAddr").html(replaceNullOrStr(baseInfo.contact_addr));
	$("#contacts").html(replaceNullOrStr(baseInfo.contacts));
	
	$("#fPhone").find(".info").html(replaceNullOrStr(baseInfo.f_phone));
	$("#mPhone").find(".info").html(replaceNullOrStr(baseInfo.m_phone));
	$("#fax").find(".info").html(replaceNullOrStr(baseInfo.fax));
	$("#email").find(".info").html(replaceNullOrStr(baseInfo.email));
	
	$("#keyRemark").html(replaceNullOrStr(baseInfo.key_remark));
	$("#keyRemark").parents(".baseInfo_show_wrap").show();
	
	$("#corporation").html(replaceNullOrStr(baseInfo.corporation));
	$("#regFund").html(replaceNullOrStr(baseInfo.reg_fund));
	$("#regDate").html(replaceNullOrStr(baseInfo.reg_date));
	$("#regAddr").html(replaceNullOrStr(baseInfo.reg_addr));
	$("#companyIntroduction").html(replaceNullOrStr(baseInfo.company_introduction));
	$("#schoolCoop").html(replaceNullOrStr(baseInfo.school_coop));
	
	if(baseInfo.emplyees != 0){
		$("#emplyees").html(replaceNullOrStr(baseInfo.emplyees));
		$("#emplyees").parent().show();
	}
	if(baseInfo.college_num != 0){
		$("#collegeNum").html(baseInfo.college_num);
		$("#collegeNum").parent().show();
	}
	if(baseInfo.diploma_num != 0){
		$("#diplomaNum").html(baseInfo.diploma_num);
		$("#diplomaNum").parent().show();
	}
	if(baseInfo.diploma_down_num != 0){
		$("#diplomaDownNum").html(baseInfo.diploma_down_num);
		$("#diplomaDownNum").parent().show();
	}
	if(baseInfo.company_area != 0){
		$("#companyArea").html(replaceNullOrStr(baseInfo.company_area));
		$("#companyArea").parent().show();
	}
	$("#factoryArea").html(replaceNullOrStr(baseInfo.factory_area));
	$("#useBegintime").html(replaceNullOrStr(baseInfo.use_begintime));
	$("#useEndtime").html(replaceNullOrStr(baseInfo.use_endtime));
	if(baseInfo.turnover != 0){
		$("#turnover").html(replaceNullOrStr(baseInfo.turnover));
		$("#turnover").parent().next().html(getCurrency(baseInfo.turnover_currency_id));
		$("#turnover").parents(".employee_unit_show").show();
	}
	if(baseInfo.export_num != 0){
		$("#exportNum").html(replaceNullOrStr(baseInfo.export_num));
		$("#exportNum").parent().next().html(getCurrency(baseInfo.export_currency_id));
		$("#exportNum").parents(".employee_unit_show").show();
	}
	if(baseInfo.import_num != 0){
		$("#importNum").html(replaceNullOrStr(baseInfo.import_num));
		$("#importNum").parent().next().html(getCurrency(baseInfo.import_currency_id));
		$("#importNum").parents(".employee_unit_show").show();
	}
	
	if(baseInfo.apply_sts == 15){
		$("#cer_truth").css("display","inline");
	}
	
	var industryName = "";
	switch(baseInfo.industry_id){
		case "1": 
			industryName = "生产型";
			break;
		case "2": 
			industryName = "贸易型";
			break;
		case "3": 
			industryName = "服务型";
			break;
		case "4": 
			industryName = "其它机构";
			break;
		default:
			industryName = "暂无数据";
			break;
	}
	$("#industryName").html(industryName);
	
	var className = "暂无数据";
	for(classIndex in CompanyClassesUtil){
		if(CompanyClassesUtil[classIndex].class_id == baseInfo.class_id){
			className = CompanyClassesUtil[classIndex].class_name;
		}
	}
	$("#companyClassTop").html(className);
	$("#companyClassTop").parent().show();
	$("#companyClass").html(className);
	
	var natureName = "暂无数据";
	for(natureIndex in CompanyNaturesUtil){
		if(CompanyNaturesUtil[natureIndex].nature_id == baseInfo.nature_id){
			natureName = CompanyNaturesUtil[natureIndex].nature_name;
		}
	}
	$("#companyNature").html(natureName);
	
	var factoryOwner = "暂无数据";
	if(baseInfo.factory_owner == 1){
		factoryOwner = "租赁";
	}else if(baseInfo.factory_owner == 2){
		factoryOwner = "自建";
	}
	$("#factoryOwner").html(factoryOwner);
	
	var employeeTypeNum = 0;//员工类型总数
	var typeEmployeeNum = "";
	if(baseInfo.tech_num){typeEmployeeNum += "<div class='employee_unit_show'><span>研发人员</span><span><em>"+ baseInfo.tech_num +"</em>人</span></div>";employeeTypeNum++;}
	if(baseInfo.op_num){typeEmployeeNum += "<div class='employee_unit_show'><span>操作工</span><span><em>"+ baseInfo.op_num +"</em>人</span></div>";employeeTypeNum++;}
	if(baseInfo.qc_num){typeEmployeeNum += "<div class='employee_unit_show'><span>专职检验</span><span><em>"+ baseInfo.qc_num +"</em>人</span></div>";employeeTypeNum++;}
	if(baseInfo.staff_num){typeEmployeeNum += "<div class='employee_unit_show'><span>间接员工</span><span><em>"+ baseInfo.staff_num +"</em>人</span></div>";employeeTypeNum++;}
	if(baseInfo.internal_auditor_num){typeEmployeeNum += "<div class='employee_unit_show'><span>内审人员</span><span><em>"+ baseInfo.internal_auditor_num +"</em>人</span></div>";employeeTypeNum++;}
	if(employeeTypeNum > 0){
		$("#type_employee_num").html(typeEmployeeNum);
	}else{
		$("#type_employee_num").remove();
	}
	
	//加载地图定位
	var map = loadMap();
	map.centerAndZoom(new BMap.Point(baseInfo.lng, baseInfo.lat), 12);
	map.clearOverlays();
	var marker = new BMap.Marker(new BMap.Point(baseInfo.lng, baseInfo.lat)); // 创建点
	map.addOverlay(marker);
}

/**鼠标上移下移操作
 * mouseOperates void
 * @author wangjialin
 * 2016-9-23 下午1:57:50
 */
function mouseOperates(){
	$(".icon").mouseover(function(){
		$(this).parent(".information").find(".info").show();
	});
	$(".icon").mouseleave(function(){
		$(this).parent(".information").find(".info").hide();
	});
}

/**
 * 销售产品
 * mishengliang 2016-07-06
 * @param goodsList
 */
function goodsListShow(goodsList){
	var goodShow = "";
	if(typeof(goodsList) == "undefined"){//无返回
		$("#sale_product_show .next").remove();
		$("#sale_product_show .prev").remove();
		goodShow += "<li><img alt='暂无信息' src='/newresources/images/noInfo.png'></li>";
	}else if(goodsList.length == 0){//返回空值
		$("#sale_product_show .next").remove();
		$("#sale_product_show .prev").remove();
		goodShow += "<li><img alt='暂无信息' src='/newresources/images/noInfo.png'></li>";
	}else if(goodsList == null){//返回空值
		$("#sale_product_show .next").remove();
		$("#sale_product_show .prev").remove();
		goodShow += "<li><img alt='暂无信息' src='/newresources/images/noInfo.png'></li>";
	}else{
		if(goodsList.length <= 5){
			$("#sale_product_show .next").remove();
			$("#sale_product_show .prev").remove();
		}
		for(var i = 0; i < goodsList.length; i++){
			goodShow += "<li><div class='thing_name'>"+ goodsList[i].goods_name +"</div><div class='thing_brand'>"+ replaceNullAsStr(goodsList[i].goods_brand) +"</div></li>";
		}
	}
	$("#sale_product_show_wrap").html(goodShow);
}

/**
 * 原材料
 * @param metarialList
 */
function metarialListShow(metarialList){
	var metarialShow = "";
	if(typeof(metarialList) == "undefined"){//无返回
		$("#material_product_show .next").remove();
		$("#material_product_show .prev").remove();
		metarialShow += "<li><img alt='暂无信息' src='/newresources/images/noInfo.png'></li>";
	}else if(metarialList.length == 0 ){//返回空值
		$("#material_product_show .next").remove();
		$("#material_product_show .prev").remove();
		metarialShow += "<li><img alt='暂无信息' src='/newresources/images/noInfo.png'></li>";
	}else if(metarialList == null){//返回空值
		$("#material_product_show .next").remove();
		$("#material_product_show .prev").remove();
		metarialShow += "<li><img alt='暂无信息' src='/newresources/images/noInfo.png'></li>";
	}else{
		if(metarialList.length <= 5){
			$("#material_product_show .next").remove();
			$("#material_product_show .prev").remove();
		}
		for(var i = 0; i < metarialList.length; i++){
			metarialShow += "<li><div class='thing_name'>"+ metarialList[i].material_name +"</div><div class='thing_brand'>"+ replaceNullAsStr(metarialList[i].material_brand) +"</div></li>";
		}
	}
	$("#material_product_show_wrap").html(metarialShow);
}

/**
 * 点击公司的主要客户和竞争对手的触发事件
 * @param index
 */
function companyLinkSelect(index){
	$(".company_link_select ul").children(".curr").removeClass("curr");
	$(".company_link_select ul").children().eq(index).addClass("curr");
	if(index == 0){
		$("#main_customer").css("display","block");
		$("#main_competitor").css("display","none");
	}else if(index == 1){
		$("#main_customer").css("display","none");
		$("#main_competitor").css("display","block");
	}
}

/**
 * 主要客户
 * @param customerList
 */
function customerListShow(customerList){
	var customerShow = "";
	if(customerList.length == 0){//无返回
		$("#main_customer .next").remove();
		$("#main_customer .prev").remove();
		customerShow += "<li>"
							+"<div class='company_link_logo'><img alt='coustomer.png' src='/newresources/images/coustomer.png'></div>"
							+"<div class='company_link_show_unit'>"
								+"<div class='grey_color'>主要客户</div>"
								+"<div>暂无信息</div>"
							+"</div>"
						+"</li>"
						+"<li>"
							+"<div class='company_link_logo'><img alt='coustomer.png' src='/newresources/images/coustomer.png'></div>"
							+"<div class='company_link_show_unit'>"
								+"<div class='grey_color'>主要客户</div>"
								+"<div>暂无信息</div>"
							+"</div>"
						+"</li>"
						+"<li>"
							+"<div class='company_link_logo'><img alt='coustomer.png' src='/newresources/images/coustomer.png'></div>"
							+"<div class='company_link_show_unit'>"
								+"<div class='grey_color'>主要客户</div>"
								+"<div>暂无信息</div>"
							+"</div>"
						+"</li>";
	}else{
		if(customerList.length <= 3){
			$("#main_customer .next").remove();
			$("#main_customer .prev").remove();
		}
		for(var i = 0; i < (customerList.length>3 ? customerList.length:3); i++){
			var cusString = "";
			if(typeof(customerList[i]) != "undefined"){
				cusString = "<div>"+ customerList[i].customer_name +"</div>";
			}else{
				cusString = "<div>暂无信息</div>";
			}
			customerShow += "<li>"
								+"<div class='company_link_logo'><img alt='coustomer.png' src='/newresources/images/coustomer.png'></div>"
								+"<div class='company_link_show_unit'>"
									+"<div class='grey_color'>主要客户</div>"
									+cusString
								+"</div>"
							+"</li>";
		}
	}
	$("#main_customer_show_wrap").html(customerShow);
}

/**
 * 主要竞争对手
 * @param competitorList
 */
function competitorListShow(competitorList){
	var competitorShow = "";
	if(competitorList.length == 0){//无返回
		$("#main_competitor .next").remove();
		$("#main_competitor .prev").remove();
		competitorShow += "<li>"
							+"<div class='company_link_logo'><img alt='coustomer.png' src='/newresources/images/competitor.png'></div>"
							+"<div class='company_link_show_unit'>"
								+"<div class='grey_color'>主要竞争对手</div>"
								+"<div>暂无信息</div>"
							+"</div>"
						+"</li>"
						+"<li>"
							+"<div class='company_link_logo'><img alt='coustomer.png' src='/newresources/images/competitor.png'></div>"
							+"<div class='company_link_show_unit'>"
								+"<div class='grey_color'>主要竞争对手</div>"
								+"<div>暂无信息</div>"
							+"</div>"
						+"</li>"
						+"<li>"
							+"<div class='company_link_logo'><img alt='coustomer.png' src='/newresources/images/competitor.png'></div>"
							+"<div class='company_link_show_unit'>"
								+"<div class='grey_color'>主要竞争对手</div>"
								+"<div>暂无信息</div>"
							+"</div>"
						+"</li>";
	}else{
		if(competitorList.length <= 3){
			$("#main_competitor .next").remove();
			$("#main_competitor .prev").remove();
		}
		for(var i = 0; i < competitorList.length; i++){
			competitorShow += "<li>"
								+"<div class='company_link_logo'><img alt='coustomer.png' src='/newresources/images/competitor.png'></div>"
								+"<div class='company_link_show_unit'>"
									+"<div class='grey_color'>主要竞争对手</div>"
									+"<div>"+ competitorList[i].competitor_name +"</div>"
								+"</div>"
							+"</li>";
		}
	}
	$("#main_competitor_show_wrap").html(competitorShow);	
}

/**
 * 设备展示
 * @param deviceList
 */
function deviceListShow(deviceList){
	var deviceShow = "";
	if(typeof(deviceList) == "undefined"){//无返回
		$("#divice_list_show_wrap .next").remove();
		$("#divice_list_show_wrap .prev").remove();
		deviceShow = "<li>"
						+"<div class='device_name'>暂无信息</div>"
						+"<div class='device_num'><span class='orangeColor'>*</span>台</div>"
						+"<div class='device_more_info'>"
							+"<div class='more_info_title_wrap mt8'><span class='device_standard_title height40'>型号：</span><span></span></div>"
							+"<div class='more_info_title_wrap'><span class='device_standard_title'>产地：</span><span></span></div>"
							+"<div class='more_info_title_wrap'><span class='device_standard_title'>价值：</span><span></span></div>"
							+"<div class='more_info_title_wrap'><span class='device_standard_title'>先进性：</span><span></span></div>"
						+"</div> "
					+"</li>";
	}else if(deviceList.length == 0){//返回空值
		$("#divice_list_show_wrap .next").remove();
		$("#divice_list_show_wrap .prev").remove();
		deviceShow = "<li>"
						+"<div class='device_name'>暂无信息</div>"
						+"<div class='device_num'><span class='orangeColor'>*</span>台</div>"
						+"<div class='device_more_info'>"
							+"<div class='more_info_title_wrap mt8'><span class='device_standard_title height40'>型号：</span><span></span></div>"
							+"<div class='more_info_title_wrap'><span class='device_standard_title'>产地：</span><span></span></div>"
							+"<div class='more_info_title_wrap'><span class='device_standard_title'>价值：</span><span></span></div>"
							+"<div class='more_info_title_wrap'><span class='device_standard_title'>先进性：</span><span></span></div>"
						+"</div> "
					+"</li>";
	}else if(deviceList == null){//返回空值
		$("#divice_list_show_wrap .next").remove();
		$("#divice_list_show_wrap .prev").remove();
		deviceShow = "<li>"
						+"<div class='device_name'>暂无信息</div>"
						+"<div class='device_num'><span class='orangeColor'>*</span>台</div>"
						+"<div class='device_more_info'>"
							+"<div class='more_info_title_wrap mt8'><span class='device_standard_title height40'>型号：</span><span></span></div>"
							+"<div class='more_info_title_wrap'><span class='device_standard_title'>产地：</span><span></span></div>"
							+"<div class='more_info_title_wrap'><span class='device_standard_title'>价值：</span><span></span></div>"
							+"<div class='more_info_title_wrap'><span class='device_standard_title'>先进性：</span><span></span></div>"
						+"</div> "
					+"</li>";
	}else{
		if(deviceList.length <= 4){
			$("#divice_list_show_wrap .next").remove();
			$("#divice_list_show_wrap .prev").remove();
		}
		for(var i = 0; i < deviceList.length; i++){
			deviceShow += "<li>"
								+"<div class='device_name'>"+ deviceList[i].device_name +"</div>"
								+"<div class='device_num'><span class='orangeColor'>"+ deviceList[i].device_num +"</span>台</div>"
								+"<div class='device_more_info'>"
									+"<div class='more_info_title_wrap mt8'><span class='device_standard_title height40'>型号：</span><span>"+ replaceNullAsStr(deviceList[i].specifications) +"</span></div>"
									+"<div class='more_info_title_wrap'><span class='device_standard_title'>产地：</span><span>"+ replaceNullAsStr(deviceList[i].place) +"</span></div>"
									+"<div class='more_info_title_wrap'><span class='device_standard_title'>价值：</span><span>"+ replaceNullAsStr(deviceList[i].price) +"</span></div>"
									+"<div class='more_info_title_wrap'><span class='device_standard_title'>先进性：</span><span>"+ replaceNullAsStr(deviceList[i].advanced) +"</span></div>"
								+"</div> "
							+"</li>";
		}
	}
	$("#divice_list_show_warp").html(deviceShow);
}

/**
 * 文档展示
 */
function attachListShow(){
	var url = "PfTaskFileCtrl/getTaskFileListForWindow.do";
	var params = {};
	params.fileTypeId = 30;//文件类型编号
	params.companyId = companyIdForWindow;
	
	var isasync = false;
	var fn = function(result){
		var data = result.data;
		var attachList = "";
		if(data == null){
			$("#company_attached_warp .next").remove();
			$("#company_attached_warp .prev").remove();
			attachList += "<li class='attached_unit'>"
				+"<div class='attached_logo'><img alt='' src='/newresources/images/attached_logo.png'></div>"
				+"<div class='attached_name_time'>"
					+"<div class='attached_name' title=''>暂无文件</div>"
					+"<div class='attached_time'>00-00-00</div>"
				+"</div>"
			+"</li>";
		}else{
			if(data.length <= 4){
				$("#company_attached_warp .next").remove();
				$("#company_attached_warp .prev").remove();
			}
			for(var i=0; i<data.length; i++){
				attachList += "<li class='attached_unit' onclick='downLoadFile(\""+ data[i].mogodb_id +"\")'>"
									+"<div class='attached_logo'><img alt='' src='/newresources/images/attached_logo.png'></div>"
									+"<div class='attached_name_time'>"
										+"<div class='attached_name' title=''>"+ data[i].file_name +"</div>"
										+"<div class='attached_time'>"+ data[i].create_dt +"</div>"
									+"</div>"
								+"</li>";
			}
		}
		$("#company_attached_show_warp").html(attachList);
	};		
	asyncAjaxMethod(url,params,isasync,fn);	
}

function downLoadFile(mogodbId){
	window.open(getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+mogodbId);
}

/**
 * 图片展示
 * 1.企业证照
 * 2.厂容厂貌
 */
function picShow(){
	//企业证照
	var licenseNum = 0;
	var companyLicense = "";
	var companyLicenseName = "";
	for(var i = 18; i <= 21; i++){
		var url = "PfTaskFileCtrl/getTaskFileListForWindow.do";
		var params = {};
		params.companyId = companyIdForWindow;
		params.fileTypeId = i;
		
		switch(i){
			case 18:
				companyLicenseName = "营业执照";
				break;
			case 19:
				companyLicenseName = "税务登记";
				break;
			case 20:
				companyLicenseName = "组织机构";
				break;
			case 21:
				companyLicenseName = "纳税人资格证书";
				break;
		}
		
		var isasync = false;
		var fn = function(result){
			if(result.data != ""){
				licenseNum++;
				companyLicense += "<li>"
									+"<img onClick='companyImgView("+i+","+result.data[0].id+")' alt='' src='"+ getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id +"'>"
									+"<div class='pic_info_tip'><span class='ml10'>"+ companyLicenseName +"</span></div>"
								  +"</li>";
			}
		};
		asyncAjaxMethod(url,params,isasync,fn);
	}
	if(licenseNum < 2){
		$("#company_license_right").remove();
		$("#company_license_left").remove();
	}
	$("#company_license_show_wrap").html(companyLicense);
	
	//厂容厂貌
	var factoryPic = "";
	var urlForFactoryPic = "PfTaskFileCtrl/getTaskFileListForWindow.do";
	var paramsForFactoryPic = {};
	paramsForFactoryPic.companyId = companyIdForWindow;
	paramsForFactoryPic.fileTypeId = 24;
	
	var isasyncForFactoryPic = false;
	var fnForFactoryPic = function(result){
		if(result.data != ""){
			for(var i=0; i<result.data.length; i++){
				factoryPic += "<li><img onClick='companyImgView(24,"+result.data[i].id+")' alt='' src='"+ getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[i].mogodb_id +"'></li>";
			}
		}
		
		if(result.data.length < 5){
			$("#factory_pic_right").remove();
			$("#factory_pic_left").remove();
		}
		if(result.data.length > 0){$(".factory_pic_wrap").show();}
		$("#factory_pic_show_wrap").html(factoryPic);
	};
	asyncAjaxMethod(urlForFactoryPic,paramsForFactoryPic,isasyncForFactoryPic,fnForFactoryPic);
	
	//企业形象图
	var urlForCompanyFace = "PfTaskFileCtrl/getTaskFileListForWindow.do";
	var paramsForCompanyFace = {};
	paramsForCompanyFace.companyId = companyIdForWindow;
	paramsForCompanyFace.fileTypeId = 23;
	
	var isasyncForCompanyFace = false;
	var fnForCompanyFace = function(result){
		if(result.data != ""){
			$("#companyFace img").attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
		}else{
			$("#companyFace img").attr("src","/newresources/images/companyFace.png");
		}
		$("#factory_pic_show_wrap").html(factoryPic);
	};
	asyncAjaxMethod(urlForCompanyFace,paramsForCompanyFace,isasyncForCompanyFace,fnForCompanyFace);
	
	//企业形象图
	var urlForCompanyLogo = "PfTaskFileCtrl/getTaskFileListForWindow.do";
	var paramsForCompanyLogo = {};
	paramsForCompanyLogo.companyId = companyIdForWindow;
	paramsForCompanyLogo.fileTypeId = 22;
	
	var fnForCompanyLogo = function(result){
		if(result.data != ""){
			$("#companyLogo").append("<img src='" + getwebroot() + "PfTaskFileCtrl/downLoadFileFormMongo.do?fileId=" + result.data[0].mogodb_id +"' alt='companyLogo.jpg'>");
		}
	};
	asyncAjaxMethod(urlForCompanyLogo,paramsForCompanyLogo,false,fnForCompanyLogo);
}

/**
 * 轮播效果效果集合
 */
function scroll(){
	scrollUnit($("#company_license"),1);
	scrollUnit($("#sale_product_show"),5);
	scrollUnit($("#material_product_show"),5);
	scrollUnit($("#main_customer"),3);
	scrollUnit($("#main_competitor"),3);
	scrollUnit($("#divice_list_show_wrap"),5);
	scrollUnit($("#company_attached_warp"),4);
	scrollUnit($("#factory_pic_show"),4);
}

/**
 * mishengliang 20160701
 * 滚动元素效果实现
 * @param $moveObj  当前操作对象
 * @param viewNum   每次显示的单元数
 */
function scrollUnit($moveObj,viewNum){
	var tempLength = 0; //临时变量,当前移动的长度
	var moveNum = 1; //每次移动的数量
	var moveTime = 300; //移动速度,毫秒
	var scrollDiv;
	var scrollItems;
	var moveLength;
	var countLength;
	
	scrollDiv = $moveObj.find(".items ul"); //进行移动动画的容器
	scrollItems = $moveObj.find(".items ul li"); //移动容器里的集合
	var unitLeftBorder = parseInt(scrollItems.eq(0).css("border-left-width"));
	var unitRightBorder = parseInt(scrollItems.eq(0).css("border-right-width"));
	if(isNaN(unitLeftBorder)){unitLeftBorder=0;}//兼容IE8
	if(isNaN(unitRightBorder)){unitRightBorder=0;}//兼容IE8
	var unitWidth = scrollItems.eq(0).width() + unitLeftBorder + unitRightBorder;//单位长度
	
	moveLength = unitWidth * moveNum; //计算每次移动的长度
	countLength = (scrollItems.length - viewNum) * unitWidth; //计算图片展示多出来的总长度,（总个数-看到个数）*单个长度
	$moveObj.find(".items ul").width(scrollItems.length* (unitWidth));
	//下一张
	$moveObj.find(".next").bind("click",function(){
		if(tempLength < countLength){
			if((countLength - tempLength) > moveLength){
				scrollDiv.animate({left:"-=" + moveLength + "px"}, moveTime);
				tempLength += moveLength;
			}else{
				scrollDiv.animate({left:"-=" + (countLength - tempLength) + "px"}, moveTime);
				tempLength += (countLength - tempLength);
			}
		}
		if(tempLength == countLength){//移动到最末端
			$(this).css("display","none");
		}
		$(this).parent().find(".prev").removeAttr("style");//向后移动，则取消前不显示效果
	});
	//上一张
	$moveObj.find(".prev").bind("click",function(){
		if(tempLength > 0){
			if(tempLength > moveLength){
				scrollDiv.animate({left: "+=" + moveLength + "px"}, moveTime);
				tempLength -= moveLength;
			}else{
				scrollDiv.animate({left: "+=" + tempLength + "px"}, moveTime);
				tempLength = 0;
			}
		}
		if(tempLength == 0){
			$(this).css("display","none");
		}
		$(this).parent().find(".next").removeAttr("style");//向后移动，则取消前不显示效果
	});
}
 /**
 * 预览图的显示
 */
function companyImgView(file_type,tf_id){
	var URIstring = getwebroot()+"PfTaskFileCtrl/companyImageView.htm?companyId="+companyIdForWindow+"&file="+"&#*"+"&&file_type="+file_type+"&&tf_id="+tf_id+"";
		var paraString = URIstring.substring(URIstring.indexOf("?")+1,URIstring.length); 
		var rul=URIstring.substring(0,URIstring.indexOf("?")+1)+escape(paraString);//对参数的处理
		window.open(rul);
}

/**
 * replaceNullOrStr
 * @param obj
 * @returns "暂无信息" : obj
 * @author mishengliang
 * 2016-9-9 上午9:34:46
 */
function replaceNullOrStr(obj){
	if(obj==null){
		return "暂无信息";
	}else if(obj==""){
		return "暂无信息";
	}else{
		return obj;
	}
};

/**
 * 获取指定币种
 * getCurrency
 * @param curId
 * @returns any
 * @author mishengliang
 * 2016-9-9 下午3:25:32
 */
function getCurrency(curId){
	for(var i in currency){
		if(currency[i].currency_id == curId){
			return currency[i].currency_name;
		}
	}
	return "";
}