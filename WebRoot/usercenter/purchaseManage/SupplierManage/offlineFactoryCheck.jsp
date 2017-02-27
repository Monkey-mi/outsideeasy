<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>线下验厂</title>
<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/purchase.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
</head>
<body class="bg_grey">
<div id="top"></div>
<!--中间-->
<div class="midd_wrap clearfix">
	<div class="midd_left_wrap" style="width:180px;">
	</div>
	<div class="midd_right_wrap" style="width:834px">
		<p class="purchase_right_title"><span>线下验厂</span></p>
	<div id="offlineFactoryCheck" class="offlineFactoryCheck mt20 ml10 mr10" >
		<ul class="tab">
				<li class="curr" onClick="currtab('#offlineFactoryCheck',0)">验厂报告列表<span class="split">|</span></li>
				<li onClick="currtab('#offlineFactoryCheck',1)">已通知供应商<span class="split">|</span></li>
				<li onClick="currtab('#offlineFactoryCheck',2)">待通知供应商<span class="split">|</span></li>
				<li onClick="currtab('#offlineFactoryCheck',3)">免检供应商</li>
		</ul>
		<div class="posA select_content" id="selectContent" style="display:none;">
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
				<div class="selectSave f_l" onclick="saveAddressSelected(this)">保存</div>
				<div class="selectClose f_l ml10 mr10" onclick="selectClose(this)">关闭</div>
			</div>
	    </div>
		<!-- 验厂报告列表开始 -->
		<div id="offlineFactoryCheck_list" class="tabcon clearfix" style="display:block;overflow:visible;">
			<div class="mt20 clearfix ">
				<div class="clearfix f_l posR " >
					<div id="dateType" class="greycolor f_l dateType">报告日期</div>
					<select class="greycolor posA dateTypeSelect" onchange="showSelectContent(this,'dateType')" style="width:90px;">
						<option value ="1">报告日期</option>
						<option value ="2">验厂日期</option>
				    </select>
				 </div>
				<input type="text" id="startDateForReport" style="width:80px;height:30px;border:1px solid #e8e8e8;" class="f_l ml4  Wdate greycolor startNotiDate" placeholder="开始时间" onclick="WdatePicker({readOnly:true})" value>
			   	<span class="f_l mt4">-</span>
			    <input type="text" id="endDateForReport" style="width:80px;height:30px;border:1px solid #e8e8e8;" class="f_l  Wdate greycolor startNotiDate" placeholder="结束时间" onclick="WdatePicker({readOnly:true})" value>
				<div class="ml4 f_l posR greycolor clearfix " id="address">
			    	<div class="addressSelect" onclick="selectShow(this)" style="height:30px;">地址选择<img src="/newresources/images/switchover.png" style="margin-left:70px"></div>
				   <!--  <div class="posA select_content hide">
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
				    </div> -->
		    	</div>
				<input id="searchForReport" type="text" placeholder="请输入供应商名称、供应商会员名称、验厂人姓名关键字" class="search_wrap ml4 f_l">
				<button id="searchButtonForReport" class="ml5 white_color searchButton f_l" onclick="searchButtonForReport()">搜索</button>
			</div>
			<!-- <div class="totalCount t_algin_r mb10 mt20">共&nbsp;<span id="reportTotal" class="redcolor">*</span>&nbsp;条记录</div> -->
			<div class="mt10">
				<div class="offlineFactoryTable mt10 clearfix">
					<table id="checkfactoryReportList" class="factoryCheck_tablelist"><!-- 验厂报告列表 --></table>
				</div>
				<div id="paginationForReport" class="quotes clearfix"></div>
			</div>
		</div>
		<!-- 验厂报告列表结束  -->
		<!--已通知供应商开始  -->
		<div id="offlineFactoryCheck_noticed"  class="tabcon clearfix" style="overflow:visible;" >
			<div class="mt20 clearfix">
				<div class="clearfix f_l posR " >
					<div id="notifyType" class="greycolor f_l notifyType">全部通知</div>
					<select id="notifyStatus" class="greycolor f_l dateTypeSelect posA"  onchange="showSelectContent(this,'notifyType')" style="width:100px;">
						<option value="3" >全部通知</option>
						<option value="0" >待确认通知</option>
						<option value="1" >确认通知</option>
						<option value="2" >已取消通知</option>
					</select>
				</div>
				<div class="clearfix f_l posR ml4" >
					<div id="notifyDateType" class="greycolor f_l notifyDateType">通知日期</div>
					<select id="dateTypeForNotified" class="greycolor f_l posA dateTypeSelect" onchange="showSelectContent(this,'notifyDateType')" style="width:110px;">
						<option value="1" >通知日期</option>
						<option value="2" >计划验厂日期</option>
					</select>
				</div>
		    	<input type="text" id="startDateForNotified" style="width:80px;height:30px;border:1px solid #e8e8e8;" class="f_l ml4  Wdate greycolor startNotiDate" placeholder="开始时间" onclick="WdatePicker({readOnly:true})" value>
		   	    <span class="f_l mt4">-</span>
		    	<input type="text" id="endDateForNotified" style="width:80px;height:30px;border:1px solid #e8e8e8;" class="f_l  Wdate greycolor startNotiDate" placeholder="结束时间" onclick="WdatePicker({readOnly:true})" value>
				<div class="ml4 f_l posR greycolor clearfix " id="address">
			    	<div class="addressSelect" onclick="selectShow(this)" style="height:30px;">地址选择<img src="/newresources/images/switchover.png" style="margin-left:100px"></div>
		    	</div>
				<input id="searchForNotified" type="text" placeholder="请输入供应商名称、供应商会员名称、验厂人姓名关键字"  class="search_wrap ml4 f_l" style="width:195px;">
				<button id="searchButtonForNotified" class="ml5 white_color searchButton f_l" onclick="searchButtonForNotified()">搜索</button>
			</div>
			<!--全部验厂通知开始-->
			<div class="mt20 tabcon2 clearfix"  style="display:block;overflow:visible;">
				<input type="checkbox" id="selectAllForNotified" name="checkbox" value="" onClick="selectAll(this,'notifiedSupplierShow');"/>全选
				<a class="blue ml20" onclick="cancelNotifyByBatch()">批量取消通知</a>
				<!-- <span class="t_algin_r f_r">共&nbsp;<span id="notifiedSupplierTotal" class="redcolor">0</span>&nbsp;条记录</span> -->
				<div class="offlineFactoryTable mt10" >
					<table id="notifiedSupplierShow" class="factoryCheck_tablelist "><!-- 已通知供应商 --></table>
				</div>
				<div id="paginationForNotified" class="quotes clearfix"></div>
			</div>
		</div>
		<!--已通知供应商结束  -->
		<!--待通知供应商开始  -->
		<div id="offlineFactoryCheck_wait" class="tabcon clearfix"  style="overflow:visible;">
			<div class="mt20" style="margin-left:190px;">
				<div class="clearfix f_l posR ml4" >
					<div id="checkFacType" class="greycolor f_l dateType">验厂类型</div>
					<select id="checkFacTypeForNum"  class="greycolor f_l posA dateTypeSelect" onchange="showSelectContent(this,'checkFacType')" style="width:90px;">
						<option value="0" >全部</option>
						<option value="1" >初次验厂</option>
						<option value="2" >到期复检</option>
					</select>
				</div>
				<div class="ml4 f_l posR greycolor clearfix " id="address">
			    	<div class="addressSelect" onclick="selectShow(this)" style="height:30px;">地址选择<img src="/newresources/images/switchover.png" style="margin-left:100px"></div>
		    	</div>
		    	<input type="text" id="searchForWait" placeholder="请输入供应商名称、供应商会员名称、验厂人姓名关键字"  class="search_wrap ml4 f_l width335"/>
				<button id="searchButtonForWait" class="ml5 white_color searchButton" onClick="searchButtonForWait()">搜索</button>
			</div>
			<!--全部待通知供应商开始-->
			<div class="mt20 tabcon2" style="display:block;">
				<input type="checkbox" id="selectAllForWait" name="checkbox"  value="" onclick="selectAll(this,'waitNotifySupplierShow')"/>全选
				<a class="blue ml20 " onclick="freeCheckByBatch()">批量设置免检</a>
				<!-- <span class="t_algin_r f_r">共&nbsp;<span id="waitNotiSupplierTotal" class="redcolor">0</span>&nbsp;条记录</span> -->
				<div class="offlineFactoryTable mt10">
					<table id="waitNotifySupplierShow" class="factoryCheck_tablelist "><!-- 待通知供应商展示 --></table>
				</div>
				<div id="paginationForWait" class="quotes clearfix"></div>
			</div>
		</div>
		<!--待通知供应商结束  -->
		<!--免检供应商开始-->
		<div id="offlineFactoryCheck_free" class="tabcon"  style="overflow:visible;">
			<div class="mt20 clearfix">
		    	<input type="text" id="startDateForFree" style="width:90px;height:30px;border:1px solid #e8e8e8;" class="f_l  Wdate greycolor startNotiDate" placeholder="开始时间" onclick="WdatePicker({readOnly:true})" value>				
		   	    <span class="f_l mt4">-</span>
		    	<input type="text" id="endDateForFree" style="width:90px;height:30px;border:1px solid #e8e8e8;" class="f_l Wdate greycolor startNotiDate" placeholder="结束时间" onclick="WdatePicker({readOnly:true})" value>
				<!-- <div class="f_l ml4 greycolor posR">
				    <div id="purchaseNature" class="purchaseNature"  style="height:30px;">采购性质<img src="/newresources/images/switchover.png" class="ml10"></div>
					<select id="purchaseNatureSelect" class="greycolor purchaseNatureSelect posA" onchange="showPurchaseNature()">
					    <option value ="0">全部</option>
					    <option value ="1">大宗材料</option>
					    <option value="2">一般材料</option>
					    <option value="3">瓶颈材料</option>
				    </select>
			    </div>
				<div class="ml4 f_l posR greycolor clearfix" id="sort">
				 	<div class="purchaseSort " onclick="selectShow(this)" style="height:30px;">采购分类<img src="/newresources/images/switchover.png" class="ml10"></div>
				    <div class="posA select_content hide" style="">
				    	<div class="sortSearch clearfix"><input class="f_l"><div class="search f_l">类目搜索</div></div>
				    	<div class="greycolor youChoosed">您已选择：</div>
				    	<ul class="optionChoosed">
				    	</ul>
				    	<div class="selectList ">
					    	<ul id="level1" class="level1 f_l">
					    	</ul>
					    	<ul id="level2" class="level2 f_l">
					    	</ul>
					    	<ul id="level3" class="level3 f_l">
					    	</ul>
				    	</div>
				    	<div class="operates clearfix">
							<div class="nolimit f_l" onclick="">不限类目</div>
							<div class="selectSave f_l" onclick="">保存</div>
							<div class="selectClose f_l ml10 mr10">关闭</div>
						</div>
				    </div>
				  </div> -->
				<div class="ml4 f_l posR greycolor clearfix " id="address">
			    	<div class="addressSelect " onclick="selectShow(this)" style="height:30px;">地址选择<img src="/newresources/images/switchover.png" style="margin-left:100px"></div>
		    	</div>
				<input type="text" id="searchForExampt" placeholder="请输入供应商名称、供应商会员名称、验厂人姓名关键字" class="search_wrap ml4 f_l" style="width:390px;">
				<button id="searchButtonForExampt" class="ml5 white_color searchButton f_l" onClick="searchButtonForExampt()">搜索</button>
			</div>
			<div class="mt20" >
				<input type="checkbox" id="selectAllForExampt" name="checkbox"  onclick="selectAll(this,'examptSupplierShow');"/>全选
				<a class="blue ml20 " onclick="recoverCheckByBatch()">批量恢复验厂</a>
				<!-- <span class="t_algin_r f_r">共&nbsp;<span id="examptSuppliersTotal" class="redcolor">*</span>&nbsp;条记录</span> -->
				<div class="offlineFactoryTable mt10">
					<table id="examptSupplierShow" class="factoryCheck_tablelist "><!-- 免检供应商展示 --></table>
				</div>
				<div id="paginationForExampt" class="quotes clearfix"></div>
			</div>
		</div>
		<!--免检供应商结束-->
	</div>
