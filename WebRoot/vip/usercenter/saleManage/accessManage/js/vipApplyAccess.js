var delFileIds=[];//储存要删除的附件ID
var currencys={};
var province={};
var city={};
var country={};
var isUpdate=0;//0 || null 增加,1 更新
var bankAccount_delIds = new Array();//银行账号要删除的Id
var invoiceTitle_delIds = new Array();//抬头发票要删除的Id
var goods_delIds = new Array();//销售产品要删除的Id
var material_delIds = new Array();//原材料要删除的Id
var competitor_delIds = new Array();//竞争对手要删除的Id
var customer_delIds = new Array();//客户要删除的Id
var deviceIds = new Array();//抬头发票要删除的Id
var map;
var lngForAll;//公司经度
var latForAll;//公司纬度
var phone_reg= /^((\+?86)|(\(\+86\)))?\d{3,4}-\d{7,8}(-\d{3,4})?$/;
var mphone_reg=/^1[3|4|5|8]\d{9}$/;
var email_reg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
//数字正则
var num_reg=/^(\d+(\.\d+)?)?$/;
//整数正则
var int_reg=/^\d*$/;
//银行卡号16位或者19位正则
var bankcard_reg = /^(\d{16}|\d{19})$/;
//地址选择
var company_province_city_distinct_flag = false;
var companyId=getParamFromWindowName("companyIdForCertification");//公司ID
var isMenuClicked=true;
$(function(){
	if(companyId == undefined){
		go_redirect("saleCenterCtrl/saleCenter.htm");
	}
	loadCommonPage();
	$(".midd_wrap").css({minHeight:$(window).height()-200});
	$(".midd_left_wrap").css({minHeight:$(window).height()-300});
	$(".midd_right_wrap").css({minHeight:$(window).height()-200});
	
	window.onresize=function(){
		$(".midd_wrap").css({minHeight:$(window).height()-200});
		$(".midd_left_wrap").css({minHeight:$(window).height()-300});
		$(".midd_right_wrap").css({minHeight:$(window).height()-200});
	};
	
	loadDefalutData();//静态数据加载<币种、企业类型、所属行业、省市区>
	getBaseInfo();//获取基本信息及加载
	onBlurTest();
	setMenuActive();
	$(window).load(function(){
		  $("body,html").scrollTop(0);
	});
	$("#sortSelect .first,.second,.third").mCustomScrollbar({
		scrollButtons:{enable:true},
		theme:"minimal-dark"
	});
	if(sessionStorage.getItem("categoryLevel1")==null){
		var categoryLevel1,categoryLevel2,categoryLevel3;
		var a=getSortByFid(0);
		var b=getSortByFid(a[0].category_id);
		categoryLevel1=JSON.stringify(a);
		categoryLevel2=JSON.stringify(b);
		categoryLevel3=JSON.stringify(getSortByFid(b[0].category_id));
		sessionStorage.setItem("categoryLevel1",categoryLevel1);
		sessionStorage.setItem("categoryLevel2",categoryLevel2);
		sessionStorage.setItem("categoryLevel3",categoryLevel3);
	}
});

//加载公用部分界面，如同步，底部，左侧菜单等
function loadCommonPage(){
	$("#top_vip_apply").load(getwebroot()+"vip/platform/vipTop.html",null,function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success")
		{
			$("#mainNav").children().eq(0).addClass("curr");
			getCompanyList(companyId);
			$(".logo_right_wrap").hide();
		}
	});
	$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
}

/**
 * 静态数据加载<币种、企业类型、所属行业、省市区>
 * loadDefalutData
 * @author mishengliang
 * 2016-10-18 下午2:38:09
 */
function loadDefalutData(){
	/**
	 * input框选择中高亮
	 */
	$(".inputWrap ,.inputWrap2,.inputWrap3,.inputWrap4,.inputWrap5").click(function(){
		$(this).addClass("input_select_wrap");
	});
	$(".inputWrap,.inputWrap2,.inputWrap3,.inputWrap4,.inputWrap5").on("blur",function(){
		$(this).removeClass("input_select_wrap");
	});
	
	//币种
	currencys=CurrencysUtil;
	$.each(currencys,function(index,c){
		var option="<li value='"+c.currency_id+"' onclick='selectOption(this)'>"+c.currency_name+"</li>";
		$(".moneyTypeList").append(option);
	});
	//企业类型
	companyNatures=CompanyNaturesUtil;
	$.each(companyNatures,function(index,c){
		var option="<li value='"+c.nature_id+"' onclick='selectOption(this)'>"+c.nature_name+"</li>";
		$(".companyTypeList").append(option);
	});
	//所属行业
	companyClasses=CompanyClassesUtil;
	$.each(companyClasses,function(index,c){
		var option="<li value='"+c.class_id+"' onclick='selectOption(this)'>"+c.class_name+"</li>";
		$(".industryList").append(option);
	});
	//加载省
	province=ChineseDistricts[86];
	$.each(province,function(code,address){
		var option="<li value='"+code+"' onclick='addressSelect(this,1)' >"+address+"</li>";
		$(".province").append(option);
	});
	checkLen(".companyIntroduce .introduce");
	checkLen(".cooperationIntroduce .introduce");
}

/**
 * 获取当前vip的准入申请状态
 * getStatueMap
 * @returns any
 * @author mishengliang
 * 2016-11-21 上午9:35:24
 */
function getStatueMap(){
	var statueMap;
	var url = "supplierForPlateForm/getStatueMap.do";
	var params = {};
	params.companyId = companyId;
	var fn = function(result){//无操作
		statueMap = result.statueMap;
	};
	asyncAjaxMethod(url,params,false,fn);
	return statueMap;
}

/**
 * 准入申请按钮状态显示
 * statueShow
 * @param statueMap void
 * @author mishengliang
 * 2016-11-21 上午9:56:46
 */
function statueShow(statueMap){
		if(statueMap == undefined || statueMap.access_status == 0){
 			//无操作；
 			$(".forRead").css("display","none");
 			$(".forEdit").css("display","block");
 			$("#submit_btn").show();
 			$(".form_tip").show();
 		}else if(statueMap.access_status == 1){//无数据；0:未填写；1：已保存；
 			$("#crrent_status").html("待提交");
 			$("#crrent_status").parent().css("display","block");
 			$("#submit_btn").show();
 			$(".form_tip").show();
 		}else if(statueMap.access_status == 2){//已提交
 			//禁用按钮
 			$("#crrent_status").html("已提交").css("color","#365c87");
 			$("#crrent_status").parent().css("display","block");
 			$(".con .main .edit,.con .main .save").css({
 				border:"0px solid #000",
 				background:"#f7f7f7",
 				color:"#999"
 			}); 
 			$(".con .main .edit,.con .main .save").prop("disabled",true);
 			$("#submit_btn").css({
 				background:"#e6e6e6",
 				color:"#999"
 			}).html("已提交审核");
 			$("#submit_btn").prop("onclick",null).off("click").show();
 			$(".form_tip").show();
 			$("#submit_time").html(statueMap.orderby_dt);
 			$("#submit_time_wrap").show();
 			$(".title .rightnow").html("");
 			
 			$(".form_tip .tipName span:first").html("所需材料：");
 			$(".form_tip .tipName span:last").html("");
 			$(".form_tip .tipList div:first").html("1.营业执照（照片）；税务登记证（照片）；组织机构代码证（照片）；纳税人资格证书（照片）；");
 			$(".form_tip .tipList div:last").html("2.设备清单，银行账户信息及发票信息。");
 			$(".form_tip").css("color","#365c87");
 		}else if(statueMap.access_status == 3){//已通过
 			//跳转到中心页面  不会进来这里
 			go_redirect("saleCenterCtrl/saleCenter.htm");
 		}else if(statueMap.access_status == 4){//未通过
 			//显示未通过原因
 			$("#crrent_status").html("未通过审核").addClass("redcolor");
 			$("#crrent_status").parent().css("display","block");
 			$(".form_tip .tipName span:first").html("审核时间：");
 			$(".form_tip .tipName span:last").html("未通过原因：");
 			$(".form_tip .tipList div:first").html(statueMap.create_dt);
 			$(".form_tip .tipList div:last").html(statueMap.audit_opinion);
 			$(".form_tip").show().css("color","red");
 			$("#submit_time").html(statueMap.orderby_dt);
 			$("#submit_time_wrap").show();
 			$("#submit_btn").show();
 			$(".con .main .edit,.con .main .save").prop("disabled",false);
 		}
}

/**
 * 已有的信息展示
 * getBaseInfo void
 * @author mishengliang
 * 2016-10-18 下午2:42:47
 */
function getBaseInfo(){
	//加载百度地图API
	remarkMap();
	var url = "supplierForPlateForm/getCompanyInfoByCompanyId1.do";
	var params = {};
	params.companyId=companyId;
	params.isVip="isVip";
	var isasync = true;
	var fn = function(result){
		if(result.success){
			companyData = result.data;
	 		var companyBaseInfo = companyData.companyBaseInfo;//公司基础信息 
	 		var compnayExtraInfo = companyData.compnayExtraInfo;//公司附加信息
	 		var statueMap = companyData.statueMap;//审核状态
	 		statueShow(statueMap);//对应的状态，按钮展示
	 		
	 		allPicShow();//编辑图片显示
	 		allPicShowForRead();//只读图片显示
	 		showBaseInfo(companyBaseInfo);//基本信息展示
	 		showTradeInfo(compnayExtraInfo);//交易信息展示
	 		showLinkedInfo(companyBaseInfo);//联系信息展示
	 		showProductInfo(companyData);//联系信息展示
	 		showWinInfo(companyBaseInfo);//门户信息展示
	 		showScaleInfo(companyBaseInfo);//规模能力展示
	 		showDeviceInfo(companyData);//设备清单
	 		showSchoolCoopInfo(companyBaseInfo);//院校合作
	 		showCertInfo(companyBaseInfo);//资质证书展示
		}
	};
	asyncAjaxMethod(url,params,isasync,fn);	
}

/**
 * 提交之前需要将多行的数据重新更新一下
 * showSubmitBeforeInfo 
 * @author mishengliang
 * 2016-11-10 下午1:19:37
 */
function showSubmitBeforeInfo(){
	var url = "supplierForPlateForm/showSubmitBeforeInfo.do";
	var params = {};
	params.companyId=companyId;
	params.isVip="isVip";
	var isasync = true;
	var fn = function(result){
		if(result.success){
			companyData = result.data;
			var compnayExtraInfo = companyData.compnayExtraInfo;//公司附加信息
			showTradeInfo(compnayExtraInfo);//交易信息展示
			showProductInfo(companyData);//联系信息展示
			showDeviceInfo(companyData);//设备清单
		}
	};
	asyncAjaxMethod(url,params,isasync,fn);	
}

/**
 * 基本信息展示
 * showBaseInfo 
 * @param companyBaseInfo void
 * @author mishengliang
 * 2016-11-1 下午1:24:00
 */
function showBaseInfo(companyBaseInfo){
	$("#companyNameForEdit").val(companyBaseInfo.cpyname_cn);//企业名称
 	$("#companyNameForRead").html(companyBaseInfo.cpyname_cn);//企业名称
 	$("#key_remark").val(companyBaseInfo.key_remark);//主营业务
 	if(companyBaseInfo.key_remark == null){
 		$("#keyRemarkForRead").find(".noinfo").show();
 	}else{
 		$("#keyRemarkForRead").html(companyBaseInfo.key_remark);//主营业务
 	}
 	$("#corporation").val(companyBaseInfo.corporation);//法人代表
 	if(companyBaseInfo.corporation == null){
 		$("#corporationForRead").find(".noinfo").show();
 	}else{
 		$("#corporationForRead").html(companyBaseInfo.corporation);//法人代表
 	}
 	$("#reg_fund").val(companyBaseInfo.reg_fund);//注册资本
 	if(companyBaseInfo.reg_fund == null){
 		$("#regFundForRead").parents(".span_con").find(".noinfo").show();
 	}else{
 		$("#regFundForRead").parent(".dataForReg").show();
 		$("#regFundForRead").html(companyBaseInfo.reg_fund);//注册资本
 	}
 	$("#establish_dt").val(showBeforeOfDateStr(companyBaseInfo.establish_dt));//成立日期
 	if(companyBaseInfo.establish_dt == null){
 		$("#establishDtForRead").find(".noinfo").show();
 	}else{
 		$("#establishDtForRead").html(showBeforeOfDateStr(companyBaseInfo.establish_dt));//成立日期
 	}
 	if(companyBaseInfo.nature_id!=null){//加载企业类型
 		$("#companyTypeList").find("li[value="+ companyBaseInfo.nature_id +"]").trigger("click");
 		$("#companyTypeForRead").html($("#companyTypeList").find("li[value="+ companyBaseInfo.nature_id +"]").text()); 
 	}else{
 		$("#companyTypeForRead").find(".noinfo").show();
 	}
 	if(companyBaseInfo.class_id!=null){//加载所属行业
 		$(".industryList").find("li[value="+ companyBaseInfo.class_id +"]").trigger("click");
 		$("#classForRead").html($(".industryList").find("li[value="+ companyBaseInfo.class_id +"]").text());
 	}else{
 		$("#classForRead").find(".noinfo").show();
 	}
 	if(companyBaseInfo.currency_id!=null){//加载币种
 		$("#reg_fund_money_type").find("li[value="+ companyBaseInfo.currency_id +"]").trigger("click");
 		$("#moneyTypeForRead").html($("#reg_fund_money_type").find("li[value="+ companyBaseInfo.currency_id +"]").text());
 	}
 	if(companyBaseInfo.industry_id == "1"){
 		$("[name = pattern]:radio").eq(0).attr("checked",true);//经营模式复选框
 	}else if(companyBaseInfo.industry_id == "2"){
 		$("[name = pattern]:radio").eq(1).attr("checked",true);//经营模式复选框
 	}else if(companyBaseInfo.industry_id == "3"){
 		$("[name = pattern]:radio").eq(2).attr("checked",true);//经营模式复选框
 	}else if(companyBaseInfo.industry_id == "4"){
 		$("[name = pattern]:radio").eq(3).attr("checked",true);//经营模式复选框
 	}
 	if(companyBaseInfo.industry_id == null){
 		$("#industryForRead").find(".noinfo").show();
 	}else{
 		$("#industryForRead").html($("[name = pattern]:radio:checked").parent().text());
 	}
}

/**
 * 交易信息展示
 * showTradeInfo
 * @param companyBaseInfo
 * @author mishengliang
 * 2016-11-1 下午1:26:48
 */
function showTradeInfo(compnayExtraInfo){
	if(compnayExtraInfo.bankAccount.length == 0 && compnayExtraInfo.invoiceTitles.length == 0){
		$("#tradeInfoForRead .now_edit").show();
		$("#tradeInfoForRead .main").hide();
	}
	
	//展示银行账号
	bankAccount = compnayExtraInfo.bankAccount;
	if(!compnayExtraInfo.bankAccount || compnayExtraInfo.bankAccount.length == 0){//bankAccount无数据
	}else if(compnayExtraInfo.bankAccount.length != 0){
		var bankShowForRead = "";
 		for(var i = 0;i<compnayExtraInfo.bankAccount.length;i++){
 			$("#bank .part:last input").eq(0).val(bankAccount[i].account_name);
 			$("#bank .part:last input").eq(1).val(bankAccount[i].account_code);
 			$("#bank .part:last input").eq(2).val(bankAccount[i].account_id);
 			if(bankAccount[i].default_id == 1){
 				$("#bank .part:last input").eq(3).prop("checked",true);
 			}
 			if(i<compnayExtraInfo.bankAccount.length-1){
 				$("#bank .part:last").find("img:last").trigger("click");//点击生成新的一行
 			}
 			
 			//单独展示界面
 			var defaultAccount = bankAccount[i].default_id == 1 ? "<td class='regular '>默认账号</td>":"";
 			bankShowForRead += "<tr>"
									+"<td class='f14'>"+ bankAccount[i].account_name +"</td>"
									+"<td class='f14'>"+ bankAccount[i].account_code +"</td>"
									+ defaultAccount
								+"</tr>";
		} 
 		$(".bankList").html(bankShowForRead);
	}
	
	//展示发票抬头
	invoiceTitles = compnayExtraInfo.invoiceTitles;
	if(!compnayExtraInfo.invoiceTitles){//抬头发票无数据
	}else if(compnayExtraInfo.invoiceTitles.length != 0){
		var invoiceShowForRead = "";
		for(var i = 0;i<compnayExtraInfo.invoiceTitles.length;i++){
			$("#invoice .part:last input").eq(0).val(invoiceTitles[i].invoice_title_name);
			$("#invoice .part:last input").eq(1).val(invoiceTitles[i].invoice_title_id);
 			if(invoiceTitles[i].default_id == 1){
 				$("#invoice .part:last input").eq(2).prop("checked",true);
 			}
 			if(i<compnayExtraInfo.invoiceTitles.length-1){
 				$("#invoice .part:last").find("img:last").trigger("click");//点击生成新的一行
 			}
 			
 			//展示界面
 			var defaultAccount = invoiceTitles[i].default_id == 1 ? "<span class='regular' style='margin-left:20px;'>默认账号</span>":"";
 			invoiceShowForRead += "<li>"
						 			+"<span>"+ invoiceTitles[i].invoice_title_name +"</span>"
						 			+defaultAccount
					 			+"</li>";
		} 
		$(".invoiceList").html(invoiceShowForRead);
	}
}

/**
 * 联系信息展示
 * showLinkedInfo
 * @param companyBaseInfo void
 * @author mishengliang
 * 2016-11-1 下午1:32:54
 */
function showLinkedInfo(companyBaseInfo){
	if(companyBaseInfo.f_phone == null && companyBaseInfo.contacts == null 
		&& 	companyBaseInfo.contact_addr_code == null && companyBaseInfo.m_phone == null
		&& companyBaseInfo.fax == null && companyBaseInfo.email == null){
		$("#contactInfoForRead .now_edit").show();
		$("#contactInfoForRead .main").hide();
	}
	
	var fPhone = companyBaseInfo.f_phone == null ? "":companyBaseInfo.f_phone;
 	var fPhoneFront = fPhone.substring(0,fPhone.indexOf("-"));
 	var fPhoneBehind = fPhone.substring(fPhone.indexOf("-")+1,fPhone.length);
 	$("#fPhone_front").val(fPhoneFront);
 	$("#fPhone_behind").val(fPhoneBehind);
 	if(fPhone==""){
 		$("#fPhoneForRead").find(".noinfo").show();
 	}else{
 		$("#fPhoneForRead").html(fPhone);
 	}
 	$("#contacts").val(companyBaseInfo.contacts);//联系人
 	if(companyBaseInfo.contacts==null || companyBaseInfo.contacts==""){
 		$("#contactsForRead").parent().find(".noinfo").show();
 	}else{
 		$("#contactsForRead").html(companyBaseInfo.contacts);
 	}
 	$("#mPhone").val(companyBaseInfo.m_phone);//联系人手机
 	if(companyBaseInfo.m_phone==null || companyBaseInfo.m_phone==""){
 		$("#mPhoneForRead").parent().find(".noinfo").show();
 	}else{
 		$("#mPhoneForRead").html(companyBaseInfo.m_phone);
 	}
 	$("#fax").val(companyBaseInfo.fax);//传真号
 	if(companyBaseInfo.fax==null || companyBaseInfo.fax==""){
 		$("#faxForRead").parent().find(".noinfo").show();
 	}else{
 		$("#faxForRead").html(companyBaseInfo.fax);
 	}
 	$("#email").val(companyBaseInfo.email);//Email
 	if(companyBaseInfo.email==null || companyBaseInfo.email==""){
 		$("#emailForRead").parent().find(".noinfo").show();
 	}else{
 		$("#emailForRead").html(companyBaseInfo.email);//Email
 	}
	$("#contactAddr").val(companyBaseInfo.contact_addr);//注册地址
	$("#contactAddrPro").val(companyBaseInfo.contact_addr);//注册地址
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
	
	//模拟change事件  
	if(!isNaN(provinceNum)){
		var provinceName = $(".province").find("li[value="+ provinceNum +"]").text();
		$(".province").find("li[value="+ provinceNum +"]").trigger("click");//设置省级行政区
		var cityName = $(".city").find("li[value="+ cityNum +"]").text();
		$(".city").find("li[value="+ cityNum +"]").trigger("click");//设置市级行政区
		var countyName = $(".county").find("li[value="+ countryNum +"]").text();
		$(".county").find("li[value="+ countryNum +"]").trigger("click");//设置县级行政区
		
		$("#contactAddrForRead").html(provinceName+cityName+countyName+companyBaseInfo.contact_addr);//注册地址
	}else{
	 		$("#contactAddrForRead").find(".noinfo").show();
	}
}

/**
 * 交易信息展示
 * tradeShow
 * @param goodsList void
 * @author mishengliang
 * 2016-10-27 上午9:28:19
 */
function showProductInfo(companyData){
	if((companyData.cateList == undefined || companyData.cateList.length == 0) && companyData.goodsList.length == 0
		&& companyData.metarialList.length == 0 && companyData.competitorList.length == 0
		&& companyData.customerList.length == 0){
		$("#productInfoForRead .now_edit").show();
		$("#productInfoForRead .main").hide();
	}
	var cateList = companyData.cateList;
	showSortList("forEdit",cateList);
	showSortList("forRead",cateList);
	//产品名称
	var goodsList = companyData.goodsList;
	if(!goodsList){
	}else if(goodsList.length != 0){
		var goodsShowForRead = "";
 		for(var i = 0;i<companyData.goodsList.length;i++){
 			$("#saleProduct .part:last input").eq(0).val(goodsList[i].goods_name);
 			$("#saleProduct .part:last input").eq(1).val(goodsList[i].goods_brand);
 			$("#saleProduct .part:last input").eq(2).val(goodsList[i].goods_id);
 			if(i<goodsList.length-1){
 				$("#saleProduct .part:last").find("img:last").trigger("click");//点击生成新的一行
 			}
 			
 			//单独展示界面
 			goodsShowForRead += "<li>"
									+"<span class='pro'>"+ goodsList[i].goods_name +"</span>"
									+"<span class='brand'>"+ goodsList[i].goods_brand +"</span>"
								+"</li>";
		} 
 		$("#saleProductForRead").html(goodsShowForRead);
	}
	
	//原材料及品牌
	var metarialList = companyData.metarialList;
	if(!metarialList){
	}else if(metarialList.length != 0){
		var metarialShowForRead = "";
		for(var i = 0;i<companyData.metarialList.length;i++){
			$("#material .part:last input").eq(0).val(metarialList[i].material_name);
			$("#material .part:last input").eq(1).val(metarialList[i].material_brand);
			$("#material .part:last input").eq(2).val(metarialList[i].material_id);
			if(i<metarialList.length-1){
				$("#material .part:last").find("img:last").trigger("click");//点击生成新的一行
			}
			
			//单独展示界面
			metarialShowForRead += "<li>"
									+"<span class='pro'>"+ metarialList[i].material_name +"</span>"
									+"<span class='brand'>"+ metarialList[i].material_brand +"</span>"
								+"</li>";
		} 
		$("#materialForRead").html(metarialShowForRead);
	}
	
	//展示竞争对手
	competitorList = companyData.competitorList;
	if(!competitorList){//抬头发票无数据
	}else if(competitorList.length != 0){
		var competitorShowForRead = "";
		for(var i = 0;i<competitorList.length;i++){
			$("#competitor .part:last input").eq(0).val(competitorList[i].competitor_name);
			$("#competitor .part:last input").eq(1).val(competitorList[i].competitor_id);
			if(i<competitorList.length-1){
				$("#competitor .part:last").find("img:last").trigger("click");//点击生成新的一行
			}
			
			//展示界面
			competitorShowForRead += "<li>"
						 			+"<span class='compi'>"+ competitorList[i].competitor_name +"</span>"
					 			+"</li>";
		} 
		$("#competitorForRead").html(competitorShowForRead);
	}
	
	//展示主要客户
	customerList = companyData.customerList;
	if(!customerList || customerList.length == 0){//抬头发票无数据
		$("#customerForRead").parent().find(".noinfo").show();
	}else if(customerList.length != 0){
		var customerShowForRead = "";
		for(var i = 0;i<customerList.length;i++){
			$("#customer .part:last input").eq(0).val(customerList[i].customer_name);
			$("#customer .part:last input").eq(1).val(customerList[i].customer_id);
 			if(i<customerList.length-1){
 				$("#customer .part:last").find("img:last").trigger("click");//点击生成新的一行
 			}
 			
 			//展示界面
 			customerShowForRead += "<li>"
						 			+"<span class='customer'>"+ customerList[i].customer_name +"</span>"
					 			+"</li>";
		} 
		$("#customerForRead").html(customerShowForRead);
	}
}

/**
 * 门户信息展示
 * showWinInfo
 * @param companyBaseInfo void
 * @author mishengliang
 * 2016-11-1 下午1:39:15
 */
function showWinInfo(companyBaseInfo){
	var logoFlag = picPathSrc(22,"#company_logo_read","onlyRead");//企业logo
	var imageFlag = picPathSrc(23,"#company_image_read","onlyRead");//企业形象图
	var equipment = showMorePic(24,".company_equipment_imgs_read","onlyRead");//厂容厂貌
	if(!logoFlag && !imageFlag && !equipment && (companyBaseInfo.company_introduction == null || companyBaseInfo.company_introduction == "")){
		$("#companyInfoForRead .now_edit").show();
		$("#companyInfoForRead .main").hide();
	}
	
	if(!logoFlag && !imageFlag){
		$(".corporateImage").prev(".noinfo").show();
	}
	if(!equipment){
		$(".company_equipment_imgs_read").prev(".noinfo").show();
	}
	
	$("#companyIntroduction").val(companyBaseInfo.company_introduction);//企业简介
	if(companyBaseInfo.company_introduction != null && companyBaseInfo.company_introduction != ""){
		$("#companyIntroductionForRead").html(companyBaseInfo.company_introduction.replace(/\n/g,"<br/>"));//企业简介
	}else{
		$("#companyIntroductionForRead").parent().find(".noinfo").show();//企业简介
	}
}

