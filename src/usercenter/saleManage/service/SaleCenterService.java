package usercenter.saleManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.model.BusinessException;
import common.user.model.LoginAccount;

import usercenter.common.announcement.service.AnnouncementService;
import usercenter.common.communication.model.AppCommunication;
import usercenter.common.communication.service.AppCommunicationService;
import usercenter.externalTask.TaskResponse.AllStateVo;
import usercenter.externalTask.model.Task;
import usercenter.externalTask.service.TaskService;
import usercenter.saleManage.deliveryManage.model.QualityFeedbackDetail;
import usercenter.saleManage.deliveryManage.service.QualityFeedbackService;
import usercenter.saleManage.model.CheckfactoryReport;
import usercenter.saleManage.model.CustomerFiles;
import usercenter.saleManage.model.Materialcheck;
import usercenter.saleManage.response.CountOfAccessState;
import usercenter.saleManage.tradeManager.model.OrderDeliveryNotice;
import usercenter.saleManage.tradeManager.model.PurchaseOrder;
import usercenter.saleManage.tradeManager.response.StateCountsVo;
import usercenter.saleManage.tradeManager.service.OrderDeliveryNoticeService;
import usercenter.saleManage.tradeManager.service.PurchaseOrderService;
import util.SessionUtil;

@Service
public class SaleCenterService {
	@Autowired
	private QualityFeedbackService qualityFeedbackService;
	@Autowired
	private CustomerFilesService customerFilesService;
	@Autowired
	private MaterialcheckService materialcheckService;
	@Autowired
	private CheckfactoryReportService checkfactoryReportService;
	@Autowired
	private TaskService taskService;
	@Autowired
	private AccessRecordService accessRecordService;
	@Autowired
	private AccessApplicationService accessApplicationService;
	@Autowired
	private CheckfactoryInformService checkfactoryInformService;
	@Autowired
	private PurchaseOrderService purchaseOrderService;
	@Autowired
	private OrderDeliveryNoticeService orderDeliveryNoticeService;
	@Autowired
	private AppCommunicationService appCommunicationService;
	@Autowired
	private AnnouncementService announcementService;
	/**
	 * @Description:获取准入邀请、准入申请各状态数量
	 * SaleCenterService
	 * getCountOfAccessState
	 * @param params
	 * @return CountOfAccessState
	 * @author yukai
	 * 2016-8-31 下午3:35:04
	 */
	public CountOfAccessState getCountOfAccessState(Map<String, Object> params) {
		CountOfAccessState countOfAccessState=new CountOfAccessState();
		int toBeReturnedAccess= accessRecordService.getCountForToBeReturnedAccess(params);
		int toBeSubmittedAccess=accessRecordService.getCountForToBeSubmittedAccess(params);
		int toBeReceivedInvite=accessApplicationService.getCountForToBeReceived(params);
		int toBeConfirmedCheckInform=checkfactoryInformService.getCountForToBeConfirmed(params);
		countOfAccessState.setToBeReceivedInvite(toBeReceivedInvite);
		countOfAccessState.setToBeReturnedAccess(toBeReturnedAccess);
		countOfAccessState.setToBeSubmittedAccess(toBeSubmittedAccess);
		countOfAccessState.setToBeConfirmedCheckInform(toBeConfirmedCheckInform);
		return countOfAccessState;
	}
	/**
	 * @Description:查询待确认送货通知数量
	 * SaleCenterService
	 * getToBeConfirmedDeliveryNoticeCount
	 * @param qryParam
	 * @return int
	 * @author yukai
	 * 2016-9-7 下午2:41:02
	 */
	public int getToBeConfirmedDeliveryNoticeCount(Map<String, Object> params) {
		return orderDeliveryNoticeService.getToBeConfirmedDeliveryNoticeCount(params);
	}
	/**
	 * @Description:获取最新三条订单留言回复
	 * SaleCenterService
	 * getLastThreeAppCommunication
	 * @param params
	 * @return List<AppCommunication>
	 * @author yukai
	 * 2016-9-7 下午4:39:20
	 */
	public List<AppCommunication> getLastThreeOrderAppCommunication(
			Map<String, Object> params) {
		LoginAccount loginAccount=SessionUtil.getCurrentPlateLoginAccount();
		if (loginAccount.getAccount_type()==0) {
			params.put("reg_id", loginAccount.getLogin_id());
		}else {
			params.put("sa_id", loginAccount.getLogin_id());
		}
		return appCommunicationService.getLastThreeOrderAppCommunication(params);
	}
	/**
	 * @Description:删除留言插入账号与留言删除关系表
	 * SaleCenterService
	 * addAccountCommunDel
	 * @param params void
	 * @author yukai
	 * 2016-9-7 下午5:36:13
	 */
	public void addAccountCommunDel(Map<String, Object> params) {
		LoginAccount loginAccount=SessionUtil.getCurrentPlateLoginAccount();
		params.put("account_id", loginAccount.getLogin_id());
		params.put("account_type", loginAccount.getAccount_type());
		params.put("commu_type", 1);
		appCommunicationService.addAccountCommunDel(params);
	}

