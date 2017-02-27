<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>物料报告</title>
	<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
	<link href="/newresources/css/purchase.css" rel="stylesheet" type="text/css" />
	<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
	<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="/newresources/css/combo.select.css" type="text/css" />
	</head>
	<body class="bg_grey">
		<div id="top"></div>
		<!--中间-->
		<div class="midd_wrap clearfix">
			<div class="midd_left_wrap" style="width:180px;">
			</div>
			<div class="midd_right_wrap" style="width:834px">
				<p class="purchase_right_title"><span>物料报告</span></p>
				<div class="materialReportList">
					<div class="reportUploadWrap clearfix">
						<span class="name">供应商名称：</span>
						<select id="selectSupplier"  class="selectSupplier">
				          <!--  <option value="李师傅 15223236656">李师傅 15223236656</option>
				            <option value="United Kingdom">王师傅 15211112222</option>
				            <option value="Afghanistan">Afghanistan</option>
				            <option value="Aland Islands">Aland Islands</option>
				            <option value="Albania">Albania</option>
				            <option value="Algeria">Algeria</option>
				            <option value="American Samoa">American Samoa</option>
				            <option value="Andorra">Andorra</option>
				            <option value="Angola">Angola</option>
				            <option value="Anguilla">Anguilla</option>
				            <option value="Antarctica">Antarctica</option>
				            <option value="Antigua and Barbuda">Antigua and Barbuda</option> -->
						</select>
						<div class="posR uploadButtonWrap">
							<button class="ml10 upload">上传文件</button>
							<input id="uploadMaterialReport" onChange="uploadMaterialReport()" type="file" name="file"  class="posA"/>
						</div>
						<!-- <label class="filename">物料报告.xlxs<img src="/newresources/images/sale/X_grey.png" class="ml5" onclick="delFile(this)"></label> -->
						<button onclick="submitMaterialReport()" class="submitReport">提交报告</button>				
					</div>
					<div class="t_algin_r mt20 searchWrap">
						<span>报告上传日期：</span>
						<input type="text" id="startDate" class="Wdate uploadDate" placeholder="起始日期" onclick="WdatePicker({readOnly:true,maxDate:'#F{$dp.$D(\'endDate\')||\'%y-%M-%d\'}'})">
						--
						<input type="text" id="endDate" class="Wdate uploadDate" placeholder="结束日期" onclick="WdatePicker({readOnly:true,minDate:'#F{$dp.$D(\'startDate\')}',maxDate:'%y-%M-%d'})">
						<input type="text" id="search_text" class="supplierNameSearch" placeholder="请输入供应商名称关键字搜索">
						<button onclick="getSupplierMaterialcheckList()" class="search_btn">搜索</button>
					</div>
					<table id="allSupplierMaterialchecks" class="reportTableList mt10">
						<!-- <tr>
							<th style="width:165px;padding-left:35px;">报告上传时间</th>
							<th style="width:200px;padding-left:60px;">供应商名称</th>
							<th style="width:25px;"></th>
							<th style="width:auto;padding-left:40px;">物料确认报告</th>
							<th style="width:60px;padding-left:30px;">操作</th>
						</tr>
						<tr>
							<td>2016-12-08-14:37:23</td>
							<td>浙江泰普森休闲用品有限公司</td>
							<td></td>
							<td class="report">物料确认确认报告.xlxs</td>
							<td><a>下载</a><a class="ml10">删除</a></td>
						</tr>
						<tr>
							<td>2016-12-08-14:37:23</td>
							<td>浙江泰普森休闲用品有限公司</td>
							<td><span class="fileResource">PO</span></td>
							<td class="report">物料确认确认报告.xlxs</td>
							<td><a>下载</a><a class="ml10">删除</a></td>
						</tr> -->
					</table>
					<div id="paginationcom" class="quotes clearfix"></div>
				</div>
			</div>
		</div>
		<div id="bottom"></div>
		<%@ include file="/newresources/js/base.jsp" %>
		<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script>
		<script type="text/javascript" src="/newresources/js/base.js"></script>
		<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
		<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
		<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>
		<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="/usercenter/purchaseManage/SupplierManage/js/materialReport.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.combo.select.js"></script>
		<script id="allSupplierMaterialcheckStmpl" type="text/x-dot-template">
		<tr>
			<th style="width:165px;padding-left:35px;">报告上传时间</th>
			<th style="width:200px;padding-left:60px;">供应商名称</th>
			<th style="width:25px;"></th>
			<th style="width:auto;padding-left:40px;">物料确认报告</th>
			<th style="width:60px;padding-left:30px;">操作</th>
		</tr>
         {{for(var prop in it){}}
			<tr>
				<td>{{= replaceNullAsStr(it[prop].create_dt)}}</td>
				<td>{{= replaceNullAsStr(it[prop].supplier_cpyname)}}</td>
				<td>
					{{? it[prop].source_type ==0}}
						<span class="fileResource">PO</span>
					{{??}}
					{{?}}
				</td>
				<td class="report">{{= replaceNullAsStr(it[prop].file_name)}}</td>
				<td><a href={{= getwebroot()}}PfTaskFileCtrl/downLoadFileFormMongo.do?fileId={{= it[prop].mogodb_id}}>下载</a>
				{{? it[prop].source_type ==1}}
					<a onclick="delSupplierMaterialcheck({{= it[prop].materialcheck_id}})" class="ml10">删除</a>
				{{??}}
				{{?}}
				</td>
			</tr>
         {{}}}
		</script>
		<script id="allSupplierStmpl" type="text/x-dot-template">
			<option value=0>--请输入或选择--</option>
         {{for(var prop in it){}}
			<option value={{= replaceNullAsStr(it[prop].supplier_id)}}>{{= replaceNullAsStr(it[prop].supplier_cpyname)}}</option>
         {{}}}
		</script>
	</body>
</html>
