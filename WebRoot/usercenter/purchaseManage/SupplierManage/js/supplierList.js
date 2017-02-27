var pageSize=5;//每页个数
var currentPage = 0;//当前页数
var checkList = null;//验厂周期基础数据
var tagList = null;//可用标签基础数据
var checkFacList = null;//可用验厂周期基础数据
var supplierListData = null;//供应商数据
var cycShowTop = -1;//验厂周期基础数据显示Top值
var tagShowTop = -1;//标签基础数据显示Top值
var fid=null;//父级目录id
var companyId = getParamFromWindowName("companyIdForAll");
var crrentAccountInfo = null;//当前账号信息
var fileStatus = 0;//当前供应商状态 //0：合格供应商；1：备选供应商；2 : 淘汰供应商；
var ownAllTagFlag = 0;//0:没有 1：拥有
var tabNumTag;//供应商当前状态
var tagIdForFilter;//被点击标签的Id
var paginationFlag=false;//默认没有加载过分页控件
var goBack = false;//是否为资质变更返回页面
var delSupplierIds = [];//删除供应商ID数组
var inviteSuppliersData = [];//邀请供应商的批量信息
var supplierIdsForCheckCyc = [];//供应商验厂周期supplierIds
var examptSupplierIds = [];//批量淘汰supplierIds
var provinceCodes = [];//查询中的纯省份代码数组
var cityCodes = [];//查询中的纯市级代码数组
var categoryList = [];//采购分类列表

