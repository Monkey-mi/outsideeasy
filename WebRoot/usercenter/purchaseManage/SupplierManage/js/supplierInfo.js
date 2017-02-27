var record_id=getParamFromWindowName("record_id");
var supplier_id=getParamFromWindowName("supplier_id");
var supplier_cpyname=getParamFromWindowName("supplier_cpyname");
var companyId=getParamFromWindowName("companyIdForAll");
var companyIdForSupplier=getParamFromWindowName("companyIdForSupplier");
var category_delIds=[];//储存要删除的供应品类ID
var category_addIds=[];//储存要增加的供应品类ID
var category_choosed_list;//选择的供应品类
var h_id;
var currencys={};
var province={};
var city={};
var county={};
var map;
var lngForAll;//公司经度
var latForAll;//公司纬度
var addFileInfos = new Array();
var delFileInfos = new Array();
var phone_reg= /^((\+?86)|(\(\+86\)))?\d{3,4}-\d{7,8}(-\d{3,4})?$/;
var mphone_reg=/^1[3|4|5|8]\d{9}$/;
var email_reg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
var num_reg=/^(\d+(\.\d+)?)?$/;//数字正则
var int_reg=/^\d*$/;//整数正则
var bankcard_reg = /^(\d{16}|\d{19})$/;//银行卡号16位或者19位正则
var company_province_city_distinct_flag = false;//地址选择
var otherEmployArray = new Array();
var employStructArray = new Array();
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
		//企业类型
		companyNatures=CompanyNaturesUtil;
		$.each(companyNatures,function(index,c){
			var option="<li value='"+c.nature_id+"' onclick='selectOption(this)'>"+c.nature_name+"</li>";
			$(".companyTypeList").append(option);
		});
		//所属行业
		companyClasses=CompanyClassesUtil;
		$.each(companyClasses,function(index,c){
			var option="<li value='"+c.class_id+"' onclick='selectOption(this)'>"+c.class_name+"</li>";
			$(".industryList").append(option);
		});
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
		$("#infoSave,#infoCancel").hide();
		$("#infoEdit").show();
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
			var cChecked=pCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox:checked").length;
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
			var cChecked=pCheckbox.parent().nextAll("ul").children().children("span").find("input:checkbox:checked").length;
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
		var item='<div class="ml20 mt10">'; 
		item+='<div class="t_algin_r"><button class="infoEdit" onclick="showEdit(this)">编辑</button><button class="infoEdit hide" onclick="editCancel(this,1)">取消</button>'
			+'<button class="infoSave ml10 hide" onclick="editSave(this,1)">保存</button></div>';
		for(i=0;i<result.data.length;i++){
			for(j=0;j<result.data.length;j++){
				if(result.data[j].order_by==i+1){
					if(result.data[j].elements.length>0){
						var related_basis=result.data[j].elements[0].related_basis;
					}
					if(result.data[j].templet_name=="主要原材料及品牌"){
						item+='<div class="display_inner_line_wrap clearfix item">'
									+'<span class="label_wrap">'+result.data[j].templet_name+'<span class="asterisk">*</span></span>'
									+'<div id="mateial" class="listShow ">'
									+'</div>'
									+'<div class="info_explain ml130 f_l"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">材料名称、品牌名称不可为空</div>'
								+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="主要销售产品及品牌"){
						item+='<div class="display_inner_line_wrap mt40 clearfix item">'
									+'<span class="label_wrap">'+result.data[j].templet_name+'<span class="asterisk">*</span></span>'
									+'<div id="goods" class="listShow ">'
									+'</div>'
									+'<div class="info_explain ml130 f_l"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">产品名称、品牌名称不可为空</div>'
								+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="主要客户"){
						item+='<div class="display_inner_line_wrap clearfix item">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'<div id="customer" class="listShow">'
						+'</div>'
						+'<div class="info_explain ml130 f_l"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入主要客户</div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="主要竞争对手"){
						item+='<div class="display_inner_line_wrap clearfix item">'
									+'<span class="label_wrap">'+result.data[j].templet_name+'<span class="asterisk">*</span></span>'
									+'<div id="competitor" class="listShow ">'
									+'</div>'
									+'<div class="info_explain ml130 f_l"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">主要竞争对手不可为空</div>'
								+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="厂容厂貌"){
						item+='<div class="display_inner_line_wrap mt40">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'</div>'
						+'<div id="company_equipment_imgs" class="buslicense_wrap mt10 clearfix ">'
							+'<div class="img_wrap_1 uploadPic">'
								+'<div class="img_block_pic posR"><img src="/vip/resources/images/applyAccess/imgBg.png"/>'
								+'<input id="company_fact_pic" type="file" name="file" class="uploadInputWrap" onChange="addImg(this,24)"></div>'
								+'<div class="img_block_text"><span >图片大小不超过5M</span></div>'
							+'</div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="企业简介"){
						item+='<div class="display_inner_line_wrap mt20">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'<div id="'+related_basis+'"class="listShow item">'
						+'</div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="联系地址"){
					item+='<div class="display_inner_line_wrap item " id="address">'
								+'<div class="clearfix">'
									+'<span class="label_wrap">'+result.data[j].templet_name+'<span class="asterisk">*</span></span>'
									+'<span id="'+related_basis+'" class="display_wrap"></span>'
									+'<div class="f_l addrSelect1 ml20 posR hide"><span id="province" class="provinceSelect" onclick="showSelect(this)"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5"></span><ul class="hide province"></ul></div>'
									+'<div class="f_l addrSelect2 posR hide"><span id="city" class="citySelect"  onclick="showSelect(this)"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5"></span><ul class="hide city"></ul></div>'
									+'<div class="f_l addrSelect1 posR hide"><span id="county" class="countySelect"  onclick="showSelect(this)"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5"></span><ul class="hide county"></ul></div>'
								+'</div>'
								+'<div class="detailAddr hide posR"><input class="detailAddrWrap ml20 input_must" value="" id="contactAddr"><input type="hidden" id="contactAddrPro"><img src="/vip/resources/images/applyAccess/pinGrey.png" class="posA" style="left:300px;top:10px;"><a class="ml10 bluecolor" onclick="theLocation()">定位到地图</a></div>'
								+'<div class="info_explain ml130"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">联系地址不可为空</div>'
							+'</div>'
							+'<div class="mask" style="z-index:55;display:none;"></div>'
							+'<input type="hidden" id="lng"/>'+'<input type="hidden" id="lng_info_id"/>'
							+'<input type="hidden" id="lat"/>'+'<input type="hidden" id="lat_info_id"/>'
							+'<div style="position:fixed;left:35%;top:20%;z-index:60;">'
								+'<div id="allmap" class="map_wrap"></div>'
								+'<a id="remove_overlay" href="javascript:void(0)"  onclick="remove_overlay()" >取消定位</a>'
								+'<a href="javascript:void(0)" id="close_map" title="关闭窗口" class="close_btn" onClick="close_map(this)">X</a>'
								+'<div id="r-result" style="display:none;" >定位搜索:'
									+'<input type="text" id="suggestId" size="20" value=""  />'
								+'</div>'
								+'<div id="searchResultPanel"></div>'
							+'</div>';
						break;
					}else if(result.data[j].templet_name=='企业简称'){
						item+='<div class="display_inner_line_wrap item">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'<span class="asterisk">*</span></span>'
							+'<span id="'+related_basis+'" class="display_wrap"></span>'
							+'<input class="editWrap hide ml20 input_must" value="">'
							+'<span class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">企业简称不可为空</span>'
							+'</div>';
							break;
					}else if(result.data[j].templet_name=='联系电话'){
						item+='<div class="display_inner_line_wrap item">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'<span class="asterisk">*</span></span>'
							+'<span id="'+related_basis+'" class="display_wrap"></span>'
							+'<input id="f_phone_edit" class="editWrap hide ml20 input_must" value="">'
							+'<span class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">联系电话不可为空</span>'
							+'</div>';
							break;
					}else if(result.data[j].templet_name=='联系人手机'){
						item+='<div class="display_inner_line_wrap item">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="display_wrap"></span>'
							+'<input id="m_phone_edit" class="editWrap hide ml20" value="">'
							+'<span class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的手机号码</span>'
							+'</div>';
							break;
					}else if(result.data[j].templet_name=='Email'){
						item+='<div class="display_inner_line_wrap item">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="display_wrap"></span>'
							+'<input id="email_edit" class="editWrap hide ml20">'
							+'<span class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的邮箱</span>'
							+'</div>';
							break;
					}else{
						item+='<div class="display_inner_line_wrap">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'<span id="'+related_basis+'" class="display_wrap"></span>'
						+'<input class="editWrap hide ml20" value="">'
						+'</div>';
						break;
					}
				}
			}
		}
		$("#detail_info").html(item);
		getAccessApplicationInfo(2);
		saleShow();//主要销售产品及品牌
		materialShow();//主要原材料及品牌
		customerShow();//主要用户展示
		competitorShow();//主要竞争对手展示
		showMorePic1(24);//24 为厂容厂貌  showMorePic:显示多张图片的方法
		//加载省
		province=ChineseDistricts[86];
		$.each(province,function(code,address){
			var option="<li value='"+code+"' onclick='addressSelect(this,1)' >"+address+"</li>";
			$(".province").append(option);
		});
		onBlurTest();
		//加载百度地图API
		remarkMap();
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
		item+='<div class="t_algin_r mt10"><button class="infoEdit" onclick="showEdit(this)">编辑</button><button class="infoEdit hide" onclick="editCancel(this,2)">取消</button>'
			+'<button class="infoSave ml10 hide" onclick="editSave(this,2)">保存</button></div>';
		for(i=0;i<result.data.length;i++){
			for(j=0;j<result.data.length;j++){
				if(result.data[j].order_by==i+1){
					if(result.data[j].elements.length>0){
						var related_basis=result.data[j].elements[0].related_basis;
					}
					if(result.data[j].templet_name=="员工人数"){
						item+='<div class="ml20">'
						+'<div class="display_inner_line_wrap item">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'<span id="'+related_basis+'" class="label_wrap"><span class="display_wrap"></span><input type="text" class="editWrap hide mr5 people_num" />人</span>'
						+'<span class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的员工人数</span>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="其他人员"){
						item+='<div id="otherperson" class="display_inner_line_wrap item">'
							+'<div class="clearfix">'
								+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
								+'<div id="other_person_con" class="f_l"></div>'
							+'</div>'
							+'<div class="info_explain ml110"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入数字</div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="人员结构"){
						item+='<div id="persontype" class="display_inner_line_wrap item">'
								+'<div class="clearfix">'
									+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
									+'<div id="person_type_con" class="f_l"></div>'
								+'</div>'
								+'<div class="info_explain ml110"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入数字</div>'
							+'</div>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="质量控制"){
						item+='<div class="ml20 mt20">'
						+'<div class="display_inner_line_wrap">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'<span id="'+related_basis+'" class="display_wrap"></span>'
						+'<div class="radioWrap">'
							+'<span><input type="radio" name="qualityControl" value="0">无</span>'
							+'<span><input type="radio" name="qualityControl" value="1">内部</span>'
							+'<span><input type="radio" name="qualityControl" value="2">第三方</span>'
						+'</div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="OEM代加工"){
						item+='<div class="display_inner_line_wrap" >'
						+'<span class="label_wrap" >'+result.data[j].templet_name+'</span>'
						+'<span id="'+related_basis+'" class="display_wrap"></span>'
						+'<div class="radioWrap">'
							+'<span><input type="radio" name="oem" value="0">提供</span>'
							+'<span><input type="radio" name="oem" value="1">不提供</span>'
						+'</div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="管理体系认证"){
						item+='<div class="display_inner_line_wrap">'
						+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
						+'<span id="'+related_basis+'" class="display_wrap "></span>'
						+'<div class="radioWrap">'
							+'<span><input type="radio" name="certification" value="0">无</span>'
							+'<span><input type="radio" name="certification" value="1">ISO9000</span>'
							+'<span><input type="radio" name="certification" value="2">ISO14000</span>'
							+'<span><input type="radio" name="certification" value="3">其他认证</span>'
							+'<input type="text" class="otherCertification hide">'
						+'</div>'
						+'</div>'
						+'<div class="buslicense_wrap ml20 mt10 clearfix">'
						+'<div class="img_wrap_1 ml90">'
							+'<div class="img_block_pic">'
								+'<img id="management_system" src="/newresources/images/uploadImg.png">'
								+'<div class="posA hide img_operate"><a onclick="delImgForSingle(this)">删除</a></div>'
							+'</div>'
						+'</div>'
						+'<div class="img_wrap_1 uploadCertification ml90">'
							+'<div class="img_block_pic posR"><img src="/vip/resources/images/applyAccess/imgBg.png"/>'
							//*+'<input type="file" class="uploadInputWrap"></div>'
							+'<input id="certi" type="file" name="file" class="uploadInputWrap" onChange="addImg(this,25)"></div>'
							+'<div class="img_block_text"><span >图片大小不超过5M</span></div>'
						+'</div>'
						+'</div>'
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="年营业额"){
						item+='<div class="ml20">'
								+'<div class="display_inner_line_wrap item"  >'
									+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
									+'<span id="'+related_basis+'" class="label_wrap "></span>'
									+'<span class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的金额</span>'
								+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="年出口额"){
						item+='<div class="display_inner_line_wrap item"  >'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="label_wrap "></span>'
							+'<span class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的金额</span>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="年进口额"){
						item+='<div class="display_inner_line_wrap item"  >'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="label_wrap "></span>'
							+'<span class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的金额</span>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="企业面积"){
						item+='<div class="display_inner_line_wrap mt20 item" >'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="label_wrap "><span class="display_wrap"></span><input type="text" class="editWrap hide mr5 size_test" />平方米</span>'
							+'<span class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的面积</span>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="厂房面积"){
						item+='<div class="display_inner_line_wrap item" >'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="label_wrap "><span class="display_wrap"></span><input type="text" class="editWrap hide mr5 size_test" />平方米</span>'
							+'<span class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的面积</span>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="使用年限"){
						item+='<div class="display_inner_line_wrap" >'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="useTime" class="display_wrap "></span>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="产权"){
						item+='<div class="display_inner_line_wrap">'
							+'<span class="label_wrap">'+result.data[j].templet_name+'</span>'
							+'<span id="'+related_basis+'" class="display_wrap "></span>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="设备清单"){
						item+='<div class=" mt30 clearfix item"><span class="deviceTitle">设备清单<span class="asterisk">*</span></span>'
								+'<table id="devicelist" class="supplierInfo_table_list item" style="width:680px;">'
								+'<tr>'
									+'<th class="con1">设备名称<span class="asterisk">*</span></th>'
									+'<th class="con2">规格</th>'
									+'<th class="con3">产地</th>'
									+'<th class="con1">价值(万元)</th>'
									+'<th class="con1">购买日期</th>'
									+'<th class="con3">数量<span class="asterisk">*</span></th>'
									+'<th class="con2">先进性</th>'
								+'</tr>'
								+'</table>'
								+'<div class="info_explain ml110 f_l"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空</div>'
							+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="院校合作"){
						item+='<div class="display_inner_line_wrap  mt20">'
						+'<div class="clearfix"><p class="cooperateTitle">'+result.data[j].templet_name+'</p>'
						+'<p id="'+related_basis+'" class="f_l schoolCoop"></p>'
						+'<textarea class="introductionWrap hide"  onkeyup="checkLen(this)"></textarea><div class="wordsCount mr10">总共可输入<b>400</b>字，剩余<b class="residue">400</b>字</div>'
						+'</div>'
						+'<div class="clearfix"><p class="cooperateTitle">附件资料</p><div id="annex_text" class="mr20 enclosure f_l">'
						+'<div class="uploadClosureWrap"><div class="posR" style="display:inline-block;"><button class="uploadEnclosure">上传文件</button>'
						//+'<input class="uploadEnclosureInput posA" type="file"></div>'
						+'<input id="school_attached" type="file" name="file" class="uploadEnclosureInput posA" onChange="addText(this,30)"></div>'
						+'<span class="c999 ml10">请选择5M以下.doc/.docx;.ppt/.pptx/.pps;.xls/.xlsx;.pdf;.txt文件</span></div>'
						+'</div>'	
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="专利"){
						item+='<div>'
						+'<p class="mt20">'+result.data[j].templet_name+'</p>'
						+'<div id="patent_imgs" class="buslicense_wrap mr10 mt20 clearfix">'
							+'<div class="img_wrap_1 uploadPic">'
								+'<div class="img_block_pic posR"><img src="/vip/resources/images/applyAccess/imgBg.png"/>'
								//+'<input type="file" class="uploadInputWrap"></div>'
								+'<input id="patent_pic" type="file" name="file" class="uploadInputWrap" onChange="addImg(this,26)"></div>'
								+'<div class="img_block_text"><span >图片大小不超过5M</span></div>'
							+'</div>'
						+'</div>'	
						+'</div>';
						break;
					}
					else if(result.data[j].templet_name=="其他资质"){
						item+='<div>'	
						+'<p class="mt20">'+result.data[j].templet_name+'</p>'
						+'<div id="other_intelligence_imgs" class="buslicense_wrap mr10 mt20 clearfix">'
							+'<div class="img_wrap_1 uploadPic">'
								+'<div class="img_block_pic posR"><img src="/vip/resources/images/applyAccess/imgBg.png"/>'
								//+'<input type="file" class="uploadInputWrap"></div>'
								+'<input id="other_pic" type="file" name="file" class="uploadInputWrap" onChange="addImg(this,27)"></div>'
								+'<div class="img_block_text"><span >图片大小不超过5M</span></div>'
							+'</div>'
						+'</div>'
						+'</div>';
						break;
					}
				}
			}
		}
		$("#scalepower_info").html(item);
		getAccessApplicationInfo(3);
		deviceShow();//设备展示
		picPathSrc1(25,"#management_system");//质量体系认证
		showMorePic1(26);//专利图片展示
		showMorePic1(27);//其他资质图片展示
		showText1(30);
		onBlurTest();
	};
	asyncAjaxMethod(url,params,true,fn);
}

