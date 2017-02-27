	var pageSize=10;//每页个数
	var currentPage;//当前页码
	var sel_state_index=0;//状态下标:默认刚进入时未全部任务单
	var select_type;//下拉日期类型
	var start_filter_date;//开始日期
	var end_filter_date;//截止日期
	var search_text;//查询文本	
	var order_partten = null;//单位排序
	var order_flag = null;//正负排序
	var companyId = getParamFromWindowName("companyIdForAll");//公司ID 切换的公司id
	//异步加载loading效果插件参数
	var opts={lines: 10, // 花瓣数目
	            length: 5, // 花瓣长度
	            width: 5, // 花瓣宽度
	            radius: 10, // 花瓣距中心半径
	            corners: 1, // 花瓣圆滑度 (0-1)
	            rotate: 0, // 花瓣旋转角度
	            direction: 1, // 花瓣旋转方向 1: 顺时针, -1: 逆时针
	            color: '#ccc', // 花瓣颜色
	            speed: 1, // 花瓣旋转速度
	            trail: 60, // 花瓣旋转时的拖影(百分比)
	            shadow: false, // 花瓣是否显示阴影
	            hwaccel: false //spinner 是否启用硬件加速及高速旋转  
				, position: 'relative'
				};
	function pickedFunc1(){
		start_filter_date=$("#start_filter_date").val();
	}
	function pickedFunc2(){
		end_filter_date=$("#end_filter_date").val();
	}
	function clearingFunc1(){
		start_filter_date=null;
	}
	function clearingFunc2(){
		end_filter_date=null;
	}	
	/**注册监听事件*/
	function initListen(){
		$("#select_date_type").change(function(){
			select_type=$("#select_date_type").val();
		});
		$("#search_text").change(function(){
			search_text=$("#search_text").val().trim();
		});
		$("#all_select").click(function() {
   			$("input[name='sub']").prop("checked", this.checked);
  		});
  
 		$("input[name='sub']").click(function() {
    		var $subs = $("input[name='sub']");
   			$("#all_select").prop("checked" , $subs.length == $subs.filter(":checked").length ? true :false);
  		});
	}	
	/**初始化输入框等数据*/
	function initInputFileld(){
		currentPage=0;
		select_type=1;		
		order_partten = null;//单位排序		
		order_flag = null;//正负排序
		sel_state_index = sel_state_index;//选中不同的状态会更具当前的状态进行赋值
		$("#start_filter_date").val(null);
		$("#end_filter_date").val(null);
		$("#search_text").val(null);
	}
	/**执行查询*/
	function dosearch(){		
		InitData(0,true);
	}
	/**选择一个新的状态,
	 * 重置分页工具加载数据，并"高亮"选中状态
		index：状态下标
	*/
	function showInfo(index){		
			sel_state_index=index;			
			search_text = "";
			end_filter_date ="";
			start_filter_date ="";		
			dosearch();
			initInputFileld();
			reselstate(index);
			//读取并显示各项任务单的数量
			showCountForEachStateTask();
			$('#all_select').prop("checked", false);
	}
	/**
    	分页获取数据
    	pageIndex：当前页索引
    	needinit：是否为第一次加载
    */
    function InitData(pageIndex,needinit)
	{
		currentPage=pageIndex;
		var url="externalTask/getTaskListByCondition.do";
		var params={};	
		params.state=sel_state_index;
		if(select_type!=null){
			params.select_type=select_type;
		}
		if(select_type!=null && start_filter_date!=null ){
			params.start_filter_date=start_filter_date;
		}
		if(select_type!=null && end_filter_date!=null){
			params.end_filter_date=end_filter_date;
		}
		if(order_partten!=null ){
			params.order_partten = order_partten;
		}
		if(order_flag!=null){
			params.order_flag = order_flag;
		}		
		params.search_text=search_text;
		params.usePaging=true;
		params.page=pageIndex;
   		params.limit=pageSize;
   		params.company_id = companyId;
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

		$("#pagination").pagination(totalCount, {
             callback: pageselectCallback,
             prev_text: "<",
             next_text: ">",
             items_per_page: pageSize, //每页的数据个数
             num_display_entries: 3, //两侧首尾分页条目数
             current_page: 0,   //当前页码
             num_edge_entries: 2 //连续分页主体部分分页条目数
         });
    }
	/**翻页调用  
	*/
	function pageselectCallback(index,jq)
	{
		InitData(index,false);
	}
	/**按照下标，"高亮"选中状态
	*/
	function reselstate(index){
		
		$(".tasklist_tab").children(".curr").removeClass("curr");
		$(".tasklist_tab").children().eq(index).addClass("curr");
		$(".tasklist_tab").children().find("span.split").css("display","inline");
//		$(".tasklist_tab").children().eq(index).prev().find("span.split").css("display","none");
	}
	/**显示数据到表格 
	*/
	function addItem(array){
		$("#mainTbody").html("");
		if(array==null || array.length==0){
			return;
		}
		var tableItem="";
		for(var i=0;i<array.length;i++){
			var task=array[i];
			tableItem =tableItem
						+"<tr height='26' bgcolor='#fbebc9'  class='task_num'>"
							+"<td colspan='7' class='orderInfo'>"
								+"<input type='checkbox' onClick='selectSingle()' value="+task.t_id+" name='sub' class='ml10'></input>"
								+"<div class='inline_block c777 ml8'>任务单流水号 <span style='color:#0074c2'>"+replaceNullAsStr(task.serial_no)+"</span></div>"
								+"<div class='inline_block c777 ml20'>内部任务单号 <span style='color:#0074c2'>"+replaceNullAsStr(task.rwdh)+"</span></div>"
								+"<div class='inline_block c777 ml20'>订单号 <span style='color:#0074c2' class='mr20'>"+replaceNullAsStr(task.ddh)+"</span>生产单号 <span style='color:#0072c4'>"+replaceNullAsStr(task.scdh)+"</span></div>"
								+"<div class='inline_block' style='float:right;'>创建时间:"+replaceNullAsStr(task.czsj)+"</div>"
							+"</td>"
						+"</tr>"
						+"<tr height='80' class='task_info'>"
							+"<td class='border_left'>";
							if(task.product_pic != null){
								tableItem =tableItem+"<div class='posR'><span class='inline-block productName' onmouseover='showBigImage(this,\""+replaceNullAsStr(task.product_pic)+"\")'  onmouseout='hideBigImage(this)'>"+replaceNullAsStr(task.product_name)+"</span></div>";
							}else{
								tableItem =tableItem+"<div class='posR'><span class='inline-block' >"+replaceNullAsStr(task.product_name)+"</span></div>";
							}	
							tableItem =tableItem+"</td>"
							+"<td class='border_left'>"
								+"总数"
									+task.total_qty+"个<br> <span style='color:#86c610'>"
									+task.produced_qty+"</span> 个完工  <br> <span style='color:#f1af27'>"
									+task.qualified_qty+"</span> 个交货"
							+"</td>"
							+"<td class='border_left t_algin_c'>"
								+showBeforeOfDateStr(task.plan_start)
							+"</td>"
							+"<td class='border_left t_algin_c'>"
								+showBeforeOfDateStr(task.plan_complete)
							+"</td>"
							+"<td class='border_left'>"
								+replaceNullAsStr(task.receive_company_name)+"<br><div class='team'>"+replaceNullAsStr(task.bzmc)+"</div>"					
							+"</td>"
							+"<td class='border_left' style='padding:10px 0px 10px 20px;'>"
								+showstate(task)
								+"<br/>"
								+showlogistic(task)
							+"</td>"
							+"<td class='border_left border_right'>"								
								+showOperateByTask(task)
							+"</td>"
						+"</tr>";
			
		}
		$("#mainTbody").html(tableItem);
	}
	
	/**按照状态位显示状态
	*/
	function showstate(task){
		var result;
		switch(task.state){
			case 5:
				result="等待派单";
				break;
			case 10:
				result="已派单";
				break;
			case 15:
				var product = task.produced_qty/task.total_qty*100;
				if(product>100){
					product =100;
				}
				var percent=Math.ceil(product)+"%";
				result="生产中("+percent+")";
				
				break;
			case 20:
				result="在验收";
				break;
			case 25:
				result="任务完结";
				break;
			case 30:
				result="已取消";
				break;
			case 40:
				result="已终止";
				break;
			default:
				result="异常";
				break;
		}
		return result;
	}
	/**根据任务单信息，显示可进行的操作
	 *例如：+"<span class='task_link_font'>取消 &nbsp;<a class='task_link_font' href='taskInfo.html'>详情 </a></span>"
	*/
	function showOperateByTask(task){
		var result="";
		var str="";
		if(task.total_qty==task.confirmed_qty&&task.qualified_qty<task.total_qty){
			str="<br/><button onclick='comfirmFinish("+task.t_id+",\""+task.rwdh+"\","+task.confirmed_qty+","+task.qualified_qty+","+task.return_qtyVo+")' class='comfirmFinish'>确认完结</button>";
		}
		
		switch(task.state){
			case 5://等待派单
				result="<span>"
				+"<a class='task_link_font'  onClick='gotaskinfo("+task.t_id+")'>完善工艺要求</a>"
				+"<a class='task_link_font ml10' href='javascript:void(0)' onclick='sendOrder("+task.t_id+",\""+task.receive_company_name+"\",\""+task.plan_start+"\",\""+task.plan_complete+"\",\""+task.operator_file+"\",\""+task.qc_type+"\",\""+task.product_pic+"\")'>派单</a>"
				+"</span>"
				+"<span>"
				+"<a class='task_link_font '  onClick='gotaskinfo("+task.t_id+")'>详情 </a>"
				+"<a class='task_link_operate ml10' href='javascript:void(0)' onclick='stopOrder("+task.t_id+")'>取消 </a>"
				+"</span>";
				break;
			case 10://已派单
				result="<span>"
				+"<a class='task_link_font' href='javascript:void(0)' onclick='recoverOrder("+task.t_id+")'>收回派单</a>"
				+"<br/>"
				+"<a class='task_link_font ' onClick='gotaskinfo("+task.t_id+")'>详情 </a>"
				+"<a class='task_link_operate ml10' href='javascript:void(0)' onclick='stopOrder("+task.t_id+")'>取消 </a>"
				+"</span>";
				break;
			case 15://在生产
				result="<span>"
				+"<a class='task_link_font' onclick='gologistics("+task.t_id+")'>物料发送</a>"
				+"<a class='task_link_font ml10'  onclick='goproducts("+task.t_id+")'>生产信息</a>"
				+"</span>"
				+"<span>"				
				+"<a class='task_link_font '  onclick='godelevils("+task.t_id+")'>到货信息</a>"
				+"<a class='task_link_font ml10' onclick='goQualityControl("+task.t_id+")'>质检信息</a>"
				+"<br/>"
				+"<a class='task_link_font' onClick='gotaskinfo("+task.t_id+")'>详情 </a>"
				//+"<a class='task_link_operate ml30' href='javascript:void(0)' onclick='abortOrder("+task.t_id+")'>终止 </a>"
				+"<a class='task_link_operate ml30' href='javascript:void(0)' onclick='checkAbort("+task.t_id+")'>终止 </a>"
				+"</span>";
				break;
			case 20://在验收
				result="<span>"
				+"<a class='task_link_font' onclick='godelevils("+task.t_id+")'>到货信息</a>"
				+"<a class='task_link_font ml10' onclick='goQualityControl("+task.t_id+")'>质检信息</a>"
				+"<br/>"
				+"<a class='task_link_font'  onClick='gotaskinfo("+task.t_id+")'>详情 </a>"
				//+"<a class='task_link_operate ml30' href='javascript:void(0)' onclick='abortOrder("+task.t_id+")'>终止 </a>"
				+"<a class='task_link_operate ml30' href='javascript:void(0)' onclick='checkAbort("+task.t_id+")'>终止 </a>"
				+"</span>"
				+str;
				break;
			case 25://任务完结
				result="<span>"
				+"<a class='task_link_font' onclick='goQualityControl("+task.t_id+")'>质检信息</a>"
				+"<br/>"
				+"<a class='task_link_font'  onClick='gotaskinfo("+task.t_id+")'>详情 </a>"
				+"</span>";
				break;
			case 30://已取消
				result="<span>";
				result=result+"<a class='task_link_font '  onClick='gotaskinfo("+task.t_id+")'>详情 </a>";
				if(task.stopreason){
					result=result+"<a class='task_link_operate ml10' href='javascript:void(0)' onclick='showStopReason(\""+task.stopreason+"\")'>取消原因</a></span>";
				}
				break;
			case 40://已终止
				result="<span>";			
					result=result+"<a class='task_link_font '  onClick='gotaskinfo("+task.t_id+")'>详情 </a>" ;
					result=result+"<a class='task_link_operate ml10' href='javascript:void(0)' onclick='showEndReason("+task.t_id+")'>终止原因</a>"		
				+"</span>";
				break;
			default:
				break;
		}
		return result;
	}
	/**显示物流信息*/
	function showlogistic(task){
		var info="";
		if(task.state==15||task.state==20){
		if(task.logisticsCount>0){
			info=info+"成品已回";
		}
		if(task.unReceivedlogisticsCount>0){
			info=info+"<br/><a class='maincolor' onClick='godelevils("+task.t_id+")'>"+task.unReceivedlogisticsCount+"条待收货</a>";
		}
		}
		return info;
	}
	/**读取并显示各种状态任务单的数量
	 * */
	function showCountForEachStateTask(){
		var url="externalTask/getTaskCountOfAllState.do";
		var params={company_id:companyId};
   		var fn=function(result){
   			var vo=result.data;
   			var tasklist_tab = $(".tasklist_tab").children();
   			tasklist_tab.eq(0).children().first().html("全部任务单("+vo.all+")");
   			tasklist_tab.eq(1).children().first().html("未派单任务("+vo.toBeSend+")");
   			tasklist_tab.eq(2).children().first().html("待接收任务("+vo.sended+")");
   			tasklist_tab.eq(3).children().first().html("在生产任务("+vo.producting+")");
   			tasklist_tab.eq(4).children().first().html("在验收任务("+vo.finishproduct+")");
   			tasklist_tab.eq(5).children().first().html("已完结任务("+vo.taskOver+")");  		
   			tasklist_tab.eq(6).children().first().html("异常任务("+vo.stoped+")");
   			
   		};
   		asyncAjaxMethod(url,params,true,fn);
	}
	/**派单,必须指定接收公司和产品主图
	 * 如果工艺文件、视频、质检标准、作业指导书，其中一样没有，需要提醒，并在此确认派单
	 * 参数：任务单号*/
	function sendOrder(t_id,receive_company_name,plan_start,plan_complete,operator_file,qc_type,product_pic){
		if(receive_company_name=="null"||receive_company_name==""){
			var option={title:"提示"};
			window.wxc.xcConfirm("尚未指定接受公司", window.wxc.xcConfirm.typeEnum.custom,option);
			return;
		}
		 if(plan_start=="null"||plan_start==""||plan_complete==null||plan_complete==""){
			var option={title:"提示"};
			window.wxc.xcConfirm("计划的的时间段不够完全", window.wxc.xcConfirm.typeEnum.custom,option);
			return;
		}
		/* if(product_pic=="null"||product_pic==""){
			
			var option={title:"提示"};
			window.wxc.xcConfirm("尚未指定产品主图", window.wxc.xcConfirm.typeEnum.custom,option);
			return;
		}*/
		/* if(qc_type=="null"||qc_type==""){
			var option={title:"提示"};
			window.wxc.xcConfirm("尚未指定质检方式", window.wxc.xcConfirm.typeEnum.custom,option);
			return;
		}*/
		 if(operator_file=="null"||operator_file==""){
			var option={title:"提示"};
			window.wxc.xcConfirm("尚未指定指导文件", window.wxc.xcConfirm.typeEnum.custom,option);
			return;
		}
		 window.wxc.xcConfirm("您将把任务单下达给"+receive_company_name, window.wxc.xcConfirm.typeEnum.confirm,
		{
			onOk:function(){
				var url="externalTask/updateTaskState2Send.do";
				var params={};
				params.t_id=t_id;
		   		var fn=function(result){
		   			if(result.toConfirm==true){
	   					window.wxc.xcConfirm("您的工艺文件尚未完善,是否确认派单", window.wxc.xcConfirm.typeEnum.confirm,
						{
							onOk:function(){
								var url="externalTask/updateTaskState2SendSecond.do";
								var params={};
								params.t_id=t_id;
						   		var fn=function(result){
						   			if(result.message=="任务单当前状态不是等待派单"){
						   				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
						   				closeBytimeCount_list(2);	   				
						   			}else if(result.message=="成功"){
						   				InitData(currentPage,false);
										showCountForEachStateTask();
										$('#all_select').prop("checked", false);
							   			}									
						   		};
						   		asyncAjaxMethod(url,params,true,fn);
							}
						});
	   				}else if(result.message=="任务单当前状态不是等待派单"){
		   				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
		   				closeBytimeCount_list(2);	   				
		   			}else if(result.message=="成功"){	   			
	   					xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
	   					closeBytimeCount_list(2);
	   				}
		   		};
		   		asyncAjaxMethod(url,params,true,fn);
				
			}
		});
		
	}
	/**取消任务单
	 * 参数：任务单号*/
	function stopOrder(t_id){
		var url1="externalTask/getTaskState.do";
		var params1={};
		params1.t_id=t_id;
   		var fn1=function(result){
   			var state1 = result.getstate;
   			if(parseInt(state1)>=15){
   				xcconfirm=new window.wxc.xcConfirm("对方已接收无法取消",window.wxc.xcConfirm.typeEnum.infoNobtn);
   				closeBytimeCount_list(2);
   				return;
   			}else if(parseInt(state1)==30){  				
   				xcconfirm=new window.wxc.xcConfirm("对方已经取消，不可重复操作",window.wxc.xcConfirm.typeEnum.infoNobtn);   			
   				closeBytimeCount_list(2);
   				return;
   			}else {
		window.wxc.xcConfirm("取消原因<input type='text' style='margin-left:5px;width:184px;' id='reasonForCancel'>",  window.wxc.xcConfirm.typeEnum.custom,
		{
			onOk:function(){
				var url="externalTask/updateTaskState2Stop.do";
				var params={};
				params.t_id=t_id;
				params.reason=$("#reasonForCancel").val();
				if(params.reason.toString().length>200){
					window.wxc.xcConfirm("最多输入200个字符！");
					return;
				}
		   		var fn=function(result){
		   			if(result.message=="对方已经确认，不可取消"){
		   				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
		   				closeBytimeCount_list(2);	   				
		   			}if(result.message=="对方已经取消，不可重复操作"){
		   				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
		   				closeBytimeCount_list(2);	   				
		   			}else if(result.message=="成功"){
		   			//刷新当前页
						InitData(currentPage,false);
						showCountForEachStateTask();
						$('#all_select').prop("checked", false);
		   			}
		   		};
		   		asyncAjaxMethod(url,params,true,fn);				
			}
		});
   	}  		
   	};
   		asyncAjaxMethod(url1,params1,true,fn1);
	}
	/**弹框取消原因
	 * t_id
	 */
	function showStopReason(stopreason){
		var option={title:"取消原因",btn:""};
		window.wxc.xcConfirm(stopreason, window.wxc.xcConfirm.typeEnum.custom,option);
	}
	/**收回派单*/
	function recoverOrder(t_id){
		window.wxc.xcConfirm("确认收回派单", window.wxc.xcConfirm.typeEnum.confirm,
		{
			onOk:function(){
				var url="externalTask/updateTaskState2toBeSend.do";
				var params={};
				params.t_id=t_id;
		   		var fn=function(result){
		   			if(result.message=="任务单当前已被接受,无法收回派单"){
		   				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
		   				closeBytimeCount_list(2);	   				
		   			}else if(result.message=="任务单当前已被收回,无法再操作"){
		   				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
		   				closeBytimeCount_list(2);
		   			}else if(result.message=="成功"){
		   			//刷新当前页
						InitData(currentPage,false);
						showCountForEachStateTask();
						$('#all_select').prop("checked", false);
		   			}
		   			
		   		};
		   		asyncAjaxMethod(url,params,true,fn);
			}
		});
	}
	/**
	 * 单选
	* selectSingle
	* @return void
	* @author chenlong
	* 2016-9-26
	 */
	function selectSingle() {
		var chknum =  $("#mainTbody").find(":checkbox").size();//选项总个数 
		var chk = 0;
		$("#mainTbody").find(":checkbox").each(function() {
			if ($(this).is(":checked")) {			
				chk++;		
			}
		});
		if (chknum == chk) {//全选 
			$('#all_select').prop("checked", true);
		} else {//不全选 
			$('#all_select').prop("checked", false);
		}	
	}
	/**
	 * 多选
	* selectAll
	* @return void
	* @author chenlong
	* 2016-9-26
	 */
	function selectAll(){
		if($("#all_select")[0].checked){    
	        $("#mainTbody").find(":checkbox").each(function(){
				$(this).prop("checked", true); 
			});   
	    }else{    
	    	$("#mainTbody").find(":checkbox").each(function(){
				$(this).prop("checked", false); 
			});
	    }
	}
	/**
	 * 批量收回任务单
	* recoverOrderLsit
	* @return void
	* @author chenlong
	* 2016-9-26
	 */
	function recoverOrderLsit(){
		var param = [];
		var id = 0;
		var count =0;
		$("#mainTbody").find(":checkbox").each(function(){
				if ($(this).is(":checked")) {
				id = $(this).val();
				param.push(id); 
				count++;
				}
			});
		if(count>0){
			window.wxc.xcConfirm("确认要收回选中的这"+count+"条任务单", window.wxc.xcConfirm.typeEnum.confirm,
			{
			onOk:function(){
		    var tidlist = param.join(",");
		    var url="externalTask/updateTaskState2toBeSendList.do";
			var params={tidlist:tidlist,count:count};
	   		var fn=function(result){
	   			xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
	   			closeBytimeCount_list(2);
	   		};
	   		asyncAjaxMethod(url,params,true,fn); 
			}								
			});	
		 }else{
		    var option ={title:"提示",btn:parseInt("0001",2)};
		    window.wxc.xcConfirm('未选中一条任务单', window.wxc.xcConfirm.typeEnum.custom,option);
		}
	}
	/**
	 * 批量派发任务单
	* sendOrderList
	* @return void
	* @author chenlong
	* 2016-9-26
	 */
	function sendOrderList(){
		var param = [];
		var id = 0;
		var count =0;
		$("#mainTbody").find(":checkbox").each(function(){
				if ($(this).is(":checked")) {
				id = $(this).val();
				param.push(id); 
				count++;
				}
			});
		if(count>0){
			window.wxc.xcConfirm("确认要派选中的这"+count+"条任务单", window.wxc.xcConfirm.typeEnum.confirm,
			{
			onOk:function(){
		    var tidlist = param.join(",");
		    var url="externalTask/updateTaskStateForList.do";
			var params={tidlist:tidlist,count:count};
	   		var fn=function(result){
	   			xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
	   			closeBytimeCount_list(4);	
	   		};
	   		asyncAjaxMethod(url,params,true,fn); 
			}								
			});	
		 }else{
		    var option ={title:"提示",btn:parseInt("0001",2)};
		    window.wxc.xcConfirm('未选中一条任务单', window.wxc.xcConfirm.typeEnum.custom,option);
		}
	}	
	/*
	 * 弹出框两秒后自动关闭效果
	 * params：num 计时器秒数
	 * author：yangliping
	 * create_dt:2016年5月26日11:28:37
	 * */
	function closeBytimeCount_list(num)
	{
		time_c=num;
		time_c=time_c-1;
		if(time_c>=0)
		{
			setTimeout("closeBytimeCount_list(time_c)",1000);
		}
		else
		{
			xcconfirm.xcClose();
			//刷新当前页
			InitData(currentPage,false);
			showCountForEachStateTask();
			$('#all_select').prop("checked", false);
		}
	}
	/**
	 * 物流信息的接入
	 * @param id
	 */
	function gologistics(id){		
		var resultName = JSON.stringify({"task_id":id,"companyIdForAll":companyId});
		window.open(getwebroot()+"externalTask/outsourceLogisticsInfo/"+id+".htm",resultName);
	}
	/**
	 * 任务单页面的接入
	 * @param id
	 */
	function gotaskinfo(id){
		var resultName = JSON.stringify({"task_id":id,"companyIdForAll":companyId});
		window.open(getwebroot()+"externalTask/outsourceTaskInfo/"+id+".htm",resultName);
	}
	/**
	 * 生产单页面的接入
	 * @param id
	 */
	function goproducts(id){
		var resultName = JSON.stringify({"task_id":id,"companyIdForAll":companyId});
		window.open(getwebroot()+"externalTask/outsourceProductionInfo/"+id+".htm",resultName);
	}
	/**
	 *  到货信息
	 * @param id
	 */
	function godelevils(id){
		var resultName = JSON.stringify({"task_id":id,"companyIdForAll":companyId});
		window.open(getwebroot()+"externalTask/outsourceDeliveredInfo/"+id+".htm",resultName);
	}
	/**链接到质检信息页面
	 * goQualityControl
	 * @param id void
	 * @author wangjialin
	 * 2017-1-6 下午2:36:30
	 */
	function goQualityControl(id){
		var resultName = JSON.stringify({"task_id":id,"companyIdForAll":companyId});
		window.open(getwebroot()+"externalTask/outsourceQualityControl/"+id+".htm",resultName);
	}
	/**鼠标经过显示大图
	 * showBigImage
	 * @param e void
	 * @author wangjialin
	 * 2016-11-24 下午5:59:24
	 */
	function showBigImage(e,product_pic){
		if(product_pic!=''){
			newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+product_pic;		
			var obj=$("#bigImage");
			obj.children("div").children("img").attr("src",replaceNullAsStr(newsrc));
			$(e).parent().append(obj);
			var len=$(e).width();
			$(e).next().css("left",len);
			$(e).next().show();
		}
	}
	/**鼠标离开隐藏大图
	 * hideBigImage
	 * @param e void
	 * @author wangjialin
	 * 2016-11-24 下午5:59:44
	 */
	function hideBigImage(e){
		var obj=$(e).next();
		$("#bigImageWrap").append(obj);
		$(e).next().remove();
	}
	/**
	 * 切换选中的状态
	* byOrderFocus
	* @param flag
	* @param e
	* @param name_flag
	* @return void
	* @author chenlong
	* 2016-11-28
	 */
