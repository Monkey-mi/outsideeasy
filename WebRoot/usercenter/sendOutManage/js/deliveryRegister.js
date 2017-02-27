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
var companyId = getParamFromWindowName("companyIdForAll");
var drivervo = "";
var licence_platevo = "";
var phone_numbervo =  "";

/*
 * 页面加载事件
 * create_by yangliping 2016-6-30 17:32:19
 * */ 
$(function(){
		loadCommonPage();
		getShippingId();// 生成运单号
		getForSelect(1);//加载下拉选项框
		$(".midd_wrap").css({minHeight:$(window).height()-200});
		$(".midd_left_wrap").css({minHeight:$(window).height()-200});
		$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		
		window.onresize=function(){
			$(".midd_wrap").css({minHeight:$(window).height()-200});
			$(".midd_left_wrap").css({minHeight:$(window).height()-200});
			$(".midd_right_wrap").css({minHeight:$(window).height()-200});
		};
		$("#driverInfoListWrap,#carInfoListWrap").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"minimal-dark"
		});
		
		$("#addflag").val("true");
		$("#save_phones").prop("checked",false);
		$("#start_date").val(new Date().Format("yyyy-MM-dd"));		
		classNameReg("con2");
		classNameReg("memoCon");
});
/**
 * 加载下拉选项框
* getForSelect
* @return void
* @author chenlong
* 2016-12-19
 */
function getForSelect(vojs){
	var url = "shippingRegistration/getForSelect.do";
	var param = {company_id:companyId};
	var fn = function(result){	
		$("#driver").empty();
		$("#licence_plate").empty();
		$("#phone_number").val("");
		if(result.data.lDriverMobilePhones.length!=0){		
			var evalTexts=doT.template($("#selectDriverDown").text());
			$("#driver").html(evalTexts(result.data.lDriverMobilePhones));	
		}
		if(result.data.licensePlates.length!=0){	
			var evalText=doT.template($("#selectLicenseDown").text());
			$("#licence_plate").html(evalText(result.data.licensePlates));
		}
		$("#licence_plate").comboSelect();
		$("#driver").comboSelect(); 
		if(parseInt(vojs)!=1){
			$("#licence_plate").nextAll(".combo-input").val(licence_platevo); 	
			$("#driver").nextAll(".combo-input").val(drivervo);	
			$("#phone_number").val(phone_numbervo);
		}
	};
	asyncAjaxMethod(url,param,true,fn);	 
}

/**
 * 保存司机和手机号
* save_phones
* @param obj
* @return void
* @author chenlong
* 2017-1-7
 */
function save_phones(obj){
	if($(obj).is(":checked")){	
		var phone_reg =/^1[3|4|5|8][0-9]\d{4,8}$/;//手机号  
		var mathx_reg =/^\d{6}$/;//匹配6个数字
		var driver_name = $("#driver").nextAll(".combo-input").val();
		var phone_number = $("#phone_number").val();					
		var error_str = "";	
		if(phone_number=="")
   	     {
   		        error_str="手机号不能为空";
   	      }else if(phone_number.length == 6){
   		      if(!mathx_reg.test(phone_number)){
   			    error_str="手机号格式不正确";
   		      }
          }else{
       	    if(!phone_reg.test(phone_number)){
   			    error_str="手机号格式不正确";
   	          }else if(phone_number.length>20){
   			    error_str="手机号号长度不能超过20";
   		    } 
          }
		 if(driver_name==""){
				error_str="姓名不能为空";
			} else if(driver_name.length>10){
				error_str="姓名长度不能超过10";
			}else if(driver_name=="请选择司机"){
				error_str="请选择司机";
			} 
		if(error_str == ""){	
		var url = "driverMobilePhone/addDriverMobilePhone.do";
		var param = {driver_name:driver_name,phone_number:phone_number,company_id:companyId};
		var fn = function(result){
			if(result.data==true){
				licence_platevo =  $("#licence_plate").nextAll(".combo-input").val(); 	
				drivervo =	$("#driver").nextAll(".combo-input").val();	
				phone_numbervo = $("#phone_number").val();
				getForSelect();
				var option ={title:"提示",btn:parseInt("0001",2)};
		     	window.wxc.xcConfirm("保存该司机和手机号成功", window.wxc.xcConfirm.typeEnum.custom,option);
			}else{
				$(obj).prop("checked",false);
				var option ={title:"提示",btn:parseInt("0001",2)};
		     	window.wxc.xcConfirm("司机名或手机号已被登记！无法再次登记", window.wxc.xcConfirm.typeEnum.custom,option);
			}
		};	
		asyncAjaxMethod(url,param,true,fn);
		}else{
			$(obj).prop("checked",false);
			var option ={title:"提示",btn:parseInt("0001",2)};
	     	window.wxc.xcConfirm(error_str, window.wxc.xcConfirm.typeEnum.custom,option);
		}
	}
}
/**
 * 
* selectForPhone
* @return void
* @author chenlong
* 2016-12-19
 */
