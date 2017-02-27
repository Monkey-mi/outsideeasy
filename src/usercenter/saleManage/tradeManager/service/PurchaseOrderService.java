package usercenter.saleManage.tradeManager.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.util.CellRangeAddress;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.outsideasy.activemq.model.PurchaseOrderSender;
import com.outsideasy.activemq.service.QSender;

import common.model.BusinessException;
import common.user.model.LoginAccount;


import usercenter.common.communication.service.AppCommunicationService;
import usercenter.externalTask.TaskResponse.RexAccountVo;
import usercenter.externalTask.TaskResponse.StateCounts;
import usercenter.externalTask.service.TaskService;
import usercenter.saleManage.deliveryManage.response.DeliveryRegisterDetailVo;
import usercenter.saleManage.tradeManager.data.PurchaseOrderMapper;
import usercenter.saleManage.tradeManager.model.OrderAgreementFile;
import usercenter.saleManage.tradeManager.model.OrderAttchedFile;
import usercenter.saleManage.tradeManager.model.OrderCancelRecord;
import usercenter.saleManage.tradeManager.model.OrderDeliveryNotice;
import usercenter.saleManage.tradeManager.model.OrderEndRecord;
import usercenter.saleManage.tradeManager.model.ProductList;
import usercenter.saleManage.tradeManager.model.PurchaseOrder;
import usercenter.saleManage.tradeManager.response.OrderStopDetails;
import usercenter.saleManage.tradeManager.response.OrderStopOrCancel;
import usercenter.saleManage.tradeManager.response.PurchaseOrderListVo;
import usercenter.saleManage.tradeManager.response.PurchaseOrderRemark;
import usercenter.saleManage.tradeManager.response.PurchaseOrderVo;
import usercenter.saleManage.tradeManager.response.PurchaseOrdersupId;
import usercenter.saleManage.tradeManager.response.StateCountsVo;
import util.MyDateUtils;
import util.SessionUtil;
import util.WebUtil;
import usercenter.saleManage.tradeManager.response.PurchaseOrderStatus;



