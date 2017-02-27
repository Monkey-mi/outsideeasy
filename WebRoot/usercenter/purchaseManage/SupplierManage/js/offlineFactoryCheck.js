var phone_reg= /^1[3|4|5|7|8]\d{9}$/;//电话验证正则
var pageSize = 5;//每页个数	
var currentPage=0;//当前页码
var companyId = getParamFromWindowName("companyIdForAll");
var fileFlag = true;
var cancelNotiSupplierIds = [];//需要取消通知供应商ID数组
var freeCheckSupplierIds = [];//批量免检供应商ID数组
var recoverSupplierIds = [];//回复验厂的供应商ID数组
var provinceCodes = [];//查询中的纯省份代码数组
var cityCodes = [];//查询中的纯市级代码数组
/* 页面加载事件
 * create_by yangliping 2016-7-7 15:09:38
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
		supplierCheckFacReportShow(0,true);
		var tabId=getParamFromWindowName("tabId");
		var tabNum=getParamFromWindowName("tabNum");
		var informStatus = getParamFromWindowName("informStatus");
		var checkType = getParamFromWindowName("checkType");
		if(informStatus!=undefined){
			$("#notifyStatus").val(informStatus);
			$("#notifyStatus").prev().text($("#notifyStatus").find("option:selected").text());
		}
		if(checkType!=undefined){
			$("#checkFacTypeForNum").val(checkType);
			$("#checkFacTypeForNum").prev().text($("#checkFacTypeForNum").find("option:selected").text());
		}
		if(tabId==undefined){
			tabId="#offlineFactoryCheck";
		}
		if(tabNum==undefined){
			tabNum=0;
		}
		currtab(tabId, tabNum);
		defaultTake();
});

function defaultTake(){
	$(".pop_content_wrap input").blur(function(){
		var id=$(this).attr("id");
		var error_str="";
		if(id=="checkMan")
		{
			if($(this).val()=="")
			{
				error_str="验厂人员不为空";
				checkManFlag=false;
			}
			else
			{
				checkManFlag=true;
			}
		}
		if(id=="checkManPhone")
		{
			if($(this).val()=="")
			{
				error_str="人员电话不为空";
				checkManPhoneFlag=false;
			}else if(!phone_reg.test($(this).val())){
				error_str="电话格式不正确";
				checkManPhoneFlag=false;
			}
			else
			{
				checkManPhoneFlag=true;
			}
		}
		if(id=="planCheckDt")
		{
			if($(this).val()=="")
			{
				error_str="验厂日期不为空";
				planCheckDtFlag=false;
			}
			else
			{
				planCheckDtFlag=true;
			}
		}
		if(id=="input_uploadfile")
		{
			if($(this).val()=="")
			{
				error_str="通知文件不为空";
				checkManFlag=false;
			}
			else
			{
				checkManFlag=true;
			}
		}
		
		if(error_str!=""){//错误信息显示
			$(this).nextAll(".sub_tip").find("span").html(error_str);
			$(this).nextAll(".sub_tip").css("display","inline-block");
		}
		else
		{
			$(this).nextAll(".sub_tip").css("display","none");
		}
	});
}
/*
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * create_by yangliping 2016-7-7 15:09:46
 */
function loadCommonPage(){
	$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success")
			{
				$("#mainNav").children().eq(0).addClass("curr");
				getCompanyList(companyId);
			}
	});
	$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	var result=isLoginForPlateForm();
	if(result.isLogin==true){
		$(".midd_left_wrap").load(getwebroot()+"usercenter/purchaseManage/purchaseLeftMenu.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#evaluation").children().eq(5).children().eq(2).addClass("curr");
				var leftHeight=$(".midd_left_wrap").height();
				if(leftHeight>$(window).height()-200)
				{
					$(".midd_right_wrap").css({minHeight:leftHeight});
				}
			}
		});
	}
}

/**
 * 默认绑定搜索操作
 * loadTake 
 * @author mishengliang
 * 2016-8-25 下午8:30:38
 */
function searchButtonForReport(){
	supplierCheckFacReportShow(0,true);
}
function searchButtonForNotified(){
	notifiedSupplierShow(0,true);
}
function searchButtonForWait(){
	waitNotifySupplierShow(0,true);
}
function searchButtonForExampt(){
	examptSupplierShow(0,true);
}

/*
 * 切换tab事件
  * create_by yangliping 2016-6-30 17:32:19
 * */
function currtab(tabId, tabNum){
	noLimitAddress();//清空地址栏中信息
	var param ={tabNum:tabNum};
	addParamsToWindowName(param);
	//设置点击后的切换样式
	$(tabId + " .tab").children(".curr").removeClass("curr");
	$(tabId + " .tab").children().eq(tabNum).addClass("curr");
	$(tabId + " .tab").children().find("span.split").css("display","inline");
//	$(tabId + " .tab").children().eq(tabNum).prev().find("span.split").css("display","none");
	//根据参数决定显示内容
	$(tabId + " .tabcon").hide();
	$(tabId + " .tabcon").eq(tabNum).show();
	
	switch (tabNum){
	case 0:
		supplierCheckFacReportShow(0,true);
		break;
	case 1:
		notifiedSupplierShow(0,true);
		break;		
	case 2:
		waitNotifySupplierShow(0,true);
		break;
	case 3:
		examptSupplierShow(0,true);
		break;
	}
}

//复选框事件  
//全选、取消全选的事件  
function selectAll(thisEvent,tableId){  
  if ($(thisEvent).is(":checked")) {  
	  $("#"+tableId).find("input:checkbox").prop("checked",true);
  } else {  
	  $("#"+tableId).find("input:checkbox").prop("checked",false);
  }  
}  

/*
 * 遍历采购分类
 */
function classifya(task){
	var result = "";
	for(j=0;j<task.classify.length;j++){
		result = result+ "<span>"+task.classify[j]+"、</span>";
	}
	return result;
}

/**
 * 跳转到企业门户
 * toCpWindow
 * @param companyId void
 * @author mishengliang
 * 2016-9-10 上午9:43:42
 */
function toCpWindow(companyId){
	var params = {companyIdForWindow:companyId};
	addParamsToWindowName(params);
	window.location.href=getwebroot()+"supplierForPlateForm/companyWindow.htm";
}

 /**
 * 显示验厂报告列表 
 * supplierCheckFacReportShow 
 * @author mishengliang
 * 2016-8-23 下午7:46:59
 */
