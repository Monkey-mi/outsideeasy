<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>送货登记</title>
		<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/sale.css" rel="stylesheet" type="text/css" />
		<link href="/vip/resources/css/vipsale.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
		<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="bg_grey">
		<div id="top"></div>
		<!--中间-->
		<div class="midd_wrap clearfix" >
			<div class="midd_left_wrap" style="width:180px;">
			</div>
			<div class="midd_right_wrap" style="width:834px">
				<p class="sale_right_title"><span>送货登记</span></p>
				<div class="delivery_register_name b ml10 mt10">登记送货单</div>
				<form class="delivery_rigister_form ml20 mt10" id="formId">
					<div class="criteria1 clearfix">
						<span class="attribute f_l">送货单号：</span>
						<div class="f_l"><input placeholder="请输入送货单号" class="element" id="delivery_number" ></div>
						<span class='form_remind hide'><img src='/newresources/images/er.png'><span class='redcolor'>送货单号不能为空！</span></span>
					</div>
					<div class="mt10 criteria2 clearfix">
						<span class="attribute f_l">合同编号：</span>
						<div class="posR f_l">
							<input placeholder="请选择提交送货登记的合同编号" class="element" id="contract_number" readonly="readonly" onclick="showSelect()" style="cursor:pointer;background:url(/newresources/images/sale/contractNumberBg.png)">
							<div class="mask_opacity" onclick="closeContractSelect()"></div>
							<div class="posA hide contract_select" style="z-index:10;">
								<div class="mt10 mb10">
									<input id="search_text1" class="contract_search ml10" placeholder="请输入合同编号进行搜索" >
									<input type="button" onclick="getAgreementNumList()" class="contract_search_btn ml4" value="搜索">
									<input type="button" class="contract_search_btn ml4 selectAll" onclick="selectAll('1')" value="全部">
								</div>
								<div class="middle">
									<ul id="allAgreementNum" >
									</ul>
								</div>
								<div class="bottom">
									<input type="checkbox" name="checkbox" class="ml10 selectAll" onclick="selectAll('2')">&nbsp;全选 
									<input type="button" class="save f_r mr10" onclick="save()" value="保存">
								</div> 
							</div>
						</div>
						<span class='form_remind hide'><img src='/newresources/images/er.png'><span class='redcolor'>合同编号不能为空！</span></span>
					</div>
					<div class="mt10 clearfix criteria3">
						<span class="f_l attribute">送货单上传：</span>
						<div class="posR upload f_l clearfix">
							<div>上传文件</div>
							<input type="file" name="file" class="upload_input posA" id="uploaded" onchange="showFile(this,1)">
						</div>
						<span class='form_remind hide'><img src='/newresources/images/er.png'><span class='redcolor'>送货单必须上传！</span></span>
						<div class="fileList f_r hide" id="fileList"></div>
					</div>
					<div class="mt10 clearfix criteria4">
						<span class="f_l attribute">出厂报告上传：</span>
						<div class="posR upload f_l clearfix">
							<div>上传文件</div>
							<input type="file" name="file" class="upload_input posA" id="uploaded1" onchange="showFile(this,2)">
						</div>
						<span class='form_remind hide'><img src='/newresources/images/er.png'><span class='redcolor'>出厂报告必须上传！</span></span>
						<div class="fileList f_r hide" id="fileList1"></div>
					</div>
					<div class="form_operate mt10" ><input class="submit ml10" type="button" onclick="formSubmit()" value="提交"><input type="button" class="cancel ml20" onclick="cleanAll()" value="全部清空"></div>
				</form>
				<div class="delivery_register_name b ml10 mt10">送货记录</div>
				<div class="delivery_register_search mt20 ml10 mr10 posR">
					<input id="search_text" placeholder="请输入合同编号或送货单号进行搜索">
					<button class="order_blue_button"  onclick="getDeliveryRegisterList()">搜索</button>
					<!-- <span class="posA record_count">共&nbsp;<span id="total_count" class="redcolor">5</span>&nbsp;条记录</span> -->
				</div>
				<table id="allDeliveryRegisters" class="delivery_register_tablelist ml10 mt10">
				</table>
				<div id="paginationcom" class="quotes clearfix"></div>
			</div>
		</div>
		<!--底端-->
		<div id="bottom"></div>
		<%@ include file="/newresources/js/base.jsp" %>
