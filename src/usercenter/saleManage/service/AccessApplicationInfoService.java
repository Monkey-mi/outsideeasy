package usercenter.saleManage.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import manager.supplier.service.AttchedService;
import net.sf.json.JSONArray;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.company.service.PfCompetitorService;
import platform.company.service.PfDeviceService;
import platform.company.service.PfGoodsService;
import platform.company.service.PfMainCustomerService;
import platform.company.service.PfMetarialService;
import usercenter.saleManage.data.AccessApplicationInfoMapper;
import usercenter.saleManage.model.AccessApplicationInfo;
import usercenter.supplierFiles.service.SupplierFilesService;
@Service
public class AccessApplicationInfoService {
	@Autowired
	private AccessApplicationInfoMapper mapper;
	@Autowired
	private AccessApplicationAttchedService asService;
	@Autowired
	private AccessAccountService abService;
	@Autowired
	private AccessInvoiceTitleService afService;
	@Autowired
	private AccessApplicationCategoryService aeService;
	@Autowired
	private AccessApplicationMaterialService amService;
	@Autowired
	private AccessApplicationGoodsService agService;
	@Autowired
	private AccessApplicationCompetitorService acService;
	@Autowired
	private AccessApplicationCustomerService auService;
	@Autowired
	private AccessApplicationDevicelistService adService;
	@Autowired
	private PfGoodsService pfGoodsService;
	@Autowired
	private PfMetarialService pfMetarialService;
	@Autowired
	private PfMainCustomerService pfMainCustomerService;
	@Autowired
	private PfCompetitorService pfCompetitorService;
	@Autowired
	private PfDeviceService pfDeviceService;
	@Autowired
	private AttchedService attchedService;
	@Autowired
	private SupplierFilesService supplierFilesService;
	public List<AccessApplicationInfo> getAccessApplicationInfoList(Map<String, Object> params){
		return mapper.getAccessApplicationInfoList(params);
	}
	
	public void addAccessApplicationInfo(Map<String, Object> params){
		mapper.addAccessApplicationInfo(params);
	}
	public void updateAccessApplicationInfo(Map<String, Object> params){
		mapper.updateAccessApplicationInfo(params);
	}
	
