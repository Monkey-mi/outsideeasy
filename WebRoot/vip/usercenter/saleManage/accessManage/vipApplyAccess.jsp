<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<html>
	<head>
		<meta charset="UTF-8">
		<title>VIP准入申请</title>
		<link href="/vip/resources/css/vipApplyAccess.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
		<link rel="stylesheet" href="/vip/resources/css/jquery.mCustomScrollbar.css" />
	</head>
	<body class="bg_grey" style="margin-top:120px;" >
	<div class="mask_opacity"></div>
	<div id="top_vip_apply" class="fixedTop"></div>
	<!--中间-->
	<div class="midd_wrap clearfix">
		<div class="midd_left_wrap fixedMenu" style="width:180px;">
			<div class="leftTop">
				<ul class="menu_ul">
					<li class="menuActive"><img src="/vip/resources/images/applyAccess/active1.png"><a class="color_4c active" onclick="click_scroll(this,'.baseInfo')">基本信息</a></li>
					<li><img src="/vip/resources/images/applyAccess/regular2.png"><a class="color_4c" onclick="click_scroll(1,'.tradeInfo')">交易信息</a></li>
					<li><img src="/vip/resources/images/applyAccess/regular2.png"><a class="color_4c" onclick="click_scroll(2,'.contactInfo')">联系信息</a></li>
					<li><img src="/vip/resources/images/applyAccess/regular2.png"><a class="color_4c" onclick="click_scroll(3,'.productInfo')">产品信息</a></li>
					<li><img src="/vip/resources/images/applyAccess/regular2.png"><a class="color_4c" onclick="click_scroll(4,'.companyInfo')">门户信息</a></li>
					<li><img src="/vip/resources/images/applyAccess/regular2.png"><a class="color_4c" onclick="click_scroll(5,'.scalepowerInfo')">规模能力</a></li>
					<li><img src="/vip/resources/images/applyAccess/regular2.png"><a class="color_4c" onclick="click_scroll(6,'.machineInfo')">设备清单</a></li>
					<li><img src="/vip/resources/images/applyAccess/regular2.png"><a class="color_4c" onclick="click_scroll(7,'.schoolCooperation')">院校合作</a></li>
					<li><img src="/vip/resources/images/applyAccess/regular3.png"><a class="color_4c" onclick="click_scroll(8,'.certification')">资质及证书</a></li>
				</ul>
			</div>
			<div class="div_split bg_grey"></div>
			<div id="submit_btn" class="left_middle" onclick="submit()">提交审核</div>
			<div class="div_split bg_grey"></div>
			<div class="left_bottom">
				<ul>
					<li>填表须知：</li>
					<li>1、带<span class="red_color">*</span>为必填项，必填项全部填完方可提交；</li>
					<li>2、请及时保存信息以免丢失。</li>
				</ul>
			</div>
		</div>
		<div class="midd_right_wrap" style="width:834px;">
			<div class="form_head">
				<div class="head_top"><img src="/vip/resources/images/applyAccess/titleline.png"><span class="ml40 mr40">泰普森准入申请表</span><img src="/vip/resources/images/applyAccess/titleline.png"></div>
				<div class="ml20 mr20 head_bottom">
					<span id="submit_time_wrap" class="hide">提交时间：<span id="submit_time">2016-10-12 16:12:00</span></span>
					<span class="f_r">当前状态：<span id="crrent_status" class="regular">*</span></span>
				</div>
			</div>
			<div class="div_split bg_grey"></div>
			<div class="form_tip clearfix">
				<div class="tipName f_l"><span>所需材料：</span><br/><span></span></div>
				<div class="tipList f_r">
					<div>1.营业执照（照片）；税务登记证（照片）；组织机构代码证（照片）；纳税人资格证书（照片）；</div>
					<div>2.设备清单，银行账户信息及发票信息。</div>
				</div>
			</div>
			<div class="div_split bg_grey"></div>
			<div class="all_info">
				<!--基本信息编辑  -->
				<div id="baseInfoForEdit" class="con baseInfo forEdit">
					<div class="title">基本信息</div>
					<div class="main clearfix">
						<span class="name1">企业名称<span class="warn">*</span></span><span class="regular">企业名称审核通过后不可修改</span>
						<div class="item"><input type="text" class="inputWrap input_must" id="companyNameForEdit" autocomplete="off"><span class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">企业名称不可为空</span></div>
						<span class="name1 mt20">企业类型<span class="warn">*</span></span>
						<div class="item clearfix">
							<div class="posR f_l">
								<div id="nature_id" class="selectWrap clearfix select_must" onclick="showSelect(this)"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5"></div>
								<ul id="companyTypeList" class="companyTypeList posA "></ul>
							</div>
							<div class="info_explain ml10 f_l"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">企业类型不可为空</div>
						</div>
						<span class="name1 mt20">经营模式<span class="warn">*</span></span>
						<div class="item clearfix">
							<div id="industry_id_wrap" class="radioWrap f_l">
								<div class="inputRadio f_l ml20"><input type="radio" name="pattern" value="1" autocomplete="off">生产型</div>
								<div class="inputRadio f_l"><input type="radio" name="pattern" value="2" autocomplete="off">贸易型</div>
								<div class="inputRadio f_l"><input type="radio" name="pattern" value="3" autocomplete="off">服务型</div>
								<div class="inputRadio f_l"><input type="radio" name="pattern" value="4" autocomplete="off">其他机构</div>
							</div>
							<div class="info_explain f_l ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">经营模式不可为空</div>
						</div>
						<span class="name1 mt20">所属行业<span class="warn">*</span></span>
						<div class="item clearfix">
							<div class="posR f_l">
								<div id="class_id" class="selectWrap clearfix select_must" onclick="showSelect(this)"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5"></div>
								<ul class="industryList posA ">
								</ul>
							</div>
							<div class="info_explain f_l ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">所属行业不可为空</div>
						</div>
						<span class="name1 mt20">主营业务<span class="warn">*</span></span>
						<div class="item">
							<input id="key_remark" type="text" class="inputWrap input_must" autocomplete="off">
							<span class="info_explain ml10">
								<img src="/vip/resources/images/applyAccess/er.png" class="mr10">主营业务不可为空
							</span>
						</div>
						<hr class="hr_dashed">
						<span class="name1">法人代表<span class="warn">*</span></span>
						<div class="item"><input id="corporation" type="text" class="inputWrap2 input_must" autocomplete="off"><span class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">法人代表不可为空</span></div>
						<span class="name1 mt20">注册资本<span class="warn">*</span></span>
						<div class="item clearfix">
							<div style="width:350px;" class="clearfix f_l">
								<div class="selectWrap2 clearfix f_l ">
									<div class="posR f_l" >
										<div id="currency_id" class="clearfix left select_must" onclick="showSelect(this)"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5"></div>
										<ul id="reg_fund_money_type" class="moneyTypeList posA">
											<!-- <li>人民币[RMB]</li>
											<li>日元[JPY]</li> -->
										</ul>
									</div>
									<div class=" f_l"><input id="reg_fund" type="text" class="input_must right" autocomplete="off"></div>
								</div>
								<div class="f_l ml10" style="line-height:40px;font-size:14px;font-weight:bold;">万</div>
							</div>
							<div class="info_explain f_l ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">注册资本不可为空</div>
						</div>
						<span class="name1 mt20">成立日期<span class="warn">*</span></span>
						<div class="item"><input autocomplete="off"  id="establish_dt" type="text" class="Wdate inputWrap2 input_must" onClick="WdatePicker({maxDate:'%y-%M-%d',readOnly:true})"><span class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">成立日期不可为空</span></div>
						<hr class="hr_dashed">
						<span class="name1 mt20">公司证照<span class="warn">*</span></span>
						<div class="item clearfix">
							<div id="company_licenses_pic" class="clearfix f_l">
								<div class="f_l pictures">
									<div class="upload posR image_block_pic">
										<a><img id="business_licence" src="/vip/resources/images/applyAccess/imgBg.png"></a>
										<input type="file" id="business_licence_pic" class="uploadfile_input" name="file" onChange="showPicForVip(this)">
									</div>
									<div class="upload_tip">
										<p class="picType">营业执照</p>
										<p class="picSize">建议图片大小5M以内</p>
									</div>
								</div>
								<div class="f_l pictures ml10">
									<div class="upload posR image_block_pic">
										<a><img id="tax_registration_certificate"  src="/vip/resources/images/applyAccess/imgBg.png"></a>
										<input type="file" id="tax_registration_certificate_pic" class="uploadfile_input" name="file" onChange="showPicForVip(this)">
									</div>
									<div class="upload_tip">
										<p class="picType">税务登记证</p>
										<p class="picSize">建议图片大小5M以内</p>
									</div>
								</div>
								<div class="f_l pictures ml10">
									<div class="upload posR image_block_pic">
										<a><img id="organization_code_certificate"  src="/vip/resources/images/applyAccess/imgBg.png"></a>
										<input type="file" id="organization_code_certificate_pic" class="uploadfile_input" name="file" onChange="showPicForVip(this)">
									</div>
									<div class="upload_tip">
										<p class="picType">组织机构代码证</p>
										<p class="picSize">建议图片大小5M以内</p>
									</div>
								</div>
								<div class="f_l pictures ml10">
									<div class="upload posR image_block_pic">
										<a><img id="taxpayer_qualification_certification" src="/vip/resources/images/applyAccess/imgBg.png"></a>
										<input type="file" id="taxpayer_qualification_certification_pic" class="uploadfile_input" name="file" onChange="showPicForVip(this)">
									</div>
									<div class="upload_tip">
										<p class="picType">纳税人资格证书</p>
										<p class="picSize">建议图片大小5M以内</p>
									</div>
								</div>
							</div>
							<div class="info_explain f_l ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">公司证照不可为空</div>
						</div>
						<button id="saveBaseInfo" class="save" onClick="saveBaseInfo(this)">保存</button>
					</div>
				</div>
				<!--基本信息浏览  -->
				<div id="baseInfoForRead" class="forRead con baseInfo">
					<div class="title">基本信息<span class="now_edit c999 f_r mr20">未填写<span class="rightnow" onClick="showTurnEdit(this)">&nbsp;现在去填</span></span></div>
					<div class="main clearfix">
						<p><span class="name1">企业名称<span class="warn">*</span></span><span class="span_con" id="companyNameForRead"></span></p>
						<p class="mt10"><span class="name1 ">企业类型<span class="warn">*</span></span><span id="companyTypeForRead" class="span_con" ><span class="noinfo">未填写</span></span></p>
						<p class="mt10"><span class="name1 ">经营模式<span class="warn">*</span></span><span id="industryForRead" class="span_con"><span class="noinfo">未填写</span></span></p>
						<p class="mt10"><span class="name1 ">所属行业<span class="warn">*</span></span><span id="classForRead" class="span_con"><span class="noinfo">未填写</span></span></p>
						<p class="mt10"><span class="name1 ">主营业务<span class="warn">*</span></span><span id="keyRemarkForRead" class="span_con"><span class="noinfo">未填写</span></span></p>
						<p class="mt50"><span class="name1 ">法人代表<span class="warn">*</span></span><span id="corporationForRead" class="span_con"><span class="noinfo">未填写</span></span></p>
						<p class="mt10"><span class="name1 ">注册资本<span class="warn">*</span></span><span class="span_con"><span class="noinfo">未填写</span> <span class="dataForReg"><span id="regFundForRead" ></span>万 &nbsp;<span id="moneyTypeForRead"></span></span> </span></p>
						<p class="mt10"><span class="name1 ">成立日期<span class="warn">*</span></span><span id="establishDtForRead" class="span_con"><span class="noinfo">未填写</span></span></P>
						<span class="name1 mt50">公司证照<span class="warn">*</span></span>
						<div class="item clearfix">
							<div class="clearfix f_l">
								<div class="f_l pictures" id="business_licence_read">
	<!-- 								<div class="upload posR">
										<img  src="/vip/resources/images/applyAccess/imgBg.png">
									</div>
									<div class="upload_tip">
										<p class="picType">营业执照</p>
									</div> -->
								</div>
								<div class="f_l pictures ml10" id="tax_registration_certificate_read">