<!-- 		<script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/base.js"></script> -->
		<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>
<!-- 		<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
		<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.nicescroll.js"></script>
		<script type="text/javascript" src="/usercenter/saleManage/deliveryManage/js/deliveryRegister.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.browser.js"></script>
		<script type="text/javascript" src="/newresources/js/json2.js"></script>
		<script id="allAgreementNumStmpl" type="text/x-dot-template">
		{{for(var prop in it){}}
			<li>
			<input type="checkbox" onclick="select_single()" name="checkbox" class="ml10" value="{{= replaceNullAsStr(it[prop].agreement_bh)}}">
			<input type="hidden" value="{{= replaceNullAsStr(it[prop].pur_order_id)}}">
			<input type="hidden" value="{{= replaceNullAsStr(it[prop].order_bh)}}">&nbsp;
			{{= replaceNullAsStr(it[prop].agreement_bh)}}</li>
		{{}}}
		</script>
		<script id="allDeliveryRegisterStmpl" type="text/x-dot-template">
		<tr>
			<th style="width:110px;">登记日期</th>
			<th style="width:100px;">送货单号</th>
			<th style="width:220px;">订单编号（合同编号）</th>
			<th style="width:170px;">采购商名称</th>
			<th style="width:170px;">送货单</th>
			<th style="width:170px;">出厂报告</th>
			<th style="width:64px;">操作</th>
		</tr>
		{{for(var prop in it){}}
			<tr valign="top">
				<td >{{= replaceNullAsStr(it[prop].create_dt)}}</td>
				<td >{{= replaceNullAsStr(it[prop].delivery_number)}}</td>
				<td>
					{{for(var pro in it[prop].deliveryRegisterDetails){}}
					<div>{{= replaceNullAsStr(it[prop].deliveryRegisterDetails[pro].order_bh)}}<br/>({{= replaceNullAsStr(it[prop].deliveryRegisterDetails[pro].agreement_bh)}})</div>
					{{}}}
				</td>
				<td >{{= replaceNullAsStr(it[prop].receive_cpyname_cn)}}</td>
				<td>
					{{for(var pr in it[prop].deliveryAttacheds){}}
					{{? it[prop].deliveryAttacheds[pr].file_type_id ==41}}
						<a onclick="downLoadFile(this)" class="blue"><input type="hidden" value="{{= replaceNullAsStr(it[prop].deliveryAttacheds[pr].mogodb_id)}}"/>{{= replaceNullAsStr(it[prop].deliveryAttacheds[pr].file_name)+replaceNullAsStr(it[prop].deliveryAttacheds[pr].suffix_name)}}</a>
						<br/>
					{{??}}
					{{?}}
					{{}}}
				</td>
				<td>
					{{for(var pr in it[prop].deliveryAttacheds){}}
					{{? it[prop].deliveryAttacheds[pr].file_type_id ==51}}
						<a onclick="downLoadFile(this)" class="blue"><input type="hidden" value="{{= replaceNullAsStr(it[prop].deliveryAttacheds[pr].mogodb_id)}}"/>{{= replaceNullAsStr(it[prop].deliveryAttacheds[pr].file_name)+replaceNullAsStr(it[prop].deliveryAttacheds[pr].suffix_name)}}</a>
						<br/>
					{{??}}
					{{?}}
					{{}}}
				</td>
				<td><a onclick="deleteDeliveryRegister({{= replaceNullAsStr(it[prop].register_id)}})" class="blue">删除</a></td>
			</tr>
		{{}}}
		</script>
	</body>
</html>