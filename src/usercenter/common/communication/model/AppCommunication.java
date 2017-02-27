package usercenter.common.communication.model;

import java.util.Date;
/**
 * 1.交流以parentId分组
 * 2.parentId以id为基础
 * 3.taskId区分每个生产任务单的交流
 *     
 * 项目名称：outsideeasy    
 * 类名称：AppCommunication    
 * 创建人：mishengliang    
 * 创建时间：2016-5-3 下午2:10:43    
 * @version     
 *
 */
public class AppCommunication {
	private int			id;
	private int			bus_id;
	private int			task_id;//任务单的id
	private int			parent_id;//父信息id
	private Date			create_time;//创建时间
	private Integer			company_id;//公司ID
	private String			com_message;//信息名
	private Integer  module_type;//0：任务单；1：订单；
	private Integer  is_look;//0:未读；1：已读；

	private Integer   fileCount;//文件计数
	private String mogodb_id;
	private String cpyname_cn;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}	
	public Integer getFileCount() {
		return fileCount;
	}
	public void setFileCount(Integer fileCount) {
		this.fileCount = fileCount;
	}
	public int getTask_id() {
		return task_id;
	}
	public void setTask_id(int task_id) {
		this.task_id = task_id;
	}
	public int getParent_id() {
		return parent_id;
	}
	public void setParent_id(int parent_id) {
		this.parent_id = parent_id;
	}
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}
	public Integer getCompany_id() {
		return company_id;
	}
	public void setCompany_id(Integer company_id) {
		this.company_id = company_id;
	}
	public String getCom_message() {
		return com_message;
	}
	public void setCom_message(String com_message) {
		this.com_message = com_message;
	}
	public String getMogodb_id() {
		return mogodb_id;
	}
	public void setMogodb_id(String mogodb_id) {
		this.mogodb_id = mogodb_id;
	}
	public String getCpyname_cn() {
		return cpyname_cn;
	}
	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
	}
	public Integer getModule_type() {
		return module_type;
	}
	public void setModule_type(Integer module_type) {
		this.module_type = module_type;
	}
	public Integer getIs_look() {
		return is_look;
	}
	public void setIs_look(Integer is_look) {
		this.is_look = is_look;
	}
	
	public int getBus_id() {
		return bus_id;
	}
	public void setBus_id(int bus_id) {
		this.bus_id = bus_id;
	}
	@Override
	public String toString() {
		return "AppCommunication [id=" + id + ", bus_id=" + bus_id
				+ ", task_id=" + task_id + ", parent_id=" + parent_id
				+ ", create_time=" + create_time + ", company_id=" + company_id
				+ ", com_message=" + com_message + ", module_type="
				+ module_type + ", is_look=" + is_look + ", mogodb_id="
				+ mogodb_id + ", cpyname_cn=" + cpyname_cn + "]";
	}
	
}
