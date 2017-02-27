package platform.company.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.outsideasy.ws.erp.supplier.vo.InvoiceTitleOut;

import platform.company.data.PfInvoiceTitleMapper;

@Service
public class PfInvoiceTitleService {

	@Autowired
	private PfInvoiceTitleMapper pfInvoiceTitleMapper;
	
	public List<InvoiceTitleOut> getInvoiceTitleOutList(Map<String,Object> params){
		return pfInvoiceTitleMapper.getInvoiceTitleOutList(params);
	}
	
	/**
	 * 通过公司ID获取发票抬头
	 *getInvoiceTitleNames
	 *@param companyId
	 *@return
	 *List<String>
	 *@author mishengliang
	 *2016-4-5下午4:30:02
	 */
	public List<String> getInvoiceTitleNames(Integer companyId){
		return pfInvoiceTitleMapper.getInvoiceTitleNames(companyId);
	}
	public List<Map<String, Object>> getInvoiceTitleNamesMap(Map<String, Object> params){
		return pfInvoiceTitleMapper.getInvoiceTitleNamesMap(params);
	}
	
	/**
	 * 删除指定发票抬头
	*deleteInvoiceTitle
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午7:14:00
	 */
	public void deleteInvoiceTitle(Map<String, Object> params){
		pfInvoiceTitleMapper.deleteInvoiceTitle(params);
	}
	
	/**
	 * 通过抬头ID更新发票抬头
	*updateInvoiceTitleByTitleId
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午7:14:05
	 */
	public void updateInvoiceTitleByTitleId(Map<String, Object> params){
		pfInvoiceTitleMapper.updateInvoiceTitleByTitleId(params);
	}
	
	/**
	 * 增加发票抬头
	*addInvoiceTitle
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午7:14:10
	 */
	public void addInvoiceTitle(Map<String, Object> params){
		pfInvoiceTitleMapper.addInvoiceTitle(params);
	}
	
	/**
	 * 判断数据操作，并执行
	*addOrUpdateInvoiceTilteCluster
	*@param invoiceTilteInfo
	*@param companyId
	*@throws Exception
	*void
	*@author mishengliang
	*@modifier mishengliang
	*2016-6-16下午2:58:14
	 */
	@SuppressWarnings("unchecked")
	public void addOrUpdateInvoiceTilteCluster(String invoiceTilteInfo,Integer companyId) throws Exception{
		//java json字符创解析为json对象
		invoiceTilteInfo = "["+ invoiceTilteInfo +"]";
		JSONArray invoiceArray = JSONArray.fromObject(invoiceTilteInfo);
		
		for(int i = 0; i<invoiceArray.size(); i++){
			Map<String, Object> addParams = new HashMap<String, Object>();//新增的数据集合
			JSONObject invoiceJsonObject = invoiceArray.getJSONObject(i); 
			if("".equals(invoiceJsonObject.get("invoiceTitleName").toString())){
				if(!"-1".equals(invoiceJsonObject.get("invoiceTitleId").toString())){//原有的记录，置为空的情况下，则将此条记录删除
					deleteInvoiceTitle(invoiceJsonObject);
				}
			}else if("-1".equals(invoiceJsonObject.get("invoiceTitleId").toString())){
				addParams = invoiceJsonObject;//将数据添加到map中  JSONObject为实现了Map接口，所以直接上转型赋值即可
				addParams.put("companyId", companyId);
				addInvoiceTitle(addParams);
			}else{
				updateInvoiceTitleByTitleId(invoiceJsonObject);
			}
			
		}
	}
	
	
	/**重置默认标记
	 * yukai
	 * @param params
	 */
	public void resetDefaultId(Map<String, Object> params){
		pfInvoiceTitleMapper.resetDefaultId(params);
	}

	public void deleteInvoiceTitles(Map<String, Object> params) {
		String arrayStr=params.get("invoice_title_ids").toString();
		String[] arrayinvoice_title_id=arrayStr.split(",");
		for(int i=0;i<arrayinvoice_title_id.length;i++){
			params.put("invoiceTitleId", arrayinvoice_title_id[i]);
			pfInvoiceTitleMapper.deleteInvoiceTitle(params);
		}
	}
}
