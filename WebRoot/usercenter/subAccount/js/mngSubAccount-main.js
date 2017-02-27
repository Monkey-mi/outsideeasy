//var gridObj;
var current_org="";
var root_org="";
var org_num;
//var pageSize=5;//每页个数
//var currentPage;//当前页码
$(function(){
	pageLayout();
	//加载树
	loadOrgTree();
	//加载人数
	loadSubNum();
	//加载最大人数
	loadSubMaxNum();
	$("#search_text").val("");
	$("#org_search_text").val("");
	$("#main").attr("checked", false); 
	//第一次加载数据
	//InitData(current_org,0,true);
	//修改默认参数配置
	/*$.fn.bsgrid.defaults.requestParamsName.pageSize = 'limit';
    $.fn.bsgrid.defaults.requestParamsName.curPage = 'page';
	gridObj = $.fn.bsgrid.init("searchTable", {
         url: getwebroot()+"subAccount/getSubAccountListByReg_id.do",
         pageSizeSelect: true,
         pageSize: 10,
         autoLoad:true,
         rowHoverColor: true,
		 //pageAll: true,             
         otherParames:{'nodeForGrid': ""}, 
         'usePaging': true
     });*/
});
	
		/**
    	分页获取数据
    	pageIndex：当前页索引
    	needinit：是否为第一次加载
    */
    function InitData(current_org)
	{
		//currentPage=pageIndex;
		var url="subAccount/getSubAccountListByReg_id.do";
		var params={};
		params.org_id=current_org;
		//params.usePaging=true;
		//params.page=pageIndex;
   		//params.limit=pageSize;
   		//params.start=parseInt(pageIndex)*pageSize;
   		var fn=function(result){
   			/*if(pageIndex==0 && needinit){
   				//第一次加载时加载分页控件
   				initPagination(result.total);
   			}*/
   			//显示数据到表格
   			addItem(result.data);
   			$("#show_sub_num").html("共 "+result.total+" 人");
   			 $("#show_sub_num").css('line-height','30px');
   		};
   		asyncAjaxMethod(url,params,true,fn);
   		
	}
