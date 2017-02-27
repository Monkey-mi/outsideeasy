package usercenter.saleManage.tradeManager.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import common.mongodb.service.FileOptService;
import common.user.model.LoginAccount;

import usercenter.saleManage.tradeManager.data.OrderAgreementFileMapper;
import usercenter.saleManage.tradeManager.model.OrderAgreementFile;
import util.SessionUtil;


@Service
public class OrderAgreementFileService {
	@Autowired
	private OrderAgreementFileMapper mapper;
	@Autowired
	private FileOptService fileService;

	/**
	* 查询出回签合同的数量
	* @Description:
	* OrderAgreementFileService
	* getOrderAgreementFileList
	* @param params
	* @return int
	* @author chenlong
	* 2016-8-22 下午3:22:01
	 */
	public int getOrderAgreementFileCount(OrderAgreementFile orderAgreementFile) {
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("pur_order_id", orderAgreementFile.getPur_order_id());
		return mapper.getOrderAgreementFileCount(map);
	}
	/**
	 * 查询出回签合同
	* @Description:
	* OrderAgreementFileService
	* getOrderAgreementFileforId
	* @param orderAgreementFile
	* @return OrderAgreementFile
	* @author chenlong
	* 2016-8-22 下午4:01:47
	 */
	public OrderAgreementFile getOrderAgreementFileforId(Map<String,Object> map) {
		return mapper.getOrderAgreementFileforId(map);
	}
	
	/**
	* 添加合同文件
	* @Description:
	* OrderAgreementFileService
	* addOrderAgreementFile
	* @param params void
	* @author chenlong
	* 2016-8-22 上午10:43:27
	 * @throws Exception 
	 */
	public Map<String,Object>  addOrderAgreementFile(OrderAgreementFile orderAgreementFile,CommonsMultipartFile file,Map<String,Object> params) throws Exception {
		Map<String,Object> map = new HashMap<String, Object>();
		String fileName = fileService.SaveFile(file,params);
		orderAgreementFile.setMogodb_id(fileName);//把存储mongoDb的文件序号存到数据库中
		orderAgreementFile.setAgreement_status(1);//1:供方回签合同
		//1.获取session中的账号的值
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		orderAgreementFile.setCreator_id(loginAccount.getLogin_id());
		orderAgreementFile.setCreator_name(loginAccount.getLogin_name());
		orderAgreementFile.setSource_type(1);//1：平台方
		mapper.addOrderAgreementFile(orderAgreementFile);
		map.put("agreement_id",orderAgreementFile.getAgreement_id());
		map.put("filename",orderAgreementFile.getAgreement_name());
		map.put("suffix_name", orderAgreementFile.getSuffix_name());
		return map;		
	}
	/**
	* 删除回签合同文件
	* @Description:
	* OrderAgreementFileService
	* deleteOrderAgreementFile
	* @param params void
	* @author chenlong
	* 2016-8-22 下午3:05:37
	 */
	public void deleteOrderAgreementFile(Map<String,Object> params) {
		OrderAgreementFile orderAgreementFile = mapper.getOrderFileforId(params);
		fileService.deleteFileByName(orderAgreementFile.getMogodb_id());
		mapper.deleteOrderAgreementFile(params);	
	}
	/**
	 * 查询出订单中的文件
	* @Description:
	* OrderAgreementFileService
	* getOrderFileforPurorderid
	* @param params
	* @return OrderAgreementFile
	* @author chenlong
	* 2017-2-13 上午10:55:49
	 */
	public OrderAgreementFile getOrderFileforPurorderid(Map<String,Object> params) {
		return mapper.getOrderFileforPurorderid(params);
	}
	/**
	 * 查询出合同
	* @Description:
	* OrderAgreementFileService
	* getOrderAgreementFile
	* @param params
	* @return List<OrderAgreementFile>
	* @author chenlong
	* 2016-8-24 下午3:36:49
	 */
	public List<OrderAgreementFile> getOrderAgreementFileForSub(Map<String,Object> params){
		 List<OrderAgreementFile> list = mapper.getOrderAgreementFile(params);
		 for(OrderAgreementFile orderAgreementFile : list){
			 if(orderAgreementFile.getAgreement_status()==0){
				 String this_suffix=orderAgreementFile.getAgreement_name().substring(orderAgreementFile.getAgreement_name().lastIndexOf("."));
				 orderAgreementFile.setSuffix_name(this_suffix);
			 }
		 }
		 return list;
	}
	/**
	 * 查询出要下载的文件（唯一）
	* @Description:
	* OrderAgreementFileService
	* getOrderAgreementFileforOne
	* @param params
	* @return OrderAgreementFile
	* @author chenlong
	* 2016-8-24 下午4:27:59
	 */
	public OrderAgreementFile getOrderAgreementFileforOne(Map<String,Object> params){
		return mapper.getOrderAgreementFileforOne(params);
	}
}
