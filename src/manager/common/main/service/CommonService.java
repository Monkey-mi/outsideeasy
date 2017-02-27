package manager.common.main.service;

import java.util.List;
import java.util.Map;

import manager.common.user.data.UserMapper;
import manager.common.user.model.Role;
import manager.common.user.model.UserInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class CommonService {
	@Autowired
	private UserMapper userMapper;
	
	public boolean isValidUser(Map<String,Object>map){
		return userMapper.getUserList(map).size()>0;
	}
	public boolean chkUserPwd(Map<String,Object>map){
		return userMapper.getUserList(map).size()>0;
	}
	
	public List<UserInfo> getUserList(Map<String,Object>map){
				return userMapper.getUserList(map);
	}
	@Transactional
	public void updateUser(UserInfo[] userArr){
		for(UserInfo obj : userArr)
			userMapper.updateUser(obj);
	}
	
	public void updateUserPwd(UserInfo info)
	{
		userMapper.updateUserPwd(info);
	}
	
	public List<Role> getRoleListByLoginId(Map<String,Object>map){
		return userMapper.getRoleListByLoginId(map);
	}
	/**更新用户的公司*/
	@Transactional
	public void update_company_id(Map<String, Object> paramsMap){
		userMapper.update_company_id(paramsMap);
	}
}
