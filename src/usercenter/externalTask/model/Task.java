package usercenter.externalTask.model;

import java.io.Serializable;
import java.util.Date;

public class Task implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -7027935806476480370L;
	private int			t_id;
	private String			rwdh;
	private String			product_name;
	private String			serial_no;//任务单流水号
	private int			state;//5:未派单   10：已派单    15：接收（生产中）  20：生产完成     25：任务完结    30：异常任务（取消）    35：提出终止     40：终止
	private int			send_company;
	private int			receive_company;
	private double			total_qty;//总量
	private double			produced_qty;//生产总数
	private double			confirmed_qty;//实际质检数量
	private double			confirmed_qtyVo;//确认入库的货物量（到货总数量）
	private double        qualified_qty;//质检总数
	private double        sendout_qty ;//已发货总数
	private double        return_qtyVo;//返修到货总数量
	private double        return_send_qtyVo;//返修送货总数
	private Date			plan_start;
	private Date			plan_complete;
	private String			qc_type;
	private String          ddh;
	private String			scdh;
	private String          producers_company_name;//生产商名称
	private String product_pic;
	private Date czsj;
	private String stopreason;
	private Date send_time;//派单时间
	private Date receive_time;
	private Date finish_product_time;
	private Date finish_task_time;
	private String send_company_name;
	private String receive_company_name;
	private Date stop_time;
	private String remark;
	private String operator_file;//操作文件
	private int is_delete;//是否删除 0:未删除；1：作废
	private String  bzbh;//班组编号
	private String bzmc;//班组名称
	
	
	
	//辅助字段
	private int logisticsCount;//所有发来的物流记录
	private int unReceivedlogisticsCount;//未接受生产货物的物流记录
	private int unReceivedlogisticsVoCount;//未接受生产材料的物流记录
	private int ReceivedlogisticsVoCount;//已接受生产材料的物流记录
	private int unReceivedqcCount;//位之间的物流清单记录
	private Date first_start_time;//开工第一天
	private Date endTaskTime;//终止时间
	private double delivery_quantity;//可发货数量
	
		
	public double getReturn_send_qtyVo() {
		return return_send_qtyVo;
	}
	public void setReturn_send_qtyVo(double return_send_qtyVo) {
		this.return_send_qtyVo = return_send_qtyVo;
	}
	public int getReceivedlogisticsVoCount() {
		return ReceivedlogisticsVoCount;
	}
	public void setReceivedlogisticsVoCount(int receivedlogisticsVoCount) {
		ReceivedlogisticsVoCount = receivedlogisticsVoCount;
	}
	public double getReturn_qtyVo() {
		return return_qtyVo;
	}
	public void setReturn_qtyVo(double return_qtyVo) {
		this.return_qtyVo = return_qtyVo;
	}
	public double getDelivery_quantity() {
		return delivery_quantity;
	}
	public void setDelivery_quantity(double delivery_quantity) {
		this.delivery_quantity = delivery_quantity;
	}
	public Date getEndTaskTime() {
		return endTaskTime;
	}
	public void setEndTaskTime(Date endTaskTime) {
		this.endTaskTime = endTaskTime;
	}
	public int getIs_delete() {
		return is_delete;
	}
	public void setIs_delete(int is_delete) {
		this.is_delete = is_delete;
	}
	public double getSendout_qty() {
		return sendout_qty;
	}	
	public String getBzbh() {
		return bzbh;
	}
	public void setBzbh(String bzbh) {
		this.bzbh = bzbh;
	}
	public String getBzmc() {
		return bzmc;
	}
	public void setBzmc(String bzmc) {
		this.bzmc = bzmc;
	}
	public void setSendout_qty(double sendout_qty) {
		this.sendout_qty = sendout_qty;
	}
	public double getConfirmed_qtyVo() {
		return confirmed_qtyVo;
	}
	public void setConfirmed_qtyVo(double confirmed_qtyVo) {
		this.confirmed_qtyVo = confirmed_qtyVo;
	}
	public String getProducers_company_name() {
		return producers_company_name;
	}
	public void setProducers_company_name(String producers_company_name) {
		this.producers_company_name = producers_company_name;
	}
	public String getOperator_file() {
		return operator_file;
	}
	public void setOperator_file(String operator_file) {
		this.operator_file = operator_file;
	}
	public int getUnReceivedqcCount() {
		return unReceivedqcCount;
	}
	public void setUnReceivedqcCount(int unReceivedqcCount) {
		this.unReceivedqcCount = unReceivedqcCount;
	}
	public int getUnReceivedlogisticsVoCount() {
		return unReceivedlogisticsVoCount;
	}
	public void setUnReceivedlogisticsVoCount(int unReceivedlogisticsVoCount) {
		this.unReceivedlogisticsVoCount = unReceivedlogisticsVoCount;
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
	public int getReceive_company() {
		return receive_company;
	}
	public void setReceive_company(int receive_company) {
		this.receive_company = receive_company;
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
	public String getScdh() {
		return scdh;
	}
	public void setScdh(String scdh) {
		this.scdh = scdh;
	}
	public String getSend_company_name() {
		return send_company_name;
	}
	public void setSend_company_name(String send_company_name) {
		this.send_company_name = send_company_name;
	}
	public String getReceive_company_name() {
		return receive_company_name;
	}
	public void setReceive_company_name(String receive_company_name) {
		this.receive_company_name = receive_company_name;
	}
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
	public int getLogisticsCount() {
		return logisticsCount;
	}
	public void setLogisticsCount(int logisticsCount) {
		this.logisticsCount = logisticsCount;
	}
	public int getUnReceivedlogisticsCount() {
		return unReceivedlogisticsCount;
	}
	public void setUnReceivedlogisticsCount(int unReceivedlogisticsCount) {
		this.unReceivedlogisticsCount = unReceivedlogisticsCount;
	}
	public Date getFirst_start_time() {
		return first_start_time;
	}
	public void setFirst_start_time(Date first_start_time) {
		this.first_start_time = first_start_time;
	}
	public String getDdh() {
		return ddh;
	}
	public void setDdh(String ddh) {
		this.ddh = ddh;
	}

	
}
