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
		
		var tabId=getParamFromWindowName("tabId");
		var tabNum=getParamFromWindowName("tabNum");
		if(tabId==undefined){
			tabId="#checkFactory";
		}
		if(tabNum==undefined){
			tabNum="0";
		}
		currtab(tabId, tabNum);
		InitDatas(0,true);
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
			}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/saleManage/vipSaleLeftMenu.html",function(){
				$("#evaluation").children().eq(1).children().eq(1).find("a").prepend(">>");
				$("#evaluation").children().eq(1).children().eq(1).addClass("currVip");
			});
		}
	}else{
		$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				getCompanyList(companyId);
				$("#mainNav").children().eq(1).addClass("curr");
				companyId=$("#company").val();
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"usercenter/saleManage/saleLeftMenu.html",function(){
				$("#evaluation").children().eq(1).children().eq(1).addClass("curr");
			});
		}
	}
}

function go_companyWindow(sender_id){
	var param ={"companyIdForWindow":sender_id};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"supplierForPlateForm/companyWindow.htm";
}
function currtab(tabId, tabNum){
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
	switch(tabNum){
	case "0":		
		InitDatas(0,true);
		break;
	case "1":
		InitDatas1(0,true);
		break;
	}
}
var pageSize = 10;//每页个数	
var currentPage=0;//当前页码
function InitDatas(pageIndex,needinit)
	{
	currentPage=pageIndex;
	var url="CustomerFilesCtrl/getAllCheckfactoryInformList.do";
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
function addItems(checkfactoryInform){
	var tableItem='<tr>'
					+'<th width="150px">通知时间</th>'
					+'<th width="auto">客户名称</th>'
					+'<th width="150px">计划验厂日期及人员</th>'
					+'<th width="250px">验厂通知</th>'
					+'</tr>';
		if(checkfactoryInform){
			for(var i=0;i<checkfactoryInform.length;i++){
				var status;
				if(checkfactoryInform[i].status==0){
					status='<button class="blue_button" onclick="confirm('+checkfactoryInform[i].checkinform_id+',this)">确认</button>';
				}else if(checkfactoryInform[i].status==1){
					status="已确认";
				}else{
					status="已取消";
				}
				tableItem+='<tr>'
					+'<td><span class="greycolor ml10">'+checkfactoryInform[i].create_dt+'</span></td>'
					+'<td style="padding-left:20px;"><a class="a_link_name" onclick="go_companyWindow('+checkfactoryInform[i].owner_id+')">'+(checkfactoryInform[i].owner_cpyname!=null?checkfactoryInform[i].owner_cpyname:"")+'</a></td>'
					+'<td style="padding-left:20px;">'+checkfactoryInform[i].plan_check_dt.substring(0,checkfactoryInform[i].plan_check_dt.lastIndexOf(" "))+'<br/>'+replaceNullAsStr(checkfactoryInform[i].check_man)+'&nbsp;&nbsp;'+replaceNullAsStr(checkfactoryInform[i].check_man_phone)+'</td>'
					+'<td style="padding-left:50px;">'
						+'<a onClick="downloadText(this)" class="blue mr10">'+checkfactoryInform[i].file_name+'</a>'
						+status
					+'</td>'
					+"<td><input type='hidden' value="+ checkfactoryInform[i].mogodb_id +"></td>"
					+'</tr>';
			}
		}
		$("#checkfactoryInform_table").html(tableItem);
}
var pageSize1 = 10;//每页个数	
var currentPage1=0;//当前页码
function InitDatas1(pageIndex,needinit)
	{
	currentPage1=pageIndex;
	var url="CustomerFilesCtrl/getAllCheckfactoryReportList.do";
	var params={};
	params.usePaging=true;
	params.page=pageIndex;
	params.limit=pageSize1;
	params.start=parseInt(pageIndex)*pageSize1;
	params.company_id=companyId;
	var fn=function(result){
		if(pageIndex==0 && needinit){
				//第一次加载时加载分页控件
			initPaginations1(result.total);
			$("#total_num1").text(result.total);
		}
			//显示数据到表格
			addItems1(result.data);						
		};
	asyncAjaxMethod(url,params,true,fn);
	}
function pageselectCallbacks1(index,jq)
	{
		InitDatas1(index,false);
	}
function initPaginations1(totalCount){
	
		$("#pagination1").pagination(totalCount, {
	         callback: pageselectCallbacks1,
	         prev_text: "<",
	         next_text: ">",
	         items_per_page: pageSize1, //每页的数据个数
	         num_display_entries: 3, //两侧首尾分页条目数
	         current_page: 0,   //当前页码
	         num_edge_entries: 2 //连续分页主体部分分页条目数
	     });
	}
function addItems1(checkfactoryReport){
	var tableItem='<tr>'
					+'<th width="150px">时间</th>'
					+'<th width="auto">客户名称</th>'
					+'<th width="110px">验厂日期</th>'
					+'<th width="120px">验厂人员</th>'
					+'<th width="230px">验厂报告</th>'
					+'</tr>';
		if(checkfactoryReport){
			for(var i=0;i<checkfactoryReport.length;i++){
				tableItem+='<tr>'
					+'<td><span class="greycolor ml10">'+checkfactoryReport[i].create_dt+'</span></td>'
					+'<td style="padding-left:20px;"><a class="a_link_name" onclick="go_companyWindow('+checkfactoryReport[i].owner_id+')">'+(checkfactoryReport[i].owner_cpyname!=null?checkfactoryReport[i].owner_cpyname:"")+'</a></td>'
					+'<td class="center">'+checkfactoryReport[i].check_factory_dt.substring(0,checkfactoryReport[i].check_factory_dt.lastIndexOf(" "))+'</td>'
					+'<td class="center">'+checkfactoryReport[i].checkor+'</td>'
					+'<td>'
						+'<a onClick="downloadText(this)" class="blue mr10">'+checkfactoryReport[i].file_name+'</a>'
						+'<span><span class="redcolor b">'+checkfactoryReport[i].check_score+'</span>分</span>'
					+'</td>'
					+"<td><input type='hidden' value="+ checkfactoryReport[i].mogodb_id +"></td>"
					+'</tr>';
			}
		}
		$("#checkfactoryReport_table").html(tableItem);
}
//下载文档
function downloadText(obj){
	window.open(getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+$(obj).parent().next().children().val());
}
/**
 * 确认通知
 * confirm
 * @param checkinform_id void
 * @author yukai
 * 2016-8-17 上午11:10:14
 */
function confirm(checkinform_id,obj){
	var url="CustomerFilesCtrl/confirmCheckfactoryInform.do";
	var params={};
	params.checkinform_id=checkinform_id;
	params.status=1;
	var fn=function(result){
		if(result.success){
			$(obj).replaceWith("已确认");
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}