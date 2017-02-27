var add_org_name_flag;
//添加部门
function add_org(th)
{
	$(".mask").fadeIn("fast");
	$("#add_org").fadeIn("fast");
	$(th).parent().parent().find("a").removeClass("curr_li");
	$(th).addClass("curr_li");
	//加载下拉列表数据select-org
	var url="organization/getAllChildrenOrganization.do";
	var params={};
	params.org_id=root_org;
	var fn=function(result){
		var data=result.data;
		var str="";
		for (var i = 0; i < data.length; i++) {
			var list = data[i].parentOrganizations;
			str += "<option value='" + data[i].org_id + "'>";
			for (var j = list.length - 1; j > 0; j--) {
				str += list[j].name + "->";
			}
			str += data[i].name + "</option>";
		}		
		$("#parent_org").empty();
		$("#parent_org").prev().html('');
		$("#parent_org").append(str);
		//初始赋值
		$("#add-org-form input[type=reset]").trigger("click");
		var str=$("#parent_org").children('option:selected').text();
		var a=str.split(">");
		$("#parent_org").prev().html(a[a.length-1]); 
		//重置控制标记
		add_org_name_flag=false;
		//$("#add_org input[name='org_id']").val(data[0].org_id);
	};
	asyncAjaxMethod(url,params,true,fn);
}
//添加部门保存按钮事件
function add_org_btn_click()
{
	var name=$("#org_name").val();
	var parentId=$("#parent_org").val();
	var org_id=$("#add_org input[name='org_id']").val();
	if(name==null || name=="")
	{
		$("#org_name").nextAll(".info_explain_wrap").html("<div class='info_explain' style='width:160px;'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请输入部门名称</span></div>");
		$("#org_name").nextAll(".info_explain_wrap").fadeIn("fast");
	}
	else if(parentId=="0"||parentId==null||$("#parent_org").find("option:selected").text()=="请选择")
	{
		
		$("#parent_org").nextAll(".info_explain_wrap").html("<div class='info_explain' style='width:160px;'><img src='/newresources/images/new/er.png' /><span class='redcolor'>请选择上级部门</span></div>");
		$("#parent_org").nextAll(".info_explain_wrap").fadeIn("fast");
		return;
	}
	if(add_org_name_flag)
	{
		var url="organization/addOrganization.do";
    	
		var params={};
		params.parentId=parentId;
		params.name=name;
		params.org_id=org_id;
		
		var fn=function(result){
			close_window('add_org');			
			loadOrgTree();
		};
		asyncAjaxMethod(url,params,true,fn);
	}
	
}
$(function(){
	$("#add_org .input_wrap").on("blur",function(){
			var id=$(this).attr("id");
			var error_str="";
			if(id=="org_name")
			{
				if($(this).val()=="")
				{
					error_str="请输入部门名称";
					add_org_name_flag=false;
				}
				else
				{
					add_org_name_flag=true;
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
		$("#parent_org").change(function(){
			if($(this).val())
			{
				$(this).nextAll(".info_explain_wrap").fadeOut("fast");
			}
			var str=$(this).children('option:selected').text();
			var a=str.split(">");
			$(this).prev().html(a[a.length-1]);
		});
});