@Service
public class PurchaseOrderService {
	private TaskService taskService;
	@Autowired
	private PurchaseOrderMapper mapper;
	@Autowired
	private ProductListService productListService;
	@Autowired
	private PurchaseOrderOperatingService purchaseOrderOperatingService;
	@Autowired
	private OrderEndRecordService orderEndRecordService;
	@Autowired
	private OrderAttchedFileService orderAttchedFileService;
	@Autowired
	private OrderCancelRecordService orderCancelRecordService;
	@Autowired
	private AppCommunicationService appCommunicationService;
	@Autowired
	private OrderDeliveryNoticeService orderDeliveryNoticeService;
	@Autowired
	private OrderAgreementFileService orderAgreementFileService;
	@Autowired
	private QSender qSender;
	/**
	* 批量删除订单 进入回收站
	* @Description:
	* PurchaseOrderService
	* deletePurchaseOrder
	* @param arr void
	* @author chenlong
	* 2016-8-20 下午5:24:27
	 * @throws ParseException 
	 */
	public int deletePurchaseOrderlist(Map<String,Object> params) throws ParseException {
		int count = 0; 
		String  orderId  = params.get("orderId").toString();//获取所有内容的JSON字符串
		JSONObject contentParamsObject = new JSONObject(orderId); //将所有内容的JSON字符串转化为JSON对象
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("sup_delete_flag", 1);
		for(int i=0;i<contentParamsObject.length();i++){
			int id = Integer.parseInt(contentParamsObject.get(i+"").toString());
			map.put("pur_order_id", id);
			int statusvo = getPurchaseOrderStatus(map);
			if(statusvo ==30 ||statusvo==50 ||statusvo==60){			
			PurchaseOrderStatus purchaseOrderStatus = mapper.getOrderFordelete(map);
			int status = purchaseOrderStatus.getStatus();
			if(status==0){//未删除
				mapper.deletePurchaseOrder(map);	
			}else if(status==2){//不再操作	
				count++;
				}
			}else{
				count ++;
			}
		}
		return count;
		}
	/**
	* 外协批量删除订单 进入回收站
	* @Description:
	* PurchaseOrderService
	* deletePurchaseOrder
	* @param arr void
	* @author chenlong
	* 2016-8-20 下午5:24:27
	 * @throws ParseException 
	 */
	public int deletePurchaseOrderlistForOut(Map<String,Object> params){
		int count = 0; 
		int  counts  = Integer.parseInt(params.get("lengthd").toString());//
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("pur_delete_flag", 1);
		for(int i=0;i<counts;i++){
			int id = Integer.parseInt(params.get("orderId["+i+"]").toString());
			map.put("pur_order_id", id);
			int statusvo = getPurchaseOrderStatus(map);
			if(statusvo ==30 ||statusvo==50 ||statusvo==60){			
			PurchaseOrderStatus purchaseOrderStatus = mapper.getOrderFordeleteForOut(map);
			int status = purchaseOrderStatus.getStatus();
			if(status==0){//未删除
				mapper.deletePurchaseOrderForOut(map);	
			}else if(status==2){//不再操作	
				count++;
				}
			}else{
				count ++;
			}
		}
		return count;
		}
	/**
	* 单个删除订单 进入回收站
	* @Description:
	* PurchaseOrderService
	* deletePurchaseOrder
	* @param arr void
	* @author chenlong
	* 2016-8-20 下午5:24:27
	 * @throws ParseException 
	 */
	public int  deletePurchaseOrder(Map<String,Object> params){
		int count = 0;
		params.put("sup_delete_flag", 1);
		int statusvo = getPurchaseOrderStatus(params);
		if(statusvo ==30 ||statusvo==50 ||statusvo==60){			
		PurchaseOrderStatus purchaseOrderStatus = mapper.getOrderFordelete(params);
		int status = purchaseOrderStatus.getStatus();
		if(status==0){//未删除
			mapper.deletePurchaseOrder(params);	
		}else if(status==2){//不再操作	
			count++;
			}
		}else{
			count++;
		}
		return count;
		}
	/**
	* 外协单个删除订单 进入回收站
	* @Description:
	* PurchaseOrderService
	* deletePurchaseOrder
	* @param arr void
	* @author chenlong
	* 2016-8-29 下午5:24:27
	 * @throws ParseException 
	 */
	public int  deletePurchaseOrderForOut(Map<String,Object> params){
		int count = 0;
		params.put("pur_delete_flag", 1);
		int statusvo = getPurchaseOrderStatus(params);
		if(statusvo ==30 ||statusvo==50 ||statusvo==60){			
		PurchaseOrderStatus purchaseOrderStatus = mapper.getOrderFordeleteForOut(params);
		int status = purchaseOrderStatus.getStatus();
		if(status==0){//未删除
			mapper.deletePurchaseOrderForOut(params);
		}else if(status==2){//不再操作	
			count++;
			}
		}else{
			count++;
		}
		return count;
		}
	/**
	* 销售单个删除订单 无法恢复
	* @Description:
	* PurchaseOrderService
	* deletePurchaseOrder
	* @param arr void
	* @author chenlong
	* 2016-8-20 下午5:24:27
	 * @throws ParseException 
	 */
	public int  deletePurchaseOrderVo(Map<String,Object> params){
		int count = 0;
		params.put("sup_delete_flag", 2);
		int statusvo = getPurchaseOrderStatus(params);
		if(statusvo ==30 ||statusvo==50 ||statusvo==60){			
		PurchaseOrderStatus purchaseOrderStatus = mapper.getOrderFordelete(params);
		int status = purchaseOrderStatus.getStatus();
		if(status==1){//未删除
			mapper.deletePurchaseOrder(params);	
		}else if(status==0){//不再操作	
			count++;
			}
		}else{
			count++;
		}
		return count;
		}
	/**
	* 外协单个删除订单 无法恢复
	* @Description:
	* PurchaseOrderService
	* deletePurchaseOrder
	* @param arr void
	* @author chenlong
	* 2016-8-20 下午5:24:27
	 * @throws ParseException 
	 */
	public int  deletePurchaseOrderVoForOut(Map<String,Object> params){
		int count = 0;
		params.put("pur_delete_flag", 2);
		int statusvo = getPurchaseOrderStatus(params);
		if(statusvo ==30 ||statusvo==50 ||statusvo==60){			
		PurchaseOrderStatus purchaseOrderStatus = mapper.getOrderFordeleteForOut(params);
		int status = purchaseOrderStatus.getStatus();
		if(status==1){//未删除
			mapper.deletePurchaseOrderForOut(params);	
		}else if(status==0){//不再操作	
			count++;
			}
		}else{
			count++;
		}
		return count;
		}
	/**
	* 销售单个还原订单 进入
	* @Description:
	* PurchaseOrderService
	* deletePurchaseOrder
	* @param arr void
	* @author chenlong
	* 2016-8-20 下午5:24:27
	 * @throws ParseException 
	 */
	public int  updatePurchaseOrderForProduct(Map<String,Object> params){
		int count = 0;
		params.put("sup_delete_flag", 0);
		int statusvo = getPurchaseOrderStatus(params);
		if(statusvo ==30 ||statusvo==50 ||statusvo==60){			
		PurchaseOrderStatus purchaseOrderStatus = mapper.getOrderFordelete(params);
		int status = purchaseOrderStatus.getStatus();
		if(status==1){//未删除
			mapper.deletePurchaseOrder(params);	
		}else if(status==2){//不再操作	
			count++;
			}
		}else{
			count++;
		}
		return count;
		}
	/**
	* 外协单个还原订单 进入
	* @Description:
	* PurchaseOrderService
	* deletePurchaseOrder
	* @param arr void
	* @author chenlong
	* 2016-8-30 下午5:24:27
	 * @throws ParseException 
	 */
	public int  updatePurchaseOrderForOut(Map<String,Object> params){
		int count = 0;
		params.put("pur_delete_flag", 0);
		int statusvo = getPurchaseOrderStatus(params);
		if(statusvo ==30 ||statusvo==50 ||statusvo==60){			
		PurchaseOrderStatus purchaseOrderStatus = mapper.getOrderFordeleteForOut(params);
		int status = purchaseOrderStatus.getStatus();
		if(status==1){//未删除
			mapper.deletePurchaseOrderForOut(params);	
		}else if(status==2){//不再操作	
			count++;
			}
		}else{
			count++;
		}
		return count;
		}
	/**
	*  外协取消任务单
	* @Description:
	* PurchaseOrderService
	* deletePurchaseOrder
	* @param arr void
	* @author chenlong
	* 2016-8-29 下午5:24:27
	 * @throws ParseException 
	 */
	public int  updatePurchaseOrder(Map<String,Object> params){
		int count = 0;
		int statusvo = getPurchaseOrderStatus(params);
		if(statusvo ==10){			
			params.put("order_status", 60);
			mapper.updateOrderStatus(params);
			orderCancelRecordService.addOrderCancelRecord(params);
		}else{
			count++;
		}
		return count;
	}
	/**
	*  外协批量取消任务单
	* @Description:
	* PurchaseOrderService
	* deletePurchaseOrder
	* @param arr void
	* @author chenlong
	* 2016-8-29 下午5:24:27
	 * @throws ParseException 
	 */
	public int  updatePurchaseOrderList(Map<String,Object> params){
		int count = 0;
		int  counts  = Integer.parseInt(params.get("lengthd").toString());//
		for (int i=0;i<counts;i++){
			int id = Integer.parseInt(params.get("orderId["+i+"]").toString());
			params.put("pur_order_id", id);
			int statusvo = getPurchaseOrderStatus(params);
			if(statusvo ==10){			
				params.put("order_status", 60);
				mapper.updateOrderStatus(params);
				orderCancelRecordService.addOrderCancelRecord(params);
			}else{
				count++;
			}
		}		
		return count;
	}
	