</div>
<!--弹出层开始  -->
<div class="mask" id="pop_mask"></div>
<!--通知验厂  -->
<div id="notify_check_wrap" class="pop_layer_wrap">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		通知验厂
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('notify_check_wrap')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap clearfix posR" style="height:260px;">
		<div class="ml10 mt20">
			<span >验厂人员:</span>
			<input id="checkMan" type="text" placeholder="姓名"  class="name"/><input id="checkManPhone" type="text" placeholder="电话" class="phone ml10"/>
			<div id="checkInfoTip" class="sub_tip"><img src='/newresources/images/new/er.png' /><span class="tip_info redcolor" style="width:85px;"></span></div>
		</div>
		<div class="ml10 mt20">
			<span >计划验厂日期:</span>
			<input id="planCheckDt" type="text" onClick="WdatePicker({minDate:'%y-%M-%d',readOnly:true})" class="input_wrap Wdate" >
			<div id="planDtTip" class="sub_tip"><img src='/newresources/images/new/er.png' /><span class="tip_info redcolor" style="width:85px;"></span></div>
		</div>
		<div class="ml10 mt20 clearfix">
			<div class="f_l">
				<span >通知文件选择:</span>
				<input type="text" id="input_filename" class="input_wrap" readonly>
			</div>
			<div class="upload posR f_l ml10">
				<button class="uploadFile" onclick="">选择文件</button>
				<input id="input_uploadfile" name="file" class="uploadfile_input" type="file" onchange="showviewtext(this)" />
				<div id="uploadInfoTip" class="sub_tip"><img src='/newresources/images/new/er.png' /><span class="tip_info redcolor" style="width:85px;text-align:left;"></span></div>
				<input id="checkFacInfoId" type="hidden">
				<input id="supplierIdHidden" type="hidden">
			</div>
		</div>
		<div class="file_tip">请选择5M以下.doc/.docx;.ppt/.pptx/.pps;.xls/.xlsx;.pdf;.txt;<br>.bmp;.jpg/.jpeg;.png;.gif文件</div>
		<div class="mt20 submit_btn" onclick="updateNotifySupplier()" style="position:absolute;">提交</div>
		<div id="submitTip" style="color:red;position:absolute;top:198px;left:290px;"></div>
	</div>