/**
 * 规模能力展示
 * scaleShow
 * @param cpBaseInfo void
 * @author mishengliang
 * 2016-10-26 上午10:59:38
 */
function showScaleInfo(cpBaseInfo){
	var opFlag = otherPersonShow(cpBaseInfo);//其他人员展示
	var psFlag = personStructShow(cpBaseInfo);//人员结构展示
	
	if(!opFlag && !psFlag && (cpBaseInfo.emplyees == null || cpBaseInfo.emplyees == 0) && cpBaseInfo.quality_control == null && cpBaseInfo.is_oem == null
		&& (cpBaseInfo.turnover == null || cpBaseInfo.turnover == 0) && (cpBaseInfo.import_num == null || cpBaseInfo.import_num == 0)
		&& (cpBaseInfo.export_num == null || cpBaseInfo.export_num == 0) && (cpBaseInfo.company_area == 0 || cpBaseInfo.company_area == null)
		&& (cpBaseInfo.factory_area == 0 || cpBaseInfo.factory_area == null) && cpBaseInfo.factory_owner == null && cpBaseInfo.use_begintime == null){
		$("#scalepowerInfoForRead .now_edit").show();
		$("#scalepowerInfoForRead .main").hide();
	}
	
	if(!opFlag){
		$("#other_personForRead").parent().find(".noinfo").show();
	}
	if(!psFlag){
		$("#person_structureForRead").parent().find(".noinfo").show();
	}
	
	$("#emplyees").val(cpBaseInfo.emplyees!=0?cpBaseInfo.emplyees:"");//公司总人数              
	if(cpBaseInfo.emplyees == null || cpBaseInfo.emplyees == 0){
		$("#emplyeesForRead").parents(".span_con").find(".noinfo").show();
	}else{
		$("#emplyeesForRead").parent(".dataForReg").show();
		$("#emplyeesForRead").html(cpBaseInfo.emplyees);//公司总人数    
	}
	$("#turnover").val(cpBaseInfo.turnover!=0?cpBaseInfo.turnover:"");
	$("#turnoverForRead").html(cpBaseInfo.turnover!=0?cpBaseInfo.turnover:"");
	if(cpBaseInfo.turnover == null || cpBaseInfo.turnover == 0){
		$("#turnoverForRead").parents(".span_con").find(".noinfo").show();
	}else{
		$("#turnoverForRead").parent(".dataForReg").show();
		$("#turnoverForRead").html(cpBaseInfo.turnover);//营业额
	}
	$("#importNum").val(cpBaseInfo.import_num!=0?cpBaseInfo.import_num:"");
	if(cpBaseInfo.import_num == null || cpBaseInfo.import_num == 0){
		$("#importNumForRead").parents(".span_con").find(".noinfo").show();
	}else{
		$("#importNumForRead").parent(".dataForReg").show();
		$("#importNumForRead").html(cpBaseInfo.import_num);
	}
	$("#exportNum").val(cpBaseInfo.export_num!=0?cpBaseInfo.export_num:"");             
	if(cpBaseInfo.export_num == null || cpBaseInfo.export_num == 0){
		$("#exportNumForRead").parents(".span_con").find(".noinfo").show();
	}else{
		$("#exportNumForRead").parent(".dataForReg").show();
		$("#exportNumForRead").html(cpBaseInfo.export_num);
	}
	if(cpBaseInfo.use_begintime == null){
		$("#useBegintimeForRead").parents(".span_con").find(".noinfo").show();
	}else{
		$("#useBegintimeForRead").parent(".dataForReg").show();
	}
	$("#useBegintime").val(cpBaseInfo.use_begintime);//开始时间
	$("#useBegintimeForRead").html(cpBaseInfo.use_begintime);//开始时间 
	$("#useEndtime").val(cpBaseInfo.use_endtime);//结束时间
	$("#useEndtimeForRead").html(cpBaseInfo.use_endtime);//结束时间 
	if(cpBaseInfo.company_area != 0 && cpBaseInfo.company_area != null){
		$("#companyArea").val(parseInt(cpBaseInfo.company_area));
		$("#companyAreaForRead").parent(".dataForReg").show();
		$("#companyAreaForRead").html(parseInt(cpBaseInfo.company_area));                    
	}else{
		$("#companyAreaForRead").parents(".span_con").find(".noinfo").show();
	}
	if(cpBaseInfo.factory_area != 0 && cpBaseInfo.factory_area != null){
		$("#factoryArea").val(parseInt(cpBaseInfo.factory_area)); 
		$("#factoryAreaForRead").parent(".dataForReg").show();
		$("#factoryAreaForRead").html(parseInt(cpBaseInfo.factory_area)); 
	}else{
		$("#factoryAreaForRead").parents(".span_con").find(".noinfo").show();
	}
	
	if(cpBaseInfo.quality_control != null){
		$("[name = quality]:radio").eq(cpBaseInfo.quality_control).prop("checked",true);//质量控制复选框
	}
	var qulityControlStr = "";
	switch(cpBaseInfo.quality_control){
		case 0:
			qulityControlStr = "内部";
			break;
		case 1:
			qulityControlStr = "第三方";
			break;
		case 2:
			qulityControlStr = "无";
			break;
		default:
			qulityControlStr = "";
			break;
	}
	if(qulityControlStr != ""){
		$("#qulityControlForRead").html(qulityControlStr);
	}else{
		$("#qulityControlForRead").find(".noinfo").show();
	}
	$("[name = OEM][value="+ cpBaseInfo.is_oem +"]").prop("checked",true);//OEM带加工
	if(cpBaseInfo.is_oem == 0){//提供
		$("#OEMStyleForRead").html("提供");
	}else if(cpBaseInfo.is_oem == 1){//不提供
		$("#OEMStyleForRead").html("不提供");
	}else{
		$("#OEMStyleForRead").find(".noinfo").show();
	}
	
	$("#factory_owner").find("ul li[value="+ cpBaseInfo.factory_owner +"]").trigger("click");
	if(cpBaseInfo.factory_owner == 1){//1：租赁   2：自建
		$("#factory_ownerForRead").html("租赁");
	}else if(cpBaseInfo.factory_owner == 2){
		$("#factory_ownerForRead").html("自建");
	}else{
		$("#factory_ownerForRead").find(".noinfo").show();
	}
	$("#turnover_currency_id").find("ul li[value="+ cpBaseInfo.turnover_currency_id +"]").trigger("click");//营业额货币
	$("#turnover_currency_idForRead").html(getCurrencyName(cpBaseInfo.turnover_currency_id));//营业额货币
	$("#import_currency_id").find("ul li[value="+ cpBaseInfo.import_currency_id +"]").trigger("click");//进口额货币
	$("#import_currency_idForRead").html(getCurrencyName(cpBaseInfo.import_currency_id));//进口额货币
	$("#export_currency_id").find("ul li[value="+ cpBaseInfo.export_currency_id +"]").trigger("click");//出口额货币
	$("#export_currency_idForRead").html(getCurrencyName(cpBaseInfo.export_currency_id));//出口额货币
}

/**
 * 其他人员展示
 * otherPersonShow
 * @param cpBaseInfo void
 * @author mishengliang
 * 2016-10-26 下午1:40:47
 */
function otherPersonShow(cpBaseInfo){
	var opFlag = false;
	var readShowStr = "";
	//其他人员 第一行数据展示
	if(cpBaseInfo.tech_num != 0 && cpBaseInfo.tech_num != null){
		$("#other_person .part:last").find("ul li[value=1]").trigger("click");
		$("#other_person .part:last").find(".people_num").val(cpBaseInfo.tech_num);
		readShowStr += "<li><span class='otherPeople'>研发人员</span><span class='span_con ml20'>"+ cpBaseInfo.tech_num +"人</span></li>";
	}else if(cpBaseInfo.op_num != 0 && cpBaseInfo.op_num != null){
		$("#other_person .part:last").find("ul li[value=2]").trigger("click");
		$("#other_person .part:last").find(".people_num").val(cpBaseInfo.op_num);
		readShowStr += "<li><span class='otherPeople'>操作工</span><span class='span_con ml20'>"+ cpBaseInfo.op_num +"人</span></li>";
	}else if(cpBaseInfo.qc_num != 0 && cpBaseInfo.qc_num != null){
		$("#other_person .part:last").find("ul li[value=3]").trigger("click");
		$("#other_person .part:last").find(".people_num").val(cpBaseInfo.qc_num);
		readShowStr += "<li><span class='otherPeople'>专职检验</span><span class='span_con ml20'>"+ cpBaseInfo.qc_num +"人</span></li>";
	}else if(cpBaseInfo.staff_num != 0 && cpBaseInfo.staff_num != null){
		$("#other_person .part:last").find("ul li[value=4]").trigger("click");
		$("#other_person .part:last").find(".people_num").val(cpBaseInfo.staff_num);
		readShowStr += "<li><span class='otherPeople'>间接员工</span><span class='span_con ml20'>"+ cpBaseInfo.staff_num +"人</span></li>";
	}else if(cpBaseInfo.internal_auditor_num != 0 && cpBaseInfo.internal_auditor_num != null){
		$("#other_person .part:last").find("ul li[value=5]").trigger("click");
		$("#other_person .part:last").find(".people_num").val(cpBaseInfo.internal_auditor_num);
		readShowStr += "<li><span class='otherPeople'>内审人员</span><span class='span_con ml20'>"+ cpBaseInfo.internal_auditor_num +"人</span></li>";
	}
	
	//其他人员多行展示
	if($("#other_person .part:first").find("input[type=hidden]").val() != 0){
		if(cpBaseInfo.op_num != 0 && cpBaseInfo.op_num != null && $("#other_person .part:first").find("input[type=hidden]").val() < 2){
			$("#other_person .part:last").find(".op_img img:last").trigger("click");
			$("#other_person .part:last").find("ul li[value=2]").trigger("click");
			$("#other_person .part:last").find(".people_num").val(cpBaseInfo.op_num);
			readShowStr += "<li><span class='otherPeople'>操作工</span><span class='span_con ml20'>"+ cpBaseInfo.op_num +"人</span></li>";
		}
		if(cpBaseInfo.qc_num != 0 && cpBaseInfo.qc_num != null && $("#other_person .part:first").find("input[type=hidden]").val() < 3){
			$("#other_person .part:last").find(".op_img img:last").trigger("click");
			$("#other_person .part:last").find("ul li[value=3]").trigger("click");
			$("#other_person .part:last").find(".people_num").val(cpBaseInfo.qc_num);
			readShowStr += "<li><span class='otherPeople'>专职检验</span><span class='span_con ml20'>"+ cpBaseInfo.qc_num +"人</span></li>";
		}
		if(cpBaseInfo.staff_num != 0 && cpBaseInfo.staff_num != null && $("#other_person .part:first").find("input[type=hidden]").val() < 4){
			$("#other_person .part:last").find(".op_img img:last").trigger("click");
			$("#other_person .part:last").find("ul li[value=4]").trigger("click");
			$("#other_person .part:last").find(".people_num").val(cpBaseInfo.staff_num);
			readShowStr += "<li><span class='otherPeople'>间接员工</span><span class='span_con ml20'>"+ cpBaseInfo.staff_num +"人</span></li>";
		}
		if(cpBaseInfo.internal_auditor_num != 0 && cpBaseInfo.internal_auditor_num != null && $("#other_person .part:first").find("input[type=hidden]").val() < 5){
			$("#other_person .part:last").find(".op_img img:last").trigger("click");
			$("#other_person .part:last").find("ul li[value=5]").trigger("click");
			$("#other_person .part:last").find(".people_num").val(cpBaseInfo.internal_auditor_num);
			readShowStr += "<li><span class='otherPeople'>内审人员</span><span class='span_con ml20'>"+ cpBaseInfo.internal_auditor_num +"人</span></li>";
		}		
	}
	
	$("#other_personForRead ul").html(readShowStr);
	if( (cpBaseInfo.tech_num != 0 && cpBaseInfo.tech_num != null) 
		|| (cpBaseInfo.op_num != 0 && cpBaseInfo.op_num != null) 
		|| (cpBaseInfo.qc_num != 0 && cpBaseInfo.qc_num != null) 
		|| (cpBaseInfo.staff_num != 0 && cpBaseInfo.staff_num != null) 
		|| (cpBaseInfo.internal_auditor_num != 0 && cpBaseInfo.internal_auditor_num != null) ){
		opFlag = true;
	}
	return opFlag;
}

function STRotherPersonShow(cpBaseInfo){
	var stflag = false;
	var readShowStr = "";
	//其他人员 第一行数据展示
	if(cpBaseInfo.techNum != 0 && cpBaseInfo.techNum != null){
		readShowStr += "<li><span class='otherPeople'>研发人员</span><span class='span_con ml20'>"+ cpBaseInfo.techNum +"人</span></li>";
	}
	if(cpBaseInfo.opNum != 0 && cpBaseInfo.opNum != null){
		readShowStr += "<li><span class='otherPeople'>操作工</span><span class='span_con ml20'>"+ cpBaseInfo.opNum +"人</span></li>";
	}
	if(cpBaseInfo.qcNum != 0 && cpBaseInfo.qcNum != null){
		readShowStr += "<li><span class='otherPeople'>专职检验</span><span class='span_con ml20'>"+ cpBaseInfo.qcNum +"人</span></li>";
	}
	if(cpBaseInfo.staffNum != 0 && cpBaseInfo.staffNum != null){
		readShowStr += "<li><span class='otherPeople'>间接员工</span><span class='span_con ml20'>"+ cpBaseInfo.staffNum +"人</span></li>";
	}
	if(cpBaseInfo.internalAuditorNum != 0 && cpBaseInfo.internalAuditorNum != null){
		readShowStr += "<li><span class='otherPeople'>内审人员</span><span class='span_con ml20'>"+ cpBaseInfo.internalAuditorNum +"人</span></li>";
	}
	
	$("#other_personForRead ul").html(readShowStr);
	if( (cpBaseInfo.techNum != 0 && cpBaseInfo.techNum != "" && cpBaseInfo.techNum != undefined) 
			|| (cpBaseInfo.opNum != 0 && cpBaseInfo.opNum != "" && cpBaseInfo.opNum != undefined) 
			|| (cpBaseInfo.qcNum != 0 && cpBaseInfo.qcNum != "" && cpBaseInfo.qcNum != undefined) 
			|| (cpBaseInfo.staffNum != 0 && cpBaseInfo.staffNum != "" && cpBaseInfo.staffNum != undefined) 
			|| (cpBaseInfo.internalAuditorNum != 0 && cpBaseInfo.internalAuditorNum != "" && cpBaseInfo.internalAuditorNum != undefined) ){
			$("#other_personForRead").parent().find(".noinfo").hide();
			stflag = true;
		}else{
			$("#other_personForRead").parent().find(".noinfo").show();
			stflag = false;
		}
	return stflag;
}

function personStructShow(cpBaseInfo){
	var psFlag = false;
	var readShowStr = "";
	//其他人员 第一行数据展示
	if(cpBaseInfo.college_num != 0 && cpBaseInfo.college_num != null){
		$("#person_structure .part:last").find("ul li[value=1]").trigger("click");
		$("#person_structure .part:last").find(".people_num").val(cpBaseInfo.college_num);
		readShowStr += "<li><span class='otherPeople'>专科及以上</span><span class='span_con ml20'>"+ cpBaseInfo.college_num +" 人</span></li>";
	}else if(cpBaseInfo.diploma_down_num != 0 && cpBaseInfo.diploma_down_num != null){
		$("#person_structure .part:last").find("ul li[value=3]").trigger("click");
		$("#person_structure .part:last").find(".people_num").val(cpBaseInfo.diploma_down_num);
		readShowStr += "<li><span class='otherPeople'>专科以下</span><span class='span_con ml20'>"+ cpBaseInfo.diploma_down_num +" 人</span></li>";
	}
	
	//其他人员多行展示
	if($("#person_structure .part:first").find("input[type=hidden]").val() != 0){
		if(cpBaseInfo.diploma_down_num != 0 && cpBaseInfo.diploma_down_num != null && $("#person_structure .part:first").find("input[type=hidden]").val() < 3){
			$("#person_structure .part:last").find(".op_img img:last").trigger("click");
			$("#person_structure .part:last").find("ul li[value=3]").trigger("click");
			$("#person_structure .part:last").find(".people_num").val(cpBaseInfo.diploma_down_num);
			readShowStr += "<li><span class='otherPeople'>专科以下</span><span class='span_con ml20'>"+ cpBaseInfo.diploma_down_num +" 人</span></li>";
		}
	}
	
	$("#person_structureForRead ul").html(readShowStr);
	if( (cpBaseInfo.diploma_num != 0 && cpBaseInfo.diploma_num != null) 
		|| (cpBaseInfo.diploma_down_num != 0 && cpBaseInfo.diploma_down_num != null) ){
		psFlag = true;
	}
	return psFlag;
}
function STRpersonStructShow(cpBaseInfo){
	var stflag = false;
	var readShowStr = "";
	//其他人员 第一行数据展示
	if(cpBaseInfo.collegeNum != 0 && cpBaseInfo.collegeNum != null){
		readShowStr += "<li><span class='otherPeople'>专科及以上</span><span class='span_con ml20'>"+ cpBaseInfo.collegeNum +" 人</span></li>";
	}
	if(cpBaseInfo.diplomaDownNum != 0 && cpBaseInfo.diplomaDownNum != null){
		readShowStr += "<li><span class='otherPeople'>专科以下</span><span class='span_con ml20'>"+ cpBaseInfo.diplomaDownNum +" 人</span></li>";
	}
	
	$("#person_structureForRead ul").html(readShowStr);
	if( (cpBaseInfo.collegeNum != 0 && cpBaseInfo.collegeNum != "" && cpBaseInfo.collegeNum != undefined) 
		|| (cpBaseInfo.diplomaDownNum != 0 && cpBaseInfo.diplomaDownNum != "" && cpBaseInfo.diplomaDownNum != undefined) ){
			$("#person_structureForRead").parent().find(".noinfo").hide();
			stflag = true;
		}else{
			$("#person_structureForRead").parent().find(".noinfo").show();
			stflag = false;
		}
	return stflag;
}

/**
 * 设备清单展示
 * showDeviceInfo
 * @param companyData void
 * @author mishengliang
 * 2016-11-1 下午1:44:59
 */
function showDeviceInfo(companyData){
	//设备清单
	var deviceListShowStr = "<tr>"
								+"<th >设备名称</th>"
								+"<th >设备规格</th>"
								+"<th >产地</th>"
								+"<th >价值(万元)</th>"
								+"<th >购买日期</th>"
								+"<th >数量</th>"
								+"<th>先进性</th>"
							+"</tr>";
	var deviceList = companyData.deviceList;
	if(deviceList.length == 0){
		$("#machineInfoForRead .now_edit").show();
		$("#machineInfoForRead .main").hide();
	}
	if(deviceList.length > 0){
		for(var i=0; i < deviceList.length; i++){
			$("#machineInfoForEdit .part:last input").eq(0).val(deviceList[i].device_name);
			$("#machineInfoForEdit .part:last input").eq(1).val(deviceList[i].specifications);
			$("#machineInfoForEdit .part:last input").eq(2).val(deviceList[i].place);
			$("#machineInfoForEdit .part:last input").eq(3).val(deviceList[i].price==null?"":replaceZeroAsStr(deviceList[i].price));
			$("#machineInfoForEdit .part:last input").eq(4).val(deviceList[i].buy_day == null?"":deviceList[i].buy_day);
			$("#machineInfoForEdit .part:last input").eq(5).val(deviceList[i].device_num!=0?deviceList[i].device_num:"");
			$("#machineInfoForEdit .part:last input").eq(6).val(deviceList[i].advanced);
			$("#machineInfoForEdit .part:last input").eq(7).val(deviceList[i].device_id);

			deviceListShowStr += "<tr>"
									+"<td>"+ deviceList[i].device_name +"</td>"
									+"<td>"+ deviceList[i].specifications +"</td>"
									+"<td>"+ deviceList[i].place +"</td>"
									+"<td>"+ (deviceList[i].price==null?"":replaceZeroAsStr(deviceList[i].price)) +"</td>"
									+"<td>"+ (deviceList[i].buy_day == null?"":deviceList[i].buy_day) +"</td>"
									+"<td>"+ (deviceList[i].device_num!=0?deviceList[i].device_num:"") +"</td>"
									+"<td>"+ deviceList[i].advanced +"</td>"
								+"</tr>";
 			if(i< deviceList.length-1){
 				$("#machineInfoForEdit .part:last").find("img:last").trigger("click");//点击生成新的一行
 			}
		}
	}
	$("#machineTable").html(deviceListShowStr);
}

/**
 * 院校合作展示
 * showSchoolCoopInfo
 * @param companyBaseInfo void
 * @author mishengliang
 * 2016-11-1 下午1:47:02
 */
function showSchoolCoopInfo(companyBaseInfo){
	var textFlag = showText(30,"onlyRead");//院校合作
	if((companyBaseInfo.school_coop == null || companyBaseInfo.school_coop == "") && !textFlag){
		$("#schoolCooperationForRead .now_edit").show();
		$("#schoolCooperationForRead .main").hide();
	}
	if(companyBaseInfo.school_coop == null || companyBaseInfo.school_coop == ""){
		$("#schoolCoopForRead").parent().find(".noinfo").show();
	}else{
		$("#schoolCoopForRead").parent().find(".noinfo").hide();
		$("#schoolCoopForRead").html(companyBaseInfo.school_coop);//院校合作
	}
	$("#schoolCoop").val(companyBaseInfo.school_coop);//院校合作
}

/**
 * 资质证书展示
 * showCertInfo
 * @param companyBaseInfo void
 * @author mishengliang
 * 2016-11-1 下午1:48:53
 */
function showCertInfo(companyBaseInfo){
	var sysFlag = picPathSrc(25,"#management_system_read","onlyRead");//管理认证体系
	var patentFlag = showMorePic(26,".patent_imgs_read","onlyRead");//专利证书
	var oiFlag = showMorePic(27,".other_intelligence_imgs_read","onlyRead");//其他资质
	
	if((!sysFlag || companyBaseInfo.certification_system==null) && !patentFlag && !oiFlag){// ||companyBaseInfo.certification_system=="无"
		$("#management_system_pic").parent().parent().hide();
		$("#certificationForRead .now_edit").show();
		$("#certificationForRead .main").hide();
	}
	
	if((!sysFlag || companyBaseInfo.certification_system==null)){
		$("#management_system_read").parent().prev(".noinfo").show();
		$(".certificationName").hide();
	}else if(companyBaseInfo.certification_system=="无"){
		$("#management_system_read").hide();
		$("#management_system_read").parent().prev(".noinfo").hide();
		$(".certificationName").html(companyBaseInfo.certification_system);
	}else{
		$("#management_system_read").parent().prev(".noinfo").hide();
		$(".certificationName").html(companyBaseInfo.certification_system);
	}
	if(!patentFlag){
		$(".patent_imgs_read").prev(".noinfo").show();
	}else{
		$(".patent_imgs_read").prev(".noinfo").hide();
	}
	if(!oiFlag){
		$(".other_intelligence_imgs_read").prev(".noinfo").show();
	}else{
		$(".other_intelligence_imgs_read").prev(".noinfo").hide();
	}
	
	if(companyBaseInfo.certification_system==null||companyBaseInfo.certification_system=="无"){
		$("[name = authentication]:radio").eq(0).prop("checked",true);
		$("#management_system_pic").parent().parent().hide();
	}else if("ISO9000" == companyBaseInfo.certification_system){//ISO9000
		$("[name = authentication]:radio").eq(1).prop("checked",true);
	}else if("ISO14000" == companyBaseInfo.certification_system){//ISO14000
		$("[name = authentication]:radio").eq(2).prop("checked",true);
	}else{//其他认证
		$("[name = authentication]:radio").eq(3).prop("checked",true);
		$("#otherCerName").val(companyBaseInfo.certification_system);
		$("#otherCerName").parent().show();
		//$("#certification_system_other").val(cpBaseInfo.certification_system);
	}
}

/**
 * 图片展示
 * allPicShow void
 * @author mishengliang
 * 2016-10-20 上午11:01:33
 */
function allPicShow(){
	if(companyId!=null&&companyId!=0){
		picPathSrc(18,"#business_licence");//营业执照  
		picPathSrc(19,"#tax_registration_certificate");//税务登记
		picPathSrc(20,"#organization_code_certificate");//组织机构代码证
		picPathSrc(21,"#taxpayer_qualification_certification");//纳税人资格证书 
		picPathSrc(22,"#company_logo");//logo
		picPathSrc(23,"#company_image");//纳税人资格证书 
		picPathSrc(25,"#management_system");//纳税人资格证书 
		showMorePic(24,".company_equipment_imgs");//厂容厂貌
		showMorePic(26,".patent_imgs");//专利证书
		showMorePic(27,".other_intelligence_imgs");//其他资质
		showText(30);
	}
}

/**
 * 只读图片展示
 * allPicShowForRead void
 * @author mishengliang
 * 2016-10-20 上午11:01:53
 */
function allPicShowForRead(){
	if(companyId!=null&&companyId!=0){
		picPathSrc(18,"#business_licence_read","onlyRead");//营业执照  
		picPathSrc(19,"#tax_registration_certificate_read","onlyRead");//税务登记
		picPathSrc(20,"#organization_code_certificate_read","onlyRead");//组织机构代码证
		picPathSrc(21,"#taxpayer_qualification_certification_read","onlyRead");//纳税人资格证书 
		//picPathSrc(22,"#company_logo_read","onlyRead");//企业logo
		//picPathSrc(23,"#company_image_read","onlyRead");//企业形象图
		//showMorePic(24,".company_equipment_imgs_read","onlyRead");//厂容厂貌
		//picPathSrc(25,"#management_system_read","onlyRead");//管理认证体系
		//showMorePic(26,".patent_imgs_read","onlyRead");//专利证书
		//showMorePic(27,".other_intelligence_imgs_read","onlyRead");//其他资质
		//showText(30,"onlyRead");//院校合作
	}
}