function selectForPhone(){
	$("#driver").find("option").each(function(){
		if($(this).is(":checked")){
			if($(this).val()=="请选择司机"){	
			  $("#phone_number").val("");
			}else{
			  $("#phone_number").val($(this).val());
			}
		}
	});
}
/**
 * 生成运单号
* getShippingId
* @return void
* @author chenlong
* 2016-12-12
 */
function getShippingId(){
	var url = "shippingRegistration/getShippingIdForSend.do";
	var param = {};
	var fn = function(result){
			$("#shipping_number").html(replaceNullAsStr(result.data));
		};
	 asyncAjaxMethod(url,param,true,fn);
}
/**
 * 失去焦点验证
* classNameReg
* @param NameReg
* @return void
* @author chenlong
* 2016-12-9
 */
function classNameReg(NameReg){
	var error_str="";
	$("."+NameReg).on("blur",function(){
		var id=$(this).attr("id");
		if(typeof(xcconfirm)!="undefined"){
			xcconfirm.xcClose();
		}
		if(error_str!=""){
			xcconfirm.xcClose();
			error_str ="";
		}else{
		if(id=="start_date"){			
	    }else{
		    error_str = informationvo(this,"");
	    }
		if(error_str!="")
		{
			if(typeof(xcconfirm)!="undefined"){
				xcconfirm.xcClose();
			}
			xcconfirm=new window.wxc.xcConfirm(error_str,window.wxc.xcConfirm.typeEnum.infoNobtn);
		}
		else
		{
			if(id!="start_date"){
			}
		}
		}
	});
};

/**
 * 控制验证的判断
 * @param inp
 * @param params
 * @returns {String}
 */
function informationvo(inp,params){
	editflag = false;
	var id="";
	var taskId = "";
	var deliveryOrderNum = "";
	var productName = "";
	var error_str ="";
	var value ="";
	if(inp!=""){//失去焦点时的检测
    id=$(inp).attr("id"); 
    value=$.trim($(inp).val()); 
    if(id == "productNum"){
      var huss = $(inp).parents(".list").parent().attr("id");
      taskId = $.trim($(inp).next().val());
      var objinp = $(inp).parent().parent().parent().parent();
      productName = $(inp).parent().prev().prev().find(".productName").html();
      deliveryOrderNum = objinp.prev().find(".deliveryOrderNum").html();     	
    }
	error_str = information(id,value,taskId,deliveryOrderNum,productName,huss);	
	}else if(params!=""){//提交时检测，把数组中的key值和value取出来,方便做验证
		var i=0;
		for(var key in params){
			if(params.hasOwnProperty(key)){
				id=key;
				i++;
				value =params[key];
				error_str =information(id,value);				
				if(error_str != ""){					
					break;						
				}	
			}
		}			
	}
   return error_str;
}
/**
 * 验证字段值
 * @param id
 * @param value
 * @returns {String}
 */
