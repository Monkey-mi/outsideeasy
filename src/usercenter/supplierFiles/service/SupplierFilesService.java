package usercenter.supplierFiles.service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import manager.supplier.service.SupplierFileService;

import org.apache.ibatis.annotations.Param;
import org.apache.poi.ss.formula.functions.Now;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctc.wstx.util.DataUtil;
import com.sun.org.apache.bcel.internal.generic.NEW;

import platform.company.data.PfCompanyMapper;
import platform.company.model.PfCompanySimpleInfo;
import platform.company.service.CompanyForPlateFormService;
import platform.company.service.PfAttchedService;
import platform.company.service.PfBankAccountService;
import platform.company.service.PfCompetitorService;
import platform.company.service.PfDeviceService;
import platform.company.service.PfGoodsService;
import platform.company.service.PfInvoiceTitleService;
import platform.company.service.PfMainCustomerService;
import platform.company.service.PfMetarialService;

import common.user.model.LoginAccount;
import common.user.service.RegAccoutCompanyInfoService;

import usercenter.company.model.Company;
import usercenter.company.model.CompanySimpleInfo;
import usercenter.company.service.CompanyService;
import usercenter.saleManage.data.AccessTempletElementMapper;
import usercenter.saleManage.data.AdmittanceInviteMapper;
import usercenter.saleManage.data.CheckfactoryReportMapper;
import usercenter.saleManage.model.AccessRecord;
import usercenter.saleManage.model.AccessTempletElement;
import usercenter.saleManage.model.AdmittanceInvite;
import usercenter.saleManage.model.CheckFactoryCycle;
import usercenter.saleManage.model.Materialcheck;
import usercenter.saleManage.service.AccessAccountService;
import usercenter.saleManage.service.AccessApplicationAttchedService;
import usercenter.saleManage.service.AccessApplicationCategoryService;
import usercenter.saleManage.service.AccessApplicationCompetitorService;
import usercenter.saleManage.service.AccessApplicationCustomerService;
import usercenter.saleManage.service.AccessApplicationDevicelistService;
import usercenter.saleManage.service.AccessApplicationGoodsService;
import usercenter.saleManage.service.AccessApplicationInfoService;
import usercenter.saleManage.service.AccessApplicationMaterialService;
import usercenter.saleManage.service.AccessInvoiceTitleService;
import usercenter.saleManage.service.AccessRecordService;
import usercenter.saleManage.service.AccessTempletHeadService;
import usercenter.saleManage.service.CheckfactoryReportService;
import usercenter.saleManage.service.MaterialcheckService;
import usercenter.subAccount.data.SubAccountMapper;
import usercenter.subAccount.data.SubaccountSupplierInfoMapper;
import usercenter.subAccount.model.SubAccount;
import usercenter.supplierFiles.data.QualificationChangeAttachedMapper;
import usercenter.supplierFiles.data.QualificationChangeMapper;
import usercenter.supplierFiles.data.SupplierFilesMapper;
import usercenter.supplierFiles.data.SupplierOwnerInfoMapper;
import usercenter.supplierFiles.data.SupplierRegaccountInfoMapper;
import usercenter.supplierFiles.model.QualificationChange;
import usercenter.supplierFiles.model.QualificationChangeAttached;
import usercenter.supplierFiles.model.SupplierFiles;
import usercenter.supplierFiles.model.SupplierOutOprate;
import usercenter.supplierFiles.model.SupplierOwnerInfo;
import usercenter.supplierFiles.model.SupplierRegaccountInfo;
import usercenter.supplierFiles.model.SupplierTagInfo;
import util.BeanUtil;
import util.DataTrans;
import util.SessionUtil;



@Service
public class SupplierFilesService {
	@Autowired
	private SupplierFilesMapper mapper;
	@Autowired
	private QualificationChangeMapper qcMapper;
	@Autowired
	private QualificationChangeAttachedMapper qcaMapper;
	@Autowired
	private SupplierRegaccountInfoMapper sriMapper;
	@Autowired
	private SupplierOwnerInfoMapper soiMapper;
	@Autowired
	private PfCompanyMapper pfMapper;
	@Autowired
	private AdmittanceInviteMapper aiMapper;
	@Autowired
	private CheckfactoryReportService checkFacService;
	@Autowired
	private MaterialcheckService materialcheckService;
	@Autowired
	private SupplierTagInfoService tagInfoService;
	@Autowired
	private CompanyForPlateFormService cfpService;
	@Autowired
	private SupplierOutOprateService outOprateService;
	@Autowired
	private AccessRecordService accessRecordService;
	@Autowired
	private PfAttchedService pfAttchedService;
	@Autowired
	private AccessApplicationAttchedService accessApplicationAttchedService;
	@Autowired
	private SubaccountSupplierInfoMapper ssiMapper;
	@Autowired
	private SubAccountMapper saMapper;
	@Autowired
	private AccessTempletElementMapper ateMapper;
	@Autowired
	private AccessApplicationCategoryService aeService;
	@Autowired
	private AccessTempletHeadService accessTempletHeadService;
	@Autowired
	private RegAccoutCompanyInfoService regAccoutCompanyInfoService;
	@Autowired
	private AccessApplicationInfoService aaiService;
	@Autowired
	private SupplierFileService supplierFileService;
	@Autowired
	private PfDeviceService pfDeviceService;
	@Autowired
	private AccessApplicationDevicelistService accessApplicationDevicelistService;
	@Autowired
	private PfBankAccountService pfBankAccountService;
	@Autowired
	private AccessAccountService accessAccountService;
	@Autowired
	private PfInvoiceTitleService pfInvoiceTitleService;
	@Autowired
	private AccessInvoiceTitleService accessInvoiceTitleService;
	@Autowired
	private PfGoodsService pfGoodsService;
	@Autowired
	private AccessApplicationGoodsService accessApplicationGoodsService;
	@Autowired
	private PfMetarialService pfMetarialService;
	@Autowired
	private AccessApplicationMaterialService accessApplicationMaterialService;
	@Autowired
	private PfMainCustomerService pfMainCustomerService;
	@Autowired
	private AccessApplicationCustomerService accessApplicationCustomerService;
	@Autowired
	private PfCompetitorService pfCompetitorService;
	@Autowired
	private AccessApplicationCompetitorService accessApplicationCompetitorService;
	@Autowired
	private AccessApplicationCategoryService accessApplicationCategoryService;

