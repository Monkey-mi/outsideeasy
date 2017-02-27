var companyId = getParamFromWindowName("companyIdForAll");
var pageSize = 5;//每页个数	
var currentPage=0;//当前页码
var save_deliveryRegister_flag=true;//保存标记，防止多次保存
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
		$('.contract_select .middle').niceScroll({
			cursorcolor: "#ccc", //#CC0071 光标颜色 
			cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
			touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
			cursorwidth: "5px", //像素光标的宽度 
			cursorborder: "0", //     游标边框css定义 
			cursorborderradius: "5px", //以像素为光标边界半径 
			autohidemode: true //是否隐藏滚动条 
		});
		cleanAll();
		$("#search_text").val("");
});
/*
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * create_by yangliping 2016-6-30 17:32:19
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
				companyId = $("#company").val();
				getAgreementNumList();
				getDeliveryRegisterList();
			}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/saleManage/vipSaleLeftMenu.html",function(){
				$("#evaluation").children().eq(5).children().eq(1).find("a").prepend(">>");
				$("#evaluation").children().eq(5).children().eq(1).addClass("currVip");
			});
		}
	}else{
		$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
				{
					getCompanyList(companyId);
					$("#mainNav").children().eq(1).addClass("curr");
					companyId = $("#company").val();
					getAgreementNumList();
					getDeliveryRegisterList();
				}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"usercenter/saleManage/saleLeftMenu.html",function(){
				$("#evaluation").children().eq(5).children().eq(1).addClass("curr");
			});
		}
	}
	
}
/**表单提交验证
 * formSubmit
 * @returns {Boolean} Boolean
 * @author wangjialin
 * 2016-8-22 下午2:11:23
 */
function formSubmit(){
	var delivery_number=$("#delivery_number").val();
	var contract_number=$("#contract_number").val();
	var uploaded=$("#uploaded").val();
	if(delivery_number=="" || contract_number=="" || $("#fileList").find("div").length==0|| $("#fileList1").find("div").length==0){
		if(delivery_number=="" )
			$(".criteria1 .form_remind").show();
		else
			$(".criteria1 .form_remind").hide();
		if(contract_number=="" )
			$(".criteria2 .form_remind").show();
		else
			$(".criteria2 .form_remind").hide();
		if($("#fileList").find("div").length==0)
			$(".criteria3 .form_remind").show();
		else 
			$(".criteria3 .form_remind").hide();
		if($("#fileList1").find("div").length==0)
			$(".criteria4 .form_remind").show();
		else 
			$(".criteria4 .form_remind").hide();
		return false;
	}
	if(save_deliveryRegister_flag){
		save_deliveryRegister_flag=false;
		var params={};
		params.delivery_number=delivery_number;
		params.send_company_id=companyId;
		params.deliveryRegisterDetails={};
		var count=0;
		$("#allAgreementNum").find("li").each(function(){
			if($(this).children()[0].checked){
				params.deliveryRegisterDetails[count]={};
				params.deliveryRegisterDetails[count].agreement_bh=$(this).children().val();
				params.deliveryRegisterDetails[count].pur_order_id=$(this).children().next().val();
				params.deliveryRegisterDetails[count].order_bh=$(this).children().next().next().val();
				count++;
			}
		});
		var fileIdArr=[];
		$("#fileList").find("img").each(function(){
			var str=$(this).attr("onclick");
			var strArr=str.split(",");
			var id=strArr[2].substring(0,strArr[2].length-1);
			fileIdArr.push(id);
		});
		$("#fileList1").find("img").each(function(){
			var str=$(this).attr("onclick");
			var strArr=str.split(",");
			var id=strArr[2].substring(0,strArr[2].length-1);
			fileIdArr.push(id);
		});
		params.fileIds=fileIdArr.join(",");
		params.count=count;
		var url = "deliveryRegister/submitDeliveryRegister.do";
		var isasync = true;
		var fn = function(result){
			if(result.data){
				save_deliveryRegister_flag=true;
				location.reload(true);
			}
		};
		asyncAjaxMethod(url,params,isasync,fn);
	}
}
/**展示上传的送货单
 * showFile void
 * @author wangjialin
 * 2016-8-22 下午2:35:13
 */