function information(id,value,taskId,deliveryOrderNum,productName,huss){
	var number_reg=/^(0|[1-9][0-9]*)$/;//数字
	var phone_reg =/^1[3|4|5|8][0-9]\d{4,8}$/;//手机号
    var icence_reg=/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;//车牌号
	var mathx_reg =/^\d{6}$/;//匹配6个数字
	var error_str ="";
	if(id=="productNum"){
		if(value==""||parseInt(value)==0)
		{
			error_str="发货数量不能为空或0";
		}else if(!number_reg.test(value)){
			error_str="发货数量必须填写数字";
		}else if(value.length>16){
			error_str="车牌号长度不能超过16";
		}else{			
			regTaskproduct(value,taskId,deliveryOrderNum,productName,huss);//验证是否大于生产量				
		}
	}
	if(id=="driver")
		{
				if(value=="")
			{					
				error_str="司机名不能为空";	
			}
			else if(value.length>10){
				error_str="司机名长度不能超过10";
			}else if(value=="请选择司机"){
				error_str="请选择司机";
			} 		
		}
	 if(id=="start_date")
		{
				if(value=="")
			{		
				error_str="发货日期不能为空";
			}		
		}
	 if(id=="licence_plate")
		{
				if(value=="")
			{
				error_str="车牌号不能为空";
			}else if(!icence_reg.test(value)){
				error_str="车牌号格式不正确";
			}else if(value.length>10){
				error_str="车牌号长度不能超过10";
			}else if(value=="请选择车牌"){
				error_str="请选择车牌";
			}
		}	
    if(id=="phone_number")
		 {
    	  if(value=="")
    	  {
    		 error_str="手机号不能为空";
    	   }else if(value.length == 6){
    		 if(!mathx_reg.test(value)){
    			error_str="手机号格式不正确";
    		}
           }else{
        	if(!phone_reg.test(value)){
    			error_str="手机号格式不正确";
    	    }else if(value.length>20){
    			error_str="手机号号长度不能超过20";
    		} ;
          } 		 
	     }   
    if(id=="remark")
		{		
		 if(value.length>200){
			error_str="备注长度不能超过200";
		}	
	}	 
	  return error_str;
}

/**
 * 验证发货量是否小于产量
 * @author chenglong
 */
function regTaskproduct(value,taskId,deliveryOrderNum,productName,huss){
	var url="taskDeliverGood/updateDeliverGoodsForQuantity.do";
	var deliver_type = 0;
	if(huss=="sendOutInfoInit"){
		deliver_type = 0;
	}else{
		deliver_type = 1;
	}
	var params ={send_count:value,t_id:taskId,deliver_number:deliveryOrderNum,deliver_type:deliver_type};	
	var fn=function(result){
	  if(result.message=="发货数量大于生产数量"){	
		 $("#addflag").val("false");
		 if(typeof(xcconfirm)!="undefined"){
				xcconfirm.xcClose();
			}
		 xcconfirm=new window.wxc.xcConfirm("任务单:<"+productName+"></br>"+result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);			
	  }else{
		  $("#addflag").val("true");
	  }  
	};		
	asyncAjaxMethod(url,params,false,fn);

}
/*
 * 加载公用部分界面，如同步，底部，左侧菜单等
 * create_by yangliping 2016-6-30 17:32:19
 */
function loadCommonPage(){
	var result = isLoginForPlateForm();
	var isVip=getCookie("isVip");
	if(isVip == "true"){
		$("#top").load(getwebroot()+"vip/platform/vipTop.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#mainNav").children().eq(0).addClass("curr");
				getCompanyList(companyId);
			}
		});
		$("#bottom").load(getwebroot()+"vip/platform/vipBottom.html #bottomPage");
		$(".midd_left_wrap").load(getwebroot()+"vip/usercenter/saleManage/vipSaleLeftMenu.html",function(){
			$("#evaluation").children().eq(7).children().eq(1).find("a").prepend(">>");
			$("#evaluation").children().eq(7).children().eq(1).addClass("currVip");
		});
	}else{
		$("#top").load(getwebroot()+"platform/topHasSearch.html",null,function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				$("#mainNav").children().eq(1).addClass("curr");
				getCompanyList(companyId);
			}
		});
		$("#bottom").load(getwebroot()+"platform/bottom.html #bottomPage");
		$(".midd_left_wrap").load(getwebroot()+"usercenter/saleManage/saleLeftMenu.html",function(){
			$("#evaluation").children().eq(7).children().eq(1).addClass("curr");
		});
	}
}
/**鼠标经过样式变化
 * mouseHover void
 * @author wangjialin
 * 2016-11-24 下午1:45:31
 */
function mouseHover(){
	$(".deliveryRegisterInfo .memoWrap ul li ").mouseover(function(){
		$(this).find(".del_bg , .del").show();
	});
	$(".deliveryRegisterInfo .memoWrap ul li ").mouseleave(function(){
		$(this).find(".del_bg , .del").hide();
	});
	$(".deliveryRegisterList .operate img").mouseover(function(){
		$(this).prop("src","/newresources/images/sendOut/binBlue.png");
		$(this).css("cursor","pointer");
	});
	$(".deliveryRegisterList .operate img").mouseleave(function(){
		$(this).prop("src","/newresources/images/sendOut/binGrey.png");
		$(this).css("cursor","default");
	});
}
/**
 * 弹出层效果
 * pop_div_show
 * @param id void
 * @author yangliping
 * 2016-7-4 10:38:15
 */
