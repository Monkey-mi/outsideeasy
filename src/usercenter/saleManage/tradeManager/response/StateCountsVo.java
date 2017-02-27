package usercenter.saleManage.tradeManager.response;
/**
 * 返回每个状态的的订单量
 * @author chenlong
 */
public class StateCountsVo {
	private int allOrderCount;//全部订单数量
	private int comimtOrderCount;//已提交
	private int comfrimOrderCount;//已接单
	private int overOrderCount;//交货完成
	private int queryOrderCount;//待确认终止
	private int exOrderCount;//异常订单
	private int returnOrderCount;//回收站
	
	
	public StateCountsVo(int allOrderCount, int comimtOrderCount,
			int comfrimOrderCount, int overOrderCount, int queryOrderCount,
			int exOrderCount, int returnOrderCount) {
		super();
		this.allOrderCount = allOrderCount;
		this.comimtOrderCount = comimtOrderCount;
		this.comfrimOrderCount = comfrimOrderCount;
		this.overOrderCount = overOrderCount;
		this.queryOrderCount = queryOrderCount;
		this.exOrderCount = exOrderCount;
		this.returnOrderCount = returnOrderCount;
	}
	public int getAllOrderCount() {
		return allOrderCount;
	}
	public void setAllOrderCount(int allOrderCount) {
		this.allOrderCount = allOrderCount;
	}
	public int getComimtOrderCount() {
		return comimtOrderCount;
	}
	public void setComimtOrderCount(int comimtOrderCount) {
		this.comimtOrderCount = comimtOrderCount;
	}
	public int getComfrimOrderCount() {
		return comfrimOrderCount;
	}
	public void setComfrimOrderCount(int comfrimOrderCount) {
		this.comfrimOrderCount = comfrimOrderCount;
	}
	public int getOverOrderCount() {
		return overOrderCount;
	}
	public void setOverOrderCount(int overOrderCount) {
		this.overOrderCount = overOrderCount;
	}
	public int getQueryOrderCount() {
		return queryOrderCount;
	}
	public void setQueryOrderCount(int queryOrderCount) {
		this.queryOrderCount = queryOrderCount;
	}
	public int getExOrderCount() {
		return exOrderCount;
	}
	public void setExOrderCount(int exOrderCount) {
		this.exOrderCount = exOrderCount;
	}
	public int getReturnOrderCount() {
		return returnOrderCount;
	}
	public void setReturnOrderCount(int returnOrderCount) {
		this.returnOrderCount = returnOrderCount;
	}
	
	
}
