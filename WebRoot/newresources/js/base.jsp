<%-- ﻿<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> --%>
<script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script>
<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script>
<script type='text/javascript' src='/newresources/js/spin/spin.js'></script>
<script type='text/javascript' src='/newresources/js/doT/doT.min.js'></script>
<script type='text/javascript' src='/newresources/js/login/plugLogin.js'></script>
<script type="text/javascript">
/**计时器，用于提示框弹出两秒后自动关闭效果*/
var time_c=0;
//登录超时时已提醒弹出登录框标记
var remindLogin_flag=false;
//用于提示框弹出两秒后自动关闭的弹出框对象
var xcconfirm;
var companyId;
var userInfo=getUserInfo1();
$(function(){
	var regAllChar = new RegExp("[\s\S]*");
	if(userInfo!=null){
			var nowUrl=window.location.href;
			var certificationUrl = getwebroot()+"supplierForPlateForm/certification.htm";//非vip登录的认证页面
			if(userInfo.vip){
				certificationUrl = getwebroot()+"supplierForPlateForm/vipApplyAccess.htm";//vip登录的认证页面
			}
			if(nowUrl==getwebroot()+"supplierForPlateForm/registerInfo.htm"||nowUrl==getwebroot()+"index.jsp"||nowUrl==getwebroot()+"login.html"
			||nowUrl==getwebroot()+"userInfo/updatePwd.htm"||nowUrl.indexOf(getwebroot()+"userInfo/updateEmail.htm") != -1
			||nowUrl.indexOf(getwebroot()+"CommonUse/searchCompany.htm?searchKey=") != -1 ||nowUrl==getwebroot()+"userInfo/safeAccount.htm"
			||nowUrl==getwebroot()+"supplierForPlateForm/certification.htm"||nowUrl==getwebroot()+"supplierForPlateForm/vipApplyAccess.htm"
			||nowUrl==getwebroot()+"userInfo/vipFindPwd.htm"||nowUrl==getwebroot()+"userInfo/vipregister.htm"||nowUrl==getwebroot()+"error/subAccountNoSecurity.htm"
			||nowUrl==getwebroot()+"vip"/* vipLogin */||nowUrl==getwebroot()+"helpCenter/newUser/registerAndLogin.html"||nowUrl.indexOf(getwebroot()+"userInfo/vipFindPwd.htm") != -1
			||nowUrl==getwebroot()+"announcement/helpCenterContent.htm"||nowUrl==getwebroot()+"aboutUs.html"||nowUrl==getwebroot()+"error/noSecurity.htm"){                        
				//无操作
			}else{
				if(getCompanyListBySts("true").length==0){
					if(userInfo.account_type==0){
						if(getCompanyListBySts("false").length>0){
							var param ={"companyIdForCertification":getCompanyListBySts("false")[0].company_id};
							addParamsToWindowName(param);
							window.location.href = certificationUrl;//信息填写页面要有vip区分
						}else{
							var param ={"companyIdForCertification":0};
							addParamsToWindowName(param);
							window.location.href = certificationUrl;//信息填写页面要有vip区分
						}
						
					}else if(userInfo.account_type==1){
						go_redirect("error/subAccountNoSecurity.htm");
					}
				}
			}
	}
	/*页面头部描述信息*/
	var metaInfo='<meta name="description" content="四方众协-供应链企业在线商务协作网！生产外协、材料采购、成品采购、MRO采购，供应链金融">'
				+'<meta name="keyword" content="四方众协-供应链企业在线商务协作网！生产外协、材料采购、成品采购、MRO采购，供应链金融">';
	$("head").append(metaInfo);			
});

//=====================全局函数========================
//Tab控制函数
function tabs(tabId, tabNum){
	//设置点击后的切换样式
	$(tabId + " .tab li").removeClass("curr");
	$(tabId + " .tab li").eq(tabNum).addClass("curr");
	//根据参数决定显示内容
	$(tabId + " .tabcon").hide();
	$(tabId + " .tabcon").eq(tabNum).show();
}
//=====================全局函数========================
//获取项目路径
function getwebroot(){
	var location = (window.location+'').split('/');
	var basePath = location[0]+'//'+location[2]+'/';
	return basePath;
}
function getLoginpage(){
	return getwebroot()+"index.jsp";
}
//重定向
function go_redirect(url)
{
	window.location.href=getwebroot()+url;
}

//获取url参数值
function getQueryString(name) {  
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
      var r = window.location.search.substr(1).match(reg);  
      if (r != null) return unescape(r[2]);  
      return null;  
 } 
/**
 * 数组元素去重
* uniquet
* @param arr
* @returns
* @return any
* @author chenlong
* 2016-12-9
 */
