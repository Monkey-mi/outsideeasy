var delFileIds=[];//储存要删除的附件ID
var bankAccount_delIds=[];//储存要删除的银行账号ID
var invoiceTitle_delIds=[];//储存要删除的发票抬头ID
//更新用户的基本信息
function updateBaseInfo1(params,btn,companyId){
	var url = "supplierForPlateForm/updateSupplierInfoByCompanyId.do";
	var params1 = {};
	params1.companyId = companyId;
	//人员类型和其它人员
	params1.collegeNum = params.collegeNum;
	params1.diplomaNum = params.diplomaNum;
	params1.diplomaDownNum = params.diplomaDownNum;
	params1.techNum = params.techNum;
	params1.opNum = params.opNum;
	params1.qcNum = params.qcNum;
	params1.staffNum = params.staffNum;
	params1.internalAuditorNum = params.internalAuditorNum;
          
	//详细信息页面的基础信息
	params1.cpynameCn = params.cpynameCn;
	params1.contactAddr = params.contactAddr;
	params1.contactAddrCode = params.contactAddrCode;
	params1.fPhone = params.fPhone;
	params1.contacts = params.contacts;
	params1.mPhone = params.mPhone;
	params1.fax = params.fax;
	params1.email = params.email;
	params1.companyIntroduction = params.companyIntroduction;
          
	//规模能力页面的基础信息
	params1.emplyees = params.emplyees;                      
	params1.techNum = params.techNum;       
	params1.collegeNum = params.collegeNum;
	params1.diplomaNum = params.diplomaNum;
	params1.diplomaDownNum = params.diplomaDownNum;       
	params1.turnover = params.turnover;
	params1.importNum = params.importNum;              
	params1.exportNum = params.exportNum;     
	params1.companyArea = params.companyArea;                 
	params1.factoryArea = params.factoryArea;                 
	params1.useBegintime = params.useBegintime;                 
	params1.useEndtime = params.useEndtime;                     
	params1.schoolCoop = params.schoolCoop;
	params1.qualityControl = params.qualityControl;
	params1.isOem = params.isOem;
	params1.certificationSystem = params.certificationSystem;
          
	params1.factoryOwner = params.factoryOwner;
	params1.turnoverCurrencyId = params.turnoverCurrencyId;
	params1.importCurrencyId = params.importCurrencyId;
	params1.exportCurrencyId = params.exportCurrencyId;
         
	params1.customer = params.customer;//主要客户
	params1.competitor = params.competitor;//竞争对手
	params1.goods = params.goods;//产品
	params1.material = params.material;//原材料
	params1.device = params.device;//设备
          
	//注册认证
	params1.companyCorporate = params.companyCorporate;
	params1.companyEstablishDt = params.companyEstablishDt;
	params1.companyRegFund = params.companyRegFund;
	params1.companyMainBussiness = params.companyMainBussiness;
	params1.companyNature = params.companyNature;
	params1.companyClass = params.companyClass;
	params1.industryName = params.industryName;
	params1.currency = params.currency;
	params1.lng = params.lng;
	params1.lat = params.lat;
        
	params1.bankAccount = params.bankAccount;//银行账号
	params1.invoiceTilte = params.invoiceTilte;//发票抬头
	params1.attched = params.attched;//公司证照
	
	params1.applySts = params.applySts;//申请状态
	
	var isasync = true;
	var fn = function(data){
		if(btn==("提交")){
			if(data.success==true){//成功后无需提示 跳转页面
				deleteTaskFiles();
				delBankAccountById();
				delInvoiceTitleById();
				//window.wxc.xcConfirm("提交成功","success");//点击提交按钮显示提交成功而不是保存成功
				$("#step1").css("display","none");
				$("#step2").css("display","block");
				$(".stepInfo_wrap").find('.step_index').eq(1).css("background-color","#ff9900");
				$(".step_bar_curr").width(1024);
			}else{
				var option ={hasTitle:true,title:"提示",btn:''};
				xcconfirm=new window.wxc.xcConfirm("提交失败",window.wxc.xcConfirm.typeEnum.custom,option);
			}
		}else{
			if(data.success==true){
				if(data.companyId!=null){
					var param ={"companyIdForCertification":data.companyId};
					addParamsToWindowName(param);
				}
				deleteTaskFiles();
				delBankAccountById();
				delInvoiceTitleById();
				if(btn != "del"){//不是删除操作；单独的删除操作不做提示信息
					var option ={hasTitle:true,title:"提示",btn:parseInt("0001",2)};
					xcconfirm=new window.wxc.xcConfirm("保存成功",window.wxc.xcConfirm.typeEnum.custom,option);
					closeBytimeCount1(2);//两秒后自动关闭
				}
			}else{
				var option ={hasTitle:true,title:"提示",btn:''};
				xcconfirm=new window.wxc.xcConfirm("保存失败",window.wxc.xcConfirm.typeEnum.custom,option);
			}
		}
	};
	asyncAjaxMethod(url,params1,isasync,fn);
}