/**加载市
 * showCity
 * @param e void
 * @author wangjialin
 * 2016-10-17 上午10:16:12
 */
function showCity(code){
	var province_code=code;
	if(province_code!=null&&province_code!='0'){
		city=ChineseDistricts[province_code];
		if(city!=null&&city!=undefined){//有子级
			$(".city").parent().show();
			//清空数据
			$(".city li").remove();
			$.each(city,function(code,address){
				var option="<li value='"+code+"' onclick='addressSelect(this,2)'>"+address+"</li>";
				$(".city").append(option);
			});
			if($(".city").val() == 0){//判断是否选择市级
				$(".county li").remove();
			}
		}else{
			$(".city").parent().hide();
			$(".city").parent().next().hide();
		}
	}else{//未选择省级
		$(".city li").remove();
		$(".county li").remove();
	}
}
/**加载县区
 * showCounty
 * @param e void
 * @author wangjialin
 * 2016-10-17 上午10:15:56
 */
function showCounty(code){
	var city_code=code;
	if(city_code!=null&&city_code!='0'){//城市有选择
		countrys=ChineseDistricts[city_code];
		//有子级
		if(countrys!=null&&countrys!=undefined){
			$(".county").parent().show();
			//清空数据
			$(".county li").remove();
			$.each(countrys,function(code,address){
				var option="<li value='"+code+"' onclick='addressSelect(this)'>"+address+"</li>";
				$(".county").append(option);
			});
		}else{
			$(".county").parent().hide();
		}
	}else{//城市无选择
		$(".county li").remove();
	}
}

/**展示下拉列表
 * showSelect
 * @param e void
 * @author wangjialin
 * 2016-10-12 下午2:22:14
 */
function showSelect(e){
	var l=$(e).next().children().length;
	var id=$(e).parents(".item").attr("id");
	if(l>0){
		$(e).next("ul").css("display","block");
		if(id=='other_person'){
			var index=$(e).parents(".part").index();
			checkChoosed("other_person","otherPeopleList",index);
		}else if(id=='person_structure'){
			var index=$(e).parents(".part").index();
			checkChoosed("person_structure","personStructureList",index);
		}else{}
		$(e).css("border","1px solid #365c87");
		$(e).find("img").prop("src","/vip/resources/images/applyAccess/arrowDownBlue.png");
		$(".mask_opacity").css("display","block");
		$(".mask_opacity").click(function(){
			$(e).next().css("display","none");
			var option= $(e).find("input").val();
			if((option=='' || option==undefined) && $(e).hasClass("select_must")){
				$(e).css("border","1px solid red");
				$(e).parents(".item").find(".info_explain").show();
			}else{
				$(e).css("border","1px solid #ccc");
			}
			$(e).find("img").prop("src","/vip/resources/images/applyAccess/arrowDown.png");
			$(".mask_opacity").css("display","none");
		});
	}
}
/**	ul列表模拟select效果，本页面所有的下拉选择框均采用此种处理
 * selectOption
 * @param e void
 * @author wangjialin
 * 2016-10-14 下午1:15:50
 */
function selectOption(e){
	var item=$(e).text();
	var value=$(e).val();
	item=item+"<img src='/vip/resources/images/applyAccess/arrowDown.png' class='f_r mr5'><input type='hidden' value="+value+">";
	$(e).parent().prev().html(item);
	$(e).parent().prev().css("border","1px solid #ccc");
	$(e).parent().css("display","none");
	$(".mask_opacity").css("display","none");
	var id=$(e).parents(".item").prop("id");
	if($(e).parent().prev().prop("id")=='currency_id'){
		if($("#reg_fund").val()!=''){
			if(!num_reg.test($("#reg_fund").val())){
				$(e).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的金额');
				$(e).parents(".item").find(".info_explain ").show();
			}else{
				$(e).parents(".item").find(".info_explain").hide();	
			}
		}else {
			$(e).parents(".item").find(".info_explain ").show();
		}
	}else if(id=='turnover_currency_id' || id=='export_currency_id'|| id=='import_currency_id'){
		var v=$(e).parent().parent().next().find("input").val();
		if(v!=''){
			if(!num_reg.test(v)){
				$(e).parents(".item").find(".info_explain ").show();
			}else{
				$(e).parents(".item").find(".info_explain").hide();	
			}
		}
	}else if(id=='other_person'||id=='person_structure'){
		var v=$(e).parent().parent().next().find("input").val();
		if(v!=''){
			if(!int_reg.test(v)){
				$(e).parents(".item").find(".info_explain ").show();
			}else{
				$(e).parents(".item").find(".info_explain").hide();	
			}
		}
	}else{
		$(e).parents(".item").find(".info_explain ").hide();
	}
}

/**地址选择三级联动
 * addressSelect
 * @param e
 * @param i void
 * @author wangjialin
 * 2016-10-17 上午10:17:48
 */
function addressSelect(e,i){
	var value=$(e).val();
	var text=$(e).text();
	var province=$("#province").find("input").val();
	var city=$("#city").find("input").val();
	var html="<input type='hidden' value="+value+">"+text+"<img src='/vip/resources/images/applyAccess/arrowDown.png' class='f_r mr5'>";
	$(e).parent().prev().html(html);
	$(e).parent().prev().css("border","1px solid #ccc");
	$(e).parent().css("display","none");
	$(".mask_opacity").css("display","none");
	if(i==1){
		if(value!=province){
			$("#city").html('<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5">');
			$("#county").html('<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5">');
		}
		showCity(value);
		goToLocation(1);
	}else if(i==2){
		if(value!=city){
			$("#county").html('<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5">');
		}
		showCounty(value);
		goToLocation(2);
	}else{
		goToLocation(3);
	}
	var last=$("#address").children().eq(0).children().last();
	var lastValue=last.find("input").val();
	if(lastValue!=undefined && lastValue!=''){
		if($("#contactAddr").val()!=''){
			$("#address").find(".info_explain").hide();
			$("#contactAddr").css("border","1px solid #ccc");
		}else {
			$("#address").find(".info_explain").show();
			$("#contactAddr").css("border","1px solid red");
		}
	}
}

/**input框onblur 事件
 * onBlurTest void
 * @author wangjialin
 * 2016-10-20 上午9:52:42
 */
function onBlurTest(){
	$(".input_must").on("blur",function(){
		var v=$(this).val();
		var id=$(this).prop("id");
		switch(id){
		case "reg_fund":
			if(v!=''){
				if($("#currency_id").find("input").val()=='' || $("#currency_id").find("input").val()==undefined){
					$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">注册资本不可为空');
					$(this).parents(".item").find(".info_explain ").show();
					$(this).css("border","1px solid red");
				}else{
					 if(!num_reg.test(v)){
						$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的金额');
						$(this).parents(".item").find(".info_explain ").show();
						$(this).css("border","1px solid red");
					}else{
						$(this).parents(".item").find(".info_explain").hide();
						$(this).css("border","1px solid #ccc");
					}
				}
			}else{
				$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">注册资本不可为空');
				$(this).parents(".item").find(".info_explain ").show();		
				$(this).css("border","1px solid red");
			}
			break;
		case "fPhone_front":
			if(v!=''){
				if($("#fPhone_behind").val()==''){
					$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">电话号码不可为空');
					$(this).parents(".item").find(".info_explain ").show();
					$("#fPhone_behind").css("border","1px solid red");
					$(this).css("border","1px solid #ccc");
				}else{
					var front=$("#fPhone_front").val();
					var behind=$("#fPhone_behind").val();
					var phone=front+'-'+behind;
					 if(!phone_reg.test(phone)){
						$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的电话号码');
						$(this).parents(".item").find(".info_explain ").show();
						$(this).css("border","1px solid red");
						$("#fPhone_behind").css("border","1px solid red");
					}else{
						$(this).parents(".item").find(".info_explain").hide();
						$("#fPhone_behind,#fPhone_front").css("border","1px solid #ccc");
					}
				}
			}else{
				$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">电话号码不可为空');
				$(this).parents(".item").find(".info_explain ").show();
				$(this).css("border","1px solid red");
			}
			break;
		case "fPhone_behind":
			if(v!=''){
				if($("#fPhone_front").val()==''){
					$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">电话号码不可为空');
					$(this).parents(".item").find(".info_explain ").show();
					$("#fPhone_front").css("border","1px solid red");
				}else{
					var front=$("#fPhone_front").val();
					var behind=$("#fPhone_behind").val();
					var phone=front+'-'+behind;
					 if(!phone_reg.test(phone)){
						$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的电话号码');
						$(this).parents(".item").find(".info_explain ").show();
						$(this).css("border","1px solid red");
						$("#fPhone_front").css("border","1px solid red");
					}else{
						$(this).parents(".item").find(".info_explain").hide();
						$("#fPhone_behind,#fPhone_front").css("border","1px solid #ccc");
					}
				}
			}else{
				$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">电话号码不可为空');
				$(this).parents(".item").find(".info_explain ").show();
				$(this).css("border","1px solid red");
			}
			break;
		default:
			if(v!=''){
				$(this).parents(".item").find(".info_explain").hide();
				$(this).css("border","1px solid #ccc");
			}else{
				$(this).parents(".item").find(".info_explain").show();
				$(this).css("border","1px solid red");
			}
		
		}
});
	$("input[name=pattern]").on("blur",function(){
		if(! $('input:radio[name="pattern"]').is(":checked")){
			 $('input:radio[name="pattern"]').parent().parent().next(".info_explain").show();
		}else{
			 $('input:radio[name="pattern"]').parent().parent().next(".info_explain").hide();
		}
	});
	$(".addressDetailMust").on("blur",function(){
		var v=$(this).val();
		var province=$("#province").find("input").val();
		var city=$("#city").find("input").val();
		var county=$("#county").find("input").val();
		if(v!=''){
			if(province==''||city==''||county==''||province==undefined||city==undefined||county==undefined){
				$("#address").find(".info_explain").show();
				$("#province,#city,#county").css("border","1px solid red");
			}else{
				$("#address").find(".info_explain").hide();
				$("#province,#city,#county").css("border","1px solid #ccc");
				$(this).css("border","1px solid #ccc");
			}
		}else{
			$("#address").find(".info_explain").show();
			$(this).css("border","1px solid red");
		}
	});
	$(".machinePrice").on("blur",function(){
		var v=$(this).val();
		if(v!=''){//设备价格不为空
			var name=$(this).parents(".part").find(".machineName").val();
			var amount=$(this).parents(".part").find(".machineAmount").val();
			if(!num_reg.test(v)){//设备价格填写错误
				$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的金额');
				$(this).parents(".item").find(".info_explain ").show();
				$(this).css("border","1px solid red");
			}else{//设备价格填写正确
				if(name=='' ||amount==''){
					$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
					$(this).parents(".item").find(".info_explain ").show();
					$(this).parents(".part").find(".machineName,.machineAmount").css("border","1px solid red");
					$(this).css("border","1px solid #ccc");
				}else{
					if(!int_reg.test(amount)){
						$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备数量');
						$(this).parents(".item").find(".info_explain ").show();
						$(this).css("border","1px solid #ccc");
						$(this).parents(".part").find(".machineAmount").css("border","1px solid red");
					}else{
						$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
						$(this).parents(".item").find(".info_explain ").hide();
						$(this).css("border","1px solid #ccc");
						$(this).parents(".part").find(".machineName,.machineAmount").css("border","1px solid #ccc");
					}
				}
			}
			
		}
	});
	$(".machineName").on("blur",function(){
		if($(this).val()!=''){//设备名称不为空
			if($(this).parents(".part").find(".machineAmount").val()==''){
				$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
				$(this).parents(".item").find(".info_explain ").show();
				$(this).parents(".part").find(".machineAmount").css("border","1px solid red");
			}else{
				if(!int_reg.test($(this).parents(".part").find(".machineAmount").val())){
					$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备数量');
					$(this).parents(".item").find(".info_explain ").show();
					$(this).parents(".part").find(".machineAmount").css("border","1px solid red");
				}else{
					if($(this).parents(".part").find(".machinePrice").val()!=''){
						if(!num_reg.test($(this).parents(".part").find(".machinePrice").val())){
							$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备金额');
							$(this).parents(".item").find(".info_explain ").show();
							$(this).parents(".part").find(".machinePrice").css("border","1px solid red");
						}else{
							$(this).parents(".item").find(".info_explain").hide();
							$(this).css("border","1px solid #ccc");
							$(this).parents(".part").find(".machinePrice,.machineAmount").css("border","1px solid #ccc");
						}
					}else{
						$(this).parents(".item").find(".info_explain").hide();
						$(this).css("border","1px solid #ccc");
						$(this).parents(".part").find(".machineAmount").css("border","1px solid #ccc");
					}
				}
			}
		}else{
			$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
			$(this).parents(".item").find(".info_explain ").show();
			$(this).css("border","1px solid red");
		}
	});
	$(".machineAmount").on("blur",function(){
		if($(this).val()!=''){
			if($(this).parents(".part").find(".machineName").val()==''){
				$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
				$(this).parents(".item").find(".info_explain ").show();
				$(this).parents(".part").find(".machineName").css("border","1px solid red");
			}else{
				if(!int_reg.test($(this).val())){
					$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备数量');
					$(this).parents(".item").find(".info_explain ").show();
					$(this).css("border","1px solid red");
				}else{
					if($(this).parents(".part").find(".machinePrice").val()!=''){
						if(!num_reg.test($(this).parents(".part").find(".machinePrice").val())){
							$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备金额');
							$(this).parents(".item").find(".info_explain ").show();
							$(this).parents(".part").find(".machinePrice").css("border","1px solid red");
						}else{
							$(this).parents(".item").find(".info_explain").hide();
							$(this).css("border","1px solid #ccc");
							$(this).parents(".part").find(".machineName,.machinePrice").css("border","1px solid #ccc");
						}
					}else{
						$(this).parents(".item").find(".info_explain").hide();
						$(this).css("border","1px solid #ccc");
						$(this).parents(".part").find(".machineName").css("border","1px solid #ccc");
					}
				}
			}
		}else{
			$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
			$(this).parents(".item").find(".info_explain ").show();
			$(this).css("border","1px solid red");
		}
	});
	$("#mPhone").on("blur",function(){
		if($(this).val()!=''){
			if(!mphone_reg.test($(this).val())){
				$(this).next().show();
			}else{
				$(this).next().hide();
				$(this).css("border","1px solid #ccc");
			} 
		}else{
			$(this).next().hide();
		}
	});
	$("#email").on("blur",function(){
		if($(this).val()!=''){
			if(!email_reg.test($(this).val()))
				$(this).next().show();
			else 
				$(this).next().hide();
		}else{
			$(this).next().hide();
		}
	});
	$(".people_num").on("blur",function(){
		if($(this).val()!=''){
			if(!int_reg.test($(this).val()))
				$(this).parents(".item").find(".info_explain").show();
			else 
				$(this).parents(".item").find(".info_explain").hide();
		}else {
			$(this).parents(".item").find(".info_explain").hide();
		}
			
	});
	$(".money_test").on("blur",function(){
		if($(this).val()!=''){
			if(!num_reg.test($(this).val())){
				$(this).parent().css("border","1px solid red");
				$(this).parents(".item").find(".info_explain").show();
			}else{
				$(this).parent().css("border","1px solid #ccc");
				$(this).parents(".item").find(".info_explain").hide();
			}
		}else {
			$(this).parent().css("border","1px solid #ccc");
			$(this).parents(".item").find(".info_explain").hide();
		}
	});
	$(".size_test").on("blur",function(){
		if($(this).val()!=''){
			if(!num_reg.test($(this).val())){
				$(this).css("border","1px solid red");
				$(this).parents(".item").find(".info_explain").show();
			}else{
				$(this).css("border","1px solid #ccc");
				$(this).parents(".item").find(".info_explain").hide();
			}
		}else {
			$(this).css("border","1px solid #ccc");
			$(this).parents(".item").find(".info_explain").hide();
		}
	});
	$(".bankcard").on("blur",function(){
		if($(this).val()!=''&& $(this).prev().val()!=''){
			if(!bankcard_reg.test($(this).val())){
				$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的开户账号');
				$(this).parents(".item").find(".info_explain").show();
				$(this).css("border","1px solid red");
			}else{
				$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空');
				$(this).parents(".item").find(".info_explain").hide();
				$(this).css("border","1px solid #ccc");
				$(this).prev().css("border","1px solid #ccc");
			}
		}else{
			$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空');
			$(this).parents(".item").find(".info_explain").show();
			$(this).css("border","1px solid red");
			$(this).prev().css("border","1px solid red");
		}
	});
	$(".bankcard").prev().on("blur",function(){
		if($(this).val()!=''&& $(this).next().val()!=''){
			if(!bankcard_reg.test($(this).next().val())){
				$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的开户账号');
				$(this).parents(".item").find(".info_explain").show();
				$(this).next().css("border","1px solid red");
			}else{
				$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空');
				$(this).parents(".item").find(".info_explain").hide();
				$(this).css("border","1px solid #ccc");
				$(this).next().css("border","1px solid #ccc");
			}
		}else{
			$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空');
			$(this).parents(".item").find(".info_explain").show();
			$(this).css("border","1px solid red");
			$(this).next().css("border","1px solid red");
		}
	});
	$("#customer .part .inputWrap").on("blur",function(){
		if($(this).val()!=''){
			$(this).css("border","1px solid #ccc");
			$(this).parents(".item").find(".info_explain").hide();
		}
	});
	
	$('input[type=radio][name=authentication]').change(function() {
        if (this.value == 1) {
        	$("#management_system_pic").parent().parent().hide();
        }else{
        	$("#management_system_pic").parent().parent().show();
        }
        if (this.value == 4) {
        	$("#otherCerName").parent().show();
        }else{
        	$("#otherCerName").parent().hide();
        }
    });
}
/**点击左侧菜单，将相应内容滚动至指定位置
 * click_scroll
 * @param e void
 * @author wangjialin
 * 2016-10-13 下午3:39:45
 */
function click_scroll(index,e){
	isMenuClicked=false;
	/**
	 * 去除原有的选中样式
	 */
	delOldClass();
	/**
	 * 为当前的li添加选样式
	 */
	addMenuActive(index);
	/**
	 * 设置滚动条的位置
	 */
	var scroll_offset; 
	$(e).each(function(){
		if($(this).css("display")=='block')
			scroll_offset = $(this).offset().top-120;  //得到pos这个div层的offset，包含两个值，top和left
	});
	$("body,html").animate({
		scrollTop:scroll_offset //让body的scrollTop等于pos的top，就实现了滚动
	},0);
}
/**左侧菜单：切换时去除原有的选中状态
 * delOldClass void
 * @author wangjialin
 * 2016-10-20 上午11:14:24
 */
function delOldClass(){
	var oldIndex=$(".menuActive").index();
	$(".menuActive a").removeClass("active");
	if(oldIndex==0)
		$(".menuActive img").prop("src","/vip/resources/images/applyAccess/regular1.png");
	else if(oldIndex==8)
		$(".menuActive img").prop("src","/vip/resources/images/applyAccess/regular3.png");
	else 
		$(".menuActive img").prop("src","/vip/resources/images/applyAccess/regular2.png");
	$(".menuActive").removeClass("menuActive");
}
/**左侧菜单：切换时添加选中状态
 * addMenuActive
 * @param index void
 * @author wangjialin
 * 2016-10-20 下午3:12:41
 */
function addMenuActive(index){
	$(".menu_ul").children().eq(index).addClass("menuActive");
	$(".menu_ul").children().eq(index).find("a").addClass("active");
	if(index==0)
		$(".menu_ul").children().eq(index).find("img").prop("src","/vip/resources/images/applyAccess/active1.png");
	else if(index==8)
		$(".menu_ul").children().eq(index).find("img").prop("src","/vip/resources/images/applyAccess/active3.png");
	else 
		$(".menu_ul").children().eq(index).find("img").prop("src","/vip/resources/images/applyAccess/active2.png");
}
/**监听滚动条的滚动事件，根据滚动条的位置，设置左侧菜单的选中项
 * setMenuActive void
 * @author wangjialin
 * 2016-10-20 下午3:13:04
 */
function setMenuActive(){
		$(window).scroll(function(){
			var scrollTop=$(document).scrollTop();
			var h1,h2,h3,h4,h5,h6,h7,h8;
			if(isMenuClicked){
			$(".tradeInfo").each(function(){
				if($(this).css("display")=='block')
					if($(this).hasClass("forRead"))
						h1=$(this).offset().top-200;
					else
						h1=$(this).offset().top-150;
			});
			$(".contactInfo").each(function(){
				if($(this).css("display")=='block')
					if($(this).hasClass("forRead"))
						h2=$(this).offset().top-200;
					else
						h2=$(this).offset().top-150;
			});
			$(".productInfo").each(function(){
				if($(this).css("display")=='block')
					if($(this).hasClass("forRead"))
						h3=$(this).offset().top-200;
					else
						h3=$(this).offset().top-150;
			});
			$(".companyInfo").each(function(){
				if($(this).css("display")=='block')
					if($(this).hasClass("forRead"))
						h4=$(this).offset().top-200;
					else
						h4=$(this).offset().top-150;
			});
			$(".scalepowerInfo").each(function(){
				if($(this).css("display")=='block')
					if($(this).hasClass("forRead"))
						h5=$(this).offset().top-200;
					else
						h5=$(this).offset().top-150;
			});
			$(".machineInfo").each(function(){
				if($(this).css("display")=='block')
					if($(this).hasClass("forRead"))
						h6=$(this).offset().top-200;
					else
						h6=$(this).offset().top-150;
			});
			$(".schoolCooperation").each(function(){
				if($(this).css("display")=='block')
					if($(this).hasClass("forRead"))
						h7=$(this).offset().top-200;
					else
						h7=$(this).offset().top-150;
			});
			$(".certification").each(function(){
				if($(this).css("display")=='block')
					if($(this).hasClass("forRead"))
						h8=$(this).offset().top-200;
					else
						h8=$(this).offset().top-150;
			});
			$(".con").each(function(){
				var top =scrollTop+120; 
				if(top<h1 ){
					delOldClass();
					addMenuActive(0);
				}else if(top>=h1 &&top<h2){
					delOldClass();
					addMenuActive(1);
				}else if(top>=h2 &&top<h3){
					delOldClass();
					addMenuActive(2);
				}else if(top>=h3 &&top<h4){
					delOldClass();
					addMenuActive(3);
				}else if(top>=h4 &&top<h5){
					delOldClass();
					addMenuActive(4);
				}else if(top>=h5 &&top<h6){
					delOldClass();
					addMenuActive(5);
				}else if(top>=h6 &&top<h7){
					delOldClass();
					addMenuActive(6);
				}else if(top>=h7 &&top<h8){
					delOldClass();
					addMenuActive(7);
				}else{
					delOldClass();
					addMenuActive(8);
				}
			});
			}else{isMenuClicked=true;}
		});
}
/**提交审核：检查所有必填项，并显示相应的提示信息
 * submit void
 * @author wangjialin
 * 2016-10-13 下午5:19:23
 */
function submit(){
	var statueMap = getStatueMap();
	var statue = statueMap.access_status;
	if(statue == 2){//已提交
		var txt=  "当前状态已为提交状态，不可重复提交。";
		window.wxc.xcConfirm(txt, "info");
		statueShow(statueMap);
		return;
	}
	var tipArray = new Array();
	tipArray.push(saveBaseInfo("#saveBaseInfo"));//1
	tipArray.push(saveTradeInfo("#saveTradeInfo"));//2
	tipArray.push(saveLinkedInfo("#saveLinkedInfo"));//3
	tipArray.push(saveProductInfo("#saveProductInfo"));//4
	tipArray.push(saveWinInfo("#saveWinInfo"));//5
	tipArray.push(saveScaleInfo("#saveScaleInfo"));//6
	tipArray.push(saveDeviceInfo("#saveDeviceInfo"));//7
	tipArray.push(saveCooperationInfo("#saveCooperationInfo"));//8
	tipArray.push(saveCertificateInfo("#saveCertificateInfo"));//9
	
	var submitFlag = true;
	for(var i in tipArray){//未填写正确的模块，变为编辑模式
		switch (tipArray[i]){
			case 1:
			{
				$("#saveBaseInfo").parents(".forEdit").css("display","block");
				$("#saveBaseInfo").parents(".forEdit").next(".forRead").css("display","none");
				submitFlag = false;
				break;
			}
			case 2:
			{
				$("#saveTradeInfo").parents(".forEdit").css("display","block");
				$("#saveTradeInfo").parents(".forEdit").next(".forRead").css("display","none");
				submitFlag = false;
				break;
			}
			case 3:
			{
				$("#saveLinkedInfo").parents(".forEdit").show();
				$("#saveLinkedInfo").parents(".forEdit").next(".forRead").hide();
				submitFlag = false;
				break;
			}
			case 4:
			{
				$("#saveProductInfo").parents(".forEdit").show();
				$("#saveProductInfo").parents(".forEdit").next(".forRead").hide();
				submitFlag = false;
				break;
			}
			case 5:
			{
				$("#saveWinInfo").parents(".forEdit").show();
				$("#saveWinInfo").parents(".forEdit").next(".forRead").hide();
				submitFlag = false;
				break;
			}
			case 6:
			{
				$("#saveScaleInfo").parents(".forEdit").show();
				$("#saveScaleInfo").parents(".forEdit").next(".forRead").hide();
				submitFlag = false;
				break;
			}
			case 7:
			{
				$("#saveDeviceInfo").parents(".forEdit").show();
				$("#saveDeviceInfo").parents(".forEdit").next(".forRead").hide();
				submitFlag = false;
				break;
			}
			case 8:
			{
				$("#saveCooperationInfo").parents(".forEdit").show();
				$("#saveCooperationInfo").parents(".forEdit").next(".forRead").hide();
				submitFlag = false;
				break;
			}
			case 9:
			{
				$("#saveCertificateInfo").parents(".forEdit").show();
				$("#saveCertificateInfo").parents(".forEdit").next(".forRead").hide();
				submitFlag = false;
				break;
			}
			default:
				break;
		}
	}
	if(submitFlag == false){
		return;
	}	
	
	var url = "supplierFiles/vipAccessApplication.do";
	var params = {};
	params.submit_id = companyId;
	params.receive_id = 9999;//泰普森集团
	var fn = function(result){//无操作
		$(".con .main .edit,.con .main .save").css({
			border:"0px solid #000",
			background:"#f7f7f7",
			color:"#999999"
		});
		$(".con .main .edit,.con .main .save").prop("disabled",true);
			$("#submit_btn").css({
 				background:"#e6e6e6",
 				color:"#999"
 			}).html("已提交审核");
 			$("#submit_btn").prop("onclick",null).off("click").show();
 			$("#submit_time").html((new Date()).Format("yyyy-MM-dd HH:mm:ss"));
 			$("#crrent_status").html("已提交").css("color","#365c87");
 			$("#submit_time_wrap").show();
 			
 			$(".form_tip .tipName span:first").html("所需材料：");
 			$(".form_tip .tipName span:last").html("");
 			$(".form_tip .tipList div:first").html("1.营业执照（照片）；税务登记证（照片）；组织机构代码证（照片）；纳税人资格证书（照片）；");
 			$(".form_tip .tipList div:last").html("2.设备清单，银行账户信息及发票信息。");
 			$(".form_tip").css("color","#365c87");
 			
 			$(".title .rightnow").html("");
	};
	if(statue != 2){//已提交
		asyncAjaxMethod(url,params,false,fn);
	}
}