function byOrderFocus(flag,e,name_flag){	
	order_flag = flag;
	if(flag){
		if($(e).find("img").prop("src").indexOf("/newresources/images/tasks/up-gray.png")>0){
		    $(e).find("img").prop("src","/newresources/images/tasks/up-hover.png");
		    $(e).next().find("img").prop("src","/newresources/images/tasks/down-gray.png");	
		    order_partten = name_flag;
		}else{
			$(e).find("img").prop("src","/newresources/images/tasks/up-gray.png");
			order_partten = null;
		}
	}else{
		if($(e).find("img").prop("src").indexOf("/newresources/images/tasks/down-gray.png")>0){
		    $(e).find("img").prop("src","/newresources/images/tasks/down-hover.png");
		    $(e).prev().find("img").prop("src","/newresources/images/tasks/up-gray.png");
		    order_partten = name_flag;
		}else{
			$(e).find("img").prop("src","/newresources/images/tasks/down-gray.png");
			order_partten = null;
		}
	}
	$(e).parent().parent().siblings().find(".byOrder img:eq(0)").prop("src","/newresources/images/tasks/up-gray.png");
	$(e).parent().parent().siblings().find(".byOrder img:eq(1)").prop("src","/newresources/images/tasks/down-gray.png");
	InitData(currentPage,false);
	$('#all_select').prop("checked", false);
}

	function checkAbort(id){
		var url = "externalTask/isTaskStateProhibit.do";
		var params = {t_id:id,companyId:companyId};
		var fn = function(result){//无操作
			if(result.isProhibit){//符合条件
				abortOrder(id);
			}else{
				var option ={title:"提示",btn:parseInt("0001",2)};
	            window.wxc.xcConfirm(result.message, window.wxc.xcConfirm.typeEnum.custom,option);
			}
		};
		asyncAjaxMethod(url,params,false,fn);
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
	/**终止任务单
	 * stopOrder void
	 * @author wangjialin
	 * 2016-8-31 上午9:53:35
	 */
	function abortOrder(id){
		    $("#hide_stop_id").val(id);
			var urlo = "taskFile/getTaskProhibitFile.do";
			var params = {t_id:id};
			params.file_type = 48;
			var fno = function(results){
				var data = results.data;
				var item ="";
				if(data != null){
					item=data.file_name+data.suffix_name;	
					$("#button_stop_file").hide();
					$(".uploadFileNameForStop").html("<a class='blue' onClick = 'LoadFileinfo("+data.tf_id+")'>"+item+"</a>");
				}else{
					$("#button_stop_file").show();
				}
				pop_div_show("abortOrder");
				$("#stopContent").val("");					    	        	
	        	if(data != null){
	        	$(".uploadFileNameForStop").append("<img src='/newresources/images/sale/del.png' class='del' onclick='clean("+data.tf_id+")'>");
	        	}
	        };
			asyncAjaxMethod(urlo,params,true,fno);
	}
	/**
	 * 上传终止文件
	* showUploadFile
	* @return void
	* @author chenlong
	* 2016-8-31
	 */
	function showUploadFile(){
		var fileIsNull = $(".uploadFileNameForStop").text();
		if(fileIsNull==""){				
			var fileurl = "taskFile/addOTaskStopFile.do";			
			var id = $("#hide_stop_id").val();	
			var params = {"t_id":id};
			var fn = function(data){					
				        if (data.success==true ) { 
				        	$("#button_stop_file").hide();
				        	var item=data.filename+data.suffix_name;		    
				        	$(".uploadFileNameForStop").html("<a class='blue' onClick = 'LoadFileinfo("+data.tf_id+")'>"+item+"</a>");	
				        	$(".uploadFileNameForStop").append("<img src='/newresources/images/sale/del.png' class='del' onclick='clean("+data.tf_id+")'>");
				        }else{
				        	var option ={title:"提示",btn:parseInt("0001",2)};
				            window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
				        }
			}; 
			 addInputUtilFile(fileurl,params,"stopOrderUploadInput",fn);
		}else{
			var option ={title:"提示",btn:parseInt("0001",2)};
	    	window.wxc.xcConfirm('文件已上传！！', window.wxc.xcConfirm.typeEnum.custom,option);
		}
	}
	/**
	 * 保存终止信息
	* saveStopOrder
	* @return void
	* @author chenlong
	* 2016-8-31
	 */
	function saveStopOrder(){
		var id = $("#hide_stop_id").val();
		var stopContent = $("#stopContent").val().trim();
		if(stopContent == ""){
			var option ={title:"提示",btn:parseInt("0001",2)};
			window.wxc.xcConfirm("终止理由不能为空！", window.wxc.xcConfirm.typeEnum.custom,option);
		}else if(stopContent.length >150){
			var option ={title:"提示",btn:parseInt("0001",2)};
			window.wxc.xcConfirm("字数不能超过150字！", window.wxc.xcConfirm.typeEnum.custom,option);
		}else{
			var url = "externalTask/addTaskEndRecord.do";
			var params ={t_id:id,end_description:stopContent,companyId:companyId};
			var fn = function(result){
				if(result.data=="success"){
					pop_div_close('abortOrder');
					var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
					xcconfirm = new window.wxc.xcConfirm("终止任务单成功！", window.wxc.xcConfirm.typeEnum.custom,option);
					closeBytimeCount_list(2);
				}else{
					var option ={title:"提示",btn:parseInt("0001",2)};
					xcconfirm = new window.wxc.xcConfirm(result.data, window.wxc.xcConfirm.typeEnum.custom,option);
				}
		};
		asyncAjaxMethod(url,params,true,fn);
		}
	}
	/**
	 * 查看终止原因
	* showEndReason
	* @return void
	* @author chenlong
	* 2016-11-25
	 */
	function showEndReason(id){
		var url = "externalTask/getTaskEndRecord.do";
		var params ={t_id:id};
		var fn = function(result){	
			var data = result.data.taskFile;
			var item ="无";
			if(data != null){
				item=data.file_name+data.suffix_name;					
			}	
			pop_div_show("comfirmAbort");
			$("#end_result").html(replaceNullAsStr(result.data.taskEndRecord.end_description));				    
			$("#end_file").html('<a class="blue" onClick = "LoadFileinfo('+data.tf_id+')">'+item+'</a>');	
		};
		asyncAjaxMethod(url,params,true,fn);		
	}
	/**
	 * 删除终止文件
	* clean
	* @param id
	* @return void
	* @author chenlong
	* 2016-11-25
	 */
	function clean(id){
		var url = "taskFile/deleteTaskFile.do";
		var params ={tf_id:id};
		var fn = function(result){	
			if(result.success == true){
				$("#button_stop_file").show();
				$(".uploadFileNameForStop").html("");
			}
		};
		asyncAjaxMethod(url,params,true,fn);
	}
	/**
	 * 下载终止协议
	* LoadFileinfo
	* @param tf_id
	* @return void
	* @author chenlong
	* 2016-8-24
	 */
	function LoadFileinfo(a_id){
		var params = {tf_id:a_id};
		var url = "taskFile/getTaskFile.do";
		var fn= function(result){
			if(result.data!=null){
				var filename = result.data.object_id;
				window.open(getwebroot()+'taskFile/downLoadFileFormMongo.do?file='+filename, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');	
			}else{
				window.wxc.xcConfirm("不存在文件,请联系管理员");
			}	
		};
		asyncAjaxMethod(url,params,true,fn); 		
	}
	/**
	 * 确认完结
	 * comfirmFinish
	 * @param t_id,rwdh,confirmed_qty,qualified_qty,repair_qty void
	 * @author yukai
	 * 2016-12-7 上午9:19:19
	 */
	function comfirmFinish(t_id,rwdh,confirmed_qty,qualified_qty,repair_qty){
			var url = "externalTask/comfirmFinish.do";
			var params ={};
			params.t_id=t_id;
			params.rwdh=rwdh;
			params.checkNum=repair_qty;
			params.qualifiedNum=(confirmed_qty-qualified_qty);
			params.state=25;
			var fn = function(result){	
				if(result.success == true){
					showInfo(4);
				}
			};
			asyncAjaxMethod(url,params,true,fn);
	}
