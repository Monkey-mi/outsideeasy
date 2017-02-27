package usercenter.common.communication.data;

import java.util.Map;


public interface AccountCommunDelMapper {
	public void addAccountCommunDel(Map<String,Object> params);
	public Integer queryAccountCommunDelCount(Map<String,Object> params);
}
