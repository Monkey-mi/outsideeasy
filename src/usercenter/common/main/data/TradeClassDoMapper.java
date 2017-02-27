/**
 *outsideeasyusercenter.common.main.dataTradeClassMapper.java
 *	2016-3-24下午2:02:52
 * mishengliang
 */
package usercenter.common.main.data;

import java.util.List;



/**
 * @author mishengliang
 *
 */
public interface TradeClassDoMapper {
	/**
	 * 通过TradeClass名模糊匹配出
	 *2016-3-24下午2:03:53
	 *getTradeClassCode
	 *return:Integer
	 * mishengliang
	 */
	public List<Integer> getTradeClassCode(String tradeClass);
}
