package manager.enquiryQuote.enquiry.data;

import java.util.List;
import java.util.Map;

import manager.enquiryQuote.enquiry.model.Enquiry;
import manager.enquiryQuote.enquiry.model.EnquiryDetail;
import manager.enquiryQuote.enquiry.model.EnquiryDistribution;



public interface EnquiryMapper {
	public List<Enquiry> getEnquiryList(Map<String,Object> params);
	public List<Enquiry> getEnquiryListForSupplier(Map<String,Object> params);
	public void addEnquiry(Enquiry obj);
	public void updateEnquiry(Enquiry obj);
	public void deleteEnquiry(Enquiry obj);
	
	public List<EnquiryDetail> getEnquiryDetailList(Map<String,Object> params);
	public void addEnquiryDetail(EnquiryDetail obj);
	public void updateEnquiryDetail(EnquiryDetail obj);
	public void deleteEnquiryDetail(EnquiryDetail obj);
	
	void deleteEnquiryDetailByEnquiry_id(Map<String,Object> params);
	int checkStatusSame(Map<String,Object> params);
	void updateStatus(Map<String,Object> params);
	
	public List<EnquiryDistribution> getEnquiryDistributionList(Map<String,Object> params);
	public void addEnquiryDistribution(EnquiryDistribution obj);
	public void updateEnquiryDistribution(EnquiryDistribution obj);
	public void deleteEnquiryDistribution(EnquiryDistribution obj);
	int getEnquiryCount(Map<String,Object> params);
}