var uniquet = function(arr){
	  var res = [];
	  var json = {};
	  for(var i = 0; i < arr.length; i++){
	   if(!json[arr[i]]){
	    res.push(arr[i]);
	    json[arr[i]] = 1;
	   }
	  }
	  return res;
	 };
//是否为空或null或undefined
function isNullOrEmptyOrUndefined(obj)
{
	if(obj==null){return true;}
	else if(typeof(obj)=="undefined"){return true;}
	else if($.trim(obj)==""){return true;}
	else return false;
}

/**jquery ajax通用调用
 * url：请求路径
 * params：参数对象{xx：xx}
 * isasync：是否异步；true，异步；false:同步
 * fn:请求成功后的回调函数
 * */
function asyncAjaxMethod(url,params,isasync,fn){
	params.csrftoken ="${sessionScope.csrftoken }";
	var opts={lines: 10, // 花瓣数目
            length: 8, // 花瓣长度
            width: 5, // 花瓣宽度
            radius: 10, // 花瓣距中心半径
            corners: 1, // 花瓣圆滑度 (0-1)
            rotate: 0, // 花瓣旋转角度
            direction: 1, // 花瓣旋转方向 1: 顺时针, -1: 逆时针
            color: '#ccc', // 花瓣颜色
            speed: 1, // 花瓣旋转速度
            trail: 60, // 花瓣旋转时的拖影(百分比)
            shadow: false, // 花瓣是否显示阴影
            hwaccel: false //spinner 是否启用硬件加速及高速旋转  
			, position: 'relative'
			};
	var spinner = new Spinner(opts);
	$.ajax({
		   type: "POST",
		   async:isasync,
		   url: getwebroot()+url,
		   dataType:'json',
		   data:params,
		   beforeSend: function () {
		   	$("body").append("<div id='spin_wrap'></div>");
		   	$("#spin_wrap").addClass("spin_mask");
			spinner.spin(document.getElementById("spin_wrap"));
		   },
		   success:function(result){
		   		//关闭loding效果
		   		spinner.spin();
		   		$("body #spin_wrap").remove();
				if(result.success==false){
					//人为抛出异常，但是要求设置success=false
					if(result.ajaxErrorCode==999){
						if(hasRemainLoginPop()){//有弹出过登录框
							remindLogin_flag=true;
						}
						if(!remindLogin_flag){
							window.wxc.xcConfirm("登录超时，请重新登录", window.wxc.xcConfirm.typeEnum.confirm,
							{
								onClose:function(){//超时，则弹出登录框
									window.plugLogin();
								}
							});
						}
			    	}else if(result.ajaxErrorCode==970){
			    		go_redirect("error/noSecurity.htm");
			    	}else if(result.ajaxErrorCode==980){
			    		go_redirect("error/beKick.html");
			    	}else if( result.ajaxErrorCode==300)
			    	{
			    		var option ={title:"提示",btn:parseInt("0001",2)};
		            	window.wxc.xcConfirm(result.message, window.wxc.xcConfirm.typeEnum.custom,option);
			    	}
			    	else
			    	{
			    		//300:请求参数异常
			    		window.wxc.xcConfirm("操作失败,请稍后再试", window.wxc.xcConfirm.typeEnum.error);
			    	}
			    		
				}else{//默认success==true
					if(result.ajaxErrorCode==200){
			    		if(fn!=null && typeof(fn)=="function"){
			    			fn(result);
			    		}
			    	}else{
			    		window.wxc.xcConfirm('抱歉,返回标志错误,请稍后再试或与管理员联系', window.wxc.xcConfirm.typeEnum.error);
			    	}
				}
		   },
		   //异常未捕获时，跳转到这里
		   error: function (XMLHttpRequest, textStatus, errorThrown) {
	            //关闭loding效果
		   		spinner.spin();
		   		$("body #spin_wrap").remove();
		   		if(XMLHttpRequest.status==404){
		   			go_redirect("error/404.html");
		   		}else if(XMLHttpRequest.status==500){
		   			go_redirect("error/500.html");
		   		}else{
		   			window.wxc.xcConfirm('抱歉,程序异常未捕获,请稍后再试或与管理员联系', window.wxc.xcConfirm.typeEnum.error);
		   		}
		   }
		});
	return remindLogin_flag;
}

function zTreeOnAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
    window.wxc.xcConfirm('抱歉,程序异常未捕获,请稍后再试或与管理员联系', window.wxc.xcConfirm.typeEnum.error);
};

