<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>最新公告列表</title>
		<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/announcement.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
		<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="bg_grey">
		<div id="top"></div>
		<!--中间-->
		<div class="midd_wrap clearfix" >
			<div  class="midd_left">
				<div class="navigateBar"><a id='centerPage'></a>><!-- <a id="lastest"> -->最新公告<!-- </a>>列表 --></div>
				<div id="announcements"></div>
				<div id="paginationcom" class="quotes clearfix"></div>
			</div>
			<div class="midd_right">
				<div class="search clearfix">
					<div class="left"><input id="search_text" type="text" placeholder="输入关键字搜索公告"></div>
					<div class="right" onclick = "getAnnouncementList()"><img src="/newresources/images/search2.png"></div>
				</div>
				<div class="hotest bg_white mt20" >
					<!-- <div class="hotest_title">最热公告</div>
					<ul class="hotestList">
						<li>
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
						</li>
					</ul> -->
				</div>
				<div class="expect_img"></div>
			</div>
		</div>
		<!--底端-->
		<div id="bottom" class="mt80"></div>
		<%@ include file="/newresources/js/base.jsp" %>
<!-- 		<script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/base.js"></script> -->
<!-- 		<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
		<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
		<script type="text/javascript" src="/usercenter/announcement/js/announcementList.js"></script>
		<script id="announcementStmpl" type="text/x-dot-template">
		{{? it.length>0}}
		{{? it.length>1}}
			<div class="announcementList">
					<div class="announcement">
						<div class="clearfix">
							<div class="title f_l" onclick="goDetail('announcement/announcementDetail/{{= replaceNullAsStr(it[0].web_id)}}.htm',{{= replaceNullAsStr(it[0].web_id)}})">{{= replaceNullAsStr(it[0].web_title)}}</div>
							<div class="time f_l">{{= replaceNullAsStr(it[0].create_dt)}}</div>
						</div>
						<div class="author">{{= replaceNullAsStr(it[0].signed_release)}}</div>
						<div class="abstract">
						{{= replaceNullAsStr(it[0].content_abstract)}}
						</div>
					</div>
				</div>
			{{for(var prop=1;prop<it.length;prop++){}}
				<hr class="hr_split">
					<div class="announcementList mt40">
					<div class="announcement">
						<div class="clearfix">
							<div class="title f_l" onclick="goDetail('announcement/announcementDetail/{{= replaceNullAsStr(it[prop].web_id)}}.htm',{{= replaceNullAsStr(it[prop].web_id)}})">{{= replaceNullAsStr(it[prop].web_title)}}</div>
							<div class="time f_l">{{= replaceNullAsStr(it[prop].create_dt)}}</div>
						</div>
						<div class="author">{{= replaceNullAsStr(it[prop].signed_release)}}</div>
						<div class="abstract">
						{{= replaceNullAsStr(it[prop].content_abstract)}}
						</div>
					</div>
				</div>
			{{}}}
		{{??}}
			<div class="announcementList">
					<div class="announcement">
						<div class="clearfix">
							<div class="title f_l" onclick="goDetail('announcement/announcementDetail/{{= replaceNullAsStr(it[0].web_id)}}.htm',{{= replaceNullAsStr(it[0].web_id)}})">{{= replaceNullAsStr(it[0].web_title)}}</div>
							<div class="time f_l">{{= replaceNullAsStr(it[0].create_dt)}}</div>
						</div>
						<div class="author">{{= replaceNullAsStr(it[0].signed_release)}}</div>
						<div class="abstract">
						{{= replaceNullAsStr(it[0].content_abstract)}}
						</div>
					</div>
				</div>
		{{?}}
		{{??}}
			<div style="width:100%;text-align:center;"><img src="/newresources/images/news-empty.png" style="margin-top:30%;"></div>
		{{?}}
		</script>
	</body>
</html>
