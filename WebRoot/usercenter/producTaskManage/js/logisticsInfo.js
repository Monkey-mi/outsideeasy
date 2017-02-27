// var urlPara = location.search; //获取参数部分
// urlPara=unescape(urlPara);//对参数解密
// function getPara(paraName){ 
//	 var reg = new RegExp("[&|?]"+paraName+"=([^&$]*)", "gi"); 
//	 var a = reg.test(urlPara); 
//	 return a ? RegExp.$1 : ""; 
//	 } 
////捕获参数并进行操作 
//
//
//   var taskid= getPara("taskid"); //捕获到url参数 
var taskid = getParamFromWindowName("task_id");
var company_id = getParamFromWindowName("companyIdForAll");
var editflag =false;//是否是编辑 的标记 true代表是编辑事件
//当前所在页
var currentpage=0;
var create_dt=new Date().Format("yyyy-MM-dd HH:mm:ss");
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

var state ="";
	$(function(){
		var task;
		var url="externalTask/getProductTaskByID.do";
		var params={};
		params.t_id=taskid;
   		var fn=function(result){
   			task=result.data;
   			state =task.state;
   			stateLoisgisticsInfo(task.state);
   			searchlogistics(task.state);	
   		    //任务单名称
			$("#taskname_head").html("任务单:"+task.product_name);
			//任务单流水号
			$("#serialno_head").html(task.serial_no+"/"+task.rwdh+"("+task.ddh+")"+"/"+task.scdh);
   			//初始化任务条
			$("#producTaskStaticBar").taskStaticBar_init({type:2});
			$("#producTaskStaticBar").taskStaticBar_showByTask(task);
   		};
   		asyncAjaxMethod(url,params,true,fn);
   			
   		$(".input_wrap").on("focus",function(){
			var id=$(this).attr("id");	
			var info_str = "";				
		});				
		$(".input_wrap").on("blur",function(){
			var id=$(this).attr("id");
			var error_str="";
			if(id=="start_date"){
		    }else{
			error_str = informationvo(this,"");
		    }
			if(error_str!="")
			{
				$(this).nextAll(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
				$(this).nextAll(".info_explain_wrap").fadeIn("fast");
			}
			else
			{
				if(id!="start_date"){
				$(this).nextAll(".info_explain_wrap").fadeOut("fast");
				}
			}
		});
	});
	
	/**
	 * 验证发货量是否小于产量
	 * @author chenglong
	 */
	function regTaskproduct(value){
		var url="externalTask/regTaskproduct.do";
		var params ={};	
		params.t_id = taskid;
		params.send_count = value;
		var fn=function(result){
			  if(result.message=="发送的货物量大于您所生产的量,请重新输入"){			  
						$("#send_count").nextAll(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+result.message+"</span>");
						$("#send_count").nextAll(".info_explain_wrap").fadeIn("fast");			
			  }if(result.message == "成功"){	
				        $("#send_count").nextAll(".info_explain_wrap").html("");
						$("#send_count").nextAll(".info_explain_wrap").fadeOut("fast");
			  }			  
			};
			 asyncAjaxMethod(url,params,true,fn);
	}
	/**
	 * 验证任务单号是否重复
	 * @author chenglong
	 */
	function regSendId(value){
		var url="taskLogistics/regSendIdForProducer.do";
		var params ={};	
		params.t_id = taskid;
		params.company_id = company_id;
		params.send_id = value;
		var fn=function(result){
			  if(result.message=="任务单号重复"){			  
						$("#send_id").nextAll(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>批次编号重复</span>");
						$("#send_id").nextAll(".info_explain_wrap").fadeIn("fast");			
			  }if(result.message == "成功"){	
				        $("#send_id").nextAll(".info_explain_wrap").html("");
						$("#send_id").nextAll(".info_explain_wrap").fadeOut("fast");
			  }			  
			};
			 asyncAjaxMethod(url,params,true,fn);
	}
	/**
	 * 验证字段值
	 * @param id
	 * @param value
	 * @returns {String}
	 */
	function information(id,value){
		var number_reg=/^(0|[1-9][0-9]*)$/;//数字
		var phone_reg =/^1[3|4|5|8][0-9]\d{4,8}$/;//手机号
	    var icence_reg=/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;//车牌号
		var error_str ="";								
		  if(id=="driver")
			{
					if(value=="")
				{					
					error_str="司机名不能为空";	
				}
				else if(value.length>10){
					error_str="司机名长度不能超过10";
				}		
			}
		 if(id=="start_date")
			{
					if(value=="")
				{		
					error_str="发货日期不能为空";
				}		
			}
		 if(id=="licence_plate")
			{
					if(value=="")
				{
					error_str="车牌号不能为空";
				}else if(!icence_reg.test(value)){
					error_str="车牌号格式不正确";
				}else if(value.length>10){
					error_str="车牌号长度不能超过10";
				}
			}
		if(id=="send_id")
			{
					if(value=="")
				{
					error_str="发料单号不能为空";
				}else if(value.length>40){
					error_str="发料单号长度不能超过40";
				}else {
				    regSendId(value);//验证是否重复	
				}
			}
	   if(id=="phone_number")
			{
				if(value=="")
			{
				error_str="手机号不能为空";
			}else if(!phone_reg.test(value)){
				error_str="手机号格式不正确";
			}else if(value.length>20){
				error_str="手机号号长度不能超过20";
			}
		    }
	    if(id=="send_count")
			{	    	
				if(value==""||parseInt(value)==0)
			{
				error_str="发货数量不能为空或为0";
			}else if(!number_reg.test(value))
			{
				error_str="发货数量的必须为数字";
			}else if(value.length>20){
				error_str="发货数量长度不能超过20";
			}else
			{
				if(!editflag){
				regTaskproduct(value);//验证是否大于生产量
				}
			}
		    }
	    if(id=="remark")
			{		
			 if(value.length>200){
				error_str="备注长度不能超过200";
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
		editflag = false;
		var id="";
		var error_str ="";
		var value ="";
		if(inp!=""){//失去焦点时的检测
	    id=$(inp).attr("id");  
		value=$(inp).val().trim();
		error_str = information(id,value);
		
		}else if(params!=""){//提交时检测，把数组中的key值和value取出来,方便做验证
			var i=0;
			for(var key in params){
				if(params.hasOwnProperty(key)){
					id=key;
					i++;
					value =params[key];
					error_str =information(id,value);
					if(error_str != ""){	
						if(key=="remark"){
							window.wxc.xcConfirm(error_str);
							break;
						}else{
							$("#"+key).nextAll(".info_explain_wrap").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span>");
							$("#"+key).nextAll(".info_explain_wrap").fadeIn("fast");
							break;
						}
					}			
				}
			}			
		}
	   return error_str;
	}
	function go_tasklist()
    {
	window.location.href=getwebroot()+"externalTask/producTaskList.htm";
    }
	function go_taskInfo(){
		var param ={"task_id":taskid};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"externalTask/producTaskInfo/"+taskid+".htm";
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
	/**
 * 根据状态控制物流信息的各个按钮
 * @param state
 * 
 */
function stateLoisgisticsInfo(){
	switch(parseInt(state)){
	case 10:
	//	stateLoisgisticsButtonHide();//显示物流无法新增
		addDisable();//不能够编辑input标签
		break;
	case 15:
		stateLoisgisticsButtonShow();//显示物流新增按钮
		stateLoisgisticsimgShow();//显示上传图片的按钮
		break;
	case 20:
		stateLoisgisticsButtonShow();//显示物流新增按钮	
		stateLoisgisticsimgShow();//显示上传图片的按钮
		break;
	case 25:
	//	stateLoisgisticsButtonHide();//显示物流无法新增
	//	addinputDisble();//不能够编辑input标签
		break;
	case 30:
	//	stateLoisgisticsButtonHide();//显示物流无法新增
		addDisable();//不能够编辑input标签
		break;	
	}
}
/**
 * 输入框变化才能无法输入
 *//*
function addinputDisble(){
	document.getElementById("driver").disabled="disabled";
	document.getElementById("start_date").disabled="disabled";
	document.getElementById("licence_plate").disabled="disabled";
	document.getElementById("send_id").disabled="disabled";
	document.getElementById("send_count").disabled="disabled";
	document.getElementById("phone_number").disabled="disabled";
	document.getElementById("remark").disabled="disabled";
}*/
/**
 * 不能够编辑input标签
 */
function addDisable(){
	//addinputDisble();//输入变成无法输入
	//document.getElementById("pro_logistics_come").disabled="disabled";
	document.getElementById("pro_logistics_state").disabled="disabled";
	document.getElementById("pro_logistics_start_time").disabled="disabled";
	document.getElementById("pro_search").disabled="disabled";
	document.getElementById("pro_logistics_end_time").disabled="disabled";	
	document.getElementById("buttonsea").disabled="disabled";	
}
//显示物流新增按钮
function stateLoisgisticsButtonShow(){
	var LoisgisticsButton = 
	'<button class="sub_button" onClick="addlogisticsInfovo()">保存</button>';
	$("#add_submit_wrap").html(LoisgisticsButton);
}
//显示物流新增文件按钮
function stateLoisgisticsimgShow(){
	var Loisgisticsimg = 
		'<div class="upload_wrap">'+
	'<div class="relat_div">'+
		'<button class="upload_button">添加图片</button>'+
		'<input class="uploadfile_input" type="file" name="file" id="uploadelogimg" onchange="addlogisticImg(this)">'+
	'</div>'+
    '</div>'+
      '<ul class="logistics_img_ul ml10" id="uplogisticsimg_list">'+	
      '</ul>';  
	$("#comm_img_wrap").html(Loisgisticsimg);
}
//显示物流无法新增
function stateLoisgisticsButtonHide(){
	var LoisgisticsButton = 
		'<button class="disabled_btn" disabled="disabled" title="物流现在无法新增">新增</button>';
	$("#add_submit_wrap").html(LoisgisticsButton);
}


var pageSize = 8;//每页个数	
var currentPage=0;//当前页码
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
params.t_id=taskid;
params.company_id = company_id;
params.tpye = 1;
params.state=param.state;
params.startTime=param.startTime;
params.endTime=param.endTime;
params.search=param.search;

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

	$("#pro_pagination").pagination(totalCount, {
         callback: pageselectCallback,
         prev_text: "<",
         next_text: ">",
         items_per_page: pageSize, //每页的数据个数
         num_display_entries: 3, //两侧首尾分页条目数
         current_page: 0,   //当前页码
         num_edge_entries: 2 //连续分页主体部分分页条目数
     });
}

/**物流信息的翻页调用  
*/
function pageselectCallback(index,jq)
{
	var url = "taskLogistics/getTaskLogisticsBySearchForProducer.do";
	var params ={};
	params.t_id = taskid;
//	params.tpye =  document.getElementById("pro_logistics_come").value;    //此方法兼容性好
	var state_text=$("#logistics_state").text();
	var state=0;
	if(state_text=='未接收'){
		state=2;
	}else if(state_text=='已接收'){
		state=1;
	}
	if(state!=0){
		params.state = state;
	}
	params.startTime = document.getElementById("pro_logistics_start_time").value;
	params.endTime = document.getElementById("pro_logistics_end_time").value;
	params.search = document.getElementById("pro_search").value;
	//当前所在页
	 currentpage = index;
	InitData(index,false,url,params);
}

/**物流信息条件查询的初始化
*/
function searchlogistics(){
	
	var url = "taskLogistics/getTaskLogisticsBySearchForProducer.do";
	var params ={};
	params.t_id = taskid;
//	params.tpye =  document.getElementById("pro_logistics_come").value;    //此方法兼容性好
	var state_text=$("#logistics_state").text();
	var state=0;
	if(state_text=='未接收'){
		state=2;
	}else if(state_text=='已接收'){
		state=1;
	}
	if(state!=0){
		params.state = state;
	}
	params.startTime = document.getElementById("pro_logistics_start_time").value;
	params.endTime = document.getElementById("pro_logistics_end_time").value;
	params.search = document.getElementById("pro_search").value;
	InitData(0,true,url,params);
}

/**
 * 加载物流信息
 */
function addItem(result){
	if( result != null){
		$("#pro_logistics_table_list tr:gt(0)").empty();
		var Logisticslist = result;
		var length = Logisticslist.length;
		var  logisticsItem ="";			
		if(length==null){
			return;	
		}
		//表格的行号先初始成0
		logis_rowCount=0;
		for(var i=0; i< length;i++ ){
			var Logistics = Logisticslist[i];
			if(Logistics.remark!=null){
			var remark=Logistics.remark;
			if(remark.length>=42){//进行显示是的截取，不影响格式
				remark=remark.substring(0,41)+'...';
			}
			}
			var fileimglist='';
			if(parseInt(Logistics.file_count)>0){//判断是否存在与该物流信息相关联的图片
				fileimglist ='<p class="mt5 clearfix"><a id="td_imglist_title" class="td_imglist_title" href="javascript:void(0)" onClick="toggle_imglist(this,'+Logistics.record_id+')">附件图片</a></p>'+
					'<div class="td_img_ul_wrap clearfix"><ul id="td_imgfile_ul" class="picList">' +
				'</ul></div>';	
			}
			if(Logistics.send !=true && Logistics.confirm_state == 1){
				
				logisticsItem = logisticsItem+
				'<tr id="logis_row'+logis_rowCount+'">'+
				'<td valign="top">'+
					'<p><label>'+((Logistics.start_date==null)?"":Logistics.start_date.substring(0,10))+'</label>'+
					'<label class="ml10">'+((Logistics.week==null)?"":Logistics.week)+'</label>'+
					'</p>'+
					'<p ><span style="color:#c6c6c6;">'+((Logistics.create_dt==null)?"":Logistics.create_dt)+'录入</span></p>'+
				'</td>'+
				'<td><input id="logisId'+logis_rowCount+'" type="hidden" value="'+Logistics.record_id+'"></td>'+
				'<td>'+
					'<p  class="clearfix">'+
						'<label class="name">司机</label><label  style="width:185px;" class="content">'+((Logistics.driver==null)?"":Logistics.driver)+'<span  class="ml5">'+((Logistics.phone_number==null)?"":Logistics.phone_number)+'</span></label>'+
						'<label class="name ml50">车牌</label><label class="content">'+((Logistics.licence_plate==null)?"":Logistics.licence_plate)+'</label>'+
						'<label class="name ml50">发料单号</label><label class="content"> '+((Logistics.send_id==null)?"":Logistics.send_id)+'</label>'+
					'</p>'+
					'<p  class="clearfix mt5"><label class="name">备注</label><label class="memo_content" title="'+((Logistics.remark==null)?"":Logistics.remark)+'">'+((Logistics.remark==null)?"":remark)+'</label>' +
					fileimglist+
					'</td>'+
				'<td class="left">'+
					/*'<button class="oprate_button" >已收货</button>'+*/
					'<label class="receive_state" style="display:block;font-weight:bold;">已收货</label>'+
					'<label class="c777 comfirmTime" style="display:block">'+((Logistics.confirm_dt==null)?"":Logistics.confirm_dt)+'</label>'+
				'</td>'+
			'</tr>';
		}
			if(Logistics.send !=true && Logistics.confirm_state == 0){
				var confirmButton ="";
				if(state ==15 ||state==20){//判断加载按钮的type
					 confirmButton =	'<td class="left">'+
						'<button class="oprate_button" onClick="confirm_logic(this,'+Logistics.record_id+')">确认收货</button>'+
						'<label class="receive_state" style="font-weight:bold;">已收货</label>'+
						'<label style="display:none" class="c777 comfirmTime ">'+create_dt+'</label>'+
					'</td>';
				}else if( state==30 || state==25){
					 confirmButton =	'<td class="left">'+
					'<button class="disabled_btn" disabled="disabled" style="background:#D3D3D3" title="无法进行确认收货操作" >确认收货</button>'+					
				'</td>';
				}
					logisticsItem = logisticsItem+
					'<tr id="logis_row'+logis_rowCount+'">'+
					'<td valign="top">'+
						'<p><label>'+((Logistics.start_date==null)?"":Logistics.start_date.substring(0,10))+'</label>'+
						'<label class="ml10">'+((Logistics.week==null)?"":Logistics.week)+'</label>'+
						'</p>'+
						'<p ><span style="color:#c6c6c6;">'+((Logistics.create_dt==null)?"":Logistics.create_dt)+'录入</span></p>'+
					'</td><td><input id="logisId'+logis_rowCount+'" type="hidden" value="'+Logistics.record_id+'"></td>'+
					'<td>'+
						'<p  class="clearfix">'+
							'<label class="name">司机</label><label  style="width:185px;" class="content">'+((Logistics.driver==null)?"":Logistics.driver)+'<span  class="ml5">'+((Logistics.phone_number==null)?"":Logistics.phone_number)+'</span></label>'+
							'<label class="name ml50">车牌</label><label class="content">'+((Logistics.licence_plate==null)?"":Logistics.licence_plate)+'</label>'+
							'<label class="name ml50">发料单号</label><label class="content"> '+((Logistics.send_id==null)?"":Logistics.send_id)+'</label>'+
						'</p>'+
						'<p  class="clearfix mt5"><label class="name">备注</label><label class="memo_content" title="'+((Logistics.remark==null)?"":Logistics.remark)+'">'+((Logistics.remark==null)?"":remark)+'</label>' +
						fileimglist+
						'</td>'+
					confirmButton+
				'</tr>';
			}if(Logistics.send == true && Logistics.confirm_state == 0){
				var logisButton ="";
				if(state ==15 ||state==20){//判断加载按钮的type
					 logisButton = '<a href="javascript:void(0)" title="编辑" onclick="edit_logic_row('+Logistics.record_id+',this,'+logis_rowCount+')" style="display:inline;">' +
								   		'<img src="/newresources/images/edit2.png" onClick="" alt="编辑" />'
					 				+'</a>'+
								   '<a href="javascript:void(0)" title="保存" onclick="save_logic_row(this,'+logis_rowCount+','+Logistics.record_id+')" style="display: none;">'+
								   		'<img src="/newresources/images/save.png" />'
								   +'</a>'+
								   '<a  class="ml10"  href="javascript:void(0)" title="删除" onclick="dellogisticsInfo(this,'+logis_rowCount+','+Logistics.record_id+')">'+
								   		'<img src="/newresources/images/del2.png" )" alt="删除" />'
								   +'</a>';
				}else if( state==30 || state==25){
					 logisButton ='<button title="该物流未被对方确认接收" class="disabled_btn" disabled="disabled" style="background:#D3D3D3" >未被接收</button>';				
				}
				logisticsItem = logisticsItem+
				'<tr id="logis_row'+logis_rowCount+'">'+
				
				'<td valign="top">'+
					'<p><label>'+((Logistics.start_date==null)?"":Logistics.start_date.substring(0,10))+'</label>'+
					'<label class="ml10">'+((Logistics.week==null)?"":Logistics.week)+'</label>'+
					'</p>'+
					'<p ><span style="color:#c6c6c6;">'+((Logistics.create_dt==null)?"":Logistics.create_dt)+'录入</span></p>'+
				'</td><td><input id="logisId'+logis_rowCount+'" type="hidden" value="'+Logistics.record_id+'"></td>'+
				'<td>'+
					'<p>'+
						'<label class="name">司机</label><label style="width:185px;" class="content"><span>'+((Logistics.driver==null)?"":Logistics.driver)+'</span><input  class="content_edit " style="width:60px;" type="text" value="'+Logistics.driver+'" />'+
						'<span  class="ml5">'+((Logistics.phone_number==null)?"":Logistics.phone_number)+'</span><input  class="content_edit ml5" type="text" value="'+Logistics.phone_number+'" /></label>'+
						'<label class="name ml50">车牌</label><label class="content">'+((Logistics.licence_plate==null)?"":Logistics.licence_plate)+'</label>'+
						'<input  class="content_edit" type="text" value="'+Logistics.licence_plate+'" />'+
						'<label class="name ml50">发料单号</label><label class="content"> '+((Logistics.send_id==null)?"":Logistics.send_id)+'</label>'+
					'</p>'+
					'<p class="mt5"><label class="name">备注</label><label class="memo_content" title="'+((Logistics.remark==null)?"":Logistics.remark)+'">'+((Logistics.remark==null)?"":remark)+'</label>' +
						'<input  class="memo_content_edit" value="'+((Logistics.remark==null)?"":Logistics.remark)+'" type="text" /></p>'+
						fileimglist+
						'</td>'+
				'<td class="left">'+
				logisButton+
				'<label class="receive_state" style="display:none;font-weight:bold;">对方已收货</label>'+
				'<label class="c777 comfirmTime" style="display:none">'+create_dt+'</label>'+
			'</td>'+
			'</tr>';
			}
			if(Logistics.send == true && Logistics.confirm_state == 1){
				logisticsItem = logisticsItem+
				'<tr id="logis_row'+logis_rowCount+'">'+
				
				'<td valign="top">'+
					'<p><label>'+((Logistics.start_date==null)?"":Logistics.start_date.substring(0,10))+'</label>'+
					'<label class="ml10">'+((Logistics.week==null)?"":Logistics.week)+'</label>'+
					'</p>'+
					'<p style="text-align:right; margin-right:10px;"><span class="greycolor">'+((Logistics.create_dt==null)?"":Logistics.create_dt)+'录入</span></p>'+
				'</td><td><input id="logisId'+logis_rowCount+'" type="hidden" value=""></td>'+
				'<td>'+
					'<p  class="clearfix">'+
						'<label class="name">司机</label><label  style="width:185px;" class="content">'+((Logistics.driver==null)?"":Logistics.driver)+'<span  class="ml5">'+((Logistics.phone_number==null)?"":Logistics.phone_number)+'</span></label>'+
						'<label class="name ml50">车牌</label><label class="content">'+((Logistics.licence_plate==null)?"":Logistics.licence_plate)+'</label>'+
						'<label class="name ml50">发料单号</label><label class="content"> '+((Logistics.send_id==null)?"":Logistics.send_id)+'</label>'+
					'</p>'+
					'<p  class="clearfix mt5"><label class="name">备注</label><label class="memo_content" title="'+((Logistics.remark==null)?"":Logistics.remark)+'">'+((Logistics.remark==null)?"":remark)+'</label>' +
					fileimglist+
					'</td>'+
				'<td class="left">'+
				/*'<button class="oprate_button" >已接受</button>'+*/
				'<label class="receive_state" style="display:block;font-weight:bold;">对方已收货</label>'+
				'<label class="c777 comfirmTime"  style="display:block">'+((Logistics.confirm_dt==null)?"":Logistics.confirm_dt)+'</label>'+
			'</td>'+
			'</tr>';
			}
			logis_rowCount++;
		}	
		$(logisticsItem).insertAfter("#pro_logistics_info_list");//把加载的文件放在该元素后面

	}				
	
}
/**
 * 确认物流信息添加
 */
function addlogisticsInfovo()
{  
	var params ={};
	 params.t_id= taskid;
	 params.company_id = company_id;
     params.driver = $("#driver").val().trim();
     params.start_date = $("#start_date").val().trim();
     params.licence_plate = $("#licence_plate").val().trim();
     params.send_id = $("#send_id").val().trim();
     params.remark = $("#remark").val().trim(); 
     params.phone_number = $("#phone_number").val().trim(); 
     params.send_count = $("#send_count").val().trim(); 
     var listobj = $("#uplogisticsimg_list");//ulhtml元素
     var imagelen =  listobj.find("li").length;//有多少个li属性（多少图片）
     params.arr = {};//声明对象中的对象
     for(var i=0; i<imagelen;i++){//循环取值value     	
    	 params.arr[i] = listobj.find("li").eq(i).find("input").val();//去获取每个图片的id    	
     }
     params.imagelen = imagelen;
     var spans = $("#send_id").nextAll(".info_explain_wrap").find("span").html(); 
     var spanspro = $("#send_count").nextAll(".info_explain_wrap").find("span").html(); 
     var error_str = informationvo("",params); //进行验证
     if(error_str=="" && spans != "批次编号重复" && spanspro != "发送的货物量大于您所生产的量,请重新输入"){
	 window.wxc.xcConfirm("您确认要添加该物流信息吗？", window.wxc.xcConfirm.typeEnum.confirm,
		{
		onOk:function(){
			 addlogisticsInfo(params);
			},
		onCancel:function(){
			}
		});
     }else{   	 
     }
}
/**
 * 物流信息添加
 * @param chenlong
 */
var logis_rowCount=0;
function addlogisticsInfo(params){	
	var url="taskLogistics/addTaskLogisticsForProducer.do";
		var fn=function(result){
			    searchlogistics(state);	//刷新页面
				$("div#pro_logistics_form_list .input_wrap").val("");
				$("div#pro_logistics_form_list textarea").val("");	
				$("#uplogisticsimg_list").empty();
			};
			 asyncAjaxMethod(url,params,true,fn);	
}
/*
 * 编辑物流行
 * */

function edit_logic_row(record_id,obj,rowIndex)
	{
	var url="taskLogistics/getTaskLogisticsState.do";
    var params ={};	
	params.record_id = record_id;
	var fn = function(result){
		if(result.message=="此数据不存在"){//信息删除	
				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);				
				closeBytimeCount(2);
				$(obj).parent().parent().remove();
			}else if(result.message=="该物流已接收，无法操作"){	//按钮切换			
				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
				closeBytimeCount(2);
				$(obj).parent().find("a").css("display","none");			   						   			 
				$(obj).parent().find("label").css("display","block");
			}else if(result.message=="成功"){//弹出输入框
				$(obj).css("display","none");
				$(obj).next().css("display","inline");
				$(obj).parent().parent().find("input[type=text]").each(function(index,element){
				$(element).css("display","inline");
				$(element).prev().css("display","none");
				});					
			}
	};
	 asyncAjaxMethod(url,params,true,fn); //进行状态的验证					
	}
/**
 * 验证修改物流
 * @param params
 * @returns {String}
 */
function informationvoEdt(params){
	editflag =true;//是否是编辑 的标记
	var error_str ="";
	if(params!=""){
		var i=0;
		for(var key in params){
			if(params.hasOwnProperty(key)){
				id=key;
				i++;
				value =params[key];
				error_str =information(id,value);
				if(error_str != ""){					
						break;						
					}			
			}
		}			
	}
	return error_str;
}
/*
 * 保存物流信息
 * */
	function save_logic_row(obj,rowIndex,record_id)
	{
		var url="taskLogistics/updateTaskLogisticspro.do";
	    var params ={};	
		params.record_id = record_id;
		params.t_id =  taskid;
		params.company_id =  company_id;
		params.driver =  $(obj).parent().parent().find("input[type=text]:eq(0)").val();
		params.phone_number = $(obj).parent().parent().find("input[type=text]:eq(1)").val();
		params.licence_plate = $(obj).parent().parent().find("input[type=text]:eq(2)").val();
//		params.send_count = $(obj).parent().parent().find("input[type=text]:eq(2)").val();
		params.remark = $(obj).parent().parent().find("input[type=text]:eq(3)").val();				
		error_str = informationvoEdt(params);
		if(error_str==""){
			var fn=function(result){
				if(result.message=="此数据不存在"){//信息删除	
					xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);				
					closeBytimeCount(2);
					$(obj).parent().parent().remove();
				}else if(result.message=="该物流已接收，无法编辑"){	//按钮切换			
					xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
					closeBytimeCount(2);
					$(obj).parent().find("a").css("display","none");			   						   			 
					$(obj).parent().find("label").css("display","block");
				}else if(result.message=="发送的货物量大于您所生产的量,请重新输入"){//弹出提示框
					var option ={title:"提示",btn:parseInt("0001",2)};
				   	window.wxc.xcConfirm("发送的货物量大于您所生产的量,请重新输入", window.wxc.xcConfirm.typeEnum.custom,option);
				}else if(result.message=="成功"){//弹出输入框
					$(obj).css("display","none");
					$(obj).prev().css("display","inline");
					$(obj).parent().parent().find("input[type=text]").each(function(index,element){
					$(element).css("display","none");
					$(element).prev().css("display","inline");
					$(element).prev().html($(element).val());
					});
					$(obj).parent().parent().find("input[type=text]:eq(1)").prev().html("<span class='ml5'>"+params.phone_number+"</span>");
//					$(obj).parent().parent().find("input[type=text]:eq(2)").prev().html("[共"+params.send_count+"件]");
					$(obj).parent().parent().find("input[type=text]:eq(3)").prev().text("");
					var remark=params.remark;					
				    if(remark.length>=42){
				 	remark=remark.substring(0,41)+'...';
				    }
					$(obj).parent().parent().find("input[type=text]:eq(3)").prev().text(remark);
					$(obj).parent().parent().find("input[type=text]:eq(3)").prev().attr("title",params.remark);
				}			
			 };
				 asyncAjaxMethod(url,params,true,fn); 
		}else{
			 var option ={title:"提示",btn:parseInt("0001",2)};
		   	 window.wxc.xcConfirm(error_str, window.wxc.xcConfirm.typeEnum.custom,option);
		}
	}
/**
 * 删除物流信息
 * @param obj
 * @param chenlong
 */
function dellogisticsInfo(obj,rowIndex,record_id){		
		 window.wxc.xcConfirm("您确认要删除该物流信息吗？", window.wxc.xcConfirm.typeEnum.confirm,
			{
			onOk:function(){
				var url="taskLogistics/deleteTaskLogisticsForProducer.do";
			    var params ={};	
			    params.t_id =  taskid;
			    params.company_id =  company_id;
				params.record_id = record_id;
					var fn=function(result){					
						if(result.message=="此数据不存在"){
			   				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
			   				closeBytimeCount(2);
			   				$(obj).parent().parent().remove();			   			
			   			}else if(result.message=="该物流已接收，无法删除"){
			   				create_dt=new Date().Format("yyyy-MM-dd HH:mm:ss");
			   				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
			   				closeBytimeCount(2);
			   				$(obj).parent().find("a").css("display","none");			   						   			 
			   				$(obj).parent().find("label").css("display","block");
			   			}else if(result.message=="成功"){//刷新当前页
			   				$(obj).parent().parent().remove();			   				
			   			}
					};
				asyncAjaxMethod(url,params,true,fn); 			
				},
			onCancel:function(){
				}
			});
}
/**
 * 点击确认收货.动画生成编辑框
 * @param obj
 * @param record_id
 */
var  record_id;
var  objParam;
function confirm_logic(obj,id){
	var url="taskLogistics/getTaskLogisticsState.do";
    var params ={};	
	params.record_id = id;
	var fn = function(result){
		if(result.message=="此数据不存在"){//信息删除	
				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
				closeBytimeCount(2);
				$(obj).parent().parent().remove();
			}else if(result.message=="该物流已接收，无法操作"){	//按钮切换			
				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
				closeBytimeCount(2);
				$(obj).css("display","none");			   						   			 
				$(obj).parent().find("label").css("display","block");
			}else if(result.message=="成功"){//弹出输入框
				var send = $(obj).parent().parent().find("label:eq(5)").find("span").text();
				$("#pop_layer_wrap").find("#connent_info").html("是否确认单号"+((send==null)?"":send)+"原料已收？");
				$(".mask").fadeIn("fast");
				$("#pop_layer_wrap").fadeIn("fast");
				record_id = id;
				objParam = obj;
			}
	};
	 asyncAjaxMethod(url,params,true,fn); //进行状态的验证
	
}
/**
 * 关闭弹出框
 */
function close_logic_div()
{
	$(".mask").fadeOut("fast");
	$("#pop_layer_wrap").fadeOut("fast");
}
/**
 * 已确认收货进行
 */
function logisticsReceive(){	
	var url="taskLogistics/updateLogisticsForStateForProducer.do";
    var params ={};	
	params.t_id = taskid;
	params.record_id = record_id;
		var fn=function(result){
			if(result.message=="此数据不存在"){//信息删除	
				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
				closeBytimeCount(2);
				close_logic_div();
				$(objParam).parent().parent().remove();
			}else if(result.message=="该物流已接收，无法操作"){	//按钮切换	
				$(objParam).parent().find("label:eq(1)").text();
				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
				closeBytimeCount(2);
				close_logic_div();
				$(objParam).css("display","none");			   						   			 
				$(objParam).parent().find("label").css("display","block");
			}else if(result.message=="成功"){//弹出输入框
			close_logic_div();
			$(objParam).css("display","none");
			$(objParam).next().next().text(new Date().Format("yyyy-MM-dd HH:mm:ss"));
			$(objParam).siblings().css("display","block");
			}
			};	
			 asyncAjaxMethod(url,params,true,fn);
}
/*
 * 加载物流选择类型
 * 
function load_logistic_state()
	{
		//物流类型
		var p_val=$("#pro_logistics_come").val();
		//清空除了第一条以外的数据
		$("#pro_logistics_state option:gt(0)").remove();
		switch(p_val){
			//来料
			case "1":
				var option="<option value='2'>未收料</option>"+"<option value='1'>已收料</option>";
				$("#pro_logistics_state").append(option);
			break;
			//发货
			case "2":
				var option="<option value='2'>未接收</option>"+"<option value='1'>已接收</option>";
				$("#pro_logistics_state").append(option);
			break;
		}
	}*/
/**
 * 在物流中添加图片
 * @date 2016-6-22
 * @auto chenlong 
 */
function addlogisticImg(obj){
	 var filename=$("#uploadelogimg").val();//上传的文件信息	 
  
     if(filename!=""){
	   	var spinner = new Spinner(opts);
	   	$(obj).parent().append("<div id='processFile_spin_wrap'></div>");
		$("#processFile_spin_wrap").addClass("inner_spin_mask");
		spinner.spin(document.getElementById("processFile_spin_wrap"));
		
		var fileurl = "taskLogistics/addLogisticsImgFileForProducer.do";
		var params = {"t_id":taskid,"file_type":32,"companyId":company_id};
		var fn = function(data){    			        	
        	//关闭loding效果
	   		spinner.spin();
	   		$("#processFile_spin_wrap").remove();
        	var imageItem="";
        	if (data.success==true && data.message=='上传成功') { 
        		var newsrc=getwebroot()+"taskFile/downLoadFileFormMongoForProducer.do?file="+data.file_path;		    					    						    				    	
    				imageItem +=
    				'<li>'+
    				'<input style="display:none" value="'+data.tf_id+'" />'+
					'<div class="logistics_image_block_pic">'+
						'<img src="'+((newsrc==null)?"":newsrc)+'" />'+
						'<div class="a_bg"></div>'+
						'<div class="oprate_wrap"><a href="javascript:void(0)" onclick="dellogisticsimg(this,'+data.tf_id+')">删除</a></div>'+
					'</div>'+
				'</li> '; 				
    			$("#uplogisticsimg_list").append(imageItem);
	    		$(obj).val("");		   						
            }else{
            	var option ={title:"提示",btn:parseInt("0001",2)};
            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
            }			        	
		};
	    addInputUtilFile(fileurl,params,"uploadelogimg",fn);
		
   	   /*$.ajaxFileUpload({
	        url: getwebroot()+'taskLogistics/addLogisticsImgFileForProducer.do', //用于文件上传的服务器端请求地址
	        data: {"t_id":taskid,"file_type":32,"companyId":company_id},  //任务id参数		  
	        fileElementId: "uploadelogimg",//input type=file 的id
	        dataType: 'json',//返回值类型 一般设置为json
	        success: function (data, status)  //服务器成功响应处理函数
	        {    			        	
		        	//关闭loding效果
		   		spinner.spin();
		   		$("#processFile_spin_wrap").remove();
	        	var imageItem="";
	        	if (data.success==true && data.message=='上传成功') { 
	        		var newsrc=getwebroot()+"taskFile/downLoadFileFormMongoForProducer.do?file="+data.file_path;		    					    						    				    	
	    				imageItem +=
	    				'<li>'+
	    				'<input style="display:none" value="'+data.tf_id+'" />'+
						'<div class="logistics_image_block_pic">'+
							'<img src="'+((newsrc==null)?"":newsrc)+'" />'+
							'<div class="a_bg"></div>'+
							'<div class="oprate_wrap"><a href="javascript:void(0)" onclick="dellogisticsimg(this,'+data.tf_id+')">删除</a></div>'+
						'</div>'+
					'</li> '; 				
	    			$("#uplogisticsimg_list").append(imageItem);
		    		$(obj).val("");		   						
	            }else{
	            	var option ={title:"提示",btn:parseInt("0001",2)};
	            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
	            }			        	
	        },
	        error: function (data, status, e)//服务器响应失败处理函数
	        {
	        	//关闭loding效果
		   			spinner.spin();
		   			$("#processFile_spin_wrap").remove();
	        	var option ={title:"提示",btn:parseInt("0001",2)};
	            window.wxc.xcConfirm('解析失败', window.wxc.xcConfirm.typeEnum.custom,option);
	        }
	    });*/
	   
   }else{
	   var option ={title:"提示",btn:parseInt("0001",2)};
   		window.wxc.xcConfirm("请先选择上传的文件", window.wxc.xcConfirm.typeEnum.custom,option);
	   }
}
/**
 * 删除指定的物流图片
 * @param obj
 * @param tf_id
 */
function dellogisticsimg(obj,tf_id)
{
	window.wxc.xcConfirm("您确认要删除该图片吗？", window.wxc.xcConfirm.typeEnum.confirm,
		{	
		onOk:function(){
			var url = 'taskFile/deleteTaskFileForProducer.do';
			var params={"t_id":taskid,"tf_id":tf_id};
				var fn=function(result){									
					    window.wxc.xcConfirm(result.message);
						$(obj).parent().parent().parent().remove();							 						 						
						};
				 asyncAjaxMethod(url,params,true,fn);
					},
			onCancel:function(){				
				}
			});		
}

/**
 * 点击切换图片的展开与不展开
 */	
function toggle_imglist(imageobj,recordid){
	var obj =  $(imageobj).parent();//选取上级元素
	var licount = $(obj).next().find("ul li").length;//判断图片是否已加载
	if(licount==0){
	 var url = 'taskFile/getLogicticsFilelist.do';
	 var params={"record_id":recordid};
	 var fn=function(result){									
		 var filelist = result.data;
		 var len = filelist.length;
		 var imageli ="";
		 for(var i=0;i<len;i++){
			 var image=filelist[i];
			 var newsrc = null;				
			 newsrc=getwebroot()+"taskFile/downLoadFileFormMongoForProducer.do?file="+image.object_id;		
			 imageli += '<li><div class="td_img_block"><img src="'+((newsrc==null)?"":newsrc)+'" /></div></li>';			
		 }
		 //1.加载图片
		 $(obj).next().find("ul").append(imageli);
		//2.点击切换图片的展开与不展开
		 logisticstoggle(obj,imageobj);
		//3.小图hover事件显示大图
			$(".td_img_block").hover(function(){
				var offset=$(this).offset();
				$(this).css("border","1px solid #f1af27");
				$("#img_bigshow_block").find("img").attr("src",$(this).find("img").attr("src"));
				$("#img_bigshow_block").css({'left':offset.left-58,'top':offset.top+52,'display':'block'});
			},function(){
				$(this).css("border","1px solid #ccc");
				$("#img_bigshow_block").css({'display':'none'});
			});
	};
	  asyncAjaxMethod(url,params,true,fn);//发送请求加载图片	    
	}else{
		logisticstoggle(obj,imageobj);//点击切换图片的展开与不展开
	}
}
/**
 * 图片上拉下拉动态切换的效果
 * @param obj
 * @param imageobj
 */
  function  logisticstoggle(obj,imageobj){
	  $(obj).next('.td_img_ul_wrap').toggle(1000,function(ob){//点击切换图片的展开与不展开
			if($(this).is(':hidden'))
			{
				$(imageobj).css({"color":"#0072c4","background-image":"url(/newresources/images/icon/unexpend.png)"});
			}
			else
			{
				$(imageobj).css({"color":"#777","background-image":"url(/newresources/images/icon/expend.png)"});				
			}
		});
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
  		$(this).parent().prev().html(txt+'<img src="/newresources/images/switchover.png" class="f_r mr4 mt4">');
  		$(this).parent().hide();
  		$(".mask_opacity").hide();
  	});
  }