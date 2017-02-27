package manager.templet.model;

import java.io.Serializable;
import java.util.Date;
/**
 * @Description: 模板中的字段元素表
 * @param 
 * @return 
 * @author chenlong
 * @date 2016-7-1
 */
public class MngAccessTempletElement implements Serializable {
	private static final long serialVersionUID = -2486917782236586049L;
	private int			e_id;//主键ID
	private String			e_name;//元素名称
	private int			e_type_id;//字段类型
	private int			controller_type_id;//端显示控件类型
	private int			validate_type;//验证类型
	private String			validate_text;//验证规则
	private int			e_length;//字段长度
	private int			e_decimal_length;//小数位数
	private Date			create_dt;//创建时间

	

	public int getE_id() {
		return e_id;
	}
	public void setE_id(int e_id) {
		this.e_id = e_id;
	}
	public String getE_name() {
		return e_name;
	}
	public void setE_name(String e_name) {
		this.e_name = e_name;
	}
	public int getE_type_id() {
		return e_type_id;
	}
	public void setE_type_id(int e_type_id) {
		this.e_type_id = e_type_id;
	}
	public int getController_type_id() {
		return controller_type_id;
	}
	public void setController_type_id(int controller_type_id) {
		this.controller_type_id = controller_type_id;
	}
	public int getValidate_type() {
		return validate_type;
	}
	public void setValidate_type(int validate_type) {
		this.validate_type = validate_type;
	}
	public String getValidate_text() {
		return validate_text;
	}
	public void setValidate_text(String validate_text) {
		this.validate_text = validate_text;
	}
	public int getE_length() {
		return e_length;
	}
	public void setE_length(int e_length) {
		this.e_length = e_length;
	}
	public int getE_decimal_length() {
		return e_decimal_length;
	}
	public void setE_decimal_length(int e_decimal_length) {
		this.e_decimal_length = e_decimal_length;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}
