var can_submit_file=false;

$(function(){
	$("#qc_file_table").val("");
	$("#qc_file_name").val("");
});
//下载模板
function downloadTemplate(){
	var temppath="/doc/ImportUserTemplate.xlsx";
	var file_path=encodeURIComponent(encodeURIComponent(temppath));
	if(isLoginForPlateForm().isLogin){
		window.open(getwebroot()+'subAccount/downloadFile.do?file_path='+file_path, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
	}else{
		var option ={title:"提示",btn:parseInt("0001",2),onOk:function(){window.location.href=getwebroot()+"login.html";}};
		window.wxc.xcConfirm("尚未登录或登录失效", window.wxc.xcConfirm.typeEnum.custom,option);
	}
}
//显示上传界面
function showUploadView(){
	$(".mask").fadeIn("fast");
	$("#import_subAccount").fadeIn("fast");
	$("#sel_file").val("");
}
function showviewtext(){
	var filename=$("#qc_file_table").val();
	$("#qc_file_name").val(filename);
	if (filename){
		$("#qc_file_name").nextAll(".info_explain").fadeOut("fast");
	}
}
//子账号附件选择文件改变事件
function upload_qc_file()
{
	 var filename=$("#qc_file_table").val();
	 $("#qc_file_name").val(filename);
	 if(filename){
			var fileurl = "subAccount/importSub.do";
			var params = {};
			var fn = function(data){
	        	if (data.success) {
	        		var option ={title:"提示",btn:parseInt("0001",2),onOk:function(){window.location.reload();}};
		        	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
	        		//window.wxc.xcConfirm("true:"+data.message);
		        	$("#file_no").val(1);
	            }else{
	            	var option ={title:"提示",btn:parseInt("0001",2)};
	            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
	            }
			};
		    addInputUtilFile(fileurl,params,"qc_file_table",fn);	 
		 
	   	   /*$.ajaxFileUpload({
		        url: getwebroot()+'subAccount/importSub.do', //用于文件上传的服务器端请求地址		  
		        fileElementId: "qc_file_table",//input type=file 的id
		        dataType: 'json',//返回值类型 一般设置为json
		        success: function (data, status){
		        	if (data.success) {
		        		var option ={title:"提示",btn:parseInt("0001",2),onOk:function(){window.location.reload();}};
			        	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
		        		//window.wxc.xcConfirm("true:"+data.message);
			        	$("#file_no").val(1);
		            }else{
		            	var option ={title:"提示",btn:parseInt("0001",2)};
		            	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
		            }
		        }, //服务器成功响应处理函数
		        error: function (data, status, e)//服务器响应失败处理函数
		        {
		        	 var option ={title:"提示",btn:parseInt("0001",2)};
		        	 window.wxc.xcConfirm('解析失败', window.wxc.xcConfirm.typeEnum.custom,option);
		        	}
		        });*/
	   	   }
	 else{
		 $("#qc_file_name").nextAll(".info_explain").html("<img src='/newresources/images/new/er.png' /><span class='redcolor'>"+"请选择文件"+"</span>");
    	 $("#qc_file_name").nextAll(".info_explain").fadeIn("fast");
	 }
}

function downloadSubAccount(){
	if(isLoginForPlateForm().isLogin){
		window.open(getwebroot()+'subAccount/downloadSubAccountExcel.do?', 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');	
	}else{
		var option ={title:"提示",btn:parseInt("0001",2),onOk:function(){window.location.href=getwebroot()+"login.html";}};
		window.wxc.xcConfirm("尚未登录或登录失效", window.wxc.xcConfirm.typeEnum.custom,option);
	}
}