function showFile(obj,flag){
	if($(obj).val()!=""){//上传空间是否为空
		var fileName=$(obj).val();
		var fileElementId = $(obj).attr("id");
		var origfilename = fileName.substring(fileName.lastIndexOf("\\")+1,fileName.lastIndexOf("."));
		var filenameShow = fileName.substring(fileName.lastIndexOf("\\")+1);//前台展示用
		var file_type_id;
		if(flag==1){
			file_type_id=41;
		}
		else if(flag==2){
			file_type_id=51;
		}
		var fileurl = "deliveryRegister/uploadDeliveryAttached.do";
		var params = {
		        fileName:origfilename,
		        companyId:companyId,
		        file_type_id:file_type_id};
		var fn = function(data){//服务器成功响应处理函数
	      	if (data.success==true &&data.message=="上传成功") { 
	      		if(flag==1){
	      			$(".criteria3 .form_remind").hide();
		      		$("#fileList").css("display","block");
		      		$("#fileList").append("<div class='file_name f_l ml10'>"+filenameShow+"<img src='/newresources/images/sale/del.png' onclick='deletefile(this,1,"+ data.fileId +")' class='ml10'></div>");
					//当前上传控件清空
		      		$("#uploaded").val("");
	      		}
	      		else if(flag==2){
	      			$(".criteria4 .form_remind").hide();
		      		$("#fileList1").css("display","block");
		      		$("#fileList1").append("<div class='file_name f_l ml10'>"+filenameShow+"<img src='/newresources/images/sale/del.png' onclick='deletefile(this,2,"+ data.fileId +")' class='ml10'></div>");
					//当前上传控件清空
		      		$("#uploaded1").val("");
	      		}
	         }else{
	        	 window.wxc.xcConfirm(data.message);
	         }
		};
	    addInputUtilFile(fileurl,params,fileElementId,fn);
	}
	
}
/**取消相应送货单的上传
 * deletefile
 * @param e void
 * @author wangjialin
 * 2016-8-22 下午2:36:55
 */
function deletefile(obj,flag,fileId){
	var url = "deliveryRegister/deleteDeliveryAttached.do";
	var params = {};
	var isasync = true;
	params.id = fileId;
	var fn = function(){
		$(obj).parent(".file_name").remove();
		if(flag==1){
			$("#uploaded").val("");
		}
		else if(flag==2){
			$("#uploaded1").val("");
		}
	};
	asyncAjaxMethod(url,params,isasync,fn);
}
/**表单全部清空
 * cleanAll void
 * @author wangjialin
 * 2016-8-22 下午2:38:40
 */
function cleanAll(){
	$(".element").val("");
	$("#fileList").html("");
	$("#fileList1").html("");
	$("input:checkbox").prop('checked',false);
	$("#uploaded").val("");
	$("#uploaded1").val("");
}
/**全选
 * selecAll void
 * @author wangjialin
 * 2016-8-23 上午8:48:35
 */
var i=true;
function selectAll(flag){
	if(flag=="1"){
		if(i){
			$("[name='checkbox']").prop("checked",true);
			i=false;
		}else{
			$("[name='checkbox']").removeAttr("checked");
			i=true;
		}
	}
	if(flag=="2"){
		if($(".selectAll").is(":checked")) {  
			$("[name='checkbox']").prop("checked",true);
		} else {  
			$("[name='checkbox']").removeAttr("checked");
		}  
	}
}
/**点击任意处关闭合同编号选择框
 * closeContractSelect void
 * @author wangjialin
 * 2016-9-19 下午5:04:38
 */
function closeContractSelect(){
	$(".mask_opacity").fadeOut("fast");
	$(".contract_select").hide();
}
/**显示合同编号搜索的下拉框
 * showSelect void
 * @author wangjialin
 * 2016-8-23 上午8:47:06
 */
function showSelect(){
	$(".contract_select").show();
	$(".mask_opacity").fadeIn("fast");
}
/**将下拉框中所选的选项显示在input框中
 * save void
 * @author wangjialin
 * 2016-8-23 上午9:28:31
 */
