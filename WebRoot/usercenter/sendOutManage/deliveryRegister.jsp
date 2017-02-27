<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>发货登记</title>
		<link href="/newresources/css/common.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/sendOutManage.css" rel="stylesheet" type="text/css" />
		<link href="/vip/resources/css/vipLeftMenu.css" rel="stylesheet" type="text/css" />
		<link href="/newresources/css/xcConfirm.css" rel="stylesheet" type="text/css">
		<link href="/newresources/css/pagination.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="/newresources/css/combo.select.css" type="text/css" />
		<link rel="stylesheet" href="/newresources/css/jquery.mCustomScrollbar.css" type="text/css" />
	</head>
	<body class="bg_grey">
		<!--顶部-->
		<div id="top"></div>
		<!--中间-->
		<div class="midd_wrap clearfix" >
			<div class="midd_left_wrap" style="width:180px;"></div>
			<div class="midd_right_wrap" style="width:834px">
				<p class="sale_right_title posR mr10">
					<span>发货登记</span>
					<a class="goback posA" href="/taskDeliverGood/deliveryManage.htm">返回</a>
				</p>
				<div class="deliveryRegisterInfo">
					<div class="sendOutTitle mt50 ml10"><img src="/newresources/images/sendOut/Truck.png" class="mr10">物流信息</div>
					<div class="logisticsInfo mt30">
						<span class="name1">运单号：</span><span class="con1 c999" id="shipping_number"></span>
						<div class="mt10">
							<div class="inline_block"><span class="name1">发货日期：</span><input  type="text" class="Wdate con2"  style="height:30px;" id="start_date" onclick="WdatePicker({readOnly:true})"/></div>
							<div class="inline_block" >
								<span class="name2 f_l" style="margin-left:79px;">车牌号：</span>
								<select  class="selectDriver" id="licence_plate">						         
						           
								</select>
								<span style="height:30px;line-height:30px;display:inline-block;"><a class="maintain ml10" onclick="maintainCarInfo()">维护</a></span>
							</div>
						</div>
						<div class="mt10 clearfix">
							<div class="inline_block clearfix">
								<span class="name1 f_l">司机：</span>
								<select  class="selectDriver" id="driver" onchange="selectForPhone()">
						        
								</select>
								<span style="height:30px;line-height:30px;display:inline-block;"><a class="maintain ml10" onclick="maintainDriverInfo()" >维护</a></span>
							</div>
							<div class="inline_block"><span class="name2 ml45">手机号：</span><input class="con2" id="phone_number" type="text" /><span class="isSave"><input type="checkbox" id="save_phones" onchange="save_phones(this)" class="ml10 ">&nbsp;保存</span></div>
						</div>
						<div class="mt10 clearfix">
							<span class="name1 f_l" style="vertical-align:top;">备注：</span>
							<div class="memoWrap ">
								<textarea class="memoCon" id = "remark"></textarea>
								<div class="addImgWrap clearfix">
									<div class="posR f_l" style="overflow:hidden;"><button class="addImg">添加图片</button><input type="file" name="file" id="uploadeShippingimg" style="height:28px;" onchange="addShippingImg(this)">	</div>	
									<ul class="clearfix" id="upShiisticsimg_list">
													
									</ul>
								</div>
							</div>
						</div>
					
					</div>
					<div class="sendOutTitle mt50 ml10 mb10"><img src="/newresources/images/sendOut/List1.png" class="mr10">发货清单</div>
					<div class="sendOutInfo" id="sendOutInfoInit">
						
					</div>
					<div class="t_algin_c mt24"><button class="addList" onclick="addProduct(0)">添加发货清单</button></div>
					<div class="repairListInfo">
						<div class="sendOutTitle mt50 ml10 mb10"><img src="/newresources/images/sendOut/List2.png" class="mr10">返修品清单</div>
						<div class="sendOutInfo" id="sendOutInfoOld">
						
					    </div>
						<div class="t_algin_c mt24"><button class="addList" onclick="addProduct(1)">添加返修清单</button></div>
						
					</div>
					<div class="t_algin_r mr20 mt50"> <input style="display:none" id="addflag" value="true" ><button class="submit" onClick="addShippingRegistration()">提交</button></div>
				</div>
			</div>
			<!--弹框开始  -->
			<div class="mask" id="pop_mask"></div>
			<!--添加货品开始 -->
			<div id="addProduct" class="pop_layer_wrap" style="width:800px;min-height:750px;left:40%;top:8%;">
				
			</div>
			<!--添加货品结束 -->
			<!--司机、手机号维护开始 -->
			<div id="driverInfo" class="pop_layer_wrap" style="width:400px;max-height:280px;">
				<div class="title_wrap" style="height:40px; line-height:40px;">
					司机、手机号维护
					<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('driverInfo')" title="关闭窗口" style="top:5px;">X</a>
				</div>
				<div class="driverInfo">
					<div class="tableHead"><span class="name1">司机姓名</span><span class="name2">手机</span></div>
					<div id="driverInfoListWrap" style="max-height:155px;overflow:auto;">
						<table class="driverInfoList" id="maintainDriverlist">
							<tr>
								<th style="width:70px;"></th>
								<th style="width:100px;"></th>
								<th style="width:70px"></th>
							</tr>
						</table>
					</div>
					<div class="t_algin_r mt10 "><button class="addDriver" onclick="add(this)">添加司机</button></div>
					<div class="editWrap pl10 hide mt10"><input type="text" placeholder="司机姓名" id="driverName" class="driverName"/><input type="text" placeholder="手机" class="mobilePhone ml10" /><button class="save ml10" onclick="DriverSaveAdd(this)">保存</button><button class="cancel ml10" onclick="cancel(this)">取消</button></div>
				</div>
			</div>
			<!--司机、手机号维护结束 -->
			<!--车牌号维护开始  -->
			<div id="carInfo" class="pop_layer_wrap" style="width:400px;max-height:280px;">
				<div class="title_wrap" style="height:40px; line-height:40px;">
					车牌号维护
					<a class="close_btn" href="javascript:void(0)" onClick="pop_div_close('carInfo')" title="关闭窗口" style="top:5px;">X</a>
				</div>
				<div class="driverInfo">
					<div class="tableHead"><span>车牌号</span></div>
					<div id="carInfoListWrap" style="max-height:155px;overflow:hidden;">
						<table class="driverInfoList" id="licensePlateList">
							<tr>
								<th style="width:175px;"></th>
								<th style="width:105px;"></th>
							</tr>
							
						</table>
					</div>
					<div class="t_algin_r mt10 "><button class="addDriver" onclick="add(this)">添加车牌</button></div>
					<div class="editWrap pl10 hide mt10"><input type="text" placeholder="车牌号" id="licenseName" class="driverName"/><button class="save" style="margin-left:140px;" onclick="LicenseSaveAdd(this)">保存</button><button class="cancel ml10" onclick="cancel(this)">取消</button></div>
				</div>
			</div>
			<!--车牌号维护结束  -->
		</div>
		<!--底端-->
		<div id="bottom"></div>
	<!-- 	<script type="text/javascript" src="/newresources/js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.placeholder.min.js"></script> -->
		<%@ include file="/newresources/js/base.jsp" %>
		<script type="text/javascript" src="/newresources/js/jquery.combo.select.js"></script>	
	<!-- 	<script type="text/javascript" src="/newresources/js/base.js"></script>
		<script type="text/javascript" src="/newresources/js/xcConfirm.js"></script> -->
		<script type="text/javascript" src="/newresources/js/jquery.pagination.js"></script>
		<script type="text/javascript" src="/usercenter/sendOutManage/js/deliveryRegister.js"></script>
		<script type="text/javascript" src="/newresources/js/jquery.browser.js"></script>
		<script type="text/javascript" src="/newresources/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="/newresources/js/json2.js"></script>
		<script type="text/javascript" src="/newresources/js/ajaxfileUpload.js"></script>			
		<script type="text/javascript" src="/newresources/js/jquery.mCustomScrollbar.concat.min.js"></script>
		<script type="text/javascript" src="/usercenter/sendOutManage/js/taskScriptList.js"></script>
		<script id="allLicensePlateListlmpl"  type="text/x-dot-template">
        {{for(var prop in it){}}
          {{? it[prop].enable == 0}}
                <tr>
					<td><span>{{=replaceNullAsStr(it[prop].license_name)}}</span><input type="text" value="{{=replaceNullAsStr(it[prop].license_name)}}"  class="hide"/></td>
					<td><a class="blue" onclick ="edit(this)">编辑</a><a class="blue hide" onclick ="saveLicense(this,{{=replaceNullAsStr(it[prop].license_id)}})">保存</a><a class="blue ml15" onclick="disableLicense(this,{{=replaceNullAsStr(it[prop].license_id)}})">禁用</a><a class="blue ml15 hide" onclick="useLicense(this,{{=replaceNullAsStr(it[prop].license_id)}})">启用</a></td>
				</tr>
          {{?? it[prop].enable == 1}}
                <tr>
                    <td style="color: rgb(153, 153, 153);"><span>{{=replaceNullAsStr(it[prop].license_name)}}</span><input class="hide" value="{{=replaceNullAsStr(it[prop].license_name)}}" style="display: none;" type="text"></td>
                    <td><a class="blue" style="color: rgb(153, 153, 153);">编辑</a><a class="blue hide" onclick="saveLicense(this,{{=replaceNullAsStr(it[prop].license_id)}})" style="display: none;">保存</a><a class="blue ml15" onclick="disableLicense(this,{{=replaceNullAsStr(it[prop].license_id)}})" style="display: none;">禁用</a><a class="blue ml15 hide" onclick="useLicense(this,{{=replaceNullAsStr(it[prop].license_id)}})" style="display: inline;">启用</a></td>
               </tr>
          {{?}}
        {{}}}
	    </script>
	    <script id="maintainDriverlmpl" type="text/x-dot-template">
        {{for(var prop in it){}}
           {{? it[prop].enable == 0}}
	            <tr>
				    <td><span>{{=replaceNullAsStr(it[prop].driver_name)}}</span><input type="text" value="{{=replaceNullAsStr(it[prop].driver_name)}}"  class="hide"/></td>
				    <td><span>{{=replaceNullAsStr(it[prop].phone_number)}}</span><input type="text" value="{{=replaceNullAsStr(it[prop].phone_number)}}"  class="hide"/></td>
				    <td><a class="blue" onclick ="edit(this)">编辑</a><a class="blue hide" onclick ="saveDriver(this,{{=replaceNullAsStr(it[prop].driver_id)}})">保存</a><a class="blue ml15" onclick="disableDriver(this,{{=replaceNullAsStr(it[prop].driver_id)}})">禁用</a><a class="blue ml15 hide" onclick="use(this,{{=replaceNullAsStr(it[prop].driver_id)}})">启用</a></td>
		        </tr>
           {{?? it[prop].enable == 1}}
                <tr>
                    <td style="color: rgb(153, 153, 153);"><span>{{=replaceNullAsStr(it[prop].driver_name)}}</span><input class="hide" value="{{=replaceNullAsStr(it[prop].driver_name)}}" style="display: none;" type="text"></td>
                    <td style="color: rgb(153, 153, 153);"><span>{{=replaceNullAsStr(it[prop].phone_number)}}</span><input class="hide" value="{{=replaceNullAsStr(it[prop].phone_number)}}" style="display: none;" type="text"></td>
                    <td><a class="blue" style="color: rgb(153, 153, 153);">编辑</a><a class="blue hide" onclick="saveDriver(this,{{=replaceNullAsStr(it[prop].driver_id)}})" style="display: none;">保存</a><a class="blue ml15" onclick="disableDriver(this,{{=replaceNullAsStr(it[prop].driver_id)}})" style="display: none;">禁用</a><a class="blue ml15 hide" onclick="useDriver(this,{{=replaceNullAsStr(it[prop].driver_id)}})" style="display: inline;">启用</a></td>
                </tr> 
           {{?}}
        {{}}}
	    </script>
	    <script id="addShippingImpl" type="text/x-dot-template">       
                <li>
                  <input style="display:none" value="{{= it.tf_id}}" />
                  <img src="{{= getwebroot()+'taskFile/downLoadFileFormMongoForProducer.do?file='}}{{= it.file_path}}">
                  <div class="del_bg hide"></div><a class="del hide" onclick="delShippingimg(this,{{=replaceNullAsStr(it.tf_id)}})">删除</a>
               </li>
        </script>
        <script id="addProductImpl" type="text/x-dot-template">      
		<div class="title_wrap" style="height:30px; line-height:30px;" id="{{= it}}">
					添加货品
					<a class="close_btn" href="javascript:void(0)" id="newWindowTask" title="关闭窗口">X</a>
				</div>
				<div class="pop_content_wrap mainInfo">
					<div class="top">
						<span class="name">客户名称：</span><input type="text" id="search_company"  class="inputWrap"/>
						<span class="name ml5">任务单号：</span><input type="text" id="search_rwdh"  class="inputWrap" placeholder="请输入任务单号关键字"/>
						<span class="name2 ml5">产品：</span><input type="text" id="search_product"  class="inputWrap" placeholder="请输入产品名称关键字"/>
						<button class="search ml5" id="seachTaskM">搜索</button><button id="insertIntoList" class="insertIntoList ml8">加入发货单</button>
					</div>
					<table class="tableList" id="tableList">
						<tr>
							<th style="width:260px;text-align:left;"><input type="checkbox"  id="selectAll" ><span class="ml5">全选</span><span class="ml76">产品</span></th>
							<th style="width:auto;">任务单号</th>
							<th style="width:160px">接单时间</th>
						</tr>
					</table>
				</div>
		<div id="paginationcom" class="quotes"></div>		
        </script>
        <script id="addTaskListImpl" type="text/x-dot-template">
        {{for(var prop in it){}}
                <tr>
					<td>
						<input type="checkbox" value="{{= it[prop].t_id}}" >
						{{?it[prop].product_pic!=null}}
							<div class="productImg"><img src="{{= getwebroot()+'taskFile/downLoadFileFormMongoForProducer.do?file='}}{{= it[prop].product_pic}}"></div>
							<div class="productName">{{= it[prop].product_name}}</div>
						{{??}}
							<div class="productImg"><img src="/newresources/images/noPic.png"></div>
							<div class="productName">{{= it[prop].product_name}}</div>
						{{?}}
					</td>
					<td>
                        <input style="display:none" value="{{= replaceNullAsStr(it[prop].send_company)}}" >
						<div class="c999">{{= replaceNullAsStr(it[prop].serial_no)}}</div>
						<div class="c999">{{= replaceNullAsStr(it[prop].rwdh)}} / {{= replaceNullAsStr(it[prop].ddh)}} / {{= replaceNullAsStr(it[prop].scdh)}} </div>
						<div>{{= replaceNullAsStr(it[prop].bzmc)}}</div>
					</td>
					<td class="center">{{= replaceNullAsStr(it[prop].receive_time)}}</td>
				</tr>
         {{}}}
        </script>
        <script id="taskProductListImpl" type="text/x-dot-template">
         <div class="list">
				<img src="/newresources/images/sendOut/waveLine.png" class="mt10">
				<div class="deliveryInfo">
					<div class="ml10 mt15">
						<span class="name3">发货单号：</span><span class="deliveryOrderNum">{{= replaceNullAsStr(it.deliver_number)}}</span>
						<span class="name3">客户名称：</span><span class="customerName">{{= replaceNullAsStr(it.company_name)}}</span>
						<button class="addProduct" onclick="addProduct(0,this,'{{= replaceNullAsStr(it.deliver_number)}}')">添加货品</button>
					</div>
				<table class="deliveryRegisterList mt5"> 
					<tr>
						<th style="width:250px;">产品</th>
						<th style="width:auto;">任务单号</th>
						<th style="width:160px;">发货数量</th>
						<th style="width:60px;"></th>
					</tr>
				{{for(var prop in it.list){}}
                   <tr>
			         <td>
						{{?it.list[prop].product_pic!=null}}
				       	 	<div class="productImg"><img src="{{= getwebroot()+'taskFile/downLoadFileFormMongoForProducer.do?file='}}{{= it.list[prop].product_pic}}"></div>
				        	<div class="productName">{{= it.list[prop].product_name}}</div>
						{{??}}
							<div class="productImg"><img src="/newresources/images/noPic.png"></div>
				        	<div class="productName">{{= it.list[prop].product_name}}</div>
						{{?}}
			         </td>
			         <td>
				        <div class="c999">{{= replaceNullAsStr(it.list[prop].serial_no)}}</div>
				        <div class="c999">{{= replaceNullAsStr(it.list[prop].rwdh)}} /{{= replaceNullAsStr(it.list[prop].ddh)}}/ {{= replaceNullAsStr(it.list[prop].scdh)}}</div>
			         	<div>{{= replaceNullAsStr(it.list[prop].bzmc)}}</div>
					</td>
				     <td class="center"><input class="productNum" id="productNum" type="text" value="{{= replaceNullAsStr(it.list[prop].delivery_quantity)}}"/><input style="display:none" value="{{= replaceNullAsStr(it.list[prop].t_id)}}" ></td>
				     <td class="center grey operate"><img src="/newresources/images/sendOut/binGrey.png" onclick="deleteProduct(this,{{= it.list[prop].t_id}})"></td>
		          </tr>
                 {{}}}
				 </table>
				<div class="recordNum clearfix">共&nbsp;<span id="num">{{=replaceNullAsStr(it.listlength)}}</span>&nbsp;条记录<button class="deleteList f_r" onclick="deleteList(1,this)">删除清单</button></div>
				</div>
		</div>       
        </script>
        <script id="taskProductOut" type="text/x-dot-template">
        {{for(var prop in it){}}
                   <tr>
			         <td>
						{{?it[prop].product_pic!=null}}
				        	<div class="productImg"><img src="{{= getwebroot()+'taskFile/downLoadFileFormMongoForProducer.do?file='}}{{= it[prop].product_pic}}"></div>
				        	<div class="productName">{{= it[prop].product_name}}</div>
						{{??}}
							<div class="productImg"><img src="/newresources/images/noPic.png"></div>
							<div class="productName">{{= it[prop].product_name}}</div>
						{{?}}
			         </td>
			         <td>
				        <div class="c999">{{= replaceNullAsStr(it[prop].serial_no)}}</div>
				        <div class="c999">{{= replaceNullAsStr(it[prop].rwdh)}} /{{= replaceNullAsStr(it[prop].ddh)}}/ {{= replaceNullAsStr(it[prop].scdh)}}</div>
			         	<div>{{= replaceNullAsStr(it[prop].bzmc)}}</div>
					</td>
				     <td class="center"><input class="productNum" id="productNum" type="text" value="{{= replaceNullAsStr(it[prop].delivery_quantity)}}"/><input style="display:none" value="{{= replaceNullAsStr(it[prop].t_id)}}" ></td>
				     <td class="center grey operate"><img src="/newresources/images/sendOut/binGrey.png" onclick="deleteProduct(this,{{= it[prop].t_id}})"></td>
		          </tr>
                 {{}}}
        </script>
        <script id="selectLicenseDown" type="text/x-dot-template">
        <option>请选择车牌号</option>
        {{for(var prop in it){}}
             <option value='{{= replaceNullAsStr(it[prop].license_name)}}'>{{= replaceNullAsStr(it[prop].license_name)}}</option>
        {{}}}
        </script>
        <script id="selectDriverDown" type="text/x-dot-template">
        <option>请选择司机</option>
        {{for(var prop in it){}}
             <option value='{{= replaceNullAsStr(it[prop].phone_number)}}'>{{= replaceNullAsStr(it[prop].driver_name)}}</option>
        {{}}}
        </script>
	</body>
</html>