//判断平台是否登录
function checkLoginForPlateForm(){
	var result={};
	result.isLogin = false;
	$.ajax({
		   type: "POST",
		   url: getwebroot()+"plateFormCommon/checkLoginForPlateForm.do",
		   async:false,//同步
		   dataType:'json',
		   timeout:10,
		   data: {
		     time: new Date().getTime()
		    },
		   success: function(obj){
		   		obj=JSON.parse(obj);//eval('(' + obj + ')');
		   		if(obj.success==1){
		   			result.data = obj.data;
	    			result.isLogin= true;
	    		}
		    	
		   },
		    error: function (XMLHttpRequest, textStatus, errorThrown) {
                 result.isLogin= false;
            } 
		});
	
	return result;
}

/**
 * 判断平台是否登录
 * isLoginForPlateForm
 * @returns result
 * @author mishengliang
 * 2016-8-12 下午2:49:34
 */
function isLoginForPlateForm(){
	var result={};
	result.isLogin = false;
	$.ajax({
		type: "POST",
		url: getwebroot()+"plateFormCommon/isLoginForPlateForm.do",
		async:false,//同步
		dataType:'json',
		timeout:10,
		data: {
			time: new Date().getTime()
		},
		success: function(obj){
			if($.type(obj)!="object"){
				obj=JSON.parse(obj);//eval('(' + obj + ')');
			}
			if(obj.success==1){
				result.data = obj.data;
				result.isLogin= true;
			}
			
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			result.isLogin= true;
		} 
	});
	return result;
}

//从表单获取json格式对象
function getJSONDataByID(formID){
	var d = {};
	var f =$('#'+formID);
	if(f){
		var t = f.serializeArray();   
	    $.each(t, function() {
	      d[this.name] = this.value;
	    });
	}
    return d;
}
//==================图片详细页函数=====================
//鼠标经过预览图片函数
function preview(img){
	$("#preview .jqzoom img").attr("src",$(img).attr("src"));
	$("#preview .jqzoom img").attr("jqimg",$(img).attr("bimg"));
}

//图片预览小图移动效果,页面加载时触发
$(function(){
	var tempLength = 0; //临时变量,当前移动的长度
	var viewNum = 5; //设置每次显示图片的个数量
	var moveNum = 2; //每次移动的数量
	var moveTime = 300; //移动速度,毫秒
	var scrollDiv = $(".spec-scroll .items ul"); //进行移动动画的容器
	var scrollItems = $(".spec-scroll .items ul li"); //移动容器里的集合
	var moveLength = scrollItems.eq(0).width() * moveNum; //计算每次移动的长度
	var countLength = (scrollItems.length - viewNum) * scrollItems.eq(0).width(); //计算总长度,总个数*单个长度
	  
	//下一张
	$(".spec-scroll .next").bind("click",function(){
		if(tempLength < countLength){
			if((countLength - tempLength) > moveLength){
				scrollDiv.animate({left:"-=" + moveLength + "px"}, moveTime);
				tempLength += moveLength;
			}else{
				scrollDiv.animate({left:"-=" + (countLength - tempLength) + "px"}, moveTime);
				tempLength += (countLength - tempLength);
			}
		}
	});
	//上一张
	$(".spec-scroll .prev").bind("click",function(){
		if(tempLength > 0){
			if(tempLength > moveLength){
				scrollDiv.animate({left: "+=" + moveLength + "px"}, moveTime);
				tempLength -= moveLength;
			}else{
				scrollDiv.animate({left: "+=" + tempLength + "px"}, moveTime);
				tempLength = 0;
			}
		}
	});
});

