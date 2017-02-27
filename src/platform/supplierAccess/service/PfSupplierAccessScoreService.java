package platform.supplierAccess.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.supplierAccess.data.PfSupplierAccessScoreMapper;
import platform.supplierAccess.model.PfSupplierAccessScore;
import platform.supplierAccess.model.PfSupplierAccessScoreDetails;
import platform.supplierAccess.model.PfSupplierAccessScoreSummary;

@Service
public class PfSupplierAccessScoreService {

	@Autowired
	private PfSupplierAccessScoreMapper pfSupplierAccessScoreMapper;
	
	public List<PfSupplierAccessScore> getPfSupplierAccessScoreList(Map<String,Object> params){
		return pfSupplierAccessScoreMapper.getPfSupplierAccessScoreList(params);
	}
	public void addPfSupplierAccessScore(PfSupplierAccessScore[] arr){
		for(PfSupplierAccessScore obj:arr){
			pfSupplierAccessScoreMapper.addPfSupplierAccessScore(obj);
		}
	}
	public void updatePfSupplierAccessScore(PfSupplierAccessScore[] arr){
		for(PfSupplierAccessScore obj:arr){
			pfSupplierAccessScoreMapper.updatePfSupplierAccessScore(obj);
		}
	}
	
	public void deletePfSupplierAccessScore(PfSupplierAccessScore[] arr){
		for(PfSupplierAccessScore obj:arr){
			pfSupplierAccessScoreMapper.deletePfSupplierAccessScore(obj);
		}
	}
	
	public void deletePfSupplierAccessScoreForCompanyId(Map<String,Object> params){
		pfSupplierAccessScoreMapper.deletePfSupplierAccessScoreForCompanyId(params);
	}
	public List<PfSupplierAccessScoreDetails> getPfSupplierAccessScoreDetailsList(Map<String,Object> params){
		return pfSupplierAccessScoreMapper.getPfSupplierAccessScoreDetailsList(params);
	}
	
	/**
	 * 获取13项认证的数据
	*getPfSupplierAccessScoreSummaryList
	*@param params
	*@return
	*List<PfSupplierAccessScoreSummary>
	*@modifier mishengliang
	*2016-5-27下午1:52:59
	 */
	public List<PfSupplierAccessScoreSummary> getPfSupplierAccessScoreSummaryList(Map<String,Object> params){
		return pfSupplierAccessScoreMapper.getPfSupplierAccessScoreSummaryList(params);
	}
	
}
