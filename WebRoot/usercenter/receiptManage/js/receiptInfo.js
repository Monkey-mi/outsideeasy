/*
 * 页面加载事件
 * create_by yangliping 2016-6-30 17:32:19
 * */ 
var companyId = getParamFromWindowName("companyIdForAll");
var deliver_number = getParamFromWindowName("deliver_number");//发货单号
var shipping_id = 0;
$(function(){
		loadCommonPage();
		$(".midd_wrap").css({minHeight:$(window).height()-200});
		$(".midd_left_wrap").css({minHeight:$(window).height()-200});
		$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		
		window.onresize=function(){
			$(".midd_wrap").css({minHeight:$(window).height()-200});
			$(".midd_left_wrap").css({minHeight:$(window).height()-200});
			$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		};
		getShippingId();
});

/*
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * create_by yangliping 2016-6-30 17:32:19
 */
function loadCommonPage(){
		$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#mainNav").children().eq(0).addClass("curr");
				getCompanyList(companyId);
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		$(".midd_left_wrap").load(getwebroot()+"usercenter/purchaseManage/purchaseLeftMenu.html",function(){
			$("#evaluation").children().eq(9).children().eq(1).addClass("curr");
		});
		
		
}
/**
 * 查询出该页面的内容
* getShippingId
* @return void
* @author chenlong
* 2016-12-12
 */
function getShippingId(){
	var url = "taskDeliverGood/getdeliverGoodsForNumber.do";
	var param = {};
	param.deliver_number = deliver_number;
	var fn = function(result){
		if(result.data!=null){
			var deliverGoodsListVo = result.data.shippingDetailListVo;
			$("#shipppingnum").html(deliver_number);
			$("#shipppingCompany").html(deliverGoodsListVo.customer_name);
			switch(parseInt(deliverGoodsListVo.deliver_state)){
				case 5:
					$("#shipiingStatus").html("待收货");
					$("#shipiingStatus").css("color","#58749c");
				break;
				case 10:
					$("#shipiingStatus").html("已收货");
					$("#shipiingStatus").css("color","#4c4c4c");
				break;
				case 15:
					$("#shipiingStatus").html("已取消");
					$("#shipiingStatus").css("color","#999");
				break;
				default:
					$("#shipiingStatus").html("异常");
				break;
			}
			if(parseInt(deliverGoodsListVo.deliver_type)==0){
			    $("#type").html("");
			}else{
				$("#type").html("返修品");
			}
			var evalText=doT.template($("#shippingImlinfo").text());	
			$(".logisticsInfo").html(evalText(result.data.shippingRegistration));
			shipping_id = result.data.shippingRegistration.shipping_id;
			var evalTexts=doT.template($("#taskImplinfo").text());	
			$(".tableList").html(evalTexts(result.data.shippingDetailListVo.list));
			$("#num").html(result.data.shippingDetailListVo.list.length);
			$("#comfirmdate").html(replaceNullAsStr(deliverGoodsListVo.confirm_dt).slice(0,10));
			$("#receipt_remark").html(replaceNullAsStr(deliverGoodsListVo.list[0].receipt_remark));
			var evalTextfile=doT.template($("#fileImplinfo").text());	
			$("#taskFilesList").html(evalTextfile(result.data.taskFiles));	
			
			var flag = parseInt(deliverGoodsListVo.deliver_state);
			if(flag== 5){
				$(".receiptInfo .tableList .numForRead").hide();
				$(".receiptInfo .tableList .numForEdit").show();
				$(".receiptInfo .memoForRead").hide();
				$(".receiptInfo .memoForEdit").show();
				$("#shipiingStatus").text("待收货");
				classNameReg("numForEdit");
			}else{
				$(".receiptInfo .tableList .numForRead").show();
				$(".receiptInfo .tableList .numForEdit").hide();
				$(".receiptInfo .memoForRead").show();
				$(".receiptInfo .memoForEdit").hide();
				$(".receiptInfo .confirmReceipt").hide();
				if(flag== 10){
				    $("#shipiingStatus").text("已收货");
				}else{
					$("#shipiingStatus").text("已取消");
				}
			}						
		}else{
			var option ={title:"提示",btn:parseInt("0001",2)};
			window.wxc.xcConfirm("该发货单已经失效！联系管理员",window.wxc.xcConfirm.typeEnum.custom,option);
		}
		};
	 asyncAjaxMethod(url,param,true,fn);
}

