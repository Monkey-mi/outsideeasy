/*评估准入图片上传*/
package manager.supplierAccess.model;

import java.util.Date;
import java.io.Serializable;

import manager.common.Model;
public class SupplierAccessUploadImg extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -3127821512748175559L;
	private int			file_id;
	private int			score_id;
	private String			file_path;
	private Date			create_dt;

	public int getFile_id() {
		return file_id;
	}
	public void setFile_id(int file_id) {
		this.file_id = file_id;
	}
	public int getScore_id() {
		return score_id;
	}
	public void setScore_id(int score_id) {
		this.score_id = score_id;
	}
	public String getFile_path() {
		return file_path;
	}
	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}