	/**
	 * 销售查询出订单的删除状态
	* @Description:
	* PurchaseOrderService
	* updateOrderRemark
	* @param params void
	* @author chenlong
	* 2016-8-20 下午3:23:16
	 */
	public int  getPurchaseOrderStatusFordelete(Map<String,Object> params) {	
		PurchaseOrderStatus purchaseOrderStatus = mapper.getOrderFordelete(params);
		int status = purchaseOrderStatus.getStatus();	
		return status; 
	}
	/**
	 * 外协查询出订单的删除状态
	* @Description:
	* PurchaseOrderService
	* updateOrderRemark
	* @param params void
	* @author chenlong
	* 2016-8-20 下午3:23:16
	 */
	public int  getPurchaseOrderStatusFordeleteForOut(Map<String,Object> params) {	
		PurchaseOrderStatus purchaseOrderStatus = mapper.getOrderFordeleteForOut(params);
		int status = purchaseOrderStatus.getStatus();	
		return status; 
	}
	/**
	* 批量删除订单 无法恢复
	* @Description:
	* PurchaseOrderService
	* deletePurchaseOrder
	* @param arr void
	* @author chenlong
	* 2016-8-20 下午5:24:27
	 * @throws ParseException 
	 */
	public int deletePurchaseOrderlistVo(Map<String,Object> params) throws ParseException {
		int count = 0; 
		String  orderId  = params.get("orderId").toString();//获取所有内容的JSON字符串
		JSONObject contentParamsObject = new JSONObject(orderId); //将所有内容的JSON字符串转化为JSON对象
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("sup_delete_flag", 2);
		for(int i=0;i<contentParamsObject.length();i++){
			int id = Integer.parseInt(contentParamsObject.get(i+"").toString());
			map.put("pur_order_id", id);
			int statusvo = getPurchaseOrderStatus(map);
			if(statusvo ==30 ||statusvo==50 ||statusvo==60){			
			PurchaseOrderStatus purchaseOrderStatus = mapper.getOrderFordelete(map);
			int status = purchaseOrderStatus.getStatus();
			if(status==1){//删除进入无法恢复
				mapper.deletePurchaseOrder(map);	
			}else if(status==0){//不再操作	
				count ++;
				}
			}else{
				count ++;
			}
		}
		return count;
		}
	/**
	* 批量删除订单 无法恢复
	* @Description:
	* PurchaseOrderService
	* deletePurchaseOrder
	* @param arr void
	* @author chenlong
	* 2016-8-20 下午5:24:27
	 * @throws ParseException 
	 */
	public int deletePurchaseOrderlistVoForOut(Map<String,Object> params) {
		int count = 0; 
		Integer  counts  = Integer.parseInt(params.get("lengthd").toString());//获取所
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("pur_delete_flag", 2);
		for(int i=0;i<counts;i++){
			int id = Integer.parseInt(params.get("orderId["+i+"]").toString());
			map.put("pur_order_id", id);
			int statusvo = getPurchaseOrderStatus(map);
			if(statusvo ==30 ||statusvo==50 ||statusvo==60){			
			PurchaseOrderStatus purchaseOrderStatus = mapper.getOrderFordeleteForOut(map);
			int status = purchaseOrderStatus.getStatus();
			if(status==1){//删除进入无法恢复
				mapper.deletePurchaseOrderForOut(map);	
			}else if(status==0){//不再操作	
				count ++;
				}
			}else{
				count ++;
			}
		}
		return count;
		}
	/**
	* 销售批量还原订单 
	* @Description:
	* PurchaseOrderService
	* deletePurchaseOrder
	* @param arr void
	* @author chenlong
	* 2016-8-20 下午5:24:27
	 * @throws ParseException 
	 */
	public int updatePurchaseOrderlistVo(Map<String,Object> params) throws ParseException {
		int count = 0; 
		String  orderId  = params.get("orderId").toString();//获取所有内容的JSON字符串
		JSONObject contentParamsObject = new JSONObject(orderId); //将所有内容的JSON字符串转化为JSON对象
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("sup_delete_flag", 0);
		for(int i=0;i<contentParamsObject.length();i++){
			int id = Integer.parseInt(contentParamsObject.get(i+"").toString());
			map.put("pur_order_id", id);
			int statusvo = getPurchaseOrderStatus(map);
			if(statusvo ==30 ||statusvo==50 ||statusvo==60){			
			PurchaseOrderStatus purchaseOrderStatus = mapper.getOrderFordelete(map);
			int status = purchaseOrderStatus.getStatus();
			if(status==1){//进行数据的还原
				mapper.deletePurchaseOrder(map);	
			}else if(status==2){//不再操作	
				count ++;
				}
			}else{
				count ++;
			}
		}
		return count;
		}
	/**
	* 外协批量还原订单 
	* @Description:
	* PurchaseOrderService
	* deletePurchaseOrder
	* @param arr void
	* @author chenlong
	* 2016-8-30 下午5:24:27
	 * @throws ParseException 
	 */
	public int updatePurchaseOrderlistVoForOut(Map<String,Object> params)  {
		int count = 0; 
		int counts = Integer.parseInt(params.get("lengthd").toString());
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("pur_delete_flag", 0);
		for(int i=0;i<counts;i++){
			int id = Integer.parseInt(params.get("orderId["+i+"]").toString());
			map.put("pur_order_id", id);
			int statusvo = getPurchaseOrderStatus(map);
			if(statusvo ==30 ||statusvo==50 ||statusvo==60){			
			PurchaseOrderStatus purchaseOrderStatus = mapper.getOrderFordeleteForOut(map);
			int status = purchaseOrderStatus.getStatus();
			if(status==1){//进行数据的还原
				mapper.deletePurchaseOrderForOut(map);	
			}else if(status==2){//不再操作	
				count ++;
				}
			}else{
				count ++;
			}
		}
		return count;
		}
	/**
	* @Description:销售方查询出所有的订单及其它的明细
	* PurchaseOrderService
	* getPurchaseOrderList
	* @param params
	* @return List<PurchaseOrder>
	* @author chenlong
	* 2016-8-17 下午3:20:26
	 */
	public List<PurchaseOrderListVo> getPurchaseOrderList(Map<String,Object> params) {					
		List<PurchaseOrder> list =  mapper.getPurchaseOrderList(params);//查出所有的订单
		//2.查询出所有订单的产品的详细信息
		Map<String,Object> map = new HashMap<String, Object>();	
		map.put("company_id", params.get("company_id"));
		List<PurchaseOrderListVo> listvo = new ArrayList<PurchaseOrderListVo>();		
		for(PurchaseOrder purchaseOrder : list){
			PurchaseOrderListVo purchaseOrderListVo =  new PurchaseOrderListVo();
			map.put("pur_order_id", purchaseOrder.getPur_order_id());
			List<ProductList> listpro =  productListService.getProductList(map);//详细信息
			Integer fileCount = orderAttchedFileService.getOrderAttchedFileForSubForLook(map);//新文件数量
			Integer comimtCount = appCommunicationService.getAppCommunicationCount(map);//查询出新的交流信息条数
			int count = productListService.getProductCount(map);
			purchaseOrderListVo.setCount(count);
			purchaseOrderListVo.setProductList(listpro);
			purchaseOrderListVo.setPurchaseOrder(purchaseOrder);
			purchaseOrderListVo.setFileCount(fileCount);
			purchaseOrderListVo.setComimtCount(comimtCount);
			listvo.add(purchaseOrderListVo);
		}
		return listvo;
	}
	/**
	* @Description:外协方查询出所有的订单及其它的明细
	* PurchaseOrderService
	* getPurchaseOrderList
	* @param params
	* @return List<PurchaseOrder>
	* @author chenlong
	* 2016-8-29 下午3:20:26
	 */
	public List<PurchaseOrderListVo> getPurchaseOrderListForOut(Map<String,Object> params) {	
	    //1.获取session中的账号的值
	    LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
	    if(loginAccount.getAccount_type()==0){//主账号
	    params.put("reg_id", loginAccount.getLogin_id());
	    }else if(loginAccount.getAccount_type()==1){//子账号
	    params.put("sa_id", loginAccount.getLogin_id());
	    }else {
		 throw new BusinessException("账号不存在");
	    }
		List<PurchaseOrder> list =  mapper.getPurchaseOrderListForOut(params);//查出所有的订单
		//2.查询出所有订单的产品的详细信息
		Map<String,Object> map = new HashMap<String, Object>();	
		map.put("company_id", params.get("company_id"));
		List<PurchaseOrderListVo> listvo = new ArrayList<PurchaseOrderListVo>();		
		for(PurchaseOrder purchaseOrder : list){
			PurchaseOrderListVo purchaseOrderListVo =  new PurchaseOrderListVo();
			map.put("pur_order_id", purchaseOrder.getPur_order_id());
			List<ProductList> listpro =  productListService.getProductList(map);//详细信息
			Integer fileCount = orderAttchedFileService.getOrderAttchedFileForSubForLook(map);//新文件数量
			Integer comimtCount = appCommunicationService.getAppCommunicationCount(map);//查询出新的交流信息条数
			int count = productListService.getProductCount(map);
			purchaseOrderListVo.setCount(count);
			purchaseOrderListVo.setProductList(listpro);
			purchaseOrderListVo.setPurchaseOrder(purchaseOrder);
			purchaseOrderListVo.setFileCount(fileCount);
			purchaseOrderListVo.setComimtCount(comimtCount);
			listvo.add(purchaseOrderListVo);
		}
		return listvo;
	}
	/**
	 * 查询出各种状态的订单量
	* @Description:
	* PurchaseOrderService
	* getStatusCount
	* @param params
	* @return StateCountsVo
	* @author chenlong
	* 2016-8-31 上午11:18:06
	 */
	public StateCountsVo getStatusCount(Map<String,Object> params) {	
		StateCountsVo stateCountsVo = new StateCountsVo(0,0,0,0,0,0,0);
		int  flag = Integer.parseInt(params.get("flag").toString());
		if(flag ==1){
		    params.put("sup_delete_flag",0);
		}else if(flag ==2){
			params.put("pur_delete_flag",0);	
		}
		List<StateCounts> stateCountsv  = mapper.getStatusCount(params);
		int state = 0;
		int count = 0;
		int end = 0;//终止订单数
		int cancel =0;//取消订单数
		int all = 0;//所有订单
		for(StateCounts stateCounts: stateCountsv){
			state = stateCounts.getOrder_status();
			count = stateCounts.getStateCount();
			all += count;
			switch(state){
			case 10:
				stateCountsVo.setComimtOrderCount(count);
				break;
			case 20:
				stateCountsVo.setComfrimOrderCount(count);
				break;
			case 30:
				stateCountsVo.setOverOrderCount(count);
				break;
			case 40:
				stateCountsVo.setQueryOrderCount(count);
				break;
			case 50:
				end = count;
				break;
			case 60:
				cancel = count;
				break;
			default :
				break;
			}					
		}	
		stateCountsVo.setExOrderCount(end+cancel);
		stateCountsVo.setAllOrderCount(all);
		if(flag ==1){
		    params.put("sup_delete_flag",1);
		}else if(flag ==2){
			params.put("pur_delete_flag",1);	
		}
		stateCountsVo.setReturnOrderCount(mapper.getStatusCountVo(params));
		return stateCountsVo;
	}
	/**
	 * 查询任务单的备忘信息
	* @Description:
	* PurchaseOrderService
	* getOrderRemark
	* @param params
	* @return PurchaseOrderRemark
	* @author chenlong
	* 2016-8-20 下午3:22:30
	 */
	public PurchaseOrderRemark  getOrderRemark(Map<String,Object> params){
		return mapper.getOrderRemark(params);
	}
	/**
	 * 查询任务单的备忘信息
	* @Description:
	* PurchaseOrderService
	* getOrderRemark
	* @param params
	* @return PurchaseOrderRemark
	* @author chenlong
	* 2016-8-20 下午3:22:30
	 */
	public PurchaseOrderRemark  getOrderRemarkForOut(Map<String,Object> params){
		return mapper.getOrderRemarkForOut(params);
	}
	/**
	 * 更新任务单的备忘
	* @Description:
	* PurchaseOrderService
	* updateOrderRemark
	* @param params void
	* @author chenlong
	* 2016-8-20 下午3:23:16
	 */
	public void  updateOrderRemark(Map<String,Object> params){
		mapper.updateOrderRemark(params);
	}
	/**
	 * 外协更新任务单的备忘
	* @Description:
	* PurchaseOrderService
	* updateOrderRemark
	* @param params void
	* @author chenlong
	* 2016-8-20 下午3:23:16
	 */
	public void  updateOrderRemarkForOut(Map<String,Object> params){
		mapper.updateOrderRemarkForOut(params);
	}
	/**
	 * 批量更新任务单的备忘
	* @Description:
	* PurchaseOrderService
	* updateOrderRemark
	* @param params void
	* @author chenlong
	* 2016-8-20 下午3:23:16
	 */
	public void updateOrderRemarklist(Map<String,Object> params) throws ParseException{	
		String  orderId  = params.get("orderId").toString();//获取所有内容的JSON字符串
		JSONObject contentParamsObject = new JSONObject(orderId); //将所有内容的JSON字符串转化为JSON对象
		Map<String,Object> map = new HashMap<String, Object>();
		String sup_memo =params.get("sup_memo").toString();
		boolean flag = Boolean.parseBoolean(params.get("check").toString());
			for(int i=0;i<contentParamsObject.length();i++){		
				int id =Integer.parseInt(contentParamsObject.get(i+"").toString());
				map.put("pur_order_id", id);			
				if(!flag){
				  PurchaseOrderRemark purchaseOrderRemark = mapper.getOrderRemark(map);
				  if(purchaseOrderRemark.getMemo()!=null){
				      if(!(sup_memo.equals(""))){
					  sup_memo = sup_memo +"\n"+ purchaseOrderRemark.getMemo();
				      }else{
				      sup_memo = purchaseOrderRemark.getMemo();
				      }
				  }
				}	
				map.put("sup_memo", sup_memo);
				mapper.updateOrderRemark(map);
		}	
	}
	/**
	 * 外协批量更新任务单的备忘
	* @Description:
	* PurchaseOrderService
	* updateOrderRemark
	* @param params void
	* @author chenlong
	* 2016-8-20 下午3:23:16
	 */
	public void updateOrderRemarklistForOut(Map<String,Object> params){			 
		Integer count = Integer.parseInt(params.get("lengthd").toString());
		Map<String,Object> map = new HashMap<String, Object>();
		String pur_memo =params.get("pur_memo").toString();
		boolean flag = Boolean.parseBoolean(params.get("check").toString());
		if(!flag){
			for(int i=0;i<count;i++){		
				int id = Integer.parseInt(params.get("orderId["+i+"]").toString());
				map.put("pur_order_id", id);
				PurchaseOrderRemark purchaseOrderRemark = mapper.getOrderRemarkForOut(map);
				if(purchaseOrderRemark.getMemo()!=null){
				    if(!pur_memo.equals("")){
				      pur_memo = params.get("pur_memo").toString() +"\n"+ purchaseOrderRemark.getMemo();
					  }else{
					  pur_memo = purchaseOrderRemark.getMemo();
					  }
				}
				map.put("pur_memo", pur_memo);
				mapper.updateOrderRemarkForOut(map);
			}			
		}else{			
			map.put("pur_memo",pur_memo);
			for(int i=0;i<count;i++){
				int id = Integer.parseInt(params.get("orderId["+i+"]").toString());
				map.put("pur_order_id", id);
				mapper.updateOrderRemarkForOut(map);
			}
		}
	}
	/**
	 * 查询出订单的状态
	* @Description:
	* PurchaseOrderService
	* updateOrderRemark
	* @param params void
	* @author chenlong
	* 2016-8-20 下午3:23:16
	 */
	public int  getPurchaseOrderStatus(Map<String,Object> params) {	
		PurchaseOrderStatus purchaseOrderStatus = mapper.getOrderstatus(params);
		int status = purchaseOrderStatus.getStatus();	
		return status; 
	}
	/**
	 * 为接受订单查询出订单的状态
	* @Description:
	* PurchaseOrderService
	* updateOrderRemark
	* @param params void
	* @author chenlong
	* 2016-8-20 下午3:23:16
	 */
	public  Map<String,Object> getPurchaseOrderStatusForAccept(Map<String,Object> params) {
		Map<String,Object> map = new HashMap<String, Object>();
		PurchaseOrderStatus purchaseOrderStatus = mapper.getOrderstatus(params);
		OrderDeliveryNotice orderDeliveryNotice = orderDeliveryNoticeService.getOrderDeliveryNoticeListForAccept(params);
		if(orderDeliveryNotice==null){
			map.put("status2", true);
		}else if(orderDeliveryNotice.getNotice_status()==2||orderDeliveryNotice.getNotice_status()==1){//通知单已接收或修改过
			map.put("status2", true);
		}else{
			map.put("status2", false);
		}
		    map.put("status1", purchaseOrderStatus.getStatus());
		if(!WebUtil.isEmpty(orderDeliveryNotice)){
		    map.put("delivery_notice_id", orderDeliveryNotice.getDelivery_notice_id());
		}
		return map; 
	}
	/**
	* @Description: 获取订单
	* @param id
	* @return PurchaseOrder
	* @author chenlong
	* @date 2016-8-20
	*/
	public PurchaseOrder getOrderByID(Map<String,Object> params){
		PurchaseOrder purchaseOrder = mapper.getOrderByID(params);
		if(purchaseOrder==null){
			throw new BusinessException("订单已经不存在");
		}
		return purchaseOrder;
	}
	/**
	* @Description: 接受订单
	* @param id
	* @return PurchaseOrder
	* @author chenlong
	* @date 2016-8-22
	*/
	public void saveAccpetOrderByID(Map<String,Object> params){
		int status = getPurchaseOrderStatus(params);
		if(status ==10){
			params.put("order_status", 20);
			mapper.updateOrderStatus(params);
			purchaseOrderOperatingService.addPurchaseOrderOperating(params);
			//触发PO确认接单
			PurchaseOrderVo purchaseOrderVo = mapper.getOrderDetailsByID(params);
			PurchaseOrderSender sender = new PurchaseOrderSender();//构造发送数据
			sender.setPur_order_id(purchaseOrderVo.getPur_order_id());
			sender.setOrder_bh(purchaseOrderVo.getOrder_bh());
			sender.setOrder_status(purchaseOrderVo.getOrder_status());
			sender.setAgreement_bh(purchaseOrderVo.getAgreement_bh());
			sender.setR_opreate_dt(purchaseOrderVo.getR_opreate_dt());
			sender.setSource_type(purchaseOrderVo.getSource_type());
			qSender.orderSend(sender);//调用activemq发送消息对象
		}else{
			
		}
	}
	/**
	* @Description: 判断生产方的供应商，提交的请求对资源有没有操作权限
	* @return	true 有权限；false 没权限
	* @author chenlong
	* @date 2016-8-20
	*/
	public boolean getPermissoinForProducer(Map<String,Object> params){
		PurchaseOrder purchaseOrder=getOrderByID(params);
		List<PurchaseOrdersupId> list = getsupplierListID();
		boolean flag = false;
		for(PurchaseOrdersupId purchaseOrdersupId : list){
			if(purchaseOrder.getSupplier_id() == purchaseOrdersupId.getSupplier_id()){
				flag = true;
				break;
			}else{
				flag = false;
			}
		}
		List<RexAccountVo> listv = taskService.getRexAccountVo();
		for(RexAccountVo rexAccountVo : listv){
			if(purchaseOrder.getSup_company_id()  == rexAccountVo.getCompany_id()){
				flag = true;
				break;
			}else{
				flag = false;
			}
		}
		return flag;
	}
	/**
	* @Description: 判断发布任务的供应商，提交的请求对资源有没有操作权限
	* @return true 有权限；false 没权限
	* @author chenlong
	* @date 2016-8-20
	*/
	public boolean getPermissoinForSender(Map<String,Object> params){
		PurchaseOrder purchaseOrder=getOrderByID(params);
		List<PurchaseOrdersupId> list = getsupplierListID();
		boolean flag = false;
		for(PurchaseOrdersupId purchaseOrdersupId : list){
			if(purchaseOrder.getSupplier_id()  == purchaseOrdersupId.getSupplier_id()){
				flag = true;
				break;
			}else{
				flag = false;
			}
		}
		List<RexAccountVo> listv = taskService.getRexAccountVo();
		for(RexAccountVo rexAccountVo : listv){
			if(purchaseOrder.getPur_company_id()  == rexAccountVo.getCompany_id()){
				flag = true;
				break;
			}else{
				flag = false;
			}
		}
		return flag;
	}
	/**
	 * 返回所有与登录账号相关的供应商id
	* @Description:
	* PurchaseOrderService
	* getsupplierListID
	* @param params
	* @return List<PurchaseOrdersupId>
	* @author chenlong
	* 2016-8-20 下午6:16:44
	 */
	public List<PurchaseOrdersupId> getsupplierListID(){
		//1.获取session中的账号的值
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		Map<String,Object> params = new HashMap<String, Object>();
		if(loginAccount.getAccount_type()==0){//主账号
		params.put("reg_id", loginAccount.getLogin_id());
		}else if(loginAccount.getAccount_type()==1){//子账号
		params.put("sa_id", loginAccount.getLogin_id());
		}else {
			throw new BusinessException("账号不存在");
		}
		List<PurchaseOrdersupId> list = mapper.getsupplierListID(params);
		return list;
	}
	/**
	 * 销售返回订单的信息
	* @Description:
	* PurchaseOrderService
	* getOrderDetailsByID
	* @param params
	* @return PurchaseOrder
	* @author chenlong
	* 2016-8-23 下午4:11:46
	 */
	public PurchaseOrderVo getOrderDetailsByID(Map<String,Object> params){
		PurchaseOrderVo purchaseOrder = mapper.getOrderDetailsByID(params);
		return purchaseOrder;
	}
	/**
	 * 外协返回订单的信息
	* @Description:
	* PurchaseOrderService
	* getOrderDetailsByID
	* @param params
	* @return PurchaseOrder
	* @author chenlong
	* 2016-8-30 下午4:11:46
	 */
	public PurchaseOrderVo getOrderDetailsByIDForOut(Map<String,Object> params){
		PurchaseOrderVo purchaseOrder = mapper.getOrderDetailsByIDForOut(params);
		return purchaseOrder;
	}
	