	/**
	 * 通过拥有者ID查询供应商列表信息
	 * SupplierFilesService
	 * getSupplierFilseByOwnerId
	 * @param params 拥有者ID+供应商类型+(...args)
	 * @return List<Map<String,Object>>
	 * @author mishengliang
	 * 2016-7-29 上午10:45:34
	 */
	public List<Map<String, Object>> getSupplierFilseByOwnerId(Map<String, Object> params,Map<String, Object> respMap){
		List<Map<String, Object>> supplierList = new ArrayList<Map<String,Object>>();//返回的数据集合 当前公司数据
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		Integer supplierTotal = 0;
		Integer loginId = loginAccount.getLogin_id();//账号ID
		Integer accountType = loginAccount.getAccount_type();//账号类型
		Integer fileStatus = DataTrans.transToIntegerFromString(params.get("fileStatus") == null?null:(String)params.get("fileStatus"));
    	Integer nLimit = params.get("limit")!=null?Integer.parseInt(params.get("limit").toString()):0;
    	Integer npage = params.get("page")!=null?Integer.parseInt(params.get("page").toString()):0;
    	Integer start = nLimit * npage;
    	
		String[] provinceCodess = ((String)params.get("provinceCodes")).split(",");
		String[] cityCodess = ((String)params.get("cityCodes")).split(",");
		String[] categoryListss = ((String)params.get("categoryList")).split(",");
		Integer[] provinceCodes = new Integer[provinceCodess.length];
		Integer[] cityCodes = new Integer[cityCodess.length];
		Integer[] categoryLists = new Integer[categoryListss.length];
		if(provinceCodess[0] != ""){
			for(int i = 0; i < provinceCodes.length; i++){
				provinceCodes[i] = new Integer(provinceCodess[i]);
			}
		}else{
			provinceCodes = null;
		}
		if(cityCodess[0] != ""){
			for(int i = 0; i < cityCodes.length; i++){
				cityCodes[i] = new Integer(cityCodess[i]);
			}
		}else{
			cityCodes = null;
		}
		if(categoryListss[0] != ""){
			for(int i = 0; i < categoryLists.length; i++){
				categoryLists[i] = new Integer(categoryListss[i]);
			}
		}else{
			categoryLists = null;
		}
    	
    	params.put("limit", nLimit);//分页开始数据
    	params.put("start", start);//分页开始数据
		params.put("accountId", loginId);
		params.put("provinceCodes", provinceCodes);
		params.put("cityCodes", cityCodes);
		params.put("categoryLists", categoryLists);
		if(accountType == 0){//主账号
			supplierList = mapper.getSupplierFilseForMain(params);
			supplierTotal = mapper.getSupplierFilseForMainTotal(params);
			for(Map<String, Object> supplierInfoMap : supplierList){
				params.put("tagType", 0);//标签类型 公共标签，即主账号标签
				params.put("accountId", loginId);
				params.put("supplierId", supplierInfoMap.get("supplier_id"));
				List<SupplierTagInfo> tagInfoList = tagInfoService.getSupplierTag(params);//主账号标签 只获取主账号下的标签
				supplierInfoMap.put("tagInfoList", tagInfoList);
				
				getSupplierInfoWithType(params, fileStatus, supplierInfoMap);
			}
		}else if(accountType == 1){//子账号
			supplierList = mapper.getSupplierFilseForSub(params);
			supplierTotal = mapper.getSupplierFilseForSubTotal(params);
			for(Map<String, Object> supplierInfoMap : supplierList){
				params.put("tagType", 1);//标签类型 私有标签，即子账号标签
				params.put("accountId", loginId);
				params.put("supplierId", supplierInfoMap.get("supplier_id"));
				List<SupplierTagInfo> tagInfoListForSub = tagInfoService.getSupplierTag(params);//子账号下标签
				params.put("tagType", 0);//标签类型 公共标签，即主账号标签
				params.put("accountId", loginAccount.getParent_id());
				List<SupplierTagInfo> tagInfoListForMain = tagInfoService.getSupplierTag(params);//主账号下的标签
				tagInfoListForMain.addAll(tagInfoListForSub);//将两个list合并为一个
				supplierInfoMap.put("tagInfoList", tagInfoListForMain);
				
				getSupplierInfoWithType(params, fileStatus, supplierInfoMap);
			}
		}
		respMap.put("supplierTotal", supplierTotal);
		return supplierList;
	}

