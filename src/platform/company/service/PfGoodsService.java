package platform.company.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.outsideasy.ws.erp.supplier.vo.GoodsOut;

import platform.company.data.PfGoodsMapper;
import platform.company.model.PfGoods;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：PfGoodsService    
 * 类描述：    
 * 创建人：lenovo    
 * 创建时间：2016-4-22 下午5:56:22    
 * 修改人：lenovo    
 * 修改时间：2016-4-22 下午5:56:22    
 * 修改备注：    
 * @version     
 *     
 */
@Service
public class PfGoodsService {

	@Autowired
	private PfGoodsMapper pfGoodsMapper;
	
	public List<GoodsOut> getGoodsOutList(Map<String,Object> params){
		return pfGoodsMapper.getGoodsOutList(params);
	}
	
	/**
	 * 
	*getSaleModelByCompanyId
	*@param companyId
	*@return
	*List<PfGoods>
	*@author mishengliang
	*2016-4-20下午4:26:11
	 */
	public List<PfGoods> getSaleModelByCompanyId(Integer companyId){
		return pfGoodsMapper.getSaleModelByCompanyId(companyId);
	}
	public List<Map<String, Object>> getSaleModelMapByCompanyId(Map<String, Object> params){
		return pfGoodsMapper.getSaleModelMapByCompanyId(params);
	}
	
	/**
	 * 
	*deleteGoods
	*@param params
	*void
	*@author mishengliang
	*2016-4-20下午4:26:15
	 */
	public void deleteGoods(Map<String, Object> params){
		pfGoodsMapper.deleteGoods(params);
	}
	public void deleteGoodss(Map<String, Object> params){
		String[] goodsIds = params.get("goodsIds").toString().split(",");
		pfGoodsMapper.deleteGoodss(goodsIds);
	}
	
	/**
	 * 
	*updateGoodsByGoodsId
	*@param params
	*void
	*@author mishengliang
	*2016-4-20下午4:26:19
	 */
	public void updateGoodsByGoodsId(Map<String, Object> params){
		pfGoodsMapper.updateGoodsByGoodsId(params);
	}
	
	/**
	 * 
	*addGoods
	*@param params
	*void
	*@author mishengliang
	*2016-4-20下午4:26:23
	 */
	public void addGoods(Map<String, Object> params){
		pfGoodsMapper.addGoods(params);
	}
	
	/**
	 * 批量增加或更新数据
	*addOrUpdateGoodsCluster
	*@param goodsInfo
	*@param companyId
	*@throws Exception
	*void
	*@author mishengliang
	*2016-4-23下午1:53:39
	 */
	@SuppressWarnings("unchecked")
	public void addOrUpdateGoodsCluster(String goodsInfo,Integer companyId) throws Exception{
		Map<String, Object> params = new HashMap<String, Object>();//总的数据集合
		Map<String, Object> addParams = new HashMap<String, Object>();//新增的数据集合
		Map<String, Object> updateParams = new HashMap<String, Object>();//更新数据集合
		
		String[] goodsListInfo = goodsInfo.split(";");
		
		for(int i = 0; i<goodsListInfo.length; i++){
			params = stringToMap(goodsListInfo[i]);//构造对象单元数据
			addParams = (Map<String, Object>) params.get("addParams");
			updateParams = (Map<String, Object>) params.get("updateParams");
			
			if(updateParams.size() != 0){
				updateGoodsByGoodsId(updateParams);
			}else if(addParams.size() != 0){
				addParams.put("companyId", companyId);
				if ("".equals(addParams.get("goodsName"))&&"".equals(addParams.get("goodsBrand"))) {//空数据不保存
					
				}else {
					addGoods(addParams);
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
			if("goodsId".equals(characterString[0].trim()) && "-1".equals(characterString[1].trim())){
				iParams = addParams;
			}else if("goodsId".equals(characterString[0].trim())){
				iParams = updateParams;
			}
		}
		
		for(int i = 0;i < proArray.length; i++){
				String[] characterString = proArray[i].split(":");
				if ("goodsId".equals(characterString[0].trim())) {
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
	 * PfGoodsService
	 * deleteGoodsByCompanyId
	 * @param params void
	 * @author yukai
	 * 2016-8-30 上午9:31:33
	 */
	public void deleteGoodsByCompanyId(Map<String, Object> params) {
		pfGoodsMapper.deleteGoodsByCompanyId(params);
	}
}