function supplierCheckFacReportShow(pageIndex,needinit){
	var mulParams = $("#searchForReport").val();
	var dateType = $("#dateType").val();
	var startDate = $("#startDateForReport").val();
	var endDate = $("#endDateForReport").val();
	
	currentPage=pageIndex;
	var url = "supplierManager/getSupplierCheckfactoryReportListByAccount.do";
	var params = {};
	params.limit = pageSize;
	params.page = pageIndex;
	params.mulParams = mulParams;
	params.companyId = companyId;
	params.dateType = dateType;
	params.startDate = startDate;
	params.endDate = endDate;
	params.provinceCodes = provinceCodes.join(",");
	params.cityCodes = cityCodes.join(",");
	
	var isasync = true;
	var fn = function(result){
		var reportTotal = result.reportTotal;
		if(pageIndex==0 && needinit){//第一次加载时加载分页控件
			initPaginationForReport(reportTotal);
		}
		
		var reportList = result.reportList;
	 	$("#reportTotal").html(reportTotal);
	 	$("#checkfactoryReportList").html("");
	 	var tableItem="<tr>"
						+"<th style='width:140px;'>报告时间</th>"
						+"<th style='width:auto;'>供应商信息</th>"
						+"<th style='width:140px;'>验厂时间</th>"
						+"<th style='width:80px;'>验厂人员</th>"
						+"<th style='width:245px;'>验厂报告</th>"
					+"</tr>";
	 	for(var i=0;i<reportList.length;i++){
	 		tableItem =tableItem+   "<tr>"+
	 									"<td class=' pt15' valign='top'>"+
	 									"<span>"+reportList[i].create_dt+"</span>"+
	 									"</td>"+
	 									"<td class=' pt15' valign='top'>"+
	 									"	<span class='companyNameForRep' onclick='toCpWindow("+ reportList[i].company_id +")'>"+reportList[i].supplier_cpyname+"</span>"+
	 									"</td>"+
	 									"<td class=' pt15' valign='top'>"+
	 									showBeforeOfDateStr(reportList[i].check_factory_dt)+
	 									"</td>"+
	 									"<td class=' pt15 center' valign='top'>"+
	 										reportList[i].checkor+
	 									"</td>"+
	 									"<td class=' pt15 ' valign='top'>"+
	 										"<a class='blue' onclick=downLoadFile('"+ reportList[i].mogodb_id +"')>"+ reportList[i].file_name +"</a>"+
	 										"<span class='redcolor ml10'>"+reportList[i].check_score+"分</span>"+
	 									"</td>"+
	 								"</tr>";
	 								
	 	}
	 	$("#checkfactoryReportList").html(tableItem);
	};
	asyncAjaxMethod(url,params,isasync,fn);
 };
 
 function initPaginationForReport(totalCount){
		$("#paginationForReport").pagination(totalCount, {
	         callback: pageselectCallbackForReport,
	         prev_text: "<",
	         next_text: ">",
	         items_per_page: pageSize, //每页的数据个数
	         num_display_entries: 3, //两侧首尾分页条目数
	         current_page: 0,   //当前页码
	         num_edge_entries: 2 //连续分页主体部分分页条目数
	     });
	}
 function pageselectCallbackForReport(index,jq){
	 supplierCheckFacReportShow(index,false);
}
 
 /**
  * 下载文件
 * downLoadFile
 * @param mogondbId 文件相应的mogonId
 * @author mishengliang
 * 2016-8-24 下午7:27:19
 */
function downLoadFile(mogodbId){
		window.open(getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+mogodbId);
 }
 
/**
 * 已通知供应商展示
 * notifiedSupplierShow 
 * @author mishengliang
 * 2016-8-23 下午7:47:33
 */