	/**
	 * @Description: 根据不同的供应商类别获取不同的信息填充到单元信息集合中
	 * SupplierFilesService
	 * getSupplierInfoWithType
	 * @param params 传递的参数
	 * @param fileStatus 供应商类别
	 * @param supplierInfoMap 单个供应商信息集合
	 * @author mishengliang
	 * 2016-8-20 下午6:11:55
	 */
	private void getSupplierInfoWithType(Map<String, Object> params, Integer fileStatus, Map<String, Object> supplierInfoMap) {
		if(fileStatus == 0){//0：现有供应商；
			getCheckFacInfo(supplierInfoMap);//获取验厂信息
			getMaterialInfo(supplierInfoMap);//获取物料信息
			//获取采购分类
			params.put("recordId", supplierInfoMap.get("record_id"));
			//List<Map<String, Object>> categoryList = mapper.getSupplierCategory(params);
			//supplierInfoMap.put("categoryList", categoryList);
			if(supplierInfoMap.get("record_id") != "" && supplierInfoMap.get("record_id") != null){
				String categoryStr=aeService.getAccessApplicationCategoryStr(supplierInfoMap);//获取采购分类，参数为record_id
				supplierInfoMap.put("categoryList", categoryStr);
			}
		}else if(fileStatus == 1){//1：备选供应商;
			//获取采购分类                                                                                   
			params.put("recordId", supplierInfoMap.get("record_id"));
			//List<Map<String, Object>> categoryList = mapper.getSupplierCategory(params);
			if(supplierInfoMap.get("record_id") != "" && supplierInfoMap.get("record_id") != null){
				String categoryStr=aeService.getAccessApplicationCategoryStr(supplierInfoMap);//获取采购分类，参数为record_id
				supplierInfoMap.put("categoryList", categoryStr);
			}
			if((Integer)supplierInfoMap.get("source_type") == 0){//邀请加入的情况
				Long supplierId = (Long)supplierInfoMap.get("supplier_id");
				Long companyId = (Long)supplierInfoMap.get("company_id");
				
				params.put("supplierId", supplierId);
				params.put("accepterId", companyId);
				AdmittanceInvite admitInvite= aiMapper.getAdmittanceInvitebySupplierIdAndaccepterId(params);
				if(admitInvite == null)
					return;
				Date now = new Date();
				Date inviteDate = admitInvite.getCreate_dt();
				
				Calendar calendar = Calendar.getInstance(); 
				calendar.setTime(inviteDate);
				calendar.add(Calendar.DATE, 7);//7天过期
				Date overDate = calendar.getTime();
				
				supplierInfoMap.put("isFast",admitInvite.getIs_fast());
				supplierInfoMap.put("accessStatu",admitInvite.getInvite_status());//接受状态 0：已发出；1：已接收；
				supplierInfoMap.put("isOverDate", 0);//默认 0为未过期
				if(admitInvite.getInvite_status() == 1){//已接收使用更新时间
					supplierInfoMap.put("lastSendDate", admitInvite.getAccept_dt());//上次发送邀请的日期
				}else{//已发出
					supplierInfoMap.put("lastSendDate", inviteDate);//上次发送邀请的日期
				}
				if(overDate.before(now) && admitInvite.getInvite_status() == 0){//通知过期：只有在未接受的状态下才会过期，接受状态下不会过期；
					supplierInfoMap.put("isOverDate", 1);//1 为过期
					supplierInfoMap.put("lastSendDate", overDate);//过期的日期
				}
			}
		}else if(fileStatus == 2){//2：淘汰供应商;
			Long supplierId = (Long)supplierInfoMap.get("supplier_id");
			params.put("supplierId", supplierId);
			List<SupplierOutOprate> outSupplierList = outOprateService.getSupplierOutOprateList(params);
			if(outSupplierList.size() > 0){
				supplierInfoMap.put("outSupplier", outSupplierList.get(0));
			}
		}
	}

	/**
	 * @Description: 获取验厂报告信息
	 * SupplierFilesService
	 * getCheckFacInfo
	 * @param supplierInfoMap void
	 * @author mishengliang
	 * 2016-8-10 上午11:34:32
	 */
	private void getCheckFacInfo(Map<String, Object> supplierInfoMap) {
		Integer noCheckFlag = supplierInfoMap.get("no_check") == null ? null : (Integer) supplierInfoMap.get("no_check");
		if(noCheckFlag != null && noCheckFlag == 0){//非免检 需要查找验厂报告 验厂周期
			Map<String, Object> paramsForCheckFac = new HashMap<String, Object>();
			paramsForCheckFac.put("supplier_id", supplierInfoMap.get("supplier_id"));
			paramsForCheckFac.put("limit_num", 1);//取最新的验厂报告数据
			
			List<Map<String, Object>> checkFacList = checkFacService.getCheckfactoryReportAndcheckCycleList(paramsForCheckFac);
			supplierInfoMap.put("checkFac", checkFacList.isEmpty() ? null : checkFacList.get(0));
		}
	}
	/**
	 * @Description:获取物料确认信息
	 * SupplierFilesService
	 * getMaterialInfo
	 * @param supplierInfoMap void
	 * @author yukai
	 * 2016-9-8 下午4:00:44
	 */
	private void getMaterialInfo(Map<String, Object> supplierInfoMap) {
			Map<String, Object> paramsForMaterial= new HashMap<String, Object>();
			paramsForMaterial.put("supplier_id", supplierInfoMap.get("supplier_id"));
			
			List<Materialcheck> materialList = materialcheckService.getMaterialcheckList(paramsForMaterial);
			supplierInfoMap.put("material", materialList);
	}
	
	/**
	 * @Description: 获取验厂周期基础数据
	 * SupplierFilesService
	 * getCheckCycle
	 * @return List<CheckFactoryCycle>
	 * @author mishengliang
	 * 2016-8-1 下午3:33:44
	 */
	public List<CheckFactoryCycle> getCheckCycle(){
		return mapper.getCheckCycle();
	}
	
	/**
	 * @Description:获取基本信息变更记录
	 * SupplierFilesService
	 * getQualificationChangeList
	 * @param params
	 * @return List<QualificationChange>
	 * @author yukai
	 * 2016-8-1 下午1:53:59
	 */
	public List<QualificationChange> getQualificationChangeList(Map<String, Object> params) {
		return qcMapper.getQualificationChangeList(params);
	}
	
	/**
	 * @Description:获取公司证照变更记录
	 * SupplierFilesService
	 * getQualificationChangeAttachedList
	 * @param params
	 * @return List<QualificationChangeAttached>
	 * @author yukai
	 * 2016-8-1 下午1:54:05
	 */
	public List<QualificationChangeAttached> getQualificationChangeAttachedList(Map<String, Object> params) {
		return qcaMapper.getQualificationChangeAttachedList(params);
	}
	
