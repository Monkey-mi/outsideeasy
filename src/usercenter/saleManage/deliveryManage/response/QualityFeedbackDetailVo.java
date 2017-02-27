package usercenter.saleManage.deliveryManage.response;



public class QualityFeedbackDetailVo {
	private String product_name;//产品名称
	private String product_artno;//产品名称
	private String product_size;//产品尺寸
	private String remark;//产品备注信息
	private String order_bh;//订单编号
	private String agreement_bh;//合同编号
	private String unit;//产品单位
	private int check_number;//质检数量
	private String check_result;//质检结论
	private String check_vote;//质检判定
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public String getProduct_size() {
		return product_size;
	}
	public void setProduct_size(String product_size) {
		this.product_size = product_size;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getOrder_bh() {
		return order_bh;
	}
	public void setOrder_bh(String order_bh) {
		this.order_bh = order_bh;
	}
	public String getAgreement_bh() {
		return agreement_bh;
	}
	public void setAgreement_bh(String agreement_bh) {
		this.agreement_bh = agreement_bh;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public int getCheck_number() {
		return check_number;
	}
	public void setCheck_number(int check_number) {
		this.check_number = check_number;
	}
	public String getCheck_result() {
		return check_result;
	}
	public void setCheck_result(String check_result) {
		this.check_result = check_result;
	}
	public String getCheck_vote() {
		return check_vote;
	}
	public void setCheck_vote(String check_vote) {
		this.check_vote = check_vote;
	}
	public String getProduct_artno() {
		return product_artno;
	}
	public void setProduct_artno(String product_artno) {
		this.product_artno = product_artno;
	}
	
}