//classify_id
//2:详细信息
//3:规模能力
//获取准入资料信息
function getAccessApplicationInfo(classify_id){
	var url="AccessApplicationCtrl/getAccessApplicationInfo.do";
	var params={};
	params.supplier_id=supplier_id;
	params.classify_id=classify_id;
	var k=0,j=0;
	var fn = function(result){
		for(var i=0;i<result.data.length;i++){
				if(classify_id==2){
					if (result.data[i].related_basis == "reg_addr_code") {
						var reg_addr_code=result.data[i].content;
						var reg_addr_code_info_id=result.data[i].info_id;
					}else if(result.data[i].related_basis == "contact_addr"){
						var contact_addr=result.data[i].content;
						var contact_addr_info_id=result.data[i].info_id;
					}else if(result.data[i].related_basis == "companyIntroduction"){
						var str="<div class='introduction'>"+replaceNullAsStr(result.data[i].content)+"</div><textarea class='introductionWrap hide' onkeyup='checkLen(this)'></textarea><div class='wordsCount'>总共可输入<b>400</b>字，剩余<b class='residue'>400</b>字</div><input type='hidden' value="+ result.data[i].info_id +">";
						$("#companyIntroduction").html(str);
					}else if(result.data[i].related_basis == "lng"){
						var lngCon=result.data[i].content;
						var lngCon_info_id=result.data[i].info_id;
					}else if(result.data[i].related_basis == "lat"){
						var latCon=result.data[i].content;
						var latCon_info_id=result.data[i].info_id;
					}else{
						$("#" + result.data[i].related_basis + "").html(replaceNullAsStr(result.data[i].content) + "<input type='hidden' value="+ result.data[i].info_id +">");
					}
				}
				else if(classify_id==3){
					if (result.data[i].related_basis == "emplyees") {
						$("#" + result.data[i].related_basis + "").find("span").html(replaceZeroAndNullAsStr(result.data[i].content) + "<input type='hidden' value="+ result.data[i].info_id +">");
					}
					else if (result.data[i].related_basis == "college_num") {
						var collegeNum = result.data[i].content;
						var collegeNumInfoId = result.data[i].info_id;
						if(collegeNum!=0 && collegeNum!=null)
							j++;
					}
					else if (result.data[i].related_basis == "diploma_num") {
						var diplomaNum = result.data[i].content;
						var diplomaNumInfoId = result.data[i].info_id;
					}
					else if (result.data[i].related_basis == "diploma_down_num") {
						var diplomaDownNum = result.data[i].content;
						var diplomaDownNumInfoId = result.data[i].info_id;
						if(diplomaDownNum!=0 && diplomaDownNum!=null)
							j++;
					}
					else if (result.data[i].related_basis == "tech_num") {
						var techNum = result.data[i].content;
						var techNumInfoId = result.data[i].info_id;
						if(techNum!=0 && techNum!=null)
							k++;
					}
					else if (result.data[i].related_basis == "qc_num") {
						var qcNum = result.data[i].content;
						var qcNumInfoId = result.data[i].info_id;
						if(qcNum!=0 && qcNum!=null)
							k++;
					}
					else if (result.data[i].related_basis == "internal_auditor_num") {
						var internalAuditorNum = result.data[i].content;
						var internalAuditorNumInfoId = result.data[i].info_id;
						if(internalAuditorNum!=0 && internalAuditorNum!=null)
							k++;
					}
					else if (result.data[i].related_basis == "staff_num") {
						var staffNum = result.data[i].content;
						var staffNumInfoId = result.data[i].info_id;
						if(staffNum!=0 && staffNum!=null)
							k++;
					}
					else if (result.data[i].related_basis == "op_num") {
						var opNum = result.data[i].content;
						var opNumInfoId = result.data[i].info_id;
						if(opNum!=0 && opNum!=null)
							k++;
					}
					else if (result.data[i].related_basis == "quality_control") {
						var str="";
						switch (result.data[i].content) {
							case "0" :
								str="无";
								break;
							case "1" :
								str="内部";
								break;
							case "2" :
								str="第三方";
								break;
							default :
								break;
						}
						$("#"+result.data[i].related_basis+"").html(str + "<input type='hidden' value="+ result.data[i].info_id +">");
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
						$("#"+result.data[i].related_basis+"").html(str + "<input type='hidden' value="+ result.data[i].info_id +">");
					}
					// 质量管理体系
					else if (result.data[i].related_basis == "certification_system") {
						$("#"+result.data[i].related_basis+"").html(replaceNullAsStr(result.data[i].content) + "<input type='hidden' value="+ result.data[i].info_id +">");
					}
					else if(result.data[i].related_basis == "turnover"){
						var turnover = result.data[i].content;
						var turnoverInfoId = result.data[i].info_id;
					}
					else if(result.data[i].related_basis == "turnover_currency_id"){
						var turnover_currency_id = result.data[i].content;
						var turnover_currency_id_infoId = result.data[i].info_id;
					}
					else if(result.data[i].related_basis == "exportNum"){
						var exportNum = result.data[i].content;
						var exportNum_infoId = result.data[i].info_id;
					}
					else if(result.data[i].related_basis == "export_currency_id"){
						var export_currency_id = result.data[i].content;
						var export_currency_id_infoId = result.data[i].info_id;
					}
					else if(result.data[i].related_basis == "importNum"){
						var importNum = result.data[i].content;
						var importNum_infoId = result.data[i].info_id;
					}
					else if(result.data[i].related_basis == "import_currency_id"){
						var import_currency_id = result.data[i].content;
						var import_currency_id_infoId = result.data[i].info_id;
					}
					else if(result.data[i].related_basis == "use_begintime"){
						var use_begintime = result.data[i].content;
						var begintime_infoid = result.data[i].info_id;
					}
					else if(result.data[i].related_basis == "use_endtime"){
						var use_endtime = result.data[i].content;
						var endtime_infoid = result.data[i].info_id;
					}
					else if(result.data[i].related_basis == "companyArea"){
						$("#" + result.data[i].related_basis + "").find("span").html(replaceZeroAndNullAsStr(result.data[i].content) + "<input type='hidden' value="+ result.data[i].info_id +">");
					}
					else if(result.data[i].related_basis == "factoryArea"){
						$("#" + result.data[i].related_basis + "").find("span").html(replaceZeroAndNullAsStr(result.data[i].content) + "<input type='hidden' value="+ result.data[i].info_id +">");       
					}
					else if(result.data[i].related_basis == "factory_owner"){
						var str="";
						var content='';
						switch (result.data[i].content) {
							case "0" :
								str="无";
								break;
							case "2" :
								str="租赁";
								content='<div class="posR f_l factoryOwnerSelect hide" >'
									+'<div class="clearfix left" onclick="showSelect(this)">租赁<input type="hidden" value="2"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
									+'<ul class="factoryOwnerList posA hide">'
										+'<li value="1" onclick="selectOption(this)">自有</li>'
										+'<li value="2" onclick="selectOption(this)">租赁</li>'
									+'</ul>'
								+'</div>';
								break;
							case "1" :
								str="自有";
								content='<div class="posR f_l factoryOwnerSelect hide" >'
									+'<div class="clearfix left" onclick="showSelect(this)">自有<input type="hidden" value="1"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
									+'<ul class="factoryOwnerList posA hide">'
										+'<li value="1" onclick="selectOption(this)">自有</li>'
										+'<li value="2" onclick="selectOption(this)">租赁</li>'
									+'</ul>'
								+'</div>';
								break;
							default :
								content='<div class="posR f_l factoryOwnerSelect hide" >'
									+'<div class="clearfix left" onclick="showSelect(this)">请选择<input type="hidden" value=""><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
									+'<ul class="factoryOwnerList posA hide">'
										+'<li value="1" onclick="selectOption(this)">自有</li>'
										+'<li value="2" onclick="selectOption(this)">租赁</li>'
									+'</ul>'
								+'</div>';
								break;
						}
						$("#"+result.data[i].related_basis+"").html(str + "<input type='hidden' value="+ result.data[i].info_id +">");
						$("#"+result.data[i].related_basis+"").after(content);
					} 
					else if(result.data[i].related_basis == "schoolCoop"){
						$("#"+result.data[i].related_basis+"").html(replaceNullAsStr(result.data[i].content) + "<input type='hidden' value="+ result.data[i].info_id +">");
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
				showCity(provinceNum);
				showCounty(cityNum);
				$("#city,#county").parent().hide();
			}
			var item5=province+city+country+contact_addr+"<input type='hidden' value="+ contact_addr_info_id +">";
			$("#contact_addr").html(item5);
			var pro=province+'<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5"><input type="hidden" value='+provinceNum+'>';
			var c1=city+'<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5"><input type="hidden" value='+cityNum+'>';
			var c2=country+'<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5"><input type="hidden" value='+countryNum+'>'+'<input type="hidden" value='+ reg_addr_code_info_id +'>';
			$("#province").html(pro);
			$("#city").html(c1);
			$("#county").html(c2);
			$("#contactAddr").val(contact_addr);
			$("#contactAddrPro").val(contact_addr);
			$("#lng").val(lngCon);
			$("#lat").val(latCon);
			$("#lng_info_id").val(lngCon_info_id);
			$("#lat_info_id").val(latCon_info_id);
			lngForAll = lngCon;
			latForAll = latCon;
			var txt=$("#companyIntroduction .introduction").text();
			if(txt!=''){
				var len=txt.length;
				$("#companyIntroduction").find(".residue").text(400-len);
			}
		}
		else if(classify_id==3){
			otherEmployArray[1]=techNumInfoId;
			otherEmployArray[2]=opNumInfoId;
			otherEmployArray[3]=qcNumInfoId;
			otherEmployArray[4]=staffNumInfoId;
			otherEmployArray[5]=internalAuditorNumInfoId;
			employStructArray[1]=collegeNumInfoId;
			employStructArray[2]=diplomaDownNumInfoId;
			var item="";
			if (techNum != 0 && techNum != null) {
				item+='<div  class="personCon clearfix part"><span class="display_wrap">科研人员</span>'
						+'<div class="posR f_l hide listWrap" >'
							+'<div class="clearfix left" onclick="showSelect(this)">科研人员<input type="hidden" value="1"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
							+'<ul class="otherPeopleList posA hide">'
							+'</ul>'
						+'</div>'
						+'<span>'+techNum+'</span><input type="text" autocomplete="off"  class="people_num hide">人'
						+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this)" class="minus ml10 hide">'
						+'</div>';
			}
			if (opNum != 0 && opNum != null) {
				item+='<div  class="personCon  clearfix part"><span class="display_wrap">操作人员</span>'
					+'<div class="posR f_l hide listWrap" >'
						+'<div class="clearfix left" onclick="showSelect(this)">操作人员<input type="hidden" value="2"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
						+'<ul class="otherPeopleList posA hide">'
						+'</ul>'
					+'</div>'
					+'<span>'+opNum+'</span><input type="text" autocomplete="off"  class="people_num hide">人'
					+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this)" class="minus ml10 hide">'
					+'</div>';
			}
			if (qcNum != 0 && qcNum != null) {
				item+='<div  class="personCon  clearfix part"><span class="display_wrap">专职检验</span>'
					+'<div class="posR f_l hide listWrap" >'
						+'<div class="clearfix left" onclick="showSelect(this)">专职检验<input type="hidden" value="3"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
						+'<ul class="otherPeopleList posA hide">'
						+'</ul>'
					+'</div>'
					+'<span>'+qcNum+'</span><input type="text" autocomplete="off"  class="people_num hide">人'
					+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this)" class="minus ml10 hide">'
					+'</div>';
			}
			if (staffNum != 0 && staffNum != null) {
				item+='<div  class="personCon  clearfix part"><span class="display_wrap">间接员工</span>'
					+'<div class="posR f_l hide listWrap" >'
						+'<div class="clearfix left" onclick="showSelect(this)">间接员工<input type="hidden" value="4"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
						+'<ul class="otherPeopleList posA hide">'
						+'</ul>'
					+'</div>'
					+'<span>'+staffNum+'</span><input type="text" autocomplete="off"  class="people_num hide" >人'
					+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this)" class="minus ml10 hide">'
					+'</div>';
			}
			if (internalAuditorNum != 0 && internalAuditorNum != null) {
				item+='<div  class="personCon clearfix part"><span class="display_wrap">内审人员</span>'
					+'<div class="posR f_l hide listWrap" >'
						+'<div class="clearfix left" onclick="showSelect(this)">内审人员<input type="hidden" value="5"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
						+'<ul class="otherPeopleList posA hide">'
						+'</ul>'
					+'</div>'
					+'<span>'+internalAuditorNum+'</span><input type="text" autocomplete="off"  class="people_num hide">人'
					+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this)" class="minus ml10 hide">'
					+'</div>';
			}
			if((techNum == 0 || techNum == null)&& (opNum == 0 || opNum == null)&& (qcNum == 0 || qcNum == null)&& (staffNum == 0 || staffNum == null)&& (internalAuditorNum == 0 || internalAuditorNum == null)){
				item+='<div  class="personCon  clearfix part"><span class="display_wrap"></span>'
					+'<div class="posR f_l hide listWrap" >'
						+'<div class="clearfix left" onclick="showSelect(this)">请选择<input type="hidden" value=""><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
						+'<ul class="otherPeopleList posA hide">'
						+'</ul>'
					+'</div>'
					+'<span></span><input type="text" autocomplete="off"  class="people_num hide">人'
					+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this)" class="minus ml10 hide">'
					+'</div>';
			}
			$("#other_person_con").append(item);
			var plus1='<img src="/vip/resources/images/applyAccess/plus.png" onclick="scalepowerAdd(this,1)" class="plus ml10 hide">';
			$("#other_person_con").children().eq(k-1).append(plus1);
			var ulList='<li value="1" onclick="selectOption(this)">研发人员</li>'
						+'<li value="2" onclick="selectOption(this)">操作工</li>'
						+'<li value="3" onclick="selectOption(this)">专职检验</li>'
						+'<li value="4" onclick="selectOption(this)">间接员工</li>'
						+'<li value="5" onclick="selectOption(this)">内审人员</li>';
			$(".otherPeopleList").append(ulList);
			var item1="";
			if (collegeNum != 0 && collegeNum != null) {
				item1+='<div  class="personCon  clearfix part"><span class="display_wrap">专科及以上</span>'
					+'<div class="posR f_l hide listWrap" >'
						+'<div class="clearfix left" onclick="showSelect(this)">专科及以上<input type="hidden" value="1"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
						+'<ul class="personStructureList posA hide">'
						+'</ul>'
					+'</div>'
					+'<span>'+collegeNum+'</span><input type="text" autocomplete="off"  class="people_num hide">人'
					+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this)" class="minus ml10 hide">'
					+'</div>';
			}
			if (diplomaDownNum != 0 && diplomaDownNum != null) {
				item1+='<div class="personCon  clearfix part"><span class="display_wrap">专科以下</span>'
					+'<div class="posR f_l hide listWrap" >'
						+'<div class="clearfix left" onclick="showSelect(this)">专科以下<input type="hidden" value="2"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
						+'<ul class="personStructureList posA hide">'
						+'</ul>'
					+'</div>'
					+'<span>'+diplomaDownNum+'</span><input type="text" autocomplete="off"  class="people_num hide" >人'
					+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this)" class="minus ml10 hide">'
					+'</div>';
			}
			if ((collegeNum == 0 || collegeNum == null)&&(diplomaDownNum == 0 || diplomaDownNum == null)){
				item1+='<div class="personCon  clearfix part"><span class="display_wrap"></span>'
					+'<div class="posR f_l hide listWrap" >'
						+'<div class="clearfix left" onclick="showSelect(this)">请选择<input type="hidden" value=""><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
						+'<ul class="personStructureList posA hide">'
						+'</ul>'
					+'</div>'
					+'<span></span><input type="text" autocomplete="off"  class="people_num hide">人'
					+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this)" class="minus ml10 hide">'
					+'</div>';
			}
			$("#person_type_con").append(item1);
			var plus2='<img src="/vip/resources/images/applyAccess/plus.png" onclick="scalepowerAdd(this,2)" class="plus ml10 hide">';
			$("#person_type_con").children().eq(j-1).append(plus2);
			var ulList2='<li value="1" onclick="selectOption(this)">专科及以上</li>'
						+'<li value="2" onclick="selectOption(this)">专科以下</li>';
			$(".personStructureList").append(ulList2);
			currencys=CurrencysUtil;
			var currency_name="";
			$.each(currencys,function(index,c){
				if(c.currency_id==turnover_currency_id){
					currency_name=c.currency_name;
				}
			});
			var temp_str='<div class="moneyCon clearfix part ">'
								+'<div class="posR f_l listWrap hide" >'
									+'<div class="clearfix left" onclick="showSelect(this)">请选择<input type="hidden" value=""><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
									+'<ul class="moneyTypeList posA hide">'
									+'</ul>'
								+'</div>'
								+'<input type="text" autocomplete="off"  class="money_num hide"><span>万元</span>'
							+'</div>';
			var turnover_str='';
			if(turnover!=0&&turnover!=null){
				var item2='<span id="turnoverNum" class="display_wrap">'+turnover+'万'+'<input type="hidden" value='+ turnoverInfoId +'>'+'</span><span id="turnoverCurrency" class="display_wrap">'+currency_name+'<input type="hidden" value='+ turnover_currency_id_infoId +'>'+'</span>';
				$("#turnover").html(item2);
				turnover_str='<div class="moneyCon clearfix part ">'
								+'<div class="posR f_l listWrap hide" >'
									+'<div class="clearfix left" onclick="showSelect(this)">'+currency_name+'<input type="hidden" value="'+turnover_currency_id+'"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
									+'<ul class="moneyTypeList posA hide">'
									+'</ul>'
								+'</div>'
								+'<input type="text" autocomplete="off"  class="money_num hide" value='+turnover+'><span class="hide">万元</span>'
							+'</div>';
			}else{
				turnover_str=temp_str;
			}
			$("#turnover").append(turnover_str);
			var currency_name1="";
			var export_str='';
			$.each(currencys,function(index,c){
				if(c.currency_id==export_currency_id){
					currency_name1=c.currency_name;
				}
			});
			if(exportNum!=0&&exportNum!=null){
				var item3='<span id="exportNum1" class="display_wrap">'+exportNum+'万'+'<input type="hidden" value='+ exportNum_infoId +'>'+'</span><span id="exportCurrency" class="display_wrap">'+currency_name1+'<input type="hidden" value='+ export_currency_id_infoId +'>'+'</span>';
				$("#exportNum").html(item3);
				export_str='<div class="moneyCon clearfix part ">'
							+'<div class="posR f_l listWrap hide" >'
								+'<div class="clearfix left" onclick="showSelect(this)">'+currency_name1+'<input type="hidden" value="'+export_currency_id+'"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
								+'<ul class="moneyTypeList posA hide">'
								+'</ul>'
							+'</div>'
							+'<input type="text" autocomplete="off"  class="money_num hide" value='+exportNum+'><span class="hide">万元</span>'
						+'</div>';
			}else{
				export_str=temp_str;
			}
			$("#exportNum").append(export_str);
			var currency_name2="";
			$.each(currencys,function(index,c){
				if(c.currency_id==import_currency_id){
					currency_name2=c.currency_name;
				}
			});
			var import_str='';
			if(importNum!=0&&importNum!=null){
				var item4='<span id="importNum1" class="display_wrap">'+importNum+'万'+'<input type="hidden" value='+ importNum_infoId +'>'+'</span><span id="importCurrency" class="display_wrap">'+currency_name2+'<input type="hidden" value='+ import_currency_id_infoId +'>'+'</span>';
				$("#importNum").html(item4);
				import_str='<div class="moneyCon clearfix part ">'
					+'<div class="posR f_l listWrap hide" >'
						+'<div class="clearfix left" onclick="showSelect(this)">'+currency_name2+'<input type="hidden" value="'+import_currency_id+'"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
						+'<ul class="moneyTypeList posA hide">'
						+'</ul>'
					+'</div>'
					+'<input type="text" autocomplete="off" class="money_num hide" value='+importNum+'><span class="hide">万元</span>'
				+'</div>';
			}else{
				import_str=temp_str;
			}
			$("#importNum").append(import_str);
			//币种
			currencys=CurrencysUtil;
			$.each(currencys,function(index,c){
				var option="<li value='"+c.currency_id+"' onclick='selectOption(this)'>"+c.currency_name+"</li>";
				$(".moneyTypeList").append(option);
			});
			$("#useTime").html("<span id='begintime'>"+replaceNullAsStr(use_begintime) + "<input type='hidden' value="+ begintime_infoid +">" + "</span>"
					+"~<span id='endtime'>"+replaceNullAsStr(use_endtime) + "<input type='hidden' value="+ endtime_infoid +">" + "</span>");
			var con='<span class="chooseYear hide"><input type="text" class="Wdate mt5" style="width:130px;height:28px;line-height:28px;" onclick="WdatePicker({readOnly:true})" value='+use_begintime+' ><span class="ml8 mr8 mt5">-</span><input type="text" class="Wdate mt5" style="width:130px;height:28px;line-height:28px;" onclick="WdatePicker({readOnly:true})"  value='+use_endtime+' ></span>';
			$("#useTime").parent().append(con);
			var txt=$("#schoolCoop").text();
			if(txt!=''){
				var len=txt.length;
				$("#schoolCoop").parent().find(".residue").text(400-len);
			}
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
					item+='<div class="part"><span class="ml70">'+goodsList[i].goods_name+'</span><input type="text" class="editWrapShort hide input_must" /><span class="ml30">'+goodsList[i].goods_brand+'</span><input type="text" class="editWrapShort hide input_must" /><img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,3)" class="minus ml10 hide"><input type="hidden" value='+goodsList[i].goods_id+'></div>';
				}
				item+='<div class="part"><span class="ml70">'+goodsList[goodsList.length-1].goods_name+'</span><input type="text" class="editWrapShort hide input_must" /><span class="ml30">'+goodsList[goodsList.length-1].goods_brand+'</span><input type="text" class="editWrapShort hide input_must" /><img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,3)" class="minus ml10 hide"><img src="/vip/resources/images/applyAccess/plus.png" onclick="add(this,3)" class="plus ml10 hide"><input type="hidden" value='+goodsList[i].goods_id+'></div>';
			}else{
				item+='<div class="part"><span class="ml70">'+goodsList[0].goods_name+'</span><input type="text" class="editWrapShort hide input_must" /><span class="ml30">'+goodsList[0].goods_brand+'</span><input type="text" class="editWrapShort hide input_must" /><img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,3)" class="minus ml10 hide"><img src="/vip/resources/images/applyAccess/plus.png" onclick="add(this,3)" class="plus ml10 hide"><input type="hidden" value='+goodsList[0].goods_id+'></div>';
			}
		}else{
			item+='<div class="part"><span class="ml70"></span><input type="text" class="editWrapShort hide input_must" /><span class="ml30"></span><input type="text" class="editWrapShort hide input_must" /><img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,3)" class="minus ml10 hide"><img src="/vip/resources/images/applyAccess/plus.png" onclick="add(this,3)" class="plus ml10 hide"><input type="hidden" value=""></div>';
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
					item+='<div class="part"><span class="ml70">'+metarialList[i].material_name+'</span><input type="text" class="editWrapShort hide input_must" /><span class="ml30">'+metarialList[i].material_brand+'</span><input type="text" class="editWrapShort hide input_must" /><img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,4)" class="minus ml10 hide"><input type="hidden" value='+metarialList[i].material_id+'></div>';
				}
				item+='<div class="part"><span class="ml70">'+metarialList[metarialList.length-1].material_name+'</span><input type="text" class="editWrapShort hide input_must" /><span class="ml30">'+metarialList[metarialList.length-1].material_brand+'</span><input type="text" class="editWrapShort hide input_must" /><img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,4)" class="minus ml10 hide"><img src="/vip/resources/images/applyAccess/plus.png" onclick="add(this,4)" class="plus ml10 hide"><input type="hidden" value='+metarialList[i].material_id+'></div>';
			}else{
				item+='<div class="part"><span class="ml70">'+metarialList[0].material_name+'</span><input type="text" class="editWrapShort hide input_must" /><span class="ml30">'+metarialList[0].material_brand+'</span><input type="text" class="editWrapShort hide input_must" /><img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,4)" class="minus ml10 hide"><img src="/vip/resources/images/applyAccess/plus.png" onclick="add(this,4)" class="plus ml10 hide"><input type="hidden" value='+metarialList[0].material_id+'></div>';
			}
		}else{
			item+='<div class="part"><span class="ml70"></span><input type="text" class="editWrapShort hide input_must" /><span class="ml30"></span><input type="text" class="editWrapShort hide input_must" /><img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,4)" class="minus ml10 hide"><img src="/vip/resources/images/applyAccess/plus.png" onclick="add(this,4)" class="plus ml10 hide"><input type="hidden" value=""></div>';
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
					item+='<div class="part"><span class="ml70">'+customerList[i].customer_name+'</span><input type="text" class="editWrapShort hide" /><img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,6)" class="minus ml10 hide"><input type="hidden" value='+customerList[i].customer_id+'></div>';
				}
				item+='<div class="part"><span class="ml70">'+customerList[customerList.length-1].customer_name+'</span><input type="text" class="editWrapShort hide" /><img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,6)" class="minus ml10 hide"><img src="/vip/resources/images/applyAccess/plus.png" onclick="add(this,6)" class="plus ml10 hide"><input type="hidden" value='+customerList[i].customer_id+'></div>';
			}else{
				item+='<div class="part"><span class="ml70">'+customerList[0].customer_name+'</span><input type="text" class="editWrapShort hide" /><img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,6)" class="minus ml10 hide"><img src="/vip/resources/images/applyAccess/plus.png" onclick="add(this,6)" class="plus ml10 hide"><input type="hidden" value='+customerList[0].customer_id+'></div>';
			}
		}else{
			item+='<div class="part"><span class="ml70"></span><input type="text" class="editWrapShort hide" /><img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,6)" class="minus ml10 hide"><img src="/vip/resources/images/applyAccess/plus.png" onclick="add(this,6)" class="plus ml10 hide"><input type="hidden" value=""></div>';
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
					item+='<div class="part"><span class="ml70">'+competitorList[i].competitor_name+'</span><input type="text" class="editWrapShort hide input_must" /><img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,5)" class="minus ml10 hide"><input type="hidden" value='+competitorList[i].competitor_id+'></div>';
				}
				item+='<div class="part"><span class="ml70">'+competitorList[competitorList.length-1].competitor_name+'</span><input type="text" class="editWrapShort hide input_must" /><img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,5)" class="minus ml10 hide"><img src="/vip/resources/images/applyAccess/plus.png" onclick="add(this,5)" class="plus ml10 hide"><input type="hidden" value='+competitorList[i].competitor_id+'></div>';
			}else{
				item+='<div class="part"><span class="ml70">'+competitorList[0].competitor_name+'</span><input type="text" class="editWrapShort hide input_must" /><img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,5)" class="minus ml10 hide"><img src="/vip/resources/images/applyAccess/plus.png" onclick="add(this,5)" class="plus ml10 hide"><input type="hidden" value='+competitorList[0].competitor_id+'></div>';
			}
		}else{
			item+='<div><input type="text" class="editWrapShort hide input_must" /></div>';
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
			for(var i=0;i<deviceList.length-1;i++){
				var buy_day;
				if(deviceList[i].buy_day!=null){
					buy_day=deviceList[i].buy_day.substring(0,deviceList[i].buy_day.lastIndexOf(" "));
				}else{
					buy_day="";
				}
				item+='<tr class="part">'
						+'<td><span>'+deviceList[i].device_name+'</span><input type="text" class="con_1 hide machineName input_must" value='+deviceList[i].device_name+'></td>'
						+'<td><span>'+deviceList[i].specifications+'</span><input type="text" class="con_2 hide" value='+deviceList[i].specifications+'></td>'
						+'<td><span>'+deviceList[i].place+'</span><input type="text" class="con_3 hide" value='+deviceList[i].place+'></td>'
						+'<td><span>'+replaceNullAsStr(deviceList[i].price)+'</span><input type="text" class="con_1 hide machinePrice" value='+replaceNullAsStr(deviceList[i].price)+'></td>'
						+'<td><span>'+buy_day+'</span><input type="text" class="con_1 hide Wdate" onclick="WdatePicker({readOnly:true})"  value='+buy_day+' ></td>'
						+'<td><span>'+deviceList[i].device_num+'</span><input type="text" class="con_3 hide machineAmount input_must" value='+deviceList[i].device_num+'></td>'
						+'<td><span>'+deviceList[i].advanced+'</span><input type="text" class="con_2 hide" value='+deviceList[i].advanced+'></td>'
						+'<td class="hide td_operate">'
							+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,7)" class="minus ml15">'
						+'</td>'
					+'</tr>';
			}
			var j=result.data.length-1;
			var buy_day;
			if(deviceList[j].buy_day!=null){
				buy_day=deviceList[j].buy_day.substring(0,deviceList[j].buy_day.lastIndexOf(" "));
			}else{
				buy_day="";
			}
			item+='<tr class="part">'
				+'<td><span>'+deviceList[j].device_name+'</span><input type="text" class="con_1 hide machineName input_must" value='+deviceList[i].device_name+'></td>'
				+'<td><span>'+deviceList[j].specifications+'</span><input type="text" class="con_2 hide" value='+deviceList[i].specifications+'></td>'
				+'<td><span>'+deviceList[j].place+'</span><input type="text" class="con_3 hide" value='+deviceList[i].place+'></td>'
				+'<td><span>'+replaceNullAsStr(deviceList[j].price)+'</span><input type="text" class="con_1 hide machinePrice" value='+replaceNullAsStr(deviceList[i].price)+'></td>'
				+'<td><span>'+buy_day+'</span><input type="text" class="con_1 hide Wdate" onclick="WdatePicker({readOnly:true})" value='+buy_day+' ></td>'
				+'<td><span>'+deviceList[j].device_num+'</span><input type="text" class="con_3 hide machineAmount input_must" value='+deviceList[i].device_num+'></td>'
				+'<td><span>'+deviceList[j].advanced+'</span><input type="text" class="con_2 hide" value='+deviceList[i].advanced+'></td>'
				+'<td class="hide td_operate">'
					+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,7)" class="minus ml15">'
					+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml10 plus" onclick="addMachineList(this)">'
				+'</td>'
			+'</tr>';
		}else{
			item+='<tr class="part">'
				+'<td><span></span><input type="text" class="con_1 hide machineName input_must" value=""></td>'
				+'<td><span></span><input type="text" class="con_2 hide" value=""></td>'
				+'<td><span></span><input type="text" class="con_3 hide" value=""></td>'
				+'<td><span></span><input type="text" class="con_1 hide machinePrice" value=""></td>'
				+'<td><span></span><input type="text" class="con_1 hide Wdate" onclick="WdatePicker({readOnly:true})" value=""></td>'
				+'<td><span></span><input type="text" class="con_3 hide machineAmount input_must" value=""></td>'
				+'<td><span></span><input type="text" class="con_2 hide" value=""></td>'
				+'<td class="hide td_operate">'
					+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,7)" class="minus ml15">'
					+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml10 plus" onclick="addMachineList(this)">'
				+'</td>'
			+'</tr>';
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
			var id;
			if(fileTypeId == 24){
				id = "company_fact_pic";
			}else if(fileTypeId == 26){
				id = "patent_pic";
			}else if(fileTypeId == 27){
				id = "other_pic";
			}
				var _newli = "";
				var upload ='<div class="img_wrap_1 uploadPic">'
								+'<div class="img_block_pic posR"><img src="/vip/resources/images/applyAccess/imgBg.png"/>'
								+'<input id="'+ id +'" type="file" name="file" class="uploadInputWrap" onChange="addImg(this,'+ fileTypeId +')"></div>'
								+'<div class="img_block_text"><span >图片大小不超过5M</span></div>'
							+'</div>';
				for(var i=0; i<result.data.length; i++){
					var imgSrc = getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[i].mogodb_id;
					var filename = result.data[i].file_name;
					var creatDate = result.data[i].create_dt;
					_newli+='<div class="img_wrap_1">'
							+'<div class="img_block_pic posR"><img src="'+imgSrc+'"/><div class="posA hide img_operate"><a onclick="delImg(this,'+ result.data[i].id +')">删除</a></div></div>'
							+'<div class="img_block_text"><label title="'+ filename +'">'+ strVachar(filename,23)+'</label><input type="text" class="hide" value='+filename+'></div>'
						+'</div>';
				}
				if(fileTypeId == 24){
					$("#company_equipment_imgs").html(upload);
					$("#company_equipment_imgs").prepend(_newli);
				}else if(fileTypeId == 26){
					$("#patent_imgs").html(upload);
					$("#patent_imgs").prepend(_newli);
				}else if(fileTypeId == 27){
					$("#other_intelligence_imgs").html(upload);
					$("#other_intelligence_imgs").prepend(_newli);
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

function addImg(obj,fileType){
	if($(obj).val()!=""){//上传空间是否为空
		var fileName=$(obj).val();
		var fileFormat = fileName.substring(fileName.lastIndexOf("."));
		var imgSrc="/newresources/images/company_1.png";
		var fileElementId = $(obj).attr("id");
		var fileType = fileType;//文件类别
		fileName = fileName.substring(fileName.lastIndexOf("\\")+1,fileName.lastIndexOf("."));
		
		var fileurl = "PfTaskFileCtrl/addOrUpdateTaskImgFile.do";
		var params = {};
		params.companyId=companyIdForSupplier;
		params.fileType=fileType;
		params.fileName=fileName;
		params.formatType="image";
		var fn = function(data){//服务器成功响应处理函数
	      	if (data.success==true &&data.message=="上传成功") {
	      		var addFileObject = {};
	      		addFileObject.file_type_id = fileType;
	      		addFileObject.file_name = fileName;
	      		addFileObject.mogodb_id = data.mongodbId;
	      		addFileObject.file_format = fileFormat;
	      		addFileInfos.push(addFileObject);//添加文件的信息
	      		
	     		imgSrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+data.mongodbId;
				var _newli='<div class="img_wrap_1">'
					+'<div class="img_block_pic posR"><img src="'+imgSrc+'"/><div class="posA hide img_operate" style="display:none"><a onclick="delImg(this)">删除</a></div></div>'
					+'<div class="img_block_text"><label class="hide" title="'+ fileName +'">'+ strVachar(fileName,23)+'</label><input type="text" value='+fileName+'></div>'
				+'</div>';
				
				if(fileType == 24){
	     			$("#company_equipment_imgs").prepend(_newli);
	     		}else if(fileType == 25){
					$("#certi").parent().find("img").attr("src",imgSrc);
					$("#certi").parent().find("img").after('<div class="posA img_operate"><a onclick="delImgForSingle(this)">删除</a></div>');
					mouseOperate();
					$("#certi").parent().next().hide();
				}else if(fileType == 26){
					$("#patent_imgs").prepend(_newli);
				}else if(fileType == 27){
					$("#other_intelligence_imgs").prepend(_newli);
				}
				mouseOperate();//鼠标经过操作
				//当前上传控件清空
				$(obj).val("");
	         }else{
	        	 window.wxc.xcConfirm(data.message);
	         }
		};
	    addInputUtilFile(fileurl,params,fileElementId,fn);
	}
}
function addText(obj,fileType){
	if($(obj).val()!=""){//上传空间是否为空
		var fileName=$(obj).val();
		var fileFormat = fileName.substring(fileName.lastIndexOf("."));
		var imgSrc="/newresources/images/company_1.png";
		var fileElementId = $(obj).attr("id");
		var fileType = fileType;//文件类别
		fileName = fileName.substring(fileName.lastIndexOf("\\")+1,fileName.lastIndexOf("."));
		
		var fileurl = "PfTaskFileCtrl/addOrUpdateTaskImgFile.do";
		var params = {};
		params.companyId=companyIdForSupplier;
		params.fileType=fileType;
		params.fileName=fileName;
		params.formatType="text";
		var fn = function(data){//服务器成功响应处理函数
			if (data.success==true &&data.message=="上传成功") {
				var addFileObject = {};
				addFileObject.file_type_id = fileType;
				addFileObject.file_name = fileName;
				addFileObject.mogodb_id = data.mongodbId;
				addFileObject.file_format = fileFormat;
				addFileInfos.push(addFileObject);//添加文件的信息
				
				imgSrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+data.mongodbId;
				var _newli="<p><a class='blue' onClick='downloadText(this)'>" + fileName + "</a>"
				+'<input type="hidden" value="'+ data.mongodbId +'">'
					+"<span class='ml20 c999'>"+ (new Date()).Format("yy-MM-dd HH:mm:ss") +"</span>" 
					+"<img src='/vip/resources/images/applyAccess/binGrey.png' onclick='deluploadText(this)' class='minus ml15'></p>";
				
				if(fileType == 30){
					$("#annex_text").prepend(_newli);
				}
				//mouseOperate();//鼠标经过操作
				//当前上传控件清空
				$(obj).val("");
			}else{
				window.wxc.xcConfirm(data.message);
			}
		};
		addInputUtilFile(fileurl,params,fileElementId,fn);
	}
}

/**
 * 删除数组中指定值的元素
* arrayRemove
* @param a 数组
* @param v 指定值的mogodb_id属性
* void
* @author mishengliang
* 2017-2-22 上午9:07:13
*/
function arrayRemove(a,v){
	for(var i = 0; i < a.length; i++){
		if(a[i].mogodb_id === v){
			a.splice(i,1);
		}
	}
}

/**
 * 删除方法
* delImg
* @param e
* @param fileId void
* @author mishengliang
* 2017-2-15 下午2:50:22
*/
function delImg(e,fileId){
	var src = $(e).parents(".img_block_pic").find("img").attr("src");
	var mid = src.substring(src.lastIndexOf("=")+1);
	arrayRemove(addFileInfos,mid);
	if(fileId != undefined){
		delFileInfos.push(fileId);
	}
	$(e).parents(".img_wrap_1").hide();
}
function delImgForSingle(e,fileId){
	var src = $(e).parents(".img_block_pic").find("img").attr("src");
	var mid = src.substring(src.lastIndexOf("=")+1);
	arrayRemove(addFileInfos,mid);
	if(fileId != undefined){
		delFileInfos.push(fileId);
	}
	$(e).parents(".img_block_pic").find("img").attr("src","/vip/resources/images/applyAccess/imgBg.png");
	$(e).parents(".img_block_pic").find("img").click(function(e){
		addImg(e,25);
	});
	$(e).parent().remove();
}

function showText1(fileType){
	var url = "AccessApplicationCtrl/getAccessApplicationAttched.do";
	var params = {};
	params.file_type_id = fileType;
	params.supplier_id=supplier_id;
	
	var isasync = true;
	var fn = function(result){
		var tip = '<div class="uploadClosureWrap"><div class="posR" style="display:inline-block;"><button class="uploadEnclosure">上传文件</button>'
					//+'<input class="uploadEnclosureInput posA" type="file"></div>'
					+'<input id="school_attached" type="file" name="file" class="uploadEnclosureInput posA" onChange="addText(this,30)"></div>'
					+'<span class="c999 ml10">请选择5M以下.doc/.docx;.ppt/.pptx/.pps;.xls/.xlsx;.pdf;.txt文件</span></div>';
		var _newli = "";
		for(var i=0; i<result.data.length; i++){
			var creatDate = result.data[i].create_dt;
			_newli += "<p><a class='blue' onClick='downloadText(this)'>" + result.data[i].file_name + "</a>"
						+'<input type="hidden" value="'+ result.data[i].mogodb_id +'">'
							+"<span class='ml20 c999'>"+ result.data[i].create_dt +"</span>" 
							+"<img src='/vip/resources/images/applyAccess/binGrey.png' onclick='deluploadText(this, "+ result.data[i].id +")' class='minus ml15 hide'></p>";
		}
		$("#annex_text").html("");
		$("#annex_text").prepend(_newli+tip);
	};		
					
	asyncAjaxMethod(url,params,isasync,fn);	
}

//删除上传的文档对象
function deluploadText(obj, fileId) {
	window.wxc.xcConfirm("确认删除么", window.wxc.xcConfirm.typeEnum.confirm, {
		onOk : function() {
			var mid = $(obj).parent().find("input[type='hidden']").val();
			arrayRemove(addFileInfos,mid);
			if(fileId != undefined){
				delFileInfos.push(fileId);
			}
			$(obj).parent().remove();
		},
		onCancel : function() {
		}
	});
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
			var picHtml = '<img id="management_system" src="'+ getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id +'">'
								+'<div class="posA hide img_operate"><a onclick="delImgForSingle(this,'+result.data[0].id+')">删除</a></div>'
								+'<input id="certi" type="file" name="file" class="uploadInputWrap" onChange="addImg(this,25)">';
							
				$(picId).parents(".img_block_pic").html(picHtml);
				//$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
				//("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
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
		var length=result.data.length-1;
		var tableItem='<tr>'
						+'<th style="width:262px;padding-left:8px;">开户行</th>'
						+'<th style="width:262px;padding-left:8px;">开户账号</th>'
						+'<th style="width:72px;padding-left:8px;"></th>'
						+'<th style="width:52px;padding-left:8px;"></th>'
					+'</tr>';
		var radioChecked;
		for(var i=0;i<result.data.length-1;i++){
			var default_id;
			if(result.data[i].default_id==0){
				default_id="";
			}else{
				default_id="默认账号";
			}
			tableItem+='<tr class="part">'
							+'<td><span>'+result.data[i].account_name+'</span><input type="text" class="hide input_must bankName" value='+result.data[i].account_name+'></td>'
							+'<td><span>'+result.data[i].account_code+'</span><input type="text" class="hide input_must bankcard" value='+result.data[i].account_code+'></td>'
							+'<td><span class="bluecolor defaultAccount">'+default_id+'</span><span class="hide"><input type="radio" name="setDefault" class="input_must">设为默认</span></td>'
							+'<td class="td_operate hide">'
								+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,1)" class="minus">'
							+'</td>'
						+'</tr>';
		}
		var di;
		if(result.data[length].default_id==0){
			di="";
		}else{
			di="默认账号";
		}
		tableItem+='<tr class="part">'
						+'<td><span>'+result.data[length].account_name+'</span><input type="text" class="hide input_must bankName" value='+result.data[length].account_name+'></td>'
						+'<td><span>'+result.data[length].account_code+'</span><input type="text" class="hide input_must bankcard" value='+result.data[length].account_code+'></td>'
						+'<td><span class="bluecolor defaultAccount">'+di+'</span><span class="hide"><input type="radio" name="setDefault" class="input_must" >设为默认</span></td>'
						+'<td class="td_operate hide">'
							+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,1)" class="minus">'
							+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml10 plus" onclick="add(this,1)">'
						+'</td>'
					+'</tr>';
		$("#bankTable").html(tableItem);
		$("#bankTable .defaultAccount").each(function(){
			if($(this).text()=='默认账号')
				$(this).next().find("input").prop("checked",true);
			else 
				$(this).next().find("input").prop("checked",false);
		});
		
	};
	asyncAjaxMethod(url,params,true,fn);
}
//获取发票抬头信息
function getAccessInvoiceTitleInfo(){
	var url="AccessApplicationCtrl/getAccessInvoiceTitle.do";
	var params={};
	params.supplier_id=supplier_id;
	var fn = function(result){
 		var tableItem='';
		var length=result.data.length-1;
		for(var i=0;i<result.data.length-1;i++){
			tableItem+='<tr class="part">'
							+'<td><span>'+result.data[i].invoice_title_name+'</span><input type="text" class="hide" placeholder="请输入发票信息" value='+result.data[i].invoice_title_name+'></td>'
							+'<td class="td_operate hide">'
								+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,2)" class="minus">'
							+'</td>'
						+'</tr>';
		}
		tableItem+='<tr class="part">'
						+'<td><span>'+result.data[length].invoice_title_name+'</span><input type="text" class="hide" placeholder="请输入发票信息" value='+result.data[length].invoice_title_name+'></td>'
						+'<td class="td_operate hide">'
							+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,2)" class="minus">'
							+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml10 plus" onclick="add(this,2)">'
						+'</td>'
					+'</tr>';
		$("#invoiceTable").html(tableItem);
		onBlurTest();
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

