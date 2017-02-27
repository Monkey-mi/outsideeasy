
/*
 * 状态值
 */
var state = "";


/**
 * 对交互信息的统计
 *//*
function taskCount(){
	var arr_count = $("#deliveredList").find("tr:last").find("td:eq(2)").html().lastIndexOf(":");
	var true_count =$("#deliveredList").find("tr:last").find("td:eq(2)").html();
	var temp = true_count.substr(parseInt(arr_count)+1);
	var url = "taskqc/getTotalQty.do";
	var params = {};
	params.t_id = taskid;
	params.deliver_count = temp;
	var fn = function(result){
		$("#count_task").empty();
		var taskcount = result.data;
		var span_v = "";
		if(parseInt(taskcount.unfinished_count)<0){
			span_v = 
			'实际到货总数量  <span >'+temp+'</span> 件 ，质检不合格品 <span style="color:#e60606">'+((taskcount.arrived_qccount==null)?0:taskcount.arrived_qccount)+'</span> 件，超任务完成 <span style="color:#8ec165">'+((taskcount.unfinished_count==null)?0:(-taskcount.unfinished_count))+'</span> 件.';
		}else{
		    span_v = 
			'实际到货总数量  <span >'+temp+'</span> 件 ，质检不合格品 <span style="color:#e60606">'+((taskcount.arrived_qccount==null)?0:taskcount.arrived_qccount)+'</span> 件，距离任务完成 <span style="color:#8ec165">'+((taskcount.unfinished_count==null)?0:taskcount.unfinished_count)+'</span> 件.';
		}
		$("#count_task").append(span_v);
	};
	asyncAjaxMethod(url,params,true,fn);
}*/
/**
 * 加载物流清单信息
 *//*
function deliveredInfo(state){
	var url = "logisticsItem/getlogisticsItemList.do";
	var params = {};
	params.t_id = taskid;
	var fn = function(result){
	
		$("#deliveredList tr:gt(0)").empty();
		var logisticsItemCount = result.data.logisticsCount;
		var bottom_total = '<tr style="border:1px solid #facd87;background-color:#fbebc9;">'
			+'<td colspan="2">总计</td>'
			+'<td>对方发货总数:'+((logisticsItemCount.deliver_count==null)?0:logisticsItemCount.deliver_count)+'</td>'
			+'<td>实际到货总数:'+((logisticsItemCount.arrived_count==null)?0:logisticsItemCount.arrived_count)+'</td>'
			+'<td>实际交货总数:'+((logisticsItemCount.receive_count==null)?0:logisticsItemCount.receive_count)+'</td>'
			+'<td></td>'
		+'</tr>';
		var logisticsItemlist = result.data.logisticsItemVo;
		var length = logisticsItemlist.length;
		var logisticsItem ="";
		if(length>0){
		for(var i=0;i<length; i++){
			logistics = logisticsItemlist[i];
			if(logistics.qc_state==1){
			logisticsItem = logisticsItem+
			'<tr>'+
			'<td>'+((logistics.receive_time==null)?"":logistics.receive_time)+'</td>'+
			'<td>'+((logistics.send_id==null)?"":logistics.send_id)+'</td>'+
			'<td>'+((logistics.deliver_no==null)?0:logistics.deliver_no)+'</td>'+
			'<td>'+((logistics.arrived_no==null)?0:logistics.arrived_no)+'</td>'+
			'<td>'+((logistics.receive_no==null)?0:logistics.receive_no)+'</td>'+
			'<td>已质检</td>'+
		'</tr>';
			}
			if(logistics.qc_state==0){
				var  qcButton="";
				if(state ==15||state ==20){
					 qcButton = '<td><a class="bluecolor" onClick="qualityCheckItem(this,'+logistics.item_id+')">质检录入</a></td>'+
						'<td class="receive_state">已质检</td>';
				}else if(state==30 || state==25){
					qcButton = 
					'<td><button class="oprate_button" style="background:#696969" title="无法进行质检录入">质检录入</button></td>';
				}				
				logisticsItem = logisticsItem+
				'<tr>'+
				'<td>'+((logistics.receive_time==null)?"":logistics.receive_time)+'</td>'+
				'<td>'+((logistics.send_id==null)?"":logistics.send_id)+'</td>'+
				'<td>'+((logistics.deliver_no==null)?0:logistics.deliver_no)+'</td>'+
				'<td>'+((logistics.arrived_no==null)?0:logistics.arrived_no)+'</td>'+
				'<td>'+((logistics.receive_no==null)?0:logistics.receive_no)+'</td>'+
				qcButton+
			'</tr>';
			}
		}
		$("#deliveredList").append(logisticsItem);
		$("#deliveredList").append(bottom_total);
	//	taskCount();
		}else{
			$("#deliveredList").append('<tr><td  style="">暂时没有交货信息</td></tr>');
		}	
	};
	asyncAjaxMethod(url,params,true,fn);
	
}*/
/**
 * 点击显示质检框
 */

