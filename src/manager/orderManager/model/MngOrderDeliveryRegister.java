package manager.orderManager.model;

import java.util.Date;
import java.io.Serializable;

/**
 * <p>实体类</p>
 * <p>Table: t_order_delivery_register - </p>
 * @since 2017-02-22 02:01:12
 */
public class MngOrderDeliveryRegister implements Serializable{
	
	private static final long serialVersionUID =1;
    /** register_id -  */
    private Integer register_id;

    /** delivery_number -  */
    private String delivery_number;
    /** create_dt -  */
    private Date create_dt;
    /** creator_id -  */
    private Integer creator_id;
    /** creator_name -  */
    private String creator_name;
    /** send_company_id -  */
    private Integer send_company_id;
    /** send_cpyname_cn -  */
    private String send_cpyname_cn;
    /** receive_company_id -  */
    private Integer receive_company_id;
    /** receive_cpyname_cn -  */
    private String receive_cpyname_cn;
    /** is_get -  */
    private Integer is_get;


    public Integer getRegister_id(){
        return this.register_id;
    }
    public void setRegister_id(Integer register_id){
        this.register_id = register_id;
    }

    public String getDelivery_number(){
        return this.delivery_number;
    }
    public void setDelivery_number(String delivery_number){
        this.delivery_number = delivery_number;
    }

    public Date getCreate_dt(){
        return this.create_dt;
    }
    public void setCreate_dt(Date create_dt){
        this.create_dt = create_dt;
    }

    public Integer getCreator_id(){
        return this.creator_id;
    }
    public void setCreator_id(Integer creator_id){
        this.creator_id = creator_id;
    }

    public String getCreator_name(){
        return this.creator_name;
    }
    public void setCreator_name(String creator_name){
        this.creator_name = creator_name;
    }

    public Integer getSend_company_id(){
        return this.send_company_id;
    }
    public void setSend_company_id(Integer send_company_id){
        this.send_company_id = send_company_id;
    }

    public String getSend_cpyname_cn(){
        return this.send_cpyname_cn;
    }
    public void setSend_cpyname_cn(String send_cpyname_cn){
        this.send_cpyname_cn = send_cpyname_cn;
    }

    public Integer getReceive_company_id(){
        return this.receive_company_id;
    }
    public void setReceive_company_id(Integer receive_company_id){
        this.receive_company_id = receive_company_id;
    }

    public String getReceive_cpyname_cn(){
        return this.receive_cpyname_cn;
    }
    public void setReceive_cpyname_cn(String receive_cpyname_cn){
        this.receive_cpyname_cn = receive_cpyname_cn;
    }

    public Integer getIs_get(){
        return this.is_get;
    }
    public void setIs_get(Integer is_get){
        this.is_get = is_get;
    }
}