<!-- 									<div class="upload posR"> -->
<!--  										<img  src="/vip/resources/images/applyAccess/imgBg.png"> -->
<!-- 									</div> -->
<!-- 									<div class="upload_tip"> -->
<!-- 										<p class="picType">税务登记证</p> -->
<!-- 									</div> -->
								</div>
								<div class="f_l pictures ml10" id="organization_code_certificate_read">
<!-- 									<div class="upload posR"> -->
<!--  										<img  src="/vip/resources/images/applyAccess/imgBg.png"> -->
<!-- 									</div> -->
<!-- 									<div class="upload_tip"> -->
<!-- 										<p class="picType">组织机构代码证</p> -->
<!-- 									</div> -->
								</div>
								<div class="f_l pictures ml10" id="taxpayer_qualification_certification_read">
<!-- 									<div class="upload posR"> -->
<!-- 										<img  src="/vip/resources/images/applyAccess/imgBg.png"> -->
<!-- 									</div> -->
<!-- 									<div class="upload_tip"> -->
<!-- 										<p class="picType">纳税人资格证书</p> -->
<!-- 									</div> -->
								</div>
							</div>
						</div>
						<button class="edit" onClick="showTurnEdit(this)" >编辑</button>
					</div>
				</div>
				<div class="div_split bg_grey"></div>
				<!--交易信息编辑  -->
				<div id="tradeInfoForEdit" class="con tradeInfo forEdit">
					<div class="title">交易信息</div>
					<div class="main clearfix">
						<span class="name1">银行信息<span class="warn">*</span></span>
						<div><span class="name2">开户行</span><span class="name2 ml10">开户账号</span></div>
						<div class="item" id="bank">
							<div class="clearfix part">
								<div class=" f_l">
									<input type="text" class="inputWrap2 input_must" autocomplete="off" style="margin-right:-4px;">
									<input type="text" class="inputWrap2 input_must ml10 bankcard" autocomplete="off">
									<input type="hidden" class="account_id" value="-1">
								</div>
								<div class="f_l ml10" style="height:40px;line-height:40px;">
									<div class="inputRadio f_l"><input type="radio"  onclick="setDefault(this)" name="setDefault">设为默认</div>
									<div class="defaultAccount f_l hide">默认账号</div>
									<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,1)">
									<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,1)" class="plus">
								</div>
							</div>
							<div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">银行信息不可为空</div>
						</div>
						<span class="name1 mt20">发票信息<span class="warn">*</span></span>
						<div class="item" id="invoice">
							<div class="clearfix mt10 part">
								<div class=" f_l">
									<input type="text" placeholder="请输入发票信息" class="inputWrap input_must" autocomplete="off">
									<input type="hidden" class="invoice_title_id" value="-1">
								</div>
								<div class="f_l ml20" style="height:40px;line-height:40px;">
								<!-- 	<div class="inputRadio f_l"><input type="radio"  onclick="setDefault(this)" name="setDefaultInvoice">设为默认</div>
									<div class="defaultAccount f_l hide">默认抬头</div> -->
									<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,2)">
									<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,2)" class="plus">
								</div>
							</div>
							<div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">发票信息不可为空</div>
						</div>
						<button id="saveTradeInfo" class="save" onClick="saveTradeInfo(this)">保存</button>
					</div>
				</div>
				<!--交易信息浏览  -->
				<div class="forRead con tradeInfo " id="tradeInfoForRead">
					<div class="title">交易信息<span class="now_edit c999 f_r mr20">未填写<span class="rightnow" onClick="showTurnEdit(this)">&nbsp;现在去填</span></span></div>
						<div class="main clearfix">
							<div class="clearfix">
								<span class="name1 f_l">银行信息<span class="warn">*</span></span>
								<div class="f_l">
									<table  class="bankList">
										<tr>
											<td class="f14"></td>
											<td class="f14"></td>
											<td class="regular "></td>
										</tr>
										<tr>
											<td class="f14"></td>
											<td class="f14"></td>
										</tr>
									</table>
								</div>
							</div>
							<div class="clearfix mt20">
								<span class="name1 f_l">发票信息<span class="warn">*</span></span>
								<div class="f_l">
									<ul class="invoiceList f14">
										<li><span></span><span class="regular" style="margin-left:20px;"></span></li>
									</ul>
								</div>
							</div>
							<button class="edit" onClick="showTurnEdit(this)">编辑</button>
						</div>
				</div>
				<div class="div_split bg_grey"></div>
				<!--联系信息编辑  -->
				<div id="contactInfoForEdit" class="con contactInfo forEdit">
					<div class="title">联系信息</div>
					<div class="main clearfix">
						<span class="name1">联系电话<span class="warn">*</span></span>
						<div class="item clearfix">
							<div class="clearfix f_l">
								<div class=" f_l "><input id="fPhone_front" type="text" class="inputWrap3 input_must" autocomplete="off"></div>
								<div style="width:30px;height:40px;line-height:40px;text-align:center;float:left;color:#ccc;">—</div>
								<div class=" f_l "><input id="fPhone_behind" type="text" class="inputWrap2 input_must" autocomplete="off"></div>
							</div>
							<div class="info_explain f_l ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">联系电话不可为空</div>
						</div>
						<span class="name1 mt20">联系地址<span class="warn">*</span></span>
						<div class="item clearfix"  id="address">
							<div class="clearfix f_l ">
								<div class="posR f_l">
									<div id="province" class="selectWrap4 clearfix select_must" onclick="showSelect(this)"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5"></div>
									<ul class="province posA"></ul>
								</div>
								<div class="posR f_l ml10">
									<div id="city" class="selectWrap4 clearfix select_must" onclick="showSelect(this)"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5"></div>
									<ul class="city posA "></ul>
								</div>
								<div class="posR f_l ml10">
									<div id="county"  class="selectWrap4 clearfix select_must"  onclick="showSelect(this)"><img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5"></div>
									<ul class="county posA "></ul>
								</div>
							</div>
							<div class="info_explain f_l ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">联系地址不可为空</div>
						</div>
						<div class="mask" style="z-index:55;"></div>
						<input type="hidden" id="lng"/>
						<input type="hidden" id="lat"/>
						<div class="clearfix mt10">
							<div class=" f_l posR"><input id="contactAddr" type="text" class="inputWrap addressDetailMust" autocomplete="off"><img src="/vip/resources/images/applyAccess/pinGrey.png" class="posA" style="left:370px;top:10px;"></div>
							<div class="regular f_l ml10 location_map" style="height:40px;line-height:40px;cursor:pointer;" onclick="theLoaction()">定位到地图</div>
							<div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请定位地图</div>
						</div>
						<div style="position:fixed;left:35%;top:20%;z-index:60;">
							<div id="allmap" class="map_wrap"></div>
							<a id="remove_overlay" href="javascript:void(0)"  onclick="remove_overlay()" >取消定位</a>
							<a href="javascript:void(0)" id="close_map" title="关闭窗口" class="close_btn" onClick="close_map(this)">X</a>
							<div id="r-result" style="display:none;" >定位搜索:
								<input type="text" id="suggestId" size="20" value=""  />
							</div>
							<div id="searchResultPanel"></div>
						</div>
						<span class="name1 mt20">联系人</span>
						<div><input id="contacts" type="text"  class="inputWrap" autocomplete="off"></div>
						<span class="name1 mt20">联系人手机</span>
						<div><input id="mPhone" type="text"  class="inputWrap" autocomplete="off"><div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的手机号</div></div>
						<span class="name1 mt20">传真号</span>
						<div><input id="fax"  type="text"  class="inputWrap" autocomplete="off"></div>
						<span class="name1 mt20">Email</span>
						<div ><input id="email"  type="text" class="inputWrap" autocomplete="off"><div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的邮箱</div></div>
						<button id="saveLinkedInfo" class="save" onClick="saveLinkedInfo(this)">保存</button>
					</div>
				</div>
				<!--联系信息浏览  -->
				<div class="forRead con contactInfo" id="contactInfoForRead">
					<div class="title">联系信息<span class="now_edit c999 f_r mr20">未填写<span class="rightnow" onClick="showTurnEdit(this)">&nbsp;现在去填</span></span></div>
					<div class="main clearfix">
						<!-- <p><span class="name1">企业简称<span class="warn">*</span></span><span class="span_con">湖州宏升箱包有限公司</span></p> -->
						<p><span class="name1">联系电话<span class="warn">*</span></span><span id="fPhoneForRead" class="span_con"><span class="noinfo">未填写</span></span></p>
						<p class="mt10"><span class="name1">联系地址<span class="warn">*</span></span><span id="contactAddrForRead" class="span_con"><span class="noinfo">未填写</span></span></p>
						<p class="mt10"><span class="name1">联系人</span><span class="span_con"><span class="noinfo">未填写</span> <span id="contactsForRead"></span> </span></p>
						<p class="mt10"><span class="name1">联系人手机</span><span class="span_con"><span class="noinfo">未填写</span> <span id="mPhoneForRead"></span> </span></p>
						<p class="mt10"><span class="name1">传真号</span><span class="span_con"><span class="noinfo">未填写</span> <span id="faxForRead"></span> </span></p>
						<p class="mt10"><span class="name1">Email</span><span class="span_con"><span class="noinfo">未填写</span> <span id="emailForRead"></span> </span></p>
						<button class="edit" onClick="showTurnEdit(this)">编辑</button>
					</div>
				</div>
				<div class="div_split bg_grey"></div>
				<!--产品信息编辑  -->
				<div id="productInfoForEdit" class="con productInfo forEdit">
					<div class="title">产品信息</div>
					<div class="main clearfix">
						<span class="name1">供应品类<span class="warn">*</span></span>
						<div class="item clearfix">
							<div class="sortChoosed f_l">
								<ul class="clearfix allSorts">
								</ul>
							</div>
						</div>
						<div class="posR clearfix">
							<div class="regular f14 mt20 f_l" onClick ="showSort()" style="cursor:pointer;"><img src="/vip/resources/images/applyAccess/plus.png">选择供应品类</div>
							<div class="sortSelect posA" id="sortSelect">
								<div class="regular f14 top"><img src="/vip/resources/images/applyAccess/plus.png">选择供应品类</div>	
								<div class="middle clearfix">
									<div class="first f_l"><ul class="sortLevel1"></ul></div>
									<div class="second f_l"><ul class="sortLevel2"></ul></div>
									<div class="third f_l"><ul class="sortLevel3"></ul></div>
								</div>	
								<div class="bottom"><button class="closeSort">关闭</button></div>			
							</div>
							<div class="info_explain f_l ml10 mt10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">供应品类不可为空</div>
						</div>
						<span class="name3 mt20">主要销售产品及品牌<span class="warn">*</span></span>
						<div class="item" id="saleProduct">
							<div class="clearfix mt10 part">
								<div class="clearfix f_l">
									<div class="f_l"><input type="text" placeholder="产品名称" class="inputWrap5 input_must" autocomplete="off"></div>
									<div class=" f_l ml10"><input type="text" placeholder="品牌名称" class="inputWrap5 " autocomplete="off"><!-- <div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">不可为空</div> --></div>
									<input type="hidden" class="saleId" value="-1">
								</div>
								<div class="f_l ml10" style="height:40px;line-height:40px;">
									<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,3)">
									<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,3)" class="plus">
								</div>
							</div>
							<div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">产品名称不可为空</div>
						</div>
						<span class="name3 mt20">主要原材料及品牌<span class="warn">*</span></span>
						<div class="item" id="material">
							<div class="clearfix part">
								<div class="clearfix f_l">
									<div class=" f_l"><input type="text" placeholder="材料名称" class="inputWrap5 input_must" autocomplete="off"></div>
									<div class=" f_l ml10"><input type="text" placeholder="材料品牌" class="inputWrap5" autocomplete="off"><!-- <div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">不可为空</div> --></div>
									<input type="hidden" class="materialId" value="-1">
								</div>
								<div class="f_l ml10" style="height:40px;line-height:40px;">
									<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,4)">
									<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,4)" class="plus">
								</div>
							</div>
							<div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">材料名称不可为空</div>
						</div>
						<span class="name1 mt20">主要竞争对手<span class="warn">*</span></span>
						<div class="item clearfix" id="competitor">
							<div class="clearfix part">
								<div class=" f_l">
									<input type="text" class="inputWrap input_must" autocomplete="off">
									<input type="hidden" class="competitor_id" value="-1">
								</div>
								<div class="f_l ml10" style="height:40px;line-height:40px;">
									<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,5)">
									<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,5)" class="plus">
								</div>
							</div>
							<div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">主要竞争对手不可为空</div>
						</div>
						<span class="name1 mt20">主要客户</span>
						<div class="item" id="customer">
							<div class="clearfix part">
								<div class=" f_l">
									<input type="text" class="inputWrap" autocomplete="off">
									<input type="hidden" class="customer_id" value="-1">
								</div>
								<div class="f_l ml10" style="height:40px;line-height:40px;">
									<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,6)">
									<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="add(this,6)" class="plus">
								</div>
							</div>
							<div class="info_explain f_l ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请填写主要客户</div>
						</div>
						<button id="saveProductInfo" class="save" onclick="saveProductInfo(this)">保存</button>
					</div>
				</div>
				<!--产品信息浏览  -->
				<div class="forRead con productInfo" id="productInfoForRead">
					<div class="title">产品信息<span class="now_edit c999 f_r mr20">未填写<span class="rightnow" onClick="showTurnEdit(this)">&nbsp;现在去填</span></span></div>
					<div class="main clearfix">
						<div class="clearfix">
							<span class="name3 f_l">供应品类<span class="warn">*</span></span>
							<div class="sortChoosed f_l">
								<ul class="clearfix allSorts">
								</ul>
							</div>
						</div>
						<div class="clearfix mt20">
							<span class="name3 f_l">主要销售产品及品牌<span class="warn">*</span></span>
							<ul id="saleProductForRead" class="sortChoosed f_l ml20">
								<!-- <li><span class="pro">产品名称</span><span class="brand">品牌名称</span></li> -->
							</ul>
						</div>
						<div class="clearfix mt20">
							<span class="name3 f_l">主要原材料及品牌<span class="warn">*</span></span>
							<ul id="materialForRead" class="sortChoosed f_l ml20">
								<!-- <li><span class="pro">材料名称</span><span class="brand">品牌名称</span></li> -->
							</ul>
						</div>
						<div class="clearfix mt20">
							<span class="name3 f_l">主要竞争对手<span class="warn">*</span></span>
							<ul id="competitorForRead" class="sortChoosed f_l ml20">
								<!-- <li><span class="compi">竞争对手1</span></li> -->
							</ul>
						</div>
						<div class="clearfix mt20">
							<span class="name3 f_l">主要客户</span>
							<span class="noinfo" >未填写</span>
							<ul id="customerForRead" class="sortChoosed f_l ml20">
								<!-- <li><span class="customer">主要客户1</span></li> -->
							</ul>
						</div>
						<button class="edit" onClick="showTurnEdit(this)">编辑</button>
					</div>
				</div>
				<div class="div_split bg_grey"></div>
				<!--门户信息编辑  -->
				<div id="companyInfoForEdit" class="con companyInfo forEdit">
					<div class="title">门户信息</div>
					<div class="main clearfix">
						<span class="name1">企业形象</span>
						<div id="company_window_pic" class="corporateImage clearfix">
							<div class="pic f_l image_block_pic">
								<a><img id="company_logo" class="frame" src="/vip/resources/images/applyAccess/imgBg.png"></a>
								<input type="file" id="company_logo_pic" class="uploadfile_input" name="file" onChange="showPicForVip(this)">
							</div>
							<div class="pic ml10 f_l">
								<p class="type">企业LOGO</p>
								<p class="tip">建议图片尺寸120*120px</p>
								<p class="tip">图片大小不超过5M</p>
							</div>
							<div class="pic ml10 f_l image_block_pic">
								<a><img id="company_image" class="frame" src="/vip/resources/images/applyAccess/imgBg.png"></a>
								<input type="file" id="company_image_pic" class="uploadfile_input" name="file" onChange="showPicForVip(this)">
							</div>
							<div class="pic ml10 f_l image_block_pic">
								<p class="type">企业形象图</p>
								<p class="tip">建议图片尺寸1024*354px</p>
								<p class="tip">图片大小不超过5M</p>
							</div>
						</div>
						<span class="name1 mt20">厂容厂貌</span>
						<ul class="company_equipment_imgs environment clearfix">
							<li>
								<div class="pic image_block_pic">
									<a><img id="company_fact" class="frame" src="/vip/resources/images/applyAccess/imgBg.png"></a>
									<input type="file" id="company_fact_pic" class="uploadfile_input" name="file" onChange="addImg(this,24)">
									<div class="tip">图片大小不超过5M</div>
								</div>
							</li>
						</ul>
						<span class="name1 mt20">企业简介</span>
						<div class="companyIntroduce">
							<textarea id="companyIntroduction" class="introduce" onkeyup="checkLen(this)"></textarea>
							<div class="wordsCount">总共可输入<b>400</b>字，剩余<b class="residue">400</b>字</div>
						</div>
						<button id="saveWinInfo" class="save" onClick="saveWinInfo(this)">保存</button>
					</div>
				</div>
				<!--门户信息浏览  -->
				<div class="forRead con companyInfo" id="companyInfoForRead">
					<div class="title">门户信息<span class="now_edit c999 f_r mr20">未填写<span class="rightnow" onClick="showTurnEdit(this)">&nbsp;现在去填</span></span></div>
					<div class="main clearfix">
						<span class="name1">企业形象</span>
						<span class="noinfo">未上传</span>
						<div class="corporateImage clearfix">
							<div class="pic f_l" id="company_logo_read" >
