package manager.templet.model;

import java.io.Serializable;
import java.util.Date;
/**
 * @Description: 准入模板头表
 * @param 
 * @return 
 * @author chenlong
 * @date 2016-7-1
 */
public class MngAccessTempletHead implements Serializable{

	private static final long serialVersionUID = -7644416999986172520L;
	private int			h_id;//主键ID
	private String			table_name;//模板头名称
	private int			owner;//所属者
	private int			version;//版本号
	private Date			create_dt;//创建时间
	private String      cpyname_cn;//公司名称

	public String getCpyname_cn() {
		return cpyname_cn;
	}
	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
	}
	public int getH_id() {
		return h_id;
	}
	public void setH_id(int h_id) {
		this.h_id = h_id;
	}
	public String getTable_name() {
		return table_name;
	}
	public void setTable_name(String table_name) {
		this.table_name = table_name;
	}
	public int getOwner() {
		return owner;
	}
	public void setOwner(int owner) {
		this.owner = owner;
	}
	public int getVersion() {
		return version;
	}
	public void setVersion(int version) {
		this.version = version;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}
