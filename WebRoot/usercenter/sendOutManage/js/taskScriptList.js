/**
 * 使用实例：window.ProductRef({DivBodyTan:"addProduct",//添加进一个”addProduct“ID后面 
		                    onSomeEvent:pop_div_show,//展示弹出框的function
		                    onSomeCloseEvent:pop_div_close//关闭弹出框的function
		                    addEvent:ShowTaskProductList//返回的保存数据组装成发货清单
		                    deliver_number:deliver_number//发货单号
		                    addAddressObj:objs,添加任务单的对象，可以为空
		                    type:tpe//0:发货，1：返修
		            });
 */
;(function($,window,document,undefined){
	window.ProductRef=function(options){
		"use strict";
		
		var options=$.extend({
			DivBodyTan:"",
			onSomeOpenEvent: $.noop,	
		    onSomeCloseEvent: $.noop,	
			addEvent: $.noop,
			deliver_number:"",
			addAddressObj:"",
			type:0
		},options);
		/**
		 * 参数初始化
		 */
		var pageSize = 8;//每页个数	
		var currentPage= 0;//当前页码
		var send_company = 0;//默认公司
		var regComment = true;//是否是不同公司的列表
		var params_subc =[];//定义一个就是数组存储勾选值id
		var params_subinitc =[];//定义一个初始的数组记录用户对任务单的操作	
		var search_product = "";//产品名称
		var search_rwdh = "";//搜索任务单号
		var search_company = "";//客户名称	
		
		/**
		 * 初始化弹出的任务单数据
		 */
		var popId = creatPopId();//设置弹出窗口的索引，防止重复
		$("#"+options.DivBodyTan).empty();
		var evalText = doT.template($("#addProductImpl").text());
		$("#"+options.DivBodyTan).append(evalText(popId));
		options.onSomeEvent(options.DivBodyTan);//弹框
		onEventMent();//绑定事件
		initParams();//初始化查询条件
		searchComFiles();//加载数据
		/**
		 * 绑定事件
		 */
		function onEventMent(){
			$("#selectAll").on("click",selectcom_all);//绑定所有选中的实践
			$("#newWindowTask").on("click",close);//关闭弹出的框
			$("#seachTaskM").on("click",search_initcom);//绑定查询的事件
			$(".insertIntoList").on("click",saveComWithAccess);//保存发货单
		}
		/**
		* 取到所有参数的值
		* orgizaParam
		* @return void
		* @author chenlong
		* 2016-12-9
		 */
		function orgizaParam(){				
			search_product = $.trim($("#search_product").val());
			search_rwdh = $.trim($("#search_rwdh").val());
			search_company = $.trim($("#search_company").val());			
		}
		/**
		 * 初始化所有的条件
		* initParams
		* @return void
		* @author chenlong
		* 2016-12-9
		 */
		function initParams(){			
			currentPage = 0;
			$("#search_product").val("");
			$("#search_rwdh").val("");
			$("#search_company").val("");			
		}
		/**
		 * 搜索时初始化
		 */
		function search_initcom(){			
			 searchComFiles();//加载\公司列表			
		}
		/**列表信息的查询
		*/
		function searchComFiles(){
			orgizaParam();
			var url = "externalTask/getTaskListForShipping.do";
			var params={};	   
			InitDatas_com(0,true,url,params);
		}		
		/**
		分页获取数据
		pageIndex：当前页索引
		needinit：是否为第一次加载
		*/
		function InitDatas_com(pageIndex,needinit,url,param)
		{
		currentPage = pageIndex;
		var url = url;		
		if(search_product != ""){
		 param.search_product = search_product;
		}		
		if(search_rwdh != ""){
		 param.search_rwdh = search_rwdh;
		}		
		if(search_company != ""){
		 param.search_company = search_company;
		}
		if(send_company != 0 ){
		 param.send_company = send_company;
		}
		if(options.deliver_number !="" && options.deliver_number != null){
		 param.deliver_number = options.deliver_number;
		}		
		param.usePaging = true;
		param.company_id = companyId;
		param.page = pageIndex;
		param.limit = pageSize;
		param.start = parseInt(pageIndex)*pageSize;
		param.deliver_type = options.type;
		var fn = function(result){
			if(pageIndex == 0 && needinit){
					//第一次加载时加载分页控件
				initPaginations_com(result.total);
			}
				//显示数据到表格
				addItems_com(result.data);						
			};
		asyncAjaxMethod(url,param,true,fn);			
		}
		/**供应商信息的翻页调用  
		*/
		function pageselectCallbacks_com(index,jq)
		{
			var url = "externalTask/getTaskListForShipping.do";					
		    var params = {};
		    InitDatas_com(index,false,url,params);
		}
		/**初始化分页控件
		*/
		function initPaginations_com(totalCount){	
			$("#paginationcom").pagination(totalCount, {
		         callback: pageselectCallbacks_com,
		         prev_text: "<",
		         next_text: ">",
		         items_per_page: pageSize, //每页的数据个数
		         num_display_entries: 3, //两侧首尾分页条目数
		         current_page: 0,   //当前页码
		         num_edge_entries: 2 //连续分页主体部分分页条目数
		     });
		}
		/**
		 * 拼装任务单的列表
		 */	
		var addItems_com = function(result){
			regComment = result.regComment;
			$("#tableList").find("tr:gt(0)").remove();
			var evalText=doT.template($("#addTaskListImpl").text());
			$("#tableList").find("tr:eq(0)").after(evalText(result.task));
			$("#tableList").find("tr:gt(0) [type='checkbox']").on("click",select_single_com);
			allcom();//判断是否是全选	
		};
		
		//判断翻页后是否是全选
		function allcom(){	
			var count = 0;
			    $("#tableList").find("tr:gt(0)").each(function(){		  
				    for (var x in params_subc) {				  
					if(params_subc[x]==parseInt($(this).find("td:eq(0) input:eq(0)").val())){
				       $(this).find("td:eq(0)").children().prop("checked", true); 
				       count++;
					}
				    }
				});							
			var chknum =  parseInt( $("#tableList").find("tr:gt(0)").length);//选项总个数 
			if(count == chknum){
				$('#selectAll').prop("checked", true);
			}else{
				$('#selectAll').prop("checked", false);
			}
		}
		
		//单选
		function select_single_com() {
			var obj = $(this);
			var task_id = $(obj).val();	//获取id	 			
			saveComfileID(1,task_id,obj.is(":checked"));//存储选中的id值	
			send_company = $(obj).parent().next().find("input").val();			
			if(!regComment){
				searchComFiles();//加载数据
			}
			if(params_subc.length==0){
				send_company = 0;
				searchComFiles();//加载数据
			}
			var chk = 0;			
			$("#tableList").find("tr:gt(0)").each(function(){
				if($(this).find("td:eq(0) input:eq(0)").is(":checked")){
					chk++;
				}						
			});
			var chknum =  parseInt( $("#tableList").find("tr:gt(0)").length);//选项总个数 
			if (chknum == chk) {//全选 
				$('#selectAll').prop("checked", true);
			} else {//不全选 
				$('#selectAll').prop("checked", false);
			}
		}
		//全选
		function selectcom_all(){
			var trbody = "tableList";
		    var check = "selectAll";
		    if(!regComment){
		    	$('#selectAll').prop("checked", false);
		    	var option ={title:"提示",btn:parseInt("0001",2)};
				window.wxc.xcConfirm("以下存在两个不同公司的任务单！请先选择一个任务单！！！",window.wxc.xcConfirm.typeEnum.custom,option);
			}else{
		    saveComfileID(0,"",$("#"+check)[0].checked);//存储选中的id值
		    if(params_subc.length==0){
				send_company = 0;
				searchComFiles();//加载数据
			}
			if($("#"+check)[0].checked){    
	            $("#"+trbody).find("tr:gt(0)").each(function(){
					$(this).find("td:eq(0)").children().prop("checked", true); 
				});   
	        }else{    
	            $("#"+trbody).find("tr:gt(0)").each(function(){
					$(this).find("td:eq(0)").children().prop("checked", false); 
				});
	        }
			}
		}
		
		   /**
		   * 存储选中的id值
		   * @param {} sub_id
		   * @param {} che
		   */
		  function saveComfileID(ind,task_id,che){ 
		  	switch(parseInt(ind)){
		  	case 1://单选时执行
		  	    if(che==true){//判断是否选中
		  	    params_subc.push(parseInt(task_id));//存入值	
		  	    params_subc = uniquet(params_subc);  	  	
		  	    }else{
		        for (var x in params_subc) {
		            if(params_subc[x]==task_id){//判断是否存在该值，存在则数组中删除
		         	params_subc.splice(x,1);//删除x位置的一个元素
		         }
		        }
		  	}
		  	break;
		  	case 0:		  	  				  			
	  			 if(che==true){//判断是否选中 	
	  				$("#tableList").find("tr:gt(0)").each(function(){
	  					var task_id = $(this).find("td:eq(0) input").val();
		  				params_subc.push(task_id);//存入值	
					}); 
	  				params_subc = uniquet(params_subc);  				
	  			 }else{
	  				$("#tableList").find("tr:gt(0)").each(function(){
	  					var task_id = $(this).find("td:eq(0) input").val();
	  					for (var x in params_subc) {
	  			            if(params_subc[x]==task_id){//判断是否存在该值，存在则数组中删除
	  			         	params_subc.splice(x,1);//删除x位置的一个元素
	  			         }
	  			        }
					});
	  					 		
	  			 }	
	  	      break;
		  	}
		  }		  						 
		 
		 /**
		  * 保存
		  * @author chenlong
		  * @date 2016-8-9
		  */
		 function saveComWithAccess(){
		 	   var lengthdd = params_subc.length;	
		 	   if(lengthdd >0 ){
			 	   var arr = params_subc.join(",").toString();			 	
			 	   var url ="taskDeliverGood/addTaskDeliverGoods.do"; 	  
			 	   var param = {arr:arr,deliver_type:options.type};//var param ={};		
			 	   if(options.deliver_number !="" && options.deliver_number != null){
			 		 param.deliver_number = options.deliver_number;
			 		}
			   	   var fn = function(result){			   
			   		   if(result.data.flag){
			   			if(result.data.list == null || result.data.list ==''){
			   				var option ={title:"提示",btn:parseInt("0001",2)};
							window.wxc.xcConfirm("添加的任务单失败！", window.wxc.xcConfirm.typeEnum.custom,option);
			   			}else{
			   				options.addEvent(result.data,options.addAddressObj,options.type);
			   				options.onSomeCloseEvent(options.DivBodyTan);
			   			}
					   }else{
						   var option ={title:"提示",btn:parseInt("0001",2)};
						   window.wxc.xcConfirm("添加的任务单存在不同的公司！！无法操作", window.wxc.xcConfirm.typeEnum.custom,option);
					   }  
			   		   };				  
			   	   asyncAjaxMethod(url,param,true,fn);
				}else{
				   var option ={title:"提示",btn:parseInt("0001",2)};
				   window.wxc.xcConfirm("没有选择任务单！！", window.wxc.xcConfirm.typeEnum.custom,option);	
				}
				}
		/**
		 * 关闭窗口
		 */
		function close(){
			options.onSomeCloseEvent(options.DivBodyTan);
			$("#" + popId).remove();
			$(window).unbind("keydown");
		}
		//重生popId,防止id重复
		function creatPopId(){
			var i = "pop_" + (new Date()).getTime()+parseInt(Math.random()*100000);//弹窗索引
			if($("#" + i).length > 0){
				return creatPopId();
			}else{
				return i;
			}
		}
	};		
}(jQuery,window,document));