/**
 * 保存验证提交
 * saveSubmit
 * @param thisEvent
 * @returns {Boolean} Boolean 是否验证通过
 * @author mishengliang
 * 2016-10-19 上午11:25:14
 */
function saveSubmitValid(thisEvent){
	$(thisEvent).parents(".forEdit").find(".info_explain").css("display","none");
	var flag=true;
	/**
	 * input框必填检查
	 */
	$(thisEvent).parents(".forEdit").find(".input_must").each(function(){
		var v=$(this).val();
		if(v==''){
			$(this).parents(".item").find(".info_explain").show();
			$(this).css("border","1px solid red");
			flag=false;
		}else{
			$(this).css("border","1px solid #ccc");
		}
	});
	$(thisEvent).parents(".forEdit").find(".addressDetailMust").each(function(){
		var v=$(this).val();
		if(v==''){
			$(this).parent().parent().prev(".item").find(".info_explain").show();
			$(this).css("border","1px solid red");
			flag=false;
		}else{
			$(this).css("border","1px solid #ccc");
		}
	});
	/**
	 * 单选框必填检查
	 */
	if($(thisEvent).parents(".forEdit").find('input:radio[name="pattern"]').length > 0 && ! $(thisEvent).parents(".forEdit").find('input:radio[name="pattern"]').is(":checked")){
		 $(thisEvent).parents(".forEdit").find('input:radio[name="pattern"]').parent().parent().next(".info_explain").show();
		 flag=false;
	}else{
		 $(thisEvent).parents(".forEdit").find('input:radio[name="pattern"]').parent().parent().next(".info_explain").hide();
	}
	/**
	 * 下拉选择框必填检查
	 */
	$(thisEvent).parents(".forEdit").find(".select_must").each(function(){
		var txt=$(this).find("input").val();
		if(txt==''|| txt==undefined){
			$(this).parents(".item").find(".info_explain").show();
			$(this).css("border","1px solid red");
			flag=false;
		}
	});
	/**
	 * 供应品类必填检查
	 */
	if($(thisEvent).parents(".forEdit").find(".allSorts").length>0){
		if($(thisEvent).parents(".forEdit").find(".allSorts").children().length>0){
			$(thisEvent).parents(".forEdit").find(".sortChoosed").parent().next().find(".info_explain").hide();
		}else{
			flag=false;
			$(thisEvent).parents(".forEdit").find(".sortChoosed").parent().next().find(".info_explain").show();
		}
	}
	/**
	 * 判断所需图片是否全部上传
	 */
	var picNum = 0;
	$(thisEvent).parents(".forEdit").find(".pictures").each(function(){
		var pic=$(this).find("a img").attr("src");
		if(pic=="/vip/resources/images/applyAccess/imgBg.png"){
			picNum++;
		}
		if(picNum == 4){//全部为默认图片，即没有上传任何图片
			flag=false;
			$(this).parents(".item").find(".info_explain").show();
		}
	});
	return flag;
}


/**添加:交易信息、产品信息处的增加
 * add
 * @param e
 * @param i void
 * @author wangjialin
 * 2016-10-14 下午5:10:33
 */
function add(e,i){
	var t=true;
	var flag=true;
	$(e).parents(".item").find(".part").each(function(){
		$(this).find("input[type='text']").each(function(index,obj1){
			if($(obj1).val()==''){
				t=false;
				$(obj1).css("border","1px solid red");
			}else{
				$(obj1).css("border","1px solid #ccc");
			}
		});
		$(this).find(".bankcard").each(function(index,obj2){
			if(!bankcard_reg.test($(obj2).val())){
				flag=false;
				$(obj2).css("border","1px solid red");
			}else{
				$(obj2).css("border","1px solid #ccc");
			}
		});
	});
	if(t){
		switch (i){
			case 1://银行信息
				if(flag){
					var parts=$("#bank").children(".part");
					var str='<div class="clearfix part mt10">'
								+'<div class=" f_l">'
									+'<input type="text" class="inputWrap2 input_must" autocomplete="off">'
									+'<input type="text" class="inputWrap2 input_must bankcard ml10" autocomplete="off">'
									+'<input type="hidden" class="account_id" value="-1" autocomplete="off">'
								+'</div>'
								+'<div class="f_l ml10" style="height:40px;line-height:40px;">'
									+'<div class="inputRadio f_l"><input type="radio"  onclick="setDefault(this)" name="setDefault">设为默认</div>'
									+'<div class="defaultAccount f_l hide">默认账号</div>'
									+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,1)">'
									+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,1)">'
								+'</div>'
							+'</div>';
					parts.last().after(str);
					$(e).remove();
					onBlurTest();
				}else{
					$(e).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的开户账号');
					$(e).parents(".item").find(".info_explain").show();
//					$(e).parents(".part").find(".bankcard").css("border","1px solid red");
				}
				break;
			case 2://发票信息
				var parts=$("#invoice").children(".part");
				var str='<div class="clearfix mt10 part">'
							+'<div class=" f_l">'
								+'<input type="text" placeholder="请输入发票信息" class="inputWrap input_must" autocomplete="off">'
								+'<input type="hidden"class="invoice_title_id" value="-1">'
							+'</div>'
							+'<div class="f_l ml20" style="height:40px;line-height:40px;">'
								+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,2)">'
								+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,2)">'
							+'</div>'
						+'</div>';
				parts.last().after(str);
				$(e).remove();
				onBlurTest();
				break;
			case 3://主要销售产品及品牌
				var parts=$("#saleProduct").children(".part");
//				$("#saleProduct").find(".info_explain").remove();
				var str='<div class="clearfix mt10 part">'
							+'<div class="clearfix f_l">'
								+'<div class="f_l"><input type="text" placeholder="产品名称" class="inputWrap5 input_must" autocomplete="off"></div>'
								+'<div class=" f_l ml10"><input type="text" placeholder="品牌名称" class="inputWrap5" autocomplete="off"></div>'
								+'<input type="hidden" class="saleId" value="-1">'
							+'</div>'
							+'<div class="f_l ml10" style="height:40px;line-height:40px;">'
								+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,3)">'
								+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,3)">'
							+'</div>'
						+'</div>';
//				$("#saleProduct").append(str);
				parts.last().after(str);
				$(e).remove();
				onBlurTest();
				break;
			case 4://主要原材料及品牌
				var parts=$("#material").children(".part");
//				$("#material").find(".info_explain").remove();
				var str='<div class="clearfix part mt10">'
							+'<div class="clearfix f_l">'
								+'<div class=" f_l"><input type="text" placeholder="材料名称" class="inputWrap5 input_must" autocomplete="off"></div>'
								+'<div class=" f_l ml10"><input type="text" placeholder="材料品牌" class="inputWrap5" autocomplete="off"></div>'
								+'<input type="hidden" class="materialId" value="-1">'
							+'</div>'
							+'<div class="f_l ml10" style="height:40px;line-height:40px;">'
								+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,4)">'
								+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,4)">'
							+'</div>'
						+'</div>';
//				$("#material").append(str);
				parts.last().after(str);
				$(e).remove();	
				onBlurTest();
				break;
			case 5://主要竞争对手
				var parts=$("#competitor").children(".part");
				var str='<div class="clearfix part mt10">'
							+'<div class=" f_l">'
								+'<input type="text" class="inputWrap input_must" autocomplete="off">'
								+'<input type="hidden" class="competitor_id" value="-1">'
							+'</div>'
							+'<div class="f_l ml10" style="height:40px;line-height:40px;">'
								+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,5)">'
								+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,5)">'
							+'</div>'
						+'</div>';
				parts.last().after(str);
				$(e).remove();
				onBlurTest();
				break;
			case 6://主要客户
				var parts=$("#customer").children(".part");
				var str='<div class="clearfix part mt10">'
						+'<div class=" f_l">'
							+'<input type="text" class="inputWrap" autocomplete="off">'
							+'<input type="hidden" class="customer_id" value="-1">'
						+'</div>'
						+'<div class="f_l ml10" style="height:40px;line-height:40px;">'
							+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,6)">'
							+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,6)">'
						+'</div>'
					+'</div>';
				parts.last().after(str);
				$(e).remove();
				onBlurTest();
				break;
		}
	}else{
		$(e).parents(".item").find(".info_explain").show();
	}
}

/**规模能力处添加
 * scalepowerAdd
 * @param e
 * @param i void
 * @author wangjialin
 * 2016-10-17 下午1:51:58
 */
function scalepowerAdd(e,i){
	var t=true;
	var v1=$(e).parents(".part").find(".left input").val();
	var v2=$(e).parents(".part").find(".right input").val();
	if(v1!='' && v2!='')
		t=true;
	else
		t=false;
	if(t){
		switch (i){
			case 1:
				var parts=$("#other_person").children(".part");
//				var arr=[];
//				for(var j=0;j<=parts.length;j++){//将以选择的选项放到数组arr中
//					arr[j]=parts.eq(j).find(".left input").val();
//				}
				if(int_reg.test(v2)){
					var str='<div class="clearfix part mt10">'
						+'<div style="width:350px;" class="clearfix f_l">'
							+'<div class="selectWrap2 clearfix f_l">'
								+'<div class="posR f_l" >'
								+'<div class="clearfix left" onclick="showSelect(this)"><span class="c999 fNormal" value="">请选择</span>'
									+'<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5">'
								+'</div>'
								+'<ul class="otherPeopleList posA hide">'
								+'<li value="1" onclick="selectOption(this)">研发人员</li>'
								+'<li value="2" onclick="selectOption(this)">操作工</li>'
								+'<li value="3" onclick="selectOption(this)">专职检验</li>'
								+'<li value="4" onclick="selectOption(this)">间接员工</li>'
								+'<li value="5" onclick="selectOption(this)">内审人员</li>'
								+'</ul>'
							+'</div>'
							+'<div class="right f_l"><input type="text" autocomplete="off"  class="people_num"></div>'
							+'</div>'
							+'<div class="f_l ml10 unit">人</div>'
							+'</div>'
							+'<div class="f_l ml10 op_img" style="height:40px;line-height:40px;">'
								+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this)">'
								+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml20 plus" onclick="scalepowerAdd(this,1)">'
							+'</div>'
						+'</div>'
					+'</div>';
					parts.last().after(str);
					$(e).remove();
					onBlurTest();
//					$("#other_person").children(".part").last().find(".otherPeopleList li").each(function(){//遍历新添加的下拉列表选项，若已选择则将该选项隐藏
//						v=$(this).val();
//						for(var k=0;k<arr.length;k++){
//							if(v==arr[k])
//								$(this).css("display","none");
//						}
//					});
					if($("#other_person").children(".part").length==5){
						$("#other_person").children(".part").last().find(".plus").hide();
					}
				}else{
					$(e).parents(".item").find(".info_explain").show();
				}
				break;
			case 2:
				var parts=$("#person_structure").children(".part");
//				var arr=[];
//				for(var j=0;j<parts.length;j++){//将以选择的选项放到数组arr中
//					arr[j]=parts.eq(j).find(".left input").val();
//				}
				if(int_reg.test(v2)){
					var str='<div class="clearfix part mt10">'
								+'<div style="width:350px;" class="clearfix f_l">'
									+'<div class="selectWrap2 clearfix f_l">'
										+'<div class="posR f_l" >'
											+'<div class="clearfix left" onclick="showSelect(this)"><span class="c999 fNormal" value="">请选择</span>'
												+'<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5">'
											+'</div>'
											+'<ul class="personStructureList posA hide">'
											+'<li value="1" onclick="selectOption(this)">大专及以上</li>'
											+'<li value="3" onclick="selectOption(this)">大专以下</li>'
											+'</ul>'
										+'</div>'
										+'<div class="right f_l"><input type="text" autocomplete="off"  class="people_num"></div>'
									+'</div>'
									+'<div class="f_l ml10 unit">人</div>'
								+'</div>'
								+'<div class="f_l ml10 op_img" style="height:40px;line-height:40px;">'
									+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this)">'
									+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml20 plus"  onclick="scalepowerAdd(this,2)">'
								+'</div>'
							+'</div>';
					parts.last().after(str);
					$(e).remove();
					onBlurTest();
//					$("#person_structure").children(".part").last().find(".personStructureList li").each(function(){//遍历新添加的下拉列表选项，若已选择则将该选项隐藏
//						v=$(this).val();
//						for(var k=0;k<arr.length;k++){
//							if(v==arr[k])
//								$(this).css("display","none");
//						}
//					});
					if($("#person_structure").children(".part").length==2){
						$("#person_structure").children(".part").last().find(".plus").hide();
					}
				}else{
					$(e).parents(".item").find(".info_explain").show();
				}
				break;
		}
	}
}

/**设备清单处添加
 * addMachineList
 * @param e void
 * @author wangjialin
 * 2016-10-21 下午4:49:23
 */
function addMachineList(e){
	var  t=true;
	var flag=true;
	var simble=true;
//	$("#machineInfoForEdit").find(".input_must").each(function(){
//		if($(this).val()==''){
//			$(this).css("border","1px solid red");
//			t=false;
//		}else{
//			$(this).css("border","1px solid #ccc");
//		}
//	});
	$(e).parents(".item").find(".part").each(function(){
		$(this).find(".input_must").each(function(index,object){
			if($(object).val()==''){
				t=false;
				$(object).css("border","1px solid red");
			}else{
				$(object).css("border","1px solid #ccc");
			}
		});
		if($(this).find(".machinePrice").val()!=''){
			if(!num_reg.test($(this).find(".machinePrice").val())){
				flag=false;
				$(this).find(".machinePrice").css("border","1px solid red");
			}else{
				$(this).find(".machinePrice").css("border","1px solid #ccc");
			}
		}
		if($(this).find(".machineAmount").val()!=''){
			if(!num_reg.test($(this).find(".machineAmount").val())){
				simble=false;
				$(this).find(".machineAmount").css("border","1px solid red");
			}else{
				$(this).find(".machineAmount").css("border","1px solid #ccc");
			}
		}
	});
	
	if(t){
		if(flag){
			if(simble){
				var parts=$(".machineInfo .item").children(".part");
				var str='<div class="clearfix part mt10">'
							+'<div class="f_l">'
								+'<input type="text" class="machineName wrap3 f_l input_must" autocomplete="off" >'
								+'<input type="text" class=" wrap1 f_l" autocomplete="off">'
								+'<input type="text" class=" wrap2 f_l" autocomplete="off">'
								+'<input type="text" class=" wrap1 f_l machinePrice" autocomplete="off">'
								+'<input type="text" class="Wdate wrap3 f_l" onclick="WdatePicker({maxDate:\'%y-%M-%d\',readOnly:true})" autocomplete="off" >'
								+'<input type="text" class="machineAmount wrap1 f_l input_must" autocomplete="off" >'
								+'<input type="text" class=" wrap1 f_l" autocomplete="off">'
								+'<input type="hidden" class="device_id" value="-1">'
							+'</div>'
							+'<div class="f_l ml10" style="height:40px;line-height:40px;">'
								+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,7)">'
								+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="addMachineList(this)">'
							+'</div>'
						+'</div>';
				parts.last().after(str);
				$(e).parents(".item").find(".info_explain").hide();
				$(e).parents(".part").find(".machineName,.machinePrice,.machineAmount").css("border","1px solid #ccc");
				$(e).remove();
				onBlurTest();
			}else{
				$(e).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备数量');
				$(e).parents(".item").find(".info_explain").show();
//				$(e).parents(".part").find(".machineAmount").css("border","1px solid red");
			}
		}else {
			$(e).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备金额');
			$(e).parents(".item").find(".info_explain").show();
		}
	}else{
		$(e).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和设备数量不可为空');
		$(e).parents(".item").find(".info_explain").show();
//		$(e).parents(".part").find(".machineAmount,.machineName").css("border","1px solid red");
	}
}

/**删除
 * del
 * @param e void
 * @author wangjialin
 * 2016-10-14 下午5:10:14
 */
