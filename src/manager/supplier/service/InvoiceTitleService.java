package manager.supplier.service;

import java.util.List;
import java.util.Map;

import manager.supplier.data.InvoiceTitleMapper;
import manager.supplier.model.Goods;
import manager.supplier.model.InvoiceTitle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import usercenter.saleManage.data.AccessInvoiceTitleMapper;
import usercenter.saleManage.model.AccessInvoiceTitle;
import util.BeanUtil;



@Service
public class InvoiceTitleService {
	@Autowired
	private InvoiceTitleMapper mapper;
	@Autowired
	private AccessInvoiceTitleMapper accMapper;

	public List<InvoiceTitle> getInvoiceTitleList(Map<String,Object> params) {
		return mapper.getInvoiceTitleList(params);
	}
	public List<AccessInvoiceTitle> getAccInvoiceTitleList(Map<String,Object> params) {
		return accMapper.getAccessInvoiceTitleList(params);
	}
	@Transactional
	public void addInvoiceTitle(InvoiceTitle[] arr) {
		for(InvoiceTitle obj: arr) {
			mapper.addInvoiceTitle(obj);
		}
	}
	@Transactional
	public void updateInvoiceTitle(InvoiceTitle[] arr) {
		for(InvoiceTitle obj: arr) {
			mapper.updateInvoiceTitle(obj);
		}
	}
	@Transactional
	public void deleteInvoiceTitle(InvoiceTitle[] arr) {
		for(InvoiceTitle obj: arr) {
			mapper.deleteInvoiceTitle(obj);
		}
	}
	public void addAccInvoiceTitle(Map<String,Object> params) throws Exception{
		if(Boolean.parseBoolean(params.get("isSync").toString())){
			InvoiceTitle item=(InvoiceTitle)BeanUtil.mapToObject(params,InvoiceTitle.class);
			item.setCompany_id(Integer.parseInt(params.get("company_id").toString()));
			mapper.addInvoiceTitle(item);
			params.put("app_invoice_title_id", item.getInvoice_title_id());
		}
		accMapper.addAccessInvoiceTitle(params);
	}
	public void updateAccInvoiceTitle(Map<String,Object> params) throws Exception{
		if(Boolean.parseBoolean(params.get("isSync").toString())){
			InvoiceTitle item=(InvoiceTitle)BeanUtil.mapToObject(params,InvoiceTitle.class);
			item.setInvoice_title_id(Integer.parseInt(params.get("app_invoice_title_id").toString()));
			mapper.updateInvoiceTitle(item);
		}
		accMapper.updateAccessInvoiceTitle(params);
	}
}