/**
 * 失去焦点验证
* classNameReg
* @param NameReg
* @return void
* @author chenlong
* 2016-12-9
 */
function classNameReg(NameReg){
	var error_str="";
	$("."+NameReg).on("blur",function(){
		var id=$(this).attr("id");									   
		error_str = informationvo(this,"");	 
		if(error_str!="")
		{
			var option ={title:"提示",btn:parseInt("0001",2)};
			window.wxc.xcConfirm(error_str,window.wxc.xcConfirm.typeEnum.custom,option);
		}
		else
		{
		}		
	});
};

/**
 * 控制验证的判断
 * @param inp
 * @param params
 * @returns {String}
 */
function informationvo(inp,params){
	editflag = false;
	var id="";
	var taskId = "";
	var deliveryOrderNum = "";
	var productName = "";
	var error_str ="";
	var value ="";
	if(inp!=""){//失去焦点时的检测
    id=$(inp).attr("id"); 
    var delivery_quantity = $(inp).parent().parent().find("#delivery_quantity").html();
    value=$.trim($(inp).val()); 
	error_str = information(id,value,taskId,deliveryOrderNum,productName,delivery_quantity);	
	}else if(params!=""){//提交时检测，把数组中的key值和value取出来,方便做验证
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
/**
 * 验证字段值
 * @param id
 * @param value
 * @returns {String}
 */
function information(id,value,taskId,deliveryOrderNum,productName,delivery_quantity){
	var number_reg=/^(0|[1-9][0-9]*)$/;//数字
	var error_str ="";
	if(id=="receive_no"){
		if(value==""||parseInt(value)==0)
		{
			error_str="确认收货数量不能为空或0";
		}else if(!number_reg.test(value)){
			error_str="确认收货数量必须填写数字";
		}else if(parseInt(value)>parseInt(delivery_quantity)){
			error_str="确认收货数量不能大于送货数";
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
 * 确认收货
* comfirReceive
* @return void
* @author chenlong
* 2016-12-26
 */
function comfirReceive(){
	window.wxc.xcConfirm("您确认要接收该发货单吗？", window.wxc.xcConfirm.typeEnum.confirm,
			{	
			onOk:function(){
			    var receive_no = [];
			    var deliver_id = [];
				$(".tableList tr:gt(0)").each(function(index,element){
					receive_no.push($(element).find("#delivery_quantity").next().find("input:eq(0)").val());
					deliver_id.push($(element).find("#delivery_quantity").next().find("input:eq(1)").val());		
				});
				var url ="taskDeliverGood/updateReciveDertailVo.do";
				var param = {receipt_remark:$.trim($("#remark").val())};
				param.receive_no = receive_no.join(",");
				param.deliver_id = deliver_id.join(",");
				param.shipping_id = shipping_id;
				param.deliver_number = deliver_number;
				var fn = function(result){
					if(result.data == "success"){
						window.location.reload(); 
					}else{
						var option ={title:"提示",btn:parseInt("0001",2)};
						window.wxc.xcConfirm(result.data,window.wxc.xcConfirm.typeEnum.custom,option);
					}		
				};
				asyncAjaxMethod(url,param,true,fn);
			},
			onCancel:function(){				
			}
		});	
}

/**实时统计输入的字数
 * checkLen
 * @param obj void
 * @author wangjialin
 * 2016-10-17 下午1:51:39
 */
function checkLen(obj){ 
	var num=$(obj).val().length;
	var x=150-num;
	if(x<0){
		var char = $(obj).val();
		var content = char.slice(0,150);
		$(obj).val(content);
		$(obj).prev().find("#words").html(150);
	}else{
		$(obj).prev().find("#words").html(num);	
	}
} 