<!-- 								<img src="/vip/resources/images/applyAccess/a.jpg" class="frame"> -->
<!-- 								<p class="type mt10 t_algin_c">企业LOGO</p> -->
							</div>
							<div class="pic ml10 f_l" id="company_image_read">
<!-- 								<img   src="/vip/resources/images/applyAccess/a.jpg" class="frame"> -->
<!-- 								<p class="type mt10 t_algin_c">企业形象图</p> -->
							</div>
						</div>
						<span class="name1 mt20">厂容厂貌</span>
						<span class="noinfo">未上传</span>
						<div class="company_equipment_imgs_read environment clearfix">
							<!-- <div class="pic f_l">
								<img src="/vip/resources/images/applyAccess/a.jpg" class="frame">
								<p class="type mt10 t_algin_c">企业LOGO</p>
							</div>
							<div class="pic f_l ml10">
								<img src="/vip/resources/images/applyAccess/a.jpg" class="frame">
								<p class="type mt10 t_algin_c">企业LOGO</p>
							</div> -->
						</div>
						<div class="clearfix mt20">
							<span class="name1 f_l">企业简介</span>
							<span class="noinfo">未填写</span>
							<div id="companyIntroductionForRead" class="showCompanyIntroduce f_l"><!-- 湖州宏升箱包有限公司是集专业设计、开发、生产、经营、出口户外休闲用品的大型外向型企业，公司
								注册资本1200万美元，公司占地面积500余亩，是中国最具规模的户外休闲用品提供商。是一家大型休闲用品公司。 --></div>
						</div>
						<button class="edit" onClick="showTurnEdit(this)">编辑</button>
					</div>
				</div>
				<div class="div_split bg_grey"></div>
				<!--规模能力编辑  -->
				<div id="scalepowerInfoForEdit" class="con scalepowerInfo forEdit">
					<div class="title">规模能力</div>
					<div class="main clearfix">
						<span class="name1">员工人数</span>
						<div class="clearfix item"><div class=" f_l"><input id="emplyees" type="text" class="inputWrap2 people_num" autocomplete="off"></div><div class="f_l ml10 unit">人</div>	<div class="info_explain f_l ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的人数</div></div>
						<span class="name1 mt20">其他人员</span>
						<div class="item" id="other_person">
							<div class="clearfix part">
								<div style="width:350px;" class="clearfix f_l">
									<div class="selectWrap2 clearfix f_l">
										<div class="posR f_l" >
											<div class="clearfix left" onclick="showSelect(this)"><span class="c999 fNormal" value="">请选择</span>
												<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5">
											</div>
											<ul class="otherPeopleList posA hide">
												<li value="1" onclick="selectOption(this)">研发人员</li>
								 				<li value="2" onclick="selectOption(this)">操作工</li>
								 				<li value="3" onclick="selectOption(this)">专职检验</li>
								 				<li value="4" onclick="selectOption(this)">间接员工</li>
								 				<li value="5" onclick="selectOption(this)">内审人员</li>
											</ul>
										</div>
										<div class="right f_l"><input type="text" value="" autocomplete="off" class="people_num"></div>
									</div>
									<div class="f_l ml10 unit">人</div>
								</div>
								<div class="f_l ml10 op_img" style="height:40px;line-height:40px;">
									<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this)">
									<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="scalepowerAdd(this,1)" class="plus">
								</div>
							</div>
								<div class="info_explain"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的人数</div>
						</div>
						<span class="name1 mt20">人员结构</span>
						<div class="item" id="person_structure">
							<div class="clearfix part">
								<div style="width:350px;" class="clearfix f_l">
									<div class="selectWrap2 clearfix f_l">
										<div class="posR f_l" >
											<div class="clearfix left" onclick="showSelect(this)"><span class="c999 fNormal" value="">请选择</span>
												<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5">
											</div>
											<ul class="personStructureList posA hide" >
												<li value="1" onclick="selectOption(this)">大专及以上</li>
												<li value="3" onclick="selectOption(this)">大专以下</li>
											</ul>
										</div>
										<div class="right f_l"><input type="text" value="" autocomplete="off" class="people_num"></div>
									</div>
									<div class="f_l ml10 unit">人</div>
								</div>
								<div class="f_l ml10 op_img" style="height:40px;line-height:40px;">
									<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this)">
									<img src="/vip/resources/images/applyAccess/plus.png" class="ml20"  onclick="scalepowerAdd(this,2)" class="plus">
								</div>
							</div>
							<div class="info_explain "><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的人数</div>
						</div>
						<hr class="hr_dashed">
						<span class="name1 mt20">质量控制</span>
						<div id="qualityControl" class="radioWrap">
							<div class="inputRadio f_l  ml20"><input type="radio" name="quality" value="0" autocomplete="off">内部</div>
							<div class="inputRadio f_l"><input type="radio" name="quality" value="1" autocomplete="off">第三方</div>
							<div class="inputRadio f_l"><input type="radio" name="quality" value="2" autocomplete="off">无</div>
						</div>
						<span class="name1 mt20">OEM代加工</span>
						<div id="isOem" class="radioWrap">
							<div class="inputRadio f_l ml20"><input type="radio" name="OEM" value="0" autocomplete="off">提供</div>
							<div class="inputRadio f_l"><input type="radio" name="OEM" value="1" autocomplete="off">不提供</div>
						</div>
						<hr class="hr_dashed">
						<span class="name1 mt20">年营业额</span>
						<div id="turnover_currency_id" style="width:350px;" class="clearfix item">
							<div class="selectWrap2 clearfix f_l">
								<div class="posR f_l" >
									<div class="clearfix left" onclick="showSelect(this)">
										<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5">
									</div>
									<ul class="moneyTypeList posA hide ">
									</ul>
								</div>
								<div class="right f_l"><input id="turnover" type="text" autocomplete="off" class="money_test"></div>
							</div>
							<div class="f_l ml10" style="line-height:40px;font-size:14px;font-weight:bold;">万</div>
							<div class="info_explain f_l ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的金额</div>
						</div>
						<span class="name1 mt20">年出口额</span>
						<div id="export_currency_id" style="width:350px;" class="clearfix item">
							<div class="selectWrap2 clearfix f_l">
								<div class="posR f_l" >
									<div class="clearfix left" onclick="showSelect(this)">
										<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5">
									</div>
									<ul class="moneyTypeList posA hide ">
									</ul>
								</div>
								<div class="right f_l"><input id="exportNum" type="text" autocomplete="off"  class="money_test"></div>
							</div>
							<div class="f_l ml10" style="line-height:40px;font-size:14px;font-weight:bold;">万</div>
							<div class="info_explain f_l ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的金额</div>
						</div>
						<span class="name1 mt20">年进口额</span>
						<div id="import_currency_id" style="width:350px;" class="clearfix item">
							<div class="selectWrap2 clearfix f_l">
								<div class="posR f_l" >
									<div class="clearfix left" onclick="showSelect(this)">
										<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5">
									</div>
									<ul class="moneyTypeList posA hide ">
									</ul>
								</div>
								<div class="right f_l"><input id="importNum" type="text" autocomplete="off"  class="money_test"></div>
							</div>
							<div class="f_l ml10" style="line-height:40px;font-size:14px;font-weight:bold;">万</div>
							<div class="info_explain f_l ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入正确的金额</div>
						</div>
						<hr class="hr_dashed">
						<span class="name1">企业面积</span>
						<div class="clearfix item"><div class=" f_l"><input id="companyArea" type="text" class="inputWrap2 size_test" autocomplete="off" ></div><div class="f_l ml10 unit">平方米</div><div class="info_explain f_l ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入数字</div></div>
						<span class="name1 mt20">厂房面积</span>
						<div class="clearfix item"><div class=" f_l"><input id="factoryArea" type="text"  class="inputWrap2 size_test" autocomplete="off" ></div><div class="f_l ml10 unit">平方米</div><div class="info_explain f_l ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请输入数字</div></div>
						<span class="name1 mt20">产权</span>
						<div  id="factory_owner" class="posR">
							<div class="selectWrap3 clearfix" onclick="showSelect(this)">
								<img src="/vip/resources/images/applyAccess/arrowDown.png" class="f_r mr5">
							</div>
							<ul class="propertyList posA ">
								<li value="1" onclick="selectOption(this)">租赁</li>
								<li value="2" onclick="selectOption(this)">自建</li>
							</ul>
						</div>
						<span class="name1 mt20">使用年限</span>
						<div class="clearfix">
							<div class=" f_l"><input id="useBegintime" type="text" class="Wdate inputWrap2" onclick='WdatePicker({readOnly:true})' autocomplete="off"></div>
							<div style="width:30px;height:40px;line-height:40px;text-align:center;float:left;color:#ccc;">—</div>
							<div class=" f_l"><input id="useEndtime" type="text" class="Wdate inputWrap2" onclick='WdatePicker({readOnly:true})' autocomplete="off"></div>
							<span class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请填写完整使用年限</span>
						</div>	
						<button id="saveScaleInfo" class="save" onClick="saveScaleInfo(this)">保存</button>
					</div>
				</div>
				<!--规模能力浏览  -->
				<div class="forRead con scalepowerInfo" id="scalepowerInfoForRead">
					<div class="title">规模能力<span class="now_edit c999 f_r mr20">未填写<span class="rightnow" onClick="showTurnEdit(this)">&nbsp;现在去填</span></span></div>
					<div class="main clearfix">
						<p>
							<span class="name1">员工人数</span>
							<span class="span_con"><span class="noinfo">未填写</span><span class="dataForReg"><span id="emplyeesForRead"></span>人</span> 
							</span>
						</p>
						<div class="clearfix mt10" >
							<span class="name1 f_l">其他人员</span>
							<span class="noinfo">未填写</span> 
							<div id="other_personForRead" class="f_l">
								<ul class="list">
									<!-- <li><span class="otherPeople">研发人员</span><span class="span_con ml20">200 人</span></li>
									<li><span class="otherPeople">专职检验</span><span class="span_con ml20">200 人</span></li> -->
								</ul>
							</div>
						</div>
						<div class="clearfix mt10" >
							<span class="name1 f_l">人员结构</span>
							<span class="noinfo">未填写</span>
							<div id="person_structureForRead" class="f_l">
								<ul class="list">
									<li><span class="otherPeople"><!-- 本科及以上 --></span><span class="span_con ml20"><!-- 200 人 --></span></li>
									<li><span class="otherPeople"><!-- 大专 --></span><span class="span_con ml20"><!-- 200 人 --></span></li>
								</ul>
							</div>
						</div>
						<p class="mt50"><span class="name1">质量控制</span><span id="qulityControlForRead" class="span_con"><span class="noinfo">未填写</span> </span></p>
						<p class="mt10"><span class="name1">OEM代加工</span><span id="OEMStyleForRead" class="span_con"><span class="noinfo">未填写</span> </span></p>
						<p class="mt50"><span class="name1">年营业额</span><span class="span_con"><span class="noinfo">未填写</span><span class="dataForReg"><span id="turnoverForRead"></span>万 <span id="turnover_currency_idForRead"></span></span></span></p>
						<p class="mt10"><span class="name1">年出口额</span><span class="span_con"><span class="noinfo">未填写</span><span class="dataForReg"><span id="exportNumForRead"></span>万 <span id="export_currency_idForRead"></span></span></span></p>
						<p class="mt10"><span class="name1">年进口额</span><span class="span_con"><span class="noinfo">未填写</span><span class="dataForReg"><span id="importNumForRead"></span>万 <span id="import_currency_idForRead"></span></span></span></p>
						<p class="mt50"><span class="name1">企业面积</span><span class="span_con"><span class="noinfo">未填写</span><span class="dataForReg"><span id="companyAreaForRead"></span><span>平方米</span></span></span></p>
						<p class="mt10"><span class="name1">厂房面积</span><span class="span_con"><span class="noinfo">未填写</span><span class="dataForReg"><span id="factoryAreaForRead"></span><span>平方米</span></span></span></p>
						<p class="mt10"><span class="name1">产权</span><span id="factory_ownerForRead" class="span_con"><span class="noinfo">未填写</span></span></p>
						<p class="mt10">
							<span class="name1">使用年限</span>
							<span class="span_con">
								<span class="noinfo">未填写</span>
								<span class="dataForReg">
									<span id="useBegintimeForRead"></span>
									&nbsp;-&nbsp;
									<span id="useEndtimeForRead"></span>
								</span>
							</span>
						</p>
						<button class="edit" onClick="showTurnEdit(this)">编辑</button>
					</div>
				</div>
				<div class="div_split bg_grey"></div>
				<!--设备清单编辑  -->
				<div id="machineInfoForEdit" class="con machineInfo forEdit">
					<div class="title">设备清单</div>
					<div class="main clearfix">
						<span class="name1">设备清单<span class="warn">*</span></span>
						<div class="clearfix">
							<div class="name_wrap3 f_l">设备名称<span class="warn">*</span></div>
							<div class="name_wrap1 f_l">设备规格</div>
							<div class="name_wrap2 f_l">产地</div>
							<div class="name_wrap1 f_l">价值(万元)</div>
							<div class="name_wrap3 f_l">购买日期</div>
							<div class="name_wrap1 f_l">数量<span class="warn">*</span></div>
							<div class="name_wrap1 f_l">先进性</div>
						</div>
						<div class="item" id="machineList">
							<div class="clearfix part">
								<div class="f_L">
									<input type="text" class="wrap3 f_l machineName input_must" autocomplete="off" >
									<input type="text" class="wrap1 f_l" autocomplete="off">
									<input type="text" class="wrap2 f_l" autocomplete="off">
									<input type="text" class="wrap1 f_l machinePrice" autocomplete="off" >
									<input type="text" class="Wdate wrap3 f_l" onclick="WdatePicker({maxDate:'%y-%M-%d',readOnly:true})" autocomplete="off" >
									<input type="text" class="machineAmount wrap1 f_l input_must" autocomplete="off" >	
									<input type="text" class="wrap1 f_l" autocomplete="off">
									<input type="hidden" class="device_id" value="-1">
								</div>
								<div class="f_l ml10" style="height:40px;line-height:40px;">
									<img src="/vip/resources/images/applyAccess/binGrey.png" onclick="del(this,7)">
									<img src="/vip/resources/images/applyAccess/plus.png" class="ml20" onclick="addMachineList(this)" class="plus">
								</div>
							</div>
							<div class="info_explain ml10"><img src="/vip/resources/images/applyAccess/er.png">设备名称和数量不可为空</div>
						</div>
						<button id="saveDeviceInfo" class="save" onClick="saveDeviceInfo(this)">保存</button>
					</div>
				</div>
				<!--设备清单浏览  -->
				<div class="forRead con machineInfo"  id="machineInfoForRead">
					<div class="title">设备清单<span class="now_edit c999 f_r mr20">未填写<span class="rightnow" onClick="showTurnEdit(this)">&nbsp;现在去填</span></span></div>
						<div class="main clearfix">
							<span class="name1 f_l">设备清单<span class="warn">*</span></span>
							<div class=" f_l">
								<table id="machineTable" class="machineTable">
									<!-- <tr>
										<th >设备名称</th>
										<th >设备规格</th>
										<th >产地</th>
										<th >价值(万元)</th>
										<th >购买日期</th>
										<th >数量</th>	
										<th>先进性</th>
									</tr>
									<tr>
										<td>设备名称1</td>
										<td>1000*10</td>
										<td>杭州</td>
										<td>10000</td>
										<td>2016-10-17</td>
										<td>60</td>
										<td>先进</td>
									</tr> -->
								</table>
							</div>
							<button class="edit" onClick="showTurnEdit(this)">编辑</button>
						</div>
				</div>
				<div class="div_split bg_grey"></div>
				<!--院校合作编辑  -->
				<div id="schoolCooperationForEdit" class="con schoolCooperation forEdit">
					<div class="title">院校合作</div>
					<div class="main clearfix">
						<span class="name1 mt20">院校合作</span>
						<div class="cooperationIntroduce">
							<textarea id="schoolCoop" class="introduce" onkeyup="checkLen(this)"></textarea>
							<div class="wordsCount">总共可输入<b>400</b>字，剩余<b class="residue">102</b>字</div>
						</div>
						<span class="name1 mt20">附件资料</span><span class="regular">请选择5M以下.doc/.docx;.ppt/.pptx/.pps;.xls/.xlsx;.pdf;.txt文件</span>
						<div class="fileList">
							<div id="coopperationFileList">
								<!-- <div class="file">
									<a class="regular f14">某个学院合作的相关资料.doc </a>
									<span class="c999 ml20">2016-10-13 10:16:10</span>
									<img class="ml20" src="/vip/resources/images/applyAccess/binGrey.png">
								</div>
								<div class="file">
									<a class="regular f14">某个学院合作的相关资料.doc</a>
									<span class="c999 ml20">2016-10-13 10:16:10</span>
									<img class="ml20" src="/vip/resources/images/applyAccess/binGrey.png">
								</div> -->
							</div>
							<!-- <div class="upload">上传文件<input type="file" class="uploadfile_input"></div> -->
							<div class="upload">
								上传文件
								<input type="file" id="cooperation_attach_file" class="uploadfile_input" name="file" onChange="addText(this,30)">
							</div>
						</div>
						<button id="saveCooperationInfo" class="save" onClick="saveCooperationInfo(this)">保存</button>
					</div>
				</div>
				<!--院校合作浏览  -->
				<div class="forRead con schoolCooperation" id="schoolCooperationForRead">
					<div class="title">院校合作<span class="now_edit c999 f_r mr20">未填写<span class="rightnow" onClick="showTurnEdit(this)">&nbsp;现在去填</span></span></div>
					<div class="main clearfix">
						<div class="clearfix mt20">
							<span class="name1 f_l">院校合作</span>
							<span class="noinfo">未填写</span>
							<div id="schoolCoopForRead" class="showCooperationIntroduce f_l">