/**
 * 删除没有使用的附件
 * delUselessAttched void
 * @author yukai
 * 2016-8-5 上午9:01:10
 */
function delUselessAttched(){
	var url="PfTaskFileCtrl/delUselessAttched.do";
	var params={};
	params.flag=true;
	var fn = function(result){
	};
	asyncAjaxMethod(url,params,true,fn);
}

/**
 * 根据ID删除附件
 * delAttchedById void
 * @author yukai
 * 2016-8-5 上午9:01:10
 */
function deleteTaskFiles(){
	var url="PfTaskFileCtrl/deleteTaskFiles.do";
	var params={};
	params.delFileIds=delFileIds.join(",");
	var fn = function(result){
		if(result.success){
			//delUselessAttched();
		}
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 删除银行账号
 * delBankAccountById void
 * @author yukai
 * 2016-8-5 上午9:01:10
 */
function delBankAccountById(){
	var url="PfBankAccountCtrl/deleteBankAccounts.do";
	var params={};
	params.account_ids=bankAccount_delIds.join(",");
	var fn = function(result){
	};
	asyncAjaxMethod(url,params,true,fn);
}
/**
 * 删除发票抬头
 * delInvoiceTitleById void
 * @author yukai
 * 2016-8-5 上午9:01:10
 */
function delInvoiceTitleById(){
	var url="PfInvoiceTitleCtrl/deleteInvoiceTitles.do";
	var params={};
	params.invoice_title_ids=invoiceTitle_delIds.join(",");
	var fn = function(result){
	};
	asyncAjaxMethod(url,params,true,fn);
}
/*展示公司图片基本信息 mishengliang
 * 
 * fileTypeId 图片文件位置类型ID
 * picId 图片展示位置的img标签ID
 * */
function picPathSrc1(fileTypeId,picId){
	$.ajax({
		type:"POST",
		url:getwebroot() + "PfTaskFileCtrl/getTaskFileListForWindow.do",
		dataType:"json",
		data:{
			fileTypeId:fileTypeId,
			companyId:companyId
		},
		success:function(result){
			if(result.data != ""){
				if(fileTypeId == 18){
					$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
					var del="<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ result.data[0].id +")'>删除</a></div>";
			        $(picId).parent().append(del);
        		}else if(fileTypeId == 19){
        			$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
					var del="<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ result.data[0].id +")'>删除</a></div>";
			        $(picId).parent().append(del);
        		}else if(fileTypeId == 20){
        			$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
					var del="<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ result.data[0].id +")'>删除</a></div>";
			        $(picId).parent().append(del);
        		}else if(fileTypeId == 21){
        			$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
					var del="<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ result.data[0].id +")'>删除</a></div>";
			        $(picId).parent().append(del);
        		}else if(fileTypeId == 22){
        			$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
					var del="<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delCompany_logo(this,"+ result.data[0].id +")'>删除</a></div>";
			        $(picId).parent().append(del);
        		}else if(fileTypeId == 23){
        			$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
					var del="<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delCompany_image(this,"+ result.data[0].id +")'>删除</a></div>";
			        $(picId).parent().append(del);
        		}else if(fileTypeId == 25){
        			$(picId).attr("src",getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[0].mogodb_id);
					var del="<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delManagement_system(this,"+ result.data[0].id +")'>删除</a></div>";
			        $(picId).parent().append(del);
        		}
			}else{
				if(fileTypeId == 22){
					$(picId).attr("src","/newresources/images/uploadlogo.png");
				}else if(fileTypeId == 23){
					$(picId).attr("src","/newresources/images/uploadfigure.png");
				}else{
					$(picId).attr("src","/newresources/images/uploadImg.png");
				}
			}
		},
		error:function(result){
		}
	});
}
//多张图片展示  mishengliang
function showMorePic1(fileTypeId){
	$.ajax({
		type:"POST",
		url:getwebroot() + "PfTaskFileCtrl/getTaskFileListForWindow.do",
		dataType:"json",
		data:{
			companyId:companyId,
			fileTypeId:fileTypeId
		},
		success:function(result){
			if(result.data != ""){
				for(var i=0; i<result.data.length; i++){
					var imgSrc = getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+result.data[i].mogodb_id;
					var filename = result.data[i].file_name;
					var creatDate = result.data[i].create_dt;
					var _newli="<li>"
						+"<div class='image_block_pic'>"
							+"<img src='"+imgSrc+"'/>"
							+"<div class='a_bg'></div>"
							+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='deluploadImg(this,"+ result.data[i].id +")'>删除</a></div>"
						+"</div>"
						+"<div class='edit_div clearfix'>"
							+"<label title='"+ filename +"'>"+ strVachar(filename,23)+"</label><input type='text' class='edit_input' style='display:none' value='"+filename+"'/>"
							+"<a href='javascript:void(0)' class='eidt' style='display:inline' onClick='editImgText(this,"+result.data[i].id+")'>编辑</a>"
							+"<a href='javascript:void(0)' class='eidt_save'  style='display:none' onClick='saveImgText(this,"+result.data[i].id+")'>保存</a>"
						+"</div>"
					+"</li>";
					
		     		if(fileTypeId == 24){
		     			$("#company_equipment_imgs").prepend(_newli);
		     		}else if(fileTypeId == 26){
		     			$("#patent_imgs").prepend(_newli);
		     		}else if(fileTypeId == 27){
		     			$("#other_intelligence_imgs").prepend(_newli);
		     		}
				}
			}
		},
		error:function(result){
		}
		});
}