var ob="";
function qualityCheckItem(obj,item_id){
	var url1 ="logisticsItem/getQcState.do";
	var params1 ={};
	params1.item_id = item_id;
	var fn1 = function(result){
		if(result.message=="不存在该物流"){
			xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
			$(obj).parent().parent().remove();
			closeBytimeCount(2);
		}else if(result.message=="已质检过了"){
			xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
			 $(obj).parent().css("display","none");
			 $(obj).parent().next().css("display","block");
			closeBytimeCount(2);
		}else if(result.message=="成功"){
			item = item_id;
			ob =obj;
			var url="taskqc/getCountforFile.do";
			var params ={};
			params.record_id = item;
			params.t_id = taskid;
			var fn = function(result){
				var co =result.data;
				if(co!=null&&co!=""){
				
					$("#qc_file_name").hide();
					$("#qc_file_bu").text("文件已上传过");
					$("#qc_file_table").hide();
					$("#file_no").val(1);
					$("#file_bus").hide();
				}else{
					$("#qc_file_name").show();
					$("#qc_file_bu").text("上传文件");
					$("#qc_file_table").show();
				}	
			};
			asyncAjaxMethod(url,params,true,fn);
			$(".mask").fadeIn("fast");
			$("#edit_quality_checks").fadeIn("fast");
			// $("#qc_num").val(0);
			 $("#unqualified_no").val(0);
			 $("#qc_remark").val("");
			 $("#qc_file_name").val("");
			$("#qc_no option:gt(0)").empty();
			var send = $(obj).parent().parent().find("td:eq(1)").html();
			$("#qc_no").find("option:eq(0)").val(item_id);
			$("#qc_no").find("option:eq(0)").text(send);
			$("#qc_count").val($(obj).parent().prev().prev().html());
			var create_dt=new Date().Format("yyyy-MM-dd HH:mm:ss");
			document.getElementById("qc_time").innerText=create_dt;
		}
	};
	asyncAjaxMethod(url1,params1,true,fn1);		
}
//质检上传附件选择文件改变事件
function upload_qc_file(obj)
{
	var fileStartIndex=$(obj).val().lastIndexOf('/');
	var fileEndIndex=$(obj).val().lastIndexOf('.');
	var filename=$(obj).val().substring(fileStartIndex,fileEndIndex);
	var item = $("#qc_no").val();
	if (item !=0){
	 if(filename){
	   	   $.ajaxFileUpload({
		        url: getwebroot()+'taskqc/addTaskQcFile.do', //用于文件上传的服务器端请求地址
		        data: {"t_id":taskid,"record_id":item},  //任务id参数		  
		        fileElementId: "qc_file_table",//input type=file 的id
		        dataType: 'json',//返回值类型 一般设置为json
		        success: function (data, status){
		        	if (data.success==true ) { 
		        	window.wxc.xcConfirm(data.message);
		        	$("#qc_file_name").val(filename);
		        	$("#file_no").val(1);
		        	}else{	
		        	var option ={title:"提示",btn:parseInt("0001",2)};
		            window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);}
		        	}, //服务器成功响应处理函数
		        error: function (data, status, e)//服务器响应失败处理函数
		        {
		        	var option ={title:"提示",btn:parseInt("0001",2)};
		        	 window.wxc.xcConfirm('解析失败', window.wxc.xcConfirm.typeEnum.custom,option);
		        	}
		        });
	   	   }
	}else{
		window.wxc.xcConfirm("请选择批次号");
	}
}
/**
 * 验证字段值
 * @param id
 * @param value
 * @returns {String}
 */