function del(e,i){
	switch(i){
		case 1://银行信息
			bankAccount_delIds.push($(e).parents(".part").find("input[type=hidden]").val());
			break;
		case 2://发票信息
			invoiceTitle_delIds.push($(e).parents(".part").find("input[type=hidden]").val());
			break;
		case 3://销售及品牌
			goods_delIds.push($(e).parents(".part").find("input[type=hidden]").val());
			break;
		case 4://材料及品牌
			material_delIds.push($(e).parents(".part").find("input[type=hidden]").val());
			break;
		case 5://竞争对手
			competitor_delIds.push($(e).parents(".part").find("input[type=hidden]").val());
			break;
		case 6://主要客户
			customer_delIds.push($(e).parents(".part").find("input[type=hidden]").val());
			break;
		case 7://设备清单
			deviceIds.push($(e).parents(".part").find("input[type=hidden]").val());
			break;
		default:
			break;
	}
	var num=$(e).parents(".item").find(".part").length;
	if(num==1){
		$(e).parents(".part").find("input").val("");
		$(e).parents(".part").find("input[type=hidden]").val("-1");
		$(e).parents(".part").find("input").css("border","1px solid #ccc");
		$(e).parents(".item").find(".info_explain").css("display","none");
	}else{
		var id=$(e).parents(".item").prop("id");
		if($(e).next()!=null)
			var obj=$(e).next().prop("outerHTML");
		$(e).parents(".part").prev().children().eq(1).append(obj);
		$(e).parents(".part").prev().children().eq(1).children().last().css("display","inline-block");
		$(e).parents(".part").remove();
		if(id=='bank'){
			var s=true;
			$("#bank .input_must").each(function(){
				if($(this).val()!=''){
					$(this).css("border","1px solid #ccc");
				}else{
					s=false;
					$(this).css("border","1px solid red");
					$("#bank .info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空');
					$("#bank .info_explain").show();
				}
			});
			if(s){
				$("#bank .bankcard").each(function(){
					if(bankcard_reg.test($(this).val())){
						$(this).css("border","1px solid #ccc");
						$("#bank .info_explain").hide();
					}else{
						$(this).css("border","1px solid red");
						$("#bank .info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的银行账号');
						$("#bank .info_explain").show();
					}
				});
			}
		}else if(id=='invoice' || id=='saleProduct' || id=='material' || id=='competitor'||id=='customer'){
			var flag=true;
			$("#"+id).find("input[type='text']").each(function(){
				if($(this).val()!=''){
					$(this).css("border","1px solid #ccc");
				}else{
					flag=false;
					$(this).css("border","1px solid red");
					$("#"+id+" .info_explain").show();
				}
				if(flag)
					$("#"+id+" .info_explain").hide();
			});
			
		}else if(id=="other_person" || id=="person_structure"){
			$("#"+id).find(".part").last().find(".plus").show();
		}else if(id=='machineList'){
			var t=true;
			$("#machineList .input_must").each(function(){
				if($(this).val()!=''){
					$(this).css("border","1px solid #ccc");
				}else{
					t=false;
					$("#machineList .info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和设备数量不可为空');
					$("#machineList .info_explain").show();
				}
			});
			if(t){
				var f=true;
				$("#machineList .machineAmount").each(function(){
					if(int_reg.test($(this).val())){
						$(this).css("border","1px solid #ccc");
//						$("#machineList .info_explain").hide();
					}else{
						f=false;
						$(this).css("border","1px solid red");
						$("#machineList .info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备数量');
						$("#machineList .info_explain").show();
					}
				});
			}
			if(f){
				$("#machineList .machinePrice").each(function(){
					var o=true;
					if($(this).val()!=''){
						if(num_reg.test($(this).val())){
							$(this).css("border","1px solid #ccc");
						}else{
							o=false;
							$(this).css("border","1px solid red");
							$("#machineList .info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备价格');
							$("#machineList .info_explain").show();
						}
					}else{
						$("#machineList .info_explain").hide();
					}
					if(o)
						$("#machineList .info_explain").hide();
				});
			}
		}
		
	}
	
}

/**规模能力处其他人员、人员选择操作时隐藏已选的选项
 * checkChosed void
 * @author wangjialin
 * 2016-12-12 上午10:15:23
 */
function checkChoosed(id,name,index){
	var parts=$("#"+id).children(".part");
	var arr=[];
	for(var j=0;j<parts.length;j++){//将以选择的选项放到数组arr中
		arr[j]=parts.eq(j).find(".left input").val();
	}
	$("#"+id).children(".part").eq(index).find("."+name).find("li").each(function(t,element){//遍历新添加的下拉列表选项，若已选择则将该选项隐藏
		var v=$(element).val();
		for(var k=0;k<arr.length;k++){
			if(v==arr[k]){
				$(element).css("display","none");break;
			}else{
				$(element).css("display","block");
			}
			
		};
	});
}

/**实时统计输入的字数
 * checkLen
 * @param obj void
 * @author wangjialin
 * 2016-10-17 下午1:51:39
 */
function checkLen(obj){ 
	var num=$(obj).val().length;
	var x=400-num;
	if(x<0){
		var char = $(obj).val();
		var content = char.slice(0,400);
		$(obj).val(content);
		$(obj).next().find(".residue").html(0);
	}else{
		$(obj).next().find(".residue").html(x);	
	}
} 


/**
 * 保存基本信息
 * saveBaseInfo 
 * @author mishengliang
 * 2016-10-18 下午4:38:32
 */
function saveBaseInfo(thisEvent){
	if(!saveSubmitValid(thisEvent)){
		return 1;
	}
	
	var baseFlag = true;
	if($("#reg_fund").val()!=''){//校验
		if(!num_reg.test($("#reg_fund").val())){
			baseFlag=false;
			$("#reg_fund").parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的金额');
			$("#reg_fund").parents(".item").find(".info_explain").show();
			$("#reg_fund").css("border","1px solid red");
			return 1;
		}
	}
	
	//获取基本数据
	var companyName = $("#companyNameForEdit").val();
	var natureId = $("#nature_id").find("input").val();//企业类型
	var industryId = $("#industry_id_wrap input[name=pattern]:checked").val();//经营模式
	var classId = $("#class_id").find("input").val();//所属行业
	var keyRemark = $("#key_remark").val();//主营业务
	var corporation = $("#corporation").val();//法人代表
	var currencyId = $("#currency_id").find("input").val();//币种
	var regFund = $("#reg_fund").val();
	var establishDt = $("#establish_dt").val();
	
	var url = "supplierForPlateForm/updateSupplierInfoByCompanyIdForVIP.do";
	var params = {};
	params.companyId = companyId;
	params.cpynameCn = companyName;//公司名称
	params.companyNature = natureId;//企业类型
	params.industryName = industryId;//经营模式
	params.companyClass = classId;//公司所属行业
	params.companyMainBussiness = keyRemark;//公司主营业务
	params.companyCorporate = corporation;//公司法人代表
	params.currency = currencyId;//公司注册资本币种
	params.companyRegFund = regFund;//公司注册资本
	params.companyEstablishDt = establishDt;//公司成立日期
	params.attched = doAttched(thisEvent);
	params.receiveId = 9999;
	params.isVip = "isVip";
	
	var isasync = false;
	var fn = function(result){
		editTurnShow(thisEvent);
		deleteTaskFiles();//删除已删除的附件
		
		//将数据更新到展示页面
	 	$("#companyNameForRead").html(companyName);//企业名称
	 	$("#keyRemarkForRead").html(keyRemark);//主营业务
	 	$("#corporationForRead").html(corporation);//法人代表
	 	$("#regFundForRead").html(regFund).parent().show();//注册资本
	 	$("#regFundForRead").parents(".span_con").find(".noinfo").hide();//注册资本
	 	$("#establishDtForRead").html(establishDt);//成立日期
	 	$("#companyTypeForRead").html($("#companyTypeList").find("li[value="+ natureId +"]").text()); 
	 	$("#classForRead").html($(".industryList").find("li[value="+ classId +"]").text());
	 	$("#moneyTypeForRead").html($("#reg_fund_money_type").find("li[value="+ currencyId +"]").text());
	 	$("#industryForRead").html($("#industry_id_wrap input[name=pattern]:checked").parent().text());
	 	
		picPathSrc(18,"#business_licence_read","onlyRead");//营业执照  
		picPathSrc(19,"#tax_registration_certificate_read","onlyRead");//税务登记
		picPathSrc(20,"#organization_code_certificate_read","onlyRead");//组织机构代码证
		picPathSrc(21,"#taxpayer_qualification_certification_read","onlyRead");//纳税人资格证书 
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

/**
 * 交易信息
 * saveTradeInfo
 * @param thisEvent
 * @author mishengliang
 * 2016-10-21 上午9:14:01
 */
function saveTradeInfo(thisEvent){
	if(!saveSubmitValid(thisEvent)){
		return 2;
	}
	var tradeFlag = true;
	$(".bankcard").each(function(){
		if($(this).val()!=''){
			if(!bankcard_reg.test($(this).val())){
				tradeFlag=false;
				$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的开户账号');
				$(this).parents(".item").find(".info_explain").show();
				$(this).css("border","1px solid red");
			}
		}
	});
	if(!tradeFlag){
		return 2;
	}
	if(! $(thisEvent).parents(".forEdit").find('input:radio[name="setDefault"]').is(":checked")){
		$(thisEvent).parents().find("#bank").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请设置默认账号');
		$(thisEvent).parents().find("#bank").find(".info_explain").show();
		return 2;
	}else{
		$(thisEvent).parents().find("#bank").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空');
		$(thisEvent).parents().find("#bank").find(".info_explain").hide();
	}
	
	//获取基本数据
	var url = "supplierForPlateForm/updateSupplierInfoByCompanyIdForVIP.do";
	var params = {};
	params.companyId = companyId;
	params.bankAccount = doBankAccount();//银行账号
	params.invoiceTilte = doInvoiceTitle();//发票抬头
	params.receiveId = 9999;
	params.isVip = "isVip";
	
	var isasync = true;
	var fn = function(result){
		editTurnShow(thisEvent);
		delBankAccountById();
		delInvoiceTitleById();
		
		//修改后的信息同步到展示界面
		//展示银行账号
		bankAccount = JSON.parse("["+params.bankAccount+"]");
		if(!bankAccount){//bankAccount无数据
		}else if(bankAccount.length != 0){
			var bankShowForRead = "";
	 		for(var i = 0;i<bankAccount.length;i++){
	 			//单独展示界面
	 			var defaultAccount = bankAccount[i].defaultId == 1 ? "<td class='regular '>默认账号</td>":"";
	 			bankShowForRead += "<tr>"
										+"<td class='f14'>"+ bankAccount[i].accountName +"</td>"
										+"<td class='f14'>"+ bankAccount[i].accountCode +"</td>"
										+ defaultAccount
									+"</tr>";
			} 
	 		$(".bankList").html(bankShowForRead);
		}
		
		//展示发票抬头
		invoiceTitles = JSON.parse("["+params.invoiceTilte+"]");
		if(!invoiceTitles){//抬头发票无数据
		}else if(invoiceTitles.length != 0){
			var invoiceShowForRead = "";
			for(var i = 0;i<invoiceTitles.length;i++){
	 			//展示界面
	 			var defaultAccount = invoiceTitles[i].defaultId == 1 ? "<span class='regular' style='margin-left:20px;'>默认账号</span>":"";
	 			invoiceShowForRead += "<li>"
							 			+"<span>"+ invoiceTitles[i].invoiceTitleName +"</span>"
							 			+defaultAccount
						 			+"</li>";
			} 
			$(".invoiceList").html(invoiceShowForRead);
		}
		
		$("#tradeInfoForRead .now_edit").hide();
		$("#tradeInfoForRead .main").show();
		updateTradeEditContent();
	};
	asyncAjaxMethod(url,params,isasync,fn);	
}

function updateTradeEditContent(){
	var url = "supplierForPlateForm/getTradeInfo.do";
	var params = {};
	params.companyId = companyId;
	var fn = function(result){//无操作
		var compnayExtraInfo = result.data.compnayExtraInfo;//公司附加信息
		//展示银行账号
		bankAccount = compnayExtraInfo.bankAccount;
		if(!compnayExtraInfo.bankAccount){//bankAccount无数据
		}else if(compnayExtraInfo.bankAccount.length != 0){
			var newStr ='<div class="clearfix part">'
							+'<div class=" f_l">'
								+'<input type="text" class="inputWrap2 input_must" autocomplete="off">'
								+'<input type="text" class="inputWrap2 input_must ml10 bankcard" autocomplete="off">'
								+'<input type="hidden" class="account_id" value="-1">'
							+'</div>'
							+'<div class="f_l ml10" style="height:40px;line-height:40px;">'
								+'<div class="inputRadio f_l"><input type="radio"  onclick="setDefault(this)" name="setDefault">设为默认</div>'
								+'<div class="defaultAccount f_l hide">默认账号</div>'
								+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,1)">'
								+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,1)" class="plus">'
							+'</div>'
						+'</div>'
						+'<div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空</div>';
			$("#bank").html(newStr);
			
	 		for(var i = 0;i<compnayExtraInfo.bankAccount.length;i++){
	 			$("#bank .part:last input").eq(0).val(bankAccount[i].account_name);
	 			$("#bank .part:last input").eq(1).val(bankAccount[i].account_code);
	 			$("#bank .part:last input").eq(2).val(bankAccount[i].account_id);
	 			if(bankAccount[i].default_id == 1){
	 				$("#bank .part:last input").eq(3).prop("checked",true);
	 			}
	 			if(i<compnayExtraInfo.bankAccount.length-1){
	 				$("#bank .part:last").find("img:last").trigger("click");//点击生成新的一行
	 			}
			} 
		}
		
		//展示发票抬头
		invoiceTitles = compnayExtraInfo.invoiceTitles;
		if(!compnayExtraInfo.invoiceTitles){//抬头发票无数据
		}else if(compnayExtraInfo.invoiceTitles.length != 0){
			var newStr = '<div class="clearfix part">'
							+'<div class=" f_l">'
								+'<input type="text" placeholder="请输入发票信息" class="inputWrap input_must" autocomplete="off">'
								+'<input type="hidden" class="invoice_title_id" value="-1">'
							+'</div>'
							+'<div class="f_l ml20" style="height:40px;line-height:40px;">'
								+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,2)">'
								+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,2)" class="plus">'
							+'</div>'
						+'</div>'
						+'<div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">发票信息不可为空</div>';
			$("#invoice").html(newStr);
			for(var i = 0;i<compnayExtraInfo.invoiceTitles.length;i++){
				$("#invoice .part:last input").eq(0).val(invoiceTitles[i].invoice_title_name);
				$("#invoice .part:last input").eq(1).val(invoiceTitles[i].invoice_title_id);
	 			if(i<compnayExtraInfo.invoiceTitles.length-1){
	 				$("#invoice .part:last").find("img:last").trigger("click");//点击生成新的一行
	 			}
			} 
		}
	};
	asyncAjaxMethod(url,params,false,fn);
}

/**
 * 保存联系信息
 * saveLinkedInfo
 * @param thisEvent void
 * @author mishengliang
 * 2016-10-20 下午1:48:43
 */
function saveLinkedInfo(thisEvent){
	if(!saveSubmitValid(thisEvent)){
		return 3;
	}
	
	if($("#fPhone_front").val()!=''&& $("#fPhone_behind").val()!=''){
		var phone=$("#fPhone_front").val()+'-'+$("#fPhone_behind").val();
		if(!phone_reg.test(phone)){
			flag=false;
			$("#fPhone_front").parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的电话号码');
			$("#fPhone_front").parents(".item").find(".info_explain").show();
			$("#fPhone_front,#fPhone_behind").css("border","1px solid red");
			return 3;
		}
	}
	if($("#mPhone").val()!=''){
		if(!mphone_reg.test($("#mPhone").val())){
			flag=false;
			$("#mPhone").next().show();
			$("#mPhone").css("border","1px solid red");
			return 3;
		}
	}
	if($("#email").val()!=''){
		if(!email_reg.test($("#email").val())){
			flag=false;
			$("#email").next().show();
			$("#email").css("border","1px solid red");
			return 3;
		}
	}
	if($("#lng").val()==''){
		$(".location_map").next().show();
		return 3;
	}
	if($("#lat").val()==''){
		$(".location_map").next().show();
		return 3;
	}
	
	//获取基本数据
	var fPhone = $("#fPhone_front").val()+"-"+$("#fPhone_behind").val();//联系电话
	var contactAddr= $("#contactAddr").val();
	var contactAddrCode= $("#county").val();
	var lng=$("#lng").val();
	var lat=$("#lat").val();
	var contacts= $("#contacts").val();
	var mPhone= $("#mPhone").val();
	var fax= $("#fax").val();
	var email= $("#email").val();
	var contactAddrCode= $("#county").find("input").val();//县级地址
	
	var url = "supplierForPlateForm/updateSupplierInfoByCompanyIdForVIP.do";
	var params = {};
	
	params.companyId = companyId;
	params.fPhone = fPhone;
	params.contactAddr = contactAddr;
	params.contactAddrCode = contactAddrCode;
	params.lng = lng;
	params.lat = lat;
	params.contacts = contacts;
	params.mPhone = mPhone;
	params.fax = fax;
	params.email = email;
	params.receiveId = 9999;
	params.isVip = "isVip";
	
	var isasync = true;
	var fn = function(result){
		editTurnShow(thisEvent);//转换为保存状态
		//将保存信息显示到展示界面
	 	$("#fPhoneForRead").html(fPhone);
	 	if(contacts != ""){//为空时 显示未填写
	 		console.log(contacts);
	 		$("#contactsForRead").html(contacts);//联系人
	 		$("#contactsForRead").parents(".span_con").find(".noinfo").hide();
	 	}else{
			$("#contactsForRead").html("");
			$("#contactsForRead").parents(".span_con").find(".noinfo").show();
	 	}
	 	if(mPhone != ""){
	 		$("#mPhoneForRead").html(mPhone);//联系人手机
	 		$("#mPhoneForRead").parents(".span_con").find(".noinfo").hide();
	 	}else{
			$("#mPhoneForRead").html("");
			$("#mPhoneForRead").parents(".span_con").find(".noinfo").show();
	 	}
	 	if(fax != ""){
	 		$("#faxForRead").html(fax);//传真号
	 		$("#faxForRead").parents(".span_con").find(".noinfo").hide();
	 	}else{
			$("#faxForRead").html("");
			$("#faxForRead").parents(".span_con").find(".noinfo").show();
	 	}
	 	if(email != ""){
	 		$("#emailForRead").html(email);//Email
	 		$("#emailForRead").parents(".span_con").find(".noinfo").hide();
	 	}else{
			$("#emailForRead").html("");
			$("#emailForRead").parents(".span_con").find(".noinfo").show();
	 	}
		
		//省、市、县各级代码
		var provinceNum = Math.floor(contactAddrCode/10000)*10000;
		var cityNum = Math.floor(contactAddrCode/100)*100;
		var countryNum = contactAddrCode;
		
		//模拟change事件  
		if(!isNaN(provinceNum)){
			var provinceName = $(".province").find("li[value="+ provinceNum +"]").text();
			var cityName = $(".city").find("li[value="+ cityNum +"]").text();
			var countyName = $(".county").find("li[value="+ countryNum +"]").text();
			
			$("#contactAddrForRead").html(provinceName+cityName+countyName+contactAddr);//注册地址
		}
		$("#contactInfoForRead .now_edit").hide();
		$("#contactInfoForRead .main").show();
	};
	asyncAjaxMethod(url,params,isasync,fn);	
}


/**
 * 保存产品信息
 * saveProductInfo
 * @param thisEvent void
 * @author mishengliang
 * 2016-10-21 上午9:18:32
 */
function saveProductInfo(thisEvent){
	$("#sortSelect").css("display","none");        
	if(!saveSubmitValid(thisEvent)){
		return 4;
	}
	var url = "supplierForPlateForm/updateSupplierInfoByCompanyIdForVIP.do";
	var params = {};
	params.companyId = companyId;
	params.customer = doCustomer();//客户操作
	params.competitor = doCompetitor();//主要竞争对手操作
	params.goods = doGoods();//商品操作
	params.material = doMaterial();//原材料操作
	params.categoryList = doCategory();
	params.receiveId = 9999;
	params.isVip = "isVip";
	
	var fn = function(result){
		cate = doCategoryForSaveShow();
		showSortList("forRead",cate);
		editTurnShow(thisEvent);//转换为保存状态
		delSaleById();
		delMaterialById();
		delCompetitorById();
		delCustomerById();
		//展示赋值
		//产品名称
		var goodsList = doGooArray();
		if(!goodsList){
		}else if(goodsList.length != 0){
			var goodsShowForRead = "";
	 		for(var i = 0;i<goodsList.length;i++){
	 			//单独展示界面
	 			goodsShowForRead += "<li>"
										+"<span class='pro'>"+ goodsList[i].goodsName +"</span>"
										+"<span class='brand'>"+ goodsList[i].goodsBrand +"</span>"
									+"</li>";
			} 
	 		$("#saleProductForRead").html(goodsShowForRead);
		}
		
		//原材料及品牌
		var metarialList = doMatArray();
		if(!metarialList){
		}else if(metarialList.length != 0){
			var metarialShowForRead = "";
			for(var i = 0;i<metarialList.length;i++){
				//单独展示界面
				metarialShowForRead += "<li>"
										+"<span class='pro'>"+ metarialList[i].materialName +"</span>"
										+"<span class='brand'>"+ metarialList[i].materialBrand +"</span>"
									+"</li>";
			} 
			$("#materialForRead").html(metarialShowForRead);
		}
		
		//展示竞争对手
		competitorList = doComArray();
		if(!competitorList){//抬头发票无数据
		}else if(competitorList.length != 0){
			var competitorShowForRead = "";
			for(var i = 0;i<competitorList.length;i++){
				//展示界面
				competitorShowForRead += "<li>"
							 			+"<span class='compi'>"+ competitorList[i].competitorName +"</span>"
						 			+"</li>";
			} 
			$("#competitorForRead").html(competitorShowForRead);
		}
		
		//展示主要客户
		customerList = doCusArray();
		if(!customerList || customerList.length == 0){//抬头发票无数据
			$("#customerForRead").html("");
			$("#customerForRead").parent().find(".noinfo").show();
		}else if(customerList.length != 0){
			var customerShowForRead = "";
			for(var i = 0;i<customerList.length;i++){
	 			//展示界面
	 			customerShowForRead += "<li>"
							 			+"<span class='customer'>"+ customerList[i].customerName +"</span>"
						 			+"</li>";
			} 
			$("#customerForRead").parent().find(".noinfo").hide();
			$("#customerForRead").html(customerShowForRead);
		}
		$("#productInfoForRead .now_edit").hide();
		$("#productInfoForRead .main").show();
		updateProductEditContent();
	};
	asyncAjaxMethod(url,params,true,fn);	
}

function updateProductEditContent(){
	var url = "supplierForPlateForm/getProductInfo.do";
	var params = {};
	params.companyId = companyId;
	var fn = function(result){//无操作
		//产品名称
		var companyData = result.data;
		var goodsList = companyData.goodsList;
		var newStr = '<div class="clearfix mt10 part">'
						+'<div class="clearfix f_l">'
							+'<div class="f_l"><input type="text" placeholder="产品名称" class="inputWrap5 input_must" autocomplete="off"></div>'
							+'<div class=" f_l ml10"><input type="text" placeholder="品牌名称" class="inputWrap5" autocomplete="off"></div>'
							+'<input type="hidden" class="saleId" value="-1">'
						+'</div>'
						+'<div class="f_l ml10" style="height:40px;line-height:40px;">'
							+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,3)">'
							+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,3)" class="plus">'
						+'</div>'
					+'</div>'
					+'<div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">产品名称不可为空</div>';
		$("#saleProduct").html(newStr);
		if(!goodsList){
		}else if(goodsList.length != 0){
	 		for(var i = 0;i<companyData.goodsList.length;i++){
	 			$("#saleProduct .part:last input").eq(0).val(goodsList[i].goods_name);
	 			$("#saleProduct .part:last input").eq(1).val(goodsList[i].goods_brand);
	 			$("#saleProduct .part:last input").eq(2).val(goodsList[i].goods_id);
	 			if(i<goodsList.length-1){
	 				$("#saleProduct .part:last").find("img:last").trigger("click");//点击生成新的一行
	 			}
			} 
		}
		
		//原材料及品牌
		var metarialList = companyData.metarialList;
		var newStr = '<div class="clearfix part">'
						+'<div class="clearfix f_l">'
							+'<div class=" f_l"><input type="text" placeholder="材料名称" class="inputWrap5 input_must" autocomplete="off"></div>'
							+'<div class=" f_l ml10"><input type="text" placeholder="材料品牌" class="inputWrap5" autocomplete="off"></div>'
							+'<input type="hidden" class="materialId" value="-1">'
						+'</div>'
						+'<div class="f_l ml10" style="height:40px;line-height:40px;">'
							+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,4)">'
							+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,4)" class="plus">'
						+'</div>'
					+'</div>'
					+'<div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">材料名称不可为空</div>';
		$("#material").html(newStr);
		if(!metarialList){
		}else if(metarialList.length != 0){
			for(var i = 0;i<companyData.metarialList.length;i++){
				$("#material .part:last input").eq(0).val(metarialList[i].material_name);
				$("#material .part:last input").eq(1).val(metarialList[i].material_brand);
				$("#material .part:last input").eq(2).val(metarialList[i].material_id);
				if(i<metarialList.length-1){
					$("#material .part:last").find("img:last").trigger("click");//点击生成新的一行
				}
			} 
		}
		
		//展示竞争对手
		competitorList = companyData.competitorList;
		var newStr = '<div class="clearfix part">'
						+'<div class=" f_l">'
							+'<input type="text" class="inputWrap input_must" autocomplete="off">'
							+'<input type="hidden" class="competitor_id" value="-1">'
						+'</div>'
						+'<div class="f_l ml10" style="height:40px;line-height:40px;">'
							+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,5)">'
							+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,5)" class="plus">'
						+'</div>'
					+'</div>'
					+'<div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">主要竞争对手不可为空</div>';
		$("#competitor").html(newStr);
		if(!competitorList){//抬头发票无数据
		}else if(competitorList.length != 0){
			for(var i = 0;i<competitorList.length;i++){
				$("#competitor .part:last input").eq(0).val(competitorList[i].competitor_name);
				$("#competitor .part:last input").eq(1).val(competitorList[i].competitor_id);
				if(i<competitorList.length-1){
					$("#competitor .part:last").find("img:last").trigger("click");//点击生成新的一行
				}
			} 
		}
		
		//展示主要客户
		customerList = companyData.customerList;
		var newStr = '<div class="clearfix part">'
						+'<div class=" f_l">'
							+'<input type="text" class="inputWrap" autocomplete="off">'
							+'<input type="hidden" class="customer_id" value="-1">'
						+'</div>'
						+'<div class="f_l ml10" style="height:40px;line-height:40px;">'
							+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,6)">'
							+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,6)" class="plus">'
						+'</div>'
					+'</div>'
					+'<div class="info_explain f_l ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请填写主要客户</div>';
		$("#customer").html(newStr);
		if(!customerList){//抬头发票无数据
		}else if(customerList.length != 0){
			for(var i = 0;i<customerList.length;i++){
				$("#customer .part:last input").eq(0).val(customerList[i].customer_name);
				$("#customer .part:last input").eq(1).val(customerList[i].customer_id);
	 			if(i<customerList.length-1){
	 				$("#customer .part:last").find("img:last").trigger("click");//点击生成新的一行
	 			}
			} 
		}
	};
	asyncAjaxMethod(url,params,false,fn);	
}

/**
 * 保存门户信息
 * saveWinInfo
 * @param thisEvent void
 * @author mishengliang
 * 2016-10-21 上午8:55:47
 */
function saveWinInfo(thisEvent){//5
	//获取基本数据
	var companyIntroduction= $("#companyIntroduction").val();
	
	var url = "supplierForPlateForm/updateSupplierInfoByCompanyIdForVIP.do";
	var params = {};
	params.companyId = companyId;
	params.companyIntroduction = companyIntroduction;
	params.attched = doAttched(thisEvent);
	params.receiveId = 9999;
	params.isVip = "isVip";
	
	var fn = function(result){
		editTurnShow(thisEvent);//转换为保存状态
		deleteTaskFiles();//删除已删除的附件
		
		var logoFlag = picPathSrc(22,"#company_logo_read","onlyRead");//企业logo
		var imageFlag = picPathSrc(23,"#company_image_read","onlyRead");//企业形象图
		var equipmentFlag = showMorePic(24,".company_equipment_imgs_read","onlyRead");//厂容厂貌
		if(!logoFlag && !imageFlag && !equipmentFlag && (companyIntroduction == null || companyIntroduction == "")){
			$("#companyInfoForRead .now_edit").show();
			$("#companyInfoForRead .main").hide();
		}else{
			$("#companyInfoForRead .now_edit").hide();
			$("#companyInfoForRead .main").show();
		}
		//展示赋值
		if(companyIntroduction != null && companyIntroduction != ""){
			$("#companyIntroductionForRead").html(companyIntroduction.replace(/\n/g,"<br/>"));//企业简介
			$("#companyIntroductionForRead").parent().find(".noinfo").hide();
		}else{
			$("#companyIntroductionForRead").parent().find(".noinfo").show();
			$("#companyIntroductionForRead").html("");//企业简介
		}
		
		if(logoFlag || imageFlag){
			$(".corporateImage").prev(".noinfo").hide();
		}else{
			$(".corporateImage").prev(".noinfo").show();
		}
		if(equipmentFlag){
			$(".company_equipment_imgs_read").prev(".noinfo").hide();
		}else{
			$(".company_equipment_imgs_read").prev(".noinfo").show();
		}
	};
	asyncAjaxMethod(url,params,false,fn);
}

/**
 * 保存规模能力
 * saveScaleInfo
 * @param thisEvent void
 * @author mishengliang
 * 2016-10-21 上午9:25:10
 */
