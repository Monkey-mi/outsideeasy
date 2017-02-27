<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>供应商库</title>
<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/purchase.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/jquery.treeview.css" rel="stylesheet" type="text/css" />
</head>
<body class="bg_grey">
<div id="top"></div>
<!--中间-->
<div class="midd_wrap clearfix" >
	<div class="midd_left_wrap" style="width:180px;">
	</div>
	<div class="midd_right_wrap" style="width:834px">
		<p class="purchase_right_title"><span>供应商库</span></p>
		<div class="ml10 mr10 mt20 tips">
			<img src="/newresources/images/supplier/tips.png">&nbsp;<span style="color:#f1af27;">小贴士</span>
			<ol>
				<li>1.&nbsp;您可以点击新增供应商，邀请平台企业会员加入您的供应商库；</li>
				<li>2.&nbsp;您可以为已验厂供应商设置验厂周期，点击验厂报告后【设置周期】，提前15天该供应商会进入待验厂列表；</li>
				<li>3.&nbsp;您邀请过以及自主申请成为供应商、交易成功的企业会员均在【备选供应商】。</li>
			</ol>
		</div>
		<div id="supplierList" class="offlineFactoryCheck mt20 ml10 mr10">
			<ul class="tab posR">
				<li class="curr" onClick="currtab('#supplierList',0)">现有供应商<span class="split">|</span></li>
				<li onClick="currtab('#supplierList',1)">备选供应商<span class="split">|</span></li>
				<li onClick="currtab('#supplierList',2)">淘汰供应商</li>
			</ul>
			<button id="addSupplier" class="addSupplier posA" onclick="addSupplier()">+&nbsp;新增供应商</button>
			<div class="mt10 clearfix">
	<!-- 	<span>目前您拥有&nbsp;<span class="redcolor">100</span>&nbsp;家供应商</span>
			<span class="ml20">近30天有交易的供应商&nbsp;<span class="redcolor">12</span>&nbsp;家</span> -->
			<!-- 	<a href="" class="blue f_r ml10">批量导入</a>
				<a href="" class="blue f_r ">下载模板</a> -->
			</div>	
			<div id="tagAllManager" class="tagManager tag clearfix mb20" >
				<!-- <div class="f_l"><button class="blue_btn ml10 mt20 " >全部标签</button></div> -->
				<!-- 此处添加展示标签 -->
			</div>
			<hr class="hr_dashed mt20">
			<div class="mt20 f_r">
				<div id="minMaxScore" class="f_l score greycolor">
					<input id="minScore" placeholder="最低评分">-<input id="maxScore" placeholder="最高评分">
				</div>
				<div id="inviteStatusWrap" class="f_l ml4 greycolor posR hide">
				    <div id="inviteStatus" class="purchaseNature" >邀请状态</div>
					<select id="inviteStatusSelect" class="greycolor purchaseNatureSelect posA" onchange="showInviteStatus()">
					    <option value ="0">全部</option>
					    <option value ="1">已邀请</option>
					    <option value ="2">已接受</option>
					    <option value ="3">邀请过期</option>
				    </select>
			    </div>
				<div class="f_l ml4 greycolor posR" id="character">
				    <div id="purchaseNature" class="purchaseNature">采购性质</div>
					<select id="purchaseNatureSelect" class="greycolor purchaseNatureSelect posA" onchange="showPurchaseNature()" style="width:85px;">
					    <option value ="0">全部</option>
					    <option value ="1">大宗材料</option>
					    <option value="2">一般材料</option>
					    <option value="3">瓶颈材料</option>
				    </select>
			    </div>
			    <div class="ml4 f_l posR greycolor" id="sort">
				    <div class="purchaseSort" onclick="selectShow(this)">采购分类<img src="/newresources/images/switchover.png" class="ml10"></div>
				    <div class="posA select_content hide" style="width:250px;">
				    	<!-- <div class="sortSearch clearfix" style="width:245px;"><input class="f_l" style="width:170px;"><div class="search f_l">类目搜索</div></div> -->
				    	<div class="greycolor youChoosed" style="width:245px;">您已选择：</div>
				    	<ul class="optionChoosed" style="width:240px;display:inline-block">
				    	</ul>
				    	<!-- <div class="selectList">
					    	<ul id="level1" class="level1 f_l">
					    	</ul>
					    	<ul id="level2" class="level2 f_l">
					    	</ul>
					    	<ul id="level3" class="level3 f_l">
					    	</ul>
				    	</div> -->
				    	<div class="productSort_mid" style="height:180px;border-bottom:1px dashed #ccc;border-top:1px dashed #ccc;padding-top:10px;">
							<ul id="sortTree" class="sorttree2 bg_white">
							</ul>
						</div>
				    	<div class="operates clearfix" style="width:250px;">
							<div class="nolimit f_l" onclick="noLimitSort()">不限类目</div>
							<div class="selectSave f_l" onclick="sortSave()" style="margin-left:75px;width:40px;" >保存</div>
							<div class="selectClose f_l ml10 mr10" style="width:40px;">关闭</div>
						</div>
				    </div>
			    </div>
			    <div class="ml4 f_l posR greycolor clearfix " id="address">
			    	<div class="addressSelect" onclick="selectShow(this)">地址选择<img src="/newresources/images/switchover.png" style="margin-left:75px"></div>
				    <div class="posA select_content hide">
				    	<div class="greycolor youChoosed">您已选择：</div>
				    	<div style="width:320px;height:auto;" class="clearfix"><ul class="optionChoosed"></ul></div>
				    	<div class="selectName clearfix">
				    		<div class="province f_l">省份</div>
				    		<div class="city f_l">城市</div>
				    	</div>
				    	<div class="selectList2 clearfix">
					    	<ul id="province" class="level1 f_l">
					    	</ul>
					    	<ul id="city" class="level2 f_l">
					    	</ul>
				    	</div>
				    	<div class="operates clearfix">
							<div class="nolimit f_l" onclick="noLimitAddress()">不限地址</div>
							<div class="selectSave f_l" onclick="saveAddressSelected()">保存</div>
							<div class="selectClose f_l ml10 mr10">关闭</div>
						</div>
				    </div>
		    	</div>
				<input id="complexKey" type="text" class="search_input ml4 f_l"  placeholder="企业名称、联系人、联系电话关键字">
				<button id="searchButton" class="search ml4 f_l" onclick="searchForSupplier()">搜索</button>
			</div>
			<br><br><br>
			<div id="tagBasicDataWrap" class="hide bg_white f_l showTag posA" style="z-index:9000;">
				<input type="hidden" class="supplierIdData"/>
				<div id="tagBasicDataShow" class="tagShow"><!-- 添加标签基础信息 --></div>
				<button class="modifyTagSave f_r mr20" >关闭</button>
				<div class="pl8 addTag">+&nbsp;新建标签</div>
				<div class="saveTag hide"><input placeholder="新建标签"  class="newTag"/><div class="save f_r">保存</div></div>
			</div>
	<div class="div_con">
		<!--现有供应商开始-->
		<div class="supplierExist tabcon" style="display: block;">
				<div class="clearfix">
					<div class="f_l"><input type="checkbox" id="selectAllForNow" name="checkbox" onClick="selectAll(this,'supplierListShow')" class="ml10"/>&nbsp;全选</div>
					<!-- <a class="blue ml20 f_l" href="">批量设置标签</a> -->
					<a class="blue ml20 f_l" onclick="batchSetCheckCycle('supplierListShow')">批量设置验厂周期</a>
					<a class="blue ml20 f_l" onclick="batchExamptSuppliers('supplierListShow')">批量淘汰</a>
					<!-- <span class="t_algin_r f_r">共&nbsp;<span id="totalNum" class="redcolor">0</span>&nbsp;条记录</span> -->
				</div>
				<div class="supplierExist_tableList mt10 clearfix">
					<div id="setCheckTimeList" class="setCheckTimeList posA hide clearfix">
						<input type="hidden" class="supplierIdData"/>
						<ul class="setCycle bg_white pl10"><!-- 验厂周期基础数据 --></ul>
						<button class="setCheckTimeListSave mr20" >关闭</button>
					</div>
					<table id="supplierListShow"><!-- 现有供应商展示  --></table>
				</div>
		</div>
		<!--现有供应商接结束-->
		<!--备选供应商开始  -->
		<div class="supplierAlternative tabcon">
			<div class="clearfix">
				<div class="f_l"><input type="checkbox" id="selectAllForOption" name="checkbox" onClick="selectAll(this,'optionSupplierShow');" class="ml10"/>&nbsp;全选</div>
				<!-- <a class="blue ml20 f_l" href="">批量设置标签</a> -->
				<a class="blue ml20 f_l" onclick="batchDelSuppliers('optionSupplierShow')">批量删除</a>
				<a class="blue ml20 f_l" onclick="batchInviteSupplierAgain('optionSupplierShow')">批量邀请供应商</a>
				<!-- <span class="t_algin_r f_r">共&nbsp;<span id="optionTotalNum" class="redcolor">0</span>&nbsp;条记录</span> -->
			</div>
			<div class="supplierExist_tableList mt10 clearfix">
				<table id="optionSupplierShow"><!-- 备选数据渲染 --></table>
			</div>
		</div>
		<!--备选供应商结束  -->
		<!--淘汰供应商开始  -->
		<div class="supplierOut tabcon">
		<div class="clearfix">
			<div class="f_l"><input type="checkbox" id="selectAllForEliminate" name="checkbox" onClick="selectAll(this,'eliminateSupplierShow');" class="ml10" />&nbsp;全选</div>
			<!-- <a class="blue ml20 f_l" href="">批量设置标签</a> -->
			<a class="blue ml20 f_l" onclick="batchDelSuppliers('eliminateSupplierShow')">批量删除</a>
			<!-- <span class="t_algin_r f_r">共&nbsp;<span id="eliminateTotalNum" class="redcolor">0</span>&nbsp;条记录</span> -->
		</div>
		<div class="supplierOut_tableList mt10 clearfix">
		<table id="eliminateSupplierShow"><!-- 淘汰供应商数据渲染 --></table>
		</div>
	</div>
	<div id="pagination" class="quotes clearfix"></div>
	<!--淘汰供应商结束  -->	
