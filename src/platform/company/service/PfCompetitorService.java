package platform.company.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.outsideasy.ws.erp.supplier.vo.CompetitorOut;

import platform.company.data.PfCompetitorMapper;
import platform.company.model.PfCompetitor;

@Service
public class PfCompetitorService {

	@Autowired
	private PfCompetitorMapper pfCompetitorMapper;
	
	public List<CompetitorOut> getCompetitorOutList(Map<String,Object> params){
		return pfCompetitorMapper.getCompetitorOutList(params);
	}
	
	/**
	 * 
	*getCompetitorByCompanyId
	*@param companyId
	*@return
	*List<PfCompetitor>
	*@author mishengliang
	*2016-4-21上午8:59:44
	 */
	public List<PfCompetitor> getCompetitorByCompanyId(Integer companyId){
		return pfCompetitorMapper.getCompetitorByCompanyId(companyId);
	}
	public List<Map<String, Object>> getCompetitorMapByCompanyId(Map<String, Object> params){
		return pfCompetitorMapper.getCompetitorMapByCompanyId(params);
	}
	
	/**
	 * 
	*deleteCompetitor
	*@param params
	*void
	*@author mishengliang
	*2016-4-21上午8:59:48
	 */
	public void deleteCompetitor(Map<String,Object> params){
		String competitorIds = (String) params.get("competitorIds");
		String[] ids = competitorIds.split(",");
		for(int i = 0; i < ids.length; i++){//暂时使用循环删除的方法，之后替换为将整个参数传到后台，执行
			params.put("competitorId",Integer.parseInt(ids[i]));
			pfCompetitorMapper.deleteCompetitor(params);
		}
	}
	/**
	 * @Description:删除竞争对手
	 * PfCompetitorService
	 * deleteCompetitorById
	 * @param params void
	 * @author yukai
	 * 2016-8-29 下午5:35:49
	 */
	public void deleteCompetitorById(Map<String,Object> params){
			pfCompetitorMapper.deleteCompetitor(params);
	}
	
	/**
	 * 
	*updateCompetitor
	*@param params
	*void
	*@author mishengliang
	*2016-4-21上午8:59:52
	 */
	public void updateCompetitor(Map<String,Object> params){
		pfCompetitorMapper.updateCompetitor(params);
	}
	
	/**
	 * 
	*addCompetitor
	*@param params
	*void
	*@author mishengliang
	*2016-4-21上午8:59:57
	 */
	public void addCompetitor(Map<String,Object> params){
		pfCompetitorMapper.addCompetitor(params);
	}
	
	/**
	 * 批量增加或更新竞争对手
	*addOrUpdateCompetitorCluster
	*@param competitorInfo
	*@param companyId
	*@throws Exception
	*void
	*@author mishengliang
	*2016-4-23下午1:35:13
	 */
	@SuppressWarnings("unchecked")
	public void addOrUpdateCompetitorCluster(String competitorInfo,Integer companyId) throws Exception{
		if(competitorInfo != "" && competitorInfo != null){
			Map<String, Object> params = new HashMap<String, Object>();//总的数据集合
			Map<String, Object> addParams = new HashMap<String, Object>();//新增的数据集合
			Map<String, Object> updateParams = new HashMap<String, Object>();//更新数据集合
			
			String[] competitorListInfo = competitorInfo.split(";");
			
			for(int i = 0; i<competitorListInfo.length; i++){
				params = stringToMap(competitorListInfo[i]);//构造对象单元数据
				addParams = (Map<String, Object>) params.get("addParams");
				updateParams = (Map<String, Object>) params.get("updateParams");
				
				if(updateParams.size() != 0){
					updateCompetitor(updateParams);
				}else if(addParams.size() != 0){
					addParams.put("companyId", companyId);
					addCompetitor(addParams);
				}
			}
		}else{//竞争对手无信息时，无操作
			
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
			if("competitorId".equals(characterString[0].trim()) && "-1".equals(characterString[1].trim())){
				iParams = addParams;
			}else if("competitorId".equals(characterString[0].trim())){
				iParams = updateParams;
			}
		}
		
		for(int i = 0;i < proArray.length; i++){
				String[] characterString = proArray[i].split(":");
				if ("competitorId".equals(characterString[0].trim())) {
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
	 * PfCompetitorService
	 * deleteCompetitorByCompanyId
	 * @param params void
	 * @author yukai
	 * 2016-8-30 上午9:38:56
	 */
	public void deleteCompetitorByCompanyId(Map<String, Object> params) {
		pfCompetitorMapper.deleteCompetitorByCompanyId(params);
	}
}