	/**
	 * @Description:新增供应商
	 * SupplierFilesService
	 * addSupplierFiles
	 * @param params void
	 * @author yukai
	 * 2016-8-10 下午2:46:16
	 */
	public void addSupplierFiles(Map<String, Object> params) {
		Map<String, Object> companyParams=new HashMap<String, Object>();
		Map<String, Object> supplierParams=new HashMap<String, Object>();
		Map<String, Object> brotherParams=new HashMap<String, Object>();
		Map<String, Object> inviteParams=new HashMap<String, Object>();
		Map<String, Object> subSupplierParams=new HashMap<String, Object>();
		String companyStr=params.get("companyStr").toString();
		int companyId=DataTrans.transToIntegerFromString(params.get("companyId").toString());
		PfCompanySimpleInfo companySimpleInfo1=pfMapper.getCompanyBaseInfo(companyId);
		LoginAccount loginAccount=SessionUtil.getCurrentPlateLoginAccount();
		int login_type=loginAccount.getAccount_type();
		int login_id=loginAccount.getLogin_id();
		String[] companyArray=null;
		if (companyStr.indexOf(";") > 0 && companyStr.indexOf("；") < 0) {
			companyArray = companyStr.split(";");
		} else if (companyStr.indexOf("；") > 0 && companyStr.indexOf(";") < 0) {
			companyArray = companyStr.split("；");
		} else if (companyStr.indexOf("；") > 0 && companyStr.indexOf(";") > 0) {
			List<String> list = new ArrayList<String>();
			String[] companyArray1 = companyStr.split("；");
			for (int i = 0; i < companyArray1.length; i++) {
				String str1 = companyArray1[i];
				String[] companyArray2 = str1.split(";");
				for (int j = 0; j < companyArray2.length; j++) {
					String str2 = companyArray2[j];
					list.add(str2);
				}
			}
			companyArray = list.toArray(new String[list.size()]);
		} else {
			companyArray = new String[] { companyStr };
		}
		for (int i = 0; i < companyArray.length; i++) {
			companyParams.put("companyName", companyArray[i]);
			PfCompanySimpleInfo companySimpleInfo= cfpService.getSupplierByName(companyParams).get(0);//根据企业名称查company_id,cpyname_cn
			brotherParams.put("company_id", companySimpleInfo.getCompany_id());
			if (login_type==0) {//主账号
				brotherParams.put("reg_id", login_id);
			}
			else if (login_type==1) {//子账号
				brotherParams.put("sa_id", login_id);
			}
			SupplierFiles supplierFiles=mapper.checkSupplierOfBrother(brotherParams);
			if (supplierFiles!=null) {
				if(supplierFiles.getFile_status()==0){//是兄弟公司现有供应商
					inviteParams.put("supplier_id", supplierFiles.getSupplier_id());
					inviteParams.put("sender_id", companyId);
					inviteParams.put("accepter_id",  companySimpleInfo.getCompany_id());
					inviteParams.put("invite_status", 0); 
					inviteParams.put("is_fast", 1); 
					aiMapper.addAdmittanceInvite(inviteParams);//新增邀请记录
				}else {
					supplierParams.put("supplier_id", supplierFiles.getSupplier_id());
					supplierParams.put("company_id", companyId);
					SupplierOwnerInfo supplierOwnerInfo=soiMapper.getSupplierOwnerInfoByCompanyId(supplierParams);
					if(supplierOwnerInfo!=null){//是我的备选供应商
						inviteParams.put("supplier_id", supplierFiles.getSupplier_id());
						inviteParams.put("sender_id", companyId);
						inviteParams.put("accepter_id",  companySimpleInfo.getCompany_id());
						inviteParams.put("invite_status", 0); 
						inviteParams.put("is_fast", 0); 
						aiMapper.addAdmittanceInvite(inviteParams);//新增邀请记录
					}else {//不是我的备选供应商
						SupplierOwnerInfo supplierOwnerInfo1=new SupplierOwnerInfo();
						supplierOwnerInfo1.setSupplier_id(supplierFiles.getSupplier_id());
						supplierOwnerInfo1.setCompany_id(companyId);
						supplierOwnerInfo1.setOwner_cpyname(companySimpleInfo1.getCpyname_cn());
						soiMapper.addSupplierOwnerInfo(supplierOwnerInfo1);//供应商与所有者公司建立联系
						inviteParams.put("supplier_id", supplierFiles.getSupplier_id());
						inviteParams.put("sender_id", companyId);
						inviteParams.put("accepter_id",  companySimpleInfo.getCompany_id());
						inviteParams.put("invite_status", 0); 
						inviteParams.put("is_fast", 0); 
						aiMapper.addAdmittanceInvite(inviteParams);//新增邀请记录
					}
				}
			}else {//不是兄弟公司供应商
				supplierParams.put("company_id", companySimpleInfo.getCompany_id());
				supplierParams.put("supplier_cpyname", companySimpleInfo.getCpyname_cn());
				supplierParams.put("file_status", 1);
				supplierParams.put("source_type", 0);
				mapper.addSupplierFiles(supplierParams);//新增备选供应商
				int supplier_id=DataTrans.transToIntegerFromString(supplierParams.get("supplier_id").toString());//获取新增的备选供应商的主键
				if (login_type==0) {//主账号
					SupplierRegaccountInfo supplierRegaccountInfo=new SupplierRegaccountInfo();
					supplierRegaccountInfo.setSupplier_id(supplier_id);
					supplierRegaccountInfo.setReg_id(login_id);
					sriMapper.addSupplierRegaccountInfo(supplierRegaccountInfo);//供应商与所有者主账号建立联系
				}
				else if (login_type==1) {//子账号
					subSupplierParams.put("supplier_id", supplier_id);
					subSupplierParams.put("is_delete", 0);
					subSupplierParams.put("sa_id", login_id);
					ssiMapper.addSubaccountSupplierInfo(subSupplierParams);//供应商与所有者子账号建立联系
					SubAccount subAccount=saMapper.getSubAccountBysa_id(subSupplierParams);//根据子账号ID找到主账号ID
					SupplierRegaccountInfo supplierRegaccountInfo=new SupplierRegaccountInfo();
					supplierRegaccountInfo.setSupplier_id(supplier_id);
					supplierRegaccountInfo.setReg_id(subAccount.getReg_id());
					sriMapper.addSupplierRegaccountInfo(supplierRegaccountInfo);//供应商与所有者主账号建立联系
				}
				SupplierOwnerInfo supplierOwnerInfo=new SupplierOwnerInfo();
				supplierOwnerInfo.setSupplier_id(supplier_id);
				supplierOwnerInfo.setCompany_id(companyId);
				supplierOwnerInfo.setOwner_cpyname(companySimpleInfo1.getCpyname_cn());
				soiMapper.addSupplierOwnerInfo(supplierOwnerInfo);//供应商与所有者公司建立联系
				inviteParams.put("supplier_id", supplier_id);
				inviteParams.put("sender_id", companyId);
				inviteParams.put("accepter_id",  companySimpleInfo.getCompany_id());
				inviteParams.put("invite_status", 0); 
				inviteParams.put("is_fast", 0); 
				aiMapper.addAdmittanceInvite(inviteParams);//新增邀请记录
			}
		}
	}
	
	/**
	 * @Description: 直接增加供应商档案
	 * SupplierFilesService
	 * addSupplierFilesDir
	 * @param params void
	 * @author mishengliang
	 * 2016-10-28 下午1:49:12
	 */
	public void addSupplierFilesDir(Map<String, Object> params){
		mapper.addSupplierFiles(params);
	}

