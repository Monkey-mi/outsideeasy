package platform.supplierAccess.model;

import java.io.Serializable;

public class PfSupplierAccessScoreSummary implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1058772984769870709L;
	//所属公司ID
	private int company_id;
	//一级评估项名称
	private String fitem_name;
	private int fitem_id;
	//当前评估项权重值
	private double weightValue;
	//实际值（打分）
	private double realmum;
	//最大值
	private double maxmum;
	//分数,百分数
	//private double score;
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public String getFitem_name() {
		return fitem_name;
	}
	public void setFitem_name(String fitem_name) {
		this.fitem_name = fitem_name;
	}
	public int getFitem_id() {
		return fitem_id;
	}
	public void setFitem_id(int fitem_id) {
		this.fitem_id = fitem_id;
	}
	public double getWeightValue() {
		return weightValue;
	}
	public void setWeightValue(double weightValue) {
		this.weightValue = weightValue;
	}
	public double getRealmum() {
		return realmum;
	}
	public void setRealmum(double realmum) {
		this.realmum = realmum;
	}
	public double getMaxmum() {
		return maxmum;
	}
	public void setMaxmum(double maxmum) {
		this.maxmum = maxmum;
	}
	
	@Override
	public String toString() {
		return "PfSupplierAccessScoreSummary [company_id=" + company_id
				+ ", fitem_name=" + fitem_name + ", fitem_id=" + fitem_id
				+ ", weightValue=" + weightValue + ", realmum=" + realmum
				+ ", maxmum=" + maxmum + "]";
	}
	
}
