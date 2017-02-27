<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>采购类目</title>
<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/purchase.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
<link href="/newresources/js/treegrid/css/jquery.treegrid.css" rel="stylesheet" type="text/css" />
</head>
<body class="bg_grey">
<div id="top"></div>
<!--中间-->
<div class="midd_wrap clearfix">
	<div class="midd_left_wrap" style="width:180px;">
	</div>
	<div class="midd_right_wrap" style="width:834px">
		<p class="purchase_right_title"><span>采购类目</span></p>
		<p class="mt10 mb10 clearfix">
		<a style="color:#0072c4;" class="ml10 f_r mr10" onclick="addNewCategory(0)">+ 添加新分类</a>
		</p>
		<div id="category_list" class="ml10 mr10 mt10"></div>
	</div>
</div>
<div class="mask"></div>
<div id="addCategory_wrap" class="pop_layer_wrap">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		添加新分类
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('addCategory_wrap')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap">
		<div class="inner_line_wrap clear mt20">
			<div class="label_wrap">
				分类名称<span class="no_empty">*</span>
			</div>
			<input id="category_name" class="input_wrap" type="text" size="50" />
			<div class='info_explain_wrap'>
				<!-- <img src="/newresources/images/new/er.png" /><span
					class="redcolor">请输入分类名称</span> -->
			</div>
		</div>
		<div class="inner_line_wrap clear">
			<div class="label_wrap">
				所属父级分类
			</div>
			<div class="f_l select_outwrap">
				<span class="select_display"></span>
				<select id="parent_select" class="select_wrap" style="width:250px;">
					<!--<option value="0">根节点</option>
					<option value="1">-请选择-</option>
					<option value="2">-请选择-</option>
					<option value="3">-请选择-</option>
					<option value="4">-请选择-</option>
					<option value="5">-请选择-</option> -->
				</select>
			</div>
		</div>
		<div class="t_algin_c">
			<button onclick="saveCategory()"  class="form_btn">保存</button>
		</div>
	</div>
</div>
<div class="mask_opacity" onClick="pop_div_close('categoryNatrue_wrap')"></div>
<div id="categoryNatrue_wrap" class="offset_block"  >
<!-- 	<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('categoryNatrue_wrap')" title="关闭编辑" style="color:#999;">X</a> -->
	<div  class="category_nature_wrap clearfix">
	<select id="categoryNatrue_select">
		<!-- <option value="1">大宗材料</option>
		<option value="2">一般材料</option>
		<option value="3">瓶颈材料</option> -->
	</select>
	<input type="hidden">
	<button onclick="saveCategoryNature()">保存</button>
	</div>
</div>
<!--底端-->
<div id="bottom" class="mt80"></div>
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
<script type="text/javascript" src="/usercenter/purchaseManage/purchaseCategoryManage/js/purchaseCategoryList.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.browser.js"></script>
<script type="text/javascript" src="/newresources/js/json2.js"></script>
<script type="text/javascript" src="/newresources/js/treegrid/jquery.treegrid.js"></script>
</body>
</html>