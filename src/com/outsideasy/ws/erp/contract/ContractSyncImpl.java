package com.outsideasy.ws.erp.contract;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import platform.basicdata.user.service.PfRegAccoutService;
import platform.company.model.PfCompany;
import platform.contract.model.ERPSRMPODetial;
import platform.contract.model.ERPSRMpurchaseOrder;
import platform.contract.model.PfOrderAgreementFile;
import platform.contract.model.PfOrderAttchedFile;
import platform.contract.model.PfPurchaseOrder;
import platform.contract.model.PfPurchaseOrderDetails;
import platform.contract.service.PfContractAttachmentService;
import platform.contract.service.PfOrderAgreementFileService;
import platform.contract.service.PfOrderAttchedFileService;
import platform.contract.service.PfOrderRequirementService;
import platform.contract.service.PfOutHtmxbService;
import platform.contract.service.PfPurchaseOrderDetailsService;
import platform.contract.service.PfPurchaseOrderService;
import usercenter.saleManage.tradeManager.model.PurchaseOrder;
import usercenter.subAccount.model.SubAccount;
import util.MyJsonUtil;
import util.SysSerialId;

import com.outsideasy.ws.common.vo.CXFResponse;
import common.mongodb.service.FileOptService;

@WebService
@SOAPBinding(style = Style.RPC)
public class ContractSyncImpl implements ContractSyncInter{
	/** 
	 * @ClassName: ContractSyncImpl 
	 * @Description: TODO(这里用一句话描述这个类的作用) 
	 * @author wuqia
	 * @date 2016-8-22 下午6:19:28 
	 * 
	 *  
	 */
	@Autowired
	private PfContractAttachmentService pfcontractAttachmentService;
	@Autowired
	private PfOrderAgreementFileService pforderAgreementFileService;
	@Autowired
	private PfOrderAttchedFileService pforderAttchedFileService;
	@Autowired
	private PfOrderRequirementService pforderRequirementService;
	@Autowired
	private PfOutHtmxbService pfoutHtmxbService;
	@Autowired
	private PfPurchaseOrderDetailsService pfpurchaseOrderDetailsService;
	@Autowired
	private PfPurchaseOrderService pfpurchaseOrderService;
	@Autowired
	private PfRegAccoutService pfRegAccoutService;
	@Override
	@Transactional
	public String addPfPurchaseOrder(String jsonlist){
		String message="";
		CXFResponse<PurchaseOrder> lam=new CXFResponse<PurchaseOrder>();
		List<ERPSRMpurchaseOrder> list = MyJsonUtil.str2list(jsonlist,ERPSRMpurchaseOrder.class);
		ERPSRMpurchaseOrder[] array = list.toArray(new ERPSRMpurchaseOrder[list.size()]);
		ERPSRMpurchaseOrder a = array[0];
		ArrayList<PfPurchaseOrder> polist = new ArrayList<PfPurchaseOrder>();
		PfPurchaseOrder po = new PfPurchaseOrder();
		String ddbh = SysSerialId.getNewNextOrderId();
		po.setOrder_bh(ddbh);//生成订单id；
		po.setOrder_status(10);//提交状态--已提交
		po.setCreate_dt(new Date());//提交时间时
		po.setSum_money(a.getHtze());//订单总金额
		po.setAgreement_bh(String.valueOf(a.getHtbh()));//合同编号
		po.setCategory_id(Integer.parseInt(a.getCglb()));//采购类别
		po.setSource_type(0);
		po.setPur_creator_id(Integer.parseInt(a.getPtid()));
		po.setPur_invoice_title(a.getFptt());
		/*po.setPur_invoice_type(a.get);*/
		po.setSup_company_id(Integer.parseInt(a.getCompany_id()));
		Map<String,Object> params = new HashMap<String,Object>();
		
		Map<String,Object> para=new HashMap<String, Object>();
        para.put("sa_id", a.getPtid());
    	//获取子账户名
		List<SubAccount> saList=pfRegAccoutService.getRegAccoutList(para);
		if(saList.size()==0){
			message="该账户在平台中不存在！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			/*if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}*/
		}
		String create_name=saList.get(0).getUsername();
		po.setPur_creator_name(create_name);
		
		params.put("company_id", a.getCompany_id());
		List<PfCompany> info = pfpurchaseOrderService.getCampanyInfoBycid(params);
		int supplier_id = pfpurchaseOrderService.getSupplierId(params);
		po.setSupplier_id(supplier_id);//平台供应商档案Id
		PfCompany [] arrinfo = info.toArray(new PfCompany[info.size()]);
		PfCompany cinfo = arrinfo[0];
		po.setSup_cpyname_cn(cinfo.getCpyname_cn());//供方公司名称
		po.setSup_contact_address(cinfo.getReg_addr());//供方联系地址
		po.setSup_contact(cinfo.getContacts());//联系人
		/*po.setSup_delete_flag(cinfo.getIs_delete());*/
		po.setSup_contact_phone(cinfo.getM_phone());
		po.setOrder_remark(a.getCgbz());//订单备注
		po.setDelivery_date(a.getJhrq());//最早交期日期
		po.setLock_agreement(a.getSdbj());//合同锁定字段
		
		params.put("company_id", "9999");
		List<PfCompany> infop = pfpurchaseOrderService.getCampanyInfoBycid(params);
		PfCompany [] arrinfos = infop.toArray(new PfCompany[info.size()]);
		PfCompany cinfos = arrinfos[0];
		po.setPur_company_id(9999);//采购方平台公司ID
		po.setPur_cpyname_cn(cinfos.getCpyname_cn());//公司名称
		po.setPur_delivery_address(cinfos.getReg_addr());
		po.setPur_delivery_contact(cinfos.getContacts());
		po.setPur_delivery_contact_phone(cinfos.getM_phone());
		po.setDelivery_address_id(cinfos.getContact_addr_code());
		
		polist.add(po);
		PfPurchaseOrder [] arr = polist.toArray(new PfPurchaseOrder[polist.size()]);
		pfpurchaseOrderService.addPfPurchaseOrder(arr);
		params.put("order_bh", ddbh);
		int order_id = pfpurchaseOrderService.getOrderid(params);
		return String.valueOf(order_id);
	}
	@Override
	@Transactional
	public String addPfPurchaseOrderDetial(String jsonlist){
		System.out.println(jsonlist);
		List<ERPSRMPODetial> list =  MyJsonUtil.str2list(jsonlist,ERPSRMPODetial.class);
		ERPSRMPODetial [] dearr = list.toArray(new ERPSRMPODetial[list.size()]);
		System.out.println(dearr);
		PfPurchaseOrderDetails pd = new PfPurchaseOrderDetails();
		String order_detial_id = "";
		Map<String,Object> params = new HashMap<String,Object>();
			pd.setUnit_price(dearr[0].getCgdj());
			pd.setNumber((int)dearr[0].getCgsl());
			pd.setUnit(dearr[0].getJldw());
			pd.setMoney(dearr[0].getJe());
			pd.setDelivery_date(dearr[0].getJh());
			pd.setProduct_name(dearr[0].getClmc());
			pd.setProduct_size(dearr[0].getCltx1());
			pd.setProduct_artno(dearr[0].getClhh());
			pd.setHtmx(dearr[0].getHtmx());
			pd.setPur_order_id(Integer.parseInt(dearr[0].getDdbh()));
			pfpurchaseOrderDetailsService.addPfPurchaseOrderDetails(pd);
			params.put("pur_order_id",pd.getPur_order_id());
			params.put("product_name",pd.getProduct_name());
			order_detial_id = pfpurchaseOrderService.getOrderDetialId(params);
		return order_detial_id;
	}
	