	@SuppressWarnings("unchecked")
	public void updateAccessApplicationInfoBatch(String infos){
		JSONArray infosArray = JSONArray.fromObject(infos);
		for(int i = 0; i < infosArray.size(); i++){
			mapper.updateAccessApplicationInfoByInfoId(infosArray.getJSONObject(i));
		}
	}
	public void updateAccessApplicationInfoBySupplierId(Map<String, Object> params){
		mapper.updateAccessApplicationInfoBySupplierId(params);
	}
	public Integer getEID(Map<String, Object> params){
		return mapper.getEID(params);
	}
	/**
	 * @Description:保存所有内容
	 * AccessApplicationInfoService
	 * saveAllInfo
	 * @param params
	 * @throws Exception void
	 * @author yukai
	 * 2016-8-18 上午10:40:52
	 */
	public void  saveAllInfo(Map<String, Object> params) throws Exception{
		String  contentParams  = params.get("contentParams").toString();//获取所有内容的JSON字符串
		JSONObject contentParamsObject = new JSONObject(contentParams); //将所有内容的JSON字符串转化为JSON对象
		int record_id=Integer.parseInt(contentParamsObject.get("record_id").toString());
		int supplier_id=supplierFilesService.getSupplierIdByRecordId(record_id);
		int access_status=Integer.parseInt(contentParamsObject.get("access_status").toString());
		JSONObject detailContentArrObject = new JSONObject(contentParamsObject.get("detailContentArr").toString());//获取详细信息内容的JSON字符串并转化为JSON对象
		for (int i = 0; i < detailContentArrObject.length(); i++) {//遍历保存详细信息内容
			JSONObject detailContentObject = new JSONObject(detailContentArrObject.get(i+"").toString());
			Map<String, Object> map=jsonToObject(detailContentArrObject.get(i+"").toString());
			map.put("record_id", record_id);
			map.put("supplier_id", supplier_id);
			if (map.get("e_id")!=null) {
				if(access_status==0){
					addAccessApplicationInfo(map);
				}else {
					updateAccessApplicationInfo(map);
				}
			}else {
				if(map.get("0")!=null){
					for (int j = 0; j < detailContentObject.length(); j++) {
						Map<String, Object> map1=jsonToObject(detailContentObject.get(j+"").toString());
						map1.put("record_id", record_id);
						map1.put("supplier_id", supplier_id);
						if(access_status==0){
							addAccessApplicationInfo(map1);
						}else {
							updateAccessApplicationInfo(map1);
						}
					}
				}
			}
		}
		JSONObject scalepowerContentArrObject = new JSONObject(contentParamsObject.get("scalepowerContentArr").toString());//获取规模能力内容的JSON字符串并转化为JSON对象
		for (int i = 0; i < scalepowerContentArrObject.length(); i++) {//遍历保存规模能力内容
			JSONObject scalepowerContentObject = new JSONObject(scalepowerContentArrObject.get(i+"").toString());
			Map<String, Object> map=jsonToObject(scalepowerContentArrObject.get(i+"").toString());
			map.put("record_id", record_id);
			map.put("supplier_id", supplier_id);
			if (map.get("e_id")!=null) {
				if(access_status==0){
					addAccessApplicationInfo(map);
				}else {
					updateAccessApplicationInfo(map);
				}
			}else {
				if(map.get("0")!=null){
					for (int j = 0; j < scalepowerContentObject.length(); j++) {
						Map<String, Object> map1=jsonToObject(scalepowerContentObject.get(j+"").toString());
						map1.put("record_id", record_id);
						map1.put("supplier_id", supplier_id);
						if(access_status==0){
							addAccessApplicationInfo(map1);
						}else {
							updateAccessApplicationInfo(map1);
						}
					}
				}
			}
		}
		JSONObject fileArrObject = new JSONObject(contentParamsObject.get("fileArr").toString());//获取附件内容的JSON字符串并转化为JSON对象
		for (int i = 0; i < fileArrObject.length(); i++) {//遍历保存附件内容
			Map<String, Object> map=jsonToObject(fileArrObject.get(i+"").toString());
			map.put("record_id", record_id);
			map.put("supplier_id", supplier_id);
			if(access_status==0){
				asService.addAccessApplicationAttched(map);
			}else {
				asService.updateAccessApplicationAttched(map);
			}
		}
		JSONObject bankInfoArrObject = new JSONObject(contentParamsObject.get("bankInfoArr").toString());//获取银行账号内容的JSON字符串并转化为JSON对象
		for (int i = 0; i < bankInfoArrObject.length(); i++) {//遍历保存银行账号内容
			Map<String, Object> map=jsonToObject(bankInfoArrObject.get(i+"").toString());
			map.put("record_id", record_id);
			map.put("supplier_id", supplier_id);
			if(map.get("account_id")!=null&&"-1".equals(map.get("account_id").toString())){
				abService.addAccessAccount(map);
			}else {
				abService.updateAccessAccount(map);
			}
		}
		JSONObject invoiceInfoArrObject = new JSONObject(contentParamsObject.get("invoiceInfoArr").toString());//获取发票抬头内容的JSON字符串并转化为JSON对象
		for (int i = 0; i < invoiceInfoArrObject.length(); i++) {//遍历保存发票抬头内容
			Map<String, Object> map=jsonToObject(invoiceInfoArrObject.get(i+"").toString());
			map.put("record_id", record_id);
			map.put("supplier_id", supplier_id);
			map.put("default_id", 0);
			if (map.get("invoice_title_name")!=null) {
				afService.addAccessInvoiceTitle(map);
			}
		}
		Map<String, Object> map1=new HashMap<String, Object>();
		map1.put("record_id", record_id);
	//	List<AccessApplicationCategory> categories=aeService.getAccessApplicationCategoryList(map1);
		JSONObject categoryInfoArrObject = new JSONObject(contentParamsObject.get("categoryInfoArr").toString());//获取供应品类内容的JSON字符串并转化为JSON对象
		for (int i = 0; i < categoryInfoArrObject.length(); i++) {//遍历保存供应品类内容
			Map<String, Object> map=jsonToObject(categoryInfoArrObject.get(i+"").toString());
			map.put("record_id", record_id);
			map.put("supplier_id", supplier_id);
//			boolean addFlag=true;
			if (map.get("category_id")!=null) {
				/*for (AccessApplicationCategory category : categories) {//循环判断该品类是否已保存过
					if (category.getCategory_id()==Integer.parseInt(map.get("category_id").toString())) {
						addFlag=false;
						break;
					}
				}
				if (addFlag) {*/
					aeService.addAccessApplicationCategory(map);
				//}
			}
		}
		/*for (AccessApplicationCategory category : categories) {//循环判断该品类是否需要删除
			boolean delFlag=true;
			for (int i = 0; i < categoryInfoArrObject.length(); i++) {
				Map<String, Object> map=jsonToObject(categoryInfoArrObject.get(i+"").toString());
				if (map.get("category_id")!=null) {
					if (category.getCategory_id()==Integer.parseInt(map.get("category_id").toString())) {
						delFlag=false;
						break;
					}
				}
			}
			map1.put("id", category.getId());
			if (delFlag) {
				aeService.deleteAccessApplicationCategory(map1);
			}
		}*/
		amService.addOrUpdateAccessApplicationMaterial(contentParamsObject.getString("material").toString(), record_id, access_status,supplier_id);//保存主要原材料及品牌
		agService.addOrUpdateAccessApplicationGoods(contentParamsObject.getString("goods").toString(), record_id, access_status,supplier_id);//保存主要销售产品及品牌
		acService.addOrUpdateAccessApplicationCompetitor(contentParamsObject.getString("competitor").toString(), record_id, access_status,supplier_id);//保存主要竞争对手
		auService.addOrUpdateAccessApplicationCustomer(contentParamsObject.getString("customer").toString(), record_id, access_status,supplier_id);//保存主要客户
		adService.addOrUpdateAccessApplicationDevicelist(contentParamsObject.getString("devicelist").toString(), record_id, access_status,supplier_id);//保存设备清单
		Map<String, Object> map=jsonToObject(contentParams);
		asService.delAccessApplicationAttcheds(map);
		abService.deleteAccessAccounts(map);
		afService.deleteAccessInvoiceTitles(map);
		amService.deleteAccessApplicationMaterials(map);
		agService.deleteAccessApplicationGoodses(map);
		acService.deleteAccessApplicationCompetitors(map);
		auService.deleteAccessApplicationCustomers(map);
		adService.deleteAccessApplicationDevicelists(map);
		aeService.deleteAccessApplicationCategorys(map);
		if(map.get("isSyncSave")!=null && "true".equals(map.get("isSyncSave").toString())){//同步保存到平台
			updatePlatformOtherInfo(map);
		}
		/*Map<String, Object> map1=new HashMap<String, Object>();
		map1.put("flag", true);
		asService.delUselessAttched(map1);*/
	}
	
