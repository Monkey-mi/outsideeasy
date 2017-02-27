package usercenter.purchaseManage.purchaseCenter.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.model.BusinessException;
import common.sysmodule.service.SysRoleService;
import common.user.model.LoginAccount;

import usercenter.common.announcement.service.AnnouncementService;
import usercenter.common.communication.service.AppCommunicationService;
import usercenter.externalTask.service.TaskService;
import usercenter.purchaseManage.supplierManager.service.SupplierCheckfactoryInformService;
import usercenter.saleManage.deliveryManage.service.QualityFeedbackService;
import usercenter.saleManage.service.AccessApplicationService;
import usercenter.saleManage.service.SaleCenterService;
import usercenter.saleManage.tradeManager.service.OrderDeliveryNoticeService;
import usercenter.saleManage.tradeManager.service.PurchaseOrderService;
import usercenter.supplierFiles.service.SupplierFilesService;
import util.SessionUtil;

@Service
public class PurchaseCenterService {
	@Autowired
	private QualityFeedbackService qualityFeedbackService; 
	@Autowired
	private OrderDeliveryNoticeService orderDeliveryNoticeService;
	@Autowired
	private PurchaseOrderService purchaseOrderService;
	@Autowired
	private TaskService taskService;
	@Autowired
	private AccessApplicationService accessApplicationService;
	@Autowired
	private SupplierFilesService supplierFilesService;
	@Autowired
	private AppCommunicationService appCommunicationService;
	@Autowired
	private SaleCenterService saleCenterService;
	@Autowired
	private SupplierCheckfactoryInformService supplierCheckfactoryInformService;
	@Autowired
	private SysRoleService sysRoleService;
	@Autowired
	private AnnouncementService announcementService;
	/**
	 * @Description:获取所有采购中心页面数据
	 * PurchaseCenterService
	 * getAllPurchaseInfo
	 * @param params
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-9-12 下午3:41:32
	 */
	public Map<String, Object> getAllPurchaseInfo(Map<String, Object> params) {
		Map<String, Object> purchaseInfoMap = new HashMap<String, Object>();// 返回的数据集合
		Map<String, Object> params1 = new HashMap<String, Object>();
		Map<String, Object> params2 = new HashMap<String, Object>();
		Map<String, Object> params3 = new HashMap<String, Object>();
		Map<String, Object> params4 = new HashMap<String, Object>();
		Map<String, Object> params5 = new HashMap<String, Object>();
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		purchaseInfoMap.put("qualityFeedback",
				qualityFeedbackService.getLastThreeQualityTest(params));// 最新三条质检信息
		purchaseInfoMap.put("deliveryNotice", orderDeliveryNoticeService
				.getLastThreeOrderDeliveryNotice(params));// 最新三条送货通知信息
		params1.put("pur_company_id", params.get("pur_company_id"));
		params1.put("accept", true);
		if (loginAccount.getAccount_type() == 0) {// 主账号
			params1.put("reg_id", loginAccount.getLogin_id());
		} else if (loginAccount.getAccount_type() == 1) {// 子账号
			params1.put("sa_id", loginAccount.getLogin_id());
		} else {
			throw new BusinessException("账号不存在");
		}
		purchaseInfoMap.put("acceptOrder",
				purchaseOrderService.getLastThreeDeliverOrderForOut(params1));// 最新三条已接订单信息
		params2.put("pur_company_id", params.get("pur_company_id"));
		params2.put("deliver", true);
		if (loginAccount.getAccount_type() == 0) {// 主账号
			params2.put("reg_id", loginAccount.getLogin_id());
		} else if (loginAccount.getAccount_type() == 1) {// 子账号
			params2.put("sa_id", loginAccount.getLogin_id());
		} else {
			throw new BusinessException("账号不存在");
		}
		purchaseInfoMap.put("deliverOrder",
				purchaseOrderService.getLastThreeDeliverOrderForOut(params2));// 最新三条交货完成订单信息
		params1.put("state", 15);
		purchaseInfoMap.put("acceptTask",
				taskService.getLastThreeDeliverTaskForOut(params1));// 最新三条已接任务单信息
		params2.put("state", 25);
		purchaseInfoMap.put("deliverTask",
				taskService.getLastThreeDeliverTaskForOut(params2));// 最新三条交货完成任务单信息
		purchaseInfoMap.put("acceptInvite",
				accessApplicationService.getLastThreeAcceptInvite(params));// 最新三条已接受邀请信息
		purchaseInfoMap.put("expiredInvite",
				accessApplicationService.getLastThreeExpiredInvite(params));// 最新三条已过期邀请信息
		purchaseInfoMap.put("accessSupplier",
				supplierFilesService.getLastThreeAccessSupplier(params));// 最新三条准入供应商信息
		params.put("limit", 3);
		purchaseInfoMap.put("announcement",
				announcementService.getNewAnnouncementList(params));// 最新三条公告信息
		params3.put("company_id", params.get("pur_company_id"));
		purchaseInfoMap.put("allTaskCount",
				taskService.getTaskCountOfAllState(params3));//获取采购方各种状态任务单的数量
		params3.put("flag", 2);
		purchaseInfoMap.put("allOrderCount",
				purchaseOrderService.getStatusCount(params3));//获取采购方各种状态订单的数量
		purchaseInfoMap.put("countOfAccessState",
				saleCenterService.getCountOfAccessState(params));//获取待确认邀请数量
		purchaseInfoMap.put("toBeConfirmedDeliveryNoticeCount",
				saleCenterService.getToBeConfirmedDeliveryNoticeCount(params));//查询待确认送货通知数量
		if (loginAccount.getAccount_type() == 0) {// 主账号
			params4.put("regId", loginAccount.getLogin_id());
		} else if (loginAccount.getAccount_type() == 1) {// 子账号
			params4.put("saId", loginAccount.getLogin_id());
		} else {
			throw new BusinessException("账号不存在");
		}
		params4.put("checkFacType", 1);
		params4.put("companyId", params.get("pur_company_id"));
		purchaseInfoMap.put("needCheckFactoryCountForFirstCheck",
				supplierCheckfactoryInformService.getNeedCheckFactoryCount(params4));//查询未验厂供应商数量
		if (loginAccount.getAccount_type() == 0) {// 主账号
			params5.put("regId", loginAccount.getLogin_id());
		} else if (loginAccount.getAccount_type() == 1) {// 子账号
			params5.put("saId", loginAccount.getLogin_id());
		} else {
			throw new BusinessException("账号不存在");
		}
		params5.put("checkFacType", 2);
		params5.put("beforeDate", 15);//提前15天提醒
		params5.put("companyId", params.get("pur_company_id"));
		purchaseInfoMap.put("needCheckFactoryCountForReviewCheck",
				supplierCheckfactoryInformService.getNeedCheckFactoryCount(params5));//查询待复检供应商数量
		return purchaseInfoMap;
	}
	/**
	 * @Description:根据登录账号的role_id查询所有class_id
	 * PurchaseCenterService
	 * getAllClassIdByRoleId
	 * @param params
	 * @return List<Integer>
	 * @author yukai
	 * 2016-9-26 上午9:39:52
	 */
	public List<Integer> getAllClassIdByRoleId(Map<String, Object> params) {
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		//注册账号role_id存在loginAccount.getRole_id()中，而子账号的role_id是多个的，存在loginAccount.getSubRoles()中
		String roleIdsStr="";
		
		if(loginAccount.getRole_id()>0)
		{
			roleIdsStr=String.valueOf(loginAccount.getRole_id());
		}
		
		if(loginAccount.getSubRoles()!=null)
		{
			List<Integer> roleIds=loginAccount.getSubRoles();
			if(roleIds.size()>0)
			{
				if(!roleIdsStr.equals(""))
				{
					roleIdsStr=roleIdsStr.concat(",");
				}
				roleIdsStr=roleIdsStr.concat(StringUtils.join(roleIds.toArray(),","));
				
			}
		}
		roleIdsStr=roleIdsStr.concat(",4");
		params.put("roleIds", roleIdsStr);
		List<Integer> list = sysRoleService.getAllClassIdByRoleId(params);
		return list;
	}

}
