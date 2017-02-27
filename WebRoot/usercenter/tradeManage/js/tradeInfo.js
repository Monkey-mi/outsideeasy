if(window.name==""){
	var urlPara = location.search; //获取参数部分
	 urlPara=unescape(urlPara);//对参数解密
	 function getPara(paraName){ 
		 var reg = new RegExp("[&|?]"+paraName+"=([^&$]*)", "gi"); 
		 var a = reg.test(urlPara); 
		 return a ? RegExp.$1 : ""; 
		 } 
	//捕获参数并进行操作 
	 var companyId= getPara("companyId"); //捕获到url参数 
	 var windowNameParam ={"companyIdForAll":companyId};
	 addParamsToWindowName(windowNameParam);
}else{
	var companyId=getParamFromWindowName("companyIdForAll");
}
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
	getBaseInfo();
	
});


//加载公用部分界面，如同步，底部，左侧菜单等
function loadCommonPage(){
	var result = isLoginForPlateForm();
	var isVip=getCookie("isVip");
//	if(result.data.vip == true){
	if(isVip=="true"){
		$("#top").load(getwebroot()+"vip/platform/vipTop.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
				{
					//alert("外部加载成功！");
					getCompanyList(companyId);
					$("#mainNav").children().eq(2).addClass("curr");
					$(".vip_search_wrap").hide();
				}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/companyManage/vipCompanyLeftMenu.html",function(){
				$("#evaluation").children().eq(3).children().eq(0).find("a").prepend(">>");
				$("#evaluation").children().eq(3).children().eq(0).addClass("currVip");
			});
		}
	}else{
		$("#top").load(getwebroot()+"platform/top.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
				{
					//alert("外部加载成功！");
					getCompanyList(companyId);
				}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		if(result.isLogin){
			$(".midd_left_wrap").load(getwebroot()+"usercenter/companyManage/companyLeftMenu.html",function(){
				$("#evaluation").children().eq(3).children().eq(0).css("background","#ececec");
			});
		}
	}
}

//获取基本信息
function getBaseInfo(){
	var url = "supplierForPlateForm/getCompanyInfoByCompanyId1.do";
	var params = {};
	params.companyId = companyId;
	
	var isasync = true;
	var fn = function(result){
		var companyData = result.data;
		var companyBaseInfo = companyData.companyBaseInfo;//公司基础信息 
 		var compnayExtraInfo = companyData.compnayExtraInfo;//公司附加信息
		$("#companyNameInHead").html(companyBaseInfo.cpyname_cn);//企业名称头部显示
 		var tableItem="";
		//展示银行账号
		if(compnayExtraInfo.bankAccount){
	 		for(var i = 0;i<compnayExtraInfo.bankAccount.length;i++){
	 			var account_sts="";
	 			if(compnayExtraInfo.bankAccount[i].account_sts==0){
	 				account_sts="在用";
	 			}else{
	 				account_sts="已注销";
	 			}
	 			if(compnayExtraInfo.bankAccount[i].default_id==0){
	 				default_id="<button class='setDefault hide' onclick='setBankDefault("+compnayExtraInfo.bankAccount[i].account_id+",this)'>设为默认</button>";
	 			}else{
	 				default_id="<button class='defaultAccount' disabled>默认账号</button>";
	 			}
	 			tableItem =tableItem+"<tr onmouseover='showSetDefault(this)' onmouseout='hideSetDefault(this)'>"
							+"<td>"
								+replaceNullAsStr(compnayExtraInfo.bankAccount[i].account_name)
							+"</td>"
							+"<td>"
								+replaceNullAsStr(compnayExtraInfo.bankAccount[i].account_code)
							+"</td>"
							+"<td>"
								+account_sts
							+"</td>"
							+"<td class='right'>"
								+default_id
							+"</td>"
							+"<td class='right pr20'>"
								+rowoperate(compnayExtraInfo.bankAccount[i])
							+"</td>"
						+"</tr>";
			} 
		}
		$("#bankTable").append(tableItem);
		
		var tableItem1="";
		//展示发票抬头
		if(compnayExtraInfo.invoiceTitles){
			for(var i = 0;i<compnayExtraInfo.invoiceTitles.length;i++){
				var invoice_title_sts="";
	 			if(compnayExtraInfo.invoiceTitles[i].invoice_title_sts==0){
	 				invoice_title_sts="在用";
	 			}else{
	 				invoice_title_sts="已注销";
	 			}
	 			if(compnayExtraInfo.invoiceTitles[i].default_id==0){
	 				default_id="<button class='setDefault hide' onclick='setInvoiceDefault("+compnayExtraInfo.invoiceTitles[i].invoice_title_id+",this)'>设为默认</button>";
	 			}else{
	 				default_id="<button class='defaultAccount' disabled>默认抬头</button>";
	 			}
				tableItem1 =tableItem1+"<tr  onmouseover='showSetDefault(this)' onmouseout='hideSetDefault(this)'>"
							+"<td>"
								+replaceNullAsStr(compnayExtraInfo.invoiceTitles[i].invoice_title_name)
							+"</td>"
							+"<td>" 
								+invoice_title_sts
							+"</td>"
							+"<td class='right'>"
								+default_id
							+"</td>"
							+"<td class='right pr20'>"
								+rowoperate1(compnayExtraInfo.invoiceTitles[i])
							+"</td>"
						+"</tr>";
			} 
		}
		$("#invoiceTable").append(tableItem1);
	};
	
	asyncAjaxMethod(url,params,isasync,fn);
}


