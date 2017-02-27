package com.outsideasy.ws.erp.supplier;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

import net.sf.json.JSONObject;

import org.apache.poi.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import platform.basicdata.level.service.PfMaterialLevelService;
import platform.basicdata.user.service.PfRegAccoutService;
import platform.company.model.PfSupplierCheckfactoryReport;
import platform.company.model.PfSupplierMaterialcheck;
import platform.company.service.PfAttachedApplicationErpService;
import platform.company.service.PfAttchedService;
import platform.company.service.PfBankAccountService;
import platform.company.service.PfCompanyInfoService;
import platform.company.service.PfCompetitorService;
import platform.company.service.PfDeviceService;
import platform.company.service.PfGoodsService;
import platform.company.service.PfInvoiceTitleService;
import platform.company.service.PfMainCustomerService;
import platform.company.service.PfMetarialService;
import platform.company.service.PfSupplierCheckfactoryReportService;
import platform.company.service.PfSupplierMaterialcheckService;
import platform.supplierAccess.model.PfAuthcationInfo;
import platform.supplierAccess.service.PfAuthcationInfoService;
import usercenter.saleManage.model.AccessAccount;
import usercenter.saleManage.model.AccessApplicationAttched;
import usercenter.saleManage.model.AccessApplicationCompetitor;
import usercenter.saleManage.model.AccessApplicationCustomer;
import usercenter.saleManage.model.AccessApplicationGoods;
import usercenter.saleManage.model.AccessApplicationMetarial;
import usercenter.saleManage.model.AccessInvoiceTitle;
import usercenter.saleManage.model.CustomerFiles;
import usercenter.saleManage.service.AccessAccountService;
import usercenter.saleManage.service.AccessApplicationAttchedService;
import usercenter.saleManage.service.AccessApplicationCompetitorService;
import usercenter.saleManage.service.AccessApplicationCustomerService;
import usercenter.saleManage.service.AccessApplicationDevicelistService;
import usercenter.saleManage.service.AccessApplicationGoodsService;
import usercenter.saleManage.service.AccessApplicationMaterialService;
import usercenter.saleManage.service.AccessInvoiceTitleService;
import usercenter.subAccount.model.SubAccount;
import util.MyJsonUtil;
import util.WebUtil;

import com.outsideasy.ws.common.vo.CXFResponse;
import com.outsideasy.ws.erp.supplier.vo.AttchedOut;
import com.outsideasy.ws.erp.supplier.vo.BankAccountOut;
import com.outsideasy.ws.erp.supplier.vo.CompetitorOut;
import com.outsideasy.ws.erp.supplier.vo.DeviceOut;
import com.outsideasy.ws.erp.supplier.vo.GoodsOut;
import com.outsideasy.ws.erp.supplier.vo.InvoiceTitleOut;
import com.outsideasy.ws.erp.supplier.vo.MainCustomerOut;
import com.outsideasy.ws.erp.supplier.vo.MetarialOut;
import com.outsideasy.ws.erp.supplier.vo.SupplierFileIn;
import com.outsideasy.ws.erp.supplier.vo.SupplierFileOut;
import common.model.TreeModel;
import common.mongodb.service.FileOptService;

@WebService
@SOAPBinding(style = Style.RPC)
public class SupplierImpl implements SupplierInter {

	@Autowired
	private PfMaterialLevelService pfMaterialLevelService;
	@Autowired
	private PfCompanyInfoService pfSupplierFileService;
	@Autowired
	private PfGoodsService pfGoodsService;
	@Autowired
	private PfAttchedService pfAttchedService;
	@Autowired
	private PfMainCustomerService pfMainCustomerService;
	@Autowired
	private PfCompetitorService pfCompetitorService;
	@Autowired
	private PfMetarialService pfMetarialService;
	@Autowired
	private PfDeviceService pfDeviceService;
	@Autowired
	private PfBankAccountService pfBankAccountService;
	@Autowired
	private PfInvoiceTitleService pfInvoiceTitleService;
	@Autowired
	private PfAuthcationInfoService pfAuthcationInfoService;
	@Autowired
	private AccessApplicationDevicelistService accessApplicationDevicelistService;
	@Autowired
	private AccessApplicationGoodsService accessApplicationGoodsService;
	@Autowired
	private AccessApplicationCustomerService accessApplicationCustomerService;
	@Autowired
	private AccessApplicationCompetitorService accessApplicationCompetitorService;
	@Autowired
	private AccessApplicationMaterialService accessApplicationMaterialService;
	@Autowired
	private AccessAccountService accessAccountService;
	@Autowired
	private AccessInvoiceTitleService accessInvoiceTitleService;
	@Autowired
	private AccessApplicationAttchedService accessApplicationAttchedService;
	@Autowired
	private PfRegAccoutService pfRegAccoutService;
	@Autowired
	private PfAttachedApplicationErpService pfAttachedApplicationErpService;
	
