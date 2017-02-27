/**自定义弹出分配的公司的弹出层插件，用于给子账户分配公司
 * 先初始化vo_init()
 * 配置项type:1 //TODO公司；type=2,供应商
 * chenlong
 * */
 
(function($) {
	var pageSizev = 10;//每页个数	
	var currentPagev=0;//当前页码
	var params_subc =[];//定义一个就是数组存储勾选值id
	var params_subinitc =[];//定义一个初始的数组记录用户对供应商的操作	
 	//默认配置
 	var defaults = {
		name: '自定义弹出分配的公司的弹出层插件',
		type:1,//1：公司，2：供应商
		sa_id:0,//子账号的ID
		onSomeEvent: function() {}
	};
	//初始化
	$.fn.vo_init = function(options) {
		//配置参数覆盖
		var options = $.extend(defaults, options); 
 		
		return $(this).each(function() {
			var $this = $(this);
			if(defaults.type==1){//公司
				$this.html(
					'<div class="title_wrap">'+
						'分配公司'+
						'<a class="close_btn" >X</a>'+
					'</div>'+
					
					'<div class="sub_pop_inner_div">'+
						'<input id="maincom" type="checkbox"/>'+
						'<span>全部选中</span>'+
						'<div class="search_wrap clearfix">'+
							'<input type="text" id="org_search_com" placeholder="请输入公司名称"/>'+
							'<button id="org_search_coms"></button>'	+		
						'</div>'+
						/*'<span class="ml100">共&nbsp;<a id="show_com_numsub" ></a>&nbsp;个公司</span>'+*/
					'</div>'+
					'<div class="ml10 mr10">'+
						'<table id="searchTablecom" class="subAccount_tablelist">'+
							'<tbody id="mainTbodycom">'+				
								'</tbody>'+
						'</table>'+
					'</div>'+
						'<div id="paginationcom" class="quotes clearfix"></div>'+
						'<div class="form_btn_wrap">'+
							'<button type="button" class="form_btn" >保存</button>'+
					'</div>'			
				);
			}
			$("#maincom").on("click",selectcom_all);
			$this.find(".close_btn").on("click",close_windowVo);
			$this.find("#org_search_coms").on("click",search_initcom);
			$this.find(".form_btn").on("click",saveComWithAccess);
			$(".mask").fadeIn("fast");
			$this.fadeIn("fast");		 
			selectComwith();//查询出子账号与公司已有的关联关系	
			//addcoCount();//加载供应商数量
		    searchComFiles();//加载\公司列表    
		});
		
	};
	/**
	 * 搜索时初始化
	 */
	function search_initcom(){
		 getCompanyFilesListID();//条件搜索
		 searchComFiles();//加载\公司列表
		 //addcoCount();//加载供应商数量
	}
	/**关联供应商信息查询的初始化
	*/
	function searchComFiles(){
		var serach = $("#org_search_com").val().trim();//条件搜索
		var param = {supplier_cpyname:serach};
		var url = "regAccoutCompanyInfo/getRegAccoutCompanyInfoOne.do";
		var params={supplier_cpyname:param.supplier_cpyname};	   
		InitDatas_com(0,true,url,params);
	}
	//关闭弹出层，包括添加员工、添加部门
	function close_windowVo()
	{
		$("#add_detailcom").fadeOut("fast");
		$(".mask").fadeOut("fast");
	    params_subc = [];
	    params_subinitc = [];
	}
	/**
	分页获取数据
	pageIndex：当前页索引
	needinit：是否为第一次加载
	*/
	function InitDatas_com(pageIndex,needinit,url,param)
	{
	currentPagev=pageIndex;
	var url=url;
	var params={};
	params.supplier_cpyname = param.supplier_cpyname;
	params.usePaging=true;
	params.page=pageIndex;
	params.limit=pageSizev;
	params.start=parseInt(pageIndex)*pageSizev;
	var fn=function(result){
		if(pageIndex==0 && needinit){
				//第一次加载时加载分页控件
			initPaginations_com(result.total);
		}
			//显示数据到表格
			addItems_com(result.data);						
		};
	asyncAjaxMethod(url,params,true,fn);
		
	}
	/**供应商信息的翻页调用  
	*/
	function pageselectCallbacks_com(index,jq)
	{
		var url = "regAccoutCompanyInfo/getRegAccoutCompanyInfoOne.do";			
		var serach = $("#org_search_com").val().trim();//条件搜索
	    var params = {supplier_cpyname:serach};
	    InitDatas_com(index,false,url,params);
	}
	/**初始化分页控件
	*/
	function initPaginations_com(totalCount){
	
		$("#paginationcom").pagination(totalCount, {
	         callback: pageselectCallbacks_com,
	         prev_text: "<",
	         next_text: ">",
	         items_per_page: pageSizev, //每页的数据个数
	         num_display_entries: 3, //两侧首尾分页条目数
	         current_page: 0,   //当前页码
	         num_edge_entries: 2 //连续分页主体部分分页条目数
	     });
	}
	/**
	 * 加载供应商数量
	 */
/*	function addcoCount(){
		var serach = $("#org_search_com").val().trim();//条件搜索
		var param = {supplier_cpyname:serach};
		var url = "regAccoutCompanyInfo/getRegAccoutCompanyInfoCount.do";
		var fn = function(result){
		 $('#show_com_numsub').html(result.data);
		};
		asyncAjaxMethod(url,param,false,fn);
	}*/
	/**
	 * 显示供应商信息
	 * @param {} result
	 */
	function addItems_com(result){
			$('#mainTbodycom').empty();
			var _SubFiles = "";
			var length = result.length;	
			var tableItem= '<tr>'+
		       		'<th width="40px"></th>'+
					'<th width="120px">序号</th>'+
					'<th width="auto" class="left">公司名称</th>	'+									
		   '</tr>' ; 
			if(length!=0){
			for(var i=0; i<length;i++){
				var subfiles = result[i];
				_SubFiles = _SubFiles+
				'<tr>'+
				 '<td>'+
					'<input type="checkbox"  name="sub"></input>'+
					'<input type="hidden" value="'+replaceNullAsStr(subfiles.company_id)+'"></input>'+
				 '</td>'+
				 '<td>'+
					'<div class="cell_in_td">'+(i+1)+'</div>'+
				 '</td>'+
				 '<td class="left">'+
					'<div class="cell_in_td">'+replaceNullAsStr(subfiles.cpyname_cn)+'</div>'+
				 '</td>'+
			    '</tr>';
			}
			$('#mainTbodycom').append(tableItem+_SubFiles);	
			$("#mainTbodycom").find("tr:gt(0) [type='checkbox']").on("click",select_single_com);
			allcom();//判断是否是全选		
		}else{
			$('#mainTbodycom').append('<tr><td>'+
								'<div class="cell_in_td">无公司</div>'+
							'</td></tr>');							
		}
	}
	//判断翻页后是否是全选
	function allcom(){
		if($("#maincom")[0].checked){		   
            $("#mainTbodycom").find("tr:gt(0)").each(function(){
				$(this).find("td:eq(0)").children().prop("checked", true); 
			});   
		}else{			
		    $("#mainTbodycom").find("tr:gt(0)").each(function(){		  
			    for (x in params_subc) {		  
				if(params_subc[x]==parseInt($(this).find("td:eq(0) input:eq(1)").val())){
			       $(this).find("td:eq(0)").children().prop("checked", true); 
				}
			    }
			});							
		}
		var lenss = $('#show_com_numsub').html();
		if(params_subc.length== parseInt(lenss)){
			$('#maincom').prop("checked", true);
		}
	}
	
	//单选
	function select_single_com() {
		var obj = $(this);
		var supplier_id = $(obj).next().val();	//获取供应商的id	 
		saveComfileID(1,supplier_id,obj.is(":checked"));//存储选中的id值	
		var chk = params_subc.length;
		var chknum =  parseInt($('#show_com_numsub').html());//选项总个数 
		if (chknum == chk) {//全选 
			$('#maincom').prop("checked", true);
		} else {//不全选 
			$('#maincom').prop("checked", false);
		}
	}
	//全选
	function selectcom_all(){
		var trbody = "mainTbodycom";
	    var check = "maincom";		
	    saveComfileID(0,"",$("#"+check)[0].checked);//存储选中的id值
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
   *  查询出子账号与公司已有的关联关系
   */
	var selectComwith=function (){
		 $("#org_search_com").val("");	
		 if(defaults.sa_id != 0 && defaults.sa_id != null){
			    var url ="subAccount/getSubaccCompanyAuthorityList.do"; 	  
				var param = {sa_id:defaults.sa_id};//var param ={}; 
			  	var fn = function(result){
			    var sublist = result.data;
			    var length = sublist.length;
			    for(var i= 0;i<length;i++){
			     	var subl = sublist[i];
			     	params_subc.push(subl.company_id);
			     	params_subinitc.push(parseInt(subl.company_id),true);
			     }
			  	 };
			  	 asyncAjaxMethod(url,param,false,fn);
			     }else{
			     var option ={title:"提示",btn:parseInt("0001",2)};
				 window.wxc.xcConfirm("您的子账号id为空", window.wxc.xcConfirm.typeEnum.custom,option);
			   }
	};
	//查询出账号下的所有公司id放
	var getCompanyFilesListID = function(){
		var url ="regAccoutCompanyInfo/getRegAccoutCompanyListID.do";
        var serach = $("#org_search_com").val().trim();//条件搜索
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
			var sub_id = sub_list[i].company_id;			 	
			for (x in params_subinitc) {			
			    if(params_subinitc[x]==sub_id && params_subinitc[parseInt(x)+1]==true ){
			       allflag++;
			       params_subVo.push(sub_id);			 
			    }
			 }			
		}
		params_subc = params_subVo;
		if(len==allflag && len !=0 && allflag != 0){
				$('#maincom').prop("checked", true);
			}else{//由于位置原因会有自动赋值为true，所以在此添加以避免错误
				$('#maincom').prop("checked", false);
			}
		}
	    };
	    asyncAjaxMethod(url,param,true,fn);
	};
	   /**
   * 存储选中的id值
   * @param {} sub_id
   * @param {} che
   */
  function saveComfileID(ind,sub_id,che){ 
  	switch(parseInt(ind)){
  	case 1://单选时执行
  	    if(che==true){//判断是否选中
  	    params_subc.push(parseInt(sub_id));//存入值	
  	    initparams_com(sub_id,che);
  	    }else{
        for (x in params_subc) {
            if(params_subc[x]==sub_id){//判断是否存在该值，存在则数组中删除
         	params_subc.splice(x,1);//删除x位置的一个元素
         }
        }
      initparams_com(sub_id,che);
  	}
  	break;
  	case 0://0的时候查询出所有的供应商的id进行编辑//全选时选时执行  			
  		var url ="regAccoutCompanyInfo/getRegAccoutCompanyListID.do";
  	    var serach = $("#org_search_sub").val().trim();//条件搜索
	    var param = {supplier_cpyname:serach};//var param ={};
  		var fn = function(result){
  			var sub_list = result.data;
  			var length = sub_list.length; 
  			 if(length==0){
  				return ;
  			 }else{
  			 if(che==true){//判断是否选中 			  
  				params_subc=[];
  			 for(var i= 0; i<length;i++){
  				var sub_id = sub_list[i].company_id;
  				params_subc.push(sub_id);//存入值	
  				initparams_com(sub_id,che);
  			 } 
  			 }else{
	  			 for(var i= 0; i<length;i++){
	  				var sub_id = sub_list[i].company_id;
	  				initparams_com(sub_id,che);
	  			}
  			    params_subc=[];//变为空值数组 			 		
  			}
  	      }	
  		};
  		asyncAjaxMethod(url,param,true,fn);  
  	break;
  	}
  }
  /**
	 * 进行原数组的比对
	 * @param {} sub_id
	 */
 function initparams_com(sub_id,sta){
 	for (x in params_subinitc) {//存储数组的变化   	
 		if(params_subinitc[x]==parseInt(sub_id)&&parseInt(sub_id)==1&&x==0){//当id=1时，由于true在接受中也代表1，造成不该有的错误,必须进过这里的特殊处理
		params_subinitc[parseInt(x)+1]=sta;//删除x位置的一个元素	
 		}
        if(params_subinitc[x]==parseInt(sub_id) && params_subinitc[x] != true && params_subinitc[x] != false && parseInt(sub_id)!=1){//判断是否存在该值，存在则数组中删除       
       	params_subinitc[parseInt(x)+1]=sta;//删除x位置的一个元素
       }
     }
 }
 
 /**
  * 保存子账号与供应商的关联关系
  * @author chenlong
  * @date 2016-8-9
  */
 function saveComWithAccess(){
 	   var lengthdd = params_subc.length;
 	   var lengthd = params_subinitc.length;
 	   var sa_id =  defaults.sa_id;
 	   var url ="subAccount/addSubCompanyInfo.do"; 	  
 	   var param = {sa_id:sa_id,lengthdd:lengthdd,lengthd:lengthd};//var param ={};
 	   param.sub_id = {};//定义一个对象中的对象
 	   param.subinit_id = {};//定义一个对象中的对象	   
 	   for (x in params_subc) {
          param.sub_id[x] = params_subc[x];//将参数赋值进入该对象中
        }
        for (x in params_subinitc) {
          param.subinit_id[x] = params_subinitc[x];//将参数赋值进入该对象中
        }
   	   var fn = function(result){
       var option ={title:"提示",btn:parseInt("0001",2)};
 	   window.wxc.xcConfirm(result.message, window.wxc.xcConfirm.typeEnum.custom,option);
       close_window('add_detailcom');
       params_subc = [];
	   params_subinitc = [];
   	   };
   	   asyncAjaxMethod(url,param,true,fn);	 
 }
})(jQuery);