	/**
	 * @Description:根据供应商ID查询送货登记需要的字段
	 * PurchaseOrderService
	 * getDeliveryRegisterDetailsVoByID
	 * @param params
	 * @return List<DeliveryRegisterDetailVo>
	 * @author yukai
	 * 2016-8-23 下午3:44:09
	 */
	public List<DeliveryRegisterDetailVo> getDeliveryRegisterDetailsVoByID(Map<String,Object> params){
		return mapper.getDeliveryRegisterDetailsVoByID(params);
	}
	/**
	 * 查询出终止协议和终止理由
	* @Description:
	* PurchaseOrderService
	* getOrderStopDetails
	* @param params
	* @return List<DeliveryRegisterDetailVo>
	* @author chenlong
	* 2016-8-26 上午10:40:51
	 */
	public OrderStopDetails getOrderStopDetails(Map<String,Object> params){
		OrderStopDetails orderStopDetails = new OrderStopDetails();
		OrderEndRecord orderEndRecord = orderEndRecordService.getOrderEndRecord(params);
		params.put("ft_id", 38);
		OrderAttchedFile orderAttchedFile = orderAttchedFileService.getOrderAttchedFileForOne(params);
		orderStopDetails.setOrderAttchedFile(orderAttchedFile);
		orderStopDetails.setOrderEndRecord(orderEndRecord);
		return orderStopDetails;
	}
	/**
	 * 查询出终止和取消的原因
	* @Description:
	* PurchaseOrderService
	* getOrderStopOrCancel
	* @param params
	* @return OrderStopOrCancel
	* @author chenlong
	* 2016-9-22 上午11:20:54
	 */
	public OrderStopOrCancel getOrderStopOrCancel(Map<String,Object> params){
		OrderStopOrCancel orderStopOrCancel = new OrderStopOrCancel();
		boolean flag = Boolean.parseBoolean(params.get("pur_order_status").toString());
		if(flag){//true:终止 false:取消
			OrderStopDetails orderStopDetails = getOrderStopDetails(params);
			orderStopOrCancel.setOrderStopDetails(orderStopDetails);
		}else{
			OrderCancelRecord orderCancelRecord= orderCancelRecordService.getOrderCancelRecord(params);
			orderStopOrCancel.setOrderCancelRecord(orderCancelRecord);
		}						
		return orderStopOrCancel;
	}
	/**
	 * 外协查询出终止协议和终止理由
	* @Description:
	* PurchaseOrderService
	* getOrderStopDetails
	* @param params
	* @return List<DeliveryRegisterDetailVo>
	* @author chenlong
	* 2016-8-26 上午10:40:51
	 */
	public OrderStopDetails getOrderStopDetailsForOut(Map<String,Object> params){
		OrderStopDetails orderStopDetails = new OrderStopDetails();
		int status = Integer.parseInt(params.get("status_s").toString());
		OrderEndRecord orderEndRecord = new OrderEndRecord();
		if(status ==40){
		orderEndRecord = orderEndRecordService.getOrderEndRecordByIdForOut(params);
		}else{
		orderEndRecord = orderEndRecordService.getOrderEndRecord(params);
		}
		params.put("ft_id", 38);
		OrderAttchedFile orderAttchedFile = orderAttchedFileService.getOrderAttchedFileForOne(params);
		orderStopDetails.setOrderAttchedFile(orderAttchedFile);
		orderStopDetails.setOrderEndRecord(orderEndRecord);
		return orderStopDetails;
	}
	/**
	 * 添加中止的信息
	* @Description:
	* OrderEndRecordService
	* addOrderEndRecord
	* @param params void
	* @author chenlong
	* 2016-9-1 上午9:01:19
	 */
	public void addOrderEndRecord(Map<String,Object> params) {
		int statusvo = getPurchaseOrderStatus(params);
		if(statusvo == 20){			
			params.put("order_status", 40);
			mapper.updateOrderStatus(params);
			orderEndRecordService.addOrderEndRecord(params);
			}else {//不再操作			
			}
	}
	/**
	 * 取消终止
	* @Description:
	* OrderEndRecordService
	* addOrderEndRecord
	* @param params void
	* @author chenlong
	* 2016-9-1 上午9:01:19
	 */
	public int updateOrderForStop(Map<String,Object> params) {
		int count = 0;
		int statusvo = getPurchaseOrderStatus(params);
		if(statusvo == 40){			
			params.put("order_status", 20);
			orderEndRecordService.updateOrderEndRecordStop(params);
			mapper.updateOrderStatus(params);
			orderAttchedFileService.updateOrderAttchedFileForStop(params);
			}else {//不再操作	
			count++;
			}
		return count;
	}
	