	@Override
	public void updateSupplierFileStateByWS(String jsonmap){
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		JSONObject json=new JSONObject();
		json.put("succ", "true");
		String state=params.get("state").toString();
		String auditopinion=params.get("auditopinion").toString();
		String ids=params.get("ids").toString();
		String idsArr[]=ids.split(",");
		for(String id:idsArr){
			PfAuthcationInfo ai=new PfAuthcationInfo();
			ai.setAuth_opinion(auditopinion);
			ai.setCompany_id(Integer.parseInt(id.replaceAll("'","").trim()));
			ai.setCreate_dt(new Date());
			if(state.trim().equals("15")){
				ai.setAuth_state(0);
			}else{
				ai.setAuth_state(1);
			}
			pfAuthcationInfoService.addPfAuthcationInfo(ai);
		}
		pfSupplierFileService.updateSupplierFileStateByWS(params);
	}
	@Override
	public String getMaterialLevelTree(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		List<TreeModel> list=pfMaterialLevelService.getMaterialLevelTree(params);
		return MyJsonUtil.obj2string(list);
	}
	@Override
	public String getMaterialClassTree(String jsonmap){
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		List<TreeModel> list=pfMaterialLevelService.getMaterialClassTree(params);
		return MyJsonUtil.obj2string(list);
	}
	@Override
	public String getAccessApplicationRecord(String jsonmap){
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<SupplierFileOut> lam=new CXFResponse<SupplierFileOut>();
		List<SupplierFileOut> list=pfSupplierFileService.getAccessApplicationRecord(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getSupplierFileOutList(String jsonmap){
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<SupplierFileOut> lam=new CXFResponse<SupplierFileOut>();
		List<SupplierFileOut> list=pfSupplierFileService.getSupplierFileOutList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	
	@Override
	public String updateSupplierFileIn(String jsonlist){
		List<SupplierFileIn> list=MyJsonUtil.str2list(jsonlist,SupplierFileIn.class);
		SupplierFileIn[] array=list.toArray(new SupplierFileIn[list.size()]);
		pfSupplierFileService.updateSupplierFileByWS(array);
		return MyJsonUtil.obj2string(array);
	}
	@Override
	public String getGoodsOutList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<GoodsOut> lam=new CXFResponse<GoodsOut>();
		List<GoodsOut> list=pfGoodsService.getGoodsOutList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getAttchedOutList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<AttchedOut> lam=new CXFResponse<AttchedOut>();
		List<AttchedOut> list=pfAttchedService.getAttchedOutList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getMainCustomerOutList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<MainCustomerOut> lam=new CXFResponse<MainCustomerOut>();
		List<MainCustomerOut> list=pfMainCustomerService.getMainCustomerOutList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getCompetitorOutList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<CompetitorOut> lam=new CXFResponse<CompetitorOut>();
		List<CompetitorOut> list=pfCompetitorService.getCompetitorOutList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getMetarialOutList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<MetarialOut> lam=new CXFResponse<MetarialOut>();
		List<MetarialOut> list=pfMetarialService.getMetarialOutList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getDeviceOutList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<DeviceOut> lam=new CXFResponse<DeviceOut>();
		List<DeviceOut> list=pfDeviceService.getDeviceOutList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getBankAccountOutList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<BankAccountOut> lam=new CXFResponse<BankAccountOut>();
		List<BankAccountOut> list=pfBankAccountService.getBankAccountOutList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getInvoiceTitleOutList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<InvoiceTitleOut> lam=new CXFResponse<InvoiceTitleOut>();
		List<InvoiceTitleOut> list=pfInvoiceTitleService.getInvoiceTitleOutList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public byte[] downloadAttched(String file_path,boolean isimg) {
		String uploadFolderPath=WebUtil.getUpLoadFileRoot();
		if(file_path!=null){
			try {
				file_path=java.net.URLDecoder.decode(file_path,"UTF-8");
				File finalFile = new File(uploadFolderPath+file_path);
		        if(finalFile.exists()){
		            InputStream in = null;
		            in = new FileInputStream(finalFile.getPath());
		            byte[] buffer =  IOUtils.toByteArray(in);
		            in.close();
		            return buffer;
		        }
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	/** 
	* @Title: getAccessInvite 
	* @Description: 调用准入邀请方法
	* @param SupplierInter    设定文件 
	* @return    String json
	* @throws 
	*/
	@Override
	public String getAccessInvite(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<BankAccountOut> lam=new CXFResponse<BankAccountOut>();
		String message="";
		if((params.get("companyStr")==null)||(params.get("companyId")==null)||(params.get("login_id")==null)){
			message="参数缺失！";
			params.put("message", message);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
		message=pfSupplierFileService.checkCompany(params);
		params.put("message", message);
		lam.setSuccessResponseInfo(null, params);
		if(!message.equals("")){
			return MyJsonUtil.obj2string(lam);
		}
		pfSupplierFileService.addSupplierFiles(params);
		message="邀请成功！";
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getAccDeviceOutList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<DeviceOut> lam=new CXFResponse<DeviceOut>();
		List<DeviceOut> list=accessApplicationDevicelistService.getPfAccessApplicationDevicelistList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getAccGoodsOutList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<AccessApplicationGoods> lam=new CXFResponse<AccessApplicationGoods>();
		List<AccessApplicationGoods> list=accessApplicationGoodsService.getAccessApplicationGoodsList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getAccAttchedOutList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<AccessApplicationAttched> lam=new CXFResponse<AccessApplicationAttched>();
		List<AccessApplicationAttched> list=accessApplicationAttchedService.getAllAccessAttched(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getAccMainCustomerOutList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<AccessApplicationCustomer> lam=new CXFResponse<AccessApplicationCustomer>();
		List<AccessApplicationCustomer> list=accessApplicationCustomerService.getAccessApplicationCustomerList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getAccCompetitorOutList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<AccessApplicationCompetitor> lam=new CXFResponse<AccessApplicationCompetitor>();
		List<AccessApplicationCompetitor> list=accessApplicationCompetitorService.getAccessApplicationCompetitorList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getAccMetarialOutList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<AccessApplicationMetarial> lam=new CXFResponse<AccessApplicationMetarial>();
		List<AccessApplicationMetarial> list=accessApplicationMaterialService.getAccessApplicationMetarialList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getAccBankAccountOutList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<AccessAccount> lam=new CXFResponse<AccessAccount>();
		List<AccessAccount> list=accessAccountService.getAccessAccountList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getAccInvoiceTitleOutList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<AccessInvoiceTitle> lam=new CXFResponse<AccessInvoiceTitle>();
		List<AccessInvoiceTitle> list=accessInvoiceTitleService.getAccessInvoiceTitleList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	/** 
	* @Title: getPfSubAccout 
	* @Description: TODO(这里用一句话描述这个方法的作用) 
	* @param SupplierInter    设定文件 
	* @return     返回类型 
	* @throws 
	*/
	@Override
	public String getPfSubAccout(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<SubAccount> lam=new CXFResponse<SubAccount>();
		List<SubAccount> list=pfRegAccoutService.getRegAccoutList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	/** 
	* @Title: getPfSupplierAccessChange 
	* @Description: 处理准入邀请功能 
	* @param 流水id record_id
	* 	          状态 access_status
	* 	          审核意见 audit_opinion
	* 	         公司id company_id
	*     	管理账户id login_id
	* @return     返回类型 
	* @throws 
	*/
	@Override
	public String getPfSupplierAccessChange(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		return pfSupplierFileService.getPfSupplierAccessChange(params);
		
	}
	@Autowired
	private PfSupplierMaterialcheckService pfSupplierMaterialcheckService;
	@Override
	public String  getPfSupplierMaterialcheckList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<PfSupplierMaterialcheck> lam=new CXFResponse<PfSupplierMaterialcheck>();
		List<PfSupplierMaterialcheck> list=pfSupplierMaterialcheckService.getPfSupplierMaterialcheckList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Autowired 
	private PfSupplierCheckfactoryReportService pfSupplierCheckfactoryReportService;
	@Override
	public String getPfSupplierCheckfactoryReportList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<PfSupplierCheckfactoryReport> lam=new CXFResponse<PfSupplierCheckfactoryReport>();
		List<PfSupplierCheckfactoryReport> list=pfSupplierCheckfactoryReportService.getPfSupplierCheckfactoryReportList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Autowired
	private FileOptService fileOptService;
	@Override
	@Transactional
	public String getSaveFileCommon(byte[] buff, String jsonmap) throws Exception {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<PfSupplierCheckfactoryReport> lam=new CXFResponse<PfSupplierCheckfactoryReport>();
		String message="";
		if(params.get("company_id")==null){
			message="company_id 参数缺失 ！！！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
		String company_id=params.get("company_id").toString();
		if(params.get("file_name")==null){
			message="file_name 参数缺失 ！！！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
        String file_name=params.get("file_name").toString();
        if(params.get("record_id")==null){
			message="record_id 参数缺失 ！！！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
        String record_id=params.get("record_id").toString();
        if(params.get("login_id")==null){
			message="login_id 参数缺失 ！！！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
        String login_id=params.get("login_id").toString();
        if(params.get("contentType")==null){
			message="contentType 参数缺失 ！！！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
        String contentType=params.get("contentType").toString();
        if(params.get("originalFilename")==null){
			message="originalFilename 参数缺失 ！！！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
        String originalFilename=params.get("originalFilename").toString();
        if(params.get("type")==null){
			message="type 参数缺失 ！！！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
        String type=params.get("type").toString();
        if(params.get("bzsm")==null){
			message="bzsm 参数缺失 ！！！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
        String remark=params.get("bzsm").toString();
        Map<String,Object> para=new HashMap<String, Object>();
        para.put("sa_id", login_id);
    	//获取子账户名
		List<SubAccount> saList=pfRegAccoutService.getRegAccoutList(para);
		if(saList.size()==0){
			message="该账户在平台中不存在！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
		String operator_name=saList.get(0).getUsername();
		//获取供应商 id
		para.clear();
		para.put("record_id", record_id);
		List<CustomerFiles> cfList=pfSupplierFileService.getPfCustomerFilesList(para);
		if(cfList.size()==0){
			message="准入申请对应客户档案不存在！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
		int spId=cfList.get(0).getSupplier_id();
        //首先保存文件至数据库
        String objId=fileOptService.SaveFile(buff, originalFilename, contentType);
        //然后根据type做不同操作
        if(type.equals("reportFile")){
        	if(params.get("zrdf")==null){
    			message="zrdf 参数缺失 ！！！";
    			params.put("message", message);
    			params.put("bool", false);
    			lam.setSuccessResponseInfo(null, params);
    			if(!message.equals("")){
    				return MyJsonUtil.obj2string(lam);
    			}
    		}
            float zrdf= Float.parseFloat(params.get("zrdf").toString());
            
            if(params.get("assess_dt")==null){
    			message="assess_dt 参数缺失 ！！！";
    			params.put("message", message);
    			params.put("bool", false);
    			lam.setSuccessResponseInfo(null, params);
    			if(!message.equals("")){
    				return MyJsonUtil.obj2string(lam);
    			}
    		}
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            
            String assess_dt=params.get("assess_dt").toString();
            Date ycsj = sdf.parse(assess_dt);
            if(params.get("head_audit")==null){
    			message="head_audit 参数缺失 ！！！";
    			params.put("message", message);
    			params.put("bool", false);
    			lam.setSuccessResponseInfo(null, params);
    			if(!message.equals("")){
    				return MyJsonUtil.obj2string(lam);
    			}
    		}
            String head_audit=params.get("head_audit").toString();
        	PfSupplierCheckfactoryReport pcr=new PfSupplierCheckfactoryReport();
        	pcr.setSupplier_id(spId);
        	pcr.setSource_type(0);
        	pcr.setFile_name(file_name);
        	pcr.setCreate_dt(new Date());
        	pcr.setRemark(remark);
        	pcr.setMogodb_id(objId);
        	pcr.setOperator_id(Integer.parseInt(login_id));
        	pcr.setOperator_name(operator_name);
        	pcr.setCheck_factory_dt(ycsj);
        	pcr.setSend_company_id(Integer.parseInt(company_id));
        	pcr.setCheck_score(zrdf);
        	pcr.setCheckor(head_audit);
        	pfSupplierCheckfactoryReportService.addPfSupplierCheckfactoryReport(pcr);
        }else if(type.equals("checkGrid")){
        	PfSupplierMaterialcheck psm=new PfSupplierMaterialcheck();
        	psm.setSupplier_id(spId);
        	psm.setSource_type(0);
        	psm.setFile_name(file_name);
        	psm.setCreate_dt(new Date());
        	psm.setRemark(remark);
        	psm.setMogodb_id(objId);
        	psm.setOperator_id(Integer.parseInt(login_id));
        	psm.setOperator_name(operator_name);
        	psm.setSend_company_id(Integer.parseInt(company_id));
        	pfSupplierMaterialcheckService.addPfSupplierMaterialcheck(psm);
        }
		lam.setSuccessResponseInfo(null, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public void updateDevicelistByWS(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		pfAttachedApplicationErpService.updateDevicelistFromCRM(params);
		
	}
	@Override
	public String addDevicelistByWS(String jsonmap) {
		Map<String,Object> params = new HashMap<String, Object>();
		DeviceOut deviceOut=MyJsonUtil.str2obj(jsonmap, DeviceOut.class);
		pfAttachedApplicationErpService.addDevicelistFromCRM(deviceOut);
		CXFResponse<DeviceOut> lam=new CXFResponse<DeviceOut>();		
		params.put("device_out_id", deviceOut.getDevice_id());
		lam.setSuccessResponseInfo(null, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public void deleteDevicelistByWS(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		pfAttachedApplicationErpService.deleteDevicelistFromCRM(params);
		
	}
	@Override
	public void updateMetarialByWS(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		pfAttachedApplicationErpService.updateMetarialFromCRM(params);
		
	}
	@Override
	public String addMetarialByWS(String jsonmap) {
		Map<String,Object> params = new HashMap<String, Object>();
		MetarialOut metarialOut=MyJsonUtil.str2obj(jsonmap, MetarialOut.class);
		pfAttachedApplicationErpService.addMetarialFromCRM(metarialOut);
		CXFResponse<MetarialOut> lam=new CXFResponse<MetarialOut>();		
		params.put("metarial_out_id", metarialOut.getMaterial_id());
		lam.setSuccessResponseInfo(null, params);
		return MyJsonUtil.obj2string(lam);
		
	}
	@Override
	public void deleteMetarialByWS(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		pfAttachedApplicationErpService.deleteMetarialFromCRM(params);
		
	}
	@Override
	public void updateAppGoodsByWS(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		pfAttachedApplicationErpService.updateGoodsFromCRM(params);
		
	}
	@Override
	public String addAppGoodsByWS(String jsonmap) {
		Map<String,Object> params = new HashMap<String, Object>();
		GoodsOut goodsOut=MyJsonUtil.str2obj(jsonmap, GoodsOut.class);
		pfAttachedApplicationErpService.addGoodsFromCRM(goodsOut);
		CXFResponse<GoodsOut> lam=new CXFResponse<GoodsOut>();		
		params.put("goods_out_id", goodsOut.getGoods_id());
		lam.setSuccessResponseInfo(null, params);
		return MyJsonUtil.obj2string(lam);
		
	}
	@Override
	public void deleteAppGoodsByWS(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		pfAttachedApplicationErpService.deleteGoodsFromCRM(params);
		
	}
	@Override
	public void updateMainCustomerByWS(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		pfAttachedApplicationErpService.updateMainCustomerFromCRM(params);
		
	}
	@Override
	public String addMainCustomerByWS(String jsonmap) {
		Map<String,Object> params = new HashMap<String, Object>();
		MainCustomerOut mainCustomerOut=MyJsonUtil.str2obj(jsonmap, MainCustomerOut.class);
		pfAttachedApplicationErpService.addMainCustomerFromCRM(mainCustomerOut);
		CXFResponse<MainCustomerOut> lam=new CXFResponse<MainCustomerOut>();		
		params.put("customer_out_id", mainCustomerOut.getCustomer_id());
		lam.setSuccessResponseInfo(null, params);
		return MyJsonUtil.obj2string(lam);		
		
	}
	@Override
	public void deleteMainCustomerByWS(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		pfAttachedApplicationErpService.deleteMainCustomerFromCRM(params);
		
	}
	@Override
	public void updateAppCompetitorByWS(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		pfAttachedApplicationErpService.updateCompetitorFromCRM(params);
		
	}
	@Override
	public String addAppCompetitorByWS(String jsonmap) {
		Map<String,Object> params = new HashMap<String, Object>();
		CompetitorOut competitorOut=MyJsonUtil.str2obj(jsonmap, CompetitorOut.class);
		pfAttachedApplicationErpService.addCompetitorFromCRM(competitorOut);
		CXFResponse<CompetitorOut> lam=new CXFResponse<CompetitorOut>();		
		params.put("competitor_out_id", competitorOut.getCompetitor_id());
		lam.setSuccessResponseInfo(null, params);
		return MyJsonUtil.obj2string(lam);
		
	}
	@Override
	public void deleteAppCompetitorByWS(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		pfAttachedApplicationErpService.deleteCompetitorFromCRM(params);
		
	}
	@Override
	public void updateAppBankAccountByWS(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		pfAttachedApplicationErpService.updateBankAccountFromCRM(params);
		
	}
	@Override
	public String addAppBankAccountByWS(String jsonmap) {
		Map<String,Object> params = new HashMap<String, Object>();
		BankAccountOut bankAccountOut=MyJsonUtil.str2obj(jsonmap, BankAccountOut.class);
		pfAttachedApplicationErpService.addBankAccountFromCRM(bankAccountOut);
		CXFResponse<BankAccountOut> lam=new CXFResponse<BankAccountOut>();		
		params.put("account_out_id", bankAccountOut.getAccount_id());
		lam.setSuccessResponseInfo(null, params);
		return MyJsonUtil.obj2string(lam);
		
	}
	@Override
	public void deleteAppBankAccountByWS(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		pfAttachedApplicationErpService.deleteBankAccountFromCRM(params);
		
	}
	@Override
	public void updateAppInvoiceTitleByWS(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		pfAttachedApplicationErpService.updateInvoiceTitleFromCRM(params);
		
	}
	@Override
	public String addAppInvoiceTitleByWS(String jsonmap) {
		Map<String,Object> params = new HashMap<String, Object>();
		InvoiceTitleOut invoiceTitleOut=MyJsonUtil.str2obj(jsonmap, InvoiceTitleOut.class);
		pfAttachedApplicationErpService.addInvoiceTitleFromCRM(invoiceTitleOut);
		CXFResponse<InvoiceTitleOut> lam=new CXFResponse<InvoiceTitleOut>();		
		params.put("invoice_out_id", invoiceTitleOut.getInvoice_title_id());
		lam.setSuccessResponseInfo(null, params);
		return MyJsonUtil.obj2string(lam);
		
	}
	@Override
	public void deleteAppInvoiceTitleByWS(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		pfAttachedApplicationErpService.deleteInvoiceTitleFromCRM(params);
		
	}
	@Override
	public void updateAccessApplicationInfoByWS(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		String realtedAddress = params.get("realtedAddress").toString();
		params.put("contact_addr", realtedAddress);
		int record_id = Integer.valueOf(params.get("record_id").toString()) ;
		pfAttachedApplicationErpService.AppInfoUtil(record_id,params);		
	}
	
}