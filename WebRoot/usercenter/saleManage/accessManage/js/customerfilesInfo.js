var record_id=getParamFromWindowName("record_id");
var supplier_id=getParamFromWindowName("supplier_id");
var companyId=getParamFromWindowName("companyIdForAll");
var companyIdForCusomer=getParamFromWindowName("companyIdForCusomer");
var h_id;
/*
 * 页面加载事件
 * create_by yangliping 2016-6-30 17:32:19
 * */ 
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
		if(record_id!=null){
			getAccessRecord();
		}else{
			h_id=1;
		}
		getPurchaseCategoryInfo();
		if(getPassTime()!=null){
			$("#passTime").text("准入时间："+getPassTime());
		}
		var companyData=getCompanyInfo();
		baseInfoShow_PF(companyData);//基础信息展示
		picPathSrcForBaseInfo(companyIdForCusomer,18,"#business_licence");//营业执照  //base.js中 
		picPathSrcForBaseInfo(companyIdForCusomer,19,"#tax_registration_certificate");//税务登记
		picPathSrcForBaseInfo(companyIdForCusomer,20,"#organization_code_certificate");//组织机构代码证
		picPathSrcForBaseInfo(companyIdForCusomer,21,"#taxpayer_qualification_certification");//纳税人资格证书
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
					$("#evaluation").children().eq(1).children().eq(3).find("a").prepend(">>");
					$("#evaluation").children().eq(1).children().eq(3).addClass("currVip");
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
				$("#evaluation").children().eq(1).children().eq(3).addClass("curr");
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
	currtab("#customerInfo",num);
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
	switch(tabNum){
	case 1:
		getAccessTemplet_DetailInfo();
		break;
	case 2:
		getAccessTemplet_ScalepowerInfo();
		break;
	case 3:
		getAccessAccountInfo();//银行信息
		getAccessInvoiceTitleInfo();//发票信息
		break;
	}
}
//获取详细信息模板
function getAccessTemplet_DetailInfo(){
	var url="AccessApplicationCtrl/getAccessTemplet.do";
	var params={};
	params.hId=h_id;
	params.classifyId=2;
	var fn=function(result){
		var item='<div class="ml20 mt20">';
		for(i=0;i<result.data.length;i++){
			for(j=0;j<result.data.length;j++){
				if(result.data[j].order_by==i+1){
					if(result.data[j].elements.length>0){
						var related_basis=result.data[j].elements[0].related_basis;
					}
					if(result.data[j].templet_name=="主要原材料及品牌"){
						item+='<div class="display_inner_line_wrap ml20 mt20">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>'
						+'<div id="mateial" class=" mt10 ml20">'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="主要销售产品及品牌"){
						item+='<hr class="hr_grey mt30 clear" >'	
						+'<div class="display_inner_line_wrap ml20 mt20">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>'
						+'<div id="goods" class=" mt10 ml20">'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="主要客户"){
						item+='<div class="display_inner_line_wrap ml20 mt20">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>'
						+'<div id="customer" class=" mt10 ml20">'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="主要竞争对手"){
						item+='<div class="display_inner_line_wrap ml20 mt20">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>'
						+'<div id="competitor" class=" mt10 ml20">'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="厂容厂貌"){
						item+='<hr class="hr_grey mt30 clear" >'	
						+'<div class="display_inner_line_wrap ml20 mt20">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>'
						+'<div id="company_equipment_imgs" class="buslicense_wrap ml20 mt10">'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="企业简介"){
						item+='<hr class="hr_grey mt30 clear">'	
						+'<div class="display_inner_line_wrap ml20 mt20">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>'
						+'<div id="'+related_basis+'" class="mt10 ml20 font2">'
						+'</div>';
						break;
					}
					else{
						item+='<div class="display_inner_line_wrap">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'<span id="'+related_basis+'" class="display_wrap"></span>'
						+'</div>';
						break;
					}
				}
			}
		}
		item+='<div class="t_algin_r">'
					+'<button class="yellow_button ml10 mt30 mb30" onClick="goNext(0)">上一页</button>'
					+'<button class="yellow_button ml10 mt30 mb30" onClick="goNext(2)">下一页</button>'
				+'</div>';
		$("#detail_info").html(item);
		getAccessApplicationInfo(2);
		saleShow();//主要销售产品及品牌
		materialShow();//主要原材料及品牌
		customerShow();//主要用户展示
		competitorShow();//主要竞争对手展示
		showMorePic1(24);//24 为厂容厂貌  showMorePic:显示多张图片的方法
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
					if(result.data[j].templet_name=="员工人数"){
						item+='<div class="ml10 mt30 b"><span class="title_split">||</span>&nbsp;&nbsp;基本信息</div>'
						+'<div class="ml30">'
						+'<div class="display_inner_line_wrap">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'<span id="'+related_basis+'" class="label_wrap"><span class="display_wrap"></span>人</span>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="其他人员"){
						item+='<div id="otherperson" class="display_inner_line_wrap">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="人员结构"){
						item+='<div id="persontype" class="display_inner_line_wrap">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="质量控制"){
						item+='<hr class="hr_grey mt30 clear" >'	
						+'<div class="ml30">'
						+'<div class="display_inner_line_wrap"  style="width:50%;">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'<span id="'+related_basis+'" class="display_wrap ml20"></span>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="OEM代加工"){
						item+='<div class="display_inner_line_wrap" style="width:50%;">'
						+'<span class="label_wrap" >'+result.data[j].templet_name+'</span>'
						+'<span id="'+related_basis+'" class="display_wrap ml20"></span>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="管理体系认证"){
						item+='<div class="display_inner_line_wrap">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'<span id="'+related_basis+'" class="display_wrap ml20"></span>'
						+'</div>'
						+'<div class="buslicense_wrap ml20 mt10">'
						+'<div class="img_wrap_1">'
						+'<div class="img_block_pic">'
						+'<img id="management_system" class="ml80" src="/newresources/images/moreLicense.png">'
						+'</div>'
						+'</div>'
						+'</div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="年营业额"){
						item+='<hr class="hr_grey mt30 clear" >'	
						+'<div class="ml30">'
						+'<div class="display_inner_line_wrap"  style="width:50%;">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="label_wrap "></span>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="年出口额"){
						item+='<div class="display_inner_line_wrap"  style="width:50%;">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="label_wrap "></span>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="年进口额"){
						item+='<div class="display_inner_line_wrap"  style="width:50%;">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="label_wrap "></span>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="企业面积"){
						item+='<div class="display_inner_line_wrap"  style="width:50%;">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="label_wrap "><span class="display_wrap"></span>平方米</span>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="厂房面积"){
						item+='<div class="display_inner_line_wrap"  style="width:50%;">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="label_wrap "><span class="display_wrap"></span>平方米</span>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="使用年限"){
						item+='<div class="display_inner_line_wrap"  style="width:50%;">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="useTime" class="display_wrap "></span>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="产权"){
						item+='<div class="display_inner_line_wrap">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="display_wrap "></span>'
							+'</div>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="设备清单"){
						item+='<div class="ml10 mt30 b"><span class="title_split">||</span>&nbsp;&nbsp;'+result.data[j].templet_name+'</div>'
								+'<table id="devicelist" class="customer_tableList ml10 mt20">'
								+'<tr>'
									+'<th>设备名称</th>'
									+'<th>规格</th>'
									+'<th>产地</th>'
									+'<th>价值(万元)</th>'
									+'<th>购买日期</th>'
									+'<th>数量</th>'
									+'<th>先进性</th>'
								+'</tr>'
							+'</table>';
						break;
					}
					else if(result.data[j].templet_name=="院校合作"){
						item+='<div class="ml10 mt30 b"><span class="title_split">||</span>&nbsp;&nbsp;院校信息</div>'
						+'<div class="ml30">'
						+'<p class="mt20">'+result.data[j].templet_name+'</p>'
						+'<p id="'+related_basis+'" class="mt10"></p>'
						+'<p class="mt20">附件信息：</p>'
						+'<div id="annex_text" class="mr20 enclosure">'
						+'</div>'	
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="专利"){
						item+='<div class="ml10 mt30 b"><span class="title_split">||</span>&nbsp;&nbsp;资质图片</div>'
						+'<div class="ml30 ">'
						+'<p class="mt20">'+result.data[j].templet_name+'</p>'
						+'<div id="patent_imgs" class="buslicense_wrap mr10 mt20">'
						+'</div>'	
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="其他资质"){
						item+='<hr class="hr_grey mt30 clear">'
						+'<div  class="ml30 clearfix ">'	
						+'<p class="mt20">'+result.data[j].templet_name+'</p>'
						+'<div id="other_intelligence_imgs" class="buslicense_wrap mr10 mt20">'
						+'</div>'
						+'</div>';
						break;
					}
				}
			}
		}
		item+='<div class="t_algin_r">'
					+'<button class="yellow_button ml10 mt30 mb30" onClick="goNext(1)">上一页</button>'
					+'<button class="yellow_button ml10 mt30 mb30" onClick="goNext(3)">下一页</button>'
				+'</div>';
		$("#scalepower_info").html(item);
		getAccessApplicationInfo(3);
		deviceShow();//设备展示
		picPathSrc1(25,"#management_system");//质量体系认证
		showMorePic1(26);//专利图片展示
		showMorePic1(27);//其他资质图片展示
		showText1(30);
	};
	asyncAjaxMethod(url,params,true,fn);
}
//获取准入流水
function getAccessRecord(){
	var url="AccessApplicationCtrl/getAccessRecord.do";
	var params={};
	params.record_id=record_id;
	var fn = function(result){
		$("#submit_date").text("提交日期:"+result.data[0].orderby_dt);
		$("#table_title").text(result.data[0].receive_name+"供应商准入申请");
		h_id=result.data[0].h_id;
		//getTableName(h_id);
	};
	asyncAjaxMethod(url,params,false,fn);
}
//获取准入资料信息
function getAccessApplicationInfo(classify_id){
	var url="AccessApplicationCtrl/getAccessApplicationInfo.do";
	var params={};
	params.supplier_id=supplier_id;
	params.classify_id=classify_id;
	var fn = function(result){
		for(var i=0;i<result.data.length;i++){
				if(classify_id==1){
					$("#" + result.data[i].related_basis + "").html(""
							+ result.data[i].content + "");
				}
				else if(classify_id==2){
					if (result.data[i].related_basis == "reg_addr_code") {
						var reg_addr_code=result.data[i].content;
					}
					else if(result.data[i].related_basis == "contact_addr"){
						var contact_addr=result.data[i].content;
					}else{
						$("#" + result.data[i].related_basis + "").html(""
								+ replaceNullAsStr(result.data[i].content) + "");
					}
				}
				else if(classify_id==3){
					if (result.data[i].related_basis == "emplyees") {
						$("#" + result.data[i].related_basis + "").find("span").text(result.data[i].content==null?"":replaceZeroAndNullAsStr(result.data[i].content));
					}
					else if (result.data[i].related_basis == "college_num") {
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
						var str="";
						switch (result.data[i].content) {
							case "0" :
								str="内部";
								break;
							case "1" :
								str="第三方";
								break;
							case "2" :
								str="无";
								break;
							default :
								break;
						}
						$("#"+result.data[i].related_basis+"").text(str);
					}
					else if (result.data[i].related_basis == "is_oem") {
						var str="";
						switch (result.data[i].content) {
							case "0" :
								str="提供";
								break;
							case "1" :
								str="不提供";
								break;
							default :
								break;
						}
						$("#"+result.data[i].related_basis+"").text(str);
					}
					// 质量管理体系
					else if (result.data[i].related_basis == "certification_system") {
						$("#"+result.data[i].related_basis+"").text(replaceNullAsStr(result.data[i].content));
					}
					else if(result.data[i].related_basis == "turnover"){
						var turnover = result.data[i].content;
					}
					else if(result.data[i].related_basis == "turnover_currency_id"){
						var turnover_currency_id = result.data[i].content;
					}
					else if(result.data[i].related_basis == "exportNum"){
						var exportNum = result.data[i].content;
					}
					else if(result.data[i].related_basis == "export_currency_id"){
						var export_currency_id = result.data[i].content;
					}
					else if(result.data[i].related_basis == "importNum"){
						var importNum = result.data[i].content;
					}
					else if(result.data[i].related_basis == "import_currency_id"){
						var import_currency_id = result.data[i].content;
					}
					else if(result.data[i].related_basis == "use_begintime"){
						var use_begintime = result.data[i].content;
					}
					else if(result.data[i].related_basis == "use_endtime"){
						var use_endtime = result.data[i].content;
					}
					else if(result.data[i].related_basis == "companyArea"){
						$("#" + result.data[i].related_basis + "").find("span").text(result.data[i].content==null?"":replaceZeroAndNullAsStr(result.data[i].content));
					}
					else if(result.data[i].related_basis == "factoryArea"){
						$("#" + result.data[i].related_basis + "").find("span").text(result.data[i].content==null?"":replaceZeroAndNullAsStr(result.data[i].content));       
					}
					else if(result.data[i].related_basis == "factory_owner"){
						var str="";
						switch (result.data[i].content) {
							case "0" :
								str="无";
								break;
							case "1" :
								str="租赁";
								break;
							case "2" :
								str="自建";
								break;
							default :
								break;
						}
						$("#"+result.data[i].related_basis+"").text(str);
					} 
					else if(result.data[i].related_basis == "schoolCoop"){
						$("#"+result.data[i].related_basis+"").text(replaceNullAsStr(result.data[i].content));
					}
				}
		}
		if(classify_id==2){
			var province="";
			var city="";
			var country="";
			if(reg_addr_code!=0&&reg_addr_code!=null){
				var provinceNum = Math.floor(parseInt(reg_addr_code)/ 10000)* 10000;
				var cityNum = Math.floor(parseInt(reg_addr_code) / 100)* 100;
				var countryNum = reg_addr_code;
				province=getCityNameByCityCode(provinceNum);
				city=getCityNameByCityCode(cityNum);
				country=getCityNameByCityCode(countryNum);
			}
			var item5=province+city+country+contact_addr;
			$("#contact_addr").html(item5);
		}
		else if(classify_id==3){
			var item="";
			if (techNum != 0 && techNum != null) {
				item+='<span  class="label_wrap  ml10"><span class="display_wrap">科研人员</span>'+techNum+'人</span>';
			}
			if (opNum != 0 && opNum != null) {
				item+='<span  class="label_wrap  ml10"><span class="display_wrap">操作人员</span>'+opNum+'人</span>';
			} 
			if (qcNum != 0 && qcNum != null) {
				item+='<span  class="label_wrap  ml10"><span class="display_wrap">专职检验</span>'+qcNum+'人</span>';
			}  
			if (staffNum != 0 && staffNum != null) {
				item+='<span  class="label_wrap  ml10"><span class="display_wrap">间接员工</span>'+staffNum+'人</span>';
			}
			if (internalAuditorNum != 0
					&& internalAuditorNum != null) {
				item+='<span  class="label_wrap  ml10"><span class="display_wrap">内审人员</span>'+internalAuditorNum+'人</span>';
			}
			$("#otherperson").append(item);
			var item1="";
			if (collegeNum != 0 && collegeNum != null) {
				item1+='<span  class="label_wrap  ml10"><span class="display_wrap">专科及以上</span>'+collegeNum+'人</span>';
			}
			if (diplomaDownNum != 0
					&& diplomaDownNum != null) {
				item1+='<span  class="label_wrap  ml10"><span class="display_wrap">专科以下</span>'+diplomaDownNum+'人</span>';
			}
			$("#persontype").append(item1);
			currencys=CurrencysUtil;
			var currency_name="";
			$.each(currencys,function(index,c){
				if(c.currency_id==turnover_currency_id){
					currency_name=c.currency_name;
				}
			});
			if(turnover!=0&&turnover!=null){
				var item2='<span class="display_wrap">'+turnover+'万'+'</span>'+currency_name+'';
				$("#turnover").html(item2);
			}
			var currency_name1="";
			$.each(currencys,function(index,c){
				if(c.currency_id==export_currency_id){
					currency_name1=c.currency_name;
				}
			});
			if(exportNum!=0&&exportNum!=null){
				var item3='<span class="display_wrap">'+exportNum+'万'+'</span>'+currency_name1+'';
				$("#exportNum").html(item3);
			}
			var currency_name2="";
			$.each(currencys,function(index,c){
				if(c.currency_id==import_currency_id){
					currency_name2=c.currency_name;
				}
			});
			if(importNum!=0&&importNum!=null){
				var item4='<span class="display_wrap">'+importNum+'万'+'</span>'+currency_name2+'';
				$("#importNum").html(item4);
			}
			$("#useTime").text(replaceNullAsStr(use_begintime)+"~"+replaceNullAsStr(use_endtime));
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/*展示公司图片基本信息准入资料附件表读取
 * 
 * fileTypeId 图片文件位置类型ID
 * picId 图片展示位置的img标签ID
 * */
function picPathSrcForBaseInfo1(fileTypeId,picId){
	var url = "AccessApplicationCtrl/getAccessApplicationAttched.do";
	var params = {};
	params.supplier_id = supplier_id;
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
//主要销售产品及品牌展示
function saleShow(){
	var url = "AccessApplicationCtrl/getAccessApplicationGoods.do";
	var params = {};
	params.supplier_id = supplier_id;
	params.record_id = record_id;
	var fn = function(result) {
		var goodsList = result.data;
		var item='';
		if(goodsList.length > 0){
			if (goodsList.length > 1) {
				for(var i=0;i<goodsList.length-1;i++){
					item+='<span class="font2">'+replaceNullAsStr(goodsList[i].goods_name)+'</span><label class="ml10 font1">'+replaceNullAsStr(goodsList[i].goods_brand)+'、</label>';
				}
				item+='<span class="font2">'+replaceNullAsStr(goodsList[goodsList.length-1].goods_name)+'</span><label class="ml10 font1">'+replaceNullAsStr(goodsList[goodsList.length-1].goods_brand)+'</label>';
			}else{
				item+='<span class="font2">'+replaceNullAsStr(goodsList[0].goods_name)+'</span><label class="ml10 font1">'+replaceNullAsStr(goodsList[0].goods_brand)+'</label>';
			}
		}
		$("#goods").html(item);
	};
	asyncAjaxMethod(url, params, true, fn);
}
//主要原材料及品牌展示
function materialShow(){
	var url = "AccessApplicationCtrl/getAccessApplicationMaterial.do";
	var params = {};
	params.supplier_id = supplier_id;
	params.record_id = record_id;
	var fn = function(result) {
		var metarialList = result.data;
		var item='';
		if(metarialList.length > 0){
			if (metarialList.length > 1) {
				for(var i=0;i<metarialList.length-1;i++){
					item+='<span class="font2">'+replaceNullAsStr(metarialList[i].material_name)+'</span><label class="ml10 font1">'+replaceNullAsStr(metarialList[i].material_brand)+'、</label>';
				}
				item+='<span class="font2">'+replaceNullAsStr(metarialList[metarialList.length-1].material_name)+'</span><label class="ml10 font1">'+replaceNullAsStr(metarialList[metarialList.length-1].material_brand)+'</label>';
			}else{
				item+='<span class="font2">'+replaceNullAsStr(metarialList[0].material_name)+'</span><label class="ml10 font1">'+replaceNullAsStr(metarialList[0].material_brand)+'</label>';
			}
		}
		$("#mateial").html(item);
	};
	asyncAjaxMethod(url, params, true, fn);
}
//主要客户展示
function customerShow(){
	var url = "AccessApplicationCtrl/getAccessApplicationCustomer.do";
	var params = {};
	params.supplier_id = supplier_id;
	params.record_id = record_id;
	var fn = function(result) {
		var customerList = result.data;
		var item='';
		if(customerList.length > 0){
			if (customerList.length > 1) {
				for(var i=0;i<customerList.length-1;i++){
					item+='<span class="font2">'+customerList[i].customer_name+'、</span>';
				}
				item+='<span class="font2">'+customerList[customerList.length-1].customer_name+'</span>';
			}else{
				item+='<span class="font2">'+customerList[0].customer_name+'</span>';
			}
		}
		$("#customer").html(item);
	};
	asyncAjaxMethod(url, params, true, fn);
}
//主要竞争对手展示
function competitorShow(){
	var url = "AccessApplicationCtrl/getAccessApplicationCompetitor.do";
	var params = {};
	params.supplier_id = supplier_id;
	params.record_id = record_id;
	var fn = function(result) {
		var competitorList = result.data;
		var item='';
		if(competitorList.length > 0){
			if (competitorList.length > 1) {
				for(var i=0;i<competitorList.length-1;i++){
					item+='<span class="font2">'+competitorList[i].competitor_name+'、</span>';
				}
				item+='<span class="font2">'+competitorList[competitorList.length-1].competitor_name+'</span>';
			}else{
				item+='<span class="font2">'+competitorList[0].competitor_name+'</span>';
			}
		}
		$("#competitor").html(item);
	};
	asyncAjaxMethod(url, params, true, fn);
}
//设备展示 
function deviceShow() {
	var url = "AccessApplicationCtrl/getAccessApplicationDevicelist.do";
	var params = {};
	params.supplier_id = supplier_id;
	params.record_id = record_id;
	var fn = function(result) {
		var deviceList = result.data;
		var item="";
		if (deviceList.length > 0) {
			for(var i=0;i<deviceList.length;i++){
				var buy_day;
				if(deviceList[i].buy_day!=null){
					buy_day=deviceList[i].buy_day.substring(0,deviceList[i].buy_day.lastIndexOf(" "));
				}else{
					buy_day="";
				}
				item+='<tr >'
						+'<td>'+replaceNullAsStr(deviceList[i].device_name)+'</td>'
						+'<td>'+replaceNullAsStr(deviceList[i].specifications)+'</td>'
						+'<td>'+replaceNullAsStr(deviceList[i].place)+'</td>'
						+'<td>'+replaceNullAsStr(deviceList[i].price)+'</td>'
						+'<td>'+replaceNullAsStr(buy_day)+'</td>'
						+'<td>'+replaceNullAsStr(deviceList[i].device_num)+'</td>'
						+'<td>'+replaceNullAsStr(deviceList[i].advanced)+'</td>'
					+'</tr>';
			}
		}
		$("#devicelist").append(item);
	};
	asyncAjaxMethod(url, params, true, fn);
}	
//多张图片展示
function showMorePic1(fileTypeId){
	var url = "AccessApplicationCtrl/getAccessApplicationAttched.do";
	var params = {};
	params.file_type_id = fileTypeId;
	params.supplier_id=supplier_id;
	
	var isasync = true;
	var fn = function(result){
		if(result.data != ""){
				for(var i=0; i<result.data.length; i++){
					var imgSrc = getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[i].mogodb_id;
					var filename = result.data[i].file_name;
					var creatDate = result.data[i].create_dt;
					var _newli='<div class="img_wrap_1">'
							+'<div class="img_block_pic"><img src="'+imgSrc+'"/></div>'
							+'<div class="img_block_text"><label title="'+ filename +'">'+ strVachar(filename,23)+'</label></div>'
						+'</div>';
		     		if(fileTypeId == 24){
		     			$("#company_equipment_imgs").prepend(_newli);
		     		}else if(fileTypeId == 26){
		     			$("#patent_imgs").prepend(_newli);
		     		}else if(fileTypeId == 27){
		     			$("#other_intelligence_imgs").prepend(_newli);
		     		}
				}
			}else{
				var img='<img src="/newresources/images/tasks/notexist.png">';
				if(fileTypeId == 24){
		     			$("#company_equipment_imgs").prepend(img);
		     	}else if(fileTypeId == 26){
		     			$("#patent_imgs").prepend(img);
		     	}else if(fileTypeId == 27){
		     			$("#other_intelligence_imgs").prepend(img);
		     	}
			}
	};		
	asyncAjaxMethod(url,params,isasync,fn);	
}
function showText1(fileType){
	var url = "AccessApplicationCtrl/getAccessApplicationAttched.do";
	var params = {};
	params.file_type_id = fileType;
	params.supplier_id=supplier_id;
	
	var isasync = true;
	var fn = function(result){
		for(var i=0; i<result.data.length; i++){
			var creatDate = result.data[i].create_dt;
			var _newli="<p class='mt10'><a class='blue' onClick='downloadText(this)'>" + result.data[i].file_name + "</a>"
						+'<input type="hidden" value="'+ result.data[i].mogodb_id +'">'
							+"<span class='f_r'>"+ result.data[i].create_dt +"</span></p>";
			
			$("#annex_text").prepend(_newli);
		}
	};		
					
	asyncAjaxMethod(url,params,isasync,fn);	
}
/*展示公司图片基本信息 mishengliang
 * 
 * fileTypeId 图片文件位置类型ID
 * picId 图片展示位置的img标签ID
 * */
function picPathSrc1(fileTypeId,picId){
	var url = "AccessApplicationCtrl/getAccessApplicationAttched.do";
	var params = {};
	params.supplier_id = supplier_id;
	params.file_type_id = fileTypeId;
	
	var isasync = true;
	var fn = function(result){
		if(result.data != ""){
				$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
			}else{
				$(picId).attr("src","/newresources/images/tasks/notexist.png");
			}
	};
	asyncAjaxMethod(url,params,isasync,fn);
}
//获取银行信息
function getAccessAccountInfo(){
	var url="AccessApplicationCtrl/getAccessAccount.do";
	var params={};
	params.supplier_id=supplier_id;
	params.record_id = record_id;
	var fn = function(result){
		var tableItem='<tr>'
						+'<th>开户行</th>'
						+'<th>开户账号</th>'
						+'<th>账号状态</th>'
					+'</tr>';
		for(var i=0;i<result.data.length;i++){
			var account_sts;
			if(result.data[i].account_sts==0){
				account_sts="在用";
			}else{
				account_sts="已注销";
			}
			tableItem+='<tr>'
							+'<td>'+result.data[i].account_name+'</td>'
							+'<td>'+result.data[i].account_code+'</td>'
							+'<td>'+account_sts+'</td>'
						+'</tr>';
		}
		$("#bankTable").html(tableItem);
	};
	asyncAjaxMethod(url,params,true,fn);
}
//获取发票抬头信息
function getAccessInvoiceTitleInfo(){
	var url="AccessApplicationCtrl/getAccessInvoiceTitle.do";
	var params={};
	params.supplier_id=supplier_id;
	params.record_id = record_id;
	var fn = function(result){
 		var tableItem='<tr>'
						+'<th>发票抬头</th>'
					+'</tr>';
		for(var i=0;i<result.data.length;i++){
			tableItem+='<tr>'
							+'<td>'+result.data[i].invoice_title_name+'</td>'
						+'</tr>';
		}
		$("#invoiceTable").html(tableItem);
	};
	asyncAjaxMethod(url,params,true,fn);
}
//下载文档
function downloadText(obj){
	window.open(getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+$(obj).next().val());
}
//获取平台公司信息
function getCompanyInfo(){
	var url = "supplierForPlateForm/getCompanyInfoByCompanyId1.do";
	var params = {};
	params.companyId = companyIdForCusomer;
	var companyData;
	var fn = function(result){
		companyData = result.data;
	};
	asyncAjaxMethod(url,params,false,fn);
	return companyData;
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
/*展示公司图片基本信息平台读取mishengliang
 * 
 * companyId 当前用户的公司ID
 * fileTypeId 图片文件位置类型ID
 * picId 图片展示位置的img标签ID
 * */
function picPathSrcForBaseInfo(companyId,fileTypeId,picId){
	var url = "PfTaskFileCtrl/getTaskFileListForWindow.do";
	var params = {};
	params.companyId = companyIdForCusomer;
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
/**
 * 获取表头名称
 * getTableName
 * @param h_id void
 * @author yukai
 * 2016-8-16 下午2:29:03
 */
function getTableName(h_id){
	var url="AccessApplicationCtrl/getAccessTempletHead.do";
	var params={};
	params.h_id=h_id;
	var fn = function(result){
		$("#table_title").text(result.data[0].table_name);
	};
	asyncAjaxMethod(url,params,true,fn);
}

/**
 * 获取准入通过的时间
 * getPassTime void
 * @author yukai
 * 2016-9-8 上午10:45:01
 */
function getPassTime(){
	var passTime;
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

//获取准入申请供应品类
function getPurchaseCategoryInfo(){
	var url="AccessApplicationCtrl/getAccessApplicationCategoryStr.do";
	var params={};
	params.supplier_id=supplier_id;
	var fn = function(result){
		if(result.data!=""){
			$("#supplyCategory").html('<li class="mr10 f_l">'+result.data+'</li>');
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}