function pop_div_show(id)
{
	$("#pop_mask").fadeIn("fast");
	$("#"+id).fadeIn("fast");
}

/**
 * 关闭弹出层
 * pop_div_close
 * @param id 
 * @return void
 * @author yangliping
 * 2016-7-4 10:38:15
 */
function pop_div_close(id){	
	$("#pop_mask").fadeOut("fast");
	$("#"+id).fadeOut("fast");
	if(id=='carInfo'||id=='driverInfo'){
	  getForSelect();//加载下拉选项框
	}
}
/**展示添加添加发货清单的弹框
 * addProduct void
 * @author chenlong
 * 2016-11-25 下午2:04:02
 * <!-- 自定义插件 --window.ProductRef({
 *  DivBodyTan,onSomeEvent,onSomeCloseEvent})-->
 */
function addProduct(type,objs,deliver_number){	
	window.ProductRef({DivBodyTan:"addProduct",
		            onSomeEvent : pop_div_show,
		            onSomeCloseEvent : pop_div_close,
		            addEvent : ShowTaskProductList,
		            deliver_number:deliver_number,
		            addAddressObj:objs,
		            type:type//0:发货，1：返修
		            });
}

/**
 * 返回的保存数据组装成发货清单
* ShowTaskProductList
* @param result
* @return void
* @author chenlong
* 2016-12-13
 */
function ShowTaskProductList(result,addAddressObj,type){
	if(replaceNullAsStr(addAddressObj)==''){
		var evalText=doT.template($("#taskProductListImpl").text());
		if(parseInt(type)==1){
			 $("#sendOutInfoOld").append(evalText(result));
		}else{
		     $("#sendOutInfoInit").append(evalText(result));		
		}
		classNameReg("productNum");//绑定事件
	}else{
		var obj = $(addAddressObj).parent().next();
		var evalText=doT.template($("#taskProductOut").text());
		obj.append(evalText(result.list));
		var num = parseInt(obj.next().find("span").html())+parseInt(result.listlength);
		obj.next().find("span").html(num);
	}
}
/**单个删除清单
 * deleteProduct void
 * @author wangjialin
 * 2016-11-25 下午2:04:42
 */
function deleteProduct(e,t_id){
	window.wxc.xcConfirm("您确认要删除该发货单下的该条记录?", window.wxc.xcConfirm.typeEnum.confirm,
			{	
			onOk:function(){						
				var url = "taskDeliverGood/deleteTaskDeliverGoods.do";
				var deliveryOrderNum = $(e).parents(".list").find(".deliveryOrderNum").html();
				var params={deliver_number:deliveryOrderNum};
				var arr=[];	
			    arr.push(t_id);			
				params.arr = arr.join(",");
				var fn = function (result){
					var before_num = $(e).parents(".deliveryRegisterList").next().find("span").html();	
					$(e).parents(".deliveryRegisterList").next().find("span").html(parseInt(before_num)-1>0?parseInt(before_num)-1:0);
					if((parseInt(before_num)-1)==0){
						deletelistfn(1,e);
					}else{
					    $(e).parents("tr").remove();
					}
				};
				asyncAjaxMethod(url,params,true,fn);
			},
			onCancel:function(){				
				}
			});		
}
/**批量删除清单
 * deleteList
 * @param flag
 * @param e void
 * @author wangjialin
 * 2016-11-25 下午2:25:31
 */
function deleteList(flag,e){
	window.wxc.xcConfirm("您确认要删除该发货单的所有记录?", window.wxc.xcConfirm.typeEnum.confirm,
			{	
			onOk:function(){
					var url = "taskDeliverGood/deleteTaskDeliverGoods.do";
					var deliveryOrderNum = $(e).parents(".list").find(".deliveryOrderNum").html();
					var params={deliver_number:deliveryOrderNum};
					var arr=[];
					$(e).parents(".list").find(".deliveryRegisterList tr:gt(0)").each(function(){
						arr.push($(this).find("td:eq(2) input:eq(1)").val());		
					});
					params.arr=arr.join(",");
					var fn = function (result){
						deletelistfn(flag,e);		
					};
					asyncAjaxMethod(url,params,true,fn);
			},
			onCancel:function(){				
				}
			});
}
/**
 * 删除清单的回调函数
* deletelistfn
* @param result
* @param flag
* @param e
* @return void
* @author chenlong
* 2016-12-19
 */
