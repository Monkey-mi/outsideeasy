var companyId=getParamFromWindowName("companyIdForAll");
/*
 * 页面加载事件
 * create_by yangliping 2016-7-7 15:09:38
 * */ 
var trid=new Array(2);
var treeGrid;
var currId=-1;
//treegrid配置变量
var config = {
			id: "categoryListTb",
			renderTo: "category_list",//表格外层元素Id
			//headerAlign: "left",//
			headerHeight: "30",//表头行高设置
			dataAlign: "left",//文本居中设置
			indentation: "20",//缩进大小设置
			folderOpenIcon: "/newresources/js/treegrid/images/minus.png",//展开图片设置
			folderCloseIcon: "/newresources/js/treegrid/images/plus.png",//收起图片设置
			defaultLeafIcon: "/newresources/js/treegrid/images/empty.png",//叶子节点图片设置
			hoverRowBackground: "false",//鼠标hover行背景色设置
			folderColumnIndex: "0",//展开/收起图片位于第一列上
			itemClick: "itemClickEvent",//鼠标单击行事件监听方法
			columns:[
				{headerText: "分类名称", dataField: "text", headerAlign: "center", handler: "customNameCel"},
				{headerText: "添加子分类", dataField: "id", headerAlign: "center", dataAlign: "center", width: "120",handler:"customAddChildCel"},
				{headerText: "采购性质", dataField: "nature_name", headerAlign: "center", dataAlign: "center", width: "140",handler:"customPurchaseNatureCel"},
				{headerText: "排序", dataField: "order_by", headerAlign: "center", dataAlign: "center", width: "120",handler:"customOrderbyCel"},
				{headerText: "操作", dataField: "id", headerAlign: "center", dataAlign: "center", width: "80", handler: "customOperateCel"}
			],
			data:[],
			TR_ID:trid
		};
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
		loadData();
		$("#parent_select").change(function(){
			if($(this).val())
			{
				$(this).nextAll(".info_explain_wrap").fadeOut("fast");
			}
			var str=$(this).children('option:selected').text();
			var a=str.split(">");
			$(this).prev().html(a[a.length-1]);
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
				companyId=$("#company").val();
			}
	});
	$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	var result=isLoginForPlateForm();
	if(result.isLogin==true){
		$(".midd_left_wrap").load(getwebroot()+"usercenter/purchaseManage/purchaseLeftMenu.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#evaluation").children().eq(7).children().addClass("curr");
				var leftHeight=$(".midd_left_wrap").height();
				if(leftHeight>$(window).height()-200)
				{
					$(".midd_right_wrap").css({minHeight:leftHeight});
				}
			}
		});
	}
}
function loadData(){
	var url="purchaseCategory/getPurchaseCategoryTree2Json.do";
		var params={};
		var fn=function(result){
   			if(result.total>0)
   			{
   			//创建一个组件对象
			config.data=result.data;
			treeGrid = new TreeGrid(config);
			treeGrid.show();
			
   			}
   		};
   		asyncAjaxMethod(url,params,true,fn);
   		mouseFocus();
}
function mouseFocus(){
	$(".TreeGrid tr").mouseover(function(){
   		$(this).find(".edit_nature").show();
   	});
   	$(".TreeGrid tr").mouseleave(function(){
   		$(this).find(".edit_nature").hide();
   	});
}
//treegrid 相关方法
		/*
			单击数据行后触发该事件
			id：行的id
			index：行的索引。
			data：json格式的行数据对象。
		*/
		function itemClickEvent(id, index, data){
			//可获取当前行记录相关数据，如主键Id，行号，行data对象
			//$("#").val(id + ", " + index + ", " + JSON.stringify(data));
			currId=id;
		}
		
		/*
			通过指定的方法来自定义栏数据
		*/
		function customCheckBox(row, col){
			return "<input type='checkbox'>";
		}

		function customNameCel(row, col){
		
			var name = row[col.dataField] || "";
			//return '<input type="text" value="'+name+'" />';
			return name;
		}

		function customAddChildCel(row, col){
			if(row.canAdd){
					return '<div class="addNewCategory" onclick=addNewCategory('+row[col.dataField]+',this) src="/newresources/js/treegrid/images/add_child.png" ><span style="font-size:14px;fonr-weight:bold;">+</span>&nbsp;子分类</div>';
			}else{
				return "";
			}
		}
		function customPurchaseNatureCel(row, col){
				return '<a class="purchase_nature_a" onclick="eidtCategoryNature(this,'+row.nature_id+','+row.id+')">'+row.nature_name+'<img class="edit_nature" src="/newresources/js/treegrid/images/edit.png" /></a>';
		}
		function customOrderbyCel(row, col){
			
			return '<img class="mr10" title="down" src="/newresources/js/treegrid/images/down.png" onclick="orderbyDown('+row[col.dataField]+','+row.id+','+row.parentId+',this)" /><img src="/newresources/js/treegrid/images/up.png" title="up" onclick="orderbyUp('+row[col.dataField]+','+row.id+','+row.parentId+',this)" />';
		}
		function customOperateCel(row,col)
		{
			return '<img src="/newresources/js/treegrid/images/del.png" title="删除" onclick="delCurrRow('+row.id+',this)"/>';
		}