	/**
	 * @Description:将JSON字符串转化为MAP
	 * AccessApplicationInfoService
	 * jsonToObject
	 * @param jsonStr
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-18 上午10:43:03
	 */
	public Map<String, Object> jsonToObject(String jsonStr) throws Exception {
		JSONObject jsonObj = new JSONObject(jsonStr);
		Iterator<String> nameItr = jsonObj.keys();
		String name;
		Map<String, Object> outMap = new HashMap<String, Object>();
		while (nameItr.hasNext()) {
			name = nameItr.next();
			outMap.put(name, jsonObj.getString(name));
		}
		return outMap;
	}
	/**
	 * @Description:更新平台其他信息
	 * AccessApplicationInfoService
	 * updatePlatformOtherInfo
	 * @param params void
	 * @author yukai
	 * 2016-8-29 上午11:12:09
	 * @throws Exception 
	 */
	public void updatePlatformOtherInfo(Map<String, Object> params) throws Exception {
		Map<String, Object> addParams = new HashMap<String, Object>();//新增的数据集合
		Map<String, Object> delParams = new HashMap<String, Object>();//新增的数据集合
		int companyId=Integer.parseInt(params.get("companyId").toString());
		delParams.put("companyId", companyId);
		String goodsInfo=params.get("goods").toString();
		goodsInfo = "["+ goodsInfo +"]";
		JSONArray goodsArray = JSONArray.fromObject(goodsInfo);
		pfGoodsService.deleteGoodsByCompanyId(delParams);
		for(int i = 0; i<goodsArray.size(); i++){
			net.sf.json.JSONObject goodsJsonObject = goodsArray.getJSONObject(i);
			addParams.put("companyId", companyId);
			addParams.put("goodsName", goodsJsonObject.get("goodsName").toString());
			addParams.put("goodsBrand", goodsJsonObject.get("goodsBrand").toString());
			pfGoodsService.addGoods(addParams);
		}
		String materialInfo=params.get("material").toString();
		materialInfo = "["+ materialInfo +"]";
		JSONArray materialArray = JSONArray.fromObject(materialInfo);
		pfMetarialService.deleteMetarialByCompanyId(delParams);
		for(int i = 0; i<materialArray.size(); i++){
			net.sf.json.JSONObject materialJsonObject = materialArray.getJSONObject(i);
			addParams.put("companyId", companyId);
			addParams.put("materialName", materialJsonObject.get("materialName").toString());
			addParams.put("materialBrand", materialJsonObject.get("materialBrand").toString());
			pfMetarialService.addMetarial(addParams);
		}
		String customerInfo=params.get("customer").toString();
		customerInfo = "["+ customerInfo +"]";
		JSONArray customerArray = JSONArray.fromObject(customerInfo);
		pfMainCustomerService.deleteCustomerByCompanyId(delParams);
		for(int i = 0; i<customerArray.size(); i++){
			net.sf.json.JSONObject customerJsonObject = customerArray.getJSONObject(i);
			addParams.put("companyId", companyId);
			addParams.put("customerName", customerJsonObject.get("customerName").toString());
			pfMainCustomerService.addCustomer(addParams);
		}
		String competitorInfo=params.get("competitor").toString();
		competitorInfo = "["+ competitorInfo +"]";
		JSONArray competitorArray = JSONArray.fromObject(competitorInfo);
		pfCompetitorService.deleteCompetitorByCompanyId(delParams);
		for(int i = 0; i<competitorArray.size(); i++){
			net.sf.json.JSONObject competitorJsonObject = competitorArray.getJSONObject(i);
			addParams.put("companyId", companyId);
			addParams.put("competitorName", competitorJsonObject.get("competitorName").toString());
			pfCompetitorService.addCompetitor(addParams);
		}
		String devicelistInfo=params.get("devicelist").toString();
		devicelistInfo = "["+ devicelistInfo +"]";
		JSONArray devicelistArray = JSONArray.fromObject(devicelistInfo);
		pfDeviceService.deleteDeviceByCompanyId(delParams);
		for(int i = 0; i<devicelistArray.size(); i++){
			net.sf.json.JSONObject devicelistJsonObject = devicelistArray.getJSONObject(i);
			addParams.put("companyId", companyId);
			addParams.put("deviceName", devicelistJsonObject.get("deviceName").toString());
			addParams.put("specifications", devicelistJsonObject.get("specifications").toString());
			addParams.put("place", devicelistJsonObject.get("place").toString());
			addParams.put("price", devicelistJsonObject.get("price").toString());
			addParams.put("buyDay", devicelistJsonObject.get("buyDay").toString());
			addParams.put("advanced", devicelistJsonObject.get("advanced").toString());
			addParams.put("deviceNum", devicelistJsonObject.get("deviceNum").toString());
			pfDeviceService.addDevice(addParams);
		}
		attchedService.deleteAttchedByCompanyId(delParams);
		JSONObject fileArrObject = new JSONObject(params.get("fileArr").toString());//获取附件内容的JSON字符串并转化为JSON对象
		for (int i = 0; i < fileArrObject.length(); i++) {//遍历保存附件内容
			Map<String, Object> map=jsonToObject(fileArrObject.get(i+"").toString());
			map.put("company_id", companyId);
			map.put("create_dt", new Date());
			attchedService.addAttched1(map);
		}
		
	}
}