	/**
	 * 同意终止
	* @Description:
	* PurchaseOrderService
	* getOrderStopDetails
	* @param params
	* @return List<DeliveryRegisterDetailVo>
	* @author chenlong
	* 2016-8-26 上午10:40:51
	 */
	public int saveOrderStopDetails(Map<String,Object> params){
		int count = 0;
		int statusvo = getPurchaseOrderStatus(params);
		if(statusvo == 40){			
			params.put("order_status", 50);
			mapper.updateOrderStatus(params);
			orderEndRecordService.updateOrderEndRecord(params);	
			}else {//不再操作	
			count++;	
			}
		return count;
	        }
	/**
	 * @Description:获取销售方最新三条订单信息
	 * PurchaseOrderService
	 * getLastThreeDeliverOrder
	 * @param params
	 * @return List<PurchaseOrder>
	 * @author yukai
	 * 2016-9-13 上午9:16:41
	 */
	public List<PurchaseOrder> getLastThreeDeliverOrder(
			Map<String, Object> params) {
		return mapper.getLastThreeDeliverOrder(params);
	}
	/**
	 * @Description:获取采购方最新三条订单信息
	 * PurchaseOrderService
	 * getLastThreeDeliverOrderForOut
	 * @param params
	 * @return List<PurchaseOrder>
	 * @author yukai
	 * 2016-9-13 上午9:17:00
	 */
	public List<PurchaseOrder> getLastThreeDeliverOrderForOut(
			Map<String, Object> params) {
		return mapper.getLastThreeDeliverOrderForOut(params);
	}
	/**
	 * 导出订单文件
	* @Description:
	* PurchaseOrderService
	* createSubAccountExcel
	* @param filePath
	* @return
	* @throws IOException File
	* @author chenlong
	* 2016-9-7 上午11:41:16
	 */
	public File createOrderListExcel(String filePath,Map<String,Object>  qryParam) throws IOException{
		LoginAccount loginAccount=(LoginAccount)SessionUtil.getCurrentPlateLoginAccount();//(Const.SESSION_PLATFORM_USER);					
		String filename=loginAccount.getLogin_id()+"_"+MyDateUtils.format_yyyyMMddHHmmsss(new Date())+".xls";
		File file=new File(filePath+filename);
		file.createNewFile();
		HSSFWorkbook workbook=new HSSFWorkbook();			
		HSSFSheet sheet=workbook.createSheet();		
		sheet.setColumnWidth(2, 10000);//第2+1=3列宽10000
		//提示信息
		HSSFRow tip=sheet.createRow(0); //第0行
		HSSFCell tipCell0=tip.createCell(0);
        CellRangeAddress regions = new CellRangeAddress((short) 0,  
                (short) 0, (short) 0, (short) 8);//add  新顺序为 起始行 终止行 起始列 终止列  
        sheet.addMergedRegion(regions);
        tipCell0.setCellValue("1.该Excel表用于导出订单信息；2.一个订单对应的产品有多条,为了excel中的显示,下列订单存在重复,同一个订单对应着不同的产品");
        HSSFFont font = workbook.createFont();
        font.setFontName("宋体");
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);//粗体显示
        font.setFontHeightInPoints((short) 24);//设置字体大小
        HSSFCellStyle tipstyle = workbook.createCellStyle();
        tipstyle.setFont(font);
        tipstyle.setWrapText(true);//设置自动换行
        tipCell0.setCellStyle(tipstyle);
        tip.setHeight((short) 1600);
        //标题
        HSSFRow title=sheet.createRow(1); //第1行
		HSSFCell titleCell0=title.createCell(0);
        CellRangeAddress titleregions = new CellRangeAddress((short) 1,  
                (short) 1, (short) 0, (short) 8);//add  新顺序为 起始行 终止行 起始列 终止列  
        sheet.addMergedRegion(titleregions);
        titleCell0.setCellValue("订单信息表");
        HSSFCellStyle titleStyle = workbook.createCellStyle();
        titleStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        titleStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        titleCell0.setCellStyle(titleStyle);
        