	public String checkCompany(Map<String, Object> params) {
		Map<String, Object> companyParams=new HashMap<String, Object>();
		Map<String, Object> supplierParams=new HashMap<String, Object>();
		Map<String, Object> recordParams=new HashMap<String, Object>();
		Map<String, Object> inviteParams=new HashMap<String, Object>();
		String message="";
		String companyStr=params.get("companyStr").toString();
		int companyId=DataTrans.transToIntegerFromString(params.get("companyId").toString());
		String[] companyArray=null;
		if (companyStr.indexOf(";") > 0 && companyStr.indexOf("；") < 0) {
			companyArray = companyStr.split(";");
		} else if (companyStr.indexOf("；") > 0 && companyStr.indexOf(";") < 0) {
			companyArray = companyStr.split("；");
		} else if (companyStr.indexOf("；") > 0 && companyStr.indexOf(";") > 0) {
			List<String> list = new ArrayList<String>();
			String[] companyArray1 = companyStr.split("；");
			for (int i = 0; i < companyArray1.length; i++) {
				String str1 = companyArray1[i];
				String[] companyArray2 = str1.split(";");
				for (int j = 0; j < companyArray2.length; j++) {
					String str2 = companyArray2[j];
					list.add(str2);
				}
			}
			companyArray = list.toArray(new String[list.size()]);
		} else {
			companyArray = new String[] { companyStr };
		}
		LoginAccount loginAccount=SessionUtil.getCurrentPlateLoginAccount();
		int login_type=loginAccount.getAccount_type();
		int login_id=loginAccount.getLogin_id();
		for (int i = 0; i < companyArray.length; i++) {
			companyParams.put("companyName", companyArray[i]);
			List<PfCompanySimpleInfo> companySimpleInfos= cfpService.getSupplierByName(companyParams);//根据企业名称查company_id,cpyname_cn
			if (companySimpleInfos.size()==0) {
				message+=companyArray[i]+"不存在或未认证;<br/>";
			}else {
				if(companySimpleInfos.get(0).getCompany_id()==companyId){
					message+="<p style='text-align:left'>你不能邀请自己成为供应商.</p><br/>";
				}else{
					supplierParams.put("company_id", companySimpleInfos.get(0).getCompany_id());
					supplierParams.put("owner_id", companyId);
					SupplierFiles supplierFiles=mapper.checkSupplierExist(supplierParams);
					if (supplierFiles!=null) {
						message+=companyArray[i]+"已经是你的供应商;<br/>";
					}
					/*brotherParams.put("company_id", companySimpleInfos.get(0).getCompany_id());
					brotherParams.put("reg_id", reg_id);
					SupplierFiles supplierFiles1=mapper.checkSupplierOfBrother(brotherParams);
					if (supplierFiles1!=null&&supplierFiles1.getFile_status()==1) {//是兄弟公司备选供应商
						message+=companyArray[i]+"已经是你兄弟公司的备选供应商;";
					}*/
					inviteParams.put("accepter_id", companySimpleInfos.get(0).getCompany_id());
					if (login_type==0) {//主账号
						inviteParams.put("reg_id", login_id);
					}
					else if (login_type==1) {//子账号
						inviteParams.put("sa_id", login_id);
					}
					AdmittanceInvite admittanceInvite= aiMapper.checkInviteExist(inviteParams);
					if (admittanceInvite!=null) {
							message+=companyArray[i]+"你或你的兄弟公司已向对方发送邀请,等待对方接受;<br/>";
					}
					recordParams.put("submit_id", companySimpleInfos.get(0).getCompany_id());
					if (login_type==0) {//主账号
						recordParams.put("reg_id", login_id);
					}
					else if (login_type==1) {//子账号
						recordParams.put("sa_id", login_id);
					}
					AccessRecord accessRecord=accessRecordService.checkRecordExist(recordParams);
					if (accessRecord!=null) {
						if (accessRecord.getReceive_invite_id()!=null) {
							message+=companyArray[i]+"已接受你或你的兄弟公司的邀请;<br/>";
						}else {
							message+=companyArray[i]+"已主动申请成为你或你的兄弟公司的供应商;<br/>";
						}
					}
				}
			}
		}
		return message;
	}
	

	/**
	 * @Description: 批量通过ID改变供应商状态
	 * SupplierFilesService
	 * batchUpdateSupplierStatusById
	 * @param params void
	 * @author mishengliang
	 * 2016-9-27 下午2:55:39
	 */
	public void batchUpdateSupplierStatusById(Map<String, Object> params){
		String fileStatus = (String)params.get("fileStatus");
		String[] supplierIdss = ((String)params.get("supplierIds")).split(",");
		for(int i = 0; i < supplierIdss.length; i++){
			Map<String, Object> paramsForSingle = new HashMap<String, Object>();
			paramsForSingle.put("supplierId", supplierIdss[i]);
			paramsForSingle.put("fileStatus", fileStatus);
			paramsForSingle.put("elimitateReason",params.get("elimitateReason"));
			updateSupplierStatusById(paramsForSingle);//更新状态位
		}
	}
	
	/**
	 * @Description: 通过ID改变供应商状态
	 * SupplierFilesService
	 * updateSupplierStatusById
	 * @param params void
	 * @author mishengliang
	 * 2016-8-14 下午3:18:38
	 */
	public void updateSupplierStatusById(Map<String, Object> params){
		mapper.updateSupplierStatusById(params);//更新状态位
		
		if(params.get("fileStatus") != null && DataTrans.transToIntegerFromString((String)params.get("fileStatus")) == 2){//如果是淘汰更新，则需要增加一条淘汰记录
			LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
			SupplierOutOprate supplierOut = new SupplierOutOprate();
			supplierOut.setOpreator_id(loginAccount.getLogin_id());
			supplierOut.setOpreator_name(loginAccount.getLogin_name());
			supplierOut.setSupplier_id(DataTrans.transToIntegerFromString((String)params.get("supplierId")));
			supplierOut.setOut_reason((String)params.get("elimitateReason"));
			supplierOut.setSource_type(1);//0:po端；1：平台
			outOprateService.addSupplierOutOprate(supplierOut);
		}
	}
	
