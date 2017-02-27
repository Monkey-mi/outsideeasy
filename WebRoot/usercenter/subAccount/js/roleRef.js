/*
 * 给子账号分配角色的js代码，闭包处理
 * create by yangliping 2016-8-31 13:33:13
 * 使用例子：
 * window.roleRef({title:"分配角色",accountId:sa_id,onOk:function(result){
		if(result.message=="success"){
			  var option ={title:"提示",btn:parseInt("0001",2),icon:"-32px 0",onOk:function(){close_window("ref_role_wrap");}};
			   window.wxc.xcConfirm("操作成功", window.wxc.xcConfirm.typeEnum.custom,option);
		  }
		}
	});
 * 
 * */
;$(function($,window,document,undefined){
	window.roleRef=function(options){
		"use strict";
		var roleType=0;
		if(userInfo.role_id==5){
			roleType=11;
		}else if(userInfo.role_id==1){
			roleType=10;
		}
		var options=$.extend({
			title:"角色",//弹出窗口的名称
			accountId:"",//子账号ID
			roleType:roleType,//能获取的角色类型，1：表示属于子账号能分配的角色类型
			is_enable:0,
			accountType:1,//存入账号与角色关联表中的分类，1：表示是子账号与角色的关联类型，为以后注册账号的多角色的扩展做准备
			roleUrl:"sysmodule/sysRole.do?method=getSysRoleList",//角色列表的后台请求路径
			roleRefUrl:"subAccount/getRoleAccountRefList.do",//子账号角色关联数据的后台请求路径
			submitUrl:"subAccount/checkUpdateRoleAccountRef.do",//确定按钮提交方法请求路径
			onOk: $.noop//点击确定按钮的回调函数
		},options);
		
		/*if(window.console)
		{
			console.log(options);
		}*/
		
		var popId=creatPopId();//设置弹出窗口的索引，防止重复
		var $box=$("<div>").addClass("plug_wrap");//弹窗插件容器的创建
		var $mask=$("<div>").addClass("pop_mask");//遮罩层
		var $popBox=$("<div>").addClass("pop_wrap");//弹窗盒子，居中
		var $title=$("<div>").addClass("title_wrap").text(options.title);//弹窗盒子头部标题
		var $closeBtn=$("<a>").addClass("close_btn").text("X");//关闭按钮
		
		var $checkAllArea=$("<div>").addClass("checkAll_wrap");//全选父级层
		var $checkAll=$("<input>").attr("type","checkbox");//全选按钮
		
		var $ulList=$("<ul>").addClass("ul_list");
		
		
		var $submitArea=$("<div>").addClass("t_algin_c");//提交按钮父级层
		var $submitBtn=$("<button>").addClass("pop_wrap_btn").text("确定");//提交按钮
		
		//初始化
		init();
		function init()
		{
			creatDom();
			bindEvent();
		}
		/**
		 * 创建document
		 */
		function creatDom()
		{
			$popBox.append($title).append($closeBtn);//组装标题和关闭按钮
			
			$checkAllArea.append($checkAll).append("全选");//组装全选
			$popBox.append($checkAllArea);
			
			loadData();
			$popBox.append($ulList);//组装数据集合
			
			$submitArea.append($submitBtn);
			$popBox.append($submitArea)//组装提交按钮
			
			$box.attr("id",popId).append($mask).append($popBox);
			$("body").append($box);
		}
		
		//加载后台数据，拼接到前端dom
		function loadData()
		{
			var url=options.roleUrl;
			var param={role_type:options.roleType,is_enable:options.is_enable};
			var fn=function(result){
			    var rolelist = result.data;
			    //将数据赋值给ul列表中
			    $ulList.empty();
			    for(var i= 0;i<rolelist.length;i++){
			    	var $li=$("<li>").append($("<input>").attr({"type":"checkbox","value":rolelist[i].role_id})).append(rolelist[i].role_name);
			    	$ulList.append($li);
			    }
			};
			//同步加载
			asyncAjaxMethod(url,param,false,fn);
			var url2=options.roleRefUrl;
			var params2={};
		    params2.account_id=options.accountId;
			params2.account_type=options.accountType;
			var refFn=function(result){
				var refRoles=result.data;
				for(var i=0;i<refRoles.length;i++){
					$ulList.find("input[type=checkbox]").each(function(){
						if($(this).val()==refRoles[i].role_id)
						 {
							 $(this).prop("checked",true)
						 }
					});
				}
			};
			asyncAjaxMethod(url2,params2,false,refFn);
		}
		/**
		 * 绑定事件
		 */
		function bindEvent()
		{
			$checkAll.bind("click",function(){roleAllCheck(this)});
			$submitBtn.bind("click",function(){saveRefRoleClick()});
			$closeBtn.click(doClose);
		}
		
		/**
		 * 全选/取消全选事件
		 */
		function roleAllCheck(th)
		{
			if(th.checked){
				$ulList.find("input[type=checkbox]").prop("checked",true);
			}
			else{
				$ulList.find("input[type=checkbox]").prop("checked",false);
			}
		}
		/**
		 * 提交按钮事件
		 */
		function saveRefRoleClick(){
			var addArray=[];
			var delArray=[];
			$ulList.find("input[type=checkbox]").each(function(i){
					var role_id=$(this).val();
					if($(this).prop("checked")){
						//是否在勾选的数组存在
						var index=$.inArray(role_id,addArray);
						//不存在，则添加到勾选数组中
						if(index<0){
							addArray.push(role_id);
						}
					}
					else{
						var index2=$.inArray(role_id,delArray);
						if(index2<0){
							delArray.push(role_id);
						}
					}
				});
			var url=options.submitUrl;
			var params={};
			params.saId=options.accountId;
			params.addRoleIds=addArray.join(','); 
			params.delRoleIds=delArray.join(',');
			var fn=function(result){
				options.onOk(result);
				doClose();
			}
			asyncAjaxMethod(url,params,false,fn);
		}
		
		//关闭按钮事件
		function doClose(){
			$("#" + popId).remove();
			$(window).unbind("keydown");
		}
		
		//重生popId,防止id重复
		function creatPopId(){
			var i = "pop_" + (new Date()).getTime()+parseInt(Math.random()*100000);//弹窗索引
			if($("#" + i).length > 0){
				return creatPopId();
			}else{
				return i;
			}
		}
	};
	
}(jQuery,window,document));