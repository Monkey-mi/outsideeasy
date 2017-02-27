var pageSize = 5;//每页个数	
var currentPage=0;//当前页码
var companyId = getParamFromWindowName("companyIdForAll");
var date_type = "";//日期的类型
var end_date = "";//结束的日期
var start_date = "";//起始的日期
var search_text1 = "";//搜索关键字
var search_product_name = "";//产品名称
var search_product_artno = "";//产品货号
var search_order_bh = "";//订单编号
var search_agreement_bh = "";//合同编号
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
		$(".more_up").on("click",function(){
			$(this).hide();
			$(".more_down").show();
			$(".criterias").hide();
		});
		$(".more_down").on("click",function(){
			$(this).hide();
			$(".more_up").show();
			$(".criterias").show();
		});
		initParams();
		
});
/*
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * create_by yangliping 2016-6-30 17:32:19
 */
function loadCommonPage(){
	$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success")
			{
				getCompanyList(companyId);
				$("#mainNav").children().eq(0).addClass("curr");
				companyId = $("#company").val();
				getQualityFeedbackList();
			}
	});
	$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	var result=isLoginForPlateForm();
	if(result.isLogin==true){
		$(".midd_left_wrap").load(getwebroot()+"usercenter/purchaseManage/purchaseLeftMenu.html",function(){
			$("#evaluation").children().eq(3).children().eq(2).addClass("curr");
		});
	}
}
/**显示下单日期的选择框
 * showSelect void
 * @author wangjialin
 * 2016-8-10 上午11:01:35
 */
function showSelect(){
	$("#dateSelect").show();
}
function chooseDate(){
	var option =$("#dateSelect option:selected").text();
	date_type = $("#dateSelect option:selected").val();
	$("#date").text(option);
}
/**
 * 鼠标上移、下移效果
 */
function showAllName(e){
	$(e).parent().parent().find(".totalName").show();
}
function hideAllName(e){
	$(e).parent().parent().find(".totalName").hide();
}
/**
* 取到所有参数的值
* orgizaParam
* @return void
* @author yukai
* 2016-8-22
 */
function orgizaParam(){
	end_date = $("#end_time").val();
	start_date = $("#start_time").val();
	search_text1 = $("#search_text").val().trim();
	search_product_name = $("#search_product_name").val().trim();
	search_product_artno = $("#search_product_artno").val().trim();
	search_order_bh = $("#search_order_bh").val().trim();
	search_agreement_bh = $("#search_agreement_bh").val().trim();	
}
/**
 * 初始化所有的条件
* initParams
* @return void
* @author yukai
* 2016-8-22
 */
function initParams(){
	$("#end_time").val("");
	$("#start_time").val("");
	$("#search_text").val("");
	$("#search_product_name").val("");
	$("#search_product_artno").val("");
	$("#search_order_bh").val("");
	$("#search_agreement_bh").val("");
}
/**
 * 查询质检信息列表
* getOrderDetails
* @return void
* @author yukai
* 2016-8-22
 */
function getQualityFeedbackList(){
	orgizaParam();
	var url = "qualityFeedback/getQualityFeedbackList.do";
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
params.pur_company_id = companyId;

/*
 * 其他的参数设置
 */
if(date_type != ""){
	params.date_type = date_type;
	}
if(end_date != ""){
 params.end_date = end_date;
}
if(start_date != ""){
 params.start_date = start_date;
}
if(search_text1 != ""){
 params.search_text1 = search_text1;
	}
if(search_product_name != ""){
 params.search_product_name = search_product_name;
	}
if(search_product_artno != ""){
 params.search_product_artno = search_product_artno;
	}
if(search_order_bh != ""){
 params.search_order_bh = search_order_bh;
		}
if(search_agreement_bh != ""){
 params.search_agreement_bh = search_agreement_bh;
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
		$("#total_count").html(result.total);
	};
asyncAjaxMethod(url,params,true,fn);
	
}
/**供应商信息的翻页调用  
*/
function pageselectCallbacks(index,jq)
{
	orgizaParam();
	var url = "qualityFeedback/getQualityFeedbackList.do";		
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
* 2016-8-22
 */
function addItems(result){
	var evalText=doT.template($("#allQualityFeedbackStmpl").text());
	$("#allQualityFeedbacks").html(evalText(result));
}