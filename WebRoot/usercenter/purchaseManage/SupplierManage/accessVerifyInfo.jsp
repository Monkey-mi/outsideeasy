<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>准入申请审核</title>
	<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
	<link href="/newresources/css/purchase.css" rel="stylesheet" type="text/css" />
	<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
	<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
	<link href="/newresources/css/jquery.treeview.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="bg_grey">
		<div class="mask_opacity"></div>
		<div id="top"></div>
		<!--中间-->
		<div class="midd_wrap clearfix">
			<div class="midd_left_wrap" style="width:180px;">
			</div>
			<div class="midd_right_wrap" style="width:834px">
				<p class="purchase_right_title"><span>准入申请审核</span></p>
				<p class="purchase_right_title titleForQuery hide"><span>准入申请查看</span></p>
				<div class="accessVerifyInfo">
					<div class="verifyResult" id="verifyResult">
						<div class="title">填写审核结果</div>
						<div class="mt20"><label>审核结果:</label><input type="radio" name="result" class="mr5" value="1" onclick="verifyResult(1)">审核通过<input type="radio" name="result" class="mr5 ml15" value="0" onclick="verifyResult(0)">退回修改</div>
						<div class="mt20 tagWrapforVerify"><label>标签:</label>
							<div class="posR editWrap" >
								<a class="blue edit" onclick="showfloatDiv(this)">编辑</a>	
								<div class="mask_opacity" onclick="mask_opacity_click(this)"></div>	
								<div class="posA hide floatSelectWrap" >
									<img class="triangle" src="/newresources/images/supplier/triangle.png" >
										<div id="tagBasicDataWrap" class="bg_white f_l showTag">
											<input type="hidden" class="supplierIdData"/>
											<div id="tagBasicDataShow" class="tagShow"><!-- 添加标签基础信息 --></div>
											<div class="pl8 addTag">+&nbsp;新建标签</div>
											<div class="saveTag hide"><input placeholder="新建标签"  class="newTag"/><div class="save f_r" onclick ="saveNewTag(this)">保存</div></div>
										</div>
								</div>
							</div>
							<div class="choosed"  id="tagsChecked"></div>
						</div>
						<div class="mt20 sortWrapforVerify"><label>供应品类:</label>
							<div class="posR editWrap">
								<a class="blue edit" onclick="showfloatDiv(this)">编辑</a>
								<div class="mask_opacity" onclick="mask_opacity_click_with_save(this)"></div>	
								<div class="posA hide floatSelectWrap" >
									<img class="triangle" src="/newresources/images/supplier/triangle.png" >
									<div class="productSort_update  bg_white clearfix " style="height:210px;">
										<div class="productSort_mid mt10" style="height:180px;">
											<ul id="sortTree" class="sorttree2 bg_white"></ul>
										</div>
									</div> 
								</div>
							</div>
							<ul id="productSort" class="choosed">
							
							</ul>
						</div>
						<div class="mt20 adviceWrapForVerify"><label>审核意见:</label><textarea class="verifyAdvice"></textarea></div>
						<div><button onclick="submitVerify()" class="submit">提交</button></div>
					</div>
					<div id="verifyRecords" class="verifyRecords" style="display:none;">
							<div class="title">审核记录</div>
							<!-- <div class="record">
								<label>审核结果:</label><span>审核通过</span><span class="splitLine">|</span>
								<label>提交时间:</label><span>2016-10-01</span><span class="ml10">16:16:16</span><span class="splitLine">|</span>
								<label>审核时间:</label><span>2016-10-01</span><span class="ml10">16:16:16</span>
							</div>
							<hr class="record_hr" />
							<div class="record">
								<label>审核结果:</label><span>退回修改</span><span class="splitLine">|</span>
								<label>提交时间:</label><span>2016-10-01</span><span class="ml10">16:16:16</span><span class="splitLine">|</span>
								<label>审核时间:</label><span>2016-10-01</span><span class="ml10">16:16:16</span>
								<div class="mt5"><label>审核意见:</label><span class="verifyAdvice">审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见</span></div>
							</div>
							<hr class="record_hr" />
							<div class="record">
								<label>审核结果:</label><span>退回修改</span><span class="splitLine">|</span>
								<label>提交时间:</label><span>2016-10-01</span><span class="ml10">16:16:16</span><span class="splitLine">|</span>
								<label>审核时间:</label><span>2016-10-01</span><span class="ml10">16:16:16</span>
								<div class="mt5"><label>审核意见:</label><span class="verifyAdvice">审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见审核意见</span></div>
							</div> -->
					</div>
					<div class="verifySupplierInfo">
						<div class="formTitle">
							<div class="name">浙江泰普森供应商准入申请</div>
							<div class="clearfix mt15" >
								<span class="f_l"><span class="company">申请企业:</span><span id="verifyCpyname" ></span></span>
								<span class="f_r"><span class="submitTime">提交时间:</span><span id="submitTime" ></span><!-- <span class="ml10">16:16:12</span> --></span>	
							</div>
						</div>
						<!--供应商档案开始  -->
						<div id="supplierFile"  class="offlineFactoryCheck" >
							<div style="background:#f6f6f6;width:100%;">
							<ul class="tab2 mr10" style="width:400px;">
								<li class="curr2" onClick="currtab2('#supplierFile',0)">基本信息<span class="split" style="color:#ccc;">|</span></li>
								<li onClick="currtab2('#supplierFile',1)">详细信息<span class="split" style="color:#ccc;">|</span></li>
								<li onClick="currtab2('#supplierFile',2)">规模能力<span class="split" style="color:#ccc;">|</span></li>
								<li onClick="currtab2('#supplierFile',3)">交易信息</li>
							</ul>
							</div>
							<!--基本信息开始-->
							<div id="base_info" class="supplier_baseInfo tabcon2" style="display:block;">
								<div class="ml20 mt10 clearfix">
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
								</div>
								<div class="display_inner_line_wrap ml20" style="width:90%;">
									<span class="label_wrap">公司证照</span>
								</div>
								<div id="company_licenses" class="buslicense_wrap mb20 clearfix" style="width:100%;">
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
									<div class="t_algin_r mr15 mt20">
										<button class="yellow_button" onClick="goNext(1)">下一页</button>
									</div>
							</div>
							<!--基本信息结束  -->
							<!--详细信息开始 -->
							<div id="detail_info" class="supplier_detailInfo tabcon2">
								<!-- <div class="ml20 mt20">
									<div class="display_inner_line_wrap">
										<span class="label_wrap">企业简称：</span>
										<span class="display_wrap">湖州宏升箱包邮箱公司</span>
									</div>
									<div class="display_inner_line_wrap" >
										<span class="label_wrap">联系地址：</span>
										<span class="display_wrap">浙江省杭州市通益路68号</span>
									</div>
									<div class="display_inner_line_wrap" >
										<span class="label_wrap">联系电话：</span>
										<span class="display_wrap">0571-56789100</span>
									</div>
									<div class="display_inner_line_wrap">
										<span class="label_wrap">联系人：</span>
										<span class="display_wrap">杨先生</span>
									</div>
									<div class="display_inner_line_wrap" >
										<span class="label_wrap">联系人手机：</span>
										<span class="display_wrap">18456651152</span>
									</div>
									<div class="display_inner_line_wrap">
										<span class="label_wrap">传真号：</span>
										<span class="display_wrap">0571-85596556</span>
									</div>
									<div class="display_inner_line_wrap" >
										<span class="label_wrap">Email：</span>
										<span class="display_wrap">4512451252@qq.com</span>
									</div>
								</div>
								<hr class="hr_grey clear" >	
								<div class="display_inner_line_wrap ml20 mt10">
									<span class="label_wrap">主要销售产品及品牌</span>
								</div>
									<div class=" mt10 ml20">
										<span class="font2">箱包</span><label class="ml10 font1">泰普森自营品牌、</label>
										<span class="font2">箱包</span><label class="ml10 font1">泰普森自营品牌、</label>
										<span class="font2">箱包</span><label class="ml10 font1">泰普森自营品牌、</label>
										<span class="font2">箱包</span><label class="ml10 font1">泰普森自营品牌、</label>
										<span class="font2">箱包</span><label class="ml10 font1">泰普森自营品牌、</label>
										<span class="font2">箱包</span><label class="ml10 font1">泰普森自营品牌、</label>
										<span class="font2">箱包</span><label class="ml10 font1">泰普森自营品牌、</label>
										<span class="font2">箱包</span><label class="ml10 font1">泰普森自营品牌</label>
									</div>
								<div class="display_inner_line_wrap ml20 mt10 ">
									<span class="label_wrap">主要原材料及品牌</span>
								</div>
									<div class="mt10 ml20">
											<span class="font2">帆布</span><label class="ml10 font1">泰普森自营品牌、</label>
											<span class="font2">五金拉链</span><label class="ml10 font1">泰普森自营品牌</label>
											<span class="font2">帆布</span><label class="ml10 font1">泰普森自营品牌、</label>
											<span class="font2">五金拉链</span><label class="ml10 font1">泰普森自营品牌</label>
											<span class="font2">帆布</span><label class="ml10 font1">泰普森自营品牌、</label>
											<span class="font2">五金拉链</span><label class="ml10 font1">泰普森自营品牌</label>
											<span class="font2">帆布</span><label class="ml10 font1">泰普森自营品牌、</label>
											<span class="font2">五金拉链</span><label class="ml10 font1">泰普森自营品牌</label>
											<span class="font2">帆布</span><label class="ml10 font1">泰普森自营品牌、</label>
											<span class="font2">五金拉链</span><label class="ml10 font1">泰普森自营品牌</label>
									</div>
								<div class="display_inner_line_wrap ml20 mt10">
									<span class="label_wrap">主要竞争对手</span>
								</div>
									<div class="mt10 ml20">
										<span class="font2">主要竞争对手</span>
										<span class="font2">主要竞争对手</span>
										<span class="font2">主要竞争对手</span>
										<span class="font2">主要竞争对手</span>
										<span class="font2">主要竞争对手</span>
										<span class="font2">主要竞争对手</span>
										<span class="font2">主要竞争对手</span>
										<span class="font2">主要竞争对手</span>
										<span class="font2">主要竞争对手</span>
										<span class="font2">主要竞争对手</span>
									</div>
								<div class="display_inner_line_wrap ml20 mt10">
									<span class="label_wrap">主要客户</span>
								</div>
									<div class="ml20 mt20 ">
										<span class="font2">主要客户</span>
										<span class="font2">主要客户</span>
										<span class="font2">主要客户</span>
										<span class="font2">主要客户</span>
										<span class="font2">主要客户</span>
										<span class="font2">主要客户</span>
										<span class="font2">主要客户</span>
										<span class="font2">主要客户</span>
										<span class="font2">主要客户</span>
										<span class="font2">主要客户</span>
									</div>
								<hr class="hr_grey clear" >	
								<div class="display_inner_line_wrap ml20 mt10">
									<span class="label_wrap">厂容厂貌</span>
								</div>
									<div class="ml20 mt10">
										<div class="f_l pic "><img src="/newresources/images/sale/environment.png"><br><span class="mt10">厂区图片</span></div>
										<div class="f_l pic "><img src="/newresources/images/sale/environment.png" ><br><span class="mt10">厂区图片</span></div>
										<div class="f_l pic "><img src="/newresources/images/sale/environment.png" ><br><span class="mt10">厂区图片</span></div>
									</div>
								<hr class="hr_grey clear">	
								<div class="display_inner_line_wrap ml20 mt10">
									<span class="label_wrap">企业简介</span>
								</div>
									<div class="mt10 ml20 font2">浙江泰普森休闲用品有限公司是集专业设计、开发、生产、经营、出口户外休闲用品的大型外向型企业，公司注册资本1200万美元,公司占地面积500余亩，是中国最具规模的户外休闲用品提供商。
										公司主导产品有帐篷、登山包、户外餐包、户外家具、花园家具、渔具及其配套产品等七大系列、上万个品种，产品畅销欧美、澳洲、亚洲等全球各个区域与国家，年销售规模达20亿元人民币。
										 公司产供销全部实行ERP管理，质量管理体系全面通过英国BSI公司ISO9001：2000国际质量体系认证。
									</div>
									<div class="t_algin_r mr15 mt20">
										<button class="yellow_button" onClick="goNext(0)">上一页</button>
										<button class="yellow_button ml10" onClick="goNext(2)">下一页</button>
									</div> -->
							</div>
