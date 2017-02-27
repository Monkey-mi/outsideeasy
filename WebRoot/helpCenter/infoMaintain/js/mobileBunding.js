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
			$(".midd_left_wrap").load(getwebroot()+"vip/helpCenter/vipHelpCenterLeftMenu.html",function(){
				$("#leftMenuPage").children().eq(4).children().eq(2).find("a").prepend(">>");
				$("#leftMenuPage").children().eq(4).children().eq(2).addClass("currVip");
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
			$(".midd_left_wrap").load(getwebroot()+"helpCenter/helpCenterLeftMenu.html",function(){
				$("#leftMenuPage").children().eq(4).children().eq(2).addClass("curr");
			});
		}
		
	}
