
var taskid =getParamFromWindowName("task_id");
var companyId=getParamFromWindowName("companyIdForAll");

var other_rowCount=0;//其他文件ID序号
/*
 * 产品图片部分js效果所需变量
 * */
var tempLength = 0; //临时变量,当前移动的长度
	var viewNum = 3; //设置每次显示图片的个数量
	var moveNum = 1; //每次移动的数量
	var moveTime = 300; //移动速度,毫秒
	var scrollDiv;
	var scrollItems;
	var moveLength;
	var countLength;
	
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
/**
 * 根据状态控制文件的各个上传按钮
 * @param state
 * 
 */
var state ="";
function stateTaskInfo(states){
	state =states;
	switch(parseInt(states)){
	case 5:		
		stateHeadPic();//任务单head上按钮
		showProcessAddButton();//工艺文件的新增按钮
		showStop1();//取消按钮
		break;
	case 10:
		showStop2();//取消按钮
		showProcessAddButton();//工艺文件的新增按钮
		showinfo();
		break;
	case 15:
		showwl();//物料发送按钮
		showProcessAddButton();//工艺文件的新增按钮
		showConnection();//交流按钮
		break;
	case 20:
		showProcessAddButton();//工艺文件的新增按钮
		showConnection();
		break;
	case 25:		
		break;
	case 30:	
		break;
	case 40:
		showEnd();//显示终止详情按钮
		break;
	default:
		break;
	}
}

/**
 * 任务单head上按钮
 */
function stateHeadPic(){	
	                var mainpic = '<li class="overflow_h">'+
						'<a href="javascript:void(0)">上传产品主图</a>'+
						'<div class="relat_div">'+
							'<input type="file" name="file" id = "product_mains_pic_head" class="uploadfile_input" onChange="uploadProductMainPic_head()" />'+
						'</div>'+
					'</li>'+
					'<li class="overflow_h">'+
						'<a href="javascript:void(0)">上传作业指导</a>'+
						'<div class="relat_div">'+
							'<input type="file" name="file" id = "up_operate_file" class="uploadfile_input" onChange="add_job_instruction(this)" />'+
						'</div>'+
					'</li>'+
					'<li>'+					
						'<a href="javascript:void(0)" class="hover_down">上传工艺附件</a>'+					
						'<ul>'+
						'<li class="overflow_h"><a>图片</a>'+
						'<div class="relat_div">'+
							'<input type="file" name="file" id = "upload_process_file_btn" class="uploadfile_input" onChange="uploadProcessFile_head(this)" />'+
						'</div>'+
					'</li>'+
					'<li class="overflow_h"><a>文件</a>'+
						'<div class="relat_div">'+
							'<input type="file" name="file" id = "other_process_file_btn" class="uploadfile_input" onChange="addOtherFile_head(this)" />'+
						'</div>'+
					'</li>'+
					'<li class="overflow_h"><a>视频</a>'+
						'<div class="relat_div">'+
							'<input type="file" name="file" id = "view_pr_mp4_btn" class="uploadfile_input" onChange="add_processVedioFile_head(this)" />'+					
					'</li>'+
						'</ul>'+
						'</div>'+
					'</li>'+
					
					'<li>'+
					   '<a href="javascript:void(0)" onClick="sendOrder()">派单</a>'+
					'</li>';		    
	            $("#stateHeadbutton").prepend(mainpic);	//任务单表头按钮
	      	   
				var PicCenter =' <li id="product_file_pic">'+
				    '<div class="image_block_pic">'+
						'<img  src="/newresources/images/other/7.png" />'+
						'<input type="file" name="file" id ="product_prc_file" class="uploadfile_input" onChange="addscrollImg(this)" />'+
					'</div>'+
				'</li>' ;
				$("#product_ul_file_list").prepend(PicCenter);//产品图片
				var mainPic ='<a class="img_a"><img src="/newresources/images/other/6.png" id="show_product_main_pic"/></a>'+
				'<a id = "open_clury" style="display: none;" ></a>'+
				'<input type="file" id="product_mains_pic" name="file" class="uploadfile_input" onChange="uploadProductMainPic(this)" />';
				$("#prcmain_img").prepend(mainPic);//产品主图片
				var qcButton = '<div class="f_r_oprate_btn_inner">'+
					'<button class="f_r_botton"  >新增</button>'+
					'<input type="file" name ="file" id="add_QC_file" class="uploadfile_input" onChange="add_QcFile(this)"/>'+
				'</div>';
				$("#qc_button_show").prepend(qcButton);//质检新增按钮
				
				var processButton = '<div class="f_r_oprate_btn_inner">'+
					'<button class="f_r_botton" >新增</button>'+
					'<input type="file" name="file" id="updates_instruction_file" class="uploadfile_input" onChange="up_instruction_file(this)"/>'+
				'</div>';
				$("#job_instruction_wrap").prepend(processButton);//作业指导的新增按钮
}
/**工艺文件的新增按钮**/
function showProcessAddButton(){
	var otherPic ='<li>'+
	'<div class="image_block_pic">'+
		'<img src="/newresources/images/other/11.png" id="show_process_file"/>'+
		'<input type="file" class="uploadfile_input" name="file" id="upload_process_file" onchange="uploadProcessFile(this)"/>'+
	'</div>'+
	'</li>';
	$("#image_file_list").prepend(otherPic);//工艺图片的上传按钮
	var otherButton1 ='<div class="f_r_oprate_btn_inner">'+
	'<button class="f_r_botton" >新增</button>'+
	'<input type="file" name="file" id="other_process_file1" class="uploadfile_input" onChange="addOtherFile(this,2)"/>'+
	'</div>';
	$("#other_button_show1").prepend(otherButton1);//裁剪产品样板图、派版图片的上传按钮
	var otherButton2 ='<div class="f_r_oprate_btn_inner">'+
	'<button class="f_r_botton" >新增</button>'+
	'<input type="file" name="file" id="other_process_file2" class="uploadfile_input" onChange="addOtherFile(this,3)"/>'+
	'</div>';
	$("#other_button_show2").prepend(otherButton2);//丝印、绣花定位图片的上传按钮
	
	var otherButton ='<div class="f_r_oprate_btn_inner">'+
	'<button class="f_r_botton" >新增</button>'+
	'<input type="file" name="file" id="other_process_file" class="uploadfile_input" onChange="addOtherFile(this,1)"/>'+
	'</div>';
	$("#other_button_show").prepend(otherButton);//其他文件新增按钮
	var otherVideo =' <li>'+
	'<div class="image_block_pic">'+
		'<img src="/newresources/images/other/17.png" />'+
		'<input type="file" name="file" id="view_pr_mp4"class="uploadfile_input" onchange="add_processVedioFile(this)" />'+
	'</div>'+
	'</li>';
	$("#view_file_list").prepend(otherVideo);//工艺文件视频的上传按钮
}
function showConnection(){
	 connection ='<p  style="color:#808080">如有疑问可<a href="javascript:void(0)" onClick="abortOrder()" class="a_link_custom">终止</a>或<a href="javascript:void(0)" onClick="go_connection()" class="a_link_custom">给对方留言</a>直接沟通</p>';
	 $("#stoptask").after(connection);//任务单的取消按钮
}
//取消按钮
function showStop1(){
	$("#stoptask").next("p").remove();
	 var stop =
         '<p class="mt10 mr10">如有异常可<a href="javascript:void(0)" class="a_link_custom" onClick="stopOrder()">取消</a>（取消后流转将停止）</p>';			
  $("#stoptask").after(stop);//任务单的取消按钮
}
//取消按钮收回派单
function showStop2(){
	$("#stoptask").next("p").remove();
	 var stop =
         '<p class="mt10 mr10">如有异常可<a href="javascript:void(0)" class="a_link_custom" onClick="recoverOrder('+taskid+')">收回派单</a>重新派单或<a href="javascript:void(0)" class="a_link_custom" onClick="stopOrder()">取消</a>（取消后流转将停止）</p>';			
  $("#stoptask").after(stop);//任务单的取消按钮
}
//展示对方接受信息
function showinfo(){
	 var info =
         '<p class="mt10 mr10">等待对方接受</p>';			
  $("#stoptask").before(info);//任务单的取消按钮
}
//显示终止详情按钮
function showEnd(){
	$("#stoptask").next("p").remove();
	 var stop =
        '<p class="mt10 mr10"><a href="javascript:void(0)" class="a_link_custom" onClick="showEndReason()">终止详情</a></p>';			
 $("#stoptask").after(stop);//任务单的取消按钮
}
//显示物料发送按钮
function showwl(){
	var wl ='<li>'+
					'<a href="javascript:void(0)" onClick="go_logistics()">物料发送</a>'+
			'</li> ';
	$('#stateHeadbutton').prepend(wl);
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
	   				closeBytimeCount_task(2);	   				
	   			}else if(result.message=="任务单当前已被收回,无法再操作"){
	   				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
	   				closeBytimeCount_task(2);
	   			}
	   				else if(result.message=="成功"){
	   					location.reload(true);
	   			}
	   		};
	   		asyncAjaxMethod(url,params,true,fn);
		}
	});
}
//Tab控制函数
function tabs(tabId, tabNum){
	//设置点击后的切换样式
	$(tabId + " .tab li").removeClass("curr");
	$(tabId + " .tab li").eq(tabNum).addClass("curr");
	    switch(tabNum){
	case 0:
		fileQcFileList();		
	    break;
	case 1:
		fileLoadList();
		fileLoadOtherList();
		fileLoadViewList();
		fileOperationList(state);
		break;		
	case 2:
		Prolist();
		break;
	case 3:
		Bomlist();
		break;
		
	
	}
	//根据参数决定显示内容
	$(tabId + " .tabcon").hide();
	$(tabId + " .tabcon").eq(tabNum).show();
	$.scrollTo('#comment',500);
}
/*
 * 产品图片js效果
 * */
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

/**
 * 任务单主图的上传，仅限一张
 */

function uploadProductMainPic(vo){  
	   var parentObj=$("#prcmain_img");
	   var imgUrl=parentObj.find("img").attr("src");
	   if(imgUrl!="/newresources/images/other/6.png"){
	   		window.wxc.xcConfirm("任务单主图已存在,不可重复添加", window.wxc.xcConfirm.typeEnum.info,{
				onOk:function(){
				}
			});	
	   }else{
	   	var filename=$("#product_mains_pic").val();
	   	if(filename!=""){	   			 
			var spinner = new Spinner(opts);
			$("#prcmain_img").append("<div id='prcmain_spin_wrap'></div>");
			$("#prcmain_spin_wrap").addClass("inner_spin_mask");
			spinner.spin(document.getElementById("prcmain_spin_wrap"));
			
			var fileurl = "taskFile/uploadProductMainPic.do";
			var params = {"t_id":taskid,"companyId":companyId};
			var fn = function(data){
			    //关闭loding效果
	   			spinner.spin(); 
	   			$("#prcmain_spin_wrap").remove();
	        	if (data.success==true &&data.message=='上传成功') {  
	        		var newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+data.file_path;		        		
	        		$("#prcmain_img").empty();
	        		var s_in ='<a class="img_a"><img src="'+((newsrc==null)?"":newsrc)+'" id="show_product_main_pic"/></a>' +
	        				'<div class="a_bg"></div>'+
	        				'<div class="oprate_wrap"><a href="javascript:void(0)" onClick="del_product_main_img(this,'+data.tf_id+')">删除</a></div>'+
					'<input type="file" id="product_mains_pic" name="file" class="uploadfile_input" onChange="uploadProductMainPic(this)" />';					    		        		
	        		$("#prcmain_img").html(s_in);
	        		$("#product_mains_pic").val("");
	        		$("#open_clury").on("click",window.open(getwebroot()+'fileCenter/cutImage.htm?filename='+data.file_path+"&imgid=show_product_main_pic&fix_w=220&fix_h=220", 'newwindow','height=500,width=500,top=0,left=100,toolbar=no,menubar=no,location=no, status=no'));		        			        				        	
	            }else{
	            	var option ={title:"提示",btn:parseInt("0001",2)};
	            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
	            }
			};
		    addInputUtilFile(fileurl,params,"product_mains_pic",fn);			
			
			/*$.ajaxFileUpload({
		        url: getwebroot()+'taskFile/uploadProductMainPic.do', //用于文件上传的服务器端请求地址
		        data: {"t_id":taskid,"companyId":companyId},  //任务id参数	
		        fileElementId: "product_mains_pic",//input type=file 的id
		        dataType: 'json',//返回值类型 一般设置为json
		        beforeSend: function () {
		        	
				   },
		        success: function (data, status)  //服务器成功响应处理函数
		        {    //关闭loding效果
		   			spinner.spin(); 
		   			$("#prcmain_spin_wrap").remove();
		        	if (data.success==true &&data.message=='上传成功') {  
		        		var newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+data.file_path;		        		
		        		$("#prcmain_img").empty();
		        		var s_in ='<a class="img_a"><img src="'+((newsrc==null)?"":newsrc)+'" id="show_product_main_pic"/></a>' +
		        				'<div class="a_bg"></div>'+
		        				'<div class="oprate_wrap"><a href="javascript:void(0)" onClick="del_product_main_img(this,'+data.tf_id+')">删除</a></div>'+
						'<input type="file" id="product_mains_pic" name="file" class="uploadfile_input" onChange="uploadProductMainPic(this)" />';					    		        		
		        		$("#prcmain_img").html(s_in);
		        		$("#product_mains_pic").val("");
		        		$("#open_clury").on("click",window.open(getwebroot()+'fileCenter/cutImage.htm?filename='+data.file_path+"&imgid=show_product_main_pic&fix_w=220&fix_h=220", 'newwindow','height=500,width=500,top=0,left=100,toolbar=no,menubar=no,location=no, status=no'));		        			        				        	
		        		//打开图片调整界面
		        		//window.open(getwebroot()+'fileCenter/cutImage.htm?filename='+data.file_path+"&imgid=show_product_main_pic&fix_w=220&fix_h=220", 'newwindow','height=500,width=500,top=0,left=100,toolbar=no,menubar=no,location=no, status=no');
		            }else{
		            	var option ={title:"提示",btn:parseInt("0001",2)};
		            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
		            }
		        },
		        error: function (data, status, e)//服务器响应失败处理函数
		        {
		        	//关闭loding效果
		   			spinner.spin();
		   			$("#prcmain_spin_wrap").remove();
		        	var option ={title:"提示",btn:parseInt("0001",2)};
		            window.wxc.xcConfirm("解析失败",window.wxc.xcConfirm.typeEnum.custom,option);
		        }
		    });	*/	   
	   }else{
		   var option ={title:"提示",btn:parseInt("0001",2)};
	   		window.wxc.xcConfirm("请先选择上传的文件", window.wxc.xcConfirm.typeEnum.custom,option);
	   }
	 }
}
function reloadImageByID(imgid){
	var old_src=$("#"+imgid).attr("src");
	$("#"+imgid).attr("src", old_src+"&time="+new Date().getTime());
}
/**
 * 任务单主图的上传，仅限一张
 */