<!-- 							浙江泰普森休闲用品有限公司是集专业设计、开发、生产、经营、出口户外休闲用品的0浙江泰普森休闲 -->
<!-- 							用品有限公司是集专业设计、开发、生产、经营、出口户外休闲用品的0浙江泰普森休闲用品有限公司是 -->
<!-- 							集专业设计、开发、生产、经营、出口户外休闲用品的0浙江泰普森休闲用品有限公司是集专业设计、开 -->
<!-- 							发、生产、经营、出口户外休闲用品的0浙江泰普森休闲用品有限公司是集专业设计、开发、生产、经营、 -->
<!-- 							出口户外休闲用品的0浙江泰普森休闲用品有限公司是集专业设计、开发、生产、经营。 -->
							</div>
						</div>
						<div id="coopperationFileListRead" class="fileList" style="margin-left:88px;">
							<!-- <div class="file"><a class=" f14" style="color:#2170e8">某个学院合作的相关资料.doc </a><span class="c999 ml20">2016-10-13 10:16:10</span></div>
							<div class="file"><a class=" f14" style="color:#2170e8">某个学院合作的相关资料.doc </a><span class="c999 ml20">2016-10-13 10:16:10</span></div> -->
						</div>
						<button class="edit" onClick="showTurnEdit(this)">编辑</button>
					</div>
				</div>
				<div class="div_split bg_grey"></div>
				<!--资质证书编辑  -->
				<div id="certificationForEdit" class="con certification forEdit">
					<div class="title">资质及证书</div>
					<div class="main clearfix">
						<span class="name1">管理认证体系</span>
						<div class="clearfix">
							<div class="radioWrap f_l">
								<div class="inputRadio f_l ml20"><input type="radio" name="authentication" value="1" autocomplete="off">无</div>
								<div class="inputRadio f_l"><input type="radio" name="authentication" value="2" autocomplete="off">ISO9000</div>
								<div class="inputRadio f_l"><input type="radio" name="authentication" value="3" autocomplete="off">ISO14000</div>
								<div class="inputRadio f_l"><input type="radio" name="authentication" value="4" onclick="showInput(this)" autocomplete="off">其他认证</div>
							</div>
							<div class="inputWrap5 f_l" style="height:18px;display:none;"><input id="otherCerName" type="text" autocomplete="off" style="font-size:14px;font-weight:bold;color:#4c4c4c;outline:none;width:280px;height:20px;padding:0px;border:none;"></div>
						</div>
						<div class="image1 clearfix">
							<div class="pic image_block_pic">
								<a><img id="management_system" class="frame" src="/vip/resources/images/applyAccess/imgBg.png"></a>
								<input type="file" id="management_system_pic" class="uploadfile_input" name="file" onChange="showPicForVip(this)">
							</div>
							<div class="pic ml10">
								<p class="type">认证证书</p>
								<p class="tip">图片大小不超过5M</p>
								<div class="mt60 info_explain"><img src="/vip/resources/images/applyAccess/er.png" class="mr10">请上传认证证书</div> 
							</div>
						</div>
						<span class="name1 mt20">专利</span>
						<ul class="patent_imgs image2 clearfix">
							<!-- <div class="pic">
								<a><img src="/vip/resources/images/applyAccess/imgBg.png" class="frame"></a><input type="file" class="uploadfile_input">***************
								<div class="tip">图片大小不超过5M</div>
							</div> -->
							<li>
								<div class="pic image_block_pic">
									<a><img id="company_fact" class="frame" src="/vip/resources/images/applyAccess/imgBg.png"></a>
									<input type="file" id="patent" class="uploadfile_input" name="file" onChange="addImg(this,26)">
									<div class="tip">图片大小不超过5M</div>
								</div>
							</li>
						</ul>
						<span class="name1 mt20">其他资质</span>
						<ul class="other_intelligence_imgs image2 clearfix">
							<!-- <div class="pic">
								<a><img src="/vip/resources/images/applyAccess/imgBg.png" class="frame"></a><input type="file" class="uploadfile_input">
								<div class="tip">图片大小不超过5M</div>
							</div> -->
							<li>
								<div class="pic image_block_pic">
									<a><img id="company_fact" class="frame" src="/vip/resources/images/applyAccess/imgBg.png"></a>
									<input type="file" id="other_intelligence_imgs" class="uploadfile_input" name="file" onChange="addImg(this,27)">
									<div class="tip">图片大小不超过5M</div>
								</div>
							</li>
						</ul>
						<button id="saveCertificateInfo" class="save" onClick="saveCertificateInfo(this)">保存</button>
					</div>
				</div>
				<!--资质证书浏览  -->
				<div class="forRead con certification" id="certificationForRead">
					<div class="title">资质及证书<span class="now_edit c999 f_r mr20">未填写<span class="rightnow" onClick="showTurnEdit(this)">&nbsp;现在去填</span></span></div>
					<div class="main clearfix">
						<span class="name1">管理认证体系</span>
						<span class="certificationName"></span>
						<span class="noinfo">未上传</span>
						<div class="image1 clearfix">
							<div class="pic" id="management_system_read">
