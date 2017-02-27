package usercenter.saleManage.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import usercenter.saleManage.data.AdmittanceInviteMapper;
import usercenter.saleManage.model.AdmittanceInvite;

@Service
public class AccessApplicationService {
	@Autowired
	private AdmittanceInviteMapper aiMapper;
	
	public List<AdmittanceInvite> getAccessApplicationList(Map<String, Object>params) {
		List<AdmittanceInvite> admittanceInvites=aiMapper.getAdmittanceInviteList(params);
		return admittanceInvites;
	}
	public void updateAdmittanceInvite(Map<String, Object>params){
		params.put("accept_dt", new Date());
		aiMapper.updateAdmittanceInvite(params);
	}
	/**
	 * @Description:获取待接收邀请的数量
	 * AccessApplicationService
	 * getCountForToBeReceived
	 * @param params
	 * @return int
	 * @author yukai
	 * 2016-8-31 上午10:55:45
	 */
	public int getCountForToBeReceived(Map<String, Object>params){
		return aiMapper.getCountForToBeReceived(params);
	}
	/**
	 * @Description:获取最新三条已接受邀请
	 * AccessApplicationService
	 * getLastThreeAcceptInvite
	 * @param params
	 * @return List<AdmittanceInvite>
	 * @author yukai
	 * 2016-9-13 下午1:58:50
	 */
	public List<AdmittanceInvite> getLastThreeAcceptInvite(Map<String, Object>params) {
		List<AdmittanceInvite> admittanceInvites=aiMapper.getLastThreeAcceptInvite(params);
		return admittanceInvites;
	}
	/**
	 * @Description:获取最新三条已过期邀请
	 * AccessApplicationService
	 * getLastThreeExpiredInvite
	 * @param params
	 * @return List<AdmittanceInvite>
	 * @author yukai
	 * 2016-9-13 下午1:58:53
	 */
	public List<AdmittanceInvite> getLastThreeExpiredInvite(Map<String, Object>params) {
		List<AdmittanceInvite> admittanceInvites=aiMapper.getLastThreeExpiredInvite(params);
		return admittanceInvites;
	}
}