	/**
	 * @Description:  逻辑删除供应商
	 * SupplierFilesService
	 * deleteSupplierById
	 * @param params void
	 * @author mishengliang
	 * 2016-8-20 下午2:58:54
	 */
	public void deleteSupplierById(Map<String, Object> params){
		Integer supplierId = new Integer((String)params.get("supplierId"));
		Integer isDelete =   DataTrans.transToIntegerFromString((String)params.get("isDelete"));
		Integer[] supplierIds = {supplierId};
		deleteSupplierByIdCommon(supplierIds,isDelete);
	}
	public void batchDeleteSupplierById(Map<String, Object> params){
		Integer isDelete =   DataTrans.transToIntegerFromString((String)params.get("isDelete"));
		String[] supplierIdss = ((String)params.get("supplierIds")).split(",");
		Integer[] supplierIds = new Integer[supplierIdss.length];
		for(int i = 0; i < supplierIdss.length; i++){
			supplierIds[i] = new Integer(supplierIdss[i]);
		}
		deleteSupplierByIdCommon(supplierIds,isDelete);
	}
	public void deleteSupplierByIdCommon(Integer[] supplierIds,Integer isDelete){
		mapper.deleteSupplierById(supplierIds,isDelete);//更新状态位
	}
	
	/**
	 * @Description: 重新发送邀请
	 * SupplierFilesService
	 * inviteSupplierAgain
	 * @param params void
	 * @author mishengliang
	 * 2016-8-20 下午6:58:36
	 */
	public void inviteSupplierAgain(Map<String, Object> params){
		aiMapper.addAdmittanceInvite(params);
	}
	
	/**
	 * @Description: 获取免检供应商
	 * SupplierFilesService
	 * getExemptCheckSupplier
	 * @param params
	 * @return List<SupplierFiles>
	 * @author mishengliang
	 * 2016-8-22 下午5:02:20
	 */
	public List<SupplierFiles> getExemptCheckSupplier(Map<String, Object> params,Map<String, Object> respMap){
		Integer examptSuppliersTotal = mapper.getExemptCheckSupplierTotal(params);
		respMap.put("examptSuppliersTotal", examptSuppliersTotal);
		List<SupplierFiles> examptSupplierList = mapper.getExemptCheckSupplier(params);
		for(int i = 0; i<examptSupplierList.size(); i++){
			int recordId = examptSupplierList.get(i).getRecord_id();
			if(recordId != 0){
				params.put("record_id", recordId);
				String categoryStr=aeService.getAccessApplicationCategoryStr(params);//获取采购分类，参数为record_id
				examptSupplierList.get(i).setCateListStr(categoryStr);
			}
		}
		
		return examptSupplierList;
	}
	
	/**
	 * @Description: 批量设置免检供应商
	 * SupplierFilesService
	 * siteNoCheckSupplierFile
	 * @param params void
	 * @author mishengliang
	 * 2016-8-24 下午4:56:32
	 */
	public void siteNoCheckSupplierFile(Integer noCheckorId,String noCheckor,BigInteger[] supplierIds){
		mapper.siteNoCheckSupplierFile(noCheckorId,noCheckor,supplierIds);
	}
	
	/**
	 * @Description: 批量恢复验厂
	 * SupplierFilesService
	 * regainCheckFac
	 * @param params void
	 * @author mishengliang
	 * 2016-8-24 下午5:40:35
	 */
	public void regainCheckFac(BigInteger[] supplierIds){
		mapper.regainCheckFac(supplierIds);
	}
	
	public List<SupplierFiles> getLastThreeAccessSupplier(Map<String, Object> params){
		return mapper.getLastThreeAccessSupplier(params);
	}
	/**
	 * @Description:根据company_id修改是否变更状态
	 * SupplierFilesService
	 * updateAuthStsByCompanyId
	 * @param map void
	 * @author yukai
	 * 2016-9-29 下午5:28:11
	 */
	public void updateAuthStsByCompanyId(Map<String, Object> params) {
		mapper.updateAuthStsByCompanyId(params);
	}
	/**
	 * @Description:根据record_id获取supplier_id
	 * SupplierFilesService
	 * getSupplierIdByRecordId
	 * @param record_id
	 * @return Integer
	 * @author yukai
	 * 2016-10-13 上午9:08:04
	 */
	public Integer getSupplierIdByRecordId(Integer record_id){
		return mapper.getSupplierIdByRecordId(record_id);
	}

	public Integer checkSupplierExistInReg(Map<String, Object> params) {
		return mapper.checkSupplierExistInReg(params);
	}
	
