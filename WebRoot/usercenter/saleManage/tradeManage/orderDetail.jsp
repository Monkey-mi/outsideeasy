<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>销售订单详情</title>
	<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
	<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
	<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css" />
	<link href="/newresources/css/sale.css" rel="stylesheet" type="text/css" />
	<link href="/newresources/css/task.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="bg_grey">
		<div id="top"></div>
		<!--中间-->
		<div class="midd_wrap bg_white">
			<div class="pic_status ml10 mt10"></div>
			<div id="orderDetail">
				<div class="orderDetailBar ml10">
					<span class="b ml10" style="font-size:14px;">销售订单编号：<span class="saleOrderNumber"></span></span>
					<ul class="tab">
						<li class="curr" onClick="currtab('#orderDetail',0)">订单详情<span class="split">|</span></li>
						<li onClick="currtab('#orderDetail',1)">交期通知<span class="split">|</span></li>
						<li onClick="currtab('#orderDetail',2)">交流合作</li>
					</ul>
				</div>
				<!--订单详情开始  -->
				<div class="orderInfo tabcon ml10 mb30" style="display:block;">
					<div class="statusInfo clearfix">
						<div class="left f_l">
							<div class="left_top" id="status_button">
								<span class="grey_color">当前订单状态：</span><span class="b currentState"></span>																																
							</div>
							<div id = "order_he_info" class="left_bottom">
								
							</div>
						</div>
						<div class="right f_r"><span class="grey_color">
							您可以添加</span><a class="bluecolor" onclick="orderMemo()">备忘</a><span class="grey_color ml4">(备忘仅自己可见)</span>
							<div id="order_remark_info"></div>
						</div>
					</div>
					<div class="orderDetailBar mt10 "><span class="ml10" style="font-size:14px;font-weight:bold;">订单详情</span></div>
					<div class="info  ">
						<div class="saleAndPurchase clearfix">
							
						</div>
						<div id="detail" class="detail ml10 mb10">
							<div class="bar2">
								<ul class="tab2 b mt10">
									<li class="curr t1" onClick="currtab2('#detail',0)">产品明细</li>
									<li onClick="currtab2('#detail',1)" >采购要求</li>
									<li onClick="currtab2('#detail',2)">文件</li>
									<li onClick="currtab2('#detail',3)">合同</li>
								</ul>
							</div>
							<!--产品明细开始  -->
							<div class="productInfo tabcon2" style="display:block;">
								<div class="mt20 clearfix">
									<span class="f_l ml10">币种：人民币</span>
									<span class="f_r ml50 mr10">产品总金额：<span class="amount b"></span>&nbsp;元</span>
									<span class="f_r ">最早交期：<span class="earliestTime b"></span></span>
								</div>
								<table class="product_info_table mt20">
									<thead>
										<tr class="productInfo_head" >
											<th style="width:auto;">产品信息</th>
											<th style="width:70px;">单价</th>
											<th style="width:70px;">订单数量</th>
											<th style="width:70px;">单位</th>
											<th style="width:70px;">金额</th>
											<th style="width:90px;">交期</th>
											<th style="width:60px;">到货数量</th>
											<th style="width:60px;">待处理</th>
											<th style="width:60px;">已退</th>
											<th style="width:60px;">送货未完</th>
											<th style="width:60px;">入库数量</th>
										</tr>
									</thead>
									<tbody class="productInfo_body mt10">
									</tbody>
								</table>
							</div>
							<!--产品明细结束  -->
							<!-- 采购要求开始 -->
							<div class="deliveryRequeirment tabcon2">
								<div  class="top">
									<div  class="grey_color b mt20">合同条款</div>
									<pre id="contract_terms" style="white-space: pre-wrap;"></pre> 
								</div>
								<div  class="bottom">
									<div class="grey_color b">采购要求</div>
									<pre id="order_re" style="white-space: pre-wrap;"></pre> 
								</div>
							</div>
							<!--采购要求结束  -->
							<!--文件开始  -->
							<div class="fileList tabcon2">
								<div class="mt20 file">
									<div class="grey_color b">文件</div>
									<ul class="mt10 ml10" id="other_file">
										
									</ul>
								</div>
								<div class="mt20 picture clearfix">
									<div class="grey_color b">图片</div>
									<ul class="mt10 ml10" id="img_file">
										
									</ul>
								</div>
								<div class="mt20 vedio">
									<div class="grey_color b">视频</div>
									<ul class="mt10 ml10" id="video_file">
										
									</ul>
								</div>
							</div>
							<!--文件结束  -->
							<!--合同开始  -->
							<div class="contractList tabcon2">
								<ul class="mt10 clearfix" id="agreementFile">
									
									
								</ul>
							</div>
							<!--合同结束  -->
						</div>
					</div>
				</div>
				<!--订单详情结束  -->
				<!--发货通知开始  -->
				<div class="tabcon">
					<div id = "deliverNotify_s" class="deliveryNotify_content ml10 mt10">
						<div class="deliveryNotify_head ">
							<div class="con1 f_l">产品信息</div>
							<div class="con4 f_l">数量</div>
							<div class="con4 f_l">单位</div>
							<div class="con_2 f_l">通知交期</div>
							<div class="con_2 f_l">确认交期</div>
							<div class="con3 f_l">送达地址</div>
						</div>
					</div>
				 <div id="paginationcom" class="quotes clearfix"></div>
				</div>
				<!--发货通知结束  -->
				<!--交流合作开始  -->
				<div class="communicationAndCooperation tabcon ml10 mr10">
					<textarea rows="2" cols="5" id="message_text_box" class="message_text_box"></textarea>
					<div id="message_show_block" class="message_show_block"></div>
				</div>
				<!--交流合作结束  -->
			</div>
			<!--弹框开始  -->
			<div class="mask" id="pop_mask"></div>
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
						<input id="input_uploadfile" name="file" type="file" onchange="showviewtextfrist()" />
					</div>
					<div class="ml10 mt10 uploadFileName" id="input_filename" ></div>
				</div>
				<button class="stop_btn mt20" onClick="acceptOrderSave()" >确定</button>
				<button class="cancel_btn mt20" onClick="cancelAcceptOrder()">取消</button>
			</div>
			<!--确认接单结束  -->
			<!--确认终止开始  -->
			<div id="stopAgree" class="pop_layer_wrap">
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
			<!--添加备忘开始  -->
			<div id="orderMemo" class="pop_layer_wrap">
				<div class="title_wrap" style="height:30px; line-height:30px;">
					订单备忘
					<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('orderMemo')" title="关闭窗口">X</a>
				</div>
				<div class="pop_content_wrap">
					<textarea class="memo_content mt10" id="content_remark" onkeyup="countWords()"></textarea>
					<div class="ml10 mt10">还可以输入<span class="redcolor" id="words">150</span>字</div>
				</div>
				<div class="ml120">
					<button class="stop_btn mt10" onClick="saveRemarkinfo(this)">确定</button>
					<button class="cancel_btn mt10"  onClick="pop_div_close('orderMemo')">取消</button>
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
		<script type="text/javascript" src="/usercenter/saleManage/tradeManage/js/orderDetail.js"></script>
	<script id="Ordertmpl"  type="text/x-dot-template">
							<div class="left f_l">
								<div class="left_top">
									<span class="b">采购方信息</span>
									<div class="mt10 grey_color"><label>采购方：</label><span>{{= replaceNullAsStr(it.pur_cpyname_cn)}}</span></div>
									<div class="grey_color"><label>建单人：</label><span>{{= replaceNullAsStr(it.pur_creator_name)}}</span></div>
									<div class="grey_color"><label>开票信息：</label><span>{{= replaceNullAsStr(it.pur_invoice_type)}}&nbsp;{{= replaceNullAsStr(it.pur_invoice_title)}}</span></div>
									<div class="grey_color"><label class="f_l">收货地址：</label><div class="f_l "><span>{{= replaceNullAsStr(it.mergerName)}}{{= replaceNullAsStr(it.pur_delivery_address)}}</span><br><span>{{= replaceNullAsStr(it.pur_delivery_contact)}}&nbsp;{{= replaceNullAsStr(it.pur_delivery_contact_phone)}}</span></div></div>
								</div>
								<div class="left_bottom ">
									<span class="b">订单信息</span>
									<div class="mt10 grey_color"><label>订单编号：</label><span>{{= replaceNullAsStr(it.order_bh)}}</span></div>
									<div class="grey_color"><label>合同编号：</label><span style="display:inline;">{{= replaceNullAsStr(it.agreement_bh)}}</span>&nbsp;<a class="bluecolor"  onClick="currtab2('#detail',3)">查看详情</a></div>
									<div class="grey_color"><label>订单备注：</label><span>{{= replaceNullAsStr(it.order_remark)}}</span></div>
								</div>
							</div>
							<div class="right f_r">
								<span class="b">供应商信息</span>
								<div class="mt10 grey_color"><label>供应商：</label><span>{{= replaceNullAsStr(it.sup_cpyname_cn)}}</span></div>
								<div class="grey_color"><label>联系人：</label><span>{{= replaceNullAsStr(it.sup_contact)}}&nbsp;{{= replaceNullAsStr(it.sup_contact_phone)}}</span></div>
								<div class="grey_color"><label class="f_l">联系地址：</label><span>{{= replaceNullAsStr(it.sup_contact_address)}}</span></div>
							</div>