//treegrid 相关方法结束

/*
 * 添加分类
 * */
function addNewCategory(currId,obj)
{
		if(currId==0){
		}else{
			var up_up_id=0;
			var up_id=$(obj).parent().parent().attr("id");
			var arr=up_id.split('_');
			if(arr.length==3){
				up_up_id=arr[0]+'_'+arr[1];
			}
			trid[0]=up_id;
			trid[1]=up_up_id;
		 	config.TR_ID=trid;
		}
		$(".mask").fadeIn("fast");
		$("#addCategory_wrap").fadeIn("fast");
		$("#category_name").val('');
		$("#category_name").nextAll(".info_explain_wrap").html('');
		$(".input_wrap").on("blur",function(){
			var id=$(this).attr("id");
			var error_str="";
			if(id="category_name"){
				var category_name=$(this).val();
				if(category_name==""){
					error_str="请输入分类名称";
				}
			}
			if(error_str!=""){
				$(this).nextAll(".info_explain_wrap").html('<img src="/newresources/images/new/er.png" /><span class="redcolor">'+error_str+'</span>');
				$(this).nextAll(".info_explain_wrap").fadeIn("fast");
			}else{
				$(this).nextAll(".info_explain_wrap").fadeOut("fast");
			}
		});
		var url = "purchaseCategory/getPurchaseCategoryTree2Json.do";
		var params = {};
		var fn = function(result) {
			var data = result.data;
			var str = '<option value="0">根节点</option>';
			for(var i = 0; i < data.length; i++){
				if(data[i].canAdd){
					str += "<option value='" + data[i].id + "'>"+data[i].text+"</option>";
					str +=loadCategory(data[i]);
				}
			}
			$("#parent_select").empty();
			$("#parent_select").prev().html('');
			$("#parent_select").append(str);
			$("#parent_select").val(currId);
			var str=$("#parent_select").children('option:selected').text();
			var a=str.split(">");
			$("#parent_select").prev().html(a[a.length-1]);
		};
		asyncAjaxMethod(url, params, true, fn);
}
var text="";
function loadCategory(data) {
	var str = "";
	if (data.children != null) {
		text += data.text + "->";
		for (var j = 0; j < data.children.length; j++) {
			if(data.children[j].canAdd){
				str += "<option value='" + data.children[j].id + "'>";
				str += text + data.children[j].text + "</option>";
				str += loadCategory(data.children[j]);
			}
		}
		var ss=text.split(">");
		var temp=">"+ss[ss.length-2];
		var num=text.lastIndexOf(temp);
		text = text.substring(0,num+1);
	}
	return str;
}
//关闭弹出层方法
function pop_div_close(id)
{
	$(".mask").fadeOut("fast");
	$("#"+id).fadeOut("fast");
	$(".mask_opacity").fadeOut("fast");
}
/*
 * 设置采购性质
 * */
