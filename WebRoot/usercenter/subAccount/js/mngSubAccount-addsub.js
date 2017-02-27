var mobile_reg=/^1[3|4|5|8]\d{9}$/;
var account_reg=/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
var add_sub_account_name_flag;
var add_mobile_flag;
var add_sub_account_flag;
var add_password_flag;
var org_name_flag;
//添加员工
function add_subAccount(th) {
	/*var url = "organization/findAllParentId.do";
	var params = {};
	var fn = function(result) {
		var flag = true;//叶子节点标记
		var data = result.data;
		for (i = 0; i < data.length; i++) {
			if (current_org == data[i]) {//判断是否叶子节点
				flag = false;
			} else {
			}
		}
		if (!flag) {
			window.wxc.xcConfirm("只有叶子节点的部门可以添加员工", confirm);
		} else {*/
			$("#add_subAccount").find(".info_explain_wrap").each(function(){
				$(this).html('');
			});
			$(".mask").fadeIn("fast");
			$("#add_subAccount").fadeIn("fast");
			$(th).parent().parent().find("a").removeClass("curr_li");
			$(th).addClass("curr_li");
			// 加载下拉列表数据
			var url = "organization/getOrganizationListAndUserName.do";
			var params = {};
			params.org_id=root_org;
			var fn = function(result) {
				var data = result.data;
				var str = "";
				for (var i = 0; i < data.length; i++) {
					data[i].isParent=false;
					for (var j = 0; j < data.length; j++) {
						if(data[i].org_id==data[j].parentId){
							data[i].isParent=true;
						}else{
						}
					}
					
				}
				for(var i = 0; i < data.length; i++){
					if(!data[i].isParent){
						var list=data[i].parentOrganizations;
						str += "<option value='" + data[i].org_id + "'>";
						for(var j=list.length-1;j>0;j--){
							str +=list[j].name+"->";
						}
						str += data[i].name + "</option>";
					}
				}
				$("#subAccount_select_org").empty();
				$("#subAccount_select_org").prev().html('');
				$("#subAccount_select_org").append(str);
				// 初始赋值
				$("#add-subAccount-form input[type=reset]").trigger("click");
				$("#subAccount_select_org").val(current_org);
				var str=$("#subAccount_select_org").children('option:selected').text();
				var a=str.split(">");
				$("#subAccount_select_org").prev().html(a[a.length-1]);
				$("#sub_account_prefix").val(result.userName + ":");
				// 重置控制标记
				add_sub_account_name_flag = true;
				add_mobile_flag = true;
				add_sub_account_flag = true;
				add_password_flag = true;
				org_name_flag=true;
			};
			asyncAjaxMethod(url, params, true, fn);
//		}
//	};
//	asyncAjaxMethod(url, params, true, fn);
}
//添加员工保存按钮事件
function add_account_btn_click()
{	
		if($("#sub_account_name").val()=="")
		{
			$("#sub_account_name").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入姓名</span></div>");
			$("#sub_account_name").nextAll(".info_explain_wrap").fadeIn("fast");
			add_sub_account_name_flag=false;
		}else{
			add_sub_account_name_flag=true;
		}
		if($("#sub_account").val()==""){
			$("#sub_account").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入子账号</span></div>");
			$("#sub_account").nextAll(".info_explain_wrap").fadeIn("fast");
			add_sub_account_flag=false;
		}
		else if(strlen($("#sub_account").val())<3||strlen($("#sub_account").val())>15){
			$("#sub_account").nextAll(".info_explain_wrap").html("<div class='info_explain' style='width:160px'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入3~15位字符长度</span></div>");
			$("#sub_account").nextAll(".info_explain_wrap").fadeIn("fast");
			add_sub_account_flag=false;
		}
		else if(!account_reg.test($("#sub_account").val())){
			$("#sub_account").nextAll(".info_explain_wrap").html("<div class='info_explain' style='width:160px'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请使用数字或字母或下划线或汉字等任意组合</span></div>");
			$("#sub_account").nextAll(".info_explain_wrap").fadeIn("fast");
			add_sub_account_flag=false;
		}
		else if(checkSubAccountExist($("#sub_account").val())){
			$("#sub_account").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>该账号已存在</span></div>");
			$("#sub_account").nextAll(".info_explain_wrap").fadeIn("fast");
			add_sub_account_flag=false;
		}else{
			add_sub_account_flag=true;
		}
		if($("#password").val()=="")
		{
			$("#password").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入密码</span></div>");
			$("#password").nextAll(".info_explain_wrap").fadeIn("fast");
			add_password_flag=false;
		}else{
			add_password_flag=true;
		}
		if($("#mobile").val()==""){
			$("#mobile").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入手机号码</span></div>");
			$("#mobile").nextAll(".info_explain_wrap").fadeIn("fast");
			add_mobile_flag=false;
		}else{
			if(!mobile_reg.test($("#mobile").val()))
			{
				$("#mobile").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入正确的手机号码</span></div>");
				$("#mobile").nextAll(".info_explain_wrap").fadeIn("fast");
				add_mobile_flag=false;
			}else{
				if(checkMobileExist($("#mobile").val())){
					$("#mobile").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>手机号码已存在</span></div>");
					$("#mobile").nextAll(".info_explain_wrap").fadeIn("fast");
					add_mobile_flag=false;
				}else{
					add_mobile_flag=true;
				}
			}
		}
		//所属部门为空
		if(!$("#subAccount_select_org").val())
		{
			$("#subAccount_select_org").next(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请选择所属部门</span></div>");
			$("#subAccount_select_org").next(".info_explain_wrap").fadeIn("fast");
			org_name_flag=false;
		}else{
			org_name_flag=true;
		}
		if(add_sub_account_name_flag&&add_mobile_flag&&add_sub_account_flag&&add_password_flag&&org_name_flag){
			submitSubAccount();
		}
}
/**
 * 检查子账号是否已存在
 * checkSubAccountExist
 * @param sub_account
 * @returns {Boolean} Boolean
 * @author yukai
 * 2016-11-15 上午9:07:28
 */
function checkSubAccountExist(sub_account){
	var url="subAccount/checkSubAccountExist.do";
        	
	var params={};
	params.name=sub_account;
	var exist=false;
	var fn=function(result){
		if(result.data){
			exist=true;
		}
	};
	asyncAjaxMethod(url,params,false,fn);//同步
	return exist;
}
/**
 * 检查手机号是否已存在
 * checkMobileExist
 * @param mobile
 * @returns {Boolean} Boolean
 * @author yukai
 * 2016-11-15 上午9:08:10
 */
function checkMobileExist(mobile){
	var url="subAccount/checkMobileExist.do";
        	
	var params={};
	params.mobile=mobile;
	var exist=false;
	var fn=function(result){
		if(result.data){
			exist=true;
		}
	};
	asyncAjaxMethod(url,params,false,fn);//同步
	return exist;
}
function submitSubAccount(){
	var url="subAccount/addSubAccount.do";
	var sub_account_name=$("#sub_account_name").val();
   	var sub_account=$("#sub_account").val();
	
	var mobile=$("#mobile").val();
	var subAccount_select_org=$("#subAccount_select_org").val();
	var password=$("#password").val();
	var params={};
	params.sa_name=sub_account;
	params.username=sub_account_name;
	params.phone=mobile;
	params.org_id=subAccount_select_org;
	params.sa_password=hex_md5(password);
	
	var fn=function(result){
		close_window('add_subAccount');
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
}

$(function(){
	$("#add_subAccount .input_wrap").on("focus",function(){
		var id=$(this).attr("id");
		var info_str="";
		if(id=="sub_account")
		{
			info_str="请使用主账号+':'冒号+3-15位数字或字符或下划线或汉字等任意组合";
		}
		if(info_str!="")
		{
			
			$(this).nextAll(".info_explain_wrap").fadeIn("fast");
			var html_str="<div class='info_explain'><img class='info_explain_icon' src='/newresources/images/new/ts1.png' /><span class='info_explain_tip' style='width:200px;'>"+info_str+"</span></div>";
			$(this).nextAll(".info_explain_wrap").html(html_str);
		}
	});
	$("#add_subAccount .input_wrap").on("blur",function(){
			var id=$(this).attr("id");
			var error_str="";
			if(id=="subAccount_select_org")
			{
				if($(this).val()=="")
				{
					error_str="请选择所属部门";
					org_name_flag=false;
				}
				else
				{
					org_name_flag=true;
				}
			}
			else if(id=="sub_account_name")
			{
				if($(this).val()=="")
				{
					error_str="请输入姓名";
					add_sub_account_name_flag=false;
				}
				else
				{
					add_sub_account_name_flag=true;
				}
			}
			else if(id=="mobile")
			{
				var mobile=$(this).val();
				if(mobile==""){
					error_str="请输入手机号码";
					add_mobile_flag=false;
				}else{
					if(!mobile_reg.test(mobile))
					{
						error_str="请输入正确的手机号码";
						add_mobile_flag=false;
					}else{
						if(checkMobileExist($("#mobile").val())){
							error_str="手机号码已存在";
							add_mobile_flag=false;
						}else{
							add_mobile_flag=true;
						}
					}
				}
			}
			else if(id=="sub_account")
			{
				var value=$(this).val();
				if(value=="")
				{
					error_str="请输入子账号";
					add_sub_account_flag=false;
				}
				else if(strlen(value)<3||strlen(value)>15)
				{
					error_str="请输入3~15位字符长度";
					add_sub_account_flag=false;
				}
				else if(!account_reg.test(value))
				{
					error_str="请使用数字或字母或下划线或汉字等任意组合";
					add_sub_account_flag=false;
				}
				else
				{
					if(checkSubAccountExist(value)){
						error_str="该账号已存在！";
						add_sub_account_flag=false;
					}else{
						add_sub_account_flag=true;
					}
				}
			}
			else if(id=="password")
			{
				if($(this).val()=="")
				{
					error_str="请输入登录密码";
					add_password_flag=false;
				}
				else
				{
					add_password_flag=true;
				}
			}
			if(error_str!=""){//错误信息显示
				$(this).nextAll(".info_explain_wrap").html("<div class='info_explain' style='width:160px;'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span></div>");
				$(this).nextAll(".info_explain_wrap").fadeIn("fast");
			}
			else
			{
				$(this).nextAll(".info_explain_wrap").fadeOut("fast");
			}
		});
		//选择部门change事件
		$("#subAccount_select_org").change(function(){
			if($(this).val())
			{
				$(this).nextAll(".info_explain_wrap").fadeOut("fast");
			}
			var str=$(this).children('option:selected').text();
			var a=str.split(">");
			$(this).prev().html(a[a.length-1]);
		});
});