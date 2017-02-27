package usercenter.saleManage.tradeManager.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import common.mongodb.service.FileOptService;
import common.user.model.LoginAccount;

import usercenter.saleManage.tradeManager.data.OrderAttchedFileMapper;
import usercenter.saleManage.tradeManager.model.OrderAttchedFile;
import util.SessionUtil;


@Service
public class OrderAttchedFileService {
	@Autowired
	private OrderAttchedFileMapper mapper;
	@Autowired
	private FileOptService fileService;


	public List<OrderAttchedFile> getOrderAttchedFileList(Map<String,Object> params) {
		return mapper.getOrderAttchedFileList(params);
	}
	/**
	 * 增加一条终止文件信息
	* @Description:
	* OrderAttchedFileService
	* addOrderAttchedFile
	* @param arr void
	* @author chenlong
	* 2016-8-31 下午5:50:07
	 */
	public Map<String,Object> addOrderAttchedFile(OrderAttchedFile orderAttchedFile,CommonsMultipartFile file,Map<String,Object> params) throws Exception {	
		Map<String,Object> map = new HashMap<String, Object>();
		String fileName = fileService.SaveFile(file,params);
		orderAttchedFile.setMogodb_id(fileName);//把存储mongoDb的文件序号存到数据库中
		orderAttchedFile.setSource_type(1);//1:供方回签合同
		//1.获取session中的账号的值
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		orderAttchedFile.setCreator_id(loginAccount.getLogin_id());
		orderAttchedFile.setCreator_name(loginAccount.getLogin_name());
		orderAttchedFile.setFt_id(38);//
		mapper.addOrderAttchedFile(orderAttchedFile);
		map.put("order_attched_id",orderAttchedFile.getOrder_attched_id());
		map.put("filename",orderAttchedFile.getOrder_attched_name());
		map.put("suffix_name", orderAttchedFile.getSuffix_name());
		return map;					
	}
	/**
	 * 返回是否上传过终止文件
	* @Description:
	* OrderAttchedFileService
	* addOrderAttchedFileCount
	* @param params
	* @return int
	* @author chenlong
	* 2016-8-31 下午6:00:55
	 */
	public int addOrderAttchedFileCount(OrderAttchedFile orderAttchedFile ){
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("pur_order_id", orderAttchedFile.getPur_order_id());
		map.put("ft_id", 38);
		return mapper.addOrderAttchedFileCount(map);
	}
	public void updateOrderAttchedFile(OrderAttchedFile[] arr) {
		for(OrderAttchedFile obj: arr) {
			mapper.updateOrderAttchedFile(obj);
		}
	}
	public void deleteOrderAttchedFile(OrderAttchedFile[] arr) {
		for(OrderAttchedFile obj: arr) {
			mapper.deleteOrderAttchedFile(obj);
		}
	}
	/**
	 * 查询出不同类型订单文件
	* @Description:
	* OrderAttchedFileService
	* getOrderAttchedFileForSub
	* @param params
	* @return List<OrderAttchedFile>
	* @author chenlong
	* 2016-8-24 下午1:54:43
	 */
	public List<OrderAttchedFile> getOrderAttchedFileForSub(Map<String,Object> params) {
		Integer is_look = Integer.parseInt(params.get("is_look").toString());
		if(is_look == 1){
		mapper.updateOrderAttchedFileForLook(params);//更新为已看状态
		}
		return mapper.getOrderAttchedFileForSub(params);
	}
	/**
	 * 销售方查询出一种类型的文件
	* @Description:
	* OrderAttchedFileService
	* getOrderAttchedFileForSub
	* @param params
	* @return List<OrderAttchedFile>
	* @author chenlong
	* 2016-8-26 下午1:54:43
	 */
	public OrderAttchedFile getOrderAttchedFileForOne(Map<String,Object> params) {
		params.put("status", 0);
		return mapper.getOrderAttchedFileForOne(params);
	}
	/**
	 * 查询出其他文件信息
	* @Description:
	* OrderAttchedFileService
	* getOrderAttchedFileForOneOther
	* @param params
	* @return OrderAttchedFile
	* @author chenlong
	* 2016-9-19 下午3:50:22
	 */
	public  OrderAttchedFile getOrderAttchedFileForOneOther(Map<String,Object> params) {
		params.put("status", 0);
		return mapper.getOrderAttchedFileForOneOther(params);
	}
	/**
	 * 返回一种类型的文件集
	* @Description:
	* OrderAttchedFileService
	* getOrderAttchedFileForList
	* @param params
	* @return List<OrderAttchedFile>
	* @author chenlong
	* 2016-9-21 下午6:34:26
	 */
	public List<OrderAttchedFile> getOrderAttchedFileForList(Map<String,Object> params) {
		params.put("status", 0);
		return mapper.getOrderAttchedFileForList(params);
	}
	/**
	 * 更新终止的文件状态为不可用
	* @Description:
	* OrderAttchedFileService
	* getOrderAttchedFileForSub
	* @param params
	* @return List<OrderAttchedFile>
	* @author chenlong
	* 2016-8-26 下午1:54:43
	 */
	public void  updateOrderAttchedFileForStop(Map<String,Object> params) {
		params.put("status", 1);
		mapper.updateOrderAttchedFileForStop(params);
	}
	/**
	 * 采购更新终止的文件状态为不可用
	* @Description:
	* OrderAttchedFileService
	* getOrderAttchedFileForSub
	* @param params
	* @return List<OrderAttchedFile>
	* @author chenlong
	* 2016-8-26 下午1:54:43
	 */
	public void  updateOrderAttchedFileStop(Map<String,Object> params) {
		params.put("status", 1);
		mapper.updateOrderAttchedFileStop(params);
	}

	/**
	 * 销售方查询出一个文件
	* @Description:
	* OrderAttchedFileService
	* getOrderAttchedFileForSub
	* @param params
	* @return List<OrderAttchedFile>
	* @author chenlong
	* 2016-8-26 下午1:54:43
	 */
	public OrderAttchedFile getOrderAttchedFileListSub(Map<String,Object> params) {
		return mapper.getOrderAttchedFileListSub(params);
	}
	/**
	 * 查询出未查看的文件数量
	* @Description:
	* OrderAttchedFileService
	* getOrderAttchedFileForSubForLook
	* @param params
	* @return Integer
	* @author chenlong
	* 2016-8-30 下午3:43:16
	 */
	public Integer getOrderAttchedFileForSubForLook(Map<String,Object> params) {
		params.put("status", 0);
		params.put("is_look", 0);
		return mapper.getOrderAttchedFileForSubForLook(params);
	}
}
