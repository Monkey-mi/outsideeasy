package platform.company.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.CustomerFiles;

import com.outsideasy.ws.erp.supplier.vo.SupplierFileIn;
import com.outsideasy.ws.erp.supplier.vo.SupplierFileOut;

public interface PfCompanyInfoMapper {
	public List<SupplierFileOut> getSupplierFileOutList(Map<String, Object> params);
	public List<SupplierFileOut> getAccessApplicationRecord(Map<String, Object> params);
	//获取供应商信息
	public List<CustomerFiles> getPfCustomerFilesList(Map<String, Object> params);
	void updateSupplierFileByWS(SupplierFileIn obj);
	
	void updateSupplierFileStateByWS(Map<String, Object> params);
	void updateAccessApplicationRecord(Map<String, Object> params);
	void updateSuppliersInfo(Map<String, Object> params);
	void addPfAdmittanceAudit(Map<String, Object> params);
}
