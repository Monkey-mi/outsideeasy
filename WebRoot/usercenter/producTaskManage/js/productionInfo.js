var taskid = getParamFromWindowName("task_id");
var state="";
//计时器，用于提示框弹出两秒后自动关闭效果
var time_c=0;
//用于提示框弹出两秒后自动关闭的弹出框对象
var xcconfirm;
$(function(){
	var task;
	var url="externalTask/getProductTaskByID.do";
	var params={};
	params.t_id=taskid;
		var fn=function(result){
			task=result.data;
			state =task.state;
			productButton(task.state);//是否加载按钮
			var create_dt=new Date().Format("yyyy-MM-dd");
			$("#searchTime").val(create_dt);
			var create_Mouth=new Date().Format("yyyy-MM");
			document.getElementById("pro_time_mouth").innerText=create_Mouth;	
			if(parseInt(task.state)!=10){
				searchproduction(task.state);//加载工段
			}
			getTotalQty();// 已生产的总量
			$("#product_rwsl").html(task.total_qty);
			Product_time(create_Mouth,task.state);//加载生产信息
			//任务单名称
			$("#taskname_head").html("任务单:"+task.product_name);
			//任务单流水号
			$("#serialno_head").html(task.serial_no+"/"+task.rwdh+"("+task.ddh+")"+"/"+task.scdh);
			//初始化任务条
		$("#producTaskStaticBar").taskStaticBar_init({type:2});
		$("#producTaskStaticBar").taskStaticBar_showByTask(task);
		};
		asyncAjaxMethod(url,params,true,fn);
	
	loadCommonPage();
	$(".midd_wrap").css({minHeight:$(window).height()-240});		
	window.onresize=function(){
		$(".midd_wrap").css({minHeight:$(window).height()-240});
		
	};
	
	
});
//加载公用部分界面，如同步，底部，左侧菜单等
function loadCommonPage(){
	var isVip=getCookie("isVip");
	if(isVip=="true"){
		$("#top").load(getwebroot()+"vip/platform/vipTop.html",function(responseTxt,statusTxt,xhr){
		    if(statusTxt=="success")
			{
				$("#mainNav").children().eq(0).addClass("curr");
			    $("#company").parent().css("display","none");
			}
		  });
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
	}else{
		$("#top").load(getwebroot()+"platform/top.html",function(responseTxt,statusTxt,xhr){
		    if(statusTxt=="success")
		      $("#mainNav").children().eq(1).addClass("curr");
		      $("#company").parent().css("display","none");
		  });
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	}
}
function go_tasklist()
{
window.location.href=getwebroot()+"/externalTask/producTaskList.htm";
}
function go_taskInfo(){
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/producTaskInfo/"+taskid+".htm";
}
function go_logistics()
{
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/producLogisticsInfo/"+taskid+".htm";
}
function go_deliveredInfo(){
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/producDeliveredInfo/"+taskid+".htm";
}
function go_connection(){
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/producConnection/"+taskid+".htm";
}
function go_qualityControl(){
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/producQualityControl/"+taskid+".htm";
}
//是否加载按钮
function productButton(state){
	var button ="";
	if(state ==15 ||state==20){
		 button = '<button class="oprate_button" onClick="save_before()">保存</button>'+
		'<button class="oprate_button_cancel mr10 ml10" onClick="del_section_row()">清空</button>';
	}else if(state==30 || state==25 ||state==10){
		 button = '<button class="disabled_btn" disabled="disabled"  title="现在无法保存" >保存</button>'+
			'<button class="disabled_btn" disabled="disabled" title="现在无法清空" >清空</button>';
	}
	$("#productButton").prepend(button);
}
var section_rowCount=0;


/**
 * 已生产的总量
 * @author chenlong
 */
