package platform.company.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.outsideasy.ws.erp.supplier.vo.MetarialOut;

import platform.company.data.PfMetarialMapper;
import platform.company.model.PfMaterial;

@Service
public class PfMetarialService {

	@Autowired
	private PfMetarialMapper pfMetarialMapper;
	
	public List<MetarialOut> getMetarialOutList(Map<String,Object> params){
		return pfMetarialMapper.getMetarialOutList(params);
	}
	
	/**
	 * 
	*getBuyModelByCompanyId
	*@param companyId
	*@return
	*List<PfMaterial>
	*@author mishengliang
	*2016-4-20下午4:37:31
	 */
	public List<PfMaterial> getBuyModelByCompanyId(Integer companyId){
		return pfMetarialMapper.getBuyModelByCompanyId(companyId);
	}
	public List<Map<String, Object>> getBuyModelMapByCompanyId(Map<String, Object> params){
		return pfMetarialMapper.getBuyModelMapByCompanyId(params);
	}
	
	/**
	 * 
	*updateMetarialById
	*@param params
	*void
	*@author mishengliang
	*2016-4-20下午4:37:34
	 */
	public void updateMetarialById(Map<String,Object> params){
		pfMetarialMapper.updateMetarialById(params);
	}
	
	/**
	 * 
	*deleteMetarial
	*@param params
	*void
	*@author mishengliang
	*2016-4-20下午4:37:39
	 */
	public void deleteMetarial(Map<String,Object> params){
		pfMetarialMapper.deleteMetarial(params);
	}
	public void deleteMetarials(Map<String,Object> params){
		String[] metarialIds = params.get("materialIds").toString().split(",");
		pfMetarialMapper.deleteMetarials(metarialIds);
	}
	
	/**
	 * 
	*addMetarial
	*@param params
	*void
	*@author mishengliang
	*2016-4-20下午4:37:43
	 */
	public void addMetarial(Map<String,Object> params){
		pfMetarialMapper.addMetarial(params);
	}
	
	/**
	 * 批量增加原材料
	*addOrUpdateMetarialCluster
	*@param materialInfo
	*@param companyId
	*@throws Exception
	*void
	*@author mishengliang
	*2016-4-23下午2:00:47
	 */
	@SuppressWarnings("unchecked")
	public void addOrUpdateMetarialCluster(String materialInfo,Integer companyId) throws Exception{
		Map<String, Object> params = new HashMap<String, Object>();//总的数据集合
		Map<String, Object> addParams = new HashMap<String, Object>();//新增的数据集合
		Map<String, Object> updateParams = new HashMap<String, Object>();//更新数据集合
		
		String[] materialListInfo = materialInfo.split(";");
		
		for(int i = 0; i<materialListInfo.length; i++){
			params = stringToMap(materialListInfo[i]);//构造对象单元数据
			addParams = (Map<String, Object>) params.get("addParams");
			updateParams = (Map<String, Object>) params.get("updateParams");
			
			if(updateParams.size() != 0){
				updateMetarialById(updateParams);
			}else if(addParams.size() != 0){
				addParams.put("companyId", companyId);
				if ("".equals(addParams.get("materialName"))&&"".equals(addParams.get("materialBrand"))) {//空数据不保存
					
				}else {
					addMetarial(addParams);
				}
			}
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
			if("materialId".equals(characterString[0].trim()) && "-1".equals(characterString[1].trim())){
				iParams = addParams;
			}else if("materialId".equals(characterString[0].trim())){
				iParams = updateParams;
			}
		}
		
		for(int i = 0;i < proArray.length; i++){
				String[] characterString = proArray[i].split(":");
				if ("materialId".equals(characterString[0].trim())) {
					iParams.put(characterString[0], Integer.parseInt(characterString[1]));
				}else if(characterString.length > 1 && characterString[1].length() > 0){
					iParams.put(characterString[0], characterString[1]);
				}else{//空字符串
					iParams.put(characterString[0], "");
				}
		}
		params.put("addParams", addParams);
		params.put("updateParams", updateParams);
		
		return params;
	}
	/**
	 * @Description:根据companyId删除
	 * PfMetarialService
	 * deleteMetarialByCompanyId
	 * @param params void
	 * @author yukai
	 * 2016-8-30 上午9:34:18
	 */
	public void deleteMetarialByCompanyId(Map<String, Object> params) {
		pfMetarialMapper.deleteMetarialByCompanyId(params);
	}
}
