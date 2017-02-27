package usercenter.saleManage.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.company.data.PfCompanyMapper;
import platform.company.model.PfCompanySimpleInfo;
import platform.company.service.CompanyForPlateFormService;

import common.user.model.LoginAccount;
import common.user.model.RegAccout;
import common.user.model.RegAccoutCompanyInfo;
import common.user.service.RegAccoutCompanyInfoService;

import usercenter.saleManage.data.AdmittanceInviteMapper;
import usercenter.saleManage.data.CustomerFilesMapper;
import usercenter.saleManage.model.AccessTempletHead;
import usercenter.saleManage.model.AdmittanceInvite;
import usercenter.saleManage.model.CustomerFiles;
import usercenter.supplierFiles.data.SupplierFilesMapper;
import usercenter.supplierFiles.data.SupplierOwnerInfoMapper;
import usercenter.supplierFiles.data.SupplierRegaccountInfoMapper;
import usercenter.supplierFiles.model.SupplierFiles;
import usercenter.supplierFiles.model.SupplierOwnerInfo;
import usercenter.supplierFiles.model.SupplierRegaccountInfo;
import util.DataTrans;
import util.SessionUtil;


@Service
public class CustomerFilesService {
	@Autowired
	private CustomerFilesMapper mapper;
	@Autowired
	private SupplierOwnerInfoMapper soiMapper;
	@Autowired
	private PfCompanyMapper pfMapper;
	@Autowired
	private SupplierFilesMapper sfMapper;
	@Autowired
	private SupplierRegaccountInfoMapper sriMapper;
	@Autowired
	private CompanyForPlateFormService cfpService;
	@Autowired
	private AccessTempletHeadService ahService;
	@Autowired
    private RegAccoutCompanyInfoService rciService;
	@Autowired
	private AccessRecordService arService;
	@Autowired
	private AdmittanceInviteMapper aiMapper;

	public List<CustomerFiles> getCustomerFilesList(Map<String,Object> params) {
		return mapper.getCustomerFilesList(params);
	}
	public void addCustomerFiles(CustomerFiles[] arr) {
		for(CustomerFiles obj: arr) {
			mapper.addCustomerFiles(obj);
		}
	}
	public void updateCustomerFiles(Map<String,Object> params) {
			mapper.updateCustomerFiles(params);
	}
	public void deleteCustomerFiles(CustomerFiles[] arr) {
		for(CustomerFiles obj: arr) {
			mapper.deleteCustomerFiles(obj);
		}
	}
	
