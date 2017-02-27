package manager.supplier.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import manager.basicdata.area.model.Area;
import manager.basicdata.companyClass.model.CompanyClass;
import manager.basicdata.companyClass.service.CompanyClassService;
import manager.basicdata.currency.model.Currency;
import manager.basicdata.currency.service.CurrencyService;
import manager.basicdata.materialClass.model.MaterialClass;
import manager.basicdata.tradeClass.model.TradeClass;
import manager.basicdata.tradeClass.service.TradeClassService;
import common.model.TreeModel;
import common.user.data.RegAccoutCompanyInfoMapper;
import common.user.data.RegAccoutMapper;
import common.user.model.RegAccout;
import common.user.model.RegAccoutCompanyInfo;
import common.user.model.RegSalt;
import manager.supplier.data.BankAccountMapper;
import manager.supplier.data.CompetitorMapper;
import manager.supplier.data.DevicelistMapper;
import manager.supplier.data.GoodsMapper;
import manager.supplier.data.InvoiceTitleMapper;
import manager.supplier.data.MainCustomerMapper;
import manager.supplier.data.MetarialMapper;
import manager.supplier.data.SupplierFileMapper;
import manager.supplier.model.AuthUpdateAttched;
import manager.supplier.model.AuthcationUpdate;
import manager.supplier.model.BankAccount;
import manager.supplier.model.CompanyAuthAttachedHistory;
import manager.supplier.model.CompanyAuthcationHistory;
import manager.supplier.model.Competitor;
import manager.supplier.model.Devicelist;
import manager.supplier.model.Goods;
import manager.supplier.model.InvoiceTitle;
import manager.supplier.model.MainCustomer;
import manager.supplier.model.Metarial;
import manager.supplier.model.SupplierFile;

import org.activiti.engine.impl.util.json.JSONObject;
import org.apache.commons.beanutils.PropertyUtilsBean;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import platform.company.model.PfCompanySimpleInfo;
import platform.company.service.CompanyForPlateFormService;

import usercenter.saleManage.data.AccessApplicationCategoryMapper;
import usercenter.saleManage.data.AccessApplicationCompetitorMapper;
import usercenter.saleManage.data.AccessApplicationCustomerMapper;
import usercenter.saleManage.data.AccessApplicationDevicelistMapper;
import usercenter.saleManage.data.AccessApplicationGoodsMapper;
import usercenter.saleManage.data.AccessApplicationMetarialMapper;
import usercenter.saleManage.data.AccessInvoiceTitleMapper;
import usercenter.saleManage.data.AccessTempletElementMapper;
import usercenter.saleManage.model.AccessTempletElement;
import usercenter.saleManage.service.AccessAccountService;
import usercenter.saleManage.service.AccessApplicationInfoService;
import usercenter.supplierFiles.data.SupplierFilesMapper;
import usercenter.supplierFiles.data.SupplierOwnerInfoMapper;
import usercenter.supplierFiles.data.SupplierRegaccountInfoMapper;
import usercenter.supplierFiles.model.SupplierOwnerInfo;
import usercenter.supplierFiles.model.SupplierRegaccountInfo;
import usercenter.supplierFiles.service.SupplierFilesService;
import util.BeanUtil;
import util.Const;
import util.CryptoUtils;
import util.IpAddressUtils;
import util.MD5Util;
import util.SessionUtil;
import manager.supplier.service.CompanyAuthcationHistoryService;
import manager.supplier.service.CompanyAuthAttachedHistoryService;
import manager.supplier.service.AuthUpdateAttchedService;
import manager.supplier.service.AuthcationUpdateService;
import manager.supplier.model.Attched;
import manager.supplier.service.AttchedService;

@Service
public class SupplierFileService {
	@Autowired
	private SupplierFileMapper mapper;
	
	@Autowired
	private CompanyAuthcationHistoryService companyAuthcationHistoryService;
	@Autowired
	private CompanyAuthAttachedHistoryService companyAuthAttachedHistoryService;
	@Autowired
	private AttchedService attchedService;
	
	@Autowired
	private AuthcationUpdateService authcationUpdateService;
	@Autowired
	private AuthUpdateAttchedService authUpdateAttchedService;
	@Autowired
	private SupplierFilesService supplierFilesService;
	@Autowired
	private CompanyForPlateFormService companyForPlateFormService;
	@Autowired
	private TradeClassService tradeClassService;
	@Autowired
	private CompanyClassService companyClassService;
	@Autowired
	private CurrencyService currencyService;
	@Autowired 
	private RegAccoutMapper regMapper;
	@Autowired
	private SupplierFilesMapper supplierMapper;
	@Autowired
	private SupplierOwnerInfoMapper soiMapper;
	@Autowired
	private SupplierRegaccountInfoMapper  sriMapper;
	@Autowired
	private AccessApplicationInfoService aaiService;
	@Autowired
	private AccessTempletElementMapper ateMapper;
	@Autowired
	private BankAccountMapper baMapper;
	@Autowired
	private AccessAccountService aaService;
	@Autowired
	private RegAccoutCompanyInfoMapper rciMapper;
	@Autowired 
	private InvoiceTitleMapper itMapper;
	@Autowired
	private AccessInvoiceTitleMapper aitMapper;
	@Autowired
	private DevicelistMapper dlMapper;
	@Autowired
	private AccessApplicationDevicelistMapper adlMapper;
	@Autowired
	private GoodsMapper goodsMapper;
	@Autowired
	private AccessApplicationGoodsMapper aagMapper;
	@Autowired
	private CompetitorMapper competitorMapper;
	@Autowired
	private AccessApplicationCompetitorMapper aacMapper;
	@Autowired
	private MetarialMapper metarialMapper;
	@Autowired
	private AccessApplicationMetarialMapper aamMapper;
	@Autowired 
	private MainCustomerMapper customerMapper;
	@Autowired
	private AccessApplicationCustomerMapper aacuMapper;
	@Autowired
	private AccessApplicationCategoryMapper aacaMapper;
	
	public List<SupplierFile> getSupplierFileList(Map<String,Object> params) {
			
		return mapper.getSupplierFileList(params);
	}
	/**
	 * @Description:获取供应商档案列表
	 * SupplierFileService
	 * getSupplierFileInfoList
	 * @param params
	 * @return List<SupplierFile>
	 * @author yukai
	 * 2016-10-10 下午2:44:37
	 */
	public List<SupplierFile> getSupplierFileInfoList(Map<String,Object> params) {
		return mapper.getSupplierFileInfoList(params);
	}
	public List<SupplierFile> getSupplierFileByID(Map<String,Object> params) {
		return mapper.getSupplierFileByID(params);
	}
	@Transactional
	public void addSupplierFile(SupplierFile[] arr) {
		Object clientip=SessionUtil.getAttribute(Const.SESSION_IP);
		for(SupplierFile obj: arr) {
			if(clientip!=null && !"".equals(clientip)){
				String ip_addr=clientip.toString();
				obj.setIp_addr(ip_addr);
				obj.setCreate_dt(new Date());
			}
			mapper.addSupplierFile(obj);
		}
	}
	@Transactional
	public void updateSupplierFile(SupplierFile[] arr) {
		for(SupplierFile obj: arr) {
			mapper.updateSupplierFile(obj);
		}
	}
	@Transactional
	public void deleteSupplierFile(SupplierFile[] arr) {
		for(SupplierFile obj: arr) {
			mapper.deleteSupplierFile(obj);
		}
	}
	/**
	* @Description: 检测状态位的一致
	* @param apply_sts
			company_id
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
	public List<CompanyClass> getCompanyClassList(Map<String,Object> params) {
		return mapper.getCompanyClassList(params);
	}
	
	public Integer getCountByIdAndName(Map<String,Object> params) {
		return mapper.getCountByIdAndName(params);
	}
	public Integer getCountByName(Map<String,Object> params) {
		return mapper.getCountByName(params);
	}
	public Integer checkSupplierExistInReg(Map<String,Object> params) {
		return supplierFilesService.checkSupplierExistInReg(params);
	}
	public List<Area> getAreaList(Map<String,Object> params) {
		return mapper.getAreaList(params);
	}
	public List<MaterialClass> getMaterialClassList(Map<String,Object> params) {
		return mapper.getMaterialClassList(params);
	}
	/**
	* @Description: 获取  树
	* @param  node 主键(也是指定节点)
	* Request supplier/supplierFile.srm?method=getMaterialClassTree
	* Response {data:[{List<TreeModel>}]} <br/><br/>
	* @author xufeng
	* @date 2015-11-03
	*/
	public List<TreeModel> getMaterialClassTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<MaterialClass> list=getMaterialClassList(params);
		