function information(id,value){
	var number_reg=/^(0|[1-9][0-9]*)$/;
	var error_str ="";
	if(id=="qc_count_ed")		
	{	
		if(value=="")
		{
			error_str="请输入质检数量";
		}
		else
		{
			if(!number_reg.test(value))
			{
				error_str="请输入正确的格式";
			}
			else if(parseInt($("#qc_num_ed").val())<value)
			{		
				error_str="质检数量大于原始数量";
			}
		}
	}
	else if(id=="unqualified_no_ed")
	{
		if(value=="")
		{
			error_str="请输入不合格品数量";
		}
		else
		{
			if(!number_reg.test(value))
			{
				error_str="请输入正确的格式";
			}
			else if(parseInt($("#qc_count_ed").val())<value)
			{
				error_str="不合格量大于质检数量";
			}
		}
	}else if(id=="qc_remark_ed")
	{
		if(value.length>200)
		{			
			error_str="质检信息字符长度过长最长为200个字符";
		}	
	}else if(id=="qc_countAll")
	{
		if(value=="")
		{
			error_str="请输入质检数量";
		}
		else
		{
			if(!number_reg.test(value))
			{
				error_str="请输入正确的格式";
			}
			else if(parseInt($("#qc_numAllvo").val())<value)
			{					
				error_str="质检数量大于到货数";
			}
		}
	}
	else if(id=="unqualified_noAll")
	{
		if(value=="")
		{
			error_str="请输入不合格品数量";
		}
		else
		{
			if(!number_reg.test(value))
			{
				error_str="请输入正确的格式";
			}
			else if(parseInt($("#qc_countAll").val())<value)
			{
				error_str="不合格量大于质检数量";
			}
		}
	}else if(id=="qc_remarkAll")
	{
		if(value.length>200)
		{
			error_str="质检信息字符长度过长最长为200个字符";
		}	
	}else if(id=="qc_count")
	{
		if(value=="")
		{
			error_str="请输入质检数量";
		}
		else
		{
			if(!number_reg.test(value))
			{
				error_str="请输入正确的格式";
			}
			else if(parseInt($(ob).parent().prev().prev().html())<value)
			{
				error_str="质检数量大于到货数";
			}
		}
	}
	else if(id=="unqualified_no")
	{
		if(value=="")
		{
			error_str="请输入不合格品数量";
		}
		else
		{
			if(!number_reg.test(value))
			{
				error_str="请输入正确的格式";
			}
			else if(parseInt($("#qc_count").val())<value)
			{
				error_str="不合格量大于质检数量";
			}
		}
	}else if(id=="qc_remark")
	{
		if(value.length>200)
		{
			error_str="质检信息字符长度过长最长为200个字符";
		}	
	}	 
	  return error_str;
}
/**
 * 控制验证的判断
 * @param inp
 * @param params
 * @returns {String}
 */
function informationvo(inp,params){
	var id="";
	var error_str ="";
	var value ="";
	if(inp!=""){
    id=$(inp).attr("id");  
	value=$(inp).val();
	error_str = information(id,value);	
	}
	else if(params!=""){
		var i=0;
		for(var key in params){
			if(params.hasOwnProperty(key)){
				id=key;
				i++;
				value =params[key];
				error_str =information(id,value);
				if(error_str != ""){										
						$("#"+key).nextAll(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
						$("#"+key).nextAll(".info_explain_wrap").fadeIn("fast");
						break;					
				}			
			}
		}			
	}
   return error_str;
}

/**
 * 确认物流信息的质检，添加质检信息
 */
function  Qc_logisticsItem(){				
	if($("#qc_no").val() != 0){
	var url="taskqc/addTaskQc.do";
	var params ={};
	var send = $("#qc_no").find("option:selected").text();
	params.send_id = send;
	params.qc_time = $("#qc_time").text();
	params.record_id = $("#qc_no").val();
	params.t_id = taskid;
	params.qc_count =  $("#qc_count").val();
	params.unqualified_no = $("#unqualified_no").val();
	params.qc_remark = $("#qc_remark").val();
	var error_str = informationvo("",params); //进行验证
    if(error_str==""){
	var true_qc = $("#qc_count").val()-$("#unqualified_no").val();
	var StartIndex = $("#deliveredList").find("tr:last td:eq(3)").html().lastIndexOf(":");
	var true_count = $("#deliveredList").find("tr:last td:eq(3)").html();
	var temp = true_count.substr(parseInt(StartIndex)+1);
	var count =parseInt(temp)+parseInt(true_qc);
	fn = function(result){
		if(result.message=="不存在该物流"){
			$(".mask").fadeOut("fast");
			$("#edit_quality_checks").fadeOut("fast");	
			xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
			$(ob).parent().parent().remove();
			closeBytimeCount(2);	
			 taskCount();
		}else if(result.message=="已质检过了"){
			$(".mask").fadeOut("fast");
			$("#edit_quality_checks").fadeOut("fast");	
			xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);	
			 $(ob).parent().css("display","none");
			 $(ob).parent().next().css("display","block");
			 closeBytimeCount(2);			
			 taskCount();
		}else if(result.message=="成功"){
		$(".mask").fadeOut("fast");
		$("#edit_quality_checks").fadeOut("fast");		
		 $(ob).parent().css("display","none");
		 $(ob).parent().next().css("display","block");
		 $(ob).parent().prev().html(true_qc);
		 $("#deliveredList").find("tr:last td:eq(3)").html("实际交货总数:"+count);
		 taskCount();
		}
	};
	asyncAjaxMethod(url,params,true,fn);
     }else{
    	
     }
		}else{
			window.wxc.xcConfirm("请选择批次号");
		}
		
}
////Tab控制函数
//function tabs(tabId, tabNum){
//	if(tabNum == 1){
//		$("#quality_check_btn").css("display","block");
//		
//	}else{
//		$("#quality_check_btn").css("display","none");
//	}
//	//设置点击后的切换样式
//	$(tabId + " .tab li").removeClass("curr");
//	$(tabId + " .tab li").eq(tabNum).addClass("curr");
//	//根据参数决定显示内容
//	$(tabId + " .tabcon").hide();
//	$(tabId + " .tabcon").eq(tabNum).show();
//	switch(tabNum){
//	case 0:		
//		deliveredInfo(state);
//		break;
//	case 1:
//		qc_list();
//		break;
//	}
//}
/**
 * 显示质检信息
 */