<!-- 								<img  src="/vip/resources/images/applyAccess/a.jpg" class="frame"> -->
<!-- 								<p class="type mt10 f14 t_algin_c">认证证书</p> -->
							</div>
						</div>
						<span class="name1 mt20">专利</span>
						<span class="noinfo">未上传</span>
						<div class="patent_imgs_read image2 clearfix">
<!-- 							<div class="pic"> -->
<!-- 								<img src="/vip/resources/images/applyAccess/a.jpg" class="frame"> -->
<!-- 								<p class="type mt10 f14 t_algin_c">专利</p> -->
<!-- 							</div> -->
<!-- 							<div class="pic"> -->
<!-- 								<img src="/vip/resources/images/applyAccess/a.jpg" class="frame"> -->
<!-- 								<p class="type mt10 f14 t_algin_c">专利</p> -->
<!-- 							</div> -->
<!-- 							<div class="pic"> -->
<!-- 								<img src="/vip/resources/images/applyAccess/a.jpg" class="frame"> -->
<!-- 								<p class="type mt10 f14 t_algin_c">专利</p> -->
<!-- 							</div> -->
<!-- 							<div class="pic"> -->
<!-- 								<img src="/vip/resources/images/applyAccess/a.jpg" class="frame"> -->
<!-- 								<p class="type mt10 f14 t_algin_c">专利</p> -->
<!-- 							</div> -->
<!-- 							<div class="pic"> -->
<!-- 								<img src="/vip/resources/images/applyAccess/a.jpg" class="frame"> -->
<!-- 								<p class="type mt10 f14 t_algin_c">专利</p> -->
<!-- 							</div> -->
						</div>
						<span class="name1 mt20">其他资质</span>
						<span class="noinfo">未上传</span>
						<div class="other_intelligence_imgs_read image2 clearfix">
							<!-- <div class="pic">
								<img src="/vip/resources/images/applyAccess/a.jpg" class="frame">
								<p class="type mt10 f14 t_algin_c">专利</p>
							</div>
							<div class="pic ml10">
								<img src="/vip/resources/images/applyAccess/a.jpg" class="frame">
								<p class="type mt10 f14 t_algin_c">专利</p>
							</div>
							<div class="pic ml10">
								<img src="/vip/resources/images/applyAccess/a.jpg" class="frame">
								<p class="type mt10 f14 t_algin_c">专利</p>
							</div>
							<div class="pic ml10">
								<img src="/vip/resources/images/applyAccess/a.jpg" class="frame">
								<p class="type mt10 f14 t_algin_c">专利</p>
							</div> -->
						</div>
						<button class="edit" onClick="showTurnEdit(this)">编辑</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--底端-->
	<div id="bottom"></div>
	<%@ include file="/newresources/js/base.jsp" %>
<!-- 	<script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- 	<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- 	<script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- 	<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
	<script type="text/javascript" src="/vip/usercenter/saleManage/accessManage/js/vipApplyAccess.js"></script>
	<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="/newresources/js/companyClass.js"></script>
	<script type="text/javascript" src="/newresources/js/companyNature.js"></script>
	<script type="text/javascript" src="/newresources/js/cityOperate.js"></script>
	<script type="text/javascript" src="/newresources/js/currency.js"></script>
	<script type="text/javascript" src="/newresources/js/cityJsonData.js"></script>
	<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=4i6arTpbQQ1MfIcFRuoHyXKc"></script>
	<script type="text/javascript" src="/vip/resources/js/jquery.mCustomScrollbar.concat.min.js" ></script>
	</body>
</html>