//==================注销当前账户=====================
function doLoginOut(){
	var csrftoken="${sessionScope.csrftoken }";
	var result = isLoginForPlateForm();
		window.wxc.xcConfirm("是否确定退出当前账号！", window.wxc.xcConfirm.typeEnum.custom,{
			title:"提示",
			icon:"0 0",
			btn: parseInt("0011",2),
			onOk:function(){
				var _loginId=$("#loginName_span").text();
				$.ajax({
					type: "POST",
					url: getwebroot()+"plateFormCommon/doLogout.do",
					async:true,//同步
					dataType:'json',
					data: {
						login_id: _loginId,
						csrftoken:csrftoken
					},
					success: function(obj){
						$(".dologin").css({display:'block'});
						$(".haslogin").css({display:'none'});
						$("#loginName_span").text("");
						$("#data_pwd").val("");
						$("#data_vCode").val("");
						//location.reload(true);//从服务端取最新的页面
						if(result.data.vip==true){
							window.location.href=getwebroot()+"vip";//vipLogin
						}else{
							window.location.href=getwebroot()+"login.html";
						}
						
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
					} 
				});
//				var _loginId=$("#loginName_span").text();
//				var url="plateFormCommon/doLogout.do";
//				var params={login_id: _loginId};
//				var fn=function(result){
//					if(result.success)
//					{
//						$(".dologin").css({display:'block'});
//						$(".haslogin").css({display:'none'});
//						$("#loginName_span").text("");
//						$("#data_pwd").val("");
//						$("#data_vCode").val("");
//						//location.reload(true);//从服务端取最新的页面
//						window.location.href=getwebroot()+"login.html";
//					}
//				};
//				asyncAjaxMethod(url,params,true,fn);
				return true;
			},
			onCancel:function(v){
				return false;
			}
		});
}
	/**用""代替null*/
	function replaceNullAsStr(obj){
		if(obj==null){
			return "";
		}else if(obj == undefined){
			return "";
		}else{
			return obj;
		}
	}
	/**用""代替0*/
	function replaceZeroAsStr(obj){
		if(obj==0){
			return "";
		}else if(obj == 0.0){
			return "";
		}else{
			return obj;
		}
	}
	/**用""代替0和Null*/
	function replaceZeroAndNullAsStr(obj){
		if(obj==null){
			return "";
		}else if(obj == undefined){
			return "";
		}else if(obj == 0){
			return "";
		}else if(obj == 0.0){
			return "";
		}else{
			return obj;
		}
	}
	/**截取字符串中的日期部分
	*/
	function showBeforeOfDateStr(dataStr){
		var result="";
		if(dataStr!=null && dataStr.length>10){
			result=dataStr.substring(0,10);
		}
		return result;
	}
	/**两个日期的差值(d1 - d2),并向上取整
	 * d1:'2009-01-01'
	 * d2:'2009-02-01'*/
	function dateDiff(d1,d2){
	   var day = 24 * 60 * 60 *1000;
		   
	   var dateArr = d1.split("-");
	   var checkDate = new Date();
	   checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
	   var checkTime = checkDate.getTime();
	  
	   var dateArr2 = d2.split("-");
	   var checkDate2 = new Date();
	   checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);
	   var checkTime2 = checkDate2.getTime();
	    
	   var cha = (checkTime - checkTime2)/day;  
	   return Math.ceil(cha);
		    
	}
	/**判断给定时间距离当前时间 几天，向上取整
	 * d:'2016-09-20 12:34:56'*/
	function dateDiff2(d){
		var now=new Date().getTime();
		var d2=Date.parse(d.replace(/-/g, "/"));
		var d1=new Date(d2).getTime();
		var cha=(now-d1)/(24 * 60 * 60 *1000);
		return Math.ceil(cha);
	}
	/**比较日期前后
	 * d1:'2009-01-01'
	 * d2:'2009-02-01'*/
	function isD1AfterD2(d1,d2){
		return dateDiff(d1,d2)>0;
	}
	//时间比较(yyyy-mm-dd hh:mi:ss)
	function comptime(t1,t2) {
		var a = (Date.parse(t2) - Date.parse(t1)) / 3600 / 1000;
		return a;
	}
	/** 日期加上天数后的新日期 */
	function AddDays(date,days){
		var dateArr = d1.split("-");
	    var nd = new Date();
	    nd.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
		nd = nd.getTime();
		nd = nd + days * 24 * 60 * 60 * 1000;
		nd = new Date(nd);
		var y = nd.getFullYear();
		var m = nd.getMonth()+1;
		var d = nd.getDate();
		if(m <= 9) m = "0"+m;
		if(d <= 9) d = "0"+d; 
		var cdate = y+"-"+m+"-"+d;
		return cdate;
	}
	/**获取当前时间的年月日*/
	function getCurrentDate(){
		var nd = new Date();
		var y = nd.getFullYear();
		var m = nd.getMonth()+1;
		var d = nd.getDate();
		if(m <= 9) m = "0"+m;
		if(d <= 9) d = "0"+d; 
		var cdate = y+"-"+m+"-"+d;
		return cdate;
	}
	
//==================时间格式初始化=====================
// 使用例子 ： (new Date()).Format("yy-MM-dd HH:mm:ss")
Date.prototype.Format = function(fmt) 
{ 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "H+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
    if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
};

//更新用户的基本信息
function updateBaseInfo(params,btn,companyId){
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
				if(btn != "del"){//不是删除操作；单独的删除操作不做提示信息
					var option ={hasTitle:true,title:"提示",btn:parseInt("0001",2),onOk:function(){location.reload();}};
					xcconfirm=new window.wxc.xcConfirm("保存成功",window.wxc.xcConfirm.typeEnum.custom,option);
					closeBytimeCount(2);//两秒后自动关闭
				}
			}else{
				var option ={hasTitle:true,title:"提示",btn:''};
				xcconfirm=new window.wxc.xcConfirm("保存失败",window.wxc.xcConfirm.typeEnum.custom,option);
			}
		}
	};
	asyncAjaxMethod(url,params1,isasync,fn);
}

