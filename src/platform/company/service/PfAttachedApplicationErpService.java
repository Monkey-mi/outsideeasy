/**  
* @Title: PfAttachedApplicationErpService.java
* @Package platform.company.service
* @Description: TODO
* @author 舒飞
* @date 2016-8-25 上午9:35:19 
*/ 
package platform.company.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.outsideasy.ws.erp.supplier.vo.BankAccountOut;
import com.outsideasy.ws.erp.supplier.vo.CompetitorOut;
import com.outsideasy.ws.erp.supplier.vo.DeviceOut;
import com.outsideasy.ws.erp.supplier.vo.GoodsOut;
import com.outsideasy.ws.erp.supplier.vo.InvoiceTitleOut;
import com.outsideasy.ws.erp.supplier.vo.MainCustomerOut;
import com.outsideasy.ws.erp.supplier.vo.MetarialOut;

import platform.company.data.PfApplicationInfoFromErpMapper;
import platform.company.data.PfBankAccountFromErpMapper;
import platform.company.data.PfCompetitorFromErpMapper;
import platform.company.data.PfDevicelistFromErpMapper;
import platform.company.data.PfGoodsFromErpMapper;
import platform.company.data.PfInvoiceTitleFromErpMapper;
import platform.company.data.PfMainCustomerFromErpMapper;
import platform.company.data.PfMetarialFromErpMapper;

import usercenter.saleManage.model.AccessApplicationInfo;

@Service
public class PfAttachedApplicationErpService {
	@Autowired
	private PfInvoiceTitleFromErpMapper fInvoiceTitleFromErpMapper;
	@Autowired
	private PfBankAccountFromErpMapper pfBankAccountFromErpMapper;
	@Autowired
	private PfCompetitorFromErpMapper pfCompetitorFromErpMapper;
	@Autowired
	private PfDevicelistFromErpMapper pfDevicelistFromErpMapper;
	@Autowired
	private PfMetarialFromErpMapper pfMetarialFromErpMapper;
	@Autowired
	private PfMainCustomerFromErpMapper pfMainCustomerFromErp;
	@Autowired
	private PfGoodsFromErpMapper pfGoodsFromErpMapper;
	@Autowired
	private PfApplicationInfoFromErpMapper pfApplicationInfoFromErpMapper;
	
	public void updateAccessApplicationInfo(AccessApplicationInfo obj){
		pfApplicationInfoFromErpMapper.updateAccessApplicationInfoFromErp(obj);
	}
	public Integer getEID(Map<String,Object> params){
		return pfApplicationInfoFromErpMapper.getEID(params);
	}
	//发票抬头
	public void updateInvoiceTitleFromCRM(Map<String,Object> params){
		fInvoiceTitleFromErpMapper.updateInvoiceTitleFromErp(params);
	}
	public void addInvoiceTitleFromCRM(InvoiceTitleOut obj){
		fInvoiceTitleFromErpMapper.addInvoiceTitleFromErp(obj);
	}
	public void deleteInvoiceTitleFromCRM(Map<String,Object> params){
		fInvoiceTitleFromErpMapper.deleteInvoiceTitleFromErp(params);
	}
	//公司银行账号
	public void updateBankAccountFromCRM(Map<String,Object> params){
		pfBankAccountFromErpMapper.updateBankAccountFromERP(params);
	}
	public void addBankAccountFromCRM(BankAccountOut obj){
		pfBankAccountFromErpMapper.addBankAccountFromERP(obj);
	}
	public void deleteBankAccountFromCRM(Map<String,Object> params){
		pfBankAccountFromErpMapper.deleteBankAccountFromERP(params);
	}
	//竞争
	public void updateCompetitorFromCRM(Map<String,Object> params){
		pfCompetitorFromErpMapper.updateCompetitorFromERP(params);
	}
	public void addCompetitorFromCRM(CompetitorOut obj){
		pfCompetitorFromErpMapper.addCompetitorFromERP(obj);
	}
	public void deleteCompetitorFromCRM(Map<String,Object> params){
		pfCompetitorFromErpMapper.deleteCompetitorFromERP(params);
	}
	//设备
	public void updateDevicelistFromCRM(Map<String,Object> params){
		pfDevicelistFromErpMapper.updateDevicelistFromERP(params);
	}
	//TODO
	public void addDevicelistFromCRM(DeviceOut obj){
		pfDevicelistFromErpMapper.addDevicelistFromERP(obj);
	}
	public void deleteDevicelistFromCRM(Map<String,Object> params){
		pfDevicelistFromErpMapper.deleteDevicelistFromERP(params);
	}
	//材料
	public void updateMetarialFromCRM(Map<String,Object> params){
		pfMetarialFromErpMapper.updateMetarialFromERP(params);
	}
	public void addMetarialFromCRM(MetarialOut obj){
		pfMetarialFromErpMapper.addMetarialFromERP(obj);
	}
	public void deleteMetarialFromCRM(Map<String,Object> params){
		pfMetarialFromErpMapper.deleteMetarialFromERP(params);
	}
	//主要客户
	public void updateMainCustomerFromCRM(Map<String,Object> params){
		pfMainCustomerFromErp.updateMainCustomerFromERP(params);
	}
	public void addMainCustomerFromCRM(MainCustomerOut obj){
		pfMainCustomerFromErp.addMainCustomerFroERP(obj);
	}
	public void deleteMainCustomerFromCRM(Map<String,Object> params){
		pfMainCustomerFromErp.deleteMainCustomerFromERP(params);
	}
	//产品及品牌

	public void updateGoodsFromCRM(Map<String,Object> params){
		pfGoodsFromErpMapper.updateGoodsFromERP(params);
	}
	public void addGoodsFromCRM(GoodsOut obj){
		pfGoodsFromErpMapper.addGoodsFromERP(obj);
	}
	public void deleteGoodsFromCRM(Map<String,Object> params){
		pfGoodsFromErpMapper.deleteGoodsFromERP(params);
	}
	
	public void  AppInfoUtil(int record_id,Map<String,Object> params){     
		Map<String,Object> para = new HashMap<String, Object>();
		Iterator<Map.Entry<String, Object>> it = params.entrySet().iterator();
		AccessApplicationInfo mngAccessApplicationInfo = null;
		while (it.hasNext()) {
			   Map.Entry<String, Object> entry = it.next();
			   para.put("related_basis", entry.getKey());
			   para.put("record_id", record_id);
			   if("cpyname_cn".equals(entry.getKey())){
				   para.put("related_basis", "cpyname_cn1");				   
			   }
			   //获取e_id
			   Integer e_ids = pfApplicationInfoFromErpMapper.getEID(para);
			   if(e_ids != null){
				   int e_id = e_ids.intValue();
				   mngAccessApplicationInfo = new AccessApplicationInfo();
				   mngAccessApplicationInfo.setRecord_id(record_id);
				   mngAccessApplicationInfo.setE_id(e_id);
				   mngAccessApplicationInfo.setContent(entry.getValue().toString());
				   pfApplicationInfoFromErpMapper.updateAccessApplicationInfoFromErp(mngAccessApplicationInfo);
			   }
		}				
	}

}