function qc_list(){
	var url ="taskqc/getTaskQcList.do";
	var params ={};
	params.t_id = taskid;
	var fn = function(result){
		$("#qualityList tr:gt(0)").empty();
		var qclists = result.data;		
		var qc_count ="";
		var qc_countlist =qclists.qcCountVo;
		qc_count ='<tr style="border:1px solid #facd87;background-color:#fbebc9;">'
			+'<td colspan="2">总计</td>'
			+'<td>质检总数:'+((qc_countlist.deliver_qccount==null)?0:qc_countlist.deliver_qccount)+'</td>'
			+'<td>不合格数:'+((qc_countlist.arrived_qccount==null)?0:qc_countlist.arrived_qccount)+'</td>'
			+'<td>合格数:'+((qc_countlist.receive_qccount==null)?0:qc_countlist.receive_qccount)+'</td>'
			+'<td></td>'
		+'</tr>';
		var qclist = qclists.qcVos;
		var length = qclist.length;
		var qc_li ="";
		if(length>0){
			for(var i=0;i<length;i++){
			var qc = qclist[i];
			if(qc.send_id==null||qc.send_id==""){
				var qc_li = qc_li+'';
			}else{
				var editeButton ="";
				if((state ==15||state ==20)&&qc_type==1){
				 editeButton = '<a href="javascript:void(0)" class="mr10" onClick="edite_qc_info(this,'+qc.qc_id+')"><img src="/newresources/images/edit2.png" />编辑</a>'+
				'<a href="javascript:void(0)" onClick="del_qc_row(this,'+qc.qc_id+','+qc.record_id+')" ><img src="/newresources/images/del2.png" />删除</a>';
				}
				if(qc.qc_file==null||qc.qc_file==""){
					 qc_li = qc_li+
						'<tr>'+
						'<td>'+((qc.qc_time==null)?"":qc.qc_time)+'</td>'+
						'<td>'+((qc.send_id==null)?"":qc.send_id)+'</td>'+
						'<td>'+((qc.qc_count==null)?0:qc.qc_count)+'</td>'+
						'<td>'+((qc.unqualified_no==null)?0:qc.unqualified_no)+'</td>'+
						'<td>'+((qc.qc_true==null)?0:qc.qc_true)+'</td>'+
						'<td>'+	
						    '<a style="display:none">'+qc.arrived_no+'</a>'+
							'<a href="javascript:void(0)"  class="mr10" onClick="view_qc_info('+qc.qc_id+')"><img src="/newresources/images/view.png" />详情</a>'+
							editeButton+
						'</td>'+
					'</tr>';
				}else{
					 qc_li = qc_li+
						'<tr>'+
						'<td>'+((qc.qc_time==null)?"":qc.qc_time)+'</td>'+
						'<td>'+((qc.send_id==null)?"":qc.send_id)+'</td>'+
						'<td>'+((qc.qc_count==null)?0:qc.qc_count)+'</td>'+
						'<td>'+((qc.unqualified_no==null)?0:qc.unqualified_no)+'</td>'+
						'<td>'+((qc.qc_true==null)?0:qc.qc_true)+'</td>'+
						'<input style="display:none" value="'+qc.arrived_no+'"/>'+
						'<td>'+
						    '<a style="display:none">'+qc.arrived_no+'</a>'+
							'<a href="javascript:void(0)" class="mr10" onClick="LoadQcFileinfo('+qc.qc_id+')"><img src="/newresources/images/file.png" />附件</a>'+
							'<a href="javascript:void(0)"  class="mr10" onClick="view_qc_info('+qc.qc_id+')"><img src="/newresources/images/view.png" />详情</a>'+
							editeButton+
						'</td>'+
					'</tr>';
				}			
			}
			}
			$("#qualityList").append(qc_li);
			$("#qualityList").append(qc_count);
		}else{
			$("#qualityList").append('<tr><td  style="">暂时没有质检信息</td></tr>');
		}
		
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 删除质检信息
 * @param obj
 */
function del_qc_row(obj,qc_id,record_id)
{
	window.wxc.xcConfirm("您确认要删除该质检信息吗？", window.wxc.xcConfirm.typeEnum.confirm,
			{	
			onOk:function(){
				var url ="taskqc/deleteTaskQc.do";
				var params ={};
				params.qc_id = qc_id;
				params.record_id = record_id;
				var fn = function(result){
				$(obj).parent().parent().remove();				
				qc_list();
				taskCount();
				};
				 asyncAjaxMethod(url,params,true,fn);
					},
			onCancel:function(){
			
				}
			});	
}
/**
 * 查询单个质检信息
 * @param qc_id
 */
function view_qc_info(qc_id)
{
	var url ="taskqc/getTaskQc.do";
	var params ={};
	params.qc_id = qc_id;
	var fn = function(result){
		var qc = result.data;
		var qc_l = qc.qc_count - qc.unqualified_no;
		$("#label_time").html((qc.qc_time==null)?"":qc.qc_time);
		$("#label_send").html((qc.send_id==null)?"":qc.send_id);
		$("#label_qcno").html((qc.qc_count==null)?"":qc.qc_count);
		$("#label_qcfalse").html((qc.unqualified_no==null)?"":qc.unqualified_no);
		$("#qc_remark_view").html((qc.qc_remark==null)?"":qc.qc_remark);	
	};
	asyncAjaxMethod(url,params,true,fn);
	$(".mask").fadeIn("fast");
	$("#view_quality_checks").fadeIn("fast");
	
}
/**
 * 编辑查询单个质检信息
 * @param qc_id
 */
var qc_ob="";
function edite_qc_info(obj,qc_id)
{
	var url ="taskqc/getTaskQc.do";
	var params ={};
	params.qc_id = qc_id;
	var fn = function(result){
		var qc = result.data;
		$("#qc_time_ed").html((qc.qc_time==null)?"":qc.qc_time);
		$("#label_send_ed").html((qc.send_id==null)?"":qc.send_id);
		$("#qc_count_ed").val((qc.qc_count==null)?"":qc.qc_count);
		$("#unqualified_no_ed").val((qc.unqualified_no==null)?"":qc.unqualified_no);
		$("#qc_remark_ed").val((qc.qc_remark==null)?"":qc.qc_remark);
		if(qc.qc_file != null&&qc.qc_file != ""){
			$("#qc_file_name_ed").hide();
			$("#qc_file_bu_ed").text("重新上传文件");
		
		}else{
			$("#qc_file_name_ed").show();
			$("#qc_file_bu_ed").text("上传文件");
		
		}	
		$("#record_id_ed").val(qc.record_id);
		$("#qc_id_ed").val(qc.qc_id);
		$("#qc_num_ed").val($(obj).parent().find("a:eq(0)").html());
		qc_ob = obj;
	};
	asyncAjaxMethod(url,params,true,fn);
	$(".mask").fadeIn("fast");
	$("#edit_quality_checks_ed").fadeIn("fast");
	
}
/**
 *更新质检信息
 */
function editer_qc_info(obj){
	var url ="taskqc/updateinfo.do";
	var params ={};
	
	var regos={};//用于验证的集合
	 params.qc_count = $("#qc_count_ed").val();
	 params.unqualified_no =$("#unqualified_no_ed").val();
	 params.qc_remark =$("#qc_remark_ed").val();
	 params.qc_id =$("#qc_id_ed").val();
	 regos.qc_count_ed =  params.qc_count;
	 regos.unqualified_no_ed = params.unqualified_no;
	 regos.qc_remark_ed = params.qc_remark;
	 var error_str = informationvo("",regos); //进行验证
	 if(error_str==""){
	 var fn = function(){	
		qc_list();
		taskCount();
	 };
	 asyncAjaxMethod(url,params,true,fn);
	 $(".mask").fadeOut("fast");
	 $("#edit_quality_checks_ed").fadeOut("fast");
	    }else{	    	
	    }
}
/**
 * 重新上传文件
 * @param obj
 */
function upload_qc_file_ed(obj){
	var items = $("#record_id_ed").val();
	var c = $(qc_ob).parent().find("a").length;
	var filename = $(obj).val();	
	 if(filename){
	   	   $.ajaxFileUpload({
		        url: getwebroot()+'taskqc/addTaskQcFile.do', //用于文件上传的服务器端请求地址
		        data: {"t_id":taskid,"record_id":items},  //任务id参数		  
		        fileElementId: "qc_file_table_ed",//input type=file 的id
		        dataType: 'json',//返回值类型 一般设置为json
		        success: function (data, status){
		        	if (data.success==true ) { 
		        	window.wxc.xcConfirm("文件:"+data.message);
		        	$("#qc_file_bu_ed").text("重新上传文件");
		        	$("#qc_file_name_ed").val(filename);
		        	if(c ==4 ){		     
		        		var v = '<a href="javascript:void(0)" class="mr10" onClick="LoadQcFileinfo('+data.qc_id+')"><img src="/newresources/images/file.png" />附件</a>';
		        		$(qc_ob).parent().find("a:first").before(v);
		        	}
		        	}else{
		        		var option ={title:"提示",btn:parseInt("0001",2)};
		            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);}
		        	}, //服务器成功响应处理函数
		        error: function (data, status, e)//服务器响应失败处理函数
		        {
		        	var option ={title:"提示",btn:parseInt("0001",2)};
		        	 window.wxc.xcConfirm('解析失败', window.wxc.xcConfirm.typeEnum.custom,option);
		        	}
		        });
	   	   }
}
/**
 * 下载质检文件
 */
function LoadQcFileinfo(qc_id){
	var params ={};
	params.qc_id = qc_id;
	var url = "taskqc/selectFileinfo.do";
	var fn= function(result){
		var filename = result.data;
		if(filename!=null){
			window.open(getwebroot()+'taskFile/downLoadFileFormMongoForProducer.do?file='+filename, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');	
		}else{
			window.wxc.xcConfirm("该质检信息未上传质检文件.联系管理员");
		}	
	};
	asyncAjaxMethod(url,params,true,fn); 
		
}
/**
 * 点击质检按钮可以质检所有未质检的物流清单
 */
function qualityCheckItemAll(){
	 $("#qc_countAll").val(0);
	 $("#unqualified_noAll").val(0);
	 $("#qc_remarkAll").val("");
	 $("#qc_file_nameAll").val("");
	var url="logisticsItem/getLogisticsItemforState.do";
	var params ={};
	params.t_id = taskid;
	var fn = function(result){
		var Itemlist =result.data;
		var length = Itemlist.length;
		var str ="";
		for(var i=0;i<length;i++){
			str = str+'<option value="'+ Itemlist[i].item_id+'" >'+ Itemlist[i].send_id+'</option>';
		} 
		$("#qc_noAll option:gt(0)").remove();
		$("#qc_noAll").append(str);
	
	};
	asyncAjaxMethod(url,params,true,fn);
	$(".mask").fadeIn("fast");
	$("#edit_quality_checksAll").fadeIn("fast");
	
	var create_dt=new Date().Format("yyyy-MM-dd HH:mm:ss");
	document.getElementById("qc_timeAll").innerText=create_dt;
	
}
/**
 * 上传质检文件
 * @param obj
 */
function upload_qc_fileAll(obj){
	var fileStartIndex=$(obj).val().lastIndexOf('/');
	var fileEndIndex=$(obj).val().lastIndexOf('.');
	var filename=$(obj).val().substring(fileStartIndex,fileEndIndex);
	var item = $("#qc_noAll").val();
	if (item !=0){
	 if(filename){
	   	   $.ajaxFileUpload({
		        url: getwebroot()+'taskqc/addTaskQcFile.do', //用于文件上传的服务器端请求地址
		        data: {"t_id":taskid,"record_id":item},  //任务id参数		  
		        fileElementId: "qc_file_tableAll",//input type=file 的id
		        dataType: 'json',//返回值类型 一般设置为json
		        success: function (data, status){
		        	if (data.success==true ) { 
		        	window.wxc.xcConfirm(data.message);
		        	$("#qc_file_nameAll").val(filename);
		        	}else{
		        		var option ={title:"提示",btn:parseInt("0001",2)};
		            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);}
		        	    $("#file_noAll").val(1);
		        	}, //服务器成功响应处理函数
		        error: function (data, status, e)//服务器响应失败处理函数
		        {
		        	var option ={title:"提示",btn:parseInt("0001",2)};
		        	 window.wxc.xcConfirm('解析失败', window.wxc.xcConfirm.typeEnum.custom,option);
		        	}
		        });
	   	   }
	}else{
		window.wxc.xcConfirm("请选择批次号");
	}
	
}
/**
 * 提交质检信息
 */
function Qc_logisticsItemAll(){		
		
		if($("#qc_noAll").val() != 0){
	var url="taskqc/addTaskQc.do";
	var params ={};
	var regos={};//用于验证的集合
	var send = $("#qc_noAll").find("option:selected").text();
	params.send_id = send;
	params.qc_time = $("#qc_timeAll").text();
	params.record_id = $("#qc_noAll").val();
	params.t_id = taskid;
	params.qc_count =  $("#qc_countAll").val();
	params.unqualified_no = $("#unqualified_noAll").val();
	params.qc_remark = $("#qc_remarkAll").val();
	regos.qc_countAll =  params.qc_count;
	regos.unqualified_noAll = params.unqualified_no;
	regos.qc_remarkAll = params.qc_remark;
	var error_str = informationvo("",regos); //进行验证
    if(error_str==""){
	var fn = function(result){
		if(result.message=="不存在该物流"){
			xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);			
			closeBytimeCount(2);
			$(".mask").fadeOut("fast");
			$("#edit_quality_checksAll").fadeOut("fast");
			 taskCount();
			 qc_list();
		}else if(result.message=="已质检过了"){
			xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);			 
			closeBytimeCount(2);
			$(".mask").fadeOut("fast");
			$("#edit_quality_checksAll").fadeOut("fast");
			 qc_list();
			 taskCount();
		}else if(result.message=="成功"){
		  $(".mask").fadeOut("fast");
		  $("#edit_quality_checksAll").fadeOut("fast");
		  window.wxc.xcConfirm("质检该信息成功");	
		  qc_list();
		  taskCount();
		}
	};
	asyncAjaxMethod(url,params,true,fn);
    }else{
    	
    }
		}else{
			window.wxc.xcConfirm("请选择批次号");
		}	
}

