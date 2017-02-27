var companyId=getParamFromWindowName("companyIdForAll");
var web_id=getParamFromWindowName("webId");	
$(function(){
		loadCommonPage();
		$(".midd_wrap").css({minHeight:$(window).height()-200});
		$(".midd_left_wrap").css({minHeight:$(window).height()-200});
		$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		
		window.onresize=function(){ 
			$(".midd_wrap").css({minHeight:$(window).height()-200});
			$(".midd_left_wrap").css({minHeight:$(window).height()-200});
			$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		};
		getWebContentById();
	});
	
	//加载公用部分界面，如同步，底部，左侧菜单等
	function loadCommonPage(){
		var result=isLoginForPlateForm();
		if(result.data!=null && result.data.vip == true){
			$("#top").load(getwebroot()+"vip/platform/vipTopHelp.html",null,function(responseTxt,statusTxt,xhr){
				if(statusTxt=="success")
					{
						$("#mainNav").children().eq(0).addClass("curr");
						getCompanyList(companyId);
					}
			});
			$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
			$(".midd_left_wrap").load(getwebroot()+"vip/helpCenter/vipHelpCenterLeftMenu.html",null,function(responseTxt,statusTxt,xhr){
			});
		}else{
			$("#top").load(getwebroot()+"platform/topForHelpCenter.html",null,function(responseTxt,statusTxt,xhr){
				if(statusTxt=="success")
					{
						$("#mainNav").children().eq(0).addClass("curr");
						if(result.isLogin){
							getCompanyList(companyId);
						}
					}
			});
			$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
			$(".midd_left_wrap").load(getwebroot()+"announcement/helpCenterLeftMenu.htm",function(){
			});
		}
		
	}
	
	/**
	 * 根据ID获取网页内容
	 * getWebContentById void
	 * @author yukai
	 * 2016-11-10 上午8:53:09
	 */
	function getWebContentById(){
		var url="announcement/getHelpContentById.do";
		var params={};
		params.web_id=web_id;
		var fn=function(result){
			document.title='帮助中心---'+result.data.web_title;
			$("#web_title").html(result.data.web_title);
			$("#create_dt").html(result.data.create_dt);
			$("#content").html(result.data.content);
		};
		asyncAjaxMethod(url,params,true,fn);
	}