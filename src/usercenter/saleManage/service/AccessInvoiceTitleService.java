package usercenter.saleManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.data.AccessInvoiceTitleMapper;
import usercenter.saleManage.model.AccessInvoiceTitle;
@Service
public class AccessInvoiceTitleService {
	@Autowired
	private AccessInvoiceTitleMapper mapper;
	
	public List<AccessInvoiceTitle> getAccessInvoiceTitleList(Map<String, Object>params) {
		return mapper.getAccessInvoiceTitleList(params);
	}
	public void addAccessInvoiceTitle(Map<String, Object>params){
		mapper.addAccessInvoiceTitle(params);
	}
	public void deleteAccessInvoiceTitle(Map<String, Object>params){
		mapper.deleteAccessInvoiceTitle(params);
	}
	public void deleteAccessInvoiceTitleByRI(Map<String, Object>params){
		mapper.deleteAccessInvoiceTitleByRI(params);
	}
	public void deleteAccessInvoiceTitles(Map<String, Object>params){
		String arrayStr=params.get("invoice_title_ids").toString();
		String[] arrayinvoice_title_id=arrayStr.split(",");
		for(int i=0;i<arrayinvoice_title_id.length;i++){
			params.put("invoice_title_id", arrayinvoice_title_id[i]);
			mapper.deleteAccessInvoiceTitle(params);
		}
	}
	
	@SuppressWarnings("unchecked")
	public void addInvoiceInfos(HttpServletRequest request) {
		Map<String, Object> params = new HashMap<String, Object>();
		Integer recordId = Integer.parseInt(request.getParameter("recordId"));
		Integer supplierId = Integer.parseInt(request.getParameter("supplierId"));
		String invoiceInfos= request.getParameter("invoiceInfos");
		JSONArray infosArray = JSONArray.fromObject(invoiceInfos);
		params.put("record_id", recordId);
		deleteAccessInvoiceTitleByRI(params);
		for (int i = 0; i < infosArray.size(); i++) {
			params = infosArray.getJSONObject(i);
			params.put("app_invoice_title_id", null);
			params.put("invoice_title_sts", 0);
			params.put("default_id", 0);
			params.put("record_id", recordId);
			params.put("supplier_id", supplierId);
			addAccessInvoiceTitle(params);
		}
	}
}