/**展示编辑框
 * showEdit
 * @param e void
 * @author wangjialin
 * 2017-1-21 下午3:55:08
 */
function showEdit(e){
	addFileInfos.splice(0, addFileInfos.length);
	delFileInfos.splice(0, delFileInfos.length);
	$(e).nextAll().show();
	$(e).hide();
	$(e).parent().parent().find(".display_wrap,.introduction").hide();
	$(e).parent().parent().find(".img_block_text label").hide();
	$(e).parent().parent().find(".img_block_text input").show();
	$(".people_num ,.money_num ,.td_operate,.asterisk,.wordsCount,.uploadClosureWrap").show();
	$(".people_num,.money_num").next().show();
	$(".people_num ,.introductionWrap").prev().hide();
	$(e).parent().parent().find(".editWrap,.addrSelect1,.addrSelect2,.detailAddr,.minus,.plus,.introductionWrap,.uploadPic,.radioWrap,.listWrap,.chooseYear,.factoryOwnerSelect").show();
	$("#companyIntroduction .introductionWrap").val($("#companyIntroduction .introduction").text());
	$("#schoolCoop").next().val($("#schoolCoop").text());
	$(e).parent().parent().find(".editWrap,.people_num").each(function(){
		$(this).val($(this).prev().text());
	});
	$(e).parent().parent().find(".editWrapShort").each(function(){
		$(this).prev().hide();
		$(this).val($(this).prev().text());
		$(this).show();
	});
	$("#devicelist td span,#bankTable td span,#invoiceTable td span").hide();
	$("#devicelist td span,#bankTable td span,#invoiceTable td span").next().show();
	$("#bankTable th").show();
	mouseOperate();
	var len1=$("#other_person_con").children().length;
	if(len1==5){
		$("#other_person_con").children().last().find(".plus").hide();
	}
	var len2=$("#person_type_con").children().length;
	if(len2==2){
		$("#person_type_con").children().last().find(".plus").hide();
	}
	//质量控制
	var qualityControl=$("#quality_control").text();
	switch(qualityControl){
	case'':break;
	case '无':
		$("input[type='radio'][name='qualityControl']").eq(0).prop("checked",true);
		break;
	case '内部':
		$("input[type='radio'][name='qualityControl']").eq(1).prop("checked",true);
		break;
	case '第三方':
		$("input[type='radio'][name='qualityControl']").eq(2).prop("checked",true);
		break;
	}
	//oem代加工
	var oem=$("#is_oem").text();
	switch(oem){
	case'':break;
	case '提供':
		$("input[type='radio'][name='oem']").eq(0).prop("checked",true);
		break;
	case '不提供':
		$("input[type='radio'][name='oem']").eq(1).prop("checked",true);
		break;
	}
	//管理体系认证
	var certification=$("#certification_system").text();
	switch(certification){
	case'':break;
	case '无':
		$("input[type='radio'][name='certification']").eq(0).prop("checked",true);
		break;
	case 'ISO9000':
		$("input[type='radio'][name='certification']").eq(1).prop("checked",true);
		break;
	case 'ISO14000':
		$("input[type='radio'][name='certification']").eq(2).prop("checked",true);
		break;
	default:
		$("input[type='radio'][name='certification']").eq(3).prop("checked",true);
		$(".otherCertification").val(certification);
		$(".otherCertification").show();
		break;
	}
	onBlurTest();
	var src1=$("#patent_imgs img").eq(0).prop("src");
	var src2=$("#other_intelligence_imgs img").eq(0).prop("src");
	var src3=$("#company_equipment_imgs img").eq(0).prop("src");
	var src4=$("#management_system").prop("src");
	if(src1!=undefined && src1.indexOf("notexist.png")>0){
		$("#patent_imgs .uploadPic").prev().hide();
	}
	if(src2!=undefined && src2.indexOf("notexist.png")>0){
		$("#other_intelligence_imgs .uploadPic").prev().hide();
	}
	if(src3!=undefined && src3.indexOf("notexist.png")>0){
		$("#company_equipment_imgs .uploadPic").prev().hide();
	}
	if(src4!=undefined && src4.indexOf("notexist.png")>0){
		$(".uploadCertification").show();
		$(".uploadCertification").prev().hide();
	}else{
		$(".uploadCertification").hide();
	}
}
/**取消编辑
 * EditCancel
 * @param e void
 * @author wangjialin
 * 2017-1-21 下午3:55:25
 */
