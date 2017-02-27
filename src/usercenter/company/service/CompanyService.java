package usercenter.company.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.common.main.data.TradeClassDoMapper;
import usercenter.company.data.CompanyMapper;
import usercenter.company.model.UcBankAccount;
import usercenter.company.model.CompanySimpleInfo;
import usercenter.company.model.CompanyExtraInfo;
import usercenter.company.model.Company;
import util.DataTrans;


@Service
public class CompanyService {
	@Autowired
	private CompanyMapper mapper;
	@Autowired
	private TradeClassDoMapper tradeClassMapper;

	public List<Company> getSupplierFileList(Map<String,Object> params) {
		return mapper.getSupplierFileList(params);
	}
	public void addSupplierFile(Company[] arr) {
		for(Company obj: arr) {
			mapper.addSupplierFile(obj);
		}
	}
	public void updateSupplierFile(Company[] arr) {
		for(Company obj: arr) {
			mapper.updateSupplierFile(obj);
		}
	}
	public void deleteSupplierFile(Company[] arr) {
		for(Company obj: arr) {
			mapper.deleteSupplierFile(obj);
		}
	}
	
	/**
	 * 查询符合条件的公司总数
	*getTotalNum
	*@param addr 地址代号码
	*@param tradeClassOrCompanyName 输入框信息
	*@return
	*Integer
	*@author mishengliang
	*2016-3-28下午8:20:21
	 */
	public Integer getTotalNum(String addr,String tradeClassOrCompanyName,Integer accountRole,Integer mainAccountId){
		Integer totalNum = 0;
		Integer applySts = 15;//查询入驻认证的企业
		
		List<Integer> getForTradeClass = null;
		if(tradeClassOrCompanyName != null && tradeClassOrCompanyName != ""){//无输入值无需全部查找
			getForTradeClass = tradeClassMapper.getTradeClassCode(tradeClassOrCompanyName);
			if(getForTradeClass.size() == 0){
				getForTradeClass.add(-1);
			}
		}
		Integer addrNum = DataTrans.transToIntegerFromString(addr);
		
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("addrNum", addrNum);
		params.put("tradeClassOrCompanyName", tradeClassOrCompanyName);
		params.put("classString", getForTradeClass);
		params.put("applySts", applySts);
		params.put("accountRole", accountRole);
		params.put("mainAccountId", mainAccountId);
		
		if(addrNum == null){
			//无操作
		}else if(addrNum%10000 == 0){//行政区为省
			params.put("regionCode", 10000);
		}else if(addrNum%100 == 0){//行政区为市
			params.put("regionCode", 100);
		}else{//行政区为县级
			params.put("regionCode", 1);
		}
		
		totalNum = mapper.getTotalNum(params);
		return totalNum;
	}
	
	/**
	 * 通过地址或者行业类目查询供应商
	 *2016-3-23上午11:13:27
	 *getSupplierListByaddrOrclass
	 *return:void
	 * mishengliang
	 */
	public List<CompanySimpleInfo> getSupplierListByaddrOrclass(Map<String, Object> paramsInfo){
		//CompanySimpleInfo为企业简略信息，用于搜索展示
		List<CompanySimpleInfo> comapanySimpleInfoList = null;
		Integer applySts = 15;//已认证通过
		String tradeClassOrCompanyName = (String) paramsInfo.get("key1");
		String addr = (String) paramsInfo.get("addr");
		String start = (String) paramsInfo.get("start");
		String limit = (String) paramsInfo.get("limit");
		List<Integer> getForTradeClass = null;
		if(tradeClassOrCompanyName != null && tradeClassOrCompanyName != ""){//无输入值无需全部查找
			getForTradeClass = tradeClassMapper.getTradeClassCode(tradeClassOrCompanyName);
			if(getForTradeClass.size() == 0){
				getForTradeClass.add(-1);
			}
		}
		Integer addrNum = DataTrans.transToIntegerFromString(addr);
		
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("addrNum", addrNum);
		params.put("tradeClassOrCompanyName", tradeClassOrCompanyName);
		params.put("classString", getForTradeClass);
		params.put("applySts", applySts);
		params.put("start", Integer.parseInt(start));
		params.put("limit", Integer.parseInt(limit));
		params.put("accountRole", paramsInfo.get("accountRole"));
		params.put("mainAccountId", paramsInfo.get("mainAccountId"));
		if(addrNum == null){
			//无操作
		}else if(addrNum%10000 == 0){//行政区为省
			params.put("regionCode", 10000);
		}else if(addrNum%100 == 0){//行政区为市
			params.put("regionCode", 100);
		}else{//行政区为县级
			params.put("regionCode", 1);
		}
		
		comapanySimpleInfoList = mapper.getCompanySimpleInfo(params);
		return comapanySimpleInfoList;
	}
	
	/**
	 * 通过公司ID获取各模块信息
	*getCompanyInfoByCompanyId
	*@param companyId 公司ID
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-3-28上午9:33:34
	 */
	public Map<String, Object> getCompanyInfoByCompanyId(String companyId){
		Map<String, Object> companyInfoMap = new HashMap<String, Object>();
		Integer companyIdNum = Integer.parseInt(companyId);
		
		String tradeClass = mapper.getTradeClassByCompanyId(companyIdNum);//获取行业信息；行业只有一种，所以使用String
		List<String> saleItem = mapper.getSaleItemByCompanyId(companyIdNum);//销售商品集
		List<String> buyItem = mapper.getBuyItemByCompanyId(companyIdNum);//购买商品集
		CompanySimpleInfo companyBaseInfo = mapper.getCompanyBaseInfo(companyIdNum);//基础信息
		CompanyExtraInfo companyExtraInfo = mapper.getCompanyExtraInfo(companyIdNum);//附加信息 无发票抬头和银行账户信息
		
		if (companyExtraInfo != null) {//固定的附加信息不为空
			List<UcBankAccount> bankAccount = mapper.getBankAccount(companyIdNum);//获取银行账户
			List<String> invoiceTitleNames = mapper.getInvoiceTitleNames(companyIdNum);//获取发票抬头
			companyExtraInfo.setBankAccount(bankAccount);
			companyExtraInfo.setInvoiceTitleNames(invoiceTitleNames);
		}
		
		//认证评估 待添加
		
		companyInfoMap.put("tradeClass", tradeClass);
		companyInfoMap.put("saleItem", saleItem);
		companyInfoMap.put("buyItem", buyItem);
		companyInfoMap.put("companyBaseInfo", companyBaseInfo);
		companyInfoMap.put("compnayExtraInfo", companyExtraInfo);
		
		return companyInfoMap;
	}
	
	/**
	 * 查询该公司名的id
	 * @author chenlong
	 * @param map
	 * @return
	 * @date 2016-05-29
	 */
	public Integer getCpynameId(Map<String,Object> map){
		Integer id  = mapper.getCpynameId(map);
		return id;
	}
}
