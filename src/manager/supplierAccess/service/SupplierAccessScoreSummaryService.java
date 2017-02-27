package manager.supplierAccess.service;

import java.util.List;
import java.util.Map;

import manager.supplierAccess.data.SupplierAccessScoreSummaryMapper;
import manager.supplierAccess.model.SupplierAccessScoreSummary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class SupplierAccessScoreSummaryService{
	@Autowired
	private SupplierAccessScoreSummaryMapper mapper;
	public List<SupplierAccessScoreSummary> getSupplierAccessScoreList(Map<String,Object> params) {
		return mapper.getSupplierAccessScoreSummaryList(params);
	}
}