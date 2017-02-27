package usercenter.saleManage.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.user.model.RegAccout;

import usercenter.saleManage.data.CheckfactoryInformMapper;
import usercenter.saleManage.model.CheckfactoryInform;
import util.SessionUtil;


@Service
public class CheckfactoryInformService {
	@Autowired
	private CheckfactoryInformMapper mapper;


	public List<CheckfactoryInform> getCheckfactoryInformList(Map<String,Object> params) {
		return mapper.getCheckfactoryInformList(params);
	}
	public void addCheckfactoryInform(CheckfactoryInform[] arr) {
		for(CheckfactoryInform obj: arr) {
			mapper.addCheckfactoryInform(obj);
		}
	}
	public void updateCheckfactoryInform(CheckfactoryInform[] arr) {
		for(CheckfactoryInform obj: arr) {
			mapper.updateCheckfactoryInform(obj);
		}
	}
	public void deleteCheckfactoryInform(CheckfactoryInform[] arr) {
		for(CheckfactoryInform obj: arr) {
			mapper.deleteCheckfactoryInform(obj);
		}
	}
	public List<CheckfactoryInform> getAllCheckfactoryInformList(Map<String,Object> params) {
		return mapper.getAllCheckfactoryInformList(params);
	} 
	public void confirmCheckfactoryInform(Map<String, Object> params) {
		mapper.confirmCheckfactoryInform(params);
	}
	public int getCountForToBeConfirmed(Map<String, Object> params) {
		return mapper.getCountForToBeConfirmed(params);
	}
}
