var record_id=getParamFromWindowName("record_id");
var supplier_id=getParamFromWindowName("supplier_id");
var supplier_cpyname=getParamFromWindowName("supplier_cpyname");
var companyId=getParamFromWindowName("companyIdForAll");
var companyIdForSupplier=getParamFromWindowName("companyIdForSupplier");
var category_delIds=[];//储存要删除的供应品类ID
var category_addIds=[];//储存要增加的供应品类ID
var category_choosed_list;//选择的供应品类
var h_id;
/* 页面加载事件
 * create_by yangliping 2016-7-7 15:09:38
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
		$("#supplier_cpyname").text(supplier_cpyname);
		getPurchaseCategory();
		if(record_id!=null){
			getAccessRecord();
		}else{
			h_id=1;
		}
		getCustomerFilesListByRegId();
		getSupplierTagBySupplierId();
		var companyData=getCompanyInfo();
		baseInfoShow_PF(companyData);//基础信息展示
		picPathSrcForBaseInfo(companyIdForSupplier,18,"#business_licence");//营业执照  //base.js中 
		picPathSrcForBaseInfo(companyIdForSupplier,19,"#tax_registration_certificate");//税务登记
		picPathSrcForBaseInfo(companyIdForSupplier,20,"#organization_code_certificate");//组织机构代码证
		picPathSrcForBaseInfo(companyIdForSupplier,21,"#taxpayer_qualification_certification");//纳税人资格证书
});
/*
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * create_by yangliping 2016-7-7 15:09:46
 */
function loadCommonPage(){
	$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success")
			{
				$("#mainNav").children().eq(0).addClass("curr");
				getCompanyList(companyId);
				$("#company").prev().find("img").css("display","none");
				$("#company").css("display","none");
			}
	});
	$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	var result=isLoginForPlateForm();
	if(result.isLogin==true){
		$(".midd_left_wrap").load(getwebroot()+"usercenter/purchaseManage/purchaseLeftMenu.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#evaluation").children().eq(5).children().eq(0).addClass("curr");
				var leftHeight=$(".midd_left_wrap").height();
				if(leftHeight>$(window).height()-200)
				{
					$(".midd_right_wrap").css({minHeight:leftHeight});
				}
			}
		});
	}
}
function goNext(num)
{
	/*$('#accessApplyInfo .tab li').removeClass("curr");
	$('#accessApplyInfo .tab li').eq(num).addClass("curr");
	$('#accessApplyInfo .tabcon').hide();
	$('#accessApplyInfo .tabcon').eq(num).show();*/
	currtab2("#supplierFile",num);
}
$(document).ready(function(){
	$(".updateSort").on("click",function(){
		var offsetX=$(".updateSort").offset().left;
		var offsetX2=$(".midd_right_wrap").offset().left;
		var d=854+offsetX2-offsetX;
		if(d<180){
			$(".productSort_update").css("left",-(60+d));
		}
		$(".productSort_update").show();
		$(this).next(".mask_opacity").fadeIn("fast");
	});
});
/*
 * 切换tab事件
  * create_by yangliping 2016-6-30 17:32:19
 * */
function currtab(tabId, tabNum){
	//设置点击后的切换样式
	$(tabId + " .tab").children(".curr").removeClass("curr");
	$(tabId + " .tab").children().eq(tabNum).addClass("curr");
	$(tabId + " .tab").children().find("span.split").css("display","inline");
//	$(tabId + " .tab").children().eq(tabNum).prev().find("span.split").css("display","none");
	//根据参数决定显示内容
	$(tabId + " .tabcon").hide();
	$(tabId + " .tabcon").eq(tabNum).show();
	switch(tabNum){
	case 1:
		getCheckFactory();
		break;
	case 2:
		getMaterialCheck();
		break;
	}
}
function currtab2(tabId, tabNum){
	//设置点击后的切换样式
	$(tabId + " .tab2").children(".curr").removeClass("curr");
	$(tabId + " .tab2").children().eq(tabNum).addClass("curr");
	$(tabId + " .tab2").children().find("span.split").css("display","inline");
	//根据参数决定显示内容
	$(tabId + " .tabcon2").hide();
	$(tabId + " .tabcon2").eq(tabNum).show();
	$(".changedRecord").show();
	switch(tabNum){
	case 1:
		getAccessTemplet_DetailInfo();
		$(".changedRecord").hide();
		break;
	case 2:
		getAccessTemplet_ScalepowerInfo();
		$(".changedRecord").hide();
		break;
	case 3:
		getAccessAccountInfo();//银行信息
		getAccessInvoiceTitleInfo();//发票信息
		$(".changedRecord").hide();
		break;
	}
}
//保存供应品类的选择
 function save(){
 	category_addIds=[];
 	category_delIds=[];
	 $(".productSort_update").hide();
	 $("#sortTree").find("input:checkbox").each(function(){
	 	if(($(this)[0].checked||$(this)[0].indeterminate )&& $(this).next().next().val()==-1){
	 		category_addIds.push($(this).next().val());
	 	}
	 	if((!$(this)[0].checked&&!$(this)[0].indeterminate) && $(this).next().next().val()!=-1){
	 		category_delIds.push($(this).next().next().val());
	 	}
	 });
	 
	$("#productSort").children().last().prevAll().remove();
	$("#productSort").prepend('<li class="ml10 f_l">'+category_choosed_list+'</li>');
	 saveCategory();
 }
 //获取采购类目树