function deletelistfn(flag,e){
	var num;
	if(flag==1){
		num=$(".sendOutInfo").find(".list").length;
	}else{
		num=$(".repairListInfo").find(".list").length;
	}
	if(num==1){
		var obj=$(e).parents(".list").next();
		obj.removeClass("mt10");
		$(e).parents(".list").next().addClass("mt24");
	}
	$(e).parents(".list").remove();	
}

/**
 * 生成一条运单
* addShippingRegistration
* @return void
* @author chenlong
* 2016-12-7
 */
function addShippingRegistration(){
	window.wxc.xcConfirm("您确认要保存该运单信息吗？", window.wxc.xcConfirm.typeEnum.confirm,
			{	
			onOk:function(){			
				var url = "shippingRegistration/addShippingRegistration.do";
				var shipping_number = $.trim($("#shipping_number").html());
				var start_date = $.trim($("#start_date").val());
				var licence_plate =   $.trim($("#licence_plate").nextAll(".combo-input").val()); 	
				var driver = $.trim($("#driver").nextAll(".combo-input").val());	
				var phone_number =  $.trim($("#phone_number").val());
				var remark =  $.trim($(".memoCon").val());
				
				var params={shipping_number:shipping_number,start_date:start_date,
						licence_plate:licence_plate,driver:driver,phone_number:phone_number,remark:remark,shipping_company_id:companyId};	
				var arrpro = [];
				var listpic = $("#upShiisticsimg_list");
				var listpro = $("#sendOutInfoInit").find(".list");
				var listproOld = $("#sendOutInfoOld").find(".list");
				var arrpic = [];
				for(var i=0; i<listpic.children().length;i++){//循环取值value  
			   	     arrpic.push(listpic.find("li").eq(i).find("input").val());// = listobj.find("li").eq(i).find("input").val();//去获取每个图片的id    	
				}
				params.arrpic = arrpic.join(",");
				var param = {};//用于验证发货的量
				var error_str = "";
				for(var i=0; i<listpro.length;i++){//循环取值value     	
				   	 arrpro.push(listpro.find(".deliveryOrderNum").eq(i).html());// = listobj.find("li").eq(i).find("input").val();//去获取每个图片的id    	
				     listpro.find(".productNum").each(function(index,elment){
				    	 param.productNum = elment;
				    	 error_str = informationvo(elment,"");
				    	 var regs = $("#addflag").val();
				    	 if(error_str != "" || regs=="false"){
				    			return false;
				    		}
				     });
				}			
				if(error_str == ""){	
					for(var i=0; i<listproOld.length;i++){//循环取值value     	
					   	 arrpro.push(listproOld.find(".deliveryOrderNum").eq(i).html());// = listobj.find("li").eq(i).find("input").val();//去获取每个图片的id    	
					   	listproOld.find(".productNum").each(function(index,elment){
					    	 param.productNum = elment;
					    	 error_str = informationvo(elment,"");
					    	 var regs = $("#addflag").val();
					    	 if(error_str != "" || regs=="false"){
					    			return false;
					    		}
					     });
					   }				
					if(error_str == ""){
						params.arrpro = arrpro.join(",");
						error_str = informationvo("",params);
						if(error_str != ""){
							var option ={title:"提示",btn:parseInt("0001",2)};
							window.wxc.xcConfirm(error_str,window.wxc.xcConfirm.typeEnum.custom,option);
						}else{
							if(arrpro.length==0){
								var option ={title:"提示",btn:parseInt("0001",2)};
								window.wxc.xcConfirm("发货清单不能为空！！",window.wxc.xcConfirm.typeEnum.custom,option);
							}else{
								var regs = $("#addflag").val();
								if(regs=="true"){
									 var fn = function(result){	
										 window.location.href=getwebroot()+"taskDeliverGood/deliveryManage.htm";
									    };								  
									asyncAjaxMethod(url,params,false,fn);	
								}else{
									 $("#addflag").val("true");
								}
							}
						}
				 }else{
					var option ={title:"提示",btn:parseInt("0001",2)};
					window.wxc.xcConfirm(error_str,window.wxc.xcConfirm.typeEnum.custom,option);
				}
				}else{
					var option ={title:"提示",btn:parseInt("0001",2)};
					window.wxc.xcConfirm(error_str,window.wxc.xcConfirm.typeEnum.custom,option);		
				}
			},
			onCancel:function(){		
			}
			});	
}
/**
 * 在物流中添加图片
 * @date 2016-6-22
 * @auto chenlong 
 */
