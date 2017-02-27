package manager.supplierAccess.data;

import java.util.List;
import java.util.Map;

import manager.supplierAccess.model.SupplierAccessUploadImg;



public interface SupplierAccessUploadImgMapper {
	public List<SupplierAccessUploadImg> getSupplierAccessUploadImgList(Map<String,Object> params);
	public void addSupplierAccessUploadImg(SupplierAccessUploadImg obj);
	public void updateSupplierAccessUploadImg(SupplierAccessUploadImg obj);
	public void deleteSupplierAccessUploadImg(SupplierAccessUploadImg obj);
}
