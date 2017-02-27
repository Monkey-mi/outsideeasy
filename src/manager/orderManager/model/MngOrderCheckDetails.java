package manager.orderManager.model;

import java.util.Date;
import java.io.Serializable;

/**
 * <p>实体类</p>
 * <p>Table: t_order_check_details - </p>
 * @since 2017-02-22 05:30:17
 */
public class MngOrderCheckDetails implements Serializable{
	
	private static final long serialVersionUID =1;
    /** check_detail_id -  */
    private Integer check_detail_id;

    /** check_id -  */
    private Integer check_id;
    /** order_detail_id -  */
    private Integer order_detail_id;
    /** check_number -  */
    private Integer check_number;
    /** check_result -  */
    private String check_result;
    /** check_vote -  */
    private String check_vote;
    /** create_dt -  */
    private Date create_dt;


    public Integer getCheck_detail_id(){
        return this.check_detail_id;
    }
    public void setCheck_detail_id(Integer check_detail_id){
        this.check_detail_id = check_detail_id;
    }

    public Integer getCheck_id(){
        return this.check_id;
    }
    public void setCheck_id(Integer check_id){
        this.check_id = check_id;
    }

    public Integer getOrder_detail_id(){
        return this.order_detail_id;
    }
    public void setOrder_detail_id(Integer order_detail_id){
        this.order_detail_id = order_detail_id;
    }

    public Integer getCheck_number(){
        return this.check_number;
    }
    public void setCheck_number(Integer check_number){
        this.check_number = check_number;
    }

    public String getCheck_result(){
        return this.check_result;
    }
    public void setCheck_result(String check_result){
        this.check_result = check_result;
    }

    public String getCheck_vote(){
        return this.check_vote;
    }
    public void setCheck_vote(String check_vote){
        this.check_vote = check_vote;
    }

    public Date getCreate_dt(){
        return this.create_dt;
    }
    public void setCreate_dt(Date create_dt){
        this.create_dt = create_dt;
    }
}