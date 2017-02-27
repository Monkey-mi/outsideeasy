package platform.company.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.company.data.PfMainCustomerMapper;
import platform.company.model.PfMainCustomer;

import com.outsideasy.ws.erp.supplier.vo.MainCustomerOut;

@Service
public class PfMainCustomerService {

	@Autowired
	private PfMainCustomerMapper pfMainCustomerMapper;
	
	public List<MainCustomerOut> getMainCustomerOutList(Map<String,Object> params) {
		return pfMainCustomerMapper.getMainCustomerOutList(params);
	}
	
	/**
	 * 
	*getMainCustomerByCompanyId
	*@param companyId
	*@return
	*List<PfMainCustomer>
	*@author mishengliang
	*2016-4-21上午8:42:30
	 */
	public List<PfMainCustomer> getMainCustomerByCompanyId(Integer companyId){
		return pfMainCustomerMapper.getMainCustomerByCompanyId(companyId);
	}
	public List<Map<String, Object>> getMainCustomerMapByCompanyId(Map<String, Object> params){
		return pfMainCustomerMapper.getMainCustomerMapByCompanyId(params);
	}
	
	/**
	 * 
	*updateCustomer
	*@param params
	*void
	*@author mishengliang
	*2016-4-21上午8:42:34
	 */
	public void updateCustomer(Map<String,Object> params){
		pfMainCustomerMapper.updateCustomer(params);
	}
	
	/**
	 * 
	*deleteCustomer
	*@param params
	*void
	*@author mishengliang
	*2016-4-21上午8:42:38
	 */
	public void deleteCustomer(Map<String,Object> params){
		String customerIds = (String) params.get("customerIds");
		String[] ids = customerIds.split(",");
		for(int i = 0; i < ids.length; i++){//暂时使用循环删除的方法，之后替换为将整个参数传到后台，执行
			params.put("customerId",Integer.parseInt(ids[i]));
			pfMainCustomerMapper.deleteCustomer(params);
		}
	}
	/**
	 * @Description:删除主要客户
	 * PfMainCustomerService
	 * deleteCustomerById
	 * @param params void
	 * @author yukai
	 * 2016-8-29 下午5:36:41
	 */
	public void deleteCustomerById(Map<String,Object> params){
			pfMainCustomerMapper.deleteCustomer(params);
	}
	/**
	 * 
	*addCustomer
	*@param params
	*void
	*@author mishengliang
	*2016-4-21上午8:42:42
	 */
	public void addCustomer(Map<String,Object> params){
		pfMainCustomerMapper.addCustomer(params);
	}
	
	/**
	 * 批量增加和修改客户数据
	*addOrUpdateCustomerCluster
	*@param customerInfo
	*@param companyId
	*@throws Exception
	*void
	*@author mishengliang
	*2016-4-23上午11:32:41
	 */
	@SuppressWarnings("unchecked")
	public void addOrUpdateCustomerCluster(String customerInfo,Integer companyId) throws Exception{
		if(customerInfo != "" && customerInfo != null){
			Map<String, Object> params = new HashMap<String, Object>();//总的数据集合
			Map<String, Object> addParams = new HashMap<String, Object>();//新增的数据集合
			Map<String, Object> updateParams = new HashMap<String, Object>();//更新数据集合
			
			String[] customerListInfo = customerInfo.split(";");
			
			for(int i = 0; i<customerListInfo.length; i++){
				params = stringToMap(customerListInfo[i]);//构造对象单元数据
				addParams = (Map<String, Object>) params.get("addParams");
				updateParams = (Map<String, Object>) params.get("updateParams");
				
				if(updateParams.size() != 0){
					updateCustomer(updateParams);
				}else if(addParams.size() != 0){
					addParams.put("companyId", companyId);
					addCustomer(addParams);
				}
			}
		}else{//无客户数据时，无操作
			
		}
	}
	
	/**
	 * 将特定的String格式装进Map中
	*stringToMap
	*@param string 格式为：A:a,B:b;A:a,B:b;A:a,B:b;...  A:a,B:b;即为为一个模块 A B为属性名称，a b为各自的属性值
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-22下午2:31:59
	 */
	private Map<String, Object> stringToMap(String ObjectString) throws Exception{
		Map<String, Object> params = new HashMap<String, Object>();//总的数据集合
		Map<String, Object> addParams = new HashMap<String, Object>();//新增的数据集合
		Map<String, Object> updateParams = new HashMap<String, Object>();//更新数据集合
		Map<String, Object> iParams = new HashMap<String, Object>();//变量引用
		
		String[] proArray = ObjectString.split(",");
		for(String s : proArray){//将新增数据和更新数据分离
			String[] characterString = s.split(":");
			if("customerId".equals(characterString[0].trim()) && "-1".equals(characterString[1].trim())){
				iParams = addParams;
			}else if("customerId".equals(characterString[0].trim())){
				iParams = updateParams;
			}
		}
		
		for(int i = 0;i < proArray.length; i++){
				String[] characterString = proArray[i].split(":");
				if ("customerId".equals(characterString[0].trim())) {
					iParams.put(characterString[0], Integer.parseInt(characterString[1]));
				}else{
					iParams.put(characterString[0], characterString[1]);
				}
		}
		params.put("addParams", addParams);
		params.put("updateParams", updateParams);
		
		return params;
	}
	/**
	 * @Description:根据companyId删除
	 * PfMainCustomerService
	 * deleteCustomerByCompanyId
	 * @param params void
	 * @author yukai
	 * 2016-8-30 上午9:37:12
	 */
	public void deleteCustomerByCompanyId(Map<String, Object> params) {
		pfMainCustomerMapper.deleteCustomerByCompanyId(params);
	}
	
}
