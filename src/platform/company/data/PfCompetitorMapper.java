package platform.company.data;

import java.util.List;
import java.util.Map;

import platform.company.model.PfCompetitor;

import com.outsideasy.ws.erp.supplier.vo.CompetitorOut;

public interface PfCompetitorMapper {
	public List<CompetitorOut> getCompetitorOutList(Map<String,Object> params);
	
	/**
	 * 根据companyId获取竞争对手信息;返回为竞争对手对象，竞争对手对象扩展字段，更有利于维护
	*getCompetitorByCompanyId
	*@param companyId
	*@return
	*List<PfCompetitor>
	*@author mishengliang
	*2016-4-7下午7:21:04
	 */
	public List<PfCompetitor> getCompetitorByCompanyId(Integer companyId);
	public List<Map<String, Object>> getCompetitorMapByCompanyId(Map<String, Object> params);
	
	/**
	 * 删除指定对手信息
	*deleteCompetitor
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午5:01:57
	 */
	public void deleteCompetitor(Map<String,Object> params);
	
	/**
	 * 更新指定对手信息
	*updateCompetitor
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午5:02:19
	 */
	public void updateCompetitor(Map<String,Object> params);
	
	/**
	 * 增加对手信息
	*addCompetitor
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午5:02:42
	 */
	public void addCompetitor(Map<String,Object> params);

	public void deleteCompetitorByCompanyId(Map<String, Object> params);
}
