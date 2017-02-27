package manager.supplier.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.supplier.data.MngSupplierMaterialcheckMapper;
import manager.supplier.model.MngSupplierMaterialcheck;


@Service
public class MngSupplierMaterialcheckService {
	@Autowired
	private MngSupplierMaterialcheckMapper mapper;


	public List<MngSupplierMaterialcheck> getMngSupplierMaterialcheckList(Map<String,Object> params) {
		return mapper.getMngSupplierMaterialcheckList(params);
	}
	public void addMngSupplierMaterialcheck(MngSupplierMaterialcheck[] arr) {
		for(MngSupplierMaterialcheck obj: arr) {
			mapper.addMngSupplierMaterialcheck(obj);
		}
	}
	public void updateMngSupplierMaterialcheck(MngSupplierMaterialcheck[] arr) {
		for(MngSupplierMaterialcheck obj: arr) {
			mapper.updateMngSupplierMaterialcheck(obj);
		}
	}
	public void deleteMngSupplierMaterialcheck(MngSupplierMaterialcheck[] arr) {
		for(MngSupplierMaterialcheck obj: arr) {
			mapper.deleteMngSupplierMaterialcheck(obj);
		}
	}
}
