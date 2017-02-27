package manager.enquiryQuote.quote.service;

import java.util.List;
import java.util.Map;

import manager.enquiryQuote.quote.data.QuotationMapper;
import manager.enquiryQuote.quote.model.Quotation;
import manager.enquiryQuote.quote.model.QuotationDetail;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
public class QuotationService {
	@Autowired
	private QuotationMapper mapper;


	public List<Quotation> getQuotationList(Map<String,Object> params) {
		return mapper.getQuotationList(params);
	}
	@Transactional
	public void addQuotation(Quotation[] arr) {
		for(Quotation obj: arr) {
			mapper.addQuotation(obj);
		}
	}
	@Transactional
	public void updateQuotation(Quotation[] arr) {
		for(Quotation obj: arr) {
			mapper.updateQuotation(obj);
		}
	}
	@Transactional
	public void deleteQuotation(Quotation[] arr) {
		for(Quotation obj: arr) {
			mapper.deleteQuotation(obj);
		}
	}
	
	public List<QuotationDetail> getQuotationDetailList(Map<String,Object> params) {
		return mapper.getQuotationDetailList(params);
	}
	@Transactional
	public void addQuotationDetail(QuotationDetail[] arr) {
		for(QuotationDetail obj: arr) {
			mapper.addQuotationDetail(obj);
		}
	}
	@Transactional
	public void updateQuotationDetail(QuotationDetail[] arr) {
		for(QuotationDetail obj: arr) {
			mapper.updateQuotationDetail(obj);
		}
	}
	@Transactional
	public void deleteQuotationDetail(QuotationDetail[] arr) {
		for(QuotationDetail obj: arr) {
			mapper.deleteQuotationDetail(obj);
		}
	}
	/**
	* @Description: 检测状态位的一致
	* @param quotation_id
			status
	* @return 0 不通过；1通过
	* @author xufeng
	* @date 2015-11-17 
	*/
	public String checkStatusSame(Map<String,Object> params){
		JSONObject json = new JSONObject();
		int count=mapper.checkStatusSame(params);
		json.put("result", count);
		json.put("success", true);
		return json.toString();
	}
	/**
	* @Description: 检查是否有报价记录
	* @param idarray 
	* @return result是有报价记录的enquiry_id，若result=0，说明都没有报价记录
	* @author xufeng
	* @date 2015-12-17
	*/
	public String hasQuote(Map<String,Object> params){
		JSONObject json = new JSONObject();
		String idarrayString=params.get("idarray").toString();
		String[] idarray= idarrayString.split(",");
		int result=0;
		for(int i=0;i<idarray.length;i++){
			params.put("enquiry_id",idarray[i]);
			int count=mapper.hasQuote(params);
			if(count>0){
				result=Integer.valueOf(idarray[i]);
				break;
			}
		}
		json.put("result", result);
		json.put("success", true);
		return json.toString();
	}
}