<!-- 							详细信息结束 -->
<!-- 							规模能力开始  -->
							<div id="scalepower_info" class="supplier_scale tabcon2">
								<!-- <div class="ml10 mt20 b"><span class="title_split">||</span>&nbsp;&nbsp;基本信息</div>
								<div class="ml30">
									<div class="display_inner_line_wrap">
										<span class="label_wrap">员工人数:</span>
										<span class="label_wrap"><span class="display_wrap">208</span>人</span>
									</div>
									<div class="display_inner_line_wrap">
										<span class="label_wrap">其他人员:</span>
										<span  class="label_wrap"><span class="display_wrap">科研人员</span>100人、</span>
										<span  class="label_wrap ml10"><span class="display_wrap">内审人员</span> 100人、</span>
										<span  class="label_wrap ml10"><span class="display_wrap">操作人员</span> 100人</span>
									</div>
									<div class="display_inner_line_wrap">
										<span class="label_wrap">人员结构:</span>
										<span  class="label_wrap"><span class="display_wrap">本科及以上</span> 100人、</span>
										<span  class="label_wrap ml10"><span class="display_wrap">大专</span> 100人、</span>
										<span  class="label_wrap ml10"><span class="display_wrap">大专以下</span>100人</span>
									</div>
								</div>
								<hr class="hr_grey mt30 clear" >	
								<div class="ml30 clearfix">
									<div class="display_inner_line_wrap"  style="width:50%;">
										<span class="label_wrap">质量控制:</span>
										<span class="display_wrap ml20">第三方</span>
									</div>
									<div class="display_inner_line_wrap" style="width:50%;">
										<span class="label_wrap" >OEM代加工:</span>
										<span class="display_wrap ml20">不提供</span>
									</div>
									<div class="display_inner_line_wrap">
										<span class="label_wrap">管理体系认证:</span>
										<span class="display_wrap ml20">ISO14000</span>
									</div>
									<img src="/newresources/images/moreLicense.png">
									<textarea class="bg_grey ml80" rows="5" cols="20"></textarea>
								</div>
								<hr class="hr_grey mt30 clear" >	
								<div class="ml30">
										<div class="display_inner_line_wrap"  style="width:50%;">
											<span class="label_wrap">企业面积:</span>
											<span  class="label_wrap "><span class="display_wrap">5000</span>平方米</span>
										</div>
										<div class="display_inner_line_wrap"  style="width:50%;">
											<span class="label_wrap">厂房面积:</span>
											<span  class="label_wrap "><span class="display_wrap">5000</span>平方米</span>
										</div>
											<div class="display_inner_line_wrap"  style="width:50%;">
											<span class="label_wrap">使用年限:</span>
											<span class="display_wrap">2016-05-12~2017-05-12</span>
										</div>
											<div class="display_inner_line_wrap"  style="width:50%;">
											<span class="label_wrap">产权:</span>
											<span class="display_wrap">自有</span>
										</div>
											<div class="display_inner_line_wrap"  style="width:50%;">
											<span class="label_wrap">年营业额:</span>
											<span  class="label_wrap "><span class="display_wrap">3960</span>人民币</span>
										</div>
											<div class="display_inner_line_wrap"  style="width:50%;">
											<span class="label_wrap">年进口额:</span>
											<span  class="label_wrap "><span class="display_wrap">3960</span>人民币</span>
										</div>
										<div class="display_inner_line_wrap" >
											<span class="label_wrap">年出口额:</span>
											<span  class="label_wrap "><span class="display_wrap">3960</span>人民币</span>
										</div>
								</div>
								<div class="ml10 mt30 b"><span class="title_split">||</span>&nbsp;&nbsp;设备清单</div>
								<table class="supplier_tableList ml10 mt20">	
									<tr>
										<th>设备名称</th>
										<th>规格</th>
										<th>产地</th>
										<th>数量</th>
										<th>购买日期</th>
										<th>价值(万元)</th>								
										<th>先进性</th>								
									</tr>
									<tr >
										<td>挖掘机</td>
										<td>高5.5米</td>
										<td>浙江省杭州市</td>
										<td>50000台</td>
										<td>2015-06-16</td>
										<td>5000</td>
										<td>优先</td>
									</tr>
									<tr >
										<td>挖掘机</td>
										<td>高5.5米</td>
										<td>浙江省杭州市</td>
										<td>50000台</td>
										<td>2015-06-16</td>
										<td>5000</td>
										<td>优先</td>
									</tr>
									<tr >
										<td>挖掘机</td>
										<td>高5.5米</td>
										<td>浙江省杭州市</td>
										<td>50000台</td>
										<td>2015-06-16</td>
										<td>5000</td>
										<td>优先</td>
									</tr>
								</table>
							院校信息开始 
								<div class="ml10 mt30 b"><span class="title_split">||</span>&nbsp;&nbsp;院校信息</div>
								<div class="ml30">
									<p class="mt20">院校合作：</p>
									<p class="mt10">院校合作院校合作院校合作院校合作院校合作院校合作院校合作院校合作院校合作院校合作院校合作院校合作院校合作院校合作院校合作院校合作院校合作院校合作院校合作</p>
									<p class="mt20">附件信息：</p>
									<div class="mr20 enclosure">
									<p class="mt10"><a class="blue">院校合作资料.doc</a><span class="f_r">2016-06-14 16:30:16</span>	</p>
									<p class="mt10"><a class="blue">院校合作资料.doc</a><span class="f_r">2016-06-14 16:30:16</span>	</p>
									<p class="mt10"><a class="blue">院校合作资料.doc</a><span class="f_r">2016-06-14 16:30:16</span>	</p>
									</div>	
								</div>
							院校信息结束 
							资质图片开始
								<div class="ml10 mt30 b"><span class="title_split">||</span>&nbsp;&nbsp;资质图片</div>
								<div class="ml30 ">
									<p class="mt20">专利：</p>
									<div class="mr10 mt20">
									<div class="f_l pic"><img src="/newresources/images/company_1.png"><br><span class="mt10 ">专利名称</span></div>
									<div class="f_l pic"><img src="/newresources/images/company_1.png"><br><span class="mt10 ">专利名称</span></div>
									<div class="f_l pic"><img src="/newresources/images/company_1.png" ><br><span class="mt10 ">专利名称</span></div>
									</div>	
								</div>
									<hr class="hr_grey mt30 clear">
								<div  class="ml30 ">	
									<p class="mt20">其他资质：</p>
									<div class="pic"><img src="/newresources/images/tasks/notexist.png"></div>
								</div>
							资质图片结束
								<div class="t_algin_r mr15 mt20">
									<button class="yellow_button" onClick="goNext(1)">上一页</button>
									<button class="yellow_button ml10" onClick="goNext(3)">下一页</button>
								</div> -->
							</div>
							<!--规模能力结束  -->
							<!--交易信息开始  -->
							<div class="supplier_trade tabcon2">
								<div class="ml10 mt20 b"><span class="title_split">||</span>&nbsp;&nbsp;银行信息</div>
								<table id="bankTable" class="supplier_tableList ml10 mt20">	