function editCancel(e,i){
	$(e).hide();
	$(e).prev().show();
	$(e).next().hide();
	$(e).parent().parent().find(".display_wrap,.introduction").show();
	$(e).parent().parent().find(".img_block_text label").show();
	$(e).parent().parent().find(".img_block_text input").hide();
	$(e).parent().parent().find(".editWrap,.addrSelect1,.addrSelect2,.detailAddr,.minus,.plus,.introductionWrap,.uploadPic,.radioWrap,.listWrap,.chooseYear,.factoryOwnerSelect").hide();
	$(e).parent().parent().find(".editWrapShort").hide();
	$(e).parent().parent().find(".editWrapShort").prev().show();
	$(".people_num,.money_num ,.td_operate,.asterisk,.info_explain,.wordsCount,.uploadClosureWrap").hide();
	$(".people_num,.money_num").next().hide();
	$(".people_num,.introductionWrap").prev().show();
	$("#devicelist td span,#bankTable td span,#invoiceTable td span").show();
	$("#devicelist td span,#bankTable td span,#invoiceTable td span").next().hide();
	$("#bankTable th").hide();
	$(".img_block_pic").mouseover(function(){
		$(this).find(".img_operate").hide();
	});
	var src1=$("#patent_imgs img").eq(0).prop("src");
	var src2=$("#other_intelligence_imgs img").eq(0).prop("src");
	var src3=$("#company_equipment_imgs img").eq(0).prop("src");
	var src4=$("#management_system").prop("src");
	if(src1!=undefined && src1.indexOf("notexist.png")>0){
		$("#patent_imgs .uploadPic").prev().show();
	}
	if(src2!=undefined && src2.indexOf("notexist.png")>0){
		$("#other_intelligence_imgs .uploadPic").prev().show();
	}
	if(src3!=undefined && src3.indexOf("notexist.png")>0){
		$("#company_equipment_imgs .uploadPic").prev().show();
	}
	if(src4!=undefined && src4.indexOf("notexist.png")>0){
		$(".uploadCertification").hide();
		$(".uploadCertification").prev().show();
	}else{
		$(".uploadCertification").hide();
	}
	showMorePic1(24);
	picPathSrc1(25,"#management_system");//质量体系认证
	showMorePic1(26);//专利图片展示
	showMorePic1(27);//其他资质图片展示
	showText1(30);
	switch (i){
	case 1:
		currtab2('#supplierFile',1);
		break;
	case 2:
		currtab2('#supplierFile',2);
		break;
	case 3:
		currtab2('#supplierFile',3);
	}
}
/**保存编辑
 * editSave
 * @param e void
 * @author wangjialin
 * 2017-2-13 下午2:08:42
 */