	/**
	 * @Description:vip准入申请
	 * SupplierFilesService
	 * vipAccessApplication void
	 * @author mishengliang
	 * 2016-10-28 上午10:09:39
	 */
	public void vipAccessApplication(Map<String,Object> params){
		Date nowDate = new Date();
		Integer receiveCompanyId = DataTrans.transToIntegerFromString((String)params.get("receive_id"));
		Integer companyId = DataTrans.transToIntegerFromString((String)params.get("submit_id"));
		Integer accepterRegId = regAccoutCompanyInfoService.getRegIdByCpId(receiveCompanyId);//获取接收公司的所属主账号
		
		PfCompanySimpleInfo companyInfo = cfpService.getCompanySimpleInfo(companyId);//获取当前公司信息
		PfCompanySimpleInfo companyOwnerInfo = cfpService.getCompanySimpleInfo(receiveCompanyId);//获取接收公司信息
		
		Map<String, Object> useParams = new HashMap<String, Object>();
		useParams.put("companyId", companyId);
		useParams.put("receiveCompanyId", receiveCompanyId);
		List<Map<String, Object>> supplierUseList = getSupplierUseInfo(useParams);//获取当前要发送和接收公司的记录
		
		Map<String, Object> recordParams = new HashMap<String, Object>();
		recordParams.put("companyId", companyId);
		List<AccessRecord> recordList = accessRecordService.getAccessRecordList(recordParams);//获取recordId
		
		Integer recordId = recordList.get(0).getRecord_id();
		params.put("record_id", recordId);//流水ID
		params.put("access_status", 2);//已提交状态
		if(recordList.get(0).getFirst_submit_dt() == null){//首次提交
			params.put("first_submit_dt", nowDate);
		}else{//更新提交
			params.put("update_dt", nowDate);
		}
		params.put("orderby_dt", nowDate);//已提交状态
		accessRecordService.updateAccessRecord(params);//更新流水表状态
		
		if(supplierUseList.size() == 0){//新增   没有指定的记录
			//创建供应商表;供应商账号公司关联表
			params.put("record_id", recordId);
			params.put("company_id", companyId);
			params.put("supplier_cpyname", companyInfo.getCpyname_cn());
			params.put("source_type", 1);//主动申请
			params.put("file_status", 1);//备选供应商
			addSupplierFilesDir(params);
			Integer supplierId = Integer.parseInt(params.get("supplier_id").toString());
			
			SupplierOwnerInfo supplierOwnerInfo=new SupplierOwnerInfo();
			supplierOwnerInfo.setSupplier_id(supplierId);
			supplierOwnerInfo.setCompany_id(receiveCompanyId);
			supplierOwnerInfo.setOwner_cpyname(companyOwnerInfo.getCpyname_cn());
			soiMapper.addSupplierOwnerInfo(supplierOwnerInfo);//供应商与所有者公司建立联系
			
			SupplierRegaccountInfo supplierRegaccountInfo=new SupplierRegaccountInfo();
			supplierRegaccountInfo.setSupplier_id(supplierId);
			supplierRegaccountInfo.setReg_id(accepterRegId);
			sriMapper.addSupplierRegaccountInfo(supplierRegaccountInfo);//供应商与所有者主账号建立联系
			
			//准入资料表 
			Map<String, Object> simpleCompanyParams = BeanUtil.beanToMap(companyInfo);//公司的基本信息转为map
			addItemToAccessApplicationInfo(simpleCompanyParams,supplierId,recordId);//准入资料插入数据
			
			//准入申请附属信息新增
			addAttachInfo(recordId,supplierId,companyId);
		}else{//更新数据
			Integer supplierId = Integer.parseInt(supplierUseList.get(0).get("supplier_id").toString());
			params.put("supplierId", supplierId);
			params.put("cpName", companyInfo.getCpyname_cn());
			mapper.updateCpNameBySupplieId(params);//更新供应商名
			
			//准入资料表 各种附属表：更新
			Map<String, Object> simpleCompanyParams = BeanUtil.beanToMap(companyInfo);//公司的基本信息转为map
			transFormatMap(simpleCompanyParams);
			supplierFileService.AppInfoUtil(supplierId,simpleCompanyParams);
			//表中资料更新;先删除表中原有的数据，在增加进更新后的数据；
			deleteAttachInfo(recordId);
			addAttachInfo(recordId,supplierId,companyId);
		}
	}
	
	/**
	 * @Description: 准入申请附件表(8个)中增加记录
	 * SupplierFilesService
	 * addAttachInfo void
	 * @author mishengliang
	 * 2016-10-31 上午8:58:06
	 */
	private void addAttachInfo(Integer recordId,Integer supplierId,Integer companyId){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("company_id", companyId);
		params.put("companyId", companyId);
		//附件表
		List<Map<String, Object>> attachedList = pfAttchedService.getAttchedMapListByCpId(params);
		for(Map<String, Object> map : attachedList){
			Integer[] needntType = {18,19,20,21,22,23}; //基础信息中的文件类型
			Integer type = (Integer)map.get("file_type_id"); 
			if(Arrays.binarySearch(needntType, type) < 0){//不在指定的类型中需要插入
				map.put("record_id", recordId);
				map.put("supplier_id", supplierId);
				map.put("app_id", map.get("id"));
				accessApplicationAttchedService.addAccessApplicationAttched(map);
			}
		}
		//主要设备明细表
		List<Map<String, Object>> deviceList = pfDeviceService.getDeviceMapByCompanyId(params);
		for(Map<String, Object> map : deviceList){
			map.put("record_id", recordId);
			map.put("supplier_id", supplierId);
			map.put("AppDeviceId", map.get("device_id"));
			map.put("deviceName", map.get("device_name"));
			map.put("buyDay", map.get("buy_day"));
			map.put("deviceNum", map.get("device_num"));
			accessApplicationDevicelistService.addAccessApplicationDevicelist(map);
		}
		//银行账号
		List<Map<String, Object>> bankList = pfBankAccountService.getBankAccountMap(params);
		for(Map<String, Object> map : bankList){
			map.put("record_id", recordId);
			map.put("supplier_id", supplierId);
			map.put("app_account_id", map.get("account_id"));
			accessAccountService.addAccessAccount(map);
		}
		//抬头发票
		List<Map<String, Object>> invoiceTitleList = pfInvoiceTitleService.getInvoiceTitleNamesMap(params);
		for(Map<String, Object> map : invoiceTitleList){
			map.put("record_id", recordId);
			map.put("supplier_id", supplierId);
			map.put("app_invoice_title_id", map.get("invoice_title_id"));
			accessInvoiceTitleService.addAccessInvoiceTitle(map);
		}
		//公司产品
		List<Map<String, Object>> produceList = pfGoodsService.getSaleModelMapByCompanyId(params);
		for(Map<String, Object> map : produceList){
			map.put("record_id", recordId);
			map.put("supplier_id", supplierId);
			map.put("AppGoodsId", map.get("goods_id"));
			map.put("goodsName", map.get("goods_name"));
			map.put("goodsBrand", map.get("goods_brand"));
			accessApplicationGoodsService.addAccessApplicationGoods(map);
		}
		//公司原材料
		List<Map<String, Object>> materialList = pfMetarialService.getBuyModelMapByCompanyId(params);
		for(Map<String, Object> map : materialList){
			map.put("record_id", recordId);
			map.put("supplier_id", supplierId);
			map.put("AppMaterialId", map.get("material_id"));
			map.put("materialName", map.get("material_name"));
			map.put("materialBrand", map.get("material_brand"));
			accessApplicationMaterialService.addAccessApplicationMaterial(map);
		}
		//主要客户
		List<Map<String, Object>> customerList = pfMainCustomerService.getMainCustomerMapByCompanyId(params);
		for(Map<String, Object> map : customerList){
			map.put("record_id", recordId);
			map.put("supplier_id", supplierId);
			map.put("AppCustomerId", map.get("customer_id"));
			map.put("customerName", map.get("customer_name"));
			accessApplicationCustomerService.addAccessApplicationCustomer(map);
		}
		//主要竞争对手
		List<Map<String, Object>> competitorList = pfCompetitorService.getCompetitorMapByCompanyId(params);
		for(Map<String, Object> map : competitorList){
			map.put("record_id", recordId);
			map.put("supplier_id", supplierId);
			map.put("AppCompetitorId", map.get("competitor_id"));
			map.put("competitorName", map.get("competitor_name"));
			accessApplicationCompetitorService.addAccessApplicationCompetitor(map);
		}
		//供应品类更新supplierId
		params.put("record_id", recordId);
		params.put("supplier_id", supplierId);
		accessApplicationCategoryService.updateSupplierIdByRecordId(params);
	}
	