		for(MaterialClass sa:list) 
		{
			TreeModel st=new TreeModel();
			st.setId(sa.getMc_id());
			st.setParentId(sa.getF_id());
			st.setText(sa.getMc_name());
			st.setLeaf(sa.getLeaf());
			st.setExpanded("false");
			
			st.setType("MaterialClass");
			stlist.add(st);
			
		}
		
		return stlist;
	}
	/*
	 * getSuppliersByMultiSearch
	 * 按备注说明信息及名称字段多关键字模糊查询
	 * */
	public List<SupplierFile> getSuppliersByMultiSearch(Map<String,Object> params) {
		return mapper.getSuppliersByMultiSearch(params);
	}
	
	/**
	 * 仅通过公司名进行搜索，只返回id 名称
	 * @param params
	 * @return company_id, cpyname_en,cpyname_cn
	 * @author chenlong
	 * @2016-04-08
	 */
	public List<SupplierFile> getSuppliersByCpnameSearch(Map<String,Object> params) {
		
		return mapper.getSuppliersByCpnameSearch(params);
	}
	/**
	 * 通过主账号ID查询相关的公司
	* @Description:
	* SupplierFileService
	* getCompanyForReg
	* @param params
	* @return List<SupplierFile>
	* @author chenlong
	* 2016-10-12 下午4:40:54
	 */
	public List<SupplierFile> getCompanyForReg(Map<String,Object> params) {		
		return mapper.getCompanyForReg(params);
	}
	
	/**
	 * 企业认证审核时保存企业认证信息到历史版本记录
	 * @param 多个company_id拼接的字符串，用逗号隔开
	 * @author yangliping
	 * @date 2016-7-28 14:52:36
	 */
	public void saveCompanyAuthHistory(Map<String,Object> params) {
		String idArrayString=params.get("companyid_array").toString();
		String[] idArray=idArrayString.split(",");
		//System.out.println("11111111111111111111:"+idArrayString);
		for(int j=0;j<idArray.length;j++)
		{
			
			Map<String,Object> companyPara=new HashMap<String,Object>();
			companyPara.put("company_id", idArray[j]);
			//System.out.println("company_id:"+idArray[j]);
			List<SupplierFile> companys=mapper.getSupplierFileByID(companyPara);
			if(companys.size()>0)
			{
				SupplierFile company=companys.get(0);
				CompanyAuthcationHistory history=new CompanyAuthcationHistory();
				history.setCompany_id(company.getCompany_id());
				history.setClass_id(company.getClass_id());
				history.setNature_id(company.getNature_id());
				history.setKey_remark(company.getKey_remark());
				history.setCpyname_cn(company.getCpyname_cn());
				history.setIndustry_id(company.getIndustry_id());
				history.setCorporation(company.getCorporation());
				history.setReg_fund(company.getReg_fund());
				history.setCurrency_id(company.getCurrency_id());
				history.setEstablish_dt(company.getEstablish_dt());
				history.setCreated_dt(new Date());
				//查询企业信息表中的企业信息，把认证相关信息保存到认证基本信息历史表中,返回历史基本表主键
				companyAuthcationHistoryService.addCompanyAuthcationHistory(history);
				int auth_history_id=history.getAuth_history_id();
				//System.out.println("auth_history_id:"+auth_history_id);
				
				//附件部分
				
				Map<String,Object> attachPara=new HashMap<String,Object>();
				attachPara.put("company_id", company.getCompany_id());
				attachPara.put("is_license",true);
				//查找附件表中当前企业下的证照附件
				List<Attched> Attcheds=attchedService.getAttchedList(attachPara);
				for(int i=0;i<Attcheds.size();i++)
				{
					CompanyAuthAttachedHistory attHistory=new CompanyAuthAttachedHistory();
					attHistory.setAuth_history_id(auth_history_id);
					attHistory.setFile_type_id(Attcheds.get(i).getFile_type_id());
					attHistory.setFile_name(Attcheds.get(i).getFile_name());
					attHistory.setCompany_id(Attcheds.get(i).getCompany_id());
					attHistory.setObject_id(Attcheds.get(i).getMogodb_id());
					attHistory.setCreate_dt(new Date());
					//将企业证照附件数据添加到历史证照附件表中
					companyAuthAttachedHistoryService.addCompanyAuthAttachedHistory(attHistory);
				}
			}
		}
	}
	
	/**
	 * @Description:认证信息变更时修改企业基本信息表和附件表，并保存到历史基本表和历史证照附件表
	 * AuthcationUpdateService
	 * saveCompanyUpdateAuthToHistory
	 * @param params void
	 * @author yangliping
	 * 2016-7-29 下午12:06:
	 * 21
	 */
	public void saveCompanyUpdateAuthToHistory(Map<String,Object> params){
		//变更表主键多个拼接字符串
		String idArrayString=params.get("authUpdateIdArray").toString();
		String[] idArray=idArrayString.split(",");
		for(int j=0;j<idArray.length;j++)
		{
			Map<String,Object> updatePara=new HashMap<String,Object>();
			updatePara.put("auth_update_id", idArray[j]);
			List<AuthcationUpdate> updateItems=authcationUpdateService.getAuthcationUpdateList(updatePara);
			if(updateItems.size()>0)
			{
				
				AuthcationUpdate upcompany=updateItems.get(0);
				//修改企业信息基本表
				Map<String,Object> companyPara=new HashMap<String,Object>();
				companyPara.put("company_id", upcompany.getCompany_id());
				
				List<SupplierFile> companys=mapper.getSupplierFileByID(companyPara);
				if(companys.size()>0)
				{
					SupplierFile company=companys.get(0);
					
					company.setCompany_id(upcompany.getCompany_id());
					company.setClass_id(upcompany.getClass_id());
					company.setNature_id(upcompany.getNature_id());
					company.setKey_remark(upcompany.getKey_remark());
					company.setCpyname_cn(upcompany.getCpyname_cn());
					company.setIndustry_id(upcompany.getIndustry_id());
					company.setCorporation(upcompany.getCorporation());
					company.setReg_fund(upcompany.getReg_fund());
					company.setCurrency_id(upcompany.getCurrency_id());
					company.setEstablish_dt(upcompany.getEstablish_dt());
					mapper.updateSupplierFile(company);
				}
				
				//添加到历史变更基本表中
				CompanyAuthcationHistory history=new CompanyAuthcationHistory();
				history.setCompany_id(upcompany.getCompany_id());
				history.setClass_id(upcompany.getClass_id());
				history.setNature_id(upcompany.getNature_id());
				history.setKey_remark(upcompany.getKey_remark());
				history.setCpyname_cn(upcompany.getCpyname_cn());
				history.setIndustry_id(upcompany.getIndustry_id());
				history.setCorporation(upcompany.getCorporation());
				history.setReg_fund(upcompany.getReg_fund());
				history.setCurrency_id(upcompany.getCurrency_id());
				history.setEstablish_dt(upcompany.getEstablish_dt());
				history.setCreated_dt(new Date());
				companyAuthcationHistoryService.addCompanyAuthcationHistory(history);
				int auth_history_id=history.getAuth_history_id();
				//System.out.println("auth_history_id:"+auth_history_id);
				//附件部分
				//先查出变更附件表中的记录
				Map<String,Object> attachUPara=new HashMap<String,Object>();
				attachUPara.put("auth_update_id", upcompany.getAuth_update_id());
				List<AuthUpdateAttched> AuthUpdateAttcheds=authUpdateAttchedService.getAuthUpdateAttchedList(attachUPara);
				//查出原公司附件
				Map<String,Object> attachPara=new HashMap<String,Object>();
				attachPara.put("company_id", upcompany.getCompany_id());
				attachPara.put("is_license",true);
				//查找附件表中当前企业下的证照附件
				
				List<Attched> Attcheds=attchedService.getAttchedList(attachPara);
				for (int k=0;k<AuthUpdateAttcheds.size();k++) {
					boolean isUpdate=false;
					Attched attched=new Attched();
					AuthUpdateAttched currUpdateAttched=AuthUpdateAttcheds.get(k);
					for(int i=0;i<Attcheds.size();i++){
						Attched currAttched=Attcheds.get(i);
						if(currUpdateAttched.getCompany_id()==currAttched.getCompany_id()&&currUpdateAttched.getFile_type_id()==currAttched.getFile_type_id())
						{
							isUpdate=true;
							attched=currAttched;
							attched.setMogodb_id(currUpdateAttched.getObject_id());
						}
					}
					if (isUpdate) {
						//将当前变更的附件变更到企业附件信息表中
						attchedService.updateAttched(new Attched[]{attched});
					}else {
						//将当前新增的附件增加到企业附件信息表中
						attched.setCompany_id(currUpdateAttched.getCompany_id());
						attched.setFile_name(currUpdateAttched.getFile_name());
						attched.setFile_type_id(currUpdateAttched.getFile_type_id());
						attched.setMogodb_id(currUpdateAttched.getObject_id());
						attchedService.addAttched(new Attched[]{attched});
					}
				}
				Attcheds=attchedService.getAttchedList(attachPara);
				for (Attched attched : Attcheds) {
					CompanyAuthAttachedHistory attHistory=new CompanyAuthAttachedHistory();
					attHistory.setAuth_history_id(auth_history_id);
					attHistory.setFile_type_id(attched.getFile_type_id());
					attHistory.setFile_name(attched.getFile_name());
					attHistory.setCompany_id(attched.getCompany_id());
					attHistory.setObject_id(attched.getMogodb_id());
					attHistory.setCreate_dt(new Date());
					//将企业证照附件数据添加到历史证照附件表中
					companyAuthAttachedHistoryService.addCompanyAuthAttachedHistory(attHistory);
				}
				Map<String,Object> map=new HashMap<String,Object>();
				map.put("company_id", upcompany.getCompany_id());
				supplierFilesService.updateAuthStsByCompanyId(map);
			}
		}
	}
	/**
	 * @Description:将excel解析出来的数据校验，通过之后保存数据库
	 * SupplierFileService
	 * addSupplierFileByExcel
	 * @param finalFile
	 * @param json
	 * @param request
	 * @throws Exception void
	 * @author yukai
	 * 2016-10-13 下午4:10:34
	 */
	public void addSupplierFileByExcel(File finalFile, JSONObject json,
			HttpServletRequest request,int ownerId)  throws Exception{
				Map<String,Object> params=new HashMap<String,Object>();
				Map<String,Object> supplierParams=new HashMap<String,Object>();
				Map<String,Object> accInfoParams=new HashMap<String,Object>();
				Map<String,Object> accountParams=new HashMap<String,Object>();
				Map<String,Object> invoiceParams=new HashMap<String,Object>();
				Map<String,Object> deviceParams=new HashMap<String,Object>();
				Map<String,Object> goodsParams=new HashMap<String,Object>();
				Map<String,Object> metarialParams=new HashMap<String,Object>();
				Map<String,Object> customerParams=new HashMap<String,Object>();
				Map<String,Object> competitorParams=new HashMap<String,Object>();
				String currentIp = IpAddressUtils.getCurrentIpAddress(request);//当前用户IP地址
				//从excel读取供应商列表
				List<SupplierFile> supplierFilelist=getSupplierListFromExcel(finalFile,json,request);
				//从excel读取供应商银行账号列表
				List<BankAccount> bankAccountlist=getAccountListFromExcel(finalFile,json,request);
				//从excel读取供应商发票抬头列表
				List<InvoiceTitle> invoiceTitlelist=getTitleListFromExcel(finalFile,json,request);
				//从excel读取供应商设备明细列表
				List<Devicelist> devicelist=getDeviceListFromExcel(finalFile,json,request);
				//从excel读取供应商产品列表
				List<Goods> goodslist=getGoodsListFromExcel(finalFile,json,request);
				//从excel读取供应商竞争对手列表
				List<Competitor> competitorlist=getCompetitorListFromExcel(finalFile,json,request);
				//从excel读取供应商材料列表
				List<Metarial> metariallist=getMetarialListFromExcel(finalFile,json,request);
				//从excel读取供应商客户列表
				List<MainCustomer> customerlist=getCustomerListFromExcel(finalFile,json,request);
				//校验保存供应商信息
				if(json.getBoolean("success") && supplierFilelist.size()>0){
					//初始赋值
					Date createDate=new Date();
					Pattern accPattern = Pattern.compile("^[a-zA-Z0-9_\u4e00-\u9fa5]+$");
					Pattern phonepattern = Pattern.compile("^1[3|4|5|8][0-9]{9}$");
					//验证
					for (int i = 0; i < supplierFilelist.size(); i++) {
						SupplierFile item=supplierFilelist.get(i);
						item.setCreate_dt(createDate);
						item.setApply_sts(15);
						//供应商名称是否已存在
						String supplierName=item.getCpyname_cn();
						params.put("company_id", ownerId);
						//List<RegAccoutCompanyInfo> rInfos=rciMapper.getRegAccoutCompanyInfoList(params);
		        		//int reg_id=rInfos.get(0).getReg_id();
		        		//params.put("reg_id", reg_id);
		        		params.put("supplierName", supplierName);
		        		int count=supplierFilesService.checkSupplierExistInReg(params);
		        		if(count>0){
		        			json.put("success", false);
	            			json.put("message", supplierName+"已存在");
	            			return;
		        		}
						//手机号匹配
		            	String phone=item.getM_phone();
		            	if(phone!=null && !phone.equals("")){
		            		Matcher m = phonepattern.matcher(phone);
		            		if(!m.matches()){
		            			json.put("success", false);
		            			json.put("message", phone+"格式不规范");
		            			return;
		            		}
		            	}
		            	//检查行业性质
		            	String className=item.getClass_name();
		            	params.put("class_name", className);
		            	List<TradeClass>tradeClasses=tradeClassService.getTradeClassList(params);
		            	if(tradeClasses.size()==0){
							json.put("success", false);
	            			json.put("message", className+"不存在");
	            			return;
						}else{
							item.setClass_id(tradeClasses.get(0).getClass_id()+"");
						}
		            	//检查企业性质
		            	String natureName=item.getNature_name();
		            	params.put("nature_name", natureName);
		            	List<CompanyClass>companyClasses=companyClassService.getCompanyClassList(params);
		            	if(companyClasses.size()==0){
							json.put("success", false);
	            			json.put("message", natureName+"不存在");
	            			return;
						}else{
							item.setNature_id(companyClasses.get(0).getNature_id()+"");
						}
		            	//检查币种
		            	String currencyName=item.getCurrency_name();
		            	params.put("currency_name", currencyName);
		            	List<Currency>currencies=currencyService.getCurrencyList(params);
		            	if(currencies.size()==0){
							json.put("success", false);
	            			json.put("message", currencyName+"不存在");
	            			return;
						}else{
							item.setCurrency_id(currencies.get(0).getCurrency_id());
						}
		            	//检查账号格式是否正确
		            	String account=item.getReg_account();
		            	String password=MD5Util.encode2hex(item.getPassword());
		            	String email=item.getReg_email();
		            	if(account!=null && !account.equals("")){
		            		Matcher m = accPattern.matcher(account);
		            		if(!m.matches()){
		            			json.put("success", false);
		            			json.put("message", account+"格式不规范");
		            			return;
		            		}else{
		            			int length=getWordCount(account);
		            			if(length<5||length>15){
		            				json.put("success", false);
			            			json.put("message", account+"长度不符合要求");
			            			return;
		            			}else{
		            				params.put("userName", account);
			            			int count1=regMapper.getUserNameCount(params);
			            			if(count1>0){
			            				json.put("success", false);
				            			json.put("message", account+"已被使用");
				            			return;
			            			}else{
			            				if(password==null||password==""){
					            			json.put("success", false);
					            			json.put("message", account+"密码不能为空");
					            			return;
					            		}else{
					            			if(email==null||email==""){
						            			json.put("success", false);
						            			json.put("message", account+"注册邮箱不能为空");
						            			return;
						            		}else{
						            			params.put("email", email);
						            			int count2=regMapper.getUserEmailCount(params);
						            			if(count2>0){
						            				json.put("success", false);
							            			json.put("message", email+"已被使用");
							            			return;
						            			}else{
						            				String salt = CryptoUtils.getSalt();//随机生成盐值
						            				item.setPassword(CryptoUtils.getHash(password, salt));
						            				item.setSalt(salt);
						            			}
						            		}
					            		}
			            			}
		            			}
		            		}
		            	}
					}
					//通过验证，赋值完成，保存
					for (int i = 0; i < supplierFilelist.size(); i++) {
						SupplierFile item=supplierFilelist.get(i);
						int company_id=0;
						boolean flag=true;//供应商是否存在平台信息
						String companyName=item.getCpyname_cn();
						params.put("companyName", companyName);
						List<PfCompanySimpleInfo> companys=companyForPlateFormService.getCompanyByName(params);
						if(companys.size()>0){
							company_id=companys.get(0).getCompany_id();
							flag=true;
						}else {
							mapper.addSupplierFile(item);//保存公司信息
							company_id=item.getCompany_id();
							flag=false;
						}
						if(item.getReg_account()!=null&&!item.getReg_account().equals("")){
							Byte emailValid = 0;//更新为已验证
							RegAccout regAccout=new RegAccout();
							regAccout.setAcc_name(item.getReg_account());
							regAccout.setPassword(item.getPassword());
							regAccout.setReg_date(createDate);
							regAccout.setRole_id(1);
							regAccout.setReg_email(item.getReg_email());
							regAccout.setEmail_valid(emailValid);
							regAccout.setLast_login_ip(currentIp);
							regMapper.addRegAccout(regAccout);//保存账号
							RegSalt rs=new RegSalt();
			        		rs.setAcc_name(item.getReg_account());
			        		rs.setSalt(item.getSalt());
			        		regMapper.addSalt(rs);//保存盐值
			        		RegAccoutCompanyInfo rci=new RegAccoutCompanyInfo();
			        		rci.setReg_id(regAccout.getReg_id());
			        		rci.setCompany_id(item.getCompany_id());
			        		rciMapper.addRegAccoutCompanyInfo(rci);
						}
		        		supplierParams.put("company_id", company_id);
		        		supplierParams.put("supplier_cpyname", item.getCpyname_cn());
		        		supplierParams.put("source_type", 2);
		        		supplierParams.put("file_status", 0);
		        		supplierMapper.addSupplierFiles(supplierParams);//保存供应商档案
		        		
		        		params.put("companyId", ownerId);
		        		String ownerName=companyForPlateFormService.getCompanyNameByCompanyId(params);
		        		SupplierOwnerInfo soi=new SupplierOwnerInfo();
		        		soi.setCompany_id(ownerId);
		        		soi.setOwner_cpyname(ownerName);
		        		soi.setSupplier_id(Integer.parseInt(supplierParams.get("supplier_id").toString()));
		        		soiMapper.addSupplierOwnerInfo(soi);//与所有者建立联系
		        		
		        		params.put("company_id", ownerId);
		        		List<RegAccoutCompanyInfo> rInfos=rciMapper.getRegAccoutCompanyInfoList(params);
		        		int reg_id=rInfos.get(0).getReg_id();
		        		SupplierRegaccountInfo sri= new SupplierRegaccountInfo();
		        		sri.setReg_id(reg_id);
		        		sri.setSupplier_id(Integer.parseInt(supplierParams.get("supplier_id").toString()));
		        		sriMapper.addSupplierRegaccountInfo(sri);//与所有者主账号建立联系
		        		
		        		//遍历保存到准入资料表
		        		List<AccessTempletElement> elements=ateMapper.getAccessTempletElementList(params);
		        		Map<String,Object> map=BeanUtil.beanToMap(item);//将java实体类对象转化为map对象
		        		for (AccessTempletElement accessTempletElement : elements) {
		        			if("companyIntroduction".equals(accessTempletElement.getRelated_basis())){//字段名不对应的
		        				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
				        		accInfoParams.put("e_id", accessTempletElement.getE_id());
				        		accInfoParams.put("content", map.get("company_introduction"));
				        		aaiService.addAccessApplicationInfo(accInfoParams);
		        			}
		        			else if("exportNum".equals(accessTempletElement.getRelated_basis())){
		        				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
				        		accInfoParams.put("e_id", accessTempletElement.getE_id());
				        		accInfoParams.put("content", map.get("export_num"));
				        		aaiService.addAccessApplicationInfo(accInfoParams);
		        			}
		        			else if("importNum".equals(accessTempletElement.getRelated_basis())){
		        				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
				        		accInfoParams.put("e_id", accessTempletElement.getE_id());
				        		accInfoParams.put("content", map.get("import_num"));
				        		aaiService.addAccessApplicationInfo(accInfoParams);
		        			}
		        			else if("companyArea".equals(accessTempletElement.getRelated_basis())){
		        				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
				        		accInfoParams.put("e_id", accessTempletElement.getE_id());
				        		accInfoParams.put("content", map.get("company_area"));
				        		aaiService.addAccessApplicationInfo(accInfoParams);
		        			}
		        			else if("factoryArea".equals(accessTempletElement.getRelated_basis())){
		        				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
				        		accInfoParams.put("e_id", accessTempletElement.getE_id());
				        		accInfoParams.put("content", map.get("factory_area"));
				        		aaiService.addAccessApplicationInfo(accInfoParams);
		        			}
		        			else if("schoolCoop".equals(accessTempletElement.getRelated_basis())){
		        				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
				        		accInfoParams.put("e_id", accessTempletElement.getE_id());
				        		accInfoParams.put("content", map.get("school_coop"));
				        		aaiService.addAccessApplicationInfo(accInfoParams);
		        			}
		        			else{//字段名对应的
		        				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
				        		accInfoParams.put("e_id", accessTempletElement.getE_id());
				        		accInfoParams.put("content", map.get(accessTempletElement.getRelated_basis()));
				        		aaiService.addAccessApplicationInfo(accInfoParams);
		        			}
						}
		        		//校验保存供应商银行账号信息
						if( bankAccountlist.size()>0){
							//通过验证，赋值完成，保存
							for(int j=0;j<bankAccountlist.size();j++){
								BankAccount account=bankAccountlist.get(j);
								if (account.getCompany_name().equals(item.getCpyname_cn())) {
									if(!flag){
										account.setCompany_id(company_id);
										account.setDefault_id(false);
										baMapper.addBankAccount(account);//保存到平台银行账号表
									}
									accountParams.put("account_name", account.getAccount_name());
									accountParams.put("account_code", account.getAccount_code());
									accountParams.put("default_id", 0);
									accountParams.put("account_sts", 0);
									accountParams.put("app_account_id", account.getAccount_id());
									accountParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
									aaService.addAccessAccount(accountParams);
								}
							}
						}
						//校验保存供应商银行账号信息
						if( invoiceTitlelist.size()>0){
							//通过验证，赋值完成，保存
							for(int j=0;j<invoiceTitlelist.size();j++){
								InvoiceTitle invoiceTitle=invoiceTitlelist.get(j);
								if (invoiceTitle.getCompany_name().equals(item.getCpyname_cn())) {
									if(!flag){
										invoiceTitle.setCompany_id(company_id);
										invoiceTitle.setDefault_id(false);
										itMapper.addInvoiceTitle(invoiceTitle);//保存到平台银行账号表
									}
									invoiceParams.put("invoice_title_name", invoiceTitle.getInvoice_title_name());
									invoiceParams.put("default_id", 0);
									invoiceParams.put("invoice_title_sts", 0);
									invoiceParams.put("app_invoice_title_id", invoiceTitle.getInvoice_title_id());
									invoiceParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
									aitMapper.addAccessInvoiceTitle(invoiceParams);
								}
							}
						}
						
						//校验保存供应商银行账号信息
						if( devicelist.size()>0){
							//通过验证，赋值完成，保存
							for(int j=0;j<devicelist.size();j++){
								Devicelist device=devicelist.get(j);
								if (device.getCompany_name().equals(item.getCpyname_cn())) {
									if (!flag) {
										device.setCompany_id(company_id);
										dlMapper.addDevicelist(device);//保存到平台银行账号表
									}
									deviceParams.put("deviceName", device.getDevice_name());
									deviceParams.put("specifications", device.getSpecifications());
									deviceParams.put("place",device.getPlace());
									deviceParams.put("price", device.getPrice());
									deviceParams.put("buyDay", device.getBuy_day());
									deviceParams.put("advanced", device.getAdvanced());
									deviceParams.put("deviceNum", device.getDevice_num());
									deviceParams.put("AppDeviceId", device.getDevice_id());
									deviceParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
									adlMapper.addAccessApplicationDevicelist(deviceParams);
								}
							}
						}
						//校验保存供应商银行账号信息
						if( competitorlist.size()>0){
							//通过验证，赋值完成，保存
							for(int j=0;j<competitorlist.size();j++){
								Competitor competitor=competitorlist.get(j);
								if (competitor.getCompany_name().equals(item.getCpyname_cn())) {
									if (!flag) {
										competitor.setCompany_id(company_id);
										competitorMapper.addCompetitor(competitor);
									}
									competitorParams.put("competitorName", competitor.getCompetitor_name());
									competitorParams.put("AppCompetitorId", competitor.getCompetitor_id());
									competitorParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
									aacMapper.addAccessApplicationCompetitor(competitorParams);
								}
							}
						}
						//校验保存供应商银行账号信息
						if( goodslist.size()>0){
							//通过验证，赋值完成，保存
							for(int j=0;j<goodslist.size();j++){
								Goods goods=goodslist.get(j);
								if (goods.getCompany_name().equals(item.getCpyname_cn())) {
									if (!flag) {
										goods.setCompany_id(company_id);
										goodsMapper.addGoods(goods);
									}
									goodsParams.put("goodsName", goods.getGoods_name());
									goodsParams.put("goodsBrand", goods.getGoods_brand());
									goodsParams.put("AppGoodsId", goods.getGoods_id());
									goodsParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
									aagMapper.addAccessApplicationGoods(goodsParams);
								}
							}
						}
						//校验保存供应商银行账号信息
						if( metariallist.size()>0){
							//通过验证，赋值完成，保存
							for(int j=0;j<metariallist.size();j++){
								Metarial metarial=metariallist.get(j);
								if (metarial.getCompany_name().equals(item.getCpyname_cn())) {
									if (!flag) {
										metarial.setCompany_id(company_id);
										metarialMapper.addMetarial(metarial);
									}
									metarialParams.put("materialName", metarial.getMaterial_name());
									metarialParams.put("materialBrand", metarial.getMaterial_brand());
									metarialParams.put("AppMaterialId", metarial.getMaterial_id());
									metarialParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
									aamMapper.addAccessApplicationMetarial(metarialParams);
								}
							}
						}
						//校验保存供应商银行账号信息
						if( customerlist.size()>0){
							//通过验证，赋值完成，保存
							for(int j=0;j<customerlist.size();j++){
								MainCustomer customer=customerlist.get(j);
								if (customer.getCompany_name().equals(item.getCpyname_cn())) {
									if (!flag) {
										customer.setCompany_id(company_id);
										customerMapper.addMainCustomer(customer);
									}
									customerParams.put("customerName", customer.getCustomer_name());
									customerParams.put("AppCustomerId", customer.getCustomer_id());
									customerParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
									aacuMapper.addAccessApplicationCustomer(customerParams);
								}
							}
						}
					}
					json.put("message", "上传解析完成");
				}
	}
	
	private List<MainCustomer> getCustomerListFromExcel(File finalFile,
			JSONObject json, HttpServletRequest request) throws Exception{
		List<MainCustomer> items=new ArrayList<MainCustomer>();
	     String fileName=finalFile.getName();
	     
		 boolean isE2007 = false;    //判断是否是excel2007格式  
	     if(fileName.endsWith("xlsx")){
	     	isE2007 = true;
	     }
      InputStream input =new FileInputStream(finalFile);
      Workbook wb  = null;  
      //根据文件格式(2003或者2007)来初始化  
      if(isE2007){  
          wb = new XSSFWorkbook(input);
      }else{  
          wb = new HSSFWorkbook(input);
      }
      Sheet sheet = wb.getSheetAt(6);//获得第 七个表单  
      for(Row row: sheet) {  //获得行数据
          //跳过第一行，一般第一行是表头，
          if(row.getRowNum()>2){
        	MainCustomer item=new MainCustomer();	
         	if(row.getCell(0)==null || row.getCell(1)==null){
         		json.put("success", false);
         		json.put("message", "表单7第"+ (row.getRowNum()+1) +"行，有数据未输入！");
         		break;
         	}
         	row.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
         	row.getCell(1).setCellType(Cell.CELL_TYPE_STRING);
         	item.setCustomer_name((row.getCell(0)==null)?"":row.getCell(0).getStringCellValue());
         	item.setCompany_name((row.getCell(1)==null)?"":row.getCell(1).getStringCellValue());
           items.add(item);
          }else if(row.getRowNum()==1){//检测表头
          	String name=(row.getCell(0)==null)?"":row.getCell(0).toString().trim();
          	if(!"供应商主要客户".equals(name)){
          		json.put("success", false);
          		json.put("message", "请使用下载的模板");
          		break;
          	}
          }
      } 
      input.close();
	   return items;
	}
	private List<Metarial> getMetarialListFromExcel(File finalFile,
			JSONObject json, HttpServletRequest request) throws Exception{
		List<Metarial> items=new ArrayList<Metarial>();
	     String fileName=finalFile.getName();
	     
		 boolean isE2007 = false;    //判断是否是excel2007格式  
	     if(fileName.endsWith("xlsx")){
	     	isE2007 = true;
	     }
      InputStream input =new FileInputStream(finalFile);
      Workbook wb  = null;  
      //根据文件格式(2003或者2007)来初始化  
      if(isE2007){  
          wb = new XSSFWorkbook(input);
      }else{  
          wb = new HSSFWorkbook(input);
      }
      Sheet sheet = wb.getSheetAt(5);     //获得第六个表单  
      for(Row row: sheet) {  //获得行数据
          //跳过第一行，一般第一行是表头，
          if(row.getRowNum()>2){
        	  Metarial item=new Metarial();	
         	if(row.getCell(0)==null || row.getCell(1)==null || row.getCell(2)==null ){
         		json.put("success", false);
         		json.put("message", "表单6第"+ (row.getRowNum()+1) +"行，有数据未输入！");
         		break;
         	}
         	row.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
         	row.getCell(1).setCellType(Cell.CELL_TYPE_STRING);
         	row.getCell(2).setCellType(Cell.CELL_TYPE_STRING);
         	item.setMaterial_name((row.getCell(0)==null)?"":row.getCell(0).getStringCellValue());
         	item.setMaterial_brand((row.getCell(1)==null)?"":row.getCell(1).getStringCellValue());
         	item.setCompany_name((row.getCell(2)==null)?"":row.getCell(2).getStringCellValue());
           items.add(item);
          }else if(row.getRowNum()==1){//检测表头
          	String name=(row.getCell(0)==null)?"":row.getCell(0).toString().trim();
          	if(!"供应商主要原材料".equals(name)){
          		json.put("success", false);
          		json.put("message", "请使用下载的模板");
          		break;
          	}
          }
      } 
      input.close();
	   return items;
	}
	private List<Competitor> getCompetitorListFromExcel(File finalFile,
			JSONObject json, HttpServletRequest request)  throws Exception{
		List<Competitor> items=new ArrayList<Competitor>();
	     String fileName=finalFile.getName();
	     
		 boolean isE2007 = false;    //判断是否是excel2007格式  
	     if(fileName.endsWith("xlsx")){
	     	isE2007 = true;
	     }
     InputStream input =new FileInputStream(finalFile);
     Workbook wb  = null;  
     //根据文件格式(2003或者2007)来初始化  
     if(isE2007){  
         wb = new XSSFWorkbook(input);
     }else{  
         wb = new HSSFWorkbook(input);
     }
     Sheet sheet = wb.getSheetAt(7);     //获得第八个表单  
     for(Row row: sheet) {  //获得行数据
         //跳过第一行，一般第一行是表头，
         if(row.getRowNum()>2){
        	 Competitor item=new Competitor();	
        	if(row.getCell(0)==null || row.getCell(1)==null){
        		json.put("success", false);
        		json.put("message", "表单8第"+ (row.getRowNum()+1) +"行，有数据未输入！");
        		break;
        	}
        	row.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
        	row.getCell(1).setCellType(Cell.CELL_TYPE_STRING);
        	item.setCompetitor_name((row.getCell(0)==null)?"":row.getCell(0).getStringCellValue());
        	item.setCompany_name((row.getCell(1)==null)?"":row.getCell(1).getStringCellValue());
          items.add(item);
         }else if(row.getRowNum()==1){//检测表头
         	String name=(row.getCell(0)==null)?"":row.getCell(0).toString().trim();
         	if(!"供应商主要竞争对手".equals(name)){
         		json.put("success", false);
         		json.put("message", "请使用下载的模板");
         		break;
         	}
         }
     } 
     input.close();
	   return items;
	}
	private List<Goods> getGoodsListFromExcel(File finalFile,
			JSONObject json, HttpServletRequest request)throws Exception {
		List<Goods> items=new ArrayList<Goods>();
	     String fileName=finalFile.getName();
	     
		 boolean isE2007 = false;    //判断是否是excel2007格式  
	     if(fileName.endsWith("xlsx")){
	     	isE2007 = true;
	     }
     InputStream input =new FileInputStream(finalFile);
     Workbook wb  = null;  
     //根据文件格式(2003或者2007)来初始化  
     if(isE2007){  
         wb = new XSSFWorkbook(input);
     }else{  
         wb = new HSSFWorkbook(input);
     }
     Sheet sheet = wb.getSheetAt(4);     //获得第五个表单  
     for(Row row: sheet) {  //获得行数据
         //跳过第一行，一般第一行是表头，
         if(row.getRowNum()>2){
        	 Goods item=new Goods();	
        	if(row.getCell(0)==null || row.getCell(1)==null || row.getCell(2)==null ){
        		json.put("success", false);
        		json.put("message", "表单5第"+ (row.getRowNum()+1) +"行，有数据未输入！");
        		break;
        	}
        	row.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
        	row.getCell(1).setCellType(Cell.CELL_TYPE_STRING);
        	row.getCell(2).setCellType(Cell.CELL_TYPE_STRING);
        	item.setGoods_name((row.getCell(0)==null)?"":row.getCell(0).getStringCellValue());
        	item.setGoods_brand((row.getCell(1)==null)?"":row.getCell(1).getStringCellValue());
        	item.setCompany_name((row.getCell(2)==null)?"":row.getCell(2).getStringCellValue());
          items.add(item);
         }else if(row.getRowNum()==1){//检测表头
         	String name=(row.getCell(0)==null)?"":row.getCell(0).toString().trim();
         	if(!"供应商主要产品".equals(name)){
         		json.put("success", false);
         		json.put("message", "请使用下载的模板");
         		break;
         	}
         }
     } 
     input.close();
	   return items;
	}
	private List<Devicelist> getDeviceListFromExcel(File finalFile,
			JSONObject json, HttpServletRequest request) throws Exception{
		List<Devicelist> items=new ArrayList<Devicelist>();
	     String fileName=finalFile.getName();
	     
		 boolean isE2007 = false;    //判断是否是excel2007格式  
	     if(fileName.endsWith("xlsx")){
	     	isE2007 = true;
	     }
      InputStream input =new FileInputStream(finalFile);
      Workbook wb  = null;  
      //根据文件格式(2003或者2007)来初始化  
      if(isE2007){  
          wb = new XSSFWorkbook(input);
      }else{  
          wb = new HSSFWorkbook(input);
      }
      Sheet sheet = wb.getSheetAt(3);     //获得第四个表单  
      for(Row row: sheet) {  //获得行数据
          //跳过第一行，一般第一行是表头，
          if(row.getRowNum()>2){
        	  Devicelist item=new Devicelist();	
         	if(row.getCell(0)==null || row.getCell(5)==null || row.getCell(7)==null ){
         		json.put("success", false);
         		json.put("message", "表单4第"+ (row.getRowNum()+1) +"行，有数据未输入！");
         		break;
         	}
         	row.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
         	if(row.getCell(1)!=null){
         		row.getCell(1).setCellType(Cell.CELL_TYPE_STRING);
         	}
         	if(row.getCell(2)!=null){
         		row.getCell(2).setCellType(Cell.CELL_TYPE_STRING);
         	}
         	if(row.getCell(6)!=null){
         		row.getCell(6).setCellType(Cell.CELL_TYPE_STRING);
         	}
         	row.getCell(7).setCellType(Cell.CELL_TYPE_STRING);
         	item.setDevice_name((row.getCell(0)==null)?"":row.getCell(0).getStringCellValue());
         	item.setSpecifications((row.getCell(1)==null)?"":row.getCell(1).getStringCellValue());
         	item.setPlace((row.getCell(2)==null)?"":row.getCell(2).getStringCellValue());
         	item.setPrice((row.getCell(3)==null)?0:row.getCell(3).getNumericCellValue());
         	item.setBuy_day((row.getCell(4)==null)?null:row.getCell(4).getDateCellValue());
         	item.setDevice_num((int) ((row.getCell(5)==null)?0:row.getCell(5).getNumericCellValue()));
         	item.setAdvanced((row.getCell(6)==null)?"":row.getCell(6).getStringCellValue());
         	item.setCompany_name((row.getCell(7)==null)?"":row.getCell(7).getStringCellValue());
           items.add(item);
          }else if(row.getRowNum()==1){//检测表头
          	String name=(row.getCell(0)==null)?"":row.getCell(0).toString().trim();
          	if(!"供应商设备明细".equals(name)){
          		json.put("success", false);
          		json.put("message", "请使用下载的模板");
          		break;
          	}
          }
      } 
      input.close();
	   return items;
	}
	private List<InvoiceTitle> getTitleListFromExcel(File finalFile,
			JSONObject json, HttpServletRequest request) throws Exception {
		List<InvoiceTitle> items=new ArrayList<InvoiceTitle>();
	     String fileName=finalFile.getName();
	     
		 boolean isE2007 = false;    //判断是否是excel2007格式  
	     if(fileName.endsWith("xlsx")){
	     	isE2007 = true;
	     }
      InputStream input =new FileInputStream(finalFile);
      Workbook wb  = null;  
      //根据文件格式(2003或者2007)来初始化  
      if(isE2007){  
          wb = new XSSFWorkbook(input);
      }else{  
          wb = new HSSFWorkbook(input);
      }
      Sheet sheet = wb.getSheetAt(2);     //获得第三个表单  
      for(Row row: sheet) {  //获得行数据
          //跳过第一行，一般第一行是表头，
          if(row.getRowNum()>2){
        	InvoiceTitle item=new InvoiceTitle();	
         	if(row.getCell(0)==null || row.getCell(1)==null){
         		json.put("success", false);
         		json.put("message", "表单3第"+ (row.getRowNum()+1) +"行，有数据未输入！");
         		break;
         	}
         	row.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
         	row.getCell(1).setCellType(Cell.CELL_TYPE_STRING);
         	item.setInvoice_title_name((row.getCell(0)==null)?"":row.getCell(0).getStringCellValue());
         	item.setCompany_name((row.getCell(1)==null)?"":row.getCell(1).getStringCellValue());
           items.add(item);
          }else if(row.getRowNum()==1){//检测表头
          	String name=(row.getCell(0)==null)?"":row.getCell(0).toString().trim();
          	if(!"供应商发票抬头".equals(name)){
          		json.put("success", false);
          		json.put("message", "请使用下载的模板");
          		break;
          	}
          }
      } 
      input.close();
	   return items;
	}
	private List<BankAccount> getAccountListFromExcel(File finalFile,
			JSONObject json, HttpServletRequest request) throws Exception{
		List<BankAccount> items=new ArrayList<BankAccount>();
	     String fileName=finalFile.getName();
	     
		 boolean isE2007 = false;    //判断是否是excel2007格式  
	     if(fileName.endsWith("xlsx")){
	     	isE2007 = true;
	     }
       InputStream input =new FileInputStream(finalFile);
       Workbook wb  = null;  
       //根据文件格式(2003或者2007)来初始化  
       if(isE2007){  
           wb = new XSSFWorkbook(input);
       }else{  
           wb = new HSSFWorkbook(input);
       }
       Sheet sheet = wb.getSheetAt(1);     //获得第二个表单  
       for(Row row: sheet) {  //获得行数据
           //跳过第一行，一般第一行是表头，
           if(row.getRowNum()>2){
        	BankAccount item=new BankAccount();	
          	if(row.getCell(0)==null || row.getCell(1)==null || row.getCell(2)==null ){
          		json.put("success", false);
          		json.put("message", "表单2第"+ (row.getRowNum()+1) +"行，有数据未输入！");
          		break;
          	}
          	row.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
          	row.getCell(1).setCellType(Cell.CELL_TYPE_STRING);
          	row.getCell(2).setCellType(Cell.CELL_TYPE_STRING);
          	item.setAccount_name((row.getCell(0)==null)?"":row.getCell(0).getStringCellValue());
          	item.setAccount_code((row.getCell(1)==null)?"":row.getCell(1).getStringCellValue());
          	item.setCompany_name((row.getCell(2)==null)?"":row.getCell(2).getStringCellValue());
            items.add(item);
           }else if(row.getRowNum()==1){//检测表头
           	String name=(row.getCell(0)==null)?"":row.getCell(0).toString().trim();
           	if(!"供应商银行账号".equals(name)){
           		json.put("success", false);
           		json.put("message", "请使用下载的模板");
           		break;
           	}
           }
       } 
       input.close();
	   return items;
	}
	/**
	 * @Description:解析EXCEL
	 * SupplierFileService
	 * getListFromExcel
	 * @param finalFile
	 * @param json
	 * @param request
	 * @return
	 * @throws Exception List<SupplierFile>
	 * @author yukai
	 * 2016-10-13 下午4:11:14
	 */
	private List<SupplierFile> getSupplierListFromExcel(File finalFile,
			JSONObject json, HttpServletRequest request)  throws Exception{
		List<SupplierFile> items=new ArrayList<SupplierFile>();
	     String fileName=finalFile.getName();
	     
		 boolean isE2007 = false;    //判断是否是excel2007格式  
	     if(fileName.endsWith("xlsx")){
	     	isE2007 = true;
	     }
        InputStream input =new FileInputStream(finalFile);
        Workbook wb  = null;  
        //根据文件格式(2003或者2007)来初始化  
        if(isE2007){  
            wb = new XSSFWorkbook(input);
        }else{  
            wb = new HSSFWorkbook(input);
        }
        Sheet sheet = wb.getSheetAt(0);     //获得第一个表单  
        if(!sheet.iterator().hasNext()){
       	 json.put("success", false);
       	 json.put("message", "excel为空");
       	 return items; 
        }
        int trLength =sheet.getLastRowNum();
        if (trLength<=2) {
       	json.put("success", false);
			json.put("message", "没有数据");
        }
        for(Row row: sheet) {  //获得行数据
            //跳过第一行，一般第一行是表头，
            if(row.getRowNum()>2){
            SupplierFile item=new SupplierFile();	
           	if((row.getCell(0)==null ||row.getCell(0).toString().equals(""))
           			&& (row.getCell(1)==null||row.getCell(1).toString().equals("")) 
           			&& (row.getCell(2)==null||row.getCell(2).toString().equals("")) 
           			&&(row.getCell(3)==null||row.getCell(3).toString().equals(""))
           			&&(row.getCell(4)==null||row.getCell(4).toString().equals(""))
           			&&(row.getCell(5)==null||row.getCell(5).toString().equals(""))
           			&&(row.getCell(6)==null||row.getCell(6).toString().equals(""))
           			&&(row.getCell(7)==null||row.getCell(7).toString().equals(""))
           			&&(row.getCell(8)==null||row.getCell(8).toString().equals(""))
           			&&(row.getCell(9)==null||row.getCell(9).toString().equals(""))
           			&&(row.getCell(10)==null||row.getCell(10).toString().equals(""))
           			&&(row.getCell(11)==null||row.getCell(11).toString().equals(""))){
           		if(row.getRowNum()==3){
           			json.put("success", false);
           			json.put("message", "没有数据");
           		}
           		break;//最后一行
           	}
           	if(row.getCell(0)==null || row.getCell(1)==null || row.getCell(2)==null || row.getCell(3)==null||
           	   row.getCell(4)==null || row.getCell(5)==null || row.getCell(6)==null || row.getCell(7)==null||
           	   row.getCell(8)==null || row.getCell(9)==null || row.getCell(10)==null ){
           		json.put("success", false);
           		json.put("message", "第"+ (row.getRowNum()+1) +"行，有数据未输入！");
           		break;
           	}
           	row.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
           	row.getCell(1).setCellType(Cell.CELL_TYPE_STRING);
           	row.getCell(2).setCellType(Cell.CELL_TYPE_STRING);
           	row.getCell(3).setCellType(Cell.CELL_TYPE_STRING);
           	row.getCell(4).setCellType(Cell.CELL_TYPE_STRING);
           	row.getCell(5).setCellType(Cell.CELL_TYPE_STRING);
           	row.getCell(6).setCellType(Cell.CELL_TYPE_STRING);
           	row.getCell(8).setCellType(Cell.CELL_TYPE_STRING);
           	//if(row.getCell(9)!=null){
           		row.getCell(9).setCellType(Cell.CELL_TYPE_STRING);
          // 	}
           	//if(row.getCell(10)!=null){
           		row.getCell(10).setCellType(Cell.CELL_TYPE_STRING);
           //	}
           	if(row.getCell(11)!=null){
           		row.getCell(11).setCellType(Cell.CELL_TYPE_STRING);
           	}
        	item.setCpyname_cn((row.getCell(0)==null)?"":row.getCell(0).getStringCellValue());
           	item.setCorporation((row.getCell(1)==null)?"":row.getCell(1).getStringCellValue());
           	item.setContact_addr((row.getCell(2)==null)?"":row.getCell(2).getStringCellValue());
           	item.setContacts((row.getCell(3)==null)?"":row.getCell(3).getStringCellValue());
           	item.setM_phone((row.getCell(4)==null)?"":row.getCell(4).getStringCellValue());
           	item.setClass_name((row.getCell(5)==null)?"":row.getCell(5).getStringCellValue());
           	item.setNature_name((row.getCell(6)==null)?"":row.getCell(6).getStringCellValue());
           	item.setReg_fund((row.getCell(7)==null)?0:row.getCell(7).getNumericCellValue());
           	item.setCurrency_name((row.getCell(8)==null)?"":row.getCell(8).getStringCellValue());
           	item.setReg_account((row.getCell(9)==null)?"":row.getCell(9).getStringCellValue());
           	item.setPassword((row.getCell(10)==null)?"":row.getCell(10).getStringCellValue());
           	item.setReg_email((row.getCell(11)==null)?"":row.getCell(11).getStringCellValue());
            items.add(item);
            }else if(row.getRowNum()==1){//检测表头
            	String name=(row.getCell(0)==null)?"":row.getCell(0).toString().trim();
            	if(!"供应商档案".equals(name)){
            		json.put("success", false);
            		json.put("message", "请使用下载的模板");
            		break;
            	}
            }
        } 
        input.close();
	    return items;
	}
	/**
	 * @Description:获取一个字符串的字节长度，中文2个字节，英文一个
	 * SupplierFileService
	 * getWordCount
	 * @param s
	 * @return int
	 * @author yukai
	 * 2016-10-13 下午4:11:30
	 */
	public int getWordCount(String s){
	    	s=s.replaceAll("[^\\x00-\\xff]", "**");
	    	int length=s.length();
	    	return length;
	}
	
	/**
	 * @Description:新增供应商档案
	 * SupplierFileService
	 * addSupplierFileInfo
	 * @param params void
	 * @author yukai
	 * 2016-10-18 下午3:23:10
	 * @throws InvocationTargetException 
	 * @throws InstantiationException 
	 * @throws IllegalAccessException 
	 * @throws Exception 
	 */
	public void addSupplierFileInfo(Map<String,Object> params) throws Exception{
		Map<String,Object> companyParams=new HashMap<String,Object>();
		Map<String,Object> supplierParams=new HashMap<String,Object>();
		Map<String,Object> accInfoParams=new HashMap<String,Object>();
		Map<String,Object> categoryParams=new HashMap<String,Object>();
		int owner_id=Integer.parseInt(params.get("owner_id").toString());
		int reg_id=Integer.parseInt(params.get("reg_id").toString());
		//SupplierFile item=(SupplierFile)BeanUtil.mapToObject(params,SupplierFile.class);
		int company_id=0;
		String companyName=params.get("cpyname_cn").toString();
		companyParams.put("companyName", companyName);
		List<PfCompanySimpleInfo> companys=companyForPlateFormService.getCompanyByName(companyParams);
		if(companys.size()>0){
			company_id=companys.get(0).getCompany_id();
			params.put("isSync", false);
		}else {
			params.put("apply_sts", 15);
			mapper.addSupplierFile1(params);//保存公司信息
			company_id=Integer.parseInt(params.get("company_id").toString());
			RegAccoutCompanyInfo rci=new RegAccoutCompanyInfo();
			rci.setCompany_id(company_id);
			rci.setReg_id(reg_id);
			rciMapper.addRegAccoutCompanyInfo(rci);
			params.put("isSync", true);
		}
		supplierParams.put("company_id", company_id);
		supplierParams.put("supplier_cpyname", companyName);
		supplierParams.put("source_type", 2);
		supplierParams.put("file_status", 0);
		supplierMapper.addSupplierFiles(supplierParams);//保存供应商档案
		
		companyParams.put("companyId", owner_id);
		String ownerName=companyForPlateFormService.getCompanyNameByCompanyId(companyParams);
		SupplierOwnerInfo soi=new SupplierOwnerInfo();
		soi.setCompany_id(owner_id);
		soi.setOwner_cpyname(ownerName);
		soi.setSupplier_id(Integer.parseInt(supplierParams.get("supplier_id").toString()));
		soiMapper.addSupplierOwnerInfo(soi);//与所有者建立联系
		
		companyParams.put("company_id", owner_id);
		List<RegAccoutCompanyInfo> rInfos=rciMapper.getRegAccoutCompanyInfoList(companyParams);
		int reg_id1=rInfos.get(0).getReg_id();
		SupplierRegaccountInfo sri= new SupplierRegaccountInfo();
		sri.setReg_id(reg_id1);
		sri.setSupplier_id(Integer.parseInt(supplierParams.get("supplier_id").toString()));
		sriMapper.addSupplierRegaccountInfo(sri);//与所有者主账号建立联系
		//遍历保存到准入资料表
		List<AccessTempletElement> elements=ateMapper.getAccessTempletElementList(params);
		for (AccessTempletElement accessTempletElement : elements) {
			if("companyIntroduction".equals(accessTempletElement.getRelated_basis())){//字段名不对应的
				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content", params.get("company_introduction"));
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else if("exportNum".equals(accessTempletElement.getRelated_basis())){
				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content", params.get("export_num"));
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else if("importNum".equals(accessTempletElement.getRelated_basis())){
				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content", params.get("import_num"));
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else if("companyArea".equals(accessTempletElement.getRelated_basis())){
				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content", params.get("company_area"));
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else if("factoryArea".equals(accessTempletElement.getRelated_basis())){
				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content", params.get("factory_area"));
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else if("schoolCoop".equals(accessTempletElement.getRelated_basis())){
				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content", params.get("school_coop"));
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else if("use_begintime".equals(accessTempletElement.getRelated_basis())){
				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content",params.get("use_begintime")!=null? params.get("use_begintime").toString()
    					.substring(0, 10):null);
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else if("use_endtime".equals(accessTempletElement.getRelated_basis())){
				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content",params.get("use_endtime")!=null? params.get("use_endtime").toString()
    					.substring(0, 10):null);
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else if("reg_addr_code".equals(accessTempletElement.getRelated_basis())){
				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content",params.get("contact_addr_code"));
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else{//字段名对应的
				accInfoParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content", params.get(accessTempletElement.getRelated_basis()));
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
		}
		ArrayList<Integer> arr1=(ArrayList<Integer>) params.get("category_id_1");
		ArrayList<Integer> arr2=(ArrayList<Integer>) params.get("category_id_2");
		ArrayList<Integer> arr3=(ArrayList<Integer>) params.get("category_id_3");
		categoryParams.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
		for (int i = 0; i < arr1.size(); i++) {
			categoryParams.put("category_id", arr1.get(i));
			aacaMapper.addAccessApplicationCategory(categoryParams);
		}
		for (int j = 0; j < arr2.size(); j++) {
			categoryParams.put("category_id", arr2.get(j));
			aacaMapper.addAccessApplicationCategory(categoryParams);
		}
		for (int k = 0; k < arr3.size(); k++) {
			categoryParams.put("category_id", arr3.get(k));
			aacaMapper.addAccessApplicationCategory(categoryParams);
		}
		params.put("company_id", company_id);
		params.put("supplier_id", Integer.parseInt(supplierParams.get("supplier_id").toString()));
	}
	
	/**
	 * @Description:修改供应商档案 SupplierFileService updateSupplierFileInfo
	 * @param params
	 *            void
	 * @author yukai 2016-10-18 下午3:23:14
	 */
	public void updateSupplierFileInfo(Map<String, Object> params)
			throws Exception {
		Map<String,Object> categoryParams=new HashMap<String,Object>();
		//SupplierFile item=(SupplierFile)BeanUtil.mapToObject(params,SupplierFile.class);
		if(params.containsKey("isSync")){					
		if(Boolean.parseBoolean(params.get("isSync").toString())){
			params.put("apply_sts", 15);
			mapper.updateSupplierFile1(params);
		}
		
		int supplier_id = Integer.valueOf(params.get("supplier_id").toString());
		ArrayList<Integer> arr1=(ArrayList<Integer>) params.get("category_id_1");
		ArrayList<Integer> arr2=(ArrayList<Integer>) params.get("category_id_2");
		ArrayList<Integer> arr3=(ArrayList<Integer>) params.get("category_id_3");
		categoryParams.put("supplier_id",supplier_id );
		aacaMapper.deleteAccessApplicationCategoryBySupplierId(categoryParams);
		for (int i = 0; i < arr1.size(); i++) {
			categoryParams.put("category_id", arr1.get(i));
			aacaMapper.addAccessApplicationCategory(categoryParams);
		}
		for (int j = 0; j < arr2.size(); j++) {
			categoryParams.put("category_id", arr2.get(j));
			aacaMapper.addAccessApplicationCategory(categoryParams);
		}
		for (int k = 0; k < arr3.size(); k++) {
			categoryParams.put("category_id", arr3.get(k));
			aacaMapper.addAccessApplicationCategory(categoryParams);
		}
		// 厂房面积
		String factory_area = params.get("factory_area").toString();
		params.put("factoryArea", factory_area);
		params.remove("factory_area");
		// 公司面积
		String company_area = params.get("company_area").toString();
		params.put("companyArea", company_area);
		params.remove("company_area");
		// 厂房使用起始日期 厂房使用结束日期
		if(params.get("use_begintime")!=null){
			String use_begintime = params.get("use_begintime").toString()
					.substring(0, 10);
			params.put("use_begintime", use_begintime);
		}
		if(params.get("use_endtime")!=null){
			String use_endtime = params.get("use_endtime").toString()
					.substring(0, 10);
			params.put("use_endtime", use_endtime);
		}
		AppInfoUtil(supplier_id, params);
		}
	}
    /**
     * @Description:更新准入资料表信息
     * SupplierFileService
     * AppInfoUtil
     * @param record_id
     * @param params void
     * @author yukai
     * 2016-10-18 下午4:33:57
     */
    public void  AppInfoUtil(int supplier_id,Map<String,Object> params){     
		Map<String,Object> para = new HashMap<String, Object>();
		params.remove("reg_addr_code");
		Iterator<Map.Entry<String, Object>> it = params.entrySet().iterator();
		while (it.hasNext()) {
			   Map.Entry<String, Object> entry = it.next();
			   para.put("related_basis", entry.getKey());
			   para.put("supplier_id", supplier_id);
			   if("cpyname_cn".equals(entry.getKey())){
				   para.put("related_basis", "cpyname_cn1");				   
			   }
			  //po数据库与平台数据库联系地址code字段不一致
			   if("contact_addr_code".equals(entry.getKey())){
				   para.put("related_basis", "reg_addr_code");
			   }
			   //获取e_id
			   Integer e_ids = aaiService.getEID(para);
			   if(e_ids != null){
				   int e_id = e_ids.intValue();
				   para.put("e_id", e_id);
				   if(entry.getValue()!=null){
				   para.put("content", entry.getValue().toString());
				   aaiService.updateAccessApplicationInfoBySupplierId(para);
				   }
			   }
		}				
	}
    
    public List<SupplierFile> getOwnerCompanyList(Map<String,Object> params) {
		return mapper.getOwnerCompanyList(params);
	}
    
}
