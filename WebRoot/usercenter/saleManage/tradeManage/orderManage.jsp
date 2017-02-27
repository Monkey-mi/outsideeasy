<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>销售订单管理</title>
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
				<p class="sale_right_title"><span>销售订单管理</span></p>
				<div id="saleOrderList" class="saleOrderList mt20 ml10 mr10">
					<ul class="tab posR">
						<li class="curr" onClick="currtab('#saleOrderList',0)">全部订单<span class="split">|</span></li>
						<li onClick="currtab('#saleOrderList',1)">待确认订单<span class="split">|</span></li>
						<li onClick="currtab('#saleOrderList',2)">已接订单<span class="split">|</span></li>
						<li onClick="currtab('#saleOrderList',3)">交货完成订单<span class="split">|</span></li>
						<li onClick="currtab('#saleOrderList',4)">待确认终止订单<span class="split">|</span></li>
						<li onClick="currtab('#saleOrderList',5)">异常订单</li>
					</ul>
					<div class="orderRecycleBin posA"  onClick="currtab('#saleOrderList',6)"><img src="/newresources/images/supplier/binGrey.png">订单回收站</div>
					<div class="searchCriteria">
						<div class="greycolor mt10 clearfix ">
							<div class="posR f_l" style="margin-top:1px;">
								<div id="date" class="date" onclick="showSelect()"></div>
								<select id="dateSelect" class="dateSelect posA" onchange="chooseDate()">
									<option value="1"  selected = "selected">订单提交日期</option>
									<option value="2">订单确认日期</option>
								</select>
							</div>
							<div class="f_l ml4">
								<input class="datetime  Wdate" style="height:30px;border:1px solid #e8e8e8;margin-top:1px;" id="start_time" onClick="WdatePicker({maxDate:'#F{$dp.$D(\'end_time\')}',readOnly:true})" placeholder="起始日期">
								-
								<input class="datetime  Wdate" style="height:30px;border:1px solid #e8e8e8;" id="end_time" onClick="WdatePicker({minDate:'#F{$dp.$D(\'start_time\')}',readOnly:true})"  placeholder="结束日期">
								<input class="keywords " id="search_text" placeholder="请输入货品名称或者合同编号关键字进行搜索">
								<button class="order_blue_button " onclick = "getOrderDetails(1)">搜索</button>
								<button class="order_blue_button " onclick = "downloadOrder()">导出</button>
								<div class="more_down f_r">更多</div><div class="more_up f_r hide">收起</div>
							</div>
						</div>
						<div class="mt10 moreCriteria hide">
							<span >采购商名称：</span><input placeholder="请输入采购商名称" id="search_company" class="supplier_input ml10"/>
							<span class="ml10">订单编号:</span><input placeholder="请输入订单编号" id="order_num" class="orderNode_input ml10"/>
							<span class="ml10">总金额范围:</span><input id="start_money" class="money_input ml10"/>-<input id="end_money" class="money_input "/>
						</div>
					</div>
					<!--全部订单开始  -->
					<div id="textOrderInfo" class="allOrders tabcon mt10" style="display: block;">
						<div  class="clearfix">
							<div class="f_l ml10"><input type="checkbox" id="selectAll" name="checkbox" onClick="selectAll()"/>&nbsp;全选</div>
							<a class="blue ml20 f_l" id="button_all_delete" onclick="orderMemodelete()">批量删除</a>
							<a class="blue ml20 f_l" id="button_all_remark" onclick="orderMemoList()">批量备忘</a>
							<a class="blue ml20 f_l" id="button_all_return" onclick="orderReturnList()">批量还原</a>
							<!-- <span class="t_algin_r f_r">共&nbsp;<span id="order_count_v" class="redcolor"></span>&nbsp;条记录</span> -->
						</div>
						<div class="orderTable_head mt10 clearfix">
							<div class="productInfo f_l">产品信息</div>
							<div class="price f_l">单价</div>
							<div class="count f_l">订单数量</div>
							<div class="unit f_l">单位</div>
						</div>
						<div id="allOrders">
						</div>
					</div>
					<!--全部订单结束  -->
				</div>
				<div id="paginationcom" class="quotes"></div>
			</div>
			
			<!--弹框开始  -->
			<div class="mask" id="pop_mask"></div>
			<!--查看原因开始 -->
			<div id="queryReson" class="pop_layer_wrap">
				<div class="title_wrap" style="height:30px; line-height:30px;">
					取消原因
					<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('queryReson')" title="关闭窗口">X</a>
				</div>
				<div class="pop_content_wrap">
					<div class="ml10 mt20 clearfix">取消原因：<div class="f_r cancel" id="reasonDivs_cancel"></div></div>
					<div class="ml10 mt10 clearfix"><span>取消说明：</span><div class="f_r cancel" id="content_cancels"></div></div>
				</div>
				<button class="close mt20" onClick="pop_div_close('queryReson')">关闭</button>
			</div>
			<!--查看原因结束  -->
			<!--确认终止开始  -->
			<div id="stopAgree" class="pop_layer_wrap">
			     <input id="hide_stop_id" style="display:none">
				<div class="title_wrap" style="height:30px; line-height:30px;">
					确认终止
					<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('stopAgree')" title="关闭窗口">X</a>
				</div>
				<div class="pop_content_wrap" id="order_stop_s">
					
				</div>
				<button class="stop_btn mt20" onClick="stopOrder()">确认终止</button>
				<button class="cancel_btn mt20" onClick="pop_div_close('stopAgree')" >取消</button>
			</div>
			<!--确认终止结束  -->
			<!--查看终止详情开始  -->
			<div id="stopDetail" class="pop_layer_wrap">
				<div class="title_wrap" style="height:30px; line-height:30px;">
					终止详情
					<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('stopDetail')" title="关闭窗口">X</a>
				</div>
				<div class="pop_content_wrap" id = "order_cha_stop">
					
				</div>
				<button class="close mt20" onClick="pop_div_close('stopDetail')">关闭</button>
			</div>
			<!--查看终止详情结束  -->
			<!--确认接单开始  -->
			<div id="acceptOrder" class="pop_layer_wrap">
			     <input id="hide_accept_id" style="display:none">
				<div class="title_wrap" style="height:30px; line-height:30px;">
					确认接单
					<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('acceptOrder')" title="关闭窗口">X</a>
				</div>
				<div class="pop_content_wrap">
					<div class="ml10 mt20 b">请您核对订单信息保证订单信息准确无误后上传回签合同，确认订单</div>
					<div class="ml10 mt10">*必须上传回签合同才能确认订单</div>
					<div class="upload posR ml10 mt10" id="button_accept_file">
						<button class="uploadContract" >上传回签合同</button>
						<input id="input_uploadfile" name="file" type="file" onchange="showviewtext()" />
					</div>
					<div class="ml10 mt10 uploadFileName" id="input_filename" ></div>
				</div>
				<button class="stop_btn mt20" onClick="acceptOrderSave()" >确定</button>
				<button class="cancel_btn mt20" onClick="cancelAcceptOrder()">取消</button>
			</div>
			<!--确认接单结束  -->
			<!--添加备忘开始  -->
			<div id="orderMemo" class="pop_layer_wrap">
			     <input id="hide_remark_id" style="display:none">
				<div class="title_wrap" style="height:30px; line-height:30px;">
					<span></span>
					<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('orderMemo')" title="关闭窗口">X</a>
				</div>
				<div class="pop_content_wrap">
					<textarea id="content_remark" class="memo_content mt10" onkeyup="countWords()"></textarea>
					<div class="mt10">
						<span id="check_remark"><input type="checkbox" />&nbsp;覆盖已有的备忘内容</span>
						<span class="f_r ">还可以输入<span class="redcolor" id="words">150</span>字</span>
					</div>
				</div>
				<div class="ml120">
					<button class="stop_btn mt10" onClick="saveRemarkinfo(this)">确定</button>
					<button class="cancel_btn mt10" onClick="pop_div_close('orderMemo')">取消</button>
				</div>
			</div>
			<!--添加备忘结束  -->
			<!--弹框结束  -->
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
		<script type="text/javascript" src="/usercenter/saleManage/tradeManage/js/orderManage.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.browser.js"></script>
		<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="/newresources/js/json2.js"></script>
		<script id="allOrderstmpl" type="text/x-dot-template">
         {{for(var prop in it){}}
         <div  class="orderTable_body mt10">
								<div class="companyInfo">
                                 <input id="hide_company_name" style="display:none" value="{{= replaceNullAsStr(it[prop].purchaseOrder.pur_cpyname_cn)}}">
									<div class="f_l" >
										<input type="checkbox" onClick="selectSingle()" value="{{= it[prop].purchaseOrder.pur_order_id}}">&nbsp;
										<span class="companyName ">采购方公司：{{= replaceNullAsStr(it[prop].purchaseOrder.pur_cpyname_cn)}}
											{{? it[prop].comimtCount!=0}}
                                             <span class="posR" >
												<img onclick="querycomimtInfo({{= it[prop].purchaseOrder.pur_order_id}})"  src="/newresources/images/sale/message.png" class="messageLogo">
												<span class="message posA">{{= replaceNullAsStr(it[prop].comimtCount)}}条新留言</span>
											</span>
                                            {{?}}
                                            {{? it[prop].fileCount!=0}}
											<span class="posR" >
												<img onclick="queryFieInfo({{= it[prop].purchaseOrder.pur_order_id}})" src="/newresources/images/sale/file.png" class="fileLogo">
												<span class="newFile posA" >有{{= replaceNullAsStr(it[prop].fileCount)}}新文件</span>
											</span>
                                            {{?}}
										</span>
									</div>
									<span  class="contractNumber ">合同编号：{{= replaceNullAsStr(it[prop].purchaseOrder.agreement_bh)}}</span>
									<span class="submitTime">提交时间：{{= replaceNullAsStr(it[prop].purchaseOrder.create_dt)}}</span>
									<div  class="mt10 ml18 clearfix">
										<span class="greycolor companyName f_l">供应商公司：{{= replaceNullAsStr(it[prop].purchaseOrder.sup_cpyname_cn)}}</span>
										<span class="greycolor f_l" >订单编号：{{= replaceNullAsStr(it[prop].purchaseOrder.order_bh)}}</span>
										<a class="blue f_r mr20" onclick="queryInfo({{= it[prop].purchaseOrder.pur_order_id}})">详情&gt;&gt;</a>
									</div>
								 </div>
								<div class="productScroll" style="max-height:850px;overflow:hidden;">
								 <table class="products">
                                  {{for(var pro in it[prop].productList){ }}
										{{if(pro%2!=0)}}
										<tr class="product background_grey" >
												<td class="left" valign="top">
													<div class="productInfo ">{{= replaceNullAsStr(it[prop].productList[pro].product_name)}}&nbsp;(货号：<span>{{= replaceNullAsStr(it[prop].productList[pro].product_artno)}}</span>)</div>
													<span class="greycolor" >规格尺寸：{{= replaceNullAsStr(it[prop].productList[pro].product_size)}}&nbsp;备注：{{= replaceNullAsStr(it[prop].productList[pro].remark)}}</span>
												</td>
												<td class="price" valign="top">{{= replaceNullAsStr(Math.abs(it[prop].productList[pro].unit_price))}}</td>
												<td class="count " valign="top">{{= replaceNullAsStr(Math.abs(it[prop].productList[pro].number))}}</td>
												<td class="unit" valign="top">{{= replaceNullAsStr(it[prop].productList[pro].unit)}}</td>
										</tr>
										{{if(pro%2==0)}}
										<tr class="product" >
												<td class="left" valign="top">
													<div class="productInfo">{{= replaceNullAsStr(it[prop].productList[pro].product_name)}}&nbsp;(货号：<span>{{= replaceNullAsStr(it[prop].productList[pro].product_artno)}}</span>)</div>
													<span class="greycolor" >规格尺寸：{{= replaceNullAsStr(it[prop].productList[pro].product_size)}}&nbsp;备注：{{= replaceNullAsStr(it[prop].productList[pro].remark)}}</span>
												</td>
												<td class="price" valign="top">{{= replaceNullAsStr(Math.abs(it[prop].productList[pro].unit_price))}}</td>
												<td class="count " valign="top">{{= replaceNullAsStr(Math.abs(it[prop].productList[pro].number))}}</td>
												<td class="unit" valign="top">{{= replaceNullAsStr(it[prop].productList[pro].unit)}}</td>
										</tr>
                                    {{}}}
								</table>
							</div>
                         {{? it[prop].count >10}}
                               <div class="lookForMore mr10"><input style="display:none" value="{{= it[prop].purchaseOrder.pur_order_id}}"><a class="blue f_r" >查看更多︾</a></div>
                         {{??}}
                         {{?}}
								<div class="totalAmount">
									<span class="f_r ml50 mr10">总金额：<span class="amount b">{{= replaceNullAsStr(it[prop].purchaseOrder.sum_money).toString().replace(/\B(?=(?:\d{3})+\b)/g, ',')}}</span>&nbsp;元</span>
									<span class="f_r ">最早交期：<span class="earliestTime b">{{= replaceNullAsStr(it[prop].purchaseOrder.delivery_date).slice(0,10)}}</span></span>
								</div>
								<div class="orderStatus clearfix" >
                                   {{= returnStatusOrder(replaceNullAsStr(it[prop].purchaseOrder.order_status),it[prop].purchaseOrder.pur_order_id,it[prop].purchaseOrder.sup_delete_flag)}}			
							   </div>
	                    </div>
                      {{}}}
