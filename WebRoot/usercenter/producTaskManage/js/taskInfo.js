	var taskid = getParamFromWindowName("task_id");
	/**
	 * 产量录入功能和成品发货
	 * @param state
	 */
	function stateTaskHead(state){
		var log ="";
		var button="";
		var connection="";
		
		if(state==15||state==20){
			$("#taskHeadButton").empty();
			log ='<span class="redcolor" id="show_unReceivedlogisticsCount">2</span>条来料信息，请及时'+
					'<a href="javascript:void(0)" onClick="go_logistics()" class="a_operate_link">确认收货</a>';
		 button ='<li>'+
		'<a href="javascript:void(0)" onClick="go_productionInfo()">产量录入</a>'+
		'</li>';
		 connection ='<p  style="color:#808080">如有疑问可<a href="javascript:void(0)" onClick="go_connection()" class="a_link_custom">给对方留言</a>直接沟通</p>';
	    $("#logHead").prepend(log);
		$("#taskHeadButton").prepend(button);
		$("#connectionHeads").after(connection);
		}
	}
	/**接受任务
	 * t_id*/
	function accept(t_id,rwdh){
		window.wxc.xcConfirm("您是否确认接收任务单"+rwdh, window.wxc.xcConfirm.typeEnum.confirm,
		{
			onOk:function(){
				var url="externalTask/updateTaskState2producting.do";
				var params={};
				params.t_id=t_id;
		   		var fn=function(result){
		   			//刷新当前页
		   			initHead();
		   		};
		   		asyncAjaxMethod(url,params,true,fn);
				
			}
		});
	}
	/**
	 * 接受任务单
	 * @param state
	 */
	function acceptOrder(state,t_id,rwdh){
		var info ="";	
		if(state==10){		
			info ='<li>'+
			'<a href="javascript:void(0)" onClick="accept('+t_id+',\''+rwdh+'\')">接受任务单</a>'+
			'</li>';
		}
		$("#taskHeadButton").prepend(info);
	}
	var tempLength = 0; //临时变量,当前移动的长度
	var viewNum = 3; //设置每次显示图片的个数量
	var moveNum = 1; //每次移动的数量
	var moveTime = 300; //移动速度,毫秒
	var scrollDiv;
	var scrollItems;
	var moveLength;
	var countLength;
	//生产进度百分比
	var pro_percent=0;
	//合格百分比
	var pass_percent=0;
	//计时器
	var pro_c=0;
	//计时器
	var pass_c=0;
	$(function(){
		initHead();
	});
	function initHead(){
		var task;
		var url="externalTask/getProductTaskByID.do";
		var params={};
		params.t_id=taskid;
   		var fn=function(result){
   			task=result.data;
   			//初始化任务条
			$("#producTaskStaticBar").taskStaticBar_init({type:2});
			$("#producTaskStaticBar").taskStaticBar_showByTask(task);
			/**
			 * 接受任务单
			 * @param state
			 */
			acceptOrder(task.state,task.t_id,task.rwdh);
			//初始化任务信息
			stateTaskHead(task.state);
			
			//状态
			$("#show_state").html(showstate(task.state));
			//未接受发货数量
			if(task.unReceivedlogisticsCount != 0 && (task.state ==15||task.state==20) && task.unReceivedlogisticsVoCount != 0 ){
				var log ='<p class="title_12s" id="logHead">'+
				'<span class="redcolor" id="show_unReceivedlogisticsVoCount"></span>条新的来料信息，'+
				'<span class="redcolor" id="show_unReceivedlogisticsCount"></span>条对方未收货信息，'+				
				'请及时'+
				'<a href="javascript:void(0)" onClick="go_logistics()" class="a_operate_link">查看信息</a></p>';
				  $("#connectionHeads").before(log);
			$("#show_unReceivedlogisticsCount").html(task.unReceivedlogisticsCount);
			$("#show_unReceivedlogisticsVoCount").html(task.unReceivedlogisticsVoCount);
			}
			//未接受发料数量
			if(task.unReceivedlogisticsCount == 0 &&task.unReceivedlogisticsVoCount != 0 && (task.state ==15||task.state==20)){
				var logvo = '<p class="title_12s" id="logHead">'+
				'<span class="redcolor" id="show_unReceivedlogisticsVoCount"></span>条新的来料信息，'+
				'请及时'+
				'<a href="javascript:void(0)" onClick="go_logistics()" class="a_operate_link">查看信息</a></p>';
				 $("#connectionHeads").before(logvo);
			$("#show_unReceivedlogisticsVoCount").html(task.unReceivedlogisticsVoCount);
			}
			if(task.unReceivedlogisticsCount != 0 &&task.unReceivedlogisticsVoCount == 0 && (task.state ==15||task.state==20)){
				var log ='<p class="title_12s" id="logHead">'+
				'<span class="redcolor" id="show_unReceivedlogisticsCount"></span>条对方未收货信息，'+		
				'请及时'+
				'<a href="javascript:void(0)" onClick="go_logistics()" class="a_operate_link">查看信息</a></p>';
				$("#connectionHeads").before(log);
				$("#show_unReceivedlogisticsCount").html(task.unReceivedlogisticsCount);
			}
			//质检方式
			var show_qc_type_str;
			if(task.qc_type==1){
				show_qc_type_str="入库后质检";
			}else if(task.qc_type==2){
				show_qc_type_str="入库前质检";
			}
			$("#show_qc_type").html(show_qc_type_str);
			//任务单名称
			$("#taskname_head").html("任务单:"+task.product_name);
			//任务单流水号
			$("#serialno_head").html(task.serial_no+"/"+task.rwdh+"("+task.ddh+")"+"/"+task.scdh);
			//产品名称
			$("#show_product_name").html(task.product_name);
			//数量
			$("#total_qty").html(task.total_qty);
			
			//派单日期
			if(task.send_time){
				$("#show_send_time").html(showBeforeOfDateStr(task.send_time));
			}
			//接收时间
			if(task.receive_time){
				$("#show_receive_time").html(showBeforeOfDateStr(task.receive_time));
			}
			//计划开工完工日期
			$("#show_plan_start").html(showBeforeOfDateStr(task.plan_start));
			$("#show_plan_complete").html(showBeforeOfDateStr(task.plan_complete));
			//派单单位
			$("#show_send_company_name").html(replaceNullAsStr(task.send_company_name));
			//备注说明
			$("#task_remark").html(task.remark);
			
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
			var plan_complete=showBeforeOfDateStr(task.plan_complete);
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
		
			if(task.finish_product_time!=null&&task.finish_product_time!=""){
				completetime=showBeforeOfDateStr(task.finish_product_time);//实际完工时间
				usedDay=dateDiff(completetime,startDate)+1;//为实际的生产时间
				usedDay=usedDay>0?usedDay:0;
				moreDays=dateDiff(completetime,plan_complete);//超出天数
				moreDays=moreDays>0?moreDays:0;
				iscomplete=true;								
			}else if(task.first_start_time!=""&&task.first_start_time!=null&&(task.finish_product_time==null||task.finish_product_time=="")){
				usedDay=dateDiff(completedate,startDate)+1;//已生产天数
				usedDay=usedDay>0?usedDay:0;
				moreDays=dateDiff(completedate,plan_complete);//超出天数
				moreDays=moreDays>0?moreDays:0;
			}											
			var allDay=dateDiff(plan_complete,plan_start);
			if(moreDays>0){	
				if((task.state==5||task.state==10)&&task.first_start_time==null){
					$(".horizontal_bar_red").css("display","none");
				}
			}else{
				$(".horizontal_bar_red").css("display","none");
			}
			create_prod_period(usedDay,plan_start,plan_complete,moreDays,isAdvance,iscomplete,task.state,completetime,allDay,startDate,isBurew);
   		};
   		asyncAjaxMethod(url,params,true,fn);		
		
		
	}
	/**按照状态位显示状态
	*/
	function showstate(state){
		var result;
		switch(state){
			case 10:
				result="等待接受";
				break;
			case 15:
				result="生产中";
				break;
			case 20:
				result="在验收";
				break;
			case 25:
				result="已完结";
				break;
			case 40:
				result="已终止";
				showEnd();//显示终止详情按钮
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
	//显示终止详情按钮
	function showEnd(){
		$("#connectionHeads").next("p").remove();
		 var stop =
	        '<p class="mt10 mr10"><a href="javascript:void(0)" class="a_link_custom" onClick="showEndReason()">终止详情</a></p>';			
	 $("#connectionHeads").after(stop);//任务单的取消按钮
	}
	/**
	 * 查看终止原因
	* showEndReason
	* @return void
	* @author chenlong
	* 2016-11-25
	 */
	function showEndReason(){
		var url = "externalTask/getTaskEndRecord.do";
		var params ={t_id:taskid};
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
	/**
	 * 预览图的显示
	 */
	function taskImgView(file_type,tf_id){//对参数进行一定加密的处理
		var URIstring = getwebroot()+"externalTask/producTaskImgView.htm?taskid="+taskid+"&file="+"&@*"+"&&file_type="+file_type+"&&tf_id="+tf_id;
		var paraString = URIstring.substring(URIstring.indexOf("?")+1,URIstring.length); 
		var rul=URIstring.substring(0,URIstring.indexOf("?")+1)+escape(paraString);//对参数的处理
		window.open(rul);
	}
	
	
	/**
	 * 视频的播放
	 */
	function taskVideoView(file_type,tf_id){
		var URIstring = getwebroot()+"externalTask/producTaskVideoView.htm?taskid="+taskid+"&file="+"&#*"+"&&file_type="+file_type+"&&tf_id="+tf_id+"";
		var paraString = URIstring.substring(URIstring.indexOf("?")+1,URIstring.length); 
		var rul=URIstring.substring(0,URIstring.indexOf("?")+1)+escape(paraString);//对参数的处理
		window.open(rul);
	}
	function go_tasklist()
    {
	window.location.href=getwebroot()+"/externalTask/producTaskList.htm";
    }
	function go_logistics()
	{
		var param ={"task_id":taskid};
		addParamsToWindowName(param);
		var URIstring = getwebroot()+"externalTask/producLogisticsInfo/"+taskid+".htm";
		window.location.href=URIstring;
	}
	function go_productionInfo(){
		var param ={"task_id":taskid};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"externalTask/producProductionInfo/"+taskid+".htm";
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
	//显示图片
	function showPic(obj)
	{
		
			var img_a=$(obj).prev();
			$(img_a).attr("href","www.baidu.com");
			$(img_a).find("img").attr("src","/newresources/images/company_1.png");
			$(img_a).find("img").css("width","100%");
	}
	
		
	function scrollImg()
	{
		scrollDiv = $(".spec-scroll .items ul"); //进行移动动画的容器
		scrollItems = $(".spec-scroll .items ul li"); //移动容器里的集合
		 moveLength = scrollItems.eq(0).width() * moveNum; //计算每次移动的长度
		countLength = (scrollItems.length - viewNum) * scrollItems.eq(0).width(); //计算总长度,总个数*单个长度
		$(".spec-scroll .items ul").width(scrollItems.length* (scrollItems.eq(0).width()));
		//下一张
		$(".spec-scroll .next").bind("click",function(){
			if(tempLength < countLength){
				if((countLength - tempLength) > moveLength){
					scrollDiv.animate({left:"-=" + moveLength + "px"}, moveTime);
					tempLength += moveLength;
				}else{
					scrollDiv.animate({left:"-=" + (countLength - tempLength) + "px"}, moveTime);
					tempLength += (countLength - tempLength);
				}
			}
		});
		//上一张
		$(".spec-scroll .prev").bind("click",function(){
			if(tempLength > 0){
				if(tempLength > moveLength){
					scrollDiv.animate({left: "+=" + moveLength + "px"}, moveTime);
					tempLength -= moveLength;
				}else{
					scrollDiv.animate({left: "+=" + tempLength + "px"}, moveTime);
					tempLength = 0;
				}
			}
		});
	}
	
	//Tab控制函数
	function tabs(tabId, tabNum){
		//设置点击后的切换样式
		$(tabId + " .tab li").removeClass("curr");
		$(tabId + " .tab li").eq(tabNum).addClass("curr");
		//根据参数决定显示内容
		$(tabId + " .tabcon").hide();
		$(tabId + " .tabcon").eq(tabNum).show();
	}
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
	/**创建生产工期进度图表效果
	prodDay 已生产天数 ,
	totalDay 总工期天数,
	start_dt 开始时间（当开始生产时间大于计划开始时间时取计划开始时间，否则取开始生产时间）,
	end_dt 计划完工时间,
	 beyondDay 超出天数,
	 isAdvance 是否提前 （true提前；false未提前）*/
	//创建生产工期进度图表效果
	//usedDay 已生产天数 ,totalDay 总工期天数,start_dt 开始时间（当开始生产时间大于计划开始时间时取计划开始时间，否则取开始生产时间）,end_dt 计划完工时间, beyondDay 超出天数,isAdvance 是否提前
	function  create_prod_period(usedDay,plan_start,plan_complete,moreDays,isAdvance,iscomplete,state,completetime,totalDay,startDate,isBurew)
	{
		var pro_object=$(".prod_period_wrap");
		$(".horizontal_bar_on a").html("");
		$(".horizontal_bar_red a").html("");
		var totalWidth=$(".horizontal_bar").width();
		//计算生产进度条的宽度
		if(state==15&&usedDay!=0&&usedDay!=null&&totalDay!=null&&totalDay!=0){//任务生产开始	
		//	$("#imageshow").append('<img src="/resources/images/flag1.png"  title="实际开工时间:'+startDate+'">');
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
			//$("#imageshow").append('<img src="/resources/images/flag1.png"  title="实际开工时间:'+startDate+'">');
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
	/**
	 * 加载，和产品图,任务单主图,材料清单
	 */	
$(function(){
	productImg();
	ProductMainFile();
	Bomlist();
});
/**
 * 任务单列表图
 */
function productImg(){
	var url = 'taskFile/getTaskFileListForProducer.do';
	var params={};
	params.t_id=taskid;
	params.file_type=8;
	var fn=function(result){
			
			$("#pro_product_ul_file").empty();//清空下面的数据
			var imagelist = result.data;
			var length = imagelist.length;
			var imageItem="";
			if(length == 0){
				imageItem =imageItem+
				'<li>'+
				'<div class="image_block_pic">'+
				'<a><img src="/newresources/images/imageempty.png"/></a>'+
			'</div>'+
		'</li>';
				
			}else{			
			for(var i=0;i<length;i++){
				var image=imagelist[i];
				var newsrc = null;
				if (image.object_id==null){
					window.wxc.xcConfirm("文件的图片名称为:"+image.file_name+"的文件未上传文件");	
				}else{
				 newsrc=getwebroot()+"taskFile/downLoadFileFormMongoForProducer.do?file="+image.object_id;
				}
				
				imageItem =imageItem+
				'<li>'+
				'<div class="image_block_pic">'+
				'<a style="cursor:pointer"><img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView(8,'+image.tf_id+')"/></a>'+
			'</div>'+
		'</li>';
			}
			}
			$("#pro_product_ul_file").html(imageItem);
			scrollImg();
			 };
			 asyncAjaxMethod(url,params,true,fn); 
}
/**
 * 任务单主图图片
 */
function ProductMainFile(){
	var url = 'taskFile/getTaskFileListForProducer.do';
	var params={};
	params.t_id=taskid;
	params.file_type=7;
	var fn=function(result){
			var imagelist = result.data;
			var length = imagelist.length;
			var s_in ="";
			if(length == 0){
				s_in = '<a><img src="/newresources/images/imageempty.png"/></a>';
			}else{		
			for(var i=0;i<length;i++){
				var image=imagelist[i];
				var newsrc = null;				
				newsrc=getwebroot()+"taskFile/downLoadFileFormMongoForProducer.do?file="+image.object_id;				
				$("#pro_prcmain_img").empty();
        		 s_in = '<a style="cursor:pointer"><img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView(7)"/></a>';					    		        		      					
			}
			}
			$("#pro_prcmain_img").html(s_in); 
			};
			 asyncAjaxMethod(url,params,true,fn); 
}
//Tab控制函数
function tabs(tabId, tabNum){
	//设置点击后的切换样式
	$(tabId + " .tab li").removeClass("curr");
	$(tabId + " .tab li").eq(tabNum).addClass("curr");
	//根据参数决定显示内容
	switch(tabNum){
	case 0:
		fileQcFileList();
	    break;
	case 1:
		fileLoadList();
		fileLoadOtherList();
		fileLoadViewList();
		fileOperationList();
		break;	
	case 2:
		Prolist();
		break;
	case 3:
		Bomlist();
		break;
	case 4:		
		break;
		
	
	}
	$(tabId + " .tabcon").hide();
	$(tabId + " .tabcon").eq(tabNum).show();
}
/**
 * 加载质检标准文件信息
 */
function fileQcFileList(){	
	var url = 'taskFile/getTaskFileListForProducer.do';
	var params={};
	params.t_id=taskid;
	params.file_type=6;
	var fn=function(result){
			
			$("#pro_QcFileList_show").empty();
			var QcFilelist = result.data;
			var length = QcFilelist.length;
			if(length == 0){
				return;
			}
			var QcFileItem="";
			for(var i=0;i<length;i++){
				qcfile = QcFilelist[i];
				if(qcfile.file_name != null){
					var file_name = qcfile.file_name;
					file_name = strVachar(file_name,67);
					}
				if(qcfile.remark != null){
					var remark = qcfile.remark;
					remark = strVachar(remark,19);
				}
				QcFileItem =QcFileItem+
				'<tr>'+
				'<td class="left"><a style="text-decoration:underline" onClick="LoadFileinfo('+((qcfile.tf_id==null)?"":qcfile.tf_id)+')" title="'+((qcfile.file_name==null)?"":qcfile.file_name)+'" href="javascript:void(0)">'+((qcfile.file_name==null)?"":(file_name+(qcfile.suffix_name==null?"":qcfile.suffix_name)))+'</a></td>'+
				
				'<td class="left">'+
				    '<label class="color777">'+((qcfile.file_time==null)?"":qcfile.file_time)+'</label>'+
					'<label class="remark" title="'+((qcfile.remark==null)?"":qcfile.remark)+'">'+((qcfile.remark==null)?"":remark)+'</label>' +
				'</td>'+
				'<td align="right"><img onClick="LoadFileinfo('+((qcfile.tf_id==null)?"":qcfile.tf_id)+')" src="/newresources/images/other/down.png" /></td>'+			
			'</tr>'	;
			}
			$("#pro_QcFileList_show").html(QcFileItem);
			 };
			 asyncAjaxMethod(url,params,true,fn);
}
/**
 * 加载工艺文件图片信息
 */
function fileLoadList(){
	var url = 'taskFile/getTaskFileListForProducer.do';
	var params={};
	params.t_id=taskid;
	params.file_type=1;
	var fn=function(result){ 
			$("#pro_image_file_list").empty();
			var imagelist = result.data;
			var length = imagelist.length;
			if(length == 0){
				return;
			}
			var imageItem0="";			
			for(var i=0;i<length;i++){
				var imageItem="";
				var image=imagelist[i];
				var newsrc = null;
				if (image.object_id==null){
					window.wxc.xcConfirm("工艺文件的图片名称为:"+image.file_name+"的文件未上传文件");	
				}else{
				 newsrc=getwebroot()+"taskFile/downLoadFileFormMongoForProducer.do?file="+image.object_id;
				}
				if(image.file_name != null){
					var file_name = image.file_name;
					file_name = strVachar(file_name,25);				
					}
				if(image.remark != null){
					var remark = image.remark;
					remark = strVachar(remark,25);				
					}
				if(parseInt(image.is_delete)==0){
				imageItem =imageItem+
				'<li>'+
				'<div class="image_block_pic">'+
					'<a style="cursor:pointer"><img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView(1,'+image.tf_id+')"/></a>'+
					
				'</div>'+
				'<div class="edit_div clearfix">'+
					'<p><label title="'+((image.file_name==null)?"":image.file_name)+'">'+((image.file_name==null)?"":file_name)+'</label></p>'+
					'<label title="'+((image.remark==null)?"":image.remark)+'">'+((image.remark==null)?"":remark)+'</label>'+
					'<p><span class="l_span color777 fs10">'+((image.file_time==null?"":image.file_time))+'</span></p>'+				
				'</div>'+
			'</li>';
				}else{
					imageItem =imageItem+
					'<li>'+
					 '<div class="image_block_pic" style="cursor:pointer">'+
					  '<img src="'+((newsrc==null)?"":newsrc)+'" >'+
					 '<div class="invalidWrap" style="display: block;">'+
					 '<div class="b_bg"></div>'+
					  '<img class="invalid" src="/newresources/images/tasks/invalid.png">'+
					 '</div>'+
					 '</div>'+
					 '<div class="edit_div clearfix">'+
					  '<p>'+
					   '<label title="'+((image.file_name==null)?"":image.file_name)+'">'+file_name+'</label>	'	+			
					  '</p>'	+
					  '<label title="'+((image.remark==null)?"":image.remark)+'">'+((image.remark==null)?"":remark)+'</label>' +
					  '<p>'+
					   '<span class="l_span c999 fs10">'+((image.file_time==null?"":image.file_time))+'</span>'+
					  '</p>'+
					 '</div>'+
					'</li>';
				}
				imageItem0 = imageItem0 + imageItem;			
			}
			$("#pro_image_file_list").html(imageItem0);
			};
			asyncAjaxMethod(url,params,true,fn); 
}
/**
 * 加载工艺文件其他文件信息
 */
function fileLoadOtherList(){
	var url = 'taskFile/getTaskFileListForProducer.do';
	var params={};
	params.t_id=taskid;
	params.file_type=2;
	var fn=function(result){	
		    $("#pro_other_file_list1").empty();
		    $("#pro_other_file_list2").empty();
			$("#pro_other_file_list").empty();
			var otherlist = result.data;
			var length = otherlist.length;
			if(length == 0){
				return;
			}
			var otherItem0="";
			var otherItem1 = "";
			var otherItem2 = "";
			other_rowCount=1;
			for(var i=0;i<length;i++){
				var otherItem = "";
				var other=otherlist[i];
				if(other.file_name != null){
					var file_name = other.file_name;
					file_name = strVachar(file_name,67);
					}
				if(other.remark != null){
					var remark = other.remark;
					remark = strVachar(remark,19);
				}
				if(parseInt(other.is_delete)==0){
				otherItem =otherItem+
				'<tr>'+
				'<td class="left"><a style="text-decoration:underline" onClick="LoadFileinfo('+((other.tf_id==null)?"":other.tf_id)+')" title="'+((other.file_name==null)?"":other.file_name)+'" href="javascript:void(0)">'+((other.file_name==null)?"":(file_name+(other.suffix_name==null?"":other.suffix_name)))+'</a></td>'+
				//'<td class="left" onClick="LoadFileinfo('+((other.tf_id==null)?"":other.tf_id)+')" title="'+((other.file_name==null)?"":other.file_name)+'" style=\"text-align:left;\">'+((other.file_name==null)?"":(file_name+(other.suffix_name==null?"":other.suffix_name)))+'</td>'+			
				'<td class="left">' +
				'<label class="color777">'+((other.file_time==null)?"":other.file_time)+'</label>'+
				'<label style="display:block" class="remark"  title="'+((other.remark==null)?"":other.remark)+'">'+((other.remark==null)?"":remark)+'</label></td>'+
				'<td align="right"><img onClick ="LoadFileinfo('+((other.tf_id==null)?"":other.tf_id)+')" src="/newresources/images/other/down.png" /></td>'+
			'</tr>';
				}else{
					otherItem = otherItem+
				 '<tr style="text-decoration:line-through;color:#999">'+
					'<td class="left">'+
					'【已作废】<span class="ml10">'+file_name+other.suffix_name+'</span>'+
					'</td>'+
					'<td class="left">'+
					'<span class="color777">'+replaceNullAsStr(other.file_time)+'</span>'+
					'<span class="remark" style="display:block" title="'+replaceNullAsStr(other.remark)+'" href="javascript:void(0)">'+strVachar(other.remark,19)+'</span>'+
					'</td>'+
					'<td></td>'+
				'</tr>';
				}
				if(parseInt(other.file_type) == 2){	
					otherItem0 = otherItem0 + otherItem;
				}else if(parseInt(other.file_type) == 45){
					otherItem1 = otherItem1 + otherItem;
				}else if(parseInt(other.file_type) == 46){
					otherItem2 = otherItem2 + otherItem;
				}
			}
			$("#pro_other_file_list").html(otherItem0);
			$("#pro_other_file_list1").html(otherItem1);
			$("#pro_other_file_list2").html(otherItem2);
	};	
	asyncAjaxMethod(url,params,true,fn); 
}
/**
 * 下载文件
 */
function LoadFileinfo(tf_id){
	var params ={};
	params.tf_id = tf_id;
	var url = "taskFile/getTaskFileForProducer.do";
	var fn= function(result){
		var filename = result.data.object_id;
		if(filename!=null){
			window.open(getwebroot()+'taskFile/downLoadFileFormMongoForProducer.do?file='+filename, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');	
		}else{
			window.wxc.xcConfirm("该条文件信息中不存在文件,请联系管理员");
		}	
	};
	asyncAjaxMethod(url,params,true,fn); 		
}
/**
 * 加载工艺文件视频文件信息
 */
function fileLoadViewList(){
	var url = 'taskFile/getTaskFileListForProducer.do';
	var params={};
	params.t_id=taskid;
	params.file_type=3;
	var fn=function(result){	
			$("#pro_view_file_list").empty();
			var viewlist = result.data;
			var length = viewlist.length;
			if(length == 0){
				return;
			}
			var viewItem = "";		
			for(var i=0;i<length;i++){
				var view=viewlist[i];
				var newsrc = null;
				if(view.file_name != null){
					var file_name = view.file_name;
					file_name = strVachar(file_name,25);				
					}
				if(view.remark != null){
					var remark = view.remark;
					remark = strVachar(remark,25);				
					}
				
				    var newsrc =getwebroot()+"taskFile/downLoadFileFormMongoForProducer.do?file="+view.object_id;
					var picShowForVideo = '<a><img src="'+(newsrc==null?"":newsrc)+'"  /><a/>';							
				if(parseInt(view.is_delete)==0){
				viewItem =viewItem+
				'<li>'+
				'<div class="image_block_pic">'+
				   	'<a class="video_a" onclick="taskVideoView(3,'+view.tf_id+')"></a>'+
				   	picShowForVideo+
				'</div>'+
				'<div class="edit_div clearfix">'+
					'<p><label title="'+((view.file_name==null)?"":view.file_name)+'">'+((view.file_name==null)?"":file_name)+'</label></p>' +
				 	'<label title="'+((view.remark==null)?"":view.remark)+'">'+((view.remark==null)?"":remark)+'</label>'+
				 	'<p><span class="l_span color777 fs10">'+((view.file_time==null?"":view.file_time))+'</span></p>'+
					
				'</div>'+
			'</li>';
				}else{
					viewItem =viewItem+
					'<li>'+
					 '<div class="image_block_pic" style="cursor:pointer">'+
					  '<img src="'+(newsrc==null?"":newsrc)+'" >'+
					 '<div class="invalidWrap" style="display: block;">'+
					 '<div class="b_bg"></div>'+
					  '<img class="invalid" src="/newresources/images/tasks/invalid.png">'+
					 '</div>'+
					 '</div>'+
					 '<div class="edit_div clearfix">'+
					  '<p>'+
					   '<label title="'+((view.file_name==null)?"":view.file_name)+'">'+file_name+'</label>	'	+			
					  '</p>'	+
					  '<label title="'+((view.remark==null)?"":view.remark)+'">'+((view.remark==null)?"":remark)+'</label>' +
					  '<p>'+
					   '<span class="l_span color777 fs10">'+((view.file_time==null?"":view.file_time))+'</span>'+
					  '</p>'+
					 '</div>'+
					'</li>';
				}
			}
			$("#pro_view_file_list").html(viewItem);
			};
	 asyncAjaxMethod(url,params,true,fn);
}
/**
 * 加载作业指导文件信息
 */
function fileOperationList(){
	var url = 'taskFile/getTaskFileListForProducer.do';
	var params={};
	params.t_id=taskid;
	params.file_type=5;
	var fn=function(result){
			$("#pro_operation_file_list").empty();
			var operationlist = result.data;
			var length = operationlist.length;
			if(length == 0){
				return;
			}
			var operationItem="";		
				var operation=operationlist[0];
				if(operation.file_name != null){
					var file_name = operation.file_name;
					file_name = strVachar(file_name,67);
					}
				if(operation.remark != null){
					var remark = operation.remark;
					remark = strVachar(remark,19);
				}
				operationItem =operationItem+			
                '<tr>' +
					'<td class="left"><a style="text-decoration:underline" onClick="LoadFileinfo('+((operation.tf_id==null)?"":operation.tf_id)+')" title="'+((operation.file_name==null)?"":operation.file_name)+'" href="javascript:void(0)">'+((operation.file_name==null)?"":(file_name+(operation.suffix_name==null?"":operation.suffix_name)))+'</a></td>' +										
					'<td  class="left">'+
					'<label class="color777">'+operation.file_time+'</label>' +
					'<label class="remark" title="'+((operation.remark==null)?"":operation.remark)+'" href="javascript:void(0)">'+((operation.remark==null)?"":remark)+'</label></td>' +
					'<td><img class="del" onClick="LoadFileinfo('+((operation.tf_id==null)?"":operation.tf_id)+')" src="/newresources/images/other/down.png" /></td>'+
					'</tr>';			
			$("#pro_operation_file_list").html(operationItem);
			};
			 asyncAjaxMethod(url,params,true,fn);
}
/**
 * 加载额定工时
 */
function Prolist(){
	var url = 'process/getTaskProcessListForProducer.do';
	var params={};
	params.t_id=taskid;
	var fn=function(result){	
			$("#pro_processTable tr:gt(0)").empty();
			var prolist = result.data;
			var length = prolist.length;
			if(length == 0){
				return;
			}
			var proItem="";
			for(var i=0;i<length;i++){
			var pro =prolist[i];	
			proItem = proItem+
			'<tr>'+
			'<td>'+((pro.order_no==null)?"":pro.order_no)+'</td>'+
			'<td style=\"text-align:left;\">'+((pro.process_name==null)?"":pro.process_name)+'</td>'+
			'<td>'+((pro.stand_time==null)?"":pro.stand_time)+'</td>'+
		'</tr>';
			}
			$(proItem).insertAfter("#pro_Processlistup");
			};
			asyncAjaxMethod(url,params,true,fn);
}
/**
 * 加载材料清单
 */
function Bomlist(){
	var url = 'taskBom/getTaskBomListForProducer.do';
	var params={};
	params.t_id=taskid;
	var fn=function(result){
			$("#pro_bomTable tr:gt(0)").empty();
			var bomlist = result.data;
			var length = bomlist.length;
			if(length == 0){
				return;
			}
			var bomItem="";
			for(var i=0;i<length;i++){
			var bom =bomlist[i];	
		    bomItem = bomItem+
			'<tr>'+
			'<td>'+((bom.order_no==null)?"":bom.order_no)+'</td>'+
			'<td  style=\"text-align:left;\">'+((bom.material==null)?"":bom.material)+'</td>'+
			'<td>'+((bom.consumption==null)?"":bom.consumption)+'</td>'+
			'<td>'+((bom.unit==null)?"":bom.unit)+'</td>'+
			'<td>'+((bom.total_consumption==null)?"":bom.total_consumption)+'</td>'+
		'</tr>';
			}
			$(bomItem).insertAfter("#pro_Bomlistup");
			};	
			asyncAjaxMethod(url,params,true,fn);
}
/**展现滚动条
 * showScroll
 * @param e void
 * @author wangjialin
 * 2016-10-18 下午1:30:03
 */
function showScroll(e){
	$(e).parent().prev('.fileTableWrap').niceScroll({
		cursorcolor: "#ccc", //#CC0071 光标颜色 
		cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
		touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
		cursorwidth: "5px", //像素光标的宽度 
		cursorborder: "0", //     游标边框css定义 
		cursorborderradius: "5px", //以像素为光标边界半径 
		autohidemode: false //是否隐藏滚动条 
	});
	$(e).hide();
}