function addShippingImg(obj){
	var fileElementId = "uploadeShippingimg";//上传的文件信息	     
	var url = 'taskLogistics/addShippingImgFileForProducer.do'; //用于文件上传的服务器端请求地址
	var param = {"file_type":49,"companyId":companyId}; //任务id参数		  
	var fn = function(data){	
	 	if (data.success==true && data.message=='上传成功') { 		    					    						    				    					
			var evalText=doT.template($("#addShippingImpl").text());					
			$("#upShiisticsimg_list").append(evalText(data));
			mouseHover();
	     }else{
	     	var option ={title:"提示",btn:parseInt("0001",2)};
	     	window.wxc.xcConfirm(data.message, window.wxc.xcConfirm.typeEnum.custom,option);
	     }			        	
	 };
	addInputUtilFile(url,param,fileElementId,fn);		
}
/**
 * 删除指定的运单图片
 * @param obj
 * @param tf_id
 */
function delShippingimg(obj,tf_id)
{
	window.wxc.xcConfirm("您确认要删除该图片吗？", window.wxc.xcConfirm.typeEnum.confirm,
		{	
		onOk:function(){
			var url = 'taskFile/deleteShippingFileForProducer.do';
			var params={"tf_id":tf_id};
			var fn=function(result){									
						$(obj).parent().remove();							 						 						
						};
				 asyncAjaxMethod(url,params,true,fn);
					},
			onCancel:function(){				
				}
			});		
}


/**显示司机、手机号维护弹框
 * maintainDriverInfo void
 * @author wangjialin
 * 2016-11-30 下午2:54:13
 */
function maintainDriverInfo(){
	drivervo = $.trim($("#driver").nextAll(".combo-input").val());	
	phone_numbervo =  $.trim($("#phone_number").val());
	var url = "driverMobilePhone/getDriverMobilePhoneList.do";
	var param = {company_id:companyId};
	var fn = function(result){
		$("#maintainDriverlist").find("tr:gt(0)").remove();
		var evalText=doT.template($("#maintainDriverlmpl").text());
		$("#maintainDriverlist").find("tr:eq(0)").after(evalText(result.data));
		pop_div_show("driverInfo");
	};
	asyncAjaxMethod(url,param,true,fn);
	
}
/**
 * 查询车牌号
* maintainCarInfo
* @return void
* @author chenlong
* 2016-12-5
 */
function maintainCarInfo(){
	licence_platevo =   $.trim($("#licence_plate").nextAll(".combo-input").val()); 	
	var url = "licensePlate/getLicensePlateList.do";
	var param = {company_id:companyId};
	var fn = function(result){
		$("#licensePlateList").find("tr:gt(0)").remove();
		var evalText=doT.template($("#allLicensePlateListlmpl").text());
		$("#licensePlateList").find("tr:eq(0)").after(evalText(result.data));
		pop_div_show("carInfo");
	};
	asyncAjaxMethod(url,param,true,fn);
}
/**添加司机或车牌
 * add
 * @param e void
 * @author wangjialin
 * 2016-11-30 下午1:44:21
 */
function add(e){
	$(e).parent().hide();
	$(e).parent().next().show();
}
/**
 * 
* LicenseSaveAdd
* @param e
* @return void
* @author chenlong
* 2016-12-7
 */
function LicenseSaveAdd(e){
	var licenseName = $("#licenseName").val();//driverName
    var icence_reg=/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;//车牌号
	var error_str ="";
	if(licenseName=="")
	{
		error_str="车牌号不能为空";
	}else if(!icence_reg.test(licenseName)){
		error_str="车牌号格式不正确";
	}else if(licenseName.length>10){
		error_str="车牌号长度不能超过10";
	}
	
	if(error_str == ""){
	var url = "licensePlate/addLicensePlate.do";
	var param = {license_name:licenseName,company_id:companyId};	
	var fn = function(result){	
		if(result.data==true){
			maintainCarInfo();
			saveAdd(e);
		}else{
			var option ={title:"提示",btn:parseInt("0001",2)};
	     	window.wxc.xcConfirm("车牌号已被登记！无法再次登记", window.wxc.xcConfirm.typeEnum.custom,option);
		}		
	};
	asyncAjaxMethod(url,param,true,fn);	
	}else{
		var option ={title:"提示",btn:parseInt("0001",2)};
     	window.wxc.xcConfirm(error_str, window.wxc.xcConfirm.typeEnum.custom,option);
	}
}
/**
 * 
* LicenseSaveAdd
* @param e
* @return void
* @author chenlong
* 2016-12-7
 */
