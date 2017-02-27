<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>准入申请页面</title>
<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/sale.css" rel="stylesheet" type="text/css" />
<link href="/vip/resources/css/vipsale.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/trade.css" rel="stylesheet" type="text/css" />
<link href="/newresources/css/jquery.treeview.css" rel="stylesheet" type="text/css" />
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
		<p class="sale_right_title"><span>准入申请</span>
			<a class="f_r mr10 blue mt10" href="/AccessApplicationCtrl/applyAccessList.htm">返回</a>
		</p>
		<div id="step1" class="step_wrap ml200" style="display:block; margin-top:0px;">
		<div class="ml10 mr10">
			<p id="table_title" class="sale_title_1"></p>
			<div class="access_audit_wrap pl10">
				<p id="tip_message"></p>
				<!-- <p class="mt10"><span class="mr30">2016-6-28 08:50:36</span><span>等待审核</span></p>
				<p>审核意见：审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见</p> -->
			</div>
			<div class="prod_class_wrap posR clearfix" style="padding:10px 0px;">
				<div id="selectCategory" class="ml10 addSupplySort f_l" ><span class="no_empty" style="color:red;font-weight:bold;">*</span>选择供应品类<span class="b ml8" style="font-size:16px;">+</span></div>
				<span class="hide f_l ml10" style="width:60px;color:#777;line-height:30px;" id="categoryTitle">供应品类：</span>
				<div id="supplyCategory" class="supplyCategory f_l ml10">
					<!-- <span>供应品类</span>
					<span>供应品类</span>
					<span>供应品类</span> -->
				</div>
				<div class="addSupplySort_main posA hide bg_white">
				<ul id="sortTree" class="sorttree sortList" >
				<!-- <li><span class="sort">分类名称1<input type="checkbox" class="ml10"/></span>
				<ul><li><span class="sort">分类名称1.1<input type="checkbox" class="ml10"/></span><ul><li><span class="sort">分类名称1.2<input type="checkbox" class="ml10"/></span></li></ul></li></ul></li>
				<li><span class="sort">分类名称2<input type="checkbox" class="ml10"/></span><ul><li><span class="sort">分类名称2.1<input type="checkbox" class="ml10"/></span><ul><li><span class="sort">分类名称2.2<input type="checkbox" class="ml10"/></span></li></ul></li></ul></li>
				<li><span class="sort">分类名称3<input type="checkbox" class="ml10" /></span><ul><li><span class="sort">分类名称3.1<input type="checkbox" class="ml10"/></span></li></ul></li>
				<li><span class="sort">分类名称4<input type="checkbox" class="ml10"/></span></li>
				<li><span class="sort">分类名称5<input type="checkbox" class="ml10"/></span></li> -->
				</ul>
				<button class="sortListSave f_r mr10" onclick="closeSortList()">关闭</button>
				</div>
			</div>
			
			<div id="accessApplyInfo" class="accessApplyInfo">
				<div class="right_position_wrap" >
					<input id="syncSave" type="checkbox" checked="checked" />提交后同步保存至企业信息
				</div>
				<ul class="tab">
					<li class="curr" onClick="currtab('#accessApplyInfo',0)">基本信息<span class="split">|</span></li>  
					<li onClick="currtab('#accessApplyInfo',1)">详细信息<span class="split">|</span></li>
					<li onClick="currtab('#accessApplyInfo',2)">规模能力<span class="split">|</span></li>
					<li onClick="currtab('#accessApplyInfo',3)">交易信息</li>
				</ul>
				<!--基本信息开始-->
				<div id="base_info" class="ml15 tabcon" style="display:block;">
					<p id="updateCertification" class="mt20 mb20 "><span class="redcolor mr10">基本信息不可编辑如需变更需提交到平台审核！</span><a class="blue ml10" onclick="updateCertification()">信息变更申请</a></p>
					<div class="display_inner_line_wrap">
						<span class="label_wrap">企业名称</span>
						<span id="cpyname_cn" class="display_wrap"></span>
					</div>
					<div class="display_inner_line_wrap" style="width:50%;">
						<span class="label_wrap">法人代表</span>
						<span id="corporation" class="display_wrap"></span>
					</div>
					<div class="display_inner_line_wrap" style="width:50%;">
						<span class="label_wrap">企业类型</span>
						<span id="nature_id" class="display_wrap"></span>
					</div>
					<div class="display_inner_line_wrap" style="width:50%;">
						<span class="label_wrap">成立日期</span>
						<span id="establish_dt" class="display_wrap"></span>
					</div>
					<div class="display_inner_line_wrap" style="width:50%;">
						<span class="label_wrap">经营模式</span>
						<span id="industry_id" class="display_wrap"></span>
					</div>
					<div class="display_inner_line_wrap" style="width:50%;">
						<span class="label_wrap">注册资本</span>
						<span id="reg_fund" class="display_wrap"></span>
					</div>
					<div class="display_inner_line_wrap" style="width:50%;">
						<span class="label_wrap">所属行业</span>
						<span id="class_id" class="display_wrap"></span>
					</div>
					<!-- <div class="display_inner_line_wrap clear">
						<span class="label_wrap">注册地址</span>
						<span id="reg_addr" class="display_wrap"></span>
					</div> -->
					<div class="display_inner_line_wrap">
						<span class="label_wrap">主营业务</span>
						<span id="key_remark" class="display_wrap"></span>
					</div>
					<div class="display_inner_line_wrap">
						<span class="label_wrap">公司证照</span>
					</div>
					<div id="company_licenses" class="buslicense_wrap mb20 clearfix">
						<div class="img_wrap_1">
							<div class="img_block_pic"><img id="business_licence" src="" /></div>
							<div class="img_block_text">营业执照</div>
						</div>
						<div class="img_wrap_1">
							<div class="img_block_pic"><img id="tax_registration_certificate" src="" /></div>
							<div class="img_block_text">税务登记证</div>
						</div>
						<div class="img_wrap_1">
							<div class="img_block_pic"><img id="organization_code_certificate"  src="" /></div>
							<div class="img_block_text">组织机构代码证</div>
						</div>
						<div class="img_wrap_1">
							<div class="img_block_pic"><img id="taxpayer_qualification_certification" src="" /></div>
							<div class="img_block_text">纳税人资格证书</div>
						</div>
					</div> 
					<div class="t_algin_r">
						<button class="yellow_button" onClick="goNext(1)">下一步</button>
					</div> 
				</div>
				<!--基本信息结束-->
				<!--详细信息开始-->
				<div id="detail_info" class="tabcon"> 
						<!-- <div class="f_r mt10 mb10">
							<span class="redcolor">*</span>为必填项
						</div>
						<div class="inner_line_wrap clear">
							<div class="label_wrap">
								企业简称<span class="no_empty">*</span>
							</div>
							<input name="cpyname_cn" class="input_wrap" type="text" size="50" />
							<div class='info_explain_wrap' style="display:block;">
								<img src="/newresources/images/new/er.png" /><span
									class="redcolor">请输入企业简称</span>
							</div>
						</div>
						<div class="inner_line_wrap clearfix">
							<div class="label_wrap">
								联系电话<span class="no_empty">*</span>
							</div>
							<input class="input_wrap" type="text" size="50" />
							<div class="info_explain_wrap">
								<div class="info_explain"></div>
							</div>
						</div>
						<div class="inner_line_wrap clearfix">
							<div class="label_wrap">
								联系地址<span class="no_empty">*</span>
							</div>
							<select id="province" name="province" class="city_select_wrap"
								onChange="goToLocation(1)">
								<option value="0">--请选择省份--</option>
							</select>   <select id="city" name="city" class="city_select_wrap"
								onChange="goToLocation(2)">
								<option value="0">--请选择城市--</option>
							</select>   <select id="country" name="county" class="city_select_wrap"
								onChange="goToLocation(3)">
								<option value="0">--请选择区--</option>
							</select>
							<div class="info_explain_wrap"></div>

						</div>
						地图弹出层
						<div class="mask"></div>
						<input type="hidden" id="lng" /> <input type="hidden" id="lat" />
						<div class="inner_line_wrap relative clearfix">
							<div class="label_wrap"></div>
							<input type="text" id="contactAddr" class="input_wrap"
								style="width:220px;" size="100" placeholder="请输入详细地址" /> <input
								type="hidden" id="contactAddrPro"> <a
								class="remarkMap_a" onClick="theLoaction()"><img
								src="/newresources/images/map1.png" />定位到地图</a>
							<div class="info_explain_wrap"></div>
							<div id="allmap" class="map_wrap"></div>
							<a id="remove_overlay" class="remove_overlay"
								href="javascript:void(0)" onclick="remove_overlay()">取消定位</a> <a
								href="javascript:void(0)" id="close_map" title="关闭窗口"
								onClick="close_map(this)">X</a>
							<div id="r-result" style="display:none;">
								定位搜索: <input type="text" id="suggestId" size="20" value="" />
							</div>
							<div id="searchResultPanel"></div>
						</div>
						地图弹出层结束
						<div class="inner_line_wrap clearfix">
							<div class="label_wrap">联系手机</div>
							<input type="text" class="input_wrap" />
							<div class="info_explain_wrap"></div>
						</div>
						<div class="inner_line_wrap clearfix">
							<div class="label_wrap">联系人</div>
							<input type="text" class="input_wrap" />
							<div class="info_explain_wrap"></div>
						</div>
						<div class="inner_line_wrap clearfix">
							<div class="label_wrap">传真号</div>
							<input type="text" class="input_wrap" />
							<div class="info_explain_wrap"></div>
						</div>
						<div class="inner_line_wrap clearfix">
							<div class="label_wrap">Email</div>
							<input type="text" class="input_wrap" />
							<div class="info_explain_wrap"></div>
						</div>
						<hr class="hr_grey" style="margin-top:30px; clear:both;" />
						<h5 class="block_title mt30">主要销售产品及品牌</h5>
						<div class="block_table_wrap">
							<table class="block_table" style="width:500px;" id="sale_table">
								<tr id="sale_row1">
									<td><input id="sale_name1" type="text" placeholder="产品名称" />
									</td>
									<td><input id="sale_brand1" type="text" placeholder="品牌" />
									</td>
									<td><a onClick="delSaleRow(this,1)"><img
											src="/newresources/images/del.png" />删除</a>
									</td>
									<td style="dispaly:none;"><input id="sale_brand_id1"
										type="hidden" value="-1">
									</td>
								</tr>
								<tfoot>
									<tr>
										<td colspan="3"><a onClick="addSaleRow('sale_table')"><img
												src="/newresources/images/add.png" />添加</a>
											<div class='info_explain_wrap' style="display:block;">
												<img src="/newresources/images/new/er.png" /><span
													class="redcolor">请输入产品名称</span>
											</div></td>
									</tr>
								</tfoot>
							</table>
						</div>
						<h5 class="block_title mt30">主要原材料及品牌</h5>
						<div class="block_table_wrap">
							<table class="block_table" id="mateial_table">
								<tr id="mateial_row1">
									<td><input id="material_name1" type="text"
										placeholder="材料名称" />
									</td>
									<td><input id="material_brand1" type="text"
										placeholder="材料品牌" />
									</td>
									<td><a onClick="delMateialRow(this,1)"><img
											src="/newresources/images/del.png" />删除</a>
									</td>
									<td style="dispaly:none;"><input id="material_brand_id1"
										type="hidden" value="-1">
									</td>
								</tr>
								<tfoot>
									<tr>
										<td colspan="3"><a
											onClick="addMateialRow('mateial_table')"><img
												src="/newresources/images/add.png" />添加</a>
										<div class='info_explain_wrap' style="display:block;">
												<img src="/newresources/images/new/er.png" /><span
													class="redcolor">请输入材料名称</span>
											</div></td>
									</tr>
								</tfoot>
							</table>
						</div>
						<h5 class="block_title mt30">主要客户</h5>
						<div class="block_table_wrap">
							<table class="block_table" id="customer_table">
								<tr id="customer_row1">
									<td><input id="customer_name1" class="customer_name"
										type="text" placeholder="客户名称" /><input id="customer_id1"
										class="customer_id" type="hidden" value="-1" />
									</td>
									<td><input id="customer_name2" class="customer_name"
										type="text" placeholder="客户名称" /><input id="customer_id2"
										class="customer_id" type="hidden" value="-1" />
									</td>
									<td><input id="customer_name3" class="customer_name"
										type="text" placeholder="客户名称" /><input id="customer_id3"
										class="customer_id" type="hidden" value="-1" />
									</td>
									<td><a onclick="delCustomerRow(this,1)"><img
											src="/newresources/images/del.png" />删除
										</a>	
									</td>

								</tr>
								<tfoot>
									<tr>
										<td><a onClick="addCustomerRow('customer_table')"><img
												src="/newresources/images/add.png" />添加</a>
										<div class='info_explain_wrap' style="display:block;">
												<img src="/newresources/images/new/er.png" /><span
													class="redcolor">请输入客户名称</span>
											</div>
										</td>
									</tr>
								</tfoot>
							</table>
						</div>
						<h5 class="block_title mt30">主要竞争对手</h5>
						<div class="block_table_wrap">
							<table class="block_table" id="competitor_table">
								<tr id="competitor_row1">
									<td><input id="competitor_name1" class="competitor_name"
										type="text" placeholder="对手名称" /><input id="competitor_id1"
										class="competitor_id" type="hidden" value="-1" />
									</td>
									<td><input id="competitor_name2" class="competitor_name"
										type="text" placeholder="对手名称" /><input id="competitor_id2"
										class="competitor_id" type="hidden" value="-1" />
									</td>
									<td><input id="competitor_name3" class="competitor_name"
										type="text" placeholder="对手名称" /><input id="competitor_id3"
										class="competitor_id" type="hidden" value="-1" />
									</td>
									<td><a onClick="delCompetitorRow(this,1)"><img
											src="/newresources/images/del.png" />删除</a>
									</td>
								</tr>
								<tfoot>
									<tr>
										<td><a onClick="addCompetitorRow('competitor_table')"><img
												src="/newresources/images/add.png" />添加</a>
										<div class='info_explain_wrap' style="display:block;">
												<img src="/newresources/images/new/er.png" /><span
													class="redcolor">请输入竞争对手</span>
											</div>
										</td>
									</tr>
								</tfoot>
							</table>
						</div>
						<hr class="hr_grey" style="margin-top:30px; clear:both;" />
						<div class="inner_line_wrap clearfix mt30">
							<div class="label_wrap">厂容厂貌</div>
							<div class="right_wrap">
								<ul id="company_equipment_imgs"
									class="ul_upload_img_wrap clearfix">
									<li>
										<div class="image_block_pic">
											<img src="/newresources/images/company_1.png" />
											<div class="oprate_wrap">
												<a href="javascript:void(0)" onClick="">删除</a>
											</div>
										</div></li>
									<li>
										<div class="image_block_pic">
											<img src="/newresources/images/company_1.png" />
											<div class="oprate_wrap">
												<a href="javascript:void(0)" onClick="">删除</a>
											</div>
										</div></li>
									<li>
										<div class="image_block_pic">
											<img src="/newresources/images/company_1.png" />
											<div class="oprate_wrap">
												<a href="javascript:void(0)" onClick="">删除</a>
											</div>
										</div></li>
									<li>
										<div class="image_block_pic">
											<img src="/newresources/images/company_1.png" />
											<div class="oprate_wrap">
												<a href="javascript:void(0)" onClick="">删除</a>
											</div>
										</div></li>
									<li>
										<div class="image_block_pic">
											<img id="company_fact"
												src="/newresources/images/other/11.png" /> <input
												id="company_fact_pic" class="uploadfile_input" type="file"
												name="file" onChange="addImg(this,24)" />
										</div></li>
								</ul>
							</div>
						</div>
						<hr class="hr_grey" style="margin-top:30px; clear:both;" />
						<div class="inner_line_wrap clearfix mt30">
							<div class="label_wrap">企业简介</div>
							<div class="company_descript_tip">
								(总共可以输入<span class="redcolor">400</span>个字,剩余<span
									id="remain_words_num" class="redcolor">400</span>个字)
							</div>
							<textarea id="companyIntroduction" class="company_descript"></textarea>
						</div>
						<div class="t_algin_r">
							<button class="yellow_button" onClick="goNext(0)">上一步</button>
							<button class="yellow_button ml10" onClick="goNext(2)">下一步</button>
						</div> -->
				</div>
				<!--详细结束开始-->
				<!--规模能力开始-->
				<div id="scalepower_info" class="tabcon">
					<!-- <div class="inner_line_wrap mt30 clearfix">
						<div class="label_wrap">员工人数</div>
						<input class="input_wrap" type="text" size="50"/>
						<div class='info_explain_wrap' style="display:block;">
							<img src="/newresources/images/new/er.png" /><span class="redcolor">请输入数字</span>
						</div>
					</div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">其他人员</div>
						<table class="block_table2 f_l" id="otherperson_table">
							<tr id="otherperson_row1">
								<td>
									<select id="otherperson_select1" name="otherperson" class="select_wrap" style="width:150px; height:32px;" onChange="">
										 <option value="0">请选择</option>
										 <option value="1">研发人员</option>
										 <option value="2">操作工</option>
										 <option value="3">专职检验</option>
										 <option value="4">间接员工</option>
										 <option value="5">内审人员</option>
									</select>
								
									<input id="otherperson1" type="text" style=" width:150px;" class="input_wrap" size="50" />
									<div class='info_explain_wrap'></div>
									<span class="f_l mt4 ml8">人</span>
								</td>
								<td><a class="ml8" onClick="delOtherpersonRow(this,1)"><img src="/newresources/images/del.png" />删除</a></td>
								<td class="redcolor"></td>
								<td><div class='info_explain_wrap'></div></td>
							</tr>
						  	<tfoot>
								<tr ><td><a onClick="addOtherpersonRow('otherperson_table')"><img src="/newresources/images/add.png" />添加</a></td></tr>
							</tfoot>
						</table>
					</div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">人员结构</div>
						<table class="block_table2 f_l" id="persontype_table">
							<tr id="persontype_row1">
								<td>
									<select id="persontype_select1" name="persontype" class="select_wrap" style="width:150px; height:32px;" onChange="">
										 <option value="0">请选择</option>
										 <option value="1">本科及以上</option>
										 <option value="2">大专</option>
										 <option value="3">大专以下</option>
									</select>
									<input id="persontype1" type="text" style=" width:150px;" class="input_wrap" size="50" />
									<span class="f_l mt10 ml10">人</span>
								</td>
								<td><img src="/newresources/images/del.png"  onClick="delPersontypeRow(this,1)"/></td>
								<td class="redcolor"></td>
								<td><div class='info_explain_wrap'></div></td>
							</tr>
						  	<tfoot>
								<tr ><td><a onClick="addPersontypeRow('persontype_table')"><img src="/newresources/images/add.png" />添加</a></td></tr>
							</tfoot>
						</table>
					</div>
					<hr class="hr_grey" style="margin-top:30px; clear:both;" />
					<div class="inner_line_wrap mt30 clearfix">
						<div class="label_wrap">质量控制</div>
						<label class="checkbox_wrap f_l"><input name="quality_control" class="input_checkbox"  type="radio" value="0"  />内部</label>
						<label class="checkbox_wrap f_l"><input name="quality_control" class="input_checkbox"  type="radio" value="1"  />第三方</label>
						<label class="checkbox_wrap f_l"><input name="quality_control" class="input_checkbox"  type="radio" value="2"  />无</label>
					</div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">OEM带加工</div>
						<label class="checkbox_wrap f_l"><input name="OEM" class="input_checkbox"  type="radio" value="0" />提供</label>
						<label class="checkbox_wrap f_l"><input name="OEM" class="input_checkbox"  type="radio" value="1" />不提供</label>
					</div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">管理体系认证</div>
						<label class="checkbox_wrap f_l"><input name="certification_system" class="input_checkbox"  checked="checked"  type="radio" value="" />无</label>
						<label class="checkbox_wrap f_l"><input name="certification_system" class="input_checkbox"  type="radio" value="" />ISO9000</label>
						<label class="checkbox_wrap f_l"><input name="certification_system" class="input_checkbox"  type="radio" value="" />ISO14000</label>
						<label class="checkbox_wrap f_l"><input name="certification_system" class="input_checkbox"  type="radio" value="" />其他认证</label>
						<input type="text" id="certification_system_other" class="input_wrap" size="20" />
						管理体系认证图片上传
						<ul id="certification_system_imgs" class="comm_img_ul_wrap mt20 ml80  f_l clearfix">
							<li>
								<div class="image_block_pic">
									<a><img id="management_system" src="/newresources/images/other/11.png" /></a>
									<input class="uploadfile_input" type="file" onChange="addCertifsystemImg(this)" />
									<input id="management_system_pic" class="uploadfile_input" type="file" name="file" onChange="showPic(this)" />
								</div>
								<div class='info_explain_wrap' style="display:block"><img src="/newresources/images/new/er.png" /><span class="redcolor">请上传管理体系证照</span></div>
								
							</li>
						</ul>
					</div>
					<hr class="hr_grey" style="margin-top:30px; clear:both;" />
					<div class="inner_line_wrap mt30 clearfix">
						<div class="label_wrap">年营业额</div>
						<input id="turnover" type="text" class="input_wrap" style="width:200px;" /> 
						<span class="unit_span">万</span>
						<select id="turnover_currency_id" class="select_wrap" style="width:100px; height:32px;">
							<option value="0">--请选择--</option>
						</select>
						<div class='info_explain_wrap'></div>
					</div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">年出口额</div>
						<input id="exportNum" type="text" class="input_wrap" style="width:200px;" />
						<span class="unit_span">万</span>
						<select id="export_currency_id" class="select_wrap" style="width:100px; height:32px;">
							<option value="0">--请选择--</option>
						</select>
						<div class='info_explain_wrap'></div>
					</div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">年进口额</div>
						<input id="importNum" type="text" class="input_wrap" style="width:200px;" />
						<span class="unit_span">万</span>
						<select id="import_currency_id" class="select_wrap" style="width:100px; height:32px;">
							<option value="0">--请选择--</option>
						</select>
						<div class='info_explain_wrap'></div>
					</div>
					<hr class="hr_grey" style="margin-top:30px; clear:both;" />
					<div class="inner_line_wrap mt30 clearfix">
						<div class="label_wrap">企业面积</div>
						<input id="companyArea" type="text" class="input_wrap"  /><span class="f_l mt10 ml10">平方米</span>
						<div class='info_explain_wrap'></div>
					</div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">厂房面积</div>
						<input id="factoryArea" type="text" class="input_wrap"  /><span class="f_l mt10 ml10">平方米</span>
						<div class='info_explain_wrap'></div>
					</div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">使用年限</div>
						<input id="useBegintime" type="text" onClick="WdatePicker({maxDate:'#F{$dp.$D(\'useEndtime\')}',readOnly:true})" class="input_wrap Wdate" style="width:120px;" />
						<span class="f_l mt8 ml10 mr10">—</span>
						<input id="useEndtime" type="text" onClick="WdatePicker({minDate:'#F{$dp.$D(\'useBegintime\')}',readOnly:true})" class="input_wrap Wdate" style="width:120px;" />
					</div>
					<div class="inner_line_wrap clearfix">
						<div class="label_wrap">产权</div>
						<select id="factory_owner" class="select_wrap">
							<option value="0">请选择</option>
							<option value="1">租赁</option>
							<option value="2">自建</option>
						</select>
					</div>
					<hr class="hr_grey" style="margin-top:30px; clear:both;" />
					<div class="inner_line_wrap mt30 clearfix">
						<div class="label_wrap">设备清单</div>
						<div class="right_wrap ml-4 mt-18">
							<table id="devicelist_table" class="block_table  f_l">
								<tr>
									<th>设备名称</th>
									<th>规格</th>
									<th>产地</th>
									<th>价值(万元)</th>
									<th>购买日期</th>
									<th>数量</th>
									<th>先进性</th>
									<th></th>
									<th></th>
									<th></th>
								</tr>
								<tr id="device_row1">
									<td><input id="device_name1" type="text" style=" width:90px;" class="input_wrap" size="50" /></td>
									<td><input id="device_format1" type="text" style=" width:90px;" class="input_wrap" size="50" /></td>
									<td><input id="device_place1" type="text" style=" width:90px;" class="input_wrap" size="50" /></td>
									<td><input id="device_buy_day1" type="text" style=" width:90px;" onClick="WdatePicker({readOnly:true})" class="input_wrap Wdate" /></td>
									<td><input id="device_price1" type="text" style=" width:70px;" class="input_wrap" size="50" /></td>
									<td><input id="device_num1" type="text" style=" width:70px;" class="input_wrap" size="20" /></td>
									<td><input id="device_advanced1" type="text" style=" width:70px;" class="input_wrap" size="50" /></td>
									<td><a onClick="delDevicelistRow(this,1)"><img src="/newresources/images/del.png" />删除</a></td>
									<td class="redcolor"></td>
									<td style="dispaly:none;"><input id="device_id1" type="hidden" value="-1"></td>
								</tr>
								<tr><td colspan='7'><div class='info_explain_wrap'></div></td></tr>
							  	<tfoot>
									<tr ><td><a onClick="addDevicelistRow('devicelist_table')"><img src="/newresources/images/add.png" />添加</a></td></tr>
								</tfoot>
							</table>
						</div>
					</div>
					<hr class="hr_grey" style="margin-top:30px; clear:both;" />
					<div class="inner_line_wrap clearfix mt30">
						<div class="label_wrap">院校合作</div>
						<div class="company_descript_tip">总共可以输入<span class="redcolor">400</span>个字,剩余<span id="remain_words_num" class="redcolor">400</span>个字</div>
						<textarea id="schoolCoop" class="company_descript"></textarea>
						
						<table id="annex_text" class="file_block_table f_l ml80 mt10">
							<thead>
								<tr>
									<td colspan="4">
										<span class="mini_span">请选择5M以下.doc/.docx;.ppt/.pptx/.pps;.xls/.xlsx;.pdf;.txt文件</span>
									</td>
								</tr>
								<tr>
									<td colspan="4">
										<span class="label_wrap">附件资料</span>
										<input id="qc_file_name" class="input_wrap_attachment " type="text" />
										<div class="file_wrap_attachment">
											<div class="file_wrap_inner_attachment">
												<input id="file_no"  style="display:none" value="0"/>
												<button class="file_btn_attachment" id="qc_file_bu">选择文件</button>
												<input type="file" name ="file" id ="qc_file_table_capability" class="uploadfile_input_attachment" onChange="showviewtext()" />
											</div>
										</div>
										<button class="file_btn_attachment f_l"  onClick="addText(30)">上传</button>	
									
										<div class='info_explain_wrap' style="display:block;">
											<img src="/newresources/images/new/er.png" /><span class="redcolor">请选择上传文件</span>
										</div>
									</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td width="auto"><a onclick="downloadText_find(this)">院校合作资料文档.doc</a></td>
									<td width="130px"><span class="color707070">2016-7-1 16:04:58</span></td>
									<td width="100px"><a onclick="deluploadText(this)"><img src="/newresources/images/del2.png" />删除</a></td>
									<td><input type="hidden" value=""/></td>
								</tr>
								<tr>
									<td width="auto"><a onclick="downloadText_find(this)">院校合作资料文档.doc</a></td>
									<td width="130px"><span class="color707070">2016-7-1 16:04:58</span></td>
									<td width="100px"><a onclick="deluploadText(this)"><img src="/newresources/images/del2.png" />删除</a></td>
									<td><input type="hidden" value=""/></td>
								</tr>
							</tbody>
						</table>
					</div>
					<hr class="hr_grey" style="margin-top:30px; clear:both;" />
					<div class="inner_line_wrap clearfix mt30">
						<div class="label_wrap">专利</div>
						<div class="right_wrap">
							<ul id="patent_imgs" class="ul_upload_img_wrap clearfix">
								<li>
									<div class="image_block_pic">
										<img id="patent" src="/newresources/images/other/11.png" />
										<input id="patent_pic" class="uploadfile_input" type="file" name="file" onChange="addImg(this,26)" />
									</div>
								</li>
							</ul>
						</div>
					</div>
					<hr class="hr_grey" style="margin-top:30px; clear:both;" />
					<div class="inner_line_wrap clearfix mt30">
						<div class="label_wrap">其他资质</div>
						<div class="right_wrap">
							<ul id="other_intelligence_imgs" class="ul_upload_img_wrap clearfix">
								<li>
									<div class="image_block_pic">
										<img id="other_intelligence" src="/newresources/images/other/11.png" />
										<input id="other_intelligence_pic" class="uploadfile_input" type="file" name="file" onChange="addImg(this,27)" />
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="t_algin_r">
						<button class="yellow_button" onClick="goNext(0)">上一步</button>
						<button class="yellow_button ml10" onClick="goNext(2)">下一步</button>
					</div> -->
				</div>
				<!--规模能力结束-->
				<!--交易信息开始-->
				<div id="trade_info" class="tabcon">
					<div class="sub_title_wrap">
						<span style="color:#707070;">银行信息</span><span style="color:#777; font-weight:normal;">(<span class="no_empty" style="color:#e50505;font-weight:bold;">*</span>必须填写一个默认账户)</span>
						<div class="bluecolor f_r mt8" style="cursor:pointer;" onclick="addBankAccount()">添加账号</div>
					</div>
					<div class="ml10 mr10">
						<table id="bankTable" class="trade_tablelist">
							<tr>
								<th width="auto">开户行</th>
								<th width="200px">开户账号</th>
								<th width="140px">账号状态</th>
								<th width="20px"></th>
								<th width="20px"></th>
								<th width="70px"></th>
								<th width="160px">操作</th>
							</tr>
							<!-- <tr>
								<td class="left">浙江萧山农村合作银行</td>
								<td>62255962355322154564564</td>
								<td>已注销</td>
								<td><input type="hidden" value="account_id" /></td>
								<td><input type="hidden" value="app_account_id" /></td>
								<td></td>
							</tr>
							<tr>
								<td class="left">浙江萧山农村合作银行</td>
								<td>62255962355322154564564</td>
								<td>在用</td>
								<td><input type="hidden" value="account_id" /></td>
								<td><input type="hidden" value="app_account_id" /></td>
								<td class="center"><a>删除</a></td>
							</tr> -->
						</table> 
					</div>
					<div class="sub_title_wrap mt20">
						<span style="color:#707070;">发票信息</span><span style="color:#777; font-weight:normal;"><span class="no_empty" style="color:#e50505;font-weight:bold;">*</span></span>
						<div class="bluecolor f_r mt8"  style="cursor:pointer;" onclick="addInvoiceTitle()">添加发票</div>
					</div>
					<div class="ml10 mr10">
						<table id="invoiceTable" class="trade_tablelist">
							<tr>
								<th width="auto">发票抬头</th>
								<th width="100">发票状态</th>
								<th width="50px"></th>
								<th width="50px"></th>
								<th width="160px">操作</th>
							</tr>
							<!-- <tr>
								<td class="left">浙江泰普森休闲用品有限公司</td>
								<td>已注销</td>
								<td><input type="hidden" value="invoice_title_id" /></td>
								<td><input type="hidden" value="app_invoice_title_id" /></td>
								<td></td>
							</tr>
							<tr>
								<td class="left">浙江泰普森休闲用品有限公司</td>
								<td>在用</td>
								<td><input type="hidden" value="invoice_title_id" /></td>
								<td><input type="hidden" value="app_invoice_title_id" /></td>
								<td><a>删除</a></td>
							</tr> -->
						</table>
					</div>
					<div class="t_algin_r mr10 mt10">
							<button id="save_btn" class="yellow_button" onClick="saveAllInfo()">保存</button>
							<button id="submit_btn" class="yellow_button" onClick="saveAllInfo('提交',this)">提交</button>
					</div>
				</div>
				
				<!--交易信息结束-->
			</div>
			</div>
		</div>
		<div id="step2" class="step_wrap ml60 mt30" style="display:none; width:600px;">
				
				<p class="b lh200 fs120 t_algin_r">
					<img src="/newresources/images/big-duigou.png" />您的申请已提交成功，我们将在24小时内回复审核结果.
					<!-- 到您的注册邮箱<span id="regEmail">666888@tps.com</span> -->
				</p>
				<p class="t_algin_r mr20 mt20">
					<a class="blue" href="/AccessApplicationCtrl/applyAccessList.htm">返回准入申请</a>
				</p>
		</div>
		
	</div>
