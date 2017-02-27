var edit_org_name_flag;
var current_edit_Rec;
var str="";
//添加部门
function edit_org()
{	
	$("#edit_org_name").val("");
	$("#edit_parent_org").empty();
	$("#edit_parent_org").prev().html('');
	$(".mask").fadeIn("fast");
	$("#edit_org").fadeIn("fast");
	//加载下拉列表数据select-org
	var url="organization/getAllChildrenOrganization.do";
	var params={};
	params.org_id=root_org;
	var fn=function(result){
		var data=result.data;
		for(var i=0;i<data.length;i++){
			var list = data[i].parentOrganizations;
			str += "<option value='" + data[i].org_id + "'>";
			for (var j = list.length - 1; j > 0; j--) {
				str += list[j].name + "->";
			}
			str += data[i].name + "</option>";
			if(data[i].org_id==current_org){
				current_edit_Rec=data[i];
			}
		}
		if(current_edit_Rec){
			$("#edit_parent_org").append(str);
			//初始赋值
			$("#edit-org-form input[type=reset]").trigger("click");
			
			$("#edit_org input[name='org_id']").val(current_edit_Rec.org_id);
			$("#edit_org_name").val(current_edit_Rec.name);
			$("#edit_parent_org").val(current_edit_Rec.parentId);
			var str=$("#edit_parent_org").children('option:selected').text();
			var a=str.split(">");
			$("#edit_parent_org").prev().html(a[a.length-1]);
			if(current_edit_Rec.parentId==0){
				$("#edit_org_name").attr("disabled","disabled");
				$("#edit_parent_org").attr("disabled","disabled");
			}else{
				$("#edit_org_name").attr("disabled",null);
				$("#edit_parent_org").attr("disabled",null);
			}
			//重置控制标记
			edit_org_name_flag=true;
		}else{
			var option ={hasTitle:true,title:"提示",btn:''};
			xcconfirm=new window.wxc.xcConfirm("请先指定要编辑的部门",window.wxc.xcConfirm.typeEnum.custom,option);
		}
		
	};
	asyncAjaxMethod(url,params,true,fn);
}
//添加部门保存按钮事件
function edit_org_btn_click()
{
	var name=$("#edit_org_name").val();
	var parentId=$("#edit_parent_org").val();
	var org_id=$("#edit_org input[name='org_id']").val();
	if(name==null || name=="")
	{
		
		$("#edit_org_name").nextAll(".info_explain_wrap").html("<div class='info_explain' style='width:160px;'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入部门名称</span></div>");
		$("#edit_org_name").nextAll(".info_explain_wrap").fadeIn("fast");
	}
	//不是根节点，必须要有上级
	if(current_edit_Rec.parentId!=0){
		if($("#edit_parent_org").val()==0 || $("#edit_parent_org").val()==null){
			$("#edit_parent_org").nextAll(".info_explain_wrap").html("<div class='info_explain' style='width:160px;'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请选择上级部门</span></div>");
			$("#edit_parent_org").nextAll(".info_explain_wrap").fadeIn("fast");
			return;
		}
	}else{
		parentId=0;
	}
	if(edit_org_name_flag)
	{
		var url="organization/updateOrganization.do";
    	
		var params={};
		params.parentId=parentId;
		params.name=name;
		params.org_id=org_id;
		
		var fn=function(result){
			close_window('edit_org');			
			loadOrgTree();
		};
		asyncAjaxMethod(url,params,true,fn);
	}
	
}
function del_org_btn_click(){
	if(current_edit_Rec.parentId==0){
		$("#edit_org_name").next().next(".info_explain_wrap").html("<div class='info_explain' style='width:160px;'><img src='/newresources/images/new/er.png' /><span class='redcolor'>该部门不可删除</span></div>");
		$("#edit_org_name").next().next(".info_explain_wrap").fadeIn("fast");
		return;
	}
	window.wxc.xcConfirm("是否删除该部门", window.wxc.xcConfirm.typeEnum.confirm,
	{
		onOk:function(){
		var url="organization/delOrganization.do";
		var params={};
		params.org_id=current_edit_Rec.org_id;
		var fn=function(result){
			close_window('edit_org');
			loadOrgTree();
		};
		asyncAjaxMethod(url,params,true,fn);
		},
		onCancel:function(){
				}
	});
}
$(function(){
	$("#edit_org .input_wrap").on("blur",function(){
			var id=$(this).attr("id");
			var error_str="";
			if(id=="edit_org_name")
			{
				if($(this).val()=="")
				{
					error_str="请输入部门名称";
					edit_org_name_flag=false;
				}
				else
				{
					edit_org_name_flag=true;
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
		$("#edit_parent_org").change(function(){
			if($(this).val())
			{
				$(this).nextAll(".info_explain_wrap").fadeOut("fast");
			}
			var str=$(this).children('option:selected').text();
			var a=str.split(">");
			$(this).prev().html(a[a.length-1]);
		});
});