function editSave(e,i){
	var flag=true;
	switch (i){
	case 1:
		//必选框判断
		$(".input_must").each(function(){
			var v=$(this).val();
			var id=$(this).prop("id");
			if(id=='f_phone_edit'){
				if(v!=''){
					if($("#f_phone_edit").val()==''){
						$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">电话号码不可为空');
						$(this).parents(".item").find(".info_explain ").show();
						$("#f_phone_edit").css("border","1px solid red");
						flag=false;
					}else{
						var phone=$("#f_phone_edit").val();
						 if(!phone_reg.test(phone)){
							$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的电话号码');
							$(this).parents(".item").find(".info_explain ").show();
							$(this).css("border","1px solid red");
							$("#f_phone_edit").css("border","1px solid red");
							flag=false;
						}else{
							$(this).parents(".item").find(".info_explain").hide();
							$("#f_phone_edit").css("border","1px solid #ccc");
						}
					}
				}else{
					$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">电话号码不可为空');
					$(this).parents(".item").find(".info_explain ").show();
					$(this).css("border","1px solid red");
					flag=false;
				}
			}else{
				if(v!=''){
					$(this).parents(".item").find(".info_explain").hide();
					$(this).css("border","1px solid #ccc");
				}else{
					$(this).parents(".item").find(".info_explain").show();
					$(this).css("border","1px solid red");
					flag=false;
				}
			}
		
		});
		//手机号码判断
		if(	$("#m_phone_edit").val()!=''){
			if(!mphone_reg.test($("#m_phone_edit").val())){
				$("#m_phone_edit").next().show();
				flag=false;
			}else{
				$("#m_phone_edit").next().hide();
				$("#m_phone_edit").css("border","1px solid #ccc");
			} 
		}else{
			$(this).next().hide();
		}
		//邮箱判断
		if($("#email_edit").val()!=''){
			if(!email_reg.test($("#email_edit").val())){
				$("#email_edit").next().show();
				flag=false;
			}else{
				$("#email_edit").next().hide();
			} 
		}else{
			$("#email_edit").next().hide();
		}
		//地址判断
		var v=$("#contactAddr").val();
		var province=$("#province").find("input").val();
		var city=$("#city").find("input").val();
		var county=$("#county").find("input").val();
		if(v!=''){
			if(province==''||city==''||county==''||province=='undefined'||city=='undefined'||county=='undefined'){
				$("#address").find(".info_explain").show();
				$("#province,#city,#county").css("border","1px solid red");
				flag=false;
				return false;
			}else{
				$("#address").find(".info_explain").hide();
				$("#province,#city,#county").css("border","1px solid #ccc");
				$("#contactAddr").css("border","1px solid #ccc");
			}
		}else{
			$("#address").find(".info_explain").show();
			$("#contactAddr").css("border","1px solid red");
			flag=false;
			return false;
		}
		break;
	case 2:
		//设备单价判断
		$(".machinePrice").each(function(){
			var v=$(this).val();
			if(v!=''){//设备价格不为空
				var name=$(this).parents(".part").find(".machineName").val();
				var amount=$(this).parents(".part").find(".machineAmount").val();
				if(!num_reg.test(v)){//设备价格填写错误
					$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的金额');
					$(this).parents(".item").find(".info_explain ").show();
					$(this).css("border","1px solid red");
					flag=false;
					return false;
				}else{//设备价格填写正确
					if(name=='' ||amount==''){
						$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
						$(this).parents(".item").find(".info_explain ").show();
						$(this).parents(".part").find(".machineName,.machineAmount").css("border","1px solid red");
						$(this).css("border","1px solid #ccc");
					}else{
						if(!int_reg.test(amount)){
							$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备数量');
							$(this).parents(".item").find(".info_explain ").show();
							$(this).css("border","1px solid #ccc");
							$(this).parents(".part").find(".machineAmount").css("border","1px solid red");
							flag=false;
							return false;
						}else{
							$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
							$(this).parents(".item").find(".info_explain ").hide();
							$(this).css("border","1px solid #ccc");
							$(this).parents(".part").find(".machineName,.machineAmount").css("border","1px solid #ccc");
						}
					}
				}
				
			}
		});
		//设备名称判断
		$(".machineName").each(function(){
			if($(this).val()!=''){//设备名称不为空
				if($(this).parents(".part").find(".machineAmount").val()==''){
					$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
					$(this).parents(".item").find(".info_explain ").show();
					$(this).parents(".part").find(".machineAmount").css("border","1px solid red");
					flag=false;
					return false;
				}else{
					if(!int_reg.test($(this).parents(".part").find(".machineAmount").val())){
						$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备数量');
						$(this).parents(".item").find(".info_explain ").show();
						$(this).parents(".part").find(".machineAmount").css("border","1px solid red");
						flag=false;
						return false;
					}else{
						if($(this).parents(".part").find(".machinePrice").val()!=''){
							if(!num_reg.test($(this).parents(".part").find(".machinePrice").val())){
								$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备金额');
								$(this).parents(".item").find(".info_explain ").show();
								$(this).parents(".part").find(".machinePrice").css("border","1px solid red");
								flag=false;
								return false;
							}else{
								$(this).parents(".item").find(".info_explain").hide();
								$(this).css("border","1px solid #ccc");
								$(this).parents(".part").find(".machinePrice,.machineAmount").css("border","1px solid #ccc");
							}
						}else{
							$(this).parents(".item").find(".info_explain").hide();
							$(this).css("border","1px solid #ccc");
							$(this).parents(".part").find(".machineAmount").css("border","1px solid #ccc");
						}
					}
				}
		}else{
			$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
			$(this).parents(".item").find(".info_explain ").show();
			$(this).css("border","1px solid red");
			flag=false;
			return false;
		}
		});
		//设备数量判断
		$(".machineAmount").each(function(){
			if($(this).val()!=''){
				if($(this).parents(".part").find(".machineName").val()==''){
					$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
					$(this).parents(".item").find(".info_explain ").show();
					$(this).parents(".part").find(".machineName").css("border","1px solid red");
					flag=false;
					return false;
				}else{
					if(!int_reg.test($(this).val())){
						$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备数量');
						$(this).parents(".item").find(".info_explain ").show();
						$(this).css("border","1px solid red");
						flag=false;
						return false;
					}else{
						if($(this).parents(".part").find(".machinePrice").val()!=''){
							if(!num_reg.test($(this).parents(".part").find(".machinePrice").val())){
								$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备金额');
								$(this).parents(".item").find(".info_explain ").show();
								$(this).parents(".part").find(".machinePrice").css("border","1px solid red");
								flag=false;
								return false;
							}else{
								$(this).parents(".item").find(".info_explain").hide();
								$(this).css("border","1px solid #ccc");
								$(this).parents(".part").find(".machineName,.machinePrice").css("border","1px solid #ccc");
							}
						}else{
							$(this).parents(".item").find(".info_explain").hide();
							$(this).css("border","1px solid #ccc");
							$(this).parents(".part").find(".machineName").css("border","1px solid #ccc");
						}
					}
				}
			}else{
				$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
				$(this).parents(".item").find(".info_explain ").show();
				$(this).css("border","1px solid red");
				flag=false;
				return false;
			}
		});
		//人数判断
		$(".people_num").each(function(){
			if($(this).val()!=''){
				if(!int_reg.test($(this).val())){
					$(this).parents(".item").find(".info_explain").show();
					$(this).css("border","1px solid red");	
					flag=false;
				}else {
					$(this).parents(".item").find(".info_explain").hide();
					$(this).css("border","1px solid #ccc");	
				}
			}else {
				$(this).parents(".item").find(".info_explain").hide();
				$(this).css("border","1px solid #ccc");	
			}
				
		});
		//金额判断
		$(".money_num").each(function(){
			if($(this).val()!=''){
				if(!num_reg.test($(this).val())){
					$(this).css("border","1px solid red");
					$(this).parents(".item").find(".info_explain").show();
					flag=false;
				}else{
					$(this).css("border","1px solid #ccc");
					$(this).parents(".item").find(".info_explain").hide();
				}
			}else {
				$(this).css("border","1px solid #ccc");
				$(this).parents(".item").find(".info_explain").hide();
			}
		});
		//面积判断
		$(".size_test").each(function(){
			if($(this).val()!=''){
				if(!num_reg.test($(this).val())){
					$(this).css("border","1px solid red");
					$(this).parents(".item").find(".info_explain").show();
					flag=false;
				}else{
					$(this).css("border","1px solid #ccc");
					$(this).parents(".item").find(".info_explain").hide();
				}
			}else {
				$(this).css("border","1px solid #ccc");
				$(this).parents(".item").find(".info_explain").hide();
			}
		});
		break;
	case 3:
		//银行信息判断
		$(".bankcard").each(function(){
			if($(this).val()!=''&& $(this).parent().prev().find("input").val()!=''){
				if(!bankcard_reg.test($(this).val())){
					$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的开户账号');
					$(this).parents(".item").find(".info_explain").show();
					$(this).css("border","1px solid red");
					flag=false;
					return false;
				}else{
					$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空');
					$(this).parents(".item").find(".info_explain").hide();
					$(this).css("border","1px solid #ccc");
					$(this).parent().prev().find("input").css("border","1px solid #ccc");
				}
			}else{
				$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空');
				$(this).parents(".item").find(".info_explain").show();
				$(this).css("border","1px solid red");
				$(this).parent().prev().find("input").css("border","1px solid red");
				flag=false;
				return false;
			}
		});
		$(".bankName").each(function(){
			if($(this).val()!=''&& $(this).parent().next().find("input").val()!=''){
				if(!bankcard_reg.test($(this).parent().next().find("input").val())){
					$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的开户账号');
					$(this).parents(".item").find(".info_explain").show();
					$(this).parent().next().find("input").css("border","1px solid red");
					flag=false;
					return false;
				}else{
					$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空');
					$(this).parents(".item").find(".info_explain").hide();
					$(this).css("border","1px solid #ccc");
					$(this).parent().next().find("input").css("border","1px solid #ccc");
				}
			}else{
				$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空');
				$(this).parents(".item").find(".info_explain").show();
				$(this).css("border","1px solid red");
				$(this).parent().next().find("input").css("border","1px solid red");
				flag=false;
				return false;
			}
		});
		var checkedNum=0;
		$("input[name='setDefault']").each(function(){
			if($(this).prop("checked"))
				checkedNum=1;
		});
		if(checkedNum==0){
			$("#bankTable").next().html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请设置默认账号');
			$("#bankTable").next().show();
			flag=false;
			return false;
		}
	}
	if(flag){
		$(e).hide();
		$(e).prev().hide();
		$(e).prev().prev().show();
		if(i==1){
			saveDetailInfo();
		}else if(i==2){
			saveScalePowerInfo();
		}else{
			saveSupplierTrade();
		}
	}
}

/**
 * 保存详细信息
* saveDetailInfo void
* @author mishengliang
* 2017-2-14 上午9:06:38
*/
function saveDetailInfo(){
	var infos = getDetailInfoInput();//获取一般信息
	var goodInfos = getGoodsInfos();
	var mateialInfos = getMateialInfos();
	var competitorInfos = getCompetitorInfos();
	var customerInfos = getCustomerInfos();
	var fileNameChangeInfos = getFileNameChange("company_equipment_imgs");//24 厂容厂貌文件改变
	
	var url = "AccessApplicationCtrl/updateAccessApplicationInfoBatch.do";
	var params = {};
	params.recordId = record_id;
	params.supplierId = supplier_id;
	params.infos = JSON.stringify(infos);
	params.goodInfos = JSON.stringify(goodInfos);
	params.mateialInfos = JSON.stringify(mateialInfos);
	params.competitorInfos = JSON.stringify(competitorInfos);
	params.customerInfos = JSON.stringify(customerInfos);
	params.addFileInfos = JSON.stringify(addFileInfos);//增加文件参数
	params.delFileInfos = JSON.stringify(delFileInfos);//删除文件参数
	params.fileNameChangeInfos = JSON.stringify(fileNameChangeInfos);//文件名修改
	var fn = function(result){
		currtab2('#supplierFile',1);//刷新详细信息
	};
	asyncAjaxMethod(url,params,true,fn);
}

/**
 * 获取一般信息
* getDetailInfoInput
* @returns {Array} Array
* @author mishengliang
* 2017-2-14 下午4:14:43
*/
function getDetailInfoInput(){
	//详细信息数据
	var cpyname = $("#cpyname_cn1").next("input").val();
	var fPhone = $("#f_phone").next("input").val();
	var countryCode = $("#county input").eq(0).val();
	var contactAddr = $("#contactAddr").val();
	var mPhone = $("#m_phone_edit").val();
	var contacts = $("#contacts").next("input").val();
	var fax = $("#fax").next("input").val();
	var email = $("#email").next("input").val();
	var companyIntroduction = $("#companyIntroduction textarea").val();
	var lng = $("#lng").val();
	var lat = $("#lat").val();
	//信息数据对应的info_id
	var cpynameInfoId = $("#cpyname_cn1 input").val();
	var fPhoneInfoId = $("#f_phone input").val();
	var countryCodeInfoId = $("#county input").eq(1).val();
	var contactAddrInfoId = $("#contact_addr input").val();
	var mPhoneInfoId = $("#m_phone input").val();
	var contactsInfoId = $("#contacts input").val();
	var faxInfoId = $("#fax input").val();
	var emailInfoId = $("#email input").val();
	var companyIntroductionInfoId = $("#companyIntroduction input").val();
	var lngInfoId = $("#lng_info_id").val();
	var latInfoId = $("#lat_info_id").val();
	
	var infos = new Array();
	infos.push({infoId:cpynameInfoId,content:cpyname});
	infos.push({infoId:fPhoneInfoId,content:fPhone});
	infos.push({infoId:countryCodeInfoId,content:countryCode});
	infos.push({infoId:contactAddrInfoId,content:contactAddr});
	infos.push({infoId:mPhoneInfoId,content:mPhone});
	infos.push({infoId:contactsInfoId,content:contacts});
	infos.push({infoId:faxInfoId,content:fax});
	infos.push({infoId:emailInfoId,content:email});
	infos.push({infoId:companyIntroductionInfoId,content:companyIntroduction});
	infos.push({infoId:lngInfoId,content:lng});
	infos.push({infoId:latInfoId,content:lat});
	
	return infos;
}

