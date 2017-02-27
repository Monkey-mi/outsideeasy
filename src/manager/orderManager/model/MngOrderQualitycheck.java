package manager.orderManager.model;

import java.util.Date;
import java.io.Serializable;

/**
 * <p>实体类</p>
 * <p>Table: t_order_qualitycheck - </p>
 * @since 2017-02-22 05:24:18
 */
public class MngOrderQualitycheck implements Serializable{
	
	private static final long serialVersionUID =1;
    /** check_id -  */
    private Integer check_id;

    /** checkor_id -  */
    private Integer checkor_id;
    /** checkor_name -  */
    private String checkor_name;
    /** check_dt -  */
    private Date check_dt;
    /** source_type -  */
    private Integer source_type;
    /** delivery_dt -  */
    private Date delivery_dt;
    /** delivery_number -  */
    private String delivery_number;
    /** pur_company_id -  */
    private Integer pur_company_id;
    /** sup_company_id -  */
    private Integer sup_company_id;
    /** supplier_id -  */
    private Integer supplier_id;
    private String send_cpyname_cn;
    private String receive_cpyname_cn;


    public String getSend_cpyname_cn() {
		return send_cpyname_cn;
	}
	public void setSend_cpyname_cn(String send_cpyname_cn) {
		this.send_cpyname_cn = send_cpyname_cn;
	}
	public String getReceive_cpyname_cn() {
		return receive_cpyname_cn;
	}
	public void setReceive_cpyname_cn(String receive_cpyname_cn) {
		this.receive_cpyname_cn = receive_cpyname_cn;
	}
	public Integer getCheck_id(){
        return this.check_id;
    }
    public void setCheck_id(Integer check_id){
        this.check_id = check_id;
    }

    public Integer getCheckor_id(){
        return this.checkor_id;
    }
    public void setCheckor_id(Integer checkor_id){
        this.checkor_id = checkor_id;
    }

    public String getCheckor_name(){
        return this.checkor_name;
    }
    public void setCheckor_name(String checkor_name){
        this.checkor_name = checkor_name;
    }

    public Date getCheck_dt(){
        return this.check_dt;
    }
    public void setCheck_dt(Date check_dt){
        this.check_dt = check_dt;
    }

    public Integer getSource_type(){
        return this.source_type;
    }
    public void setSource_type(Integer source_type){
        this.source_type = source_type;
    }

    public Date getDelivery_dt(){
        return this.delivery_dt;
    }
    public void setDelivery_dt(Date delivery_dt){
        this.delivery_dt = delivery_dt;
    }

    public String getDelivery_number(){
        return this.delivery_number;
    }
    public void setDelivery_number(String delivery_number){
        this.delivery_number = delivery_number;
    }

    public Integer getPur_company_id(){
        return this.pur_company_id;
    }
    public void setPur_company_id(Integer pur_company_id){
        this.pur_company_id = pur_company_id;
    }

    public Integer getSup_company_id(){
        return this.sup_company_id;
    }
    public void setSup_company_id(Integer sup_company_id){
        this.sup_company_id = sup_company_id;
    }

    public Integer getSupplier_id(){
        return this.supplier_id;
    }
    public void setSupplier_id(Integer supplier_id){
        this.supplier_id = supplier_id;
    }
}