/*	*//**初始化分页控件
	*//*
	function initPagination(totalCount){

		$("#pagination").pagination(totalCount, {
             callback: pageselectCallback,
             prev_text: "<",
             next_text: ">",
             items_per_page: pageSize, //每页的数据个数
             num_display_entries: 3, //两侧首尾分页条目数
             current_page: 0,   //当前页码
             num_edge_entries: 2 //连续分页主体部分分页条目数
         });
    }
	*//**翻页调用  
	*//*
	function pageselectCallback(index,jq)
	{
		InitData(current_org,index,true);
	}*/
		/**显示数据到表格 
	*/
	function addItem(array){
		/*$("#mainTbody").eq("tr:gt(0)").remove();
		if(array==null || array.length==0){
			return;
		}*/
		var tableItem="<tr>"
						+"<th width='20px'></th>"
						+"<th width='30px'>序号</th>"
						+"<th width='110px'>姓名</th>"
						+"<th width='auto'>子账号</th>"
						+"<th width='110px'>手机号</th>"
						+"<th width='80px'>公司权限</th>"
						+"<th width='90px'>供应商权限</th>"
						+"<th width='60px'>分配角色</th>"
						+"<th width='140px'>操作</th>"
					+"</tr>";
		for(var i=0;i<array.length;i++){
			var subAccount=array[i];		
			var str="";
			var str1="";
			if(subAccount.enabled==0){
				str+="<td>"
				+"<a href='javascript:void(0)' onclick=\"detailCompany("+subAccount.sa_id+");\">分配公司</a>"
				+"</td>"
				+"<td>"
				    +"<a href='javascript:void(0)' onclick=\"detailsub(0,"+subAccount.sa_id+");\">分配供应商</a>"
			    +"</td>"
			    +"<td><a href='javascript:void(0)' onclick=\"refRole("+subAccount.sa_id+");\">角色</td>";
				str1+="<tr>";
			}else{
				str+="<td></td><td></td><td></td>";
				str1+="<tr class='abandon'>";
			}
			tableItem =tableItem+str1
							+"<td>"
							+"<input type='checkbox' onclick='select_single()'  name='sub'></input>"
							+"<input type='hidden' value='"+subAccount.sa_id+"'></input>"
							+"</td>"
							+"<td>"
									+(i+1)
							+"</td>"
							+"<td class='left'>"
								+replaceNullAsStr(subAccount.username)
							+"</td>"
							+"<td class='left'>"
								+replaceNullAsStr(subAccount.sa_name)
							+"</td>"
							+"<td>"
								+replaceNullAsStr(subAccount.phone)
							+"</td>"
							+str
							+"<td>"
								+rowoperate(subAccount)
								
							+"</td>"
						+"</tr>";
			
		}
		$("#mainTbody").html(tableItem);
		//$("#mainTbody").append(tableItem);
	}
	//页面布局及事件监听
	function pageLayout(){
		//设置高度
		var height=$(".midd_left_wrap").height();
		if(height<$(window).height()-200)
		{
			$(".midd_left_wrap").height($(window).height()-200);
		}
		$("#midd_table").height($(".midd_left_wrap").height()-34);
		window.onresize=function(){
			$(".midd_left_wrap").height(500);
			if($(".midd_left_wrap").height()<$(window).height()-200)
			{
				$(".midd_left_wrap").height($(window).height()-200);
			}
			$("#midd_table").height($(".midd_left_wrap").height()-34);
		};

	}
	//加载组织部门树
	function loadOrgTree(){
		var url="organization/getOrganizationList.do";
		var params={};
		var fn=function(result){
			//加载各部门人数
			org_num=organization_num();
			var data=result.data;
			var orgTree=spellOrgTree(0,0,data);
			
			$("#org_nav").empty();
			$("#org_nav").append(orgTree);
			
			$("#org_nav>ul").css("display","block");
			$("#org_nav>ul>li").children("a").addClass("menuParent");
			//初次设置默认组织号
			for(var i=0;i<data.length;i++){
				if(data[i].parentId==0){
					current_org=data[i].org_id;
					root_org=data[i].org_id;
					var obj=$("#org_nav").children().children().children().eq(0);
					expand(obj,current_org,1,data[i].name);//默认显示公司
					break;
				}
			}
		};
		asyncAjaxMethod(url,params,true,fn);
	}
	//按输入名称 加载组织部门树
	function loadOrgTreeByName(){
		var url="organization/getOrganizationListByName.do";
		var org_search_text=$("#org_search_text").val();
		var params={};
		params.name=org_search_text;
		var fn=function(result){
			var data=result.data;
			var orgTree=spellOrgTree(0,0,data);
			$("#org_nav").empty();
			$("#org_nav").append(orgTree);
			
			$("#org_nav>ul").css("display","block");
			$("#org_nav>ul>li").children("a").addClass("menuParent");
			//初次设置默认组织号
			for(var i=0;i<data.length;i++){
				if(data[i].parentId==0){
					current_org=data[i].org_id;
					var obj=$("#org_nav").children().children().children().eq(0);
					expand(obj,current_org,1,data[i].name);//默认显示公司
					break;
				}
			}
		};
		asyncAjaxMethod(url,params,true,fn);
	}
	
	/**拼写组织树，第一次调用id应该是根节点
	params:当前节点ID，级别层次，组织列表;
	return:返回当前节点(包含子节点)的HTML代码
	*/
	function spellOrgTree(id,level,data){
		var currentLevel=(id==0)?level:level+1;
		var children=[];
		var currentRec={};
		var middlehtml="";
		var sub_num;
		for(var i=0;i<data.length;i++){
			//当前节点
			if(id==data[i].org_id){
				currentRec=data[i];
				for(var j=0;j<org_num.length;j++){
					if(currentRec.org_id==org_num[j].org_id){
						sub_num=org_num[j].org_num;
					}
				}
			}
			//获取子节点
			if(id==data[i].parentId){
				children.push(data[i]);
			}
		}
		var children_num=children.length;
		if(children.length>0){
			//每一层都要有<ul></ul>
			middlehtml="<ul>";
			for(var i=0;i<children.length;i++){
				middlehtml+=spellOrgTree(children[i].org_id,currentLevel,data);
			}
			middlehtml+="</ul>";
		}
		if(id==0){
			return middlehtml;
		}else{
			var padding_width=currentLevel*15;
			//每个currentRec都要有<li></li>
			var currenthtml="<li><a class='menuParent' onClick=\"expand(this,"+currentRec.org_id+","+currentLevel+",'"+currentRec.name+"')\"><span style='padding-left:"+padding_width+"px'>"+currentRec.name+"</span><span id='organization_num"+currentRec.org_id+"'>("+sub_num+")</span></a>";
			var endhtml=    "</li>";
			return currenthtml+middlehtml+endhtml;
		}	
		
	}
	/***ul部门树展开、收起,加载子账号
		th:当前对象；org_id：组织号；level：级别层次；deptname：组织名
	*/
	function expand(th,org_id,level,deptname)
	{
		var curr_ul=$(th).next("ul");
		
		curr_ul.toggle("normal",function(){
			if(curr_ul.is(":hidden"))
			{
				$(th).removeClass("menuParent_down");
				$(th).addClass("menuParent");
				curr_ul.find("ul").each(function(){
					$(this).prev("a").removeClass("menuParent_down");
					$(this).prev("a").addClass("menuParent");
					$(this).css("display","none");
				});
			}
			else
			{
				$(th).removeClass("menuParent");
				$(th).addClass("menuParent_down");
					
			}
			if($(".midd_left_wrap").height()<$(".midd_wrap").height())
			{
				$(".midd_left_wrap").height($(".midd_wrap").height());
			}
		});
		InitData(org_id);
		//加载子账号
		/*var firstRec=gridObj.getRecord(0);
		if(firstRec!=null && firstRec.org_id==org_id){
			return;
		}else{*/
			/*if(level==1){
				gridObj.options.otherParames.nodeForGrid="";
				gridObj.options.otherParames.leafNodeForGrid="";
				gridObj.refreshPage();
			}else{
				if(isLeafNode(org_id)){
					gridObj.options.otherParames.nodeForGrid="";
					gridObj.options.otherParames.leafNodeForGrid=org_id;
		    		gridObj.refreshPage();
				}else{
					gridObj.options.otherParames.leafNodeForGrid="";
					gridObj.options.otherParames.nodeForGrid=org_id;
			    	gridObj.refreshPage();
				}
			}*/
		//}
		//显示部门路径
		showPath(level,deptname);
		//设置当前组织编号
		current_org=org_id;
		
		//$(th).children().eq(1).html("("+gridObj.getTotalRows()+")");
	}
	/***显示部门路径
	level：级别层次；deptname：组织名 */
	var pathMap={};
	function showPath(level,deptname){
		var span=$("#show_name_span_"+level);
		//添加到数组
		pathMap[level]=deptname;
		//删除多余的
		$.each(pathMap, function(key, value) {
			if(key>level){
				delete pathMap[key]; 
			}
		});
		//遍历输出数组
		var pathstr="";
		$.each(pathMap, function(key, value) {
			if(key==1){
				pathstr+="<span id='show_name_span_"+key+"'>"+"<a class='menuParent' onClick=\"showPath1("+key+",'"+value+"')\">"+value+"</a>"+"</span>";
			}else{
				pathstr+="&gt;<span id='show_name_span_"+key+"'>"+"<a class='menuParent' onClick=\"showPath1("+key+",'"+value+"')\">"+value+"</a>"+"</span>";
			}
			
		}); 
		$("#show_name_contains").html(pathstr);		
	}
	function showPath1(level,deptname){
		showPath(level,deptname);
		
		var url="organization/findOrganizationByName.do";
		var params={};
		params.name=deptname;
		var fn=function(result){
			var data=result.data;
			var org_id=data.org_id;
			InitData(org_id);
			/*var firstRec=gridObj.getRecord(0);
			if(firstRec!=null && firstRec.org_id==org_id){
				return;
			}else{
				gridObj.options.otherParames.nodeForGrid=org_id;
	    		gridObj.refreshPage();
			}*/
			/*if(level==1){
				gridObj.options.otherParames.nodeForGrid="";
				gridObj.options.otherParames.leafNodeForGrid="";
				gridObj.refreshPage();
			}else{
			if(isLeafNode(org_id)){
				gridObj.options.otherParames.nodeForGrid="";
				gridObj.options.otherParames.leafNodeForGrid=org_id;
	    		gridObj.refreshPage();
			}else{
				gridObj.options.otherParames.leafNodeForGrid="";
				gridObj.options.otherParames.nodeForGrid=org_id;
		    	gridObj.refreshPage();
			}
			}*/
			current_org=org_id;
		};
		asyncAjaxMethod(url,params,true,fn);
	}
	
	//关闭弹出层，包括添加员工、添加部门
	function close_window(id)
	{
		$("#"+id).fadeOut("fast");
		$(".mask").fadeOut("fast");
	    params_sub = [];
	    params_subinit = [];
	}
	
	
	function rowoperate(subAccount) {
		if(subAccount.enabled==0){
			 var _str="<a href='javascript:void(0)' onclick='editsubAccount("+subAccount.sa_id+");'>编辑</a>&nbsp;";
			 _str+="<a href='javascript:void(0)' onclick=\"delsubAccount("+subAccount.sa_id+",'"+subAccount.sa_name+"');\">删除</a>&nbsp;";
			  _str+="<a href='javascript:void(0)' onclick=\"resetPassword("+subAccount.sa_id+",'"+subAccount.sa_name+"');\">密码修改</a>";
		}else{
			 var _str="<a href='javascript:void(0)' onclick=\"delsubAccount("+subAccount.sa_id+",'"+subAccount.sa_name+"');\">删除</a>&nbsp;";
		}
		return _str;
    }
    //删除子账号
	function delsubAccount(sa_id,sa_name){
		 window.wxc.xcConfirm("是否删除该账号", window.wxc.xcConfirm.typeEnum.confirm,
			{
			onOk:function(){
			var url="subAccount/delSubAccount.do";
			var params={};
			params.sa_id=sa_id;
			params.sa_name=sa_name;
			var fn=function(result){
				//重新加载总人数
				loadSubNum();
				//重新加载部门树人数
				org_num=organization_num();
				var orgs=findorg_ids();
				for(i=0;i<orgs.length;i++){
					var org_id=orgs[i].org_id;
					var sub_num;
					for(var j=0;j<org_num.length;j++){
						if(org_id==org_num[j].org_id){
							sub_num=org_num[j].org_num;
						}
					}
					$("#organization_num"+org_id+"").html("("+sub_num+")");
				}
				//加载当前部门子账号
				InitData(current_org);
			};
			asyncAjaxMethod(url,params,true,fn);
		},
		onCancel:function(){
				}
			});
	}
	//删除全部记录
	function delete_all()
	{
			var idarray=[];
			var namearray=[];
			$("#mainTbody").find("tr:gt(0)").each(function(){
					var checked=$(this).find("td:eq(0)").children()[0].checked;
					var value=$(this).find("td:eq(0)").children()[1].value;
					var name=$(this).find("td:eq(3)").text();
					if(checked){
						idarray.push(value);
						namearray.push(name);
					}
			});
			 window.wxc.xcConfirm("是否删除所有选中账号", window.wxc.xcConfirm.typeEnum.confirm,
			{
			onOk:function(){
				var url="subAccount/delSomeSubAccount.do";
				var params={};
				params.sa_ids=idarray.join(",");
				params.sa_names=namearray.join(",");
				var fn=function(result){
					//刷新当前页
					//loadOrgTree();
					loadSubNum();
					org_num=organization_num();
					var orgs=findorg_ids();
					for(i=0;i<orgs.length;i++){
						var org_id=orgs[i].org_id;
						var sub_num;
						for(var j=0;j<org_num.length;j++){
							if(org_id==org_num[j].org_id){
								sub_num=org_num[j].org_num;
							}
						}
						$("#organization_num"+org_id+"").html("("+sub_num+")");
					}
					InitData(current_org);
				};
				asyncAjaxMethod(url,params,true,fn);
			},
			onCancel:function(){
				}
			});
	}
	//密码重置
	function resetPassword(sa_id,sa_name){
		$(".mask").fadeIn("fast");
		$("#mod_password").fadeIn("fast");
		$("#sa_id").val(sa_id);
		$("#sa_name").val(sa_name);
		$("#new_password").val(666888);
	}
	//密码修改保存
	function mod_password_btn_click(){
			var url="subAccount/updateResetPassword.do";
			var sa_id=$("#sa_id").val();
			var sa_name=$("#sa_name").val();
			var password=$("#new_password").val();
			var params={};
			params.sa_id=sa_id;
			params.sa_name=sa_name;
			params.sa_password=hex_md5(password);
			var fn=function(result){
				close_window('mod_password');
			};
			asyncAjaxMethod(url,params,true,fn);
	}
	//加载人数
	function loadSubNum(){
		var url="subAccount/findSubAccountByreg_id.do";
		var params={};
		var fn=function(result){
			var count=result.data;
			$("#sub_total_num").text(count);
		};
		asyncAjaxMethod(url,params,true,fn);
	}
	
	//加载最大人数
	function loadSubMaxNum(){
		var url="organization/findMaxNumByCompanyId.do";
		var params={};
		var fn=function(result){
			var maxnum=result.data;
			$("#sub_max_num").text(maxnum);
		};
		asyncAjaxMethod(url,params,true,fn);
	}
	//是否叶子节点
	function isLeafNode(org_id){
	var url="organization/isLeafNode.do";
	var params={};
	params.org_id=org_id;
	var LeafNodeflag=false;
	var fn=function(result){
		if(result.data){
			LeafNodeflag=true;
		}
	};
	asyncAjaxMethod(url,params,false,fn);//同步
	return LeafNodeflag;
	}
	//部门人数
	function organization_num(org_id){
		var url="subAccount/getSubCount.do";
		var params={};
		var num;
   		var fn=function(result){
   			num=result.data;
   		};
   		asyncAjaxMethod(url,params,false,fn);
   		return num;
	}
	//搜索
	function doSearch(){
		var search_text=$("#search_text").val();
		var url="subAccount/getSubAccountListByReg_id.do";
		var params={};
		params.condition=search_text;
   		var fn=function(result){
   			resetPath();
   			//显示数据到表格
   			addItem(result.data);
   			$("#show_sub_num").html("共 "+result.total+" 人");
   			 $("#show_sub_num").css('line-height','30px');
   		};
   		asyncAjaxMethod(url,params,true,fn);
	}
	//重置部门路径
	function resetPath(){
		var url="organization/getOrganizationList.do";
		var params={};
		var fn=function(result){
			var data=result.data;
			//初次设置默认组织号
			for(var i=0;i<data.length;i++){
				if(data[i].parentId==0){
					showPath(1,data[i].name);//默认显示公司
					break;
				}
			}
		};
		asyncAjaxMethod(url,params,true,fn);
	}
	
	//根据org_id找到所有上级部门
	function findParents(org_id){
	var url="organization/getOrganizationListByOrg_id.do";
        	
	var params={};
	params.org_id=org_id;
	var data=null;
	var fn=function(result){
		data=result.data;
	};
	asyncAjaxMethod(url,params,false,fn);//同步
	return data;
	}
	
	//找到所有部门org_id
	function findorg_ids(){
	var url="organization/getOrganizationList.do";
        	
	var params={};
	var data=null;
	var fn=function(result){
		data=result.data;
	};
	asyncAjaxMethod(url,params,false,fn);//同步
	return data;
	}
	
	//全选
	function select_all(ind){
	var	trbody ="";
	var check ="";
	if(parseInt(ind)==1){
		var trbody = "mainTbodysub";
	    var check = "mainsub";		
	    saveSubfileID(0,"",$("#"+check)[0].checked);//存储选中的id值
	}else{
		var trbody = "mainTbody";
	    var check = "main";
	}
		if($("#"+check)[0].checked){    
            $("#"+trbody).find("tr:gt(0)").each(function(){
				$(this).find("td:eq(0)").children().prop("checked", true); 
			});   
        }else{    
            $("#"+trbody).find("tr:gt(0)").each(function(){
				$(this).find("td:eq(0)").children().prop("checked", false); 
			});
        }  
	}
	/**
	 * 分配供应商
	 * @auto chenlong
	 * @date 2016-7-7
	 */
	function detailsub(ind,sa_id){	
		if(parseInt(ind)==0){//判断是否初始化条件
		    $("#org_search_sub").val("");	
		    $("#sub_huan_id").val(sa_id);  
		    selectSubwith(sa_id);//查询出子账号与供应商已有的关联关系
		}
		if(parseInt(ind)==1){//判断是否初始化条件
		  getSupplierFilesListID();
		}
		$("#mainsub").prop("checked", false); 
		$(".mask").fadeIn("fast");
	    $("#add_detailsub").fadeIn("fast");
	    var serach = $("#org_search_sub").val().trim();//条件搜索
	    var param = {supplier_cpyname:serach};
	    searchSubFiles(param);//加载供应商列表
	    addsuCount(param);//加载供应商数量
	}
	var pageSize = 10;//每页个数	
	var currentPage=0;//当前页码
	var params_sub =[];//定义一个就是数组存储勾选值id
	var params_subinit =[];//定义一个初始的数组记录用户对供应商的操作
	/**关联供应商信息查询的初始化
	*/
	function searchSubFiles(param){
		var url = "supplierRegaccountInfo/getSupplierFilesList.do";
		var params={supplier_cpyname:param.supplier_cpyname};	   
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
	params.supplier_cpyname = param.supplier_cpyname;
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
			addItems(result.data);						
		};
	asyncAjaxMethod(url,params,true,fn);
		
	}
		/**供应商信息的翻页调用  
	*/
	function pageselectCallbacks(index,jq)
	{
		var url = "supplierRegaccountInfo/getSupplierFilesList.do";			
		var serach = $("#org_search_sub").val().trim();//条件搜索
	    var params = {supplier_cpyname:serach};
		InitDatas(index,false,url,params);
	}
	/**初始化分页控件
	*/
	function initPaginations(totalCount){
	
		$("#paginationsub").pagination(totalCount, {
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
	 * 加载供应商数量
	 */
	function addsuCount(param){
		var url = "supplierRegaccountInfo/getSupplierFilesCount.do";
		var params ={supplier_cpyname:param.supplier_cpyname};
		var fn = function(result){
		 $('#show_sub_numsub').html(result.data);
		};
		asyncAjaxMethod(url,params,false,fn);
	}
	/**
	 * 显示供应商信息
	 * @param {} result
	 */
	function addItems(result){
			$('#mainTbodysub').empty();
			var _SubFiles = "";
			var length = result.length;	
			var tableItem= '<tr>'+
		       		'<th width="40px"></th>'+
					'<th width="120px">序号</th>'+
					'<th width="auto" class="left">供应商名称</th>	'+									
		   '</tr>' ; 
			if(length!=0){
			for(var i=0; i<length;i++){
				var subfiles = result[i];
				_SubFiles = _SubFiles+
				'<tr>'+
				 '<td>'+
					'<input type="checkbox" onclick="select_single_sub(this)"  name="sub"></input>'+
					'<input type="hidden" value="'+replaceNullAsStr(subfiles.supplier_id)+'"></input>'+
				 '</td>'+
				 '<td>'+
					'<div class="cell_in_td">'+(i+1)+'</div>'+
				 '</td>'+
				 '<td class="left">'+
					'<div class="cell_in_td">'+replaceNullAsStr(subfiles.supplier_cpyname)+'</div>'+
				 '</td>'+
			    '</tr>';
			}
			$('#mainTbodysub').append(tableItem+_SubFiles);			
			allsub();//判断翻页后是否是全选		
		}else{
			$('#mainTbodysub').append('<tr><td>'+
								'<div class="cell_in_td">无供应商</div>'+
							'</td></tr>');							
		}
	}
	//查询出子账号下的所有供应商id放
	function getSupplierFilesListID(){
   	    var url ="supplierRegaccountInfo/getSupplierFilesListID.do";
        var serach = $("#org_search_sub").val().trim();//条件搜索
        var param = {supplier_cpyname:serach};//var param ={};
        var fn = function(result){
		var sub_list = result.data;
		var length = sub_list.length;
		var allflag =0;
		var len = 0;
	    var params_subVo =[];//定义临时一个就是数组存储勾选值id
		if(length==0){
			return ;
		}else{
			len = length;
		for(var i= 0; i<length;i++){
			var sub_id = sub_list[i].supplier_id;			 	
			for (x in params_subinit) {			
			    if(params_subinit[x]==sub_id && params_subinit[parseInt(x)+1]==true ){
			       allflag++;
			       params_subVo.push(sub_id);			 
			    }
			 }			
		}
		params_sub = params_subVo;
		if(len==allflag && len !=0 && allflag != 0){
				$('#mainsub').prop("checked", true);
			}else{//由于位置原因会有自动赋值为true，所以在此添加以避免错误
				$('#mainsub').prop("checked", false);
			}
		}
	    };
	asyncAjaxMethod(url,param,true,fn);
	}
	//判断翻页后是否是全选
	function allsub(){
		if($("#mainsub")[0].checked){		   
            $("#mainTbodysub").find("tr:gt(0)").each(function(){
				$(this).find("td:eq(0)").children().prop("checked", true); 
			});   
		}else{			
		    $("#mainTbodysub").find("tr:gt(0)").each(function(){		  
			    for (x in params_sub) {		  
				if(params_sub[x]==parseInt($(this).find("td:eq(0) input:eq(1)").val())){
			       $(this).find("td:eq(0)").children().prop("checked", true); 
				}
			    }
			});
							
		}
		var lenss = $('#show_sub_numsub').html();
		if(params_sub.length== parseInt(lenss)){
			$('#mainsub').prop("checked", true);
		}
	}
	/**
	 * 进行原数组的比对
	 * @param {} sub_id
	 */
   function initparams_sub(sub_id,sta){
   	for (x in params_subinit) {//存储数组的变化   	
   		if(params_subinit[x]==parseInt(sub_id)&&parseInt(sub_id)==1&&x==0){//当id=1时，由于true在接受中也代表1，造成不该有的错误,必须进过这里的特殊处理
			params_subinit[parseInt(x)+1]=sta;//删除x位置的一个元素	
   		}
         if(params_subinit[x]==parseInt(sub_id) && params_subinit[x] != true && params_subinit[x] != false && parseInt(sub_id)!=1){//判断是否存在该值，存在则数组中删除       
         	params_subinit[parseInt(x)+1]=sta;//删除x位置的一个元素
         }
       }
   }

  /**
   * 存储选中的id值
   * @param {} sub_id
   * @param {} che
   */
  function saveSubfileID(ind,sub_id,che){ 
  	switch(parseInt(ind)){
  	case 1://单选时执行
  	    if(che==true){//判断是否选中
  	    params_sub.push(parseInt(sub_id));//存入值
  	    initparams_sub(sub_id,che);
  	    }else{
        for (x in params_sub) {
            if(params_sub[x]==sub_id){//判断是否存在该值，存在则数组中删除
         	params_sub.splice(x,1);//删除x位置的一个元素
         }
        }
      initparams_sub(sub_id,che);
  	}
  	break;
  	case 0://0的时候查询出所有的供应商的id进行编辑//全选时选时执行  			
  		var url ="supplierRegaccountInfo/getSupplierFilesListID.do";
  	    var serach = $("#org_search_sub").val().trim();//条件搜索
	    var param = {supplier_cpyname:serach};//var param ={};
  		var fn = function(result){
  			var sub_list = result.data;
  			var length = sub_list.length; 
  			 if(length==0){
  				return ;
  			 }else{
  			 if(che==true){//判断是否选中 			  
  				params_sub=[];
  			 for(var i= 0; i<length;i++){
  				var sub_id = sub_list[i].supplier_id;
  				params_sub.push(sub_id);//存入值	
  				initparams_sub(sub_id,che);
  			 } 
  			 }else{
  			 for(var i= 0; i<length;i++){
  				var sub_id = sub_list[i].supplier_id;
  				initparams_sub(sub_id,che);
  			}
  			    params_sub=[];//变为空值数组 			 		
  			}
  	      }	
  		};
  		asyncAjaxMethod(url,param,true,fn);  
  	break;
  	}
  }
  //单选
function select_single_sub(obj) {
	var supplier_id = $(obj).next().val();	//获取供应商的id	 
	saveSubfileID(1,supplier_id,obj.checked);//存储选中的id值	
	var chk = params_sub.length;
	var chknum =  parseInt($('#show_sub_numsub').html());//选项总个数 
	if (chknum == chk) {//全选 
		$('#mainsub').prop("checked", true);
	} else {//不全选 
		$('#mainsub').prop("checked", false);
	}
}
/**
 * 保存子账号与供应商的关联关系
 * @author chenlong
 * @date 2016-7-11
 */
function saveSubWithAccess(){
	   var lengthdd = params_sub.length;
	   var lengthd = params_subinit.length;
	   var sa_id =  $("#sub_huan_id").val();	
	   var url ="subAccount/addSubaccountSupplierInfo.do"; 	  
	   var param = {sa_id:sa_id,lengthdd:lengthdd,lengthd:lengthd};//var param ={};
	   param.sub_id = {};//定义一个对象中的对象
	   param.subinit_id = {};//定义一个对象中的对象	   
	   for (x in params_sub) {
         param.sub_id[x] = params_sub[x];//将参数赋值进入该对象中
       }
       for (x in params_subinit) {
         param.subinit_id[x] = params_subinit[x];//将参数赋值进入该对象中
       }
  	   var fn = function(result){
       var option ={title:"提示",btn:parseInt("0001",2)};
	   window.wxc.xcConfirm(result.message, window.wxc.xcConfirm.typeEnum.custom,option);
       close_window('add_detailsub');
       params_sub = [];
	   params_subinit = [];
  	   };
  	   asyncAjaxMethod(url,param,true,fn);
	 
}
/**
 * 查询出子账号与供应商已有的关联关系
 * @param {} sa_id
 */
    function selectSubwith(sa_id){
    if(sa_id != "" && sa_id != null){
    var url ="subAccount/getSubaccountSupplierInfoList.do"; 	  
	   var param = {sa_id:sa_id};//var param ={};	  	 
  	   var fn = function(result){
       var sublist = result.data;
       var length = sublist.length;
       for(var i= 0;i<length;i++){
     		var subl = sublist[i];
     		params_sub.push(subl.supplier_id);
     		params_subinit.push(parseInt(subl.supplier_id),true);
     	}
  		};
  	   asyncAjaxMethod(url,param,false,fn);
    }else{
    	var option ={title:"提示",btn:parseInt("0001",2)};
	    window.wxc.xcConfirm("您的子账号id为空", window.wxc.xcConfirm.typeEnum.custom,option);
    }
    }
//单选
function select_single() {		
	var chknum =  $('#mainTbody').find("tr:gt(0)").size();//选项总个数 
	var chk = 0;
	$('#mainTbody').find("tr:gt(0)").each(function() {
		if ($(this).find("td:eq(0)").children()[0].checked == true) {			
			chk++;		
		}
	});
	if (chknum == chk) {//全选 
		$('#main').prop("checked", true);
	} else {//不全选 
		$('#main').prop("checked", false);
	}
}

 
/**
* detailCompany加载公司的选项
* @param ind
* @param sa_id
* @return void
* @author chenlong
* 2016-8-9
*/
function detailCompany(sa_id){
	$('#add_detailcom').vo_init({type:1,sa_id:sa_id,onSomeEvent:close_window});	
}

/**
 * 
 * refRole 打开子账号分配角色窗口
 * @param sa_id void
 * @author yangliping
 * 2016-8-25 下午5:17:31
 */
function refRole(sa_id)
{
	window.roleRef({title:"分配角色",accountId:sa_id,onOk:function(result){
		//console.log(result)
		if(result.message=="success"){
			  var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0",onOk:function(){close_window("ref_role_wrap");}};
			   window.wxc.xcConfirm("操作成功", window.wxc.xcConfirm.typeEnum.custom,option);
		  }
		}
	});
	
}