function saveScaleInfo(thisEvent){
	var scaleFlag = true;
	$(".people_num").each(function(){
		if($(this).val()!=''){
			if(!int_reg.test($(this).val())){
				scaleFlag=false;
				$(this).parents(".item").find(".info_explain").show();
				$(this).css("border","1px solid red");
			}
		}
	});
	$(".size_test").each(function(){
		if($(this).val()!=''){
			if(!num_reg.test($(this).val())){
				scaleFlag=false;
				$(this).parents(".item").find(".info_explain").show();
				$(this).css("border","1px solid red");
			}
		}
	});
	
	$(".money_test").each(function(){
		if($(this).val()!=''){
			if(!num_reg.test($(this).val())){
				scaleFlag=false;
				$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的金额');
				$(this).parents(".item").find(".info_explain").show();
				$(this).parent().css("border","1px solid red");
			}else{
				if($(this).parent().prev().find(".left input").val()==undefined){
					scaleFlag=false;
					$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请选择币种');
					$(this).parents(".item").find(".info_explain").show();
					$(this).parent().css("border","1px solid #ccc");
					$(this).parent().prev().find(".left").css("border","1px solid red");
				}else{
					$(this).parent().prev().find(".left").css("border","1px solid #ccc");
					$(this).parents(".item").find(".info_explain").hide();
				}
			}
		}
	});
	
	
	if(!scaleFlag){
		return 6;
	}
	
	//获取基本数据
	var emplyees = $("#emplyees").val();//公司总人数  
	var turnoverCurrencyId = $("#turnover_currency_id").find("input[type=hidden]").val();//营业额货币
	var importCurrencyId = $("#import_currency_id").find("input[type=hidden]").val();//进口额货币
	var exportCurrencyId = $("#export_currency_id").find("input[type=hidden]").val();//出口额货币	
	var turnover = $("#turnover").val() == "" ? 0:$("#turnover").val();
	var importNum = $("#importNum").val() == ""?0:$("#importNum").val();
	var exportNum = $("#exportNum").val() == ""?0:$("#exportNum").val();
	var companyArea = $("#companyArea").val();
	var factoryArea = $("#factoryArea").val();
	var factoryOwner = $("#factory_owner").find("input[type=hidden]").val();//产权
	var useBegintime = $("#useBegintime").val();//开始时间                  
	var useEndtime = $("#useEndtime").val();//结束时间 
	if((useBegintime == "" && useEndtime != "") || (useBegintime != "" && useEndtime == "")){
		$("#useEndtime").parent().parent().find(".info_explain").show();
		return;
	}else{
		$("#useEndtime").parent().parent().find(".info_explain").hide();
	}
	
	var params = {};
	params.companyId = companyId;
	params.emplyees = emplyees;
	params.companyArea = companyArea;
	params.factoryOwner = factoryOwner;
	params.turnoverCurrencyId = turnoverCurrencyId;
	params.importCurrencyId = importCurrencyId;
	params.exportCurrencyId = exportCurrencyId;
	params.turnover = turnover;
	params.importNum = importNum;
	params.exportNum = exportNum;
	params.factoryArea = factoryArea;
	params.useBegintime = useBegintime;
	params.useEndtime = useEndtime;
	params.receiveId = 9999;
	params.isVip = "isVip";
	
	//获取其他人员
	params.techNum = 0;
	params.opNum = 0;
	params.qcNum = 0;
	params.staffNum = 0;
	params.internalAuditorNum = 0;
	$("#other_person").find(".part").each(function(index, element) {
		var otherPersonType = $(element).find("input[type=hidden]").val();
		switch (otherPersonType) {
		case "0":
			break;
		case "1":
			params.techNum = $(element).find(".people_num").val() == ""?0:$(element).find(".people_num").val();
			break;
		case "2":
			params.opNum = $(element).find(".people_num").val() == ""?0:$(element).find(".people_num").val();
			break;
		case "3":
			params.qcNum = $(element).find(".people_num").val() == ""?0:$(element).find(".people_num").val();
			break;
		case "4":
			params.staffNum = $(element).find(".people_num").val() == ""?0:$(element).find(".people_num").val();
			break;
		case "5":
			params.internalAuditorNum = $(element).find(".people_num").val() == ""?0:$(element).find(".people_num").val();
			break;
		default:
			break;
		}
	});

	//人员类型
	params.collegeNum = 0;
	params.diplomaNum = 0;
	params.diplomaDownNum = 0;
	$("#person_structure").find(".part").each(function(index, element) {
		var personType = $(element).find("input[type=hidden]").val();
		switch (personType) {
			case "0":
				break;
			case "1":
				params.collegeNum = $(element).find(".people_num").val() == ""?0:$(element).find(".people_num").val();
				break;
			case "2":
				params.diplomaNum = $(element).find(".people_num").val() == ""?0:$(element).find(".people_num").val();
				break;
			case "3":
				params.diplomaDownNum = $(element).find(".people_num").val() == ""?0:$(element).find(".people_num").val();
				break;
			default:
				break;
		}
	});
	
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
	var url = "supplierForPlateForm/updateSupplierInfoByCompanyIdForVIP.do";
	var fn = function(result){
		var  opFlag = STRotherPersonShow(params);//其他人员展示
		var  psFlag = STRpersonStructShow(params);//人员结构展示
		if(!opFlag && !psFlag && (emplyees == "" || emplyees == 0) && params.qualityControl == undefined && params.isOem == undefined
				&& (turnover == "" || turnover == 0) && (importNum == "" || importNum == 0)
				&& (exportNum == "" || exportNum == 0) && (companyArea == 0 || companyArea == "")
				&& (params.techNum == undefined || params.techNum == 0) && (params.opNum == 0 || params.opNum == undefined)
				&& (params.qcNum == undefined || params.qcNum == 0) && (params.staffNum == 0 || params.staffNum == undefined)
				&& (params.internalAuditorNum == undefined || params.internalAuditorNum == 0) && (params.collegeNum == 0 || params.collegeNum == undefined)
				&& (params.diplomaNum == undefined || params.diplomaNum == 0) && (params.diplomaDownNum == 0 || params.diplomaDownNum == undefined)
				&& (factoryArea == 0 || factoryArea == "") && factoryOwner == undefined && useBegintime == ""){
				$("#scalepowerInfoForRead .now_edit").show();
				$("#scalepowerInfoForRead .main").hide();
			}else{
				$("#scalepowerInfoForRead .now_edit").hide();
				$("#scalepowerInfoForRead .main").show();
			}
		
		editTurnShow(thisEvent);//转换为保存状态
		//展示赋值
		if(emplyees != 0 && emplyees != ""){
			$("#emplyeesForRead").parent(".dataForReg").show();
			$("#emplyeesForRead").parents(".span_con").find(".noinfo").hide();
			$("#emplyeesForRead").html(emplyees);//公司总人数                  
		}else{
			$("#emplyeesForRead").parent(".dataForReg").hide();
			$("#emplyeesForRead").parents(".span_con").find(".noinfo").show();
		}
		if(turnover != 0 && turnover != ""){
			$("#turnoverForRead").parent(".dataForReg").show();
			$("#turnoverForRead").parents(".span_con").find(".noinfo").hide();
			$("#turnoverForRead").html(turnover);    
		}else{
			$("#turnoverForRead").parent(".dataForReg").hide();
			$("#turnoverForRead").parents(".span_con").find(".noinfo").show();
		}
		if(importNum != 0 && importNum != ""){
			$("#importNumForRead").parent(".dataForReg").show();
			$("#importNumForRead").parents(".span_con").find(".noinfo").hide();
			$("#importNumForRead").html(importNum);    
		}else{
			$("#importNumForRead").parent(".dataForReg").hide();
			$("#importNumForRead").parents(".span_con").find(".noinfo").show();
		}
		if(exportNum != 0 && exportNum != ""){
			$("#exportNumForRead").parent(".dataForReg").show();
			$("#exportNumForRead").parents(".span_con").find(".noinfo").hide();
			$("#exportNumForRead").html(exportNum);    
		}else{
			$("#exportNumForRead").parent(".dataForReg").hide();
			$("#exportNumForRead").parents(".span_con").find(".noinfo").show();
		}
		if(useBegintime != "" && useBegintime != null){
			$("#useBegintimeForRead").parent(".dataForReg").show();
			$("#useBegintimeForRead").parents(".span_con").find(".noinfo").hide();
			$("#useBegintimeForRead").html(useBegintime);//开始时间 
			$("#useEndtimeForRead").html(useEndtime);//结束时间                  
		}else{
			$("#useBegintimeForRead").parent(".dataForReg").hide();
			$("#useBegintimeForRead").parents(".span_con").find(".noinfo").show();
		}
		if(companyArea != 0 && companyArea != ""){
			$("#companyAreaForRead").parent(".dataForReg").show();
			$("#companyAreaForRead").parents(".span_con").find(".noinfo").hide();
			$("#companyAreaForRead").html(companyArea);    
		}else{
			$("#companyAreaForRead").parent(".dataForReg").hide();
			$("#companyAreaForRead").parents(".span_con").find(".noinfo").show();
		}
		if(factoryArea != 0 && factoryArea != ""){
			$("#factoryAreaForRead").parent(".dataForReg").show();
			$("#factoryAreaForRead").parents(".span_con").find(".noinfo").hide();
			$("#factoryAreaForRead").html(factoryArea);    
		}else{
			$("#factoryAreaForRead").parent(".dataForReg").hide();
			$("#factoryAreaForRead").parents(".span_con").find(".noinfo").show();
		}
		//$("#companyAreaForRead").html(companyArea);           
		//$("#factoryAreaForRead").html(factoryArea); 
		
		var qulityControlStr = "";
		switch(parseInt(params.qualityControl)){
			case 0:
				qulityControlStr = "内部";
				break;
			case 1:
				qulityControlStr = "第三方";
				break;
			case 2:
				qulityControlStr = "无";
				break;
			default:
				qulityControlStr = "";
				break;
		}
		if(qulityControlStr != ""){
			$("#qulityControlForRead").html(qulityControlStr);
		}else{
			$("#qulityControlForRead").find(".noinfo").show();
		}
		if(params.isOem == 0){//提供
			$("#OEMStyleForRead").html("提供");
		}else if(params.isOem == 1){//不提供
			$("#OEMStyleForRead").html("不提供");
		}
		
		if(factoryOwner == 1){//1：租赁   2：自建
			$("#factory_ownerForRead").html("租赁");
		}else if(factoryOwner == 2){
			$("#factory_ownerForRead").html("自建");
		}else {
			$("#factory_ownerForRead").find(".noinfo").show();
		}
		$("#turnover_currency_idForRead").html(getCurrencyName(turnoverCurrencyId));//营业额货币
		$("#import_currency_idForRead").html(getCurrencyName(importCurrencyId));//进口额货币
		$("#export_currency_idForRead").html(getCurrencyName(exportCurrencyId));//出口额货币
	};
	asyncAjaxMethod(url,params,true,fn);	
}

/**
 * 保存设备清单
 * saveDeviceInfo
 * @param thisEvent
 * @author mishengliang
 * 2016-10-21 上午9:28:06
 */
function saveDeviceInfo(thisEvent){
	if(!saveSubmitValid(thisEvent)){
		return 7;
	}
	
	var deviceFlag = true;
	$(".machinePrice").each(function(){
		if($(this).val()!=''){
			if(!num_reg.test($(this).val())){
				deviceFlag=false;
				$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的金额');
				$(this).parents(".item").find(".info_explain").show();
				$(this).css("border","1px solid red");
			}
		}
	});
	$(".machineAmount").each(function(){
		if($(this).val()!=''){
			if(!int_reg.test($(this).val())){
				deviceFlag=false;
				$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备数量');
				$(this).parents(".item").find(".info_explain").show();
				$(this).css("border","1px solid red");
			}
		}
	});
	if(!deviceFlag){//保存时验证
		return 7;
	}
	
	var url = "supplierForPlateForm/updateSupplierInfoByCompanyIdForVIP.do";
	var params = {};
	params.companyId = companyId;
	params.device = doDevice();//设备清单
	params.receiveId = 9999;
	params.isVip = "isVip";
	var fn = function(result){
		editTurnShow(thisEvent);//转换为保存状态
		delDevicelistRow();
		//展示赋值
		var deviceListShowStr = "<tr>"
									+"<th >设备名称</th>"
									+"<th >设备规格</th>"
									+"<th >产地</th>"
									+"<th >价值(万元)</th>"
									+"<th >购买日期</th>"
									+"<th >数量</th>"
									+"<th>先进性</th>"
								+"</tr>";
		var deviceList = doDevArray();
		if(deviceList.length > 0){
			for(var i=0; i < deviceList.length; i++){
				deviceListShowStr += "<tr>"
										+"<td>"+ deviceList[i].deviceName +"</td>"
										+"<td>"+ deviceList[i].specifications +"</td>"
										+"<td>"+ deviceList[i].place +"</td>"
										+"<td>"+ (deviceList[i].price!=0?deviceList[i].price:"") +"</td>"
										+"<td>"+ deviceList[i].buyDay +"</td>"
										+"<td>"+ (deviceList[i].deviceNum!=0?deviceList[i].deviceNum:"") +"</td>"
										+"<td>"+ deviceList[i].advanced +"</td>"
									+"</tr>";
			}
		}
		$("#machineTable").html(deviceListShowStr);
		$("#machineInfoForRead .now_edit").hide();
		$("#machineInfoForRead .main").show();
		updateDeviceEditContent();
	};
	asyncAjaxMethod(url,params,true,fn);
}

function updateDeviceEditContent(){
	var url = "supplierForPlateForm/getDeviceInfo.do";
	var params = {};
	params.companyId = companyId;
	var fn = function(result){
		var companyData = result.data;
		var deviceList = companyData.deviceList;
		var newStr = '<div class="clearfix part">'
						+'<div class="f_L">'
							+'<input type="text" class="wrap3 f_l machineName input_must" autocomplete="off" >'
							+'<input type="text" class="wrap1 f_l" autocomplete="off">'
							+'<input type="text" class="wrap2 f_l" autocomplete="off">'
							+'<input type="text" class="wrap1 f_l machinePrice" autocomplete="off" >'
							+'<input type="text" class="Wdate wrap3 f_l" onclick="WdatePicker({maxDate:\'%y-%M-%d\',readOnly:true})" autocomplete="off" >'
							+'<input type="text" class="machineAmount wrap1 f_l input_must" autocomplete="off" >'
							+'<input type="text" class="wrap1 f_l" autocomplete="off">'
							+'<input type="hidden" class="device_id" value="-1">'
						+'</div>'
						+'<div class="f_l ml10" style="height:40px;line-height:40px;">'
							+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,7)">'
							+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="addMachineList(this)" class="plus">'
						+'</div>'
					+'</div>'
					+'<div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png">设备名称和数量不可为空</div>';
		$("#machineList").html(newStr);
		if(deviceList.length > 0){
			for(var i=0; i < deviceList.length; i++){
				$("#machineList .part:last input").eq(0).val(deviceList[i].device_name);
				$("#machineList .part:last input").eq(1).val(deviceList[i].specifications);
				$("#machineList .part:last input").eq(2).val(deviceList[i].place);
				$("#machineList .part:last input").eq(3).val(deviceList[i].price==null?"":deviceList[i].price);
				$("#machineList .part:last input").eq(4).val(deviceList[i].buy_day == null?"":deviceList[i].buy_day);
				$("#machineList .part:last input").eq(5).val(deviceList[i].device_num!=0?deviceList[i].device_num:"");
				$("#machineList .part:last input").eq(6).val(deviceList[i].advanced);
				$("#machineList .part:last input").eq(7).val(deviceList[i].device_id);

	 			if(i< deviceList.length-1){
	 				$("#machineInfoForEdit .part:last").find("img:last").trigger("click");//点击生成新的一行
	 			}
			}
		}
	};
	asyncAjaxMethod(url,params,false,fn);
}
/**
 * 保存院校合作
 * saveCooperationInfo
 * @param thisEvent void
 * @author mishengliang
 * 2016-10-21 上午9:27:14
 */
function saveCooperationInfo(thisEvent){//8
	//获取基本数据
	var schoolCoop= $("#schoolCoop").val();
	
	var url = "supplierForPlateForm/updateSupplierInfoByCompanyIdForVIP.do";
	var params = {};
	params.companyId = companyId;
	params.schoolCoop = schoolCoop;
	params.receiveId = 9999;
	params.isVip = "isVip";
	
	var fn = function(result){
		var textFlag = showText(30,"onlyRead");//院校合作
		editTurnShow(thisEvent);//转换为保存状态
		if(schoolCoop == "" && !textFlag){
			$("#schoolCooperationForRead .now_edit").show();
			$("#schoolCooperationForRead .main").hide();
		}else{
			$("#schoolCooperationForRead .now_edit").hide();
			$("#schoolCooperationForRead .main").show();
		}
		if(schoolCoop == null || schoolCoop == ""){
			$("#schoolCoopForRead").html("");//院校合作
			$("#schoolCoopForRead").parent().find(".noinfo").show();
		}else{//展示赋值
			$("#schoolCoopForRead").parent().find(".noinfo").hide();
			$("#schoolCoopForRead").html(schoolCoop);//院校合作
		}
	};
	asyncAjaxMethod(url,params,false,fn);	
}

/**
 * 保存资质证书
 * saveCertificateInfo
 * @param thisEvent void
 * @author mishengliang
 * 2016-10-21 上午9:26:20
 */
function saveCertificateInfo(thisEvent){//9
	//获取基本数据
	var companyIntroduction= $("#companyIntroduction").val();
	var certificationSystem	= $("input[name=authentication]:checked").parent().text();	
	if($("input[name=authentication]:checked").val() == 4){
		certificationSystem = $("#otherCerName").val();
	}
	var cersysValue = $("input[name=authentication]:checked").val();
	var sysPicName = $("#management_system").attr("src");
	if(cersysValue != 1 && (sysPicName.indexOf("fileId") == -1)){
		$("#management_system").parents(".pic").next().find(".info_explain").show();
		return;
	}
	
	var url = "supplierForPlateForm/updateSupplierInfoByCompanyIdForVIP.do";
	var params = {};
	params.companyId = companyId;
	params.certificationSystem = certificationSystem;
	params.attched = doAttched(thisEvent);
	params.receiveId = 9999;
	params.isVip = "isVip";
	
	var fn = function(result){
		editTurnShow(thisEvent);//转换为保存状态
		deleteTaskFiles();//删除已删除的附件
		//展示赋值
		var sysFlag = picPathSrc(25,"#management_system_read","onlyRead");//管理认证体系
		var patentFlag = showMorePic(26,".patent_imgs_read","onlyRead");//专利证书
		var oiFlag = showMorePic(27,".other_intelligence_imgs_read","onlyRead");//其他资质
		if((!sysFlag) && !patentFlag && !oiFlag){// ||certificationSystem=="无"
			$("#certificationForRead .now_edit").show();
			$("#certificationForRead .main").hide();
		}else{
			$("#certificationForRead .now_edit").hide();
			$("#certificationForRead .main").show();
		}
		
		if(!sysFlag && certificationSystem == undefined){
			$("#management_system_read").parent().prev(".noinfo").show();
		}else if(certificationSystem=="无"){
			$("#management_system_read").hide();
			$("#management_system_read").parent().prev(".noinfo").hide();
			$(".certificationName").html(certificationSystem);
		}else{
			$("#management_system_read").show();
			$("#management_system_read").parent().prev(".noinfo").hide();
			$(".certificationName").html(certificationSystem);
		}
		if(!patentFlag){
			$(".patent_imgs_read").prev(".noinfo").show();
		}else{
			$(".patent_imgs_read").prev(".noinfo").hide();
		}
		if(!oiFlag){
			$(".other_intelligence_imgs_read").prev(".noinfo").show();
		}else{
			$(".other_intelligence_imgs_read").prev(".noinfo").hide();
		}
	};
	asyncAjaxMethod(url,params,false,fn);	
}

/**
 * 编辑模式变为展示模式
 * editTurnShow
 * @param thisEvent void
 * @author mishengliang
 * 2016-10-19 上午10:42:49
 */
function editTurnShow(thisEvent){
	$(thisEvent).parents(".forEdit").css("display","none");
	$(thisEvent).parents(".forEdit").next(".forRead").css("display","block");
}

/**
 * 展示模式变为编辑模式
 * showTurnEdit
 * @param thisEvent
 * @author mishengliang
 * 2016-10-19 上午10:42:53
 */
function showTurnEdit(thisEvent){
	$(thisEvent).parents(".forRead").css("display","none");
	$(thisEvent).parents(".forRead").prev(".forEdit").css("display","block");
}

function showPicForVip(obj){
	var fileType,fileName,fileElementId,id;//文件类型,文件名字,文件上传inputId
	
	var defaultUploadImage = $(obj).prev().find("img").attr("src");
	var imageId = $(obj).prev().find("img").attr("id");
	if(companyId==0||defaultUploadImage == "/newresources/images/uploadImg.png" || defaultUploadImage == "/newresources/images/uploadlogo.png" || defaultUploadImage == "/newresources/images/uploadfigure.png"){
		if(imageId=="company_logo"){
			updateForLogo=0;
		}
		else if(imageId=="company_image"){
			updateForImage=0;
		}
	}else{
		if(imageId=="company_logo"){
			updateForLogo=1;
		}
		else if(imageId=="company_image"){
			updateForImage=1;
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
	}else if($(obj).attr("id") == "company_logo_pic"){
		filename=$("#company_logo_pic").val();
		fileElementId = "company_logo_pic";
		fileType = 22;
	}else if($(obj).attr("id") == "company_image_pic"){
		filename=$("#company_image_pic").val();
		fileElementId = "company_image_pic";
		fileType = 23;
	}else if($(obj).attr("id") == "management_system_pic"){
		filename=$("#management_system_pic").val();
		fileElementId = "management_system_pic";
		fileType = 25;
	}
   	var fileStartIndex=filename.lastIndexOf("\\");// 反斜杠\ 需要转译
	var fileEndIndex=filename.lastIndexOf(".");
	//原始上传文件名称
	var origfilename=filename.substring(fileStartIndex+1,fileEndIndex);
   if(origfilename){
		var fileurl = "PfTaskFileCtrl/addOrUpdateTaskImgFile1.do";
		var params = {};
		params.fileType=fileType;
		params.fileName=origfilename;
		params.formatType="image";
		params.companyId=companyId;
		/*var params = {
		        fileType:fileType,
		        fileName:origfilename,
		        formatType:"image",
		        companyId:companyId};*/
		var fn = function(data){//服务器成功响应处理函数
        	if (data.success==true &&data.message=="上传成功") {  
        		var newsrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+data.mongodbId;
        		if(fileType == 18){
        			$("#business_licence").parent().find("div").remove();
	        		$("#business_licence").attr("src",newsrc);
	        		var del="<div class='a_bg'></div>"
						+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
	        		$("#business_licence").parent().append(del);
	        		$(".company_license_tip").css("display","none");
        		}else if(fileType == 19){
        			$("#tax_registration_certificate").parent().find("div").remove();
        			$("#tax_registration_certificate").attr("src",newsrc);
        			var del="<div class='a_bg'></div>"
						+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
        			$("#tax_registration_certificate").parent().append(del);
        			$(".company_license_tip").css("display","none");
        		}else if(fileType == 20){
        			$("#organization_code_certificate").parent().find("div").remove();
        			$("#organization_code_certificate").attr("src",newsrc);
        			var del="<div class='a_bg'></div>"
						+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
        			$("#organization_code_certificate").parent().append(del);
        			$(".company_license_tip").css("display","none");
        		}else if(fileType == 21){
        			$("#taxpayer_qualification_certification").parent().find("div").remove();
        			$("#taxpayer_qualification_certification").attr("src",newsrc);
        			var del="<div class='a_bg'></div>"
						+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
        			$("#taxpayer_qualification_certification").parent().append(del);
        			$(".company_license_tip").css("display","none");
        		}else if(fileType == 22){
        			$("#company_logo").attr("src",newsrc);
        			var del="<div class='a_bg'></div>"
						+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
        			$("#company_logo").parent().find("img").nextAll().remove();
        			$("#company_logo").parent().append(del);
        		}else if(fileType == 23){
        			$("#company_image").attr("src",newsrc);
        			var del="<div class='a_bg'></div>"
						+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
        			$("#company_image").parent().find("img").nextAll().remove();
        			$("#company_image").parent().append(del);
        		}else if(fileType == 25){
        			$("#management_system").attr("src",newsrc);
        			var del="<div class='a_bg'></div>"
					+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
        			$("#management_system").parent().append(del);
        			$("#management_sys_tip").css("display","none");
        			$("#management_system").parents(".pic").next().find(".info_explain").hide();
        		}

            }else{
            	window.wxc.xcConfirm(data.message);
            }
		};
	    addInputUtilFile(fileurl,params,fileElementId,fn); 
	   
   	   /*$.ajaxFileUpload({
	        url: getwebroot()+"PfTaskFileCtrl/addOrUpdateTaskImgFile1.do",
	        data: {
		        fileType:fileType,
		        fileName:origfilename,
		        formatType:"image",
		        companyId:companyId
	        },
	        fileElementId: fileElementId,//input type=file 的id
	        dataType: "json",
	        success: function (data, status){//服务器成功响应处理函数
	        	if (data.success==true &&data.message=="上传成功") {  
	        		var newsrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+data.mongodbId;
	        		if(fileType == 18){
	        			$("#business_licence").parent().find("div").remove();
		        		$("#business_licence").attr("src",newsrc);
		        		var del="<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
		        		$("#business_licence").parent().append(del);
		        		$(".company_license_tip").css("display","none");
	        		}else if(fileType == 19){
	        			$("#tax_registration_certificate").parent().find("div").remove();
	        			$("#tax_registration_certificate").attr("src",newsrc);
	        			var del="<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
	        			$("#tax_registration_certificate").parent().append(del);
	        			$(".company_license_tip").css("display","none");
	        		}else if(fileType == 20){
	        			$("#organization_code_certificate").parent().find("div").remove();
	        			$("#organization_code_certificate").attr("src",newsrc);
	        			var del="<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
	        			$("#organization_code_certificate").parent().append(del);
	        			$(".company_license_tip").css("display","none");
	        		}else if(fileType == 21){
	        			$("#taxpayer_qualification_certification").parent().find("div").remove();
	        			$("#taxpayer_qualification_certification").attr("src",newsrc);
	        			var del="<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
	        			$("#taxpayer_qualification_certification").parent().append(del);
	        			$(".company_license_tip").css("display","none");
	        		}else if(fileType == 22){
	        			$("#company_logo").attr("src",newsrc);
	        			var del="<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
	        			$("#company_logo").parent().find("img").nextAll().remove();
	        			$("#company_logo").parent().append(del);
	        		}else if(fileType == 23){
	        			$("#company_image").attr("src",newsrc);
	        			var del="<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
	        			$("#company_image").parent().find("img").nextAll().remove();
	        			$("#company_image").parent().append(del);
	        		}else if(fileType == 25){
	        			$("#management_system").attr("src",newsrc);
	        			var del="<div class='a_bg'></div>"
						+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
	        			$("#management_system").parent().append(del);
	        			$("#management_sys_tip").css("display","none");
	        			$("#management_system").parents(".pic").next().find(".info_explain").hide();
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

//上传文档文件
var flag = true;
function addText(thisEvent,fileType) {//fileType 30
	if(flag){
		flag=false;
		var fileName = $(thisEvent).val();
		if (fileName != "" && fileName != null) {//上传空间是否为空
			var fileElementId = $(thisEvent).attr("id");
			var fileType = fileType;//文件类别
			fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);//保留后缀名
			
			var fileurl = "PfTaskFileCtrl/addOrUpdateTaskImgFile.do";
			var params = {companyId : companyId,
					fileType : fileType,
					fileName : fileName,
					formatType : "text"};
			var fn = function(data){//服务器成功响应处理函数
				if (data.success == true && data.message == "上传成功") {
					var _newli = "<div class='file'>"
									+"<a class='regular f14' onClick='downloadText_find(\""+ data.mongodbId+"\")'>"+ fileName +"</a>"
									+"<span class='c999 ml20'>"+ data.creatDate +"</span>"
									+"<img class='ml20' src='/vip/resources/images/applyAccess/binGrey.png' onClick='deluploadText(this,"+ data.fileId +")'>"
								+"</div>";
					
					$("#coopperationFileList").prepend(_newli);
					var option = {
						title : "提示",
						btn : parseInt("0001", 2)
					};
					window.wxc.xcConfirm(data.message,
							window.wxc.xcConfirm.typeEnum.custom,
							option);
					//当前上传控件清空
					$(thisEvent).val("");
					flag=true;
				}else{
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
			
			/*$.ajaxFileUpload({
				url : getwebroot()
						+ "PfTaskFileCtrl/addOrUpdateTaskImgFile.do",
				data : {
					companyId : companyId,
					fileType : fileType,
					fileName : fileName,
					formatType : "text"
				},
				fileElementId : fileElementId,//input type=file 的id
				dataType : "json",
				success : function(data, status) {//服务器成功响应处理函数
					if (data.success == true && data.message == "上传成功") {
						var _newli = "<div class='file'>"
										+"<a class='regular f14' onClick='downloadText_find(\""+ data.mongodbId+"\")'>"+ fileName +"</a>"
										+"<span class='c999 ml20'>"+ data.creatDate +"</span>"
										+"<img class='ml20' src='/vip/resources/images/applyAccess/binGrey.png' onClick='deluploadText(this,"+ data.fileId +")'>"
									+"</div>";
						
						$("#coopperationFileList").prepend(_newli);
						var option = {
							title : "提示",
							btn : parseInt("0001", 2)
						};
						window.wxc.xcConfirm(data.message,
								window.wxc.xcConfirm.typeEnum.custom,
								option);
						//当前上传控件清空
						$(thisEvent).val("");
						flag=true;
					}else{
						var option = {
							title : "提示",
							btn : parseInt("0001", 2)
						};
						window.wxc.xcConfirm(data.message,
								window.wxc.xcConfirm.typeEnum.custom,
								option);
					}
				},
				error : function(data, status) {
					var option = {
						title : "提示",
						btn : parseInt("0001", 2)
					};
					window.wxc.xcConfirm("error",
							window.wxc.xcConfirm.typeEnum.custom,
							option);
				}
			});*/
		}
	}
}

