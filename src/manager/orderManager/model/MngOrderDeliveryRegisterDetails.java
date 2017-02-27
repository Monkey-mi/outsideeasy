package manager.orderManager.model;

import java.io.Serializable;

/**
 * <p>实体类</p>
 * <p>Table: t_order_delivery_register_details - </p>
 * @since 2017-02-22 03:34:45
 */
public class MngOrderDeliveryRegisterDetails implements Serializable{
	
	private static final long serialVersionUID =1;
    /** detail_id -  */
    private Integer detail_id;

    /** register_id -  */
    private Integer register_id;
    /** order_detail_id -  */
    private Integer order_detail_id;
    /** pur_order_id -  */
    private Integer pur_order_id;
    /** order_bh -  */
    private String order_bh;
    /** agreement_bh -  */
    private String agreement_bh;
    /** go_type -  */
    private Integer go_type;


    public Integer getDetail_id(){
        return this.detail_id;
    }
    public void setDetail_id(Integer detail_id){
        this.detail_id = detail_id;
    }

    public Integer getRegister_id(){
        return this.register_id;
    }
    public void setRegister_id(Integer register_id){
        this.register_id = register_id;
    }

    public Integer getOrder_detail_id(){
        return this.order_detail_id;
    }
    public void setOrder_detail_id(Integer order_detail_id){
        this.order_detail_id = order_detail_id;
    }

    public Integer getPur_order_id(){
        return this.pur_order_id;
    }
    public void setPur_order_id(Integer pur_order_id){
        this.pur_order_id = pur_order_id;
    }

    public String getOrder_bh(){
        return this.order_bh;
    }
    public void setOrder_bh(String order_bh){
        this.order_bh = order_bh;
    }

    public String getAgreement_bh(){
        return this.agreement_bh;
    }
    public void setAgreement_bh(String agreement_bh){
        this.agreement_bh = agreement_bh;
    }

    public Integer getGo_type(){
        return this.go_type;
    }
    public void setGo_type(Integer go_type){
        this.go_type = go_type;
    }
}