</div>

<div class="mask" id="pop_mask"></div>
<!--添加账号-->
<div id="addBankAccount_wrap" class="pop_layer_wrap">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		添加账号
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('addBankAccount_wrap')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap">
		<div class="h30">
			<input id="selectAllAcount" onclick="select_all('selectAllAcount','bank_table')" type="checkbox" class="input_checkbox" />全选
			<a onclick="go_tradeInfo()" class="f_r blue">维护账号</a>
		</div>
		<table id="bank_table" class="trade_tablelist">
			<tbody>
				<tr>
					<th width="40px"></th>
					<th width="auto">开户行</th>
					<th width="170px">开户账号</th>
					<th width="20px"></th>
					<th width="70px">状态</th>
				</tr>
				<tr>
					<td><input type="checkbox" value="123" /></td>
					<td class="left">浙江萧山农村合作银行</td>
					<td>6223456464564552522</td>
					<td></td>
					<td>在用</td>
				</tr>
				<tr>
					<td><input type="checkbox" value="123" /></td>
					<td class="left">浙江萧山农村合作银行</td>
					<td>6223456464564552522</td>
					<td></td>
					<td>在用</td>
				</tr>
			</tbody>
		</table>
		<div class="t_algin_r mt20">
			<button class="button_save" onClick="addBankAccount_save()">保存</button>
		</div>
	</div>