</script>
<script id="orderheTmpl" type="text/x-dot-template">
{{? it==10}}
请您尽快完成合同上传回签并确认订单 <a class="bluecolor" onClick="currtab2('#detail',3)">查看合同</a>
<div class="mt10"><span class="grey_color">如有疑问可给对方</span><a class="bluecolor" onClick="currtab('#orderDetail',2)">留言</a></div>	
{{?? it==20}}
<div class="mt10"><span class="grey_color">如有疑问可给对方</span><a class="bluecolor" onClick="currtab('#orderDetail',2)">留言</a></div>	
{{?? it==30}}
<div class="mt10"><span class="grey_color">如有疑问可给对方</span><a class="bluecolor" onClick="currtab('#orderDetail',2)">留言</a></div>	
{{?? it==40}}
<div class="mt10"><span class="grey_color">如有疑问可给对方</span><a class="bluecolor" onClick="currtab('#orderDetail',2)">留言</a></div>	
{{?? it==50}}
{{?? it==60}}
{{?}}
</script>
<script id="productTmpl" type="text/x-dot-template">
{{ for(var prop in it){}}
{{?(prop%2!=0)}}	
								<tr class="product background_grey">
                                     <td valign="top">
										<div>{{= replaceNullAsStr(it[prop].product_name)}}&nbsp;(货号：<span>{{= replaceNullAsStr(it[prop].product_artno)}}</span>)</div>
										<span class="greycolor">规格尺寸：{{= replaceNullAsStr(it[prop].product_size)}}&nbsp;备注:{{= replaceNullAsStr(it[prop].remark)}}</span>
									</td>
									<td  valign="top" class="center">{{= replaceNullAsStr(Math.abs(it[prop].unit_price))}}</td>
									<td  valign="top" class="center">{{= replaceNullAsStr(Math.abs(it[prop].number))}}</td>
									<td  valign="top" class="center">{{= replaceNullAsStr(it[prop].unit)}}</td>
									<td  valign="top" class="center">{{= replaceNullAsStr(Math.abs(it[prop].money))}}</td>
									<td  valign="top" class="deliveryDate">{{= replaceNullAsStr(it[prop].delivery_date).slice(0,10)}}</td>
									<td  valign="top">{{= replaceNullAsStr(Math.abs(it[prop].delivery_num))}}</td>
                                    <td valign="top">{{= replaceNullAsStr(Math.abs(it[prop].stay_detail_num))}}</td>                                    
                                    <td valign="top">{{= replaceNullAsStr(Math.abs(it[prop].retired_back_num))}}</td>
									<td  valign="top">{{= replaceNullAsStr(Math.abs(it[prop].no_delivery_num))}}</td>
									<td  valign="top">{{= replaceNullAsStr(Math.abs(it[prop].storage_num))}}</td>
								</tr>
{{??(prop%2==0)}}
								<tr class="product">
                                     <td  valign="top" >
										<div>{{= replaceNullAsStr(it[prop].product_name)}}&nbsp;(货号：<span>{{= replaceNullAsStr(it[prop].product_artno)}}</span>)</div>
										<span class="greycolor">规格尺寸：{{= replaceNullAsStr(it[prop].product_size)}}&nbsp;备注:{{= replaceNullAsStr(it[prop].remark)}}</span>
									</td>
									<td  valign="top" class="center">{{= replaceNullAsStr(Math.abs(it[prop].unit_price))}}</td>
									<td  valign="top" class="center">{{= replaceNullAsStr(Math.abs(it[prop].number))}}</td>
									<td  valign="top" class="center">{{= replaceNullAsStr(it[prop].unit)}}</td>
									<td  valign="top" class="center">{{= replaceNullAsStr(Math.abs(it[prop].money))}}</td>
									<td  valign="top" class="deliveryDate">{{= replaceNullAsStr(it[prop].delivery_date).slice(0,10)}}</td>
									<td  valign="top">{{= replaceNullAsStr(Math.abs(it[prop].delivery_num))}}</td>
                                    <td valign="top">{{= replaceNullAsStr(Math.abs(it[prop].stay_detail_num))}}</td>                                    
                                    <td valign="top">{{= replaceNullAsStr(Math.abs(it[prop].retired_back_num))}}</td>
									<td  valign="top">{{= replaceNullAsStr(Math.abs(it[prop].no_delivery_num))}}</td>
									<td  valign="top">{{= replaceNullAsStr(Math.abs(it[prop].storage_num))}}</td>
								</tr>
{{?}}
{{}}}
</script>
<script id="otherTmpl" type="text/x-dot-template">
{{? it.status==1}}
                                        <li><label class="abandon left">{{= replaceNullAsStr(it.order_attched_name)}}{{= replaceNullAsStr(it.suffix_name)}}<span class="ml8 abandon">{{= replaceNullAsStr(it.create_dt)}}</span></label><span class="abandon right">{{= replaceNullAsStr(it.order_attched_remark)}}</span></li>
{{?? it.status==0}}
										<li><label class="left"><a class="blue" onclick="LoadFileinfoOther({{= it.order_attched_id}})">{{= replaceNullAsStr(it.order_attched_name)}}{{= replaceNullAsStr(it.suffix_name)}}</a><span class="ml8">{{= replaceNullAsStr(it.create_dt)}}</span></label><span class="right">{{= replaceNullAsStr(it.order_attched_remark)}}</span></li>
{{?}}							
</script>
<script id="imageTmpl" type="text/x-dot-template">
{{? it.status==1}}
                                        <li class="f_l">
											<div class="posR abandonCon">
												<img src="{{= retutnFile(replaceNullAsStr(it.mogodb_id))}}" class="picFrame">
												<div class="b_bg"></div>
												<img class="invalid posA" src="/newresources/images/tasks/invalid.png">
											</div>
											<div class="abandon">{{= replaceNullAsStr(it.order_attched_name)}}<br><span class="abandon grey_color">{{= replaceNullAsStr(it.create_dt)}}</span></div></li>																		
{{?? it.status==0}}
									    <li class="f_l ml10"><img onclick="orderImgView({{= it.order_attched_id}})" src="{{= retutnFile(replaceNullAsStr(it.mogodb_id))}}" class="picFrame"><div>{{= replaceNullAsStr(it.order_attched_name)}}<br><span class="grey_color">{{= replaceNullAsStr(it.create_dt)}}</span></div></li>
{{?}}							
</script>
<script id="videoTmpl" type="text/x-dot-template">
{{? it.status==1}}
                                        <li class="f_l">
											<div class="posR abandonCon" >
												<a class="video_a" onclick=""></a>
												<img src="{{= retutnFile(replaceNullAsStr(it.mogodb_id))}}" class="picFrame">
												<div class="b_bg"></div>
												<img class="invalid posA" src="/newresources/images/tasks/invalid.png">
											</div>
											<div class="abandon">{{= replaceNullAsStr(it.order_attched_name)}}<br><span class="abandon grey_color">{{= replaceNullAsStr(it.create_dt)}}</span></div>
										</li>																				
{{?? it.status==0}}
										<li class="f_l ml10">
											<div class="posR" >
												<a class="video_a" onclick="orderVideoView({{= it.order_attched_id}})"></a>
												<img src="{{= retutnFile(replaceNullAsStr(it.mogodb_id))}}" class="picFrame">
											</div>
											<div>{{= replaceNullAsStr(it.order_attched_name)}}<br><span class="grey_color">{{= replaceNullAsStr(it.create_dt)}}</span></div>
										</li>
{{?}}							
</script>
<script id="agreementTmpl" type="text/x-dot-template">
{{for(var prop in it){}}
{{? it[prop].agreement_status==1}}
                                     <li class="f_l posR ml10" >
{{? prop==(it.length-1)}}
										<img src="/newresources/images/sale/signBack.png" class="signBackLogo">
{{?}}
										<div class="contractName">供方合同</div>
										<div class="time">
											<label class="f_l">时间：</label><div class="f_l con">{{= replaceNullAsStr(it[prop].create_dt).slice(0,10)}}<br>{{= replaceNullAsStr(it[prop].create_dt).slice(11)}}</div>
										</div>
										<div class="number">
											<label>编号：</label><span>{{= replaceNullAsStr(it[prop].agreement_bh)}}</span>
										</div>
										<div class="mt10"><a class="blue f_r" onclick="LoadFileinfo({{= it[prop].agreement_id}})">下载</a>
{{? it[prop].suffix_name == ".pdf" || it[prop].suffix_name == ".PDF"}}
<a class="blue f_r mr10" onclick="LoadPrit({{= it[prop].agreement_id}})">打印</a>
{{?}}
</div>
									</li>
{{?? it[prop].agreement_status==0}}
									<li class="f_l" >
										<div class="contractName">采购方合同</div>
										<div class="time">
											<label class="f_l">时间：</label><div class="f_l con">{{= replaceNullAsStr(it[prop].create_dt).slice(0,10)}}<br>{{= replaceNullAsStr(it[prop].create_dt).slice(11)}}</div>
										</div>
										<div class="number">
											<label>编号：</label><span>{{= replaceNullAsStr(it[prop].agreement_bh)}}</span>
										</div>
										<div class="mt10"><a class="blue f_r" onclick="LoadFileinfo({{= it[prop].agreement_id}})">下载</a>
{{? it[prop].suffix_name == ".pdf" || it[prop].suffix_name == ".PDF"}}
<a class="blue f_r mr10" onclick="LoadPrit({{= it[prop].agreement_id}})">打印</a></div>
{{?}}
									</li>
{{?}}
{{}}}
</script>
<script id="agreementVTmpl" type="text/x-dot-template">
                                   <li class="f_l ml20 posR" >
										<img src="/newresources/images/sale/uploadContract.png">
										<input class="uploadfile_input"  id= "uploadfile_app" name="file" type="file"  onchange="showviewtext()"/>
								    </li>