var pageSize = 10;//每页个数	
var currentPage=0;//当前页码
var companyId = getParamFromWindowName("companyIdForAll");//公司ID

var status_s = 0;//切换的状态位
var date_type = 0;//日期类型
var start_date = "";//到货日期
var end_date = "";//到货日期
var shipping_num = "";//发货单号
var shippingType = 2;//发货类型
/**
* 取到所有参数的值
* orgizaParam
* @return void
* @author chenlong
* 2016-12-19
 */
function orgizaParam(){	
	end_date = $("#end_time").val();//到货日期
	start_date = $("#start_time").val();//到货日期
	shipping_num = $.trim($("#shipping_num").val());//发货单号		
	status_s = $("#status_s").find("span").html();//切换的状态位
	switch(status_s){
	   case '全部状态':
		   status_s = 0;
	   break;
	   case '待收货':
		   status_s = 5;
		   break;
	   case '已收货':
		   status_s = 10;
		   break;
	   case '已取消':
		   status_s = 15;
		   break;
	}
	date_type = $("#date_type").find("span").html();//发货日期类型
	switch(date_type){	
	   case '发货日期':		   
		   date_type = 0;
	       break;
	   case '收货日期':
		   date_type = 1;
		   break;
	}
	shippingType = $("#shippingType").find("span").html();
	
	switch(shippingType){
	   case '全部类型':
		   shippingType = 2;
	       break;
	   case '发货单':
		   shippingType = 0;
		   break;
	   case '返修品清单':
		   shippingType = 1;
		   break;
	}
}
/**
 * 初始化所有的条件
* initParams
* @return void
* @author chenlong
* 2016-12-20
 */