function showPic1(obj){
	var fileType,fileName,fileElementId,id;//文件类型,文件名字,文件上传inputId
	
	var defaultUploadImage = $(obj).prev().find("img").attr("src");
	var imageId = $(obj).prev().find("img").attr("id");
	if(companyId==0||defaultUploadImage == "/newresources/images/uploadImg.png" || defaultUploadImage == "/newresources/images/uploadlogo.png" || defaultUploadImage == "/newresources/images/uploadfigure.png"){
		if(imageId=="company_logo"){
			updateForLogo=0;
		}else if(imageId=="company_image"){
			updateForImage=0;
		}
	}else{
		if(imageId=="company_logo"){
			updateForLogo=1;
		}else if(imageId=="company_image"){
			updateForImage=1;
		}
	}
	
	if($(obj).attr("id") == "business_licence_pic"){//营业执照
		filename=$("#business_licence_pic").val();
		fileElementId = "business_licence_pic";
		fileType = 18;
	}else if($(obj).attr("id") == "tax_registration_certificate_pic"){//税务登记证
		filename=$("#tax_registration_certificate_pic").val();
		fileElementId = "tax_registration_certificate_pic";
		fileType = 19;
	}else if($(obj).attr("id") == "organization_code_certificate_pic"){//组织机构代码证
		filename=$("#organization_code_certificate_pic").val();
		fileElementId = "organization_code_certificate_pic";
		fileType = 20;
	}else if($(obj).attr("id") == "taxpayer_qualification_certification_pic"){//纳税人资格证书
		filename=$("#taxpayer_qualification_certification_pic").val();
		fileElementId = "taxpayer_qualification_certification_pic";
		fileType = 21;
	}else if($(obj).attr("id") == "company_logo_pic"){
		filename=$("#company_logo_pic").val();
		fileElementId = "company_logo_pic";
		fileType = 22;
	}else if($(obj).attr("id") == "company_image_pic"){
		filename=$("#company_image_pic").val();
		fileElementId = "company_image_pic";
		fileType = 23;
	}else if($(obj).attr("id") == "management_system_pic"){
		filename=$("#management_system_pic").val();
		fileElementId = "management_system_pic";
		fileType = 25;
	}
   	var fileStartIndex=filename.lastIndexOf("\\");// 反斜杠\ 需要转译
	var fileEndIndex=filename.lastIndexOf(".");
	//原始上传文件名称
	var origfilename=filename.substring(fileStartIndex+1,fileEndIndex);
   if(origfilename){
		var fileurl = "PfTaskFileCtrl/addOrUpdateTaskImgFile1.do";
		var params = {};
		params.fileType=fileType;
		params.fileName=origfilename;
		params.formatType="image";
		params.companyId=companyId;
		var fn = function(data){//服务器成功响应处理函数
        	if (data.success==true &&data.message=="上传成功") {  
        		var newsrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+data.mongodbId;
        		if(fileType == 18){
        			$("#business_licence").parent().find("div").remove();
	        		$("#business_licence").attr("src",newsrc);
	        		var del="<div class='a_bg'></div>"
						+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
	        		$("#business_licence").parent().append(del);
	        		$(".company_license_tip").css("display","none");
        		}else if(fileType == 19){
        			$("#tax_registration_certificate").parent().find("div").remove();
        			$("#tax_registration_certificate").attr("src",newsrc);
        			var del="<div class='a_bg'></div>"
						+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
        			$("#tax_registration_certificate").parent().append(del);
        			$(".company_license_tip").css("display","none");
        		}else if(fileType == 20){
        			$("#organization_code_certificate").parent().find("div").remove();
        			$("#organization_code_certificate").attr("src",newsrc);
        			var del="<div class='a_bg'></div>"
						+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
        			$("#organization_code_certificate").parent().append(del);
        			$(".company_license_tip").css("display","none");
        		}else if(fileType == 21){
        			$("#taxpayer_qualification_certification").parent().find("div").remove();
        			$("#taxpayer_qualification_certification").attr("src",newsrc);
        			var del="<div class='a_bg'></div>"
						+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delCompany_licenses(this,"+ data.fileId +")'>删除</a></div>";
        			$("#taxpayer_qualification_certification").parent().append(del);
        			$(".company_license_tip").css("display","none");
        		}else if(fileType == 22){
        			$("#company_logo").attr("src",newsrc);
        			var del="<div class='a_bg'></div>"
						+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delCompany_logo(this,"+ data.fileId +")'>删除</a></div>";
        			$("#company_logo").parent().find("img").nextAll().remove();
        			$("#company_logo").parent().append(del);
        		}else if(fileType == 23){
        			$("#company_image").attr("src",newsrc);
        			var del="<div class='a_bg'></div>"
						+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delCompany_image(this,"+ data.fileId +")'>删除</a></div>";
        			$("#company_image").parent().find("img").nextAll().remove();
        			$("#company_image").parent().append(del);
        		}else if(fileType == 25){
        			$("#management_system").attr("src",newsrc);
        			var del="<div class='a_bg'></div>"
					+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delManagement_system(this,"+ data.fileId +")'>删除</a></div>";
        			$("#management_system").parent().append(del);
        			$("#management_sys_tip").css("display","none");
        		}

            }else{
            	window.wxc.xcConfirm(data.message);
            }
		};
	    addInputUtilFile(fileurl,params,fileElementId,fn);
	}        
}