</div>
<!--通知验厂结束  -->
<!--批量取消通知开始  -->
<div id="notify_cancel_batch" class="pop_layer_wrap batch_operate">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		批量取消通知
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('notify_cancel_batch')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap ">
		<div class="title mt30 mb30"><img src="/newresources/images/OrangeSigh.png">&nbsp;您确定要取消已下发给以下<span class="number">0</span>家企业的验厂通知吗？</div>
		<ul class="greycolor companyList"><!-- 取消通知的企业列表 --></ul>
		<div class="mt20"><button id="batchCancelNotifySubmit" class="confirm" onClick="submitBCNotify()">确定</button><button class="cancel" onClick="pop_div_close('notify_cancel_batch')">取消</button></div>
	</div>
</div>
<!--批量取消通知结束  -->
<!--批量设置免检开始  -->
<div id="free_check_batch" class="pop_layer_wrap batch_operate">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		批量设置免检
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('free_check_batch')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap">
		<div class="title mt20 mb20"><img src="/newresources/images/OrangeSigh.png">&nbsp;是否确定以下<span class="number">3</span>家公司设置为免检？</div>
		<ul class="greycolor companyList"><!-- 批量免检列表 --></ul>
		<div class="mt20"><button class="confirm" onclick="submitFreeCheck()">确定</button><button class="cancel" onClick="pop_div_close('free_check_batch')">取消</button></div>
	</div>
</div>
<!--批量设置免检结束  -->
<!--批量恢复验厂开始  -->
<div id="recover_check_batch" class="pop_layer_wrap batch_operate">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		批量恢复验厂
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('recover_check_batch')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap">
		<div class="title mt20 mb20"><img src="/newresources/images/OrangeSigh.png">&nbsp;是否确定以下<span class="number">3</span>家公司恢复验厂？</div>
		<ul class="greycolor companyList"><!-- 批量回复验厂供应商列表 --></ul>
		<div class="mt20"><button class="confirm" onclick='submitRecoverCheck()'>确定</button><button class="cancel" onClick="pop_div_close('recover_check_batch')">取消</button></div>
	</div>
</div>
<!--批量回复验厂结束  -->
<!--弹出层结束  -->
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
<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>
<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="/usercenter/purchaseManage/SupplierManage/js/offlineFactoryCheck.js"></script>
</body>
</html>