</script>
<script id="statusTmpl" type="text/x-dot-template">
{{? it.order_status==10}}
				<div class="clearfix">
					<div class="f_l state1 b curr">已提交</div>
					<div class="f_l state2 b  ">已接单</div>
					<div class="f_l state2 b ">交货完成</div>
				</div>
				<img src="/newresources/images/supplier/state3-1.png" class="state">
				<div class="mt10">
					<span class="state1">{{= replaceNullAsStr(it.create_dt)}}</span>
				</div>
{{?? it.order_status==20}}
				<div class="clearfix">
					<div class="f_l state1 b ">已提交</div>
					<div class="f_l state2 b curr ">已接单</div>
					<div class="f_l state2 b ">交货完成</div>
				</div>
				<img src="/newresources/images/supplier/state3-2.png" class="state">
				<div class="mt10">
					<span class="state1">{{= replaceNullAsStr(it.create_dt)}}</span>
					<span class="state2">{{= replaceNullAsStr(it.r_opreate_dt)}}</span>
				</div>
{{?? it.order_status==30}}
				<div class="clearfix">
					<div class="f_l state1 b ">已提交</div>
					<div class="f_l state2 b ">已接单</div>
					<div class="f_l state2 b curr">交货完成</div>
				</div>
 				<img src="/newresources/images/supplier/state3-3.png" class="state">
				<div class="mt10">
					<span class="state1">{{= replaceNullAsStr(it.create_dt)}}</span>
					<span class="state2">{{= replaceNullAsStr(it.r_opreate_dt)}}</span>	
					<span class="state2">{{= replaceNullAsStr(it.e_opreate_dt)}}</span>
				</div>
{{?? it.order_status==40}}
 				<div class="clearfix">
					<div class="f_l state1 b ">已提交</div>
					<div class="f_l state5 b ">已接单</div>
					<div class="f_l state5 b curr">待确认终止</div>
					<div class="f_l state5 b ">已终止</div>
				</div>
 				<img src="/newresources/images/supplier/state4-3.png" class="state">
				<div class="mt10">
					<span class="state1">{{= replaceNullAsStr(it.create_dt)}}</span>
					<span  class="state5">{{= replaceNullAsStr(it.r_opreate_dt)}}</span>
					<span class="state5">{{= replaceNullAsStr(it.end_create_dt)}}</span>
				</div>
{{?? it.order_status==50}}
 				<div class="clearfix">
					<div class="f_l state1 b ">已提交</div>
					<div class="f_l state5 b ">已接单</div>
					<div class="f_l state5 b ">待确认终止</div>
					<div class="f_l state5 b curr">已终止</div>
				</div>
 				<img src="/newresources/images/supplier/state4-4.png" class="state">
				<div class="mt10">
					<span class="state1" >{{= replaceNullAsStr(it.create_dt)}}</span>
					<span class="state5">{{= replaceNullAsStr(it.r_opreate_dt)}}</span>
                    <span class="state5" >{{= replaceNullAsStr(it.end_create_dt)}}</span>
					<span class="state5">{{= replaceNullAsStr(it.confirm_dt)}}</span>
				</div>
{{?? it.order_status==60}}
 				<div class="clearfix">
					<div class="f_l state1 b ">已提交</div>
					<div class="f_l state4 b curr ">已取消</div>
				</div>
 				<img src="/newresources/images/supplier/state2-2.png" class="state">
				<div class="mt10">
					<span  class="state1" >{{= replaceNullAsStr(it.create_dt)}}</span>
					<span class="state4">{{= replaceNullAsStr(it.cancel_create_dt)}}</span>
				</div>
{{??}}
{{?}}
</script>
<script id="deliveryTmpl" type="text/x-dot-template">
{{for(var prop in it){}}
<div class="deliveryNotify_body_tips mt10">
							<div class="f_l ml10">通知时间：<span class="fs16_bold">{{= replaceNullAsStr(it[prop].orderDeliveryNotice.notice_dt)}}</span></div>
							<div class="f_l ml10">通知编号：<span>{{= replaceNullAsStr(it[prop].orderDeliveryNotice.delivery_notice_bh)}}</span></div>
							<div class="f_r mr10">通知状态：<span class="fs16_bold">{{= returnAccounts(replaceNullAsStr(it[prop].orderDeliveryNotice.notice_status))}}</span></div>
						</div>
						<div class="deliveryNotify_body">
                            <table class="products ml10 mr10">
{{for(var pro in it[prop].orderDeliveryVos){}}
{{? pro%2!=0}}
								<tr class="product background_grey">
									<td class="left" valign="top">
										<div class="con1">{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].product_name)}}&nbsp;(货号：<span>{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].product_artno)}}</span>)</div>
										<span class="greycolor">规格尺寸：{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].product_size)}}&nbsp;{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].remark)}}</span>
									</td>										
									<td class="con4" valign="top">{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].number)}}</td>
									<td class="con4" valign="top">{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].unit)}}</td>
									<td class="con_2" valign="top">{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].notice_delivery_time).slice(0,10)}}</td>
{{? it[prop].orderDeliveryVos[pro].notice_delivery_time == it[prop].orderDeliveryVos[pro].confirm_delivery_time}}
									<td class="con_2" valign="top">{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].confirm_delivery_time).slice(0,10)}}</td>
{{??}}	
                                    <td class="con_2 changed" valign="top">{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].confirm_delivery_time).slice(0,10)}}</td>
{{?}}	
									<td class="con3 posR" valign="top">{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].delivery_address)}}<div class="address posA hide">{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].delivery_address)}}</div></td>
								</tr>
{{?? prop%2==0}}
								
								<tr class="product">
									<td class="left" valign="top">
										<div class="con1">{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].product_name)}}&nbsp;(货号：<span>{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].product_artno)}}</span>)</div>
										<span class="greycolor">规格尺寸：{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].product_size)}}&nbsp;{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].remark)}}</span>
									</td>									
									<td class="con4" valign="top">{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].number)}}</td>
									<td class="con4" valign="top">{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].unit)}}</td>
									<td class="con_2" valign="top">{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].notice_delivery_time).slice(0,10)}}</td>
{{? it[prop].orderDeliveryVos[pro].notice_delivery_time == it[prop].orderDeliveryVos[pro].confirm_delivery_time}}									
                                    <td class="con_2" valign="top">{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].confirm_delivery_time).slice(0,10)}}</td>
{{??}}	
                                    <td class="con_2 changed" valign="top">{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].confirm_delivery_time).slice(0,10)}}</td>
{{?}}								
                                    <td class="con3 posR" valign="top">{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].delivery_address)}}<div class="address posA hide">{{= replaceNullAsStr(it[prop].orderDeliveryVos[pro].delivery_address)}}</div></td>
								</tr>
{{??}}
{{?}}
{{}}}																			
							</table>
{{? it[prop].count >10}}
							<div class="lookForMore mr10 clearfix"><input style="display:none" value="{{= it[prop].orderDeliveryNotice.delivery_notice_id}}"><a class="blue f_r" >查看更多︾</a></div>
{{?}} 
                                                    </div>
{{}}}
</script>
<script id="allProducttmpl"  type="text/x-dot-template">
{{for(var prop in it){}}
{{? prop%2!=0}}
								<tr class="product background_grey">
									<td class="left"  valign="top">
										<div class="con1">{{= replaceNullAsStr(it[prop].product_name)}}&nbsp;(货号：<span>{{= replaceNullAsStr(it[prop].product_artno)}}</span>)</div>
										<span class="greycolor">规格尺寸：{{= replaceNullAsStr(it[prop].product_size)}}&nbsp;{{= replaceNullAsStr(it[prop].remark)}}</span>
									</td>
									<td class="con4 "  valign="top">{{= replaceNullAsStr(it[prop].number)}}</td>
									<td class="con4 "  valign="top">{{= replaceNullAsStr(it[prop].unit)}}</td>

									<td class="con_2"  valign="top">{{= replaceNullAsStr(it[prop].notice_delivery_time).slice(0,10)}}</td>
{{? it[prop].notice_delivery_time==it[prop].confirm_delivery_time}}	
								    <td class="con_2 "  valign="top">{{= replaceNullAsStr(it[prop].confirm_delivery_time).slice(0,10)}}</td>
{{??}}	
                                    <td class="con_2 changed"  valign="top">{{= replaceNullAsStr(it[prop].confirm_delivery_time).slice(0,10)}}</td>	
{{?}}						
                                   	<td class="con3 posR"  valign="top">{{= replaceNullAsStr(it[prop].delivery_address)}}<div class="address posA hide">{{= replaceNullAsStr(it[prop].delivery_address)}}</div></td>
								</tr>
{{?? prop%2==0}}
								<tr class="product ">
									<td class="left"  valign="top">
										<div class="con1">{{= replaceNullAsStr(it[prop].product_name)}}&nbsp;(货号：<span>{{= replaceNullAsStr(it[prop].product_artno)}}</span>)</div>
										<span class="greycolor">规格尺寸：{{= replaceNullAsStr(it[prop].product_size)}}&nbsp;{{= replaceNullAsStr(it[prop].remark)}}</span>
									</td>
									<td class="con4 "  valign="top">{{= replaceNullAsStr(it[prop].number)}}</td>
									<td class="con4 "  valign="top">{{= replaceNullAsStr(it[prop].unit)}}</td>
									<td class="con_2"  valign="top">{{= replaceNullAsStr(it[prop].notice_delivery_time).slice(0,10)}}</td>
{{? it[prop].notice_delivery_time==it[prop].confirm_delivery_time}}	
								    <td class="con_2 "  valign="top">{{= replaceNullAsStr(it[prop].confirm_delivery_time).slice(0,10)}}</td>
{{??}}	
                                    <td class="con_2 changed"  valign="top">{{= replaceNullAsStr(it[prop].confirm_delivery_time).slice(0,10)}}</td>	
{{?}}
									<td class="con3 posR"  valign="top">{{= replaceNullAsStr(it[prop].delivery_address)}}<div class="address posA hide">{{= replaceNullAsStr(it[prop].delivery_address)}}</div></td>
								</tr>
{{??}}
{{?}}
{{}}}
</script>
<script id="buttonTmpl" type="text/x-dot-template">
{{? it==10}}
<div class="confirm " onclick="acceptOrder()">确认接单</div>
{{?? it==20}}
{{?? it==30}}
{{?? it==40}}
<div class="confirm " onclick="stopAgree()">同意终止</div>
{{?}}
</script>
<script id="cancelDetailsTmpl" type="text/x-dot-template">
{{? it.orderCancelRecord.cancel_reason==1}}
                               <div>
									<span class="grey_color" style="vertical-align:top;">取消原因：</span>
									<span class="grey_color" style="display:inline-block;max-width:310px;height:auto;">
									订单信息变更
{{? replaceNullAsStr(it.orderCancelRecord.cancel_description)!=""}}
										<a onclick="showCancel(this)" class="blue">查看说明∨</a><a onclick="hideCancel(this)" class="blue hide">收起说明∧</a>
{{?}}
									</span> 
									<div class="grey_color hide" style="width:310px;height:auto;margin-left:62px;">{{= it.orderCancelRecord.cancel_description}}</div>
								</div> 
{{?? it.orderCancelRecord.cancel_reason==2}}
                               <div>
									<span class="grey_color" style="vertical-align:top;">取消原因：</span>
									<span class="grey_color" style="display:inline-block;max-width:310px;height:auto;">
									取消采购计划
{{? replaceNullAsStr(it.orderCancelRecord.cancel_description)!=""}}
										<a onclick="showCancel(this)" class="blue">查看说明∨</a><a onclick="hideCancel(this)" class="blue hide">收起说明∧</a>
{{?}}
									</span> 
									<div class="grey_color hide" style="width:310px;height:auto;margin-left:62px;">{{= it.orderCancelRecord.cancel_description}}</div>
								</div> 
{{?? it.orderCancelRecord.cancel_reason==3}}
                               <div>
									<span class="grey_color" style="vertical-align:top;">取消原因：</span>
									<span class="grey_color" style="display:inline-block;max-width:310px;height:auto;">
									其他原因
{{? replaceNullAsStr(it.orderCancelRecord.cancel_description)!=""}}
										<a onclick="showCancel(this)" class="blue">查看说明∨</a><a onclick="hideCancel(this)" class="blue hide">收起说明∧</a>
{{?}}
									</span> 
									<div class="grey_color hide" style="width:310px;height:auto;margin-left:62px;">{{= it.orderCancelRecord.cancel_description}}</div>
								</div> 
{{?}}
</script>
<script id="stopDetailsTmpl"  type="text/x-dot-template">
                               <div class="mt10">
								    <span class="grey_color" style="vertical-align:top;">终止说明：</span>
									<span class="grey_color" style="display:inline-block;max-width:310px;height:auto;">
										{{= it.orderStopDetails.orderEndRecord.end_description}}
									</span>   
{{? it.orderStopDetails.orderAttchedFile != null}}
									<div class="mt10">
										<span class="grey_color" style="vertical-align:top;">终止协议：</span>
										<span class="grey_color" style="display:inline-block;max-width:310px;height:auto;">
											<a onclick = "LoadFileinfo_stop({{= it.orderStopDetails.orderAttchedFile.order_attched_id }})" class="blue">{{= it.orderStopDetails.orderAttchedFile.order_attched_name}}{{= it.orderStopDetails.orderAttchedFile.suffix_name}}</a>
										</span>
									</div>
{{?}}
							                 
								</div>
</script>
<script  id="order_stop_sVo"  type="text/x-dot-template">
{{? it.orderEndRecord != null}}
                    <div class="ml10 mt20 clearfix">终止原因：<div class="f_r cancel">{{= replaceNullAsStr(it.orderEndRecord.end_description)}}</div></div>
{{?}}
{{? it.orderAttchedFile != null}}
					<div class="ml10 mt10 mb20 clearfix"><span>终止协议：</span><div class="f_r cancel"><a class="blue"  onClick = "LoadFileinfo_stop({{= replaceNullAsStr(it.orderAttchedFile.order_attched_id)}})">{{= replaceNullAsStr(it.orderAttchedFile.order_attched_name)}}{{= replaceNullAsStr(it.orderAttchedFile.suffix_name)}}</a></div></div>
{{??}}
                    <div class="ml10 mt10 mb20 clearfix"><span>终止协议：</span><div class="f_r cancel"><a class="blue">无</a></div></div>
{{?}}
					<hr class="hr_grey">
                    <input id="hide_stop_sid" style="display:none" value="{{= replaceNullAsStr(it.orderEndRecord.order_end_id)}}">
					<div class="stopTip b">您是否同意<span id="company_stop"></span>的终止订单申请？</div>
</script>
</body>
</html>