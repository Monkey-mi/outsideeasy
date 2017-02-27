var pageSize = 5;//每页个数	
var currentPage=0;//当前页码
var companyId = getParamFromWindowName("companyIdForAll");
var end_date = "";//结束的日期
var start_date = "";//起始的日期
var search_text = "";//搜索关键字
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
		getSupplierList();
		initParams();
		getSupplierMaterialcheckList();
});
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
	$(".midd_left_wrap").load(getwebroot()+"usercenter/purchaseManage/purchaseLeftMenu.html",null,function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success")
		{
			$("#evaluation").children().eq(5).children().eq(3).addClass("curr");
			var leftHeight=$(".midd_left_wrap").height();
			if(leftHeight>$(window).height()-200)
			{
				$(".midd_right_wrap").css({minHeight:leftHeight});
			}
		}
	});
}
/**删除物料报告
 * delFile
 * @param e void
 * @author wangjialin
 * 2016-12-13 下午1:59:27
 */
function delFile(e,id){
	var url = "supplierManager/delSupplierMaterialcheck.do";
	var params={};	
	params.materialcheck_id=id;
	var fn=function(result){
		if(result.data){
			$(e).parent().prev().show();
			$(e).parent().remove();
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}

/**
* 取到所有参数的值
* orgizaParam
* @return void
* @author yukai
* 2016-12-19
 */
function orgizaParam(){
	end_date = $("#endDate").val();
	start_date = $("#startDate").val();
	search_text = $("#search_text").val().trim();
}
/**
 * 初始化所有的条件
* initParams
* @return void
* @author yukai
* 2016-12-19
 */
function initParams(){
	$("#endDate").val("");
	$("#startDate").val("");
	$("#search_text").val("");
}
/**
 * 查询物料报告列表
* getSupplierMaterialcheckList
* @return void
* @author yukai
* 2016-12-19
 */
function getSupplierMaterialcheckList(){
	orgizaParam();
	var url = "supplierManager/getSupplierMaterialcheckListByAccount.do";
	var params={};	
	InitDatas(0,true,url,params);		
}

/**
分页获取数据
pageIndex：当前页索引
needinit：是否为第一次加载
*/
function InitDatas(pageIndex,needinit,url,param)
{
currentPage=pageIndex;
var url=url;
var params={};
params.companyId = companyId;

/*
 * 其他的参数设置
 */
if(end_date != ""){
 params.end_date = end_date;
}
if(start_date != ""){
 params.start_date = start_date;
}
if(search_text != ""){
 params.search_text = search_text;
	}

params.usePaging=true;
params.page=pageIndex;
params.limit=pageSize;
params.start=parseInt(pageIndex)*pageSize;

var fn=function(result){
	if(pageIndex==0 && needinit){
			//第一次加载时加载分页控件
		initPaginations(result.total);
	}
		//显示数据到表格
		addItems(result.data);	
	};
asyncAjaxMethod(url,params,true,fn);
	
}
/**供应商信息的翻页调用  
*/
function pageselectCallbacks(index,jq)
{
	orgizaParam();
	var url = "supplierManager/getSupplierMaterialcheckListByAccount.do";		
	var params={};
    InitDatas(index,false,url,params);
}
/**初始化分页控件
*/
function initPaginations(totalCount){
	$("#paginationcom").pagination(totalCount, {
         callback: pageselectCallbacks,
         prev_text: "<",
         next_text: ">",
         items_per_page: pageSize, //每页的数据个数
         num_display_entries: 3, //两侧首尾分页条目数
         current_page: 0,   //当前页码
         num_edge_entries: 2 //连续分页主体部分分页条目数
     });
}
/**
 * 字符串的拼接 doT模板
* addItems
* @param result
* @return void
* @author yukai
* 2016-12-19
 */
function addItems(result){
	var evalText=doT.template($("#allSupplierMaterialcheckStmpl").text());
	$("#allSupplierMaterialchecks").html(evalText(result));
}
/**
 * 删除物料报告
 * delSupplierMaterialcheck
 * @param materialcheck_id void
 * @author yukai
 * 2016-12-19 上午10:21:06
 */
function delSupplierMaterialcheck(materialcheck_id){
	var url = "supplierManager/delSupplierMaterialcheck.do";
	var params={};	
	params.materialcheck_id=materialcheck_id;
	var fn=function(result){
		if(result.data){
			getSupplierMaterialcheckList();
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 查询供应商列表
* getSupplierMaterialcheckList
* @return void
* @author yukai
* 2016-12-19
 */
function getSupplierList(){
	var url = "supplierFiles/getSuppliersByOwnerId.do";
	var params={};	
	params.companyId = companyId;
	params.fileStatus = 0;//0：合格供应商；1：备选供应商；2 : 淘汰供应商；
	var fn=function(result){
		//显示数据到表格
		addItems1(result.data);
		$('.selectSupplier').comboSelect();	
	};
	asyncAjaxMethod(url,params,true,fn);		
}

/**
 * 字符串的拼接 doT模板
* addItems1
* @param result
* @return void
* @author yukai
* 2016-12-19
 */
function addItems1(result){
	var evalText=doT.template($("#allSupplierStmpl").text());
	$("#selectSupplier").html(evalText(result));
}
/**
 *上传物料报告 
 * uploadMaterialReport void
 * @author yukai
 * 2016-12-19 上午11:32:32
 */
function uploadMaterialReport(){
	var fileurl="supplierManager/uploadMaterialReport.do";
	var param={};
	param.fileName=$("#uploadMaterialReport").val();
	param.file_type_id=33;
	param.companyId=companyId;
	param.source_type=1;
	var fileElementId="uploadMaterialReport";
	var fn=function(data){
		$("#uploadMaterialReport").parent().after('<label class="filename ml10">'+data.fileName+'<img src="/newresources/images/sale/X_grey.png" class="ml5" onclick="delFile(this,'+data.fileId+')"></label>');
		$("#uploadMaterialReport").parent().css("display","none");
	};
	addInputUtilFile(fileurl,param,fileElementId,fn);
}
/**
 * 提交物料报告
 * submitReport void
 * @author yukai
 * 2016-12-19 上午11:22:12
 */
function submitMaterialReport(){
	var obj=$("#uploadMaterialReport").parent().next("label");
	var supplier_id=$("#selectSupplier").val();
	if(supplier_id==0||supplier_id==null){
		var option ={title:"提示",btn:parseInt("0001",2)};
  		window.wxc.xcConfirm("请选择供应商", window.wxc.xcConfirm.typeEnum.custom,option);
	}else{
		if(obj.length>0){
			var str=obj.find("img").attr("onclick");
			var materialcheck_id=str.substring(str.indexOf(",")+1,str.length-1);
			var url = "supplierManager/updateSupplierMaterialcheck.do";
			var params={};	
			params.supplier_id = supplier_id;
			params.materialcheck_id = materialcheck_id;
			var fn=function(result){
				if(result.data){
					//getSupplierMaterialcheckList();
					location.reload();
				}
			};
			asyncAjaxMethod(url,params,true,fn);
		}else{
			var option ={title:"提示",btn:parseInt("0001",2)};
	  		window.wxc.xcConfirm("请上传文件", window.wxc.xcConfirm.typeEnum.custom,option);
		}
	}
	
}