package manager.enquiryQuote.enquiry.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import manager.enquiryQuote.enquiry.data.EnquiryMapper;
import manager.enquiryQuote.enquiry.model.Enquiry;
import manager.enquiryQuote.enquiry.model.EnquiryDetail;
import manager.enquiryQuote.enquiry.model.EnquiryDistribution;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



/**
 * @author Administrator
 *
 */
@Service
public class EnquiryService {
	@Autowired
	private EnquiryMapper mapper;


	public List<Enquiry> getEnquiryList(Map<String,Object> params) {
		return mapper.getEnquiryList(params);
	}
	public List<Enquiry> getEnquiryListForSupplier(Map<String,Object> params) {
		return mapper.getEnquiryListForSupplier(params);
	}
	@Transactional
	public void addEnquiry(Enquiry[] arr) {
		for(Enquiry obj: arr) {
			mapper.addEnquiry(obj);
		}
	}
	@Transactional
	public void updateEnquiry(Enquiry[] arr) {
		for(Enquiry obj: arr) {
			mapper.updateEnquiry(obj);
		}
	}
	@Transactional
	public void deleteEnquiry(Enquiry[] arr) {
		for(Enquiry obj: arr) {
			mapper.deleteEnquiry(obj);
			Map<String,Object> params=new HashMap<String,Object>();
			params.put("enquiry_id", obj.getEnquiry_id());
			mapper.deleteEnquiryDetailByEnquiry_id(params);
		}
	}
	
	public List<EnquiryDetail> getEnquiryDetailList(Map<String,Object> params) {
		return mapper.getEnquiryDetailList(params);
	}
	@Transactional
	public void addEnquiryDetail(EnquiryDetail[] arr) {
		for(EnquiryDetail obj: arr) {
			mapper.addEnquiryDetail(obj);
		}
	}
	@Transactional
	public void updateEnquiryDetail(EnquiryDetail[] arr) {
		for(EnquiryDetail obj: arr) {
			mapper.updateEnquiryDetail(obj);
		}
	}
	@Transactional
	public void deleteEnquiryDetail(EnquiryDetail[] arr) {
		for(EnquiryDetail obj: arr) {
			mapper.deleteEnquiryDetail(obj);
		}
	}
	
	/**
	* @Description: 检测状态位的一致
	* @param idarray statusarray
	* @return 0 不通过；1通过
	* @author xufeng
	* @date 2015-11-10 
	*/
	public String checkStatusSame(Map<String,Object> params){
		JSONObject json = new JSONObject();
		String idarrayString=params.get("idarray").toString();
		String statusarrayString=params.get("statusarray").toString();
		String[] idarray= idarrayString.split(",");
		String[] statusarray= statusarrayString.split(",");
		int result=1;
		for(int i=0;i<idarray.length;i++){
			params.put("enquiry_id",idarray[i]);
			params.put("enquiry_status", statusarray[i]);
			int count=mapper.checkStatusSame(params);
			if(count==0){
				result=0;
				break;
			}
		}
		json.put("result", result);
		json.put("success", true);
		return json.toString();
	}
	public void updateStatus(Map<String,Object> params){
		String idarrayString=params.get("idarray").toString();
		String[] idarray= idarrayString.split(",");
		for(int i=0;i<idarray.length;i++){
			params.put("enquiry_id", idarray[i]);
			mapper.updateStatus(params);
		}
		
	}
	public List<EnquiryDistribution> getEnquiryDistributionList(Map<String,Object> params) {
		return mapper.getEnquiryDistributionList(params);
	}
	@Transactional
	public void addEnquiryDistribution(EnquiryDistribution[] arr) {
		for(EnquiryDistribution obj: arr) {
			mapper.addEnquiryDistribution(obj);
		}
	}
	@Transactional
	public void updateEnquiryDistribution(EnquiryDistribution[] arr) {
		for(EnquiryDistribution obj: arr) {
			mapper.updateEnquiryDistribution(obj);
		}
	}
	@Transactional
	public void deleteEnquiryDistribution(EnquiryDistribution[] arr) {
		for(EnquiryDistribution obj: arr) {
			mapper.deleteEnquiryDistribution(obj);
		}
	}
	public int getEnquiryCount(Map<String,Object> params) {
		return mapper.getEnquiryCount(params);
	}
	public EnquiryDetail getFilePathByPathAndId(Integer enquiry_detail_id){
		Map<String,Object> params=new HashMap<String,Object>();
		params.put("enquiry_detail_id", enquiry_detail_id);
		List<EnquiryDetail> list=getEnquiryDetailList(params);
		return list.get(0);
	}
}
