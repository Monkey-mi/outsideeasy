package usercenter.saleManage.tradeManager.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.tradeManager.model.OrderAttchedFile;


public interface OrderAttchedFileMapper {
	public List<OrderAttchedFile> getOrderAttchedFileList(Map<String,Object> params);
	public void addOrderAttchedFile(OrderAttchedFile obj);
	public void updateOrderAttchedFile(OrderAttchedFile obj);
	public void deleteOrderAttchedFile(OrderAttchedFile obj);
	public List<OrderAttchedFile> getOrderAttchedFileForSub(Map<String,Object> params);
	public OrderAttchedFile getOrderAttchedFileForOne(Map<String,Object> params);
	public OrderAttchedFile getOrderAttchedFileListSub(Map<String,Object> params);
	public Integer getOrderAttchedFileForSubForLook(Map<String,Object> params);
	public void updateOrderAttchedFileForLook(Map<String,Object> params);
	public int addOrderAttchedFileCount(Map<String,Object> params);
	public void updateOrderAttchedFileForStop(Map<String,Object> params);
	public void updateOrderAttchedFileStop(Map<String,Object> params);
	public OrderAttchedFile getOrderAttchedFileForOneOther(Map<String,Object> params);
	public List<OrderAttchedFile> getOrderAttchedFileForList(Map<String,Object> params);
}