function DriverSaveAdd(e){
	var phone_reg =/^1[3|4|5|8][0-9]\d{4,8}$/;//手机号   
	var mathx_reg =/^\d{6}$/;//匹配6个数字
	var driverName = $("#driverName").val();//driverName
	var mobilePhone = $(".mobilePhone").val();//mobilePhone
	var error_str = "";
	if(mobilePhone=="")
	{
		error_str="手机号不能为空";
	}else if(mobilePhone.length == 6){
		if(!mathx_reg.test(mobilePhone)){
			error_str="手机号格式不正确";
		}
    }else{
    	if(!phone_reg.test(mobilePhone)){
			error_str="手机号格式不正确";
		}else if(mobilePhone.length>20){
			error_str="手机号号长度不能超过20";
		} ;
    } 
	if(driverName=="")
	{
		error_str="司机名不能为空";
	}else if(driverName.length>10){
		error_str="司机名长度不能超过10";
	} 
	if(error_str == ""){	
	var url = "driverMobilePhone/addDriverMobilePhone.do";
	var param = {driver_name:driverName,phone_number:mobilePhone,company_id:companyId};
	var fn = function(result){
		if(result.data==true){
			maintainDriverInfo();
			saveAdd(e);
		}else{
			var option ={title:"提示",btn:parseInt("0001",2)};
	     	window.wxc.xcConfirm("司机名或手机号已被登记！无法再次登记", window.wxc.xcConfirm.typeEnum.custom,option);
		}		
	};
	asyncAjaxMethod(url,param,true,fn);	
	}else{
		var option ={title:"提示",btn:parseInt("0001",2)};
     	window.wxc.xcConfirm(error_str, window.wxc.xcConfirm.typeEnum.custom,option);
	}
}
/**保存新增的信息
 * saveDriver
 * @param e void
 * @author wangjialin
 * 2016-11-30 下午1:44:10
 */
function saveAdd(e){
	/**
	 * insert信息
	 */
	/**
	 * 隐藏编辑的div，显示添加司机按钮
	 */
	$(e).parent().hide();
	$(e).parent().prev().show();
}
/**取消信息的新增
 * cancel
 * @param e void
 * @author wangjialin
 * 2016-11-30 下午1:45:27
 */
function cancel(e){
	$(e).parent().hide();
	$(e).parent().find("input").val("");
	$(e).parent().prev().show();
}
/**编辑信息
 * edit void
 * @author wangjialin
 * 2016-11-30 下午2:04:34
 */
function edit(e){
	$(e).parents("tr").find("input").show();
	$(e).parents("tr").find("span").hide();
	$(e).hide();
	$(e).next().show();
}
/**保存车牌号信息的修改
 * save
 * @param e void
 * @author wangjialin
 * 2016-11-30 下午3:07:46
 */
function saveLicense(e,license_id){
	var icence_reg=/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;//车牌号
	var $nlicence = $(e).parents("tr").find("td");
	var vlicence = $nlicence.find("input").val();
	var error_str ="";
	if(vlicence=="")
	{
				error_str="车牌号不能为空";
	}else if(!icence_reg.test(vlicence)){
				error_str="车牌号格式不正确";			
	}else if(vlicence.length>10){
				error_str="车牌号长度不能超过10";
	}
	
	if(error_str == ""){
	var url = "licensePlate/updateLicensePlate.do";
	var param = {license_name:vlicence,license_id:license_id};
	var fn = function(result){	
		if(result.data==true){
			$nlicence.find("span").text(vlicence);		
			$(e).parents("tr").find("input").hide();
			$(e).parents("tr").find("span").show();
			$(e).hide();
			$(e).prev().show();	
		}else{
			var option ={title:"提示",btn:parseInt("0001",2)};
	     	window.wxc.xcConfirm("车牌号已被登记！无法再次登记", window.wxc.xcConfirm.typeEnum.custom,option);
		}
	};	
	asyncAjaxMethod(url,param,true,fn);
	}else{
		var option ={title:"提示",btn:parseInt("0001",2)};
     	window.wxc.xcConfirm(error_str, window.wxc.xcConfirm.typeEnum.custom,option);
	}
}
/**
 * 保存司机手机号信息的修改
* saveDriver
* @param e
* @param driver_id
* @return void
* @author chenlong
* 2016-12-6
 */
