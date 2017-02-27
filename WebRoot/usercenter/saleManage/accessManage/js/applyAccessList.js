var companyId=getParamFromWindowName("companyIdForAll");
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
	var isVip=getCookie("isVip");
//	if(result.data!=null && result.data.vip == true){
	if(isVip=="true"){
		$("#top").load(getwebroot()+"vip/platform/vipTop.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success"){
					$("#mainNav").children().eq(0).addClass("curr");
					getCompanyList(companyId);
					companyId=$("#company").val();
					if(companyId!=null){
						InitDatas(0,true);
					}
			}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/saleManage/vipSaleLeftMenu.html",function(){
				$("#evaluation").children().eq(1).children().eq(0).find("a").prepend(">>");
				$("#evaluation").children().eq(1).children().eq(0).addClass("currVip");
			});
		}
	}else{
		$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success"){
					$("#mainNav").children().eq(1).addClass("curr");
					getCompanyList(companyId);
					companyId=$("#company").val();
					if(companyId!=null){
						InitDatas(0,true);
					}
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"usercenter/saleManage/saleLeftMenu.html",function(){
				$("#evaluation").children().eq(1).children().eq(0).addClass("curr");
			});
		}
	}
	
}
var pageSize = 10;//每页个数	
var currentPage=0;//当前页码
function InitDatas(pageIndex,needinit){
	currentPage=pageIndex;
	var url="AccessApplicationCtrl/getAccessApplicationList.do";
	var params={};
	params.usePaging=true;
	params.page=pageIndex;
	params.limit=pageSize;
	params.start=parseInt(pageIndex)*pageSize;
	params.companyId=companyId;
	var fn=function(result){
		if(pageIndex==0 && needinit){
				//第一次加载时加载分页控件
			initPaginations(result.total);
			$("#total_num").text(result.total);
		}
			//显示数据到表格
			addItems(result.data);						
		};
	asyncAjaxMethod(url,params,true,fn);
}
function pageselectCallbacks(index,jq){
		InitDatas(index,false);
}
function initPaginations(totalCount){
		$("#pagination").pagination(totalCount, {
	         callback: pageselectCallbacks,
	         prev_text: "<",
	         next_text: ">",
	         items_per_page: pageSize, //每页的数据个数
	         num_display_entries: 3, //两侧首尾分页条目数
	         current_page: 0,   //当前页码
	         num_edge_entries: 2 //连续分页主体部分分页条目数
	     });
}
function addItems(applyAccess){
		var tableItem='<tr>'
					+'<th width="140px">时间</th>'
					+'<th width="auto">客户</th>'
					+'<th width="200px">准入信息</th>'
				+'</tr>';
		var date=new Date();
		date.setDate(date.getDate()-7);
		if(applyAccess){
			for(var i=0;i<applyAccess.length;i++){
				var apply_sts;
				var acceptStr="您已接受对方邀请，请尽快提交准入申请";
				if(applyAccess[i].access_status==0){
					apply_sts="";
				}
				else if(applyAccess[i].access_status==1){
					apply_sts="已保存";
				}
				else if(applyAccess[i].access_status==2){
					apply_sts="已提交";
					acceptStr="您已接受对方邀请";
				}
				else if(applyAccess[i].access_status==3){
					apply_sts="已通过";
					acceptStr="您已接受对方邀请";
				}else{
					apply_sts="未通过";
					acceptStr="您的准入申请未通过，请修改后重新提交";
				}
				if(applyAccess[i].invite_status!=-1){
						var str="<img src='/newresources/images/icon/greenAlarm.png' /><span class='greycolor ml4' >对方向您发出邀请</span>";
						if(applyAccess[i].invite_status==0){
							var d1=new Date(applyAccess[i].create_dt.replace(/\-/g, "\/"));
							var d2=new Date(date.Format("yyyy-MM-dd HH:mm:ss").replace(/\-/g, "\/"));
							if(d1<=d2){
								str+="<button class='lose_white_button ml10' disabled='disabled'>已过期</button>";
							}else{
								str+="<button onclick='acceptInvite("+applyAccess[i].accepter_id+","+applyAccess[i].sender_id+",\""+applyAccess[i].create_dt+"\","+applyAccess[i].invite_id+","+applyAccess[i].supplier_id+",this,"+applyAccess[i].is_fast+")' class='active_white_button ml10'>接受</button>";
							}
						}else{
							str="<img src='/newresources/images/icon/greenAlarm.png' /><span class='greycolor ml4' >您已接受对方邀请</span>";
						}
							str+="</td><td style='padding-left:50px;'></td></tr>";
				}else{
					if(applyAccess[i].receive_invite_id==0){
						var str="</td>"
						+"<td style='padding-left:50px;'>"
						+"<a class='blue' onclick='go_applyAccess("+applyAccess[i].record_id+","+applyAccess[i].h_id+","+applyAccess[i].access_status+","+applyAccess[i].accepter_id+")'>准入申请</a>"
						+"<span class='ml10 greycolor'>"+apply_sts+"</span>"
						+"</td>"
						+"</tr>";
					}else{   
						var str="<img src='/newresources/images/icon/greenAlarm.png' /><span class='greycolor ml4'>"+acceptStr+"</span>"
							+"</td>"
							+"<td style='padding-left:50px;'>"
							+"<a class='blue' onclick='go_applyAccess("+applyAccess[i].record_id+","+applyAccess[i].h_id+","+applyAccess[i].access_status+","+applyAccess[i].accepter_id+")'>准入申请</a>"
							+"<span class='ml10 greycolor'>"+apply_sts+"</span>"
							+"</td></tr>";
					}
				}
				tableItem =tableItem+"<tr>"
					+"<td><span class='greycolor ml10'>"+applyAccess[i].create_dt+"</span></td>"
					+"<td style='padding-left:100px;'>"
						+"<a class='a_link_name mr10' onclick='go_companyWindow("+applyAccess[i].sender_id+")'>"+applyAccess[i].sender_name+"</a>"
						+str;
			}
		}
		$("#access_table").html(tableItem);
}
function go_applyAccess(record_id,h_id,access_status,accepter_id){
	//var param ={"accepter_id":accepter_id,"record_id":record_id,"h_id":h_id,"access_status":access_status};
	//addParamsToWindowName(param);
	//window.location.href=getwebroot()+"AccessApplicationCtrl/appAccessInfo.htm";
	var URIstring = getwebroot()+"AccessApplicationCtrl/appAccessInfo/"+record_id+".htm?accepter_id="+accepter_id+"&record_id="+record_id+"&h_id="+h_id+"&access_status="+access_status+"&companyId="+companyId;
	var paraString = URIstring.substring(URIstring.indexOf("?")+1,URIstring.length); 
	var rul=URIstring.substring(0,URIstring.indexOf("?")+1)+escape(paraString);//对参数的处理
	window.open(rul);
}
function go_companyWindow(sender_id){
	var param ={"companyIdForWindow":sender_id};
	addParamsToWindowName(param);
	window.location.href=getwebroot()+"supplierForPlateForm/companyWindow.htm";
}
//接受邀请
function acceptInvite(accepter_id,sender_id,create_dt,invite_id,supplier_id,obj,is_fast){
	var url="AccessApplicationCtrl/acceptInvite.do";
	var params={};
	params.invite_id=invite_id;
	params.invite_status=1;
	var fn=function(result){
		if(result.data){
			if(is_fast==0){//正常流程
				if(getHId(sender_id)!=null){//需要填写准入申请
					insertAccessRecord(accepter_id,sender_id,create_dt,invite_id,supplier_id,obj);
				}else{//不需要填写准入申请
					updateSupplierStatusById(supplier_id);
				}
			}
			else if(is_fast==1){//快速通道
				directCreateRelation(sender_id,supplier_id,obj);
			}
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
//插入准入流水记录
function insertAccessRecord(accepter_id,sender_id,create_dt,invite_id,supplier_id,obj){
	var url="AccessApplicationCtrl/addAccessRecord.do";
	var h_id=getHId(sender_id);
	var params={};
	params.submit_id=accepter_id;
	params.receive_id=sender_id;
	params.receive_invite_id=invite_id;
	params.access_status=0;
	params.create_dt=create_dt;
	params.h_id=h_id;
	var fn=function(result){
		var record_id=result.record_id;
		var h_id=result.h_id;
		var access_status=result.access_status;
		returnRecordIdToSupplier(record_id,supplier_id);
		$(obj).parent().next().html("<a class='blue' onclick='go_applyAccess("+record_id+","+h_id+","+access_status+","+accepter_id+")'>准入申请</a>");
		$(obj).prev().text("您已接受对方邀请，请尽快提交准入申请");
		$(obj).css("display","none");
	};
	asyncAjaxMethod(url,params,true,fn);
}
//获取模板头ID
function getHId(sender_id){
	var h_id;
	var url="AccessApplicationCtrl/getAccessTempletHead.do";
	var params={};
	params.owner=sender_id;
	var fn=function(result){
		if(result.data.length>0){
			h_id=result.data[0].h_id;
		}
	};
	asyncAjaxMethod(url,params,false,fn);
	return h_id;
}
//回填record_id
function returnRecordIdToSupplier(record_id,supplier_id){
	var url="CustomerFilesCtrl/returnRecordIdToSupplier.do";
	var params={};
	params.record_id=record_id;
	params.supplier_id=supplier_id;
	var fn=function(result){
	};
	asyncAjaxMethod(url,params,true,fn);
}

//直接建立关系
function directCreateRelation(sender_id,supplier_id,obj){
	var url="CustomerFilesCtrl/directCreateRelation.do";
	var params={};
	params.sender_id=sender_id;
	params.supplier_id=supplier_id;
	var fn=function(result){
		if(result.data){
			$(obj).prev().text("您已接受对方邀请");
			$(obj).css("display","none");
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 修改供应商状态
 * updateSupplierStatusById
 * @param supplier_id void
 * @author yukai
 * 2016-9-13 下午4:53:04
 */
function updateSupplierStatusById(supplier_id){
	var url="supplierFiles/updateSupplierStatusById.do";
	var params={};
	params.fileStatus=0;
	params.supplierId=supplier_id;
	var fn=function(result){
	};
	asyncAjaxMethod(url,params,true,fn);
}