function rowoperate(bankAccount) {
		var flag=checkBankUsed(bankAccount.account_id);
		if(bankAccount.default_id==1){
			if(bankAccount.account_sts==0){
        		var	_str="<a href='javascript:void(0)' onclick='cancelBankAccount("+bankAccount.account_id+")');\">注销</a>&nbsp;";
        			if(!flag){
			 			_str+="<a href='javascript:void(0)' onclick='editBankAccount(this,"+bankAccount.account_id+")');\">编辑</a>&nbsp;";
			  			_str+="<a href='javascript:void(0)' onclick='delBankAccount("+bankAccount.account_id+")');\">删除</a>";
        			}
			}else{
				var	_str="";
				if(!flag){
			 			_str+="<a href='javascript:void(0)' onclick='editBankAccount(this,"+bankAccount.account_id+")');\">编辑</a>&nbsp;";
			  			_str+="<a href='javascript:void(0)' onclick='delBankAccount("+bankAccount.account_id+")');\">删除</a>";
				}
			}
		}else{
			 if(bankAccount.account_sts==0){
        		var	_str="<a href='javascript:void(0)' onclick='cancelBankAccount("+bankAccount.account_id+")');\">注销</a>&nbsp;";
        		if(!flag){
			 		_str+="<a href='javascript:void(0)' onclick='editBankAccount(this,"+bankAccount.account_id+")');\">编辑</a>&nbsp;";
			  		_str+="<a href='javascript:void(0)' onclick='delBankAccount("+bankAccount.account_id+")');\">删除</a>";
        		}
			}else{
				var	_str="";
				if(!flag){
			 		_str+="<a href='javascript:void(0)' onclick='editBankAccount(this,"+bankAccount.account_id+")');\">编辑</a>&nbsp;";
			  		_str+="<a href='javascript:void(0)' onclick='delBankAccount("+bankAccount.account_id+")');\">删除</a>";
				}
			}
		}
		return _str;
}
function rowoperate1(invoiceTitles) {
		var flag=checkInvoiceUsed(invoiceTitles.invoice_title_id);
		if(invoiceTitles.default_id==1){
			if(invoiceTitles.invoice_title_sts==0){
        		 var _str="<a href='javascript:void(0)' onclick='cancelInvoiceTitles("+invoiceTitles.invoice_title_id+")');\">注销</a>&nbsp;";
        		 if(!flag){
			 		_str+="<a href='javascript:void(0)' onclick='editInvoiceTitles(this,"+invoiceTitles.invoice_title_id+")');\">编辑</a>&nbsp;";
			  		_str+="<a href='javascript:void(0)' onclick='delInvoiceTitles("+invoiceTitles.invoice_title_id+")');\">删除</a>";
        		 }
			}else{
				var _str="";
				if(!flag){
			 		_str+="<a href='javascript:void(0)' onclick='editInvoiceTitles(this,"+invoiceTitles.invoice_title_id+")');\">编辑</a>&nbsp;";
			  		_str+="<a href='javascript:void(0)' onclick='delInvoiceTitles("+invoiceTitles.invoice_title_id+")');\">删除</a>";
				}
			}
		}else{
			 if(invoiceTitles.invoice_title_sts==0){
        			var _str="<a href='javascript:void(0)' onclick='cancelInvoiceTitles("+invoiceTitles.invoice_title_id+")');\">注销</a>&nbsp;";
        			if(!flag){
			 			_str+="<a href='javascript:void(0)' onclick='editInvoiceTitles(this,"+invoiceTitles.invoice_title_id+")');\">编辑</a>&nbsp;";
			  			_str+="<a href='javascript:void(0)' onclick='delInvoiceTitles("+invoiceTitles.invoice_title_id+")');\">删除</a>";
        			}
			}else{
				var _str="";
				if(!flag){
			 		_str+="<a href='javascript:void(0)' onclick='editInvoiceTitles(this,"+invoiceTitles.invoice_title_id+")');\">编辑</a>&nbsp;";
			  		_str+="<a href='javascript:void(0)' onclick='delInvoiceTitles("+invoiceTitles.invoice_title_id+")');\">删除</a>";
				}
			}
		}
		return _str;
}
//注销银行账号
function cancelBankAccount(account_id){
	window.wxc.xcConfirm("是否注销该账号", window.wxc.xcConfirm.typeEnum.confirm,
			{
			onOk:function(){
			var url="PfBankAccountCtrl/updateBankAccount.do";
			var params={};
			params.accountId=account_id;
			params.accountSts=1;
			var fn=function(result){
				if(result.success){
					location.reload(true);
				}
			};
			asyncAjaxMethod(url,params,true,fn);
		},
		onCancel:function(){
				}
			});
}
//注销发票抬头
function cancelInvoiceTitles(invoice_title_id){
	window.wxc.xcConfirm("是否注销该发票抬头", window.wxc.xcConfirm.typeEnum.confirm,
			{
			onOk:function(){
			var url="PfInvoiceTitleCtrl/updateInvoiceTitle.do";
			var params={};
			params.invoiceTitleId=invoice_title_id;
			params.invoice_title_sts=1;
			var fn=function(result){
				if(result.success){
					location.reload(true);
				}
			};
			asyncAjaxMethod(url,params,true,fn);
		},
		onCancel:function(){
				}
			});
}
//删除银行账号
function delBankAccount(account_id){
	window.wxc.xcConfirm("是否删除该账号", window.wxc.xcConfirm.typeEnum.confirm,
			{
			onOk:function(){
			var url="PfBankAccountCtrl/deleteBankAccount.do";
			var params={};
			params.bankAccountId=account_id;
			var fn=function(result){
				if(result.success){
					location.reload(true);
				}
			};
			asyncAjaxMethod(url,params,true,fn);
		},
		onCancel:function(){
				}
			});
}
//删除发票抬头
function delInvoiceTitles(invoice_title_id){
	window.wxc.xcConfirm("是否删除该发票抬头", window.wxc.xcConfirm.typeEnum.confirm,
			{
			onOk:function(){
			var url="PfInvoiceTitleCtrl/deleteInvoiceTitle.do";
			var params={};
			params.invoiceTitleId=invoice_title_id;
			var fn=function(result){
				if(result.success){
					location.reload(true);
				}
			};
			asyncAjaxMethod(url,params,true,fn);
		},
		onCancel:function(){
				}
			});
}
//编辑银行账号
function editBankAccount(th,account_id){
	$(th).parent().parent().find("td:lt(2)").each(function(){
		$(this).html("<input class='edit' type='text' value='"+$(this).text()+"'/>");
	});
	var account_sts=0;
	if($(th).parent().parent().find("td:eq(2)").text()=="已注销"){
		account_sts=1;
	}
	$(th).parent().parent().find("td:eq(2)").html("<select id='account_sts'><option value='0'>在用</option><option value='1'>已注销</option></select>");
	$("#account_sts").val(account_sts);
	var default_flag=false;
	if($(th).parent().parent().find("td:eq(3)")[0].innerText=="默认账号"){
		default_flag=true;
	}
	$(th).parent().parent().find("td:eq(3)").html("<input id='account_default_id' class='input_checkbox' type='checkbox'/>设为默认");
	if(default_flag){
		$("#account_default_id").attr('checked',true);
	}
	$(th).parent().parent().find("td:eq(4)").html("<a onclick='updateBank(this,"+account_id+")' >保存</a><a onclick='cancelEdtBank()'>取消</a>");
}
//保存更改
function updateBank(th,account_id){
	var account_name=$($(th).parent().parent().find("td:lt(3)").get(0)).children().val();
	var account_code=$($(th).parent().parent().find("td:lt(3)").get(1)).children().val();
	var account_sts=$($(th).parent().parent().find("td:lt(3)").get(2)).children().val();
	var default_id=0;
	if($("#account_default_id")[0].checked){
		resetBankDefault();
		default_id=1;
	}
	var url="PfBankAccountCtrl/updateBankAccount.do";
	var params={};
	params.accountId=account_id;
	params.accountName=account_name;
	params.accountCode=account_code;
	params.accountSts=account_sts;
	params.defaultId=default_id;
	var fn=function(result){
		if(result.success){
			location.reload(true);
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
//取消编辑
function cancelEdtBank(){
	location.reload(true);
}

//编辑发票抬头
function editInvoiceTitles(th,invoice_title_id){
	var invoice_title_name=$(th).parent().parent().find("td:eq(0)").text();
	var invoice_title_sts=0;
	if($(th).parent().parent().find("td:eq(1)").text()=="已注销"){
		invoice_title_sts=1;
	}
	var default_flag=false;
	console.log($(th).parent().parent().find("td:eq(2)"));
	if($(th).parent().parent().find("td:eq(2)")[0].innerText=="默认抬头"){
		default_flag=true;
	}
	$(th).parent().parent().find("td:eq(0)").html("<input type='text' class='edit' value='"+invoice_title_name+"'/>");
	$(th).parent().parent().find("td:eq(1)").html("<select id='invoice_title_sts'><option value='0'>在用</option><option value='1'>已注销</option></select>");
	$(th).parent().parent().find("td:eq(2)").html("<input id='invoice_default_id' type='checkbox'/>设为默认");
	$(th).parent().parent().find("td:eq(3)").html("<a onclick='updateInvoice(this,"+invoice_title_id+")'>保存</a><a onclick='cancelEdtInvoice()' >取消</a>");
	$("#invoice_title_sts").val(invoice_title_sts);
	if(default_flag){
		$("#invoice_default_id").attr('checked',true);
	}
}

//保存更改
function updateInvoice(th,invoice_title_id){
	var invoice_title_name=$($(th).parent().parent().find("td:lt(2)").get(0)).children().val();
	var invoice_title_sts=$($(th).parent().parent().find("td:lt(2)").get(1)).children().val();
	var default_id=0;
	if($("#invoice_default_id")[0].checked){
		resetInvoiceDefault();
		default_id=1;
	}
	var url="PfInvoiceTitleCtrl/updateInvoiceTitle.do";
	var params={};
	params.invoiceTitleId=invoice_title_id;
	params.invoiceTitleName=invoice_title_name;
	params.invoice_title_sts=invoice_title_sts;
	params.defaultId=default_id;
	var fn=function(result){
		if(result.success){
			location.reload(true);
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
//取消编辑
function cancelEdtInvoice(){
	location.reload(true);
}
//重置银行账号默认标记
function resetBankDefault(){
	var url="PfBankAccountCtrl/resetDefaultId.do";
	var params={};
	params.companyId=companyId;
	var fn=function(result){
	};
	asyncAjaxMethod(url,params,false,fn);
}
//重置发票抬头默认标记
function resetInvoiceDefault(){
	var url="PfInvoiceTitleCtrl/resetDefaultId.do";
	var params={};
	params.companyId=companyId;
	var fn=function(result){
	};
	asyncAjaxMethod(url,params,false,fn);
}
//银行账号设为默认
function setBankDefault(account_id,th){
	if($(th).parent().prev().text()=="已注销"){
		var option ={title:"提示",btn:parseInt("0001",2)};
	  	window.wxc.xcConfirm("已注销的账号不能设为默认！", window.wxc.xcConfirm.typeEnum.custom,option);
	  	return;
	}else{
		resetBankDefault();
		var url="PfBankAccountCtrl/updateBankAccount.do";
		var params={};
		params.accountId=account_id;
		params.defaultId=1;
		var fn=function(result){
			if(result.success){
				location.reload(true);
			}
		};
		asyncAjaxMethod(url,params,true,fn);
	}
}
//发票抬头设为默认
function setInvoiceDefault(invoice_title_id,th){
	if($(th).parent().prev().text()=="已注销"){
		var option ={title:"提示",btn:parseInt("0001",2)};
	  	window.wxc.xcConfirm("已注销的发票抬头不能设为默认！", window.wxc.xcConfirm.typeEnum.custom,option);
	  	return;
	}else{
		resetInvoiceDefault();
		var url="PfInvoiceTitleCtrl/updateInvoiceTitle.do";
		var params={};
		params.invoiceTitleId=invoice_title_id;
		params.defaultId=1;
		var fn=function(result){
			if(result.success){
				location.reload(true);
			}
		};
		asyncAjaxMethod(url,params,true,fn);
	}
}
//新增银行账号
function addBankAccount(){
	var tableItem="<tr>"
							+"<td>"
								+"<input class='edit' type='text'/>"
							+"</td>"
							+"<td>" 
								+"<input class='edit' type='text'/>"
							+"</td>"
							+"<td>"
								
							+"</td>"
							+"<td class='right'>" 
								+"<input id='account_default_id1' type='checkbox'/>设为默认"
							+"</td>"
							+"<td>"
								+"<button class='maincolor_button mr10' onclick='saveBank(this)'>保存</button>" +
										"<button class='grey_button' onclick='cancelSaveBank()' >取消</button>"
							+"</td>"
						+"</tr>";
	$("#bankTable").append(tableItem);
}
//保存银行账号
function saveBank(th){
	var account_name=$($(th).parent().parent().find("td:lt(3)").get(0)).children().val();
	var account_code=$($(th).parent().parent().find("td:lt(3)").get(1)).children().val();
	if(account_name==""||account_code==""){
		window.wxc.xcConfirm("请填写开户行和开户账号!",confirm);
		return;
	}
	var default_id=0;
	if($("#account_default_id1")[0].checked){
		resetBankDefault();
		default_id=1;
	}
	
	var url="PfBankAccountCtrl/insertBankAccount.do";
	var params={};
	params.accountName=account_name;
	params.accountCode=account_code;
	params.accountSts=0;
	params.defaultId=default_id;
	params.companyId=companyId;
	var fn=function(result){
		if(result.success){
			location.reload(true);
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
//取消保存银行账号
function cancelSaveBank(){
	location.reload(true);
}
//新增发票抬头
function addInvoiceTitle(){
	var tableItem="<tr>"
							+"<td>"
								+"<input class='edit' type='text'/>"
							+"</td>"
							+"<td>"
								
							+"</td>"
							+"<td class='right'>" 
								+"<input id='invoice_default_id1' type='checkbox'/>设为默认"
							+"</td>"
							+"<td>"
							+"<button class='maincolor_button mr10' onclick='saveInvoice(this)'>保存</button>" +
										"<button class='grey_button' onclick='cancelSaveInvoice()' >取消</button>"
							+"</td>"
						+"</tr>";
	$("#invoiceTable").append(tableItem);
}
//保存发票抬头
function saveInvoice(th){
	var invoice_title_name=$($(th).parent().parent().find("td:lt(2)").get(0)).children().val();
	if(invoice_title_name==""){
		window.wxc.xcConfirm("请填写发票抬头!",confirm);
		return;
	}
	var default_id=0;
	if($("#invoice_default_id1")[0].checked){
		resetInvoiceDefault();
		default_id=1;
	}
	var url="PfInvoiceTitleCtrl/insertInvoiceTitle.do";
	var params={};
	params.invoiceTitleName=invoice_title_name;
	params.invoice_title_sts=0;
	params.defaultId=default_id;
	params.companyId=companyId;
	var fn=function(result){
		if(result.success){
			location.reload(true);
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
//取消保存发票抬头
function cancelSaveInvoice(){
	location.reload(true);
}
//判断银行账号是否使用
function checkBankUsed(account_id){
	var flag=false;
	var url="PfBankAccountCtrl/checkBankUsed.do";
	var params={};
	params.app_account_id=account_id;
	var fn=function(result){
		if(result.data){
			flag=true;
		}
	};
	asyncAjaxMethod(url,params,false,fn);
	return flag;
}
//判断发票抬头是否使用
function checkInvoiceUsed(invoice_title_id){
	var flag=false;
	var url="PfInvoiceTitleCtrl/checkInvoiceUsed.do";
	var params={};
	params.app_invoice_title_id=invoice_title_id;
	var fn=function(result){
		if(result.data){
			flag=true;
		}
	};
	asyncAjaxMethod(url,params,false,fn);
	return flag;
}

function showSetDefault(e){
	$(e).find(".setDefault").show();
}
function hideSetDefault(e){
	$(e).find(".setDefault").hide();
}