/**
 * 获取产品信息
* getGoodsInfos void
* @author mishengliang
* 2017-2-14 下午4:16:07
*/
function getGoodsInfos(){
	var goodInfos = new Array();
	$("#goods .part").each(function(i,e){
		var params = {};
		params.goodsName = $(e).find("input").eq(0).val();
		params.goodsBrand = $(e).find("input").eq(1).val();
		params.goodsId = $(e).find("input").eq(2).val();
		goodInfos.push(params);
	});
	return goodInfos;
}

function getMateialInfos(){
	var mateialInfos = new Array();
	$("#mateial .part").each(function(i,e){
		var params = {};
		params.materialName = $(e).find("input").eq(0).val();
		params.materialBrand = $(e).find("input").eq(1).val();
		params.materialId = $(e).find("input").eq(2).val();
		mateialInfos.push(params);
	});
	return mateialInfos;
}

function getCompetitorInfos(){
	var competitorInfos = new Array();
	$("#competitor .part").each(function(i,e){
		var params = {};
		params.competitorName = $(e).find("input").eq(0).val();
		params.competitorId = $(e).find("input").eq(1).val();
		competitorInfos.push(params);
	});
	return competitorInfos;
}

function getCustomerInfos(){
	var customerInfos = new Array();
	$("#customer .part").each(function(i,e){
		var params = {};
		params.customerName = $(e).find("input").eq(0).val();
		params.customerId = $(e).find("input").eq(1).val();
		customerInfos.push(params);
	});
	return customerInfos;
}

function getFileNameChange(id){
	var fileNameInfos = new Array();
	var labelName = "";
	var inputName = "";
	$("#"+ id +" .img_wrap_1").each(function(i,e){
		var fileInfo = {};
		labelName = $(e).find("label").attr("title");
		inputName = $(e).find("input").val();
		if((labelName != inputName) && labelName != undefined){
			var s = $(e).find("img").attr("src");
			var mongoid =  s.substring(s.lastIndexOf("=")+1);
			fileInfo.mongoId = mongoid;
			fileInfo.fileName = inputName;
			fileNameInfos.push(fileInfo);
		}
	});
	return fileNameInfos;
}

/**
 * 保存规模能力
* saveScalePowerInfo void
* @author mishengliang
* 2017-2-14 上午9:06:41
*/
function saveScalePowerInfo(){
	var infos = getScaleInfos();
	var fInfos1 = getFileNameChange("patent_imgs");//专利
	var fInfos2 = getFileNameChange("other_intelligence_imgs");//其他资质
	var fileNameChangeInfos = fInfos1.concat(fInfos2);
	var deviceInfos = getDeviceInfos();
	
	var url = "AccessApplicationCtrl/updateAccessApplicationInfoBatch.do";
	var params = {};
	params.recordId = record_id;
	params.supplierId = supplier_id;
	params.infos = JSON.stringify(infos);
	params.addFileInfos = JSON.stringify(addFileInfos);//增加文件参数
	params.delFileInfos = JSON.stringify(delFileInfos);//删除文件参数
	params.fileNameChangeInfos = JSON.stringify(fileNameChangeInfos);//文件名修改
	params.deviceInfos = JSON.stringify(deviceInfos);//文件名修改
	var fn = function(result){
		currtab2('#supplierFile',2);//刷新详细信息
	};
	asyncAjaxMethod(url,params,true,fn);
}

function getScaleInfos(){
	var emplyees = $("#emplyees .editWrap").val();
	var emplyeesInfoId = $("#emplyees input[type=hidden]").val();
	var qualityControl = $("input:radio[name='qualityControl']:checked").val();
	var qualityControlInfoId = $("#quality_control input").val();
	var oem = $("input:radio[name='oem']:checked").val();
	var oemInfoId = $("#is_oem input").val();
	var checkedValue=$("input:radio[name='certification']:checked").val();
	var certificationSystem='';
	if(checkedValue!=3){
		certificationSystem = $("input:radio[name='certification']:checked").parent().text();
	}else{
		certificationSystem = $("input:radio[name='certification']:checked").parent().next().val();
	}
	var certificationSystemInfoId = $("#certification_system input").val();
	var companyArea = $("#companyArea .editWrap").val();
	var companyAreaInfoId = $("#companyArea input[type=hidden]").val();
	var factoryArea = $("#factoryArea .editWrap").val();
	var factoryAreaInfoId = $("#factoryArea input[type=hidden]").val();
	var begintime = $(".chooseYear input:eq(0)").val();
	var begintimeInfoId = $("#begintime input").val();
	var endtime = $(".chooseYear input:eq(1)").val();
	var endtimeInfoId = $("#endtime input").val(); 
	var factoryOwner = $(".factoryOwnerSelect input[type=hidden]").val();
	var factoryOwnerInfoId = $("#factory_owner input").val();
	var schoolCoop = $("#schoolCoop").next("textarea").val();
	var schoolCoopInfoId = $("#schoolCoop input").val();
	var turnover = $("#turnover .moneyCon input[type='text']").val();
	var turnoverInfoId = $("#turnoverNum input").val();
	var turnoverCurrency = $("#turnover .moneyCon input[type='hidden']").val();
	var turnoverCurrencyInfoId = $("#turnoverCurrency input").val();
	var exportNum = $("#exportNum .moneyCon input[type='text']").val();
	var exportNumInfoId = $("#exportNum1 input").val();
	var exportNumCurrency = $("#exportNum .moneyCon input[type='hidden']").val();
	var exportNumCurrencyInfoId = $("#exportCurrency input").val();
	var importNum = $("#importNum .moneyCon input[type='text']").val();
	var importNumInfoId = $("#importNum1 input").val();
	var importNumCurrency = $("#importNum .moneyCon input[type='hidden']").val();
	var importNumCurrencyInfoId = $("#importCurrency input").val();
	var emInfos = getEmployeeInfos();
	
	var infos = new Array();
	infos.push({infoId:emplyeesInfoId,content:emplyees});
	infos.push({infoId:qualityControlInfoId,content:qualityControl});
	infos.push({infoId:oemInfoId,content:oem});
	infos.push({infoId:certificationSystemInfoId,content:certificationSystem});
	infos.push({infoId:companyAreaInfoId,content:companyArea});
	infos.push({infoId:factoryAreaInfoId,content:factoryArea});
	infos.push({infoId:begintimeInfoId,content:begintime});
	infos.push({infoId:endtimeInfoId,content:endtime});
	infos.push({infoId:factoryOwnerInfoId,content:factoryOwner});
	infos.push({infoId:schoolCoopInfoId,content:schoolCoop});
	infos.push({infoId:turnoverInfoId,content:turnover});
	infos.push({infoId:turnoverCurrencyInfoId,content:turnoverCurrency});
	infos.push({infoId:exportNumInfoId,content:exportNum});
	infos.push({infoId:exportNumCurrencyInfoId,content:exportNumCurrency});
	infos.push({infoId:importNumInfoId,content:importNum});
	infos.push({infoId:importNumCurrencyInfoId,content:importNumCurrency});
	return infos.concat(emInfos);
}

/**
 * 获取其他人员和人员结构
* getEmployeeInfos
* @returns {Array} Array
* @author mishengliang
* 2017-2-17 上午9:31:44
*/
function getEmployeeInfos(){
	var otherInfos = new Array();
	var emInfos = new Array();
	var infos = new Array();
	var v,n;
	for(var i=1;i<=5;i++){
		otherInfos[i] = {infoId:otherEmployArray[i],content:0};
		if(i<=2){
			emInfos[i] = {infoId:employStructArray[i],content:0};
		}
	}
	$("#other_person_con .personCon").each(function(i,e){
		v = $(e).find(".listWrap input[type='hidden']").val();
		n = $(e).find(".people_num").val();
		if(n=="")n=0;
		otherInfos[v] = {infoId:otherEmployArray[v],content:parseInt(n)};
	});
	$("#person_type_con .personCon").each(function(i,e){
		v = $(e).find(".listWrap input[type='hidden']").val();
		n = $(e).find(".people_num").val();
		if(n=="")n=0;
		emInfos[v] = {infoId:employStructArray[v],content:parseInt(n)};
	});
	var ta = otherInfos.concat(emInfos);
	for(var i = 1;i<=ta.length;i++){
		if(ta[i] != undefined){
			infos.push(ta[i]);
		}
	}
	return infos; 
}

/**
 * 获取设备清单
* getDeviceInfos
* @returns {Array} Array
* @author mishengliang
* 2017-2-17 上午10:44:07
*/
function getDeviceInfos(){
	var deviceInfos = new Array();
	$("#devicelist .part").each(function(i,e){
		var params = {};
		params.deviceName = $(e).find("td input").eq(0).val();
		params.specifications = $(e).find("td input").eq(1).val();
		params.place = $(e).find("td input").eq(2).val();
		params.price = $(e).find("td input").eq(3).val();
		params.buyDay = $(e).find("td input").eq(4).val();
		params.deviceNum = $(e).find("td input").eq(5).val();
		params.advanced = $(e).find("td input").eq(6).val();
		deviceInfos.push(params);
	});
	return deviceInfos;
}

/**
 * 保存交易信息
* saveSupplierTrade void
* @author mishengliang
* 2017-2-14 上午9:06:44
*/
function saveSupplierTrade(){
	var bankInfos = getBankInfos();
	var invoiceInfos = getInvoiceInfos();
	
	var url = "AccessApplicationCtrl/updateAccessApplicationInfoBatch.do";
	var params = {};
	params.recordId = record_id;
	params.supplierId = supplier_id;
	params.bankInfos = JSON.stringify(bankInfos);//银行信息
	params.invoiceInfos = JSON.stringify(invoiceInfos);//发票信息
	var fn = function(result){
		currtab2('#supplierFile',3);//刷新详细信息
	};
	asyncAjaxMethod(url,params,true,fn);
}

function getBankInfos(){
	var bankInfos = new Array();
	$("#bankTable .part").each(function(i,e){
		var params = {};
		params.account_name = $(e).find("td input").eq(0).val();
		params.account_code = $(e).find("td input").eq(1).val();
		params.default_id = $(e).find("td input[type='radio'][name='setDefault']").prop("checked") == true ? 1:0;
		bankInfos.push(params);
	});
	return bankInfos;
}
function getInvoiceInfos(){
	var invoiceInfos = new Array();
	$("#invoiceTable .part").each(function(i,e){
		var params = {};
		params.invoice_title_name = $(e).find("td input").eq(0).val();
		invoiceInfos.push(params);
	});
	return invoiceInfos;
}

/**加载市
 * showCity
 * @param e void
 * @author wangjialin
 * 2016-10-17 上午10:16:12
 */
function showCity(code){
	var province_code=code;
	if(province_code!=null&&province_code!='0'){
		city=ChineseDistricts[province_code];
		if(city!=null&&city!=undefined){//有子级
			$(".city").parent().show();
			//清空数据
			$(".city li").remove();
			$.each(city,function(code,address){
				var option="<li value='"+code+"' onclick='addressSelect(this,2)'>"+address+"</li>";
				$(".city").append(option);
			});
			if($(".city").val() == 0){//判断是否选择市级
				$(".county li").remove();
			}
		}else{
			$(".city").parent().hide();
			$(".city").parent().next().hide();
		}
	}else{//未选择省级
		$(".city li").remove();
		$(".county li").remove();
	}
}
/**加载县区
 * showCounty
 * @param e void
 * @author wangjialin
 * 2016-10-17 上午10:15:56
 */
function showCounty(code){
	var city_code=code;
	if(city_code!=null&&city_code!='0'){//城市有选择
		countrys=ChineseDistricts[city_code];
		//有子级
		if(countrys!=null&&countrys!=undefined){
			$(".county").parent().show();
			//清空数据
			$(".county li").remove();
			$.each(countrys,function(code,address){
				var option="<li value='"+code+"' onclick='addressSelect(this)'>"+address+"</li>";
				$(".county").append(option);
			});
		}else{
			$(".county").parent().hide();
		}
	}else{//城市无选择
		$(".county li").remove();
	}
}
/**展示下拉列表
 * showSelect
 * @param e void
 * @author wangjialin
 * 2016-10-12 下午2:22:14
 */
function showSelect(e){
	var l=$(e).next().children().length;
	var id=$(e).parents(".item").attr("id");
	if(l>0){
		$(e).next("ul").css("display","block");
		if(id=='otherperson'){
			var index=$(e).parents(".part").index();
			checkChoosed("otherperson","otherPeopleList",index);
		}else if(id=='persontype'){
			var index=$(e).parents(".part").index();
			checkChoosed("persontype","personStructureList",index);
		}else{}
		$(".mask_opacity").css("display","block");
		$(".mask_opacity").click(function(){
			$(e).next().css("display","none");
			var option= $(e).find("input").val();
			if((option=='' || option==undefined) && $(e).hasClass("select_must")){
				$(e).css("border","1px solid red");
				$(e).parents(".item").find(".info_explain").show();
			}else{
				$(e).css("border","1px solid #ccc");
			}
			$(e).find("img").prop("src","/vip/resources/images/applyAccess/arrowDown.png");
			$(".mask_opacity").css("display","none");
		});
	}
}
/**	ul列表模拟select效果，本页面所有的下拉选择框均采用此种处理
 * selectOption
 * @param e void
 * @author wangjialin
 * 2016-10-14 下午1:15:50
 */
function selectOption(e){
	var item=$(e).text();
	var value=$(e).val();
	item=item+"<img src='/vip/resources/images/applyAccess/arrowDown.png' class='f_r mr5 mt5'><input type='hidden' value="+value+">";
	$(e).parent().prev().html(item);
//	$(e).parent().prev().css("border","1px solid #ccc");
	$(e).parent().css("display","none");
	$(".mask_opacity").css("display","none");
	var id=$(e).parents(".item").prop("id");
	if(id=='turnover' || id=='export_currency_id'|| id=='import_currency_id'){
		var v=$(e).parent().parent().next().find("input").val();
		if(v!=''){
			if(!num_reg.test(v)){
				$(e).parents(".item").find(".info_explain ").show();
			}else{
				$(e).parents(".item").find(".info_explain").hide();	
			}
		}
	}else if(id=='persontype'||id=='otherperson'){
		var v=$(e).parent().parent().next().next().val();
		if(v!=''){
			if(!int_reg.test(v)){
				$(e).parents(".item").find(".info_explain ").show();
			}else{
				$(e).parents(".item").find(".info_explain").hide();	
			}
		}
	}else{
		$(e).parents(".item").find(".info_explain ").hide();
	}
}

/**地址选择三级联动
 * addressSelect
 * @param e
 * @param i void
 * @author wangjialin
 * 2016-10-17 上午10:17:48
 */
function addressSelect(e,i){
	var value=$(e).val();
	var text=$(e).text();
	var province=$("#province").find("input").val();
	var city=$("#city").find("input").val();
	var html="<input type='hidden' value="+value+">"+text+"<img src='/vip/resources/images/applyAccess/arrowDown.png' class='f_r mr5'>";
	$(e).parent().prev().html(html);
//	$(e).parent().prev().css("border","1px solid #ccc");
	$(e).parent().css("display","none");
	$(".mask_opacity").css("display","none");
	if(i==1){
		if(value!=province){
			$("#city").html('<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5">');
			$("#county").html('<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5">');
		}
		showCity(value);
		goToLocation(1);
	}else if(i==2){
		if(value!=city){
			$("#county").html('<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5">');
		}
		showCounty(value);
		goToLocation(2);
	}else{
		goToLocation(3);
	}
	var last=$("#address").children().eq(0).children().last();
	var lastValue=last.find("input").val();
	if(lastValue!=undefined && lastValue!=''){
		if($("#contactAddr").val()!=''){
			$("#address").find(".info_explain").hide();
			$("#contactAddr").css("border","1px solid #ccc");
		}else {
			$("#address").find(".info_explain").show();
			$("#contactAddr").css("border","1px solid red");
		}
	}
}
//百度地图API功能
function remarkMap(){
	map = new BMap.Map("allmap",{enableMapClick:false,minZoom:6});
	var point = new BMap.Point(120.134751,30.326912);
	map.centerAndZoom(point,12);
	setMapEvent();//设置地图事件
	addMapControl();//向地图添加控
	custormSearch();//加载自定义搜索
}

//关闭定位到地图层
function close_map(obj)
{
	$(".mask").css("display","none");
	$("#allmap").css("display","none");
	$("#remove_overlay").css("display","none");
	$(obj).css("display","none");
}

