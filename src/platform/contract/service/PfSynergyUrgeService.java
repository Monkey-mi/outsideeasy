package platform.contract.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.outsideasy.ws.common.vo.CXFResponse;


import platform.basicdata.user.data.PfRegAccoutMapper;
import platform.contract.data.PfSynergyUrgeMapper;
import platform.contract.model.PfOrderCheckDetails;
import platform.contract.model.PfOrderDeliveryNotice;
import platform.contract.model.PfOrderDeliveryNoticedetails;
import platform.contract.model.PfOrderQualitycheck;
import platform.contract.model.PfPurchaseOrderDetails;
import platform.contract.model.PfSynergyUrge;
import usercenter.subAccount.model.SubAccount;
import util.MyJsonUtil;
import util.SysSerialId;


@Service
public class PfSynergyUrgeService {
	@Autowired
	private PfSynergyUrgeMapper mapper;
	@Autowired
	private PfRegAccoutMapper pfRegAccoutMapper;
	/**
	 * @Description:新增质检
	 * @param params PfOrderCheckDetails obj
	 * @author wuqia
	 * 2016-8-26
	 */
	public void addPfOrderQualitycheck(PfOrderQualitycheck obj) {
			mapper.addPfOrderQualitycheck(obj);
	}
	/**
	 * @Description:新增质检明细
	 * @param params PfOrderCheckDetails obj
	 * @author wuqia
	 * 2016-8-26
	 */
	public void addPfOrderCheckDetails(PfOrderCheckDetails obj) {
			mapper.addPfOrderCheckDetails(obj);
	}
	/**
	 * @Description:修改订单明细
	 * @param params PfPurchaseOrderDetails obj
	 * @author wuqia
	 * 2016-8-25 
	 */
	public void updatePfOrderDetailSync(PfPurchaseOrderDetails obj) {
		mapper.updatePfOrderDetailSync(obj);
	}
	/**
	 * @Description:修改通知单
	 * @param params map
	 * @author wuqia
	 * 2016-8-25 
	 */
	public void updatePfOrderDeliveryNotice(Map<String,Object> params) {
		mapper.updatePfOrderDeliveryNotice(params);
	}
	/**
	 * @Description:获取通知单
	 * @param params map
	 * @author wuqia
	 * 2016-8-25 
	 */
	public List<PfOrderDeliveryNotice> getOrderDeliveryNoticeList(Map<String,Object> params) {
		return mapper.getPfOrderDeliveryNoticeList(params);
	}
	/**
	 * @Description:获取通知单明细
	 * @param params map
	 * @author wuqia
	 * 2016-8-25 
	 */
	public List<PfOrderDeliveryNoticedetails> getPfOrderDeliveryNoticedetailsList(Map<String,Object> params) {
		return mapper.getPfOrderDeliveryNoticedetailsList(params);
	}
	public List<PfOrderDeliveryNotice> getPfSup_company_idAndSupplier_idList(Map<String,Object> params){
		return mapper.getPfSup_company_idAndSupplier_idList(params);
	}
	/**
	 * @Description:新增发货通知单
	 * @param params map
	 * @author wuqia
	 * 2016-8-25 
	 */
	@Transactional
	public String addPfSynergyUrge(String jsonmap) {
		Map<String,Object> json=new HashMap<String, Object>();
		json.put("bool", true);
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		if(params.get("login_id")==null){
			json.put("msg", "login_id 参数缺失！！！");
			json.put("bool", false);
			return MyJsonUtil.obj2string(json);
		}
		String login_id=params.get("login_id").toString();
		if(params.get("recs")==null){
			json.put("msg", "recs 参数缺失！！！");
			json.put("bool", false);
			return MyJsonUtil.obj2string(json);
		}
		if(params.get("record_id")==null){
			json.put("msg", "record_id 参数缺失！！！");
			json.put("bool", false);
			return MyJsonUtil.obj2string(json);
		}
		String record_id=params.get("record_id").toString();
		//通过准入帐号获取供方id和供方档案id
		int sup_company_id,supplier_id;
		
		if(params.get("pur_company_id")==null){
			json.put("msg", "pur_company_id 参数缺失！！！");
			json.put("bool", false);
			return MyJsonUtil.obj2string(json);
		}
		String pur_company_id=params.get("pur_company_id").toString();
		params.put("record_id", record_id);
		List<PfOrderDeliveryNotice> podnList = mapper.getPfSup_company_idAndSupplier_idList(params);
		if(podnList.size()==0){
			json.put("msg", "供应商企业id 获取失败！！！");
			json.put("bool", false);
			return MyJsonUtil.obj2string(json);
		}
		String recsStr=params.get("recs").toString();
		List<PfSynergyUrge> suList=MyJsonUtil.str2list(recsStr, PfSynergyUrge.class);
		//获取子账户名
		params.put("sa_id", login_id);
		List<SubAccount> saList=pfRegAccoutMapper.getPfRegAccoutList(params);
		if(saList.size()==0){
			json.put("msg", "该账户在平台中不存在！");
			json.put("bool", false);
			return MyJsonUtil.obj2string(json);
		}
		String auditor_name=saList.get(0).getUsername();
		//1、新增通知单
		if(suList.size()>0){
			PfOrderDeliveryNotice odn=podnList.get(0);
			odn.setCreator_id(Integer.valueOf(login_id));
			odn.setCreator_name(auditor_name);
			odn.setSource_type(0);
			odn.setNotice_status(0);
			odn.setPur_company_id(Integer.valueOf(pur_company_id));
			odn.setDelivery_notice_bh(SysSerialId.getNewNextSerialIdPJQ());
			mapper.addPfOrderDeliveryNotice(odn);
			//新增通知明细
			for(PfSynergyUrge ys:suList){
				PfOrderDeliveryNoticedetails odnd=new PfOrderDeliveryNoticedetails();
				odnd.setDelivery_notice_id(odn.getDelivery_notice_id());
				odnd.setOrder_detail_id(ys.getOrder_detail_id());
				odnd.setNotice_delivery_time(ys.getWkjq());
				odnd.setConfirm_delivery_time(ys.getWkjq());
				odnd.setNumber(ys.getCgww());
				odnd.setPur_order_id(ys.getPur_order_id());
				odnd.setHtmx(ys.getHtmx());
				odnd.setHtbh(ys.getHtbh());
				odnd.setHtxh(ys.getHtxh());
				odnd.setIs_edit(ys.getIs_edit());
				odnd.setClhh(ys.getClhh());
				mapper.addPfOrderDeliveryNoticedetails(odnd);
			}
		}
		return MyJsonUtil.obj2string(json);
	}
}
