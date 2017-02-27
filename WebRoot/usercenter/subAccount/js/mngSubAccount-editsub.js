var mobile_reg=/^1[3|4|5|8]\d{9}$/;
var account_reg=/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
var edit_sub_account_name_flag;
var edit_mobile_flag;
var edit_sub_account_flag;
var edit_org_name_flag;
var sub_account;
//编辑员工
function editsubAccount(sa_id)
{
	$("#edit_subAccount").find(".info_explain_wrap").each(function(){
				$(this).html('');
	});
	$(".mask").fadeIn("fast");
	$("#edit_subAccount").fadeIn("fast");
	//加载下拉列表数据
	var url="subAccount/getInfoForEditSubAccount.do";
	var params={};
	params.sa_id=sa_id;
	params.org_id=root_org;
	var fn=function(result){
		var orgList=result.data.orgList;
		var str="";
		for (var i = 0; i < orgList.length; i++) {
			orgList[i].isParent = false;
			for (var j = 0; j < orgList.length; j++) {
				if (orgList[i].org_id == orgList[j].parentId
						) {
					orgList[i].isParent = true;
				} else {
				}
			}

		}
		for (var i = 0; i < orgList.length; i++) {
			if (!orgList[i].isParent) {
				var list = orgList[i].parentOrganizations;
				str += "<option value='" + orgList[i].org_id + "'>";
				for (var j = list.length - 1; j > 0; j--) {
					str += list[j].name + "->";
				}
				str += orgList[i].name + "</option>";
			}
		}
		$("#edit_subAccount_select_org").empty();
		$("#edit_subAccount_select_org").prev().html('');
		$("#edit_subAccount_select_org").append(str);
		//初始赋值
		$("#edit-subAccount-form input[type=reset]").trigger("click");
		var old_subAccount=result.data.subAccount;
		$("#edit_sub_account_name").val(old_subAccount.username);
		
		$("#edit-subAccount-form input[name='sa_id']").val(old_subAccount.sa_id);
		$("#edit_mobile").val(old_subAccount.phone);
		$("#oldMobile").val(old_subAccount.phone);
		$("#edit_sub_account_prefix").val(result.data.acc_name+":");
		$("#edit_sub_account").val(old_subAccount.last_part_sa_name);
		sub_account=old_subAccount.last_part_sa_name;
		$("#edit_subAccount_select_org").val(old_subAccount.org_id);
		var str=$("#edit_subAccount_select_org").children('option:selected').text();
		var a=str.split(">");
		$("#edit_subAccount_select_org").prev().html(a[a.length-1]);
		//重置控制标记
		edit_sub_account_name_flag=true;
		edit_mobile_flag=true;
		edit_sub_account_flag=true;
		edit_org_name_flag=true;
	};
	asyncAjaxMethod(url,params,true,fn);
}
//添加员工保存按钮事件
function edit_account_btn_click()
{
		if($("#edit_sub_account_name").val()=="")
		{
			$("#edit_sub_account_name").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入名称</span></div>");
			$("#edit_sub_account_name").nextAll(".info_explain_wrap").fadeIn("fast");
			edit_sub_account_name_flag=false;
		}else{
			edit_sub_account_name_flag=true;
		}
		if($("#edit_mobile").val()==""){
			$("#edit_mobile").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入手机号码</span></div>");
			$("#edit_mobile").nextAll(".info_explain_wrap").fadeIn("fast");
			edit_mobile_flag=false;
		}else{
			if(!mobile_reg.test($("#edit_mobile").val()))
			{
				$("#edit_mobile").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入正确的手机号码</span></div>");
				$("#edit_mobile").nextAll(".info_explain_wrap").fadeIn("fast");
				edit_mobile_flag=false;
			}else{
				if($("#edit_mobile").val()!=$("#oldMobile").val()){
					if(checkMobileExist($("#edit_mobile").val())){
						$("#edit_mobile").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>手机号码已存在</span></div>");
						$("#edit_mobile").nextAll(".info_explain_wrap").fadeIn("fast");
						edit_mobile_flag=false;
					}else{
						edit_mobile_flag=true;
					}
				}else{
					edit_mobile_flag=true;
				}
			}
		}
		if($("#edit_sub_account").val()==""){
			$("#edit_sub_account").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入子账号</span></div>");
			$("#edit_sub_account").nextAll(".info_explain_wrap").fadeIn("fast");
			edit_sub_account_flag=false;
		}
		else if(strlen($("#edit_sub_account").val())<3||strlen($("#sub_account").val())>15){
			$("#edit_sub_account").nextAll(".info_explain_wrap").html("<div class='info_explain' style='width:160px'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入3~15位字符长度</span></div>");
			$("#edit_sub_account").nextAll(".info_explain_wrap").fadeIn("fast");
			edit_sub_account_flag=false;
		}
		else if(!account_reg.test($("#edit_sub_account").val())){
			$("#edit_sub_account").nextAll(".info_explain_wrap").html("<div class='info_explain' style='width:160px'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请使用数字或字母或下划线或汉字等任意组合</span></div>");
			$("#edit_sub_account").nextAll(".info_explain_wrap").fadeIn("fast");
			edit_sub_account_flag=false;
		}
		else if($("#edit_sub_account").val()!=sub_account){
			if(checkSubAccountExist($("#edit_sub_account").val())){
				$("#sub_account").nextAll(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>该账号已存在</span></div>");
				$("#sub_account").nextAll(".info_explain_wrap").fadeIn("fast");
				edit_sub_account_flag=false;
			}else{
				edit_sub_account_flag=true;
			}
			
		}
		if(!$("#edit_subAccount_select_org").val())
		{
			$("#edit_subAccount_select_org").next(".info_explain_wrap").html("<div class='info_explain'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请选择所属部门</span></div>");
			$("#edit_subAccount_select_org").next(".info_explain_wrap").fadeIn("fast");
			edit_org_name_flag=false;
		}else{
			edit_org_name_flag=true;
		}
		if(edit_sub_account_flag&&edit_mobile_flag&&edit_sub_account_name_flag&&edit_org_name_flag){
			submitEditSubAccount();
		}
}
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
function submitEditSubAccount(){
	var url="subAccount/updataSubAccount.do";
	var sa_id=$("#edit-subAccount-form input[name='sa_id']").val();
	var sub_account_name=$("#edit_sub_account_name").val();
   	var sub_account=$("#edit_sub_account").val();
	var mobile=$("#edit_mobile").val();
	var subAccount_select_org=$("#edit_subAccount_select_org").val();
	var params={};
	params.sa_id=sa_id;
	params.username=sub_account_name;
	params.phone=mobile;
	params.sa_name=sub_account;
	params.org_id=subAccount_select_org;
	
	var fn=function(result){
		close_window('edit_subAccount');
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
}
$(function(){
	$("#edit_subAccount .input_wrap").on("focus",function(){
		var id=$(this).attr("id");
		var info_str="";
		if(id=="edit_sub_account")
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
	$("#edit_subAccount .input_wrap").on("blur",function(){
			var id=$(this).attr("id");
			var error_str="";
			if(id=="edit_subAccount_select_org")
			{
				if($(this).val()=="")
				{
					error_str="请选择所属部门";
					edit_org_name_flag=false;
				}
				else
				{
					edit_org_name_flag=true;
				}
			}
			else if(id=="edit_sub_account_name")
			{
				if($(this).val()=="")
				{
					error_str="请输入姓名";
					edit_sub_account_name_flag=false;
				}
				else
				{
					edit_sub_account_name_flag=true;
				}
			}
			else if(id=="edit_mobile")
			{
				var mobile=$(this).val();
				if(mobile==""){
					error_str="请输入手机号码";
					edit_mobile_flag=false;
				}else{
					if(!mobile_reg.test(mobile))
					{
						error_str="请输入正确的手机号码";
						edit_mobile_flag=false;
					}else{
						if(mobile!=$("#oldMobile").val()){
							if(checkMobileExist(mobile)){
								error_str="手机号码已存在";
								edit_mobile_flag=false;
							}else{
								edit_mobile_flag=true;
							}
						}else{
							edit_mobile_flag=true;
						}
					}
				}
			}
			else if(id=="edit_sub_account")
			{
				var value=$(this).val();
				if(value=="")
				{
					error_str="请输入子账号";
					edit_sub_account_flag=false;
				}
				else if(strlen(value)<3||strlen(value)>15)
				{
					error_str="请输入3~15位字符长度";
					edit_sub_account_flag=false;
				}
				else if(!account_reg.test(value))
				{
					error_str="请使用数字或字母或下划线或汉字等任意组合";
					edit_sub_account_flag=false;
				}
				else
				{
					if(value!=sub_account){
						if(checkSubAccountExist(value)){
							error_str="该账号已存在！";
							edit_sub_account_flag=false;
						}else{
							edit_sub_account_flag=true;
						}
					}
				}
			}
			if(error_str!="")
			{
				$(this).nextAll(".info_explain_wrap").html("<div class='info_explain' style='width:160px;'><img src='/newresources/images/new/er.png' /><span class='redcolor'>"+error_str+"</span></div>");
				$(this).nextAll(".info_explain_wrap").fadeIn("fast");
			}
			else
			{
				$(this).nextAll(".info_explain_wrap").fadeOut("fast");
			}
		});
		//选择部门change事件
		$("#edit_subAccount_select_org").change(function(){
			if($(this).val())
			{
				$(this).nextAll(".info_explain_wrap").fadeOut("fast");
			}
			var str=$(this).children('option:selected').text();
			var a=str.split(">");
			$(this).prev().html(a[a.length-1]);
		});
});