/**
 * 多张图片展示  mishengliang
 * showMorePic
 * @param fileTypeId void
 * @author mishengliang
 */
function showMorePic(fileTypeId,element,onlyRead){
	var picFlag;
	$.ajax({
		type:"POST",
		url:getwebroot() + "PfTaskFileCtrl/getTaskFileListForWindow.do",
		async : false,
		dataType:"json",
		data:{
			companyId:companyId,
			fileTypeId:fileTypeId
		},
		success:function(result){
			if(result.data != ""){
				$(element).find("li").each(function(index,e){//保留编辑状态的上传控件
					if(index != $(element).find("li").length-1){
						$(e).remove();
					}
				});
				if(onlyRead == "onlyRead"){//展示的只读模式
					$(element).find("li").remove();
				}
				for(var i=0; i<result.data.length; i++){
					var imgSrc = getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[i].mogodb_id;
					var filename = result.data[i].file_name;
					var creatDate = result.data[i].create_dt;
					var delImg = "<div class='a_bg'></div><div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses_more(this,"+ result.data[i].id +")'>删除</a></div>";
					var filenameShow;
					filenameShow=subStringForFileName(filename,13);
					var editImg="<div class='pic_edit'>"
									+"<span class='filename' title="+filename+">"+filenameShow+"</span><span onclick='picRename(this)' class='picRename'><img src='/vip/resources/images/applyAccess/penGrey.png' class='mr5'>重命名</span>"
									+"<input value='' class='hide rename_wrap'/><button onclick='savePicName(this,"+ result.data[i].id +")' class='savePicName hide'>保存</button>"
								+"</div>";
					if(onlyRead == "onlyRead"){//展示的只读模式
						//$(element).find("li").remove();
						delImg = "";
						filenameShow=subStringForFileName(filename,20);
						editImg="<div class='pic_edit'><span class='filenameForRead' title="+filename+">"+filenameShow+"</span></div>";
					}
					var _newli="<li>"
									+"<div class='pic image_block_pic' style='height:140px;'>"
											+"<img class='frame' src='"+imgSrc+"'/>"
											+delImg
									+"</div>"
									+editImg
								+"</li>";
					$(element).prepend(_newli);
				}
				picFlag = true;
			}else{
				if(onlyRead == "onlyRead"){//展示的只读模式
					$(element).find("li").remove();
				}
				picFlag =  false;
			}
		},
		error:function(result){
		}
		});
	return picFlag;
}

/**
 * 删除公司证照
 * delCompany_licenses void
 * @author yukai
 * 2016-8-5 上午9:01:10
 */
function delCompany_licenses(obj,id){
	$(obj).parent().prev().prev().attr("src","/vip/resources/images/applyAccess/imgBg.png"); 
	$(obj).parent().prev().remove();
	$(obj).parent().remove();
	delFileIds.push(id);
}

/**
 * 多图删除
 * delCompany_licenses_more
 * @param obj
 * @param id void
 * @author mishengliang
 * 2016-10-21 上午10:06:38
 */
function delCompany_licenses_more(obj,id){
	$(obj).parent().parent().parent().css("display","none");
	delFileIds.push(id);
}

/**
 * 删除上传的文档对象
 * deluploadText
 * @param obj
 * @param fileId void
 * @author mishengliang
 * 2016-10-24 下午2:00:54
 */
function deluploadText(obj, fileId) {
	window.wxc.xcConfirm("确认删除么", window.wxc.xcConfirm.typeEnum.confirm, {
		onOk : function() {
			var url = "PfTaskFileCtrl/deleteTaskFile.do";
			var params = {};
			var isasync = true;
			var fn = function(){
				//无操作
			};

			params.fileId = fileId;
			asyncAjaxMethod(url, params, isasync, fn);

			$(obj).parent().remove();
		},
		onCancel : function() {
		}

	});
}

/**
 * 根据ID删除附件
 * delAttchedById void
 * @author yukai
 * 2016-8-5 上午9:01:10
 */
function deleteTaskFiles(){
	var url="PfTaskFileCtrl/deleteTaskFiles.do";
	var params={};
	params.delFileIds=delFileIds.join(",");
	var fn = function(result){
		if(result.success){
			//delUselessAttched();
		}
	};
	asyncAjaxMethod(url,params,false,fn);
}

//单图保存
function doAttched(thisEvent){
	var flagForAttched = 0;
	var attched = new Array();
	$(thisEvent).parents(".forEdit").find("img").each(function(index,element){
		var fileTypeId;
		var id;
		var mogodb_id;
		if($(element).attr("id") == "business_licence"){
			fileTypeId = 18;
		}else if($(element).attr("id") == "tax_registration_certificate"){
			fileTypeId = 19;
		}else if($(element).attr("id") == "organization_code_certificate"){
			fileTypeId = 20;
		}else if($(element).attr("id") == "taxpayer_qualification_certification"){
			fileTypeId = 21;
		}else if($(element).attr("id") == "company_logo"){
			fileTypeId = 22;
		}else if($(element).attr("id") == "company_image"){
			fileTypeId = 23;
		}else if($(element).attr("id") == "management_system"){
			fileTypeId = 25;
		}else if($(element).hasClass("company_fact_pic")){
			fileTypeId = 24;
		}else{
			return;
		}
		var srcStr=$(element).attr("src");
		if(srcStr!="/vip/resources/images/applyAccess/imgBg.png"){
			mogodb_id=srcStr.substring(srcStr.indexOf("=")+1);
		}
		var str=$(element).next().next().children("a").attr("onclick");
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
	});
	return attched.toString();//返回数据对象的string格式
}

/*展示公司图片基本信息 mishengliang
 * 
 * fileTypeId 图片文件位置类型ID
 * picId 图片展示位置的img标签ID
 * */
function picPathSrc(fileTypeId,picId,isRead){
	var ownFlag = false;
	$.ajax({
		type:"POST",
		url:getwebroot() + "PfTaskFileCtrl/getTaskFileListForWindow.do",
		dataType:"json",
		async:false,
		data:{
			fileTypeId:fileTypeId,
			companyId:companyId
		},
		success:function(result){
			if(result.data != ""){
				var del = "";
				if(fileTypeId == 18){
					if(isRead != "onlyRead"){
						$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
						del="<div class='a_bg'></div>"
								+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ result.data[0].id +")'>删除</a></div>";
					}else{
						var src=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id;
        				$(picId).html('<div class="upload posR"><img  src='+src+'></div><div class="upload_tip"><p class="picType">营业执照</p></div>');
					}
				}else if(fileTypeId == 19){
					if(isRead != "onlyRead"){
	        			$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
						del="<div class='a_bg'></div>"
								+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ result.data[0].id +")'>删除</a></div>";
					}else{
						var src=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id;
        				$(picId).html('<div class="upload posR"><img  src='+src+'></div><div class="upload_tip"><p class="picType">税务登记证</p></div>');
					}
				}else if(fileTypeId == 20){
					if(isRead != "onlyRead"){
						$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
						del="<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ result.data[0].id +")'>删除</a></div>";
					}else{
						var src=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id;
        				$(picId).html('<div class="upload posR"><img  src='+src+'></div><div class="upload_tip"><p class="picType">组织机构代码证</p></div>');
					}
        		}else if(fileTypeId == 21){
        			if(isRead != "onlyRead"){
        				$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
        				del="<div class='a_bg'></div>"
        					+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ result.data[0].id +")'>删除</a></div>";
        			}else{
        				var src=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id;
        				$(picId).html('<div class="upload posR"><img  src='+src+'></div><div class="upload_tip"><p class="picType">纳税人资格证书</p></div>');
        			}
        		}else if(fileTypeId == 22){//企业logo
        			if(isRead != "onlyRead"){
        				$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
        				del="<div class='a_bg'></div>"
        					+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ result.data[0].id +")'>删除</a></div>";
        			}else{
        				var src=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id;
        				$(picId).html('<img src='+src+' class="frame"><p class="type mt10 t_algin_c">企业LOGO</p>');
        			}
        		}else if(fileTypeId == 23){//企业形象
        			if(isRead != "onlyRead"){
	        			$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
						del="<div class='a_bg'></div>"
								+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ result.data[0].id +")'>删除</a></div>";
        			}else{
        				var src=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id;
        				$(picId).html('<img src='+src+' class="frame"><p class="type mt10 t_algin_c">企业形象</p>');
        			}
        		}else if(fileTypeId == 25){//资质认证体系
        			if(isRead != "onlyRead"){
	        			$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
						del="<div class='a_bg'></div>"
								+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ result.data[0].id +")'>删除</a></div>";
        			}else{
        				var src=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id;
        				$(picId).html('<img src='+src+' class="frame"><p class="type mt10 t_algin_c">认证证书</p>');
        			}
        		}
				if(isRead != "onlyRead"){
					$(picId).parent().append(del);
				}
				ownFlag =  true;
			}else{
				$(picId).html("");
				ownFlag =  false;
			}
		},
		error:function(result){
		}
	});
	return ownFlag;
}

/**
 * 文件展示
 * showText
 * @param fileType void
 * @author mishengliang
 * 2016-10-24 下午3:06:39
 */
function showText(fileType,onlyRead) {
	var textFlag = false;
	var url = "PfTaskFileCtrl/getTaskFileListForWindow.do";
	var params = {};
	params.fileTypeId = fileType;
	params.companyId = companyId;

	$("#coopperationFileListRead").html("");
	var fn = function(result) {
		for ( var i = 0; i < result.data.length; i++) {
			if(onlyRead == "onlyRead"){
				var _newli = "<div class='file'>"
					+"<a class='regular f14' onClick='downloadText_find(\""+ result.data[i].mogodb_id+"\")'>"+ result.data[i].file_name +"</a>"
					+"<span class='c999 ml20'>"+ result.data[i].create_dt +"</span>"
					+"</div>";
				$("#coopperationFileListRead").prepend(_newli);
			}else{
				var _newli = "<div class='file'>"
					+"<a class='regular f14' onClick='downloadText_find(\""+ result.data[i].mogodb_id+"\")'>"+ result.data[i].file_name +"</a>"
					+"<span class='c999 ml20'>"+ result.data[i].create_dt +"</span>"
					+"<img class='ml20' src='/vip/resources/images/applyAccess/binGrey.png' onClick='deluploadText(this,"+ result.data[i].id +")'>"
					+"</div>";	
				$("#coopperationFileList").prepend(_newli);
			}
		}
		if(result.data.length > 0){
			textFlag = true;
		}
	};
	asyncAjaxMethod(url, params, false, fn);
	return textFlag;
}

/**
 * 多图上传
 * addImg
 * @param thisEvent
 * @param fileType void
 * @author mishengliang
 */
