package manager.supplier.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.AccessApplicationAttched;

import manager.supplier.model.Attched;
//import manager.supplier.model.FileType;


public interface AttchedMapper {
	public List<Attched> getAttchedList(Map<String,Object> params);
	public List<Attched> getAttchedList1(Map<String,Object> params);
	public void addAttched(Attched obj);
	public void updateAttched(Attched obj);
	public void deleteAttched(Attched obj);
	//public List<FileType> getFileTypeList(Map<String,Object> params);
	public void addAttched1(Map<String, Object> params);
	public List<AccessApplicationAttched> getSupplierFileAttchedList(
			Map<String, Object> params);
	public void updateAttched1(Map<String, Object> params);
}