	public Map<String, Object> getAllSaleCenterInfo(Map<String, Object> params) {
		Map<String, Object> saleCenterInfoMap = new HashMap<String, Object>();// 返回的数据集合
		Map<String, Object> params1 = new HashMap<String, Object>();
		Map<String, Object> params2 = new HashMap<String, Object>();
		Map<String, Object> params3 = new HashMap<String, Object>();
		saleCenterInfoMap.put("qualityFeedback",qualityFeedbackService.getLastThreeQualityTest(params));// 最新三条质检信息
		saleCenterInfoMap.put("newCustomer", customerFilesService.getLastThreeCustomer(params));// 最新三条新客户信息
		saleCenterInfoMap.put("checkFactory", checkfactoryReportService.getLastThreeCheckFactory(params));// 最新三条验厂信息
		saleCenterInfoMap.put("materialCheck", materialcheckService.getLastThreeMaterialCheck(params));// 最新三条物料信息
		params1.put("sup_company_id", params.get("sup_company_id"));
		params1.put("deliver", true);
		saleCenterInfoMap.put("deliverOrder", purchaseOrderService.getLastThreeDeliverOrder(params1));// 最新三条交货订单信息
		params2.put("sup_company_id", params.get("sup_company_id"));
		params2.put("exceptional", true);
		saleCenterInfoMap.put("exceptionalOrder", purchaseOrderService.getLastThreeDeliverOrder(params2));// 最新三条异常订单信息
		saleCenterInfoMap.put("deliverTask", taskService.getLastThreeDeliverTask(params));// 最新三条交货任务单信息
		params.put("limit", 3);
		saleCenterInfoMap.put("announcement",
				announcementService.getNewAnnouncementList(params));// 最新三条公告信息
		saleCenterInfoMap.put("deliveryNotice", orderDeliveryNoticeService.getLastThreeOrderDeliveryNotice(params));// 最新三条送货通知单信息
		params3.put("company_id", params.get("sup_company_id"));
		saleCenterInfoMap.put("allTaskCount", taskService.getProducerTaskCountOfAllState(params3));// 获取销售方各种状态任务单的数量
		params3.put("flag", 1);
		saleCenterInfoMap.put("allOrderCount", purchaseOrderService.getStatusCount(params3));// 获取各状态订单数量
		saleCenterInfoMap.put("toBeConfirmedDeliveryNoticeCount", orderDeliveryNoticeService.getToBeConfirmedDeliveryNoticeCount(params));//查询待确认送货通知数量
		saleCenterInfoMap.put("countOfAccessState",getCountOfAccessState(params));// 获取准入邀请、准入申请各状态数量
		return saleCenterInfoMap;
	}
	public List<AppCommunication> getLastThreeTaskrAppCommunication(
			Map<String, Object> params) {
		LoginAccount loginAccount=SessionUtil.getCurrentPlateLoginAccount();
		if (loginAccount.getAccount_type()==0) {
			params.put("reg_id", loginAccount.getLogin_id());
		}else {
			params.put("sa_id", loginAccount.getLogin_id());
		}
		return appCommunicationService.getLastThreeTaskrAppCommunication(params);
	}
}
