
var companyId=getParamFromWindowName("companyIdForAll");
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
});
$(function(){
	$('.tableScroll').niceScroll({
		cursorcolor: "#ccc", //#CC0071 光标颜色 
		cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
		touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
		cursorwidth: "5px", //像素光标的宽度 
		cursorborder: "0", //     游标边框css定义 
		cursorborderradius: "5px", //以像素为光标边界半径 
		autohidemode: true //是否隐藏滚动条 
	});	
});
/*
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * create_by yangliping 2016-6-30 17:32:19
 */
function loadCommonPage(){
	var result=isLoginForPlateForm();
	var isVip=getCookie("isVip");
//	if(result.data!=null && result.data.vip == true){
	if(isVip=="true"){
		$("#top").load(getwebroot()+"vip/platform/vipTop.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				getCompanyList(companyId);
				$("#mainNav").children().eq(0).addClass("curr");
				companyId=$("#company").val();
				if(companyId!=null){
					InitDatas(0,true);
				}
			}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/saleManage/vipSaleLeftMenu.html",function(){
				$("#evaluation").children().eq(1).children().eq(3).find("a").prepend(">>");
				$("#evaluation").children().eq(1).children().eq(3).addClass("currVip");
			});
		}
	}else{
		$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
				{
					getCompanyList(companyId);
					$("#mainNav").children().eq(1).addClass("curr");
					companyId=$("#company").val();
					if(companyId!=null){
						InitDatas(0,true);
					}
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
function go_companyWindow(sender_id){
	var param ={"companyIdForWindow":sender_id};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"supplierForPlateForm/companyWindow.htm";
}
/*
 * 新增客户
 */
function addCustomer()
{
	pop_div_show("addCustomer_wrap");
	getCustomerFromDictionary();
}
/**
 * 跳转至用户信息展示页面
 */
function queryInfo(record_id,company_id,supplier_id){
	var param ={"record_id":record_id,"companyIdForCusomer":company_id,"supplier_id":supplier_id};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"CustomerFilesCtrl/customerfilesInfo/"+supplier_id+".htm";
}
/**
 * 准入资料未提交的提示
 */
function writenow()
{
	pop_div_show("writenow_wrap");
}
/**
 * 跳转至填写准入资料
 */
function forwordTocustomerFiles(){
	window.location.href=getwebroot()+"AccessApplicationCtrl/appAccessInfo.htm";
}
/*物料验证
 */
function checkMaterial(supplier_id)
{
	$("#checkMaterial_wrap").fadeIn("fast");
	getMaterialCheckList(supplier_id);
	$("#searchMaterialBtn").click(function(){
		getMaterialCheckList(supplier_id);
	} );
}
/*验厂报告
 */
function checkFactory(supplier_id)
{
	$("#checkFactory_wrap").fadeIn("fast");
	getCheckFactoryList(supplier_id);
	$("#searchFactoryBtn").click(function(){
		getCheckFactoryList(supplier_id);
	} );
}
/**
 * 计算已输入的企业名称
 */
function countName(){
	var length=0;
	var str=$("#addCustomer_content").val();
	if(str!=""){
		if(str.indexOf(";") > 0 && str.indexOf("；") < 0){
			var array=str.split(";");
			$("#number").text(array.length);
		}
		else if(str.indexOf("；") > 0  && str.indexOf(";") < 0){
			var array=str.split("；");
			$("#number").text(array.length);
		}
		else if(str.indexOf("；") > 0 && str.indexOf(";") > 0){
			var array=str.split("；");
			for(var i=0;i<array.length;i++){
				var str1=array[i];
				var array1=str1.split(";");
				length+=array1.length;
			}
			$("#number").text(length);
		}else{
			$("#number").text(1);
		}
	}else{
		$("#number").text(length);
	}
}
/*
 * 新增客户提交申请
 */
function applyForSupplier()
{
	$("#addCustomer_wrap").fadeOut("fast");
	pop_div_show("applyForSupplier_wrap");
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
		$("#searchMaterialBtn").unbind();
		$("#searchFactoryBtn").unbind();
		$("#end_time").val("");
		$("#start_time").val("");
		$("#end_time1").val("");
		$("#start_time1").val("");
	}

var pageSize = 10;//每页个数	
var currentPage=0;//当前页码	
function InitDatas(pageIndex,needinit)
	{
	currentPage=pageIndex;
	var url="CustomerFilesCtrl/getCustomerFilesList.do";
	var params={};
	params.usePaging=true;
	params.page=pageIndex;
	params.limit=pageSize;
	params.start=parseInt(pageIndex)*pageSize;
	params.company_id=companyId;
	var fn=function(result){
		if(pageIndex==0 && needinit){
				//第一次加载时加载分页控件
			initPaginations(result.total);
			$("#total_num").text(result.total);
		}
			//显示数据到表格
			addItems(result.data);						
		};
	asyncAjaxMethod(url,params,true,fn);
	}
function pageselectCallbacks(index,jq)
	{
		InitDatas(index,false);
	}
function initPaginations(totalCount){
	
		$("#pagination").pagination(totalCount, {
	         callback: pageselectCallbacks,
	         prev_text: "<",
	         next_text: ">",
	         items_per_page: pageSize, //每页的数据个数
	         num_display_entries: 3, //两侧首尾分页条目数
	         current_page: 0,   //当前页码
	         num_edge_entries: 2 //连续分页主体部分分页条目数
	     });
	}

function addItems(customerFiles){
		var tableItem='<tr>'
					+'<th width="auto">客户名称</th>'
					+'<th width="auto">准入信息</th>'
				+'</tr>';
		if(customerFiles){
			for(var i=0;i<customerFiles.length;i++){
				var check_score=getCheckFactoryScore(customerFiles[i].supplier_id);
				var checkMaterial;
				var checkFactory;
				if(hasMaterialCheck(customerFiles[i].supplier_id)){
					checkMaterial='<img class="ml30" src="/newresources/images/sale/s2.png"><a class="blue ml10" href="javascript:void(0)" onClick="checkMaterial('+customerFiles[i].supplier_id+')">物料验证</a>';
				}else{
					checkMaterial="";
				}
				if(hasCheckFactory(customerFiles[i].supplier_id)){
					checkFactory='<img class="ml30" src="/newresources/images/sale/s3.png"><a class="blue ml10" href="javascript:void(0)" onClick="checkFactory('+customerFiles[i].supplier_id+')">验厂报告</a><span class="ml10">评分 <span class="redcolor b">'+check_score+'</span>分</span>';
				}else{
					checkFactory="";
				}
				tableItem+='<tr>'
					+'<td class="center"><a class="a_link_name" onclick="go_companyWindow('+customerFiles[i].owner_id+')">'+customerFiles[i].owner_cpyname+'</a></td>'
					+'<td class="center">'
						+'<img class="ml30" src="/newresources/images/sale/s1.png"><a class="blue ml10" href="javascript:void(0)" onClick="queryInfo('+customerFiles[i].record_id+','+customerFiles[i].company_id+','+customerFiles[i].supplier_id+')" >准入资料</a>'
						+checkMaterial
						+checkFactory
					+'</td>'
				+'</tr>';
			}
		}
		$("#customer_table").html(tableItem);

}
//获取物料确认列表
function getMaterialCheckList(supplier_id){
	end_date = $("#end_time").val();
	start_date = $("#start_time").val();
	var url="CustomerFilesCtrl/getMaterialCheckList.do";
	var params={};
	params.supplier_id=supplier_id;
	if(end_date != ""){
		 params.end_date = end_date;
	}
	if(start_date != ""){
		 params.start_date = start_date;
	}
	var fn=function(result){
		var materialCheck=result.data;
		var tableItem='<tr><div style="border:1px solid #e8e8e8;">'
				+'<th width="auto">日期</th>'
				+'<th width="auto">报告</th>'
				+'</div></tr>';
		if(materialCheck){
			for(var i=0;i<materialCheck.length;i++){
				tableItem+='<tr>'
				+'<td class="center">'+materialCheck[i].create_dt+'</td>'
				+'<td class="center"><a onClick="downloadText(this)" class="blue ml10">'+materialCheck[i].file_name+'</a></td>'
				+"<td><input type='hidden' value="+ materialCheck[i].mogodb_id +"></td>"
				+'</tr>';
			}
		}
		$("#materialCheck_table").html(tableItem);
	};
	asyncAjaxMethod(url,params,true,fn);
}
//获取验厂报告列表
function getCheckFactoryList(supplier_id){
	end_date = $("#end_time1").val();
	start_date = $("#start_time1").val();
	var url="CustomerFilesCtrl/getCheckFactoryList.do";
	var params={};
	params.supplier_id=supplier_id;
	if(end_date != ""){
		 params.end_date = end_date;
	}
	if(start_date != ""){
		 params.start_date = start_date;
	}
	var fn=function(result){
		var checkFactory=result.data;
		var tableItem='<tr><div style="border:1px solid #e8e8e8;">'
				+'<th width="auto">日期</th>'
				+'<th width="auto">报告</th>'
				+'</div></tr>';
		if(checkFactory){
			for(var i=0;i<checkFactory.length;i++){
				tableItem+='<tr>'
				+'<td class="center">'+checkFactory[i].create_dt+'</td>'
				+'<td class="center"><span class="redcolor">'+checkFactory[i].check_score+'</span>分<a onClick="downloadText(this)" class="blue ml10">'+checkFactory[i].file_name+'</a></td>'
				+"<td><input type='hidden' value="+ checkFactory[i].mogodb_id +"></td>"
				+'</tr>';
			}
		}
		$("#checkFactory_table").html(tableItem);
	};
	asyncAjaxMethod(url,params,true,fn);
}
//获取最后一份验厂报告得分
function getCheckFactoryScore(supplier_id){
	var url="CustomerFilesCtrl/getCheckFactoryList.do";
	var params={};
	var check_score;
	params.supplier_id=supplier_id;
	var fn=function(result){
		var checkFactory=result.data;
		if(checkFactory.length>0){
			check_score=checkFactory[0].check_score;
		}else{
			check_score="无";
		}
	};
	asyncAjaxMethod(url,params,false,fn);
	return check_score;
}
//下载文档
function downloadText(obj){
	window.open(getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+$(obj).parent().next().children().val());
}
/**
 * 申请加入供应商
 * applyJoinSupplier void
 * @author yukai
 * 2016-8-12 下午3:54:27
 */
function applyJoinSupplier(){
	var companyStr;
	companyStr=$("#addCustomer_content").val();
	var message=checkCustomer(companyStr);
	if(message!=""&&message!=null){
		var option ={title:"提示",btn:parseInt("0001",2)};
	    window.wxc.xcConfirm(message, window.wxc.xcConfirm.typeEnum.custom,option);
		return;
	}
	var url="CustomerFilesCtrl/applyJoinSupplier.do";
	var params={};
	params.companyStr=companyStr;
	params.companyId=companyId;
	var fn=function(result){
		if(result.success){
			pop_div_close('addCustomer_wrap');
			pop_div_show('access_wrap');
			var item='<div class="h30 mt20" style="text-align:center;">'
				+'<span>泰普森集团 需要您提交准确完整的<a class="blue" onClick="go_applyAccess('+result.data.record_id+','+result.data.h_id+','+result.data.access_status+','+result.data.submit_id+')">准入资料</a>,受理您的申请</span>'
				+'</div>'
				+'<button class="mt10 mb10 yellow_button" style="margin-left:180px;" onclick="go_applyAccess('+result.data.record_id+','+result.data.h_id+','+result.data.access_status+','+result.data.submit_id+')">立刻填写</button>';
			$("#go_access").html(item);
		}else{
			var option ={title:"提示",btn:parseInt("0001",2)};
		    window.wxc.xcConfirm("你已成功成为泰普森集团的供应商.", window.wxc.xcConfirm.typeEnum.custom,option);
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 检验输入的客户名称是否有效
 * checkCompany
 * @param companyStr
 * @returns any
 * @author yukai
 * 2016-8-16 下午3:01:08
 */
function checkCustomer(companyStr){
	var message;
	var url = "CustomerFilesCtrl/checkCustomer.do";
	var params = {};
	params.companyStr=companyStr;
	params.companyId=companyId;
	var fn = function(result){
		message=result.message;
	};
	asyncAjaxMethod(url,params,false,fn);
	return message;
}
/**
 * 从数据字典中获取客户
 * getCustomerFromDictionary void
 * @author yukai
 * 2016-8-15 下午3:12:36
 */
function getCustomerFromDictionary(){
	var url="supplierForPlateForm/getCompanyFromDictionary.do";
	var params={};
	var fn=function(result){
		$("#addCustomer_content").val(result.data.cpyname_cn);
		countName();
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 跳转准入申请页面
 * go_applyAccess
 * @param record_id
 * @param h_id
 * @param access_status
 * @param accepter_id
 * @returns any
 * @author yukai
 * 2016-8-15
 */
function go_applyAccess(record_id,h_id,access_status,accepter_id){
	var param ={"accepter_id":accepter_id,"record_id":record_id,"h_id":h_id,"access_status":access_status};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"AccessApplicationCtrl/appAccessInfo/"+record_id+".htm";
}
/**
 * 检查是否有物料确认报告
 * hasMaterialCheck
 * @param supplier_id
 * @returns any
 * @author yukai
 * 2016-9-1 上午9:40:41
 */
function hasMaterialCheck(supplier_id){
	var flag;
	var url = "CustomerFilesCtrl/hasMaterialCheck.do";
	var params = {};
	params.supplier_id=supplier_id;
	var fn = function(result){
		flag=result.data;
	};
	asyncAjaxMethod(url,params,false,fn);
	return flag;
}

/**
 * 检查是否有验厂报告
 * hasMaterialCheck
 * @param supplier_id
 * @returns any
 * @author yukai
 * 2016-9-1 上午9:40:41
 */
function hasCheckFactory(supplier_id){
	var flag;
	var url = "CustomerFilesCtrl/hasCheckFactory.do";
	var params = {};
	params.supplier_id=supplier_id;
	var fn = function(result){
		flag=result.data;
	};
	asyncAjaxMethod(url,params,false,fn);
	return flag;
}