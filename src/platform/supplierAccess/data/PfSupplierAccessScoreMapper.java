package platform.supplierAccess.data;

import java.util.List;
import java.util.Map;

import platform.supplierAccess.model.PfSupplierAccessScore;
import platform.supplierAccess.model.PfSupplierAccessScoreDetails;
import platform.supplierAccess.model.PfSupplierAccessScoreSummary;


public interface PfSupplierAccessScoreMapper {
	
	public List<PfSupplierAccessScore> getPfSupplierAccessScoreList(Map<String,Object> params);
	public void addPfSupplierAccessScore(PfSupplierAccessScore obj);
	public void updatePfSupplierAccessScore(PfSupplierAccessScore obj);
	public void deletePfSupplierAccessScore(PfSupplierAccessScore obj);
	
	public List<PfSupplierAccessScoreDetails> getPfSupplierAccessScoreDetailsList(Map<String,Object> params);
	
	/**
	 * 获取13项认证的数据
	*getPfSupplierAccessScoreSummaryList
	*@param params
	*@return
	*List<PfSupplierAccessScoreSummary>
	*@modifier mishengliang
	*2016-5-27下午1:49:49
	 */
	public List<PfSupplierAccessScoreSummary> getPfSupplierAccessScoreSummaryList(Map<String,Object> params);
	
	void deletePfSupplierAccessScoreForCompanyId(Map<String,Object> params);
}
