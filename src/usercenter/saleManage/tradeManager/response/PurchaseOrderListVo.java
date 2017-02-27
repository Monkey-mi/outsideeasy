package usercenter.saleManage.tradeManager.response;

import java.util.List;

import usercenter.saleManage.tradeManager.model.ProductList;
import usercenter.saleManage.tradeManager.model.PurchaseOrder;
/**
 * 返回订单的详情
 * @author chenlong
 */
public class PurchaseOrderListVo {
private List<ProductList> productList;//产品明细
private PurchaseOrder purchaseOrder;//订单列表
private int count;//产品数量
private int fileCount;//新文件数量
private int comimtCount;//交流信息数量

public int getCount() {
	return count;
}
public void setCount(int count) {
	this.count = count;
}
public List<ProductList> getProductList() {
	return productList;
}
public void setProductList(List<ProductList> productList) {
	this.productList = productList;
}
public PurchaseOrder getPurchaseOrder() {
	return purchaseOrder;
}
public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
	this.purchaseOrder = purchaseOrder;
}
public int getFileCount() {
	return fileCount;
}
public void setFileCount(int fileCount) {
	this.fileCount = fileCount;
}
public int getComimtCount() {
	return comimtCount;
}
public void setComimtCount(int comimtCount) {
	this.comimtCount = comimtCount;
}


}
