package manager.basicdata.tradeClass.data;

import java.util.List;
import java.util.Map;

import manager.basicdata.tradeClass.model.TradeClass;



public interface TradeClassMapper {
	public List<TradeClass> getTradeClassList(Map<String,Object> params);
	public void addTradeClass(TradeClass obj);
	public void updateTradeClass(TradeClass obj);
	public void deleteTradeClass(TradeClass obj);
	
	//根据 上级id和名称，获取记录数量
	int getCountForAdd(Map<String,Object> params);
	//根据 上级id和名称，并且不等于指定id，获取记录
	int getCountForUpdate(Map<String,Object> params);
	//根据 上级id，获取记录数量
	int getXiajiCount(Map<String,Object> params);
}
