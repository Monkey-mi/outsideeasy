/*物料检测确认明细表*/
package manager.materialConfirmation.model;
import java.io.Serializable;
import java.util.Date;

import manager.common.Model;

public class MaterialCheckDetail extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 474660973570606314L;
	private int			check_id;
	private int			check_order;
	private String			check_item;
	private String			check_request;
	private String			check_report;
	private int			check_result;
	private String			check_person;
	private Date			chec_date;
	private int			checkclass_id;
	private int			sample_id;
	private String material_name;
	private String remark;

	public int getCheck_id() {
		return check_id;
	}
	public void setCheck_id(int check_id) {
		this.check_id = check_id;
	}
	public int getCheck_order() {
		return check_order;
	}
	public void setCheck_order(int check_order) {
		this.check_order = check_order;
	}
	public String getCheck_item() {
		return check_item;
	}
	public void setCheck_item(String check_item) {
		this.check_item = check_item;
	}
	public String getCheck_request() {
		return check_request;
	}
	public void setCheck_request(String check_request) {
		this.check_request = check_request;
	}
	public String getCheck_report() {
		return check_report;
	}
	public void setCheck_report(String check_report) {
		this.check_report = check_report;
	}
	public int getCheck_result() {
		return check_result;
	}
	public void setCheck_result(int check_result) {
		this.check_result = check_result;
	}
	public String getCheck_person() {
		return check_person;
	}
	public void setCheck_person(String check_person) {
		this.check_person = check_person;
	}
	public Date getChec_date() {
		return chec_date;
	}
	public void setChec_date(Date chec_date) {
		this.chec_date = chec_date;
	}
	public int getCheckclass_id() {
		return checkclass_id;
	}
	public void setCheckclass_id(int checkclass_id) {
		this.checkclass_id = checkclass_id;
	}
	public int getSample_id() {
		return sample_id;
	}
	public void setSample_id(int sample_id) {
		this.sample_id = sample_id;
	}
	public String getMaterial_name() {
		return material_name;
	}
	public void setMaterial_name(String material_name) {
		this.material_name = material_name;
	}
	public String getRemark()
	{
		return this.remark;
	}
	public void setRemark(String remark)
	{
		this.remark=remark;
	}
}