function getPurchaseCategory(){
	var url="purchaseCategory/getPurchaseCategoryTree2Json.do";
	var params={};
	var fn=function(result){
		var item="";
		for(var i=0;i<result.data.length;i++){
			if(result.data[i].children != null){
			item+='<li>'
					+'<span class="sort">'+result.data[i].text+'<input onclick="checkBoxEvent(this)"  type="checkbox" class="ml10"/><input type="hidden" value="'+result.data[i].id+'"/><input type="hidden" value="-1"/></span>'
					+ietmMontage(result.data[i])
				+'</li>';
			}else{
				item+='<li>'
					+'<span style="display:inline-block;margin-left:16px;">'+result.data[i].text+'<input onclick="checkBoxEvent(this)" type="checkbox" class="ml10"/><input type="hidden" value="'+result.data[i].id+'"/><input type="hidden" value="-1"/></span>'
				+'</li>';
			}
		}
		$("#sortTree").html(item);
		$("#sortTree").treeview({
		  persist: "location",
		  collapsed: true,
		  unique: true
		 });
	/*	$('.productSort_mid').niceScroll({
			cursorcolor: "#ccc", //#CC0071 光标颜色 
			cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
			touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
			cursorwidth: "5px", //像素光标的宽度 
			cursorborder: "0", //     游标边框css定义 
			cursorborderradius: "5px", //以像素为光标边界半径 
			autohidemode: true //是否隐藏滚动条 
		});	*/
		$(".productSort_mid").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"minimal-dark"
		});
		getPurchaseCategoryInfo();
   	};
   	asyncAjaxMethod(url,params,true,fn);
}
function ietmMontage(data){
	var item="";
	if (data.children != null) {
		for (var j = 0; j < data.children.length; j++) {
			if(data.children[j].children != null){
			item+='<ul>'
						+'<li>'
							+'<span class="sort">'+data.children[j].text+'<input onclick="checkBoxEvent(this)"  type="checkbox" class="ml10"/><input type="hidden" value="'+data.children[j].id+'"/><input type="hidden" value="-1"/></span>'
							+ietmMontage(data.children[j])
						+'</li>'
					+'</ul>';
			}else{
				item+='<ul>'
					+'<li>'
						+'<span style="display:inline-block;margin-left:16px;">'+data.children[j].text+'<input onclick="checkBoxEvent(this)" type="checkbox" class="ml10"/><input type="hidden" value="'+data.children[j].id+'"/><input type="hidden" value="-1"/></span>'
					+'</li>'
				+'</ul>';
			}
		}
		return item;
	}else{
		return "";
	}
}
/**
 * 勾选供应品类
 * checkBoxEvent
 * @param th void
 * @author yukai
 * 2016-9-14 下午2:22:39
 */
function checkBoxEvent(th){	   
		var str = "";
	    var len = 0;
		if($(th)[0].checked){
			$(th).parent().nextAll().find("input:checkbox").prop("indeterminate",false);
			$(th).parent().nextAll().find("input:checkbox").prop("checked","checked");
			var pCheckbox=$(th).parent().parent().parent().prevAll("span").find("input:checkbox");
			var cTotal=pCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox").length;
			var cChecked=pCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox:checked").length
			var cIndeterminate=0;
			pCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox").each(function(){
				if($(this)[0].indeterminate){
					cIndeterminate++;
				}
			});
			if(cTotal==cChecked){
				pCheckbox.prop("indeterminate",false);
				pCheckbox.prop("checked","checked");
			}else{
				pCheckbox.prop("indeterminate",true);
			}
			if(cChecked==0&&cIndeterminate==0){
				pCheckbox.prop("indeterminate",false);
				pCheckbox.prop("checked",false);
			}
			var ppCheckbox=$(th).parent().parent().parent().parent().parent().prevAll("span").find("input:checkbox");
			var ccTotal=ppCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox").length;
			var ccChecked=ppCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox:checked").length;
			var ccIndeterminate=0;
			ppCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox").each(function(){
				if($(this)[0].indeterminate){
					ccIndeterminate++;
				}
			});
			if(ccTotal==ccChecked){
				ppCheckbox.prop("indeterminate",false);
				ppCheckbox.prop("checked","checked");
			}else{
				ppCheckbox.prop("indeterminate",true);
			}
			if(ccChecked==0&&ccIndeterminate==0){
				ppCheckbox.prop("indeterminate",false);
				ppCheckbox.prop("checked",false);
			}
			$("#sortTree").children().each(function(){	
				var arr = [];
				$(this).find("input:checkbox").each(function(index,element){
					if($(this)[0].indeterminate||$(this)[0].checked){
						arr.push($(element).parent().text());
						var len=0;
						$(element).parent().nextAll("ul").find("input:checkbox").each(function(){
							if($(this)[0].indeterminate||$(this)[0].checked){
								len++;
							}
						});
						arr.push(len);	
					}
				});
				if(arr.length!=0){
					str = str+categoryStr(arr)+",";		
				}				
			});
			str = str.substring(0,str.length-1);
		}else{
			$(th).parent().nextAll().find("input:checkbox").prop("checked",false);
			$(th).parent().nextAll().find("input:checkbox").prop("indeterminate",false);
			var pCheckbox=$(th).parent().parent().parent().prevAll("span").find("input:checkbox");
			var cTotal=pCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox").length;
			var cChecked=pCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox:checked").length
			var cIndeterminate=0;
			pCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox").each(function(){
				if($(this)[0].indeterminate){
					cIndeterminate++;
				}
			});
			if(cTotal==cChecked){
				pCheckbox.prop("indeterminate",false);
				pCheckbox.prop("checked","checked");
			}else{
				pCheckbox.prop("checked",false);
				pCheckbox.prop("indeterminate",true);
			}
			if(cChecked==0&&cIndeterminate==0){
				pCheckbox.prop("indeterminate",false);
				pCheckbox.prop("checked",false);
			}
			var ppCheckbox=$(th).parent().parent().parent().parent().parent().prevAll("span").find("input:checkbox");
			var ccTotal=ppCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox").length;
			var ccChecked=ppCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox:checked").length;
			var ccIndeterminate=0;
			ppCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox").each(function(){
				if($(this)[0].indeterminate){
					ccIndeterminate++;
				}
			});
			if(ccTotal==ccChecked){
				ppCheckbox.prop("indeterminate",false);
				ppCheckbox.prop("checked","checked");
			}else{
				ppCheckbox.prop("checked",false);
				ppCheckbox.prop("indeterminate",true);
			}
			if(ccChecked==0&&ccIndeterminate==0){
				ppCheckbox.prop("indeterminate",false);
				ppCheckbox.prop("checked",false);
			}
			$("#sortTree").children().each(function(){	
				var arr = [];
				$(this).find("input:checkbox").each(function(index,element){
					if($(this)[0].indeterminate||$(this)[0].checked){
						arr.push($(element).parent().text());
						var len=0;
						$(element).parent().nextAll("ul").find("input:checkbox").each(function(){
							if($(this)[0].indeterminate||$(this)[0].checked){
								len++;
							}
						});
						arr.push(len);	
					}
				});
				if(arr.length!=0){
					str = str+categoryStr(arr)+",";		
				}				
			});
			str = str.substring(0,str.length-1);
		}
		category_choosed_list= str;
