<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>生产任务单交流合作</title>
	<link href="/newresources/css/page.css" rel="stylesheet" type="text/css" />
	<link href="/newresources/css/task.css" rel="stylesheet" type="text/css" />
	<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" />
</head>

<body class="bg_grey">
<div id="top"></div>
<!--中间-->
<div class="midd_wrap p10 pb30 bg_white">
	<div class="breadcrumb_wrap">
		当前位置：<a href="/supplierForPlateForm/registerInfo.htm">企业中心</a><span  class="p5">&gt;</span>
			<a href="/saleCenterCtrl/saleCenter.htm">销售</a><span  class="p5">&gt;</span>
		<a href="javascript:void(0)" onclick="go_tasklist()">生产任务单列表</a><span class="p5">&gt;</span><span id="taskname_head"></span>
	</div>
	<hr class="hr_dashed_grey" />
	<!--生产任务单状态进度条-->
	<div id="producTaskStaticBar"></div>
	<div class="task_nav_wrap mt20">
		<span class="l_wrap">生产任务单</span><span  class="p5">&gt;</span><span id="serialno_head"></span>
		<ul class="r_wrap">
			<li><a href="javascript:void(0)" onclick="go_taskInfo()">任务单详情</a></li>
			<li><a href="javascript:void(0)" onclick="go_logistics()">来料信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_productionInfo()">生产信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_deliveredInfo()">送货信息</a></li>
			<li><a href="javascript:void(0)" onclick="go_qualityControl()">质检信息</a></li>
			<li><a href="javascript:void(0)"  class="curr">交流合作</a></li>
		</ul>
	</div>
	
	<textarea rows="2" cols="5" id="message_text_box" class="message_text_box"></textarea>
	<div class="comm_inner_line_wrap clearfix" id ="comm_img_wrap"></div>
	<div id="message_show_block" class="message_show_block"></div>
</div>
<div id="img_bigshow_block" class="img_bigshow_block">
	<div class="content_img_wrap"><img src="" /></div>
</div>
<!--底端-->
<div id="bottom"></div>
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript" src="/usercenter/outsourceTaskManage/js/taskStaticBar.js"></script>
<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript">
	var taskid = getParamFromWindowName("task_id");
    var company_id = getParamFromWindowName("companyIdForAll");
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
	var state="";
		//显示物流新增文件按钮