</script>
<script id="OrdersStatustmpl" type="text/x-dot-template">
{{? it.status==10 && it.delete_flag == 0}}
<span class="f_l left"><span class="greycolor">订单状态：</span><span class="status b">已提交</span></span>
									<div  class="right">
										<a class="memo mr20" onclick="orderMemo({{= it.order_id}})">备忘</a>
										<button class="confirm" onclick="acceptOrder({{= it.order_id}})">确认接单</button>
									</div>
{{?? it.status==40 && it.delete_flag == 0}}
<span class="f_l left"><span class="greycolor">订单状态：</span><span class="status b">对方提出终止申请</span><a class="blue ml10" onclick="stopDetail({{= it.order_id}})">查看申请</a></span>
									<div  class="right">
										<a class="memo mr20" onclick="orderMemo({{= it.order_id}})">备忘</a>
										<button class="confirm" onclick="stopAgree({{= it.order_id}},this)">同意终止</button>
                                    </div>
{{?? it.status==60 && it.delete_flag == 0}}
<span class="f_l left"><span class="greycolor">订单状态：</span><span class="status b">已取消</span><a class="blue ml10" onclick="queryReson({{= it.order_id}})">查看原因</a></span>
									<div  class="right">
										<a class="memo mr20" onclick="orderMemo({{= it.order_id}})">备忘</a>
										<button class="delete" onclick="deleteOrder({{= it.order_id}})">删除</button>
									</div>
{{?? it.status==20 && it.delete_flag == 0}}
<span class="f_l left"><span class="greycolor">订单状态：</span><span class="status b">已接单</span></span>
									<div  class="right">
										<a class="memo mr20" onclick="orderMemo({{= it.order_id}})">备忘</a>
									</div>
{{?? it.status==30 && it.delete_flag == 0}}
<span class="f_l left"><span class="greycolor">订单状态：</span><span class="status b">交货完成</span></span>
									<div  class="right">
										<a class="memo mr20" onclick="orderMemo({{= it.order_id}})">备忘</a>
									</div>
{{?? it.status==50 && it.delete_flag == 0}}
<span class="f_l left"><span class="greycolor">订单状态：</span><span class="status b">已终止</span><a class="blue ml10" onclick="stopDetail({{= it.order_id}})">查看原因</a></span>
									<div  class="right">
										<a class="memo mr20" onclick="orderMemo({{= it.order_id}})">备忘</a>
										<button class="delete" onclick="deleteOrder({{= it.order_id}})">删除</button>
									</div>
{{?? it.status==50 && it.delete_flag == 1}}
<span class="f_l left"><span class="greycolor">订单状态：</span><span class="status b">已终止</span><a class="blue ml10" onclick="stopDetail({{= it.order_id}})">查看原因</a></span>
									<div  class="right">
										<a class="memo mr20" onclick="orderMemo({{= it.order_id}})">备忘</a>
										<button class="confirm mr20" onClick="returnStatusV({{= it.order_id}})">还原订单</button>
										<button class="delete" onclick="deleteOrder({{= it.order_id}})">删除</button>
									</div>	
{{?? it.status==60 && it.delete_flag == 1}}
<span class="f_l left"><span class="greycolor">订单状态：</span><span class="status b">已取消</span><a class="blue ml10"  href="javascript:void(0)" onclick="queryReson({{= it.order_id}})">查看原因</a></span>
									<div  class="right">
										<a class="memo mr20" onclick="orderMemo({{= it.order_id}})">备忘</a>
										<button class="confirm mr20" onClick="returnStatusV({{= it.order_id}})">还原订单</button>
										<button class="delete" onclick="deleteOrder({{= it.order_id}})">删除</button>
									</div>	
{{?? it.status==30 && it.delete_flag == 1}}	
<span class="f_l left"><span class="greycolor">订单状态：</span><span class="status b">交货完成</span></span>
									<div  class="right">
										<a class="memo mr20" onclick="orderMemo({{= it.order_id}})">备忘</a>
										<button class="confirm mr20" onClick="returnStatusV({{= it.order_id}})">还原订单</button>
										<button class="delete" onclick="deleteOrder({{= it.order_id}})">删除</button>
									</div>						
{{?}}
</script>
<script id="text_order_co"  type="text/x-dot-template">
{{? it==6}}
                      <div id="recycleOrder" class="recycleBinTips mt30 posR">
							<span class="posA tips">
								<img src="/newresources/images/sale/tips.png">&nbsp;小贴士
							</span>
							<ol class="ml10">
								<li>1、已取消、已终止、已完成订单可删除，进入订单回收站</li>
								<li>2、进入回收站的订单无法再进行操作，如维权等，只有恢复订单才能继续操作</li>
								<li>3、在订单回收站中删除的订单，将无法再恢复</li>
							</ol>
						</div>
{{??}}
{{?}}
</script>
<script id="allProducttmpl"  type="text/x-dot-template">
{{for(var prop in it){}}
{{if(prop%2!=0)}}
								<tr class="product background_grey" >
									<td class="left" valign="top">
										<div class="productInfo ">{{= replaceNullAsStr(it[prop].product_name)}}&nbsp;(货号：<span>{{= replaceNullAsStr(it[prop].product_artno)}}</span>)</div>
										<span class="greycolor" >规格尺寸：{{= replaceNullAsStr(it[prop].product_size)}}&nbsp;备注：{{= replaceNullAsStr(it[prop].remark)}}</span>
									</td>                                    
									<td class="price" valign="top">{{= replaceNullAsStr(Math.abs(it[prop].unit_price))}}</td>
									<td class="count " valign="top">{{= replaceNullAsStr(Math.abs(it[prop].number))}}</td>
									<td class="unit" valign="top">{{= replaceNullAsStr(it[prop].unit)}}</td>
								</tr>	
{{if(prop%2==0)}} 
                                <tr class="product " >
									<td class="left" valign="top">
										<div class="productInfo ">{{= replaceNullAsStr(it[prop].product_name)}}&nbsp;(货号：<span>{{= replaceNullAsStr(it[prop].product_artno)}}</span>)</div>
										<span class="greycolor" >规格尺寸：{{= replaceNullAsStr(it[prop].product_size)}}&nbsp;备注：{{= replaceNullAsStr(it[prop].remark)}}</span>
									</td>
									<td class="price" valign="top">{{= replaceNullAsStr(Math.abs(it[prop].unit_price))}}</td>
									<td class="count " valign="top">{{= replaceNullAsStr(Math.abs(it[prop].number))}}</td>
									<td class="unit" valign="top">{{= replaceNullAsStr(it[prop].unit)}}</td>
								</tr>
{{}}}
</script>
<script  id="order_stop_sVo"  type="text/x-dot-template">
{{? it.orderEndRecord != null}}
                    <div class="ml10 mt20 clearfix">终止原因：<div class="f_r cancel">{{= replaceNullAsStr(it.orderEndRecord.end_description)}}</div></div>
{{?}}
{{? it.orderAttchedFile != null}}
					<div class="ml10 mt10 mb20 clearfix"><span>终止协议：</span><div class="f_r cancel"><a class="blue"  onClick = "LoadFileinfo({{= replaceNullAsStr(it.orderAttchedFile.order_attched_id)}})">{{= replaceNullAsStr(it.orderAttchedFile.order_attched_name)}}{{= replaceNullAsStr(it.orderAttchedFile.suffix_name)}}</a></div></div>
{{??}}
                    <div class="ml10 mt10 mb20 clearfix"><span>终止协议：</span><div class="f_r cancel"><a class="blue">无</a></div></div>
{{?}}
					<hr class="hr_grey">
                    <input id="hide_stop_sid" style="display:none" value="{{= replaceNullAsStr(it.orderEndRecord.order_end_id)}}">
					<div class="stopTip b">您是否同意<span id="company_stop"></span>的终止订单申请？</div>
</script>
<script  id="order_stop_cha"  type="text/x-dot-template">
{{? it.orderEndRecord != null}}
                   <div class="ml10 mt20 clearfix">终止原因：<div class="f_r cancel">{{= replaceNullAsStr(it.orderEndRecord.end_description)}}</div></div>
{{?}}
{{? it.orderAttchedFile != null}}
					<div class="ml10 mt10 mb20 clearfix"><span>终止协议：</span><div class="f_r cancel"><a class="blue" onClick = "LoadFileinfo({{= replaceNullAsStr(it.orderAttchedFile.order_attched_id)}})">{{= replaceNullAsStr(it.orderAttchedFile.order_attched_name)}}{{= replaceNullAsStr(it.orderAttchedFile.suffix_name)}}</a></div></div>
{{??}}                    
                    <div class="ml10 mt10 mb20 clearfix"><span>终止协议：</span><div class="f_r cancel"><a class="blue">无</a></div></div>
{{?}}
</script>
	</body>
</html>