//上传图片文件  mishengliang
function addImg(obj,fileType){
	if($(obj).val()!=""){//上传空间是否为空
		var ul=$(obj).parent().parent().parent();
		var fileName=$(obj).val();
		var imgSrc="/newresources/images/company_1.png";
		var fileElementId = $(obj).attr("id");
		var fileType = fileType;//文件类别
		fileName = fileName.substring(fileName.lastIndexOf("\\")+1,fileName.lastIndexOf("."));
		
		var fileurl = "PfTaskFileCtrl/addOrUpdateTaskImgFile.do";
		var params = {};
		params.companyId=companyId;
		params.fileType=fileType;
		params.fileName=fileName;
		params.formatType="image";
		var fn = function(data){//服务器成功响应处理函数
	      	if (data.success==true &&data.message=="上传成功") {
	     		imgSrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+data.mongodbId;
	     		
				var creatDate = data.creatDate;
	     		var _newli="<li>"
							+"<div class='image_block_pic'>"
								+"<img src='"+imgSrc+"'/>"
								+"<div class='a_bg'></div>"
								+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='deluploadImg(this,"+ data.fileId +")'>删除</a></div>"
							+"</div>"
							+"<div class='edit_div clearfix'>"
								+"<label title='"+ fileName +"'>"+ strVachar(fileName,23) +"</label><input type='text' class='edit_input' style='display:none' value='"+fileName+"'/>"
								+"<a href='javascript:void(0)' class='eidt' style='display:inline' onClick='editImgText(this)'>编辑</a>"
								+"<a href='javascript:void(0)' class='eidt_save'  style='display:none' onClick='saveImgText(this,"+data.fileId+")'>保存</a>"
							+"</div>"
						+"</li>";
				
				$(ul).prepend(_newli);
				//当前上传控件清空
				$(obj).val("");
	         }else{
	        	 window.wxc.xcConfirm(data.message);
	         }
		};
	    addInputUtilFile(fileurl,params,fileElementId,fn);
	}
}

function closeBytimeCount1(num){
	time_c=num;
	time_c=time_c-1;
	if(time_c>=0)
	{
		setTimeout("closeBytimeCount1(time_c)",1000);
	}
	else
	{
		xcconfirm.xcClose();
		location.reload();
	}
}	