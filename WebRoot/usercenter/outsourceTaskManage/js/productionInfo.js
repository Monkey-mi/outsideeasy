


$(function(){
	searchproduction();
	getTotalQty();
});

var pageSize = 10;//每页个数	
var currentPage=0;//当前页码

/**
 * 已生产的总量
 * @author chenlong
 */
function getTotalQty(){
	var url="externalTask/getTotalQty.do";;
	var params={};
	params.t_id =taskid;
	var fn =function(result){
		//以生产的总量
		if(result.data != null){
		$("#product_qty").html(result.data);
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}

/**
分页获取数据
pageIndex：当前页索引
needinit：是否为第一次加载
*/
function InitData(pageIndex,needinit,url,param)
{
currentPage=pageIndex;
var url=url;
var params={};
params.t_id =param.t_id;
params.scrq=param.scrq;
params.usePaging=true;
params.page=pageIndex;
	params.limit=pageSize;
	params.start=parseInt(pageIndex)*pageSize;
	var fn=function(result){
		if(pageIndex==0 && needinit){
			//第一次加载时加载分页控件
			initPagination(result.total);
		}
		//显示数据到表格
		addItem(result.data);
		//$("#show_current_task_num").html(result.total+"条记录");
	};
	asyncAjaxMethod(url,params,true,fn);
	
}
/**初始化分页控件
*/
function initPagination(totalCount){

	$("#pr_pagination").pagination(totalCount, {
         callback: pageselectCallback,
         prev_text: "<",
         next_text: ">",
         items_per_page: pageSize, //每页的数据个数
         num_display_entries: 3, //两侧首尾分页条目数
         current_page: 0,   //当前页码
         num_edge_entries: 2 //连续分页主体部分分页条目数
     });
}

/**生产信息的翻页调用  
*/
function pageselectCallback(index,jq)
{
	var url = "OutputItem/getTaskOutputList.do";
	var params ={};
	params.t_id = taskid;	
	params.scrq = document.getElementById("search_time").value;
	InitData(index,false,url,params);
}

/**生产信息条件查询的初始化
*/
function searchproduction(){
	
	var url = "OutputItem/getTaskOutputList.do";
	var params ={};
	params.t_id = taskid;
	params.scrq = document.getElementById("search_time").value;
	InitData(0,true,url,params);
	//读取并显示各项任务单的数量
	//showCountForEachStateTask();
}
/**
 * 生产信息的拼装
 * @param result
 */
function addItem (result){
	if( result != null){
		$("#table_product_list tr:gt(0)").empty();
		var productlist = result;
		var length = productlist.length;
		var  productItem ="";					
		for(var i=0; i< length;i++ ){
			var product = productlist[i];
			productItem = productItem +
		'<tr>'+
			'<td>'+((product.scrq==null)?"":showBeforeOfDateStr(product.scrq))+'</td>'+
			'<td>'+((product.section_name==null)?"":product.section_name)+'</td>'+
			'<td>'+((product.yield_qty==null)?"":product.yield_qty)+'</td>'+
			'<td>'+((product.worker_no==null)?"":product.worker_no)+'</td>'+
		 '</tr>';	
			}
		$(productItem).insertAfter("#production_Info_file");//把加载的文件放在该元素后面	
			}else{
				window.wxc.xcConfirm("并无生产信息");
			}
		
}