function saveDriver(e,driver_id){
	var phone_reg =/^1[3|4|5|8][0-9]\d{4,8}$/;//手机号   
	var mathx_reg =/^\d{6}$/;//匹配6个数字
	var $nlicence = $(e).parents("tr").find("td");
	var driver_name = $nlicence.eq(0).find("input").val();
	var phone_number = $nlicence.eq(1).find("input").val();					
	var error_str = "";
		if(phone_number=="")
		{
			error_str="手机号不能为空";
		}else if(phone_number.length == 6){
			if(!mathx_reg.test(phone_number)){
				error_str="手机号格式不正确";
			}
        }else{
        	if(!phone_reg.test(phone_number)){
				error_str="手机号格式不正确";
			}else if(phone_number.length>20){
				error_str="手机号号长度不能超过20";
			} ;
        }
		if(driver_name==""){
			error_str="姓名不能为空";
		} else if(driver_name.length>10){
			error_str="姓名长度不能超过10";
		}  
	if(error_str == ""){	
	var url = "driverMobilePhone/updateDriverMobilePhone.do";
	var param = {driver_name:driver_name,phone_number:phone_number,driver_id:driver_id};
	var fn = function(result){
		if(result.data==true){
			$nlicence.eq(0).find("span").text(driver_name);
			$nlicence.eq(1).find("span").text(phone_number);
			$(e).parents("tr").find("input").hide();
			$(e).parents("tr").find("span").show();
			$(e).hide();
			$(e).prev().show();
		}else{
			var option ={title:"提示",btn:parseInt("0001",2)};
	     	window.wxc.xcConfirm("司机名或手机号已被登记！无法再次登记", window.wxc.xcConfirm.typeEnum.custom,option);
		}
	};	
	asyncAjaxMethod(url,param,true,fn);
	}else{
		var option ={title:"提示",btn:parseInt("0001",2)};
     	window.wxc.xcConfirm(error_str, window.wxc.xcConfirm.typeEnum.custom,option);
	}
}
/**
 * 禁用车牌号
* disableLicense
* @param e
* @param license_id
* @return void
* @author chenlong
* 2016-12-7
 */
function disableLicense(e,license_id){
	var url = "licensePlate/updateLicensePlate.do";
	var param = {enable:1,license_id:license_id};
	var fn = function(result){
		disable(e);		
	};
	asyncAjaxMethod(url,param,true,fn);
}
/**禁用
 * disable
 * @param e void
 * @author wangjialin
 * 2016-11-30 下午2:07:33
 */
function disable(e){
	$(e).prev().prev().removeAttr("onclick");
	$(e).prev().prev().css("color","#999");
	$(e).parent().prevAll().css("color","#999");
	$(e).parents("tr").find("input").hide();
	$(e).parents("tr").find("span").show();
	$(e).prev().hide();
	$(e).prev().prev().show();
	$(e).hide();
	$(e).next().show();	
}
/**
 * 禁用司机、手机号
* disable
* @param e
* @param driver_id
* @return void
* @author chenlong
* 2016-12-7
 */
function disableDriver(e,driver_id){
	var url = "driverMobilePhone/updateDriverMobilePhone.do";
	var param = {enable:1,driver_id:driver_id};
	var fn = function(result){
		disable(e);
	};
	asyncAjaxMethod(url,param,true,fn);	
}
/**
 *启用车牌号
* useLicense
* @param e
* @param license_id
* @return void
* @author chenlong
* 2016-12-7
 */
function useLicense(e,license_id){
	var url =  "licensePlate/updateLicensePlate.do";
	var param = {enable:0,license_id:license_id};
	var fn = function(result){
		use(e,license_id);
	};
	asyncAjaxMethod(url,param,true,fn);	
}
/**
 * 禁用司机、手机号
* useDriver
* @param e
* @param driver_id
* @return void
* @author chenlong
* 2016-12-7
 */
function useDriver(e,driver_id){
	var url = "driverMobilePhone/updateDriverMobilePhone.do";
	var param = {enable:0,driver_id:driver_id};
	var fn = function(result){
		use(e,driver_id);
	};
	asyncAjaxMethod(url,param,true,fn);	
}
/**启用
 * use
 * @param e void
 * @author wangjialin
 * 2016-11-30 下午2:23:43
 */
function use(e,id){
	$(e).prev().prev().prev().removeAttr("style");
	$(e).prev().prev().prev().attr("onclick","edit(this,"+id+");");
	$(e).parent().prevAll().removeAttr("style");
	$(e).hide();
	$(e).prev().show();
}