</div>
</div>
</div>
<div class="mask" id="pop_mask"></div>
<!--新增供应商-->
<div id="addSupplier_wrap" class="pop_layer_wrap">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		新增供应商
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('addSupplier_wrap')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap clearfix">
		<div class="h30 mt10">
		<span class="addSupplier_tip">请输入您要添加的企业名称，多个用";"或"；"隔开</span>
	
		</div>
		<div class="mb10">
			<input id="companyName" name="companyName" value="" type="radio" checked="checked"/>企业名称
		</div>
		<div>已输入<span  id="number" class="redcolor">0</span>个</div>
		<textarea id="addSupplier_content" class="addSupplier_content"	onKeyUp="countName()"></textarea>
	</div>
		<div class="mt10 f_r mr20"><button class=" invite" onClick="inviteJoin()">邀请加入</button></div>
</div>
<!--淘汰供应商提示框-->
<div id="outSupplier_wrap" class="pop_layer_wrap">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		淘汰供应商
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('outSupplier_wrap')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap clearfix">
		<div class="h30 mt10">
			<span id="eliminateSupplierName" class="b">***</span>
			<br>
			<span class="grey_color">请输入淘汰原因</span>
			<textarea id="eliminateSupplierReason" class="addSupplier_content"	placeholder="添加原因后淘汰供应商"></textarea>
			<div id="eliminateTipOne" style="display:inline-block;"><span style="color:red;">*&nbsp;最大字符数为150;</span></div>
			<div id="eliminateTip" style="display:inline-block;"><span style="color:red;">如果淘汰将不可恢复！</span></div>
			<button id="eliminateSupCanBtn" class="mt10 mb10 grey_button f_r ml10" type="submit" onClick="pop_div_close('outSupplier_wrap')">取消</button>
			<button id="eliminateSupBtn" class="mt10 mb10 yellow_button f_r" type="submit" onClick="pop_div_done(this)">确定</button>
			<input id="eliminateSupplierId" type="hidden">
		</div>
	</div>
