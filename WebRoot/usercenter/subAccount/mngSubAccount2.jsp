<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>子账号管理</title>
<link href="/newresources/css/page.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/subaccount.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/popCheckList.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/zTreeStyle/zTreeStyle.css" rel="stylesheet" type="text/css" />
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<script type="text/javascript" src="/newresources/js/jquery.ztree.all.min.js"></script>
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<script type="text/javascript" src="/newresources/js/json2.js"></script>
<script type="text/javascript" src="/newresources/js/md5.js"></script>
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- <link href="/newresources/bsgrid/css/bsgrid.all.min.css" rel="stylesheet" type="text/css" />
<script src="/newresources/bsgrid/js/lang/grid.zh-CN.min.js" type="text/javascript"></script>
<script src="/newresources/bsgrid/js/bsgrid.all.min.js" type="text/javascript"></script> -->
<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
<script type="text/javascript" src="/usercenter/subAccount/js/company.js"></script>
<script type="text/javascript" src="/usercenter/subAccount/js/mngSubAccount-updown.js"></script>
<script type="text/javascript" src="/usercenter/subAccount/js/mngSubAccount-addorg.js"></script>
<script type="text/javascript" src="/usercenter/subAccount/js/mngSubAccount-editorg.js"></script>
<script type="text/javascript" src="/usercenter/subAccount/js/mngSubAccount-addsub.js"></script>
<script type="text/javascript" src="/usercenter/subAccount/js/mngSubAccount-editsub.js"></script>
<script type="text/javascript" src="/usercenter/subAccount/js/mngSubAccount-main.js"></script>
<script type="text/javascript" src="/usercenter/subAccount/js/roleRef.js"></script>
<style type="text/css">
.form_btn_wrap .form_del_btn{width:120px; height:35px; font-size:14px;background-color:#f1af27; color:#fff; letter-spacing:6px;}
</style>
<script type="text/javascript">
$(function(){
	//加载头部和底部信息
	//$("#top").load(getwebroot()+"platform/top.html");
	var result = isLoginForPlateForm();
	var isVip=getCookie("isVip");
// 	if(result.data.vip == true){
	if(isVip=="true"){
		$("#top").load(getwebroot()+"vip/platform/vipTop.html",function(responseTxt,statusTxt,xhr){
			    if(statusTxt=="success")
			      $("#mainNav").children().eq(2).addClass("curr");
			      $("#top").find(".select_wrap").css("display","none");
			  });
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
	}else{
		$("#top").load(getwebroot()+"platform/top.html",function(responseTxt,statusTxt,xhr){
			    if(statusTxt=="success")
			      $("#mainNav").children().eq(2).addClass("curr");
			      $("#top").find(".select_wrap").css("display","none");
			  });
		
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
	}
});
</script>
</head>

<body class="bg_grey">
<div id="top"></div>
<div class="midd_wrap clearfix">
	<div class="midd_left_wrap">
	<div class="bg_white"></div>
		<div class="left_title_1">
			<p>组织架构</p>
			<div>
				<span class="f_l">人数：<span id="sub_total_num">100</span>/<span id="sub_max_num">500</span></span>
				<span class="f_r">
					<a href="javascript:void(0)" onClick="downloadTemplate()">下载模板</a>
					<a href="javascript:void(0)" onClick="showUploadView()">导入</a>
					<a href="javascript:void(0)" onClick="downloadSubAccount()">导出</a>
				</span>
			</div>
		</div>
		<div class="add_nav_wrap">
			<ul>
				<li><a href="javascript:void(0)" onClick="add_org(this)">添加部门</a></li>
				<li><a href="javascript:void(0)" onClick="add_subAccount(this)">添加员工</a></li>
				<li style="border:none;"><a>客户管理</a></li>
			</ul>
		</div>
		<div class="search_wrap3">
			<input type="text" id="org_search_text" class="search_input" placeholder="请输入组织部门"/>
			<input type="button" id="org_search_btn" class="search_btn" value="" onClick="loadOrgTreeByName()"/>
		</div>
		<div class="org_nav_wrap clearfix" id="org_nav"></div>
	</div>
	
	<div class="midd_right_wrap">
		<div class="title_banner_wrap">
			<div id="show_name_contains" style="display:inline"></div><span class="oprate_p"><a href="javascript:void(0)" onClick="edit_org()">部门编辑</a></span>
			<div class="search_wrap">
				<input type="text" id="search_text" class="search_input" placeholder="输入姓名、账号关键字"/>
				<input type="button" id="search_btn" class="search_btn" value="" onClick="doSearch()"/>
			</div>
		</div>
		<input id="main" type="checkbox"  onclick="select_all(0)" style="margin-top:-1px;"/>
		<span class="oprate_p"><a href="javascript:void(0)" onClick="delete_all()">批量删除</a></span>
		<div id="show_sub_num" class="inline_block" style="float:right">0条记录</div>
		<!-- <span class="oprate_p"><a href="javascript:void(0)" onClick="edit_org()">部门编辑</a></span> -->
		<table id="searchTable" class="subAccount_table">
		   <!--   <tr>
		       	<th w_check="true" w_index="ID" width="5%;"></th>
		        <th w_num="line" width="5%;">序号</th>
		        <th w_index="username" w_align="center" width="20%;">姓名</th>
		        <th w_index="sa_name" w_align="left" width="20%;">子账号</th>
		        <th w_index="phone" w_align="left" width="15%;">手机号</th>
		        <th w_index="" width="15%;">权限</th>
		        <th w_render="rowoperate" width="20%;">操作</th>
		    </tr>  -->
				<tbody id="mainTbody">
				</tbody>
			</table>
			<div id="pagination" class="quotes clearfix"></div>
	</div>
</div>
<div class="mask"></div>
<div class="add_form_wrap" id="add_org">
	<div class="title_wrap">
		<span class="span_icon">+</span>
		添加部门
		<a class="close_btn" onClick="close_window('add_org')">X</a>
	</div>
	<form  enctype="multipart/form-data" id="add-org-form" method="post">  
		<div class="inner_line_wrap mt20">
			<label class="label_wrap">部门名称<span class="noEmpty f_r">*</span></label>
			<input type="text" id="org_name" class="input_wrap" size="50" />
			<input name="org_id" type="hidden"/>
			<div class="info_explain_wrap"></div>
		</div>
		<br class="clear" />
		<div class="inner_line_wrap">
			<label class="label_wrap">上级部门<span class="noEmpty f_r">*</span></label>
			<div class="f_l select_outwrap">
			<span class="select_display"></span>
			<select id="parent_org" class="input_wrap" style="width:250px;"></select>
			</div>
			<div class="info_explain_wrap"></div>
		</div>
		<br class="clear" />
		<div class="form_btn_wrap ">
			<button type="button" class="form_btn" onClick="add_org_btn_click()">保存</button>
			<input  type="reset" style="display:none;"/>
		</div>
	</form>
</div>
<div class="add_form_wrap" id="edit_org">
	<div class="title_wrap">
		<span class="span_icon">+</span>
		编辑部门
		<a class="close_btn" onClick="close_window('edit_org')">X</a>
	</div>
	<form  enctype="multipart/form-data" id="edit-org-form" method="post">  
		<div class="inner_line_wrap mt20">
			<label class="label_wrap">部门名称<span class="noEmpty f_r">*</span></label>
			<input type="text" id="edit_org_name" class="input_wrap" size="50" />
			<input name="org_id" type="hidden"/>
			<div class="info_explain_wrap"></div>
		</div>
		<br class="clear" />
		<div class="inner_line_wrap">
			<label class="label_wrap">上级部门<span class="noEmpty f_r">*</span></label>
			<div class="f_l select_outwrap">
			<span class="select_display"></span>
			<select id="edit_parent_org" class="input_wrap" style="width:250px;"></select>
			</div>
			<div class="info_explain_wrap"></div>
		</div>
		<br class="clear" />
		<div class="form_btn_wrap ">
			<button type="button" class="form_del_btn" onClick="del_org_btn_click()">删除部门</button>
			<button type="button" class="form_btn" onClick="edit_org_btn_click()">保存</button>
			<input  type="reset" style="display:none;"/>
		</div>
	</form>
</div>
<div class="add_form_wrap" id="add_subAccount">
	<div class="title_wrap">
		<span class="span_icon">+</span>
		添加员工
		<a class="close_btn" onClick="close_window('add_subAccount')">X</a>
	</div>
	<form  enctype="multipart/form-data" id="add-subAccount-form" method="post">  
		<div class="inner_line_wrap mt20">
			<label class="label_wrap">姓名<span class="noEmpty f_r">*</span></label>
			<input type="text" id="sub_account_name" class="input_wrap" size="20" />
			<div class="info_explain_wrap" ></div>
		</div>
		<div class="inner_line_wrap">
			<label class="label_wrap">手机号<span class="noEmpty f_r">*</span></label>
			<input type="text" id="mobile" class="input_wrap" />
			<div class="info_explain_wrap" ></div>
		</div>
		<div class="inner_line_wrap">
			<label class="label_wrap">子账号<span class="noEmpty f_r">*</span></label>
			<input type="text" id="sub_account_prefix" class="input_wrap_prefix" value="TPS:" readonly="readonly" />
			<input type="text" id="sub_account" class="input_wrap" style="width:160px;" />
			<div class="info_explain_wrap" ></div>
		</div>
		<div class="inner_line_wrap">
			<label class="label_wrap">组织<span class="noEmpty f_r">*</span></label>
			<div class="f_l select_outwrap">
			<span class="select_display"></span>
			<select id="subAccount_select_org" class="input_wrap"></select>
			<div class="info_explain_wrap" ></div>
			</div>
		</div>
		<div class="inner_line_wrap">
			<label class="label_wrap">登录密码<span class="noEmpty f_r">*</span></label>
			<input type="password" id="password" class="input_wrap" value="666888" />
			<div class="info_explain_wrap" ></div>
		</div>
		<div style=" margin-top:-5px; margin-left:160px; color:red;">初始密码为666888</div>
		<div class="form_btn_wrap mt10">
			<button type="button" class="form_btn" onClick="add_account_btn_click()">保存</button>
			<input  type="reset" style="display:none;"/>
		</div>
	</form>
</div>
<div class="add_form_wrap" id="mod_password">
	<div class="title_wrap">
		修改密码
		<a class="close_btn" onClick="close_window('mod_password')">X</a>
	</div>
	<form  enctype="multipart/form-data" id="mod-password-form" method="post">  
		<div class="inner_line_wrap mt30 ml120">
			<label class="label_wrap">登录密码<span class="noEmpty f_r">*</span></label>
			<input type="hidden" id="sa_id"/>
			<input type="hidden" id="sa_name"/>
			<input type="password" id="new_password" class="input_wrap" />
			<div class="info_explain_wrap" ></div>
		</div>
		<div style=" margin-top:-5px; margin-left:220px; color:red;">初始密码为666888</div>
		<div class="form_btn_wrap mt10">
			<button type="button" class="form_btn" onClick="mod_password_btn_click()">保存</button>
			<input  type="reset" style="display:none;"/>
		</div>
	</form>
</div>
<div class="add_form_wrap" id="edit_subAccount">
	<div class="title_wrap">
		<span class="span_icon">+</span>
		编辑员工
		<a class="close_btn" onClick="close_window('edit_subAccount')">X</a>
	</div>
	<form  enctype="multipart/form-data" id="edit-subAccount-form" method="post">  
		<div class="inner_line_wrap mt20">
			<label class="label_wrap">姓名<span class="noEmpty f_r">*</span></label>
			<input type="text" id="edit_sub_account_name" class="input_wrap" size="20" />
			<input name="sa_id" type="hidden"/>
			<div class="info_explain_wrap" ></div>
		</div>
		<div class="inner_line_wrap">
			<label class="label_wrap">手机号<span class="noEmpty f_r">*</span></label>
			<input type="text" id="edit_mobile" class="input_wrap" />
			<input id="oldMobile" type="hidden" />
			<div class="info_explain_wrap" ></div>
		</div>
		<div class="inner_line_wrap">
			<label class="label_wrap">子账号<span class="noEmpty f_r">*</span></label>
			<input type="text" id="edit_sub_account_prefix" class="input_wrap_prefix" value="TPS:" readonly="readonly" />
			<input type="text" id="edit_sub_account" class="input_wrap" style="width:160px;" />
			<div class="info_explain_wrap" ></div>
		</div>
		<div class="inner_line_wrap">
			<label class="label_wrap">组织<span class="noEmpty f_r">*</span></label>
			<div class="f_l select_outwrap">
			<span class="select_display"></span>
			<select id="edit_subAccount_select_org" class="input_wrap"></select>
			<div class="info_explain_wrap" ></div>
			</div>
		</div>
		<div class="form_btn_wrap mt10">
			<button type="button" class="form_btn" onClick="edit_account_btn_click()">保存</button>
			<input  type="reset" style="display:none;"/>
		</div>
	</form>
</div>
<div class="add_form_wrap" id="import_subAccount">
	<div class="title_wrap">
		<span class="span_icon">+</span>
		导入子账号
		<a class="close_btn" onClick="close_window('import_subAccount')">X</a>
	</div>
	<div class="inner_line_wrap_attachment ml40 mt20">
		<div class="label_wrap_attachment">附件</div>
		<input id="qc_file_name" class="input_wrap_attachment" type="text" />
		<div class="file_wrap_attachment">
			<div class="file_wrap_inner_attachment">
				<input id="file_no"  style="display:none" value="0"/>
				<button class="file_btn_attachment" id="qc_file_bu">选择文件</button>
				<input type="file" name ="file" id ="qc_file_table" class="uploadfile_input_attachment" onChange="showviewtext()" />
			</div>
		</div>
		<button class="file_btn_attachment"  onClick="upload_qc_file()">上传</button>	
		<div class="info_explain"></div>
	</div>
	<!-- <form  enctype="multipart/form-data" id="import-form" method="post">  
		<div class="inner_line_wrap mt50">
			<label class="label_wrap">上传文件<span class="noEmpty f_r">*</span></label>
			<input type="file" id="sel_file" name="file" />
			<div class="info_explain"></div>
		</div>
		<br class="clear" />
		<div class="form_btn_wrap ">
			<button type="button" class="form_btn" onClick="uploadFile()">上传</button>
		</div>
	</form> -->
</div>
<!-- 供应商的分配弹出层 -->
<div class="add_form_wrap" id="add_detailsub">
	<div class="title_wrap">
		分配供应商
		<a class="close_btn" onClick="close_window('add_detailsub')">X</a>
	</div>
	
	<div class="sub_pop_inner_div">
		<input id="mainsub" type="checkbox"  onclick="select_all(1)"/>
		<span>全部选中</span>
		<input type='hidden' id = "sub_huan_id" value=""/>
		<div class="search_wrap clearfix">
			<input type="text" id="org_search_sub" placeholder="请输入供应商名称"/>
			<button id="org_search_subs" onClick="detailsub(1)"></button>			
		</div>
		<!-- <span class="ml100">共&nbsp;<a id="show_sub_numsub" ></a>&nbsp;个供应商</span> -->
	</div>
	<div class="ml10 mr10">
		<table id="searchTablesub" class="subAccount_tablelist">
			<tbody id="mainTbodysub">
			
				</tbody>
		</table>
	</div>
		<div id="paginationsub" class="quotes clearfix"></div>
		<div class="form_btn_wrap">
			<button type="button" class="form_btn" onClick="saveSubWithAccess()">保存</button>
		</div>
</div>
<!-- 公司的分配弹出层 -->
<div class="add_form_wrap" id="add_detailcom">	
</div>

<!--底端-->
<div id="bottom"></div>
</body>
</html>