//定位到地图
function theLocation(){
	//var province=$('#province option:selected').text();
	var city=$('#city').text();
	var country=$('#county').text();
	var street_content=$("#contactAddr").val();
	var street_content_pro=$("#contactAddrPro").val();
	
	if($('#city').find("input:first").val()==''||$('#city').find("input:first").val()==undefined){
		window.wxc.xcConfirm("请选择城市",confirm);
		return;
	}else{
		if($('#county').find("input:first").val()==''||$('#county').find("input:first").val()==undefined){
			window.wxc.xcConfirm("请选择区",confirm);
			return;
		}else{
			searchArea=city;
		}
	}
	
	if(street_content != '' && street_content != undefined){
		$(".mask").css("display","block");
		$("#allmap").css("display","block");
		$("#close_map").css("display","block");
		remove_overlay();
		$("#remove_overlay").css("display","block");
		
		var myGeo = new BMap.Geocoder();// 创建地址解析器实例
		myGeo.getPoint(street_content, function(point){// 将地址解析结果显示在地图上,并调整地图视野
 			if(lngForAll != 0 && latForAll != 0 && lngForAll != null && latForAll != null && street_content == street_content_pro){//如果存在数据，构造数据库中取出的点
				point = new BMap.Point(lngForAll, latForAll);
			} 
			if (point) {
				map = new BMap.Map("allmap",{enableMapClick:false,minZoom:6});//创建地图
				addMapControl();//加载控件
				map.centerAndZoom(point,18);
				map.panTo(point);
				var marker=new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{imageOffset: new BMap.Size(0,3)})});
				marker.enableDragging();
				var label=new BMap.Label('拖动改变位置',{offset: new BMap.Size(15,-15)});
				marker.setLabel(label);
				map.addOverlay(marker);
				lng=point.lng;
				lat=point.lat;
				lngForAll=lng;
				latForAll=lat;
				$("#lng").val(lng);
				$("#lat").val(lat);
				
				marker.addEventListener('dragend',function(e){//dragend拖拽结束时触发此事件
					var geoc = new BMap.Geocoder();
					//获取拖动后的坐标位置
					lng=e.point.lng;
					lat=e.point.lat;
					lngForAll=lng;
					latForAll=lat;
					$("#lng").val(lng);
					$("#lat").val(lat);
					
					geoc.getLocation(e.point, function(rs){
						var addComp = rs.addressComponents;
						$("#contactAddr").val(addComp.street+addComp.streetNumber);//设置拖动后的地址
					}); 
				});
			}else{
				var option ={hasTitle:true,title:"提示",btn:''};
				xcconfirm=new window.wxc.xcConfirm("您选择地址没有解析到结果,请手动定位!",window.wxc.xcConfirm.typeEnum.custom,option);
				
				var myGeoForAgain = new BMap.Geocoder();
				myGeoForAgain.getPoint(country, function(pointForAgain){// 将地址解析结果显示在地图上,并调整地图视野
					map.centerAndZoom(pointForAgain,12);
					map.panTo(pointForAgain);
					var marker=new BMap.Marker(pointForAgain,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{imageOffset: new BMap.Size(0,3)})});
					var label=new BMap.Label('拖动改变位置',{offset: new BMap.Size(15,-15)});
					marker.setLabel(label);
					map.addOverlay(marker);
					marker.enableDragging();
					marker.addEventListener('dragend',function(e){//获取拖动后的坐标位置
						var geoc = new BMap.Geocoder();
						lng=e.point.lng;
						lat=e.point.lat;
						$("#lng").val(lng);
						$("#lat").val(lat);
						
						geoc.getLocation(e.point, function(rs){//设置拖动后的地址
							var addComp = rs.addressComponents;
							$("#contactAddr").val(addComp.street+addComp.streetNumber);
						}); 
					});  
				},searchArea);
			}
		}, searchArea);
	}else{
		window.wxc.xcConfirm("请输入详细地址",confirm);
	}
}
	
//根据行政区域下拉框的选择定位到相应的城市
function goToLocation(type){
	//省
	if(type==1)
	{
		var province=$('#province').text();
		map.centerAndZoom(province,8);
	}
	//市
	else if(type==2)
	{
		var city=$('#city').text();
		map.centerAndZoom(city,12);
	}
	//区、县
	else if(type==3)
	{
		var country=$('#county').text();
		map.centerAndZoom(country,15);
	}
	
}
//设置地图事件
function setMapEvent(){
map.enableScrollWheelZoom();
map.enableKeyboard();
map.enableDragging();
map.enableDoubleClickZoom();
}
  
//向地图添加控件
function addMapControl(){
var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
map.addControl(scaleControl);
var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
map.addControl(navControl);
//var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
// map.addControl(overviewControl);
}
  
//地图清除覆盖物
function remove_overlay(){
	map.clearOverlays();         
}

//地图自定义搜索
function custormSearch(){
	function G(id) {
		return document.getElementById(id);
	}
	//建立一个自动完成的对象
	var ac = new BMap.Autocomplete(
	{"input" : "suggestId"
	,"location" : map
	});

	ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
		var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if (e.fromitem.index > -1) {
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
	
		value = "";
		if (e.toitem.index > -1) {
		_value = e.toitem.value;
		value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		G("searchResultPanel").innerHTML = str;
	});

	var myValue;
	ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
		var _value = e.item.value;
		myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
	
		setPlace();
	});

	function setPlace(){
		map.clearOverlays();    //清除地图上所有覆盖物
		function myFun(){
		var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
		map.centerAndZoom(pp, 19);
		map.addOverlay(new BMap.Marker(pp,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{imageOffset: new BMap.Size(0,3)})}));  //添加标注
	}
	var local = new BMap.LocalSearch(map, { //智能搜索
	  onSearchComplete: myFun
	});
	local.search(myValue);
	}
}
/**添加:交易信息、产品信息处的增加
 * add
 * @param e
 * @param i void
 * @author wangjialin
 * 2016-10-14 下午5:10:33
 */
function add(e,i){
	var t=true;
	var flag=true;
	$(e).parents(".item").find(".part").each(function(){
		$(this).find("input[type='text']").each(function(index,obj1){
			if($(obj1).val()==''){
				t=false;
				$(obj1).css("border","1px solid red");
			}else{
				$(obj1).css("border","1px solid #ccc");
			}
		});
		$(this).find(".bankcard").each(function(index,obj2){
			if(!bankcard_reg.test($(obj2).val())){
				flag=false;
				$(obj2).css("border","1px solid red");
			}else{
				$(obj2).css("border","1px solid #ccc");
			}
		});
	});
	if(t){
		switch (i){
			case 1://银行信息
				if(flag){
					var str='<tr class="part">'
								+'<td><span class="hide"></span><input type="text"  value="" class="input_must bankName"></td>'
								+'<td><span class="hide"></span><input type="text"  value="" class="input_must bankcard"></td>'
								+'<td><span class="bluecolor hide"></span><input type="radio" name="setDefault" >设为默认</td>'
								+'<td class="td_operate">'
									+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,1)" class="minus">'
									+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml10 plus" onclick="add(this,1)">'
								+'</td>'
							+'</tr>';
					$("#bankTable").append(str);
					$(e).remove();
					onBlurTest();
				}else{
					$(e).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的开户账号');
					$(e).parents(".item").find(".info_explain").show();
				}
				break;
			case 2://发票信息
				var str='<tr class="part">'
							+'<td><span class="hide"></span><input type="text" value="" placeholder="请输入发票信息"></td>'
							+'<td class="td_operate">'
								+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,2)" class="minus">'
								+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml10 plus" onclick="add(this,2)">'
							+'</td>'
						+'</tr>';
				$("#invoiceTable").append(str);
				$(e).remove();
				onBlurTest();
				break;
			case 3://主要销售产品及品牌
				var parts=$("#goods").children(".part");
				var str='<div class="part">'
							+'<span class="ml70 hide"></span><input type="text" class="editWrapShort input_must" placeholder="产品名称" />'
							+'<span class="ml30 hide"></span><input type="text" class="editWrapShort input_must" placeholder="品牌名称" />'
							+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,3)" class="minus ml10">'
							+'<img src="/vip/resources/images/applyAccess/plus.png" onclick="add(this,3)" class="plus ml10">'
						+'</div>';
				parts.last().after(str);
				$(e).remove();
				onBlurTest();
				break;
			case 4://主要原材料及品牌
				var parts=$("#mateial").children(".part");
				var str='<div class="part">'
							+'<span class="ml70 hide"></span><input type="text" class="editWrapShort input_must" placeholder="材料名称" />'
							+'<span class="ml30 hide"></span><input type="text" class="editWrapShort input_must" placeholder="品牌名称" />'
							+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,4)" class="minus ml10">'
							+'<img src="/vip/resources/images/applyAccess/plus.png" onclick="add(this,4)" class="plus ml10">'
						+'</div>';
				parts.last().after(str);
				$(e).remove();	
				onBlurTest();
				break;
			case 5://主要竞争对手
				var parts=$("#competitor").children(".part");
				var str='<div class="part">'
							+'<span class="ml70 hide"></span><input type="text" class="editWrapShort input_must" placeholder="主要竞争对手" />'
							+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,5)" class="minus ml10">'
							+'<img src="/vip/resources/images/applyAccess/plus.png" onclick="add(this,5)" class="plus ml10">'
						+'</div>';
				parts.last().after(str);
				$(e).remove();
				onBlurTest();
				break;
			case 6://主要客户
				var parts=$("#customer").children(".part");
				var str='<div class="part">'
							+'<span class="ml70 hide"></span><input type="text" class="editWrapShort " placeholder="主要客户" />'
							+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,6)" class="minus ml10">'
							+'<img src="/vip/resources/images/applyAccess/plus.png" onclick="add(this,6)" class="plus ml10">'
						+'</div>';
				parts.last().after(str);
				$(e).remove();
				onBlurTest();
				break;
		}
	}else{
		$(e).parents(".item").find(".info_explain").show();
	}
}

/**规模能力处添加
 * scalepowerAdd
 * @param e
 * @param i void
 * @author wangjialin
 * 2016-10-17 下午1:51:58
 */
function scalepowerAdd(e,i){
	var t=true;
	var v1=$(e).parents(".part").find(".left input").val();
	var v2=$(e).parents(".part").find(".people_num").val();
	if(v1!='' && v2!='')
		t=true;
	else
		t=false;
	if(t){
		switch (i){
			case 1:
				var parts=$("#other_person_con").find(".part");
				if(int_reg.test(v2)){
					var str='<div  class="personCon  clearfix part"><span class="display_wrap hide"></span>'
								+'<div class="posR f_l listWrap" >'
									+'<div class="clearfix left" onclick="showSelect(this)">请选择<input type="hidden" value=""><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
									+'<ul class="otherPeopleList posA hide">'
									+'<li value="1" onclick="selectOption(this)">研发人员</li>'
									+'<li value="2" onclick="selectOption(this)">操作工</li>'
									+'<li value="3" onclick="selectOption(this)">专职检验</li>'
									+'<li value="4" onclick="selectOption(this)">间接员工</li>'
									+'<li value="5" onclick="selectOption(this)">内审人员</li>'
									+'</ul>'
								+'</div>'
								+'<span class="hide"></span><input type="text" autocomplete="off"  class="people_num" ><span>人</span>'
								+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this)" class="minus ml10"><img src="/vip/resources/images/applyAccess/plus.png" onclick="scalepowerAdd(this,1)" class="plus ml10">'
								+'</div>';
					parts.last().after(str);
					$(e).remove();
					onBlurTest();
					if($("#other_person_con").find(".part").length==5){
						$("#other_person_con").find(".part").last().find(".plus").hide();
					}
				}else{
					$(e).parents(".item").find(".info_explain").show();
				}
				break;
			case 2:
				var parts=$("#person_type_con").find(".part");
				if(int_reg.test(v2)){
					var str='<div class="personCon  clearfix part"><span class="display_wrap hide"></span>'
							+'<div class="posR f_l listWrap" >'
								+'<div class="clearfix left" onclick="showSelect(this)">请选择<input type="hidden" value=""><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5 mt5"></div>'
								+'<ul class="personStructureList posA hide">'
								+'<li value="1" onclick="selectOption(this)">大专及以上</li>'
								+'<li value="2" onclick="selectOption(this)">大专以下</li>'
								+'</ul>'
							+'</div>'
							+'<span class="hide"></span><input type="text" autocomplete="off"  class="people_num" ><span>人</span>'
							+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this)" class="minus ml10"><img src="/vip/resources/images/applyAccess/plus.png" onclick="scalepowerAdd(this,2)" class="plus ml10 ">'
							+'</div>';
					parts.last().after(str);
					$(e).remove();
					onBlurTest();
					if($("#person_type_con").find(".part").length==2){
						$("#person_type_con").find(".part").last().find(".plus").hide();
					}
				}else{
					$(e).parents(".item").find(".info_explain").show();
				}
				break;
		}
	}
}

/**设备清单处添加
 * addMachineList
 * @param e void
 * @author wangjialin
 * 2016-10-21 下午4:49:23
 */
function addMachineList(e){
	var  t=true;
	var flag=true;
	var simble=true;
	$("#devicelist").find(".input_must").each(function(){
		if($(this).val()==''){
			$(this).css("border","1px solid red");
			t=false;
		}else{
			$(this).css("border","1px solid #ccc");
		}
	});
	$(e).parents("#devicelist").find(".part").each(function(){
		$(this).find(".input_must").each(function(index,object){
			if($(object).val()==''){
				t=false;
				$(object).css("border","1px solid red");
			}else{
				$(object).css("border","1px solid #ccc");
			}
		});
		if($(this).find(".machinePrice").val()!=''){
			if(!num_reg.test($(this).find(".machinePrice").val())){
				flag=false;
				$(this).find(".machinePrice").css("border","1px solid red");
			}else{
				$(this).find(".machinePrice").css("border","1px solid #ccc");
			}
		}
		if($(this).find(".machineAmount").val()!=''){
			if(!num_reg.test($(this).find(".machineAmount").val())){
				simble=false;
				$(this).find(".machineAmount").css("border","1px solid red");
			}else{
				$(this).find(".machineAmount").css("border","1px solid #ccc");
			}
		}
	});
	
	if(t){
		if(flag){
			if(simble){
				var str='<tr class="part">'
						+'<td><span class="hide"></span><input type="text" class="con_1 machineName input_must" value=""></td>'
						+'<td><span class="hide"></span><input type="text" class="con_2 " value=""></td>'
						+'<td><span class="hide"></span><input type="text" class="con_3 " value=""></td>'
						+'<td><span class="hide"></span><input type="text" class="con_1 machinePrice" value=""></td>'
						+'<td><span class="hide"></span><input type="text" class="con_1 Wdate" onclick="WdatePicker({readOnly:true})"></td>'
						+'<td><span class="hide"></span><input type="text" class="con_3 machineAmount input_must" value=""></td>'
						+'<td><span class="hide"></span><input type="text" class="con_2 " value=""></td>'
						+'<td class="td_operate">'
							+'<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,7)" class="minus ml15">'
							+'<img src="/vip/resources/images/applyAccess/plus.png" class="ml10 plus" onclick="addMachineList(this)">'
						+'</td>'
					+'</tr>';
				$("#devicelist").append(str);
				$(e).parents(".item").find(".info_explain").hide();
				$(e).parents(".part").find(".machineName,.machinePrice,.machineAmount").css("border","1px solid #ccc");
				$(e).remove();
				onBlurTest();
			}else{
				$(e).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备数量');
				$(e).parents(".item").find(".info_explain").show();
//				$(e).parents(".part").find(".machineAmount").css("border","1px solid red");
			}
		}else {
			$(e).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备金额');
			$(e).parents(".item").find(".info_explain").show();
		}
	}else{
		$(e).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和设备数量不可为空');
		$(e).parents(".item").find(".info_explain").show();
//		$(e).parents(".part").find(".machineAmount,.machineName").css("border","1px solid red");
	}
}

/**删除
 * del
 * @param e void
 * @author wangjialin
 * 2016-10-14 下午5:10:14
 */
