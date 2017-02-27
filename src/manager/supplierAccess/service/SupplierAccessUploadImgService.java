package manager.supplierAccess.service;

import java.util.List;
import java.util.Map;

import manager.supplierAccess.data.SupplierAccessUploadImgMapper;
import manager.supplierAccess.model.SupplierAccessUploadImg;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class SupplierAccessUploadImgService {
	@Autowired
	private SupplierAccessUploadImgMapper mapper;


	public List<SupplierAccessUploadImg> getSupplierAccessUploadImgList(Map<String,Object> params) {
		return mapper.getSupplierAccessUploadImgList(params);
	}
	public void addSupplierAccessUploadImg(SupplierAccessUploadImg[] arr) {
		for(SupplierAccessUploadImg obj: arr) {
			mapper.addSupplierAccessUploadImg(obj);
		}
	}
	public void updateSupplierAccessUploadImg(SupplierAccessUploadImg[] arr) {
		for(SupplierAccessUploadImg obj: arr) {
			mapper.updateSupplierAccessUploadImg(obj);
		}
	}
	public void deleteSupplierAccessUploadImg(SupplierAccessUploadImg[] arr) {
		for(SupplierAccessUploadImg obj: arr) {
			mapper.deleteSupplierAccessUploadImg(obj);
		}
	}
}