//获取当前用户的信息
function getUserInfo1(){
	var result = isLoginForPlateForm();
	return result.data;
}
//将js的数组对象转化为String 格式为：A:a,B:b; A:a,B:b; A:a,B:b;...  A:a,B:b;即为为一个模块 A B为属性名称，a b为各自的属性值 mishengliang
function objectArrayToString(objectArray){
	var objectArrayString="";//合成的String对象
	for(var i = 0; i < objectArray.length; i++){
		var propertyList = "";//单个对象合成的String单元
		for(var p in objectArray[i]){
			propertyList += p + ":" + objectArray[i][p] + ",";
		}
		propertyList = propertyList.substring(0, propertyList.length-1);//单个对象模块切掉最后一个逗号
		objectArrayString += propertyList + ";";
	}
	return objectArrayString;
}

//上传后显示图片 mishengliang
//obj input标签
function showPic(obj){
		var fileType,fileName,fileElementId;//文件类型,文件名字,文件上传inputId
		var isUpdate;//0 || null 增加,1 更新
		
		var defaultUploadImage = $(obj).prev().find("img").attr("src");
		if(defaultUploadImage == "/newresources/images/uploadImg.png" || defaultUploadImage == "/newresources/images/uploadlogo.png" || defaultUploadImage == "/newresources/images/uploadfigure.png"){
			isUpdate = 0;
		}else{
			isUpdate = 1;
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
	   	var fileurl = "PfTaskFileCtrl/addOrUpdateTaskImgFile.do";
		var params = {};
		params.fileType=fileType;
		params.companyId=companyId;
		params.fileName=origfilename;
		params.isUpdate=isUpdate;
		params.formatType="image";
		var fn = function(data){//无操作
		        	if (data.success==true &&data.message=="上传成功") {  
		        		var newsrc=getwebroot()+"PfTaskFileCtrl/downLoadFileFormMongo.do?fileId="+data.mongodbId;
		        		if(fileType == 18){
			        		$("#business_licence").attr("src",newsrc);
			        		var del="<div class='a_bg'></div>"
								+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delManagement_system(this,"+ data.fileId +")'>删除</a></div>";
			        		$("#business_licence").parent().append(del);
		        		}else if(fileType == 19){
		        			$("#tax_registration_certificate").attr("src",newsrc);
		        			var del="<div class='a_bg'></div>"
								+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delManagement_system(this,"+ data.fileId +")'>删除</a></div>";
		        			$("#tax_registration_certificate").parent().append(del);
		        		}else if(fileType == 20){
		        			$("#organization_code_certificate").attr("src",newsrc);
		        			var del="<div class='a_bg'></div>"
								+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delManagement_system(this,"+ data.fileId +")'>删除</a></div>";
		        			$("#organization_code_certificate").parent().append(del);
		        		}else if(fileType == 21){
		        			$("#taxpayer_qualification_certification").attr("src",newsrc);
		        			var del="<div class='a_bg'></div>"
								+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delManagement_system(this,"+ data.fileId +")'>删除</a></div>";
		        			$("#taxpayer_qualification_certification").parent().append(del);
		        		}else if(fileType == 22){
		        			$("#company_logo").attr("src",newsrc);
		        			var del="<div class='a_bg'></div>"
								+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delManagement_system(this,"+ data.fileId +",22)'>删除</a></div>";
		        			$("#company_logo").parent().append(del);
		        		}else if(fileType == 23){
		        			$("#company_image").attr("src",newsrc);
		        			var del="<div class='a_bg'></div>"
								+"<div class='oprate_wrap'><a href='javascript:void(0)' onClick='delManagement_system(this,"+ data.fileId +",23)'>删除</a></div>";
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
   		addInputUtilFile(fileurl,param,fileElementId,fn);
		}        
}

//删除上传的图片对象 mishengliang
function deluploadImg(obj,fileId){
	var url = "PfTaskFileCtrl/deleteTaskFile.do";
	var params = {};
	var isasync = true;
	var fn = function(){
		//无操作
	};
	
	params.fileId = fileId;
	asyncAjaxMethod(url,params,isasync,fn);
	
	$(obj).parent().parent().parent().remove();
}

//删除管理体系图片对象 mishengliang   删除后替代的图片并不一致
function delManagement_system(obj,fileId,fileType){
	var url = "PfTaskFileCtrl/deleteTaskFile.do";
	var params = {};
	var isasync = true;
	var fn = function(){
		var parentObj=$(obj).parent().parent();
		if(fileType == 22){//logo
			parentObj.find("img").attr("src","/newresources/images/uploadlogo.png"); 
		}else if(fileType == 23){//企业形象
			parentObj.find("img").attr("src","/newresources/images/uploadfigure.png"); 
		}else{//其它
			parentObj.find("img").attr("src","/newresources/images/uploadImg.png"); 						 
		}
		$(obj).parent().prev().remove();
		$(obj).parent().remove();
	};
	
	params.fileId = fileId;
	asyncAjaxMethod(url,params,isasync,fn);
}

//编辑上传的图片名称 mishengliang
function editImgText(obj){
	$(obj).css("display","none");
	$(obj).next().css("display","inline");
	$(obj).parent().find("label").css("display","none");
	$(obj).parent().find("input[type=text]").css({"display":"block"},{"border":"1px solid #ccc"});
}

function saveImgText(obj,fileId)
{
		var url = "PfTaskFileCtrl/updateTaskFile.do";
		var fileName = $(obj).parent().find("input").val();
		
		var params = {};
		params.id = fileId;
		params.fileName = fileName;
		var isasync = true;
		var fn = function(){
			$(obj).css("display","none");
			$(obj).prev().css("display","inline");
			$(obj).parent().find("label").css("display","inline");
			$(obj).parent().find("label").html(strVachar(fileName,23));
			$(obj).parent().find("input[type=text]").css({"display":"none"});
		};
			
		asyncAjaxMethod(url,params,isasync,fn);//执行保存操作
}

/**
 * 测试字符串所占长度  127-特殊字符及中文   94： 脱字符^ 占两位字符
 * @param str 要检测的字符串
 * @return 返回数组，该字符查过页面显示的长度后，截取并加上“...”
 * @author chenlong
 * 2016-6-1 
 */
function strVachar(str,leng){	
	var len = 0;
	var ch = 0;
	var substr ="";
	if(str==null){
		return "";
	}else if(str == undefined){
		return "";
	}else{
	for(var i = 0;i < str.length; i++){
		if(str.charCodeAt(i)>172 || str.charCodeAt(i)==94){//127-特殊字符及中文   94： 脱字符^			
			len +=1.8;//中文和英文宽度比大概是1.8
			ch = i;			
		}else if(str.charCodeAt(i)<=172 || str.charCodeAt(i)!=94){
			len ++;
			ch = i;		
		}
		if(len>=parseInt(leng)){
			substr = str.substring(0,parseInt(ch+1))+"...";	
			break;
		}		
	}
	if(len<parseInt(leng)){
		return str;
	}
	}
	return substr;
}

/**
 * 测试字符串所占长度  127-特殊字符及中文   94： 脱字符^ 占两位字符
 * strlen
 * @param str 要检测的字符串
 * @return len 字符长度
 * @author mishengliang
 * 2016-5-31 
 */
function strlen(str){
	var len = 0;
	for(var i = 0;i < str.length; i++){
		if(str.charCodeAt(i)>172 || str.charCodeAt(i)==94){//127-特殊字符及中文   94： 脱字符^
			len += 2;
		}else{
			len++;
		}
	}
	return len;
}

/**
 * 弹出框两秒后自动关闭效果
 * closeBytimeCount
 * @param num  计时器秒数
 * @author yangliping
 * 2016年5月26日11:28:37
 */
function closeBytimeCount(num){
	time_c=num;
	time_c=time_c-1;
	if(time_c>=0)
	{
		setTimeout("closeBytimeCount(time_c)",1000);
	}
	else
	{
		xcconfirm.xcClose();
	}
}	

/**
 * 获取当前状态
* getNowState
* @returns any
* @author yukai
* 2016-8-3 上午11:15:16
*/
function getNowState()
{
		var url = "supplierForPlateForm/getApplyStsByCompanyId.do";
		var params = {};
		var state;
		params.companyId = companyId;
		
		var isasync = false;
		var fn = function(result){
			if(result.success){
				state = result.applySts;
			}else{
				state=null;
			}
		};
		asyncAjaxMethod(url,params,isasync,fn);
		return state;
}

/**
 * 当前用户是否有某个页面的某个功能权限
 * @param {} func_code 功能代码，如add_btn 新增按钮 自定义
 * @param {} page_path 页面路径
 * @return {} true or false
 * @author yangliping
 * @date 2016-7-25 14:00:09
 */
function hasRoleFuncAuth(func_code,page_path)
{
	var flag=false;
	var url="plateFormCommon/hasRoleFuncAuth.do";
	var params={};
	params.func_code=func_code;
	params.page_path=page_path;
	
	var fn=function(result)
	{
		if(result.data==true)
		{
			flag=true;
		}
		
	};
	asyncAjaxMethod(url,params,false,fn);
	return flag;
}
/**
 * 当前用户是否有某个页面权限
 * hasRolePageAuth
 * @param page_path
 * @returns {Boolean} Boolean
 * @author yangliping
 * 2016-8-11 下午1:21:29
 */
function hasRolePageAuth(page_path)
{
	var flag=0;
	var url="plateFormCommon/hasRolePageAuth.do";
	var params={};
	params.page_path=page_path;
	var fn=function(result)
	{
		if(result.data==true)
		{
			flag=1;
		}
		
	};
	asyncAjaxMethod(url,params,false,fn);
	var has_pop=hasRemainLoginPop();
	if(has_pop){
		flag=-1;
		}
	return flag;
}

/**
 * 判断是否有登录超时弹出过登录框
 * hasRemainLoginPop
 * @returns {Boolean} Boolean
 * @author yangliping
 * 2016-9-8 上午11:40:22
 */
function hasRemainLoginPop()
{
	var flag=false;
	var txtdiv=$(".txtBox");
	if(txtdiv.length && txtdiv.children()[1].innerHTML=="登录超时，请重新登录"){
		flag=true;
	}
	return flag;
}

/**
 * 根据主账号ID获取已认证公司列表
 * getCompanyList void
 * @author yukai
 * 2016-8-5 上午9:01:10
 */
function getCompanyList(companyvo){
	var url="supplierForPlateForm/getCompanyListByRegId.do";
	var params={};
	params.pass="true";
	var fn = function(result){
		if(result.data!=null&&result.data.length>0){
			firstCompanyId=result.data[0].company_id;
			var item="";
			var company_name="";
			var flag=false;
			for(var i=0;i<result.data.length;i++){
				var companyvos = parseInt(companyvo);		
				if(companyvos==result.data[i].company_id){
				  company_name = result.data[i].cpyname_cn;
				  flag=true;
				}
				item+='<option value="'+result.data[i].company_id+'">'+result.data[i].cpyname_cn+'</option>';
			}
			$("#company").prev().find("span").html(company_name!=""?company_name:result.data[0].cpyname_cn);
			$("#company").append(item);
			if(result.data.length>1){
				$("#company").prev().append("<img src='/newresources/images/switchover.png' class='ml10'>");
			}
			if(flag){
				$("#company").val(companyvos);
			}else{
				$("#company").val(result.data[0].company_id);
				var param ={"companyIdForAll":firstCompanyId};
				addParamsToWindowName(param);
			}
		}
	};
	asyncAjaxMethod(url,params,false,fn);
}

/**
 * 获取授权的左侧菜单数据
 * getMenuData
 * @param parentId 父级菜单ID
 * @returns json格式两级数据
 * @author yangliping
 * 2016-8-2 下午2:00:39
 */
function getMenuData(parentId)
{
	var returnData={};
	
	var url="plateFormCommon/getSysAuthMenus.do";
	var params={};
	params.parentId=parentId;
	var fn=function(result)
	{
		if(result.total>0)
		{
			returnData=result.data;
		}
	};
	var remindLogin= asyncAjaxMethod(url,params,false,fn);
	return returnData;
}

/**
* getCompanyListBySts
* @returns returnData
* @author yukai
* 2016-8-3 上午11:14:40
*/
function getCompanyListBySts(pass)
{
	var returnData={};
	var url="supplierForPlateForm/getCompanyListByRegId.do";
	var params={};
	params.pass=pass;
	var fn=function(result){
		returnData=result.data;
	};
	asyncAjaxMethod(url,params,false,fn);
	return returnData;
}

//公用数组参数，以后增加的参数直接增加到数组中
var commonParams = ["companyIdForAll","companyIdForWindow","companyIdForCusomer","record_id","accepter_id","h_id"];
/**
 * 增加对象到window.name中
 * 1.重复添加同一属性，此属性之前的值被覆盖
 * 2.属性不同，增加到数据之后
 * addParamsToWindowName
 * @param params 要在window.name中增加的对象
 * @author mishengliang
 * 2016-8-24 下午1:59:19
 */
function addParamsToWindowName(params){
	var winName = window.name;
	var winNowObject;
	var hasNoCparam;//原属性中有必要的属性 不存在：true； 全部存在：false；
	if(winName == "" || winName == null|| winName == "null"){
		window.name = JSON.stringify(params);
	}else{
		var cparams = {};
		var winOrginObject = JSON.parse(winName);
		for(var i = 0; i < commonParams.length; i++){
			cparams[commonParams[i]] = winOrginObject[commonParams[i]];
		}
		winNowObject = $.extend(cparams,params);
		window.name = JSON.stringify(winNowObject);
	}
}

/**
 * 获取window.name中的指定参数对应的值
 * getParamFromWindowName
 * @param param 获取属性的键值key
 * @returns string 属性对应的值value
 * @author mishengliang
 * 2016-8-24 下午2:18:56
 */
function getParamFromWindowName(param){
	var winName = window.name;
	if(winName == null || winName == "" || winName == "null"){
		return "";
	}else{
		var winOrginObject = JSON.parse(winName);
		return winOrginObject[param];
	}
}

/**
 * 获取cookie
 * getCookie
 * @param c_name
 * @returns any
 * @author mishengliang
 * 2016-10-12 上午11:39:13
 */
function getCookie(c_name){
	if (document.cookie.length>0){ 
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){ 
			c_start=c_start + c_name.length+1; 
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return "";
}

/**
 * 设置cookie
 * setCookie
 * @param c_name cookie名字
 * @param value cookie值
 * @param expiredays 失效时间 单位：天
 * @author mishengliang
 * 2016-10-12 上午11:39:33
 */
function setCookie(c_name,value,expiredays){
	var cookieStr = "";
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie = c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : "; expires="+exdate.toGMTString())+";path=/";
}


/**
 * 删除cookie
 * delCookie
 * @param c_name cookie名字
 * @author mishengliang
 * 2016-10-12 下午1:41:13
 */
function delCookie(c_name) 
{ 
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=getCookie(c_name);
    if(cval!=null) 
        document.cookie= c_name + "=;expires="+exp.toGMTString(); 
} 

/**
 * trim 方法，防止浏览器不支持trim()方法
 * commonTrim
 * @param x
 * @returns any
 * @author mishengliang
 * 2016-11-15 上午8:56:54
 */
function commonTrim(x){
	return x.replace(/^\s+|\s+$/gm,'');
}

/**
* addInputUtilFile
* @param fileurl:上传的文件的接口路经
* @param param：上传的参数
* @param fileElementId：上传的文件所在input框的id名
* @param fn：上传成功后的回调函数
* @author chenlong
* 2016-12-7
*/
function addInputUtilFile(fileurl,param,fileElementId,fn){
	param.csrftoken ="${sessionScope.csrftoken }";
	//异步加载loading效果插件参数
	var opts={lines: 10, // 花瓣数目
	length: 5, // 花瓣长度
	width: 5, // 花瓣宽度
	radius: 10, // 花瓣距中心半径
	corners: 1, // 花瓣圆滑度 (0-1)
	rotate: 0, // 花瓣旋转角度
	direction: 1, // 花瓣旋转方向 1: 顺时针, -1: 逆时针
	color: '#ccc', // 花瓣颜色
	speed: 1, // 花瓣旋转速度
	trail: 60, // 花瓣旋转时的拖影(百分比)
	shadow: false, // 花瓣是否显示阴影
	hwaccel: false //spinner 是否启用硬件加速及高速旋转
				, position: 'relative'
				};
	var filename=$("#"+fileElementId).val();//上传的文件信息	
	var spinner = new Spinner(opts);
	if(filename!=""){		
		$.ajaxFileUpload({
			url: getwebroot()+fileurl, //用于文件上传的服务器端请求地址
			data: param,  //任务id参数		
			fileElementId: fileElementId,//input type=file 的id
			dataType: 'json',//返回值类型 一般设置为json
			beforeSend: function () {
				$("body").append("<div id='spin_wrap'></div>");
				$("#spin_wrap").addClass("spin_mask");
				spinner.spin(document.getElementById("spin_wrap"));
			},
			success: function (data, status)  //服务器成功响应处理函数
			{				
				//关闭loding效果		
				spinner.spin();
				$("body #spin_wrap").remove();				
				if(fn!=null && typeof(fn)=="function"){fn(data);}				
			},
			error: function (data, status, e)//服务器响应失败处理函数
			{		
				//关闭loding效果
				spinner.spin();
				$("body #spin_wrap").remove();			
				var option ={title:"提示",btn:parseInt("0001",2)};
				window.wxc.xcConfirm("解析失败", window.wxc.xcConfirm.typeEnum.custom,option);
			}
		});	
	}else{
		var option ={title:"提示",btn:parseInt("0001",2)};
		window.wxc.xcConfirm("请先选择上传的文件", window.wxc.xcConfirm.typeEnum.custom,option);
	}
}
</script>
