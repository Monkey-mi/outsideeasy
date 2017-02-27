package platform.company.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.company.data.PfSupplierMaterialcheckMapper;
import platform.company.model.PfSupplierMaterialcheck;


@Service
public class PfSupplierMaterialcheckService {
	@Autowired
	private PfSupplierMaterialcheckMapper mapper;


	public List<PfSupplierMaterialcheck> getPfSupplierMaterialcheckList(Map<String,Object> params) {
		return mapper.getPfSupplierMaterialcheckList(params);
	}
	public void addPfSupplierMaterialcheck(PfSupplierMaterialcheck obj) {
			mapper.addPfSupplierMaterialcheck(obj);
	}
	public void addPfSupplierMaterialcheck(PfSupplierMaterialcheck[] arr) {
		for(PfSupplierMaterialcheck obj: arr) {
			mapper.addPfSupplierMaterialcheck(obj);
		}
	}
	public void updatePfSupplierMaterialcheck(PfSupplierMaterialcheck[] arr) {
		for(PfSupplierMaterialcheck obj: arr) {
			mapper.updatePfSupplierMaterialcheck(obj);
		}
	}
	public void deletePfSupplierMaterialcheck(PfSupplierMaterialcheck[] arr) {
		for(PfSupplierMaterialcheck obj: arr) {
			mapper.deletePfSupplierMaterialcheck(obj);
		}
	}
}