function initParams(){
	$("#end_time").val("");
	$("#start_time").val("");
	$("#shipping_num").val("");
}

/**
 * 查询订单列表
* getOrderDetails
* @return void
* @author chenlong
* 2016-8-18
 */
function getShippingDetails(nums){
	currentPage = 0;
	orgizaParam();
	var url = "taskDeliverGood/getTaskDeliverGoodsforOneTask.do";
	var params={};	
	InitDatas_Shipping(currentPage,true,url,params);		
}

/**
分页获取数据
pageIndex：当前页索引
needinit：是否为第一次加载
*/
function InitDatas_Shipping(pageIndex,needinit,url,param)
{
currentPage=pageIndex;
var url=url;
var params={};
params.t_id = taskid;
params.state = status_s;
params.shippingType = shippingType;
/*
 * 其他的参数设置
 */
if(end_date != ""){
 params.end_date = end_date;
}
if(start_date != ""){
 params.start_date = start_date;
}
if(shipping_num != ""){
 params.shipping_num = shipping_num ;
}
 params.shippingType = shippingType ;
 params.date_type = date_type ;
 

params.usePaging=true;
params.page=pageIndex;
params.limit=pageSize;
params.start=parseInt(pageIndex)*pageSize;
var fn=function(result){
	if(pageIndex==0 && needinit){
			//第一次加载时加载分页控件
		initPaginationsOrder(result.total);
	}
		//显示数据到表格
	    addItemShipping(result.data);
	};
	console.log(params);
asyncAjaxMethod(url,params,true,fn);	
}
/**供应商信息的翻页调用  
*/
function pageselectCallbacks(index,jq)
{
	orgizaParam();
	var url = "taskDeliverGood/getTaskDeliverGoodsforOneTask.do";		
	var params={};
    InitDatas_Shipping(index,false,url,params);
}
/**初始化分页控件
*/
function initPaginationsOrder(totalCount){
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
* addItemsOrder
* @param result
* @return void
* @author chenlong
* 2016-8-18
 */
function addItemShipping(result){
	if(result.list.length==0)
	{	
		$(".arriveList tr:eq(0)").nextAll().remove();
		$(".arriveList tr:eq(0)").after("暂无发货信息！");
	}else{
		$(".arriveList tr:eq(0)").nextAll().remove();
		var evalText=doT.template($("#shippingImlinfo").text());
		$(".arriveList tr:eq(0)").after(evalText(result));
		showDeliveryInfo();
	}
}










/**显示select框
 * showSelect
 * @param e void
 * @author wangjialin
 * 2016-11-16 下午4:24:44
 */
function showSelect(e){
	$(e).next().width($(e).width());
	$(e).next().show();
	$(".mask_opacity").show();
	$(".mask_opacity").click(function(){
		$(e).next().hide();
		$(".mask_opacity").hide();
	});
	$(e).next().find("li").click(function(){
		var txt=$(this).text();
		$(this).parent().prev().html('<span>'+txt+'</span><img src="/newresources/images/switchover.png" class="f_r mr4 mt4">');
		$(this).parent().hide();
		$(".mask_opacity").hide();
	});
}
/**展示物流信息
 * showDeliveryInfo void
 * @author wangjialin
 * 2016-11-16 下午4:41:32
 */
function showDeliveryInfo(){
	$(".down").mouseover(function(){
		$(this).prop("src","/newresources/images/tasks/downHover.png");
		var obj=$(this).next();
		var length=obj.width()/2;
		obj.css("left",-length);
		obj.show();
	});
	$(".down").mouseleave(function(){
		$(this).prop("src","/newresources/images/tasks/down.png");
		$(this).parent().find(".deliveyInfo").hide();
	});
}

/**展示发货单详情
 * showReceiptInfo
 * @param obj void
 * @author wangjialin
 * 2017-1-4 下午5:02:33
 */
function showReceiptInfo(obj){
	$("#pop_mask").fadeIn("fast");
	var deliverNumber=$(obj).text();
	var param ={"deliver_number":deliverNumber,"task_id":taskid};
	addParamsToWindowName(param);
	$("#invoiceInfoCon").load(getwebroot()+"usercenter/sendOutManage/invoiceInfo.jsp",null,function(responseTxt,statusTxt,xhr){
		$(".midd_left_wrap").remove();
		$(".invoiceTop,.invoiceBottom").remove();
		$("#invoiceMiddWrap").css("width","864px");
	});	
	$("#showInvoiceInfo").fadeIn("fast");
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