package manager.enquiryQuote.quote.data;

import java.util.List;
import java.util.Map;

import manager.enquiryQuote.quote.model.Quotation;
import manager.enquiryQuote.quote.model.QuotationDetail;


public interface QuotationMapper {

	public List<Quotation> getQuotationList(Map<String,Object> params);
	public void addQuotation(Quotation obj);
	public void updateQuotation(Quotation obj);
	public void deleteQuotation(Quotation obj);
	
	public List<QuotationDetail> getQuotationDetailList(Map<String,Object> params);
	public void addQuotationDetail(QuotationDetail obj);
	public void updateQuotationDetail(QuotationDetail obj);
	public void deleteQuotationDetail(QuotationDetail obj);
	int checkStatusSame(Map<String,Object> params);
	int hasQuote(Map<String,Object> params);
}