	/**
	 * @Description:获取供应商在当前登陆账号下的所有客户
	 * CustomerFilesService
	 * getCustomerFilesListByRegId
	 * @param params
	 * @return List<CustomerFiles>
	 * @author yukai
	 * 2016-8-2 上午10:19:15
	 */
	public List<CustomerFiles> getCustomerFilesListByRegId(Map<String,Object> params) {
		LoginAccount loginAccount=SessionUtil.getCurrentPlateLoginAccount();
		params.put("reg_id", loginAccount.getLogin_id());
		return mapper.getCustomerFilesListByRegId(params);
	}
	/**
	 * @Description:接受邀请走快速通道时直接建立关系
	 * CustomerFilesService
	 * directCreateRelation
	 * @param params void
	 * @author yukai
	 * 2016-8-12 上午9:39:17
	 */
	public void directCreateRelation(Map<String, Object> params) {
		PfCompanySimpleInfo companyBaseInfo=pfMapper.getCompanyBaseInfo(Integer.parseInt(params.get("sender_id").toString()));
		SupplierOwnerInfo supplierOwnerInfo=new SupplierOwnerInfo();
		supplierOwnerInfo.setCompany_id(Integer.parseInt(params.get("sender_id").toString()));
		supplierOwnerInfo.setSupplier_id(Integer.parseInt(params.get("supplier_id").toString()));
		supplierOwnerInfo.setOwner_cpyname(companyBaseInfo.getCpyname_cn());
		soiMapper.addSupplierOwnerInfo(supplierOwnerInfo);
	}
	/**
	 * @Description:申请加入供应商
	 * CustomerFilesService
	 * applyJoinSupplier
	 * @param params void
	 * @author yukai
	 * 2016-8-12 下午4:09:04
	 */
	public Map<String, Object> applyJoinSupplier(Map<String, Object> params) {
		Map<String, Object> companyParams=new HashMap<String, Object>();
		Map<String, Object> recordParams=new HashMap<String, Object>();
		Map<String, Object> templetParams=new HashMap<String, Object>();
		Map<String, Object> regParams=new HashMap<String, Object>();
		Map<String, Object> supplierParams=new HashMap<String, Object>();
		Map<String, Object> customerParams = new HashMap<String, Object>();
		Map<String, Object> inviteParams = new HashMap<String, Object>();
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
		for (int i = 0; i < companyArray.length; i++) {
			companyParams.put("companyName", companyArray[i]);
			PfCompanySimpleInfo companySimpleInfo= cfpService.getSupplierByName(companyParams).get(0);//根据企业名称查company_id,cpyname_cn
			templetParams.put("owner", companySimpleInfo.getCompany_id());
			AccessTempletHead accessTempletHead=ahService.getAccessTempletHeadList(templetParams).get(0);//根据company_id查模板头ID
			regParams.put("company_id", companySimpleInfo.getCompany_id());
			RegAccoutCompanyInfo regAccoutCompanyInfo=rciService.getRegAccoutCompanyInfoList(regParams).get(0);//根据company_id查reg_id
			customerParams.put("owner_id", companySimpleInfo.getCompany_id());
			customerParams.put("company_id", companyId);
			CustomerFiles customerFiles = mapper.checkFilesExit(customerParams);//检查在申请的公司或其兄弟公司下是否已有档案存在
			inviteParams.put("accepter_id", companyId);
			inviteParams.put("sender_id", companySimpleInfo.getCompany_id());
			AdmittanceInvite admittanceInvite= aiMapper.checkBrotherInviteExist(inviteParams);//检查申请的公司主账号下是否有公司发送了邀请并且未过期
			if (customerFiles!=null) {
				if(customerFiles.getFile_status()==0){//是兄弟公司现有供应商
					SupplierOwnerInfo supplierOwnerInfo=new SupplierOwnerInfo();
					supplierOwnerInfo.setSupplier_id(customerFiles.getSupplier_id());
					supplierOwnerInfo.setCompany_id(companySimpleInfo.getCompany_id());
					supplierOwnerInfo.setOwner_cpyname(companySimpleInfo.getCpyname_cn());
					soiMapper.addSupplierOwnerInfo(supplierOwnerInfo);//供应商与所有者公司建立联系
				}
				else if(customerFiles.getFile_status()==1){//是备选供应商
					if (admittanceInvite==null) {//邀请过期
						if(customerFiles.getOwner_id()==companySimpleInfo.getCompany_id()){
							recordParams.put("submit_id",companyId);
							recordParams.put("receive_id",companySimpleInfo.getCompany_id());
							recordParams.put("receive_invite_id",null);
							recordParams.put("access_status",0);
							recordParams.put("h_id",accessTempletHead.getH_id());
							recordParams.put("accepter_reg_id",regAccoutCompanyInfo.getReg_id());
							recordParams.put("create_dt",null);
							arService.addAccessRecord(recordParams);//新增准入流水记录
							supplierParams.put("record_id",recordParams.get("record_id"));
							supplierParams.put("supplier_id",customerFiles.getSupplier_id());
							updateCustomerFiles(supplierParams);//将record_id填入档案中
						}else{
							recordParams.put("submit_id",companyId);
							recordParams.put("receive_id",companySimpleInfo.getCompany_id());
							recordParams.put("receive_invite_id",null);
							recordParams.put("access_status",0);
							recordParams.put("h_id",accessTempletHead.getH_id());
							recordParams.put("accepter_reg_id",regAccoutCompanyInfo.getReg_id());
							recordParams.put("create_dt",null);
							arService.addAccessRecord(recordParams);//新增准入流水记录
							supplierParams.put("record_id",recordParams.get("record_id"));
							supplierParams.put("supplier_id",customerFiles.getSupplier_id());
							updateCustomerFiles(supplierParams);//将record_id填入档案中
							SupplierOwnerInfo supplierOwnerInfo=new SupplierOwnerInfo();
							supplierOwnerInfo.setSupplier_id(customerFiles.getSupplier_id());
							supplierOwnerInfo.setCompany_id(companySimpleInfo.getCompany_id());
							supplierOwnerInfo.setOwner_cpyname(companySimpleInfo.getCpyname_cn());
							soiMapper.addSupplierOwnerInfo(supplierOwnerInfo);//供应商与所有者公司建立联系
						}
					}
				}
			}else{
				recordParams.put("submit_id",companyId);
				recordParams.put("receive_id",companySimpleInfo.getCompany_id());
				recordParams.put("receive_invite_id",null);
				recordParams.put("access_status",0);
				recordParams.put("h_id",accessTempletHead.getH_id());
				recordParams.put("accepter_reg_id",regAccoutCompanyInfo.getReg_id());
				recordParams.put("create_dt",null);
				arService.addAccessRecord(recordParams);//新增准入流水记录
				PfCompanySimpleInfo companySimpleInfo1=pfMapper.getCompanyBaseInfo(companyId);
				supplierParams.put("company_id",companyId);
				supplierParams.put("supplier_cpyname", companySimpleInfo1.getCpyname_cn());
				supplierParams.put("file_status", 1);
				supplierParams.put("source_type", 1);
				supplierParams.put("record_id",recordParams.get("record_id"));
				sfMapper.addSupplierFiles(supplierParams);//新增备选供应商
				int supplier_id=DataTrans.transToIntegerFromString(supplierParams.get("supplier_id").toString());//获取新增的备选供应商的主键
				SupplierRegaccountInfo supplierRegaccountInfo=new SupplierRegaccountInfo();
				supplierRegaccountInfo.setSupplier_id(supplier_id);
				supplierRegaccountInfo.setReg_id(regAccoutCompanyInfo.getReg_id());
				sriMapper.addSupplierRegaccountInfo(supplierRegaccountInfo);//供应商与所有者主账号建立联系
				SupplierOwnerInfo supplierOwnerInfo=new SupplierOwnerInfo();
				supplierOwnerInfo.setSupplier_id(supplier_id);
				supplierOwnerInfo.setCompany_id(companySimpleInfo.getCompany_id());
				supplierOwnerInfo.setOwner_cpyname(companySimpleInfo.getCpyname_cn());
				soiMapper.addSupplierOwnerInfo(supplierOwnerInfo);//供应商与所有者公司建立联系
			}
		}
		return recordParams;
	}
	/**
	 * @Description:检验输入的客户名称是否有效
	 * CustomerFilesService
	 * checkCustomer
	 * @param params
	 * @return String
	 * @author yukai
	 * 2016-8-16 下午3:00:49
	 */
	public String checkCustomer(Map<String, Object> params) {
		Map<String, Object> companyParams = new HashMap<String, Object>();
		Map<String, Object> customerParams = new HashMap<String, Object>();
		Map<String, Object> inviteParams = new HashMap<String, Object>();
		String message = "";
		String[] companyArray = null;
		String companyStr = params.get("companyStr").toString();
		int companyId = DataTrans.transToIntegerFromString(params.get(
				"companyId").toString());
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
			List<PfCompanySimpleInfo> companySimpleInfos = cfpService
					.getSupplierByName(companyParams);// 根据企业名称查company_id,cpyname_cn

			if (companySimpleInfos.size() == 0) {
				message += companyArray[i] + "不存在或未认证;";
			} else {
				if (companySimpleInfos.get(0).getCompany_id() == companyId) {
					message += "<p style='text-align:left'>你不能申请成为自己的供应商.</p>";
				} else {
					customerParams.put("owner_id", companySimpleInfos.get(0)
							.getCompany_id());
					customerParams.put("company_id", companyId);
					CustomerFiles customerFiles = mapper
							.checkFilesExit(customerParams);//检查在申请的公司或其兄弟公司下是否已有档案存在
					inviteParams.put("accepter_id", companyId);
					inviteParams.put("sender_id", companySimpleInfos.get(0)
							.getCompany_id());
					AdmittanceInvite admittanceInvite= aiMapper.checkBrotherInviteExist(inviteParams);//检查申请的公司主账号下是否有公司发送了邀请并且未过期
					if (customerFiles != null) {//如果档案存在
						if(customerFiles.getOwner_id()==companySimpleInfos.get(0)
								.getCompany_id()){//档案所属者是我申请的公司
							if (customerFiles.getFile_status() == 0) {
								message += "<p style='text-align:left'>"
										+ companyArray[i] + "已经是你的客户.</p>";
							} 
							else if (customerFiles.getFile_status() == 1 ){
								if(customerFiles.getRecord_id()!=null){
									message += "<p style='text-align:left'>你已经向"
											+ companyArray[i]
													+ "提出过申请或已接受该公司邀请，请到准入申请查看审核进度.</p>";
								}else{
									if(admittanceInvite!=null&&admittanceInvite.getSender_id()==companySimpleInfos.get(0)
											.getCompany_id()){
										message += "<p style='text-align:left'>"
												+ companyArray[i]
														+ "已经向你发出邀请，请到准入申请查看并接受.</p>";
									}
								}
							}
						}else{//档案所属者是我申请的公司的兄弟公司
							 if (customerFiles.getFile_status() == 1 ){
									if(customerFiles.getRecord_id()!=null){
										message += "<p style='text-align:left'>你已接受"
												+ companyArray[i]
														+ "兄弟公司的邀请，请到准入申请查看审核进度.</p>";
									}else{
										if(admittanceInvite!=null&&admittanceInvite.getSender_id()!=companySimpleInfos.get(0)
												.getCompany_id()){
										message += "<p style='text-align:left'>"
												+ companyArray[i]
														+ "兄弟公司已经向你发出邀请，请到准入申请查看并接受.</p>";
										}
									}
							}
						}
					}
					
				}
			}
		}
		return message;
	}
	public List<CustomerFiles> getLastThreeCustomer(Map<String, Object> params) {
		return mapper.getLastThreeCustomer(params);
	}
	public Date getPassTime(Map<String, Object> params) {
		return mapper.getPassTime(params);
	}
}
