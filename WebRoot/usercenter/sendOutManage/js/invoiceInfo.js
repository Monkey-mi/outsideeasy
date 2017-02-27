var companyId = getParamFromWindowName("companyIdForAll");
var deliver_number = getParamFromWindowName("deliver_number");//发货单号
/*
 * 页面加载事件
 * create_by yangliping 2016-6-30 17:32:19
 * */ 
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
	var result = isLoginForPlateForm();
	var isVip=getCookie("isVip");
	if(isVip=="true"){
		$("#top").load(getwebroot()+"vip/platform/vipTop.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#mainNav").children().eq(0).addClass("curr");
				getCompanyList(companyId);
			}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/saleManage/vipSaleLeftMenu.html",function(){
			$("#evaluation").children().eq(7).children().eq(1).find("a").prepend(">>");
			$("#evaluation").children().eq(7).children().eq(1).addClass("currVip");
		});
	}else{
		$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#mainNav").children().eq(1).addClass("curr");
				getCompanyList(companyId);
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		$(".midd_left_wrap").load(getwebroot()+"usercenter/saleManage/saleLeftMenu.html",function(){
			$("#evaluation").children().eq(7).children().eq(1).addClass("curr");
		});
	}
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
					$("#remark_memo").html(deliverGoodsListVo.receipt_remark);
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
			    $("#returnDetails").html("<img src='/newresources/images/sendOut/List1.png' class='mr10'>发货清单");
			}else{
				$("#returnDetails").html("<img src='/newresources/images/sendOut/List1.png' class='mr10'>返修清单");
			}
			var evalText=doT.template($("#shippingImlinfo").text());	
			$(".logisticsInfo").html(evalText(result.data.shippingRegistration));
			var evalTexts=doT.template($("#taskImplinfo").text());	
			$(".tableList").html(evalTexts(result.data.shippingDetailListVo.list));
			$("#num").html(result.data.shippingDetailListVo.list.length);
			$("#comfirmdate").html(replaceNullAsStr(deliverGoodsListVo.confirm_dt).slice(0,10));
			var evalTextfile=doT.template($("#fileImplinfo").text());	
			$("#taskFilesList").html(evalTextfile(result.data.taskFiles));			
		}else{
			var option ={title:"提示",btn:parseInt("0001",2)};
			window.wxc.xcConfirm("该发货单已经失效！联系管理员",window.wxc.xcConfirm.typeEnum.custom,option);
		}
		};
	 asyncAjaxMethod(url,param,true,fn);
}