function uploadProductMainPic_head(){  
	   var parentObj=$("#prcmain_img");
	   var imgUrl=parentObj.find("img").attr("src");
	   if(imgUrl!="/newresources/images/other/6.png"){
	   		window.wxc.xcConfirm("任务单主图已存在,不可重复添加", window.wxc.xcConfirm.typeEnum.info,{
				onOk:function(){

				}
			});	
	   }else{
	  	 var filename=$("#product_mains_pic_head").val();
	  	 if(filename!=""){
	  		var fileurl = "taskFile/uploadProductMainPic.do";
	  		var params = {"t_id":taskid,"file_type":7,"companyId":companyId};
	  		var fn = function(data){
	        	if (data.success==true &&data.message=='上传成功') {  
	        		var newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+data.file_path;		        		
	        		
	        		$("#prcmain_img").empty();
	        		var s_in ='<a class="img_a"><img src="'+((newsrc==null)?"":newsrc)+'" id="show_product_main_pic"/></a>' +
	        				'<div class="a_bg"></div>'+
	        				'<div class="oprate_wrap"><a href="javascript:void(0)" onClick="del_product_main_img(this,'+data.tf_id+')">删除</a></div>'+
					'<input type="file" id="product_mains_pic" name="file" class="uploadfile_input" onChange="uploadProductMainPic(this)" />';					    		        		
	        		$("#prcmain_img").html(s_in); 
	        		$("#product_mains_pic_head").val("");
	        		//打开图片调整界面
	        		window.open(getwebroot()+'fileCenter/cutImage.htm?filename='+data.file_path+"&imgid=show_product_main_pic&fix_w=220&fix_h=220", 'newwindow','height=500,width=500,top=0,left=100,toolbar=no,menubar=no,location=no, status=no');
	            }else{
	            	var option ={title:"提示",btn:parseInt("0001",2)};
	            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
	            }
	  		};
	  	    addInputUtilFile(fileurl,params,"product_mains_pic_head",fn); 
	  		 
	   	   /*$.ajaxFileUpload({
		        url: getwebroot()+'taskFile/uploadProductMainPic.do', //用于文件上传的服务器端请求地址
		        data: {"t_id":taskid,"file_type":7,"companyId":companyId},  //任务id参数	
		        fileElementId: "product_mains_pic_head",//input type=file 的id
		        dataType: 'json',//返回值类型 一般设置为json
		        success: function (data, status)  //服务器成功响应处理函数
		        {            
		        	if (data.success==true &&data.message=='上传成功') {  
		        		var newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+data.file_path;		        		
		        		
		        		$("#prcmain_img").empty();
		        		var s_in ='<a class="img_a"><img src="'+((newsrc==null)?"":newsrc)+'" id="show_product_main_pic"/></a>' +
		        				'<div class="a_bg"></div>'+
		        				'<div class="oprate_wrap"><a href="javascript:void(0)" onClick="del_product_main_img(this,'+data.tf_id+')">删除</a></div>'+
						'<input type="file" id="product_mains_pic" name="file" class="uploadfile_input" onChange="uploadProductMainPic(this)" />';					    		        		
		        		$("#prcmain_img").html(s_in); 
		        		$("#product_mains_pic_head").val("");
		        		//打开图片调整界面
		        		window.open(getwebroot()+'fileCenter/cutImage.htm?filename='+data.file_path+"&imgid=show_product_main_pic&fix_w=220&fix_h=220", 'newwindow','height=500,width=500,top=0,left=100,toolbar=no,menubar=no,location=no, status=no');
		            }else{
		            	var option ={title:"提示",btn:parseInt("0001",2)};
		            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
		            }
		        },
		        error: function (data, status, e)//服务器响应失败处理函数
		        {
		        	var option ={title:"提示",btn:parseInt("0001",2)};
		            window.wxc.xcConfirm("解析失败",window.wxc.xcConfirm.typeEnum.custom,option);
		        }
		    });	*/	   
	   }else{
		   var option ={title:"提示",btn:parseInt("0001",2)};
	   		window.wxc.xcConfirm("请先选择上传的文件", window.wxc.xcConfirm.typeEnum.custom,option);
	   }
	  }
}
/**
 * 任务单展示图片的上传
 */
function uploadProductFile(){  
   var filename=$("#product_prc_file").val();
  // window.wxc.xcConfirm(filename);
   if(filename!=""){
		var fileurl = "taskFile/addTaskImgFile.do";
		var params = {"t_id":taskid,"file_type":8,companyId:companyId};
		var fn = function(data){
        	if (data.success==true &&data.message=='上传成功') {  
        		var newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+data.file_path;
        		var productItem="";
        			productItem = productItem+
        		'<li>'+
				'<div style="cursor:pointer" class="image_block_pic">'+
					'<img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView(8,'+data.tf_id+')"/>'+
					'<div class="a_bg"></div>'+
					'<div class="oprate_wrap"><a href="javascript:void(0)" onClick="del_ProductFile(this,'+data.tf_id+')">删除</a></div>'+
				'</div>'+
		     	'</li>';
        		$(productItem).insertAfter("#product_file_pic");//吧刚上传的文件放在这个元素的后面
        		$("#product_prc_file").val("");
            }else{
            	 var option ={title:"提示",btn:parseInt("0001",2)};
            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
            }
		};
	    addInputUtilFile(fileurl,params,"product_prc_file",fn);
	   
   	   /*$.ajaxFileUpload({
	        url: getwebroot()+'taskFile/addTaskImgFile.do', //用于文件上传的服务器端请求地址
	        data: {"t_id":taskid,"file_type":8,companyId:companyId},  //任务id参数	
	        fileElementId: "product_prc_file",//input type=file 的id
	        dataType: 'json',//返回值类型 一般设置为json
	        success: function (data, status)  //服务器成功响应处理函数
	        {            
	        	if (data.success==true &&data.message=='上传成功') {  
	        		var newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+data.file_path;
	        		var productItem="";
	        			productItem = productItem+
	        		'<li>'+
					'<div style="cursor:pointer" class="image_block_pic">'+
						'<img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView(8,'+data.tf_id+')"/>'+
						'<div class="a_bg"></div>'+
						'<div class="oprate_wrap"><a href="javascript:void(0)" onClick="del_ProductFile(this,'+data.tf_id+')">删除</a></div>'+
					'</div>'+
			     	'</li>';
	        		$(productItem).insertAfter("#product_file_pic");//吧刚上传的文件放在这个元素的后面
	        		$("#product_prc_file").val("");
	            }else{
	            	 var option ={title:"提示",btn:parseInt("0001",2)};
	            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
	            }
	        },
	        error: function (data, status, e)//服务器响应失败处理函数
	        {
	            window.wxc.xcConfirm("错误代码："+status+'\t 解析失败'
	            		, window.wxc.xcConfirm.typeEnum.error
	            );
	        }
	    });*/
	   
   }else{
	   var option ={title:"提示",btn:parseInt("0001",2)};
   		window.wxc.xcConfirm("请先选择上传的文件", window.wxc.xcConfirm.typeEnum.custom,option);
   }
}
/**
 * 工艺文件图片上传
 */