function eidtCategoryNature(th,natureId,id)
{
	var offset=$(th).offset();
	getUpLevelId(th);

	$(".mask_opacity").fadeIn("fast");
	$("#categoryNatrue_wrap").css({'left':offset.left-60,'top':offset.top-30,'display':'block'});
	var url = "purchaseNature/getPurchaseNatureList.do";
	var params = {};
	var fn = function(result) {
		var item="";
		if(getParentCategoryById(id)==null||getParentCategoryById(id).purchase_nature_id==0){
			item+="<option value='0'></option>";
			for(var i=0;i<result.data.length;i++){
				item+='<option value="'+result.data[i].purchase_nature_id+'">'+result.data[i].purchase_nature_name+'</option>';
			}
		}else{
			for(var i=0;i<result.data.length;i++){
				if(getParentCategoryById(id).purchase_nature_id==result.data[i].purchase_nature_id){
					item+='<option value="'+result.data[i].purchase_nature_id+'">'+result.data[i].purchase_nature_name+'</option>';
				}
			}
		}
		$("#categoryNatrue_select").html(item);
		$("#categoryNatrue_select").val(natureId);
		$("#categoryNatrue_select").next().val(id);
	};
	asyncAjaxMethod(url, params, true, fn);
}
/*
 * 保存采购性质
 * */
function saveCategoryNature()
{
	var purchase_nature_id=$("#categoryNatrue_select").val();
	var category_id=$("#categoryNatrue_select").next().val();
	if(getParentCategoryById(category_id)==null||getParentCategoryById(category_id).purchase_nature_id==0){
		if(purchase_nature_id!=0){
			window.wxc.xcConfirm("<p style='text-align:left'>修改父类目采购性质将影响子类目的采购性质，是否继续？</p>", window.wxc.xcConfirm.typeEnum.confirm,
			{
				onOk:function(){
					updateChildrenCategoryNature(category_id,purchase_nature_id);
				},
				onCancel:function(){
				}
			});
			$(".mask_opacity").fadeOut("fast");
		}else{
			updateCategoryNature(category_id,purchase_nature_id);
		}
	}else{
		updateCategoryNature(category_id,purchase_nature_id);
	}
}
/**
 * 更新采购性质
 * updateCategoryNature void
 * @author yukai
 * 2016-9-9 下午2:19:05
 */
function updateCategoryNature(category_id,purchase_nature_id){
	$(".mask_opacity").fadeOut("fast");
	$("#categoryNatrue_wrap").css("display","none");
	var url = "purchaseCategory/updatePurchaseCategory.do";
	var params = {};
	params.category_id=category_id; 
	params.purchase_nature_id=purchase_nature_id;
	var fn = function(result) {
		if(result.data){
			$("#category_list").empty();
			loadData();
			//location.reload(true);
		}
	};
	asyncAjaxMethod(url, params, true, fn);
}
/**
 * 更新子类目采购性质
 * updateChildrenCategoryNature void
 * @author yukai
 * 2016-9-9 下午2:19:05
 */
function updateChildrenCategoryNature(category_id,purchase_nature_id){
	$(".mask").fadeOut("fast");
	$("#categoryNatrue_wrap").css("display","none");
	var url = "purchaseCategory/updateChildrenCategoryNature.do";
	var params = {};
	params.category_id=category_id; 
	params.purchase_nature_id=purchase_nature_id;
	var fn = function(result) {
		if(result.data){
			$("#category_list").empty();
			loadData();
			//location.reload(true);
		}
	};
	asyncAjaxMethod(url, params, true, fn);
}
/*
 * 保存分类
 * */
