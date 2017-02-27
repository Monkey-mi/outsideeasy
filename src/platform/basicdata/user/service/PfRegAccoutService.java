package platform.basicdata.user.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.basicdata.user.data.PfRegAccoutMapper;
import usercenter.subAccount.model.SubAccount;



/** 
 * @ClassName: PfRegAccoutService 
 * @Description: 子账户相关
 * @author wuqia
 * @date 2016-8-17 上午11:21:51 
 * 
 *  
 */
@Service
public class PfRegAccoutService {
	@Autowired
	private PfRegAccoutMapper mapper;
	public List<SubAccount> getRegAccoutList(Map<String,Object> params) {
		return mapper.getPfRegAccoutList(params);
	}
}