function uploadProcessFile(obj){	
	 var  fileElId = "upload_process_file";
	 var  ulfile = "image_file_list";
	 var  filename=$("#upload_process_file").val();//图片文件上传的文件信息	
	 var  file_type = 1;
	  
	   if(filename!=""){
	   	var spinner = new Spinner(opts);
	   		$(obj).parent().append("<div id='processFile_spin_wrap'></div>");
		   	$("#processFile_spin_wrap").addClass("inner_spin_mask");
			spinner.spin(document.getElementById("processFile_spin_wrap"));
			
			var fileurl = "taskFile/addTaskImgFile.do";
			var params = {"t_id":taskid,"file_type":file_type,companyId:companyId};
			var fn = function(data){    
	        	//关闭loding效果
	   			spinner.spin();
	   			$("#processFile_spin_wrap").remove();
	        	if (data.success==true && data.message=='上传成功') {  		        		
						var filename = data.filename;
						filename = strVachar(filename,25);											
	        		var newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+data.file_path;	
	    			/**因为能上传，说明状态为"等待派单，派单中，生产中"之一，
	    			 * 派发前，直接删除记录；
					 * 派单中或者生产中，删除时is_delete置1.
					 * is_delete;//0没删除；1已删除*/
	    			var imageItem="";		    						    				    	
	    				imageItem =imageItem+
	    				'<li>'+
	    				'<div class="image_block_pic" style="cursor:pointer">'+
		                 '<img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView('+file_type+','+data.tf_id+')" />';
	    					if(state ==5){//等待派单，物理删除
								imageItem =imageItem+
								'<div class="a_bg"></div>'+
								'<div class="oprate_wrap">'+
									'<a onClick="DelImageProcessFile(this,'+data.tf_id+')" href="javascript:void(0)">删除</a>'+
								'</div>'+
								'</div>';
							}
							
							if(state !=5){//派单中或者生产中，并且小于等于两天，逻辑删除
								imageItem =imageItem+
								'<div class="a_bg"></div>'+
								'<div class="oprate_wrap">'+
									'<a onClick="updatetaskfile2del(this,'+data.tf_id+')" href="javascript:void(0)">作废</a>'+
								'</div>'+
								'<div class="invalidWrap"><div class="b_bg"></div><img src="/newresources/images/tasks/invalid.png" class="invalid"></div>'+
								'</div>';
							}
						imageItem =imageItem+
	    				'<div class="edit_div clearfix">'+
	    					'<p><label style="display:none;color:#555;">'+((data.filename==null)?"":filename)+'</label><input type="text" class="edit_input"  value="'+((data.filename==null)?"":data.filename)+'" /></p>' +
	    					'<label style="display:none;color:#555;"></label><input type="text" class="edit_input"  placeholder="图片描述"/>' +
	    					'<p><span class="l_span c999 fs10">'+new Date().Format("yyyy-MM-dd HH:mm:ss")+'</span>'+
	    					'<a href="javascript:void(0)" class="eidt" style="display:none" onClick="edituploadImg(this)">编辑</a>' +
	    					'<a href="javascript:void(0)" class="eidt_save"  style="display:block" onClick="saveuploadImg(this,'+data.tf_id+')">保存</a></p>' +
	    				'</div>' +
	    				'</li>';	    			
	    				$("#"+ulfile).append(imageItem);
	    				$(obj).val("");		   
				
	            }else{		 
	            	var option ={title:"提示",btn:parseInt("0001",2)};
	            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
	            }
			};
		    addInputUtilFile(fileurl,params,fileElId,fn);
			
			
			
	   	   /*$.ajaxFileUpload({
		        url: getwebroot()+'taskFile/addTaskImgFile.do', //用于文件上传的服务器端请求地址
		        data: {"t_id":taskid,"file_type":file_type,companyId:companyId},  //任务id参数		  
		        fileElementId: fileElId,//input type=file 的id
		        dataType: 'json',//返回值类型 一般设置为json
		        success: function (data, status)  //服务器成功响应处理函数
		        {    
		        	//关闭loding效果
		   			spinner.spin();
		   			$("#processFile_spin_wrap").remove();
		        	if (data.success==true && data.message=='上传成功') {  		        		
							var filename = data.filename;
							filename = strVachar(filename,25);											
		        		var newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+data.file_path;	
		    			*//**因为能上传，说明状态为"等待派单，派单中，生产中"之一，
		    			 * 派发前，直接删除记录；
						 * 派单中或者生产中，删除时is_delete置1.
						 * is_delete;//0没删除；1已删除*//*
		    			var imageItem="";		    						    				    	
		    				imageItem =imageItem+
		    				'<li>'+
		    				'<div class="image_block_pic" style="cursor:pointer">'+
			                 '<img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView('+file_type+','+data.tf_id+')" />';
		    					if(state ==5){//等待派单，物理删除
									imageItem =imageItem+
									'<div class="a_bg"></div>'+
									'<div class="oprate_wrap">'+
										'<a onClick="DelImageProcessFile(this,'+data.tf_id+')" href="javascript:void(0)">删除</a>'+
									'</div>'+
									'</div>';
								}
								
								if(state !=5){//派单中或者生产中，并且小于等于两天，逻辑删除
									imageItem =imageItem+
									'<div class="a_bg"></div>'+
									'<div class="oprate_wrap">'+
										'<a onClick="updatetaskfile2del(this,'+data.tf_id+')" href="javascript:void(0)">作废</a>'+
									'</div>'+
									'<div class="invalidWrap"><div class="b_bg"></div><img src="/newresources/images/tasks/invalid.png" class="invalid"></div>'+
									'</div>';
								}
							imageItem =imageItem+
		    				'<div class="edit_div clearfix">'+
		    					'<p><label style="display:none;color:#555;">'+((data.filename==null)?"":filename)+'</label><input type="text" class="edit_input"  value="'+((data.filename==null)?"":data.filename)+'" /></p>' +
		    					'<label style="display:none;color:#555;"></label><input type="text" class="edit_input"  placeholder="图片描述"/>' +
		    					'<p><span class="l_span c999 fs10">'+new Date().Format("yyyy-MM-dd HH:mm:ss")+'</span>'+
		    					'<a href="javascript:void(0)" class="eidt" style="display:none" onClick="edituploadImg(this)">编辑</a>' +
		    					'<a href="javascript:void(0)" class="eidt_save"  style="display:block" onClick="saveuploadImg(this,'+data.tf_id+')">保存</a></p>' +
		    				'</div>' +
		    				'</li>';	    			
		    				$("#"+ulfile).append(imageItem);
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
 * 工艺文件图片上传
 */
function uploadProcessFile_head(obj){
	   var filename=$("#upload_process_file_btn").val();//上传的文件信息	 

	   if(filename!=""){
			var fileurl = "taskFile/addTaskImgFile.do";
			var params = {};
			var fn = function(data){            
	        	if (data.success==true && data.message=='上传成功') {  
	        		if(data.filename != null){
						var filename = data.filename;
						filename = strVachar(filename,25);				
						}
					var newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+data.file_path;		    					    					    					    			
	    			/**因为能上传，说明状态为"等待派单，派单中，生产中"之一，
	    			 * 派发前，直接删除记录；
					 * 派单中或者生产中，删除时is_delete置1.
					 * is_delete;//0没删除；1已删除*/
	    			var imageItem="";		    						    				    	
	    				imageItem =imageItem+
	    				'<li>'+
	    				'<div class="image_block_pic" style="cursor:pointer">'+
		                 '<img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView(1,'+data.tf_id+')"/>';
	    					if(state ==5){//等待派单，物理删除
								imageItem =imageItem+
								'<div class="a_bg"></div>'+
								'<div class="oprate_wrap">'+
									'<a onClick="DelImageProcessFile(this,'+data.tf_id+')" href="javascript:void(0)">删除</a>'+
								'</div>'+'</div>';
							}
							if(state !=5){//派单中或者生产中，并且小于等于两天，逻辑删除
								imageItem =imageItem+
								'<div class="a_bg"></div>'+
								'<div class="oprate_wrap">'+
									'<a onClick="updatetaskfile2del(this,'+data.tf_id+')" href="javascript:void(0)">作废</a>'+
								'</div>'+'</div>';
							}
						imageItem =imageItem+
	    				'<div class="edit_div clearfix">'+
	    					'<p><label style="display:none;color:#555;" >'+((data.filename==null)?"":filename)+'</label><input type="text" class="edit_input"  value="'+((data.filename==null)?"":data.filename)+'" /></p>' +
	    					'<label style="display:none ;color:#555;"></label><input type="text" class="edit_input"  placeholder="图片描述" />' +
	    					'<p><span class="l_span c999 fs10">'+new Date().Format("yyyy-MM-dd HH:mm:ss")+'</span>'+
	    					'<a href="javascript:void(0)" class="eidt" style="display:none" onClick="edituploadImg(this)">编辑</a>' +
	    					'<a href="javascript:void(0)" class="eidt_save"  style="display:block" onClick="saveuploadImg(this,'+data.tf_id+')">保存</a></p>' +
	    				'</div>' +
	    				'</li>';	    			
	    				$("#image_file_list").append(imageItem);
	    				$(obj).val("");	
	    				tabs('#comment',1);
	    				$("html,body").animate({scrollTop:$('#image_file_list').offset().top},1000);
	    				$("#job_instruction_wrap").fadeOut('fast');
					
	            }else{
	            	 var option ={title:"提示",btn:parseInt("0001",2)};
	            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
	            }
			};
		    addInputUtilFile(fileurl,params,"upload_process_file_btn",fn);
		   
	   	   /*$.ajaxFileUpload({
		        url: getwebroot()+'taskFile/addTaskImgFile.do', //用于文件上传的服务器端请求地址
		        data: {"t_id":taskid,"file_type":1,companyId:companyId},  //任务id参数		  
		        fileElementId: "upload_process_file_btn",//input type=file 的id
		        dataType: 'json',//返回值类型 一般设置为json
		        success: function (data, status)  //服务器成功响应处理函数
		        {            
		        	if (data.success==true && data.message=='上传成功') {  
		        		if(data.filename != null){
							var filename = data.filename;
							filename = strVachar(filename,25);				
							}
						var newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+data.file_path;		    					    					    					    			
		    			*//**因为能上传，说明状态为"等待派单，派单中，生产中"之一，
		    			 * 派发前，直接删除记录；
						 * 派单中或者生产中，删除时is_delete置1.
						 * is_delete;//0没删除；1已删除*//*
		    			var imageItem="";		    						    				    	
		    				imageItem =imageItem+
		    				'<li>'+
		    				'<div class="image_block_pic" style="cursor:pointer">'+
			                 '<img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView(1,'+data.tf_id+')"/>';
		    					if(state ==5){//等待派单，物理删除
									imageItem =imageItem+
									'<div class="a_bg"></div>'+
									'<div class="oprate_wrap">'+
										'<a onClick="DelImageProcessFile(this,'+data.tf_id+')" href="javascript:void(0)">删除</a>'+
									'</div>'+'</div>';
								}
								if(state !=5){//派单中或者生产中，并且小于等于两天，逻辑删除
									imageItem =imageItem+
									'<div class="a_bg"></div>'+
									'<div class="oprate_wrap">'+
										'<a onClick="updatetaskfile2del(this,'+data.tf_id+')" href="javascript:void(0)">作废</a>'+
									'</div>'+'</div>';
								}
							imageItem =imageItem+
		    				'<div class="edit_div clearfix">'+
		    					'<p><label style="display:none;color:#555;" >'+((data.filename==null)?"":filename)+'</label><input type="text" class="edit_input"  value="'+((data.filename==null)?"":data.filename)+'" /></p>' +
		    					'<label style="display:none ;color:#555;"></label><input type="text" class="edit_input"  placeholder="图片描述" />' +
		    					'<p><span class="l_span c999 fs10">'+new Date().Format("yyyy-MM-dd HH:mm:ss")+'</span>'+
		    					'<a href="javascript:void(0)" class="eidt" style="display:none" onClick="edituploadImg(this)">编辑</a>' +
		    					'<a href="javascript:void(0)" class="eidt_save"  style="display:block" onClick="saveuploadImg(this,'+data.tf_id+')">保存</a></p>' +
		    				'</div>' +
		    				'</li>';	    			
		    				$("#image_file_list").append(imageItem);
		    				$(obj).val("");	
		    				tabs('#comment',1);
		    				$("html,body").animate({scrollTop:$('#image_file_list').offset().top},1000);
		    				$("#job_instruction_wrap").fadeOut('fast');
						
		            }else{
		            	 var option ={title:"提示",btn:parseInt("0001",2)};
		            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
		            }
		        	
		        },
		        error: function (data, status, e)//服务器响应失败处理函数
		        {
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
 * 加载材料清单
 */
function Bomlist(){
	var url = 'taskBom/getTaskBomList.do';
	var params={};
	params.t_id=taskid;
	var fn=function(result){
		$("#bomTable tr:gt(0)").empty();
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
		'<td style=\"text-align:left;\">'+((bom.material==null)?"":bom.material)+'</td>'+
		'<td>'+((bom.consumption==null)?"":bom.consumption)+'</td>'+
		'<td>'+((bom.unit==null)?"":bom.unit)+'</td>'+
		'<td>'+((bom.total_consumption==null)?"":bom.total_consumption)+'</td>'+
	'</tr>';
		}
		$(bomItem).insertAfter("#Bomlistup");
		};
		asyncAjaxMethod(url,params,true,fn);					
}
/**
 * 加载额定工时
 */
function Prolist(){
	var url = 'process/getTaskProcessList.do';
	var params={};
	params.t_id=taskid;
	var fn=function(result){	
			$("#processTable tr:gt(0)").empty();
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
			$(proItem).insertAfter("#Processlistup");
	};
	asyncAjaxMethod(url,params,true,fn);
}

/**
 * 任务单图片
 */
function productImg(state){
	var url = 'taskFile/getTaskFileList.do';
	var params={};
	params.t_id=taskid;
	params.file_type=8;
	var fn=function(result){	
			//window.wxc.xcConfirm(result.message);
			$("#product_ul_file_list li:gt(0)").empty();
		  
			var imagelist = result.data;
			var length = imagelist.length;
			var imageItem="";
			var viewbutton ="";
			if(length == 0){
				imageItem =imageItem+
				'<li>'+
				'<div class="image_block_pic">'+
					'<img src="/newresources/images/imageempty.png" />'+					
					'<div class="oprate_wrap"></div>'+
				'</div>'+
		     	'</li>'+
				'<li>'+
				'<div class="image_block_pic">'+
					'<img src="/newresources/images/imageempty.png" />'+			
					'<div class="oprate_wrap"></a></div>'+
				'</div>'+
		     	'</li>'+
		     	'<li>'+
				'<div class="image_block_pic">'+
					'<img src="/newresources/images/imageempty.png" />'+		
					'<div class="oprate_wrap"></a></div>'+
				'</div>'+
		     	'</li>';
			}
			else if(length == 1){
				for(var i=0;i<length;i++){
					var image=imagelist[i];
					var newsrc = null;
					if (image.object_id==null){
						window.wxc.xcConfirm("文件的图片名称为:"+image.file_name+"的文件未上传文件");	
					}else{
					 newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+image.object_id;
					}
					if(state ==5){						
						viewbutton ='<li>'+
						'<div class="image_block_pic" style="cursor:pointer">'+
							'<img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView(8,'+image.tf_id+')"/>'+
							'<div class="a_bg"></div>'+
							'<div class="oprate_wrap"><a href="javascript:void(0)" onClick="del_ProductFile(this,'+image.tf_id+')">删除</a></div>'+
						'</div>'+
				     	'</li>';
					}else{
						viewbutton ='<li>'+
						'<div class="image_block_pic" style="cursor:pointer">'+
							'<img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView(8,'+image.tf_id+')"/>'+
						'</div>'+
				     	'</li>';						
					}
					imageItem =
					viewbutton+
					'<li>'+
					'<div class="image_block_pic">'+
						'<img src="/newresources/images/imageempty.png" />'+					
						'<div class="oprate_wrap"></div>'+
					'</div>'+
			     	'</li>'+
			     	'<li>'+
					'<div class="image_block_pic">'+
						'<img src="/newresources/images/imageempty.png" />'+				
						'<div class="oprate_wrap"></a></div>'+
					'</div>'+
			     	'</li>';
				}								
			}
			else if(length == 2){
				for(var i=0;i<length;i++){
					var image=imagelist[i];
					var newsrc = null;
					if (image.object_id==null){
						window.wxc.xcConfirm("文件的图片名称为:"+image.file_name+"的文件未上传文件");	
					}else{
					 newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+image.object_id;
					}
					if(state ==5){						
						viewbutton = viewbutton+'<li>'+
						'<div class="image_block_pic" style="cursor:pointer">'+
							'<img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView(8,'+image.tf_id+')"/>'+
							'<div class="a_bg"></div>'+
							'<div class="oprate_wrap"><a href="javascript:void(0)" onClick="del_ProductFile(this,'+image.tf_id+')">删除</a></div>'+
						'</div>'+
				     	'</li>';
					}else{
						viewbutton = viewbutton+'<li>'+
						'<div class="image_block_pic" style="cursor:pointer">'+
							'<img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView(8,'+image.tf_id+')"/>'+
						'</div>'+
				     	'</li>';						
					}					
				}
				imageItem =imageItem+
				viewbutton+				
		     	'<li>'+
				'<div class="image_block_pic">'+
					'<img src="/newresources/images/imageempty.png" />'+				
					'<div class="oprate_wrap"></a></div>'+
				'</div>'+
		     	'</li>';
			}
			else if(length>2){
				for(var i=0;i<length;i++){
					
					var image=imagelist[i];
					var newsrc = null;
					if (image.object_id==null){
						window.wxc.xcConfirm("文件的图片名称为:"+image.file_name+"的文件未上传文件");	
					}else{
					 newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+image.object_id;
					}
					if(state ==5){
						imageItem =imageItem+
						'<li>'+
						'<div class="image_block_pic" style="cursor:pointer">'+
							'<img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView(8,'+image.tf_id+')"/>'+
							'<div class="a_bg"></div>'+
							'<div class="oprate_wrap"><a href="javascript:void(0)" onClick="del_ProductFile(this,'+image.tf_id+')">删除</a></div>'+
						'</div>'+
				     	'</li>';
					}else{
						imageItem =imageItem+
						'<li>'+
						'<div class="image_block_pic" style="cursor:pointer">'+
							'<img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView(8,'+image.tf_id+')"/>'+
						'</div>'+
				     	'</li>';
					}
				}
			}
			$("#product_ul_file_list").append(imageItem);
			scrollImg();
			 };
			asyncAjaxMethod(url,params,true,fn); 
}
/**
 * 任务单主图展示图片
 */
function ProductMainFile(state){
	var url = 'taskFile/getTaskFileList.do';
	var params={};
	params.t_id=taskid;
	params.file_type=7;
	var fn=function(result){
		var imagelist = result.data;
		var length = imagelist.length;
		if(length == 0){
			if(state != 5){
			$("#prcmain_img").empty();
			var s_in = '<li>'+
			'<div class="image_block_pic" >'+
				'<img src="/newresources/images/imageempty.png" />'+				
				'<div class="oprate_wrap"></a></div>'+
			'</div>'+
	     	'</li>';
			$("#prcmain_img").html(s_in); 
			
			}
			return;
		}			
		for(var i=0;i<length;i++){
			var image=imagelist[i];
			var newsrc = null;
			if(image.object_id){
				newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+image.object_id;
			}				
			$("#prcmain_img").empty();
			if(state == 5){
				var s_in ='<a class="img_a" style="cursor:pointer"><img src="'+newsrc+'" id="show_product_main_pic"/></a><div class="a_bg"></div>'+
	    		'<div class="oprate_wrap"><a href="javascript:void(0)" onClick="del_product_main_img(this,'+image.tf_id+')">删除</a></div>'+
				'<input type="file" id="product_mains_pic" name="file" class="uploadfile_input" onChange="uploadProductMainPic(this)" />';
			}else{
				var s_in ='<a class="img_a"><img src="'+newsrc+'" id="show_product_main_pic"/ onclick="taskImgView(7,'+image.tf_id+')"></a>'+
	    		'<div class="oprate_wrap"></div>';			  			
			}
    		$("#prcmain_img").html(s_in); 			
		}
	};
	
	 asyncAjaxMethod(url,params,true,fn); 		
			
}
/**
 * 加载工艺文件图片信息
 */
function fileLoadList(){
	var url = 'taskFile/getTaskFileList.do';
	var params={};
	params.t_id=taskid;
	params.file_type=1;
	var fn=function(result){ 
		 if(state ==5||state ==10||state ==15||state==20){
		    $("#image_file_list").find("li:gt(0)").remove();
		 }else{
			$("#image_file_list").children("li").remove(); 
		 }
			var imagelist = result.data;
			var length = imagelist.length;
			if(length == 0){
				return;
			}
			var imageItem0="";
			for(var i=0;i<length;i++){
				var imageItem = "";
				var image=imagelist[i];
				var newsrc = null;
				if (image.object_id==null){
					window.wxc.xcConfirm("工艺文件的图片名称为:"+image.file_name+"的文件未上传文件");	
				}else{
				 newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+image.object_id;
				}	
				if(image.file_name != null){
					var file_name = image.file_name;
					file_name = strVachar(file_name,25);				
					}
				if(image.remark != null){
				var remark = image.remark;
				remark = strVachar(remark,25);				
				}
				/**派发前，直接删除记录；
				 * 派单中或者生产中，删除时is_delete置1.
				 * is_delete;//0没删除；1已删除.*/
				if(parseInt(image.is_delete)==0){
				 if(state ==5||state ==10||state ==15||state==20){
					imageItem =imageItem+
					'<li>'+
					'<div class="image_block_pic" style="cursor:pointer">'+
						'<img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView('+image.file_type+','+image.tf_id+')"/>';
						if(state ==5){//等待派单，物理删除
							imageItem =imageItem+
							'<div class="a_bg"></div>'+
							'<div class="oprate_wrap">'+
								'<a onClick="DelImageProcessFile(this,'+image.tf_id+')" href="javascript:void(0)">删除</a>'+
							'</div></div>';
						}else{
							imageItem =imageItem+
							'<div class="a_bg"></div>'+
							'<div class="oprate_wrap">'+
								'<a onClick="updatetaskfile2del(this,'+image.tf_id+')" href="javascript:void(0)">作废</a>'+
							'</div><div class="invalidWrap"><div class="b_bg"></div><img src="/newresources/images/tasks/invalid.png" class="invalid"></div></div>';
						}											
						
					imageItem =imageItem+
					'<div class="edit_div clearfix">' +
						'<p><label title="'+((image.file_name==null)?"":image.file_name)+'">'+((image.file_name==null)?"":file_name)+'</label><input style="display:none;color:#555;" type="text" class="edit_input" placeholder="图片名称" value="'+((image.file_name==null)?"":image.file_name)+'" /></p>' +
						'<label title="'+((image.remark==null)?"":image.remark)+'">'+((image.remark==null)?"":remark)+'</label><input style="display:none;color:#555;" type="text" class="edit_input"  placeholder="图片描述"  value="'+((image.remark==null)?"":image.remark)+'" />' +
						'<p><span class="l_span c999 fs10">'+((image.file_time==null?"":image.file_time))+'</span>'+
						'<a href="javascript:void(0)" style="display:block;" class="eidt" onClick="edituploadImg(this)">编辑</a>' +
						'<a href="javascript:void(0)" style="display:none;" class="eidt_save" onClick="saveuploadImg(this,'+image.tf_id+')">保存</a></p>' +
						'</div></li>';	
						}else{
					imageItem =imageItem+
					'<li>'+
					'<div class="image_block_pic" style="cursor:pointer">'+
						'<img src="'+((newsrc==null)?"":newsrc)+'" onclick="taskImgView('+image.file_type+','+image.tf_id+')"/>'+						
						'<div class="oprate_wrap">'+							
						'</div>'+
					'</div>'+
					'<div class="edit_div clearfix">' +
						'<p><label title="'+((image.file_name==null)?"":image.file_name)+'">'+((image.file_name==null)?"":file_name)+'</label></p>' +
						'<label title="'+((image.remark==null)?"":image.remark)+'">'+((image.remark==null)?"":remark)+'</label>' +
						'<p><span class="l_span color777 fs10">'+((image.file_time==null?"":image.file_time))+'</span>'+						
						'</div></li>';
				}
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
			$("#image_file_list").append(imageItem0);
			};	
			 asyncAjaxMethod(url,params,true,fn); 
}
/**
 * 加载工艺文件其他文件信息
 */
function fileLoadOtherList(){
	var url = 'taskFile/getTaskFileList.do';
	var params={};
	params.t_id=taskid;
	params.file_type=2;
	var fn=function(result){
			$("#other_file_list1").empty();
			$("#other_file_list2").empty();	
			$("#other_file_list").empty();
			var otherlist = result.data;
			var length = otherlist.length;
			if(length == 0){
				return;
			}
			var otherItem0="";
			var otherItem1 = "";
			var otherItem2 = "";
			other_rowCount=1;
			var op = "...";
			for(var i=0;i<length;i++){
				var otherItem = "";
				var other=otherlist[i];				
					var file_name = other.file_name;
					file_name = strVachar(file_name,67);									
					var remark = other.remark;
					remark = strVachar(remark,19);				
				if(parseInt(other.is_delete)==0){
				/**派发前，直接删除记录；
				 * 派单中或者生产中，删除时is_delete置1.
				 * is_delete;//0没删除；1已删除.*/	
				 if(state == 5||state == 10||state == 15||state==20){			
					otherItem =otherItem+
					'<tr id="other_row'+other_rowCount+'">'+
					'<td class="left">' +
					 	'<label onClick="LoadFileinfo('+((other.tf_id==null)?"":other.tf_id)+')" style="display:block;text-decoration:underline;cursor:pointer;" title="'+((other.file_name==null)?"":other.file_name)+'" id="other_filename_label'+other_rowCount+'">'+((other.file_name==null)?"":(file_name+(other.suffix_name==null?"":other.suffix_name)))+'</label><input style="display:none" id="other_filename'+other_rowCount+'"  value="'+((other.file_name==null)?"":other.file_name)+'" />'+
					 '</td>'+					 
					 '<td class="left">' +
					 '<label class="color777" >'+((other.file_time==null)?"":other.file_time)+'</label>'+
					 	'<label style="display:block" class="remark"  title="'+((other.remark==null)?"":other.remark)+'" id="other_fileremark_label'+other_rowCount+'">'+((other.remark==null)?"":remark)+'</label><input style="display:none" class="remark" id="other_fileremark'+other_rowCount+'" placeholder="文件描述" value="'+((other.remark==null)?"":other.remark)+'" />'+
					 '<a class="edit" style="display:block;" onclick="edit_OtherFile_row(this,'+other_rowCount+')" title="编辑" href="javascript:void(0)"><img src="/newresources/images/edit2.png" />编辑</a><a style="display:none" class="save" onclick="save_OtherFile_row(this,'+other_rowCount+','+other.tf_id+')" title="保存" href="javascript:void(0)">保存</a></td>';
					 if(state==5){//等待派单，物理删除
					 	otherItem =otherItem+'<td><a class="del" onclick="del_OtherFile_row(this,'+other_rowCount+','+other.tf_id+')" title="删除" href="javascript:void(0)"><img src="/newresources/images/del2.png">删除</a></td>';
					 }
					 if(state!=5){//派单中或者生产中，并且小于等于两天，逻辑删除
					 	otherItem =otherItem+'<td><a class="del" onclick="setOtherFile2del(this,'+other_rowCount+',\''+other.tf_id+'\',\''+other.file_name+'\',\''+other.suffix_name+'\',\''+other.file_time+'\',\''+replaceNullAsStr(other.remark)+'\')" title="作废" href="javascript:void(0)"><img src="/newresources/images/del2.png">作废</a></td>';
					 }
					 otherItem =otherItem+'</tr>';					 	
					other_rowCount++;
					}else{
					otherItem =otherItem+
					'<tr id="other_row'+other_rowCount+'">'+				
					 '<td class="left">' +					 
					 	'<label onClick="LoadFileinfo('+((other.tf_id==null)?"":other.tf_id)+')" style="display:block;text-decoration:underline;cursor:pointer; " title="'+((other.file_name==null)?"":other.file_name)+'" id="other_filename_label'+other_rowCount+'">'+((other.file_name==null)?"":(file_name+(other.suffix_name==null?"":other.suffix_name)))+'</label></td>'+					 		
					 '<td class="left">' +
					 '<label class="color777">'+((other.file_time==null)?"":other.file_time)+'</label>'+
					 	'<label style="display:block" class="remark"  title="'+((other.remark==null)?"":other.remark)+'" id="other_fileremark_label'+other_rowCount+'">'+((other.remark==null)?"":remark)+'</label></td>'+	
					 	'<td><img class="del" onClick="LoadFileinfo('+((other.tf_id==null)?"":other.tf_id)+')" src="/newresources/images/other/down.png" /></td>'+					 	
					 '</tr>';					 	
					other_rowCount++;
				}	
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
			$("#other_file_list").html(otherItem0);
			$("#other_file_list1").append(otherItem1);
			$("#other_file_list2").append(otherItem2);
			 };
			 asyncAjaxMethod(url,params,true,fn); 	
}
/**
 * 加载工艺文件视频文件信息
 */
function fileLoadViewList(){
	var url = 'taskFile/getTaskFileList.do';
	var params={};
	params.t_id=taskid;
	params.file_type=3;
	var fn=function(result){
		if(state == 5||state == 10||state == 15||state==20){
			$("#view_file_list").find("li:gt(0)").remove();
		}else{
			$("#view_file_list").children("li").remove();
		}		
			var viewlist = result.data;
			var length = viewlist.length;
			if(length == 0){
				return;
			}
			var viewItem = "";
			for(var i=0;i<length;i++){
				var view=viewlist[i];
				var newsrc = null;
				if (view.object_id==null){
					window.wxc.xcConfirm("工艺文件的视频文件名称为:"+view.file_name+"的文件未上传文件");	
				}else{
				 newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+view.object_id;
				}
				if(view.file_name != null){
					var file_name = view.file_name;
					file_name = strVachar(file_name,25);				
					}
				if(view.remark != null){
					var remark = view.remark;
					remark = strVachar(remark,25);				
					}
				/**派发前，直接删除记录；
				 * 派单中或者生产中，删除时is_delete置1.
				 * is_delete;//0没删除；1已删除.*/
				if(parseInt(view.is_delete)==0){
				  if(state == 5||state == 10||state == 15||state==20){
                	viewItem =viewItem+
    				'<li>'+
    				'<div class="image_block_pic">'+
    					'<a class="video_a"  onclick="taskVideoView(3,'+view.tf_id+')"></a>'+
    					'<img  src="'+newsrc+'" />';
    					if(state==5){//等待派单，物理删除
    						viewItem =viewItem+
    						'<div class="a_bg"></div>'+
    						'<div class="oprate_wrap">'+
    						'<a onClick="deluploadVideo(this,'+view.tf_id+')" href="javascript:void(0)">删除</a>'+
    						'</div>';
    					}
    					if(state!=5){//派单中或者生产中，并且小于等于两天，逻辑删除
					 		viewItem =viewItem+
					 		'<div class="a_bg"></div>'+
    						'<div class="oprate_wrap">'+
					 		'<a onClick="setuploadVideo2del(this,'+view.tf_id+')" href="javascript:void(0)">作废</a>'+
					 		'</div><div class="invalidWrap"><div class="b_bg"></div><img src="/newresources/images/tasks/invalid.png" class="invalid"></div></div>';
    					}
    						
    					viewItem =viewItem+'</div>'+
    				'<div class="edit_div clearfix">'+
    				'<p><label title="'+((view.file_name==null)?"":view.file_name)+'">'+((view.file_name==null)?"":file_name)+'</label><input style="display:none" type="text" class="edit_input" placeholder="视频名称" value="'+((view.file_name==null)?"":view.file_name)+'" /></p>' +
    				'<label title="'+((view.remark==null)?"":view.remark)+'">'+((view.remark==null)?"":remark)+'</label><input style="display:none" type="text" class="edit_input"  placeholder="视频描述" value="'+((view.remark==null)?"":view.remark)+'" />' +
    				'<p><span class="l_span color777 fs10">'+((view.file_time==null?"":view.file_time))+'</span>'+
    				'<a href="javascript:void(0)" class="eidt" style="display:block" onClick="edituploadVideo(this)">编辑</a>' +
    				'<a href="javascript:void(0)" class="eidt_save" style="display:none" onClick="saveuploadVideo(this,'+view.tf_id+')">保存</a></p>' +
    				'</div></li>';	
    					}else{
					viewItem =viewItem+
					'<li>'+
					'<div class="image_block_pic">'+
						'<a class="video_a"  onclick="taskVideoView(3,'+view.tf_id+')"></a>'+
						'<img  src="'+newsrc+'" />'+					
						'<div class="oprate_wrap">'+					
						'</div>'+
					'</div>'+
					'<div class="edit_div clearfix">'+
					'<p><label title="'+((view.file_name==null)?"":view.file_name)+'">'+((view.file_name==null)?"":file_name)+'</label></p>' +
					'<label  title="'+((view.remark==null)?"":view.remark)+'">'+((view.remark==null)?"":remark)+'</label>' +
					'<p><span class="l_span color777 fs10">'+((view.file_time==null?"":view.file_time))+'</span>'+				
					'</div></li>';
				}	
			}else{
				viewItem =viewItem+
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
			$("#view_file_list").append(viewItem);
			};
			 asyncAjaxMethod(url,params,true,fn);
}
/**
 * 物理删除工艺图片，仅适用于等待派单
 * @param obj
 * @param id
 */
function DelImageProcessFile(obj,id)
{
	window.wxc.xcConfirm("您确认要删除该工艺文件吗？", window.wxc.xcConfirm.typeEnum.confirm,
		{
		onOk:function(){
			if(id != null){
				var url = 'taskFile/deleteTaskFile.do';
				var params={};
				params.tf_id=id;
				params.t_id=taskid;
				var fn=function(result){
						$(obj).parent().parent().parent().remove();
					};	
					asyncAjaxMethod(url,params,true,fn);
			}else{
				 var option ={title:"提示",btn:parseInt("0001",2)};
				window.wxc.xcConfirm("请求错误",window.wxc.xcConfirm.typeEnum.custom,option);
			}
			},
		onCancel:function(){
			}
		});
}
/**
 * 设置工艺图片为删除状态，仅适用 派单中和生产中的,
 * 即逻辑删除，没有物理删除*/
function updatetaskfile2del(obj,id)
{
	window.wxc.xcConfirm("您确认要作废该工艺文件吗？", window.wxc.xcConfirm.typeEnum.confirm,
		{
		onOk:function(){
			if(id != null){
				var url = 'taskFile/updatetaskfile2del.do';
				var params={};
				params.tf_id=id;
				params.t_id=taskid;	
				var fn=function(result){
					$(obj).parent().prev(".a_bg").remove();
					$(obj).parent().next(".invalidWrap").css("display","block");
					$(obj).parent().parent().next(".edit_div" ).children("p:eq(1)").children("a").remove();
					$(obj).parent().remove();					
					};	
					asyncAjaxMethod(url,params,true,fn);
			}else{
				 var option ={title:"提示",btn:parseInt("0001",2)};
				window.wxc.xcConfirm("请求错误",window.wxc.xcConfirm.typeEnum.custom,option);
			}
			},
		onCancel:function(){
			}
		});
}
/**
 * 加载作业指导文件信息
 */
function fileOperationList(state){
	var url = 'taskFile/getTaskFileList.do';
	var params={};
	params.t_id=taskid;
	params.file_type=5;
	var fn=function(result){
	
			$("#operation_file_list").empty();
			var operationlist = result.data;
			var length = operationlist.length;
			if(length == 0){
				return;
			}
			var op="...";
			var operationItem="";	
			//作业指导书有且只有一份
			//for(var i=0;i<length;i++){
				
				var operation=operationlist[0];
				if(operation.file_name != null){
					var file_name = operation.file_name;
					file_name = strVachar(file_name,67);
					}
				if(operation.remark != null){
					var remark = operation.remark;
					remark = strVachar(remark,19);
				}
		
				if(state == 5){
					operationItem =operationItem+
					'<tr>' +
					'<td class="left"><a onClick="LoadFileinfo('+((operation.tf_id==null)?"":operation.tf_id)+')" style="text-decoration:underline " title="'+((operation.file_name==null)?"":operation.file_name)+'" href="javascript:void(0)">'+((operation.file_name==null)?"":(file_name+(operation.suffix_name==null?"":operation.suffix_name)))+'</a></td>' +										
					'<td class="left">'+
					'<label class="color777">'+operation.file_time+'</label>' +
					'<label style="display:block" class="remark" title="'+((operation.remark==null)?"":operation.remark)+'" href="javascript:void(0)">'+((operation.remark==null)?"":remark)+'</label><input style="display:none" class="remark" type="text" placeholder="描述" value="'+((operation.remark==null)?"":operation.remark)+'" size="25">' +
					'<a class="edit" style="display:block;" onclick="edit_job_instruction(this)" title="编辑" href="javascript:void(0)"><img src="/newresources/images/edit2.png">编辑</a><a  style="display:none;" class="save" onclick="save_job_instruction(this,'+operation.tf_id+')" title="保存" href="javascript:void(0)">保存</a></td>' +
					'<td><a class="del" onclick="del_job_instruction(this,'+operation.tf_id+')" title="删除"  href="javascript:void(0)"><img src="/newresources/images/del2.png">删除</a></td></tr>';
				}else{
					operationItem =operationItem+
					'<tr>' +
					'<td class="left"><a onClick="LoadFileinfo('+((operation.tf_id==null)?"":operation.tf_id)+')"  style="text-decoration:underline " title="'+((operation.file_name==null)?"":operation.file_name)+'" href="javascript:void(0)">'+((operation.file_name==null)?"":(file_name+(operation.suffix_name==null?"":operation.suffix_name)))+'</a></td>' +				
					'<td  class="left">'+
					'<label class="color777">'+operation.file_time+'</label>' +				
					'<label style="display:block" class="remark" title="'+((operation.remark==null)?"":operation.remark)+'" href="javascript:void(0)">'+((operation.remark==null)?"":remark)+'</label></td>' +
					'<td><img class="del" onClick="LoadFileinfo('+((operation.tf_id==null)?"":operation.tf_id)+')" src="/newresources/images/other/down.png" /></td>'+
					'</tr>';
				}				
			//}
			$("#operation_file_list").html(operationItem);
			$("#job_instruction_wrap").fadeOut('fast');
			};
			 asyncAjaxMethod(url,params,true,fn);	
}
/**
 * 加载质检标准文件信息
 */
function fileQcFileList(){
	var url = 'taskFile/getTaskFileList.do';
	var params={};
	params.t_id=taskid;
	params.file_type=6;
	var fn=function(result){
	
			$("#QcFileList_show").empty();
			var QcFilelist = result.data;
			var length = QcFilelist.length;
			if(length == 0){
				return;
			}
			var QcFileItem="";
			var op ="...";
			qc_rowCount=1;
			for(var i=0;i<length;i++){
				var qcfile=QcFilelist[i];
				if(qcfile.file_name != null){
					var file_name = qcfile.file_name;
					file_name = strVachar(file_name,67);
					}
				if(qcfile.remark != null){
					var remark = qcfile.remark;
					remark = strVachar(remark,19);
				}
				if(state == 5){
					QcFileItem =QcFileItem+
					'<tr id="qc_row'+qc_rowCount+'">'+
					'<td class="left">' +
						'<label  onClick="LoadFileinfo('+((qcfile.tf_id==null)?"":qcfile.tf_id)+')" title="'+((qcfile.file_name==null)?"":qcfile.file_name)+'" style="display:block;text-decoration:underline" id="qc_filename_label'+qc_rowCount+'">'+((qcfile.file_name==null)?"":(file_name+(qcfile.suffix_name==null?"":qcfile.suffix_name)))+'</label>' +
						'<input style="display:none " id="qc_filename'+qc_rowCount+'"  value="'+((qcfile.file_name==null)?"":qcfile.file_name)+'" /></td>'+								
					'<td class="left">' +
					    '<label class="color777">'+((qcfile.file_time==null)?"":qcfile.file_time)+'</label>'+
					 	'<label  class="remark" style="display:block" title="'+((qcfile.remark==null)?"":qcfile.remark)+'" id="qc_fileremark_label'+qc_rowCount+'">'+((qcfile.remark==null)?"":remark)+'</label>' +
					 	'<input  class="remark" style="display:none" id="qc_fileremark'+qc_rowCount+'" placeholder="文件描述" value="'+((qcfile.remark==null)?"":qcfile.remark)+'" />'+
					 '<a class="edit" style="display:block;" onclick="edit_QcFile_row(this,'+qc_rowCount+')" title="编辑" href="javascript:void(0)"><img src="/newresources/images/edit2.png" />编辑</a>' +
					 		'<a class="save" style="display:none" onclick="save_QcFile_row(this,'+qc_rowCount+','+qcfile.tf_id+')" title="保存" href="javascript:void(0)">保存</a></td>' +
					 '<td><a class="del" onclick="del_QcFile_row(this,'+qc_rowCount+','+qcfile.tf_id+')" title="删除" href="javascript:void(0)"><img src="/newresources/images/del2.png">删除</a></td>' +
					 '</tr>';
					qc_rowCount++;
				}else{
					QcFileItem =QcFileItem+
					'<tr id="qc_row'+qc_rowCount+'">'+
					'<td class="left">' +
						'<label onClick="LoadFileinfo('+((qcfile.tf_id==null)?"":qcfile.tf_id)+')" title="'+((qcfile.file_name==null)?"":qcfile.file_name)+'" style="display:block;text-decoration:underline" id="qc_filename_label'+qc_rowCount+'">'+((qcfile.file_name==null)?"":(file_name+(qcfile.suffix_name==null?"":qcfile.suffix_name)))+'</label>' +
						'</td>'+										
					'<td class="left">' +
					    '<label class="color777">'+((qcfile.file_time==null)?"":qcfile.file_time)+'</label>'+
					 	'<label style="display:block"  class="remark" title="'+((qcfile.remark==null)?"":qcfile.remark)+'" id="qc_fileremark_label'+qc_rowCount+'">'+((qcfile.remark==null)?"":remark)+'</label>' +
					 	'</td>'+	
					 	'<td><img class="del" onClick="LoadFileinfo('+((qcfile.tf_id==null)?"":qcfile.tf_id)+')" src="/newresources/images/other/down.png" /></td>'+
					 '</tr>';
					qc_rowCount++;
					
				}
					
			}
			$("#QcFileList_show").html(QcFileItem);
			 };
			 asyncAjaxMethod(url,params,true,fn);
}

//编辑上传的工艺图片，单个编辑方式
function edituploadImg(obj)
{
	$(obj).css("display","none");
	$(obj).next().css("display","block");
	$(obj).parent().parent().find("label").css("display","none");
	$(obj).parent().parent().find("input[type=text]").css({"display":"block"},{"border":"1px solid #ccc"});//.removeAttr("readonly");
}
//保存编辑的工艺图片
function saveuploadImg(obj,tf_id)
{
	var url = 'taskFile/updateTaskFile.do';
	var params={};
	params.tf_id=tf_id;
	params.file_name= $(obj).parent().parent().find("input:first").val();
	params.remark=$(obj).parent().parent().find("input:eq(1)").val();
	if(params.remark.length<200){
	var fn=function(result){
		$(obj).css("display","none");
		$(obj).prev().css("display","block");
		$(obj).parent().parent().find("label").css("display","block");			
		if(params.remark != null){
			var remark = params.remark;
			remark = strVachar(remark,25);
			}
		if(params.file_name != null){
			var file_name = params.file_name;
			file_name = strVachar(file_name,25);
		}
		$(obj).parent().parent().find("input[type=text]").css({"display":"none"});
		$(obj).parent().parent().find("label:eq(0)").text(file_name);	
		$(obj).parent().parent().find("label:eq(0)").attr("title",params.file_name);
		$(obj).parent().parent().find("label:eq(1)").text(remark);	
		$(obj).parent().parent().find("label:eq(1)").attr("title",params.remark);
		};
		 asyncAjaxMethod(url,params,true,fn);
	}else{		
		window.wxc.xcConfirm("您备注的字符长度过长,最长为200个字符");
	}
}

//编辑上传的工艺视频，单个编辑方式
function edituploadVideo(obj)
{
	$(obj).css("display","none");
	$(obj).next().css("display","block");
	$(obj).parent().parent().find("label").css("display","none");
	$(obj).parent().parent().find("input[type=text]").css("display","block");
	//$(obj).prevAll("input").css("border","1px solid #ccc").removeAttr("readonly");
}
//保存编辑的工艺视频
function saveuploadVideo(obj,tf_id)
{  
   var url = 'taskFile/updateTaskFile.do';
	var params={};
	params.tf_id=tf_id;
	params.file_name= $(obj).parent().parent().find("input[type=text]:eq(0)").val();
	params.remark= $(obj).parent().parent().find("input[type=text]:eq(1)").val();
	if(params.remark.length<200){
	var fn=function(result){

		window.wxc.xcConfirm(result.message);
		$(obj).css("display","none");
		$(obj).prev().css("display","block");
		$(obj).parent().parent().find("label").css("display","block");			
		if(params.remark != null){
			var remark = params.remark;
			remark = strVachar(remark,25);				
			}
		if(params.file_name != null){
			var file_name = params.file_name;
			file_name = strVachar(file_name,25);				
			}
		$(obj).parent().parent().find("label:eq(1)").text(file_name);
		$(obj).parent().parent().find("label:eq(1)").attr("title",params.file_name);
		$(obj).parent().parent().find("input[type=text]").css({"display":"none"});
		$(obj).parent().parent().find("label:eq(1)").text(remark);
		$(obj).parent().parent().find("label:eq(1)").attr("title",params.remark);
		 };
		 asyncAjaxMethod(url,params,true,fn);
	}else{		
		window.wxc.xcConfirm("您备注的字符长度过长,最长为200个字符");
	}
}
/**等待派单时，物理删除工艺视频*/
function deluploadVideo(obj,tf_id){
	window.wxc.xcConfirm("您确认要删除该工艺文件吗？", window.wxc.xcConfirm.typeEnum.confirm,
			{
			onOk:function(){
				if(tf_id != null){
					var url = 'taskFile/deleteTaskFile.do';
					var params={};
					params.tf_id=tf_id;	
					params.t_id=taskid;
					var fn=function(result){			
						    window.wxc.xcConfirm(result.message);
							$(obj).parent().parent().parent().remove();
						};
						asyncAjaxMethod(url,params,true,fn);
					}else{
						 var option ={title:"提示",btn:parseInt("0001",2)};
						window.wxc.xcConfirm("请求错误",window.wxc.xcConfirm.typeEnum.custom,option);
					}					
				},
			onCancel:function(){
			
				}
			});	
}

/**派单中或者生产中，逻辑删除工艺视频*/
function setuploadVideo2del(obj,tf_id){
	window.wxc.xcConfirm("您确认要作废该工艺文件吗？", window.wxc.xcConfirm.typeEnum.confirm,
			{
			onOk:function(){
				if(tf_id != null){
					var url = 'taskFile/updatetaskfile2del.do';
					var params={};
					params.tf_id=tf_id;	
					params.t_id=taskid;
					var fn=function(result){			
							$(obj).parent().prev(".a_bg").remove();
							$(obj).parent().next(".invalidWrap").css("display","block");
							$(obj).parent().parent().next(".edit_div" ).children("p:gt(1)").children("a").remove();
							$(obj).parent().remove();
						};
						asyncAjaxMethod(url,params,true,fn);
					}else{
						 var option ={title:"提示",btn:parseInt("0001",2)};
						window.wxc.xcConfirm("请求错误",window.wxc.xcConfirm.typeEnum.custom,option);
					}					
				},
			onCancel:function(){
			
				}
			});	
}
//var other_rowCount=0;
//添加其他文件
function addOtherFile(obj,num_other)
{
	 var filename = "";
	 var fileElId = "";
	 var ulfile = "";
	 var file_type = "";	
	if(parseInt(num_other)==1){
		fileElId = "other_process_file";
		ulfile = "other_file_list";
	    filename=$("#other_process_file").val();//图片文件上传的文件信息	
	    file_type = 2;
	}else if(parseInt(num_other)==2){
		fileElId = "other_process_file1";
		ulfile = "other_file_list1";
	    filename=$("#other_process_file1").val();//裁剪产品样板图、派版上传的文件信息	
	    file_type = 45;
	}else if(parseInt(num_other)==3){
		fileElId = "other_process_file2";
		ulfile = "other_file_list2";
	    filename=$("#other_process_file2").val();//丝印、绣花定位图上传的文件信息	 
	    file_type = 46;
	}	
	 if(filename!=""){
			var fileurl = "taskFile/addTaskOtherFile.do";
			var params = {"t_id":taskid,"file_type":file_type};
			var fn = function(data){
		        	if (data.success==true ) { 		      
		        		
					var filename = data.filename;
					filename = strVachar(filename,67);
								
					var create_dt=new Date().Format("yyyy-MM-dd HH:mm:ss");	
		        	var newRow='<tr id="other_row'+other_rowCount+'">' +
		        			'<td class="left"><label  onClick="LoadFileinfo('+((data.tf_id==null)?"":data.tf_id)+')" title="'+((data.filename==null)?"":data.filename)+'" style="display:block;text-decoration:underline" id="other_filename_label'+other_rowCount+'">'+((data.filename==null)?"":(filename+data.suffix_name))+'</label><input style="display:none" id="other_filename'+other_rowCount+'"  value="'+((data.filename==null)?"":data.filename)+'" /></td>' +		        					   
		        			'<td class="left">'+
		        			'<label class="color777">'+create_dt+'</label>' +
		        			'<label style="display:none" class="remark" id="other_fileremark_label'+other_rowCount+'"></label><input class="remark" id="other_fileremark'+other_rowCount+'"  placeholder="文件描述" />' +
		        			'<a class="edit" style="display:none;" onclick="edit_OtherFile_row(this,'+other_rowCount+')" title="编辑" href="javascript:void(0)"><img src="/newresources/images/edit2.png" />编辑</a>' +
		        			'<a class="save" onclick="save_OtherFile_row(this,'+other_rowCount+','+data.tf_id+')" title="保存" href="javascript:void(0)">保存</a></td>';
							 if(state==5){//等待派单，物理删除
							 	newRow=newRow+'<td><a class="del" onclick="del_OtherFile_row(this,'+other_rowCount+','+data.tf_id+')" title="删除" href="javascript:void(0)"><img src="/newresources/images/del2.png">删除</a></td>';
							 }
							 if(state!=5){////派单中或者生产中，并且小于等于两天，逻辑删除
							 	newRow=newRow+'<td><a class="del" onclick="setOtherFile2del(this,'+other_rowCount+',\''+data.tf_id+'\',\''+data.filename+'\',\''+data.suffix_name+'\',\''+create_dt+'\',\''+replaceNullAsStr(data.remark)+'\')" title="作废" href="javascript:void(0)"><img src="/newresources/images/del2.png">作废</a></td>';
							 }
							 newRow =newRow+'</tr>';
		        	other_rowCount++;		       
		        	$("#"+ulfile).append(newRow);
		        	$(obj).val("");
		        	}else{
		        		 var option ={title:"提示",btn:parseInt("0001",2)};
		            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);}
			};
		    addInputUtilFile(fileurl,params,fileElId,fn);
	   	   }
}
//添加其他文件
function addOtherFile_head(obj)
{	
	var filename=$("#other_process_file_btn").val();
	 if(filename!=""){
			var fileurl = "taskFile/addTaskOtherFile.do";
			var params = {"t_id":taskid,"file_type":2};
			var fn = function(data){
	        	if (data.success==true ) { 
	        		if(data.filename != null){
						var filename = data.filename;
						filename = strVachar(filename,67);
						}
				var create_dt=new Date().Format("yyyy-MM-dd HH:mm:ss");
	        	var newRow='<tr id="other_row'+other_rowCount+'">' +
	        			'<td class="left"><label style="text-decoration:underline" onClick="LoadFileinfo('+((data.tf_id==null)?"":data.tf_id)+')"  title="'+((data.filename==null)?"":data.filename)+'" id="other_filename_label'+other_rowCount+'">'+((data.filename==null)?"":(filename+data.suffix_name))+'</label><input style="display:none" id="other_filename'+other_rowCount+'"  value="'+((data.filename==null)?"":data.filename)+'" /></td>' +		        			        			
	        			'<td class="left">'+
	        			'<label class="color777">'+create_dt+'</label>' +
	        			'<label style="display:none" class="remark" id="other_fileremark_label'+other_rowCount+'"></label><input class="remark" id="other_fileremark'+other_rowCount+'"  placeholder="文件描述" />' +
	        			'<a class="edit"  style="display:none;" onclick="edit_OtherFile_row(this,'+other_rowCount+')" title="编辑" href="javascript:void(0)"><img src="/newresources/images/edit2.png" />编辑</a>' +
	        			'<a class="save" onclick="save_OtherFile_row(this,'+other_rowCount+','+data.tf_id+')" title="保存" href="javascript:void(0)">保存</a></td>';
						 if(state==5){//等待派单，物理删除
						 	newRow=newRow+'<td><a class="del" onclick="del_OtherFile_row(this,'+other_rowCount+','+data.tf_id+')" title="删除" href="javascript:void(0)"><img src="/newresources/images/del2.png">删除</a></td>';
						 }
						 if(state!=5){////派单中或者生产中，并且小于等于两天，逻辑删除
						 	newRow=newRow+'<td><a class="del" onclick="setOtherFile2del(this,'+other_rowCount+',\''+other.tf_id+'\',\''+other.filename+'\',\''+data.suffix_name+'\',\''+create_dt+'\',\''+replaceNullAsStr(data.remark)+'\')" title="作废" href="javascript:void(0)"><img src="/newresources/images/del2.png">作废</a></td>';
						 }
						 newRow =newRow+'</tr>';
	        	other_rowCount++;
	        	$("#other_file_list").append(newRow);
	        	$(obj).val("");	
	        	var option ={title:"提示",btn:parseInt("0001",2)};
	        	$("html,body").animate({scrollTop:$('#other_file_list').offset().top},1000);
            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
	        	}else{
	        		var option ={title:"提示",btn:parseInt("0001",2)};
	            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);}
			};
		    addInputUtilFile(fileurl,params,"other_process_file_btn",fn);
	   	   }
}

//编辑其他文件行
function edit_OtherFile_row(obj,rowIndex)
{
	$(obj).css("display","none");
	$(obj).next().css("display","block");
	$("#other_fileremark_label"+rowIndex).css("display","none");
	$("#other_fileremark_label"+rowIndex).next().css("display","block");
	$("#other_fileremark_label"+rowIndex).next().html($("#other_fileremark_label"+rowIndex).val());
	
}
//保存工艺文件的其他文件
function save_OtherFile_row(obj,rowIndex,tf_id)
{
	
	var url = 'taskFile/updateTaskFile.do';
	var params={};
	params.tf_id=tf_id;
	params.file_name= $("#other_filename"+rowIndex).val();
	params.remark=  $("#other_fileremark"+rowIndex).val();
	if(params.remark.length<200){
	var fn=function(result){	
		window.wxc.xcConfirm(result.message);
			$(obj).css("display","none");
			$(obj).prev().css("display","block");				
			if(params.remark != null){
				var remark = params.remark;
				remark = strVachar(remark,19);
			}
			$("#other_fileremark"+rowIndex).css("display","none");
			$("#other_fileremark"+rowIndex).prev().css("display","block");
			$("#other_fileremark"+rowIndex).prev().html(remark);
			$("#other_fileremark"+rowIndex).prev().attr("title",params.remark);
			};
			asyncAjaxMethod(url,params,true,fn);	
}else{		
	window.wxc.xcConfirm("您备注的字符长度过长,最长为200个字符");
}
}
/**
 * 删除任务单展示文件
 */
function del_ProductFile(obj,tf_id)
{
	window.wxc.xcConfirm("您确认要删除该文件吗？", window.wxc.xcConfirm.typeEnum.confirm,
	{	
	onOk:function(){
		var url = 'taskFile/deleteTaskFile.do';
		var params={};
		params.tf_id=tf_id;	
		params.t_id=taskid;
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
 * 等待派单时，物理删除工艺文件的文件
 */
function del_OtherFile_row(obj,rowIndex,tf_id)
{
	window.wxc.xcConfirm("您确认要删除该文件吗？", window.wxc.xcConfirm.typeEnum.confirm,
	{	
	onOk:function(){
		var url = 'taskFile/deleteTaskFile.do';
		var params={};
		params.tf_id=tf_id;	
		params.t_id=taskid;
		var fn=function(result){		
			window.wxc.xcConfirm(result.message);
				$(obj).parent().parent().remove();
				 };
				 asyncAjaxMethod(url,params,true,fn);
			},
	onCancel:function(){
		
		}
	});
	
}
/**派单中或生产中
 * 逻辑删除工艺文件的文件，设置状态为被删除
 */
function setOtherFile2del(obj,rowIndex,tf_id,file_name,suffix_name,file_time,remark)
{
	window.wxc.xcConfirm("您确认要作废该文件吗？", window.wxc.xcConfirm.typeEnum.confirm,
	{	
	onOk:function(){
		var url = 'taskFile/updatetaskfile2del.do';
		var params={};
		params.tf_id=tf_id;	
		params.t_id=taskid;
		var fn=function(result){						
				var othertemen = '<tr style="text-decoration:line-through;color:#999">'+
				'<td class="left">'+
				'【已作废】<span class="ml10">'+strVachar(file_name,67)+suffix_name+'</span>'+
				'</td>'+
				'<td class="left">'+
				'<span class="color777">'+replaceNullAsStr(file_time)+'</span>'+
				'<span class="remark" style="display:block" title="'+replaceNullAsStr(remark)+'" href="javascript:void(0)">'+strVachar(remark,19)+'</span>'+
				'</td>'+
			'</tr>';
				$(obj).parent().parent().after(othertemen);
				$(obj).parent().parent().remove();
				};
				 asyncAjaxMethod(url,params,true,fn);
			},
	onCancel:function(){
		
		}
	});
	
}

//编辑作业指导
function edit_job_instruction(obj)
{
	$(obj).prev().css("display","block");
	$(obj).parent().find("label:eq(1)").css("display","none");
	$(obj).css("display","none");
	$(obj).next().css("display","block");
}
//新增作业指导
function add_job_instruction(obj)
{
	if($("#operation_file_list").has("tr").length)
	{
		window.wxc.xcConfirm("作业指导书已存在,不可重复添加", window.wxc.xcConfirm.typeEnum.info,{
			onOk:function(){
				//定位到作业指导界面
				tabs('#comment',1);
				$.scrollTo('#comment',500);
				$("#job_instruction_wrap").fadeOut('fast');
			}
		});		
	}
	else
	{		
		var filename=$(obj).val();
		if(filename!=""){
			var fileurl = "taskFile/addTaskOtherFile.do";
			var params = {"t_id":taskid,"file_type":5};
			var fn = function(data){
	        	if (data.success==true ) {
	        		if(data.filename != null){
						var filename = data.filename;
						filename = strVachar(filename,67);
						}
		        	var create_dt=new Date().Format("yyyy-MM-dd HH:mm:ss");
		        	var newRow='<tr>'+
		        		'<td class="left"><a style="text-decoration:underline" onClick="LoadFileinfo('+((data.tf_id==null)?"":data.tf_id)+')" title="'+((data.filename==null)?"":data.filename)+'">'+((data.filename==null)?"":(filename+data.suffix_name))+'</a></td>'+				        						        
		        		'<td class="left">'+
		        		'<label class="color777">'+create_dt+'</label>'+
		        		'<label class="remark"></label>'+
		        		'<input class="remark" type="text" placeholder="描述" value="" size="50">'+
		        		'<a class="edit" style="display:none;" onclick="edit_job_instruction(this)" title="编辑" href="javascript:void(0)">'+
		        		'<img src="/newresources/images/edit2.png">编辑</a><a class="save" onclick="save_job_instruction(this,'+data.tf_id+')" title="保存" href="javascript:void(0)">保存</a></td><td><a class="del" onclick="del_job_instruction(this,'+data.tf_id+')" title="删除" href="javascript:void(0)"><img src="/newresources/images/del2.png">删除</a></td></tr>';
		        	$("#operation_file_list").append(newRow);
		        	$(obj).val("");
		        	//定位到作业指导界面
					tabs('#comment',1);
					$.scrollTo('#comment',500);
					$("#job_instruction_wrap").fadeOut('fast');
	        	 }else{
	        		 var option ={title:"提示",btn:parseInt("0001",2)};
		            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
		          }
			};
		    addInputUtilFile(fileurl,params,"up_operate_file",fn);	
			
		}
	}
	
}
/*
 * 从新增上传指导文件
 */
function up_instruction_file(obj){
	if($("#operation_file_list").has("tr").length)
	{
		window.wxc.xcConfirm("作业指导书已存在,不可重复添加", window.wxc.xcConfirm.typeEnum.info,{
			onOk:function(){
				//定位到作业指导界面
				tabs('#comment',1);
				$.scrollTo('#comment',500);
				$("#job_instruction_wrap").fadeOut('fast');
			}
		});		
	}
	else
	{
    var filename=$("#updates_instruction_file").val();
	

	if(filename!=""){
		
		var fileurl = "taskFile/addTaskOtherFile.do";
		var params = {"t_id":taskid,"file_type":5};
		var fn = function(data){
        	
        	if (data.success==true ) { 
        		if(data.filename != null){
					var filename = data.filename;
					filename = strVachar(filename,67);
					}	
        	var create_dt=new Date().Format("yyyy-MM-dd HH:mm:ss");
        	var newRow='<tr>'+
        		'<td class="left"><a style="text-decoration:underline" onClick="LoadFileinfo('+((data.tf_id==null)?"":data.tf_id)+')" title="'+((data.filename==null)?"":data.filename)+'>'+((data.filename==null)?"":(filename+data.suffix_name))+'</a></td>'+	        		
        		'<td class="left">'+
        		'<label class="color777">'+create_dt+'</label>'+
        		'<label class="remark"></label>'+
        		'<input class="remark" type="text" placeholder="描述" value="" size="50">'+
        		'<a class="edit" style="display:none;" onclick="edit_job_instruction(this)" title="编辑" href="javascript:void(0)">'+
        		'<img src="/newresources/images/edit2.png">编辑</a><a class="save" onclick="save_job_instruction(this,'+data.tf_id+')" title="保存" href="javascript:void(0)">保存</a></td><td><a class="del" onclick="del_job_instruction(this,'+data.tf_id+')" title="删除" href="javascript:void(0)"><img src="/newresources/images/del2.png">删除</a></td></tr>';
        	$("#operation_file_list").append(newRow);
        	$("#updates_instruction_file").val("");
        	//定位到作业指导界面
			tabs('#comment',1);
			$.scrollTo('#comment',500);
			$("#job_instruction_wrap").fadeOut('fast');
        	}else{
        		var option ={title:"提示",btn:parseInt("0001",2)};
            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);}
		};
	    addInputUtilFile(fileurl,params,"updates_instruction_file",fn);
		
	}
	}
}

//保存作业指导
function save_job_instruction(obj,tf_id)
{
	
	var url = 'taskFile/updateTaskFileForRemark.do';
	var params={};
	params.tf_id=tf_id;	
	params.remark=$(obj).parent().find("input[type=text]").val();
	if(params.remark.length<200){
	var fn=function(result){
		$(obj).parent().find("input[type=text]").each(function(index,element){
			var val=$(element).val();
			$(element).prev().html(val);
			
			$(element).prev().css("display","block");
			$(element).css("display","none");
		});
		$(obj).parent().find("input[type=text]:eq(0)").prev().val("");
		var remark = params.remark.toString();
		$(obj).parent().find("input[type=text]:eq(0)").prev().attr("title",remark);
		if(remark != null){			
			remark = strVachar(remark,19);
		}		
		$(obj).parent().find("input[type=text]:eq(0)").prev().text(remark);		
		$(obj).css("display","none");
		$(obj).prev().css("display","block");
		};
		 asyncAjaxMethod(url,params,true,fn);
	}else{		
		window.wxc.xcConfirm("您备注的字符长度过长,最长为200个字符");
	}
}
//删除作业指导
function del_job_instruction(obj,tf_id)
{
	window.wxc.xcConfirm("您确认要删除该工艺文件吗？", window.wxc.xcConfirm.typeEnum.confirm,
			{	
			onOk:function(){
				var url = 'taskFile/deleteTaskFile.do';
				var urls = 'externalTask/updateOperators_file.do';
				var params={};
				params.tf_id=tf_id;	
				params.t_id=taskid;
				var fns = function(){					
				};
				var fn=function(result){				 				  
						$(obj).parent().parent().remove();
						//显示新增按钮
						$("#job_instruction_wrap").fadeIn('fast'); 
						};
						asyncAjaxMethod(url,params,true,fn);
						asyncAjaxMethod(urls,params,true,fns);
					},
			onCancel:function(){
			
				}
			});

}


//添加质检文件
function add_QcFile(obj)
{	
	var filename=$(obj).val();
	if(filename!=""){
		var fileurl = "taskFile/addTaskOtherFile.do";
		var params = {"t_id":taskid,"file_type":6};
		var fn = function(data){
        	if (data.success==true ) {	
        		if(data.filename != null){
					var filename = data.filename;
					filename = strVachar(filename,67);
					}
        	var qc_rowCount=0;
        	var create_dt=new Date().Format("yyyy-MM-dd HH:mm:ss");
        	var newRow='<tr id="qc_row'+qc_rowCount+'">' +
        			'<td class="left">' +
        				'<label style="display:block;text-decoration:underline" onClick="LoadFileinfo('+((data.tf_id==null)?"":data.tf_id)+')" title="'+((data.filename==null)?"":data.filename)+'" id="qc_filename_label'+qc_rowCount+'">'+((data.filename==null)?"":(filename+data.suffix_name))+'</label>' +
        				'<input style="display:none;"  id="qc_filename'+qc_rowCount+'"  value="'+((data.filename==null)?"":data.filename)+'" /></td>' +	        				        		
        			'<td class="left">' +
        			'<label class="color777">'+create_dt+'</label>' +
        				'<label class="remark" style="display:none;" id="qc_fileremark_label'+qc_rowCount+'"></label>' +
        				'<input class="remark" id="qc_fileremark'+qc_rowCount+'"  placeholder="文件描述" />' +
        			'<a class="edit" style="display:none;" onclick="edit_QcFile_row(this,'+qc_rowCount+')" title="编辑" href="javascript:void(0)"><img src="/newresources/images/edit2.png" />编辑</a>' +
        				'<a class="save" onclick="save_QcFile_row(this,'+qc_rowCount+','+data.tf_id+')" title="保存" href="javascript:void(0)">保存</a></td>' +
        			'<td><a class="del" onclick="del_QcFile_row(this,'+qc_rowCount+','+data.tf_id+')" title="删除" href="javascript:void(0)"><img src="/newresources/images/del2.png">删除</a></td></tr>';
        	$("#QcFileList_show").append(newRow);
        	$(obj).val("");
        	 }else{
        		 var option ={title:"提示",btn:parseInt("0001",2)};
	            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);}
		};
	    addInputUtilFile(fileurl,params,"add_QC_file",fn);	   
	}
	
}
//编辑质检文件
function edit_QcFile_row(obj,rowIndex)
{
	$(obj).css("display","none");
	$(obj).next().css("display","block");
//	$("#qc_filename_label"+rowIndex).css("display","none");
//	$("#qc_filename_label"+rowIndex).next().css("display","block");
//	$("#qc_filename_label"+rowIndex).next().html($("#qc_filename_label"+rowIndex).val());
	$("#qc_fileremark_label"+rowIndex).css("display","none");
	$("#qc_fileremark_label"+rowIndex).next().css("display","block");
	$("#qc_fileremark_label"+rowIndex).next().html($("#qc_fileremark_label"+rowIndex).val());
}
//保存质检文件
function save_QcFile_row(obj,rowIndex,tf_id)
{	
	var url = 'taskFile/updateTaskFile.do';
	var params={};
	params.tf_id=tf_id;	
	params.file_name=$("#qc_filename"+rowIndex).val();
	params.remark=$("#qc_fileremark"+rowIndex).val();
	if(params.remark.length<200){
	var fn=function(result){
	
		$(obj).css("display","none");
		$(obj).prev().css("display","block");					
		if(params.remark != null){	
			var remark = params.remark.toString();
			remark = strVachar(remark,19);
		}
		
		$("#qc_fileremark"+rowIndex).css("display","none");
		$("#qc_fileremark"+rowIndex).prev().css("display","block");
		$("#qc_fileremark"+rowIndex).prev().html(remark);
		$("#qc_fileremark"+rowIndex).prev().attr("title",params.remark);
		
		 };
		 asyncAjaxMethod(url,params,true,fn);
}else{		
	window.wxc.xcConfirm("您备注的字符长度过长,最长为200个字符");
}
	
}
//删除质检文件
function del_QcFile_row(obj,count,tf_id)
{
	window.wxc.xcConfirm("您确认要删除该工艺文件吗？", window.wxc.xcConfirm.typeEnum.confirm,
			{	
			onOk:function(){
				var url = 'taskFile/deleteTaskFile.do';
				var params={};
				params.tf_id=tf_id;	
				params.t_id=taskid;
				var fn=function(result){									
					  
						$(obj).parent().parent().remove(); 						 
						};
				 asyncAjaxMethod(url,params,true,fn);
					},
			onCancel:function(){
			
				}
			});
	
}
/**
 * 预览图的显示
 */
function taskImgView(file_type,tf_id){
	var URIstring = getwebroot()+"externalTask/outsourceTaskImgView.htm?taskid="+taskid+"&file="+"&@*"+"&file_type="+file_type+"&tf_id="+tf_id+"";
	var paraString = URIstring.substring(URIstring.indexOf("?")+1,URIstring.length); 
	var rul=URIstring.substring(0,URIstring.indexOf("?")+1)+escape(paraString);//对参数的处理
	window.open(rul);
}


/**
 * 视频的播放
 */
function taskVideoView(file_type,tf_id){//对参数进行一定的处理
	var URIstring = getwebroot()+"externalTask/outsourceTaskVideoView.htm?taskid="+taskid+"&file="+"&#*"+"&tf_id="+tf_id+"";
	var paraString = URIstring.substring(URIstring.indexOf("?")+1,URIstring.length); 
	var rul=URIstring.substring(0,URIstring.indexOf("?")+1)+escape(paraString);//对参数的处理
	window.open(rul);
}
function go_tasklist()
{
	window.location.href=getwebroot()+"externalTask/outsourceTaskList.htm";
}
function go_logistics()
{
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/outsourceLogisticsInfo/"+taskid+".htm";
}
function go_productionInfo(){
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/outsourceProductionInfo/"+taskid+".htm";
}
function go_deliveredInfo(){
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/outsourceDeliveredInfo/"+taskid+".htm";
}
function go_connection(){
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/outsourceConnection/"+taskid+".htm";
}
function go_qualityControl(){
	var param ={"task_id":taskid};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"externalTask/outsourceQualityControl/"+taskid+".htm";
}
/*
*添加工艺视频文件*/
function add_processVedioFile(obj)
{
	if($(obj).val()!=""){
		
		var ul=$(obj).parent().parent().parent();
		var _newli1='<li>' +
			    		'<div class="image_block_pic">' +
			    		'</li>';
		$(ul).append(_newli1);	
			   
		var spinner = new Spinner(opts);
		$(ul).children().last().find(".image_block_pic").append("<div id='vedio_spin_wrap'>上传中</div>");
		$("#vedio_spin_wrap").addClass("inner_spin_mask");
		spinner.spin(document.getElementById("vedio_spin_wrap"));
		
		var fileurl = "taskFile/addTaskVideoFile.do";
		var params = {"t_id":taskid,"file_type":3};
		var fn = function(data){
        	if (data.success==true ) { 
	        	window.wxc.xcConfirm(data.message);
	        	if (data.success==true && data.message=='上传成功') {  
	        		if(data.filename!=null){
	        			var filename = data.filename;
	        			filename = strVachar(filename,25);
	        		}
	        		var newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+data.file_path;		    					    					    					    					    			
	    		    var _newli='<li>' +
	    				'<div class="image_block_pic">' +
	    					'<a class="video_a"  onclick="taskVideoView(3,'+data.tf_id+')"></a>' +
	    					'<img src="'+newsrc+'" />';
	    					if(state==5){//等待派单，物理删除
	    						_newli=_newli+
	    						'<div class="a_bg"></div>' +
	    					    '<div class="oprate_wrap">'+
	    						'<a onClick="deluploadVideo(this,'+data.tf_id+')" href="javascript:void(0)">删除</a></div>';
	    					}
	    					if(state!=5){//派单中或者生产中，并且小于等于两天，逻辑删除
						 		_newli=_newli+
						 		'<div class="a_bg"></div>' +
	    					    '<div class="oprate_wrap">'+
						 		'<a onClick="setuploadVideo2del(this,'+data.tf_id+')" href="javascript:void(0)">作废</a>'+
						 		'</div><div class="invalidWrap"><div class="b_bg"></div><img src="/newresources/images/tasks/invalid.png" class="invalid"></div></div>';
	    					}
	    					_newli=_newli+'</div>'
	    				+'<div class="edit_div clearfix">' +
	    						'<p><label>'+((data.filename==null)?"":filename)+'</label><input type="text" class="edit_input"  style="display:none" value="'+((data.filename==null)?"":data.filename)+'" /></p>' +
	    						'<p><label style="display:none"></label><input type="text" class="edit_input" placeholder="视频描述" /></p>' +
	    						'<p><span class="l_span color777 fs10">'+new Date().Format("yyyy-MM-dd HH:mm:ss")+'</span>' +
	    						'<a href="javascript:void(0)" class="eidt" style="display:none" onClick="edituploadVideo(this)">编辑</a>' +
	    						'<a href="javascript:void(0)" class="eidt_save" style="display:block" onClick="saveuploadVideo(this,'+data.tf_id+')">保存</a></p>' +
	    					'</div></li>';
	    		//删除上面添加的用于显示进度的li
	    		$(ul).children().last().remove();
	    		$(ul).append(_newli);
	    		//当前上传控件清空
	    		$(obj).val("");
	        	}else{
	        		$(ul).children().last().remove();
	        		var option ={title:"提示",btn:parseInt("0001",2)};
	            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);}
	        	}else{
	        		$(ul).children().last().remove();
	        		var option ={title:"提示",btn:parseInt("0001",2)};
	        		window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
	        	}
		};
	    addInputUtilFile(fileurl,params,"view_pr_mp4",fn);
		
	}
}
/*
*添加工艺视频文件*/
function add_processVedioFile_head(obj)
{
	if($(obj).val()!=""){
		var fileurl = "taskFile/addTaskVideoFile.do";
		var params = {"t_id":taskid,"file_type":3};
		var fn = function(data){
        	if (data.success==true ) { 
	        	window.wxc.xcConfirm(data.message);
	        	if (data.success==true && data.message=='上传成功') {  
	        		if(data.filename!=null){
	        			var filename = data.filename;
	        			filename = strVachar(filename,25);
	        		}
	        		var newsrc=getwebroot()+"taskFile/downLoadFileFormMongo.do?file="+data.file_path;		    					    					    					    					    			
	    		    var _newli='<li>' +
	    				'<div class="image_block_pic">' +
	    					'<a class="video_a" onclick="taskVideoView(3,'+data.tf_id+')"></a>' +
	    					'<img  src="'+newsrc+'" />';
	    					if(state==5){//等待派单，物理删除
	    						_newli=_newli+
	    						'<div class="a_bg"></div>' +
	    						'<div class="oprate_wrap">'+
	    						'<a onClick="deluploadVideo(this,'+data.tf_id+')" href="javascript:void(0)">删除</a></div>';
	    					}
	    					if(state!=5){//派单中或者生产中，并且小于等于两天，逻辑删除
						 		_newli=_newli+
						 		'<div class="a_bg"></div>' +
	    						'<div class="oprate_wrap">'+
						 		'<a onClick="setuploadVideo2del(this,'+data.tf_id+')" href="javascript:void(0)">作废</a>'+
						 		'</div><div class="invalidWrap"><div class="b_bg"></div><img src="/newresources/images/tasks/invalid.png" class="invalid"></div></div>';
	    					}
	    					_newli=_newli+'</div>'
	    				+'<div class="edit_div clearfix">' +
	    						'<p><label >'+((data.filename==null)?"":filename)+'</label><input type="text" class="edit_input" style="display:none" value="'+((data.filename==null)?"":data.filename)+'" /></p>' +
	    						'<label style="display:none"></label><input type="text" class="edit_input" placeholder="视频描述" />' +
	    						'<p><span class="l_span color777 fs10">'+new Date().Format("yyyy-MM-dd HH:mm:ss")+'</span>' +
	    						'<a href="javascript:void(0)" class="eidt" style="display:none" onClick="edituploadVideo(this)">编辑</a>' +
	    						'<a href="javascript:void(0)" class="eidt_save" style="display:block" onClick="saveuploadVideo(this,'+data.tf_id+')">保存</a></p>' +
	    					'</div></li>';
	    		$("#view_file_list").append(_newli);
	    		//当前上传控件清空
	    		$(obj).val("");
	    		tabs('#comment',1);
				$("html,body").animate({scrollTop:$('#view_file_list').offset().top},1000);
	        	}else{
	        		var option ={title:"提示",btn:parseInt("0001",2)};
	            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);}
	        	}else{
	        		var option ={title:"提示",btn:parseInt("0001",2)};
	        		window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
	        	}
		};
	    addInputUtilFile(fileurl,params,"view_pr_mp4_btn",fn);
		
	}
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
 * 删除主图图片
 * @param obj
 * @param tf_id
 */
function del_product_main_img(obj,tf_id)
{
	window.wxc.xcConfirm("您确认要删除该任务单主图吗？", window.wxc.xcConfirm.typeEnum.confirm,
			{	
			onOk:function(){
				var url = 'taskFile/deleteTaskFile.do';
				var params={};
				params.tf_id=tf_id;	
				params.t_id=taskid;
				var fn=function(result){									
					    window.wxc.xcConfirm(result.message);
						var parentObj=$(obj).parent().parent();
						parentObj.find("img").attr("src","/newresources/images/other/6.png"); 						 
						$(obj).parent().css("display","none");
						$(obj).parent().prev().css("display","none");
						};
				 asyncAjaxMethod(url,params,true,fn);
					},
			onCancel:function(){
			
				}
			});
	
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
			window.open(getwebroot()+'taskFile/downLoadFileFormMongo.do?file='+filename, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');	
		}else{
			window.wxc.xcConfirm("该条文件信息中不存在文件,请联系管理员");
		}	
	};
	asyncAjaxMethod(url,params,true,fn); 
		
}
/*
 * 弹出框两秒后自动关闭效果
 * params：num 计时器秒数
 * author：yangliping
 * create_dt:2016年5月26日11:28:37
 * */
function closeBytimeCount_task(num)
{
	time_c=num;
	time_c=time_c-1;
	if(time_c>=0)
	{
		setTimeout("closeBytimeCount_task(time_c)",1000);
	}
	else
	{
		xcconfirm.xcClose();
		location.reload(true);
	}
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

/**终止任务单
 * stopOrder void
 * @author wangjialin
 * 2016-8-31 上午9:53:35
 */
function abortOrder(){
	$("#hide_stop_id").val(taskid);
	var url ="externalTask/getTaskStateByID.do";
	var params = {t_id:taskid};
	var fn = function(result){
	if(parseInt(result.data)==20||parseInt(result.data)==15){
		var urlo = "taskFile/getTaskProhibitFile.do";
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
	    }else{		   
		 xcconfirm=new window.wxc.xcConfirm("当前订单状态已经改变！无法终止",window.wxc.xcConfirm.typeEnum.infoNobtn);
		 closeBytimeCount_task(2);	
		}
	};
	asyncAjaxMethod(url,params,true,fn);
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
				closeBytimeCount_task(2);
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