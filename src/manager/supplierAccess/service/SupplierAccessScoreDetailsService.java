package manager.supplierAccess.service;

import java.util.List;
import java.util.Map;

import manager.supplierAccess.data.SupplierAccessScoreDetailsMapper;
import manager.supplierAccess.model.SupplierAccessScoreDetails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class SupplierAccessScoreDetailsService {
	@Autowired
	private SupplierAccessScoreDetailsMapper mapper;


	public List<SupplierAccessScoreDetails> getSupplierAccessScoreDetailsList(Map<String,Object> params) {
		return mapper.getSupplierAccessScoreDetailsList(params);
	}
	
}