function del(e,i){
//	switch(i){
//		case 1://银行信息
//			bankAccount_delIds.push($(e).parents(".part").find("input[type=hidden]").val());
//			break;
//		case 2://发票信息
//			invoiceTitle_delIds.push($(e).parents(".part").find("input[type=hidden]").val());
//			break;
//		case 3://销售及品牌
//			goods_delIds.push($(e).parents(".part").find("input[type=hidden]").val());
//			break;
//		case 4://材料及品牌
//			material_delIds.push($(e).parents(".part").find("input[type=hidden]").val());
//			break;
//		case 5://竞争对手
//			competitor_delIds.push($(e).parents(".part").find("input[type=hidden]").val());
//			break;
//		case 6://主要客户
//			customer_delIds.push($(e).parents(".part").find("input[type=hidden]").val());
//			break;
//		case 7://设备清单
//			deviceIds.push($(e).parents(".part").find("input[type=hidden]").val());
//			break;
//		default:
//			break;
//	}
	var num=$(e).parents(".item").find(".part").length;
	var id=$(e).parents(".item").prop("id");
	var id2=$(e).parents(".listShow").prop("id");
	if(num==1){
		if(id=='bankTable' || id=='invoiceTable' || id=='devicelist'){
			$(e).parents(".part").find("input").val("");
			$(e).parents(".part").find("input[type=hidden]").val("-1");
			$(e).parents(".part").find("input").css("border","1px solid #ccc");
			$(e).parents(".item").find(".info_explain").css("display","none");
		}else{
			$(e).parent(".part").find("input").val("");
			$(e).parent(".part").find("input[type=hidden]").val("-1");
			$(e).parent(".part").find("input").css("border","1px solid #ccc");
			$(e).parents(".item").find(".info_explain").css("display","none");
		}
	}else{
		var obj='';
		if($(e).next()!=null){
			obj=$(e).parent().find(".plus").prop("outerHTML");
			$(e).parent(".part").prev().append(obj);
		}
		$(e).parent(".part").remove();
		if(id=='bankTable'){
			$(e).parents(".part").prev().children().last().append(obj);
			$(e).parents(".part").remove();
			$("#"+id).find("tr:last").find(".plus").show();
			var s=true;
			$("#bankTable .input_must").each(function(){
				if($(this).val()!=''){
					$(this).css("border","1px solid #ccc");
				}else{
					s=false;
					$(this).css("border","1px solid red");
					$("#bankTable").next().html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空');
					$("#bankTable").next().show();
				}
			});
			if(s){
				$("#bankTable .bankcard").each(function(){
					if(bankcard_reg.test($(this).val())){
						$(this).css("border","1px solid #ccc");
						$("#bankTable").next().hide();
					}else{
						$(this).css("border","1px solid red");
						$("#bankTable").next().html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的银行账号');
						$("#bankTable").next().show();
					}
				});
			}
		}else if(id=='invoiceTable' ){
			$(e).parents(".part").prev().children().last().append(obj);
			$(e).parents(".part").remove();
			$("#"+id).find("tr:last").find(".plus").show();
			var flag=true;
			$("#"+id).find("input[type='text']").each(function(){
				if($(this).val()!=''){
					$(this).css("border","1px solid #ccc");
				}else{
					flag=false;
					$(this).css("border","1px solid red");
					$("#"+id).next().show();
				}
				if(flag)
					$("#"+id).next().hide();
			});
		}else if(id=='otherperson' || id=='persontype'){
			$("#"+id).find(".personCon:last").find(".plus").show();
		}else if(id2=='goods' || id2=='mateial' || id2=='competitor'||id2=='customer'){
			$("#"+id).find("child:last").find(".plus").show();
			var flag=true;
			$("#"+id2).find("input[type='text']").each(function(){
				if($(this).val()!=''){
					$(this).css("border","1px solid #ccc");
				}else{
					flag=false;
					$(this).css("border","1px solid red");
					$("#"+id2).next().show();
				}
			});
			if(flag)
				$("#"+id2).next().hide();
			
		}else if(id=='devicelist'){
			$(e).parents(".part").prev().children().last().append(obj);
			$(e).parents(".part").remove();
			$("#"+id).find("tr:last").find(".plus").show();
			var t=true;
			$("#devicelist .input_must").each(function(){
				if($(this).val()!=''){
					$(this).css("border","1px solid #ccc");
				}else{
					t=false;
					$("#devicelist").next().html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和设备数量不可为空');
					$("#devicelist").next().show();
				}
			});
			if(t){
				var f=true;
				$("#devicelist .machineAmount").each(function(){
					if(int_reg.test($(this).val())){
						$(this).css("border","1px solid #ccc");
//						$("#machineList .info_explain").hide();
					}else{
						f=false;
						$(this).css("border","1px solid red");
						$("#devicelist").next().html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备数量');
						$("#devicelist").next().show();
					}
				});
			}
			if(f){
				$("#devicelist .machinePrice").each(function(){
					var o=true;
					if($(this).val()!=''){
						if(num_reg.test($(this).val())){
							$(this).css("border","1px solid #ccc");
						}else{
							o=false;
							$(this).css("border","1px solid red");
							$("#devicelist").next().html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备价格');
							$("#devicelist").next().show();
						}
					}else{
						$("#devicelist").next().hide();
					}
					if(o)
						$("#devicelist").next().hide();
				});
			}
		}
		
	}
	
}

/**规模能力处其他人员、人员选择操作时隐藏已选的选项
 * checkChosed void
 * @author wangjialin
 * 2016-12-12 上午10:15:23
 */
function checkChoosed(id,name,index){
	var parts=$("#"+id).find(".part");
	var arr=[];
	for(var j=0;j<parts.length;j++){//将以选择的选项放到数组arr中
		arr[j]=parts.eq(j).find(".left input").val();
	}
	$("#"+id).find(".part").eq(index).find("."+name).find("li").each(function(t,element){//遍历新添加的下拉列表选项，若已选择则将该选项隐藏
		var v=$(element).val();
		for(var k=0;k<arr.length;k++){
			if(v==arr[k]){
				$(element).css("display","none");break;
			}else{
				$(element).css("display","block");
			}
			
		};
	});
}
/**鼠标经过效果
 * mouseOperate void
 * @author wangjialin
 * 2017-2-7 下午1:31:52
 */
function mouseOperate(){
	$(".img_block_pic").mouseover(function(){
		$(this).find(".img_operate").show();
	});
	$(".img_block_pic").mouseleave(function(){
		$(this).find(".img_operate").hide();
	});
}

/**input框onblur 事件
 * onBlurTest void
 * @author wangjialin
 * 2016-10-20 上午9:52:42
 */
function onBlurTest(){
	$(".input_must").on("blur",function(){
		var v=$(this).val();
		var id=$(this).prop("id");
		if(id=='f_phone_edit'){
			if(v!=''){
				if($("#f_phone_edit").val()==''){
					$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">电话号码不可为空');
					$(this).parents(".item").find(".info_explain ").show();
					$("#f_phone_edit").css("border","1px solid red");
				}else{
					var phone=$("#f_phone_edit").val();
					 if(!phone_reg.test(phone)){
						$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的电话号码');
						$(this).parents(".item").find(".info_explain ").show();
						$(this).css("border","1px solid red");
						$("#f_phone_edit").css("border","1px solid red");
					}else{
						$(this).parents(".item").find(".info_explain").hide();
						$("#f_phone_edit").css("border","1px solid #ccc");
					}
				}
			}else{
				$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">电话号码不可为空');
				$(this).parents(".item").find(".info_explain ").show();
				$(this).css("border","1px solid red");
			}
		}else{
			if(v!=''){
				$(this).parents(".item").find(".info_explain").hide();
				$(this).css("border","1px solid #ccc");
			}else{
				$(this).parents(".item").find(".info_explain").show();
				$(this).css("border","1px solid red");
			}
		}
	
});
	$("#contactAddr").on("blur",function(){
		var v=$(this).val();
		var province=$("#province").find("input").val();
		var city=$("#city").find("input").val();
		var county=$("#county").find("input").val();
		if(v!=''){
			if(province==''||city==''||county==''||province==undefined||city==undefined||county==undefined){
				$("#address").find(".info_explain").show();
				$("#province,#city,#county").css("border","1px solid red");
			}else{
				$("#address").find(".info_explain").hide();
				$("#province,#city,#county").css("border","1px solid #ccc");
				$(this).css("border","1px solid #ccc");
			}
		}else{
			$("#address").find(".info_explain").show();
			$(this).css("border","1px solid red");
		}
	});
	$(".machinePrice").on("blur",function(){
		var v=$(this).val();
		if(v!=''){//设备价格不为空
			var name=$(this).parents(".part").find(".machineName").val();
			var amount=$(this).parents(".part").find(".machineAmount").val();
			if(!num_reg.test(v)){//设备价格填写错误
				$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的金额');
				$(this).parents(".item").find(".info_explain ").show();
				$(this).css("border","1px solid red");
			}else{//设备价格填写正确
				if(name=='' ||amount==''){
					$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
					$(this).parents(".item").find(".info_explain ").show();
					$(this).parents(".part").find(".machineName,.machineAmount").css("border","1px solid red");
					$(this).css("border","1px solid #ccc");
				}else{
					if(!int_reg.test(amount)){
						$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备数量');
						$(this).parents(".item").find(".info_explain ").show();
						$(this).css("border","1px solid #ccc");
						$(this).parents(".part").find(".machineAmount").css("border","1px solid red");
					}else{
						$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
						$(this).parents(".item").find(".info_explain ").hide();
						$(this).css("border","1px solid #ccc");
						$(this).parents(".part").find(".machineName,.machineAmount").css("border","1px solid #ccc");
					}
				}
			}
			
		}
	});
	$(".machineName").on("blur",function(){
		if($(this).val()!=''){//设备名称不为空
			if($(this).parents(".part").find(".machineAmount").val()==''){
				$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
				$(this).parents(".item").find(".info_explain ").show();
				$(this).parents(".part").find(".machineAmount").css("border","1px solid red");
			}else{
				if(!int_reg.test($(this).parents(".part").find(".machineAmount").val())){
					$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备数量');
					$(this).parents(".item").find(".info_explain ").show();
					$(this).parents(".part").find(".machineAmount").css("border","1px solid red");
				}else{
					if($(this).parents(".part").find(".machinePrice").val()!=''){
						if(!num_reg.test($(this).parents(".part").find(".machinePrice").val())){
							$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备金额');
							$(this).parents(".item").find(".info_explain ").show();
							$(this).parents(".part").find(".machinePrice").css("border","1px solid red");
						}else{
							$(this).parents(".item").find(".info_explain").hide();
							$(this).css("border","1px solid #ccc");
							$(this).parents(".part").find(".machinePrice,.machineAmount").css("border","1px solid #ccc");
						}
					}else{
						$(this).parents(".item").find(".info_explain").hide();
						$(this).css("border","1px solid #ccc");
						$(this).parents(".part").find(".machineAmount").css("border","1px solid #ccc");
					}
				}
			}
		}else{
			$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
			$(this).parents(".item").find(".info_explain ").show();
			$(this).css("border","1px solid red");
		}
	});
	$(".machineAmount").on("blur",function(){
		if($(this).val()!=''){
			if($(this).parents(".part").find(".machineName").val()==''){
				$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
				$(this).parents(".item").find(".info_explain ").show();
				$(this).parents(".part").find(".machineName").css("border","1px solid red");
			}else{
				if(!int_reg.test($(this).val())){
					$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备数量');
					$(this).parents(".item").find(".info_explain ").show();
					$(this).css("border","1px solid red");
				}else{
					if($(this).parents(".part").find(".machinePrice").val()!=''){
						if(!num_reg.test($(this).parents(".part").find(".machinePrice").val())){
							$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的设备金额');
							$(this).parents(".item").find(".info_explain ").show();
							$(this).parents(".part").find(".machinePrice").css("border","1px solid red");
						}else{
							$(this).parents(".item").find(".info_explain").hide();
							$(this).css("border","1px solid #ccc");
							$(this).parents(".part").find(".machineName,.machinePrice").css("border","1px solid #ccc");
						}
					}else{
						$(this).parents(".item").find(".info_explain").hide();
						$(this).css("border","1px solid #ccc");
						$(this).parents(".part").find(".machineName").css("border","1px solid #ccc");
					}
				}
			}
		}else{
			$(this).parents(".item").find(".info_explain ").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">设备名称和数量不可为空');
			$(this).parents(".item").find(".info_explain ").show();
			$(this).css("border","1px solid red");
		}
	});
	$("#m_phone_edit").on("blur",function(){
		if($(this).val()!=''){
			if(!mphone_reg.test($(this).val())){
				$(this).next().show();
			}else{
				$(this).next().hide();
				$(this).css("border","1px solid #ccc");
			} 
		}else{
			$(this).next().hide();
		}
	});
	$("#email_edit").on("blur",function(){
		if($(this).val()!=''){
			if(!email_reg.test($(this).val()))
				$(this).next().show();
			else 
				$(this).next().hide();
		}else{
			$(this).next().hide();
		}
	});
	$(".people_num").on("blur",function(){
		if($(this).val()!=''){
			if(!int_reg.test($(this).val())){
				$(this).parents(".item").find(".info_explain").show();
				$(this).css("border","1px solid red");				
			}else {
				$(this).parents(".item").find(".info_explain").hide();
				$(this).css("border","1px solid #ccc");	
			}
		}else {
			$(this).parents(".item").find(".info_explain").hide();
			$(this).css("border","1px solid #ccc");	
		}
			
	});
	$(".money_num").on("blur",function(){
		if($(this).val()!=''){
			if(!num_reg.test($(this).val())){
				$(this).css("border","1px solid red");
				$(this).parents(".item").find(".info_explain").show();
			}else{
				$(this).css("border","1px solid #ccc");
				$(this).parents(".item").find(".info_explain").hide();
			}
		}else {
			$(this).css("border","1px solid #ccc");
			$(this).parents(".item").find(".info_explain").hide();
		}
	});
	$(".size_test").on("blur",function(){
		if($(this).val()!=''){
			if(!num_reg.test($(this).val())){
				$(this).css("border","1px solid red");
				$(this).parents(".item").find(".info_explain").show();
			}else{
				$(this).css("border","1px solid #ccc");
				$(this).parents(".item").find(".info_explain").hide();
			}
		}else {
			$(this).css("border","1px solid #ccc");
			$(this).parents(".item").find(".info_explain").hide();
		}
	});
	$(".bankcard").on("blur",function(){
		if($(this).val()!=''&& $(this).parent().prev().find("input").val()!=''){
			if(!bankcard_reg.test($(this).val())){
				$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的开户账号');
				$(this).parents(".item").find(".info_explain").show();
				$(this).css("border","1px solid red");
			}else{
				$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空');
				$(this).parents(".item").find(".info_explain").hide();
				$(this).css("border","1px solid #ccc");
				$(this).parent().prev().find("input").css("border","1px solid #ccc");
			}
		}else{
			$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空');
			$(this).parents(".item").find(".info_explain").show();
			$(this).css("border","1px solid red");
			$(this).parent().prev().find("input").css("border","1px solid red");
		}
	});
	$(".bankName").on("blur",function(){
		if($(this).val()!=''&& $(this).parent().next().find("input").val()!=''){
			if(!bankcard_reg.test($(this).parent().next().find("input").val())){
				$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的开户账号');
				$(this).parents(".item").find(".info_explain").show();
				$(this).parent().next().find("input").css("border","1px solid red");
			}else{
				$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空');
				$(this).parents(".item").find(".info_explain").hide();
				$(this).css("border","1px solid #ccc");
				$(this).parent().next().find("input").css("border","1px solid #ccc");
			}
		}else{
			$(this).parents(".item").find(".info_explain").html('<img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空');
			$(this).parents(".item").find(".info_explain").show();
			$(this).css("border","1px solid red");
			$(this).parent().next().find("input").css("border","1px solid red");
		}
	});
	$("#customer .editWrapShort ").on("blur",function(){
		if($(this).val()!=''){
			$("#customer").next().hide();
			$(this).css("border","1px solid #ccc");
		}
	});
	$("#invoiceTable input[type=text] ").on("blur",function(){
		if($(this).val()!=''){
			$("#invoiceTable").next().hide();
			$(this).css("border","1px solid #ccc");
		}
	});
	$('input[type=radio][name=certification]').change(function() {
		var obj=$(this).parents(".display_inner_line_wrap").next();
		var resource=obj.children().eq(0).find("img").prop("src");
        if (this.value ==0) {
        	$(".otherCertification").hide();
        	obj.children().hide();
        }else if(this.value ==3){
        	$(".otherCertification").show();
        	if(resource.indexOf("notexist")==-1){
        		obj.children().eq(0).show();
        		obj.find(".uploadCertification").hide();
        	}else{
        		obj.find(".uploadCertification").show();
        		obj.children().eq(0).hide();
        	}
        }else{
        	$(".otherCertification").hide();
        	if(resource.indexOf("notexist")==-1){
        		obj.children().eq(0).show();
        		obj.find(".uploadCertification").hide();
        	}else{
        		obj.find(".uploadCertification").show();
        		obj.children().eq(0).hide();
        	}
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
	var x=400-num;
	if(x<0){
		var char = $(obj).val();
		var content = char.slice(0,400);
		$(obj).val(content);
		$(obj).next().find(".residue").html(0);
	}else{
		$(obj).next().find(".residue").html(x);	
	}
} 
