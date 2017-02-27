
var id = getParamFromWindowName("order_id");
var companyId = getParamFromWindowName("companyIdForAll");
var tab_Orderdetail = getParamFromWindowName("tab_Orderdetail");
var pageSize = 5;//每页个数	
var currentPage=0;//当前页码
var pur_cpyname_cn = "";//采购公司名称
var order_status = 0;//订单状态
var lock_agreement = 0;//是否锁定

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

/* 页面加载事件
 * create_by yangliping 2016-7-7 15:09:38
 * */ 
$(function(){
		loadCommonPage();
		$(".midd_wrap").css({minHeight:$(window).height()-200});
		
		window.onresize=function(){	
			$(".midd_wrap").css({minHeight:$(window).height()-200});
		};
		
		$('.replyLogo').on("click", function() {
			$("#reply").show();
		});
		var tabId=getParamFromWindowName("tabId");
		var tabNum=getParamFromWindowName("tabNum");
		if(tabId==undefined){
			tabId="#orderDetail";
		}
		if(tabNum==undefined){
			tabNum=0;
		}
		currtab(tabId, tabNum);
		if(tab_Orderdetail==undefined){
			tab_Orderdetail=0;
		}else if(tab_Orderdetail==2){
			$("html,body").animate({scrollTop:$('#detail').offset().top},1000);
		}
		if(tabNum==2){			
		}else{
			currtab2('#detail',tab_Orderdetail);
		}		
});
/*
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * create_by yangliping 2016-7-7 15:09:46
 */
function loadCommonPage(){
	var result = isLoginForPlateForm();
	var isVip=getCookie("isVip");
//	if(result.data!=null && result.data.vip == true){
	if(isVip=="true"){
		$("#top").load(getwebroot()+"vip/platform/vipTop.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				getCompanyList(companyId);
				$("#mainNav").children().eq(0).addClass("curr");
			}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
	}else{
		$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				getCompanyList(companyId);
				$("#mainNav").children().eq(1).addClass("curr");
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	}
}
/**
 * 返回通知的状态
* returnAccount
* @param notice_status
* @returns {String}
* @return String
* @author chenlong
* 2016-8-30
 */
function returnAccounts(notice_status){
	var message = "";
	if(parseInt(notice_status)==2){
		message = "已确认";
	}else{
		message = "未确认";
	}
	return message;
}
/**
 * 查询出订单信息
* orderdetails
* @return void
* @author chenlong
* 2016-8-23
 */