function notifiedSupplierShow(pageIndex,needinit){
	var mulParams = $("#searchForNotified").val();
	var dateType = $("#dateTypeForNotified").val();
	var startDate = $("#startDateForNotified").val();
	var endDate = $("#endDateForNotified").val();
	var status = $("#notifyStatus").val();
	
	currentPage=pageIndex;
	var url = "supplierManager/getNotifiedSuppliers.do";
	var params = {};
	params.limit = pageSize;
	params.page = pageIndex;
	params.mulParams = mulParams;
	params.companyId = companyId;
	params.dateType = dateType;
	params.startDate = startDate;
	params.endDate = endDate;
	params.status = status;
	params.provinceCodes = provinceCodes.join(",");
	params.cityCodes = cityCodes.join(",");
	
	var isasync = true;
	var fn = function(result){
		var notifiedSupplierTotal = result.notifiedSupplierTotal;
		if(pageIndex==0 && needinit){//第一次加载时加载分页控件
			initPaginationForNotified(notifiedSupplierTotal);
		}
		
		var notifiedSupplierList = result.notifiedSupplierList;
		$("#notifiedSupplierShow").html("");
		$("#notifiedSupplierTotal").html(notifiedSupplierTotal);
		var tableItem="<tr>"
						+"<th style='width:160px;'>通知时间</th>"
						+"<th style='width:auto;'>供应商信息</th>"
						+"<th style='width:155px;'>计划验厂日期及人员</th>"
						+"<th style='width:105px;'>验厂通知</th>"
						+"<th  style='width:155px;'>状态</th>"
						+"<th style='width:80px;'>操作</th>"
					+"</tr>";
		for(var i=0;i<notifiedSupplierList.length;i++){
			tableItem =tableItem+ 	 "<tr>"+
								  		"<td class='left pt15' valign='top' >"+
								  			"<input type='checkbox'  name='checkbox' onclick='isAllSelect(\"notifiedSupplierShow\",\"selectAllForNotified\")'/>"+
								  			"<span class='ml4'>"+notifiedSupplierList[i].create_dt+"</span>"+
								  			"<input class='supplierId' type='hidden' value="+notifiedSupplierList[i].supplier_id+">"+
								  			"<input class='notifiedStatu' type='hidden' value="+notifiedSupplierList[i].status+">"+
								  		"</td>"+
								  		"<td class=' pt15' valign='top' >"+
								  			"<span class='companyNameForRep' onclick='toCpWindow("+ notifiedSupplierList[i].company_id +")'>"+replaceNullAsStr(notifiedSupplierList[i].supplier_cpyname)+"</span>"+
								  		"</td>"+
								  		"<td class='left pt15' valign='top'>"+
									  		"<ul style='text-align:left'>"+
									  			"<li>"+replaceNullAsStr(showBeforeOfDateStr(notifiedSupplierList[i].plan_check_dt))+"</li>"+
									  			"<li>"+replaceNullAsStr(notifiedSupplierList[i].check_man)+"&nbsp"+replaceNullAsStr(notifiedSupplierList[i].check_man_phone)+"</li>"+
									  		"</ul>"+
								  		"</td>"+
								  		"<td class=' pt15' valign='top' >"+
								  			"<div ><a class='blue'onclick=downLoadFile('"+ notifiedSupplierList[i].mogodb_id +"')>"+replaceNullAsStr(notifiedSupplierList[i].file_name)+"</a></div>"+
								  		"</td>"+
								  		established(notifiedSupplierList[i])+
								  	"</tr>";
		}
		$("#notifiedSupplierShow").html(tableItem);
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

/**
 * 判断是否全选
 * isAllSelect
 * @param tableId
 * @param allSelectId void
 * @author mishengliang
 * 2016-9-23 下午3:35:37
 */
function isAllSelect(tableId,allSelectId){
	var checkBoxTotal = $("#"+tableId).find("input:checkbox").length;
	var checkBoxSelect = $("#"+tableId).find("input:checkbox:checked").length;
	if(checkBoxTotal == checkBoxSelect){
		$("#"+allSelectId).prop("checked",true);
	}else{
		$("#"+allSelectId).prop("checked",false);
	}
}

function initPaginationForNotified(totalCount){
	$("#paginationForNotified").pagination(totalCount, {
         callback: pageselectCallbackForNotified,
         prev_text: "<",
         next_text: ">",
         items_per_page: pageSize, //每页的数据个数
         num_display_entries: 3, //两侧首尾分页条目数
         current_page: 0,   //当前页码
         num_edge_entries: 2 //连续分页主体部分分页条目数
     });
}
function pageselectCallbackForNotified(index,jq){
	notifiedSupplierShow(index,false);
}

/**
 * 判断是否已经通知
 */
function established(notifiedSupplier){
	var result="";
	if(notifiedSupplier.status==1){
		result = "<td class='left pt15 ' valign='top'>"+
					"<ul>"+
						"<li>"+
							"<img src='/newresources/images/new/tg.png' class='w12h12 ml15'>"+
							"<span class='ml4'>已确认通知</span>"+
						"</li>"+
						"<li>"+
							"<span class='ml15'>"+notifiedSupplier.update_dt+"</span>"+
						"</li>"+
					"</ul>"+
		"</td>"+"<td></td>";
	}else if(notifiedSupplier.status==2){
		result += "<td class='left pt15 ' valign='top'>"+ 
					"<ul>"+
						"<li>"+
							"<img src='/newresources/images/new/away.png' class='ml15'>"+
							"<span class='ml4'>取消通知</span>"+
						"<li>"+
							"<span class='ml15'>"+notifiedSupplier.update_dt+"</span>"+
						"</li>"+
					"</ul>"+
				"</td>"+"<td></td>";
	}else if(notifiedSupplier.status==0){
		result += "<td class='left pt15 ' valign='top'>"+ 
					"<img src='/newresources/images/icon/alarm.png' class='ml15'>"+ 
					"<span class='ml4'>通知待确认</span>"+
				"</td>"+
				"<td class=' pt15' valign='top' >"+
					"<span ><a class='blue' onclick=cancelNotify(this,"+ notifiedSupplier.supplier_id +")>取消通知</a></span>"+
				"</td>";
	}
	return result;
}

/**
 * 取消验厂通知
 * cancelNotify
 * @param supplierId void
 * @author mishengliang
 * 2016-8-24 下午3:47:05
 */
function cancelNotify(thisEvent,supplierId){
	var url = "supplierManager/cancelNotifyToCheckFac.do";
	var params = {};
	params.supplierId = supplierId;
	
	var isasync = true;
	var fn = function(result){
		var cancelShow = "<ul>"+
		"<li>"+
		"<img src='/newresources/images/new/away.png' class='ml15'>"+
		"<span class='ml4'>取消通知</span>"+
		"<li class='mt8'>"+
		"<span class='ml15'>"+(new Date()).Format("yyyy-MM-dd HH:mm:ss")+"</span>"+
		"</li>"+
		"</ul>";
		$(thisEvent).parents("td").prev().html(cancelShow);
		$(thisEvent).parents("td").html("");
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

/**
 * 待通知供应商展示
 * waitNotifySupplierShow 
 * @author mishengliang
 * 2016-8-23 下午7:47:36
 */
function waitNotifySupplierShow(pageIndex,needinit){
	var mulParams = $("#searchForWait").val();
	var checkFacType = $("#checkFacTypeForNum").val();
	
	currentPage=pageIndex;
	var url = "supplierManager/getWaitNotifySuppliers.do";
	var params = {};
	params.limit = pageSize;
	params.page = pageIndex;
	params.mulParams = mulParams;
	params.companyId = companyId;
	params.checkFacType = checkFacType;//验厂类型
	params.provinceCodes = provinceCodes.join(",");
	params.cityCodes = cityCodes.join(",");
	
	var isasync = true;
	var fn = function(result){
		var waitNotiSupplierTotal = result.waitNotiSupplierTotal;
		if(pageIndex==0 && needinit){//第一次加载时加载分页控件
			initPaginationForWait(waitNotiSupplierTotal);
		}
		var waitNotifyList = result.waitNotifyList;
		
		$("#waitNotifySupplierShow").html("");
		$("#waitNotiSupplierTotal").html(waitNotiSupplierTotal);
		var tableItem="<tr>"
						+"<th>供应商信息</th>"
						+"<th>联系人</th>"
						+"<th>联系电话</th>"
						+"<th>验厂类型</th>"
						+"<th>操作</th>"
					+"</tr>";
		for(var i=0;i<waitNotifyList.length;i++){
			var strOfPC = getCityAndProvStrByCode(waitNotifyList[i].contact_addr_code);
			tableItem =tableItem+   "<tr >"+
										"<td class='left company'>"+
										"<input type='checkbox' value='' name='checkbox' onclick='isAllSelect(\"waitNotifySupplierShow\",\"selectAllForWait\")'/>&nbsp;<b class='companyNameForRep' onclick='toCpWindow("+ waitNotifyList[i].company_id +")'>"+waitNotifyList[i].supplier_cpyname+"</b>"+
										"<input class='supplierId' type='hidden' value="+waitNotifyList[i].supplier_id+">"+
										"</td>"
										+"<td class='company' style='text-align:center;'><a class='blue ml4' style='font-size:13px;' onClick='queryInfo("+ waitNotifyList[i].record_id +","+ waitNotifyList[i].supplier_id +",\""+waitNotifyList[i].supplier_cpyname+"\","+ waitNotifyList[i].company_id +")'>供应商档案<a></td>"
										+"<td colspan='3' class='left company'><span class='f_r'>准入时间："+replaceNullAsStr(waitNotifyList[i].auth_dt)+"</span></td>"+
									"</tr>"+
									"<tr>"+
										"<td class='left pt15' >"+
										/*"<span class='ml15' >"+(waitNotifyList[i].reg_addr == null?"":waitNotifyList[i].reg_addr)+"</span>"+*/
										"<span class='ml15' >"+(waitNotifyList[i].contact_addr == null?"":strOfPC+waitNotifyList[i].contact_addr)+"</span>"+
										"</td>"+
										"<td class='center pt15'>"+
										"<span >"+waitNotifyList[i].corporation+"</span>"+
										"</td>"+
										"<td class='center pt15' >"+
											(waitNotifyList[i].m_phone == null?"":waitNotifyList[i].m_phone)+
										"</td>"+
										"<td class='center pt15' >"+
											(waitNotifyList[i].next_check_dt == null? "初次验厂":"复检")+
										"</td>"+
										"<td class='center pt15'>"+
											"<span ><a class='blue' onclick='notifyCheck("+ waitNotifyList[i].supplier_id +")'>通知验厂</a>&nbsp; <a class='blue' onclick=siteNoCheckSupplierFile(this,"+ waitNotifyList[i].supplier_id +")>设置免检</a></span>"+
											"<input type='hidden' id='waitNotifySupplierId"+ waitNotifyList[i].supplier_id +"'>"+
										"</td>"+
									"</tr>";
		}
		$("#waitNotifySupplierShow").html(tableItem);
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

function initPaginationForWait(totalCount){
	$("#paginationForWait").pagination(totalCount, {
         callback: pageselectCallbackForWait,
         prev_text: "<",
         next_text: ">",
         items_per_page: pageSize, //每页的数据个数
         num_display_entries: 3, //两侧首尾分页条目数
         current_page: 0,   //当前页码
         num_edge_entries: 2 //连续分页主体部分分页条目数
     });
}
function pageselectCallbackForWait(index,jq){
	waitNotifySupplierShow(index,false);
}

//跳转至供应商信息展示页面
function queryInfo(record_id,supplier_id,supplier_cpyname,companyId){
	var param ={"record_id":record_id,"supplier_id":supplier_id,"supplier_cpyname":supplier_cpyname,"companyIdForSupplier":companyId};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"supplierFiles/supplierInfo/"+supplier_id+".htm";
}

/**
 * 设置免检供应商
 * siteNoCheckSupplierFile
 * @param supplierId void
 * @author mishengliang
 * 2016-8-24 下午5:00:38
 */
function siteNoCheckSupplierFile(thisEvent,supplierId){
	 var supplierName = $(thisEvent).parents("tr").prev().find("td .companyNameForRep").text();
	 window.wxc.xcConfirm("是否确定将&nbsp;"+ supplierName +"&nbsp;设置为免检", window.wxc.xcConfirm.typeEnum.confirm,
				{
	 			title: "设置免检",
				onOk:function(){
					$(thisEvent).parents("tr").prev().hide();
					$(thisEvent).parents("tr").hide();
					var url = "supplierManager/siteNoCheckSupplierFile.do";
					var params = {};
					params.supplierId = supplierId;
					var isasync = true;
					var fn = function(result){
					};
					asyncAjaxMethod(url,params,isasync,fn);
				},
				onCancel:function(){
					}
				});
	
}

/**
 * 免检供应商展示
 * examptSupplierShow 
 * @author mishengliang
 * 2016-8-23 下午7:47:39
 */
function examptSupplierShow(pageIndex,needinit){
	var mulParams = $("#searchForExampt").val();
	var startDate = $("#startDateForFree").val();
	var endDate = $("#endDateForFree").val();
	
	currentPage=pageIndex;
	var url = "supplierManager/getExemptCheckSupplier.do";
	var params = {};
	params.limit = pageSize;
	params.page = pageIndex;
	params.mulParams = mulParams;
	params.companyId = companyId;
	params.startDate = startDate;
	params.endDate = endDate;
	params.provinceCodes = provinceCodes.join(",");
	params.cityCodes = cityCodes.join(",");
	
	var isasync = true;
	var fn = function(result){
		var examptSuppliersTotal = result.examptSuppliersTotal;
		if(pageIndex==0 && needinit){//第一次加载时加载分页控件
			initPaginationForExampt(examptSuppliersTotal);
		}
		var examptSupplierList = result.examptSupplierList;
		$("#examptSupplierShow").html("");
		$("#examptSuppliersTotal").html(examptSuppliersTotal);
		var tableItem="<tr>"
						+"<th>供应商信息</th>"
						+"<th>设置免检时间</th>"
						+"<th>设置免检人员</th>"
						+"<th>采购分类</th>"
						+"<th>操作</th>"
					+"</tr>";
		for(var i=0;i<examptSupplierList.length;i++){
			tableItem =tableItem+   "<tr>"+
										"<td class='left pt15' valign='top'>"+
										"<input type='checkbox' value='' name='checkbox' onclick='isAllSelect(\"examptSupplierShow\",\"selectAllForExampt\")'/>	<span class='companyNameForRep' onclick='toCpWindow("+ examptSupplierList[i].company_id +")'>"+examptSupplierList[i].supplier_cpyname+"</span>"+
										"<input class='supplierId' type='hidden' value="+examptSupplierList[i].supplier_id+">"+
										"</td>"+
										"<td class='center pt15' valign='top'>"+
										"	<span >"+examptSupplierList[i].no_check_dt+"</span>"+
										"</td>"+
										"<td class='center pt15' valign='top'>"+
											(examptSupplierList[i].no_checkor == null?"":examptSupplierList[i].no_checkor)+
										"</td>"+
										"<td class=' pt15' valign='top' style='width:150px;text-align:left;'>"+
											cateList(examptSupplierList[i])+
										"</td>"+
										"<td class='center pt15' valign='top'>"+
											"<a class='blue' onclick=regainCheckFac(this,"+ examptSupplierList[i].supplier_id +")>恢复验厂</a>"+
										"</td>"+
									"</tr>";
		}
		$("#examptSupplierShow").html(tableItem);
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

function initPaginationForExampt(totalCount){
	$("#paginationForExampt").pagination(totalCount, {
         callback: pageselectCallbackForExampt,
         prev_text: "<",
         next_text: ">",
         items_per_page: pageSize, //每页的数据个数
         num_display_entries: 3, //两侧首尾分页条目数
         current_page: 0,   //当前页码
         num_edge_entries: 2 //连续分页主体部分分页条目数
     });
}
function pageselectCallbackForExampt(index,jq){
	examptSupplierShow(index,false);
}

/**
 * 恢复验厂
 * regainCheckFac
 * @param thisEvent
 * @param supplierId void
 * @author mishengliang
 * 2016-8-24 下午5:32:14
 */
function regainCheckFac(thisEvent,supplierId){
	 var supplierName = $(thisEvent).parents("tr").find("td .companyNameForRep").text();
	 window.wxc.xcConfirm("是否确定将&nbsp;"+ supplierName +"&nbsp;恢复验厂", window.wxc.xcConfirm.typeEnum.confirm,
				{
		 		title: "恢复验厂",
				onOk:function(){
					$(thisEvent).parents("tr").hide();
					var url = "supplierManager/regainCheckFac.do";
					var params = {};
					params.supplierId = supplierId;
					var isasync = true;
					var fn = function(result){
					};
					asyncAjaxMethod(url,params,isasync,fn);
				},
				onCancel:function(){
					}
				});
}

/**
 * cateList
 * @param examptSupplier
 * @returns cateShow 采购分类展示
 * @author mishengliang
 * 2016-8-24 上午11:39:50
 */
function cateList(examptSupplier){
	/*var cateList = examptSupplier.cateList;
	var cateShow = "";
	for(var i in cateList){
		cateShow += replaceNullAsStr(cateList[i].category_name) + "&nbsp;";
	}
	return cateShow;*/
	return examptSupplier.cateListStr;
}

 /**批量取消通知
 * cancelNotifyByBatch void
 * @author wangjialin
 * 2016-8-23 上午11:16:15
 */
function cancelNotifyByBatch()
 {
	cancelNotiSupplierIds = []; 
	var cancelNotiSupplierNames = new Array();//需要取消通知供应商Name数组
	var i = 0;
	$("#notifiedSupplierShow input:checkbox:checked").each(function(index,e){
		var supplierId = parseInt($(this).parent().find(".supplierId").val());
		var notifiedStatu = $(this).parent().find(".notifiedStatu").val();
		var notifiedCpName = $(this).parent().next().find(".companyNameForRep").html();
		if(notifiedStatu == 0){//0:通知待确认状态
			//cancelNotiSupplierIds[i] = supplierId;
			cancelNotiSupplierIds.push(supplierId);
			cancelNotiSupplierNames[i] = notifiedCpName;
			i++;
		}
	});
	if(cancelNotiSupplierIds.length > 0){
		var cancelList = "";
		$("#notify_cancel_batch .pop_content_wrap .title span").html(cancelNotiSupplierIds.length);
		for(var i in cancelNotiSupplierNames){
			cancelList += "<li><span class='title_split'>|</span>"+ cancelNotiSupplierNames[i] +"</li>";
		}
		$("#notify_cancel_batch .pop_content_wrap .companyList").html(cancelList);
		pop_div_show("notify_cancel_batch");
	}else{
		window.wxc.xcConfirm("未选择任何需要取消的通知");
	}
 }

/**
 * 提交批量取消通知供应商
 * submitBCNotify
 * @author mishengliang
 * 2016-9-18 上午10:26:12
 */
function submitBCNotify(){
	var url = "supplierManager/batchCancelNotifyToCheckFac.do";
	var params = {};
	params.supplierIds = cancelNotiSupplierIds.join(",");
	
	var isasync = true;
	var fn = function(result){
		notifiedSupplierShow(0,true);
		pop_div_close("notify_cancel_batch");
	};
	asyncAjaxMethod(url,params,isasync,fn);
}


/**
 * 批量设置免检
 * freeCheckByBatch void
 * @author mishengliang
 * 2016-9-23 下午2:08:52
 */
function freeCheckByBatch(){
	freeCheckSupplierIds = [];
	var freeCheckSupplierNames = new Array();//需要取消通知供应商Name数组
	var i = 0;
	$("#waitNotifySupplierShow input:checkbox:checked").each(function(index,e){
		var supplierId = parseInt($(this).parent().find(".supplierId").val());
		var notifiedCpName = $(this).next(".companyNameForRep").html();
		freeCheckSupplierIds.push(supplierId);
		freeCheckSupplierNames[i] = notifiedCpName;
		i++;
	});
	if(freeCheckSupplierIds.length > 0){
		var freeList = "";
		$("#free_check_batch .pop_content_wrap .title span").html(freeCheckSupplierIds.length);
		for(var i in freeCheckSupplierNames){
			freeList += "<li><span class='title_split'>|</span>"+ freeCheckSupplierNames[i] +"</li>";
		}
		$("#free_check_batch .pop_content_wrap .companyList").html(freeList);
		pop_div_show("free_check_batch");
	}else{
		window.wxc.xcConfirm("未选择任何需要免检的供应商");
	}
}

/**
 * 提交批量免检验厂
 * submitFreeCheck void
 * @author mishengliang
 * 2016-9-23 下午2:41:29
 */
function submitFreeCheck(){
	var url = "supplierManager/batchSiteNoCheckSupplierFile.do";
	var params = {};
	params.supplierIds = freeCheckSupplierIds.join(",");
	
	var isasync = true;
	var fn = function(result){
		waitNotifySupplierShow(0,true);
		pop_div_close("free_check_batch");
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

/**批量恢复验厂
 * recoverCheckByBatch void
 * @author wangjialin
 * 2016-8-23 上午11:23:40
 */
function recoverCheckByBatch(){
	recoverSupplierIds = [];
	var recoverSupplierNames = new Array();//需要取消通知供应商Name数组
	var i = 0;
	$("#examptSupplierShow input:checkbox:checked").each(function(index,e){
		var supplierId = parseInt($(this).parent().find(".supplierId").val());
		var notifiedCpName = $(this).next(".companyNameForRep").html();
		recoverSupplierIds.push(supplierId);
		recoverSupplierNames[i] = notifiedCpName;
		i++;
	});
	if(recoverSupplierIds.length > 0){
		var recoverList = "";
		$("#recover_check_batch .pop_content_wrap .title span").html(recoverSupplierIds.length);
		for(var i in recoverSupplierNames){
			recoverList += "<li><span class='title_split'>|</span>"+ recoverSupplierNames[i] +"</li>";
		}
		$("#recover_check_batch .pop_content_wrap .companyList").html(recoverList);
		pop_div_show("recover_check_batch");
	}else{
		window.wxc.xcConfirm("未选择任何需要免检的供应商");
	}
}

/**
 * 提交批量回复验厂
 * submitRecoverCheck void
 * @author mishengliang
 * 2016-9-23 下午2:41:01
 */
function submitRecoverCheck(){
	var url = "supplierManager/batchRegainCheckFac.do";
	var params = {};
	params.supplierIds = recoverSupplierIds.join(",");
	
	var isasync = true;
	var fn = function(result){
		examptSupplierShow(0,true);
		pop_div_close("recover_check_batch");
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

/**通知验厂
 * notifyCheck void
 * @author wangjialin
 * 2016-8-23 上午11:15:43
 */
function notifyCheck(supplierId){
	//清空之前的数据
	$("#checkMan").val("");
	$("#checkManPhone").val("");
	$("#planCheckDt").val("");
	$("#input_filename").val("");
	$("#supplierIdHidden").val(supplierId);
	$(".sub_tip").css("display","none");
	pop_div_show("notify_check_wrap");
}

/**
 * 
 * showviewtext
 * @author wangjialin
 * 2016-8-25 上午10:22:17
 */
function showviewtext(obj){
	if($(obj).val()!=""){//上传空间是否为空
		var fileName=$(obj).val();
		$("#input_filename").val(fileName);
		var fileElementId = $(obj).attr("id");
		var origfilename = fileName.substring(fileName.lastIndexOf("\\")+1,fileName.lastIndexOf("."));
		
		var fileurl = "supplierManager/uploadCheckFacInfo.do";
		var params = {fileName:origfilename,companyId:companyId};
		var fn = function(data){//服务器成功响应处理函数
	      	if (data.success==true &&data.message=="上传成功") {
	      		$("#checkFacInfoId").val(data.fileId);
				//当前上传控件清空
				$(obj).val("");
				
		    	$("#input_uploadfile").nextAll(".sub_tip").css("display","none");
		    	fileFlag = true;
	         }else{
		    	 $("#input_uploadfile").nextAll(".sub_tip").find("span").html(data.message);
		    	 $("#input_uploadfile").nextAll(".sub_tip").css("display","inline-block");
		    	 fileFlag = false;
	         }
		};
	    addInputUtilFile(fileurl,params,fileElementId,fn);
		
		/*$.ajaxFileUpload({
		     url: getwebroot()+"supplierManager/uploadCheckFacInfo.do",
		     data: {
		        fileName:origfilename,
		        companyId:companyId
		     },
		     fileElementId: fileElementId,//input type=file 的id
		     dataType: "json",
		     success: function (data, status){//服务器成功响应处理函数
		      	if (data.success==true &&data.message=="上传成功") {
		      		$("#checkFacInfoId").val(data.fileId);
					//当前上传控件清空
					$(obj).val("");
					
			    	$("#input_uploadfile").nextAll(".sub_tip").css("display","none");
			    	fileFlag = true;
		         }else{
			    	 $("#input_uploadfile").nextAll(".sub_tip").find("span").html(data.message);
			    	 $("#input_uploadfile").nextAll(".sub_tip").css("display","inline-block");
			    	 fileFlag = false;
		         }
		     },
		     error:function(data, status){
		    	 $("#uploadInfoTip span").html("上传出错");
		    	 $("#uploadInfoTip").attr("display","inline-block");
		    	 fileFlag = false;
		     }
		});*/
	}
	
}

/**
 * 更新验厂通知，即上传的通知报告与供应商相关联
 * updateNotifySupplier
 * @author mishengliang
 * 2016-8-25 下午1:56:06
 */
function updateNotifySupplier(){
	var supplierId = $("#supplierIdHidden").val();
	var checkinformId = $("#checkFacInfoId").val();
	var planCheckDt = $("#planCheckDt").val();
	var checkMan = $("#checkMan").val();
	var checkManPhone = $("#checkManPhone").val();
	
	var submitFlag = true; 
	var submitTip = "";
	if(checkMan == ""){
		submitFlag = false; 
   	 	$("#checkInfoTip span").html("验厂人员不为空");
   	 	$("#checkInfoTip").css("display","inline-block");
	}else if(checkManPhone == ""){
		submitFlag = false; 
		$("#checkInfoTip span").html("人员电话不为空");
		$("#checkInfoTip").css("display","inline-block");
	}else if(!phone_reg.test(checkManPhone)){
		submitFlag = false; 
		$("#checkInfoTip span").html("电话格式不正确");
		$("#checkInfoTip").css("display","inline-block");
	}else if(planCheckDt == ""){
		submitFlag = false; 
   	 	$("#planDtTip span").html("验厂日期不为空");
   	 	$("#planDtTip").css("display","inline-block");
	}else if($("#input_filename").val() == ""){
		submitFlag = false;
	   	$("#uploadInfoTip span").html("通知文件不为空");
		$("#uploadInfoTip").css("display","inline-block");
	}else if(fileFlag == false){
		submitFlag = false;
	}
	if(submitFlag == false){
		$("#submitTip").html(submitTip);
		return;
	}
		
	var url = "supplierManager/updateNotifySupplier.do";
	var params = {};
	params.checkinformId = checkinformId;
	params.supplierId = supplierId;
	params.planCheckDt = planCheckDt;
	params.sendCompanyId = companyId;
	params.checkMan = checkMan;
	params.checkManPhone = checkManPhone;
	
	var isasync = true;
	var fn = function(result){
		$("#waitNotifySupplierId"+supplierId).parents("tr").prev().hide();
		$("#waitNotifySupplierId"+supplierId).parents("tr").hide();
		pop_div_close("notify_check_wrap");
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

/**
* 弹出层效果
* pop_div_show
* @param id void
* @author yangliping
* 2016-7-4 10:38:15
*/
function pop_div_show(id)
{
	$("#pop_mask").fadeIn("fast");
	$("#"+id).fadeIn("fast");
}

/**
* 关闭弹出层
* pop_div_close
* @param id 
* @return void
* @author yangliping
* 2016-7-4 10:38:15
*/
function pop_div_close(id){
	$("#pop_mask").fadeOut("fast");
	$("#"+id).fadeOut("fast");
}
function getSortByFId(fid,type){
	var data;
	var url = "purchaseCategory/getPurchaseCategoryList.do";
	var params = {};
	params.f_id=fid;
	var fn = function(result) {
		var data=result.data;
	};
	asyncAjaxMethod(url, params, true, fn);
}
	
/**地址选择展开
 * @author wangjialin
 * 2016-8-4 上午10:27:20
 */
var selectDiv=$("#selectContent");
function selectShow(e){
	$(e).parent().append(selectDiv);
	selectDiv.find(".optionChoosed li").remove();
	selectDiv.show();
	selectAddress();
	$("#address #selectContent #province li input").prop("checked",false);
	$("#address #selectContent #province li input").prop("indeterminate",false);
	$("#address #selectContent #city li input").prop("checked",false);
	judgeDivHeight('.select_content');
}
/**地址选择关闭
 * @author wangjialin
 * 2016-8-4 下午3:00:01
 */
function selectClose(e){
	$(e).parents("#address").find("#selectContent").remove();
}
//获取采购类目树
function getPurchaseCategory(natureId){
	var url="purchaseCategory/getPurchaseCategoryTree2Json.do";
	var params={};
	params.nature_id=natureId;
	var fn=function(result){
		var item="";
		for(var i=0;i<result.data.length;i++){
			if(result.data[i].children != null){
			item+='<li>'
					+'<span class="sort">'+result.data[i].text+'<input onclick="checkBoxEvent(this)"  type="checkbox" class="ml10"/><input type="hidden" value="'+result.data[i].id+'"/><input type="hidden" value="-1"/></span>'
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
		$('.productSort_mid').niceScroll({
			cursorcolor: "#ccc", //#CC0071 光标颜色 
			cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
			touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
			cursorwidth: "5px", //像素光标的宽度 
			cursorborder: "0", //     游标边框css定义 
			cursorborderradius: "5px", //以像素为光标边界半径 
			autohidemode: true //是否隐藏滚动条 
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
							+'<span class="sort">'+data.children[j].text+'<input onclick="checkBoxEvent(this)"  type="checkbox" class="ml10"/><input type="hidden" value="'+data.children[j].id+'"/><input type="hidden" value="-1"/></span>'
							+ietmMontage(data.children[j])
						+'</li>'
					+'</ul>';
			}else{
				item+='<ul>'
					+'<li>'
						+'<img src="/newresources/js/treegrid/images/empty.png"><span style="display:inline-block;">'+data.children[j].text+'<input onclick="checkBoxEvent(this)" type="checkbox" class="ml10"/><input type="hidden" value="'+data.children[j].id+'"/><input type="hidden" value="-1"/></span>'
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
					ccChecked++;
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
						len = $(element).parent().nextAll("ul").find("input:checkbox:checked").length;
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
						len = $(element).parent().nextAll("ul").find("input:checkbox:checked").length;
						arr.push(len);	
					}
				});
				if(arr.length!=0){
					str = str+categoryStr(arr)+",";		
				}				
			});
			str = str.substring(0,str.length-1);
		}
		$("#sort .optionChoosed li").remove();
		$("#sort .optionChoosed").append('<li class="ml10 f_l">'+str+'</li>');
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
/**展示采购分类选择
 * sortSave void
 * @author wangjialin
 * 2016-9-29 上午10:19:59
 */
function sortSave(){
	var con=$("#sort .optionChoosed li").text();
	if(con.length==0){
		$("#sort .select_content").hide();
	}else{
		var txtShow=con.substring(0,6);
		var lastChar=txtShow.substring(txtShow.length-2,txtShow.length-1);
		if(lastChar==','||lastChar=="(")
			item=txtShow.substring(0,9)+"...";
		else
			item=txtShow.substring(0,7)+"...";
		$("#sort .purchaseSort").html(item);
		$("#sort .select_content").hide();
	}
}
/**
 * 地址选择
 * @author wangjialin
 * 2016-8-8 下午3:37:50
 */
function selectAddress(){
	//加载省
	province=ChineseDistricts[86];
	$.each(province,function(code,address){
		var li="<li value='"+code+"' id='"+address+"'><input type='checkbox' class='"+address+"' value='"+address+"' onchange='provinceSelectChange(this)'>&nbsp;"+address+"</li>";
		$("#province").append(li);
	});
	//加载市
	$("#province li").click(function(){
		$("#province li").removeClass("active");
		$(this).addClass("active");
		$("#city").css("background","#f6f6f6");
		var province_code=$(this).val();
		var province_add=$(this).prop("id");
		if(province_code!=null&&province_code!='0'){
			$("#city").css("display","block");
			city=ChineseDistricts[province_code];
			if(city!=null&&city!=undefined){//有子级
				$("#city li").remove(); 
				if($(this).find("input").prop("checked")==true|| $(this).find("input").prop("indeterminate")==true){
					$.each(city,function(code,address){
						if(testChecked(province_add,address))
							var li="<li id='"+address+"' value='"+code+"'><input type='checkbox' checked='checked' class='"+address+"' value='"+address+"' onchange='citySelectChange(this)'>&nbsp;"+address+"</li>";
						else
							var li="<li id='"+address+"' value='"+code+"'><input type='checkbox' class='"+address+"' value='"+address+"' onchange='citySelectChange(this)'>&nbsp;"+address+"</li>";
						$("#city").append(li);
					});
				}else{
					$.each(city,function(code,address){
						var li="<li id='"+address+"' value='"+code+"'><input type='checkbox' class='"+address+"' value='"+address+"' onchange='citySelectChange(this)'>&nbsp;"+address+"</li>";
						$("#city").append(li);
					});
				}
			}else{//无子级
				$("#city").css("display","none");
			}
		}
	});
	
	
}
/**
 *选择省份
 * @author wangjialin
 * 2016-8-8 下午3:37:50
 */
function provinceSelectChange(e){
	var province=$(e).val();
	var code=$(e).parent().val();
	if($(e).is(':checked')) {
		$("#address .optionChoosed #"+province).remove();
		var str="<li id="+province+">"+province+"<input type='hidden' value="+code+">"+"<img src='/newresources/images/supplier/X.png' onclick='delSortChoosed(this)'><ul class='citiesChoosed'></ul></li>";
		$(e).parents(".select_content").find(".optionChoosed").append(str);
		judgeDivHeight('#selectContent');
		$("#city li input").prop("checked",true);
	}else{
		$("#"+province).find("input").prop("checked",false);
		$("#address .optionChoosed").find("#"+province).remove();
	}
}
/**
 *选择城市
 * @author wangjialin
 * 2016-8-8 下午3:37:50
 */
function citySelectChange(e){
	var city=$(e).val();
	var province=$(".active input").val();
	var provinceCode=$(".active").val();
	var t=$(e).parents(".select_content").find(".optionChoosed");
	var flag=t.find("#"+province).text().length;
	var str="<li id="+province+">"+province+"<input type='hidden' value="+provinceCode+">"+"<img src='/newresources/images/supplier/X.png' onclick='delSortChoosed(this)'><ul class='citiesChoosed'></ul></li>"
	var l1=$("#city li input").length;
	var l2=$("#city li input[type=checkbox]:checked").length;
	var item='';
	if($(e).is(':checked')){
		if(flag==0){
			t.append(str);
		}
		if(l1>l2 && l2!=0){
			items=item+"<li>(</li>"
			$("#city li input").each(function(){
				var code=$(this).parent().val();
				var city=$(this).val();
				if($(this).is(':checked')){
					items+="<li id="+city+">"+city+"<input type='hidden' value="+code+">"+"<img src='/newresources/images/supplier/X.png' onclick='delCityChoosed(this)'></li>";
				}
			});
			items+="<li>)</li>"
			$("#"+province).find(".citiesChoosed").html(items);
			judgeDivHeight('#selectContent');
			$("#province .active").find("input").prop("indeterminate",true);
		}else{
			$("#"+province).find(".citiesChoosed li").remove();
			$("#province .active").find("input").prop("indeterminate",false);
			$("#province .active").find("input").prop("checked",true);
		}
	}
	if(!$(e).is(':checked')){
		if(flag==0){
			t.append(str);
		}
		if(t.find("#"+province).text().indexOf("(")==-1){
			if(l1>l2 && l2!=0){
				items=item+"<li>(</li>"
				$("#city li input").each(function(){
					var code=$(this).parent().val();
					var city=$(this).val();
					if($(this).is(':checked')){
						items+="<li id="+city+">"+city+"<input type='hidden' value="+code+">"+"<img src='/newresources/images/supplier/X.png' onclick='delCityChoosed(this)'></li>";
					}
				});
				items+="<li>)</li>"
				$("#"+province).find(".citiesChoosed").html(items);
				judgeDivHeight('#selectContent');
				$("#province .active").find("input").prop("indeterminate",true);
			}
		}
		if(l2==0){
			$(".optionChoosed").find("#"+province).remove();
			$("#province .active").find("input").prop("indeterminate",false);
			$("#province").find("."+province).prop("checked",false);
		}else{
			$(".optionChoosed").find("#"+city).remove();
		}
	}
}
/**判断城市是否是之前选中的
 * testChecked
 * @param province
 * @param city
 * @returns {Boolean} Boolean
 * @author wangjialin
 * 2016-9-27 下午4:32:49
 */
function testChecked(province,city){
	var f=$("#address .optionChoosed").find("#"+province).find(".citiesChoosed").find("#"+city).text().length;
//	var f1=$("#address .optionChoosed").find("#"+province).find(".citiesChoosed").find("#"+city).prop("display");
	var f2=$("#address .optionChoosed").find("#"+province).find(".citiesChoosed").text().length;
	if(f>0 ||f2==0)
		return true;
	else
		return false;
	
}
/**不限地址
 * noLimitAddress void
 * @author wangjialin
 * 2016-9-29 上午9:54:24
 */
function noLimitAddress(){
	$("#address .optionChoosed").html("");
	$("#address .addressSelect").html("地址选择<img src='/newresources/images/switchover.png' style='margin-left:70px'>");
	$("#address #province li input").prop("checked",false);
	$("#address #province li input").prop("indeterminate",false);
	$("#address #city li input").prop("checked",false);
	
	provinceCodes = [];//查询中的纯省份代码数组
	cityCodes = [];//查询中的纯市级代码数组
}
/**省：点击后取消已选择的选项
 * delSortChoosed void
 * @author wangjialin
 * 2016-8-4 下午3:00:01
 */
function delSortChoosed(e){
	$(e).parent("li").remove();
	var id=$(e).parent("li").prop('id');
	$("#province ."+id).removeAttr("checked");
	$("#province ."+id).prop("indeterminate",false);
	var c=$("#province ").find("#"+id).prop("class");
	if(c=="active")
		$("#city li input").removeAttr("checked");
}
/**城市：点击后取消已选择的选项
 * delCityChoosed
 * @param e void
 * @author wangjialin
 * 2016-9-26 下午4:09:44
 */
function delCityChoosed(e){
	var id=$(e).parent().text();
	var id2=$(e).parent().parent().parent().prop("id");
	$(e).parent("li").remove();
	var l2=$("#city li input[type=checkbox]:checked").length-1;
	var f=$("#address .optionChoosed").find("#"+id2).find(".citiesChoosed").text().length-2;
	if(l2==0 || f==0){
		$("#address .optionChoosed").find("#"+id2).remove();
		$("#province ."+id2).prop("checked",false);
		$("#province ."+id2).prop("indeterminate",false);
	}
	$("."+id).prop("checked",false);
}
/**展示用户所选择的地址
 * saveAddressSelected void
 * @author wangjialin
 * 2016-9-27 下午4:17:42
 */
function saveAddressSelected(e){
	var provinces='';
	provinceCodes = [];
	cityCodes = [];
	if($(e).parents("#address").find(" .optionChoosed").text().length==0){
		$(e).parents("#address").find("#selectContent").remove();
	}else{
		$(e).parents("#address").find(".selectList2 #province li input").each(function(){
			if($(this).is(':checked') || $(this).prop("indeterminate")==true) {
				var id=$(this).val();
				var f=$(e).parents("#address").find(" .optionChoosed").find("#"+id).find(".citiesChoosed").text().length;
				//若该省的城市全选，则只显示省份
				if(f==0){
					provinces+=$(this).val()+',';
					var pro = $("#address .optionChoosed").find("#"+id).find("input").eq(0).val();
					if(pro != undefined){
						provinceCodes.push(pro);
					}
				}else{//若只选择该省下的部分城市，则展示该省下所有选中的城市
					var len=$(e).parents("#address").find(" .optionChoosed").find("#"+id).find(".citiesChoosed li").length;
					$(e).parents("#address").find(" .optionChoosed").find("#"+id).find(".citiesChoosed li").each(function(index){
						if(index>=1 && index<len-1)
						provinces+=$(this).prop("id")+',';
						var city = $(this).find("input").val();
						if(city != undefined){
							cityCodes.push(city);
						}
					});
				}
			}
		});
		var s=provinces.substring(0,provinces.length-1);
		var obj='';
		if(s.length>=13){
			obj=s.substring(0,12);
			obj+='...';
		}else{
			obj=s;
		}
		$(e).parents("#address").find(".addressSelect").html(obj);
		$(e).parents("#address").find("#selectContent").remove();
	}
	//console.log(provinceCodes+"***"+cityCodes);
}


/**拼接的select，内容展示
 * showSelectContent
 * @param e
 * @param id void
 * @author wangjialin
 * 2016-9-29 下午3:33:10
 */
function showSelectContent(e,id){
	var con=$(e).find("option:selected").text();
	$(e).parent().find("#"+id).text(con);
}
/**页面高度根据脱离文档流的div的高度变化而变化
 * judgeDivHeight
 * @param e void
 * @author wangjialin
 * 2016-10-7 下午3:41:31
 */
function judgeDivHeight(e){
	var h1=$(e).height();
	var h2=$(".tabcon").height();
	var h3=h1+20;
	if(h1>=h2){
		$(".tabcon").css("height",h3);
	}else{
		$(".tabcon").css("height",h2);
	}
	
}