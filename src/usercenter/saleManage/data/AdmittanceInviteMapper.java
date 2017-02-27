package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.AdmittanceInvite;


public interface AdmittanceInviteMapper {
	public List<AdmittanceInvite> getAdmittanceInviteList(Map<String,Object> params);
	public void addAdmittanceInvite(Map<String,Object> params);
	public void updateAdmittanceInvite(Map<String,Object> params);
	public void deleteAdmittanceInvite(Map<String,Object> params);
	
	/**
	 * @Description: 通过供应商ID和接收者ID获取最近一次邀请记录
	 * AdmittanceInviteMapper
	 * getgetAdmittanceInvitebySupplierId
	 * @return AdmittanceInvite
	 * @author mishengliang
	 * 2016-8-20 下午4:51:24
	 */
	public AdmittanceInvite getAdmittanceInvitebySupplierIdAndaccepterId(Map<String, Object> params);
	public int getCountForToBeReceived(Map<String, Object> params);
	/**
	 * @Description:检查是否存在未过期的邀请
	 * AdmittanceInviteMapper
	 * checkInviteExist
	 * @param inviteParams
	 * @return AdmittanceInvite
	 * @author yukai
	 * 2016-9-8 下午4:31:57
	 */
	public AdmittanceInvite checkInviteExist(Map<String, Object> inviteParams);
	public List<AdmittanceInvite> getLastThreeAcceptInvite(Map<String,Object> params);
	public List<AdmittanceInvite> getLastThreeExpiredInvite(Map<String,Object> params);
	public AdmittanceInvite checkBrotherInviteExist(
			Map<String, Object> params);
}