function orderdetails(){
	var url = "purchaseorder/getOrderDetailsByID.do";
	var params = {pur_order_id:id};
	var fn = function(result){
		var order = result.data;
		order_status = replaceNullAsStr(order.order_status);
		lock_agreement = replaceNullAsStr(order.lock_agreement);
		pur_cpyname_cn = replaceNullAsStr(order.pur_cpyname_cn);
		$(".saleOrderNumber").html(replaceNullAsStr(order.order_bh));
		$(".currentState").html(returnStatus(order.order_status));
		getStopOrCancel(order.order_status);
		var evalText=doT.template($("#Ordertmpl").text());
		$(".saleAndPurchase").html(evalText(order));
		var evalTextv=doT.template($("#statusTmpl").text());
		$(".pic_status").html(evalTextv(order));
		$("#order_remark_info").html(replaceNullAsStr(order.sup_memo));
		$(".amount").html(replaceNullAsStr(order.sum_money).toString().replace(/\B(?=(?:\d{3})+\b)/g, ','));
		$(".earliestTime").html(replaceNullAsStr(order.delivery_date).slice(0,10));	
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 显示不同状态下的对订单的操作和基本信息展示
* getStopOrCancel
* @param pur_order_status
* @return void
* @author chenlong
* 2016-9-22
 */
function getStopOrCancel(pur_order_status){
	var status_order_pur = parseInt(pur_order_status);	
	var flag = true;
	var url ="purchaseorder/getOrderStopOrCancel.do";	
	var fn = function(result){	
		var evalText=doT.template($("#cancelDetailsTmpl").text());
		$("#status_button").find("div").remove();
		$("#status_button").append(evalText(result.data));		
	};
	var fn2 = function(result){	
		var evalText=doT.template($("#stopDetailsTmpl").text());
		$("#status_button").find("div").remove();
		$("#status_button").append(evalText(result.data));
		if(status_order_pur == 40){
		var evalText1=doT.template($("#buttonTmpl").text());
		$("#status_button").append(evalText1(status_order_pur));
		}
	};
	if(status_order_pur==60){
		flag =false;
		var params = {pur_order_id:id,pur_order_status:flag};	
		asyncAjaxMethod(url,params,true,fn);
	}else if(status_order_pur == 40 || status_order_pur== 50){
		flag =true;
		var params = {pur_order_id:id,pur_order_status:flag};	
		asyncAjaxMethod(url,params,true,fn2);
	}else{
		var evalText=doT.template($("#buttonTmpl").text());
		$("#status_button").find("div").remove();
		$("#status_button").append(evalText(status_order_pur));
	}
}
/**
 * 查询出订单信息后查询交流合作
* orderOtherTap
* @return void
* @author chenlong
* 2016-9-9
 */
function orderOtherTap(){
	var url = "purchaseorder/getOrderDetailsByID.do";
	var params = {pur_order_id:id};
	var fn = function(result){
		var order = result.data;
		$(".saleOrderNumber").html(replaceNullAsStr(order.order_bh));
		var evalTextv=doT.template($("#statusTmpl").text());
		$(".pic_status").html(evalTextv(order));
		showCommunicationMessage(order.order_status);
		connectionButton(order.order_status);
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 展示交流信息
 * showCommunicationMessage
 * @param state void
 * @author mishengliang
 * 2016-8-26 下午4:18:21
 */
function showCommunicationMessage(state){
	var url = "appCommunicationCtrl/getAppCommunicationList.do";
	var params = {};
	params.taskId = id;
	params.fileTypeId = 22;//公司logo代码
	params.companyId = companyId;
	params.moduleType = 1;//任务模块
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
			if(state ==10||state ==40||state ==20){
				reviewButton ="<img class='return_button' src='/newresources/images/return_back_button.png'/>";
			}
			for(var i = 0; i < communications.length; i++){//单个信息模块加载
				var sigle_communication_block = "";//单个交流模块
				var return_back_block = "<div class='message_return_block' >";//信息返回模块 头信息
				
				for(var j = 1; j < communications[i].length; j++){//单个信息模块回复信息加载
					var srcPathij = getwebroot() + "newresources/images/default_logo.png";//如果没有上传logo，默认的logo图片
					if(communications[i][j].mogodb_id != null){
						srcPathij = getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+ communications[i][j].mogodb_id;
					}
					return_back_block += "<div class='message_return_single_block clearfix'>"
												+"<div class='company_logo' ><img  src="+ srcPathij +"></div>"
												+"<div class='return_message_info'>"
													+"<div class='message_content_and_cpname'><span class='cpname'>"+ communications[i][j].cpyname_cn +"：</span><span class='message_content'>"+ communications[i][j].com_message +"</span></div>"
													+"<div class='time_and_return_button' ><span class='create_time'>"+ communications[i][j].create_time +"</span>"+reviewButton+"</div>"
												+"</div>"
											+"</div>";
				}
				
				return_back_block += "</div>";//回复模块收尾
				var srcPathi0 = getwebroot() + "newresources/images/default_logo.png";//如果没有上传logo，默认的logo图片
				if(communications[i][0].mogodb_id != null){
					srcPathi0 = getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+ communications[i][0].mogodb_id;
				}
				sigle_communication_block +=  "<div class='message_single_modle' >"
													+"<hr style='height:1px; border:none; border-top:1px dashed #d0d0d0'>"
													+"<div class='message_first_block clearfix' >"
														+"<input type='hidden' class='parent_message_id' value="+ communications[i][0].id +">"
														+"<div class='company_logo' ><img src="+srcPathi0+"></div>"
														+"<div class='return_message_info' >"
															+"<div class='message_content_and_cpname'><span class='cpname'>"+ communications[i][0].cpyname_cn +"：</span><span class='message_content'>"+ communications[i][0].com_message +"</span></div>"
															+"<div class='time_and_return_button' ><span class='create_time' >"+ communications[i][0].create_time +"</span>"+reviewButton+"</div>"
														+"</div>"
													+"</div>"
													+ return_back_block
												+"</div>";
				show_message_block += sigle_communication_block;
			}
			$("#message_show_block").html(show_message_block);//交流信息动态加载到页面
			
			returnBackButtonAction();//绑定点击回复信息按钮触发展示回复框事件
		}
	};
	
	asyncAjaxMethod(url,params,isasync,fn);
}

/**
 * 根据订单状态控制按钮的展示
 * connectionButton
 * @param state void
 * @author mishengliang
 * 2016-8-26 下午3:52:29
 */
function connectionButton(state){
	$("#submit_message_button").remove();
	var button = "";
	if(state==10||state==20||state ==40){
		button = "<div id='submit_message_button' class='submit_message_button'>留 言</div>";
	}else if(state ==30||state ==50||state ==60){
		$(".communicationAndCooperation button").remove();//移除之前的button
		document.getElementById("message_text_box").disabled="disabled";
    	button = "<button title='无法留言' class='disabled_btn' disabled='disabled'>留 言</button>";
	}
	$("#message_text_box").after(button);
	
	var flag = true;
	$("#submit_message_button").bind("click",function(){
	   	if(flag){
	   		submitAskMessage();
	   		flag = false;
	   		setTimeout(function(){flag = true;},3000);
	   	}
	});
}

/**
 * 提交留言信息
 * submitAskMessage void
 * @author mishengliang
 * 2016-8-26 下午4:06:22
 */
function submitAskMessage(){
	var url = "appCommunicationCtrl/addAppCommunication.do";
	var params = {};
	params.message = $("#message_text_box").val();
	params.parentId = 0;
	params.taskId = id;
	params.companyId = companyId;
	params.moduleType = 1;
	
	var isasync = true;
	var fn = function(result){
		if(result.ajaxErrorCode == 200){
			var new_message_value = $("#message_text_box").val();
			var now_date = new Date().Format("yyyy-MM-dd HH:mm:ss");
			$("#message_text_box").val("");//提交成功后将输入框置为空
			
			//即时添加交流信息
			var mogondb_id = getmogodbId(params.companyId);//获取本公司的logo图mogondbId
			var srcPath = getwebroot() + "newresources/images/default_logo.png";//如果没有上传logo，默认的logo图片
			if(mogondb_id != null){
				srcPath = getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+ mogondb_id;
			}

			var new_message_block = "<div class='message_single_modle' >"
										+"<hr style='height:1px; border:none; border-top:1px dashed #d0d0d0'>"
										+"<div class='message_first_block clearfix' >"
											+"<input type='hidden' class='parent_message_id' value="+ result.communication_id +">"
											+"<div class='company_logo' ><img src="+ srcPath +"></div>"
											+"<div class='return_message_info'>"
												+"<div class='message_content_and_cpname'><span class='cpname'>"+result.company_name +"：</span><span class='message_content'>"+ new_message_value +"</span></div>"
												+"<div class='time_and_return_button' ><span class='create_time' >"+ now_date +"</span><img class='return_button' src='/newresources/images/return_back_button.png'/></div>"
											+"</div>"
										+"</div>"
										+"<div class='message_return_block' ></div>"
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

/**
 * 获取本公司的logo图mogondbId
 * getmogodbId
 * @param companyId
 * @returns any
 * @author mishengliang
 * 2016-8-26 下午4:10:37
 */
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

/**
 * 绑定点击回复信息按钮触发展示回复框事件
 * returnBackButtonAction void
 * @author mishengliang
 * 2016-8-26 下午4:12:36
 */
function returnBackButtonAction(){
	var flag = true;
	$(".return_button").click(function(){
	if(flag){
		var return_back_block = "<textarea class='return_message_text_box' ></textarea>"
								+"<div class='return_submit_message_button' >回复</div>";
		var is_exist_return_block = $(this).parents(".message_single_modle").has("textarea").length;
		
		if(!is_exist_return_block){//判断是否已经显示了回复框。  没有则增加，有则无操作
			$(this).parents(".message_single_modle").append(return_back_block);
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
 * 提交回复留言信息
 * submitReturnMessage
 * @param obj void
 * @author mishengliang
 * 2016-8-26 下午4:13:49
 */
function submitReturnMessage(obj){
	var url = "appCommunicationCtrl/addAppCommunication.do";
	var params = {};
	params.parentId = obj.parent().find(".parent_message_id").val();//获取父messageId
	params.message = obj.prev().val();
	
	params.taskId = id;
	params.companyId = companyId;
	params.moduleType = 1;
	
	var isasync = true;
	var fn = function(result){
		if(result.ajaxErrorCode == 200){
			var now_date = new Date().Format("yyyy-MM-dd HH:mm:ss"); 
			obj.prev().val("");//提交成功后将输入框置为空 
			
			//即时添加交流信息
			var mogondb_id = getmogodbId(params.companyId);//获取本公司的logo图mogondbId
			var srcPath = getwebroot() + "newresources/images/default_logo.png";//如果没有上传logo，默认的logo图片
			if(mogondb_id != null){
				srcPath = getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+ mogondb_id;
			}
			
			var return_back_block_single = "<div class='message_return_single_block clearfix'>"
												+"<div class='company_logo'><img src="+ srcPath +"></div>"
												+"<div class='return_message_info' >"
													+"<div class='message_content_and_cpname'><span class='cpname'>"+ result.company_name +"：</span><span class='message_content'>"+ params.message +"</span></div>"
													+"<div class='time_and_return_button' ><span class='create_time' >"+ now_date +"</span><img class='return_button' src='/newresources/images/return_back_button.png'/></div>"
												+"</div>"
											+"</div>";
			
			var message_return_block = obj.parent().find(".message_return_block");
			
			//移出回复框，增加回复信息
			obj.parent().find(".return_message_text_box").remove();
			obj.parent().find(".return_submit_message_button").remove();
			message_return_block.append(return_back_block_single);
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

/**确认接单
 * acceptOrder void
 * @author chenlong
 * 2016-8-22 上午10:34:14
 */
var deliveryNoticeId = "";
function acceptOrder()
{
	var url ="purchaseorder/getPurchaseOrderStatusForAccept.do";
	var params = {pur_order_id:id};
	var fn = function(result){
		if(parseInt(result.data.status1)==10){
			var urlo ="orderAgreementFile/getOrderAgreementFileforId.do";
			var fno =function(result){
				var data = result.data;
				 $("#input_filename").html(""); 
				 if (data != null && data != "" ) {
					 $("#button_accept_file").hide();
			         var item="<a class='bluecolor'>"+data.agreement_name+data.suffix_name+"</a><img src='/newresources/images/sale/del.png' class='hide del' onclick='clean("+data.agreement_id+")'>";
			         $("#input_filename").append(item);
				 }else{
					 $("#button_accept_file").show(); 
				 }							 		
				 pop_div_show("acceptOrder");
			};
			var paramso = params;
			if(result.data.status2==true){				
			   asyncAjaxMethod(urlo,paramso,true,fno);
			}else{
				var messages = "您是否先确认该订单的交货通知?<br><a class='blue ml20' onclick='queryInfos()'>修改交期</a>";
				deliveryNoticeId = result.data.delivery_notice_id;
				xcconfirm = window.wxc.xcConfirm(messages, window.wxc.xcConfirm.typeEnum.confirm,
						{
						onOk:function(){
							var url = 'orderDeliveryNotice/updateDeliveryStatue.do';
							var params={noticeId:result.data.delivery_notice_id,noticeStatus:2};								
							var fn=function(datas){
								if(datas.success==true){
									asyncAjaxMethod(urlo,paramso,true,fno);
//									var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
//									window.wxc.xcConfirm("确认交期通知成功！",window.wxc.xcConfirm.typeEnum.custom,option);
								}
							};
							asyncAjaxMethod(url,params,true,fn);
						},
						onCancel:function(){
						}
						});	
			}
		}else{
		if(parseInt(result.data)==20){
		 xcconfirm=new window.wxc.xcConfirm("当前订单状态已经“被接收”状态！",window.wxc.xcConfirm.typeEnum.infoNobtn);
		 closeBytimeCount_list(2);
	    }else{
		 xcconfirm=new window.wxc.xcConfirm("当前订单状态已经不是“已提交”状态！",window.wxc.xcConfirm.typeEnum.infoNobtn);
		 closeBytimeCount_list(2);	
		}
		}
	};
	asyncAjaxMethod(url,params,true,fn);	
}

/**跳转至送货通知详情页面
 * queryInfos 
 * type ---> 'moreInfo':详情展示状态；'modify':修改状态；
 * @author wangjialin
 * 2016-8-12 下午1:36:15
 */
function queryInfos(){
	xcconfirm.xcClose();
	var modifyState = "";
	var URIstring = getwebroot()+"orderDeliveryNotice/deliveryNotifyDetailSale/"+deliveryNoticeId+".htm?companyId="+companyId+"&deliveryNoticeId="+ deliveryNoticeId +"&modifyDate="+"modify"+modifyState;
	var paraString = URIstring.substring(URIstring.indexOf("?")+1,URIstring.length);
	var rul=URIstring.substring(0,URIstring.indexOf("?")+1)+escape(paraString);//对参数的处理
	window.open(rul);
}
/**
 * 取消接收
* cancelAcceptOrder
* @return void
* @author chenlong
* 2017-2-13
 */
function cancelAcceptOrder(){	
	var url = "purchaseorder/deleteOrderAgreementFile.do";
	var params = {pur_order_id:id};
	var fn = function(result){
		if(result.success ==true){
			pop_div_close('acceptOrder');
			getAgreementFile(1);
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
*删除回签合同
* clean
* @param agreement_id
* @return void
* @author chenlong
* 2016-8-22
 */
function clean(agreement_id){
	var url = "orderAgreementFile/deleteOrderAgreementFile.do";
	var params = {agreement_id:agreement_id};
	var fn = function(result){
		if(result.success == true){
			$("#button_accept_file").show();
			$("#input_filename").html("");
			getAgreementFile(1);
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 确认接单改变状态值
* acceptOrderSave
* @return void
* @author chenlong
* 2016-8-22
 */
function acceptOrderSave(){
	var file = $("#input_filename").html();
	if(file != null && file != "" ){
		var url ="purchaseorder/accpetOrderByID.do";
		var params = {pur_order_id:id};
		var fn = function(result){
			if(result.success ==true){
			xcconfirm=new window.wxc.xcConfirm("接收成功",window.wxc.xcConfirm.typeEnum.infoNobtn);
			closeBytimeCount_list(2);
			pop_div_close('acceptOrder');
			getAgreementFile(1);
			}
		};
		asyncAjaxMethod(url,params,true,fn);
    }else{
    var option ={title:"提示",btn:parseInt("0001",2)};
	window.wxc.xcConfirm("回签合同没有上传,请上传后再确定", window.wxc.xcConfirm.typeEnum.custom,option); 
}
}
/**
 * 查询出产品的列表
* getProductList
* @return void
* @author chenlong
* 2016-8-24
 */
function getProductList(){
	var url = "purchaseorder/getProductListListForSearch.do";
	var params = {pur_order_id:id};
	var fn = function(result){
		if(result.success==true){
			var data = result.data;
			$(".productInfo").find(".product").remove();
			if(data != null && data != ""){
			var evalText=doT.template($("#productTmpl").text());
			$(".productInfo_body").append(evalText(data));
			}else{
			$(".productInfo_body").append("暂无生产详情");
			}
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 查询订单的的的所有文件
* getOrderFile
* @return void
* @author chenlong
* 2016-8-24
 */
function getOrderFile(){
	var url = "orderAgreementFile/getOrderAttchedFileForSub.do";
	var params = {pur_order_id:id,ft_id:37};
	var fn = function(result){
		if(result.success==true){
			var data = result.data;
			$("#other_file").empty();
			$("#img_file").empty();
			$("#video_file").empty();
			var length = data.length;
			for(var i=0;i<length;i++){
				var ft_id = parseInt(data[i].ft_id);
			if(ft_id==36){
				var evalText1=doT.template($("#otherTmpl").text());
				$("#other_file").append(evalText1(data[i]));
			}
			if(ft_id == 35){
				var evalText2=doT.template($("#imageTmpl").text());
				$("#img_file").append(evalText2(data[i]));
			}
			if(ft_id == 37){
				var evalText3=doT.template($("#videoTmpl").text());
				$("#video_file").append(evalText3(data[i]));
			}
			}			
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 返回图片的路经
* retutnFile
* @param mogoID
* @returns {String}
* @return String
* @author chenlong
* 2016-8-24
 */
function retutnFile(mogoID){
	return getwebroot()+"orderAgreementFile/downLoadFileFormMongoForSub.do?file="+mogoID;
}
/**
 * 查询订单的的的所有合同文件
* getOrderFile
* @return void
* @author chenlong
* 2016-8-24
 */
function getAgreementFile(v_tag){
	var url = "orderAgreementFile/getOrderAgreementFileForSub.do";
	var params = {pur_order_id:id};
	var fn = function(result){
		if(result.success==true){
			$("#agreementFile").empty();
			var data = result.data;		
			var evalText=doT.template($("#agreementTmpl").text());
			$("#agreementFile").append(evalText(data));	
			if(order_status==20 && lock_agreement==0 ){
				var evalTextv=doT.template($("#agreementVTmpl").text());
				$("#agreementFile").append(evalTextv());	
			}
			if(parseInt(v_tag)!=1){
			    $("html,body").animate({scrollTop:$('#detail').offset().top},1000);
			}
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**上传回签合同
 * showviewtext void
 * @author chnelong
 * 2016-8-25 上午11:29:36
 */
function showviewtextfrist(){
	var filename=$("#input_uploadfile").val();
	if(filename!=""){		
		var fileurl = "orderAgreementFile/addOrderArgeementFile.do";
		var params = {pur_order_id:id,argee:false,companyId:companyId};
		var fn = function(data){       	  			
        if (data.success==true ) { 
        	$("#button_accept_file").hide();
        	var item="<a class='bluecolor'>"+data.filename+data.suffix_name+"</a><img src='/newresources/images/sale/del.png' class='hide del' onclick='clean("+data.agreement_id+")'>";
        	$("#input_filename").append(item);
        	//if($("#detail").find(".curr").html()=="合同"){;
        	    getAgreementFile(1);//合同
        	//}
        }else{
        	var option ={title:"提示",btn:parseInt("0001",2)};
            window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
            }
		};
	    addInputUtilFile(fileurl,params,"input_uploadfile",fn);			   	
	   	   }else{
	   		var option ={title:"提示",btn:parseInt("0001",2)};
        	window.wxc.xcConfirm('文件为空', window.wxc.xcConfirm.typeEnum.custom,option);
	   	   }
}
/**上传回签合同
 * showviewtext void
 * @author chnelong
 * 2016-8-24 上午11:29:36
 */
function showviewtext(){
	var filename=$("#uploadfile_app").val();
	if(filename!=""){		
		var fileurl = "orderAgreementFile/addOrderArgeementFile.do";
		var params = {pur_order_id:id,argee:true,companyId:companyId};
		var fn = function(data){
        if (data.success==true ) {         	        	
        	var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
        	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
        	getAgreementFile(1);//合同
        }else{
        	var option ={title:"提示",btn:parseInt("0001",2)};
            window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
            }
		};
	    addInputUtilFile(fileurl,params,"uploadfile_app",fn);
	   	   }else{
	   		var option ={title:"提示",btn:parseInt("0001",2)};
        	window.wxc.xcConfirm('文件为空', window.wxc.xcConfirm.typeEnum.custom,option);
	   	   }
}
/**
 * 下载合同
* LoadFileinfo
* @param tf_id
* @return void
* @author chenlong
* 2016-8-24
 */
function LoadFileinfo(a_id){
	var params = {pur_order_id:id,agreement_id:a_id};
	var url = "orderAgreementFile/getOrderAgreementFileforOne.do";
	var fn= function(result){	
		if(result.data!=null){
			var filename = result.data.mogodb_id;
			window.open(getwebroot()+'orderAgreementFile/downLoadFileFormMongoForSub.do?file='+filename, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');	
		}else{
			window.wxc.xcConfirm("该条文件信息中不存在文件,请联系管理员");
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
function LoadFileinfo_stop(a_id){
	var params = {order_attched_id:a_id};
	var url = "orderAgreementFile/getOrderAttchedFileListSub.do";
	var fn= function(result){
		if(result.data!=null){
			var filename = result.data.mogodb_id;
			window.open(getwebroot()+'orderAgreementFile/downLoadFileFormMongoForSub.do?file='+filename, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');	
		}else{
			window.wxc.xcConfirm("该条文件信息中不存在文件,请联系管理员");
		}	
	};
	asyncAjaxMethod(url,params,true,fn); 		
}
/**
 * 下载其他文件
* LoadFileinfo
* @param tf_id
* @return void
* @author chenlong
* 2016-8-24
 */
function LoadFileinfoOther(a_id){
	var params = {pur_order_id:id,order_attched_id:a_id};
	var url = "orderAgreementFile/getOrderAttchedFileForOneOther.do";
	var fn= function(result){
		if(result.data!=null){
			var filename = result.data.mogodb_id;
			window.open(getwebroot()+'orderAgreementFile/downLoadFileFormMongoForSub.do?file='+filename, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');	
		}else{
			window.wxc.xcConfirm("该条文件信息中不存在文件,请联系管理员");
		}	
	};
	asyncAjaxMethod(url,params,true,fn); 		
}
/**
 * 在线预览pdf并可以下载
* LoadPrit
* @param a_id
* @return void
* @author chenlong
* 2016-9-10
 */
function LoadPrit(a_id){
	var params = {pur_order_id:id,agreement_id:a_id};
	var url = "orderAgreementFile/getOrderAgreementFileforOne.do";
	var fn= function(result){
		var filename = result.data.mogodb_id;
		if(filename!=null){
			window.open(getwebroot()+'orderAgreementFile/downOnlineFileFormMongoForSub.do?file='+filename, 'newwindow','height=900,width=900,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');	
		}else{
			window.wxc.xcConfirm("该条文件信息中不存在文件,请联系管理员");
		}	
	};
	asyncAjaxMethod(url,params,true,fn); 
}
/**
 * 预览图的显示
 */
function orderImgView(order_attched_id){//对参数进行一定加密的处理
	var URIstring = getwebroot()+"orderAgreementFile/saleOrderImgView.htm?pur_order_id="+id+"&file="+"&@*"+"&&order_attched_id="+order_attched_id;
	var paraString = URIstring.substring(URIstring.indexOf("?")+1,URIstring.length); 
	var rul=URIstring.substring(0,URIstring.indexOf("?")+1)+escape(paraString);//对参数的处理
	window.open(rul,"newOrderWinOut");
}
/**
 * 预览视频的显示
 */
function orderVideoView(order_attched_id){//对参数进行一定加密的处理
	var URIstring = getwebroot()+"orderAgreementFile/saleOrderVideoView.htm?pur_order_id="+id+"&file="+"&@*"+"&&order_attched_id="+order_attched_id;
	var paraString = URIstring.substring(URIstring.indexOf("?")+1,URIstring.length); 
	var rul=URIstring.substring(0,URIstring.indexOf("?")+1)+escape(paraString);//对参数的处理
	window.open(rul,"newOrderWinVideoOut");
}
/**
 * 返回顶单的状态值
* returnStatus
* @param status
* @returns {String}
* @return String
* @author chenlong
* 2016-8-23
 */
function returnStatus(status){
	var status = parseInt(status);
	var evalText=doT.template($("#orderheTmpl").text());
	$("#order_he_info").html(evalText(status));
	switch(status){
	case 10:
		return "已提交";	
		break;
	case 20:
		return "已接单";		
		break;
	case 30:
		return "交货完成";
		break;
	case 40:
		return "对方提出终止请求";
		break;
	case 50:		
		return "已终止";
		break;
	case 60:
		return "已取消";
		break;		
	}	
}
/**
 * 查询出送货通知
* OrderDeliverNotice
* @return void
* @author chenlong
* 2016-8-25
 */
function OrderDeliverNotice(){
	var params = {};
	var url = "orderDeliveryNotice/getOrderDeliveryNoticeList.do";
	InitDatas_deliver(0,true,url,params);	
}
/**
 * 分页获取数据
* InitDatas_deliver
* @return void
* @author chenlong
* 2016-8-25
 */
function InitDatas_deliver(pageIndex,needinit,url,param){
	currentPage=pageIndex;
	var url=url;
	var params={pur_order_id:id};
	params.usePaging=true;
	params.page=pageIndex;
	params.limit=pageSize;
	params.start=parseInt(pageIndex)*pageSize;

	var fn=function(result){
		if(pageIndex==0 && needinit){
				//第一次加载时加载分页控件
			initPaginationsdeliver(result.total);
		}
			//显示数据到表格
		    addItemsdeliver(result.data);	
		};
	asyncAjaxMethod(url,params,true,fn);
}
/**信息的翻页调用  
*/
function pageselectCallbacks(index,jq)
{
	var url = "orderDeliveryNotice/getOrderDeliveryNoticeList.do";		
	var params={};
	InitDatas_deliver(index,false,url,params);
}
/**初始化分页控件
*/
function initPaginationsdeliver(totalCount){
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
function addItemsdeliver(result){
	$("#deliverNotify_s").find(".deliveryNotify_body_tips").remove();
	$("#deliverNotify_s").find(".lookForMore").remove();
	$("#deliverNotify_s").find(".deliveryNotify_body").remove();	
	if(result != null && result != ""){
	var evalText=doT.template($("#deliveryTmpl").text());
	$("#deliverNotify_s").append(evalText(result));
	showAgreement();
	}else{
	$("#deliverNotify_s").html("没有送货通知");
	}
	lookForMore();
}
/**
 * 给所有的产品绑定事件
* lookForMore
* @return void
* @author chenlong
* 2016-8-22
 */
function lookForMore(){
	$('.lookForMore').on("click", function() {
		var id = $(this).find("input").val();
		var obj =  $(this);
		var url ="orderDeliveryNotice/getOrderDeliveryNoticedetailsListAll.do";
		var params ={delivery_notice_id:id};
		var fn  = function(result){		
			var evalText=doT.template($("#allProducttmpl").text());
			obj.parent('.deliveryNotify_body').find(".products").html(evalText(result.data));
			obj.parent('.deliveryNotify_body').niceScroll({
				cursorcolor: "#ccc", //#CC0071 光标颜色 
				cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
				touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
				cursorwidth: "5px", //像素光标的宽度 
				cursorborder: "0", //     游标边框css定义 
				cursorborderradius: "5px", //以像素为光标边界半径 
				autohidemode: true //是否隐藏滚动条 
			});
		};
		asyncAjaxMethod(url,params,true,fn);
		$(this).hide();
	});
}
/**
 * 切换tab事件
 * currtab
 * @param tabId
 * @param tabNum void
 * @author yangliping
 * 2016-6-30 17:32:19
 */
function currtab(tabId, tabNum){
	//设置点击后的切换样式
	$(tabId + " .tab").children(".curr").removeClass("curr");
	$(tabId + " .tab").children().eq(tabNum).addClass("curr");
	//根据参数决定显示内容
	$(tabId + " .tabcon").hide();
	$(tabId + " .tabcon").eq(tabNum).show();
	switch(tabNum){
	case 0:
		orderdetails();// 查询出订单信息
		break;
	case 1:
		OrderDeliverNotice();//送货通知
		break;
	case 2:
		orderOtherTap();//交流合作
		break;
	
	}
}
/**
 * 获取采购要求
* getRequriment
* @return void
* @author chenlong
* 2017-1-20
 */
function getRequriment(){
	var url = "purchaseorder/getOrderRequirement.do";
	var params = {pur_order_id:id};
	var fn = function(result){
		if(result.success==true){
			$("#contract_terms").html(replaceNullAsStr(result.data.contract_terms));
			$("#order_re").html(replaceNullAsStr(result.data.req_text));	
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 点击下tap页的加载
* currtab2
* @param tabId
* @param tabNum
* @return void
* @author chenlong
* 2017-1-20
 */
function currtab2(tabId, tabNum){
	//设置点击后的切换样式
	$(tabId + " .tab2").children(".curr").removeClass("curr");
	$(tabId + " .tab2").children().eq(tabNum).addClass("curr");
	//根据参数决定显示内容
	$(tabId + " .tabcon2").hide();
	$(tabId + " .tabcon2").eq(tabNum).show();
	switch(tabNum){
	case 0:
		getProductList();//产品
		break;
	case 1:
		getRequriment();//获取采购要求
		break;
	case 2:
		getOrderFile();//文件
		break;
	case 3:
		getAgreementFile();//合同
		break;
	
	}
}
function showAgreement(){
/*$(".map").mouseover(function(){
	$(this).parent(".con3").find(".address").show();
});
$(".map").mouseleave(function(){
	$(this).parent(".con3").find(".address").hide();
});*/
}
$("#input_filename").mouseover(function(){
	$(this).addClass("uploadFileName_hover");
	$(this).find(".del").show();
});
$("#input_filename").mouseleave(function(){
	$(this).removeClass("uploadFileName_hover");
	$(this).find(".del").hide();
});

/**添加备忘
 * orderMemo void
 * @author wangjialin
 * 2016-8-16 下午3:42:32
 */
function orderMemo()
{
	var url = "purchaseorder/getOrderRemark.do";
	var params = {pur_order_id:id};
	var fn = function(result){
	if(result.success==true){
			var info = result.data.memo;
			$("#content_remark").val(info);
			countWords();
			pop_div_show("orderMemo");//显示备注框
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
* 保存备忘信息
* saveRemarkinfo
* @return void
* @author chenlong
* 2016-8-20
 */
function saveRemarkinfo(robj){
	var sup_memo = $("#content_remark").val().trim();//备注信息
	var url = "purchaseorder/updateOrderRemark.do";
	var params = {pur_order_id:id,sup_memo:sup_memo};
	var fn = function(result){
		if(result.success==true){
			$("#content_remark").val("");
			pop_div_close('orderMemo');
			$("#order_remark_info").html(replaceNullAsStr(sup_memo));
			var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0"};
			window.wxc.xcConfirm("保存成功",window.wxc.xcConfirm.typeEnum.custom,option);
		}
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
function pop_div_show(id_button)
{
	$("#pop_mask").fadeIn("fast");
	$("#"+id_button).fadeIn("fast");
}

/**
 * 关闭弹出层
 * pop_div_close
 * @param id 
 * @return void
 * @author yangliping
 * 2016-7-4 10:38:15
 */
function pop_div_close(id_button){
	$("#pop_mask").fadeOut("fast");
	$("#"+id_button).fadeOut("fast");
}
/**计算输入的字符数
 * countWords void
 * @author chenlong
 * 2016-8-16 下午3:43:05
 */
function countWords(){
	var num=$(".memo_content").val().length;
	var x=150-num;
	if(x<0){
		var char = $(".memo_content").val();
		var content = char.slice(0,150);
		$(".memo_content").val(content);
		$("#words").html(0);
	}else{
		$("#words").html(x);	
	}
}
/**同意终止
 * stopAgree void
 * @author wangjialin
 * 2016-8-12 上午10:35:02
 */
function stopAgree()
{
	var url ="purchaseorder/getPurchaseOrderStatus.do";
	var params = {pur_order_id:id};
	var fn = function(result){
		if(parseInt(result.data)==40){	
			var urlo ="purchaseorder/getOrderStopDetails.do";
			var fno =function(result){
				 var data = result.data;
				 $("#order_stop_s").html(""); 
				 var evalText=doT.template($("#order_stop_sVo").text());
				 $("#order_stop_s").html(evalText(data));			      							 
				 $("#company_stop").html(pur_cpyname_cn);
				 pop_div_show("stopAgree");
			};
			asyncAjaxMethod(urlo,params,true,fno);
		}else{	   
		 xcconfirm=new window.wxc.xcConfirm("当前订单状态已经不是“终止待确认”状态！",window.wxc.xcConfirm.typeEnum.infoNobtn);
		 closeBytimeCount_list(2);			
		}
	};
	asyncAjaxMethod(url,params,true,fn);	
}
/**
 * 确认终止
* stopOrder
* @return void
* @author chenlong
* 2016-8-26
 */
function stopOrder(){
	var sid = $("#hide_stop_sid").val();	
	var url ="purchaseorder/OrderStopDetails.do";
	var params = {pur_order_id:id,order_end_id:sid};
	var fn = function(result){
		if(result.success ==true){
			var count = parseInt(result.data);
			if(count==0){
				xcconfirm=new window.wxc.xcConfirm("操作成功",window.wxc.xcConfirm.typeEnum.infoNobtn);
				closeBytimeCount_list(2);
				pop_div_close('stopAgree');
			}else{
				xcconfirm=new window.wxc.xcConfirm("操作失败,状态已改变",window.wxc.xcConfirm.typeEnum.infoNobtn);
				closeBytimeCount_list(2);
				pop_div_close('stopAgree');
			}	
		}
	};
	asyncAjaxMethod(url,params,true,fn);	
}
/*
 * 弹出框两秒后自动关闭效果
 * params：num 计时器秒数
 * author：chenlong
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
		orderdetails();// 查询出订单信息
	}
}

function showCancel(e){
	$(e).hide();
	$(e).next().show();
	$(e).parent().next().show();
	
}
function hideCancel(e){
	$(e).hide();
	$(e).prev().show();
	$(e).parent().next().hide();
	
}