</div>
<!--物料验证-->
<div id="checkMaterial_wrap" class="pop_layer_wrap">
	<div class="b ml10" style="height:30px; line-height:30px;">
		物料验证
		<a class="close_btn" style="color:#b3b3b3" href="javascript:void(0)" onClick="pop_div_close('checkMaterial_wrap')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap ">
		<div class="h30 mt10">
		<input id="start_time" class="Wdate" placeholder="起始日期" onclick='WdatePicker({readOnly:true})'>-<input id="end_time" class="Wdate" onclick='WdatePicker({readOnly:true})' placeholder="结束日期">
		<button class="supplier_blue_button " id="searchMaterialBtn" >搜索</button>
		</div>
		<div class="tableScroll">
		<table id="materialCheck_table" class="sale_tablelist"><!-- 物料验证弹出框数据 --></table>
		</div>
	</div>
</div>
<!--验厂报告-->
<div id="checkFactory_wrap" class="pop_layer_wrap">
	<div class="b ml10" style="height:30px; line-height:30px;">
		验厂报告
		<a class="close_btn" style="color:#b3b3b3" href="javascript:void(0)" onClick="pop_div_close('checkFactory_wrap')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap ">
		<div class="h30 mt10">
			<input id="start_time1" class="Wdate" placeholder="起始日期" onclick='WdatePicker({readOnly:true})'>-<input id="end_time1" class="Wdate" onclick='WdatePicker({readOnly:true})' placeholder="结束日期">
			<button id="searchFactoryBtn" class="supplier_blue_button ">搜索</button>
			</div>
			<div class="tableScroll">
			<table id="checkFactory_table" class="sale_tablelist"><!-- 验厂报告弹出层数据 --></table>
		</div>
	</div>