function addImg(thisEvent,fileType){
	if($(thisEvent).val()!=""){//上传空间是否为空
		var ul=$(thisEvent).parent().parent().parent();
		var fileName=$(thisEvent).val();
		var imgSrc="";
		
		var fileElementId = $(thisEvent).attr("id");
		var fileType = fileType;//文件类别
		fileName = fileName.substring(fileName.lastIndexOf("\\")+1,fileName.lastIndexOf("."));
		
		
		var fileurl = "PfTaskFileCtrl/addOrUpdateTaskImgFile.do";
		var params = {
		    	companyId:companyId,
		        fileType:fileType,
		        fileName:fileName,
		        formatType:"image"};
		var fn = function(data){//服务器成功响应处理函数
	      	if (data.success==true &&data.message=="上传成功") {
	      		imgSrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+data.mongodbId;
	      		var imgSrcDom = "<img class='company_fact_pic frame posR' src='"+imgSrc+"'/>";//24 厂容厂貌
	      		if(fileType == 26){
	      			imgSrcDom = "<img class='frame' src='"+imgSrc+"'/>";//26专利
	      		}else if(fileType == 27){
	      			imgSrcDom = "<img class='frame' src='"+imgSrc+"'/>";//27企业其他资源图片
	      		}
	     		var filenameShow=subStringForFileName(fileName,13);
				var creatDate = data.creatDate;
	     		var _newli='<li>'
		     					+"<div class='pic image_block_pic' style='height:140px;'>"
				     			//+"<img class='frame' src='"+imgSrc+"'/>"
						     		+imgSrcDom
						     		+"<div class='a_bg'></div>"
						     		+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses_more(this,"+ data.fileId +")'>删除</a></div>"
					     		+"</div>"
					     		+"<div class='pic_edit'>"
					     			+"<span class='filename' title="+fileName+">"+filenameShow+"</span><span onclick='picRename(this)' class='picRename'><img src='/vip/resources/images/applyAccess/penGrey.png'>重命名</span>"
					     			+"<input value='' class='hide rename_wrap'/><button onclick='savePicName(this,"+ data.fileId +")' class='savePicName hide'>保存</button>"
					     		+"</div>"
				     		+"</li>";
				$(ul).prepend(_newli);
				//当前上传控件清空
				$(thisEvent).val("");
	         }else{
	        	 window.wxc.xcConfirm(data.message);
	         }
		};
	    addInputUtilFile(fileurl,params,fileElementId,fn);
		
	   	/*$.ajaxFileUpload({
		     url: getwebroot()+"PfTaskFileCtrl/addOrUpdateTaskImgFile.do",
		     data: {
		    	companyId:companyId,
		        fileType:fileType,
		        fileName:fileName,
		        formatType:"image"
		     },
		     fileElementId: fileElementId,//input type=file 的id
		     dataType: "json",
		     success: function (data, status){//服务器成功响应处理函数
		      	if (data.success==true &&data.message=="上传成功") {
		      		imgSrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+data.mongodbId;
		      		var imgSrcDom = "<img class='company_fact_pic frame posR' src='"+imgSrc+"'/>";//24 厂容厂貌
		      		if(fileType == 26){
		      			imgSrcDom = "<img class='frame' src='"+imgSrc+"'/>";//26专利
		      		}else if(fileType == 27){
		      			imgSrcDom = "<img class='frame' src='"+imgSrc+"'/>";//27企业其他资源图片
		      		}
		     		var filenameShow=subStringForFileName(fileName,13);
					var creatDate = data.creatDate;
		     		var _newli='<li>'
			     					+"<div class='pic image_block_pic' style='height:140px;'>"
					     			//+"<img class='frame' src='"+imgSrc+"'/>"
							     		+imgSrcDom
							     		+"<div class='a_bg'></div>"
							     		+"<div class='oprate_wrap'><img src='/vip/resources/images/applyAccess/bin.png' class='mr5'><a href='javascript:void(0)' onClick='delCompany_licenses_more(this,"+ data.fileId +")'>删除</a></div>"
						     		+"</div>"
						     		+"<div class='pic_edit'>"
						     			+"<span class='filename' title="+fileName+">"+filenameShow+"</span><span onclick='picRename(this)' class='picRename'><img src='/vip/resources/images/applyAccess/penGrey.png'>重命名</span>"
						     			+"<input value='' class='hide rename_wrap'/><button onclick='savePicName(this,"+ data.fileId +")' class='savePicName hide'>保存</button>"
						     		+"</div>"
					     		+"</li>";
					$(ul).prepend(_newli);
					//当前上传控件清空
					$(thisEvent).val("");
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

//百度地图API功能
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
	var city=$('#city').text();
	var country=$('#county').text();
	var street_content=$("#contactAddr").val();
	var street_content_pro=$("#contactAddrPro").val();
	
	if($('#city').find("input").val()==''||$('#city').find("input").val()==undefined){
		window.wxc.xcConfirm("请选择城市",confirm);
		return;
	}else{
		if($('#county').find("input").val()==''||$('#county').find("input").val()==undefined){
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
						$(".location_map").next().css("display","none");//隐藏报错
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
							$(".location_map").next().css("display","none");//隐藏报错
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
		var province=$('#province').text();
		map.centerAndZoom(province,8);
	}
	//市
	else if(type==2)
	{
		var city=$('#city').text();
		map.centerAndZoom(city,12);
	}
	//区、县
	else if(type==3)
	{
		var country=$('#county').text();
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
function custormSearch(){
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
	}
	var local = new BMap.LocalSearch(map, { //智能搜索
	  onSearchComplete: myFun
	});
	local.search(myValue);
	}
}

//下载文档
function downloadText_find(mogondbId) {
	window.open(getwebroot()
			+ "PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="
			+ mogondbId);
}

//银行账号操作
function doBankAccount(){
	var flagForBankAccount = 0;
	var bankAccount = new Array();
	$("#bank").find(".part").each(function(index,element){
		var bankAccountItem = {};
		bankAccountItem.accountName = $(element).find("input").eq(0).val();
		bankAccountItem.accountCode = $(element).find("input").eq(1).val();
		bankAccountItem.accountId = $(element).find("input").eq(2).val();
		bankAccountItem.defaultId = $(element).find("input").eq(3).prop("checked") ? 1:0;//选中1     未选中0
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
	$("#invoice").find(".part").each(function(index,element){
		var invoiceTitleItem = {};
		invoiceTitleItem.invoiceTitleName = $(element).find("input").eq(0).val();
		invoiceTitleItem.invoiceTitleId = $(element).find("input").eq(1).val();
		invoiceTitleItem.defaultId = $(element).find("input").eq(2).prop("checked") ? 1:0;//选中1     未选中0
		if(typeof(invoiceTitleItem.invoiceTitleName) != "undefined"){
			invoiceTitle[flagForInvoiceTitle] = JSON.stringify(invoiceTitleItem);
			flagForInvoiceTitle++;
		}
	});
	return invoiceTitle.toString();//返回数据对象的string格式
}

//操作主要客户
function doCustomer(){
	var customer = doCusArray();
	return objectArrayToString(customer);//将js的数组对象转化为String //base.js中
}
function doCusArray(){
	var flagForCustomer = 0;
	var customer = new Array();
	$("#customer").find(".part").each(function(index,element){
		var customerItem = {};
		customerItem.customerId = $(element).find("input").eq(1).val();
		customerItem.customerName = $(element).find("input").eq(0).val();
		if(typeof(customerItem.customerName) != "undefined" && customerItem.customerName != ""){//过滤非输入框
			customer[flagForCustomer] = customerItem;
			flagForCustomer++;
		}else if(customerItem.customerName == "" && $(element).find("input[type=hidden]").val() != -1){
			customer_delIds.push($(element).find("input[type=hidden]").val());
		}
	});
	return customer;
}

//操作主要竞争对手
function doCompetitor(){
	var competitor = doComArray();
	return objectArrayToString(competitor);//将js的数组对象转化为String //base.js中
}
function doComArray(){
	var flagForCompetitor = 0;
	var competitor = new Array();
	$("#competitor").find(".part").each(function(index,element){
		var competitorItem = {};
		competitorItem.competitorId = $(element).find("input").eq(1).val();
		competitorItem.competitorName = $(element).find("input").eq(0).val();
		if(typeof(competitorItem.competitorName) != "undefined"){
			competitor[flagForCompetitor] = competitorItem;
			flagForCompetitor++;
		}
	});
	return competitor;
}

//商品操作
function doGoods(){
	var goods = doGooArray();
	return objectArrayToString(goods);//将js的数组对象转化为String //base.js中
}
function doGooArray(){
	var flagForGoods = 0;
	var goods = new Array();
	$("#saleProduct").find(".part").each(function(index,element){
		var goodsItem = {};
		goodsItem.goodsId = $(element).find("input").eq(2).val();
		goodsItem.goodsBrand = $(element).find("input").eq(1).val();
		goodsItem.goodsName = $(element).find("input").eq(0).val();
		if(typeof(goodsItem.goodsName) != "undefined"){
			goods[flagForGoods] = goodsItem;
			flagForGoods++;
		}
	});
	return goods;
}

//原材料操作
function doMaterial(){
	var material = doMatArray();
	return objectArrayToString(material);//将js的数组对象转化为String //base.js中
}
function doMatArray(){
	var flagForMaterial = 0;
	var material = new Array();
	$("#material").find(".part").each(function(index,element){
		var materialItem = {};
		materialItem.materialId = $(element).find("input").eq(2).val();
		materialItem.materialBrand = $(element).find("input").eq(1).val();
		materialItem.materialName = $(element).find("input").eq(0).val();
		if(typeof(materialItem.materialName) != "undefined"){
			material[flagForMaterial] = materialItem;
			flagForMaterial++;
		}
	});
	return material;
}

//获取设备
function doDevice(){
	var device = doDevArray();
	var deviceString = objectArrayToString(device);//将js的数组对象转化为String //base.js中
	return deviceString;
}
function doDevArray(){
	var flagForDevice = 0;
	var device = new Array();
	$("#machineInfoForEdit").find(".part").each(function(index, element) {
		var deviceItem = {};
		deviceItem.deviceName = $(element).find("input").eq(0).val();
		deviceItem.specifications = $(element).find("input").eq(1).val();
		deviceItem.place = $(element).find("input").eq(2).val();
		deviceItem.price = $(element).find("input").eq(3).val();
		deviceItem.buyDay = $(element).find("input").eq(4).val();
		deviceItem.deviceNum = $(element).find("input").eq(5).val();
		deviceItem.advanced = $(element).find("input").eq(6).val();
		deviceItem.deviceId = $(element).find("input").eq(7).val();
		if(typeof (deviceItem.deviceName) != "undefined") {
			device[flagForDevice] = deviceItem;
			flagForDevice++;
		}
	});
	return device;
}

/**
 * 采购分类
 * doCategory
 * @returns any
 * @author mishengliang
 * 2016-11-2 下午3:41:20
 */
function doCategory(){
	var cateList = new Array();
	$(".forEdit .sortChoosed li").each(function(index,element){
		if($(element).val() != 0){
			cateList.push($(element).val());
		}
	});
	return cateList.join();
}
function doCategoryForSaveShow(){
	var cateList = new Array();
	$(".forEdit .sortChoosed li").each(function(index,element){
		if($(element).val() != 0){
			var cate = {};
			cate.category_id = $(element).val();
			cate.category_name = $(element).find("span").html();
			cate.f_id = $(element).find("input").val();
			cateList.push(cate);
		}
	});
	return cateList;
}

/**
 * 设置默认值
 * setDefault void
 * @author mishengliang
 * 2016-10-25 上午9:31:09
 */
function setDefault(){}

/**
 * 删除银行账号
 * delBankAccountById void
 * @author yukai
 * 2016-8-5 上午9:01:10
 */
function delBankAccountById(){
	var url="PfBankAccountCtrl/deleteBankAccounts.do";
	var params={};
	params.account_ids=bankAccount_delIds.join(",");
	var fn = function(result){
	};
	asyncAjaxMethod(url,params,false,fn);
}
/**
 * 删除发票抬头
 * delInvoiceTitleById void
 * @author yukai
 * 2016-8-5 上午9:01:10
 */
function delInvoiceTitleById(){
	var url="PfInvoiceTitleCtrl/deleteInvoiceTitles.do";
	var params={};
	params.invoice_title_ids=invoiceTitle_delIds.join(",");
	var fn = function(result){
	};
	asyncAjaxMethod(url,params,false,fn);
}

/**
 * 删除销售产品
 * delSaleById void
 * @author mishengliang
 * 2016-10-27 下午2:04:12
 */
function delSaleById(){
	if(goods_delIds!=null && goods_delIds.length != 0){
		var url="PfGoodsCtrl/deleteGoodss.do";
		var params={};
		params.goodsIds=goods_delIds.join(",");
		var fn = function(result){
		};
		asyncAjaxMethod(url,params,false,fn);
	}
}

/**
 * 删除原材料
 * delMaterialById void
 * @author mishengliang
 * 2016-10-27 下午2:04:34
 */
function delMaterialById(){
	if(material_delIds!=null && material_delIds.length != 0){
		var url="PfMetarialCtrl/deleteMetarials.do";
		var params={};
		params.materialIds=material_delIds.join(",");
		var fn = function(result){
		};
		asyncAjaxMethod(url,params,false,fn);
	}
}

/**
 * 删除竞争对手
 * delCompetitorById void
 * @author mishengliang
 * 2016-10-27 下午1:58:43
 */
function delCompetitorById(){
	if(competitor_delIds!=null && competitor_delIds.length != 0){
		var url="PfCompetitorCtrl/deleteCompetitor.do";
		var params={};
		params.competitorIds=competitor_delIds.join(",");
		var fn = function(result){
		};
		asyncAjaxMethod(url,params,false,fn);
	}
}

/**
 * 删除客户
 * delCustomerById void
 * @author mishengliang
 * 2016-10-27 下午1:59:03
 */
function delCustomerById(){
	if(customer_delIds != null && customer_delIds.length != 0)
	{
		var url="PfCustomerCtrl/deleteCustomer.do";
		var params={};
		params.customerIds=customer_delIds.join(",");
		var fn = function(result){
		};
		asyncAjaxMethod(url,params,false,fn);
	}
}

/**
 * 删除设备
 * delDevicelistRow void
 * @author mishengliang
 * 2016-10-25 下午3:23:39
 */
function delDevicelistRow(){
	var url="PfDeviceCtrl/deleteDevices.do";
	var params={};
	params.deviceIds=deviceIds.join(",");
	var fn = function(result){};
	asyncAjaxMethod(url,params,false,fn);
}
/**根据fid查询相应的供应品类
 * getSortByFid
 * @param fid
 * @returns any
 * @author wangjialin
 * 2016-10-25 下午3:57:35
 */
function getSortByFid(f_id){
	var data;
	var url = "purchaseCategory/getPurchaseCategoryListByFid.do";
	var params = {};
	params.f_id=f_id;
	var fn = function(result) {
		data=result.data;
	};
	asyncAjaxMethod(url, params, false, fn);
	return data;
}
/**
 * 根据当前类目ID找到父类目
 * getParentCategoryById
 * @param id void
 * @author yukai
 * 2016-9-9 上午11:20:02
 */
function getParentCategoryById(id){
	var category;
	var url = "purchaseCategory/getParentCategoryById.do";
	var params = {};
	params.category_id=id;
	var fn = function(result) {
		category=result.data;
	};
	asyncAjaxMethod(url, params, false, fn);
	return category;
}
/**显示供应品类选择列表
 * showSort void
 * @author wangjialin
 * 2016-10-25 下午5:16:20
 */
function showSort(){
	$(".sortSelect ul li").remove();
	var categoryLevel1,categoryLevel2,categoryLevel3;
	categoryLevel1=JSON.parse(sessionStorage.getItem("categoryLevel1"));
	categoryLevel2=JSON.parse(sessionStorage.getItem("categoryLevel2"));
	categoryLevel3=JSON.parse(sessionStorage.getItem("categoryLevel3"));
	for(var i=0;i<categoryLevel1.length;i++){
		$(".sortSelect .first ul").append('<li value='+categoryLevel1[i].category_id+' onclick="getSort(this,1,'+categoryLevel1[i].category_id+')"  ><input type="hidden" value='+categoryLevel1[i].count+'><input type="checkbox" class="mr5" value='+categoryLevel1[i].category_id+' onclick="chooseSort1(this)">'+categoryLevel1[i].category_name+'<span class="f_r"><img src="/vip/resources/images/applyAccess/arrowRight.png"></span></li>');
	}
	$(".sortSelect").css("display","block");
	for(var i=0;i<categoryLevel2.length;i++){
		$(".sortSelect .second ul").append('<li value='+categoryLevel2[i].category_id+' onclick="getSort(this,2,'+categoryLevel2[i].category_id+')"  ><input type="hidden" value='+categoryLevel2[i].count+'><input type="checkbox" class="mr5" value='+categoryLevel2[i].category_id+' onclick="chooseSort2(this)">'+categoryLevel2[i].category_name+'<span  class="f_r"><img src="/vip/resources/images/applyAccess/arrowRight.png" ></span></li>');
	}
	for(var i=0;i<categoryLevel3.length;i++){
		$(".sortSelect .third ul").append('<li value='+categoryLevel3[i].category_id+'><input type="checkbox" class="mr5" value='+categoryLevel3[i].category_id+' onclick="chooseSort3(this)">'+categoryLevel3[i].category_name+'</li>');
	}
	$(".sortSelect .first ul").children().eq(0).addClass("focused");
	$(".sortSelect .second ul").children().eq(0).addClass("focused");
	$(".closeSort").on("click",function(){
		if($(this).parents(".forEdit").find(".allSorts").children().length>0){
			$(this).parent().parent().next().hide();
		}else{
			$(this).parent().parent().next().show();
		}
		$("#sortSelect").css("display","none");
	});
	optionChoosed1(); 
}
/**根据父级查询并显示相应的子类
 * getSort
 * @param obj
 * @param i
 * @param id void
 * @author wangjialin
 * 2016-10-25 下午5:16:37
 */
function getSort(obj,index,id){
	var result=getSortByFid(id);
	if(index==1){
		$(".sortSelect .second ul li").remove();
		$(".sortSelect .third ul li").remove();
		for(var i=0;i<result.length;i++){
			$(".sortSelect .second ul").append('<li value='+result[i].category_id+' onclick="getSort(this,2,'+result[i].category_id+')"><input type="hidden" value='+result[i].count+'><input type="checkbox" class="mr5" value='+result[i].category_id+' onclick="chooseSort2(this)">'+result[i].category_name+'<span class="f_r"><img src="/vip/resources/images/applyAccess/arrowRight.png"></span></li>');
		}
		$(".sortSelect .first ul li").removeClass("focused");
		$(obj).addClass("focused");
		if(result.length>0){
			var result2=getSortByFid(result[0].category_id);
			for(var i=0;i<result2.length;i++){
				$(".sortSelect .third ul").append('<li value='+result2[i].category_id+'><input type="checkbox" class="mr5" value='+result2[i].category_id+' onclick="chooseSort3(this)">'+result2[i].category_name+'</li>');
			}
		}
		$(".sortSelect .second ul").children().eq(0).addClass("focused");
		optionChoosed3(obj);
	}
	if(index==2){
		$(".sortSelect .third ul li").remove();
		for(var i=0;i<result.length;i++){
			$(".sortSelect .third ul").append('<li value='+result[i].category_id+'><input type="checkbox" class="mr5" value='+result[i].category_id+' onclick="chooseSort3(this)">'+result[i].category_name+'</li>');
		}
		$(".sortSelect .second ul li").removeClass("focused");
		$(obj).addClass("focused");
		optionChoosed2(obj);
	}
}
/**供应品类一级选择
 * choosedSort1
 * @param e void
 * @author wangjialin
 * 2016-10-27 上午10:11:45
 */
function chooseSort1(e){
	var v=$(e).val();
	var n=$(e).parent().text();
	if($(e).is(":checked")){
		appendSort(v,n);
		$(".sortSelect .sortLevel2 li").find("input[type='checkbox']").prop("indeterminate",false);
		$(".sortSelect .sortLevel2 li").find("input[type='checkbox']").prop("checked",true);
		$(".sortSelect .sortLevel3 li").find("input[type='checkbox']").prop("checked",true);
	}else{
		$("#productInfoForEdit .sortChoosed ul").find("#"+v).remove();
		$(".sortSelect .sortLevel2 li").find("input[type='checkbox']").prop("indeterminate",false);
		$(".sortSelect .sortLevel2 li").find("input[type='checkbox']").prop("checked",false);
		$(".sortSelect .sortLevel3 li").find("input[type='checkbox']").prop("checked",false);
	}
}
/**供应品类二级选择
 * chooseSort2
 * @param e void
 * @author wangjialin
 * 2016-10-26 上午11:14:11
 */
function chooseSort2(e){
	var v2=$(e).val();
	var n2=$(e).parent().text();
	var r=getParentCategoryById(v2);
	var v1=r.category_id;
	var n1=r.category_name;
	if($(e).is(":checked")){
		judge1(v1,n1,v2,n2);
		$(".sortSelect .sortLevel3 li").find("input[type='checkbox']").prop("checked",true);
	}else{
		judge2(v1,v2);
		$(".sortSelect .sortLevel3 li").find("input[type='checkbox']").prop("checked",false);
	}
}
/**供应品类三级选择
 * chooseSort3
 * @param e void
 * @author wangjialin
 * 2016-10-26 上午11:14:32
 */
function chooseSort3(e){
	var l1=$(".sortLevel3 li input[type='checkbox']").length;
	var l2=$(".sortLevel3 li input[type=checkbox]:checked").length;
	var v3=$(e).val();
	var n3=$(e).parent().text();
	var r1=getParentCategoryById(v3);
	var v2=r1.category_id;
	var n2=r1.category_name;
	var r2=getParentCategoryById(v2);
	var v1=r2.category_id;
	var n1=r2.category_name;
	if($(e).is(":checked")){
		if(l2<l1){//三级分类部分选中
			$(".sortSelect .sortLevel2 .focused").find("input[type='checkbox']").prop("indeterminate",true);
			$(".sortSelect .sortLevel1 .focused").find("input[type='checkbox']").prop("indeterminate",true);
			$(".sortSelect .sortLevel2 .focused").find("input[type='checkbox']").prop("checked",false);
			$(".sortSelect .sortLevel1 .focused").find("input[type='checkbox']").prop("checked",false);
			if($("#productInfoForEdit .sortChoosed ul").find("#"+v1).length!=0&&$("#productInfoForEdit .sortChoosed ul #"+v1).find(".level2Choosed #"+v2).length!=0){//二级分类已显示，只拼接三级分类即可
				appendSort3ForSingle(e,v1,v2);
			}else{//二级分类未显示，则需先拼接二级分类再拼接三级分类
				if($("#productInfoForEdit .sortChoosed ul").find("#"+v1).length!=0){//一级类目已存在
					appendSort2ForSingle(v1,v2,n2);
					appendSort3ForSingle(e,v1,v2);
				}else{//一级类目未存在
					appendSort1ForSingle(v1,n1);
					appendSort2ForSingle(v1,v2,n2);
					appendSort3ForSingle(e,v1,v2);
				}
			}
		}else{//三级分类全选
			$(".sortSelect .sortLevel2 .focused").find("input[type='checkbox']").prop("indeterminate",false);
			$(".sortSelect .sortLevel2 .focused").find("input[type='checkbox']").prop("checked",true);
			var symbol=1;
			judge1(v1,n1,v2,n2);
		}
	}else{//去除勾选
		if(l2!=0){//三级分类部分选中
			$(".sortSelect .sortLevel2 .focused").find("input[type='checkbox']").prop("indeterminate",true);
			$(".sortSelect .sortLevel1 .focused").find("input[type='checkbox']").prop("indeterminate",true);
			$(".sortSelect .sortLevel2 .focused").find("input[type='checkbox']").prop("checked",false);
			$(".sortSelect .sortLevel1 .focused").find("input[type='checkbox']").prop("checked",false);
			$("#productInfoForEdit .sortChoosed ul #"+v1).find(".level2Choosed #"+v2).find(".level3Choosed #"+v3).remove();//直接去除该分类
		}else{//三级分类均不选
			$(".sortSelect .sortLevel2 .focused").find("input[type='checkbox']").prop("indeterminate",false);
			$(".sortSelect .sortLevel2 .focused").find("input[type='checkbox']").prop("checked",false);
			judge2(v1,v2);
		}
	}
}
/**勾选一级类目后，将这个类目下的所有分类均显示
 * appendSort1 void
 * @author wangjialin
 * 2016-10-26 下午3:27:41
 */
function appendSort(v1,n1){
	if($("#productInfoForEdit .sortChoosed .allSorts").find("#"+v1).length==0){//该一级类目未显示
		//拼接一级类目
		appendSort1ForSingle(v1,n1);
		//拼接该一级类目下的所有二级类目
		appendSort2(v1);
	}else{//该一级类目已显示，由半选状态变为全选状态
		$("#productInfoForEdit .sortChoosed .allSorts #"+v1).find(".level2Choosed").children().remove();
		//拼接该一级类目下的所有二级类目
		appendSort2(v1);
	}
}
/**只拼接显示一级类目
 * appendSort1ForSingle void
 * @author wangjialin
 * 2016-10-28 下午1:31:01
 */
function appendSort1ForSingle(v1,n1){
	//拼接一级类目
	var str='<li class="level1Choosed clearfix " id='+v1+' value='+v1+'><input class="fid" value="0" type="hidden"><span class="level1 f_l">'+n1+'</span><ul class="level2Choosed clearfix "></ul></li>';
	$("#productInfoForEdit .sortChoosed .allSorts").append(str);
}
/**单个拼接二级分类
 * appendSort2ForSingle
 * @param v1 void
 * @author wangjialin
 * 2016-10-26 下午6:04:37
 */
function appendSort2ForSingle(v1,v2,n2){
	var item='<li class="f_l clearfix" id='+v2+' value='+v2+'><input class="fid" value='+ v1+' type="hidden"><span class="level2">'+n2+'</span><ul class="level3Choosed clearfix"></ul></li>';
	$("#productInfoForEdit .sortChoosed ul #"+v1).find(".level2Choosed").append(item);
}
/**遍历拼接显示二级分类
 * appendSort2 void
 * @author wangjialin
 * 2016-10-26 下午3:28:00
 */
function appendSort2(v1){
	var result=getSortByFid(v1);
	for(var i=0;i<result.length;i++){
		var str='<li class="f_l clearfix" id='+result[i].category_id+' value='+result[i].category_id+'><input class="fid" value='+ result[i].f_id+' type="hidden"><span class="level2 f_l">'+result[i].category_name+'</span><ul class="level3Choosed clearfix "></ul></li>';
		$("#productInfoForEdit .sortChoosed .allSorts #"+v1).find(".level2Choosed").append(str);
		var res=getSortByFid(result[i].category_id);
		for (var j=0;j<res.length;j++){//拼接该二级类目下的所有三级类目
			var str='<li class="level3 f_l" id='+res[j].category_id+' value='+res[j].category_id+'><input class="fid" value='+ res[j].f_id+' type="hidden"><span>'+res[j].category_name+'<span></li>';
			$("#productInfoForEdit .sortChoosed .allSorts #"+v1).find(".level2Choosed #"+result[i].category_id).find(".level3Choosed").append(str);
		}
	}
}
/**遍历拼接显示三级分类
 * appendSort3
 * @param v1
 * @param v2
 * @returns any
 * @author wangjialin
 * 2016-10-26 下午4:16:25
 */
function appendSort3(v1,v2){
	var result=getSortByFid(v2);
	for(var i=0;i<result.length;i++){
		var str='<li class="level3 f_l" id='+result[i].category_id+' value='+result[i].category_id+'><input class="fid" value='+ result[i].f_id+' type="hidden"><span>'+result[i].category_name+'</span></li>';
		$("#productInfoForEdit .sortChoosed ul #"+v1).find(".level2Choosed #"+v2).find(".level3Choosed").append(str);
	}
}
/**单个拼接三级类目
 * appendSort3ForSingle
 * @param e
 * @param v1
 * @param v2 void
 * @author wangjialin
 * 2016-10-28 下午1:44:54
 */
function appendSort3ForSingle(e,v1,v2){
	var v3=$(e).val();
	var n3=$(e).parent().text();
	var str='<li class="level3 f_l" id='+v3+' value='+v3+'><input class="fid" value='+v2+' type="hidden"><span>'+n3+'</span></li>';
	$("#productInfoForEdit .sortChoosed ul #"+v1).find(".level2Choosed #"+v2).find(".level3Choosed").append(str);
}
/**二级分类勾选判断
 * judge1
 * @param e void
 * @author wangjialin
 * 2016-10-26 下午3:28:34
 */
function judge1(v1,n1,v2,n2){
	var l1=$(".sortLevel2 li input[type='checkbox']").length;
	var l2=$(".sortLevel2 li input[type=checkbox]:checked").length;
	if(l2<l1){//二级分类部分选中
		$(".sortSelect .sortLevel1 .focused").find("input[type='checkbox']").prop("checked",false);
		$(".sortSelect .sortLevel1 .focused").find("input[type='checkbox']").prop("indeterminate",true);
		if(	$("#productInfoForEdit  .sortChoosed ul").find("#"+v1).length!=0){//一级分类已显示,但处于半选状态
			if($("#productInfoForEdit  .sortChoosed ul #"+v1).find(".level2Choosed #"+v2).length==0){//此二级类目未显示
				appendSort2ForSingle(v1,v2,n2);
				appendSort3(v1,v2);
			}else{//此二类目已显示
				$("#productInfoForEdit  .sortChoosed ul #"+v1).find(".level2Choosed #"+v2).find(".level3Choosed li").remove();
				appendSort3(v1,v2);
			}
		}else{
			appendSort1ForSingle(v1,n1);
			appendSort2ForSingle(v1,v2,n2);
			appendSort3(v1,v2);
		}
	}else{//二级分类全选,一级分类已经显示
		$(".sortSelect .sortLevel1 .focused").find("input[type='checkbox']").prop("indeterminate",false);
		$(".sortSelect .sortLevel1 .focused").find("input[type='checkbox']").prop("checked",true);
		//将二级分类及其下的三级分类拼接显示
		$("#productInfoForEdit  .sortChoosed ul #"+v1).find(".level2Choosed #"+v2).find(".level3Choosed li").remove();
		appendSort3(v1,v2);
	}
}
/**二级分类去除勾选判断
 * judge2 void
 * @author wangjialin
 * 2016-10-26 下午3:28:56
 */
function judge2(v1,v2){
	var l2=$(".sortLevel2 li input[type=checkbox]:checked").length;
	var l3=$(".sortLevel2 li input[indeterminate=true]").length;
	if(l2!=0 || l3!=0){//二级分类部分选择
		$(".sortSelect .sortLevel1 .focused").find("input[type='checkbox']").prop("checked",false);
		$(".sortSelect .sortLevel1 .focused").find("input[type='checkbox']").prop("indeterminate",true);
		$("#productInfoForEdit .sortChoosed ul #"+v1).find(".level2Choosed #"+v2).remove();
	}else{//二级分类均未选择
		$(".sortSelect .sortLevel1 .focused").find("input[type='checkbox']").prop("indeterminate",false);
		$(".sortSelect .sortLevel1 .focused").find("input[type='checkbox']").prop("checked",false);
		$("#productInfoForEdit .sortChoosed ul").find("#"+v1).remove();
	}
}

/**显示已选择的分类，用于展示下拉框
 * optionChoosed1 void
 * @author wangjialin
 * 2016-10-26 下午6:32:02
 */
function optionChoosed1(){
	var v1=$(".sortSelect .sortLevel1 .focused").val();
	var v2=$(".sortSelect .sortLevel2 .focused").val();
	$("#productInfoForEdit .allSorts .level1Choosed").each(function(){
		var id1=$(this).val();
		var l=$(this).find(".level2Choosed li").length;
		var l2=$(".sortLevel1 li[value="+id1+"]").find("input[type='hidden']").val();//获取该父节点下的所有类目数
		if(l==l2){
			$(".sortLevel1 li[value="+id1+"]").find("input[type='checkbox']").prop("checked",true);
			$(".sortLevel1 li[value="+id1+"]").find("input[type='checkbox']").prop("indeterminate",false);
		}else{
			$(".sortLevel1 li[value="+id1+"]").find("input[type='checkbox']").prop("indeterminate",true);
			$(".sortLevel1 li[value="+id1+"]").find("input[type='checkbox']").prop("checked",false);
		}
		if(id1==v1){//若此一级类目为当前高亮的，则设置其下的二级类目的选择情况
			$(this).find(".level2Choosed").children().each(function(){
				var id2=$(this).val();
				var len=$(this).find(".level3Choosed li").length;
				var len2=$(".sortLevel2 li[value="+id2+"]").find("input[type='hidden']").val();//获取该父节点下的所有类目数
				if(len==len2){
					$(".sortLevel2 li[value="+id2+"]").find("input[type='checkbox']").prop("checked",true);
					$(".sortLevel2 li[value="+id2+"]").find("input[type='checkbox']").prop("indeterminate",false);
				}else{
					$(".sortLevel2 li[value="+id2+"]").find("input[type='checkbox']").prop("indeterminate",true);
					$(".sortLevel2 li[value="+id2+"]").find("input[type='checkbox']").prop("checked",false);
				}
				if(id2==v2){//若此二级类目为当前高亮的，则设置其下的三级类目的选择情况
					$(this).find(".level3Choosed li").each(function(){
						var id3=$(this).val();
						$(".sortLevel3 li[value="+id3+"]").find("input[type='checkbox']").prop("checked",true);
					});
				}
			});
		}
	});
}
/**显示已选择的分类，用于二级类目切换时
 * optionChoosed2 void
 * @author wangjialin
 * 2016-10-27 上午11:31:56
 */
function optionChoosed2(obj){
	var v1=$(".sortSelect .sortLevel1 .focused").val();
	var v2=$(obj).find("input[type='checkbox']").val();
	var i=$("#productInfoForEdit .allSorts #"+v1).length;
	if(i!=0){
		if($(".sortSelect .sortLevel1 .focused").find("input[type='checkbox']").is(":checked")){//一级选中
			$(".sortLevel2").find("input").prop("checked",true);	
			$(".sortLevel3").find("input").prop("checked",true);
		}else{//一级半选
			var len=$("#productInfoForEdit .allSorts #"+v1).find(".level2Choosed #"+v2).find(".level3Choosed li").length;
			var len2=$(obj).find("input[type='hidden']").val();
			if(len==len2){//此二级选中
				$(".sortLevel3").find("input[type='checkbox']").prop("checked",true);
			}else{//此二级半选
				$(".sortLevel3 li input[type='checkbox']").prop("checked",false);
				$("#productInfoForEdit .allSorts #"+v1).find(".level2Choosed #"+v2).find(".level3Choosed li").each(function(){
					var id =$(this).val();
					$(".sortLevel3 li[value="+id+"]").find("input[type='checkbox']").prop("checked",true);
				});
			}
		}
	}
}
/**显示已选择的分类，用于一级类目切换时
 * optionChoosed3 void
 * @author wangjialin
 * 2016-11-3 上午10:34:00
 */
function optionChoosed3(obj){
	var v1=$(obj).find("input[type='checkbox']").val();
	var v2=$(".sortSelect .sortLevel2 .focused").val();
	var i=$("#productInfoForEdit .allSorts #"+v1).length;
	if(i!=0){
		$("#productInfoForEdit .allSorts #"+v1).find(".level2Choosed").children().each(function(){
			var id2=$(this).val();
			var len=$(this).find(".level3Choosed li").length;
			var len2=$(".sortLevel2 li[value="+id2+"]").find("input[type='hidden']").val();//获取该父节点下的所有类目数
			if(len==len2){
				$(".sortLevel2 li[value="+id2+"]").find("input[type='checkbox']").prop("checked",true);
				$(".sortLevel2 li[value="+id2+"]").find("input[type='checkbox']").prop("indeterminate",false);
			}else{
				$(".sortLevel2 li[value="+id2+"]").find("input[type='checkbox']").prop("indeterminate",true);
				$(".sortLevel2 li[value="+id2+"]").find("input[type='checkbox']").prop("checked",false);
			}
			if(id2==v2){//若此二级类目为当前高亮的，则设置其下的三级类目的选择情况
				$(this).find(".level3Choosed li").each(function(){
					var id3=$(this).val();
					$(".sortLevel3 li[value="+id3+"]").find("input[type='checkbox']").prop("checked",true);
				});
			}
		});
	}
}
/**图片重命名
 * picRename
 * @param e void
 * @author wangjialin
 * 2016-11-1 下午1:42:01
 */
function picRename(e){
	$(e).hide();
	$(e).prev().hide();
	$(e).parent(".pic_edit").find(".rename_wrap ").val($(e).prev().prop("title"));
	$(e).parent(".pic_edit").find(".rename_wrap ,.savePicName").show();	
}

/**图片重命名后保存
 * savePicName
 * @param e void
 * @author wangjialin
 * 2016-11-1 下午2:45:08
 */
function savePicName(e,fileId){
	var url = "PfTaskFileCtrl/updateTaskFile.do";
	var fileName=$(e).prev().val();
	var params = {};
	params.id = fileId;
	params.fileName = fileName;
	var isasync = true;
	var fn = function(){
		var content =subStringForFileName(fileName,13);
		$(e).parent(".pic_edit").find(".filename").text(content);
		$(e).parent(".pic_edit").find(".filename").prop("title",fileName);
		$(e).hide();
		$(e).prev().hide();
		$(e).parent(".pic_edit").find(".filename ,.picRename").show();	
	};
	asyncAjaxMethod(url,params,true,fn);//执行保存操作
}
/**图片上传文件名截断
 * subStringForFileName
 * @param str
 * @param len
 * @returns any
 * @author wangjialin
 * 2016-11-1 下午4:57:38
 */
function subStringForFileName(str,len){
	var filenameShow;
	if(str.length>len){
		var l=len-1;
		filenameShow=str.substring(0,l)+'...';
	}else{
		filenameShow=str;
	}
	return filenameShow;
}

function saveImgText(obj,fileId)
{
	var url = "PfTaskFileCtrl/updateTaskFile.do";
	var fileName = $(obj).parents(".pic_edit").find(".filename").val();
	var params = {};
	params.id = fileId;
	params.fileName = fileName;
	var isasync = true;
	var fn = function(){
		$(obj).css("display","none");
		$(obj).prev().css("display","inline");
		$(obj).parent().find("label").css("display","inline");
		$(obj).parent().find("label").html(strVachar(fileName,23));
		$(obj).parent().find("input[type=text]").css({"display":"none"});
	};
	asyncAjaxMethod(url,params,true,fn);//执行保存操作
}

/**接收后台数据，拼接展示所有已选的供应品类
 * showSortList
 * @param e：代表是编辑模块（forEdit）或者浏览模块（forRead）
 * @param result void:后台传入的数组
 * @author wangjialin
 * 2016-11-2 下午5:00:13
 */
function showSortList(e,result){
	if(result == undefined)return;
	$("."+e).find(".sortChoosed .allSorts").children().remove();
	var flag1,flag2;
	if(e=='forEdit'){//编辑状态下
		for(var i=0;i<result.length;i++){
			if(result[i].f_id==0){
				flag1=result[i].category_id;
				var str='<li class="level1Choosed clearfix " value='+result[i].category_id+' id='+ result[i].category_id +'><input class="fid" value='+ result[i].f_id+' type="hidden"><span class="level1 f_l">'+result[i].category_name+'</span><ul class="level2Choosed clearfix "></ul></li>';
				$("."+e).find(".sortChoosed .allSorts").append(str);
			}else if(result[i].f_id==flag1){
				flag2=result[i].category_id;
				var str='<li class="f_l clearfix" value='+result[i].category_id+' id='+ result[i].category_id +'><input class="fid" value='+ result[i].f_id+' type="hidden"><span class="level2 f_l">'+result[i].category_name+'</span><ul class="level3Choosed clearfix "></ul></li>';
				$("."+e).find(".sortChoosed .allSorts").find("#"+flag1).find(".level2Choosed").append(str);
			}else{
				var str='<li class="level3 f_l" value='+result[i].category_id+' id='+ result[i].category_id +'><input class="fid" value='+ result[i].f_id+' type="hidden"><span>'+result[i].category_name+'</span></li>';
				$("."+e).find(".sortChoosed .allSorts ").find("#"+flag1).find(".level2Choosed ").find("#"+flag2).find(".level3Choosed").append(str);
			}
		}
	}else{//展示状态下
		for(var i=0;i<result.length;i++){
			if(result[i].f_id==0){
				flag1=result[i].category_id;
				var str='<li class="level1">'+result[i].category_name+'</li>';
				$("."+e).find(".sortChoosed .allSorts").append(str);
			}else if(result[i].f_id==flag1){
				var str='<li  class="level2">'+result[i].category_name+'</li>';
				$("."+e).find(".sortChoosed .allSorts").append(str);
			}else{
				var str='<li class="level3">'+result[i].category_name+'</li>';
				$("."+e).find(".sortChoosed .allSorts").append(str);
			}
		}
	}
}