	@Override
	@Transactional
	public void addPfPurchaseAsk(String jsonmap){
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		Map<String,Object> para=new HashMap<String, Object>();
        para.put("sa_id", params.get("pid"));
    	//获取子账户名
		List<SubAccount> saList=pfRegAccoutService.getRegAccoutList(para);
		String create_name=saList.get(0).getUsername();
		params.put("create_name", create_name);
		params.put("create_dt", new Date());
		pforderRequirementService.addPfOrderRequirement(params);
	}
	
	@Override
	public String getPurchaseOrderList(String jsonmap){
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<PfPurchaseOrder> lam=new CXFResponse<PfPurchaseOrder>();
		List<PfPurchaseOrder> list = pfpurchaseOrderService.getPfPurchaseOrderList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Autowired
	private FileOptService fileOptService;
	@Override
	@Transactional
	public String addPfPurchaseOrderFile(byte [] buff,String jsonmap) throws Exception {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<PfOrderAttchedFile> lam=new CXFResponse<PfOrderAttchedFile>();
		String message="";
		if(params.get("ddbh")==null){
			message="ddbh 参数缺失！！！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}		
		}
		String ddbh = params.get("ddbh").toString();
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
        if(params.get("htbh")==null){
			message="htbh 参数缺失 ！！！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
        String agreement_bh = params.get("htbh").toString();
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
        if(params.get("ptid")==null){
			message="ptid 参数缺失 ！！！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
        String ptid=params.get("ptid").toString();
        Map<String,Object> para=new HashMap<String, Object>();
        para.put("sa_id", ptid);
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
		lam.setSuccessResponseInfo(null, params);
		//首先保存文件至数据库
		String objId=fileOptService.SaveFile(buff, originalFilename, contentType);
		PfOrderAgreementFile pof = new PfOrderAgreementFile();//合同文件对象
        pof.setPur_order_id(Integer.parseInt(ddbh));
        pof.setAgreement_status(0);
        pof.setAgreement_bh(agreement_bh);
        pof.setAgreement_name(file_name);
        pof.setMogodb_id(objId);
        pof.setCreate_dt(new Date());
        pof.setCreator_name(operator_name);
        pof.setCreator_id(Integer.parseInt(ptid));
        pof.setSource_type(0);/*
        pof.setSuffix_name(contentType);*/
        pforderAgreementFileService.addOrderAgreementFile(pof);
        lam.setSuccessResponseInfo(null, params);
		return MyJsonUtil.obj2string(lam);
	}

	@Override
	@Transactional
	public String addPfOrderAttched(byte [] buff,String jsonmap) throws Exception{
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<PfOrderAttchedFile> lam=new CXFResponse<PfOrderAttchedFile>();
		String message=""; 
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
	        if(params.get("pur_order_id")==null){
				message="pur_order_id 参数缺失 ！！！";
				params.put("message", message);
				params.put("bool", false);
				lam.setSuccessResponseInfo(null, params);
				if(!message.equals("")){
					return MyJsonUtil.obj2string(lam);
				}
			}
	        String pur_order_id = params.get("pur_order_id").toString();
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
        if(params.get("ptid")==null){
			message="ptid 参数缺失 ！！！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
        String ptid=params.get("ptid").toString();
        Map<String,Object> para=new HashMap<String, Object>();
        para.put("sa_id", ptid);
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
		if(params.get("isimg")==null){
			message="isimg 参数缺失 ！！！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
		int isimg =(Integer) params.get("isimg");
		if(params.get("order_bh")==null){
			message="order_bh 参数缺失 ！！！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
		String order_bh = params.get("order_bh").toString();
		if(params.get("contentType")==null){
			message="contentType 参数缺失 ！！！";
			params.put("message", message);
			params.put("bool", false);
			lam.setSuccessResponseInfo(null, params);
			if(!message.equals("")){
				return MyJsonUtil.obj2string(lam);
			}
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String create_dt = params.get("cjrq").toString();
        Date cjrq = sdf.parse(create_dt);
        System.out.println(cjrq);
		String contentType=params.get("contentType").toString();
        String objId=fileOptService.SaveFile(buff, originalFilename, contentType);
		PfOrderAttchedFile poa = new PfOrderAttchedFile();
		poa.setOrder_attched_name(file_name);
		poa.setMogodb_id(objId);
		poa.setFt_id(isimg);
		poa.setCreate_dt(cjrq);
		poa.setSource_type(0);
		poa.setCreator_id(Integer.parseInt(ptid));
		poa.setCreator_name(operator_name);
		poa.setPur_order_id(Integer.parseInt(pur_order_id));
		poa.setOrder_bh(order_bh);
		pforderAttchedFileService.addPfOrderAttchedFile(poa);
		lam.setSuccessResponseInfo(null, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getPfPurchaseOrderFile(String jsonmap){
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<PfOrderAgreementFile> lam=new CXFResponse<PfOrderAgreementFile>();
		List<PfOrderAgreementFile> list= pforderAgreementFileService.getOrderAgreementFileList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getContractStatus(String jsonmap){
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		String order_status;
		if(params.get("agreement_bh")==null){
			order_status = "10000";
		}else{
			order_status = pfpurchaseOrderService.getContractStatus(params);
		}
		if(order_status == null){
			order_status = "60";
		}
		System.out.println(order_status);
		return order_status;
	}
}