<!-- 									<tr> -->
<!-- 										<th>开户行</th> -->
<!-- 										<th>开户账号</th> -->
<!-- 										<th>账号状态</th> -->
<!-- 									</tr> -->
<!-- 									<tr > -->
<!-- 										<td>浙江萧山农商银行所前支行</td> -->
<!-- 										<td>215625632156332111</td> -->
<!-- 										<td>在用</td> -->
<!-- 									</tr> -->
<!-- 									<tr > -->
<!-- 										<td>浙江萧山农商银行所前支行</td> -->
<!-- 										<td>215625632156332111</td> -->
<!-- 										<td>已注销</td> -->
<!-- 									</tr> -->
<!-- 									<tr > -->
<!-- 										<td>浙江萧山农商银行所前支行</td> -->
<!-- 										<td>215625632156332111</td> -->
<!-- 										<td>在用</td> -->
<!-- 									</tr> -->
								</table>
								<div class="ml10 mt30 b"><span class="title_split">||</span>&nbsp;&nbsp;发票信息</div>
								<table id="invoiceTable" class="invoice_tableList ml10 mt20 ">	
<!-- 									<tr> -->
<!-- 										<th>发票抬头</th> -->
<!-- 									</tr> -->
<!-- 									 <tr > -->
<!-- 										<td  >浙江萧山农商银行所前支行</td> -->
<!-- 									</tr> -->
<!-- 									<tr > -->
<!-- 										<td >浙江萧山农商银行所前支行</td> -->
<!-- 									</tr> -->
								</table>
								<div class="t_algin_r mr15 mt20">
									<button class="yellow_button" onClick="goNext(2)">上一页</button>
								</div>
							</div>
							<!--交易信息结束  -->
						</div>
						<!--供应商档案结束-->
					</div>
				</div>
			</div>
		</div>
		<div id="bottom"></div>
		<%@ include file="/newresources/js/base.jsp" %>
		<!-- <script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script>
		<script type="text/javascript" src="/newresources/js/base.js"></script>
		<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
		<script type="text/javascript" src="/newresources/js/currency.js"></script>
		<script type="text/javascript" src="/newresources/js/cityOperate.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
		<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="/usercenter/purchaseManage/SupplierManage/js/accessVerifyInfo.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.treeview.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.nicescroll.js"></script>
	</body>
</html>