		HSSFRow header=sheet.createRow(2); //第2行

		HSSFCell cell0=header.createCell(0);
		cell0.setCellValue("供应商公司");
		HSSFCell cell1=header.createCell(1);
		cell1.setCellValue("合同编号");
		HSSFCell cell2=header.createCell(2);
		cell2.setCellValue("提交时间");
		HSSFCell cell3=header.createCell(3);
		cell3.setCellValue("采购方公司");
		HSSFCell cell4=header.createCell(4);
		cell4.setCellValue("订单编号");
		HSSFCell cell5=header.createCell(5);
		cell5.setCellValue("下单人员");
		HSSFCell cell6=header.createCell(6);
		cell6.setCellValue("最早交期");
		HSSFCell cell7=header.createCell(7);
		cell7.setCellValue("总金额");
		HSSFCell cell8=header.createCell(8);
		cell8.setCellValue("订单状态");
		HSSFCell cell9=header.createCell(9);
		cell9.setCellValue("产品名称");
		HSSFCell cell10=header.createCell(10);
		cell10.setCellValue("产品规格尺寸");
		HSSFCell cell11=header.createCell(11);
		cell11.setCellValue("单价");
		HSSFCell cell12=header.createCell(12);
		cell12.setCellValue("数量");
		HSSFCell cell13=header.createCell(13);
		cell13.setCellValue("单位");
		HSSFCell cell14=header.createCell(14);
		cell14.setCellValue("入库数量");
		HSSFCell cell15=header.createCell(15);
		cell15.setCellValue("采购未完数量");
		HSSFCell cell16=header.createCell(16);
		cell16.setCellValue("到货数量");
		HSSFCell cell17=header.createCell(17);
		cell17.setCellValue("产品货号 ");
		sheet.setColumnWidth(0, 25*256);
		sheet.setColumnWidth(1, 20*256);
		sheet.setColumnWidth(2, 20*256);
		sheet.setColumnWidth(3, 20*256);
		sheet.setColumnWidth(4, 25*256);
		sheet.setColumnWidth(5, 20*256);
		sheet.setColumnWidth(6, 20*256);
		sheet.setColumnWidth(7, 20*256);
		sheet.setColumnWidth(8, 25*256);
		sheet.setColumnWidth(9, 20*256);
		sheet.setColumnWidth(10, 20*256);
		sheet.setColumnWidth(11, 20*256);
		sheet.setColumnWidth(12, 25*256);
		sheet.setColumnWidth(13, 20*256);
		sheet.setColumnWidth(14, 20*256);
		sheet.setColumnWidth(15, 20*256);
		sheet.setColumnWidth(16, 20*256);
		