//		$("#PRODUCTSORT").CHILDREN().LAST().PREVALL().REMOVE();
//		$("#PRODUCTSORT").PREPEND('<LI CLASS="ML10 F_L">'+STR+'</LI>');
}
//获取准入申请供应品类
function getPurchaseCategoryInfo(){
	var url="AccessApplicationCtrl/getAccessApplicationCategoryList.do";
	var params={};
	params.supplier_id=supplier_id;
	var fn = function(result){
		var str="";
		for(var i=0;i<result.data.length;i++){
			$("#sortTree").find("input:checkbox").each(function(){
				if(result.data[i].category_id==$(this).next().val()){
					$(this).prop("checked", true);
					$(this).next().next().val(result.data[i].id);
				}
			});
		}  
		$("#sortTree").find("input:checkbox:checked").each(function(){
			var total=$(this).parent().nextAll("ul").find("input:checkbox").length;
			var checked=$(this).parent().nextAll("ul").find("input:checkbox:checked").length;
			if(total==checked){
			}else{
				$(this).prop("checked",false);
				$(this).prop("indeterminate",true);
			}
		});
		$("#sortTree").children().each(function(){	
			var arr = [];
			$(this).find("input:checkbox").each(function(index,element){
				if($(this)[0].indeterminate||$(this)[0].checked){
					arr.push($(element).parent().text());
					var len=0;
					$(element).parent().nextAll("ul").find("input:checkbox").each(function(){
						if($(this)[0].indeterminate||$(this)[0].checked){
							len++;
						}
					});
					arr.push(len);	
				}
			});
			if(arr.length!=0){
				str = str+categoryStr(arr)+",";		
			}				
		});
		str = str.substring(0,str.length-1);
		$("#productSort").children().last().prevAll().remove();
		$("#productSort").prepend('<li class="ml10 f_l">'+str+'</li>');
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 根据供应品类数组拼接字符串
 * categoryStr
 * @param arr
 * @returns {String} String
 * @author yukai
 * 2016-9-18 下午1:49:48
 */
function categoryStr(arr){
	var str = "";
	var num = 0;//第一层的计数
	var nsm = 0;//第二层的计数
	var nsmvo = 0;
	var numvo = 0;//
	for(var x in arr){
		if(x%2 == 0 ){
		str = str + arr[x];
		var count = parseInt(x)+1;
		if(num>0 && nsm == 0){
			nsm = parseInt(arr[count]);
			if(nsm != 0){
			nsmvo = parseInt(x) + nsm*2;
			}
			}
		if(num==0){
		    num = parseInt(arr[count]);
		    numvo = num*2;
		}				
		if(numvo==x && x> 2){
			if(nsmvo == x){				
				str = str +')';
			}
			str = str +')';
		}else{	
			if((parseInt(arr[count]))>0){
				str = str + '(';				
			}else if(x>0){ 
				if(nsmvo == x){	
					if( x> 2){
						str = str +'),';
					}else{
						str = str +')';
					}										
				}else{	
					if((parseInt(x)+2)==arr.length){	
					  str = str +')';
					}else{
				      str = str + ',';
					}
				}
			}
		}
      }
    }
	return str;
}
 //获取准入流水
function getAccessRecord(){
	var url="AccessApplicationCtrl/getAccessRecord.do";
	var params={};
	params.record_id=record_id;
	var fn = function(result){
		if(result.data.length>0){
			$("#submit_date").text("准入时间："+getPassTime());
			getCheckFactoryTime();
			h_id=result.data[0].h_id;
		}else{
			var option ={title:"提示",btn:parseInt("0001",2),onOk:function(){window.location.href=getwebroot()+"supplierFiles/supplierList.htm";}};
		    window.wxc.xcConfirm("该档案不存在", window.wxc.xcConfirm.typeEnum.custom,option);
		}
	};
	asyncAjaxMethod(url,params,false,fn);
}
//获取详细信息模板
function getAccessTemplet_DetailInfo(){
	var url="AccessApplicationCtrl/getAccessTemplet.do";
	var params={};
	params.hId=h_id;
	params.classifyId=2;
	var fn=function(result){
		var item='<div class="ml20 mt20">';
		for(i=0;i<result.data.length;i++){
			for(j=0;j<result.data.length;j++){
				if(result.data[j].order_by==i+1){
					if(result.data[j].elements.length>0){
						var related_basis=result.data[j].elements[0].related_basis;
					}
					if(result.data[j].templet_name=="主要原材料及品牌"){
						item+='<div class="display_inner_line_wrap ml20 mt20">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>'
						+'<div id="mateial" class=" mt10 ml20">'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="主要销售产品及品牌"){
						item+='<hr class="hr_grey mt30 clear" >'	
						+'<div class="display_inner_line_wrap ml20 mt20">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>'
						+'<div id="goods" class=" mt10 ml20">'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="主要客户"){
						item+='<div class="display_inner_line_wrap ml20 mt20">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>'
						+'<div id="customer" class=" mt10 ml20">'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="主要竞争对手"){
						item+='<div class="display_inner_line_wrap ml20 mt20">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>'
						+'<div id="competitor" class=" mt10 ml20">'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="厂容厂貌"){
						item+='<hr class="hr_grey mt30 clear" >'	
						+'<div class="display_inner_line_wrap ml20 mt20">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>'
						+'<div id="company_equipment_imgs" class="buslicense_wrap ml20 mt10">'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="企业简介"){
						item+='<hr class="hr_grey mt30 clear">'	
						+'<div class="display_inner_line_wrap ml20 mt20">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>'
						+'<div id="'+related_basis+'" class="mt10 ml20 font2">'
						+'</div>';
						break;
					}
					else{
						item+='<div class="display_inner_line_wrap">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'<span id="'+related_basis+'" class="display_wrap"></span>'
						+'</div>';
						break;
					}
				}
			}
		}
		item+='<div class="t_algin_r">'
					+'<button class="yellow_button ml10 mt30 mb30" onClick="goNext(0)">上一页</button>'
					+'<button class="yellow_button ml10 mt30 mb30" onClick="goNext(2)">下一页</button>'
				+'</div>';
		$("#detail_info").html(item);
		getAccessApplicationInfo(2);
		saleShow();//主要销售产品及品牌
		materialShow();//主要原材料及品牌
		customerShow();//主要用户展示
		competitorShow();//主要竞争对手展示
		showMorePic1(24);//24 为厂容厂貌  showMorePic:显示多张图片的方法
	};
	asyncAjaxMethod(url,params,true,fn);
}

//获取规模能力模板
function getAccessTemplet_ScalepowerInfo(){
	var url="AccessApplicationCtrl/getAccessTemplet.do";
	var params={};
	params.hId=h_id;
	params.classifyId=3;
	var fn=function(result){
		var item='';
		for(i=0;i<result.data.length;i++){
			for(j=0;j<result.data.length;j++){
				if(result.data[j].order_by==i+1){
					if(result.data[j].elements.length>0){
						var related_basis=result.data[j].elements[0].related_basis;
					}
					if(result.data[j].templet_name=="员工人数"){
						item+='<div class="ml10 mt30 b"><span class="title_split">||</span>&nbsp;&nbsp;基本信息</div>'
						+'<div class="ml30">'
						+'<div class="display_inner_line_wrap">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'<span id="'+related_basis+'" class="label_wrap"><span class="display_wrap"></span>人</span>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="其他人员"){
						item+='<div id="otherperson" class="display_inner_line_wrap">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="人员结构"){
						item+='<div id="persontype" class="display_inner_line_wrap">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="质量控制"){
						item+='<hr class="hr_grey mt30 clear" >'	
						+'<div class="ml30">'
						+'<div class="display_inner_line_wrap"  style="width:50%;">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'<span id="'+related_basis+'" class="display_wrap ml20"></span>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="OEM代加工"){
						item+='<div class="display_inner_line_wrap" style="width:50%;">'
						+'<span class="label_wrap" >'+result.data[j].templet_name+'</span>'
						+'<span id="'+related_basis+'" class="display_wrap ml20"></span>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="管理体系认证"){
						item+='<div class="display_inner_line_wrap">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'<span id="'+related_basis+'" class="display_wrap ml20"></span>'
						+'</div>'
						+'<div class="buslicense_wrap ml20 mt10">'
						+'<div class="img_wrap_1">'
						+'<div class="img_block_pic">'
						+'<img id="management_system" class="ml80" src="/newresources/images/moreLicense.png">'
						+'</div>'
						+'</div>'
						+'</div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="年营业额"){
						item+='<hr class="hr_grey mt30 clear" >'	
						+'<div class="ml30">'
						+'<div class="display_inner_line_wrap"  style="width:50%;">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="label_wrap "></span>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="年出口额"){
						item+='<div class="display_inner_line_wrap"  style="width:50%;">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="label_wrap "></span>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="年进口额"){
						item+='<div class="display_inner_line_wrap"  style="width:50%;">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="label_wrap "></span>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="企业面积"){
						item+='<div class="display_inner_line_wrap"  style="width:50%;">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="label_wrap "><span class="display_wrap"></span>平方米</span>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="厂房面积"){
						item+='<div class="display_inner_line_wrap"  style="width:50%;">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="label_wrap "><span class="display_wrap"></span>平方米</span>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="使用年限"){
						item+='<div class="display_inner_line_wrap"  style="width:50%;">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="useTime" class="display_wrap "></span>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="产权"){
						item+='<div class="display_inner_line_wrap">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="display_wrap "></span>'
							+'</div>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="设备清单"){
						item+='<div class="ml10 mt30 b"><span class="title_split">||</span>&nbsp;&nbsp;'+result.data[j].templet_name+'</div>'
								+'<table id="devicelist" class="supplier_tableList ml10 mt20">'
								+'<tr>'
									+'<th>设备名称</th>'
									+'<th>规格</th>'
									+'<th>产地</th>'
									+'<th>价值(万元)</th>'
									+'<th>购买日期</th>'
									+'<th>数量</th>'
									+'<th>先进性</th>'
								+'</tr>'
							+'</table>';
						break;
					}
					else if(result.data[j].templet_name=="院校合作"){
						item+='<div class="ml10 mt30 b"><span class="title_split">||</span>&nbsp;&nbsp;院校信息</div>'
						+'<div class="ml30">'
						+'<p class="mt20">'+result.data[j].templet_name+'</p>'
						+'<p id="'+related_basis+'" class="mt10"></p>'
						+'<p class="mt20">附件信息：</p>'
						+'<div id="annex_text" class="mr20 enclosure">'
						+'</div>'	
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="专利"){
						item+='<div class="ml10 mt30 b"><span class="title_split">||</span>&nbsp;&nbsp;资质图片</div>'
						+'<div class="ml30 ">'
						+'<p class="mt20">'+result.data[j].templet_name+'</p>'
						+'<div id="patent_imgs" class="buslicense_wrap mr10 mt20">'
						+'</div>'	
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="其他资质"){
						item+='<hr class="hr_grey mt30 clear">'
						+'<div  class="ml30 ">'	
						+'<p class="mt20">'+result.data[j].templet_name+'</p>'
						+'<div id="other_intelligence_imgs" class="buslicense_wrap mr10 mt20 clearfix">'
						+'</div>'
						+'</div>';
						break;
					}
				}
			}
		}
		item+='<div class="t_algin_r">'
					+'<button class="yellow_button ml10 mt30 mb30" onClick="goNext(1)">上一页</button>'
					+'<button class="yellow_button ml10 mt30 mb30" onClick="goNext(3)">下一页</button>'
				+'</div>';
		$("#scalepower_info").html(item);
		getAccessApplicationInfo(3);
		deviceShow();//设备展示
		picPathSrc1(25,"#management_system");//质量体系认证
		showMorePic1(26);//专利图片展示
		showMorePic1(27);//其他资质图片展示
		showText1(30);
	};
	asyncAjaxMethod(url,params,true,fn);
}
//获取准入资料信息
function getAccessApplicationInfo(classify_id){
	var url="AccessApplicationCtrl/getAccessApplicationInfo.do";
	var params={};
	params.supplier_id=supplier_id;
	params.classify_id=classify_id;
	var fn = function(result){
		for(var i=0;i<result.data.length;i++){
				if(classify_id==1){
					$("#" + result.data[i].related_basis + "").html(""
							+ result.data[i].content + "");
				}
				else if(classify_id==2){
					if (result.data[i].related_basis == "reg_addr_code") {
						var reg_addr_code=result.data[i].content;
					}
					else if(result.data[i].related_basis == "contact_addr"){
						var contact_addr=result.data[i].content;
					}else{
						$("#" + result.data[i].related_basis + "").html(""
								+ replaceNullAsStr(result.data[i].content) + "");
					}
				}
				else if(classify_id==3){
					if (result.data[i].related_basis == "emplyees") {
						$("#" + result.data[i].related_basis + "").find("span").text(replaceZeroAndNullAsStr(result.data[i].content));
					}
					else if (result.data[i].related_basis == "college_num") {
						var collegeNum = result.data[i].content;
					}
					else if (result.data[i].related_basis == "diploma_num") {
						var diplomaNum = result.data[i].content;
					}
					else if (result.data[i].related_basis == "diploma_down_num") {
						var diplomaDownNum = result.data[i].content;
					}
					else if (result.data[i].related_basis == "tech_num") {
						var techNum = result.data[i].content;
					}
					else if (result.data[i].related_basis == "qc_num") {
						var qcNum = result.data[i].content;
					}
					else if (result.data[i].related_basis == "internal_auditor_num") {
						var internalAuditorNum = result.data[i].content;
					}
					else if (result.data[i].related_basis == "staff_num") {
						var staffNum = result.data[i].content;
					}
					else if (result.data[i].related_basis == "op_num") {
						var opNum = result.data[i].content;
					}
					else if (result.data[i].related_basis == "quality_control") {
						var str="";
						switch (result.data[i].content) {
							case "0" :
								str="内部";
								break;
							case "1" :
								str="第三方";
								break;
							case "2" :
								str="无";
								break;
							default :
								break;
						}
						$("#"+result.data[i].related_basis+"").text(str);
					}
					else if (result.data[i].related_basis == "is_oem") {
						var str="";
						switch (result.data[i].content) {
							case "0" :
								str="提供";
								break;
							case "1" :
								str="不提供";
								break;
							default :
								break;
						}
						$("#"+result.data[i].related_basis+"").text(str);
					}
					// 质量管理体系
					else if (result.data[i].related_basis == "certification_system") {
						$("#"+result.data[i].related_basis+"").text(replaceNullAsStr(result.data[i].content));
					}
					else if(result.data[i].related_basis == "turnover"){
						var turnover = result.data[i].content;
					}
					else if(result.data[i].related_basis == "turnover_currency_id"){
						var turnover_currency_id = result.data[i].content;
					}
					else if(result.data[i].related_basis == "exportNum"){
						var exportNum = result.data[i].content;
					}
					else if(result.data[i].related_basis == "export_currency_id"){
						var export_currency_id = result.data[i].content;
					}
					else if(result.data[i].related_basis == "importNum"){
						var importNum = result.data[i].content;
					}
					else if(result.data[i].related_basis == "import_currency_id"){
						var import_currency_id = result.data[i].content;
					}
					else if(result.data[i].related_basis == "use_begintime"){
						var use_begintime = result.data[i].content;
					}
					else if(result.data[i].related_basis == "use_endtime"){
						var use_endtime = result.data[i].content;
					}
					else if(result.data[i].related_basis == "companyArea"){
						$("#" + result.data[i].related_basis + "").find("span").text(replaceZeroAndNullAsStr(result.data[i].content));
					}
					else if(result.data[i].related_basis == "factoryArea"){
						$("#" + result.data[i].related_basis + "").find("span").text(replaceZeroAndNullAsStr(result.data[i].content));       
					}
					else if(result.data[i].related_basis == "factory_owner"){
						var str="";
						switch (result.data[i].content) {
							case "0" :
								str="无";
								break;
							case "1" :
								str="租赁";
								break;
							case "2" :
								str="自建";
								break;
							default :
								break;
						}
						$("#"+result.data[i].related_basis+"").text(str);
					} 
					else if(result.data[i].related_basis == "schoolCoop"){
						$("#"+result.data[i].related_basis+"").text(replaceNullAsStr(result.data[i].content));
					}
				}
		}
		if(classify_id==2){
			var province="";
			var city="";
			var country="";
			if(reg_addr_code!=0&&reg_addr_code!=null){
				var provinceNum = Math.floor(parseInt(reg_addr_code)/ 10000)* 10000;
				var cityNum = Math.floor(parseInt(reg_addr_code) / 100)* 100;
				var countryNum = reg_addr_code;
				province=getCityNameByCityCode(provinceNum);
				city=getCityNameByCityCode(cityNum);
				country=getCityNameByCityCode(countryNum);
			}
			var item5=province+city+country+contact_addr;
			$("#contact_addr").html(item5);
		}
		else if(classify_id==3){
			var item="";
			if (techNum != 0 && techNum != null) {
				item+='<span  class="label_wrap  ml10"><span class="display_wrap">科研人员</span>'+techNum+'人</span>';
			}
			if (opNum != 0 && opNum != null) {
				item+='<span  class="label_wrap  ml10"><span class="display_wrap">操作人员</span>'+opNum+'人</span>';
			} 
			if (qcNum != 0 && qcNum != null) {
				item+='<span  class="label_wrap  ml10"><span class="display_wrap">专职检验</span>'+qcNum+'人</span>';
			}  
			if (staffNum != 0 && staffNum != null) {
				item+='<span  class="label_wrap  ml10"><span class="display_wrap">间接员工</span>'+staffNum+'人</span>';
			}
			if (internalAuditorNum != 0
					&& internalAuditorNum != null) {
				item+='<span  class="label_wrap  ml10"><span class="display_wrap">内审人员</span>'+internalAuditorNum+'人</span>';
			}
			$("#otherperson").append(item);
			var item1="";
			if (collegeNum != 0 && collegeNum != null) {
				item1+='<span  class="label_wrap  ml10"><span class="display_wrap">专科及以上</span>'+collegeNum+'人</span>';
			}
			if (diplomaDownNum != 0
					&& diplomaDownNum != null) {
				item1+='<span  class="label_wrap  ml10"><span class="display_wrap">专科以下</span>'+diplomaDownNum+'人</span>';
			}
			$("#persontype").append(item1);
			currencys=CurrencysUtil;
			var currency_name="";
			$.each(currencys,function(index,c){
				if(c.currency_id==turnover_currency_id){
					currency_name=c.currency_name;
				}
			});
			if(turnover!=0&&turnover!=null){
				var item2='<span class="display_wrap">'+turnover+'万'+'</span>'+currency_name+'';
				$("#turnover").html(item2);
			}
			var currency_name1="";
			$.each(currencys,function(index,c){
				if(c.currency_id==export_currency_id){
					currency_name1=c.currency_name;
				}
			});
			if(exportNum!=0&&exportNum!=null){
				var item3='<span class="display_wrap">'+exportNum+'万'+'</span>'+currency_name1+'';
				$("#exportNum").html(item3);
			}
			var currency_name2="";
			$.each(currencys,function(index,c){
				if(c.currency_id==import_currency_id){
					currency_name2=c.currency_name;
				}
			});
			if(importNum!=0&&importNum!=null){
				var item4='<span class="display_wrap">'+importNum+'万'+'</span>'+currency_name2+'';
				$("#importNum").html(item4);
			}
			$("#useTime").text(replaceNullAsStr(use_begintime)+"~"+replaceNullAsStr(use_endtime));
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/*展示公司图片基本信息准入资料附件表读取
 * 
 * fileTypeId 图片文件位置类型ID
 * picId 图片展示位置的img标签ID
 * */
function picPathSrcForBaseInfo1(fileTypeId,picId){
	var url = "AccessApplicationCtrl/getAccessApplicationAttched.do";
	var params = {};
	params.supplier_id = supplier_id;
	params.file_type_id = fileTypeId;
	
	var isasync = true;
	var fn = function(result){
		if(result.data != ""){
			$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
		}else{
			//$(picId).attr("src","/newresources/images/uploadImg.png");
			$(picId).parent().parent().css("display","none");
		}
	};
	
	asyncAjaxMethod(url,params,isasync,fn);
}
//主要销售产品及品牌展示
function saleShow(){
	var url = "AccessApplicationCtrl/getAccessApplicationGoods.do";
	var params = {};
	params.supplier_id = supplier_id;
	var fn = function(result) {
		var goodsList = result.data;
		var item='';
		if(goodsList.length > 0){
			if (goodsList.length > 1) {
				for(var i=0;i<goodsList.length-1;i++){
					item+='<span class="font2">'+goodsList[i].goods_name+'</span><label class="ml10 font1">'+goodsList[i].goods_brand+'、</label>';
				}
				item+='<span class="font2">'+goodsList[goodsList.length-1].goods_name+'</span><label class="ml10 font1">'+goodsList[goodsList.length-1].goods_brand+'</label>';
			}else{
				item+='<span class="font2">'+goodsList[0].goods_name+'</span><label class="ml10 font1">'+goodsList[0].goods_brand+'</label>';
			}
		}
		$("#goods").html(item);
	};
	asyncAjaxMethod(url, params, true, fn);
}
//主要原材料及品牌展示
function materialShow(){
	var url = "AccessApplicationCtrl/getAccessApplicationMaterial.do";
	var params = {};
	params.supplier_id = supplier_id;
	var fn = function(result) {
		var metarialList = result.data;
		var item='';
		if(metarialList.length > 0){
			if (metarialList.length > 1) {
				for(var i=0;i<metarialList.length-1;i++){
					item+='<span class="font2">'+metarialList[i].material_name+'</span><label class="ml10 font1">'+metarialList[i].material_brand+'、</label>';
				}
				item+='<span class="font2">'+metarialList[metarialList.length-1].material_name+'</span><label class="ml10 font1">'+metarialList[metarialList.length-1].material_brand+'</label>';
			}else{
				item+='<span class="font2">'+metarialList[0].material_name+'</span><label class="ml10 font1">'+metarialList[0].material_brand+'</label>';
			}
		}
		$("#mateial").html(item);
	};
	asyncAjaxMethod(url, params, true, fn);
}
//主要客户展示
function customerShow(){
	var url = "AccessApplicationCtrl/getAccessApplicationCustomer.do";
	var params = {};
	params.supplier_id = supplier_id;
	var fn = function(result) {
		var customerList = result.data;
		var item='';
		if(customerList.length > 0){
			if (customerList.length > 1) {
				for(var i=0;i<customerList.length-1;i++){
					item+='<span class="font2">'+customerList[i].customer_name+'、</span>';
				}
				item+='<span class="font2">'+customerList[customerList.length-1].customer_name+'</span>';
			}else{
				item+='<span class="font2">'+customerList[0].customer_name+'</span>';
			}
		}
		$("#customer").html(item);
	};
	asyncAjaxMethod(url, params, true, fn);
}
//主要竞争对手展示
function competitorShow(){
	var url = "AccessApplicationCtrl/getAccessApplicationCompetitor.do";
	var params = {};
	params.supplier_id = supplier_id;
	var fn = function(result) {
		var competitorList = result.data;
		var item='';
		if(competitorList.length > 0){
			if (competitorList.length > 1) {
				for(var i=0;i<competitorList.length-1;i++){
					item+='<span class="font2">'+competitorList[i].competitor_name+'、</span>';
				}
				item+='<span class="font2">'+competitorList[competitorList.length-1].competitor_name+'</span>';
			}else{
				item+='<span class="font2">'+competitorList[0].competitor_name+'</span>';
			}
		}
		$("#competitor").html(item);
	};
	asyncAjaxMethod(url, params, true, fn);
}
//设备展示 
function deviceShow() {
	var url = "AccessApplicationCtrl/getAccessApplicationDevicelist.do";
	var params = {};
	params.supplier_id = supplier_id;
	var fn = function(result) {
		var deviceList = result.data;
		var item="";
		if (deviceList.length > 0) {
			for(var i=0;i<deviceList.length;i++){
				var buy_day;
				if(deviceList[i].buy_day!=null){
					buy_day=deviceList[i].buy_day.substring(0,deviceList[i].buy_day.lastIndexOf(" "));
				}else{
					buy_day="";
				}
				item+='<tr >'
						+'<td>'+deviceList[i].device_name+'</td>'
						+'<td>'+deviceList[i].specifications+'</td>'
						+'<td>'+deviceList[i].place+'</td>'
						+'<td>'+replaceNullAsStr(deviceList[i].price)+'</td>'
						+'<td>'+buy_day+'</td>'
						+'<td>'+deviceList[i].device_num+'</td>'
						+'<td>'+deviceList[i].advanced+'</td>'
					+'</tr>';
			}
		}
		$("#devicelist").append(item);
	};
	asyncAjaxMethod(url, params, true, fn);
}	
//多张图片展示
function showMorePic1(fileTypeId){
	var url = "AccessApplicationCtrl/getAccessApplicationAttched.do";
	var params = {};
	params.file_type_id = fileTypeId;
	params.supplier_id=supplier_id;
	
	var isasync = true;
	var fn = function(result){
		if(result.data != ""){
				for(var i=0; i<result.data.length; i++){
					var imgSrc = getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[i].mogodb_id;
					var filename = result.data[i].file_name;
					var creatDate = result.data[i].create_dt;
					var _newli='<div class="img_wrap_1">'
							+'<div class="img_block_pic"><img src="'+imgSrc+'"/></div>'
							+'<div class="img_block_text"><label title="'+ filename +'">'+ strVachar(filename,23)+'</label></div>'
						+'</div>';
		     		if(fileTypeId == 24){
		     			$("#company_equipment_imgs").prepend(_newli);
		     		}else if(fileTypeId == 26){
		     			$("#patent_imgs").prepend(_newli);
		     		}else if(fileTypeId == 27){
		     			$("#other_intelligence_imgs").prepend(_newli);
		     		}
				}
			}else{
				var img='<img src="/newresources/images/tasks/notexist.png">';
				if(fileTypeId == 24){
		     			$("#company_equipment_imgs").prepend(img);
		     	}else if(fileTypeId == 26){
		     			$("#patent_imgs").prepend(img);
		     	}else if(fileTypeId == 27){
		     			$("#other_intelligence_imgs").prepend(img);
		     	}
			}
	};		
	asyncAjaxMethod(url,params,isasync,fn);	
}
function showText1(fileType){
	var url = "AccessApplicationCtrl/getAccessApplicationAttched.do";
	var params = {};
	params.file_type_id = fileType;
	params.supplier_id=supplier_id;
	
	var isasync = true;
	var fn = function(result){
		for(var i=0; i<result.data.length; i++){
			var creatDate = result.data[i].create_dt;
			var _newli="<p class='mt10'><a class='blue' onClick='downloadText(this)'>" + result.data[i].file_name + "</a>"
						+'<input type="hidden" value="'+ result.data[i].mogodb_id +'">'
							+"<span class='f_r'>"+ result.data[i].create_dt +"</span></p>";
			
			$("#annex_text").prepend(_newli);
		}
	};		
					
	asyncAjaxMethod(url,params,isasync,fn);	
}
/*展示公司图片基本信息 mishengliang
 * 
 * fileTypeId 图片文件位置类型ID
 * picId 图片展示位置的img标签ID
 * */
function picPathSrc1(fileTypeId,picId){
	var url = "AccessApplicationCtrl/getAccessApplicationAttched.do";
	var params = {};
	params.supplier_id = supplier_id;
	params.file_type_id = fileTypeId;
	
	var isasync = true;
	var fn = function(result){
		if(result.data != ""){
				$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
			}else{
				$(picId).attr("src","/newresources/images/tasks/notexist.png");
			}
	};
	asyncAjaxMethod(url,params,isasync,fn);
}
//获取银行信息
function getAccessAccountInfo(){
	var url="AccessApplicationCtrl/getAccessAccount.do";
	var params={};
	params.supplier_id=supplier_id;
	var fn = function(result){
		var tableItem='<tr>'
						+'<th>开户行</th>'
						+'<th>开户账号</th>'
						+'<th>账号状态</th>'
					+'</tr>';
		for(var i=0;i<result.data.length;i++){
			var account_sts;
			if(result.data[i].account_sts==0){
				account_sts="在用";
			}else{
				account_sts="已注销";
			}
			tableItem+='<tr>'
							+'<td>'+result.data[i].account_name+'</td>'
							+'<td>'+result.data[i].account_code+'</td>'
							+'<td>'+account_sts+'</td>'
						+'</tr>';
		}
		$("#bankTable").html(tableItem);
	};
	asyncAjaxMethod(url,params,true,fn);
}
//获取发票抬头信息
function getAccessInvoiceTitleInfo(){
	var url="AccessApplicationCtrl/getAccessInvoiceTitle.do";
	var params={};
	params.supplier_id=supplier_id;
	var fn = function(result){
 		var tableItem='<tr>'
						+'<th>发票抬头</th>'
					+'</tr>';
		for(var i=0;i<result.data.length;i++){
			tableItem+='<tr>'
							+'<td>'+result.data[i].invoice_title_name+'</td>'
						+'</tr>';
		}
		$("#invoiceTable").html(tableItem);
	};
	asyncAjaxMethod(url,params,true,fn);
}
//下载文档
function downloadText(obj){
	window.open(getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+$(obj).next().val());
}
//获取验厂报告信息
function getCheckFactory(){
	var url="CustomerFilesCtrl/getCheckFactoryList.do";
	var params={};
	params.supplier_id=supplier_id;
	var fn=function(result){
		var checkFactory=result.data;
		var item='<hr class="hr_grey clear" >';
		if(checkFactory){
			for(var i=0;i<checkFactory.length;i++){
				item+='<div class="mt20 mb20">'
				+'<span class="greycolor">'+checkFactory[i].create_dt+'</span><span class="ml30"> <a onClick="downloadText(this)" class="blue">'+checkFactory[i].file_name+'</a><input type="hidden" value='+ checkFactory[i].mogodb_id +'><span class="f_r"><span class="redcolor">'+checkFactory[i].check_score+'</span>分</span></span>'
				+'</div>'
				+'<hr class="hr_dashed clear" >';
			}
		}
		$("#checkFactory").html(item);
	};
	asyncAjaxMethod(url,params,true,fn);
}
//获取最后一份验厂报告时间
function getCheckFactoryTime(){
	var url="CustomerFilesCtrl/getCheckFactoryList.do";
	var params={};
	var check_time;
	params.supplier_id=supplier_id;
	var fn=function(result){
		var checkFactory=result.data;
		if(checkFactory.length>0){
			check_time=checkFactory[0].create_dt;
		}else{
			check_time="无";
		}
		$("#check_time").text("最后验厂时间："+check_time);
	};
	asyncAjaxMethod(url,params,true,fn);
}
//获取物料确认信息
function getMaterialCheck(){
	var url="CustomerFilesCtrl/getMaterialCheckList.do";
	var params={};
	params.supplier_id=supplier_id;
	var fn=function(result){
		var materialCheck=result.data;
		var item='<hr class="hr_grey clear" >';
		if(materialCheck){
			for(var i=0;i<materialCheck.length;i++){
				item+='<div class="mt20 mb20">'
				+'<span class="greycolor">'+materialCheck[i].create_dt+'</span><span class="ml30"> <a onClick="downloadText(this)" class="blue">'+materialCheck[i].file_name+'</a><input type="hidden" value='+ materialCheck[i].mogodb_id +'></span>'
				+'</div>'
				+'<hr class="hr_dashed clear" >';
			}
		}
		$("#materialCheck").html(item);
	};
	asyncAjaxMethod(url,params,true,fn);
}
function delCategoryById(){
	var url="AccessApplicationCtrl/delAccessApplicationCategory.do";
	var params={};
	params.category_ids=category_delIds.join(",");
	var fn = function(result){
		if(result.data){
			//location.reload(true);
			getPurchaseCategoryInfo();
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
function saveCategory(){
	var url="AccessApplicationCtrl/addAccessApplicationCategorys.do";
	var params={};
	params.category_ids=category_addIds.join(",");
	params.record_id=record_id;
	params.supplier_id=supplier_id;
	var fn = function(result){
		if(result.data){
			delCategoryById();
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
//获取平台公司信息
function getCompanyInfo(){
	var url = "supplierForPlateForm/getCompanyInfoByCompanyId1.do";
	var params = {};
	params.companyId = companyIdForSupplier;
	var companyData;
	var fn = function(result){
		companyData = result.data;
	};
	asyncAjaxMethod(url,params,false,fn);
	return companyData;
}

//读取平台基本信息
function baseInfoShow_PF(result){
		var companyBaseInfo = result.companyBaseInfo;//公司基础信息 
 		var compnayExtraInfo = result.compnayExtraInfo;//公司附加信息
 		
		$("#cpyname_cn").html(companyBaseInfo.cpyname_cn);//企业名称
		$("#corporation").html(companyBaseInfo.corporation);//法人代表
		if(companyBaseInfo.establish_dt){
			$("#establish_dt").html(companyBaseInfo.establish_dt.substring(0,companyBaseInfo.establish_dt.lastIndexOf(" ")));//成立日期
		}
		$("#reg_fund").html(companyBaseInfo.reg_fund+"万 "+companyBaseInfo.currency_name);//注册资本
		$("#reg_addr").html(companyBaseInfo.reg_addr);//注册地址
		$("#nature_id").html(compnayExtraInfo.nature_name);//企业类型
		$("#industry_id").html(compnayExtraInfo.industry_name);//经营模式
		$("#class_id").html(compnayExtraInfo.class_name);//所属行业
		$("#key_remark").html(companyBaseInfo.key_remark);//主营业务
}
/*展示公司图片基本信息平台读取mishengliang
 * 
 * companyId 当前用户的公司ID
 * fileTypeId 图片文件位置类型ID
 * picId 图片展示位置的img标签ID
 * */
function picPathSrcForBaseInfo(companyId,fileTypeId,picId){
	var url = "PfTaskFileCtrl/getTaskFileListForWindow.do";
	var params = {};
	params.companyId = companyIdForSupplier;
	params.fileTypeId = fileTypeId;
	
	var isasync = true;
	var fn = function(result){
		if(result.data != ""){
			$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
		}else{
			//$(picId).attr("src","/newresources/images/uploadImg.png");
			$(picId).parent().parent().css("display","none");
		}
	};
	
	asyncAjaxMethod(url,params,isasync,fn);
}

/**
 * 获取供应商在当前登陆账号下的所有客户
* getCustomerFilesListByRegId void
* @author yukai
* 2016-8-2 上午10:37:53
 */
function getCustomerFilesListByRegId(){
	var url="CustomerFilesCtrl/getCustomerFilesListByRegId.do";
	var params={};
	params.company_id=companyIdForSupplier;
	var fn=function(result){
		var customerFiles=result.data;
		var item='';
		if(materialCheck){
			for(var i=0;i<customerFiles.length;i++){
				item+='<li class="ml10 mt10 f_l">'+customerFiles[i].owner_cpyname+'</li>';
			}
		}
		$("#customerFiles").html(item);
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 获取当前供应商标签
 * getCustomerFilesListByRegId void
 * @author yukai
 * 2016-9-21 下午4:42:03
 */
function getSupplierTagBySupplierId(){
	var url="CustomerFilesCtrl/getSupplierTagBySupplierId.do";
	var params={};
	params.supplierId=supplier_id;
	var fn=function(result){
		var supplierTag=result.data;
		var item='';
		if(supplierTag){
			for(var i=0;i<supplierTag.length;i++){
				item+='<li class="ml10 mt10 f_l">'+supplierTag[i].tag_name+'</li>';
			}
		}
		$("#supplierTag").html(item);
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 获取准入通过的时间
 * getPassTime void
 * @author yukai
 * 2016-9-8 上午10:45:01
 */
function getPassTime(){
	var passTime="";
	var url = "AccessApplicationCtrl/getPassTime.do";
	var params = {};
	params.record_id=record_id;
	var fn = function(result){
		if(result.data){
			passTime=result.data;
		}
	};
	asyncAjaxMethod(url,params,false,fn);
	return passTime;
}
function goQualificationChange(){
	var URIstring = getwebroot()+"supplierFiles/qualificationChange/"+companyIdForSupplier+".htm?company_id="+companyIdForSupplier+"&companyId="+companyId;
	var paraString = URIstring.substring(URIstring.indexOf("?")+1,URIstring.length); 
	var rul=URIstring.substring(0,URIstring.indexOf("?")+1)+escape(paraString);//对参数的处理
	window.open(rul);
}

/**点击任意处关闭弹框
 * mask_opacity_click
 * @param e void
 * @author wangjialin
 * 2016-9-30 上午9:45:00
 */
function mask_opacity_click(e){
	$(e).next(".productSort_update").hide();
	$(e).fadeOut("fast");
}