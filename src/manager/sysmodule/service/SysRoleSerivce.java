package manager.sysmodule.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.sysmodule.data.SysRoleMapper;

@Service
public class SysRoleSerivce {
	@Autowired
	private SysRoleMapper mapper;
	
	/**
	 * SysRoleSerivce
	 * getAccountRole
	 * @param params
	 * @return Integer
	 * @author mishengliang
	 * 2016-9-20 上午10:04:48
	 */
	public Integer getMainAccountRole(Map<String,Object> params){
		return mapper.getMainAccountRole(params);
	}
}