function getTotalQty(){
	var url="externalTask/getTotalQtyForProducer.do";;
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
 * 先查询任务单工段名
 */
function searchproduction(states){
	var url = "ProcessSection/getTaskProcessSectionList.do";
	var params ={};
	params.t_id = taskid;
	var fn = function(result){
		if( result != null){
		$("#pro_section_list tr:gt(0)").empty();
		var productSectionlist = result.data;
		var length = productSectionlist.length;
		var section ="";
		for(var i=0; i< length;i++){
			var productSection = productSectionlist[i];
			section = section+
			'<tr id=section'+section_rowCount+'>'+
			'<td>'+productSection.section_name+'</td>'+
			'<td><input type="text" class="input_wrap" value=0 /></td>'+			
			'<td><input type="text" class="input_wrap" value=0 /></td>'+
			'<td><input style="display:none;" value='+productSection.sec_id+' /></td>'+
			'<td><input style="display:none;" value="" /></td>'+
			
		'</tr>';
			section_rowCount++;
		}
			$(section).insertAfter("#pro_section_list tr:eq(0)");
			Outputproduction(states);//加载工作完成信息
		}else{
			window.wxc.xcConfirm("未查询到任务单的工段,请联系管理员");
		}
	};
	asyncAjaxMethod(url,params,true,fn);
	
}
/**
 * 查询出该日期的工段信息
 */
function Outputproduction(states){
	var url = "OutputItem/getTaskOutputListForProducer.do";
	var params ={};
	params.t_id = taskid;
	params.scrq = document.getElementById("searchTime").value;
	
	var fn = function(result){
		if( result != null){
		var Outputlist = result.data;
		if(Outputlist!=0){
		var length = Outputlist.length;
		var content ="";
		//if(parseInt(states)==15||parseInt(states)==20){		
		for(var a=0; a< length;a++){
			var Output = Outputlist[a];
			for(var i=0;i<section_rowCount;i++){				
				var toal = $("#section"+i).find("td:eq(0)").html();
				if(Output.section_name==toal){
					$("#section"+i).find("input:eq(0)").val(Output.yield_qty);
					$("#section"+i).find("input:eq(1)").val(Output.worker_no);
				}
			}	
		}
		}else{
			for(var i=0;i<section_rowCount;i++){
				$("#section"+i).find("input:eq(0)").val(0);
				$("#section"+i).find("input:eq(1)").val(0);
			}
		}
		}else{
			window.wxc.xcConfirm("未查询到任务单的工段,请联系管理员");
		}
		
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 验证填入的值
 * @param params
 * @returns {String}
 */
function informationvoEdt(params){
	var number_reg=/^(0|[1-9][0-9]*)$/;	
	var error_str ="";
	if(params.yield_qty.toString().length>20){
				error_str="完工数量长度不能超过20字符";
				return error_str;
	}
	if(params.worker_no.toString().length>20){
		error_str="工作人数量不能超过20字符";
		return error_str;
    }
	if(!number_reg.test(params.worker_no))
	{
		error_str="有输入非数字的字符";
		return error_str;
	}else if(parseInt(params.worker_no)==0){
		error_str="工作人数不能为0或为空";
		return error_str;
	}
	if(!number_reg.test(params.yield_qty))
	{
		error_str="有输入非数字的字符";
		return error_str;
	}	  
	  return error_str;
}
/**
 * 点击保存该日期工段信息
 */
function save_before(){
	var url ="OutputItem/addTaskOutput.do";
	var error_str ="";
	var params ={};//定义一个对象
	params.t_id = taskid;
	params.scrq = document.getElementById("searchTime").value;
	params.arr={};//定义一个对象中的对象
	params.count = section_rowCount;
	for(var i=0;i<section_rowCount;i++){
		params.arr[i] ={};//对象的为数字只能用[i]来表示
	}
      
	for(var i=0;i<section_rowCount;i++){//进行数据的拼装
		
		params.arr[i].sec_id = $("#section"+i).find("input:eq(2)").val();
		params.arr[i].yield_qty = $("#section"+i).find("input:eq(0)").val();
		params.arr[i].worker_no = $("#section"+i).find("input:eq(1)").val();
		error_str = informationvoEdt(params.arr[i]);								
	}
    if(error_str==""){
	  var fn = function(result){
		  if(result.data=="success"){
		  	xcconfirm=new window.wxc.xcConfirm("保存成功",window.wxc.xcConfirm.typeEnum.infoNobtn);
			//两秒后自动关闭
			closeBytimeCount(2);
		 	var time = document.getElementById("searchTime").value;
			time =time.substring(0,7);	
		    Product_time(time,state);
		    getTotalQty();
		  }else{
			xcconfirm=new window.wxc.xcConfirm(result.data,window.wxc.xcConfirm.typeEnum.infoNobtn);
			//两秒后自动关闭
		    closeBytimeCount(3);
		 	var time = document.getElementById("searchTime").value;
			time =time.substring(0,7);	
		    Product_time(time,state);
		    getTotalQty();
		  }
	 };
	    asyncAjaxMethod(url,params,false,fn);//发送情求到后台
   }else{
	    var option ={title:"提示",btn:parseInt("0001",2)};
  		window.wxc.xcConfirm(error_str, window.wxc.xcConfirm.typeEnum.custom,option);
    }

}
/**
 * 点击右边的X删除该信息
 * @param obj
 */
function del_section_row_pr(obj){
	var url ="OutputItem/deleteTaskOutput.do";
	var params ={};
	params.t_id = taskid;
	params.scrq = $(obj).parent().find("a:eq(1)").text();
	var time = document.getElementById("searchTime").value;
	var fn=function(result){									
		for(var i=0;i<section_rowCount;i++){
			if(params.scrq == time ){
		
			$("#section"+i).find("input:eq(0)").val(0);
			$("#section"+i).find("input:eq(1)").val(0);
			}
		}		
		var times = 	params.scrq;
		time =times.substring(0,7);
		Product_time(time,state);
		getTotalQty();
			};
	 asyncAjaxMethod(url,params,true,fn);
}
//删除该日期下的所有工段的生产信息
function del_section_row()
{
	var time = document.getElementById("searchTime").value;
	window.wxc.xcConfirm("您确认要清空"+time+"日的所有工段生产信息吗？", window.wxc.xcConfirm.typeEnum.confirm,
			{	
			onOk:function(){
				var url ="OutputItem/deleteTaskOutput.do";
				var params ={};
				params.t_id = taskid;
				params.scrq = document.getElementById("searchTime").value;			
				var fn=function(result){									
					for(var i=0;i<section_rowCount;i++){
						$("#section"+i).find("input:eq(0)").val(0);
						$("#section"+i).find("input:eq(1)").val(0);
					}					
							var time = document.getElementById("searchTime").value;
							time =time.substring(0,7);
							  Product_time(time,state);	
							  getTotalQty();
						};
				 asyncAjaxMethod(url,params,true,fn);
					},
			onCancel:function(){
				}
			});
	
}
/**
 * 显示当前的日期生产的量
 * @param time
 * @param state
 */
function Product_time(time,state)
{
	var url = "OutputItem/getTaskOutputListForMouth.do";
	var params ={};
	params.t_id = taskid;
	params.scrq = time;
	params.buType = 3;
	var fn = function(result){
		$("#product_mouth_list").empty();
		$("#product_mouth_list").prev().css("display","none");
		if(result.data.length>0){			
			document.getElementById("pro_time_mouth").innerText=time;
			var li_s="";
			var outlist =  result.data;
			var length = outlist.length;
			for(var i=0;i<length;i++){
				var outli = outlist[i];
				var button ="";
				if(state ==15 ||state==20){
					button ='<a class="close_btn" href="javascript:void(0)" onClick="doDel(this)">X</a>';
				}
				//第一个加first样式
				if(i==0)
				{
					li_s = li_s+
						'<li class="first"  onClick="Outputproduction_li(this)">'+
						'<div class="inner_wrap">'+
						button+
							'<a class="productDate">'+outli.scrq.substring(0,10)+'</a>'+
						'</div>'+
					'</li>';
				}
				//最后一个加last样式
				else if(i==length-1)
				{
					li_s = li_s+
						'<li class="last" onClick="Outputproduction_li(this)">'+
						'<div class="inner_wrap">'+
						button+
							'<a class="productDate">'+outli.scrq.substring(0,10)+'</a>'+
						'</div>'+
					'</li>';
				}
				else
				{
				li_s = li_s+
					'<li onClick="Outputproduction_li(this)">'+
					'<div class="inner_wrap">'+
					button+
						'<a class="productDate">'+outli.scrq.substring(0,10)+'</a>'+
					'</div>'+
				'</li>';
				}
			}
			$("#product_mouth_list").html(li_s);
		}else{	
			
			$("#product_mouth_list").prev().css("display","block");
		}				
	};
    asyncAjaxMethod(url,params,true,fn);
}
/**
 * 查询上一个月的记录
 */
function ltProduct_time()
{
	var time = $("#pro_time_mouth").text();
	var mouth ="";	
	mouth = time.split("-");   // 取子字符串。
	var url = "OutputItem/getTaskOutputListForMouth.do";
	var params ={};
	params.t_id = taskid;
	params.buType = 0;
	if(mouth[1]>10){
		params.scrq = [mouth[0],mouth[1]-1].join("-");	
	}
	if(mouth[1]==1){
		params.scrq = [mouth[0]-1,"12"].join("-");	
	}
	if(mouth[1]<11 && mouth[1]>1){
	params.scrq = [mouth[0],mouth[1]-1].join("-0");
	}
	var fn = function(result){
		$("#product_mouth_list").empty();
		$("#product_mouth_list").prev().css("display","none");		
		if(result.data.length>0){				
			var li_s="";
			var outlist =  result.data;
			var length = outlist.length;
			document.getElementById("pro_time_mouth").innerText=outlist[0].scrq.substring(0,7);
			var button ="";
			if(state ==15 ||state==20){
				button ='<a class="close_btn" href="javascript:void(0)" onClick="doDel(this)">X</a>';
			}
			for(var i=0;i<length;i++){
				var outli = outlist[i];
				//第一个加first样式
				if(i==0)
				{
					li_s = li_s+
						'<li class="first" onClick="Outputproduction_li(this)">'+
						'<div class="inner_wrap">'+
						button+
							'<a class="productDate">'+outli.scrq.substring(0,10)+'</a>'+
						'</div>'+
					'</li>';
				}
				//最后一个加last样式
				else if(i==length-1)
				{
					li_s = li_s+
						'<li class="last" onClick="Outputproduction_li(this)">'+
						'<div class="inner_wrap">'+
						button+
							'<a class="productDate">'+outli.scrq.substring(0,10)+'</a>'+
						'</div>'+
					'</li>';
				}
				else
				{
				li_s = li_s+
				'<li onClick="Outputproduction_li(this)">'+
				'<div class="inner_wrap">'+
				button+
					'<a class="productDate">'+outli.scrq.substring(0,10)+'</a>'+
				'</div>'+
			'</li>';
				}
			}
			$("#product_mouth_list").html(li_s);
		}else{	
			document.getElementById("pro_time_mouth").innerText=params.scrq;
			$("#product_mouth_list").prev().css("display","block");
		}
		
		
	};
    asyncAjaxMethod(url,params,true,fn);

}
/**
 * 比较时间的大小
 * @returns {Boolean}
 */
function checkEndTime(time){  	
    var start=time.replace("-","");  
    var bime=new Date().Format("yyyy-MM"); 
    var end=bime.replace("-",""); 
    if(end<start){  
        return false;  
    }  
    return true;  
} 
/**
 * 查询下一个月的记录
 */
function gtProduct_time()
{
    var time = $("#pro_time_mouth").text();
	var mouth ="";	
    mouth = time.split("-");   // 取子字符串。
	var url = "OutputItem/getTaskOutputListForMouth.do";
	var params ={};
	params.t_id = taskid;
	params.buType = 1;
	if(mouth[1]>8 && mouth[1]<12){//日期的变化
		params.scrq = [mouth[0],parseInt(mouth[1])+parseInt("1")].join("-");	
	}
	if(mouth[1]==12){
		params.scrq = [parseInt(mouth[0])+parseInt("1"),"1"].join("-0");	
	}
	if(mouth[1]<9){
	params.scrq = [mouth[0],parseInt(mouth[1])+parseInt("1")].join("-0");
	}
	var boolean = checkEndTime(params.scrq);
	if(boolean == true){	
	var fn = function(result){		
		$("#product_mouth_list").empty();
		$("#product_mouth_list").prev().css("display","none");
		if(result.data.length>0){			
			var li_s="";
			var outlist =  result.data;
			var length = outlist.length;
			document.getElementById("pro_time_mouth").innerText=outlist[0].scrq.substring(0,7);
			var button ="";
			if(state ==15 ||state==20){
				button ='<a class="close_btn" href="javascript:void(0)" onClick="doDel(this)">X</a>';
			}
			for(var i=0;i<length;i++){
				var outli = outlist[i];
				//第一个加first样式
				if(i==0)
				{
					li_s = li_s+
						'<li class="first" onClick="Outputproduction_li(this)">'+
						'<div class="inner_wrap">'+
						button+
							'<a class="productDate">'+outli.scrq.substring(0,10)+'</a>'+
						'</div>'+
					'</li>';
				}
				//第一个加last样式
				else if(i==length-1)
				{
					li_s = li_s+
						'<li class="last" onClick="Outputproduction_li(this)">'+
						'<div class="inner_wrap">'+
						button+
							'<a class="productDate">'+outli.scrq.substring(0,10)+'</a>'+
						'</div>'+
					'</li>';
				}
				else
				{
				li_s = li_s+
				'<li onClick="Outputproduction_li(this)">'+
				'<div class="inner_wrap">'+
				button+
					'<a class="productDate">'+outli.scrq.substring(0,10)+'</a>'+
				'</div>'+
			'</li>';
				}
			}
			$("#product_mouth_list").html(li_s);
		}else{	
			document.getElementById("pro_time_mouth").innerText=params.scrq;
			$("#product_mouth_list").prev().css("display","block");
		}		
	};
	}else{
		window.wxc.xcConfirm("日期："+params.scrq+"无法操作");
	}
   asyncAjaxMethod(url,params,true,fn);

}
/**
 * 点左边日期进行生产信息的查询
 * @param obj
 */
function Outputproduction_li(obj){
	$("#searchTime").val( $(obj).find(".productDate").text());
	var url = "OutputItem/getTaskOutputListForProducer.do";
	var params ={};
	params.t_id = taskid;
	params.scrq = $(obj).find(".productDate").text();
	
	var fn = function(result){
		if( result != null){
		var Outputlist = result.data;
		if(Outputlist!=0){
		var length = Outputlist.length;
		var content ="";
		for(var a=0; a< length;a++){
			var Output = Outputlist[a];
			for(var i=0;i<section_rowCount;i++){
				var toal = $("#section"+i).find("td:eq(0)").html();
				if(Output.section_name==toal){
					$("#section"+i).find("input:eq(0)").val(Output.yield_qty);
					$("#section"+i).find("input:eq(1)").val(Output.worker_no);
				}
			}	
		}
		}else{
			for(var i=0;i<section_rowCount;i++){
				$("#section"+i).find("input:eq(0)").val(0);
				$("#section"+i).find("input:eq(1)").val(0);
			}
		}
		}else{
			window.wxc.xcConfirm("未查询到任务单的工段,请联系管理员");
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
	
