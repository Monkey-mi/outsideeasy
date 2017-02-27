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
				$("#evaluation").children().eq(1).children().eq(2).find("a").prepend(">>");
				$("#evaluation").children().eq(1).children().eq(2).addClass("currVip");
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
				$("#evaluation").children().eq(1).children().eq(2).addClass("curr");
			});
		}
	}
	
}
function go_companyWindow(sender_id){
	var param ={"companyIdForWindow":sender_id};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"supplierForPlateForm/companyWindow.htm";
}
var pageSize = 10;//每页个数	
var currentPage=0;//当前页码
function InitDatas(pageIndex,needinit)
	{
	currentPage=pageIndex;
	var url="CustomerFilesCtrl/getAllMaterialCheckList.do";
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
function addItems(materialCheck){
	var tableItem='<tr>'
					+'<th width="150px">时间</th>'
					+'<th width="auto">客户名称</th>'
					+'<th width="200px">物料确认结果</th>'
					+'</tr>';
		if(materialCheck){
			for(var i=0;i<materialCheck.length;i++){
				tableItem+='<tr>'
					+'<td><span class="greycolor ml10">'+materialCheck[i].create_dt+'</span></td>'
					+'<td class="center"><a class="a_link_name" onclick="go_companyWindow('+materialCheck[i].owner_id+')">'+materialCheck[i].owner_cpyname+'</a></td>'
					+'<td>'
						+'<a onClick="downloadText(this)" class="blue mr10">'+materialCheck[i].file_name+'</a>'
					+'</td>'
					+"<td><input type='hidden' value="+ materialCheck[i].mogodb_id +"></td>"
					+'</tr>';
			}
		}
		$("#materialCheck_table").html(tableItem);
}
//下载文档
function downloadText(obj){
	window.open(getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+$(obj).parent().next().children().val());
}