function save(){
	var item="";
	$(".middle li input").each(function(){
		if($(this).is(':checked')){
			item+=$(this).val()+",";
		}
	});
	if(item.length>52){
		con=item.substring(0, 52);
		con=con+"...";
	}else{
		con=item.substring(0, item.length-1);
	}
	$(".mask_opacity").hide();
	$(".contract_select").hide();
	$("#contract_number").val(con);
}
/**
 * 获取所有已接单的合同编号
 * getAgreementNumList void
 * @author yukai
 * 2016-8-23 下午4:17:16
 */
function getAgreementNumList(){
	var url="deliveryRegister/getAgreementNumByID.do";
	var params={};
	var search_text1=$("#search_text1").val();
	if(search_text1 != ""){
		 params.search_text1 = search_text1;
	}
	params.sup_company_id = companyId;
	var fn=function(result){
		addAgreementNumItems(result.data);
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 合同编号字符串的拼接 doT模板
* addAgreementNumItems
* @param result
* @return void
* @author yukai
* 2016-8-23
 */
function addAgreementNumItems(result){
	var evalText=doT.template($("#allAgreementNumStmpl").text());
	$("#allAgreementNum").html(evalText(result));
}

/**
 * 查询送货记录列表
* getDeliveryRegisterList
* @return void
* @author yukai
* 2016-8-24
 */
function getDeliveryRegisterList(){
	var url = "deliveryRegister/getDeliveryRegisterList.do";
	var params={};	
	InitDatas(0,true,url,params);		
}

/**
分页获取数据
pageIndex：当前页索引
needinit：是否为第一次加载
*/
function InitDatas(pageIndex,needinit,url,param)
{
currentPage=pageIndex;
var url=url;
var params={};
params.send_company_id = companyId;
var search_text=$("#search_text").val();
if(search_text != ""){
	 params.search_text = search_text;
}

params.usePaging=true;
params.page=pageIndex;
params.limit=pageSize;
params.start=parseInt(pageIndex)*pageSize;

var fn=function(result){
	if(pageIndex==0 && needinit){
			//第一次加载时加载分页控件
		initPaginations(result.total);
	}
		//显示数据到表格
		addDeliveryRegisterItems(result.data);	
		$("#total_count").html(result.total);
	};
asyncAjaxMethod(url,params,true,fn);
	
}
/**供应商信息的翻页调用  
*/
function pageselectCallbacks(index,jq)
{
	var url = "deliveryRegister/getDeliveryRegisterList.do";		
	var params={};
    InitDatas(index,false,url,params);
}
/**初始化分页控件
*/
function initPaginations(totalCount){
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
* addDeliveryRegisterItems
* @param result
* @return void
* @author yukai
* 2016-8-24
 */
function addDeliveryRegisterItems(result){
	var evalText=doT.template($("#allDeliveryRegisterStmpl").text());
	$("#allDeliveryRegisters").html(evalText(result));
}
/**
 * 下载文档
 * downLoadFile
 * @param obj void
 * @author yukai
 * 2016-8-24 下午6:19:17
 */
function downLoadFile(obj){
	window.open(getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+$(obj).children().val());
}
/**
 * 删除送货登记记录
 * deleteDeliveryRegister
 * @param register_id void
 * @author yukai
 * 2016-8-24 下午6:19:47
 */
function deleteDeliveryRegister(register_id){
	window.wxc.xcConfirm("是否删除该送货记录？", window.wxc.xcConfirm.typeEnum.confirm,
			{
			onOk:function(){
				var url="deliveryRegister/deleteDeliveryRegister.do";
				var params={};
				params.register_id = register_id;
				var fn=function(result){
					if(result.data){
						//InitDatas(currentPage,false,"deliveryRegister/getDeliveryRegisterList.do","");
						getDeliveryRegisterList();
					}
				};
				asyncAjaxMethod(url,params,true,fn);
			},
			onCancel:function(){
				}
			});
}

//单选
function select_single() {	
	var chknum =  $('#allAgreementNum').find("li").size();//选项总个数 
	var chk = 0;
	 $('#allAgreementNum').find("li").each(function() {
		if ($(this).children()[0].checked == true) {			
			chk++;		
		}
	});
	if (chknum == chk) {//全选 
		$('.selectAll').prop("checked", true);
	} else {//不全选 
		$('.selectAll').prop("checked", false);
	}
}