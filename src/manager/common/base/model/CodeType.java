package manager.common.base.model;

import java.io.Serializable;

import manager.common.Model;



/**
 * ClassName: CodeType
 * @Description: 代码类型
 * @author 华慧
 * @date 2015-9-1
 */
public class CodeType extends Model implements Serializable  {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6835162460804378325L;
	private int tcid;
	private String type_code;
	private String name;
	private String attrib;
	private String def_1;
	private String def_2;
	private String remark;
	private String con_type;
	private String suit_type;
	public int getTcid() {
		return tcid;
	}
	public void setTcid(int tcid) {
		this.tcid = tcid;
	}
	public String getType_code() {
		return type_code;
	}
	public void setType_code(String typeCode) {
		type_code = typeCode;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAttrib() {
		return attrib;
	}
	public void setAttrib(String attrib) {
		this.attrib = attrib;
	}
	public String getDef_1() {
		return def_1;
	}
	public void setDef_1(String def_1) {
		this.def_1 = def_1;
	}
	public String getDef_2() {
		return def_2;
	}
	public void setDef_2(String def_2) {
		this.def_2 = def_2;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getCon_type() {
		return con_type;
	}
	public void setCon_type(String conType) {
		con_type = conType;
	}
	public String getSuit_type() {
		return suit_type;
	}
	public void setSuit_type(String suitType) {
		suit_type = suitType;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