</div>
<!--添加发票-->
<div id="addInvoiceTitle_wrap" class="pop_layer_wrap">
	<div class="title_wrap" style="height:30px; line-height:30px;">
		添加发票
		<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('addInvoiceTitle_wrap')" title="关闭窗口">X</a>
	</div>
	<div class="pop_content_wrap">
		<div class="h30">
			<input id="selectAllInvoice" onclick="select_all('selectAllInvoice','invoice_table')" type="checkbox" class="input_checkbox" />全选
			<a onclick="go_tradeInfo()" class="f_r blue">维护账号</a>
		</div>
		<table id="invoice_table" class="trade_tablelist">
			<tbody>
				<tr>
					<th width="40px"></th>
					<th width="auto">发票抬头</th>
					<th width="20px"></th>
					<th width="70px">状态</th>
				</tr>
				<tr>
					<td><input type="checkbox" value="123" /></td>
					<td class="left">浙江萧山农村合作银行</td>
					<td></td>
					<td>在用</td>
				</tr>
				<tr>
					<td><input type="checkbox" value="123" /></td>
					<td class="left">浙江萧山农村合作银行</td>
					<td></td>
					<td>在用</td>
				</tr>
			</tbody>
		</table>
		<div class="t_algin_r mt20">
			<button class="button_save" onClick="addInvoiceTitle_save()">保存</button>
		</div>
	</div>
</div>
<!--底端-->
<div id="bottom"></div>
<%@ include file="/newresources/js/base.jsp" %>
<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- <script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script>  -->
<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>
<!-- <script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.treeview.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.nicescroll.js"></script>
<script type="text/javascript" src="/newresources/js/cityOperate.js"></script>
<script type="text/javascript" src="/newresources/js/currency.js"></script>
<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="/usercenter/saleManage/accessManage/js/appAccessInfo.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=4i6arTpbQQ1MfIcFRuoHyXKc"></script>
</body>
</html>