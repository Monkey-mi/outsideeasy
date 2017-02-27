package manager.supplier.service;

import java.util.List;
import java.util.Map;

import manager.supplier.data.SupplierMaterialSub1Mapper;
import manager.supplier.model.SupplierMaterialSub1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class SupplierMaterialSub1Service {
	@Autowired
	private SupplierMaterialSub1Mapper mapper;


	public List<SupplierMaterialSub1> getSupplierMaterialSub1List(Map<String,Object> params) {
		return mapper.getSupplierMaterialSub1List(params);
	}
	public void addSupplierMaterialSub1(SupplierMaterialSub1[] arr) {
		for(SupplierMaterialSub1 obj: arr) {
			mapper.addSupplierMaterialSub1(obj);
		}
	}
	public void updateSupplierMaterialSub1(SupplierMaterialSub1[] arr) {
		for(SupplierMaterialSub1 obj: arr) {
			mapper.updateSupplierMaterialSub1(obj);
		}
	}
	public void deleteSupplierMaterialSub1(SupplierMaterialSub1[] arr) {
		for(SupplierMaterialSub1 obj: arr) {
			mapper.deleteSupplierMaterialSub1(obj);
		}
	}
}