function saveCategory()
{
	if($("#category_name").val()==""){
		$("#category_name").nextAll(".info_explain_wrap").html('<img src="/newresources/images/new/er.png" /><span class="redcolor">请输入分类名称</span>');
		$("#category_name").nextAll(".info_explain_wrap").fadeIn("fast");
		return ;
	}else{
		$("#category_name").nextAll(".info_explain_wrap").fadeOut("fast");
	}
	$(".mask").fadeOut("fast");
	$("#addCategory_wrap").css("display","none");
	var category_name=$("#category_name").val();
	var f_id=$("#parent_select").val();
	var order_by=getCountByFId(f_id)+1;
	var url = "purchaseCategory/addPurchaseCategory.do";
	var params = {};
	params.category_name=category_name;
	params.f_id=f_id;
	params.order_by=order_by;
	var fn = function(result) {
		if(result.data){
			$("#category_list").empty();
			loadData();
		}
	};
	asyncAjaxMethod(url, params, true, fn);
}
/**
 * 删除分类
 * delCurrRow
 * @param currId
 * @param th void
 * @author yukai
 * 2016-9-9 上午9:08:18
 */
function delCurrRow(currId,th){
	getUpLevelId(th);
	if(!getTree2JsonById(currId)){
		var option ={title:"提示",btn:parseInt("0001",2)};
	    window.wxc.xcConfirm("含有子分类不可删除", window.wxc.xcConfirm.typeEnum.custom,option);
	}else{
		 window.wxc.xcConfirm("是否删除该类目？", window.wxc.xcConfirm.typeEnum.confirm,
					{
					onOk:function(){
						var url = "purchaseCategory/deletePurchaseCategory.do";
						var params = {};
						params.category_id=currId;
						var fn = function(result) {
							if(result.data){
								//location.reload(true);
								$("#category_list").empty();
								loadData();
							}
						};
						asyncAjaxMethod(url, params, true, fn);
					},
					onCancel:function(){
						}
					});
	}
}
/**
 * 检查是否含有子分类
 * getTree2JsonById
 * @param currId
 * @returns {Boolean} Boolean
 * @author yukai
 * 2016-9-9 上午9:08:53
 */
function getTree2JsonById(currId){
	var flag=true;
	var url = "purchaseCategory/getPurchaseCategoryTree.do";
	var params = {};
	params.category_id=currId;
	var fn = function(result) {
		if(result.data.length>1){
			flag=false;
		}
	};
	asyncAjaxMethod(url, params, false, fn);
	return flag;
}
/**
 * 查询同级分类的数量
 * getCountByFId
 * @param f_id
 * @returns any
 * @author yukai
 * 2016-9-9 上午9:09:20
 */
function getCountByFId(f_id){
	var count;
	var url = "purchaseCategory/getPurchaseCategoryList.do";
	var params = {};
	params.f_id=f_id;
	var fn = function(result) {
		count=result.data.length;
	};
	asyncAjaxMethod(url, params, false, fn);
	return count;
}
/**
 * 下移
 * orderbyDown
 * @param order_by
 * @param id
 * @param f_id void
 * @author yukai
 * 2016-9-9 上午9:10:57
 */
function orderbyDown(order_by,id,f_id,obj){
	getUpLevelId(obj);
	if(order_by==getCountByFId(f_id)){
		var option ={title:"提示",btn:parseInt("0001",2)};
	    window.wxc.xcConfirm("该类目已排在最后", window.wxc.xcConfirm.typeEnum.custom,option);
	}else{
		updateOrderbyDown_next(order_by,f_id,id);//先将下一位的order_by-1
	}
}
/**
 * 先将下一位的order_by-1
 * updateOrderbyDown_next
 * @param order_by
 * @param f_id
 * @param id void
 * @author yukai
 * 2016-9-9 上午9:11:15
 */