		//设置  列为文本合适
		HSSFCellStyle css = workbook.createCellStyle();
		DataFormat  format = workbook.createDataFormat();
		css.setDataFormat(format.getFormat("@"));	
		sheet.setDefaultColumnStyle(8,css);
		HSSFCellStyle css2 = workbook.createCellStyle();
		DataFormat  format2 = workbook.createDataFormat();
		css2.setDataFormat(format2.getFormat("yyyy-mm-dd HH:mm:ss"));	
		sheet.setDefaultColumnStyle(2,css2);
		sheet.setDefaultColumnStyle(6,css2);
		HSSFCellStyle css3 = workbook.createCellStyle();
		DataFormat  format3 = workbook.createDataFormat();
		css3.setDataFormat(format3.getFormat("¥#,##0.00"));	
		sheet.setDefaultColumnStyle(7,css3);
		sheet.setDefaultColumnStyle(11,css3);
		String[] strb = qryParam.get("lengthd").toString().split(",");
		Map<String,Object> map = new HashMap<String, Object>();
		int row = 2 ;
		for(String strs:strb){
			int id = Integer.parseInt(strs);
			map.put("pur_order_id", id);
			PurchaseOrder purchaseOrder = mapper.getOrderDetailsByIDExcel(map);
			List<ProductList> listpro =  productListService.getProductListListForSearch(map);//详细信息
			for(ProductList list : listpro ){
			row++;
			HSSFRow detail=sheet.createRow(row); //第i+3行
			//PurchaseOrder purchaseOrder = list.get(i).getPurchaseOrder();
			HSSFCell cell_detail_0=detail.createCell(0);
			cell_detail_0.setCellValue(purchaseOrder.getSup_cpyname_cn());
			HSSFCell cell_detail_1=detail.createCell(1);
			cell_detail_1.setCellValue(purchaseOrder.getAgreement_bh());
			HSSFCell cell_detail_2=detail.createCell(2);
			cell_detail_2.setCellValue(purchaseOrder.getCreate_dt());
			HSSFCell cell_detail_3=detail.createCell(3);
			cell_detail_3.setCellValue(purchaseOrder.getPur_cpyname_cn());
			HSSFCell cell_detail_4=detail.createCell(4);
			cell_detail_4.setCellValue(purchaseOrder.getOrder_bh());
			HSSFCell cell_detail_5=detail.createCell(5);
			cell_detail_5.setCellValue(purchaseOrder.getPur_creator_name());
			HSSFCell cell_detail_6=detail.createCell(6);
			if(purchaseOrder.getDelivery_date()==null){
				cell_detail_6.setCellValue("");	
			}else{
				cell_detail_6.setCellValue(purchaseOrder.getDelivery_date());
			}
			HSSFCell cell_detail_7=detail.createCell(7);
			cell_detail_7.setCellValue(purchaseOrder.getSum_money());
			HSSFCell cell_detail_8=detail.createCell(8);
			String status = "";
			switch(purchaseOrder.getOrder_status()){
			case 10:
				status = "已提交";
				break;
			case 20:
				status = "已接收";
				break;
			case 30:
				status = "已完结";
				break;
			case 40:
				status = "终止待确认";
				break;
			case 50:
				status = "已终止";
				break;
			case 60:
				status = "已取消";
				break;
			}
			cell_detail_8.setCellValue(status);
			HSSFCell cell_detail_9=detail.createCell(9);
			cell_detail_9.setCellValue(list.getProduct_name());
			HSSFCell cell_detail_10=detail.createCell(10);
			cell_detail_10.setCellValue(list.getProduct_size());
			HSSFCell cell_detail_11=detail.createCell(11);
			cell_detail_11.setCellValue(list.getUnit_price());
			HSSFCell cell_detail_12=detail.createCell(12);
			cell_detail_12.setCellValue(list.getNumber());
			HSSFCell cell_detail_13=detail.createCell(13);
			cell_detail_13.setCellValue(list.getUnit());
			HSSFCell cell_detail_14=detail.createCell(14);
			cell_detail_14.setCellValue(list.getStorage_num());
			HSSFCell cell_detail_15=detail.createCell(15);
			cell_detail_15.setCellValue(list.getNo_delivery_num());
			HSSFCell cell_detail_16=detail.createCell(16);
			cell_detail_16.setCellValue(list.getDelivery_num());
			HSSFCell cell_detail_17=detail.createCell(17);
			cell_detail_17.setCellValue(list.getProduct_artno());							
		}
		}
		FileOutputStream fout = new FileOutputStream(file);  
		workbook.write(fout);  
        fout.close();     
		return file;
	}
	/**
	 * 取消接收并删除上传的文件
	* @Description:
	* PurchaseOrderService
	* deleteOrderAgreementFile
	* @param params void
	* @author chenlong
	* 2017-2-13 上午11:00:44
	 */
	public void  deleteOrderAgreementFile(Map<String,Object> params){
		OrderAgreementFile orderAgreementFile = orderAgreementFileService.getOrderFileforPurorderid(params);
		if(!WebUtil.isEmpty(orderAgreementFile)){
		     params.put("agreement_id",orderAgreementFile.getAgreement_id());
		     orderAgreementFileService.deleteOrderAgreementFile(params);//deleteOrderAgreementFile
		}
	}
}