</div>
<!--批量删除开始  -->
<div id="delete_supplier_batch" class="pop_layer_wrap batch_operate">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		批量删除供应商
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('delete_supplier_batch')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap">
		<div class="title mt20 mb20"><img src="/newresources/images/OrangeSigh.png">&nbsp;是否确定删除以下<span class="number">0</span>家供应商？</div>
		<ul class="greycolor companyList"><!-- 批量回复验厂供应商列表 --></ul>
		<div class="mt20"><button class="confirm" onclick="submitDelSuppliers()">确定</button><button class="cancel" onClick="pop_div_close('delete_supplier_batch')">取消</button></div>
	</div>
</div>
<!--批量删除结束  -->
<!-- 批量邀请供应商开始 -->
<div id="invite_supplier_batch" class="pop_layer_wrap batch_operate">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		批量邀请供应商
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('invite_supplier_batch')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap">
		<div class="title mt20 mb20"><img src="/newresources/images/OrangeSigh.png">&nbsp;是否确定重新邀请以下<span class="number">0</span>家供应商？</div>
		<ul class="greycolor companyList"><!-- 批量回复验厂供应商列表 --></ul>
		<div class="mt20"><button class="confirm" onclick="submitBatchInviteSuppliers()">确定</button><button class="cancel" onClick="pop_div_close('invite_supplier_batch')">取消</button></div>
	</div>
</div>
<!-- 批量淘汰 -->
<div id="exampt_supplier_batch" class="pop_layer_wrap batch_operate">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		批量淘汰供应商
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('exampt_supplier_batch')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap">
		<div class="titleForExampt mt20 mb20"><img src="/newresources/images/OrangeSigh.png">&nbsp;是否确定淘汰以下<span class="number">0</span>家供应商？</div>
		<ul class="greycolor companyListForExampt"><!-- 批量淘汰供应商列表 --></ul>
		<div class="exampt_reason">
			<span class="grey_color">请输入淘汰原因</span>
			<textarea id="eliminateSupplierReasonForBatch" class="addSupplier_content"	placeholder="添加原因后淘汰供应商"></textarea>
			<div id="eliminateTipOne" style="display:inline-block;"><span style="color:red;">*&nbsp;最大字符数为150;</span></div>
			<div id="eliminateTip" style="display:inline-block;"><span style="color:red;">如果淘汰将不可恢复！</span></div>
		</div>
		<div class="mt20"><button class="confirm" onclick="submitBatchExamptSupplier()">确定</button><button class="cancel" onClick="pop_div_close('exampt_supplier_batch')">取消</button></div>
	</div>
</div>
<!-- 批量淘汰 -->
<!-- 批量设置周期  -->
<div id="check_cyc_batch" class="pop_layer_wrap batch_operate">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		批量设置验厂周期
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('check_cyc_batch')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap">
		<p class="mt20"><span class="cyc_tip">确定设置？<span style="color:#777;">(原先设置的验厂周期将会被覆盖)</span></span></p>
		<div class="cyc_data_wrap">
			<span class="cyc_tip">验厂周期:</span>
			<div class="cyc_radio"><!-- 验厂周期基础信息 --></div>
		</div>
		<div class="cyc_tip_nocheck hide" style="color:red;clear:left;margin-left:35px;"><span>*&nbsp;请先设置周期</span></div>
		<div class="mt20"><button class="stop_btn" onclick="submitBatchSetCheckCyc()">确定</button><button class="cancel_btn" onClick="pop_div_close('check_cyc_batch')">取消</button></div>
	</div>
</div>
<!-- 批量设置周期  -->
<!-- 批量设置周期  -->
<div id="check_cyc_batch_tip" class="pop_layer_wrap batch_operate">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		温馨提示
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('check_cyc_batch_tip')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap">
		<div class="con">
			<span class ="icon"></span>
			<span style="line-height:32px;">验厂周期设置成功！</span>
			<ul class="companies">
				<!-- <li class="company">以下公司未验厂，验厂周期未设置</li>
				<li class="company">浙江泰普森集团</li>
				<li class="company">浙江泰普森休闲</li> -->
			</ul>
		</div>
		<div class="mt20"><button class="stop_btn" onclick="pop_div_close('check_cyc_batch_tip')">确定</button></div>
	</div>
</div>
<!-- 批量设置周期  -->
</div>
<!--底端-->
<div id="bottom"></div>
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<script type="text/javascript" src="/newresources/js/cityOperate.js"></script>
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.nicescroll.js"></script>
<script type="text/javascript" src="/usercenter/purchaseManage/SupplierManage/js/supplierList.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.browser.js"></script>
<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="/newresources/js/json2.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.treeview.js"></script>
</body>
</html>