function updateOrderbyDown_next(order_by,f_id,id){
	var url = "purchaseCategory/updatePurchaseCategoryOrder.do";
		var params = {};
		params.f_id=f_id;
		params.order_by=order_by;
		params.order_by1=order_by+1;
		var fn = function(result) {
			if(result.data){
				updateOrderbyDown(order_by,id);//再将要下移的order_by+1
			}
		};
		asyncAjaxMethod(url, params, true, fn);
}
/**
 * 再将要下移的order_by+1
 * updateOrderbyDown
 * @param order_by
 * @param id void
 * @author yukai
 * 2016-9-9 上午9:11:35
 */
function updateOrderbyDown(order_by,id){
	var url = "purchaseCategory/updatePurchaseCategory.do";
		var params = {};
		params.category_id=id;
		params.order_by=order_by+1;
		var fn = function(result) {
			if(result.data){
				//location.reload(true);
				$("#category_list").empty();
				loadData();
			}
		};
		asyncAjaxMethod(url, params, true, fn);
}
/**
 * 上移
 * orderbyUp
 * @param order_by
 * @param id
 * @param f_id void
 * @author yukai
 * 2016-9-9 上午9:11:49
 */
function orderbyUp(order_by,id,f_id,obj){
	getUpLevelId(obj);
	if(order_by==1){
		var option ={title:"提示",btn:parseInt("0001",2)};
	    window.wxc.xcConfirm("该类目已排在最前", window.wxc.xcConfirm.typeEnum.custom,option);
	}else{
		updateorderbyUp_prev(order_by,f_id,id);//先将上一位的order_by+1
	}
}
/**
 * 先将上一位的order_by+1
 * updateorderbyUp_prev
 * @param order_by
 * @param f_id
 * @param id void
 * @author yukai
 * 2016-9-9 上午9:11:58
 */
function updateorderbyUp_prev(order_by,f_id,id){
	var url = "purchaseCategory/updatePurchaseCategoryOrder.do";
		var params = {};
		params.f_id=f_id;
		params.order_by=order_by;
		params.order_by1=order_by-1;
		var fn = function(result) {
			if(result.data){
				updateorderbyUp(order_by,id);//再将要上移的order_by-1
			}
		};
		asyncAjaxMethod(url, params, true, fn);
}
/**
 * 再将要上移的order_by-1
 * updateorderbyUp
 * @param order_by
 * @param id void
 * @author yukai
 * 2016-9-9 上午9:12:04
 */
function updateorderbyUp(order_by,id){
	var url = "purchaseCategory/updatePurchaseCategory.do";
		var params = {};
		params.category_id=id;
		params.order_by=order_by-1;
		var fn = function(result) {
			if(result.data){
				//location.reload(true);
				$("#category_list").empty();
				loadData();
			}
		};
		asyncAjaxMethod(url, params, true, fn);
}
/**
 * 根据当前类目ID找到父类目
 * getParentCategoryById
 * @param id void
 * @author yukai
 * 2016-9-9 上午11:20:02
 */
function getParentCategoryById(id){
	var category;
	var url = "purchaseCategory/getParentCategoryById.do";
	var params = {};
	params.category_id=id;
	var fn = function(result) {
		category=result.data;
	};
	asyncAjaxMethod(url, params, false, fn);
	return category;
}
/**
* 根据obj获取上级id
* getUpLevelId
* @param obj void
* @author yukai
* 2017-1-10 下午3:37:11
*/
function getUpLevelId(obj){
	var up_id=0;
	var up_up_id=0;
	var id=$(obj).parent().parent().attr("id");
	var arr=id.split('_');
	if(arr.length==3){
		up_id=arr[0]+'_'+arr[1];
	}
	if(arr.length==4){
		up_id=arr[0]+'_'+arr[1];
		up_up_id=arr[0]+'_'+arr[1]+'_'+arr[2];
	}
	trid[0]=up_id;
	trid[1]=up_up_id;
	 config.TR_ID=trid;
}