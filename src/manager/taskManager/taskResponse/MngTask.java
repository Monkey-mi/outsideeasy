package manager.taskManager.taskResponse;


import java.io.Serializable;
import java.util.Date;
/**
 * 任务列表的请求响应数据
 * @author chenlong
 *
 */
public class MngTask  implements Serializable{
	
	private static final long serialVersionUID = -4921596835219504963L;
	private int			    t_id;   //任务列表主键
	private String			rwdh; //MES任务单号
	private String			product_name;//产品名称
	private String			serial_no;//任务单流水号
	private int			    state;     //状态
	private int			    send_company;//派单单位
	private String			receive_cpyname_cn;//接收公司名
	private String	        send_cpyname_cn;//发送公司名
	private int             receive_company;//接收单位
	private double			total_qty;//任务总数量
	private double			produced_qty;//生产完工数量
	private double			confirmed_qty;//交货数量
	private Date			plan_start;//计划开工日期
	private Date			plan_complete;//计划完工日期
	private String			qc_type;//质检方式
	private String			scdh;//生产单号
	private String          product_pic;//产品图片
	private Date            czsj;//创建时间
	private String          stopreason;//终止理由
	private Date            send_time;//派单时间
	private Date            receive_time;//接单时间
	private Date            finish_product_time;//生产完成时间
	private Date            finish_task_time;//任务完成时间
	private double          qualified_qty;//合格数量
	private Date            stop_time;//终止时间
	private String          remark;//备注
	private String          operator_file;//操作文件
	private double          confirmed_qtyVo;//确认入库的货物量
	private double          sendout_qty;//已发货总数
	private String          UUID;//唯一标识码
	private String          ddh;//订单号
	private int             is_delete;//逻辑删除
	
	public String getProduct_pic() {
		return product_pic;
	}
	public void setProduct_pic(String product_pic) {
		this.product_pic = product_pic;
	}
	public Date getCzsj() {
		return czsj;
	}
	public void setCzsj(Date czsj) {
		this.czsj = czsj;
	}
	public String getStopreason() {
		return stopreason;
	}
	public void setStopreason(String stopreason) {
		this.stopreason = stopreason;
	}
	public Date getSend_time() {
		return send_time;
	}
	public void setSend_time(Date send_time) {
		this.send_time = send_time;
	}
	public Date getReceive_time() {
		return receive_time;
	}
	public void setReceive_time(Date receive_time) {
		this.receive_time = receive_time;
	}
	public Date getFinish_product_time() {
		return finish_product_time;
	}
	public void setFinish_product_time(Date finish_product_time) {
		this.finish_product_time = finish_product_time;
	}
	public Date getFinish_task_time() {
		return finish_task_time;
	}
	public void setFinish_task_time(Date finish_task_time) {
		this.finish_task_time = finish_task_time;
	}
	public double getQualified_qty() {
		return qualified_qty;
	}
	public void setQualified_qty(double qualified_qty) {
		this.qualified_qty = qualified_qty;
	}
	public Date getStop_time() {
		return stop_time;
	}
	public void setStop_time(Date stop_time) {
		this.stop_time = stop_time;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getOperator_file() {
		return operator_file;
	}
	public void setOperator_file(String operator_file) {
		this.operator_file = operator_file;
	}
	public double getConfirmed_qtyVo() {
		return confirmed_qtyVo;
	}
	public void setConfirmed_qtyVo(double confirmed_qtyVo) {
		this.confirmed_qtyVo = confirmed_qtyVo;
	}
	public double getSendout_qty() {
		return sendout_qty;
	}
	public void setSendout_qty(double sendout_qty) {
		this.sendout_qty = sendout_qty;
	}
	public String getUUID() {
		return UUID;
	}
	public void setUUID(String uUID) {
		UUID = uUID;
	}
	public String getDdh() {
		return ddh;
	}
	public void setDdh(String ddh) {
		this.ddh = ddh;
	}
	public int getIs_delete() {
		return is_delete;
	}
	public void setIs_delete(int is_delete) {
		this.is_delete = is_delete;
	}
	public int getReceive_company() {
		return receive_company;
	}
	public void setReceive_company(int receive_company) {
		this.receive_company = receive_company;
	}
	public int getT_id() {
		return t_id;
	}
	public void setT_id(int t_id) {
		this.t_id = t_id;
	}	
	public String getRwdh() {
		return rwdh;
	}
	public void setRwdh(String rwdh) {
		this.rwdh = rwdh;
	}
	public String getScdh() {
		return scdh;
	}
	public void setScdh(String scdh) {
		this.scdh = scdh;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public String getSerial_no() {
		return serial_no;
	}
	public void setSerial_no(String serial_no) {
		this.serial_no = serial_no;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public int getSend_company() {
		return send_company;
	}
	public void setSend_company(int send_company) {
		this.send_company = send_company;
	}
	public String getReceive_cpyname_cn() {
		return receive_cpyname_cn;
	}
	public void setReceive_cpyname_cn(String receive_cpyname_cn) {
		this.receive_cpyname_cn = receive_cpyname_cn;
	}
	public String getSend_cpyname_cn() {
		return send_cpyname_cn;
	}
	public void setSend_cpyname_cn(String send_cpyname_cn) {
		this.send_cpyname_cn = send_cpyname_cn;
	}
	public double getTotal_qty() {
		return total_qty;
	}
	public void setTotal_qty(double total_qty) {
		this.total_qty = total_qty;
	}
	public double getProduced_qty() {
		return produced_qty;
	}
	public void setProduced_qty(double produced_qty) {
		this.produced_qty = produced_qty;
	}
	public double getConfirmed_qty() {
		return confirmed_qty;
	}
	public void setConfirmed_qty(double confirmed_qty) {
		this.confirmed_qty = confirmed_qty;
	}
	public Date getPlan_start() {
		return plan_start;
	}
	public void setPlan_start(Date plan_start) {
		this.plan_start = plan_start;
	}
	public Date getPlan_complete() {
		return plan_complete;
	}
	public void setPlan_complete(Date plan_complete) {
		this.plan_complete = plan_complete;
	}
	public String getQc_type() {
		return qc_type;
	}
	public void setQc_type(String qc_type) {
		this.qc_type = qc_type;
	}
	
}
