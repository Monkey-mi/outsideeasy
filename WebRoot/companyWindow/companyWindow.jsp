<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>企业门户</title>
	<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
	<link href='/newresources/css/xcConfirm.css' rel='stylesheet' /> 
	<link href="/newresources/css/companyWindow.css" rel="stylesheet" type="text/css" />
	</head>
	<body>
	<div id="top" class="bg_grey"></div>
	<div class="midd_wrap clearfix">
		<div class="company_simple_intro_wrap">
			<div id="companyLogo" style="height:60px;width:60px;text-align:center;"><!-- 企业logo展示 --></div>
			<div class="company_simple_info_wrap">
				<div class="hide"><span id="company_name"></span><span id="companyClassTop"></span></div>
				<div class="access_time_wrap hide"><span id="access_time"></span>入驻</div>
			</div>
		</div><!-- 公司名和简单介绍 -->
		<!-- <div class="navigation_tool">
			<ul>
				<li><a>首页</a></li>
				<li><a>企业信息</a></li>
				<li><a>采购门户</a></li>
				<li><a>销售门户</a></li>
			</ul>
		</div> --><!-- 导航条 -->
		<div id="companyFace">
			<img alt="" src="">
		</div><!-- 企业形象图 -->
		<div class="company_more_info ml10 mr10">
			<div class="info_select_wrap">
				<ul>
					<li><span>基本信息</span><!-- <span class="orangeColor fs16 floatR">|</span> --></li>
					<!-- <li><span>认证信息</span><span class="orangeColor fs16 floatR">|</span></li>
					<li><span>交易信息</span></li> -->
				</ul>
			</div>
			<div id="baseInfo_wrap" class="info_show_wrap">
				<div class="baseInfo_show_wrap floatL hide">
					<div class="company_name_score">
						<span id="company_name_small"></span>
						<span class="score_des hide">供应商资质评分&nbsp;<span id="access_score"></span>分</span>
						<div class="certification_info_wrap"><span id="cer_truth">实名认证</span><span id="cer_supplier">认证供应商</span></div>
					</div>
					<div class="mt25">
						<label class="grey_color">经营模式</label>
						<span id="industryName"></span>
					</div>
					<div class="mt25">
						<label class="grey_color">管理体系</label>
						<span id="certificationSystem"></span>
					</div>
					<div class="mt25">
						<label class="grey_color">所属行业</label>
						<span id="companyClass"> </span>
					</div>
					<div class="mt25">
						<label class="grey_color">联系地址</label>
						<span id="contactAddr"></span>
					</div>
					<div class="contact_info mt25 clearfix ">
						<label class="grey_color f_l">联系人</label>
						<span id="contacts f_l" ></span>
						<div id="fPhone" class="information f_l"><img src="/newresources/images/telePnone.png" class="icon"><div class="info hide"></div></div>
						<div id="mPhone" class="information f_l"><img src="/newresources/images/mobilePhone.png" class="icon"><div class="info hide"></div></div>
						<div id="fax" class="information f_l"><img src="/newresources/images/fax.png" class="icon"><div class="info hide"></div></div>
						<div id="email" class="information f_l"><img src="/newresources/images/email.png" class="icon"><div class="info hide"></div></div>
					</div>
					<div class="mt25">
						<div class="main_business_tip grey_color">主营业务</div>
						<div id="keyRemark"></div>
					</div>
				</div>
				<div id="location_map" class="floatR"></div>
			</div>
			<div id="certificationInfo_wrap" class="info_show_wrap" style="display:none;"></div>
			<div id="dealInfo_wrap" class="info_show_wrap" style="display:none;"></div>
		</div><!-- 基本/认证/交易 -->
		<div class="company_base_info_wrap ml10 mr10 mt25">
			<div class="title_wrap"><img alt="" src="/newresources/images/subtitle.png"><span>基本信息</span></div>
			<div class="company_base_info_show_wrap">
				<div id="company_license" class="company_license">
					<div id="company_license_right" class="next click_to_right top160 right0"><img alt="" src="/newresources/images/picRight.png"></div>
					<div id="company_license_left" class="prev click_to_left top160" style="display:none;"><img alt="" src="/newresources/images/picLeft.png"></div>
					<div class="items">
						<ul id="company_license_show_wrap"></ul>
					</div>
				</div>
				<div class="company_base_info_show">
					<div class="base_info_unit_show">
						<span class="base_info_tip grey_color">法人代表</span>
						<span id="corporation"></span>
					</div>
					<div class="base_info_unit_show">
						<span class="base_info_tip grey_color">注册资本</span>
						<span id="reg_fund_wrap"><span id="regFund"></span>万</span>
						<label id="reg_curreny"></label>
					</div>
					<div class="base_info_unit_show">
						<span class="base_info_tip grey_color">成立日期</span>
						<span id="regDate"></span>
					</div>
					<div class="base_info_unit_show">
						<span class="base_info_tip grey_color">企业类型</span>
						<span id="companyNature"></span>
					</div>
					<div class="base_info_unit_show clearB">
						<span class="base_info_tip grey_color">注册地址</span>
						<span id="regAddr"></span>
					</div>
					<div class="company_intro_title clearB">企业简介</div>
					<div class="company_intro_show clearB mr20">
						<p id="companyIntroduction"></p>
					</div>
				</div>
			</div>
		</div><!-- 基本信息 -->
		<div class="box_show_wrap ml10 mr10">
			<div class="box_show_title"><span class="ml10">主要销售产品及品牌</span></div>
			<div id="sale_product_show" class="box_show_info">
				<!-- <div class="next click_to_right top40 right0"><img alt="" src="/newresources/images/clickRight.png"></div> -->
				<div class="next unclick_to_right top40 right0"><img alt="" src="/newresources/images/unClickRight.png"></div>
				<!-- <div class="prev click_to_left top40"><img alt="" src="/newresources/images/clikLeft.png"></div> -->
				<div class="prev unclick_to_left top40" style="display:none;"><img alt="" src="/newresources/images/unClickLeft.png"></div>
				<div class="items">
					<ul id="sale_product_show_wrap">
						<!-- <li><div class="thing_name">海信洗衣机</div><div class="thing_brand">海信品牌0</div></li>
						<li><div class="thing_name">海信洗衣机</div><div class="thing_brand">海信品牌5</div></li> -->
					</ul>
				</div>
			</div>
		</div><!-- 主要销售 -->
		<div class="box_show_wrap ml10 mr10">
			<div class="box_show_title"><span class="ml10">主要采购产品及品牌</span></div>
			<div id="material_product_show" class="box_show_info">
				<!-- <div class="next click_to_right top40 right0"><img alt="" src="/newresources/images/clickRight.png"></div> -->
				<div class="next unclick_to_right top40 right0"><img alt="" src="/newresources/images/unClickRight.png"></div>
				<!-- <div class="prev click_to_left top40"><img alt="" src="/newresources/images/clikLeft.png"></div> -->
				<div class="prev unclick_to_left top40" style="display:none;"><img alt="" src="/newresources/images/unClickLeft.png"></div>
				<div class="items">
					<ul id="material_product_show_wrap">
						<!--<li><img alt="暂无信息" src="/newresources/images/noInfo.png"></li>
 						<li><div class="thing_name">海信洗衣机</div><div class="thing_brand">海信品牌0</div></li>
						<li><div class="thing_name">海信洗衣机</div><div class="thing_brand">海信品牌5</div></li> -->
					</ul>
				</div>
			</div>
		</div><!-- 主要采购 -->
		<div class="company_link ml10 mr10 mt20">
			<div class="company_link_select">
				<ul>
					<li onClick="companyLinkSelect(0)" class="curr">主要客户</li>
					<li onClick="companyLinkSelect(1)">主要竞争对手</li>
				</ul>
			</div>
			<div id="main_customer" class="main_customer company_link_show_wrap clearL" style="display:block;">
				<div class="next unclick_to_right top35 right0"><img alt="" src="/newresources/images/unClickRight.png"></div>
				<div class="prev unclick_to_left top35" style="display:none;"><img alt="" src="/newresources/images/unClickLeft.png"></div>
				<div class="items">
					<ul id="main_customer_show_wrap">
						<!-- <li>
							<div class="company_link_logo"><img alt="coustomer.png" src="/newresources/images/coustomer.png"></div>
							<div class="company_link_show_unit">
								<div class="grey_color">主要客户</div>
								<div>浙江瓯越家居有限公司1</div>
							</div>
						</li> -->
					</ul>
				</div>
			</div>
			<div id="main_competitor" class="main_competitor company_link_show_wrap clearL" style="display:none;">
				<div class="next unclick_to_right top35 right0"><img alt="" src="/newresources/images/unClickRight.png"></div>
				<div class="prev unclick_to_left top35" style="display:none;"><img alt="" src="/newresources/images/unClickLeft.png"></div>
				<div class="items">
					<ul id="main_competitor_show_wrap">
						<!-- <li>
							<div class="company_link_logo"><img alt="coustomer.png" src="/newresources/images/competitor.png"></div>
							<div class="company_link_show_unit">
								<div class="grey_color">主要竞争对手</div>
								<div>浙江瓯越家居有限公司</div>
							</div>
						</li> -->
					</ul>
				</div>
			</div>
		</div><!-- 主要客户   -->
		<div class="company_scale_wrap ml10 mr10 mt45">
			<div class="title_wrap"><img alt="" src="/newresources/images/subtitle.png"><span>规模能力</span></div>
			<ul>
				<li class="mr35 bg_orange_color">
 					<div class="company_scale_logo"><img alt="" src="/newresources/images/employee_logo.png"></div>
					<div class="company_scale_show_unit">
						<div>员工人数</div>
						<div class="fwblod hide"><span id="emplyees"></span>人</div>
					</div>
					<div class="company_scale_more">
						<div class="edu_employee_num">
							<span class="hide">本科以上<em id="collegeNum"></em>人</span>
							<span class="hide">大专<em id="diplomaNum"></em>人</span>
							<span class="hide">大专以下<em id="diplomaDownNum"></em>人</span>
						</div>
						<div id="type_employee_num" class="type_employee_num">
							<!-- <div class="employee_unit_show"><span>研发人员</span><span><em>*</em>人</span></div>
							<div class="employee_unit_show"><span>专职检测</span><span><em>*</em>人</span></div>
							<div class="employee_unit_show"><span>技工</span><span><em>*</em>人</span></div> -->
						</div>
					</div>
					<img alt="" src="/newresources/images/angle_up.png">
				</li>
				<li class="mr35 bg_green_color">
					<div class="company_scale_logo"><img alt="" src="/newresources/images/company_area_logo.png"></div>
					<div class="company_scale_show_unit">
						<div>企业面积</div>
						<div class="fwblod hide"><span id="companyArea"></span>㎡</div>
					</div>
					<div class="company_scale_more padT10 padB10">
						<div class="employee_unit_show"><span>厂房面积</span><span><em id="factoryArea"></em>㎡</span></div>
						<div class="employee_unit_show"><span>产权</span><span><em id="factoryOwner">租赁</em></span></div>
						<div class="employee_unit_show">
							<span>年限</span>
							<span id="start_end_time">
								<span>起：<em id="useBegintime">00-00-00</em></span>
								<span>止：<em id="useEndtime">00-00-00</em></span>
							</span>
						</div>
					</div>
					<img alt="" src="/newresources/images/angle_up.png">
				</li>
				<li class="bg_blue_color">
					<div class="company_scale_logo"><img alt="" src="/newresources/images/business_logo.png"></div>
					<div class="company_scale_show_unit">
						<div>OEM代加工</div>
						<div>贸易型</div>
					</div>
					<div class="company_scale_more padT10 padB10">
						<div class="employee_unit_show hide"><span>年出口额</span><span><em id="turnover"></em>万</span><label>美金[USD]</label></div>
						<div class="employee_unit_show hide"><span>年进口额</span><span><em id="exportNum"></em>万</span><label>人民币[RMB]</label></div>
						<div class="employee_unit_show hide"><span>年营业额</span><span><em id="importNum"></em>万</span><label>港元[HKD]</label></div>
					</div>
					<img alt="" src="/newresources/images/angle_up.png">
				</li>
			</ul>
			<div id="divice_list_warp" class="divice_list_warp ml10 mr10 padT20 clearL">
				<div class="scale_second_title">设备清单</div>
				<div id="divice_list_show_wrap" class="divice_list_show_wrap clearL">
					<!-- <div class="next click_to_right top40 right0"><img alt="" src="/newresources/images/clickRight.png"></div> -->
					<div class="next unclick_to_right top40 right0"><img alt="" src="/newresources/images/unClickRight.png"></div>
					<!-- <div class="prev click_to_left top40"><img alt="" src="/newresources/images/clikLeft.png"></div> -->
					<div class="prev unclick_to_left top40" style="display:none;"><img alt="" src="/newresources/images/unClickLeft.png"></div>
					<div class="items">
						<ul id="divice_list_show_warp">
							<!-- <li>
								<div class="device_name">设备名称设备名称设备名称</div>
								<div class="device_num"><span class="orangeColor">100</span>台</div>
		 						<div class="device_more_info">
									<div class="more_info_title_wrap mt8"><span class="device_standard_title height40">型号：</span><span>门幅2.5m门幅2.5m</span></div>
									<div class="more_info_title_wrap"><span class="device_standard_title">产地：</span><span>浙江产地</span></div>
									<div class="more_info_title_wrap"><span class="device_standard_title">价值：</span><span>50(万元)</span></div>
									<div class="more_info_title_wrap"><span class="device_standard_title">先进性：</span><span>中上</span></div>
								</div> 
							</li> -->
						</ul>
					</div>
				</div>
			</div><!-- 设备清单 -->
			<div class="college_coop_wrap ml10 mr10 padT20">
				<div class="scale_second_title">院校合作</div>
				<div id="schoolCoop" class="college_coop_show clearL"></div>
			</div><!-- 院校合作 -->
			<div id="company_attached_warp" class="company_attached_warp ml10 mr10">
				<!-- <div class="next click_to_right top20 right0"><img alt="" src="/newresources/images/clickRight.png"></div> -->
				<div class="next unclick_to_right top20 right0"><img alt="" src="/newresources/images/unClickRight.png"></div>
				<!-- <div class="prev click_to_left top20"><img alt="" src="/newresources/images/clikLeft.png"></div> -->
				<div class="prev unclick_to_left top20" style="display:none;"><img alt="" src="/newresources/images/unClickLeft.png"></div>
				<div class="items">
					<ul id="company_attached_show_warp">
						<!-- <li class="attached_unit">
							<div class="attached_logo"><img alt="" src="/newresources/images/attached_logo.png"></div>
							<div class="attached_name_time">
								<div class="attached_name" id="" title="">附件名称.doc</div>
								<div class="attached_time" id="">2016-06-14 14:41:14</div>
							</div>
						</li> -->
					</ul>
				</div>
			</div><!-- 附件名称 -->
		</div><!-- 规模能力 -->
		<div class="company_license_warp mr10 ml10 mt20 pb20">
			<div class="title_wrap"><img alt="" src="/newresources/images/subtitle.png"><span>企业自传证书</span></div>
			<div class="company_license_show_wrap">
				<div class="license_grid">
					<div class="license_type">企业基本资格证书</div>
					<div><img alt="" src="/newresources/images/licenseHr.png"></div>
					<div class="mt50"><img onClick="companyImgView(28)" alt="" src="/newresources/images/baseLisence.png"></div>
				</div>
				<div class="license_grid">
					<div class="license_type">其他资格证书</div>
					<div><img alt="" src="/newresources/images/licenseHr.png"></div>
					<div class="mt50"><img onClick="companyImgView(26)" alt="" src="/newresources/images/otherLicense.png"></div>
				</div>
				<div class="license_grid">
					<div class="license_type">更多证书</div>
					<div><img alt="" src="/newresources/images/licenseHr.png"></div>
					<div class="mt50"><img onClick="companyImgView(27)"alt=""  src="/newresources/images/moreLicense.png"></div>
				</div>
			</div>
		</div><!-- 企业自传证书 -->
		<div class="factory_pic_wrap mr10 ml10 hide">
			<div class="title_wrap"><img alt="" src="/newresources/images/subtitle.png"><span>厂容厂貌</span></div>
			<div id="factory_pic_show" class="factory_pic_show">
				<div id="factory_pic_right" class="next click_to_right top80 right0"><img alt="" src="/newresources/images/picRight.png"></div>
				<div id="factory_pic_left" class="prev click_to_left top80" style="display:none;"><img alt="" src="/newresources/images/picLeft.png"></div>
				<div class="items">
					<ul id="factory_pic_show_wrap">
						<!-- <li>
							<span></span><img alt="" src="http://img31.mtime.cn/pi/2014/08/28/152817.82250768_1000X1000.jpg">
						</li>
						<li>
							<span></span><img alt="" src="http://img31.mtime.cn/pi/2014/02/12/165842.97473696_1000X1000.jpg">
						</li>
						<li>
							<span></span><img alt="" src="http://img31.mtime.cn/pi/2014/08/28/152817.20722770_1000X1000.jpg">
						</li>
						<li>
							<span></span><img alt="" src="http://img31.mtime.cn/pi/2015/02/03/122829.80244261_1000X1000.jpg">
						</li>
						<li>
							<span></span><img alt="" src="http://img31.mtime.cn/pi/2014/02/12/165842.97473696_1000X1000.jpg">
						</li> -->
					</ul>
				</div>
			</div>
		</div><!-- 厂容厂貌 -->
	</div>
	<div id="bottom"></div>
	<%@ include file="/newresources/js/base.jsp" %>
<!--  	<script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- 	<script type="text/javascript" src="/newresources/js/base.js"></script> -->
	<script type="text/javascript" src="/newresources/js/companyClass.js"></script>
	<script type="text/javascript" src="/newresources/js/companyNature.js"></script>
<!-- 	<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=4i6arTpbQQ1MfIcFRuoHyXKc"></script>
	<script src="/companyWindow/js/companyWindow.js"></script>
	</body>
</html>