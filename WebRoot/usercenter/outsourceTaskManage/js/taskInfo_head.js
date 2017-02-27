    //接受放的id
	var receive_id="";
	//生产进度百分比
	var pro_percent=0;
	//合格百分比
	var pass_percent=0;
	//计时器
	var pro_c=0;
	//计时器
	var pass_c=0;
	//能否保存任务数量
	var can_save_task_num=false;
	$(function(){
		initHead();
	});
	/**初始化头部信息*/
	function initHead(){
		var url="externalTask/getTaskByID.do";
		var params={};
		params.t_id=taskid;
   		var fn=function(result){
   			var task=result.data;
   			state = task.state;
   			stateTaskInfo(task.state);
   			productImg(task.state);
   			ProductMainFile(task.state);
   			Bomlist();
   			fileOperationList(task.state);
   			can_save_task_num=false;
   			//初始化任务条
   			$("#outsourceTaskStaticBar").taskStaticBar_init({type:1});
			$("#outsourceTaskStaticBar").taskStaticBar_showByTask(task);
			//初始化任务信息
			//状态
			$("#show_state").html(showstate(task.state));
			if(task.state==5){
				initCompanyList();//加载供应商
				canEdit();//可以编辑
			}
			//未接受发货数量
			if(task.unReceivedlogisticsCount != 0 && (task.state ==15||task.state==20) && task.unReceivedlogisticsVoCount != 0 ){
				var log ='<p class="title_12s" id="logHead">'+
					'<span class="redcolor" id="show_unReceivedlogisticsCount"></span>条新的来货信息，'+
				'<span class="redcolor" id="show_unReceivedlogisticsVoCount"></span>条发料信息等待对方确认接收，'+
				'请及时'+
				'<a href="javascript:void(0)" onClick="go_logistics()" class="a_operate_link">查看信息</a></p>';
				  $("#stoptask").before(log);
			$("#show_unReceivedlogisticsCount").html(task.unReceivedlogisticsCount);
			$("#show_unReceivedlogisticsVoCount").html(task.unReceivedlogisticsVoCount);
			}
			//未接受发料数量
			if(task.unReceivedlogisticsCount == 0 &&task.unReceivedlogisticsVoCount != 0 && (task.state ==15||task.state==20)){
				var logvo = '<p class="title_12s" id="logHead">'+
					'<span class="redcolor" id="show_unReceivedlogisticsVoCount"></span>条发料信息等待对方确认接收，'+
					'请及时'+
					'<a href="javascript:void(0)" onClick="go_logistics()" class="a_operate_link">查看信息</a></p>';
				  $("#stoptask").before(logvo);
			$("#show_unReceivedlogisticsVoCount").html(task.unReceivedlogisticsVoCount);
			}
			if(task.unReceivedlogisticsCount != 0 &&task.unReceivedlogisticsVoCount == 0 && (task.state ==15||task.state==20)){
				var log ='<p class="title_12s" id="logHead">'+
					'<span class="redcolor" id="show_unReceivedlogisticsCount"></span>条新的来货信息'+
				'请及时'+
				'<a href="javascript:void(0)" onClick="go_logistics()" class="a_operate_link">查看信息</a></p>';
				$("#stoptask").before(log);
				$("#show_unReceivedlogisticsCount").html(task.unReceivedlogisticsCount);
			}
			//是否有质检
			if(task.state==15||task.state==20){
				if(task.unReceivedqcCount>0){
					showqc();
				}			
			}
			//任务单名称
			$("#taskname_head").html("任务单:"+task.product_name);
			//任务单流水号+任务单号+订单号+生产单号
			$("#serialno_head").html(task.serial_no+"/"+task.rwdh+"("+task.ddh+")"+"/"+task.scdh);
			//产品名称
			$("#show_product_name").html(task.product_name);
			//数量
			$("#total_qty").html(task.total_qty);
			//任务单
			$("#show_rwdh").html(task.rwdh+"("+task.ddh+")");
			//派单日期
			if(task.send_time){
				$("#show_send_time").html(showBeforeOfDateStr(task.send_time));
			}
			//计划开工完工日期
			$("#show_plan_start").html(showBeforeOfDateStr(task.plan_start));
			$("#plan_start").val(showBeforeOfDateStr(task.plan_start));
			$("#show_plan_complete").html(showBeforeOfDateStr(task.plan_complete));
			$("#plan_complete").val(showBeforeOfDateStr(task.plan_complete));
			//外协单位  sendOrder方法中。也用到了id=show_receive_company_name,要改一起改
			$("#show_receive_company_name").html(replaceNullAsStr(task.receive_company_name));
			$("#task_unit").val(task.receive_company_name);
			//必须的，这个组合控件的显示值是在input上面，光select标签上面给值，显示不出来
			$("#company_combo_wrap").find("input").val(task.receive_company_name);
			//质检方式
			var show_qc_type_str;
			if(task.qc_type==1){
				show_qc_type_str="入库后质检";
			}else if(task.qc_type==2){
				show_qc_type_str="入库前质检";
			}
			$("#show_qc_type").html(show_qc_type_str);
			$("#qc_type").val(task.qc_type);
			receive_id = task.receive_company;//接收方的id
			
			//备注
			$("#show_task_remark").html(replaceNullAsStr(task.remark));
			$("#task_remark").val(replaceNullAsStr(task.remark));
			//以下是统计图表信息
			$("#produced_total").html(replaceNullAsStr(task.produced_qty)+"/"+replaceNullAsStr(task.total_qty));
			$("#qualified_confirmed").html(replaceNullAsStr(task.qualified_qty)+"/"+replaceNullAsStr(task.confirmed_qtyVo));
			if(task.total_qty==0 || task.total_qty==null){
				pro_percent=0;
			}else{
				pro_percent=task.produced_qty/task.total_qty*100;
				
			}
			if(task.confirmed_qtyVo==0 || task.confirmed_qtyVo==null){
				pass_percent=0;
			}else{
				pass_percent=task.qualified_qty/task.confirmed_qtyVo*100;
			}
			if(pro_percent>100){
				pro_percent =100;
			}
			$("#proPecent").html(pro_percent.toString().substring(0,5)+"%");
			$("#passPecent").html(pass_percent.toString().substring(0,5)+"%");
			createProCanvas();
			createPassCanvas();
			var plan_start = showBeforeOfDateStr(task.plan_start);//计划开始的时间
			//计划完成日期
			var plan_complete=showBeforeOfDateStr(task.plan_complete);//计划完工时间
			var startDate="";//实际开始时间
			var isAdvance=false;//是否提前开工
			var isBurew = false;//是否延期
			if(task.first_start_time){
				startDate=showBeforeOfDateStr(task.first_start_time);//实际开始时间
				//大于0，表示提前；否则，表示不提前
				var start_before=dateDiff(plan_start,startDate);
				if(start_before>0){
					isAdvance=true;
				}
				//大于0，表示；否则，表示不提前
				var start_before=dateDiff(startDate,plan_complete);
				if(start_before>0){
					isBurew=true;
				}

			}
			
			var completedate=getCurrentDate();//默认当前日期
			var completetime="";//实际完工时间
			var usedDay="";	//已生产天数
			var moreDays="";	//超出天数
			var iscomplete=false; //是否完成
		
			if(task.finish_product_time!=null&&task.finish_product_time!=""){//已生产完成的任务
				completetime=showBeforeOfDateStr(task.finish_product_time);//实际完工时间
				usedDay=dateDiff(completetime,startDate)+1;//为实际的生产时间
				usedDay=usedDay>0?usedDay:0;
				moreDays=dateDiff(completetime,plan_complete);//超出天数
				moreDays=moreDays>0?moreDays:0;
				iscomplete=true;
				
			}else if(task.first_start_time!=""&&task.first_start_time!=null&&(task.finish_product_time==null||task.finish_product_time=="")){//在生产中的任务
				usedDay=dateDiff(completedate,startDate)+1;//已生产天数
				usedDay=usedDay>0?usedDay:0;
				moreDays=dateDiff(completedate,plan_complete);//超出天数
				moreDays=moreDays>0?moreDays:0;
			}											
			var allDay=dateDiff(plan_complete,plan_start);

			if(moreDays>0){	
				if((task.state==5||task.state==10)&&task.first_start_time==null){//还未生产的任务
					$(".horizontal_bar_red").css("display","none");
				}
			}else{
				$(".horizontal_bar_red").css("display","none");
			}
			create_prod_period(usedDay,plan_start,plan_complete,moreDays,isAdvance,iscomplete,task.state,completetime,allDay,startDate,isBurew);//生产进度信息的变换
   		};
   		asyncAjaxMethod(url,params,true,fn);
		
	}
	/**按照状态位显示状态
	*/
	function showstate(state){
		var result;
		switch(state){
			case 5:
				result="等待派单";
				break;
			case 10:
				result="已派单";
				break;
			case 15:
				result="生产中";
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
	function curr(obj)
	{
		$(obj).parent().parent().find("a").removeClass("curr");
		$(obj).addClass("curr");
	}
	//编辑任务单基本信息show
	function task_baseinfo_editshow(obj,num)	
	{
		if(num==1 && "编辑"==$(obj).html())
		{
			$(obj).html("保存");
			$(obj).removeClass("edit").addClass("save");
			$(obj).parent().find("label").css("display","none");
			$(obj).parent().find("input").css("display","inline");
		}
		else if(num==1 && "保存"==$(obj).html())
		{
			$(obj).removeClass("save").addClass("edit");
			var plan_start=$("#plan_start").val();
			var plan_complete=$("#plan_complete").val();
			
			var url="externalTask/updateTaskPlanDate.do";
			var params={};
			params.t_id=taskid;
			params.plan_start=plan_start;
			params.plan_complete=plan_complete;
	   		var fn=function(result){
	   			$(obj).html("编辑");
				$(obj).parent().find("label").css("display","inline");
				$(obj).parent().find("input").css("display","none");
				$("#show_plan_start").html(plan_start);				
				$("#show_plan_complete").html(plan_complete);
				$(".prod_period_wrap").find(".dt_start_wrap").html("计划开工:"+plan_start);
				$(".prod_period_wrap").find(".dt_end_wrap").html("计划开工:"+plan_complete);
	
	   		};
	   		asyncAjaxMethod(url,params,true,fn);			
		}
		else if(num==2 && "编辑"==$(obj).html())
		{
			$(obj).html("保存");
			$(obj).removeClass("edit").addClass("save");
			$(obj).parent().find("label").css("display","none");
			//var company_name=$("#show_receive_company_name").html();
			$(obj).parent().find("#company_combo_wrap").css("display","block");			
			$("#search_company_btn").css("display","inline");
			//$("#company_combo_wrap").find(".custom-combobox input").val(company_name);
			
		}
		else if(num==2 && "保存"==$(obj).html())
		{
			$(obj).removeClass("save").addClass("edit");
			//TODO:1.请设置真实有效的ID
			var company_ids=$("#task_unit").val();
			//console.log($("#task_unit option:selected"));
			var company_name=$("#task_unit").find("option:selected").text();			
			var company_names = $("#company_combo_wrap").find(".custom-combobox input").val();			
			if(company_names != company_name ){//当用户没有操作，直接保存，如果已有值直接保存
			if($("#company_combo_wrap").find(".custom-combobox input").val() != null && $("#company_combo_wrap").find(".custom-combobox input").val() != ""){
				$(obj).html("编辑");
				$(obj).parent().find("label").css("display","block");
				$(obj).parent().find("#company_combo_wrap").css("display","none");
				$("#search_company_btn").css("display","none");
			}
			}else{
			//console.log("company_name:"+company_name);
			var url="externalTask/updateTaskreceive_company.do";
			var params={};
			params.t_id=taskid;
			params.company_id=company_ids;
	   		var fn=function(result){
	   			$(obj).html("编辑");
				$(obj).parent().find("label").css("display","block");
				$(obj).parent().find("#company_combo_wrap").css("display","none");
				$("#search_company_btn").css("display","none");
				//TODO:2.请设置真实有效公司名
				//外协单位  sendOrder方法中。也用到了id=show_receive_company_name,要改一起改
				$("#show_receive_company_name").html(company_name);
	   		};
	   		asyncAjaxMethod(url,params,true,fn);
			}
	   					
		}
		else if(num==3 && "编辑"==$(obj).html())
		{
			$(obj).html("保存");
			$(obj).removeClass("edit").addClass("save");
			$(obj).parent().find("label").css("display","none");
			$(obj).parent().find("#qc_combo_wrap").css("display","block");
		}
		else if(num==3 && "保存"==$(obj).html())
		{
			$(obj).removeClass("save").addClass("edit");
			var qc_type=$("#qc_type").val();
			var qc_type_name=$("#qc_type").find("option:selected").text();
			var url="externalTask/updateTaskqc_type.do";
			var params={};
			params.t_id=taskid;
			params.qc_type=qc_type;
	   		var fn=function(result){
	   			$(obj).html("编辑");
				$(obj).parent().find("label").css("display","block");
				$(obj).parent().find("#qc_combo_wrap").css("display","none");
				/*var show_qc_type_str;
				if(qc_type==1){
					show_qc_type_str="入库后质检";
				}else if(qc_type==2){
					show_qc_type_str="入库前质检";
				}
				$("#show_qc_type").html(show_qc_type_str);
				*/
				$("#show_qc_type").html(qc_type_name);
	   		};
	   		asyncAjaxMethod(url,params,true,fn);
		}
		else if(num==4 && "编辑"==$(obj).html())
		{
			$(obj).html("保存");
			$(obj).removeClass("edit").addClass("save");
			//$("#task_remark").removeAttr("disabled");
			//$(obj).prev().css("border","1px solid #ccc");
			$(obj).parent().find("label").css("display","none");
			$("#task_remark").css("display","block");
		}
		else if(num==4 && "保存"==$(obj).html())
		{
			$(obj).removeClass("save").addClass("edit");
			var task_remark=$("#task_remark").val();
			if(task_remark!=null && task_remark.length>100){
				var option={title:"提示"};
				window.wxc.xcConfirm("限制输入100字符", window.wxc.xcConfirm.typeEnum.custom,option);
				return;
			}
			var url="externalTask/updateTaskRemark.do";
			var params={};
			params.t_id=taskid;
			params.remark=task_remark;
	   		var fn=function(result){
	   			$(obj).html("编辑");
				//$('#task_remark').attr("disabled","disabled");
				//$(obj).prev().css("border","0px solid #fff");
				$("#show_task_remark").css("display","block");
				$('#task_remark').css("display","none");
				$("#show_task_remark").html(task_remark);
	   		};
	   		asyncAjaxMethod(url,params,true,fn);
		}		
	}
	
	/**派单,必须指定接收公司和产品主图
	 * 如果工艺文件、视频、质检标准、作业指导书，其中一样没有，需要提醒，并在此确认派单
	 * 参数：任务单号*/
	function sendOrder(){
		var receive_company_name=$("#show_receive_company_name").html();
		if(receive_company_name==null||receive_company_name==""){
			var option={title:"提示"};
			window.wxc.xcConfirm("尚未指定接受公司", window.wxc.xcConfirm.typeEnum.custom,option);
			return;
		}
		var plan_start =$("#show_plan_start").text();	
		var plan_complete =$("#show_plan_complete").text();
		if(plan_start==null||plan_start==""||plan_complete==null||plan_complete==""){
			var option={title:"提示"};
			window.wxc.xcConfirm("计划的的时间段不够完善", window.wxc.xcConfirm.typeEnum.custom,option);
			return;
		}
		/* var parentObj=$("#prcmain_img");
		   var imgUrl=parentObj.find("img").attr("src");
		   if(imgUrl=="/newresources/images/other/6.png"){
		   		window.wxc.xcConfirm("任务单主图不存在,不可派单", window.wxc.xcConfirm.typeEnum.custom,option);
		   		return;				
		   }*/
		/*   var qc_type = $("#show_qc_type").text();
		if(qc_type==null||qc_type==""){
			var option={title:"提示"};
			window.wxc.xcConfirm("尚未指定质检方式", window.wxc.xcConfirm.typeEnum.custom,option);
			return;
		}*/
		   if($("#operation_file_list").has("tr").length==0)
			{
				window.wxc.xcConfirm("作业指导书不存在,不可派单", window.wxc.xcConfirm.typeEnum.custom,option);
				return;			
			}
		
		window.wxc.xcConfirm("您将把任务单下达给"+receive_company_name, window.wxc.xcConfirm.typeEnum.confirm,
		{
			onOk:function(){
				var url="externalTask/updateTaskState2Send.do";
				var params={};
				params.t_id=taskid;
		   		var fn=function(result){
		   			if(result.toConfirm==true){
	   					window.wxc.xcConfirm("您的工艺文件尚未完善,是否确认派单", window.wxc.xcConfirm.typeEnum.confirm,
						{
							onOk:function(){
								var url="externalTask/updateTaskState2SendSecond.do";
								var params={};
								params.t_id=taskid;
						   		var fn=function(result){
						   			if(result.message=="任务单当前状态不是等待派单"){
						   				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
						   				closeBytimeCount_task(2);	   				
						   			}else if(result.message=="成功"){
						   					location.reload(true);	
							   			}
						   			
						   		};
						   		asyncAjaxMethod(url,params,true,fn);
							}
						});
	   				}else if(result.message=="任务单当前状态不是等待派单"){
		   				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
		   				closeBytimeCount_task(2);	   				
		   			}else if(result.message=="成功"){
	   					//TODO:刷新当前页,其实应该跳转到不可编辑的页面
	   					xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
	   					closeBytimeCount_task(2);
	   				}
		   		};
		   		asyncAjaxMethod(url,params,true,fn);
				
			}
		});
	}
	/**取消任务单
	 * 参数：任务单号*/
	function stopOrder(){
		var url1="externalTask/getTaskState.do";
		var params1={};
		params1.t_id=taskid;
   		var fn1=function(result){
   			var state1 = result.getstate;
   			if(parseInt(state1)>=15){
   				xcconfirm=new window.wxc.xcConfirm("对方已接收无法取消",window.wxc.xcConfirm.typeEnum.infoNobtn);
   				closeBytimeCount_task(2);
   				return;
   			}else if(parseInt(state1)==30){  				
   				xcconfirm=new window.wxc.xcConfirm("对方已经取消，不可重复操作",window.wxc.xcConfirm.typeEnum.infoNobtn);   			
   				closeBytimeCount_task(2);
   				return;
   			}else {
   				window.wxc.xcConfirm("取消原因", window.wxc.xcConfirm.typeEnum.input,
   						{
   							onOk:function(reason){
   								var url="externalTask/updateTaskState2Stop.do";
   								var params={};
   								params.t_id=taskid;
   								params.reason=reason;
   						   		var fn=function(result){
   						   		if(result.message=="对方已经确认，不可取消"){
					   				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
					   				closeBytimeCount_task(2);	   				
					   			}else if(result.message=="对方已经取消，不可重复操作"){
					   				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
					   				closeBytimeCount_task(2);	   				
					   			}else if(result.message=="成功"){
					   				//TODO:刷新当前页,其实应该跳转到不可编辑的页面
   						   			location.reload(true);
						   			}
   						   		
   						   		};
   						   		asyncAjaxMethod(url,params,true,fn);
   								
   							}
   						});
   			}  		
   		};
   		asyncAjaxMethod(url1,params1,true,fn1);
		
	}
//	/**显示质检按钮*/
//	function showzhijianbtn(){
//		$(".task_operate_wrap").children().children().eq(3).css("display","inline");
//	}
//	/**隐藏质检按钮*/
//	function hidezhijianbtn(){
//		$(".task_operate_wrap").children().children().eq(3).css("display","none");
//	}
	
function addscrollImg(obj){
	if($(obj).val()!="")
	{
	    uploadProductFile();
		var ulwidth=$(".spec-scroll .items ul").width();
		$(".spec-scroll .items ul").width(ulwidth+335);
	
	var ul=$(obj).parent().parent();
	var filename=$(obj).val();
	
	//当前上传控件清空
	$(obj).val("");
	 scrollDiv = $(".spec-scroll .items ul"); //进行移动动画的容器
	 scrollItems = $(".spec-scroll .items ul li"); //移动容器里的集合
	 moveLength = scrollItems.eq(0).width() * moveNum; //计算每次移动的长度
	 countLength = (scrollItems.length - viewNum) * scrollItems.eq(0).width(); //计算总长度,总个数*单个长度
	}
}
//删除上传的图片对象
function deluploadImg(obj)
{
	$(obj).parent().parent().parent().remove();
}
/* //Tab控制函数
function tabs(tabId, tabNum){
	//设置点击后的切换样式
	$(tabId + " .tab li").removeClass("curr");
	$(tabId + " .tab li").eq(tabNum).addClass("curr");
	//根据参数决定显示内容
	$(tabId + " .tabcon").hide();
	$(tabId + " .tabcon").eq(tabNum).show();
} */
//环形图
//x,y 坐标,radius 半径,process 百分比,backColor 中心颜色, proColor 进度颜色, fontColor 中心文字颜色,canvasId 承载的对象ID,descText描述信息
function DrowProcess(x,y,radius,process,backColor,proColor,fontColor,canvasId,descText){
	var canvas = document.getElementById(canvasId);

	if (canvas.getContext) {
		var cts = canvas.getContext('2d');
	}else{
		return;
	}
	
	cts.beginPath();  
	// 坐标移动到圆心  
	cts.moveTo(x, y);  
	// 画圆,圆心是24,24,半径24,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针  
	cts.arc(x, y, radius, 0, Math.PI * 2,false);  
	cts.closePath();  
	// 填充颜色  
	cts.fillStyle = backColor;  
	cts.fill();

	cts.beginPath();  
	// 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
	cts.moveTo(x, y);  
	// 跟上面的圆唯一的区别在这里,不画满圆,画个扇形  
	cts.arc(x, y, radius, Math.PI * 1.5, Math.PI * 1.5 -  Math.PI * 2 * process / 100, true);  
	cts.closePath();  
	cts.fillStyle = proColor;  
	cts.fill(); 
	
	//填充背景白色
	cts.beginPath();  
	cts.moveTo(x, y); 
	cts.arc(x, y, radius - (radius * 0.34), 0, Math.PI * 2, true);  
	cts.closePath();
	cts.fillStyle = 'rgba(255,255,255,9)';  
	cts.fill(); 

	// 画一条线  
	cts.beginPath();  
	cts.arc(x, y, radius-(radius*0.34), 0, Math.PI * 2, true);  
	cts.closePath();  
	// 与画实心圆的区别,fill是填充,stroke是画线  
	cts.strokeStyle = backColor;  
	cts.stroke();  
	  
	//在中间写字 
	cts.font = "9pt Arial";  
	cts.fillStyle='#333';
	cts.textAlign = 'center';  
	cts.textBaseline = 'middle';  
	cts.fillText(descText, x, y-10);
	/*
	cts.font = "bold 11pt Arial";  
	cts.fillStyle = fontColor;  
	cts.textAlign = 'center';  
	cts.textBaseline = 'middle';  
	//cts.moveTo(x, y); 
	cts.fillText(process+"%", x, y+10);  
	*/
	
}
function createProCanvas(){
	
	//第四个参数是进度参数：百分之多少，如60:即60%,其他几个参数固定写法，无需修改
	DrowProcess(72,72,64,pro_c,'#f6f6f6','#f1af27','#f1af27','proCanvas','生产进度');
	t=setTimeout("createProCanvas()",10);
		if(pro_c>=pro_percent)
		{
			clearTimeout(t);
			pro_c=0;
			return;
		}
		pro_c+=1;
	
}

function createPassCanvas(){
	
	//第四个参数是进度参数：百分之多少，如60:即60%,其他几个参数固定写法，无需修改
	
	DrowProcess(72,72,64,pass_c,'#f6f6f6','#8ec165','#8ec165','passCanvas','合格率');
	 t=setTimeout("createPassCanvas()",10);
		if(pass_c>=pass_percent)
		{
			clearTimeout(t);
			pass_c=0;
			return;
		}
		pass_c+=1;
		
}
//创建生产工期进度图表效果
//usedDay 已生产天数 ,totalDay 总工期天数,start_dt 开始时间（当开始生产时间大于计划开始时间时取计划开始时间，否则取开始生产时间）,end_dt 计划完工时间, beyondDay 超出天数,isAdvance 是否提前
function  create_prod_period(usedDay,plan_start,plan_complete,moreDays,isAdvance,iscomplete,state,completetime,totalDay,startDate,isBurew)
{
	var pro_object=$(".prod_period_wrap");
	$(".horizontal_bar_on a").html("");
	$(".horizontal_bar_red a").html("");
	var totalWidth=$(".horizontal_bar").width();
	//计算生产进度条的宽度
	if(state==15&&usedDay!=0&&usedDay!=null&&totalDay!=null&&totalDay!=0){
		//$("#imageshow").append('<img src="/resources/images/flag1.png"  title="实际开工时间:'+startDate+'">');
		pro_object.find(".dt_start_wrap").html("实际开工:"+startDate);
		pro_object.find(".dt_end_wrap").html("计划完工:"+plan_complete);
		var percent=usedDay/totalDay;
		$(".horizontal_bar_on").width(totalWidth*percent);
		if(usedDay>=1&&usedDay<10){
			$(".horizontal_bar_on a").html("<a href='javascript:void(0)' title='已生产"+usedDay+"天'>"+usedDay+"</a>");	
		}else{
		$(".horizontal_bar_on a").html("<a href='javascript:void(0)' title='已生产"+usedDay+"天'>"+usedDay+"天</a>");	
		}
	if(moreDays>0)
	{
		$(".horizontal_bar_red a").html("<a href='javascript:void(0)' title='已超原计划"+moreDays+"天'>"+moreDays+"天</a>");
		$(".horizontal_bar_red").width(40);
	}
	if(isBurew==true){			
			$(".horizontal_bar_on").css("background-color","red");
			$("#horizontal_bar_red").removeClass("horizontal_bar_red");
			pro_object.find(".dt_end_wrap").html("");
		}
	}else 	if((state==20||state==25||state==30)&&usedDay!=0&&usedDay!=null&&totalDay!=null&&totalDay!=0){//任务终结或取消
	//	$("#imageshow").append('<img src="/resources/images/flag1.png"  title="实际开工时间:'+startDate+'">');
		var percent=usedDay/totalDay;
		if(parseInt(totalWidth*percent)>=260){
			$("#imageshow").append('<img src="/resources/images/flag1.png" style="position:absolute;left:260px" title="实际完工时间:'+completetime+'">');
		}else{
			$("#imageshow").append('<img src="/resources/images/flag1.png" style="position:absolute;left:'+totalWidth*percent+'px" title="实际完工时间:'+completetime+'">');
		}
		pro_object.find(".dt_start_wrap").html("实际开工:"+startDate);
		$(".horizontal_bar_on").width(totalWidth*percent);
		$(".horizontal_bar_on a").html("<a href='javascript:void(0)' title='生产"+usedDay+"天'>"+usedDay+"天</a>");
		pro_object.find(".dt_end_wrap").html("计划完工:"+plan_complete);
		if(moreDays>0)
		{
			$(".horizontal_bar_red a").html("<a href='javascript:void(0)' title='已超原计划"+moreDays+"天'>"+moreDays+"天</a>");
			$(".horizontal_bar_red").width(40);
		}
		if(isBurew==true){			
			$(".horizontal_bar_on").css("background-color","red");
			$("#horizontal_bar_red").removeClass("horizontal_bar_red");
			pro_object.find(".dt_end_wrap").html("");
		}
	}else{
		pro_object.find(".dt_start_wrap").html("计划开工:"+plan_start);
		pro_object.find(".dt_end_wrap").html("计划完工:"+plan_complete);
		$("#horizontal_bar_red").removeClass("horizontal_bar_red");
	}
}
function canEdit()
{
	$(".line_wrap").hover(function(){
		$(this).find("a.edit").css("display","inline");
	},function(){
		$(this).find("a.edit").css("display","none");
	});
}
//加载供应商下拉框
function initCompanyList()
{
	var url="supplierRegaccountInfo/getSupplierNameList.do";
	var params={};
	params.apply_sts=15;
	params.is_delete=0;
	var fn=function(result)
	{
		$("#task_unit option").remove();
		//集合有数据
		if(result.data.length>0)
		{
			$.each(result.data,function(index,e){
				var option="<option value='"+e.company_id+"'>"+e.supplier_cpyname+"</option>";
				
				$("#task_unit").append(option);
			});
		}
		
	};
	asyncAjaxMethod(url,params,true,fn);
}
//显示质检按钮
function showqc(){
	var qc ='<li>'+
					'<a href="javascript:void(0)" onClick="go_deliveredInfo()">质检</a>'+
			'</li> ';
	$('#stateHeadbutton').append(qc);
}