function stateLoisgisticsimgShow(state){
    var Loisgisticsimg = "";
    if(state==10||state ==15||state ==20){
	Loisgisticsimg =doT.template($("#image_button").text());
	}			 
	$("#comm_img_wrap").html(Loisgisticsimg);
}
	function connectionButton(state){//是否改变按钮状态
		var button = "";
		if(state==10||state==15||state ==20){
		button = "<div id='submit_message_button' class='submit_message_button' style='width:72px; height:25px; background-color:#f1af27; border-radius:3px; color:#fff; text-align: center; padding-top: 6px; margin-right: 10px; margin-left:auto;'>留 言</div>";
		}else if(state ==25||state ==30){
		document.getElementById("message_text_box").disabled="disabled";
	    button = "<button title='无法留言' class='disabled_btn' disabled='disabled' style='margin-left:980px;background:#D3D3D3'>留 言</button>";
		}
		$("#message_text_box").after(button);
	}
	$(function(){	 
		getProductTaskByID();
		loadCommonPage();
		$(".midd_wrap").css({minHeight:$(window).height()-200});
		
		window.onresize=function(){
			$(".midd_wrap").css({minHeight:$(window).height()-200});
			
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
	
	function getProductTaskByID(){
		var task;
		var url="externalTask/getProductTaskByID.do";
		var params={};
		params.t_id=taskid;
   		var fn=function(result){
   			task=result.data;  
   			connectionButton(task.state);
   			showCommunicationMessage(task.state);	
   			stateLoisgisticsimgShow(task.state);		
   			state = task.state;
   			var flag = true;
   			$("#submit_message_button").bind("click",function(){
	   			if(flag){
	   				submitAskMessage();  		
	   				flag = false;
	   				setTimeout(function(){flag = true;},3000); 
	   			}
   			});
   			//任务单名称
			$("#taskname_head").html("任务单:"+task.product_name);
			//任务单流水号
			$("#serialno_head").html(task.serial_no+"/"+task.rwdh+"("+task.ddh+")"+"/"+task.scdh);
   			//初始化任务条
			$("#producTaskStaticBar").taskStaticBar_init({type:2});
			$("#producTaskStaticBar").taskStaticBar_showByTask(task);
   		};
   		asyncAjaxMethod(url,params,true,fn);
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
	function go_qualityControl(){
		var param ={"task_id":taskid};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"externalTask/producQualityControl/"+taskid+".htm";
	}
	function showCommunicationMessage(state){
		var url = "appCommunicationCtrl/getAppCommunicationList.do";
		var params = {};
		params.taskId = taskid;
		params.fileTypeId = 22;//公司logo代码
		params.companyId = company_id;
		params.moduleType = 0;//任务模块
		params.parentId = 0;
		
		var isasync = true;
		var fn = function(result){
			if(result.ajaxErrorCode == 200){
				var communications = result.data;//获取对话信息
				if(communications==null){
					return;
				}
				var show_message_block = "";//信息的展示模块
				var reviewButton ="";
				if(state ==10||state ==15||state ==20){
					reviewButton ="<span class='f_l' style='text-align:center;'><img class='return_button' src='/newresources/images/return_back_button.png'/></span>";
				}
				
				for(var i = 0; i < communications.length; i++){//单个信息模块加载
					var sigle_communication_block = "";//单个交流模块
					var return_back_block = "<div class='message_return_block'>";//信息返回模块 头信息
					var fileimglist ="<div class='td_img_ul_wrap clearfix'><ul id='td_imgfile_ul'>" +"</ul></div>";
					var fileimgtext='';
					for(var j = 1; j < communications[i].length; j++){//单个信息模块回复信息加载
						var srcPathij = getwebroot() + "newresources/images/default_logo.png";//如果没有上传logo，默认的logo图片
						if(communications[i][j].fileCount>0){
						fileimgtext ="<a id='td_imglist_title' class='td_imglist_title ml10' href='javascript:void(0)' onClick='toggle_imglist(this,"+communications[i][j].id+")'>附件图片</a>";
						}
						if(communications[i][j].mogodb_id != null){
							srcPathij = getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+ communications[i][j].mogodb_id;
						}
						return_back_block += "<div class='message_return_single_block clearfix' >"
													+"<div class='company_logo' ><img  src="+ srcPathij +"></div>"
													+"<div class='return_message_info'>"
														+"<div class='message_content_and_cpname'><span class='cpname'>"+ communications[i][j].cpyname_cn +"：</span><span class='message_content'>"+ communications[i][j].com_message +"</span></div>"
														+"<div class='time_and_return_button clearfix' ><span class='create_time f_l' >"+ communications[i][j].create_time +"</span>"+reviewButton+fileimgtext+"</div>"
														+fileimglist
													+"</div>"
												+"</div>";
					}
					
					return_back_block += "</div>";//回复模块收尾
					var srcPathi0 = getwebroot() + "newresources/images/default_logo.png";//如果没有上传logo，默认的logo图片
					if(communications[i][0].mogodb_id != null){
						srcPathi0 = getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+ communications[i][0].mogodb_id;
					}
					if(communications[i][0].fileCount>0){
						fileimgtext ="<a id='td_imglist_title' class='td_imglist_title ml10' href='javascript:void(0)' onClick='toggle_imglist(this,"+communications[i][0].id+")'>附件图片</a>";
						}else{
						fileimgtext = "";
						}
					sigle_communication_block +=  "<div class='message_single_modle' >"
														+"<hr style='height:1px; border:none; border-top:1px dashed #d0d0d0'>"
														+"<div class='message_first_block clearfix'>"
															+"<input type='hidden' class='parent_message_id' value="+ communications[i][0].id +">"
															+"<div class='company_logo'><img src="+srcPathi0+"></div>"
															+"<div class='return_message_info' >"
																+"<div class='message_content_and_cpname'><span class='cpname'>"+ communications[i][0].cpyname_cn +"：</span><span class='message_content'>"+ communications[i][0].com_message +"</span></div>"
																+"<div class='time_and_return_button clearfix' ><span class='create_time f_l'>"+ communications[i][0].create_time +"</span>"+reviewButton+fileimgtext+"</div>"
																+ fileimglist
															+"</div>"
														+"</div>"
														+ return_back_block
													+"</div>";
					
					show_message_block += sigle_communication_block;
				}
				$("#message_show_block").prepend(show_message_block);//交流信息动态加载到页面
				
				returnBackButtonAction();//绑定点击回复信息按钮触发展示回复框事件
			}
		};
		
		asyncAjaxMethod(url,params,isasync,fn);
	}
	
	//提交留言信息
	function submitAskMessage(){
		var url = "appCommunicationCtrl/addAppCommunication.do";
		var params = {};
		params.parentId = 0;
		params.message = $("#message_text_box").val();
		params.taskId = taskid;
		params.companyId = company_id;
		params.moduleType = 0;
		params.file_type = 44;
		arr = [];//声明对象中的对象         
		$("#uplogisticsimg_list").find("li").each(function(index,element){
    	   arr.push($(element).find("input").val());
    	});//去获取每个图片的id   	 
    	params.arr = arr.join(",");
		
		var isasync = true;
		var fn = function(result){
			if(result.ajaxErrorCode == 200){
				var new_message_value = $("#message_text_box").val();
				var now_date = new Date().Format("yyyy-MM-dd HH:mm:ss");
				$("#message_text_box").val("");//提交成功后将输入框置为空
				$("#uplogisticsimg_list").empty();
				
				//即时添加交流信息
				var mogondb_id = getmogodbId(params.companyId);//获取本公司的logo图mogondbId
				var srcPath = getwebroot() + "newresources/images/default_logo.png";//如果没有上传logo，默认的logo图片
				var fileimglist="<div class='td_img_ul_wrap clearfix'><ul id='td_imgfile_ul'>" +"</ul></div>";	
				var fileimgtext='';
				 if(arr.length>0){//判断是否存在与该物流信息相关联的图片
					fileimgtext ="<a id='td_imglist_title' class='td_imglist_title ml10' href='javascript:void(0)' onClick='toggle_imglist(this,"+result.communication_id+")'>附件图片</a>";
			    }
				if(mogondb_id != null){
					srcPath = getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+ mogondb_id;
				}
	
				var new_message_block = "<div class='message_single_modle'>"
											+"<hr style='height:1px; border:none; border-top:1px dashed #d0d0d0'>"
											+"<div class='message_first_block clearfix' >"
												+"<input type='hidden' class='parent_message_id' value="+ result.communication_id +">"
												+"<div class='company_logo'><img src="+ srcPath +"></div>"
												+"<div class='return_message_info'>"
													+"<div class='message_content_and_cpname'><span class='cpname'>"+result.company_name +"：</span><span class='message_content'>"+ new_message_value +"</span></div>"
													+"<div class='time_and_return_button clearfix' ><span class='create_time f_l' >"+ now_date +"</span><span class='f_l' style='text-align:center;'><img class='return_button' src='/newresources/images/return_back_button.png'/></span>"+fileimgtext+"</div>"
													+fileimglist
												+"</div>"
											+"</div>"
											+"<div class='message_return_block'></div>"
										+"</div>";
				
				$("#message_show_block").prepend(new_message_block);
				returnBackButtonAction();//绑定点击回复信息按钮触发展示回复框事件
			}
		};
		
		if(params.message){//不为空执行
			 if(params.message.toString().length>140){
		     var option ={title:"提示",btn:parseInt("0001",2)};
			 window.wxc.xcConfirm("输入的字符长度超过140,请修改",window.wxc.xcConfirm.typeEnum.custom,option);
		     }else{
			 asyncAjaxMethod(url,params,isasync,fn);
			 
			 }
		}else{
			$("#message_text_box").attr("placeholder","输入不能为空");
		}
	}
	
	//提交回复留言信息
	function submitReturnMessage(obj){
		var url = "appCommunicationCtrl/addAppCommunication.do";
		var params = {};
		params.parentId = obj.parent().find(".parent_message_id").val();//获取父messageId
		params.message = obj.prev().val();
		
		params.taskId = taskid;
		params.companyId = company_id;
		params.moduleType = 0;
		params.file_type = 44;
        arr = [];//声明对象中的对象         
		$("#uplogisticsimgreturn_list").find("li").each(function(index,element){
    	   arr.push($(element).find("input").val());
    	});//去获取每个图片的id   	 
    	params.arr = arr.join(",");	
		
		var isasync = true;
		var fn = function(result){
			if(result.ajaxErrorCode == 200){
				var now_date = new Date().Format("yyyy-MM-dd HH:mm:ss"); 
				obj.prev().val("");//提交成功后将输入框置为空 
				obj.next(".upload_wrap").remove();
				$("#uplogisticsimgreturn_list").remove();
				//即时添加交流信息
				var mogondb_id = getmogodbId(params.companyId);//获取本公司的logo图mogondbId
				var srcPath = getwebroot() + "newresources/images/default_logo.png";//如果没有上传logo，默认的logo图片
				var fileimglist="<div class='td_img_ul_wrap clearfix'><ul id='td_imgfile_ul'>" +"</ul></div>";	
				var fileimgtext='';
			    if(arr.length>0){//判断是否存在与该物流信息相关联的图片
					fileimgtext ="<a id='td_imglist_title' class='td_imglist_title ml10' href='javascript:void(0)' onClick='toggle_imglist(this,"+result.communication_id+")'>附件图片</a>";
			    }
				if(mogondb_id != null){
					srcPath = getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+ mogondb_id;
				}
				
				var return_back_block_single = "<div class='message_return_single_block clearfix'>"
													+"<div class='company_logo' ><img  src="+ srcPath +"></div>"
													+"<div class='return_message_info' >"
														+"<div class='message_content_and_cpname'><span class='cpname'>"+ result.company_name +"：</span><span class='message_content'>"+ params.message +"</span></div>"
														+"<div class='time_and_return_button clearfix'><span class='create_time f_l' >"+ now_date +"</span><span class='f_l' style='text-align:center;'><img class='return_button' src='/newresources/images/return_back_button.png'/></span>"+fileimgtext+"</div>"
														+fileimglist
													+"</div>"
												+"</div>";
				
				var message_return_block = obj.parent().find(".message_return_block");
				
				//移出回复框，增加回复信息
				obj.parent().find(".return_message_text_box").remove();
				obj.parent().find(".return_submit_message_button").remove();
				message_return_block.append(return_back_block_single);
				//message_return_block.append(fileimglist);
				returnBackButtonAction();//绑定点击回复信息按钮触发展示回复框事件
			}
		};
		
		if(params.message){//不为空执行
		   if(params.message.toString().length>140){
		     var option ={title:"提示",btn:parseInt("0001",2)};
			 window.wxc.xcConfirm("输入的字符长度超过140,请修改",window.wxc.xcConfirm.typeEnum.custom,option);
		     }else{
			 asyncAjaxMethod(url,params,isasync,fn);
			 }
		}else{
			obj.prev().attr("placeholder","输入不能为空");
		}
	}
	
	//获取本公司的logo图mogondbId
	function getmogodbId(companyId){
		var mogondb_id = null;
		var url = "PfTaskFileCtrl/getTaskFileListForWindow.do";
		var params = {};
		params.companyId = companyId;
		params.fileTypeId = 22;
		
		var isasync = false;//同步执行  否则在样式加载时无法渲染
		var fn = function(result){
			if(result.ajaxErrorCode == 200){
				if(result.data.length > 0 && result.data[0].mogodb_id != null){
					mogondb_id = result.data[0].mogodb_id;//获取mogondb_id
					
				}	
			}
		};		
		asyncAjaxMethod(url,params,isasync,fn);
		return mogondb_id;
	}
	
	//绑定点击回复信息按钮触发展示回复框事件
	function returnBackButtonAction(){
	var flag = true;
		$(".return_button").click(function(){
		if(flag){
		    var imageLoad = doT.template($("#image_return_button").text());
			var return_back_block = "<textarea class='return_message_text_box' ></textarea>"
									+"<div class='return_submit_message_button mt10' >回复</div>";
			var is_exist_return_block = $(this).parents(".message_single_modle").has("textarea").length;
			
			if(!is_exist_return_block){//判断是否已经显示了回复框。  没有则增加，有则无操作
				$(this).parents(".message_single_modle").append(return_back_block);
				$(this).parents(".message_single_modle").append(imageLoad);
			}
			var flag_s = true;
			$(".return_submit_message_button").click(function(){//绑定回复按钮触发事件
			if(flag_s){
				submitReturnMessage($(this));//回复信息提交
				flag_s = false;
				}
			});
				flag = false;
			}
		});
	}
/**
	 * 在交流中添加图片
	 * @date 2016-6-22
	 * @auto chenlong 
	 */
	function addlogisticImg(obj,returnType){
	     var returnTypes = parseInt(returnType);
	     var id1 = "";//uploadelogimg
	     var id2 = "";
	     if(returnTypes==1){
	      id1 = "uploadelogimg";
	      id2 = "uplogisticsimg_list";
	     }else if(returnTypes==2){
	      id1 = "uploadelogimgreturn";
	      id2 = "uplogisticsimgreturn_list";
	     }
		 var filename=$("#"+id1).val();//上传的文件信息	 
		 
		   if(filename!=""){
		   	var spinner = new Spinner(opts);
		   		$(obj).parent().append("<div id='processFile_spin_wrap'></div>");
			   	$("#processFile_spin_wrap").addClass("inner_spin_mask");
				spinner.spin(document.getElementById("processFile_spin_wrap"));
				
				var fileurl = "taskLogistics/addLogisticsImgFileForProducer.do";
				var params = {"t_id":taskid,"file_type":44,"companyId":company_id};
				var fn = function(data){
			        	//关闭loding效果
			   			spinner.spin();
			   			$("#processFile_spin_wrap").remove();
			        	var imageItem='';
			        	if (data.success==true && data.message=='上传成功') { 
			        		var newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+data.file_path;		    					    						    				    	
			    				imageItem +=
			    				"<li>"+
			    				"<input style='display:none' value='"+data.tf_id+"' />"+
								"<div class='logistics_image_block_pic'>"+
									"<img src='"+((newsrc==null)?"":newsrc)+"' />"+
									"<div class='a_bg'></div>"+
									"<div class='oprate_wrap'><a href='javascript:void(0)' onclick='dellogisticsimg(this,"+data.tf_id+")'>删除</a></div>"+
								"</div>"+
							"</li>"; 				
			    			$("#"+id2).append(imageItem);
			    			$(obj).val("");		   						
			            }else{
			            	var option ={title:"提示",btn:parseInt("0001",2)};
			            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
			            }					
				};
			    addInputUtilFile(fileurl,params,id1,fn);
				
		   	   /* $.ajaxFileUpload({
			        url: getwebroot()+"taskLogistics/addLogisticsImgFileForProducer.do", //用于文件上传的服务器端请求地址
			        data: {"t_id":taskid,"file_type":44,"companyId":company_id},  //任务id参数		  
			        fileElementId:id1,//input type=file 的id
			        dataType: 'json',//返回值类型 一般设置为json
			        success: function (data, status)  //服务器成功响应处理函数
			        {    			        	
			        	//关闭loding效果
			   			spinner.spin();
			   			$("#processFile_spin_wrap").remove();
			        	var imageItem='';
			        	if (data.success==true && data.message=='上传成功') { 
			        		var newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+data.file_path;		    					    						    				    	
			    				imageItem +=
			    				"<li>"+
			    				"<input style='display:none' value='"+data.tf_id+"' />"+
								"<div class='logistics_image_block_pic'>"+
									"<img src='"+((newsrc==null)?"":newsrc)+"' />"+
									"<div class='a_bg'></div>"+
									"<div class='oprate_wrap'><a href='javascript:void(0)' onclick='dellogisticsimg(this,"+data.tf_id+")'>删除</a></div>"+
								"</div>"+
							"</li>"; 				
			    			$("#"+id2).append(imageItem);
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
			    }); */
			   
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
					var url = "taskFile/deleteTaskFileForProducer.do";
					var params={"t_id":taskid,"tf_id":tf_id};
					var fn=function(result){									
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
function toggle_imglist(imageobj,recordid)
	{
	var obj =  $(imageobj).parent();//选取上级元素
	var licount = $(obj).next().find("ul li").length;//判断图片是否已加载
	if(licount==0){
	 var url = "taskFile/getLogicticsFilelist.do";
	 var params={"record_id":recordid};
	 var fn=function(result){									
		 var filelist = result.data;
		 var len = filelist.length;
		 var imageli ="";
		 for(var i=0;i<len;i++){
			 var image=filelist[i];
			 var newsrc = null;				
			 newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+image.object_id;		
			 imageli += "<li><div class='td_img_block'><img src='"+((newsrc==null)?"":newsrc)+"' /></div></li>";			
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
</script>
<script id="image_button" type="text/x-dot-template">
<div class="upload_wrap clearfix">
	<div class="relat_div f_l ml10">
		<button class="upload_button">添加图片</button>
		<input class="uploadfile_input" type="file" name="file" id="uploadelogimg" onchange="addlogisticImg(this,1)">
	</div>
	<div class="f_l">
      <ul class="logistics_img_ul" id="uplogisticsimg_list">
      </ul>
	</div>
</div>
</script>
<script id="image_return_button" type="text/x-dot-template">
<div class="upload_wrap clearfix" style="margin-left:88px;">
	<div class="relat_div f_l">
		<button class="upload_button">添加图片</button>
		<input class="uploadfile_input" type="file" name="file" id="uploadelogimgreturn" onchange="addlogisticImg(this,2)">
	</div>
	<div class="f_l" style="width:870px;">
      <ul class="logistics_img_ul" id="uplogisticsimgreturn_list">
      </ul>
	</div>
</div>
</script>
</body>
</html>
