<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>公告详情</title>
		<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/announcement.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
		<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="bg_grey">
		<div id="top"></div>
		<!--中间-->
		<div class="midd_wrap clearfix" >
			<div class="midd_left">
				<div class="navigateBar"><a id="centerPage"></a>><a id="list">最新公告</a>>正文</div>
				<div class="announcement">
					<div class="clearfix">
						<div id="web_title" class="title2 f_l"><!-- 西域户外服务店突破1700家  --></div>
						<div id="create_dt" class="time f_l"><!-- 2016-11-08 16:08:00 --></div>
					</div>
					<div id="signed_release" class="author"><!-- 浙江西域户外-林冲 --></div>
					<div id="content" class="text">
					<!-- 为使公司员工能够以优惠的方式体验、购买新品牌EA商务系列背包，切身感受到公司产品带给顾客的便利和效益，让同事在司工作时享受更多主人式待遇，现特对公司员工优惠购买EA商务背包的流程进行以下说明：
 
【必看重要说明】：请各位同事务必按照本规则进行购买，否则视为无效订单不予返现，並对公司天猫店铺造成损失（扣分\降权），将追究个人责任，感谢配合与支持！
 
1.凡是曾经使用公司网络登录过的淘宝账号（无论公司电脑登录，还是手机连接WIFI登录），均不能直接购买背包。可由朋友或亲戚等未在公司登陆过的淘宝账号代为购买。
2.凡进行购买时，不可使用任何WIFI，须使用手机运营商流量进行购买。
3.购买背包后，收货地址不可以留杭州或德清公司地址。
4.每名员工限购5件，确认付款后统一通过E-Message联系吕鹏飞进行登记，后续统一返现。
5.如非质量问题，不支持退换货。购买前若想看实品，可联系内贸部-刘金凤。
6.本次活动优惠力度空前绝后，11月6日截止，把握时间，欲购从速！请一定按要求购买哦！记得收货后好评晒图，才有返现，祝大家购物愉快！
 
【内购资格】：公司全体员工

【内购折扣】：按实际购买价格的5折，每个ID限购5件（必看重要说明）。

【活动时间】：10月28日至11月6日

【购买方法】：打开天猫/淘宝app扫一扫本协作附件中二维码进入店铺，或在天猫/淘宝app上搜索“EA箱包旗舰店”，也可登录EA天猫店网址https://eaxb.tmall.com/?spm=a220o.1000855.w5001-15275807659.2.uYbJR0&scene=taobao_shop，店铺内所有产品均参加本次活动，先以实际价格购买，收货后好评晒图，即可通过E-Message联系吕鹏飞登记，并在11月30日前统一在支付宝收到返还的半价。例如，以138元购买一款双肩包，收货后给予所购背包好评并晒图，联系吕鹏飞登记后，可收到69元返现，相当于以实际购买价格的一半购入。店铺内所有产品均参加本次活动，先以实际价格购买，收货后好评晒图，即可通过E-Message联系吕鹏飞登记，并在11月30日前统一在支付宝收到返还的半价。例如，以138元购买一款双肩包，收货后给予所购背包好评并晒图，联系吕鹏飞登记后，可收到69元返现，相当于以实际购买价格的一半购入。 -->
					</div>
				</div>
			</div>
			<div class="midd_right">
				<div class="hotest bg_white" >
					<div class="hotest_title">最新公告</div>
					<ul id="newAnnouncements" class="hotestList">
						<!-- <li>
							<a class="con" onclick="">西域户外服务店突破1700家</a>
							<div class="time">2016-01-01 10:10:30</div>
						</li>
						<li>
							<a class="con" onclick="">购买新品牌EA商务系列背包</a>
							<div class="time">2016-01-01 10:10:30</div>
						</li>
						<li>
							<a class="con" onclick="">切身感受到公司产品带给顾客便利和效益</a>
							<div class="time">2016-01-01 10:10:30</div>
						</li>
						<li>
							<a class="con" onclick="">让同事在司工作时享受更多主人式待遇</a>
							<div class="time">2016-01-01 10:10:30</div>
						</li>
						<li>
							<a class="con" onclick="">对公司员工优惠购买EA商务背包的流程进行以下说明</a>
							<div class="time">2016-01-01 10:10:30</div>
						</li>
						<li>
							<a class="con" onclick="">重要说明：请各位同事务必按照本规则进行购买</a>
							<div class="time">2016-01-01 10:10:30</div>
						</li> -->
					</ul>
				</div>
			</div>
		</div>
		<!--底端-->
		<div id="bottom" class="mt80"></div>
		<%@ include file="/newresources/js/base.jsp" %>
<!-- 		<script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
		<script type="text/javascript" src="/usercenter/announcement/js/announcementDetail.js"></script>
		<script id="newAnnouncementStmpl" type="text/x-dot-template">
			 {{for(var prop in it){}}
				<li>
					<a class="con" onclick="changeAnnouncement({{= replaceNullAsStr(it[prop].web_id)}})">{{= replaceNullAsStr(it[prop].web_title)}}</a>
					<div class="time">{{= replaceNullAsStr(it[prop].create_dt)}}</div>
				</li>
			{{}}}
		</script>
	</body>
</html>