/**
 * 页面加载事件
 * loadCommonPage void
 * @author yangliping
 * 2016-7-7 15:09:38
 */
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
		selectAddress();//地址加载
		getPurchaseCategory();//SelectSort();//采购分类加载
		loadBasicCheckFacData();//验厂基本信息
		loadBasicTagData();//标签基本信息
		showTagManager();//展示标签管理处表签
		var tabId=getParamFromWindowName("tabId");
		var tabNum=getParamFromWindowName("tabNum");
		var inviteStatus = getParamFromWindowName("inviteStatus");
		if(inviteStatus!=undefined){
			$("#inviteStatusSelect").val(inviteStatus);
			$("#inviteStatusSelect").prev().text($("#inviteStatusSelect").find("option:selected").text());
		}
		if(tabId==undefined){
			tabId="#supplierList";
		}
		if(tabNum==undefined || tabNum==""){
			tabNum=0;
			}
		var quaChange =  getParamFromWindowName("qualificationChange");//是否为资质变更页面跳转过来
		if(quaChange == "yes"){//是
			tabNum = getParamFromWindowName("tabNumChange");
			currentPage = getParamFromWindowName("currentPage");
			goBack = true;
		}
		currtab(tabId, tabNum);
});
//获取采购类目树
function getPurchaseCategory(natureId){
	var url="purchaseCategory/getPurchaseCategoryTree2Json.do";
	var params={};
	params.nature_id=natureId;
	var fn=function(result){
		var item="";
		for(var i=0;i<result.data.length;i++){
			if(result.data[i].children != null){
			item+='<li>'
					+'<span class="sort">'+result.data[i].text+'<input onclick="checkBoxEvent(this)"  type="checkbox" class="ml10"/><input type="hidden" value="'+result.data[i].id+'"/><input type="hidden" value="'+result.data[i].leaf+'"/></span>'
					+ietmMontage(result.data[i])
				+'</li>';
			}else{
				item+='<li>'
					+'<span style="display:inline-block;margin-left:16px;">'+result.data[i].text+'<input onclick="checkBoxEvent(this)" type="checkbox" class="ml10"/><input type="hidden" value="'+result.data[i].id+'"/><input type="hidden" value="'+result.data[i].leaf+'"/></span>'
				+'</li>';
			}
		}
		$("#sortTree").html(item);
		$("#sortTree").treeview({
		  persist: "location",
		  collapsed: true,
		  unique: true
		 });
		$('.productSort_mid').niceScroll({
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
}
function ietmMontage(data){
	var item="";
	if (data.children != null) {
		for (var j = 0; j < data.children.length; j++) {
			if(data.children[j].children != null){
			item+='<ul>'
						+'<li>'
							+'<span class="sort">'+data.children[j].text+'<input onclick="checkBoxEvent(this)"  type="checkbox" class="ml10"/><input type="hidden" value="'+data.children[j].id+'"/><input type="hidden" value="'+data.children[j].leaf+'"/></span>'
							+ietmMontage(data.children[j])
						+'</li>'
					+'</ul>';
			}else{
				item+='<ul>'
					+'<li>'
						+'<img src="/newresources/js/treegrid/images/empty.png"><span style="display:inline-block;">'+data.children[j].text+'<input onclick="checkBoxEvent(this)" type="checkbox" class="ml10"/><input type="hidden" value="'+data.children[j].id+'"/><input type="hidden" value="'+data.children[j].leaf+'"/></span>'
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
		$("#sort .optionChoosed li").remove();
		$("#sort .optionChoosed").append('<li class="ml10 f_l">'+str+'</li>');
		judgeDivHeight("#sort .select_content");
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
/**展示采购分类选择
 * sortSave void
 * @author wangjialin
 * 2016-9-29 上午10:19:59
 */
function sortSave(){
	categoryList = [];
	var con=$("#sort .optionChoosed li").text();
	if(con.length==0){
		$("#sort .select_content").hide();
	}else{
		var txtShow=con.substring(0,6);
		var lastChar=txtShow.substring(txtShow.length-2,txtShow.length-1);
		if(lastChar==','||lastChar=="(")
			item=txtShow.substring(0,9)+"...";
		else
			item=txtShow.substring(0,7)+"...";
		$("#sort .purchaseSort").html(item);
		$("#sort .select_content").hide();
		judgeDivHeight("#sort .select_content");
	}
	
	$("#sortTree").find("input:checkbox:checked").each(function(index){//遍历已勾选的分类
		if($(this).parent().find("input").eq(2).val() == "true"){
			categoryList.push($(this).next("input").val());
		}
	});
}
/**
 * 地址选择
 * @author wangjialin
 * 2016-8-8 下午3:37:50
 */
function selectAddress(){
	//加载省
	province=ChineseDistricts[86];
	$.each(province,function(code,address){
		var li="<li value='"+code+"' id='"+address+"'><input type='checkbox' class='"+address+"' value='"+address+"'>&nbsp;"+address+"</li>";
		$("#province").append(li);
	});
	//加载市
	$("#province li").click(function(){
		$("#province li").removeClass("active");
		$(this).addClass("active");
		$("#city").css("background","#f6f6f6");
		var province_code=$(this).val();
		var province_add=$(this).prop("id");
		if(province_code!=null&&province_code!='0'){
			$("#city").css("display","block");
			city=ChineseDistricts[province_code];
			if(city!=null&&city!=undefined){//有子级
				$("#city li").remove(); 
				if($(this).find("input").prop("checked")==true|| $(this).find("input").prop("indeterminate")==true){
					$.each(city,function(code,address){
						if(testChecked(province_add,address))
							var li="<li id='"+address+"' value='"+code+"'><input type='checkbox' checked='checked' class='"+address+"' value='"+address+"' onchange='citySelectChange(this)'>&nbsp;"+address+"</li>";
						else
							var li="<li id='"+address+"' value='"+code+"'><input type='checkbox' class='"+address+"' value='"+address+"' onchange='citySelectChange(this)'>&nbsp;"+address+"</li>";
						$("#city").append(li);
					});
				}else{
					$.each(city,function(code,address){
						var li="<li id='"+address+"' value='"+code+"'><input type='checkbox' class='"+address+"' value='"+address+"' onchange='citySelectChange(this)'>&nbsp;"+address+"</li>";
						$("#city").append(li);
					});
				}
			}else{//无子级
				$("#city").css("display","none");
			}
		}
	});
	
	/**
	 *选择省份
	 * @author wangjialin
	 * 2016-8-8 下午3:37:50
	 */
	$("#province li input").change(function(){
		var province=$(this).val();
		var code=$(this).parent().val();
		if($(this).is(':checked')) {
			$("#address .optionChoosed #"+province).remove();
			var str="<li id="+province+">"+province+"<input type='hidden' value="+code+">"+"<img src='/newresources/images/supplier/X.png' onclick='delSortChoosed(this)'><ul class='citiesChoosed'></ul></li>";
			$(this).parents(".select_content").find(".optionChoosed").append(str);
			judgeDivHeight('#address .select_content');
			$("#city li input").prop("checked",true);
		}else{
			$("#"+province).find("input").prop("checked",false);
			$("#address .optionChoosed").find("#"+province).remove();
		}
	});
}
/**
 *选择城市
 * @author wangjialin
 * 2016-8-8 下午3:37:50
 */
function citySelectChange(e){
	var city=$(e).val();
	var province=$(".active input").val();
	var provinceCode=$(".active").val();
	var t=$(e).parents(".select_content").find(".optionChoosed");
	var flag=t.find("#"+province).text().length;
	var str="<li id="+province+">"+province+"<input type='hidden' value="+provinceCode+">"+"<img src='/newresources/images/supplier/X.png' onclick='delSortChoosed(this)'><ul class='citiesChoosed'></ul></li>";
	var l1=$("#city li input").length;
	var l2=$("#city li input[type=checkbox]:checked").length;
	var item='';
	if($(e).is(':checked')){
		if(flag==0){
			t.append(str);
		}
		if(l1>l2 && l2!=0){
			items=item+"<li>(</li>";
			$("#city li input").each(function(){
				var code=$(this).parent().val();
				var city=$(this).val();
				if($(this).is(':checked')){
					items+="<li id="+city+">"+city+"<input type='hidden' value="+code+">"+"<img src='/newresources/images/supplier/X.png' onclick='delCityChoosed(this)'></li>";
				}
			});
			items+="<li>)</li>";
			$("#"+province).find(".citiesChoosed").html(items);
			judgeDivHeight('#address .select_content');
			$("#province .active").find("input").prop("indeterminate",true);
		}else{
			$("#"+province).find(".citiesChoosed li").remove();
			$("#province .active").find("input").prop("indeterminate",false);
			$("#province .active").find("input").prop("checked",true);
		}
	}
	if(!$(e).is(':checked')){
		if(flag==0){
			t.append(str);
		}
		if(t.find("#"+province).text().indexOf("(")==-1){
			if(l1>l2 && l2!=0){
				items=item+"<li>(</li>";
				$("#city li input").each(function(){
					var code=$(this).parent().val();
					var city=$(this).val();
					if($(this).is(':checked')){
						items+="<li id="+city+">"+city+"<input type='hidden' value="+code+">"+"<img src='/newresources/images/supplier/X.png' onclick='delCityChoosed(this)'></li>";
					}
				});
				items+="<li>)</li>";
				$("#"+province).find(".citiesChoosed").html(items);
				judgeDivHeight('#address .select_content');
				$("#province .active").find("input").prop("indeterminate",true);
			}
		}
		if(l2==0){
			$(".optionChoosed").find("#"+province).remove();
			$("#province .active").find("input").prop("indeterminate",false);
			$("#province").find("."+province).prop("checked",false);
		}else{
			$(".optionChoosed").find("#"+city).remove();
		}
	}
}
/**判断城市是否是之前选中的
 * testChecked
 * @param province
 * @param city
 * @returns {Boolean} Boolean
 * @author wangjialin
 * 2016-9-27 下午4:32:49
 */
function testChecked(province,city){
	var f=$("#address .optionChoosed").find("#"+province).find(".citiesChoosed").find("#"+city).text().length;
//	var f1=$("#address .optionChoosed").find("#"+province).find(".citiesChoosed").find("#"+city).prop("display");
	var f2=$("#address .optionChoosed").find("#"+province).find(".citiesChoosed").text().length;
	if(f>0 ||f2==0)
		return true;
	else
		return false;
	
}
/**不限地址
 * noLimitAddress void
 * @author wangjialin
 * 2016-9-29 上午9:54:24
 */
function noLimitAddress(){
	$("#address .optionChoosed").html("");
	$("#address .addressSelect").html("地址选择<img src='/newresources/images/switchover.png' style='margin-left:75px'>");
	$("#address #province li input").prop("checked",false);
	$("#address #province li input").prop("indeterminate",false);
	$("#address #city li input").prop("checked",false);
	
	provinceCodes = [];//查询中的纯省份代码数组
	cityCodes = [];//查询中的纯市级代码数组
}
/**不限类目
 * noLimitSort void
 * @author wangjialin
 * 2016-9-29 下午2:13:03
 */
function noLimitSort(){
	$("#sort .optionChoosed").html("");
	$("#sort .purchaseSort").html("采购分类<img src='/newresources/images/switchover.png' style='margin-left:10px'>");
	$("#sort #sortTree input").prop("checked",false);
	$("#sort #sortTree input").prop("indeterminate",false);
	
	categoryList = [];
}
/**
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * loadCommonPage void
 * @author yangliping
 * 2016-7-7 15:09:46
 */
function loadCommonPage(){
	$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success")
			{
				$("#mainNav").children().eq(0).addClass("curr");
				getCompanyList(companyId);
				companyId=$("#company").val();
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

/**
 * 装载数据
 * loadData 
 * @author mishengliang
 * 2016-7-29 下午2:03:55
 */
function loadData(pageIndex,needinit,inSeach){
	currentPage=pageIndex;
	var params = {};
	params.usePaging=false;
	params.page=currentPage;
	params.limit=pageSize;
	params.tagId = tagIdForFilter;
	
	var minScore = $("#minScore").val();
	var maxScore = $("#maxScore").val();
	var complexKey = $("#complexKey").val();
	var inviteStatus = $("#inviteStatusSelect").val();
	var purchaseNature = $("#purchaseNatureSelect").val();
	params.minScore = minScore;
	params.maxScore = maxScore;
	params.complexKey = complexKey;
	params.inviteStatus = inviteStatus;
	params.provinceCodes = provinceCodes.join(",");
	params.cityCodes = cityCodes.join(",");
	params.purchaseNature = purchaseNature;
	params.categoryList = categoryList.join(",");
	
	commonLoadData(params,pageIndex,needinit);
}

/**
 * 公用加载数据方法
 * commonLoadData
 * @param params void
 * @author mishengliang
 * 2016-8-18 上午9:24:52
 */
function commonLoadData(params,pageIndex,needinit){
	params.companyId = companyId;
	params.fileStatus = fileStatus;//0：合格供应商；1：备选供应商；2 : 淘汰供应商；
	
	var url = "supplierFiles/getSupplierFilseByOwnerId.do";
	var isasync = true;
	var fn = function(result){
		initData(result,pageIndex,needinit);
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

/**
 * 初始化分页控件
 */
function initPagination(totalCount){
	$("#pagination").pagination(totalCount, {
         callback: pageselectCallback,
         prev_text: "<",
         next_text: ">",
         items_per_page: pageSize, //每页的数据个数
         num_display_entries: 3, //两侧首尾分页条目数
         current_page: currentPage,   //当前页码
         num_edge_entries: 2 //连续分页主体部分分页条目数
     });
}

/**翻页调用  
*/
function pageselectCallback(index,jq)
{
	loadData(index,false);
}

function initData(result,pageIndex,needinit){
	var suppliersInfoData = result.data;
	var supplierTotal = 0;
	if(typeof(result.supplierTotal) != "undefined"){
		supplierTotal = result.supplierTotal;
	}
	//if(pageIndex==0 && needinit){//第一次加载时加载分页控件
	if(paginationFlag==false && needinit){//第一次加载时加载分页控件
		initPagination(supplierTotal);//分页插件
		paginationFlag = true;
	}
	
	if(fileStatus == 0){//现有供应商
		nowSupplierShow(supplierTotal,suppliersInfoData);
	}else if(fileStatus == 1){//备选供应商
		optionSupplierShow(supplierTotal,suppliersInfoData);
	}else if(fileStatus == 2){//淘汰供应商
		eliminateSupplierShow(supplierTotal,suppliersInfoData);
	}
	loadDefalutTake();
}

/**
 * 跳转到企业门户
 * toCpWindow
 * @param companyId void
 * @author mishengliang
 * 2016-9-10 上午9:43:42
 */
function toCpWindow(companyId){
	var params = {companyIdForWindow:companyId};
	addParamsToWindowName(params);
	window.location.href=getwebroot()+"supplierForPlateForm/companyWindow.htm";
}

/**
 * 现有供应商渲染
 * nowSupplierShow
 * @param supplierTotal 列表中供应商总数
 * @param suppliersInfoData 供应商信息
 * @author mishengliang
 * 2016-8-20 上午10:56:08
 */
function nowSupplierShow(supplierTotal,suppliersInfoData){
	$("#totalNum").html(supplierTotal);
	supplierListData = suppliersInfoData;
	
	$("#supplierListShow").html("");
	var supplierShow = "<tr>"
							+"<th>供应商信息</th>"
							+"<th>供货信息</th>"
							+"<th>准入信息</th>"
							+"<th>验厂</th>"
							+"<th>操作</th>"
						+"</tr>";
	for(var i in suppliersInfoData){//遍历数据并渲染
		var supplierInfo = suppliersInfoData[i];
		var checkMaterial;
		if(supplierInfo.material.length>0){
			checkMaterial="<div class='mt10'><img  src='/newresources/images/sale/s2.png' >&nbsp;<a class='blue' onClick='checkMaterial("+ supplierInfo.supplier_id +")'>物料确认</a></div>";
		}else{
			checkMaterial="";
		}
		supplierShow += "<tr class='tr_companyName'>"
					+"<td class='left bg_lightYellow tr_companyName posR' colspan='5'>"
						+"<input type='checkbox' value='' name='checkbox'  class='f_l' onclick='isAllSelect(\"supplierListShow\",\"selectAllForNow\")'/>"
						+"<span class='span_companyName f_l ml4' onclick='toCpWindow("+ supplierInfo.company_id +")'>"+ replaceNullAsStr(supplierInfo.supplier_cpyname) +"</span>"
						+isOwnerSupplier(supplierInfo.owner_id)//添加供应商标签
						+isAuthUpdate(supplierInfo)//资质变更
						+"<span class='f_r mr8'>准入时间："+ replaceNullAsStr(supplierInfo.auth_dt) +"</span>"
					+"</td>"
				+"</tr>"
				+"<tr class='border_bottom_dashed tr_content'>"
					+"<td class='pt15' valign='top' ><div class='con1'>"
						+"<span>"+ replaceNullAsStr(supplierInfo.corporation) +"&nbsp;"+ replaceNullAsStr(supplierInfo.m_phone) +"</span>"
						+"<div class='mt10'>"+ getCityAndProvStrByCode(supplierInfo.contact_addr_code) + replaceNullAsStr(supplierInfo.contact_addr) +"</div>"
					+"</div></td>"
					+"<td class='pt15' valign='top'><div class='con2'>"
						+supplierCategory(supplierInfo)//供货类别
					+"</div></td>"
					+"<td class='pt15' valign='top'><div class='con3'>"
						+"<img  src='/newresources/images/supplier/file.png'>&nbsp;<a class='blue' onClick='queryInfo("
						+ supplierInfo.record_id +","
						+ supplierInfo.supplier_id +",\""
						+ supplierInfo.supplier_cpyname +"\","
						+ supplierInfo.company_id +")' >供应商档案</a><br>"
						+checkMaterial
					+"</div></td>"
					+"<td class='left pt15' valign='top'><div class='con4'>"
						+"<div class='factoryCheck mb10 posR' >"
							+supplierCheckFacInfo(supplierInfo)//验厂信息
						+"</div>"
					+"</div></td>"
					+"<td class='left pt15' valign='top'><div class='con5'>"
					+isClickEliminateShow(supplierInfo.owner_id)//设置点击方式
					+"</div></td>"
				+"</tr>"
				+"<tr>"
					+"<td colspan='6'  class='left allTag' >"
						+"<div class='posR f_l update' >"
							+"<input type='hidden' class='supplierIdData' value='"+ supplierInfo.supplier_id +"'>"//添加供应商ID做标记
							//+"<img src='/newresources/images/supplier/tag.png' >"
							+isClickTagShow(supplierInfo.owner_id)//设置点击方式
						+"</div>"
						+"<div class='tagsChecked f_l'>"
							+ showSupplierTag(supplierInfo)
						+"</div>"
					+"</td>"
				+"</tr>";
	}
	$("#supplierListShow").html(supplierShow);
}

/**
 * 备选渲染
 * optionSupplierShow
 * @param supplierTotal
 * @param suppliersInfoData void
 * @author mishengliang
 * 2016-8-20 上午11:02:00
 */
function optionSupplierShow(supplierTotal,suppliersInfoData){
	$("#optionTotalNum").html(supplierTotal);
	supplierListData = suppliersInfoData;
	
	$("#optionSupplierShow").html("");
	var supplierShow = "<tr>"
							+"<th>供应商信息</th>"
							+"<th>供货信息</th>"
							+"<th>来源</th>"
							+"<th>邀请状态</th>"
							+"<th>操作</th>"
						+"</tr>";
	for(var i in suppliersInfoData){//遍历数据并渲染
		var supplierInfo = suppliersInfoData[i];
		supplierShow += "<tr class='tr_companyName'>"
					+"<td class='left bg_lightYellow tr_companyName posR' colspan='5'>"
						+"<input type='checkbox' value='' name='checkbox'  class='f_l' onclick='isAllSelect(\"optionSupplierShow\",\"selectAllForOption\")'/>"
						+"<span class='span_companyName f_l ml4' onclick='toCpWindow("+ supplierInfo.company_id +")'>"+ supplierInfo.supplier_cpyname +"</span>"
						+isAuthUpdate(supplierInfo)//资质变更
						+"<span class='f_r mr8'>备选时间："+ supplierInfo.create_dt +"</span>"
					+"</td>"
				+"</tr>"
				+"<tr class='border_bottom_dashed tr_content'>"
					+"<td class=' pt15' valign='top' ><div class='con1'>"
						+"<span>"+ replaceNullAsStr(supplierInfo.corporation) +"&nbsp;"+ replaceNullAsStr(supplierInfo.m_phone) +"</span>"
						+"<div class='mt10'>"+ getCityAndProvStrByCode(supplierInfo.contact_addr_code) + replaceNullAsStr(supplierInfo.contact_addr) +"</div>"
					+"</div></td>"
					+"<td class=' pt15' valign='top'><div class='con2'>"
						+supplierCategory(supplierInfo)//供货类别
					+"</td>"
					+"<td class=' pt15' valign='top'><div class='con3_1'>"
						+supplierFromShow(supplierInfo)
					+"</div></td>"
					+"<td class=' pt15' valign='top'><div class='con4'>"
						+accessStatuShow(supplierInfo)
					+"</div></td>"
					+"<td class=' pt15' valign='top'><div class='con5_1'>"
						+isOverTime(supplierInfo)
						+"<div class=''><a class='blue deleteSupplier'>删除</a></div>"
					+"</div></td>"
				+"</tr>"
				+"<tr>"
					+"<td colspan='6'  class='left allTag' >"
						+"<div class='posR f_l update'  >"
							+"<input type='hidden' class='supplierIdData' value='"+ supplierInfo.supplier_id +"'>"//添加供应商ID做标记
							//+"<img src='/newresources/images/supplier/tag.png' >"
							+isClickTagShow(supplierInfo.owner_id)//设置点击方式
						+"</div>"
						+"<div class='tagsChecked f_l'>"
							+ showSupplierTag(supplierInfo)
						+"</div>"
					+"</td>"
				+"</tr>";
	}
	$("#optionSupplierShow").html(supplierShow);
}

/**
 * 淘汰供应商渲染
 * eliminateSupplierShow
 * @param supplierTotal
 * @param suppliersInfoData void
 * @author mishengliang
 * 2016-8-20 上午11:01:37
 */
function eliminateSupplierShow(supplierTotal,suppliersInfoData){
	$("#eliminateTotalNum").html(supplierTotal);
	supplierListData = suppliersInfoData;

	$("#eliminateSupplierShow").html("");
	var supplierShow = "<tr>"
							+"<th>供应商信息</th>"
							+"<th>淘汰原因</th>"
							+"<th>操作</th>"
						+"</tr>";
	for(var i in suppliersInfoData){//遍历数据并渲染
		var supplierInfo = suppliersInfoData[i];
		supplierShow += "<tr class='tr_companyName'>"
					+"<td class='left bg_lightYellow tr_companyName posR' colspan='5'>"
						+"<input type='checkbox' value='' name='checkbox'  class='f_l' onclick='isAllSelect(\"eliminateSupplierShow\",\"selectAllForEliminate\")'/>"
						+"<span class='span_companyName f_l ml4' onclick='toCpWindow("+ supplierInfo.company_id +")'>"+ replaceNullAsStr(supplierInfo.supplier_cpyname) +"</span>"
						+isAuthUpdate(supplierInfo)//资质变更
						+"<span class='f_r mr8'>淘汰时间："+ replaceNullAsStr(supplierInfo.outSupplier.create_dt) +"</span>"
					+"</td>"
				+"</tr>"
				+"<tr class='border_bottom_dashed tr_content'>"
					+"<td class='pt15' valign='top' ><div class='con1'>"
						+"<span>"+ replaceNullAsStr(supplierInfo.corporation) +"&nbsp;"+ replaceNullAsStr(supplierInfo.m_phone) +"</span>"
						+"<div class='mt10'>"+ getCityAndProvStrByCode(supplierInfo.contact_addr_code) + replaceNullAsStr(supplierInfo.contact_addr) +"</div>"
					+"</div></td>"
					+"<td class='pt15' valign='top'><div class='con2'>"
						+"<div>"+ replaceNullAsStr(supplierInfo.outSupplier.out_reason) +"</div>"
					+"</div></td>"
					+"<td class='pt15 center' valign='top'>"
						+"<a class='blue deleteSupplier'>删除</a>"
					+"</td>"
				+"</tr>"
				+"<tr>"
					+"<td colspan='6'  class='left allTag' >"
						+"<div class='posR f_l update'  >"
							+"<input type='hidden' class='supplierIdData' value='"+ supplierInfo.supplier_id +"'>"//添加供应商ID做标记
							//+"<img src='/newresources/images/supplier/tag.png' >"
							+isClickTagShow(supplierInfo.owner_id)//设置标签点击方式
						+"</div>"
						+"<div class='tagsChecked f_l'>"
							+ showSupplierTag(supplierInfo)
						+"</div>"
					+"</td>"
				+"</tr>";
	}
	$("#eliminateSupplierShow").html(supplierShow);
}

/**
 * 给当前公司的供应商添加标记位
 * isOwnerSupplier
 * @param ownerId
 * @returns {String} String
 * @author mishengliang
 * 2016-8-12 上午10:08:21
 */
function isOwnerSupplier(ownerId){
	var supplierFlag = "";
	if(ownerId == companyId){//自己的供应商
		supplierFlag += "<img class='ml10 f_l' src='/newresources/images/supplier/seal.png'>";
	}
	return supplierFlag;
}

/**
 * 标志资质是否变更
 * isAuthUpdate
 * @param isAuthUpdated
 * @returns {String} String
 * @author mishengliang
 * 2016-8-17 上午10:24:58
 */
function isAuthUpdate(supplierInfo){
	var updateShow = "";
	if(supplierInfo.is_auth_updated == 1 && supplierInfo.authchange_dt != null){//基本信息已变更 拥有authchange_dt字段即：1.已变更；2.在变更期限的30天内；
		updateShow += "<div  class='f_l posR qualificationChange'>"
						+"<span class='ml15 qualificationChangeTitle' ><img src='/newresources/images/supplier/qualificationChange.png'><span class='ml4'>资质已变更</span></span>"
						+"<div class='info_con hide posA'>您的供应商资质已变更请<a class='blue' target='_blank' onClick='toUpdateInfo("+ supplierInfo.company_id +")'>点击查看</a></div>"
					+"</div>";
		addParamsToWindowName({"supplierListCurrentPage":currentPage,"supplierListCurrentStatu":tabNumTag});
	}
	return updateShow;
}

/**
 * 0:邀请加入；1：主动申请；2：其他，如交易
 * supplierFromShow
 * @param supplierInfo
 * @returns {String} String
 * @author mishengliang
 * 2016-8-20 下午2:25:07
 */
function supplierFromShow(supplierInfo){
	var orginNum = supplierInfo.source_type;
	var supplierOrgin = "";
	if(orginNum == 0){
		supplierOrgin += "<div>邀请加入<div>";
	}else if(orginNum == 1){
		supplierOrgin += "<div>主动申请<div>";
	}else if(orginNum == 2){
		supplierOrgin += "<div>其他来源<div>";
	}
	return supplierOrgin;
}

/**
 * 邀请状态展示
 * accessStatuShow
 * @param supplierInfo
 * @returns {String} String
 * @author mishengliang
 * 2016-9-12 上午11:08:53
 */
function accessStatuShow(supplierInfo){
	var statu = "";
	if(supplierInfo.accessStatu != undefined && supplierInfo.accessStatu == 0 && supplierInfo.isOverDate == 1){//已过期
		statu = "<span>已过期</span><br><span style='display:inline-block;margin-top:10px;color:#777;'>"+ replaceNullAsStr(supplierInfo.lastSendDate) +"</span>";
	}else if(supplierInfo.accessStatu != undefined && supplierInfo.accessStatu == 0 && supplierInfo.isOverDate == 0){//已发送
		statu = "<span>已发送</span><br><span style='display:inline-block;margin-top:10px;color:#777;'>"+ replaceNullAsStr(supplierInfo.lastSendDate) +"</span>";
	}else if(supplierInfo.accessStatu != undefined && supplierInfo.accessStatu == 1){//已接受
		statu = "<span>对方已接受</span><br><span style='display:inline-block;margin-top:10px;color:#777;'>"+ replaceNullAsStr(supplierInfo.lastSendDate) +"</span>";
	}else{
	}
	return statu;
}

/**
 * 邀请的供应商过期需要重新提醒
 * isOverTime 
 * @author mishengliang
 * 2016-8-20 下午5:22:58
 */
function isOverTime(supplierInfo){
	inviteSupplierBtn = "";
	if(supplierInfo.isOverDate == 1 && supplierInfo.source_type == 0){//过期，且邀请加入的才会显示
		inviteSupplierBtn += "<a class='blue needInviteAgain' onClick='inviteSupplierAgain(this,"+ supplierInfo.isFast +","+ companyId +","+ supplierInfo.company_id +","+ supplierInfo.supplier_id +")'>邀请加入供应商</a>"
							+"<input type='hidden' class='isFast' value="+ supplierInfo.isFast +">"
							+"<input type='hidden' class='accepterId' value="+ supplierInfo.company_id +">";
	}
	return inviteSupplierBtn;
}

/**
 * 重新发送邀请
 * inviteSupplierAgain
 * @param sendId
 * @param accepterId
 * @param supplierId void
 * @author mishengliang
 * 2016-8-20 下午6:31:16
 */
function inviteSupplierAgain(thisEvent,isFast,sendId,accepterId,supplierId){
	var url = "supplierFiles/inviteSupplierAgain.do";
	var params = {};
	params.is_fast = isFast;
	params.sender_id = sendId;
	params.accepter_id = accepterId;
	params.supplier_id = supplierId;
	var isasync = true;
	var fn = function(result){
		$(thisEvent).hide();
		$(thisEvent).parents("td").prev().find("span").eq(0).html("已发送");
		$(thisEvent).parents("td").prev().find("span").eq(1).html(new Date().Format("yyyy-MM-dd HH:mm:ss"));
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

/**
 * 批量邀请供应商
 * inviteSupplierAgain
 * @param thisEvent
 * @param isFast
 * @param sendId
 * @param accepterId
 * @param supplierId
 * @author mishengliang
 * 2016-9-26 上午9:17:35
 */
function batchInviteSupplierAgain(tableId){
	inviteSuppliersData = [];
	var inviteSupplierNames = new Array();//需要取消通知供应商Name数组
	var i = 0;
	$("#"+tableId).find("input:checkbox:checked").each(function(index,e){
		if($(this).parents("tr").next().find("td .needInviteAgain").length > 0){
			var supplierId = parseInt($(this).parents("tr").next().next().find(".update input").val());
			var supplierName = $(this).next(".span_companyName").html();
			var isFast = $(this).parents("tr").next().find("td .needInviteAgain").nextAll(".isFast").val();
			var accepterId = $(this).parents("tr").next().find("td .needInviteAgain").nextAll(".accepterId").val();
			var supplierData = {};
			supplierData.is_fast = isFast;
			supplierData.sender_id = companyId;
			supplierData.accepter_id = accepterId;
			supplierData.supplier_id = supplierId;
			inviteSupplierNames.push(supplierName);
			inviteSuppliersData.push(supplierData);
		}
	});
	if(inviteSuppliersData.length > 0){
		var recoverList = "";
		$("#invite_supplier_batch .pop_content_wrap .title span").html(inviteSuppliersData.length);
		for(var i in inviteSupplierNames){
			recoverList += "<li><span class='title_split'>|</span>"+ inviteSupplierNames[i] +"</li>";
		}
		$("#invite_supplier_batch .pop_content_wrap .companyList").html(recoverList);
		pop_div_show("invite_supplier_batch");
	}else{
		window.wxc.xcConfirm("未选择任何需要邀请的供应商");
	}
}

/**
 * 提交批量邀请
 * submitBatchInviteSuppliers
 * @author mishengliang
 * 2016-9-26 上午10:58:09
 */
function submitBatchInviteSuppliers(){
	var url = "supplierFiles/batchInviteSupplierAgain.do";
	var params = {};
	params.inviteSuppliersData = JSON.stringify(inviteSuppliersData);
	var isasync = true;
	var fn = function(result){
		$("#optionSupplierShow").find("input:checkbox:checked").each(function(index,e){
			if($(this).parents("tr").next().find("td .needInviteAgain").length > 0){
				var againInvite = $(this).parents("tr").next().find("td .needInviteAgain");
				$(againInvite).hide();
				$(againInvite).parents("td").prev().find("span").eq(0).html("已发送");
				$(againInvite).parents("td").prev().find("span").eq(1).html(new Date().Format("yyyy-MM-dd HH:mm:ss"));
			}
		});
		pop_div_close("invite_supplier_batch");
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

/**
 * 供应商采购分类
 * supplierCategory
 * @param supplierInfo
 * @returns {String} String
 * @author mishengliang
 * 2016-8-17 下午3:55:27
 */
function supplierCategory(supplierInfo){
	var supplierCate = "<div class='supplierCate'>";
	/*if(supplierInfo.categoryList.length != 0){
		var list = supplierInfo.categoryList;
		for(var i in list){
			supplierCate += replaceNullAsStr(supplierInfo.categoryList[i].category_name) +"&nbsp;";
		}
	}
	return supplierCate + "</div>";*/
	return replaceNullAsStr(supplierInfo.categoryList) + "</div>";
}

/**
 * 展示供应商验厂信息
 * supplierCheckFacInfo
 * @param supplierInfo 供应商信息
 * @author mishengliang
 * 2016-8-17 下午1:58:23
 */
function supplierCheckFacInfo(supplierInfo){
	var checkFacInfo = "";
	if(supplierInfo.no_check == 1){//免检
		checkFacInfo += "<img  src='/newresources/images/supplier/needtCheck.png'>&nbsp;<span class='blue'>免检供应商</span>";
	}else if(supplierInfo.checkFac == null){
		checkFacInfo += "<img  src='/newresources/images/supplier/noCheck.png'>&nbsp;<span class='blue'>未验厂供应商</span>";
	}else{//非免检，已验厂
		checkFacInfo += "<img  src='/newresources/images/supplier/report.png'>&nbsp;<a class='blue' onClick='checkFactory("+ supplierInfo.supplier_id +")'>验厂报告</a>&nbsp;<span class='redcolor'>"+ supplierInfo.checkFac.check_score +"</span>&nbsp;分"
						+"<div class='mt10 greyColor'>"+ supplierInfo.checkFac.create_dt +"</div>"
						+showCheckCycInfo(supplierInfo.checkFac)
						+isClickCycShow(supplierInfo.owner_id)//设置点击方式
						+"<input type='hidden' class='cycSupplierId' value="+ supplierInfo.supplier_id +">";
	}
	return checkFacInfo;
}

/**
 * 链接到变更页面
 * toUpdateInfo
 * @param companyId 所属公司ID
 * @author mishengliang
 * 2016-8-17 上午11:30:56
 */
function toUpdateInfo(company_id){
	var URIstring = getwebroot()+"supplierFiles/qualificationChange/"+company_id+".htm?company_id="+company_id+"&companyId="+companyId;
	var paraString = URIstring.substring(URIstring.indexOf("?")+1,URIstring.length); 
	var rul=URIstring.substring(0,URIstring.indexOf("?")+1)+escape(paraString);//对参数的处理
	window.open(rul);
}

/**
 * 周期信息展示
 * showCheckCycInfo
 * @param checkFac
 * @returns {String} String
 * @author mishengliang
 * 2016-8-2 下午12:14:36
 */
function showCheckCycInfo(checkFac){
	var checkCycInfo = "";
	if(typeof(checkFac.factory_cycle_id) != "undefined"){
		var showCheckInfo = "已设置为"+ checkFac.factory_cycle_name;
		if(checkFac.factory_cycle_name == "不复检"){
			showCheckInfo = "";
			checkCycInfo = "<div class='cycleInfo b'>"+ showCheckInfo +"<input type='hidden' value='"+ checkFac.factory_cycle_id +"'></div>";
		}else{
			checkCycInfo = "<div class='cycleInfo b mt10 '>"+ showCheckInfo +"<input type='hidden' value='"+ checkFac.factory_cycle_id +"'></div>";
		}
	}else{
		checkCycInfo = "<div class='cycleInfo hide b'></div>";
	}
	
	return checkCycInfo;
}

/**
 * 设置表签按钮是否可点击
 * isClickShow
 * @param ownerId
 * @returns clickButton
 * @author mishengliang
 * 2016-8-12 下午4:06:48
 */
function isClickCycShow(ownerId){
	var clickButton = "";
	if(ownerId == companyId){//子账号 供应商
		clickButton += "<button class='setCycle_btn setCheckTime mt10'>设置周期</button>";
	}else if(ownerId != companyId){//子账号 非供应商
		clickButton += "";//"<button class='setCycle_btn mt10'>设置周期</button>";
	}
	return clickButton;
}

/**
 * 淘汰权限控制
 * isClickEliminateShow
 * @param ownerId
 * @returns {String} String
 * @author mishengliang
 * 2016-8-17 下午3:26:04
 */
function isClickEliminateShow(ownerId){
	var clickButton = "";
	if(ownerId == companyId){//子账号 供应商
		clickButton += "<a class='blue eliminateSupplier'>淘汰</a>";
	}else if(ownerId != companyId){//子账号 非供应商
		clickButton += "";//"<a class='blue'>淘汰</a>";
	}
	return clickButton;
}

/**
 * 设置表签按钮是否可点击
 * isClickShow
 * @param ownerId
 * @returns clickButton
 * @author mishengliang
 * 2016-8-12 下午4:06:48
 */
function isClickTagShow(ownerId,e){
	var clickButton = "";
	
	if(ownerId == companyId){//子账号 供应商
		clickButton += "<img src='/newresources/images/supplier/tag.png' >"+
						"<div class='white_color tagUpdate posA clickShowTag'><b>+</b>&nbsp;标签</div>";
	}else if(ownerId != companyId){//子账号 非供应商
		clickButton += "<span style='color:#777;'>标签：</span>";//"<div class='white_color tagUpdate posA'><b>+</b>&nbsp;标签</div>";
	}
	return clickButton;
}

/**
 * 展示供应商拥有的标签
 * showSupplierTag
 * @param supplierInfo
 * @returns {String} String
 * @author mishengliang
 * 2016-8-5 上午11:25:41
 */
function showSupplierTag(supplierInfo){
	var supplierTagList = supplierInfo.tagInfoList;
	var supplierTag = "";
	for(var i in supplierTagList){
		supplierTag += "<span class='ml20 tagShow"+ supplierTagList[i].tag_id +"'>"+ supplierTagList[i].tag_name +"<input type='hidden' value='"+ supplierTagList[i].tag_id +"'></span>";
	}
	return supplierTag;
}

/**
 * 展示标签管理处的标签
 * showTagManager void
 * @author mishengliang
 * 2016-8-6 下午2:15:01
 */
function showTagManager(){
	if(crrentAccountInfo == null){
		var result = isLoginForPlateForm();//当前账号登录信息
		crrentAccountInfo = result.data;
	}
	var showTagManagerStr = "";
	if(tagList == null){//未有请求，需要请求
		getAccountTag();
	}
	if(tagList.length > 0){//全部标签 显示
		showTagManagerStr += "<div class='f_l'><button class='blue_btn ml10 mt20' onclick='allTagSupplier()'>全部标签</button></div>";
		ownAllTagFlag = 1;
	}
	
	if(crrentAccountInfo.account_type == 0){//主账号
		for(var i in tagList){
			showTagManagerStr += "<div class='ml10 mt24 f_l pb4 item' onclick='showFocus(this)' >"
									+"<span>"+ tagList[i].tag_name +"</span>"
									+"<input type='hidden' class='tagId' value='"+ tagList[i].tag_id +"'>"
									+"<img src='/newresources/images/supplier/Pencil.png' class='ml10 editpic hide'>"
									+"<img src='/newresources/images/supplier/BIN.png' class='ml10 delpic hide' onclick='delTag(this)'>"
									+"<div class='edit hide'>"
										+"<input type='text' value=''/><a class='blue editTag_save f_r'>保存</a>"
									+"</div>"
								+"</div>";
		}
	}else if(crrentAccountInfo.account_type == 1){//子账号
		for(var i in tagList){
			if(tagList[i].tag_type == 0){//标签类型 主账号标签，公共标签
				showTagManagerStr += "<div class='ml10 mt24 f_l pb4 item' onclick='showFocus(this)'>"
										+"<span>"+ tagList[i].tag_name +"</span>"
										+"<input type='hidden' class='tagId' value='"+ tagList[i].tag_id +"'>"
									+"</div>";
			}else if(tagList[i].tag_type == 1){//子账号标签
				showTagManagerStr += "<div class='ml10 mt24 f_l pb4 item' onclick='showFocus(this)'>"
										+"<span>"+ tagList[i].tag_name +"</span>"
										+"<input type='hidden' class='tagId' value='"+ tagList[i].tag_id +"'>"
										+"<img src='/newresources/images/supplier/Pencil.png' class='ml10 editpic '>"
										+"<img src='/newresources/images/supplier/BIN.png' class='ml10 delpic' onclick='delTag(this)'>"
										+"<div class='edit hide'>"
											+"<input type='text' value=''/><a class='blue editTag_save f_r'>保存</a>"
										+"</div>"
									+"</div>";
			}
		}
	}
	
	$("#tagAllManager").append(showTagManagerStr);
}

/**
 * 装载验厂周期基础信息
 * loadBasicCheckFacData void
 * @author mishengliang
 * 2016-8-15 下午8:03:02
 */
function loadBasicCheckFacData(){
	var url = "supplierFiles/getCheckCycle.do";
	var params = {};
	var isasync = false;
	var fn = function(result){
		var checkFacList = result.checkFacList;
		var checkFacBasicShow = "";
		var checkFacBasicShowForBatch = "";
		for(var i in checkFacList){
			//公用周期选择列表加载
			checkFacBasicShow += "<li><input type='radio' name='checktime' value='"
								+ checkFacList[i].factory_cycle_id +"'/>"
								+ checkFacList[i].factory_cycle_name +"</li>";
			//批量设置周期处列表加载
			checkFacBasicShowForBatch += "<span class='cyc_unit mr10'><input name='check_cyc' type='radio' value='"
								+ checkFacList[i].factory_cycle_id +"'/>"
								+ checkFacList[i].factory_cycle_name +"</span>";
		}
		$("#setCheckTimeList ul").append(checkFacBasicShow);
		$("#check_cyc_batch .cyc_data_wrap .cyc_radio").append(checkFacBasicShowForBatch);
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

/**
 * 加载标签基础数据模板
 * loadBasicTagData void
 * @author mishengliang
 * 2016-8-8 上午11:04:03
 */
function loadBasicTagData(){
	if(tagList == null){//未有请求，需要请求
		getAccountTag();
	}
	var tagBasicShow = "";
	for(var i in tagList){
		tagBasicShow += "<li><input type='checkbox' name='tags' class='tag' value='"+ tagList[i].tag_id +"'/><span>"+ tagList[i].tag_name +"</span></li>";
	}
	$("#tagBasicDataShow").append(tagBasicShow);
}

/**
 * 获取此账号下的标签
 * getAccountTag void
 * @author mishengliang
 * 2016-8-5 上午11:16:58
 */
function getAccountTag(){
	var url = "supplierTag/getSupplierTagListForAccount.do";
	var params = {};
	var isasync = false;
	var fn = function(result){
		tagList = result.tagForAccount;//tagList 为全局变量
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

/**
 * 是否是供应商标签
 * isOnSupplierTag
 * @param tagId 标签ID
 * @param supplierInfo 供应商信息
 * @returns {Boolean} Boolean 
 * @author mishengliang
 * 2016-8-5 上午10:56:42
 */
function isOnSupplierTag(tagId,supplierInfo){
	for(var i=0; i<supplierInfo.tagInfoList.length; i++){
		if(tagId == supplierInfo.tagInfoList[i].tag_id){//存在相等的标签ID
			return true;
		}
	}
	return false;
}

/**阻止事件向上冒泡
 * stopPropagation
 * @param e void
 * @author wangjialin
 * 2016-8-30 下午6:01:08
 */
function stopPropagation(e) {  
    e = e || window.event;  
    if(e.stopPropagation) { //W3C阻止冒泡方法  
        e.stopPropagation();  
    } else {  
        e.cancelBubble = true; //IE阻止冒泡方法  
    }  
} 

/**
 * 加载默认操作，修改$(function(){})方法
 * loadDefalutTake
 * @author mishengliang
 * 2016-7-29 下午2:01:49
 */
function loadDefalutTake(){
	
	var oldTag;
	//全部标签处编辑标签
	defalutEditTag();
	/*$(".editpic").on("click",function(e){
		var obj=$(this);
		var pobj=$(this).parent(".blue_white_btn");
		$(obj).parent().find(".edit").css("margin-top","0px");
		oldTag=$(this).parent(".blue_white_btn").find("span").text();
		pobj.css("background","#d6dde6");
		pobj.find(".edit").find("input").val(oldTag);
		pobj.find("span").hide();
		pobj.find("img").hide();
		pobj.find(".edit").show();
		obj.unbind("click");
		stopPropagation(e);
	});*/
	
	$(".edit").on("click",function(e){
		stopPropagation(e);
	});
	//全部标签处编辑标签后保存
	$(".editTag_save").on("click",function(e){
		var tagName;
		var newTag=$(this).parent(".edit").find("input").val();//修改后的标签名
		var tagId = $(this).parents(".blue_white_btn").find(".tagId").val();//标签ID
		if(newTag==""||newTag==null){
			tagName=oldTag;
		}else{
			tagName=newTag;
		}
		$(this).parents(".blue_white_btn").find("span").html(tagName);
		$(this).parents(".blue_white_btn").find(".edit").hide();
		$(this).parents(".blue_white_btn").find("span").show();
		$(this).parents(".blue_white_btn").removeClass("mt20").addClass("mt24");
		$("#tagBasicDataShow").find("li input[value='"+ tagId +"']").parent().find("span").text(newTag);//将选择标签修改
		$(".tagsChecked .tagShow"+tagId).text(newTag);//修改供应商展示的将要删除的标签
		$(this).parents().removeClass("blue_white_btn");
		$(this).parents(".item").css("background","#fff");
		stopPropagation(e);
		
		var url = "supplierTag/updateSupplierTag.do";
		var params = {};
		params.tagId = tagId;
		params.tagName = newTag;
		var isasync = true;
		var fn = function(result){//无操作，只是更新
		};
		asyncAjaxMethod(url,params,isasync,fn);
	});
	
	//资质变更
	$(".qualificationChangeTitle").mouseover(function(){
		var t=$(this).parent(".qualificationChange").find(".info_con");
		t.show();
		t.mouseover(function(){
			t.show();
		});
		t.mouseleave(function(){
			t.hide();
		});
	});
	$(".qualificationChangeTitle").mouseleave(function(){
		$(this).parent(".qualificationChange").find(".info_con").hide();
	});
	
	//通知验厂处上传文件
	/*$(".chooseFile").mouseover(function(){
		$(this).hide();
		$(".upload").show();
	});
	$(".upload").mouseleave(function(){
		$(this).hide();
		$(".chooseFile").show();
	});*/
	
	//标签下拉框展示， 此时使用了同一元素，供应商的标签展示与基础信息展示分离；
	//mishengliang 2016-08-08
	$(".clickShowTag").on("click",function(){
		var supperListTop = $("#supplierList").offset().top;
		var tagButtonTop = $(this).offset().top;
		var locationTop = tagButtonTop - supperListTop;//定位的Top位置
		var bottomTop=$("#bottom").offset().top-20;
		if(bottomTop - tagButtonTop < 185){//底部不够显示
			locationTop = bottomTop - supperListTop - 185- 5;//5px 为了展示效果好看一点
		}
		var dis = $("#tagBasicDataWrap").css("display");
		if(dis == "none"){//下拉框未下拉
			$("#tagBasicDataWrap").css("top",locationTop);
			checkedTag(this);//勾选出供应商的对应标签
			$("#tagBasicDataWrap").slideDown("fast");
		}else if(dis == "block" && tagShowTop != locationTop){//点击不是同一按钮
			$("#tagBasicDataWrap").css("display","none");
			checkedTag(this);//勾选出供应商的对应标签
			$("#tagBasicDataWrap").css("top",locationTop);
			$("#tagBasicDataWrap").slideDown("fast");
		}else if(dis == "block" && tagShowTop == locationTop){//点击是同一按钮
			/*$("#tagBasicDataWrap").slideUp("fast");*/
		}
		tagShowTop = locationTop;//最后赋值
	});
	$(".modifyTagSave").on("click",function(){
		$("#tagBasicDataWrap").slideUp("fast");
	});
	
	//增加标签
	$(".addTag").click(function(){
		$(this).hide();
		$(".modifyTagSave").hide();
		$(this).parent().find(".saveTag").show();
	});
	
	//保存标签
	$(".save").click(function(){
		var tagValue = $(this).parent().find("input").val();
		var tagId;
		var tagSingle = "";
		if(tagValue != ""){//保存标签的输入不能为空
			var url = "supplierTag/addSupplierTag.do";
			var params = {};
			params.tagName = tagValue;
			params.companyId = companyId;
			var isasync = false;
			var fn = function(result){
				tagId = result.tagId;
			};
			asyncAjaxMethod(url,params,isasync,fn);
			
			if(ownAllTagFlag == 0){
				tagSingle += "<div class='f_l'><button class='blue_btn ml10 mt20' onclick='allTagSupplier()'>全部标签</button></div>";
				ownAllTagFlag = 1;
			}
			
			tagSingle += "<div class=' ml10 mt24 mb20 f_l item' onclick='showFocus(this)'>"
				+"<span>"+ tagValue +"</span>"
				+"<input type='hidden' class='tagId' value='"+ tagId +"'>"
				+"<img src='/newresources/images/supplier/Pencil.png' class='ml10 editpic hide' >"
				+"<img src='/newresources/images/supplier/BIN.png' class='ml10 delpic hide' onclick='delTag(this)'>"
				+"<div class='edit hide'>"
				+"<input type='text' value=''/><a class='blue f_r editTag_save'>保存</a>"
				+"</div>"
				+"</div>";
			$(this).parent().parent().find(".tagShow").append("<li><input type='checkbox' name='tags' class='tag' value='"+ tagId +"'/>&nbsp;"+ tagValue +"</li>");
			$("#supplierList .tagManager").append(tagSingle);
			selectTag();//选择标签后触发操作
			$(this).parent().find("input").val("");//将输入框清空
			defalutEditTag();//绑定编辑事件
			
		}
		$(this).parent().hide();
		$(this).parent().parent().find(".addTag").show();
		$(this).parent().parent().find(".modifyTagSave").show();
	});
	
	selectCheckFac();//选择周期之后触发操作
	selectTag();//选择标签之后触发操作
	
	//显示设置周期弹框
	$(".setCheckTime").on("click",function(){
		var supplierId;
		var supperListTop = $("#supplierList").offset().top;
		var supperListLeft = $("#supplierList").offset().left;
		var cycButtonTop = $(this).offset().top;
		var cycButtonLeft = $(this).offset().left;
		var locationTop = cycButtonTop - supperListTop;//定位的Top位置
		var bottomTop=$("#bottom").offset().top;
		if(bottomTop - cycButtonTop < 150){//底部不够显示
			locationTop =(bottomTop - supperListTop)-150-35;//5px 为了展示效果好看一点
		}
		
		$("#setCheckTimeList").css("left",cycButtonLeft-supperListLeft+53);
		var dis = $("#setCheckTimeList").css("display");
		if(dis == "none"){//下拉框未下拉
			checkedCheckFac(this);
			$(".setCheckTime").removeClass("blueBackgound");
			$(this).addClass("blueBackgound");
			
			$("#setCheckTimeList").css("top",locationTop);
			$("#setCheckTimeList").slideDown("fast");
		}else if(dis == "block" && cycShowTop != locationTop){//点击不是同一按钮
			checkedCheckFac(this);
			$(".setCheckTime").removeClass("blueBackgound");
			$(this).addClass("blueBackgound");
			
			$("#setCheckTimeList").css("display","none");
			$("#setCheckTimeList").css("top",locationTop);
			$("#setCheckTimeList").slideDown("fast");
		}else if(dis == "block" && cycShowTop == locationTop){//点击是同一按钮
		/*	$(".setCheckTime").removeClass("blueBackgound");
			$("#setCheckTimeList").slideUp("fast");*/
		}
		cycShowTop = locationTop;//最后赋值
	});
	
	//设置周期
	$(".setCheckTimeListSave").on("click",function(){
		$(".setCheckTime").removeClass("blueBackgound");
		$(this).parent(".setCheckTimeList").slideUp("fast");
	});
	
	//滚动条
	$('.setCycle').niceScroll({
		cursorcolor: "#ccc", //#CC0071 光标颜色 
		cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
		touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
		cursorwidth: "5px", //像素光标的宽度 
		cursorborder: "0", // 游标边框css定义 
		cursorborderradius: "5px", //以像素为光标边界半径 
		autohidemode: true //是否隐藏滚动条 
	});	
	
	//淘汰供应商
	$(".eliminateSupplier").click(function(){//淘汰提示框
		var supplierId = $(this).parents("tr").next().find(".update input").val();//供应商ID
		$("#pop_mask").show();
		$("#outSupplier_wrap").show();
		var supplierName = $(this).parents("tr").prev().find(".span_companyName").html();
		$("#eliminateSupplierName").html(supplierName);
		$("#eliminateSupplierId").val(supplierId);
	});
	
	//删除供应商
	$(".deleteSupplier").click(function(){//删除
		var supplierId = $(this).parents("tr").next().find(".update input").val();//供应商ID
		//var supplierName = $(this).parents("tr").prev().find(".span_companyName").html();//供应商Name
		
		var txt=  "确认删除此供应商吗？";
		window.wxc.xcConfirm(txt,window.wxc.xcConfirm.typeEnum.confirm,{//删除供应商之前需要确认
			onOk:function(){
				var url = "supplierFiles/deleteSupplierById.do";
				var params = {};
				params.supplierId = supplierId;
				params.isDelete = 1;//1 表示逻辑删除
				
				var isasync = false;
				var fn = function(result){
					loadData(0,true);//重新刷新数据
				};
				asyncAjaxMethod(url,params,isasync,fn);
			},
			onCancel:function(){
				}
			});
	});
}

/**
 * 搜索方法
 * searchForSupplier
 * @author mishengliang
 * 2016-9-29 下午1:54:06
 */
function searchForSupplier(){
	var inSeach = true;
	paginationFlag=false;
	loadData(0,true,inSeach);
}

/**
 * 删除标签
 * delTag
 * @param thisEvent void
 * @author mishengliang
 * 2016-9-22 上午8:45:14
 */
function delTag(thisEvent){
	var tagName = $(thisEvent).parent().find("span").html();
	window.wxc.xcConfirm("是否删除 &nbsp;"+ tagName +"&nbsp; 标签", window.wxc.xcConfirm.typeEnum.confirm,
			{
			onOk:function(){
				var tagId = $(thisEvent).parent(".blue_white_btn").find(".tagId").val();
				$("#tagBasicDataShow").find("li input[value='"+ tagId +"']").parent().remove();
				$(thisEvent).parent(".blue_white_btn").remove();
				$(".tagsChecked .tagShow"+tagId).remove();//删除供应商展示的将要删除的标签
				var url = "supplierTag/deleteSupplierTag.do";
				var params = {};
				params.tagId = tagId;
				var isasync = true;
				var fn = function(result){//无操作，只是删除
				};
				asyncAjaxMethod(url,params,isasync,fn);
			},
			onCancel:function(){}
			});
}

/**
 * 标签编辑触发的操作
 */
function defalutEditTag(){
	$(".editpic").on("click",function(e){
		var obj=$(this);
		var pobj=$(this).parent(".blue_white_btn");
		$(obj).parent().find(".edit").css("margin-top","-1px");
		oldTag=$(this).parent(".blue_white_btn").find("span").text();
		pobj.css("background","#d6dde6");
		pobj.find(".edit").find("input").val(oldTag);
		pobj.find("span").hide();
		pobj.find("img").hide();
		pobj.find(".edit").show();
		obj.unbind("click");
		stopPropagation(e);
	});
}

/**
 * 勾选出供应商的验厂周期
 * checkedCheckFac
 * @param thisEvent void
 * @author mishengliang
 * 2016-8-14 下午7:01:12
 */
function checkedCheckFac(thisEvent){
	supplierId = $(thisEvent).next("input").val();
	$("#setCheckTimeList").find(".supplierIdData").val(supplierId);
	$("#setCheckTimeList").find("input").removeAttr("checked");//首先清除之前的数据
	var cycId = $(thisEvent).parent().find(".cycleInfo input").val();
	if(typeof(cycId) != "undefined"){
		$("#setCheckTimeList").find("input[value="+ cycId +"]").prop("checked",true);
	}
}

/**
 * 勾选出供应商的对应标签
 * checkedTag
 * @author mishengliang
 * 2016-8-8 下午3:42:23
 */
function checkedTag(thisEvent){
	$("#tagBasicDataWrap").find("input").removeAttr("checked");//首先清除之前的数据
	var tagValues = new Array;
	$(thisEvent).parent().next().find("span input").each(function(index){
		tagValues[index] = parseInt($(this).val());
	});
	var supplierId = $(thisEvent).parent().find(".supplierIdData").val();
	$("#tagBasicDataWrap").find(".supplierIdData").val(supplierId);//标签选项中添加供应商ID值
	if(tagValues.length != 0){//渲染出供应商相应勾选的数据
		for(var i in tagValues){
			$("#tagBasicDataWrap").find("input[value="+ tagValues[i] +"]").prop("checked",true);
		}
	}
}

/**
 * 选择周期之后触发操作
 * selectCheckFac void
 * @author mishengliang
 * 2016-8-16 上午10:10:59
 */
function selectCheckFac(){
	$("#setCheckTimeList li input").unbind("change");//需要先接触绑定，否则会绑定两次
	$("#setCheckTimeList li input").bind("change",function(){
		var checkFacShow = $(this).parent().text();
		var checkFacId = $(this).val();
		var supplierId = $(this).parents("#setCheckTimeList").find("input").val();
		var showCheckInfo = "已设置为"+checkFacShow;
		if(checkFacShow == "不复检"){//设置为不复检时，不用显示；
			showCheckInfo = "";
			$("td .factoryCheck input[value='"+ supplierId +"']").parent().find(".cycleInfo").removeClass("mt10");
		}else{
			$("td .factoryCheck input[value='"+ supplierId +"']").parent().find(".cycleInfo").removeClass("mt10").addClass("mt10");
		}
		$("#setCheckTimeList").hide();
		$("input[value='"+ supplierId +"']").parent().find(".setCheckTime").removeClass("blueBackgound");
		$("td .factoryCheck input[value='"+ supplierId +"']").parent().find(".cycleInfo").html(showCheckInfo +"<input type='hidden' value='"+ checkFacId +"'>");
		$("td .factoryCheck input[value='"+ supplierId +"']").parent().find(".cycleInfo").removeClass("hide");
		
		var url = "supplierFiles/addOrupdateSupplierCheckFac.do";
		var params = {};
		params.supplierId = supplierId;
		params.checkFacId = checkFacId;
		var isasync = true;
		var fn = function(result){//无操作，前台样式在执行前改变
		};
		asyncAjaxMethod(url,params,isasync,fn);
	});
}

/**
 * 
 * batchSetCheckCycle
 * @param tableId
 * @author mishengliang
 * 2016-9-27 上午10:22:03
 */
function batchSetCheckCycle(tableId){
	supplierIdsForCheckCyc = [];
	$("#check_cyc_batch .cyc_radio input[name='check_cyc']").removeAttr("checked");//清空之前所选的数据
	var inviteSupplierNames = new Array();//需要取消通知供应商Name数组
	var i = 0;
	$("#"+tableId).find("input:checkbox:checked").each(function(index,e){
		if($(this).parents("tr").next().find("td .setCycle_btn").length > 0){
			var supplierId = parseInt($(this).parents("tr").next().next().find(".update input").val());
			supplierIdsForCheckCyc.push(supplierId);
		}
	});
	if(supplierIdsForCheckCyc.length > 0){
		pop_div_show("check_cyc_batch");
	}else{
		window.wxc.xcConfirm("未选择任何需要设置周期的供应商");
	}
}

function submitBatchSetCheckCyc(){
	var num = 0;
	var unSupNameShow = "<li class='company'>以下公司未验厂，验厂周期未设置</li>";
	var checkFacId = $("#check_cyc_batch .cyc_radio input[name='check_cyc']:checked").val();//当前选择周期的ID值
	if(checkFacId == undefined){
		$("#check_cyc_batch .cyc_tip_nocheck").show();
		return;
	}
	pop_div_close("check_cyc_batch");
	
	$("#supplierListShow").find("input:checkbox:checked").each(function(index,e){
		if($(this).parents("tr").next().find("td .setCycle_btn").length == 0){
			var supplierName = $(this).next(".span_companyName ").html();
			unSupNameShow += "<li class='company'>"+ supplierName +"</li>";
			num++;
		}
	});
	if(num > 0){
		$("#check_cyc_batch_tip .companies").html(unSupNameShow);
		pop_div_show("check_cyc_batch_tip");
	}
//	var option ={title:"批量设置验厂周期",icon: "-32px 0",btn:""};
//	 window.wxc.xcConfirm("验厂周期设置成功！<div style='text-align:left;color:#777;'>以下公司未验厂，验厂周期未设置<div style='text-algin:left;line-height:15px;'>浙江泰普森集团</div><div style='text-algin:left;line-height:15px;'>浙江泰普森休闲</div></div>", window.wxc.xcConfirm.typeEnum.custom,option,
//				{
//				onOk:function(){
//					var url = "supplierFiles/batchAddOrupdateSupplierCheckFac.do";
//					var params = {};
//					params.supplierIds = supplierIdsForCheckCyc.join(",");
//					params.checkFacId = checkFacId;
//					var isasync = true;
//					var fn = function(result){//无操作，前台样式在执行前改变
//						$("#supplierListShow").find("input:checkbox:checked").each(function(index,e){
//							if($(this).parents("tr").next().find("td .setCycle_btn").length > 0){
//								var checkFacName = $("#check_cyc_batch .cyc_radio input[name='check_cyc']:checked").parent().text();//当前选择周期的ID值
//								if(checkFacName == "不复检"){//不复检时，不显示
//									checkFacName = "";
//									$(this).parents("tr").next().find("td .cycleInfo").removeClass("mt10");
//								}else{
//									$(this).parents("tr").next().find("td .cycleInfo").removeClass("mt10").addClass("mt10");
//								}
//								$(this).parents("tr").next().find("td .cycleInfo").html(checkFacName +"<input type='hidden' value='"+ checkFacId +"'>");
//							}
//						});
//					};
//					asyncAjaxMethod(url,params,isasync,fn);
//				},
//				onCancel:function(){
//					}
//				});
}

/**
 * 选择标签之后触发操作
 * selectTag
 * @author mishengliang
 * 2016-8-8 上午9:03:00
 */
function selectTag(){
	$("#tagBasicDataWrap .tagShow li input").unbind("change");//需要先接触绑定，否则会绑定两次
	$("#tagBasicDataWrap .tagShow li input").bind("change",function(){
		var tagShow = $(this).parent().text();
		var tagShowId = $(this).val();
		var checkedValue = $(this).prop("checked");
		var supplierId = $(this).parents("#tagBasicDataWrap").find("input").val();
		if(typeof(checkedValue) != "undefined" && checkedValue == false){//去掉供应商显示的标签
			$(".allTag .update input[value="+ supplierId +"]").parents(".allTag").find(".tagsChecked").find(".tagShow"+ tagShowId).remove();
			$(this).prop("checked",false);
			
			var url = "supplierTag/uncheckedTagWithSupplier.do";
			var params = {};
			params.supplierId = supplierId;
			params.tagId = tagShowId;
			var isasync = true;
			var fn = function(result){//无操作，前台样式在执行前改变
			};
			asyncAjaxMethod(url,params,isasync,fn);
		}else{//显示供应商标签
			var addTagShow = "<span class='ml20 tagShow"+ tagShowId +"'>"+ tagShow +"<input type='hidden' value='"+ tagShowId +"'></span>";
			$(".allTag .update input[value="+ supplierId +"]").parents(".allTag").find(".tagsChecked").append(addTagShow);
			$(this).prop("checked",true);
			
			var url = "supplierTag/checkedTagWithSupplier.do";
			var params = {};
			params.supplierId = supplierId;
			params.tagId = tagShowId;
			var isasync = true;
			var fn = null;//function(result){};//无操作，前台样式在执行前改变
			asyncAjaxMethod(url,params,isasync,fn);
		}
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
	noLimitAddress();//清空地址栏中信息
	delSupplierIds = [];//删除供应商ID数组,切换时清空，因为此数据会公用
	var param ={tabNum:tabNum};
	addParamsToWindowName(param);
	if(goBack == true){
		goBack = false;
	}else{
		currentPage = 0;//当前页数
	}
	paginationFlag=false;//初始化分页控件；
	tabNumTag = tabNum;
	fileStatus = tabNum;
	//设置点击后的切换样式
	$(tabId + " .tab").children(".curr").removeClass("curr");
	$(tabId + " .tab").children().eq(tabNum).addClass("curr");
	$(tabId + " .tab").children().find("span.split").css("display","inline");
//	$(tabId + " .tab").children().eq(tabNum).prev().find("span.split").css("display","none");
	//根据参数决定显示内容
	$(tabId + " .tabcon").hide();
	$(tabId + " .tabcon").eq(tabNum).show();
	$("#addSupplier").show();
	$("#minMaxScore").show();
	$("#inviteStatusWrap").show();
	$("#character").show();
	$("#sort").show();
	$("#address").show();
	switch(tabNum){
	case 0:
		$("#inviteStatusWrap").hide();
		break;
	case 1:
		$("#addSupplier").hide();
		$("#minMaxScore").hide();
		break;
	case 2:
		$("#addSupplier").hide();
		$("#minMaxScore").hide();
		$("#inviteStatusWrap").hide();
		$("#character").hide();
		$("#sort").hide();
		$("#address").hide();
		break;
	}
	$("#tagBasicDataWrap").hide();//切换时将标签下拉隐藏
	$("#setCheckTimeList").hide();//切换时将周期下拉隐藏
	loadData(currentPage,true);//加载数据
}

//跳转至供应商信息展示页面
function queryInfo(record_id,supplier_id,supplier_cpyname,companyId){
	var param ={"record_id":record_id,"supplier_id":supplier_id,"supplier_cpyname":supplier_cpyname,"companyIdForSupplier":companyId};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"supplierFiles/supplierInfo/"+supplier_id+".htm";
}

//物料验证
function checkMaterial(supplier_id)
{
	$("#checkMaterial_wrap").fadeIn("fast");
	getMaterialCheckList(supplier_id);
	$("#searchMaterialBtn").click(function(){
		getMaterialCheckList(supplier_id);
	} );
}

//验厂报告
function checkFactory(supplier_id)
{
	$("#checkFactory_wrap").fadeIn("fast");
	getCheckFactoryList(supplier_id);
	$("#searchFactoryBtn").click(function(){
		getCheckFactoryList(supplier_id);
	} );
}

//通知验厂
function notifyCheck()
{
	pop_div_show("notifyCheck_wrap");
}

//淘汰供应商
function outSupplier()
{
	pop_div_show("outSupplier_wrap");
}

/**
 * 批量淘汰供应商
 * batchOutSupplier
 * @author mishengliang
 * 2016-9-27 下午2:39:10
 */
function batchExamptSuppliers(tableId){
	examptSupplierIds = [];
	var examptSupplierNames = new Array();//需要取消通知供应商Name数组
	var i = 0;
	$("#"+tableId).find("input:checkbox:checked").each(function(index,e){
		var supplierId = parseInt($(this).parents("tr").next().next().find(".update input").val());
		var supplierName = $(this).next(".span_companyName").html();
		if($(this).parents("tr").next().find("td .eliminateSupplier").length > 0){
			examptSupplierIds.push(supplierId);
			examptSupplierNames.push(supplierName);
			i++;
		}
	});
	if(examptSupplierIds.length > 0){
		var recoverList = "";
		$("#exampt_supplier_batch .pop_content_wrap .titleForExampt span").html(examptSupplierIds.length);
		for(var i in examptSupplierNames){
			recoverList += "<li><span class='title_split'>|</span>"+ examptSupplierNames[i] +"</li>";
		}
		$("#exampt_supplier_batch .pop_content_wrap .companyListForExampt").html(recoverList);
		pop_div_show("exampt_supplier_batch");
	}else{
		window.wxc.xcConfirm("未选择任何要淘汰的供应商");
	}
}

/**
 * submitBatchExamptSupplier void
 * @author mishengliang
 * 2016-9-27 下午3:07:15
 */
function submitBatchExamptSupplier(){
	var elimitateReason = $("#eliminateSupplierReasonForBatch").val();//淘汰原因
	if(elimitateReason == ""){
		$("#eliminateTip span").html("淘汰原因不能为空！");
		return;
	}
	
	var url = "supplierFiles/batchUpdateSupplierStatusById.do";
	var params = {};
	params.supplierIds = examptSupplierIds.join(",");
	params.elimitateReason = elimitateReason;
	params.fileStatus = 2;//淘汰状态
	var isasync = true;
	var fn = function(result){//无操作，前台样式在执行前改变
		$("#supplierListShow").find("input:checkbox:checked").each(function(index,e){
			if($(this).parents("tr").next().find("td .eliminateSupplier").length > 0){
				$(this).parents("tr").next().next().remove();
				$(this).parents("tr").next().remove();
				$(this).parents("tr").remove();
			}
		});
		pop_div_close("exampt_supplier_batch");
	};
	asyncAjaxMethod(url,params,isasync,fn);
}


//新增供应商
function addSupplier()
{
	pop_div_show("addSupplier_wrap");
	$("#addSupplier_content").val('');
	$("#number").text(0);
	$("#companyName").prop("checked",true);
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
	$("#searchMaterialBtn").unbind();
	$("#searchFactoryBtn").unbind();
	$("#end_time").val("");
	$("#start_time").val("");
	$("#end_time1").val("");
	$("#start_time1").val("");
}

/**
 * 淘汰供应商
 * pop_div_done
 * @param thisEvent void
 * @author mishengliang
 * 2016-8-19 下午3:08:35
 */
function pop_div_done(thisEvent){
	var supplierId = $("#eliminateSupplierId").val();//供应商ID
	var elimitateReason = $("#eliminateSupplierReason").val();
	if(elimitateReason == ""){
		$("#eliminateTip span").html("* &nbsp; 理由不能为空");
		return;
	}else if(elimitateReason.length > 150){
		$("#eliminateTip span").html("* &nbsp; 字符超过限制");
		return;
	}
	pop_div_close("outSupplier_wrap");
	
	var url = "supplierFiles/updateSupplierStatusById.do";
	var params = {};
	params.supplierId = supplierId;
	params.fileStatus = 2;//2 淘汰的状态位
	params.elimitateReason = elimitateReason;
	
	var isasync = false;
	var fn = function(result){
		loadData(currentPage,true);//重新刷新数据
	};
	asyncAjaxMethod(url,params,isasync,fn);
}

//获取物料确认列表
function getMaterialCheckList(supplier_id){
	end_date = $("#end_time").val();
	start_date = $("#start_time").val();
	var url="CustomerFilesCtrl/getMaterialCheckList.do";
	var params={};
	params.supplier_id=supplier_id;
	if(end_date != ""){
		 params.end_date = end_date;
	}
	if(start_date != ""){
		 params.start_date = start_date;
	}
	var fn=function(result){
		var materialCheck=result.data;
		var tableItem='<tr><div style="border:1px solid #e8e8e8;">'
				+'<th width="auto">日期</th>'
				+'<th width="auto">报告</th>'
				+'</div></tr>';
		if(materialCheck){
			for(var i=0;i<materialCheck.length;i++){
				tableItem+='<tr>'
				+'<td class="center">'+materialCheck[i].create_dt+'</td>'
				+'<td class="center"><a onClick="downloadText(this)" class="blue ml10">'+materialCheck[i].file_name+'</a></td>'
				+"<td><input type='hidden' value="+ materialCheck[i].mogodb_id +"></td>"
				+'</tr>';
			}
		}
		$("#materialCheck_table").html(tableItem);
	};
	asyncAjaxMethod(url,params,true,fn);
}

/**
 * 获取验厂报告列表
 * getCheckFactoryList
 * @param supplier_id void
 * @author yukai
 */
function getCheckFactoryList(supplier_id){
	end_date = $("#end_time1").val();
	start_date = $("#start_time1").val();
	var url="CustomerFilesCtrl/getCheckFactoryList.do";
	var params={};
	params.supplier_id=supplier_id;
	if(end_date != ""){
		 params.end_date = end_date;
	}
	if(start_date != ""){
		 params.start_date = start_date;
	}
	var fn=function(result){
		var checkFactory=result.data;
		var tableItem='<tr><div style="border:1px solid #e8e8e8;">'
				+'<th width="auto">日期</th>'
				+'<th width="auto">报告</th>'
				+'</div></tr>';
		if(checkFactory){
			for(var i=0;i<checkFactory.length;i++){
				tableItem+='<tr>'
				+'<td class="center">'+checkFactory[i].create_dt+'</td>'
				+'<td class="center"><span class="redcolor">'+checkFactory[i].check_score+'</span>分<a onClick="downloadText(this)" class="blue ml10">'+checkFactory[i].file_name+'</a></td>'
				+"<td><input type='hidden' value="+ checkFactory[i].mogodb_id +"></td>"
				+'</tr>';
			}
		}
		$("#checkFactory_table").html(tableItem);
	};
	asyncAjaxMethod(url,params,true,fn);
}

//获取最后一份验厂报告得分
function getCheckFactoryScore(supplier_id){
	var url="CustomerFilesCtrl/getCheckFactoryList.do";
	var params={};
	var check_score;
	params.supplier_id=supplier_id;
	var fn=function(result){
		var checkFactory=result.data;
		if(checkFactory.length>0){
			check_score=checkFactory[0].check_score;
		}else{
			check_score="无";
		}
	};
	asyncAjaxMethod(url,params,false,fn);
	return check_score;
}

//下载文档
function downloadText(obj){
	window.open(getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+$(obj).parent().next().children().val());
}

function showviewtext(){
	var filename=$("#input_uploadfile").val();
	$("#input_filename").val(filename);
}

//复选框事件  
//全选、取消全选的事件  
function selectAll(thisEvent,tableId){  
	if ($(thisEvent).is(":checked")) {  
		  $("#"+tableId).find("input:checkbox").prop("checked",true);
	} else {  
		  $("#"+tableId).find("input:checkbox").prop("checked",false);
	}  
}  

/**
 * 判断是否全选
 * isAllSelect
 * @param tableId
 * @param allSelectId void
 * @author mishengliang
 * 2016-9-23 下午3:35:37
 */
function isAllSelect(tableId,allSelectId){
	var checkBoxTotal = $("#"+tableId).find("input:checkbox").length;
	var checkBoxSelect = $("#"+tableId).find("input:checkbox:checked").length;
	if(checkBoxTotal == checkBoxSelect){
		$("#"+allSelectId).prop("checked",true);
	}else{
		$("#"+allSelectId).prop("checked",false);
	}
}

/**邀请状态选择
 * showPurchaseNature void
 * @author wangjialin
 * 2016-8-4 下午4:55:17
 */
function showInviteStatus(){
	var purchaseNature=$("#inviteStatusSelect option:selected").text();
	$("#inviteStatus").text(purchaseNature);
}
/**采购性质选择
 * showPurchaseNature void
 * @author wangjialin
 * 2016-8-4 下午4:55:17
 */
function showPurchaseNature(){
	noLimitSort();//清空类目
	var purchaseNature=$("#purchaseNatureSelect option:selected").text();
	$("#purchaseNature").text(purchaseNature);
	var natureId=$("#purchaseNatureSelect  option:selected").val();
	if(natureId!=0)
		getPurchaseCategory(natureId);
	else
		getPurchaseCategory();
}
/**三级选择展开
 * purchaseSortShow void
 * @author wangjialin
 * 2016-8-4 上午10:27:20
 */
function selectShow(e){
	$(e).parent(".greycolor").find(".select_content").show();
	judgeDivHeight('.select_content');
}
/**三级选择关闭
 * @author wangjialin
 * 2016-8-4 下午3:00:01
 */
$(".selectClose").on("click",function(){
	$(this).parents(".select_content").hide();
	judgeDivHeight('.select_content');
});
/**省：点击后取消已选择的选项
 * delSortChoosed void
 * @author wangjialin
 * 2016-8-4 下午3:00:01
 */
function delSortChoosed(e){
	$(e).parent("li").remove();
	var id=$(e).parent("li").prop('id');
	$("#province ."+id).removeAttr("checked");
	$("#province ."+id).prop("indeterminate",false);
	var c=$("#province ").find("#"+id).prop("class");
	if(c=="active")
		$("#city li input").removeAttr("checked");
}
/**城市：点击后取消已选择的选项
 * delCityChoosed
 * @param e void
 * @author wangjialin
 * 2016-9-26 下午4:09:44
 */
function delCityChoosed(e){
	var id=$(e).parent().text();
	var id2=$(e).parent().parent().parent().prop("id");
	$(e).parent("li").remove();
	var l2=$("#city li input[type=checkbox]:checked").length-1;
	var f=$("#address .optionChoosed").find("#"+id2).find(".citiesChoosed").text().length-2;
	if(l2==0 || f==0){
		$("#address .optionChoosed").find("#"+id2).remove();
		$("#province ."+id2).prop("checked",false);
		$("#province ."+id2).prop("indeterminate",false);
	}
	$("."+id).prop("checked",false);
}
/**展示用户所选择的地址
 * saveAddressSelected void
 * @author wangjialin
 * 2016-9-27 下午4:17:42
 */
function saveAddressSelected(){
	var provinces='';
	provinceCodes = [];
	cityCodes = [];
	if($("#address .optionChoosed").text().length==0){
		$("#address .select_content").hide();
	}else{
		$(".selectList2 #province li input").each(function(){
			if($(this).is(':checked') || $(this).prop("indeterminate") == true) {
				var id=$(this).val();
				var f=$("#address .optionChoosed").find("#"+id).find(".citiesChoosed").text().length;
				//若该省的城市全选，则只显示省份
				if(f==0){
					provinces+=$(this).val()+',';
					provinceCodes.push($("#address .optionChoosed").find("#"+id).find("input").eq(0).val());
				}else{//若只选择该省下的部分城市，则展示该省下所有选中的城市
					var len=$("#address .optionChoosed").find("#"+id).find(".citiesChoosed li").length;
					$("#address .optionChoosed").find("#"+id).find(".citiesChoosed li").each(function(index){
						if(index>=1 && index<len-1){
							provinces+=$(this).prop("id")+',';
							cityCodes.push($(this).find("input").val());
						}
					});
				}
			}
		});
		var s=provinces.substring(0,provinces.length-1);
		var obj='';
		if(s.length>=13){
			obj=s.substring(0,12);
			obj+='...';
		}else{
			obj=s;
		}
		$("#address").find(".addressSelect").html(obj);
		$("#address .select_content").hide();
		judgeDivHeight("#address .select_content");
	}
}

/**新增供应商是计算输入的名称个数
 * countName void
 * @author wangjialin
 * 2016-8-5 上午10:28:41
 */
function countName(){
	var length=0;
	var str=$("#addSupplier_content").val();
	if(str!=""){
		if(str.indexOf(";") > 0 && str.indexOf("；") < 0){
			var array=str.split(";");
			$("#number").text(array.length);
		}
		else if(str.indexOf("；") > 0  && str.indexOf(";") < 0){
			var array=str.split("；");
			$("#number").text(array.length);
		}
		else if(str.indexOf("；") > 0 && str.indexOf(";") > 0){
			var array=str.split("；");
			for(var i=0;i<array.length;i++){
				var str1=array[i];
				var array1=str1.split(";");
				length+=array1.length;
			}
			$("#number").text(length);
		}else{
			$("#number").text(1);
		}
	}else{
		$("#number").text(length);
	}
}
/**
 *邀请加入供应商库 
 * inviteJoin void
 * @author yukai
 * 2016-8-10 下午2:18:01
 */
function inviteJoin(){
	var companyStr;
	companyStr=$("#addSupplier_content").val();
	var message=checkCompany(companyStr);
	if(message!=""&&message!=null){
		var option ={title:"邀请",btn:parseInt("0001",2)};
	    window.wxc.xcConfirm(message, window.wxc.xcConfirm.typeEnum.custom,option);
		return;
	}
	var url = "supplierFiles/addSupplierFiles.do";
	var params = {};
	params.companyStr=companyStr;
	params.companyId=companyId;
	var fn = function(result){
		if(result.success){
			pop_div_close('addSupplier_wrap');
			var option ={title:"邀请",btn:parseInt("0011",2),icon: "-32px 0"};
		    window.wxc.xcConfirm("<p style='text-align:left'>已发送邀请至对方，请等待对方回复。</p>", window.wxc.xcConfirm.typeEnum.custom,option);
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 检验输入的公司名称并返回错误信息
 * checkCompany
 * @param companyStr
 * @returns any
 * @author yukai
 * 2016-8-11 下午3:25:06
 */
function checkCompany(companyStr){
	var message;
	var url = "supplierFiles/checkCompany.do";
	var params = {};
	params.companyStr=companyStr;
	params.companyId=companyId;
	var fn = function(result){
		message=result.message;
	};
	asyncAjaxMethod(url,params,false,fn);
	return message;
}
/**
 * 样式跳转
 * showFocus
 * @param e void
 * @author wangjialin
 * 2016-9-13 下午2:43:10
 */
function showFocus(e){
	tagIdForFilter = $(e).find(".tagId").val();//被点击的标签ID
	loadData(0,true);//加载数据
	paginationFlag=false;
	
	$("#tagAllManager div").removeClass("blue_white_btn");
	$("#tagAllManager div").removeClass("mt20");
	$("#tagAllManager div").addClass("mt24");
	$("#tagAllManager div").addClass("pb4");
	$("#tagAllManager").find("div").eq(0).removeClass("mt24");
	$("#tagAllManager img").hide();
	$(e).removeClass("mt24");
	$(e).removeClass("pb4");
	$(e).addClass("mt20");
	$(e).addClass("blue_white_btn");
	$(e).find("img").show();
}
/**
 * 点击所有标签操作
 * allTagSupplier void
 * @author mishengliang
 * 2016-9-19 下午12:25:44
 */
function allTagSupplier(){
	$("#tagAllManager div").removeClass("blue_white_btn");
	$("#tagAllManager div").removeClass("mt20");
	$("#tagAllManager div").addClass("mt24");
	$("#tagAllManager div").addClass("pb4");
	$("#tagAllManager").find("div").eq(0).removeClass("mt24");
	$("#tagAllManager img").hide();
	
	tagIdForFilter = null;//过滤标签置为空
	paginationFlag=false;
	loadData(0,true);//加载数据
}

/**批量删除供应商
 * recoverCheckByBatch void
 * @author wangjialin
 * 2016-8-23 上午11:23:40
 */
function batchDelSuppliers(tableId){
	delSupplierIds = [];
	var delSupplierNames = new Array();//需要取消通知供应商Name数组
	var i = 0;
	$("#"+tableId).find("input:checkbox:checked").each(function(index,e){
		var supplierId = parseInt($(this).parents("tr").next().next().find(".update input").val());
		var supplierName = $(this).next(".span_companyName").html();
		delSupplierIds.push(supplierId);
		delSupplierNames[i] = supplierName;
		i++;
	});
	if(delSupplierIds.length > 0){
		var recoverList = "";
		$("#delete_supplier_batch .pop_content_wrap .title span").html(delSupplierIds.length);
		for(var i in delSupplierNames){
			recoverList += "<li><span class='title_split'>|</span>"+ delSupplierNames[i] +"</li>";
		}
		$("#delete_supplier_batch .pop_content_wrap .companyList").html(recoverList);
		pop_div_show("delete_supplier_batch");
	}else{
		window.wxc.xcConfirm("未选择任何要删除的供应商");
	}
}

/**
 * 提交批量回复验厂
 * submitRecoverCheck void
 * @author mishengliang
 * 2016-9-23 下午2:41:01
 */
function submitDelSuppliers(){
	var url = "supplierFiles/batchDeleteSupplierById.do";
	var params = {};
	params.supplierIds = delSupplierIds.join(",");
	params.isDelete = 1;//1 表示逻辑删除
	
	var isasync = true;
	var fn = function(result){
		loadData(0,true);//加载数据
		pop_div_close("delete_supplier_batch");
	};
	asyncAjaxMethod(url,params,isasync,fn);
}
/**页面高度根据脱离文档流的div的高度变化而变化
 * judgeDivHeight
 * @param e void
 * @author wangjialin
 * 2016-10-7 下午3:41:31
 */
function judgeDivHeight(e){
	var h1=$(e).height();
	var h2=$(".div_con").height();
	var h3=h1+20;
	if(h1>=h2){
		$(".div_con").css("height",h3);
	}else{
		$(".div_con").css("height",h2);
	}
	
}
