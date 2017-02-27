package manager.materialConfirmation.model;

import java.util.Date;

public class MaterialSample {
	private int			sample_id;
	private int			confirmation_id;
	private String			material_name;
	private double			material_num;
	private String			version;
	private String			customer_name;
	private String			product_name;
	private int			haskey_point;
	private String			key_point;
	private Date			createon;

	public int getSample_id() {
		return sample_id;
	}
	public void setSample_id(int sample_id) {
		this.sample_id = sample_id;
	}
	public int getConfirmation_id() {
		return confirmation_id;
	}
	public void setConfirmation_id(int confirmation_id) {
		this.confirmation_id = confirmation_id;
	}
	public String getMaterial_name() {
		return material_name;
	}
	public void setMaterial_name(String material_name) {
		this.material_name = material_name;
	}
	public double getMaterial_num() {
		return material_num;
	}
	public void setMaterial_num(double material_num) {
		this.material_num = material_num;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getCustomer_name() {
		return customer_name;
	}
	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public int getHaskey_point() {
		return haskey_point;
	}
	public void setHaskey_point(int haskey_point) {
		this.haskey_point = haskey_point;
	}
	public String getKey_point() {
		return key_point;
	}
	public void setKey_point(String key_point) {
		this.key_point = key_point;
	}
	public Date getCreateon() {
		return createon;
	}
	public void setCreateon(Date createon) {
		this.createon = createon;
	}
}
