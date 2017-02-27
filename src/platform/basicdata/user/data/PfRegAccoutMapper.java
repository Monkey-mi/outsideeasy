package platform.basicdata.user.data;

import java.util.List;
import java.util.Map;

import usercenter.subAccount.model.SubAccount;


/** 
 * @ClassName: PfRegAccoutMapper 
 * @Description: 子账户信息
 * @author wuqia
 * @date 2016-8-17 上午11:24:42 
 * 
 *  
 */
public interface PfRegAccoutMapper {
	public List<SubAccount> getPfRegAccoutList(Map<String,Object> params);
}