	/**
	 * @Description: 
	 * SupplierFilesService
	 * updateAttachInfo
	 * @param recordId
	 * @param supplierId
	 * @param companyId void
	 * @author mishengliang
	 * 2016-10-31 下午3:54:46
	 */
	private void deleteAttachInfo(Integer recordId){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("record_id", recordId);
		//附件表
		accessApplicationAttchedService.deleteAccessApplicationAttchedByRI(params);
		//主要设备明细表
		accessApplicationDevicelistService.deleteAccessApplicationDevicelistByRI(params);
		//银行账号
		accessAccountService.deleteAccessAccountByRI(params);
		//抬头发票
		accessInvoiceTitleService.deleteAccessInvoiceTitleByRI(params);
		//公司产品
		accessApplicationGoodsService.deleteAccessApplicationGoodsByRI(params);
		//公司原材料
		accessApplicationMaterialService.deleteAccessApplicationMetarialByRI(params);
		//主要客户
		accessApplicationCustomerService.deleteAccessApplicationCustomerByRI(params);
		//主要竞争对手
		accessApplicationCompetitorService.deleteAccessApplicationCompetitorByRI(params);
	}
	
	/**
	 * @Description: 准入资料表插入数据 ；遍历保存到准入资料表
	 * SupplierFilesService
	 * addItemToAccessApplicationInfo
	 * @param map 供应商公司的基本信息
	 * @param supplierId 供应商ID
	 * @author mishengliang
	 * 2016-10-28 下午3:46:41
	 */
	private void addItemToAccessApplicationInfo(Map<String, Object> map,Integer supplierId,Integer recordId){
		Map<String,Object> accInfoParams=new HashMap<String,Object>();
		List<AccessTempletElement> elements=ateMapper.getAccessTempletElementList(null);
		for (AccessTempletElement accessTempletElement : elements) {
			if("companyIntroduction".equals(accessTempletElement.getRelated_basis())){//字段名不对应的
				accInfoParams.put("supplier_id", supplierId);
				accInfoParams.put("record_id", recordId);
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content", map.get("company_introduction"));
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else if("exportNum".equals(accessTempletElement.getRelated_basis())){
				accInfoParams.put("supplier_id", supplierId);
				accInfoParams.put("record_id", recordId);
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content", map.get("export_num"));
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else if("importNum".equals(accessTempletElement.getRelated_basis())){
				accInfoParams.put("supplier_id", supplierId);
				accInfoParams.put("record_id", recordId);
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content", map.get("import_num"));
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else if("companyArea".equals(accessTempletElement.getRelated_basis())){
				accInfoParams.put("supplier_id", supplierId);
				accInfoParams.put("record_id", recordId);
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content", map.get("company_area"));
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else if("factoryArea".equals(accessTempletElement.getRelated_basis())){
				accInfoParams.put("supplier_id", supplierId);
				accInfoParams.put("record_id", recordId);
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content", map.get("factory_area"));
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else if("schoolCoop".equals(accessTempletElement.getRelated_basis())){
				accInfoParams.put("supplier_id", supplierId);
				accInfoParams.put("record_id", recordId);
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content", map.get("school_coop"));
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else if("reg_addr_code".equals(accessTempletElement.getRelated_basis())){
				accInfoParams.put("supplier_id", supplierId);
				accInfoParams.put("record_id", recordId);
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content",map.get("contact_addr_code"));
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else if("cpyname_cn1".equals(accessTempletElement.getRelated_basis())){
				accInfoParams.put("supplier_id", supplierId);
				accInfoParams.put("record_id", recordId);
				accInfoParams.put("e_id", accessTempletElement.getE_id());
				accInfoParams.put("content",map.get("cpyname_cn"));
				aaiService.addAccessApplicationInfo(accInfoParams);
			}
			else{//字段名对应的
				accInfoParams.put("supplier_id", supplierId);
				accInfoParams.put("record_id", recordId);
        		accInfoParams.put("e_id", accessTempletElement.getE_id());
        		accInfoParams.put("content", map.get(accessTempletElement.getRelated_basis()));
        		aaiService.addAccessApplicationInfo(accInfoParams);
			}
		}
	}
	
	/**
	 * @Description: 根据公司ID 获取 供应商和流水表ID
	 * SupplierFilesService
	 * getSupplierUseInfo
	 * @param params
	 * @return List<Map<String,Object>>
	 * @author mishengliang
	 * 2016-10-28 下午4:56:09
	 */
	private List<Map<String, Object>> getSupplierUseInfo(Map<String, Object> params){
		return mapper.getSupplierUseInfo(params);
	}
	
	private void transFormatMap(Map<String, Object> params){
		Map<String,Object> paramsMap = params;
		params.put("companyIntroduction", paramsMap.get("company_introduction"));
		params.put("exportNum", paramsMap.get("export_num"));
		params.put("importNum", paramsMap.get("import_num"));
		params.put("companyArea", paramsMap.get("company_area"));
		params.put("factoryArea", paramsMap.get("factory_area"));
		params.put("schoolCoop", paramsMap.get("school_coop"));
		params.put("reg_addr_code", paramsMap.get("contact_addr_code"));
		params.put("cpyname_cn1", paramsMap.get("cpyname_cn"));
	}
	public List<SupplierFiles> getSuppliersByOwnerId(
			Map<String, Object> params) {
		
		return mapper.getSuppliersByOwnerId(params);
	}
	/**
	 * @Description:根据recordId修改供应商状态
	 * SupplierFilesService
	 * updateSupplierStatusByRecordId
	 * @param params void
	 * @author yukai
	 * 2016-12-21 上午10:31:40
	 */
	public void updateSupplierStatusByRecordId(Map<String, Object> params){
		mapper.updateSupplierStatusByRecordId(params);
	}
}
