package usercenter.externalTask.data;

import java.util.List;
import java.util.Map;

import usercenter.externalTask.model.ReceiptDetail;


public interface ReceiptDetailMapper {
	public List<ReceiptDetail> getReceiptDetailList(Map<String,Object> params);
	public void addReceiptDetail(ReceiptDetail obj);
	public void updateReceiptDetail(ReceiptDetail obj);
	public void deleteReceiptDetail(ReceiptDetail obj);
	public void addReceiptDetail(Map<String,Object> params);
}
