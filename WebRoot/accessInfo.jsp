<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>供应商准入须知</title>
<link href="/newresources/css/page.css" rel="stylesheet">
<script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/newresources/js/base.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script>
<script type="text/javascript">
$(function(){
		//设置页面高度
		var height=$(".midd_wrap").height();
		if(height<$(window).height()-175)
		{
			$(".midd_wrap").height($(window).height()-175);
			$(".show_Agreen_wrap").height($(".midd_wrap").height()-94);
		}
		
		window.onresize=function(){
		
			$(".midd_wrap").height(500);
			if($(".midd_wrap").height()<$(window).height()-175)
			{
			$(".midd_wrap").height($(window).height()-175);
			}
			$(".show_Agreen_wrap").height($(".midd_wrap").height()-94);
		};
		loadCommonPage();
	});
//加载公用部分界面，如头部，底部，左侧菜单等
function loadCommonPage(){
	//$("#top").load(getwebroot()+"platform/top2.html #topPage");
	$("#top").load(getwebroot()+"platform/top2.html");
}
</script>
</head>
<body class="bg_grey">
<!--顶端-->
<div id="top">
</div>
<!--中间-->
<div class="midd_wrap">
		<div class="curr_page_title_wrap">服务协议</div>
		<div class="show_Agreen_wrap" >
			<div class="title">
					供应商准入须知
			</div>
				<div class="content2 mt20">
					<ul>
					<li>
					1.具有法人资格和独立承担民事责任的能力；良好的商业信誉和健全的财务会计制度，无偷税漏税；
					</li>
					<li>
					2.具有履行合同所必需的设备、专业技术能力与生产环境；
					</li>
					<li>
					3.供应商所提供的产品必须符合国家及行业生产标准；所提供的商品有效成分含量、商品质量应符合或高于国家标准；有环保要求的必须达到相关标准；
					</li>
					<li>
					4.化工、印染类等行业特殊性的供应商，其环保等法规符合性检查结论作为引入条件，对不满足的项目应要求其限期整改，合格后才能引入。
					</li>
					<li>
					5.供应商通过合作，应给予泰普森公司及事业部分子公司优惠政策，以增加供应链的市场竞争力；
					</li>
					<li>
					6.必须具有良好的社会责任感和信誉，无童工、按时发放员工工资以及按协议及时对其供应商支付货款；
					</li>
					<li>
					7.I类核心材料供应商必须有独立、完善的品检体系，有专门检测器材及专职检测人员；
					</li>
					<li>
					8.供应商有完善的生产系统，能根据我司年/月度物料需求计划，提前做好供货预备，并能配合我司JIT管理；
					</li>
					<li>
					9.供应商应具备一定的防突发事故能力，有保障生产和供货的紧急预案；
					</li>
					<li>
					10.合作供应商必须在共创价值、双赢发展的前提下，与我司签订合作协议，并严格按协议提供产品与服务；
					</li>
					<li>
					11.提供的17%增值税发票，接受我司的付款条件；
					</li>
					<li>
					12.供应商有专门的销售人员，受理我司业务，并具有完善的售后服务体系，做到出现问题及时到场并解决；
					</li>
					<li>
					13.供应商具备技术创新与材料开发能力，为提供产品积极地改进生产工艺，节约或降低成本与我司共同分享；
					</li>
					<li>
					14.核心与大宗物料的产品报价采用“成本分析表”的格式，使双方有效的控制成本；
					</li>
					<li>
					15.供应商应考虑长远的合作，在保证产品质量的前提下，与我司合作的价格不得高于同行最低价。
					</li>
					<li>
					16.首次准入评估总分未达60分的原则上不能引入，若有特殊优势确需引入的，需走特批流程，并限期整改。
					</li>
					</ul>
				</div>
		</div>
<div class="t_algin_c mt10">
	<button class="blue_close_btn" type="button" onClick="window.close()">关 闭</button>
</div>
</div>
<!--底端-->
<div class="bottom_wrap">
Copyright  2016-2017 浙江泰普森（控股）集团<br />版权所有  outside.com   <a href="javascript:void(0)">备案编号：浙ICP备15003965号</a>
</div>
</body>