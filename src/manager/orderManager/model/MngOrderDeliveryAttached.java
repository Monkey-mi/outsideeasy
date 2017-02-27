package manager.orderManager.model;

import java.util.Date;
import java.io.Serializable;

/**
 * <p>实体类</p>
 * <p>Table: t_order_delivery_attached - </p>
 * @since 2017-02-23 01:54:09
 */
public class MngOrderDeliveryAttached implements Serializable{
	
	private static final long serialVersionUID =1;
    /** id -  */
    private Integer id;

    /** file_type_id -  */
    private Integer file_type_id;
    /** register_id -  */
    private Integer register_id;
    /** file_name -  */
    private String file_name;
    /** mogodb_id -  */
    private String mogodb_id;
    /** suffix_name -  */
    private String suffix_name;
    /** create_dt -  */
    private Date create_dt;


    public Integer getId(){
        return this.id;
    }
    public void setId(Integer id){
        this.id = id;
    }

    public Integer getFile_type_id(){
        return this.file_type_id;
    }
    public void setFile_type_id(Integer file_type_id){
        this.file_type_id = file_type_id;
    }

    public Integer getRegister_id(){
        return this.register_id;
    }
    public void setRegister_id(Integer register_id){
        this.register_id = register_id;
    }

    public String getFile_name(){
        return this.file_name;
    }
    public void setFile_name(String file_name){
        this.file_name = file_name;
    }

    public String getMogodb_id(){
        return this.mogodb_id;
    }
    public void setMogodb_id(String mogodb_id){
        this.mogodb_id = mogodb_id;
    }

    public String getSuffix_name(){
        return this.suffix_name;
    }
    public void setSuffix_name(String suffix_name){
        this.suffix_name = suffix_name;
    }

    public Date getCreate_dt(){
        return this.create_dt;
    }
    public void setCreate_dt(Date create_dt){
        this.create_dt = create_dt;
    }
}